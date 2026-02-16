export interface SolarCalculation {
  systemSize: number; // kWp
  annualProduction: number; // kWh
  installationCost: number; // €
  subsidy: number; // €
  netCost: number; // €
  annualSavings: number; // €
  roi: number; // years
  /** Regime Klimabonus usado no cálculo */
  klimabonusScheme: 'transition' | '2026';
}

export interface QuoteInputs {
  propertyType: string;
  roofType: string;
  roofArea: number; // m2
  monthlyBill: number; // €
  /** Regime Klimabonus: '2026' (padrão para ofertas a partir de 5 jan 2026) ou 'transition' (ofertas até 4 mar 2026) */
  klimabonusScheme?: 'transition' | '2026';
}

/**
 * Subsídio Klimabonus regime de transição (ofertas 1 out 2024 – 4 mar 2026).
 * Autoconsumo: 50% do custo, máx. 1 250 €/kWp. Ref: Klima-Agence.
 */
function subsidyTransition(systemSizeKwp: number, installationCost: number): number {
  const maxPerKwp = 1250;
  const maxTotal = systemSizeKwp * maxPerKwp;
  const percentageSubsidy = installationCost * 0.5;
  return Math.round(Math.min(percentageSubsidy, maxTotal));
}

/**
 * Subsídio Klimabonus regime 2026 (a partir de 5 jan 2026).
 * Fórmula oficial: PPV * (1155 - 1155/35 * PPV) €, máx. 10 000 € para PPV >= 15 kWp.
 * Ref: Guichet.lu – Aide financière Klimabonus 2026 (installations photovoltaïques).
 */
function subsidy2026(systemSizeKwp: number): number {
  const PPV = Math.round(systemSizeKwp * 100) / 100;
  const { a } = { a: 1155 };
  const raw = PPV * (a - (a / 35) * PPV);
  const capped = Math.min(10000, Math.max(0, raw));
  return Math.round(capped);
}

/** Typical usable power per m² roof (kWp/m²). ~150 Wp/m² conservative. */
const ROOF_AREA_TO_KWP = 0.15;
/** Luxembourg: PVGIS ~1000–1100 kWh/kWp; we use 900 for indicative estimate (no overclaim). */
const PRODUCTION_KWH_PER_KWP = 900;
/** Market Luxembourg: €2100–2300/kWp (renov.lu, ecoclima.lu). We use 2200. */
const COST_EUR_PER_KWP = 2200;
/** Approx. share of bill offset by self-consumption (typical household). */
const SAVINGS_BILL_RATIO = 0.45;

export function calculateSolar(inputs: QuoteInputs): SolarCalculation {
  const { roofArea, monthlyBill, klimabonusScheme = '2026' } = inputs;

  const systemSize = Math.round(roofArea * ROOF_AREA_TO_KWP * 10) / 10;
  const annualProduction = Math.round(systemSize * PRODUCTION_KWH_PER_KWP);
  const installationCost = Math.round(systemSize * COST_EUR_PER_KWP);

  let subsidy =
    klimabonusScheme === 'transition'
      ? subsidyTransition(systemSize, installationCost)
      : subsidy2026(systemSize);
  subsidy = Math.min(subsidy, installationCost);

  // Net cost after subsidy (€)
  const netCost = installationCost - subsidy;

  const annualSavings = Math.round(monthlyBill * SAVINGS_BILL_RATIO * 12);

  const roi = annualSavings > 0 ? Math.round((netCost / annualSavings) * 10) / 10 : 0;

  return {
    systemSize,
    annualProduction,
    installationCost,
    subsidy,
    netCost,
    annualSavings,
    roi,
    klimabonusScheme,
  };
}
