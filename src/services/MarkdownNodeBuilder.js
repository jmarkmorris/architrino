export function createMarkdownNodeBuilder(deps) {
  const fetchImpl = deps.fetchImpl;
  const appendCacheBust = deps.appendCacheBust;
  const parseMarkdownHeading = deps.parseMarkdownHeading;
  const extractMarkdownSection = deps.extractMarkdownSection;
  const listMarkdownFilesInDir = deps.listMarkdownFilesInDir;
  const listMarkdownDirectoriesInDir = deps.listMarkdownDirectoriesInDir;
  const normalizeMarkdownPath = deps.normalizeMarkdownPath;
  const titleFromSlug = deps.titleFromSlug;
  const stripWalkthroughStepPrefix = deps.stripWalkthroughStepPrefix;
  const extractMarkdownDocumentTitle = deps.extractMarkdownDocumentTitle;
  const compactMarkdownNodeLabel = deps.compactMarkdownNodeLabel;
  const colorTokens = deps.colorTokens ?? {};
  const autoMarkdownPalettes = deps.autoMarkdownPalettes ?? {};
  const defaultAutoMarkdownPaletteName =
    typeof deps.defaultAutoMarkdownPaletteName === "string"
      ? deps.defaultAutoMarkdownPaletteName
      : "legacy";
  const defaultAutoMarkdownPalette = Array.isArray(deps.defaultAutoMarkdownPalette)
    ? deps.defaultAutoMarkdownPalette
    : [];
  const computeRingLayout = deps.computeRingLayout;
  const maxRingNodeRadius = deps.maxRingNodeRadius;
  const ringLayoutDefaults = deps.ringLayoutDefaults ?? { startAngle: Math.PI / 2 };
  const ensureMarkdownSectionIndexScene = deps.ensureMarkdownSectionIndexScene;
  const ensureMarkdownDirectoryScene = deps.ensureMarkdownDirectoryScene;
  const logger = deps.logger ?? console;

  return async function buildAutoMarkdownNodes(scene, existingNodes) {
    const layoutMode =
      typeof scene?.layoutMode === "string" ? scene.layoutMode.toLowerCase() : "";
    const usesRingLayout = layoutMode === "ring" || scene?.autoSphereRing === true;
    if (!usesRingLayout || (!scene?.autoMarkdownDirectory && !scene?.autoMarkdownPath)) {
      return [];
    }
    const currentNodes = Array.isArray(existingNodes) ? existingNodes : [];
    const includeExisting = scene.autoMarkdownIncludeExistingInLayout === true;
    const sectionKey = scene.autoMarkdownSection ?? null;
    let entries = [];
    let useDirectories = false;
    let usedHeadingLevel =
      typeof scene.autoMarkdownHeadingLevel === "number"
        ? scene.autoMarkdownHeadingLevel
        : 3;
    let sectionSubheadings = null;

    if (scene.autoMarkdownPath) {
      const preferredLevels = [usedHeadingLevel];
      if (usedHeadingLevel === 2) {
        preferredLevels.push(3);
      } else if (usedHeadingLevel !== 2) {
        preferredLevels.push(2);
      }
      try {
        const response = await fetchImpl(appendCacheBust(scene.autoMarkdownPath));
        if (response.ok) {
          const text = await response.text();
          let content = text;
          if (sectionKey) {
            const section = extractMarkdownSection(text, sectionKey);
            content = section?.body ?? "";
          }
          const lines = content.split(/\r?\n/);
          for (const level of preferredLevels) {
            const levelEntries = [];
            lines.forEach((line) => {
              const heading = parseMarkdownHeading(line);
              if (heading && heading.level === level) {
                levelEntries.push({ title: heading.title });
              }
            });
            if (levelEntries.length) {
              entries = levelEntries;
              usedHeadingLevel = level;
              break;
            }
          }
          if (!sectionKey && usedHeadingLevel === 2) {
            sectionSubheadings = new Map();
            let currentSection = null;
            text.split(/\r?\n/).forEach((line) => {
              const heading = parseMarkdownHeading(line);
              if (!heading) {
                return;
              }
              if (heading.level === 2) {
                currentSection = heading.title;
                if (!sectionSubheadings.has(currentSection)) {
                  sectionSubheadings.set(currentSection, false);
                }
              } else if (heading.level === 3 && currentSection) {
                sectionSubheadings.set(currentSection, true);
              } else if (heading.level <= 2) {
                currentSection = heading.title;
              }
            });
          }
        }
      } catch (error) {
        if (typeof logger?.warn === "function") {
          logger.warn("Failed to read markdown file", scene.autoMarkdownPath, error);
        }
      }
    } else {
      useDirectories = scene.autoMarkdownSubdirectories === true;
      entries = useDirectories
        ? (await listMarkdownDirectoriesInDir(scene.autoMarkdownDirectory)).sort()
        : (await listMarkdownFilesInDir(scene.autoMarkdownDirectory)).sort();
    }

    if (Array.isArray(scene.autoMarkdownExcludePaths) && scene.autoMarkdownExcludePaths.length) {
      const exclude = new Set(
        scene.autoMarkdownExcludePaths.map((path) => normalizeMarkdownPath(path))
      );
      entries = entries.filter((entry) => !exclude.has(normalizeMarkdownPath(entry)));
    }

    const defaultIndex = scene.autoMarkdownDefaultIndex === true;
    const indexPaths = Array.isArray(scene.autoMarkdownIndexPaths)
      ? new Set(scene.autoMarkdownIndexPaths.map((path) => normalizeMarkdownPath(path)))
      : null;
    const plainPaths = Array.isArray(scene.autoMarkdownPlainPaths)
      ? new Set(scene.autoMarkdownPlainPaths.map((path) => normalizeMarkdownPath(path)))
      : null;
    const plainSectionPaths = Array.isArray(scene.autoMarkdownPlainSectionPaths)
      ? new Set(scene.autoMarkdownPlainSectionPaths.map((path) => normalizeMarkdownPath(path)))
      : null;
    const defaultSectionDepth =
      typeof scene.autoMarkdownSectionDepth === "number"
        ? scene.autoMarkdownSectionDepth
        : 2;
    const pathOverrides =
      scene.autoMarkdownOverrides && typeof scene.autoMarkdownOverrides === "object"
        ? scene.autoMarkdownOverrides
        : null;

    if (!entries.length && !includeExisting) {
      return [];
    }
    const fileInfos = scene.autoMarkdownPath
      ? entries.map((entry) => ({
          title: stripWalkthroughStepPrefix(entry.title) || entry.title,
        }))
      : useDirectories
        ? entries.map((path) => ({ path, isNonEmpty: false }))
        : await Promise.all(
            entries.map(async (path) => {
              try {
                const response = await fetchImpl(appendCacheBust(path));
                if (!response.ok) {
                  return { path, isNonEmpty: false };
                }
                const text = await response.text();
                const headingTitle = extractMarkdownDocumentTitle(text);
                return {
                  path,
                  isNonEmpty: text.trim().length > 0,
                  title: headingTitle,
                };
              } catch (error) {
                if (typeof logger?.warn === "function") {
                  logger.warn("Failed to read markdown file", path, error);
                }
                return { path, isNonEmpty: false };
              }
            })
          );
    const usedIds = new Set(currentNodes.map((node) => node.id));
    const hasCustomNodeRadius = typeof scene.autoMarkdownNodeRadius === "number";
    const hasCustomRingRadius = typeof scene.autoMarkdownRingRadius === "number";
    let baseRadius = hasCustomNodeRadius ? scene.autoMarkdownNodeRadius : 1.6;
    const existingMaxRadius = includeExisting
      ? currentNodes.reduce(
          (maxRadius, node) => Math.max(maxRadius, node.radius ?? 0),
          0
        )
      : 0;
    const layoutRadius = Math.max(baseRadius, existingMaxRadius);
    const paletteName =
      typeof scene.autoMarkdownPaletteName === "string"
        ? scene.autoMarkdownPaletteName
        : defaultAutoMarkdownPaletteName;
    const paletteFromName =
      Array.isArray(autoMarkdownPalettes[paletteName]) &&
      autoMarkdownPalettes[paletteName].length
        ? autoMarkdownPalettes[paletteName]
        : null;
    const palette =
      Array.isArray(scene.autoMarkdownPalette) && scene.autoMarkdownPalette.length
        ? scene.autoMarkdownPalette
        : paletteFromName ?? defaultAutoMarkdownPalette;
    const baseColor = scene.autoMarkdownColor ?? null;
    const maxRingCount =
      typeof scene.autoMarkdownMaxRingCount === "number"
        ? scene.autoMarkdownMaxRingCount
        : 14;
    const autoEntries = [];
    fileInfos.forEach((info) => {
      const entryName = info.title ?? info.path?.split("/").pop() ?? "";
      const slug = useDirectories || info.title ? entryName : entryName.replace(/\.md$/i, "");
      const id = slug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
      if (!id || usedIds.has(id)) {
        return;
      }
      autoEntries.push({ info, slug, id });
    });
    const layoutCount = includeExisting
      ? currentNodes.length + autoEntries.length
      : autoEntries.length;
    let ringRadius = hasCustomRingRadius
      ? scene.autoMarkdownRingRadius
      : Math.max(6, Math.min(layoutCount, maxRingCount) * layoutRadius * 1.4);
    const gridSpacing =
      typeof scene.autoMarkdownGridSpacing === "number"
        ? scene.autoMarkdownGridSpacing
        : layoutRadius * 2.6;
    const useRing = layoutCount <= maxRingCount;
    const columns = useRing ? 1 : Math.ceil(Math.sqrt(layoutCount));
    const rows = useRing ? layoutCount : Math.ceil(layoutCount / columns);
    const startX = useRing ? 0 : -((columns - 1) * gridSpacing) / 2;
    const startY = useRing ? 0 : ((rows - 1) * gridSpacing) / 2;

    if (useRing && layoutCount > 0) {
      if (!hasCustomNodeRadius && !hasCustomRingRadius) {
        const standardLayout = computeRingLayout(
          Array.from({ length: layoutCount }, () => ({ radius: layoutRadius }))
        );
        if (standardLayout) {
          ringRadius = standardLayout.ringRadius;
          baseRadius = standardLayout.nodeRadius;
        }
      } else if (layoutCount > 1) {
        const maxRadius = maxRingNodeRadius(ringRadius, layoutCount);
        if (Number.isFinite(maxRadius) && maxRadius > 0 && maxRadius < baseRadius) {
          baseRadius = maxRadius;
        }
      }
    }

    if (includeExisting) {
      currentNodes.forEach((node) => {
        node.radius = baseRadius;
      });
    }

    const positionForIndex = (index) => {
      if (useRing) {
        const orderIndex = layoutCount - 1 - index;
        const angle =
          ringLayoutDefaults.startAngle + (orderIndex / layoutCount) * Math.PI * 2;
        return [Math.cos(angle) * ringRadius, Math.sin(angle) * ringRadius];
      }
      const row = Math.floor(index / columns);
      const col = index % columns;
      return [startX + col * gridSpacing, startY - row * gridSpacing];
    };
    const colorIndexForLayoutIndex = (layoutIndex) => {
      if (!useRing) {
        return layoutIndex;
      }
      return layoutCount - 1 - layoutIndex;
    };

    if (includeExisting) {
      currentNodes.forEach((node, index) => {
        const [x, y] = positionForIndex(index);
        node.position = [Number(x.toFixed(2)), Number(y.toFixed(2)), 0];
      });
    }

    const isSectionIndex = !!sectionKey;
    const isTwoLevelRoot = !isSectionIndex && scene.autoMarkdownPath && usedHeadingLevel === 2;

    return autoEntries
      .map((entry, index) => {
        const { info, slug, id } = entry;
        const layoutIndex = includeExisting ? currentNodes.length + index : index;
        const [x, y] = positionForIndex(layoutIndex);
        const paletteIndex = colorIndexForLayoutIndex(layoutIndex);
        let color = baseColor ?? palette[paletteIndex % palette.length] ?? "#3a5a8a";
        if (typeof color === "string" && colorTokens[color]) {
          color = colorTokens[color];
        }
        const nodeName = scene.autoMarkdownPath
          ? info.title ?? titleFromSlug(slug)
          : info.title ?? titleFromSlug(slug);
        const node = {
          id,
          name: nodeName,
          shortName: compactMarkdownNodeLabel(nodeName),
          radius: baseRadius,
          position: [Number(x.toFixed(2)), Number(y.toFixed(2)), 0],
          color,
          wrapLabel: scene.wrapLabels ?? true,
        };
        if (scene.autoMarkdownPath) {
          const override = pathOverrides
            ? pathOverrides[normalizeMarkdownPath(scene.autoMarkdownPath)]
            : null;
          const sectionDepth =
            typeof override?.sectionDepth === "number" ? override.sectionDepth : defaultSectionDepth;
          const allowSectionIndex =
            sectionDepth >= 2 &&
            !(plainSectionPaths && plainSectionPaths.has(normalizeMarkdownPath(scene.autoMarkdownPath)));
          const hasSubheadings =
            isTwoLevelRoot && info.title
              ? sectionSubheadings?.get(info.title) === true
              : false;
          if (isTwoLevelRoot && info.title && hasSubheadings && allowSectionIndex) {
            const childScene = ensureMarkdownSectionIndexScene(
              scene.autoMarkdownPath,
              info.title,
              scene
            );
            if (childScene) {
              node.childScene = childScene;
            }
          } else {
            node.markdownPath = scene.autoMarkdownPath;
            node.markdownSection = info.title ?? null;
          }
        } else if (useDirectories) {
          const childScene = ensureMarkdownDirectoryScene(
            info.path,
            scene,
            node.name
          );
          if (childScene) {
            node.childScene = childScene;
          }
        } else if (info.isNonEmpty) {
          const normalizedPath = normalizeMarkdownPath(info.path);
          const override = pathOverrides ? pathOverrides[normalizedPath] : null;
          node.markdownPath = info.path;
          let autoIndex = defaultIndex;
          if (indexPaths && indexPaths.has(normalizedPath)) {
            autoIndex = true;
          }
          if (plainPaths && plainPaths.has(normalizedPath)) {
            autoIndex = false;
          }
          if (override?.mode === "index") {
            autoIndex = true;
          } else if (override?.mode === "doc") {
            autoIndex = false;
          }
          node.markdownAutoIndex = autoIndex;
          if (typeof override?.headingLevel === "number") {
            node.markdownHeadingLevel = override.headingLevel;
          }
          if (override?.columns === 1 || override?.columns === 2) {
            node.markdownColumns = override.columns;
          }
          const sectionDepth =
            typeof override?.sectionDepth === "number" ? override.sectionDepth : defaultSectionDepth;
          const plainSectionList = [];
          if (plainSectionPaths && plainSectionPaths.has(normalizedPath)) {
            plainSectionList.push(info.path);
          }
          if (sectionDepth < 2) {
            plainSectionList.push(info.path);
          }
          if (plainSectionList.length) {
            node.markdownPlainSectionPaths = plainSectionList;
          }
          if (scene.autoMarkdownColumns === 1 || scene.autoMarkdownColumns === 2) {
            node.markdownColumns = scene.autoMarkdownColumns;
          }
        }
        return node;
      })
      .filter(Boolean);
  };
}
