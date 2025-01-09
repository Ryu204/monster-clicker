import { Scene } from "phaser";
import { game, keys, scenes } from "../constants";
import { setBackground } from "../utils/layout";
import LayeredMusic from "../components/layeredMusic";
import assets from "../assets";
import { HeartRow } from "../components/heartRow";
import Sword from "../components/sword";
import Enemy, { Events as EnemyEvents } from "../components/enemy";
import SpawnManager from "../components/spawner/spawnManager";
import waves from "../data/waveData";

export default class GameScene extends Scene {
  private sword!: Sword;
  private hearts!: HeartRow;
  private music!: LayeredMusic;

  constructor() {
    super({ key: scenes.game });
  }

  create(): void {
    const bgr = this.add.image(0, 0, keys.background);
    setBackground(bgr, this.cameras.main);

    this.music = new LayeredMusic(this, Object.keys(assets.music.game))
      .setLayers([0, 1])
      .play();

    this.hearts = new HeartRow(this, game.playerHealth, 5).setScale(2);
    this.positionHearts(this.hearts);

    this.sword = new Sword(this).setDepth(1);

    new SpawnManager(this, waves, this.addEnemyCallbacks.bind(this));

    this.setupSceneEvents();
  }

  private positionHearts(hearts: HeartRow): void {
    const camera = this.cameras.main;
    hearts.setPosition(camera.centerX, camera.y + 50);
  }

  private addEnemyCallbacks(enemy: Enemy) {
    enemy
      .on(EnemyEvents.hit, this.sword.onEnemyHit, this.sword)
      .on(EnemyEvents.defended, this.sword.onAttackingEnemyHit, this.sword)
      .on(EnemyEvents.attackFrameStarted, this.onPlayerAttacked, this);
  }

  private onPlayerAttacked(): void {
    const tryDecrease = this.hearts.decrease();
    if (tryDecrease === false) {
      return;
    }
    this.cameras.main.shake(200, 0.01);
    const zeroHealth = this.hearts.getRemainingHearts() === 0;
    if (zeroHealth) {
      this.onZeroHealth();
    }
  }

  private onZeroHealth(): void {
    this.time.addEvent({
      delay: 2000,
      callback: () => {
        this.scene.launch(scenes.gameOver);
        this.scene.pause();
      },
    });
  }

  private setupSceneEvents() {
    this.events.on("shutdown", () => this.music.destroy());
  }
}
