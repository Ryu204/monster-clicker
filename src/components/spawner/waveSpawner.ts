import { Cameras, Math, Scene, Time } from "phaser";
import enemies from "../../data/enemyData";
import { randomElement } from "../../utils/math";
import Enemy, { Events as EvenmyEvents } from "../enemy";
import EnemyType from "../../data/enemyType";

interface Point {
  x: number;
  y: number;
}

export default class WaveSpawner {
  private enemyTypes: EnemyType[];
  private totalSpawnTime: number;
  private totalEnemyCount: number;
  private maxAllowedEnemyCount: number;
  private aliveEnemyCount: number = 0;
  private pendingSpawnCount: number;

  private enemySpawnCallback?: Function;
  private waveClearedCallback?: Function;

  private nextValidPositionIndex: number = 0;
  private possiblePositions?: Point[];

  constructor(
    enemyTypes: EnemyType[],
    totalSpawnTime: number,
    totalEnemyCount: number,
    maxAllowedEnemyCount: number,
    enemySpawnCallback?: Function,
    waveClearedCallback?: Function
  ) {
    this.enemyTypes = enemyTypes;
    this.totalSpawnTime = totalSpawnTime;
    this.totalEnemyCount = totalEnemyCount;
    this.maxAllowedEnemyCount = maxAllowedEnemyCount;
    this.enemySpawnCallback = enemySpawnCallback;
    this.waveClearedCallback = waveClearedCallback;
    this.pendingSpawnCount = totalEnemyCount;
  }

  addToTimeline(
    scene: Scene,
    timeline: Time.Timeline,
    startTime: number
  ): void {
    if (!this.possiblePositions) {
      this.possiblePositions = WaveSpawner.getPossiblePositions(
        scene.cameras.main
      );
    }
    const config = Array.from({ length: this.totalEnemyCount }, () => {
      const at = Math.Between(startTime, startTime + this.totalSpawnTime);
      return { at, run: this.onEnemySpawnTimePoint.bind(this, scene) };
    });
    timeline.add(config);
  }

  private onEnemySpawnTimePoint(scene: Scene): void {
    this.pendingSpawnCount--;
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
    enemy.on(EvenmyEvents.dead, () => {
      this.aliveEnemyCount--;
      if (this.pendingSpawnCount == 0 && this.aliveEnemyCount == 0)
        this.waveClearedCallback?.();
    });

    this.enemySpawnCallback?.(enemy);
  }

  static getPossiblePositions(
    camera: Cameras.Scene2D.Camera,
    count = 10
  ): Point[] {
    return createRandomPositions(
      count,
      camera.x,
      camera.y,
      camera.width,
      camera.height
    );
  }
}

function createRandomPositions(
  count: number,
  x: number,
  y: number,
  width: number,
  height: number,
  marginX = 0.14,
  marginY = 0.15
): Point[] {
  const startX = x + marginX * width;
  const startY = y + marginY * height;
  const endX = x + (1 - marginX) * width;
  const endY = y + (1 - marginY) * height;
  return Array.from({ length: count }, () => ({
    x: Math.Between(startX, endX),
    y: Math.Between(startY, endY),
  }));
}
