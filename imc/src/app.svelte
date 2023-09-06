<script>
    // Variáveis de estado
    let peso = 0; // Peso do usuário
    let altura = 0; // Altura do usuário
    let imc = 0; // Índice de Massa Corporal
    let classificacao = ""; // Classificação do IMC

    // Função para calcular o IMC e a classificação
    function calcularIMC() {
        if (peso > 0 && altura > 0) {
            imc = (peso / Math.pow(altura, 2)).toFixed(2);

            if (imc < 18.5) {
                classificacao = "Abaixo do peso";
            } else if (imc >= 18.5 && imc <= 24.9) {
                classificacao = "Peso ideal (parabéns)";
            } else if (imc >= 25 && imc <= 29.9) {
                classificacao = "Levemente acima do peso";
            } else if (imc >= 30 && imc <= 34.9) {
                classificacao = "Obesidade grau I";
            } else if (imc >= 35 && imc <= 39.9) {
                classificacao = "Obesidade grau II (severa)";
            } else {
                classificacao = "Obesidade III (mórbida)";
            }
        } else {
            imc = 0;
            classificacao = "";
        }
    }
</script>

<main>
    <div class="imc-calculator">
        <h1>Calculadora de IMC</h1>
        <label>
            Peso (kg):
            <input type="number" bind:value={peso} on:input={calcularIMC} />
        </label>
        <label>
            Altura (m):
            <input type="number" bind:value={altura} on:input={calcularIMC} />
        </label>
        {#if imc > 0}
            <p>Seu IMC é {imc}</p>
        {:else}
            <p>-</p>
        {/if}
    </div>

    <table>
        <thead>
            <tr>
                <th>IMC</th>
                <th>Classificação</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>menor que 18,5</td>
                <td>Abaixo do peso</td>
            </tr>
            <tr>
                <td>18,5 a 24,9</td>
                <td>Peso ideal (parabéns)</td>
            </tr>
            <tr>
                <td>25,0 a 29,9</td>
                <td>Levemente acima do peso</td>
            </tr>
            <tr>
                <td>30,0 a 34,9</td>
                <td>Obesidade grau I</td>
            </tr>
            <tr>
                <td>35,0 a 39,9</td>
                <td>Obesidade grau II (severa)</td>
            </tr>
            <tr>
                <td>maior que 40</td>
                <td>Obesidade III (mórbida)</td>
            </tr>
        </tbody>
    </table>
</main>

<style>
    main {
        font-family: sans-serif;
        text-align: center;
        padding: 2rem;
        color: #f8edeb;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    h1 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #f8edeb;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        color: #f8edeb;
    }

    input {
        padding: 0.25rem;
        color: black;
        background-color: #f8edeb;
    }

    th,
    td {
        padding: 0.5rem;
        text-align: left;
        border-bottom: 1px solid #f8edeb;
    }

    th {
        background-color: #f8edeb;
        color: black;
    }

    tr:hover {
        background-color: #f8edeb;
        color: black;
    }

    table {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }

    .imc-calculator {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        padding-inline: 6vh;
        margin-bottom: 5vh;
    }
</style>
