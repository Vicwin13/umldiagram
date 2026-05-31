const data = require('./data');
const { getReqData } = require('./utils');

class Controller { 
    async getTodos() { 
        return new Promise((resolve, _) => resolve(data));
    }

    async getTodo(id) {
        const todo = data.find(todo => todo.id === parseInt(id));

        if(!todo) {
            throw new Error(`Todo with ID ${id} was not found`);
        }
        return todo;
    }

    async createTodo(todo) {
        let newTodo = {
            id: Math.floor(10 + Math.random() * 90),
            ...todo
        }
        data.push(newTodo);
        return newTodo;
        }


    async updateTodo(id) { 
        const todo = data.find(todo => todo.id === parseInt(id));

        if(!todo) {
            throw new Error(`Todo with ID ${id} was not found`);
        }
        todo['completed'] = true;
        return todo;
    }

    async deleteTodo(id) { 
        const index = data.find(todo => todo.id === parseInt(id));

        if(index === -1) {
            throw new Error(`Todo with ID ${id} was not found`);
        }

        data.splice(index, 1);
    }

 }

 module.exports = new Controller();







