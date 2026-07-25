import {
  findBorgPrescribedAnalysisEvent,
  sha256BorgCanonicalJson,
  validateBorgPrescribedAnalysisProjection,
  verifyBorgPrescribedAnalysisProjectionHash,
} from "./BorgPrescribedAnalysisProjection.js";

export const BORG_PRESCRIBED_ANALYSIS_PROVIDER_SCHEMA =
  "borg-prescribed-analysis-provider.v1";

export const BORG_PRESCRIBED_ANALYSIS_PROVIDER_STATE = Object.freeze({
  UNAVAILABLE: "unavailable",
  READY: "ready",
  LOADING: "loading",
  MATCHED: "matched",
  NO_MATCH: "no-matching-analytical-result",
  INVALIDATED: "invalidated",
  ERROR: "error",
});

export function createBorgPrescribedAnalysisProvider({
  fetchLike = globalThis.fetch,
  projectionUrl = null,
  projection = null,
  cryptoLike = globalThis.crypto,
  expectedProtocolHash = null,
} = {}) {
  if (projection == null && !projectionUrl) {
    return unavailableProvider();
  }
  if (projection == null && typeof fetchLike !== "function") {
    throw new TypeError("Borg prescribed analysis static provider requires fetch().");
  }
  let loadedProjection = null;
  const eventCache = new Map();
  let displayRecordHashCache = new WeakMap();
  let validatedRecordProjectionCache = new WeakMap();

  function displayRecordHash(entry) {
    let pendingHash = displayRecordHashCache.get(entry.rawRecord);
    if (!pendingHash) {
      pendingHash = sha256BorgCanonicalJson(entry.rawRecord, { cryptoLike });
      displayRecordHashCache.set(entry.rawRecord, pendingHash);
      void pendingHash.catch(() => {
        if (displayRecordHashCache.get(entry.rawRecord) === pendingHash) {
          displayRecordHashCache.delete(entry.rawRecord);
        }
      });
    }
    return pendingHash;
  }

  async function loadProjection(entry, signal) {
    signal?.throwIfAborted?.();
    const cachedProjection = validatedRecordProjectionCache.get(entry.rawRecord);
    if (cachedProjection) {
      return cachedProjection;
    }
    const recordHash = await displayRecordHash(entry);
    signal?.throwIfAborted?.();
    if (!loadedProjection) {
      const loaded = projection ??
        await fetchProjection(fetchLike, projectionUrl, signal);
      signal?.throwIfAborted?.();
      const structurallyValid = validateBorgPrescribedAnalysisProjection(loaded, {
        displayRecordId: entry.sourceId,
        displayRecordHash: recordHash,
        protocolHash: expectedProtocolHash,
      });
      const verified = await verifyBorgPrescribedAnalysisProjectionHash(
        structurallyValid,
        { cryptoLike },
      );
      signal?.throwIfAborted?.();
      loadedProjection = verified;
    }
    signal?.throwIfAborted?.();
    validateBorgPrescribedAnalysisProjection(loadedProjection, {
      displayRecordId: entry.sourceId,
      displayRecordHash: recordHash,
      protocolHash: expectedProtocolHash,
    });
    validatedRecordProjectionCache.set(entry.rawRecord, loadedProjection);
    return loadedProjection;
  }

  async function requestEvent({ entry, receiverIdentity, signal } = {}) {
    if (!entry?.rawRecord || typeof receiverIdentity !== "string") {
      throw new TypeError(
        "Borg prescribed analysis request requires a parsed record entry and receiver identity.",
      );
    }
    const projectionPacket = await loadProjection(entry, signal);
    const key = [
      projectionPacket.displaySource.recordHash,
      projectionPacket.provenance.sourceHash,
      projectionPacket.provenance.protocolHash,
      receiverIdentity,
    ].join(":");
    if (eventCache.has(key)) {
      return eventCache.get(key);
    }
    const event = findBorgPrescribedAnalysisEvent(
      projectionPacket,
      receiverIdentity,
    );
    const result = Object.freeze(event
      ? {
          state: BORG_PRESCRIBED_ANALYSIS_PROVIDER_STATE.MATCHED,
          projection: projectionPacket,
          event,
          message: "Source-matched prescribed-path analysis loaded.",
        }
      : {
          state: BORG_PRESCRIBED_ANALYSIS_PROVIDER_STATE.NO_MATCH,
          projection: projectionPacket,
          event: null,
          message:
            "The provider has no evaluated analytical result for this exact receiver event.",
        });
    eventCache.set(key, result);
    return result;
  }

  return Object.freeze({
    schema: BORG_PRESCRIBED_ANALYSIS_PROVIDER_SCHEMA,
    kind: projection ? "static-object" : "static-url",
    available: true,
    capability: Object.freeze({
      staticPrecomputed: true,
      onDemand: false,
      virtualProbe:
        projection?.events?.some((event) => event?.receiver?.kind === "virtual-probe") ??
        null,
      message:
        "Static source-matched projections are supported; no browser-local analytical evaluator exists.",
    }),
    requestEvent,
    async describe(entry, signal) {
      try {
        const loaded = await loadProjection(entry, signal);
        return Object.freeze({
          state: BORG_PRESCRIBED_ANALYSIS_PROVIDER_STATE.READY,
          available: true,
          projectionId: loaded.projectionId,
          protocolHash: loaded.provenance.protocolHash,
          capabilityLabel: loaded.provider.capabilityLabel,
          virtualProbe: loaded.events.some(
            (event) => event.receiver.kind === "virtual-probe",
          ),
          virtualProbes: uniqueVirtualProbes(loaded.events),
          message: loaded.provider.capabilityLabel,
        });
      } catch (error) {
        return Object.freeze({
          state: BORG_PRESCRIBED_ANALYSIS_PROVIDER_STATE.INVALIDATED,
          available: false,
          projectionId: null,
          protocolHash: null,
          capabilityLabel: "Invalidated analytical projection",
          virtualProbe: false,
          virtualProbes: [],
          message: error?.message ?? String(error),
        });
      }
    },
    clearCache() {
      eventCache.clear();
      loadedProjection = null;
      displayRecordHashCache = new WeakMap();
      validatedRecordProjectionCache = new WeakMap();
    },
  });
}

