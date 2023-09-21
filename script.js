const cells = document.querySelectorAll('.cell');
const resultDiv = document.querySelector('.result');
const resultImg = document.getElementById('result-img');
const resultText = document.getElementById('result-text');
const crossSound = document.getElementById("cross-sound");
const circleSound = document.getElementById("circle-sound");

let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let currentPlayer = 'X';
let gameActive = true;

const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
        if (
            gameBoard[i][0] !== '' &&
            gameBoard[i][0] === gameBoard[i][1] &&
            gameBoard[i][1] === gameBoard[i][2]
        ) {
            announceWinner(gameBoard[i][0]);
            return;
        }
        if (
            gameBoard[0][i] !== '' &&
            gameBoard[0][i] === gameBoard[1][i] &&
            gameBoard[1][i] === gameBoard[2][i]
        ) {
            announceWinner(gameBoard[0][i]);
            return;
        }
    }

    if (
        gameBoard[0][0] !== '' &&
        gameBoard[0][0] === gameBoard[1][1] &&
        gameBoard[1][1] === gameBoard[2][2]
    ) {
        announceWinner(gameBoard[0][0]);
        return;
    }

    if (
        gameBoard[0][2] !== '' &&
        gameBoard[0][2] === gameBoard[1][1] &&
        gameBoard[1][1] === gameBoard[2][0]
    ) {
        announceWinner(gameBoard[0][2]);
        return;
    }

    if (
        gameBoard.flat().every((cell) => cell !== '')
    ) {
        announceWinner('draw');
        return;
    }
};

const announceWinner = (winner) => {
    gameActive = false;
    resultDiv.style.display = 'flex';

    if (winner === 'X') {
        resultImg.src = 'images/x_winner.png';
        resultText.textContent = "ПОБЕДИЛИ ПИСЬКИ!";
    } else if (winner === 'O') {
        resultImg.src = 'images/o_winner.png';
        resultText.textContent = "ПОБЕДИЛИ СИСЬКИ!";
    } else if (winner === 'draw') {
        resultImg.src = 'images/draw.png';
        resultText.textContent = "НИЧЬЯ!";
    }
};

const handleClick = (row, col) => {
    if (gameBoard[row][col] === '' && gameActive) {
        gameBoard[row][col] = currentPlayer;
        const cell = cells[row * 3 + col];
        const img = document.createElement('img');
        img.src = currentPlayer === 'X' ? 'images/x.png' : 'images/o.png';
        img.alt = currentPlayer;
        cell.innerHTML = '';
        cell.appendChild(img);
        cell.style.cursor = 'default';

        checkWinner();

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === "X") {
            circleSound.play(); // Воспроизвести звук для крестика
        } else {
            crossSound.play(); // Воспроизвести звук для нолика
        }
    }
};

cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        const row = parseInt(cell.getAttribute('data-row'));
        const col = parseInt(cell.getAttribute('data-col'));
        handleClick(row, col);
    });
});

// Добавляем обработчик для перезапуска игры
resultDiv.addEventListener('click', () => {
    resetGame();
    resultDiv.style.display = 'none';
});

const resetGame = () => {
    gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    gameActive = true;

    cells.forEach((cell) => {
        cell.innerHTML = '';
        cell.style.cursor = 'pointer';
    });

    resultImg.src = '';
    resultImg.alt = '';
    resultText.textContent = '';
};
