import {
  ASSEMBLY_VIEW_RECORD_SCHEMA,
  createEomHistoryDataset,
} from "../shared/EomHistoryDataset.mjs";

export const BORG_ASSEMBLY_VIEW_SESSION_SCHEMA = "borg-assembly-view-session.v1";
export const BORG_ASSEMBLY_VIEW_MODE = "assembly-view-replay";
export const BORG_SIMULATION_WORKSPACE_MODE = "simulation-workspace";

export const BORG_ASSEMBLY_VIEW_CONTRACT_BLOCKERS = Object.freeze({
  collectionCarrier:
    "assembly-view-record.v0 has no ratified multi-record carrier; direct records may be held in memory, but packet, manifest, and local-file collection intake remain unavailable.",
  comparisonTransforms:
    "assembly-view-record.v0 has no ratified declared time-transform and unit-transform fields, so synchronized comparison must not advance.",
  fieldSpeed:
    "assembly-view-record.v0 has no required source-carried field-speed value, so speed relative to c_f is unavailable unless the schema authority adds that carrier.",
  spinDipole:
    "assembly-view-record.v0 has no ratified spin-vector or polarity-dipole-vector fields, so those glyphs remain unavailable.",
  navigationMetadata:
    "assembly-view-record.v0 does not ratify collection filter rows or a permutation-canonical key field; optional source-carried values may be displayed but cannot be required from v0 records.",
});

const FILTER_FIELDS = Object.freeze([
  "claimGrade",
  "evidenceStatus",
  "campaignRunId",
  "speedRegime",
  "braidCertificationStatus",
  "axisAlignmentStatus",
  "assemblyTopologicalCharge",
  "accessoryCaptureStatus",
]);

export function createBorgAssemblyViewSession(records, options = {}) {
  if (!Array.isArray(records) || records.length === 0) {
    throw new TypeError("Borg assembly-view replay requires at least one sealed record.");
  }
  const entries = Object.freeze(records.map((record, sourceIndex) =>
    normalizeRecordEntry(record, sourceIndex),
  ));
  const duplicateSourceId = firstDuplicate(entries.map((entry) => entry.sourceId));
  if (duplicateSourceId != null) {
    throw new TypeError(
      `Borg assembly-view replay source id ${duplicateSourceId} is duplicated; raw-record navigation is ambiguous.`,
    );
  }

  let selectedSourceId = String(options.selectedSourceId ?? entries[0].sourceId);
  let groupingEnabled = false;
  let filters = Object.freeze({});

  function selectedEntry() {
    return entries.find((entry) => entry.sourceId === selectedSourceId) ?? entries[0];
  }

  function selectSource(sourceId) {
    const id = String(sourceId);
    if (!entries.some((entry) => entry.sourceId === id)) {
      throw new RangeError(`Borg assembly-view collection has no source record ${id}.`);
    }
    selectedSourceId = id;
    return selectedEntry();
  }

  function setFilters(nextFilters = {}) {
    const normalized = {};
    for (const [key, value] of Object.entries(nextFilters)) {
      if (!FILTER_FIELDS.includes(key)) {
        throw new TypeError(`Borg assembly-view filter ${key} is not source-carried.`);
      }
      if (value != null && String(value).length > 0) {
        normalized[key] = String(value);
      }
    }
    filters = Object.freeze(normalized);
    return visibleEntries();
  }

  function visibleEntries() {
    return Object.freeze(entries.filter((entry) =>
      Object.entries(filters).every(([key, expected]) => {
        const actual = entry.filterValues[key];
        return actual != null && String(actual) === expected;
      }),
    ));
  }

  function setGroupingEnabled(enabled) {
    if (enabled && entries.some((entry) => entry.permutationCanonicalKey == null)) {
      throw new TypeError(
        "Borg assembly-view S3 grouping requires a source-carried permutation-canonical key on every grouped record.",
      );
    }
    groupingEnabled = Boolean(enabled);
    return navigationRows();
  }

  function navigationRows() {
    const visible = visibleEntries();
    if (!groupingEnabled) {
      return visible.map((entry) => createNavigationRow(entry, [entry]));
    }
    const groups = new Map();
    visible.forEach((entry) => {
      const group = groups.get(entry.permutationCanonicalKey) ?? [];
      group.push(entry);
      groups.set(entry.permutationCanonicalKey, group);
    });
    return Object.freeze([...groups.values()].map((group) => {
      const representative = group.find((entry) => entry.sourceId === selectedSourceId) ?? group[0];
      return createNavigationRow(representative, group);
    }));
  }

  function requireTimeInCoverage(time, sourceId = selectedSourceId) {
    const entry = entries.find((candidate) => candidate.sourceId === String(sourceId));
    if (!entry) {
      throw new RangeError(`Borg assembly-view collection has no source record ${sourceId}.`);
    }
    const number = Number(time);
    if (!Number.isFinite(number)) {
      throw new TypeError(`Borg assembly-view replay time for ${entry.sourceId} must be finite.`);
    }
    const { start, end } = entry.dataset.window;
    if (number < start || number > end) {
      throw new RangeError(
        `Borg assembly-view record ${entry.sourceId} does not cover display time ${number}; recorded coverage is [${start}, ${end}].`,
      );
    }
    return number;
  }

  return Object.freeze({
    schema: BORG_ASSEMBLY_VIEW_SESSION_SCHEMA,
    runtimeMode: BORG_ASSEMBLY_VIEW_MODE,
    records: entries,
    get selectedSourceId() {
      return selectedSourceId;
    },
    get selected() {
      return selectedEntry();
    },
    get groupingEnabled() {
      return groupingEnabled;
    },
    get filters() {
      return filters;
    },
    selectSource,
    setFilters,
    visibleEntries,
    setGroupingEnabled,
    navigationRows,
    requireTimeInCoverage,
    assessComparison(otherSourceId) {
      const other = entries.find((entry) => entry.sourceId === String(otherSourceId));
      if (!other) {
        throw new RangeError(`Borg assembly-view collection has no source record ${otherSourceId}.`);
      }
      return assessBorgAssemblyViewComparison(selectedEntry(), other);
    },
  });
}

