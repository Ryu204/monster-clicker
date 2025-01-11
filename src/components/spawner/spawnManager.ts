import { Scene, Time } from "phaser";
import { WaveData } from "../../data/waveData";
import WaveSpawner from "./waveSpawner";

export default class SpawnManager {
  private waves: { wave: WaveSpawner; timeBeforeSpawn: number }[];
  private timeline: Time.Timeline;
  private totalGameTime = 0;

  constructor(
    scene: Scene,
    waves: WaveData[],
    onEnemySpawn: Function,
    onWaveStart?: Function,
    onWaveStartContext?: object
  ) {
    this.timeline = scene.add.timeline({});
    this.waves = [];
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
          onEnemySpawn
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
}
