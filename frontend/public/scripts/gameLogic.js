import { handleMovePlayer } from "./handleApi.js";

export class gameLogic {
  static async handleClick(currentTile) {
    await handleMovePlayer(currentTile);
  }
}
