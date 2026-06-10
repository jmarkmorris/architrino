function normalizeString(value, fallback = "") {
  const trimmed = typeof value === "string" ? value.trim() : "";
  return trimmed || fallback;
}

function normalizeNumber(value, fallback = 0) {
  const normalized = Number(value);
  return Number.isFinite(normalized) ? normalized : fallback;
}

function normalizePoint(point) {
  if (Array.isArray(point)) {
    return [
      normalizeNumber(point[0], 0),
      normalizeNumber(point[1], 0),
      normalizeNumber(point[2], 0),
    ];
  }
  if (point && typeof point === "object") {
    return [
      normalizeNumber(point.x, 0),
      normalizeNumber(point.y, 0),
      normalizeNumber(point.z, 0),
    ];
  }
  return [0, 0, 0];
}

function includePoint(bounds, point) {
  const [x, y, z] = normalizePoint(point);
  bounds.minX = Math.min(bounds.minX, x);
  bounds.maxX = Math.max(bounds.maxX, x);
  bounds.minY = Math.min(bounds.minY, y);
  bounds.maxY = Math.max(bounds.maxY, y);
  bounds.minZ = Math.min(bounds.minZ, z);
  bounds.maxZ = Math.max(bounds.maxZ, z);
  bounds.count += 1;
}

function includeSphere(bounds, center, radius = 0) {
  const [x, y, z] = normalizePoint(center);
  const normalizedRadius = Math.max(0, normalizeNumber(radius, 0));
  includePoint(bounds, [x - normalizedRadius, y - normalizedRadius, z]);
  includePoint(bounds, [x + normalizedRadius, y + normalizedRadius, z]);
}

function getInitialBounds() {
  return {
    minX: Infinity,
    maxX: -Infinity,
    minY: Infinity,
    maxY: -Infinity,
    minZ: Infinity,
    maxZ: -Infinity,
    count: 0,
  };
}

export function normalizeAnimatorViewportProjection(value) {
  const normalized = normalizeString(value, "").toLowerCase();
  if (normalized === "planar-2d" || normalized === "2d" || normalized === "planar") {
    return "planar-2d";
  }
  return "3d";
}

export function isAnimatorPlanarSimulationDocument(documentData = {}) {
  const sceneMode = normalizeAnimatorViewportProjection(documentData?.scene?.mode);
  const viewProjection = normalizeAnimatorViewportProjection(
    documentData?.view?.projection ?? documentData?.scene?.view?.projection
  );
  const simulation = documentData?.metadata?.simulationDataset?.simulation ?? null;
  const simulationMode = normalizeAnimatorViewportProjection(simulation?.mode);
  const dimensions = Number(simulation?.dimensions);
  return (
    sceneMode === "planar-2d" ||
    viewProjection === "planar-2d" ||
    simulationMode === "planar-2d" ||
    dimensions === 2
  );
}

export function getAnimatorInitialViewportProjection(documentData = {}) {
  const explicitProjection = normalizeString(
    documentData?.view?.projection ?? documentData?.scene?.view?.projection,
    ""
  );
  if (explicitProjection) {
    return normalizeAnimatorViewportProjection(explicitProjection);
  }
  return isAnimatorPlanarSimulationDocument(documentData) ? "planar-2d" : "3d";
}

