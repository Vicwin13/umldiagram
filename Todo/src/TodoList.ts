export interface ITodoItem{
    id: number;
    task: string;
    completed: boolean;
    dueDate: Date;
}

export class TodoList {
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

// ===================== Console.log Tests =====================
function runTests(): void {
    const todoList = new TodoList();

    // ---- Test 1: addTodo ----
    console.log("=== Test 1: addTodo ===");
    todoList.addTodo("Buy groceries", new Date("2024-07-01"));
    todoList.addTodo("Finish project", new Date("2024-07-05"));
    todoList.addTodo("Call mom", new Date("2024-07-02"));
    todoList.addTodo("Read a book", new Date("2024-07-10"));
    console.log("Added 4 todos:", todoList.listTodos());

    // ---- Test 2: listTodos ----
    console.log("\n=== Test 2: listTodos ===");
    const allTodos = todoList.listTodos();
    console.log(`Total todos: ${allTodos.length}`);
    allTodos.forEach(t => console.log(`  [${t.id}] "${t.task}" — completed: ${t.completed}, due: ${t.dueDate.toDateString()}`));

    // ---- Test 3: markCompleted ----
    console.log("\n=== Test 3: markCompleted ===");
    todoList.markCompleted(1);
    todoList.markCompleted(3);
    console.log("Marked id 1 and 3 as completed:");
    todoList.listTodos().forEach(t => console.log(`  [${t.id}] "${t.task}" — completed: ${t.completed}`));
    console.log("Trying to mark non-existent id 99:");
    todoList.markCompleted(99); // should log error

    // ---- Test 4: getTodosByStatus ----
    console.log("\n=== Test 4: getTodosByStatus ===");
    const completed = todoList.getTodosByStatus(true);
    const pending = todoList.getTodosByStatus(false);
    console.log(`Completed (${completed.length}):`, completed.map(t => t.task));
    console.log(`Pending (${pending.length}):`, pending.map(t => t.task));

    // ---- Test 5: updateTodo ----
    console.log("\n=== Test 5: updateTodo ===");
    todoList.updateTodo(2, "Go play sports", new Date("2024-08-15"));
    const updated = todoList.listTodos().find(t => t.id === 2)!;
    console.log(`Updated id 2 -> task: "${updated.task}", due: ${updated.dueDate.toDateString()}`);
    console.log("Trying to update non-existent id 100:");
    todoList.updateTodo(100, "Does not matter"); // should log error

    // ---- Test 6: searchTodos ----
    console.log("\n=== Test 6: searchTodos ===");
    const results1 = todoList.searchTodos("book");
    console.log(`Search "book":`, results1.map(t => t.task));
    const results2 = todoList.searchTodos("go");
    console.log(`Search "go":`, results2.map(t => t.task));
    const results3 = todoList.searchTodos("nonexistent");
    console.log(`Search "nonexistent":`, results3.map(t => t.task));

    // ---- Test 7: removeTodo ----
    console.log("\n=== Test 7: removeTodo ===");
    console.log("Before removal:", todoList.listTodos().map(t => `[${t.id}] ${t.task}`));
    todoList.removeTodo(2);
    console.log("After removing id 2:", todoList.listTodos().map(t => `[${t.id}] ${t.task}`));

    // ---- Test 8: clearCompleted ----
    console.log("\n=== Test 8: clearCompleted ===");
    console.log("Before clearCompleted:", todoList.listTodos().map(t => `[${t.id}] ${t.task} (completed: ${t.completed})`));
    todoList.clearCompleted();
    console.log("After clearCompleted:", todoList.listTodos().map(t => `[${t.id}] ${t.task} (completed: ${t.completed})`));

    console.log("\n=== All tests completed ===");
}

runTests();