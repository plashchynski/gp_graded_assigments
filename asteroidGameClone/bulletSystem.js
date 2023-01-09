/* p5js gloabl functions and variable for ESLint to ignore: */
/* global ellipse, createVector, fill */

// Class to track and display bullets
class BulletSystem {
  constructor() {
    this.bullets = [];
    this.velocity = new createVector(0, -5);
    this.diam = 10;
  }

  run() {
    this.move();
    this.draw();
    this.edges();
  }

  // adds a new bullet to the array
  fire(x, y) {
    this.bullets.push(createVector(x, y));
  }

  // draws all bullets
  draw() {
    fill(255);

    for (let i = 0; i < this.bullets.length; i += 1) {
      ellipse(this.bullets[i].x, this.bullets[i].y, this.diam, this.diam);
    }
  }

  // updates the location of all bullets
  move() {
    for (let i = 0; i < this.bullets.length; i += 1) {
      this.bullets[i].y += this.velocity.y;
    }
  }

  // Step 1: check if bullets leave the screen and remove them from the array
  edges() {
    for (let i = 0; i < this.bullets.length; i += 1) {
      if (this.bullets[i].y < 0) {
        this.bullets.splice(i, 1);
      }
    }
  }
}
