import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/', icon: 'home', label: 'Home' },
  { path: '/search', icon: 'search', label: 'Services' },
  { path: '/trust', icon: 'verified_user', label: 'Trust' },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-sm rounded-2xl bg-surface-container/90 backdrop-blur-2xl border border-white/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.5)] z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map(({ path, icon, label }) => {
          const isActive = pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-secondary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]" style={isActive ? {fontVariationSettings: "'FILL' 1"} : {}}>
                {icon}
              </span>
              <span className="text-[10px] font-semibold tracking-wide">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