export function createBorgPrescribedAnalysisRequestCoordinator({
  provider,
  onStateChange = () => {},
} = {}) {
  if (!provider || typeof provider.requestEvent !== "function") {
    throw new TypeError("Borg prescribed analysis coordinator requires one provider.");
  }
  let generation = 0;
  let controller = null;

  async function request(requestOptions) {
    generation += 1;
    const requestedGeneration = generation;
    controller?.abort?.();
    controller = new AbortController();
    onStateChange(Object.freeze({
      state: BORG_PRESCRIBED_ANALYSIS_PROVIDER_STATE.LOADING,
      projection: null,
      event: null,
      message: "Loading source-matched prescribed-path analysis.",
    }));
    try {
      const result = await provider.requestEvent({
        ...requestOptions,
        signal: controller.signal,
      });
      if (requestedGeneration !== generation || controller.signal.aborted) {
        return null;
      }
      onStateChange(result);
      return result;
    } catch (error) {
      if (requestedGeneration !== generation || controller.signal.aborted) {
        return null;
      }
      const result = Object.freeze({
        state: BORG_PRESCRIBED_ANALYSIS_PROVIDER_STATE.INVALIDATED,
        projection: null,
        event: null,
        message: error?.message ?? String(error),
      });
      onStateChange(result);
      return result;
    }
  }

  function clear(message = "No receiver event selected.") {
    generation += 1;
    controller?.abort?.();
    controller = null;
    const state = Object.freeze({
      state: BORG_PRESCRIBED_ANALYSIS_PROVIDER_STATE.UNAVAILABLE,
      projection: null,
      event: null,
      message,
    });
    onStateChange(state);
    return state;
  }

  return Object.freeze({
    request,
    clear,
    dispose() {
      generation += 1;
      controller?.abort?.();
      controller = null;
    },
  });
}

function unavailableProvider() {
  const capabilityMessage =
    "Analysis provider unavailable. Supply a precomputed Borg prescribed-analysis projection; Borg will not solve roots in the browser.";
  return Object.freeze({
    schema: BORG_PRESCRIBED_ANALYSIS_PROVIDER_SCHEMA,
    kind: "unavailable",
    available: false,
    capability: Object.freeze({
      staticPrecomputed: false,
      onDemand: false,
      virtualProbe: false,
      message: capabilityMessage,
    }),
    async requestEvent() {
      return Object.freeze({
        state: BORG_PRESCRIBED_ANALYSIS_PROVIDER_STATE.UNAVAILABLE,
        projection: null,
        event: null,
        message:
          "Receiver selected, but the analysis provider is unavailable. Supply a precomputed Borg prescribed-analysis projection; Borg will not solve roots in the browser.",
      });
    },
    async describe() {
      return Object.freeze({
        state: BORG_PRESCRIBED_ANALYSIS_PROVIDER_STATE.UNAVAILABLE,
        available: false,
        projectionId: null,
        protocolHash: null,
        capabilityLabel: "Unavailable",
        virtualProbe: false,
        virtualProbes: [],
        message: capabilityMessage,
      });
    },
    clearCache() {},
  });
}

function uniqueVirtualProbes(events) {
  const probes = new Map();
  events
    .filter((event) => event.receiver.kind === "virtual-probe")
    .forEach((event) => {
      const receiver = event.receiver;
      if (!probes.has(receiver.id)) {
        probes.set(receiver.id, Object.freeze({
          id: receiver.id,
          position: receiver.position,
        }));
      }
    });
  return Object.freeze([...probes.values()]);
}

async function fetchProjection(fetchLike, projectionUrl, signal) {
  const response = await fetchLike(projectionUrl, { signal });
  if (!response?.ok) {
    throw new Error(
      `Borg prescribed analysis projection fetch failed (${response?.status ?? "no response"}): ${projectionUrl}`,
    );
  }
  return response.json();
}
