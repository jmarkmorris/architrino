export function createPeriodicOverlayRuntime(deps) {
  const {
    periodicOverlay,
    periodicGrid,
    periodicLegend,
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
    getCurrentLevel,
    searchBackStack,
    navigationStack,
    updateNavButton,
    jumpToScene,
    isTransitionActive,
    fetchImpl,
  } = deps;

  let periodicGridBuilt = false;
  let elementInfoPinned = false;

  async function ensurePeriodicTable() {
    return periodicTableService.ensure(
      (...args) => fetchImpl(...args),
      "content/scenes/chemistry/periodic_table.json"
    );
  }

  function getElementBySymbol(symbol) {
    return periodicTableService.findBySymbol(symbol);
  }

  function getPeriodicColor(category) {
    if (!category) {
      return periodicCategoryColors.unknown;
    }
    const key = category.toLowerCase();
    return periodicCategoryColors[key] || periodicCategoryColors.unknown;
  }

  function showPeriodicElementDetail(el) {
    if (!detailPanel || !detailTitle || !detailBody) {
      return;
    }
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
      ["Melting point", el.melt],
      ["Boiling point", el.boil],
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

  function buildPeriodicGrid(data) {
    if (!periodicGrid || !periodicLegend || !data?.elements) {
      return;
    }
    periodicGrid.innerHTML = "";
    periodicLegend.innerHTML = "";
    const frag = document.createDocumentFragment();
    const legendSet = new Map();
    data.elements.forEach((el) => {
      const btn = document.createElement("button");
      btn.className = "ptable-cell";
      btn.style.gridColumn = el.xpos;
      btn.style.gridRow = el.ypos;
      const color = getPeriodicColor(el.category);
      btn.style.background = `${color}22`;
      btn.style.borderColor = color;
      btn.dataset.symbol = el.symbol;
      btn.dataset.number = el.number;
      btn.innerHTML = `
        <div class="ptable-number">${el.number}</div>
        <div class="ptable-symbol">${el.symbol}</div>
        <div class="ptable-name">${el.name}</div>
      `;
      btn.addEventListener("click", () => {
        showPeriodicElementDetail(el);
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
        const sceneId = el.symbol.toLowerCase();
        const path = `content/scenes/elements/${sceneId}.json`;
        if (periodicOverlay) {
          periodicOverlay.classList.add("is-fading");
        }
        jumpToScene(path, { mode: "jump", startScale: 0.35, duration: 2000 });
      });
      btn.addEventListener("mouseenter", () => showPeriodicElementDetail(el));
      frag.appendChild(btn);
      const legendKey = el.category || "Unknown";
      if (!legendSet.has(legendKey)) {
        legendSet.set(legendKey, color);
      }
    });
    periodicGrid.appendChild(frag);
    const legendFrag = document.createDocumentFragment();
    Array.from(legendSet.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([label, color]) => {
        const item = document.createElement("div");
        item.className = "ptable-legend-item";
        item.innerHTML = `<span class="ptable-legend-swatch" style="background:${color}"></span>${label}`;
        legendFrag.appendChild(item);
      });
    periodicLegend.appendChild(legendFrag);
    periodicGridBuilt = true;
  }

  async function updatePeriodicOverlay() {
    if (!periodicOverlay) {
      return;
    }
    const isPeriodic = getCurrentLevel()?.sceneId === "periodic_table";
    periodicOverlay.classList.toggle("is-open", !!isPeriodic);
    periodicOverlay.setAttribute("aria-hidden", isPeriodic ? "false" : "true");
    periodicOverlay.inert = !isPeriodic;
    if (!isPeriodic) {
      if (periodicOverlay.contains(document.activeElement)) {
        (navUpButton ?? homeButton ?? sceneSearchToggle ?? document.body).focus();
      }
      periodicOverlay.classList.remove("is-fading");
      return;
    }
    const data = await ensurePeriodicTable();
    if (data && !periodicGridBuilt) {
      buildPeriodicGrid(data);
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
    detailPanel.setAttribute("aria-hidden", "false");
    detailPanel.inert = false;
    elementInfoPinned = true;

    detailTitle.textContent = `${el.name} (${el.symbol})`;
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
      ["Melting point", el.melt],
      ["Boiling point", el.boil],
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
    elementLegendItems.forEach((btn) => {
      const scenePath = btn.getAttribute("data-scene");
      if (!scenePath) {
        return;
      }
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
  }

  function hidePeriodicOverlayImmediately() {
    if (!periodicOverlay) {
      return;
    }
    periodicOverlay.classList.remove("is-open");
    periodicOverlay.classList.remove("is-fading");
    periodicOverlay.setAttribute("aria-hidden", "true");
    periodicOverlay.inert = true;
  }

  return {
    hidePeriodicOverlayImmediately,
    updatePeriodicOverlay,
    updateElementLegend,
    updateElementInfoPanel,
    wireElementLegend,
  };
}
