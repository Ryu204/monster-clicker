import { Animations } from "phaser";
import { AnimationActionConfig, AnimationConfig } from "../assets";

export function createAnimationAction(
  anims: Animations.AnimationManager,
  cfg: AnimationActionConfig,
  { fps }: AnimationConfig,
  texture: string
) {
  anims.create({
    key: cfg.name,
    frameRate: fps,
    repeat: cfg.loop ? -1 : 0,
    frames: anims.generateFrameNumbers(texture, {
      start: cfg.start,
      end: cfg.end,
    }),
  });
}

export default function createEnemyAnimations(
  anims: Animations.AnimationManager,
  acfg: AnimationConfig,
  texture: string
) {
  createAnimationAction(anims, acfg.idle, acfg, texture);
  createAnimationAction(anims, acfg.die, acfg, texture);
  createAnimationAction(anims, acfg.attack, acfg, texture);
  createAnimationAction(anims, acfg.hurt, acfg, texture);
}
