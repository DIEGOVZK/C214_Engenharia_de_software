import ServerAT from '../src/ServerAT.js';
import Hrat from '../src/Hrat.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Hrat', () => {
    let hrat;
    let serverATMock;

    beforeEach(() => {
        serverATMock = {
            loadFromBuilding: sinon.stub(),
        };
        hrat = new Hrat(serverATMock);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('Hrat (happy path)', () => {
        it('should be instantiated with a ServerAT instance', () => {
            expect(hrat.server).to.equal(serverATMock);
        });

        it('should load professors correctly from the server', () => {
            serverATMock.loadFromBuilding.returns([
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
            ]);

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

            const sala = 8;
            const result = hrat.loadFromServer(sala);

            expect(result).to.deep.equal(expectedResult);
        });

        it('should get professors for sala 3', () => {
            serverATMock.loadFromBuilding.returns([
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
                }
            ]);

            const sala = 3;
            const result = hrat.loadFromServer(sala);

            expect(result).to.deep.equal([
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
                }
            ]);
        });

        it('should load professors as a nested array from building 1', () => {
            const queryResult = [
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

            const expectedResult = [
                ['João Pedro Magalhães de Paula Paiva', 'Terça 19:30 - 21:10', 'Noturno', '3', '1'],
                ['Edson Josias Cruz Gimenez', 'Quarta 15:30 - 17:10', 'Integral', '2', '1'],
            ];

            serverATMock.loadFromBuilding.returns(queryResult);

            const sala = 2;
            const result = hrat.loadAsList(sala);

            expect(result).to.deep.equal(expectedResult);
        });

        it('should load professors as a nested array from building 4, with a single entry', () => {
            const queryResult = [
                {
                    nomeDoProfessor: 'Christopher de Souza Lima Francisco',
                    horarioDeAtendimento: 'Quinta 10:00 - 11:40',
                    periodo: 'Integral',
                    sala: '19',
                    predio: '2',
                }
            ];

            const expectedResult = [
                ['Christopher de Souza Lima Francisco', 'Quinta 10:00 - 11:40', 'Integral', '19', '2']
            ];

            serverATMock.loadFromBuilding.returns(queryResult);

            const sala = 19;
            const result = hrat.loadAsList(sala);

            expect(result).to.deep.equal(expectedResult);
        });
    });

    describe('Hrat (sad path)', () => {
        it('should handle an empty result from the server', () => {
            serverATMock.loadFromBuilding.returns([]);

            const sala = 6;
            const result = hrat.loadFromServer(sala);

            expect(result).to.deep.equal([]);
        });

        it('should handle a JSON parsing error', () => {
            serverATMock.loadFromBuilding.returns('Invalid JSON');

            const sala = 11;
            const result = hrat.loadFromServer(sala);

            expect(result).to.be.null;
        });

        it('should handle a JSON parsing error', () => {
            serverATMock.loadFromBuilding.returns('Invalid JSON');

            const sala = 11;
            const result = hrat.loadFromServer(sala);

            expect(result).to.be.null;
        });

        it('should handle failed filtered professors for sala 3', () => {
            serverATMock.loadFromBuilding.returns([
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
                {
                    nomeDoProfessor: 'Christopher de Souza Lima Francisco',
                    horarioDeAtendimento: 'Quinta 10:00 - 11:40',
                    periodo: 'Integral',
                    sala: '19',
                    predio: '2',
                }
            ]);

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
                {
                    nomeDoProfessor: 'Christopher de Souza Lima Francisco',
                    horarioDeAtendimento: 'Quinta 10:00 - 11:40',
                    periodo: 'Integral',
                    sala: '19',
                    predio: '2',
                }
            ];

            const sala = 3;
            const result = hrat.loadFromServer(sala);

            expect(result).to.be.not.equal(expectedResult);
        });

        it('should handle an empty result from the server', () => {
            serverATMock.loadFromBuilding.returns([]);
    
            const sala = 6;
            const result = hrat.loadAsList(sala);
    
            expect(result).to.be.null;
        });
    });
});