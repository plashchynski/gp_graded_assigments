// Task description: https://www.coursera.org/learn/uol-graphics-programming/supplement/GoUUj/webcam-piano
// Step 6: I've extended the sketch by playing the active notes using the p5js Synth module.
// Step 6: I've added a Note class (Note.js) to represent a note on the grid.

let video;
// Step 1: Create a variable to store the previous image
let prevImg;
let diffImg;
let currImg;
let thresholdSlider;
let threshold;
let grid;

function setup() {
  createCanvas(640 * 2, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.hide();

  thresholdSlider = createSlider(0, 255, 50);
  thresholdSlider.position(20, 20);

  // Step 6: Create a new synth
  const synth = new p5.MonoSynth();

  // Step 3: Create a new grid
  grid = new Grid(640, 480, synth);
}

function draw() {
  background(0);
  filter(INVERT);
  image(video, 0, 0);

  currImg = createImage(video.width, video.height);
  currImg.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);

  // Step 5: Resize the current image
  currImg.resize(currImg.width / 4, currImg.height / 4);

  // Step 4: BLUR filter on the current image
  currImg.filter(BLUR, 3);

  diffImg = createImage(video.width / 4, video.height / 4);
  diffImg.loadPixels();

  threshold = thresholdSlider.value();

  if (typeof prevImg !== 'undefined') {
    prevImg.loadPixels();
    currImg.loadPixels();
    for (let x = 0; x < currImg.width; x += 1) {
      for (let y = 0; y < currImg.height; y += 1) {
        const index = (x + (y * currImg.width)) * 4;
        const redSource = currImg.pixels[index + 0];
        const greenSource = currImg.pixels[index + 1];
        const blueSource = currImg.pixels[index + 2];

        const redBack = prevImg.pixels[index + 0];
        const greenBack = prevImg.pixels[index + 1];
        const blueBack = prevImg.pixels[index + 2];

        const d = dist(redSource, greenSource, blueSource, redBack, greenBack, blueBack);

        // Activate the pixel if the distance is above the threshold
        if (d > threshold) {
          diffImg.pixels[index + 0] = 0;
          diffImg.pixels[index + 1] = 0;
          diffImg.pixels[index + 2] = 0;
          diffImg.pixels[index + 3] = 255;
        } else {
          diffImg.pixels[index + 0] = 255;
          diffImg.pixels[index + 1] = 255;
          diffImg.pixels[index + 2] = 255;
          diffImg.pixels[index + 3] = 255;
        }
      }
    }
  }
  diffImg.updatePixels();
  image(diffImg, 640, 0);

  noFill();
  stroke(255);
  text(threshold, 160, 35);

  // Step 2: Save the current image as the previous image
  prevImg = createImage(currImg.width, currImg.height);
  prevImg.copy(currImg, 0, 0, currImg.width, currImg.height, 0, 0, currImg.width, currImg.height);

  // Step 3: Draw the grid
  grid.run(diffImg);
}
