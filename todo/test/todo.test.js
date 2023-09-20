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
});