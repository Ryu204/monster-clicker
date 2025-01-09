import { Scene } from "phaser";
import { fonts, keys, scenes, texts } from "../constants";
import { centerOnCamera } from "../utils/layout";
import { defaultNineSlice } from "../utils/nineslice";
import { createIconButton } from "../components/button";
import { ButtonColor, ButtonType, Icon } from "../assets";

export class GameOverScene extends Scene {
  constructor() {
    super({ key: scenes.gameOver });
  }

  create(): void {
    // Add background
    const bgr = defaultNineSlice(this, 0, 0, keys.whiteBackground, 600, 700);
    centerOnCamera(bgr, this.cameras.main);

    // Title text
    this.add
      .text(bgr.x, bgr.y - 200, "Game Over", {
        fontFamily: fonts.primary,
        color: texts.colors.dark,
        fontSize: 60,
      })
      .setOrigin(0.5);

    // Score
    const score = 100;
    this.add
      .text(bgr.x, bgr.y, score.toString(), {
        fontFamily: fonts.pixel,
        color: texts.colors.red,
        fontSize: 100,
      })
      .setOrigin(0.5);

    this.createButtons(bgr);
    this.initAnimation();
  }

  private createButtons(origin: { x: number; y: number }): void {
    const menuButton = createIconButton(
      this,
      ButtonType.icon,
      { texture: Icon.home, scale: 0.5 },
      () => {
        this.scene.stop(scenes.gameOver);
        this.scene.stop(scenes.game);
        this.scene.wake(scenes.menu);
      },
      ButtonColor.yellow,
      0.5
    );
    const replayButton = createIconButton(
      this,
      ButtonType.icon,
      { texture: Icon.restart, scale: 0.5 },
      () => {
        this.scene.stop(scenes.gameOver);
        this.scene.start(scenes.game);
      },
      ButtonColor.blue,
      0.5
    );
    const shareScoreButton = createIconButton(
      this,
      ButtonType.icon,
      { texture: Icon.share, scale: 0.5 },
      () => {},
      ButtonColor.green,
      0.5
    );

    replayButton.copyPosition(origin).y += 200;
    menuButton.copyPosition(replayButton).x -= 150;
    shareScoreButton.copyPosition(replayButton).x += 150;
  }

  private initAnimation(): void {
    const cam = this.cameras.main;
    const y = cam.y;
    cam.y -= 1000;
    this.tweens.add({
      targets: this.cameras.main,
      y,
      duration: 500,
      ease: "Bounce",
    });
  }
}
