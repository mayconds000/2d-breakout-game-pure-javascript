var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var ballRadius = 10;
var x = canvas.width/2;
var y =  canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brick = {
  rowCount: 3,
  columnCount: 5,
  width: 75,
  height: 20,
  padding: 10,
  offsetTop: 30,
  offsetLeft: 30
}
var bricks = [];
for(let c=0; c<brick.columnCount; c++){
  bricks[c] = [];
  for(let r=0; r<brick.rowCount; r++){
    bricks[c][r] = {x: 0, y: 0};
  }
}

function drawBricks(){
  for(let c=0; c < brick.columnCount; c++) {
    for(let r=0; r < brick.rowCount; r++) {
      let brickX = (c*(brick.width+brick.padding))+brick.offsetLeft;
      let brickY = (c*(brick.height+brick.padding))+brick.offsetTop;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brick.width, brick.height);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHendler, false);

function keyDownHandler(e) {
  if(e.keyCode == 39){
    rightPressed = true;
  } else if(e.keyCode == 37){
    leftPressed = true;
  }
}

function keyUpHendler(e) {
  if(e.keyCode == 39){
    rightPressed = false;
  } else if(e.keyCode == 37){
    leftPressed = false;
  }
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  x += dx;
  y += dy;

  // if(y + dy < 0) dy = -dy;
  // if(y + dy > canvas.height) dy = -dy;
  if(y + dy < ballRadius) dy = -dy;
  else if(y + dy > canvas.height - ballRadius ){
    if(x > paddleX && x < paddleX + paddleWidth) dy = -dy;
    else {
      alert("GAME OVER");
      document.location.reload();
    }


  }
  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;

  if(rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 7;
  else if(leftPressed && paddleX > 0) paddleX -= 7;


}

setInterval(draw, 10);
