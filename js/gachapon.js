/* List of all variables that an object can be generated with and all associated
 * weights for those to appear in
 */

//Base shape of object
const BASES = ["box", "sphere", "cylinder"];
const COLORS = ["white", "red", "blue", "green", "gold"];
const COLORS_WEIGHTS = [10, 3, 3, 3, 1];

// Hat for the object
const HATS = ["none", "cone", "top_hat"];
const HATS_WEIGHT = [5, 2, 2];
const HAT_COLOR = ["black", "purple", "silver"];
const HAT_COLOR_WEIGHT = [4, 4, 2];

/* Helper function to randomly select a trait based on a list of traits and corresponding
 * weights associated to it
 * Input: list - a list of traits that can be applied to
 *        weight - a list of integers corresponding to how often item in list appears
 * Output: A random item in list based of the weights
 */
function randomWeighted(list, weights) {
  let temp = [];
  if (list.length == weights.length) {
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < weights[i]; j++) {
        temp.push(list[i]);
      }
    }
  }

  return random(temp);
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
    this.baseColor = randomWeighted(COLORS, COLORS_WEIGHTS);

    this.size = floor(random(20, 100));
    this.hat = randomWeighted(HATS, HATS_WEIGHT);
    this.hatColor = randomWeighted(HAT_COLOR, HAT_COLOR_WEIGHT);
  }

  regenerate() {
    this.generate();
    this.draw();
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

    pop();

    // Stop building the p5.Geometry object and saves it to shape.
    return endGeometry();
  }
}
