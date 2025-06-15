
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

const boardContainer = document.getElementById("board");
const scoreDisplay = document.getElementById("score");

function renderBoard() {
  boardContainer.innerHTML = '';
  board.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", () => makeMove(index));
    boardContainer.appendChild(cellDiv);
  });
}

function makeMove(index) {
  if (!gameActive || board[index]) return;
  board[index] = currentPlayer;
  renderBoard();
  if (checkWinner()) {
    gameActive = false;
    if (currentPlayer === 'X') scoreX++;
    else scoreO++;
    updateScore();
    launchConfetti();
    setTimeout(() => {
      clearConfetti();
    }, 3000);
  } else if (!board.includes('')) {
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return wins.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function updateScore() {
  scoreDisplay.textContent = `X: ${scoreX} O: ${scoreO}`;
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  renderBoard();
}

function resetScore() {
  scoreX = 0;
  scoreO = 0;
  updateScore();
}

renderBoard();
