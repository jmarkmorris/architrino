export function createComposerStructureGeometryRuntime(options = {}) {
  const THREE = options.THREE;
  const clampFn =
    typeof options.clampFn === "function"
      ? options.clampFn
      : (value, min, max) => Math.min(max, Math.max(min, value));
  const vectorFromTriplet =
    typeof options.vectorFromTriplet === "function"
      ? options.vectorFromTriplet
      : (value) =>
          value instanceof THREE.Vector3
            ? value.clone()
            : new THREE.Vector3(value?.[0] ?? 0, value?.[1] ?? 0, value?.[2] ?? 0);
  const resolveGraphicTargetPosition =
    typeof options.resolveGraphicTargetPosition === "function"
      ? options.resolveGraphicTargetPosition
      : () => null;
  const getGraphicTargetRadius =
    typeof options.getGraphicTargetRadius === "function"
      ? options.getGraphicTargetRadius
      : () => 0;
  const normalizeAssemblyPathPoints =
    typeof options.normalizeAssemblyPathPoints === "function"
      ? options.normalizeAssemblyPathPoints
      : () => [];
  const updateAssemblyDraftByIdState =
    typeof options.updateAssemblyDraftByIdState === "function"
      ? options.updateAssemblyDraftByIdState
      : () => null;
  const getMemberId =
    typeof options.getMemberId === "function" ? options.getMemberId : (member) => member?.id ?? "";
  const getAssemblyWorldCenters =
    typeof options.getAssemblyWorldCenters === "function"
      ? options.getAssemblyWorldCenters
      : () => new Map();
  const getFrameGroup =
    typeof options.getFrameGroup === "function" ? options.getFrameGroup : () => null;
  const getCamera = typeof options.getCamera === "function" ? options.getCamera : () => null;
  const getViewportAutoscaleTargetIds =
    typeof options.getViewportAutoscaleTargetIds === "function"
      ? options.getViewportAutoscaleTargetIds
      : () => [];
  const computeViewportAutoscaleCameraState =
    typeof options.computeViewportAutoscaleCameraState === "function"
      ? options.computeViewportAutoscaleCameraState
      : () => null;

  let memberAnchors = new Map();

  function resolveComposerGraphicTargetContactPosition(
    target,
    overlayCenter,
    assemblyCenters = new Map(),
    documentData = null
  ) {
    const targetPosition = resolveGraphicTargetPosition(target, assemblyCenters, documentData);
    if (!targetPosition) {
      return null;
    }
    if (target?.type !== "assembly") {
      return targetPosition;
    }
    const assemblies = Array.isArray(documentData?.assemblies) ? documentData.assemblies : [];
    const assembly = assemblies.find((entry) => entry?.id === target.assemblyId);
    const radius = getGraphicTargetRadius(assembly);
    if (!(radius > 0)) {
      return targetPosition;
    }
    const direction = overlayCenter.clone().sub(targetPosition);
    if (direction.lengthSq() <= 0.000001) {
      return targetPosition.clone().add(new THREE.Vector3(radius, 0, 0));
    }
    return targetPosition.clone().add(direction.normalize().multiplyScalar(radius));
  }

  function getComposerProxyMemberOffset(memberIndex, memberCount, baseRadius) {
    const safeCount = Math.max(1, Number(memberCount) || 1);
    const ringCapacity = Math.min(8, safeCount);
    const ringIndex = Math.floor(memberIndex / ringCapacity);
    const slotIndex = memberIndex % ringCapacity;
    const slotsThisRing = Math.min(ringCapacity, Math.max(1, safeCount - ringIndex * ringCapacity));
    const angle = (slotIndex / slotsThisRing) * Math.PI * 2;
    const orbitRadius = baseRadius + 0.11 + ringIndex * 0.09;
    const zOffset = ringIndex === 0 ? 0 : ringIndex % 2 === 0 ? 0.05 : -0.05;
    return new THREE.Vector3(
      Math.cos(angle) * orbitRadius,
      Math.sin(angle) * orbitRadius,
      zOffset
    );
  }

  function clearComposerMemberAnchors() {
    memberAnchors = new Map();
    return memberAnchors;
  }

  function setComposerMemberAnchor(assemblyId, memberId, anchor) {
    if (!assemblyId || !memberId) {
      return;
    }
    if (!memberAnchors.has(assemblyId)) {
      memberAnchors.set(assemblyId, new Map());
    }
    memberAnchors.get(assemblyId).set(memberId, anchor);
  }

  function getComposerOrbitBasis(motion) {
    const normal = Array.isArray(motion?.planeNormal)
      ? new THREE.Vector3(
          motion.planeNormal[0] ?? 0,
          motion.planeNormal[1] ?? 1,
          motion.planeNormal[2] ?? 0
        )
      : new THREE.Vector3(0, 1, 0);
    if (normal.lengthSq() === 0) {
      normal.set(0, 1, 0);
    }
    normal.normalize();
    const reference =
      Math.abs(normal.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
    const u = new THREE.Vector3().crossVectors(reference, normal).normalize();
    const v = new THREE.Vector3().crossVectors(normal, u).normalize();
    return { normal, u, v };
  }

  function getComposerOrbitOffsetAtTime(motion, chargeType, timeSeconds) {
    const radius = Number(motion?.radius ?? 0.65);
    const frequency = Number(motion?.frequencyHz ?? 0.25);
    const phase = Number(motion?.phase ?? 0);
    const direction = motion?.direction === "cw" ? -1 : 1;
    const phaseOffset = chargeType === "electrino" ? Math.PI : 0;
    const angle = phase + phaseOffset + direction * timeSeconds * Math.PI * 2 * frequency;
    const { u, v } = getComposerOrbitBasis(motion);
    return u
      .clone()
      .multiplyScalar(Math.cos(angle) * radius)
      .add(v.clone().multiplyScalar(Math.sin(angle) * radius));
  }

  function resolveComposerMemberAnchorPosition(anchor, assemblyCenter, timeSeconds) {
    if (!anchor || !assemblyCenter) {
      return null;
    }
    if (anchor.type === "proxy") {
      return assemblyCenter.clone().add(vectorFromTriplet(anchor.offset));
    }
    if (anchor.type === "orbit" && anchor.motion?.type === "orbit.circular") {
      return assemblyCenter
        .clone()
        .add(getComposerOrbitOffsetAtTime(anchor.motion, anchor.chargeType, timeSeconds));
    }
    return assemblyCenter.clone();
  }

  function resolveComposerTransferEndpointPosition(endpoint, assemblyCenters, timeSeconds) {
    const assemblyId = endpoint?.assemblyId;
    if (!assemblyId || !(assemblyCenters instanceof Map)) {
      return null;
    }
    const assemblyCenter = assemblyCenters.get(assemblyId);
    if (!assemblyCenter) {
      return null;
    }
    const memberId = endpoint?.memberId;
    if (memberId) {
      const assemblyAnchorMap = memberAnchors.get(assemblyId);
      const anchor = assemblyAnchorMap?.get(memberId) ?? null;
      const memberPosition = resolveComposerMemberAnchorPosition(anchor, assemblyCenter, timeSeconds);
      if (memberPosition) {
        return memberPosition;
      }
    }
    return assemblyCenter.clone();
  }

  function findComposerCoreMemberId(members, chargeType, binaryIndex) {
    const targetPrefix = chargeType === "electrino" ? "electrino" : "positrino";
    const targetSuffix = String(binaryIndex + 1);
    const candidates = Array.isArray(members) ? members : [];
    const exactMatch = candidates.find((member, memberIndex) => {
      const normalized = getMemberId(member, memberIndex).trim().toLowerCase();
      return (
        normalized === `${targetPrefix}_${targetSuffix}` ||
        normalized === `${targetPrefix}${targetSuffix}`
      );
    });
    if (exactMatch) {
      return getMemberId(exactMatch, candidates.indexOf(exactMatch));
    }
    const prefixMatches = candidates
      .map((member, memberIndex) => getMemberId(member, memberIndex))
      .filter((memberId) => memberId.trim().toLowerCase().startsWith(targetPrefix));
    return prefixMatches[binaryIndex] ?? null;
  }

  function getComposerPersonalityRingRadius(assembly) {
    const shellRadii = Array.isArray(assembly?.core?.shells)
      ? assembly.core.shells
          .map((shell) => Number(shell?.radius ?? 0) || 0)
          .filter((radius) => radius > 0)
      : [];
    return shellRadii.length ? Math.max(...shellRadii) * 1.02 : 1;
  }

  function getComposerObserverPlaneBasisInFrame() {
    const frameGroup = getFrameGroup();
    const camera = getCamera();
    const frameQuaternion = frameGroup?.quaternion?.clone?.() ?? new THREE.Quaternion();
    const inverseFrameQuaternion = frameQuaternion.invert();
    const right = new THREE.Vector3(1, 0, 0)
      .applyQuaternion(camera?.quaternion ?? new THREE.Quaternion())
      .applyQuaternion(inverseFrameQuaternion)
      .normalize();
    const up = new THREE.Vector3(0, 1, 0)
      .applyQuaternion(camera?.quaternion ?? new THREE.Quaternion())
      .applyQuaternion(inverseFrameQuaternion)
      .normalize();
    if (right.lengthSq() <= 0.00001) {
      right.set(1, 0, 0);
    }
    if (up.lengthSq() <= 0.00001) {
      up.set(0, 1, 0);
    }
    return { right, up };
  }

  function getComposerPersonalitySlotLocalOffset(assembly, slotIndex) {
    const radius = getComposerPersonalityRingRadius(assembly);
    const angle = Math.max(0, Number(slotIndex) || 0) * (Math.PI / 3);
    const { right, up } = getComposerObserverPlaneBasisInFrame();
    return right
      .clone()
      .multiplyScalar(Math.cos(angle) * radius)
      .add(up.clone().multiplyScalar(Math.sin(angle) * radius));
  }

  function getComposerAssemblyWorldCenterById(assemblyId) {
    if (!assemblyId) {
      return new THREE.Vector3();
    }
    return getAssemblyWorldCenters().get(assemblyId)?.clone() ?? new THREE.Vector3();
  }

  function shiftComposerPointTriplets(points, delta) {
    const offset = delta instanceof THREE.Vector3 ? delta : new THREE.Vector3();
    return normalizeAssemblyPathPoints(points).map((point) => [
      Number(((point[0] ?? 0) + offset.x).toFixed(3)),
      Number(((point[1] ?? 0) + offset.y).toFixed(3)),
      Number(((point[2] ?? 0) + offset.z).toFixed(3)),
    ]);
  }

  function rebaseComposerAssemblyParentFrame(assembly, nextParentId = "") {
    if (!assembly?.id) {
      return;
    }
    const previousParentCenter = getComposerAssemblyWorldCenterById(assembly.parentId);
    const nextParentCenter = getComposerAssemblyWorldCenterById(nextParentId);
    const delta = previousParentCenter.sub(nextParentCenter);
    updateAssemblyDraftByIdState(assembly.id, (currentAssembly) => ({
      ...currentAssembly,
      position: [
        Number(((currentAssembly.position?.[0] ?? 0) + delta.x).toFixed(3)),
        Number(((currentAssembly.position?.[1] ?? 0) + delta.y).toFixed(3)),
        Number(((currentAssembly.position?.[2] ?? 0) + delta.z).toFixed(3)),
      ],
      pathPoints: shiftComposerPointTriplets(currentAssembly.pathPoints, delta),
    }));
  }

  function computeComposerAssemblyBasePosition(assembly, index, count, pathById) {
    const transformPosition = assembly?.transform?.position;
    const hasParent = !!assembly?.parentId;
    const hasExplicitTransformPosition =
      Array.isArray(transformPosition) &&
      transformPosition.length >= 3 &&
      (transformPosition.some((value) => Number(value ?? 0) !== 0) || hasParent);
    if (hasExplicitTransformPosition) {
      return new THREE.Vector3(transformPosition[0], transformPosition[1], transformPosition[2]);
    }
    const motions = Array.isArray(assembly?.motion)
      ? assembly.motion
      : assembly?.motion
        ? [assembly.motion]
        : [];
    const transportMotion = motions.find((motion) => motion?.type === "path.transport");
    if (transportMotion?.pathId && pathById.has(transportMotion.pathId)) {
      const path = pathById.get(transportMotion.pathId);
      if (Array.isArray(path?.payload?.points) && path.payload.points.length) {
        const [x = 0, y = 0, z = 0] = path.payload.points[0];
        return new THREE.Vector3(x, y, z);
      }
    }
    if (count <= 1) {
      return new THREE.Vector3(0, 0, 0);
    }
    const angle = (index / count) * Math.PI * 2;
    const radius = 1.6 + count * 0.08;
    return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
  }

  function sampleComposerPointAt(points, normalizedT, options = {}) {
    if (!Array.isArray(points) || !points.length) {
      return new THREE.Vector3();
    }
    if (points.length === 1) {
      const [x = 0, y = 0, z = 0] = points[0];
      return new THREE.Vector3(x, y, z);
    }
    const interpolate = options.interpolate ?? "spline";
    const closed = !!options.closed;
    if (interpolate === "spline" && points.length > 2) {
      const vectors = points.map(([x = 0, y = 0, z = 0]) => new THREE.Vector3(x, y, z));
      const curve = new THREE.CatmullRomCurve3(vectors, closed, "catmullrom", 0.5);
      return curve.getPoint(clampFn(normalizedT, 0, 1));
    }
    const source = closed ? [...points, points[0]] : points;
    const clamped = clampFn(normalizedT, 0, 1);
    const scaled = clamped * (source.length - 1);
    const baseIndex = Math.floor(scaled);
    const nextIndex = Math.min(source.length - 1, baseIndex + 1);
    const localT = scaled - baseIndex;
    const from = source[baseIndex];
    const to = source[nextIndex];
    return new THREE.Vector3(
      THREE.MathUtils.lerp(from[0] ?? 0, to[0] ?? 0, localT),
      THREE.MathUtils.lerp(from[1] ?? 0, to[1] ?? 0, localT),
      THREE.MathUtils.lerp(from[2] ?? 0, to[2] ?? 0, localT)
    );
  }

  function sampleComposerCurvePoints(points, segments = 80) {
    const source = Array.isArray(points) ? points : [];
    if (!source.length) {
      return [];
    }
    if (source.length === 1) {
      const [x = 0, y = 0, z = 0] = source[0];
      return [new THREE.Vector3(x, y, z)];
    }
    const vectors = source.map(([x = 0, y = 0, z = 0]) => new THREE.Vector3(x, y, z));
    const curve = new THREE.CatmullRomCurve3(vectors, false, "catmullrom", 0.5);
    return curve.getPoints(Math.max(2, segments));
  }

  function getComposerViewportAutoscaleTargetSpheres(documentData, assemblyCenters, framingState) {
    const assemblies = Array.isArray(documentData?.assemblies) ? documentData.assemblies : [];
    if (!assemblies.length || !(assemblyCenters instanceof Map)) {
      return [];
    }
    const assemblyById = new Map(
      assemblies
        .map((assembly) => [String(assembly?.id ?? "").trim(), assembly])
        .filter(([assemblyId]) => !!assemblyId)
    );
    const targetIds = getViewportAutoscaleTargetIds(framingState, [...assemblyById.keys()]);
    return targetIds
      .map((assemblyId) => {
        const center = assemblyCenters.get(assemblyId);
        const assembly = assemblyById.get(assemblyId);
        if (!(center instanceof THREE.Vector3) || !assembly) {
          return null;
        }
        return {
          id: assemblyId,
          center: { x: center.x, y: center.y, z: center.z },
          radius: Math.max(0.12, getGraphicTargetRadius(assembly)),
        };
      })
      .filter(Boolean);
  }

  function getComposerAutoscaledCameraState(cameraState, documentData, assemblyCenters, framingState) {
    const camera = getCamera();
    if (!cameraState || !camera || !documentData) {
      return cameraState;
    }
    const autoscaleMode = String(framingState?.framing?.autoscale ?? "")
      .trim()
      .toLowerCase();
    const targetSpheres = getComposerViewportAutoscaleTargetSpheres(
      documentData,
      assemblyCenters,
      framingState
    );
    if (!targetSpheres.length) {
      return cameraState;
    }
    const autoscaled = computeViewportAutoscaleCameraState({
      cameraState: {
        position: cameraState.position,
        lookAt: cameraState.lookAt,
      },
      targetSpheres,
      verticalFovDegrees: Number(camera.fov ?? 45) || 45,
      aspect: Math.max(0.2, Number(camera.aspect ?? 1) || 1),
      onlyExpand: !["fit_required", "fit_all", "always"].includes(autoscaleMode),
    });
    if (!autoscaled) {
      return cameraState;
    }
    return {
      ...cameraState,
      position: new THREE.Vector3(
        autoscaled.position.x,
        autoscaled.position.y,
        autoscaled.position.z
      ),
      lookAt: new THREE.Vector3(autoscaled.lookAt.x, autoscaled.lookAt.y, autoscaled.lookAt.z),
      autoscale: autoscaled,
    };
  }

  return {
    resolveComposerGraphicTargetContactPosition,
    getComposerProxyMemberOffset,
    clearComposerMemberAnchors,
    setComposerMemberAnchor,
    getComposerOrbitBasis,
    getComposerOrbitOffsetAtTime,
    resolveComposerMemberAnchorPosition,
    resolveComposerTransferEndpointPosition,
    findComposerCoreMemberId,
    getComposerPersonalityRingRadius,
    getComposerObserverPlaneBasisInFrame,
    getComposerPersonalitySlotLocalOffset,
    getComposerAssemblyWorldCenterById,
    shiftComposerPointTriplets,
    rebaseComposerAssemblyParentFrame,
    computeComposerAssemblyBasePosition,
    sampleComposerPointAt,
    sampleComposerCurvePoints,
    getComposerViewportAutoscaleTargetSpheres,
    getComposerAutoscaledCameraState,
  };
}
