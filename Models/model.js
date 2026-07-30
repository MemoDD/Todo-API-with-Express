const mongoose = require('mongoose');
const db = require('../db');
db();

const taskSchema = new mongoose.Schema({
S_no:{
    type:Number,
},
task:{
    type:String,
    required:true,
    minlength:3,
    maxlength:100,
},
completed:{
    type:Boolean,
    default:false,
},
created_at:{
    type:Date,
    default:Date.now(),
}

})

const Todo = new mongoose.model("Todo",taskSchema);
module.exports=Todo;
