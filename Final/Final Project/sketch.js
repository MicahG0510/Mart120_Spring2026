let player;
let zombies = [];
let score = 0;
let highScore = 0;
let gameOver = false;

function setup() {
  createCanvas(800, 600);
  initializeGame();
}

function initializeGame() {
  player = {
    x: width / 2,
    y: height / 2,
    size: 25,
    speed: 4
  };

  zombies = [];
  score = 0;
  gameOver = false;

  // Create starting zombies
  for (let i = 0; i < 5; i++) {
    createZombie();
  }
}

function draw() {
  background(40, 120, 40);

  if (!gameOver) {
    movePlayer();
    drawPlayer();

    moveZombies();
    drawZombies();

    checkCollisions();

    displayScore();

    // Increase score over time
    score += 0.05;

    // Add more zombies every few seconds
    if (frameCount % 300 === 0) {
      createZombie();
    }
  } else {
    displayGameOver();
  }
}

// ---------------- PLAYER ----------------
function movePlayer() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    player.x -= player.speed;
  }

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    player.x += player.speed;
  }

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    player.y -= player.speed;
  }

  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    player.y += player.speed;
  }

  // Keep player inside screen
  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);
}

function drawPlayer() {
  fill(50, 150, 255);
  ellipse(player.x, player.y, player.size);
}

// ---------------- ZOMBIES ----------------
function createZombie() {
  let zombie = {
    x: random(width),
    y: random(height),
    size: random(20, 40),
    speed: random(1, 2)
  };

  zombies.push(zombie);
}

function moveZombies() {
  for (let i = 0; i < zombies.length; i++) {
    let z = zombies[i];

    // Chase player
    if (player.x > z.x) {
      z.x += z.speed;
    } else {
      z.x -= z.speed;
    }

    if (player.y > z.y) {
      z.y += z.speed;
    } else {
      z.y -= z.speed;
    }
  }
}

function drawZombies() {
  for (let i = 0; i < zombies.length; i++) {
    fill(0, 200, 0);
    rect(zombies[i].x, zombies[i].y, zombies[i].size, zombies[i].size);
  }
}

// ---------------- COLLISION ----------------
function checkCollisions() {
  for (let i = 0; i < zombies.length; i++) {
    let d = dist(player.x, player.y, zombies[i].x, zombies[i].y);

    if (d < player.size / 2 + zombies[i].size / 2) {
      gameOver = true;

      // Save high score
      if (floor(score) > highScore) {
        highScore = floor(score);
      }
    }
  }
}

// ---------------- SCORE ----------------
function displayScore() {
  fill(255);
  textSize(24);
  text("Score: " + floor(score), 50, 45);
  text("High Score: " + highScore, 75, 80);
}

// ---------------- GAME OVER ----------------
function displayGameOver() {
  background(0);

  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(50);
  text("GAME OVER", width / 2, height / 2 - 40);

  fill(255);
  textSize(30);
  text("Final Score: " + floor(score), width / 2, height / 2 + 20);

  textSize(24);
  text("High Score: " + highScore, width / 2, height / 2 + 60);

  textSize(20);
  text("Press R to Restart", width / 2, height / 2 + 110);
}

// ---------------- RESTART ----------------
function keyPressed() {
  if (gameOver && (key === 'r' || key === 'R')) {
    initializeGame();
  }
}