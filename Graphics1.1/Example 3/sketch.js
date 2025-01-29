function setup() {
  createCanvas(350, 175);
  background(0);
}

function draw() {
  noStroke();
  
  fill(255, 255, 0);
  arc(100, 100, 100, 100, PI / 6, -PI / 6, PIE);

  fill(255, 69, 0);
  beginShape();
  vertex(200, 140);
  vertex(280, 140);
  vertex(280, 100);
  bezierVertex(280, 50, 200, 50, 200, 100);
  endShape(CLOSE);

  fill(255);
  ellipse(225, 90, 25, 25);
  ellipse(255, 90, 25, 25);

  fill(0, 0, 255);
  ellipse(225, 90, 12, 12);
  ellipse(255, 90, 12, 12);

}
