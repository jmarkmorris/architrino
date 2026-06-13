export function resolveAutoMarkdownGridColumns(layoutCount) {
  const count = Math.max(0, Math.floor(Number(layoutCount) || 0));
  if (count <= 1) {
    return 1;
  }
  if (count <= 4) {
    return Math.ceil(Math.sqrt(count));
  }
  if (count <= 9) {
    return 3;
  }
  if (count <= 12) {
    return 4;
  }
  if (count <= 20) {
    return 5;
  }
  if (count <= 30) {
    return 6;
  }
  return Math.ceil(Math.sqrt(count * 1.2));
}

function resolveAutoMarkdownGridSpacingFactor(layoutCount) {
  const count = Math.max(0, Math.floor(Number(layoutCount) || 0));
  return count >= 13 ? 2.32 : 2.6;
}

function extractDatedHeadingLabel(title) {
  const match = String(title ?? "").match(
    /^(\d{4}-\d{2}-\d{2})(?:\s*[:\u2014\u2013-]\s+|\s+)(.+)$/
  );
  if (!match) {
    return null;
  }
  const labelTitle = (match[2] || "").trim();
  const labelSubtitle = (match[1] || "").trim();
  if (!labelTitle || !labelSubtitle) {
    return null;
  }
  return { labelTitle, labelSubtitle };
}

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

  function collectHeadingEntries(lines, targetLevel) {
    const entries = [];
    let currentEntry = null;
    lines.forEach((line) => {
      const heading = parseMarkdownHeading(line);
      if (!heading) {
        return;
      }
      if (heading.level === targetLevel) {
        currentEntry = {
          title: heading.title,
          hasChildHeadings: false,
        };
        entries.push(currentEntry);
        return;
      }
      if (!currentEntry) {
        return;
      }
      if (heading.level <= targetLevel) {
        currentEntry = null;
        return;
      }
      if (heading.level === targetLevel + 1) {
        currentEntry.hasChildHeadings = true;
      }
    });
    return entries;
  }

  return async function buildAutoMarkdownNodes(scene, existingNodes) {
    const layoutType = typeof scene?.layoutType === "string" ? scene.layoutType.toLowerCase() : "";
    const usesRingLayout = layoutType === "rings";
    const usesGridLayout = layoutType === "grid";
    if ((!usesRingLayout && !usesGridLayout) || !scene?.splitSourcePath) {
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
    const remainingDepth =
      typeof scene.splitMaxDepth === "number"
        ? Math.max(1, scene.splitMaxDepth)
        : 1;

    if (scene.splitSourcePath) {
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
          entries = collectHeadingEntries(lines, usedHeadingLevel);
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
          hasChildHeadings: entry.hasChildHeadings === true,
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
        : layoutRadius * resolveAutoMarkdownGridSpacingFactor(layoutCount);
    const useRing = usesRingLayout && layoutCount <= maxRingCount;
    const requestedColumns =
      Number.isInteger(scene.layoutColumns) && scene.layoutColumns > 0
        ? scene.layoutColumns
        : null;
    const columns = useRing
      ? 1
      : Math.max(
          1,
          Math.min(layoutCount || 1, requestedColumns ?? resolveAutoMarkdownGridColumns(layoutCount))
        );
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

    const nextHeadingLevel = usedHeadingLevel + 1;
    const nextDepth = Math.max(remainingDepth - 1, 0);

    return autoEntries
      .map((entry, index) => {
        const { info, slug, id } = entry;
        const sectionOverrideKey =
          scene.splitSourcePath && info.title ? normalizeMarkdownKey(info.title) : null;
        const sectionOverride =
          sectionOverrideKey && sectionOverrides ? sectionOverrides[sectionOverrideKey] : null;
        if (sectionOverride?.hidden === true || sectionOverride?.exclude === true) {
          return null;
        }
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
        const datedHeadingLabel = scene.splitSourcePath
          ? extractDatedHeadingLabel(nodeName)
          : null;
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
        } else if (datedHeadingLabel?.labelTitle) {
          node.labelTitle = datedHeadingLabel.labelTitle;
        }
        if (typeof sectionOverride?.labelSubtitle === "string") {
          node.labelSubtitle = sectionOverride.labelSubtitle;
        } else if (datedHeadingLabel?.labelSubtitle) {
          node.labelSubtitle = datedHeadingLabel.labelSubtitle;
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
          const forceDocMode = sectionOverride?.mode === "doc";
          node.markdownPath = scene.splitSourcePath;
          node.markdownSection = info.title ?? null;
          if (
            !forceDocMode &&
            nextDepth > 0 &&
            info.title &&
            info.hasChildHeadings === true &&
            !(plainSectionPaths && plainSectionPaths.has(normalizeMarkdownPath(scene.splitSourcePath)))
          ) {
            node.markdownAutoIndex = true;
            if (typeof override?.headingLevel === "number") {
              node.markdownHeadingLevel = override.headingLevel;
            } else {
              node.markdownHeadingLevel = nextHeadingLevel;
            }
            node.markdownMaxDepth =
              typeof override?.maxDepth === "number"
                ? Math.max(1, override.maxDepth)
                : nextDepth;
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
          if (override?.columns === 1 || override?.columns === 2 || override?.columns === 3) {
            node.markdownColumns = override.columns;
          }
          const plainSectionList = [];
          if (plainSectionPaths && plainSectionPaths.has(normalizedPath)) {
            plainSectionList.push(info.path);
          }
          if (typeof override?.sectionDepth === "number" && override.sectionDepth < 2) {
            plainSectionList.push(info.path);
          }
          if (plainSectionList.length) {
            node.markdownPlainSectionPaths = plainSectionList;
          }
          if (scene.splitColumns === 1 || scene.splitColumns === 2 || scene.splitColumns === 3) {
            node.markdownColumns = scene.splitColumns;
          }
        }
        if (
          typeof node.labelBadge !== "string" &&
          typeof node.markdownPath === "string" &&
          node.markdownPath.trim().length > 0 &&
          node.markdownAutoIndex !== true
        ) {
          node.labelBadge = "doc";
        }
        return node;
      })
      .filter(Boolean);
  };
}
