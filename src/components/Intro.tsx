import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import Starfield from './Starfield';
import PetalsField from './PetalsField';
import { INTRO_GREETING, INTRO_SUBTITLE, INTRO_BUTTON } from '@/data/content';

interface IntroProps {
  onEnter: () => void;
}

export default function Intro({ onEnter }: IntroProps) {
  const [burst, setBurst] = useState(false);

  // when the button is clicked, trigger a heart burst then reveal
  const handleEnter = () => {
    setBurst(true);
    window.setTimeout(onEnter, 1400);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-gradient-to-b from-night-950 via-night-900 to-rose-950"
      initial={{ opacity: 1 }}
      animate={{ opacity: burst ? 0 : 1 }}
      transition={{ duration: 1.1, ease: 'easeInOut' }}
    >
      {/* layered backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(245,69,111,0.25),transparent_60%)]" />
      <Starfield className="absolute inset-0 h-full w-full" />
      <PetalsField className="absolute inset-0 h-full w-full" density={0.8} />

      {/* glowing orb behind title */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-rose-500/20 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -30, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: 'backOut' }}
          className="mb-6"
        >
          <div className="relative">
            <Heart className="h-16 w-16 sm:h-20 sm:w-20 text-rose-400 fill-rose-500 drop-shadow-[0_0_25px_rgba(245,69,111,0.7)]" />
            <motion.span
              className="absolute inset-0 rounded-full bg-rose-400/30 blur-xl"
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-script text-2xl sm:text-3xl text-rose-200/90 mb-2"
        >
          {INTRO_GREETING} <span className="text-rose-400">❤️</span>
        </motion.p>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold leading-tight max-w-3xl"
        >
          <span className="rose-gradient-text shimmer-text text-glow">Kavin</span>
          <span className="text-rose-200 mx-3">❤️</span>
          <span className="rose-gradient-text shimmer-text text-glow">Leyli</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-5 max-w-md font-body text-base sm:text-lg text-rose-100/70"
        >
          {INTRO_SUBTITLE}
        </motion.p>

        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7, ease: 'backOut' }}
          onClick={handleEnter}
          className="group relative mt-10 overflow-hidden rounded-full px-8 py-4 sm:px-10 sm:py-5 font-body text-sm sm:text-base font-semibold uppercase tracking-[0.18em] text-white shadow-2xl shadow-rose-700/40"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-rose-500 via-rose-400 to-gold-400 bg-[length:200%_auto] transition-all duration-700 group-hover:bg-[position:100%_0]" />
          <span className="absolute inset-0 rounded-full ring-1 ring-rose-200/40" />
          <span className="absolute -inset-1 rounded-full bg-rose-400/30 blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center gap-2.5">
            <Sparkles size={16} className="text-white/90" />
            {INTRO_BUTTON}
            <Sparkles size={16} className="text-white/90" />
          </span>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-6 text-xs text-rose-200/40 font-body"
        >
          (Musiqani eshitish uchun tugmani bosing)
        </motion.p>
      </div>

      {/* heart burst on enter */}
      {burst && <HeartBurst />}
    </motion.div>
  );
}

function HeartBurst() {
  const hearts = Array.from({ length: 60 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {hearts.map((i) => {
        const angle = (i / hearts.length) * Math.PI * 2;
        const dist = 180 + Math.random() * 260;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        const size = 10 + Math.random() * 22;
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{ x: dx, y: dy, opacity: 0, scale: 1 }}
            transition={{ duration: 1.3, ease: 'easeOut' }}
          >
            <Heart
              className="text-rose-400 fill-rose-500"
              style={{ width: size, height: size }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
