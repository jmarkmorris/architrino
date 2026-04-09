function roundNumber(value) {
  return Number(Number(value ?? 0).toFixed(3));
}

function clonePoint(point) {
  if (Array.isArray(point)) {
    return [roundNumber(point[0]), roundNumber(point[1]), roundNumber(point[2])];
  }
  return [roundNumber(point?.x), roundNumber(point?.y), roundNumber(point?.z)];
}

function normalizeString(value, fallback) {
  const trimmed = typeof value === "string" ? value.trim() : "";
  return trimmed || fallback;
}

function normalizePathPoints(points) {
  const source = Array.isArray(points) ? points : [];
  return source.map((point) => clonePoint(point));
}

function getAssemblyLetter(index = 0) {
  let value = Math.max(0, Number(index) || 0);
  let label = "";
  do {
    label = String.fromCharCode(65 + (value % 26)) + label;
    value = Math.floor(value / 26) - 1;
  } while (value >= 0);
  return label;
}

function normalizePdgviewPaths(rawPaths, rawAssemblies) {
  if (Array.isArray(rawPaths) && rawPaths.length) {
    return rawPaths
      .map((rawPath, index) => {
        const points = normalizePathPoints(rawPath?.payload?.points ?? rawPath?.points);
        if (!points.length) {
          return null;
        }
        const ownerAssemblyId = rawPath?.metadata?.ownerAssemblyId
          ? sanitizeAssemblyId(rawPath.metadata.ownerAssemblyId, "")
          : rawPath?.ownerAssemblyId
            ? sanitizeAssemblyId(rawPath.ownerAssemblyId, "")
            : "";
        const ownerIndex = Array.isArray(rawAssemblies)
          ? rawAssemblies.findIndex((assembly) => {
              const assemblyId = sanitizeAssemblyId(
                assembly?.id ?? assembly?.name,
                `assembly_${index + 1}`
              );
              return assemblyId === ownerAssemblyId;
            })
          : -1;
        return {
          id: normalizeString(rawPath?.id, `path_${ownerAssemblyId || index + 1}`),
          kind: rawPath?.kind ?? "points",
          frame: { space: "relative", ...(rawPath?.frame ?? {}) },
          style: rawPath?.style ?? { color: "palette:accent-1" },
          metadata: {
            ...(rawPath?.metadata ?? {}),
            ownerAssemblyId: ownerAssemblyId || undefined,
            labelPrefix: getAssemblyLetter(ownerIndex >= 0 ? ownerIndex : index),
          },
          payload: {
            points,
            interpolate: rawPath?.payload?.interpolate ?? rawPath?.interpolate ?? "spline",
            closed: !!(rawPath?.payload?.closed ?? rawPath?.closed),
          },
        };
      })
      .filter(Boolean);
  }

  const legacyPoints = normalizePathPoints(rawPaths ?? []);
  if (!legacyPoints.length) {
    return [];
  }
  const primaryAssemblyId = sanitizeAssemblyId(rawAssemblies?.[0]?.id ?? "assembly_1", "assembly_1");
  return [
    {
      id: "path_main",
      kind: "points",
      frame: { space: "relative" },
      style: { color: "palette:accent-1" },
      metadata: {
        ownerAssemblyId: primaryAssemblyId,
        labelPrefix: "A",
      },
      payload: {
        points: legacyPoints,
        interpolate: "spline",
        closed: false,
      },
    },
  ];
}

function normalizeCameraWaypoints(waypoints) {
  const source = Array.isArray(waypoints) ? waypoints : [];
  return source.map((waypoint, index) => ({
    t: index,
    position: clonePoint(waypoint?.position),
    lookAt: clonePoint(waypoint?.lookAt),
  }));
}

function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function sanitizeAssemblyId(raw, fallback) {
  const normalized = normalizeString(raw, fallback)
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_-]/g, "");
  return normalized || fallback;
}

function normalizeMemberPosition(rawPosition) {
  if (!Array.isArray(rawPosition) || rawPosition.length < 3) {
    return null;
  }
  const x = Number(rawPosition[0]);
  const y = Number(rawPosition[1]);
  const z = Number(rawPosition[2]);
  if (![x, y, z].every(Number.isFinite)) {
    return null;
  }
  return [roundNumber(x), roundNumber(y), roundNumber(z)];
}

