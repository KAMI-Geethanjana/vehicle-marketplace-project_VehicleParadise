import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, initialView = 'signin', initialEmail = '' }) {
  const [view, setView] = useState(initialView);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('buyer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setView(initialView);
      setEmail(initialEmail);
    }
  }, [isOpen, initialView, initialEmail]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (view === 'register') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new Error('Please enter a valid email address.');
        }
        
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
          throw new Error('Password must be at least 8 characters long and contain at least one letter and one number.');
        }

        if (password !== confirmPassword) {
          throw new Error('Passwords do not match.');
        }
      }

      const endpoint = view === 'register' ? 'http://localhost:5000/api/register' : 'http://localhost:5000/api/login';
      const body = view === 'register' ? { name, email, password, role } : { email, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (view === 'register') {
        // Switch to login view after successful registration
        setView('signin');
        setError('Account created successfully! Please sign in.');
      } else {
        localStorage.setItem('token', data.token); // Store token
        onAuthSuccess(data.user);
        onClose();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-dark-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-dark-800 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <h2 className="font-outfit font-black text-2xl text-slate-900 dark:text-white mb-2">
            {view === 'signin' ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            {view === 'signin' ? 'Sign in to access your saved vehicles and messages.' : 'Join buyers, sellers and dealers nationwide.'}
          </p>

          {error && (
            <div className={`p-3 mb-4 rounded-xl text-xs font-semibold ${error.includes('success') ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {view === 'register' && (
              <>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2 text-sm">Account Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all ${role === 'buyer' ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 dark:text-slate-400'}`}>
                      <input type="radio" name="role" value="buyer" checked={role === 'buyer'} onChange={() => setRole('buyer')} className="sr-only" />
                      <span className="font-bold text-sm">Buyer</span>
                    </label>
                    <label className={`flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all ${role === 'seller' ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 dark:text-slate-400'}`}>
                      <input type="radio" name="role" value="seller" checked={role === 'seller'} onChange={() => setRole('seller')} className="sr-only" />
                      <span className="font-bold text-sm">Seller / Dealer</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5 text-sm">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-950 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 shadow-sm text-slate-900 dark:text-white"
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5 text-sm">Email Address</label>
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-950 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 shadow-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5 text-sm">Password</label>
              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-950 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 shadow-sm text-slate-900 dark:text-white"
              />
            </div>
            
            {view === 'register' && (
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5 text-sm">Confirm Password</label>
                <input
                  type="password"
                  required
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-950 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 shadow-sm text-slate-900 dark:text-white"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-amber-600 dark:bg-amber-500 hover:bg-amber-500 dark:hover:bg-amber-400 text-white font-outfit font-extrabold rounded-xl text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-wait"
            >
              {loading ? 'Processing...' : view === 'signin' ? 'Sign In' : 'Register'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            {view === 'signin' ? (
              <p className="text-slate-600 dark:text-slate-400">
                Don't have an account?{' '}
                <button type="button" onClick={() => setView('register')} className="text-emerald-600 font-bold hover:underline">
                  Create one
                </button>
              </p>
            ) : (
              <p className="text-slate-600 dark:text-slate-400">
                Already have an account?{' '}
                <button type="button" onClick={() => setView('signin')} className="text-emerald-600 font-bold hover:underline">
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slide-up { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
          .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
          .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
        `}} />
      </div>
    </div>
  );
}
