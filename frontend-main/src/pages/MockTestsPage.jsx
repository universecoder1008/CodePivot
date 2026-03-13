import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { mockTests } from "../data/mockData";

export const MockTestsPage = () => {

  const navigate = useNavigate();

  const handleStartTest = (test) => {
    if (test.title === "Aptitude Sprint") {
      navigate("/test/aptitude");
    } else if (test.title === "DSA Core Round") {
      navigate("/mock/dsa-core");
    } else {
      navigate("/test/full");
    }
  };

  return (
  <section className="space-y-6">

    <h2 className="text-3xl font-black">Mock Tests</h2>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

      {mockTests.map((test) => (
        <Card
          key={test.id}
          className="p-6 transition hover:scale-[1.02] hover:shadow-lg"
        >

          <h3 className="text-lg font-bold">{test.title}</h3>

          <p className="mt-2 text-sm text-slate-400">
            {test.questions} · {test.duration}
          </p>

          {test.title === "DSA Core Round" && (
            <div className="flex gap-2 mt-3 text-xs font-semibold">
              <span className="text-green-400">Easy</span>
              <span className="text-yellow-400">Medium</span>
              <span className="text-red-400">Hard</span>
            </div>
          )}

          <Button
            className="mt-5 w-fit"
            onClick={() => handleStartTest(test)}
          >
            Start Test
          </Button>

        </Card>
      ))}

    </div>

  </section>
);
};