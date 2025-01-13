import { game } from "../constants";
import EnemyType from "./enemyType";

export interface WaveData {
  enemyTypes: EnemyType[];
  totalSpawnTime: number;
  totalEnemyCount: number;
  maxAllowedEnemyCount: number;
  timeBeforeSpawn: number;
  name?: string;
}

const waves: WaveData[] = [
  {
    enemyTypes: [EnemyType.wisp],
    totalSpawnTime: 8000,
    totalEnemyCount: 15,
    maxAllowedEnemyCount: 5,
    timeBeforeSpawn: 1000,
  },
  {
    enemyTypes: [EnemyType.wisp, EnemyType.goblin],
    totalSpawnTime: 10000,
    totalEnemyCount: 30,
    maxAllowedEnemyCount: 4,
    timeBeforeSpawn: 3000,
  },
  {
    enemyTypes: [EnemyType.miniboss],
    totalSpawnTime: 10000,
    totalEnemyCount: 10,
    maxAllowedEnemyCount: 2,
    timeBeforeSpawn: 2000,
    name: game.minibossName,
  },
  {
    enemyTypes: [EnemyType.minotaur, EnemyType.golem],
    totalSpawnTime: 10000,
    totalEnemyCount: 30,
    maxAllowedEnemyCount: 6,
    timeBeforeSpawn: 3000,
  },
  {
    enemyTypes: [EnemyType.minotaur, EnemyType.mushroom, EnemyType.golem],
    totalSpawnTime: 10000,
    totalEnemyCount: 30,
    maxAllowedEnemyCount: 6,
    timeBeforeSpawn: 3000,
  },
];

export const waveMusics = {
  0: [0],
  1: [0, 1],
  2: [2],
  3: [0, 2],
  4: [0, 1, 2],
  bossCutscene: [0],
};

export default waves;
