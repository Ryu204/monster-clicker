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

    const title = this.add
      .image(this.scale.width / 2, 400, keys.title)
      .setOrigin(0.5);
    title.setScale((this.scale.width * 0.8) / title.width);

    this.createButtons();
    this.setupSceneEvent();
  }

  private setupSceneEvent(): void {
    this.events.on("wake", () => this.music.play());
    this.events.on("sleep", () => this.music.stop());
  }

  private createButtons(): void {
    const startButton = createIconButton(
      this,
      ButtonType.icon,
      { texture: Icon.play, scale: 0.5 },
      () => {
        this.scene.switch(scenes.game);
      },
      ButtonColor.yellow
    );
    const settingsButton = createIconButton(
      this,
      ButtonType.icon,
      { texture: Icon.settings, scale: 0.5 },
      () => {
        this.scene.switch(scenes.game);
      },
      ButtonColor.purple,
      0.6
    );
    const highscoreButton = createIconButton(
      this,
      ButtonType.icon,
      { texture: Icon.rankings, scale: 0.5 },
      () => {
        this.scene.switch(scenes.game);
      },
      ButtonColor.green,
      0.7
    );
    const howToPlayButton = createIconButton(
      this,
      ButtonType.icon,
      { texture: Icon.question, scale: 0.7 },
      () => {
        this.scene.switch(scenes.game);
      },
      ButtonColor.blue,
      0.6
    );

    const spacing = 250;
    centerOnCamera(startButton, this.cameras.main);
    settingsButton.setPosition(
      startButton.x - spacing,
      this.scale.height - 200
    );
    highscoreButton.setPosition(startButton.x, this.scale.height - 150);
    howToPlayButton.setPosition(
      startButton.x + spacing,
      this.scale.height - 200
    );
  }
}
