import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaLock,
  FaEnvelope,
  FaKey,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaArrowLeft,
  FaExclamationCircle,
} from 'react-icons/fa';
import useFormSecurity from '../hooks/useFormSecurity';
import authService from '../services/authService';

const SecureLogin = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = {
    email: { type: 'email', required: true },
    password: { type: 'password', required: true },
  };

  const {
    formData,
    errors,
    touched,
    isLoading,
    handleChange,
    handleBlur,
    handleSubmit: handleFormSubmit,
  } = useFormSecurity(formSchema, async (data) => {
    try {
      setApiError('');
      const resp = await authService.login(data.email, data.password);
      if (resp?.user?.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      setApiError(error.userMessage || error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError('');
    handleFormSubmit(e);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12 relative">
      {/* Retour vers le site */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
      >
        <FaArrowLeft size={11} />
        <span>Retour à l'agence</span>
      </button>

      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-md p-8 md:p-12 border border-slate-800 border-t-4 border-t-amber-600 shadow-2xl">
        {/* En-tête éditorial */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 border border-amber-600/40 bg-slate-950 text-amber-500 mb-5">
            <FaLock size={16} />
          </div>
          <span className="text-[10px] tracking-[0.35em] uppercase text-amber-500 font-bold block mb-2">
            APA IBRAMUS — Portail Privé
          </span>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Espace Client
          </h1>
          <div className="w-10 h-px bg-amber-600 mx-auto my-4"></div>
          <p className="text-xs text-slate-400 tracking-wide">
            Suivi de chantier, plans techniques et documents de projet
          </p>
        </div>

        {/* Erreur API */}
        {apiError && (
          <div className="mb-6 p-4 bg-rose-950/50 border-l-2 border-rose-500 flex items-center gap-3">
            <FaExclamationCircle className="text-rose-400 flex-shrink-0" size={15} />
            <p className="text-rose-200 text-xs">{apiError}</p>
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Champ Email */}
          <div className="group">
            <label
              htmlFor="email"
              className="block text-[11px] uppercase tracking-[0.2em] font-bold text-slate-300 mb-2"
            >
              Adresse Email <span className="text-amber-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span
                className={`absolute left-4 transition-colors duration-300 ${
                  touched.email && errors.email
                    ? 'text-rose-400'
                    : 'text-slate-500 group-focus-within:text-amber-500'
                }`}
              >
                <FaEnvelope size={14} />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="client@domaine.com"
                value={formData.email || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full pl-11 pr-4 py-3.5 bg-slate-950 border text-sm text-white placeholder-slate-600 focus:outline-none transition-all duration-300 ${
                  touched.email && errors.email
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-slate-800 focus:border-amber-600'
                } disabled:opacity-50`}
              />
            </div>
            {touched.email && errors.email && (
              <p className="flex items-center gap-1.5 text-rose-400 text-xs mt-2">
                <FaExclamationCircle size={11} />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Champ Mot de passe */}
          <div className="group">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-[11px] uppercase tracking-[0.2em] font-bold text-slate-300"
              >
                Mot de passe <span className="text-amber-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
              >
                {showPassword ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
                <span>{showPassword ? 'Masquer' : 'Afficher'}</span>
              </button>
            </div>
            <div className="relative flex items-center">
              <span
                className={`absolute left-4 transition-colors duration-300 ${
                  touched.password && errors.password
                    ? 'text-rose-400'
                    : 'text-slate-500 group-focus-within:text-amber-500'
                }`}
              >
                <FaKey size={14} />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={formData.password || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full pl-11 pr-4 py-3.5 bg-slate-950 border text-sm text-white placeholder-slate-600 focus:outline-none transition-all duration-300 ${
                  touched.password && errors.password
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-slate-800 focus:border-amber-600'
                } disabled:opacity-50`}
              />
            </div>
            {touched.password && errors.password && (
              <p className="flex items-center gap-1.5 text-rose-400 text-xs mt-2">
                <FaExclamationCircle size={11} />
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          {/* Options de session */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-slate-400 hover:text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 accent-amber-600 bg-slate-950 border-slate-700 cursor-pointer"
              />
              <span>Maintenir la session</span>
            </label>
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
            >
              Mot de passe oublié ?
            </button>
          </div>

          {/* Bouton de connexion */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 bg-amber-600 text-white text-xs uppercase tracking-[0.25em] font-bold hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-lg"
          >
            <span>{isLoading ? 'Authentification...' : 'Accéder à mon espace'}</span>
            {!isLoading && <FaArrowRight size={12} />}
          </button>
        </form>

        {/* Lien d'inscription */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-400 text-xs">
            Vous êtes un nouveau maître d'ouvrage ?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-amber-500 hover:text-amber-400 uppercase tracking-wider font-bold ml-1 transition-colors cursor-pointer"
            >
              Créer un accès
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecureLogin;
