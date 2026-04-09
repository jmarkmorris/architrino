import {
  createEmptyPdgeditDocument,
  loadPdgeditDocument,
} from "./PdgeditDocumentRuntime.js";
import { loadPdgeditLibraryManifest, selectDefaultPdgeditLibraryManifestEntry } from "./PdgeditLibraryManifestRuntime.js";
import { loadPdgeditTileCatalog } from "./PdgeditTileCatalogRuntime.js";
import { loadPdgeditTemplateCatalog } from "./PdgeditTemplateCatalogRuntime.js";

export const DEFAULT_PDGEDIT_MANIFEST_URL = new URL(
  "../../../content/contracts/examples/pdgedit/manifest.v1.json",
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
  tileCatalogUrl = DEFAULT_PDGEDIT_TILE_CATALOG_URL,
  templateCatalogUrl = DEFAULT_PDGEDIT_TEMPLATE_CATALOG_URL,
} = {}) {
  const [tileCatalog, manifest, templateCatalog] = await Promise.all([
    loadPdgeditTileCatalog({
      fetchImpl,
      specUrl: tileCatalogUrl,
    }),
    loadPdgeditLibraryManifest({
      fetchImpl,
      specUrl: manifestUrl,
    }),
    loadPdgeditTemplateCatalog({
      fetchImpl,
      specUrl: templateCatalogUrl,
    }),
  ]);
  const selectedEntry = selectDefaultPdgeditLibraryManifestEntry(manifest);
  const document = selectedEntry
    ? await loadPdgeditDocument({
        fetchImpl,
        specUrl: selectedEntry.documentPath,
      })
    : createEmptyPdgeditDocument();

  return {
    tileCatalog,
    manifest,
    templateCatalog,
    selectedEntry,
    document,
  };
}

