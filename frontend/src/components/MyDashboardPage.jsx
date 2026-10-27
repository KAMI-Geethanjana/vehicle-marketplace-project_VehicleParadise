import React from 'react';
import { Plus, Edit, Eye, MoreHorizontal } from 'lucide-react';

export default function MyDashboardPage({ user, vehicles = [], onListVehicle, onNavigateBrowse }) {
  const [orders, setOrders] = React.useState([]);
  const [loadingOrders, setLoadingOrders] = React.useState(true);

  React.useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoadingOrders(false);
          return;
        }
        const res = await fetch('http://localhost:5000/api/orders/myorders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.error('Failed to fetch user orders:', err);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchUserOrders();
  }, []);

  const userListings = vehicles.filter(v => 
    v.seller === user?.name || (user?.name && v.seller?.toLowerCase() === user.name.toLowerCase())
  );

  const displayListings = userListings.length > 0 ? userListings : [
    { name: '2021 Toyota Corolla Altis', status: 'Published', views: 683, priceDisplay: 'Rs. 8.9M' },
    { name: '2020 Honda Vezel Z', status: 'Published', views: 512, priceDisplay: 'Rs. 10.2M' },
    { name: '2019 Yamaha FZ-S V3', status: 'Pending review', views: 245, priceDisplay: 'Rs. 850,000' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-outfit font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
            User Dashboard <span className="text-amber-500">.</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Good morning, {user?.name || 'Seller'} • Role: <span className="font-bold uppercase text-amber-600 dark:text-amber-400">{user?.role || 'User'}</span>
          </p>
        </div>

        <button
          onClick={onListVehicle}
          className="px-6 py-3.5 bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-600 text-white dark:text-slate-900 font-outfit font-bold rounded-xl text-xs shadow-md flex items-center gap-2 self-start cursor-pointer min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          <span>List a vehicle</span>
        </button>
      </div>

      {/* Metrics Bar */}
      <div className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-8 sm:gap-14">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Your Listings</span>
            <span className="font-outfit font-black text-3xl text-slate-900 dark:text-white">{displayListings.length}</span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Total Reservations</span>
            <span className="font-outfit font-black text-3xl text-slate-900 dark:text-white">{orders.length}</span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Views This Month</span>
            <span className="font-outfit font-black text-3xl text-slate-900 dark:text-white">1,440</span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Inquiries & Leads</span>
            <span className="font-outfit font-black text-3xl text-amber-600 dark:text-amber-400">5</span>
          </div>
        </div>
      </div>

      {/* Orders / Reservations Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-outfit font-bold text-xl text-slate-900 dark:text-white">
            My Reservations & Bookings
          </h2>
          <span className="text-xs text-slate-500">Live MongoDB sync</span>
        </div>

        {loadingOrders ? (
          <div className="p-8 text-center text-slate-400 text-xs">Loading bookings...</div>
        ) : orders.length === 0 ? (
          <div className="p-8 bg-slate-50 dark:bg-dark-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
            <p className="text-slate-500 text-sm">No reservations placed yet.</p>
            <button
              onClick={onNavigateBrowse}
              className="text-xs font-bold text-amber-500 hover:underline"
            >
              Browse vehicles to make a reservation &rarr;
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-dark-800 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-dark-900 text-slate-500 uppercase font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">ORDER ID</th>
                  <th className="p-4">ITEMS</th>
                  <th className="p-4">DATE</th>
                  <th className="p-4">DEPOSIT TOTAL</th>
                  <th className="p-4">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50 dark:hover:bg-dark-700/50">
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">#{o.id?.slice(-6)}</td>
                    <td className="p-4 font-medium">{o.items?.length || 1} Vehicle(s)</td>
                    <td className="p-4 text-slate-500">{new Date(o.createdAt || Date.now()).toLocaleDateString()}</td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">Rs. {Number(o.total_amount).toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        o.status === 'Paid' 
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                          : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Listings Table */}
      <div className="space-y-4">
        <h2 className="font-outfit font-bold text-xl text-slate-900 dark:text-white">
          Active Vehicle Listings
        </h2>

        <div className="bg-white dark:bg-dark-800 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-dark-900 text-slate-500 dark:text-slate-400 uppercase font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">LISTING</th>
                <th className="p-4">PRICE</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">VIEWS</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {displayListings.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-dark-700/50 transition-colors">
                  <td className="p-4 font-outfit font-bold text-slate-900 dark:text-white text-sm">
                    {item.name || `${item.year} ${item.make} ${item.model}`}
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    {item.priceDisplay || `Rs. ${item.price?.toLocaleString()}`}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full font-semibold text-[11px] ${
                      item.status === 'Published' || item.status === undefined
                        ? 'bg-slate-100 dark:bg-dark-700 text-slate-800 dark:text-slate-200'
                        : 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400'
                    }`}>
                      {item.status || 'Active'}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-medium">{item.views || Math.floor(Math.random() * 400 + 100)}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={onNavigateBrowse}
                      className="text-amber-600 dark:text-amber-400 hover:underline font-bold"
                    >
                      View Live
                    </button>
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
