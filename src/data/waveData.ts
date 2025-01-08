import EnemyType from "./enemyType";

export interface WaveData {
  enemyTypes: EnemyType[];
  totalSpawnTime: number;
  totalEnemyCount: number;
  maxAllowedEnemyCount: number;
  timeBeforeSpawn: number;
}

const waves: WaveData[] = [
  {
    enemyTypes: [EnemyType.golem, EnemyType.goblin],
    totalSpawnTime: 20000,
    totalEnemyCount: 50,
    maxAllowedEnemyCount: 3,
    timeBeforeSpawn: 4000,
  },
  {
    enemyTypes: [EnemyType.minotaur, EnemyType.golem],
    totalSpawnTime: 50000,
    totalEnemyCount: 30,
    maxAllowedEnemyCount: 5,
    timeBeforeSpawn: 3000,
  },
];

export default waves;
