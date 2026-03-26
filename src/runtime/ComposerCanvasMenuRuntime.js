export function openComposerMemberMenu(config) {
  const {
    menu,
    clientX,
    clientY,
    assemblyId,
    memberId,
    getAssemblyDraftById,
    sanitizeEntityId,
    getMemberSubassemblyId,
    resolveAssemblyMemberLocalOffset,
    normalizeSubassemblyList,
    getSubassemblyId,
    resetMenu,
    appendMenuNote,
    appendMenuButtonRow,
    openAssemblyPropertiesMenuAt,
    openSubassemblyMenuAt,
    positionMenu,
  } = config;
  if (!menu) {
    return false;
  }
  const assembly = getAssemblyDraftById(assemblyId);
  const normalizedMemberId = sanitizeEntityId(memberId, "");
  if (!assembly || !normalizedMemberId) {
    return;
  }
  const currentSubassemblyId = getMemberSubassemblyId(assembly, normalizedMemberId);
  const memberOffset = resolveAssemblyMemberLocalOffset(assembly, normalizedMemberId);
  resetMenu();

  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = "Member";
  menu.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = "composer-assembly-menu-subtitle";
  subtitle.textContent = `${assembly.id}.${normalizedMemberId}`;
  menu.appendChild(subtitle);

  appendMenuNote(
    menu,
    currentSubassemblyId
      ? `Grouped in ${currentSubassemblyId}. Drag this dot in the canvas to set the member offset inside that group.`
      : "Ungrouped. Drag this dot in the canvas to set the member offset directly on the assembly."
  );
  appendMenuNote(
    menu,
    `Current local offset: ${memberOffset[0]}, ${memberOffset[1]}, ${memberOffset[2]}`
  );
  appendMenuNote(
    menu,
    "Internal particle structure is read-only in the composer. Use the reaction workflow for split, regroup, remove, or other provenance-changing edits."
  );

  appendMenuButtonRow(menu, [
    { text: "Assembly Menu", onClick: () => openAssemblyPropertiesMenuAt(clientX, clientY, assemblyId) },
    currentSubassemblyId
      ? { text: "Group Menu", onClick: () => openSubassemblyMenuAt(clientX, clientY, assemblyId, currentSubassemblyId) }
      : null,
  ]);

  positionMenu(clientX, clientY, 320, 320);
}

export function openComposerPersonalitySlotMenu(config) {
  const {
    menu,
    clientX,
    clientY,
    assemblyId,
    memberId,
    getAssemblyDraftById,
    normalizeMemberList,
    getMemberId,
    sanitizeEntityId,
    isPersonalityMember,
    getMemberState,
    resetMenu,
    appendMenuNote,
    positionMenu,
  } = config;
  if (!menu) {
    return;
  }
  const assembly = getAssemblyDraftById(assemblyId);
  const members = normalizeMemberList(assembly?.members);
  const member = members.find((entry, index) => getMemberId(entry, index) === sanitizeEntityId(memberId, ""));
  if (!assembly || !isPersonalityMember(member)) {
    return false;
  }
  const currentState = getMemberState(member) || "unset";
  resetMenu();

  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = "Personality Slot";
  menu.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = "composer-assembly-menu-subtitle";
  subtitle.textContent = `${assembly.name} · ${getMemberId(member)}`;
  menu.appendChild(subtitle);

  appendMenuNote(
    menu,
    currentState === "unset"
      ? "Unset polar site. The composer now treats axial-site assignment as read-only."
      : currentState === "electrino"
        ? "Electrino assigned. Axial-site assignment is read-only in the composer."
        : "Positrino assigned. Axial-site assignment is read-only in the composer."
  );
  appendMenuNote(
    menu,
    "Use the reaction workflow for provenance-changing internal edits."
  );

  positionMenu(clientX, clientY, 236, 164);
  return true;
}

