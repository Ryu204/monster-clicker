import { GameObjects, Animations } from "phaser";
import { AnimationConfig } from "../assets";
import shakeSprite from "../utils/shakeSprite";

interface EnemyStats {
  attackInterval: number;
  health: number;
  damageFromPlayer: number;
}

type State = "idle" | "attack" | "hurt" | "dead";

export default class Enemy extends GameObjects.Sprite {
  private attackInterval: number;
  private timeTilNextAttack: number;
  private health: number;
  private damageFromPlayer: number;
  private animConfig: AnimationConfig;
  private currentState: State = "idle";

  constructor(
    scene: Phaser.Scene,
    texture: string,
    animConfig: AnimationConfig,
    { attackInterval, health, damageFromPlayer }: EnemyStats
  ) {
    super(scene, 0, 0, texture);

    this.attackInterval = attackInterval;
    this.timeTilNextAttack = this.attackInterval;
    this.health = health;
    this.damageFromPlayer = damageFromPlayer;
    this.animConfig = animConfig;

    scene.add.existing(this);

    this.setScale(animConfig.scale);

    this.setInteractive();
    this.on("pointerout", this.takeDamage, this);

    this.play(animConfig.idle.name);
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this.timeTilNextAttack -= delta;
    const isDone = !this.anims?.isPlaying;

    switch (this.currentState) {
      case "idle":
        if (this.timeTilNextAttack <= 0) {
          this.timeTilNextAttack = this.attackInterval;
          this.currentState = "attack";
          this.attack();
        }
        break;
      case "attack":
        if (isDone) {
          this.play(this.animConfig.idle.name);
          this.currentState = "idle";
        }
        break;
      case "hurt":
        if (isDone) {
          this.play(this.animConfig.idle.name);
          this.currentState = "idle";
        }
        break;
    }
  }

  takeDamage(): void {
    if (!["idle", "hurt"].includes(this.currentState)) return;
    if (this.health <= 0) return;

    this.currentState = "hurt";

    shakeSprite(this.scene, this, 10, 200);

    this.health -= this.damageFromPlayer;
    this.play(this.animConfig.hurt.name);

    if (this.health <= 0) {
      this.die();
    }
  }

  private attack(): void {
    this.play(this.animConfig.attack.name);
  }

  private die(): void {
    this.currentState = "dead";
    this.play(this.animConfig.die.name);
    this.once(
      Animations.Events.ANIMATION_COMPLETE,
      (anim: Animations.Animation) => {
        if (anim.key === this.animConfig.die.name) this.destroy();
      }
    );
  }
}
