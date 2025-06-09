/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Dog, Activity, Scale, Utensils, Moon, Sun } from 'lucide-react';
import { DogFoodCalculatorInputs, CalculationResult } from '../types/calculator';
import { calculateDogFood } from '../utils/calculator';
import { DOG_BREEDS } from '../utils/breeds';
import { ThemeToggle } from './ThemeToggle';
import { InputSection } from './InputSection';
import { ResultsSection } from './ResultsSection';


export default function Calculator() {
  const [inputs, setInputs] = useState<DogFoodCalculatorInputs>({
    weight: 27,
    weightUnit: 'kg',
    ageCategory: 'adult',
    activityLevel: 'moderate',
    outputUnit: 'cups',
    caloriesDensity: 3500,
    caloriesUnit: 'kcal/kg',
    dogSize: 'large',
    bodyConditionScore: '5',
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showOptional, setShowOptional] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));

    if (name === 'breed' && value) {
      const breed = DOG_BREEDS.find(b => b.name === value);
      if (breed) {
        setInputs(prev => ({ ...prev, dogSize: breed.size }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculationResult = calculateDogFood(inputs);
    setResult(calculationResult);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'
    } py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center flex-1">
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center justify-center gap-3`}>
              <Dog className="w-10 h-10 text-indigo-600" />
              Dog Food Calculator
            </h1>
            <p className={`mt-2 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Calculate the perfect amount of food for your furry friend
            </p>
          </div>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl overflow-hidden`}>
          <form onSubmit={handleSubmit}>
            <InputSection 
              inputs={inputs}
              handleInputChange={handleInputChange}
              showOptional={showOptional}
              setShowOptional={setShowOptional}
              darkMode={darkMode}
            />
            <ResultsSection 
              result={result}
              inputs={inputs}
              darkMode={darkMode}
            />
          </form>
        </div>
      </div>
    </div>
  );
}