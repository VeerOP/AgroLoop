import { AdvisoryRequestInput, AdvisoryResponseOutput } from './schemas';

export function getFallbackAgronomistAdvice(input: AdvisoryRequestInput): AdvisoryResponseOutput {
  const cropLower = input.crop.toLowerCase();
  const questionLower = input.question.toLowerCase();

  let recommendedProduct = 'AgroLoop Organic Vermicompost (Bio-Enriched)';
  let recommendedQuantity = '500 kg per acre';
  let applicationMethod = 'Broadcasting along crop rows followed by light irrigation.';
  let timing = 'Basal application during land preparation before transplanting/sowing.';
  let reasoning = 'Enriches soil organic carbon, improves moisture retention, and supplies nitrogen and beneficial Azotobacter microbes essential for early root establishment.';

  if (cropLower.includes('tomato') || cropLower.includes('chilli') || cropLower.includes('brinjal')) {
    if (questionLower.includes('spray') || questionLower.includes('liquid') || questionLower.includes('leaf') || questionLower.includes('foliar')) {
      recommendedProduct = 'AgroLoop Fermented Plant Juice (Liquid Bio-Fertiliser)';
      recommendedQuantity = '2.5 Litres per acre (1:100 dilution in water)';
      applicationMethod = 'Foliar spray using knapsack sprayer, thoroughly wetting upper and lower leaf surfaces.';
      timing = 'Apply early morning (before 9 AM) every 14 days during flowering and fruit set stage.';
      reasoning = 'Rapidly delivers bio-available micro-nutrients and plant growth-promoting enzymes, boosting fruit set and resistance to early blight.';
    } else if (questionLower.includes('char') || questionLower.includes('carbon') || questionLower.includes('water') || questionLower.includes('drought')) {
      recommendedProduct = 'AgroLoop Biochar Soil Carbon Matrix';
      recommendedQuantity = '100 kg per acre mixed 1:4 with vermicompost';
      applicationMethod = 'Incorporate into raised planting beds at 15cm soil depth.';
      timing = 'Once per cropping season before transplanting seedlings.';
      reasoning = 'Permanently increases cation exchange capacity (CEC) and water holding capacity in black cotton/sandy soils, preventing nutrient leaching.';
    }
  } else if (cropLower.includes('onion') || cropLower.includes('garlic')) {
    recommendedProduct = 'AgroLoop Organic Vermicompost (Bio-Enriched)';
    recommendedQuantity = '750 kg per acre';
    applicationMethod = 'Soil incorporation in flat beds before seed bulb planting.';
    timing = 'At land preparation (0-10 days before planting).';
    reasoning = 'Provides balanced NPK and humic substance release, improving bulb size, pungency, and post-harvest shelf life.';
  } else if (questionLower.includes('scraps') || questionLower.includes('home') || questionLower.includes('compost') || questionLower.includes('bokashi')) {
    recommendedProduct = 'AgroLoop Bokashi Microbe Starter Mix';
    recommendedQuantity = '1 kg per 50 kg kitchen scraps';
    applicationMethod = 'Layer kitchen waste with 2 tablespoons of Bokashi powder in airtight bucket.';
    timing = 'Continuous during household/farm kitchen waste pre-digestion.';
    reasoning = 'Accelerates anaerobic digestion without foul odors, converting raw scraps into rich pre-compost in 14 days.';
  }

  return {
    crop: input.crop,
    farmSize: input.farmSize,
    recommendedProduct,
    recommendedQuantity,
    applicationMethod,
    timing,
    precautions: 'Wear gloves during application. Store bio-inputs in cool, shaded area away from direct sunlight. Do not mix liquid bio-fertilisers with chemical pesticides or fungicides.',
    reasoning,
    disclaimer: 'Advisory information is for prototype/educational use and should be validated with a qualified agronomist.',
  };
}
