// Task description: https://www.coursera.org/learn/uol-graphics-programming/supplement/QDDOb/average-face

var imgs = [];
var avgImg;
var numOfImages = 30;
let imageWidth;
let imageHeight;

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

  // Step 7: Choose a random image to display by moving it to the front of the array
  // this is needed to make the second part of the task easier and more efficient
  imgs = randomElementToFront(imgs);
}

function draw() {
  background(125);

  // Step 2: Draw the first image
  // Step 7: It will draw the random image, not just the first image from the original array
  image(imgs[0], 0, 0);

  // Step 7: Calculate the number of images to use to calculate the average image
  // based on the mouse position
  const numOfImagesUsed = int(map(mouseX, 0, width, 1, imgs.length, true));
  const usedImages = imgs.slice(0, numOfImagesUsed);

  // Step 4: Load the pixels of all images
  usedImages.forEach((img) => img.loadPixels());

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

      usedImages.forEach((img) => {
        sumR += img.pixels[index];
        sumG += img.pixels[index + 1];
        sumB += img.pixels[index + 2];
        sumAlpha += img.pixels[index + 3];
      });

      // Step 6: Calculate the average of pixel values and set it to the average image
      avgImg.pixels[index] = sumR / numOfImagesUsed;
      avgImg.pixels[index + 1] = sumG / numOfImagesUsed;
      avgImg.pixels[index + 2] = sumB / numOfImagesUsed;
      avgImg.pixels[index + 3] = sumAlpha / numOfImagesUsed;
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
  imgs = randomElementToFront(imgs);
  loop();
}

// Step 7: Redraw the average image when the mouse is moved
function mouseMoved() {
  loop();
}

/**
 * Move the random element of the array to the front
 * This is needed to display a random image for Step 7
 *
 * @param {Array} array
 * @returns {Array}
 */
function randomElementToFront(array) {
  const randomIndex = int(random(0, array.length));
  array.unshift(array.splice(randomIndex, 1)[0]);

  return(array);
}

