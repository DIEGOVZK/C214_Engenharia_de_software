O arquivo `main.js` contém um menu interativo que permite ao usuário adicionar filmes à lista, marcar filmes como assistidos, avaliar filmes e exibir a lista de filmes. O menu é implementado em um loop que executa continuamente até que o usuário escolha a opção de sair.

Para executar o script `main.js` com o Node.js, siga os seguintes passos:

1. Abra o terminal ou prompt de comando.
2. Navegue até o diretório onde o arquivo `main.js` está localizado.
3. Execute o comando `node main.js`.

Isso iniciará o script e exibirá o menu na linha de comando. O usuário pode escolher uma opção digitando o número correspondente e pressionando Enter.

As opções do menu são as seguintes:

1. Adicionar filme: permite ao usuário adicionar um novo filme à lista, fornecendo o título, ano, gênero e duração do filme.
2. Marcar como assistido: permite ao usuário marcar um filme existente na lista como assistido.
3. Avaliar filme: permite ao usuário avaliar um filme existente na lista, fornecendo uma nota de 0 a 100.
4. Exibir filmes: exibe a lista de filmes, mostrando o título, ano, gênero, duração, status de assistido e nota (se disponível) de cada filme.
5. Sair: encerra o programa.

Para executar o script, é necessário ter o Node.js instalado no computador. O script também requer os módulos `prompt-sync`, `ListaFilme` e `Filme`, que devem estar instalados no diretório do projeto com o comando `npm install`.