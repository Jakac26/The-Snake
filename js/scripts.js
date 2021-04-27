var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var snake = {
  width: 10,
  height: 30,
  xPosition: 200,
  yPosition: 200,
};

var food = {
  xPosition: 0,
  yPosition: 0,
};

function generateFoodCordinates() {
  food.xPosition = Math.floor(Math.random() * 500);
  food.yPosition = Math.floor(Math.random() * 500);
}

function initSnake() {
    ctx.fillStyle = "#07b000";
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
    c.addEventListener('keydown', (e) => {
        console.log(e.data);
    })
}

// function moveSnake() {}

window.onkeypress = function(event) {
    const letterPressed = String.fromCharCode(event.which) 
    
    switch(letterPressed){
        case 'w':
            console.log('up');
        break;
        case 's':
            console.log('down');
        break;
        case 'a':
            console.log('left');
        break;
        case 'd':
            console.log('right');
        break;
    } 
}

window.onload = function () {
    drawFood();
    initSnake();
    c.addEventListener('keydown', (e) => {
        console.log(e.data);
    })
};

