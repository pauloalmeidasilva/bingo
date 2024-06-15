document.addEventListener('DOMContentLoaded', () => {
    const numeroSorteadoElem = document.getElementById('numero-sorteado');
    const sortearNumeroBtn = document.getElementById('sortear-numero');
    const novoSorteioBtn = document.getElementById('novo-sorteio');
    const bingoBtn = document.getElementById('bingo-btn');
    const bingoBody = document.getElementById('bingo-body');
    const confettiContainer = document.getElementById('confetti-container');
    let numerosSorteados = [];

    function gerarTabela() {
        bingoBody.innerHTML = '';
        for (let i = 0; i < 15; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < 5; j++) {
                const td = document.createElement('td');
                td.id = `${j}-${i + 1 + j * 15}`;
                td.textContent = i + 1 + j * 15;
                tr.appendChild(td);
            }
            bingoBody.appendChild(tr);
        }
    }

    function sortearNumero() {
        const todosNumeros = [...Array(75).keys()].map(n => n + 1);
        const numerosRestantes = todosNumeros.filter(num => !numerosSorteados.includes(num));
        if (numerosRestantes.length === 0) {
            alert('Todos os números já foram sorteados.');
            return;
        }
        const numeroSorteado = numerosRestantes[Math.floor(Math.random() * numerosRestantes.length)];
        numerosSorteados.push(numeroSorteado);
        const coluna = Math.floor((numeroSorteado - 1) / 15);
        const letras = ['B', 'I', 'N', 'G', 'O'];
        numeroSorteadoElem.textContent = `${letras[coluna]}-${numeroSorteado}`;
        document.getElementById(`${coluna}-${numeroSorteado}`).classList.add('sorteado');
    }

    function novoSorteio() {
        numerosSorteados = [];
        numeroSorteadoElem.textContent = 'N/A';
        document.querySelectorAll('.sorteado').forEach(td => td.classList.remove('sorteado'));
    }

    function criarConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }

    function festaBingo() {
        for (let i = 0; i < 200; i++) {
            setTimeout(criarConfetti, i * 20);
        }
    }

    sortearNumeroBtn.addEventListener('click', sortearNumero);
    novoSorteioBtn.addEventListener('click', novoSorteio);
    bingoBtn.addEventListener('click', festaBingo);

    gerarTabela();
});
