import { shouldExcludeStructuredSpherePalette } from "./SceneCapabilitiesService.js";

export class SceneRepository {
  constructor(deps) {
    this.fetchImpl = deps.fetchImpl;
    this.appendCacheBust = deps.appendCacheBust;
    this.sceneConfigCache = deps.sceneConfigCache;
    this.sceneLoadPromises = deps.sceneLoadPromises;
    this.levelConfigs = deps.levelConfigs;
    this.normalizeVelocity = deps.normalizeVelocity;
    this.colorTokens = deps.colorTokens;
    this.autoMarkdownPalettes = deps.autoMarkdownPalettes ?? {};
    this.defaultAutoMarkdownPaletteName = deps.defaultAutoMarkdownPaletteName ?? "legacy";
    this.defaultSphereColorSchemeName = deps.defaultSphereColorSchemeName ?? "jewel";
    this.homeScenePath = deps.homeScenePath ?? null;
    this.buildAutoMarkdownNodes = deps.buildAutoMarkdownNodes;
    this.resolveMarkdownFileSize = deps.resolveMarkdownFileSize;
    this.resolveMarkdownFileCharacterCount = deps.resolveMarkdownFileCharacterCount;
    this.markdownDocBadgeMinChars =
      typeof deps.markdownDocBadgeMinChars === "number"
        ? deps.markdownDocBadgeMinChars
        : 512;
    this.markdownOpenMinChars =
      typeof deps.markdownOpenMinChars === "number"
        ? deps.markdownOpenMinChars
        : 512;
    this.markdownDocIconMinBytes =
      typeof deps.markdownDocIconMinBytes === "number"
        ? deps.markdownDocIconMinBytes
        : 1024;
    this.markdownGlowMinBytes =
      typeof deps.markdownGlowMinBytes === "number"
        ? deps.markdownGlowMinBytes
        : 4096;
  }

  resolveSphereColorPalette(sceneData) {
    const scene = sceneData?.scene ?? {};
    const schemeName =
      typeof scene.sphereColorScheme === "string"
        ? scene.sphereColorScheme
        : this.defaultSphereColorSchemeName;
    const palette =
      Array.isArray(this.autoMarkdownPalettes[schemeName]) &&
      this.autoMarkdownPalettes[schemeName].length
        ? this.autoMarkdownPalettes[schemeName]
        : this.autoMarkdownPalettes[this.defaultSphereColorSchemeName];
    return Array.isArray(palette) && palette.length ? palette : null;
  }

  resolveLayoutType(sceneMeta) {
    if (typeof sceneMeta?.layout?.type === "string") {
      return sceneMeta.layout.type;
    }
    return null;
  }

  resolveDisplayTitle(entry) {
    return entry?.label ?? entry?.title ?? entry?.id ?? null;
  }

  resolveMarkdownConfig(entry) {
    const source = entry?.source ?? null;
    const view = entry?.view ?? null;
    const markdownPath =
      source?.type === "markdown" && typeof source.path === "string"
        ? source.path
        : null;
    const markdownSection =
      typeof view?.section === "string" ? view.section : null;
    const markdownColumns =
      typeof view?.columns === "number" ? view.columns : null;
    const markdownAutoOpen =
      typeof view?.autoOpen === "boolean" ? view.autoOpen : null;
    const markdownDownloadOnly = view?.downloadOnly === true;
    return {
      markdownPath,
      markdownSection,
      markdownColumns,
      markdownAutoOpen,
      markdownDownloadOnly,
    };
  }

