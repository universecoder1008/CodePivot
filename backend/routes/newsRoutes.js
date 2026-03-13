const express = require("express");
const router = express.Router();
const News = require("../models/News");


// GET all news
router.get("/", async (req,res) => {
  try{
    const news = await News.find().sort({createdAt:-1});
    res.json(news);
  }catch(err){
    res.status(500).json({error:"Server error"});
  }
});


// ADD news
router.post("/", async (req,res)=>{
  try{
    const news = new News(req.body);
    await news.save();
    res.json(news);
  }catch(err){
    res.status(400).json({error:"Error creating news"});
  }
});

module.exports = router;