import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserPlus,
  FaUser,
  FaEnvelope,
  FaKey,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaArrowLeft,
  FaExclamationCircle,
} from 'react-icons/fa';
import useFormSecurity from '../hooks/useFormSecurity';
import authService from '../services/authService';
import { register as apiRegister } from '../services/authApi';

const SecureRegister = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);

  const formSchema = {
    name: { type: 'text', minLength: 2, maxLength: 50, required: true },
    email: { type: 'email', required: true },
    password: { type: 'password', required: true },
    confirmPassword: { type: 'password', required: true },
  };

  const {
    formData,
    errors,
    touched,
    isLoading,
    handleChange: baseHandleChange,
    handleBlur,
    handleSubmit: handleFormSubmit,
  } = useFormSecurity(formSchema, async (data) => {
    try {
      setApiError('');

      if (data.password !== data.confirmPassword) {
        setApiError('Les mots de passe ne correspondent pas.');
        return;
      }

      const resp = await apiRegister({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      const user = resp?.user || authService.getCurrentUser();
      if (user?.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      setApiError(error.userMessage || error.message || "Erreur lors de l'inscription.");
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'password' && value.length > 0) {
      const strength = authService.validatePasswordStrength(value);
      setPasswordStrength(strength);
    } else if (name === 'password') {
      setPasswordStrength(null);
    }

    baseHandleChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError('');
    handleFormSubmit(e);
  };

  const getPasswordStrengthStyle = (score) => {
    if (score <= 2) return { text: 'text-rose-400', bar: 'bg-rose-500 w-1/4' };
    if (score <= 3) return { text: 'text-orange-400', bar: 'bg-orange-500 w-2/4' };
    if (score <= 4) return { text: 'text-amber-400', bar: 'bg-amber-500 w-3/4' };
    return { text: 'text-emerald-400', bar: 'bg-emerald-500 w-full' };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-16 relative">
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
            <FaUserPlus size={17} />
          </div>
          <span className="text-[10px] tracking-[0.35em] uppercase text-amber-500 font-bold block mb-2">
            APA IBRAMUS — Nouveau Compte
          </span>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Créer un Accès
          </h1>
          <div className="w-10 h-px bg-amber-600 mx-auto my-4"></div>
          <p className="text-xs text-slate-400 tracking-wide">
            Rejoignez le portail client pour suivre vos études architecturales
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
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Nom complet */}
          <div className="group">
            <label
              htmlFor="name"
              className="block text-[11px] uppercase tracking-[0.2em] font-bold text-slate-300 mb-2"
            >
              Nom complet <span className="text-amber-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span
                className={`absolute left-4 transition-colors duration-300 ${
                  touched.name && errors.name
                    ? 'text-rose-400'
                    : 'text-slate-500 group-focus-within:text-amber-500'
                }`}
              >
                <FaUser size={13} />
              </span>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jean Dupont"
                value={formData.name || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full pl-11 pr-4 py-3.5 bg-slate-950 border text-sm text-white placeholder-slate-600 focus:outline-none transition-all duration-300 ${
                  touched.name && errors.name
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-slate-800 focus:border-amber-600'
                } disabled:opacity-50`}
              />
            </div>
            {touched.name && errors.name && (
              <p className="flex items-center gap-1.5 text-rose-400 text-xs mt-2">
                <FaExclamationCircle size={11} />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Email */}
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
                <FaEnvelope size={13} />
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

          {/* Mot de passe */}
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
                <FaKey size={13} />
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
                }`}
              />
            </div>

            {/* Indicateur de force du mot de passe */}
            {passwordStrength && (
              <div className="mt-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">
                    Sécurité du mot de passe
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider font-bold ${getPasswordStrengthStyle(passwordStrength.score).text}`}>
                    {passwordStrength.label || `Niveau ${passwordStrength.score}/6`}
                  </span>
                </div>
                <div className="w-full h-1 bg-slate-800 overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${getPasswordStrengthStyle(passwordStrength.score).bar}`} />
                </div>
              </div>
            )}

            {touched.password && errors.password && (
              <p className="flex items-center gap-1.5 text-rose-400 text-xs mt-2">
                <FaExclamationCircle size={11} />
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          {/* Confirmation du mot de passe */}
          <div className="group">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="confirmPassword"
                className="block text-[11px] uppercase tracking-[0.2em] font-bold text-slate-300"
              >
                Confirmer le mot de passe <span className="text-amber-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
              >
                {showConfirmPassword ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
                <span>{showConfirmPassword ? 'Masquer' : 'Afficher'}</span>
              </button>
            </div>
            <div className="relative flex items-center">
              <span
                className={`absolute left-4 transition-colors duration-300 ${
                  touched.confirmPassword && errors.confirmPassword
                    ? 'text-rose-400'
                    : 'text-slate-500 group-focus-within:text-amber-500'
                }`}
              >
                <FaCheckCircle size={13} />
              </span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={formData.confirmPassword || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full pl-11 pr-4 py-3.5 bg-slate-950 border text-sm text-white placeholder-slate-600 focus:outline-none transition-all duration-300 ${
                  touched.confirmPassword && errors.confirmPassword
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-slate-800 focus:border-amber-600'
                } disabled:opacity-50`}
              />
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="flex items-center gap-1.5 text-rose-400 text-xs mt-2">
                <FaExclamationCircle size={11} />
                <span>{errors.confirmPassword}</span>
              </p>
            )}
          </div>

          {/* Bouton de soumission */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-amber-600 text-white text-xs uppercase tracking-[0.25em] font-bold hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-lg"
            >
              <span>{isLoading ? 'Création du compte...' : 'Finaliser l’inscription'}</span>
              {!isLoading && <FaArrowRight size={12} />}
            </button>
          </div>
        </form>

        {/* Lien vers la connexion */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-400 text-xs">
            Vous disposez déjà d'un accès ?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-amber-500 hover:text-amber-400 uppercase tracking-wider font-bold ml-1 transition-colors cursor-pointer"
            >
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecureRegister;
