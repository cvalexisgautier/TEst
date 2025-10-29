
import type { Prompt } from '../types';

/**
 * Simule un appel à l'API de l'Aiguilleur IA.
 * Dans une application réelle, cette fonction ferait un appel `fetch` à une Cloud Function
 * ou un service Cloud Run qui orchestre l'appel à l'API Gemini.
 * 
 * @param action L'identifiant du compagnon/module à appeler.
 * @param payload Le prompt structuré.
 * @returns Une promesse qui résout avec une réponse simulée.
 */
export async function postAction(
  action: string,
  payload: Prompt
): Promise<{ success: boolean; message: string }> {
  console.log('--- Appel API simulé ---');
  console.log(`Action/Module Cible: ${action}`);
  console.log('Payload envoyé:', JSON.stringify(payload, null, 2));

  // Simule une latence réseau
  await new Promise(resolve => setTimeout(resolve, 750));

  console.log('--- Réponse simulée reçue ---');
  
  return {
    success: true,
    message: `L'action pour '${action}' a été traitée avec succès. (Ceci est une réponse simulée)`,
  };
}
