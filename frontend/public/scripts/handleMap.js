import { gameUtils } from "./gameUtils.js";

export class handleMap {
  static HEX_RADIUS = 50;
  static HEX_BORDER_WIDTH = 5;
  static HEX_BORDER_STROKE_COLOR = 0x20211A;
  static HEX_WIDTH = Math.sqrt(3) * handleMap.HEX_RADIUS;
  static HEX_HEIGHT = 2 * handleMap.HEX_RADIUS;
  static HEX_X_OFFSET = handleMap.HEX_WIDTH * 1;
  static HEX_Y_OFFSET = handleMap.HEX_HEIGHT* 0.75;
    
  static mapTiles = [] //maps tile datas (to be fetched, currently hard coded lol)
  static players = [] //player datas (to be fetched, currently hard codrd lol)

  constructor() {
    for (let i = -3; i <= 3; ++i) {
      for (let j = -3; j <= 3; ++j) {
        handleMap.mapTiles.push({
          x: i,
          y: j,
          type: ((i+j) % 2 === 0 ? "tree" : "stone"),
          owner: (i % 2 === 0 ? "spad1e" : "icy"),
        });
      }
    }
  }

  static render(scene) {
    this.renderMap(scene);
  }

  static renderMap(scene) {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angleRad = (Math.PI / 180) * (60 * i + 30);
      points.push(handleMap.HEX_RADIUS * Math.cos(angleRad));
      points.push(handleMap.HEX_RADIUS * Math.sin(angleRad));
    }
  
    handleMap.mapTiles.forEach(currentTile => {
      //TODO : change color to render image
      const color = (currentTile.type == "tree" ? 0xAFE1AF : 0xD3D3D3); 
      const i = currentTile.x, j = currentTile.y;
      const x = j * handleMap.HEX_X_OFFSET + (Math.abs(i) % 2 === 1 ? handleMap.HEX_WIDTH / 2 : 0);
      const y = i * handleMap.HEX_Y_OFFSET;
      const poly = scene.add.polygon(
        gameUtils.SCREEN_SIZE.w / 2 + x + handleMap.HEX_RADIUS,
        gameUtils.SCREEN_SIZE.h / 2 + y + handleMap.HEX_RADIUS,
        points,
        color,
        1 //opacity
      );
      poly.setStrokeStyle(handleMap.HEX_BORDER_WIDTH, handleMap.HEX_BORDER_STROKE_COLOR);
    });
  }

  static renderPlayerData(scene) {
    
  }
}