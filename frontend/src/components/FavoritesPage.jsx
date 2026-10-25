import React, { useMemo } from 'react';
import { Heart, ArrowRight, Compass, Trash2, Fuel, Gauge, Calendar, MapPin } from 'lucide-react';

export default function FavoritesPage({ 
  vehicles = [], 
  favorites = [], 
  onToggleFavorite,
  onSelectVehicle, 
  onNavigateCompare,
  onNavigateBrowse
}) {
  // Safe extraction of favorite vehicles
  const favoriteVehicles = useMemo(() => {
    const safeVehicles = Array.isArray(vehicles) ? vehicles : [];
    const safeFavorites = Array.isArray(favorites) ? favorites : [];

    // If favorites prop itself already contains vehicle objects:
    if (safeFavorites.length > 0 && typeof safeFavorites[0] === 'object' && safeFavorites[0] !== null) {
      return safeFavorites;
    }

    // Filter vehicles by favorite IDs (supporting numeric and string IDs / MongoDB _id)
    return safeVehicles.filter(v => 
      safeFavorites.some(id => 
        String(id) === String(v.id) || (v._id && String(id) === String(v._id))
      )
    );
  }, [vehicles, favorites]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="font-outfit font-black text-3xl text-slate-900 dark:text-white">
              Favorites
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20 rounded-full">
              {favoriteVehicles.length} {favoriteVehicles.length === 1 ? 'vehicle' : 'vehicles'}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Saved vehicles you have bookmarked for quick access
          </p>
        </div>

        <div className="flex items-center gap-3">
          {favoriteVehicles.length > 1 && (
            <button
              onClick={onNavigateCompare}
              className="px-5 py-2.5 bg-slate-900 dark:bg-amber-500 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-amber-400 text-white font-outfit font-bold rounded-xl text-xs shadow-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Compare vehicles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {onNavigateBrowse && (
            <button
              onClick={onNavigateBrowse}
              className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-dark-800 text-slate-700 dark:text-slate-300 font-outfit font-medium rounded-xl text-xs flex items-center gap-2 transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Browse more</span>
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {favoriteVehicles.length === 0 ? (
        <div className="text-center py-20 bg-slate-50/50 dark:bg-dark-850 rounded-3xl p-8 border border-dashed border-slate-200 dark:border-slate-800 space-y-5 max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          
          <div className="space-y-1">
            <h3 className="font-outfit font-bold text-xl text-slate-800 dark:text-slate-100">
              No Saved Favorites Yet
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Tap the heart icon on any vehicle while browsing to keep track of cars you are interested in.
            </p>
          </div>

          {onNavigateBrowse && (
            <button
              onClick={onNavigateBrowse}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-outfit font-bold rounded-xl text-sm shadow-md transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Marketplace</span>
            </button>
          )}
        </div>
      ) : (
        /* Vehicles Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteVehicles.map(v => {
            const vehicleId = v.id || v._id;
            const displayName = v.shortName || v.name || `${v.make || ''} ${v.model || ''}`.trim() || 'Vehicle';
            const displayImage = v.image || (Array.isArray(v.images) ? v.images[0] : null) || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800';
            const displayPrice = v.priceDisplay || (v.price ? `$${Number(v.price).toLocaleString()}` : 'Price on request');

            return (
              <div
                key={vehicleId}
                onClick={() => onSelectVehicle && onSelectVehicle(v)}
                className="cursor-pointer group bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-100 dark:bg-dark-950 overflow-hidden">
                    <img 
                      src={displayImage} 
                      alt={displayName} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                    
                    {/* Remove from Favorites Button */}
                    <div className="absolute top-3 right-3 z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onToggleFavorite) onToggleFavorite(vehicleId);
                        }}
                        className="p-2 rounded-full bg-white/90 dark:bg-dark-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 shadow-md transition-all hover:scale-110 flex items-center justify-center"
                        title="Remove from favorites"
                        aria-label="Remove from favorites"
                      >
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                      </button>
                    </div>

                    {v.category && (
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white rounded-md">
                          {v.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-outfit font-bold text-slate-900 dark:text-white text-base line-clamp-1 group-hover:text-amber-500 transition-colors">
                        {displayName}
                      </h3>
                    </div>

                    <div className="font-outfit font-black text-xl text-amber-600 dark:text-amber-400">
                      {displayPrice}
                    </div>

                    {/* Metadata specs */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-1 border-t border-slate-100 dark:border-slate-800/80">
                      {v.year && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" /> {v.year}
                        </span>
                      )}
                      {v.mileage && (
                        <span className="flex items-center gap-1">
                          <Gauge className="w-3 h-3 text-slate-400" /> {v.mileage}
                        </span>
                      )}
                      {v.fuel && (
                        <span className="flex items-center gap-1">
                          <Fuel className="w-3 h-3 text-slate-400" /> {v.fuel}
                        </span>
                      )}
                      {v.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" /> {v.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-1">
                  <div className="w-full py-2 px-3 bg-slate-50 dark:bg-dark-800 group-hover:bg-amber-500/10 text-slate-700 dark:text-slate-300 group-hover:text-amber-500 text-xs font-semibold rounded-xl text-center transition-colors">
                    View Details & Specs →
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
