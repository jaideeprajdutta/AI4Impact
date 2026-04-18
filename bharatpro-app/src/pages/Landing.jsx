import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Landing() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    navigate('/search');
  };

  return (
    <Layout hideFooter hideBottomNav>
      <div className="relative z-10">

        {/* HERO */}
        <section className="relative min-h-[100dvh] flex flex-col pt-32 pb-12 overflow-hidden">

          {/* subtle bg */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[10%] w-[420px] h-[420px] rounded-full bg-primary/10 blur-[140px]" />
            <div className="absolute bottom-[-10%] right-[10%] w-[360px] h-[360px] rounded-full bg-secondary/10 blur-[120px]" />
          </div>

          <div className="max-w-screen-2xl mx-auto w-full relative z-10 my-auto">

            {/* HERO CONTENT */}
            <div className="max-w-5xl mx-auto text-center px-4">

              {/* badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-semibold tracking-wide text-tertiary mb-6 animate-slide-up">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                VERIFIED LOCAL PROFESSIONALS
              </div>

              {/* heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-on-surface leading-[1.05] mb-5 animate-slide-up delay-100">
                Hire Trusted Workers <br />
                <span className="text-secondary mrs-sheppards-regular font-normal tracking-normal pt-2 inline-block text-5xl md:text-7xl lg:text-[5.5rem]">Across India</span>
              </h1>

              <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-8 animate-slide-up delay-200">
                Bharat Pro connects you with verified plumbers, electricians,
                carpenters, painters and more in minutes.
              </p>

              {/* ===== MAIN SEARCH BAR ===== */}
              <div className="max-w-3xl mx-auto mb-10 animate-slide-up delay-300">
                <form 
                  onSubmit={handleSearch}
                  className="group relative h-[64px] md:h-[72px] rounded-[2rem] glass-panel shadow-premium flex items-center px-4 md:px-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
                >
                  <span className="material-symbols-outlined text-secondary text-[24px] mr-3 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                    search
                  </span>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Need a plumber, electrician, carpenter..."
                    className="flex-1 bg-transparent outline-none text-base md:text-lg text-on-surface placeholder:text-on-surface-variant/60 font-medium"
                  />

                  <div className="w-px h-8 bg-outline/20 mx-3 hidden md:block" />

                  <button 
                    type="button"
                    onClick={() => navigate('/voice')}
                    className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-secondary/10 text-secondary border border-secondary/20 flex items-center justify-center hover:bg-secondary hover:text-white hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 shadow-premium"
                    title="AI Voice Assistant"
                  >
                    <span className="material-symbols-outlined text-[20px] md:text-[22px] font-bold">
                      mic
                    </span>
                  </button>
                </form>

                {/* helper text */}
                <div className="flex flex-wrap justify-center gap-4 mt-5">
                  <span className="text-[10px] md:text-xs font-bold text-on-surface-variant/50 uppercase tracking-widest">Popular:</span>
                  {['AC Repair', 'Cleaning', 'Plumbing', 'Painting'].map(tag => (
                    <button 
                      key={tag} 
                      onClick={() => navigate('/search')}
                      className="text-[10px] md:text-xs font-bold text-on-surface-variant hover:text-secondary transition-colors uppercase tracking-widest"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-slide-up delay-400">
                <Link
                  to="/search"
                  className="px-8 py-3.5 rounded-xl bg-secondary text-white font-semibold hover:opacity-90 transition shadow-glow"
                >
                  Explore Services
                </Link>
              </div>

              {/* stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto animate-slide-up delay-500">
                <div>
                  <div className="text-2xl md:text-4xl font-bold text-on-surface">
                    12K+
                  </div>
                  <p className="text-xs md:text-sm text-on-surface-variant mt-1">
                    Verified Workers
                  </p>
                </div>

                <div>
                  <div className="text-2xl md:text-4xl font-bold text-on-surface">
                    4.8★
                  </div>
                  <p className="text-xs md:text-sm text-on-surface-variant mt-1">
                    Average Rating
                  </p>
                </div>

                <div>
                  <div className="text-2xl md:text-4xl font-bold text-on-surface">
                    10 min
                  </div>
                  <p className="text-xs md:text-sm text-on-surface-variant mt-1">
                    Avg Response
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}