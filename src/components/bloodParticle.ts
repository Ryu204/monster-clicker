import { GameObjects, Math } from "phaser";
import { depth, keys } from "../constants";

// A pool to manage particle emitters
let bloodEmitterPool: {
  emitter: GameObjects.Particles.ParticleEmitter;
  on: boolean;
}[] = [];

/**
 * Initializes a pool of particle emitters for the blood effect.
 * Call this once in the `create` method of your scene.
 *
 * @param scene - The current scene.
 * @param textureKey - The texture key for the particle.
 * @param maxEmitters - The maximum number of emitters in the pool.
 */
export function initializeParticlePool(
  scene: Phaser.Scene,
  maxEmitters: number = 10
) {
  bloodEmitterPool = Array.from({ length: maxEmitters }, () => ({
    emitter: scene.add
      .particles(0, 0, keys.particle, {
        lifespan: { min: 200, max: 600 },
        speed: { min: 100, max: 300 },
        angle: { min: -150, max: 150 },
        rotate: { min: 0, max: 360 },
        gravityY: 900,
        quantity: 10,
        frame: [44, 8, 4],
        tint: [0xb7410e, 0x8b0000, 0xff0000, 0xdc143c],
        emitting: false,
        scale: { start: 3, end: 1 },
        alpha: { start: 1, end: 0.5 },
      })
      .setDepth(depth.ui),
    on: false,
  }));
}

/**
 * Emits a blood effect at the specified position.
 *
 * @param x - The x-coordinate of the effect.
 * @param y - The y-coordinate of the effect.
 */
export function emitBloodEffect(x: number, y: number) {
  const inactive = bloodEmitterPool.find((em) => !em.on);

  const offset = 100;
  if (inactive) {
    inactive.emitter.explode(
      10,
      Math.Between(x - offset, x + offset),
      Math.Between(y - offset, y + offset)
    ); // Emit particles
  } else {
    console.warn("No available emitters in the pool.");
  }
}
