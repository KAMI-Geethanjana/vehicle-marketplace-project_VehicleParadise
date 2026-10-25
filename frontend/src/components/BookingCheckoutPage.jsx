import React, { useState, useRef } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, ShoppingCart, Calendar, MapPin, CreditCard, Lock } from 'lucide-react';
import CryptoJS from 'crypto-js';

export default function BookingCheckoutPage({ reservedVehicle, cart = [], onClearCart, onCheckoutComplete }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredContact: 'Phone',
    address: '',
    city: 'Colombo',
    preferredDate: '',
    preferredTime: '10:00 AM',
    notes: '',
    paymentMethod: 'PayHere',
    agreed: false
  });

  const [touched, setTouched] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const payhereFormRef = useRef(null);

  // Field validation rules (Week 09 Task 1: Instant visual validation & Friendly alerts)
  const isFirstNameValid = formData.firstName.trim().length >= 2;
  const isLastNameValid = formData.lastName.trim().length >= 2;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(formData.email.trim());
  const cleanPhone = formData.phone.replace(/[\s-]/g, '');
  const isPhoneValid = /^(?:0|\+?94)?[0-9]{9,10}$/.test(cleanPhone) && cleanPhone.length >= 9;
  const isAddressValid = formData.address.trim().length >= 5;
  const isCityValid = formData.city.trim().length >= 2;
  const isDateValid = formData.preferredDate !== '';

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Determine items and total calculation (Week 09 Task 3: Math Accuracy)
  const hasCartItems = Array.isArray(cart) && cart.length > 0;
  const itemsCount = hasCartItems 
    ? cart.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 1), 0)
    : 1;

  // Reservation deposit is Rs. 25,000 per vehicle
  const depositPerVehicle = 25000;
  const calculatedAmount = hasCartItems 
    ? cart.reduce((sum, item) => sum + (depositPerVehicle * (parseInt(item.quantity, 10) || 1)), 0)
    : depositPerVehicle;

  // PayHere Integration Details (Sandbox)
  const merchantId = "1238486";
  const merchantSecret = "MTY5NDU1Mjc5OTI5MzA1MTM4OTcxMzEyOTU5NTM3MzU5NzExNTI5NQ==";
  const orderId = `ORDER_${Date.now()}`;
  const currency = "LKR";
  
  // Math Accuracy: Ensure amount is strictly formatted with .toFixed(2) (Fixes Slide 10: PayHere amount error)
  const formattedAmount = Number(calculatedAmount).toFixed(2);
  const hashedSecret = CryptoJS.MD5(merchantSecret).toString().toUpperCase();
  const hash = CryptoJS.MD5(merchantId + orderId + formattedAmount + currency + hashedSecret).toString().toUpperCase();

  const itemDescription = hasCartItems
    ? `Vehicle Reservation Deposit (${itemsCount} vehicles: ${cart.map(c => c.shortName || c.name).join(', ')})`
    : `Vehicle Reservation Deposit - ${reservedVehicle?.name || 'Selected Vehicle'}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields touched
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      preferredDate: true
    });

    if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isPhoneValid || !isAddressValid || !isCityValid || !isDateValid || !formData.agreed) {
      return;
    }

    // Determine booked vehicle IDs
    const bookedIds = hasCartItems 
      ? cart.map(item => item.id).filter(Boolean)
      : (reservedVehicle?.id ? [reservedVehicle.id] : []);

    // Save order to database
    try {
      const token = localStorage.getItem('token');
      const orderPayload = {
        total_amount: calculatedAmount,
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        customer_phone: formData.phone,
        payment_method: formData.paymentMethod,
        items: hasCartItems
          ? cart.map(item => ({
              product_id: item.id,
              name: item.name,
              quantity: parseInt(item.quantity, 10) || 1,
              unit_price: depositPerVehicle
            }))
          : [{
              product_id: reservedVehicle?.id || 'v1',
              name: reservedVehicle?.name,
              quantity: 1,
              unit_price: depositPerVehicle
            }]
      };

      await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(orderPayload)
      });
    } catch (error) {
      console.error('Failed to create order in DB:', error);
    }

    if (onClearCart) {
      onClearCart();
    }

    if (formData.paymentMethod === 'PayHere') {
      if (payhereFormRef.current) {
        payhereFormRef.current.submit();
      }
    } else {
      setIsSuccess(true);
      setTimeout(() => {
        if (onCheckoutComplete) onCheckoutComplete(bookedIds);
      }, 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="font-outfit font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
          Booking Checkout
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Complete your contact & reservation details. All fields marked with <span className="text-rose-500">*</span> are required.
        </p>
      </div>

      {isSuccess ? (
        <div className="text-center py-16 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-8 space-y-4 max-w-xl mx-auto shadow-xl">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
          <h2 className="font-outfit font-bold text-3xl text-slate-900 dark:text-white">
            Viewing Reserved Successfully!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Your reservation has been confirmed for <strong>Rs. {formattedAmount}</strong>. You will receive an SMS and email notification shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Fields: Contact Details (Slide 5 Usability Standards) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Box 1: Customer Details */}
              <div className="bg-white dark:bg-dark-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <h2 className="font-outfit font-bold text-lg text-slate-900 dark:text-white uppercase tracking-wider">
                    1. Contact Details
                  </h2>
                </div>

                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    {/* Standard: Label on top, bold, >= 16px font (Slide 5) */}
                    <label className="block text-base font-bold text-slate-800 dark:text-slate-100 mb-1.5">
                      First Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      {/* Standard: Input height >= 48px (Slide 5) */}
                      <input
                        type="text"
                        required
                        placeholder="e.g. John"
                        value={formData.firstName}
                        onBlur={() => handleBlur('firstName')}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className={`w-full h-12 min-h-[48px] px-4 pr-10 bg-slate-50 dark:bg-dark-950 border ${touched.firstName && !isFirstNameValid ? 'border-rose-500 focus:ring-rose-500' : isFirstNameValid ? 'border-emerald-500' : 'border-slate-300 dark:border-slate-700'} rounded-xl text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all`}
                      />
                      {/* Instant visual validation: green checkmark immediately as user types (Slide 5) */}
                      {isFirstNameValid && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 absolute right-3 top-3.5" />
                      )}
                    </div>
                    {touched.firstName && !isFirstNameValid && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Please enter your first name (min 2 characters).
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-base font-bold text-slate-800 dark:text-slate-100 mb-1.5">
                      Last Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Silva"
                        value={formData.lastName}
                        onBlur={() => handleBlur('lastName')}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className={`w-full h-12 min-h-[48px] px-4 pr-10 bg-slate-50 dark:bg-dark-950 border ${touched.lastName && !isLastNameValid ? 'border-rose-500 focus:ring-rose-500' : isLastNameValid ? 'border-emerald-500' : 'border-slate-300 dark:border-slate-700'} rounded-xl text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all`}
                      />
                      {isLastNameValid && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 absolute right-3 top-3.5" />
                      )}
                    </div>
                    {touched.lastName && !isLastNameValid && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Please enter your last name.
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-base font-bold text-slate-800 dark:text-slate-100 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="hello@example.com"
                      value={formData.email}
                      onBlur={() => handleBlur('email')}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full h-12 min-h-[48px] px-4 pr-10 bg-slate-50 dark:bg-dark-950 border ${touched.email && !isEmailValid ? 'border-rose-500 focus:ring-rose-500' : isEmailValid ? 'border-emerald-500' : 'border-slate-300 dark:border-slate-700'} rounded-xl text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all`}
                    />
                    {isEmailValid && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 absolute right-3 top-3.5" />
                    )}
                  </div>
                  {/* Friendly Helper Alert (Slide 5) */}
                  {touched.email && !isEmailValid ? (
                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Please enter a valid email address (e.g. name@example.com).
                    </p>
                  ) : (
                    <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                      We'll send your booking confirmation and receipt here.
                    </p>
                  )}
                </div>

                {/* Phone Number & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-base font-bold text-slate-800 dark:text-slate-100 mb-1.5">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="077 123 4567"
                        value={formData.phone}
                        onBlur={() => handleBlur('phone')}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full h-12 min-h-[48px] px-4 pr-10 bg-slate-50 dark:bg-dark-950 border ${touched.phone && !isPhoneValid ? 'border-rose-500 focus:ring-rose-500' : isPhoneValid ? 'border-emerald-500' : 'border-slate-300 dark:border-slate-700'} rounded-xl text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all`}
                      />
                      {isPhoneValid && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 absolute right-3 top-3.5" />
                      )}
                    </div>
                    {/* Friendly Helper (Slide 5: "Please enter a valid 10-digit phone number (e.g., 077 123 4567)") */}
                    {touched.phone && !isPhoneValid ? (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Please enter a valid 10-digit phone number (e.g., 077 123 4567).
                      </p>
                    ) : (
                      <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                        For SMS viewing updates & seller contact.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-base font-bold text-slate-800 dark:text-slate-100 mb-1.5">
                      City / District <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Colombo"
                        value={formData.city}
                        onBlur={() => handleBlur('city')}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={`w-full h-12 min-h-[48px] px-4 pr-10 bg-slate-50 dark:bg-dark-950 border ${touched.city && !isCityValid ? 'border-rose-500 focus:ring-rose-500' : isCityValid ? 'border-emerald-500' : 'border-slate-300 dark:border-slate-700'} rounded-xl text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all`}
                      />
                      {isCityValid && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 absolute right-3 top-3.5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Delivery / Residence Address */}
                <div>
                  <label className="block text-base font-bold text-slate-800 dark:text-slate-100 mb-1.5">
                    Delivery / Billing Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="No. 45, Galle Road, Colombo 03"
                      value={formData.address}
                      onBlur={() => handleBlur('address')}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className={`w-full h-12 min-h-[48px] px-4 pr-10 bg-slate-50 dark:bg-dark-950 border ${touched.address && !isAddressValid ? 'border-rose-500 focus:ring-rose-500' : isAddressValid ? 'border-emerald-500' : 'border-slate-300 dark:border-slate-700'} rounded-xl text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all`}
                    />
                    {isAddressValid && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 absolute right-3 top-3.5" />
                    )}
                  </div>
                  {touched.address && !isAddressValid && (
                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Please enter your street address.
                    </p>
                  )}
                </div>

              </div>

              {/* Box 2: Viewing Date & Preference */}
              <div className="bg-white dark:bg-dark-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <h2 className="font-outfit font-bold text-lg text-slate-900 dark:text-white uppercase tracking-wider">
                    2. Inspection & Viewing Schedule
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-base font-bold text-slate-800 dark:text-slate-100 mb-1.5">
                      Preferred Date <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onBlur={() => handleBlur('preferredDate')}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className={`w-full h-12 min-h-[48px] px-4 pr-10 bg-slate-50 dark:bg-dark-950 border ${touched.preferredDate && !isDateValid ? 'border-rose-500' : isDateValid ? 'border-emerald-500' : 'border-slate-300 dark:border-slate-700'} rounded-xl text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500`}
                      />
                      {isDateValid && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 absolute right-3 top-3.5" />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-base font-bold text-slate-800 dark:text-slate-100 mb-1.5">
                      Preferred Time
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full h-12 min-h-[48px] px-4 bg-slate-50 dark:bg-dark-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="10:00 AM">10:00 AM (Morning)</option>
                      <option value="02:00 PM">02:00 PM (Afternoon)</option>
                      <option value="04:30 PM">04:30 PM (Evening)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-base font-bold text-slate-800 dark:text-slate-100 mb-1.5">
                    Notes for Seller / Dealership
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Optional message or test-drive questions"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-dark-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary & PayHere Submit (Slide 8, 9, 10) */}
            <div className="lg:col-span-5 space-y-6 w-full relative">
              <div className="bg-white dark:bg-dark-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 sticky top-24">
                
                <h2 className="font-outfit font-bold text-xl text-slate-900 dark:text-white">
                  Payment Summary
                </h2>

                {/* Items in Checkout */}
                <div className="space-y-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {hasCartItems ? `Items in Cart (${itemsCount})` : 'Selected Vehicle'}
                  </div>
                  
                  {hasCartItems ? (
                    cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                          {item.shortName || item.name} (x{item.quantity})
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          Rs. {(depositPerVehicle * (parseInt(item.quantity, 10) || 1)).toLocaleString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                        {reservedVehicle?.name || '2021 Toyota Corolla Altis'}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        Rs. {depositPerVehicle.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Payment Gateway Options */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-800 dark:text-slate-200">
                    Payment Method
                  </label>
                  
                  <label className={`flex items-center gap-3 p-3.5 border-2 rounded-2xl cursor-pointer transition-all ${formData.paymentMethod === 'PayHere' ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-500/10' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-900'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="PayHere" 
                      checked={formData.paymentMethod === 'PayHere'} 
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} 
                      className="text-amber-500 focus:ring-amber-500 w-4 h-4" 
                    />
                    <div className="flex-1">
                      <span className="font-bold text-slate-900 dark:text-white text-sm block">PayHere Sri Lanka (Online Sandbox)</span>
                      <span className="text-slate-500 dark:text-slate-400 text-xs">Visa, MasterCard, FriMi, Genie & Online Banking</span>
                    </div>
                    <CreditCard className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </label>

                  <label className={`flex items-center gap-3 p-3.5 border-2 rounded-2xl cursor-pointer transition-all ${formData.paymentMethod === 'BankTransfer' ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-500/10' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-900'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="BankTransfer" 
                      checked={formData.paymentMethod === 'BankTransfer'} 
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} 
                      className="text-amber-500 focus:ring-amber-500 w-4 h-4" 
                    />
                    <div className="flex-1">
                      <span className="font-bold text-slate-900 dark:text-white text-sm block">Pay on Inspection / Bank Deposit</span>
                      <span className="text-slate-500 dark:text-slate-400 text-xs">Reserve now, verify vehicle in person, pay at dealership</span>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </label>
                </div>

                {/* Math breakdown */}
                <div className="space-y-3 text-sm pt-2">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Refundable Deposit</span>
                    <span className="font-bold text-slate-900 dark:text-white">Rs. {formattedAmount}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Processing & Platform Fee</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE</span>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-end">
                    <span className="text-base font-bold text-slate-900 dark:text-white">Due Today</span>
                    <span className="font-outfit font-black text-3xl text-amber-500">
                      Rs. {formattedAmount}
                    </span>
                  </div>
                  <p className="text-xs text-right text-slate-500">LKR (Sri Lankan Rupees with 2 decimal precision)</p>
                </div>

                {/* Terms checkbox */}
                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    checked={formData.agreed}
                    onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                    className="w-5 h-5 text-amber-500 rounded mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-300 leading-snug cursor-pointer">
                    I agree to the reservation terms, inspection policy, and privacy statement. Deposit is 100% refundable upon vehicle inspection.
                  </label>
                </div>

                {/* Finger-friendly Submit button >= 44px (Slide 6 & Slide 8) */}
                <button
                  type="submit"
                  disabled={!formData.agreed}
                  className={`w-full h-12 min-h-[48px] ${formData.agreed ? 'bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-600 text-white cursor-pointer shadow-lg hover:shadow-amber-500/20' : 'bg-slate-300 dark:bg-dark-700 text-slate-500 cursor-not-allowed'} font-outfit font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2`}
                >
                  <Lock className="w-4 h-4" />
                  <span>PAY NOW (Rs. {formattedAmount})</span>
                </button>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>256-bit SSL encrypted transaction</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>100% money back guarantee on cancellation</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </form>
      )}

      {/* Hidden PayHere Checkout Form (Slide 8 Task 3 & Slide 10 Fix: Formatted .toFixed(2)) */}
      <form ref={payhereFormRef} method="post" action="https://sandbox.payhere.lk/pay/checkout" style={{ display: 'none' }}>
        <input type="hidden" name="merchant_id" value={merchantId} />
        <input type="hidden" name="return_url" value="http://localhost:3000/checkout/success" />
        <input type="hidden" name="cancel_url" value="http://localhost:3000/checkout/cancel" />
        <input type="hidden" name="notify_url" value="http://localhost:3000/api/notify" />
        <input type="hidden" name="order_id" value={orderId} />
        <input type="hidden" name="items" value={itemDescription} />
        <input type="hidden" name="currency" value={currency} />
        <input type="hidden" name="amount" value={formattedAmount} />
        <input type="hidden" name="first_name" value={formData.firstName} />
        <input type="hidden" name="last_name" value={formData.lastName} />
        <input type="hidden" name="email" value={formData.email} />
        <input type="hidden" name="phone" value={formData.phone} />
        <input type="hidden" name="address" value={formData.address} />
        <input type="hidden" name="city" value={formData.city} />
        <input type="hidden" name="country" value="Sri Lanka" />
        <input type="hidden" name="hash" value={hash} />
      </form>

    </div>
  );
}
