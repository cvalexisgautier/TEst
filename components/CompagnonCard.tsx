
import React, { useState, useCallback } from 'react';
import type { Compagnon, Prompt } from '../types';
import { buildPrompt } from '../services/assembler';
import { postAction } from '../services/api';

interface CompagnonCardProps {
  compagnon: Compagnon;
  promptExemple: Prompt;
}

const CompagnonCard: React.FC<CompagnonCardProps> = ({ compagnon, promptExemple }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const promptJsonString = JSON.stringify(
    buildPrompt(
      promptExemple.role,
      promptExemple.contexte,
      promptExemple.tache,
      promptExemple.contraintes
    ),
    null,
    2
  );

  const handleAction = useCallback(async () => {
    setIsLoading(true);
    setResponse(null);
    setError(null);
    try {
      const promptObject = buildPrompt(
        promptExemple.role,
        promptExemple.contexte,
        promptExemple.tache,
        promptExemple.contraintes
      );
      const result = await postAction(compagnon.id, promptObject);
      if (result.success) {
        setResponse(result.message);
      } else {
        setError("L'action a échoué. (Réponse simulée)");
      }
    } catch (e) {
      setError("Une erreur est survenue lors de l'appel simulé.");
    } finally {
      setIsLoading(false);
    }
  }, [compagnon.id, promptExemple]);

  return (
    <div className="bg-white border border-socle-border rounded-lg shadow-sm flex flex-col transition-shadow hover:shadow-md">
      <div className="p-6 flex-grow">
        <div className="flex items-center gap-4 mb-4">
          <compagnon.icon className="w-10 h-10 text-socle-accent" />
          <div>
            <h2 className="text-xl font-bold text-socle-text">{compagnon.name}</h2>
            <p className="text-sm text-socle-text-secondary">{compagnon.description}</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-dashed border-socle-border">
          <h3 className="text-sm font-semibold text-socle-text mb-2">Connecteur du Module (Simulation)</h3>
          <p className="text-xs text-socle-text-secondary mb-3">
            Ceci représente le point d'entrée du module. Le prompt ci-dessous est assemblé par le client et serait envoyé à l'Aiguilleur IA.
          </p>
          <div className="bg-socle-placeholder p-3 rounded-md">
            <label htmlFor={`prompt-${compagnon.id}`} className="block text-xs font-medium text-socle-text-secondary mb-1">
              Prompt assemblé (prêt à l'envoi)
            </label>
            <textarea
              id={`prompt-${compagnon.id}`}
              readOnly
              className="w-full h-48 p-2 text-xs font-mono bg-white border border-socle-border rounded resize-none focus:outline-none"
              value={promptJsonString}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 border-t border-socle-border rounded-b-lg">
        <button
          onClick={handleAction}
          disabled={isLoading}
          className="w-full bg-socle-accent text-white font-bold py-2 px-4 rounded-md transition-all hover:bg-socle-accent-hover disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Simulation en cours...
            </>
          ) : (
            `Solliciter ${compagnon.name}`
          )}
        </button>

        {response && (
          <div className="mt-4 p-3 bg-green-100 border border-green-200 text-green-800 text-xs rounded-md">
            <strong>Réponse simulée du socle :</strong> {response}
          </div>
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-200 text-red-800 text-xs rounded-md">
            <strong>Erreur simulée :</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompagnonCard;
