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

  xIsNext = !xIsNext;

  calculateWinner();
}

function calculateWinner() {
  const pattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
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
  const textAlert = document.createElement("div");
  const container = document.getElementById("board");
  textAlert.id = "alert";
  container.appendChild(textAlert);
  textAlert.innerHTML = result;
  gameActive = false;
}

function highlightWinningCells(cells) {
  for (let i in cells) {
    document.getElementById(`btn-${i}`).className += "winning-cell";
  }
}

function resetGame() {
  for (let i = 0; i < 9; i++) {
    document.getElementById(`btn-${i}`).classList.remove("winning-cell");
    if (!gameActive && document.getElementById("alert").length > 0) {
      document.getElementById("alert")[0].remove();
    }
  }

  initializeGame();
}

const resetBtn = document
  .getElementById("reset-btn")
  .addEventListener("click", resetGame);
document.addEventListener("DOMContentLoaded", initializeGame);
