export function createMarkdownNodeBuilder(deps) {
  const fetchImpl = deps.fetchImpl;
  const appendCacheBust = deps.appendCacheBust;
  const parseMarkdownHeading = deps.parseMarkdownHeading;
  const extractMarkdownSection = deps.extractMarkdownSection;
  const normalizeMarkdownKey = deps.normalizeMarkdownKey ?? ((value) => value);
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
  const logger = deps.logger ?? console;

  return async function buildAutoMarkdownNodes(scene, existingNodes) {
    const layoutType = typeof scene?.layoutType === "string" ? scene.layoutType.toLowerCase() : "";
    const usesRingLayout = layoutType === "rings";
    if (!usesRingLayout || !scene?.splitSourcePath) {
      return [];
    }
    const currentNodes = Array.isArray(existingNodes) ? existingNodes : [];
    const includeExisting = scene.splitIncludeExistingInLayout === true;
    const sectionKey = scene.splitSection ?? null;
    let entries = [];
    let usedHeadingLevel =
      typeof scene.splitHeadingLevel === "number"
        ? scene.splitHeadingLevel
        : 3;
    let sectionSubheadings = null;

    if (scene.splitSourcePath) {
      const preferredLevels = [usedHeadingLevel];
      if (usedHeadingLevel === 2) {
        preferredLevels.push(3);
      } else if (usedHeadingLevel !== 2) {
        preferredLevels.push(2);
      }
      try {
        const response = await fetchImpl(appendCacheBust(scene.splitSourcePath));
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
          logger.warn("Failed to read markdown file", scene.splitSourcePath, error);
        }
      }
    }

    if (Array.isArray(scene.splitExcludePaths) && scene.splitExcludePaths.length) {
      const exclude = new Set(
        scene.splitExcludePaths.map((path) => normalizeMarkdownPath(path))
      );
      entries = entries.filter((entry) => !exclude.has(normalizeMarkdownPath(entry)));
    }

    const defaultIndex = scene.splitDefaultIndex === true;
    const indexPaths = Array.isArray(scene.splitIndexPaths)
      ? new Set(scene.splitIndexPaths.map((path) => normalizeMarkdownPath(path)))
      : null;
    const plainPaths = Array.isArray(scene.splitPlainPaths)
      ? new Set(scene.splitPlainPaths.map((path) => normalizeMarkdownPath(path)))
      : null;
    const plainSectionPaths = Array.isArray(scene.splitPlainSectionPaths)
      ? new Set(scene.splitPlainSectionPaths.map((path) => normalizeMarkdownPath(path)))
      : null;
    const defaultSectionDepth =
      typeof scene.splitSectionDepth === "number"
        ? scene.splitSectionDepth
        : 2;
    const pathOverrides =
      scene.splitOverrides && typeof scene.splitOverrides === "object"
        ? scene.splitOverrides
        : null;
    const sectionOverrides =
      scene.splitSectionOverrides && typeof scene.splitSectionOverrides === "object"
        ? scene.splitSectionOverrides
        : null;

    if (!entries.length && !includeExisting) {
      return [];
    }
    const fileInfos = scene.splitSourcePath
      ? entries.map((entry) => ({
          title: stripWalkthroughStepPrefix(entry.title) || entry.title,
        }))
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
    const hasCustomNodeRadius = typeof scene.splitNodeRadius === "number";
    const hasCustomRingRadius = typeof scene.splitRingRadius === "number";
    let baseRadius = hasCustomNodeRadius ? scene.splitNodeRadius : 1.6;
    const existingMaxRadius = includeExisting
      ? currentNodes.reduce(
          (maxRadius, node) => Math.max(maxRadius, node.radius ?? 0),
          0
        )
      : 0;
    const layoutRadius = Math.max(baseRadius, existingMaxRadius);
    const paletteName =
      typeof scene.splitPaletteName === "string"
        ? scene.splitPaletteName
        : defaultAutoMarkdownPaletteName;
    const paletteFromName =
      Array.isArray(autoMarkdownPalettes[paletteName]) &&
      autoMarkdownPalettes[paletteName].length
        ? autoMarkdownPalettes[paletteName]
        : null;
    const palette =
      Array.isArray(scene.splitPalette) && scene.splitPalette.length
        ? scene.splitPalette
        : paletteFromName ?? defaultAutoMarkdownPalette;
    const baseColor = scene.splitColor ?? null;
    const maxRingCount =
      typeof scene.splitMaxRingCount === "number"
        ? scene.splitMaxRingCount
        : 14;
    const autoEntries = [];
    fileInfos.forEach((info) => {
      const entryName = info.title ?? info.path?.split("/").pop() ?? "";
      const slug = info.title ? entryName : entryName.replace(/\.md$/i, "");
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
      ? scene.splitRingRadius
      : Math.max(6, Math.min(layoutCount, maxRingCount) * layoutRadius * 1.4);
    const gridSpacing =
      typeof scene.splitGridSpacing === "number"
        ? scene.splitGridSpacing
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
    let colorBag = Array.isArray(palette) && palette.length ? [...palette] : [];
    const shuffleInPlace = (list) => {
      for (let i = list.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
      return list;
    };
    if (colorBag.length > 1) {
      shuffleInPlace(colorBag);
    }
    const drawPaletteColor = () => {
      if (!colorBag.length) {
        colorBag = Array.isArray(palette) ? [...palette] : [];
        if (colorBag.length > 1) {
          shuffleInPlace(colorBag);
        }
      }
      return colorBag.pop();
    };

    if (includeExisting) {
      currentNodes.forEach((node, index) => {
        const [x, y] = positionForIndex(index);
        node.position = [Number(x.toFixed(2)), Number(y.toFixed(2)), 0];
      });
    }

    const isSectionIndex = !!sectionKey;
    const isTwoLevelRoot = !isSectionIndex && scene.splitSourcePath && usedHeadingLevel === 2;

    return autoEntries
      .map((entry, index) => {
        const { info, slug, id } = entry;
        const sectionOverrideKey =
          scene.splitSourcePath && info.title ? normalizeMarkdownKey(info.title) : null;
        const sectionOverride =
          sectionOverrideKey && sectionOverrides ? sectionOverrides[sectionOverrideKey] : null;
        const nodeId =
          typeof sectionOverride?.id === "string" && sectionOverride.id.trim().length > 0
            ? sectionOverride.id.trim()
            : id;
        const layoutIndex = includeExisting ? currentNodes.length + index : index;
        const [x, y] = positionForIndex(layoutIndex);
        let color = baseColor ?? drawPaletteColor() ?? "#3a5a8a";
        if (
          typeof sectionOverride?.color === "string" &&
          sectionOverride.color.trim().length > 0
        ) {
          color = sectionOverride.color.trim();
        }
        if (typeof color === "string" && colorTokens[color]) {
          color = colorTokens[color];
        }
        const nodeName = scene.splitSourcePath
          ? info.title ?? titleFromSlug(slug)
          : info.title ?? titleFromSlug(slug);
        const node = {
          id: nodeId,
          name: nodeName,
          shortName: compactMarkdownNodeLabel(nodeName),
          radius: baseRadius,
          position: [Number(x.toFixed(2)), Number(y.toFixed(2)), 0],
          color,
          wrapLabel: scene.wrapLabels ?? true,
        };
        if (typeof sectionOverride?.labelTitle === "string") {
          node.labelTitle = sectionOverride.labelTitle;
        }
        if (typeof sectionOverride?.labelSubtitle === "string") {
          node.labelSubtitle = sectionOverride.labelSubtitle;
        }
        if (typeof sectionOverride?.labelDates === "string") {
          node.labelDates = sectionOverride.labelDates;
        }
        if (typeof sectionOverride?.labelBadge === "string") {
          node.labelBadge = sectionOverride.labelBadge;
        }
        if (typeof sectionOverride?.shortName === "string") {
          node.shortName = sectionOverride.shortName;
        }
        if (scene.splitSourcePath) {
          const override = pathOverrides
            ? pathOverrides[normalizeMarkdownPath(scene.splitSourcePath)]
            : null;
          node.markdownPath = scene.splitSourcePath;
          node.markdownSection = info.title ?? null;
          if (
            isTwoLevelRoot &&
            info.title &&
            sectionSubheadings?.get(info.title) === true &&
            !(plainSectionPaths && plainSectionPaths.has(normalizeMarkdownPath(scene.splitSourcePath)))
          ) {
            node.markdownAutoIndex = true;
            if (typeof override?.headingLevel === "number") {
              node.markdownHeadingLevel = override.headingLevel;
            } else {
              node.markdownHeadingLevel = 3;
            }
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
          if (scene.splitColumns === 1 || scene.splitColumns === 2) {
            node.markdownColumns = scene.splitColumns;
          }
        }
        return node;
      })
      .filter(Boolean);
  };
}
