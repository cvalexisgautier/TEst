
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartIcon } from '../../components/icons/HeartIcon';
import { saveScore, getBestScore } from '../../services/scores';

const PHASE_DURATION = 4000;
const CYCLES = 5;
const TOTAL_PHASES = CYCLES * 2;
const POINTS_PER_PHASE = 10;

type GameState = 'idle' | 'playing' | 'finished';
type Phase = 'inhale' | 'exhale';

const JeuJeanne: React.FC = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>('idle');
  const [phase, setPhase] = useState<Phase>('inhale');
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [bestScore, setBestScore] = useState(getBestScore('jeanne'));
  const [isNewRecord, setIsNewRecord] = useState(false);

  const isPressedRef = useRef(false);
  const phaseIndexRef = useRef(0);
  const scoreRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (feedback !== null) {
      const t = setTimeout(() => setFeedback(null), 900);
      return () => clearTimeout(t);
    }
  }, [feedback]);

  const advancePhase = useCallback(() => {
    const idx = phaseIndexRef.current;
    const currentPhase: Phase = idx % 2 === 0 ? 'inhale' : 'exhale';

    const correct = currentPhase === 'inhale' ? isPressedRef.current : !isPressedRef.current;
    if (correct) {
      scoreRef.current += POINTS_PER_PHASE;
      setScore(scoreRef.current);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    const next = idx + 1;
    phaseIndexRef.current = next;

    if (next >= TOTAL_PHASES) {
      setTimeout(() => {
        const finalScore = scoreRef.current;
        const isRecord = saveScore('jeanne', finalScore);
        setIsNewRecord(isRecord);
        setBestScore(getBestScore('jeanne'));
        setGameState('finished');
      }, 600);
      return;
    }

    const nextPhase: Phase = next % 2 === 0 ? 'inhale' : 'exhale';
    setPhase(nextPhase);
    setPhaseIndex(next);

    timerRef.current = setTimeout(advancePhase, PHASE_DURATION);
  }, []);

  const start = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    phaseIndexRef.current = 0;
    scoreRef.current = 0;
    isPressedRef.current = false;
    setScore(0);
    setPhase('inhale');
    setPhaseIndex(0);
    setIsPressed(false);
    setFeedback(null);
    setIsNewRecord(false);
    setGameState('playing');
    timerRef.current = setTimeout(advancePhase, PHASE_DURATION);
  }, [advancePhase]);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const handlePressStart = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    if (gameState !== 'playing') return;
    isPressedRef.current = true;
    setIsPressed(true);
  }, [gameState]);

  const handlePressEnd = useCallback(() => {
    isPressedRef.current = false;
    setIsPressed(false);
  }, []);

  const cycleNumber = Math.floor(phaseIndex / 2) + 1;
  const circleScale = gameState === 'playing' && phase === 'inhale' ? 1 : 0.38;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col font-sans">
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={() => navigate('/jeu')}
          className="text-gray-500 hover:text-gray-800 font-medium text-sm"
        >
          ← Retour
        </button>
        <HeartIcon className="w-6 h-6 text-rose-500" />
        <h1 className="text-lg font-bold flex-1">Souffle avec Jeanne</h1>
        {gameState === 'playing' && (
          <span className="text-sm font-bold text-rose-500">{score}/{TOTAL_PHASES * POINTS_PER_PHASE}</span>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
        {gameState === 'idle' && (
          <div className="text-center space-y-6 w-full max-w-sm">
            <div className="text-7xl">🫁</div>
            <div>
              <h2 className="text-2xl font-bold">Synchronise ton souffle</h2>
              <p className="text-gray-500 mt-3 leading-relaxed">
                Appuie et maintiens quand le cercle <strong>grandit</strong> (inspire),<br />
                relâche quand il <strong>rétrécit</strong> (expire).
              </p>
            </div>
            <div className="bg-pink-50 rounded-xl p-3 text-sm text-rose-600">
              {CYCLES} cycles · {CYCLES * 8} secondes · max {TOTAL_PHASES * POINTS_PER_PHASE} pts
            </div>
            {bestScore > 0 && (
              <div className="bg-rose-50 rounded-xl p-3 text-sm text-rose-600 font-medium">
                🏆 Record : {bestScore}/{TOTAL_PHASES * POINTS_PER_PHASE} pts
              </div>
            )}
            <button
              onClick={start}
              className="w-full bg-rose-500 text-white font-bold py-4 rounded-2xl text-xl shadow-lg active:scale-95 transition-transform"
              style={{ touchAction: 'manipulation' }}
            >
              Commencer
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="w-full max-w-sm flex flex-col items-center gap-8">
            <div className="flex justify-between w-full text-sm px-1">
              <span className="text-gray-500">Cycle {cycleNumber} / {CYCLES}</span>
              <span className={`font-bold ${phase === 'inhale' ? 'text-blue-500' : 'text-rose-500'}`}>
                {phase === 'inhale' ? 'INSPIRE ↑' : 'EXPIRE ↓'}
              </span>
            </div>

            <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>
              <div
                className="absolute rounded-full border-2 border-dashed border-rose-200"
                style={{ width: 260, height: 260 }}
              />
              <div
                onPointerDown={handlePressStart}
                onPointerUp={handlePressEnd}
                onPointerLeave={handlePressEnd}
                style={{
                  width: 260,
                  height: 260,
                  transform: `scale(${circleScale})`,
                  transition: `transform ${PHASE_DURATION}ms ease-in-out`,
                  touchAction: 'none',
                  userSelect: 'none',
                }}
                className={`rounded-full flex flex-col items-center justify-center cursor-pointer shadow-2xl select-none ${
                  isPressed ? 'bg-rose-500' : 'bg-rose-300'
                }`}
              >
                <span className="text-white text-2xl font-black tracking-widest pointer-events-none">
                  {phase === 'inhale' ? 'INSPIRE' : 'EXPIRE'}
                </span>
                {feedback && (
                  <span className={`text-4xl mt-1 pointer-events-none ${feedback === 'correct' ? 'text-green-200' : 'text-red-200'}`}>
                    {feedback === 'correct' ? '✓' : '✗'}
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-500 text-sm text-center">
              {phase === 'inhale'
                ? '👆 Appuie et maintiens le cercle'
                : '✋ Relâche le cercle'}
            </p>
          </div>
        )}

        {gameState === 'finished' && (
          <div className="text-center space-y-6 w-full max-w-sm">
            <div className="text-7xl">{isNewRecord ? '🌟' : '🌸'}</div>
            <h2 className="text-2xl font-bold">Bravo !</h2>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 space-y-1">
              <p className="text-gray-500 text-sm">Ton score</p>
              <p className="text-6xl font-black text-rose-500 tabular-nums">
                {score}<span className="text-3xl text-gray-400">/{TOTAL_PHASES * POINTS_PER_PHASE}</span>
              </p>
              <p className="text-gray-500 text-sm mt-2">
                {score >= 90 ? '🧘 Maîtrise parfaite !'
                  : score >= 70 ? '😌 Très bien !'
                  : score >= 50 ? '🙂 Bien joué !'
                  : '💪 Continue à pratiquer !'}
              </p>
            </div>
            {isNewRecord && (
              <p className="text-green-600 font-bold text-lg">Nouveau record ! 🎉</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={start}
                className="flex-1 bg-rose-500 text-white font-bold py-3 rounded-xl shadow active:scale-95 transition-transform"
                style={{ touchAction: 'manipulation' }}
              >
                Rejouer
              </button>
              <button
                onClick={() => navigate('/jeu')}
                className="flex-1 bg-white border border-gray-200 text-gray-800 font-bold py-3 rounded-xl active:scale-95 transition-transform"
                style={{ touchAction: 'manipulation' }}
              >
                Menu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JeuJeanne;
