const solverTemplateMeta = Object.freeze({
  noether_core: { shortLabel: "NC", accent: "#94b6ff" },
  higgs_cluster: { shortLabel: "HC", accent: "#e8c17b" },
  electron: { shortLabel: "e-", accent: "#7fe1ff" },
  down_quark: { shortLabel: "d", accent: "#8fb7ff" },
  up_quark: { shortLabel: "u", accent: "#f0b7ff" },
  fermion_gen1: { shortLabel: "F1", accent: "#c2d5ff" },
});

function dedupeTemplateEntries(templateMenuRows = [], extraEntries = []) {
  const entries = [];
  const seen = new Set();
  const allEntries = [
    ...templateMenuRows.flatMap((row) => (Array.isArray(row) ? row : [])),
    ...extraEntries,
  ];
  allEntries.forEach((entry) => {
    const template = String(entry?.template ?? "").trim();
    if (!template || seen.has(template)) {
      return;
    }
    seen.add(template);
    entries.push({
      template,
      label: String(entry?.label ?? template).trim() || template,
    });
  });
  return entries;
}

function createBinaryBranch(id, label, { withPersonality = true } = {}) {
  return {
    id,
    label,
    children: withPersonality
      ? [
          { id: `${id}/binary`, label: "inner binary", children: [] },
          { id: `${id}/personality_1`, label: "personality architrino", children: [] },
          { id: `${id}/personality_2`, label: "personality architrino", children: [] },
        ]
      : [{ id: `${id}/binary`, label: "binary", children: [] }],
  };
}

function buildHierarchyForTemplate(templateId, label) {
  const normalizedTemplate = String(templateId ?? "").trim().toLowerCase();
  if (normalizedTemplate === "higgs_cluster") {
    return [
      {
        id: "root",
        label,
        children: [
          { id: "root/coherent_packet", label: "coherent packet", children: [] },
          { id: "root/substrate_packet", label: "substrate packet", children: [] },
          { id: "root/residual_detritus", label: "residual detritus", children: [] },
        ],
      },
    ];
  }
  if (normalizedTemplate === "noether_core") {
    return [
      {
        id: "root",
        label,
        children: [
          createBinaryBranch("root/inner", "inner binary", { withPersonality: false }),
          createBinaryBranch("root/middle", "middle binary", { withPersonality: false }),
          createBinaryBranch("root/outer", "outer binary", { withPersonality: false }),
        ],
      },
    ];
  }
  return [
    {
      id: "root",
      label: "pro/anti Noether core",
      children: [
        createBinaryBranch("root/inner", "inner binary with personality"),
        createBinaryBranch("root/middle", "middle binary with personality"),
        createBinaryBranch("root/outer", "outer binary with personality"),
      ],
    },
  ];
}

function getTemplateMeta(templateId, label = "") {
  const normalized = String(templateId ?? "").trim().toLowerCase();
  const entry = solverTemplateMeta[normalized] ?? null;
  if (entry) {
    return entry;
  }
  const words = String(label || normalized || "?")
    .split(/\s+/)
    .filter(Boolean);
  const shortLabel = words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase?.() ?? "")
    .join("")
    .slice(0, 3);
  return {
    shortLabel: shortLabel || "?",
    accent: "#9fb0e1",
  };
}

function buildNodeKey(participantId, nodeId) {
  return `${participantId}::${nodeId}`;
}

function parseNodeKey(nodeKey) {
  const [participantId = "", ...rest] = String(nodeKey ?? "").split("::");
  return {
    participantId,
    nodeId: rest.join("::"),
  };
}

function isSameOrAncestorPath(candidatePath, targetPath) {
  if (!candidatePath || !targetPath) {
    return false;
  }
  return targetPath === candidatePath || targetPath.startsWith(`${candidatePath}/`);
}

function nodeKeysConflict(leftKey, rightKey) {
  const left = parseNodeKey(leftKey);
  const right = parseNodeKey(rightKey);
  if (!left.participantId || !right.participantId || left.participantId !== right.participantId) {
    return false;
  }
  return (
    isSameOrAncestorPath(left.nodeId, right.nodeId) ||
    isSameOrAncestorPath(right.nodeId, left.nodeId)
  );
}

function createSvgElement(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}

