import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  FaCog,
  FaUserTie,
  FaShieldAlt,
  FaArrowLeft,
  FaChevronDown,
  FaSignOutAlt,
  FaTimes,
} from 'react-icons/fa';
import authService from '../services/authService';

export default function ModernMobileSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const logout = () => {
    authService.logout();
    navigate('/login');
    onClose();
  };

  // Menu items harmonisés avec l'agence d'architecture
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Tableau de Bord',
      path: '/dashboard',
      icon: FaCompass,
      description: "Vue d'ensemble de l'agence",
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
          desc: "Maîtres d'ouvrage",
        },
        {
          label: 'Projets',
          path: '/dashboard/projects',
          icon: FaDraftingCompass,
          desc: 'Suivi études & chantiers',
        },
        {
          label: 'Abonnés',
          path: '/dashboard/subscribers',
          icon: FaEnvelopeOpenText,
          desc: 'Contacts & Presse',
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
          desc: 'Règlements & acomptes',
        },
        {
          label: 'Factures',
          path: '/dashboard/invoices',
          icon: FaFileInvoiceDollar,
          desc: 'Notes d’honoraires',
        },
      ],
    },
    {
      id: 'analytics',
      label: 'Analytics',
      path: '/dashboard/analytics',
      icon: FaChartLine,
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
          desc: 'Demandes & échanges',
        },
        {
          label: 'Notifications',
          path: '/dashboard/notifications',
          icon: FaBell,
          desc: 'Alertes système',
        },
      ],
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: FaCog,
      submenu: [
        {
          label: 'Mon Profil',
          path: '/dashboard/profile',
          icon: FaUserTie,
          desc: 'Architecte principal',
        },
        {
          label: 'Sécurité',
          path: '/dashboard/security',
          icon: FaShieldAlt,
          desc: 'Accès & protection',
        },
      ],
    },
  ];

  const handleSubmenuToggle = (itemId) => {
    setActiveSubmenu(activeSubmenu === itemId ? null : itemId);
  };

  const handleNavClick = (path) => {
    if (path) {
      navigate(path);
    }
    onClose();
  };

  const sidebarVariants = {
    closed: {
      x: '-100%',
      transition: { type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
    open: {
      x: 0,
      transition: { type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const itemVariants = {
    closed: { x: -16, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.05, duration: 0.25 },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay sombre */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black/75 backdrop-blur-xs z-[100] lg:hidden"
            onClick={onClose}
          />

          {/* Panneau latéral mobile */}
          <motion.aside
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed left-0 top-0 h-full w-4/5 max-w-[320px] bg-slate-900 border-r border-slate-800 border-t-4 border-t-amber-600 z-[110] lg:hidden flex flex-col justify-between overflow-hidden shadow-2xl"
          >
            {/* En-tête de l'agence */}
            <div className="p-6 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 border border-amber-600/60 bg-slate-900 flex items-center justify-center flex-shrink-0">
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
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer le menu"
                className="p-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:border-amber-600 hover:text-amber-500 transition-colors cursor-pointer"
              >
                <FaTimes size={15} />
              </button>
            </div>

            {/* Zone de navigation défilante */}
            <div className="flex-1 overflow-y-auto py-5 px-4 space-y-4">
              {/* Retour site vitrine */}
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center justify-between p-3.5 bg-slate-950 border border-slate-800 hover:border-amber-600 text-slate-200 hover:text-amber-500 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <FaArrowLeft size={12} className="text-amber-500" />
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] font-bold">
                      Site Vitrine
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Retour à l'accueil public
                    </div>
                  </div>
                </div>
              </Link>

              {/* Liste des rubriques */}
              <div className="space-y-1.5">
                {menuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const hasSubmenu = Boolean(item.submenu);
                  const isSubmenuOpen = activeSubmenu === item.id;
                  const isDirectActive =
                    !hasSubmenu && location.pathname === item.path;

                  return (
                    <motion.div
                      key={item.id}
                      custom={index}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                    >
                      {/* Élément principal */}
                      <button
                        type="button"
                        onClick={() =>
                          hasSubmenu
                            ? handleSubmenuToggle(item.id)
                            : handleNavClick(item.path)
                        }
                        className={`w-full text-left p-3.5 border-l-2 transition-all duration-300 flex items-center justify-between cursor-pointer ${
                          isDirectActive
                            ? 'bg-slate-950 border-amber-500 text-amber-500'
                            : isSubmenuOpen
                            ? 'bg-slate-950/80 border-amber-600/60 text-white'
                            : 'bg-slate-950/40 border-transparent text-slate-300 hover:bg-slate-950 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <IconComponent
                            size={15}
                            className="text-amber-500 flex-shrink-0"
                          />
                          <div>
                            <div className="text-xs uppercase tracking-[0.18em] font-bold">
                              {item.label}
                            </div>
                            {item.description && (
                              <div className="text-[10px] text-slate-500 mt-0.5">
                                {item.description}
                              </div>
                            )}
                          </div>
                        </div>

                        {hasSubmenu && (
                          <FaChevronDown
                            size={10}
                            className={`text-slate-500 transition-transform duration-300 ${
                              isSubmenuOpen ? 'rotate-180 text-amber-500' : ''
                            }`}
                          />
                        )}
                      </button>

                      {/* Sous-menu accordéon */}
                      <AnimatePresence>
                        {hasSubmenu && isSubmenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden pl-4 ml-4 border-l border-slate-800 space-y-1 mt-1 mb-2"
                          >
                            {item.submenu.map((sub) => {
                              const SubIcon = sub.icon;
                              const isSubActive =
                                location.pathname === sub.path;

                              return (
                                <button
                                  key={sub.path}
                                  type="button"
                                  onClick={() => handleNavClick(sub.path)}
                                  className={`w-full text-left px-3 py-2.5 transition-colors flex items-center gap-3 cursor-pointer ${
                                    isSubActive
                                      ? 'bg-slate-950 text-amber-500 font-bold'
                                      : 'text-slate-400 hover:text-white hover:bg-slate-950/50'
                                  }`}
                                >
                                  <SubIcon
                                    size={12}
                                    className={
                                      isSubActive
                                        ? 'text-amber-500'
                                        : 'text-slate-500'
                                    }
                                  />
                                  <div>
                                    <div className="text-[11px] uppercase tracking-[0.15em]">
                                      {sub.label}
                                    </div>
                                    {sub.desc && (
                                      <div className="text-[10px] text-slate-500">
                                        {sub.desc}
                                      </div>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Pied du menu : Déconnexion */}
            <div className="p-4 bg-slate-950 border-t border-slate-800/80">
              <button
                type="button"
                onClick={logout}
                className="w-full py-3.5 px-4 text-rose-400 hover:text-white hover:bg-rose-950/60 border border-transparent hover:border-rose-800/60 transition-all duration-300 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] font-bold cursor-pointer"
              >
                <FaSignOutAlt size={14} />
                <span>Se déconnecter</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
