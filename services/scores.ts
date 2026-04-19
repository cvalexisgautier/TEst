export type GameId = 'paul' | 'jeanne' | 'clara';

const KEY = 'ensemble_scores';

export function getBestScore(game: GameId): number {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw)[game] ?? 0) : 0;
  } catch {
    return 0;
  }
}

export function saveScore(game: GameId, score: number): boolean {
  try {
    const raw = localStorage.getItem(KEY);
    const scores = raw ? JSON.parse(raw) : {};
    const isRecord = score > (scores[game] ?? 0);
    if (isRecord) {
      scores[game] = score;
      localStorage.setItem(KEY, JSON.stringify(scores));
    }
    return isRecord;
  } catch {
    return false;
  }
}
