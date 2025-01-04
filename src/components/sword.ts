import { BlendModes, GameObjects, Input, Scene } from "phaser";
import { keys } from "../constants";
import { randomOne } from "../utils/math";
import assets from "../assets";

export default class Sword extends GameObjects.Sprite {
  private particleEmitter!: GameObjects.Particles.ParticleEmitter;

  constructor(scene: Scene) {
    const swordsCount = assets.sword.column * assets.sword.row;
    super(scene, 0, 0, keys.sword, Math.floor(randomOne() * swordsCount));

    this.setOrigin(0.8, 0.8).setScale(6);

    scene.add.existing(this);

    this.createParticleEmitter();

    this.returnToDefaultPosition();

    this.scene.input.on("pointermove", this.onPointerDown.bind(this));
    this.scene.input.on("pointerup", this.returnToDefaultPosition.bind(this));
  }

  private createParticleEmitter(): void {
    const particleTypesCount =
      assets.swordParticles.column * assets.swordParticles.row;
    this.particleEmitter = this.scene.add.particles(0, 0, keys.swordParticle, {
      frame: Math.floor(randomOne() * particleTypesCount),
      speed: { min: 0, max: 100 },
      lifespan: 1000,
      frequency: 0,
      scale: { start: 1.5, end: 0.5 },
      alpha: { start: 1, end: 0, ease: "sine.out" },
      blendMode: BlendModes.COLOR_DODGE,
      color: [0xff0000],
      quantity: 10,
      follow: this,
    });
  }

  private onPointerDown(ptr: Input.Pointer) {
    this.setPosition(ptr.worldX, ptr.worldY);
  }

  private returnToDefaultPosition(): void {
    const camera = this.scene.cameras.main;
    const defaultX = camera.centerX;
    const defaultY = camera.centerY + camera.height / 2 - 200;
    this.setPosition(defaultX, defaultY);
  }
}
