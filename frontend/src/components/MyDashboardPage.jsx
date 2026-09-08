import React from 'react';
import { Plus, Edit, Eye, MoreHorizontal } from 'lucide-react';

export default function MyDashboardPage({ onListVehicle }) {
  const listings = [
    { name: '2021 Toyota Corolla', status: 'Published', views: 683 },
    { name: '2018 Honda Civic', status: 'Pending review', views: 245 },
    { name: '2019 Yamaha FZ', status: 'Published', views: 320 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header (Wireframe 15) */}
      <div className="space-y-1">
        <h1 className="font-outfit font-black text-3xl text-slate-900 dark:text-white">
          My Dashboard
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Good morning, Nimal
        </p>
      </div>

      {/* Metrics Bar (Wireframe 15) */}
      <div className="bg-slate-100 dark:bg-dark-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-10">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Your listings</span>
            <span className="font-outfit font-black text-3xl text-slate-900 dark:text-white">4</span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Views this week</span>
            <span className="font-outfit font-black text-3xl text-slate-900 dark:text-white">1,248</span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Unread messages</span>
            <span className="font-outfit font-black text-3xl text-amber-600 dark:text-amber-400">7</span>
          </div>
        </div>

        <button
          onClick={onListVehicle}
          className="px-6 py-3.5 bg-slate-800 dark:bg-dark-700 hover:bg-slate-900 text-white font-outfit font-bold rounded-xl text-xs shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>List a vehicle</span>
        </button>

      </div>

      {/* Recent Listings Table (Wireframe 15) */}
      <div className="space-y-4">
        <h2 className="font-outfit font-bold text-xl text-slate-900 dark:text-white">
          Recent listings
        </h2>

        <div className="bg-white dark:bg-dark-800 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-dark-900 text-slate-500 dark:text-slate-400 uppercase font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">LISTING</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">VIEWS</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {listings.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-dark-700/50 transition-colors">
                  <td className="p-4 font-outfit font-bold text-slate-900 dark:text-white text-sm">{item.name}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full font-semibold text-[11px] ${
                      item.status === 'Published'
                        ? 'bg-slate-200 dark:bg-dark-700 text-slate-800 dark:text-slate-200'
                        : 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-medium">{item.views}</td>
                  <td className="p-4 text-right">
                    <span className="text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer font-medium">
                      Edit View ...
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
