// Task description: https://www.coursera.org/learn/uol-graphics-programming/supplement/GoUUj/webcam-piano

var video;
// Step 1: Create a variable to store the previous image
var prevImg;
var diffImg;
var currImg;
var thresholdSlider;
var threshold;
var grid;

function setup() {
  createCanvas(640 * 2, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.hide();

  thresholdSlider = createSlider(0, 255, 50);
  thresholdSlider.position(20, 20);

  // Step 3: Create a new grid
  grid = new Grid(640, 480);
}

function draw() {
  background(0);
  image(video, 0, 0);

  currImg = createImage(video.width, video.height);
  currImg.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);

  // Step 5: Resize the current image
  currImg.resize(currImg.width / 4, currImg.height / 4);

  // Step 4: BLUR filter on the current image
  currImg.filter(BLUR, 3);

  diffImg = createImage(video.width / 4, video.height / 4);
  diffImg.loadPixels();
  // diffImg.resize(diffImg.width / 4, diffImg.height / 4);

  threshold = thresholdSlider.value();

  if (typeof prevImg !== 'undefined') {
    prevImg.loadPixels();
    currImg.loadPixels();
    for (let x = 0; x < currImg.width; x += 1) {
      for (let y = 0; y < currImg.height; y += 1) {
        var index = (x + (y * currImg.width)) * 4;
        var redSource = currImg.pixels[index + 0];
        var greenSource = currImg.pixels[index + 1];
        var blueSource = currImg.pixels[index + 2];

        var redBack = prevImg.pixels[index + 0];
        var greenBack = prevImg.pixels[index + 1];
        var blueBack = prevImg.pixels[index + 2];

        var d = dist(redSource, greenSource, blueSource, redBack, greenBack, blueBack);

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

// faster method for calculating color similarity which does not calculate root.
// Only needed if dist() runs slow
function distSquared(x1, y1, z1, x2, y2, z2) {
  var d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) + (z2-z1)*(z2-z1);
  return d;
}
