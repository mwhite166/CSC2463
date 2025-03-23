let img;
let synth, noise, filter, lfo;
let showImage = false;

function preload() {
  img = loadImage("assets/icemelt.jpg"); //change to image name when completed
}
function setup() {
  createCanvas(600, 400);

  //initialize synth components 
  synth = new Tone.MembraneSynth().toDestination();
  noise = new Tone.Noise("white").start();
  filter = new Tone.Filter(800, "lowpass").toDestination();

  //LFO to modulate filter frequency 
  lfo = new Tone.LFO(5, 400, 1200);
  lfo.connect(filter.frequency);
  lfo.start();

  noise.connect(filter);
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(0);

  if (showImage) {
    image(img, 150, 100, 300, 200);
  } else {
    text("Click to trigger sound and image!", width / 2, height / 2);
  }
}

function mousePressed() {
  showImage = true;

  //trigger sound effect 
  synth.triggerAttackRelease("C2", "8n");
  noise.volume.rampTo(-10, 0.2);
}