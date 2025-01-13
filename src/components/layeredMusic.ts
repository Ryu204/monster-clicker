import { Scene } from "phaser";
import { Sound } from "../utils/typedef";

type SetLayerParam = "all" | number[];

export default class LayeredMusic {
  private layers: Sound[];
  private activeLayers: number = 0;
  private scene: Scene;
  private volume: number = 1;

  constructor(scene: Scene, keys: string[]) {
    this.scene = scene;
    this.layers = keys.map((key: string) => scene.sound.add(key).setLoop(true));
  }

  setLayers(param: SetLayerParam): LayeredMusic {
    if (param === "all") {
      this.activeLayers = (1 << this.layers.length) - 1;
    } else {
      this.activeLayers = param
        .filter((i) => i >= 0 && i < this.layers.length)
        .reduce((acc, i) => acc | (1 << i), 0);
    }
    this.layers.forEach((_, i) => {
      const isActiveLayer = ((1 << i) & this.activeLayers) !== 0;
      this.setActive(i, isActiveLayer);
    });
    return this;
  }

  setSingleLayer(index: number, on: boolean): LayeredMusic {
    this.setActive(index, on);
    return this;
  }

  play(): LayeredMusic {
    this.layers.forEach((sound) => sound.play());
    return this;
  }

  pause(): LayeredMusic {
    this.layers.forEach((sound) => sound.pause());
    return this;
  }

  resume(): LayeredMusic {
    this.layers.forEach((sound) => sound.resume());
    return this;
  }

  stop(): LayeredMusic {
    this.layers.forEach((sound) => sound.stop());
    return this;
  }

  destroy(): LayeredMusic {
    this.layers.forEach((sound) => sound.destroy());
    this.layers = [];
    this.setLayers([]);
    return this;
  }

  setVolume(volume: number): LayeredMusic {
    this.volume = volume;
    this.layers.forEach((sound) => sound.setVolume(this.volume));
    return this;
  }

  setActive(layer: number, on: boolean) {
    this.scene.tweens.add({
      targets: this.layers[layer],
      volume: on ? this.volume : 0,
      duration: 1000,
      ease: "Linear",
    });
  }
}
