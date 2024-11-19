const board = document.getElementById("board");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""]; // 9 cells
let gameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Create game cells dynamically
function createBoard() {
  board.innerHTML = ""; // Clear the board
  gameState.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.setAttribute("data-index", index);
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  });
}

function handleCellClick(event) {
  const index = event.target.getAttribute("data-index");
  if (gameState[index] || !gameActive) return;

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWin()) {
    message.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (gameState.every(cell => cell)) {
    message.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningConditions.some(condition =>
    condition.every(index => gameState[index] === currentPlayer)
  );
}

function resetGame() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  message.textContent = "Player X's turn";
  createBoard();
}

// Initialize
resetButton.addEventListener("click", resetGame);
createBoard();
message.textContent = "Player X's turn";

function aiMove() {
    if (!gameActive) return;
  
    const availableMoves = gameState
      .map((cell, index) => (cell === "" ? index : null))
      .filter(index => index !== null);
  
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    gameState[randomMove] = "O";
    board.children[randomMove].textContent = "O";
  
    if (checkWin()) {
      message.textContent = "AI wins!";
      gameActive = false;
    } else if (gameState.every(cell => cell)) {
      message.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = "X";
      message.textContent = "Player X's turn";
    }
  }
  