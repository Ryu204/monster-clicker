import { GameObjects, Scene } from "phaser";

interface TrailConfig {
  maxPoints: number;
  timeDecay: number;
  color: number;
  width: number;
}

interface Point {
  x: number;
  y: number;
  time: number;
}

export default class Trail extends GameObjects.Graphics {
  private config: TrailConfig;
  private points: Point[];

  constructor(
    scene: Scene,
    config: TrailConfig = {
      maxPoints: 40,
      timeDecay: 300,
      color: 0xffffff,
      width: 30,
    }
  ) {
    super(scene);
    this.config = config;
    this.points = [];
    this.setDepth(1);
    scene.add.existing(this);
  }

  addPoint(x: number, y: number) {
    this.points.push({ x, y, time: this.config.timeDecay });
    if (this.points.length > this.config.maxPoints) {
      this.points.shift();
    }
  }

  preUpdate(_time: number, delta: number) {
    this.removeOldPoints(delta);

    this.clear();
    if (this.points.length <= 10) {
      return;
    }
    this.beginPath();
    for (let i = 1; i < this.points.length; i++) {
      const point = this.points[i];
      const prevPoint = this.points[i - 1];
      const width = this.lerp(i / this.points.length, 0, this.config.width);

      this.lineStyle(width, this.config.color);
      this.moveTo(prevPoint.x, prevPoint.y);
      this.lineTo(point.x, point.y);
    }
    this.strokePath();
  }

  private removeOldPoints(dt: number) {
    this.points.forEach((e) => (e.time -= dt));
    this.points = this.points.filter((e) => e.time > 0);
  }

  private lerp(t: number, min: number, max: number) {
    return (max - min) * t + min;
  }
}
