async function inferRestoredMarkdownColumns(markdownPath, resolveMarkdownColumnsForPath) {
  if (typeof resolveMarkdownColumnsForPath === "function") {
    const resolved = await resolveMarkdownColumnsForPath(markdownPath);
    if (resolved === 1 || resolved === 2) {
      return resolved;
    }
  }
  if (
    typeof markdownPath === "string" &&
    markdownPath.startsWith("content/markdown/aaa/archie/")
  ) {
    return 1;
  }
  return null;
}

export function createMarkdownSceneRegistry(deps) {
  const levelConfigs = deps.levelConfigs ?? {};
  const titleFromSlug = deps.titleFromSlug;
  const stripWalkthroughStepPrefix = deps.stripWalkthroughStepPrefix;
  const normalizeMarkdownKey = deps.normalizeMarkdownKey;
  const resolveMarkdownDocumentTitle = deps.resolveMarkdownDocumentTitle;
  const resolveMarkdownSectionTitleByKey = deps.resolveMarkdownSectionTitleByKey;
  const resolveMarkdownColumnsForPath = deps.resolveMarkdownColumnsForPath;
  const markdownReaderScenes = new Set();

  const markdownDocPrefix = "__markdown_doc__:";
  const markdownIndexPrefix = "__markdown_index__:";
  const markdownReaderPrefix = "__markdown_reader__:";
  const markdownSectionIndexPrefix = "__markdown_section_index__:";
  const markdownDirectoryPrefix = "__markdown_directory__:";

  function inferSceneNameFromMarkdownPath(markdownPath) {
    const leaf = String(markdownPath || "").split("/").pop() || "";
    const slug = leaf.replace(/\.md$/i, "");
    return slug ? stripWalkthroughStepPrefix(titleFromSlug(slug)) : "Notes";
  }

  function getMarkdownReaderSceneId(markdownPath, markdownSection) {
    if (!markdownSection) {
      return `__markdown_reader__:${markdownPath}`;
    }
    const normalized = normalizeMarkdownKey(markdownSection);
    return `__markdown_reader__:${markdownPath}::${normalized}`;
  }

  function getMarkdownIndexSceneId(markdownPath, headingLevel) {
    const levelToken = typeof headingLevel === "number" ? `::h${headingLevel}` : "";
    return `__markdown_index__:${markdownPath}${levelToken}`;
  }

  function getMarkdownDocSceneId(markdownPath) {
    return `__markdown_doc__:${markdownPath}`;
  }

  function getMarkdownSectionIndexSceneId(markdownPath, markdownSection) {
    const normalized = normalizeMarkdownKey(markdownSection);
    return `__markdown_section_index__:${markdownPath}::${normalized}`;
  }

  function getMarkdownDirectorySceneId(directory) {
    return `__markdown_directory__:${directory}`;
  }

  function ensureMarkdownDocScene(nodeData) {
    const markdownPath = nodeData?.markdownPath;
    if (!markdownPath) {
      return null;
    }
    const sceneId = getMarkdownDocSceneId(markdownPath);
    if (levelConfigs[sceneId]) {
      return sceneId;
    }
    levelConfigs[sceneId] = {
      layout: "static",
      nodes: [],
      links: [],
      sceneName: nodeData.name ?? "Notes",
      sceneId,
      sceneKind: "branching",
      markdownPath,
      markdownSection: nodeData.markdownSection ?? null,
      markdownColumns: nodeData.markdownColumns ?? null,
      markdownAutoOpen: true,
      centerOn: null,
    };
    markdownReaderScenes.add(sceneId);
    return sceneId;
  }

  function ensureMarkdownReaderScene(nodeData) {
    const markdownPath = nodeData.markdownPath;
    if (!markdownPath) {
      return null;
    }
    const sceneName = nodeData.name ?? "Notes";
    const markdownSection = nodeData.markdownSection ?? null;
    const headingLevel =
      typeof nodeData.markdownHeadingLevel === "number" ? nodeData.markdownHeadingLevel : 2;

    if (!markdownSection) {
      if (nodeData.markdownAutoIndex === false) {
        const sceneId = getMarkdownDocSceneId(markdownPath);
        if (levelConfigs[sceneId]) {
          return sceneId;
        }
        levelConfigs[sceneId] = {
          layout: "static",
          nodes: [],
          links: [],
          sceneName,
          sceneId,
          sceneKind: "branching",
          markdownPath,
          markdownSection: null,
          markdownColumns: nodeData.markdownColumns ?? null,
          markdownAutoOpen: true,
          centerOn: null,
        };
        markdownReaderScenes.add(sceneId);
        return sceneId;
      }
      const sceneId = getMarkdownIndexSceneId(markdownPath, headingLevel);
      if (levelConfigs[sceneId]) {
        return sceneId;
      }
      levelConfigs[sceneId] = {
        layout: "static",
        layoutMode: "rings",
        nodes: [],
        links: [],
        sceneName,
        sceneId,
        sceneKind: "branching",
        markdownPath,
        markdownSection: null,
        markdownColumns: nodeData.markdownColumns ?? null,
        markdownAutoOpen: false,
        centerOn: null,
        autoMarkdownPath: markdownPath,
        autoMarkdownHeadingLevel: headingLevel,
        autoMarkdownIncludeExistingInLayout: false,
        autoMarkdownPlainSectionPaths: Array.isArray(nodeData.markdownPlainSectionPaths)
          ? nodeData.markdownPlainSectionPaths
          : [],
      };
      markdownReaderScenes.add(sceneId);
      return sceneId;
    }

    const sceneId = getMarkdownReaderSceneId(markdownPath, markdownSection);
    if (levelConfigs[sceneId]) {
      return sceneId;
    }
    levelConfigs[sceneId] = {
      layout: "static",
      nodes: [],
      links: [],
      sceneName,
      sceneId,
      sceneKind: "branching",
      markdownPath,
      markdownSection,
      markdownColumns: nodeData.markdownColumns ?? null,
      markdownAutoOpen: true,
      centerOn: null,
    };
    markdownReaderScenes.add(sceneId);
    return sceneId;
  }

  function ensureMarkdownSectionIndexScene(markdownPath, markdownSection, parentScene) {
    if (!markdownPath || !markdownSection) {
      return null;
    }
    const sceneId = getMarkdownSectionIndexSceneId(markdownPath, markdownSection);
    if (levelConfigs[sceneId]) {
      return sceneId;
    }
    levelConfigs[sceneId] = {
      layout: "static",
      layoutMode: "rings",
      nodes: [],
      links: [],
      sceneName: markdownSection,
      sceneId,
      sceneKind: "branching",
      markdownPath,
      markdownSection,
      markdownColumns: parentScene?.autoMarkdownColumns ?? null,
      markdownAutoOpen: false,
      centerOn: null,
      autoMarkdownPath: markdownPath,
      autoMarkdownSection: markdownSection,
      autoMarkdownHeadingLevel: 3,
      autoMarkdownIncludeExistingInLayout: false,
      autoMarkdownNodeRadius: parentScene?.autoMarkdownNodeRadius,
      autoMarkdownRingRadius: parentScene?.autoMarkdownRingRadius,
      autoMarkdownMaxRingCount: parentScene?.autoMarkdownMaxRingCount,
      autoMarkdownGridSpacing: parentScene?.autoMarkdownGridSpacing,
      autoMarkdownColumns: parentScene?.autoMarkdownColumns,
      autoMarkdownPalette: parentScene?.autoMarkdownPalette,
      autoMarkdownPaletteName: parentScene?.autoMarkdownPaletteName,
      autoMarkdownColor: parentScene?.autoMarkdownColor,
    };
    return sceneId;
  }

  function ensureMarkdownDirectoryScene(directory, parentScene, nodeName) {
    if (!directory) {
      return null;
    }
    const sceneId = getMarkdownDirectorySceneId(directory);
    if (levelConfigs[sceneId]) {
      return sceneId;
    }
    levelConfigs[sceneId] = {
      layout: "static",
      layoutMode: "rings",
      nodes: [],
      links: [],
      sceneName: nodeName ?? titleFromSlug(directory.split("/").pop() ?? "Notes"),
      sceneId,
      sceneKind: "branching",
      markdownPath: null,
      markdownSection: null,
      markdownColumns: null,
      markdownAutoOpen: false,
      centerOn: null,
      autoMarkdownDirectory: directory,
      autoMarkdownIncludeExistingInLayout: false,
      autoMarkdownNodeRadius: parentScene?.autoMarkdownNodeRadius,
      autoMarkdownRingRadius: parentScene?.autoMarkdownRingRadius,
      autoMarkdownMaxRingCount: parentScene?.autoMarkdownMaxRingCount,
      autoMarkdownGridSpacing: parentScene?.autoMarkdownGridSpacing,
      autoMarkdownColumns: parentScene?.autoMarkdownColumns,
      autoMarkdownPalette: parentScene?.autoMarkdownPalette,
      autoMarkdownPaletteName: parentScene?.autoMarkdownPaletteName,
      autoMarkdownColor: parentScene?.autoMarkdownColor,
    };
    return sceneId;
  }

  async function ensureSceneConfigFromSceneId(sceneId) {
    if (!sceneId || typeof sceneId !== "string" || levelConfigs[sceneId]) {
      return !!levelConfigs[sceneId];
    }

    if (sceneId.startsWith(markdownDocPrefix)) {
      const markdownPath = sceneId.slice(markdownDocPrefix.length);
      if (!markdownPath) {
        return false;
      }
      const resolvedDocTitle = await resolveMarkdownDocumentTitle(markdownPath);
      levelConfigs[sceneId] = {
        layout: "static",
        nodes: [],
        links: [],
        sceneName: resolvedDocTitle || inferSceneNameFromMarkdownPath(markdownPath),
        sceneId,
        sceneKind: "branching",
        markdownPath,
        markdownSection: null,
        markdownColumns: await inferRestoredMarkdownColumns(
          markdownPath,
          resolveMarkdownColumnsForPath
        ),
        markdownAutoOpen: true,
        centerOn: null,
      };
      return true;
    }

    if (sceneId.startsWith(markdownIndexPrefix)) {
      const raw = sceneId.slice(markdownIndexPrefix.length);
      if (!raw) {
        return false;
      }
      let markdownPath = raw;
      let headingLevel = 2;
      const headingTokenIndex = raw.lastIndexOf("::h");
      if (headingTokenIndex > -1) {
        const maybePath = raw.slice(0, headingTokenIndex);
        const maybeLevel = Number(raw.slice(headingTokenIndex + 3));
        if (maybePath && Number.isFinite(maybeLevel)) {
          markdownPath = maybePath;
          headingLevel = maybeLevel;
        }
      }
      const resolvedDocTitle = await resolveMarkdownDocumentTitle(markdownPath);
      levelConfigs[sceneId] = {
        layout: "static",
        layoutMode: "rings",
        nodes: [],
        links: [],
        sceneName: resolvedDocTitle || inferSceneNameFromMarkdownPath(markdownPath),
        sceneId,
        sceneKind: "branching",
        markdownPath,
        markdownSection: null,
        markdownColumns: await inferRestoredMarkdownColumns(
          markdownPath,
          resolveMarkdownColumnsForPath
        ),
        markdownAutoOpen: false,
        centerOn: null,
        autoMarkdownPath: markdownPath,
        autoMarkdownHeadingLevel: headingLevel,
        autoMarkdownIncludeExistingInLayout: false,
        autoMarkdownPlainSectionPaths: [],
      };
      return true;
    }

    if (sceneId.startsWith(markdownReaderPrefix)) {
      const raw = sceneId.slice(markdownReaderPrefix.length);
      if (!raw) {
        return false;
      }
      const sectionSep = raw.indexOf("::");
      const markdownPath = sectionSep === -1 ? raw : raw.slice(0, sectionSep);
      const normalizedSectionKey = sectionSep === -1 ? null : raw.slice(sectionSep + 2);
      if (!markdownPath) {
        return false;
      }
      let markdownSection = null;
      if (normalizedSectionKey) {
        markdownSection = await resolveMarkdownSectionTitleByKey(
          markdownPath,
          normalizedSectionKey
        );
        if (!markdownSection) {
          return false;
        }
      }
      const resolvedDocTitle = await resolveMarkdownDocumentTitle(markdownPath);
      levelConfigs[sceneId] = {
        layout: "static",
        nodes: [],
        links: [],
        sceneName: markdownSection || resolvedDocTitle || inferSceneNameFromMarkdownPath(markdownPath),
        sceneId,
        sceneKind: "branching",
        markdownPath,
        markdownSection,
        markdownColumns: await inferRestoredMarkdownColumns(
          markdownPath,
          resolveMarkdownColumnsForPath
        ),
        markdownAutoOpen: true,
        centerOn: null,
      };
      return true;
    }

    if (sceneId.startsWith(markdownSectionIndexPrefix)) {
      const raw = sceneId.slice(markdownSectionIndexPrefix.length);
      if (!raw) {
        return false;
      }
      const sectionSep = raw.indexOf("::");
      if (sectionSep === -1) {
        return false;
      }
      const markdownPath = raw.slice(0, sectionSep);
      const normalizedSectionKey = raw.slice(sectionSep + 2);
      if (!markdownPath || !normalizedSectionKey) {
        return false;
      }
      const markdownSection = await resolveMarkdownSectionTitleByKey(
        markdownPath,
        normalizedSectionKey
      );
      if (!markdownSection) {
        return false;
      }
      levelConfigs[sceneId] = {
        layout: "static",
        layoutMode: "rings",
        nodes: [],
        links: [],
        sceneName: markdownSection,
        sceneId,
        sceneKind: "branching",
        markdownPath,
        markdownSection,
        markdownColumns: await inferRestoredMarkdownColumns(
          markdownPath,
          resolveMarkdownColumnsForPath
        ),
        markdownAutoOpen: false,
        centerOn: null,
        autoMarkdownPath: markdownPath,
        autoMarkdownSection: markdownSection,
        autoMarkdownHeadingLevel: 3,
        autoMarkdownIncludeExistingInLayout: false,
      };
      return true;
    }

    if (sceneId.startsWith(markdownDirectoryPrefix)) {
      const directory = sceneId.slice(markdownDirectoryPrefix.length);
      if (!directory) {
        return false;
      }
      levelConfigs[sceneId] = {
        layout: "static",
        layoutMode: "rings",
        nodes: [],
        links: [],
        sceneName: titleFromSlug(directory.split("/").pop() || "Notes"),
        sceneId,
        sceneKind: "branching",
        markdownPath: null,
        markdownSection: null,
        markdownColumns: null,
        markdownAutoOpen: false,
        centerOn: null,
        autoMarkdownDirectory: directory,
        autoMarkdownIncludeExistingInLayout: false,
      };
      return true;
    }

    return false;
  }

  return {
    ensureSceneConfigFromSceneId,
    ensureMarkdownDocScene,
    ensureMarkdownReaderScene,
    ensureMarkdownSectionIndexScene,
    ensureMarkdownDirectoryScene,
    isMarkdownReaderScene: (sceneId) => markdownReaderScenes.has(sceneId),
  };
}
