import React from 'react';
import { CheckCircle2, Heart, MessageSquare, ShieldCheck, Calendar, Gauge, Fuel, Cog, ShoppingCart } from 'lucide-react';

export default function VehicleDetailsPage({ 
  vehicle, 
  onSaveVehicle, 
  isSaved, 
  onMessageSeller, 
  onReserveViewing 
}) {
  if (!vehicle) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header (Wireframe 4) */}
      <div className="space-y-1">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Vehicle Details
        </span>
        <h1 className="font-outfit font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
          {vehicle.name}
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
          {vehicle.seller} • {vehicle.location} • {vehicle.sellerType}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Gallery (Wireframe 4) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[16/10] bg-slate-100 dark:bg-dark-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
            <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {vehicle.gallery.map((img, idx) => (
              <div key={idx} className="aspect-[16/10] bg-slate-100 dark:bg-dark-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Info Box (Wireframe 4) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Price & Verified badge */}
          <div className="space-y-2">
            <div className="font-outfit font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
              {vehicle.priceDisplay}
            </div>
            {vehicle.verified && (
              <div className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-dark-800 px-3 py-1 rounded-full text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Verified</span>
              </div>
            )}
          </div>

          {/* Key details list */}
          <div className="bg-slate-100 dark:bg-dark-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-outfit font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Key details
            </h3>

            <div className="grid grid-cols-2 gap-y-3 text-xs">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500 dark:text-slate-400">Year:</span>
                <strong className="text-slate-900 dark:text-white">{vehicle.year}</strong>
              </div>

              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500 dark:text-slate-400">Mileage:</span>
                <strong className="text-slate-900 dark:text-white">{vehicle.mileage}</strong>
              </div>

              <div className="flex items-center gap-2">
                <Fuel className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500 dark:text-slate-400">Fuel:</span>
                <strong className="text-slate-900 dark:text-white">{vehicle.fuel}</strong>
              </div>

              <div className="flex items-center gap-2">
                <Cog className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500 dark:text-slate-400">Transmission:</span>
                <strong className="text-slate-900 dark:text-white">{vehicle.transmission}</strong>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={() => onSaveVehicle()}
              className={`w-full py-3.5 px-4 ${isSaved ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-amber-600 dark:bg-amber-500 hover:bg-amber-500 dark:hover:bg-amber-400 text-slate-900'} font-outfit font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2`}
            >
              <ShoppingCart className={`w-4 h-4 ${isSaved ? 'fill-white text-white' : ''}`} />
              <span>{isSaved ? 'Added to Cart' : 'Add to Cart'}</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onMessageSeller(vehicle.seller)}
                className="py-3.5 px-4 bg-slate-800 dark:bg-dark-700 hover:bg-slate-900 dark:hover:bg-dark-600 text-white font-outfit font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message</span>
              </button>

              <button
                onClick={() => onReserveViewing(vehicle)}
                className="py-3.5 px-4 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 text-slate-900 dark:text-white font-outfit font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Reserve</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Description */}
      <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-6">
        <h3 className="font-outfit font-bold text-base text-slate-900 dark:text-white">Description</h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          {vehicle.description}
        </p>
      </div>

      {/* Safety & trust */}
      <div className="space-y-3 border-t border-slate-200 dark:border-slate-800 pt-6">
        <h3 className="font-outfit font-bold text-base text-slate-900 dark:text-white">Safety & trust</h3>
        <div className="flex gap-3">
          <span className="px-3.5 py-1.5 bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-700">
            Seller verified
          </span>
          <span className="px-3.5 py-1.5 bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 rounded-full text-xs font-semibold border border-amber-200 dark:border-amber-500/30">
            Finance eligible
          </span>
        </div>
      </div>

    </div>
  );
}
