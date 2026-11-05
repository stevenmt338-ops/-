import React, { useEffect, useRef } from 'react';

interface DarkWorldProps {
  children: React.ReactNode;
}

export const DarkWorld: React.FC<DarkWorldProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Realistic cinematic smoke & floating ember physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Realistic volumetric smoke clouds
    const smokePuffs = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: height * 0.4 + Math.random() * (height * 0.6),
      radius: Math.random() * 140 + 90,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.3 + 0.15),
      alpha: Math.random() * 0.08 + 0.03,
      pulse: Math.random() * 0.015 + 0.005,
    }));

    // Micro dark-crimson embers
    const embers = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.7 + 0.25),
      alpha: Math.random() * 0.5 + 0.2,
      flicker: Math.random() * 0.03 + 0.01,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render drifting soft smoke clouds
      const time = Date.now();
      smokePuffs.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.alpha += Math.sin(time * s.pulse) * 0.001;

        if (s.y < -s.radius) {
          s.y = height + s.radius;
          s.x = Math.random() * width;
        }

        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
        grad.addColorStop(0, `rgba(180, 20, 20, ${Math.max(0.01, Math.min(0.09, s.alpha))})`);
        grad.addColorStop(0.5, `rgba(40, 5, 5, ${Math.max(0.005, Math.min(0.05, s.alpha * 0.6))})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render micro crimson embers
      embers.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.alpha += Math.sin(time * p.flicker) * 0.01;

        if (p.y < 0) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239, 68, 68, ${Math.max(0.1, Math.min(0.7, p.alpha))})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(239, 68, 68, 0.8)';
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-x-hidden bg-[#000000] text-neutral-100 select-none">
      {/* Terrifying Pure Black Backdrop with Subtle Volumetric Red Rim Lighting */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 40%, rgba(95, 12, 12, 0.28) 0%, rgba(20, 2, 2, 0.65) 50%, rgba(0, 0, 0, 0.99) 95%),
            radial-gradient(ellipse at 50% 95%, rgba(136, 19, 19, 0.22) 0%, transparent 65%)
          `,
        }}
      />

      {/* Atmospheric Smoke & Embers Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />

      {/* Deep Vignette Shadow Frame */}
      <div className="fixed inset-0 pointer-events-none z-15 shadow-[inset_0_0_120px_rgba(0,0,0,0.95)]" />

      {/* Centerpiece Container: Show ONLY the Board and Question Input */}
      <main className="relative z-20 w-full max-w-2xl flex flex-col items-center justify-center px-2 sm:px-4 py-4 sm:py-6">
        {children}
      </main>
    </div>
  );
};
