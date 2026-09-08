import React from 'react';
import { ShieldCheck, Zap, Award, ArrowRight, ChevronRight, Star } from 'lucide-react';

export default function Hero({ onExploreClick, onQuickReserve }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 lg:py-16">
      
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide">
              <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>THE ULTIMATE AUTOMOTIVE SANCTUARY</span>
            </div>

            {/* Headline */}
            <h1 className="font-outfit font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none">
              Drive The World’s <br className="hidden sm:inline" />
              <span className="gold-gradient-text">Most Elite Hypercars</span> & Luxury Fleet.
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              Vehicle Paradise gives you instant access to hand-picked supercars, executive V12 luxury sedans, and futuristic electric hypercars with VIP door-to-door concierge delivery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={onExploreClick}
                className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-outfit font-bold rounded-xl text-sm shadow-glow transition-all hover:scale-105"
              >
                <span>Browse Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                onClick={onQuickReserve}
                className="flex items-center gap-2 px-6 py-3.5 bg-dark-800/80 hover:bg-dark-700 border border-slate-700 text-slate-200 font-outfit font-semibold rounded-xl text-sm transition-all hover:border-amber-500/50"
              >
                <span>Quick Reserve GT900</span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* Trust Metrics Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg">
              <div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-outfit font-bold text-xl text-white">4.98 / 5</span>
                </div>
                <p className="text-xs text-slate-400">VIP Rating</p>
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-outfit font-bold text-xl text-white">100%</span>
                </div>
                <p className="text-xs text-slate-400">Insured Fleet</p>
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="font-outfit font-bold text-xl text-white">50+</span>
                </div>
                <p className="text-xs text-slate-400">Exotic Models</p>
              </div>
            </div>

          </div>

          {/* Right Supercar Card Visualizer */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-amber-500/30 via-slate-800/40 to-slate-900 glass-panel shadow-card-glow group">
              
              <div className="relative rounded-xl overflow-hidden aspect-[16/10]">
                <img 
                  src="/hero_supercar.png" 
                  alt="Apex Speedster GT900 Hypercar" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 bg-dark-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/40 text-amber-400 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  Flagship Vehicle
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-3 left-3 right-3 glass-panel p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="font-outfit font-bold text-sm text-white">Apex Speedster GT900</h3>
                    <p className="text-xs text-amber-400 font-mono">920 HP • 0-60 in 2.3s</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Daily Rate</span>
                    <span className="font-outfit font-black text-amber-400 text-sm">$1,850 / day</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