function normalizeMembers(rawMembers) {
  if (Array.isArray(rawMembers)) {
    return rawMembers
      .map((member, index) => {
        if (member && typeof member === "object" && !Array.isArray(member)) {
          const id = sanitizeAssemblyId(member.id ?? member.name, `member_${index + 1}`);
          const position = normalizeMemberPosition(member.position);
          const nextMember = { id };
          if (position) {
            nextMember.position = position;
          }
          if (member.state != null) {
            const state = normalizeString(member.state, "");
            if (state === "unset" || state === "electrino" || state === "positrino") {
              nextMember.state = state;
            }
          }
          if (member.slotKind != null) {
            const slotKind = normalizeString(member.slotKind, "");
            if (slotKind) {
              nextMember.slotKind = slotKind;
            }
          }
          if (member.slotIndex != null && Number.isFinite(Number(member.slotIndex))) {
            nextMember.slotIndex = Math.max(0, Math.round(Number(member.slotIndex)));
          }
          return nextMember;
        }
        return { id: sanitizeAssemblyId(member, `member_${index + 1}`) };
      })
      .filter(Boolean);
  }
  return [];
}

function normalizeAssemblyChildren(rawChildren, members = []) {
  if (!Array.isArray(rawChildren) || !rawChildren.length) {
    return [];
  }
  const memberIds = new Set(
    (Array.isArray(members) ? members : []).map((member, index) =>
      typeof member === "object" && member !== null ? member.id : sanitizeAssemblyId(member, `member_${index + 1}`)
    )
  );
  return rawChildren
    .map((child, index) => {
      const id = sanitizeAssemblyId(child?.id ?? child?.name, `subassembly_${index + 1}`);
      const position = clonePoint(child?.position ?? child?.transform?.position ?? [0, 0, 0]);
      const childMembers = Array.isArray(child?.members)
        ? child.members
            .map((memberId, memberIndex) =>
              typeof memberId === "object" && memberId !== null
                ? sanitizeAssemblyId(memberId.id, `member_${memberIndex + 1}`)
                : sanitizeAssemblyId(memberId, `member_${memberIndex + 1}`)
            )
            .filter((memberId) => memberIds.has(memberId))
        : [];
      if (!childMembers.length) {
        return null;
      }
      return {
        id,
        transform: {
          position,
        },
        members: [...new Set(childMembers)],
      };
    })
    .filter(Boolean);
}

function normalizeTransferEndpoint(rawEndpoint) {
  if (!rawEndpoint) {
    return null;
  }
  if (typeof rawEndpoint === "string") {
    const match = rawEndpoint.match(/^([a-zA-Z0-9_-]+)[.:/]([a-zA-Z0-9_-]+)$/);
    if (!match) {
      return null;
    }
    return {
      assemblyId: sanitizeAssemblyId(match[1], "assembly_1"),
      memberId: sanitizeAssemblyId(match[2], "member_1"),
    };
  }
  const assemblyId = sanitizeAssemblyId(rawEndpoint.assemblyId, "assembly_1");
  const memberId = sanitizeAssemblyId(rawEndpoint.memberId, "member_1");
  return { assemblyId, memberId };
}

function normalizeTransfers(rawTransfers) {
  if (!Array.isArray(rawTransfers) || !rawTransfers.length) {
    return [];
  }
  return rawTransfers
    .map((transfer, index) => {
      const source = normalizeTransferEndpoint(transfer?.source);
      const target = normalizeTransferEndpoint(transfer?.target);
      if (!source || !target) {
        return null;
      }
      const t = transfer?.t == null ? null : roundNumber(transfer.t);
      return {
        id: normalizeString(transfer?.id, `transfer_${index + 1}`),
        source,
        target,
        t,
      };
    })
    .filter(Boolean);
}

function normalizeReactionParticipants(rawParticipants) {
  if (!Array.isArray(rawParticipants) || !rawParticipants.length) {
    return [];
  }
  return rawParticipants
    .map((participant) => {
      const assembly = sanitizeAssemblyId(
        participant?.assembly ?? participant?.assemblyId,
        ""
      );
      if (!assembly) {
        return null;
      }
      return {
        assembly,
        role: normalizeString(participant?.role, "reactant"),
      };
    })
    .filter(Boolean);
}

function normalizeReactionStages(rawStages, start, end, reactionTransferIds = [], transferById = new Map()) {
  if (!Array.isArray(rawStages) || !rawStages.length) {
    return [];
  }
  const allowedTransferIds = new Set(
    (Array.isArray(reactionTransferIds) ? reactionTransferIds : []).filter((transferId) =>
      transferById.has(transferId)
    )
  );
  return rawStages
    .map((stage, index) => {
      const stageStart = clampNumber(
        roundNumber(stage?.start ?? stage?.t ?? start),
        start,
        end
      );
      const stageEnd = clampNumber(
        roundNumber(stage?.end ?? stage?.params?.end ?? end),
        stageStart,
        end
      );
      if (stageEnd <= stageStart) {
        return null;
      }
      const stageTransferIds = Array.isArray(stage?.transferIds)
        ? stage.transferIds
            .map((transferId) => normalizeString(transferId, ""))
            .filter((transferId) => allowedTransferIds.has(transferId))
        : [];
      const normalizedAction = normalizeString(stage?.action, "mapping");
      return {
        id: normalizeString(stage?.id, `stage_${index + 1}`),
        action: normalizedAction === "handoff" ? "mapping" : normalizedAction,
        start: stageStart,
        end: stageEnd,
        transferIds: stageTransferIds.length ? [...new Set(stageTransferIds)] : [...allowedTransferIds],
      };
    })
    .filter(Boolean)
    .sort((left, right) => left.start - right.start);
}

