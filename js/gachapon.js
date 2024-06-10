/* List of all variables that an object can be generated with and all associated
 * weights for those to appear in
 */

//Base shape of object
// "box", "cylinder", "sphere", "sphere2", "torus", "face", "drone", "billy", "pyramid", "mesh", "trippy", "trippy2", "trippy3"
const BASES = ["box", "cylinder", "sphere", "sphere2", "torus", "face", "drone", "billy", "pyramid", "mesh", "trippy", "trippy2", "trippy3"];
const BASES_WEIGHTS = [5, 5, 5, 2, 4, 1, 4, 4, 3, 3, 1, 1, 1];
const COLORS = ["white", "red", "blue", "green", "gold"];
const COLORS_WEIGHTS = [10, 3, 3, 3, 1];

// Hat for the object
const HATS = ["none", "cone", "top_hat", "cap", "bowler_hat", "witch_hat", "party_hat", "straw_hat"];
const HATS_WEIGHT = [7, 2, 2, 2, 2, 2, 1, 1];
const HAT_COLOR = ["black", "purple", "silver", "gray", "teal", "aqua"];
const HAT_COLOR_WEIGHT = [4, 4, 2, 2, 1, 4];

/* Helper function to randomly select a trait based on a list of traits and corresponding
 * weights associated to it
 * Input: list - a list of traits that can be applied to
 *        weight - a list of integers corresponding to how often item in list appears
 * Output: A random item in list based of the weights
 */
function randomWeighted(list, weights) {
  // Get a random weight
  let temp = [];
  let rareFactor = 0;
  let totalWeight = 0;
  if (list.length == weights.length) {
    for (let i = 0; i < list.length; i++) {
      totalWeight += weights[i];
      for (let j = 0; j < weights[i]; j++) {
        temp.push(list[i]);
      }
    }
  }

  // Calculate the rarity
  console.log(list);
  console.log(weights);
  const generatedTrait = random(temp);
  console.log("trait: " + generatedTrait);
  const index = list.indexOf(generatedTrait);
  console.log("index: " + index);
  console.log("total weight: " + totalWeight);
  console.log("cur weight: " + weights[index]);
  const calcRarity = weights[index] / totalWeight;
  console.log("rarity: " + calcRarity);
  if (calcRarity <= 0.1) {
    rareFactor += 3;
  } else if (calcRarity <= 0.25) {
    rareFactor += 1;
  }
  console.log("Rarity Added: " + rareFactor);
  console.log("-------------------------");

  return [generatedTrait, rareFactor];
}

function returnRarity() {
  return rarity;
}

/* Class that stores information related to the generated object
 */
class Gacha {
  constructor() {
    this.visible = false;
    this.generate();
    this.name = generateFunnyName();
  }

  // Function to generate the actual object itself by adding characteristics
  generate() {
    this.base = random(BASES);
    this.size = floor(random(20, 100));
    this.rarity = 0;

    // const genBase = randomWeighted(BASES, BASES_WEIGHTS);
    const genBaseCol = randomWeighted(COLORS, COLORS_WEIGHTS);
    // this.base = genBase[0];
    // this.rarity += genBase[1];
    this.baseColor = genBaseCol[0];
    this.rarity += genBaseCol[1];

    const genHat = randomWeighted(HATS, HATS_WEIGHT);
    this.hat = genHat[0];
    this.rarity += genHat[1];

    const genHatCol = randomWeighted(HAT_COLOR, HAT_COLOR_WEIGHT);
    this.hatColor = genHatCol[0];
    if (this.hat != "none") {
      this.rarity += genHatCol[1];
    }

    this.xAngle = 0;
    this.yAngle = 0;
  }

  regenerate() {
    this.generate();
    this.draw();
  }

  // returns the rarity of the object as an int
  getRarity() {
    return this.rarity;
  }

  // Rotates the obect by (horizontal, verticle)
  rotateItem(x, y) {
    this.xAngle += x;
    this.yAngle += y;
    //this.draw()
  }

