import {
  createEmptyPdgeditDocument,
  loadPdgeditDocument,
  preparePdgeditDocumentForDisplay,
} from "./PdgeditDocumentRuntime.js";
import {
  normalizePdgeditLaunchPayload,
  readPdgeditLaunchPayloadFromStorage,
} from "./PdgeditLaunchPayloadRuntime.js";
import {
  loadPdgeditLibraryManifest,
  mergePdgeditLibraryManifests,
  selectDefaultPdgeditLibraryManifestEntry,
} from "./PdgeditLibraryManifestRuntime.js";
import { loadPdgeditTileCatalog } from "./PdgeditTileCatalogRuntime.js";
import { loadPdgeditTemplateCatalog } from "./PdgeditTemplateCatalogRuntime.js";

export const DEFAULT_PDGEDIT_MANIFEST_URL = new URL(
  "../../../content/contracts/examples/pdgedit/manifest.v1.json",
  import.meta.url
).href;
export const DEFAULT_PDGEDIT_LIVE_MANIFEST_URL = new URL(
  "../../../.tmp/pdgsolve/pdgedit/manifest.v1.json",
  import.meta.url
).href;

export const DEFAULT_PDGEDIT_TILE_CATALOG_URL = new URL("./pdgedit-tiles.json", import.meta.url).href;

export const DEFAULT_PDGEDIT_TEMPLATE_CATALOG_URL = new URL(
  "../../../content/contracts/examples/pdgedit/four_tile_family_coverage.v1.json",
  import.meta.url
).href;

export async function loadPdgeditContractBootstrapSeed({
  fetchImpl = typeof globalThis.fetch === "function" ? globalThis.fetch.bind(globalThis) : null,
  manifestUrl = DEFAULT_PDGEDIT_MANIFEST_URL,
  liveManifestUrl = DEFAULT_PDGEDIT_LIVE_MANIFEST_URL,
  tileCatalogUrl = DEFAULT_PDGEDIT_TILE_CATALOG_URL,
  templateCatalogUrl = DEFAULT_PDGEDIT_TEMPLATE_CATALOG_URL,
  launchPayload = null,
  launchPayloadLoader = () => readPdgeditLaunchPayloadFromStorage({ consume: true }),
} = {}) {
  const [tileCatalog, manifest, liveManifest, templateCatalog] = await Promise.all([
    loadPdgeditTileCatalog({
      fetchImpl,
      specUrl: tileCatalogUrl,
    }),
    loadPdgeditLibraryManifest({
      fetchImpl,
      specUrl: manifestUrl,
    }),
    loadPdgeditLibraryManifest({
      fetchImpl,
      specUrl: liveManifestUrl,
      allowMissing: true,
    }),
    loadPdgeditTemplateCatalog({
      fetchImpl,
      specUrl: templateCatalogUrl,
    }),
  ]);
  const mergedManifest = mergePdgeditLibraryManifests(manifest, liveManifest);
  const normalizedLaunchPayload =
    normalizePdgeditLaunchPayload(launchPayload) ??
    normalizePdgeditLaunchPayload(typeof launchPayloadLoader === "function" ? await launchPayloadLoader() : null);
  const selectedEntry = normalizedLaunchPayload
    ? {
        id: normalizedLaunchPayload.documentId,
        title: normalizedLaunchPayload.documentTitle,
        displayTitle: normalizedLaunchPayload.documentTitle,
        documentPath: "",
        sourceKind: "exact",
      }
    : selectDefaultPdgeditLibraryManifestEntry(mergedManifest);
  const document = normalizedLaunchPayload
    ? preparePdgeditDocumentForDisplay(normalizedLaunchPayload.pdgeditDocument)
    : selectedEntry
    ? await loadPdgeditDocument({
        fetchImpl,
        specUrl: selectedEntry.documentPath,
      })
    : createEmptyPdgeditDocument();

  return {
    tileCatalog,
    manifest: mergedManifest,
    templateCatalog,
    selectedEntry,
    document,
    launchPayload: normalizedLaunchPayload,
  };
}