function normalizeReactions(rawReactions, transfers, start, end) {
  if (!Array.isArray(rawReactions) || !rawReactions.length) {
    return [];
  }
  const transferById = new Map(
    (Array.isArray(transfers) ? transfers : []).map((transfer) => [transfer.id, transfer])
  );
  return rawReactions
    .map((reaction, index) => {
      const minimumSpan = Math.min(pdgviewMinimumTimelineItemDurationSeconds, Math.max(0, end - start));
      let reactionStart = clampNumber(
        roundNumber(reaction?.start ?? reaction?.timing?.start ?? start),
        start,
        end
      );
      if (end - start >= minimumSpan) {
        reactionStart = clampNumber(reactionStart, start, end - minimumSpan);
      }
      let reactionEnd = clampNumber(roundNumber(reaction?.end ?? reaction?.timing?.end ?? end), reactionStart, end);
      if (end - reactionStart >= minimumSpan && reactionEnd - reactionStart < minimumSpan) {
        reactionEnd = clampNumber(reactionStart + minimumSpan, reactionStart, end);
      }
      if (reactionEnd <= reactionStart) {
        return null;
      }
      const transferIds = Array.isArray(reaction?.transferIds)
        ? reaction.transferIds
            .map((transferId) => normalizeString(transferId, ""))
            .filter((transferId) => transferById.has(transferId))
        : [];
      const normalizedStages = normalizeReactionStages(
        reaction?.stages,
        reactionStart,
        reactionEnd,
        transferIds,
        transferById
      );
      const stages = normalizedStages.length
        ? normalizedStages
        : [
            {
              id: "stage_1",
              action: "mapping",
              start: reactionStart,
              end: reactionEnd,
              transferIds,
            },
          ];
      const participantMap = new Map();
      transferIds.forEach((transferId) => {
        const transfer = transferById.get(transferId);
        if (!transfer) {
          return;
        }
        if (transfer.source?.assemblyId) {
          participantMap.set(transfer.source.assemblyId, {
            assembly: transfer.source.assemblyId,
            role: "reactant",
          });
        }
        if (transfer.target?.assemblyId) {
          participantMap.set(transfer.target.assemblyId, {
            assembly: transfer.target.assemblyId,
            role: transfer.target.assemblyId === transfer.source?.assemblyId ? "reactant" : "product",
          });
        }
      });
      const explicitParticipants = normalizeReactionParticipants(reaction?.participants);
      explicitParticipants.forEach((participant) => {
        participantMap.set(participant.assembly, participant);
      });
      return {
        id: normalizeString(reaction?.id, `reaction_${index + 1}`),
        label: normalizeString(reaction?.label, `Reaction ${index + 1}`),
        start: reactionStart,
        end: reactionEnd,
        transferIds,
        stages,
        timeline: stages.map((stage) => ({
          t: stage.start,
          action: stage.action,
          target: "transfer-set",
          params: {
            end: stage.end,
            transferIds: stage.transferIds,
          },
        })),
        participants: [...participantMap.values()],
      };
    })
    .filter(Boolean)
    .sort((left, right) => left.start - right.start);
}

function normalizeMarkers(rawMarkers, start, end) {
  if (!Array.isArray(rawMarkers) || !rawMarkers.length) {
    return createDefaultMarkers(rawMarkers, start, end);
  }
  return rawMarkers
    .map((marker, index) => {
      const t = clampNumber(roundNumber(marker?.t ?? start), start, end);
      const kind = normalizeString(marker?.kind, "graphic");
      const minimumSpan = Math.min(2, Math.max(0, end - t));
      let markerEnd = clampNumber(roundNumber(marker?.end ?? (t + minimumSpan)), t, end);
      if (minimumSpan > 0 && markerEnd < t + minimumSpan) {
        markerEnd = clampNumber(roundNumber(t + minimumSpan), t, end);
      }
      return {
        id: normalizeString(marker?.id, `marker_${index + 1}`),
        t,
        end: markerEnd,
        kind,
        label: normalizeString(marker?.label, `Marker ${index + 1}`),
      };
    })
    .sort((left, right) => left.t - right.t);
}

const pdgviewMinimumTimelineItemDurationSeconds = 2;

