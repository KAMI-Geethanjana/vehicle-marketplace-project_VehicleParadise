import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import VehicleListingPage from './components/VehicleListingPage';
import VehicleDetailsPage from './components/VehicleDetailsPage';
import ReservationSummaryPage from './components/ReservationSummaryPage';
import BookingCheckoutPage from './components/BookingCheckoutPage';
import MessagesPage from './components/MessagesPage';
import SellVehiclePage from './components/SellVehiclePage';
import AuthPage from './components/AuthPage';
import FavoritesPage from './components/FavoritesPage';
import ProfileDashboard from './components/ProfileDashboard';
import ComparePage from './components/ComparePage';
import FinancePage from './components/FinancePage';
import ContactPage from './components/ContactPage';
import DealersPage from './components/DealersPage';
import AdminDashboardPage from './components/AdminDashboardPage';
import MyDashboardPage from './components/MyDashboardPage';
import Footer from './components/Footer';
import CartPage from './components/CartPage';
import { VEHICLES } from './data/vehicles';

export default function App() {
  const [vehicles, setVehicles] = useState(VEHICLES);
  const [currentView, setCurrentView] = useState('home'); 
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setVehicles(data);
        } else {
          setVehicles(VEHICLES);
        }
        setLoadingProducts(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setVehicles(VEHICLES); // Fallback to hardcoded if backend is down
        setLoadingProducts(false);
      });
  }, []); 
  const [theme, setTheme] = useState('light');
  
  // Persistent User Authentication in localStorage
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('vp_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('vp_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('vp_user');
      }
    } catch (e) {
      console.error('Failed to sync user to localStorage:', e);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('vp_user');
    setUser(null);
    setCurrentView('home');
  };

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [reservedVehicle, setReservedVehicle] = useState(null);

  // Persistent Favorites in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('vp_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vp_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage:', e);
    }
  }, [favorites]);

  // Persistent Cart in localStorage (Fixes Week 09 Common Bug #3: Cart empties on refresh)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('vp_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vp_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  const [listingFilters, setListingFilters] = useState({});

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleToggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Cart operations with input sanitization and zero/negative protection
  const handleAddToCart = (vehicle, quantity = 1) => {
    const validQty = Math.max(1, parseInt(quantity, 10) || 1);
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === vehicle.id);
      if (existingIndex > -1) {
        return prev.map((item, idx) => 
          idx === existingIndex 
            ? { ...item, quantity: (parseInt(item.quantity, 10) || 1) + validQty }
            : item
        );
      }
      return [...prev, {
        id: vehicle.id,
        name: vehicle.name,
        shortName: vehicle.shortName || vehicle.name,
        make: vehicle.make,
        price: parseFloat(vehicle.price) || 0,
        priceDisplay: vehicle.priceDisplay || `Rs. ${vehicle.price?.toLocaleString()}`,
        image: vehicle.image,
        location: vehicle.location,
        condition: vehicle.condition,
        quantity: validQty
      }];
    });
  };

  const handleUpdateCartQuantity = (id, newQuantity) => {
    // Math accuracy & disallow zero/negative quantities (Week 09 Task 3)
    const validQty = Math.max(1, parseInt(newQuantity, 10) || 1);
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: validQty } : item))
    );
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 1), 0);

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateBrowse = (filters = {}) => {
    setListingFilters(filters);
    setCurrentView('browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReserveViewing = (vehicle) => {
    setReservedVehicle(vehicle);
    setCurrentView('reservation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddUserVehicle = (newVehicle) => {
    setVehicles(prev => [newVehicle, ...prev]);
    setCurrentView('browse');
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 app-bg overflow-x-hidden w-full">
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        theme={theme}
        toggleTheme={toggleTheme}
        favoritesCount={favorites.length}
        cartCount={cartCount}
        unreadMessagesCount={1}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            vehicles={vehicles}
            onSelectVehicle={handleSelectVehicle}
            onSelectCategory={(cat) => handleNavigateBrowse({ searchMake: cat })}
            onNavigateBrowse={handleNavigateBrowse}
          />
        )}

        {currentView === 'browse' && (
          <VehicleListingPage
            vehicles={vehicles}
            onSelectVehicle={handleSelectVehicle}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            cart={cart}
            initialFilters={listingFilters}
          />
        )}

        {currentView === 'details' && selectedVehicle && (
          <VehicleDetailsPage
            vehicle={selectedVehicle}
            onSaveVehicle={() => handleToggleFavorite(selectedVehicle.id)}
            isSaved={favorites.includes(selectedVehicle.id)}
            onMessageSeller={() => setCurrentView('messages')}
            onReserveViewing={handleReserveViewing}
            onAddToCart={() => handleAddToCart(selectedVehicle)}
            isInCart={cart.some(c => c.id === selectedVehicle.id)}
          />
        )}

        {currentView === 'reservation' && (
          <ReservationSummaryPage
            reservedVehicle={reservedVehicle || vehicles[0]}
            onRemoveReservation={() => setReservedVehicle(null)}
            onContinueShopping={() => setCurrentView('browse')}
            onProceedToCheckout={() => setCurrentView('checkout')}
          />
        )}

        {currentView === 'checkout' && (
          user ? (
            <BookingCheckoutPage
              reservedVehicle={reservedVehicle}
              cart={cart}
              onClearCart={handleClearCart}
              onCheckoutComplete={() => setCurrentView('home')}
            />
          ) : (
            <AuthPage onAuthSuccess={(u) => { setUser(u); setCurrentView('checkout'); }} />
          )
        )}

        {currentView === 'messages' && (
          <MessagesPage />
        )}

        {currentView === 'sell' && (
          user ? <SellVehiclePage user={user} onVehicleAdded={handleAddUserVehicle} /> : <AuthPage onAuthSuccess={(u) => { setUser(u); setCurrentView('sell'); }} />
        )}

        {currentView === 'auth' && (
          <AuthPage
            onAuthSuccess={(u) => { setUser(u); setCurrentView('profile'); }}
          />
        )}

        {currentView === 'profile' && (
          user ? <ProfileDashboard user={user} onLogout={handleLogout} /> : <AuthPage onAuthSuccess={(u) => { setUser(u); setCurrentView('profile'); }} />
        )}

        {currentView === 'favorites' && (
          <FavoritesPage
            vehicles={Array.isArray(vehicles) && vehicles.length > 0 ? vehicles : VEHICLES}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectVehicle={handleSelectVehicle}
            onNavigateCompare={() => setCurrentView('compare')}
            onNavigateBrowse={() => setCurrentView('browse')}
          />
        )}

        {currentView === 'compare' && (
          <ComparePage
            vehicles={vehicles}
            onAddMoreToCompare={() => setCurrentView('browse')}
          />
        )}

        {currentView === 'finance' && (
          <FinancePage />
        )}

        {currentView === 'contact' && (
          <ContactPage />
        )}

        {currentView === 'dealers' && (
          <DealersPage
            onNavigateBrowse={(dealerName) => handleNavigateBrowse({ searchMake: dealerName })}
            onContactDealer={() => setCurrentView('messages')}
          />
        )}

        {currentView === 'admin' && (
          user && user.role === 'admin' ? (
            <AdminDashboardPage user={user} />
          ) : (
            <div className="max-w-4xl mx-auto px-4 py-12">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-8 text-center space-y-4 mb-6">
                <h2 className="font-outfit font-black text-2xl text-slate-900 dark:text-white">Admin Privileges Required</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Please sign in with administrator credentials (e.g. <code>admin@vehicleparadise.com / admin123</code>) to access the operations console.
                </p>
              </div>
              <AuthPage onAuthSuccess={(u) => { setUser(u); setCurrentView('admin'); }} />
            </div>
          )
        )}

        {currentView === 'mydashboard' && (
          user ? (
            <MyDashboardPage 
              user={user} 
              vehicles={vehicles} 
              onListVehicle={() => setCurrentView('sell')} 
              onNavigateBrowse={() => setCurrentView('browse')} 
            />
          ) : (
            <AuthPage onAuthSuccess={(u) => { setUser(u); setCurrentView('mydashboard'); }} />
          )
        )}

        {currentView === 'cart' && (
          <CartPage
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onNavigate={(view) => setCurrentView(view)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(v) => setCurrentView(v)} />

    </div>
  );
}
