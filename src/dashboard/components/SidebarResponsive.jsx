import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaCompass,
  FaUsers,
  FaEnvelopeOpenText,
  FaDraftingCompass,
  FaChartLine,
  FaCreditCard,
  FaComments,
  FaUserTie,
  FaSignOutAlt,
} from 'react-icons/fa';
import authService from '../services/authService';
import NotificationBell from './NotificationBell';
import MessageNotificationBell from './MessageNotificationBell';

export default function Sidebar({ isMobile = false, onClose = () => {} }) {
  const navigate = useNavigate();

  const logout = () => {
    authService.logout();
    navigate('/login');
    if (isMobile) onClose();
  };

  const handleNavClick = () => {
    if (isMobile) onClose();
  };

  const navLinkClass = ({ isActive }) => `
    group px-4 py-3 text-xs uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-between border-l-2 ${
      isMobile ? 'mb-1' : ''
    } ${
      isActive
        ? 'bg-slate-950 text-amber-500 font-bold border-amber-500 shadow-inner'
        : 'text-slate-400 hover:text-white hover:bg-slate-950/60 border-transparent'
    }
  `;

  return (
    <aside
      className={`
        ${isMobile ? 'w-full h-full p-6 pt-12' : 'w-68 min-h-screen p-6'} 
        bg-slate-900 border-r border-slate-800/80 flex flex-col justify-between text-slate-100
      `}
    >
      <div>
        {/* En-tête de l'agence */}
        <div className="mb-8 pb-6 border-b border-slate-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 border border-amber-600/50 bg-slate-950 flex items-center justify-center flex-shrink-0">
                <span className="text-amber-500 font-serif font-bold text-sm tracking-wider">
                  IM
                </span>
              </div>
              <div>
                <span className="text-[9px] tracking-[0.3em] uppercase text-amber-500 font-bold block">
                  APA IBRAMUS
                </span>
                <span className="text-white font-serif font-bold text-base tracking-wide">
                  Direction
                </span>
              </div>
            </div>
            {!isMobile && <NotificationBell />}
          </div>
        </div>

        {/* Bouton retour vers le site vitrine */}
        <Link
          to="/"
          onClick={handleNavClick}
          className="mb-8 w-full px-4 py-3 bg-slate-950 border border-slate-800 hover:border-amber-600 text-slate-300 hover:text-amber-500 text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2.5"
          title="Retour au site principal"
        >
          <FaArrowLeft size={11} />
          <span>Site Vitrine</span>
        </Link>

        {/* Libellé de section */}
        <span className="text-[9px] tracking-[0.35em] uppercase text-slate-500 font-bold block mb-3 px-2">
          Gestion & Pilotage
        </span>

        {/* Navigation principale */}
        <nav className="flex flex-col gap-1">
          <NavLink
            to="/dashboard"
            end
            className={navLinkClass}
            onClick={handleNavClick}
          >
            <div className="flex items-center gap-3">
              <FaCompass size={14} className="text-amber-500/80 group-hover:text-amber-500" />
              <span>Dashboard</span>
            </div>
          </NavLink>

          <NavLink
            to="/dashboard/clients"
            className={navLinkClass}
            onClick={handleNavClick}
          >
            <div className="flex items-center gap-3">
              <FaUsers size={14} className="text-amber-500/80 group-hover:text-amber-500" />
              <span>Clients</span>
            </div>
          </NavLink>

          <NavLink
            to="/dashboard/subscribers"
            className={navLinkClass}
            onClick={handleNavClick}
          >
            <div className="flex items-center gap-3">
              <FaEnvelopeOpenText size={14} className="text-amber-500/80 group-hover:text-amber-500" />
              <span>Abonnés</span>
            </div>
          </NavLink>

          <NavLink
            to="/dashboard/projects"
            className={navLinkClass}
            onClick={handleNavClick}
          >
            <div className="flex items-center gap-3">
              <FaDraftingCompass size={14} className="text-amber-500/80 group-hover:text-amber-500" />
              <span>Projets</span>
            </div>
          </NavLink>

          <NavLink
            to="/dashboard/analytics"
            className={navLinkClass}
            onClick={handleNavClick}
          >
            <div className="flex items-center gap-3">
              <FaChartLine size={14} className="text-amber-500/80 group-hover:text-amber-500" />
              <span>Analytics</span>
            </div>
          </NavLink>

          <NavLink
            to="/dashboard/payments"
            className={navLinkClass}
            onClick={handleNavClick}
          >
            <div className="flex items-center gap-3">
              <FaCreditCard size={14} className="text-amber-500/80 group-hover:text-amber-500" />
              <span>Paiements</span>
            </div>
          </NavLink>

          <NavLink
            to="/dashboard/messaging"
            className={navLinkClass}
            onClick={handleNavClick}
          >
            <div className="flex items-center gap-3">
              <FaComments size={14} className="text-amber-500/80 group-hover:text-amber-500" />
              <span>Messages</span>
            </div>
            {!isMobile && <MessageNotificationBell />}
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={navLinkClass}
            onClick={handleNavClick}
          >
            <div className="flex items-center gap-3">
              <FaUserTie size={14} className="text-amber-500/80 group-hover:text-amber-500" />
              <span>Mon Profil</span>
            </div>
          </NavLink>
        </nav>
      </div>

      {/* Pied de la barre latérale */}
      <div className="pt-6 mt-6 border-t border-slate-800/80">
        {/* Notifications sur mobile */}
        {isMobile && (
          <div className="mb-4 pb-4 border-b border-slate-800/80 flex items-center justify-between px-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">
              Alertes & Messages
            </span>
            <div className="flex items-center gap-3">
              <NotificationBell />
              <MessageNotificationBell />
            </div>
          </div>
        )}

        {/* Bouton de déconnexion */}
        <button
          type="button"
          onClick={logout}
          className="w-full px-4 py-3 text-rose-400 hover:text-white hover:bg-rose-950/60 border border-transparent hover:border-rose-800/60 transition-all duration-300 flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-semibold cursor-pointer"
        >
          <FaSignOutAlt size={14} />
          <span>Se déconnecter</span>
        </button>
      </div>
    </aside>
  );
}
