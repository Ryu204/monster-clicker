import { Sound } from "phaser";

export type Sound =
  | Sound.NoAudioSound
  | Sound.HTML5AudioSound
  | Sound.WebAudioSound;
