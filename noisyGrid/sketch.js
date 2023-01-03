var stepSize = 20;

function setup () {
  createCanvas(500, 500)
}
///////////////////////////////////////////////////////////////////////
function draw () {
  background(125)

  colorGrid()
  compassGrid()
}
///////////////////////////////////////////////////////////////////////
function colorGrid () {
  const green = color(0, 255, 0)
  const red = color(255, 0, 0)
  const factor = 0.01

  for (let x = 0; x < 25; x++) {
    for (let y = 0; y < 25; y++) {
      const tX = (x + frameCount) * factor
      const tY = (y + frameCount) * factor
      const t = noise(tX, tY)
      const c = lerpColor(green, red, t)
      fill(c)
      noStroke()
      rect(x * stepSize, y * stepSize, stepSize, stepSize)
    }
  }
}

///////////////////////////////////////////////////////////////////////
function compassGrid(){
  // your code here
}
