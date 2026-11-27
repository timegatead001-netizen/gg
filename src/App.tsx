import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import Intro from '@/components/Intro';
import MusicPlayer from '@/components/MusicPlayer';
import VideoBackground from '@/components/VideoBackground';
import PetalsField from '@/components/PetalsField';
import Starfield from '@/components/Starfield';
import LoveMessage from '@/components/LoveMessage';
import RoseGarden from '@/components/RoseGarden';
import Kingdom from '@/components/Kingdom';
import LoveLetter from '@/components/LoveLetter';
import FinalSurprise from '@/components/FinalSurprise';

type SectionId = 'message' | 'garden' | 'kingdom' | 'letter' | 'final';

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'message', label: 'Xabar' },
  { id: 'garden', label: 'Bog\'' },
  { id: 'kingdom', label: 'Qirollik' },
  { id: 'letter', label: 'Xat' },
  { id: 'final', label: 'Sovg\'a' },
];

export default function App() {
  const [entered, setEntered] = useState(false);
  const [autoplaySignal, setAutoplaySignal] = useState(0);
  const [active, setActive] = useState<SectionId>('message');

  const handleEnter = () => {
    setEntered(true);
    setAutoplaySignal((n) => n + 1);
  };

  // scroll spy for nav highlight
  useEffect(() => {
    if (!entered) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as SectionId);
        });
      },
      { threshold: 0.5 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [entered]);

  const navDots = useMemo(
    () => SECTIONS.map((s) => ({ ...s, isActive: active === s.id })),
    [active]
  );

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-rose-50">
      {/* Intro */}
      <AnimatePresence>
        {!entered && <Intro onEnter={handleEnter} />}
      </AnimatePresence>

      {/* Main site */}
      {entered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* global cinematic video background, fixed behind everything */}
          <div className="fixed inset-0 z-0">
            <VideoBackground active={entered} />
          </div>
          {/* global petals + stars layered above video, below content */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <Starfield className="absolute inset-0 h-full w-full opacity-60" />
            <PetalsField className="absolute inset-0 h-full w-full" density={0.7} />
          </div>

          {/* side / bottom navigation dots */}
          <nav className="fixed right-3 top-1/2 z-50 -translate-y-1/2 hidden sm:flex flex-col gap-3">
            {navDots.map((s) => (
              <button
                key={s.id}
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
                aria-label={s.label}
                className="group relative flex items-center"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    s.isActive
                      ? 'h-3 w-3 bg-rose-400 shadow-[0_0_12px_rgba(245,69,111,0.8)]'
                      : 'h-2 w-2 bg-rose-200/40 hover:bg-rose-300/70'
                  }`}
                />
                <span className="absolute right-5 whitespace-nowrap rounded-md glass px-2 py-1 text-[11px] text-rose-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  {s.label}
                </span>
              </button>
            ))}
          </nav>

          {/* top bar brand */}
          <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
            <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 font-display text-lg sm:text-xl"
              >
                <Heart size={16} className="text-rose-400 fill-rose-500" />
                <span className="rose-gradient-text font-semibold">Kavin ❤️ Leyli</span>
              </motion.div>
            </div>
          </header>

          {/* content sections */}
          <main className="relative z-10">
            <div id="message" className="scroll-mt-0">
              <LoveMessage />
            </div>
            <div id="garden" className="scroll-mt-0">
              <RoseGarden />
            </div>
            <div id="kingdom" className="scroll-mt-0">
              <Kingdom />
            </div>
            <div id="letter" className="scroll-mt-0">
              <LoveLetter />
            </div>
            <div id="final" className="scroll-mt-0">
              <FinalSurprise />
            </div>
          </main>

          {/* mobile bottom navigation (touch-friendly) */}
          <nav className="fixed bottom-0 inset-x-0 z-40 sm:hidden">
            <div className="glass border-t border-rose-300/10 px-2 py-2 flex items-center justify-around">
              {navDots.map((s) => (
                <button
                  key={s.id}
                  onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-colors ${
                    s.isActive ? 'text-rose-300' : 'text-rose-100/50'
                  }`}
                >
                  <span
                    className={`block rounded-full transition-all ${
                      s.isActive ? 'h-2 w-2 bg-rose-400' : 'h-1.5 w-1.5 bg-rose-200/50'
                    }`}
                  />
                  <span className="text-[10px] font-body">{s.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* music player (persists across sections) */}
          <MusicPlayer autoPlaySignal={autoplaySignal} />

          {/* spacer so mobile nav doesn't cover final content */}
          <div className="h-16 sm:hidden" />
        </motion.div>
      )}
    </div>
  );
}