  resolveFileConfig(entry) {
    const source = entry?.source ?? null;
    const view = entry?.view ?? null;
    const sourceType =
      typeof source?.type === "string" ? source.type.trim().toLowerCase() : "";
    const supportedFileSource =
      sourceType === "pdf" || sourceType === "file" || sourceType === "asset";
    const filePath =
      supportedFileSource && typeof source?.path === "string" && source.path.trim().length > 0
        ? source.path.trim()
        : null;
    const fileOpenMode =
      typeof view?.openMode === "string" && view.openMode.trim().length > 0
        ? view.openMode.trim()
        : "new-tab";
    const fileDownload =
      view?.download === true ||
      view?.downloadOnly === true ||
      fileOpenMode === "download";
    const fileDownloadName =
      typeof view?.downloadName === "string" && view.downloadName.trim().length > 0
        ? view.downloadName.trim()
        : null;
    return {
      filePath,
      fileSourceType: filePath ? sourceType : null,
      fileOpenMode,
      fileDownload,
      fileDownloadName,
    };
  }

  resolveSplitSceneConfig(sceneMeta) {
    const sceneType = sceneMeta?.type;
    const source = sceneMeta?.source ?? null;
    const split = source?.split ?? null;
    const tree = source?.tree ?? null;
    const view = sceneMeta?.view ?? null;
    const optionalPositiveNumber = (value) =>
      typeof value === "number" && Number.isFinite(value) && value > 0
        ? value
        : null;
    const usesTypedTreeSource =
      sceneType === "Scene-Markdown-Tree" &&
      source?.type === "markdown" &&
      typeof source.path === "string" &&
      source.path.length > 0;
    const usesTypedSplitSource =
      sceneType === "Scene-Markdown-Split" &&
      source?.type === "markdown" &&
      typeof source.path === "string" &&
      source.path.length > 0;
    const usesTypedMarkdownTreeLikeSource = usesTypedTreeSource || usesTypedSplitSource;
    const configuredHeadingLevel = usesTypedTreeSource
      ? typeof tree?.rootHeadingLevel === "number"
        ? tree.rootHeadingLevel
        : 2
      : typeof split?.headingLevel === "number"
        ? split.headingLevel
        : usesTypedSplitSource
          ? 2
          : null;
    const configuredMaxDepth = usesTypedTreeSource
      ? typeof tree?.maxDepth === "number"
        ? tree.maxDepth
        : 1
      : typeof split?.maxDepth === "number"
        ? split.maxDepth
        : usesTypedSplitSource
          ? 1
          : null;
    return {
      splitSourcePath: usesTypedMarkdownTreeLikeSource
        ? source.path
        : null,
      splitSection: usesTypedTreeSource
        ? typeof tree?.section === "string"
          ? tree.section
          : typeof view?.section === "string"
            ? view.section
            : null
        : typeof split?.section === "string"
          ? split.section
        : typeof view?.section === "string"
          ? view.section
          : null,
      splitHeadingLevel: configuredHeadingLevel,
      splitMaxDepth: configuredMaxDepth,
      splitColumns:
        view?.columns === 1 || view?.columns === 2 || view?.columns === 3
          ? view.columns
          : null,
      splitIncludeExistingInLayout: split?.includeExistingInLayout === true,
      splitNodeRadius: null,
      splitRingRadius: null,
      splitMaxRingCount: null,
      splitGridSpacing: optionalPositiveNumber(split?.gridSpacing),
      splitGridGapMultiplier: optionalPositiveNumber(split?.gridGapMultiplier),
      splitPalette: null,
      splitPaletteName: this.defaultAutoMarkdownPaletteName,
      splitColor: null,
      splitExcludePaths: [],
      splitPlainPaths: [],
      splitDefaultIndex: false,
      splitIndexPaths: [],
      splitPlainSectionPaths: [],
      splitOverrides: null,
      splitSectionOverrides:
        usesTypedTreeSource
          ? tree?.overrides && typeof tree.overrides === "object"
            ? tree.overrides
            : null
          : split?.overrides && typeof split.overrides === "object"
            ? split.overrides
            : null,
      splitTreeMode: usesTypedTreeSource
        ? "tree"
        : usesTypedSplitSource
          ? "split"
          : null,
    };
  }

