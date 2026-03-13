export const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const variants = {
    primary:
      'bg-primary-light text-white hover:opacity-90 dark:bg-primary-dark dark:text-slate-900',
    secondary:
      'border border-borderTone-light bg-surface-light text-slate-800 hover:bg-slate-100 dark:border-borderTone-dark dark:bg-surface-dark dark:text-slate-100 dark:hover:bg-slate-800',
    accent: 'bg-accent text-slate-900 hover:bg-neon',
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
