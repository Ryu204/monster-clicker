import { Scene } from "phaser";
import { Modal } from "./modal";
import Slider from "./slider";
import { dataKeys, keys } from "../constants";
import LayeredMusic from "./layeredMusic";
import { setSfxVolume } from "../utils/sound";

export default class SettingsModal extends Modal {
  constructor(
    scene: Scene,
    currentMusic: LayeredMusic,
    width = 600,
    height = 700,
    onClose?: Function
  ) {
    const sliderLevel = 5;
    const musicSlider = new Slider(
      scene,
      0,
      -50,
      {
        thumbScale: 1.3,
        buttonSpacing: 70,
        max: sliderLevel,
        value: sliderLevel,
      },
      (value: number) => {
        value /= sliderLevel;
        this.scene.registry.set(dataKeys.musicLevel, value);
        currentMusic.setVolume(value);
      }
    );
    const sfxSlider = new Slider(
      scene,
      0,
      50,
      {
        thumbScale: 1.3,
        buttonSpacing: 70,
        max: sliderLevel,
        value: sliderLevel,
        thumbTexture: keys.soundOnThumb,
      },
      (value: number) => setSfxVolume(value / sliderLevel)
    );
    super(scene, [musicSlider, sfxSlider], width, height, true, onClose);
  }
}
