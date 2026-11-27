import { useEffect, useRef } from 'react';

/**
 * Lightweight canvas particle field.
 * Renders drifting rose petals and glowing hearts/embers in the background.
 * Designed to be cheap: capped particle counts, single rAF loop, DPR-aware.
 */
type ParticleKind = 'petal' | 'heart' | 'ember';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  kind: ParticleKind;
  hue: number;
  alpha: number;
  life: number;
}

interface PetalsFieldProps {
  /** density multiplier; lower on small screens for performance */
  density?: number;
  className?: string;
}

function makeParticle(w: number, h: number, kind: ParticleKind): Particle {
  const r = Math.random();
  if (kind === 'petal') {
    return {
      x: Math.random() * w,
      y: -20 - Math.random() * h * 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: 0.3 + Math.random() * 0.7,
      size: 8 + Math.random() * 14,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.02,
      kind,
      hue: 340 + Math.random() * 20,
      alpha: 0.5 + Math.random() * 0.4,
      life: 1,
    };
  }
  if (kind === 'ember') {
    return {
      x: Math.random() * w,
      y: h + Math.random() * 40,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -(0.3 + Math.random() * 0.8),
      size: 1 + Math.random() * 2.5,
      rot: 0,
      vr: 0,
      kind,
      hue: Math.random() > 0.5 ? 38 : 345,
      alpha: 0.5 + Math.random() * 0.5,
      life: 1,
    };
  }
  // heart
  return {
    x: Math.random() * w,
    y: -20 - Math.random() * h * 0.3,
    vx: (Math.random() - 0.5) * 0.3,
    vy: 0.2 + Math.random() * 0.5,
    size: 4 + Math.random() * 8,
    rot: 0,
    vr: 0,
    kind,
    hue: 345,
    alpha: 0.4 + Math.random() * 0.4,
    life: 1,
  };
}

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, alpha: number, hue: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s / 16, s / 16);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = `hsl(${hue}, 85%, 65%)`;
  ctx.beginPath();
  ctx.moveTo(0, 4);
  ctx.bezierCurveTo(-6, -4, -12, 2, 0, 12);
  ctx.bezierCurveTo(12, 2, 6, -4, 0, 4);
  ctx.fill();
  ctx.restore();
}

function drawPetal(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  ctx.globalAlpha = p.alpha;
  const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
  grad.addColorStop(0, `hsla(${p.hue}, 80%, 72%, 0.9)`);
  grad.addColorStop(1, `hsla(${p.hue}, 75%, 45%, 0.4)`);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(0, 0, p.size * 0.55, p.size, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawEmber(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.globalAlpha = p.alpha;
  ctx.fillStyle = `hsl(${p.hue}, 100%, 70%)`;
  ctx.shadowBlur = 12;
  ctx.shadowColor = `hsl(${p.hue}, 100%, 60%)`;
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export default function PetalsField({ density = 1, className }: PetalsFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h, dpr };
      // adjust particle count
      const screenArea = w * h;
      const baseCount = Math.min(90, Math.floor(screenArea / 16000));
      const target = Math.max(24, Math.floor(baseCount * density));
      const arr = particlesRef.current;
      while (arr.length < target) {
        const r = Math.random();
        const kind: ParticleKind = r < 0.55 ? 'petal' : r < 0.85 ? 'ember' : 'heart';
        arr.push(makeParticle(w, h, kind));
      }
      while (arr.length > target) arr.pop();
    };
    resize();
    window.addEventListener('resize', resize);

    const tick = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      const arr = particlesRef.current;
      for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        // gentle horizontal sway for petals
        if (p.kind === 'petal') {
          p.vx += Math.sin(p.y * 0.01) * 0.002;
          p.vx = Math.max(-0.8, Math.min(0.8, p.vx));
        }
        const off = p.kind === 'ember' ? p.y < -20 : p.y > h + 30;
        if (off) {
          arr[i] = makeParticle(w, h, p.kind);
          continue;
        }
        if (p.kind === 'petal') drawPetal(ctx, p);
        else if (p.kind === 'ember') drawEmber(ctx, p);
        else drawHeart(ctx, p.x, p.y, p.size, p.alpha, p.hue);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
