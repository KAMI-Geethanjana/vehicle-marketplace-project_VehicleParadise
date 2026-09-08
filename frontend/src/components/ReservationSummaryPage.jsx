import React from 'react';
import { ArrowRight, Trash2, ShieldCheck } from 'lucide-react';

export default function ReservationSummaryPage({ 
  reservedVehicle, 
  onRemoveReservation, 
  onContinueShopping, 
  onProceedToCheckout 
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header (Wireframe 3) */}
      <div className="space-y-1">
        <h1 className="font-outfit font-black text-3xl text-slate-900 dark:text-white">
          Reservation Summary
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Review your reservation shortlist before checkout.
        </p>
      </div>

      {!reservedVehicle ? (
        <div className="text-center py-16 bg-slate-100 dark:bg-dark-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-outfit font-bold text-lg text-slate-700 dark:text-slate-300">
            No Active Reservation Shortlist
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Browse our vehicle catalog to shortlist a vehicle for viewing.
          </p>
          <button
            onClick={onContinueShopping}
            className="px-5 py-2.5 bg-slate-800 dark:bg-dark-700 text-white text-xs font-bold rounded-xl"
          >
            Browse Vehicles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Item Card (Wireframe 3) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white dark:bg-dark-800 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center shadow-sm">
              
              {/* Image */}
              <div className="w-full sm:w-48 aspect-[16/10] bg-slate-100 dark:bg-dark-900 rounded-xl overflow-hidden shrink-0">
                <img src={reservedVehicle.image} alt={reservedVehicle.name} className="w-full h-full object-cover" />
              </div>

              {/* Info */}
              <div className="flex-1 space-y-2 text-xs">
                <h3 className="font-outfit font-bold text-lg text-slate-900 dark:text-white">
                  {reservedVehicle.name}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  {reservedVehicle.transmission} | {reservedVehicle.mileage} | {reservedVehicle.location}
                </p>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400 block">Reservation fee (refundable)</span>
                  <span className="font-outfit font-bold text-sm text-slate-900 dark:text-white">Rs. 25,000</span>
                </div>

                <button
                  onClick={onRemoveReservation}
                  className="text-rose-500 hover:underline pt-2 inline-flex items-center gap-1 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>[ Remove ]</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Order Summary Box (Wireframe 3) */}
          <div className="lg:col-span-4 bg-slate-100 dark:bg-dark-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="font-outfit font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Order summary
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Vehicle reservation fee</span>
                <span className="font-bold">Rs. 25,000</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Service fee</span>
                <span>Rs. 0</span>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between font-outfit font-black text-slate-900 dark:text-white text-base">
                <span>Total due today</span>
                <span>Rs. 25,000</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 bg-slate-800 dark:bg-dark-700 hover:bg-slate-900 dark:hover:bg-dark-600 text-white font-outfit font-bold rounded-xl text-xs shadow-sm flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onContinueShopping}
                className="w-full py-3 bg-slate-200 dark:bg-dark-900 hover:bg-slate-300 dark:hover:bg-dark-700 text-slate-700 dark:text-slate-300 font-outfit font-bold rounded-xl text-xs transition-colors"
              >
                Continue shopping
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
