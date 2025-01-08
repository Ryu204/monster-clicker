import { AnimationConfig, spritesheets } from "../assets";
import EnemyType from "./enemyType";

export interface EnemyStats {
  attackInterval: number;
  health: number;
  damageFromPlayer: number;
}

export type EnemyData = EnemyStats & { anims: AnimationConfig };

const stats: { [key in EnemyType]: EnemyStats } = {
  [EnemyType.golem]: {
    attackInterval: 3000,
    health: 1,
    damageFromPlayer: 1,
  },
  [EnemyType.minotaur]: {
    attackInterval: 4000,
    health: 2,
    damageFromPlayer: 1,
  },
};

const enemies: { [key in EnemyType]: EnemyData } = Object.keys(stats).reduce(
  (acc, key) => {
    const enemyType = key as EnemyType;
    acc[enemyType] = {
      ...stats[enemyType],
      anims: spritesheets[enemyType].anims,
    };
    return acc;
  },
  {} as { [key in EnemyType]: EnemyData }
);
export default enemies;
