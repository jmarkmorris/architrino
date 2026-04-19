import {
  buildAnimatorPreviewSceneData,
  createAnimatorSceneDocument,
} from "../../runtime/Animator2SceneDocumentRuntime.js";
import { prepareAcceptedPdgeditDocument } from "../../runtime/PdgeditAcceptedDocumentRuntime.js";
import {
  sanitizeAnimatorEntityId,
  sanitizeAnimatorId,
} from "./AnimatorDraftScaffoldRuntime.js";

export const PDGVIEW_PDGEDIT_STAGING_SCHEMA = "animator-staging/v1";
export const PDGVIEW_PDGEDIT_PREVIEW_SCHEMA = "animator-preview/v1";
export const PDGVIEW_PDGEDIT_EXPORT_SCHEMA = "animator-export/v1";

const PDGEDIT_DOCUMENT_SCHEMA = "pdgedit/v1";
const DEFAULT_SCENE_DURATION_SECONDS = 24;
const PDGEDIT_GRID_X_SPACING = 0.72;
const PDGEDIT_GRID_Y_SPACING = 0.58;

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function roundNumber(value) {
  return Number(Number(value ?? 0).toFixed(3));
}

function normalizeInteger(value, fallback = 0) {
  const number = Number(value);
  return Number.isInteger(number) ? number : fallback;
}

function getPathDocumentId(sourcePath = "") {
  const filename = normalizeText(sourcePath).split(/[\\/]/g).pop() ?? "";
  return filename
    .replace(/\.v1\.json$/i, "")
    .replace(/\.json$/i, "")
    .trim();
}

function formatTitleToken(value = "") {
  return normalizeText(value)
    .replace(/^pdgsolve_/, "")
    .replace(/^pdgedit_/, "")
    .split(/[._-]+/g)
    .filter(Boolean)
    .map((token) => `${token.slice(0, 1).toUpperCase()}${token.slice(1)}`)
    .join(" ");
}

function getUniqueEntityId(rawId, fallbackId, usedIds) {
  const baseId = sanitizeAnimatorEntityId(rawId, fallbackId);
  let candidateId = baseId;
  let suffix = 2;
  while (usedIds.has(candidateId)) {
    candidateId = `${baseId}_${suffix}`;
    suffix += 1;
  }
  usedIds.add(candidateId);
  return candidateId;
}

function getPdgeditObjects(pdgeditDocument = {}) {
  const assemblies = Array.isArray(pdgeditDocument?.assemblies)
    ? pdgeditDocument.assemblies.map((object) => ({
        ...object,
        objectKind: "assembly",
      }))
    : [];
  const operators = Array.isArray(pdgeditDocument?.operators)
    ? pdgeditDocument.operators.map((object) => ({
        ...object,
        objectKind: "operator",
        role: "operator",
      }))
    : [];
  return [...assemblies, ...operators];
}

function getPdgeditGridBounds(objects = []) {
  const coordinates = objects.map((object) => ({
    x: normalizeInteger(object?.x, 0),
    y: normalizeInteger(object?.y, 0),
  }));
  if (!coordinates.length) {
    return {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
      centerX: 0,
      centerY: 0,
    };
  }
  const minX = Math.min(...coordinates.map((coordinate) => coordinate.x));
  const maxX = Math.max(...coordinates.map((coordinate) => coordinate.x));
  const minY = Math.min(...coordinates.map((coordinate) => coordinate.y));
  const maxY = Math.max(...coordinates.map((coordinate) => coordinate.y));
  return {
    minX,
    maxX,
    minY,
    maxY,
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
  };
}

function getAnimatorPositionForPdgeditGridObject(object = {}, bounds = {}) {
  const x = normalizeInteger(object?.x, 0);
  const y = normalizeInteger(object?.y, 0);
  return [
    roundNumber((x - Number(bounds.centerX ?? 0)) * PDGEDIT_GRID_X_SPACING),
    roundNumber((Number(bounds.centerY ?? 0) - y) * PDGEDIT_GRID_Y_SPACING),
    0,
  ];
}

function isRequiredObserverObject(object = {}) {
  return object.objectKind === "assembly" && (object.role === "reactant" || object.role === "product");
}

