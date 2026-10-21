import React from 'react';
import { CheckCircle2, Heart, MessageSquare, Phone, Calendar, Gauge, Fuel, Cog, Car, Tag, ShieldCheck, ShoppingCart } from 'lucide-react';

export default function VehicleDetailsPage({ 
  vehicle, 
  onSaveVehicle, 
  isSaved, 
  onMessageSeller, 
  onReserveViewing,
  onAddToCart,
  isInCart
}) {
  if (!vehicle) return null;

  const getPriceRatingColor = (rating) => {
    switch (rating) {
      case 'Super Price': return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
      case 'Good Price': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
      case 'Fair Price': return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
      case 'High Price': return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
      default: return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title & Badge */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {vehicle.condition} • {vehicle.category}
          </span>
          {vehicle.verified && (
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Listing</span>
            </div>
          )}
        </div>
        <h1 className="font-outfit font-black text-4xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
          {vehicle.name}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
          <span>📍 {vehicle.location}</span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span>Listed by {vehicle.sellerType}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative">
        
        {/* Left Side: Images & Details */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Gallery Grid */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] bg-slate-100 dark:bg-dark-900 rounded-2xl overflow-hidden shadow-md group">
              <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <button
                onClick={() => onSaveVehicle()}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/90 dark:bg-dark-900/90 backdrop-blur-md shadow-lg text-slate-700 dark:text-slate-200 hover:text-rose-500 transition-colors z-10"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {vehicle.gallery.map((img, idx) => (
                <div key={idx} className="aspect-[4/3] bg-slate-100 dark:bg-dark-900 rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                  <img src={img} alt={`thumbnail ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <section className="space-y-4">
            <h2 className="font-outfit font-bold text-2xl text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">Seller's Notes</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {vehicle.description}
            </p>
          </section>

          {/* Detailed Specs Grid */}
          <section className="space-y-4">
            <h2 className="font-outfit font-bold text-2xl text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">Technical Data</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex justify-between py-3 border-b border-slate-100 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">Make</span>
                <span className="font-semibold text-slate-900 dark:text-white">{vehicle.make}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-100 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">Model</span>
                <span className="font-semibold text-slate-900 dark:text-white">{vehicle.model}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-100 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">First Registration</span>
                <span className="font-semibold text-slate-900 dark:text-white">{vehicle.year}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-100 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">Mileage</span>
                <span className="font-semibold text-slate-900 dark:text-white">{vehicle.mileage}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-100 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">Fuel Type</span>
                <span className="font-semibold text-slate-900 dark:text-white">{vehicle.fuel}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-100 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">Transmission</span>
                <span className="font-semibold text-slate-900 dark:text-white">{vehicle.transmission}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-100 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">Body Type</span>
                <span className="font-semibold text-slate-900 dark:text-white">{vehicle.bodyType || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-100 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">Emission Class</span>
                <span className="font-semibold text-slate-900 dark:text-white">{vehicle.emissionClass || 'N/A'}</span>
              </div>
            </div>
          </section>

          {/* Equipment/Features */}
          {vehicle.features && vehicle.features.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-outfit font-bold text-2xl text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">Features & Equipment</h2>
              <div className="flex flex-wrap gap-3">
                {vehicle.features.map((feature, idx) => (
                  <span key={idx} className="px-4 py-2 bg-slate-100 dark:bg-dark-900 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-800">
                    ✓ {feature}
                  </span>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Side: Sticky Contact / Price Box */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          <div className="bg-white dark:bg-dark-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 space-y-6">
            
            {/* Price & Rating */}
            <div className="space-y-3">
              <h2 className="font-outfit font-black text-4xl text-slate-900 dark:text-white">
                {vehicle.priceDisplay}
              </h2>
              
              {vehicle.priceRating && (
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border uppercase tracking-wide ${getPriceRatingColor(vehicle.priceRating)}`}>
                  <Tag className="w-4 h-4" />
                  {vehicle.priceRating}
                </div>
              )}
            </div>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Quick Specs Overview */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-slate-400" />
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Year</span>
                  <span className="font-semibold dark:text-white">{vehicle.year}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-slate-400" />
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Mileage</span>
                  <span className="font-semibold dark:text-white">{vehicle.mileage}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="w-5 h-5 text-slate-400" />
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Fuel</span>
                  <span className="font-semibold dark:text-white">{vehicle.fuel}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Cog className="w-5 h-5 text-slate-400" />
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Trans</span>
                  <span className="font-semibold dark:text-white">{vehicle.transmission}</span>
                </div>
              </div>
            </div>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Seller Info */}
            <div className="space-y-3">
              <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">Dealer Information</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-lg">
                  {vehicle.seller.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{vehicle.seller}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span>{vehicle.sellerRating}</span>
                    <span>•</span>
                    <span>{vehicle.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons with finger-friendly min-h-[48px] */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  if (onAddToCart) onAddToCart(vehicle);
                }}
                className={`w-full py-3.5 px-4 min-h-[48px] ${isInCart ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-slate-800 dark:bg-dark-700 hover:bg-slate-900 text-white'} font-outfit font-extrabold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer`}
              >
                <ShoppingCart className={`w-4 h-4 ${isInCart ? 'fill-white text-white' : ''}`} />
                <span>{isInCart ? 'Added to Cart ✓' : 'Add to Cart'}</span>
              </button>

              <button
                onClick={() => onReserveViewing(vehicle)}
                className="w-full py-3.5 px-4 min-h-[48px] bg-amber-500 hover:bg-amber-600 text-white font-outfit font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Tag className="w-4 h-4" />
                <span>Reserve / Checkout</span>
              </button>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => onMessageSeller(vehicle.seller)}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-dark-800 dark:hover:bg-dark-700 text-slate-900 dark:text-white font-outfit font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Message</span>
                </button>
                
                <button
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-dark-800 dark:hover:bg-dark-700 text-slate-900 dark:text-white font-outfit font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </button>
              </div>
            </div>

            <div className="pt-2 text-center text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 inline-block mr-1 -mt-0.5" />
              Secure transaction via VehicleParadise
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
