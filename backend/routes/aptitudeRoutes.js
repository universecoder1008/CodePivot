const express = require("express");
const router = express.Router();
const Aptitude = require("../models/aptitudeModel");
const userModel = require("../models/userModel");
const auth = require("../middleware/authMiddleware");

router.get("/test", async (req,res)=>{

try{

const questions = await Aptitude.aggregate([
{ $sample: { size: 30 } }
]);

res.json(questions);

}catch(err){

console.error(err);
res.status(500).json({error:"Failed to load questions"});

}

});

router.post("/submit", auth, async (req,res)=>{
console.log("req.user:", req.user);
try{

const {answers, questions} = req.body;

let correct = 0;
let wrong = 0;
let unanswered = 0;

questions.forEach(q => {

const userAnswer = answers[q._id.toString()];

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
score,
correct,
wrong,
unanswered,
total:questions.length,
date:new Date()
});

router.post("/submit", auth, async (req,res)=>{
console.log("req.user:", req.user);
try{

const {answers, questions} = req.body;

let correct = 0;
let wrong = 0;
let unanswered = 0;

questions.forEach(q => {

const userAnswer = answers[q._id.toString()];

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
console.log("Correct:", correct);
console.log("Score:", score);
console.log("Total:", questions.length);

console.log("Percent:", (score / questions.length) * 100);

const user = await userModel.findById(req.user.id);

user.tests.push({
type:"aptitude",
score,
correct,
wrong,
unanswered,
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