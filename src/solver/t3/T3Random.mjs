export function createSeededRandom(seed = 1) {
  let state = hashSeed(seed) >>> 0;
  if (state === 0) {
    state = 0x6d2b79f5;
  }
  let cachedGaussian = null;

  return {
    seed,
    next() {
      state = (state + 0x6d2b79f5) >>> 0;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    },
    gaussian(mean = 0, standardDeviation = 1) {
      if (cachedGaussian != null) {
        const value = cachedGaussian;
        cachedGaussian = null;
        return mean + standardDeviation * value;
      }
      let u = 0;
      let v = 0;
      while (u === 0) {
        u = this.next();
      }
      while (v === 0) {
        v = this.next();
      }
      const magnitude = Math.sqrt(-2 * Math.log(u));
      const angle = 2 * Math.PI * v;
      cachedGaussian = magnitude * Math.sin(angle);
      return mean + standardDeviation * magnitude * Math.cos(angle);
    },
    snapshot() {
      return { schema: "t3-seeded-random-snapshot.v1", seed, state };
    },
  };
}

export function hashSeed(seed) {
  const seedText = String(seed);
  let hash = 0x811c9dc5;
  for (let index = 0; index < seedText.length; index += 1) {
    hash ^= seedText.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}
