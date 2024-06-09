// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Globals

/* exported preload, setup, draw, placeTile */

/* global generateGrid drawGrid */

let test;
let shape;
let funnyName;
let myFont;
let letterModels = [];
let wordText;

function preload() {
  myFont = loadFont('assets/Roboto-Regular.ttf');
}

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(500, 500, WEBGL);
  canvas.parent("canvas-container");

  createElement("br").parent("canvas-container");

  let reroll = createButton();
  reroll.html("Reroll");
  reroll.parent("canvas-container");
  reroll.mousePressed(rerollShape);

  textAlign(CENTER, CENTER);
  textSize(1);
  textFont(myFont);

  rerollShape();
}

function rerollShape() {
  test = new Gacha();
  funnyName = generateFunnyName() + " \nRarity: " + test.getRarity();
  wordText = new Word3D(
  	funnyName,       // The actual character that you want to draw (anything that can be passed into "text()")
  	20,             // How thick the 3D rendered letter is (i.e. how many cube pixels of size "size" it is on z-axis)  
  	0.4,     // The size of a unit "box()" making up part of the letter  
  	40,            // The size of the canvas it renders the letter on (higher is more detailed, 30-40 is a good range)  
  	false,          // [OPTIONAL, default = true] Gives the bevelled, embossed 3D look (as seen in screenshot)  
  	myFont,     // [OPTIONAL, default = "Georgia"] Gives the font uses, can be any default ones or anything added  
  	BOLD           // [OPTIONAL, default = BOLD] Gives the chosen style out of BOLD, NORMAL, ITALIC  
	);
  shape = test.draw();
  
}

function draw() {
  background('#3C2350');
  lights();
  // Move the 3D text forward along the z-axis
  push();
  translate(0, 20, 85); // Adjust the z value as needed to move the text forward
  wordText.show();
  pop();

  // Gacha Machine Drawing
  /*
  rectMode(CENTER);
  noStroke();
  fill(0, 0, 255);
  rotateX(-0.2);
  lights();
  sphere();
  cylinder(50, 100);
  translate(0, 25, 50);
  box();
  translate(0, -100, -50);
  sphere(70);
  */

  orbitControl();
  model(shape);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('#3C2350');
}
