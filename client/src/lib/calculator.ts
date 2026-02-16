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

export function calculateSolar(inputs: QuoteInputs): SolarCalculation {
  const { roofArea, monthlyBill, klimabonusScheme = '2026' } = inputs;

  // System size recommended (kWp) = roof area × 0.15
  const systemSize = Math.round(roofArea * 0.15 * 10) / 10;

  // Estimated annual production (kWh) = kWp × 850
  const annualProduction = Math.round(systemSize * 850);

  // Installation cost (€) = kWp × 2200
  const installationCost = Math.round(systemSize * 2200);

  let subsidy =
    klimabonusScheme === 'transition'
      ? subsidyTransition(systemSize, installationCost)
      : subsidy2026(systemSize);
  subsidy = Math.min(subsidy, installationCost);

  // Net cost after subsidy (€)
  const netCost = installationCost - subsidy;

  // Annual savings (€) = monthly bill × 0.45 × 12 (~45% reduction, self-consumption)
  const annualSavings = Math.round(monthlyBill * 0.45 * 12);

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
