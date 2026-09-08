import React from 'react';
import { ShoppingCart, Trash2, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';

export default function CartPage({ favorites, vehicles, onToggleFavorite, onNavigate }) {
  // Use favorites as the items in the cart for now since there's no actual cart state yet
  const cartItems = vehicles.filter(v => favorites.includes(v.id));
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const processingFee = cartItems.length > 0 ? 50000 : 0;
  const total = subtotal + processingFee;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-amber-500/10 rounded-xl">
          <ShoppingCart className="w-8 h-8 text-amber-500" />
        </div>
        <h1 className="font-outfit font-black text-4xl text-slate-900 dark:text-white tracking-tight">
          Your Cart <span className="text-amber-500">.</span>
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white/40 dark:bg-dark-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[400px] shadow-xl">
          <div className="w-24 h-24 bg-slate-100 dark:bg-dark-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <ShoppingCart className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="font-outfit font-bold text-2xl text-slate-900 dark:text-white mb-3">Your cart is empty</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
            Looks like you haven't added any vehicles to your cart yet. Browse our collection to find your dream ride.
          </p>
          <button 
            onClick={() => onNavigate('browse')}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-outfit font-black rounded-xl text-sm shadow-xl hover:shadow-amber-500/30 transition-all duration-300"
          >
            BROWSE VEHICLES
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white/60 dark:bg-dark-900/60 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden shadow-xl shadow-slate-200/10 dark:shadow-black/20">
              <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/50 dark:bg-dark-950/50">
                <h2 className="font-outfit font-bold text-lg text-slate-900 dark:text-white">
                  Cart Items ({cartItems.length})
                </h2>
                <button 
                  onClick={() => cartItems.forEach(item => onToggleFavorite(item.id))}
                  className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
              
              <div className="divide-y divide-slate-200/50 dark:divide-slate-800/50">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 group hover:bg-slate-50/50 dark:hover:bg-dark-800/50 transition-colors">
                    <div className="w-full sm:w-48 h-32 rounded-2xl overflow-hidden bg-slate-100 dark:bg-dark-950 relative shadow-md">
                      <img src={item.image} alt={item.shortName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-outfit font-bold text-xl text-slate-900 dark:text-white">
                            {item.shortName}
                          </h3>
                          <button 
                            onClick={() => onToggleFavorite(item.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-all"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                          {item.make} • {item.condition} • {item.location}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="px-3 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-xs rounded-lg border border-amber-200/50 dark:border-amber-500/20">
                          Reservation Deposit
                        </div>
                        <p className="font-outfit font-black text-xl text-slate-900 dark:text-white">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6 relative">
            <div className="bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-2xl shadow-slate-200/20 dark:shadow-black/40 sticky top-24">
              <h2 className="font-outfit font-bold text-xl text-slate-900 dark:text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>Processing Fee</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{formatPrice(processingFee)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                  <span>Taxes</span>
                  <span className="italic">Calculated at checkout</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-base font-bold text-slate-900 dark:text-white">Total</span>
                  <span className="font-outfit font-black text-3xl text-amber-500">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-right text-slate-500">LKR (Sri Lankan Rupees)</p>
              </div>

              <button 
                onClick={() => onNavigate('checkout')}
                className="w-full py-4 bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-600 text-white font-outfit font-black rounded-xl shadow-xl hover:shadow-slate-900/20 dark:hover:shadow-amber-500/30 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                PROCEED TO CHECKOUT
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Secure SSL encrypted payment processing</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <CreditCard className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Accepting all major credit cards and bank transfers</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
