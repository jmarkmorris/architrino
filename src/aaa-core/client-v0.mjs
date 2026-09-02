import {
  canonicalSha256,
  validatePathInterchangeBundle,
} from "./path-interchange-v0.mjs";
import {negotiateCodec} from "./codec-registry-v0.mjs";
import {AcceptedHistoryStreamBroker} from "./accepted-history-stream-v0.mjs";
import {
  buildPublication,
  computeQueryIdentities,
  retrievePublishedProduct,
} from "./query-transform-publication-v0.mjs";

function clone(value) {
  return value === undefined ? undefined : structuredClone(value);
}

function requireString(value, label) {
  if (typeof value !== "string" || value.length === 0) {
    const error = new Error(`invalid_client_request: ${label}`);
    error.name = "AAAClientError";
    error.code = "invalid_client_request";
    throw error;
  }
  return value;
}

function validateClientContract(contract) {
  if (contract?.schema !== "aaa_core_client/v0" || contract.version !== 0 || contract.status !== "accepted" ||
      contract.owner !== "AAA Core" || !Array.isArray(contract.operations) || contract.operations.length < 9 ||
      contract.consumerConformance?.length !== 2) {
    const error = new Error("invalid_client_contract: AAA Core client control record");
    error.name = "AAAClientError";
    error.code = "invalid_client_contract";
    throw error;
  }
  return contract;
}

function failureFor(error) {
  return {
    source: typeof error?.name === "string" ? error.name : "Error",
    code: typeof error?.code === "string" ? error.code : "unexpected_client_failure",
    message: typeof error?.message === "string" ? error.message : String(error),
  };
}

export class AAAClientService {
  constructor({clientContract, pathContract, codecRegistry, streamContract, queryPublicationContract}) {
    this.clientContract = validateClientContract(clientContract);
    this.pathContract = pathContract;
    this.codecRegistry = codecRegistry;
    this.streamContract = streamContract;
    this.queryPublicationContract = queryPublicationContract;
    const expected = clientContract.dependencies;
    if (pathContract?.interchangeSchema !== expected.pathInterchange || codecRegistry?.schema !== expected.codecRegistry ||
        streamContract?.schema !== expected.acceptedHistoryStream || queryPublicationContract?.schema !== expected.queryTransformPublication) {
      const error = new Error("invalid_client_contract: dependency schema mismatch");
      error.name = "AAAClientError";
      error.code = "invalid_client_contract";
      throw error;
    }
    this.sequence = 0;
    this.operations = new Map();
    this.cache = new Map();
    this.catalog = new Map();
    this.streams = new Map();
  }

  createClient({clientId, applicationId}) {
    return new AAAClient(this, {
      clientId: requireString(clientId, "clientId"),
      applicationId: requireString(applicationId, "applicationId"),
    });
  }

  execute(client, operation, work) {
    if (!this.clientContract.operations.includes(operation) || operation === "inspectOperation") {
      const error = new Error(`invalid_client_request: unsupported operation ${operation}`);
      error.name = "AAAClientError";
      error.code = "invalid_client_request";
      throw error;
    }
    const operationId = `${client.clientId}:${String(this.sequence).padStart(6, "0")}`;
    this.sequence += 1;
    let envelope;
    try {
      const result = work();
      envelope = {
        schema: "aaa_core_client_operation/v0",
        operationId,
        clientId: client.clientId,
        applicationId: client.applicationId,
        operation,
        state: "succeeded",
        progress: {phase: "complete", completedUnits: 1, totalUnits: 1},
        result: clone(result),
        failure: null,
      };
    } catch (error) {
      envelope = {
        schema: "aaa_core_client_operation/v0",
        operationId,
        clientId: client.clientId,
        applicationId: client.applicationId,
        operation,
        state: "failed",
        progress: {phase: "failed", completedUnits: 0, totalUnits: 1},
        result: null,
        failure: failureFor(error),
      };
    }
    this.operations.set(operationId, clone(envelope));
    return clone(envelope);
  }

  inspect(operationId) {
    const operation = this.operations.get(operationId);
    if (!operation) {
      const error = new Error(`unknown_operation: ${operationId}`);
      error.name = "AAAClientError";
      error.code = "unknown_operation";
      throw error;
    }
    return clone(operation);
  }
}

export class AAAClient {
  constructor(service, identity) {
    this.service = service;
    this.clientId = identity.clientId;
    this.applicationId = identity.applicationId;
  }

  validateManifest(bundle) {
    return this.service.execute(this, "validateManifest", () =>
      validatePathInterchangeBundle(this.service.pathContract, clone(bundle)));
  }