function normalizeOverlayTarget(rawTarget) {
  if (!rawTarget || typeof rawTarget !== "object") {
    return null;
  }
  const type = normalizeString(rawTarget.type, "");
  if (type === "assembly") {
    const assemblyId = sanitizeAssemblyId(rawTarget.assemblyId, "");
    return assemblyId ? { type, assemblyId } : null;
  }
  if (type === "path_point") {
    const assemblyId = sanitizeAssemblyId(rawTarget.assemblyId, "");
    const pointIndex = Math.max(0, Math.round(Number(rawTarget.pointIndex ?? 0) || 0));
    return assemblyId ? { type, assemblyId, pointIndex } : null;
  }
  return null;
}

function normalizeOverlayOffset(rawOffset) {
  return clonePoint(rawOffset ?? [0.6, 0.44, 0]);
}

function normalizeOverlayRect(rawRect, kind = "image") {
  const fallback =
    kind === "video"
      ? { x: 0.62, y: 0.14, width: 0.26, height: 0.146 }
      : { x: 0.6, y: 0.16, width: 0.24, height: 0.24 };
  const width = clampNumber(roundNumber(rawRect?.width ?? fallback.width), 0.08, 0.86);
  const height = clampNumber(roundNumber(rawRect?.height ?? fallback.height), 0.08, 0.86);
  const x = clampNumber(roundNumber(rawRect?.x ?? fallback.x), 0, Math.max(0, 1 - width));
  const y = clampNumber(roundNumber(rawRect?.y ?? fallback.y), 0, Math.max(0, 1 - height));
  return { x, y, width, height };
}

function normalizeOverlays(rawOverlays, start, end) {
  if (!Array.isArray(rawOverlays) || !rawOverlays.length) {
    return [];
  }
  return rawOverlays
    .map((overlay, index) => {
      const minimumSpan = Math.min(pdgviewMinimumTimelineItemDurationSeconds, Math.max(0, end - start));
      let overlayStart = clampNumber(roundNumber(overlay?.start ?? start), start, end);
      if (end - start >= minimumSpan) {
        overlayStart = clampNumber(overlayStart, start, end - minimumSpan);
      }
      let overlayEnd = clampNumber(
        roundNumber(overlay?.end ?? (overlayStart + minimumSpan)),
        overlayStart,
        end
      );
      if (end - overlayStart >= minimumSpan && overlayEnd - overlayStart < minimumSpan) {
        overlayEnd = clampNumber(overlayStart + minimumSpan, overlayStart, end);
      }
      const kind = normalizeString(overlay?.kind, "graphic");
      const size = clampNumber(roundNumber(overlay?.size ?? overlay?.radius ?? 0.42), 0.18, 2.4);
      return {
        id: normalizeString(overlay?.id, `overlay_${index + 1}`),
        kind,
        type: normalizeString(
          overlay?.type,
          kind === "graphic" ? "text_sphere_callout" : `viewport_${kind}`
        ),
        label: normalizeString(
          overlay?.label ?? overlay?.text ?? overlay?.source,
          kind === "video" ? `Video ${index + 1}` : kind === "image" ? `Image ${index + 1}` : `Graphic ${index + 1}`
        ),
        text: kind === "graphic"
          ? normalizeString(overlay?.text ?? overlay?.label, `Graphic ${index + 1}`)
          : "",
        start: overlayStart,
        end: overlayEnd,
        size,
        source: normalizeString(overlay?.source, ""),
        rect: normalizeOverlayRect(overlay?.rect, kind),
        fit: normalizeString(overlay?.fit, "contain"),
        muted: overlay?.muted !== false,
        offset: normalizeOverlayOffset(overlay?.offset),
        target: kind === "graphic" ? normalizeOverlayTarget(overlay?.target) : null,
        style: typeof overlay?.style === "object" && overlay.style ? overlay.style : {},
      };
    })
    .filter((overlay) => overlay.end > overlay.start)
    .sort((left, right) => left.start - right.start);
}

function normalizePauses(rawPauses, start, end) {
  if (!Array.isArray(rawPauses) || !rawPauses.length) {
    return [];
  }
  return rawPauses
    .map((pause, index) => {
      const pauseStart = clampNumber(roundNumber(pause?.start ?? start), start, end);
      const maxDuration = Math.max(0, end - pauseStart);
      const minimumDuration = Math.min(pdgviewMinimumTimelineItemDurationSeconds, maxDuration);
      let duration = clampNumber(roundNumber(pause?.duration ?? minimumDuration), 0, maxDuration);
      if (maxDuration >= minimumDuration && duration < minimumDuration) {
        duration = minimumDuration;
      }
      return {
        id: normalizeString(pause?.id, `pause_${index + 1}`),
        start: pauseStart,
        duration,
      };
    })
    .filter((pause) => pause.duration > 0)
    .sort((left, right) => left.start - right.start);
}

