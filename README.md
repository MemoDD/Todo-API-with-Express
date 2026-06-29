# Todo-API-with-Express
This API shows the fundamentals of backend showing CRUD operations.You can read todos, insert new to-do, update existing one and delete the exact one you want.Its simple API built using Node.js and Express as a part of my learning  journey in backend development.


##  Features
- Create new todos (POST)
- Read all todos or a single todo by ID (GET)
- Update existing todos (PUT)
- Delete todos (DELETE)
- JSON responses for easy integration with frontend apps

## 📂 Project Setup

### 1. Clone the repository
git clone https://github.com/MemoDD/Todo-API-with-Express-api.git 

cd todo-api

install dependencies using (npm install / npm i)

run (node <file_name>)

Your API will run at http://localhost:3000

## API Endpoints
- get/ : simply for checking if your backend is responding or not
- get /todos : gets all the todos created
- get /todos/:id : gets todos by id

## Handling API POST/UPDATE/DELETE requests
- step 1 : Download Postman or curl (command-line url processor present in your terminal)
- step 2 : For Postman :

        1. Download Postman from postman.com/downloads.  
        2.Install and open the app.  
        3.Click New → Request.
        4.Choose method POST, enter URL http://localhost:3000/todos.
        5.Go to Body → raw → JSON and type:
         ex - json
            { "task": "Finish backend basics" }
        6.Click Send → you’ll see the response neatly formatted.
                            


- step 2 : For Curl(in Powersheell) {
   Get all todos
        curl http://localhost:3000/todos

        Get todo with ID 2
curl http://localhost:3000/todos/2

     Add a new todo
curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"\task\":\"Finish README\"}'

     Update todo with ID 3
curl -X PUT http://localhost:3000/todos/3 -H "Content-Type: application/json" -d '{\"task\":\"Updated Task\"}'
  
    Delete todo with ID 4
curl -X DELETE http://localhost:3000/todos/4

}

## Improvements 
-  Adding file System to store CRUD memory
- Adding validity
- Database Integration
- Authorization and Authentication
- error Handling
- pagination
- Search
- Testing
- Deployment
- Caching



