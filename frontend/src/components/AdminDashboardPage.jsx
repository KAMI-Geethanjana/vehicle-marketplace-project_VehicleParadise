import React, { useState, useEffect } from 'react';
import { Users, Car, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState({ products: 0, orders: 0, lowStock: 0 });
  const [orders, setOrders] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };

        const summaryRes = await fetch('http://localhost:5000/api/admin/summary', { headers });
        if (summaryRes.ok) {
          const summaryData = await summaryRes.json();
          setSummary(summaryData);
        }

        const ordersRes = await fetch('http://localhost:5000/api/admin/orders', { headers });
        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(ordersData);
        }

        const adsRes = await fetch('http://localhost:5000/api/admin/ads', { headers });
        if (adsRes.ok) {
          const adsData = await adsRes.json();
          setAds(adsData);
        }
      } catch (error) {
        console.error('Failed to load admin data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleDeleteAd = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/admin/ads/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setAds(ads.filter(ad => ad.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete ad', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading admin dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
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
          Admin Area
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-slate-100 dark:bg-dark-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Total Products</span>
          <span className="font-outfit font-black text-3xl text-slate-900 dark:text-white">{summary.products}</span>
        </div>

        <div className="bg-slate-100 dark:bg-dark-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Total Orders</span>
          <span className="font-outfit font-black text-3xl text-slate-900 dark:text-white">{summary.orders}</span>
        </div>

        <div className="bg-slate-100 dark:bg-dark-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Low Stock</span>
          <span className="font-outfit font-black text-3xl text-amber-600 dark:text-amber-400">{summary.lowStock}</span>
        </div>

        <div className="bg-slate-100 dark:bg-dark-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Database connected</span>
          <span className="font-outfit font-black text-2xl text-emerald-500 flex items-center gap-2 mt-1">
            <CheckCircle2 className="w-6 h-6" /> OK
          </span>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Recent Orders */}
        <div className="lg:col-span-8 space-y-6">
          <h2 className="font-outfit font-bold text-xl text-slate-900 dark:text-white">
            Recent Orders
          </h2>

          <div className="space-y-3 text-xs">
            {orders.length === 0 ? (
              <p className="text-slate-500">No orders found.</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="p-4 bg-white dark:bg-dark-800 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
                  <div>
                    <span className="font-outfit font-bold text-slate-900 dark:text-white text-sm block">Order #{order.id.slice(-6)}</span>
                    <span className="text-slate-500">Customer: {order.user_id?.full_name} | Total: Rs. {order.total_amount}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded font-bold ${order.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {order.status}
                    </span>
                    <select 
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      className="px-2 py-1 border rounded bg-white"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Quick Management & Ads */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-100 dark:bg-dark-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="font-outfit font-bold text-base text-slate-900 dark:text-white">
              Quick management
            </h2>

            <div className="space-y-3">
              <button className="w-full py-3.5 bg-slate-800 dark:bg-dark-700 hover:bg-slate-900 text-white font-outfit font-bold rounded-xl text-xs">
                Manage Products
              </button>
              <button className="w-full py-3.5 bg-slate-800 dark:bg-dark-700 hover:bg-slate-900 text-white font-outfit font-bold rounded-xl text-xs">
                Inventory Status
              </button>
            </div>
          </div>

          <div className="bg-slate-100 dark:bg-dark-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="font-outfit font-bold text-base text-slate-900 dark:text-white flex justify-between items-center">
              <span>Advertisements</span>
              <button onClick={() => alert('Add Ad feature coming soon!')} className="text-[10px] bg-amber-500 text-white px-2 py-1 rounded">
                + NEW AD
              </button>
            </h2>

            <div className="space-y-3">
              {ads.length === 0 ? (
                <p className="text-xs text-slate-500">No active ads.</p>
              ) : (
                ads.map(ad => (
                  <div key={ad.id} className="p-3 bg-white dark:bg-dark-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex justify-between items-center">
                    <span className="font-bold truncate w-2/3">{ad.title}</span>
                    <button 
                      onClick={() => handleDeleteAd(ad.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
