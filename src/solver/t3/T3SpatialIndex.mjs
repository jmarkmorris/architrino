export const T3_SPATIAL_INDEX_SCHEMA = "t3-spatial-index.v1";

export class T3SpatialIndex {
  constructor(input = {}) {
    if (!input.topology) {
      throw new TypeError("T3SpatialIndex requires a topology");
    }
    this.schema = T3_SPATIAL_INDEX_SCHEMA;
    this.topology = input.topology;
    this.interactionRadius = positiveFiniteNumber(input.interactionRadius ?? input.radius ?? 1, "interactionRadius");
    this.radiusSquared = this.interactionRadius * this.interactionRadius;
    const requestedCellSize = positiveFiniteNumber(input.cellSize ?? this.interactionRadius, "cellSize");
    this.cellsPerAxis = Math.max(1, Math.floor(this.topology.sideLength / requestedCellSize));
    this.cellSize = this.topology.sideLength / this.cellsPerAxis;
    this.neighborCellRadius = Math.min(
      this.cellsPerAxis,
      Math.ceil(this.interactionRadius / this.cellSize)
    );
    this.cells = new Map();
    this.cellCoordinates = new Int32Array(0);
    this._neighborOffsets = createNeighborOffsets(this.neighborCellRadius);
  }

  rebuild(state) {
    if (this.cellCoordinates.length !== state.particleCount * 3) {
      this.cellCoordinates = new Int32Array(state.particleCount * 3);
    }
    this.cells.clear();
    for (let index = 0; index < state.particleCount; index += 1) {
      const positionOffset = index * 3;
      const ix = this.coordinateToCell(state.positions[positionOffset]);
      const iy = this.coordinateToCell(state.positions[positionOffset + 1]);
      const iz = this.coordinateToCell(state.positions[positionOffset + 2]);
      this.cellCoordinates[positionOffset] = ix;
      this.cellCoordinates[positionOffset + 1] = iy;
      this.cellCoordinates[positionOffset + 2] = iz;
      const key = this.cellKey(ix, iy, iz);
      let bucket = this.cells.get(key);
      if (!bucket) {
        bucket = [];
        this.cells.set(key, bucket);
      }
      bucket.push(index);
    }
    return this;
  }

  coordinateToCell(value) {
    const cell = Math.floor(value / this.cellSize);
    return modulo(cell, this.cellsPerAxis);
  }

  cellKey(ix, iy, iz) {
    const x = modulo(ix, this.cellsPerAxis);
    const y = modulo(iy, this.cellsPerAxis);
    const z = modulo(iz, this.cellsPerAxis);
    return x + this.cellsPerAxis * (y + this.cellsPerAxis * z);
  }

  forEachNeighborPair(state, visitor) {
    const seenCells = new Set();
    for (let index = 0; index < state.particleCount; index += 1) {
      seenCells.clear();
      const coordinateOffset = index * 3;
      const ix = this.cellCoordinates[coordinateOffset];
      const iy = this.cellCoordinates[coordinateOffset + 1];
      const iz = this.cellCoordinates[coordinateOffset + 2];
      for (const offset of this._neighborOffsets) {
        const key = this.cellKey(ix + offset[0], iy + offset[1], iz + offset[2]);
        if (seenCells.has(key)) {
          continue;
        }
        seenCells.add(key);
        const bucket = this.cells.get(key);
        if (!bucket) {
          continue;
        }
        for (const otherIndex of bucket) {
          if (otherIndex <= index) {
            continue;
          }
          const distanceSquared = this.topology.nearestImageDistanceSquared(
            state.positions,
            index,
            state.positions,
            otherIndex
          );
          if (distanceSquared <= this.radiusSquared) {
            visitor(index, otherIndex, distanceSquared);
          }
        }
      }
    }
  }

  queryNeighbors(state, particleIndex, visitor) {
    const seenCells = new Set();
    const coordinateOffset = particleIndex * 3;
    const ix = this.cellCoordinates[coordinateOffset];
    const iy = this.cellCoordinates[coordinateOffset + 1];
    const iz = this.cellCoordinates[coordinateOffset + 2];
    for (const offset of this._neighborOffsets) {
      const key = this.cellKey(ix + offset[0], iy + offset[1], iz + offset[2]);
      if (seenCells.has(key)) {
        continue;
      }
      seenCells.add(key);
      const bucket = this.cells.get(key);
      if (!bucket) {
        continue;
      }
      for (const otherIndex of bucket) {
        if (otherIndex === particleIndex) {
          continue;
        }
        const distanceSquared = this.topology.nearestImageDistanceSquared(
          state.positions,
          particleIndex,
          state.positions,
          otherIndex
        );
        if (distanceSquared <= this.radiusSquared) {
          visitor(otherIndex, distanceSquared);
        }
      }
    }
  }

  describe() {
    return {
      schema: this.schema,
      interactionRadius: this.interactionRadius,
      cellSize: this.cellSize,
      cellsPerAxis: this.cellsPerAxis,
      occupiedCellCount: this.cells.size,
      neighborCellRadius: this.neighborCellRadius,
    };
  }
}

export function createT3SpatialIndex(input = {}) {
  return new T3SpatialIndex(input);
}

function createNeighborOffsets(radius) {
  const offsets = [];
  for (let dx = -radius; dx <= radius; dx += 1) {
    for (let dy = -radius; dy <= radius; dy += 1) {
      for (let dz = -radius; dz <= radius; dz += 1) {
        offsets.push([dx, dy, dz]);
      }
    }
  }
  return offsets;
}

function modulo(value, modulus) {
  return ((value % modulus) + modulus) % modulus;
}

function positiveFiniteNumber(value, fieldName) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    throw new TypeError(`${fieldName} must be positive and finite`);
  }
  return numericValue;
}
