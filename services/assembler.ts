
import type { Prompt } from '../types';

/**
 * Assemble un prompt en un objet structuré.
 * Cette fonction prépare les données à envoyer à l'Aiguilleur IA côté serveur.
 * 
 * @param role Le rôle de l'IA.
 * @param contexte Le contexte de la demande.
 * @param tache La tâche à accomplir.
 * @param contraintes Les contraintes à respecter.
 * @returns Un objet Prompt structuré.
 */
export function buildPrompt(
  role: string,
  contexte: string,
  tache: string,
  contraintes: string[]
): Prompt {
  return {
    role,
    contexte,
    tache,
    contraintes,
  };
}
