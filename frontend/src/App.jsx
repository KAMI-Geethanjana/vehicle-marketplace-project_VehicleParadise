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
  const [currentView, setCurrentView] = useState('home'); // 'home', 'browse', 'details', 'reservation', 'checkout', 'messages', 'sell', 'auth', 'favorites', 'compare', 'finance', 'contact', 'dealers', 'admin', 'mydashboard'
  const [theme, setTheme] = useState('light');

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [reservedVehicle, setReservedVehicle] = useState(null);
  const [favorites, setFavorites] = useState(['v1', 'v2', 'v3', 'v4']);
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
    <div className="min-h-screen flex flex-col transition-colors duration-300 app-bg">
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        theme={theme}
        toggleTheme={toggleTheme}
        favoritesCount={favorites.length}
        unreadMessagesCount={1}
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
          <BookingCheckoutPage
            reservedVehicle={reservedVehicle || vehicles[0]}
            onCheckoutComplete={() => setCurrentView('home')}
          />
        )}

        {currentView === 'messages' && (
          <MessagesPage />
        )}

        {currentView === 'sell' && (
          <SellVehiclePage
            onVehicleAdded={handleAddUserVehicle}
          />
        )}

        {currentView === 'auth' && (
          <AuthPage
            onAuthSuccess={() => setCurrentView('mydashboard')}
          />
        )}

        {currentView === 'favorites' && (
          <FavoritesPage
            vehicles={vehicles}
            favorites={favorites}
            onSelectVehicle={handleSelectVehicle}
            onNavigateCompare={() => setCurrentView('compare')}
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
          <AdminDashboardPage />
        )}

        {currentView === 'mydashboard' && (
          <MyDashboardPage
            onListVehicle={() => setCurrentView('sell')}
          />
        )}

        {currentView === 'cart' && (
          <CartPage
            favorites={favorites}
            vehicles={vehicles}
            onToggleFavorite={handleToggleFavorite}
            onNavigate={(view) => setCurrentView(view)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(v) => setCurrentView(v)} />

    </div>
  );
}