export function openComposerSubassemblyMenu(config) {
  const {
    menu,
    clientX,
    clientY,
    assemblyId,
    subassemblyId,
    getAssemblyDraftById,
    sanitizeEntityId,
    normalizeSubassemblyList,
    getSubassemblyId,
    resetMenu,
    appendMenuNote,
    appendMenuButtonRow,
    appendMenuSectionHeader,
    openAssemblyPropertiesMenuAt,
    openMemberMenuAt,
    positionMenu,
  } = config;
  if (!menu) {
    return;
  }
  const assembly = getAssemblyDraftById(assemblyId);
  const normalizedSubassemblyId = sanitizeEntityId(subassemblyId, "");
  if (!assembly || !normalizedSubassemblyId) {
    return;
  }
  const subassemblies = normalizeSubassemblyList(assembly?.subassemblies);
  const subassembly = subassemblies.find(
    (entry, index) => getSubassemblyId(entry, index) === normalizedSubassemblyId
  );
  if (!subassembly) {
    return;
  }

  resetMenu();

  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = "Subassembly";
  menu.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = "composer-assembly-menu-subtitle";
  subtitle.textContent = normalizedSubassemblyId;
  menu.appendChild(subtitle);

  appendMenuNote(
    menu,
    `Drag this halo in the canvas to place the group. Position: ${Number(subassembly.position?.[0] ?? 0)}, ${Number(
      subassembly.position?.[1] ?? 0
    )}, ${Number(subassembly.position?.[2] ?? 0)}`
  );
  appendMenuNote(
    menu,
    `${(subassembly.members ?? []).length} member${(subassembly.members ?? []).length === 1 ? "" : "s"}`
  );
  appendMenuNote(
    menu,
    "Group splitting and regrouping are being moved out of the composer and into the reaction workflow. This menu is now inspection-only."
  );

  appendMenuButtonRow(menu, [
    {
      text: "Assembly Menu",
      onClick: () => {
        openAssemblyPropertiesMenuAt(clientX, clientY, assemblyId);
      },
    },
    null,
  ]);

  if (Array.isArray(subassembly.members) && subassembly.members.length) {
    appendMenuSectionHeader(menu, "Members", `${subassembly.members.length}`);
    subassembly.members.forEach((entryMemberId) => {
      appendMenuButtonRow(menu, [
        {
          text: entryMemberId,
          onClick: () => {
            openMemberMenuAt(clientX, clientY, assemblyId, entryMemberId);
          },
        },
        null,
      ]);
    });
  }

  positionMenu(clientX, clientY, 320, 420);
}

