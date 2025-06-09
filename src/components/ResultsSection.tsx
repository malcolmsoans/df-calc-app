import React, { useState } from 'react';
import { DogFoodCalculatorInputs, CalculationResult } from '../types/calculator';
import { Info } from 'lucide-react'; // Example: Icon for tooltips
import Tooltip from '@mui/material/Tooltip'; // Tooltips for descriptions

interface ResultsSectionProps {
  result: CalculationResult | null;
  inputs: DogFoodCalculatorInputs;
  darkMode: boolean;
}

export function ResultsSection({ result, inputs, darkMode }: ResultsSectionProps) {
  const [showTips, setShowTips] = useState(true);

  if (!result) {
    return (
      <div
        className={`${
          darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-900'
        } px-8 py-6 border-t ${
          darkMode ? 'border-gray-600' : 'border-gray-200'
        } rounded-lg`}
      >
        <h2
          className={`text-lg font-medium mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Results
        </h2>
        <p>No results to display. Please calculate to see the results.</p>
      </div>
    );
  }

  const formatNumber = (value: number | undefined | null, decimals: number = 1): string => {
    if (value === undefined || value === null || isNaN(value)) {
      return '0';
    }
    return Number(value).toFixed(decimals);
  };

  const getUnitLabel = () => {
    return inputs.caloriesDensity ? `${inputs.outputUnit}/day` : 'kcal/day';
  };

  const descriptions = {
    weight: 'The weight of your dog in kilograms.',
    rer: 'Resting Energy Requirement (RER) is the number of calories your dog needs to maintain basic bodily functions at rest.',
    mer: 'Maintenance Energy Requirement (MER) is the number of calories your dog needs based on their activity level.',
    recommendedAmount: 'The recommended daily food amount for your dog based on calorie density and weight.',
  };

  return (
    <div
      className={`${
        darkMode ? 'bg-gray-700' : 'bg-gray-50'
      } px-8 py-6 border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
    >
      <h2
        className={`text-lg font-medium mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Results
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Weight', value: `${formatNumber(result.weightInKg)} kg`, description: descriptions.weight },
          { label: 'RER', value: `${formatNumber(result.rer, 0)} kcal/day`, description: descriptions.rer },
          { label: 'MER', value: `${formatNumber(result.mer, 0)} kcal/day`, description: descriptions.mer },
          {
            label: 'Recommended Amount',
            value: `${formatNumber(result.adjustedAmount)} ${getUnitLabel()}`,
            description: descriptions.recommendedAmount,
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`${
              darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
            } p-4 rounded-lg shadow border flex items-center justify-between`}
          >
            <div>
              <div
                className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {item.label}
              </div>
              <div
                className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {item.value}
              </div>
            </div>
            <Tooltip title={item.description} arrow>
              <Info className="w-5 h-5 text-gray-400 cursor-pointer" />
            </Tooltip>
          </div>
        ))}
      </div>

      {/* Feeding Tips Section */}
      <div
        className={`${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } mt-6 p-4 rounded-lg shadow`}
      >
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowTips(!showTips)}
        >
          <h4
            className={`text-lg font-semibold ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Feeding Tips
          </h4>
          <span
            className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {showTips ? 'Hide' : 'Show'}
          </span>
        </div>
        {showTips && (
          <ul
            className={`text-md ${
              darkMode ? 'text-gray-200' : 'text-gray-900'
            } space-y-1 mt-2`}
          >
            <li>• Divide daily amount into 2-3 meals</li>
            <li>• Always provide fresh water</li>
            <li>• Transition to new foods gradually</li>
            <li>• Monitor weight and adjust as needed</li>
          </ul>
        )}
      </div>
    </div>
  );
}