let startContext, samples, button1, button2, button3, button4, distSlider, feedBackSlider;

let rev = new Tone.Reverb(5).toDestination();
let dist = new Tone.Distortion(0).connect(rev);
let del = new Tone.FeedbackDelay(0.5, 0.5).connect(dist);

function preload() {
  samples = new Tone.Players({
    guitar: "media/sample1.wav",
    melody: "media/sample2.wav",
    drums: "media/sample3.wav",
    nighttime: "media/sample4.wav"
  }).connect(del);
}

function setup() {
  createCanvas(600, 600);
  background(220); //moved here from draw 

  //audio context button
  startContext = createButton("Start Audio Context");
  startContext.position(width / 2 - startContext.width / 2, 20);
  startContext.mousePressed(startAudioContext);

  //sample buttons
  button1 = createButton("Play Guitars");
  button1.position(width / 2 - button1.width / 2, 100);
  button2 = createButton("Play Melody");
  button2.position(width / 2 - button2.width /2, 140);
  button3 = createButton("Play Drums");
  button3.position(width / 2 - button3.width /2, 180);
  button4 = createButton("Play Night Melody");
  button4.position(width / 2 - button4.width / 2, 220);

  //disable buttons until started
  button1.attribute('disabled', '');
  button2.attribute('disabled', '');
  button3.attribute('disabled', '');
  button4.attribute('disabled', '');

  //samples actions
  button1.mousePressed(() => {samples.player("guitar").start()});
  button2.mousePressed(() => {samples.player("melody").start()});
  button3.mousePressed(() => {samples.player("drums").start()});
  button4.mousePressed(() => {samples.player("nighttime").start()});

  //distortion
  distSlider = createSlider(0, 10, 0, 0.01);
  distSlider.position(width /2 - distSlider.width / 2, 300);
  distSlider.input(() => {dist.distortion = distSlider.value()});

  //feedback
  feedbackSlider = createSlider(0, 0.99, 0.5, 0.01);
  feedbackSlider.position(width / 2 - feedbackSlider.width / 2, 350);
  feedbackSlider.input(() => {del.feedback.value = feedbackSlider.value()});
}
function draw() {
  background('#E0BBE4');

  fill(0);
  text("Distortion Amount: " + distSlider.value(), width / 2 - distSlider.width / 2 - 120, 320);
  text("Feedback Amount: " + feedbackSlider.value(), width / 2 - feedbackSlider.width / 2 - 120, 370);
}
function startAudioContext() {
  if(Tone.context.state != 'running') {
    Tone.start();
    console.log("Audio Context Started");

    //enables the sample buttons after starting
    button1.removeAttribute('disabled');
    button2.removeAttribute('disabled');
    button3.removeAttribute('disabled');
    button4.removeAttribute('disabled');
  } else {
    console.log("Audio Context is already running");
  }
}