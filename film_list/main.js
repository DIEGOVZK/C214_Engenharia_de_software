/*
    - file: main.js
    - Author: Diego Anestor Coutinho (diego.anestor@gec.inatel.br)
*/

// Importa a classe filme
const prompt = require("prompt-sync")({ sigint: true })
const listaFilme = require('./Menu');
const Filme = require('./Filme');

console.log("\n-------- rotten ketchup --------\n");

// Cria uma nova lista de filmes
const lf = new listaFilme([]);

// Inicia uma máquina de estados em super loop
let opcao = 0;
while (opcao != 5) {
    lf.showMenu();
    opcao = parseInt(prompt("\nDigite a opção desejada: "));

    switch (opcao) {
        case 1:
            lf.adicionarFilme();
            break;
        case 2:
            lf.marcarAssistido();
            break;
        case 3:
            lf.avaliarFilme();
            break;
        case 4:
            lf.exibirFilmes();
            break;
        case 5:
            console.log("Saindo do programa...");
            break;
        default:
            console.log("Opção inválida!");
            break;
    }
}

