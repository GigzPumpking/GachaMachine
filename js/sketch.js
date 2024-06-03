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

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(500, 500, WEBGL);
  canvas.parent("canvas-container");

  createElement("br").parent("canvas-container");

  let reroll = createButton();
  reroll.html("Reroll");
  reroll.parent("canvas-container");
  reroll.mousePressed(rerollShape);

  rerollShape();
}

function rerollShape() {
  test = new Gacha();
  shape = test.draw();
}

function draw() {
  background(50);
  
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