export function createMarkdownSceneRegistry(deps) {
  const levelConfigs = deps.levelConfigs ?? {};
  const titleFromSlug = deps.titleFromSlug;
  const normalizeMarkdownKey = deps.normalizeMarkdownKey;

  const markdownDocPrefix = "__markdown_doc__:";
  const markdownIndexPrefix = "__markdown_index__:";
  const markdownReaderPrefix = "__markdown_reader__:";
  const markdownSectionIndexPrefix = "__markdown_section_index__:";
  const markdownDirectoryPrefix = "__markdown_directory__:";

  function resolveNodeMarkdownConfig(nodeData) {
    return {
      markdownPath:
        typeof nodeData?.markdownPath === "string" && nodeData.markdownPath.trim().length > 0
          ? nodeData.markdownPath
          : null,
      markdownSection:
        typeof nodeData?.markdownSection === "string" && nodeData.markdownSection.trim().length > 0
          ? nodeData.markdownSection
          : null,
      markdownColumns: nodeData?.markdownColumns ?? null,
      markdownHeadingLevel:
        typeof nodeData?.markdownHeadingLevel === "number" ? nodeData.markdownHeadingLevel : 2,
      markdownAutoIndex: nodeData?.markdownAutoIndex,
      markdownPlainSectionPaths: Array.isArray(nodeData?.markdownPlainSectionPaths)
        ? nodeData.markdownPlainSectionPaths
        : [],
      sceneName: nodeData?.name ?? "Notes",
    };
  }

  function createMarkdownReaderConfig({
    sceneName,
    sceneId,
    markdownPath,
    markdownSection = null,
    markdownColumns = null,
    markdownAutoOpen = true,
  }) {
    return {
      layout: "static",
      layoutType: null,
      nodes: [],
      links: [],
      sceneName,
      sceneId,
      sceneKind: "branching",
      markdownPath,
      markdownSection,
      markdownColumns,
      markdownAutoOpen,
      centerOn: null,
    };
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
    const { markdownPath, markdownSection, markdownColumns, sceneName } =
      resolveNodeMarkdownConfig(nodeData);
    if (!markdownPath) {
      return null;
    }
    const sceneId = getMarkdownDocSceneId(markdownPath);
    if (levelConfigs[sceneId]) {
      return sceneId;
    }
    levelConfigs[sceneId] = createMarkdownReaderConfig({
      sceneName,
      sceneId,
      markdownPath,
      markdownSection,
      markdownColumns,
      markdownAutoOpen: true,
    });
    return sceneId;
  }

  function ensureMarkdownReaderScene(nodeData) {
    const {
      markdownPath,
      markdownSection,
      markdownColumns,
      markdownHeadingLevel: headingLevel,
      markdownAutoIndex,
      markdownPlainSectionPaths,
      sceneName,
    } = resolveNodeMarkdownConfig(nodeData);
    if (!markdownPath) {
      return null;
    }

    if (!markdownSection) {
      if (markdownAutoIndex === false) {
        const sceneId = getMarkdownDocSceneId(markdownPath);
        if (levelConfigs[sceneId]) {
          return sceneId;
        }
        levelConfigs[sceneId] = createMarkdownReaderConfig({
          sceneName,
          sceneId,
          markdownPath,
          markdownSection: null,
          markdownColumns,
          markdownAutoOpen: true,
        });
        return sceneId;
      }
      const sceneId = getMarkdownIndexSceneId(markdownPath, headingLevel);
      if (levelConfigs[sceneId]) {
        return sceneId;
      }
      levelConfigs[sceneId] = {
        layout: "static",
        layoutType: "rings",
        nodes: [],
        links: [],
        sceneName,
        sceneId,
        sceneKind: "branching",
        markdownPath,
        markdownSection: null,
        markdownColumns,
        markdownAutoOpen: false,
        centerOn: null,
        autoMarkdownPath: markdownPath,
        autoMarkdownHeadingLevel: headingLevel,
        autoMarkdownIncludeExistingInLayout: false,
        autoMarkdownPlainSectionPaths: markdownPlainSectionPaths,
      };
      return sceneId;
    }

    const sceneId = getMarkdownReaderSceneId(markdownPath, markdownSection);
    if (levelConfigs[sceneId]) {
      return sceneId;
    }
    levelConfigs[sceneId] = createMarkdownReaderConfig({
      sceneName,
      sceneId,
      markdownPath,
      markdownSection,
      markdownColumns,
      markdownAutoOpen: true,
    });
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
      layoutType: "rings",
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
      layoutType: "rings",
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

  return {
    ensureMarkdownDocScene,
    ensureMarkdownReaderScene,
    ensureMarkdownSectionIndexScene,
    ensureMarkdownDirectoryScene,
  };
}