function buildAnimatorMembersFromPdgeditObject(object = {}) {
  if (object.objectKind === "operator") {
    return [
      {
        id: "positrino_port",
        state: "positrino",
        slotKind: object.type || "operator",
        slotIndex: 0,
      },
      {
        id: "electrino_port",
        state: "electrino",
        slotKind: object.type || "operator",
        slotIndex: 1,
      },
    ];
  }
  return (Array.isArray(object.tiles) ? object.tiles : []).map((tile, index) => ({
    id: `tile_${index + 1}`,
    state: "unset",
    slotKind: normalizeText(tile) || "tile",
    slotIndex: index,
  }));
}

function buildAnimatorAssemblyDraftsFromPdgeditDocument(pdgeditDocument = {}) {
  const usedIds = new Set();
  const objects = getPdgeditObjects(pdgeditDocument);
  const bounds = getPdgeditGridBounds(objects);
  const objectIdByPdgeditId = new Map();
  const objectKindByPdgeditId = new Map();
  const drafts = objects.map((object, index) => {
    const fallbackId = `${object.objectKind}_${index + 1}`;
    const id = getUniqueEntityId(object.id, fallbackId, usedIds);
    const requiredForObserver = isRequiredObserverObject(object);
    objectIdByPdgeditId.set(normalizeText(object.id), id);
    objectKindByPdgeditId.set(normalizeText(object.id), object.objectKind);
    return {
      id,
      name: normalizeText(object.title) || formatTitleToken(object.type) || id,
      role: object.role || object.objectKind,
      sceneRole: `pdgedit_${object.objectKind}`,
      position: getAnimatorPositionForPdgeditGridObject(object, bounds),
      members: buildAnimatorMembersFromPdgeditObject(object),
      metadata: {
        label: normalizeText(object.title) || id,
        source: {
          schema: PDGEDIT_DOCUMENT_SCHEMA,
          objectKind: object.objectKind,
          objectId: normalizeText(object.id),
          type: normalizeText(object.type),
          role: normalizeText(object.role || object.objectKind),
          grid: {
            x: normalizeInteger(object.x, 0),
            y: normalizeInteger(object.y, 0),
          },
        },
        viewport: {
          policy: requiredForObserver ? "required" : "optional",
          keepInView: requiredForObserver,
        },
      },
    };
  });

  return {
    drafts,
    objectIdByPdgeditId,
    objectKindByPdgeditId,
    bounds,
  };
}

function getTransferMemberId(objectKind = "") {
  return objectKind === "operator" ? "positrino_port" : "tile_1";
}

function buildAnimatorTransfersFromPdgeditDocument({
  pdgeditDocument = {},
  objectIdByPdgeditId = new Map(),
  objectKindByPdgeditId = new Map(),
  duration = DEFAULT_SCENE_DURATION_SECONDS,
} = {}) {
  const links = Array.isArray(pdgeditDocument?.links) ? pdgeditDocument.links : [];
  return links
    .map((link, index) => {
      const endpointA = normalizeText(link?.endpointA);
      const endpointB = normalizeText(link?.endpointB);
      const sourceAssemblyId = objectIdByPdgeditId.get(endpointA);
      const targetAssemblyId = objectIdByPdgeditId.get(endpointB);
      if (!sourceAssemblyId || !targetAssemblyId) {
        return null;
      }
      const transferId = sanitizeAnimatorEntityId(link?.id, `transfer_${index + 1}`);
      return {
        id: transferId,
        source: {
          assemblyId: sourceAssemblyId,
          memberId: getTransferMemberId(objectKindByPdgeditId.get(endpointA)),
        },
        target: {
          assemblyId: targetAssemblyId,
          memberId: getTransferMemberId(objectKindByPdgeditId.get(endpointB)),
        },
        t: roundNumber(((index + 1) / (links.length + 1)) * duration),
      };
    })
    .filter(Boolean);
}

function buildObserverFraming(assemblyDrafts = []) {
  const requiredAssemblyIds = assemblyDrafts
    .filter((draft) => draft?.metadata?.viewport?.keepInView === true)
    .map((draft) => draft.id);
  const optionalAssemblyIds = assemblyDrafts
    .filter((draft) => draft?.metadata?.viewport?.keepInView !== true)
    .map((draft) => draft.id);
  return {
    preset: "wide",
    autoscale: "keep_required",
    defaultAssemblyPolicy: "optional",
    requiredAssemblyIds,
    optionalAssemblyIds,
  };
}

