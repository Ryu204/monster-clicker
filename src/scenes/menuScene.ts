import { Scene } from "phaser";
import { keys, gameSize } from "../constants";
import assets from "../assets";

export default class MenuScene extends Scene {
  preload(): void {
    this.load.image(keys.background, assets.randomBackground());
  }

  create(): void {
    this.add.image(gameSize.width / 2, gameSize.height / 2, keys.background);
  }
}
