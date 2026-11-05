import React, { useState } from 'react';
import { Volume2, VolumeX, Eye } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface AudioControlsProps {
  isHeavenly: boolean;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  isHeavenly,
  reducedMotion,
  onToggleReducedMotion,
}) => {
  const [isMuted, setIsMuted] = useState(soundEngine.getIsMuted());
  const [volume, setVolume] = useState(soundEngine.getVolume());
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const handleToggleMute = () => {
    const nextMuted = soundEngine.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
    if (isMuted && val > 0) {
      soundEngine.toggleMute();
      setIsMuted(false);
    }
  };

  return (
    <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-40 flex items-center gap-2">
      {/* Audio Mute & Volume Control Box */}
      <div
        className={`relative flex items-center gap-2 px-2.5 py-1.5 rounded-full backdrop-blur-md transition-all shadow-md ${
          isHeavenly
            ? 'bg-white/80 border border-amber-300/80 text-amber-950'
            : 'bg-black/60 border border-red-950/70 text-gray-200'
        }`}
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <button
          type="button"
          onClick={handleToggleMute}
          title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
          className="cursor-pointer hover:scale-110 active:scale-95 transition-transform"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4 text-rose-500" />
          ) : (
            <Volume2 className={`w-4 h-4 ${isHeavenly ? 'text-amber-700' : 'text-amber-400'}`} />
          )}
        </button>

        {/* Dynamic sound wave indicator */}
        {!isMuted && volume > 0 && (
          <div className="flex items-center gap-0.5 h-3">
            <span
              className={`w-0.5 h-2 rounded-full animate-pulse ${
                isHeavenly ? 'bg-amber-600' : 'bg-red-500'
              }`}
            />
            <span
              className={`w-0.5 h-3 rounded-full animate-pulse delay-75 ${
                isHeavenly ? 'bg-amber-500' : 'bg-amber-400'
              }`}
            />
            <span
              className={`w-0.5 h-1.5 rounded-full animate-pulse delay-150 ${
                isHeavenly ? 'bg-amber-600' : 'bg-red-500'
              }`}
            />
          </div>
        )}

        {/* Expandable volume slider */}
        {showVolumeSlider && (
          <div className="flex items-center pl-1 animate-fade-in">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1.5 accent-amber-500 bg-gray-700/50 rounded-lg cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Reduced Motion Toggle Button */}
      <button
        type="button"
        onClick={onToggleReducedMotion}
        title={reducedMotion ? 'تفعيل الحركات الكاملة' : 'تقليل الحركة (Reduced Motion)'}
        className={`p-1.5 rounded-full backdrop-blur-md border transition-all cursor-pointer shadow-sm ${
          reducedMotion
            ? 'bg-amber-500 text-white border-amber-600'
            : isHeavenly
            ? 'bg-white/80 border-amber-300 text-amber-900'
            : 'bg-black/60 border-red-950/70 text-gray-300'
        }`}
      >
        <Eye className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
