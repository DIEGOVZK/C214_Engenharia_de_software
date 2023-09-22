import { FileHandler } from '../src/persist.js';
import { TODO } from '../src/todo.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('TODO', () => {
    let todo;
    let fileHandler;

    beforeEach(() => {
        fileHandler = new FileHandler('default');
        todo = new TODO(fileHandler);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('---- basic API ----', () => {
        it('should have an object of type TODO inside todo', () => {
            expect(todo).to.be.an.instanceOf(TODO);
        });

        it('should initialize with empty done list', () => {
            expect(todo.getDoneList()).to.be.an('array').that.is.empty;
        });

        it('should initialize with empty todo list', () => {
            expect(todo.getTodoList()).to.be.an('array').that.is.empty;
        });
    });

    describe('---- loadFromFile ----', () => {
        it('should load todo lists from file', () => {
            const fakeData = JSON.stringify({ todo: ['Task 1'], done: [] });
            sinon.stub(fileHandler, 'readFile').returns(fakeData);

            todo.loadFromFile();
            expect(todo.getTodoList()).to.deep.equal(['Task 1']);
        });

        it('should load done lists from file', () => {
            const fakeData = JSON.stringify({ todo: [], done: ['Task 1'] });
            sinon.stub(fileHandler, 'readFile').returns(fakeData);

            todo.loadFromFile();
            expect(todo.getDoneList()).to.deep.equal(['Task 1']);
        });

        it('should load todo lists from file with no todos', () => {
            const fakeData = JSON.stringify({ todo: [], done: ['Task 1'] });
            sinon.stub(fileHandler, 'readFile').returns(fakeData);

            todo.loadFromFile();
            expect(todo.getTodoList()).to.be.an('array').that.is.empty;
        });

        it('should load done lists from file with no dones', () => {
            const fakeData = JSON.stringify({ todo: ['Task 1'], done: [] });
            sinon.stub(fileHandler, 'readFile').returns(fakeData);

            todo.loadFromFile();
            expect(todo.getDoneList()).to.be.an('array').that.is.empty;
        });
    });

    describe('---- setters & setters ----', () => {
        it('should set todo list when calling setTodoList', () => {
            const testList = ['task1', 'task2', 'task3'];
            todo.setTodoList(testList);
            expect(todo.getTodoList()).to.deep.equal(testList);
        });

        it('should set done list when calling setDoneList', () => {
            const testList = ['task1', 'task2', 'task3'];
            todo.setDoneList(testList);
            expect(todo.getDoneList()).to.deep.equal(testList);
        });
    });
});