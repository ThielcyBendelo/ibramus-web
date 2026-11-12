import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Remplacez les chemins d'images par vos fichiers réels situés dans votre dossier assets (ex: /assets/proj1-1.jpg)
const projectsData = [
  {
    id: 1,
    title: "Villa Horizon",
    category: "Résidentiel",
    img: "/assets/proj1-1.jpg",
    images: ["/assets/proj1-1.jpg", "/assets/proj1-2.jpg", "/assets/proj1-3.jpg"],
    location: "Nice, France",
    year: "2025",
    surface: "420 m²",
    details: "Conception d'une villa contemporaine en porte-à-faux surplombant la Méditerranée. L'architecture privilégie la lumière naturelle grâce à de larges baies vitrées toute hauteur et l'utilisation de béton brut associé à du bois de cèdre local. Le projet intègre une gestion bioclimatique passive avec ventilation naturelle traversante et récupération des eaux pluviales pour l'irrigation des terrasses végétalisées."
  },
  {
    id: 2,
    title: "Tour Legacy",
    category: "Commercial",
    img: "/assets/proj2-1.jpg",
    images: ["/assets/proj2-1.jpg", "/assets/proj2-2.jpg", "/assets/proj2-3.jpg"],
    location: "Lyon, France",
    year: "2024",
    surface: "14 500 m²",
    details: "Immeuble de bureaux de grande hauteur doté d'une double peau vitrée intelligente régulant les apports solaires. Les plateaux libres favorisent la modularité des espaces de travail et intègrent des jardins suspendus tous les quatre niveaux. La structure mixte bois-béton réduit l'empreinte carbone globale de 35 % par rapport aux standards du quartier d'affaires."
  },
  {
    id: 3,
    title: "Hôpital Central",
    category: "Hospitalité",
    img: "/assets/proj3-1.jpg",
    images: ["/assets/proj3-1.jpg", "/assets/proj3-2.jpg", "/assets/proj3-3.jpg"],
    location: "Bordeaux, France",
    year: "2024",
    surface: "28 000 m²",
    details: "Restructuration et extension d'un pôle médical axé sur le bien-être des patients et la fluidité des parcours de soins. Des patios intérieurs arborés apportent un repère visuel apaisant au cœur des unités cliniques. Les matériaux biosourcés et le traitement acoustique poussé garantissent un environnement serein pour le personnel soignant et les visiteurs."
  },
  {
    id: 4,
    title: "Usine Logistique",
    category: "Industriel",
    img: "/assets/proj4-1.jpg",
    images: ["/assets/proj4-1.jpg", "/assets/proj4-2.jpg", "/assets/proj4-3.jpg"],
    location: "Lille, France",
    year: "2023",
    surface: "32 000 m²",
    details: "Plateforme logistique de nouvelle génération avec charpente bois grande portée et toiture entièrement équipée de panneaux photovoltaïques. L'enveloppe extérieure en bardage métallique micro-perforé joue avec la lumière naturelle pour atténuer l'impact visuel du volume dans le paysage périurbain."
  },
  {
    id: 5,
    title: "Bibliothèque Nationale",
    category: "Publique",
    img: "/assets/proj5-1.jpg",
    images: ["/assets/proj5-1.jpg", "/assets/proj5-2.jpg", "/assets/proj5-3.jpg"],
    location: "Strasbourg, France",
    year: "2025",
    surface: "9 800 m²",
    details: "Équipement culturel majeur pensé comme un forum urbain ouvert sur la cité. La grande salle de lecture sous verrière zénithale offre une lumière diffuse idéale pour l'étude. Le mobilier sur mesure et les alcôves acoustiques en chêne clair créent une atmosphère chaleureuse et institutionnelle."
  },
  {
    id: 6,
    title: "Analyse Urbaine",
    category: "Stage académique",
    img: "/assets/proj6-1.jpg",
    images: ["/assets/proj6-1.jpg", "/assets/proj6-2.jpg", "/assets/proj6-3.jpg"],
    location: "Rotterdam, Pays-Bas",
    year: "2022",
    surface: "12 Hectares",
    details: "Étude prospective sur la reconversion d'anciennes friches portuaires en quartier mixte résilient face à la montée des eaux. Le schéma directeur propose des infrastructures publiques flottantes, une trame verte continue et la réhabilitation du patrimoine industriel existant."
  },
];

const categories = ["Tous", "Résidentiel", "Commercial", "Industriel", "Hospitalité", "Publique", "Stage académique"];

