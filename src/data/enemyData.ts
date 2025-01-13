import { AnimationConfig, spritesheets } from "../assets";
import EnemyType from "./enemyType";

export interface EnemyStats {
  attackInterval: number;
  health: number;
  damageFromPlayer: number;
  point: number;
  damage: number;
}

export type EnemyData = EnemyStats & { anims: AnimationConfig };

const stats: Record<EnemyType, EnemyStats> = {
  golem: {
    attackInterval: 3000,
    health: 1,
    damageFromPlayer: 1,
    point: 1,
    damage: 1,
  },
  minotaur: {
    attackInterval: 4000,
    health: 2,
    damageFromPlayer: 1,
    point: 2,
    damage: 1,
  },
  goblin: {
    attackInterval: 3000,
    health: 1.5,
    damageFromPlayer: 1,
    point: 3,
    damage: 1,
  },
  wisp: {
    attackInterval: 2000,
    health: 1,
    damageFromPlayer: 1,
    point: 4,
    damage: 1,
  },
  mushroom: {
    attackInterval: 2000,
    health: 3,
    damageFromPlayer: 1,
    point: 5,
    damage: 1,
  },
  boss: {
    attackInterval: 3000,
    health: 40,
    damageFromPlayer: 1,
    point: 50,
    damage: 3,
  },
  miniboss: {
    attackInterval: 2500,
    health: 10,
    damageFromPlayer: 1,
    point: 10,
    damage: 2,
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
