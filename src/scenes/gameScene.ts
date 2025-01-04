import { Scene } from "phaser";
import { game, keys, scenes } from "../constants";
import { setBackground } from "../utils/layout";
import LayeredMusic from "../components/layeredMusic";
import assets from "../assets";
import { HeartRow } from "../components/heartRow";
import Sword from "../components/sword";

export default class GameScene extends Scene {
  private music!: LayeredMusic;
  private sword!: Sword;

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
    this.sword = new Sword(this);
  }
}
