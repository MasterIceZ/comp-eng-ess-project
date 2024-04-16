const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  parent: "gameContainer",
  scene: {
    preload: preload,
    create: create,
    update: update,
  },

};

const game = new Phaser.Game(config);

function preload() {}

function create() {
  /* -------- CONFIG -------- */
  const hexRadius = 20; // Radius of each hexagon
  
  const lineWidth = 1
  const fillOpacity = 1
  const strokeColor = 0xF3D0D7
  const fillColor = 0xFFEFEF
  
  const rows = 7;
  const cols = 7;
  /* ------------------------ */

  const hexWidth = Math.sqrt(3) * hexRadius;
  const hexHeight = 2 * hexRadius;

  const xOffset = hexWidth * 1;
  const yOffset = hexHeight * 0.75;

  const points = [];
  for (let i = 0; i < 6; i++) {
      const angleRad = (Math.PI / 180) * (60 * i + 30);
      points.push(hexRadius * Math.cos(angleRad));
      points.push(hexRadius * Math.sin(angleRad));
  }

  for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
          // Calculate the **relative** position of each hexagon
          const x = j * xOffset + hexWidth / 2 + (i % 2 === 1 ? hexWidth / 2 : 0);
          const y = i * yOffset + hexHeight / 2;

          // Draw the hexagon
          const poly = this.add.polygon(x + hexRadius, y + hexRadius, points, fillColor, fillOpacity);
          poly.setStrokeStyle(lineWidth, strokeColor)
      }
  }
}

function update() {}