  buildSceneChildRefMap(sceneMeta) {
    const refs = Array.isArray(sceneMeta?.children) ? sceneMeta.children : [];
    const map = new Map();
    refs.forEach((ref) => {
      if (!ref || typeof ref !== "object") {
        return;
      }
      const nodeId = typeof ref.nodeId === "string" ? ref.nodeId : "";
      if (!nodeId || map.has(nodeId)) {
        return;
      }
      map.set(nodeId, ref);
    });
    return map;
  }

  resolveChildSceneTarget(entry, sceneChildRef = null, context = {}) {
    const childRef = sceneChildRef;
    if (
      childRef &&
      (typeof childRef.scenePath === "string" || typeof childRef.sceneId === "string")
    ) {
      return childRef.scenePath ?? childRef.sceneId;
    }
    return null;
  }

  resolveSceneChildDisplay(entry, sceneChildRef = null) {
    return {
      title:
        typeof sceneChildRef?.title === "string" && sceneChildRef.title.trim().length > 0
          ? sceneChildRef.title
          : null,
      labelBadge:
        typeof sceneChildRef?.labelBadge === "string" && sceneChildRef.labelBadge.trim().length > 0
          ? sceneChildRef.labelBadge
          : null,
      color:
        typeof sceneChildRef?.color === "string" && sceneChildRef.color.trim().length > 0
          ? sceneChildRef.color
          : null,
      slot:
        typeof sceneChildRef?.slot === "string" && sceneChildRef.slot.trim().length > 0
          ? sceneChildRef.slot
          : null,
    };
  }

  resolveNodeEntryColor(entry, sceneChildRef = null) {
    const sceneChildDisplay = this.resolveSceneChildDisplay(entry, sceneChildRef);
    if (typeof sceneChildDisplay.color === "string") {
      return sceneChildDisplay.color;
    }
    return entry?.color ?? "#3a5a8a";
  }

  resolveNodeTitle(entry, sceneChildRef = null) {
    const sceneChildDisplay = this.resolveSceneChildDisplay(entry, sceneChildRef);
    return sceneChildDisplay.title ?? this.resolveDisplayTitle(entry) ?? entry?.id ?? null;
  }

  resolveNodeBadge(entry, sceneChildRef = null) {
    const sceneChildDisplay = this.resolveSceneChildDisplay(entry, sceneChildRef);
    return sceneChildDisplay.labelBadge ?? entry?.labelBadge ?? null;
  }

  async resolveSceneChildMarkdownViewBadgeMap(sceneMeta) {
    const refs = Array.isArray(sceneMeta?.children) ? sceneMeta.children : [];
    const map = new Map();
    if (typeof this.fetchImpl !== "function") {
      return map;
    }

    await Promise.all(
      refs.map(async (ref) => {
        const nodeId = typeof ref?.nodeId === "string" ? ref.nodeId : "";
        const scenePath = typeof ref?.scenePath === "string" ? ref.scenePath : "";
        if (!nodeId || !scenePath) {
          return;
        }

        try {
          const requestPath =
            typeof this.appendCacheBust === "function"
              ? this.appendCacheBust(scenePath)
              : scenePath;
          const response = await this.fetchImpl(requestPath);
          if (!response?.ok || typeof response.json !== "function") {
            return;
          }
          const childData = await response.json();
          const childScene = childData?.scene ?? {};
          const childSource = childScene.source ?? {};
          if (
            childScene.type === "Scene-Markdown-View" &&
            childSource.type === "markdown" &&
            typeof childSource.path === "string" &&
            childSource.path.trim().length > 0
          ) {
            map.set(nodeId, "doc");
          }
        } catch {
          // Missing child scene metadata should not block the parent scene.
        }
      })
    );

    return map;
  }

  resolveInferredNodeBadge(entry, context = {}) {
    const badge = context.sceneChildMarkdownViewBadgeByNodeId?.get(entry?.id);
    return typeof badge === "string" && badge.trim().length > 0 ? badge : null;
  }

  resolveNodeLayoutSlot(entry, sceneChildRef = null) {
    const sceneChildDisplay = this.resolveSceneChildDisplay(entry, sceneChildRef);
    return sceneChildDisplay.slot ?? null;
  }

