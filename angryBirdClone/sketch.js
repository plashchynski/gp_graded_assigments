// Task description: https://www.coursera.org/learn/uol-graphics-programming/supplement/MoMwA/graded-assignment-angry-birds-clone
// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

/* p5js gloabl functions and variable for ESLint to ignore: */
/* global push, pop, textSize, text, background, createCanvas, strokeWeight, fill, stroke, round */
/* global line, translate, width, height, beginShape, endShape, keyCode, key */
/* global LEFT_ARROW, RIGHT_ARROW, vertex, CLOSE */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "setup|draw|keyPressed|keyTyped|mouseReleased" }] */
/* global Matter */

// Exports from physics.js:
/* global drawGround, drawPropeller, drawTower, drawBirds, drawSlingshot, setupBird */
/* global setupGround, setupPropeller, setupTower, setupSlingshot, setupMouseInteraction */

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;
var Composites = Matter.Composites;

var engine;
var propeller;
var boxes = [];
var birds = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle=0;
var angleSpeed=0;
var canvas;
var tower;
var countdownStart;
let countdownStop;

// HELPER FUNCTIONS
// If mouse is released destroy slingshot constraint so that slingshot bird can fly off
function mouseReleased() {
  setTimeout(() => {
    slingshotConstraint.bodyB = null;
    slingshotConstraint.pointA = { x: 0, y: 0 };
  }, 100);
}

// Tells you if a body is off-screen
function isOffScreen(body) {
  const pos = body.position;
  return (pos.y > height || pos.x < 0 || pos.x > width);
}

// Removes a body from the physics world
function removeFromWorld(body) {
  World.remove(engine.world, body);
}

// A function to draw a Matter.js body using vertices
function drawVertices(vertices) {
  beginShape();
  for (let i = 0; i < vertices.length; i += 1) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}

// A function to draw a connecting line between two bodies
function drawConstraint(constraint) {
  push();

  const offsetA = constraint.pointA;
  let posA = { x: 0, y: 0 };
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }

  const offsetB = constraint.pointB;
  let posB = { x: 0, y: 0 };
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }

  strokeWeight(5);
  stroke(255);
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y,
  );

  pop();
}

// Step 8: Countdown timer
function setupCountdown() {
  const date = new Date();
  countdownStop = round(date.getTime() / 1000) + 60; // 60 seconds
}

function secondsLeft() {
  const date = new Date();
  return countdownStop - round(date.getTime() / 1000);
}

function drawCoundown() {
  fill(255);
  textSize(32);
  text(secondsLeft(), 10, 30);
}

/**
 * Step 8 - Display game over splash screen
 */
function gameOver() {
  push();
  fill(255);
  translate(width / 2, height / 2);

  textAlign(CENTER);
  textSize(32);
  text('Game Over', 0, 0);

  textSize(30);
  text('Refresh the page to start again', 0, 70);
  pop();

  noLoop();
}

/**
 * Step 8 - Display winning splash screen
 */
function Win() {
  push();
  fill(255);
  translate(width / 2, height / 2);

  textSize(80);
  textAlign(CENTER);
  text('You win!', 0, 0);

  textSize(30);
  text('Refresh the page to start again', 0, 70);

  pop();

  noLoop();
}

// Step 2. Use arrow keys to control propeller
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    angleSpeed += 0.01;
  } else if (keyCode === RIGHT_ARROW) {
    angleSpeed -= 0.01;
  }
}

/**
 * a function is called when key is typed
 */
function keyTyped() {
  // if 'b' create a new bird to use with propeller
  if (key === 'b') {
    setupBird();
  }

  // if 'r' reset the slingshot
  if (key === 'r') {
    removeFromWorld(slingshotBird);
    removeFromWorld(slingshotConstraint);
    setupSlingshot();
  }
}

function setup() {
  canvas = createCanvas(1000, 600);

  engine = Engine.create(); // create an engine

  setupGround();
  setupPropeller();
  setupTower();
  setupSlingshot();
  setupMouseInteraction();
  setupCountdown();
}

function draw() {
  background(0);

  // If all the boxes are off-screen, you win!
  if (tower.bodies.every((body) => isOffScreen(body))) {
    Win();
    return;
  }

  // If secondsLeft() is 0, game over
  if (secondsLeft() <= 0) {
    gameOver();
    return;
  }

  Engine.update(engine);

  drawGround();
  drawPropeller();
  drawTower();
  drawBirds();
  drawSlingshot();
  drawCoundown();
}
