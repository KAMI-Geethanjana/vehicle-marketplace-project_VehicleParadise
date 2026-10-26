import React, { useState, useEffect } from 'react';
import { Users, Car, AlertCircle, FileText, CheckCircle2, Plus, Trash2, X, Package, Search, ExternalLink } from 'lucide-react';

export default function AdminDashboardPage({ onNavigate, onRefreshProducts }) {
  const [summary, setSummary] = useState({ products: 0, orders: 0, users: 0, lowStock: 0 });
  const [orders, setOrders] = useState([]);
  const [ads, setAds] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [newAdTitle, setNewAdTitle] = useState('');
  const [newAdImage, setNewAdImage] = useState('');
  const [newAdLink, setNewAdLink] = useState('#');
  const [adSubmitting, setAdSubmitting] = useState(false);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [userSearch, setUserSearch] = useState('');

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

      const prodRes = await fetch('http://localhost:5000/api/admin/products', { headers });
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData);
      }

      const usersRes = await fetch('http://localhost:5000/api/admin/users', { headers });
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData);
      }
    } catch (error) {
      console.error('Failed to load admin data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleCreateAd = async (e) => {
    e.preventDefault();
    if (!newAdTitle.trim() || !newAdImage.trim()) return;

    setAdSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/admin/ads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newAdTitle.trim(),
          imageUrl: newAdImage.trim(),
          link: newAdLink.trim() || '#',
          active: true
        })
      });

      if (res.ok) {
        const created = await res.json();
        setAds(prev => [created, ...prev]);
        setNewAdTitle('');
        setNewAdImage('');
        setNewAdLink('#');
        setIsAdModalOpen(false);
      }
    } catch (err) {
      console.error('Failed to create ad:', err);
    } finally {
      setAdSubmitting(false);
    }
  };

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

  const handleUpdateStock = async (productId, currentStock, delta) => {
    const newStock = Math.max(0, currentStock + delta);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ stock_qty: newStock })
      });
      if (res.ok) {
        setProducts(prev => prev.map(p => (p.id === productId || p._id === productId) ? { ...p, stock_qty: newStock } : p));
        fetchAdminData();
        if (onRefreshProducts) onRefreshProducts();
      }
    } catch (error) {
      console.error('Failed to update stock', error);
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

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to permanently delete this vehicle listing?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/admin/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== productId && p._id !== productId));
        fetchAdminData();
        if (onRefreshProducts) onRefreshProducts();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.message || 'Failed to delete product from database.');
      }
    } catch (err) {
      console.error('Failed to delete product', err);
      alert('Error connecting to backend server.');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to remove this user account?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setUsers(prev => prev.filter(u => u.id !== userId && u._id !== userId));
        fetchAdminData();
      }
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.make?.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.location?.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredUsers = users.filter(u =>
    u.full_name?.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email?.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.role?.toLowerCase().includes(userSearch.toLowerCase())
  );

  if (loading) return <div className="p-20 text-center text-slate-500 font-bold">Loading admin dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-outfit font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
            Admin Console <span className="text-amber-500">.</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            VehicleParadise System Management & Operations Overview
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-full bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-900 text-xs font-bold shadow-md">
            Super Admin
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="bg-white/80 dark:bg-dark-800/80 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Products</span>
            <Car className="w-4 h-4 text-slate-400" />
          </div>
          <span className="font-outfit font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">{summary.products}</span>
        </div>

        <div className="bg-white/80 dark:bg-dark-800/80 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Orders</span>
            <FileText className="w-4 h-4 text-slate-400" />
          </div>
          <span className="font-outfit font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">{summary.orders}</span>
        </div>

        <div 
          onClick={() => setIsUsersModalOpen(true)}
          className="bg-white/80 dark:bg-dark-800/80 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm cursor-pointer hover:border-amber-500/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Users (Manage)</span>
            <Users className="w-4 h-4 text-amber-500" />
          </div>
          <span className="font-outfit font-black text-2xl sm:text-3xl text-amber-600 dark:text-amber-400">{summary.users || users.length}</span>
        </div>

        <div className="bg-white/80 dark:bg-dark-800/80 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Low Stock</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <span className="font-outfit font-black text-2xl sm:text-3xl text-amber-600 dark:text-amber-400">{summary.lowStock}</span>
        </div>

        <div className="bg-white/80 dark:bg-dark-800/80 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Database</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="font-outfit font-black text-xl text-emerald-500 flex items-center gap-2 mt-1">
            Connected OK
          </span>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Recent Orders */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-outfit font-bold text-xl text-slate-900 dark:text-white">
              Recent Orders & Deposits
            </h2>
            <span className="text-xs text-slate-500 font-medium">Auto-synced</span>
          </div>

          <div className="space-y-3 text-xs">
            {orders.length === 0 ? (
              <div className="p-8 bg-slate-50 dark:bg-dark-800 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-slate-500">
                No orders recorded yet.
              </div>
            ) : (
              orders.map((order) => {
                const customerDisplay = order.customer_name || order.user_id?.full_name || 'Registered Customer';
                const emailDisplay = order.customer_email || order.user_id?.email || '';
                return (
                  <div key={order.id} className="p-5 bg-white dark:bg-dark-800 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-outfit font-black text-slate-900 dark:text-white text-sm">Order #{order.id?.slice(-6)}</span>
                        <span className="text-slate-400 font-mono text-[11px]">• {new Date(order.createdAt || Date.now()).toLocaleDateString()}</span>
                      </div>
                      <div className="text-slate-600 dark:text-slate-300">
                        <strong>Customer:</strong> {customerDisplay} {emailDisplay && `(${emailDisplay})`}
                      </div>
                      <div className="text-slate-500 flex items-center gap-3">
                        <span>Items: {order.items?.length || 1} Vehicle(s)</span>
                        <span>•</span>
                        <span className="font-bold text-slate-900 dark:text-white">Total: Rs. {Number(order.total_amount).toLocaleString()}</span>
                        <span>•</span>
                        <span className="text-slate-400">Gateway: {order.payment_method || 'PayHere'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className={`px-3 py-1 rounded-full font-bold text-[11px] ${
                        order.status === 'Paid' 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                          : order.status === 'Completed'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {order.status}
                      </span>
                      <select 
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        className="px-2.5 py-1.5 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-dark-900 text-slate-900 dark:text-white font-semibold cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Quick Management & Ads */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h2 className="font-outfit font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Package className="w-4 h-4 text-amber-500" />
              <span>Catalog & Inventory</span>
            </h2>

            <div className="space-y-2.5">
              <button 
                onClick={() => setIsProductModalOpen(true)}
                className="w-full py-3.5 bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-600 text-white dark:text-slate-900 font-outfit font-bold rounded-xl text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Package className="w-4 h-4" />
                Manage Products & Stock ({products.length})
              </button>

              <button 
                onClick={() => setIsUsersModalOpen(true)}
                className="w-full py-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-outfit font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer border border-amber-500/30"
              >
                <Users className="w-4 h-4" />
                Manage Users ({users.length})
              </button>

              <button 
                onClick={() => { if (onNavigate) onNavigate('sell'); }}
                className="w-full py-3 bg-slate-100 dark:bg-dark-700 hover:bg-slate-200 dark:hover:bg-dark-600 text-slate-800 dark:text-slate-200 font-outfit font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-amber-500" />
                Add New Vehicle Listing
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="font-outfit font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>Promotional Ads</span>
                <span className="text-xs bg-slate-100 dark:bg-dark-700 px-2 py-0.5 rounded-full font-bold">{ads.length}</span>
              </h2>
              <button 
                onClick={() => setIsAdModalOpen(true)}
                className="text-[11px] bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg font-bold shadow flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                NEW AD
              </button>
            </div>

            <div className="space-y-3">
              {ads.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">No active promotional banners.</p>
              ) : (
                ads.map(ad => (
                  <div key={ad.id} className="p-3 bg-slate-50 dark:bg-dark-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <img src={ad.imageUrl} alt="" className="w-8 h-8 rounded object-cover shrink-0 bg-slate-200" />
                      <span className="font-bold truncate text-slate-900 dark:text-white">{ad.title}</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteAd(ad.id)}
                      className="text-red-500 hover:text-red-700 font-semibold shrink-0 cursor-pointer p-1"
                      title="Delete ad"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Modal: New Promotional Ad */}
      {isAdModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-dark-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="font-outfit font-bold text-xl text-slate-900 dark:text-white">Create Promotional Ad</h3>
              <button onClick={() => setIsAdModalOpen(false)} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-dark-800 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAd} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Ad Title / Headline *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 50% Off Vehicle Inspection this weekend"
                  value={newAdTitle}
                  onChange={(e) => setNewAdTitle(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-dark-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Banner Image URL *</label>
                <input 
                  type="text" 
                  required
                  placeholder="https://images.unsplash.com/... or /hero_supercar.jpg"
                  value={newAdImage}
                  onChange={(e) => setNewAdImage(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-dark-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Target Link URL</label>
                <input 
                  type="text" 
                  placeholder="# or https://..."
                  value={newAdLink}
                  onChange={(e) => setNewAdLink(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-dark-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAdModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={adSubmitting}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  {adSubmitting ? 'Publishing...' : 'Publish Ad'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Product Inventory Management */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-dark-900 rounded-3xl p-6 sm:p-8 max-w-4xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-outfit font-bold text-2xl text-slate-900 dark:text-white">Product Inventory Console</h3>
                <p className="text-xs text-slate-500">Live inventory and stock controls in MongoDB</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => { setIsProductModalOpen(false); if (onNavigate) onNavigate('sell'); }}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Vehicle</span>
                </button>
                <button onClick={() => setIsProductModalOpen(false)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-dark-800 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input 
                type="text"
                placeholder="Search products by make, model, or location..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="overflow-y-auto flex-1 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-dark-950 text-slate-500 uppercase font-bold sticky top-0 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3.5">VEHICLE</th>
                    <th className="p-3.5">PRICE</th>
                    <th className="p-3.5">LOCATION</th>
                    <th className="p-3.5">STOCK</th>
                    <th className="p-3.5 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {filteredProducts.map(p => (
                    <tr key={p.id || p._id} className="hover:bg-slate-50 dark:hover:bg-dark-800/50">
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <img src={p.image} alt="" className="w-8 h-8 rounded object-cover shrink-0 bg-slate-100" />
                        <span className="truncate max-w-[200px]">{p.name}</span>
                      </td>
                      <td className="p-3.5 font-semibold text-slate-900 dark:text-white">
                        {p.priceDisplay || `Rs. ${p.price?.toLocaleString()}`}
                      </td>
                      <td className="p-3.5 text-slate-500">{p.location}</td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleUpdateStock(p.id || p._id, p.stock_qty || 0, -1)}
                            className="w-6 h-6 rounded bg-slate-100 dark:bg-dark-700 text-slate-700 dark:text-slate-200 font-black flex items-center justify-center hover:bg-slate-200 cursor-pointer"
                          >
                            -
                          </button>
                          <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${(p.stock_qty || 0) < 3 ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' : 'bg-slate-100 dark:bg-dark-700'}`}>
                            {p.stock_qty || 0}
                          </span>
                          <button 
                            onClick={() => handleUpdateStock(p.id || p._id, p.stock_qty || 0, 1)}
                            className="w-6 h-6 rounded bg-slate-100 dark:bg-dark-700 text-slate-700 dark:text-slate-200 font-black flex items-center justify-center hover:bg-slate-200 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-3.5 text-right">
                        <button 
                          onClick={() => handleDeleteProduct(p.id || p._id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                          title="Delete / Deactivate vehicle"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setIsProductModalOpen(false)}
                className="px-5 py-2.5 bg-slate-900 dark:bg-dark-700 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Users Management Console (Guideline: Manage Users) */}
      {isUsersModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-dark-900 rounded-3xl p-6 sm:p-8 max-w-4xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-outfit font-bold text-2xl text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-6 h-6 text-amber-500" />
                  <span>User Accounts Management</span>
                </h3>
                <p className="text-xs text-slate-500">View registered customers, sellers, and administrators</p>
              </div>
              <button onClick={() => setIsUsersModalOpen(false)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-dark-800 text-slate-500 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search users by name, email, or role..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="overflow-y-auto flex-1 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-dark-950 text-slate-500 uppercase font-bold sticky top-0 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3.5">USER NAME</th>
                    <th className="p-3.5">EMAIL</th>
                    <th className="p-3.5">ROLE</th>
                    <th className="p-3.5">REGISTERED</th>
                    <th className="p-3.5 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-slate-400">No users found.</td>
                    </tr>
                  ) : (
                    filteredUsers.map(u => (
                      <tr key={u._id || u.id} className="hover:bg-slate-50 dark:hover:bg-dark-800/50">
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">{u.full_name}</td>
                        <td className="p-3.5 text-slate-600 dark:text-slate-300">{u.email}</td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                            u.role === 'admin'
                              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                              : u.role === 'seller'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                              : 'bg-slate-100 text-slate-700 dark:bg-dark-700 dark:text-slate-300'
                          }`}>
                            {u.role || 'customer'}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-400 font-mono text-[11px]">
                          {new Date(u.createdAt || Date.now()).toLocaleDateString()}
                        </td>
                        <td className="p-3.5 text-right">
                          <button 
                            onClick={() => handleDeleteUser(u._id || u.id)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                            title="Remove user"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setIsUsersModalOpen(false)}
                className="px-5 py-2.5 bg-slate-900 dark:bg-dark-700 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
