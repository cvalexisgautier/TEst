
import React from 'react';
import { COMPAGNONS, PROMPTS_EXEMPLE } from '../constants';
import CompagnonCard from '../components/CompagnonCard';

const Accueil: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-socle-text sm:text-5xl">
          Vos Compagnons
        </h1>
        <p className="mt-4 text-lg text-socle-text-secondary">
          Une esquisse du socle PWA avec ses connecteurs de modules.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {COMPAGNONS.map((compagnon) => (
          <CompagnonCard
            key={compagnon.id}
            compagnon={compagnon}
            promptExemple={PROMPTS_EXEMPLE[compagnon.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default Accueil;
