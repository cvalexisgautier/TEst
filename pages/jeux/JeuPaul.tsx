
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RunningIcon } from '../../components/icons/RunningIcon';
import { saveScore, getBestScore } from '../../services/scores';

const DURATION = 30;
type GameState = 'idle' | 'playing' | 'finished';

const JeuPaul: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<GameState>('idle');
  const [taps, setTaps] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [bestScore, setBestScore] = useState(getBestScore('paul'));
  const [isNewRecord, setIsNewRecord] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tapsRef = useRef(0);

  useEffect(() => {
    if (state === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            const finalTaps = tapsRef.current;
            const isRecord = saveScore('paul', finalTaps);
            setIsNewRecord(isRecord);
            setBestScore(getBestScore('paul'));
            setState('finished');
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state]);

  const start = useCallback(() => {
    tapsRef.current = 0;
    setTaps(0);
    setTimeLeft(DURATION);
    setIsNewRecord(false);
    setState('playing');
  }, []);

  const handleTap = useCallback(() => {
    if (state !== 'playing') return;
    tapsRef.current += 1;
    setTaps(tapsRef.current);
  }, [state]);

  const progress = ((DURATION - timeLeft) / DURATION) * 100;
  const tapsPerSec = timeLeft < DURATION ? (taps / (DURATION - timeLeft)).toFixed(1) : '0.0';

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col font-sans">
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={() => navigate('/jeu')}
          className="text-gray-500 hover:text-gray-800 font-medium text-sm"
        >
          ← Retour
        </button>
        <RunningIcon className="w-6 h-6 text-blue-500" />
        <h1 className="text-lg font-bold flex-1">Sprint avec Paul</h1>
        {state === 'playing' && (
          <span className="text-sm font-mono text-gray-500">{tapsPerSec} t/s</span>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
        {state === 'idle' && (
          <div className="text-center space-y-6 w-full max-w-sm">
            <div className="text-7xl">🏃</div>
            <div>
              <h2 className="text-2xl font-bold">Sprint !</h2>
              <p className="text-gray-500 mt-2">
                Tape le bouton le plus vite possible<br />pendant {DURATION} secondes !
              </p>
            </div>
            {bestScore > 0 && (
              <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-600 font-medium">
                🏆 Record : {bestScore} taps
              </div>
            )}
            <button
              onClick={start}
              className="w-full bg-blue-500 text-white font-bold py-4 rounded-2xl text-xl shadow-lg active:scale-95 transition-transform"
              style={{ touchAction: 'manipulation' }}
            >
              Démarrer !
            </button>
          </div>
        )}

        {state === 'playing' && (
          <div className="w-full max-w-sm flex flex-col items-center gap-6">
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-500">Temps restant</span>
                <span className={`font-bold tabular-nums ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-gray-800'}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${100 - progress}%` }}
                />
              </div>
            </div>

            <div className="text-center">
              <span className="text-8xl font-black text-gray-800 tabular-nums leading-none">{taps}</span>
              <p className="text-gray-500 text-sm mt-1">taps</p>
            </div>

            <button
              onPointerDown={handleTap}
              className="w-full h-52 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-3xl text-white text-5xl font-black shadow-2xl active:scale-95 transition-transform select-none"
              style={{ touchAction: 'manipulation', userSelect: 'none' }}
            >
              TAP !
            </button>
          </div>
        )}

        {state === 'finished' && (
          <div className="text-center space-y-6 w-full max-w-sm">
            <div className="text-7xl">{isNewRecord ? '🏆' : '🎯'}</div>
            <h2 className="text-2xl font-bold">Terminé !</h2>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 space-y-1">
              <p className="text-gray-500 text-sm">Ton score</p>
              <p className="text-6xl font-black text-blue-500 tabular-nums">{taps}</p>
              <p className="text-gray-500 text-sm">taps en {DURATION} secondes</p>
              <p className="text-gray-400 text-xs">≈ {(taps / DURATION).toFixed(1)} taps/seconde</p>
            </div>
            {isNewRecord && (
              <p className="text-green-600 font-bold text-lg">Nouveau record ! 🎉</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={start}
                className="flex-1 bg-blue-500 text-white font-bold py-3 rounded-xl shadow active:scale-95 transition-transform"
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

export default JeuPaul;
