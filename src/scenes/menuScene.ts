import { Scene } from "phaser";
import { keys, gameSize, scenes } from "../constants";
import assets from "../assets";
import { setBackground } from "../utils/background";

export default class MenuScene extends Scene {
  constructor() {
    super({ key: scenes.menu });
  }

  preload(): void {
    this.load.image(keys.background, assets.randomBackground());
    this.load.audio(keys.mainMenuMusic, assets.mainMenuMusic);
  }

  create(): void {
    const bgr = this.add.image(0, 0, keys.background);
    setBackground(bgr, this.cameras.main);
    this.sound.add(keys.mainMenuMusic).play();
  }
}
