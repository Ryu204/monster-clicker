import { GameObjects } from "phaser";
import { depth, fonts, texts } from "../../constants";
import { centerOnCamera } from "../../utils/layout";

export default class SpawnText extends GameObjects.Container {
  private background: Phaser.GameObjects.Rectangle;
  private text: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    super(scene);

    // Create a gray rectangle background
    this.background = scene.add
      .rectangle(0, 0, scene.scale.width * 1.4, 150, 0x000000)
      .setStrokeStyle(10, 0xeaeaea)
      .setAlpha(0)
      .setOrigin(0.5, 0.5);
    this.add(this.background);

    // Create the text object
    this.text = scene.add
      .text(0, 0, "", {
        fontSize: 60,
        color: texts.colors.red,
        fontFamily: fonts.pixel,
      })
      .setOrigin(0.5, 0.5)
      .setAlpha(0);
    this.add(this.text);

    // Center the container on the screen
    centerOnCamera(this, this.scene.cameras.main);

    this.setDepth(depth.ui);

    // Add the container to the scene
    scene.add.existing(this);
  }

  showWave(waveNumber: number, overrideName?: string): void {
    // Update the text
    this.text.setText(overrideName ?? `Wave ${waveNumber + 1}`);

    // Reset the alpha and position
    this.text.setAlpha(0).setX(-this.scene.scale.width / 2);
    this.background.setAlpha(0);

    // Tween for the text appearance
    this.scene.tweens.add({
      targets: this.text,
      alpha: 1,
      x: 0,
      ease: "Power2",
      duration: 500,
    });

    this.scene.tweens.add({
      targets: this.background,
      alpha: 0.6,
      ease: "Power2",
      duration: 500,
    });

    // Tween for hiding the text after a delay
    this.scene.tweens.add({
      targets: this.text,
      alpha: 0,
      x: this.scene.scale.width / 2,
      ease: "Power2",
      delay: 2000,
      duration: 800,
    });

    this.scene.tweens.add({
      targets: this.background,
      alpha: 0,
      ease: "Power2",
      delay: 2000,
      duration: 800,
    });
  }
}