  resolveNodeChildRef(entry, context = {}) {
    return context.sceneChildRefByNodeId?.get(entry?.id) ?? null;
  }

  resolveNodeColor(entry) {
    let color = entry?.color ?? "#3a5a8a";
    if (typeof color === "string" && this.colorTokens[color]) {
      color = this.colorTokens[color];
    }
    return color;
  }

  buildRuntimeNode(obj, context = {}) {
    const markdown = this.resolveMarkdownConfig(obj);
    const file = this.resolveFileConfig(obj);
    const sceneChildRef = this.resolveNodeChildRef(obj, context);
    const nodeTitle = this.resolveNodeTitle(obj, sceneChildRef) ?? obj.id;
    const binaryBands = Array.isArray(obj.binaryBands) ? obj.binaryBands : null;
    const node = {
      id: obj.id,
      name: nodeTitle,
      shortName: obj.shortName ?? null,
      labelTitle: obj.labelTitle ?? nodeTitle,
      labelSubtitle: obj.labelSubtitle ?? null,
      labelDates: obj.labelDates ?? null,
      labelBadge:
        this.resolveNodeBadge(obj, sceneChildRef) ??
        this.resolveInferredNodeBadge(obj, context),
      labelBadgeImage: obj.labelBadgeImage ?? null,
      labelBadgeAlt: obj.labelBadgeAlt ?? null,
      radius: obj.radius ?? 1,
      color: this.resolveNodeColor({
        ...obj,
        color: this.resolveNodeEntryColor(obj, sceneChildRef),
      }),
      position: obj.position ?? [0, 0, 0],
      fixedPosition: obj.fixedPosition ?? false,
      category: obj.category,
      reaction: obj.reaction,
      details: obj.details ?? null,
      renderStyle: obj.renderStyle ?? null,
      hideSphere: obj.hideSphere === true,
      markdownPath: markdown.markdownPath,
      markdownSection: markdown.markdownSection,
      markdownColumns: markdown.markdownColumns,
      markdownAutoOpen: markdown.markdownAutoOpen,
      markdownDownloadOnly: markdown.markdownDownloadOnly,
      markdownHeadingLevel: obj.markdownHeadingLevel ?? null,
      markdownMaxDepth: obj.markdownMaxDepth ?? null,
      markdownAutoIndex: obj.markdownAutoIndex ?? null,
      markdownPlainSectionPaths: Array.isArray(obj.markdownPlainSectionPaths)
        ? obj.markdownPlainSectionPaths
        : [],
      filePath: file.filePath,
      fileSourceType: file.fileSourceType,
      fileOpenMode: file.fileOpenMode,
      fileDownload: file.fileDownload,
      fileDownloadName: file.fileDownloadName,
      fileOpenEligible: !!file.filePath,
      binaryBands,
      glowRing: obj.glowRing ?? !!file.filePath,
      glowRingColor: obj.glowRingColor ?? null,
      glowRingOpacity: obj.glowRingOpacity ?? null,
      glowRingThickness: obj.glowRingThickness ?? null,
      glowRingScale: obj.glowRingScale ?? null,
      baseOpacity: obj.baseOpacity ?? null,
      wrapLabel: obj.wrapLabel ?? context.wrapLabels ?? true,
      layoutSlot: this.resolveNodeLayoutSlot(obj, sceneChildRef),
    };
    const childScene = this.resolveChildSceneTarget(obj, sceneChildRef, context);
    if (typeof childScene === "string" && childScene.length > 0) {
      node.childScene = childScene;
    }
    if (obj.motion && obj.motion.type === "orbit") {
      const orbit = obj.motion.orbit || obj.motion;
      const centerLabel = context.idMap?.get(orbit.center) ?? orbit.center;
      node.orbit = {
        center: centerLabel,
        radius: orbit.radius ?? 1,
        speed: orbit.speed ?? 0,
        phase: orbit.phase ?? 0,
        shape: orbit.shape ?? "circular",
        yScale: orbit.yScale,
      };
      node.motionType = "orbit";
    }
    if (obj.motion && obj.motion.type === "translate") {
      const translate = obj.motion.translate || obj.motion;
      const velocity = this.normalizeVelocity(
        translate.groupVelocity ?? translate.velocity ?? translate.v
      );
      node.translation = { velocity };
      node.motionType = "translate";
    }
    if (binaryBands && binaryBands.length > 0) {
      node.motionType = node.motionType ?? "binaryOrbit";
    }
    return node;
  }

