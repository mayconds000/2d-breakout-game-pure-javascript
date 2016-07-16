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
var score = 0;
var lives = 3;
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
    bricks[c][r] = {x: 0, y: 0, status: 1};
  }
}

function drawBricks(){
  for(let c=0; c < brick.columnCount; c++) {
    for(let r=0; r < brick.rowCount; r++) {
      if(bricks[c][r].status == 1){
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

function collisionDetection(){

  for(let c=0; c < brick.columnCount; c++){
    for(let r=0; r < brick.rowCount; r++){
      var b = bricks[c][r];
      if(b.status == 1){
        if(x > b.x && x < b.x + brick.width && y > b.y && y < b.y+brick.height){
          dy = -dy;
          b.status = 0;
          score+=1;
          if(score == brick.rowCount*brick.columnCount){
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}

function drawLives(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  drawBricks();
  collisionDetection();
  x += dx;
  y += dy;


  if(y + dy < ballRadius) dy = -dy;
  else if(y + dy > canvas.height - ballRadius ){
    if(x > paddleX && x < paddleX + paddleWidth) dy = -dy;
    else {
      lives--;
      if(!lives){
        alert("GAME OVER");
        document.location.reload();
      } else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth)/2;
      }
    }


  }
  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;

  if(rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 7;
  else if(leftPressed && paddleX > 0) paddleX -= 7;

  requestAnimationFrame(draw);

}

draw();

document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e){
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width){
    paddleX = relativeX - paddleWidth/2;
  }
}
