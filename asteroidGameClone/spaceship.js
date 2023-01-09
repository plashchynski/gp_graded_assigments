/* p5js gloabl functions and variable for ESLint to ignore: */
/* global triangle, keyIsDown, textSize, text, LEFT_ARROW, RIGHT_ARROW, UP_ARROW,
          DOWN_ARROW, createVector, fill, width, height */

// Class to track and display a spaceship
class Spaceship {
  constructor() {
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width / 2, height / 2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
    this.hits = 0;
  }

  // draws and updates the spaceship
  run() {
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  // draws the spaceship
  draw() {
    fill(125);
    triangle(
      this.location.x - this.size / 2,
      this.location.y + this.size / 2,
      this.location.x + this.size / 2,
      this.location.y + this.size / 2,
      this.location.x,
      this.location.y - this.size / 2,
    );
    textSize(32);
    text(`Score: ${this.hits}`, 10, 30);
  }

  // Step 3: update the velocity and location of the spaceship
  move() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  interaction() {
    // Step 2: check if array key is pressed and apply a corresponding force to spaceship
    // Move the spaceship left if the left arrow key is pressed
    if (keyIsDown(LEFT_ARROW)) {
      this.applyForce(createVector(-0.1, 0));
    }

    // Move the spaceship right if the right arrow key is pressed
    if (keyIsDown(RIGHT_ARROW)) {
      this.applyForce(createVector(0.1, 0));
    }

    // Move the spaceship up if the up arrow key is pressed
    if (keyIsDown(UP_ARROW)) {
      this.applyForce(createVector(0, -0.1));
    }

    // Move the spaceship down if the down arrow key is pressed
    if (keyIsDown(DOWN_ARROW)) {
      this.applyForce(createVector(0, 0.1));
    }
  }

  // fires a bullet
  fire() {
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  // If spaceship leaves the screen, wrap it around to the other side
  edges() {
    if (this.location.x < 0) {
      this.location.x = width;
    } else if (this.location.x > width) {
      this.location.x = 0;
    } else if (this.location.y < 0) {
      this.location.y = height;
    } else if (this.location.y > height) {
      this.location.y = 0;
    }
  }

  // Step 9: add a function to apply gravity and friction to the spaceship
  setNearEarth() {
    const gravity = createVector(0, 0.05);
    this.applyForce(gravity);

    const friction = this.velocity.copy();
    friction.mult(-1);
    friction.div(30);
    this.applyForce(friction);
  }

  // Step 11: Count how many times the spaceship hits an asteroid
  recordHit() {
    this.hits += 1;
  }
}
