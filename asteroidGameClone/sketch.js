var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){
  // Step 5: spaceship-2-asteroid collisions
  for (var i=0; i<asteroids.locations.length; i++){
    if (isInside( spaceship.location,
                  spaceship.size,
                  asteroids.locations[i],
                  asteroids.diams[i])){
      return gameOver();
    }
  }

  // Step 6: asteroid-2-earth collisions
  for (var i=0; i<asteroids.locations.length; i++){
    if (isInside( earthLoc,
                  earthSize.y,
                  asteroids.locations[i],
                  asteroids.diams[i])){
      return gameOver();
    }
  }

  //Step 7: spaceship-2-earth
  if (isInside( earthLoc, earthSize.y,
                spaceship.location, spaceship.size)){
    return gameOver();
  }

  //Step 8: spaceship-2-atmosphere
  if (isInside( atmosphereLoc, atmosphereSize.y,
                spaceship.location, spaceship.size)){
    spaceship.setNearEarth();
  }

  //Step 10: bullet collisions
  for (var i=0; i<spaceship.bulletSys.bullets.length; i++){
    for (var j=0; j<asteroids.locations.length; j++){
      if (isInside( spaceship.bulletSys.bullets[i],
                    spaceship.bulletSys.diam,
                    asteroids.locations[j],
                    asteroids.diams[j])){
        asteroids.destroy(j);
      }
    }
  }
}

//////////////////////////////////////////////////
//Step 4: helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
  if (locA.x + sizeA/2 > locB.x - sizeB/2 &&
      locA.x - sizeA/2 < locB.x + sizeB/2 &&
      locA.y + sizeA/2 > locB.y - sizeB/2 &&
      locA.y - sizeA/2 < locB.y + sizeB/2){
        return true;
      }
  return false;
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
