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
}

async function update(time, delta) {
  lastFetchTime += delta;
  if (lastFetchTime >= fetchInterval) {
    await handleGraphics.render(this);
  }
}
