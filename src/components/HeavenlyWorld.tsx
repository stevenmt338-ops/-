import React, { useEffect, useRef } from 'react';
import { AngelsLayer } from './AngelsLayer';
import { JesusArtwork } from './JesusArtwork';
import { AnswerCard } from './AnswerCard';
import { AnswerData } from '../types';

interface HeavenlyWorldProps {
  stage: 'ANGELS_APPEARING' | 'JESUS_REVEAL' | 'ANSWER_VISIBLE';
  answerData: AnswerData;
  onNewQuestion: () => void;
  onReplay: () => void;
  onReset: () => void;
}

export const HeavenlyWorld: React.FC<HeavenlyWorldProps> = ({
  stage,
  answerData,
  onNewQuestion,
  onReplay,
  onReset,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Realistic Golden Sparkles & Soft Feathers Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Golden celestial stardust
    const sparkles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.6 + 0.25),
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.7 + 0.3,
      glow: Math.random() * 0.03 + 0.01,
    }));

    // Soft falling white feathers
    const feathers = Array.from({ length: 16 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 14 + 8,
      width: Math.random() * 5 + 3,
      speedY: Math.random() * 0.55 + 0.2,
      swaySpeed: Math.random() * 0.02 + 0.01,
      swayOffset: Math.random() * 100,
      angle: Math.random() * Math.PI,
      opacity: Math.random() * 0.45 + 0.35,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render golden sparkles
      const now = Date.now();
      sparkles.forEach((s) => {
        s.y += s.speedY;
        s.x += s.speedX;
        s.opacity += Math.sin(now * s.glow) * 0.01;

        if (s.y < 0) {
          s.y = height + 5;
          s.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${Math.max(0.15, Math.min(0.85, s.opacity))})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(251, 191, 36, 0.9)';
        ctx.fill();
      });

      // Render falling feathers with realistic swaying physics
      feathers.forEach((f) => {
        f.y += f.speedY;
        const sway = Math.sin(now * f.swaySpeed + f.swayOffset) * 1.6;
        f.x += sway * 0.45;
        f.angle = Math.sin(now * f.swaySpeed + f.swayOffset) * 0.35;

        if (f.y > height + 25) {
          f.y = -25;
          f.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.angle);

        ctx.beginPath();
        ctx.ellipse(0, 0, f.width, f.length, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(254, 243, 199, 0.5)';
        ctx.fill();

        // Quill spine
        ctx.beginPath();
        ctx.moveTo(0, -f.length);
        ctx.lineTo(0, f.length);
        ctx.strokeStyle = `rgba(253, 230, 138, ${f.opacity * 0.8})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const showAngels = stage === 'ANGELS_APPEARING' || stage === 'JESUS_REVEAL' || stage === 'ANSWER_VISIBLE';
  const showJesus = stage === 'JESUS_REVEAL' || stage === 'ANSWER_VISIBLE';
  const revealProgress = stage === 'JESUS_REVEAL' ? 'crescendo_peak' : 'settled';

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-x-hidden bg-gradient-to-b from-[#ffffff] via-[#fdfbf6] to-[#fef3c7] text-neutral-900 transition-colors duration-1000 select-none">
      {/* Breathtaking Pure White and Gold Radiance Background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 32%, rgba(254, 240, 138, 0.45) 0%, rgba(253, 230, 138, 0.22) 45%, rgba(255, 255, 255, 0.98) 100%),
            radial-gradient(circle at 50% 8%, rgba(250, 204, 21, 0.3) 0%, transparent 60%)
          `,
        }}
      />

      {/* Volumetric Realistic Clouds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-50 mix-blend-screen">
        <svg
          viewBox="0 0 1000 300"
          className="absolute -top-12 left-0 w-[150%] sm:w-[130%] h-auto animate-mist"
        >
          <path
            d="M 0,150 Q 150,50 300,120 Q 450,20 600,100 Q 750,30 900,120 Q 1000,70 1100,160 L 1100,300 L 0,300 Z"
            fill="rgba(255, 255, 255, 0.75)"
          />
        </svg>
        <svg
          viewBox="0 0 1000 300"
          className="absolute bottom-0 right-0 w-[150%] sm:w-[125%] h-auto animate-mist opacity-65"
          style={{ animationDirection: 'reverse', animationDuration: '20s' }}
        >
          <path
            d="M 0,200 Q 200,80 400,160 Q 600,60 800,150 Q 1000,90 1200,200 L 1200,300 L 0,300 Z"
            fill="rgba(254, 243, 199, 0.6)"
          />
        </svg>
      </div>

      {/* Golden Sparkles and Feathers Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-15" />

      {/* 4 Beautiful Corner Angels */}
      <AngelsLayer isVisible={showAngels} />

      {/* SHOW ONLY THE SCENE AND GENERATED ANSWER */}
      <main className="relative z-25 w-full max-w-xl flex flex-col items-center justify-center px-2 sm:px-4 py-2 sm:py-4">
        {/* Jesus Artwork Depiction in Center */}
        <div
          className={`transition-all duration-1500 ease-out ${
            showJesus ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'
          }`}
        >
          {showJesus && <JesusArtwork revealProgress={revealProgress} />}
        </div>

        {/* Generated Answer Card */}
        {stage === 'ANSWER_VISIBLE' && (
          <div className="w-full mt-1 sm:mt-2 animate-fade-in-up">
            <AnswerCard
              data={answerData}
              onNewQuestion={onNewQuestion}
              onReplay={onReplay}
              onReset={onReset}
            />
          </div>
        )}
      </main>
    </div>
  );
};
