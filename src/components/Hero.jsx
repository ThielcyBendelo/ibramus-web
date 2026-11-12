import useParallax from '../hooks/useParallax';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import LazyImage from './LazyImage';
import { useEffect, useState } from 'react';
import notificationService from '../services/notificationService';
import { profile1Image } from '../assets/assets.js';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// --- SECTION SERVICES ---
const Services = () => (
  <section className="py-24 bg-white text-slate-900 px-6">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-serif mb-16 border-l-4 border-slate-900 pl-6 text-left">Nos Domaines d'Expertise</h2>
      <div className="grid md:grid-cols-3 gap-12 text-left">
        {[
          { title: "Conception Architecturale", desc: "Plans détaillés et vision spatiale innovante pour projets résidentiels et commerciaux." },
          { title: "Suivi de Chantier", desc: "Expertise technique et coordination rigoureuse pour garantir la conformité de l'exécution." },
          { title: "Design d'Intérieur", desc: "Optimisation esthétique et fonctionnelle des espaces de vie et de travail." }
        ].map((service, i) => (
          <div key={i} className="group cursor-pointer border-b border-slate-200 pb-6">
            <h3 className="text-xl font-bold mb-4 group-hover:text-slate-500 transition-colors uppercase tracking-widest">0{i+1}. {service.title}</h3>
            <p className="text-slate-600 font-light leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- SECTION QUOTE ---
const Quote = () => (
  <section className="py-24 bg-slate-950 text-white text-center italic font-light px-6">
    <div className="max-w-4xl mx-auto">
      <p className="text-2xl md:text-3xl leading-snug">
        "L'architecture est le témoin invisible de l'histoire. Chez LEGACY, nous concevons des structures qui traversent le temps."
      </p>
      <div className="mt-8 h-px w-20 bg-slate-500 mx-auto"></div>
    </div>
  </section>
);

export default function Hero() {
  const scrollY = useParallax();
  const [elementRef] = useIntersectionObserver();
  const navigate = useNavigate();

  // Slides défilants synchronisés (Images claires + Titres + Descriptions)
  const slides = [
    {
      bg: '/background10.jpeg',
      kicker: 'CONCEPTION ARCHITECTURALE • DESIGN & URBANISME',
      title: 'Bâtissez votre Héritage',
      desc: 'Des structures contemporaines sur-mesure, pensées avec rigueur et élégance par Ibrahim Muswema Lemba.',
    },
    {
      bg: '/background8.jpeg',
      kicker: 'INGÉNIERIE SPATIALE • MAÎTRISE D’ŒUVRE',
      title: 'Sublimez vos Espaces',
      desc: 'De l’esquisse initiale à la livraison du chantier, LEGACY Architects & Co donne vie à vos ambitions.',
    },
    {
      bg: '/backgroud10.jpeg',
      kicker: 'ARCHITECTURE DURABLE • INNOVATION & ESTHÉTIQUE',
      title: 'Dessinez le Futur',
      desc: 'Une approche harmonieuse alliant lumière naturelle, matériaux nobles et performance fonctionnelle.',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Défilement automatique toutes les 6 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <section
        ref={elementRef}
        id="home"
        className="relative min-h-screen flex flex-col justify-center items-center text-center py-20 px-6 overflow-hidden bg-slate-900"
      >
        {/* Background avec Parallaxe doux et luminosité claire */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${slides[currentSlide].bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.65) contrast(108%)',
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />
        </AnimatePresence>

        {/* Overlay léger pour garder l'image claire tout en assurant la lisibilité du texte */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-slate-950/90 z-10" />

        {/* Flèches de navigation latérales (Style épuré comme sur l'exemple) */}
        <button
          onClick={prevSlide}
          aria-label="Diapositive précédente"
          className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 p-3 text-white/60 hover:text-white transition-colors"
        >
          <FaChevronLeft className="text-2xl md:text-3xl" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Diapositive suivante"
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 p-3 text-white/60 hover:text-white transition-colors"
        >
          <FaChevronRight className="text-2xl md:text-3xl" />
        </button>

        <div className="relative z-20 max-w-4xl mx-auto w-full">
          {/* En-tête Identité Architecte Principal */}
          <AnimatedSection variant="slideUp" delay={0.1}>
            <div className="mb-6">
              <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-white font-semibold">
                IBRAHIM <span className="text-amber-400 font-normal">MUSWEMA LEMBA</span>
              </p>
              <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-slate-200/85 mt-1 font-light">
                ARCHITECTE PRINCIPAL & ASSOCIÉ • LEGACY ARCHITECTS & CO
              </p>
            </div>
          </AnimatedSection>

          {/* Identité visuelle - Cercle Architectural lumineux */}
          <AnimatedSection variant="scaleIn" delay={0.2}>
            <div className="mb-8 flex justify-center">
              <div className="relative group">
                <LazyImage
                  src={profile1Image}
                  alt="Ibrahim Muswema Lemba"
                  className="w-36 h-36 md:w-48 md:h-48 rounded-full object-cover transition-all duration-700 border-2 border-amber-400/70 shadow-2xl"
                  style={{ objectPosition: 'center 15%' }}
                />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-3 border-t-2 border-l-2 border-amber-400/40 rounded-full pointer-events-none"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Contenu Défilant : Sur-titre, Titre et Description */}
          <div className="min-h-[190px] md:min-h-[210px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                <span className="block text-[11px] md:text-xs tracking-[0.25em] uppercase text-amber-300 font-semibold mb-3">
                  {slides[currentSlide].kicker}
                </span>

                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-5 text-white leading-tight drop-shadow-md">
                  {slides[currentSlide].title}
                </h1>

                <p className="text-base md:text-lg text-slate-100 max-w-2xl mx-auto mb-8 font-light leading-relaxed drop-shadow">
                  {slides[currentSlide].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Call to Actions (Structure et design strictement conservés) */}
          <AnimatedSection variant="slideUp" delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => navigate('/projects')}
                className="px-10 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-slate-200 transition-colors"
              >
                Explorer le Portfolio
              </button>
              
              <button
                onClick={() => navigate('/contact')}
                className="px-10 py-4 border border-white text-white font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Consultation Privée
              </button>
            </div>
          </AnimatedSection>
        </div>

        {/* Indicateurs de pagination défilants en bas (comme sur l'image de référence) */}
        <div className="absolute bottom-8 z-30 flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Aller à la diapositive ${index + 1}`}
              className={`h-1.5 transition-all duration-300 ${
                currentSlide === index
                  ? 'w-8 bg-amber-400'
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Sections Services et Quote */}
      <Services />
      <Quote />
    </>
  );
}
