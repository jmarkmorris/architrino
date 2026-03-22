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
    showHoverTooltip,
    hideHoverTooltip,
    fetchImpl,
  } = deps;

  let periodicGridBuilt = false;
  let hydePeriodicGridBuilt = false;
  let hydeHotspotTemplates = null;
  let hydeInitialFocusTarget = null;
  let hydeActiveHotspotTarget = null;
  let hydeHotspotNodesInSpiralOrder = [];
  let hydeHotspotAtomicNumbersInOrder = [];
  let hydeHotspotCycleAtomicNumbersInOrder = [];
  let hydeHotspotNodeByAtomicNumber = new Map();
  let hydePeriodicWasOpen = false;
  let elementInfoPinned = false;
  const activePeriodicSceneId =
    typeof periodicSceneId === "string" && periodicSceneId ? periodicSceneId : "periodic_table";
  const activeHydePeriodicSceneId =
    typeof hydePeriodicSceneId === "string" && hydePeriodicSceneId
      ? hydePeriodicSceneId
      : "hyde_periodic_table";
  const hydeArtworkPath = "content/assets/hyde_periodic_table.svg";
  const hydeAtomicNumberToHotspotNumber = {
    1: 85,
    2: 58,
    3: 72,
    4: 65,
    5: 64,
    6: 82,
    7: 63,
    8: 83,
    9: 84,
    10: 48,
    11: 67,
    12: 66,
    13: 77,
    14: 1,
    15: 56,
    16: 57,
    17: 59,
    18: 52,
    19: 68,
    20: 73,
    21: 78,
    22: 6,
    23: 45,
    24: 33,
    25: 34,
    26: 35,
    27: 36,
    28: 37,
    29: 38,
    30: 44,
    31: 39,
    32: 2,
    33: 3,
    34: 49,
    35: 60,
    36: 53,
    37: 69,
    38: 74,
    39: 79,
    40: 18,
    41: 19,
    42: 22,
    43: 23,
    44: 40,
    45: 41,
    46: 42,
    47: 43,
    48: 29,
    49: 31,
    50: 4,
    51: 46,
    52: 47,
    53: 61,
    54: 54,
    55: 70,
    56: 75,
    57: 80,
    58: 105,
    59: 99,
    60: 98,
    61: 95,
    62: 94,
    63: 92,
    64: 90,
    65: 89,
    66: 88,
    67: 87,
    68: 86,
    69: 102,
    70: 103,
    71: 104,
    72: 7,
    73: 20,
    74: 21,
    75: 24,
    76: 25,
    77: 26,
    78: 27,
    79: 28,
    80: 30,
    81: 32,
    82: 5,
    83: 50,
    84: 51,
    85: 62,
    86: 55,
    87: 71,
    88: 76,
    89: 81,
    90: 101,
    91: 100,
    92: 97,
    93: 96,
    94: 93,
    95: 91,
    96: 17,
    97: 16,
    98: 15,
    99: 14,
    100: 13,
    101: 12,
    102: 11,
    103: 10,
    104: 8,
    105: 9,
    106: 115,
    107: 114,
    108: 113,
    109: 112,
    110: 111,
    111: 110,
    112: 109,
    113: 107,
    114: 106,
    115: 108,
    116: 116,
    117: 117,
    118: 118,
  };
  const hydeViewBoxWidth = 2592;
  const hydeViewBoxHeight = 1944;
  const svgNamespace = "http://www.w3.org/2000/svg";
  const hydeAtomicCycleOrder = [
    1,
    3, 11, 19, 37, 55, 87, 119,
    4, 12, 20, 38, 56, 88,
    5, 13, 21, 39, 57, 89,
    58, 90, 59, 91, 60, 92, 61, 93, 62, 94, 63, 95, 64, 96, 65, 97, 66, 98,
    67, 99, 68, 100, 69, 101, 70, 102, 71, 103,
    22, 40, 72, 104,
    6, 14, 32, 50, 82, 114,
    7, 15, 33, 51, 83, 115,
    8, 16, 34, 52, 84, 116,
    9, 17, 35, 53, 85, 117,
    2, 10, 18, 36, 54, 86, 118,
    29, 47, 79, 111,
    30, 48, 80, 112,
    31, 49, 81, 113,
    23, 41, 73, 105,
    24, 42, 74, 106,
    25, 43, 75, 107,
    26, 44, 76, 108,
    27, 45, 77, 109,
    28, 46, 78, 110,
  ];
  const hydeHotspotNumberToAtomicNumber = new Map(
    Object.entries(hydeAtomicNumberToHotspotNumber).map(([atomicNumber, hotspotNumber]) => [
      Number(hotspotNumber),
      Number(atomicNumber),
    ])
  );

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
    if (!(legend instanceof HTMLElement)) {
      return;
    }
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

  function showPeriodicTooltip(text, anchorX, anchorY) {
    if (typeof showHoverTooltip !== "function") {
      return;
    }
    showHoverTooltip(text, anchorX, anchorY);
  }

  function hidePeriodicTooltip() {
    if (typeof hideHoverTooltip !== "function") {
      return;
    }
    hideHoverTooltip();
  }

  function isEditableTarget(target) {
    if (!(target instanceof Element)) {
      return false;
    }
    if (target.closest("input, textarea, select")) {
      return true;
    }
    if (target.closest("[contenteditable=''], [contenteditable='true']")) {
      return true;
    }
    return target.isContentEditable === true;
  }

  function showHydeHotspotTooltip(node) {
    if (!(node instanceof Element)) {
      return;
    }
    const tooltipText =
      node.dataset.tooltipText ||
      node.getAttribute("aria-label") ||
      "";
    if (!tooltipText) {
      return;
    }
    const rect = node.getBoundingClientRect();
    showPeriodicTooltip(tooltipText, rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  function clearActiveHydeHotspotVisual(node) {
    if (!(node instanceof Element)) {
      return;
    }
    node.classList.remove("is-focused");
    if (node.classList.contains("hyde-periodic-extra-tile")) {
      return;
    }
    node.style.removeProperty("fill");
    node.style.removeProperty("stroke");
    node.style.removeProperty("stroke-width");
  }

  function applyActiveHydeHotspotVisual(node) {
    if (!(node instanceof Element)) {
      return;
    }
    node.classList.add("is-focused");
    if (node.classList.contains("hyde-periodic-extra-tile")) {
      return;
    }
    node.style.setProperty("fill", "rgba(148, 191, 255, 0.3)");
    node.style.setProperty("stroke", "rgba(245, 249, 255, 0.98)");
    node.style.setProperty("stroke-width", "3.2");
  }

  function setActiveHydeHotspot(node, options = {}) {
    if (!(node instanceof Element)) {
      return null;
    }
    if (hydeActiveHotspotTarget && hydeActiveHotspotTarget !== node) {
      clearActiveHydeHotspotVisual(hydeActiveHotspotTarget);
    }
    hydeActiveHotspotTarget = node;
    applyActiveHydeHotspotVisual(hydeActiveHotspotTarget);
    showHydeHotspotTooltip(hydeActiveHotspotTarget);
    if (options.focus) {
      hydeActiveHotspotTarget.focus({ preventScroll: true });
    }
    return hydeActiveHotspotTarget;
  }

  function moveActiveHydeHotspotByOffset(offset) {
    if (!hydeHotspotAtomicNumbersInOrder.length) {
      return null;
    }
    const activeAtomicNumber = Number.parseInt(
      hydeActiveHotspotTarget?.dataset.number || "",
      10
    );
    const initialAtomicNumber = Number.parseInt(
      hydeInitialFocusTarget?.dataset.number || "",
      10
    );
    const seedAtomicNumber = Number.isFinite(activeAtomicNumber)
      ? activeAtomicNumber
      : initialAtomicNumber;
    const currentIndex = Number.isFinite(seedAtomicNumber)
      ? hydeHotspotAtomicNumbersInOrder.indexOf(seedAtomicNumber)
      : -1;
    const nextIndex =
      currentIndex < 0
        ? 0
        : (currentIndex + offset + hydeHotspotAtomicNumbersInOrder.length) %
          hydeHotspotAtomicNumbersInOrder.length;
    const nextAtomicNumber = hydeHotspotAtomicNumbersInOrder[nextIndex];
    return setActiveHydeHotspot(hydeHotspotNodeByAtomicNumber.get(nextAtomicNumber), {
      focus: true,
    });
  }

  function moveActiveHydeHotspotByCycle(direction) {
    if (!hydeHotspotCycleAtomicNumbersInOrder.length) {
      return null;
    }
    const activeAtomicNumber = Number.parseInt(
      hydeActiveHotspotTarget?.dataset.number || "",
      10
    );
    const initialAtomicNumber = Number.parseInt(
      hydeInitialFocusTarget?.dataset.number || "",
      10
    );
    const seedAtomicNumber = Number.isFinite(activeAtomicNumber)
      ? activeAtomicNumber
      : initialAtomicNumber;
    const currentIndex = Number.isFinite(seedAtomicNumber)
      ? hydeHotspotCycleAtomicNumbersInOrder.indexOf(seedAtomicNumber)
      : -1;
    const offset = direction === "out" ? -1 : 1;
    const nextIndex =
      currentIndex < 0
        ? 0
        : (currentIndex + offset + hydeHotspotCycleAtomicNumbersInOrder.length) %
          hydeHotspotCycleAtomicNumbersInOrder.length;
    const nextAtomicNumber = hydeHotspotCycleAtomicNumbersInOrder[nextIndex];
    return setActiveHydeHotspot(hydeHotspotNodeByAtomicNumber.get(nextAtomicNumber), {
      focus: true,
    });
  }

  function ensureHydeSupplementalLayer(grid) {
    const canvas = grid?.parentElement;
    if (!(canvas instanceof HTMLElement)) {
      return null;
    }
    let layer = canvas.querySelector("#hyde-periodic-supplementals");
    if (!(layer instanceof HTMLElement)) {
      layer = document.createElement("div");
      layer.id = "hyde-periodic-supplementals";
      canvas.appendChild(layer);
    }
    return layer;
  }

  function clampNumber(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function buildHydeSupplementalTilePlacement({
    hotspotAnchor,
    hotspotReference,
    tileWidth = 118.4,
    tileHeight = 118.4,
    offsetX = 0,
    offsetY = 0,
  }) {
    if (!hotspotAnchor?.center) {
      return null;
    }
    const sourceCenter = hotspotAnchor.center;
    const referenceCenter = hotspotReference?.center ?? {
      x: sourceCenter.x - 1,
      y: sourceCenter.y,
    };
    const rawDirectionX = sourceCenter.x - referenceCenter.x;
    const rawDirectionY = sourceCenter.y - referenceCenter.y;
    const rawLength = Math.hypot(rawDirectionX, rawDirectionY);
    const directionX = rawLength > 0 ? rawDirectionX / rawLength : 1;
    const directionY = rawLength > 0 ? rawDirectionY / rawLength : 0;
    const outwardDistance = Math.max(112, (hotspotAnchor.r || 0) * 6.2);
    const baseCenterX = sourceCenter.x + directionX * outwardDistance;
    const baseCenterY = sourceCenter.y + directionY * outwardDistance;
    const leftShift = Math.max(42, tileWidth * 0.28);
    const upwardLift = Math.max(220, tileHeight * 1.5);
    const horizontalAdjust = Math.max(32, tileWidth * 0.22);
    const verticalAdjust = Math.max(276, tileHeight * 1.86);
    const unclampedCenterX = baseCenterX - leftShift + horizontalAdjust;
    const unclampedCenterY = baseCenterY - upwardLift + verticalAdjust - tileHeight;
    const minCenterX = tileWidth / 2 + 12;
    const maxCenterX = hydeViewBoxWidth - tileWidth / 2 - 12;
    const minCenterY = tileHeight / 2 + 12;
    const maxCenterY = hydeViewBoxHeight - tileHeight / 2 - 12;
    const centerX = clampNumber(unclampedCenterX + offsetX, minCenterX, maxCenterX);
    const centerY = clampNumber(unclampedCenterY + offsetY, minCenterY, maxCenterY);
    const left = centerX - tileWidth / 2;
    const top = centerY - tileHeight / 2;
    return {
      center: {
        x: centerX,
        y: centerY,
      },
      left,
      top,
      width: tileWidth,
      height: tileHeight,
    };
  }

  function createHydeSupplementalElementTile({
    layer,
    element,
    placement,
    overlay,
    leftFocusTarget,
    navigationCenter,
  }) {
    if (!layer || !element || !placement) {
      return null;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ptable-cell hyde-periodic-extra-tile";
    button.style.left = `${(placement.left / hydeViewBoxWidth) * 100}%`;
    button.style.top = `${(placement.top / hydeViewBoxHeight) * 100}%`;
    button.style.width = `${(placement.width / hydeViewBoxWidth) * 100}%`;
    button.style.height = `${(placement.height / hydeViewBoxHeight) * 100}%`;
    button.dataset.symbol = element.symbol;
    button.dataset.number = `${element.number}`;
    button.dataset.centerX = `${placement.center.x}`;
    button.dataset.centerY = `${placement.center.y}`;
    button.dataset.radialDistance = `${Math.hypot(
      placement.center.x - (navigationCenter?.x ?? 0),
      placement.center.y - (navigationCenter?.y ?? 0)
    )}`;
    button.dataset.spiralAngle = `${Math.atan2(
      placement.center.y - (navigationCenter?.y ?? 0),
      placement.center.x - (navigationCenter?.x ?? 0)
    )}`;
    button.setAttribute("aria-label", `${element.name} (${element.symbol})`);
    button.setAttribute("aria-keyshortcuts", "ArrowLeft Enter Space");
    const tooltipText = `${element.number} ${element.symbol} - ${element.name}`;
    if (typeof showHoverTooltip !== "function") {
      button.title = `${element.number} ${element.name} (${element.symbol})`;
    }
    button.innerHTML = `
      <div class="ptable-number">${element.number}</div>
      <div class="ptable-symbol">${element.symbol}</div>
      <div class="ptable-name">${element.name}</div>
    `;
    button.addEventListener("click", () => {
      openPeriodicElementScene(element, overlay);
    });
    button.addEventListener("mouseenter", (event) => {
      showPeriodicTooltip(tooltipText, event.clientX, event.clientY);
    });
    button.addEventListener("mousemove", (event) => {
      showPeriodicTooltip(tooltipText, event.clientX, event.clientY);
    });
    button.addEventListener("mouseleave", () => {
      hidePeriodicTooltip();
    });
    button.addEventListener("focus", () => {
      setActiveHydeHotspot(button);
    });
    button.addEventListener("blur", () => {
      if (hydeActiveHotspotTarget !== button) {
        clearActiveHydeHotspotVisual(button);
        hidePeriodicTooltip();
      }
    });
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPeriodicElementScene(element, overlay);
        return;
      }
      if (event.key === "ArrowLeft" && leftFocusTarget) {
        event.preventDefault();
        setActiveHydeHotspot(leftFocusTarget, { focus: true });
      }
    });
    layer.appendChild(button);
    return button;
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

  function computeSvgBoundsFromPoints(points) {
    if (!Array.isArray(points) || !points.length) {
      return null;
    }
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    points.forEach((point) => {
      if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) {
        return;
      }
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
      maxX = Math.max(maxX, point.x);
      maxY = Math.max(maxY, point.y);
    });
    if (
      !Number.isFinite(minX) ||
      !Number.isFinite(minY) ||
      !Number.isFinite(maxX) ||
      !Number.isFinite(maxY)
    ) {
      return null;
    }
    return {
      minX,
      minY,
      maxX,
      maxY,
      width: maxX - minX,
      height: maxY - minY,
      center: {
        x: (minX + maxX) / 2,
        y: (minY + maxY) / 2,
      },
    };
  }

  function applySvgMatrixToBounds(matrix, bounds) {
    if (!Array.isArray(matrix) || matrix.length < 6 || !bounds) {
      return bounds;
    }
    const transformed = [
      applySvgMatrixToPoint(matrix, bounds.minX, bounds.minY),
      applySvgMatrixToPoint(matrix, bounds.maxX, bounds.minY),
      applySvgMatrixToPoint(matrix, bounds.maxX, bounds.maxY),
      applySvgMatrixToPoint(matrix, bounds.minX, bounds.maxY),
    ];
    return computeSvgBoundsFromPoints(transformed);
  }

  function tokenizeSvgPathData(pathData) {
    if (!pathData) {
      return [];
    }
    const tokens = [];
    const tokenPattern = /([a-zA-Z])|([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)/g;
    let match = tokenPattern.exec(pathData);
    while (match) {
      if (match[1]) {
        tokens.push({ type: "command", value: match[1] });
      } else {
        tokens.push({ type: "number", value: Number.parseFloat(match[2]) });
      }
      match = tokenPattern.exec(pathData);
    }
    return tokens;
  }

  function computeSvgPathBounds(pathData) {
    const tokens = tokenizeSvgPathData(pathData);
    if (!tokens.length) {
      return null;
    }
    let tokenIndex = 0;
    let command = null;
    let currentX = 0;
    let currentY = 0;
    let startX = 0;
    let startY = 0;
    const points = [];

    const markPoint = (x, y) => {
      if (Number.isFinite(x) && Number.isFinite(y)) {
        points.push({ x, y });
      }
    };

    const takeNumber = () => {
      if (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
        const value = tokens[tokenIndex].value;
        tokenIndex += 1;
        return value;
      }
      return null;
    };

    while (tokenIndex < tokens.length) {
      if (tokens[tokenIndex].type === "command") {
        command = tokens[tokenIndex].value;
        tokenIndex += 1;
      } else if (!command) {
        tokenIndex += 1;
        continue;
      }

      const relative = command === command.toLowerCase();
      const upperCommand = command.toUpperCase();

      if (upperCommand === "M") {
        let firstPoint = true;
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          const x = takeNumber();
          const y = takeNumber();
          if (!Number.isFinite(x) || !Number.isFinite(y)) {
            break;
          }
          currentX = relative ? currentX + x : x;
          currentY = relative ? currentY + y : y;
          markPoint(currentX, currentY);
          if (firstPoint) {
            startX = currentX;
            startY = currentY;
            firstPoint = false;
          }
        }
      } else if (upperCommand === "L") {
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          const x = takeNumber();
          const y = takeNumber();
          if (!Number.isFinite(x) || !Number.isFinite(y)) {
            break;
          }
          currentX = relative ? currentX + x : x;
          currentY = relative ? currentY + y : y;
          markPoint(currentX, currentY);
        }
      } else if (upperCommand === "H") {
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          const x = takeNumber();
          if (!Number.isFinite(x)) {
            break;
          }
          currentX = relative ? currentX + x : x;
          markPoint(currentX, currentY);
        }
      } else if (upperCommand === "V") {
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          const y = takeNumber();
          if (!Number.isFinite(y)) {
            break;
          }
          currentY = relative ? currentY + y : y;
          markPoint(currentX, currentY);
        }
      } else if (upperCommand === "C") {
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          const x1 = takeNumber();
          const y1 = takeNumber();
          const x2 = takeNumber();
          const y2 = takeNumber();
          const x = takeNumber();
          const y = takeNumber();
          if (
            !Number.isFinite(x1) ||
            !Number.isFinite(y1) ||
            !Number.isFinite(x2) ||
            !Number.isFinite(y2) ||
            !Number.isFinite(x) ||
            !Number.isFinite(y)
          ) {
            break;
          }
          const absX1 = relative ? currentX + x1 : x1;
          const absY1 = relative ? currentY + y1 : y1;
          const absX2 = relative ? currentX + x2 : x2;
          const absY2 = relative ? currentY + y2 : y2;
          const absX = relative ? currentX + x : x;
          const absY = relative ? currentY + y : y;
          markPoint(absX1, absY1);
          markPoint(absX2, absY2);
          markPoint(absX, absY);
          currentX = absX;
          currentY = absY;
        }
      } else if (upperCommand === "S") {
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          const x2 = takeNumber();
          const y2 = takeNumber();
          const x = takeNumber();
          const y = takeNumber();
          if (
            !Number.isFinite(x2) ||
            !Number.isFinite(y2) ||
            !Number.isFinite(x) ||
            !Number.isFinite(y)
          ) {
            break;
          }
          const absX2 = relative ? currentX + x2 : x2;
          const absY2 = relative ? currentY + y2 : y2;
          const absX = relative ? currentX + x : x;
          const absY = relative ? currentY + y : y;
          markPoint(absX2, absY2);
          markPoint(absX, absY);
          currentX = absX;
          currentY = absY;
        }
      } else if (upperCommand === "Q") {
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          const x1 = takeNumber();
          const y1 = takeNumber();
          const x = takeNumber();
          const y = takeNumber();
          if (
            !Number.isFinite(x1) ||
            !Number.isFinite(y1) ||
            !Number.isFinite(x) ||
            !Number.isFinite(y)
          ) {
            break;
          }
          const absX1 = relative ? currentX + x1 : x1;
          const absY1 = relative ? currentY + y1 : y1;
          const absX = relative ? currentX + x : x;
          const absY = relative ? currentY + y : y;
          markPoint(absX1, absY1);
          markPoint(absX, absY);
          currentX = absX;
          currentY = absY;
        }
      } else if (upperCommand === "T") {
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          const x = takeNumber();
          const y = takeNumber();
          if (!Number.isFinite(x) || !Number.isFinite(y)) {
            break;
          }
          currentX = relative ? currentX + x : x;
          currentY = relative ? currentY + y : y;
          markPoint(currentX, currentY);
        }
      } else if (upperCommand === "A") {
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          const radiusX = takeNumber();
          const radiusY = takeNumber();
          const rotation = takeNumber();
          const largeArcFlag = takeNumber();
          const sweepFlag = takeNumber();
          const x = takeNumber();
          const y = takeNumber();
          if (
            !Number.isFinite(radiusX) ||
            !Number.isFinite(radiusY) ||
            !Number.isFinite(rotation) ||
            !Number.isFinite(largeArcFlag) ||
            !Number.isFinite(sweepFlag) ||
            !Number.isFinite(x) ||
            !Number.isFinite(y)
          ) {
            break;
          }
          const absX = relative ? currentX + x : x;
          const absY = relative ? currentY + y : y;
          markPoint(currentX, currentY);
          markPoint(absX, absY);
          markPoint(currentX + Math.abs(radiusX), currentY + Math.abs(radiusY));
          markPoint(currentX - Math.abs(radiusX), currentY - Math.abs(radiusY));
          markPoint(absX + Math.abs(radiusX), absY + Math.abs(radiusY));
          markPoint(absX - Math.abs(radiusX), absY - Math.abs(radiusY));
          currentX = absX;
          currentY = absY;
        }
      } else if (upperCommand === "Z") {
        currentX = startX;
        currentY = startY;
        markPoint(currentX, currentY);
      } else {
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          tokenIndex += 1;
        }
      }
    }

    return computeSvgBoundsFromPoints(points);
  }

  function extractSvgPathAnchorPoints(pathData) {
    const tokens = tokenizeSvgPathData(pathData);
    if (!tokens.length) {
      return [];
    }
    let tokenIndex = 0;
    let command = null;
    let currentX = 0;
    let currentY = 0;
    let startX = 0;
    let startY = 0;
    const points = [];

    const markPoint = (x, y) => {
      if (Number.isFinite(x) && Number.isFinite(y)) {
        points.push({ x, y });
      }
    };

    const takeNumber = () => {
      if (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
        const value = tokens[tokenIndex].value;
        tokenIndex += 1;
        return value;
      }
      return null;
    };

    while (tokenIndex < tokens.length) {
      if (tokens[tokenIndex].type === "command") {
        command = tokens[tokenIndex].value;
        tokenIndex += 1;
      } else if (!command) {
        tokenIndex += 1;
        continue;
      }

      const relative = command === command.toLowerCase();
      const upperCommand = command.toUpperCase();

      if (upperCommand === "M") {
        let firstPoint = true;
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          const x = takeNumber();
          const y = takeNumber();
          if (!Number.isFinite(x) || !Number.isFinite(y)) {
            break;
          }
          currentX = relative ? currentX + x : x;
          currentY = relative ? currentY + y : y;
          markPoint(currentX, currentY);
          if (firstPoint) {
            startX = currentX;
            startY = currentY;
            firstPoint = false;
          }
        }
      } else if (upperCommand === "L") {
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          const x = takeNumber();
          const y = takeNumber();
          if (!Number.isFinite(x) || !Number.isFinite(y)) {
            break;
          }
          currentX = relative ? currentX + x : x;
          currentY = relative ? currentY + y : y;
          markPoint(currentX, currentY);
        }
      } else if (upperCommand === "H") {
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          const x = takeNumber();
          if (!Number.isFinite(x)) {
            break;
          }
          currentX = relative ? currentX + x : x;
          markPoint(currentX, currentY);
        }
      } else if (upperCommand === "V") {
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          const y = takeNumber();
          if (!Number.isFinite(y)) {
            break;
          }
          currentY = relative ? currentY + y : y;
          markPoint(currentX, currentY);
        }
      } else if (upperCommand === "C") {
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          const x1 = takeNumber();
          const y1 = takeNumber();
          const x2 = takeNumber();
          const y2 = takeNumber();
          const x = takeNumber();
          const y = takeNumber();
          if (
            !Number.isFinite(x1) ||
            !Number.isFinite(y1) ||
            !Number.isFinite(x2) ||
            !Number.isFinite(y2) ||
            !Number.isFinite(x) ||
            !Number.isFinite(y)
          ) {
            break;
          }
          currentX = relative ? currentX + x : x;
          currentY = relative ? currentY + y : y;
          markPoint(currentX, currentY);
        }
      } else if (upperCommand === "S") {
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          const x2 = takeNumber();
          const y2 = takeNumber();
          const x = takeNumber();
          const y = takeNumber();
          if (
            !Number.isFinite(x2) ||
            !Number.isFinite(y2) ||
            !Number.isFinite(x) ||
            !Number.isFinite(y)
          ) {
            break;
          }
          currentX = relative ? currentX + x : x;
          currentY = relative ? currentY + y : y;
          markPoint(currentX, currentY);
        }
      } else if (upperCommand === "Q") {
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          const x1 = takeNumber();
          const y1 = takeNumber();
          const x = takeNumber();
          const y = takeNumber();
          if (
            !Number.isFinite(x1) ||
            !Number.isFinite(y1) ||
            !Number.isFinite(x) ||
            !Number.isFinite(y)
          ) {
            break;
          }
          currentX = relative ? currentX + x : x;
          currentY = relative ? currentY + y : y;
          markPoint(currentX, currentY);
        }
      } else if (upperCommand === "T") {
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          const x = takeNumber();
          const y = takeNumber();
          if (!Number.isFinite(x) || !Number.isFinite(y)) {
            break;
          }
          currentX = relative ? currentX + x : x;
          currentY = relative ? currentY + y : y;
          markPoint(currentX, currentY);
        }
      } else if (upperCommand === "A") {
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          const radiusX = takeNumber();
          const radiusY = takeNumber();
          const rotation = takeNumber();
          const largeArcFlag = takeNumber();
          const sweepFlag = takeNumber();
          const x = takeNumber();
          const y = takeNumber();
          if (
            !Number.isFinite(radiusX) ||
            !Number.isFinite(radiusY) ||
            !Number.isFinite(rotation) ||
            !Number.isFinite(largeArcFlag) ||
            !Number.isFinite(sweepFlag) ||
            !Number.isFinite(x) ||
            !Number.isFinite(y)
          ) {
            break;
          }
          currentX = relative ? currentX + x : x;
          currentY = relative ? currentY + y : y;
          markPoint(currentX, currentY);
        }
      } else if (upperCommand === "Z") {
        currentX = startX;
        currentY = startY;
        markPoint(currentX, currentY);
      } else {
        while (tokenIndex < tokens.length && tokens[tokenIndex].type === "number") {
          tokenIndex += 1;
        }
      }
    }

    return points;
  }

  function isHydeFlowerGlyphPath(styleValue, pathData, bounds) {
    if (styleValue !== "fill:none;stroke:#231f20;stroke-miterlimit:10" || !bounds) {
      return false;
    }
    const commandCount = (pathData.match(/[A-Za-z]/g) || []).length;
    if (commandCount < 8 || commandCount > 10) {
      return false;
    }
    if (bounds.width < 55 || bounds.width > 85 || bounds.height < 55 || bounds.height > 85) {
      return false;
    }
    const aspectRatio = bounds.width / bounds.height;
    return aspectRatio > 0.74 && aspectRatio < 1.35;
  }

  function buildHydeFlowerHotspotTemplates(root) {
    const flowerCandidates = Array.from(root.querySelectorAll("path"))
      .map((path) => {
        const styleValue = path.getAttribute("style") || "";
        const pathData = path.getAttribute("d") || "";
        if (!styleValue || !pathData) {
          return null;
        }
        const rawBounds = computeSvgPathBounds(pathData);
        if (!rawBounds) {
          return null;
        }
        const anchorBounds = computeSvgBoundsFromPoints(extractSvgPathAnchorPoints(pathData));
        const transform = path.getAttribute("transform");
        const bounds = transform
          ? applySvgMatrixToBounds(parseSvgTransformMatrix(transform), rawBounds)
          : rawBounds;
        const anchorBoundsWithTransform = transform
          ? applySvgMatrixToBounds(parseSvgTransformMatrix(transform), anchorBounds)
          : anchorBounds;
        if (!isHydeFlowerGlyphPath(styleValue, pathData, bounds)) {
          return null;
        }
        const centerBounds = anchorBoundsWithTransform || bounds;
        const radius = Math.max(16, Math.min(28, Math.max(centerBounds.width, centerBounds.height) * 0.36));
        return {
          cx: centerBounds.center.x,
          cy: centerBounds.center.y,
          r: radius,
          transform: null,
          dashed: false,
          center: {
            x: centerBounds.center.x,
            y: centerBounds.center.y,
          },
        };
      })
      .filter(Boolean);

    const uniqueFlowers = [];
    flowerCandidates.forEach((candidate) => {
      const duplicate = uniqueFlowers.some(
        (existing) =>
          Math.hypot(existing.center.x - candidate.center.x, existing.center.y - candidate.center.y) <
          18
      );
      if (!duplicate) {
        uniqueFlowers.push(candidate);
      }
    });
    return uniqueFlowers;
  }

  function extractHydeHotspotTemplates(svgText) {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(svgText, "image/svg+xml");
    const root = parsed.documentElement;
    if (!root || root.tagName.toLowerCase() !== "svg") {
      return [];
    }
    const circleTemplates = Array.from(root.querySelectorAll("circle"))
      .map((circle) => {
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
          cx,
          cy,
          r,
          transform: transform || null,
          dashed: /dasharray/i.test(circle.getAttribute("style") || ""),
          center,
        };
      })
      .filter(Boolean);

    const connectedCircleTemplates = circleTemplates.filter((candidate, candidateIndex, allCircles) => {
      let nearestDistance = Number.POSITIVE_INFINITY;
      for (let index = 0; index < allCircles.length; index += 1) {
        if (index === candidateIndex) {
          continue;
        }
        const other = allCircles[index];
        const distance = Math.hypot(
          candidate.center.x - other.center.x,
          candidate.center.y - other.center.y
        );
        nearestDistance = Math.min(nearestDistance, distance);
      }
      return nearestDistance <= 160;
    });

    const flowerTemplates = buildHydeFlowerHotspotTemplates(root);
    const templates = [...connectedCircleTemplates, ...flowerTemplates];
    return templates.map((template, index) => ({
      ...template,
      index,
    }));
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
    const legend = Object.prototype.hasOwnProperty.call(options, "legend")
      ? options.legend
      : hydePeriodicLegend;
    const overlay = options.overlay ?? hydePeriodicOverlay;
    if (!grid || !data?.elements) {
      return;
    }
    if (!(grid instanceof SVGElement)) {
      buildPeriodicGrid(data, {
        ...options,
        showCellChrome: false,
      });
      return;
    }
    const supplementalLayer = ensureHydeSupplementalLayer(grid);
    if (supplementalLayer) {
      supplementalLayer.innerHTML = "";
    }
    const templates = await ensureHydeHotspotTemplates();
    if (!templates.length) {
      buildPeriodicGrid(data, {
        ...options,
        showCellChrome: false,
      });
      return;
    }
    const orderedHotspots = orderHydeHotspotsForSpiralNavigation(templates);
    const navigationCenter = orderedHotspots[0]?.center ?? { x: 0, y: 0 };
    const elements = [...data.elements]
      .filter((el) => Number.isFinite(Number(el.number)))
      .sort((a, b) => Number(a.number) - Number(b.number));
    const elementsByAtomicNumber = new Map(
      elements.map((element) => [Number(element.number), element])
    );
    const assignedElements = orderedHotspots.map((hotspot) => {
      const hotspotNumber = hotspot.index + 1;
      const atomicNumber = hydeHotspotNumberToAtomicNumber.get(hotspotNumber);
      if (!Number.isFinite(atomicNumber)) {
        return null;
      }
      const element = elementsByAtomicNumber.get(atomicNumber);
      if (!element) {
        console.warn(
          `[PeriodicOverlayRuntime] Ignoring Hyde assignment for unknown atomic number ${atomicNumber}`
        );
      }
      return element ?? null;
    });

    const mappedCount = assignedElements.filter(Boolean).length;
    const expectedMappedCount = Math.min(
      orderedHotspots.length,
      Object.keys(hydeAtomicNumberToHotspotNumber).length
    );
    if (mappedCount < expectedMappedCount) {
      console.warn(
        `[PeriodicOverlayRuntime] Hyde has ${mappedCount} assigned hotspots for ${expectedMappedCount} configured elements`
      );
    }
    grid.innerHTML = "";
    const legendSet = new Map();
    hydeHotspotNodesInSpiralOrder = [];
    hydeHotspotAtomicNumbersInOrder = [];
    hydeHotspotCycleAtomicNumbersInOrder = [];
    hydeHotspotNodeByAtomicNumber = new Map();
    hydeActiveHotspotTarget = null;
    hydeInitialFocusTarget = null;
    const hotspots = orderedHotspots;
    for (let index = 0; index < hotspots.length; index += 1) {
      const hotspot = hotspots[index];
      const element = assignedElements[index];
      const hotspotDisplayNumber = hotspot.index + 1;
      const atomicDisplayNumber = element ? Number(element.number) : hotspotDisplayNumber;
      const color = element ? getPeriodicColor(element.category) : "rgba(220, 230, 255, 0.24)";
      const circle = document.createElementNS(svgNamespace, "circle");
      circle.setAttribute("cx", `${hotspot.cx}`);
      circle.setAttribute("cy", `${hotspot.cy}`);
      circle.setAttribute("r", `${hotspot.r}`);
      if (hotspot.transform) {
        circle.setAttribute("transform", hotspot.transform);
      }
      circle.classList.add("hyde-hotspot");
      if (!element) {
        circle.classList.add("is-unassigned");
      }
      circle.setAttribute("fill", "transparent");
      circle.setAttribute("pointer-events", "all");
      circle.setAttribute("role", "button");
      circle.setAttribute("tabindex", "0");
      circle.dataset.symbol = element?.symbol || "";
      circle.dataset.number = element ? `${element.number}` : "";
      circle.dataset.sequenceIndex = element ? `${element.number}` : `${index}`;
      circle.dataset.hotspotIndex = `${hotspot.index}`;
      circle.dataset.hotspotNumber = `${atomicDisplayNumber}`;
      circle.dataset.centerX = `${hotspot.center.x}`;
      circle.dataset.centerY = `${hotspot.center.y}`;
      circle.dataset.radialDistance = `${hotspot.radialDistance ?? 0}`;
      circle.dataset.spiralAngle = `${Math.atan2(
        hotspot.center.y - navigationCenter.y,
        hotspot.center.x - navigationCenter.x
      )}`;
      circle.setAttribute(
        "aria-label",
        element
          ? `${element.name} (${element.symbol})`
          : `Hotspot ${hotspotDisplayNumber} (unassigned)`
      );
      circle.setAttribute("aria-keyshortcuts", "ArrowLeft ArrowRight Enter Space");
      const tooltipText = element
        ? `${element.number} ${element.symbol} - ${element.name}`
        : `Hotspot ${hotspotDisplayNumber} (unassigned)`;
      circle.dataset.tooltipText = tooltipText;
      if (typeof showHoverTooltip !== "function") {
        const title = document.createElementNS(svgNamespace, "title");
        title.textContent = element
          ? `${element.number} ${element.name} (${element.symbol})`
          : `Hotspot ${hotspotDisplayNumber} (unassigned)`;
        circle.appendChild(title);
      }
      if (element) {
        circle.addEventListener("click", () => {
          openPeriodicElementScene(element, overlay);
        });
      }
      circle.addEventListener("mouseenter", (event) => {
        showPeriodicTooltip(tooltipText, event.clientX, event.clientY);
      });
      circle.addEventListener("mousemove", (event) => {
        showPeriodicTooltip(tooltipText, event.clientX, event.clientY);
      });
      circle.addEventListener("mouseleave", () => {
        if (hydeActiveHotspotTarget !== circle) {
          hidePeriodicTooltip();
        }
      });
      circle.addEventListener("focus", () => {
        setActiveHydeHotspot(circle);
      });
      circle.addEventListener("blur", () => {
        if (hydeActiveHotspotTarget !== circle) {
          clearActiveHydeHotspotVisual(circle);
          hidePeriodicTooltip();
        }
      });
      circle.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          if (!element) {
            return;
          }
          event.preventDefault();
          openPeriodicElementScene(element, overlay);
          return;
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          moveActiveHydeHotspotByOffset(-1);
          return;
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          moveActiveHydeHotspotByOffset(1);
          return;
        }
        if (event.key === "ArrowUp") {
          event.preventDefault();
          moveActiveHydeHotspotByCycle("in");
          return;
        }
        if (event.key === "ArrowDown") {
          event.preventDefault();
          moveActiveHydeHotspotByCycle("out");
        }
      });
      grid.appendChild(circle);
      hydeHotspotNodesInSpiralOrder.push(circle);
      if (element && Number(element.number) === 1) {
        hydeInitialFocusTarget = circle;
      }
      if (element) {
        const atomicNumber = Number(element.number);
        if (Number.isFinite(atomicNumber)) {
          hydeHotspotNodeByAtomicNumber.set(atomicNumber, circle);
          hydeHotspotAtomicNumbersInOrder.push(atomicNumber);
        }
        const legendKey = element.category || "Unknown";
        if (!legendSet.has(legendKey)) {
          legendSet.set(legendKey, color);
        }
      }
    }
    const element119 = elementsByAtomicNumber.get(119);
    if (element119 && supplementalLayer) {
      const hotspot87 = orderedHotspots.find(
        (hotspot) => hydeHotspotNumberToAtomicNumber.get(hotspot.index + 1) === 87
      ) ?? null;
      const hotspot88 = orderedHotspots.find(
        (hotspot) => hydeHotspotNumberToAtomicNumber.get(hotspot.index + 1) === 88
      ) ?? null;
      const hotspot118 = orderedHotspots.find(
        (hotspot) => hydeHotspotNumberToAtomicNumber.get(hotspot.index + 1) === 118
      ) ?? null;
      const hotspot117 = orderedHotspots.find(
        (hotspot) => hydeHotspotNumberToAtomicNumber.get(hotspot.index + 1) === 117
      ) ?? null;
      const tilePlacement = buildHydeSupplementalTilePlacement({
        hotspotAnchor: hotspot87 ?? hotspot118,
        hotspotReference: hotspot88 ?? hotspot117,
        offsetX: hotspot87 ? -64 : 0,
        offsetY: hotspot87 ? -132 : 0,
      });
      const tileColor = getPeriodicColor(element119.category);
      const tileNode = createHydeSupplementalElementTile({
        layer: supplementalLayer,
        element: element119,
        placement: tilePlacement,
        overlay,
        leftFocusTarget: hydeHotspotNodeByAtomicNumber.get(118) ?? null,
        navigationCenter,
      });
      if (tileNode) {
        hydeHotspotNodeByAtomicNumber.set(119, tileNode);
        hydeHotspotAtomicNumbersInOrder.push(119);
      }
      const hotspot118Node = hydeHotspotNodeByAtomicNumber.get(118);
      if (tileNode && hotspot118Node) {
        hotspot118Node.addEventListener("keydown", (event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            tileNode.focus();
          }
        });
      }
      const legendKey = element119.category || "Unknown";
      if (!legendSet.has(legendKey)) {
        legendSet.set(legendKey, tileColor);
      }
    }
    hydeHotspotAtomicNumbersInOrder.sort((left, right) => left - right);
    hydeHotspotCycleAtomicNumbersInOrder = hydeAtomicCycleOrder.filter((atomicNumber) =>
      hydeHotspotNodeByAtomicNumber.has(atomicNumber)
    );
    if (hydeInitialFocusTarget instanceof Element) {
      setActiveHydeHotspot(hydeInitialFocusTarget, { focus: false });
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
      hidePeriodicTooltip();
    }
  }

  function hideDetailPanelForPeriodicOverlay() {
    if (!detailPanel || detailPanel.classList.contains("is-element-info")) {
      return;
    }
    detailPanel.classList.remove("is-open");
    detailPanel.setAttribute("aria-hidden", "true");
    detailPanel.inert = true;
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
    const enteringHydePeriodic = isHydePeriodic && !hydePeriodicWasOpen;

    setOverlayOpenState(periodicOverlay, isPeriodic);
    setOverlayOpenState(hydePeriodicOverlay, isHydePeriodic);
    if (isPeriodic || isHydePeriodic) {
      hideDetailPanelForPeriodicOverlay();
    }

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
        legend: null,
        overlay: hydePeriodicOverlay,
        onBuilt: () => {
          hydePeriodicGridBuilt = true;
        },
      });
    }
    if (enteringHydePeriodic && hydeInitialFocusTarget instanceof Element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setActiveHydeHotspot(hydeInitialFocusTarget, { focus: false });
        });
      });
    }
    hydePeriodicWasOpen = isHydePeriodic;
  }

  window.addEventListener("keydown", (event) => {
    const currentLevel = getCurrentLevel();
    const sceneId = currentLevel?.sceneId;
    const scenePath = typeof currentLevel?.id === "string" ? currentLevel.id : "";
    const isHydePeriodic =
      sceneId === activeHydePeriodicSceneId ||
      scenePath.endsWith("/hyde_periodic_table_scene.json");
    if (!isHydePeriodic || isTransitionActive() || isEditableTarget(event.target)) {
      return;
    }
    if (event.defaultPrevented || event.metaKey || event.ctrlKey) {
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveActiveHydeHotspotByOffset(-1);
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveActiveHydeHotspotByOffset(1);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActiveHydeHotspotByCycle("in");
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActiveHydeHotspotByCycle("out");
    }
  });

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
