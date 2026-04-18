import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

export default function CustomerProfile() {
  const { bookings, currentUser, savedWorkers, workers, isDarkMode, setIsDarkMode } = useApp();

  const myBookings = bookings.filter(b => b.clientName === currentUser.name || b.clientName === 'You');
  const mySavedWorkers = workers.filter(w => savedWorkers.includes(w.id));

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
                {mySavedWorkers.length === 0 ? (
                  <p className="text-sm text-on-surface-variant">No saved professionals yet.</p>
                ) : (
                  <div className="space-y-4">
                    {mySavedWorkers.map(w => (
                      <Link to="/search" key={w.id} className="flex items-center gap-3 group">
                        {w.image ? (
                          <img src={w.image} alt={w.name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm">person</span>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-bold text-on-surface group-hover:text-secondary transition-colors">{w.name}</p>
                          <p className="text-[10px] text-on-surface-variant">{w.role}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Main Content / Bookings */}
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-xl font-headline font-bold text-on-surface">My Bookings</h2>
              
              {myBookings.length === 0 ? (
                <div className="card p-12 text-center flex flex-col items-center">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">history</span>
                  <p className="text-on-surface-variant mb-6">You don't have any bookings yet.</p>
                  <Link to="/search" className="btn btn-primary">Find a Professional</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {myBookings.map(booking => (
                    <div key={booking.id} className="card p-6 hover:border-secondary/30 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-on-surface mb-1">{booking.title}</h3>
                          <p className="text-sm text-on-surface-variant flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">person</span> {booking.workerName}
                          </p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                      
                      <div className="flex justify-between items-end pt-4 border-t border-white/05">
                        <div>
                          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Date</p>
                          <p className="text-sm font-medium">{booking.slot?.date || 'N/A'}, {booking.slot?.time || 'N/A'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Amount</p>
                          <p className="text-lg font-headline font-bold text-secondary">₹{booking.amount}</p>
                        </div>
                      </div>

                      {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                        <div className="mt-4 pt-4 border-t border-white/05 flex gap-3">
                          <Link to={`/order-tracking/${booking.id}`} className="btn btn-secondary flex-1 py-2 text-sm">Track Order</Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
