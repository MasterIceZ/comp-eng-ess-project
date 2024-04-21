import { gameUtils } from "./gameUtils.js";
import { gameLogic } from "./gameLogic.js";

export class handleGraphics {
  static HEX_RADIUS = 50;
  static HEX_BORDER_WIDTH = 4;
  static HEX_BORDER_STROKE_COLOR = 0x20211a;
  static HEX_WIDTH = Math.sqrt(3) * handleGraphics.HEX_RADIUS;
  static HEX_HEIGHT = 2 * handleGraphics.HEX_RADIUS;
  static HEX_X_OFFSET = handleGraphics.HEX_WIDTH * 1;
  static HEX_Y_OFFSET = handleGraphics.HEX_HEIGHT * 0.75;
  static PLAYER_INFO_WIDTH = gameUtils.SCREEN_SIZE.w / 5;
  static PLAYER_INFO_HEIGHT = gameUtils.SCREEN_SIZE.h / 2;
  static PLAYER_INFO_BORDER_WIDTH = 4;
  static PLAYER_INFO_BORDER_STROKE_COLOR = 0x20211a;
  static PLAYER_INFO_COLOR = 0xdcc486;
  static ICON_SCALE = 0.02;
  static ICON_RADIUS = 37.5;

  static mapTiles = []; //maps tile datas (to be fetched, currently hard coded lol)
  static playersOnMap = []; //player datas (to be fetched, currently hard codrd lol)

  constructor() {
    for (let i = -3; i <= 3; ++i) {
      for (let j = -3; j <= 3; ++j) {
        handleGraphics.mapTiles.push({
          x: i,
          y: j,
          type: (i + j) % 2 === 0 ? "tree" : "stone",
          owner: i % 2 === 0 ? "something" : "icy",
        });
      }
    }

    handleGraphics.playersOnMap.push({
      name: "spad1e",
      color: 0xfb607f,
      id: 3,
      hp: 20,
      atk: 3,
      wood: 20,
      stone: 20,
      x: 3,
      y: 3,
    });

    handleGraphics.playersOnMap.push({
      name: "someone",
      color: 0x421313,
      id: 0,
      hp: 20,
      atk: 3,
      wood: 20,
      stone: 20,
      x: -3,
      y: -3,
    });

    handleGraphics.playersOnMap.push({
      name: "icy",
      color: 0x89cff0,
      id: 1,
      hp: 3000,
      atk: 3,
      wood: 20,
      stone: 20,
      x: -3,
      y: 3,
    });

    handleGraphics.playersOnMap.push({
      name: "something",
      color: 0xffff00,
      id: 2,
      hp: 20,
      atk: 3,
      wood: 20,
      stone: 20,
      x: 3,
      y: -3,
    });
  }

  static render(scene) {
    handleGraphics.renderMap(scene);
    handleGraphics.renderPlayerData(scene);
    handleGraphics.renderPlayerOnBoard(scene);
  }

  static renderMap(scene) {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angleRad = (Math.PI / 180) * (60 * i + 30);
      points.push(handleGraphics.HEX_RADIUS * Math.cos(angleRad));
      points.push(handleGraphics.HEX_RADIUS * Math.sin(angleRad));
    }

    handleGraphics.mapTiles.forEach((currentTile) => {
      let currentOwner = null;
      for (let p = 0; p < 4; ++p) {
        if (currentTile.owner == handleGraphics.playersOnMap[p].name)
          currentOwner = handleGraphics.playersOnMap[p];
      }
      const color = currentOwner.color;
      const i = currentTile.x, j = currentTile.y;
      let x = j * handleGraphics.HEX_X_OFFSET + (i % 2 == 0 ? 0 : handleGraphics.HEX_WIDTH / 2);
      let y = i * handleGraphics.HEX_Y_OFFSET;
      x += gameUtils.SCREEN_SIZE.w / 2 + handleGraphics.HEX_WIDTH / 2; 
      y += gameUtils.SCREEN_SIZE.h / 2 + handleGraphics.HEX_HEIGHT / 2;
      const poly = scene.add.polygon(
        x,
        y,
        points,
        color,
        1 //opacity
      );
      poly.setInteractive(new Phaser.Geom.Polygon(points), Phaser.Geom.Polygon.Contains);
      poly.setStrokeStyle(
        handleGraphics.HEX_BORDER_WIDTH,
        handleGraphics.HEX_BORDER_STROKE_COLOR
      );
      poly.on("pointerdown", () => gameLogic.handleClick(currentTile));
    });
  }

  static renderPlayerData(scene) {
    for (let p = 0; p < 4; ++p) {
      const player = handleGraphics.playersOnMap[p];
      const x =
        player.id % 2 === 0
          ? handleGraphics.PLAYER_INFO_WIDTH / 2
          : gameUtils.SCREEN_SIZE.w - handleGraphics.PLAYER_INFO_WIDTH / 2;
      const y =
        player.id < 2
          ? handleGraphics.PLAYER_INFO_HEIGHT / 2
          : gameUtils.SCREEN_SIZE.h - handleGraphics.PLAYER_INFO_HEIGHT / 2;
      const rect = scene.add.rectangle(
        x,
        y,
        handleGraphics.PLAYER_INFO_WIDTH,
        handleGraphics.PLAYER_INFO_HEIGHT,
        handleGraphics.PLAYER_INFO_COLOR,
        1
      );
      rect.setStrokeStyle(
        handleGraphics.PLAYER_INFO_BORDER_WIDTH,
        handleGraphics.PLAYER_INFO_BORDER_STROKE_COLOR
      );

      const text = scene.add.text(
        x,
        y,
        handleGraphics.getPlayerString(player),
        {
          align: "center",
          fontSize: "24px",
          fill: "#000",
        }
      );
      text.setOrigin(0.5, 0.5);

      const icon = scene.add.image(
        x, 
        y - handleGraphics.PLAYER_INFO_HEIGHT / 4, 
        `icon${player.id}`
      );
      icon.setScale(0.025);
    }
  }

  static getPlayerString(player) {
    return (
      player.name +
      "\n" +
      "🛡️: " +
      player.hp + 
      "   " +
      "⚔️: " +
      player.atk +
      "\n" +
      "🪵: " +
      player.wood +
      "   " +
      "🪨: " +
      player.stone
    );
  }

  static renderPlayerOnBoard(scene) {
    for (let p = 0; p < 4; ++p) {
      const player = this.playersOnMap[p];
      const i = player.x, j = player.y;
      let x = j * handleGraphics.HEX_X_OFFSET + (i % 2 == 0 ? 0 : handleGraphics.HEX_WIDTH / 2);
      let y = i * handleGraphics.HEX_Y_OFFSET;
      x += gameUtils.SCREEN_SIZE.w / 2; 
      y += gameUtils.SCREEN_SIZE.h / 2;
      
      const graphics = scene.add.graphics();
      graphics.fillCircle(x, y, handleGraphics.ICON_RADIUS);

      const icon = scene.add.image(x, y, `icon${player.id}`);
      icon.setScale(handleGraphics.ICON_SCALE);
      icon.setMask(graphics.createGeometryMask());
    }
  }

  static fetchMapAndPlayerData() {
    //TODO: link to backend
  }
}
