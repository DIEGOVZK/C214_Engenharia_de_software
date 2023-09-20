import { FileHandler } from '../src/persist';
import { expect } from 'chai';

describe('FileHandler', () => {
    let fileHandler;

    beforeEach(() => {
        const clientId = 'testClient';
        fileHandler = new FileHandler(clientId);
    });

    describe('#getFileName', () => {
        it('should have an object of type FileHandler inside fileHandler', () => {
            expect(fileHandler).to.be.an.instanceOf(FileHandler);
        });
    });
});