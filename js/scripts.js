var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

const plateBorders = {
  xSize: ctx.canvas.clientWidth,
  ySize: ctx.canvas.clientHeight,
};

var snake = {
  width: 10,
  height: 10,
  xPosition: 200,
  yPosition: 200,
  xSpeed: 0,
  ySpeed: 0,
  tail: [{ x: 200, y: 200 }],
};

var food = {
  xPosition: 0,
  yPosition: 0,
};

var pageRefreshRate = 100;

function generateFoodCordinates() {
  food.xPosition = Math.floor(Math.random() * plateBorders.xSize / 10) * 10;
  food.yPosition = Math.floor(Math.random() * plateBorders.ySize / 10) * 10;
}

function initGame() {
  ctx.clearRect(0, 0, plateBorders.xSize, plateBorders.ySize);
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
    tail: [{ x: 200 + 10, y: 200 },{ x: 200 + 20, y: 200 }],
  };
  drawSnake();
}

function drawPlate() {
  ctx.clearRect(0, 0, plateBorders.ySize, plateBorders.xSize);
  ctx.fillRect(0, 0, plateBorders.ySize, plateBorders.xSize);
}

function drawSnake() {
  ctx.fillStyle = "#07b000";

  // ctx.clearRect(snake.xPosition, snake.yPosition, snake.width, snake.height);
  // for (i = 0; i < snake.tail.length; i++) {
  //   ctx.clearRect(snake.tail[i].x, snake.tail[i].y, snake.width, snake.height);
  // }

  ctx.fillRect(snake.xPosition, snake.yPosition, snake.width, snake.height);  
  for (i = 0; i < snake.tail.length; i++) {
    ctx.fillRect(snake.tail[i].x, snake.tail[i].y, snake.width, snake.height);
  }
}

function drawFood() {
  generateFoodCordinates();

  ctx.beginPath();
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(food.xPosition, food.yPosition, 10, 10);
  ctx.fill();
}

function printKey() {
  c.addEventListener("keydown", (e) => {
    // console.log(e.data);
  });
}

function checkCordinates() {
  if (
    snake.xPosition >= plateBorders.xSize - 10 ||
    snake.xPosition <= 0 ||
    snake.yPosition >= plateBorders.ySize - 10 ||
    snake.yPosition <= 0
  ) {
    alert("Koniec gry");
    return false;
  } else {
    console.log(snake.xPosition, food.xPosition)
    console.log(snake.yPosition, food.yPosition)
    if (
      snake.xPosition == food.xPosition ||
      snake.yPosition == food.yPosition
    ) {
      alert("Zje");
      return false;
    }
    return true;
  }
}

function moveSnake() {
  // wymazanie calego weza

  if (!checkCordinates()) {
    initGame();
  } else {



    for (i = 1; i < snake.tail.length; i++) {
        ctx.clearRect(
        snake.tail[i].x,
        snake.tail[i].y,
        snake.width,
        snake.height
      );
      snake.tail[i].x = snake.tail[i - 1].x;
      snake.tail[i].y = snake.tail[i - 1].y;
      snake.tail[i - 1].x = snake.tail[i - 1].x;
      snake.tail[i - 1].y = snake.tail[i - 1].y;
    }
    
    snake.tail[0].x = snake.xPosition;
    snake.tail[0].y = snake.yPosition;
    snake.xPosition = snake.xPosition + snake.xSpeed;
    snake.yPosition = snake.yPosition + snake.ySpeed;

    drawSnake();
  }
}

function changeDirection(moveDirection) {
  switch (moveDirection) {
    case "UP":
      snake.ySpeed = -10;
      snake.xSpeed = 0;
      break;
    case "DOWN":
      snake.ySpeed = 10;
      snake.xSpeed = 0;
      break;
    case "LEFT":
      snake.xSpeed = -10;
      snake.ySpeed = 0;
      break;
    case "RIGHT":
      snake.xSpeed = 10;
      snake.ySpeed = 0;
      break;
  }
}

window.onkeypress = function (event) {
  // console.log(event);
  const letterPressed = String.fromCharCode(event.which);

  switch (letterPressed) {
    case "w":
      // console.log("up");
      changeDirection("UP");
      break;
    case "s":
      // console.log("down");
      changeDirection("DOWN");
      break;
    case "a":
      // console.log("left");
      changeDirection("LEFT");
      break;
    case "d":
      // console.log("right");
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
