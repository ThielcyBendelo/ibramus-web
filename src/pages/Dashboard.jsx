import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaCompass,
  FaUsers,
  FaEnvelopeOpenText,
  FaCog,
  FaUserTie,
} from 'react-icons/fa';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import ClientsManager from '../components/dashboard/ClientsManager';
import SubscribersManager from '../components/dashboard/SubscribersManager';
import DashboardStats from '../blog/BlogStats';
import Settings from '../components/dashboard/Settings';
import AdminProfile from '../dashboard/pages/AdminProfile';

const TAB_METADATA = {
  stats: {
    subtitle: 'Pilotage & Activité',
    title: "Vue d'ensemble de l'Agence",
    icon: FaCompass,
  },
  clients: {
    subtitle: 'Portefeuille & Études',
    title: "Gestion des Maîtres d'Ouvrage",
    icon: FaUsers,
  },
  subscribers: {
    subtitle: 'Diffusion & Veille',
    title: 'Abonnés & Contacts Presse',
    icon: FaEnvelopeOpenText,
  },
  settings: {
    subtitle: 'Configuration Système',
    title: 'Paramètres du Portail',
    icon: FaCog,
  },
  profile: {
    subtitle: 'Direction Principale',
    title: 'Profil Architecte Principal',
    icon: FaUserTie,
  },
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('stats');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('dashboardToken');
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case 'stats':
        return <DashboardStats />;
      case 'clients':
        return <ClientsManager />;
      case 'subscribers':
        return <SubscribersManager />;
      case 'settings':
        return <Settings />;
      case 'profile':
        return <AdminProfile />;
      default:
        return <DashboardStats />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white gap-4">
        <div className="animate-spin h-12 w-12 border-2 border-slate-800 border-t-amber-500"></div>
        <span className="text-[10px] uppercase tracking-[0.35em] text-amber-500 font-bold">
          Vérification des accès...
        </span>
      </div>
    );
  }

  const currentMeta = TAB_METADATA[activeTab] || TAB_METADATA.stats;
  const CurrentIcon = currentMeta.icon;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-600 selection:text-white">
      {/* Barre de navigation supérieure */}
      <DashboardNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex pt-16">
        {/* Barre latérale */}
        <DashboardSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Zone de contenu principal */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] ml-0 lg:ml-64 transition-all duration-300 bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-12">
            {/* En-tête architectural de la section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-10 border-b border-slate-800/80">
              <div>
                <div className="flex items-center gap-2.5 text-amber-500 mb-2">
                  <CurrentIcon size={13} />
                  <span className="text-[10px] tracking-[0.3em] uppercase font-bold">
                    {currentMeta.subtitle}
                  </span>
                </div>
                <h1 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight">
                  {currentMeta.title}
                </h1>
              </div>

              {/* Bouton de retour vers le site vitrine */}
              <button
                type="button"
                onClick={() => navigate('/')}
                className="self-start md:self-auto inline-flex items-center gap-3 px-5 py-3 bg-slate-900 border border-slate-800 text-slate-300 text-[11px] uppercase tracking-[0.2em] font-semibold hover:border-amber-600 hover:text-amber-500 transition-all duration-300 cursor-pointer"
              >
                <FaArrowLeft size={11} />
                <span>Site Vitrine</span>
              </button>
            </div>

            {/* Conteneur de l'onglet actif */}
            <div className="bg-slate-900/60 border border-slate-800/80 border-t-2 border-t-amber-600 p-6 md:p-8 shadow-2xl">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
