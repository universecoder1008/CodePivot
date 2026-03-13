const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/generatetoken");

module.exports.registerUser = async (req,res)=>{
  try {

    let {email,password,fullname} = req.body;

    let user = await userModel.findOne({email});
    if(user){
      return res.status(401).json({
        error:"email already registered"
      });
    }

    const hash = await bcrypt.hash(password,10);

    user = await userModel.create({
      email,
      password:hash,
      fullname
    });

    const token = generateToken(user);

    res.cookie("token",token,{
      httpOnly:true,
      sameSite:"lax",
      secure:false
    });

    res.json({
      message:"user created successfully"
    });

  } catch (err) {
    res.status(500).json({
      error:err.message
    });
  }
};

module.exports.loginUser = async(req,res)=>{

  let {email,password} = req.body;

  let user = await userModel.findOne({email});

  if(!user){
    return res.status(401).json({
      error:"email or password incorrect"
    });
  }

  const result = await bcrypt.compare(password,user.password);

  if(!result){
    return res.status(401).json({
      error:"email or password incorrect"
    });
  }

  const token = generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  });

  res.json({
    message:"login successful"
  });

};