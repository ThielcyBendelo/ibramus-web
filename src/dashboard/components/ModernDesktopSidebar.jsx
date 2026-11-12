import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaDraftingCompass,
  FaEnvelopeOpenText,
  FaCoins,
  FaCreditCard,
  FaFileInvoiceDollar,
  FaChartLine,
  FaComments,
  FaEnvelope,
  FaBell,
  FaAngleDoubleLeft,
  FaChevronDown,
  FaArrowLeft,
  FaSignOutAlt,
} from 'react-icons/fa';
import authService from '../services/authService';

export default function ModernDesktopSidebar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [stats, setStats] = useState({
    clients: 12,
    projects: 8,
    revenue: '€15,240',
    growth: '+12%',
  });

  const logout = () => {
    authService.logout();
    navigate('/login');
  };

  // Menu items avec icônes react-icons/fa et métadonnées d'agence
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: FaCompass,
      badge: 'Actif',
      description: "Vue d'ensemble",
    },
    {
      id: 'business',
      label: 'Agence & Études',
      icon: FaBriefcase,
      submenu: [
        {
          label: 'Clients',
          path: '/dashboard/clients',
          icon: FaUsers,
          count: stats.clients,
        },
        {
          label: 'Projets',
          path: '/dashboard/projects',
          icon: FaDraftingCompass,
          count: stats.projects,
        },
        {
          label: 'Abonnés',
          path: '/dashboard/subscribers',
          icon: FaEnvelopeOpenText,
          count: 45,
        },
      ],
    },
    {
      id: 'finances',
      label: 'Honoraires',
      icon: FaCoins,
      submenu: [
        {
          label: 'Paiements',
          path: '/dashboard/payments',
          icon: FaCreditCard,
          amount: stats.revenue,
        },
        {
          label: 'Factures',
          path: '/dashboard/invoices',
          icon: FaFileInvoiceDollar,
          count: 6,
        },
      ],
    },
    {
      id: 'analytics',
      label: 'Analytics',
      path: '/dashboard/analytics',
      icon: FaChartLine,
      badge: stats.growth,
      description: 'Indicateurs temps réel',
    },
    {
      id: 'communication',
      label: 'Communication',
      icon: FaComments,
      submenu: [
        {
          label: 'Messages',
          path: '/dashboard/messaging',
          icon: FaEnvelope,
          count: 3,
          urgent: true,
        },
        {
          label: 'Notifications',
          path: '/dashboard/notifications',
          icon: FaBell,
          count: 7,
        },
      ],
    },
  ];

  const handleSubmenuToggle = (itemId) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setTimeout(() => setActiveSubmenu(itemId), 150);
    } else {
      setActiveSubmenu(activeSubmenu === itemId ? null : itemId);
    }
  };

  // Actualisation simulée des indicateurs
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        revenue: `€${(Math.random() * 5000 + 15000).toFixed(0)}`,
        growth: `+${(Math.random() * 5 + 10).toFixed(1)}%`,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 84 : 300 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="hidden lg:flex flex-col h-screen sticky top-0 bg-slate-900 border-r border-slate-800/80 relative overflow-hidden select-none z-20"
    >
      {/* Grille architecturale subtile en arrière-plan */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* En-tête éditorial avec Logo */}
      <div className="relative p-6 bg-slate-950 border-b border-slate-800/80 border-t-4 border-t-amber-600">
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="flex items-center gap-3.5"
              >
                <div className="w-11 h-11 border border-amber-600/50 bg-slate-900 flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-serif font-bold text-amber-500 tracking-wider">
                    IM
                  </span>
                </div>
                <div>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-amber-500 font-bold block">
                    APA IBRAMUS
                  </span>
                  <h2 className="text-white font-serif font-bold text-lg tracking-wide leading-tight">
                    Direction
                  </h2>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-10 h-10 border border-amber-600/50 bg-slate-900 flex items-center justify-center mx-auto"
              >
                <span className="text-sm font-serif font-bold text-amber-500">
                  IM
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {!isCollapsed && (
            <button
              type="button"
              onClick={() => setIsCollapsed(true)}
              aria-label="Réduire le menu"
              className="p-2 text-slate-400 hover:text-amber-500 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all cursor-pointer"
            >
              <FaAngleDoubleLeft size={14} />
            </button>
          )}
        </div>

        {/* Bouton d'expansion quand le menu est réduit */}
        {isCollapsed && (
          <button
            type="button"
            onClick={() => setIsCollapsed(false)}
            aria-label="Déployer le menu"
            className="mt-4 w-full py-1.5 flex items-center justify-center text-slate-400 hover:text-amber-500 bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
          >
            <FaAngleDoubleLeft size={13} className="rotate-180" />
          </button>
        )}

        {/* Aperçu rapide des indicateurs */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-slate-800/80"
            >
              <div className="bg-slate-900/90 border border-slate-800 p-3">
                <div className="text-[9px] uppercase tracking-[0.2em] text-slate-400">
                  Honoraires
                </div>
                <div className="text-white font-serif font-bold text-base mt-0.5">
                  {stats.revenue}
                </div>
                <div className="text-emerald-400 text-[10px] font-mono mt-0.5">
                  {stats.growth}
                </div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3">
                <div className="text-[9px] uppercase tracking-[0.2em] text-slate-400">
                  Études
                </div>
                <div className="text-white font-serif font-bold text-base mt-0.5">
                  {stats.projects}
                </div>
                <div className="text-amber-500 text-[10px] uppercase tracking-wider mt-0.5">
                  En cours
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation principale */}
      <div className="flex-1 overflow-y-auto py-5 px-3 space-y-1.5 relative z-10">
        {/* Retour site vitrine */}
        <Link
          to="/"
          className={`flex items-center py-3 px-3.5 mb-5 bg-slate-950 border border-slate-800 hover:border-amber-600 text-slate-300 hover:text-amber-500 text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 ${
            isCollapsed ? 'justify-center' : 'justify-center gap-2.5'
          }`}
          title="Retour au site vitrine"
        >
          <FaArrowLeft size={11} />
          {!isCollapsed && <span>Site Vitrine</span>}
        </Link>

        {/* Liste des rubriques */}
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const hasSubmenu = Boolean(item.submenu);
          const isSubmenuOpen = activeSubmenu === item.id;

          if (!hasSubmenu) {
            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === '/dashboard'}
                title={isCollapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3.5 py-3 text-xs uppercase tracking-[0.16em] border-l-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-slate-950 text-amber-500 font-bold border-amber-500'
                      : 'text-slate-400 hover:text-white hover:bg-slate-950/60 border-transparent'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`
                }
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3.5'}`}>
                  <IconComponent
                    size={15}
                    className="text-amber-500/80 group-hover:text-amber-500 flex-shrink-0"
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </div>

                {!isCollapsed && item.badge && (
                  <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 bg-slate-950 border border-slate-800 text-amber-500">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          }

          return (
            <div key={item.id} className="space-y-1">
              <button
                type="button"
                onClick={() => handleSubmenuToggle(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full group flex items-center justify-between px-3.5 py-3 text-xs uppercase tracking-[0.16em] border-l-2 transition-all duration-300 cursor-pointer ${
                  isSubmenuOpen
                    ? 'bg-slate-950/80 text-white font-semibold border-amber-600/60'
                    : 'text-slate-400 hover:text-white hover:bg-slate-950/50 border-transparent'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3.5'}`}>
                  <IconComponent
                    size={15}
                    className="text-amber-500/80 group-hover:text-amber-500 flex-shrink-0"
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </div>

                {!isCollapsed && (
                  <FaChevronDown
                    size={10}
                    className={`text-slate-500 transition-transform duration-300 ${
                      isSubmenuOpen ? 'rotate-180 text-amber-500' : ''
                    }`}
                  />
                )}
              </button>

              {/* Sous-menu dépliant */}
              <AnimatePresence>
                {!isCollapsed && isSubmenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden pl-4 space-y-1 border-l border-slate-800 ml-5"
                  >
                    {item.submenu.map((sub) => {
                      const SubIcon = sub.icon;
                      return (
                        <NavLink
                          key={sub.path}
                          to={sub.path}
                          className={({ isActive }) =>
                            `flex items-center justify-between px-3 py-2.5 text-[11px] uppercase tracking-[0.15em] transition-colors ${
                              isActive
                                ? 'text-amber-500 font-bold bg-slate-950/70'
                                : 'text-slate-400 hover:text-white hover:bg-slate-950/40'
                            }`
                          }
                        >
                          <div className="flex items-center gap-2.5">
                            <SubIcon size={12} className="text-slate-500" />
                            <span>{sub.label}</span>
                          </div>

                          {sub.amount && (
                            <span className="text-[10px] font-mono text-emerald-400">
                              {sub.amount}
                            </span>
                          )}

                          {sub.count !== undefined && (
                            <span
                              className={`text-[10px] font-mono px-1.5 py-0.5 ${
                                sub.urgent
                                  ? 'bg-amber-600 text-white font-bold'
                                  : 'bg-slate-950 text-slate-400 border border-slate-800'
                              }`}
                            >
                              {sub.count}
                            </span>
                          )}
                        </NavLink>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Pied de la barre latérale : Déconnexion */}
      <div className="p-4 bg-slate-950 border-t border-slate-800/80 relative z-10">
        <button
          type="button"
          onClick={logout}
          title={isCollapsed ? 'Se déconnecter' : undefined}
          className={`w-full py-3 px-4 text-rose-400 hover:text-white hover:bg-rose-950/60 border border-transparent hover:border-rose-800/60 transition-all duration-300 flex items-center text-xs uppercase tracking-[0.2em] font-semibold cursor-pointer ${
            isCollapsed ? 'justify-center px-0' : 'gap-3'
          }`}
        >
          <FaSignOutAlt size={14} />
          {!isCollapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </motion.aside>
  );
}
