import { GameObjects, Scene } from "phaser";
import {
  buttons,
  ButtonColor,
  ButtonFrameData,
  ButtonType,
} from "../assets/ui/buttons";
import { fonts } from "../constants";

export default class Button extends GameObjects.Container {
  private btn: GameObjects.Sprite;
  private callback?: () => void;

  constructor(
    scene: Scene,
    type: ButtonType,
    callback?: () => void,
    color?: ButtonColor,
    scale?: number,
    child?: GameObjects.GameObject
  ) {
    super(scene);
    this.callback = callback;

    const frameData = buttons[type][color ?? ButtonColor.blue];

    // Add button sprite
    this.btn = scene.add.sprite(0, 0, type, frameData.up).setInteractive();
    this.add(this.btn);

    if (child) {
      this.add(child);
    }

    // Set scale and add to scene
    this.setScale(scale ?? buttons[type].scale);
    scene.add.existing(this);

    // Set up event listeners
    this.addEventListeners(frameData, this.scale, scene);
  }

  private addEventListeners(
    frames: ButtonFrameData,
    scale: number,
    scene: Scene
  ) {
    this.btn.on("pointerover", () => {
      if (frames.focused) this.btn.setFrame(frames.focused);
      Button.createScaleTween(scene, this, 1.1 * scale, 100, "Quad.easeOut");
      this.btn.setTint(0xdddddd);
    });

    this.btn.on("pointerout", () => {
      this.btn.setFrame(frames.up);
      Button.createScaleTween(scene, this, scale, 100, "Quad.easeOut");
      this.btn.clearTint();
    });

    this.btn.on("pointerdown", () => {
      if (frames.pressed) this.btn.setFrame(frames.pressed);
      Button.createScaleTween(scene, this, 1.1 * scale, 100, "Quad.easeIn");
      this.btn.setTint(0x666666);
    });

    this.btn.on("pointerup", () => {
      this.btn.clearTint();
      this.callback?.();
    });
  }

  private static createScaleTween(
    scene: Scene,
    button: Button,
    scale: number,
    duration: number,
    ease: string
  ) {
    scene.tweens.add({
      targets: button,
      scale,
      duration,
      ease,
    });
  }
}

interface IconInfo {
  texture: string;
  color?: number;
  scale?: number;
}

export function createIconButton(
  scene: Scene,
  type: ButtonType,
  iconInfo: IconInfo,
  callback?: () => void,
  color?: ButtonColor,
  scale?: number
): Button {
  const { texture, color: iconColor, scale: iconScale } = iconInfo;

  const icon = scene.add.sprite(0, 0, texture);
  if (color !== undefined) icon.setTint(iconColor);
  if (iconScale !== undefined) icon.setScale(iconScale);

  return new Button(scene, type, callback, color, scale, icon);
}

interface TextInfo {
  text: string;
  color?: string;
  size?: number;
  style?: string;
  family?: string;
}

export function createTextButton(
  scene: Scene,
  type: ButtonType,
  textInfo: TextInfo,
  callback?: () => void,
  color?: ButtonColor,
  scale?: number
): Button {
  const { text, color: textColor, size, style, family } = textInfo;

  const textStyle = {
    color: textColor ?? "#ffffff",
    fontSize: size ? `${size}px` : "16px",
    fontStyle: style ?? "bold",
    fontFamily: family ?? fonts.primary,
  };

  const textObject = scene.add.text(0, 0, text, textStyle).setOrigin(0.5, 0.5);

  return new Button(scene, type, callback, color, scale, textObject);
}
