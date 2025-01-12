import { GameObjects, Input, Math } from "phaser";
import { keys } from "../constants";

export default class Slider extends GameObjects.Container {
  private sliderBar: GameObjects.Image;
  private sliderThumb: GameObjects.Image;
  private decreaseButton: GameObjects.Image;
  private increaseButton: GameObjects.Image;
  private min: number;
  private max: number;
  private value: number;
  private onValueChange?: Function;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    {
      barTexture = keys.slider,
      thumbTexture = keys.musicThumb,
      minusTexture = keys.minusThumb,
      plusTexture = keys.plusThumb,
      min = 0,
      max = 10,
      value = 0,
      iconScale = 1,
      barTint = 0xffffff,
      buttonTints = 0xffffff,
      thumbScale = 1,
      buttonSpacing = 50,
    },
    onValueChange?: Function
  ) {
    super(scene, x, y);
    this.onValueChange = onValueChange;

    if (min >= max) {
      throw new Error('SliderConfig: "min" must be less than "max".');
    }

    this.min = min;
    this.max = max;
    this.value = Math.Clamp(value, min, max);

    this.sliderBar = scene.add
      .image(0, 0, barTexture)
      .setOrigin(0.5, 0.5)
      .setTint(barTint);
    this.add(this.sliderBar);

    this.sliderThumb = scene.add
      .image(this.getThumbPosition(), 0, thumbTexture)
      .setInteractive()
      .setScale(thumbScale);
    this.add(this.sliderThumb);

    this.decreaseButton = scene.add
      .image(-this.sliderBar.width / 2 - buttonSpacing, 0, minusTexture)
      .setTint(buttonTints)
      .setInteractive()
      .setScale(iconScale);
    this.decreaseButton.on("pointerdown", () =>
      this.updateValue(this.value - 1)
    );
    this.add(this.decreaseButton);

    this.increaseButton = scene.add
      .image(this.sliderBar.width / 2 + buttonSpacing, 0, plusTexture)
      .setTint(buttonTints)
      .setInteractive()
      .setScale(iconScale);
    this.increaseButton.on("pointerdown", () =>
      this.updateValue(this.value + 1)
    );
    this.add(this.increaseButton);

    this.sliderThumb.on("pointerdown", () => {
      scene.input.on("pointermove", this.handleDrag, this);
      scene.input.once("pointerup", () =>
        scene.input.off("pointermove", this.handleDrag, this)
      );
    });

    scene.add.existing(this);
  }

  private getThumbPosition(): number {
    const range = this.max - this.min;
    const relativeValue = (this.value - this.min) / range;
    return Math.Linear(
      -this.sliderBar.width / 2,
      this.sliderBar.width / 2,
      relativeValue
    );
  }

  private updateValue(newValue: number): void {
    this.value = Math.Clamp(newValue, this.min, this.max);
    this.sliderThumb.x = this.getThumbPosition();
    this.onValueChange?.(this.value);
  }

  private handleDrag(pointer: Input.Pointer): void {
    const localX = this.sliderBar
      .getWorldTransformMatrix()
      .invert()
      .transformPoint(pointer.x, pointer.y).x;
    const clampedX = Math.Clamp(
      localX,
      -this.sliderBar.width / 2,
      this.sliderBar.width / 2
    );
    const range = this.max - this.min;
    this.value = Math.RoundTo(
      this.min +
        ((clampedX + this.sliderBar.width / 2) / this.sliderBar.width) * range,
      0
    );
    this.sliderThumb.x = clampedX;
    this.onValueChange?.(this.value);
  }
}
