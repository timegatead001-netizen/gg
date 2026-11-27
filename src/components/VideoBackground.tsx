import { useEffect, useRef, useState } from 'react';

/**
 * Cinematic background video with graceful fallback.
 * - Source: /video.mp4 (user-provided, H.264 MP4) in /public.
 * - Autoplays muted (mobile-safe), loops.
 * - If the file fails to load, a romantic animated gradient takes over.
 */
export default function VideoBackground({ active }: { active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      v.play().catch(() => setOk(false));
    }
  }, [active]);

  if (!ok) {
    // animated gradient fallback (no network dependency)
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-night-975 via-rose-950 to-night-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(245,69,111,0.35),transparent_55%)] animate-glow-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(212,150,10,0.22),transparent_55%)]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={() => setOk(false)}
        onCanPlay={() => setOk(true)}
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
      {/* cinematic overlay so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/55 to-night-950/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(16,4,16,0.7))]" />
    </div>
  );
}
