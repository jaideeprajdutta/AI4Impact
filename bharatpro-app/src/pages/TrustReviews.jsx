import Layout from '../components/Layout';

const bars = [
  { label: 'Execution Precision', value: '99.4%', w: '99.4%' },
  { label: 'Quality Standards', value: '98.7%', w: '98.7%' },
  { label: 'Communication', value: '97.2%', w: '97.2%' },
];

const stats = [
  { icon: 'bolt', label: 'Avg Response', value: '<12 min' },
  { icon: 'task_alt', label: 'Projects Done', value: '1,402+' },
  { icon: 'groups', label: 'Network Peers', value: '850' },
];

const reviews = [
  {
    name: 'Alexander Vance', tier: 'Enterprise', featured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5s06pocnA15sJBUywlEzXDeSrpqqzLkKTLsbGHCLSWNtOrfiJ6y69L2pQfCtsuo7oyGx8FLIHjw2PSDBfVoCo3vf3mNAJoW449S58HIBs3dGJuIiJXuu1K_wtG1PFCc7AqCFg9uH2xKOe7GZNOCEVU_Adx1__yKhd2aFw2l0LOK-SquMJ8SrS9ApbgEFhpD_QiKg-PxU-IYRFB_6BIhFunlPYtNP-jKrWwPDWx90ZuCnSyVkxvWVdSkkYti6Vn9jg7hP0CYfoFEc',
    text: '"The quality of work from Bharat Pro is unmatched. The infrastructure deployed for our division operated flawlessly under stress conditions. Precision engineering at its peak."',
    project: 'Project: Q3 Infrastructure',
  },
  {
    name: 'Elena Kova', initials: 'EK', role: 'Network Lead', stars: 5,
    text: 'Flawless execution. The verification layer ensures completely reliable interactions. Highly recommended.',
  },
  {
    name: 'Marcus Chen', initials: 'MC', role: 'Systems Architect', stars: 4,
    text: 'Rapid deployment and clear communication. The quality standards provided exactly what we needed.',
  },
];

export default function TrustReviews() {
  return (
    <Layout>
      <div className="section pt-28 md:pt-32 pb-32">
        {/* Header */}
        <header className="mb-14 relative">
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
          <h1 className="section-title text-4xl md:text-5xl relative z-10">Trust & Reviews</h1>
          <p className="section-subtitle mt-3 relative z-10">
            Transparent quality metrics and verified reviews from real customers.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
          {/* Rating */}
          <div className="md:col-span-8 card p-6 md:p-8 group">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <p className="text-xs font-semibold text-tertiary uppercase tracking-wider mb-3">Overall Rating</p>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-6xl md:text-7xl font-headline font-black text-on-surface">4.98</span>
                  <span className="text-xl text-on-surface-variant">/ 5.0</span>
                </div>
                <div className="flex gap-0.5 text-secondary">
                  {[1,2,3,4].map(i => <span key={i} className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>star</span>)}
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>star_half</span>
                </div>
              </div>

              <div className="flex-1 max-w-sm w-full space-y-4 bg-surface-container/40 p-5 rounded-xl ghost-border">
                {bars.map(({ label, value, w }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm text-on-surface-variant mb-1.5">
                      <span>{label}</span><span>{value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-dim rounded-full overflow-hidden">
                      <div className="h-full bg-tertiary rounded-full" style={{width: w}} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verified Badge */}
          <div className="md:col-span-4 card p-6 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-tertiary/10 rounded-full blur-[40px]" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-container to-surface-container-high flex items-center justify-center mb-4 ghost-border relative z-10">
              <span className="material-symbols-outlined text-3xl text-tertiary" style={{fontVariationSettings:"'FILL' 1"}}>verified</span>
            </div>
            <h3 className="text-lg font-headline font-bold text-on-surface mb-1 relative z-10">Verified Platform</h3>
            <p className="text-sm text-on-surface-variant mb-5 relative z-10">Identity and credentials confirmed.</p>
            <div className="w-full space-y-2.5 relative z-10">
              {['KYC Cleared', 'Background Verified'].map(item => (
                <div key={item} className="flex items-center gap-2.5 p-2.5 bg-surface-container-lowest rounded-lg ghost-border text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-base text-tertiary">check_circle</span> {item}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {stats.map(({ icon, label, value }) => (
              <div key={label} className="card p-5 flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">{icon}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-2xl font-headline font-bold text-on-surface">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Reviews Title */}
          <div className="md:col-span-12 mt-6">
            <h3 className="text-2xl font-headline font-bold text-on-surface border-l-3 border-secondary pl-4">Customer Reviews</h3>
          </div>

          {/* Featured Review */}
          <div className="md:col-span-7 card p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-3 right-3 opacity-[0.08]">
              <span className="material-symbols-outlined text-5xl text-surface-variant" style={{fontVariationSettings:"'FILL' 1"}}>format_quote</span>
            </div>
            <div className="flex items-center gap-3 mb-5">
              <img alt={reviews[0].name} className="w-10 h-10 rounded-full object-cover ghost-border" src={reviews[0].image} />
              <div>
                <p className="text-sm font-headline font-bold text-on-surface">{reviews[0].name}</p>
                <p className="text-xs text-tertiary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">verified</span> {reviews[0].tier}
                </p>
              </div>
            </div>
            <p className="text-base text-on-surface-variant leading-relaxed mb-4">{reviews[0].text}</p>
            <p className="text-xs text-outline uppercase tracking-wider">{reviews[0].project}</p>
          </div>

          {/* Side Reviews */}
          <div className="md:col-span-5 space-y-5">
            {reviews.slice(1).map((r, i) => (
              <div key={i} className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0 ? 'bg-primary-container text-primary' : 'bg-secondary-container text-on-secondary-container'
                    }`}>{r.initials}</div>
                    <div>
                      <p className="text-sm font-headline font-semibold text-on-surface">{r.name}</p>
                      <p className="text-xs text-outline">{r.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({length:5}).map((_, j) => (
                      <span key={j} className={`material-symbols-outlined text-sm ${j >= r.stars ? 'text-surface-variant' : 'text-secondary'}`} style={{fontVariationSettings:"'FILL' 1"}}>star</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="md:col-span-12 flex justify-center mt-6">
            <button className="btn btn-secondary">
              Load More Reviews
              <span className="material-symbols-outlined text-base">expand_more</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
