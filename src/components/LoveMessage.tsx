import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart } from 'lucide-react';
import { LOVE_MESSAGE_TEXT } from '@/data/content';

/**
 * Love message with a typing animation that triggers when scrolled into view.
 */
export default function LoveMessage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const speed = 38;
    const interval = window.setInterval(() => {
      i++;
      setTyped(LOVE_MESSAGE_TEXT.slice(0, i));
      if (i >= LOVE_MESSAGE_TEXT.length) {
        window.clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => window.clearInterval(interval);
  }, [inView]);

  // split the typed text to render the heading (first line) bigger
  const firstNewline = typed.indexOf('\n');
  const heading = firstNewline >= 0 ? typed.slice(0, firstNewline) : typed;
  const body = firstNewline >= 0 ? typed.slice(firstNewline + 1) : '';

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-5 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(245,69,111,0.18),transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl glass-rose rounded-3xl px-6 py-10 sm:px-12 sm:py-14 text-center shadow-2xl shadow-rose-950/40"
      >
        <motion.div
          className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/20"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          <Heart className="h-6 w-6 text-rose-300 fill-rose-400" />
        </motion.div>

        <h2 className="font-display text-3xl sm:text-4xl font-semibold rose-gradient-text text-glow min-h-[1.2em]">
          {heading || '\u00A0'}
          {!done && <span className="type-caret" />}
        </h2>

        <p className="mt-5 font-body text-base sm:text-lg leading-relaxed text-rose-50/90 whitespace-pre-line min-h-[6em]">
          {body}
        </p>
      </motion.div>
    </section>
  );
}