// Sous-composant pour chaque carte de projet dans le modal (avec carrousel d'images et texte défilant)
function ModalProjectCard({ project }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const images = project.images && project.images.length > 0 ? project.images : [project.img];

  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white border border-slate-200 overflow-hidden shadow-sm flex flex-col lg:flex-row">
      {/* Carrousel d'images (minimum 3 images) */}
      <div className="relative w-full lg:w-3/5 aspect-[16/10] bg-slate-200 overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImgIndex}
            src={images[currentImgIndex]}
            alt={`${project.title} - vue ${currentImgIndex + 1}`}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.4 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </AnimatePresence>

        {/* Fallback si l'image n'est pas encore chargée dans assets */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center text-slate-400 text-sm italic">
          {project.title} — Image {currentImgIndex + 1} ({images[currentImgIndex]})
        </div>

        {/* Boutons Précédent / Suivant */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Image précédente"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-950/70 text-white flex items-center justify-center hover:bg-slate-950 transition-colors"
            >
              &#8592;
            </button>
            <button
              onClick={nextImage}
              aria-label="Image suivante"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-950/70 text-white flex items-center justify-center hover:bg-slate-950 transition-colors"
            >
              &#8594;
            </button>

            {/* Indicateurs de diapositives */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-slate-950/50 px-3 py-1.5 backdrop-blur-sm">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImgIndex(idx)}
                  aria-label={`Aller à l'image ${idx + 1}`}
                  className={`h-1.5 transition-all ${
                    currentImgIndex === idx ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Détails et description défilante du projet */}
      <div className="w-full lg:w-2/5 p-6 md:p-8 flex flex-col justify-between max-h-[420px]">
        <div className="overflow-y-auto pr-2 space-y-4">
          <div>
            <span className="text-[11px] tracking-[0.25em] uppercase text-slate-400 block mb-1">
              {project.category}
            </span>
            <h4 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
              {project.title}
            </h4>
          </div>

          <div className="w-10 h-px bg-slate-900"></div>

          {/* Fiche technique rapide */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Lieu</span>
              <span className="font-medium text-slate-800">{project.location}</span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Année</span>
              <span className="font-medium text-slate-800">{project.year}</span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Surface</span>
              <span className="font-medium text-slate-800">{project.surface}</span>
            </div>
          </div>

          {/* Description détaillée */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {project.details}
          </p>
        </div>

        {/* Miniatures rapides en bas */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
          {images.map((imgSrc, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImgIndex(idx)}
              className={`relative w-14 h-10 flex-shrink-0 overflow-hidden border-2 transition-all bg-slate-200 ${
                currentImgIndex === idx ? "border-slate-900 opacity-100" : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <img
                src={imgSrc}
                alt={`Miniature ${idx + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectGallery() {
  const [filter, setFilter] = useState("Tous");
  const [selectedCategoryModal, setSelectedCategoryModal] = useState(null);

  const filteredProjects = filter === "Tous" 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  // Liste des projets à afficher dans le modal pour la catégorie sélectionnée
  const modalProjects = selectedCategoryModal
    ? projectsData.filter(p => p.category === selectedCategoryModal)
    : [];

  return (
    <section className="py-24 bg-slate-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="text-left">
            <h2 className="text-sm tracking-[0.3em] uppercase text-slate-500 mb-2">Portfolio</h2>
            <h3 className="text-4xl font-serif font-bold text-slate-900">Réalisations Sélectionnées</h3>
          </div>

          {/* Filtres de navigation : 1 ligne déroulante sur mobile, inchangé sur desktop */}
          <div className="w-full md:w-auto flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible gap-4 justify-start md:justify-end pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`flex-shrink-0 whitespace-nowrap px-4 py-2 text-xs uppercase tracking-widest transition-all border-b-2 ${
                  filter === cat ? "border-slate-900 text-slate-900 font-bold" : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grille de projets avec Animation */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden bg-slate-200 aspect-[4/5] cursor-pointer"
              >
                {/* Image de fond */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 bg-gray-300">
                  <img 
                    src={project.img} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center text-slate-400 italic">
                    {project.title}
                  </div>
                </div>

                {/* Overlay au survol */}
                <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-8">
                  <span className="text-xs tracking-widest text-slate-400 uppercase mb-2">{project.category}</span>
                  <h4 className="text-white text-2xl font-serif mb-6 text-center">{project.title}</h4>
                  <div className="w-12 h-px bg-white mb-6"></div>
                  <button 
                    onClick={() => setSelectedCategoryModal(project.category)}
                    className="text-white text-xs uppercase tracking-[0.2em] border border-white/30 px-6 py-2 hover:bg-white hover:text-black transition-all"
                  >
                    Voir les projets
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal Moderne listant tous les projets de la catégorie */}
      <AnimatePresence>
        {selectedCategoryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedCategoryModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-50 w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* En-tête fixe du modal */}
              <div className="px-6 md:px-10 py-6 bg-white border-b border-slate-200 flex justify-between items-center">
                <div>
                  <span className="text-xs tracking-[0.3em] uppercase text-slate-400 block mb-1">
                    Catalogue par catégorie
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
                    Projets — {selectedCategoryModal}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCategoryModal(null)}
                  className="text-xs uppercase tracking-[0.2em] border border-slate-300 px-4 py-2.5 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                >
                  Fermer ✕
                </button>
              </div>

              {/* Liste déroulante de tous les projets de cette catégorie */}
              <div className="p-6 md:p-10 overflow-y-auto space-y-10">
                {modalProjects.map((proj) => (
                  <ModalProjectCard key={proj.id} project={proj} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
