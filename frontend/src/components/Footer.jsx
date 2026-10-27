import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#0b1121] py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="font-serif font-bold text-xl tracking-wide text-white flex items-center">
                <span className="italic">Vehicle</span> <span className="text-[#10b981] ml-1 italic">Paradise</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mt-4">
              Sri Lanka's premier digital vehicle marketplace for buying, selling, and discovering certified vehicles with confidence.
            </p>
          </div>

          {/* MARKETPLACE */}
          <div className="md:ml-auto">
            <h3 className="font-bold text-white text-xs tracking-widest uppercase mb-6">
              MARKETPLACE
            </h3>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => onNavigate('browse')}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Browse vehicles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('sell')}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Sell a vehicle
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('compare')}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Compare
                </button>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="md:ml-auto">
            <h3 className="font-bold text-white text-xs tracking-widest uppercase mb-6">
              SUPPORT
            </h3>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Contact us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('finance')}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Finance calculator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('admin')}
                  className="text-sm text-amber-400 hover:text-amber-300 transition-colors font-semibold flex items-center gap-1.5"
                >
                  <span>Admin Portal</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Terms & privacy
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
