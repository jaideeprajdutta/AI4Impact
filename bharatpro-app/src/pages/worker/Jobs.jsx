import { useState, useEffect } from 'react';
import WorkerLayout from '../../components/worker/WorkerLayout';
import { getWorkerJobs, acceptJob, getWorkers } from '../../api';

const tabs = ['All', 'open', 'assigned', 'completed'];
const tabLabels = { All: 'All', open: 'Pending', assigned: 'Active', completed: 'Completed' };

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [tab, setTab] = useState('All');
  const [loading, setLoading] = useState(true);
  const [workers, setWorkers] = useState([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(null);

  // Load worker list on mount
  useEffect(() => {
    getWorkers()
      .then(data => {
        const list = data.workers || [];
        setWorkers(list);
        if (list.length > 0) {
          setSelectedWorkerId(String(list[0].id));
          setSelectedWorker(list[0]);
        }
      })
      .catch(console.error);
  }, []);

  // Fetch jobs whenever worker changes
  const fetchJobs = async (workerId) => {
    if (!workerId) return;
    setLoading(true);
    try {
      const data = await getWorkerJobs(workerId);
      setJobs(data.jobs || []);
      if (data.worker) setSelectedWorker(data.worker);
    } catch (e) {
      console.error('Failed to load jobs', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedWorkerId) fetchJobs(selectedWorkerId);
  }, [selectedWorkerId]);

  const handleWorkerChange = (e) => {
    setSelectedWorkerId(e.target.value);
    setTab('All');
  };

  const handleAccept = async (jobId) => {
    try {
      await acceptJob(Number(selectedWorkerId), jobId);
      await fetchJobs(selectedWorkerId);
    } catch (e) {
      console.error('Failed to accept job', e);
    }
  };

  const filtered = tab === 'All' ? jobs : jobs.filter(j => j.status === tab);

  return (
    <WorkerLayout>
      <div className="p-4 md:p-8 max-w-5xl mx-auto animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-headline font-bold text-on-surface">Jobs</h1>
            {selectedWorker && (
              <p className="text-sm text-on-surface-variant mt-0.5">
                Viewing as: <span className="text-secondary font-semibold">{selectedWorker.name}</span>
                <span className="ml-2 text-on-surface-variant/50">({selectedWorker.skill} · {selectedWorker.location})</span>
              </p>
            )}
          </div>

          {/* Worker Switcher */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center h-10 rounded-xl bg-surface-container-high border border-white/[0.06] px-3 flex-1 md:w-72 focus-within:border-secondary/40 transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">manage_accounts</span>
              <select
                value={selectedWorkerId}
                onChange={handleWorkerChange}
                className="bg-transparent text-sm text-on-surface outline-none w-full cursor-pointer"
              >
                {workers.map(w => (
                  <option key={w.id} value={w.id} style={{ background: '#1e1e2e' }}>
                    #{w.id} — {w.name} ({w.skill}, {w.location})
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => fetchJobs(selectedWorkerId)}
              className="h-10 w-10 rounded-xl bg-surface-container-high border border-white/[0.06] flex items-center justify-center hover:border-secondary/40 transition-colors"
              title="Refresh jobs"
            >
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">refresh</span>
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 mb-6">
          <span className="text-xs font-bold text-on-surface-variant bg-surface-container-high border border-white/[0.06] rounded-lg px-3 py-1.5">
            {jobs.length} total jobs
          </span>
          <span className="text-xs font-bold text-secondary bg-secondary/10 border border-secondary/20 rounded-lg px-3 py-1.5">
            {jobs.filter(j => j.status === 'open').length} open
          </span>
          <span className="text-xs font-bold text-tertiary bg-tertiary/10 border border-tertiary/20 rounded-lg px-3 py-1.5">
            {jobs.filter(j => j.status === 'assigned').length} active
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar">
          {Object.entries(tabLabels).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} className={`chip ${tab === key ? 'chip-active' : ''}`}>
              {label}
              {key !== 'All' && (
                <span className="text-xs opacity-70 ml-1">({jobs.filter(j => j.status === key).length})</span>
              )}
            </button>
          ))}
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="card p-12 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-4xl text-secondary/50 mb-4 animate-spin">progress_activity</span>
            <p className="text-on-surface-variant">Loading jobs...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card p-12 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/50 mb-4">inbox</span>
            <p className="text-on-surface-variant font-medium">No jobs found.</p>
            {tab === 'All' && selectedWorker && (
              <p className="text-xs text-on-surface-variant/60 mt-2">
                This worker needs a job posted for skill "<span className="text-secondary">{selectedWorker.skill}</span>" in "<span className="text-secondary">{selectedWorker.location}</span>"
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map(job => (
              <div key={job.id} className="card p-5 hover:border-white/10 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-base font-headline font-semibold text-on-surface">{job.required_skill || 'Service Request'}</h3>
                      <span className={`badge ${
                        job.status === 'open' ? 'badge-accent' :
                        job.status === 'assigned' ? 'badge-success' :
                        'bg-white/10 text-on-surface'
                      }`}>
                        {job.status === 'open' && <span className="w-1.5 h-1.5 rounded-full bg-secondary" />}
                        {job.status === 'assigned' && <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />}
                        {job.status === 'open' ? 'Pending' : job.status === 'assigned' ? 'Active' : job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </div>

                    <p className="text-sm text-on-surface-variant mb-2">{job.description || 'No description provided.'}</p>

                    <div className="flex flex-wrap gap-4 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        {job.location || 'N/A'}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-on-surface-variant/60">ID: {job.id}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/05">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-0.5">Earnings</p>
                      <span className="text-xl font-headline font-bold text-secondary">₹{job.price || 0}</span>
                    </div>

                    {job.status === 'open' && (
                      <button
                        onClick={() => handleAccept(job.id)}
                        className="btn btn-primary py-2 px-4 text-sm shadow-glow"
                      >
                        Accept
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </WorkerLayout>
  );
}
