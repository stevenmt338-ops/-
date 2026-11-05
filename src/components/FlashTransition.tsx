import React from 'react';

interface FlashTransitionProps {
  onFlashPeak?: () => void;
}

export const FlashTransition: React.FC<FlashTransitionProps> = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
      {/* Blinding white/golden flash overlay */}
      <div
        className="absolute inset-0 bg-gradient-radial from-white via-[#fffbeb] to-[#fef08a] animate-flash"
        style={{
          animation: 'cinematicFlash 1.4s cubic-bezier(0.1, 0.9, 0.2, 1) forwards',
        }}
      />
      <style>{`
        @keyframes cinematicFlash {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          20% {
            opacity: 1;
            transform: scale(1);
          }
          70% {
            opacity: 0.95;
          }
          100% {
            opacity: 0;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};
