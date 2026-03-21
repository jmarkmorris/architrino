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
    appendMenuSectionHeader,
    closeMenu,
    renderAssemblyEditor,
    renderJsonPreview,
    moveMemberToRoot,
    openMemberMenuAt,
    createSubassemblyFromMembers,
    openSubassemblyMenuAt,
    removeAssemblyMember,
    openAssemblyPropertiesMenuAt,
    moveMemberToSubassembly,
    positionMenu,
  } = config;
  if (!menu) {
    return;
  }
  const assembly = getAssemblyDraftById(assemblyId);
  const normalizedMemberId = sanitizeEntityId(memberId, "");
  if (!assembly || !normalizedMemberId) {
    return;
  }
  const currentSubassemblyId = getMemberSubassemblyId(assembly, normalizedMemberId);
  const memberOffset = resolveAssemblyMemberLocalOffset(assembly, normalizedMemberId);
  const siblingSubassemblies = normalizeSubassemblyList(assembly?.subassemblies).filter(
    (entry, index) => getSubassemblyId(entry, index) !== currentSubassemblyId
  );

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

  appendMenuButtonRow(menu, [
    currentSubassemblyId
      ? {
          text: "Move To Root",
          onClick: () => {
            const liveAssembly = getAssemblyDraftById(assemblyId);
            if (!liveAssembly || !moveMemberToRoot(liveAssembly, normalizedMemberId)) {
              return;
            }
            closeMenu();
            renderAssemblyEditor();
            renderJsonPreview();
            openMemberMenuAt(clientX, clientY, assemblyId, normalizedMemberId);
          },
        }
      : {
          text: "New Subassembly",
          onClick: () => {
            const liveAssembly = getAssemblyDraftById(assemblyId);
            if (!liveAssembly) {
              return;
            }
            const nextSubassemblyId = createSubassemblyFromMembers(liveAssembly, [normalizedMemberId]);
            if (!nextSubassemblyId) {
              return;
            }
            closeMenu();
            renderAssemblyEditor();
            renderJsonPreview();
            openSubassemblyMenuAt(clientX, clientY, assemblyId, nextSubassemblyId);
          },
        },
    {
      text: "Remove Member",
      className: "composer-assembly-menu-danger",
      onClick: () => {
        const liveAssembly = getAssemblyDraftById(assemblyId);
        if (!liveAssembly || !removeAssemblyMember(liveAssembly, normalizedMemberId)) {
          return;
        }
        closeMenu();
        renderAssemblyEditor();
        renderJsonPreview();
        openAssemblyPropertiesMenuAt(clientX, clientY, assemblyId);
      },
    },
  ]);

  if (siblingSubassemblies.length) {
    appendMenuSectionHeader(menu, "Move To Group", `${siblingSubassemblies.length}`);
    siblingSubassemblies.forEach((entry, index) => {
      const targetSubassemblyId = getSubassemblyId(entry, index);
      appendMenuButtonRow(menu, [
        {
          text: targetSubassemblyId,
          onClick: () => {
            const liveAssembly = getAssemblyDraftById(assemblyId);
            if (!liveAssembly || !moveMemberToSubassembly(liveAssembly, normalizedMemberId, targetSubassemblyId)) {
              return;
            }
            closeMenu();
            renderAssemblyEditor();
            renderJsonPreview();
            openMemberMenuAt(clientX, clientY, assemblyId, normalizedMemberId);
          },
        },
        null,
      ]);
    });
  }

  positionMenu(clientX, clientY, 320, 420);
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
    appendMenuButtonRow,
    ensureAssemblyMemberRecord,
    closeMenu,
    renderJsonPreview,
    positionMenu,
  } = config;
  if (!menu) {
    return;
  }
  const assembly = getAssemblyDraftById(assemblyId);
  const members = normalizeMemberList(assembly?.members);
  const member = members.find((entry, index) => getMemberId(entry, index) === sanitizeEntityId(memberId, ""));
  if (!assembly || !isPersonalityMember(member)) {
    return;
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
      ? "Unset slot. Choose electrino or positrino."
      : currentState === "electrino"
        ? "Electrino set. You can flip this slot to positrino."
        : "Positrino set. You can flip this slot to electrino."
  );

  const setPersonalityState = (nextState) => {
    const liveAssembly = getAssemblyDraftById(assemblyId);
    const liveMember = ensureAssemblyMemberRecord(liveAssembly, getMemberId(member));
    if (!liveMember) {
      return;
    }
    liveMember.state = nextState;
    closeMenu();
    renderJsonPreview();
  };

  if (currentState === "unset") {
    appendMenuButtonRow(menu, [
      { text: "Set Electrino", onClick: () => setPersonalityState("electrino") },
      { text: "Set Positrino", onClick: () => setPersonalityState("positrino") },
    ]);
  } else {
    appendMenuButtonRow(menu, [
      {
        text: currentState === "electrino" ? "Flip To Positrino" : "Flip To Electrino",
        onClick: () => setPersonalityState(currentState === "electrino" ? "positrino" : "electrino"),
      },
    ]);
  }

  positionMenu(clientX, clientY, 236, 166);
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
    dissolveSubassembly,
    closeMenu,
    renderAssemblyEditor,
    renderJsonPreview,
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

  appendMenuButtonRow(menu, [
    {
      text: "Dissolve Group",
      className: "composer-assembly-menu-danger",
      onClick: () => {
        const liveAssembly = getAssemblyDraftById(assemblyId);
        if (!liveAssembly || !dissolveSubassembly(liveAssembly, normalizedSubassemblyId)) {
          return;
        }
        closeMenu();
        renderAssemblyEditor();
        renderJsonPreview();
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
    "Add an assembly template here, then change its Scene Role from the assembly menu when you need reactants or products."
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
    sceneRoleOptions,
    normalizeAssemblySceneRole,
    getAssemblyDraftById,
    renderAssemblyEditor,
    assemblyPositionInputs,
    renderJsonPreview,
    rebaseAssemblyParentFrame,
    syncAssemblyPositionInputs,
    pathState,
    normalizeAssemblyPathPoints,
    vectorFromTriplet,
    updatePathGeometry,
    addAssemblyMemberByKind,
    closeMenu,
    getAvailablePersonalitySlotCount,
    getPersonalitySlotCapacity,
    setStatus,
    normalizeSubassemblyList,
    normalizeMemberList,
    getMemberId,
    getSubassemblyId,
    openMemberMenuAt,
    openSubassemblyMenuAt,
    startTransferFromAssembly,
    completeTransferToAssembly,
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

  if (pendingTransferSource?.assemblyId) {
    const transferDraft = document.createElement("div");
    transferDraft.className = "composer-assembly-menu-subtitle";
    transferDraft.textContent = `Transfer from ${pendingTransferSource.assemblyId}.${pendingTransferSource.memberId}`;
    menu.appendChild(transferDraft);
  }

  const form = document.createElement("div");
  form.className = "composer-form";

  const nameField = document.createElement("label");
  nameField.className = "composer-field";
  const nameLabel = document.createElement("span");
  nameLabel.textContent = "Name";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = assembly.name;
  nameInput.addEventListener("input", () => {
    const liveAssembly = getAssemblyDraftById(assembly.id);
    if (!liveAssembly) {
      return;
    }
    liveAssembly.name = nameInput.value;
    subtitle.textContent = liveAssembly.name.trim() || liveAssembly.id;
    renderAssemblyEditor();
    assemblyPositionInputs.set(liveAssembly.id, positionInputs);
    renderJsonPreview();
  });
  nameField.append(nameLabel, nameInput);
  form.appendChild(nameField);

  const sceneRoleField = document.createElement("label");
  sceneRoleField.className = "composer-field";
  const sceneRoleLabel = document.createElement("span");
  sceneRoleLabel.textContent = "Scene Role";
  const sceneRoleSelect = document.createElement("select");
  sceneRoleOptions.forEach((entry) => {
    const option = document.createElement("option");
    option.value = entry.value;
    option.textContent = entry.label;
    sceneRoleSelect.appendChild(option);
  });
  sceneRoleSelect.value = normalizeAssemblySceneRole(assembly.sceneRole);
  sceneRoleSelect.addEventListener("change", () => {
    const liveAssembly = getAssemblyDraftById(assembly.id);
    if (!liveAssembly) {
      return;
    }
    liveAssembly.sceneRole = normalizeAssemblySceneRole(sceneRoleSelect.value);
    renderAssemblyEditor();
    assemblyPositionInputs.set(liveAssembly.id, positionInputs);
    renderJsonPreview();
  });
  sceneRoleField.append(sceneRoleLabel, sceneRoleSelect);
  form.appendChild(sceneRoleField);

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
    "Canvas-first structure: drag the center to move the assembly, drag member dots to place members, drag subassembly halos to place groups, and right-click visible handles for focused actions."
  );

  appendMenuSectionHeader(menu, "Structure", `${Array.isArray(assembly.members) ? assembly.members.length : 0}`);

  const actions = document.createElement("div");
  actions.className = "composer-button-row";
  const addPositrinoButton = document.createElement("button");
  addPositrinoButton.type = "button";
  addPositrinoButton.textContent = "Add Positrino";
  addPositrinoButton.addEventListener("click", () => {
    const liveAssembly = getAssemblyDraftById(assembly.id);
    if (!liveAssembly || !addAssemblyMemberByKind(liveAssembly, "positrino")) {
      return;
    }
    closeMenu();
    renderAssemblyEditor();
    renderJsonPreview();
    openAssemblyPropertiesMenuAt(clientX, clientY, assembly.id);
  });
  actions.appendChild(addPositrinoButton);

  const addElectrinoButton = document.createElement("button");
  addElectrinoButton.type = "button";
  addElectrinoButton.textContent = "Add Electrino";
  addElectrinoButton.addEventListener("click", () => {
    const liveAssembly = getAssemblyDraftById(assembly.id);
    if (!liveAssembly || !addAssemblyMemberByKind(liveAssembly, "electrino")) {
      return;
    }
    closeMenu();
    renderAssemblyEditor();
    renderJsonPreview();
    openAssemblyPropertiesMenuAt(clientX, clientY, assembly.id);
  });
  actions.appendChild(addElectrinoButton);

  const addPairButton = document.createElement("button");
  addPairButton.type = "button";
  addPairButton.textContent = "Add Pair";
  addPairButton.addEventListener("click", () => {
    const liveAssembly = getAssemblyDraftById(assembly.id);
    if (!liveAssembly) {
      return;
    }
    const hasCore = Array.isArray(liveAssembly?.core?.shells) && liveAssembly.core.shells.length > 0;
    if (hasCore && getAvailablePersonalitySlotCount(liveAssembly) < 2) {
      setStatus(
        `Not enough personality slots remain for a pair. ${getAvailablePersonalitySlotCount(liveAssembly)} of ${getPersonalitySlotCapacity(liveAssembly)} slot${
          getPersonalitySlotCapacity(liveAssembly) === 1 ? "" : "s"
        } available.`
      );
      return;
    }
    if (!addAssemblyMemberByKind(liveAssembly, "positrino")) {
      return;
    }
    if (!addAssemblyMemberByKind(liveAssembly, "electrino")) {
      return;
    }
    closeMenu();
    renderAssemblyEditor();
    renderJsonPreview();
    openAssemblyPropertiesMenuAt(clientX, clientY, assembly.id);
  });
  actions.appendChild(addPairButton);
  menu.appendChild(actions);

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

  const clearMembersButton = document.createElement("button");
  clearMembersButton.type = "button";
  clearMembersButton.textContent = "Clear Members";
  clearMembersButton.addEventListener("click", () => {
    const liveAssembly = getAssemblyDraftById(assembly.id);
    if (!liveAssembly) {
      return;
    }
    liveAssembly.members = [];
    liveAssembly.subassemblies = [];
    closeMenu();
    renderAssemblyEditor();
    renderJsonPreview();
    openAssemblyPropertiesMenuAt(clientX, clientY, assembly.id);
  });
  structureActions.appendChild(clearMembersButton);
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

  appendMenuSectionHeader(menu, "Transfers");
  const transferButton = document.createElement("button");
  transferButton.type = "button";
  transferButton.textContent =
    pendingTransferSource?.assemblyId && pendingTransferSource.assemblyId !== assembly.id
      ? "Complete Transfer Here"
      : "Start Transfer From Here";
  transferButton.addEventListener("click", () => {
    const didUpdate =
      pendingTransferSource?.assemblyId && pendingTransferSource.assemblyId !== assembly.id
        ? completeTransferToAssembly(assembly)
        : startTransferFromAssembly(assembly);
    if (!didUpdate) {
      return;
    }
    closeMenu();
    renderJsonPreview();
    openAssemblyPropertiesMenuAt(clientX, clientY, assembly.id);
  });
  menu.appendChild(transferButton);

  if (pendingTransferSource?.assemblyId) {
    const cancelTransferButton = document.createElement("button");
    cancelTransferButton.type = "button";
    cancelTransferButton.textContent = "Cancel Transfer Draft";
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
