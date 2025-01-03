import { Scene } from "phaser";
import { Sound } from "../utils/typedef";

type SetLayerParam = "all" | number[];

export default class LayeredMusic {
  private layers: Sound[];
  private activeLayers: number = 0;

  constructor(scene: Scene, keys: string[]) {
    this.layers = keys.map((key: string) => scene.sound.add(key));
  }

  setLayers(param: SetLayerParam): LayeredMusic {
    if (param === "all") {
      this.activeLayers = (1 << this.layers.length) - 1;
    } else {
      this.activeLayers = param
        .filter((i) => i >= 0 && i < this.layers.length)
        .reduce((acc, i) => acc | (1 << i), 0);
    }
    this.layers.forEach((sound, i) => {
      const isActiveLayer = (1 << i) & this.activeLayers;
      if (isActiveLayer) {
        sound.setVolume(1);
      } else {
        sound.setVolume(0);
      }
    });
    return this;
  }

  setSingleLayer(index: number, on: boolean): LayeredMusic {
    this.layers[index].setVolume(on ? 1 : 0);
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
}
