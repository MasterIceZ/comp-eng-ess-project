let config = {
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

let game = new Phaser.Game(config);

function preload() {}

function create() {}

function update() {}
