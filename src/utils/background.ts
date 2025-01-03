import { Cameras, GameObjects } from "phaser";

export function setBackground(
  image: GameObjects.Image,
  camera: Cameras.Scene2D.Camera
) {
  const width = camera.width;
  const height = camera.height;
  image.setX(width / 2);
  image.setY(height / 2);
  let scaleX = camera.width / image.width;
  let scaleY = camera.height / image.height;
  let scale = Math.max(scaleX, scaleY);
  image.setScale(scale).setScrollFactor(0);
}
