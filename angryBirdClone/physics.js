// Exports from Matter.js:
/* global Composites, Matter, World, Bodies, Constraint, Mouse, MouseConstraint */

// Exports from p5.js:
/* global mouseX, mouseY, width, color, random, canvas, pixelDensity, fill, push, pop */

// Exports from sketch.js:
/* global ground:writable, propeller:writable, angle:writable, birds:writable, tower:writable, slingshotConstraint:writable, slingshotBird:writable */
/* global isOffScreen, removeFromWorld, angleSpeed, engine, drawVertices, drawConstraint */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "setupSlingshot|setupMouseInteraction|drawSlingshot|setupGround|drawGround|drawTower|setupTower|setupPropeller|drawBirds|drawPropeller|setupBird" }] */

function setupGround() {
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true,
    angle: 0,
  });
  World.add(engine.world, [ground]);
}

function drawGround() {
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}

// Step 1
function setupPropeller() {
  propeller = Bodies.rectangle(150, 480, 200, 15, {
    isStatic: true,
    angle,
  });
  World.add(engine.world, [propeller]);
}

// Step 2: updates and draws the propeller
function drawPropeller() {
  push();
  Matter.Body.setAngle(propeller, angle);
  propeller.angularVelocity = angleSpeed;
  angle += angleSpeed;
  fill(255);
  drawVertices(propeller.vertices);
  pop();
}

function setupBird() {
  const bird = Bodies.circle(mouseX, mouseY, 20, {
    friction: 0,
    restitution: 0.95,
  });
  Matter.Body.setMass(bird, bird.mass * 10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}

// Step 3: draw birds
function drawBirds() {
  push();

  for (let i = 0; i < birds.length; i += 1) {
    if (isOffScreen(birds[i])) {
      removeFromWorld(birds[i]);
      birds.splice(i, 1);
      i -= 1;
    }
    fill('red');
    drawVertices(birds[i].vertices);
  }
  pop();
}

// Step 4 creates a tower of boxes
function setupTower() {
  const boxHeight = 80;
  const boxWidth = 80;
  const rows = 6;
  const columns = 3;

  tower = Composites.stack(
    width - boxWidth * (columns + 1),
    ground.bounds.min.y - boxWidth * rows,
    columns,
    rows,
    0,
    0,
    (x, y) => {
      const box = Bodies.rectangle(x, y, boxWidth, boxHeight);
      box.color = color(0, random(100, 255), 0);
      return box;
    },
  );
  World.add(engine.world, [tower]);
}

// Step 5 draws tower of boxes
function drawTower() {
  push();
  for (let i = 0; i < tower.bodies.length; i += 1) {
    const box = tower.bodies[i];
    fill(box.color);
    drawVertices(box.vertices);
  }
  pop();
}

// Step 6
function setupSlingshot() {
  slingshotBird = Bodies.circle(200, 200, 20, { friction: 0, restitution: 0.95 });
  Matter.Body.setMass(slingshotBird, slingshotBird.mass * 10);

  slingshotConstraint = Constraint.create({
    pointA: { x: 200, y: 200 },
    bodyB: slingshotBird,
    stiffness: 0.01,
    damping: 0.0001,
  });
  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}

// Step 7 draws slingshot bird and its constraint
function drawSlingshot() {
  push();
  fill('orange');
  drawVertices(slingshotBird.vertices);
  fill(255);
  drawConstraint(slingshotConstraint);
  pop();
}

function setupMouseInteraction() {
  const mouse = Mouse.create(canvas.elt);
  const mouseParams = {
    mouse,
    constraint: { stiffness: 0.05 },
  };

  const mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
