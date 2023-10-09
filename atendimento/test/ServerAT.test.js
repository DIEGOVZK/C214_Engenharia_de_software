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

    it('should correctly parse and return professor data from the database', async () => {
        // Mock a database response
        const expectedResult = [
            {
                nomeDoProfessor: 'João Pedro Magalhães de Paula Paiva',
                horarioDeAtendimento: 'Terça 19:30 - 21:10',
                periodo: 'Noturno',
                sala: '3',
                predio: '1',
            },
            {
                nomeDoProfessor: 'Edson Josias Cruz Gimenez',
                horarioDeAtendimento: 'Quarta 15:30 - 17:10',
                periodo: 'Integral',
                sala: '2',
                predio: '1',
            },
        ];

        databaseMock.query.resolves(expectedResult);

        const building = 1;
        const result = await serverAT.loadFromBuilding(building);

        expect(result).to.deep.equal(expectedResult);
    });

});
