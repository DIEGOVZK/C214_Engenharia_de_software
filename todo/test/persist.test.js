import { FileHandler } from '../src/persist.js';
import { expect } from 'chai';

describe('FileHandler', () => {
    let fileHandler;

    beforeEach(() => {
        const clientId = 'testClient';
        fileHandler = new FileHandler(clientId);
    });

    describe('---- basic API ----', () => {
        it('should have an object of type FileHandler inside fileHandler', () => {
            expect(fileHandler).to.be.an.instanceOf(FileHandler);
        });
    });

    describe('---- getFileName ----', () => {
        it('should return the correct file name with the default extension', () => {
            const expectedFileName = 'testClient.txt'; // Updated expected file name
            const result = fileHandler.getFileName();
            expect(result).to.equal(expectedFileName);
        });

        it('should return the correct file name with a custom extension', () => {
            const customExtension = 'csv';
            const expectedFileName = 'testClient.csv'; // Updated expected file name
            const result = fileHandler.getFileName(customExtension);
            expect(result).to.equal(expectedFileName);
        });
    });

});