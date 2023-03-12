// Task description: https://www.coursera.org/learn/uol-graphics-programming/supplement/QDDOb/average-face

var imgs = [];
var avgImg;
var numOfImages = 30;
let imageWidth;
let imageHeight;
// Step 7: A random image to display
var randomImage;

function preload() {
  // Step 1: Load all images
  for (let i = 0; i < numOfImages; i += 1) {
    const filename = `assets/${i}.jpg`;
    imgs[i] = loadImage(filename);
  }
}

function setup() {
  imageWidth = imgs[0].width;
  imageHeight = imgs[0].height;

  // Step 2: Create a canvas with the width*2 as the first images
  createCanvas(imageWidth * 2, imageHeight);
  pixelDensity(1);

  // Step 3: Create a graphics object to store the average image
  avgImg = createGraphics(imageWidth, imageHeight);

  // Step 7: Choose a random image to display
  randomImage = random(imgs);
}

function draw() {
  background(125);

  // Step 2: Draw the first image
  // Step 7: Draw the random image, not just the first image
  image(randomImage, 0, 0);

  // Step 4: Load the pixels of all images
  imgs.forEach((img) => {
    img.loadPixels();
  });

  avgImg.loadPixels();

  // Step 5: Loop through all pixels
  for (let y = 0; y < imageHeight; y += 1) {
    for (let x = 0; x < imageWidth; x += 1) {
      // Step 5: Conversion from 2D to 1D coordinates
      const index = (y * imageWidth + x) * 4;

      // Step 6: Calculate the sum of pixel values for each image
      let sumR = 0;
      let sumG = 0;
      let sumB = 0;
      let sumAlpha = 0;

      imgs.forEach((img) => {
        sumR += img.pixels[index];
        sumG += img.pixels[index + 1];
        sumB += img.pixels[index + 2];
        sumAlpha += img.pixels[index + 3];
      });

      // Step 6: Calculate the average of pixel values and set it to the average image
      avgImg.pixels[index] = sumR / numOfImages;
      avgImg.pixels[index + 1] = sumG / numOfImages;
      avgImg.pixels[index + 2] = sumB / numOfImages;
      avgImg.pixels[index + 3] = sumAlpha / numOfImages;
    }
  }

  // Step 6: Update the pixels of the average image
  avgImg.updatePixels();

  // Step 7: Draw the average image
  image(avgImg, imageWidth, 0);

  // Step 5: Stop the draw loop
  noLoop();
}

// Step 7: Add a keyPressed event to choose a new random image to display
function keyPressed() {
  randomImage = random(imgs);
  loop();
}
