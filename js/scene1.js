const scene1 = (p) => {
    let cloud1X, cloud2X, cloud3X;
    let sunY, moonY;
    let transitionDuration = 30000; // 30 seconds
    let transitionStart;
  
    p.setup = function() {
      let canvas = p.createCanvas(800, 600);
      canvas.parent("canvas-container");

      p.createElement("br").parent("canvas-container");
      p.createElement("br").parent("canvas-container");

      // add instructions
      p.createP("Click to play!").parent("canvas-container");

      // Initialize cloud positions
      cloud1X = 600;
      cloud2X = 200;
      cloud3X = 400;
      // Initialize sun and moon positions
      sunY = 80;
      moonY = -80;
      // Start the transition
      transitionStart = p.millis();
    };
  
    p.draw = function() {
      // Calculate the current progress of the transition
      let elapsedTime = p.millis() - transitionStart;
      let transitionProgress = p.constrain(elapsedTime / transitionDuration, 0, 1);
  
      // Sky color transition from light blue to navy and back
      let skyColor;
      if (transitionProgress < 0.25) {
        skyColor = p.lerpColor(p.color(135, 206, 235), p.color(0, 0, 128), transitionProgress * 4);
      } else if (transitionProgress < 0.5) {
        skyColor = p.color(0, 0, 128);
      } else if (transitionProgress < 0.75) {
        skyColor = p.lerpColor(p.color(0, 0, 128), p.color(135, 206, 235), (transitionProgress - 0.5) * 4);
      } else {
        skyColor = p.color(135, 206, 235);
      }
      p.background(skyColor);
  
      // Sun and moon positions
      let sunX = 80;
      let moonX = 80;
      if (transitionProgress < 0.25) {
        // Move the sun up
        sunY = p.lerp(80, -80, transitionProgress * 4);
      } else if (transitionProgress >= 0.25 && transitionProgress < 0.5) {
        // Move the moon down
        moonY = p.lerp(-80, 80, (transitionProgress - 0.25) * 4);
      } else if (transitionProgress >= 0.5 && transitionProgress < 0.75) {
        // Move the moon up
        moonY = p.lerp(80, -80, (transitionProgress - 0.5) * 4);
      } else {
        // Move the sun down
        sunY = p.lerp(-80, 80, (transitionProgress - 0.75) * 4);
      }
  
      // Sun
      p.fill(255, 223, 0); // Bright yellow color
      p.ellipse(sunX, sunY, 100, 100);
  
      // Moon
      p.fill(192); // Light grey color
      p.ellipse(moonX, moonY, 100, 100);
  
      // Clouds
      drawCloud(cloud1X, 100);
      drawCloud(cloud2X, 150);
      drawCloud(cloud3X, 80);
  
      // Update cloud positions for movement
      cloud1X += 0.4;
      cloud2X += 0.3;
      cloud3X += 0.2;
  
      // Reset cloud positions if they move off screen
      if (cloud1X > p.width + 60) {
        cloud1X = -60;
      }
      if (cloud2X > p.width + 60) {
        cloud2X = -60;
      }
      if (cloud3X > p.width + 60) {
        cloud3X = -60;
      }
  
      // Perlin noise hill
      drawHill();
  
      // Ground
      p.fill(34, 139, 34); // Forest green color for the ground
      p.rect(0, 400, p.width, 100); // Ground occupying the area below the hill
  
      // Concrete sidewalk/parking lot
      p.fill(169, 169, 169); // Grey color for the concrete
      p.rect(0, 500, p.width, 100); // Concrete area occupying the bottom
  
      // Store building
      p.fill(245, 245, 220); // Light beige color
      p.rect(150, 200, 500, 300); // Store main structure
  
      // Roof
      p.fill(139, 69, 19); // Brown color
      p.triangle(150, 200, 400, 50, 650, 200); // Roof
  
      // Door
      p.fill(160, 82, 45); // Sienna color
      p.rect(350, 350, 100, 150); // Door
  
      // Windows
      p.fill(173, 216, 230); // Light blue color
      p.rect(200, 250, 100, 100); // Left window
      p.rect(500, 250, 100, 100); // Right window
  
      // Store signboard
      p.fill(255, 215, 0); // Gold color
      p.rect(290, 150, 220, 50); // Signboard base
  
      p.fill(0); // Black color for text
      p.textSize(28);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('GACHA STORE', 400, 175); // Signboard text
  
      // Check if the transition is complete, then restart
      if (transitionProgress >= 1) {
        transitionStart = p.millis();
        sunY = 80;
        moonY = -80;
      }
    };
  
    function drawCloud(x, y) {
      p.fill(255); // White color
      p.noStroke();
      p.ellipse(x, y, 60, 40); // Main part of the cloud
      p.ellipse(x + 20, y + 10, 60, 40); // Right part of the cloud
      p.ellipse(x - 20, y + 10, 60, 40); // Left part of the cloud
      p.ellipse(x + 40, y, 60, 40); // Far right part of the cloud
      p.ellipse(x - 40, y, 60, 40); // Far left part of the cloud
    }
  
    function drawHill() {
      p.fill(85, 107, 47); // Dark olive green color for the hill
      p.beginShape();
      let xoff = 0; // Start x offset for Perlin noise
      for (let x = 0; x <= p.width; x += 10) {
        let y = p.map(p.noise(xoff), 0, 1, 300, 450);
        p.vertex(x, y);
        xoff += 0.05; // Increment x offset
      }
      p.vertex(p.width, p.height);
      p.vertex(0, p.height);
      p.endShape(p.CLOSE);
    }
  };
  