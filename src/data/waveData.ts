import EnemyType from "./enemyType";

export interface WaveData {
  enemyTypes: EnemyType[];
  totalSpawnTime: number;
  totalEnemyCount: number;
  timeBeforeSpawn: number;
}

const waves: WaveData[] = [
  {
    enemyTypes: [EnemyType.golem],
    totalSpawnTime: 20000,
    totalEnemyCount: 50,
    timeBeforeSpawn: 4000,
  },
  {
    enemyTypes: [EnemyType.golem],
    totalSpawnTime: 50000,
    totalEnemyCount: 30,
    timeBeforeSpawn: 3000,
  },
];

export default waves;
