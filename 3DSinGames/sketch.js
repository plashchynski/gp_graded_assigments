// Task description: https://www.coursera.org/learn/uol-graphics-programming/supplement/pUC9c/3d-sine-games

// Step 5: Add a new array to store the locations of the confetti
const confLocs = [];

// The initial angle of the confetti
const confTheta = [];

function setup() {
  createCanvas(900, 800, WEBGL);

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
    rotateY(confTheta[i]);
    rotateZ(confTheta[i]);
    rotateX(confTheta[i]);
    plane(15, 15);
    pop();

    // Step 6: Make the confetti fall
    confLoc.y += 1;
    confTheta[i] += 10;

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
  normalMaterial();

  // Step 2: Set stroke to zero
  stroke(0);

  // Step 2: Set stroke weight to 2 to better distinguish the boxes
  strokeWeight(2);

  // Step 4: Get the camera to fly in a circle around the structure
  const xLoc = cos(frameCount) * 1000;
  const zLoc = sin(frameCount) * 1000;

  // Step 1: Set the camera
  camera(xLoc, -600, zLoc, 0, 0, 0);

  // Step 1: Draw the grid
  for (let x = -400; x < 400; x += 50) {
    for (let z = -400; z < 400; z += 50) {
      // Step 3: Calculate the distance from the center and set the height of the boxes
      const distance = dist(x, 0, z, 0, 0, 0);
      const length = 200 + sin(distance + frameCount) * 100;

      push();
      translate(x, 0, z);
      box(50, length, 50);
      pop();
    }
  }

  confetti();
}