export function openComposerAssemblyTemplateMenu(config) {
  const {
    menu,
    event,
    localPoint,
    resetMenu,
    appendMenuButtonRow,
    appendMenuNote,
    appendMenuSectionHeader,
    templateMenuRows,
    openSceneMenuAt,
    openLibraryMenuAt,
    cameraFlightState,
    addCameraWaypoint,
    closeMenu,
    updateCameraPoiStatus,
    clearCameraWaypoints,
    getSelectedAssemblyLetter,
    composerFrameEditModeRef,
    setComposerFrameDefaults,
    updateComposerFrame,
    appendMenuRangeControl,
    formatScaleLabel,
    composerFrameState,
    renderJsonPreview,
    setComposerCameraDefaults,
    updateComposerCamera,
    composerCameraState,
    composerCameraOrbitState,
    positionMenu,
  } = config;
  if (!menu) {
    return;
  }
  menu.dataset.position = JSON.stringify([
    Number(localPoint.x.toFixed(3)),
    Number(localPoint.y.toFixed(3)),
    Number(localPoint.z.toFixed(3)),
  ]);
  resetMenu();

  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = "Canvas";
  menu.appendChild(title);

  appendMenuButtonRow(menu, [
    { text: "Scene", onClick: () => openSceneMenuAt(event.clientX, event.clientY) },
    { text: "Library", onClick: () => openLibraryMenuAt(event.clientX, event.clientY) },
  ]);

  const addLabel = document.createElement("div");
  addLabel.className = "composer-assembly-menu-subtitle";
  addLabel.textContent = "Add Assembly";
  menu.appendChild(addLabel);
  appendMenuNote(
    menu,
    "Add an assembly template here, then arrange its structure, motion path, and observer framing from the canvas."
  );

  templateMenuRows.forEach((row) => {
    appendMenuButtonRow(
      menu,
      row.map((entry) => ({
        text: entry.label,
        dataset: { template: entry.template },
      }))
    );
  });

  appendMenuSectionHeader(menu, "Observer");
  appendMenuButtonRow(menu, [
    {
      text: "Add Observer Point",
      onClick: () => {
        const position = JSON.parse(menu.dataset.position || "[0,0,0]");
        addCameraWaypoint(position);
        closeMenu();
      },
    },
    {
      text: cameraFlightState.poiMode === "selected" ? "Target: Selected Point" : "Target: Local Origin",
      onClick: () => {
        cameraFlightState.poiMode = cameraFlightState.poiMode === "selected" ? "origin" : "selected";
        updateCameraPoiStatus();
        closeMenu();
      },
    },
  ]);

  if ((cameraFlightState?.waypoints?.length ?? 0) > 0) {
    appendMenuButtonRow(menu, [
      { text: "Clear Observer Path", onClick: () => { clearCameraWaypoints(); closeMenu(); } },
      null,
    ]);
  }

  const selectedAssemblyLetter = getSelectedAssemblyLetter();
  appendMenuSectionHeader(menu, `Path ${selectedAssemblyLetter}`.trim());
  appendMenuSectionHeader(menu, "Frame");

  let frameScaleControl = null;
  const [frameEditButton] = appendMenuButtonRow(menu, [
    {
      text: composerFrameEditModeRef.get() ? "Stop Edit" : "Edit",
      onClick: () => {
        const nextValue = !composerFrameEditModeRef.get();
        composerFrameEditModeRef.set(nextValue);
        if (frameEditButton) {
          frameEditButton.textContent = nextValue ? "Stop Edit" : "Edit";
        }
      },
    },
    {
      text: "Reset",
      onClick: () => {
        setComposerFrameDefaults();
        updateComposerFrame();
        if (frameScaleControl) {
          frameScaleControl.input.value = "0";
          frameScaleControl.output.textContent = formatScaleLabel(composerFrameState.scale);
        }
        renderJsonPreview();
      },
    },
  ]);

  frameScaleControl = appendMenuRangeControl(menu, {
    label: "Scale (10^x)",
    min: -2,
    max: 3,
    step: 0.1,
    value: Math.log10(composerFrameState.scale || 1).toFixed(2),
    valueLabel: formatScaleLabel(composerFrameState.scale),
    onInput: (nextValue) => {
      composerFrameState.scale = Math.pow(10, nextValue);
      updateComposerFrame();
      renderJsonPreview();
      return formatScaleLabel(composerFrameState.scale);
    },
  });

  appendMenuSectionHeader(menu, "Viewport");

  let orbitSpeedControl = null;
  let orbitRadiusControl = null;
  appendMenuButtonRow(menu, [
    {
      text: "Reset",
      onClick: () => {
        setComposerCameraDefaults();
        updateComposerCamera();
        if (orbitSpeedControl) {
          orbitSpeedControl.input.value = "0";
          orbitSpeedControl.output.textContent = formatScaleLabel(composerCameraState.speed);
        }
        if (orbitRadiusControl) {
          orbitRadiusControl.input.value = Math.log10(composerCameraOrbitState.radius || 1).toFixed(2);
          orbitRadiusControl.output.textContent = formatScaleLabel(composerCameraOrbitState.radius);
        }
        renderJsonPreview();
      },
    },
    null,
  ]);

  orbitSpeedControl = appendMenuRangeControl(menu, {
    label: "Speed (10^x)",
    min: -2,
    max: 2,
    step: 0.1,
    value: Math.log10(composerCameraState.speed || 1).toFixed(2),
    valueLabel: formatScaleLabel(composerCameraState.speed),
    onInput: (nextValue) => {
      composerCameraState.speed = Math.pow(10, nextValue);
      renderJsonPreview();
      return formatScaleLabel(composerCameraState.speed);
    },
  });

  orbitRadiusControl = appendMenuRangeControl(menu, {
    label: "Radius (10^x)",
    min: -2,
    max: 3,
    step: 0.1,
    value: Math.log10(composerCameraOrbitState.radius || 1).toFixed(2),
    valueLabel: formatScaleLabel(composerCameraOrbitState.radius),
    onInput: (nextValue) => {
      composerCameraOrbitState.radius = Math.pow(10, nextValue);
      updateComposerCamera();
      renderJsonPreview();
      return formatScaleLabel(composerCameraOrbitState.radius);
    },
  });

  positionMenu(event.clientX, event.clientY, 336, 640);
}

