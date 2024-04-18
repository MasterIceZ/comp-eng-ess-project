import { gameUtils } from "./gameUtils.js";

export class handleMap {
  static HEX_RADIUS = 50;
  static HEX_BORDER_WIDTH = 5;
  static HEX_BORDER_STROKE_COLOR = 0x20211A;
  static HEX_WIDTH = Math.sqrt(3) * handleMap.HEX_RADIUS;
  static HEX_HEIGHT = 2 * handleMap.HEX_RADIUS;
  static MAP_TILES = [{
    x: 0,
    y: 0,
    type: "tree",
    owner: "spad1e",
  }] //data storing maps tile (to be fetched, currently hard coded lol)

  constructor() {
    // for (let i = -3; i <= 3; ++i) {
    //   for (let j = -3; j <= 3; ++j) {
    //     handleMap.MAP_TILES.push({
    //       x: i,
    //       y: j,
    //       type: ((i+j) % 2 == 0 ? "tree" : "stone"),
    //       owner: (i % 2 == 0 ? "spad1e" : "icy"),
    //     });
    //   }
    // }
  }

  static renderMap(scene) {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angleRad = (Math.PI / 180) * (60 * i + 30);
      points.push(handleMap.HEX_RADIUS * Math.cos(angleRad));
      points.push(handleMap.HEX_RADIUS * Math.sin(angleRad));
    }
    const xOffset = handleMap.HEX_WIDTH * 1;
    const yOffset = handleMap.HEX_HEIGHT* 0.75;
    
    handleMap.MAP_TILES.forEach(currentTile => {
      console.log(currentTile);
      const color = (currentTile.type == "tree" ? 0xAFE1AF : 0xD3D3D3);
      const i = currentTile.x, j = currentTile.y;
      const x = i * xOffset + handleMap.HEX_WIDTH / 2 + (i % 2 === 1 ? handleMap.HEX_WIDTH / 2 : 0);
      const y = j * yOffset + handleMap.HEX_HEIGHT / 2;
      const poly = scene.add.polygon(
        gameUtils.SCREEN_SIZE.w / 2 - this.HEX_RADIUS,
        gameUtils.SCREEN_SIZE.h / 2 - this.HEX_RADIUS,
        points,
        color,
        1 //opacity
      );
      poly.setStrokeStyle(handleMap.MAP_HEX_BORDER_WIDTH, handleMap.MAP_HEX_BORDER_STROKE_COLOR);
    });
  }
}