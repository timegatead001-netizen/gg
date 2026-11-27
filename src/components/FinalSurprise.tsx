import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import PetalsField from './PetalsField';
import { FINAL_TITLE, FINAL_SUBTITLE, FINAL_SIGN } from '@/data/content';

export default function FinalSurprise() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-night-950 via-rose-950/60 to-night-975" />
      <PetalsField className="absolute inset-0 h-full w-full" density={0.9} />

      {/* central glowing heart */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 -m-10 rounded-full bg-rose-500/30 blur-3xl"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <Heart className="h-28 w-28 sm:h-40 sm:w-40 text-rose-400 fill-rose-500 drop-shadow-[0_0_40px_rgba(245,69,111,0.8)]" />
        </div>
      </motion.div>

      <div className="relative z-10 text-center max-w-2xl mx-auto pt-40">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-display text-3xl sm:text-5xl font-semibold rose-gradient-text text-glow leading-tight"
        >
          {FINAL_TITLE}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-6 font-script text-2xl sm:text-3xl text-rose-100/90"
        >
          {FINAL_SUBTITLE}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-10 inline-block glass-rose rounded-full px-8 py-4"
        >
          <p className="font-script text-2xl sm:text-3xl gold-gradient-text text-glow-gold">
            {FINAL_SIGN}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 text-xs text-rose-200/40 font-body"
        >
          Bu dunyo sen uchun yaratildi — abadiy.
        </motion.p>
      </div>
    </section>
  );
}
