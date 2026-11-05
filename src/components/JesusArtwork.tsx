import React from 'react';

interface JesusArtworkProps {
  revealProgress: 'entering' | 'crescendo_peak' | 'settled';
}

export const JesusArtwork: React.FC<JesusArtworkProps> = ({ revealProgress }) => {
  const isPeak = revealProgress === 'crescendo_peak';
  const isSettled = revealProgress === 'settled';

  return (
    <div className="relative flex flex-col items-center justify-center pointer-events-none select-none my-1 sm:my-2">
      {/* Dynamic Cinematic Sunburst Rays (360-degree Rotating Volumetric Light Shafts) */}
      <div
        className={`absolute w-80 h-80 sm:w-[480px] sm:h-[480px] md:w-[560px] md:h-[560px] rounded-full pointer-events-none transition-all duration-2000 ${
          isPeak
            ? 'scale-125 opacity-100 filter drop-shadow-[0_0_60px_rgba(250,204,21,1)]'
            : isSettled
            ? 'scale-100 opacity-75 filter drop-shadow-[0_0_35px_rgba(250,204,21,0.65)]'
            : 'scale-90 opacity-40'
        }`}
      >
        <svg viewBox="0 0 500 500" className="w-full h-full animate-ray-slow">
          <defs>
            <radialGradient id="celestialVolumetricRay" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffdf0" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#fef08a" stopOpacity="0.75" />
              <stop offset="55%" stopColor="#fde047" stopOpacity="0.35" />
              <stop offset="85%" stopColor="#ca8a04" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#854d0e" stopOpacity="0" />
            </radialGradient>
          </defs>
          {Array.from({ length: 32 }).map((_, i) => {
            const angle = (i * 360) / 32;
            const width = i % 2 === 0 ? 12 : 7;
            return (
              <polygon
                key={i}
                points={`250,250 ${250 - width},20 ${250 + width},20`}
                fill="url(#celestialVolumetricRay)"
                transform={`rotate(${angle} 250 250)`}
              />
            );
          })}
        </svg>
      </div>

      {/* Radiant Golden Circular Bloom Aura */}
      <div
        className={`absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full transition-all duration-1500 ${
          isPeak
            ? 'bg-gradient-radial from-white via-amber-200/80 to-transparent scale-120 opacity-100 blur-2xl'
            : 'bg-gradient-radial from-white via-amber-200/50 to-transparent scale-100 opacity-80 blur-xl'
        }`}
      />

      {/* Classical Masterwork Depiction of Jesus Christ */}
      <div
        className={`relative z-10 w-52 h-64 sm:w-64 sm:h-80 md:w-76 md:h-92 transition-all duration-1500 ease-out ${
          isPeak ? 'scale-105' : 'scale-100'
        }`}
      >
        <svg
          viewBox="0 0 260 320"
          className="w-full h-full filter drop-shadow-[0_16px_40px_rgba(180,83,9,0.5)]"
        >
          <defs>
            {/* Fine Art Skin Tone Chiaroscuro Gradient */}
            <linearGradient id="fineSkin" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#ffedd5" />
              <stop offset="50%" stopColor="#fed7aa" />
              <stop offset="80%" stopColor="#fba36e" />
              <stop offset="100%" stopColor="#c26330" />
            </linearGradient>

            {/* Radiant Celestial Halo with Byzantine Filigree */}
            <radialGradient id="masterHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#eab308" />
              <stop offset="90%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#854d0e" />
            </radialGradient>

            {/* Draped Pearl-White Tunic */}
            <linearGradient id="pearlTunic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#fafaf9" />
              <stop offset="65%" stopColor="#f5f5f4" />
              <stop offset="85%" stopColor="#e7e5e4" />
              <stop offset="100%" stopColor="#d6d3d1" />
            </linearGradient>

            {/* Classical Crimson / Royal Gold Drapery */}
            <linearGradient id="royalSash" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="35%" stopColor="#b91c1c" />
              <stop offset="70%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#450a0a" />
            </linearGradient>

            {/* Gold Leaf Hem Thread */}
            <linearGradient id="goldHem" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ca8a04" />
              <stop offset="50%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>

            {/* Flowing Chestnut Hair Highlights */}
            <linearGradient id="chestnutHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#543019" />
              <stop offset="40%" stopColor="#3d1f0f" />
              <stop offset="80%" stopColor="#281308" />
              <stop offset="100%" stopColor="#150803" />
            </linearGradient>
          </defs>

          {/* Majestic Triple Celestial Halo */}
          <circle cx="130" cy="78" r="54" fill="url(#masterHalo)" opacity="0.95" />
          <circle cx="130" cy="78" r="58" fill="none" stroke="#fde047" strokeWidth="2.5" strokeDasharray="5,2" opacity="0.8" />
          <circle cx="130" cy="78" r="62" fill="none" stroke="#ca8a04" strokeWidth="1.2" opacity="0.6" />

          {/* Inscribed Golden Cross of Glory inside Halo */}
          <rect x="126" y="24" width="8" height="108" fill="#ffffff" opacity="0.75" rx="2" />
          <rect x="76" y="74" width="108" height="8" fill="#ffffff" opacity="0.75" rx="2" />

          {/* Volumetric Hair Behind Face */}
          <path
            d="M 102,68 
               C 90,48 108,30 130,30 
               C 152,30 170,48 158,68 
               C 166,95 172,135 162,160 
               C 154,145 150,120 150,105 
               C 146,115 114,115 110,105 
               C 110,120 106,145 98,160 
               C 88,135 94,95 102,68 Z"
            fill="url(#chestnutHair)"
          />

          {/* Serene Masterwork Face Contour */}
          <path
            d="M 110,65 
               C 108,54 118,46 130,46 
               C 142,46 152,54 150,65 
               C 151,84 146,100 130,103 
               C 114,100 109,84 110,65 Z"
            fill="url(#fineSkin)"
          />

          {/* Finely Sculpted Soft Beard and Mustache */}
          <path
            d="M 117,83 
               C 123,86 137,86 143,83 
               C 146,95 141,111 130,114 
               C 119,111 114,95 117,83 Z"
            fill="#3d1f0f"
          />

          {/* Compassionate, Loving Eyes with Natural Specular Highlights */}
          <ellipse cx="123" cy="67" rx="3.5" ry="2.2" fill="#29150a" />
          <ellipse cx="137" cy="67" rx="3.5" ry="2.2" fill="#29150a" />
          <circle cx="123.8" cy="66.5" r="0.9" fill="#ffffff" />
          <circle cx="137.8" cy="66.5" r="0.9" fill="#ffffff" />
          <path d="M 119,63 Q 123,61 127,63" stroke="#29150a" strokeWidth="1.2" fill="none" />
          <path d="M 133,63 Q 137,61 141,63" stroke="#29150a" strokeWidth="1.2" fill="none" />

          {/* Gentle Nose & Natural Lips */}
          <path d="M 130,67 L 129,76 L 132,76" stroke="#b45309" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <path d="M 125,80 Q 130,83 135,80" stroke="#991b1b" strokeWidth="1.4" fill="none" strokeLinecap="round" />

          {/* Classical Pearl-White Robe with Realistic Chiaroscuro Folds */}
          <path
            d="M 106,112 
               C 74,130 44,178 30,310 
               C 95,320 165,320 230,310 
               C 216,178 186,130 154,112 Z"
            fill="url(#pearlTunic)"
            stroke="#e7e5e4"
            strokeWidth="1.5"
          />

          {/* Flowing Cloth Fold Shadows */}
          <path d="M 70,170 C 80,220 90,270 95,315" stroke="rgba(0,0,0,0.12)" strokeWidth="3" fill="none" />
          <path d="M 190,170 C 180,220 170,270 165,315" stroke="rgba(0,0,0,0.12)" strokeWidth="3" fill="none" />
          <path d="M 130,130 C 130,190 128,260 127,318" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />

          {/* Royal Crimson & Gold Robe Drape over Left Shoulder */}
          <path
            d="M 98,118 
               C 106,148 135,215 146,312 
               C 165,312 184,310 196,305 
               C 176,220 158,150 162,118 Z"
            fill="url(#royalSash)"
            stroke="url(#goldHem)"
            strokeWidth="2"
          />

          {/* Gold Inlaid Hem at Neckline */}
          <path
            d="M 112,112 Q 130,126 148,112 Q 130,120 112,112 Z"
            fill="url(#goldHem)"
            stroke="#fef08a"
            strokeWidth="1"
          />

          {/* Sacred Hand Raised in Blessing of Peace (يد السلام والبركة) */}
          <g transform="translate(162, 150)">
            <ellipse cx="16" cy="20" rx="9" ry="14" fill="url(#fineSkin)" />
            {/* Raised Blessing Fingers */}
            <rect x="14" y="2" width="5" height="16" rx="2.5" fill="url(#fineSkin)" />
            <rect x="8" y="5" width="5" height="14" rx="2.5" fill="url(#fineSkin)" />
            <path d="M 19,14 Q 26,16 23,23" stroke="#b45309" strokeWidth="1.2" fill="none" />
            <circle cx="16" cy="18" r="1.5" fill="#ca8a04" opacity="0.7" />
          </g>

          {/* Left Hand Open in Welcoming Grace across Heart */}
          <g transform="translate(80, 158)">
            <ellipse cx="14" cy="18" rx="9" ry="12" fill="url(#fineSkin)" />
            <path d="M 9,12 Q 16,16 21,12" stroke="#b45309" strokeWidth="1.2" fill="none" />
          </g>

          {/* Sacred Radiance Bloom over Chest */}
          <circle cx="130" cy="165" r="18" fill="url(#masterHalo)" opacity="0.4" className="animate-pulse" />
        </svg>
      </div>
    </div>
  );
};
