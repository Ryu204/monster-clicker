import { Math, Scene, Types } from "phaser";

let volumeLevel = 1;

export function setSfxVolume(volume: number) {
  volumeLevel = volume;
}

export function playSound(
  scene: Scene,
  key: string,
  config?: Types.Sound.SoundConfig
): void {
  scene.sound.play(key, { volume: volumeLevel, ...(config ?? {}) });
}

export function playRandomPitch(
  scene: Scene,
  key: string,
  config?: Types.Sound.SoundConfig
): void {
  scene.sound.play(key, {
    detune: Math.Between(-1200, 1200),
    volume: volumeLevel,
    ...(config ?? {}),
  });
}
