const Problem = require("../models/problemModel");
const TestResult = require("../models/testResultModel");

const submitMock = async (req,res)=>{
  try{

    const { score, total } = req.body;

    const result = await TestResult.create({
      userId: req.user._id,
      score,
      total
    });

    res.json(result);

  }catch(err){
    res.status(500).json({error:"Server error"});
  }
};

const getDSACoreRound = async (req,res)=>{
  try{

    const easy = await Problem.aggregate([
      { $match: { difficulty:"Easy" }},
      { $sample: { size:1 }}
    ]);

    const medium = await Problem.aggregate([
      { $match: { difficulty:"Medium" }},
      { $sample: { size:1 }}
    ]);

    const hard = await Problem.aggregate([
      { $match: { difficulty:"Hard" }},
      { $sample: { size:1 }}
    ]);

    res.json([...easy,...medium,...hard]);

  }catch(err){
    res.status(500).json({error:"Server error"});
  }
};

module.exports = { submitMock, getDSACoreRound };