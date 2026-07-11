const connect = require('./db');
const Todo = require('./model');
const joi = require('joi');
const express = require("express");
const app = express();
const port = 3000;

connect();

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
    //Validating client's request using JOI
    const todoSchema = new joi.object({
Task: joi.string().min(3).max(100).required(),
completed: joi.boolean().default(false),
    })
const {error}=  todoSchema.validate(req.body);
if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }  
  try{ 
const last = await Todo.findOne().sort({ id: -1 });
  const nextId = last ? last.id + 1 : 1;
    const result = await Todo.create({
    id:nextId,
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