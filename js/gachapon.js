/* List of all variables that an object can be generated with and all associated
 * weights for those to appear in
 */

//Base shape of object
const BASES = ["box", "sphere", "cylinder"];
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

/* Class that stores information related to the generated object
 */
class Gacha {
  constructor() {
    this.generate();
  }

  // Function to generate the actual object itself by adding characteristics
  generate() {
    this.base = random(BASES);
    this.size = floor(random(20, 100));
    this.rarity = 0;

    const genBaseCol = randomWeighted(COLORS, COLORS_WEIGHTS);
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

    console.log("Total Rarity: " + this.rarity);
  }

  regenerate() {
    this.generate();
    this.draw();
  }

  // returns the rarity of the object as an int
  getRarity() {
    return this.rarity;
  }

  draw() {
    noStroke();

    // Geometry adapted from https://p5js.org/reference/#/p5/beginGeometry
    beginGeometry();

    push();

    // Creates the base of the object
    fill(this.baseColor);
    if (this.base == "box") {
      box(this.size);
    }
    if (this.base == "sphere") {
      sphere(this.size);
    }
    if (this.base == "cylinder") {
      cylinder(this.size / 2, this.size);
    }

    // creates the hats of the object
    fill(this.hatColor);
    if (this.hat == "cone") {
      rotateX(PI);
      translate(0, this.size, 0);
      cone(this.size, this.size);
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
      } else {
        translate(0, this.size * 3/4, 0);
      }
      sphere(this.size / 4);
      translate(0, -this.size / 5, 0);
      cylinder(this.size/ 4, this.size/2)
      cylinder(this.size / 2, this.size / 8);
    }

    if (this.hat == "witch_hat") {
      rotateX(PI);
      if (this.base == "sphere") {
        translate(0, this.size * 6/4, 0);
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
}
