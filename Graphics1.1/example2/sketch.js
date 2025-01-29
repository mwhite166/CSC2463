function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(255);

  fill(255,0,0,150); //red circle
  ellipse(200, 150, 200, 200);

  fill(0, 255, 0, 150); // greeen circle
  ellipse(250, 250, 200, 200);

  fill(0, 0, 255, 150); //blue circle 
  ellipse(150, 250, 200, 200);
}
