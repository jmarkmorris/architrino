import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

import {
  canonicalSha256,
  recordSha256,
  validatePathInterchangeBundle,
} from "./path-interchange-v0.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const CONTRACT_PATH = "reference/priorities/app-aaa-core/contracts/aaa-core-accepted-history-stream.v0.json";
const PATH_CONTRACT_PATH = "reference/priorities/app-aaa-core/contracts/aaa-core-path-interchange.v0.json";

export class AcceptedHistoryStreamError extends Error {
  constructor(code, message) {
    super(`${code}: ${message}`);
    this.name = "AcceptedHistoryStreamError";
    this.code = code;
  }
}

function fail(code, message) {
  throw new AcceptedHistoryStreamError(code, message);
}

function requireCondition(condition, code, message) {
  if (!condition) fail(code, message);
}

function readJson(rootDir, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function sameValue(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function validateContract(contract) {
  requireCondition(
    contract.schema === "aaa_core_accepted_history_stream/v0" && contract.version === 0 &&
      contract.status === "accepted" && contract.owner === "AAA Core" && contract.producerAuthority === "EOM solver",
    "invalid_contract",
    "accepted stream contract envelope",
  );
  requireCondition(
    contract.logicalContract === "aaa_core_path_interchange/v0" &&
      contract.codecRegistry === "aaa_core_codec_registry/v0" &&
      sameValue(contract.eventTypes, ["stream_open", "accepted_chunk", "stream_seal", "stream_halt"]),
    "invalid_contract",
    "stream dependencies or event types",
  );
  requireCondition(
    contract.consumerConformance?.length === 2 &&
      new Set(contract.consumerConformance.map((consumer) => consumer.consumerId)).size === 2,
    "invalid_contract",
    "two independent consumer definitions are required",
  );
  return contract;
}

function createPotentialObserver(consumerId, sourceBinding, startT) {
  return {
    consumerId,
    clientKind: "potential",
    sourceBinding: structuredClone(sourceBinding),
    expectedSequence: 0,
    predecessorChunkSha256: null,
    acknowledgedThroughT: startT,
    orderedChunks: [],
    terminal: null,
    ingest(chunk) {
      requireCondition(chunk.payload.sequence === this.expectedSequence, "receipt_identity_mismatch", "Potential sequence check");
      requireCondition(
        chunk.payload.pathSetId === this.sourceBinding.pathSetId &&
          chunk.payload.sourceManifestId === this.sourceBinding.sourceManifestId &&
        chunk.payload.predecessorChunkSha256 === this.predecessorChunkSha256 &&
          chunk.payload.coverage.startT === this.acknowledgedThroughT &&
          chunk.payload.coverage.acceptedThroughT === chunk.payload.coverage.endT,
        "receipt_identity_mismatch",
        "Potential predecessor or accepted-time check",
      );
      this.orderedChunks.push({
        sequence: chunk.payload.sequence,
        chunkId: chunk.payload.chunkId,
        contentSha256: chunk.contentSha256,
        acceptedThroughT: chunk.payload.coverage.endT,
      });
      this.expectedSequence += 1;
      this.predecessorChunkSha256 = chunk.contentSha256;
      this.acknowledgedThroughT = chunk.payload.coverage.endT;
    },
    observeTerminal(terminal) {
      requireCondition(
        terminal.streamId === this.sourceBinding.streamId &&
          terminal.sourceManifestSha256 === this.sourceBinding.sourceManifestSha256,
        "receipt_identity_mismatch",
        "Potential terminal source binding",
      );
      this.terminal = structuredClone(terminal);
    },
    receipt() {
      const payload = {
        consumerId: this.consumerId,
        clientKind: this.clientKind,
        sourceBinding: this.sourceBinding,
        orderedChunks: this.orderedChunks,
        acknowledgedThroughT: this.acknowledgedThroughT,
        terminal: this.terminal,
      };
      return {...payload, receiptSha256: canonicalSha256(payload)};
    },
  };
}

function createAuditObserver(consumerId, sourceBinding, startT) {
  return {
    consumerId,
    clientKind: "audit",
    sourceBinding: structuredClone(sourceBinding),
    nextSequence: 0,
    priorContentSha256: null,
    acknowledgedThroughT: startT,
    ledgerSha256: canonicalSha256({schema: "accepted_history_audit_ledger/v0", sourceBinding}),
    rows: [],
    terminal: null,
    ingest(chunk) {
      requireCondition(chunk.payload.sequence === this.nextSequence, "receipt_identity_mismatch", "audit sequence check");
      requireCondition(
        chunk.payload.pathSetId === this.sourceBinding.pathSetId &&
          chunk.payload.sourceManifestId === this.sourceBinding.sourceManifestId &&
          chunk.payload.predecessorChunkSha256 === this.priorContentSha256 &&
          recordSha256(chunk) === chunk.contentSha256,
        "receipt_identity_mismatch",
        "audit predecessor or record identity check",
      );
      const row = {
        sequence: chunk.payload.sequence,
        recordId: chunk.recordId,
        contentSha256: chunk.contentSha256,
        predecessorChunkSha256: chunk.payload.predecessorChunkSha256,
      };
      this.ledgerSha256 = canonicalSha256({priorLedgerSha256: this.ledgerSha256, row});
      this.rows.push(row);
      this.nextSequence += 1;
      this.priorContentSha256 = chunk.contentSha256;
      this.acknowledgedThroughT = chunk.payload.coverage.endT;
    },
    observeTerminal(terminal) {
      requireCondition(
        terminal.streamId === this.sourceBinding.streamId &&
          terminal.sourceManifestSha256 === this.sourceBinding.sourceManifestSha256,
        "receipt_identity_mismatch",
        "audit terminal source binding",
      );
      this.terminal = structuredClone(terminal);
    },
    receipt() {
      const payload = {
        consumerId: this.consumerId,
        clientKind: this.clientKind,
        sourceBinding: this.sourceBinding,
        ledgerSha256: this.ledgerSha256,
        rowCount: this.rows.length,
        acknowledgedThroughT: this.acknowledgedThroughT,
        terminal: this.terminal,
      };
      return {...payload, receiptSha256: canonicalSha256(payload)};
    },
  };
}

function createObserver(definition, sourceBinding, startT) {
  if (definition.clientKind === "potential") return createPotentialObserver(definition.consumerId, sourceBinding, startT);
  if (definition.clientKind === "audit") return createAuditObserver(definition.consumerId, sourceBinding, startT);
  fail("invalid_contract", `unknown client kind ${String(definition.clientKind)}`);
}

export class AcceptedHistoryStreamBroker {
  constructor({contract, pathContract, fixtureCase, pathBundle}) {
    validateContract(contract);
    validatePathInterchangeBundle(pathContract, pathBundle);
    this.contract = contract;
    this.fixtureCase = fixtureCase;
    this.pathBundle = pathBundle;
    this.manifest = pathBundle.records.find((record) => record.recordType === "path_set_manifest");
    requireCondition(this.manifest !== undefined, "invalid_contract", "path-set manifest");
    requireCondition(
      fixtureCase.stream.pathSetId === this.manifest.payload.pathSetId &&
        fixtureCase.stream.sourceManifestId === this.manifest.recordId &&
        fixtureCase.stream.producer === "EOM solver" && fixtureCase.stream.sequenceBase === 0,
      "source_binding_mismatch",
      "stream source declaration",
    );
    this.sourceBinding = {
      streamId: fixtureCase.stream.streamId,
      pathSetId: this.manifest.payload.pathSetId,
      sourceManifestId: this.manifest.recordId,
      sourceManifestSha256: this.manifest.contentSha256,
    };
    this.chunksByRecordId = new Map(
      pathBundle.records.filter((record) => record.recordType === "path_chunk").map((record) => [record.recordId, record]),
    );
    this.state = "open";
    this.log = [];
    this.acceptedThroughT = this.manifest.payload.coverage.startT;
    this.lastChunkSha256 = null;
    this.duplicatesIgnored = 0;
    this.terminal = null;
    this.subscribers = new Map();
  }

  get producerBackpressured() {
    return [...this.subscribers.values()].some((subscriber) => subscriber.connected && subscriber.backpressured);
  }

  #consumerDefinition(consumerId) {
    const definition = this.fixtureCase.consumers.find((consumer) => consumer.consumerId === consumerId);
    if (!definition) fail("unknown_consumer", consumerId);
    return definition;
  }

  #setBackpressure(subscriber, active) {
    if (active === subscriber.backpressured) return;
    subscriber.backpressured = active;
    if (active) subscriber.backpressureEntries += 1;
    else subscriber.backpressureReleases += 1;
  }

  #fillSubscriber(subscriber) {
    if (!subscriber.connected) return;
    let nextSequence = subscriber.acknowledgedSequence + subscriber.queue.length + 1;
    while (nextSequence < this.log.length) {
      const entry = this.log[nextSequence];
      const countFits = subscriber.queue.length + 1 <= subscriber.definition.maxBufferedChunks;
      const bytesFit = subscriber.bufferedBytes + entry.byteLength <= subscriber.definition.maxBufferedBytes;
      if (!countFits || !bytesFit) break;
      subscriber.queue.push(entry);
      subscriber.bufferedBytes += entry.byteLength;
      subscriber.deliveredThroughT = entry.record.payload.coverage.endT;
      nextSequence += 1;
    }
    const atLimit = subscriber.queue.length >= subscriber.definition.maxBufferedChunks ||
      subscriber.bufferedBytes >= subscriber.definition.maxBufferedBytes;
    this.#setBackpressure(subscriber, atLimit);
    const allDelivered = subscriber.acknowledgedSequence + subscriber.queue.length + 1 >= this.log.length;
    if (this.terminal && allDelivered && subscriber.queue.length === 0) {
      subscriber.terminalAvailable = structuredClone(this.terminal);
    }
  }

  subscribe(consumerId, cursor) {
    requireCondition(this.state === "open", "terminal_stream_immutable", "new subscription after terminal state");
    requireCondition(!this.subscribers.has(consumerId), "invalid_reconnect_cursor", `${consumerId} already subscribed`);
    const definition = this.#consumerDefinition(consumerId);
    requireCondition(
      cursor?.acknowledgedSequence === -1 && cursor.acknowledgedChunkSha256 === null,
      "invalid_reconnect_cursor",
      `${consumerId} initial cursor`,
    );
    requireCondition(
      Number.isInteger(definition.maxBufferedChunks) && definition.maxBufferedChunks > 0 &&
        Number.isInteger(definition.maxBufferedBytes) && definition.maxBufferedBytes > 0,
      "invalid_contract",
      `${consumerId} buffer limits`,
    );
    const subscriber = {
      definition,
      connected: true,
      acknowledgedSequence: -1,
      acknowledgedChunkSha256: null,
      acknowledgedThroughT: this.manifest.payload.coverage.startT,
      deliveredThroughT: this.manifest.payload.coverage.startT,
      queue: [],
      bufferedBytes: 0,
      backpressured: false,
      backpressureEntries: 0,
      backpressureReleases: 0,
      reconnects: 0,
      terminalAvailable: null,
      terminalObserved: false,
      observer: createObserver(definition, this.sourceBinding, this.manifest.payload.coverage.startT),
    };
    this.subscribers.set(consumerId, subscriber);
    this.#fillSubscriber(subscriber);
  }

  publish(recordId, byteLength, recordOverride = null) {
    requireCondition(this.state === "open", "terminal_stream_immutable", "producer event after terminal state");
    const record = recordOverride ?? this.chunksByRecordId.get(recordId);
    requireCondition(record !== undefined, "source_binding_mismatch", recordId);
    requireCondition(record.recordType === "path_chunk", "unaccepted_chunk", recordId);
    const sequence = record.payload.sequence;
    const existing = this.log[sequence];
    if (existing) {
      requireCondition(existing.record.contentSha256 === record.contentSha256, "conflicting_duplicate", `sequence ${sequence}`);
      this.duplicatesIgnored += 1;
      return {duplicate: true};
    }
    requireCondition(!this.producerBackpressured, "backpressure_active", `before sequence ${sequence}`);
    requireCondition(Number.isInteger(byteLength) && byteLength > 0, "invalid_contract", `${recordId} byteLength`);
    for (const subscriber of this.subscribers.values()) {
      if (subscriber.connected && byteLength > subscriber.definition.maxBufferedBytes) {
        fail("buffer_limit_exceeded", `${subscriber.definition.consumerId} cannot admit one chunk`);
      }
    }
    requireCondition(
      record.payload.pathSetId === this.sourceBinding.pathSetId &&
        record.payload.sourceManifestId === this.sourceBinding.sourceManifestId,
      "source_binding_mismatch",
      recordId,
    );
    requireCondition(
      record.payload.authority?.level === "accepted_history" &&
        record.payload.numericPolicy?.representationProfile === "authoritative_history" &&
        record.payload.provenance?.producer === "EOM solver",
      "unaccepted_chunk",
      recordId,
    );
    const expectedSequence = this.log.length;
    requireCondition(sequence === expectedSequence, "missing_predecessor", `expected ${expectedSequence}, got ${sequence}`);
    requireCondition(
      record.payload.predecessorChunkSha256 === this.lastChunkSha256,
      "broken_predecessor_chain",
      `sequence ${sequence}`,
    );
    requireCondition(
      record.payload.coverage.startT === this.acceptedThroughT &&
        record.payload.coverage.endT > record.payload.coverage.startT &&
        record.payload.coverage.acceptedThroughT === record.payload.coverage.endT,
      "noncontiguous_accepted_time",
      `sequence ${sequence}`,
    );
    requireCondition(recordSha256(record) === record.contentSha256, "unaccepted_chunk", `${recordId} identity`);
    const manifestReference = this.manifest.payload.chunks[sequence];
    requireCondition(
      manifestReference?.chunkId === record.payload.chunkId && manifestReference.contentSha256 === record.contentSha256,
      "source_binding_mismatch",
      `${recordId} manifest reference`,
    );
    const entry = {record: structuredClone(record), byteLength};
    this.log.push(entry);
    this.acceptedThroughT = record.payload.coverage.endT;
    this.lastChunkSha256 = record.contentSha256;
    for (const subscriber of this.subscribers.values()) this.#fillSubscriber(subscriber);
    return {duplicate: false};
  }

  acknowledge(consumerId, sequence) {
    const subscriber = this.subscribers.get(consumerId);
    if (!subscriber) fail("unknown_consumer", consumerId);
    requireCondition(subscriber.connected, "unknown_consumer", `${consumerId} is disconnected`);
    const head = subscriber.queue[0];
    requireCondition(head?.record.payload.sequence === sequence, "acknowledgement_out_of_order", `${consumerId} sequence ${sequence}`);
    subscriber.queue.shift();
    subscriber.bufferedBytes -= head.byteLength;
    subscriber.observer.ingest(head.record);
    subscriber.acknowledgedSequence = sequence;
    subscriber.acknowledgedChunkSha256 = head.record.contentSha256;
    subscriber.acknowledgedThroughT = head.record.payload.coverage.endT;
    this.#fillSubscriber(subscriber);
    return structuredClone(head.record);
  }

  disconnect(consumerId) {
    const subscriber = this.subscribers.get(consumerId);
    if (!subscriber) fail("unknown_consumer", consumerId);
    subscriber.connected = false;
    subscriber.queue = [];
    subscriber.bufferedBytes = 0;
    this.#setBackpressure(subscriber, false);
    subscriber.terminalAvailable = null;
    return {
      acknowledgedSequence: subscriber.acknowledgedSequence,
      acknowledgedChunkSha256: subscriber.acknowledgedChunkSha256,
    };
  }

  reconnect(consumerId, cursor) {
    const subscriber = this.subscribers.get(consumerId);
    if (!subscriber) fail("unknown_consumer", consumerId);
    requireCondition(!subscriber.connected, "invalid_reconnect_cursor", `${consumerId} is already connected`);
    requireCondition(
      cursor?.acknowledgedSequence === subscriber.acknowledgedSequence &&
        cursor.acknowledgedChunkSha256 === subscriber.acknowledgedChunkSha256,
      "invalid_reconnect_cursor",
      consumerId,
    );
    subscriber.connected = true;
    subscriber.reconnects += 1;
    this.#fillSubscriber(subscriber);
  }

  seal(finalSequence, acceptedThroughT) {
    requireCondition(this.state === "open", "terminal_stream_immutable", "seal after terminal state");
    requireCondition(
      this.manifest.payload.coverage.complete === true &&
        this.log.length === this.manifest.payload.chunks.length &&
        finalSequence === this.log.length - 1 && acceptedThroughT === this.acceptedThroughT &&
        acceptedThroughT === this.manifest.payload.coverage.endT,
      "incomplete_seal",
      "producer seal does not close the manifest",
    );
    this.state = "sealed";
    this.terminal = {
      type: "stream_seal",
      streamId: this.sourceBinding.streamId,
      sourceManifestSha256: this.sourceBinding.sourceManifestSha256,
      finalSequence,
      acceptedThroughT,
    };
    for (const subscriber of this.subscribers.values()) this.#fillSubscriber(subscriber);
  }

  halt(payload) {
    requireCondition(this.state === "open", "terminal_stream_immutable", "halt after terminal state");
    requireCondition(
      typeof payload.code === "string" && payload.code.length > 0 &&
        typeof payload.detail === "string" && payload.detail.length > 0 &&
        payload.failedSequence === this.log.length && payload.acceptedThroughT === this.acceptedThroughT,
      "halt_identity_mismatch",
      "halt payload does not bind the accepted prefix",
    );
    this.state = "halted";
    this.terminal = {
      type: "stream_halt",
      streamId: this.sourceBinding.streamId,
      sourceManifestSha256: this.sourceBinding.sourceManifestSha256,
      ...structuredClone(payload),
    };
    for (const subscriber of this.subscribers.values()) this.#fillSubscriber(subscriber);
  }

  observeTerminal(consumerId, expected = null) {
    const subscriber = this.subscribers.get(consumerId);
    if (!subscriber) fail("unknown_consumer", consumerId);
    requireCondition(subscriber.connected && subscriber.terminalAvailable !== null, "incomplete_seal", `${consumerId} terminal unavailable`);
    if (expected !== null) {
      const actualPayload = {
        code: subscriber.terminalAvailable.code,
        detail: subscriber.terminalAvailable.detail,
        failedSequence: subscriber.terminalAvailable.failedSequence,
        acceptedThroughT: subscriber.terminalAvailable.acceptedThroughT,
      };
      requireCondition(sameValue(actualPayload, expected), "halt_identity_mismatch", consumerId);
    }
    subscriber.observer.observeTerminal(subscriber.terminalAvailable);
    subscriber.terminalObserved = true;
    return structuredClone(subscriber.terminalAvailable);
  }

  result() {
    const consumers = Object.fromEntries([...this.subscribers.entries()].map(([consumerId, subscriber]) => [consumerId, {
      acknowledgedSequence: subscriber.acknowledgedSequence,
      acknowledgedChunkSha256: subscriber.acknowledgedChunkSha256,
      acknowledgedThroughT: subscriber.acknowledgedThroughT,
      deliveredThroughT: subscriber.deliveredThroughT,
      queueDepth: subscriber.queue.length,
      bufferedBytes: subscriber.bufferedBytes,
      backpressureEntries: subscriber.backpressureEntries,
      backpressureReleases: subscriber.backpressureReleases,
      reconnects: subscriber.reconnects,
      terminalObserved: subscriber.terminalObserved,
      receipt: subscriber.observer.receipt(),
    }]));
    return {
      producerState: this.state,
      acceptedThroughT: this.acceptedThroughT,
      duplicatesIgnored: this.duplicatesIgnored,
      producerBackpressured: this.producerBackpressured,
      sourceBinding: this.sourceBinding,
      terminal: this.terminal,
      consumers,
    };
  }
}

