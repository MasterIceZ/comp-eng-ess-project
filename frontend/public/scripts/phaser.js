import { gameUtils } from "./gameUtils.js";
import { handleGraphics } from "./handleGraphics.js";

let lastFetchTime = 0;
const fetchInterval = 1000;

const config = {
  type: Phaser.AUTO,
  width: gameUtils.SCREEN_SIZE.w,
  height: gameUtils.SCREEN_SIZE.h,
  parent: "gameContainer",
  backgroundColor: 0xd3d3d3,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("icon0", "./assets/cat-icon.jpg");
  this.load.image("icon1", "./assets/panda-icon.jpg");
  this.load.image("icon2", "./assets/rabbit-icon.jpg");
  this.load.image("icon3", "./assets/sloth-icon.jpg");
}

async function create() {
  await handleGraphics.render(this);
  const points = [];
    for (let i = 0; i < 6; i++) {
      const angleRad = (Math.PI / 180) * (60 * i + 30);
      points.push(handleGraphics.HEX_RADIUS * Math.cos(angleRad));
      points.push(handleGraphics.HEX_RADIUS * Math.sin(angleRad));
    }

    for (let i = -3; i <= 3; ++i) {
      for (let j = -3; j <= 3; ++j) {
        let color = handleGraphics.BOARD_COLOR;
        let x =
          j * handleGraphics.HEX_X_OFFSET +
          (i % 2 == 0 ? 0 : handleGraphics.HEX_WIDTH / 2);
        let y = i * handleGraphics.HEX_Y_OFFSET;
        x += gameUtils.SCREEN_SIZE.w / 2 + handleGraphics.HEX_WIDTH / 2;
        y += gameUtils.SCREEN_SIZE.h / 2 + handleGraphics.HEX_HEIGHT / 2;
        const poly = this.add.polygon(
          x,
          y,
          points,
          color,
          1 //opacity
        );
        poly.setInteractive(
          new Phaser.Geom.Polygon(points),
          Phaser.Geom.Polygon.Contains
        );
        poly.setStrokeStyle(
          handleGraphics.HEX_BORDER_WIDTH,
          handleGraphics.HEX_BORDER_STROKE_COLOR
        );
        poly.on("pointerdown", async () => {
          await handleMovePlayer(
            i,
            j,
            new URLSearchParams(window.location.search).get("room")
          );
          console.log(i, j);
        });
      }
    }
}

async function update(time, delta) {
  lastFetchTime += delta;
  if (lastFetchTime >= fetchInterval) {
    await handleGraphics.render(this);
  }
}
