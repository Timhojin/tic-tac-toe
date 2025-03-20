let gameBoard = Array(9).fill(null);
let xIsNext = true;

function position(first, second) {
  if (first < 1 || first > 3 || second < 1 || second > 3) {
    console.log("Invalid position! Please enter numbers between 1 and 3");
    return false;
  }

  const conv = 3 * (first - 1) + second - 1;

  if (gameBoard[conv] !== null) {
    console.log("This position is already taken!");
    return false;
  }

  if (xIsNext) {
    gameBoard[conv] = "X";
    xIsNext = false;
  } else {
    gameBoard[conv] = "O";
    xIsNext = true;
  }
  return true;
}

function calculateWinner() {
  const patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < patterns.length; i++) {
    const [a, b, c] = patterns[i];
    if (gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }

  return null;
}

function isDraw() {
  return gameBoard.every((cell) => cell !== null);
}

function displayBoard() {
  console.log("\nCurrent board:");
  for (let i = 0; i < 9; i += 3) {
    console.log(
      (gameBoard[i] || " ") +
        " | " +
        (gameBoard[i + 1] || " ") +
        " | " +
        (gameBoard[i + 2] || " ")
    );
    if (i < 6) console.log("---------");
  }
  console.log("\n");
}

function play() {
  displayBoard();

  const first = Number(prompt("Enter the row (1-3): "));
  const second = Number(prompt("Enter the column (1-3): "));

  if (isNaN(first) || isNaN(second)) {
    console.log("Please enter valid numbers!");
    return;
  }

  if (!position(first, second)) {
    return;
  }
}

let gameActive = true;

while (gameActive) {
  play();
  const winner = calculateWinner();

  if (winner) {
    console.log(`${winner} has won!`);
    gameActive = false;
  } else if (isDraw()) {
    console.log("Game ended in a draw!");
    gameActive = false;
  }
}
