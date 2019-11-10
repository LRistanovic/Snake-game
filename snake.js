
let gameOver = false;

function collisionDetection() {
    for (let i = 0; i < snake.length; i++) {
        if (snakeHead.x == snake[i].x && snakeHead.y == snake[i].y) {
            gameOver = true;
        }
    }
    if(snakeHead.d == 'RIGHT' && snakeHead.x == canvas.width) {
        gameOver = true;
    }
    else if(snakeHead.d == 'LEFT' && snakeHead.x == 0) {
        gameOver = true;
    }
    else if(snakeHead.d == 'UP' && snakeHead.y == 0) {
        gameOver = true;
    }
    else if(snakeHead.d == 'DOWN' && snakeHead.y == canvas.height) {
        gameOver = true;
    }
}

if (gameOver == false) {
    update();
}