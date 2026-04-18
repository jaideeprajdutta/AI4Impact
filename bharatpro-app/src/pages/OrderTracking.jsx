import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';

export default function OrderTracking() {
  const { id } = useParams();
  const { bookings } = useApp();
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

  const steps = [
    { label: 'Booking Confirmed', status: 'completed', time: '10:30 AM' },
    { label: 'Worker Assigned', status: 'active', time: '10:35 AM' },
    { label: 'Worker on the way', status: 'pending', time: 'Est. 11:00 AM' },
    { label: 'Service Started', status: 'pending', time: '-' },
  ];

  return (
    <Layout>
      <div className="section pt-32 pb-32 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/" className="p-2 rounded-xl hover:bg-white/10 text-on-surface-variant transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-2xl font-headline font-bold">Order Tracking</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Status */}
          <div className="md:col-span-2 space-y-6">
            <div className="card p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <span className="material-symbols-outlined text-8xl">local_shipping</span>
              </div>
              
              <div className="relative z-10">
                <span className="badge badge-accent mb-4">In Progress</span>
                <h2 className="text-3xl font-headline font-extrabold text-on-surface mb-2">Worker is on the way</h2>
                <p className="text-on-surface-variant mb-6">Arriving in approximately 15 minutes.</p>
                
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/05">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-bold text-white shadow-glow">RK</div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">Rajesh Kumar</p>
                    <p className="text-xs text-on-surface-variant">Professional Plumber • 4.9★</p>
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
                {/* Connector line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-white/05" />

                {steps.map((step, i) => (
                  <div key={i} className="flex gap-6 relative">
                    <div className={`w-6 h-6 rounded-full border-4 border-surface-container shrink-0 z-10 ${
                      step.status === 'completed' ? 'bg-tertiary' : 
                      step.status === 'active' ? 'bg-secondary animate-pulse' : 
                      'bg-surface-container-high'
                    }`} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className={`text-sm font-bold ${step.status === 'pending' ? 'text-on-surface-variant' : 'text-on-surface'}`}>
                          {step.label}
                        </p>
                        <span className="text-xs text-outline">{step.time}</span>
                      </div>
                      {step.status === 'active' && <p className="text-xs text-on-surface-variant mt-1">Worker has started moving towards your location.</p>}
                    </div>
                  </div>
                ))}
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

            <div className="card p-6 bg-secondary/5 border-secondary/10">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary">info</span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Final price may vary based on actual work and materials used.
                </p>
              </div>
            </div>

            <button className="w-full btn btn-secondary text-sm py-3.5">Cancel Booking</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
