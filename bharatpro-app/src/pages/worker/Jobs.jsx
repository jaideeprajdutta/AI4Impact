import { useState } from 'react';
import WorkerLayout from '../../components/worker/WorkerLayout';

const tabs = ['All', 'Pending', 'Active', 'Completed'];

const allJobs = [
  { id: 1, title: 'Kitchen Sink Leak Repair', client: 'Amit Patel', location: 'Andheri West', distance: '2.3 km', budget: '₹800', time: '30 min ago', status: 'pending', urgent: true },
  { id: 2, title: 'Bathroom Pipe Replacement', client: 'Priya Mehta', location: 'Bandra East', distance: '4.1 km', budget: '₹2,500', time: '1 hr ago', status: 'pending' },
  { id: 3, title: 'Water Heater Installation', client: 'Raj Sharma', location: 'Juhu', budget: '₹3,500', status: 'active', progress: 65, time: 'Started 2h ago' },
  { id: 4, title: 'Toilet Flush Mechanism', client: 'Sneha Kapoor', location: 'Powai', budget: '₹600', status: 'active', progress: 90, time: 'Started 4h ago' },
  { id: 5, title: 'Full Bathroom Plumbing', client: 'Vikram Desai', location: 'Malad', budget: '₹12,000', status: 'completed', rating: 5, time: 'Yesterday' },
  { id: 6, title: 'Pipe Leakage Fix', client: 'Nisha Gupta', location: 'Goregaon', budget: '₹1,200', status: 'completed', rating: 4, time: '2 days ago' },
  { id: 7, title: 'Washing Machine Setup', client: 'Arjun Reddy', location: 'Dadar', budget: '₹900', status: 'completed', rating: 5, time: '3 days ago' },
];

export default function Jobs() {
  const [tab, setTab] = useState('All');

  const filtered = tab === 'All' ? allJobs : allJobs.filter(j => j.status === tab.toLowerCase());

  return (
    <WorkerLayout>
      <div className="p-4 md:p-8 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-headline font-bold text-on-surface">Jobs</h1>
            <p className="text-sm text-on-surface-variant mt-0.5">{allJobs.length} total jobs</p>
          </div>
          {/* Search */}
          <div className="flex items-center h-10 rounded-xl bg-surface-container-high border border-white/[0.06] px-3 w-full md:w-72">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">search</span>
            <input className="bg-transparent text-sm text-on-surface outline-none w-full placeholder:text-on-surface-variant" placeholder="Search jobs..." />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} className={`chip ${tab === t ? 'chip-active' : ''}`}>
              {t}
              {t !== 'All' && <span className="text-xs opacity-70">({allJobs.filter(j => t === 'All' || j.status === t.toLowerCase()).length})</span>}
            </button>
          ))}
        </div>

        {/* Jobs List */}
        <div className="flex flex-col gap-4">
          {filtered.map(job => (
            <div key={job.id} className={`card p-5 ${job.urgent ? '!border-secondary/20' : ''}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-headline font-semibold text-on-surface">{job.title}</h3>
                    {job.urgent && <span className="badge badge-accent">Urgent</span>}
                    <span className={`badge ${
                      job.status === 'pending' ? 'badge-accent' :
                      job.status === 'active' ? 'badge-success' :
                      'bg-surface-container-high text-on-surface-variant border border-white/[0.06]'
                    }`}>
                      {job.status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-secondary" />}
                      {job.status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />}
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-on-surface-variant">
                    <span>{job.client}</span>
                    <span className="flex items-center gap-0.5"><span className="material-symbols-outlined text-xs">location_on</span>{job.location}{job.distance ? ` • ${job.distance}` : ''}</span>
                    <span className="flex items-center gap-0.5"><span className="material-symbols-outlined text-xs">schedule</span>{job.time}</span>
                  </div>
                  {job.progress !== undefined && (
                    <div className="mt-3 max-w-xs">
                      <div className="h-1.5 bg-surface-variant rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary rounded-full" style={{width:`${job.progress}%`}} />
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1">{job.progress}% complete</p>
                    </div>
                  )}
                  {job.rating && (
                    <div className="flex items-center gap-1 mt-2">
                      {Array.from({length:5}).map((_,i) => (
                        <span key={i} className={`material-symbols-outlined text-sm ${i < job.rating ? 'text-secondary' : 'text-surface-variant'}`} style={{fontVariationSettings:"'FILL' 1"}}>star</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xl font-headline font-bold text-on-surface">{job.budget}</span>
                  {job.status === 'pending' && (
                    <div className="flex gap-2">
                      <button className="btn btn-primary text-xs py-2 px-4">Accept</button>
                      <button className="btn btn-secondary text-xs py-2 px-4">Decline</button>
                    </div>
                  )}
                  {job.status === 'active' && (
                    <button className="btn btn-primary text-xs py-2 px-4">Complete</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkerLayout>
  );
}
