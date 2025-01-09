import { Scene } from "phaser";
import { keys, scenes } from "../constants";
import { centerOnCamera, setBackground } from "../utils/layout";
import { createIconButton } from "../components/button";
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
        this.scene.switch(scenes.game);
      },
      ButtonColor.yellow
    );
    centerOnCamera(startButton, this.cameras.main);
    this.setupSceneEvent();
  }

  private setupSceneEvent(): void {
    this.events.on("wake", () => this.music.play());
    this.events.on("sleep", () => this.music.stop());
  }
}
