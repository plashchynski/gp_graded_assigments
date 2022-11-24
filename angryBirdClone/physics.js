////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
// Step 1
function setupPropeller(){
  propeller = Bodies.rectangle(150, 480, 200, 15, {
    isStatic: true,
    angle: angle
  });
  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
// Step 2: updates and draws the propeller
function drawPropeller(){
  push();
  Matter.Body.setAngle(propeller, angle);
  propeller.angularVelocity = angleSpeed;
  angle += angleSpeed;
  fill(255);
  drawVertices(propeller.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
// Step 3: draw birds
function drawBirds(){
  push();
  for (var i=0; i<birds.length; i++){
    if (isOffScreen(birds[i])){
      removeFromWorld(birds[i]);
      birds.splice(i, 1);
      i--;
    }
    fill('orange');
    drawVertices(birds[i].vertices);
  }
  pop();
}
////////////////////////////////////////////////////////////////
// Step 4 creates a tower of boxes
function setupTower(){
  const boxHeight = 80;
  const boxWidth = 80;
  const rows = 6;
  const columns = 3;

  tower = Composites.stack(width-boxWidth*(columns+1),
                            ground.bounds.min.y-boxWidth*rows,
                            columns, rows, 0, 0, function(x, y) {
    const box = Bodies.rectangle(x, y, boxWidth, boxHeight);
    box.color = color(0, random(100, 255), 0);
    return box;
  });
  World.add(engine.world, [tower]);
}
////////////////////////////////////////////////////////////////
// Step 5 draws tower of boxes
function drawTower(){
  push();
  for (var i = 0; i < tower.bodies.length; i++) {
    const box = tower.bodies[i];
    fill(box.color);
    drawVertices(box.vertices);
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
