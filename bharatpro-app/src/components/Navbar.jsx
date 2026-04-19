import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/search', label: 'Services' },
  { path: '/materials', label: 'Materials' },
  { path: '/trust', label: 'Trust' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-2xl border-b border-outline/10 hidden md:flex transition-colors duration-300">
      <div className="flex justify-between items-center px-6 md:px-12 lg:px-20 py-3.5 w-full max-w-[1920px] mx-auto">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Bharat Pro" className="h-16 w-auto object-contain" />
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                pathname === path
                  ? 'text-on-surface bg-on-surface/5'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-on-surface/5'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme} 
            className="p-2.5 mr-2 text-on-surface-variant hover:text-on-surface rounded-xl hover:bg-on-surface/5 transition-colors"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <Link 
            to="/worker/register" 
            className="btn btn-secondary !py-2.5 !px-5 !text-sm !rounded-full mr-2"
          >
            Join as Worker
          </Link>
          <button className="p-2.5 text-on-surface-variant hover:text-on-surface rounded-xl hover:bg-on-surface/5 transition-colors">
            <span className="material-symbols-outlined text-[22px]">notifications</span>
          </button>
          <Link to="/profile" className="p-2.5 text-on-surface-variant hover:text-on-surface rounded-xl hover:bg-on-surface/5 transition-colors">
            <span className="material-symbols-outlined text-[22px]">account_circle</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
