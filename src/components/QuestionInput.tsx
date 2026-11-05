import React, { useRef } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface QuestionInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (question: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading,
  disabled,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Unified submission trigger executed identically by Enter key, Form submit, and Button click
  const triggerSubmit = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const trimmed = value.trim();
    // Guard against empty submission or duplicate in-flight requests
    if (!trimmed || isLoading || disabled) {
      return;
    }

    // Dismiss virtual keyboard on touch devices
    if (textareaRef.current) {
      textareaRef.current.blur();
    }

    onSubmit(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Both standard Enter and numpad Enter submit when Shift is not held
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      triggerSubmit(e);
    }
  };

  const isSubmitDisabled = !value.trim() || isLoading || disabled;

  return (
    <div className="w-full max-w-xl mx-auto px-3 sm:px-4 mt-3 sm:mt-5 z-30">
      <form onSubmit={triggerSubmit} className="relative w-full">
        <div
          className={`relative rounded-2xl bg-black/85 backdrop-blur-xl border transition-all duration-300 p-2 sm:p-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(185,28,28,0.15)] ${
            isLoading
              ? 'border-red-600/90 shadow-[0_0_30px_rgba(220,38,38,0.4)]'
              : 'border-neutral-900 focus-within:border-red-700/80 focus-within:shadow-[0_0_25px_rgba(220,38,38,0.3)]'
          }`}
        >
          {/* Subtle top crimson hairline highlight */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-red-600/40 to-transparent pointer-events-none" />

          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              dir="auto"
              value={value}
              onChange={(e) => onChange(e.target.value.slice(0, 500))}
              onKeyDown={handleKeyDown}
              placeholder="اكتب سؤالك هنا..."
              rows={1}
              disabled={isLoading || disabled}
              className="flex-1 bg-transparent text-neutral-100 placeholder:text-neutral-600 text-sm sm:text-base resize-none focus:outline-none p-1.5 min-h-[44px] max-h-32 leading-relaxed selection:bg-red-900 selection:text-white"
            />

            {/* Submit Button */}
            <button
              type="submit"
              onClick={triggerSubmit}
              disabled={isSubmitDisabled}
              aria-label="إرسال السؤال"
              className={`relative shrink-0 inline-flex items-center justify-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 select-none ${
                !isSubmitDisabled
                  ? 'bg-gradient-to-r from-red-800 via-red-600 to-rose-700 text-white shadow-[0_0_22px_rgba(239,68,68,0.7)] hover:shadow-[0_0_30px_rgba(239,68,68,0.9)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                  : isLoading
                  ? 'bg-red-950/70 text-red-200 border border-red-800/80 cursor-wait shadow-[0_0_15px_rgba(220,38,38,0.35)]'
                  : 'bg-neutral-900 text-neutral-600 border border-neutral-800 cursor-not-allowed opacity-60'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-red-400" />
                  <span className="font-tajawal text-xs sm:text-sm">جاري الإجابة...</span>
                </>
              ) : (
                <>
                  <span className="font-tajawal font-bold text-sm sm:text-base">تم</span>
                  <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                </>
              )}
            </button>
          </div>

          {/* Under-bar info: Character counter and status */}
          <div className="flex items-center justify-between px-1.5 pt-1.5 text-[11px] text-neutral-500 font-mono">
            <span>{value.length} / 500</span>
            {isLoading && (
              <span className="text-red-400 text-[11px] font-tajawal animate-pulse">
                الأرواح تصغي وتستحضر المعنى...
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
