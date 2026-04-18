import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const sidebarLinks = [
  { path: '/worker/dashboard', icon: 'grid_view', label: 'Dashboard' },
  { path: '/worker/jobs', icon: 'work', label: 'Jobs' },
  { path: '/worker/earnings', icon: 'account_balance_wallet', label: 'Earnings' },
  { path: '/worker/voice', icon: 'mic', label: 'AI Assistant' },
  { path: '/worker/profile', icon: 'person', label: 'Profile' },
];

export default function WorkerLayout({ children }) {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface text-on-surface flex">
      {/* Sidebar — Desktop */}
      <aside className="hidden lg:flex flex-col w-[260px] border-r border-white/[0.06] bg-surface-container-lowest shrink-0 sticky top-0 h-screen">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 px-6 py-5 border-b border-white/[0.06]">
          <img src="/logo.png" alt="Bharat Pro" className="h-14 w-auto object-contain" />
        </Link>

        {/* Worker Info */}
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary-container flex items-center justify-center text-white font-bold text-sm">
              RK
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-on-surface truncate">Rajesh Kumar</p>
              <p className="text-xs text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-tertiary text-[12px]" style={{fontVariationSettings:"'FILL' 1"}}>verified</span>
                Master Plumber
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
          {sidebarLinks.map(({ path, icon, label }) => {
            const active = pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-secondary/10 text-secondary'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]" style={active ? {fontVariationSettings:"'FILL' 1"} : {}}>
                  {icon}
                </span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/[0.06]">
          <Link
            to="/"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04] transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Back to Marketplace
          </Link>
        </div>
      </aside>

      {/* Mobile Header + Overlay */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Mobile Top Bar */}
        <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-surface/80 backdrop-blur-2xl border-b border-white/[0.06]">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 rounded-lg hover:bg-white/[0.04]">
            <span className="material-symbols-outlined text-on-surface">menu</span>
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Bharat Pro" className="h-11 w-auto object-contain" />
            <span className="font-extrabold text-on-surface font-headline text-xs ml-1 whitespace-nowrap">Worker Portal</span>
          </Link>
          <button className="p-2 -mr-2 rounded-lg hover:bg-white/[0.04]">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">notifications</span>
          </button>
        </header>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
            <div className="relative w-[280px] bg-surface-container-lowest border-r border-white/[0.06] flex flex-col animate-slide-in">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                <span className="font-extrabold text-on-surface font-headline">Menu</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-white/[0.04]">
                  <span className="material-symbols-outlined text-on-surface-variant">close</span>
                </button>
              </div>
              <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
                {sidebarLinks.map(({ path, icon, label }) => {
                  const active = pathname === path;
                  return (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        active ? 'bg-secondary/10 text-secondary' : 'text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]" style={active ? {fontVariationSettings:"'FILL' 1"} : {}}>
                        {icon}
                      </span>
                      {label}
                    </Link>
                  );
                })}
              </nav>
              <div className="px-3 py-4 border-t border-white/[0.06]">
                <Link to="/" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04]" onClick={() => setSidebarOpen(false)}>
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                  Marketplace
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest/90 backdrop-blur-2xl border-t border-white/[0.06] z-40">
          <div className="flex justify-around items-center h-16 px-2 max-w-md mx-auto">
            {sidebarLinks.slice(0, 5).map(({ path, icon, label }) => {
              const active = pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-colors ${
                    active ? 'text-secondary' : 'text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]" style={active ? {fontVariationSettings:"'FILL' 1"} : {}}>
                    {icon}
                  </span>
                  <span className="text-[10px] font-semibold">{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