function clampMenuPosition(clientX, clientY, menu, boundsElement) {
  if (!menu || !boundsElement) {
    return { left: clientX, top: clientY };
  }
  const bounds = boundsElement.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();
  const maxLeft = bounds.right - menuRect.width - 12;
  const maxTop = bounds.bottom - menuRect.height - 12;
  return {
    left: Math.max(bounds.left + 12, Math.min(clientX, maxLeft)),
    top: Math.max(bounds.top + 12, Math.min(clientY, maxTop)),
  };
}

function readPersistedSolverActive(storage, storageKey) {
  if (!storage || !storageKey) {
    return false;
  }
  try {
    return storage.getItem(storageKey) === "true";
  } catch (_error) {
    return false;
  }
}

function persistSolverActive(storage, storageKey, active) {
  if (!storage || !storageKey) {
    return;
  }
  try {
    storage.setItem(storageKey, active ? "true" : "false");
  } catch (_error) {
    // Ignore storage failures and keep the solver working in-memory.
  }
}

export function createComposerReactionSolverUiRuntime(deps) {
  const {
    toggleButton,
    root,
    surface,
    reactantsColumn,
    productsColumn,
    mapHint,
    emptyState,
    mapSvg,
    menu,
    templateMenuRows = [],
    extraTemplateEntries = [],
    setStatus = () => {},
    closeExternalMenus = () => {},
    onActiveChange = () => {},
    storage = null,
    storageKey = "",
  } = deps;

  const templateEntries = dedupeTemplateEntries(templateMenuRows, extraTemplateEntries);
  const state = {
    active: false,
    nextParticipantId: 1,
    nextMappingId: 1,
    participants: [],
    mappings: [],
    pendingSourceKey: "",
    menuMode: "root",
    menuSide: "reactant",
    menuOpen: false,
    menuClientX: 0,
    menuClientY: 0,
  };

  let drawFrameId = 0;

  function findMappingByNodeKey(nodeKey) {
    return (
      state.mappings.find(
        (mapping) => mapping.sourceKey === nodeKey || mapping.targetKey === nodeKey
      ) ?? null
    );
  }

  function getMappedKeyForSide(mapping, side) {
    return side === "reactant" ? mapping.sourceKey : mapping.targetKey;
  }

  function getConflictingMappings(nodeKey, side) {
    return state.mappings.filter((mapping) => {
      const mappedKey = getMappedKeyForSide(mapping, side);
      return mappedKey ? nodeKeysConflict(mappedKey, nodeKey) : false;
    });
  }

  function removeMappingById(mappingId) {
    const beforeCount = state.mappings.length;
    state.mappings = state.mappings.filter((mapping) => mapping.id !== mappingId);
    if (beforeCount !== state.mappings.length) {
      render();
    }
  }

  function addOrReplaceMapping(sourceKey, targetKey) {
    state.mappings = state.mappings.filter((mapping) => {
      return !(
        nodeKeysConflict(mapping.sourceKey, sourceKey) ||
        nodeKeysConflict(mapping.targetKey, targetKey)
      );
    });
    state.mappings.push({
      id: `solver_mapping_${state.nextMappingId++}`,
      sourceKey,
      targetKey,
    });
  }

  function clearPendingSource() {
    if (!state.pendingSourceKey) {
      return;
    }
    state.pendingSourceKey = "";
    render();
  }

  function getAnchorDisabled(side, nodeKey) {
    return getConflictingMappings(nodeKey, side).some((mapping) => {
      const mappedKey = getMappedKeyForSide(mapping, side);
      return mappedKey && mappedKey !== nodeKey;
    });
  }

  function closeMenu() {
    if (!menu) {
      return;
    }
    state.menuOpen = false;
    menu.hidden = true;
    menu.setAttribute("aria-hidden", "true");
    menu.innerHTML = "";
  }

  function updateMenuPosition() {
    if (!state.menuOpen || !menu || !root) {
      return;
    }
    const { left, top } = clampMenuPosition(
      state.menuClientX,
      state.menuClientY,
      menu,
      root
    );
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
  }

  function renderMenuTitle(text) {
    const title = document.createElement("div");
    title.className = "composer-reaction-solver-menu-title";
    title.textContent = text;
    menu.appendChild(title);
  }

  function renderMenuButton(text, options = {}) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "composer-reaction-solver-menu-button";
    button.textContent = text;
    button.disabled = !!options.disabled;
    if (options.kind) {
      button.dataset.kind = options.kind;
    }
    if (typeof options.onClick === "function") {
      button.addEventListener("click", options.onClick);
    }
    menu.appendChild(button);
    return button;
  }

  function openTemplatePicker(side) {
    state.menuMode = "template-picker";
    state.menuSide = side === "product" ? "product" : "reactant";
    renderMenu();
  }

  function addParticipant(side, templateId) {
    const templateEntry =
      templateEntries.find((entry) => entry.template === templateId) ??
      templateEntries[0] ??
      null;
    if (!templateEntry) {
      return;
    }
    const participant = {
      id: `solver_participant_${state.nextParticipantId++}`,
      side,
      templateId: templateEntry.template,
      label: templateEntry.label,
      hierarchy: buildHierarchyForTemplate(templateEntry.template, templateEntry.label),
    };
    state.participants.push(participant);
    state.pendingSourceKey = "";
    closeMenu();
    render();
    setStatus(
      `${side === "reactant" ? "Reactant" : "Product"} ${participant.label} added to the reaction solver.`
    );
  }

  function renderMenu() {
    if (!menu) {
      return;
    }
    menu.hidden = false;
    menu.setAttribute("aria-hidden", "false");
    menu.innerHTML = "";
    if (state.menuMode === "template-picker") {
      renderMenuTitle(
        state.menuSide === "product" ? "Choose product" : "Choose reactant"
      );
      templateEntries.forEach((entry) => {
        const itemButton = renderMenuButton(entry.label, {
          onClick: () => addParticipant(state.menuSide, entry.template),
        });
        const meta = getTemplateMeta(entry.template, entry.label);
        itemButton.style.setProperty("--solver-entry-accent", meta.accent);
        itemButton.dataset.shortLabel = meta.shortLabel;
      });
      renderMenuButton("Back", {
        kind: "secondary",
        onClick: () => {
          state.menuMode = "root";
          renderMenu();
        },
      });
    } else {
      renderMenuTitle("Reaction");
      renderMenuButton("Add reactant", {
        onClick: () => openTemplatePicker("reactant"),
      });
      renderMenuButton("Add product", {
        onClick: () => openTemplatePicker("product"),
      });
      renderMenuButton("Auto solve (not yet implemented)", {
        disabled: true,
      });
    }
    updateMenuPosition();
  }

  function openMenuAt(clientX, clientY) {
    if (!state.active || !menu) {
      return;
    }
    closeExternalMenus();
    state.menuClientX = clientX;
    state.menuClientY = clientY;
    state.menuMode = "root";
    state.menuOpen = true;
    renderMenu();
  }

  function setActive(nextValue, options = {}) {
    const { persist = true, announce = true } = options;
    const nextActive = !!nextValue;
    if (state.active === nextActive) {
      return;
    }
    state.active = nextActive;
    state.pendingSourceKey = "";
    closeMenu();
    closeExternalMenus();
    if (root) {
      root.classList.toggle("is-open", nextActive);
      root.setAttribute("aria-hidden", nextActive ? "false" : "true");
    }
    if (toggleButton) {
      toggleButton.classList.toggle("is-active", nextActive);
      toggleButton.setAttribute("aria-pressed", nextActive ? "true" : "false");
    }
    onActiveChange(nextActive);
    if (persist) {
      persistSolverActive(storage, storageKey, nextActive);
    }
    render();
    if (announce) {
      setStatus(
        nextActive
          ? "Reaction solver opened. Right-click the 2D canvas to add reactants or products."
          : "Reaction solver closed."
      );
    }
  }

  function toggleActive() {
    setActive(!state.active);
  }

  function handleAnchorClick(side, nodeKey) {
    const existingMapping = findMappingByNodeKey(nodeKey);
    if (existingMapping) {
      removeMappingById(existingMapping.id);
      state.pendingSourceKey = "";
      setStatus("Removed reaction mapping.");
      return;
    }
    if (getAnchorDisabled(side, nodeKey)) {
      return;
    }
    if (side === "reactant") {
      state.pendingSourceKey = state.pendingSourceKey === nodeKey ? "" : nodeKey;
      render();
      if (state.pendingSourceKey) {
        setStatus("Reactant attach point selected. Choose a product attach point.");
      } else {
        setStatus("Reactant attach point cleared.");
      }
      return;
    }
    if (!state.pendingSourceKey) {
      setStatus("Choose a reactant attach point first.");
      return;
    }
    addOrReplaceMapping(state.pendingSourceKey, nodeKey);
    state.pendingSourceKey = "";
    render();
    setStatus("Reaction mapping added.");
  }

  function renderParticipantTreeRows(parent, participant, nodes, depth = 0) {
    if (!parent || !Array.isArray(nodes) || !nodes.length) {
      return;
    }
    nodes.forEach((node) => {
      const nodeKey = buildNodeKey(participant.id, node.id);
      const row = document.createElement("div");
      row.className = "composer-reaction-solver-tree-row";
      row.style.setProperty("--solver-depth", String(depth));
      if (getAnchorDisabled(participant.side, nodeKey)) {
        row.classList.add("is-disabled");
      }
      const label = document.createElement("span");
      label.className = "composer-reaction-solver-tree-label";
      label.textContent = node.label;
      const anchor = document.createElement("button");
      anchor.type = "button";
      anchor.className = "composer-reaction-solver-anchor";
      anchor.dataset.anchorKey = nodeKey;
      anchor.dataset.anchorSide = participant.side;
      anchor.setAttribute(
        "aria-label",
        `${participant.side === "product" ? "Product" : "Reactant"} attach point for ${node.label}`
      );
      anchor.disabled = getAnchorDisabled(participant.side, nodeKey);
      if (state.pendingSourceKey === nodeKey) {
        anchor.classList.add("is-pending");
      }
      if (findMappingByNodeKey(nodeKey)) {
        anchor.classList.add("is-mapped");
      }
      anchor.addEventListener("click", () => handleAnchorClick(participant.side, nodeKey));
      if (participant.side === "product") {
        row.classList.add("is-product");
        row.append(anchor, label);
      } else {
        row.append(label, anchor);
      }
      parent.appendChild(row);
      if (Array.isArray(node.children) && node.children.length) {
        renderParticipantTreeRows(parent, participant, node.children, depth + 1);
      }
    });
  }

  function renderParticipantCard(participant) {
    const card = document.createElement("article");
    card.className = `composer-reaction-solver-participant is-${participant.side}`;
    const visual = document.createElement("div");
    visual.className = "composer-reaction-solver-particle";
    const meta = getTemplateMeta(participant.templateId, participant.label);
    visual.style.setProperty("--solver-accent", meta.accent);
    const visualBadge = document.createElement("div");
    visualBadge.className = "composer-reaction-solver-particle-badge";
    visualBadge.textContent = meta.shortLabel;
    const visualLabel = document.createElement("div");
    visualLabel.className = "composer-reaction-solver-particle-label";
    visualLabel.textContent = participant.label;
    visual.append(visualBadge, visualLabel);

    const hierarchy = document.createElement("div");
    hierarchy.className = `composer-reaction-solver-tree is-${participant.side}`;
    renderParticipantTreeRows(hierarchy, participant, participant.hierarchy, 0);

    if (participant.side === "product") {
      card.append(hierarchy, visual);
    } else {
      card.append(visual, hierarchy);
    }
    return card;
  }

  function updateHint() {
    if (!mapHint || !emptyState) {
      return;
    }
    const centerPanel = mapHint.parentElement ?? null;
    const hasParticipants = state.participants.length > 0;
    emptyState.hidden = hasParticipants;
    emptyState.setAttribute("aria-hidden", hasParticipants ? "true" : "false");
    if (centerPanel) {
      centerPanel.hidden = !hasParticipants;
      centerPanel.setAttribute("aria-hidden", hasParticipants ? "false" : "true");
    }
    if (!hasParticipants) {
      return;
    }
    if (state.pendingSourceKey) {
      mapHint.textContent = "Reactant anchor selected. Click a product anchor to complete the mapping.";
      return;
    }
    if (!state.mappings.length) {
      mapHint.textContent = "Click a reactant anchor, then a product anchor, to draw the first mapping.";
      return;
    }
    mapHint.textContent = `${state.mappings.length} mapping${state.mappings.length === 1 ? "" : "s"} authored. Click a mapped anchor to remove it.`;
  }

  function drawMappings() {
    drawFrameId = 0;
    if (!state.active || !surface || !mapSvg) {
      return;
    }
    const bounds = surface.getBoundingClientRect();
    const width = Math.max(1, Math.round(bounds.width));
    const height = Math.max(1, Math.round(bounds.height));
    mapSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    mapSvg.innerHTML = "";
    state.mappings.forEach((mapping) => {
      const sourceAnchor = surface.querySelector(
        `.composer-reaction-solver-anchor[data-anchor-key="${CSS.escape(mapping.sourceKey)}"]`
      );
      const targetAnchor = surface.querySelector(
        `.composer-reaction-solver-anchor[data-anchor-key="${CSS.escape(mapping.targetKey)}"]`
      );
      if (!sourceAnchor || !targetAnchor) {
        return;
      }
      const sourceRect = sourceAnchor.getBoundingClientRect();
      const targetRect = targetAnchor.getBoundingClientRect();
      const startX = sourceRect.left + sourceRect.width / 2 - bounds.left;
      const startY = sourceRect.top + sourceRect.height / 2 - bounds.top;
      const endX = targetRect.left + targetRect.width / 2 - bounds.left;
      const endY = targetRect.top + targetRect.height / 2 - bounds.top;
      const deltaX = Math.max(96, Math.abs(endX - startX) * 0.35);
      const path = createSvgElement("path");
      path.setAttribute(
        "d",
        `M ${startX} ${startY} C ${startX + deltaX} ${startY}, ${endX - deltaX} ${endY}, ${endX} ${endY}`
      );
      path.setAttribute("class", "composer-reaction-solver-path");
      mapSvg.appendChild(path);
    });
  }

  function scheduleMappingDraw() {
    if (drawFrameId) {
      cancelAnimationFrame(drawFrameId);
    }
    drawFrameId = requestAnimationFrame(drawMappings);
  }

  function render() {
    if (!root || !reactantsColumn || !productsColumn) {
      return;
    }
    root.classList.toggle("is-open", state.active);
    root.setAttribute("aria-hidden", state.active ? "false" : "true");
    reactantsColumn.innerHTML = "";
    productsColumn.innerHTML = "";
    if (!state.active) {
      if (mapSvg) {
        mapSvg.innerHTML = "";
      }
      return;
    }
    state.participants
      .filter((participant) => participant.side === "reactant")
      .forEach((participant) => {
        reactantsColumn.appendChild(renderParticipantCard(participant));
      });
    state.participants
      .filter((participant) => participant.side === "product")
      .forEach((participant) => {
        productsColumn.appendChild(renderParticipantCard(participant));
      });
    updateHint();
    scheduleMappingDraw();
  }

  function handleSurfaceContextMenu(event) {
    if (!state.active) {
      return;
    }
    event.preventDefault();
    openMenuAt(event.clientX, event.clientY);
  }

  function handleDocumentPointerDown(event) {
    if (!state.active || !state.menuOpen || !menu) {
      return;
    }
    if (menu.contains(event.target)) {
      return;
    }
    closeMenu();
  }

  function handleRootKeyDown(event) {
    if (!state.active) {
      return;
    }
    if (event.key === "Escape") {
      if (state.menuOpen) {
        closeMenu();
        return;
      }
      if (state.pendingSourceKey) {
        clearPendingSource();
      }
    }
  }

  function wireListeners() {
    if (toggleButton && !toggleButton.dataset.solverBound) {
      toggleButton.dataset.solverBound = "true";
      toggleButton.addEventListener("click", () => {
        toggleActive();
      });
    }
    if (root && !root.dataset.solverBound) {
      root.dataset.solverBound = "true";
      root.addEventListener("contextmenu", handleSurfaceContextMenu);
      root.addEventListener("keydown", handleRootKeyDown);
      root.addEventListener(
        "scroll",
        () => {
          if (state.active) {
            scheduleMappingDraw();
          }
        },
        true
      );
    }
    if (!document.body.dataset.composerReactionSolverDocumentBound) {
      document.body.dataset.composerReactionSolverDocumentBound = "true";
      document.addEventListener("pointerdown", handleDocumentPointerDown, true);
      window.addEventListener("resize", () => {
        if (state.active) {
          updateMenuPosition();
          scheduleMappingDraw();
        }
      });
    }
  }

  wireListeners();
  if (readPersistedSolverActive(storage, storageKey)) {
    setActive(true, { persist: false, announce: false });
  }
  render();

  return {
    isActive: () => state.active,
    setActive,
    toggleActive,
    closeMenu,
    render,
  };
}
