let synth;
let filter;
let reverb;
let started = false;
let slider, startButton;

let keys = {
  'A': 'C4', 'W': 'C#4', 'S': 'D4', 'E': 'D#4', 'D': 'E4', 'F': 'F4',
  'T': 'F#4', 'G': 'G4', 'Y': 'G#4', 'H': 'A4', 'U': 'A#4', 'J': 'B4', 'K': 'C5'
};

function setup() {
  createCanvas(400, 200);
  textSize(16);

  synth = new Tone.PolySynth(Tone.Synth).toDestination();
  
  filter = new Tone.Filter(500, "lowpass").toDestination(); // Lower starting cutoff
  synth.connect(filter);

  reverb = new Tone.Reverb(2).toDestination();
  filter.connect(reverb);

  // Centered slider
  slider = createSlider(100, 5000, 500);
  slider.position(width / 2 - slider.width / 2, height - 40);
  slider.input(() => filter.frequency.value = slider.value());

  // Centered start button
  startButton = createButton("Click to Start Audio");
  startButton.position(width / 2 - startButton.width / 2, height - 80);
  startButton.mousePressed(() => {
    if (!started) {
      Tone.start().then(() => {
        console.log("Audio started");
        started = true;
      });
    }
  });
}

function draw() {
  background(200, 180, 255); // Light purple background
  textAlign(CENTER, CENTER);
  fill(0);
  text("Press keys A-K to play notes", width / 2, 30);
  text("Move slider to adjust filter", width / 2, height - 50);
}

function keyPressed() {
  if (!started) return; // Prevent playing if Tone.js hasn't started

  let note = keys[key.toUpperCase()];
  if (note) {
    console.log(`Playing: ${note}`);
    synth.triggerAttack(note);
  }
}

function keyReleased() {
  if (!started) return;

  let note = keys[key.toUpperCase()];
  if (note) {
    synth.triggerRelease(note);
  }
}
