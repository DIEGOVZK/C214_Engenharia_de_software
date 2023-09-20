import { FileHandler } from './persist.js';
const fileHandler = new FileHandler('default');

class TODO {

    constructor(fs_obj = fileHandler) {
        this.fs_obj = fs_obj
        this.todo = [];
        this.done = [];
    }

    loadFromFile() {

    }

    saveToFile() {

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