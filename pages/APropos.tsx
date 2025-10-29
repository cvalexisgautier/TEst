
import React from 'react';

const APropos: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">À Propos de l'Esquisse Ensemble</h1>
      <div className="bg-white p-6 rounded-lg border border-socle-border shadow-sm space-y-4 text-socle-text">
        <p>
          Cette application est une esquisse technique, un "squelette fonctionnel" qui démontre les principes fondamentaux du projet <strong>Ensemble</strong>.
        </p>
        <h2 className="text-xl font-semibold pt-4">Principes Architecturaux</h2>
        <ul className="list-disc list-inside space-y-2 text-socle-text-secondary">
          <li><strong>Socle Commun Immuable :</strong> Le cœur de l'application (navigation, structure) est stable et découplé.</li>
          <li><strong>Architecture par Remplacement :</strong> Les "Compagnons" sont des modules interchangeables, connectés au socle via des interfaces claires (les "connecteurs").</li>
          <li><strong>Frugalité & Confidentialité :</strong> L'esquisse n'utilise aucune donnée personnelle et simule les appels serveur pour garantir la sécurité et la légèreté.</li>
          <li><strong>Bouclier Sanitaire Non-Thérapeutique :</strong> Les interactions sont conçues comme des suggestions de bien-être, jamais comme des conseils médicaux.</li>
        </ul>
      </div>
    </div>
  );
};

export default APropos;
