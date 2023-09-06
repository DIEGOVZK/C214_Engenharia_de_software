A página é uma calculadora de IMC (Índice de Massa Corporal) que permite ao usuário inserir seu peso e altura para calcular seu IMC e exibir sua classificação de acordo com a tabela de IMC. A página possui uma interface simples com dois campos de entrada para o peso e altura do usuário, e o valor do IMC é calculado automaticamente. O resultado do cálculo é exibido abaixo dos campos de entrada, juntamente com a classificação correspondente. Além disso, a página também possui uma tabela que mostra as diferentes classificações de IMC e seus respectivos intervalos de valores. A página foi desenvolvida usando a linguagem Svelte e possui estilos CSS no arquivo público dentro de `public`.

<img src="https://github.com/DIEGOVZK/C214_Engenharia_de_software/blob/main/imc/documentation/mainimg.png" alt="main imc page">

A estrutura de arquivos do aplicativo Svelte é organizada da seguinte forma:

- `public`: Este diretório contém ativos estáticos, como imagens, fontes e outros arquivos que são servidos diretamente ao cliente. Esses arquivos não são processados pelo sistema de compilação e são copiados como estão para o diretório de saída.

- `src`: Este diretório contém o código-fonte do aplicativo. 
  
- `package.json`: Este arquivo contém os metadados do aplicativo, como seu nome, versão, dependências e scripts. É usado pelo gerenciador de pacotes para instalar dependências e executar scripts.

- `rollup.config.js`: Este arquivo contém a configuração do sistema de compilação. Ele define como o código-fonte é transformado e agrupado em um único arquivo JavaScript que pode ser servido ao cliente.

--- 

Para servir a página web na porta 9090 usando um servidor Express, foi adicionado o seguinte código ao arquivo `server.js`:

```javascript
import express from 'express';
import path from 'path';

const app = express();
const port = 9090;

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../public/')));

app.listen(port, () => {
    console.log(`Running on LOCAL: http://localhost:${port}`);
});
```

Este código importa os módulos `express` e `path`, cria uma instância do aplicativo Express e define a porta em que o servidor irá rodar. Em seguida, usa o módulo `url` para obter o caminho do diretório atual e define a rota para servir os arquivos estáticos do diretório `public`. Por fim, inicia o servidor na porta 9090 e exibe uma mensagem no console indicando que o servidor está rodando.

Para executar o servidor, basta executar o seguinte comando:

```
npm run start-server
```

Agora, a página web estará disponível em `http://localhost:9090`.