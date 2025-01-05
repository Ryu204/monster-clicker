import { GameObjects, Animations, Math } from "phaser";
import { AnimationConfig } from "../assets";
import shakeSprite from "../utils/shakeSprite";
import { fonts, texts } from "../constants";

interface EnemyStats {
  attackInterval: number;
  health: number;
  damageFromPlayer: number;
}

type State = "idle" | "attack" | "hurt" | "dead";

export const Events = {
  hit: "enemyhit",
  dead: "enemydead",
  defended: "enemydefended",
};

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
    this.on("pointerover", this.takeDamage, this);

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
    if (this.currentState === "attack") {
      this.handleDefenseFeedback();
      this.emit(Events.defended);
      return;
    }
    const vulnerableStates = ["idle", "hurt"];
    if (!vulnerableStates.includes(this.currentState)) return;
    if (this.health <= 0) return;

    this.currentState = "hurt";
    this.emit(Events.hit);

    shakeSprite(this.scene, this, 10, 200);

    this.health -= this.damageFromPlayer;
    this.play(this.animConfig.hurt.name);

    if (this.health <= 0) {
      this.die();
    }
  }

  private handleDefenseFeedback(): void {
    const missText = this.scene.add
      .text(this.x, this.y - this.height / 2, "MISS", {
        fontFamily: fonts.pixel,
        color: texts.colors.cyan,
        fontSize: 50,
        stroke: texts.colors.dark,
        strokeThickness: 10,
      })
      .setOrigin(0.5);

    this.scene.tweens.add({
      targets: missText,
      y: missText.y - 30,
      alpha: 0.5,
      scale: 0.9,
      duration: 800,
      ease: "Power1",
      onComplete: () => missText.destroy(),
    });

    // Dogde animation
    this.scene.tweens.add({
      targets: this,
      x: this.x + Math.Between(-100, 100),
      y: this.y + Math.Between(-100, 100),
      duration: 100,
      yoyo: true,
      ease: "Power1",
    });
  }

  private attack(): void {
    this.play(this.animConfig.attack.name);
  }

  private die(): void {
    shakeSprite(this.scene, this, 30, 300);
    this.currentState = "dead";
    this.emit(Events.dead);
    this.play(this.animConfig.die.name);
    this.once(
      Animations.Events.ANIMATION_COMPLETE,
      (anim: Animations.Animation) => {
        if (anim.key === this.animConfig.die.name) this.destroy();
      }
    );
  }
}
