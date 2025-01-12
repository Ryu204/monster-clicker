import { Scene, GameObjects } from "phaser";
import { Modal } from "./modal";
import { getHighScore } from "../services/score";
import { Icon } from "../assets";
import { fonts, texts } from "../constants";

export default class HighscoreModal extends Modal {
  private loadingSprite: GameObjects.Sprite;
  private errorText: GameObjects.Text;
  private gameText: GameObjects.Text;

  constructor(scene: Scene, width = 600, height = 700, onClose?: Function) {
    super(scene, [], width, height, true, onClose);

    this.loadingSprite = this.scene.add
      .sprite(0, 0, Icon.restart)
      .setOrigin(0.5)
      .setScale(0.7)
      .setTint(0x343434);
    this.errorText = this.scene.add
      .text(0, 0, "Failed to load highscores", {
        fontFamily: fonts.primary,
        color: texts.colors.red,
        fontSize: 50,
        wordWrap: { width: 500 },
        align: "center",
      })
      .setOrigin(0.5)
      .setVisible(false);
    this.gameText = this.scene.add
      .text(0, 0, "", {
        fontFamily: fonts.pixel,
        color: texts.colors.black,
        fontSize: 42,
        lineSpacing: 20,
      })
      .setOrigin(0.5);
    const title = this.scene.add
      .text(0, -350, "Highscores", {
        fontFamily: fonts.primary,
        color: texts.colors.dark,
        fontSize: 80,
      })
      .setOrigin(0.5);
    this.add(this.loadingSprite)
      .add(this.errorText)
      .add(this.gameText)
      .add(title);

    this.scene.tweens.add({
      targets: this.loadingSprite,
      rotation: -Math.PI * 2,
      duration: 2000,
      loop: -1,
      onLoop: this.loadingSprite.setRotation.bind(this.loadingSprite, 0),
    });
  }

  override show() {
    super.show();
    this.loadHighScores();
  }

  private async loadHighScores() {
    this.loadingSprite.setVisible(true);
    this.errorText.setVisible(false);
    this.gameText.setVisible(false);

    try {
      const data = (await getHighScore()).data.slice(0, 10);
      this.loadingSprite.setVisible(false);
      this.gameText.setVisible(true);

      const text = data.reduce(
        (acc: string, item) =>
          acc +
          "\n" +
          item.name.slice(0, 7).padEnd(7, ".") +
          item.score.toString().padStart(5, "."),
        ""
      );
      this.gameText.setText(text);
    } catch (error) {
      console.log(error);
      this.loadingSprite.setVisible(false);
      this.errorText.setVisible(true);
    }
  }
}
