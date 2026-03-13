const express = require('express')
const userModel = require("../models/userModel");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");

router.post("/submit", isLoggedIn, async (req,res)=>{

try{

const {answers, questions} = req.body;

let correct = 0;
let wrong = 0;
let unanswered = 0;

questions.forEach(q=>{

const userAnswer = answers[q._id];

if(userAnswer === undefined){
unanswered++;
}
else if(userAnswer === q.correctAnswer){
correct++;
}
else{
wrong++;
}

});

const score = correct;

const user = await userModel.findById(req.user.id);

user.tests.push({
type:"aptitude",
score:score,
correct:correct,
wrong:wrong,
unanswered:unanswered,
total:questions.length,
date:new Date()
});

await user.save();

res.json({
score,
correct,
wrong,
unanswered,
total:questions.length
});

}catch(err){

console.error(err);
res.status(500).json({error:"Submit failed"});

}

});
module.exports = router;