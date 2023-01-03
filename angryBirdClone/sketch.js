// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

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
var gameOver = false;
////////////////////////////////////////////////////////////
function setup() {
  canvas = createCanvas(1000, 600);

  engine = Engine.create();  // create an engine

  setupGround();

  setupPropeller();

  setupTower();

  setupSlingshot();

  setupMouseInteraction();

  setupCountdown();
}
////////////////////////////////////////////////////////////
function draw() {
  background(0);

  if (gameOver){
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

// Step 8: Countdown timer
function setupCountdown(){
  let date = new Date();
  countdownStop = round(date.getTime() / 1000)+60; // 60 seconds
}

function drawCoundown(){
  fill(255);
  textSize(32);

  let date = new Date();
  let countdown = countdownStop - round(date.getTime() / 1000);
  gameOver = true;
  if (countdown < 0){
    gameOver = true;
  } else {
    text(countdown, 10, 30);
  }
}

function gameOver(){
  push();
  fill(255);
  textSize(32);
  translate(width/2, height/2);
  text("Game Over", -10, 0);
  pop();
}

function win(){

}

function restartGame(){
  //remove all birds from the world
  for (var i=0; i<birds.length; i++){
    removeFromWorld(birds[i]);
  }
  birds = [];

  setupCountdown();
}

////////////////////////////////////////////////////////////
// Step 2. Use arrow keys to control propeller
function keyPressed(){
  if (keyCode == LEFT_ARROW){
    angleSpeed += 0.01;
  }
  else if (keyCode == RIGHT_ARROW){
    angleSpeed -= 0.01;
  }
}
////////////////////////////////////////////////////////////
function keyTyped(){
  //if 'b' create a new bird to use with propeller
  if (key==='b'){
    setupBird();
  }

  //if 'r' reset the slingshot
  if (key==='r'){
    removeFromWorld(slingshotBird);
    removeFromWorld(slingshotConstraint);
    setupSlingshot();
  }
}

//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased(){
  setTimeout(() => {
    slingshotConstraint.bodyB = null;
    slingshotConstraint.pointA = { x: 0, y: 0 };
  }, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body){
  var pos = body.position;
  return (pos.y > height || pos.x<0 || pos.x>width);
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
  World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
  push();
  var offsetA = constraint.pointA;
  var posA = {x:0, y:0};
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = {x:0, y:0};
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  strokeWeight(5);
  stroke(255);
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
  pop();
}
