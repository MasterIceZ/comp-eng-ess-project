import { gameUtils } from "./gameUtils.js";

export class handleMap {
  static HEX_RADIUS = 28;
  static HEX_BORDER_WIDTH = 5;
  static HEX_BORDER_STROKE_COLOR = 0x20211A;
  static HEX_WIDTH = Math.sqrt(3) * handleMap.HEX_RADIUS;
  static HEX_HEIGHT = 2 * handleMap.HEX_RADIUS;
  static HEX_X_OFFSET = handleMap.HEX_WIDTH * 1;
  static HEX_Y_OFFSET = handleMap.HEX_HEIGHT* 0.75;
    
  static MAP_TILES = [] //data storing maps tile (to be fetched, currently hard coded lol)

  constructor() {
    for (let i = -3; i <= 3; ++i) {
      for (let j = -3; j <= 3; ++j) {
        handleMap.MAP_TILES.push({
          x: i,
          y: j,
          type: ((i+j) % 2 == 0 ? "tree" : "stone"),
          owner: (i % 2 == 0 ? "spad1e" : "icy"),
        });
      }
    }
  }

  static renderMap(scene) {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angleRad = (Math.PI / 180) * (60 * i + 30);
      points.push(handleMap.HEX_RADIUS * Math.cos(angleRad));
      points.push(handleMap.HEX_RADIUS * Math.sin(angleRad));
    }
  
    handleMap.MAP_TILES.forEach(currentTile => {
      //TODO : change color to render image
      const color = (currentTile.type == "tree" ? 0xAFE1AF : 0xDCC486); 
      const i = currentTile.x, j = currentTile.y;
      const x = j * handleMap.HEX_X_OFFSET + (Math.abs(i) % 2 === 1 ? 1 : -1) * handleMap.HEX_WIDTH / 4;
      const y = i * handleMap.HEX_Y_OFFSET;
      const poly = scene.add.polygon(
        gameUtils.SCREEN_SIZE.w / 2 + handleMap.HEX_WIDTH / 2 + x,
        gameUtils.SCREEN_SIZE.h / 2 + handleMap.HEX_HEIGHT / 2 + y,
        points,
        color,
        1 //opacity
      );
      poly.setStrokeStyle(handleMap.HEX_BORDER_WIDTH, handleMap.HEX_BORDER_STROKE_COLOR);
    });
  }
}