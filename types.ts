
import type React from 'react';

export interface Prompt {
  role: string;
  contexte: string;
  tache: string;
  contraintes: string[];
}

export interface PromptCollection {
  [key: string]: Prompt;
}

export interface Compagnon {
  id: 'jeanne' | 'paul' | 'clara';
  name: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
