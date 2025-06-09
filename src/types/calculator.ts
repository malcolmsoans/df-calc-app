export type AgeCategory = 'puppy-young' | 'puppy-old' | 'adult' | 'senior';
export type ActivityLevel = 'low' | 'moderate' | 'high';
export type WeightUnit = 'kg' | 'lbs';
export type OutputUnit = 'g' | 'kg' | 'oz' | 'lbs' | 'cups';
export type CaloryUnit = 'kcal/kg' | 'kcal/lb';
export type DogSize = 'toy' | 'small' | 'medium' | 'large' | 'giant' | 'unsure';
export type BodyConditionScore = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export interface DogBreed {
  name: string;
  size: DogSize;
  weightRange: {
    min: number;
    max: number;
  };
}

export interface DogFoodCalculatorInputs {
  weight: number;
  weightUnit: WeightUnit;
  ageCategory: AgeCategory;
  activityLevel: ActivityLevel;
  caloriesDensity?: number;
  caloriesUnit?: CaloryUnit;
  outputUnit: OutputUnit;
  dogSize: DogSize;
  bodyConditionScore: BodyConditionScore;
  breed?: string;
}

export interface CalculationResult {
  rer: number;
  mer: number;
  recommendedAmount: number;
  weightInKg: number;
  adjustedAmount: number;
}