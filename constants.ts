
import type { Compagnon, PromptCollection } from './types';
import { HeartIcon } from './components/icons/HeartIcon';
import { RunningIcon } from './components/icons/RunningIcon';
import { ListIcon } from './components/icons/ListIcon';

// Définition des compagnons disponibles dans le socle
export const COMPAGNONS: Compagnon[] = [
  {
    id: 'jeanne',
    name: 'Jeanne',
    description: 'Gardienne de la bienveillance et de la motivation.',
    icon: HeartIcon,
  },
  {
    id: 'paul',
    name: 'Paul',
    description: 'Guide pour des séances de mouvement (Running/HIIT).',
    icon: RunningIcon,
  },
  {
    id: 'clara',
    name: 'Clara',
    description: 'Organisatrice de repas pour un quotidien simplifié.',
    icon: ListIcon,
  },
];

// Exemples de prompts structurés pour chaque compagnon
export const PROMPTS_EXEMPLE: PromptCollection = {
  jeanne: {
    role: "Gardienne Jeanne, modération bienveillante + animation motivationnelle.",
    contexte: "Demande publique neutre ; aucun signal de détresse.",
    tache: "Rédiger un message d’encouragement et une micro-astuce de cohérence cardiaque (sans promesse de santé).",
    contraintes: [
      "Pas de diagnostic/soin",
      "Ton non-prescriptif",
      "90 mots max",
      "Vocabulaire bien-être",
      "Proposer 'ligne d’écoute' uniquement si détresse détectée."
    ],
  },
  paul: {
    role: "Coach Paul, guide running/HIIT.",
    contexte: "Profil générique (aucune donnée sensible).",
    tache: "Suggérer une séance 20 min ‘remise en mouvement’ (sans matériel), + 1 option plus douce.",
    contraintes: [
      "Suggestion, pas d’injonction",
      "Aucune mention médicale",
      "120 mots max",
      "Structure: échauffement / bloc / récupération."
    ],
  },
  clara: {
    role: "Clara, organisatrice des repas.",
    contexte: "Inventaire fictif: œufs, tomates, riz ; 2 repas/j, 3 jours.",
    tache: "Proposer un mini-semainier anti-gaspillage.",
    contraintes: [
      "Utiliser uniquement les ingrédients fournis",
      "Recettes simples et rapides",
      "Format: Liste par jour (Matin/Soir)",
      "Anti-gaspillage"
    ],
  },
};
