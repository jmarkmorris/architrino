#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultRootDir = path.resolve(scriptDir, "..", "..");

export const CONTRACT_DOC_PATH =
  "reference/priorities/solver/work-packet-transport-contract.md";
export const SCHEMA_PATH = "src/contracts/solver-app-bridge/v1/schema.json";
export const BRIDGE_CONTRACT_PATH = "src/solver/app/SolverAppBridgeContract.d.ts";
export const NATIVE_HEADER_PATH = "src/solver/include/architrino/solver/WorkPacket.hpp";
export const NATIVE_SOURCE_PATH = "src/solver/src/WorkPacket.cpp";
export const BRIDGE_SOURCE_PATH = "src/solver/app/SolverAppBridge.mjs";

export const REQUIRED_PACKET_HEADER_FIELDS = Object.freeze([
  "schema",
  "packetId",
  "runId",
  "modelId",
  "precisionPath",
  "sourceBlock",
  "receiverBlock",
  "pathBlock",
  "timeRange",
  "expectedOutputs",
  "inputBuffers",
  "mergeOrder",
  "mergeKey",
]);

export const REQUIRED_BUFFER_REF_FIELDS = Object.freeze([
  "bufferId",
  "layout",
  "numericType",
  "byteOffset",
  "byteLength",
  "rowOffset",
  "rowCount",
  "checksum",
]);

export const REQUIRED_PLAN_FIELDS = Object.freeze([
  "sourceSelections",
  "receiverSelections",
  "chunkPairCount",
  "packetCount",
  "truncated",
  "planChecksum",
  "packets",
]);

function readText(rootDir, relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), "utf8");
}

function readJson(rootDir, relativePath) {
  return JSON.parse(readText(rootDir, relativePath));
}

function requireDocTerm(errors, doc, term) {
  if (!doc.includes(`\`${term}\``) && !doc.includes(term)) {
    errors.push(`contract document must mention ${term}`);
  }
}

function requireSchemaFields(errors, schemaDef, fields, label) {
  const required = new Set(schemaDef?.required ?? []);
  const properties = schemaDef?.properties ?? {};
  for (const field of fields) {
    if (!required.has(field)) {
      errors.push(`${label} schema must require ${field}`);
    }
    if (!Object.prototype.hasOwnProperty.call(properties, field)) {
      errors.push(`${label} schema must define ${field}`);
    }
  }
}

export function auditWorkPacketTransportContract(rootDir = defaultRootDir) {
  const errors = [];
  const doc = readText(rootDir, CONTRACT_DOC_PATH);
  const schema = readJson(rootDir, SCHEMA_PATH);
  const bridgeContract = readText(rootDir, BRIDGE_CONTRACT_PATH);
  const nativeHeader = readText(rootDir, NATIVE_HEADER_PATH);
  const nativeSource = readText(rootDir, NATIVE_SOURCE_PATH);
  const bridgeSource = readText(rootDir, BRIDGE_SOURCE_PATH);

  for (const term of [
    "solver-work-packet.v1",
    "workPacketHeader",
    "workPacketBufferRef",
    "workPacketResultRef",
    "pathHistoryWorkPacketPlanRequest",
    "pathHistoryWorkPacketPlanResponse",
    "headerChecksum",
    "planChecksum",
    "mergeKey",
    "mergeOrder",
    "packetId",
    "sourceBlock",
    "receiverBlock",
    "pathBlock",
    "expectedOutputs",
    "inputBuffers",
    "GPU",
    "service",
    "process",
    "thread",
    "worker",
  ]) {
    requireDocTerm(errors, doc, term);
  }

  for (const field of REQUIRED_PACKET_HEADER_FIELDS) {
    requireDocTerm(errors, doc, field);
  }
  for (const field of REQUIRED_BUFFER_REF_FIELDS) {
    requireDocTerm(errors, doc, field);
  }
  for (const field of REQUIRED_PLAN_FIELDS) {
    requireDocTerm(errors, doc, field);
  }

  requireSchemaFields(
    errors,
    schema.$defs?.workPacketHeader,
    REQUIRED_PACKET_HEADER_FIELDS,
    "workPacketHeader"
  );
  requireSchemaFields(
    errors,
    schema.$defs?.workPacketBufferRef,
    REQUIRED_BUFFER_REF_FIELDS,
    "workPacketBufferRef"
  );
  requireSchemaFields(
    errors,
    schema.$defs?.pathHistoryWorkPacketPlanResponse,
    REQUIRED_PLAN_FIELDS,
    "pathHistoryWorkPacketPlanResponse"
  );

  const mergeOrderEnum =
    schema.$defs?.workPacketCapability?.properties?.deterministicMergeOrder?.items?.enum ?? [];
  for (const field of ["mergeKey", "mergeOrder", "packetId"]) {
    if (!mergeOrderEnum.includes(field)) {
      errors.push(`workPacketCapability deterministic merge order must include ${field}`);
    }
  }

  for (const snippet of [
    "interface SolverWorkPacketHeader",
    "interface SolverWorkPacketBufferRef",
    "interface SolverWorkPacketResultRef",
    "interface SolverPathHistoryWorkPacketPlanRequest",
  ]) {
    if (!bridgeContract.includes(snippet)) {
      errors.push(`bridge contract missing ${snippet}`);
    }
  }

  for (const snippet of [
    "struct WorkPacketHeader",
    "struct WorkPacketBufferRef",
    "struct WorkPacketResultRef",
  ]) {
    if (!nativeHeader.includes(snippet)) {
      errors.push(`native header missing ${snippet}`);
    }
  }

  for (const snippet of [
    "validate_work_packet_header",
    "serialize_work_packet_header",
    "work_packet_header_checksum",
    "deterministic_merge_order",
  ]) {
    if (!nativeSource.includes(snippet)) {
      errors.push(`native source missing ${snippet}`);
    }
  }

  for (const snippet of [
    "prepareWorkPacketHeader",
    "orderWorkPacketResults",
    "planPathHistoryWorkPackets",
    "mergeEmissionShellCandidatePacketResponsesF64",
  ]) {
    if (!bridgeSource.includes(snippet)) {
      errors.push(`bridge source missing ${snippet}`);
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    docPath: CONTRACT_DOC_PATH,
    schemaPath: SCHEMA_PATH,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = auditWorkPacketTransportContract(process.cwd());
  if (!result.ok) {
    for (const error of result.errors) {
      console.error(error);
    }
    process.exit(1);
  }
  console.log("work-packet transport contract audit ok");
}
