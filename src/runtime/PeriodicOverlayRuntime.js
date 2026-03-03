export function createPeriodicOverlayRuntime(deps) {
  const {
    periodicOverlay,
    periodicGrid,
    periodicLegend,
    hydePeriodicOverlay,
    hydePeriodicGrid,
    hydePeriodicLegend,
    periodicSceneId,
    hydePeriodicSceneId,
    detailPanel,
    detailTitle,
    detailBody,
    elementLegend,
    elementLegendItems,
    navUpButton,
    homeButton,
    sceneSearchToggle,
    periodicCategoryColors,
    periodicTableService,
    sceneGraphManifestService,
    getCurrentLevel,
    searchBackStack,
    navigationStack,
    updateNavButton,
    jumpToScene,
    isTransitionActive,
    fetchImpl,
  } = deps;

  let periodicGridBuilt = false;
  let hydePeriodicGridBuilt = false;
  let hydeHotspotTemplates = null;
  let elementInfoPinned = false;
  const activePeriodicSceneId =
    typeof periodicSceneId === "string" && periodicSceneId ? periodicSceneId : "periodic_table";
  const activeHydePeriodicSceneId =
    typeof hydePeriodicSceneId === "string" && hydePeriodicSceneId
      ? hydePeriodicSceneId
      : "hyde_periodic_table";
  const hydeArtworkPath = "content/assets/hyde_periodic_table.svg";
  const svgNamespace = "http://www.w3.org/2000/svg";

  async function ensurePeriodicTable() {
    return periodicTableService.ensure(
      (...args) => fetchImpl(...args),
      "content/scenes/chemistry/periodic_table.json"
    );
  }

  function getElementBySymbol(symbol) {
    return periodicTableService.findBySymbol(symbol);
  }

  async function resolveElementScenePath(symbol) {
    const normalizedSymbol = String(symbol || "").trim().toLowerCase();
    if (!normalizedSymbol) {
      return null;
    }
    if (
      sceneGraphManifestService &&
      typeof sceneGraphManifestService.resolvePeriodicElementScenePath === "function"
    ) {
      const targetFromManifest = await sceneGraphManifestService.resolvePeriodicElementScenePath(
        normalizedSymbol
      );
      if (typeof targetFromManifest === "string" && targetFromManifest) {
        return targetFromManifest;
      }
    }
    console.warn(
      `[PeriodicOverlayRuntime] Missing manifest route for periodic symbol "${normalizedSymbol}"`
    );
    return null;
  }

  function getPeriodicColor(category) {
    if (!category) {
      return periodicCategoryColors.unknown;
    }
    const key = category.toLowerCase();
    return periodicCategoryColors[key] || periodicCategoryColors.unknown;
  }

  function formatTemperatureKelvin(value) {
    if (value === undefined || value === null || value === "") {
      return null;
    }
    const text = String(value).trim();
    if (!text) {
      return null;
    }
    return /\bk\b/iu.test(text) ? text : `${text} K`;
  }

  function showPeriodicElementDetail(el) {
    if (!detailPanel || !detailTitle || !detailBody) {
      return;
    }
    detailPanel.classList.remove("is-element-info");
    detailPanel.classList.add("is-open");
    detailPanel.setAttribute("aria-hidden", "false");
    detailPanel.inert = false;
    detailTitle.textContent = `${el.symbol} — ${el.name}`;
    const fields = [
      ["Atomic #", el.number],
      ["Category", el.category],
      ["Phase", el.phase],
      ["Atomic mass", el.atomic_mass ? `${el.atomic_mass}` : null],
      ["Electron config", el.electron_configuration_semantic],
      ["Electronegativity", el.electronegativity_pauling],
      ["Electron affinity", el.electron_affinity],
      ["Melting point", formatTemperatureKelvin(el.melt)],
      ["Boiling point", formatTemperatureKelvin(el.boil)],
      ["Density", el.density],
      ["Block", el.block],
      ["Shells", Array.isArray(el.shells) ? el.shells.join(", ") : el.shells],
      ["Summary", el.summary],
    ];
    detailBody.innerHTML = "";
    fields.forEach(([label, value]) => {
      if (value === undefined || value === null || value === "") {
        return;
      }
      const isSummary = label === "Summary";
      const row = document.createElement("div");
      row.className = "detail-row" + (isSummary ? " summary-row" : "");
      const key = document.createElement("div");
      key.className = "detail-key";
      key.textContent = label;
      const val = document.createElement("div");
      val.className = "detail-value";
      val.textContent = String(value);
      row.appendChild(key);
      row.appendChild(val);
      detailBody.appendChild(row);
    });
  }

  function rememberCurrentLevelForReturn() {
    const currentLevel = getCurrentLevel();
    if (!currentLevel) {
      return;
    }
    searchBackStack.push({
      levelId: currentLevel.id,
      navigationStack: navigationStack.map((entry) => ({
        levelId: entry.levelId,
        focusNodeId: entry.focusNodeId,
      })),
    });
    updateNavButton();
  }

  async function openPeriodicElementScene(el, overlay) {
    showPeriodicElementDetail(el);
    rememberCurrentLevelForReturn();
    const path = await resolveElementScenePath(el.symbol);
    if (!path) {
      return;
    }
    if (overlay) {
      overlay.classList.add("is-fading");
    }
    jumpToScene(path, { mode: "jump", startScale: 0.35, duration: 2000 });
  }

  function renderPeriodicLegend(legend, legendSet) {
    legend.innerHTML = "";
    const legendFrag = document.createDocumentFragment();
    Array.from(legendSet.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([label, color]) => {
        const item = document.createElement("div");
        item.className = "ptable-legend-item";
        item.innerHTML = `<span class="ptable-legend-swatch" style="background:${color}"></span>${label}`;
        legendFrag.appendChild(item);
      });
    legend.appendChild(legendFrag);
  }

  function multiplySvgMatrices(a, b) {
    return [
      a[0] * b[0] + a[2] * b[1],
      a[1] * b[0] + a[3] * b[1],
      a[0] * b[2] + a[2] * b[3],
      a[1] * b[2] + a[3] * b[3],
      a[0] * b[4] + a[2] * b[5] + a[4],
      a[1] * b[4] + a[3] * b[5] + a[5],
    ];
  }

  function applySvgMatrixToPoint(matrix, x, y) {
    return {
      x: matrix[0] * x + matrix[2] * y + matrix[4],
      y: matrix[1] * x + matrix[3] * y + matrix[5],
    };
  }

  function parseSvgTransformMatrix(transformValue) {
    if (!transformValue) {
      return [1, 0, 0, 1, 0, 0];
    }
    let matrix = [1, 0, 0, 1, 0, 0];
    const transformPattern = /(matrix|translate|rotate|scale)\(([^)]*)\)/g;
    let match = transformPattern.exec(transformValue);
    while (match) {
      const transformType = match[1];
      const numbers = match[2]
        .split(/[ ,]+/)
        .map((token) => token.trim())
        .filter(Boolean)
        .map(Number);
      let transformMatrix = [1, 0, 0, 1, 0, 0];
      if (transformType === "matrix" && numbers.length >= 6) {
        transformMatrix = [
          numbers[0],
          numbers[1],
          numbers[2],
          numbers[3],
          numbers[4],
          numbers[5],
        ];
      } else if (transformType === "translate") {
        const tx = numbers[0] || 0;
        const ty = numbers.length > 1 ? numbers[1] : 0;
        transformMatrix = [1, 0, 0, 1, tx, ty];
      } else if (transformType === "scale") {
        const sx = numbers[0] || 1;
        const sy = numbers.length > 1 ? numbers[1] : sx;
        transformMatrix = [sx, 0, 0, sy, 0, 0];
      } else if (transformType === "rotate") {
        const angle = ((numbers[0] || 0) * Math.PI) / 180;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        if (numbers.length > 2) {
          const cx = numbers[1];
          const cy = numbers[2];
          const toOrigin = [1, 0, 0, 1, -cx, -cy];
          const fromOrigin = [1, 0, 0, 1, cx, cy];
          const rotation = [cos, sin, -sin, cos, 0, 0];
          transformMatrix = multiplySvgMatrices(multiplySvgMatrices(fromOrigin, rotation), toOrigin);
        } else {
          transformMatrix = [cos, sin, -sin, cos, 0, 0];
        }
      }
      matrix = multiplySvgMatrices(matrix, transformMatrix);
      match = transformPattern.exec(transformValue);
    }
    return matrix;
  }

  function extractHydeHotspotTemplates(svgText) {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(svgText, "image/svg+xml");
    const root = parsed.documentElement;
    if (!root || root.tagName.toLowerCase() !== "svg") {
      return [];
    }
    return Array.from(root.querySelectorAll("circle"))
      .map((circle, index) => {
        const cx = Number.parseFloat(circle.getAttribute("cx") || "");
        const cy = Number.parseFloat(circle.getAttribute("cy") || "");
        const r = Number.parseFloat(circle.getAttribute("r") || "");
        if (!Number.isFinite(cx) || !Number.isFinite(cy) || !Number.isFinite(r)) {
          return null;
        }
        const transform = circle.getAttribute("transform");
        const center = transform
          ? applySvgMatrixToPoint(parseSvgTransformMatrix(transform), cx, cy)
          : { x: cx, y: cy };
        return {
          index,
          cx,
          cy,
          r,
          transform: transform || null,
          dashed: /dasharray/i.test(circle.getAttribute("style") || ""),
          center,
        };
      })
      .filter(Boolean);
  }

  async function ensureHydeHotspotTemplates() {
    if (hydeHotspotTemplates) {
      return hydeHotspotTemplates;
    }
    try {
      const response = await fetchImpl(hydeArtworkPath);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const svgText = await response.text();
      hydeHotspotTemplates = extractHydeHotspotTemplates(svgText);
    } catch (error) {
      console.warn("[PeriodicOverlayRuntime] Failed to parse Hyde SVG hotspots", error);
      hydeHotspotTemplates = [];
    }
    return hydeHotspotTemplates;
  }

  function orderHydeHotspotsForSpiralNavigation(hotspots) {
    if (!hotspots.length) {
      return [];
    }
    const centerSeed = hotspots[0].center;
    const annotated = hotspots.map((hotspot) => ({
      ...hotspot,
      radialDistance: Math.hypot(hotspot.center.x - centerSeed.x, hotspot.center.y - centerSeed.y),
    }));
    let current = annotated.reduce((best, hotspot) =>
      !best || hotspot.radialDistance < best.radialDistance ? hotspot : best
    );
    const ordered = [current];
    const byIndex = new Map(annotated.map((hotspot) => [hotspot.index, hotspot]));
    const remaining = new Set(annotated.map((hotspot) => hotspot.index));
    remaining.delete(current.index);
    while (remaining.size) {
      let best = null;
      let bestScore = Number.POSITIVE_INFINITY;
      remaining.forEach((candidateIndex) => {
        const candidate = byIndex.get(candidateIndex);
        if (!candidate) {
          return;
        }
        const jumpDistance = Math.hypot(
          candidate.center.x - current.center.x,
          candidate.center.y - current.center.y
        );
        const radialDelta = candidate.radialDistance - current.radialDistance;
        const inwardPenalty = radialDelta < -20 ? Math.abs(radialDelta) * 6 : 0;
        const longJumpPenalty = jumpDistance > 250 ? (jumpDistance - 250) * 3 : 0;
        const score = jumpDistance + inwardPenalty + longJumpPenalty;
        if (score < bestScore) {
          best = candidate;
          bestScore = score;
        }
      });
      if (!best) {
        break;
      }
      ordered.push(best);
      remaining.delete(best.index);
      current = best;
    }
    return ordered;
  }

  async function buildHydePeriodicMap(data, options = {}) {
    const grid = options.grid ?? hydePeriodicGrid;
    const legend = options.legend ?? hydePeriodicLegend;
    const overlay = options.overlay ?? hydePeriodicOverlay;
    if (!grid || !legend || !data?.elements) {
      return;
    }
    if (!(grid instanceof SVGElement)) {
      buildPeriodicGrid(data, {
        ...options,
        showCellChrome: false,
      });
      return;
    }
    const templates = await ensureHydeHotspotTemplates();
    if (!templates.length) {
      buildPeriodicGrid(data, {
        ...options,
        showCellChrome: false,
      });
      return;
    }
    const hotspots = orderHydeHotspotsForSpiralNavigation(templates);
    const elements = [...data.elements]
      .filter((el) => Number.isFinite(Number(el.number)))
      .sort((a, b) => Number(a.number) - Number(b.number));
    const mappedCount = Math.min(hotspots.length, elements.length);
    if (mappedCount < elements.length) {
      console.warn(
        `[PeriodicOverlayRuntime] Hyde hotspot count (${hotspots.length}) is lower than element count (${elements.length}); only the first ${mappedCount} elements were mapped`
      );
    }
    grid.innerHTML = "";
    const legendSet = new Map();
    const hotspotNodes = [];
    for (let index = 0; index < mappedCount; index += 1) {
      const hotspot = hotspots[index];
      const element = elements[index];
      const color = getPeriodicColor(element.category);
      const circle = document.createElementNS(svgNamespace, "circle");
      circle.setAttribute("cx", `${hotspot.cx}`);
      circle.setAttribute("cy", `${hotspot.cy}`);
      circle.setAttribute("r", `${hotspot.r}`);
      if (hotspot.transform) {
        circle.setAttribute("transform", hotspot.transform);
      }
      circle.classList.add("hyde-hotspot");
      circle.setAttribute("fill", "transparent");
      circle.setAttribute("pointer-events", "all");
      circle.setAttribute("role", "button");
      circle.setAttribute("tabindex", "0");
      circle.dataset.symbol = element.symbol;
      circle.dataset.number = `${element.number}`;
      circle.dataset.sequenceIndex = `${index}`;
      circle.setAttribute("aria-label", `${element.name} (${element.symbol})`);
      circle.setAttribute("aria-keyshortcuts", "ArrowLeft ArrowRight Enter Space");
      const title = document.createElementNS(svgNamespace, "title");
      title.textContent = `${element.number} ${element.name} (${element.symbol})`;
      circle.appendChild(title);
      circle.addEventListener("click", () => {
        openPeriodicElementScene(element, overlay);
      });
      circle.addEventListener("mouseenter", () => showPeriodicElementDetail(element));
      circle.addEventListener("focus", () => showPeriodicElementDetail(element));
      circle.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPeriodicElementScene(element, overlay);
          return;
        }
        if (event.key === "ArrowLeft") {
          const previous = hotspotNodes[Math.max(0, index - 1)];
          if (previous) {
            event.preventDefault();
            previous.focus();
          }
          return;
        }
        if (event.key === "ArrowRight") {
          const next = hotspotNodes[Math.min(hotspotNodes.length - 1, index + 1)];
          if (next) {
            event.preventDefault();
            next.focus();
          }
        }
      });
      grid.appendChild(circle);
      hotspotNodes.push(circle);
      const legendKey = element.category || "Unknown";
      if (!legendSet.has(legendKey)) {
        legendSet.set(legendKey, color);
      }
    }
    renderPeriodicLegend(legend, legendSet);
    if (options.onBuilt) {
      options.onBuilt();
    }
  }

  function buildPeriodicGrid(data, options = {}) {
    const grid = options.grid ?? periodicGrid;
    const legend = options.legend ?? periodicLegend;
    const overlay = options.overlay ?? periodicOverlay;
    if (!grid || !legend || !data?.elements) {
      return;
    }
    grid.innerHTML = "";
    const frag = document.createDocumentFragment();
    const legendSet = new Map();
    const showCellChrome = options.showCellChrome !== false;
    data.elements.forEach((el) => {
      const btn = document.createElement("button");
      btn.className = "ptable-cell";
      btn.style.gridColumn = el.xpos;
      btn.style.gridRow = el.ypos;
      const color = getPeriodicColor(el.category);
      if (showCellChrome) {
        btn.style.background = `${color}22`;
        btn.style.borderColor = color;
      } else {
        btn.classList.add("ptable-hit-target");
      }
      btn.dataset.symbol = el.symbol;
      btn.dataset.number = el.number;
      btn.setAttribute("aria-label", `${el.name} (${el.symbol})`);
      btn.title = `${el.number} ${el.name} (${el.symbol})`;
      if (showCellChrome) {
        btn.innerHTML = `
          <div class="ptable-number">${el.number}</div>
          <div class="ptable-symbol">${el.symbol}</div>
          <div class="ptable-name">${el.name}</div>
        `;
      }
      btn.addEventListener("click", () => {
        openPeriodicElementScene(el, overlay);
      });
      btn.addEventListener("mouseenter", () => showPeriodicElementDetail(el));
      frag.appendChild(btn);
      const legendKey = el.category || "Unknown";
      if (!legendSet.has(legendKey)) {
        legendSet.set(legendKey, color);
      }
    });
    grid.appendChild(frag);
    renderPeriodicLegend(legend, legendSet);
    if (options.onBuilt) {
      options.onBuilt();
    }
  }

  function setOverlayOpenState(overlay, isOpen) {
    if (!overlay) {
      return;
    }
    overlay.classList.toggle("is-open", !!isOpen);
    overlay.setAttribute("aria-hidden", isOpen ? "false" : "true");
    overlay.inert = !isOpen;
    if (!isOpen) {
      if (overlay.contains(document.activeElement)) {
        (navUpButton ?? homeButton ?? sceneSearchToggle ?? document.body).focus();
      }
      overlay.classList.remove("is-fading");
    }
  }

  async function updatePeriodicOverlay() {
    if (!periodicOverlay && !hydePeriodicOverlay) {
      return;
    }
    const currentLevel = getCurrentLevel();
    const sceneId = currentLevel?.sceneId;
    const scenePath = typeof currentLevel?.id === "string" ? currentLevel.id : "";
    const isPeriodic =
      sceneId === activePeriodicSceneId ||
      scenePath.endsWith("/periodic_table_scene.json");
    const isHydePeriodic =
      sceneId === activeHydePeriodicSceneId ||
      scenePath.endsWith("/hyde_periodic_table_scene.json");

    setOverlayOpenState(periodicOverlay, isPeriodic);
    setOverlayOpenState(hydePeriodicOverlay, isHydePeriodic);

    if (!isPeriodic && !isHydePeriodic) {
      return;
    }

    const data = await ensurePeriodicTable();
    if (data && isPeriodic && !periodicGridBuilt) {
      buildPeriodicGrid(data, {
        grid: periodicGrid,
        legend: periodicLegend,
        overlay: periodicOverlay,
        onBuilt: () => {
          periodicGridBuilt = true;
        },
      });
    }
    if (data && isHydePeriodic && !hydePeriodicGridBuilt) {
      await buildHydePeriodicMap(data, {
        grid: hydePeriodicGrid,
        legend: hydePeriodicLegend,
        overlay: hydePeriodicOverlay,
        onBuilt: () => {
          hydePeriodicGridBuilt = true;
        },
      });
    }
  }

  function updateElementLegend() {
    if (!elementLegend) {
      return;
    }
    const currentLevel = getCurrentLevel();
    const isElement =
      currentLevel && typeof currentLevel.id === "string"
        ? currentLevel.id.startsWith("content/scenes/elements/")
        : false;
    elementLegend.classList.toggle("is-open", isElement);
    elementLegend.setAttribute("aria-hidden", isElement ? "false" : "true");
    elementLegend.inert = !isElement;
  }

  async function updateElementInfoPanel() {
    if (!detailPanel || !detailTitle || !detailBody) {
      return;
    }
    const currentLevel = getCurrentLevel();
    const scenePath = currentLevel?.id ?? "";
    const sceneId = currentLevel?.sceneId ?? "";
    const symbolFromPath = scenePath.includes("/elements/")
      ? scenePath.split("/").pop()?.replace(".json", "")
      : null;
    const symbol = (sceneId || symbolFromPath || "").trim();
    const isElement =
      scenePath.includes("/elements/") || /^[a-z]{1,3}$/i.test(symbol);

    if (!isElement) {
      if (elementInfoPinned) {
        detailPanel.classList.remove("is-open");
        detailPanel.classList.remove("is-element-info");
        detailPanel.setAttribute("aria-hidden", "true");
        detailPanel.inert = true;
        elementInfoPinned = false;
      }
      return;
    }

    const data = await ensurePeriodicTable();
    if (!data?.elements) {
      return;
    }
    const el = getElementBySymbol(symbol);
    if (!el) {
      return;
    }

    detailPanel.classList.add("is-open");
    detailPanel.classList.add("is-element-info");
    detailPanel.setAttribute("aria-hidden", "false");
    detailPanel.inert = false;
    elementInfoPinned = true;

    detailTitle.textContent = "";
    const protons = el.number ?? 0;
    const neutrons = Math.max(0, Math.round(el.atomic_mass ?? 0) - protons);
    const electrons = protons;
    const orbitals =
      typeof el.electron_configuration_semantic === "string"
        ? el.electron_configuration_semantic.split(/\s+/).filter(Boolean)
        : [];

    const fields = [
      ["Atomic #", el.number],
      ["Category", el.category],
      ["Phase", el.phase],
      ["Atomic mass", el.atomic_mass ? `${el.atomic_mass}` : null],
      ["Electron config", el.electron_configuration_semantic],
      ["Melting point", formatTemperatureKelvin(el.melt)],
      ["Boiling point", formatTemperatureKelvin(el.boil)],
      ["Density", el.density],
      ["Shells", Array.isArray(el.shells) ? el.shells.join(", ") : el.shells],
      ["Protons", protons],
      ["Neutrons", neutrons],
      ["Electrons", electrons],
    ];

    detailBody.innerHTML = "";
    fields.forEach(([label, value]) => {
      if (value === undefined || value === null || value === "") {
        return;
      }
      const row = document.createElement("div");
      row.className = "detail-row";
      const key = document.createElement("div");
      key.className = "detail-key";
      key.textContent = label;
      const val = document.createElement("div");
      val.className = "detail-value";
      val.textContent = String(value);
      row.appendChild(key);
      row.appendChild(val);
      detailBody.appendChild(row);
    });

    if (orbitals.length) {
      const row = document.createElement("div");
      row.className = "detail-row detail-row-full";
      const key = document.createElement("div");
      key.className = "detail-key";
      key.textContent = "Orbitals (inner \u2192 outer)";
      const val = document.createElement("div");
      val.className = "detail-value";
      val.style.width = "100%";
      const list = document.createElement("div");
      list.style.display = "flex";
      list.style.flexWrap = "wrap";
      list.style.gap = "6px";
      list.style.marginTop = "8px";
      list.style.justifyContent = "flex-start";
      orbitals.forEach((orb) => {
        const chip = document.createElement("span");
        chip.textContent = orb;
        chip.style.padding = "2px 6px";
        chip.style.borderRadius = "8px";
        chip.style.background = "rgba(255,255,255,0.08)";
        chip.style.border = "1px solid rgba(160, 170, 220, 0.25)";
        list.appendChild(chip);
      });
      val.appendChild(list);
      row.appendChild(key);
      row.appendChild(val);
      detailBody.appendChild(row);
    }
  }

  function wireElementLegend() {
    if (!elementLegendItems.length) {
      return;
    }
    if (
      !sceneGraphManifestService ||
      typeof sceneGraphManifestService.listElementLegendTargets !== "function"
    ) {
      console.warn("[PeriodicOverlayRuntime] Missing scene graph manifest service for legend routes");
      return;
    }

    sceneGraphManifestService
      .listElementLegendTargets()
      .then((legendTargets) => {
        const targets = Array.isArray(legendTargets) ? legendTargets : [];
        if (!targets.length) {
          console.warn("[PeriodicOverlayRuntime] No legend routes found in scene graph manifest");
          return;
        }
        if (targets.length !== elementLegendItems.length) {
          console.warn(
            `[PeriodicOverlayRuntime] Legend route count (${targets.length}) does not match legend button count (${elementLegendItems.length})`
          );
        }
        elementLegendItems.forEach((btn, index) => {
          const scenePath = targets[index] ?? null;
          if (!scenePath) {
            btn.disabled = true;
            btn.setAttribute("aria-disabled", "true");
            return;
          }
          btn.disabled = false;
          btn.removeAttribute("aria-disabled");
          btn.addEventListener("click", () => {
            if (isTransitionActive()) {
              return;
            }
            const currentLevel = getCurrentLevel();
            if (currentLevel) {
              searchBackStack.push({
                levelId: currentLevel.id,
                navigationStack: navigationStack.map((entry) => ({
                  levelId: entry.levelId,
                  focusNodeId: entry.focusNodeId,
                })),
              });
              updateNavButton();
            }
            jumpToScene(scenePath, { mode: "jump" });
          });
        });
      })
      .catch((error) => {
        console.warn("[PeriodicOverlayRuntime] Failed to load legend routes", error);
      });
  }

  function hidePeriodicOverlayImmediately() {
    if (periodicOverlay) {
      periodicOverlay.classList.remove("is-open");
      periodicOverlay.classList.remove("is-fading");
      periodicOverlay.setAttribute("aria-hidden", "true");
      periodicOverlay.inert = true;
    }
    if (hydePeriodicOverlay) {
      hydePeriodicOverlay.classList.remove("is-open");
      hydePeriodicOverlay.classList.remove("is-fading");
      hydePeriodicOverlay.setAttribute("aria-hidden", "true");
      hydePeriodicOverlay.inert = true;
    }
  }

  return {
    hidePeriodicOverlayImmediately,
    updatePeriodicOverlay,
    updateElementLegend,
    updateElementInfoPanel,
    wireElementLegend,
  };
}
