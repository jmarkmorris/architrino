function normalizePath(value) {
  return String(value).replace(/\\/g, "/").replace(/^\.?\//, "").replace(/\/+$/, "");
}

const PERIODIC_SOURCE_SCENE_PATH = "content/scenes/chemistry/periodic_table_scene.json";
const ELEMENT_LEGEND_FIELD = "elementLegend:route";

export function createSceneGraphManifestService(deps = {}) {
  const fetchImpl = deps.fetchImpl;
  const appendCacheBust =
    typeof deps.appendCacheBust === "function" ? deps.appendCacheBust : (path) => path;
  const manifestPath =
    typeof deps.manifestPath === "string" && deps.manifestPath
      ? deps.manifestPath
      : "content/graph/scene_graph.json";
  const logger = deps.logger ?? console;
  let parsedPromise = null;

  function nodeIdForScenePath(scenePath) {
    return `scene:${normalizePath(scenePath)}`;
  }

  function parseManifest(data) {
    if (!data || typeof data !== "object") {
      return null;
    }
    const nodes = Array.isArray(data.nodes) ? data.nodes : [];
    const edges = Array.isArray(data.edges) ? data.edges : [];
    const runtimeRoutes = data.runtimeRoutes && typeof data.runtimeRoutes === "object"
      ? data.runtimeRoutes
      : {};

    const scenePathByNodeId = new Map();
    nodes.forEach((node) => {
      if (!node || typeof node !== "object") {
        return;
      }
      if (node.nodeType !== "scene") {
        return;
      }
      const nodeId = typeof node.nodeId === "string" ? node.nodeId : "";
      const scenePath = typeof node.path === "string" ? normalizePath(node.path) : "";
      if (nodeId && scenePath) {
        scenePathByNodeId.set(nodeId, scenePath);
      }
    });

    const runtimeEdges = edges.filter(
      (edge) => edge && typeof edge === "object" && edge.edgeType === "runtime_generated"
    );
    const runtimeEdgeByFromAndField = new Map();
    runtimeEdges.forEach((edge) => {
      const from = typeof edge.from === "string" ? edge.from : "";
      const field = typeof edge.field === "string" ? edge.field : "";
      if (!from || !field) {
        return;
      }
      runtimeEdgeByFromAndField.set(`${from}|${field}`, edge);
    });

    return {
      scenePathByNodeId,
      runtimeEdges,
      runtimeEdgeByFromAndField,
      periodicRoutes:
        runtimeRoutes.periodicGrid && typeof runtimeRoutes.periodicGrid === "object"
          ? runtimeRoutes.periodicGrid
          : {},
      elementLegendTargets: Array.isArray(runtimeRoutes.elementLegendTargets)
        ? runtimeRoutes.elementLegendTargets
        : [],
    };
  }

  async function loadParsedManifest() {
    if (parsedPromise) {
      return parsedPromise;
    }
    parsedPromise = fetchImpl(appendCacheBust(manifestPath))
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load graph manifest (${response.status})`);
        }
        const data = await response.json();
        return parseManifest(data);
      })
      .catch((error) => {
        if (typeof logger?.warn === "function") {
          logger.warn("[SceneGraphManifestService] Failed to load graph manifest", error);
        }
        return null;
      });
    return parsedPromise;
  }

  async function resolvePeriodicElementScenePath(symbol) {
    const normalizedSymbol = String(symbol || "").trim().toLowerCase();
    if (!normalizedSymbol) {
      return null;
    }
    const parsed = await loadParsedManifest();
    if (!parsed) {
      return null;
    }

    const route = parsed.periodicRoutes[normalizedSymbol];
    if (typeof route === "string" && route.trim()) {
      return normalizePath(route);
    }

    const fromNodeId = nodeIdForScenePath(PERIODIC_SOURCE_SCENE_PATH);
    const field = `periodicGrid:${normalizedSymbol}`;
    const edge = parsed.runtimeEdgeByFromAndField.get(`${fromNodeId}|${field}`);
    if (!edge) {
      return null;
    }
    return parsed.scenePathByNodeId.get(edge.to) ?? null;
  }

  async function listElementLegendTargets() {
    const parsed = await loadParsedManifest();
    if (!parsed) {
      return [];
    }
    if (parsed.elementLegendTargets.length) {
      return parsed.elementLegendTargets
        .map((value) => (typeof value === "string" ? normalizePath(value) : ""))
        .filter(Boolean);
    }
    const targets = new Set();
    parsed.runtimeEdges.forEach((edge) => {
      if (edge.field !== ELEMENT_LEGEND_FIELD) {
        return;
      }
      const targetPath = parsed.scenePathByNodeId.get(edge.to);
      if (targetPath) {
        targets.add(targetPath);
      }
    });
    return [...targets].sort((a, b) => a.localeCompare(b));
  }

  return {
    loadParsedManifest,
    resolvePeriodicElementScenePath,
    listElementLegendTargets,
  };
}
