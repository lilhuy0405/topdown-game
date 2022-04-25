import * as Phaser from "phaser";
import MapScene from "./MapScene";

export default class MyGame extends Phaser.Game {
  constructor() {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 450,
      backgroundColor: '#2d2d2d',
      pixelArt: true,
      scene: [
        MapScene
      ],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      }
    };
    super(config);
  }
}
new MyGame();