function buildCameraWaypoints(bounds = {}) {
  const spanX = Math.max(1, Number(bounds.maxX ?? 0) - Number(bounds.minX ?? 0));
  const spanY = Math.max(1, Number(bounds.maxY ?? 0) - Number(bounds.minY ?? 0));
  const center = [0, 0, 0];
  const distance = roundNumber(Math.max(8, spanX * 0.92 + spanY * 0.74 + 4));
  return [
    {
      position: [center[0], roundNumber(center[1] + 0.6), distance],
      lookAt: center,
    },
    {
      position: [roundNumber(spanX * 0.18), roundNumber(center[1] + 1), roundNumber(distance * 0.92)],
      lookAt: center,
    },
  ];
}

function buildReactionStages(transfers = [], duration = DEFAULT_SCENE_DURATION_SECONDS) {
  const transferIds = transfers.map((transfer) => transfer.id);
  if (!transferIds.length) {
    return [];
  }
  return [
    {
      id: "stage_dissociate",
      action: "dissociate",
      start: 0,
      end: roundNumber(duration / 3),
      transferIds,
    },
    {
      id: "stage_transit",
      action: "mapping",
      start: roundNumber(duration / 3),
      end: roundNumber((duration / 3) * 2),
      transferIds,
    },
    {
      id: "stage_reassemble",
      action: "associate",
      start: roundNumber((duration / 3) * 2),
      end: duration,
      transferIds,
    },
  ];
}

function buildSourceMetadata(pdgeditDocument = {}, options = {}) {
  const sourcePath = normalizeText(options.sourcePath);
  const documentId = normalizeText(options.sourceDocumentId || options.documentId) ||
    getPathDocumentId(sourcePath) ||
    normalizeText(pdgeditDocument.documentId || pdgeditDocument.id) ||
    "pdgedit_document";
  const title = normalizeText(options.title || options.documentTitle) ||
    formatTitleToken(documentId) ||
    "pdgedit document";
  return {
    schema: PDGEDIT_DOCUMENT_SCHEMA,
    documentId,
    title,
    sourcePath,
    assemblyCount: Array.isArray(pdgeditDocument?.assemblies) ? pdgeditDocument.assemblies.length : 0,
    operatorCount: Array.isArray(pdgeditDocument?.operators) ? pdgeditDocument.operators.length : 0,
    linkCount: Array.isArray(pdgeditDocument?.links) ? pdgeditDocument.links.length : 0,
  };
}

function assertAcceptedPdgeditDocument(pdgeditDocument = {}) {
  if (normalizeText(pdgeditDocument?.schema) !== PDGEDIT_DOCUMENT_SCHEMA) {
    throw new Error(`animator pdgedit import requires ${PDGEDIT_DOCUMENT_SCHEMA}.`);
  }
}

