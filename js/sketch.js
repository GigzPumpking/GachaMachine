let gachaMachine;
let myFont;
let wordText;
let running = false;
let currentP5Instance;
let obtained = [];
let dropdown;
let rollingSfx;
let commonSfx;
let rareSfx;
let epicSfx;

function preload() {
  myFont = loadFont('../assets/Roboto-Regular.ttf');
  pixelFont = loadFont('../assets/04B_30__.TTF');

  // load sfx
  soundFormats('mp3', 'ogg');
  rollingSfx = loadSound('../assets/gumball.mp3', soundLoaded);
  rollingSfx.setVolume(1);
  
  commonSfx = loadSound('../assets/common.mp3');
  commonSfx.setVolume(1);

  rareSfx = loadSound('../assets/rare.mp3');
  rareSfx.setVolume(1);

  epicSfx = loadSound('../assets/epic.mp3');
  epicSfx.setVolume(1);
}

function soundLoaded() {
  console.log("Sound loaded");
}

function setup() {
  canvasContainer = $("#canvas-container");

  currentP5Instance = new p5(scene1);
}

function actualSetup() {
  let canvas = createCanvas(500, 500, WEBGL);
  // align canvas to center
  canvas.position(windowWidth / 2 - width / 2, windowHeight / 2 - height / 2 - 40);
  canvas.parent("canvas-container");

  rollingSfx = loadSound('../assets/gumball.mp3', soundLoaded);
  rollingSfx.setVolume(1);

  commonSfx = loadSound('../assets/common.mp3');
  commonSfx.setVolume(1);

  rareSfx = loadSound('../assets/rare.mp3');
  rareSfx.setVolume(1);

  epicSfx = loadSound('../assets/epic.mp3');
  epicSfx.setVolume(1);

  createElement("br").parent("canvas-container");
  createElement("br").parent("canvas-container");

  // add instructions
  let instructions = createP("Click the knob to roll the gacha machine!").parent("canvas-container");
  // set instructions below the canvas
  instructions.position(windowWidth / 2 - width / 2 - 75, windowHeight / 2 + height / 2 - 20);

  // Create inventory
  let inventory = createP("Inventory: ").parent("canvas-container");
  inventory.style("font-weight", "bold");
  inventory.position(windowWidth / 2 - width / 2 + 150, windowHeight / 2 + height / 2 + 40);
  
  // Create dropdown
  dropdown = createSelect();
  dropdown.parent(inventory);
  dropdown.changed(() => {
    const selected = dropdown.value();
    const item = obtained.find((i) => i.name === selected);
    if (item) {
      gachaMachine.item = item;
      gachaMachine.shape = item.draw();
      gachaMachine.item.visible = true;
      adjustWordText();
    }
  });

  gachaMachine = new GachaMachine();
}

function draw() {
  if (running) {
    /*
    if (gachaMachine.getRarity() == 0){
      background('#FFFFFF')
    }
    if (gachaMachine.getRarity() == 1){
      background('#FFF999')
    
    }
    if (gachaMachine.getRarity() == 2){
      background('#111999')
    
    }
    if (gachaMachine.getRarity() == 3){
      background('#cc4343')
    
    }
    if (gachaMachine.getRarity() == 4){
      background('#FFF000')
    
    }
    if (gachaMachine.getRarity() == 5){
      background('#FFF000')
    
    }
    if (gachaMachine.getRarity() == 6){
      background('#220fff')
    
    }
    if (gachaMachine.getRarity() == 7){
      background('#3C2350')
    
    }
    if (gachaMachine.getRarity() == 8){
      background('#27a31c')
    
    }
    if (gachaMachine.getRarity() == 9){
      background('#000000')
    
    }
    */

    background('#3C2350');
    lights();
  
    // Move the 3D text forward along the z-axis
    push();
    translate(0, 150, 85); // Adjust the z value as needed to move the text forward
    if (gachaMachine.item.visible) {
      wordText.show();
    }
    pop();
  
    // Draw the Gacha Machine
    gachaMachine.draw();
  }
}

function mousePressed() {
  if (running) {
    gachaMachine.handleMousePressed(mouseX, mouseY);
  } else {
    currentP5Instance.remove();
    running = true;
    actualSetup();
  }
}

