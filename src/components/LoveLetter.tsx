import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Heart } from 'lucide-react';
import { LETTER_LINES } from '@/data/content';

/**
 * Interactive love letter envelope. Click to open with a realistic flap
 * animation, then reveal a handwritten-style letter whose lines appear
 * gradually, with floating hearts.
 */
export default function LoveLetter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [open, setOpen] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!open) return;
    setVisibleLines(0);
    let i = 0;
    const interval = window.setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= LETTER_LINES.length) window.clearInterval(interval);
    }, 380);
    return () => window.clearInterval(interval);
  }, [open]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-5 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(245,69,111,0.14),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-lg text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-3xl sm:text-5xl font-semibold rose-gradient-text text-glow mb-3"
        >
          Sevgi xati 💌
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-rose-100/70 text-sm sm:text-base mb-10"
        >
          Konvertni ochish uchun bosing.
        </motion.p>

        {/* Envelope / Letter stage */}
        <div className="relative mx-auto h-72 sm:h-80 w-full max-w-md" style={{ perspective: '1200px' }}>
          {/* envelope body */}
          <motion.div
            className="absolute inset-0 rounded-lg shadow-2xl shadow-rose-950/50"
            style={{ transformStyle: 'preserve-3d' }}
            animate={open ? { y: -8, scale: 0.98 } : { y: 0, scale: 1 }}
          >
            {/* back panel */}
            <div className="absolute inset-0 bg-gradient-to-b from-rose-700 to-rose-900 rounded-lg" />
            {/* letter inside (slides up when open) */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ y: 40, opacity: 0, rotateX: -10 }}
                  animate={{ y: -120, opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="absolute left-1/2 top-3 z-10 w-[86%] -translate-x-1/2 rounded-md bg-cream-100 text-night-900 shadow-xl p-5 sm:p-6 text-left"
                >
                  <div className="font-script text-lg sm:text-xl leading-relaxed space-y-1 max-h-60 overflow-hidden">
                    {LETTER_LINES.slice(0, visibleLines).map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={line === '' ? 'h-2' : ''}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* front pocket (covers bottom) */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-rose-600 to-rose-800 rounded-b-lg" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 [clip-path:polygon(0_0,100%_0,50%_100%)] bg-gradient-to-b from-rose-500/90 to-rose-700" />

            {/* wax seal */}
            {!open && (
              <motion.button
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-16 w-16 rounded-full bg-gradient-to-br from-rose-500 to-rose-800 flex items-center justify-center shadow-lg ring-2 ring-rose-300/40"
                aria-label="Xatni ochish"
              >
                <motion.span
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="h-7 w-7 text-rose-100 fill-rose-200" />
                </motion.span>
              </motion.button>
            )}

            {/* flap (top triangle) */}
            <motion.div
              className="absolute inset-x-0 top-0 h-1/2 [clip-path:polygon(0_0,100%_0,50%_100%)] origin-top bg-gradient-to-b from-rose-500 to-rose-700"
              style={{ transformStyle: 'preserve-3d', transformOrigin: 'top' }}
              animate={open ? { rotateX: -175 } : { rotateX: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* floating hearts when open */}
          {open && (
            <div className="pointer-events-none absolute inset-0">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: (Math.random() - 0.5) * 280,
                    y: -80 - Math.random() * 160,
                    opacity: [0, 1, 0],
                    scale: 1,
                  }}
                  transition={{ duration: 2.4, delay: 0.3 + i * 0.12, repeat: Infinity, repeatDelay: 0.5 }}
                >
                  <Heart size={12 + Math.random() * 12} className="text-rose-300 fill-rose-400" />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {open && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => setOpen(false)}
            className="mt-8 rounded-full bg-rose-500/20 hover:bg-rose-500/40 px-6 py-2 text-sm text-rose-50 transition-colors"
          >
            Yopish
          </motion.button>
        )}
      </div>
    </section>
  );
}
