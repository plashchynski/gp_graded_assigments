// Step 6: Create a new Note class to store all relevant information about a note

/**
 * A class to store all relevant information about a note
 */
class Note {
  /**
   * Create a note
   *
   * @param {p5.Vector} position the position of the note
   */
  constructor(x, y, size) {
    this.state = 0;
    this.size = size;
    this.position = createVector(x + size / 2, y + size / 2);
  }

  /**
   * Make a note active, so it will be played
   */
  activate() {
    this.activeness = 1;
  }

  /**
   * Reduce the activeness of a note
   */
  reduceActiveness() {
    this.activeness -= 0.05;
    this.activeness = constrain(this.activeness, 0, 1);
  }

  /**
   * Get current activeness of a note
   * 
   * @returns {number} the activeness of a note
   */
  getActiveness() {
    return this.activeness;
  }

  /**
   * Get the size of a note
   *
   * @returns {number} the size of a note
   */
  getSize() {
    return this.size * this.getActiveness();
  }

  /**
   * Get the X position of a note
   *
   * @returns {number} the position of a note
   */
  getPositionX() {
    return this.position.x;
  }

  /**
   * Get the Y position of a note
   *
   * @returns {number} the position of a note
   */
  getPositionY() {
    return this.position.y;
  }

  /**
   * Check if a note is active
   *
   * @returns {boolean} true if the note is active, false otherwise
   */
  isActive() {
    return this.getActiveness() > 0;
  }
}
