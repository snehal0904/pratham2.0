/**
 * SunbirdPlayerV3
 *
 * Unified player component that handles ALL content types.
 *
 * Rendering strategy (chosen to avoid nested-iframe issues):
 * ──────────────────────────────────────────────────────────
 *  • PDF / EPUB        → direct <iframe> at React level (Chrome blocks PDFs in nested iframes)
 *  • YouTube           → direct <iframe> with YouTube embed URL (YouTube blocks nested embeds)
 *  • Video / Audio     → routed through sunbird-playerv3 web component (native <video>/<audio>)
 *  • H5P               → routed through sunbird-playerv3 web component (H5PStandalone)
 *
 * Enable via:  NEXT_PUBLIC_USE_V3_PLAYER=true  in .env.local
 */

import React, { useRef, useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { getTelemetryEvents } from '../../services/TelemetryService';
import { handleExitEvent } from '../utils/Helper';
import { createAssessmentTracking } from '../../services/PlayerService';
import { MIME_TYPE_TO_CONTENT_TYPE } from '../../config/playerFeatureConfig';

interface SunbirdPlayerV3Props {
  playerConfig: any;
  relatedData?: { courseId?: string; unitId?: string; userId?: string };
  configFunctionality?: any;
}

const basePath = process.env.NEXT_PUBLIC_ASSETS_CONTENT || '/sbplayer';
const PLAYER_IFRAME_SRC = '/libs/sunbird-playerv3/index.html';
const PLAYER_ELEMENT_ID = 'player'; // id of <sunbird-h5p-player> in playerv3/index.html

// ─── Mime-type groups ────────────────────────────────────────────────────────
const PDF_MIMES = ['application/pdf'];
const EPUB_MIMES = ['application/epub', 'application/epub+zip'];
const YOUTUBE_MIMES = ['video/x-youtube', 'video/youtube'];

/** Types rendered directly (single iframe / element) to avoid nested-iframe issues */
const DIRECT_RENDER_MIMES = [...PDF_MIMES, ...EPUB_MIMES, ...YOUTUBE_MIMES];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Convert any common YouTube URL format to an embeddable URL */
const toYouTubeEmbedUrl = (url: string): string => {
  // Already an embed URL
  if (url.includes('/embed/')) return url;

  // Extract video ID from watch?v=ID or youtu.be/ID
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  if (match) return `https://www.youtube.com/embed/${match[1]}`;

  // Bare video ID (11 chars, alphanumeric + dash/underscore)
  if (/^[A-Za-z0-9_-]{11}$/.test(url))
    return `https://www.youtube.com/embed/${url}`;

  // Fallback – return as-is and let YouTube handle it
  return url;
};

// ─── Component ───────────────────────────────────────────────────────────────

const SunbirdPlayerV3 = ({
  playerConfig,
  relatedData = {},
  configFunctionality,
}: SunbirdPlayerV3Props) => {
  const { courseId, unitId, userId } = relatedData;
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [loading, setLoading] = useState(true);

  const mimeType: string = playerConfig?.metadata?.mimeType || '';
  const artifactUrl: string = playerConfig?.metadata?.artifactUrl || '';
  const contentType = MIME_TYPE_TO_CONTENT_TYPE[mimeType] || 'content';

  const isDirectRender = DIRECT_RENDER_MIMES.includes(mimeType);

  // ─── ALL hooks must be called unconditionally (Rules of Hooks) ─────────────

  // ─── Hook 1: Load playerv3 iframe and inject config ────────────────────────
  useEffect(() => {
    // Skip for direct-render types (PDF, EPUB, YouTube)
    if (isDirectRender) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    setLoading(true);

    // Force a fresh load on every playerConfig change so prior content is torn down
    iframe.src = '';
    iframe.src = `${basePath}${PLAYER_IFRAME_SRC}`;

    const handleLoad = () => {
      setLoading(false);

      // Small delay allows the Lit element to complete its first render/upgrade
      // before we set the property (same pattern as other Sunbird players)
      setTimeout(() => {
        try {
          const iframeDoc = iframe.contentDocument;
          if (!iframeDoc) return;

          const playerEl = iframeDoc.getElementById(PLAYER_ELEMENT_ID) as any;
          if (!playerEl) {
            console.error(
              `[V3Player] <sunbird-h5p-player id="${PLAYER_ELEMENT_ID}"> not found in playerv3 iframe.`
            );
            return;
          }

          // ── 1. Attach event listeners before setting config ─────────────────

          // playerEvent: EXIT, loadComplete, pageChange, scoreChange, stateChange …
          playerEl.addEventListener('playerEvent', (event: any) => {
            const detail = event?.detail || {};
            console.log('[V3Player] playerEvent', detail);
            if (
              detail?.action === 'EXIT' ||
              detail?.edata?.type === 'EXIT' ||
              detail?.data?.type === 'EXIT'
            ) {
              event.preventDefault?.();
              handleExitEvent();
            }
          });

          // telemetryEvent: START / INTERACT / END / SUMMARY
          playerEl.addEventListener('telemetryEvent', async (event: any) => {
            console.log('[V3Player] telemetryEvent', event?.detail);
            try {
              await getTelemetryEvents(event.detail, contentType, {
                courseId,
                unitId,
                userId,
                configFunctionality,
              });
            } catch (err) {
              console.error('[V3Player] Telemetry error:', err);
            }
          });

          // xAPIEvent: raw xAPI statements – log only for now
          playerEl.addEventListener('xAPIEvent', (event: any) => {
            console.log('[V3Player] xAPIEvent', event?.detail);
          });

          // ── 2. Set config via property (triggers initPlayer inside Lit element) ─
          playerEl.playerConfig = playerConfig;
          console.log('[V3Player] playerConfig set for mimeType:', mimeType);
        } catch (err) {
          console.error('[V3Player] Error initialising playerv3:', err);
        }
      }, 200);
    };

    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, [playerConfig, courseId, unitId, userId, contentType, configFunctionality, isDirectRender]);

  // ─── Hook 2: postMessage bus – QuML assessment result + fallback telemetry ─
  useEffect(() => {
    // postMessage listener is useful for both paths (QuML results, EXIT forwarding)
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== 'string') return;
      try {
        const data = JSON.parse(event.data);

        // QuML assessment result
        if (data?.maxScore !== undefined) {
          createAssessmentTracking({ ...data, courseId, unitId, userId }).catch(
            (err: any) =>
              console.error('[V3Player] Assessment tracking error:', err)
          );
          return;
        }

        // EXIT forwarded via postMessage
        if (data?.data?.edata?.type === 'EXIT') {
          handleExitEvent();
          return;
        }

        // Telemetry forwarded as postMessage (QuML pattern)
        if (data?.data?.mid) {
          getTelemetryEvents(data.data, contentType, {
            courseId,
            unitId,
            userId,
            configFunctionality,
          }).catch((err: any) =>
            console.error('[V3Player] PostMessage telemetry error:', err)
          );
        }
      } catch {
        // Ignore non-JSON messages from other sources
      }
    };

    window.addEventListener('message', handleMessage, false);
    return () => window.removeEventListener('message', handleMessage);
  }, [courseId, unitId, userId, contentType, configFunctionality]);

  // ─── Hook 3: Synthetic telemetry for direct-render types (PDF, EPUB, YouTube)
  //      The playerv3 web component emits its own telemetry, but for direct-render
  //      types we bypass that component, so we fire START on mount and END on unmount.
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isDirectRender) return;

    const identifier = playerConfig?.metadata?.identifier || '';
    const mode = playerConfig?.context?.mode || 'play';
    startTimeRef.current = Date.now();

    // TelemetryService expects eventData.object.id to extract the identifier
    const objectRef = { id: identifier, type: 'Content', ver: '1.0' };

    // ── START event ──
    const startEvent = {
      eid: 'START',
      edata: {
        type: 'content',
        mode,
        pageid: `v3-direct-${contentType}`,
      },
      object: objectRef,
    };

    console.log('[V3Player] Direct-render START telemetry', startEvent);
    getTelemetryEvents(startEvent, contentType, {
      courseId,
      unitId,
      userId,
      configFunctionality,
    }).catch((err: any) =>
      console.error('[V3Player] Direct-render START telemetry error:', err)
    );

    // ── END event (on unmount) ──
    return () => {
      const durationSec = Math.round((Date.now() - startTimeRef.current) / 1000);
      const endEvent = {
        eid: 'END',
        edata: {
          type: 'content',
          mode,
          duration: durationSec,
          pageid: 'sunbird-player-Endpage',
          summary: [
            { progress: 100 },
            { totallength: '' },
            { visitedlength: '' },
            { visitedcontentend: '' },
            { totalseekedlength: '' },
            { endpageseen: true },
          ],
        },
        object: objectRef,
      };

      console.log('[V3Player] Direct-render END telemetry', endEvent);
      getTelemetryEvents(endEvent, contentType, {
        courseId,
        unitId,
        userId,
        configFunctionality,
      }).catch((err: any) =>
        console.error('[V3Player] Direct-render END telemetry error:', err)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirectRender, playerConfig?.metadata?.identifier]);

  // ─── Render ────────────────────────────────────────────────────────────────

  // PATH A – Direct rendering (PDF, EPUB, YouTube)
  if (isDirectRender) {
    const isYouTube = YOUTUBE_MIMES.includes(mimeType);
    const src = isYouTube ? toYouTubeEmbedUrl(artifactUrl) : artifactUrl;

    return (
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <iframe
          id="contentPlayer"
          title={isYouTube ? 'YouTube Player' : 'Document Viewer'}
          src={src}
          aria-label="Content Player"
          allow={
            isYouTube
              ? 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              : undefined
          }
          allowFullScreen
          style={{
            border: 'none',
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />
      </Box>
    );
  }

  // PATH B – Playerv3 iframe (video/mp4, audio, H5P, HTML, ECML, QuML …)
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.7)',
            zIndex: 1,
          }}
        >
          <CircularProgress
            size={60}
            thickness={4}
            sx={{ color: '#FDBE16', animationDuration: '1.5s' }}
          />
        </Box>
      )}
      <iframe
        ref={iframeRef}
        id="contentPlayer"
        title="Content Player V3"
        src={`${basePath}${PLAYER_IFRAME_SRC}`}
        aria-label="Content Player"
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
        style={{
          border: 'none',
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </Box>
  );
};

export default SunbirdPlayerV3;