function materializeCase(positiveSuite, fixtureCase) {
  if (fixtureCase.pathBundle) return structuredClone(fixtureCase);
  const sourceCase = positiveSuite.cases.find((candidate) => candidate.caseId === fixtureCase.sourceCaseId);
  requireCondition(sourceCase?.pathBundle, "invalid_contract", `${fixtureCase.caseId} source case`);
  return {...structuredClone(fixtureCase), pathBundle: structuredClone(sourceCase.pathBundle)};
}

export function runAcceptedHistoryStreamFixture(contract, pathContract, positiveSuite, fixtureCase) {
  const materialized = materializeCase(positiveSuite, fixtureCase);
  const broker = new AcceptedHistoryStreamBroker({contract, pathContract, fixtureCase: materialized, pathBundle: materialized.pathBundle});
  for (const action of materialized.actions) {
    switch (action.type) {
      case "subscribe": broker.subscribe(action.consumerId, action.cursor); break;
      case "publish": broker.publish(action.recordId, action.byteLength); break;
      case "acknowledge": broker.acknowledge(action.consumerId, action.sequence); break;
      case "disconnect": broker.disconnect(action.consumerId); break;
      case "reconnect": broker.reconnect(action.consumerId, action.cursor); break;
      case "seal": broker.seal(action.finalSequence, action.acceptedThroughT); break;
      case "halt": broker.halt({code: action.code, detail: action.detail, failedSequence: action.failedSequence, acceptedThroughT: action.acceptedThroughT}); break;
      case "observe_terminal": broker.observeTerminal(action.consumerId, materialized.expected.halt ?? null); break;
      default: fail("invalid_contract", `unknown action ${String(action.type)}`);
    }
  }
  const result = broker.result();
  requireCondition(result.producerState === materialized.expected.producerState, "receipt_identity_mismatch", `${fixtureCase.caseId} producer state`);
  requireCondition(result.acceptedThroughT === materialized.expected.acceptedThroughT, "receipt_identity_mismatch", `${fixtureCase.caseId} watermark`);
  for (const consumer of Object.values(result.consumers)) {
    requireCondition(consumer.terminalObserved, "receipt_identity_mismatch", `${fixtureCase.caseId} terminal receipt`);
  }
  if (materialized.expected.producerState === "sealed") {
    const potential = result.consumers["potential-consumer"];
    const audit = result.consumers["history-audit-consumer"];
    requireCondition(
      result.duplicatesIgnored === materialized.expected.duplicatesIgnored &&
        potential.acknowledgedSequence === materialized.expected.potentialAcknowledgedSequence &&
        audit.acknowledgedSequence === materialized.expected.auditAcknowledgedSequence &&
        audit.reconnects === materialized.expected.auditReconnects &&
        (potential.receipt.receiptSha256 === audit.receipt.receiptSha256) === materialized.expected.consumerReceiptEquality,
      "receipt_identity_mismatch",
      `${fixtureCase.caseId} sealed expectations`,
    );
  } else {
    const potentialTerminal = result.consumers["potential-consumer"].receipt.terminal;
    const auditTerminal = result.consumers["history-audit-consumer"].receipt.terminal;
    requireCondition(
      sameValue(potentialTerminal, auditTerminal) &&
        sameValue({
          code: result.terminal.code,
          detail: result.terminal.detail,
          failedSequence: result.terminal.failedSequence,
          acceptedThroughT: result.terminal.acceptedThroughT,
        }, materialized.expected.halt),
      "halt_identity_mismatch",
      `${fixtureCase.caseId} halt propagation`,
    );
  }
  return result;
}

