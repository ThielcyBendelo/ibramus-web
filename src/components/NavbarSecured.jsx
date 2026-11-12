import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTachometerAlt, FaBars, FaTimes, FaMoon, FaSun, FaHome, 
  FaProjectDiagram, FaCogs, FaInfoCircle, FaPhone, FaChevronDown, 
  FaTools, FaDraftingCompass, FaCalendarAlt, FaWhatsapp 
} from 'react-icons/fa';

export default function NavbarSecured({ theme, toggleTheme, isAuthenticated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // État du formulaire de rendez-vous architectural
  const [appointmentData, setAppointmentData] = useState({
    fullName: '',
    phone: '',
    projectType: 'Construction Résidentielle / Villa',
    surface: '',
    hasLand: 'Oui, terrain acquis',
    date: '',
    timeSlot: 'Matin (09h30 - 12h00)',
    format: 'Visioconférence',
    notes: ''
  });

  // Configuration du menu
  const menuCategories = [
    {
      label: "Navigation",
      items: [
        { label: "Home", href: "/home", icon: <FaHome /> },
        { label: "Portfolio", href: "/projects", icon: <FaProjectDiagram /> },
        { label: "Expertises", href: "/services", icon: <FaCogs /> },
        { label: "L'Agence", href: "/about", icon: <FaInfoCircle /> },
      ]
    },
    {
      label: "Services",
      items: [
        { label: "Consultation", href: "/contact", icon: <FaPhone /> },
        { label: "Techniques", href: "/experience", icon: <FaTools /> },
        { label: "Parcours", href: "/skills", icon: <FaDraftingCompass /> },
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCategory = (label) => {
    setActiveCategory(activeCategory === label ? null : label);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({ ...prev, [name]: value }));
  };

  // Formatage et envoi direct vers WhatsApp
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    
    // ⚠️ Remplacez ce numéro par votre numéro WhatsApp professionnel (format international sans +)
    const whatsappNumber = "243811349537"; 

    const message = `*DEMANDE DE CONSULTATION ARCHITECTURALE*%0A` +
      `_LEGACY Architects & Co_%0A%0A` +
      `*Client :* ${appointmentData.fullName}%0A` +
      `*Téléphone :* ${appointmentData.phone}%0A` +
      `*Projet :* ${appointmentData.projectType}%0A` +
      `*Surface estimée :* ${appointmentData.surface || 'Non précisée'} m²%0A` +
      `*Situation foncière :* ${appointmentData.hasLand}%0A` +
      `*Date souhaitée :* ${appointmentData.date}%0A` +
      `*Créneau :* ${appointmentData.timeSlot}%0A` +
      `*Format :* ${appointmentData.format}%0A` +
      `*Détails complémentaires :* ${appointmentData.notes || 'Aucun'}`;

   const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-slate-950/95 backdrop-blur-md py-3 shadow-2xl' : 'bg-transparent py-6 bg-slate-950/95'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white">
          
          {/* Logo */}
          <div className="cursor-pointer group" onClick={() => navigate('/')}>
            <span className="text-xl md:text-2xl font-serif font-bold tracking-[0.3em] uppercase italic">
              IB<span className="text-slate-500 font-light not-italic">M</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex gap-8 border-r border-slate-800 pr-8">
              {menuCategories.map((category) => (
                <div key={category.label} className="relative group py-2">
                  <button className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-300 group-hover:text-white transition-colors font-bold">
                    {category.label} <FaChevronDown size={8} className="group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-sm shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <div className="p-2">
                      {category.items.map((item) => (
                        <Link key={item.href} to={item.href} className="flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-widest text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')} className="text-[10px] uppercase tracking-widest bg-white text-black px-6 py-2 font-bold hover:bg-slate-200 transition-all">
              Espace Client
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden z-50 p-2 text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Fond sombre cliquable pour fermer le menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 md:hidden"
              />

              {/* Panneau latéral de largeur réduite */}
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'tween', duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 right-0 w-4/5 max-w-[320px] h-screen bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-40 flex flex-col justify-between md:hidden text-white overflow-y-auto"
              >
                <div className="flex flex-col px-6 pt-24 pb-8 gap-6">
                  <span className="text-[10px] tracking-[0.5em] uppercase text-slate-600 mb-2 font-bold">Filtres</span>
                  {menuCategories.map((category, idx) => (
                    <div key={category.label} className="w-full border-b border-white/5 pb-4">
                      <button onClick={() => toggleCategory(category.label)} className="flex items-center justify-between w-full py-2">
                        <div className="flex items-center gap-4">
                          <span className="text-[9px] font-mono text-slate-700">0{idx + 1}</span>
                          <p className={`text-2xl font-serif ${activeCategory === category.label ? 'text-white italic' : 'text-slate-500'}`}>{category.label}</p>
                        </div>
                        <motion.div animate={{ rotate: activeCategory === category.label ? 180 : 0 }}><FaChevronDown size={14} /></motion.div>
                      </button>
                      <AnimatePresence>
                        {activeCategory === category.label && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="flex flex-col gap-4 pl-10 pt-4 pb-2">
                              {category.items.map((item) => (
                                <Link key={item.href} to={item.href} onClick={() => setIsOpen(false)} className="text-lg text-slate-300 hover:text-white transition-colors">
                                  — {item.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {/* Bouton PRENDRE RENDEZ-VOUS */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsModalOpen(true);
                    }}
                    className="mt-2 w-full flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest border border-amber-400/80 text-amber-300 py-3.5 font-bold hover:bg-amber-400 hover:text-black transition-all"
                  >
                    <FaCalendarAlt size={13} />
                    Prendre Rendez-vous
                  </button>

                  {/* Bouton Espace Client sur mobile */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate(isAuthenticated ? '/dashboard' : '/login');
                    }}
                    className="w-full text-[11px] uppercase tracking-widest bg-white text-black py-3.5 font-bold hover:bg-slate-200 transition-all"
                  >
                    Espace Client
                  </button>
                </div>

                {/* Footer en bas du menu mobile */}
                {/* Footer en bas du menu mobile */}
                <div className="mt-auto px-6 py-6 border-t border-white/10 bg-black/40">
                  <p className="text-[11px] font-serif italic tracking-[0.2em] uppercase text-white">
                    LEGACY <span className="text-slate-400 font-sans not-italic text-[9px]">Architects & Co</span>
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1 tracking-wider">
                    Ibrahim Muswema Lemba • Architecte Principal
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-[9px] uppercase tracking-widest text-slate-500">
                    <span>© {new Date().getFullYear()} IBM</span>
                    <span className="text-amber-400/80">Sur rendez-vous</span>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* MODAL PROFESSIONNEL DE PRISE DE RENDEZ-VOUS + ENVOI WHATSAPP */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Contenu du Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto bg-slate-950 border border-slate-800 text-white p-6 md:p-8 shadow-2xl"
            >
              {/* En-tête du Modal */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold block">
                    Consultation Architecturale
                  </span>
                  <h3 className="text-2xl font-serif font-bold mt-1">
                    Planifier une Étude
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {/* Formulaire */}
              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                      Nom complet / Société *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Ex: Jean Mukendi"
                      value={appointmentData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-900 border border-slate-800 focus:border-amber-400 focus:outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                      Téléphone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+243 ..."
                      value={appointmentData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-900 border border-slate-800 focus:border-amber-400 focus:outline-none text-white"
                    />
                  </div>
                </div>

                {/* Nature du projet */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                    Typologie du projet *
                  </label>
                  <select
                    name="projectType"
                    value={appointmentData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-900 border border-slate-800 focus:border-amber-400 focus:outline-none text-white"
                  >
                    <option value="Construction Résidentielle / Villa">Construction Résidentielle / Villa</option>
                    <option value="Immeuble Commercial / Bureaux">Immeuble Commercial / Bureaux</option>
                    <option value="Rénovation & Réhabilitation">Rénovation & Réhabilitation</option>
                    <option value="Design d'Intérieur & Aménagement">Design d'Intérieur & Aménagement</option>
                    <option value="Suivi de Chantier & Maîtrise d'Œuvre">Suivi de Chantier & Maîtrise d'Œuvre</option>
                  </select>
                </div>

                {/* Surface et Terrain */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                      Surface estimée (m²)
                    </label>
                    <input
                      type="number"
                      name="surface"
                      placeholder="Ex: 350"
                      value={appointmentData.surface}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-900 border border-slate-800 focus:border-amber-400 focus:outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                      Situation foncière
                    </label>
                    <select
                      name="hasLand"
                      value={appointmentData.hasLand}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-900 border border-slate-800 focus:border-amber-400 focus:outline-none text-white"
                    >
                      <option value="Oui, terrain acquis">Oui, terrain acquis</option>
                      <option value="En cours d'acquisition">En cours d'acquisition</option>
                      <option value="Bâtiment existant">Bâtiment existant</option>
                      <option value="Simple étude préliminaire">Simple étude préliminaire</option>
                    </select>
                  </div>
                </div>

                {/* Date et Créneau */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                      Date souhaitée *
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={appointmentData.date}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-900 border border-slate-800 focus:border-amber-400 focus:outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                      Créneau horaire
                    </label>
                    <select
                      name="timeSlot"
                      value={appointmentData.timeSlot}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-900 border border-slate-800 focus:border-amber-400 focus:outline-none text-white"
                    >
                      <option value="Matin (09h30 - 12h00)">Matin (09h30 - 12h00)</option>
                      <option value="Midi (12h00 - 14h00)">Midi (12h00 - 14h00)</option>
                      <option value="Après-midi (14h00 - 17h00)">Après-midi (14h00 - 17h00)</option>
                      <option value="Fin de journée (17h00 - 19h00)">Fin de journée (17h00 - 19h00)</option>
                    </select>
                  </div>
                </div>

                {/* Format d'échange */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                    Format d'échange privilégié
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Visioconférence', 'Appel Téléphonique', 'À l’Agence / Site'].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setAppointmentData((prev) => ({ ...prev, format: mode }))}
                        className={`py-2 px-2 text-[10px] uppercase tracking-wider font-bold border transition-all ${
                          appointmentData.format === mode
                            ? 'bg-amber-400 text-black border-amber-400'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400/50'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Précisions */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
              Précisions (Localisation, budget, délais...)
            </label>
            <textarea
              name="notes"
              rows="2"
              placeholder="Décrivez brièvement votre besoin..."
              value={appointmentData.notes}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2 text-sm bg-slate-900 border border-slate-800 focus:border-amber-400 focus:outline-none text-white"
            />
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 bg-[#25D366] hover:bg-[#1ebe5d] text-black font-bold text-xs uppercase tracking-widest transition-all"
            >
              <FaWhatsapp size={16} />
              Confirmer sur WhatsApp
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="py-3.5 px-5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs uppercase tracking-widest border border-slate-800 transition-all"
            >
              Annuler
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )}
</AnimatePresence>
</>
);
}
