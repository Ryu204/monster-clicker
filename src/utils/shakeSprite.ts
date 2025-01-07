import { Scene, GameObjects, Math as PhaserMath } from "phaser";

export default function shakeSprite(
  scene: Scene,
  sprite: GameObjects.Sprite,
  intensity: number = 10,
  duration: number = 200
): void {
  const originalX: number = sprite.x;
  const originalY: number = sprite.y;

  const shakeInterval: number = 50;
  const shakeCount: number = Math.floor(duration / shakeInterval);

  const tweens: object[] = [];
  for (let i = 0; i < shakeCount; i++) {
    const offsetX: number = PhaserMath.Between(-intensity, intensity);
    const offsetY: number = PhaserMath.Between(-intensity, intensity);

    tweens.push({
      targets: sprite,
      x: originalX + offsetX,
      y: originalY + offsetY,
      duration: shakeInterval,
    });
  }

  scene.tweens.chain({
    tweens,
    onComplete: () => {
      sprite.setPosition(originalX, originalY);
    },
  });
}
