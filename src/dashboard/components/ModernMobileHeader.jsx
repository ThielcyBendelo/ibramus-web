import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBell, FaUserTie } from 'react-icons/fa';

export default function ModernMobileHeader({ onMenuToggle, isMenuOpen }) {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="lg:hidden sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/90 shadow-2xl"
    >
      <div className="flex items-center justify-between px-4 py-3.5">
        {/* Bouton Menu Burger animé */}
        <motion.button
          type="button"
          onClick={onMenuToggle}
          whileTap={{ scale: 0.95 }}
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="p-2.5 bg-slate-900 border border-slate-800 hover:border-amber-600 text-slate-200 hover:text-amber-500 transition-colors duration-200 cursor-pointer"
        >
          <motion.div
            animate={isMenuOpen ? 'open' : 'closed'}
            className="w-5 h-5 flex flex-col justify-center items-center"
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 5 },
              }}
              className="w-5 h-0.5 bg-current block transition-all duration-300"
            />
            <motion.span
              variants={{
                closed: { opacity: 1, x: 0 },
                open: { opacity: 0, x: -8 },
              }}
              className="w-5 h-0.5 bg-current block mt-1 transition-all duration-300"
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -5 },
              }}
              className="w-5 h-0.5 bg-current block mt-1 transition-all duration-300"
            />
          </motion.div>
        </motion.button>

        {/* Monogramme et titre d'agence */}
        <div
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-9 h-9 border border-amber-600/60 bg-slate-900 flex items-center justify-center">
            <span className="text-sm font-serif font-bold text-amber-500 tracking-wider">
              IM
            </span>
          </div>
          <div>
            <span className="text-[9px] tracking-[0.3em] uppercase text-amber-500 font-bold block leading-none mb-1">
              APA IBRAMUS
            </span>
            <h1 className="text-white font-serif font-bold text-base tracking-wide leading-none">
              Direction
            </h1>
          </div>
        </div>

        {/* Notifications et profil architecte */}
        <div className="flex items-center gap-2.5">
          {/* Cloche de notification */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard/notifications')}
            aria-label="Notifications"
            className="relative p-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-500 hover:border-amber-600 transition-colors duration-200 cursor-pointer"
          >
            <FaBell size={14} />

            {/* Pastille compteur */}
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-600 text-[10px] font-mono font-bold text-white flex items-center justify-center">
              3
            </span>
          </motion.button>

          {/* Accès rapide profil architecte */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard/profile')}
            aria-label="Profil Architecte Principal"
            className="w-9 h-9 bg-slate-900 border border-amber-600/50 text-amber-500 hover:bg-amber-600 hover:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
          >
            <FaUserTie size={14} />
          </motion.button>
        </div>
      </div>

      {/* Ligne décorative laiton */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="h-0.5 bg-gradient-to-r from-amber-600 via-amber-500 to-slate-800 origin-left"
      />
    </motion.header>
  );
}
