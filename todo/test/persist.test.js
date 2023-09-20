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

    describe('---- writeFile and readFile ----', () => {
        const testData = 'test text';
        const customExtension = 'md';

        it('should write and read a file successfully with the default extension', () => {
            fileHandler.writeFile(testData);
            const result = fileHandler.readFile();
            expect(result).to.equal(testData);
        });

        it('should write and read a file successfully with a custom extension', () => {
            fileHandler.writeFile(testData, customExtension);
            const result = fileHandler.readFile(customExtension);
            expect(result).to.equal(testData);
        });

        it('should handle file not found error when reading', () => {
            const result = fileHandler.readFile('nonexistent');
            expect(result).to.be.null;
        });
    });
});