  negotiateCodec(request) {
    return this.service.execute(this, "negotiateCodec", () => {
      const provider = negotiateCodec(this.service.codecRegistry, clone(request));
      return {
        capabilityId: provider.capabilityId,
        providerId: provider.providerId,
        deterministicVersion: provider.deterministicVersion,
      };
    });
  }

  prepareQuery(request) {
    return this.service.execute(this, "prepareQuery", () => {
      const {normalized, ...identities} = computeQueryIdentities(this.service.queryPublicationContract, clone(request));
      return {...identities, normalizedRequest: normalized};
    });
  }

  openStream({streamId, fixtureCase, pathBundle}) {
    return this.service.execute(this, "openStream", () => {
      requireString(streamId, "streamId");
      if (this.service.streams.has(streamId)) {
        const error = new Error(`stream_already_open: ${streamId}`);
        error.name = "AAAClientError";
        error.code = "stream_already_open";
        throw error;
      }
      const broker = new AcceptedHistoryStreamBroker({
        contract: this.service.streamContract,
        pathContract: this.service.pathContract,
        fixtureCase: clone(fixtureCase),
        pathBundle: clone(pathBundle),
      });
      this.service.streams.set(streamId, broker);
      return {streamId, progress: broker.result()};
    });
  }

  streamAction({streamId, action}) {
    return this.service.execute(this, "streamAction", () => {
      const broker = this.service.streams.get(streamId);
      if (!broker) {
        const error = new Error(`unknown_stream: ${streamId}`);
        error.name = "AAAClientError";
        error.code = "unknown_stream";
        throw error;
      }
      let actionResult = null;
      switch (action.type) {
        case "subscribe": actionResult = broker.subscribe(action.consumerId, action.cursor); break;
        case "publish": actionResult = broker.publish(action.recordId, action.byteLength); break;
        case "acknowledge": actionResult = broker.acknowledge(action.consumerId, action.sequence); break;
        case "disconnect": actionResult = broker.disconnect(action.consumerId); break;
        case "reconnect": actionResult = broker.reconnect(action.consumerId, action.cursor); break;
        case "seal": actionResult = broker.seal(action.finalSequence, action.acceptedThroughT); break;
        case "halt": actionResult = broker.halt({code: action.code, detail: action.detail,
          failedSequence: action.failedSequence, acceptedThroughT: action.acceptedThroughT}); break;
        case "observe_terminal": actionResult = broker.observeTerminal(action.consumerId, action.expected ?? null); break;
        default: {
          const error = new Error(`invalid_stream_action: ${String(action.type)}`);
          error.name = "AAAClientError";
          error.code = "invalid_stream_action";
          throw error;
        }
      }
      return {streamId, action: action.type, actionResult: clone(actionResult), progress: broker.result()};
    });
  }

  inspectStream(streamId) {
    return this.service.execute(this, "inspectStream", () => {
      const broker = this.service.streams.get(streamId);
      if (!broker) {
        const error = new Error(`unknown_stream: ${streamId}`);
        error.name = "AAAClientError";
        error.code = "unknown_stream";
        throw error;
      }
      return {streamId, progress: broker.result()};
    });
  }

  publish({sourceBundle, request, publisher, permittedConsumers, state}) {
    return this.service.execute(this, "publish", () => {
      const identities = computeQueryIdentities(this.service.queryPublicationContract, clone(request));
      const policyIdentity = canonicalSha256({publisher, permittedConsumers: [...permittedConsumers].sort(), state});
      const cached = this.service.cache.get(identities.cacheIdentity);
      if (cached && cached.policyIdentity === policyIdentity) {
        return {cacheStatus: "hit", publication: clone(cached.publication)};
      }
      const publication = buildPublication({
        contract: this.service.queryPublicationContract,
        pathContract: this.service.pathContract,
        codecRegistry: this.service.codecRegistry,
        sourceBundle: clone(sourceBundle),
        request: clone(request),
        publisher,
        permittedConsumers: clone(permittedConsumers),
        state,
      });
      if (state === "sealed") {
        this.service.cache.set(identities.cacheIdentity, {policyIdentity, publication: clone(publication)});
      }
      this.service.catalog.set(publication.receipt.productId, clone(publication));
      return {cacheStatus: "miss", publication};
    });
  }

  retrieve({consumer = this.applicationId, productId, productContentSha256, receiptSha256}) {
    return this.service.execute(this, "retrieve", () => {
      const publication = this.service.catalog.get(productId);
      if (!publication) {
        const error = new Error(`publication_identity_mismatch: unknown product ${productId}`);
        error.name = "QueryPublicationError";
        error.code = "publication_identity_mismatch";
        throw error;
      }
      return retrievePublishedProduct(publication, consumer, {productId, productContentSha256, receiptSha256});
    });
  }

  inspectOperation(operationId) {
    return this.service.inspect(operationId);
  }
}
