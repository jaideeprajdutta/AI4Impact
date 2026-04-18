import { useState } from 'react';
import WorkerLayout from '../../components/worker/WorkerLayout';
import { useApp } from '../../context/AppContext';

export default function Dashboard() {
  const { bookings, getWorkerMetrics } = useApp();
  const [available, setAvailable] = useState(true);
  
  // For demo, we assume the logged in worker is ID 1 (Rajesh Kumar)
  const workerId = 1;
  const metrics = getWorkerMetrics(workerId);
  const workerBookings = bookings.filter(b => b.workerId === workerId);
  const incomingRequests = workerBookings.filter(b => b.status === 'pending');
  const activeJobs = workerBookings.filter(b => b.status === 'active');

  return (
    <WorkerLayout>
      <div className="p-4 md:p-8 max-w-6xl mx-auto flex flex-col gap-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-headline font-extrabold text-on-surface">Pro Dashboard</h1>
            <p className="text-on-surface-variant mt-1">Manage your business and track performance.</p>
          </div>

          {/* Availability */}
          <button
            onClick={() => setAvailable(!available)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-300 ${
              available ? 'border-tertiary/30 bg-tertiary/5' : 'border-white/10 bg-white/5 opacity-60'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${available ? 'bg-tertiary shadow-[0_0_12px_rgba(52,211,153,0.5)] animate-pulse' : 'bg-outline-variant'}`} />
            <span className={`text-sm font-bold ${available ? 'text-tertiary' : 'text-on-surface-variant'}`}>
              {available ? 'Accepting Jobs' : 'Offline'}
            </span>
          </button>
        </div>

        {/* Dynamic Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Earnings" value={`₹${metrics.totalEarnings}`} icon="payments" trend="+12% this week" />
          <StatCard label="Pending Jobs" value={metrics.pendingJobs + metrics.requests} icon="pending_actions" trend="Action required" highlight={metrics.pendingJobs > 0} />
          <StatCard label="Active Now" value={metrics.activeJobs} icon="engineering" trend="In progress" />
          <StatCard label="Success Rate" value="98%" icon="verified" trend="Top 1% in Mumbai" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Requests & Incoming */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-headline font-bold text-on-surface">Incoming Requests</h2>
              {incomingRequests.length > 0 && <span className="badge badge-accent animate-pulse">{incomingRequests.length} New</span>}
            </div>

            {incomingRequests.length === 0 ? (
              <div className="card p-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-on-surface-variant/40 text-3xl">inbox</span>
                </div>
                <p className="text-on-surface-variant font-medium">No new requests at the moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {incomingRequests.map(req => (
                  <div key={req.id} className="card p-6 shadow-premium hover:border-secondary/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-on-surface">{req.title}</h3>
                          <span className="badge bg-secondary/10 text-secondary border-none text-[10px]">New</span>
                        </div>
                        <p className="text-sm text-on-surface-variant">{req.description || 'No description provided'}</p>
                      </div>
                      <span className="text-2xl font-headline font-black text-secondary">₹{req.amount}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-xs text-on-surface-variant mb-6 pb-4 border-b border-white/05">
                      <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">schedule</span>{req.slot?.time || 'ASAP'}</span>
                      <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">person</span>{req.clientName}</span>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => updateBookingStatus(req.id, 'active')} className="btn btn-primary flex-1 py-3 text-sm">Accept Job</button>
                      <button onClick={() => updateBookingStatus(req.id, 'rejected')} className="btn btn-secondary flex-1 py-3 text-sm">Decline</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Side Panel: Active & Performance */}
          <div className="space-y-6">
            <h2 className="text-xl font-headline font-bold text-on-surface">Performance</h2>
            <div className="card p-6 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                  <span>Customer Rating</span>
                  <span className="text-secondary">4.9 / 5.0</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[98%] rounded-full shadow-glow" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                  <span>Response Time</span>
                  <span className="text-tertiary">8 mins</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary w-[92%] rounded-full" />
                </div>
              </div>
            </div>

            <div className="card p-6 bg-primary-container/20 border-primary/10">
              <h3 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">tips_and_updates</span>
                Pro Tip
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Workers who respond in under 10 minutes are 3x more likely to get booked again!
              </p>
            </div>
          </div>
        </div>
      </div>
    </WorkerLayout>
  );
}

function StatCard({ label, value, icon, trend, highlight }) {
  return (
    <div className={`card p-5 ${highlight ? '!border-secondary/40 shadow-glow' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{label}</p>
        <div className={`p-2 rounded-xl ${highlight ? 'bg-secondary/10 text-secondary' : 'bg-white/5 text-on-surface-variant/50'}`}>
          <span className="material-symbols-outlined text-[18px]">{icon}</span>
        </div>
      </div>
      <p className="text-2xl font-headline font-black text-on-surface">{value}</p>
      <p className={`text-[10px] mt-1 font-semibold ${highlight ? 'text-secondary' : 'text-on-surface-variant'}`}>{trend}</p>
    </div>
  );
}
