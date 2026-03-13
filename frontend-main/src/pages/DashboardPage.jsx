import { useEffect, useState } from "react";
import { BookOpen, Brain, Newspaper, PlayCircle } from "lucide-react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";


const actions = [
  { icon: PlayCircle, title: "Continue Practice", path: "/practice" },
  { icon: Brain, title: "Ask AI", path: "/ai-assistant" },
  { icon: Newspaper, title: "Latest News", path: "/news" },
];

export const DashboardPage = () => {
const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [problems, setProblems] = useState([]);

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/user/profile", {
          credentials: "include"
        });

        if (!res.ok) {
          setUser({});
          return;
        }

        const data = await res.json();
        setUser(data);

      } catch (err) {
        console.error(err);
        setUser({});
      }
    };

    const fetchProblems = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/problems");

        if (!res.ok) {
          setProblems([]);
          return;
        }

        const data = await res.json();
        setProblems(data);

      } catch (err) {
        console.error(err);
        setProblems([]);
      }
    };

    fetchUser();
    fetchProblems();

  }, []);

  // Difficulty progress
  const difficultyStats = {
    Easy: { total: 0, solved: 0 },
    Medium: { total: 0, solved: 0 },
    Hard: { total: 0, solved: 0 }
  };

  problems.forEach(problem => {

    if (!difficultyStats[problem.difficulty]) return;

    difficultyStats[problem.difficulty].total++;

   if(user?.solvedProblems?.includes(problem._id.toString())){
      difficultyStats[problem.difficulty].solved++;
    }

  });

  if (!user) {
    return <div className="p-6">Loading...</div>;
  }
  const mockTests = user?.tests?.filter(t => t.type === "aptitude") || [];

const avgScorePercent = mockTests.length
  ? (
      mockTests.reduce((sum, t) => sum + (t.score / t.total) * 100, 0) /
      mockTests.length
    ).toFixed(2)
  : "0.00";
 
  const lastTest = mockTests.length
  ? mockTests[mockTests.length - 1]
  : null;

  return (

    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">

      {/* Sidebar */}

      <aside className="rounded-2xl border border-borderTone-light bg-surface-light p-4 dark:border-borderTone-dark dark:bg-surface-dark">

        <p className="mb-4 text-xs uppercase tracking-wider text-slate-500">
          Workspace
        </p>

        <div className="space-y-3 text-sm">

          <div className="flex items-center gap-2 font-semibold">
            <BookOpen size={16}/> Problem Tracker
          </div>

          <div className="flex items-center gap-2 font-semibold">
            <Brain size={16}/> AI Insights
          </div>

          <div className="flex items-center gap-2 font-semibold">
            <Newspaper size={16}/> Hiring Feed
          </div>

        </div>

      </aside>

      {/* Main Section */}

      <section className="space-y-6">

        <h2 className="text-3xl font-black">
          Welcome back, {user?.fullname || "Coder"} 👋
        </h2>

        {/* Stats */}

        <div className="card-grid">

          <Card>
            <p className="text-xs text-slate-500">Solved problems</p>
            <h3 className="mt-1 text-3xl font-black">
              {user.solvedProblems?.length || 0}
            </h3>
          </Card>

          <Card>
            <p className="text-xs text-slate-500">Mock score avg</p>
            <h3 className="mt-1 text-3xl font-black">
              {avgScorePercent}%
            </h3>
          </Card>

          <Card>
            <p className="text-xs text-slate-500">Streak</p>
            <h3 className="mt-1 text-3xl font-black">
              {user.streak || 0} days
            </h3>
          </Card>

          <Card>
  <p className="text-xs text-slate-500">Last mock test</p>
  <h3 className="mt-1 text-3xl font-black">
    {lastTest ? `${lastTest.score}/${lastTest.total}` : "—"}
  </h3>
</Card>

        </div>

        {/* Difficulty Progress */}

        <div className="space-y-4">

          <h3 className="text-xl font-bold">
            Difficulty Progress
          </h3>

          <div className="grid grid-cols-3 gap-6">

            {Object.entries(difficultyStats).map(([difficulty, data]) => {

              const percent = data.total
                ? Math.round((data.solved / data.total) * 100)
                : 0;

              return (

                <div key={difficulty} className="flex flex-col items-center">

                  <div className="relative w-20 h-20">

                    <svg className="w-20 h-20 transform -rotate-90">

                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        stroke="gray"
                        strokeWidth="6"
                        fill="transparent"
                      />

                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        stroke={
                          difficulty === "Easy"
                            ? "#22c55e"
                            : difficulty === "Medium"
                            ? "#facc15"
                            : "#ef4444"
                        }
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={213}
                        strokeDashoffset={213 - (213 * percent) / 100}
                      />

                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                      {percent}%
                    </div>

                  </div>

                  <p className="mt-2 text-sm font-semibold">
                    {difficulty}
                  </p>

                  <p className="text-xs text-slate-500">
                    {data.solved}/{data.total}
                  </p>

                </div>

              );

            })}

          </div>

        </div>

        {/* Actions */}

        <div className="grid gap-4 md:grid-cols-3">

          {actions.map(({ icon: Icon, title, path }) => (

            <Card key={title} className="flex items-center justify-between">

              <div className="flex items-center gap-3">
                <Icon size={18}/>
                <span className="font-semibold">{title}</span>
              </div>

              <Button
  variant="secondary"
  onClick={() => navigate(path)}
>
  Open
</Button>

            </Card>

          ))}

        </div>

      </section>

    </div>

  );

};