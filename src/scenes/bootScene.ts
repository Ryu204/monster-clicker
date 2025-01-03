import { GameObjects, Scene } from "phaser";
import { keys, scenes } from "../constants";
import assets from "../assets";

export default class BootScene extends Scene {
  private loadingBar!: GameObjects.Rectangle;
  private progressBar!: Phaser.GameObjects.Rectangle;
  private loadingText!: Phaser.GameObjects.Text;
  private fontName = "40px Arial";

  constructor() {
    super({ key: scenes.boot });
  }
  preload(): void {
    this.setUpLoadEvents();
    this.load.image(keys.background, assets.randomBackground());
    this.load.audio(keys.mainMenuMusic, assets.mainMenuMusic);
    this.load.spritesheet(keys.primaryButton, assets.primaryButton.url, {
      frameWidth: assets.primaryButton.width,
      frameHeight: assets.primaryButton.height,
    });
  }

  create(): void {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2 + 60, "Click to Play", {
        font: this.fontName,
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start(scenes.menu);
    });
  }

  private setUpLoadEvents(): void {
    // Set up loading bar visuals
    const { width, height } = this.scale;
    const horizontalMargin = 0.1;

    this.loadingBar = this.add
      .rectangle(
        width * horizontalMargin,
        height / 2 - 10,
        width * (1 - 2 * horizontalMargin),
        40,
        0x222222,
        1
      )
      .setOrigin(0, 0.5);
    this.progressBar = this.add
      .rectangle(width * horizontalMargin, height / 2 - 10, 0, 40, 0x88e453, 1)
      .setOrigin(0, 0.5);
    this.loadingText = this.add
      .text(width * horizontalMargin, height / 2 + 60, "Loading assets", {
        font: this.fontName,
      })
      .setOrigin(0, 0.5);

    this.load.on("progress", (value: number) => {
      this.progressBar.width = (1 - 2 * horizontalMargin) * value * width;
    });
    this.load.on("complete", () => {
      this.loadingBar.destroy(true);
      this.loadingText.destroy(true);
    });
    this.load.on("filecomplete", (key: string) => {
      this.loadingText.setText(`Loaded ${key}`);
    });
  }
}
