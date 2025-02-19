let bugSprites;
let squishedBug;
let bugs = [];
let squishedCount = 0;
let timeLeft = 30;
let gameOver = false;
//sprites are in the assets folder 
function preload() {
  bugSprites = loadImage('assets/bug_sprites.png');
  squishedBug = loadImage('assets/squished_bug.png');
}
//sets up the canvas and the creation of a new bug
function setup() {
  createCanvas(1000, 1000);
  for (let i = 0; i < 5; i++) {
    bugs.push(new Bug(random(width), random(height), 2));
  }
  //timer and stops the timer when it runs out
  setInterval(() => {
    if (timeLeft > 0 && !gameOver) {
      timeLeft--;
    }else {
      gameOver = true;
      clearInterval(this);
    }
  }, 1000);
}

function draw() {
  background(220);

  if (!gameOver) {
    for (let bug of bugs) {
      bug.update();
      bug.display();
    }
    fill(0);
    textSize(24);
    text(`Squished: ${squishedCount}`, 20, 40);
    text(`Time Left: ${timeLeft}s`, 20, 70);
  } else {
    textSize(36);
    textAlign(CENTER);
    text(`Game Over! Score: ${squishedCount}`, width / 2, height / 2);
  }
}
//mouse functions: I updated it on 2/18/25 to where a click only counts as 1 pt
// instead of multiple
function mousePressed() {
  for (let i = bugs.length -1; i >= 0; i--) {
    if (bugs[i].isClicked(mouseX, mouseY) && !bugs[i].squished) {
      bugs[i].squish();
      squishedCount++;
      bugs.push(new Bug(random(width), random(height),2 + squishedCount * 0.2));
    }
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
    if (this.squished) {
      image(squishedBug, this.x, this.y, 80, 80);
    } else {
      let sx = floor(this.frame) * 80;
      image(bugSprites, this.x, this.y, 80, 80, sx, 0, 80, 80);
    }
  }
  isClicked(mx, my) {
    return mx > this.x && mx < this.x + 80 && my > this.y && my < this.y + 80;
  }
  squish() {
    this.squished = true;
  }
}