function mouseDragged() {
  if (running) {
    const xShift = (mouseY - pmouseY) / 100;
    const yShift = (mouseX - pmouseX) / 100;
    gachaMachine.rotateItem(xShift, yShift);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('#3C2350');
}

function adjustWordText() {
  let statement = "You got a " + gachaMachine.item.name + "!" + " \nRarity: " + gachaMachine.getRarity();
    
  wordText = new Word3D(
    statement,       // The actual character that you want to draw (anything that can be passed into "text()")
    20,             // How thick the 3D rendered letter is (i.e. how many cube pixels of size "size" it is on z-axis)  
    0.4,     // The size of a unit "box()" making up part of the letter  
    40,            // The size of the canvas it renders the letter on (higher is more detailed, 30-40 is a good range)  
    false,          // [OPTIONAL, default = true] Gives the bevelled, embossed 3D look (as seen in screenshot)  
    myFont,     // [OPTIONAL, default = "Georgia"] Gives the font uses, can be any default ones or anything added  
    BOLD           // [OPTIONAL, default = BOLD] Gives the chosen style out of BOLD, NORMAL, ITALIC  
  );
}

class GachaMachine {
  constructor() {
    this.rollclick = 0;
    this.item = new Gacha();
    this.shape = this.item.draw();
    this.translation = { x: 0, y: -50, z: -200 }; // Translation properties
    this.knob = { x: this.translation.x, y: this.translation.y - 25, z: this.translation.z + 50};
    this.rolls = 0;
    this.gacha_flag = false;
    this.vibrating = true;
    this.canRoll = true;
  }

  rerollShape() {
    this.item = new Gacha();
    this.shape = this.item.draw();
    adjustWordText();
  }

  getRarity() {
    return this.item.getRarity();
  }

  handleMousePressed(x, y) {
    if (!this.canRoll) {
      return;
    }

    if (x - 250 <= this.knob.x + 20 && x - 250 >= this.knob.x - 20 && y - 275 <= this.knob.y + 20 && y - 275 >= this.knob.y - 20) {
      this.rollclick += 1;
      this.rerollShape();
      // hide the item
      this.item.hide();
      if (this.rollclick % 2 == 0)
        this.vibrating = true;
      else {
        this.vibrating = false;
        rollingSfx.play();
      }
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
    push();
      if (this.getRarity() == 0) {
        fill(255, 255, 255);
      } else if (this.getRarity() == 1) {
        fill(0, 255, 0);
      } else if (this.getRarity() == 2) {
        fill(0, 0, 255);
      } else if (this.getRarity() == 3) {
        fill(255, 0, 0);
      } else if (this.getRarity() == 4) {
        fill(255, 255, 0);
      } else if (this.getRarity() == 5) {
        fill(255, 0, 255);
      } else if (this.getRarity() == 6) {
        fill(0, 255, 255);
      } else if (this.getRarity() == 7) {
        fill(255, 255, 255);
      } else if (this.getRarity() == 8) {
        fill(0, 0, 0);
      } else if (this.getRarity() == 9) {
        fill(255, 255, 255);
      }
      if(this.rollclick%2 == 1 && this.rolls < 200 && this.gacha_flag == false) {
        this.canRoll = false;
        this.rolls += 1;
      }
      if(this.rolls >= 200){
        this.vibrating = false;
        this.item.visible = true;
        this.gacha_flag = true;
        this.rolls = 0;

        obtained.push(this.item);
        dropdown.option(this.item.name);

        if (this.getRarity() <= 2) {
          commonSfx.play();
        } else if (this.getRarity() <= 4) {
          rareSfx.play();
        } else {
          epicSfx.play();
        }

        this.canRoll = true;
      }
      if(this.rollclick%2 == 0){
        this.rolls = 0;
        this.gacha_flag = false;
      }
      translate(0, this.rolls/2, this.rolls)
      sphere(15);
    pop();
    fill(0, 0, 0);
    box(30)
    push();
      translate(0, 0, 15);
      rotateX(HALF_PI * (this.rollclick%2));
      translate(0, 14 * (this.rollclick%2), 15 * (this.rollclick%2));
      fill(255, 255, 255);
      box(30, 30, 1);
    pop();
    translate(0, -5, -11);
    translate(0, -125, -50);

    this.drawSpheres();

    fill(250, 250, 250, 100);
    sphere(70);
    translate(0, 125, 50);
    pop();

    if (this.item.visible) {
      model(this.shape);
    }
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
      let offsetX = 0;
      let offsetY = 0;
      let offsetZ = 0;

      // if vibrating, add some random offset
      if (this.vibrating) {
        offsetX = random(-5, 5);
        offsetY = random(-5, 5);
        offsetZ = random(-5, 5);
      }
      
      translate(pos.x + offsetX, pos.y + offsetY, pos.z + offsetZ);
      fill(...pos.color);
      sphere(15);
      pop();
    }
  }
}
