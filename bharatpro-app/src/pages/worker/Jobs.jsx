import { useState } from 'react';
import WorkerLayout from '../../components/worker/WorkerLayout';
import { useApp } from '../../context/AppContext';

const tabs = ['All', 'Pending', 'Active', 'Completed'];

export default function Jobs() {
  const { bookings, updateBookingStatus, currentWorkerId } = useApp();
  const [tab, setTab] = useState('All');

  const myBookings = bookings.filter(b => b.workerId === currentWorkerId);
  const filtered = tab === 'All' ? myBookings : myBookings.filter(j => j.status === tab.toLowerCase());

  const handleStatusChange = (id, newStatus) => {
    updateBookingStatus(id, newStatus);
  };

  return (
    <WorkerLayout>
      <div className="p-4 md:p-8 max-w-5xl mx-auto animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-headline font-bold text-on-surface">Jobs</h1>
            <p className="text-sm text-on-surface-variant mt-0.5">{myBookings.length} total jobs</p>
          </div>
          {/* Search */}
          <div className="flex items-center h-10 rounded-xl bg-surface-container-high border border-white/[0.06] px-3 w-full md:w-72 focus-within:border-secondary/40 transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">search</span>
            <input className="bg-transparent text-sm text-on-surface outline-none w-full placeholder:text-on-surface-variant" placeholder="Search jobs..." />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} className={`chip ${tab === t ? 'chip-active' : ''}`}>
              {t}
              {t !== 'All' && <span className="text-xs opacity-70 ml-1">({myBookings.filter(j => t === 'All' || j.status === t.toLowerCase()).length})</span>}
            </button>
          ))}
        </div>

        {/* Jobs List */}
        {filtered.length === 0 ? (
          <div className="card p-12 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/50 mb-4">inbox</span>
            <p className="text-on-surface-variant">No jobs found in this category.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map(job => (
              <div key={job.id} className="card p-5 hover:border-white/10 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-base font-headline font-semibold text-on-surface">{job.title}</h3>
                      <span className={`badge ${
                        job.status === 'pending' ? 'badge-accent' :
                        job.status === 'active' ? 'badge-success' :
                        job.status === 'completed' ? 'bg-white/10 text-on-surface' :
                        'bg-error/10 text-error border border-error/20'
                      }`}>
                        {job.status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-secondary" />}
                        {job.status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />}
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-on-surface-variant mb-2">{job.description || "No description provided."}</p>

                    <div className="flex flex-wrap gap-4 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">person</span>{job.clientName}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span>{job.slot?.date || job.date || 'Today'}, {job.slot?.time || 'ASAP'}</span>
                      <span className="flex items-center gap-1 font-mono text-on-surface-variant/60">ID: {job.id}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/05">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-0.5">Earnings</p>
                      <span className="text-xl font-headline font-bold text-secondary">₹{job.amount}</span>
                    </div>

                    {job.status === 'pending' && (
                      <div className="flex gap-2">
                        <button onClick={() => handleStatusChange(job.id, 'active')} className="btn btn-primary py-2 px-4 text-sm shadow-glow">Accept</button>
                        <button onClick={() => handleStatusChange(job.id, 'rejected')} className="btn btn-secondary py-2 px-4 text-sm">Decline</button>
                      </div>
                    )}
                    {job.status === 'active' && (
                      <button onClick={() => handleStatusChange(job.id, 'completed')} className="btn bg-tertiary/20 text-tertiary hover:bg-tertiary hover:text-on-tertiary py-2 px-4 text-sm shadow-[0_0_15px_rgba(52,211,153,0.2)]">Mark Complete</button>
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
