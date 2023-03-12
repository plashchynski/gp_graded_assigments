// This conde was taken from the example code given in the class
// It was modified to fit the needs of the project

class Grid {
  constructor(width, height, synth) {
    this.synth = synth;
    this.gridWidth = width;
    this.gridHeight = height;

    this.noteSize = 40;
    this.notes = [];

    // initialize notePos with a 2D array of vectors of note positions on the grid
    // initialize noteState with a 2D array of note states (0 = off, 1 = on)
    for (let x = 0; x < width; x += this.noteSize) {
      const notesRow = [];
      for (let y = 0; y < height; y += this.noteSize) {
        const note = new Note(x, y, this.noteSize);
        notesRow.push(note);
      }
      this.notes.push(notesRow);
    }
  }

  run(img) {
    img.loadPixels();
    this.findActiveNotes(img);
    this.drawActiveNotes();
    this.playActiveNotes();
  }

  findActiveNotes(img) {
    for (let x = 0; x < img.width; x += 1) {
      for (let y = 0; y < img.height; y += 1) {
        // Convert 2D indexes to 1D
        const index = (x + (y * img.width)) * 4;
        const state = img.pixels[index];

        if (state === 0) { // activated pixels are black (0)
          // find which note to activate
          const screenX = map(x, 0, img.width, 0, this.gridWidth);
          const screenY = map(y, 0, img.height, 0, this.gridHeight);

          const i = int(screenX / this.noteSize);
          const j = int(screenY / this.noteSize);
          this.notes[i][j].activate();
        }
      }
    }
  }

  drawActiveNotes() {
    fill(255);
    noStroke();

    for (let i = 0; i < this.notes.length; i += 1) {
      for (let j = 0; j < this.notes[i].length; j += 1) {
        const note = this.notes[i][j];

        if (note.isActive()) {
          const alpha = this.notes[i][j].getActiveness() * 200;
          const c1 = color(255, 0, 0, alpha);
          const c2 = color(0, 255, 0, alpha);
          const mix = lerpColor(c1, c2, map(i, 0, this.notes.length, 0, 1));

          fill(mix);
          ellipse(note.getPositionX(), note.getPositionY(), note.getSize(), note.getSize());
        }

        note.reduceActiveness();
      }
    }
  }

  // Step 6: Play active notes
  playActiveNotes() {
    for (let i = 0; i < this.notes.length; i += 1) {
      for (let j = 0; j < this.notes[i].length; j += 1) {
        const note = this.notes[i][j];

        if (note.isActive()) { // note is active
          // Use X axis to control frequency
          // Use Y axis to control velocity
          const freq = map(i, 0, this.notes.length, 100, 1000);
          const velocity = map(j, 0, this.notes[i].length, 0, 1);

          // Play the note using p5js Synth module
          this.synth.play(freq, velocity);
        }
      }
    }
  }
}
