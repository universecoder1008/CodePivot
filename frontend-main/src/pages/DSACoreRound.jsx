import { useEffect, useState } from "react";

export default function DSACoreRound(){

  const [questions,setQuestions] = useState([]);
  const [checked,setChecked] = useState({});
  const [time,setTime] = useState(5400); // 90 minutes
  const [showResult,setShowResult] = useState(false);
  const [score,setScore] = useState(0);

  useEffect(()=>{

    fetch("http://localhost:3000/api/mock/dsa-core",{
      credentials:"include"
    })
    .then(res=>res.json())
    .then(data=>setQuestions(data));

  },[]);

  // timer
  useEffect(()=>{
    const timer = setInterval(()=>{
      setTime(prev => prev > 0 ? prev - 1 : 0);
    },1000);

    return ()=> clearInterval(timer);
  },[]);

  const minutes = Math.floor(time/60);
  const seconds = time%60;

  const toggle = (id)=>{
    setChecked(prev=>({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const submitTest = ()=>{

  const marks = {
    Easy:8,
    Medium:10,
    Hard:12
  };

  let totalScore = 0;

  questions.forEach(q=>{
    if(checked[q._id]){
      totalScore += marks[q.difficulty];
    }
  });

  setScore(totalScore);
  setShowResult(true);

};

  if(!questions.length) return <h2 style={{textAlign:"center"}}>Loading Test...</h2>;

  return (
  <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>

    <h1 style={{ textAlign: "center" }}>DSA Core Round</h1>

    <div
      style={{
        textAlign: "center",
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "20px"
      }}
    >
      Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>

    {questions.map((q) => (
      <div
        key={q._id}
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "15px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div>

          <input
            type="checkbox"
            checked={checked[q._id] || false}
            onChange={() => toggle(q._id)}
          />

          <a
            href={q.link}
            target="_blank"
            rel="noreferrer"
            style={{
              marginLeft: "10px",
              textDecoration: "none",
              fontWeight: "500"
            }}
          >
            {q.title}
          </a>

          <span
            style={{
              marginLeft: "10px",
              color:
                q.difficulty === "Easy"
                  ? "green"
                  : q.difficulty === "Medium"
                  ? "orange"
                  : "red"
            }}
          >
            ({q.difficulty})
          </span>
        </div>

        <a
          href={q.link}
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "6px 12px",
            background: "#4f46e5",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "14px"
          }}
        >
          Solve
        </a>
      </div>
    ))}

    <button
      onClick={submitTest}
      style={{
        width: "100%",
        padding: "12px",
        background: "#22c55e",
        border: "none",
        color: "white",
        fontSize: "16px",
        borderRadius: "8px",
        cursor: "pointer",
        marginTop: "20px"
      }}
    >
      Submit Test
    </button>

    {showResult && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}
  >
    <div
      style={{
        background: "#111827",
        padding: "40px",
        borderRadius: "14px",
        textAlign: "center",
        width: "320px",
        color: "white",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Test Result</h2>

      <div
        style={{
          width: "130px",
          height: "130px",
          borderRadius: "50%",
          border: "10px solid #22c55e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "26px",
          fontWeight: "bold",
          margin: "20px auto",
          color: "#22c55e"
        }}
      >
        {score}/30
      </div>

      <button
        onClick={() => (window.location.href = "/dashboard")}
        style={{
          marginTop: "10px",
          padding: "12px 24px",
          background: "#6366f1",
          border: "none",
          color: "white",
          fontSize: "15px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "500"
        }}
      >
        Go to Dashboard
      </button>
    </div>
  </div>
)}
  </div>
);
}