import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import Sidebar from './Sidebar';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Fermer automatiquement le menu mobile lors du changement de page
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

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

      {/* Mobile Header avec menu burger */}
      <header className="lg:hidden sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-5 py-4 flex items-center justify-between">
        <div>
          <span className="text-[9px] tracking-[0.3em] uppercase text-amber-500 font-bold block">
            APA IBRAMUS
          </span>
          <h1 className="text-lg font-serif font-bold text-white tracking-wide">
            Direction & Admin
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2.5 border border-slate-800 bg-slate-900 text-slate-300 hover:border-amber-600 hover:text-amber-500 transition-colors cursor-pointer"
          aria-label="Ouvrir le menu"
        >
          <FaBars size={18} />
        </button>
      </header>

      <div className="flex relative z-10">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:flex lg:flex-shrink-0 border-r border-slate-800/80 bg-slate-900/50">
          <Sidebar />
        </aside>

        {/* Sidebar Mobile - Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              {/* Fond sombre cliquable */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/75 backdrop-blur-xs"
                onClick={() => setIsSidebarOpen(false)}
              />

              {/* Panneau latéral mobile */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col max-w-xs w-4/5 bg-slate-900 border-r border-slate-800 border-t-4 border-t-amber-600 shadow-2xl z-10"
              >
                <div className="absolute top-4 right-4 z-20">
                  <button
                    type="button"
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center justify-center h-9 w-9 bg-slate-950 border border-slate-800 text-slate-400 hover:border-amber-600 hover:text-amber-500 transition-colors cursor-pointer"
                    aria-label="Fermer le menu"
                  >
                    <FaTimes size={15} />
                  </button>
                </div>

                <Sidebar
                  isMobile={true}
                  onClose={() => setIsSidebarOpen(false)}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Contenu principal */}
        <main className="flex-1 min-h-screen p-5 md:p-8 lg:p-10 max-w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
