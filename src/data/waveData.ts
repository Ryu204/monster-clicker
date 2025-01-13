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
    enemyTypes: [EnemyType.mushroom, EnemyType.goblin],
    totalSpawnTime: 1000,
    totalEnemyCount: 5,
    maxAllowedEnemyCount: 3,
    timeBeforeSpawn: 1000,
  },
  {
    enemyTypes: [EnemyType.minotaur, EnemyType.golem],
    totalSpawnTime: 5000,
    totalEnemyCount: 3,
    maxAllowedEnemyCount: 5,
    timeBeforeSpawn: 3000,
  },
  {
    enemyTypes: [EnemyType.miniboss],
    totalSpawnTime: 6000,
    totalEnemyCount: 5,
    maxAllowedEnemyCount: 1,
    timeBeforeSpawn: 2000,
    name: game.minibossName,
  },
  {
    enemyTypes: [EnemyType.wisp, EnemyType.goblin],
    totalSpawnTime: 5000,
    totalEnemyCount: 3,
    maxAllowedEnemyCount: 5,
    timeBeforeSpawn: 3000,
  },
  {
    enemyTypes: [EnemyType.wisp, EnemyType.mushroom],
    totalSpawnTime: 5000,
    totalEnemyCount: 3,
    maxAllowedEnemyCount: 5,
    timeBeforeSpawn: 3000,
  },
];

export default waves;