function normalizeTimeWarps(rawTimeWarps, start, end) {
  if (!Array.isArray(rawTimeWarps) || !rawTimeWarps.length) {
    return [];
  }
  return rawTimeWarps
    .map((warp, index) => {
      const minimumSpan = Math.min(pdgviewMinimumTimelineItemDurationSeconds, Math.max(0, end - start));
      let warpStart = clampNumber(roundNumber(warp?.start ?? start), start, end);
      if (end - start >= minimumSpan) {
        warpStart = clampNumber(warpStart, start, end - minimumSpan);
      }
      let warpEnd = clampNumber(roundNumber(warp?.end ?? (warpStart + minimumSpan)), warpStart, end);
      if (end - warpStart >= minimumSpan && warpEnd - warpStart < minimumSpan) {
        warpEnd = clampNumber(warpStart + minimumSpan, warpStart, end);
      }
      return {
        id: normalizeString(warp?.id, `warp_${index + 1}`),
        start: warpStart,
        end: warpEnd,
        rate: Math.max(0.01, roundNumber(warp?.rate ?? 1)),
      };
    })
    .filter((warp) => warp.end > warp.start)
    .sort((left, right) => left.start - right.start);
}

function createDefaultAssemblyCore(assemblyId) {
  const shellUnit = 0.45;
  return {
    coreType: "noether",
    shells: [
      {
        id: `${assemblyId}_shell_1`,
        radius: shellUnit,
        role: "inner",
        color: "#a9d8ff",
        opacity: 0.12,
      },
      {
        id: `${assemblyId}_shell_2`,
        radius: shellUnit * 2,
        role: "middle",
        color: "#7fb9ff",
        opacity: 0.1,
      },
      {
        id: `${assemblyId}_shell_3`,
        radius: shellUnit * 3,
        role: "outer",
        color: "#5b99ea",
        opacity: 0.08,
      },
      {
        id: `${assemblyId}_shell_4`,
        radius: shellUnit * 4,
        role: "decorator",
        color: "#365f9f",
        opacity: 0.05,
      },
    ],
    binaries: [
      {
        id: `${assemblyId}_binary_1`,
        motion: {
          type: "orbit.circular",
          center: assemblyId,
          radius: shellUnit,
          frequencyHz: 0.42,
          planeNormal: [0, 1, 0],
        },
      },
      {
        id: `${assemblyId}_binary_2`,
        motion: {
          type: "orbit.circular",
          center: assemblyId,
          radius: shellUnit * 2,
          frequencyHz: 0.26,
          planeNormal: [1, 0, 0],
        },
      },
      {
        id: `${assemblyId}_binary_3`,
        motion: {
          type: "orbit.circular",
          center: assemblyId,
          radius: shellUnit * 3,
          frequencyHz: 0.16,
          planeNormal: [0, 0, 1],
        },
      },
    ],
    alignment: {
      regime: "3d",
      planeNormals: [
        [0, 1, 0],
        [1, 0, 0],
        [0, 0, 1],
      ],
    },
  };
}

function createDefaultMarkers(rawMarkers, start, end) {
  if (Array.isArray(rawMarkers) && rawMarkers.length) {
    return rawMarkers;
  }
  return [];
}

function normalizeAssemblies(rawAssemblies, ownerPathIds = new Map(), primaryPathId = null) {
  const source = Array.isArray(rawAssemblies) && rawAssemblies.length
    ? rawAssemblies
    : [];

  return source.map((rawAssembly, index) => {
    const fallbackId = `assembly_${index + 1}`;
    const id = sanitizeAssemblyId(rawAssembly?.id ?? rawAssembly?.name, fallbackId);
    const label = normalizeString(
      rawAssembly?.name ?? rawAssembly?.label ?? rawAssembly?.metadata?.label,
      index === 0 ? "Primary Assembly" : `Assembly ${index + 1}`
    );
    const assembly = {
      id,
      role: rawAssembly?.role ?? "assembly",
      sceneRole: rawAssembly?.sceneRole ?? rawAssembly?.metadata?.sceneRole ?? "assembly",
      parentId: rawAssembly?.parentId ? sanitizeAssemblyId(rawAssembly.parentId, "") : undefined,
      transform: {
        ...(rawAssembly?.transform ?? {}),
        position: clonePoint(rawAssembly?.position ?? rawAssembly?.transform?.position ?? [0, 0, 0]),
      },
      metadata: {
        label,
        order: index,
        sceneRole: rawAssembly?.sceneRole ?? rawAssembly?.metadata?.sceneRole ?? "assembly",
        ...(rawAssembly?.metadata ?? {}),
      },
      members: normalizeMembers(rawAssembly?.members ?? rawAssembly?.metadata?.members),
    };
    const children = normalizeAssemblyChildren(
      rawAssembly?.children ?? rawAssembly?.subassemblies,
      assembly.members
    );
    if (children.length) {
      assembly.children = children;
    }
    if (Array.isArray(rawAssembly?.motion) && rawAssembly.motion.length) {
      assembly.motion = rawAssembly.motion;
    } else {
      const ownedPathId = ownerPathIds.get(id) ?? (index === 0 ? primaryPathId : null);
      if (ownedPathId) {
        assembly.motion = [{ type: "path.transport", pathId: ownedPathId }];
      }
    }
    if (rawAssembly?.core) {
      assembly.core = rawAssembly.core;
    } else if (index === 0) {
      assembly.core = createDefaultAssemblyCore(id);
    }
    return assembly;
  });
}

