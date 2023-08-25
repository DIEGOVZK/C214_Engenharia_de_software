/*
    - file: Filme.js
    - Author: Diego Anestor Coutinho (diego.anestor@gec.inatel.br)
*/

class Filme {
    constructor(titulo, ano, genero, duracao) {
        this.titulo = titulo;
        this.ano = ano;
        this.genero = genero;
        this.duracao = duracao;
        this.assistido = false;
        this.avaliacao = null;
    }

    info() {
        console.log(`Título: ${this.titulo}`);
        console.log(`Ano: ${this.ano}`);
        console.log(`Gênero: ${this.genero}`);
        console.log(`Duração: ${this.duracao} minutos`);

        process.stdout.write("Assistido: ");
        if (this.assistido) {
            console.log("Sim");
        } else {
            console.log("Não");
        }

        if (this.avaliacao) {
            console.log(`Avaliação: ${this.avaliacao}/100`);
        }
    }

    assistir() {
        this.assistido = true;
    }

    avaliar(nota) {
        this.avaliacao = nota;
    }
}

module.exports = Filme;