import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LocationSearch from './components/LocationSearch';
import DateSelector from './components/DateSelector';
import MapboxMap from './components/Map';
import RouteInfo from './components/RouteInfo';
import ThemeToggle from './components/ThemeToggle';
import WeatherWidget from './components/WeatherWidget';
import TokenRewardsWidget from './components/TokenRewardsWidget';
import WalletMenu from './components/WalletMenu';
import JetSelector from './components/JetSelector';
import BookingSummary from './components/BookingSummary';
import Dashboard from './components/Dashboard';
import Logo from './components/Logo';
import Footer from './components/Footer';
import NavigationMenu from './components/NavigationMenu';
import CookieBanner from './components/CookieBanner';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import BehindTheSceneModal from './modals/BehindTheSceneModal';
import HowItWorksModal from './modals/HowItWorksModal';
import ContactModal from './modals/ContactModal';
import SafetyModal from './modals/SafetyModal';
import CookiePolicy from './pages/CookiePolicy';
import AITravelAgent from './pages/AITravelAgent';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import FlightTracker from './pages/FlightTracker';
import VisaServices from './pages/VisaServices';
import NFTCollection from './pages/NFTCollection';
import NotFound from './pages/NotFound';
import Partners from './pages/Partners';
import PartnerSuccess from './pages/PartnerSuccess';
import BookingSuccessPage from './pages/BookingSuccessPage';
import VisaSuccessPage from './pages/VisaSuccessPage';
import type { Location, RouteInfo as RouteInfoType, Weather, Stop, JetCategory, BookingDetails } from './types';
import { jetCategories } from './data/jets';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { MaintenanceProvider } from './context/MaintenanceContext';
import axios from 'axios';
import './i18n';

// Import pages
import FixedOffers from './pages/FixedOffers';
import AdminOffers from './pages/AdminOffers';
import BehindTheScene from './pages/BehindTheScene';
import HowItWorks from './pages/HowItWorks';
import Safety from './pages/Safety';
import Contact from './pages/Contact';
import Crypto from './pages/Crypto';
import GroupCharter from './pages/services/GroupCharter';
import HelicopterCharter from './pages/services/HelicopterCharter';
import PrivateJetCharter from './pages/services/PrivateJetCharter';
import YachtCharter from './pages/services/YachtCharter';
import ICO from './pages/ICO';
import Impressum from './pages/Legal/Impressum';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import TermsConditions from './pages/Legal/TermsConditions';
import ChatSupport from './components/ChatSupport';

// Create a client
const queryClient = new QueryClient();

