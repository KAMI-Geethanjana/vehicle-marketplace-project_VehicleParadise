import React from 'react';
import { ShoppingCart, Heart, MessageSquare, Sun, Moon, User, LayoutDashboard, Settings, Menu, X, Car, Shield } from 'lucide-react';

export default function Navbar({ 
  currentView, 
  setCurrentView, 
  theme, 
  toggleTheme, 
  favoritesCount = 0, 
  cartCount = 0,
  user,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'browse', label: 'Browse' },
    { id: 'sell', label: 'Sell' },
    { id: 'dealers', label: 'Dealers' },
    { id: 'compare', label: 'Compare' },
    { id: 'finance', label: 'Finance' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-dark-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo (Responsive max-width to prevent mobile overflow - Slide 10) */}
          <div 
            className="flex flex-shrink-0 items-center gap-2 cursor-pointer group max-w-[80%] sm:max-w-none"
            onClick={() => setCurrentView('home')}
          >
            <div className="p-2 bg-slate-900 dark:bg-amber-500 rounded-xl group-hover:bg-amber-500 transition-colors shrink-0">
              <Car className="w-6 h-6 text-white dark:text-slate-900" />
            </div>
            <div className="font-outfit font-black text-xl sm:text-2xl tracking-widest text-slate-900 dark:text-white uppercase flex flex-col leading-none truncate">
              <span>Vehicle</span>
              <span className="text-amber-500 text-[10px] tracking-[0.3em] font-medium -mt-1">Paradise</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setCurrentView(link.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold min-h-[44px] transition-all duration-300 ${
                  currentView === link.id
                    ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            
            <div className="flex items-center gap-2 border-r border-slate-200 dark:border-slate-800 pr-4">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
              </button>

              <button 
                onClick={() => setCurrentView('favorites')}
                className={`p-2.5 rounded-full relative transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${currentView === 'favorites' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-500' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-dark-800'}`}
                title="Favorites"
              >
                <Heart className={`w-5 h-5 ${currentView === 'favorites' ? 'fill-amber-500' : ''}`} />
                {favoritesCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-dark-950 rounded-full"></span>
                )}
              </button>

              <button 
                onClick={() => setCurrentView('cart')}
                className={`p-2.5 rounded-full relative transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${currentView === 'cart' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-500' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-dark-800'}`}
                title="Cart"
              >
                <ShoppingCart className={`w-5 h-5 ${currentView === 'cart' ? 'fill-amber-500' : ''}`} />
                {cartCount > 0 && (
                  <span className="absolute top-0 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-900 text-[10px] font-bold rounded-full px-1 shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2">
                  {user.role === 'admin' && (
                    <button
                      onClick={() => setCurrentView('admin')}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer min-h-[44px] ${
                        currentView === 'admin' 
                          ? 'bg-amber-500 text-white shadow-amber-500/30' 
                          : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 hover:bg-amber-200'
                      }`}
                      title="Admin Operations Console"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Admin</span>
                    </button>
                  )}
                  {user.role === 'seller' && (
                    <button
                      onClick={() => setCurrentView('mydashboard')}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer min-h-[44px] ${
                        currentView === 'mydashboard'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                      title="Seller Dashboard"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      <span>Dashboard</span>
                    </button>
                  )}
                  <button
                    onClick={() => setCurrentView('profile')}
                    className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 dark:bg-dark-800 hover:bg-slate-200 dark:hover:bg-dark-700 text-slate-900 dark:text-white font-bold rounded-full text-xs transition-all shadow-sm cursor-pointer min-h-[44px]"
                  >
                    <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-[10px]">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    {user.name?.split(' ')[0] || 'User'}
                  </button>
                  <button
                    onClick={onLogout}
                    className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 font-bold rounded-full text-xs transition-all shadow-sm cursor-pointer min-h-[44px]"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setCurrentView('auth')}
                  className="px-5 py-2.5 bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 text-white dark:text-slate-900 font-bold rounded-full text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <User className="w-4 h-4" />
                  Sign In
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button & cart icon (Finger-friendly min-h-[44px]) */}
          <div className="md:hidden flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setCurrentView('cart')}
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center relative text-slate-600 dark:text-slate-300 rounded-xl"
              title="View Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-amber-500 text-white text-[10px] font-bold rounded-full px-1 shadow">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-dark-950 border-b border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentView(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl font-bold ${
                  currentView === link.id
                    ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-900'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button 
                onClick={() => { setCurrentView('favorites'); setMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-dark-900 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-300"
              >
                <Heart className="w-4 h-4 text-amber-500" /> Favorites
              </button>
              <button 
                onClick={() => { setCurrentView('cart'); setMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-dark-900 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-300"
              >
                <ShoppingCart className="w-4 h-4 text-amber-500" /> Cart ({cartCount})
              </button>
            </div>
            
            {user ? (
              <>
                {user.role === 'admin' && (
                  <button 
                    onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }}
                    className="w-full mt-2 flex items-center justify-center gap-2 p-3 bg-amber-500 text-white rounded-xl font-bold text-sm cursor-pointer shadow-md"
                  >
                    <Shield className="w-4 h-4" /> Admin Console
                  </button>
                )}
                {user.role === 'seller' && (
                  <button 
                    onClick={() => { setCurrentView('mydashboard'); setMobileMenuOpen(false); }}
                    className="w-full mt-2 flex items-center justify-center gap-2 p-3 bg-slate-800 text-white rounded-xl font-bold text-sm cursor-pointer shadow-md"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Seller Dashboard
                  </button>
                )}
                <button 
                  onClick={() => { setCurrentView('profile'); setMobileMenuOpen(false); }}
                  className="w-full mt-2 flex items-center justify-center gap-2 p-3 bg-slate-100 dark:bg-dark-800 text-slate-900 dark:text-white rounded-xl font-bold text-sm cursor-pointer"
                >
                  <User className="w-4 h-4" /> My Profile
                </button>
                <button 
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="w-full mt-2 flex items-center justify-center gap-2 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl font-bold text-sm cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => { setCurrentView('auth'); setMobileMenuOpen(false); }}
                className="w-full mt-2 flex items-center justify-center gap-2 p-3 bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-900 rounded-xl font-bold text-sm cursor-pointer"
              >
                <User className="w-4 h-4" /> Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
