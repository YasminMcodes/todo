import { saveProjects } from "./storage.js";
import appState from "./state.js";
import Todo from "./todo.js";

export default class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    addTodo(title, description, dueDate, priority) {
        const todo = new Todo(title, description, dueDate, priority);
        this.todos.push(todo);
        saveProjects(appState.projects)
    }
    removeTodo(index) {
        this.todos.splice(index, 1);
        saveProjects(appState.projects);
    }
}