  draw() {
    noStroke();

    // Geometry adapted from https://p5js.org/reference/#/p5/beginGeometry
    beginGeometry();

    push();

    translate(0, 80, 0);

    // Rotates the object
    rotateX(this.xAngle)
    rotateY(this.yAngle)

    // Creates the base of the object
    fill(this.baseColor);
    switch(this.base) {
      case "box": 
        box(this.size);
        break;
      case "sphere":
        sphere(this.size);
        break;
      case "sphere2":
        noFill();
        stroke(0);
        this.hat = "none";
        push();
        sphere(this.size);
        pop();
        break;
      case "cylinder": 
        cylinder(this.size / 2, this.size);
        break;
      case "torus":
        push();
        translate(0, this.size / 2, 0);
        torus(this.size, this.size / 4);
        pop();
        break;
      case "face":
        push();
        ellipse(0, 0, this.size, this.size);
        let eyeOffsetX = this.size / 4;
        let eyeOffsetY = -this.size / 6;
        let eyeSize = this.size / 10;
        let smileRadius = this.size / 3;
        let smileYOffset = this.size / 4;

        fill("black"); 
        ellipse(-eyeOffsetX, eyeOffsetY, eyeSize, eyeSize);
        ellipse(eyeOffsetX, eyeOffsetY, eyeSize, eyeSize);

        stroke(1);
        strokeWeight(2);
        arc(0, smileYOffset, this.size/3, this.size/2, 0, PI);

        pop();
        break;
      case "drone":
        push();
        sphere(this.size);
        pop();

        let legLength = this.size / 2;
        let legWidth = 20;
        let legOffset = this.size / 2;

        push();
        translate(legOffset, legOffset, legOffset);
        cylinder(legWidth, legLength);
        pop();

        push();
        translate(-legOffset, legOffset, -legOffset);
        cylinder(legWidth, legLength);
        pop();

        push();
        translate(legOffset, -legOffset, legOffset);
        cylinder(legWidth, legLength);
        pop();

        push();
        translate(-legOffset, -legOffset, -legOffset);
        cylinder(legWidth, legLength);
        pop();
        break;
      case "billy":
        // a very abstract interpretation of a body 
        let y_translation = -10;
        let bodyHeight = this.size * .5;
        let headSize = this.size / 2;
        let armLength = this.size;

        // head + body
        push();
        translate(0, -bodyHeight / 2 - y_translation, 0);
        sphere(headSize);
        pop();

        // legs
        push();
        translate(-headSize/2, bodyHeight / 2 - y_translation, 0);
        cylinder(headSize / 4, bodyHeight);
        pop();

        push();
        translate(headSize/2, bodyHeight / 2 - y_translation, 0);
        cylinder(headSize / 4, bodyHeight);
        pop();

        //arms
        push();
        translate(-armLength / 2, -bodyHeight / 2 - y_translation, 0);
        rotateZ(-HALF_PI*1.5);
        cylinder(headSize / 4, armLength);
        pop();

        push();
        translate(armLength / 2, -bodyHeight / 2 - y_translation, 0);
        rotateZ(HALF_PI*1.5);
        cylinder(headSize / 4, armLength);
        pop();
        break;
      case "pyramid":
        beginShape(TRIANGLES);
        // front
        vertex(0, -this.size, 0);
        vertex(-this.size, this.size, this.size);
        vertex(this.size, this.size, this.size);
  
        // right
        vertex(0, -this.size, 0);
        vertex(this.size, this.size, this.size);
        vertex(this.size, this.size, -this.size);
  
        // back
        vertex(0, -this.size, 0);
        vertex(this.size, this.size, -this.size);
        vertex(-this.size, this.size, -this.size);
  
        // left
        vertex(0, -this.size, 0);
        vertex(-this.size, this.size, -this.size);
        vertex(-this.size, this.size, this.size);
        translate(0, -20);
        endShape(CLOSE);
        break;        
      case "mesh":
        beginShape();
        for (let u = 0; u < TWO_PI; u += 0.2) {
          for (let v = 0; v < TWO_PI; v += 0.2) {
            let x = this.size * cos(u) * (1 + 0.3 * cos(v));
            let y = this.size * sin(u) * (1 + 0.3 * cos(v)) + (this.size * .75);
            let z = this.size * 0.3 * sin(v);
            vertex(x, y, z);
          }
        }
        endShape(CLOSE);
        break;
      case "trippy":  
        this.hat = "none"
        this.rarity = 5; 
        for (let i = 0; i < 20; i++) {
          let angle = TWO_PI / 24 * i;
          let tx = cos(angle) * this.size;
          let ty = sin(angle) * this.size + (this.size*.75);
          let tz = tan(angle) * this.size;

          push();
          translate(tx, ty, tz);
          rotateZ(angle);
          beginShape();
          for (let i = 0; i <= this.size; i += 5) {
            let wave = sin(i * 0.2 + frameCount * 0.3) * (this.size/5);
            vertex(wave, i, 0);
          }
          endShape();
          pop();
        }
        break;
      case "trippy2":  
        this.hat = "none";  
        this.rarity = 5;  
        for (let i = 0; i < 12; i++) {
          let angle = TWO_PI / 12 * i;
          let tx = cos(angle) * this.size;
          let ty = sin(angle) * this.size + (this.size*.75);
          let tz = sin(angle) * this.size;

          push();
          translate(tx, ty, tz);
          rotateZ(angle);
          beginShape();
          for (let i = 0; i <= this.size; i += 4) {
            let wave = sin(i * 0.1 + frameCount * .2) * (this.size/5);
            vertex(wave, i, 0);
            vertex(wave, -i, 10);
          }
          endShape();
          pop();
        }
        break;
      case "trippy3":
        this.hat = "none";
        this.size = 60;   
        this.rarity = 5; 
        for (let i = 0; i < 30; i++) {
          let angle = TWO_PI / 25 * i;
          let angle_squared = angle*angle;
          let tx = angle_squared + sin(4*angle);
          let ty = angle_squared + sin(4*angle);
          let tz = angle_squared + sin(4*angle);

          push();
          translate(tx, ty, tz);
          rotateZ(angle);
          beginShape();
          for (let i = 0; i <= this.size; i += 4) {
            let wave = sin(i * 0.3 + frameCount * .3) * (this.size/5);
            vertex(wave, i, 0);
            vertex(wave, i, 20);
          }
          endShape();
          pop();
        }
        break;    
    }
    // creates the hats of the object
    fill(this.hatColor);
    if (this.hat == "cone") {
      rotateX(PI);
      if (this.base == "face") {
        translate(0, this.size * 2.5/4, 0);
        cone(this.size/2, this.size/2);
      } else if (this.base == "drone") {
        translate(0, this.size * 10/8, 0);
        cone(this.size, this.size);
      } else {
        translate(0, this.size, 0);
        cone(this.size, this.size);
      }
    }

    if (this.hat == "top_hat") {
      rotateX(PI);
      translate(0, (this.size * 3) / 4, 0);
      cylinder((this.size * 3) / 4, (this.size * 1) / 2);
      translate(0, this.size, 0);
      cylinder((this.size * 1) / 2, this.size * 2);
    }

    if (this.hat == "cap") {
      rotateX(PI);
      if (this.base == "sphere") {
        translate(0, this.size, 0);
      } else if (this.base == "torus") {
        translate(0, this.size * 7/8, 0);
      } else if (this.base == "drone") {
        translate(0, this.size, 0);
      } else {
        translate(0, this.size / 2, 0);
      }
      cylinder(this.size / 2, this.size / 2);
      translate(0, -this.size / 8, -this.size / 2);
      box(this.size, this.size / 4, this.size * 3/4);
    }

    if (this.hat == "bowler_hat") {
      rotateX(PI);
      if (this.base == "sphere") {
        translate(0, this.size * 5/4, 0);
      } else if (this.base == "torus") {
        translate(0, this.size * 7/8, 0);
      } else if (this.base == "drone") {
        translate(0, this.size * 10/8, 0);
      } else {
        translate(0, this.size * 3/4, 0);
      }
      sphere(this.size / 4);
      translate(0, -this.size / 8, 0);
      cylinder(this.size/ 4, this.size/4)
      translate(0, -this.size / 8, 0);
      cylinder(this.size / 2, this.size / 8);
    }

    if (this.hat == "witch_hat") {
      rotateX(PI);
      if (this.base == "sphere") {
        translate(0, this.size * 6/4, 0);
      } else if (this.base == "drone") {
        translate(0, this.size * 11/8, 0);
      } else {
        translate(0, this.size, 0);
      }
      cone(this.size / 2, this.size);
      translate(0, -this.size / 2, 0);
      cylinder(this.size, this.size / 6);
    }

    if (this.hat == "party_hat") {
      rotateX(PI);
      if (this.base == "sphere") {
        translate(0, this.size * 5/4, 0);
      } else if (this.base == "torus") {
        translate(0, this.size * 9.5/10, 0);
      } else if (this.base == "drone") {
        translate(0, this.size * 9/8, 0);
      } else if (this.base == "billy") {
        translate(0, this.size * 6/8, 0);
      } else {
        translate(0, this.size * 2/3, 0);
      }
      cone(this.size / 4, this.size / 2);
      translate(0, this.size / 4, 0);
      sphere(this.size / 10)
    }

    if (this.hat == "straw_hat") {
      rotateX(PI);
      if (this.base == "sphere") {
        translate(0, this.size, 0);
      } else if (this.base == "drone") {
        translate(0, this.size * 7/8, 0);
      } else {
        translate(0, this.size * 1/2, 0);
      }
      cylinder(this.size, this.size * 1/4);
      translate(0, this.size * 1/4, 0);
      cylinder((this.size * 1) / 2, this.size * 1/4);
    }

    pop();

    // Stop building the p5.Geometry object and saves it to shape.
    return endGeometry();
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }
}
