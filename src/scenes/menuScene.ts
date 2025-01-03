import { Scene } from "phaser";
import { keys, scenes } from "../constants";
import { centerOnCamera, setBackground } from "../utils/layout";
import { addButton } from "../utils/button";
import LayeredMusic from "../components/layeredMusic";
import assets from "../assets";

export default class MenuScene extends Scene {
  private music!: LayeredMusic;

  constructor() {
    super({ key: scenes.menu });
  }

  create(): void {
    const bgr = this.add.image(0, 0, keys.background);
    setBackground(bgr, this.cameras.main);

    this.music = new LayeredMusic(this, Object.keys(assets.music.menu))
      .setLayers("all")
      .play();

    const startButton = addButton(
      this,
      keys.primaryButton,
      { up: 0, pressed: 1 },
      { scale: 2 },
      { text: "Play" },
      () => {
        this.scene.start(scenes.game);
        this.music.stop();
      }
    );
    centerOnCamera(startButton, this.cameras.main);
  }
}
