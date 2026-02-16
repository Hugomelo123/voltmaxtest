import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  "nav.home": { en: "Home", fr: "Accueil" },
  "nav.calculator": { en: "Calculator", fr: "Calculateur" },
  "nav.contact": { en: "Contact", fr: "Contact" },
  "nav.get_quote": { en: "Get Quote", fr: "Obtenir un Devis" },

  // Hero
  "hero.title": { en: "Power Your Future With Solar", fr: "Alimentez Votre Avenir Avec Le Solaire" },
  "hero.subtitle": { en: "Premium solar installations in Luxembourg. Get your instant quote and ROI calculation in seconds.", fr: "Installations solaires premium au Luxembourg. Obtenez votre devis instantané et calcul de ROI en quelques secondes." },
  "hero.cta": { en: "Start Calculator", fr: "Lancer le Calculateur" },

  // Form Fields
  "form.property_type": { en: "Property Type", fr: "Type de Propriété" },
  "form.house": { en: "House", fr: "Maison" },
  "form.apartment": { en: "Apartment", fr: "Appartement" },
  "form.business": { en: "Business", fr: "Entreprise" },
  "form.roof_type": { en: "Roof Type", fr: "Type de Toit" },
  "form.pitched": { en: "Pitched Roof", fr: "Toit Incliné" },
  "form.flat": { en: "Flat Roof", fr: "Toit Plat" },
  "form.facade": { en: "Facade", fr: "Façade" },
  "form.roof_area": { en: "Roof Area Available", fr: "Surface de Toit Disponible" },
  "form.monthly_bill": { en: "Monthly Electricity Bill", fr: "Facture Mensuelle d'Électricité" },

  // Results
  "result.system_size": { en: "Recommended System", fr: "Système Recommandé" },
  "result.production": { en: "Est. Annual Production", fr: "Prod. Annuelle Estimée" },
  "result.installation_cost": { en: "Installation Cost", fr: "Coût d'Installation" },
  "result.subsidy": { en: "Klimabonus Subsidy", fr: "Subside Klimabonus" },
  "result.net_cost": { en: "Net Investment", fr: "Investissement Net" },
  "result.annual_savings": { en: "Annual Savings", fr: "Économies Annuelles" },
  "result.roi": { en: "Return on Investment", fr: "Retour sur Investissement" },
  "result.years": { en: "years", fr: "ans" },

  // Lead Form
  "lead.title": { en: "Get Your Official Quote", fr: "Obtenez Votre Devis Officiel" },
  "lead.subtitle": { en: "Enter your details to receive a full PDF breakdown via email.", fr: "Entrez vos coordonnées pour recevoir le détail complet par email." },
  "lead.name": { en: "Full Name", fr: "Nom Complet" },
  "lead.email": { en: "Email Address", fr: "Adresse Email" },
  "lead.phone": { en: "Phone Number", fr: "Numéro de Téléphone" },
  "lead.submit": { en: "Send My Quote", fr: "Envoyer Mon Devis" },
  "lead.success": { en: "Quote Sent Successfully!", fr: "Devis Envoyé avec Succès !" },
  "lead.sending": { en: "Generating PDF...", fr: "Génération du PDF..." },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
