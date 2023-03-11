// Task description: https://www.coursera.org/learn/uol-graphics-programming/supplement/pUC9c/3d-sine-games

// Step 5: Add a new array to store the locations of the confetti
const confLocs = [];

// The initial angle of the confetti
const confTheta = [];

let radiusSlider;

function setup() {
  createCanvas(900, 800, WEBGL);

  // Step 7: Add a slider to control the radius of the camera
  radiusSlider = createSlider(1000, 2000, 1130);
  radiusSlider.position(10, 20);

  FallingSpeedSlider = createSlider(1, 3, 1, 0.1);
  FallingSpeedSlider.position(10, 40);

  // Step 5: Add 200 confetti to the array
  for (let i = 0; i < 500; i += 1) {
    // Step 5: Add a random 3D vectors to confLocs
    const x = random(-500, 500);
    const y = random(-800, 0);
    const z = random(-500, 500);

    confLocs.push(createVector(x, y, z));

    // Step 5: Add a random angle to the confTheta
    confTheta.push(random(0, 360));
  }
}

// Step 5: Draw the confetti
function confetti() {
  for (let i = 0; i < confLocs.length; i += 1) {
    const confLoc = confLocs[i];

    push();
    noStroke();
    translate(confLoc.x, confLoc.y, confLoc.z);

    // Step 7: Make the confetti rotating more natural by rotating in all directions
    rotateX(confTheta[i]);
    rotateY(confTheta[i]);
    rotateZ(confTheta[i]);

    plane(15, 15);
    pop();

    // Step 6: Make the confetti fall
    confLoc.y += FallingSpeedSlider.value();
    confTheta[i] += 10 * FallingSpeedSlider.value();

    // Step 6: Reset the confetti when it falls off the screen
    if (confLoc.y > 0) {
      confLoc.y = -800;
    }
  }
}

function draw() {
  background(125);
  angleMode(DEGREES);

  // Step 2: Set material to normal
  // This will be overwritten by Step 7
  normalMaterial();

  // Step 2: Set stroke to zero
  stroke(0);

  // Step 2: Set stroke weight to 2 to better distinguish the boxes
  strokeWeight(2);

  // Step 7: Set the light
  ambientLight(100);

  /**
   * Step 4: Get the camera to fly in a circle around the structure
   * In Step 1 we set the camera to a fixed position at x=800, y=-600, z=800
   * Now we want to move the camera around the center of the structure
   * So we need to know the original distance to the center to
   * calculate the radius of rotation:
   * radius = sqrt(x^2 + z^2) = sqrt(800^2 + 800^2) = 1130
   */
  // Step 7: Get the radius from the slider
  const radius = radiusSlider.value();
  const zLoc = radius * sin(frameCount);
  const xLoc = radius * cos(frameCount);

  // Step 1: Set the camera
  // camera(800, -600, 800, 0, 0, 0);
  // Step 4: rotate camera around the center
  camera(xLoc, -600, zLoc, 0, 0, 0);

  // Step 1: Draw the grid
  for (let x = -400; x < 400; x += 50) {
    for (let z = -400; z < 400; z += 50) {
      // Step 3: Calculate the distance from the center and set the height of the boxes
      const distance = dist(x, 0, z, 0, 0, 0);
      // modulate length from 100 to 300 with sin:
      const length = 200 + sin(distance + frameCount) * 100;

      push();
      // Step 7: Make the boxes blue, shiny, and a half transparent:
      specularMaterial(52, 155, 235, 100);
      translate(x, 0, z);
      box(50, length, 50);
      pop();
    }
  }

  confetti();
}
