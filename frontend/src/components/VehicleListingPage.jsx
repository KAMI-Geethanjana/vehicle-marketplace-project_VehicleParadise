import React, { useState } from 'react';
import { Heart, Filter, Check, Tag } from 'lucide-react';

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
  
  // New AutoScout24 Advanced Filters
  const [fuelType, setFuelType] = useState('Any');
  const [transmission, setTransmission] = useState('Any');
  const [bodyType, setBodyType] = useState('Any');
  const [sellerType, setSellerType] = useState('Any');
  
  // Mobile filter toggle
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

    if (yearRange) {
      const parts = yearRange.split(/[-—]/);
      if (parts.length === 2) {
        const minY = parseInt(parts[0].trim(), 10);
        const maxY = parseInt(parts[1].trim(), 10);
        if (!isNaN(minY) && v.year < minY) return false;
        if (!isNaN(maxY) && v.year > maxY) return false;
      } else if (parts.length === 1) {
        const exactY = parseInt(parts[0].trim(), 10);
        if (!isNaN(exactY) && v.year !== exactY) return false;
      }
    }

    if (fuelType !== 'Any' && v.fuel !== fuelType) return false;
    if (transmission !== 'Any' && v.transmission !== transmission) return false;
    if (bodyType !== 'Any' && v.bodyType !== bodyType) return false;
    if (sellerType !== 'Any') {
      if (sellerType === 'Dealer' && !v.sellerType.toLowerCase().includes('dealer')) return false;
      if (sellerType === 'Private' && !v.sellerType.toLowerCase().includes('private')) return false;
    }

    return true;
  });

  const getPriceRatingColor = (rating) => {
    switch (rating) {
      case 'Super Price': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Good Price': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'Fair Price': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'High Price': return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header & Mobile Filter Toggle */}
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="font-outfit font-black text-3xl text-slate-900 dark:text-white">
            Vehicle Listing
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {filteredVehicles.length} vehicles available
          </p>
        </div>
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg font-bold text-sm shadow-md"
        >
          <Filter className="w-4 h-4" />
          {isFilterOpen ? 'Close Filters' : 'Filters'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Filters */}
        <aside className={`lg:col-span-3 bg-white dark:bg-dark-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm relative overflow-hidden ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="font-outfit font-black text-lg text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
              <Filter className="w-5 h-5 text-amber-500" />
              Advanced Filters
            </h2>
          </div>

          <div className="space-y-6 text-sm">
            {/* Make / model */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider">Make</label>
              <select
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
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
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
              >
                <option value="All locations">All locations</option>
                <option value="Colombo">Colombo</option>
                <option value="Kandy">Kandy</option>
                <option value="Galle">Galle</option>
                <option value="Kurunegala">Kurunegala</option>
              </select>
            </div>

            {/* Price inputs */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider">Price Range (Rs.)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 text-sm"
                />
                <span className="text-slate-400 font-medium">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>
            </div>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Fuel Type */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider">Fuel Type</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 text-sm"
              >
                <option value="Any">Any Fuel</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Transmission */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider">Transmission</label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 text-sm"
              >
                <option value="Any">Any Transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            {/* Body Type */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider">Body Type</label>
              <select
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 text-sm"
              >
                <option value="Any">Any Body Type</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Motorcycle">Motorcycle</option>
              </select>
            </div>

            {/* Seller Type */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider">Seller Type</label>
              <select
                value={sellerType}
                onChange={(e) => setSellerType(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 text-sm"
              >
                <option value="Any">All Sellers</option>
                <option value="Dealer">Dealer only</option>
                <option value="Private">Private seller only</option>
              </select>
            </div>

            {/* Condition pills */}
            <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="block text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider">Condition</label>
              <div className="flex gap-2 p-1 bg-slate-100 dark:bg-dark-950 rounded-lg border border-slate-200 dark:border-slate-800 shadow-inner">
                {['Any', 'Used', 'New'].map((cond) => (
                  <button
                    key={cond}
                    onClick={() => setCondition(cond)}
                    className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all duration-300 ${
                      condition === cond
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => { if(window.innerWidth < 1024) setIsFilterOpen(false) }}
              className="w-full py-3 mt-4 bg-slate-900 dark:bg-slate-800 hover:bg-amber-500 text-white font-outfit font-black rounded-lg text-sm transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              SHOW {filteredVehicles.length} RESULTS
            </button>

          </div>
        </aside>

        {/* Right Vehicles Grid */}
        <main className="lg:col-span-9 space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-dark-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="font-medium">{filteredVehicles.length} results found</span>
            <span>Sort by: <strong className="text-slate-800 dark:text-slate-200">Relevance</strong></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredVehicles.map((v) => {
              const isSaved = favorites.includes(v.id);
              return (
                <div
                  key={v.id}
                  className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 rounded-xl overflow-hidden shadow-sm transition-all flex flex-col justify-between group cursor-pointer"
                  onClick={() => onSelectVehicle(v)}
                >
                  <div>
                    <div className="relative aspect-[4/3] bg-slate-100 dark:bg-dark-950 overflow-hidden">
                      <img 
                        src={v.image} 
                        alt={v.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      
                      {/* Price Rating Label (AutoScout24 inspired) */}
                      {v.priceRating && (
                        <div className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-md border backdrop-blur-md flex items-center gap-1 uppercase tracking-wide ${getPriceRatingColor(v.priceRating)}`}>
                          <Tag className="w-3 h-3" />
                          {v.priceRating}
                        </div>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(v.id);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-amber-500 transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="font-outfit font-bold text-slate-900 dark:text-white text-base leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 line-clamp-1">
                        {v.make} {v.model}
                      </h3>
                      <div className="text-xl font-black text-slate-900 dark:text-white">
                        {v.priceDisplay}
                      </div>
                      
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-600 dark:text-slate-400 font-medium mt-2">
                        <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-slate-400"></span>{v.year}</span>
                        <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-slate-400"></span>{v.mileage}</span>
                        <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-slate-400"></span>{v.fuel}</span>
                        <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-slate-400"></span>{v.transmission}</span>
                      </div>
                      
                      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{v.sellerType}</span>
                        <span className="text-slate-500 dark:text-slate-400">{v.location}</span>
                      </div>
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
