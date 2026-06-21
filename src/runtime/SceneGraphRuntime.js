import { isElementScene } from "../services/SceneCapabilitiesService.js";
import {
  RING_LAYOUT_DEFAULTS,
  getRingDirectionSign,
  getRingGuardBand,
  normalizeRingLayoutOptions,
} from "./RingLayoutRuntime.js";

export function createSceneGraphRuntime(deps) {
  const ELEMENT_FIRST_SHELL_OFFSET = 0.80;
  const ELEMENT_SHELL_GAP = 0.8;
  const HEAVY_PARTICLE_SCALE_START_NUCLEONS = 80;
  const HEAVY_PARTICLE_SCALE_END_NUCLEONS = 250;
  const HEAVY_PARTICLE_SCALE_MAX = 1.75;
  const RING_RADIUS_TIE_EPS = 1e-6;

  function getHeavyElementParticleScale(nucleonCount) {
    if (!Number.isFinite(nucleonCount) || nucleonCount <= HEAVY_PARTICLE_SCALE_START_NUCLEONS) {
      return 1;
    }
    const span =
      HEAVY_PARTICLE_SCALE_END_NUCLEONS - HEAVY_PARTICLE_SCALE_START_NUCLEONS;
    if (span <= 0) {
      return HEAVY_PARTICLE_SCALE_MAX;
    }
    const t = Math.max(
      0,
      Math.min(1, (nucleonCount - HEAVY_PARTICLE_SCALE_START_NUCLEONS) / span)
    );
    return 1 + (HEAVY_PARTICLE_SCALE_MAX - 1) * t;
  }

  function getLayoutPackingMetrics(nodes) {
    const maxNodeRadius = Math.max(
      1,
      ...nodes.map((node) =>
        Number.isFinite(node?.radius) && node.radius > 0 ? node.radius : 1
      )
    );
    const haloScale = RING_LAYOUT_DEFAULTS.haloScale;
    const haloDiameter = maxNodeRadius * haloScale * 2;
    const guardBand = getRingGuardBand(haloDiameter);
    const requiredChord = haloDiameter + guardBand;
    return { maxNodeRadius, requiredChord };
  }

  function ringSelfRadius(count, requiredChord) {
    if (count <= 1) {
      return 0;
    }
    return requiredChord / (2 * Math.sin(Math.PI / count));
  }

  function buildRingPoints(
    count,
    radius,
    startAngle = RING_LAYOUT_DEFAULTS.startAngle,
    phaseOffset = 0,
    direction = RING_LAYOUT_DEFAULTS.direction
  ) {
    const points = [];
    const angleStepSign = getRingDirectionSign(direction);
    for (let i = 0; i < count; i += 1) {
      const angle = startAngle + phaseOffset + angleStepSign * (i / count) * Math.PI * 2;
      points.push([
        Number((Math.cos(angle) * radius).toFixed(2)),
        Number((Math.sin(angle) * radius).toFixed(2)),
        0,
      ]);
    }
    return points;
  }

  function minOuterInnerDistance(outerCount, outerRadius, innerCount, innerRadius, phaseOffset) {
    const gcd = (a, b) => {
      let x = Math.abs(a);
      let y = Math.abs(b);
      while (y !== 0) {
        const t = x % y;
        x = y;
        y = t;
      }
      return x || 1;
    };
    const lcm = Math.abs(outerCount * innerCount) / gcd(outerCount, innerCount);
    const phaseFraction = ((phaseOffset / (Math.PI * 2)) % 1 + 1) % 1;
    const t = phaseFraction * lcm;
    const nearestIndex = Math.floor(t + 0.5);
    const fracSteps = Math.abs(t - nearestIndex);
    const minDelta = (Math.PI * 2 * fracSteps) / lcm;
    return Math.sqrt(
      outerRadius * outerRadius +
        innerRadius * innerRadius -
        2 * outerRadius * innerRadius * Math.cos(minDelta)
    );
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

    let low = Math.max(ringSelfRadius(outerCount, requiredChord), innerRadius + 0.01);
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

  function computeExplicitRingPositions(nodes, options = {}) {
    const count = Array.isArray(nodes) ? nodes.length : 0;
    if (!count) {
      return null;
    }
    if (count === 1) {
      return [[0, 0, 0]];
    }

    const { requiredChord } = getLayoutPackingMetrics(nodes);
    const ringLayoutOptions = normalizeRingLayoutOptions(options);
    const startAngle = RING_LAYOUT_DEFAULTS.startAngle;
    const ringRadius = ringSelfRadius(count, requiredChord);
    return buildRingPoints(
      count,
      ringRadius,
      startAngle,
      0,
      ringLayoutOptions.direction
    );
  }

  function computeExplicitRingsPositions(nodes, options = {}) {
    const count = Array.isArray(nodes) ? nodes.length : 0;
    if (!count) {
      return null;
    }
    if (count === 1) {
      return [[0, 0, 0]];
    }
    const ringLayoutOptions = normalizeRingLayoutOptions(
      typeof options === "string" ? null : options,
      typeof options === "string" ? { centerOn: options } : {}
    );
    if (ringLayoutOptions.centerMode === "none") {
      return computeExplicitRingPositions(nodes, ringLayoutOptions);
    }
    const { maxNodeRadius, requiredChord } = getLayoutPackingMetrics(nodes);
    const candidates = [];
    const wantsCenter = ringLayoutOptions.centerMode === "node";
    const allowsAutoCenter = ringLayoutOptions.centerMode === "auto";
    if (!wantsCenter) {
      candidates.push({ outerCount: count, innerCount: 0, hasCenter: false });
    }

    const centerAllowed = wantsCenter ? count > 2 : allowsAutoCenter && count > 6;
    const centerModes = centerAllowed
      ? wantsCenter
        ? [true]
        : [false, true]
      : [false];
    centerModes.forEach((hasCenter) => {
      const remaining = count - (hasCenter ? 1 : 0);
      if (remaining < 2) {
        return;
      }
      if (hasCenter) {
        candidates.push({ outerCount: remaining, innerCount: 0, hasCenter: true });
      }
      const maxInner = Math.floor(remaining / 2);
      for (let innerCount = 1; innerCount <= maxInner; innerCount += 1) {
        const outerCount = remaining - innerCount;
        if (outerCount < innerCount) {
          continue;
        }
        candidates.push({ outerCount, innerCount, hasCenter });
      }
    });

    if (!candidates.length) {
      return computeExplicitRingPositions(nodes, ringLayoutOptions);
    }

    const scoreCandidate = (candidate) => {
      if (candidate.innerCount === 0) {
        const outerRadius = ringSelfRadius(candidate.outerCount, requiredChord);
        return {
          ...candidate,
          outerRadius,
          innerRadius: 0,
          innerPhase: 0,
          extent: outerRadius + maxNodeRadius,
        };
      }

      const innerRadius = Math.max(requiredChord, ringSelfRadius(candidate.innerCount, requiredChord));
      const outerFit = solveTwoRingOuterRadius(
        candidate.outerCount,
        candidate.innerCount,
        innerRadius,
        requiredChord
      );
      if (!outerFit) {
        return null;
      }
      return {
        ...candidate,
        outerRadius: outerFit.outerRadius,
        innerRadius,
        innerPhase: outerFit.phase,
        extent: outerFit.outerRadius + maxNodeRadius,
      };
    };

    const compareScoredCandidates = (a, b) => {
      if (a.extent !== b.extent) {
        return a.extent - b.extent;
      }
      if (a.hasCenter !== b.hasCenter) {
        return a.hasCenter ? -1 : 1;
      }
      const aBalance =
        a.innerCount > 0 ? Math.abs(a.outerCount - a.innerCount) : Number.POSITIVE_INFINITY;
      const bBalance =
        b.innerCount > 0 ? Math.abs(b.outerCount - b.innerCount) : Number.POSITIVE_INFINITY;
      if (aBalance !== bBalance) {
        return aBalance - bBalance;
      }
      if (a.outerCount !== b.outerCount) {
        return b.outerCount - a.outerCount;
      }
      return a.innerCount - b.innerCount;
    };

    const scoredCandidates = candidates.map(scoreCandidate).filter(Boolean);

    if (!scoredCandidates.length) {
      return computeExplicitRingPositions(nodes, ringLayoutOptions);
    }

    scoredCandidates.sort(compareScoredCandidates);
    let best = scoredCandidates[0];

    // If 6 < y < 12, prefer m/6/{0,1} when radius ties.
    if (best.innerCount > 6 && best.innerCount < 12) {
      const preferred = [];
      [0, 1].forEach((z) => {
        const outerCount = count - 6 - z;
        if (outerCount < 6) {
          return;
        }
        const scored = scoreCandidate({
          outerCount,
          innerCount: 6,
          hasCenter: z === 1,
        });
        if (!scored) {
          return;
        }
        if (Math.abs(scored.extent - best.extent) <= RING_RADIUS_TIE_EPS) {
          preferred.push(scored);
        }
      });
      if (preferred.length) {
        preferred.sort(compareScoredCandidates);
        [best] = preferred;
      }
    }

    const centerMatch =
      typeof ringLayoutOptions.centerOn === "string" &&
      ringLayoutOptions.centerOn.trim().length
        ? ringLayoutOptions.centerOn.trim().toLowerCase()
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
    const outerPoints = buildRingPoints(
      best.outerCount,
      best.outerRadius,
      RING_LAYOUT_DEFAULTS.startAngle,
      0,
      ringLayoutOptions.direction
    );
    const innerPoints = buildRingPoints(
      best.innerCount,
      best.innerRadius,
      RING_LAYOUT_DEFAULTS.startAngle,
      best.innerPhase,
      ringLayoutOptions.direction
    );

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

  function getNodeRingStyle(nodeData) {
    const ringScale = nodeData.glowRingScale ?? 1.04;
    const ringThickness =
      nodeData.glowRingThickness ?? Math.max(0.028, nodeData.radius * 0.06);
    return { ringScale, ringThickness };
  }

  function rebuildNodeRingGeometry(nodeData, ringMesh) {
    if (!ringMesh?.geometry) {
      return;
    }
    const style = getNodeRingStyle(nodeData);
    ringMesh.geometry.dispose();
    ringMesh.geometry = new deps.THREE.TorusGeometry(
      nodeData.radius * style.ringScale,
      style.ringThickness,
      12,
      64
    );
  }

  function refreshNodeRingGeometries(node) {
    if (!node?.data) {
      return;
    }
    if (node.halo) {
      rebuildNodeRingGeometry(node.data, node.halo);
    }
    if (!Array.isArray(node.extraMeshes)) {
      return;
    }
    node.extraMeshes.forEach((entry) => {
      if (entry?.mesh?.userData?.isGlowRing) {
        rebuildNodeRingGeometry(node.data, entry.mesh);
      }
    });
  }

  function resizeSphereNodeRadius(node, radius) {
    if (!node?.mesh || !Number.isFinite(radius) || radius <= 0) {
      return;
    }
    node.data.radius = radius;
    if (node.mesh.geometry) {
      node.mesh.geometry.dispose();
    }
    node.mesh.geometry = new deps.THREE.SphereGeometry(radius, 32, 20);
    if (node.chapterLabelObject) {
      node.chapterLabelObject.position.set(0, -radius * 0.7, 0);
    }
    if (node.outline?.geometry) {
      node.outline.geometry.dispose();
      node.outline.geometry = new deps.THREE.EdgesGeometry(node.mesh.geometry);
    }
    refreshNodeRingGeometries(node);
  }

  function getLowCountNucleonScale(nucleonCount) {
    if (!Number.isFinite(nucleonCount) || nucleonCount <= 0) {
      return 1;
    }
    if (nucleonCount >= 10) {
      return 1;
    }
    const minScale = 0.84;
    const t = (nucleonCount - 1) / 9;
    return minScale + (1 - minScale) * Math.max(0, Math.min(1, t));
  }

  function buildHexSpiralCategoryLayout(protonCount, neutronCount, minCenterDistance) {
    if (!Number.isFinite(minCenterDistance) || minCenterDistance <= 0) {
      return [];
    }

    const desiredProtons = Math.max(0, Math.floor(protonCount));
    const desiredNeutrons = Math.max(0, Math.floor(neutronCount));
    const total = desiredProtons + desiredNeutrons;
    if (total <= 0) {
      return [];
    }

    const headingToDelta = {
      0: [1, 0],
      60: [0, 1],
      120: [-1, 1],
      180: [-1, 0],
      240: [0, -1],
      300: [1, -1],
    };
    const keyFor = (q, r) => `${q},${r}`;
    const normalizeHeading = (heading) => {
      const normalized = heading % 360;
      return normalized < 0 ? normalized + 360 : normalized;
    };
    const nextCoord = (q, r, heading) => {
      const normalized = normalizeHeading(heading);
      const delta = headingToDelta[normalized];
      if (!delta) {
        return null;
      }
      return { q: q + delta[0], r: r + delta[1], heading: normalized };
    };

    const sortedNucleons = [];
    if (desiredNeutrons <= 0) {
      for (let i = 0; i < desiredProtons; i += 1) {
        sortedNucleons.push("proton");
      }
    } else {
      let remainingNeutrons = desiredNeutrons;
      let remainingProtons = desiredProtons;
      while (remainingNeutrons > 0 && remainingProtons > 0) {
        sortedNucleons.push("neutron");
        remainingNeutrons -= 1;
        sortedNucleons.push("proton");
        remainingProtons -= 1;
      }
      while (remainingNeutrons > 0) {
        sortedNucleons.push("neutron");
        remainingNeutrons -= 1;
      }
      while (remainingProtons > 0) {
        sortedNucleons.push("proton");
        remainingProtons -= 1;
      }
    }

    if (!sortedNucleons.length) {
      return [];
    }
    const pairedNucleonCount = Math.min(desiredNeutrons, desiredProtons) * 2;

    const used = new Set();
    const layoutSlots = [];
    const place = (q, r, category) => {
      const key = keyFor(q, r);
      if (used.has(key)) {
        return false;
      }
      used.add(key);
      layoutSlots.push({ category, q, r });
      return true;
    };
    const isFree = (q, r) => !used.has(keyFor(q, r));

    const snakes = [
      { head: null, heading: 180 },
      { head: null, heading: 0 },
    ];
    const snakeCategories = [sortedNucleons[0] ?? null, sortedNucleons[1] ?? null];

    // Seed 1: center slot.
    place(0, 0, sortedNucleons[0]);
    snakes[0].head = { q: 0, r: 0 };

    // Seed 2: adjacent at 240 degrees from center.
    if (sortedNucleons.length > 1) {
      let second = nextCoord(0, 0, 240);
      if (!second || !isFree(second.q, second.r)) {
        const fallbackHeadings = [180, 120, 60, 0, 300];
        second = null;
        for (let i = 0; i < fallbackHeadings.length; i += 1) {
          const candidate = nextCoord(0, 0, fallbackHeadings[i]);
          if (candidate && isFree(candidate.q, candidate.r)) {
            second = candidate;
            break;
          }
        }
      }
      if (second) {
        place(second.q, second.r, sortedNucleons[1]);
        snakes[1].head = { q: second.q, r: second.r };
      }
    }

    const placeAlongSnake = (snake, category) => {
      if (!snake.head) {
        return false;
      }

      const leftHeading = normalizeHeading(snake.heading + 60);
      const leftCell = nextCoord(snake.head.q, snake.head.r, leftHeading);
      if (leftCell && isFree(leftCell.q, leftCell.r)) {
        place(leftCell.q, leftCell.r, category);
        snake.head = { q: leftCell.q, r: leftCell.r };
        snake.heading = leftHeading;
        return true;
      }

      const straightCell = nextCoord(snake.head.q, snake.head.r, snake.heading);
      if (straightCell && isFree(straightCell.q, straightCell.r)) {
        place(straightCell.q, straightCell.r, category);
        snake.head = { q: straightCell.q, r: straightCell.r };
        snake.heading = normalizeHeading(snake.heading);
        return true;
      }

      const rightHeading = normalizeHeading(snake.heading - 60);
      const rightCell = nextCoord(snake.head.q, snake.head.r, rightHeading);
      if (rightCell && isFree(rightCell.q, rightCell.r)) {
        place(rightCell.q, rightCell.r, category);
        snake.head = { q: rightCell.q, r: rightCell.r };
        snake.heading = rightHeading;
        return true;
      }

      return false;
    };

    for (let i = 2; i < sortedNucleons.length; i += 1) {
      const category = sortedNucleons[i];
      let preferredSnakeIndex = i % 2;
      if (i >= pairedNucleonCount) {
        const tailSnakeIndex = snakeCategories.indexOf(category);
        if (tailSnakeIndex >= 0) {
          preferredSnakeIndex = tailSnakeIndex;
        }
      }
      let activeSnake = snakes[preferredSnakeIndex];
      if (!activeSnake.head) {
        activeSnake = snakes[(preferredSnakeIndex + 1) % 2];
      }
      if (!activeSnake.head || !placeAlongSnake(activeSnake, category)) {
        break;
      }
    }

    const positionedSlots = layoutSlots.map((slot) => ({
      category: slot.category,
      position: new deps.THREE.Vector3(
        minCenterDistance * (slot.q + slot.r * 0.5),
        minCenterDistance * (Math.sqrt(3) * 0.5 * slot.r),
        0
      ),
    }));

    if (!positionedSlots.length) {
      return positionedSlots;
    }

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    positionedSlots.forEach((slot) => {
      minX = Math.min(minX, slot.position.x);
      maxX = Math.max(maxX, slot.position.x);
      minY = Math.min(minY, slot.position.y);
      maxY = Math.max(maxY, slot.position.y);
    });
    const centerX = (minX + maxX) * 0.5;
    const centerY = (minY + maxY) * 0.5;
    positionedSlots.forEach((slot) => {
      slot.position.x -= centerX;
      slot.position.y -= centerY;
    });

    return positionedSlots;
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

    const explicitLayoutType =
      typeof config.layoutType === "string" && config.layoutType.trim()
        ? config.layoutType.toLowerCase()
        : null;
    const useExplicitRingsLayout =
      config.layout === "static" && explicitLayoutType === "rings";
    const useStructuredLayout = useExplicitRingsLayout;
    const ringNodes = useStructuredLayout
      ? config.nodes.filter((node) => node?.category !== "legend")
      : [];
    const explicitRingLayoutOptions = useExplicitRingsLayout
      ? normalizeRingLayoutOptions(config.layoutConfig, { centerOn: config.centerOn })
      : null;
    const explicitRingsPositions = useExplicitRingsLayout
      ? computeExplicitRingsPositions(ringNodes, explicitRingLayoutOptions)
      : null;
    let ringIndex = 0;

    const spacing = config.spacing ?? 7;
    const centerOffset = (config.nodes.length - 1) / 2;
    const isElementLevel = isElementScene({ id: levelId });

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

    if (isElementLevel) {
      let nucleusRadius = 0;
      const nucleons = nodes.filter(
        (n) => n.data.category === "proton" || n.data.category === "neutron"
      );
      const electrons = nodes.filter((n) => n.data.category === "electron");
      if (nucleons.length) {
        const lowCountScale = getLowCountNucleonScale(nucleons.length);
        const heavyElementScale = getHeavyElementParticleScale(nucleons.length);
        const nucleonScale = lowCountScale * heavyElementScale;
        if (nucleonScale !== 1) {
          nucleons.forEach((nucleon) => {
            const baseRadius = Number.isFinite(nucleon?.data?.radius)
              ? nucleon.data.radius
              : 0.3;
            resizeSphereNodeRadius(nucleon, baseRadius * nucleonScale);
          });
        }
        const avgRadius =
          nucleons.reduce((s, n) => s + (n.data.radius ?? 0.3), 0) /
          nucleons.length;
        const maxNucleonHaloExtent = nucleons.reduce((maxExtent, nucleon) => {
          const radius = Number.isFinite(nucleon?.data?.radius) ? nucleon.data.radius : avgRadius;
          const ringScale = nucleon?.data?.glowRingScale ?? 1.04;
          const ringThickness =
            nucleon?.data?.glowRingThickness ?? Math.max(0.028, radius * 0.06);
          const haloExtent = radius * ringScale + ringThickness;
          return Math.max(maxExtent, haloExtent, radius);
        }, avgRadius);
        const minNucleonCenterDistance = Math.max(
          avgRadius * 2.05,
          maxNucleonHaloExtent * 2 + avgRadius * 0.08
        );
        electrons.forEach((e) => {
          resizeSphereNodeRadius(e, avgRadius);
        });
        const protons = nucleons.filter((n) => n.data.category === "proton");
        const neutrons = nucleons.filter((n) => n.data.category === "neutron");
        const layout = buildHexSpiralCategoryLayout(
          protons.length,
          neutrons.length,
          minNucleonCenterDistance
        );
        layout.forEach((slot) => {
          let node = null;
          if (slot.category === "proton") {
            node = protons.shift() ?? neutrons.shift() ?? null;
          } else {
            node = neutrons.shift() ?? protons.shift() ?? null;
          }
          if (node && slot.position) {
            node.group.position.copy(slot.position);
          }
        });
        const nucleusExtent = layout.reduce(
          (maxDistance, slot) => Math.max(maxDistance, slot.position.length()),
          0
        );
        nucleusRadius = nucleusExtent + maxNucleonHaloExtent;
      }

      const uniqueRadii = Array.from(
        new Set(
          electrons
            .map((e) => e.data.orbit?.radius)
            .filter((r) => typeof r === "number")
        )
      ).sort((a, b) => a - b);

      if (uniqueRadii.length) {
        const minShellRadius = nucleusRadius + ELEMENT_FIRST_SHELL_OFFSET;
        const shellGap = ELEMENT_SHELL_GAP;
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
      markdownPath: config.markdownPath ?? null,
      markdownSection: config.markdownSection ?? null,
      markdownColumns: config.markdownColumns ?? null,
      markdownShowTitle: config.markdownShowTitle ?? true,
      markdownAutoOpen: config.markdownAutoOpen ?? true,
      markdownDownloadOnly: config.markdownDownloadOnly === true,
      viewportFit: config.viewportFit ?? null,
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
      layoutType: config.layoutType ?? null,
      layoutConfig: config.layoutConfig ?? null,
      ringLayout: explicitRingLayoutOptions,
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
