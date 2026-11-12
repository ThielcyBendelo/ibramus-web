import { about } from '../assets/assets.js';
import { profile1Image as ibramus } from '../assets/assets.js';
import { motion } from 'framer-motion';
import LazyImage from './LazyImage';
import associeImage from '../assets/ibramus.jpeg';
import TeamMember1 from '../assets/ibramus.jpeg';
import TeamMember2 from '../assets/ibramus.jpeg';
import TeamMember3 from '../assets/ibramus.jpeg';
import TeamMember4 from '../assets/ibramus.jpeg';



// import GoogleMapsSection from './GoogleMapsSection';

export default function About() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
      <section id="about" className="bg-slate-50 py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Colonne Image - Style Portrait Galerie */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 border-[12px] border-white shadow-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                <LazyImage
                  src={ibramus}
                  alt="Ibrahim Muswema"
                  className="w-full h-[500px] md:h-[650px] object-cover"
                  style={{ objectPosition: 'center 10%' }}
                />
              </div>
              {/* Carré décoratif architectural en arrière-plan */}
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-slate-900 -z-0 hidden md:block"></div>
            </motion.div>

            {/* Colonne Texte - Vision de l'Architecte */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            >
              <motion.h4 variants={textVariants} className="text-sm tracking-[0.4em] uppercase text-slate-400 mb-4 font-bold">
                L'Homme derrière la structure
              </motion.h4>
              
              <motion.h2 variants={textVariants} className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-8 leading-tight">
                Bâtir avec <span className="italic text-slate-500">Précision</span> & Héritage.
              </motion.h2>

              <motion.p variants={textVariants} className="text-lg text-slate-600 leading-relaxed mb-10 font-light italic">
                "{about}"
              </motion.p>

              {/* Grille de compétences clés */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left border-t border-slate-200 pt-10">
                <motion.div variants={textVariants}>
                  <h5 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-3">Expertise Complète</h5>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    De la conception bioclimatique à la maîtrise d'œuvre complexe, LEGACY Architects assure une fusion entre esthétique moderne et normes techniques rigoureuses.
                  </p>
                </motion.div>

                <motion.div variants={textVariants}>
                  <h5 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-3">Engagement Qualité</h5>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Chaque projet est traité comme une œuvre unique, respectant strictement les budgets et les délais, avec une transparence totale envers nos partenaires.
                  </p>
                </motion.div>

                <motion.div variants={textVariants}>
                  <h5 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-3">Diplômes & Vision</h5>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Architecte certifié, j'intègre des solutions durables et innovantes pour répondre aux défis urbains contemporains à Kinshasa et ailleurs.
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    En tant qu'Architecte Associé de LEGACY ARCHITECTS, ma mission est de créer des espaces qui inspirent et perdurent à travers le temps.
                  </p>
                </motion.div>

                <motion.div variants={textVariants} className="bg-slate-900 p-6 text-white self-center">
                  <p className="text-xs uppercase tracking-widest mb-2 font-bold">Prêt pour votre projet ?</p>
                  <a href="/contact" className="text-sm border-b border-white/50 hover:border-white transition-all pb-1 italic">
                    Demander une consultation →
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

            {/* SECTION ASSOCIÉ & ÉQUIPE - LEGACY ARCHITECTS & CO */}
      <section id="team" className="bg-white py-24 px-6 border-t border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          {/* En-tête de la section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-20 max-w-3xl"
          >
            <h4 className="text-sm tracking-[0.4em] uppercase text-slate-400 mb-4 font-bold">
              Gouvernance & Talents
            </h4>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight">
              L'Associé & <span className="italic text-slate-500">Notre Équipe</span>.
            </h2>
          </motion.div>

          {/* BLOC 1 : MISE EN AVANT DE L'ASSOCIÉ (Disposition inversée pour équilibrer la page) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
            
            {/* Colonne Texte - Présentation de l'Associé */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
              className="order-2 lg:order-1"
            >
              <motion.span
                variants={textVariants}
                className="inline-block text-xs tracking-[0.3em] uppercase text-slate-500 font-bold mb-3"
              >
                Co-Fondateur & Architecte Associé
              </motion.span>

              <motion.h3
                variants={textVariants}
                className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6"
              >
                Ezéchiel BAZABANGA, Architecte Associé de LEGACY Architects & Co.
              </motion.h3>

              <motion.p
                variants={textVariants}
                className="text-lg text-slate-600 leading-relaxed mb-8 font-light italic"
              >
                "Allier l'audace structurelle à la maîtrise technique pour concevoir des ouvrages durables qui redéfinissent le paysage urbain."
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-200 pt-8">
                <motion.div variants={textVariants}>
                  <h5 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-2">
                    Direction Technique
                  </h5>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Supervision des études d'exécution, ingénierie structurelle et coordination des corps d'état sur les chantiers d'envergure.
                  </p>
                </motion.div>

                <motion.div variants={textVariants}>
                  <h5 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-2">
                    Stratégie & Développement
                  </h5>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Pilotage des partenariats institutionnels, suivi budgétaire rigoureux et accompagnement sur-mesure des maîtres d'ouvrage.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Colonne Image - Portrait Galerie de l'Associé */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative z-10 border-[12px] border-slate-50 shadow-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                <LazyImage
                  src={associeImage}
                  alt="Associé LEGACY Architects & Co"
                  className="w-full h-[460px] md:h-[580px] object-cover"
                  style={{ objectPosition: 'center 15%' }}
                />
              </div>
              {/* Carré décoratif architectural décalé à gauche */}
              <div className="absolute -bottom-6 -left-6 w-56 h-56 bg-slate-900 -z-0 hidden md:block"></div>
            </motion.div>
          </div>

          {/* BLOC 2 : GRILLE DE L'ÉQUIPE PLURIDISCIPLINAIRE */}
          <div className="border-t border-slate-200 pt-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
              <div>
                <span className="text-xs tracking-[0.35em] uppercase text-slate-400 font-bold block mb-2">
                  Le Studio
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                  L'Équipe Pluridisciplinaire
                </h3>
              </div>
              <p className="text-sm text-slate-500 max-w-md font-light">
                Architectes projeteurs, ingénieurs structure et designers d'intérieur unis par la même exigence du détail.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  name: "Prénom & Nom",
                  role: "Architecte Chef de Projet",
                  specialty: "Conception BIM & Modélisation 3D",
                  images: TeamMember1,
                },
                {
                  name: "Prénom & Nom",
                  role: "Ingénieur Structure & Chantier",
                  specialty: "Calculs techniques & Contrôle d'exécution",
                  images: TeamMember2,
                },
                {
                  name: "Prénom & Nom",
                  role: "Architecte d'Intérieur",
                  specialty: "Design spatial, matériaux & lumière",
                  images: TeamMember3,
                },
                 {
                  name: "Prénom & Nom",
                  role: "Architecte d'Intérieur",
                  specialty: "Design spatial, matériaux & lumière",
                  images: TeamMember4,
                },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group"
                >
                  {/* Cadre Photo Architectural */}
                  <div className="relative mb-6">
                    <div className="relative z-10 border-[8px] border-slate-50 shadow-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                      <LazyImage
                        src={member.images}
                        alt={member.name}
                        className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
                        style={{ objectPosition: 'center 15%' }}
                      />
                    </div>
                    {/* Liseré architectural au survol */}
                    <div className="absolute -bottom-3 -right-3 w-full h-full border border-slate-900/20 group-hover:border-slate-900 transition-colors duration-500 -z-0"></div>
                  </div>

                  {/* Informations du membre */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400 block mb-1">
                      0{index + 1} — {member.role}
                    </span>
                    <h4 className="text-xl font-serif font-bold text-slate-900 group-hover:text-slate-600 transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 font-light">
                      {member.specialty}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      
      {/* Section Maps avec un titre propre */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h3 className="text-2xl font-serif italic text-slate-900">Retrouvez-nous au bureau</h3>
          <p className="text-slate-500 text-sm mt-2">Kinshasa, République Démocratique du Congo</p>
        </div>
        <GoogleMapsSection />
      </section> */}
    </>
  );
}
