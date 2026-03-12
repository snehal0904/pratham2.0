import dynamic from 'next/dynamic';
import React from 'react';
import { V3_PLAYER_CONFIG } from '../../config/playerFeatureConfig';

const SunbirdPdfPlayer = dynamic(() => import('./SunbirdPdfPlayer'), {
  ssr: false,
});

const SunbirdVideoPlayer = dynamic(() => import('./SunbirdVideoPlayer'), {
  ssr: false,
});
const SunbirdEpubPlayer = dynamic(() => import('./SunbirdEpubPlayer'), {
  ssr: false,
});

const SunbirdQuMLPlayer = dynamic(() => import('./SunbirdQuMLPlayer'), {
  ssr: false,
});

const SunbirdV1Player = dynamic(() => import('../V1-Player/V1Player'), {
  ssr: false,
});

// New unified player – only bundled/loaded when NEXT_PUBLIC_USE_V3_PLAYER=true
const SunbirdPlayerV3 = dynamic(() => import('./SunbirdPlayerV3'), {
  ssr: false,
});

interface PlayerProps {
  'player-config': any;
  courseId?: string;
  unitId?: string;
  userId?: string;
  configFunctionality?: any;
}

const SunbirdPlayers = ({
  'player-config': playerConfig,
  courseId,
  unitId,
  userId,
  configFunctionality,
}: PlayerProps) => {
  console.log('workspace playerconfig', playerConfig);

  // ── sunbird-playerv3  (all content types, feature-flagged) ──────────────────
  // When NEXT_PUBLIC_USE_V3_PLAYER=true every mime type is routed through
  // SunbirdPlayerV3. The legacy per-type players below are only used when the
  // flag is off, serving as a reliable fallback during testing.
  if (V3_PLAYER_CONFIG.ENABLED) {
    return (
      <SunbirdPlayerV3
        playerConfig={playerConfig}
        relatedData={{ courseId, unitId, userId }}
        configFunctionality={configFunctionality}
      />
    );
  }

  // ── Legacy per-type players (used when NEXT_PUBLIC_USE_V3_PLAYER is not set) ─
  const mimeType = playerConfig?.metadata?.mimeType;
  switch (mimeType) {
    case 'application/pdf':
      return (
        <SunbirdPdfPlayer
          playerConfig={playerConfig}
          relatedData={{ courseId, unitId, userId }}
          configFunctionality={configFunctionality}
        />
      );
    case 'video/mp4':
    case 'video/webm':
    case 'audio/mp3':
    case 'audio/wav':
      return (
        <SunbirdVideoPlayer
          playerConfig={playerConfig}
          relatedData={{ courseId, unitId, userId }}
          configFunctionality={configFunctionality}
        />
      );
    case 'application/vnd.sunbird.questionset':
      return (
        <SunbirdQuMLPlayer
          playerConfig={playerConfig}
          relatedData={{ courseId, unitId, userId }}
          configFunctionality={configFunctionality}
        />
      );
    case 'application/epub':
      return (
        <SunbirdEpubPlayer
          playerConfig={playerConfig}
          relatedData={{ courseId, unitId, userId }}
          configFunctionality={configFunctionality}
        />
      );
    case 'application/vnd.ekstep.h5p-archive':
    case 'application/vnd.ekstep.html-archive':
    case 'video/youtube':
    case 'video/x-youtube':
      //case 'application/vnd.ekstep.ecml-archive':
      return (
        <SunbirdV1Player
          playerConfig={playerConfig}
          relatedData={{ courseId, unitId, userId }}
          configFunctionality={configFunctionality}
        />
      );
    default:
      return <div>Unsupported media type</div>;
  }
};

export default SunbirdPlayers;
