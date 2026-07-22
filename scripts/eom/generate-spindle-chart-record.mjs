#!/usr/bin/env node

// Compatibility wrapper for the former prescribed-chart generator path.
// All geometry, validation, record generation, and CLI behavior are owned by
// generate-prescribed-braid-record.mjs.

import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  PRESCRIBED_BRAID_TARGETS,
  createPrescribedBraidExactSourceRecord,
  evaluatePrescribedBraidSite,
  generatePrescribedBraidRecord,
  runPrescribedBraidCli,
  serializePrescribedBraidRecord,
  validatePrescribedBraidSpec,
} from "./generate-prescribed-braid-record.mjs";

export const SPINDLE_CHART_TARGETS = Object.freeze(PRESCRIBED_BRAID_TARGETS.slice(6, 10));
export const validateSpindleChartSpec = validatePrescribedBraidSpec;
export const createSpindleExactSourceRecord = createPrescribedBraidExactSourceRecord;
export const generateSpindleChartRecord = generatePrescribedBraidRecord;
export const serializeSpindleChartRecord = serializePrescribedBraidRecord;

export function evaluateSpindleSite(spec, layerIndex, endpointIndex, time) {
  return evaluatePrescribedBraidSite(spec, 0, layerIndex, endpointIndex, time);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) runPrescribedBraidCli();
