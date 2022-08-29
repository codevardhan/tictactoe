var currentPlayer = "X";
const winning_positions = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];
var x_clicked = [];
var o_clicked = [];
var game_running = true;
var previous_click;
const grid = document.getElementsByClassName("tictactoe-box");
const result_text = document.getElementById("result-text");
const reset_button = document.getElementsByClassName("tictactoe-button")[0];
const winning_message = `Player ${currentPlayer} won!`;
const tie_message = "Tie!"

function boxclicked(boxID) {
  // Get ID of button which was pushed
  boxID = parseInt(boxID);

  // if the game is not running, return immediately
  if (!game_running) { return; }

  // If the box is already clicked, return
  if (x_clicked.includes(boxID) || o_clicked.includes(boxID)) {
    return;
  }  

  // check which player clicked the box and update the grid
  if (currentPlayer == "X") {
    x_clicked.push(boxID);
    drawX(boxID);
  }
  else {
    o_clicked.push(boxID);
    drawO(boxID);
  }

  // disable hover animations on the box that is clicked
  disableHover(boxID);

  // check if current board is in a tie position
  if ((x_clicked.length + o_clicked.length) == 9) {
    handleTie();
  }

  // check if the current player is in a winning position 
  for (let positions of winning_positions) {
    var isMatch = false;
    if (currentPlayer == "X") {
      let mixedSet = new Set([...positions, ...x_clicked]);
      isMatch = mixedSet.size == x_clicked.length;
    }
    else {
      let mixedSet = new Set([...positions, ...o_clicked]);
      isMatch = mixedSet.size == o_clicked.length;
    }
    // if current player is in a winning position, stop the game and display winner
    if (isMatch) {
      handleWin();
      break;
    }
  }

  // switch players after handling an input
  currentPlayer = switchPlayers(currentPlayer);
  previous_click = (boxID);
}

// function to draw X on the grid
function drawX(boxID) {
  let box = document.getElementById(boxID);
  box.classList.add('x-text');
  box.innerHTML = "X";
}

// function to draw O on the grid
function drawO(boxID) {
  let box = document.getElementById(boxID);
  box.classList.add('o-text');
  box.innerHTML = "O";
}

// function to remove text from the grid
function undraw(boxID) {
  let box = document.getElementById(boxID);
  box.classList.remove('o-text');
  box.innerHTML = "";
}

// function that undoes last move on double click
function undoClicked(boxID) {
  // if the game is not running, return immediately
  if (!game_running) { return; }

  // checks if the undo command is used for the last played move
  if (boxID != previous_click) { return }

  // undoes the last played move
  if (currentPlayer == "X") {
    const index = o_clicked.indexOf(parseInt(boxID));
    if (index > -1) { 
      o_clicked.splice(index, 1);
      undraw(boxID);
    }
  }
  else {
    const index = x_clicked.indexOf(parseInt(boxID));
    if (index > -1) { 
      x_clicked.splice(index, 1);
      undraw(boxID);
    }
  }

  // switch players
  currentPlayer = switchPlayers(currentPlayer);
}

// function to stop the game and make UI changes to display the winner
function handleWin() {
  game_running = false;
  for (var i = 0; i <= 8; i++) {
    disableHover(i);
  }

  result_text.innerHTML = winning_message;
  result_text.style.visibility = "visible";
  reset_button.style.pointerEvents = "auto";
}

// function to handle draw situation
function handleTie() {
  game_running = false;
  for (var i = 0; i <= 8; i++) {
    disableHover(i);
  } 

  result_text.innerHTML = tie_message;
  result_text.style.visibility = "visible";
  reset_button.style.pointerEvents = "auto";
}

// function to reset the game to play again
function resetGame() {
  currentPlayer = "X";
  x_clicked = [];
  o_clicked = [];
  game_running = true;
  
  for (var i = 0; i <= 8; i++) {
    grid[i].classList.add("hover");
    grid[i].classList.remove('x-text');
    grid[i].classList.remove('o-text');
    grid[i].innerHTML = "";
  }

  result_text.innerHTML = "";
  result_text.style.visibility = "hidden";
}

// function to switch current player
function switchPlayers(current) {
   if (current == "X") {
    current = "O";
  }
  else {
    current = "X";
   }
  return current
}

// function to disable hovering animation of a box
function disableHover(boxID) {
  grid[boxID].classList.remove("hover");
}
