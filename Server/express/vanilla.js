const http = require('http');
const Todos = require('./controller');
const connectDB = require('./db');
const { getReqData } = require('./utils');

const PORT = process.env.PORT || 3000;

connectDB();

const server = http.createServer(async (req, res) => {

    if (req.url === "/api/v1/todos" && req.method === "GET") {
        const todos = await Todos.getTodos();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    }
        
        else if (req.url.match(/\/api\/v1\/todos\/[a-zA-Z0-9]+/) && req.method === "GET") {
            try {
                const id = req.url.split('/')[4];
                const todo = await Todos.getTodo(id);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(todo));
            }
            catch (err) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: err.message }));
            }
            
    }

    else if (req.url === "/api/v1/todos" && req.method === "POST") { 
        try {
            const rawBody = await getReqData(req);
            const todoData = JSON.parse(rawBody);
            const newTodo = await Todos.createTodo(todoData);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newTodo));
        }
        catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: err.message }));
        }
    }


    else if (req.url.match(/\/api\/v1\/todos\/[a-zA-Z0-9]+/) && req.method === "DELETE") { 
        try { 
            const id = req.url.split('/')[4];
            await Todos.deleteTodo(id);
            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end();
        }
        catch (err) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: err.message }));
        }
    }

    else if (req.url.match(/\/api\/v1\/todos\/[a-zA-Z0-9]+/) && req.method === "PUT") {
        try {
            const id = req.url.split('/')[4];
            const rawBody = await getReqData(req);
            const updatedFields = JSON.parse(rawBody);
            const updatedTodo = await Todos.updateTodo(id, updatedFields);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedTodo));
        }
        catch (err) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: err.message }));
        }
     }

    else if (req.url.match(/\/api\/v1\/todos\/[a-zA-Z0-9]+/) && req.method === "PATCH") {
        try {
            const id = req.url.split('/')[4];
            const updatedTodo = await Todos.updateTodo(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedTodo));
        }
        catch (err) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: err.message }));
        }
    }

    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Route or Method not supported" }));
    }
})

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
})