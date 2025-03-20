let bugSprites;
let squishedBug;
let squishSound, missSound, skitterSound, startMusic, gameOverMusic;
let bugs = [];
let squishedCount = 0;
let timeLeft = 30;
let gameOver = false;
let gameStarted = false;
//sprites are in the assets folder 
function preload() {
  bugSprites = loadImage('assets/bug_sprites.png');
  squishedBug = loadImage('assets/squished_bug.png');
  squishSound = loadSound('assets/squish.wav');
  missSound = loadSound('assets/miss.wav');
  skitterSound = loadSound('assets/skitter.wav');
  startMusic = loadSound('assets/startMusic.wav');
  gameOverMusic = loadSound('assets/gameOver.wav');
}
//sets up the canvas and the creation of a new bug
function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 5; i++) {
    bugs.push(new Bug(random(width), random(height), 2));
  }
  //timer and stops the timer when it runs out
  setInterval(() => {
    if (gameStarted && timeLeft > 0 && !gameOver) {
      timeLeft--;
    }else if (timeLeft === 0 && !gameOver) {
      gameOver = true;
      startMusic.stop();
      skitterSound.stop();
      gameOverMusic.play();
    }
  }, 1000);
}

function draw() {
  background(220);

  if (!gameStarted) {
    textSize(36);
    textAlign(CENTER);
    text("Bug Squish Game", width/2, height/3);
    textSize(24);
    text("Click to Start", width/2, height/2);

    if (!startMusic.isPlaying()) {
      startMusic.play();
    }
    return;
  }

  if (!gameOver) {
    for (let bug of bugs) {
      bug.update();
      bug.display();
    }
    fill(0);
    textSize(24);
    textAlign(LEFT);
    text(`Squished: ${squishedCount}`, 20, 60);
    text(`Time Left: ${timeLeft}s`, 20, 90);
  } else {
    textSize(36);
    textAlign(CENTER);
    text(`Game Over! Score: ${squishedCount}`, width / 2, height / 2);
  }
}
//mouse functions: I updated it on 2/18/25 to where a click only counts as 1 pt
// instead of multiple
function mousePressed() {

  if (!gameStarted) {
    gameStarted = true;
    if (!startMusic.isPlaying()) {
      startMusic.loop();
    }
    skitterSound.loop();

    return;
  }

  let bugSquished = false;

  for (let i = bugs.length -1; i >= 0; i--) {
    if (bugs[i].isClicked(mouseX, mouseY) && !bugs[i].squished) {
      bugs[i].squish();
      squishedCount++;
      squishSound.play();
      bugSquished = true;
      bugs.push(new Bug(random(width), random(height),2 + squishedCount * 0.2));
    }
  }
  if (!bugSquished) {
    missSound.play();
  }
}
//added the bug class inside of the main file instead of 
// creating a new file
class Bug {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.frame = 0;
    this.squished = false;
    this.direction = random([-1, 1]);
  }
  update() {
    if (!this.squished) {
      this.x += this.speed * this.direction;
      if (this.x < 0 || this.x > width - 80) {
        this.direction *= -1;
      }
      this.frame = (this.frame + 0.1) % 4;
    }
  }
  display() {
    push();
    translate(this.x + 40, this.y +40);

    if (this.direction === -1) {
      scale(-1,1);
    }

    if (this.squished) {
      image(squishedBug, -40, -40, 80, 80);
    } else {
      let sx = floor(this.frame) * 80;
      image(bugSprites, -40, -40, 80, 80, sx, 0, 80, 80);
    }

    pop();
  }
  isClicked(mx, my) {
    return mx > this.x && mx < this.x + 80 && my > this.y && my < this.y + 80;
  }
  squish() {
    this.squished = true;
  }
}