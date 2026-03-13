import { Button } from './Button';

export const Modal = ({ title, open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl border border-borderTone-light bg-surface-light p-6 dark:border-borderTone-dark dark:bg-surface-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-3 text-lg font-bold">{title}</h3>
        <div className="mb-5 text-sm text-slate-600 dark:text-slate-300">{children}</div>
        <div className="flex justify-end">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};
