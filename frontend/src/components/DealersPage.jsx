import React, { useState } from 'react';
import { Search, CheckCircle2, MessageSquare, Car } from 'lucide-react';
import { DEALERS } from '../data/vehicles';

export default function DealersPage({ onNavigateBrowse, onContactDealer }) {
  const [dealers, setDealers] = useState(DEALERS);
  const [selectedDealerId, setSelectedDealerId] = useState('d1');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedDealer = dealers.find(d => d.id === selectedDealerId) || dealers[0];

  const filteredDealers = dealers.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header (Wireframe 13) */}
      <h1 className="font-outfit font-black text-3xl text-slate-900 dark:text-white">
        Dealers & Dealer Profile
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Dealer Directory (Wireframe 13) */}
        <aside className="lg:col-span-4 bg-slate-100 dark:bg-dark-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
            <h2 className="font-outfit font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Dealer directory
            </h2>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Search dealers</label>
              <input
                type="text"
                placeholder="Name or city"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-slate-500 font-semibold uppercase text-[10px] block">Verified dealers</span>
              {filteredDealers.map(dealer => (
                <div
                  key={dealer.id}
                  onClick={() => setSelectedDealerId(dealer.id)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all border flex items-center justify-between ${
                    dealer.id === selectedDealerId
                      ? 'bg-white dark:bg-dark-900 border-slate-300 dark:border-slate-700 shadow-sm'
                      : 'border-transparent hover:bg-slate-200/50 dark:hover:bg-dark-700'
                  }`}
                >
                  <div>
                    <h3 className="font-outfit font-bold text-sm text-slate-900 dark:text-white">
                      {dealer.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {dealer.city} • {dealer.listingsCount} listings
                    </p>
                  </div>

                  {dealer.verified && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                      Verified
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Area Dealer Profile (Wireframe 13) */}
        <main className="lg:col-span-8 bg-white dark:bg-dark-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="font-outfit font-black text-2xl text-slate-900 dark:text-white">
                {selectedDealer.name}
              </h2>
              {selectedDealer.verified && (
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-300 dark:border-emerald-500/30">
                  Verified dealer
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {selectedDealer.city} | Established {selectedDealer.established}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-outfit font-bold text-sm text-slate-900 dark:text-white">About this dealer</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedDealer.description}
            </p>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 pt-2">
              {selectedDealer.listingsCount} active listings • {selectedDealer.rating} buyer rating
            </p>
          </div>

          {/* Buttons (Wireframe 13: View inventory [emerald button], Contact dealer [dark button]) */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onNavigateBrowse(selectedDealer.name)}
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-outfit font-bold rounded-xl text-xs shadow-sm flex items-center gap-2"
            >
              <Car className="w-4 h-4" />
              <span>View inventory</span>
            </button>

            <button
              onClick={() => onContactDealer(selectedDealer.name)}
              className="px-6 py-3 bg-slate-900 dark:bg-dark-900 hover:bg-slate-800 text-white font-outfit font-bold rounded-xl text-xs shadow-sm flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact dealer</span>
            </button>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-700 space-y-1 text-xs">
            <span className="font-bold text-slate-900 dark:text-white block">Opening hours</span>
            <span className="text-slate-500 dark:text-slate-400">{selectedDealer.hours}</span>
          </div>

        </main>

      </div>

    </div>
  );
}
