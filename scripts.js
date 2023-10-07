const currentPlayer = document.querySelector(".currentPlayer");
let selected = Array(9).fill(null);
let player = "X";

const positionsWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function init() {
    selected = Array(9).fill(null);
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

    document.querySelectorAll(".game button").forEach((item, index) => {
        item.innerHTML = "";
        item.classList.remove('winning-cell');
        item.addEventListener("click", () => newMove(index + 1));
    });
}

init();

function newMove(index) {
    if (selected[index - 1] !== null) return;

    selected[index - 1] = player;
    document.querySelector(`.game button[data-i="${index}"]`).innerHTML = player;

    if (check()) {
        return;
    }

    if (selected.filter(item => item !== null).length === 9) {
        alert("O JOGO EMPATOU");
        init();
        return;
    }

    player = player === "X" ? "O" : "X";
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

function check() {
    for (const pos of positionsWin) {
        const [a, b, c] = pos;
        if (selected[a] !== null && selected[a] === selected[b] && selected[a] === selected[c]) {
            const winningPlayer = selected[a];
            document.querySelector(`.game button[data-i="${a + 1}"]`).classList.add('winning-cell');
            document.querySelector(`.game button[data-i="${b + 1}"]`).classList.add('winning-cell');
            document.querySelector(`.game button[data-i="${c + 1}"]`).classList.add('winning-cell');
            document.querySelector('.currentPlayer').innerHTML = `JOGADOR DA VEZ: ${winningPlayer}`;

            setTimeout(() => {
                alert(`O JOGADOR ${winningPlayer} GANHOU!`);
                init();
            }, 500);
            return true;
        }
    }
    return false;
}





