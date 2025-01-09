import { Scene } from "phaser";
import { keys, scenes } from "../constants";
import { centerOnCamera, setBackground } from "../utils/layout";
import { createIconButton, createTextButton } from "../components/button";
import LayeredMusic from "../components/layeredMusic";
import assets, { Icon } from "../assets";
import { ButtonColor, ButtonType } from "../assets/ui/buttons";

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

    const startButton = createIconButton(
      this,
      ButtonType.icon,
      { texture: Icon.play, scale: 0.5 },
      () => {
        this.scene.start(scenes.game);
        this.music.stop();
      },
      ButtonColor.yellow
    );
    centerOnCamera(startButton, this.cameras.main);
    createTextButton(
      this,
      ButtonType.text,
      { text: "Game Over", color: "red", size: 40 },
      () => {
        this.scene.launch(scenes.gameOver);
        this.scene.pause();
      },
      ButtonColor.yellow
    ).copyPosition(startButton).y += 400;
  }
}
