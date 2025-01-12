import { Scene, Time } from "phaser";
import { WaveData } from "../../data/waveData";
import WaveSpawner from "./waveSpawner";
import BossSpawner from "./bossSpawner";

export default class SpawnManager {
  private waves: { wave: WaveSpawner; timeBeforeSpawn: number }[];
  private timeline: Time.Timeline;
  private totalGameTime = 0;
  private unclearedWaveCount: number;
  private scene: Scene;

  constructor(
    scene: Scene,
    waves: WaveData[],
    onEnemySpawn: Function,
    onWaveStart?: Function,
    onWaveStartContext?: object
  ) {
    this.scene = scene;
    this.timeline = scene.add.timeline({});
    this.waves = [];
    this.unclearedWaveCount = waves.length;
    waves.reduce(
      (
        [startTime, index]: number[],
        {
          enemyTypes,
          totalSpawnTime,
          totalEnemyCount,
          maxAllowedEnemyCount,
          timeBeforeSpawn,
        }
      ) => {
        const wave = new WaveSpawner(
          enemyTypes,
          totalSpawnTime,
          totalEnemyCount,
          maxAllowedEnemyCount,
          onEnemySpawn,
          this.onWaveCleared.bind(this)
        );
        wave.addToTimeline(scene, this.timeline, startTime + timeBeforeSpawn);
        if (onWaveStart)
          this.timeline.add({
            at: startTime + timeBeforeSpawn / 2,
            run: onWaveStart.bind(onWaveStartContext, index),
          });
        this.waves.push({ wave, timeBeforeSpawn });
        this.totalGameTime += timeBeforeSpawn + totalSpawnTime;
        return [startTime + timeBeforeSpawn + totalSpawnTime, index + 1];
      },
      [0, 0]
    );
    this.timeline.play();
  }

  getTotalGameTime(): number {
    return this.totalGameTime;
  }

  stop(): void {
    this.waves = [];
    this.timeline.stop();
    this.timeline.destroy();
  }

  private onWaveCleared(): void {
    this.unclearedWaveCount--;
    console.log(this.unclearedWaveCount);
    if (this.unclearedWaveCount === 0) {
      new BossSpawner(this.scene);
    }
  }
}
