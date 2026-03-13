export const Badge = ({ children, tone = 'default' }) => {
  const tones = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
    success: 'bg-neon/20 text-neon',
    info: 'bg-accent/20 text-accent',
    warning: 'bg-amber-400/20 text-amber-500',
  };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
};
