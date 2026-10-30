import * as THREE from '../../../vendor/three/three.module.js';
import { evaluateEomCubicHistoryAtTime } from '../shared/EomCubicHistoryEvaluation.mjs';
import { latticePatchHistories, latticePatchOrigin } from './LatticeDisturbanceExperiment.js';

export function createLatticeDisturbanceViewer(host) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0x0d0a17); renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); host.append(renderer.domElement);
  const scene = new THREE.Scene(), group = new THREE.Group(); scene.add(group);
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .01, 100); camera.up.set(0, 0, 1);
  const sphere = new THREE.SphereGeometry(.075, 24, 16);
  let members = [], histories = [], span = 3, yaw = .6, pitch = .45, zoom = 2.8, frame, previous, dragging = false;
  function clear() { for (const child of [...group.children]) { group.remove(child); if (child.geometry !== sphere) child.geometry?.dispose(); child.material?.dispose(); } members = []; }
  function setPreparation(request) {
    clear(); histories = []; span = Math.cbrt(request.paths.length);
    for (const path of request.paths) {
      const { position } = latticePatchOrigin(path);
      const color = path.charge === '1' ? 0xff0000 : 0x0000ff;
      const marker = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color })); marker.position.set(...position); group.add(marker);
      members.push({ path, marker, trail: null });
    }
  }
  function setRecord(record) {
    setPreparation(record.request); histories = latticePatchHistories(record);
    for (const member of members) {
      const h = histories.find(h => h.pathId === member.path.pathId);
      if (!h.segments.length) continue;
      const points = [], times = [];
      for (const s of h.segments) for (let i = 0; i < 4; i++) {
        const t = Number(s.startTime) + (Number(s.endTime) - Number(s.startTime)) * i / 4;
        const p = evaluateEomCubicHistoryAtTime(h, t).position; points.push(new THREE.Vector3(p.x, p.y, p.z)); times.push(t);
      }
      const p = evaluateEomCubicHistoryAtTime(h, h.coverage.end).position; points.push(new THREE.Vector3(p.x, p.y, p.z)); times.push(h.coverage.end);
      member.trail = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: member.path.charge === '1' ? 0xff0000 : 0x0000ff })); group.add(member.trail); member.times = times;
    }
    setTime(Number(record.result.acceptedCoverage.end));
  }
  function setTime(time) {
    let displacement = 0, speed = 0, uncertainty = 0;
    for (const member of members) {
      const h = histories.find(h => h.pathId === member.path.pathId);
      if (!h?.segments.length) continue;
      const sample = evaluateEomCubicHistoryAtTime(h, time), p = sample.position, v = sample.velocity;
      member.marker.position.set(p.x, p.y, p.z);
      const origin = latticePatchOrigin(member.path).position;
      displacement = Math.max(displacement, Math.hypot(p.x - origin[0], p.y - origin[1], p.z - origin[2]));
      speed = Math.max(speed, Math.hypot(v.x, v.y, v.z)); uncertainty = Math.max(uncertainty, sample.errorBound);
      const i = member.times.findIndex(t => t > time); member.trail.geometry.setDrawRange(0, i < 0 ? member.times.length : Math.max(1, i));
    }
    return { displacement, speed, uncertainty };
  }
  const canvas = renderer.domElement;
  canvas.tabIndex = 0; canvas.setAttribute('aria-label', 'Finite lattice patch: equal-sized solid red positrinos and solid blue electrinos. Drag or use arrow keys to rotate; scroll to zoom.');
  canvas.addEventListener('pointerdown', e => { dragging = true; previous = [e.clientX, e.clientY]; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', e => { if (!dragging) return; yaw -= (e.clientX - previous[0]) * .006; pitch = Math.max(-1.4, Math.min(1.4, pitch + (e.clientY - previous[1]) * .006)); previous = [e.clientX, e.clientY]; });
  canvas.addEventListener('pointerup', () => dragging = false); canvas.addEventListener('pointercancel', () => dragging = false);
  canvas.addEventListener('wheel', e => { e.preventDefault(); zoom = Math.max(1.5, Math.min(7, zoom + e.deltaY * .002)); }, { passive: false });
  canvas.addEventListener('keydown', e => { if (!e.key.startsWith('Arrow')) return; e.preventDefault(); yaw += e.key === 'ArrowLeft' ? -.1 : e.key === 'ArrowRight' ? .1 : 0; pitch = Math.max(-1.4, Math.min(1.4, pitch + (e.key === 'ArrowUp' ? .1 : e.key === 'ArrowDown' ? -.1 : 0))); });
  function draw() {
    const width = Math.max(1, host.clientWidth), height = Math.max(1, host.clientHeight);
    if (canvas.width !== Math.floor(width * renderer.getPixelRatio()) || canvas.height !== Math.floor(height * renderer.getPixelRatio())) renderer.setSize(width, height, false);
    const aspect = width / height, halfHeight = span * zoom * Math.tan(20 * Math.PI / 180) / Math.min(1, aspect);
    camera.left = -halfHeight * aspect; camera.right = halfHeight * aspect; camera.top = halfHeight; camera.bottom = -halfHeight;
    camera.position.set(span * zoom * Math.sin(yaw) * Math.cos(pitch), span * zoom * Math.cos(yaw) * Math.cos(pitch), span * zoom * Math.sin(pitch));
    camera.lookAt(0, 0, 0); camera.updateProjectionMatrix(); renderer.render(scene, camera); frame = requestAnimationFrame(draw);
  } draw();
  return { setPreparation, setRecord, setTime, dispose() { cancelAnimationFrame(frame); clear(); sphere.dispose(); renderer.dispose(); canvas.remove(); } };
}
