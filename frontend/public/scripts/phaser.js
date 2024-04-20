import { gameUtils } from "./gameUtils.js";
import { handleMap } from "./handleMap.js";

const config = {
  type: Phaser.AUTO,
  width: gameUtils.SCREEN_SIZE.w,
  height: gameUtils.SCREEN_SIZE.h,
  parent: "gameContainer",
  backgroundColor: 0xDCC486,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

function preload() {}

function create() {
  new handleMap();
  handleMap.renderMap(this);
}

function update() {}
