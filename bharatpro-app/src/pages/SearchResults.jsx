import { useState } from 'react';
import Layout from '../components/Layout';
import BookingModal from '../components/BookingModal';
import { useApp } from '../context/AppContext';

export default function SearchResults() {
  const { workers } = useApp();
  const [activeFilter, setActiveFilter] = useState('Top Rated');
  const [bookingWorker, setBookingWorker] = useState(null);

  const filters = ['Top Rated', 'Available Now', 'Under ₹500/hr', 'Distance', 'Experience'];

  return (
    <Layout>
      <div className="section pt-28 md:pt-32 pb-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="section-title text-3xl md:text-4xl">Plumbers in Mumbai</h1>
            <p className="section-subtitle mt-2">124 verified professionals available near you.</p>
          </div>

          {/* Search */}
          <div className="w-full md:w-80">
            <div className="flex items-center h-12 rounded-xl bg-surface-container-high border border-white/[0.06] px-4 focus-within:border-secondary/40 transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px] mr-2.5">search</span>
              <input className="bg-transparent text-sm text-on-surface outline-none w-full placeholder:text-on-surface-variant" defaultValue="Plumbing near Andheri" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 hide-scrollbar">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`chip ${activeFilter === f ? 'chip-active' : ''}`}
            >
              {f}
              {f === 'Available Now' && <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {/* Featured Card */}
          {workers.length > 0 && (
            <div className="md:col-span-2 xl:col-span-2 card p-0 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-container/60 to-surface-container-low z-0" />
              <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between min-h-[280px]">
                <div className="flex justify-between items-start">
                  <span className="badge badge-success">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" /> Available
                  </span>
                  <button className="p-1.5 rounded-lg hover:bg-white/[0.06] text-on-surface-variant transition-colors">
                    <span className="material-symbols-outlined text-[20px]">bookmark_border</span>
                  </button>
                </div>
                <div className="flex flex-col md:flex-row gap-5 items-end mt-auto">
                  {workers[0].image ? (
                    <img alt={workers[0].name} className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover ghost-border" src={workers[0].image} />
                  ) : (
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-surface-container-high flex items-center justify-center ghost-border text-on-surface-variant">
                      <span className="material-symbols-outlined text-4xl">person</span>
                    </div>
                  )}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl md:text-2xl font-headline font-bold text-on-surface">{workers[0].name}</h2>
                      {workers[0].verified && <span className="material-symbols-outlined text-tertiary text-lg" style={{fontVariationSettings:"'FILL' 1"}}>verified</span>}
                    </div>
                    <p className="text-sm text-primary mb-3">{workers[0].role} • {workers[0].rating}★ ({workers[0].reviews})</p>
                    <div className="flex flex-wrap gap-2">
                      {workers[0].tags?.map(t => <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-on-surface-variant ghost-border">{t}</span>)}
                      <span className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-on-surface-variant ghost-border">{workers[0].rate}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setBookingWorker(workers[0])}
                    className="btn btn-primary w-full md:w-auto"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Standard Cards */}
          {workers.slice(1).map(w => (
            <div key={w.id} className="card p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  {w.image ? (
                    <img alt={w.name} className="w-14 h-14 rounded-full object-cover ghost-border" src={w.image} />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center ghost-border">
                      <span className="material-symbols-outlined text-xl text-on-surface-variant">person</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface bg-surface-container-high px-2.5 py-1 rounded-lg">
                    <span className="material-symbols-outlined text-secondary text-sm" style={{fontVariationSettings:"'FILL' 1"}}>star</span>
                    {w.rating}
                  </div>
                </div>
                <h3 className="text-base font-headline font-bold text-on-surface">{w.name}</h3>
                <p className="text-sm text-on-surface-variant mb-2">{w.role}</p>
                {w.desc && <p className="text-sm text-on-surface-variant/80 line-clamp-2 mb-4">{w.desc}</p>}
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/[0.06]">
                <span className="font-headline font-bold text-on-surface">{w.rate}</span>
                <button 
                  onClick={() => setBookingWorker(w)}
                  className="btn-ghost text-sm font-semibold text-secondary flex items-center gap-1"
                >
                  Book Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 flex justify-center">
          <button className="btn btn-secondary">Load More</button>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingWorker && (
        <BookingModal 
          worker={bookingWorker} 
          onClose={() => setBookingWorker(null)} 
        />
      )}
    </Layout>
  );
}
