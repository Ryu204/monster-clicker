import { Cameras, GameObjects } from "phaser";
import { depth } from "../constants";

export function centerOnCamera(
  object: GameObjects.Components.Transform,
  camera: Cameras.Scene2D.Camera
) {
  const width = camera.width;
  const height = camera.height;
  object.setPosition(width / 2, height / 2);
}

export function setBackground(
  image: GameObjects.Image,
  camera: Cameras.Scene2D.Camera
) {
  centerOnCamera(image, camera);
  let scaleX = camera.width / image.width;
  let scaleY = camera.height / image.height;
  let scale = Math.max(scaleX, scaleY);
  image.setScale(scale).setScrollFactor(0).setDepth(depth.background);
}
