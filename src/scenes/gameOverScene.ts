import { Scene } from "phaser";
import { fonts, keys, scenes, texts } from "../constants";
import { centerOnCamera } from "../utils/layout";
import { defaultNineSlice } from "../utils/nineslice";

export class GameOverScene extends Scene {
  constructor() {
    super({ key: scenes.gameOver });
  }

  create(): void {
    // Add background (optional)
    const bgr = defaultNineSlice(this, 0, 0, keys.whiteBackground, 600, 700);
    centerOnCamera(bgr, this.cameras.main);
    bgr.y -= 100;

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
  }
}