export function normalizePdgviewSceneDocument(rawDocument = {}) {
  const rawScene = rawDocument.scene ?? {};
  const rawControls = rawScene.controls ?? {};
  const normalizedPaths = normalizePdgviewPaths(
    rawDocument.paths?.length
      ? rawDocument.paths
      : rawDocument.pathPoints ?? rawDocument.path?.points,
    rawDocument.assemblies
  );
  const cameraWaypoints = normalizeCameraWaypoints(
    rawDocument.cameraWaypoints ?? rawDocument.cameraPath?.waypoints
  );
  const primaryPathId = normalizedPaths[0]?.id ?? null;
  const ownerPathIds = new Map(
    normalizedPaths
      .map((path) => [path?.metadata?.ownerAssemblyId, path?.id])
      .filter(([ownerAssemblyId, pathId]) => ownerAssemblyId && pathId)
  );
  const primaryCameraPathId = cameraWaypoints.length ? "camera_main" : null;
  const rawTime = rawScene.time ?? {};
  const sceneStart = Number(rawTime.start ?? 0);
  const sceneEnd = Number(rawTime.end ?? 24);
  const normalizedSceneEnd = sceneEnd > sceneStart ? sceneEnd : sceneStart + 24;
  const assemblies = normalizeAssemblies(rawDocument.assemblies, ownerPathIds, primaryPathId);
  const transfers = normalizeTransfers(rawDocument.transfers);

  return {
    schemaVersion: rawDocument.schemaVersion ?? "0.1.0",
    scene: {
      id: normalizeString(rawScene.id, "pdgview_scene"),
      type: rawScene.type ?? "Scene-Composed-Animation",
      kind: rawScene.kind ?? "composed_animation",
      name: normalizeString(rawScene.name, "pdgview scene"),
      mode: rawScene.mode ?? "3d",
      time: {
        timeBase: "seconds",
        start: sceneStart,
        end: normalizedSceneEnd,
        playbackRate: 1,
        loop: false,
        ...rawTime,
      },
      view: {
        activeCameraPath: primaryCameraPathId ?? undefined,
        ...(rawScene.view ?? {}),
      },
      controls: {
        ...rawControls,
        playback: {
          allowPlayPause: true,
          allowScrub: true,
          allowLoop: true,
          showTimeline: true,
          ...(rawControls.playback ?? {}),
        },
      },
      pauses: normalizePauses(rawScene.pauses, sceneStart, normalizedSceneEnd),
      timeWarps: normalizeTimeWarps(rawScene.timeWarps, sceneStart, normalizedSceneEnd),
      markers: normalizeMarkers(rawScene.markers, sceneStart, normalizedSceneEnd),
      publication: rawScene.publication ?? { status: "draft" },
    },
    assets: Array.isArray(rawDocument.assets) ? rawDocument.assets : [],
    assemblies,
    assemblyInstances: Array.isArray(rawDocument.assemblyInstances)
      ? rawDocument.assemblyInstances
      : [],
    paths: normalizedPaths,
    historyTraces: Array.isArray(rawDocument.historyTraces) ? rawDocument.historyTraces : [],
    envelopes: Array.isArray(rawDocument.envelopes) ? rawDocument.envelopes : [],
    cameraPaths: primaryCameraPathId
      ? [
          {
            id: primaryCameraPathId,
            mode: "waypoints",
            frame: { space: "relative" },
            waypoints: cameraWaypoints,
          },
        ]
      : [],
    cameraShots: normalizePdgviewCameraShots(
      rawDocument.cameraShots,
      primaryCameraPathId,
      sceneStart,
      normalizedSceneEnd
    ),
    cameraTransitions: Array.isArray(rawDocument.cameraTransitions)
      ? rawDocument.cameraTransitions
      : [],
    tracks: Array.isArray(rawDocument.tracks) ? rawDocument.tracks : [],
    channels: Array.isArray(rawDocument.channels) ? rawDocument.channels : [],
    overlays: normalizeOverlays(rawDocument.overlays, sceneStart, normalizedSceneEnd),
    teachingPatterns: Array.isArray(rawDocument.teachingPatterns)
      ? rawDocument.teachingPatterns
      : [],
    reactions: normalizeReactions(rawDocument.reactions, transfers, sceneStart, normalizedSceneEnd),
    transfers,
    provenance: Array.isArray(rawDocument.provenance) ? rawDocument.provenance : [],
    checkpoints: Array.isArray(rawDocument.checkpoints) ? rawDocument.checkpoints : [],
    metadata: {
      source: "pdgview",
      ...(rawDocument.metadata ?? {}),
    },
  };
}

