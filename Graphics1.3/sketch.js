//They can walk off of the canvas but when you start going the other direction 
//They return back to the screen if you go far enough
let cyanSprite, limeSprite, yellowSprite;
let characters = [];

function preload() {
    cyanSprite = loadImage("assets/cyan.png");
    limeSprite = loadImage("assets/lime.png");
    yellowSprite = loadImage("assets/yellow.png");
}
// all of the different actions of the characters 
class Character {
    constructor(x, y, spriteSheet) {
        this.x = x;
        this.y = y;
        this.spriteSheet = spriteSheet;
        this.frame = 0;
        this.frameCount = 0;
        this.direction = 1; 
        this.state = "standing"; 
        this.frameWidth = 80;
        this.frameHeight = 80;
    }

    update() {
        if (this.state === "walking") {
            this.frameCount++;
            if (this.frameCount % 6 === 0) { 
                this.frame = (this.frame + 1) % 4;
            }
        } else {
            this.frame = 0;
        }
    }

    move(direction) {
        this.direction = direction;
        this.state = "walking";
        this.x += 3 * direction;
    }

    stop() {
        this.state = "standing";
    }
//starts drawing out the characters
    draw() {
        push();
        translate(this.x, this.y);
        if (this.direction === -1) {
            scale(-1, 1);
            image(this.spriteSheet, -this.frameWidth, 0, this.frameWidth, this.frameHeight, this.frame * this.frameWidth, 0, this.frameWidth, this.frameHeight);
        } else {
            image(this.spriteSheet, 0, 0, this.frameWidth, this.frameHeight, this.frame * this.frameWidth, 0, this.frameWidth, this.frameHeight);
        }
        pop();
    }
}

function setup() {
    createCanvas(800, 400);
    characters.push(new Character(100, 300, cyanSprite));
    characters.push(new Character(300, 300, limeSprite));
    characters.push(new Character(500, 300, yellowSprite));
}

function draw() {
    background(127, 255, 212); //wanted to do something besides grey
    for (let char of characters) {
        char.update();
        char.draw();
    }
}
//movement of the players 
function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        for (let char of characters) {
            char.move(1);
        }
    } else if (keyCode === LEFT_ARROW) {
        for (let char of characters) {
            char.move(-1);
        }
    }
}

function keyReleased() {
    if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
        for (let char of characters) {
            char.stop();
        }
    }
}
