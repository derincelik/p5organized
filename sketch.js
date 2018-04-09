var teddy;
var arr = [];
var darius;

var flag = false;

function preload() {
    teddy = loadImage('data/teddy.png');
    darius = loadImage('data/darius.png');
}

function setup() {
    createCanvas(1920, 1080);
    for (var i = 0; i < 5; i++) {
        arr.push(new Enemy(teddy, random(width), random(0,100), random(1,4), height));
    }
}

function draw() {
    background(255, 255, 255);
    image(darius, mouseX, mouseY, darius.width/3, darius.height/3);
    setTimeout(function() { }, 5000);
    if (!flag) {
        for (var i = 0; i < 5; i++) {
            arr[i].move();
            arr[i].display();
            var gameOver = arr[i].checkGameOver(mouseX, mouseY);
            if (gameOver) {
                flag = true;
                break;
            }
        }
    }
    if (flag) {
        for (var i = 0; i < 5; i++) {
            arr[i].display();
            textAlign(CENTER);
            text('GAME OVER', 50, 50);
        }
    }
}

function Enemy(img, xpos, ypos, speed, canvasHeight) {
    
    this.img = img;
    
    this.xpos = xpos;
    this.ypos = ypos;
    
    this.speed = speed;
    
    this.width = img.width / 4;
    this.height = img.height / 4;
    
    this.canvasHeight = canvasHeight;
    
    this.isOutOfBounds = false;
    
    this.move = function() {
        this.ypos += this.speed;
    };
    
    this.checkOutOfBounds = function() {
        if (this.ypos > this.canvasHeight) {
            this.isOutOfBounds = true;
        }
    };
    
    this.display = function() {
        image(this.img, this.xpos, this.ypos, this.width, this.height);
    };

    this.checkGameOver = function(dariusX, dariusY) {
        if (dariusX > this.xpos && dariusX < this.xpos + this.width && dariusY > this.ypos && dariusY < this.ypos + this.height) {
            return true;
        }
        return false;
    };
}