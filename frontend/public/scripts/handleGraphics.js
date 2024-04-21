import { gameUtils } from "./gameUtils.js";
import { gameLogic } from "./gameLogic.js";

export class handleGraphics {
  static HEX_RADIUS = 50;
  static HEX_BORDER_WIDTH = 4;
  static HEX_BORDER_STROKE_COLOR = 0x20211A;
  static HEX_WIDTH = Math.sqrt(3) * handleGraphics.HEX_RADIUS;
  static HEX_HEIGHT = 2 * handleGraphics.HEX_RADIUS;
  static HEX_X_OFFSET = handleGraphics.HEX_WIDTH * 1;
  static HEX_Y_OFFSET = handleGraphics.HEX_HEIGHT* 0.75;
  static PLAYER_INFO_WIDTH = gameUtils.SCREEN_SIZE.w / 5;
  static PLAYER_INFO_HEIGHT = gameUtils.SCREEN_SIZE.h / 10;  
  static PLAYER_INFO_BORDER_WIDTH = 4;
  static PLAYER_INFO_BORDER_STROKE_COLOR = 0x20211A;
  static PLAYER_INFO_COLOR = 0xDCC486;

  static mapTiles = [] //maps tile datas (to be fetched, currently hard coded lol)
  static playersOnMap = [] //player datas (to be fetched, currently hard codrd lol)

  constructor() {
    for (let i = -3; i <= 3; ++i) {
      for (let j = -3; j <= 3; ++j) {
        handleGraphics.mapTiles.push({
          x: i,
          y: j,
          type: ((i+j) % 2 === 0 ? "tree" : "stone"),
          owner: (i % 2 === 0 ? "spad1e" : "icy"),
        });
      }
    }

    handleGraphics.playersOnMap.push({
      name: "spad1e",
      color: 0xfb607f,
      id: 0,
      hp: 20,
      atk: 3,
      wood: 20,
      stone: 20,
      metal: 10,
      x: 3,
      y: 3,
    });

    handleGraphics.playersOnMap.push({
      name: "someone",
      color: 0x421313,
      id: 1,
      hp: 20,
      atk: 3,
      wood: 20,
      stone: 20,
      metal: 10,
      x: -3,
      y: -3,
    });

    handleGraphics.playersOnMap.push({
      name: "icy",
      color: 0x89cff0,
      id: 2,
      hp: 20,
      atk: 3,
      wood: 20,
      stone: 20,
      metal: 10,
      x: -3,
      y: 3,
    });

    handleGraphics.playersOnMap.push({
      name: "something",
      color: 0x492010,
      id: 3,
      hp: 20,
      atk: 3,
      wood: 20,
      stone: 20,
      metal: 10,
      x: 3,
      y: -3,
    });
  }

  static render(scene) {
    handleGraphics.renderMap(scene);
    handleGraphics.renderPlayerData(scene);
  }

  static renderMap(scene) {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angleRad = (Math.PI / 180) * (60 * i + 30);
      points.push(handleGraphics.HEX_RADIUS * Math.cos(angleRad));
      points.push(handleGraphics.HEX_RADIUS * Math.sin(angleRad));
    }
  
    handleGraphics.mapTiles.forEach(currentTile => {
      let currentOwner = null;
      for (let i = 0; i < 4; ++i) {
        if (currentTile.owner == handleGraphics.playersOnMap[i].name) currentOwner = handleGraphics.playersOnMap[i];
      }
      const color = currentOwner.color;
      const i = currentTile.x, j = currentTile.y;
      const x = j * handleGraphics.HEX_X_OFFSET + (Math.abs(i) % 2 === 1 ? handleGraphics.HEX_WIDTH / 2 : 0);
      const y = i * handleGraphics.HEX_Y_OFFSET;
      const poly = scene.add.polygon(
        gameUtils.SCREEN_SIZE.w / 2 + x + handleGraphics.HEX_WIDTH / 2,
        gameUtils.SCREEN_SIZE.h / 2 + y + handleGraphics.HEX_HEIGHT / 2,
        points,
        color,
        1 //opacity
      );
      poly.setStrokeStyle(handleGraphics.HEX_BORDER_WIDTH, handleGraphics.HEX_BORDER_STROKE_COLOR);
      poly.setInteractive();
      poly.on(
        "pointerdown", 
        gameLogic.handleClick
      )
    });
  }

  static renderPlayerData(scene) {
    for (let i = 0; i < 4; ++i) {
      const player = handleGraphics.playersOnMap[i];
      const rect = scene.add.rectangle(
        (player.id % 2 === 0 ? handleGraphics.PLAYER_INFO_WIDTH / 2 : gameUtils.SCREEN_SIZE.w - handleGraphics.PLAYER_INFO_WIDTH / 2), 
        (player.id < 2 ? handleGraphics.PLAYER_INFO_HEIGHT / 2 : gameUtils.SCREEN_SIZE.h - handleGraphics.PLAYER_INFO_HEIGHT / 2),
        handleGraphics.PLAYER_INFO_WIDTH,
        handleGraphics.HEX_HEIGHT,
        handleGraphics.PLAYER_INFO_COLOR,
        1,
      );
      rect.setStrokeStyle(handleGraphics.PLAYER_INFO_BORDER_WIDTH, handleGraphics.PLAYER_INFO_BORDER_STROKE_COLOR);
      
    }
  } 
}