// Task description: https://www.coursera.org/learn/uol-graphics-programming/supplement/zGGMg/your-own-instagram-filter
// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg

var imgIn;
var matrix = [
  [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
  [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
  [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
  [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
  [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
  [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
  [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
  [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];

function preload() {
  imgIn = loadImage("assets/husky.jpg");
}

function setup() {
  createCanvas((imgIn.width * 2), imgIn.height);
}

function draw() {
  background(125);
  image(imgIn, 0, 0);
  image(earlyBirdFilter(imgIn), imgIn.width, 0);
  noLoop();
}

function mousePressed() {
  loop();
}

// Step 1: Implementing the Sepia image filter
// Takes an image as input and returns a filtered image
function sepiaFilter(img) {
  img.loadPixels();
  // Loop through all pixels
  for (let i = 0; i < img.pixels.length; i += 4) {
    const r = img.pixels[i];
    const g = img.pixels[i + 1];
    const b = img.pixels[i + 2];
    const a = img.pixels[i + 3]; // alpha channel

    // Update pixel values using the formula for the Sepia filter
    // provided in the task description
    img.pixels[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);
    img.pixels[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
    img.pixels[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);

    // left the alpha channel unchanged
    img.pixels[i + 3] = a;
  }
  img.updatePixels();
  return img;
}

// Step 2: Implementing the vignetting (dark corners) image filter
// Takes an image as input and returns a filtered image
function darkCorners(img) {
  img.loadPixels();

  // Calculate the maximum possible distance between the center of the image
  // and any of its corners
  const maxDistFromCenter = dist(0, 0, img.width / 2, img.height / 2);

  // Loop through all pixels
  for (let i = 0; i < img.pixels.length; i += 4) {
    const r = img.pixels[i];
    const g = img.pixels[i + 1];
    const b = img.pixels[i + 2];
    const a = img.pixels[i + 3]; // alpha channel

    const x = (i / 4) % img.width;
    const y = ((i / 4) - x) / img.width;

    // Calculate the distance of the current pixel from the center of the image
    const distFromCenter = dist(x, y, img.width / 2, img.height / 2);

    // default coefficient for changing the pixel values
    // (no change)
    let dynLum = 1;

    // Set the coefficient based on the distance of the current pixel
    // from the center of the image
    if (distFromCenter >= 300 && distFromCenter < 450) {
      dynLum = map(distFromCenter, 300, 449, 1, 0.4);
    } else if (distFromCenter >= 450) {
      dynLum = map(distFromCenter, 450, maxDistFromCenter, 0.4, 0);
    }

    // Update pixel values using the formula for the vignetting filter
    // provided in the task description
    img.pixels[i] = constrain(r * dynLum, 0, 255);
    img.pixels[i + 1] = constrain(g * dynLum, 0, 255);
    img.pixels[i + 2] = constrain(b * dynLum, 0, 255);

    // left the alpha channel unchanged
    img.pixels[i + 3] = a;
  }
  img.updatePixels();
  return img;
}

// Convolution function taken from the course material
function convolution(x, y, matrix, matrixSize, img) {
  var totalRed = 0;
  var totalGreen = 0;
  var totalBlue = 0;

  var offset = floor(matrixSize / 2);

  for (var i = 0; i < matrixSize; i++) {
    for (var j = 0; j < matrixSize; j++) {
      var xloc = x + i - offset;
      var yloc = y + j - offset;

      var index = (img.width * yloc + xloc) * 4;

      index = constrain(index, 0, img.pixels.length - 1);

      totalRed += img.pixels[index + 0] * matrix[i][j];
      totalGreen += img.pixels[index + 1] * matrix[i][j];
      totalBlue += img.pixels[index + 2] * matrix[i][j];
    }
  }

  return [totalRed, totalGreen, totalBlue];
}

// Step 3: Implementing the radial blur image filter
// Takes an image as input and returns a filtered image
function radialBlurFilter(img) {
  var imgOut = createImage(img.width, img.height);
  var matrixSize = matrix.length;

  img.loadPixels();
  imgOut.loadPixels();

  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var i = (y * img.width + x) * 4;

      const r = img.pixels[i];
      const g = img.pixels[i + 1];
      const b = img.pixels[i + 2];
      const a = img.pixels[i + 3]; // alpha channel

      var c = convolution(x, y, matrix, matrixSize, img);

      let dynBlur = constrain(map(dist(x, y, mouseX, mouseY), 100, 300, 0, 1), 0, 1);

      imgOut.pixels[i + 0] = c[0] * dynBlur + r * (1 - dynBlur);
      imgOut.pixels[i + 1] = c[1] * dynBlur + g * (1 - dynBlur);
      imgOut.pixels[i + 2] = c[2] * dynBlur + b * (1 - dynBlur);
      imgOut.pixels[i + 3] = a;
    }
  }

  imgOut.updatePixels();
  return imgOut;
}

// Implementing the Early Bird image filter
// Takes an image as input and returns a filtered image
function earlyBirdFilter(img) {
  let resultImg = img.get();
  resultImg = sepiaFilter(resultImg);
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  // resultImg = borderFilter(resultImg)
  return resultImg;
}
