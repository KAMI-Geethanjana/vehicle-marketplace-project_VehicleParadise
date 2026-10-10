import React, { useState, useEffect } from 'react';
import Hero from './Hero';

export default function HomePage({ vehicles, onSelectVehicle, onSelectCategory, onNavigateBrowse }) {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/ads');
        if (res.ok) {
          const data = await res.json();
          setAds(data);
        }
      } catch (error) {
        console.error('Error fetching ads', error);
      }
    };
    fetchAds();
  }, []);

  const categories = [
    { name: 'Cars', icon: 'bi-car-front-fill' },
    { name: 'SUVs', icon: 'bi-shield-shaded' },
    { name: 'Vans', icon: 'bi-truck-front-fill' },
    { name: 'Motorcycles', icon: 'bi-bicycle' },
    { name: 'Electric', icon: 'bi-lightning-charge-fill' },
    { name: 'Commercial', icon: 'bi-box-seam-fill' }
  ];

  const featuredVehicles = vehicles.filter(v => v.verified).slice(0, 4);

  return (
    <div className="w-full">
      
      {/* Advanced Hero Section */}
      <Hero 
        onExploreClick={(filters) => onNavigateBrowse(filters || {})} 
        onQuickReserve={() => onNavigateBrowse({})} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

      {/* Ads Banner Section */}
      {ads.length > 0 && (
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ads.map(ad => (
              <a key={ad.id} href={ad.link} target="_blank" rel="noopener noreferrer" className="block relative group overflow-hidden rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="aspect-[21/9] bg-slate-200 dark:bg-dark-800">
                  <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  AD
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-bold truncate">{ad.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}


      {/* Popular Categories Grid */}
      <section className="space-y-6">
        <h2 className="font-outfit font-bold text-2xl text-slate-900 dark:text-white">
          Popular categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div 
              key={cat.name} 
              onClick={() => onSelectCategory(cat.name)}
              className="bg-slate-100 dark:bg-dark-800 hover:bg-amber-50 dark:hover:bg-amber-500/10 border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-500/50 rounded-2xl p-6 text-center cursor-pointer transition-all shadow-sm hover:shadow-md group"
            >
              <i className={`bi ${cat.icon} text-3xl text-slate-500 dark:text-slate-400 group-hover:text-amber-500 transition-colors block mb-3`}></i>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Vehicles Grid */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <h2 className="font-outfit font-bold text-2xl text-slate-900 dark:text-white">
            Featured vehicles
          </h2>
          <button 
            onClick={() => onNavigateBrowse({})}
            className="text-amber-600 dark:text-amber-500 font-bold text-sm hover:underline"
          >
            View all listing &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVehicles.map((v) => (
            <div 
              key={v.id} 
              onClick={() => onSelectVehicle(v)}
              className="bg-white dark:bg-dark-800 border border-slate-200 dark:border-slate-800 hover:border-amber-500 rounded-2xl overflow-hidden shadow-sm transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/10] bg-slate-100 dark:bg-dark-900 overflow-hidden">
                  <img 
                    src={v.image} 
                    alt={v.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>

                <div className="p-5 space-y-1">
                  <h3 className="font-outfit font-bold text-slate-900 dark:text-white text-lg group-hover:text-amber-600 dark:group-hover:text-amber-400 line-clamp-1">
                    {v.shortName}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {v.priceDisplay} • {v.location}
                  </p>
                </div>
              </div>
              
              {v.verified && (
                <div className="px-5 pb-5 mt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-dark-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-600">
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Verified
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      </div>
    </div>
  );
}
