import { useMemo, useState, useEffect } from "react";
import { Badge } from "../components/Badge";
import { Card } from "../components/Card";


export const PracticePage = () => {
  
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [problems, setProblems] = useState([]);

  const solvedCount = problems.filter(p =>
    solvedProblems.includes(p._id)
  ).length;
  // Toggle solved problem
  const toggleProblem = async (problemId) => {
    try {

      await fetch("http://localhost:3000/api/problems/toggle",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({ problemId })
      });

     setSolvedProblems(prev => {

  if(prev.includes(problemId)){
    return prev.filter(p => p !== problemId);
  }

  if(prev.includes(problemId)){
    return prev;
  }

  return [...prev, problemId];

});

    } catch(err){
      console.log(err);
    }
  };

  // Load solved problems on page load
 useEffect(() => {

  const fetchUser = async () => {

    try{

      const res = await fetch("http://localhost:3000/api/user/profile",{
        credentials:"include"
      });

      const data = await res.json();

      setSolvedProblems(data.solvedProblems || []);

    }catch(err){
      console.error(err);
    }

  };

  const fetchProblems = async () => {

    try{

      const res = await fetch("http://localhost:3000/api/problems");

      const data = await res.json();
      console.log(data);

      setProblems(data);

    }catch(err){
      console.error(err);
    }

  };

  fetchUser();
  fetchProblems();

},[]);

  // Filter problems by topic + difficulty
  const filtered = useMemo(() => {

    return problems.filter(problem =>
      (difficulty === "All" || problem.difficulty === difficulty) &&
      (topic === "All" || problem.topic === topic)
    );

  },[difficulty,topic]);

  // Topic progress calculation
  const topicProgress = useMemo(() => {

    const stats = {};

    problems.forEach(problem => {

      if(!stats[problem.topic]){
        stats[problem.topic] = { total:0, solved:0 };
      }

      stats[problem.topic].total += 1;

      if(solvedProblems.includes(problem._id)){
        stats[problem.topic].solved += 1;
      }

    });

    return stats;

  },[solvedProblems]);

  return (

    <section className="space-y-6">

      <h2 className="text-3xl font-black">Practice Problems</h2>

      {/* Progress Cards */}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

        {Object.entries(topicProgress).map(([topic,data]) => (

          <div
            key={topic}
            className="p-3 border rounded-lg bg-white dark:bg-slate-800"
          >

            <div className="flex justify-between text-sm font-medium">

              <span>{topic}</span>

              <span>
                {data.solved} / {data.total}
              </span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">

              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width:`${data.total ? (data.solved/data.total)*100 : 0}%`
                }}
              />

            </div>

          </div>

        ))}

      </div>

      <Card>

        {/* Filters */}

        <div className="mb-4 grid gap-3 sm:grid-cols-2">

          <select
            className="input"
            value={difficulty}
            onChange={(e)=>setDifficulty(e.target.value)}
          >
            {["All","Easy","Medium","Hard"].map(value=>(
              <option key={value}>{value}</option>
            ))}
          </select>

          <select
            className="input"
            value={topic}
            onChange={(e)=>setTopic(e.target.value)}
          >
            {[
              "All",
"Programming Fundamentals",
"Time and Space Complexity",
"Online Judge",
"Dsa Fundamentals",
"Sorting",
"Two Pointers",
"Prefix Sum",
"Matrix",
"Hashing",
"Sliding Window",
"Linked List",
"Stack",
"Queue",
"Binary Search",
"Bit Manipulation",
"Recursion",
"Backtracking",
"Binary Tree",
"Binary Search Tree",
"Heap",
"Trie",
"Greedy",
"Dynamic Programming Level 1",
"Graphs",
"Combinatorics",
"Geometry",
"Game Theory",
"Dynamic Programming Level 2",
"String Matching",
"Advanced Algorithms"
            ].map(value=>(
              <option key={value}>{value}</option>
            ))}
          </select>

        </div>

        {/* Overall progress */}

        <div className="text-sm text-gray-500 mb-3">
  {solvedCount} / {problems.length} problems solved
</div>

        {/* Problems Table */}

        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead>

              <tr className="border-b border-borderTone-light dark:border-borderTone-dark">

                <th className="p-2">Solved</th>
                <th className="p-2">Problem</th>
                <th className="p-2">Topic</th>
                <th className="p-2">Difficulty</th>

              </tr>

            </thead>

            <tbody>

              {filtered.map(problem => (

                <tr
                  key={problem._id}
                  className="border-b border-borderTone-light/60 dark:border-borderTone-dark/60"
                >

                  <td className="p-2">

                    <input
                      type="checkbox"
                      checked={solvedProblems.includes(problem._id)}
                      onChange={()=>toggleProblem(problem._id)}
                    />

                  </td>

                  <td className="p-2 font-medium">

                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {problem.title}
                    </a>

                  </td>

                  <td className="p-2">
                    <Badge>{problem.topic}</Badge>
                  </td>

                  <td className="p-2">
                    <Badge tone={problem.difficulty === "Hard" ? "warning" : "info"}>
                      {problem.difficulty}
                    </Badge>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </Card>

    </section>

  );

};