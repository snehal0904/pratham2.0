/**
 * Player Feature Configuration
 *
 * Controls feature flags and settings for the player MFE.
 * Driven entirely by environment variables – no source changes needed to toggle.
 *
 * Environment variables (set in .env.local or deployment config):
 *
 *   NEXT_PUBLIC_USE_V3_PLAYER=true
 *       Routes ALL content types through SunbirdPlayerV3, which internally
 *       dispatches to the correct iframe + initialization strategy per mimeType:
 *         PDF, Video, Audio → sunbird-*-player (inject web component)
 *         EPUB              → sunbird-epub-player (inject web component)
 *         QuML              → sunbird-quml-player (setData)
 *         H5P               → sunbird-playerv3 / sunbird-h5p-player (set property)
 *         HTML, YouTube, ECML → V1 content player (initializePreview)
 *
 *   NEXT_PUBLIC_ASSETS_CONTENT=/sbplayer
 *       Base path for all player static assets (already used by existing players).
 */

export const V3_PLAYER_CONFIG = {
  /**
   * Set NEXT_PUBLIC_USE_V3_PLAYER=true to route all content through
   * SunbirdPlayerV3. Defaults to false so existing per-type players are used.
   */
  ENABLED: process.env.NEXT_PUBLIC_USE_V3_PLAYER === 'true',
};

/**
 * Maps mimeType strings to the content-type labels expected by TelemetryService.
 */
export const MIME_TYPE_TO_CONTENT_TYPE: Record<string, string> = {
  'application/pdf': 'pdf',
  'video/mp4': 'video',
  'video/webm': 'video',
  'audio/mp3': 'video',
  'audio/wav': 'video',
  'application/epub': 'epub',
  'application/vnd.sunbird.questionset': 'quml',
  'application/vnd.ekstep.h5p-archive': 'v1',
  'application/vnd.ekstep.html-archive': 'v1',
  'application/vnd.ekstep.ecml-archive': 'v1',
  'application/vnd.h5p': 'v1',
  'video/youtube': 'v1',
  'video/x-youtube': 'v1',
};
