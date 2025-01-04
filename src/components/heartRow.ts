import { GameObjects } from "phaser";
import { keys } from "../constants";

export class HeartRow extends GameObjects.Container {
  private remainingHeartsCount: number;
  private hearts!: Phaser.GameObjects.Sprite[];

  constructor(
    scene: Phaser.Scene,
    heartCount: number,
    x: number = 0,
    y: number = 0
  ) {
    super(scene, x, y);
    scene.add.existing(this);
    const spacing = 45;
    this.hearts = Array.from({ length: heartCount }, (_, i) => {
      const heart = scene.add
        .sprite(x + i * spacing, y, keys.heart)
        .setOrigin(0.5, 0);
      heart.setTint(0xff0000);
      return heart;
    });
    this.remainingHeartsCount = this.hearts.length;
    this.add(this.hearts);
  }

  decrease(): HeartRow {
    if (this.remainingHeartsCount > 0) {
      const heart = this.hearts[this.remainingHeartsCount - 1];
      heart.setTint(0x808080);
      this.remainingHeartsCount--;
    }
    return this;
  }

  getRemainingHearts(): number {
    return this.remainingHeartsCount;
  }
}
