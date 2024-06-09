// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Globals

/* exported preload, setup, draw, placeTile */

/* global generateGrid drawGrid */

let gachaMachine;
let funnyName;
let myFont;
let wordText;

function preload() {
  myFont = loadFont('assets/Roboto-Regular.ttf');
}

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(500, 500, WEBGL);
  canvas.parent("canvas-container");

  createElement("br").parent("canvas-container");

  textAlign(CENTER, CENTER);
  textSize(1);
  textFont(myFont);

  gachaMachine = new GachaMachine();
  console.log("Knob stuff " + gachaMachine.knob.x, gachaMachine.knob.y, gachaMachine.knob.z);

  gachaMachine.rerollShape();
}

function draw() {
  background('#3C2350');
  lights();

  // Move the 3D text forward along the z-axis
  push();
  translate(0, 150, 85); // Adjust the z value as needed to move the text forward
  wordText.show();
  pop();

  // Text Drawing
  fill(255);
  text(funnyName, -200, 0, 400, 400);

  rectMode(CENTER);
  text(mouseY, mouseX/2, mouseY/2);
  text(mouseX, mouseX/2, mouseY/2 + 50);

  // Draw the Gacha Machine
  gachaMachine.draw();
}

function mousePressed() {
  gachaMachine.handleMousePressed(mouseX, mouseY);
}

function mouseDragged() {
  const xShift = (mouseY - pmouseY) / 100;
  const yShift = (mouseX - pmouseX) / 100;
  gachaMachine.rotateItem(xShift, yShift);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('#3C2350');
}

class GachaMachine {
  constructor() {
    this.rollclick = 0;
    this.item = new Gacha();
    this.shape = this.item.draw();
    this.translation = { x: 0, y: -50, z: -200 }; // Translation properties
    this.knob = { x: this.translation.x, y: this.translation.y - 25, z: this.translation.z + 50};
  }

  rerollShape() {
    funnyName = generateFunnyName() + " \nRarity: " + gachaMachine.getRarity();
    wordText = new Word3D(
      funnyName,       // The actual character that you want to draw (anything that can be passed into "text()")
      20,             // How thick the 3D rendered letter is (i.e. how many cube pixels of size "size" it is on z-axis)  
      0.4,     // The size of a unit "box()" making up part of the letter  
      40,            // The size of the canvas it renders the letter on (higher is more detailed, 30-40 is a good range)  
      false,          // [OPTIONAL, default = true] Gives the bevelled, embossed 3D look (as seen in screenshot)  
      myFont,     // [OPTIONAL, default = "Georgia"] Gives the font uses, can be any default ones or anything added  
      BOLD           // [OPTIONAL, default = BOLD] Gives the chosen style out of BOLD, NORMAL, ITALIC  
    );
  }

  getRarity() {
    return this.item.getRarity();
  }

  handleMousePressed(x, y) {
    if (x - 250 <= this.knob.x + 20 && x - 250 >= this.knob.x - 20 && y - 275 <= this.knob.y + 20 && y - 275 >= this.knob.y - 20) {
      this.rollclick += 1;
      this.rerollShape();
    }
    if (this.rollclick > 4) {
      this.rollclick = 0;
    }
  }

  rotateItem(xShift, yShift) {
    this.item.rotateItem(xShift, yShift);
    this.shape = this.item.draw();
  }

  setTranslation(x, y, z) {
    this.translation.x = x;
    this.translation.y = y;
    this.translation.z = z;
  }

  draw() {
    push();
    translate(this.translation.x, this.translation.y, this.translation.z);
    noStroke();
    fill(255, 50, 50);
    translate(0, -40, 0);
    box(30);
    translate(0, 40, 0);
    fill(255, 0, 0, 255);
    lights();
    cylinder(50, 100);

    push();
    fill(150, 150, 150);
    translate(0, -25, 50);
    rotateX(HALF_PI);
    cylinder(12, 1);
    pop();

    push();
    fill(150, 150, 150);
    translate(0, -25, 50);
    rotateZ(HALF_PI * this.rollclick);
    cylinder(2.5, 20);
    translate(0, 25, -50);
    pop();

    translate(0, 25, 50);
    box();
    translate(0, 5, 11);
    fill(255, 255, 255);
    box(30);
    translate(0, -5, -11);
    translate(0, -125, -50);

    this.drawSpheres();

    fill(250, 250, 250, 100);
    sphere(70);
    translate(0, 125, 50);
    pop();

    model(this.shape);
  }

