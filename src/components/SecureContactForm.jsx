import React, { useState } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaCompass,
  FaPenNib,
  FaPaperPlane,
  FaRedoAlt,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';
import useFormSecurity from '../hooks/useFormSecurity';
import { sendContact } from '../services/contactApi';

const FieldError = ({ error, touched }) => {
  return touched && error ? (
    <p className="flex items-center gap-1.5 text-rose-600 text-xs mt-2 font-medium">
      <FaExclamationCircle size={12} className="flex-shrink-0" />
      <span>{error}</span>
    </p>
  ) : null;
};

const SecureInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  icon: Icon,
  value,
  error,
  touched,
  disabled,
  onChange,
  onBlur,
}) => {
  const hasError = touched && error;

  return (
    <div className="flex flex-col group">
      <label
        htmlFor={name}
        className="text-[11px] uppercase tracking-[0.2em] text-slate-600 font-bold mb-2 flex items-center gap-1"
      >
        <span>{label}</span>
        {required && <span className="text-amber-600">*</span>}
      </label>

      <div className="relative flex items-center">
        {Icon && (
          <span
            className={`absolute left-4 transition-colors duration-300 ${
              hasError
                ? 'text-rose-500'
                : 'text-slate-400 group-focus-within:text-amber-600'
            }`}
          >
            <Icon size={14} />
          </span>
        )}

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3.5 bg-stone-50/80 border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all duration-300 ${
            hasError
              ? 'border-rose-500 focus:border-rose-600'
              : 'border-stone-200 focus:border-amber-600'
          }`}
        />
      </div>

      <FieldError error={error} touched={touched} />
    </div>
  );
};

const SecureTextarea = ({
  label,
  name,
  placeholder,
  required = false,
  rows = 5,
  icon: Icon,
  value,
  error,
  touched,
  disabled,
  onChange,
  onBlur,
}) => {
  const hasError = touched && error;

  return (
    <div className="flex flex-col group">
      <div className="flex justify-between items-center mb-2">
        <label
          htmlFor={name}
          className="text-[11px] uppercase tracking-[0.2em] text-slate-600 font-bold flex items-center gap-1"
        >
          <span>{label}</span>
          {required && <span className="text-amber-600">*</span>}
        </label>
        <span className="text-[10px] font-mono text-slate-400">
          {value.length} / 1000
        </span>
      </div>

      <div className="relative">
        {Icon && (
          <span
            className={`absolute left-4 top-4 transition-colors duration-300 ${
              hasError
                ? 'text-rose-500'
                : 'text-slate-400 group-focus-within:text-amber-600'
            }`}
          >
            <Icon size={14} />
          </span>
        )}

        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          rows={rows}
          disabled={disabled}
          className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3.5 bg-stone-50/80 border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all duration-300 resize-none ${
            hasError
              ? 'border-rose-500 focus:border-rose-600'
              : 'border-stone-200 focus:border-amber-600'
          }`}
        />
      </div>

      <FieldError error={error} touched={touched} />
    </div>
  );
};

const SecureContactForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const formSchema = {
    name: {
      type: 'text',
      minLength: 2,
      maxLength: 50,
      required: true,
    },
    email: {
      type: 'email',
      required: true,
    },
    phone: {
      type: 'phone',
      required: false,
    },
    subject: {
      type: 'text',
      minLength: 5,
      maxLength: 100,
      required: true,
    },
    message: {
      type: 'text',
      minLength: 10,
      maxLength: 1000,
      required: true,
    },
  };

  const {
    formData,
    errors,
    touched,
    isLoading,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormSecurity(formSchema, async (data) => {
    try {
      await sendContact(data);
      setIsSuccess(true);
      resetForm();
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (error) {
      console.error('Erreur :', error);
      throw new Error(error.message || "Une erreur est survenue lors de l'envoi.");
    }
  });

  return (
    <div className="max-w-3xl mx-auto bg-white border border-stone-200 border-t-4 border-t-slate-950 p-8 md:p-14 shadow-xl">
      {/* En-tête éditorial */}
      <div className="mb-10">
        <span className="text-xs tracking-[0.3em] uppercase text-amber-600 font-bold block mb-2">
          Consultation & Étude
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-950 mb-4">
          Initier un Projet
        </h2>
        <div className="w-14 h-0.5 bg-amber-600 mb-4"></div>
        <p className="text-sm text-slate-600 leading-relaxed">
          Partagez les grandes lignes de votre programme architectural. Notre équipe étudiera votre demande sous 48 heures.
        </p>
      </div>

      {/* Confirmation d'envoi */}
      {isSuccess && (
        <div className="mb-8 p-5 bg-slate-950 border-l-4 border-amber-500 text-white text-sm flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-amber-500 flex-shrink-0" size={18} />
            <span>Votre demande a bien été transmise à l'agence. Nous vous recontacterons prochainement.</span>
          </div>
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="text-xs uppercase tracking-widest text-slate-400 hover:text-amber-400 ml-4 transition-colors"
          >
            Fermer
          </button>
        </div>
      )}

      {/* Erreur générale */}
      {errors._form && (
        <div className="mb-8 p-4 bg-rose-50 border-l-4 border-rose-600 text-sm text-rose-800 flex items-center gap-3">
          <FaExclamationCircle className="text-rose-600 flex-shrink-0" size={16} />
          <span>{errors._form}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <SecureInput
          label="Nom complet ou Société"
          name="name"
          placeholder="Jean Dupont"
          icon={FaUser}
          required
          value={formData.name || ''}
          error={errors.name}
          touched={touched.name}
          disabled={isLoading}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SecureInput
            label="Adresse Email"
            name="email"
            type="email"
            placeholder="jean.dupont@domaine.com"
            icon={FaEnvelope}
            required
            value={formData.email || ''}
            error={errors.email}
            touched={touched.email}
            disabled={isLoading}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <SecureInput
            label="Téléphone (Optionnel)"
            name="phone"
            type="tel"
            placeholder="+33 6 12 34 56 78"
            icon={FaPhoneAlt}
            value={formData.phone || ''}
            error={errors.phone}
            touched={touched.phone}
            disabled={isLoading}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <SecureInput
          label="Nature du Projet"
          name="subject"
          placeholder="Ex : Construction résidentielle, Réhabilitation, Étude urbaine..."
          icon={FaCompass}
          required
          value={formData.subject || ''}
          error={errors.subject}
          touched={touched.subject}
          disabled={isLoading}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <SecureTextarea
          label="Description & Contraintes"
          name="message"
          placeholder="Précisez la localisation, la surface estimée, le calendrier souhaité ou vos attentes architecturales..."
          icon={FaPenNib}
          required
          rows={5}
          value={formData.message || ''}
          error={errors.message}
          touched={touched.message}
          disabled={isLoading}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* Barre d'actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-slate-950 text-white py-4 px-8 text-xs uppercase tracking-[0.2em] font-bold hover:bg-amber-600 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-sm"
          >
            <FaPaperPlane size={13} />
            <span>{isLoading ? 'Transmission en cours...' : 'Transmettre la demande'}</span>
          </button>

                    <button
            type="button"
            onClick={() => {
              resetForm();
              setIsSuccess(false);
            }}
            disabled={isLoading}
            className="sm:w-auto px-7 py-4 border border-stone-300 text-slate-600 text-xs uppercase tracking-[0.2em] hover:border-slate-950 hover:text-slate-950 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaRedoAlt size={12} />
            <span>Effacer</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecureContactForm;
