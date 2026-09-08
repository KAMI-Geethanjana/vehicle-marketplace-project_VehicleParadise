import React from 'react';
import { Users, Car, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header (Wireframe 14) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-outfit font-black text-3xl text-slate-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Operations overview
          </p>
        </div>

        <div className="px-4 py-2 rounded-full bg-slate-800 dark:bg-dark-700 text-white text-xs font-bold self-start">
          Admin: A. Fernando
        </div>
      </div>

      {/* Metrics Cards Grid (Wireframe 14) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-slate-100 dark:bg-dark-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Total users</span>
          <span className="font-outfit font-black text-3xl text-slate-900 dark:text-white">12,480</span>
        </div>

        <div className="bg-slate-100 dark:bg-dark-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Active listings</span>
          <span className="font-outfit font-black text-3xl text-slate-900 dark:text-white">3,842</span>
        </div>

        <div className="bg-slate-100 dark:bg-dark-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Pending approvals</span>
          <span className="font-outfit font-black text-3xl text-amber-600 dark:text-amber-400">28</span>
        </div>

        <div className="bg-slate-100 dark:bg-dark-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Reports open</span>
          <span className="font-outfit font-black text-3xl text-rose-500">6</span>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Listing Approvals (Wireframe 14) */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-outfit font-bold text-xl text-slate-900 dark:text-white">
            Listing approvals
          </h2>

          <div className="space-y-3 text-xs">
            {[
              'Toyota Corolla 2021',
              'Nissan Leaf 2022',
              'BMW 3 Series 2019'
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-white dark:bg-dark-800 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
                <span className="font-outfit font-bold text-slate-900 dark:text-white text-sm">{item}</span>
                <button className="px-4 py-1.5 bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 font-bold rounded-full border border-amber-300 dark:border-amber-500/40">
                  Review
                </button>
              </div>
            ))}
          </div>

          <button className="px-6 py-3 bg-slate-800 dark:bg-dark-700 text-white font-outfit font-bold rounded-xl text-xs">
            View all approvals
          </button>
        </div>

        {/* Right Quick Management (Wireframe 14) */}
        <div className="lg:col-span-5 bg-slate-100 dark:bg-dark-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="font-outfit font-bold text-base text-slate-900 dark:text-white">
            Quick management
          </h2>

          <div className="space-y-3">
            <button className="w-full py-3.5 bg-slate-800 dark:bg-dark-700 hover:bg-slate-900 text-white font-outfit font-bold rounded-xl text-xs">
              Manage users
            </button>
            <button className="w-full py-3.5 bg-slate-800 dark:bg-dark-700 hover:bg-slate-900 text-white font-outfit font-bold rounded-xl text-xs">
              Verify dealers
            </button>
            <button className="w-full py-3.5 bg-slate-800 dark:bg-dark-700 hover:bg-slate-900 text-white font-outfit font-bold rounded-xl text-xs">
              Categories & brands
            </button>
            <button className="w-full py-3.5 bg-slate-800 dark:bg-dark-700 hover:bg-slate-900 text-white font-outfit font-bold rounded-xl text-xs">
              Reports & messages
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
