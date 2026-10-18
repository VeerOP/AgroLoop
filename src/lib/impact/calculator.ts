// Centralized Impact Engine for AgroLoop
// All environmental and economic metrics are computed deterministically from these audited formulas.

export const IMPACT_CONSTANTS = {
  // 1 kg organic waste diverted from landfills avoids ~1.45 kg CO2e emissions (landfill methane offset)
  CO2E_PER_KG_WASTE: 1.45,
  
  // 1 kg Vermicompost / Bio-input saves farmers ~₹14.5 in chemical fertilizer expenditure & soil remediation
  FARMER_SAVINGS_PER_KG_INPUT: 14.50,
  
  // 1 Litre Liquid Bio-Fertiliser saves ~₹35 in synthetic liquid sprays
  FARMER_SAVINGS_PER_LITRE_LIQUID: 35.00,
  
  // Household points per kg diverted
  REWARD_POINTS_PER_KG: 10,
  
  // Trees equivalent metric: ~21.77 kg CO2 absorbed by one mature tree per year
  CO2_KG_PER_TREE_YEAR: 21.77,
};

export interface CalculatedImpact {
  totalWasteDivertedKg: number;
  totalWasteDivertedTonnes: number;
  totalCo2eAvoidedKg: number;
  totalCo2eAvoidedTonnes: number;
  totalFarmerSavingsInr: number;
  equivalentTreesPlanted: number;
  carbonCreditsEstimate: number;
}

export function calculateWasteImpact(wasteKg: number): { co2eKg: number; rewardPoints: number } {
  const safeKg = Math.max(0, wasteKg);
  return {
    co2eKg: Number((safeKg * IMPACT_CONSTANTS.CO2E_PER_KG_WASTE).toFixed(2)),
    rewardPoints: Math.round(safeKg * IMPACT_CONSTANTS.REWARD_POINTS_PER_KG),
  };
}

export function calculateFarmerSavings(productType: string, quantity: number): number {
  const safeQty = Math.max(0, quantity);
  if (productType.toLowerCase().includes('liquid') || productType.toLowerCase().includes('fertiliser')) {
    return Number((safeQty * IMPACT_CONSTANTS.FARMER_SAVINGS_PER_LITRE_LIQUID).toFixed(2));
  }
  return Number((safeQty * IMPACT_CONSTANTS.FARMER_SAVINGS_PER_KG_INPUT).toFixed(2));
}

export function calculateAggregateImpact(
  pickups: Array<{ actual_weight_kg?: number; estimated_weight_kg: number; status: string }>,
  orders: Array<{ items: Array<{ quantity: number; product_name?: string }>; status: string }>
): CalculatedImpact {
  // Sum waste from completed pickups
  const totalWasteDivertedKg = pickups
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + (p.actual_weight_kg ?? p.estimated_weight_kg ?? 0), 0);

  const totalCo2eAvoidedKg = totalWasteDivertedKg * IMPACT_CONSTANTS.CO2E_PER_KG_WASTE;

  // Sum savings from delivered/confirmed orders
  const totalFarmerSavingsInr = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((orderSum, order) => {
      const itemsSum = order.items.reduce((itemSum, item) => {
        return itemSum + calculateFarmerSavings(item.product_name ?? 'Vermicompost', item.quantity);
      }, 0);
      return orderSum + itemsSum;
    }, 0);

  const totalWasteDivertedTonnes = Number((totalWasteDivertedKg / 1000).toFixed(3));
  const totalCo2eAvoidedTonnes = Number((totalCo2eAvoidedKg / 1000).toFixed(3));
  const equivalentTreesPlanted = Math.round(totalCo2eAvoidedKg / IMPACT_CONSTANTS.CO2_KG_PER_TREE_YEAR);
  const carbonCreditsEstimate = Number((totalCo2eAvoidedTonnes).toFixed(2));

  return {
    totalWasteDivertedKg: Number(totalWasteDivertedKg.toFixed(1)),
    totalWasteDivertedTonnes,
    totalCo2eAvoidedKg: Number(totalCo2eAvoidedKg.toFixed(1)),
    totalCo2eAvoidedTonnes,
    totalFarmerSavingsInr: Math.round(totalFarmerSavingsInr),
    equivalentTreesPlanted,
    carbonCreditsEstimate,
  };
}
