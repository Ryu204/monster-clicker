import { Scene } from "phaser";
import { keys, scenes } from "../constants";
import { setBackground } from "../utils/layout";

export default class GameScene extends Scene {
  constructor() {
    super({ key: scenes.game });
  }

  create(): void {
    const bgr = this.add.image(0, 0, keys.background);
    setBackground(bgr, this.cameras.main);
  }
}
