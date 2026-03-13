import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { featureList } from '../data/mockData';

export const LandingPage = () => {

  const navigate = useNavigate();

  const handleStartPreparing = async () => {

    try {

      const res = await fetch("http://localhost:3000/api/user/profile", {
        credentials: "include"
      });

      if(res.status === 200){
        navigate("/dashboard");
      } else {
        navigate("/signup");
      }

    } catch {
      navigate("/signup");
    }

  };

  return (
    <section className="space-y-8">

      <div className="rounded-3xl border border-borderTone-light bg-surface-light p-8 dark:border-borderTone-dark dark:bg-surface-dark md:p-14">

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Placement Preparation Platform
        </p>

        <h2 className="max-w-2xl text-4xl font-black leading-tight md:text-6xl">
          Train smarter. Crack interviews faster.
        </h2>

        <p className="mt-4 max-w-xl text-sm text-slate-600 dark:text-slate-300">
          A modern prep workspace for coding practice, mock tests, AI help, and hiring signals.
        </p>

        <div className="mt-8">
          <Button onClick={handleStartPreparing} className="px-6 py-3">
            Start Preparing
          </Button>
        </div>

      </div>

      <div className="card-grid">
        {featureList.map((item) => (
          <Card key={item.title}>
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.desc}</p>
          </Card>
        ))}
      </div>

    </section>
  );
};