const containersEl = document.querySelector("#container").children;
function createPlayers(player, marker) {
  const playerInfo = `This is ${player}  and his marker is ${marker}`;
  return { player, marker };
}

const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const addToBoard = (marker, position) => {
    if (board[position] != "X" && board[position] != "O") {
      board[position] = marker;
    }
  };
  const logBoard = () =>
    console.log(
      `${board[0]} ${board[1]} ${board[2]} 
${board[3]} ${board[4]} ${board[5]} 
${board[6]} ${board[7]} ${board[8]}`
    );
  const clearBoard = () => {
    for (let i = 0; i < containersEl.length; i++) {
      if (containersEl[i].hasChildNodes()) containersEl[i].lastChild.remove();
    }
    const clearedBoard = board.map((block) => (block = ""));
    board = clearedBoard;
  };
  const getBoardValues = () => {
    const iterateOverBoard = board.values();
    const boardValues = [];
    iterateOverBoard.forEach((value) => {
      boardValues.push(value);
    });
    return boardValues;
  };
  return { addToBoard, logBoard, clearBoard, getBoardValues };
})();

let currentMove = "O"; // Initialize to "O" so the first call returns "X"

function getNextMove() {
  currentMove = currentMove === "X" ? "O" : "X";
  return currentMove;
}

function winCondition() {
  if (condition("X") || condition("O")) {
    return true;
  } else {
    return false;
  }
  // Horizontal Lines
}
function condition(marker) {
  const boardValues = gameBoard.getBoardValues();
  console.log(boardValues);
  if (
    boardValues[0] === marker &&
    boardValues[1] === marker &&
    boardValues[2] === marker
  ) {
    return true;
  } else if (
    boardValues[3] === marker &&
    boardValues[4] === marker &&
    boardValues[5] === marker
  ) {
    return true;
  } else if (
    boardValues[6] === marker &&
    boardValues[7] === marker &&
    boardValues[8] === marker
  ) {
    return true;
  } else if (
    //Vertical Lines
    boardValues[0] === marker &&
    boardValues[3] === marker &&
    boardValues[6] === marker
  ) {
    return true;
  } else if (
    boardValues[1] === marker &&
    boardValues[4] === marker &&
    boardValues[7] === marker
  ) {
    return true;
  } else if (
    boardValues[2] === marker &&
    boardValues[5] === marker &&
    boardValues[8] === marker
  ) {
    return true;
  } else if (
    // diagonal Lines
    boardValues[0] === marker &&
    boardValues[4] === marker &&
    boardValues[8] === marker
  ) {
    return true;
  } else if (
    boardValues[2] === marker &&
    boardValues[4] === marker &&
    boardValues[6] === marker
  ) {
    return true;
  } else {
    return false;
  }
}

const player01 = createPlayers("Player01", "X");
const player02 = createPlayers("Player02", "O");
const containerEl = document.querySelector("#container");
const index = Array.from(containerEl.children);
const newGameBtnEl = document.querySelector(".btn");
newGameBtnEl.addEventListener("click", gameBoard.clearBoard);

containerEl.addEventListener("click", (e) => {
  if (!winCondition()) {
    const markerImg = document.createElement("img");
    markerImg.classList.toggle("marker");

    const move = getNextMove(); // Call getNextMove() once and store the result

    if (move == "X") markerImg.src = "images/x.svg";
    if (move == "O") markerImg.src = "images/o.svg";

    markerImg.alt = "Svg";
    if (!e.target.hasChildNodes()) e.target.append(markerImg);
    gameBoard.addToBoard(move, index.indexOf(e.target)); // Use the stored move value here
    console.log(move); // Log the move
    gameBoard.logBoard();
    console.log("you didn't win");
  }
});
