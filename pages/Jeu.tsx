
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartIcon } from '../components/icons/HeartIcon';
import { RunningIcon } from '../components/icons/RunningIcon';
import { ListIcon } from '../components/icons/ListIcon';
import { getBestScore } from '../services/scores';

const games = [
  {
    id: 'paul' as const,
    name: 'Sprint',
    companion: 'Paul',
    description: 'Tape le plus vite possible en 30 secondes !',
    icon: RunningIcon,
    gradient: 'from-blue-400 to-blue-600',
    path: '/jeu/paul',
    unit: 'taps',
    emoji: '🏃',
  },
  {
    id: 'jeanne' as const,
    name: 'Souffle',
    companion: 'Jeanne',
    description: 'Synchronise ta respiration avec le cercle.',
    icon: HeartIcon,
    gradient: 'from-pink-400 to-rose-500',
    path: '/jeu/jeanne',
    unit: 'pts',
    emoji: '🫁',
  },
  {
    id: 'clara' as const,
    name: 'Mémoire',
    companion: 'Clara',
    description: 'Retrouve toutes les paires d\'ingrédients !',
    icon: ListIcon,
    gradient: 'from-green-400 to-emerald-600',
    path: '/jeu/clara',
    unit: 'pts',
    emoji: '🧠',
  },
];

const Jeu: React.FC = () => {
  const navigate = useNavigate();
  const scores = { paul: getBestScore('paul'), jeanne: getBestScore('jeanne'), clara: getBestScore('clara') };
  const totalScore = scores.paul + scores.jeanne + scores.clara;

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Jeux Bien-Être</h1>
        <p className="text-socle-text-secondary mt-2">Choisis un défi avec tes compagnons</p>
        {totalScore > 0 && (
          <div className="mt-3 inline-flex items-center gap-2 bg-blue-50 text-socle-accent text-sm font-medium px-4 py-2 rounded-full">
            <span>🏆</span>
            <span>Score total : {totalScore}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {games.map(game => {
          const best = scores[game.id];
          return (
            <button
              key={game.id}
              onClick={() => navigate(game.path)}
              className="text-left bg-white rounded-2xl border border-socle-border shadow-sm hover:shadow-md active:scale-98 transition-all overflow-hidden"
              style={{ touchAction: 'manipulation' }}
            >
              <div className={`bg-gradient-to-r ${game.gradient} p-5 flex items-center gap-4`}>
                <span className="text-4xl">{game.emoji}</span>
                <div className="text-white">
                  <h2 className="text-xl font-bold">{game.name}</h2>
                  <p className="text-sm opacity-90">avec {game.companion}</p>
                </div>
                <div className="ml-auto text-white opacity-70 text-3xl">›</div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <p className="text-socle-text-secondary text-sm">{game.description}</p>
                {best > 0 ? (
                  <span className="ml-3 shrink-0 text-xs font-bold text-socle-accent bg-blue-50 px-3 py-1 rounded-full">
                    {best} {game.unit}
                  </span>
                ) : (
                  <span className="ml-3 shrink-0 text-xs text-socle-text-secondary bg-gray-100 px-3 py-1 rounded-full">
                    Nouveau
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Jeu;
