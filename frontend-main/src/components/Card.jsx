export const Card = ({ children, className = '' }) => (
  <div className={`rounded-2xl border border-borderTone-light bg-surface-light p-5 shadow-industrial transition-colors duration-500 dark:border-borderTone-dark dark:bg-surface-dark ${className}`}>
    {children}
  </div>
);
