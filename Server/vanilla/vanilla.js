const http = require('http');
const Todos = require('./controller');
const { getReqData } = require('./utils');

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {

    if (req.url === "/api/v1/todos" && req.method === "GET") {
        const todos = await Todos.getTodos();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    }
        
        else if (req.url.match(/\/api\/v1\/todos\/\d+/) && req.method === "GET") {
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

    else if (req.url.match(/\/api\/v1\/todos\/\d+/) && req.method === "DELETE") { 
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

    else if (req.url.match(/\/api\/v1\/todos\/\d+/) && req.method === "PATCH") {
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
})

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
})