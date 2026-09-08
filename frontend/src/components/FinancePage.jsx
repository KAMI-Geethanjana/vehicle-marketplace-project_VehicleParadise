import React, { useState } from 'react';

export default function FinancePage() {
  const [price, setPrice] = useState(8900000);
  const [downPayment, setDownPayment] = useState(1500000);
  const [termMonths, setTermMonths] = useState(60);
  const [interestRate, setInterestRate] = useState(12.5);

  const loanAmount = Math.max(0, price - downPayment);
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = loanAmount > 0 ? Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1)) : 0;
  const totalInterest = Math.max(0, (monthlyPayment * termMonths) - loanAmount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header (Wireframe 11) */}
      <div className="space-y-1">
        <h1 className="font-outfit font-black text-3xl text-slate-900 dark:text-white">
          Finance Calculator
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Estimate your monthly vehicle payment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Loan Details Form (Wireframe 11) */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-outfit font-bold text-xl text-slate-900 dark:text-white">
            Loan details
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Vehicle price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Down payment</label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Loan term</label>
                <select
                  value={termMonths}
                  onChange={(e) => setTermMonths(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl"
                >
                  <option value={36}>36 months</option>
                  <option value={48}>48 months</option>
                  <option value={60}>60 months</option>
                  <option value={72}>72 months</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Interest rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl"
              />
            </div>

            <button
              onClick={() => {}}
              className="w-full py-3.5 bg-slate-800 dark:bg-dark-700 hover:bg-slate-900 text-white font-outfit font-bold rounded-xl text-xs shadow-sm transition-all"
            >
              Calculate estimate
            </button>

            <p className="text-[11px] text-slate-400 italic">
              Estimates are for guidance only. Contact lenders for final terms.
            </p>
          </div>
        </div>

        {/* Right Side: Estimated Monthly Payment Card (Wireframe 11) */}
        <div className="lg:col-span-6 bg-slate-100 dark:bg-dark-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Estimated monthly payment
          </span>

          <div className="font-outfit font-black text-4xl sm:text-5xl text-slate-900 dark:text-white pb-6 border-b border-slate-200 dark:border-slate-700">
            Rs. {monthlyPayment.toLocaleString()}
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Loan amount</span>
              <strong className="text-slate-900 dark:text-white">Rs. {loanAmount.toLocaleString()}</strong>
            </div>

            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Total interest</span>
              <strong className="text-slate-900 dark:text-white">Rs. {totalInterest.toLocaleString()}</strong>
            </div>
          </div>

          <button
            onClick={() => {}}
            className="w-full py-3.5 bg-amber-600 dark:bg-amber-500 hover:bg-amber-500 dark:hover:bg-amber-400 text-slate-900 font-outfit font-extrabold rounded-xl text-xs shadow-sm transition-all"
          >
            Explore finance partners
          </button>
        </div>

      </div>

    </div>
  );
}
