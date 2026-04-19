import { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const currentUser = { id: 999, name: 'You', role: 'customer' };

export default function CustomerProfile() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return <span className="badge badge-success">Completed</span>;
      case 'active': return <span className="badge badge-accent animate-pulse">In Progress</span>;
      case 'pending': return <span className="badge bg-white/10 text-on-surface">Pending</span>;
      case 'cancelled': return <span className="badge bg-error/10 text-error">Cancelled</span>;
      default: return null;
    }
  };

  return (
    <Layout>
      <div className="pt-28 md:pt-32 pb-32 animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface">My Account</h1>
              <p className="text-on-surface-variant mt-2">Manage your bookings and preferences.</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center text-2xl font-bold shadow-glow">
              {currentUser.name.charAt(0)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Sidebar / Preferences */}
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-lg font-headline font-bold mb-4">Preferences</h2>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">dark_mode</span> Theme
                  </span>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${isDarkMode ? 'bg-secondary' : 'bg-white/10'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">translate</span> Language
                  </span>
                  <select className="bg-transparent text-sm font-bold text-on-surface outline-none cursor-pointer">
                    <option>English</option>
                    <option>हिंदी</option>
                  </select>
                </div>
              </div>

              <div className="card p-6">
                <h2 className="text-lg font-headline font-bold mb-4">Saved Pros</h2>
                <p className="text-sm text-on-surface-variant">No saved professionals yet.</p>
              </div>
            </div>

            {/* Main Content / Bookings */}
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-xl font-headline font-bold text-on-surface">My Bookings</h2>

              <div className="card p-12 text-center flex flex-col items-center">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">history</span>
                <p className="text-on-surface-variant mb-6">You don't have any bookings yet.</p>
                <Link to="/search" className="btn btn-primary">Find a Professional</Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
