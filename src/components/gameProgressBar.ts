import { GameObjects, Scene } from "phaser";
import { depth, keys } from "../constants";

export default class ProgressBar extends GameObjects.Container {
  private bound: GameObjects.Graphics;
  private progress: GameObjects.Graphics;
  private indicator: GameObjects.Image;
  private totalTime: number;
  private barWidth: number;
  private margin: number;
  private barHeight: number;
  private innerScale: number;

  constructor(
    scene: Scene,
    totalTime: number,
    indicatorTexture: string = keys.swordUi,
    width = 300,
    height = 60,
    innerScale = 0.6,
    indicatorScale = 1.0
  ) {
    super(scene);

    this.totalTime = totalTime;
    this.innerScale = innerScale;
    this.barWidth = width;
    this.barHeight = height;

    this.margin = height / 2;
    // Create the bound (background of the progress bar)
    this.bound = scene.add
      .graphics()
      .fillStyle(0x333333, 1)
      .fillRoundedRect(
        -width / 2 - this.margin,
        -height / 2,
        width + 2 * this.margin,
        height,
        height / 2
      );
    this.add(this.bound);

    // Create the progress bar (foreground of the progress bar)
    this.margin = (height / 2) * innerScale;
    this.progress = scene.add.graphics().setDepth(this.bound.depth + 1);
    this.add(this.progress);

    // Create the indicator (sword icon)
    this.indicator = scene.add
      .image(-width / 2, 0, indicatorTexture)
      .setOrigin(0.5, 0.5)
      .setScale(indicatorScale);
    this.add(this.indicator);

    this.setDepth(depth.ui);

    // Add the container to the scene
    scene.add.existing(this);
  }

  startTimer(): ProgressBar {
    this.scene.tweens.add({
      targets: this.progress,
      ease: "Linear",
      dummyProp: 0, // At least one property so the onUpdate is called
      duration: this.totalTime,
      onUpdate: (tween) => {
        this.progress
          .clear()
          .fillStyle(0x00ff00, 1)
          .fillRoundedRect(
            -this.barWidth / 2 - this.margin,
            (-this.barHeight / 2) * this.innerScale,
            tween.progress * this.barWidth + 2 * this.margin,
            this.barHeight * this.innerScale,
            (this.barHeight / 2) * this.innerScale
          );
      },
    });
    this.scene.tweens.add({
      targets: this.indicator,
      x: this.barWidth / 2,
      ease: "Linear",
      duration: this.totalTime,
    });
    return this;
  }
}
