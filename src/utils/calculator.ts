import { AgeCategory, ActivityLevel, DogFoodCalculatorInputs, CalculationResult, BodyConditionScore } from '../types/calculator';

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  low: 1.2,
  moderate: 1.6,
  high: 2.0,
};

const AGE_MULTIPLIERS: Record<AgeCategory, number> = {
  'puppy-young': 3.0,
  'puppy-old': 2.0,
  adult: 1.0, // Will be modified by activity level
  senior: 1.0,
};

const SIZE_MULTIPLIERS = {
  toy: 1.1,
  small: 1.0,
  medium: 0.9,
  large: 0.8,
  giant: 0.7,
  unsure: 1.0,
};

const BCS_ADJUSTMENTS: Record<BodyConditionScore, number> = {
  '1': 1.4, // Severely underweight
  '2': 1.3,
  '3': 1.2,
  '4': 1.1,
  '5': 1.0, // Ideal
  '6': 0.9,
  '7': 0.8,
  '8': 0.7,
  '9': 0.6, // Severely overweight
};

const UNIT_CONVERSIONS = {
  kgToLbs: 2.20462,
  lbsToG: 453.592,
  ozToG: 28.3495,
  cupsToOz: 8,
};

export function calculateRER(weightInKg: number): number {
  return 70 * Math.pow(weightInKg, 0.75);
}

export function convertWeight(weight: number, fromUnit: 'kg' | 'lbs'): number {
  if (!weight || isNaN(weight)) return 0;
  return fromUnit === 'kg' ? weight : weight / UNIT_CONVERSIONS.kgToLbs;
}

export function convertOutput(grams: number, unit: string): number {
  if (!grams || isNaN(grams)) return 0;
  
  switch (unit) {
    case 'g':
      return grams;
    case 'kg':
      return grams / 1000;
    case 'oz':
      return grams / UNIT_CONVERSIONS.ozToG;
    case 'lbs':
      return grams / (UNIT_CONVERSIONS.lbsToG * UNIT_CONVERSIONS.kgToLbs);
    case 'cups':
      return grams / (UNIT_CONVERSIONS.ozToG * UNIT_CONVERSIONS.cupsToOz);
    default:
      return grams;
  }
}

export function calculateDogFood(inputs: DogFoodCalculatorInputs): CalculationResult {
  const weightInKg = convertWeight(inputs.weight, inputs.weightUnit);
  
  if (!weightInKg || isNaN(weightInKg)) {
    return {
      rer: 0,
      mer: 0,
      recommendedAmount: 0,
      weightInKg: 0,
      adjustedAmount: 0,
    };
  }

  const rer = calculateRER(weightInKg);
  
  let multiplier = AGE_MULTIPLIERS[inputs.ageCategory];
  if (inputs.ageCategory === 'adult') {
    multiplier = ACTIVITY_MULTIPLIERS[inputs.activityLevel];
  }
  
  // Apply size multiplier
  multiplier *= SIZE_MULTIPLIERS[inputs.dogSize];
  
  const mer = rer * multiplier;
  
  let recommendedAmount = mer;
  if (inputs.caloriesDensity && inputs.caloriesUnit) {
    const caloriesPerGram = inputs.caloriesUnit === 'kcal/kg' 
      ? inputs.caloriesDensity / 1000
      : (inputs.caloriesDensity / UNIT_CONVERSIONS.kgToLbs) / 1000;
    
    recommendedAmount = convertOutput(mer / caloriesPerGram, inputs.outputUnit);
  }
  
  // Apply BCS adjustment
  const adjustedAmount = recommendedAmount * BCS_ADJUSTMENTS[inputs.bodyConditionScore];
  
  return {
    rer,
    mer,
    recommendedAmount,
    weightInKg,
    adjustedAmount,
  };
}