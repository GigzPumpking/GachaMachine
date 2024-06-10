let currentScene = 1;
let currentP5Instance;

function setup() {
  createCanvas(800, 600);
  console.log("Current scene: " + currentScene);
  loadScene1();
}

function draw() {
  // Placeholder draw function
}

function keyPressed() {
  if (currentScene === 1) {
    currentScene = 2;
    loadScene2();
  } else {
    currentScene = 1;
    loadScene1();
  }
}

function loadScene1() {
console.log("Loading scene 1");
  if (currentP5Instance) {
    currentP5Instance.remove();
  }
  currentP5Instance = new p5(scene1);
  console.log(currentP5Instance);
}

function loadScene2() {
  if (currentP5Instance) {
    currentP5Instance.remove();
  }
  currentP5Instance = new p5(scene2);
}