export function openComposerAssemblyPropertiesMenu(config) {
  const {
    menu,
    clientX,
    clientY,
    assemblyId,
    getAssemblyDraftIndexById,
    assemblyDrafts,
    setSelectedAssembly,
    resetMenu,
    pendingTransferSource,
    appendMenuNote,
    appendMenuSectionHeader,
    appendMenuButtonRow,
    getAssemblyDraftById,
    getAssemblyCanonicalBridgeSummary,
    formatAssemblyCanonicalBridgeSummary,
    renderAssemblyEditor,
    assemblyPositionInputs,
    renderJsonPreview,
    rebaseAssemblyParentFrame,
    syncAssemblyPositionInputs,
    pathState,
    normalizeAssemblyPathPoints,
    vectorFromTriplet,
    updatePathGeometry,
    closeMenu,
    normalizeSubassemblyList,
    normalizeMemberList,
    getMemberId,
    getSubassemblyId,
    openMemberMenuAt,
    openSubassemblyMenuAt,
    clearPendingTransfer,
    openAssemblyPropertiesMenuAt,
    ensureAssemblyDrafts,
    positionMenu,
  } = config;
  if (!menu) {
    return;
  }
  const assemblyIndex = getAssemblyDraftIndexById(assemblyId);
  const assembly = assemblyIndex >= 0 ? assemblyDrafts[assemblyIndex] : null;
  if (!assembly) {
    return;
  }
  setSelectedAssembly(assembly.id);
  resetMenu();

  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = `Assembly ${assemblyIndex + 1}`;
  menu.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = "composer-assembly-menu-subtitle";
  subtitle.textContent = assembly.name.trim() || assembly.id;
  menu.appendChild(subtitle);

  const canonicalSummary =
    typeof getAssemblyCanonicalBridgeSummary === "function"
      ? getAssemblyCanonicalBridgeSummary(assembly)
      : null;
  if (canonicalSummary && typeof formatAssemblyCanonicalBridgeSummary === "function") {
    const canonicalBridge = document.createElement("div");
    canonicalBridge.className = "composer-assembly-menu-subtitle";
    canonicalBridge.textContent = `Canonical bridge: ${formatAssemblyCanonicalBridgeSummary(canonicalSummary)}`;
    menu.appendChild(canonicalBridge);

    appendMenuNote(
      menu,
      canonicalSummary.valid
        ? "Canonical bridge is valid for this assembly."
        : `Canonical bridge currently reports ${canonicalSummary.errorCount} validation issue${
            canonicalSummary.errorCount === 1 ? "" : "s"
          }. This menu remains read-only with respect to the canonical structure model.`
    );
  }

  const form = document.createElement("div");
  form.className = "composer-form";

  const nameField = document.createElement("label");
  nameField.className = "composer-field";
  const nameLabel = document.createElement("span");
  nameLabel.textContent = "Name";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = "";
  nameInput.placeholder = assembly.name;
  nameInput.addEventListener("input", () => {
    const liveAssembly = getAssemblyDraftById(assembly.id);
    if (!liveAssembly) {
      return;
    }
    liveAssembly.name = String(nameInput.value ?? "").trim() || assembly.name;
    subtitle.textContent = liveAssembly.name.trim() || liveAssembly.id;
    renderAssemblyEditor();
    assemblyPositionInputs.set(liveAssembly.id, positionInputs);
    renderJsonPreview();
  });
  nameField.append(nameLabel, nameInput);
  form.appendChild(nameField);

  const parentField = document.createElement("label");
  parentField.className = "composer-field";
  const parentLabel = document.createElement("span");
  parentLabel.textContent = "Parent";
  const parentSelect = document.createElement("select");
  const rootOption = document.createElement("option");
  rootOption.value = "";
  rootOption.textContent = "Scene Root";
  parentSelect.appendChild(rootOption);
  assemblyDrafts.forEach((candidate) => {
    if (candidate.id === assembly.id) {
      return;
    }
    const option = document.createElement("option");
    option.value = candidate.id;
    option.textContent = candidate.name.trim() || candidate.id;
    parentSelect.appendChild(option);
  });
  parentSelect.value = assembly.parentId || "";
  parentSelect.addEventListener("change", () => {
    const liveAssembly = getAssemblyDraftById(assembly.id);
    if (!liveAssembly) {
      return;
    }
    const nextParentId = parentSelect.value;
    rebaseAssemblyParentFrame(liveAssembly, nextParentId);
    liveAssembly.parentId = nextParentId;
    syncAssemblyPositionInputs(liveAssembly.id, liveAssembly.position);
    if (pathState.ownerAssemblyId === liveAssembly.id) {
      pathState.points = normalizeAssemblyPathPoints(liveAssembly.pathPoints).map((point) =>
        vectorFromTriplet(point)
      );
      updatePathGeometry();
    }
    renderJsonPreview();
  });
  parentField.append(parentLabel, parentSelect);
  form.appendChild(parentField);

  const positionGrid = document.createElement("div");
  positionGrid.className = "composer-assembly-menu-grid-3";
  const positionInputs = [];
  ["X", "Y", "Z"].forEach((axis, axisIndex) => {
    const axisField = document.createElement("label");
    axisField.className = "composer-field";
    const axisLabel = document.createElement("span");
    axisLabel.textContent = axis;
    const axisInput = document.createElement("input");
    axisInput.type = "number";
    axisInput.step = "0.1";
    axisInput.value = String(Number(assembly.position?.[axisIndex] ?? 0));
    axisInput.addEventListener("input", () => {
      const liveAssembly = getAssemblyDraftById(assembly.id);
      if (!liveAssembly) {
        return;
      }
      const nextPosition = Array.isArray(liveAssembly.position) ? [...liveAssembly.position] : [0, 0, 0];
      nextPosition[axisIndex] = Number(axisInput.value) || 0;
      liveAssembly.position = nextPosition;
      renderJsonPreview();
    });
    positionInputs[axisIndex] = axisInput;
    axisField.append(axisLabel, axisInput);
    positionGrid.appendChild(axisField);
  });
  assemblyPositionInputs.set(assembly.id, positionInputs);
  form.appendChild(positionGrid);
  menu.appendChild(form);

  appendMenuNote(
    menu,
    "Canvas-first staging: drag the center to move the assembly, drag member dots to place visible points, drag path points directly, and use the reaction workflow for internal split, regroup, or provenance edits."
  );

  appendMenuSectionHeader(menu, "Structure", `${Array.isArray(assembly.members) ? assembly.members.length : 0}`);
  appendMenuNote(
    menu,
    "Internal particle structure is now treated as read-only in the composer. Use the reaction workflow to split, regroup, remove constituents, or author provenance-changing edits."
  );

  const structureActions = document.createElement("div");
  structureActions.className = "composer-button-row";
  const pathButton = document.createElement("button");
  pathButton.type = "button";
  pathButton.textContent = "Edit Path";
  pathButton.addEventListener("click", () => {
    setSelectedAssembly(assembly.id);
    closeMenu();
    renderJsonPreview();
  });
  structureActions.appendChild(pathButton);
  menu.appendChild(structureActions);

  const subassemblies = normalizeSubassemblyList(assembly.subassemblies);
  const childMemberIds = new Set(subassemblies.flatMap((entry) => entry?.members ?? []));
  const rootMembers = normalizeMemberList(assembly.members).filter(
    (entry, memberIndex) => !childMemberIds.has(getMemberId(entry, memberIndex))
  );

  if (rootMembers.length) {
    appendMenuSectionHeader(menu, "Root Members", `${rootMembers.length}`);
    rootMembers.forEach((entry, memberIndex) => {
      const memberId = getMemberId(entry, memberIndex);
      appendMenuButtonRow(menu, [
        { text: memberId, onClick: () => openMemberMenuAt(clientX, clientY, assembly.id, memberId) },
        null,
      ]);
    });
  }

  if (subassemblies.length) {
    appendMenuSectionHeader(menu, "Subassemblies", `${subassemblies.length}`);
    subassemblies.forEach((entry, subassemblyIndex) => {
      const subassemblyId = getSubassemblyId(entry, subassemblyIndex);
      appendMenuButtonRow(menu, [
        {
          text: `${subassemblyId} (${(entry.members ?? []).length})`,
          onClick: () => openSubassemblyMenuAt(clientX, clientY, assembly.id, subassemblyId),
        },
        null,
      ]);
    });
  }

  if (pendingTransferSource?.assemblyId) {
    appendMenuSectionHeader(menu, "Legacy Transfer Draft");
    appendMenuNote(
      menu,
      `A previous canvas transfer draft from ${pendingTransferSource.assemblyId}.${pendingTransferSource.memberId} is still present. New transfer drafting is being retired from the composer.`
    );
    const cancelTransferButton = document.createElement("button");
    cancelTransferButton.type = "button";
    cancelTransferButton.textContent = "Cancel Legacy Transfer Draft";
    cancelTransferButton.addEventListener("click", () => {
      clearPendingTransfer();
      closeMenu();
      openAssemblyPropertiesMenuAt(clientX, clientY, assembly.id);
    });
    menu.appendChild(cancelTransferButton);
  }

  appendMenuSectionHeader(menu, "Display");
  const historyButton = document.createElement("button");
  historyButton.type = "button";
  historyButton.textContent = assembly.historyTraceEnabled ? "Hide History" : "Show History";
  historyButton.addEventListener("click", () => {
    const liveAssembly = getAssemblyDraftById(assembly.id);
    if (!liveAssembly) {
      return;
    }
    liveAssembly.historyTraceEnabled = !liveAssembly.historyTraceEnabled;
    closeMenu();
    renderJsonPreview();
    openAssemblyPropertiesMenuAt(clientX, clientY, assembly.id);
  });
  menu.appendChild(historyButton);

  const envelopeButton = document.createElement("button");
  envelopeButton.type = "button";
  envelopeButton.textContent = assembly.envelopeEnabled ? "Hide Envelope" : "Show Envelope";
  envelopeButton.addEventListener("click", () => {
    const liveAssembly = getAssemblyDraftById(assembly.id);
    if (!liveAssembly) {
      return;
    }
    liveAssembly.envelopeEnabled = !liveAssembly.envelopeEnabled;
    closeMenu();
    renderJsonPreview();
    openAssemblyPropertiesMenuAt(clientX, clientY, assembly.id);
  });
  menu.appendChild(envelopeButton);

  appendMenuSectionHeader(menu, "Danger");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Remove";
  removeButton.className = "composer-assembly-menu-danger";
  removeButton.disabled = assemblyDrafts.length <= 1;
  removeButton.addEventListener("click", () => {
    const nextDrafts = assemblyDrafts.filter((candidate) => candidate?.id !== assembly.id);
    assemblyDrafts.splice(0, assemblyDrafts.length, ...nextDrafts);
    ensureAssemblyDrafts();
    setSelectedAssembly(assemblyDrafts[0]?.id ?? null, { persistCurrentPath: false });
    closeMenu();
    renderAssemblyEditor();
    renderJsonPreview();
  });
  menu.appendChild(removeButton);
  positionMenu(clientX, clientY, 320, 720);
}

