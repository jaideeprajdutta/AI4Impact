import { useState, useEffect } from 'react';
import WorkerLayout from '../../components/worker/WorkerLayout';
import { getWorkerJobs, acceptJob, getWorkers } from '../../api';

export default function Dashboard() {
  const [available, setAvailable] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(null);

  useEffect(() => {
    getWorkers().then(data => {
      const list = data.workers || [];
      setWorkers(list);
      if (list.length > 0) {
        setSelectedWorkerId(String(list[0].id));
        setSelectedWorker(list[0]);
      }
    }).catch(console.error);
  }, []);

  const fetchJobs = async (workerId) => {
    if (!workerId) return;
    try {
      const data = await getWorkerJobs(workerId);
      setJobs(data.jobs || []);
      if (data.worker) setSelectedWorker(data.worker);
    } catch (e) {
      console.error('Failed to load jobs', e);
    }
  };

  useEffect(() => {
    if (selectedWorkerId) fetchJobs(selectedWorkerId);
  }, [selectedWorkerId]);

  const incomingRequests = jobs.filter(j => j.status === 'open');
  const activeJobs = jobs.filter(j => j.status === 'assigned');
  const completedJobs = jobs.filter(j => j.status === 'completed');
  const totalEarnings = completedJobs.reduce((sum, j) => sum + (j.price || 0), 0);

  const handleAccept = async (jobId) => {
    try {
      await acceptJob(Number(selectedWorkerId), jobId);
      await fetchJobs(selectedWorkerId);
    } catch (e) {
      console.error('Failed to accept job', e);
    }
  };

  return (
    <WorkerLayout>
      <div className="p-4 md:p-8 max-w-6xl mx-auto flex flex-col gap-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-headline font-extrabold text-on-surface">Pro Dashboard</h1>
            {selectedWorker && (
              <p className="text-sm text-on-surface-variant mt-1">
                Viewing as: <span className="text-secondary font-semibold">{selectedWorker.name}</span>
                <span className="ml-2 text-on-surface-variant/50">({selectedWorker.skill} · {selectedWorker.location})</span>
              </p>
            )}
            {/* Worker Switcher */}
            <div className="flex items-center h-9 rounded-xl bg-surface-container-high border border-white/[0.06] px-3 mt-2 w-fit focus-within:border-secondary/40 transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant text-[16px] mr-2">manage_accounts</span>
              <select
                value={selectedWorkerId}
                onChange={(e) => setSelectedWorkerId(e.target.value)}
                className="bg-transparent text-xs text-on-surface outline-none cursor-pointer max-w-[280px]"
              >
                {workers.map(w => (
                  <option key={w.id} value={w.id} style={{ background: '#1e1e2e' }}>
                    #{w.id} — {w.name} ({w.skill}, {w.location})
                  </option>
                ))}
              </select>
            </div>
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
          <StatCard label="Total Earnings" value={`₹${totalEarnings}`} icon="payments" trend="+12% this week" />
          <StatCard label="Pending Jobs" value={incomingRequests.length} icon="pending_actions" trend="Action required" highlight={incomingRequests.length > 0} />
          <StatCard label="Active Now" value={activeJobs.length} icon="engineering" trend="In progress" />
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
                          <h3 className="text-lg font-bold text-on-surface">{req.required_skill || 'Service Request'}</h3>
                          <span className="badge bg-secondary/10 text-secondary border-none text-[10px]">New</span>
                        </div>
                        <p className="text-sm text-on-surface-variant">{req.description || 'No description provided'}</p>
                      </div>
                      <span className="text-2xl font-headline font-black text-secondary">₹{req.price}</span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-on-surface-variant mb-6 pb-4 border-b border-white/05">
                      <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">location_on</span>{req.location || 'N/A'}</span>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => handleAccept(req.id)} className="btn btn-primary flex-1 py-3 text-sm">Accept Job</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Side Panel: Performance */}
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
