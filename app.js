const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

let stickmen = [];
let isGameRunning = false;
let player1Score = 0;
let player2Score = 0;

const Stickman = {
    width: 40,
    height: 60,
    speed: 5,
    attackRange: 20
};

function createStickmen() {
    stickmen = [
        { x: 100, y: 300, speedX: 0, speedY: 0, color: '#ff0000' },
        { x: 460, y: 300, speedX: 0, speedY: 0, color: '#00ff00' }
    ];
}

function drawStickman(stickman) {
    ctx.fillStyle = stickman.color;
    ctx.fillRect(stickman.x, stickman.y, Stickman.width, Stickman.height);
    ctx.fillRect(stickman.x + Stickman.width/4, stickman.y - Stickman.height/2, Stickman.width/2, Stickman.height/2);
    ctx.fillRect(stickman.x, stickman.y + Stickman.height/4, Stickman.width/4, Stickman.height/4);
    ctx.fillRect(stickman.x + 3*Stickman.width/4, stickman.y + Stickman.height/4, Stickman.width/4, Stickman.height/4);
}

function updateStickmen() {
    stickmen.forEach((stickman, index) => {
        stickman.x += stickman.speedX;
        stickman.y += stickman.speedY;
        
        if (stickman.x < 0) stickman.x = 0;
        if (stickman.x > canvas.width - Stickman.width) stickman.x = canvas.width - Stickman.width;
        if (stickman.y < 0) stickman.y = 0;
        if (stickman.y > canvas.height - Stickman.height) stickman.y = canvas.height - Stickman.height;
    });
}

function checkCollision() {
    const stick1 = stickmen[0];
    const stick2 = stickmen[1];
    
    if (Math.abs(stick1.x - stick2.x) < Stickman.attackRange &&
        Math.abs(stick1.y - stick2.y) < Stickman.attackRange) {
        if (Math.random() < 0.5) {
            player1Score++;
        } else {
            player2Score++;
        }
        scoreElement.textContent = `Player 1: ${player1Score} | Player 2: ${player2Score}`;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stickmen.forEach(stickman => {
        drawStickman(stickman);
    });
    
    updateStickmen();
    checkCollision();
    
    if (isGameRunning) {
        requestAnimationFrame(gameLoop);
    }
}

document.addEventListener('keydown', (e) => {
    if (!isGameRunning) return;
    
    if (e.key === 'ArrowLeft') stickmen[0].speedX = -Stickman.speed;
    if (e.key === 'ArrowRight') stickmen[0].speedX = Stickman.speed;
    if (e.key === 'ArrowUp') stickmen[0].speedY = -Stickman.speed;
    if (e.key === 'ArrowDown') stickmen[0].speedY = Stickman.speed;
    
    if (e.key === 'a') stickmen[1].speedX = -Stickman.speed;
    if (e.key === 'd') stickmen[1].speedX = Stickman.speed;
    if (e.key === 'w') stickmen[1].speedY = -Stickman.speed;
    if (e.key === 's') stickmen[1].speedY = Stickman.speed;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || 
        e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        stickmen[0].speedX = 0;
        stickmen[0].speedY = 0;
    }
    
    if (e.key === 'a' || e.key === 'd' || e.key === 'w' || e.key === 's') {
        stickmen[1].speedX = 0;
        stickmen[1].speedY = 0;
    }
});

startBtn.addEventListener('click', () => {
    isGameRunning = true;
    createStickmen();
    gameLoop();
});

resetBtn.addEventListener('click', () => {
    isGameRunning = false;
    player1Score = 0;
    player2Score = 0;
    scoreElement.textContent = `Player 1: 0 | Player 2: 0`;
});