export function openComposerPathPointMenu(config) {
  const {
    menu,
    clientX,
    clientY,
    pointIndex,
    getSelectedAssemblyLetter,
    setSelectedPointIndex,
    resetMenu,
    cameraFlightState,
    updatePointMaterials,
    updateCameraPoiStatus,
    closeMenu,
    THREE,
    pathState,
    vectorFromTriplet,
    addPathPoint,
    renderJsonPreview,
    resetPathPoints,
    removePathPoint,
    positionMenu,
  } = config;
  if (!menu || !Number.isInteger(pointIndex)) {
    return;
  }
  const assemblyLetter = getSelectedAssemblyLetter();
  setSelectedPointIndex(pointIndex);
  resetMenu();

  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = `Path ${assemblyLetter}`;
  menu.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = "composer-assembly-menu-subtitle";
  subtitle.textContent = `Point ${pointIndex + 1}`;
  menu.appendChild(subtitle);

  const poiButton = document.createElement("button");
  poiButton.type = "button";
  poiButton.textContent = "Use This Point As Observer Target";
  poiButton.addEventListener("click", () => {
    setSelectedPointIndex(pointIndex);
    cameraFlightState.poiMode = "selected";
    updatePointMaterials(pointIndex);
    updateCameraPoiStatus();
    closeMenu();
  });
  menu.appendChild(poiButton);

  const addPointButton = document.createElement("button");
  addPointButton.type = "button";
  addPointButton.textContent = `Add ${assemblyLetter} Point After`;
  addPointButton.addEventListener("click", () => {
    const currentPoint = pathState.points[pointIndex] ?? null;
    const nextPoint =
      currentPoint instanceof THREE.Vector3
        ? currentPoint.clone().add(new THREE.Vector3(0.45, 0, 0))
        : Array.isArray(currentPoint)
          ? vectorFromTriplet(currentPoint).add(new THREE.Vector3(0.45, 0, 0))
          : new THREE.Vector3(0.45, 0, 0);
    addPathPoint(nextPoint, { insertAfterIndex: pointIndex });
    renderJsonPreview();
    closeMenu();
  });
  menu.appendChild(addPointButton);

  const resetButton = document.createElement("button");
  resetButton.type = "button";
  resetButton.textContent = `Reset ${assemblyLetter} Path`;
  resetButton.addEventListener("click", () => {
    resetPathPoints();
    renderJsonPreview();
    closeMenu();
  });
  menu.appendChild(resetButton);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = `Remove ${assemblyLetter} Point`;
  removeButton.className = "composer-assembly-menu-danger";
  removeButton.disabled = pathState.points.length <= 1;
  removeButton.addEventListener("click", () => {
    removePathPoint(pointIndex);
    renderJsonPreview();
    closeMenu();
  });
  menu.appendChild(removeButton);

  positionMenu(clientX, clientY, 236, 210);
}
