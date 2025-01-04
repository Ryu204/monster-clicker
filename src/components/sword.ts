import { GameObjects, Scene } from "phaser";
import { keys } from "../constants";
import { randomOne } from "../utils/math";
import assets from "../assets";
import Trail from "./trail";

export default class Sword extends GameObjects.Sprite {
  private trail: Trail;
  private isActive: boolean = false;

  constructor(scene: Scene) {
    const swordsCount = assets.sword.column * assets.sword.row;
    super(scene, 0, 0, keys.sword, Math.floor(randomOne() * swordsCount));

    this.setOrigin(1).setScale(6);

    scene.add.existing(this);

    this.trail = new Trail(this.scene);

    this.returnToDefaultPosition();

    this.scene.input.on("pointerdown", () => (this.isActive = true));
    this.scene.input.on("pointerup", this.returnToDefaultPosition.bind(this));
  }

  protected preUpdate(): void {
    if (!this.isActive) {
      return;
    }
    const ptr = this.scene.input.activePointer;
    this.setPosition(ptr.worldX, ptr.worldY);
    this.trail.addPoint(ptr.worldX, ptr.worldY);
  }

  private returnToDefaultPosition(): void {
    const camera = this.scene.cameras.main;
    const defaultX = camera.centerX + 100;
    const defaultY = camera.centerY + camera.height / 2 - 200;
    this.setPosition(defaultX, defaultY);
    this.isActive = false;
  }
}
