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
let rollclick = 0;

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

function mousePressed(){
  if(mouseX <= 270 && mouseX >= 230){
    if(mouseY <= 230 && mouseY >= 200){
      rollclick += 1;
    }
  }
  if(rollclick > 4){
    rollclick = 0;
  }
}

function draw() {
  background(50);

  // Text Drawing
  fill(255);
  text(funnyName, -200, 0, 400, 400);
  rectMode(CENTER);
  text(mouseY, mouseX/2, mouseY/2);
  text(mouseX, mouseX/2, mouseY/2 + 50);
  // Gacha Machine Drawing
  
  //translate(camera.centerX, camera.centerY, camera.centerZ - 500);
  //translate(camera.eyeX, camera.eyeY, (camera.eyeZ - 1000));
  push();
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
  rotateZ(HALF_PI * rollclick);
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

  translate(13.33, -12.69, 46.49);
  fill(255, 255, 0);
  sphere(15);
  translate(-13.33, 12.69, -46.49);

  translate(1.88, -37.26, 33.29);
  fill(255, 0, 255);
  sphere(15);
  translate(-1.88, 37.26, -33.29);

  translate(34.38, -30.29, 20.01);
  fill(0, 255, 255);
  sphere(15);
  translate(-34.38, 30.29, -20.01);

  translate(37.34, 22.93, 24.08);
  fill(0, 255, 0);
  sphere(15);
  translate(-37.34, -22.93, -24.08);

  translate(12.83, 27.08, 40.02);
  fill(0, 0, 255);
  sphere(15);
  translate(-12.83, -27.08, -40.02);

  translate(38.45, -3.47, 31.77);
  fill(0, 150, 150);
  sphere(15);
  translate(-38.45, 3.47, -31.77);

  translate(-9.52, 10.77, 47.89);
  fill(150, 150, 0);
  sphere(15);
  translate(9.52, -10.77, -47.89);
//
  translate(-17.15, -18.04, 43.36);
  fill(150, 0, 150);
  sphere(15);
  translate(17.15, 18.04, -43.36);

  translate(-24.38, -37.39, 22.53);
  fill(0, 150, 150);
  sphere(15);
  translate(24.38, 37.39, -22.53);

  translate(-42.59, -6.15, 25.46);
  fill(0, 150, 150);
  sphere(15);
  translate(42.59, 6.15, -25.46);

  translate(-45.11, 21.25, 3.72);
  fill(150, 150, 150);
  sphere(15);
  translate(45.11, -21.25, -3.72);

  translate(-9.76, 39.19, 29.47);
  fill(150, 0, 150);
  sphere(15);
  translate(9.76, -39.19, -29.47);

  translate(-32.47, 22.36, 30.75);
  fill(250, 0, 150);
  sphere(15);
  translate(32.47, -22.36, -30.75);

  translate(18.84, 35.44, 8.95);
  fill(250, 50, 250);
  sphere(15);
  translate(-18.84, -35.44, -8.95);

  translate(-34.02, -35.42, -9.39);
  fill(50, 250, 250);
  sphere(15);
  translate(34.02, 35.42, 9.39);

  translate(-49.2, -6.86, -5.7);
  fill(250, 250, 50);
  sphere(15);
  translate(49.2, 6.86, 5.7);

  translate(-3.18, -31.3, -38.86);
  fill(50, 250, 250);
  sphere(15);
  translate(3.18, 31.3, 38.86);

  translate(28.24, -28.88, -29.47);
  fill(255, 50, 0);
  sphere(15);
  translate(-28.24, 28.88, 29.47);

  translate(23.48, -43.94, -4.18);
  fill(55, 250, 0);
  sphere(15);
  translate(-23.48, 43.94, 4.18);

  translate(-8.45, -49.28, 0);
  fill(255, 250, 0);
  sphere(15);
  translate(8.45, 49.28, 0);

  translate(46.36, -17.19, -7.43);
  fill(55, 250, 55);
  sphere(15);
  translate(-46.36, 17.19, 7.43);

  translate(47.1, 15.26, -7.01);
  fill(0, 0, 255);
  sphere(15);
  translate(-47.1, -15.26, 7.01);

  translate(33.71, 16.31, -33.13);
  fill(255, 250, 0);
  sphere(15);
  translate(-33.71, -16.31, 33.13);

  translate(33.71, 16.31, -33.13);
  fill(55, 250, 255);
  sphere(15);
  translate(-33.71, -16.31, 33.13);

  translate(7.92, 30.19, -39.06);
  fill(255, 255, 0);
  sphere(15);
  translate(-7.92, -30.19, 39.06);

  translate(-21.49, 34.3, -29.35);
  fill(55, 50, 50);
  sphere(15);
  translate(21.49, -34.3, 29.35);

  translate(-38.36, 7.51, -32.18);
  fill(255, 255, 255);
  sphere(15);
  translate(38.36, -7.51, 32.18);

  translate(-5.58, 3.95, -49.53);
  fill(255, 50, 125);
  sphere(15);
  translate(5.58, -3.95, 49.53);

  translate(18.82, -4.52, -46.1);
  fill(155, 150, 200);
  sphere(15);
  translate(-18.82, 4.52, 46.1);

  translate(-30.33, -21.55, -33.4);
  fill(255, 250, 0);
  sphere(15);
  translate(30.33, 21.55, 33.4);

  translate(-14.7, -26.12, 1.38);
  fill(55, 250, 0);
  sphere(15);
  translate(14.7, 26.12, -1.38);

  translate(15.75, -25.53, 0);
  fill(55, 255, 255);
  sphere(15);
  translate(-15.75, 25.53, 0);

  translate(28.23, 0.6, 10.12);
  fill(55, 0, 250);
  sphere(15);
  translate(-28.23, -0.6, -10.12);

  translate(16.59, 24.61, 4.35);
  fill(250, 55, 0);
  sphere(15);
  translate(-16.59, -24.61, -4.35);

  translate(22.23, 2.92, -19.93);
  fill(0, 55, 250);
  sphere(15);
  translate(-22.23, -2.92, 19.93);

  translate(0.96, -15.95, -25.39);
  fill(55, 250, 250);
  sphere(15);
  translate(-0.96, 15.95, 25.39);

  translate(-23.87, -1.13, -18.14);
  fill(255, 50, 100);
  sphere(15);
  translate(23.87, 1.13, 18.14);

  translate(-2.61, 17.66, -24.11);
  fill(155, 150, 0);
  sphere(15);
  translate(2.61, -17.66, 24.11);

  translate(-15.31, 25.68, 2.43);
  fill(55, 250, 0);
  sphere(15);
  translate(15.31, -25.68, -2.43);

  translate(-27.33, 0.24, 12.37);
  fill(200, 200, 100);
  sphere(15);
  translate(27.33, -0.24, -12.37);

  translate(2.21, -15.8, 25.4);
  fill(55, 250, 0);
  sphere(15);
  translate(-2.21, 15.8, -25.4);

  translate(-0.51, 14.82, 26.08);
  fill(155, 250, 100);
  sphere(15);
  translate(0.51, -14.82, -26.08);

  fill(250, 250, 0);
  sphere(15);

  fill(255, 255, 255, 100);
  sphere(66);

  fill(250, 250, 250, 100);
  sphere(70);
  translate(0, 125, 50);
  pop();
  //translate(-camera.eyeX, -camera.eyeY, -(camera.eyeZ - 1000));
  //translate(-camera.centerX, -camera.centerY, -camera.centerZ - 500);
  
  model(shape);
}

function mouseDragged() {
  const xShift = (mouseY - pmouseY)/100
  const yShift = (mouseX - pmouseX)/100
  test.rotateItem(xShift, yShift);
  shape = test.draw()
}