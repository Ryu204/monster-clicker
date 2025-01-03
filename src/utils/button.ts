import { GameObjects, Scene } from "phaser";

interface ButtonFrames {
  up: number;
  focused?: number;
  pressed?: number;
}

interface TransformInfo {
  x?: number;
  y?: number;
  scale?: number;
}

interface TextInfo {
  text?: string;
  color?: string;
}

function createScaleTween(
  scene: Scene,
  container: GameObjects.Container,
  scale: number,
  duration: number,
  ease: string
) {
  return scene.tweens.add({
    targets: container,
    scale,
    duration,
    ease,
  });
}

export function addButton(
  scene: Scene,
  texture: string,
  frames: ButtonFrames,
  { x = 0, y = 0, scale = 1 }: TransformInfo = {},
  text?: TextInfo,
  callback?: () => void
): GameObjects.Container {
  const container = scene.add.container(x, y).setScale(scale);
  const btn = scene.add.sprite(x, y, texture, frames.up).setInteractive();
  container.add(btn);

  if (text?.text) {
    container.add(
      scene.add
        .text(x, y, text.text, {
          color: text.color ?? "white",
          align: "center",
        })
        .setOrigin(0.5)
        .setDepth(btn.depth + 1)
    );
  }

  btn.on("pointerover", () => {
    if (frames.focused) btn.setFrame(frames.focused);
    createScaleTween(scene, container, 1.1 * scale, 100, "Quad.easeOut");
    btn.setTint(0xdddddd);
  });

  btn.on("pointerout", () => {
    btn.setFrame(frames.up);
    createScaleTween(scene, container, scale, 100, "Quad.easeOut");
    btn.clearTint();
  });

  btn.on("pointerdown", () => {
    if (frames.pressed) btn.setFrame(frames.pressed);
    createScaleTween(scene, container, 1.1 * scale, 100, "Quad.easeIn");
    btn.setTint(0x666666);
  });

  btn.on("pointerup", () => {
    btn.clearTint();
    callback?.();
  });

  return container;
}
