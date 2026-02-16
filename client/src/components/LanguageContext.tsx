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
  "form.klimabonus_scheme": { en: "Klimabonus scheme", fr: "Régime Klimabonus" },
  "form.scheme_2026": { en: "2026 scheme (from 5 Jan 2026)", fr: "Régime 2026 (à partir du 5 janv. 2026)" },
  "form.scheme_transition": { en: "Transition (order before 4 Mar 2026)", fr: "Transition (commande avant le 4 mars 2026)" },

  // Results
  "result.system_size": { en: "Recommended System", fr: "Système Recommandé" },
  "result.production": { en: "Est. Annual Production", fr: "Prod. Annuelle Estimée" },
  "result.installation_cost": { en: "Installation Cost", fr: "Coût d'Installation" },
  "result.subsidy": { en: "Klimabonus Subsidy", fr: "Subside Klimabonus" },
  "result.net_cost": { en: "Net Investment", fr: "Investissement Net" },
  "result.after_subsidy": { en: "After €{{amount}} Klimabonus", fr: "Après {{amount}} € Klimabonus" },
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
  "lead.sending": { en: "Sending & generating PDF...", fr: "Envoi et génération du PDF..." },
  "lead.toast_sent": { en: "Your details were sent. Check your downloads for the PDF.", fr: "Vos coordonnées ont été envoyées. Consultez vos téléchargements pour le PDF." },
  "lead.toast_pdf_only": { en: "Check your downloads for the PDF. You may contact us directly to confirm.", fr: "Consultez vos téléchargements pour le PDF. Vous pouvez nous contacter pour confirmer." },
  "lead.toast_title_sent": { en: "Quote sent & PDF ready!", fr: "Devis envoyé et PDF prêt !" },
  "lead.toast_title_pdf": { en: "PDF ready!", fr: "PDF prêt !" },
  "lead.follow_up": { en: "One of our solar experts will contact you shortly at", fr: "Un de nos experts solaires vous contactera prochainement au" },
  "lead.another_quote": { en: "Get Another Quote", fr: "Obtenir un autre devis" },

  // Klimabonus note (calculator)
  "klimabonus.note_2026": { en: "Subsidy under 2026 scheme (formula up to €10,000 at 15 kWp). Pre-financing available.", fr: "Subside selon le régime 2026 (formule jusqu'à 10 000 € à 15 kWp). Préfinancement possible." },
  "klimabonus.note_transition": { en: "Subsidy under transition scheme (50%, max €1,250/kWp). Orders before 4 Mar 2026.", fr: "Subside selon le régime de transition (50 %, max 1 250 €/kWp). Commandes avant le 4 mars 2026." },
  "klimabonus.link": { en: "Official calculator", fr: "Calculateur officiel" },
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
