import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { KINGDOM_INTRO } from '@/data/content';

function Castle() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-auto" aria-hidden>
      <defs>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf0c8" />
          <stop offset="100%" stopColor="#b27509" />
        </linearGradient>
        <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5456f" />
          <stop offset="100%" stopColor="#7d1538" />
        </linearGradient>
        <radialGradient id="glowGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(245,201,75,0.5)" />
          <stop offset="100%" stopColor="rgba(245,201,75,0)" />
        </radialGradient>
      </defs>

      {/* glow */}
      <ellipse cx="200" cy="120" rx="180" ry="80" fill="url(#glowGrad)" />

      {/* main keep */}
      <rect x="160" y="120" width="80" height="140" fill="url(#wallGrad)" stroke="#8f5a0b" strokeWidth="1.5" />
      {/* side towers */}
      <rect x="90" y="150" width="50" height="110" fill="url(#wallGrad)" stroke="#8f5a0b" strokeWidth="1.5" />
      <rect x="260" y="150" width="50" height="110" fill="url(#wallGrad)" stroke="#8f5a0b" strokeWidth="1.5" />
      {/* outer walls */}
      <rect x="40" y="190" width="320" height="70" fill="url(#wallGrad)" opacity="0.85" stroke="#8f5a0b" strokeWidth="1" />

      {/* battlements */}
      {[160, 180, 200, 220].map((x) => (
        <rect key={x} x={x} y="112" width="8" height="10" fill="url(#wallGrad)" stroke="#8f5a0b" strokeWidth="1" />
      ))}
      {[90, 110, 130].map((x) => (
        <rect key={x} x={x} y="142" width="8" height="10" fill="url(#wallGrad)" stroke="#8f5a0b" strokeWidth="1" />
      ))}
      {[260, 280, 300].map((x) => (
        <rect key={x} x={x} y="142" width="8" height="10" fill="url(#wallGrad)" stroke="#8f5a0b" strokeWidth="1" />
      ))}

      {/* roofs */}
      <polygon points="90,150 115,110 140,150" fill="url(#roofGrad)" />
      <polygon points="260,150 285,110 310,150" fill="url(#roofGrad)" />
      <polygon points="160,120 200,70 240,120" fill="url(#roofGrad)" />

      {/* flags */}
      <line x1="200" y1="70" x2="200" y2="40" stroke="#fae08c" strokeWidth="1.5" />
      <path d="M200 42 L218 48 L200 54 Z" fill="#f5456f" />
      <line x1="115" y1="110" x2="115" y2="86" stroke="#fae08c" strokeWidth="1.2" />
      <path d="M115 88 L130 93 L115 98 Z" fill="#f5456f" />
      <line x1="285" y1="110" x2="285" y2="86" stroke="#fae08c" strokeWidth="1.2" />
      <path d="M285 88 L300 93 L285 98 Z" fill="#f5456f" />

      {/* gate */}
      <path d="M185 260 L185 220 Q200 200 215 220 L215 260 Z" fill="#47071f" />
      {/* windows */}
      <rect x="194" y="150" width="12" height="20" rx="6" fill="#fae08c" opacity="0.9" />
      <rect x="104" y="175" width="10" height="16" rx="5" fill="#fae08c" opacity="0.8" />
      <rect x="286" y="175" width="10" height="16" rx="5" fill="#fae08c" opacity="0.8" />
    </svg>
  );
}

function Crown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 70" className={className} aria-hidden>
      <defs>
        <linearGradient id="crownGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fae08c" />
          <stop offset="100%" stopColor="#b27509" />
        </linearGradient>
      </defs>
      <path d="M10 55 L20 20 L35 40 L50 12 L65 40 L80 20 L90 55 Z" fill="url(#crownGrad)" stroke="#8f5a0b" strokeWidth="1.5" />
      <rect x="10" y="55" width="80" height="10" rx="3" fill="url(#crownGrad)" stroke="#8f5a0b" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="3.5" fill="#f5456f" />
      <circle cx="50" cy="12" r="4" fill="#f5456f" />
      <circle cx="80" cy="20" r="3.5" fill="#f5456f" />
      <circle cx="35" cy="60" r="2.5" fill="#ff7194" />
      <circle cx="50" cy="60" r="2.5" fill="#ff7194" />
      <circle cx="65" cy="60" r="2.5" fill="#ff7194" />
    </svg>
  );
}

export default function Kingdom() {
  return (
    <section className="relative min-h-screen px-5 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-night-950 via-rose-950/40 to-night-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(212,150,10,0.18),transparent_60%)]" />

      {/* floating glowing hearts */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-400/50"
          style={{ left: `${8 + i * 11}%`, top: `${15 + (i % 4) * 18}%` }}
          animate={{ y: [0, -24, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.4 }}
        >
          <Heart size={14 + (i % 3) * 6} className="fill-rose-500/40" />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-2 w-24 animate-float-mid"
        >
          <Crown className="w-24 drop-shadow-[0_0_18px_rgba(245,201,75,0.6)]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-3xl sm:text-5xl font-semibold"
        >
          <span className="gold-gradient-text text-glow-gold">Kavin</span>
          <span className="text-rose-300 mx-2">va</span>
          <span className="gold-gradient-text text-glow-gold">Leyli</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="my-10 mx-auto max-w-md"
        >
          <Castle />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto max-w-xl font-script text-2xl sm:text-3xl text-rose-100/90 leading-relaxed"
        >
          {KINGDOM_INTRO}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 flex items-center justify-center gap-3 text-rose-300/70"
        >
          <Crown className="w-8 opacity-80" />
          <Crown className="w-10 opacity-100" />
          <Crown className="w-8 opacity-80" />
        </motion.div>
      </div>
    </section>
  );
}
