import React, { useState } from 'react';

export default function AuthPage({ onAuthSuccess }) {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    onAuthSuccess(signInEmail || 'user@paradise.lk');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    onAuthSuccess(registerEmail || 'user@paradise.lk');
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Left Column: Sign in (Wireframe 8) */}
        <div className="space-y-6 max-w-md">
          <h2 className="font-outfit font-bold text-2xl text-slate-900 dark:text-white">
            Sign in
          </h2>

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
              className="w-full py-3 bg-slate-800 dark:bg-dark-700 hover:bg-slate-900 dark:hover:bg-dark-600 text-white font-outfit font-bold rounded-xl text-xs shadow-sm transition-all"
            >
              Sign in
            </button>

            <div className="text-center">
              <a href="#" className="text-slate-500 hover:underline">Forgot password?</a>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-center">
              <span className="text-slate-500 block">New to Vehicle Paradise?</span>
              <button
                type="button"
                className="w-full py-3 bg-slate-800 dark:bg-dark-700 hover:bg-slate-900 dark:hover:bg-dark-600 text-white font-outfit font-bold rounded-xl text-xs"
              >
                Create an account
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Create account Box (Wireframe 8) */}
        <div className="bg-slate-100 dark:bg-dark-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 max-w-md">
          <div>
            <h2 className="font-outfit font-bold text-2xl text-slate-900 dark:text-white">
              Create account
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Join buyers, sellers and dealers nationwide.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Full name</label>
              <input
                type="text"
                required
                placeholder="Enter full name"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Email address</label>
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Choose password</label>
              <input
                type="password"
                required
                placeholder="Enter choose password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-600 dark:bg-amber-500 hover:bg-amber-500 dark:hover:bg-amber-400 text-slate-900 font-outfit font-extrabold rounded-xl text-xs shadow-sm transition-all"
            >
              Register
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