export function assessBorgAssemblyViewComparison(left, right) {
  if (!left || !right) {
    throw new TypeError("Borg assembly-view comparison requires two parsed records.");
  }
  return Object.freeze({
    compatible: false,
    code: "missing-ratified-comparison-transforms",
    field: "assembly-view-record.v0.timeTransform/unitTransform",
    message: BORG_ASSEMBLY_VIEW_CONTRACT_BLOCKERS.comparisonTransforms,
    leftSourceId: left.sourceId,
    rightSourceId: right.sourceId,
  });
}

export function createBorgAssemblyViewPresentation(entry, { time } = {}) {
  const dataset = entry?.dataset;
  if (!dataset) {
    throw new TypeError("Borg assembly-view presentation requires a parsed record entry.");
  }
  const displayTime = time == null ? dataset.window.start : Number(time);
  if (!Number.isFinite(displayTime) || displayTime < dataset.window.start || displayTime > dataset.window.end) {
    throw new RangeError(
      `Borg assembly-view record ${entry.sourceId} display time must stay inside [${dataset.window.start}, ${dataset.window.end}].`,
    );
  }
  const constituentInventory =
    dataset.provenance?.prescribedGeometry?.coordinates?.constituentInventory;
  const constituentRows = Array.isArray(constituentInventory)
    ? constituentInventory.map((constituent, sourceIndex) => Object.freeze({
      sourceIndex,
      constituentId: String(constituent.id),
      worldlineId: String(constituent.worldlineId),
      polarity: finiteOrNull(constituent.polarity),
      role: constituent.role ?? null,
      raw: constituent,
    }))
    : [];
  const binaryRows = dataset.binaries.map((binary, sourceIndex) => Object.freeze({
    sourceIndex,
    sourceId: String(binary?.id ?? binary?.binaryId ?? `binary-${sourceIndex + 1}`),
    members: Array.isArray(binary?.members ?? binary?.worldlineIds)
      ? [...(binary.members ?? binary.worldlineIds)]
      : null,
    frequency: finiteOrNull(binary?.frequency),
    planarOffset: finiteOrNull(binary?.planarOffset ?? binary?.separation),
    phase: finiteOrNull(binary?.phase),
    planeOrientation: binary?.planeOrientation ?? null,
    raw: binary,
  }));
  const eventRows = dataset.events.map((event, sourceIndex) => Object.freeze({
    sourceIndex,
    kind: event?.kind ?? event?.type ?? "unlabeled-event",
    time: finiteOrNull(event?.time),
    worldlineId: event?.worldlineId ?? null,
    raw: event,
  }));
  const sourceStatuses = readSourceStatuses(entry.rawRecord);
  return Object.freeze({
    runtimeMode: BORG_ASSEMBLY_VIEW_MODE,
    claimLabel: dataset.provenance.claimGrade === "chart-hypothesis"
      ? "Prescribed Geometry"
      : "Evolved record",
    staticChartPose: dataset.provenance.claimGrade === "chart-hypothesis",
    provenance: dataset.provenance,
    coverage: dataset.window,
    delayHorizon: dataset.window.delayHorizon,
    displayTime,
    rawRecord: entry.rawRecord,
    constituentRows: Object.freeze(constituentRows),
    binaryRows: Object.freeze(binaryRows),
    eventRows: Object.freeze(eventRows),
    sourceStatuses,
    ansatz: dataset.ansatz,
    fieldSpeed: null,
    fieldSpeedStatus: BORG_ASSEMBLY_VIEW_CONTRACT_BLOCKERS.fieldSpeed,
    spinDipoleStatus: BORG_ASSEMBLY_VIEW_CONTRACT_BLOCKERS.spinDipole,
    authorityNotice:
      "Record-only display. Viewing and replay create no evidence and do not independently verify this record.",
  });
}

