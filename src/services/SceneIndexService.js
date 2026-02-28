export class SceneIndexService {
  constructor() {
    this.scenes = [];
    this.searchEntries = [];
    this.source = "uninitialized";
    this.ready = false;
  }

  async ensure(fetchImpl, graphPath = null) {
    if (this.ready) {
      return this.getSearchEntries();
    }

    if (!graphPath) {
      this.searchEntries = [];
      this.scenes = [];
      this.ready = true;
      this.source = "manifest_missing";
      return this.getSearchEntries();
    }

    const loaded = await this.tryLoadGraphManifest(fetchImpl, graphPath);
    this.ready = true;
    this.source = loaded ? "graph_manifest" : "manifest_unavailable";
    return this.getSearchEntries();
  }

  getScenes() {
    return this.scenes;
  }

  getSearchEntries() {
    return this.searchEntries.length ? this.searchEntries : this.scenes;
  }

  getSource() {
    return this.source;
  }

  async tryLoadGraphManifest(fetchImpl, graphPath) {
    try {
      const response = await fetchImpl(graphPath);
      if (!response.ok) {
        throw new Error("Failed to load scene graph manifest");
      }
      const data = await response.json();
      const entriesFromManifest = this.normalizeManifestEntries(data);
      if (!entriesFromManifest.length) {
        throw new Error("Scene graph manifest has no searchable entries");
      }
      this.searchEntries = entriesFromManifest;
      this.scenes = entriesFromManifest
        .filter((entry) => entry.nodeType === "scene")
        .map((entry) => ({
          id: entry.id,
          name: entry.name,
          path: entry.path,
        }));
      return true;
    } catch (error) {
      console.warn(`[SceneIndexService] Failed to load scene graph manifest: ${error.message}`);
      this.searchEntries = [];
      this.scenes = [];
      return false;
    }
  }

  normalizeManifestEntries(data) {
    if (Array.isArray(data?.searchEntries)) {
      return data.searchEntries
        .map((entry) => this.normalizeSearchEntry(entry))
        .filter((entry) => !!entry);
    }

    if (!Array.isArray(data?.nodes)) {
      return [];
    }
    return data.nodes
      .map((node) => {
        if (!node || typeof node !== "object") {
          return null;
        }
        if (typeof node.searchTarget !== "string" || !node.searchTarget.trim()) {
          return null;
        }
        const normalizedPath = node.searchTarget.trim();
        const normalizedId =
          typeof node.id === "string" && node.id.trim()
            ? node.id.trim()
            : normalizedPath;
        const normalizedName =
          typeof node.name === "string" && node.name.trim()
            ? node.name.trim()
            : normalizedId;
        return {
          id: normalizedId,
          name: normalizedName,
          path: normalizedPath,
          nodeType:
            typeof node.nodeType === "string" && node.nodeType.trim()
              ? node.nodeType.trim()
              : "scene",
        };
      })
      .filter((entry) => !!entry);
  }

  normalizeSearchEntry(entry) {
    if (!entry || typeof entry !== "object") {
      return null;
    }
    const normalizedPath = typeof entry.path === "string" ? entry.path.trim() : "";
    if (!normalizedPath) {
      return null;
    }
    const normalizedId =
      typeof entry.id === "string" && entry.id.trim() ? entry.id.trim() : normalizedPath;
    const normalizedName =
      typeof entry.name === "string" && entry.name.trim()
        ? entry.name.trim()
        : normalizedId;
    const nodeType =
      typeof entry.nodeType === "string" && entry.nodeType.trim()
        ? entry.nodeType.trim()
        : "scene";
    return {
      id: normalizedId,
      name: normalizedName,
      path: normalizedPath,
      nodeType,
    };
  }

}
