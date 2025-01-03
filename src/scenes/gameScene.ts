import { Scene } from "phaser";
import { game, keys, scenes } from "../constants";
import { setBackground } from "../utils/layout";
import LayeredMusic from "../components/layeredMusic";
import assets from "../assets";
import { HeartRow } from "../components/heartRow";

export default class GameScene extends Scene {
  private music!: LayeredMusic;

  constructor() {
    super({ key: scenes.game });
  }

  create(): void {
    const bgr = this.add.image(0, 0, keys.background);
    setBackground(bgr, this.cameras.main);
    this.music = new LayeredMusic(this, Object.keys(assets.music.game))
      .setLayers([0])
      .play();
    const hearts = new HeartRow(this, game.playerHealth, 30, 40).setScale(2);
    this.time.delayedCall(1000, () => hearts.decrease());
    this.time.delayedCall(3000, () => hearts.decrease());
    this.time.delayedCall(4000, () => hearts.decrease());
    this.time.delayedCall(7000, () => hearts.decrease());
  }
}
