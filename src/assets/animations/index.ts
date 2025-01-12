import EnemyType from "../../data/enemyType";
import golemURL from "./golem.png";
import minotaurUrl from "./minotaur.png";
import goblinUrl from "./goblin.png";
import wispUrl from "./wisp.png";
import mushroomUrl from "./mushroom.png";

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
      fps: 10,
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
};