export function computeAnimatorPlanarCameraState(documentData = {}, options = {}) {
  const bounds = getInitialBounds();
  const assemblies = Array.isArray(documentData?.assemblies) ? documentData.assemblies : [];
  const assemblyCenters =
    options.useLiveAssemblyCenters === true && options.assemblyCenters instanceof Map
      ? options.assemblyCenters
      : null;
  assemblies.forEach((assembly) => {
    const assemblyCenter = assemblyCenters?.get(assembly?.id) ?? assembly?.transform?.position;
    includePoint(bounds, assemblyCenter ?? [0, 0, 0]);
  });

  const paths = Array.isArray(documentData?.paths) ? documentData.paths : [];
  paths.forEach((path) => {
    const points = Array.isArray(path?.payload?.points) ? path.payload.points : [];
    points.forEach((point) => includePoint(bounds, point));
  });

  const frames = Array.isArray(documentData?.metadata?.simulationDataset?.frames)
    ? documentData.metadata.simulationDataset.frames
    : [];
  frames.forEach((frame) => {
    const particles = Array.isArray(frame?.particles) ? frame.particles : [];
    particles.forEach((particle) => includePoint(bounds, particle?.position));
  });

  const assemblyPositionById = new Map(
    assemblies.map((assembly) => [
      assembly?.id,
      assemblyCenters?.get(assembly?.id) ?? normalizePoint(assembly?.transform?.position),
    ])
  );
  const envelopes = Array.isArray(documentData?.envelopes) ? documentData.envelopes : [];
  envelopes.forEach((envelope) => {
    const center = assemblyPositionById.get(envelope?.assemblyId) ?? [0, 0, 0];
    includeSphere(bounds, center, envelope?.geometry?.radius ?? envelope?.radius ?? 0);
  });

  if (!bounds.count) {
    includePoint(bounds, [0, 0, 0]);
  }

  const explicitCamera =
    documentData?.view?.planarCamera ??
    documentData?.scene?.view?.planarCamera ??
    null;
  const explicitMode = normalizeString(explicitCamera?.mode, "").toLowerCase();
  const hasExplicitPlanarCamera =
    explicitCamera &&
    typeof explicitCamera === "object" &&
    (explicitMode === "fixed" ||
      explicitCamera.distance != null ||
      explicitCamera.position != null ||
      explicitCamera.lookAt != null);
  if (hasExplicitPlanarCamera) {
    const lookAt = normalizePoint(explicitCamera.lookAt ?? [0, 0, 0]);
    const position =
      explicitCamera.position != null
        ? normalizePoint(explicitCamera.position)
        : [
            lookAt[0],
            lookAt[1],
            lookAt[2] +
              Math.max(
                1,
                normalizeNumber(explicitCamera.distance, normalizeNumber(options.minDistance, 6))
              ),
          ];
    const distance = Math.hypot(
      position[0] - lookAt[0],
      position[1] - lookAt[1],
      position[2] - lookAt[2]
    );
    return {
      projection: "planar-2d",
      position,
      lookAt,
      up: normalizePoint(explicitCamera.up ?? [0, 1, 0]),
      distance,
      bounds: {
        minX: bounds.minX,
        maxX: bounds.maxX,
        minY: bounds.minY,
        maxY: bounds.maxY,
        minZ: bounds.minZ,
        maxZ: bounds.maxZ,
      },
    };
  }

  const padding = Math.max(1, normalizeNumber(options.padding, 1.28));
  const verticalFovDegrees = Math.max(10, normalizeNumber(options.verticalFovDegrees, 45));
  const aspect = Math.max(0.25, normalizeNumber(options.aspect, 1));
  const halfWidth = Math.max(1, ((bounds.maxX - bounds.minX) * padding) / 2);
  const halfHeight = Math.max(1, ((bounds.maxY - bounds.minY) * padding) / 2);
  const fovRadians = (verticalFovDegrees * Math.PI) / 180;
  const tanHalfFov = Math.tan(fovRadians / 2);
  const distanceForHeight = halfHeight / tanHalfFov;
  const distanceForWidth = halfWidth / (tanHalfFov * aspect);
  const minDistance = Math.max(1, normalizeNumber(options.minDistance, 6));
  const zOffset = Math.max(minDistance, distanceForHeight, distanceForWidth);
  const centerX = (bounds.minX + bounds.maxX) / 2;
  const centerY = (bounds.minY + bounds.maxY) / 2;
  const centerZ = (bounds.minZ + bounds.maxZ) / 2;

  return {
    projection: "planar-2d",
    position: [centerX, centerY, centerZ + zOffset],
    lookAt: [centerX, centerY, centerZ],
    up: [0, 1, 0],
    distance: zOffset,
    bounds: {
      minX: bounds.minX,
      maxX: bounds.maxX,
      minY: bounds.minY,
      maxY: bounds.maxY,
      minZ: bounds.minZ,
      maxZ: bounds.maxZ,
    },
  };
}
