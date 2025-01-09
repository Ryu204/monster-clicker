import { GameObjects, Scene, Textures } from "phaser";
import { keys, scenes } from "../constants";
import assets, { Icon, icons, spritesheets } from "../assets";
import createEnemyAnimations from "../utils/createAnimations";
import EnemyType from "../data/enemyType";
import { buttons, ButtonType } from "../assets";

export default class BootScene extends Scene {
  private loadingBar!: GameObjects.Rectangle;
  private progressBar!: Phaser.GameObjects.Rectangle;
  private loadingText!: Phaser.GameObjects.Text;
  private static fontName = "40px Arial";

  constructor() {
    super({ key: scenes.boot });
  }
  preload(): void {
    this.setUpLoadEvents();
    this.load.image(keys.background, assets.randomBackground());
    for (const music in assets.music) {
      const keySources = assets.music[music];
      for (const key in keySources) {
        this.load.audio(key, keySources[key]);
      }
    }
    this.load
      .image(keys.heart, assets.heart)
      .image(keys.whiteBackground, assets.whiteBackground);
    this.load.spritesheet(keys.sword, assets.sword.url, {
      frameWidth: assets.sword.width,
      frameHeight: assets.sword.height,
    });
    this.load.spritesheet(keys.particle, assets.particles.url, {
      frameWidth: assets.particles.size,
      frameHeight: assets.particles.size,
    });
    this.loadSpritesheets();
    this.loadIcons();
  }

  create(): void {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2 + 60, "Click to Play", {
        font: BootScene.fontName,
      })
      .setOrigin(0.5);

    this.input.once("pointerup", () => {
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
        font: BootScene.fontName,
      })
      .setOrigin(0, 0.5);

    this.load.on("progress", (value: number) => {
      this.progressBar.width = (1 - 2 * horizontalMargin) * value * width;
    });
    this.load.on("complete", () => {
      this.loadingBar.destroy(true);
      this.loadingText.destroy(true);
      this.createAnimations();
      this.smoothUi();
    });
    this.load.on("filecomplete", (key: string) => {
      this.loadingText.setText(`Loaded ${key}`);
    });
  }

  private createAnimations() {
    Object.keys(EnemyType).forEach((type) => {
      const data = spritesheets[type as EnemyType];
      createEnemyAnimations(this.anims, data.anims, type);
    });
  }

  private smoothUi() {
    const uiKeys = [...Object.keys(Icon), ...Object.keys(ButtonType)];
    uiKeys.forEach((key) => this.textures.get(key).setFilter(Textures.LINEAR));

    this.textures.get(keys.whiteBackground).setFilter(Textures.LINEAR);
  }

  private loadSpritesheets() {
    Object.keys(EnemyType).forEach((type) => {
      const data = spritesheets[type as EnemyType];
      this.load.spritesheet(type, data.url, {
        frameWidth: data.width,
        frameHeight: data.height,
      });
    });
    Object.keys(ButtonType).forEach((type) => {
      const data = buttons[type as ButtonType];
      this.load.spritesheet(type, data.url, {
        frameWidth: data.width,
        frameHeight: data.height,
      });
    });
  }

  private loadIcons() {
    Object.keys(Icon).forEach((type) =>
      this.load.image(type, icons[type as Icon])
    );
  }
}
