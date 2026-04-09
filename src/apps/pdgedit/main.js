import {
  loadPdgeditLibraryManifest,
  selectDefaultPdgeditLibraryManifestEntry,
} from "./PdgeditLibraryManifestRuntime.js";

const DEFAULT_PDGEDIT_MANIFEST_URL = new URL(
  "../../../content/contracts/examples/pdgedit/manifest.v1.json",
  import.meta.url
).href;

// Reserved for the authored-surface bootstrap seed. The review harness lives under ./review/main.js.
export async function loadPdgeditContractBootstrapSeed({
  fetchImpl = typeof globalThis.fetch === "function" ? globalThis.fetch.bind(globalThis) : null,
  manifestUrl = DEFAULT_PDGEDIT_MANIFEST_URL,
} = {}) {
  const manifest = await loadPdgeditLibraryManifest({
    fetchImpl,
    specUrl: manifestUrl,
  });
  return {
    manifest,
    selectedEntry: selectDefaultPdgeditLibraryManifestEntry(manifest),
  };
}

export { DEFAULT_PDGEDIT_MANIFEST_URL };
