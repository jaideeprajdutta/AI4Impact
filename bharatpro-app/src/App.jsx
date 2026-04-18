import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';

/* Customer-facing pages */
const Landing = lazy(() => import('./pages/Landing'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const VoiceAssistant = lazy(() => import('./pages/VoiceAssistant'));
const MaterialsStore = lazy(() => import('./pages/MaterialsStore'));
const TrustReviews = lazy(() => import('./pages/TrustReviews'));
const OrderTracking = lazy(() => import('./pages/OrderTracking'));

/* Worker Portal pages */
const WorkerRegister = lazy(() => import('./pages/worker/Register'));
const WorkerDashboard = lazy(() => import('./pages/worker/Dashboard'));
const WorkerJobs = lazy(() => import('./pages/worker/Jobs'));
const WorkerEarnings = lazy(() => import('./pages/worker/Earnings'));
const WorkerVoice = lazy(() => import('./pages/worker/Voice'));
const WorkerProfile = lazy(() => import('./pages/worker/Profile'));

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-pulse">
          <img src="/logo.png" alt="Bharat Pro" className="h-24 w-auto opacity-50" />
        </div>
        <span className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">Loading...</span>
      </div>
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(() => {
    // Check if user has already seen the intro
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    return !hasSeenIntro;
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
    localStorage.setItem('hasSeenIntro', 'true');
  };

  return (
    <BrowserRouter>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Customer-facing */}
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/voice" element={<VoiceAssistant />} />
          <Route path="/materials" element={<MaterialsStore />} />
          <Route path="/trust" element={<TrustReviews />} />
          <Route path="/order-tracking/:id" element={<OrderTracking />} />

          {/* Worker Portal */}
          <Route path="/worker/register" element={<WorkerRegister />} />
          <Route path="/worker/dashboard" element={<WorkerDashboard />} />
          <Route path="/worker/jobs" element={<WorkerJobs />} />
          <Route path="/worker/earnings" element={<WorkerEarnings />} />
          <Route path="/worker/voice" element={<WorkerVoice />} />
          <Route path="/worker/profile" element={<WorkerProfile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
