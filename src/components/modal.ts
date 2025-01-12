import { GameObjects, Scene } from "phaser";
import { depth, keys } from "../constants";
import { defaultNineSlice } from "../utils/nineslice";
import { centerOnCamera } from "../utils/layout";

type Children = GameObjects.GameObject;

export class Modal extends GameObjects.Container {
  private closable: boolean;
  private onCloseCallback?: Function;

  constructor(
    scene: Scene,
    children: Array<Children> = [],
    width: number = 600,
    height: number = 700,
    closable: boolean = true,
    onClose?: Function
  ) {
    super(scene);
    this.closable = closable;
    this.onCloseCallback = onClose;

    scene.add.existing(this);

    const bgr = defaultNineSlice(
      this.scene,
      0,
      0,
      keys.whiteBackground,
      width,
      height
    ).setInteractive();

    centerOnCamera(this, this.scene.cameras.main);

    const overlay = scene.add
      .rectangle(0, 0, scene.scale.width, scene.scale.height, 0x000000, 0.2)
      .setOrigin(0)
      .setInteractive()
      .on("pointerup", this.onClose, this);

    this.add(overlay).add(bgr).add(children);
    overlay.setPosition(-scene.scale.width / 2, -scene.scale.height / 2);

    this.setDepth(depth.ui + 10);
  }

  show(): void {
    this.setVisible(true);
  }

  private onClose() {
    if (!this.closable) return;
    this.onCloseCallback?.();
    this.setVisible(false);
  }
}
