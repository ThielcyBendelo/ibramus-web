import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import ModernDesktopSidebar from './ModernDesktopSidebar';
import ModernMobileSidebar from './ModernMobileSidebar';
import ModernMobileHeader from './ModernMobileHeader';

export default function AdminLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  // Détection responsive
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Affichage conditionnel du bouton retour en haut
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Animation sobre et précise entre les vues
  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -12 },
  };

  const pageTransition = {
    type: 'tween',
    ease: [0.22, 1, 0.36, 1],
    duration: 0.35,
  };

  return (
    <div className="admin-layout min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-600 selection:text-white relative">
      {/* Grille architecturale discrète en arrière-plan */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Version Desktop */}
      {!isMobile ? (
        <div className="flex relative z-10">
          {/* Sidebar Desktop */}
          <ModernDesktopSidebar />

          {/* Contenu Principal Desktop */}
          <div className="flex-1 min-h-screen flex flex-col">
            <main className="flex-1 relative overflow-x-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="relative z-10"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      ) : (
        /* Version Mobile */
        <div className="flex flex-col min-h-screen relative z-10">
          {/* Header Mobile */}
          <ModernMobileHeader
            onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
            isMenuOpen={mobileMenuOpen}
          />

          {/* Sidebar Mobile */}
          <ModernMobileSidebar
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          />

          {/* Contenu Principal Mobile */}
          <div className="flex-1 pt-16 flex flex-col">
            <main className="flex-1 relative overflow-x-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="relative z-10"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      )}

      {/* Bouton Retour en Haut */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Remonter en haut de la page"
            className="fixed bottom-6 right-6 w-11 h-11 bg-slate-900 border border-amber-600/60 text-amber-500 hover:bg-amber-600 hover:text-white shadow-2xl transition-colors duration-300 flex items-center justify-center z-40 cursor-pointer"
          >
            <FaArrowUp size={13} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Signature discrète de l'agence */}
      <div className="fixed bottom-3 left-4 opacity-30 hover:opacity-75 transition-opacity pointer-events-none z-20 hidden sm:block">
        <div className="flex items-center gap-2.5 text-slate-400 text-[10px] tracking-[0.2em] uppercase">
          <div className="w-6 h-6 border border-amber-600/50 bg-slate-900 flex items-center justify-center">
            <span className="text-amber-500 text-[10px] font-serif font-bold">IM</span>
          </div>
          <span>APA IBRAMUS — Espace Direction © 2026</span>
        </div>
      </div>
    </div>
  );
}
