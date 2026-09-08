import React, { useState } from 'react';
import { Heart, Filter, Check } from 'lucide-react';

export default function VehicleListingPage({ 
  vehicles, 
  onSelectVehicle, 
  favorites, 
  onToggleFavorite,
  initialFilters = {} 
}) {
  const [selectedMake, setSelectedMake] = useState(initialFilters.searchMake || 'All makes');
  const [selectedLocation, setSelectedLocation] = useState(initialFilters.searchLocation || 'All locations');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [condition, setCondition] = useState('Any');
  const [yearRange, setYearRange] = useState('2015 — 2025');

  // Filter application
  const filteredVehicles = vehicles.filter((v) => {
    if (selectedMake !== 'All makes' && !v.make.toLowerCase().includes(selectedMake.toLowerCase()) && !v.name.toLowerCase().includes(selectedMake.toLowerCase())) {
      return false;
    }
    if (selectedLocation !== 'All locations' && v.location !== selectedLocation) {
      return false;
    }
    if (condition !== 'Any' && v.condition !== condition) {
      return false;
    }
    if (minPrice && v.price < parseInt(minPrice)) return false;
    if (maxPrice && v.price > parseInt(maxPrice)) return false;

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="font-outfit font-black text-3xl text-slate-900 dark:text-white">
          Vehicle Listing
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {filteredVehicles.length} vehicles available
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Filters (Wireframe 2) */}
        <aside className="lg:col-span-4 bg-white/50 dark:bg-dark-900/40 backdrop-blur-xl p-7 rounded-3xl border border-slate-200/60 dark:border-slate-700/50 space-y-7 shadow-xl shadow-slate-200/20 dark:shadow-black/40 relative overflow-hidden">
          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>

          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700/50 pb-4 relative z-10">
            <h2 className="font-outfit font-black text-lg text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
              <div className="p-1.5 bg-amber-500 rounded-lg text-white shadow-md shadow-amber-500/30">
                <Filter className="w-4 h-4" />
              </div>
              Filters
            </h2>
          </div>

          <div className="space-y-6 text-sm relative z-10">
            
            {/* Make / model */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider">Make / Model</label>
              <div className="relative">
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-white dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none shadow-sm transition-shadow hover:shadow-md cursor-pointer"
                >
                  <option value="All makes">All makes</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="BMW">BMW</option>
                  <option value="Nissan">Nissan</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="Yamaha">Yamaha</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider">Location</label>
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-white dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none shadow-sm transition-shadow hover:shadow-md cursor-pointer"
                >
                  <option value="All locations">All locations</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Galle">Galle</option>
                  <option value="Kurunegala">Kurunegala</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Price inputs */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider">Price Range (Rs.)</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Min price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm transition-shadow hover:shadow-md"
                />
                <span className="text-slate-400 font-medium">-</span>
                <input
                  type="number"
                  placeholder="Max price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm transition-shadow hover:shadow-md"
                />
              </div>
            </div>

            {/* Condition pills */}
            <div className="space-y-2.5">
              <label className="block text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider">Condition</label>
              <div className="flex gap-2 p-1 bg-slate-100 dark:bg-dark-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
                {['Any', 'Used', 'New'].map((cond) => (
                  <button
                    key={cond}
                    onClick={() => setCondition(cond)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                      condition === cond
                        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/40 transform scale-[1.02]'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-dark-800'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Range */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider">Year</label>
              <input
                type="text"
                value={yearRange}
                onChange={(e) => setYearRange(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm transition-shadow hover:shadow-md"
              />
            </div>

            {/* Apply filters button */}
            <button
              onClick={() => {}}
              className="w-full py-4 mt-4 bg-slate-900 dark:bg-slate-800 hover:bg-amber-500 text-white hover:text-slate-900 font-outfit font-black rounded-xl text-sm shadow-xl hover:shadow-amber-500/30 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Check className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              APPLY FILTERS
            </button>

          </div>
        </aside>

        {/* Right Vehicles Grid (Wireframe 2) */}
        <main className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
            <span>Sort by: <strong className="text-slate-800 dark:text-slate-200">Newest listed</strong></span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredVehicles.map((v) => {
              const isSaved = favorites.includes(v.id);
              return (
                <div
                  key={v.id}
                  className="bg-white dark:bg-dark-800 border border-slate-200 dark:border-slate-800 hover:border-amber-500 rounded-2xl overflow-hidden shadow-sm transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-slate-100 dark:bg-dark-900">
                      <img 
                        src={v.image} 
                        alt={v.name} 
                        className="w-full h-full object-cover cursor-pointer" 
                        onClick={() => onSelectVehicle(v)}
                      />
                      
                      {/* Save button (Wireframe 2) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(v.id);
                        }}
                        className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-1 hover:text-amber-500"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                        <span>{isSaved ? 'Saved' : 'Save'}</span>
                      </button>
                    </div>

                    <div className="p-4 space-y-1 cursor-pointer" onClick={() => onSelectVehicle(v)}>
                      <h3 className="font-outfit font-bold text-slate-900 dark:text-white text-base group-hover:text-amber-600 dark:group-hover:text-amber-400">
                        {v.shortName}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        {v.priceDisplay} • {v.location}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

      </div>

    </div>
  );
}
