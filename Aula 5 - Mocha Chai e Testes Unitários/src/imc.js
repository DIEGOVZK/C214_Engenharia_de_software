class IMC {

    constructor(peso, altura) {
        this._peso = peso;
        this._altura = altura;
    }

    calcularIMC() {
        if (this._altura === 0) {
            return 'NaN'; // Retorna "NaN" se a altura for igual a zero
        }

        const alturaMetros = this._altura / 100; // Converte altura de centímetros para metros
        return parseFloat((this._peso / (alturaMetros * alturaMetros)).toFixed(2)); // Calcula o IMC com duas casas decimais
    }

    statusIMC() {
        const imc = this.calcularIMC();

        if (imc > 18.6 && imc <= 24.9) {
            return 'Você está no peso ideal';
        } 
        else if (imc > 30.0 && imc <= 34.9) {
            return 'Cuidado: Obesidade grau I';
        }
    }
}

module.exports = { IMC }; // Exporta a classe IMC