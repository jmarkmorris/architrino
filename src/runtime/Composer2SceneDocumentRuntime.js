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

function normalizeMembers(rawMembers) {
  if (Array.isArray(rawMembers)) {
    return rawMembers
      .map((member, index) => normalizeString(member, `member_${index + 1}`))
      .filter(Boolean);
  }
  return [];
}

function normalizeMarkers(rawMarkers, start, end) {
  if (!Array.isArray(rawMarkers) || !rawMarkers.length) {
    return createDefaultMarkers(rawMarkers, start, end);
  }
  return rawMarkers
    .map((marker, index) => {
      const t = clampNumber(roundNumber(marker?.t ?? start), start, end);
      return {
        id: normalizeString(marker?.id, `marker_${index + 1}`),
        t,
        kind: normalizeString(marker?.kind, "cue"),
        label: normalizeString(marker?.label, `Marker ${index + 1}`),
      };
    })
    .sort((left, right) => left.t - right.t);
}

function normalizePauses(rawPauses, start, end) {
  if (!Array.isArray(rawPauses) || !rawPauses.length) {
    return [];
  }
  return rawPauses
    .map((pause, index) => {
      const pauseStart = clampNumber(roundNumber(pause?.start ?? start), start, end);
      const maxDuration = Math.max(0, end - pauseStart);
      const duration = clampNumber(roundNumber(pause?.duration ?? 0), 0, maxDuration);
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
      const warpStart = clampNumber(roundNumber(warp?.start ?? start), start, end);
      const warpEnd = clampNumber(roundNumber(warp?.end ?? end), warpStart, end);
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
  const midpoint = roundNumber(start + (end - start) * 0.5);
  return [
    { id: "marker_start", t: start, kind: "chapter", label: "Start" },
    { id: "marker_focus", t: midpoint, kind: "cue", label: "Focus" },
  ];
}

function createDefaultCameraShots(rawCameraShots, cameraPathId, start, end) {
  if (Array.isArray(rawCameraShots) && rawCameraShots.length) {
    return rawCameraShots;
  }
  if (!cameraPathId) {
    return [];
  }
  return [
    {
      id: "shot_main",
      timing: {
        start,
        fadeIn: 0,
        hold: Math.max(0, end - start),
        fadeOut: 0,
      },
      cameraPath: cameraPathId,
      kind: "follow",
      framing: "medium",
    },
  ];
}

function normalizeAssemblies(rawAssemblies, primaryPathId) {
  const source = Array.isArray(rawAssemblies) && rawAssemblies.length
    ? rawAssemblies
    : [{ id: "assembly_1", name: "Primary Assembly", members: [] }];

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
      transform: rawAssembly?.transform ?? { position: [0, 0, 0] },
      metadata: {
        label,
        order: index,
        ...(rawAssembly?.metadata ?? {}),
      },
      members: normalizeMembers(rawAssembly?.members ?? rawAssembly?.metadata?.members),
    };
    if (Array.isArray(rawAssembly?.motion) && rawAssembly.motion.length) {
      assembly.motion = rawAssembly.motion;
    } else if (index === 0 && primaryPathId) {
      assembly.motion = [{ type: "path.transport", pathId: primaryPathId }];
    }
    if (rawAssembly?.core) {
      assembly.core = rawAssembly.core;
    } else if (index === 0) {
      assembly.core = createDefaultAssemblyCore(id);
    }
    return assembly;
  });
}

export function normalizeComposerSceneDocument(rawDocument = {}) {
  const rawScene = rawDocument.scene ?? {};
  const rawControls = rawScene.controls ?? {};
  const pathPoints = normalizePathPoints(rawDocument.pathPoints ?? rawDocument.path?.points);
  const cameraWaypoints = normalizeCameraWaypoints(
    rawDocument.cameraWaypoints ?? rawDocument.cameraPath?.waypoints
  );
  const primaryPathId = pathPoints.length ? "path_main" : null;
  const primaryCameraPathId = cameraWaypoints.length ? "camera_main" : null;
  const rawTime = rawScene.time ?? {};
  const sceneStart = Number(rawTime.start ?? 0);
  const sceneEnd = Number(rawTime.end ?? 12);
  const normalizedSceneEnd = sceneEnd > sceneStart ? sceneEnd : sceneStart + 12;
  const assemblies = normalizeAssemblies(rawDocument.assemblies, primaryPathId);

  return {
    schemaVersion: rawDocument.schemaVersion ?? "0.1.0",
    scene: {
      id: normalizeString(rawScene.id, "composer_scene"),
      type: rawScene.type ?? "Scene-Composed-Animation",
      kind: rawScene.kind ?? "composed_animation",
      name: normalizeString(rawScene.name, "Composer Scene"),
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
    paths: primaryPathId
      ? [
          {
            id: primaryPathId,
            kind: "points",
            frame: { space: "relative" },
            style: rawDocument.path?.style ?? { color: "palette:accent-1" },
            payload: {
              points: pathPoints,
              interpolate: rawDocument.path?.interpolate ?? "spline",
              closed: !!rawDocument.path?.closed,
            },
          },
        ]
      : [],
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
    cameraShots: createDefaultCameraShots(
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
    overlays: Array.isArray(rawDocument.overlays) ? rawDocument.overlays : [],
    teachingPatterns: Array.isArray(rawDocument.teachingPatterns)
      ? rawDocument.teachingPatterns
      : [],
    reactions: Array.isArray(rawDocument.reactions) ? rawDocument.reactions : [],
    transfers: Array.isArray(rawDocument.transfers) ? rawDocument.transfers : [],
    provenance: Array.isArray(rawDocument.provenance) ? rawDocument.provenance : [],
    checkpoints: Array.isArray(rawDocument.checkpoints) ? rawDocument.checkpoints : [],
    metadata: {
      source: "composer-II",
      ...(rawDocument.metadata ?? {}),
    },
  };
}

export function createComposerSceneDocument(input = {}, options = {}) {
  return normalizeComposerSceneDocument({
    schemaVersion: "0.1.0",
    scene: {
      id: options.sceneId ?? input.id,
      name: options.sceneName ?? input.name,
      time: input.time,
      markers: input.markers,
      pauses: input.pauses,
      timeWarps: input.timeWarps,
    },
    assemblies: input.assembliesDraft,
    path: {
      points: input.pathPoints,
      interpolate: input.pathInterpolate,
      closed: input.pathClosed,
    },
    cameraPath: {
      waypoints: input.cameraWaypoints,
    },
  });
}

export function buildComposerPreviewSceneData(document, options = {}) {
  const normalized = normalizeComposerSceneDocument(document);
  const title = options.sceneTitle ?? normalized.scene.name;
  const sceneId = options.sceneId ?? normalized.scene.id;
  const palette = Array.isArray(options.palette) ? options.palette : [];
  const objects = normalized.assemblies.map((assembly, index) => ({
    id: assembly.id,
    title: normalizeString(assembly.metadata?.label, assembly.id),
    radius: 1.1,
    color: palette[index % Math.max(1, palette.length)] ?? "#6ea8fe",
    position: [0, 0, 0],
    wrapLabel: true,
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
      composer: {
        schemaVersion: "0.2.0",
        mode: "composer2-bridge",
        document: normalized,
      },
    },
    objects,
    links: [],
  };
}