function resolveSourcePeriod(entry) {
  const prescribedReturnPeriod = Number(
    entry?.dataset?.provenance?.prescribedGeometry?.prescribedReturnPeriod,
  );
  if (Number.isFinite(prescribedReturnPeriod) && prescribedReturnPeriod > 0) {
    return Object.freeze({
      available: true,
      period: prescribedReturnPeriod,
      frequency: null,
      sourceBinaryIndex: null,
      source: "prescribed-return-period",
    });
  }
  const frequencies = entry.dataset.binaries
    .map((binary) => Number(binary?.frequency))
    .filter((frequency) => Number.isFinite(frequency) && frequency > 0);
  if (frequencies.length === 0) {
    return Object.freeze({
      available: false,
      period: null,
      message: "A source period is unavailable because the selected record carries no positive binary frequency.",
    });
  }
  return Object.freeze({
    available: true,
    period: 1 / frequencies[0],
    frequency: frequencies[0],
    sourceBinaryIndex: 0,
  });
}

export function resolveBorgAssemblyViewTrail(entry) {
  const loop = resolveSourcePeriod(entry);
  const prescribed = entry?.dataset?.provenance?.prescribedGeometry;
  const periodCount = Number(prescribed?.displayTrailPeriods);
  if (
    entry?.dataset?.provenance?.engineId === "prescribed-geometry" &&
    loop.available &&
    Number.isSafeInteger(periodCount) &&
    periodCount > 0
  ) {
    return Object.freeze({
      duration: loop.period * periodCount,
      period: loop.period,
      periodCount,
      source: "prescribed-display-periods",
    });
  }
  const window = entry?.dataset?.window;
  const prescribedDuration = Number(prescribed?.displayTrailDuration);
  const recordDuration = Number(window?.end) - Number(window?.start);
  if (entry?.dataset?.provenance?.engineId === "prescribed-geometry" &&
      Number.isFinite(prescribedDuration) && prescribedDuration > 0) {
    return Object.freeze({
      duration: Math.min(prescribedDuration, recordDuration),
      period: null,
      periodCount: null,
      source: "prescribed-display-duration",
    });
  }
  const delayHorizon = Number(window?.delayHorizon);
  const sampleInterval = Number(window?.sampleInterval);
  const duration = delayHorizon > 0
    ? Math.min(delayHorizon, recordDuration)
    : Math.min(sampleInterval, recordDuration);
  return Object.freeze({
    duration,
    period: loop.available ? loop.period : null,
    periodCount: null,
    source: delayHorizon > 0
      ? "record-delay-horizon"
      : "record-sample-interval-fallback",
  });
}

