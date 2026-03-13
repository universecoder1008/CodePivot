import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AptitudeTest(){

const [questions,setQuestions] = useState([]);
const [current,setCurrent] = useState(0);
const [answers,setAnswers] = useState({});
const [timeLeft,setTimeLeft] = useState(2700);

const navigate = useNavigate();

useEffect(()=>{

const fetchQuestions = async ()=>{

try{

const res = await fetch("/api/aptitude/test", {
  credentials: "include",
});

const data = await res.json();

setQuestions(data);

}catch(err){
console.error(err);
}

};

fetchQuestions();

},[]);


const handleAnswer = (questionId,index)=>{

setAnswers(prev=>({
...prev,
[questionId]:index
}));

};


const handleClear = (questionId)=>{

const updated = {...answers};
delete updated[questionId];

setAnswers(updated);

};


const handleSubmit = async () => {
  console.log("All cookies:", document.cookie); // ← add this
  try {

const res = await fetch("http://localhost:3000/api/aptitude/submit",{

method:"POST",

credentials:"include",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
answers,
questions
})

});

const data = await res.json();
console.log("Backend result:", data);

navigate("/test/result",{
state:{
questions,
answers,
result:data
}
});

}catch(err){
console.error(err);
}

};


useEffect(()=>{

const timer = setInterval(()=>{

setTimeLeft(prev=>{

if(prev<=1){
clearInterval(timer);
handleSubmit();
return 0;
}

return prev-1;

});

},1000);

return ()=>clearInterval(timer);

},[]);


if(!questions.length){
return <div className="p-10 text-white">Loading test...</div>;
}

const q = questions[current] || {};

const minutes = Math.floor(timeLeft/60);
const seconds = timeLeft%60;


return(

<div className="p-8 text-white">

<div className="flex justify-between mb-6">

<h1 className="text-2xl font-bold">
Aptitude Test
</h1>

<div className="bg-red-600 px-4 py-2 rounded">
⏱ {minutes}:{seconds<10?`0${seconds}`:seconds}
</div>

</div>


<div className="grid grid-cols-4 gap-6">


<div className="col-span-3">

<h2 className="mb-4 text-lg">
Question {current+1} / {questions.length}
</h2>

<p className="mb-6">{q.question}</p>


<div className="space-y-3">

{q?.options?.map((opt,index)=>(

<button
key={index}
onClick={()=>handleAnswer(q._id,index)}
className={`block border p-3 rounded w-full text-left
${answers[q._id]===index
? "bg-blue-600 border-blue-400"
: "bg-slate-800"}
`}
>

{opt}

</button>

))}

</div>


<div className="flex gap-4 mt-6">

<button
onClick={()=>setCurrent(current-1)}
disabled={current===0}
className="bg-gray-600 px-4 py-2 rounded"
>
Previous
</button>

<button
onClick={()=>handleClear(q._id)}
className="bg-yellow-600 px-4 py-2 rounded"
>
Clear Response
</button>


{current===questions.length-1 ?

<button
onClick={handleSubmit}
className="bg-green-600 px-6 py-2 rounded"
>
Submit Test
</button>

:

<button
onClick={()=>setCurrent(current+1)}
className="bg-blue-600 px-4 py-2 rounded"
>
Next
</button>

}

</div>

</div>


<div className="bg-slate-900 p-4 rounded h-fit">

<h3 className="mb-3 font-semibold">
Questions
</h3>

<div className="grid grid-cols-5 gap-2">

{questions.map((q,index)=>(

<button
key={q._id}
onClick={()=>setCurrent(index)}
className={`p-2 rounded text-sm

${answers[q._id]!==undefined
? "bg-green-600"
: "bg-slate-700"}

${current===index
? "ring-2 ring-yellow-400"
: ""}
`}
>

{index+1}

</button>

))}

</div>

</div>

</div>

</div>

);

}

export default AptitudeTest;