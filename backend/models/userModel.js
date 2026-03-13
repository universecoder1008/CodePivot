const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    ullname:{
        type:String,
        minLength:3,
        trim:true
    },
    email:String,
    password:String,
    solvedProblems: {
    type: [String],
    default: []
  },
  streak:{
  type:Number,
  default:0
},

lastSolvedDate:{
  type:Date,
  default:null
},
tests: [
{
type: { type: String },
score: Number,
correct: Number,
wrong: Number,
unanswered: Number,
total: Number,
date: Date
}
],

avgMockScore: {
type: Number,
default: 0
},

totalMockTests: {
type: Number,
default: 0
}
},
  {timestamps:true},)

module.exports = mongoose.model("user",userSchema);
