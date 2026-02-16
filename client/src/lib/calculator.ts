export interface SolarCalculation {
  systemSize: number; // kWp
  annualProduction: number; // kWh
  installationCost: number; // €
  subsidy: number; // €
  netCost: number; // €
  annualSavings: number; // €
  roi: number; // years
}

export interface QuoteInputs {
  propertyType: string;
  roofType: string;
  roofArea: number; // m2
  monthlyBill: number; // €
}

export function calculateSolar(inputs: QuoteInputs): SolarCalculation {
  const { roofArea, monthlyBill } = inputs;

  // System size recommended (kWp) = roof area × 0.15
  const systemSize = Math.round(roofArea * 0.15 * 10) / 10;

  // Estimated annual production (kWh) = kWp × 850
  const annualProduction = Math.round(systemSize * 850);

  // Installation cost (€) = kWp × 2200
  const installationCost = Math.round(systemSize * 2200);

  // Klimabonus subsidy (€) = installation cost × 50%
  // (max €1250/kWp, self-consumption mode 2025 rules)
  const maxSubsidyPerKwp = 1250;
  const maxTotalSubsidy = systemSize * maxSubsidyPerKwp;
  const percentageSubsidy = installationCost * 0.50;
  
  const subsidy = Math.round(Math.min(percentageSubsidy, maxTotalSubsidy));

  // Net cost after subsidy (€)
  const netCost = installationCost - subsidy;

  // Annual savings (€) = monthly bill × 0.45 × 12
  // Assuming ~45% bill reduction on average for typical self-consumption
  const annualSavings = Math.round(monthlyBill * 0.45 * 12);

  // ROI in years = net cost / annual savings
  const roi = annualSavings > 0 ? Math.round((netCost / annualSavings) * 10) / 10 : 0;

  return {
    systemSize,
    annualProduction,
    installationCost,
    subsidy,
    netCost,
    annualSavings,
    roi
  };
}
