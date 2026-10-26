import React, { useState } from 'react';
import AuthModal from './AuthModal';

export default function AuthPage({ onAuthSuccess }) {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  // Forgot Password states & handler
  const [isForgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setForgotMsg('');
    setForgotError('');
    setForgotLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail, newPassword: forgotNewPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Password reset failed');
      setForgotMsg(data.message || 'Password reset successfully!');
      setTimeout(() => {
        setForgotModalOpen(false);
        setForgotMsg('');
      }, 2000);
    } catch (err) {
      setForgotError(err.message);
    } finally {
      setForgotLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signInEmail, password: signInPassword })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 401 && data.error.includes('email')) {
           // User doesn't exist, trigger auto-registration
           setRegisterModalOpen(true);
           return;
        }
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('vp_user', JSON.stringify(data.user));
      onAuthSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header (Wireframe 8) */}
      <div className="space-y-1">
        <h1 className="font-outfit font-black text-3xl text-slate-900 dark:text-white">
          Welcome to Vehicle Paradise
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Sign in or create an account to save vehicles and connect securely.
        </p>
      </div>

      <div className="flex justify-center items-start mt-8">
        
        {/* Sign in Box (Wireframe 8) */}
        <div className="space-y-6 w-full max-w-md bg-white dark:bg-dark-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h2 className="font-outfit font-bold text-2xl text-slate-900 dark:text-white">
            Sign in
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Welcome back! Please enter your details.
          </p>

          {error && (
            <div className="p-3 rounded-xl text-xs font-semibold bg-red-100 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Email address</label>
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="Enter password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 text-white dark:text-slate-900 font-outfit font-extrabold rounded-xl text-xs shadow-sm transition-all cursor-pointer disabled:cursor-wait"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="text-center">
              <button 
                type="button" 
                onClick={() => { setForgotEmail(signInEmail); setForgotModalOpen(true); }}
                className="text-slate-500 hover:text-amber-500 hover:underline text-xs cursor-pointer bg-transparent border-0"
              >
                Forgot password?
              </button>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-center">
              <span className="text-slate-500 block">New to Vehicle Paradise?</span>
              <button
                type="button"
                onClick={() => setRegisterModalOpen(true)}
                className="w-full py-3 bg-amber-600 dark:bg-amber-500 hover:bg-amber-500 dark:hover:bg-amber-400 text-white font-outfit font-extrabold rounded-xl text-xs transition-all shadow-sm cursor-pointer"
              >
                Create an account
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Forgot Password / Password Reset Modal (Guideline: Password reset option) */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-dark-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="font-outfit font-bold text-xl text-slate-900 dark:text-white">
                Reset Password
              </h3>
              <button 
                onClick={() => setForgotModalOpen(false)} 
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Enter your registered account email and set a new password.
            </p>

            {forgotMsg && (
              <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl font-medium border border-emerald-200">
                {forgotMsg}
              </div>
            )}

            {forgotError && (
              <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl font-medium border border-rose-200">
                {forgotError}
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Account Email *</label>
                <input 
                  type="email" 
                  required
                  placeholder="your.email@example.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-dark-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">New Password *</label>
                <input 
                  type="password" 
                  required
                  placeholder="Enter at least 6 characters"
                  value={forgotNewPassword}
                  onChange={(e) => setForgotNewPassword(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-dark-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setForgotModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={forgotLoading}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow cursor-pointer"
                >
                  {forgotLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setRegisterModalOpen(false)} 
        onAuthSuccess={onAuthSuccess} 
        initialView="register" 
        initialEmail={signInEmail}
      />

    </div>
  );
}