  drawSpheres() {
    const positions = [
      { x: 13.33, y: -12.69, z: 46.49, color: [255, 255, 0] },
      { x: 1.88, y: -37.26, z: 33.29, color: [255, 0, 255] },
      { x: 34.38, y: -30.29, z: 20.01, color: [0, 255, 255] },
      { x: 37.34, y: 22.93, z: 24.08, color: [0, 255, 0] },
      { x: 12.83, y: 27.08, z: 40.02, color: [0, 0, 255] },
      { x: 38.45, y: -3.47, z: 31.77, color: [0, 150, 150] },
      { x: -9.52, y: 10.77, z: 47.89, color: [150, 150, 0] },
      { x: -17.15, y: -18.04, z: 43.36, color: [150, 0, 150] },
      { x: -24.38, y: -37.39, z: 22.53, color: [0, 150, 150] },
      { x: -42.59, y: -6.15, z: 25.46, color: [0, 150, 150] },
      { x: -45.11, y: 21.25, z: 3.72, color: [150, 150, 150] },
      { x: -9.76, y: 39.19, z: 29.47, color: [150, 0, 150] },
      { x: -32.47, y: 22.36, z: 30.75, color: [250, 0, 150] },
      { x: 18.84, y: 35.44, z: 8.95, color: [250, 50, 250] },
      { x: -34.02, y: -35.42, z: -9.39, color: [50, 250, 250] },
      { x: -49.2, y: -6.86, z: -5.7, color: [250, 250, 50] },
      { x: -3.18, y: -31.3, z: -38.86, color: [50, 250, 250] },
      { x: 28.24, y: -28.88, z: -29.47, color: [255, 50, 0] },
      { x: 23.48, y: -43.94, z: -4.18, color: [55, 250, 0] },
      { x: -8.45, y: -49.28, z: 0, color: [255, 250, 0] },
      { x: 46.36, y: -17.19, z: -7.43, color: [55, 250, 55] },
      { x: 47.1, y: 15.26, z: -7.01, color: [0, 0, 255] },
      { x: 33.71, y: 16.31, z: -33.13, color: [255, 250, 0] },
      { x: 33.71, y: 16.31, z: -33.13, color: [55, 250, 255] },
      { x: 7.92, y: 30.19, z: -39.06, color: [255, 255, 0] },
      { x: -21.49, y: 34.3, z: -29.35, color: [55, 50, 50] },
      { x: -38.36, y: 7.51, z: -32.18, color: [255, 255, 255] },
      { x: -5.58, y: 3.95, z: -49.53, color: [255, 50, 125] },
      { x: 18.82, y: -4.52, z: -46.1, color: [155, 150, 200] },
      { x: -30.33, y: -21.55, z: -33.4, color: [255, 250, 0] },
      { x: -14.7, y: -26.12, z: 1.38, color: [55, 250, 0] },
      { x: 15.75, y: -25.53, z: 0, color: [55, 255, 255] },
      { x: 28.23, y: 0.6, z: 10.12, color: [55, 0, 250] },
      { x: 16.59, y: 24.61, z: 4.35, color: [250, 55, 0] },
      { x: 22.23, y: 2.92, z: -19.93, color: [0, 55, 250] },
      { x: 0.96, y: -15.95, z: -25.39, color: [55, 250, 250] },
      { x: -23.87, y: -1.13, z: -18.14, color: [255, 50, 100] },
      { x: -2.61, y: 17.66, z: -24.11, color: [155, 150, 0] },
      { x: -15.31, y: 25.68, z: 2.43, color: [55, 250, 0] },
      { x: -27.33, y: 0.24, z: 12.37, color: [200, 200, 100] },
      { x: 2.21, y: -15.8, z: 25.4, color: [55, 250, 0] },
      { x: -0.51, y: 14.82, z: 26.08, color: [155, 250, 100] },
      { x: 0, y: 0, z: 0, color: [250, 250, 0] }
    ];

    for (let pos of positions) {
      push();
      translate(pos.x, pos.y, pos.z);
      fill(...pos.color);
      sphere(15);
      pop();
    }
  }
}
