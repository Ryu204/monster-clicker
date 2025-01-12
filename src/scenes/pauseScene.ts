import { Scene } from "phaser";
import { fonts, keys, scenes, texts } from "../constants";
import { centerOnCamera } from "../utils/layout";
import { defaultNineSlice } from "../utils/nineslice";
import { createIconButton } from "../components/button";
import { ButtonColor, Icon } from "../assets";

export class PauseScene extends Scene {
  constructor() {
    super({ key: scenes.pause });
  }

  create(): void {
    // Add background
    const bgr = defaultNineSlice(this, 0, 0, keys.whiteBackground, 600, 800);
    centerOnCamera(bgr, this.cameras.main);

    // Title text
    this.add
      .text(bgr.x, bgr.y - 200, "Paused", {
        fontFamily: fonts.primary,
        color: texts.colors.dark,
        fontSize: 60,
      })
      .setOrigin(0.5);

    this.createButtons(bgr);
    this.initAnimation();
  }

  private createButtons(origin: { x: number; y: number }): void {
    const resumeButton = createIconButton(
      this,
      { texture: Icon.play, scale: 0.5 },
      () => {
        this.scene.stop(scenes.pause);
        this.scene.resume(scenes.game);
      },
      ButtonColor.yellow,
      0.8
    );
    const menuButton = createIconButton(
      this,
      { texture: Icon.home, scale: 0.5 },
      () => {
        this.scene.stop(scenes.pause);
        this.scene.stop(scenes.game);
        this.scene.wake(scenes.menu);
      },
      ButtonColor.purple,
      0.5
    );
    const replayButton = createIconButton(
      this,
      { texture: Icon.restart, scale: 0.5 },
      () => {
        this.scene.stop(scenes.pause);
        this.scene.start(scenes.game);
      },
      ButtonColor.green,
      0.5
    );

    resumeButton.copyPosition(origin);
    replayButton.copyPosition(origin);
    replayButton.y += 250;
    replayButton.x += 100;
    menuButton.copyPosition(replayButton).x -= 200;
  }

  private initAnimation(): void {
    const cam = this.cameras.main;
    const y = cam.y;
    cam.y += 1000;
    this.tweens.add({
      targets: this.cameras.main,
      y,
      duration: 500,
      ease: "Bounce",
    });
  }
}
