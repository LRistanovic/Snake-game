let canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');

const block = 32;

const ground = new Image();
ground.src = "../Pictures/ground.png";
let Ground = {x:canvas.width/2-304, y:canvas.height/2-304}

const foodImg = new Image();
foodImg.src = "../Pictures/food.png";
let food = {x:0, y:0}

function drawFood() {
    food.x = Ground.x + (Math.floor(Math.random()*17)+1)*block;
    food.y = Ground.y + (Math.floor(Math.random()*15)+3)*block;

    foodImg.addEventListener("load",function(){
        ctx.drawImage(foodImg, food.x, food.y, block, block);
    });
}

ground.addEventListener("load",function(){
    ctx.drawImage(ground, Ground.x, Ground.y, 608, 608);
});
drawFood();
