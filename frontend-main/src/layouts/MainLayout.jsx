import { NavLink, Outlet } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import logo from '../assets/codePivotlogo.png';

const navItems = [
  ['/', 'Home'],
  ['/dashboard', 'Dashboard'],
  ['/practice', 'Practice'],
  ['/mock-tests', 'Mock Tests'],
  ['/ai-assistant', 'AI Assistant'],
  ['/news', 'News'],
];

export const MainLayout = ({ theme, onToggleTheme }) => {
  return (
    <div className="relative min-h-screen  bg-grid">
      <header className="sticky top-0 z-40 border-b border-borderTone-light bg-bg-light/80 backdrop-blur dark:border-borderTone-dark dark:bg-bg-dark/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <NavLink to="/" className="flex items-center gap-2">
  <img src={logo} alt="CodePivot" className="h-8 w-8" />
  <h1 className="text-lg font-black tracking-tight">CodePivot</h1>
</NavLink>
          <nav className="hidden gap-4 md:flex">
            {navItems.map(([to, label]) => (
              <NavLink key={to} to={to} className="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                {label}
              </NavLink>
            ))}
          </nav>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
      <footer className="border-t border-borderTone-light px-4 py-6 text-center text-xs text-slate-500 dark:border-borderTone-dark">
        Built for placement prep with focus + flow.
      </footer>
    </div>
  );
};
