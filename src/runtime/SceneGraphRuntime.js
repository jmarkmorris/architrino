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

  function buildHexPackedNucleonPositions(count, minCenterDistance) {
    if (
      !Number.isFinite(count) ||
      count <= 0 ||
      !Number.isFinite(minCenterDistance) ||
      minCenterDistance <= 0
    ) {
      return [];
    }
    const axialCoords = [[0, 0]];
    if (count === 1) {
      return [new deps.THREE.Vector3(0, 0, 0)];
    }
    const directions = [
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
    ];

    const getMaxGapIndices = (totalSlots, selectedCount) => {
      if (selectedCount <= 0) {
        return [];
      }
      if (selectedCount >= totalSlots) {
        return Array.from({ length: totalSlots }, (_, idx) => idx);
      }
      const indices = [];
      for (let i = 0; i < selectedCount; i += 1) {
        indices.push(Math.floor((i * totalSlots) / selectedCount));
      }
      return indices;
    };

    for (let ring = 1; axialCoords.length < count; ring += 1) {
      let q = -ring;
      let r = ring;
      const ringCoords = [];
      for (let dir = 0; dir < directions.length; dir += 1) {
        const [dq, dr] = directions[dir];
        for (let step = 0; step < ring; step += 1) {
          ringCoords.push([q, r]);
          q += dq;
          r += dr;
        }
      }
      const remaining = count - axialCoords.length;
      if (remaining >= ringCoords.length) {
        axialCoords.push(...ringCoords);
        continue;
      }
      const selectedIndices = getMaxGapIndices(ringCoords.length, remaining);
      for (let i = 0; i < selectedIndices.length; i += 1) {
        axialCoords.push(ringCoords[selectedIndices[i]]);
      }
    }

    const positions = axialCoords
      .slice(0, count)
      .map(
        ([q, r]) =>
          new deps.THREE.Vector3(
            minCenterDistance * (q + r * 0.5),
            minCenterDistance * (Math.sqrt(3) * 0.5 * r),
            0
          )
      );
    return positions;
  }

  function buildHexSpiralCategoryLayout(protonCount, neutronCount, minCenterDistance) {
    const total = protonCount + neutronCount;
    if (
      !Number.isFinite(total) ||
      total <= 0 ||
      !Number.isFinite(minCenterDistance) ||
      minCenterDistance <= 0
    ) {
      return [];
    }

    const packedPositions = buildHexPackedNucleonPositions(total, minCenterDistance);
    if (!packedPositions.length) {
      return [];
    }

    const desiredProtons = Math.max(0, Math.min(total, Math.floor(protonCount)));
    const desiredNeutrons = total - desiredProtons;

    if (desiredProtons <= 0) {
      return packedPositions.map((position) => ({ category: "neutron", position }));
    }
    if (desiredNeutrons <= 0) {
      return packedPositions.map((position) => ({ category: "proton", position }));
    }

    const axialEntries = packedPositions.map((pos, index) => {
      const r = pos.y / (minCenterDistance * (Math.sqrt(3) * 0.5));
      const q = pos.x / minCenterDistance - r * 0.5;
      const qRounded = Math.round(q);
      const rRounded = Math.round(r);
      const sRounded = -qRounded - rRounded;
      const ring = Math.max(Math.abs(qRounded), Math.abs(rRounded), Math.abs(sRounded));
      return { index, q: qRounded, r: rRounded, ring };
    });

    const keyFor = (q, r) => `${q},${r}`;
    const entryByKey = new Map(axialEntries.map((entry) => [keyFor(entry.q, entry.r), entry]));
    const axialDirs = [
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
    ];
    const neighborMovesByIndex = new Map();
    axialEntries.forEach((entry) => {
      const moves = [];
      axialDirs.forEach(([dq, dr], dir) => {
        const next = entryByKey.get(keyFor(entry.q + dq, entry.r + dr));
        if (next) {
          moves.push({ index: next.index, dir });
        }
      });
      neighborMovesByIndex.set(entry.index, moves);
    });

    const centerEntry =
      axialEntries.find((entry) => entry.ring === 0) ??
      axialEntries.slice().sort((a, b) => a.ring - b.ring || a.index - b.index)[0];
    if (!centerEntry) {
      return [];
    }

    const tau = Math.PI * 2;
    const idealStep = Math.PI / 3;
    const wrapAngle = (value) => {
      let out = value % tau;
      if (out < 0) {
        out += tau;
      }
      return out;
    };
    const ccwAngleDelta = (next, prev) => wrapAngle(next - prev);
    const shortestAngleDistance = (a, b) => {
      const d = Math.abs(wrapAngle(a - b));
      return Math.min(d, tau - d);
    };
    const turnErrorFromHeading = (nextDir, headingDir) => {
      const turn = (nextDir - headingDir + 6) % 6;
      const cw = (turn - 1 + 6) % 6;
      const ccw = (1 - turn + 6) % 6;
      return Math.min(cw, ccw);
    };

    const seedCandidates = (neighborMovesByIndex.get(centerEntry.index) ?? [])
      .map((move) => move.index)
      .sort((a, b) => {
        const pa = packedPositions[a];
        const pb = packedPositions[b];
        return wrapAngle(Math.atan2(pa.y, pa.x)) - wrapAngle(Math.atan2(pb.y, pb.x));
      });

    const continuityPenalty = (assignments, color) => {
      const nodes = [];
      assignments.forEach((category, index) => {
        if (category === color) {
          nodes.push(index);
        }
      });
      if (nodes.length <= 1) {
        return 0;
      }
      const nodeSet = new Set(nodes);
      const visited = new Set();
      let components = 0;
      let branchNodes = 0;
      let endNodes = 0;

      nodes.forEach((index) => {
        let degree = 0;
        (neighborMovesByIndex.get(index) ?? []).forEach((move) => {
          if (nodeSet.has(move.index)) {
            degree += 1;
          }
        });
        if (degree > 2) {
          branchNodes += 1;
        }
        if (degree === 1) {
          endNodes += 1;
        }
      });

      nodes.forEach((start) => {
        if (visited.has(start)) {
          return;
        }
        components += 1;
        const stack = [start];
        visited.add(start);
        while (stack.length) {
          const current = stack.pop();
          (neighborMovesByIndex.get(current) ?? []).forEach((move) => {
            const next = move.index;
            if (!nodeSet.has(next) || visited.has(next)) {
              return;
            }
            visited.add(next);
            stack.push(next);
          });
        }
      });

      return (components - 1) * 50 + branchNodes * 10 + Math.abs(endNodes - 2) * 2;
    };

    const simulateSeed = (seedIndex, initialHeadingP, initialHeadingN) => {
      const assignments = new Array(total).fill(null);
      const used = new Set();
      const centerX = (packedPositions[centerEntry.index].x + packedPositions[seedIndex].x) * 0.5;
      const centerY = (packedPositions[centerEntry.index].y + packedPositions[seedIndex].y) * 0.5;

      const angleFromCenter = (index) => {
        const pos = packedPositions[index];
        return wrapAngle(Math.atan2(pos.y - centerY, pos.x - centerX));
      };
      const radiusFromCenter = (index) => {
        const pos = packedPositions[index];
        return Math.hypot(pos.x - centerX, pos.y - centerY) / minCenterDistance;
      };

      let remainingProtons = desiredProtons;
      let remainingNeutrons = desiredNeutrons;

      const laneP = {
        current: null,
        heading: initialHeadingP,
        angle: 0,
        radius: 0,
      };
      const laneN = {
        current: null,
        heading: initialHeadingN,
        angle: 0,
        radius: 0,
      };

      let rulePenalty = 0;

      const place = (index, category) => {
        if (index === null || index === undefined || used.has(index)) {
          return false;
        }
        if (category === "proton") {
          if (remainingProtons <= 0) {
            return false;
          }
          assignments[index] = "proton";
          remainingProtons -= 1;
          laneP.current = index;
          laneP.angle = angleFromCenter(index);
          laneP.radius = radiusFromCenter(index);
        } else {
          if (remainingNeutrons <= 0) {
            return false;
          }
          assignments[index] = "neutron";
          remainingNeutrons -= 1;
          laneN.current = index;
          laneN.angle = angleFromCenter(index);
          laneN.radius = radiusFromCenter(index);
        }
        used.add(index);
        return true;
      };

      // Fixed seed pair: first touching P-N pair.
      if (!place(centerEntry.index, "proton")) {
        return null;
      }
      if (!place(seedIndex, "neutron")) {
        return null;
      }

      const candidateMovesForLane = (lane) => {
        if (lane.current === null || lane.current === undefined) {
          return [];
        }
        const moves = (neighborMovesByIndex.get(lane.current) ?? []).filter(
          (move) => !used.has(move.index)
        );
        return moves
          .map((move) => {
            const nextAngle = angleFromCenter(move.index);
            const nextRadius = radiusFromCenter(move.index);
            const turnError = turnErrorFromHeading(move.dir, lane.heading);
            const stepDelta = ccwAngleDelta(nextAngle, lane.angle);
            const stepError = Math.abs(stepDelta - idealStep);
            const inwardPenalty = nextRadius + 0.06 < lane.radius ? lane.radius - nextRadius : 0;
            const score = turnError * 20 + stepError * 4.5 + inwardPenalty * 13;
            return {
              index: move.index,
              dir: move.dir,
              turnError,
              stepError,
              nextAngle,
              nextRadius,
              score,
            };
          })
          .sort((a, b) => {
            if (a.score !== b.score) {
              return a.score - b.score;
            }
            if (a.turnError !== b.turnError) {
              return a.turnError - b.turnError;
            }
            if (a.stepError !== b.stepError) {
              return a.stepError - b.stepError;
            }
            return a.index - b.index;
          });
      };

      const pickBestPair = () => {
        const pMoves = candidateMovesForLane(laneP);
        const nMoves = candidateMovesForLane(laneN);
        if (!pMoves.length || !nMoves.length) {
          return null;
        }
        let best = null;
        pMoves.forEach((pMove) => {
          nMoves.forEach((nMove) => {
            if (pMove.index === nMove.index) {
              return;
            }
            const oppositionError = Math.abs(
              Math.PI - shortestAngleDistance(pMove.nextAngle, nMove.nextAngle)
            );
            const radialMismatch = Math.abs(pMove.nextRadius - nMove.nextRadius);
            const pairScore =
              pMove.score + nMove.score + oppositionError * 3.4 + radialMismatch * 1.35;
            if (!best || pairScore < best.score) {
              best = {
                score: pairScore,
                pMove,
                nMove,
              };
            }
          });
        });
        return best;
      };

      let guard = 0;
      while (remainingProtons > 0 && remainingNeutrons > 0 && guard < total * 8) {
        const pair = pickBestPair();
        if (!pair) {
          break;
        }
        if (!place(pair.pMove.index, "proton")) {
          break;
        }
        if (!place(pair.nMove.index, "neutron")) {
          break;
        }
        laneP.heading = pair.pMove.dir;
        laneN.heading = pair.nMove.dir;
        rulePenalty += pair.pMove.turnError + pair.nMove.turnError;
        guard += 1;
      }

      const extendLane = (lane, category) => {
        let localGuard = 0;
        while (
          (category === "proton" ? remainingProtons : remainingNeutrons) > 0 &&
          used.size < total &&
          localGuard < total * 8
        ) {
          const moves = candidateMovesForLane(lane);
          if (!moves.length) {
            break;
          }
          const chosen = moves[0];
          if (!place(chosen.index, category)) {
            break;
          }
          lane.heading = chosen.dir;
          rulePenalty += chosen.turnError;
          localGuard += 1;
        }
      };

      if (remainingProtons > 0) {
        extendLane(laneP, "proton");
      }
      if (remainingNeutrons > 0) {
        extendLane(laneN, "neutron");
      }

      const missing = remainingProtons + remainingNeutrons;
      const placed = total - missing;
      const continuity =
        continuityPenalty(assignments, "proton") + continuityPenalty(assignments, "neutron");

      return {
        assignments,
        placed,
        missing,
        continuity,
        rulePenalty,
      };
    };

    let best = null;
    const chooseBest = (candidate) => {
      if (!candidate) {
        return false;
      }
      if (!best) {
        best = candidate;
        return true;
      }
      if (candidate.missing !== best.missing) {
        return candidate.missing < best.missing;
      }
      if (candidate.continuity !== best.continuity) {
        return candidate.continuity < best.continuity;
      }
      if (candidate.rulePenalty !== best.rulePenalty) {
        return candidate.rulePenalty < best.rulePenalty;
      }
      return candidate.placed > best.placed;
    };

    seedCandidates.forEach((seedIndex) => {
      for (let headingP = 0; headingP < 6; headingP += 1) {
        for (let headingN = 0; headingN < 6; headingN += 1) {
          const candidate = simulateSeed(seedIndex, headingP, headingN);
          if (chooseBest(candidate)) {
            best = candidate;
          }
        }
      }
    });

    if (!best) {
      return packedPositions.map((position, index) => ({
        category: index < desiredProtons ? "proton" : "neutron",
        position,
      }));
    }

    // Emergency fallback only for impossible traces: fill remaining cells deterministically by ring.
    if (best.missing > 0) {
      const used = new Set();
      let pPlaced = 0;
      best.assignments.forEach((category, index) => {
        if (!category) {
          return;
        }
        used.add(index);
        if (category === "proton") {
          pPlaced += 1;
        }
      });
      let pRemaining = Math.max(0, desiredProtons - pPlaced);
      axialEntries
        .slice()
        .sort((a, b) => a.ring - b.ring || a.index - b.index)
        .forEach((entry) => {
          if (used.has(entry.index)) {
            return;
          }
          if (pRemaining > 0) {
            best.assignments[entry.index] = "proton";
            pRemaining -= 1;
          } else {
            best.assignments[entry.index] = "neutron";
          }
        });
    }

  return packedPositions.map((position, index) => ({
      category: best.assignments[index] === "proton" ? "proton" : "neutron",
      position,
    }));
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
        const nucleonScale = getLowCountNucleonScale(nucleons.length);
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
