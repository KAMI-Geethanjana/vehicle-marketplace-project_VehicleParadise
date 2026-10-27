import React from 'react';
import { ShoppingCart, Trash2, ArrowRight, ShieldCheck, CreditCard, Plus, Minus, AlertCircle } from 'lucide-react';

export default function CartPage({ 
  cart = [], 
  onUpdateQuantity, 
  onRemoveFromCart, 
  onClearCart, 
  onNavigate 
}) {
  // Math Accuracy & Input Sanitization (Week 09 Task 3 & Common Bug #1 Fix: Total Shows NaN)
  const cartItems = Array.isArray(cart) ? cart : [];
  
  const subtotal = cartItems.reduce((sum, item) => {
    const unitPrice = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 1;
    return sum + (unitPrice * quantity);
  }, 0);

  // Reservation deposit fee of Rs. 25,000 per vehicle
  const processingFee = cartItems.length > 0 ? 25000 : 0;
  const total = subtotal > 0 ? (subtotal + processingFee) : 0;

  const formatPrice = (price) => {
    const num = parseFloat(price) || 0;
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(num);
  };

  // Safe quantity input handler - strictly disallow NaN, zero, and negative values
  const handleQuantityInputChange = (id, rawValue) => {
    if (rawValue === '') {
      onUpdateQuantity(id, 1);
      return;
    }
    const parsed = parseInt(rawValue, 10);
    if (isNaN(parsed) || parsed < 1) {
      onUpdateQuantity(id, 1);
    } else {
      onUpdateQuantity(id, parsed);
    }
  };

  const handleDecrement = (id, currentQty) => {
    const qty = parseInt(currentQty, 10) || 1;
    if (qty > 1) {
      onUpdateQuantity(id, qty - 1);
    } else {
      // Disallow zero & negative quantities (Slide 8 Task 3)
      onUpdateQuantity(id, 1);
    }
  };

  const handleIncrement = (id, currentQty) => {
    const qty = parseInt(currentQty, 10) || 1;
    onUpdateQuantity(id, qty + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen w-full">
      
      {/* Title Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-amber-500/10 rounded-xl">
          <ShoppingCart className="w-8 h-8 text-amber-500" />
        </div>
        <div>
          <h1 className="font-outfit font-black text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Your Cart <span className="text-amber-500">.</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Review vehicles added to your reservation cart. Changes are automatically saved.
          </p>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white/40 dark:bg-dark-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[400px] shadow-xl">
          <div className="w-24 h-24 bg-slate-100 dark:bg-dark-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <ShoppingCart className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="font-outfit font-bold text-2xl text-slate-900 dark:text-white mb-3">Your cart is empty</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md text-sm">
            Looks like you haven't added any vehicles to your cart yet. Browse our verified inventory to find your next vehicle.
          </p>
          <button 
            onClick={() => onNavigate('browse')}
            className="px-8 py-4 min-h-[48px] bg-amber-500 hover:bg-amber-600 text-white font-outfit font-black rounded-xl text-sm shadow-xl hover:shadow-amber-500/30 transition-all duration-300 flex items-center gap-2"
          >
            BROWSE VEHICLES
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6 w-full">
            <div className="bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden shadow-xl shadow-slate-200/10 dark:shadow-black/20">
              
              <div className="p-4 sm:p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/50 dark:bg-dark-950/50">
                <h2 className="font-outfit font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                  Cart Items ({cartItems.reduce((acc, curr) => acc + (parseInt(curr.quantity, 10) || 1), 0)})
                </h2>
                <button 
                  onClick={onClearCart}
                  className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors min-h-[44px] flex items-center px-2"
                  title="Clear all items from cart"
                >
                  Clear Cart
                </button>
              </div>
              
              <div className="divide-y divide-slate-200/50 dark:divide-slate-800/50">
                {cartItems.map((item) => {
                  const qty = parseInt(item.quantity, 10) || 1;
                  const itemPrice = parseFloat(item.price) || 0;
                  const itemLineTotal = itemPrice * qty;

                  return (
                    <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 group hover:bg-slate-50/50 dark:hover:bg-dark-800/50 transition-colors">
                      
                      {/* Vehicle Image */}
                      <div className="w-full sm:w-48 h-36 rounded-2xl overflow-hidden bg-slate-100 dark:bg-dark-950 relative shadow-md shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.shortName || item.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      
                      {/* Vehicle Details & Quantity Stepper */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-outfit font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                              {item.shortName || item.name}
                            </h3>
                            <button 
                              onClick={() => onRemoveFromCart(item.id)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                              title="Remove item"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3">
                            {item.make} • {item.condition || 'Verified'} • {item.location || 'Sri Lanka'}
                          </p>
                        </div>
                        
                        {/* Quantity Controls & Line Math Accuracy */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                          
                          {/* Stepper with Zero/Negative protection (Slide 8 Task 3) */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Qty:</span>
                            <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-dark-900 shadow-sm">
                              <button
                                type="button"
                                onClick={() => handleDecrement(item.id, qty)}
                                disabled={qty <= 1}
                                className={`p-2 min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors ${qty <= 1 ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-800'}`}
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>

                              <input
                                type="number"
                                min="1"
                                value={qty}
                                onChange={(e) => handleQuantityInputChange(item.id, e.target.value)}
                                className="w-12 text-center text-sm font-bold bg-transparent text-slate-900 dark:text-white border-x border-slate-200 dark:border-slate-700 focus:outline-none"
                                aria-label="Item quantity"
                              />

                              <button
                                type="button"
                                onClick={() => handleIncrement(item.id, qty)}
                                className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Line item subtotal: Price × Quantity */}
                          <div className="text-right">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Item Subtotal</span>
                            <p className="font-outfit font-black text-lg sm:text-xl text-slate-900 dark:text-white">
                              {formatPrice(itemLineTotal)}
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6 w-full relative">
            <div className="bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50 p-6 sm:p-8 shadow-2xl shadow-slate-200/20 dark:shadow-black/40 sticky top-24">
              <h2 className="font-outfit font-bold text-xl text-slate-900 dark:text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>Vehicles Total ({cartItems.reduce((acc, curr) => acc + (parseInt(curr.quantity, 10) || 1), 0)} units)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>Reservation Deposit Fee</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{formatPrice(processingFee)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                  <span>Taxes & Duties</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Included</span>
                </div>
              </div>

              {/* Total Calculation (Math Accuracy: Subtotal + Processing Fee without NaN) */}
              <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-base font-bold text-slate-900 dark:text-white">Total</span>
                  <span className="font-outfit font-black text-2xl sm:text-3xl text-amber-500">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-right text-slate-500">LKR (Sri Lankan Rupees)</p>
              </div>

              {/* Proceed to Checkout button with finger-friendly height >= 44px */}
              <button 
                onClick={() => onNavigate('checkout')}
                className="w-full py-4 min-h-[48px] bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-600 text-white font-outfit font-black rounded-xl shadow-xl hover:shadow-slate-900/20 dark:hover:shadow-amber-500/30 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
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
                  <span>Integrated with PayHere Sri Lanka Sandbox</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
