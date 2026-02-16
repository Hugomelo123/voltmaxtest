import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation (EN primary)
  "nav.home": { en: "Home", fr: "Accueil", pt: "Início" },
  "nav.calculator": { en: "Calculator", fr: "Calculateur", pt: "Calculadora" },
  "nav.contact": { en: "Contact", fr: "Contact", pt: "Contacto" },
  "nav.get_quote": { en: "Get Quote", fr: "Obtenir un Devis", pt: "Pedir Devis" },

  // Hero
  "hero.title": { en: "Power Your Future With Solar", fr: "Alimentez Votre Avenir Avec Le Solaire", pt: "Alimente o Seu Futuro Com Solar" },
  "hero.subtitle": { en: "Premium solar installations in Luxembourg. Get your instant quote and ROI calculation in seconds.", fr: "Installations solaires premium au Luxembourg. Obtenez votre devis instantané et calcul de ROI en quelques secondes.", pt: "Instalações solares premium no Luxemburgo. Obtenha o seu orçamento e cálculo de ROI em segundos." },
  "hero.cta": { en: "Start Calculator", fr: "Lancer le Calculateur", pt: "Iniciar Calculadora" },
  "hero.badge": { en: "Luxembourg's #1 Solar Choice", fr: "Choix solaire n°1 au Luxembourg", pt: "Escolha solar n.º 1 no Luxemburgo" },
  "hero.rating": { en: "4.9/5 Rating", fr: "Note 4,9/5", pt: "Avaliação 4,9/5" },
  "hero.rating_based": { en: "Based on 500+ installs", fr: "Sur plus de 500 installations", pt: "Com base em mais de 500 instalações" },

  // Form
  "form.property_type": { en: "Property Type", fr: "Type de Propriété", pt: "Tipo de Imóvel" },
  "form.house": { en: "House", fr: "Maison", pt: "Casa" },
  "form.apartment": { en: "Apartment", fr: "Appartement", pt: "Apartamento" },
  "form.business": { en: "Business", fr: "Entreprise", pt: "Empresa" },
  "form.roof_type": { en: "Roof Type", fr: "Type de Toit", pt: "Tipo de Cobertura" },
  "form.pitched": { en: "Pitched Roof", fr: "Toit Incliné", pt: "Telhado Inclinado" },
  "form.flat": { en: "Flat Roof", fr: "Toit Plat", pt: "Telhado Plano" },
  "form.facade": { en: "Facade", fr: "Façade", pt: "Fachada" },
  "form.roof_area": { en: "Roof Area Available", fr: "Surface de Toit Disponible", pt: "Área de Cobertura Disponível" },
  "form.monthly_bill": { en: "Monthly Electricity Bill", fr: "Facture Mensuelle d'Électricité", pt: "Fatura Mensal de Eletricidade" },
  "form.klimabonus_scheme": { en: "Klimabonus scheme", fr: "Régime Klimabonus", pt: "Regime Klimabonus" },
  "form.scheme_2026": { en: "2026 scheme (from 5 Jan 2026)", fr: "Régime 2026 (à partir du 5 janv. 2026)", pt: "Regime 2026 (a partir de 5 jan. 2026)" },
  "form.scheme_transition": { en: "Transition (order before 4 Mar 2026)", fr: "Transition (commande avant le 4 mars 2026)", pt: "Transição (encomenda antes de 4 mar. 2026)" },

  // Results
  "result.system_size": { en: "Recommended System", fr: "Système Recommandé", pt: "Sistema Recomendado" },
  "result.production": { en: "Est. Annual Production", fr: "Prod. Annuelle Estimée", pt: "Prod. Anual Estimada" },
  "result.installation_cost": { en: "Installation Cost", fr: "Coût d'Installation", pt: "Custo de Instalação" },
  "result.subsidy": { en: "Klimabonus Subsidy", fr: "Subside Klimabonus", pt: "Subsídio Klimabonus" },
  "result.net_cost": { en: "Net Investment", fr: "Investissement Net", pt: "Investimento Líquido" },
  "result.after_subsidy": { en: "After €{{amount}} Klimabonus", fr: "Après {{amount}} € Klimabonus", pt: "Após {{amount}} € Klimabonus" },
  "result.annual_savings": { en: "Annual Savings", fr: "Économies Annuelles", pt: "Poupança Anual" },
  "result.roi": { en: "Return on Investment", fr: "Retour sur Investissement", pt: "Retorno do Investimento" },
  "result.years": { en: "years", fr: "ans", pt: "anos" },
  "result.panels": { en: "Panels", fr: "Panneaux", pt: "Painéis" },
  "result.green_energy": { en: "Green Energy", fr: "Énergie Verte", pt: "Energia Verde" },
  "result.save_per_year": { en: "Save €{{amount}} / year", fr: "Économisez {{amount}} € / an", pt: "Poupe {{amount}} € / ano" },

  // Lead Form
  "lead.title": { en: "Get Your Official Quote", fr: "Obtenez Votre Devis Officiel", pt: "Obtenha o Seu Devis Oficial" },
  "lead.subtitle": { en: "Enter your details to receive a full PDF breakdown via email.", fr: "Entrez vos coordonnées pour recevoir le détail complet par email.", pt: "Indique os seus dados para receber o PDF completo por email." },
  "lead.name": { en: "Full Name", fr: "Nom Complet", pt: "Nome Completo" },
  "lead.email": { en: "Email Address", fr: "Adresse Email", pt: "Email" },
  "lead.phone": { en: "Phone Number", fr: "Numéro de Téléphone", pt: "Telefone" },
  "lead.submit": { en: "Send My Quote", fr: "Envoyer Mon Devis", pt: "Enviar Meu Devis" },
  "lead.success": { en: "Quote Sent Successfully!", fr: "Devis Envoyé avec Succès !", pt: "Devis Enviado com Sucesso!" },
  "lead.sending": { en: "Sending & generating PDF...", fr: "Envoi et génération du PDF...", pt: "A enviar e a gerar PDF..." },
  "lead.toast_sent": { en: "Your details were sent. Check your downloads for the PDF.", fr: "Vos coordonnées ont été envoyées. Consultez vos téléchargements pour le PDF.", pt: "Os seus dados foram enviados. Consulte os descarregamentos para o PDF." },
  "lead.toast_pdf_only": { en: "Check your downloads for the PDF. You may contact us directly to confirm.", fr: "Consultez vos téléchargements pour le PDF. Vous pouvez nous contacter pour confirmer.", pt: "Consulte os descarregamentos para o PDF. Pode contactar-nos para confirmar." },
  "lead.toast_title_sent": { en: "Quote sent & PDF ready!", fr: "Devis envoyé et PDF prêt !", pt: "Devis enviado e PDF pronto!" },
  "lead.toast_title_pdf": { en: "PDF ready!", fr: "PDF prêt !", pt: "PDF pronto!" },
  "lead.follow_up": { en: "One of our solar experts will contact you shortly at", fr: "Un de nos experts solaires vous contactera prochainement au", pt: "Um dos nossos especialistas entrará em contacto consigo em breve no" },
  "lead.another_quote": { en: "Get Another Quote", fr: "Obtenir un autre devis", pt: "Pedir Outro Devis" },
  "lead.disclaimer": { en: "By submitting, you agree to receive a PDF quote and a follow-up call.", fr: "En soumettant, vous acceptez de recevoir un devis PDF et un appel de suivi.", pt: "Ao submeter, aceita receber o PDF do devis e uma chamada de seguimento." },

  // Klimabonus
  "klimabonus.note_2026": { en: "Subsidy under 2026 scheme (formula up to €10,000 at 15 kWp). Pre-financing available.", fr: "Subside selon le régime 2026 (formule jusqu'à 10 000 € à 15 kWp). Préfinancement possible.", pt: "Subsídio no regime 2026 (fórmula até 10 000 € aos 15 kWp). Pré-financiamento disponível." },
  "klimabonus.note_transition": { en: "Subsidy under transition scheme (50%, max €1,250/kWp). Orders before 4 Mar 2026.", fr: "Subside selon le régime de transition (50 %, max 1 250 €/kWp). Commandes avant le 4 mars 2026.", pt: "Subsídio no regime de transição (50 %, máx. 1 250 €/kWp). Encomendas antes de 4 mar. 2026." },
  "klimabonus.link": { en: "Official calculator", fr: "Calculateur officiel", pt: "Calculadora oficial" },

  // Calculator section
  "calculator.title": { en: "Smart Calculator", fr: "Calculateur Intelligent", pt: "Calculadora Inteligente" },
  "calculator.heading": { en: "Calculate Your Solar Potential", fr: "Calculez Votre Potentiel Solaire", pt: "Calcule o Seu Potencial Solar" },
  "calculator.intro": { en: "Adjust the sliders to see your estimated savings and system size instantly. Roof area = usable surface for panels. All figures are indicative; final offer after site visit.", fr: "Ajustez les curseurs pour voir vos économies et la taille du système estimées. Surface du toit = surface utilisable pour les panneaux. Tous les montants sont indicatifs ; offre finale après visite sur site.", pt: "Ajuste os cursores para ver a poupança e o tamanho do sistema estimados. Área do telhado = superfície utilizável para painéis. Valores indicativos; oferta final após visita no local." },

  // Features
  "feature.1.title": { en: "High Efficiency", fr: "Haute Efficacité", pt: "Alta Eficiência" },
  "feature.1.desc": { en: "We use the latest N-Type TopCon technology for maximum energy yield even on cloudy days.", fr: "Nous utilisons la dernière technologie N-Type TopCon pour un rendement énergétique maximal même par temps nuageux.", pt: "Utilizamos a tecnologia N-Type TopCon para máximo rendimento mesmo com tempo nublado." },
  "feature.2.title": { en: "25-Year Warranty", fr: "Garantie 25 Ans", pt: "Garantia de 25 Anos" },
  "feature.2.desc": { en: "Peace of mind with industry-leading performance and product warranties on all installations.", fr: "Tranquillité d'esprit avec des garanties de performance et de produit de pointe sur toutes les installations.", pt: "Garantias de desempenho e de produto de referência em todas as instalações." },
  "feature.3.title": { en: "Fast Installation", fr: "Installation Rapide", pt: "Instalação Rápida" },
  "feature.3.desc": { en: "From technical visit to grid connection in less than 6 weeks. We handle all Luxembourgish permits.", fr: "De la visite technique au raccordement au réseau en moins de 6 semaines. Nous gérons tous les permis luxembourgeois.", pt: "Da visita técnica à ligação à rede em menos de 6 semanas. Tratamos de todas as autorizações no Luxemburgo." },
  "feature.4.title": { en: "Smart Monitoring", fr: "Suivi Intelligent", pt: "Monitorização Inteligente" },
  "feature.4.desc": { en: "Track your production and consumption in real-time with our premium mobile application.", fr: "Suivez votre production et votre consommation en temps réel grâce à notre application mobile premium.", pt: "Acompanhe a produção e o consumo em tempo real com a nossa aplicação móvel." },

  // Footer
  "footer.description": { en: "Luxembourg's premier solar installation partner. Delivering high-performance photovoltaic solutions with transparent pricing and guaranteed ROI.", fr: "Partenaire n°1 des installations solaires au Luxembourg. Solutions photovoltaïques performantes, tarifs transparents et ROI garanti.", pt: "Parceiro de referência em instalações solares no Luxemburgo. Soluções fotovoltaicas de alto desempenho, preços transparentes e ROI garantido." },
  "footer.contact": { en: "Contact", fr: "Contact", pt: "Contacto" },
  "footer.legal": { en: "Legal", fr: "Mentions Légales", pt: "Legal" },
  "footer.terms": { en: "Terms and Conditions", fr: "Conditions Générales", pt: "Termos e Condições" },
  "footer.impressum": { en: "Impressum", fr: "Impressum", pt: "Impressum" },
  "footer.contact_link": { en: "Contact", fr: "Contact", pt: "Contacto" },
  "footer.copyright": { en: "All rights reserved.", fr: "Tous droits réservés.", pt: "Todos os direitos reservados." },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const value = translations[key]?.[language];
    if (value !== undefined) return value;
    return translations[key]?.['en'] ?? key;
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
