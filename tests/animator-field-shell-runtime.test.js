import test from "node:test";
import assert from "node:assert/strict";

import {
  createAnimatorFieldShellInstance,
  getAnimatorFieldShellColor,
  getAnimatorFieldShellEmitterPath,
  getAnimatorFieldShellOpacityAtTime,
  getAnimatorFieldShellRadiusAtTime,
  getAnimatorFieldShellRenderState,
} from "../src/apps/animator/AnimatorFieldShellRuntime.js";

test("animator field shells expand as 3D spherical shell samples over time", () => {
  const shell = {
    id: "shell_a",
    emissionTime: 1,
    displayTime: 4,
    emissionPosition: [2, -1, 0.5],
    radius: 6,
    sign: -1,
    strength: 0.5,
  };

  assert.equal(getAnimatorFieldShellRadiusAtTime(shell, 0.5), 0);
  assert.equal(getAnimatorFieldShellRadiusAtTime(shell, 2.5), 3);

  const state = getAnimatorFieldShellRenderState(shell, 2.5);
  assert.deepEqual(state.center, [2, -1, 0.5]);
  assert.equal(state.radius, 3);
  assert.equal(state.color, "#78a8ff");
  assert.equal(state.visible, true);
  assert.ok(state.opacity > 0);
});

test("animator field shell colors keep white neutral semantics", () => {
  assert.equal(getAnimatorFieldShellColor({ sign: 1 }), "#ff8796");
  assert.equal(getAnimatorFieldShellColor({ sign: -1 }), "#78a8ff");
  assert.equal(getAnimatorFieldShellColor({ sign: 0 }), "#ffffff");
  assert.equal(getAnimatorFieldShellColor({ style: { color: "#abcdef" } }), "#abcdef");
});

test("animator field shell opacity fades after the display window", () => {
  const shell = {
    emissionTime: 0,
    displayTime: 1,
    radius: 1,
    style: { opacity: 0.2 },
  };

  assert.equal(getAnimatorFieldShellOpacityAtTime(shell, -0.1), 0);
  assert.equal(getAnimatorFieldShellOpacityAtTime(shell, 2, {}, { fadeOutSeconds: 0.5 }), 0);
  assert.ok(getAnimatorFieldShellOpacityAtTime(shell, 0.5) > 0.15);
});

test("continuous animator field shells keep expanding after the display window", () => {
  const earlyShell = {
    emissionTime: 0,
    displayTime: 1,
    fieldSpeed: 1,
    metadata: { continuousExpansion: true },
  };
  const laterShell = {
    emissionTime: 0.25,
    displayTime: 1.25,
    fieldSpeed: 1,
    metadata: { continuousExpansion: true },
  };

  assert.equal(getAnimatorFieldShellRadiusAtTime(earlyShell, 2), 2);
  assert.equal(getAnimatorFieldShellRadiusAtTime(laterShell, 2), 1.75);
  assert.ok(getAnimatorFieldShellOpacityAtTime(earlyShell, 3, {}, { fadeOutSeconds: 0.5 }) > 0);
  assert.ok(getAnimatorFieldShellOpacityAtTime(laterShell, 3, {}, { fadeOutSeconds: 0.5 }) > 0);
  assert.ok(getAnimatorFieldShellOpacityAtTime(earlyShell, 3) < getAnimatorFieldShellOpacityAtTime(earlyShell, 0.5));
});

test("solver-derived field shells are continuous even without upgraded metadata", () => {
  const shell = {
    emissionTime: 0,
    displayTime: 1,
    fieldSpeed: 1,
    metadata: { motionSource: "solver-derived" },
  };

  assert.equal(getAnimatorFieldShellRadiusAtTime(shell, 3), 3);
  assert.ok(getAnimatorFieldShellOpacityAtTime(shell, 3, {}, { fadeOutSeconds: 0.5 }) > 0);
});

test("animator field shells resolve emitter paths by exact id then charge sign", () => {
  const paths = [
    { id: "solver_path_e0", metadata: { simulationParticleId: "e0" } },
    { id: "solver_path_p0", metadata: { simulationParticleId: "p0" } },
  ];
  const dataset = {
    particles: [
      { id: "p0", polarity: 1 },
      { id: "p1", polarity: -1 },
    ],
  };
  const options = {
    getPathSign: (path) => (path.id.includes("e0") ? -1 : 1),
  };

  assert.equal(
    getAnimatorFieldShellEmitterPath({ emitterId: "p0", sign: 1 }, dataset, paths, options)?.id,
    "solver_path_p0"
  );
  assert.equal(
    getAnimatorFieldShellEmitterPath({ emitterId: "p1", sign: -1 }, dataset, paths, options)?.id,
    "solver_path_e0"
  );
});

test("animator field shell instances preserve solver timing while targeting architrino emitters", () => {
  const instance = createAnimatorFieldShellInstance(
    {
      id: "shell_p0_12",
      emitterId: "p0",
      emissionTime: 1.25,
      displayTime: 2.85,
      emissionPosition: [1, 0, 0],
      radius: 1.6,
      sign: 1,
      metadata: { motionSource: "solver-derived" },
    },
    {
      id: "solver_particle_p_electrino_2",
      emitterId: "electrino_2",
      sign: -1,
      emissionPosition: [4.2, -0.8, 0.4],
      metadata: {
        ownerAssemblyId: "solver_particle_p",
        memberId: "electrino_2",
        emitterScope: "core-architrino",
      },
    }
  );

  assert.equal(instance.id, "shell_p0_12_solver_particle_p_electrino_2");
  assert.equal(instance.emitterId, "electrino_2");
  assert.equal(instance.emissionTime, 1.25);
  assert.equal(instance.displayTime, 2.85);
  assert.deepEqual(instance.emissionPosition, [4.2, -0.8, 0.4]);
  assert.equal(instance.sign, -1);
  assert.equal(instance.metadata.sourceFieldShellId, "shell_p0_12");
  assert.equal(instance.metadata.sourceEmitterId, "p0");
  assert.equal(instance.metadata.fixedEmissionPosition, true);
  assert.equal(instance.metadata.emitterScope, "core-architrino");
});
