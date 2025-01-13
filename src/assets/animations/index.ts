import EnemyType from "../../data/enemyType";
import golemURL from "./golem.png";
import minotaurUrl from "./minotaur.png";
import goblinUrl from "./goblin.png";
import wispUrl from "./wisp.png";
import mushroomUrl from "./mushroom.png";
import bossUrl from "./boss.png";
import minibossUrl from "./miniboss.png";

export interface AnimationActionConfig {
  start: number;
  end: number;
  name: string;
  loop?: boolean;
}

export interface AnimationConfig {
  idle: AnimationActionConfig;
  die: AnimationActionConfig;
  attack: AnimationActionConfig & { attackFrame: number };
  hurt: AnimationActionConfig;
  fps: number;
  scale: number;
}

interface SpritesheetData {
  url: string;
  height: number;
  width: number;
  row: number;
  column: number;
  anims: AnimationConfig;
}

export const spritesheets: Record<EnemyType, SpritesheetData> = {
  golem: {
    url: golemURL,
    height: 64,
    width: 90,
    row: 5,
    column: 13,
    anims: {
      fps: 15,
      scale: 4.5,
      idle: { start: 39, end: 46, name: "golemidle", loop: true },
      attack: { start: 0, end: 10, name: "golemattack", attackFrame: 7 },
      hurt: { start: 26, end: 29, name: "golemhit" },
      die: { start: 13, end: 25, name: "golemdie" },
    },
  },
  minotaur: {
    url: minotaurUrl,
    height: 96,
    width: 96,
    row: 4,
    column: 9,
    anims: {
      fps: 10,
      scale: 4,
      idle: { start: 0, end: 4, name: "bullidle", loop: true },
      attack: { start: 9, end: 17, name: "bullattack", attackFrame: 3 },
      hurt: { start: 18, end: 20, name: "bullhit" },
      die: { start: 27, end: 32, name: "bulldie" },
    },
  },
  goblin: {
    url: goblinUrl,
    height: 150,
    width: 150,
    row: 5,
    column: 8,
    anims: {
      fps: 12,
      scale: 4.5,
      idle: { start: 16, end: 19, name: "goblinidle", loop: true },
      attack: { start: 0, end: 7, name: "goblinattack", attackFrame: 7 },
      hurt: { start: 32, end: 35, name: "goblinhit" },
      die: { start: 8, end: 11, name: "goblindie" },
    },
  },
  wisp: {
    url: wispUrl,
    height: 150,
    width: 150,
    row: 4,
    column: 8,
    anims: {
      fps: 10,
      scale: 6,
      idle: { start: 16, end: 23, name: "wispidle", loop: true },
      attack: { start: 0, end: 7, name: "wispattack", attackFrame: 7 },
      hurt: { start: 24, end: 27, name: "wisphit" },
      die: { start: 8, end: 11, name: "wispdie" },
    },
  },
  mushroom: {
    url: mushroomUrl,
    height: 150,
    width: 150,
    row: 5,
    column: 11,
    anims: {
      fps: 13,
      scale: 5,
      idle: { start: 33, end: 36, name: "mushroomidle", loop: true },
      attack: { start: 11, end: 21, name: "mushroomattack", attackFrame: 8 },
      hurt: { start: 44, end: 47, name: "mushroomhit" },
      die: { start: 22, end: 25, name: "mushroomdie" },
    },
  },
  boss: {
    url: bossUrl,
    height: 93,
    width: 140,
    row: 8,
    column: 8,
    anims: {
      fps: 8,
      scale: 13,
      idle: { start: 0, end: 7, name: "bossidle", loop: true },
      attack: { start: 39, end: 47, name: "bossattack", attackFrame: 6 },
      hurt: { start: 26, end: 28, name: "bosshit" },
      die: { start: 29, end: 38, name: "bossdie" },
    },
  },
  miniboss: {
    url: minibossUrl,
    height: 80,
    width: 120,
    row: 3,
    column: 11,
    anims: {
      fps: 9,
      scale: 8,
      idle: { start: 22, end: 31, name: "minibossidle", loop: true },
      attack: { start: 0, end: 9, name: "minibossattack", attackFrame: 3 },
      hurt: { start: 10, end: 10, name: "minibosshit" },
      die: { start: 11, end: 20, name: "minibossdie" },
    },
  },
};

export const bossSpritesheets: {
  attack: AnimationActionConfig;
  walk: AnimationActionConfig;
  cast: AnimationActionConfig;
  origin: { x: number; y: number };
} = {
  origin: { x: 0.73, y: 0.75 },
  attack: {
    start: 16,
    end: 25,
    name: "bossattack2",
    loop: false,
  },
  walk: {
    start: 8,
    end: 15,
    name: "bosswalk",
    loop: true,
  },
  cast: {
    start: 48,
    end: 63,
    name: "bossspell",
    loop: false,
  },
};
