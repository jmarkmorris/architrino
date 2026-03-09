export function createMarkdownSceneRegistry(deps) {
  const levelConfigs = deps.levelConfigs ?? {};
  const titleFromSlug = deps.titleFromSlug;
  const resolveMarkdownDocumentTitle = deps.resolveMarkdownDocumentTitle;
  const resolveMarkdownColumnsForPath = deps.resolveMarkdownColumnsForPath;

  // Runtime markdown scenes are intentionally internal helper scenes.
  // Authored scene files should reference markdown content by path/source,
  // while the app may materialize these helper IDs for reading/navigation state.
  const runtimeMarkdownPrefix = "runtime:markdown:";
  const markdownDocPrefix = `${runtimeMarkdownPrefix}doc:`;
  const markdownIndexPrefix = `${runtimeMarkdownPrefix}index:`;
  const markdownReaderPrefix = `${runtimeMarkdownPrefix}reader:`;

  function inferSceneNameFromMarkdownPath(markdownPath) {
    const leaf = String(markdownPath || "").split("/").pop() || "";
    const slug = leaf.replace(/\.md$/i, "");
    return slug ? titleFromSlug(slug) : "Notes";
  }

  async function resolveRuntimeMarkdownTitle(markdownPath) {
    if (typeof resolveMarkdownDocumentTitle === "function") {
      const resolved = await resolveMarkdownDocumentTitle(markdownPath);
      if (typeof resolved === "string" && resolved.trim().length > 0) {
        return resolved;
      }
    }
    return inferSceneNameFromMarkdownPath(markdownPath);
  }

  async function resolveRuntimeMarkdownColumns(markdownPath) {
    if (typeof resolveMarkdownColumnsForPath !== "function") {
      return null;
    }
    const resolved = await resolveMarkdownColumnsForPath(markdownPath);
    return resolved === 1 || resolved === 2 ? resolved : null;
  }

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
      markdownPath,
      markdownSection,
      markdownColumns,
      markdownAutoOpen,
      centerOn: null,
    };
  }

  function getMarkdownReaderSceneId(markdownPath, markdownSection) {
    if (!markdownSection) {
      return `${markdownReaderPrefix}${markdownPath}`;
    }
    return `${markdownReaderPrefix}${markdownPath}::${encodeURIComponent(markdownSection)}`;
  }

  function getMarkdownIndexSceneId(markdownPath, headingLevel) {
    const levelToken = typeof headingLevel === "number" ? `::h${headingLevel}` : "";
    return `${markdownIndexPrefix}${markdownPath}${levelToken}`;
  }

  function getMarkdownSectionIndexSceneId(markdownPath, markdownSection, headingLevel) {
    const sectionToken =
      typeof markdownSection === "string" && markdownSection.length > 0
        ? `::s${encodeURIComponent(markdownSection)}`
        : "";
    const levelToken = typeof headingLevel === "number" ? `::h${headingLevel}` : "";
    return `${markdownIndexPrefix}${markdownPath}${sectionToken}${levelToken}`;
  }

  function getMarkdownDocSceneId(markdownPath) {
    return `${markdownDocPrefix}${markdownPath}`;
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
        markdownPath,
        markdownSection: null,
        markdownColumns,
        markdownAutoOpen: false,
        centerOn: null,
        splitSourcePath: markdownPath,
        splitHeadingLevel: headingLevel,
        splitIncludeExistingInLayout: false,
        splitPlainSectionPaths: markdownPlainSectionPaths,
      };
      return sceneId;
    }

    if (markdownAutoIndex === true) {
      const sceneId = getMarkdownSectionIndexSceneId(markdownPath, markdownSection, headingLevel);
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
        markdownPath,
        markdownSection,
        markdownColumns,
        markdownAutoOpen: false,
        centerOn: null,
        splitSourcePath: markdownPath,
        splitSection: markdownSection,
        splitHeadingLevel: headingLevel,
        splitIncludeExistingInLayout: false,
        splitPlainSectionPaths: markdownPlainSectionPaths,
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

  async function ensureRuntimeMarkdownScene(target) {
    if (typeof target !== "string" || !target.trim()) {
      return null;
    }
    if (levelConfigs[target]) {
      return target;
    }

    if (target.startsWith(markdownDocPrefix)) {
      const markdownPath = target.slice(markdownDocPrefix.length);
      if (!markdownPath) {
        return null;
      }
      const sceneName = await resolveRuntimeMarkdownTitle(markdownPath);
      const markdownColumns = await resolveRuntimeMarkdownColumns(markdownPath);
      return ensureMarkdownDocScene({
        markdownPath,
        name: sceneName,
        markdownColumns,
      });
    }

    if (target.startsWith(markdownReaderPrefix)) {
      const raw = target.slice(markdownReaderPrefix.length);
      if (!raw) {
        return null;
      }
      const sectionSep = raw.indexOf("::");
      const markdownPath = sectionSep === -1 ? raw : raw.slice(0, sectionSep);
      const encodedSection = sectionSep === -1 ? null : raw.slice(sectionSep + 2);
      const markdownSection = encodedSection ? decodeURIComponent(encodedSection) : null;
      if (!markdownPath) {
        return null;
      }
      const sceneName = markdownSection || (await resolveRuntimeMarkdownTitle(markdownPath));
      const markdownColumns = await resolveRuntimeMarkdownColumns(markdownPath);
      return ensureMarkdownReaderScene({
        markdownPath,
        markdownSection,
        name: sceneName,
        markdownColumns,
        markdownAutoIndex: markdownSection ? false : undefined,
      });
    }

    if (target.startsWith(markdownIndexPrefix)) {
      const raw = target.slice(markdownIndexPrefix.length);
      if (!raw) {
        return null;
      }
      let markdownPath = raw;
      let markdownSection = null;
      let headingLevel = 2;
      const sectionTokenIndex = raw.lastIndexOf("::s");
      const headingTokenIndex = raw.lastIndexOf("::h");
      if (sectionTokenIndex > -1 && (headingTokenIndex === -1 || sectionTokenIndex < headingTokenIndex)) {
        const sectionStart = sectionTokenIndex + 3;
        const sectionEnd = headingTokenIndex > -1 ? headingTokenIndex : raw.length;
        const maybePath = raw.slice(0, sectionTokenIndex);
        const encodedSection = raw.slice(sectionStart, sectionEnd);
        if (maybePath && encodedSection) {
          markdownPath = maybePath;
          markdownSection = decodeURIComponent(encodedSection);
        }
      }
      if (headingTokenIndex > -1) {
        const pathEnd = sectionTokenIndex > -1 && sectionTokenIndex < headingTokenIndex
          ? sectionTokenIndex
          : headingTokenIndex;
        const maybePath = raw.slice(0, pathEnd);
        const maybeLevel = Number(raw.slice(headingTokenIndex + 3));
        if (maybePath && Number.isFinite(maybeLevel)) {
          if (!markdownSection) {
            markdownPath = maybePath;
          }
          headingLevel = maybeLevel;
        }
      }
      const sceneName = markdownSection || (await resolveRuntimeMarkdownTitle(markdownPath));
      return ensureMarkdownReaderScene({
        markdownPath,
        markdownSection,
        markdownHeadingLevel: headingLevel,
        markdownAutoIndex: true,
        name: sceneName,
      });
    }

    if (target.endsWith(".md")) {
      const sceneName = await resolveRuntimeMarkdownTitle(target);
      const markdownColumns = await resolveRuntimeMarkdownColumns(target);
      const sceneId = ensureMarkdownDocScene({
        markdownPath: target,
        name: sceneName,
        markdownColumns,
      });
      if (sceneId && !levelConfigs[target]) {
        levelConfigs[target] = levelConfigs[sceneId];
      }
      return sceneId ? target : null;
    }

    return null;
  }

  return {
    runtimeMarkdownPrefix,
    isRuntimeMarkdownTarget: (target) =>
      typeof target === "string" && target.startsWith(runtimeMarkdownPrefix),
    ensureRuntimeMarkdownScene,
    ensureMarkdownDocScene,
    ensureMarkdownReaderScene,
  };
}
