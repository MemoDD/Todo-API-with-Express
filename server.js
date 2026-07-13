const Todo = require('./model');
const joi = require('joi');
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.get('/',(req,res)=>{
    res.json("I made Todo api. Use endpoint todos to get them.😎😊");
});
 
app.get('/todos',async(req,res)=>{
    //pagination
    const page = parseInt(req.query.page)||1;
    const limit = parseInt(req.query.limit)||10;
    const skip = (page-1)*limit;

    // filtering for completed tasks
    const filter={};
    if(req.query.completed !== undefined){
     filter.completed = req.query.completed==='true';

    }
    const todos =await Todo.find(filter).skip(skip).limit(limit);
    res.json(todos);

});

app.get('/todos/:id',(req,res)=>{
const id = parseInt(req.params.id);
const todo = Todo.findOne({id : id});
if(!todo){return res.status(404).json(" todo not found.")}
res.json(todo);
})
app.post('/todos',async(req,res)=>{
    //Validating client's request using JOI
    const todoSchema = new joi.object({
task: joi.string().min(3).max(100).required(),
completed: joi.boolean().default(false),
    })
const {error}=  todoSchema.validate(req.body);
if (error) {
    console.log(error)
    return res.status(400).json({ error: error.details[0].message });
  }  
  try{ 
const last = await Todo.findOne().sort({ S_no: -1 });
  const nextId = last ? (last.S_no) + 1 : 1;
    const result = await Todo.create({
    S_no:nextId,
    task:req.body.task,
    completed:false
})
res.status(201).json(result);}
catch(e){
    res.status(500).send(e);
}
})

app.put('/todos/:id',async(req,res)=>{
const id = parseInt(req.params.id);
const todo= await Todo.findOneAndUpdate(
    {S_no:id},
    {task:req.body.task},
)
if(!todo){
   return res.status(404).json("Id not found.");
}
res.json(todo);
})

app.delete('/todos/:id',async(req,res)=>{
    const id = parseInt(req.params.id);
    const todo = await Todo.findOneAndDelete({S_no: id });
    if(!todo){res.status(404).json("Todo not found.")}
    res.json({message:"Todo deleted successfully."});
})

app.patch('/todos/:id',async(req,res)=>{
    const id = parseInt(req.params.id);
try{
 const patchedTodo = await Todo.findOneAndUpdate(
    {S_no:id},
    {$set : req.body},
    {returnDocument : 'after'},
 )
 if(!patchedTodo){res.status(404).send("Todo not found.")}
 console.log(`Todo with id (${req.params.id}) toggled as completed successfully.☑️`);
 res.status(200).json(patchedTodo);
}catch(e){
res.status(500).send("error",e);
console.error("error",e);
}

})

app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})