  shouldApplyStructuredSpherePalette(scenePath, sceneData) {
    const layoutType = String(this.resolveLayoutType(sceneData?.scene) ?? "").toLowerCase();
    const isStructuredLayout = layoutType === "rings";
    const sceneId = String(sceneData?.scene?.id ?? "").toLowerCase();
    const isHomeScene =
      typeof this.homeScenePath === "string" &&
      this.homeScenePath.length > 0 &&
      scenePath === this.homeScenePath;
    if (!isStructuredLayout && !isHomeScene) {
      return false;
    }
    if (shouldExcludeStructuredSpherePalette(null, { sceneId, scenePath })) {
      return false;
    }
    return true;
  }

  shouldUsePositionalPaletteOrder() {
    return false;
  }

  shouldIncludeFixedPositionInStructuredPalette(sceneData) {
    return String(sceneData?.scene?.type ?? "").toLowerCase() === "scene-index";
  }

  isPersonalityArchitrinoNode(node) {
    if (!node || typeof node !== "object") {
      return false;
    }
    const name = typeof node.name === "string" ? node.name.toLowerCase() : "";
    const id = typeof node.id === "string" ? node.id.toLowerCase() : "";
    const childScene =
      typeof node.childScene === "string" ? node.childScene.toLowerCase() : "";
    if (name === "electrino" || name === "positrino") {
      return true;
    }
    if (id.startsWith("electrino_") || id.startsWith("positrino_")) {
      return true;
    }
    return (
      childScene === "content/scenes/architrino-theory/electrino.json" ||
      childScene === "content/scenes/architrino-theory/positrino.json"
    );
  }

  applyPersonalityArchitrinoSizing(nodes) {
    if (!Array.isArray(nodes) || !nodes.length) {
      return;
    }
    const hasBinaryCore = nodes.some(
      (node) => node?.renderStyle === "binarySphere" || node?.renderStyle === "binaryShell"
    );
    if (!hasBinaryCore) {
      return;
    }

    nodes.forEach((node) => {
      if (!this.isPersonalityArchitrinoNode(node)) {
        return;
      }
      if (!Array.isArray(node.position) || node.position.length < 2) {
        return;
      }

      const radius = Number(node.radius);
      if (!Number.isFinite(radius) || radius <= 0) {
        return;
      }

      const x = Number(node.position[0]) || 0;
      const y = Number(node.position[1]) || 0;
      const z = Number(node.position[2]) || 0;
      const radialDistance = Math.hypot(x, y);
      if (radialDistance > 0) {
        // Keep outer tangent unchanged: newCenterDistance = oldDistance - oldRadius
        const inwardDistance = Math.max(0, radialDistance - radius);
        const scale = inwardDistance / radialDistance;
        node.position = [x * scale, y * scale, z];
      }

      node.radius = radius * 2;
    });
  }

