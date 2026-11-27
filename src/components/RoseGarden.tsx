import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROSE_MESSAGES, ROSE_GARDEN_INTRO } from '@/data/content';

/**
 * Interactive rose garden. Each rose is an animated SVG that, when tapped,
 * reveals a romantic Uzbek message. Every rose = a feeling.
 */
function RoseSvg({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_0_12px_rgba(245,69,111,0.5)]">
      {/* stem */}
      <path d="M50 62 C50 75 50 85 50 95" stroke="#2f5d3a" strokeWidth="2.5" fill="none" />
      {/* leaf */}
      <path d="M50 80 C40 76 36 70 38 64 C46 68 50 74 50 80 Z" fill="#3a7d4a" />
      {/* outer petals */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="50"
          cy="36"
          rx="12"
          ry="20"
          fill="url(#roseGrad)"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      {/* inner petals */}
      <circle cx="50" cy="50" r="14" fill="#b8123e" />
      <circle cx="50" cy="50" r="9" fill="#7d1538" />
      <circle cx="50" cy="50" r="4" fill="#47071f" />
      <defs>
        <radialGradient id="roseGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ff7194" />
          <stop offset="60%" stopColor="#f5456f" />
          <stop offset="100%" stopColor="#97133a" />
        </radialGradient>
      </defs>
      {active && (
        <circle cx="50" cy="50" r="48" fill="none" stroke="#ffa3bd" strokeWidth="1.5" opacity="0.6" />
      )}
    </svg>
  );
}

export default function RoseGarden() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const roses = ROSE_MESSAGES;

  return (
    <section className="relative min-h-screen px-5 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(245,69,111,0.16),transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-script text-rose-300/80 text-xl mb-2">🌹 Atirgul bog\'i 🌹</p>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold rose-gradient-text text-glow">
            Sevgi bog\'im
          </h2>
          <p className="mt-4 font-body text-rose-100/75 max-w-xl mx-auto text-sm sm:text-base">
            {ROSE_GARDEN_INTRO}
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-8">
          {roses.map((msg, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: 'backOut' }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenIdx(i)}
              className="group relative aspect-square"
              aria-label={`Atirgul ${i + 1}`}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
              />
              <div className="relative h-full w-full animate-float-slow" style={{ animationDelay: `${i * 0.3}s` }}>
                <RoseSvg active={openIdx === i} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* message modal */}
      <AnimatePresence>
        {openIdx !== null && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIdx(null)}
          >
            <div className="absolute inset-0 bg-night-950/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.7, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 18 }}
              className="relative glass-rose rounded-3xl px-8 py-10 max-w-md text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-4 h-16 w-16">
                <RoseSvg active />
              </div>
              <p className="font-script text-2xl text-rose-200 leading-relaxed">
                {roses[openIdx]}
              </p>
              <button
                onClick={() => setOpenIdx(null)}
                className="mt-6 rounded-full bg-rose-500/30 hover:bg-rose-500/50 px-6 py-2 text-sm text-rose-50 transition-colors"
              >
                Yopish
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