export function createPdgviewSceneDocument(input = {}, options = {}) {
  const assemblyDrafts = Array.isArray(input.assembliesDraft) ? input.assembliesDraft : [];
  const authoredPaths = assemblyDrafts
    .map((assembly, index) => {
      const assemblyId = sanitizeAssemblyId(assembly?.id ?? assembly?.name, `assembly_${index + 1}`);
      const points = normalizePathPoints(assembly?.pathPoints);
      if (!points.length) {
        return null;
      }
      return {
        id: `path_${assemblyId}`,
        ownerAssemblyId: assemblyId,
        metadata: {
          ownerAssemblyId: assemblyId,
          labelPrefix: getAssemblyLetter(index),
        },
        payload: {
          points,
          interpolate: assembly?.pathInterpolate === "polyline" ? "polyline" : "spline",
          closed: !!assembly?.pathClosed,
        },
      };
    })
    .filter(Boolean);
  const authoredHistoryTraces = assemblyDrafts
    .map((assembly, index) => {
      const assemblyId = sanitizeAssemblyId(assembly?.id ?? assembly?.name, `assembly_${index + 1}`);
      const pathId = `path_${assemblyId}`;
      if (!assembly?.historyTraceEnabled || !authoredPaths.some((path) => path.id === pathId)) {
        return null;
      }
      return {
        id: `history_${assemblyId}`,
        assemblyId,
        pathId,
        kind: "transport",
        style: {
          color: "#8bdcff",
          opacity: 0.42,
        },
        window: {
          mode: "full",
        },
        fade: {
          mode: "tail",
        },
      };
    })
    .filter(Boolean);
  const authoredEnvelopes = assemblyDrafts
    .map((assembly, index) => {
      const assemblyId = sanitizeAssemblyId(assembly?.id ?? assembly?.name, `assembly_${index + 1}`);
      if (!assembly?.envelopeEnabled) {
        return null;
      }
      const shellRadii = Array.isArray(assembly?.core?.shells)
        ? assembly.core.shells
            .map((shell) => Number(shell?.radius ?? 0))
            .filter((radius) => Number.isFinite(radius) && radius > 0)
        : [];
      const radius = shellRadii.length ? Math.max(...shellRadii) * 1.08 : 0.42;
      return {
        id: `envelope_${assemblyId}`,
        assemblyId,
        geometry: {
          kind: "sphere",
          radius: roundNumber(radius),
        },
        style: {
          color: "#9fd4ff",
          opacity: 0.06,
        },
      };
    })
    .filter(Boolean);
  const transferList = Array.isArray(input.transfers) ? input.transfers : [];
  const authoredProvenance = transferList
    .map((transfer, index) => {
      const sourceAssembly = sanitizeAssemblyId(transfer?.source?.assemblyId, "");
      const sourceMember = sanitizeAssemblyId(transfer?.source?.memberId, "");
      const targetAssembly = sanitizeAssemblyId(transfer?.target?.assemblyId, "");
      const targetMember = sanitizeAssemblyId(transfer?.target?.memberId, "");
      if (!sourceAssembly || !sourceMember || !targetAssembly || !targetMember) {
        return null;
      }
      const owningReaction = Array.isArray(input.reactions)
        ? input.reactions.find((reaction) => Array.isArray(reaction?.transferIds) && reaction.transferIds.includes(transfer?.id))
        : null;
      return {
        id: `provenance_${transfer?.id ?? index + 1}`,
        transferId: transfer?.id ?? `transfer_${index + 1}`,
        memberId: sourceMember,
        source: {
          assemblyId: sourceAssembly,
          memberId: sourceMember,
        },
        target: {
          assemblyId: targetAssembly,
          memberId: targetMember,
        },
        t: transfer?.t ?? null,
        reactionId: owningReaction?.id ?? null,
      };
    })
    .filter(Boolean);
  return normalizePdgviewSceneDocument({
    schemaVersion: "0.1.0",
    scene: {
      id: options.sceneId ?? input.id,
      name: options.sceneName ?? input.name,
      time: input.time,
      markers: input.markers,
      pauses: input.pauses,
      timeWarps: input.timeWarps,
    },
    assemblies: assemblyDrafts,
    paths: authoredPaths,
    historyTraces: authoredHistoryTraces,
    envelopes: authoredEnvelopes,
    cameraPath: {
      waypoints: input.cameraWaypoints,
    },
    cameraShots: input.cameraShots,
    overlays: input.overlays,
    reactions: input.reactions,
    transfers: input.transfers,
    provenance: authoredProvenance,
    metadata: input.metadata,
  });
}

