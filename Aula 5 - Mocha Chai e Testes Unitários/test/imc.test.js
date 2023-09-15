const { expect } = require('chai');
const { IMC } = require('../src/imc');

describe('Calculadora de IMC', () => {

    it('Calculadora deve rodar tranquilo', () => {
        const pessoa1 = new IMC(80, 180);

        const IMEsperado = parseFloat((80 / Math.pow(180 / 100, 2)).toFixed(2));
        const IMCCalculado = pessoa1.calcularIMC();
        expect(IMCCalculado).to.equal(IMEsperado);
    });

    it('altura = 0, entrada inadequada', () => {
        const pessoa1 = new IMC(70, 0);

        const IMCCalculado = pessoa1.calcularIMC();
        expect(IMCCalculado).to.equal('NaN');
    });

    it('IMC entre 18.6 e 24.9, deve estar na faixa ideal', () => {
        const pessoa1 = new IMC(70, 170);

        const IMCCalculado = pessoa1.calcularIMC(); // convert to number
        expect(IMCCalculado).to.be.within(18.6, 24.9);
    });

    it('IMC entre 18.6 e 24.9, deve exibir mensagem de peso ideal', () => {
        const pessoa1 = new IMC(70, 170);

        const mensagemEsperada = 'Você está no peso ideal';
        const mensagemCalculada = pessoa1.statusIMC();

        expect(mensagemCalculada).to.equal(mensagemEsperada);
    });

    it('IMC entre 30.0 e 34.9, deve estar na faixa de obesidade grau I', () => {
        const pessoa1 = new IMC(90, 170);

        const IMCCalculado = pessoa1.calcularIMC();
        expect(IMCCalculado).to.be.within(30.0, 34.9);
    });

    it('IMC entre 30.0 e 34.9, deve exibir mensagem de obesidade grau I', () => {
        const pessoa1 = new IMC(90, 170);

        const mensagemEsperada = 'Cuidado: Obesidade grau I';
        const mensagemCalculada = pessoa1.statusIMC();
        expect(mensagemCalculada).to.equal(mensagemEsperada);
    });
});