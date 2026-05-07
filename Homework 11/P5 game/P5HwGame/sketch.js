let player;
let obstacles = [];
let clickObstacle = null;
let exitZone;

function setup() {
  createCanvas(600, 400);

  // Player setup
  player = {
    x: 50,
    y: 200,
    size: 20,
    speed: 3
  };

  // Pre-made obstacles (different sizes/colors)
  obstacles.push({ x: 150, y: 100, size: 30, color: 'red' });
  obstacles.push({ x: 400, y: 250, size: 50, color: 'blue' });

  // Exit zone
  exitZone = {
    x: width -30,
    y: height / 2 - 25,
    w: 30,
    h: 50
  };
}

function draw() {
  background(220);

  //exit
  fill(0, 255, 0);
  rect(exitZone.x, exitZone.y, exitZone.w, exitZone.h);

  // Move player
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

  // Wrap player around screen
  if (player.x > width) {
    player.x = 0;
  } else if (player.x < 0) {
    player.x = width;
  }

  if (player.y > height) {
    player.y = 0;
  } else if (player.y < 0) {
    player.y = height;
  }

  // Draw player
  fill(0);
  ellipse(player.x, player.y, player.size);

  // Move obstacles randomly
  for (let i = 0; i < obstacles.length; i++) {
    let o = obstacles[i];

    o.x += random(-1, 1);
    o.y += random(-1, 1);

    // Wrap obstacles too
    if (o.x > width) o.x = 0;
    if (o.x < 0) o.x = width;
    if (o.y > height) o.y = 0;
    if (o.y < 0) o.y = height;

    fill(o.color);
    rect(o.x, o.y, o.size, o.size);
  }

  // Draw mouse-placed obstacle
  if (clickObstacle !== null) {
    fill(255, 165, 0);
    rect(clickObstacle.x, clickObstacle.y, 40, 40);
  }

  // Win condition using logical operators
  if (
    player.x > exitZone.x &&
    player.x < exitZone.x + exitZone.w &&
    player.y > exitZone.y &&
    player.y < exitZone.y + exitZone.h
  ) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2, height / 2);
  }
}

// Mouse click to place obstacle
function mousePressed() {
  clickObstacle = {
    x: mouseX,
    y: mouseY
  };
}