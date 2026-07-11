const mongoose = require('mongoose');

const conDb = async()=>{
    try{
 
      await mongoose.connect('mongodb://127.0.0.1:27017/todo-tasks-manager')
      console.log("Connected to Mongo DB successfully .");
    }
    catch(e){
        console.error('failed to connect to the Database server.')
    }
}
// conDb();
module.exports=conDb;
