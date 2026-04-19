
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListIcon } from '../../components/icons/ListIcon';
import { saveScore, getBestScore } from '../../services/scores';

const FOOD_ITEMS = ['🥚', '🍅', '🍚', '🥕', '🧅', '🥦'];
const MIN_MOVES = FOOD_ITEMS.length;

interface Card {
  uid: number;
  pairId: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function createCards(): Card[] {
  const cards: Card[] = [];
  FOOD_ITEMS.forEach((emoji, pairId) => {
    cards.push({ uid: pairId * 2, pairId, emoji, isFlipped: false, isMatched: false });
    cards.push({ uid: pairId * 2 + 1, pairId, emoji, isFlipped: false, isMatched: false });
  });
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function calcScore(moves: number, seconds: number): number {
  const extraMoves = Math.max(0, moves - MIN_MOVES);
  return Math.max(0, 1000 - extraMoves * 50 - seconds * 2);
}

type GameState = 'idle' | 'playing' | 'finished';

const JeuClara: React.FC = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>(createCards);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [isChecking, setIsChecking] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(getBestScore('clara'));
  const [isNewRecord, setIsNewRecord] = useState(false);

  const selectedRef = useRef<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const secondsRef = useRef(0);
  const movesRef = useRef(0);

  const finishGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    const finalScore = calcScore(movesRef.current, secondsRef.current);
    setScore(finalScore);
    const isRecord = saveScore('clara', finalScore);
    setIsNewRecord(isRecord);
    setBestScore(getBestScore('clara'));
    setGameState('finished');
  }, []);

  useEffect(() => {
    if (gameState === 'playing') {
      const allMatched = cards.length > 0 && cards.every(c => c.isMatched);
      if (allMatched) {
        setTimeout(finishGame, 400);
      }
    }
  }, [cards, gameState, finishGame]);

  const handleCardClick = useCallback((uid: number) => {
    if (isChecking || gameState === 'finished') return;

    setCards(prev => {
      const card = prev.find(c => c.uid === uid);
      if (!card || card.isFlipped || card.isMatched) return prev;
      if (selectedRef.current.includes(uid)) return prev;
      return prev.map(c => c.uid === uid ? { ...c, isFlipped: true } : c);
    });

    const card = cards.find(c => c.uid === uid);
    if (!card || card.isFlipped || card.isMatched) return;
    if (selectedRef.current.includes(uid)) return;

    if (gameState === 'idle') {
      setGameState('playing');
      timerRef.current = setInterval(() => {
        secondsRef.current++;
        setSeconds(secondsRef.current);
      }, 1000);
    }

    const newSel = [...selectedRef.current, uid];
    selectedRef.current = newSel;

    if (newSel.length === 2) {
      const [uid1, uid2] = newSel;
      const c1 = cards.find(c => c.uid === uid1)!;
      const c2 = cards.find(c => c.uid === uid2) ?? card;
      movesRef.current++;
      setMoves(movesRef.current);

      if (c1.pairId === c2.pairId) {
        selectedRef.current = [];
        setCards(prev => prev.map(c =>
          c.uid === uid1 || c.uid === uid2
            ? { ...c, isMatched: true, isFlipped: true }
            : c
        ));
      } else {
        setIsChecking(true);
        setTimeout(() => {
          selectedRef.current = [];
          setCards(prev => prev.map(c =>
            (c.uid === uid1 || c.uid === uid2) && !c.isMatched
              ? { ...c, isFlipped: false }
              : c
          ));
          setIsChecking(false);
        }, 900);
      }
    }
  }, [cards, isChecking, gameState]);

  const restart = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    selectedRef.current = [];
    secondsRef.current = 0;
    movesRef.current = 0;
    setCards(createCards());
    setMoves(0);
    setSeconds(0);
    setScore(0);
    setIsChecking(false);
    setIsNewRecord(false);
    setGameState('idle');
  }, []);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const matchedCount = cards.filter(c => c.isMatched).length / 2;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col font-sans">
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={() => navigate('/jeu')}
          className="text-gray-500 hover:text-gray-800 font-medium text-sm"
        >
          ← Retour
        </button>
        <ListIcon className="w-6 h-6 text-emerald-500" />
        <h1 className="text-lg font-bold flex-1">Mémoire avec Clara</h1>
        {(gameState === 'playing' || gameState === 'finished') && (
          <div className="flex gap-3 text-sm">
            <span className="text-gray-500">🎯 {moves}</span>
            <span className="text-gray-500">⏱ {seconds}s</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center p-4 gap-4">
        {gameState === 'idle' && (
          <div className="text-center space-y-6 w-full max-w-sm mt-8">
            <div className="text-7xl">🧠</div>
            <div>
              <h2 className="text-2xl font-bold">Jeu de Mémoire</h2>
              <p className="text-gray-500 mt-2">
                Retourne les cartes et retrouve toutes les paires d'ingrédients !
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-sm text-emerald-700">
              {FOOD_ITEMS.length} paires · Moins de coups = plus de points
            </div>
            {bestScore > 0 && (
              <div className="bg-emerald-50 rounded-xl p-3 text-sm text-emerald-600 font-medium">
                🏆 Record : {bestScore} pts
              </div>
            )}
            <p className="text-gray-400 text-sm">Clique sur une carte pour commencer</p>
          </div>
        )}

        {gameState !== 'finished' && (
          <div className="w-full max-w-sm">
            {gameState === 'playing' && (
              <div className="flex justify-between text-sm mb-3 px-1">
                <span className="text-gray-500">
                  Paires : <strong className="text-emerald-600">{matchedCount}/{FOOD_ITEMS.length}</strong>
                </span>
                <span className="text-gray-400 text-xs mt-0.5">
                  Score estimé : {calcScore(moves, seconds)} pts
                </span>
              </div>
            )}
            <div className="grid grid-cols-4 gap-2">
              {cards.map(card => (
                <button
                  key={card.uid}
                  onClick={() => handleCardClick(card.uid)}
                  disabled={card.isMatched || (card.isFlipped && !selectedRef.current.includes(card.uid))}
                  className={`
                    aspect-square rounded-xl text-3xl flex items-center justify-center
                    font-bold transition-all duration-200 select-none
                    ${card.isMatched
                      ? 'bg-emerald-100 border-2 border-emerald-300 shadow-inner scale-95'
                      : card.isFlipped
                        ? 'bg-white border-2 border-emerald-400 shadow-md'
                        : 'bg-emerald-500 hover:bg-emerald-600 active:scale-95 shadow-md border-2 border-emerald-600'
                    }
                  `}
                  style={{ touchAction: 'manipulation' }}
                >
                  {card.isFlipped || card.isMatched ? card.emoji : '?'}
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'finished' && (
          <div className="text-center space-y-6 w-full max-w-sm mt-4">
            <div className="text-7xl">{isNewRecord ? '🏆' : '🎉'}</div>
            <h2 className="text-2xl font-bold">Bravo, tout trouvé !</h2>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 space-y-3">
              <div>
                <p className="text-gray-500 text-sm">Score final</p>
                <p className="text-6xl font-black text-emerald-500 tabular-nums">{score}</p>
                <p className="text-gray-400 text-xs">pts</p>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-around text-sm">
                <div className="text-center">
                  <p className="font-bold text-gray-700">{moves}</p>
                  <p className="text-gray-400">coups</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-700">{seconds}s</p>
                  <p className="text-gray-400">durée</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-700">{FOOD_ITEMS.length}</p>
                  <p className="text-gray-400">paires</p>
                </div>
              </div>
            </div>
            {isNewRecord && (
              <p className="text-green-600 font-bold text-lg">Nouveau record ! 🎉</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={restart}
                className="flex-1 bg-emerald-500 text-white font-bold py-3 rounded-xl shadow active:scale-95 transition-transform"
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

export default JeuClara;
