import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';

export default function FavoritesPage({ 
  vehicles, 
  favorites, 
  onSelectVehicle, 
  onNavigateCompare 
}) {
  const favoriteVehicles = vehicles.filter(v => favorites.includes(v.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header (Wireframe 9) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-outfit font-black text-3xl text-slate-900 dark:text-white">
            Favorites
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Saved vehicles
          </p>
        </div>

        {favoriteVehicles.length > 1 && (
          <button
            onClick={onNavigateCompare}
            className="px-5 py-2.5 bg-slate-800 dark:bg-dark-700 hover:bg-slate-900 text-white font-outfit font-bold rounded-xl text-xs shadow-sm flex items-center gap-2"
          >
            <span>Compare selected</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {favoriteVehicles.length === 0 ? (
        <div className="text-center py-16 bg-slate-100 dark:bg-dark-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 space-y-3">
          <Heart className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-outfit font-bold text-lg text-slate-700 dark:text-slate-300">
            No Saved Favorites Yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click the heart icon on any vehicle card to save it to your favorites.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteVehicles.map(v => (
            <div
              key={v.id}
              onClick={() => onSelectVehicle(v)}
              className="cursor-pointer bg-white dark:bg-dark-800 border border-slate-200 dark:border-slate-800 hover:border-amber-500 rounded-2xl overflow-hidden shadow-sm transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] bg-slate-100 dark:bg-dark-900">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                  
                  {/* Heart icon on top right (Wireframe 9) */}
                  <div className="absolute top-3 right-3">
                    <Heart className="w-5 h-5 fill-amber-500 text-amber-500" />
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <h3 className="font-outfit font-bold text-slate-900 dark:text-white text-base">
                    {v.shortName}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    {v.priceDisplay} • {v.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
