
import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Parametres from './pages/Parametres';
import APropos from './pages/APropos';
import { RobotIcon } from './components/icons/RobotIcon';

const App: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-socle-accent text-white'
        : 'text-socle-text-secondary hover:bg-socle-border hover:text-socle-text'
    }`;

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans text-socle-text">
        <header className="bg-white/80 backdrop-blur-sm border-b border-socle-border sticky top-0 z-10">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center gap-2">
                  <RobotIcon className="h-8 w-8 text-socle-accent" />
                  <span className="text-xl font-bold text-socle-text">Ensemble</span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink to="/" className={navLinkClass}>
                    Compagnons
                  </NavLink>
                  <NavLink to="/parametres" className={navLinkClass}>
                    Paramètres
                  </NavLink>
                  <NavLink to="/a-propos" className={navLinkClass}>
                    À Propos
                  </NavLink>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/parametres" element={<Parametres />} />
            <Route path="/a-propos" element={<APropos />} />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-socle-border mt-8">
          <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-socle-text-secondary text-sm">
            <p>&copy; {new Date().getFullYear()} Ensemble. Esquisse technique frugale.</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
