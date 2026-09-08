import React from 'react';
import { Plus } from 'lucide-react';

export default function ComparePage({ vehicles, onAddMoreToCompare }) {
  // Use first 3 vehicles for comparison matrix
  const compareItems = vehicles.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header (Wireframe 10) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-outfit font-black text-3xl text-slate-900 dark:text-white">
            Vehicle Comparison
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Compare vehicles side by side
          </p>
        </div>

        <button
          onClick={onAddMoreToCompare}
          className="px-5 py-2.5 bg-slate-800 dark:bg-dark-700 hover:bg-slate-900 text-white font-outfit font-bold rounded-xl text-xs shadow-sm flex items-center gap-1.5"
        >
          <span>Add vehicle +</span>
        </button>
      </div>

      {/* Comparison Matrix Table (Wireframe 10) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          
          {/* Top Cards Header Row */}
          <thead>
            <tr>
              <th className="p-4 border-b border-slate-200 dark:border-slate-800 w-1/4"></th>
              {compareItems.map(item => (
                <th key={item.id} className="p-4 border-b border-slate-200 dark:border-slate-800 w-1/4 text-center">
                  <div className="bg-slate-100 dark:bg-dark-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-2">
                    <h3 className="font-outfit font-bold text-base text-slate-900 dark:text-white">
                      {item.shortName}
                    </h3>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Matrix Rows (Wireframe 10) */}
          <tbody className="text-xs">
            
            {/* Price */}
            <tr className="border-b border-slate-200 dark:border-slate-800/60">
              <td className="p-4 font-bold text-slate-500 dark:text-slate-400 uppercase">Price</td>
              {compareItems.map(item => (
                <td key={item.id} className="p-4 text-center font-outfit font-bold text-sm text-slate-900 dark:text-white">
                  {item.priceDisplay}
                </td>
              ))}
            </tr>

            {/* Year */}
            <tr className="border-b border-slate-200 dark:border-slate-800/60">
              <td className="p-4 font-bold text-slate-500 dark:text-slate-400 uppercase">Year</td>
              {compareItems.map(item => (
                <td key={item.id} className="p-4 text-center text-slate-700 dark:text-slate-300 font-medium">
                  {item.year}
                </td>
              ))}
            </tr>

            {/* Mileage */}
            <tr className="border-b border-slate-200 dark:border-slate-800/60">
              <td className="p-4 font-bold text-slate-500 dark:text-slate-400 uppercase">Mileage</td>
              {compareItems.map(item => (
                <td key={item.id} className="p-4 text-center text-slate-700 dark:text-slate-300 font-medium">
                  {item.mileage}
                </td>
              ))}
            </tr>

            {/* Fuel */}
            <tr className="border-b border-slate-200 dark:border-slate-800/60">
              <td className="p-4 font-bold text-slate-500 dark:text-slate-400 uppercase">Fuel</td>
              {compareItems.map(item => (
                <td key={item.id} className="p-4 text-center text-slate-700 dark:text-slate-300 font-medium">
                  {item.fuel}
                </td>
              ))}
            </tr>

            {/* Transmission */}
            <tr className="border-b border-slate-200 dark:border-slate-800/60">
              <td className="p-4 font-bold text-slate-500 dark:text-slate-400 uppercase">Transmission</td>
              {compareItems.map(item => (
                <td key={item.id} className="p-4 text-center text-slate-700 dark:text-slate-300 font-medium">
                  {item.transmission}
                </td>
              ))}
            </tr>

            {/* Seller Rating */}
            <tr className="border-b border-slate-200 dark:border-slate-800/60">
              <td className="p-4 font-bold text-slate-500 dark:text-slate-400 uppercase">Seller rating</td>
              {compareItems.map(item => (
                <td key={item.id} className="p-4 text-center text-amber-600 dark:text-amber-400 font-bold">
                  {item.sellerRating}
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
}
