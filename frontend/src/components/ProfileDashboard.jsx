import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, Phone, MapPin, Shield, CheckCircle, AlertCircle } from 'lucide-react';

export default function ProfileDashboard({ user, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [phone, setPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  // Password change states
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setProfile(data);
      setPhone(data.phone || '');
      setShippingAddress(data.shipping_address || '');
      setBillingAddress(data.billing_address || '');
    } catch (err) {
      setError('Failed to load profile details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ phone, shipping_address: shippingAddress, billing_address: billingAddress })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess('Profile details updated successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/profile/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setSuccess('Password updated successfully');
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="p-20 text-center text-slate-500">Loading Profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full border-2 border-cyan-400 bg-slate-800 flex items-center justify-center">
            <User className="w-10 h-10 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-outfit">{profile?.full_name || user?.name}</h1>
            <p className="text-cyan-400 font-medium flex items-center gap-2 mt-1">
              <Shield className="w-4 h-4" /> Status: {profile?.role === 'admin' ? 'Administrator' : 'Active Member'}
            </p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-full font-bold text-sm transition-colors"
        >
          Logout
        </button>
      </div>

      {(error || success) && (
        <div className={`p-4 rounded-xl mb-8 flex items-center gap-3 font-semibold ${error ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
          {error ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
          {error || success}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info Form */}
        <div className="bg-white dark:bg-dark-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold font-outfit text-slate-900 dark:text-white mb-6">Contact & Addresses</h2>
          
          <div className="mb-6 space-y-4">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
              <Mail className="w-4 h-4" /> <span>{profile?.email}</span>
            </div>
          </div>

          <form onSubmit={handleUpdateDetails} className="space-y-4 text-sm">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Shipping Address</label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input 
                  type="text" 
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Billing Address</label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input 
                  type="text" 
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-colors mt-2">
              Save Details
            </button>
          </form>
        </div>

        {/* Security / Password Form */}
        <div className="bg-white dark:bg-dark-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold font-outfit text-slate-900 dark:text-white mb-6">Security & Password</h2>
          
          <form onSubmit={handlePasswordChange} className="space-y-4 text-sm">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Current Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input 
                  type="password" 
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">New Password</label>
              <div className="relative">
                <Shield className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input 
                  type="password" 
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors mt-2">
              Update Password
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
