// Task description: https://www.coursera.org/learn/uol-graphics-programming/supplement/wmsjz/noisy-grid

/* p5js gloabl functions and variable for ESLint to ignore: */
/* global color, background, createCanvas, frameCount, fill, noise, noStroke, mouseX, width */
/* global rect, lerpColor, rotate, translate, map, angleMode, stroke, strokeWeight, DEGREES, 
          push, pop, line */

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "setup|draw|keyPressed|keyTyped|mouseReleased" }] */

const stepSize = 20;

function colorGrid() {
  for (let x = 0; x < 25; x += 1) {
    for (let y = 0; y < 25; y += 1) {
      const factor = 0.02;
      // Step 3: Use the mouse position to control the noise factor
      const speedFactor = map(width - mouseX, 0, width, 0.01, 0.05, true);

      const t = noise(x * factor, y * factor, frameCount * speedFactor);
      const c = lerpColor(color('green'), color('red'), t);

      fill(c);
      noStroke();
      rect(x * stepSize, y * stepSize, stepSize, stepSize);
    }
  }
}

function compassGrid() {
  // Step 4: Grid of compasses
  for (let x = 0; x < 25; x += 1) {
    for (let y = 0; y < 25; y += 1) {
      push();

      // translate to the center of the cell
      translate(x * stepSize + stepSize / 2, y * stepSize + stepSize / 2);

      // Step 5: Conroll angle of the compass with noise
      const factor = 0.02;
      // Step 6: Use the mouse position to control the noise factor
      const speedFactor = map(width - mouseX, 0, width, 0.01, 0.05, true);
      const t = noise(x * factor, y * factor, frameCount * speedFactor);
      const angle = map(t, 0, 1, 0, 720);

      angleMode(DEGREES);
      rotate(angle);

      // Step 7: Control the stroke color with noise
      const c = lerpColor(color('magenta'), color('blue'), t);
      stroke(c);

      // Step 7: Control the stroke weight with noise
      const weight = map(t, 0, 1, 1, 5);
      strokeWeight(weight);

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
