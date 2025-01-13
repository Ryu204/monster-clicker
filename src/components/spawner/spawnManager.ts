import { Scene, Time } from "phaser";
import { WaveData } from "../../data/waveData";
import WaveSpawner from "./waveSpawner";
import BossSpawner from "./bossSpawner";
import Enemy from "../enemy";

export default class SpawnManager {
  private waves: { wave: WaveSpawner; timeBeforeSpawn: number }[];
  private timeline: Time.Timeline;
  private totalGameTime = 0;
  private unclearedWaveCount: number;
  private scene: Scene;
  private onWin?: Function;

  constructor(
    scene: Scene,
    waves: WaveData[],
    onEnemySpawn: Function,
    onWaveStart?: Function,
    onWin?: Function,
    onBossSpawn?: Function,
    onBossCutscene?: Function
  ) {
    this.scene = scene;
    this.timeline = scene.add.timeline({});
    this.waves = [];
    this.unclearedWaveCount = waves.length;
    this.onWin = onWin;
    waves.reduce(
      (
        [startTime, index]: number[],
        {
          enemyTypes,
          totalSpawnTime,
          totalEnemyCount,
          maxAllowedEnemyCount,
          timeBeforeSpawn,
          name,
        }
      ) => {
        const wave = new WaveSpawner(
          enemyTypes,
          totalSpawnTime,
          totalEnemyCount,
          maxAllowedEnemyCount,
          onEnemySpawn,
          this.onWaveCleared.bind(
            this,
            onEnemySpawn,
            onBossCutscene,
            onBossSpawn
          )
        );
        wave.addToTimeline(scene, this.timeline, startTime + timeBeforeSpawn);
        if (onWaveStart)
          this.timeline.add({
            at: startTime + timeBeforeSpawn / 2,
            run: () => onWaveStart(index, name),
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

  private onWaveCleared(
    onEnemySpawn?: Function,
    onBossCutscene?: Function,
    onBossSpawned?: Function
  ): void {
    this.unclearedWaveCount--;
    if (this.unclearedWaveCount === 0) {
      new BossSpawner(
        this.scene,
        onBossCutscene,
        (boss: Enemy) => {
          onEnemySpawn?.(boss);
          onBossSpawned?.();
        },
        this.scene.time.delayedCall.bind(
          this.scene.time,
          3000,
          this.onWin ?? (() => {}),
          [],
          this
        )
      );
    }
  }
}
