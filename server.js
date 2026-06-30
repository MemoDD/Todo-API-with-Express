const express = require("express");
const app = express();
const fs =require("fs");
const path = require("path");
const port = 3000;
const filename = path.join(__dirname,"todo.json")
function loadTodo(){
    if(!fs.existsSync(filename)){
        fs.writeFileSync(filename,JSON.stringify([],null,2));
    }
    const dos= fs.readFileSync(filename);
    return JSON.parse(dos);
}
let todos = loadTodo();
function saveTodo(){
fs.writeFileSync(filename,JSON.stringify(todos,null,2));
}

app.use(express.json());
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
    if(!req.body.task){res.status(404).json(" Task is mandatory. Please write the task.")}
const newtodo={id:(todos.length+1),task:req.body.task}
todos.push(newtodo);
saveTodo();
res.status(201).json(newtodo);
})
app.put('/todos/:id',(req,res)=>{
const id = parseInt(req.params.id);
const todo= todos.find(t=>t.id===id)
if(!todo){
    res.status(404).json("Id not found.");
}
todo.task=req.body.task;
saveTodo();
res.json(todo);
})
app.delete('/todos/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const todo = todos.findIndex(t=>t.id ===id);
    if(todo === -1){res.status(404).json("Todo not found.")}
    const [deletedtodo] = todos.splice(todo,1);
    saveTodo();
    res.json(deletedtodo);
})

app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})