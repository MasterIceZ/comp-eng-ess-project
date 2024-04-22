import { gameUtils } from "./gameUtils.js";
import { gameLogic } from "./gameLogic.js";
import { fetchMapAndPlayerAPI } from "./handleApi.js";

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
  static FONT_FAMILY = "Arial";

  static COLOR = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];
  static mapTiles = []; //maps tile datas (to be fetched, currently hard coded lol)
  static playersOnMap = []; //player datas (to be fetched, currently hard codrd lol)

  constructor() {
    handleGraphics.fetchMapAndPlayerData();
  }

  static async render(scene) {
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

    // console.log(handleGraphics.mapTiles);

    handleGraphics.mapTiles.forEach((currentTile) => {
      let currentOwner = null;
      let color = null;
      for (let p = 0; p < 4; ++p) {
        if (currentTile.owner == handleGraphics.playersOnMap[p].name) {
          currentOwner = handleGraphics.playersOnMap[p];
          color = this.COLOR[p];
        }
      }
      const i = currentTile.x,
        j = currentTile.y;
      let x =
        j * handleGraphics.HEX_X_OFFSET +
        (i % 2 == 0 ? 0 : handleGraphics.HEX_WIDTH / 2);
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
      poly.setInteractive(
        new Phaser.Geom.Polygon(points),
        Phaser.Geom.Polygon.Contains
      );
      poly.setStrokeStyle(
        handleGraphics.HEX_BORDER_WIDTH,
        handleGraphics.HEX_BORDER_STROKE_COLOR
      );
      poly.on("pointerdown", () => gameLogic.handleClick(currentTile));
    });
  }

  static async renderPlayerData(scene) {
    // console.log(handleGraphics.playersOnMap);
    await handleGraphics.fetchMapAndPlayerData();
    for (let p = 0; p < 4; ++p) {
      const player = handleGraphics.playersOnMap[p];
      // console.log(player);
      const x =
        p % 2 === 0
          ? handleGraphics.PLAYER_INFO_WIDTH / 2
          : gameUtils.SCREEN_SIZE.w - handleGraphics.PLAYER_INFO_WIDTH / 2;
      const y =
        p < 2
          ? handleGraphics.PLAYER_INFO_HEIGHT / 2
          : gameUtils.SCREEN_SIZE.h - handleGraphics.PLAYER_INFO_HEIGHT / 2;
      const rect = scene.add
        .rectangle(
          x,
          y,
          handleGraphics.PLAYER_INFO_WIDTH,
          handleGraphics.PLAYER_INFO_HEIGHT,
          handleGraphics.PLAYER_INFO_COLOR,
          1
        )
        .setStrokeStyle(
          handleGraphics.PLAYER_INFO_BORDER_WIDTH,
          handleGraphics.PLAYER_INFO_BORDER_STROKE_COLOR
        );

      const text = scene.add
        .text(x, y, handleGraphics.getPlayerString(player), {
          align: "center",
          fontFamily: handleGraphics.FONT_FAMILY,
          fontSize: "24px",
          fill: "#000",
        })
        .setOrigin(0.5, 0.5);

      const graphics = scene.add.graphics();
      graphics.fillCircle(
        x,
        y - handleGraphics.PLAYER_INFO_HEIGHT / 4,
        handleGraphics.ICON_RADIUS
      );

      const icon = scene.add
        .image(x, y - handleGraphics.PLAYER_INFO_HEIGHT / 4, `icon${p}`)
        .setScale(handleGraphics.ICON_SCALE)
        .setMask(graphics.createGeometryMask());
    }
  }

  static getPlayerString(player) {
    return (
      player.name +
      "\n" +
      "🛡️: " +
      player.health +
      "   " +
      "⚔️: " +
      player.power +
      "\n" +
      "🪵: " +
      player.materials.wood +
      "   " +
      "🪨: " +
      player.materials.rock
    );
  }

  static async renderPlayerOnBoard(scene) {
    for (let p = 0; p < 4; ++p) {
      const player = handleGraphics.playersOnMap[p];
      // console.log(player);
      const i = player.x,
        j = player.y;
      let x =
        j * handleGraphics.HEX_X_OFFSET +
        (i % 2 == 0 ? 0 : handleGraphics.HEX_WIDTH / 2);
      let y = i * handleGraphics.HEX_Y_OFFSET;
      x += gameUtils.SCREEN_SIZE.w / 2;
      y += gameUtils.SCREEN_SIZE.h / 2;

      const graphics = scene.add.graphics();
      graphics.fillCircle(x, y, handleGraphics.ICON_RADIUS);

      const icon = scene.add.image(x, y, `icon${p}`);
      icon.setScale(handleGraphics.ICON_SCALE);
      icon.setMask(graphics.createGeometryMask());
    }
  }

  static async fetchMapAndPlayerData() {
    //TODO: link to backend
    // console.log("fetching map and player data");
    const roomNumber = new URLSearchParams(window.location.search).get("room");
    const data = await fetchMapAndPlayerAPI(roomNumber).then((data) => {
      handleGraphics.mapTiles = data.mapTiles;
      handleGraphics.playersOnMap = data.playersOnMap;
    });
    // console.log(handleGraphics.mapTiles, handleGraphics.playersOnMap);
  }
}
