const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
const playerScore = document.getElementById('playerPoints');
const aiScore = document.getElementById('aiPoints');


canvas.width = 1280;
canvas.height = 720;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20;
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;


const paddelWidth = 20;
const paddelHeight = 100;


const playerX = 70;
const aiX = 1190;

let playerY = 300;
let aiY = 300;

const lineWidth = 6;
const lineHight = 15;

let ballSpeedX = 2;
let ballSpeedY = 2;

let playerPoints = 0;
let aiPoints = 0;



const topCanvas = canvas.offsetTop;
let newGame = true;

const aiPosition = () => {
    const middlePaddle = aiY + paddelHeight / 2;
    const middleBall = ballY + ballSize / 2;

    if (ballX > 720) {
        if (middlePaddle - middleBall > 200) {
            aiY -= 28;
        } else if (middlePaddle - middleBall > 50) {
            aiY -= 18;
        } else if (middlePaddle - middleBall < -200) {
            aiY += 28;
        } else if (middlePaddle - middleBall < -50) {
            aiY += 18;
        }
    } else if (ballX <= 720 && ballX > 200) {
        if (middlePaddle - middleBall > 100) {
            aiY -= 3;

        } else if (middlePaddle - middleBall < -100) {
            aiY += 3;
        }
    }
}

const playerPosition = (e) => {
    playerY = e.clientY - topCanvas - paddelHeight / 2;

    if (playerY >= ch - paddelHeight) {
        playerY = ch - paddelHeight
    }
    if (playerY <= 0) {
        playerY = 0;
    }

    // aiY = playerY;
}

const table = () => {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, cw, ch);
    for (let i = 10; i < ch; i += 40) {
        ctx.fillStyle = 'gray';
        ctx.fillRect(cw / 2 - lineWidth / 2, i, lineWidth, lineHight);
    }

}

const reset = (e) => {

    if (e) {
        playerScore.textContent = ++playerPoints;
    } else {
        aiScore.textContent = ++aiPoints;
    }
}

const resetBall = () => {
    ballX = playerX + paddelWidth;
    ballY = playerY + paddelHeight / 2 - ballSize / 2;
    ctx.fillStyle = 'white';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
};

const play = () => {
    newGame = false;
    ballSpeedX = 2;
    ballSpeedY = 2;
}

const ball = () => {
    ctx.fillStyle = 'white';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY + ballSize >= ch) {
        ballSpeedY = -ballSpeedY;
        speedUpBall();

    }
    if (ballX <= 0 || ballX + ballSize >= cw) {
        ballSpeedX = -ballSpeedX;
        speedUpBall();

    }

    if (ballX + ballSize >= cw) {
        reset(true);
    }

    if (ballX <= 0) {
        reset(false);
    }

    if (ballX <= playerX + paddelWidth &&
        ballX >= playerX &&
        ballY + ballSize >= playerY &&
        ballY <= playerY + paddelHeight)

    {
        ballSpeedX *= -1;
        ballX = playerX + paddelWidth;
        speedUpBall();
    }

    if (ballX + ballSize >= aiX &&
        ballX + ballSize <= aiX + paddelWidth &&
        ballY + ballSize >= aiY && ballY <= aiY + paddelHeight)

    {
        ballSpeedX *= -1;
        ballX = aiX - ballSize;
        speedUpBall();
    }


}

const speedUpBall = () => {
    if (ballSpeedX > 0 && ballSpeedX <= 16) {
        ballSpeedX += 0.3;
    } else if (ballSpeedX < 0 && ballSpeedX > -16) {
        ballSpeedX -= 0.3;
    }

    if (ballSpeedY > 0 && ballSpeedY <= 16) {
        ballSpeedY += 0.2;
    } else if (ballSpeedY < 0 && ballSpeedY > -16) {
        ballSpeedY -= 0.2;
    }
}

const player = () => {
    ctx.fillStyle = 'brown';
    ctx.fillRect(playerX, playerY, paddelWidth, paddelHeight);

}

const ai = () => {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(aiX, aiY, paddelWidth, paddelHeight);

}

canvas.addEventListener('click', play);

canvas.addEventListener('mousemove', playerPosition);

const game = () => {
    table();
    if (!newGame) {
        ball();
    } else {
        resetBall();
    }
    player();
    ai();
    aiPosition();

}

setInterval(game, 1000 / 60)