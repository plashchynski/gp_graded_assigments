// Task description: https://www.coursera.org/learn/uol-graphics-programming/supplement/Oau94/solar-system
/* p5js gloabl functions and variable for ESLint to ignore: */
/* global push, pop, background, rotate, radians, createCanvas, strokeWeight, fill, stroke */
/* global ellipse, line, color, translate, width, height, frameCount */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "setup|draw" }] */

let speed;

function setup() {
  createCanvas(900, 700);
}

function celestialObj(color, size) {
  strokeWeight(5);
  fill(color);
  stroke(0);
  ellipse(0, 0, size, size);
  line(0, 0, size / 2, 0);
}

function drawSun() {
  const sunColor = color(255, 150, 0);
  const sunSize = 200;

  push();
  rotate(radians(speed / 3)); // spin around its axis at speed/3 (Step 5)
  celestialObj(sunColor, sunSize);
  pop();
}

function drawEarth() {
  const earthOrbit = 300;
  const earthSize = 80;
  const earthColor = color('blue');

  rotate(radians(speed)); // rotate the earth around the sun at the "speed" velocity (Step 2)
  translate(earthOrbit, 0); // on the orbit of 300 pixels (Step 1)
  push();
  rotate(radians(speed)); // earth spin around its axis at velocity "speed" (Step 3)
  celestialObj(earthColor, earthSize); // draw the earth of color blue and size 80 (Step 1)
  pop();
}

function drawMoon() {
  rotate(radians(-speed * 2)); // rotate at velocity -speed*2 (Step 4)
  translate(100, 0); // on the orbit of 100 pixels (Step 4)
  celestialObj(color('white'), 30); // of color white and size 30 (Step 4)
}

function drawAsteroid() {
  // Asteroid (Step 6)
  rotate(radians(speed * 5)); // rotate around the moon at speed*5
  translate(30, 0); // on the orbit of 30 pixels
  rotate(radians(speed * 10)); // rotate around its axis at speed*10
  celestialObj(color('red'), 20); // of color red and size 20
}

function draw() {
  background(0);
  speed = frameCount;

  translate(width / 2, height / 2);

  push();

  drawSun();
  drawEarth();
  drawMoon();
  drawAsteroid();

  pop();
}
