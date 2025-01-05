import { Scene } from "phaser";
import { game, keys, scenes } from "../constants";
import { centerOnCamera, setBackground } from "../utils/layout";
import LayeredMusic from "../components/layeredMusic";
import assets from "../assets";
import { HeartRow } from "../components/heartRow";
import Sword from "../components/sword";
import Enemy, { Events as EnemyEvents } from "../components/enemy";

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

    const hearts = new HeartRow(this, game.playerHealth, 5).setScale(2);
    this.positionHearts(hearts);

    this.sword = new Sword(this).setDepth(1);

    const golem = new Enemy(this, keys.golem, assets.golem.anims, {
      attackInterval: 3_000,
      health: 10,
      damageFromPlayer: 1,
    }).on(EnemyEvents.hit, () => this.sword.onEnemyHit(), this);

    centerOnCamera(golem, this.cameras.main);
  }

  private positionHearts(hearts: HeartRow) {
    const camera = this.cameras.main;
    hearts.setPosition(camera.centerX, camera.y + 50);
  }
}
