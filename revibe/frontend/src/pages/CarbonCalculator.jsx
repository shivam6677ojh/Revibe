import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function CarbonCalculator() {
  useScrollAnimation();
  
  const [transport, setTransport] = useState('car');
  const [distance, setDistance] = useState(10);
  const [food, setFood] = useState('mixed');
  const [reusable, setReusable] = useState(false);
  const [duration, setDuration] = useState(4);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const transportEmissions = {
      walk: 0,
      bike: 0,
      car: 0.2,
      carpool: 0.05,
      bus: 0.08,
      train: 0.04
    };
    
    const foodEmissions = {
      plantBased: 0.5,
      mixed: 1.5,
      meatHeavy: 3.0
    };

    const travelCO2 = (transportEmissions[transport] || 0) * distance * 2;
    const foodCO2 = (foodEmissions[food] || 0) * (duration / 4);
    const reusableBonus = reusable ? -0.5 : 0;
    
    const total = Math.max(0, travelCO2 + foodCO2 + reusableBonus);
    
    let rating = 'Low';
    if (total > 5) rating = 'High';
    else if (total > 2) rating = 'Medium';

    setResult({ total: total.toFixed(2), rating });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors py-12">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        <div className="text-center mb-12 animate-slide-down">
          <h1 className="text-5xl md:text-6xl font-black text-slate-800 dark:text-white mb-4">
            🌍 Carbon Calculator
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Estimate Your Festival Footprint
          </p>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Understand how your travel, food, and choices affect the environment.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 animate-on-scroll">
          
          {/* Transport */}
          <div className="mb-8 animate-on-scroll delay-100">
            <label className="block text-lg font-bold text-slate-800 dark:text-white mb-3">
              🚗 Mode of Transport
            </label>
            <select 
              value={transport} 
              onChange={(e) => setTransport(e.target.value)}
              className="w-full p-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white bg-white dark:bg-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 transition-all"
            >
              <option value="walk">🚶 Walk</option>
              <option value="bike">🚲 Bike</option>
              <option value="car">🚗 Car (solo)</option>
              <option value="carpool">🚙 Carpool</option>
              <option value="bus">🚌 Bus</option>
              <option value="train">🚆 Train</option>
            </select>
          </div>

          {/* Distance */}
          <div className="mb-8 animate-on-scroll delay-200">
            <label className="block text-lg font-bold text-slate-800 dark:text-white mb-3">
              📏 Distance to Event (km): {distance}
            </label>
            <input 
              type="range" 
              min="1" 
              max="200" 
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full h-3 bg-emerald-200 dark:bg-emerald-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Food */}
          <div className="mb-8 animate-on-scroll delay-300">
            <label className="block text-lg font-bold text-slate-800 dark:text-white mb-3">
              🍽️ Food Choices
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'plantBased', label: '🥗 Plant-based', color: 'emerald' },
                { value: 'mixed', label: '🍕 Mixed', color: 'yellow' },
                { value: 'meatHeavy', label: '🍖 Meat-heavy', color: 'red' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFood(opt.value)}
                  className={`p-4 rounded-xl font-semibold transition-all border-2 ${
                    food === opt.value 
                      ? `bg-${opt.color}-500 text-white border-${opt.color}-600 shadow-lg scale-105`
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-emerald-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reusables */}
          <div className="mb-8 animate-on-scroll delay-400">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={reusable}
                onChange={(e) => setReusable(e.target.checked)}
                className="w-6 h-6 accent-emerald-600"
              />
              <span className="text-lg font-bold text-slate-800 dark:text-white">
                ♻️ Bringing reusable items (bottle, utensils, bags)
              </span>
            </label>
          </div>

          {/* Duration */}
          <div className="mb-10 animate-on-scroll delay-500">
            <label className="block text-lg font-bold text-slate-800 dark:text-white mb-3">
              ⏱️ Time Spent at Event (hours): {duration}
            </label>
            <input 
              type="range" 
              min="1" 
              max="24" 
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full h-3 bg-cyan-200 dark:bg-cyan-700 rounded-lg appearance-none cursor-pointer accent-cyan-600"
            />
          </div>

          {/* Calculate Button */}
          <button 
            onClick={calculate}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-5 rounded-2xl text-xl font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all cursor-pointer"
          >
            🧮 Calculate My Carbon Impact
          </button>

          {/* Results */}
          {result && (
            <div className="mt-10 p-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl border-2 border-emerald-300 dark:border-emerald-600">
              <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4 text-center">
                Your Carbon Footprint
              </h3>
              <div className="text-center mb-6">
                <div className="text-6xl font-black text-emerald-700 dark:text-emerald-400">
                  {result.total} kg
                </div>
                <div className="text-2xl text-slate-600 dark:text-slate-300 mt-2">CO₂ Emissions</div>
                <div className={`inline-block mt-4 px-6 py-2 rounded-full text-lg font-bold ${
                  result.rating === 'Low' ? 'bg-green-500 text-white' :
                  result.rating === 'Medium' ? 'bg-yellow-500 text-white' :
                  'bg-red-500 text-white'
                }`}>
                  {result.rating} Impact
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl">
                <h4 className="font-bold text-slate-800 dark:text-white mb-3 text-lg">💡 Tips to Reduce:</h4>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li>✓ Carpool or cycle to the event</li>
                  <li>✓ Bring a reusable water bottle</li>
                  <li>✓ Choose plant-based meal options</li>
                  <li>✓ Dispose of waste correctly (recycle/compost)</li>
                </ul>
              </div>

              <div className="flex gap-4 mt-6">
                <button className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors cursor-pointer">
                  💾 Save This Impact
                </button>
                <button className="flex-1 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors cursor-pointer">
                  📋 Get Eco Tips
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
