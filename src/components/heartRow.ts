import { GameObjects } from "phaser";
import { depth, keys } from "../constants";

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
        .sprite((i + 0.5 - heartCount / 2) * spacing, y, keys.heart)
        .setOrigin(0.5, 0);
      heart.setTint(0xff0000);
      return heart;
    });
    this.remainingHeartsCount = this.hearts.length;
    this.add(this.hearts);
    this.setDepth(depth.ui);
  }

  /**
   *
   * @param amount amount of health to decrease
   * @returns whether or not health actually decreases (it might be 0)
   */
  decrease(amount: number): boolean {
    if (this.remainingHeartsCount > 0) {
      for (let i = 1; i <= amount; ++i) {
        const index = this.remainingHeartsCount - i;
        if (index < 0) break;
        this.hearts[index].setTint(0x808080);
      }

      this.remainingHeartsCount -= amount;
      if (this.remainingHeartsCount < 0) this.remainingHeartsCount = 0;
      return true;
    }
    return false;
  }

  getRemainingHearts(): number {
    return this.remainingHeartsCount;
  }
}
