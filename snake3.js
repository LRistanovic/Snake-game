let canvas = document.getElementById('myCanvas');
canvas.height = window.innerHeight;
canvas.width = canvas.height;
let ctx = canvas.getContext('2d');

let block = canvas.width/19;
let score = 0;
let gameOver = false;

let background = new Image();
background.src = '../Pictures/ground.png';
let foodImg = new Image();
foodImg.src = '../Pictures/food.png';
let food = {x:(Math.floor(Math.random()*17)+1)*block, y:(Math.floor(Math.random()*15)+3)*block}

let soundDead = new Audio();
soundDead.src = '../Music/dead.mp3';
let soundFoodEat = new Audio();
soundFoodEat.src = '../Music/eat.mp3';
let soundUp = new Audio();
soundUp.src = '../Music/up.mp3';
let soundDown = new Audio();
soundDown.src = '../Music/down.mp3';
let soundLeft = new Audio();
soundLeft.src = '../Music/left.mp3';
let soundRight = new Audio();
soundRight.src = '../Music/right.mp3';

let dir = 'stop';
let lastMovement = 0;

ctx.fillStyle = '#013220';

let snake = [
    {x: block * 9, y: block * 10}
];

document.addEventListener('keydown', function(e) {
    if(e.keyCode === 37 && dir != 'right')
        dir = 'left';
    if(e.keyCode === 39 && dir != 'left')
        dir = 'right';
    if(e.keyCode === 38 && dir != 'down')
        dir = 'up';
    if(e.keyCode === 40 && dir != 'up') 
        dir = 'down';
});

function foodPos() {//provjeravam ako je nova pozicija hrane u snake i ako jeste opet premjesti hranu dok nije u snake
    for (let i = 1; i < snake.length; i++) {
        if (Math.floor(food.x) == Math.floor(snake[i].x) && Math.floor(food.y) == Math.floor(snake[i].y)) {
            food.x = (Math.floor(Math.random()*17)+1)*block;
            food.y = (Math.floor(Math.random()*15)+3)*block;
            foodPos();
        }
    }
}

function update(animationTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = (Date.now() - (animationTime || Date.now())) / 1000;
    let lastAnimationTime = Date.now();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(foodImg, food.x, food.y, block, block);

    //pomjeranje svakih pola sekunde
    if(lastMovement < Date.now() - 100) { 

        let newHead = {x: 0, y: 0};
        if(dir === 'up') {
            newHead.x = snake[0].x;
            newHead.y = snake[0].y - block;
            snake.unshift(newHead);
            lastMovement = Date.now();
        }
        if(dir === 'down') {
            newHead.x = snake[0].x;
            newHead.y = snake[0].y + block;
            snake.unshift(newHead);
            lastMovement = Date.now();
        }
        if(dir === 'left') {
            newHead.x = snake[0].x - block;
            newHead.y = snake[0].y;
            snake.unshift(newHead);
            lastMovement = Date.now();
        }
        if(dir === 'right') {
            newHead.x = snake[0].x + block;
            newHead.y = snake[0].y;
            snake.unshift(newHead);
            lastMovement = Date.now();
        }
        //Provjerim ako je glava na hrana
        if (Math.floor(food.x) == Math.floor(snake[0].x) && Math.floor(food.y) == Math.floor(snake[0].y)) {// ako jeste poraste snake i hrana se pomjeri
            score++;
            food.x = (Math.floor(Math.random()*17)+1)*block;
            food.y = (Math.floor(Math.random()*15)+3)*block;
            foodPos();
        }
        else if (snake.length != 1){//ako nije makni kraj snake
            snake.pop();
        }

        if(snake[0].x > canvas.width-block || snake[0].x < block || snake[0].y < 2*block || snake[0].y > canvas.height-block) { //provjerim ako je glava izasao
            gameOver = true;
        }
    }

    for(let i = 0; i < snake.length; i++) {//crtam snake
        ctx.fillStyle = '#013220';
        ctx.fillRect(snake[i].x, snake[i].y, block, block);
    }
    for (let i = 1; i < snake.length; i++) {//provjerim ako je glava na rep 
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            gameOver = true;
        }
    }
    //crtam score
    ctx.fillStyle = 'white';
    ctx.font = "45px Changa one";
    ctx.fillText('x'+score,block*2,block*1.5)

    if (gameOver == false) {
        window.requestAnimationFrame(() => update(lastAnimationTime));
    }
}
if (gameOver == false) {
    update();
}
