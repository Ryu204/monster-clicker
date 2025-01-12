import { AnimationConfig, spritesheets } from "../assets";
import EnemyType from "./enemyType";

export interface EnemyStats {
  attackInterval: number;
  health: number;
  damageFromPlayer: number;
  point: number;
}

export type EnemyData = EnemyStats & { anims: AnimationConfig };

const stats: Record<EnemyType, EnemyStats> = {
  golem: {
    attackInterval: 3000,
    health: 1,
    damageFromPlayer: 1,
    point: 1,
  },
  minotaur: {
    attackInterval: 4000,
    health: 2,
    damageFromPlayer: 1,
    point: 2,
  },
  goblin: {
    attackInterval: 3000,
    health: 1.5,
    damageFromPlayer: 1,
    point: 3,
  },
  wisp: {
    attackInterval: 2000,
    health: 1,
    damageFromPlayer: 1,
    point: 4,
  },
  mushroom: {
    attackInterval: 2000,
    health: 3,
    damageFromPlayer: 1,
    point: 5,
  },
  boss: {
    attackInterval: 5000,
    health: 20,
    damageFromPlayer: 1,
    point: 50,
  },
};

const enemies: Record<EnemyType, EnemyData> = Object.keys(stats).reduce(
  (acc, key) => {
    const enemyType = key as EnemyType;
    acc[enemyType] = {
      ...stats[enemyType],
      anims: spritesheets[enemyType].anims,
    };
    return acc;
  },
  {} as Record<EnemyType, EnemyData>
);
export default enemies;
