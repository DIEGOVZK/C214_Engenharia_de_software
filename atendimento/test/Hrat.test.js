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
    });
});