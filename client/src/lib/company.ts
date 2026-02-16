/**
 * Voltmax SARL – dados oficiais (voltmax.lu, impressum e contact).
 * Última verificação: fev 2026.
 */

export const COMPANY = {
  /** Nome legal */
  legalName: 'Voltmax SARL',
  /** Nome comercial / marca */
  brandName: 'VOLTMAX',
  /** Slogan usado no site e PDF */
  tagline: "Luxembourg's Premium Solar Partner",

  /** Morada do escritório registado (Impressum) */
  address: {
    street: '47 Rue Mathias Tresch',
    postalCode: 'L-2626',
    city: 'Luxembourg',
    country: 'Luxembourg',
    full: '47 Rue Mathias Tresch, L-2626 Luxembourg',
  },

  /** Showroom principal (Contact page) */
  showroom: {
    street: "7 Pl. de l'Indépendance",
    postalCode: '4418',
    city: 'Soleuvre Sanem',
    country: 'Luxembourg',
    full: "7 Pl. de l'Indépendance, 4418 Soleuvre Sanem, Luxembourg",
  },

  /** Contacto geral */
  contact: {
    email: 'info@voltmax.lu',
    /** Telefone principal (contact page) */
    phone: '+352 26 33 86',
    /** Alternativa móvel */
    phoneMobile: '+352 661 770 871',
  },

  /** Dados legais (Impressum) */
  legal: {
    register: 'B270450',
    identificalNumber: '2022 24 59185',
    vat: 'LU34874947',
    businessPermit: '10153228/2',
  },

  /** URLs oficiais */
  urls: {
    website: 'https://www.voltmax.lu',
    contact: 'https://voltmax.lu/contact/',
    impressum: 'https://voltmax.lu/impressum/',
    terms: 'https://voltmax.lu/terms-and-conditions/',
  },
} as const;

/**
 * Klimabonus (Luxembourg) – regimes oficiais (Guichet.lu, Klima-Agence).
 * Última verificação: fev 2026.
 *
 * Regime de transição: ofertas 1 out 2024 – 4 mar 2026, fatura até 31 dez 2026.
 * Autoconsumo: 50% do custo, máx. 1 250 €/kWp.
 *
 * Regime 2026: a partir de 5 jan 2026. Fórmula PV: PPV * (1155 - 1155/35 * PPV) €,
 * máx. 10 000 € a partir de 15 kWp. Bateria: QBat * (500 - 500/18 * QBat) €, máx. 2 250 € a 9 kWh.
 * Pré-financiamento disponível; instalações com tarifa de injecção garantida não são elegíveis.
 */
export const KLIMABONUS = {
  /** Simulador oficial de ajudas */
  simulatorUrl: 'https://aides.klima-agence.lu/',
  /** Calculador oficial PV pré-financiamento (fórmula 2026) */
  pvCalculatorUrl: 'https://guichet.public.lu/en/citoyens/outils/simulateur-photovoltaique.html',
  /** Explicação do período de transição */
  transitionInfoUrl: 'https://www.klima-agence.lu/en/understanding-transition-period-klimabonus-financial-subsidy-scheme-your-photovoltaic-installation',
  /** Pré-financiamento PV (regime 2026) */
  prefinancingUrl: 'https://guichet.public.lu/en/citoyens/aides/logement-construction/prefinancement-photovoltaique/prefinancement-installations-photovoltaiques.html',
  /** Regime de transição (ofertas até 4 mar 2026) */
  transition: {
    /** Autoconsumo / comunidade de energia: 50% do custo, máx. 1 250 €/kWp */
    selfConsumption: { rate: 0.5, maxPerKwp: 1250 },
    endDate: '2026-03-04',
  },
  /** Regime 2026 (ofertas a partir de 5 jan 2026). Fórmula: Guichet.lu aide-installations-techniques (Klimabonus 2026). */
  scheme2026: {
    /** PV: PPV * (1155 - 1155/35 * PPV) €, máx. 10 000 € para PPV >= 15 kWp */
    pvMaxEuros: 10_000,
    pvMaxKwp: 15,
    /** Coeficientes da fórmula PV (subsídio = PPV * (a - a/35 * PPV)) */
    pvFormula: { a: 1155 },
    /** Bateria: QBat * (500 - 500/18 * QBat) €, máx. 2 250 € a 9 kWh */
    batteryMaxEuros: 2_250,
    batteryMaxKwh: 9,
    startDate: '2026-01-05',
  },
} as const;
