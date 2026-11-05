import React from 'react';
import { ARABIC_LETTERS, LATIN_LETTERS, NUMBER_LETTERS, SPECIAL_SPOTS } from '../utils/boardCoordinates';
import { Planchette } from './Planchette';

interface OuijaBoardProps {
  planchettePos: { x: number; y: number };
  activeLetterKey: string | null;
  isMoving: boolean;
  activeChar?: string;
}

export const OuijaBoard: React.FC<OuijaBoardProps> = ({
  planchettePos,
  activeLetterKey,
  isMoving,
  activeChar,
}) => {
  return (
    <div className="relative w-full max-w-xl mx-auto px-1 sm:px-2 select-none">
      {/* Heavy Antique Wooden Board with Deep Bevel & Chiaroscuro Shadow */}
      <div className="relative w-full aspect-[1.38/1] rounded-2xl sm:rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-[#240e06] via-[#140603] to-[#080201] border-[5px] border-[#593016] shadow-[0_30px_70px_rgba(0,0,0,1),0_0_40px_rgba(136,19,19,0.25),inset_0_2px_4px_rgba(255,255,255,0.15),inset_0_-4px_10px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* Procedural Organic Aged Wood Grain & Patina */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0.85) 100%),
              repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px),
              repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 2px, transparent 2px, transparent 8px)
            `,
          }}
        />

        {/* Chiseled Antique Brass Inlay Border */}
        <div className="absolute inset-2 sm:inset-3 border border-[#b8860b]/40 rounded-xl pointer-events-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-1 border border-[#b8860b]/20 rounded-lg pointer-events-none border-dashed" />
        </div>

        {/* Vintage Carved Corner Filigree Emblems */}
        <div className="absolute top-3 left-3 w-8 h-8 pointer-events-none opacity-60">
          <svg viewBox="0 0 40 40" className="w-full h-full text-[#d4af37]">
            <path d="M4,4 L24,4 C14,8 8,14 4,24 Z" fill="currentColor" opacity="0.8" />
            <circle cx="9" cy="9" r="2.5" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute top-3 right-3 w-8 h-8 pointer-events-none opacity-60">
          <svg viewBox="0 0 40 40" className="w-full h-full text-[#d4af37]">
            <path d="M36,4 L16,4 C26,8 32,14 36,24 Z" fill="currentColor" opacity="0.8" />
            <circle cx="31" cy="9" r="2.5" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-3 left-3 w-8 h-8 pointer-events-none opacity-60">
          <svg viewBox="0 0 40 40" className="w-full h-full text-[#d4af37]">
            <path d="M4,36 L24,36 C14,32 8,26 4,16 Z" fill="currentColor" opacity="0.8" />
            <circle cx="9" cy="31" r="2.5" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-3 right-3 w-8 h-8 pointer-events-none opacity-60">
          <svg viewBox="0 0 40 40" className="w-full h-full text-[#d4af37]">
            <path d="M36,36 L16,36 C26,32 32,26 36,16 Z" fill="currentColor" opacity="0.8" />
            <circle cx="31" cy="31" r="2.5" fill="currentColor" />
          </svg>
        </div>

        {/* TOP ROW: Sun Emblem & YES / نعم (Left) */}
        <div className="absolute top-3.5 left-5 sm:left-7 flex items-center gap-1.5 text-amber-200/90 pointer-events-none">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37]/80 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span
            className={`font-cinzel text-[11px] sm:text-xs tracking-wider transition-all duration-300 ${
              activeLetterKey === 'spot-YES'
                ? 'text-red-400 drop-shadow-[0_0_14px_rgba(239,68,68,1)] scale-110 font-black'
                : 'text-[#e5c158]/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]'
            }`}
          >
            YES • نعم
          </span>
        </div>

        {/* Top Center Mystic Seal */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
          <span className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.3em] text-[#d4af37]/70 uppercase">
            THE GATE OUIJA
          </span>
          <div className="w-14 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mt-0.5" />
        </div>

        {/* TOP ROW: Moon Emblem & NO / لا (Right) */}
        <div className="absolute top-3.5 right-5 sm:right-7 flex items-center gap-1.5 text-amber-200/90 pointer-events-none">
          <span
            className={`font-cinzel text-[11px] sm:text-xs tracking-wider transition-all duration-300 ${
              activeLetterKey === 'spot-NO'
                ? 'text-red-400 drop-shadow-[0_0_14px_rgba(239,68,68,1)] scale-110 font-black'
                : 'text-[#e5c158]/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]'
            }`}
          >
            لا • NO
          </span>
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37]/80 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>

        {/* ARABIC LETTERS ARC (Top arc, engraved in gold leaf) */}
        {ARABIC_LETTERS.map((letter) => {
          const isCurrent = activeLetterKey === `ar-${letter.displayChar}`;
          return (
            <div
              key={`ar-${letter.char}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 font-amiri font-bold text-sm sm:text-base md:text-lg"
              style={{
                left: `${letter.x}%`,
                top: `${letter.y}%`,
              }}
            >
              <span
                className={`inline-block transition-transform duration-300 ${
                  isCurrent
                    ? 'text-red-300 scale-140 drop-shadow-[0_0_16px_rgba(239,68,68,1)]'
                    : 'text-[#e5c158]/85 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.95)]'
                }`}
              >
                {letter.displayChar}
              </span>
            </div>
          );
        })}

        {/* LATIN LETTERS ARC (Middle arc) */}
        {LATIN_LETTERS.map((letter) => {
          const isCurrent = activeLetterKey === `la-${letter.displayChar}`;
          return (
            <div
              key={`la-${letter.char}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 font-cinzel font-semibold text-[11px] sm:text-xs md:text-sm"
              style={{
                left: `${letter.x}%`,
                top: `${letter.y}%`,
              }}
            >
              <span
                className={`inline-block transition-transform duration-300 ${
                  isCurrent
                    ? 'text-red-300 scale-140 drop-shadow-[0_0_16px_rgba(239,68,68,1)]'
                    : 'text-[#d4af37]/80 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.95)]'
                }`}
              >
                {letter.displayChar}
              </span>
            </div>
          );
        })}

        {/* NUMBERS ROW */}
        {NUMBER_LETTERS.map((num) => {
          const isCurrent = activeLetterKey === `num-${num.displayChar}`;
          return (
            <div
              key={`num-${num.char}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 font-cinzel text-[11px] sm:text-xs md:text-sm"
              style={{
                left: `${num.x}%`,
                top: `${num.y}%`,
              }}
            >
              <span
                className={`inline-block transition-transform duration-300 ${
                  isCurrent
                    ? 'text-red-300 scale-135 drop-shadow-[0_0_14px_rgba(239,68,68,1)]'
                    : 'text-[#c59e37]/75 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]'
                }`}
              >
                {num.displayChar}
              </span>
            </div>
          );
        })}

        {/* BOTTOM: GOODBYE / وداعاً */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center"
          style={{
            left: `${SPECIAL_SPOTS.GOODBYE.x}%`,
            top: `${SPECIAL_SPOTS.GOODBYE.y}%`,
          }}
        >
          <span
            className={`font-cinzel text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 ${
              activeLetterKey === 'spot-GOODBYE'
                ? 'text-red-400 drop-shadow-[0_0_14px_rgba(239,68,68,1)] scale-110 font-bold'
                : 'text-[#deb887]/75 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]'
            }`}
          >
            GOODBYE • وداعاً
          </span>
        </div>

        {/* REALISTIC PLANCHETTE */}
        <Planchette
          x={planchettePos.x}
          y={planchettePos.y}
          isMoving={isMoving}
          activeChar={activeChar}
        />
      </div>
    </div>
  );
};
