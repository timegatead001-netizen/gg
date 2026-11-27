import { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Music2 } from 'lucide-react';

/**
 * Background music player with animated visualizer, play/pause and volume.
 * - Audio element lives here; state is mirrored to localStorage so it
 *   persists across section navigation and reloads.
 * - The audio source is /music.mp3 placed by the user in /public.
 *   If the file is missing the player still renders and shows a muted state.
 */
export interface MusicPlayerHandle {
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
}

interface MusicPlayerProps {
  /** start playing immediately (used after intro enter) */
  autoPlaySignal?: number;
}

const LS_VOL = 'kl_music_vol';
const LS_PLAYING = 'kl_music_playing';

export default function MusicPlayer({ autoPlaySignal }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [muted, setMuted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [bars, setBars] = useState<number[]>(new Array(16).fill(0.2));
  const rafRef = useRef<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const dataRef = useRef<Uint8Array | null>(null);

  // restore saved volume
  useEffect(() => {
    const sv = localStorage.getItem(LS_VOL);
    if (sv !== null) setVolume(parseFloat(sv));
  }, []);

  // keep volume in sync
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = muted ? 0 : volume;
    localStorage.setItem(LS_VOL, String(volume));
  }, [volume, muted]);

  // setup Web Audio analyser once
  const ensureAnalyser = useCallback(() => {
    const a = audioRef.current;
    if (!a || audioCtxRef.current) return;
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      const src = ctx.createMediaElementSource(a);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      src.connect(analyser);
      analyser.connect(ctx.destination);
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = src;
      dataRef.current = new Uint8Array(analyser.frequencyBinCount);
    } catch {
      // analyser optional; visualizer falls back to idle animation
    }
  }, []);

  // visualizer loop
  useEffect(() => {
    const tick = () => {
      const analyser = analyserRef.current;
      const data = dataRef.current;
      if (analyser && data && isPlaying) {
        analyser.getByteFrequencyData(data);
        const out = Array.from({ length: 16 }, (_, i) => {
          const idx = Math.floor((i / 16) * data.length);
          return Math.max(0.08, (data[idx] || 0) / 255);
        });
        setBars(out);
      } else {
        // gentle idle wave when paused so it still feels alive
        const t = Date.now() / 600;
        setBars((prev) => prev.map((_, i) => 0.12 + Math.abs(Math.sin(t + i * 0.5)) * 0.12));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying]);

  const play = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;
    ensureAnalyser();
    if (audioCtxRef.current?.state === 'suspended') {
      await audioCtxRef.current.resume();
    }
    try {
      await a.play();
      setIsPlaying(true);
      setFailed(false);
      localStorage.setItem(LS_PLAYING, '1');
    } catch {
      setFailed(true);
    }
  }, [ensureAnalyser]);

  const pause = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    setIsPlaying(false);
    localStorage.setItem(LS_PLAYING, '0');
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, pause, play]);

  // respond to autoplay signal (from intro enter button)
  useEffect(() => {
    if (autoPlaySignal && autoPlaySignal > 0) {
      play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlaySignal]);

  // restore playing state on mount (if user had it playing before reload)
  useEffect(() => {
    const wasPlaying = localStorage.getItem(LS_PLAYING) === '1';
    if (wasPlaying) {
      // browsers require a gesture; we attempt but won't force
      const a = audioRef.current;
      if (a) {
        a.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[60] select-none">
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
        crossOrigin="anonymous"
        onError={() => setFailed(true)}
      />
      <div className="glass-rose rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 shadow-2xl shadow-rose-950/40 flex items-center gap-3">
        <button
          onClick={toggle}
          aria-label={isPlaying ? 'Pauza' : 'Ijro'}
          className="relative h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/40 transition-transform active:scale-95 hover:scale-105"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          <span className="absolute inset-0 rounded-full ring-2 ring-rose-300/40 animate-ping pointer-events-none" style={{ animationDuration: isPlaying ? '2.4s' : '0s' }} />
        </button>

        {/* visualizer */}
        <div className="flex items-end gap-[3px] h-8 w-24 sm:w-28" aria-hidden>
          {bars.map((v, i) => (
            <span
              key={i}
              className="flex-1 rounded-full bg-gradient-to-t from-rose-500 to-rose-200 transition-[height] duration-75"
              style={{ height: `${Math.round(v * 100)}%` }}
            />
          ))}
        </div>

        {/* volume */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? 'Ovozni yoqish' : 'Ovozni o\'chirish'}
            className="text-rose-100/80 hover:text-rose-100 transition-colors"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => {
              setMuted(false);
              setVolume(parseFloat(e.target.value));
            }}
            aria-label="Ovoz balandligi"
            className="w-20 accent-rose-400"
          />
        </div>

        <Music2 size={16} className="text-rose-200/60 shrink-0 hidden sm:block" />
      </div>
      {failed && (
        <p className="mt-1.5 max-w-[200px] text-[11px] text-rose-200/70 glass rounded-lg px-2 py-1">
          Musiqa fayli topilmadi. Iltimos, /music.mp3 faylini qo\'shing.
        </p>
      )}
    </div>
  );
}
