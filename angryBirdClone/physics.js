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
  propeller.angle = angle;
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
function drawBirds(){
  push();
  //your code here
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here
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
