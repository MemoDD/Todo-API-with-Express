const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const mongoose =require("mongoose");
//connection
mongoose.connect('mongodb://127.0.0.1:27017/todo-tasks-manager')
.then(()=> console.log("Mogodb connected."))
.catch((err)=>console.log("error:"+ err));

/*Using database to handle data*/

const taskSchema = new mongoose.Schema({
id:{type: Number,
    unique: true,
},
task:{
    type: String,
    required: true,
},
completed: { type: Boolean, default:false},


})

//Creating db model
const Todo = new mongoose.model("Todo",taskSchema);

app.use(express.json());
app.get('/',(req,res)=>{
    res.json("I made Todo api. Use endpoint todos to get them.😎😊");
});
 
app.get('/todos',async(req,res)=>{
    const todos =await Todo.find();
    res.json(todos);

});

app.get('/todos/:id',(req,res)=>{
const id = parseInt(req.params.id);
const todo = Todo.findOne({id : id});
if(!todo){return res.status(404).json(" todo not found.")}
res.json(todo);
})
app.post('/todos',async(req,res)=>{
    //Validating client's request 
    if(!req.body.task){res.status(404).json(" Task is mandatory. Please write the task.")}
const last = await Todo.findOne().sort({ id: -1 });
  const nextId = last ? last.id + 1 : 1;
    const result = await Todo.create({
    id:nextId,
    task:req.body.task,
    completed:false
})
res.status(201).json(result);
})

// fitering search by completed Tasks
app.put('/todos/:id',async(req,res)=>{
const id = parseInt(req.params.id);
const todo= await Todo.findOneAndUpdate(
    {id:id},
    {task:req.body.task},
)
if(!todo){
   return res.status(404).json("Id not found.");
}
res.json(todo);
})

app.delete('/todos/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const todo = Todo.findOneAndDelete({id : id });
    if(!todo){res.status(404).json("Todo not found.")}
    res.json({message:"Todo deleted successfully."});
})

app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})