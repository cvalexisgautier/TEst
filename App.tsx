
import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Parametres from './pages/Parametres';
import APropos from './pages/APropos';
import Jeu from './pages/Jeu';
import JeuPaul from './pages/jeux/JeuPaul';
import JeuJeanne from './pages/jeux/JeuJeanne';
import JeuClara from './pages/jeux/JeuClara';
import { RobotIcon } from './components/icons/RobotIcon';

const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const GameIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5S14.67 12 15.5 12s1.5.67 1.5 1.5S16.33 15 15.5 15zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 10 18.5 10s1.5.67 1.5 1.5S19.33 12 18.5 12z" />
  </svg>
);

const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

interface MainLayoutProps {
  onInstall?: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ onInstall }) => {
  const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-socle-accent text-white'
        : 'text-socle-text-secondary hover:bg-socle-border hover:text-socle-text'
    }`;

  const bottomNavClass = ({ isActive }: { isActive: boolean }): string =>
    `flex flex-col items-center justify-center gap-0.5 py-2 flex-1 text-xs font-medium transition-colors ${
      isActive ? 'text-socle-accent' : 'text-socle-text-secondary'
    }`;

  return (
    <div className="min-h-screen flex flex-col font-sans text-socle-text">
      <header className="bg-white/80 backdrop-blur-sm border-b border-socle-border sticky top-0 z-10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <RobotIcon className="h-8 w-8 text-socle-accent" />
              <span className="text-xl font-bold text-socle-text">Ensemble</span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              <NavLink to="/" end className={navLinkClass}>Compagnons</NavLink>
              <NavLink to="/jeu" className={navLinkClass}>Jeux</NavLink>
              <NavLink to="/parametres" className={navLinkClass}>Paramètres</NavLink>
              <NavLink to="/a-propos" className={navLinkClass}>À Propos</NavLink>
            </div>
            {onInstall && (
              <button
                onClick={onInstall}
                className="hidden md:flex items-center gap-1.5 text-sm bg-socle-accent text-white px-3 py-1.5 rounded-md hover:bg-socle-accent-hover transition-colors"
              >
                ↓ Installer
              </button>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/jeu" element={<Jeu />} />
          <Route path="/parametres" element={<Parametres />} />
          <Route path="/a-propos" element={<APropos />} />
        </Routes>
      </main>

      <footer className="hidden md:block bg-white border-t border-socle-border">
        <div className="container mx-auto py-4 px-4 text-center text-socle-text-secondary text-sm">
          <p>&copy; {new Date().getFullYear()} Ensemble. Esquisse technique frugale.</p>
        </div>
      </footer>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-socle-border md:hidden z-10">
        {onInstall && (
          <button
            onClick={onInstall}
            className="absolute -top-10 right-4 bg-socle-accent text-white text-xs px-4 py-2 rounded-full shadow-lg"
          >
            + Installer l'app
          </button>
        )}
        <div className="flex" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <NavLink to="/" end className={bottomNavClass}>
            <HomeIcon className="w-5 h-5" />
            <span>Accueil</span>
          </NavLink>
          <NavLink to="/jeu" className={bottomNavClass}>
            <GameIcon className="w-5 h-5" />
            <span>Jeux</span>
          </NavLink>
          <NavLink to="/parametres" className={bottomNavClass}>
            <SettingsIcon className="w-5 h-5" />
            <span>Réglages</span>
          </NavLink>
          <NavLink to="/a-propos" className={bottomNavClass}>
            <InfoIcon className="w-5 h-5" />
            <span>À propos</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

const App: React.FC = () => {
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstallPrompt(null);
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/jeu/paul" element={<JeuPaul />} />
        <Route path="/jeu/jeanne" element={<JeuJeanne />} />
        <Route path="/jeu/clara" element={<JeuClara />} />
        <Route path="*" element={<MainLayout onInstall={installPrompt ? handleInstall : undefined} />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
