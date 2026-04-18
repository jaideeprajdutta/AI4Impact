import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Bharat Pro" className="h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { to: '/', label: 'Home' },
            { to: '/search', label: 'Services' },
            { to: '/materials', label: 'Materials' },
            { to: '/trust', label: 'Trust & Safety' },
            { to: '/voice', label: 'AI Assistant' },
            { to: '/worker/register', label: 'Worker Portal' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-[0.8125rem] text-on-surface-variant hover:text-on-surface transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-on-surface-variant/60">
          © 2024 Bharat Pro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
