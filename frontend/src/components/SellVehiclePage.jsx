import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SellVehiclePage({ onVehicleAdded }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    make: 'Toyota',
    model: 'Corolla Altis',
    year: '2021',
    mileage: '42,000 km',
    condition: 'Used',
    fuel: 'Petrol',
    transmission: 'Automatic',
    location: 'Colombo',
    price: '8900000',
    description: 'Well maintained vehicle in mint condition.'
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
    } else {
      setIsSuccess(true);
      setTimeout(() => {
        onVehicleAdded({
          id: `v_${Date.now()}`,
          name: `${formData.year} ${formData.make} ${formData.model}`,
          shortName: `${formData.year} ${formData.make} ${formData.model}`,
          make: formData.make,
          model: formData.model,
          year: parseInt(formData.year),
          price: parseInt(formData.price),
          priceDisplay: `Rs. ${(parseInt(formData.price)/1000000).toFixed(1)}M`,
          location: formData.location,
          mileage: formData.mileage,
          fuel: formData.fuel,
          transmission: formData.transmission,
          condition: formData.condition,
          category: 'Cars',
          verified: false,
          seller: 'Private Seller',
          sellerType: 'Unverified seller',
          sellerRating: 'New',
          image: '/hero_supercar.png',
          gallery: ['/hero_supercar.png'],
          description: formData.description,
          safetyAndTrust: ['Seller verified']
        });
      }, 1500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header (Wireframe 7) */}
      <div className="space-y-1">
        <h1 className="font-outfit font-black text-3xl text-slate-900 dark:text-white">
          Sell Your Vehicle
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          List your vehicle in a few simple steps.
        </p>
      </div>

      {/* Progress Bar (Wireframe 7) */}
      <div className="bg-slate-100 dark:bg-dark-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between overflow-x-auto text-xs font-semibold">
        {[
          { num: '01', title: 'Vehicle' },
          { num: '02', title: 'Details' },
          { num: '03', title: 'Photos' },
          { num: '04', title: 'Pricing' },
          { num: '05', title: 'Review' }
        ].map((item, idx) => {
          const isCurrent = step === idx + 1;
          const isDone = step > idx + 1;
          return (
            <div key={item.num} className="flex items-center gap-2 px-3 py-1">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                isCurrent
                  ? 'bg-slate-800 dark:bg-dark-700 text-white'
                  : isDone
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-200 dark:bg-dark-900 text-slate-500'
              }`}>
                {item.num}
              </span>
              <span className={isCurrent ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500'}>
                {item.title}
              </span>
            </div>
          );
        })}
      </div>

      {isSuccess ? (
        <div className="text-center py-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 space-y-4 max-w-xl mx-auto">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
          <h2 className="font-outfit font-bold text-2xl text-slate-900 dark:text-white">
            Vehicle Listed Successfully!
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Your vehicle ad is now pending quick admin review and will be visible to buyers across Sri Lanka.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
          
          {/* Section 1: Vehicle Information (Wireframe 7) */}
          <div className="space-y-4">
            <h2 className="font-outfit font-bold text-lg text-slate-900 dark:text-white">
              Vehicle information
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Make</label>
                <input
                  type="text"
                  value={formData.make}
                  onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Model</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Year</label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Mileage</label>
                <input
                  type="text"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Condition</label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl"
                >
                  <option value="Used">Used</option>
                  <option value="New">New</option>
                  <option value="Reconditioned">Reconditioned</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Fuel type</label>
                <select
                  value={formData.fuel}
                  onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl"
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Transmission</label>
                <select
                  value={formData.transmission}
                  onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl"
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="Tiptronic">Tiptronic</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Location</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl"
                >
                  <option value="Colombo">Colombo</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Galle">Galle</option>
                  <option value="Kurunegala">Kurunegala</option>
                  <option value="Negombo">Negombo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Upload Photos (Wireframe 7) */}
          <div className="space-y-4">
            <h2 className="font-outfit font-bold text-lg text-slate-900 dark:text-white">
              Upload photos
            </h2>

            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 text-center space-y-2 bg-slate-50 dark:bg-dark-900/50">
              <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Drag photos here or <span className="text-amber-500 cursor-pointer underline">Browse files</span>
              </p>
              <p className="text-[11px] text-slate-400">
                You can add up to 12 photos. Clear exterior and interior photos sell faster.
              </p>
            </div>
          </div>

          {/* Price & Submit Button */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Asking Price (Rs.)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="px-3.5 py-2 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 bg-slate-800 dark:bg-dark-700 hover:bg-slate-900 dark:hover:bg-dark-600 text-white font-outfit font-bold rounded-xl text-xs shadow-sm flex items-center gap-2"
            >
              <span>{step < 5 ? 'Continue' : 'Publish Ad'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
