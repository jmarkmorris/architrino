function getSphereSizingSource(node) {
  if (node?.data && typeof node.data === "object") {
    return node.data;
  }
  return node;
}

export function isSceneSphereSizingNode(node) {
  const source = getSphereSizingSource(node);
  if (!source || typeof source !== "object") {
    return false;
  }
  if (source.hideSphere === true) {
    return false;
  }
  if (String(source.category ?? "").toLowerCase() === "legend") {
    return false;
  }
  const radius = Number(source.radius);
  return Number.isFinite(radius) && radius > 0;
}

export function resolveSharedSceneSphereRadius(nodes) {
  if (!Array.isArray(nodes) || !nodes.length) {
    return null;
  }
  const radii = nodes
    .filter(isSceneSphereSizingNode)
    .map((node) => Number(getSphereSizingSource(node).radius))
    .filter((radius) => Number.isFinite(radius) && radius > 0)
    .sort((a, b) => a - b);
  if (!radii.length) {
    return null;
  }
  const mid = Math.floor(radii.length / 2);
  return radii.length % 2 === 1 ? radii[mid] : (radii[mid - 1] + radii[mid]) / 2;
}

export function enforceSharedSceneSphereRadius(nodes) {
  const radius = resolveSharedSceneSphereRadius(nodes);
  if (!Number.isFinite(radius) || radius <= 0) {
    return null;
  }
  nodes.forEach((node) => {
    if (!isSceneSphereSizingNode(node)) {
      return;
    }
    const source = getSphereSizingSource(node);
    source.radius = radius;
  });
  return radius;
}
