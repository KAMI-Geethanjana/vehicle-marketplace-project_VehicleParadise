import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  const [activeTab, setActiveTab] = useState('Cars');

  const bodyTypes = [
    { name: 'Compact', icon: 'bi-car-front' },
    { name: 'SUV', icon: 'bi-shield-shaded' },
    { name: 'Transporter', icon: 'bi-truck' },
    { name: 'Convertible', icon: 'bi-brightness-high' },
    { name: 'Van', icon: 'bi-truck-flatbed' },
    { name: 'Sedan', icon: 'bi-car-front-fill' }
  ];

  const brands = [
    { name: 'Mercedes', url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
    { name: 'Volkswagen', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg' },
    { name: 'BMW', url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
    { name: 'Audi', url: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg' },
    { name: 'Ford', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Ford_Motor_Company_Logo.svg' },
    { name: 'Toyota', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg' }
  ];

  const [heroLocation, setHeroLocation] = useState('Sri Lanka');
  const [heroMake, setHeroMake] = useState('Makes and models');
  const [heroCity, setHeroCity] = useState('');

  const handleHeroSearch = () => {
    const filters = {};
    if (heroMake && heroMake !== 'Makes and models') {
      filters.searchMake = heroMake;
    }
    if (heroLocation && heroLocation !== 'Sri Lanka') {
      filters.searchLocation = heroLocation;
    } else if (heroCity.trim()) {
      filters.searchLocation = heroCity.trim();
    }
    onExploreClick(filters);
  };

  return (
    <div className="w-full relative pb-16 bg-slate-50 dark:bg-dark-950">
      
      {/* Full bleed Background */}
      <div className="relative w-full h-[400px] sm:h-[500px] overflow-hidden">
        <img 
          src="/hero_supercar.jpg" 
          alt="Hero Background" 
          className="w-full h-full object-cover brightness-75"
          style={{ animation: 'dynamicPan 10s ease-in-out infinite alternate' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
        
        {/* Headline */}
        <div className="absolute top-1/4 left-0 right-0 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-outfit font-black tracking-tight max-w-2xl drop-shadow-xl">
            Sri Lanka's largest <br/> car marketplace
          </h1>
        </div>
      </div>

      {/* Floating Search Card */}
      <div 
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 sm:-mt-24"
        style={{ animation: 'fadeInUp 0.8s ease-out 0.2s forwards', opacity: 0 }}
      >
        <div className="bg-white dark:bg-dark-900 rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
          
          {/* Tabs */}
          <div className="flex gap-6 border-b border-slate-200 dark:border-slate-800 pb-4 overflow-x-auto scrollbar-hide">
            {['Cars', 'Motorcycles', 'Commercial'].map(tab => (
              <button 
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  onExploreClick({ searchMake: tab === 'Cars' ? '' : tab });
                }}
                className={`text-sm font-bold pb-4 -mb-4 whitespace-nowrap transition-colors ${activeTab === tab ? 'text-slate-900 dark:text-white border-b-[3px] border-slate-900 dark:border-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-6">
            <div className="md:col-span-3">
              <select 
                value={heroLocation} 
                onChange={(e) => setHeroLocation(e.target.value)}
                className="w-full px-4 py-3.5 bg-white dark:bg-dark-950 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500 appearance-none shadow-sm cursor-pointer text-slate-900 dark:text-white"
              >
                <option value="Sri Lanka">All Sri Lanka</option>
                <option value="Colombo">Colombo</option>
                <option value="Kandy">Kandy</option>
                <option value="Galle">Galle</option>
                <option value="Kurunegala">Kurunegala</option>
              </select>
            </div>
            <div className="md:col-span-4">
              <select 
                value={heroMake} 
                onChange={(e) => setHeroMake(e.target.value)}
                className="w-full px-4 py-3.5 bg-white dark:bg-dark-950 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500 appearance-none shadow-sm cursor-pointer text-slate-900 dark:text-white"
              >
                <option value="Makes and models">All Makes and models</option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Nissan">Nissan</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes">Mercedes-Benz</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Yamaha">Yamaha</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <input 
                type="text" 
                placeholder="City/District" 
                value={heroCity}
                onChange={(e) => setHeroCity(e.target.value)}
                className="w-full px-4 py-3.5 bg-white dark:bg-dark-950 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 shadow-sm text-slate-900 dark:text-white placeholder-slate-400"
              />
            </div>
            <div className="md:col-span-3">
              <button 
                onClick={handleHeroSearch}
                className="w-full h-full py-3.5 bg-[#008880] hover:bg-[#007068] text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                Find Vehicles
              </button>
            </div>
          </div>

          <div className="text-right mt-3 mb-6">
            <button className="text-[#076fe6] text-sm font-bold hover:underline">
              Refine search
            </button>
          </div>

          {/* Body Types */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-6">Find used vehicles and new vehicles</p>
            <div className="flex flex-wrap gap-4 sm:gap-8 justify-between px-2">
              {bodyTypes.map(type => (
                <div key={type.name} onClick={() => onExploreClick({ searchMake: type.name })} className="flex flex-col items-center gap-2 cursor-pointer group w-16 sm:w-20">
                  <div className="w-16 h-10 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:scale-110 transition-transform">
                    <i className={`bi ${type.icon} text-4xl`}></i>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-400 text-center whitespace-nowrap">{type.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Popular Brands */}
      <div 
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-10"
        style={{ animation: 'fadeInUp 0.8s ease-out 0.4s forwards', opacity: 0 }}
      >
        <h2 className="text-2xl font-outfit font-black text-slate-900 dark:text-white mb-10 text-left">Popular Brands</h2>
        <div className="flex flex-wrap justify-between items-center gap-6">
          {brands.map(brand => (
            <div key={brand.name} onClick={() => onExploreClick({ searchMake: brand.name })} className="flex flex-col items-center gap-3 cursor-pointer group">
              <div className="w-20 h-20 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center bg-white shadow-sm group-hover:shadow-md transition-shadow overflow-hidden p-3">
                <img src={brand.url} alt={brand.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes dynamicPan {
          0% { transform: scale(1.05) translate(0, 0); filter: brightness(0.8); }
          50% { transform: scale(1.15) translate(-2%, 1%); filter: brightness(1.1); }
          100% { transform: scale(1.05) translate(2%, -1%); filter: brightness(0.8); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
