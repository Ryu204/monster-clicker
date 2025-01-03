import { Scene } from "phaser";
import { keys, scenes } from "../constants";
import { centerOnCamera, setBackground } from "../utils/layout";
import { addButton } from "../utils/button";

export default class MenuScene extends Scene {
  constructor() {
    super({ key: scenes.menu });
  }

  create(): void {
    const bgr = this.add.image(0, 0, keys.background);
    setBackground(bgr, this.cameras.main);
    this.sound.add(keys.mainMenuMusic).play();
    const startButton = addButton(
      this,
      keys.primaryButton,
      { up: 0, pressed: 1 },
      { scale: 2 },
      { text: "Play" }
    );
    centerOnCamera(startButton, this.cameras.main);
  }
}
