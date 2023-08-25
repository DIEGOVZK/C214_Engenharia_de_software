/*
    - file: Menu.js
    - Author: Diego Anestor Coutinho (diego.anestor@gec.inatel.br)
*/

const prompt = require("prompt-sync")({ sigint: true })
const Filme = require("./Filme");

class listaFilme extends Filme {

    constructor(listaFilmes) {
        super()
        this.lista = listaFilmes;
    }

    showMenu() {
        console.log("\nEscolha uma opção:");
        console.log("1 - Adicionar um novo filme");

        if (this.lista.length > 0) {
            console.log("2 - Marcar um filme como assistido");
            console.log("3 - Avaliar um filme");
            console.log("4 - Exibir a lista de filmes");
            console.log("5 - Sair do programa");
        }
    }

    adicionarFilme() {
        let titulo = "";
        while (titulo === "") {
            titulo = prompt("Digite o título do filme: ");
            if (titulo === "") {
                console.log("Título inválido! Tente novamente.");
            }
        }

        let ano = NaN;
        while (isNaN(ano)) {
            ano = parseInt(prompt("Digite o ano do filme: "));
            if (isNaN(ano)) {
                console.log("Ano inválido! Tente novamente.");
            }
        }

        let genero = "";
        while (genero === "") {
            genero = prompt("Digite o gênero do filme: ");
            if (genero === "") {
                console.log("Gênero inválido! Tente novamente.");
            }
        }

        let duracao = NaN;
        while (isNaN(duracao)) {
            duracao = parseInt(prompt("Digite a duração do filme em minutos: "));
            if (isNaN(duracao)) {
                console.log("Duração inválida! Tente novamente.");
            }
        }

        const novoFilme = new Filme(titulo, ano, genero, duracao);
        this.lista.push(novoFilme);

        console.log("Filme adicionado com sucesso!");
        return this.lista;
    }

    marcarAssistido() {
        for (let i = 0; i < this.lista.length; i++) {
            console.log(`${i + 1} - ${this.lista[i].titulo}`);
        }

        const opcao = parseInt(prompt("Digite o número do filme: "));

        if (opcao >= 1 && opcao <= this.lista.length) {
            const filme = this.lista[opcao - 1];
            filme.assistir();
            console.log(`O filme ${filme.titulo} foi marcado como assistido!`);
        } else {
            console.log("Opção inválida!");
        }
    }

    avaliarFilme() {

        for (let i = 0; i < this.lista.length; i++) {
            console.log(`${i + 1} - ${this.lista[i].titulo}`);
        }

        const opcao = parseInt(prompt("Digite o número do filme: "));

        if (opcao >= 1 && opcao <= this.lista.length) {
            const filme = this.lista[opcao - 1];
            const nota = NaN;

            while (isNaN(nota)) {
                const nota = parseFloat(prompt("Digite a nota do filme (0 a 100): "));
                if (nota >= 0 && nota <= 100) {
                    filme.avaliar(nota);
                    console.log(`O filme ${filme.titulo} foi avaliado com nota ${nota}!`);
                    break;
                } else {
                    console.log("Nota inválida!");
                }
            }
        } else {
            console.log("Opção inválida!");
        }
    }

    exibirFilmes() {
        for (let i = 0; i < this.lista.length; i++) {
            console.log(`\nFilme ${i + 1}:`);
            this.lista[i].info();
        }
    }
}

module.exports = listaFilme;