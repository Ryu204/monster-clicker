import { GameObjects, Math as MathPhaser, Scene } from "phaser";
import { keys } from "../constants";
import { lerpAngle, randomOne } from "../utils/math";
import assets from "../assets";
import Trail from "./trail";

const trailColors = {
  hitEnemyNormally: 0xe0e022,
  hitEnemyWhileAttack: 0x909090,
};

export default class Sword extends GameObjects.Sprite {
  private trail: Trail;
  private isActive: boolean = false;
  private targetRotation: number = 0;

  constructor(scene: Scene) {
    const swordsCount = assets.sword.column * assets.sword.row;
    super(
      scene,
      0,
      0,
      keys.sword,
      MathPhaser.FloorTo(randomOne() * swordsCount)
    );

    this.setOrigin(0.7).setScale(6);

    scene.add.existing(this);

    this.trail = new Trail(this.scene);

    this.returnToDefaultPosition();

    this.scene.input.on("pointerdown", () => (this.isActive = true));
    this.scene.input.on("pointerup", this.returnToDefaultPosition.bind(this));
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this.rotateToTarget(delta);

    if (!this.isActive) {
      return;
    }
    const ptr = this.scene.input.activePointer;

    this.setPosition(ptr.worldX, ptr.worldY);
    this.targetRotation = ptr.angle - (5 * MathPhaser.PI2) / 8; // Sword sprite is 45 degree

    this.trail.addPoint(ptr.worldX, ptr.worldY);
  }

  onEnemyHit(): void {
    this.trail.setTemporaryColor(trailColors.hitEnemyNormally);
  }

  onAttackingEnemyHit(): void {
    this.trail.setTemporaryColor(trailColors.hitEnemyWhileAttack);
  }

  private returnToDefaultPosition(): void {
    const camera = this.scene.cameras.main;
    const defaultX = camera.centerX;
    const defaultY = camera.centerY + camera.height / 2 - 250;
    this.setPosition(defaultX, defaultY);
    this.isActive = false;
    this.targetRotation = Math.PI / 4;
  }

  private rotateToTarget(delta: number): void {
    const lerpSpeed = (delta * 20) / 1000;
    this.setRotation(lerpAngle(this.rotation, this.targetRotation, lerpSpeed));
  }
}
