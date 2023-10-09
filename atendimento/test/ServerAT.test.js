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

    describe('ServerAT (happy path)', () => {
        it('should be an instance of ServerAT', () => {
            expect(serverAT).to.be.an.instanceOf(ServerAT);
        });

        it('should parse the result from the database correctly', async () => {

            const queryResult = [
                {
                    "getlistbybuilding": {
                        nomeDoProfessor: 'João Pedro Magalhães de Paula Paiva',
                        horarioDeAtendimento: 'Terça 19:30 - 21:10',
                        periodo: 'Noturno',
                        sala: '3',
                        predio: '1',
                    }
                }
            ];

            const expectedResult = [
                {
                    nomeDoProfessor: 'João Pedro Magalhães de Paula Paiva',
                    horarioDeAtendimento: 'Terça 19:30 - 21:10',
                    periodo: 'Noturno',
                    sala: '3',
                    predio: '1',
                }
            ];

            dbMock.unsafe.resolves(queryResult);

            const building = '1';
            const result = await serverAT.loadFromBuilding(building);

            expect(result).to.deep.equal(expectedResult);
        });

        it('should parse multiple results from the database correctly', async () => {

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
    });

    describe('ServerAT (sad path)', () => {


        it('should handle an empty result from the database', async () => {
            dbMock.unsafe.resolves([]);

            const building = '2';
            const result = await serverAT.loadFromBuilding(building);

            expect(result).to.deep.equal([]);
        });

        it('should handle an absurd case where the database result diverges from normal', async () => {
            const queryResult = [
                {
                    somethingUnexpected: 'Unexpected data',
                },
            ];

            dbMock.unsafe.resolves(queryResult);

            const building = '4';
            const result = await serverAT.loadFromBuilding(building);

            expect(result).to.deep.equal([]);
        });

        it('should handle a case where the building type does not match the parameter', async () => {
            const queryResult = [
                {
                    getlistbybuilding: {
                        nomeDoProfessor: 'Christopher de Souza Lima Francisco',
                        horarioDeAtendimento: 'Quinta 10:00 - 11:40',
                        periodo: 'Integral',
                        sala: '19',
                        predio: '2',
                    },
                },
            ];

            dbMock.unsafe.resolves(queryResult);

            const building = '4';
            const result = await serverAT.loadFromBuilding(building);

            expect(result).to.deep.equal([]);
        });
    });
});
