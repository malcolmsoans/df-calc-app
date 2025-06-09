import React, { useState } from 'react';
import { Utensils, Scale } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { DogFoodCalculatorInputs } from '../types/calculator';
import { DOG_BREEDS } from '../utils/breeds';

const AGE_OPTIONS = [
  { value: 'puppy-young', label: 'Puppy (0-4 months)' },
  { value: 'puppy-old', label: 'Puppy (4-12 months)' },
  { value: 'adult', label: 'Adult (1-7 years)' },
  { value: 'senior', label: 'Senior (7+ years)' },
];

const ACTIVITY_OPTIONS = [
  { value: 'low', label: 'Low (Sedentary)' },
  { value: 'moderate', label: 'Moderate (Normal)' },
  { value: 'high', label: 'High (Very Active)' },
];

const OUTPUT_UNITS = [
  { value: 'g', label: 'Grams (g)' },
  { value: 'kg', label: 'Kilograms (kg)' },
  { value: 'oz', label: 'Ounces (oz)' },
  { value: 'lbs', label: 'Pounds (lbs)' },
  { value: 'cups', label: 'Cups' },
];

const DOG_SIZES = [
  { value: 'toy', label: 'Toy (1-4 kg)' },
  { value: 'small', label: 'Small (4-10 kg)' },
  { value: 'medium', label: 'Medium (10-25 kg)' },
  { value: 'large', label: 'Large (25-45 kg)' },
  { value: 'giant', label: 'Giant (45+ kg)' },
  { value: 'unsure', label: 'Unsure (Select breed below)' },
];

const BCS_OPTIONS = [
  { value: '1', label: '1 - Severely Underweight' },
  { value: '2', label: '2 - Underweight' },
  { value: '3', label: '3 - Slightly Underweight' },
  { value: '4', label: '4 - Slightly Below Ideal' },
  { value: '5', label: '5 - Ideal' },
  { value: '6', label: '6 - Slightly Overweight' },
  { value: '7', label: '7 - Overweight' },
  { value: '8', label: '8 - Obese' },
  { value: '9', label: '9 - Severely Obese' },
];

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

interface InputSectionProps {
  inputs: DogFoodCalculatorInputs;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  showOptional: boolean;
  setShowOptional: (value: boolean) => void;
  darkMode: boolean;
}

export function InputSection({
  inputs,
  handleInputChange,
  showOptional,
  setShowOptional,
  darkMode,
}: InputSectionProps) {
  const baseInputClass = `block w-full rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
  }`;

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState<boolean>(false);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleRecaptchaError = () => {
    setRecaptchaError(true);
    setRecaptchaToken('error'); // Optional: Allow form submission
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
  };

  return (
    <div className="p-8">
      {/* Input Fields */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-6">
          {/* Dog's Weight */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Dog's Weight
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                name="weight"
                value={inputs.weight}
                onChange={handleInputChange}
                min="0.1"
                step="0.1"
                required
                className={baseInputClass}
              />
              <select
                name="weightUnit"
                value={inputs.weightUnit}
                onChange={handleInputChange}
                className={baseInputClass}
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
          </div>

          {/* Dog Size */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Dog Size
            </label>
            <select
              name="dogSize"
              value={inputs.dogSize}
              onChange={handleInputChange}
              className={baseInputClass}
            >
              {DOG_SIZES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Breed Selection */}
          {inputs.dogSize === 'unsure' && (
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Breed
              </label>
              <select
                name="breed"
                value={inputs.breed}
                onChange={handleInputChange}
                className={baseInputClass}
              >
                <option value="">Select a breed</option>
                {DOG_BREEDS.map((breed) => (
                  <option key={breed.name} value={breed.name}>
                    {breed.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Body Condition Score */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Body Condition Score
            </label>
            <select
              name="bodyConditionScore"
              value={inputs.bodyConditionScore}
              onChange={handleInputChange}
              className={baseInputClass}
            >
              {BCS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {/* Age Category */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Age Category
            </label>
            <select
              name="ageCategory"
              value={inputs.ageCategory}
              onChange={handleInputChange}
              className={baseInputClass}
            >
              {AGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Activity Level */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Activity Level
            </label>
            <select
              name="activityLevel"
              value={inputs.activityLevel}
              onChange={handleInputChange}
              className={baseInputClass}
            >
              {ACTIVITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Preferred Output Unit */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Preferred Output Unit
            </label>
            <select
              name="outputUnit"
              value={inputs.outputUnit}
              onChange={handleInputChange}
              className={baseInputClass}
            >
              {OUTPUT_UNITS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Optional Fields Toggle */}
          <div>
            <button
              type="button"
              onClick={() => setShowOptional(!showOptional)}
              className={`text-sm font-medium flex items-center gap-2 ${
                darkMode
                  ? 'text-indigo-400 hover:text-indigo-300'
                  : 'text-indigo-600 hover:text-indigo-500'
              }`}
            >
              {showOptional ? 'Hide' : 'Show'} Optional Fields
              <Utensils className="w-4 h-4" />
            </button>

            {showOptional && (
              <div className="mt-4 space-y-4">
                {/* Metabolizable Energy */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    Metabolizable Energy (ME)
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      name="caloriesDensity"
                      value={inputs.caloriesDensity}
                      onChange={handleInputChange}
                      min="1"
                      step="1"
                      className={baseInputClass}
                    />
                    <select
                      name="caloriesUnit"
                      value={inputs.caloriesUnit}
                      onChange={handleInputChange}
                      className={baseInputClass}
                    >
                      <option value="kcal/kg">kcal/kg</option>
                      <option value="kcal/lb">kcal/lb</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conditionally render reCAPTCHA widget */}
      {!recaptchaError && (
        <div className="flex justify-center my-6">
          <ReCAPTCHA
            sitekey={siteKey}
            onChange={handleRecaptchaChange}
            onErrored={handleRecaptchaError}
            onExpired={handleRecaptchaExpired}
          />
        </div>
      )}

      {/* Warning Message if reCAPTCHA Fails 
      {recaptchaError && (
        <p className={`mt-2 text-sm text-center ${darkMode ? 'text-red-300' : 'text-red-600'}`}>
          Warning: reCAPTCHA failed to load. Form submission may be less secure.
        </p>
      )}*/}

      {/* Calculate Button and Footer */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={!recaptchaToken && !recaptchaError}
          className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white md:py-4 md:text-lg md:px-10 ${
            darkMode ? 'bg-indigo-500 hover:bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          Calculate
          <Scale className="ml-2 w-5 h-5" />
        </button>
        <p className={`mt-2 text-sm text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <i>
            *This tool provides general feeding guidelines. Always consult your veterinarian for
            specific recommendations.
          </i>
        </p>
      </div>
    </div>
  );
}