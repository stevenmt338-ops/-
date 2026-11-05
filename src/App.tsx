import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppState, AnswerData } from './types';
import { DarkWorld } from './components/DarkWorld';
import { OuijaBoard } from './components/OuijaBoard';
import { QuestionInput } from './components/QuestionInput';
import { FlashTransition } from './components/FlashTransition';
import { HeavenlyWorld } from './components/HeavenlyWorld';
import { AudioControls } from './components/AudioControls';
import { soundEngine } from './audio/soundEngine';
import { findBoardCoordinate, SPECIAL_SPOTS } from './utils/boardCoordinates';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [appState, setAppState] = useState<AppState>('DARK_IDLE');
  const [questionText, setQuestionText] = useState('');
  const [answerData, setAnswerData] = useState<AnswerData | null>(null);
  const [planchettePos, setPlanchettePos] = useState({ x: 50, y: 50 });
  const [activeLetterKey, setActiveLetterKey] = useState<string | null>(null);
  const [activeChar, setActiveChar] = useState<string>('');
  const [isMoving, setIsMoving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Timers cleanup ref
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  // Teardown cleanup
  useEffect(() => {
    return () => {
      clearAllTimers();
      soundEngine.stopAll(0.2);
    };
  }, [clearAllTimers]);

  // Ouija board letter spelling animation
  const runBoardSpelling = useCallback(
    (phrase: string, onComplete: () => void) => {
      clearAllTimers();
      setAppState('BOARD_MOVING');
      setIsMoving(true);

      const letters = Array.from(phrase.trim());
      if (letters.length === 0) {
        letters.push('س', 'ل', 'ا', 'م');
      }

      let step = 0;
      const stepDuration = reducedMotion ? 500 : 850;

      const moveToNextLetter = () => {
        if (step >= letters.length) {
          // Finished spelling phrase - return smoothly to center
          setActiveLetterKey(null);
          setActiveChar('');
          setPlanchettePos({ x: SPECIAL_SPOTS.CENTER.x, y: SPECIAL_SPOTS.CENTER.y });
          setIsMoving(false);

          // Settle in center before silence
          addTimer(() => {
            onComplete();
          }, 650);
          return;
        }

        const currentChar = letters[step];
        if (currentChar === ' ') {
          setActiveLetterKey(null);
          setActiveChar('');
          step++;
          addTimer(moveToNextLetter, 350);
          return;
        }

        const targetCoord = findBoardCoordinate(currentChar);
        setPlanchettePos({ x: targetCoord.x, y: targetCoord.y });
        setActiveLetterKey(targetCoord.key);
        setActiveChar(currentChar);

        soundEngine.playPlanchetteGlide();
        soundEngine.playLetterHover();

        step++;
        addTimer(moveToNextLetter, stepDuration);
      };

      // Immediate start with short initial buffer
      addTimer(moveToNextLetter, 300);
    },
    [addTimer, clearAllTimers, reducedMotion]
  );

  // Cinematic Transition: Silence -> Flash -> Angels -> Jesus -> Answer
  const launchCinematicTransition = useCallback(() => {
    clearAllTimers();

    // 1. SILENCE_BEAT (~1 second of profound silence)
    setAppState('SILENCE_BEAT');
    soundEngine.stopDarkAmbience(0.1);

    addTimer(() => {
      // 2. FLASH_TRANSITION (blinding light burst)
      setAppState('FLASH_TRANSITION');

      // 3. Exact moment flash peaks: trigger Angels & Heavenly Opera
      addTimer(() => {
        setAppState('ANGELS_APPEARING');
        soundEngine.startHeavenlyOpera();

        // 4. JESUS_REVEAL: Golden rays expand, Choir & Strings crescendo to peak
        addTimer(() => {
          setAppState('JESUS_REVEAL');
          soundEngine.crescendoForJesus();

          // 5. ANSWER_VISIBLE: Opera softens to peaceful ambient choir, answer card appears
          addTimer(() => {
            setAppState('ANSWER_VISIBLE');
            soundEngine.settleToPeacefulAmbience();
          }, 3500);
        }, 2200);
      }, 500);
    }, 1000);
  }, [addTimer, clearAllTimers]);

  // Instant Question Submission Handler
  const handleSubmitQuestion = async (submittedQuestion: string) => {
    const trimmed = submittedQuestion.trim();
    if (!trimmed || appState === 'AI_LOADING' || isMoving) return;

    setErrorMessage(null);
    setAppState('AI_LOADING');
    soundEngine.startDarkAmbience();

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'تعذر الحصول على إجابة في الوقت الحالي.');
      }

      const data: AnswerData = await response.json();
      const enrichedData = { ...data, question: trimmed };
      setAnswerData(enrichedData);

      // Begin Ouija Board spelling immediately
      runBoardSpelling(data.spelledPhrase || 'سلام', () => {
        launchCinematicTransition();
      });
    } catch (err: any) {
      console.error(err);
      soundEngine.stopDarkAmbience(0.4);
      setErrorMessage(err.message || 'حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.');
      setAppState('ERROR');
    }
  };

  // Action Button 1: New Question
  const handleNewQuestion = () => {
    clearAllTimers();
    soundEngine.stopHeavenAmbience(0.8);

    setTimeout(() => {
      setAppState('DARK_IDLE');
      setQuestionText('');
      setAnswerData(null);
      setPlanchettePos({ x: 50, y: 50 });
      setActiveLetterKey(null);
      setActiveChar('');
      setIsMoving(false);
      setErrorMessage(null);
      soundEngine.startDarkAmbience();
    }, 600);
  };

  // Action Button 2: Replay Experience (same question/answer without new API call)
  const handleReplay = () => {
    if (!answerData) return;
    clearAllTimers();
    soundEngine.stopAll(0.2);

    setAppState('DARK_IDLE');
    setPlanchettePos({ x: 50, y: 50 });
    setActiveLetterKey(null);
    setActiveChar('');
    setIsMoving(false);

    setTimeout(() => {
      soundEngine.startDarkAmbience();
      runBoardSpelling(answerData.spelledPhrase || 'سلام', () => {
        launchCinematicTransition();
      });
    }, 300);
  };

  // Action Button 3: Return to Beginning (Full Reset)
  const handleReset = () => {
    clearAllTimers();
    soundEngine.stopAll(0.3);
    setAppState('DARK_IDLE');
    setQuestionText('');
    setAnswerData(null);
    setPlanchettePos({ x: 50, y: 50 });
    setActiveLetterKey(null);
    setActiveChar('');
    setIsMoving(false);
    setErrorMessage(null);
  };

  const isHeavenlyStage =
    appState === 'ANGELS_APPEARING' ||
    appState === 'JESUS_REVEAL' ||
    appState === 'ANSWER_VISIBLE';

  return (
    <div className="relative min-h-screen w-full font-tajawal selection:bg-amber-300 selection:text-amber-950" dir="rtl">
      {/* Audio Controls & Accessibility Settings */}
      <AudioControls
        isHeavenly={isHeavenlyStage}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion((prev) => !prev)}
      />

      {/* Cinematic White Flash Screen Transition */}
      {appState === 'FLASH_TRANSITION' && <FlashTransition />}

      {/* WORLD 1: PURE TERRIFYING OUIJA REALM */}
      {!isHeavenlyStage && appState !== 'FLASH_TRANSITION' && (
        <DarkWorld>
          {/* THE BOARD */}
          <OuijaBoard
            planchettePos={planchettePos}
            activeLetterKey={activeLetterKey}
            isMoving={isMoving}
            activeChar={activeChar}
          />

          {/* In-flight Board Moving Status */}
          {appState === 'BOARD_MOVING' && (
            <div className="mt-3 text-center animate-fade-in">
              <span className="text-xs sm:text-sm text-amber-300 font-amiri font-bold tracking-wide drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]">
                القطعة تتحرك لتكوين الكلمة...
              </span>
            </div>
          )}

          {/* Silence Status */}
          {appState === 'SILENCE_BEAT' && (
            <div className="mt-3 text-center animate-fade-in">
              <span className="text-xs sm:text-sm text-neutral-400 font-mono tracking-widest animate-pulse">
                سكون تام...
              </span>
            </div>
          )}

          {/* Error Message & Safe Retry (Preserves Question!) */}
          {appState === 'ERROR' && (
            <div className="w-full max-w-xl mx-auto px-4 mt-3 animate-fade-in">
              <div className="rounded-xl bg-red-950/80 border border-red-800/90 p-3 text-center shadow-lg">
                <div className="flex items-center justify-center gap-2 text-red-300 mb-1">
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-bold text-xs sm:text-sm">تنبيه في الاتصال</span>
                </div>
                <p className="text-xs text-red-200 mb-2">{errorMessage}</p>
                <button
                  type="button"
                  onClick={() => handleSubmitQuestion(questionText)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-red-700 hover:bg-red-600 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>إعادة المحاولة بالسؤال نفسه</span>
                </button>
              </div>
            </div>
          )}

          {/* THE QUESTION INPUT: Kept mounted during IDLE, LOADING, & ERROR with instant feedback */}
          {(appState === 'DARK_IDLE' || appState === 'AI_LOADING' || appState === 'ERROR') && (
            <QuestionInput
              value={questionText}
              onChange={setQuestionText}
              onSubmit={handleSubmitQuestion}
              isLoading={appState === 'AI_LOADING'}
              disabled={appState === 'AI_LOADING'}
            />
          )}
        </DarkWorld>
      )}

      {/* WORLD 2: BREATHTAKING HEAVENLY REALM (ONLY SCENE & GENERATED ANSWER) */}
      {isHeavenlyStage && answerData && (
        <HeavenlyWorld
          stage={appState as 'ANGELS_APPEARING' | 'JESUS_REVEAL' | 'ANSWER_VISIBLE'}
          answerData={answerData}
          onNewQuestion={handleNewQuestion}
          onReplay={handleReplay}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
