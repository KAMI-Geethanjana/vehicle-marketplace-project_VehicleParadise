import React, { useState } from 'react';
import { Heart, Filter, Check, Tag, ShoppingCart, Lock, Search, X } from 'lucide-react';

export default function VehicleListingPage({ 
  vehicles, 
  onSelectVehicle, 
  favorites = [], 
  onToggleFavorite,
  onAddToCart,
  cart = [],
  initialFilters = {} 
}) {
  const [searchKeyword, setSearchKeyword] = useState(initialFilters.searchKeyword || '');
  const [selectedMake, setSelectedMake] = useState(initialFilters.searchMake || 'All makes');
  const [selectedLocation, setSelectedLocation] = useState(initialFilters.searchLocation || 'All locations');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [condition, setCondition] = useState('Any');
  const [yearRange, setYearRange] = useState('2015 — 2025');
  const [hideReserved, setHideReserved] = useState(false);
  
  // New AutoScout24 Advanced Filters
  const [fuelType, setFuelType] = useState('Any');
  const [transmission, setTransmission] = useState('Any');
  const [bodyType, setBodyType] = useState('Any');
  const [sellerType, setSellerType] = useState('Any');
  
  // Mobile filter toggle
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter application
  const filteredVehicles = vehicles.filter((v) => {
    // Keyword search filter (Search by make, model, name, location, category, fuel)
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase().trim();
      const matchName = v.name?.toLowerCase().includes(q);
      const matchMake = v.make?.toLowerCase().includes(q);
      const matchModel = v.model?.toLowerCase().includes(q);
      const matchLocation = v.location?.toLowerCase().includes(q);
      const matchCategory = v.category?.toLowerCase().includes(q);
      const matchFuel = v.fuel?.toLowerCase().includes(q);
      if (!matchName && !matchMake && !matchModel && !matchLocation && !matchCategory && !matchFuel) {
        return false;
      }
    }

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
    if (hideReserved && (v.isReserved || v.status === 'Reserved')) return false;

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
            {/* Search Keyword */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider">Search Keyword</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Prius, Vezel, Kandy..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                />
                {searchKeyword && (
                  <button
                    onClick={() => setSearchKeyword('')}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

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

            {/* Hide Reserved Vehicles Checkbox */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={hideReserved}
                  onChange={(e) => setHideReserved(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 accent-amber-500"
                />
                <span>Hide Reserved Vehicles</span>
              </label>
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
          
          {/* Prominent Search Bar (Guideline: Search Functionality) */}
          <div className="relative bg-white dark:bg-dark-900 p-2 sm:p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <div className="pl-3 text-amber-500">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text"
              placeholder="Search vehicles by make, model, name, or keyword (e.g. Toyota, Prius, Vezel, Colombo, Hybrid)..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full bg-transparent border-0 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-0 min-h-[44px]"
            />
            {searchKeyword && (
              <button 
                onClick={() => setSearchKeyword('')}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full cursor-pointer mr-1"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button 
              className="hidden sm:flex px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs shadow-md shrink-0 cursor-pointer"
            >
              Search
            </button>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-dark-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="font-medium">
              {filteredVehicles.length} results found {searchKeyword && <span>for "<strong>{searchKeyword}</strong>"</span>}
            </span>
            <span>Sort by: <strong className="text-slate-800 dark:text-slate-200">Relevance</strong></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredVehicles.map((v) => {
              const isSaved = favorites.includes(v.id);
              const isItemReserved = v.isReserved || v.status === 'Reserved';
              return (
                <div
                  key={v.id}
                  className={`bg-white dark:bg-dark-900 border ${isItemReserved ? 'border-rose-400 dark:border-rose-800/80 shadow-rose-500/5' : 'border-slate-200 dark:border-slate-800 hover:border-amber-500'} rounded-xl overflow-hidden shadow-sm transition-all flex flex-col justify-between group cursor-pointer`}
                  onClick={() => onSelectVehicle(v)}
                >
                  <div>
                    <div className="relative aspect-[4/3] bg-slate-100 dark:bg-dark-950 overflow-hidden">
                      <img 
                        src={v.image} 
                        alt={v.name} 
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isItemReserved ? 'saturate-90' : ''}`} 
                      />
                      
                      {/* Reserved Badge or Price Rating Label */}
                      {isItemReserved ? (
                        <div className="absolute top-3 left-3 bg-rose-600/95 text-white text-[11px] font-black uppercase px-2.5 py-1 rounded-md shadow-lg backdrop-blur-md flex items-center gap-1.5 border border-rose-400/50 tracking-wider z-10">
                          <Lock className="w-3.5 h-3.5 text-white" />
                          RESERVED
                        </div>
                      ) : v.priceRating ? (
                        <div className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-md border backdrop-blur-md flex items-center gap-1 uppercase tracking-wide ${getPriceRatingColor(v.priceRating)}`}>
                          <Tag className="w-3 h-3" />
                          {v.priceRating}
                        </div>
                      ) : null}

                      {/* Favorite and Quick Cart Buttons */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                        <button
                          type="button"
                          disabled={isItemReserved}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isItemReserved && onAddToCart) onAddToCart(v);
                          }}
                          className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                            isItemReserved
                              ? 'bg-slate-200/80 dark:bg-dark-800/80 text-slate-400 border-slate-300 dark:border-slate-700 cursor-not-allowed opacity-60'
                              : Array.isArray(cart) && cart.some(c => c.id === v.id)
                                ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                                : 'bg-white/90 dark:bg-dark-900/90 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-amber-500 hover:bg-white'
                          }`}
                          title={isItemReserved ? 'Vehicle is Reserved' : (Array.isArray(cart) && cart.some(c => c.id === v.id) ? 'In Cart' : 'Add to Cart')}
                          aria-label="Add to cart"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(v.id);
                          }}
                          className="p-2 rounded-full bg-white/90 dark:bg-dark-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-rose-500 transition-colors"
                          title="Save to favorites"
                          aria-label="Save to favorites"
                        >
                          <Heart className={`w-4 h-4 ${Array.isArray(favorites) && favorites.includes(v.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-outfit font-bold text-slate-900 dark:text-white text-base leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 line-clamp-1">
                          {v.make} {v.model}
                        </h3>
                        {isItemReserved && (
                          <span className="shrink-0 text-[10px] font-black uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40">
                            Booked
                          </span>
                        )}
                      </div>
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
