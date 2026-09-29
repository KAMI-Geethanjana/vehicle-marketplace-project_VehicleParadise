import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, ArrowRight, ArrowLeft, ScanLine, Sparkles, AlertCircle } from 'lucide-react';

export default function SellVehiclePage({ onVehicleAdded }) {
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [licensePlate, setLicensePlate] = useState('');
  
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    condition: 'Used',
    fuel: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    emissionClass: 'Euro 6',
    location: 'Colombo',
    price: '',
    description: '',
    features: []
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const availableFeatures = ['Sunroof', 'Leather Seats', 'Cruise Control', 'Navigation System', 'Alloy Wheels', 'Bluetooth', 'Parking Sensors', 'Reverse Camera'];

  const handleScanPlate = () => {
    if (!licensePlate) return;
    setIsScanning(true);
    // Simulate API call for VIN/Plate lookup
    setTimeout(() => {
      setFormData({
        ...formData,
        make: 'Honda',
        model: 'Civic',
        year: '2020',
        fuel: 'Petrol',
        transmission: 'Automatic',
        bodyType: 'Sedan',
        emissionClass: 'Euro 6'
      });
      setIsScanning(false);
      setStep(2); // Move to manual confirmation
    }, 1500);
  };

  const handleFeatureToggle = (feat) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feat) 
        ? prev.features.filter(f => f !== feat)
        : [...prev.features, feat]
    }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
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
        priceRating: 'Good Price',
        location: formData.location,
        mileage: formData.mileage,
        fuel: formData.fuel,
        transmission: formData.transmission,
        bodyType: formData.bodyType,
        emissionClass: formData.emissionClass,
        condition: formData.condition,
        category: 'Cars',
        features: formData.features,
        verified: false,
        seller: 'Private Seller',
        sellerType: 'Private Seller',
        sellerRating: 'New',
        image: '/hero_supercar.png',
        gallery: ['/hero_supercar.png'],
        description: formData.description || 'Newly listed vehicle.',
        safetyAndTrust: ['Seller unverified']
      });
    }, 1500);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-500">
                <ScanLine className="w-8 h-8" />
              </div>
              <h2 className="font-outfit font-black text-2xl text-slate-900 dark:text-white">Fast-Track Your Listing</h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Enter your vehicle's license plate or VIN and we'll auto-fill the technical details for you.
              </p>
            </div>
            
            <div className="max-w-md mx-auto space-y-4 bg-white dark:bg-dark-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">License Plate / VIN</label>
                <input
                  type="text"
                  placeholder="e.g. CAA-1234 or JHM..."
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  className="w-full px-4 py-3 text-lg font-bold text-center uppercase tracking-widest bg-slate-50 dark:bg-dark-950 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl focus:border-amber-500 focus:ring-0 transition-colors"
                />
              </div>
              
              <button
                type="button"
                onClick={handleScanPlate}
                disabled={!licensePlate || isScanning}
                className="w-full py-4 bg-slate-900 dark:bg-slate-800 hover:bg-amber-500 text-white font-outfit font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isScanning ? (
                  <div className="flex items-center gap-2">
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                    SCANNING DATABASE...
                  </div>
                ) : (
                  <>
                    <ScanLine className="w-4 h-4" />
                    LOOK UP VEHICLE
                  </>
                )}
              </button>

              <div className="text-center">
                <span className="text-xs text-slate-400">or</span>
              </div>
              
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-3 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-700 hover:border-amber-500 text-slate-700 dark:text-slate-300 font-outfit font-bold rounded-xl text-sm transition-all"
              >
                ENTER DETAILS MANUALLY
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-outfit font-bold text-xl text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
              Vehicle Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Make</label>
                <input type="text" value={formData.make} onChange={(e) => setFormData({...formData, make: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Model</label>
                <input type="text" value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Year</label>
                <input type="number" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Mileage (km)</label>
                <input type="text" value={formData.mileage} onChange={(e) => setFormData({...formData, mileage: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Fuel Type</label>
                <select value={formData.fuel} onChange={(e) => setFormData({...formData, fuel: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500">
                  <option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>Electric</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Transmission</label>
                <select value={formData.transmission} onChange={(e) => setFormData({...formData, transmission: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500">
                  <option>Automatic</option><option>Manual</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Body Type</label>
                <select value={formData.bodyType} onChange={(e) => setFormData({...formData, bodyType: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500">
                  <option>Sedan</option><option>SUV</option><option>Hatchback</option><option>Coupe</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Location</label>
                <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500" />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-outfit font-bold text-xl text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
              Features & Description
            </h2>
            
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-2 text-sm">Select Equipment</label>
              <div className="flex flex-wrap gap-3">
                {availableFeatures.map(feat => (
                  <button
                    key={feat}
                    type="button"
                    onClick={() => handleFeatureToggle(feat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      formData.features.includes(feat)
                        ? 'bg-amber-100 border-amber-500 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                        : 'bg-white dark:bg-dark-950 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    {feat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-2 text-sm">Seller's Description</label>
              <textarea
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Highlight the best features of your vehicle, recent maintenance, and reasons for selling..."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-outfit font-bold text-xl text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
              Upload Photos
            </h2>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 text-center space-y-3 bg-slate-50 dark:bg-dark-900/50 hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors cursor-pointer">
              <UploadCloud className="w-10 h-10 text-amber-500 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Drag and drop your photos here, or <span className="text-amber-500 underline">browse</span>
              </p>
              <p className="text-xs text-slate-500">
                You can add up to 15 photos. Listings with high-quality photos get 3x more views!
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-outfit font-bold text-xl text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
              Set Your Price
            </h2>
            
            <div className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 p-5 rounded-2xl flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">AI Price Suggestion</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Based on similar {formData.year} {formData.make} {formData.model} listings in {formData.location}, we recommend pricing between:
                </p>
                <div className="mt-3 font-outfit font-black text-2xl text-slate-900 dark:text-white">
                  Rs. 7,800,000 - 8,200,000
                </div>
              </div>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-2 text-sm">Your Asking Price (Rs.)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="e.g. 8000000"
                className="w-full px-4 py-4 bg-white dark:bg-dark-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xl font-bold text-slate-900 dark:text-white focus:border-amber-500 focus:ring-0"
              />
              {formData.price && parseInt(formData.price) > 8500000 && (
                <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Price is above market average. It may take longer to sell.
                </p>
              )}
            </div>
          </div>
        );

      default: return null;
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="font-outfit font-black text-3xl text-slate-900 dark:text-white mb-4">
          Vehicle Listed Successfully!
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
          Your vehicle ad is now pending quick admin review. Once approved, it will be visible to thousands of buyers across Sri Lanka.
        </p>
      </div>
    );
  }

  const steps = [
    { num: 1, title: 'Lookup' },
    { num: 2, title: 'Details' },
    { num: 3, title: 'Features' },
    { num: 4, title: 'Photos' },
    { num: 5, title: 'Pricing' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-outfit font-black text-3xl text-slate-900 dark:text-white">
          Sell Your Vehicle
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Create a premium listing in minutes.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        {steps.map((s, idx) => {
          const isCurrent = step === s.num;
          const isDone = step > s.num;
          return (
            <div key={s.num} className="flex flex-col items-center gap-2 w-1/5 relative">
              {idx !== 0 && (
                <div className={`absolute top-3 right-1/2 w-full h-[2px] -z-10 ${isDone || isCurrent ? 'bg-amber-500' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
              )}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 transition-colors ${
                isCurrent ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/40 ring-4 ring-amber-500/20' 
                : isDone ? 'bg-amber-500 text-white' 
                : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
              }`}>
                {isDone ? <CheckCircle2 className="w-3 h-3" /> : s.num}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block ${isCurrent ? 'text-amber-500' : 'text-slate-400'}`}>
                {s.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm min-h-[400px] flex flex-col justify-between">
        
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className={`flex items-center mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 ${step === 1 ? 'justify-end' : 'justify-between'}`}>
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-dark-800 dark:hover:bg-dark-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-sm transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}
          
          {step < 5 && step > 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3 bg-slate-900 dark:bg-slate-800 hover:bg-amber-500 text-white font-outfit font-black rounded-xl text-sm shadow-md transition-all flex items-center gap-2 ml-auto"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {step === 5 && (
            <button
              type="submit"
              disabled={!formData.price}
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-outfit font-black rounded-xl text-sm shadow-lg shadow-amber-500/40 transition-all flex items-center gap-2 ml-auto disabled:opacity-50"
            >
              Publish Listing
            </button>
          )}
        </div>
      </form>

    </div>
  );
}
