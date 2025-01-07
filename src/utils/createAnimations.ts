import { Animations } from "phaser";
import { AnimationActionConfig, AnimationConfig } from "../assets";

function createAction(
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
  createAction(anims, acfg.idle, acfg, texture);
  createAction(anims, acfg.die, acfg, texture);
  createAction(anims, acfg.attack, acfg, texture);
  createAction(anims, acfg.hurt, acfg, texture);
}
