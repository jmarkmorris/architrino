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
    this.deriveMarkdownConfig = deps.deriveMarkdownConfig;
    this.buildAutoMarkdownNodes = deps.buildAutoMarkdownNodes;
    this.resolveMarkdownFileSize = deps.resolveMarkdownFileSize;
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

  resolveSceneKind(sceneData, nodes) {
    const rawKind = sceneData?.scene?.kind;
    if (
      rawKind === "index" ||
      rawKind === "leaf" ||
      rawKind === "hybrid" ||
      rawKind === "diagram" ||
      rawKind === "markdown_split"
    ) {
      return rawKind;
    }
    const list = Array.isArray(nodes) ? nodes : [];
    const hasNavigation =
      list.some(
        (node) =>
          (typeof node.childScene === "string" && node.childScene.length > 0) ||
          node.markdownAutoIndex === true
      ) || sceneData?.scene?.autoSphereRing === true;
    const hasLeafContent =
      (typeof sceneData?.scene?.markdownPath === "string" &&
        sceneData.scene.markdownPath.length > 0) ||
      list.some(
        (node) =>
          (typeof node.markdownPath === "string" && node.markdownPath.length > 0) ||
          node.markdownAutoIndex === false
      );
    if (hasNavigation && hasLeafContent) {
      return "hybrid";
    }
    if (hasNavigation) {
      return "index";
    }
    if (hasLeafContent) {
      return "leaf";
    }
    // If a scene has no outgoing navigation and no markdown content,
    // treat it as terminal content by default.
    return "leaf";
  }

  shouldApplyStructuredSpherePalette(scenePath, sceneData, markdownDerived) {
    const layoutMode = String(sceneData?.scene?.layoutMode ?? "").toLowerCase();
    const isStructuredLayout = layoutMode === "ring" || layoutMode === "grid";
    const isHomeScene =
      typeof this.homeScenePath === "string" &&
      this.homeScenePath.length > 0 &&
      scenePath === this.homeScenePath;
    if (!isStructuredLayout && !isHomeScene) {
      return false;
    }
    if (typeof scenePath === "string") {
      if (
        scenePath.startsWith("__markdown_") ||
        scenePath.startsWith("content/scenes/elements/") ||
        scenePath === "content/scenes/chemistry/periodic_table_scene.json"
      ) {
        return false;
      }
    }
    if (markdownDerived?.autoMarkdownPath || markdownDerived?.autoMarkdownDirectory) {
      return false;
    }
    return true;
  }

  shouldUsePositionalPaletteOrder() {
    return false;
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
    let colorIndex = 0;
    orderedNodes.forEach((node) => {
      node.color = palette[colorIndex % palette.length];
      colorIndex += 1;
    });
  }

  async applyMarkdownDocEligibility(nodes) {
    if (!Array.isArray(nodes) || !nodes.length) {
      return nodes;
    }

    await Promise.all(
      nodes.map(async (node) => {
        const hasDirectMarkdown = typeof node.markdownPath === "string" && node.markdownPath.length > 0;
        if (!hasDirectMarkdown) {
          node.docDrillDownPreferred = false;
          node.markdownGlowEligible = false;
          node.markdownDocIconEligible = false;
          node.markdownDocIcon = false;
          return;
        }

        let markdownByteSize = null;
        if (typeof this.resolveMarkdownFileSize === "function") {
          markdownByteSize = await this.resolveMarkdownFileSize(node.markdownPath);
        }
        const isEligible =
          Number.isFinite(markdownByteSize) &&
          markdownByteSize >= this.markdownGlowMinBytes;
        const isDocIconEligible =
          Number.isFinite(markdownByteSize) &&
          markdownByteSize >= this.markdownDocIconMinBytes;

        node.markdownByteSize = Number.isFinite(markdownByteSize)
          ? markdownByteSize
          : null;
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
        const hideScaleLabels = Boolean(data.scene?.hideScaleLabels);
        const wrapLabels = data.scene?.wrapLabels ?? true;
        const markdownDerived = this.deriveMarkdownConfig(data.scene?.markdown);
        const idMap = new Map(data.objects.map((obj) => [obj.id, obj.label || obj.id]));
        let nodes = data.objects.map((obj) => {
          const hasScale =
            obj.scaleExponent !== undefined && obj.scaleExponent !== null;
          const binaryBands = Array.isArray(obj.binaryBands)
            ? obj.binaryBands
            : null;
          let color = obj.color ?? "#3a5a8a";
          if (typeof color === "string" && this.colorTokens[color]) {
            color = this.colorTokens[color];
          }
          const node = {
            id: obj.id,
            name: obj.label || obj.id,
            scale: hasScale ? obj.scaleExponent : null,
            hasScale,
            radius: obj.radius ?? 1,
            color,
            position: obj.position ?? [0, 0, 0],
            fixedPosition: obj.fixedPosition ?? false,
            category: obj.category,
            reaction: obj.reaction,
            details: obj.details ?? null,
            renderStyle: obj.renderStyle ?? null,
            markdownPath: obj.markdownPath ?? null,
            markdownSection: obj.markdownSection ?? null,
            markdownColumns: obj.markdownColumns ?? null,
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
            hideScaleLabel: obj.hideScaleLabel ?? hideScaleLabels,
            wrapLabel: obj.wrapLabel ?? wrapLabels,
          };
          if (Array.isArray(obj.subScenes) && obj.subScenes.length > 0) {
            node.childScene = obj.subScenes[0];
          }
          if (obj.motion && obj.motion.type === "orbit") {
            const orbit = obj.motion.orbit || obj.motion;
            const centerLabel = idMap.get(orbit.center) ?? orbit.center;
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
        });
        const structuredPalette = this.resolveSphereColorPalette(data);
        if (this.shouldApplyStructuredSpherePalette(scenePath, data, markdownDerived)) {
          this.applyStructuredSpherePalette(nodes, structuredPalette, {
            usePositionalOrder: this.shouldUsePositionalPaletteOrder(scenePath),
          });
        }
        const autoMarkdownScene = markdownDerived ? { ...data.scene, ...markdownDerived } : data.scene;
        const autoNodes = await this.buildAutoMarkdownNodes(autoMarkdownScene, nodes);
        if (autoNodes.length) {
          nodes = nodes.concat(autoNodes);
        }
        await this.applyMarkdownDocEligibility(nodes);

        const sceneName =
          data.scene?.name ?? data.scene?.id ?? data.scene?.title ?? scenePath;
        const sceneId = data.scene?.id ?? null;
        const sceneKind = this.resolveSceneKind(data, nodes);
        const config = {
          layout: nodes.some((node) => node.orbit) ? "orbit" : "static",
          layoutMode:
            typeof data.scene?.layoutMode === "string" ? data.scene.layoutMode : null,
          layoutColumns:
            Number.isInteger(data.scene?.layoutColumns) && data.scene.layoutColumns > 0
              ? data.scene.layoutColumns
              : null,
          nodes,
          links: Array.isArray(data.links) ? data.links : [],
          sceneName,
          sceneId,
          sceneKind,
          markdownPath: data.scene?.markdownPath ?? null,
          markdownSection: data.scene?.markdownSection ?? null,
          markdownColumns: data.scene?.markdownColumns ?? null,
          markdownAutoOpen: data.scene?.markdownAutoOpen ?? true,
          centerOn: data.scene?.centerOn ?? null,
          autoSphereRing: data.scene?.autoSphereRing ?? false,
          autoMarkdownDirectory: markdownDerived?.autoMarkdownDirectory ?? null,
          autoMarkdownPath: markdownDerived?.autoMarkdownPath ?? null,
          autoMarkdownSection: markdownDerived?.autoMarkdownSection ?? null,
          autoMarkdownHeadingLevel: markdownDerived?.autoMarkdownHeadingLevel ?? null,
          autoMarkdownIncludeExistingInLayout:
            markdownDerived?.autoMarkdownIncludeExistingInLayout ?? false,
          autoMarkdownNodeRadius:
            markdownDerived?.autoMarkdownNodeRadius ?? null,
          autoMarkdownRingRadius:
            markdownDerived?.autoMarkdownRingRadius ?? null,
          autoMarkdownMaxRingCount:
            markdownDerived?.autoMarkdownMaxRingCount ?? null,
          autoMarkdownGridSpacing:
            markdownDerived?.autoMarkdownGridSpacing ?? null,
          autoMarkdownColumns:
            markdownDerived?.autoMarkdownColumns ?? null,
          autoMarkdownPalette:
            markdownDerived?.autoMarkdownPalette ?? null,
          autoMarkdownPaletteName:
            markdownDerived?.autoMarkdownPaletteName ??
            data.scene?.autoMarkdownPaletteName ??
            this.defaultAutoMarkdownPaletteName,
          autoMarkdownColor:
            markdownDerived?.autoMarkdownColor ?? null,
          autoMarkdownExcludePaths: Array.isArray(markdownDerived?.autoMarkdownExcludePaths)
            ? markdownDerived.autoMarkdownExcludePaths
            : [],
          autoMarkdownPlainPaths: Array.isArray(markdownDerived?.autoMarkdownPlainPaths)
            ? markdownDerived.autoMarkdownPlainPaths
            : [],
          autoMarkdownDefaultIndex: markdownDerived?.autoMarkdownDefaultIndex ?? null,
          autoMarkdownIndexPaths: Array.isArray(markdownDerived?.autoMarkdownIndexPaths)
            ? markdownDerived.autoMarkdownIndexPaths
            : [],
          autoMarkdownPlainSectionPaths: Array.isArray(markdownDerived?.autoMarkdownPlainSectionPaths)
            ? markdownDerived.autoMarkdownPlainSectionPaths
            : [],
          labelDocIconOwnLine: data.scene?.labelDocIconOwnLine === true,
          autoMarkdownSectionDepth: markdownDerived?.autoMarkdownSectionDepth ?? null,
          autoMarkdownOverrides: markdownDerived?.autoMarkdownOverrides ?? null,
          autoMarkdownSubdirectories: markdownDerived?.autoMarkdownSubdirectories ?? false,
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
    if (!config || !config.autoSphereRing) {
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