function normalizeRecordEntry(record, sourceIndex) {
  if (record?.schema !== ASSEMBLY_VIEW_RECORD_SCHEMA) {
    throw new TypeError(
      `Borg assembly-view replay requires schema ${ASSEMBLY_VIEW_RECORD_SCHEMA}; received ${String(record?.schema ?? record?.contractId ?? "none")}.`,
    );
  }
  const dataset = createEomHistoryDataset(record);
  const sourceId = String(record.sourceId ?? dataset.provenance.runId);
  if (sourceId.length === 0) {
    throw new TypeError(`Borg assembly-view record at source order ${sourceIndex} lacks a stable source id.`);
  }
  return Object.freeze({
    sourceId,
    sourceIndex,
    rawRecord: record,
    dataset,
    permutationCanonicalKey: readPermutationCanonicalKey(record),
    filterValues: Object.freeze(readFilterValues(record, dataset)),
  });
}

function readPermutationCanonicalKey(record) {
  const key = record.permutationCanonicalKey ?? record.navigation?.permutationCanonicalKey;
  return typeof key === "string" && key.length > 0 ? key : null;
}

function readFilterValues(record, dataset) {
  const metadata = record.navigation?.filters ?? record.metadata ?? {};
  return {
    claimGrade: dataset.provenance.claimGrade,
    evidenceStatus: dataset.provenance.evidenceStatus,
    campaignRunId: metadata.campaignRunId ?? dataset.provenance.runId,
    speedRegime: metadata.speedRegime ?? null,
    braidCertificationStatus:
      metadata.braidCertificationStatus ?? record.braidCertification?.status ?? null,
    axisAlignmentStatus: metadata.axisAlignmentStatus ?? record.axisAlignment?.status ?? null,
    assemblyTopologicalCharge:
      metadata.assemblyTopologicalCharge ?? record.assemblyTopologicalCharge ?? null,
    accessoryCaptureStatus:
      metadata.accessoryCaptureStatus ?? record.accessoryCaptureStatus ?? null,
  };
}

function readSourceStatuses(record) {
  return Object.freeze({
    branch: record.branch?.status ?? record.navigation?.filters?.branchStatus ?? null,
    braidCertification:
      record.braidCertification?.status ??
      record.navigation?.filters?.braidCertificationStatus ??
      null,
    axisAlignment:
      record.axisAlignment?.status ?? record.navigation?.filters?.axisAlignmentStatus ?? null,
    topologicalCharge:
      record.assemblyTopologicalCharge ?? record.navigation?.filters?.assemblyTopologicalCharge ?? null,
    capture:
      record.accessoryCaptureStatus ?? record.navigation?.filters?.accessoryCaptureStatus ?? null,
  });
}

function createNavigationRow(entry, group) {
  return Object.freeze({
    sourceId: entry.sourceId,
    sourceIndex: entry.sourceIndex,
    selectedRawRecordId: entry.sourceId,
    permutationCanonicalKey: entry.permutationCanonicalKey,
    groupedSourceIds: Object.freeze(group.map((candidate) => candidate.sourceId)),
    rawRecord: entry.rawRecord,
  });
}

function finiteOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function firstDuplicate(values) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
  }
  return null;
}
