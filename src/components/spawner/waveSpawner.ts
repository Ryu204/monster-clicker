import { Cameras, Math, Scene, Time } from "phaser";
import enemies from "../../data/enemyData";
import { randomElement, shuffle } from "../../utils/math";
import Enemy, { Events as EvenmyEvents } from "../enemy";
import EnemyType from "../../data/enemyType";
import PoissonDiskSampling from "poisson-disk-sampling";
import { game } from "../../constants";

interface Point {
  x: number;
  y: number;
}

export default class WaveSpawner {
  private enemyTypes: EnemyType[];
  private totalSpawnTime: number;
  private totalEnemyCount: number;
  private maxAllowedEnemyCount: number;
  private enemySpawnCallback?: Function;
  private nextValidPositionIndex: number = 0;
  private possiblePositions?: Point[];
  private aliveEnemyCount: number = 0;

  private static poissonDiskSampler?: PoissonDiskSampling;

  constructor(
    enemyTypes: EnemyType[],
    totalSpawnTime: number,
    totalEnemyCount: number,
    maxAllowedEnemyCount: number,
    enemySpawnCallback?: Function
  ) {
    this.enemyTypes = enemyTypes;
    this.totalSpawnTime = totalSpawnTime;
    this.totalEnemyCount = totalEnemyCount;
    this.maxAllowedEnemyCount = maxAllowedEnemyCount;
    this.enemySpawnCallback = enemySpawnCallback;
  }

  addToTimeline(
    scene: Scene,
    timeline: Time.Timeline,
    startTime: number
  ): void {
    if (!this.possiblePositions) {
      this.possiblePositions = WaveSpawner.poissonDiskSampling(
        scene.cameras.main,
        game.maxEnemySize
      );
    }
    const config = Array.from({ length: this.totalEnemyCount }, () => {
      const at = Math.Between(startTime, startTime + this.totalSpawnTime);
      return { at, run: this.onEnemySpawnTimePoint.bind(this, scene) };
    });
    timeline.add(config);
  }

  private onEnemySpawnTimePoint(scene: Scene): void {
    if (this.aliveEnemyCount >= this.maxAllowedEnemyCount) {
      return;
    }
    this.spawnOneEnemy(scene);
  }

  private spawnOneEnemy(scene: Scene): void {
    const type = randomElement(this.enemyTypes)!;
    const data = enemies[type];
    this.nextValidPositionIndex =
      (this.nextValidPositionIndex + 1) % this.possiblePositions!.length;
    const point = this.possiblePositions![this.nextValidPositionIndex];

    const enemy = new Enemy(scene, type, data).setPosition(point.x, point.y);

    this.aliveEnemyCount++;
    enemy.on(EvenmyEvents.dead, () => this.aliveEnemyCount--);

    this.enemySpawnCallback?.(enemy);
  }

  static poissonDiskSampling(
    camera: Cameras.Scene2D.Camera,
    minRadius: number
  ): Point[] {
    const margin = game.maxEnemySize * 0.7;
    if (!this.poissonDiskSampler) {
      this.poissonDiskSampler = new PoissonDiskSampling({
        shape: [camera.width - 2 * margin, camera.height - 2 * margin],
        minDistance: minRadius,
        tries: 20,
      });
    }
    this.poissonDiskSampler.reset();
    const points = this.poissonDiskSampler
      .fill()
      .map((point) => ({ x: margin + point[0], y: margin + point[1] }));
    shuffle(points);
    return points;
  }
}
