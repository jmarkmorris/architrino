import { addAcceleration, addForce, zeroAccelerations } from "./T3State.mjs";

export function createInteractionPipeline(interactions = []) {
  const normalized = Array.isArray(interactions) ? interactions : [interactions];
  return {
    interactions: normalized.filter(Boolean),
    beforeStep(context) {
      for (const interaction of this.interactions) {
        interaction.beforeStep?.(context);
      }
    },
    evaluateAccelerations(context) {
      const { state, spatialIndex, topology } = context;
      zeroAccelerations(state);
      for (const interaction of this.interactions) {
        interaction.applyGlobal?.(createGlobalContext(context, interaction));
      }
      const pairInteractions = this.interactions.filter((interaction) => interaction.applyPair);
      if (pairInteractions.length === 0) {
        return;
      }
      spatialIndex.rebuild(state);
      const displacement = [0, 0, 0];
      spatialIndex.forEachNeighborPair(state, (i, j, distanceSquared) => {
        topology.nearestImageDisplacement(state.positions, i, state.positions, j, displacement);
        const distance = Math.sqrt(distanceSquared);
        for (const interaction of pairInteractions) {
          interaction.applyPair(
            createPairContext({
              ...context,
              interaction,
              i,
              j,
              displacement,
              distance,
              distanceSquared,
            })
          );
        }
      });
    },
    afterStep(context) {
      for (const interaction of this.interactions) {
        interaction.afterStep?.(context);
      }
    },
    computeInteractionEnergy(context) {
      let total = 0;
      let hasEnergy = false;
      const { state, spatialIndex, topology } = context;
      for (const interaction of this.interactions) {
        if (interaction.energyGlobal) {
          total += Number(interaction.energyGlobal(createGlobalContext(context, interaction)) ?? 0);
          hasEnergy = true;
        }
      }
      const pairEnergyInteractions = this.interactions.filter((interaction) => interaction.energyPair);
      if (pairEnergyInteractions.length > 0) {
        spatialIndex.rebuild(state);
        const displacement = [0, 0, 0];
        spatialIndex.forEachNeighborPair(state, (i, j, distanceSquared) => {
          topology.nearestImageDisplacement(state.positions, i, state.positions, j, displacement);
          const distance = Math.sqrt(distanceSquared);
          for (const interaction of pairEnergyInteractions) {
            total += Number(
              interaction.energyPair(
                createPairContext({
                  ...context,
                  interaction,
                  i,
                  j,
                  displacement,
                  distance,
                  distanceSquared,
                })
              ) ?? 0
            );
            hasEnergy = true;
          }
        });
      }
      return hasEnergy ? total : null;
    },
  };
}

export function collectT3Events(context, detectors = []) {
  if (!Array.isArray(detectors) || detectors.length === 0) {
    return [];
  }
  const events = [];
  const { state, spatialIndex, topology } = context;
  for (const detector of detectors) {
    const stepEvents = detector.detectStep?.(context);
    if (Array.isArray(stepEvents)) {
      events.push(...stepEvents);
    } else if (stepEvents) {
      events.push(stepEvents);
    }
  }
  const pairDetectors = detectors.filter((detector) => detector.detectPair);
  if (pairDetectors.length === 0) {
    return events;
  }
  spatialIndex.rebuild(state);
  const displacement = [0, 0, 0];
  spatialIndex.forEachNeighborPair(state, (i, j, distanceSquared) => {
    topology.nearestImageDisplacement(state.positions, i, state.positions, j, displacement);
    const distance = Math.sqrt(distanceSquared);
    for (const detector of pairDetectors) {
      const event = detector.detectPair(
        createPairContext({
          ...context,
          interaction: detector,
          i,
          j,
          displacement,
          distance,
          distanceSquared,
        })
      );
      if (Array.isArray(event)) {
        events.push(...event);
      } else if (event) {
        events.push(event);
      }
    }
  });
  return events;
}

export function createNoopInteraction() {
  return Object.freeze({
    id: "noop",
    schema: "t3-interaction.v1",
  });
}

export function createSoftSphereRepulsionInteraction(input = {}) {
  const radius = positiveFiniteNumber(input.radius ?? 1, "radius");
  const strength = finiteNumber(input.strength ?? 1, "strength");
  const softening = positiveFiniteNumber(input.softening ?? radius * 1e-6, "softening");
  return Object.freeze({
    id: input.id ?? "soft-sphere-repulsion",
    schema: "t3-interaction.v1",
    radius,
    applyPair(context) {
      if (context.distance >= radius || context.distance === 0) {
        return;
      }
      const overlap = radius - context.distance;
      const forceMagnitude = (strength * overlap) / (context.distance + softening);
      const fx = -forceMagnitude * context.displacement[0];
      const fy = -forceMagnitude * context.displacement[1];
      const fz = -forceMagnitude * context.displacement[2];
      context.addForce(context.i, fx, fy, fz);
      context.addForce(context.j, -fx, -fy, -fz);
    },
    energyPair(context) {
      if (context.distance >= radius) {
        return 0;
      }
      const overlap = radius - context.distance;
      return 0.5 * strength * overlap * overlap;
    },
  });
}

export function createCollisionDetector(input = {}) {
  const radius = positiveFiniteNumber(input.radius ?? 1, "collision radius");
  return Object.freeze({
    id: input.id ?? "collision-radius-detector",
    schema: "t3-event-detector.v1",
    detectPair(context) {
      if (context.distance > radius) {
        return null;
      }
      return {
        schema: "t3-event.v1",
        kind: "collision-radius",
        time: context.state.time,
        stepIndex: context.state.stepIndex,
        particleIds: [context.state.ids[context.i], context.state.ids[context.j]],
        particleIndexes: [context.i, context.j],
        distance: context.distance,
        radius,
      };
    },
  });
}

function createGlobalContext(context, interaction) {
  return {
    ...context,
    interaction,
    addAcceleration: (particleIndex, ax, ay, az) => addAcceleration(context.state, particleIndex, ax, ay, az),
    addForce: (particleIndex, fx, fy, fz) => addForce(context.state, particleIndex, fx, fy, fz),
  };
}

function createPairContext(input) {
  return {
    state: input.state,
    topology: input.topology,
    spatialIndex: input.spatialIndex,
    config: input.config,
    interaction: input.interaction,
    i: input.i,
    j: input.j,
    displacement: [...input.displacement],
    distance: input.distance,
    distanceSquared: input.distanceSquared,
    addAcceleration: (particleIndex, ax, ay, az) => addAcceleration(input.state, particleIndex, ax, ay, az),
    addForce: (particleIndex, fx, fy, fz) => addForce(input.state, particleIndex, fx, fy, fz),
  };
}

function finiteNumber(value, fieldName) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    throw new TypeError(`${fieldName} must be finite`);
  }
  return numericValue;
}

function positiveFiniteNumber(value, fieldName) {
  const numericValue = finiteNumber(value, fieldName);
  if (numericValue <= 0) {
    throw new TypeError(`${fieldName} must be positive`);
  }
  return numericValue;
}
