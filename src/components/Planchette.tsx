import React from 'react';

interface PlanchetteProps {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  isMoving: boolean;
  activeChar?: string;
}

export const Planchette: React.FC<PlanchetteProps> = ({ x, y, isMoving, activeChar }) => {
  return (
    <div
      className="absolute pointer-events-none z-30 transition-all duration-700 ease-out"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Dynamic natural shadow cast onto wood below */}
      <div
        className={`relative w-20 h-24 sm:w-28 sm:h-32 transition-transform duration-500 ${
          isMoving ? 'scale-105 rotate-1' : 'scale-100 rotate-0'
        }`}
      >
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full drop-shadow-[0_16px_28px_rgba(0,0,0,0.95)] filter"
        >
          <defs>
            {/* Antique dark rosewood / mahogany body */}
            <linearGradient id="planchetteWoodGrad" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#4a1e11" />
              <stop offset="25%" stopColor="#682a17" />
              <stop offset="55%" stopColor="#3d150b" />
              <stop offset="85%" stopColor="#250a05" />
              <stop offset="100%" stopColor="#150503" />
            </linearGradient>

            {/* Hand-rubbed brass edge trim */}
            <linearGradient id="brassBezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e5c158" />
              <stop offset="30%" stopColor="#fff3b0" />
              <stop offset="65%" stopColor="#a37617" />
              <stop offset="100%" stopColor="#573e0a" />
            </linearGradient>

            {/* Optical Glass Lens Refraction & Glare */}
            <radialGradient id="convexGlassAperture" cx="32%" cy="30%" r="70%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.55)" />
              <stop offset="35%" stopColor="rgba(255, 255, 255, 0.15)" />
              <stop offset="70%" stopColor="rgba(185, 28, 28, 0.1)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0.75)" />
            </radialGradient>
          </defs>

          {/* Master Teardrop Planchette Body */}
          <path
            d="M 50,4 
               C 64,34 94,64 92,92 
               C 90,113 67,118 50,107 
               C 33,118 10,113 8,92 
               C 6,64 36,34 50,4 Z"
            fill="url(#planchetteWoodGrad)"
            stroke="url(#brassBezelGrad)"
            strokeWidth="2.2"
          />

          {/* Inset carved gothic border line */}
          <path
            d="M 50,14 
               C 61,38 85,66 83,89 
               C 81,104 64,107 50,99 
               C 36,107 19,104 17,89 
               C 15,66 39,38 50,14 Z"
            fill="none"
            stroke="rgba(229, 193, 88, 0.35)"
            strokeWidth="0.9"
            strokeDasharray="2,2"
          />

          {/* Optical Viewing Aperture Brass Frame */}
          <circle
            cx="50"
            cy="75"
            r="16.5"
            fill="none"
            stroke="url(#brassBezelGrad)"
            strokeWidth="2.8"
          />

          {/* Optical Glass Lens */}
          <circle
            cx="50"
            cy="75"
            r="15"
            fill="url(#convexGlassAperture)"
          />

          {/* Precision Brass Crosshairs */}
          <line x1="50" y1="62" x2="50" y2="88" stroke="rgba(229,193,88,0.45)" strokeWidth="0.8" />
          <line x1="37" y1="75" x2="63" y2="75" stroke="rgba(229,193,88,0.45)" strokeWidth="0.8" />

          {/* High-Refraction Glare Arc */}
          <ellipse cx="44" cy="69" rx="5" ry="2.5" fill="rgba(255,255,255,0.6)" transform="rotate(-35 44 69)" />

          {/* Fine Brass Pointer Tip at top */}
          <polygon points="50,4 47.5,13 52.5,13" fill="#fff3b0" />
        </svg>

        {/* Eerie crimson pulse when hovering over selected letter */}
        {activeChar && (
          <div className="absolute top-[62%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-red-600/50 blur-sm animate-ping pointer-events-none" />
        )}
      </div>
    </div>
  );
};
