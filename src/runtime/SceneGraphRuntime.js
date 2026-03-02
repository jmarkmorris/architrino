export function createSceneGraphRuntime(deps) {
  function getLayoutPackingMetrics(nodes) {
    const maxNodeRadius = Math.max(
      1,
      ...nodes.map((node) =>
        Number.isFinite(node?.radius) && node.radius > 0 ? node.radius : 1
      )
    );
    const haloScale = 1.18;
    const guardBandMin = 0.15;
    const guardBandRatio = 0.08;
    const haloDiameter = maxNodeRadius * haloScale * 2;
    const guardBand = Math.max(guardBandMin, haloDiameter * guardBandRatio);
    const requiredChord = haloDiameter + guardBand;
    return { maxNodeRadius, requiredChord };
  }

  function ringSelfRadius(count, requiredChord) {
    if (count <= 1) {
      return 0;
    }
    return requiredChord / (2 * Math.sin(Math.PI / count));
  }

  function buildRingPoints(count, radius, startAngle = Math.PI / 2, phaseOffset = 0) {
    const points = [];
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2 + startAngle + phaseOffset;
      points.push([
        Number((Math.cos(angle) * radius).toFixed(2)),
        Number((Math.sin(angle) * radius).toFixed(2)),
        0,
      ]);
    }
    return points;
  }

  function minOuterInnerDistance(outerCount, outerRadius, innerCount, innerRadius, phaseOffset) {
    let minDistance = Infinity;
    for (let i = 0; i < outerCount; i += 1) {
      const outerAngle = (i / outerCount) * Math.PI * 2;
      const outerX = Math.cos(outerAngle) * outerRadius;
      const outerY = Math.sin(outerAngle) * outerRadius;
      for (let j = 0; j < innerCount; j += 1) {
        const innerAngle = (j / innerCount) * Math.PI * 2 + phaseOffset;
        const innerX = Math.cos(innerAngle) * innerRadius;
        const innerY = Math.sin(innerAngle) * innerRadius;
        const distance = Math.hypot(outerX - innerX, outerY - innerY);
        if (distance < minDistance) {
          minDistance = distance;
        }
      }
    }
    return minDistance;
  }

  function solveTwoRingOuterRadius(outerCount, innerCount, innerRadius, requiredChord) {
    const phaseSamples = 720;
    const feasibleAtRadius = (outerRadius) => {
      let bestPhase = 0;
      let bestDistance = -Infinity;
      for (let sample = 0; sample < phaseSamples; sample += 1) {
        const phase = (sample / phaseSamples) * Math.PI * 2;
        const distance = minOuterInnerDistance(
          outerCount,
          outerRadius,
          innerCount,
          innerRadius,
          phase
        );
        if (distance > bestDistance) {
          bestDistance = distance;
          bestPhase = phase;
        }
        if (distance >= requiredChord) {
          return { ok: true, phase };
        }
      }
      return { ok: false, phase: bestPhase };
    };

    let low = Math.max(
      6,
      ringSelfRadius(outerCount, requiredChord),
      innerRadius + 0.01
    );
    let high = Math.max(low + requiredChord, low * 1.4);
    let attempt = feasibleAtRadius(low);
    if (attempt.ok) {
      return { outerRadius: low, phase: attempt.phase };
    }

    let expansionSteps = 0;
    while (!attempt.ok && expansionSteps < 20) {
      high *= 1.35;
      attempt = feasibleAtRadius(high);
      expansionSteps += 1;
    }
    if (!attempt.ok) {
      return null;
    }

    let bestPhase = attempt.phase;
    for (let i = 0; i < 24; i += 1) {
      const mid = (low + high) / 2;
      const midAttempt = feasibleAtRadius(mid);
      if (midAttempt.ok) {
        high = mid;
        bestPhase = midAttempt.phase;
      } else {
        low = mid;
      }
    }
    return { outerRadius: high, phase: bestPhase };
  }

  function computeExplicitRingPositions(nodes) {
    const count = Array.isArray(nodes) ? nodes.length : 0;
    if (!count) {
      return null;
    }
    if (count === 1) {
      return [[0, 0, 0]];
    }

    const { requiredChord } = getLayoutPackingMetrics(nodes);
    const startAngle = Math.PI / 2;
    const ringRadius = Math.max(6, ringSelfRadius(count, requiredChord));
    return buildRingPoints(count, ringRadius, startAngle);
  }

  function computeExplicitRingsPositions(nodes, centerOn = null) {
    const count = Array.isArray(nodes) ? nodes.length : 0;
    if (!count) {
      return null;
    }
    if (count === 1) {
      return [[0, 0, 0]];
    }
    const singleRingMaxCount = 12;
    if (count <= singleRingMaxCount) {
      return computeExplicitRingPositions(nodes);
    }

    const { maxNodeRadius, requiredChord } = getLayoutPackingMetrics(nodes);
    const maxOuterCount = 14;
    const candidates = [];

    if (count <= maxOuterCount) {
      candidates.push({ outerCount: count, innerCount: 0, hasCenter: false });
    }

    [false, true].forEach((hasCenter) => {
      const remaining = count - (hasCenter ? 1 : 0);
      if (remaining < 2) {
        return;
      }
      if (hasCenter && remaining <= maxOuterCount) {
        candidates.push({ outerCount: remaining, innerCount: 0, hasCenter: true });
      }
      const maxInner = Math.floor(remaining / 2);
      for (let innerCount = 1; innerCount <= maxInner; innerCount += 1) {
        const outerCount = remaining - innerCount;
        if (outerCount < innerCount || outerCount > maxOuterCount) {
          continue;
        }
        candidates.push({ outerCount, innerCount, hasCenter });
      }
    });

    if (!candidates.length) {
      return computeExplicitRingPositions(nodes);
    }

    const scoredCandidates = [];
    candidates.forEach((candidate) => {
      if (candidate.innerCount === 0) {
        const outerRadius = Math.max(6, ringSelfRadius(candidate.outerCount, requiredChord));
        scoredCandidates.push({
          ...candidate,
          outerRadius,
          innerRadius: 0,
          innerPhase: 0,
          extent: outerRadius + maxNodeRadius,
        });
        return;
      }

      const innerRadius = Math.max(requiredChord, ringSelfRadius(candidate.innerCount, requiredChord));
      const outerFit = solveTwoRingOuterRadius(
        candidate.outerCount,
        candidate.innerCount,
        innerRadius,
        requiredChord
      );
      if (!outerFit) {
        return;
      }
      scoredCandidates.push({
        ...candidate,
        outerRadius: outerFit.outerRadius,
        innerRadius,
        innerPhase: outerFit.phase,
        extent: outerFit.outerRadius + maxNodeRadius,
      });
    });

    if (!scoredCandidates.length) {
      return computeExplicitRingPositions(nodes);
    }

    scoredCandidates.sort((a, b) => {
      if (a.extent !== b.extent) {
        return a.extent - b.extent;
      }
      if (a.hasCenter !== b.hasCenter) {
        return a.hasCenter ? -1 : 1;
      }
      if (a.outerCount !== b.outerCount) {
        return b.outerCount - a.outerCount;
      }
      return a.innerCount - b.innerCount;
    });
    const best = scoredCandidates[0];

    const centerMatch =
      typeof centerOn === "string" && centerOn.trim().length
        ? centerOn.trim().toLowerCase()
        : null;
    let centerIndex = -1;
    if (best.hasCenter) {
      centerIndex = nodes.findIndex((node) => {
        const id = String(node?.id ?? "").toLowerCase();
        const name = String(node?.name ?? "").toLowerCase();
        return centerMatch && (id === centerMatch || name === centerMatch);
      });
      if (centerIndex < 0) {
        centerIndex = 0;
      }
    }

    const positions = new Array(count);
    const remainingIndices = [];
    for (let index = 0; index < count; index += 1) {
      if (index === centerIndex) {
        continue;
      }
      remainingIndices.push(index);
    }

    const outerIndices = remainingIndices.slice(0, best.outerCount);
    const innerIndices = remainingIndices.slice(best.outerCount, best.outerCount + best.innerCount);
    const outerPoints = buildRingPoints(best.outerCount, best.outerRadius);
    const innerPoints = buildRingPoints(best.innerCount, best.innerRadius, Math.PI / 2, best.innerPhase);

    outerIndices.forEach((nodeIndex, i) => {
      positions[nodeIndex] = outerPoints[i];
    });
    innerIndices.forEach((nodeIndex, i) => {
      positions[nodeIndex] = innerPoints[i];
    });
    if (best.hasCenter && centerIndex >= 0) {
      positions[centerIndex] = [0, 0, 0];
    }

    for (let index = 0; index < count; index += 1) {
      if (!positions[index]) {
        positions[index] = [0, 0, 0];
      }
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
    const shellGuides = [];
    let primaryBinaryNode = null;

    const explicitLayoutMode =
      typeof config.layoutMode === "string" && config.layoutMode.trim()
        ? config.layoutMode.toLowerCase()
        : null;
    const useExplicitRingsLayout =
      config.layout === "static" && explicitLayoutMode === "rings";
    const useStructuredLayout = useExplicitRingsLayout;
    const ringNodes = useStructuredLayout
      ? config.nodes.filter((node) => node?.category !== "legend")
      : [];
    const explicitRingsPositions = useExplicitRingsLayout
      ? computeExplicitRingsPositions(ringNodes, config.centerOn)
      : null;
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
      if (explicitRingsPositions && !usesFixedPosition) {
        const pos = explicitRingsPositions[ringIndex];
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
          const guideOpacity = 0.28;
          const guideMat = new deps.THREE.MeshBasicMaterial({
            color: "#8fa7ff",
            transparent: true,
            opacity: guideOpacity,
            side: deps.THREE.DoubleSide,
            depthWrite: false,
          });
          const guide = new deps.THREE.Mesh(guideGeo, guideMat);
          guide.userData.excludeFromBounds = true;
          group.add(guide);
          shellGuides.push({ mesh: guide, baseOpacity: guideOpacity });
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
        const guideOpacity = 0.28;
        const guideMat = new deps.THREE.MeshBasicMaterial({
          color: "#8fa7ff",
          transparent: true,
          opacity: guideOpacity,
          side: deps.THREE.DoubleSide,
          depthWrite: false,
        });
        const guide = new deps.THREE.Mesh(guideGeo, guideMat);
        guide.userData.excludeFromBounds = true;
        group.add(guide);
        shellGuides.push({ mesh: guide, baseOpacity: guideOpacity });
      });
    }

    const level = {
      id: levelId,
      name: config.sceneName ?? levelId,
      sceneId: config.sceneId ?? null,
      sceneKind: config.sceneKind ?? null,
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
      shellGuides,
      primaryBinaryNode,
      layout: config.layout,
      layoutMode: config.layoutMode ?? null,
      links: [],
    };

    deps.layoutRootLevel(level);
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
