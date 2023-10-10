# HRAT

Este é um aplicativo que permite carregar e exibir dados de atendimento de professores em salas de aula. Ele se conecta a um servidor de banco de dados PostgreSQL para carregar os dados e exibi-los em uma tabela.

## Funcionalidades

- Carregar dados do servidor: você pode carregar os dados de atendimento do servidor PostgreSQL usando a classe `ServerAT`. O aplicativo se conecta ao servidor e carrega os dados de atendimento para um determinado prédio.

- Exibir dados em uma tabela: você pode exibir os dados de atendimento em uma tabela usando a classe `Hrat`. A tabela exibe o nome do professor, o horário de início e término do atendimento e a sala de aula em que o atendimento ocorre.

## Testes

<img src="https://github.com/DIEGOVZK/C214_Engenharia_de_software/blob/main/atendimento/documentation/testVis.png" alt="cmd test result">

## Como usar

Para usar o aplicativo HRAT, você precisa ter um servidor PostgreSQL configurado com os dados de atendimento dos professores. Você também precisa ter as classes `ServerAT` e `Hrat` em seu projeto.

Para carregar os dados do servidor, crie uma instância da classe `ServerAT` e chame o método `loadFromBuilding` com o número do prédio que você deseja carregar. O método retornará uma lista de objetos que representam os dados de atendimento.

Para exibir os dados em uma tabela, crie uma instância da classe `Hrat` e chame o método `loadAsList` com o número da sala de aula que você deseja exibir. O método retornará uma lista de listas que representam os dados de atendimento em formato de tabela.

## Tecnologias usadas

Este aplicativo usa JavaScript como linguagem de programação e se conecta a um servidor PostgreSQL usando a biblioteca `postgres`. Ele também usa as classes `ServerAT` e `Hrat` para carregar e exibir os dados de atendimento.