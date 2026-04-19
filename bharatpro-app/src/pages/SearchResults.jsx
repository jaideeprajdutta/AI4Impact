import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import BookingModal from '../components/BookingModal';

const BASE_URL = "http://127.0.0.1:8000";

export default function SearchResults() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("q") || "plumber near me";

  const [workers, setWorkers] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Top Rated');
  const [bookingWorker, setBookingWorker] = useState(null);
  const [loading, setLoading] = useState(false);

  const filters = ['Top Rated', 'Available Now', 'Under ₹500/hr', 'Distance', 'Experience'];

  // 🔥 FETCH FROM BACKEND
  const fetchWorkers = async (searchQuery) => {
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      const data = await res.json();

      const mapped = (data.results || []).map((w) => {
        const basePrice = Math.floor(300 + Math.random() * 300);
        return {
          id: w.id,              // ✅ real DB worker id
          name: w.name,
          role: w.skill,
          rating: w.rating,
          location: w.location,  // ✅ real DB location
          score: w.score,
          price: basePrice,      // ✅ numeric price for BookingModal

          // UI-compatible fields
          desc: `Top-rated ${w.skill} in ${w.location} (${w.rating}★)`,
          rate: `₹${basePrice}/hr`,

          // UI support fields
          reviews: Math.floor(20 + Math.random() * 200),
          verified: true,
          tags: [w.skill, w.location],
        };
      });


      setWorkers(mapped);

    } catch (err) {
      console.error("❌ fetch error:", err);
    }

    setLoading(false);
  };

  const navigate = useNavigate();

  // 🔥 INITIAL LOAD FROM URL
  useEffect(() => {
    fetchWorkers(initialQuery);
  }, [location.search]);

  return (
    <Layout>
      <div className="section pt-28 md:pt-32 pb-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="section-title text-3xl md:text-4xl">
              Results for "{initialQuery}"
            </h1>
            <p className="section-subtitle mt-2">
              {workers.length} verified professionals available near you.
            </p>
          </div>

          {/* Search (UI untouched) */}
          <div className="w-full md:w-80">
            <div className="flex items-center h-12 rounded-xl bg-surface-container-high border border-white/[0.06] px-4 focus-within:border-secondary/40 transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px] mr-2.5">search</span>
              <input
                className="bg-transparent text-sm text-on-surface outline-none w-full placeholder:text-on-surface-variant"
                defaultValue={initialQuery}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Filters (unchanged) */}
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

        {/* RESULTS GRID (100% SAME UI) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {workers.length > 0 && (
            <div className="md:col-span-2 xl:col-span-2 card p-0 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-container/60 to-surface-container-low z-0" />
              <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between min-h-[280px]">

                <div className="flex justify-between items-start">
                  <span className="badge badge-success">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" /> Available
                  </span>
                </div>

                <div className="flex flex-col md:flex-row gap-5 items-end mt-auto">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-surface-container-high flex items-center justify-center ghost-border">
                    <span className="material-symbols-outlined text-4xl">person</span>
                  </div>

                  <div className="flex-grow">
                    <h2 className="text-xl md:text-2xl font-headline font-bold text-on-surface">
                      {workers[0].name}
                    </h2>
                    <p className="text-sm text-primary mb-3">
                      {workers[0].role} • {workers[0].rating}★ ({workers[0].reviews})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {workers[0].tags.map(t => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-on-surface-variant ghost-border">
                          {t}
                        </span>
                      ))}
                      <span className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-on-surface-variant ghost-border">
                        {workers[0].rate}
                      </span>
                    </div>
                  </div>

                  <button onClick={() => setBookingWorker(workers[0])} className="btn btn-primary">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {workers.slice(1).map(w => (
            <div key={w.id} className="card p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-headline font-bold text-on-surface">{w.name}</h3>
                <p className="text-sm text-on-surface-variant mb-2">{w.role}</p>
                <p className="text-sm text-on-surface-variant/80 line-clamp-2 mb-4">{w.desc}</p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/[0.06]">
                <span className="font-headline font-bold text-on-surface">{w.rate}</span>
                <button onClick={() => setBookingWorker(w)} className="btn-ghost text-sm font-semibold text-secondary">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {bookingWorker && (
          <BookingModal
            worker={bookingWorker}
            onClose={() => setBookingWorker(null)}
          />
        )}
      </div>
    </Layout>
  );
}