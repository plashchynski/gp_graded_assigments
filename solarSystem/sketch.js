var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = frameCount;

    push();
    translate(width/2, height/2);

    // Sun
    rotate(radians(speed/3));
    celestialObj(color(255,150,0), 200);

    // Earth
    translate(300, 0);
    rotate(radians(speed));
    celestialObj(color('blue'), 80);

    // Moon
    rotate(radians(speed*2));
    translate(100, 0);
    celestialObj(color('white'), 30);

    pop();
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}
