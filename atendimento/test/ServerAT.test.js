import ServerAT from '../src/ServerAT.js';
import { expect } from 'chai';
import sinon from 'sinon';

// Mock database usando Sinon
const databaseMock = {
    query: sinon.stub(),
};

const serverAT = new ServerAT(databaseMock);

describe('ServerAT', () => {
    afterEach(() => {
        sinon.reset();
    });

    it('should be an instance of ServerAT', () => {
        expect(serverAT).to.be.an.instanceOf(ServerAT);
    });

});
