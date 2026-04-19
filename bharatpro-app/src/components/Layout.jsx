import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';

export default function Layout({ children, hideFooter = false, hideBottomNav = false }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface transition-colors duration-300">
      <Navbar />
      
      {/* Mobile Top Bar */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-surface/80 backdrop-blur-2xl border-b border-outline/10">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Bharat Pro" className="h-10 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-1">
          <button 
            onClick={toggleTheme} 
            className="p-2 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-on-surface/5 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button className="p-2 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-on-surface/5 transition-colors">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
        </div>
      </header>

      <main className="flex-grow px-6 md:px-12 lg:px-20 max-w-[1920px] mx-auto w-full">
        {children}
      </main>
      {!hideFooter && <Footer />}
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}
