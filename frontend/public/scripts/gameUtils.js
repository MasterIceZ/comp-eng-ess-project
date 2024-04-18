export class gameUtils {
  static devicePixelRatio = window.devicePixelRatio;
  static SCREEN_SIZE = {
    w: window.innerWidth * this.devicePixelRatio,
    h: window.innerHeight * this.devicePixelRatio,
  };
  
}
