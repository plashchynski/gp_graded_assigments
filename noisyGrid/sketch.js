// Task description: https://www.coursera.org/learn/uol-graphics-programming/supplement/wmsjz/noisy-grid

/* p5js gloabl functions and variable for ESLint to ignore: */
/* global color, background, createCanvas, frameCount, fill, noise, noStroke, mouseX, width */
/* global rect, lerpColor, vertex, rotate, beginShape, endShape, translate, CLOSE, map,  */

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "setup|draw|keyPressed|keyTyped|mouseReleased" }] */

const stepSize = 20;

function colorGrid() {
  const green = color(0, 255, 0);
  const red = color(255, 0, 0);
  // const factor = 0.01;

  for (let x = 0; x < 25; x += 1) {
    for (let y = 0; y < 25; y += 1) {
      // Step 3: Use the mouse position to control the noise factor
      const factor = 0.02;
      const speedFactor = map(width - mouseX, 0, width, 0.01, 0.05, true);

      const t = noise(x * factor, y * factor, frameCount * speedFactor);
      const c = lerpColor(green, red, t);

      fill(c);
      noStroke();
      rect(x * stepSize, y * stepSize, stepSize, stepSize);
    }
  }
}

function compassGrid() {
  for (let x = 0; x < 25; x += 1) {
    for (let y = 0; y < 25; y += 1) {
      push();

      // translate to the center of the cell
      translate(x * stepSize + stepSize / 2, y * stepSize + stepSize / 2);

      const t = noise(x * 0.02, y * 0.02, frameCount * 0.01);
      const angle = map(t, 0, 1, 0, 720);

      angleMode(DEGREES);
      rotate(angle);

      stroke('black');
      strokeWeight(3);

      line(0, 0, 0, -stepSize);
      pop();
    }
  }
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(125);

  colorGrid();
  compassGrid();
}