export function buildAnimatorDraftStateFromPdgeditDocument(pdgeditDocument = {}, options = {}) {
  assertAcceptedPdgeditDocument(pdgeditDocument);
  const preparedPdgeditDocument = prepareAcceptedPdgeditDocument(pdgeditDocument);
  const source = buildSourceMetadata(preparedPdgeditDocument, options);
  const duration = Math.max(1, Number(options.duration ?? DEFAULT_SCENE_DURATION_SECONDS) || DEFAULT_SCENE_DURATION_SECONDS);
  const stagingId = sanitizeAnimatorId(options.stagingId || `animator_${source.documentId}`);
  const {
    drafts,
    objectIdByPdgeditId,
    objectKindByPdgeditId,
    bounds,
  } = buildAnimatorAssemblyDraftsFromPdgeditDocument(preparedPdgeditDocument);
  const transfers = buildAnimatorTransfersFromPdgeditDocument({
    pdgeditDocument: preparedPdgeditDocument,
    objectIdByPdgeditId,
    objectKindByPdgeditId,
    duration,
  });
  const observerFraming = buildObserverFraming(drafts);
  const reactionId = `${stagingId}_accepted_pdgedit`;
  const targetAssemblyId = observerFraming.requiredAssemblyIds[0] ?? drafts[0]?.id ?? "";

  return {
    id: stagingId,
    name: source.title,
    assembliesDraft: drafts,
    transfers,
    reactions: [
      {
        id: reactionId,
        label: source.title,
        start: 0,
        end: duration,
        transferIds: transfers.map((transfer) => transfer.id),
        stages: buildReactionStages(transfers, duration),
        participants: drafts.map((draft) => ({
          assembly: draft.id,
          role: draft.role || "assembly",
        })),
      },
    ],
    overlays: targetAssemblyId
      ? [
          {
            id: `${stagingId}_source_label`,
            kind: "graphic",
            label: source.title,
            text: source.title,
            start: 0,
            end: Math.min(6, duration),
            target: {
              type: "assembly",
              assemblyId: targetAssemblyId,
            },
            offset: [0.6, 0.84, 0],
            size: 0.36,
          },
        ]
      : [],
    cameraWaypoints: buildCameraWaypoints(bounds),
    cameraPoiMode: "origin",
    cameraShots: [
      {
        id: `${stagingId}_observer_overview`,
        kind: "overview",
        cameraPath: "camera_main",
        timing: {
          start: 0,
          fadeIn: 0,
          hold: duration,
          fadeOut: 0,
        },
        framing: observerFraming,
      },
    ],
    time: {
      timeBase: "seconds",
      start: 0,
      end: duration,
      playbackRate: 1,
      loop: false,
    },
    markers: [
      {
        id: "marker_import_start",
        t: 0,
        end: Math.min(3, duration),
        kind: "observer",
        label: "Accepted pdgedit import",
      },
      {
        id: "marker_observer_framing",
        t: roundNumber(duration / 2),
        end: Math.min(duration, roundNumber(duration / 2) + 3),
        kind: "observer",
        label: "Observer framing",
      },
    ],
    pauses: [],
    timeWarps: [],
    transferListRaw: "",
    pauseListRaw: "",
    warpListRaw: "",
    markerListRaw: "",
    metadata: {
      sourceContract: {
        upstreamSchema: PDGEDIT_DOCUMENT_SCHEMA,
        downstreamSchema: PDGVIEW_PDGEDIT_STAGING_SCHEMA,
        handoffMode: "accepted-pdgedit-import",
      },
      pdgedit: source,
    },
  };
}

export function createAnimatorPdgeditImportRuntime(options = {}) {
  const createSceneDocument = options.createSceneDocument ?? createAnimatorSceneDocument;
  const buildPreviewScene = options.buildPreviewSceneData ?? buildAnimatorPreviewSceneData;

  function buildAnimatorStagingContractFromPdgeditDocument(pdgeditDocument = {}, runtimeOptions = {}) {
    const draftState = buildAnimatorDraftStateFromPdgeditDocument(pdgeditDocument, runtimeOptions);
    const source = buildSourceMetadata(prepareAcceptedPdgeditDocument(pdgeditDocument), runtimeOptions);
    const sceneDocument = cloneJson(createSceneDocument(draftState, {
      sceneId: draftState.id,
      sceneName: draftState.name,
    }));
    const previewScene = buildPreviewScene(sceneDocument, {
      sceneId: draftState.id,
      sceneTitle: draftState.name,
      palette: runtimeOptions.palette,
    });
    return {
      schema: PDGVIEW_PDGEDIT_STAGING_SCHEMA,
      stagingId: draftState.id,
      source,
      observerFraming: cloneJson(draftState.cameraShots[0].framing),
      draftState: cloneJson(draftState),
      preview: {
        schema: PDGVIEW_PDGEDIT_PREVIEW_SCHEMA,
        sceneId: previewScene.scene.id,
        title: previewScene.scene.title,
        objectCount: Array.isArray(previewScene.objects) ? previewScene.objects.length : 0,
        linkCount: Array.isArray(previewScene.links) ? previewScene.links.length : 0,
        objectIds: Array.isArray(previewScene.objects)
          ? previewScene.objects.map((object) => object.id)
          : [],
        linkIds: Array.isArray(previewScene.links)
          ? previewScene.links.map((link) => link.id)
          : [],
      },
      export: {
        schema: PDGVIEW_PDGEDIT_EXPORT_SCHEMA,
        defaultFileName: `${draftState.id}.animator-scene.v1.json`,
        sceneDocument,
      },
    };
  }

  return {
    buildAnimatorDraftStateFromPdgeditDocument,
    buildAnimatorStagingContractFromPdgeditDocument,
  };
}

export function buildAnimatorStagingContractFromPdgeditDocument(pdgeditDocument = {}, options = {}) {
  return createAnimatorPdgeditImportRuntime(options)
    .buildAnimatorStagingContractFromPdgeditDocument(pdgeditDocument, options);
}
