import { Cameras, Math, Scene, Time } from "phaser";
import enemies from "../../data/enemyData";
import { randomElement, shuffle } from "../../utils/math";
import Enemy from "../enemy";
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
  private onEnemySpawn?: Function;
  private nextValidPositionIndex: number = 0;
  private possiblePositions?: Point[];

  private static poissonDiskSampler?: PoissonDiskSampling;

  constructor(
    enemyTypes: EnemyType[],
    totalSpawnTime: number,
    totalEnemyCount: number,
    onEnemySpawn?: Function
  ) {
    this.enemyTypes = enemyTypes;
    this.totalSpawnTime = totalSpawnTime;
    this.totalEnemyCount = totalEnemyCount;
    this.onEnemySpawn = onEnemySpawn;
  }

  addToTimeline(scene: Scene, timeline: Time.Timeline): void {
    if (!this.possiblePositions) {
      this.possiblePositions = WaveSpawner.poissonDiskSampling(
        scene.cameras.main,
        game.maxEnemySize
      );
    }
    alert("Length of all positions is " + this.possiblePositions.length);
    const config = Array.from({ length: this.totalEnemyCount }, () => {
      const at = Math.Between(0, this.totalSpawnTime);
      return { at, run: this.spawnOneEnemy.bind(this, scene) };
    });
    timeline.add(config);
  }

  private spawnOneEnemy(scene: Scene) {
    const type = randomElement(this.enemyTypes)!;
    const data = enemies[type];
    this.nextValidPositionIndex =
      (this.nextValidPositionIndex + 1) % this.possiblePositions!.length;
    const point = this.possiblePositions![this.nextValidPositionIndex];

    const enemy = new Enemy(scene, type, data).setPosition(point.x, point.y);
    this.onEnemySpawn?.(enemy);
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
        tries: 10,
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
