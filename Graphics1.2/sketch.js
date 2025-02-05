//paint program graphics 1.2

let colors = [
  { name: 'red', value: [255,0,0]},
  { name: 'orange', value: [255,165,0]},
  { name: 'yellow', value: [255,255,0]},
  { name: 'green', value: [0,128,0]},
  { name: 'cyan', value: [0,255,255]},
  { name: 'blue', value: [0,0,255]},
  { name: 'magenta', value: [255,0,255]},
  { name: 'brown', value: [165,42,42]},
  { name: 'white', value: [255,255,255]},
  { name: 'black', value: [0,0,0]}
];

let currentColor;
let paletteWidth = 50;

function setup() {
  createCanvas(1200,1000);
  background(255);
  currentColor = [0,0,0]; //black as default 
  drawPalette();
}
function draw(){
  if(mouseIsPressed && mouseX > paletteWidth) {
    stroke(currentColor);
    strokeWeight(4);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
function drawPalette() {
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i].value);
    stroke(0);
    rect(0, i * 50, paletteWidth, 50);
  }
}
function mousePressed() {
  if (mouseX < paletteWidth) {
    let index = floor(mouseY / 50);
    if (index >= 0 && index < colors.length) {
      currentColor = colors[index].value;
    }
  }
}