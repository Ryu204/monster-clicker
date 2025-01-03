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
