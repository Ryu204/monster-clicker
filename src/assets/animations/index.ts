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

export const golemAnimation: AnimationConfig = {
  fps: 15,
  scale: 4.5,
  idle: { start: 39, end: 46, name: "golemidle", loop: true },
  attack: { start: 0, end: 10, name: "golemattack", attackFrame: 7 },
  hurt: { start: 26, end: 29, name: "golemhit" },
  die: { start: 13, end: 25, name: "golemdie" },
};

export const minotaurAnimation: AnimationConfig = {
  fps: 10,
  scale: 4,
  idle: { start: 0, end: 4, name: "bullidle", loop: true },
  attack: { start: 9, end: 17, name: "bullattack", attackFrame: 3 },
  hurt: { start: 18, end: 20, name: "bullhit" },
  die: { start: 27, end: 32, name: "bulldie" },
};

export const goblinAnimation: AnimationConfig = {
  fps: 10,
  scale: 4.5,
  idle: { start: 16, end: 19, name: "goblinidle", loop: true },
  attack: { start: 0, end: 7, name: "goblinattack", attackFrame: 7 },
  hurt: { start: 32, end: 35, name: "goblinhit" },
  die: { start: 8, end: 11, name: "goblindie" },
};
