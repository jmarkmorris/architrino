import { preparePdgeditDocumentForDisplay } from "../apps/pdgedit/PdgeditDocumentRuntime.js";

export function prepareAcceptedPdgeditDocument(pdgeditDocument = {}) {
  return preparePdgeditDocumentForDisplay(pdgeditDocument);
}
