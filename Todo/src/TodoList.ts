interface ITodoItem{
    id: number;
    task: string;
    completed: boolean;
    dueDate: Date;
}

class TodoList {
    private items: ITodoItem[] = [];
    private nextId: number = 1;

    addTodo(task: string, dueDate: Date): void {
        const newItem: ITodoItem = {
            id: this.nextId++,
            task: task,
            completed: false,
            dueDate: dueDate
        };
        this.items.push(newItem);
    }

    removeTodo(id: number): void {
        this.items = this.items.filter(item => item.id !== id);
    }
    markCompleted(id: number): void {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.completed = true;
        } else {
            console.error(`Todo item with id ${id} not found.`);
        }
    }
    listTodos(): ITodoItem[] {
        return [...this.items];
    }
    getTodosByStatus(completed: boolean): ITodoItem[] {
        return this.items.filter(item => item.completed === completed);
    }
    updateTodo(id: number, task?: string, dueDate?: Date): void {
        const item = this.items.find(item => item.id === id);
        if (item) {
           if(task !== undefined) item.task = task;  
           if(dueDate !== undefined) item.dueDate = dueDate;
        } else{
            console.error(`Todo item with id ${id} not found.`);
        }
    }
    clearCompleted(): void {
        this.items = this.items.filter(item => !item.completed);
    }
    searchTodos(keyword: string): ITodoItem[] {
        return this.items.filter(item => item.task.toLowerCase().includes(keyword.toLowerCase()));
    }
}

const todoList = new TodoList();
todoList.addTodo("Buy groceries", new Date("2024-07-01"));
todoList.addTodo("Finish project", new Date("2024-07-05"));
todoList.addTodo("Call mom", new Date("2024-07-02"));

todoList.markCompleted(1);

console.log("------------------")

todoList.updateTodo(2, "Go play sports", new Date());

console.log(todoList.listTodos())