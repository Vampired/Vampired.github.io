const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20;
let ballX = cw/2 - ballSize / 2
let ballY = ch/2 - ballSize / 2

const paddleHeight = 100;
const paddleWidth = 20;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

const lineWidth = 6;
const lineHight = 16;

let ballSpeedX = -6;
let ballSpeedY = 1;

let playerPoints = 0;
let aiPoints = 0;

function table() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,cw,ch);
    for(let linePosition = 20; linePosition < ch; linePosition+=30) {
        ctx.fillStyle ='gray';
        ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHight)
    }
}

function ball() {
    ctx.fillStyle = 'white';
    ctx.fillRect(ballX,ballY,ballSize,ballSize);
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    if(ballY <= 0 || ballY + ballSize >= ch ){
            ballSpeedY = -ballSpeedY;
        console.log("góra");
           // speedUp();
        }
    if(ballX <= 0 || ballX + ballSize >= cw){
            ballSpeedX = -ballSpeedX;
        console.log("bok");
           // 
    }
    
    
        // kolizja piłki z playerem
    if(playerX < ballX + ballSize && playerY < ballY + ballSize && ballX < playerX + paddleWidth && ballY < playerY + paddleHeight) {
                smash(playerY);
            speedUp();
        ballSpeedX = -ballSpeedX;
    } 
        // kolizja piłki z AI
    if(aiX < ballX + ballSize && aiY < ballY + ballSize && ballX < aiX + paddleWidth && ballY < aiY + paddleHeight) {
                smash(aiY);
            speedUp();
        ballSpeedX = -ballSpeedX;
    }
    
}
    // paletka gracza
function player() {
    ctx.fillStyle = 'green';
    ctx.fillRect(playerX,playerY,paddleWidth,paddleHeight);
    
}
    // paletka ai
function ai() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(aiX,aiY,paddleWidth,paddleHeight);
}

topCanvas = canvas.offsetTop;
    // poruszanie się gracza
function playerPosition(e) {
    playerY = e.clientY - topCanvas - paddleHeight/2;
    if(playerY <= 0) {
        playerY = 0;
    }
    if(playerY >= ch - paddleHeight) {
        playerY = ch - paddleHeight;
    }
}
    // poruszanie się ai
function aiPosition() {
 
    const paddleCenter = aiY + paddleHeight / 2 ;
    const ballCenter = ballY + ballSize / 2;
    
    if(ballX > 500) {
        if (paddleCenter - ballCenter > 200) {
            aiY -= 12;
    }
        else if (paddleCenter - ballCenter > 50) {
            aiY -= 5;
    }
        
        else if(paddleCenter - ballCenter < -200) {
            aiY += 12;
        }
    
        else if(paddleCenter - ballCenter < -50) {
            aiY += 5;
        }}
    
    if (ballX <= 500 && ballX > 100) {
        if (paddleCenter - ballCenter > 100) {
          aiY -= 3;
        }
        else if (paddleCenter - ballCenter < -100) {
          aiY += 3;
        }
      }
    
    if(aiY <= 0) {
        aiY = 0;
    }
    if(aiY >= ch - paddleHeight) {
        aiY = ch - paddleHeight;
    }
}
    // przyśpieszanie piłki
function speedUp() {
    if(ballSpeedX > 0 && ballSpeedX <25) {
        ballSpeedX += .8;
    }
    else if(ballSpeedX < 0 && ballSpeedX > -25)
        ballSpeedX -= .8;
    }
// odbijanie piłki w różne kierunki paletkami
function smash(gamerY) {
        //  środek
    if(ballY <= gamerY + 69 && ballY >= gamerY + 51){
            ballSpeedY = Math.floor(Math.random()+1);
    }   //  góra
    else if(ballY <= gamerY + 70){
            ballSpeedY = -Math.random()*5-1;
    }   //  dół
    else if(ballY >= gamerY + 50){
            ballSpeedY = Math.random()*5+1;
    }
}
    // przydzielanie punktów
function point() {
    if(ballX <= playerX){
            aiPoints++;
        ballX = cw/2 - ballSize / 2;
        ballY = ch/2 - ballSize / 2;
        ballSpeedX = -6;
        ballSpeedY = Math.floor(Math.random()*5 -3);
            }
        else if(ballX >= aiX) {
            playerPoints++;
        ballX = cw/2 - ballSize / 2;
        ballY = ch/2 - ballSize / 2;
        ballSpeedX = 6;
        ballSpeedY = Math.floor(Math.random()*5 -3);
        }    
}
    // Tablica wyników
function score() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "red";
        ctx.fillText(aiPoints,cw/2+40,50);
        ctx.fillText(playerPoints,cw/2-40,50);
        ctx.textAlign = "center";
    if(aiPoints >= 10 || playerPoints >= 10) {
        if(aiPoints > playerPoints){
            ctx.fillText("Komputer wygrał!",cw/2,ch/4);
        }
        else if (aiPoints < playerPoints)
            {
            ctx.fillText("Gracz wygrał!",cw/2,ch/4);    
            }
        ctx.font = "50px Arial";
        ctx.fillStyle = "green";
        ctx.textAlign = "center";
        ballSpeedX = 0;
        ballSpeedY = 0;
    }
}
canvas.addEventListener("mousemove", playerPosition);

function game() {
    point();
    table();
    score();
    ball();
    player();
    ai();
    aiPosition();
    
}
setInterval(game, 1000 / 60)