function computePreviewAssemblyLocalPosition(assembly, index, count, pathById) {
  const position = Array.isArray(assembly?.transform?.position) ? assembly.transform.position : null;
  const hasExplicitPosition =
    Array.isArray(position) &&
    position.length >= 3 &&
    position.some((value) => Number(value ?? 0) !== 0);
  if (hasExplicitPosition) {
    return [roundNumber(position[0]), roundNumber(position[1]), roundNumber(position[2])];
  }
  const motions = Array.isArray(assembly?.motion) ? assembly.motion : [];
  const transportMotion = motions.find((motion) => motion?.type === "path.transport");
  const ownedPoints =
    transportMotion?.pathId && pathById instanceof Map
      ? pathById.get(transportMotion.pathId)?.payload?.points
      : null;
  if (Array.isArray(ownedPoints) && ownedPoints.length) {
    return clonePoint(ownedPoints[0]);
  }
  if (count <= 1) {
    return [0, 0, 0];
  }
  const angle = (index / count) * Math.PI * 2;
  const radius = 1.6 + count * 0.08;
  return [
    roundNumber(Math.cos(angle) * radius),
    0,
    roundNumber(Math.sin(angle) * radius),
  ];
}

function computePreviewAssemblyPosition(assembly, index, assemblies, pathById, cache, stack = new Set()) {
  const assemblyId = assembly?.id ?? `assembly_${index + 1}`;
  if (cache.has(assemblyId)) {
    return cache.get(assemblyId);
  }
  if (stack.has(assemblyId)) {
    const fallback = computePreviewAssemblyLocalPosition(assembly, index, assemblies.length, pathById);
    cache.set(assemblyId, fallback);
    return fallback;
  }
  stack.add(assemblyId);
  const local = computePreviewAssemblyLocalPosition(assembly, index, assemblies.length, pathById);
  const parentId = assembly?.parentId;
  if (!parentId) {
    cache.set(assemblyId, local);
    stack.delete(assemblyId);
    return local;
  }
  const parentIndex = assemblies.findIndex((candidate) => candidate?.id === parentId);
  if (parentIndex === -1) {
    cache.set(assemblyId, local);
    stack.delete(assemblyId);
    return local;
  }
  const parentPosition = computePreviewAssemblyPosition(
    assemblies[parentIndex],
      parentIndex,
      assemblies,
      pathById,
      cache,
      stack
    );
  const resolved = [
    roundNumber((parentPosition[0] ?? 0) + (local[0] ?? 0)),
    roundNumber((parentPosition[1] ?? 0) + (local[1] ?? 0)),
    roundNumber((parentPosition[2] ?? 0) + (local[2] ?? 0)),
  ];
  cache.set(assemblyId, resolved);
  stack.delete(assemblyId);
  return resolved;
}

export function buildPdgviewPreviewSceneData(document, options = {}) {
  const normalized = normalizePdgviewSceneDocument(document);
  const title = options.sceneTitle ?? normalized.scene.name;
  const sceneId = options.sceneId ?? normalized.scene.id;
  const palette = Array.isArray(options.palette) ? options.palette : [];
  const pathById = new Map((Array.isArray(normalized.paths) ? normalized.paths : []).map((path) => [path.id, path]));
  const previewPositionCache = new Map();
  const objects = normalized.assemblies.map((assembly, index) => {
    const memberCount = Array.isArray(assembly?.members) ? assembly.members.length : 0;
    return {
      id: assembly.id,
      title: normalizeString(assembly.metadata?.label, assembly.id),
      radius: roundNumber(index === 0 ? 1.1 : 0.72 + Math.min(memberCount, 8) * 0.05),
      color: palette[index % Math.max(1, palette.length)] ?? "#6ea8fe",
      position: computePreviewAssemblyPosition(
        assembly,
        index,
        normalized.assemblies,
        pathById,
        previewPositionCache
      ),
      wrapLabel: true,
    };
  });
  const links = normalized.transfers.map((transfer, index) => ({
    id: transfer.id ?? `transfer_link_${index + 1}`,
    from: transfer.source.assemblyId,
    to: transfer.target.assemblyId,
    kind: "transfer",
    label:
      transfer.source.memberId === transfer.target.memberId
        ? transfer.source.memberId
        : `${transfer.source.memberId} -> ${transfer.target.memberId}`,
  }));

  return {
    schemaVersion: "0.1",
    scene: {
      id: sceneId,
      title,
      type: "Scene-Diagram",
      units: "relative",
      wrapLabels: true,
      hideScaleLabels: true,
      layout: {
        type: "rings",
      },
      pdgview: {
        schemaVersion: "0.2.0",
        mode: "pdgview-bridge",
        document: normalized,
      },
    },
    objects,
    links,
  };
}
import { normalizePdgviewCameraShots } from "./PdgviewViewportFramingRuntime.js";
