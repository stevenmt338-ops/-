import React from 'react';
import { RotateCcw, PlusCircle, Home, Sparkles } from 'lucide-react';
import { AnswerData } from '../types';

interface AnswerCardProps {
  data: AnswerData;
  onNewQuestion: () => void;
  onReplay: () => void;
  onReset: () => void;
}

export const AnswerCard: React.FC<AnswerCardProps> = ({
  data,
  onNewQuestion,
  onReplay,
  onReset,
}) => {
  return (
    <div className="relative w-full max-w-xl mx-auto px-2 sm:px-4 z-30 pb-4 animate-fade-in-up">
      {/* Ultra-Luxury Frosted Glassmorphic Pearl-White & Gold Card */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-2xl border border-amber-300/70 shadow-[0_25px_60px_rgba(212,175,55,0.2),0_4px_20px_rgba(0,0,0,0.06)] p-4 sm:p-6 text-neutral-800 transition-all">
        
        {/* Specular Champagne-Gold Hairline Inset */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />

        {/* Original Question Header */}
        <div className="mb-3 pb-3 border-b border-amber-200/50">
          <div className="flex items-center gap-1.5 text-xs text-amber-900/80 font-bold mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>سؤالك:</span>
          </div>
          <p className="font-tajawal text-sm sm:text-base text-neutral-800 italic font-medium px-3 py-1.5 bg-amber-50/70 rounded-xl border border-amber-200/40" dir="auto">
            "{data.question}"
          </p>
        </div>

        {/* Reflective Answer Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shadow-sm border border-amber-300/60">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-amiri text-lg sm:text-xl font-bold text-amber-950">
            إجابة تأملية
          </h3>
        </div>

        {/* Reflective Answer Body */}
        <div className="max-h-52 overflow-y-auto pr-1 pl-1 mb-3.5">
          <p
            className="font-tajawal text-base sm:text-lg leading-relaxed text-neutral-900 font-normal selection:bg-amber-200"
            dir="auto"
          >
            {data.fullAnswer}
          </p>
        </div>

        {/* Subtle Disclaimer Banner */}
        <p className="text-[11px] text-amber-900/70 mb-4 px-1 text-center font-tajawal">
          هذه إجابة مولدة بالذكاء الاصطناعي للتأمل، وليست رسالة دينية أو كشفاً للغيب.
        </p>

        {/* Action Buttons: 3 functional workflows */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-amber-200/60">
          {/* Button 1: New Question */}
          <button
            type="button"
            onClick={onNewQuestion}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
          >
            <PlusCircle className="w-4 h-4" />
            <span>اسأل سؤال جديد</span>
          </button>

          {/* Button 2: Replay Experience */}
          <button
            type="button"
            onClick={onReplay}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white hover:bg-amber-50 text-amber-950 border border-amber-300 font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all cursor-pointer active:scale-98"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة التجربة</span>
          </button>

          {/* Button 3: Return to Beginning */}
          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-100/70 hover:bg-amber-200/80 text-amber-950 font-bold text-xs sm:text-sm border border-amber-300/60 shadow-sm transition-all cursor-pointer active:scale-98"
          >
            <Home className="w-4 h-4" />
            <span>العودة إلى البداية</span>
          </button>
        </div>
      </div>
    </div>
  );
};
