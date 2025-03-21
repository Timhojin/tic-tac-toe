let gameBoard = Array(9).fill(null);
let xIsNext = true;
let gameActive = true;

function initializeGame() {
  gameBoard = Array(9).fill(null);
  xIsNext = true;
  gameActive = true;

  for (let i = 0; i < 9; i++) {
    const cell = document.getElementById(`btn-${i}`);
    cell.innerHTML = "";
    cell.addEventListener("click", () => handleMove(i));
  }
}

function handleMove(position) {
  if (gameBoard[position] != null || !gameActive) {
    return;
  }

  gameBoard[position] = xIsNext ? "X" : "O";
  const cell = document.getElementById(`btn-${position}`);
  cell.innerHTML = xIsNext ? "X" : "O";
  cell.className += xIsNext ? "X" : "O";

  xIsNext = !xIsNext;

  calculateWinner();
}

function calculateWinner() {
  const pattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < pattern.length; i++) {
    const [a, b, c] = pattern[i];
    if (
      gameBoard[a] != null &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      highlightWinningCells([a, b, c]);
      updateStatus(`${gameBoard[a]} has WON!`);
      return;
    }
  }
  if (checkDraw()) {
    updateStatus("The game ended in a TIE.");
  }

  return;
}

function checkDraw() {
  for (let i = 0; i < 9; i++) {
    if (gameBoard[i] === null) return false;
  }
  return true;
}

function updateStatus(result) {
  const status = document.getElementById("status");
  status.innerText = result;

  document.getElementById("reset-txt").className += "blinking-text";

  gameActive = false;
}

function highlightWinningCells(cells) {
  for (let i = 0; i < cells.length; i++) {
    const cell = document.getElementById(`btn-${cells[i]}`);
    cell.classList.remove(gameBoard[cells[i]] === "X" ? "X" : "O");
    cell.className += "winning-cell";
  }
}

function resetGame() {
  for (let i = 0; i < 9; i++) {
    document.getElementById(`btn-${i}`).classList.remove("winning-cell");
    document.getElementById(`btn-${i}`).classList.remove("X");
    document.getElementById(`btn-${i}`).classList.remove("O");
  }
  document.getElementById("status").innerText = "Let's Play Tic-Tac-Toe!";
  document.getElementById("reset-txt").classList.remove("blinking-text");

  initializeGame();
}

const resetBtn = document
  .getElementById("reset-btn")
  .addEventListener("click", resetGame);
document.addEventListener("DOMContentLoaded", initializeGame);
