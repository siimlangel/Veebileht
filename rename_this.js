var canvas;
var flowfield;
particles = [];
var scl = 10;
var rows, cols;

function windowResized() {
    screen_Height = document.documentElement.scrollHeight;
    screen_Width = document.documentElement.scrollWidth;
    resizeCanvas(window.innerWidth, screen_Height);
}

function getValue(x, y) {
    return (sin(x * x * 0.1) + sin(y * y * 0.1) * TWO_PI * 4)
}

function setup() {
    var screen_Height = document.documentElement.scrollHeight;
    pixelDensity(1);
    canvas = createCanvas(window.innerWidth, screen_Height);
    canvas.position(0, 0);
    canvas.style('z-index', '-2');

    for (let i = 0; i < 1000; i++) {
        particles.push(new Particle(createVector(random(width), random(height)), random(0.05, 1), 0));
    }

}   
var zoff = 0;
var xoff, yoff;

function paranormal(x, y, r) {
    push();
    fill(random(255), random(255), random(255))
    ellipse(x, y, r, r);
    ellipse(x - r/4, y - r/8, r/8, r/8);
    ellipse(x + r/4, y - r/8, r/8, r/8);
    ellipse(x, y + r/4, r/4, random(-r/9, r/9));
    pop();
}

function draw() {
    rows = floor(width/scl) + 1;
    cols = floor(height/scl) + 1;
    flowfield = new Array(rows * cols);
    background(255, 50);
    
    
      
    

    noFill();
    yoff = 0;
    for (let x = 0; x < rows; x ++) {
        xoff = 0;
        for (let y = 0; y < cols; y ++) {
            let angle = noise(xoff, yoff, zoff) * TWO_PI;
            //let x_ = sin((y - x + angle) * 0.05);
            //let y_ = sin((x + y + angle) * 0.05);
            /*
            push();
            translate(x * scl, y *scl);
            rotate(angle);
            line(0, 0, scl, 0);
            pop();
            */

            let v = p5.Vector.fromAngle(angle);
            //let v = createVector(mouseX, mouseY);
            v.setMag(0.01);
            let index = y + x * rows;

            flowfield[index] = v;

            xoff += 0.05;
        }
        yoff += 0.05;
        zoff += 0.0001;
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield)
        particles[i].update();
        particles[i].edges();
        particles[i].show();
    }

    
}

class Particle {
    
    constructor(start, maxspd, hue) {
        this.pos = start;
        this.maxspd = maxspd;
        this.hue = hue;
        this.prevPos = this.pos.copy();
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
    }

    show() {
        push();
        stroke(this.hue);
        strokeWeight(0.4);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        pop();
        this.updatePos();
    }

    updatePos() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    update() {
        this.pos.add(this.vel);
        this.vel.limit(this.maxspd);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    edges() {
        if (this.pos.x > width) {
          this.pos.x = 0;
          this.updatePos();
        }
        if (this.pos.x < 0) {
          this.pos.x = width;
          this.updatePos();
        }
        if (this.pos.y > height) {
          this.pos.y = 0;
          this.updatePos();
        }
        if (this.pos.y < 0) {
          this.pos.y = height;
          this.updatePos();
        }
      }
    applyForce(force) {
        this.acc.add(force);
    }
    
    follow(flowfield) {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        let index = y + x * rows;

        let force = flowfield[index];

        this.applyForce(force);
    }
}