export default function App() {
  // Theme state
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [showJetSelector, setShowJetSelector] = useState(false);
  const [showBookingSummary, setShowBookingSummary] = useState(false);
  const [showTokenRewards, setShowTokenRewards] = useState(false);
  const [showRouteInfo, setShowRouteInfo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [dashboardView, setDashboardView] = useState('dashboard');

  // Modal state
  const [showBehindTheScene, setShowBehindTheScene] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showSafety, setShowSafety] = useState(false);

  // Booking state
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState("13:00");
  const [returnDate, setReturnDate] = useState<string>("");
  const [returnTime, setReturnTime] = useState("13:00");
  const [isReturn, setIsReturn] = useState(false);
  const [stops, setStops] = useState<Stop[]>([]);
  const [showMultiLeg, setShowMultiLeg] = useState(false);

  // Route state
  const [routeInfo, setRouteInfo] = useState<RouteInfoType | null>(null);
  const [destinationWeather, setDestinationWeather] = useState<Weather | null>(null);
  const [routeDistance, setRouteDistance] = useState<number>(0);
  const [selectedJet, setSelectedJet] = useState<string | undefined>(undefined);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    passengers: 1,
    luggage: 0,
    pets: 0
  });

  // Check if we're on admin subdomain
  const isAdminDomain = window.location.hostname.startsWith('admin.');

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('bookingState');
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        if (state.origin) setOrigin(state.origin);
        if (state.destination) setDestination(state.destination);
        if (state.selectedDate) setSelectedDate(state.selectedDate);
        if (state.selectedTime) setSelectedTime(state.selectedTime);
        if (state.returnDate) setReturnDate(state.returnDate);
        if (state.returnTime) setReturnTime(state.returnTime);
        if (state.isReturn) setIsReturn(state.isReturn);
        if (state.stops) setStops(state.stops);
        if (state.selectedJet) setSelectedJet(state.selectedJet);
        if (state.bookingDetails) setBookingDetails(state.bookingDetails);
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    const state = {
      origin,
      destination,
      selectedDate,
      selectedTime,
      returnDate,
      returnTime,
      isReturn,
      stops,
      selectedJet,
      bookingDetails
    };
    localStorage.setItem('bookingState', JSON.stringify(state));
  }, [origin, destination, selectedDate, selectedTime, returnDate, returnTime, isReturn, stops, selectedJet, bookingDetails]);

  // Only show weather widget when destination is selected and address is valid
  const shouldShowWeather = destination?.address && destination.address.length > 0;

  // Get selected jet details
  const selectedJetDetails = selectedJet ? jetCategories.find(jet => jet.id === selectedJet) : undefined;

  // Handlers
  const handleOriginChange = (location: Location) => {
    setOrigin(location);
  };

  const handleDestinationChange = (location: Location) => {
    setDestination(location);
  };

  const handleStopChange = (stop: Stop, index: number) => {
    setStops(prev => {
      const newStops = [...prev];
      newStops[index] = stop;
      return newStops;
    });
  };

  const addStop = () => {
    setStops(prev => [...prev, { lat: 0, lng: 0, address: '', date: selectedDate || '', time: selectedTime || '' }]);
  };

  const removeStop = (index: number) => {
    setStops(prev => prev.filter((_, i) => i !== index));
  };

  const calculateRoute = () => {
    if (!origin || !destination) return;

    try {
      const R = 6371; // Earth's radius in km
      
      // Calculate total distance including stops
      let totalDistance = 0;
      let points = [origin, ...stops, destination];
      
      for (let i = 0; i < points.length - 1; i++) {
        const point1 = points[i];
        const point2 = points[i + 1];
        
        const dLat = (point2.lat - point1.lat) * Math.PI / 180;
        const dLon = (point2.lng - point1.lng) * Math.PI / 180;
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        totalDistance += R * c;
      }

      setRouteDistance(totalDistance);
      setShowTokenRewards(true);
      setShowJetSelector(true);
      setIsFullscreen(true);
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  };

  const handleJetSelect = (jetId: string) => {
    setSelectedJet(jetId);
    setShowJetSelector(false);
    setIsFullscreen(false);
    setShowBookingSummary(true);
  };

  const handleBack = () => {
    if (showBookingSummary) {
      setShowBookingSummary(false);
      setShowJetSelector(true);
      setIsFullscreen(true);
    } else if (showJetSelector) {
      setShowJetSelector(false);
      setIsFullscreen(false);
    }
  };

  const handleDateContinue = () => {
    if (selectedDate && selectedTime) {
      setShowDateSelector(false);
      calculateRoute();
    }
  };

  const handleReturnDateSelect = () => {
    setShowDateSelector(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <MaintenanceProvider>
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {isAdminDomain ? (
                    // Admin Routes
                    <>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/login" element={<AdminLogin />} />
                      <Route path="/dashboard/*" element={<AdminDashboard />} />
                      <Route path="/offers" element={<AdminOffers />} />
                      <Route path="*" element={<NotFound />} />
                    </>
                  ) : (
                    // Main Site Routes
                    <>
                      {/* Service Routes */}
                      <Route path="/services/private-jet-charter" element={<PrivateJetCharter />} />
                      <Route path="/services/group-charter" element={<GroupCharter />} />
                      <Route path="/services/helicopter-charter" element={<HelicopterCharter />} />
                      <Route path="/services/yacht-charter" element={<YachtCharter />} />

                      {/* Legal Routes */}
                      <Route path="/impressum" element={<Impressum />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/terms" element={<TermsConditions />} />

                      {/* Web3 Routes */}
                      <Route path="/web3">
                        <Route path="flight-tracker" element={<FlightTracker />} />
                        <Route path="nft-collection" element={<NFTCollection />} />
                        <Route path="ico" element={<ICO />} />
                        <Route path="ai-travel-agent" element={<AITravelAgent />} />
                      </Route>

                      {/* Other Routes */}
                      <Route path="/cookie-policy" element={<CookiePolicy />} />
                      <Route path="/fixed-offers" element={<FixedOffers />} />
                      <Route path="/behind-the-scene" element={<BehindTheScene />} />
                      <Route path="/how-it-works" element={<HowItWorks />} />
                      <Route path="/safety" element={<Safety />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/crypto" element={<Crypto />} />
                      <Route path="/visa-services" element={<VisaServices />} />
                      <Route path="/partners" element={<Partners />} />
                      <Route path="/partner-success" element={<PartnerSuccess />} />
                      <Route path="/booking-success" element={<BookingSuccessPage />} />
                      <Route path="/visa-success" element={<VisaSuccessPage />} />

                      {/* Redirect old routes to new web3 routes */}
                      <Route path="/flight-tracker" element={<Navigate to="/web3/flight-tracker" replace />} />
                      <Route path="/nft-collection" element={<Navigate to="/web3/nft-collection" replace />} />
                      <Route path="/ico" element={<Navigate to="/web3/ico" replace />} />
                      <Route path="/ai-travel-agent" element={<Navigate to="/web3/ai-travel-agent" replace />} />

                      {/* Home Route */}
                      <Route path="/" element={
                        <div className="min-h-screen bg-white">
                          {/* Header */}
                          <header className="fixed w-full top-0 z-50 bg-white border-b border-gray-100">
                            <div className="max-w-8xl mx-auto">
                              <div className="flex items-center justify-between py-4 px-6">
                                <div className="flex items-center gap-8">
                                  <Logo />
                                  <NavigationMenu />
                                </div>
                                <div className="flex items-center gap-4">
                                  <WalletMenu onShowDashboard={() => {}} />
                                  <ThemeToggle />
                                </div>
                              </div>
                            </div>
                          </header>

                          {/* Main Content */}
                          <main className="flex-1 pt-[108px]">
                            {/* Map Container */}
                            <div className="fixed inset-x-2.5 top-[108px] bottom-2.5 rounded-3xl bg-white shadow-2xl overflow-hidden">
                              {/* Map */}
                              <div className="absolute inset-0">
                                <MapboxMap
                                  origin={origin}
                                  destination={destination}
                                  isReturn={isReturn}
                                  stops={stops}
                                  selectedDate={selectedDate}
                                  selectedTime={selectedTime}
                                />
                              </div>

                              {/* Booking Interface */}
                              <div 
                                className={`absolute z-10 transition-all duration-300 ease-in-out ${
                                  isFullscreen 
                                    ? 'inset-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20' 
                                    : showBookingSummary
                                      ? 'inset-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20'
                                      : 'top-4 left-4'
                                }`}
                              >
                                <div 
                                  className={`h-full ${
                                    isFullscreen || showBookingSummary ? 'w-full' : 'w-[320px]'
                                  }`}
                                >
                                  {showDateSelector ? (
                                    <DateSelector
                                      selectedDate={selectedDate}
                                      selectedTime={selectedTime}
                                      returnDate={returnDate}
                                      returnTime={returnTime}
                                      isReturn={isReturn}
                                      onDateSelect={setSelectedDate}
                                      onTimeSelect={setSelectedTime}
                                      onReturnDateSelect={setReturnDate}
                                      onReturnTimeSelect={setReturnTime}
                                      onBack={() => setShowDateSelector(false)}
                                      onContinue={handleDateContinue}
                                    />
                                  ) : showJetSelector ? (
                                    <JetSelector
                                      selectedJet={selectedJet}
                                      onSelect={handleJetSelect}
                                      requiredCapacity={bookingDetails.passengers}
                                      distance={routeDistance}
                                      onBack={handleBack}
                                      isFullscreen={isFullscreen}
                                      origin={origin}
                                      destination={destination}
                                    />
                                  ) : showBookingSummary && selectedJetDetails ? (
                                    <BookingSummary
                                      origin={origin!}
                                      destination={destination!}
                                      stops={stops}
                                      selectedDate={selectedDate}
                                      selectedTime={selectedTime}
                                      returnDate={returnDate}
                                      returnTime={returnTime}
                                      isReturn={isReturn}
                                      bookingDetails={bookingDetails}
                                      selectedJet={selectedJetDetails}
                                      onBack={handleBack}
                                    />
                                  ) : (
                                    <LocationSearch
                                      onOriginChange={handleOriginChange}
                                      onDestinationChange={handleDestinationChange}
                                      onDateSelect={() => setShowDateSelector(true)}
                                      onCalculate={calculateRoute}
                                      isReturn={isReturn}
                                      onReturnChange={setIsReturn}
                                      stops={stops}
                                      onStopChange={handleStopChange}
                                      onAddStop={addStop}
                                      onRemoveStop={removeStop}
                                      selectedDate={selectedDate}
                                      selectedTime={selectedTime}
                                      returnDate={returnDate}
                                      returnTime={returnTime}
                                      onReturnDateSelect={handleReturnDateSelect}
                                      showMultiLeg={showMultiLeg}
                                      onMultiLegChange={setShowMultiLeg}
                                    />
                                  )}
                                </div>
                              </div>

                              {/* Map Tools */}
                              <div className="absolute bottom-4 right-4 z-50">
                                <div className="flex flex-col gap-4">
                                  {showTokenRewards && (
                                    <TokenRewardsWidget 
                                      distance={routeDistance}
                                      onClose={() => setShowTokenRewards(false)}
                                    />
                                  )}
                                  {shouldShowWeather && (
                                    <WeatherWidget 
                                      location={destination}
                                      onClose={() => setDestination(null)}
                                    />
                                  )}
                                </div>
                              </div>

                              {showRouteInfo && routeInfo && (
                                <div className="absolute bottom-4 left-4 right-4 mx-auto max-w-4xl z-40">
                                  <RouteInfo
                                    routeInfo={routeInfo}
                                    destinationWeather={destinationWeather}
                                    onClose={() => setShowRouteInfo(false)}
                                  />
                                </div>
                              )}
                            </div>

                            {/* Spacer for content below fixed map */}
                            <div className="h-[calc(100vh-100px)]" />
                          </main>

                          {/* Footer */}
                          <footer className="relative z-10 bg-gray-50">
                            <Footer />
                          </footer>

                          {/* Chat Support */}
                          <ChatSupport />

                          {/* Modals */}
                          {showDashboard && (
                            <Dashboard 
                              onClose={() => setShowDashboard(false)}
                              onShowHistory={() => {}}
                              initialView={dashboardView}
                            />
                          )}
                        </div>
                      } />

                      {/* 404 Route */}
                      <Route path="*" element={<NotFound />} />
                    </>
                  )}
                </Routes>
                
                {!isAdminDomain && <CookieBanner />}

                {/* Page Modals - Only show on main site */}
                {!isAdminDomain && (
                  <>
                    {showBehindTheScene && (
                      <BehindTheSceneModal onClose={() => setShowBehindTheScene(false)} />
                    )}
                    
                    {showHowItWorks && (
                      <HowItWorksModal onClose={() => setShowHowItWorks(false)} />
                    )}
                    
                    {showContact && (
                      <ContactModal onClose={() => setShowContact(false)} />
                    )}
                    
                    {showSafety && (
                      <SafetyModal onClose={() => setShowSafety(false)} />
                    )}
                  </>
                )}
              </Suspense>
            </ErrorBoundary>
          </MaintenanceProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}