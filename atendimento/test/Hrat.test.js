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

        describe('Hrat (happy path)', () => {
            it('should handle an empty result from the server (sad path)', () => {
                serverATMock.loadFromBuilding.returns([]);

                const sala = 6;
                const result = hrat.loadFromServer(sala);

                expect(result).to.deep.equal([]);
            });
        });
    });



    it('should handle an empty result from the server (sad path)', () => {
        // Mock the serverAT query response as empty
        serverATMock.loadFromBuilding.returns([]);

        const sala = 6;
        const result = hrat.loadFromServer(sala);

        expect(result).to.deep.equal([]);
    });
});