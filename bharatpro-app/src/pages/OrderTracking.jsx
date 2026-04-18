import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';

export default function OrderTracking() {
  const { id } = useParams();
  const { bookings, updateBookingStatus } = useApp();
  const booking = bookings.find(b => b.id === id);

  if (!booking) {
    return (
      <Layout>
        <div className="section min-h-[60vh] flex items-center justify-center">
          <p className="text-on-surface-variant">Booking not found.</p>
        </div>
      </Layout>
    );
  }

  const getStatusInfo = (status) => {
    switch (status) {
      case 'completed': return { title: 'Service Completed', desc: 'The professional has marked this job as done.', color: 'text-tertiary', badge: 'bg-tertiary/10 text-tertiary border-tertiary/20' };
      case 'active': return { title: 'Worker is on the way', desc: 'Arriving in approximately 15 minutes.', color: 'text-secondary', badge: 'badge-accent' };
      case 'rejected': return { title: 'Booking Declined', desc: 'The professional is currently unavailable.', color: 'text-error', badge: 'bg-error/10 text-error border-error/20' };
      case 'cancelled': return { title: 'Booking Cancelled', desc: 'You have cancelled this booking.', color: 'text-error', badge: 'bg-error/10 text-error border-error/20' };
      default: return { title: 'Waiting for Confirmation', desc: 'Waiting for the professional to accept your request.', color: 'text-on-surface', badge: 'bg-white/10 text-on-surface' };
    }
  };

  const statusInfo = getStatusInfo(booking.status);

  return (
    <Layout>
      <div className="section pt-28 md:pt-32 pb-32 max-w-4xl mx-auto animate-fade-in">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/profile" className="p-2 rounded-xl hover:bg-white/10 text-on-surface-variant transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-2xl font-headline font-bold">Order Tracking</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Status */}
          <div className="md:col-span-2 space-y-6">
            <div className="card p-6 md:p-8 relative overflow-hidden shadow-premium">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <span className="material-symbols-outlined text-9xl">
                  {booking.status === 'completed' ? 'check_circle' : booking.status === 'active' ? 'local_shipping' : booking.status === 'pending' ? 'hourglass_empty' : 'cancel'}
                </span>
              </div>
              
              <div className="relative z-10">
                <span className={`badge mb-4 ${statusInfo.badge}`}>{booking.status.toUpperCase()}</span>
                <h2 className="text-3xl font-headline font-extrabold text-on-surface mb-2">{statusInfo.title}</h2>
                <p className="text-on-surface-variant mb-6">{statusInfo.desc}</p>
                
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/05 backdrop-blur-md">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-bold text-white shadow-glow">
                    {booking.workerName?.charAt(0) || 'P'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">{booking.workerName}</p>
                    <p className="text-xs text-on-surface-variant">Professional</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <button className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-on-surface transition-all">
                      <span className="material-symbols-outlined text-[20px]">call</span>
                    </button>
                    <button className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-on-surface transition-all">
                      <span className="material-symbols-outlined text-[20px]">chat</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="card p-6 md:p-8">
              <h3 className="text-lg font-headline font-bold text-on-surface mb-6">Timeline</h3>
              <div className="space-y-8 relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-white/05" />

                <div className="flex gap-6 relative">
                  <div className="w-6 h-6 rounded-full border-4 border-surface-container bg-tertiary shrink-0 z-10" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-on-surface">Booking Requested</p>
                    <span className="text-xs text-outline">Done</span>
                  </div>
                </div>

                <div className="flex gap-6 relative">
                  <div className={`w-6 h-6 rounded-full border-4 border-surface-container shrink-0 z-10 ${
                    ['active', 'completed'].includes(booking.status) ? 'bg-tertiary' : 
                    booking.status === 'pending' ? 'bg-secondary animate-pulse' : 'bg-error'
                  }`} />
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${['active', 'completed'].includes(booking.status) ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                      Worker Confirmed
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 relative">
                  <div className={`w-6 h-6 rounded-full border-4 border-surface-container shrink-0 z-10 ${
                    booking.status === 'completed' ? 'bg-tertiary' : 
                    booking.status === 'active' ? 'bg-secondary animate-pulse' : 'bg-surface-container-high'
                  }`} />
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${booking.status === 'completed' || booking.status === 'active' ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                      Service in Progress
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6 relative">
                  <div className={`w-6 h-6 rounded-full border-4 border-surface-container shrink-0 z-10 ${
                    booking.status === 'completed' ? 'bg-tertiary shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-surface-container-high'
                  }`} />
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${booking.status === 'completed' ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                      Completed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">Order Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Order ID</span>
                  <span className="text-on-surface font-medium">{booking.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Date</span>
                  <span className="text-on-surface font-medium">{booking.slot?.date || 'Today'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Time</span>
                  <span className="text-on-surface font-medium">{booking.slot?.time || 'Pending'}</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/05">
                <div className="flex justify-between text-base font-bold">
                  <span className="text-on-surface">Total Est.</span>
                  <span className="text-secondary">₹{booking.amount}</span>
                </div>
              </div>
            </div>

            {booking.status === 'completed' && (
              <div className="card p-6 text-center">
                 <h3 className="text-sm font-bold text-on-surface mb-3">Rate your experience</h3>
                 <div className="flex justify-center gap-2 mb-4">
                    {[1,2,3,4,5].map(star => (
                      <span key={star} className="material-symbols-outlined text-3xl text-surface-variant hover:text-secondary cursor-pointer transition-colors" style={{fontVariationSettings:"'FILL' 1"}}>star</span>
                    ))}
                 </div>
                 <button className="btn btn-secondary w-full text-sm">Leave a Review</button>
              </div>
            )}

            {(booking.status === 'pending' || booking.status === 'active') && (
              <button 
                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                className="w-full btn btn-secondary text-sm py-3.5 border-error/20 text-error hover:bg-error/10"
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
