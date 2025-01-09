import { GameObjects } from "phaser";
import { depth, fonts, texts } from "../constants";

export default class ScoreText extends GameObjects.Text {
  private score = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "0", {
      fontSize: 80,
      color: texts.colors.gold,
      fontFamily: fonts.pixel,
      stroke: texts.colors.black,
      strokeThickness: 20,
    });
    this.setOrigin(0.5).setDepth(depth.ui);
    scene.add.existing(this);
  }

  increase(amount: number): void {
    this.score += amount;
    this.setText(this.score.toString());
    this.animateFeedback();
  }

  getScore(): number {
    return this.score;
  }

  private animateFeedback(): void {
    this.scene.tweens.add({
      targets: this,
      scale: 1.3,
      duration: 100,
      yoyo: true,
      ease: "Power1",
      onComplete: this.setScale.bind(this, 1, 1),
    });
  }
}
