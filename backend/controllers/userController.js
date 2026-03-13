const userModel = require('../models/userModel');

module.exports.getUser = async (req,res) => {

try{

const user = await userModel
  .findById(req.user.id)
  .select("-password");

if(!user){
  return res.status(404).json({
    error:"User not found"
  });
}

res.json({
  fullname:user.fullname,
  email:user.email,
  solvedProblems:user.solvedProblems,
  streak:user.streak,
  tests:user.tests || []
});

}catch(error){

res.status(500).json({
  error:"Failed to fetch user"
});

}

};