  applyStructuredSpherePalette(nodes, palette, options = {}) {
    if (!Array.isArray(nodes) || !nodes.length || !Array.isArray(palette) || !palette.length) {
      return;
    }
    const usePositionalOrder = options.usePositionalOrder === true;
    const includeFixedPosition = options.includeFixedPosition === true;
    const eligibleNodes = nodes.filter(
      (node) =>
        !!node &&
        node.category !== "legend" &&
        (includeFixedPosition || node.fixedPosition !== true)
    );
    if (!eligibleNodes.length) {
      return;
    }
    let orderedNodes = eligibleNodes;
    if (usePositionalOrder) {
      const positioned = eligibleNodes.filter(
        (node) =>
          Array.isArray(node.position) &&
          node.position.length >= 2 &&
          Number.isFinite(node.position[0]) &&
          Number.isFinite(node.position[1])
      );
      if (positioned.length >= 3) {
        const center = positioned.reduce(
          (acc, node) => {
            acc.x += node.position[0];
            acc.y += node.position[1];
            return acc;
          },
          { x: 0, y: 0 }
        );
        center.x /= positioned.length;
        center.y /= positioned.length;
        const startAngle = Math.PI / 2;
        orderedNodes = [...positioned].sort((a, b) => {
          const aAngle = Math.atan2(a.position[1] - center.y, a.position[0] - center.x);
          const bAngle = Math.atan2(b.position[1] - center.y, b.position[0] - center.x);
          const aOrder = (startAngle - aAngle + Math.PI * 2) % (Math.PI * 2);
          const bOrder = (startAngle - bAngle + Math.PI * 2) % (Math.PI * 2);
          return aOrder - bOrder;
        });
      }
    }
    const shuffledPalette = [...palette];
    for (let i = shuffledPalette.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPalette[i], shuffledPalette[j]] = [shuffledPalette[j], shuffledPalette[i]];
    }
    let colorBag = [...shuffledPalette];
    const drawColor = () => {
      if (!colorBag.length) {
        colorBag = [...palette];
        for (let i = colorBag.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [colorBag[i], colorBag[j]] = [colorBag[j], colorBag[i]];
        }
      }
      return colorBag.pop();
    };
    orderedNodes.forEach((node) => {
      node.color = drawColor();
    });
  }

  async applyMarkdownDocEligibility(nodes) {
    if (!Array.isArray(nodes) || !nodes.length) {
      return nodes;
    }

    await Promise.all(
      nodes.map(async (node) => {
        const hasDirectMarkdown = typeof node.markdownPath === "string" && node.markdownPath.length > 0;
        const hasMarkdownSectionTarget =
          typeof node.markdownSection === "string" && node.markdownSection.trim().length > 0;
        if (!hasDirectMarkdown) {
          node.docDrillDownPreferred = false;
          node.markdownOpenEligible = false;
          node.markdownGlowEligible = false;
          node.markdownDocIconEligible = false;
          node.markdownDocIcon = false;
          return;
        }

        let markdownByteSize = null;
        if (typeof this.resolveMarkdownFileSize === "function") {
          markdownByteSize = await this.resolveMarkdownFileSize(node.markdownPath);
        }
        let markdownCharacterCount = null;
        if (typeof this.resolveMarkdownFileCharacterCount === "function") {
          markdownCharacterCount = await this.resolveMarkdownFileCharacterCount(
            node.markdownPath
          );
        }
        const isEligible =
          Number.isFinite(markdownByteSize) &&
          markdownByteSize >= this.markdownGlowMinBytes;
        const isOpenEligible =
          Number.isFinite(markdownCharacterCount) &&
          markdownCharacterCount >= this.markdownOpenMinChars;
        const isDocIconEligible =
          isOpenEligible &&
          (hasMarkdownSectionTarget ||
          (Number.isFinite(markdownCharacterCount) &&
            markdownCharacterCount >= this.markdownDocBadgeMinChars));

        node.markdownByteSize = Number.isFinite(markdownByteSize)
          ? markdownByteSize
          : null;
        node.markdownCharacterCount = Number.isFinite(markdownCharacterCount)
          ? markdownCharacterCount
          : null;
        node.markdownOpenEligible = isOpenEligible;
        node.markdownGlowEligible = isEligible;
        node.markdownDocIconEligible = isDocIconEligible;
        node.markdownDocIcon = isDocIconEligible;
        node.docDrillDownPreferred = isEligible;
        node.glowRing = isEligible;
        if (isEligible) {
          node.glowRingColor = node.glowRingColor ?? "#aeb6c6";
          node.glowRingOpacity = node.glowRingOpacity ?? 0.3;
          node.glowRingThickness =
            node.glowRingThickness ?? Math.max(0.028, node.radius * 0.06);
          node.glowRingScale = node.glowRingScale ?? 1.04;
        }
      })
    );

    return nodes;
  }

  isAuthoredSceneData(data) {
    return !!(
      data &&
      typeof data === "object" &&
      data.scene &&
      typeof data.scene === "object" &&
      Array.isArray(data.objects)
    );
  }

  async createConfigFromSceneData(scenePath, data) {
    const sceneMeta = data.scene ?? {};
    const sceneType = typeof sceneMeta.type === "string" ? sceneMeta.type : null;
    const rawSceneMarkdown = this.resolveMarkdownConfig(sceneMeta);
    const sceneMarkdown =
      sceneType === "Scene-Markdown-Split" || sceneType === "Scene-Markdown-Tree"
        ? {
            markdownPath: null,
            markdownSection: null,
            markdownColumns: null,
            markdownAutoOpen: null,
            markdownDownloadOnly: false,
          }
        : rawSceneMarkdown;
    const rawLayoutType = this.resolveLayoutType(sceneMeta);
    const rawLayoutConfig =
      sceneMeta.layout && typeof sceneMeta.layout === "object" && !Array.isArray(sceneMeta.layout)
        ? sceneMeta.layout
        : null;
    const splitScene = this.resolveSplitSceneConfig(sceneMeta);
    const wrapLabels = sceneMeta.wrapLabels ?? true;
    const sceneChildRefByNodeId = this.buildSceneChildRefMap(sceneMeta);
    const sceneChildMarkdownViewBadgeByNodeId =
      await this.resolveSceneChildMarkdownViewBadgeMap(sceneMeta);
    const idMap = new Map(
      data.objects.map((obj) => [obj.id, this.resolveDisplayTitle(obj) ?? obj.id])
    );
    let nodes = data.objects.map((obj) =>
      this.buildRuntimeNode(obj, {
        wrapLabels,
        idMap,
        sceneChildRefByNodeId,
        sceneChildMarkdownViewBadgeByNodeId,
        sceneType,
      })
    );
    const structuredPalette = this.resolveSphereColorPalette(data);
    if (this.shouldApplyStructuredSpherePalette(scenePath, data)) {
      this.applyStructuredSpherePalette(nodes, structuredPalette, {
        usePositionalOrder: this.shouldUsePositionalPaletteOrder(scenePath),
        includeFixedPosition: this.shouldIncludeFixedPositionInStructuredPalette(data),
      });
    }
    this.applyPersonalityArchitrinoSizing(nodes);
    const splitRuntimeScene = {
      ...data.scene,
      ...splitScene,
      layoutType: rawLayoutType,
      layoutConfig: rawLayoutConfig,
    };
    const autoNodes = await this.buildAutoMarkdownNodes(splitRuntimeScene, nodes);
    if (autoNodes.length) {
      nodes = nodes.concat(autoNodes);
    }
    await this.applyMarkdownDocEligibility(nodes);

    const sceneName = this.resolveDisplayTitle(sceneMeta) ?? scenePath;
    const sceneId = sceneMeta.id ?? null;
    const animatorDocument =
      sceneMeta.animator &&
      typeof sceneMeta.animator === "object" &&
      sceneMeta.animator.document &&
      typeof sceneMeta.animator.document === "object"
        ? sceneMeta.animator.document
        : null;
    const config = {
      layout: nodes.some((node) => node.orbit) ? "orbit" : "static",
      layoutType: rawLayoutType,
      layoutConfig: rawLayoutConfig,
      layoutColumns:
        Number.isInteger(data.scene?.layoutColumns) && data.scene.layoutColumns > 0
          ? data.scene.layoutColumns
          : null,
      nodes,
      links: Array.isArray(data.links) ? data.links : [],
      sceneName,
      sceneId,
      animatorDocument,
      markdownPath: sceneMarkdown.markdownPath,
      markdownSection: sceneMarkdown.markdownSection,
      markdownColumns: sceneMarkdown.markdownColumns,
      markdownShowTitle: sceneMeta.markdownShowTitle ?? true,
      markdownAutoOpen: sceneMarkdown.markdownAutoOpen ?? true,
      markdownDownloadOnly: sceneMarkdown.markdownDownloadOnly === true,
      centerOn: sceneMeta.centerOn ?? null,
      splitSourcePath: splitScene.splitSourcePath,
      splitSection: splitScene.splitSection,
      splitHeadingLevel: splitScene.splitHeadingLevel,
      splitMaxDepth: splitScene.splitMaxDepth,
      splitIncludeExistingInLayout: splitScene.splitIncludeExistingInLayout,
      splitNodeRadius: splitScene.splitNodeRadius,
      splitRingRadius: splitScene.splitRingRadius,
      splitMaxRingCount: splitScene.splitMaxRingCount,
      splitGridSpacing: splitScene.splitGridSpacing,
      splitGridGapMultiplier: splitScene.splitGridGapMultiplier,
      splitColumns: splitScene.splitColumns,
      splitPalette: splitScene.splitPalette,
      splitPaletteName: splitScene.splitPaletteName,
      splitColor: splitScene.splitColor,
      splitExcludePaths: splitScene.splitExcludePaths,
      splitPlainPaths: splitScene.splitPlainPaths,
      splitDefaultIndex: splitScene.splitDefaultIndex,
      splitIndexPaths: splitScene.splitIndexPaths,
      splitPlainSectionPaths: splitScene.splitPlainSectionPaths,
      splitOverrides: splitScene.splitOverrides,
      splitSectionOverrides: splitScene.splitSectionOverrides,
      splitTreeMode: splitScene.splitTreeMode,
    };
    this.levelConfigs[scenePath] = config;
    this.sceneConfigCache.set(scenePath, config);
    return config;
  }

  async normalizeInlineSceneConfig(scenePath, configOrData) {
    if (!this.isAuthoredSceneData(configOrData)) {
      return configOrData;
    }
    return this.createConfigFromSceneData(scenePath, configOrData);
  }

  async loadSceneConfig(scenePath) {
    if (this.sceneConfigCache.has(scenePath)) {
      return this.sceneConfigCache.get(scenePath);
    }
    if (this.sceneLoadPromises.has(scenePath)) {
      return this.sceneLoadPromises.get(scenePath);
    }

    const promise = this.fetchImpl(this.appendCacheBust(scenePath))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load scene ${scenePath}`);
        }
        return response.json();
      })
      .then((data) => this.createConfigFromSceneData(scenePath, data))
      .catch((error) => {
        console.error(error);
        this.sceneLoadPromises.delete(scenePath);
        return null;
      });

    this.sceneLoadPromises.set(scenePath, promise);
    return promise;
  }

  async ensureDynamicSceneConfig(sceneId) {
    const config = this.levelConfigs[sceneId];
    if (!config) {
      return;
    }
    const layoutType = String(config.layoutType ?? "").toLowerCase();
    const usesStructuredMarkdownLayout = layoutType === "rings" || layoutType === "grid";
    const hasSplitSource =
      typeof config.splitSourcePath === "string" && config.splitSourcePath.length > 0;
    if (!usesStructuredMarkdownLayout || !hasSplitSource) {
      return;
    }
    if (!Array.isArray(config.nodes)) {
      config.nodes = [];
    }
    if (!config.nodes.length) {
      const autoNodes = await this.buildAutoMarkdownNodes(config, config.nodes);
      if (autoNodes.length) {
        config.nodes = config.nodes.concat(autoNodes);
      }
    }

    const needsEligibility = config.nodes.some(
      (node) =>
        node &&
        typeof node.markdownPath === "string" &&
        node.markdownPath.length > 0 &&
        typeof node.markdownGlowEligible !== "boolean"
    );
    if (needsEligibility) {
      await this.applyMarkdownDocEligibility(config.nodes);
    }
  }
}
