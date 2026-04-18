import { useState } from 'react';
import WorkerLayout from '../../components/worker/WorkerLayout';

const reviews = [
  { name: 'Amit Patel', rating: 5, text: 'Excellent work on the kitchen sink. Very professional and clean.', time: '2 days ago' },
  { name: 'Priya Mehta', rating: 5, text: 'Quick response and fixed the pipe leak perfectly. Will hire again!', time: '5 days ago' },
  { name: 'Vikram Desai', rating: 4, text: 'Good work overall. Took a bit longer than expected but quality was great.', time: '1 week ago' },
  { name: 'Sneha Kapoor', rating: 5, text: 'Best plumber in Mumbai. Highly recommended for any plumbing work.', time: '2 weeks ago' },
];

const badges = [
  { icon: 'verified', label: 'KYC Verified', color: 'tertiary' },
  { icon: 'workspace_premium', label: 'Top Rated', color: 'secondary' },
  { icon: 'speed', label: 'Fast Responder', color: 'primary' },
  { icon: 'military_tech', label: '100+ Jobs', color: 'secondary' },
];

const skills = ['Pipe Fitting', 'Leak Detection', 'Water Heater', 'Drain Cleaning', 'Emergency Repair', 'Commercial'];

export default function Profile() {
  const [editMode, setEditMode] = useState(false);

  return (
    <WorkerLayout>
      <div className="p-4 md:p-8 max-w-4xl mx-auto flex flex-col gap-6">
        {/* Profile Header */}
        <div className="card p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 relative z-10">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-secondary to-secondary-container flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                RK
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-tertiary flex items-center justify-center border-2 border-surface-container-low">
                <span className="material-symbols-outlined text-white text-xs" style={{fontVariationSettings:"'FILL' 1"}}>check</span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-2xl font-headline font-bold text-on-surface">Rajesh Kumar</h1>
                <span className="material-symbols-outlined text-tertiary text-lg" style={{fontVariationSettings:"'FILL' 1"}}>verified</span>
              </div>
              <p className="text-sm text-on-surface-variant mt-0.5">Master Plumber • 15 years experience</p>
              <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-xs">location_on</span> Andheri East, Mumbai
              </p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-secondary">
                  <span className="material-symbols-outlined text-base" style={{fontVariationSettings:"'FILL' 1"}}>star</span>
                  <span className="text-sm font-bold">4.9</span>
                  <span className="text-xs text-on-surface-variant">(120 reviews)</span>
                </div>
                <span className="text-xs text-on-surface-variant">•</span>
                <span className="text-xs text-on-surface-variant">142 jobs completed</span>
              </div>
            </div>

            <button
              onClick={() => setEditMode(!editMode)}
              className="btn btn-secondary text-xs self-start"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              {editMode ? 'Done' : 'Edit Profile'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* About */}
            <div className="card p-5">
              <h2 className="text-base font-headline font-bold text-on-surface mb-3">About</h2>
              {editMode ? (
                <textarea className="w-full h-24 rounded-xl bg-surface-container-high border border-white/[0.06] p-3 text-sm text-on-surface outline-none focus:border-secondary/40 transition-colors resize-none" defaultValue="Experienced master plumber with 15+ years of expertise in residential and commercial plumbing. Specialized in leak detection, pipe fitting, and water heater installations. Available for emergency repairs." />
              ) : (
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Experienced master plumber with 15+ years of expertise in residential and commercial plumbing.
                  Specialized in leak detection, pipe fitting, and water heater installations.
                  Available for emergency repairs.
                </p>
              )}
            </div>

            {/* Skills */}
            <div className="card p-5">
              <h2 className="text-base font-headline font-bold text-on-surface mb-3">Skills & Services</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map(s => (
                  <span key={s} className="chip">{s}</span>
                ))}
                {editMode && (
                  <button className="chip !border-dashed !border-white/10">
                    <span className="material-symbols-outlined text-sm">add</span> Add
                  </button>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-headline font-bold text-on-surface">Customer Reviews</h2>
                <span className="text-xs text-on-surface-variant">{reviews.length} reviews</span>
              </div>
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className={`pb-4 ${i < reviews.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-xs font-bold text-on-surface-variant">
                          {r.name.split(' ').map(w => w[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-on-surface">{r.name}</p>
                          <p className="text-xs text-outline">{r.time}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({length: 5}).map((_, j) => (
                          <span key={j} className={`material-symbols-outlined text-xs ${j < r.rating ? 'text-secondary' : 'text-surface-variant'}`} style={{fontVariationSettings:"'FILL' 1"}}>star</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5">
            {/* Badges */}
            <div className="card p-5">
              <h2 className="text-base font-headline font-bold text-on-surface mb-3">Badges & Verification</h2>
              <div className="space-y-3">
                {badges.map(({ icon, label, color }) => (
                  <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest ghost-border">
                    <span className={`material-symbols-outlined text-${color} text-base`} style={{fontVariationSettings:"'FILL' 1"}}>{icon}</span>
                    <span className="text-sm text-on-surface">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="card p-5">
              <h2 className="text-base font-headline font-bold text-on-surface mb-3">Performance</h2>
              <div className="space-y-4">
                {[
                  { label: 'Response Time', value: '8 min avg', bar: '85%' },
                  { label: 'Completion Rate', value: '98%', bar: '98%' },
                  { label: 'On-Time Rate', value: '95%', bar: '95%' },
                  { label: 'Repeat Clients', value: '42%', bar: '42%' },
                ].map(({ label, value, bar }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-on-surface-variant">{label}</span>
                      <span className="text-on-surface font-semibold">{value}</span>
                    </div>
                    <div className="h-1.5 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-tertiary rounded-full" style={{width: bar}} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="card p-5">
              <h2 className="text-base font-headline font-bold text-on-surface mb-3">Availability</h2>
              <div className="space-y-2">
                {['Mon-Fri: 8 AM – 8 PM', 'Saturday: 9 AM – 5 PM', 'Sunday: Emergency only'].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-xs text-tertiary">schedule</span>{t}
                  </div>
                ))}
              </div>
            </div>

            {/* Rate */}
            <div className="card p-5">
              <h2 className="text-base font-headline font-bold text-on-surface mb-1">Hourly Rate</h2>
              {editMode ? (
                <input className="w-full h-10 rounded-xl bg-surface-container-high border border-white/[0.06] px-3 text-lg font-bold text-on-surface outline-none focus:border-secondary/40 mt-2" defaultValue="₹450" />
              ) : (
                <p className="text-2xl font-headline font-bold text-secondary">₹450<span className="text-sm text-on-surface-variant font-normal">/hr</span></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </WorkerLayout>
  );
}
