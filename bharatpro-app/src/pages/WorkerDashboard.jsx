import Layout from '../components/Layout';

export default function WorkerDashboard() {
  return (
    <Layout>
      <div className="section pt-28 md:pt-32 pb-32 flex flex-col gap-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <div>
            <h1 className="section-title text-3xl md:text-4xl">Welcome back, Architect</h1>
            <p className="section-subtitle mt-1">Your command center is active.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass-panel px-5 py-2.5 rounded-full flex items-center gap-2.5 text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse" />
              <span className="font-semibold text-on-surface">Available</span>
            </div>
            <button className="btn btn-primary rounded-full p-3" aria-label="Voice">
              <span className="material-symbols-outlined text-xl" style={{fontVariationSettings:"'FILL' 1"}}>mic</span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Earnings */}
          <div className="card p-6 relative overflow-hidden group">
            <div className="absolute top-3 right-3 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity">
              <span className="material-symbols-outlined text-5xl text-secondary">payments</span>
            </div>
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Total Earnings</p>
            <p className="text-3xl font-headline font-bold text-on-surface">₹1,24,500</p>
            <div className="mt-5 flex items-end justify-between">
              <span className="badge badge-success text-xs">
                <span className="material-symbols-outlined text-xs">trending_up</span> +14.2%
              </span>
              <div className="flex items-end gap-0.5 h-10">
                {[33, 50, 66, 80, 100].map((h, i) => (
                  <div key={i} className="w-3 rounded-t-sm bg-secondary/40" style={{height: `${h}%`}} />
                ))}
              </div>
            </div>
          </div>

          {/* Active Jobs */}
          <div className="card p-6">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Active Jobs</p>
            <p className="text-3xl font-headline font-bold text-on-surface">3</p>
            <div className="mt-5">
              <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full rounded-full" style={{width:'75%'}} />
              </div>
              <p className="text-xs text-on-surface-variant mt-2">75% Completion</p>
            </div>
          </div>

          {/* Rating */}
          <div className="card p-6 bg-primary-container/40 border-primary-container/20">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Your Rating</p>
            <p className="text-3xl font-headline font-bold text-primary">4.9</p>
            <div className="mt-5 flex items-center gap-2">
              <div className="flex text-secondary">
                {[1,2,3,4].map(i => <span key={i} className="material-symbols-outlined text-base" style={{fontVariationSettings:"'FILL' 1"}}>star</span>)}
                <span className="material-symbols-outlined text-base" style={{fontVariationSettings:"'FILL' 1"}}>star_half</span>
              </div>
              <span className="text-xs text-on-surface-variant">Top 2%</span>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bookings */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <h2 className="text-lg font-headline font-bold text-on-surface">Upcoming</h2>
            <BookingCard name="John Doe Enterprise" type="Cybersecurity Audit" initials="JD" amount="₹15k" date="Today" time="14:00" active />
            <BookingCard name="Alpha Corp" type="Network Infrastructure" initials="AC" amount="₹45k" date="Tomorrow" time="09:00" />
          </div>

          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="card p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-headline font-bold text-on-surface">Project Nexus</h2>
                  <p className="text-sm text-on-surface-variant mt-0.5">Client: Global Logistics Ltd.</p>
                </div>
                <button className="btn btn-secondary text-xs">View Details</button>
              </div>

              <div className="relative pl-4">
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-outline-variant" />

                <Step status="done" title="Initial Briefing" desc="Requirements gathered and contract finalized." time="Completed: Oct 24" />
                <Step status="active" title="Infrastructure Deployment" desc="Setting up secure cloud instances." />
                <Step status="pending" title="Security Audit" desc="Final penetration testing before handover." last />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

function BookingCard({ name, type, initials, amount, date, time, active }) {
  return (
    <div className={`card p-4 ${active ? '' : 'opacity-70 hover:opacity-100'}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
            active ? 'bg-primary-container text-primary' : 'bg-surface-variant text-on-surface-variant'
          }`}>{initials}</div>
          <div>
            <h4 className="text-sm font-headline font-semibold text-on-surface">{name}</h4>
            <p className="text-xs text-on-surface-variant">{type}</p>
          </div>
        </div>
        <span className="text-sm font-headline font-bold text-secondary">{amount}</span>
      </div>
      <div className="flex gap-4 text-xs text-on-surface-variant bg-surface-dim/40 px-3 py-2 rounded-lg">
        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">calendar_today</span>{date}</span>
        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">schedule</span>{time}</span>
      </div>
    </div>
  );
}

function Step({ status, title, desc, time, last }) {
  return (
    <div className={`relative flex items-start gap-4 ${last ? '' : 'mb-8'}`}>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 relative z-10 ${
        status === 'done' ? 'bg-tertiary' :
        status === 'active' ? 'bg-surface border-2 border-secondary' :
        'bg-surface border-2 border-outline-variant'
      }`}>
        {status === 'done' && <span className="material-symbols-outlined text-xs text-surface" style={{fontVariationSettings:"'FILL' 1"}}>check</span>}
        {status === 'active' && <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />}
      </div>

      <div className={`flex-grow ${status === 'active' ? 'card p-4' : ''} ${status === 'pending' ? 'opacity-50' : ''}`}>
        <h4 className={`text-sm font-headline font-bold ${status === 'active' ? 'text-secondary' : 'text-on-surface'}`}>{title}</h4>
        <p className="text-sm text-on-surface-variant mt-0.5">{desc}</p>
        {time && <span className="text-xs text-outline mt-1.5 block">{time}</span>}
        {status === 'active' && (
          <div className="mt-3 flex gap-2">
            <button className="btn btn-primary text-xs py-2 px-3">Mark Complete</button>
            <button className="btn btn-secondary text-xs py-2 px-3">Add Note</button>
          </div>
        )}
      </div>
    </div>
  );
}
