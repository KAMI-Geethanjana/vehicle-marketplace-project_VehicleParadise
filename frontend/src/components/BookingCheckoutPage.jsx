import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function BookingCheckoutPage({ reservedVehicle, onCheckoutComplete }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredContact: 'Phone',
    address: '',
    preferredDate: '',
    preferredTime: '10:00 AM',
    notes: '',
    paymentMethod: 'Card',
    agreed: false
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onCheckoutComplete();
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header (Wireframe 5) */}
      <div className="space-y-1">
        <h1 className="font-outfit font-black text-3xl text-slate-900 dark:text-white">
          Booking Checkout
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Complete your details to reserve a viewing. Fields marked * are required.
        </p>
      </div>

      {isSuccess ? (
        <div className="text-center py-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 space-y-4 max-w-xl mx-auto">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
          <h2 className="font-outfit font-bold text-2xl text-slate-900 dark:text-white">
            Viewing Reserved Successfully!
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Your viewing request for <strong>{reservedVehicle?.name || '2021 Toyota Corolla'}</strong> has been confirmed. The seller will contact you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Contact details column (Wireframe 5) */}
            <div className="bg-slate-100 dark:bg-dark-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
              <h2 className="font-outfit font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                Contact details
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Full name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Phone number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+94 77 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Preferred contact</label>
                  <select
                    value={formData.preferredContact}
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  >
                    <option value="Phone">Phone</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Street, city"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Viewing / collection column (Wireframe 5) */}
            <div className="bg-slate-100 dark:bg-dark-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
              <h2 className="font-outfit font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                Viewing / collection
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Preferred date *</label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Preferred time</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Location</label>
                <input
                  type="text"
                  readOnly
                  value={`${reservedVehicle?.location || 'Colombo'} seller location`}
                  className="w-full px-3.5 py-2.5 bg-slate-200 dark:bg-dark-900/50 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Notes for seller</label>
                <textarea
                  rows={2}
                  placeholder="Optional message"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

          </div>

          {/* Payment & terms section (Wireframe 5) */}
          <div className="bg-slate-100 dark:bg-dark-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <h2 className="font-outfit font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Payment & terms
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                <div className="space-y-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold">Select Payment Method</label>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'Card' ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/10' : 'border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-500/50'}`}>
                        <input type="radio" name="payment" value="Card" checked={formData.paymentMethod === 'Card'} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} className="text-amber-500 focus:ring-amber-500 w-4 h-4" />
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 dark:text-white text-xs">Credit / Debit Card</span>
                          <span className="text-slate-500 dark:text-slate-400 text-[10px]">Visa, MasterCard, Amex</span>
                        </div>
                      </label>
                      
                      {formData.paymentMethod === 'Card' && (
                        <div className="mt-3 p-4 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3">
                          <div>
                            <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1 text-[10px] uppercase tracking-wider">Card Number</label>
                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-mono text-xs focus:ring-1 focus:ring-amber-500" required />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1 text-[10px] uppercase tracking-wider">Expiry Date</label>
                              <input type="text" placeholder="MM/YY" className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-mono text-xs focus:ring-1 focus:ring-amber-500" required />
                            </div>
                            <div>
                              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1 text-[10px] uppercase tracking-wider">CVV</label>
                              <input type="text" placeholder="123" className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-mono text-xs focus:ring-1 focus:ring-amber-500" required />
                            </div>
                          </div>
                          <div>
                            <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1 text-[10px] uppercase tracking-wider">Name on Card</label>
                            <input type="text" placeholder="J. Doe" className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-xs focus:ring-1 focus:ring-amber-500" required />
                          </div>
                        </div>
                      )}
                    </div>

                    <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'Bank Transfer' ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/10' : 'border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-500/50'}`}>
                      <input type="radio" name="payment" value="Bank Transfer" checked={formData.paymentMethod === 'Bank Transfer'} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} className="text-amber-500 focus:ring-amber-500 w-4 h-4" />
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white text-xs">Bank Transfer</span>
                        <span className="text-slate-500 dark:text-slate-400 text-[10px]">Direct account transfer</span>
                      </div>
                    </label>

                    <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'PayPal' ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/10' : 'border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-500/50'}`}>
                      <input type="radio" name="payment" value="PayPal" checked={formData.paymentMethod === 'PayPal'} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} className="text-amber-500 focus:ring-amber-500 w-4 h-4" />
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white text-xs">PayPal</span>
                        <span className="text-slate-500 dark:text-slate-400 text-[10px]">Fast & secure checkout</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-1">
                  <span>Refundable deposit</span>
                  <strong className="text-slate-900 dark:text-white">Rs. 25,000</strong>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    checked={formData.agreed}
                    onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                    className="w-4 h-4 text-amber-500 rounded"
                  />
                  <label htmlFor="terms" className="text-slate-600 dark:text-slate-300">
                    I agree to the reservation terms and privacy policy. Deposit is refundable subject to stated cancellation policy.
                  </label>
                </div>
              </div>

              {/* Total & Submit button */}
              <div className="text-right space-y-3">
                <span className="text-slate-500 dark:text-slate-400 block font-semibold">Reservation total</span>
                <span className="font-outfit font-black text-2xl text-slate-900 dark:text-white block">
                  Due today: Rs. 25,000
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 dark:bg-dark-700 hover:bg-slate-900 dark:hover:bg-dark-600 text-white font-outfit font-bold rounded-xl text-sm shadow-sm transition-all"
                >
                  Confirm Reservation
                </button>
              </div>

            </div>
          </div>

        </form>
      )}

    </div>
  );
}
