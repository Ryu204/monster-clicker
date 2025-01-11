import { Scene } from "phaser";
import { dataKeys, game, keys, scenes } from "../constants";
import { setBackground } from "../utils/layout";
import LayeredMusic from "../components/layeredMusic";
import assets from "../assets";
import { HeartRow } from "../components/heartRow";
import Sword from "../components/sword";
import Enemy, { Events as EnemyEvents } from "../components/enemy";
import SpawnManager from "../components/spawner/spawnManager";
import waves from "../data/waveData";
import ScoreText from "../components/scoreText";
import SpawnText from "../components/spawner/spawnText";

export default class GameScene extends Scene {
  private sword!: Sword;
  private hearts!: HeartRow;
  private music!: LayeredMusic;
  private score!: ScoreText;
  private spawnText!: SpawnText;

  constructor() {
    super({ key: scenes.game });
  }

  create(): void {
    const bgr = this.add.image(0, 0, keys.background);
    setBackground(bgr, this.cameras.main);

    this.music = new LayeredMusic(this, Object.keys(assets.music.game))
      .setLayers([0, 1])
      .play();

    this.hearts = new HeartRow(this, game.playerHealth).setScale(2);
    this.positionHearts(this.hearts);

    this.sword = new Sword(this).setDepth(1);

    this.score = new ScoreText(this, this.sword.x, this.hearts.y + 150);

    this.spawnText = new SpawnText(this);

    new SpawnManager(
      this,
      waves,
      this.addEnemyCallbacks.bind(this),
      this.spawnText.showWave,
      this.spawnText
    );

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
      .on(EnemyEvents.attackFrameStarted, this.onPlayerAttacked, this)
      .on(EnemyEvents.dead, this.onEnemyKilled, this);
  }

  private onEnemyKilled(enemy: Enemy): void {
    this.score.increase(enemy.getPoint());
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
    this.cameras.main.postFX.addVignette(0.5, 0.5, 0.9);
    this.cameras.main.postFX.add;
    this.tweens.add({
      targets: this.cameras.main,
      zoom: 1.05,
      duration: 2000,
      ease: "Power1",
      onComplete: () => {
        this.cameras.main.postFX.addBlur(0, 4, 4, 0.7);
        this.scene
          .get(scenes.gameOver)
          .data.set(dataKeys.score, this.score.getScore());
        this.scene.launch(scenes.gameOver);
        this.scene.pause();
      },
    });
    this.anims.globalTimeScale = 0;
  }

  private setupSceneEvents() {
    this.events.on("shutdown", () => this.music.destroy());
    this.events.on("shutdown", () => (this.anims.globalTimeScale = 1));
  }
}
