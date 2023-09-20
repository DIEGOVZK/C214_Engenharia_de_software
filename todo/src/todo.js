import { FileHandler } from './persist.js';
const fileHandler = new FileHandler('default');

class TODO {

    constructor(fs_obj = fileHandler) {
        this.fs_obj = fs_obj
        this.todo = [];
        this.done = [];
    }

    loadFromFile() {
        const data = this.fs_obj.readFile();
        if (data) {
            const { todo, done } = JSON.parse(data);
            this.todo = todo;
            this.done = done;
        }
    }

    saveToFile() {
        const data = JSON.stringify({ todo: this.todo, done: this.done });
        this.fs_obj.writeFile(data);
    }

    getTodoList() {
        return this.todo;
    }

    getDoneList() {
        return this.done;
    }

    setTodoList(todoList) {
        this.todo = todoList;
    }

    setDoneList(doneList) {
        this.done = doneList;
    }
}