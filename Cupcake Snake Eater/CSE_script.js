const newGame = document.getElementById("newGame");

const newGameTail = document.getElementsByClassName("newGameTail");
const newGameJersey = document.getElementsByClassName("newGameJersey");
const newGameSnake = document.getElementsByClassName("newGameSnake");
const newGameKD = document.getElementsByClassName("newGameKD");

newGame.onclick = function () {
  if (newGame.style.backgroundColor !== "lavender") {
    newGame.style.backgroundColor = "lavender";
    newGame.style.borderColor = "grey";
  } else {
    newGame.style.backgroundColor = "lightsteelblue";
    newGame.style.borderColor = "black";
  }
  clearInterval(moveInterval);
  snake = [140, 141, 142, 143];
  endGame = false;
  lastKeyInput = "left";
  disabledKey = "";
  gameBoard.removeChild(gameBoard.firstElementChild);
  gameTable();
};

const gameTable = function () {
  const makeTable = document.createElement("table");
  let cellCount = 1;

  for (let i = 0; i < 17; i++) {
    const makeRow = document.createElement("tr");
    for (let j = 0; j < 17; j++) {
      const makeCell = document.createElement("td");
      makeCell.id += `cell${cellCount}`;
      // if (j === 0) {
      //   makeCell.innerHTML = i + 1;
      // } else {
      //   makeCell.innerHTML = cellCount;
      // }
      if (
        cellCount === 140 ||
        cellCount === 141 ||
        cellCount === 142 ||
        cellCount === 143
      ) {
        makeCell.style.backgroundColor = "green";
      }
      if (cellCount === 150) {
        makeCell.style.backgroundColor = "pink";
      }
      makeRow.appendChild(makeCell);
      cellCount++;
    }
    makeTable.appendChild(makeRow);
  }

  const gameBoard = document.getElementById("gameBoard");
  gameBoard.appendChild(makeTable);
};

const table = gameTable();

let snake = [140, 141, 142, 143];


const canvasCurrentScore = document.getElementById("canvasCurrentScore");
const canvasTopScore = document.getElementById("canvasTopScore");

let score = 0;
let bestScore = 0;
let endGame = false;

const scoreKeeper = function() {
  if (score > bestScore) {
    bestScore = score;
    canvasTopScore.innerHTML = JSON.stringify(bestScore);
  }
  score = 0;
  canvasCurrentScore.innerHTML = JSON.stringify(score);
}

const ouroboros = function() {
  if (endGame === true) {
    document.getElementById(`cell${snake[snake.length - 1]}`).style.backgroundColor = "black";
    setTimeout(() => {alert("GG")}, 100);
  }
}

const moveTail = function () {
  document.getElementById(`cell${snake[0]}`).style.backgroundColor =
    "ghostWhite";
  snake.shift();
};

const moveUp = function () {
  gameOver("up");
  // tail movement + eaten cupcake
  cupcake("up");

  // KD move up
  if (snake[snake.length - 1] < 18) {
    let upEdgeCase = snake[snake.length - 1] + 272;
    snake.push(upEdgeCase);
    document.getElementById(`cell${upEdgeCase}`).style.backgroundColor =
      "green";
      ouroboros();
  } else {
    snake.push(snake[snake.length - 1] - 17);
    document.getElementById(
      `cell${snake[snake.length - 1]}`
    ).style.backgroundColor = "green";
    ouroboros();
  }
};

const moveDown = function () {
  gameOver("down");
  // tail movement + eaten cupcake
  cupcake("down");

  // KD move down
  if (snake[snake.length - 1] > 272) {
    let DownEdgeCase = snake[snake.length - 1] - 272;
    snake.push(DownEdgeCase);
    document.getElementById(`cell${DownEdgeCase}`).style.backgroundColor =
      "green";
      ouroboros();
  } else {
    snake.push(snake[snake.length - 1] + 17);
    document.getElementById(
      `cell${snake[snake.length - 1]}`
    ).style.backgroundColor = "green";
    ouroboros();
  }
};

const moveLeft = function () {
  gameOver("left");
  // tail movement + eaten cupcake
  cupcake("left");
  
  // KD move left
  if (snake[snake.length - 1] === 1) {
    snake.push(289);
    document.getElementById(`cell${289}`).style.backgroundColor = "green";
    ouroboros();
  } else {
    snake.push(snake[snake.length - 1] - 1);
    document.getElementById(
      `cell${snake[snake.length - 1]}`
    ).style.backgroundColor = "green";
    ouroboros();
  }
};

const moveRight = function () {
  gameOver("right");
  // tail movement + eaten cupcake
  cupcake("right");

  // KD move right
  if (snake[snake.length - 1] === 289) {
    snake.push(1);
    document.getElementById(`cell${1}`).style.backgroundColor = "green";
    ouroboros();
  } else {
    snake.push(snake[snake.length - 1] + 1);
    document.getElementById(
      `cell${snake[snake.length - 1]}`
    ).style.backgroundColor = "green";
    ouroboros();
  }
};

const cupcakeRandomizer = function () {

  const randomizer = function () {
    return Math.floor(Math.random() * (289 - 1) + 1);
  };

  const randomCell = randomizer();

  for (let i = 0; i < snake.length; i++) {
    if (snake[i] === randomCell) {
      cupcakeRandomizer();
      return;
    }
  }
  const newCupcake = document.getElementById(`cell${randomCell}`);
  newCupcake.style.backgroundColor = "pink";
};

