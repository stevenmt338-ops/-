import React from 'react';

interface AngelsLayerProps {
  isVisible: boolean;
}

// Classical Fine-Art Renaissance Angel Vector with realistic feathered wings and golden halo
const AngelArt: React.FC<{ flipX?: boolean; tilt?: string }> = ({ flipX = false, tilt = '0deg' }) => {
  return (
    <svg
      viewBox="0 0 180 220"
      className="w-32 h-40 sm:w-44 sm:h-52 md:w-56 md:h-68 filter drop-shadow-[0_12px_30px_rgba(212,175,55,0.5)] transition-transform duration-1000"
      style={{
        transform: `scaleX(${flipX ? -1 : 1}) rotate(${tilt})`,
      }}
    >
      <defs>
        {/* Luminous Wing Feather Layers */}
        <linearGradient id="featherGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#fde047" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="featherGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#fef08a" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0.65" />
        </linearGradient>

        {/* Ethereal Silk Robe */}
        <linearGradient id="angelSilk" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#fafaf9" />
          <stop offset="80%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>

        {/* Celestial Angel Halo */}
        <radialGradient id="celestialAngelHalo" cx="50%" cy="50%" r="50%">
          <stop offset="40%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#fef08a" />
          <stop offset="95%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#92400e" />
        </radialGradient>
      </defs>

      {/* Luminous Angelic Halo */}
      <circle
        cx="90"
        cy="42"
        r="26"
        fill="none"
        stroke="url(#celestialAngelHalo)"
        strokeWidth="3.5"
        className="animate-pulse"
      />
      <circle cx="90" cy="42" r="30" fill="none" stroke="rgba(254,240,138,0.5)" strokeWidth="1" strokeDasharray="3,3" />

      {/* Left Wing — Multi-Tiered Classical Feather Structure */}
      <g>
        {/* Base wing silhouette */}
        <path
          d="M 76,68 
             C 45,28 12,38 6,78 
             C 2,104 28,122 55,116 
             C 32,132 16,155 30,172 
             C 44,182 68,160 80,132 Z"
          fill="url(#featherGrad1)"
          stroke="rgba(212,175,55,0.6)"
          strokeWidth="1.2"
        />
        {/* Individual Primary Flight Feathers */}
        <path d="M 12,50 C 24,70 50,95 70,110" stroke="rgba(212,175,55,0.45)" strokeWidth="1.2" fill="none" />
        <path d="M 6,78 C 22,95 48,115 65,124" stroke="rgba(212,175,55,0.4)" strokeWidth="1.2" fill="none" />
        <path d="M 16,110 C 30,122 52,135 68,140" stroke="rgba(212,175,55,0.35)" strokeWidth="1" fill="none" />
      </g>

      {/* Right Wing — Multi-Tiered Classical Feather Structure */}
      <g>
        {/* Base wing silhouette */}
        <path
          d="M 104,68 
             C 135,28 168,38 174,78 
             C 178,104 152,122 125,116 
             C 148,132 164,155 150,172 
             C 136,182 112,160 100,132 Z"
          fill="url(#featherGrad2)"
          stroke="rgba(212,175,55,0.6)"
          strokeWidth="1.2"
        />
        {/* Individual Primary Flight Feathers */}
        <path d="M 168,50 C 156,70 130,95 110,110" stroke="rgba(212,175,55,0.45)" strokeWidth="1.2" fill="none" />
        <path d="M 174,78 C 158,95 132,115 115,124" stroke="rgba(212,175,55,0.4)" strokeWidth="1.2" fill="none" />
        <path d="M 164,110 C 150,122 128,135 112,140" stroke="rgba(212,175,55,0.35)" strokeWidth="1" fill="none" />
      </g>

      {/* Flowing Celestial Silk Robe */}
      <path
        d="M 82,64 
           C 74,96 62,150 50,208 
           C 72,216 108,216 130,208 
           C 118,150 106,96 98,64 Z"
        fill="url(#angelSilk)"
        stroke="rgba(212,175,55,0.5)"
        strokeWidth="1.2"
      />
      {/* Robe Fold Shading */}
      <path d="M 88,100 C 82,140 76,180 72,210" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" fill="none" />
      <path d="M 98,100 C 102,140 106,180 110,210" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" fill="none" />

      {/* Gold Embroidered Neckline & Sash */}
      <path d="M 78,80 Q 90,92 102,80" stroke="#d4af37" strokeWidth="2.5" fill="none" />

      {/* Serene Head Profile with Flowing Golden Curls */}
      <circle cx="90" cy="44" r="15" fill="#fef3c7" />
      <path
        d="M 74,42 C 76,28 104,28 106,42 C 106,31 99,25 90,25 C 81,25 74,31 74,42 Z"
        fill="#92400e"
      />

      {/* Hands Folded in Reverent Prayer */}
      <path
        d="M 84,74 C 88,68 92,68 96,74 L 90,86 Z"
        fill="#fde68a"
        stroke="#ca8a04"
        strokeWidth="1.2"
      />
    </svg>
  );
};

export const AngelsLayer: React.FC<AngelsLayerProps> = ({ isVisible }) => {
  return (
    <div
      className={`fixed inset-0 pointer-events-none z-20 transition-opacity duration-1500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Top-Right Angel */}
      <div
        className={`absolute top-2 right-2 sm:top-4 sm:right-6 md:top-6 md:right-8 transition-all duration-2000 ease-out ${
          isVisible ? 'translate-x-0 translate-y-0 opacity-100 scale-100' : 'translate-x-28 -translate-y-28 opacity-0 scale-75'
        }`}
      >
        <div className="animate-pulse duration-3000">
          <AngelArt flipX={false} tilt="-6deg" />
        </div>
      </div>

      {/* Top-Left Angel */}
      <div
        className={`absolute top-2 left-2 sm:top-4 sm:left-6 md:top-6 md:left-8 transition-all duration-2000 ease-out ${
          isVisible ? 'translate-x-0 translate-y-0 opacity-100 scale-100' : '-translate-x-28 -translate-y-28 opacity-0 scale-75'
        }`}
      >
        <div className="animate-pulse duration-3000 delay-300">
          <AngelArt flipX={true} tilt="6deg" />
        </div>
      </div>

      {/* Bottom-Right Angel */}
      <div
        className={`absolute bottom-2 right-2 sm:bottom-4 sm:right-6 md:bottom-6 md:right-8 transition-all duration-2000 ease-out ${
          isVisible ? 'translate-x-0 translate-y-0 opacity-95 scale-95' : 'translate-x-28 translate-y-28 opacity-0 scale-75'
        }`}
      >
        <div className="animate-pulse duration-3000 delay-500">
          <AngelArt flipX={false} tilt="-10deg" />
        </div>
      </div>

      {/* Bottom-Left Angel */}
      <div
        className={`absolute bottom-2 left-2 sm:bottom-4 sm:left-6 md:bottom-6 md:left-8 transition-all duration-2000 ease-out ${
          isVisible ? 'translate-x-0 translate-y-0 opacity-95 scale-95' : '-translate-x-28 translate-y-28 opacity-0 scale-75'
        }`}
      >
        <div className="animate-pulse duration-3000 delay-700">
          <AngelArt flipX={true} tilt="10deg" />
        </div>
      </div>
    </div>
  );
};
