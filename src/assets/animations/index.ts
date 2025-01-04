export interface AnimationActionConfig {
  start: number;
  end: number;
  name: string;
  loop?: boolean;
}

export interface AnimationConfig {
  idle: AnimationActionConfig;
  die: AnimationActionConfig;
  attack: AnimationActionConfig;
  hurt: AnimationActionConfig;
  fps: number;
  scale: number;
}

export const golem: AnimationConfig = {
  fps: 15,
  scale: 6,
  idle: { start: 39, end: 46, name: "golemidle", loop: true },
  attack: { start: 0, end: 10, name: "golemattack" },
  hurt: { start: 26, end: 29, name: "golemhit" },
  die: { start: 13, end: 25, name: "golemdie" },
};
