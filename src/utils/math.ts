import { Math as MathPhaser } from "phaser";

export function random(count: number): number[] {
  if (count <= 0) throw new RangeError("count must be greater than 0");
  const arr = new Uint32Array(count);
  window.crypto.getRandomValues(arr);
  // Normalize the values to be in the range [0, 1)
  const normalizedArr = Array.from(arr).map((val) => val / (0xffffffff + 1));
  return normalizedArr;
}

export function randomOne(): number {
  return random(1)[0];
}

export function lerpAngle(
  startAngle: number,
  endAngle: number,
  t: number
): number {
  let delta = MathPhaser.Angle.Wrap(endAngle - startAngle);
  return MathPhaser.Angle.Wrap(startAngle + delta * t);
}

export function randomElement<T>(arr: Array<T>): T | null {
  if (arr.length === 0) return null;
  return arr[Math.floor(randomOne() * arr.length)];
}

// https://javascript.info/task/shuffle
export function shuffle<T>(array: Array<T>): void {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
