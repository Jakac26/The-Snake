var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

const plateBorders = { 
  xSize: ctx.canvas.clientWidth,
  ySize: ctx.canvas.clientHeight
}

var snake = {
  width: 10,
  height: 10,
  xPosition: 200,
  yPosition: 200,
  xSpeed: 0,
  ySpeed: 0,
};

var food = {
  xPosition: 0,
  yPosition: 0,
};

var pageRefreshRate = 25;

function generateFoodCordinates() {
  food.xPosition = Math.floor(Math.random() * plateBorders.xSize);
  food.yPosition = Math.floor(Math.random() * plateBorders.ySize);
}

function initGame() {
  ctx.clearRect(0, 0, plateBorders.xSize, plateBorders.ySize);
  // drawPlate();
  drawFood();
  initSnake();
}

function initSnake() {
  snake = {
    width: 10,
    height: 10,
    xPosition: 200,
    yPosition: 200,
    xSpeed: 0,
    ySpeed: 0,
  };
  drawSnake();
}

function drawPlate() {
    ctx.clearRect(0, 0, plateBorders.ySize, plateBorders.xSize);
    ctx.fillRect(0, 0, plateBorders.ySize, plateBorders.xSize);
}

function drawSnake() {
  ctx.fillStyle = "#07b000";
  ctx.clearRect(snake.xPosition, snake.yPosition, snake.width, snake.height);
  ctx.fillRect(snake.xPosition, snake.yPosition, snake.width, snake.height);
}

function drawFood() {
  generateFoodCordinates();

  ctx.beginPath();
  ctx.fillStyle = "#FF0000";
  ctx.arc(food.xPosition, food.yPosition, 5, 0, 2 * Math.PI);
  ctx.fill();
}

function printKey() {
  c.addEventListener("keydown", (e) => {
    console.log(e.data);
  });
}

function checkCordinates() {
  if (
    snake.xPosition >= (plateBorders.xSize - 10) ||
    snake.xPosition <= 0 ||
    snake.yPosition >= (plateBorders.ySize - 10) ||
    snake.yPosition <= 0
  ) {
    alert("Koniec gry");
    return false;
  } else {
    if(
    snake.xPosition == food.xPosition ||
    snake.yPosition == food.yPosition
    ) {
      alert('Zje');
      return false
    }
    return true;
  }
}

function moveSnake() {
  // wymazanie calego weza

  if (!checkCordinates()) {
    initGame();
  } else {
    ctx.clearRect(snake.xPosition, snake.yPosition, snake.width, snake.height);
    snake.xPosition = snake.xPosition + snake.xSpeed;
    snake.yPosition = snake.yPosition + snake.ySpeed;
    drawSnake();
  }
}

function changeDirection(moveDirection) {
  switch (moveDirection) {
    case "UP":
      snake.ySpeed = -1;
      snake.xSpeed = 0;
      break;
    case "DOWN":
      snake.ySpeed = 1;
      snake.xSpeed = 0;
      break;
    case "LEFT":
      snake.xSpeed = -1;
      snake.ySpeed = 0;
      break;
    case "RIGHT":
      snake.xSpeed = 1;
      snake.ySpeed = 0;
      break;
  }
}

window.onkeypress = function (event) {
  const letterPressed = String.fromCharCode(event.which);

  switch (letterPressed) {
    case "w":
      console.log("up");
      changeDirection("UP");
      break;
    case "s":
      console.log("down");
      changeDirection("DOWN");
      break;
    case "a":
      console.log("left");
      changeDirection("LEFT");
      break;
    case "d":
      console.log("right");
      changeDirection("RIGHT");
      break;
  }
};

function update() {
  if (snake.xSpeed || snake.ySpeed) {
    this.moveSnake();
  }
}

setInterval(update, pageRefreshRate);

window.onload = function () {
  initGame();
  c.addEventListener("keydown", (e) => {
    console.log(e.data);
  });
};
