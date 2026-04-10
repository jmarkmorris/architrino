import { normalizePdgeditDocument } from "./PdgeditDocumentRuntime.js";

export const PDGEDIT_LAUNCH_PAYLOAD_STORAGE_KEY = "architrino.pdgedit.launch.v1";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

export function createPdgeditLaunchPayload({
  sourceKind = "",
  sourceReference = "",
  documentId = "",
  documentTitle = "",
  pdgeditDocument = {},
} = {}) {
  const normalizedDocument = normalizePdgeditDocument(pdgeditDocument);
  if (normalizedDocument.schema !== "pdgedit/v1") {
    throw new Error("pdgedit launch payload requires a pdgedit/v1 document.");
  }
  const normalizedDocumentId = normalizeText(documentId);
  if (!normalizedDocumentId) {
    throw new Error("pdgedit launch payload requires a document id.");
  }
  const normalizedDocumentTitle = normalizeText(documentTitle) || normalizedDocumentId;
  return {
    schema: "pdgedit-launch/v1",
    sourceKind: normalizeText(sourceKind),
    sourceReference: normalizeText(sourceReference),
    documentId: normalizedDocumentId,
    documentTitle: normalizedDocumentTitle,
    pdgeditDocument: cloneJson(pdgeditDocument),
  };
}

export function normalizePdgeditLaunchPayload(rawPayload = {}) {
  if (normalizeText(rawPayload?.schema) !== "pdgedit-launch/v1") {
    return null;
  }
  try {
    return createPdgeditLaunchPayload(rawPayload);
  } catch {
    return null;
  }
}

export function readPdgeditLaunchPayloadFromStorage({
  storage = globalThis.window?.sessionStorage ?? null,
  storageKey = PDGEDIT_LAUNCH_PAYLOAD_STORAGE_KEY,
  consume = false,
} = {}) {
  if (typeof storage?.getItem !== "function") {
    return null;
  }
  const normalizedStorageKey = normalizeText(storageKey) || PDGEDIT_LAUNCH_PAYLOAD_STORAGE_KEY;
  const rawPayload = storage.getItem(normalizedStorageKey);
  if (!rawPayload) {
    return null;
  }
  let parsedPayload = null;
  try {
    parsedPayload = JSON.parse(rawPayload);
  } catch {
    parsedPayload = null;
  }
  const payload = normalizePdgeditLaunchPayload(parsedPayload);
  if (consume && typeof storage?.removeItem === "function") {
    storage.removeItem(normalizedStorageKey);
  }
  return payload;
}
