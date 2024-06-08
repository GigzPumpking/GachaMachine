// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Globals

/* exported preload, setup, draw, placeTile */

/* global generateGrid drawGrid */

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

let test;
let shape;
let funnyName;
let camera;

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
  textSize(20);
  textFont(myFont);

  rerollShape();

  camera = createCamera();
}

function rerollShape() {
  test = new Gacha();
  shape = test.draw();
  funnyName = generateFunnyName() + " \nRarity: " + test.getRarity();
}

function draw() {
  background(50);

  // Text Drawing
  fill(255);
  text(funnyName, -200, 0, 400, 400);
  
  // Gacha Machine Drawing
  
  //translate(camera.centerX, camera.centerY, camera.centerZ - 500);
  //translate(camera.eyeX, camera.eyeY, (camera.eyeZ - 1000));
  
  noStroke();
  fill(255, 0, 0, 255);
  lights();
  cylinder(50, 100);
  translate(0, 25, 50);
  box();
  translate(0, 5, 11);
  fill(255, 255, 255);
  box(30);
  translate(0, -5, -11);
  translate(0, -125, -50);

  translate(0, 10, 0);
  fill(255, 255, 0);
  sphere(15);
  translate(0, -10, 0);

  translate(0, -50, 0);
  fill(255, 0, 255);
  sphere(15);
  translate(0, 50, 0);

  translate(-20.29, 0, 45.7);
  fill(0, 255, 255);
  sphere(15);
  translate(20.59, 0, -45.7);

  translate(-9.93, -21.74, 43.92);
  fill(0, 255, 0);
  sphere(15);
  translate(9.93, 21.74, -43.92);

  translate(-27.49, 25.86, 32.8);
  fill(0, 0, 255);
  sphere(15);
  translate(27.49, -25.86, -32.8);

  translate(34.43, -32.88, 15.28);
  fill(0, 150, 150);
  sphere(15);
  translate(-34.43, 32.88, -15.28);

  translate(-28.69, -29.68, 28.22);
  fill(150, 150, 0);
  sphere(15);
  translate(28.69, 29.68, -28.22);

  fill(255, 255, 255, 100);
  sphere(70);
  translate(0, 125, 50);
  //translate(-camera.eyeX, -camera.eyeY, -(camera.eyeZ - 1000));
  //translate(-camera.centerX, -camera.centerY, -camera.centerZ - 500);
  
  orbitControl();
  //model(shape);
}