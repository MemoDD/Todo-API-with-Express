const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
let todos = [
    {id:1,task:"Learning Basics of express Framework"},
    {id:2,task:"Project one- To Do list Api"},
    {id:3,task:"I did CRUD operations in todo Api"},
    {id:4,task:"Will be added soon"}
];

app.get('/',(req,res)=>{
    res.json("I made Todo api. Use endpoint todos to get them.😎😊");
});
 
app.get('/todos',(req,res)=>{
    res.json(todos);
});

app.get('/todos/:id',(req,res)=>{
const id = parseInt(req.params.id);
const todo = todos.find(t=>t.id===id);
if(!todo){return res.status(404).json(" todo not found.")}
res.json(todo);
})
app.post('/todos',(req,res)=>{
    if(!req.body.task){res.json(" Task is mandatory. Please write the task.")}
const newtodo={id:(todos.length+1),task:req.body.task}
todos.push(newtodo);
res.status(201).json(newtodo);
})
app.put('/todos/:id',(req,res)=>{
const id = parseInt(req.params.id);
const todo= todos.find(t=>t.id===id)
if(!todo){
    res.status(404).json("Id not found.");
}
todo.task=req.body.task;
res.json(todo);
})
app.delete('/todos/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const todo = todos.findIndex(t=>t.id ===id);
    if(todo === -1){res.status(404).json("Todo not found.")}
    const deletedtodo = todos.splice(todo,1);
    res.json(deletedtodo);
})

app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})