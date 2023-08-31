A página é uma calculadora de IMC (Índice de Massa Corporal) que permite ao usuário inserir seu peso e altura para calcular seu IMC e exibir sua classificação de acordo com a tabela de IMC. A página possui uma interface simples com dois campos de entrada para o peso e altura do usuário, e o valor do IMC é calculado automaticamente. O resultado do cálculo é exibido abaixo dos campos de entrada, juntamente com a classificação correspondente. Além disso, a página também possui uma tabela que mostra as diferentes classificações de IMC e seus respectivos intervalos de valores. A página foi desenvolvida usando a linguagem Svelte e possui estilos CSS no arquivo público dentro de `public`.

<img src="https://github.com/DIEGOVZK/C214_Engenharia_de_software/blob/main/imc/documentation/mainimg.png" alt="main imc page">

A estrutura de arquivos do aplicativo Svelte é organizada da seguinte forma:

- `public`: Este diretório contém ativos estáticos, como imagens, fontes e outros arquivos que são servidos diretamente ao cliente. Esses arquivos não são processados pelo sistema de compilação e são copiados como estão para o diretório de saída.

- `src`: Este diretório contém o código-fonte do aplicativo. 
  
- `package.json`: Este arquivo contém os metadados do aplicativo, como seu nome, versão, dependências e scripts. É usado pelo gerenciador de pacotes para instalar dependências e executar scripts.

- `rollup.config.js`: Este arquivo contém a configuração do sistema de compilação. Ele define como o código-fonte é transformado e agrupado em um único arquivo JavaScript que pode ser servido ao cliente.