function brokerForNegative(contract, pathContract, positiveSuite, fixtureCase, consumerOverrides = {}) {
  const materialized = materializeCase(positiveSuite, fixtureCase);
  materialized.consumers = materialized.consumers.map((consumer) => ({...consumer, ...(consumerOverrides[consumer.consumerId] ?? {})}));
  return {
    broker: new AcceptedHistoryStreamBroker({contract, pathContract, fixtureCase: materialized, pathBundle: materialized.pathBundle}),
    fixtureCase: materialized,
  };
}

function recordFor(fixtureCase, sequence) {
  return structuredClone(fixtureCase.pathBundle.records.find((record) => record.recordType === "path_chunk" && record.payload.sequence === sequence));
}

function runNegativeOperation(contract, pathContract, positiveSuite, fixtureCase, operation) {
  if (operation === "buffer_limit_exceeded") {
    const {broker} = brokerForNegative(contract, pathContract, positiveSuite, fixtureCase, {
      "history-audit-consumer": {maxBufferedBytes: 64},
    });
    broker.subscribe("history-audit-consumer", {acknowledgedSequence: -1, acknowledgedChunkSha256: null});
    broker.publish("record.stream.chunk.0", 128);
    return;
  }
  const {broker, fixtureCase: materialized} = brokerForNegative(contract, pathContract, positiveSuite, fixtureCase);
  const cursorStart = {acknowledgedSequence: -1, acknowledgedChunkSha256: null};
  switch (operation) {
    case "missing_predecessor":
      broker.publish("record.stream.chunk.0", 128);
      broker.publish("record.stream.chunk.2", 128);
      break;
    case "broken_predecessor_chain": {
      broker.publish("record.stream.chunk.0", 128);
      const changed = recordFor(materialized, 1);
      changed.payload.predecessorChunkSha256 = "f".repeat(64);
      changed.contentSha256 = recordSha256(changed);
      broker.publish(changed.recordId, 128, changed);
      break;
    }
    case "conflicting_duplicate": {
      broker.publish("record.stream.chunk.0", 128);
      const changed = recordFor(materialized, 0);
      changed.contentSha256 = "f".repeat(64);
      broker.publish(changed.recordId, 128, changed);
      break;
    }
    case "noncontiguous_accepted_time": {
      broker.publish("record.stream.chunk.0", 128);
      const changed = recordFor(materialized, 1);
      changed.payload.coverage.startT = 1.5;
      changed.contentSha256 = recordSha256(changed);
      broker.publish(changed.recordId, 128, changed);
      break;
    }
    case "source_binding_mismatch": {
      const changed = recordFor(materialized, 0);
      changed.payload.pathSetId = "other-path-set";
      changed.contentSha256 = recordSha256(changed);
      broker.publish(changed.recordId, 128, changed);
      break;
    }
    case "backpressure_active":
      broker.subscribe("history-audit-consumer", cursorStart);
      broker.publish("record.stream.chunk.0", 128);
      broker.publish("record.stream.chunk.1", 128);
      break;
    case "acknowledgement_out_of_order":
      broker.subscribe("potential-consumer", cursorStart);
      broker.publish("record.stream.chunk.0", 128);
      broker.publish("record.stream.chunk.1", 128);
      broker.acknowledge("potential-consumer", 1);
      break;
    case "invalid_reconnect_cursor":
      broker.subscribe("history-audit-consumer", cursorStart);
      broker.publish("record.stream.chunk.0", 128);
      broker.acknowledge("history-audit-consumer", 0);
      broker.disconnect("history-audit-consumer");
      broker.reconnect("history-audit-consumer", {acknowledgedSequence: 0, acknowledgedChunkSha256: "f".repeat(64)});
      break;
    case "incomplete_seal":
      broker.publish("record.stream.chunk.0", 128);
      broker.seal(0, 1);
      break;
    case "halt_identity_mismatch":
      broker.subscribe("potential-consumer", cursorStart);
      broker.halt({code: "eom.synthetic_stop", detail: "synthetic producer stopped before sequence 0", failedSequence: 0, acceptedThroughT: 0});
      broker.observeTerminal("potential-consumer", {code: "different", detail: "different", failedSequence: 0, acceptedThroughT: 0});
      break;
    case "terminal_stream_immutable":
      broker.publish("record.stream.chunk.0", 128);
      broker.publish("record.stream.chunk.1", 128);
      broker.publish("record.stream.chunk.2", 128);
      broker.seal(2, 3);
      broker.publish("record.stream.chunk.2", 128);
      break;
    default:
      fail("invalid_contract", `unknown negative operation ${operation}`);
  }
  fail("invalid_contract", `${operation} unexpectedly passed`);
}

