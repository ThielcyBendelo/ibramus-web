import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUsers,
  FaEnvelopeOpenText,
  FaChartLine,
  FaDraftingCompass,
  FaFileExport,
  FaCompass,
} from 'react-icons/fa';
import AnimatedStatsCard from '../components/AnimatedStatsCard';
import ClientsChart from '../components/ClientsChart';
import RecentActivity from '../components/RecentActivity';
import AdvancedDashboardOverview from '../components/AdvancedDashboardOverview';
import NotificationToast from '../components/NotificationToast';
import PaymentNotificationWidget from '../components/PaymentNotificationWidget';
import PayPalStatusTracker from '../components/PayPalStatusTracker';
import dataService from '../../services/dataService';
import notificationService from '../services/notificationService';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const updateStats = () => setStats(dataService.getStats());
    updateStats();

    // Initialiser le service de notifications
    notificationService.init();

    // Exposer dataService globalement pour les notifications
    window.dataService = dataService;

    // Actualiser les stats toutes les 30 secondes
    const interval = setInterval(updateStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-2 px-4 py-6 bg-slate-950 text-slate-100 selection:bg-amber-600 selection:text-white relative">
      {/* Grille architecturale discrète en arrière-plan */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="min-h-screen flex relative z-10">
        {/* Barre latérale */}
  

        {/* Contenu principal */}
        <main className="flex-1 p-6 md:p-10 max-w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {/* En-tête éditorial */}
            <header className="mb-10 pt-8 md:pt-12 pb-8 border-b border-slate-800/80 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 text-amber-500 mb-2">
                  <FaCompass size={13} />
                  <span className="text-[10px] tracking-[0.35em] uppercase font-bold">
                    APA IBRAMUS — Direction Principale
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
                  Tableau de Bord
                </h1>
                <p className="text-xs md:text-sm text-slate-400 mt-1.5">
                  Vue d'ensemble des études, maîtres d'ouvrage et indicateurs en temps réel
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-400 bg-slate-900 border border-slate-800 px-4 py-2.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>Données synchronisées</span>
              </div>
            </header>

            {/* Vue d'ensemble avancée */}
            <div className="mb-10">
              <AdvancedDashboardOverview />
            </div>

            {/* Cartes de statistiques clés */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <AnimatedStatsCard
                title="Maîtres d'Ouvrage"
                value={stats?.totalClients || 0}
                change={15}
                changeType="positive"
                color="amber"
                icon={<FaUsers className="w-5 h-5 text-amber-500" />}
              />
              <AnimatedStatsCard
                title="Abonnés & Presse"
                value={stats?.totalSubscribers || 0}
                change={8}
                changeType="positive"
                color="blue"
                icon={<FaEnvelopeOpenText className="w-5 h-5 text-amber-500" />}
              />
              <AnimatedStatsCard
                title="Nouvelles Études"
                value={stats?.newClientsThisMonth || 0}
                change={25}
                changeType="positive"
                color="green"
                icon={<FaChartLine className="w-5 h-5 text-emerald-400" />}
              />
              <AnimatedStatsCard
                title="Projets en Cours"
                value={stats?.clientsByStatus?.enCours || 0}
                change={-2}
                changeType="negative"
                color="orange"
                icon={<FaDraftingCompass className="w-5 h-5 text-amber-500" />}
              />
            </section>

            {/* Graphique d'évolution & Activité récente */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800 border-t-2 border-t-amber-600 p-6 shadow-xl">
                <ClientsChart />
              </div>
              <div className="bg-slate-900/70 border border-slate-800 border-t-2 border-t-slate-700 p-6 shadow-xl">
                <RecentActivity />
              </div>
            </section>

            {/* Suivi des honoraires & paiements */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              <PaymentNotificationWidget />
              <PayPalStatusTracker />
            </section>

            {/* Section Export rapide */}
            <section className="mb-8">
              <div className="bg-slate-900/90 border border-slate-800 border-l-4 border-l-amber-600 p-6 md:p-8 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-amber-500 mb-1.5">
                      <FaFileExport size={13} />
                      <span className="text-[10px] uppercase tracking-[0.25em] font-bold">
                        Extraction & Archives
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white mb-1">
                      Export Rapide des Registres
                    </h3>
                    <p className="text-xs text-slate-400">
                      Accédez directement aux répertoires pour exporter vos dossiers clients et abonnés
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/admin/clients"
                      className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center gap-2.5 shadow-lg"
                    >
                      <FaUsers size={14} />
                      <span>Clients ({stats?.totalClients || 0})</span>
                    </Link>

                    <Link
                      to="/admin/subscribers"
                      className="px-6 py-3.5 bg-slate-950 border border-slate-700 hover:border-amber-600 text-slate-200 hover:text-amber-500 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center gap-2.5"
                    >
                      <FaEnvelopeOpenText size={14} />
                      <span>Abonnés ({stats?.totalSubscribers || 0})</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Notifications temps réel */}
      <NotificationToast />
    </div>
  );
}
