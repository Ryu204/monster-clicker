import { GameObjects, Scene } from "phaser";

export function defaultNineSlice(
  scene: Scene,
  x: number,
  y: number,
  textureKey: string,
  width?: number,
  height?: number
): GameObjects.NineSlice {
  const texture = scene.textures.get(textureKey);
  const frame = texture.getSourceImage();

  if (!frame) {
    throw new Error(`Texture with key "${textureKey}" not found.`);
  }

  const originalWidth = frame.width;
  const originalHeight = frame.height;
  const borderSizeX = Math.floor(originalWidth / 3);
  const borderSizeY = Math.floor(originalHeight / 3);

  return scene.add.nineslice(
    x,
    y,
    textureKey,
    undefined,
    width ?? originalWidth,
    height ?? originalHeight,
    borderSizeX,
    borderSizeY,
    borderSizeX,
    borderSizeY
  );
}