const cupcake = function (movement) {

  if (endGame === true) {
    return;
  }

  let kD = snake[snake.length - 1];

  if (
    movement === "up" &&
    ((kD > 17 && document.getElementById(`cell${kD - 17}`).style
      .backgroundColor === "pink") ||
      (kD < 18 &&
        document.getElementById(`cell${kD + 272}`).style
          .backgroundColor === "pink"))
  ) {
    score++;
    canvasCurrentScore.innerHTML = JSON.stringify(score);
    cupcakeRandomizer();
    return;
  } else if (
    movement === "down" &&
    ((kD < 273 && document.getElementById(`cell${kD + 17}`).style
      .backgroundColor === "pink") ||
      (kD > 272 &&
        document.getElementById(`cell${kD - 272}`).style
          .backgroundColor === "pink"))
  ) {
    score++;
    canvasCurrentScore.innerHTML = JSON.stringify(score);
    cupcakeRandomizer();
    return;
  } else if (
    movement === "left" &&
    ((kD !== 1 && document.getElementById(`cell${kD - 1}`).style
      .backgroundColor === "pink") ||
      (kD === 1 &&
        document.getElementById(`cell${289}`).style.backgroundColor === "pink"))
  ) {
    score++;
    canvasCurrentScore.innerHTML = JSON.stringify(score);
    cupcakeRandomizer();
    return;
  } else if (
    movement === "right" &&
    ((kD !== 289 && document.getElementById(`cell${kD + 1}`).style
      .backgroundColor === "pink") ||
      (kD === 289 &&
        document.getElementById(`cell${1}`).style.backgroundColor === "pink"))
  ) {
    score++;
    canvasCurrentScore.innerHTML = JSON.stringify(score);
    cupcakeRandomizer();
    return;
  } else {
    moveTail();
  }
};

const gameOver = function (movement) {

  let kD = snake[snake.length - 1];

  if (
    movement === "up" &&
    ((kD > 17 && document.getElementById(`cell${kD - 17}`).style
      .backgroundColor === "green") ||
      (kD < 18 &&
        document.getElementById(`cell${kD + 272}`).style
          .backgroundColor === "green"))
  ) {
    clearInterval(moveInterval);
    endGame = true;
    scoreKeeper();
  } else if (
    movement === "down" &&
    ((kD < 273 && document.getElementById(`cell${kD + 17}`).style
      .backgroundColor === "green") ||
      (kD > 272 &&
        document.getElementById(`cell${kD - 272}`).style
          .backgroundColor === "green"))
  ) {
    clearInterval(moveInterval);
    endGame = true;
    scoreKeeper();
  } else if (
    movement === "left" &&
    ((kD !== 1 && document.getElementById(`cell${kD - 1}`).style
      .backgroundColor === "green") ||
      (kD === 1 &&
        document.getElementById(`cell${289}`).style.backgroundColor === "green"))
  ) {
    clearInterval(moveInterval);
    endGame = true;
    scoreKeeper();
  } else if (
    movement === "right" &&
    ((kD !== 289 && document.getElementById(`cell${kD + 1}`).style
      .backgroundColor === "green") ||
      (kD === 289 &&
        document.getElementById(`cell${1}`).style.backgroundColor === "green"))
  ) {
    clearInterval(moveInterval);
    endGame = true;
    scoreKeeper();
  } 
};


const up = 38;
const down = 40;
const left = 37;
const right = 39;

let lastKeyInput = "left";
let disabledKey = "";

const moveUpDownLeftRight = function () {

  if (endGame === true) {
    return;
  } else if (lastKeyInput === "up") {
    moveUp();
  } else if (lastKeyInput === "down") {
    moveDown();
  } else if (lastKeyInput === "left") {
    moveLeft();
  } else if (lastKeyInput === "right") {
    moveRight();
  }
}

let moveInterval = setInterval(moveUpDownLeftRight, 500);
clearInterval(moveInterval);

document.onkeydown = (e) => {
  e = e || window.event;

  if (e.keyCode === up && disabledKey !== "up/down" && lastKeyInput !== "up") {
    clearInterval(moveInterval);
    lastKeyInput = "up";
    disabledKey = "up/down";
    moveInterval = setInterval(moveUpDownLeftRight, 125);
    console.log("up arrow pressed");
  } else if (
    e.keyCode === down &&
    disabledKey !== "up/down" &&
    lastKeyInput !== "down"
  ) {
    clearInterval(moveInterval);
    lastKeyInput = "down";
    disabledKey = "up/down";
    moveInterval = setInterval(moveUpDownLeftRight, 125);
    console.log("down arrow pressed");
  } else if (
    e.keyCode === left &&
    disabledKey !== "left/right" &&
    lastKeyInput !== "left"
  ) {
    clearInterval(moveInterval);
    lastKeyInput = "left";
    disabledKey = "left/right";
    moveInterval = setInterval(moveUpDownLeftRight, 125);
    console.log("left arrow pressed");
  } else if (
    e.keyCode === right &&
    disabledKey !== "left/right" &&
    lastKeyInput !== "right"
  ) {
    clearInterval(moveInterval);
    lastKeyInput = "right";
    disabledKey = "left/right";
    moveInterval = setInterval(moveUpDownLeftRight, 125);
    console.log("right arrow pressed");
  } else if (e.keyCode === 80) {
    clearInterval(moveInterval);
  }
};

// initial state game
game = {
  id: [...289],
  snake: [140, 141, 142, 143],
  cupcake: 150,
  head: this.snake[this.snake.length - 1],
  currentDirection: 'left',
  disabledDirection: 'left/right',
  score: 0,
  highScore: 0
}