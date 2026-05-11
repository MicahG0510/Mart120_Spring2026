let player;
let obstacles = [];
let clickObstacle = null;
let exitZone;

function setup() {
  createCanvas(600, 400);
  createPlayer();
  createObstacles();
  createExit();
}

// ---------------- DRAW ----------------
function draw() {
  background(220);

  drawBorders();
  movePlayer();
  drawPlayer();

  moveObstacle1();
  moveObstacle2();
  drawObstacles();

  drawMouseObstacle();
  drawExit();
  checkWin();
}

// ---------------- PLAYER ----------------
function createPlayer() {
  player = {
    x: 50,
    y: 200,
    size: 20,
    speed: 3
  };
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= player.speed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.x += player.speed;
  }

  if (keyIsDown(UP_ARROW)) {
    player.y -= player.speed;
  } else if (keyIsDown(DOWN_ARROW)) {
    player.y += player.speed;
  }

  // Wrap
  if (player.x > width) player.x = 0;
  else if (player.x < 0) player.x = width;

  if (player.y > height) player.y = 0;
  else if (player.y < 0) player.y = height;
}

function drawPlayer() {
  fill(0);
  ellipse(player.x, player.y, player.size);
}

// ---------------- OBSTACLES ----------------
function createObstacles() {
  obstacles.push({ x: 150, y: 100, size: 30, color: 'red' });
  obstacles.push({ x: 400, y: 250, size: 50, color: 'blue' });
}

function moveObstacle1() {
  let o = obstacles[0];
  o.x += random(-1, 1);
  o.y += random(-1, 1);

  if (o.x > width) o.x = 0;
  if (o.x < 0) o.x = width;
  if (o.y > height) o.y = 0;
  if (o.y < 0) o.y = height;
}

function moveObstacle2() {
  let o = obstacles[1];
  o.x += random(-1, 1);
  o.y += random(-1, 1);

  if (o.x > width) o.x = 0;
  if (o.x < 0) o.x = width;
  if (o.y > height) o.y = 0;
  if (o.y < 0) o.y = height;
}

function drawObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    fill(obstacles[i].color);
    rect(obstacles[i].x, obstacles[i].y, obstacles[i].size);
  }
}

// ---------------- MOUSE OBSTACLE ----------------
function mousePressed() {
  createMouseObstacle();
}

function createMouseObstacle() {
  clickObstacle = {
    x: mouseX,
    y: mouseY
  };
}

function drawMouseObstacle() {
  if (clickObstacle !== null) {
    fill(255, 165, 0);
    rect(clickObstacle.x, clickObstacle.y, 40, 40);
  }
}

// ---------------- BORDERS ----------------
function drawBorders() {
  stroke(0);
  noFill();
  rect(0, 0, width, height);
}

// ---------------- EXIT ----------------
function createExit() {
  exitZone = {
    x: width - 40,
    y: height / 2 - 25,
    w: 30,
    h: 50
  };
}

function drawExit() {
  fill(0, 255, 0);
  rect(exitZone.x, exitZone.y, exitZone.w, exitZone.h);
}

// ---------------- WIN ----------------
function checkWin() {
  if (
    player.x > exitZone.x &&
    player.x < exitZone.x + exitZone.w &&
    player.y > exitZone.y &&
    player.y < exitZone.y + exitZone.h
  ) {
    displayWinMessage();
  }
}

function displayWinMessage() {
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("You Win!", width / 2, height / 2);
}