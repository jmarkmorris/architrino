import * as THREE from "../../../vendor/three/three.module.js";
import { BORG_ELECTRINO_COLOR, BORG_POSITRINO_COLOR } from "./BorgOrbitTrails.mjs";

const PARTICLE_POLARITY_STYLES = Object.freeze({
  electrino: Object.freeze({
    color: BORG_ELECTRINO_COLOR,
    pathColor: BORG_ELECTRINO_COLOR,
    velocityColor: 0x9fefff,
    edgeColor: "#0000ff",
    polarity: "electrino",
  }),
  positrino: Object.freeze({
    color: BORG_POSITRINO_COLOR,
    pathColor: BORG_POSITRINO_COLOR,
    velocityColor: 0xff9b92,
    edgeColor: "#ff0000",
    polarity: "positrino",
  }),
});

export function createBorgParticleStyles(frames) {
  const styles = new Map();
  frames.forEach((frame) => {
    if (styles.has(frame.pathKey)) {
      return;
    }
    const baseStyle =
      frame.stateFlags === 1 ? PARTICLE_POLARITY_STYLES.positrino : PARTICLE_POLARITY_STYLES.electrino;
    styles.set(frame.pathKey, {
      ...baseStyle,
      pathColor: baseStyle.color,
      label: String(frame.pathKey),
    });
  });
  return styles;
}

export function getBorgParticleStyle(pathKey, particleStyles) {
  const numericPathKey = Number(pathKey);
  const style = particleStyles?.get(pathKey) ??
    (Number.isFinite(numericPathKey) ? particleStyles?.get(numericPathKey) : null);
  if (!style) throw new TypeError(`Missing Borg polarity style for path ${pathKey}.`);
  return style;
}

export function createBorgArchitrinoPointTexture(documentLike) {
  const canvas = documentLike.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#ffffff";
  context.beginPath();
  context.arc(16, 16, 14, 0, Math.PI * 2);
  context.fill();
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
