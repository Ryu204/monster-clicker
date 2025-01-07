import { Scene } from "phaser";
import { game, keys, scenes } from "../constants";
import { centerOnCamera, setBackground } from "../utils/layout";
import LayeredMusic from "../components/layeredMusic";
import assets from "../assets";
import { HeartRow } from "../components/heartRow";
import Sword from "../components/sword";
import Enemy, { Events as EnemyEvents } from "../components/enemy";
import EnemyType from "../data/enemyType";
import enemies from "../data/enemyData";

export default class GameScene extends Scene {
  private sword!: Sword;
  private hearts!: HeartRow;

  constructor() {
    super({ key: scenes.game });
  }

  create(): void {
    const bgr = this.add.image(0, 0, keys.background);
    setBackground(bgr, this.cameras.main);

    new LayeredMusic(this, Object.keys(assets.music.game))
      .setLayers([0])
      .play();

    this.hearts = new HeartRow(this, game.playerHealth, 5).setScale(2);
    this.positionHearts(this.hearts);

    this.sword = new Sword(this).setDepth(1);

    const golem = new Enemy(this, EnemyType.golem, enemies[EnemyType.golem])
      .on(EnemyEvents.hit, this.sword.onEnemyHit, this.sword)
      .on(EnemyEvents.defended, this.sword.onAttackingEnemyHit, this.sword)
      .on(EnemyEvents.attackFrameStarted, this.onPlayerAttacked, this);

    centerOnCamera(golem, this.cameras.main);
  }

  private positionHearts(hearts: HeartRow) {
    const camera = this.cameras.main;
    hearts.setPosition(camera.centerX, camera.y + 50);
  }

  private onPlayerAttacked() {
    if (this.hearts.decrease()) {
      this.cameras.main.shake(200, 0.01);
    }
  }
}
