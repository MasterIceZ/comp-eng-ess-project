import { gameUtils } from "./gameUtils.js";
import { fetchPlayerAPI } from "./handleApi.js";
import { handleMovePlayer } from "./handleApi.js";

export class handleGraphics {
  static HEX_RADIUS = 45;
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
  static PLAYER_DEAD_INFO_COLOR = 0x808080;
  static ICON_SCALE = 0.02;
  static ICON_RADIUS = 35;
  static FONT_FAMILY = "Arial";
  static TITLE_FONT_FAMILY = "Helvetica";
  static BOARD_COLOR = 0xfff9e3;

  static playersOnMap = [];
  static bombs = [];
  static currentTurn = 1;

  static async render(scene) {
    await handleGraphics.fetchPlayerData();
    scene.children.removeAll(true);
    handleGraphics.renderBoard(scene);
    handleGraphics.renderPlayerData(scene);
    handleGraphics.renderPlayerOnBoard(scene);
    handleGraphics.renderBomb(scene);
    handleGraphics.renderPlayerTurn(scene);
  }

  static async renderBoard(scene) {
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

  static async renderPlayerData(scene) {
    // console.log(handleGraphics.playersOnMap);
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
          player.health > 0
            ? handleGraphics.PLAYER_INFO_COLOR
            : handleGraphics.PLAYER_DEAD_INFO_COLOR,
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
    return player.name + "\n" + "❤️: " + player.health;
  }

  static async renderBomb(scene) {
    for (let b = 0; b < this.bombs.length; ++b) {
      const bomb = handleGraphics.bombs[b];
      const i = bomb.x,
        j = bomb.y;
      let x =
        j * handleGraphics.HEX_X_OFFSET +
        (i % 2 == 0 ? 0 : handleGraphics.HEX_WIDTH / 2);
      let y = i * handleGraphics.HEX_Y_OFFSET;
      x += gameUtils.SCREEN_SIZE.w / 2;
      y += gameUtils.SCREEN_SIZE.h / 2;

      const text = scene.add
        .text(x, y, "💣", {
          align: "center",
          fontFamily: handleGraphics.FONT_FAMILY,
          fontSize: "32px",
          fill: "#000",
        })
        .setOrigin(0.5, 0.5);
    }
  }

  static async renderPlayerTurn(scene) {
    const text = scene.add
      .text(
        gameUtils.SCREEN_SIZE.w / 2,
        gameUtils.SCREEN_SIZE.h * 0.95,
        `${
          handleGraphics.playersOnMap[handleGraphics.currentTurn].name
        }'s turn to move`,
        {
          align: "center",
          // fontFamily: handleGraphics.TITLE_FONT_FAMILY,
          fontSize: "32px",
          fill: "#ff0000",
        }
      )
      .setOrigin(0.5, 1);
  }

  static renderTitle(scene) {
    //TODO
  }

  static async renderPlayerOnBoard(scene) {
    for (let p = 0; p < 4; ++p) {
      const player = handleGraphics.playersOnMap[p];
      if (player.health <= 0) continue;
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

  static async fetchPlayerData() {
    const roomNumber = new URLSearchParams(window.location.search).get("room");
    const data = await fetchPlayerAPI(roomNumber).then((data) => {
      handleGraphics.playersOnMap = data.playersOnMap;
      handleGraphics.bombs = data.bombs;
      handleGraphics.currentTurn = data.currentTurn;
    });
  }
}
