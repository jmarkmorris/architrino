import * as THREE from "../../../vendor/three/three.module.js";

const ROOT_MARKER_RADIUS = 0.045;
const ROOT_MARKER_SEGMENTS = 12;
const ARRIVAL_GLYPH_LENGTH = 0.22;
const CONTRIBUTION_MAX_LENGTH = 0.55;
const UNRESOLVED_COLOR = 0xffb454;

export function createBorgPrescribedAnalysisScene({
  group,
  toWorld,
  getDisplayPosition = (position) => position,
  render,
}) {
  if (!group || typeof group.add !== "function") {
    throw new TypeError("Borg prescribed analysis scene requires a Three.js group.");
  }
  const rootLinkGroup = new THREE.Group();
  rootLinkGroup.userData.kind = "analytical-wake-arrival-links";
  const rootMarkerGroup = new THREE.Group();
  rootMarkerGroup.userData.kind = "certified-causal-root-markers";
  const arrivalGlyphGroup = new THREE.Group();
  arrivalGlyphGroup.userData.kind = "receiver-arrival-direction-glyphs";
  const contributionGroup = new THREE.Group();
  contributionGroup.userData.kind = "analytical-acceleration-contributions";
  const unresolvedGroup = new THREE.Group();
  unresolvedGroup.userData.kind = "unresolved-causal-history-segments";
  group.add(
    rootLinkGroup,
    rootMarkerGroup,
    arrivalGlyphGroup,
    contributionGroup,
    unresolvedGroup,
  );

  let currentProjection = null;
  let currentEvent = null;
  let contributionVisible = false;
  let selectedRootId = null;

  function setEvent({ projection = null, event = null } = {}) {
    currentProjection = projection;
    currentEvent = event;
    selectedRootId = null;
    rebuild();
  }

  function setContributionVisible(visible) {
    contributionVisible = Boolean(visible);
    contributionGroup.visible = contributionVisible;
    render?.();
  }

  function setSelectedRoot(rootId) {
    selectedRootId = rootId == null ? null : String(rootId);
    syncSelection();
    render?.();
  }

  function rebuild() {
    clearGroup(rootLinkGroup);
    clearGroup(rootMarkerGroup);
    clearGroup(arrivalGlyphGroup);
    clearGroup(contributionGroup);
    clearGroup(unresolvedGroup);
    if (!currentEvent) {
      render?.();
      return;
    }
    currentEvent.roots.forEach(buildRoot);
    currentEvent.unresolvedIntervals.forEach(buildUnresolvedInterval);
    contributionGroup.visible = contributionVisible;
    syncSelection();
    render?.();
  }

  function buildRoot(root) {
    const color = rootColor(root.transmitterId, root.rootOrdinal);
    const transmitter = displayedWorld(
      root.transmitterPosition,
      root.emissionTime,
    );
    const receiver = displayedWorld(
      root.receiverPosition,
      root.receptionTime,
    );
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
      transmitter,
      receiver,
    ]);
    const lineMaterial = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
    });
    const line = new THREE.Line(lineGeometry, lineMaterial);
    line.userData = rootUserData(root, "analytical-wake-arrival-link");
    rootLinkGroup.add(line);

    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(
        ROOT_MARKER_RADIUS,
        ROOT_MARKER_SEGMENTS,
        Math.max(6, ROOT_MARKER_SEGMENTS / 2),
      ),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.98,
        depthTest: false,
        depthWrite: false,
      }),
    );
    marker.position.copy(transmitter);
    marker.renderOrder = 10;
    marker.userData = rootUserData(root, "certified-causal-root");
    rootMarkerGroup.add(marker);

    const arrivalDirection = transmitter.clone().sub(receiver);
    if (arrivalDirection.lengthSq() > 0) {
      arrivalDirection.normalize();
      const glyph = new THREE.ArrowHelper(
        arrivalDirection,
        receiver,
        ARRIVAL_GLYPH_LENGTH,
        color,
        0.07,
        0.035,
      );
      glyph.userData = rootUserData(root, "receiver-arrival-direction");
      arrivalGlyphGroup.add(glyph);
    }

    const acceleration = root.accelerationContribution;
    if (acceleration) {
      const direction = new THREE.Vector3(
        Number(acceleration.x),
        Number(acceleration.y),
        Number(acceleration.z),
      );
      const magnitude = direction.length();
      if (magnitude > 0) {
        direction.normalize();
        const length = Math.min(
          CONTRIBUTION_MAX_LENGTH,
          0.12 + Math.log10(1 + magnitude) * 0.12,
        );
        const arrow = new THREE.ArrowHelper(
          direction,
          receiver,
          length,
          color,
          0.08,
          0.04,
        );
        arrow.userData = rootUserData(
          root,
          "analytical-acceleration-contribution",
        );
        contributionGroup.add(arrow);
      }
    }
  }

  function buildUnresolvedInterval(interval) {
    const start = displayedWorld(
      interval.startPosition,
      interval.emissionInterval[0],
    );
    const end = displayedWorld(
      interval.endPosition,
      interval.emissionInterval[1],
    );
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const material = new THREE.LineDashedMaterial({
      color: UNRESOLVED_COLOR,
      dashSize: 0.05,
      gapSize: 0.035,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    const line = new THREE.Line(geometry, material);
    line.computeLineDistances();
    line.userData = {
      kind: "unresolved-causal-history-segment",
      intervalId: interval.intervalId,
      transmitterId: interval.transmitterId,
      reason: interval.reason,
      valueAuthority: "producer-carried-unresolved-interval",
    };
    unresolvedGroup.add(line);
  }

  function displayedWorld(position, time) {
    return toWorld(
      getDisplayPosition(position, time),
      new THREE.Vector3(),
    );
  }

  function syncSelection() {
    const groups = [
      rootLinkGroup,
      rootMarkerGroup,
      arrivalGlyphGroup,
      contributionGroup,
    ];
    groups.forEach((targetGroup) => {
      targetGroup.traverse((object) => {
        if (!object.material || !object.userData?.rootId) {
          return;
        }
        const selected = selectedRootId == null ||
          object.userData.rootId === selectedRootId;
        object.material.opacity = selected
          ? object.userData.kind === "analytical-wake-arrival-link" ? 0.78 : 0.98
          : 0.2;
      });
    });
  }

  function dispose() {
    clearGroup(rootLinkGroup);
    clearGroup(rootMarkerGroup);
    clearGroup(arrivalGlyphGroup);
    clearGroup(contributionGroup);
    clearGroup(unresolvedGroup);
    group.remove(
      rootLinkGroup,
      rootMarkerGroup,
      arrivalGlyphGroup,
      contributionGroup,
      unresolvedGroup,
    );
    currentProjection = null;
    currentEvent = null;
  }

  return Object.freeze({
    setEvent,
    setContributionVisible,
    setSelectedRoot,
    rebuild,
    dispose,
    getPickableObjects() {
      return [...rootMarkerGroup.children];
    },
    get currentProjection() {
      return currentProjection;
    },
    get currentEvent() {
      return currentEvent;
    },
  });
}

function rootUserData(root, kind) {
  return {
    kind,
    rootId: root.rootId,
    rootOrdinal: root.rootOrdinal,
    transmitterId: root.transmitterId,
    rootLabel: `${root.transmitterId} · root ${root.rootOrdinal}`,
    valueAuthority: "canonical-prescribed-path-analysis-projection",
  };
}

function rootColor(transmitterId, rootOrdinal) {
  let hash = 2166136261;
  const token = `${transmitterId}:${rootOrdinal}`;
  for (let index = 0; index < token.length; index += 1) {
    hash ^= token.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  const hue = ((hash >>> 0) % 360) / 360;
  return new THREE.Color().setHSL(hue, 0.72, 0.62);
}

function clearGroup(group) {
  group.children.slice().forEach((object) => {
    group.remove(object);
    object.traverse?.((child) => {
      child.geometry?.dispose?.();
      if (Array.isArray(child.material)) {
        child.material.forEach((material) => material.dispose?.());
      } else {
        child.material?.dispose?.();
      }
    });
  });
}