export function checkAcceptedHistoryStreamContract({rootDir = ROOT} = {}) {
  const contract = validateContract(readJson(rootDir, CONTRACT_PATH));
  const pathContract = readJson(rootDir, PATH_CONTRACT_PATH);
  const positiveSuite = readJson(rootDir, contract.conformance.positiveFixtures);
  const negativeSuite = readJson(rootDir, contract.conformance.negativeFixtures);
  const byCaseId = new Map(positiveSuite.cases.map((fixtureCase) => [fixtureCase.caseId, fixtureCase]));
  const positive = positiveSuite.cases.map((fixtureCase) => {
    const first = runAcceptedHistoryStreamFixture(contract, pathContract, positiveSuite, fixtureCase);
    const replay = runAcceptedHistoryStreamFixture(contract, pathContract, positiveSuite, fixtureCase);
    const firstReceipts = Object.fromEntries(Object.entries(first.consumers).map(([id, consumer]) => [id, consumer.receipt.receiptSha256]));
    const replayReceipts = Object.fromEntries(Object.entries(replay.consumers).map(([id, consumer]) => [id, consumer.receipt.receiptSha256]));
    requireCondition(sameValue(firstReceipts, replayReceipts), "receipt_identity_mismatch", `${fixtureCase.caseId} deterministic replay`);
    return {
      caseId: fixtureCase.caseId,
      producerState: first.producerState,
      acceptedChunks: first.consumers["potential-consumer"].receipt.orderedChunks?.length ?? first.consumers["potential-consumer"].receipt.rowCount,
      consumers: Object.keys(first.consumers).length,
      deterministicReplay: true,
      status: "passed",
    };
  });
  const negative = negativeSuite.cases.map((negativeCase) => {
    const fixtureCase = byCaseId.get(negativeCase.baseCaseId);
    requireCondition(fixtureCase !== undefined, "invalid_contract", `${negativeCase.id} base case`);
    try {
      runNegativeOperation(contract, pathContract, positiveSuite, fixtureCase, negativeCase.operation);
    } catch (error) {
      if (!(error instanceof AcceptedHistoryStreamError) || error.code !== negativeCase.expectedCode) throw error;
      return {caseId: negativeCase.id, refusalCode: error.code, status: "passed"};
    }
    return null;
  });
  return {schema: contract.schema, status: "passed", positive, negative};
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(checkAcceptedHistoryStreamContract(), null, 2));
}
