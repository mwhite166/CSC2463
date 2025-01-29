function setup() {
  createCanvas(400, 400);
  background(0, 0, 255);
}

function draw() {
  fill(255);
  ellipse(width / 2, height / 2, 210, 210);

  fill(0, 255, 0); 
  ellipse(width / 2, height / 2, 200, 200);

  stroke(255);
  strokeWeight(8);
  fill(255, 0, 0);
  star(width / 2, height / 2, 50, 100, 5);
}
//drawing the star 
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
