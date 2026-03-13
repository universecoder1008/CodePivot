import { useLocation } from "react-router-dom";

function AptitudeResult(){

const location = useLocation();

const questions = location.state?.questions || [];
const answers = location.state?.answers || {};
const result = location.state?.result || {};

return(

<div className="p-8 text-white">

<h1 className="text-3xl font-bold mb-6">
Test Result
</h1>

<div className="mb-8">

<p>Score: {result.score ?? 0}/{result.total ?? questions.length}</p>
<p className="text-green-400">Correct: {result.correct ?? 0}</p>
<p className="text-red-400">Wrong: {result.wrong ?? 0}</p>
<p className="text-gray-400">Unanswered: {result.unanswered ?? 0}</p>

</div>

{questions.map((q,index)=>{

const userAnswer = answers[q._id];

return(

<div key={q._id} className="mb-6 border p-4 rounded">

<h3 className="mb-3 font-semibold">
Question {index+1}
</h3>

<p className="mb-4">{q.question}</p>

{q.options.map((opt,i)=>{

let style = "bg-slate-800";

/* correct answer */
if(i === q.correctAnswer){
style = "bg-green-600";
}

/* wrong answer selected */
if(userAnswer === i && userAnswer !== q.correctAnswer){
style = "bg-red-600";
}

return(

<div
key={i}
className={`p-2 rounded mb-2 ${style}`}
>
{opt}
</div>

)

})}

</div>

)

})}

</div>

)

}

export default AptitudeResult;