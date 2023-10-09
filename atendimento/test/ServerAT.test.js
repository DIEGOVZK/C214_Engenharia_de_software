import ServerAT from '../src/ServerAT.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('ServerAT', () => {
    let serverAT;
    let dbMock;

    beforeEach(() => {
        // Mock database usando Sinon
        dbMock = {
            unsafe: sinon.stub(),
        };

        serverAT = new ServerAT(dbMock);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should be an instance of ServerAT', () => {
        expect(serverAT).to.be.an.instanceOf(ServerAT);
    });

    it('should parse the result from the database correctly (happy path)', async () => {

        const queryResult = [
            {
                "getlistbybuilding": {
                    nomeDoProfessor: 'João Pedro Magalhães de Paula Paiva',
                    horarioDeAtendimento: 'Terça 19:30 - 21:10',
                    periodo: 'Noturno',
                    sala: '3',
                    predio: '1',
                }
            },
            {
                "getlistbybuilding": {
                    nomeDoProfessor: 'Edson Josias Cruz Gimenez',
                    horarioDeAtendimento: 'Quarta 15:30 - 17:10',
                    periodo: 'Integral',
                    sala: '2',
                    predio: '1',
                }
            },
        ];

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

        dbMock.unsafe.resolves(queryResult);

        const building = '1';
        const result = await serverAT.loadFromBuilding(building);

        expect(result).to.deep.equal(expectedResult);
    });

    it('should handle an empty result from the database (sad path)', async () => {
        dbMock.unsafe.resolves([]);

        const building = '2';
        const result = await serverAT.loadFromBuilding(building);

        expect(result).to.deep.equal([]);
    });

});
