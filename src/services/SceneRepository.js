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

  resolveLayoutMode(sceneMeta) {
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
    return {
      markdownPath,
      markdownSection,
      markdownColumns,
      markdownAutoOpen,
    };
  }

  resolveChildSceneTarget(entry) {
    const childRef =
      Array.isArray(entry?.children) && entry.children.length > 0 && entry.children[0]
        ? entry.children[0]
        : null;
    if (
      childRef &&
      (typeof childRef.scenePath === "string" || typeof childRef.sceneId === "string")
    ) {
      return childRef.scenePath ?? childRef.sceneId;
    }
    return null;
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
    const nodeTitle = this.resolveDisplayTitle(obj) ?? obj.id;
    const hasScale = obj.scaleExponent !== undefined && obj.scaleExponent !== null;
    const binaryBands = Array.isArray(obj.binaryBands) ? obj.binaryBands : null;
    const node = {
      id: obj.id,
      name: nodeTitle,
      shortName: obj.shortName ?? null,
      labelTitle: obj.labelTitle ?? obj.title ?? null,
      labelSubtitle: obj.labelSubtitle ?? null,
      labelDates: obj.labelDates ?? null,
      labelBadge: obj.labelBadge ?? null,
      labelBadgeImage: obj.labelBadgeImage ?? null,
      labelBadgeAlt: obj.labelBadgeAlt ?? null,
      scale: hasScale ? obj.scaleExponent : null,
      hasScale,
      radius: obj.radius ?? 1,
      color: this.resolveNodeColor(obj),
      position: obj.position ?? [0, 0, 0],
      fixedPosition: obj.fixedPosition ?? false,
      category: obj.category,
      reaction: obj.reaction,
      details: obj.details ?? null,
      renderStyle: obj.renderStyle ?? null,
      markdownPath: markdown.markdownPath,
      markdownSection: markdown.markdownSection,
      markdownColumns: markdown.markdownColumns,
      markdownHeadingLevel: obj.markdownHeadingLevel ?? null,
      markdownAutoIndex: obj.markdownAutoIndex ?? null,
      markdownPlainSectionPaths: Array.isArray(obj.markdownPlainSectionPaths)
        ? obj.markdownPlainSectionPaths
        : [],
      binaryBands,
      glowRing: obj.glowRing ?? false,
      glowRingColor: obj.glowRingColor ?? null,
      glowRingOpacity: obj.glowRingOpacity ?? null,
      glowRingThickness: obj.glowRingThickness ?? null,
      glowRingScale: obj.glowRingScale ?? null,
      baseOpacity: obj.baseOpacity ?? null,
      hideScaleLabel: obj.hideScaleLabel ?? context.hideScaleLabels ?? false,
      wrapLabel: obj.wrapLabel ?? context.wrapLabels ?? true,
    };
    const childScene = this.resolveChildSceneTarget(obj);
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

  resolveSceneKindFromType(sceneType) {
    if (sceneType === "Scene-Index" || sceneType === "Scene-Markdown-View") {
      return "branching";
    }
    if (sceneType === "Scene-Markdown-Split") {
      return "markdown_split";
    }
    if (sceneType === "Scene-Diagram" || sceneType === "Scene-Animation") {
      return "diagram";
    }
    return null;
  }

  inferSceneKindFromStructure(sceneMeta, nodes) {
    const list = Array.isArray(nodes) ? nodes : [];
    const layoutMode = String(this.resolveLayoutMode(sceneMeta) ?? "").toLowerCase();
    const usesRingLayout = layoutMode === "rings";
    const sceneMarkdown = this.resolveMarkdownConfig(sceneMeta);
    const hasNavigation =
      list.some(
        (node) =>
          (typeof node.childScene === "string" && node.childScene.length > 0) ||
          node.markdownAutoIndex === true
      ) || usesRingLayout;
    const hasLeafContent =
      (typeof sceneMarkdown.markdownPath === "string" && sceneMarkdown.markdownPath.length > 0) ||
      list.some(
        (node) =>
          (typeof node.markdownPath === "string" && node.markdownPath.length > 0) ||
          node.markdownAutoIndex === false
      );
    if (hasNavigation || hasLeafContent) {
      return "branching";
    }
    return null;
  }

  resolveSceneKind(sceneData, nodes) {
    const sceneType = sceneData?.scene?.type;
    const typeKind = this.resolveSceneKindFromType(sceneType);
    if (typeKind) {
      return typeKind;
    }
    const inferredKind = this.inferSceneKindFromStructure(sceneData?.scene, nodes);
    if (inferredKind) {
      return inferredKind;
    }
    return "branching";
  }

  shouldApplyStructuredSpherePalette(scenePath, sceneData) {
    const layoutMode = String(this.resolveLayoutMode(sceneData?.scene) ?? "").toLowerCase();
    const isStructuredLayout = layoutMode === "rings";
    const sceneId = String(sceneData?.scene?.id ?? "").toLowerCase();
    const isHomeScene =
      typeof this.homeScenePath === "string" &&
      this.homeScenePath.length > 0 &&
      scenePath === this.homeScenePath;
    if (!isStructuredLayout && !isHomeScene) {
      return false;
    }
    if (typeof scenePath === "string") {
      if (
        scenePath.startsWith("runtime:markdown:") ||
        scenePath === "content/scenes/nuclear/proton.json" ||
        scenePath === "content/scenes/nuclear/neutron.json" ||
        scenePath.startsWith("content/scenes/elements/") ||
        scenePath === "content/scenes/chemistry/periodic_table_scene.json"
      ) {
        return false;
      }
    }
    if (sceneId === "proton" || sceneId === "neutron") {
      return false;
    }
    return true;
  }

  shouldUsePositionalPaletteOrder() {
    return false;
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
    const eligibleNodes = nodes.filter(
      (node) => !!node && node.category !== "legend" && node.fixedPosition !== true
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
      .then(async (data) => {
        const sceneMeta = data.scene ?? {};
        const sceneMarkdown = this.resolveMarkdownConfig(sceneMeta);
        const hideScaleLabels = Boolean(sceneMeta.hideScaleLabels);
        const wrapLabels = sceneMeta.wrapLabels ?? true;
        const idMap = new Map(
          data.objects.map((obj) => [obj.id, this.resolveDisplayTitle(obj) ?? obj.id])
        );
        let nodes = data.objects.map((obj) =>
          this.buildRuntimeNode(obj, {
            hideScaleLabels,
            wrapLabels,
            idMap,
          })
        );
        const structuredPalette = this.resolveSphereColorPalette(data);
        if (this.shouldApplyStructuredSpherePalette(scenePath, data)) {
          this.applyStructuredSpherePalette(nodes, structuredPalette, {
            usePositionalOrder: this.shouldUsePositionalPaletteOrder(scenePath),
          });
        }
        this.applyPersonalityArchitrinoSizing(nodes);
        const autoMarkdownScene = data.scene;
        const autoNodes = await this.buildAutoMarkdownNodes(autoMarkdownScene, nodes);
        if (autoNodes.length) {
          nodes = nodes.concat(autoNodes);
        }
        await this.applyMarkdownDocEligibility(nodes);

        const sceneName = this.resolveDisplayTitle(sceneMeta) ?? scenePath;
        const sceneId = sceneMeta.id ?? null;
        const sceneKind = this.resolveSceneKind(data, nodes);
        const rawLayoutMode = this.resolveLayoutMode(sceneMeta);
        const legacyLayoutMode = sceneMeta?.type ? null : rawLayoutMode;
        const config = {
          layout: nodes.some((node) => node.orbit) ? "orbit" : "static",
          layoutType: rawLayoutMode,
          layoutMode: legacyLayoutMode,
          layoutColumns:
            Number.isInteger(data.scene?.layoutColumns) && data.scene.layoutColumns > 0
              ? data.scene.layoutColumns
              : null,
          nodes,
          links: Array.isArray(data.links) ? data.links : [],
          sceneName,
          sceneId,
          sceneKind,
          markdownPath: sceneMarkdown.markdownPath,
          markdownSection: sceneMarkdown.markdownSection,
          markdownColumns: sceneMarkdown.markdownColumns,
          markdownShowTitle: sceneMeta.markdownShowTitle ?? true,
          markdownAutoOpen: sceneMarkdown.markdownAutoOpen ?? true,
          centerOn: sceneMeta.centerOn ?? null,
          autoMarkdownPath:
            typeof sceneMeta.autoMarkdownPath === "string" ? sceneMeta.autoMarkdownPath : null,
          autoMarkdownSection:
            typeof sceneMeta.autoMarkdownSection === "string" ? sceneMeta.autoMarkdownSection : null,
          autoMarkdownHeadingLevel:
            typeof sceneMeta.autoMarkdownHeadingLevel === "number"
              ? sceneMeta.autoMarkdownHeadingLevel
              : null,
          autoMarkdownIncludeExistingInLayout:
            sceneMeta.autoMarkdownIncludeExistingInLayout === true,
          autoMarkdownNodeRadius:
            typeof sceneMeta.autoMarkdownNodeRadius === "number"
              ? sceneMeta.autoMarkdownNodeRadius
              : null,
          autoMarkdownRingRadius:
            typeof sceneMeta.autoMarkdownRingRadius === "number"
              ? sceneMeta.autoMarkdownRingRadius
              : null,
          autoMarkdownMaxRingCount:
            typeof sceneMeta.autoMarkdownMaxRingCount === "number"
              ? sceneMeta.autoMarkdownMaxRingCount
              : null,
          autoMarkdownGridSpacing:
            typeof sceneMeta.autoMarkdownGridSpacing === "number"
              ? sceneMeta.autoMarkdownGridSpacing
              : null,
          autoMarkdownColumns:
            sceneMeta.autoMarkdownColumns === 1 || sceneMeta.autoMarkdownColumns === 2
              ? sceneMeta.autoMarkdownColumns
              : null,
          autoMarkdownPalette:
            Array.isArray(sceneMeta.autoMarkdownPalette) ? sceneMeta.autoMarkdownPalette : null,
          autoMarkdownPaletteName:
            typeof sceneMeta.autoMarkdownPaletteName === "string"
              ? sceneMeta.autoMarkdownPaletteName
              : this.defaultAutoMarkdownPaletteName,
          autoMarkdownColor:
            typeof sceneMeta.autoMarkdownColor === "string" ? sceneMeta.autoMarkdownColor : null,
          autoMarkdownExcludePaths: Array.isArray(sceneMeta.autoMarkdownExcludePaths)
            ? sceneMeta.autoMarkdownExcludePaths
            : [],
          autoMarkdownPlainPaths: Array.isArray(sceneMeta.autoMarkdownPlainPaths)
            ? sceneMeta.autoMarkdownPlainPaths
            : [],
          autoMarkdownDefaultIndex: sceneMeta.autoMarkdownDefaultIndex === true,
          autoMarkdownIndexPaths: Array.isArray(sceneMeta.autoMarkdownIndexPaths)
            ? sceneMeta.autoMarkdownIndexPaths
            : [],
          autoMarkdownPlainSectionPaths: Array.isArray(sceneMeta.autoMarkdownPlainSectionPaths)
            ? sceneMeta.autoMarkdownPlainSectionPaths
            : [],
          autoMarkdownSectionDepth:
            typeof sceneMeta.autoMarkdownSectionDepth === "number"
              ? sceneMeta.autoMarkdownSectionDepth
              : null,
          autoMarkdownOverrides:
            sceneMeta.autoMarkdownOverrides && typeof sceneMeta.autoMarkdownOverrides === "object"
              ? sceneMeta.autoMarkdownOverrides
              : null,
        };
        this.levelConfigs[scenePath] = config;
        this.sceneConfigCache.set(scenePath, config);
        return config;
      })
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
    const layoutMode = String(config.layoutType ?? config.layoutMode ?? "").toLowerCase();
    const isRingLayout = layoutMode === "rings";
    const hasAutoMarkdownSource =
      typeof config.autoMarkdownPath === "string" && config.autoMarkdownPath.length > 0;
    if (!isRingLayout || !hasAutoMarkdownSource) {
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
