export function createSceneGraphRuntime(deps) {
  function computeExplicitRingPositions(nodes) {
    const count = Array.isArray(nodes) ? nodes.length : 0;
    if (!count) {
      return null;
    }
    if (count === 1) {
      return [[0, 0, 0]];
    }

    const haloScale = 1.18;
    const guardBandMin = 0.15;
    const guardBandRatio = 0.08;
    const startAngle = Math.PI / 2;
    const maxNodeRadius = Math.max(
      1,
      ...nodes.map((node) =>
        Number.isFinite(node?.radius) && node.radius > 0 ? node.radius : 1
      )
    );
    const haloDiameter = maxNodeRadius * haloScale * 2;
    const guardBand = Math.max(guardBandMin, haloDiameter * guardBandRatio);
    const requiredChord = haloDiameter + guardBand;
    const ringRadius = Math.max(6, requiredChord / (2 * Math.sin(Math.PI / count)));
    const positions = [];

    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2 + startAngle;
      positions.push([
        Number((Math.cos(angle) * ringRadius).toFixed(2)),
        Number((Math.sin(angle) * ringRadius).toFixed(2)),
        0,
      ]);
    }
    return positions;
  }

  function computeExplicitGridPositions(nodes, requestedColumns = null) {
    const count = Array.isArray(nodes) ? nodes.length : 0;
    if (!count) {
      return null;
    }
    const maxNodeRadius = Math.max(
      1,
      ...nodes.map((node) =>
        Number.isFinite(node?.radius) && node.radius > 0 ? node.radius : 1
      )
    );
    const spacing = Number((maxNodeRadius * 2.9).toFixed(2));
    const columns =
      Number.isInteger(requestedColumns) && requestedColumns > 0
        ? requestedColumns
        : Math.max(2, Math.ceil(Math.sqrt(count * 1.6)));
    const rows = Math.ceil(count / columns);
    const startX = -((columns - 1) * spacing) / 2;
    const startY = ((rows - 1) * spacing) / 2;
    const positions = [];
    for (let i = 0; i < count; i += 1) {
      const row = Math.floor(i / columns);
      const col = i % columns;
      positions.push([
        Number((startX + col * spacing).toFixed(2)),
        Number((startY - row * spacing).toFixed(2)),
        0,
      ]);
    }
    return positions;
  }

  function buildLevel(levelId) {
    if (deps.levels.has(levelId)) {
      return deps.levels.get(levelId);
    }

    const config = deps.levelConfigs[levelId];
    const group = new deps.THREE.Group();
    let nodes = [];
    const nodeByName = new Map();
    const nodeById = new Map();
    const motionNodes = [];
    const ringTargets = [];
    const ringTargetByMesh = new Map();
    let primaryBinaryNode = null;

    const explicitLayoutMode =
      typeof config.layoutMode === "string" ? config.layoutMode : null;
    const useLegacyAutoSphereRing =
      explicitLayoutMode !== "manual" &&
      !!config.autoSphereRing &&
      !config.autoMarkdownDirectory &&
      config.layout === "static";
    const useExplicitRingLayout =
      config.layout === "static" && explicitLayoutMode === "ring";
    const useExplicitGridLayout =
      config.layout === "static" && explicitLayoutMode === "grid";
    const useRingLayout = useLegacyAutoSphereRing || useExplicitRingLayout;
    const useStructuredLayout = useRingLayout || useExplicitGridLayout;
    const ringNodes = useStructuredLayout
      ? config.nodes.filter((node) => node?.category !== "legend")
      : [];
    const ringLayout = useLegacyAutoSphereRing ? deps.computeRingLayout(ringNodes) : null;
    const explicitRingPositions = useExplicitRingLayout
      ? computeExplicitRingPositions(ringNodes)
      : null;
    const explicitGridPositions = useExplicitGridLayout
      ? computeExplicitGridPositions(ringNodes, config.layoutColumns)
      : null;
    const useClockwiseOrder =
      !!ringLayout &&
      useLegacyAutoSphereRing &&
      (config.autoMarkdownPath || config.autoMarkdownDirectory || config.autoMarkdownSection);
    let ringIndex = 0;

    const spacing = config.spacing ?? 7;
    const centerOffset = (config.nodes.length - 1) / 2;
    const isElementScene =
      typeof levelId === "string" && levelId.startsWith("content/scenes/elements/");

    config.nodes.forEach((nodeDataRaw, index) => {
      const nodeData = deps.cloneNodeData(nodeDataRaw);
      if (nodeData.category === "legend") {
        return;
      }
      const usesFixedPosition = nodeData.fixedPosition === true;
      if (ringLayout && !usesFixedPosition) {
        const positionIndex =
          useClockwiseOrder && ringIndex > 0
            ? ringLayout.positions.length - ringIndex
            : ringIndex;
        const pos = ringLayout.positions[positionIndex];
        if (pos) {
          nodeData.position = [pos[0], pos[1], 0];
        }
        nodeData.radius = ringLayout.nodeRadius;
        ringIndex += 1;
      } else if (explicitRingPositions && !usesFixedPosition) {
        const pos = explicitRingPositions[ringIndex];
        if (pos) {
          nodeData.position = [pos[0], pos[1], pos[2] ?? 0];
        }
        ringIndex += 1;
      } else if (explicitGridPositions && !usesFixedPosition) {
        const pos = explicitGridPositions[ringIndex];
        if (pos) {
          nodeData.position = [pos[0], pos[1], pos[2] ?? 0];
        }
        ringIndex += 1;
      }
      const node = deps.createNode(nodeData);
      const hasPosition =
        Array.isArray(nodeData.position) && nodeData.position.length >= 2;
      if (hasPosition) {
        node.group.position.set(
          nodeData.position[0] ?? 0,
          nodeData.position[1] ?? 0,
          nodeData.position[2] ?? 0
        );
      } else if (config.layout === "linear") {
        node.group.position.x = (index - centerOffset) * spacing;
      }
      group.add(node.group);
      nodes.push(node);
      nodeByName.set(nodeData.name, node);
      if (nodeData.id) {
        nodeById.set(nodeData.id, node);
      }

      if (nodeData.motionType) {
        motionNodes.push(node);
      }
      if (node.binaryBandData && node.binaryBandData.length) {
        node.binaryBandData.forEach((band) => {
          if (!band.ring) {
            return;
          }
          ringTargets.push({ mesh: band.ring, node, bandName: band.bandName });
          ringTargetByMesh.set(band.ring, { node, bandName: band.bandName });
        });
        if (!primaryBinaryNode) {
          primaryBinaryNode = node;
        }
      }
    });

    if (isElementScene) {
      let nucleusRadius = 0;
      const nucleons = nodes.filter(
        (n) => n.data.category === "proton" || n.data.category === "neutron"
      );
      const electrons = nodes.filter((n) => n.data.category === "electron");
      if (nucleons.length) {
        const avgRadius =
          nucleons.reduce((s, n) => s + (n.data.radius ?? 0.3), 0) /
          nucleons.length;
        electrons.forEach((e) => {
          e.data.radius = avgRadius;
          e.mesh.geometry.dispose();
          e.mesh.geometry = new deps.THREE.SphereGeometry(avgRadius, 32, 20);
          e.outline.geometry.dispose();
          e.outline.geometry = new deps.THREE.EdgesGeometry(e.mesh.geometry);
        });
        const golden = Math.PI * (3 - Math.sqrt(5));
        const packRadius = Math.max(
          avgRadius * 2.2,
          Math.sqrt(nucleons.length) * avgRadius * 1.25
        );
        const positions = [];
        for (let i = 0; i < nucleons.length; i++) {
          const r = packRadius * Math.sqrt((i + 0.35) / nucleons.length);
          const theta = i * golden;
          positions.push(new deps.THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, 0));
        }
        const protons = nucleons.filter((n) => n.data.category === "proton");
        const neutrons = nucleons.filter((n) => n.data.category === "neutron");
        const ordered = [];
        while (protons.length || neutrons.length) {
          if (protons.length) ordered.push(protons.shift());
          if (neutrons.length) ordered.push(neutrons.shift());
        }
        ordered.forEach((node, idx) => {
          if (positions[idx]) {
            node.group.position.copy(positions[idx]);
          }
        });

        nucleusRadius = packRadius + avgRadius * 0.5;
      }

      const uniqueRadii = Array.from(
        new Set(
          electrons
            .map((e) => e.data.orbit?.radius)
            .filter((r) => typeof r === "number")
        )
      ).sort((a, b) => a - b);

      if (uniqueRadii.length) {
        const minShellRadius = nucleusRadius + 0.6;
        const shellGap = 0.9;
        const radiusMap = new Map();
        uniqueRadii.forEach((r, idx) => {
          radiusMap.set(r, minShellRadius + idx * shellGap);
        });

        electrons.forEach((e) => {
          const currentRadius = e.data.orbit?.radius;
          if (typeof currentRadius !== "number") {
            return;
          }
          const newRadius = radiusMap.get(currentRadius) ?? currentRadius;
          const pos = e.group.position;
          const angle = Math.atan2(pos.y, pos.x) || 0;
          if (!e.data.orbit) {
            e.data.orbit = { center: "origin", radius: newRadius, speed: 0, phase: angle };
          } else {
            e.data.orbit.radius = newRadius;
            e.data.orbit.phase = angle;
          }
          e.group.position.set(Math.cos(angle) * newRadius, Math.sin(angle) * newRadius, 0);
        });

        const remappedRadii = uniqueRadii.map((r) => radiusMap.get(r) ?? r);
        remappedRadii.forEach((r) => {
          const guideGeo = new deps.THREE.RingGeometry(Math.max(0.01, r - 0.06), r + 0.06, 96);
          const guideMat = new deps.THREE.MeshBasicMaterial({
            color: "#8fa7ff",
            transparent: true,
            opacity: 0.28,
            side: deps.THREE.DoubleSide,
            depthWrite: false,
          });
          const guide = new deps.THREE.Mesh(guideGeo, guideMat);
          guide.userData.excludeFromBounds = true;
          group.add(guide);
        });
      }
    } else {
      const electrons = nodes.filter((n) => n.data.category === "electron");
      const shellRadii = Array.from(
        new Set(
          electrons
            .map((e) => e.data.orbit?.radius)
            .filter((r) => typeof r === "number")
        )
      ).sort((a, b) => a - b);
      shellRadii.forEach((r) => {
        const guideGeo = new deps.THREE.RingGeometry(Math.max(0.01, r - 0.08), r + 0.08, 96);
        const guideMat = new deps.THREE.MeshBasicMaterial({
          color: "#8fa7ff",
          transparent: true,
          opacity: 0.28,
          side: deps.THREE.DoubleSide,
          depthWrite: false,
        });
        const guide = new deps.THREE.Mesh(guideGeo, guideMat);
        guide.userData.excludeFromBounds = true;
        group.add(guide);
      });
    }

    const level = {
      id: levelId,
      name: config.sceneName ?? levelId,
      sceneId: config.sceneId ?? null,
      markdownPath: config.markdownPath ?? null,
      markdownSection: config.markdownSection ?? null,
      markdownColumns: config.markdownColumns ?? null,
      markdownAutoOpen: config.markdownAutoOpen ?? true,
      centerOn: config.centerOn,
      group,
      nodes,
      nodeByName,
      nodeById,
      motionNodes,
      ringTargets,
      ringTargetByMesh,
      primaryBinaryNode,
      layout: config.layout,
      links: [],
    };

    if (level.id === deps.rootScenePath) {
      deps.layoutRootLevel(level);
    }
    level.nodes.forEach((node) => {
      node.basePosition = node.group.position.clone();
    });

    deps.levels.set(levelId, level);
    deps.buildLevelLinks(level, config);
    deps.updateLevelMotions(level, 0);
    return level;
  }

  return { buildLevel };
}
