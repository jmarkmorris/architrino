function appendMenuTitle(menu, titleText, subtitleText = "") {
  const title = document.createElement("div");
  title.className = "pdgview-assembly-menu-title";
  title.textContent = titleText;
  menu.appendChild(title);
  if (subtitleText) {
    const subtitle = document.createElement("div");
    subtitle.className = "pdgview-assembly-menu-subtitle";
    subtitle.textContent = subtitleText;
    menu.appendChild(subtitle);
  }
}

export function buildPdgviewTimelineSummaryMenu(config) {
  const {
    menu,
    clientX,
    clientY,
    currentDuration,
    isLooping,
    resetPdgviewAssemblyMenu,
    appendPdgviewMenuBlock,
    appendPdgviewMenuField,
    formatPdgviewTimeInputValue,
    setPdgviewSceneDurationValue,
    setPdgviewSceneLoopValue,
    renderPdgviewJsonPreview,
    positionPdgviewAssemblyMenu,
  } = config;
  resetPdgviewAssemblyMenu("timeline");
  appendMenuTitle(menu, "Scene Timing");
  const commitTimingDraft = () => {
    const duration = Number(durationInput?.value);
    if (!Number.isFinite(duration) || duration <= 0) {
      durationInput.value = formatPdgviewTimeInputValue(currentDuration);
      return;
    }
    setPdgviewSceneDurationValue(duration);
    setPdgviewSceneLoopValue(!!loopInput?.checked);
    renderPdgviewJsonPreview();
  };
  const timingBlock = appendPdgviewMenuBlock(menu, "Timing");
  const form = document.createElement("div");
  form.className = "pdgview-form";
  const durationInput = appendPdgviewMenuField(form, {
    label: "Total Duration (s)",
    type: "number",
    value: formatPdgviewTimeInputValue(currentDuration),
    step: 0.1,
    min: 1,
    selectOnFocus: true,
  });
  const loopInput = appendPdgviewMenuField(form, {
    label: "Loop",
    type: "checkbox",
    value: isLooping,
  });
  loopInput?.closest?.(".pdgview-field")?.classList?.add("is-toggle-field");
  durationInput?.addEventListener("change", commitTimingDraft);
  durationInput?.addEventListener("blur", commitTimingDraft);
  durationInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }
    event.preventDefault();
    commitTimingDraft();
  });
  loopInput?.addEventListener("change", commitTimingDraft);
  timingBlock?.block?.appendChild(form);
  positionPdgviewAssemblyMenu(clientX, clientY, 224, 176);
}

export function buildPdgviewSceneMenu(config) {
  const {
    menu,
    clientX,
    clientY,
    currentId,
    currentName,
    resetPdgviewAssemblyMenu,
    appendPdgviewMenuBlock,
    appendPdgviewMenuButtonRow,
    appendPdgviewMenuField,
    appendPdgviewMenuNote,
    applyPdgviewSceneIdentityDraft,
    closePdgviewAssemblyMenu,
    openPdgviewLibraryMenuAt,
    pdgviewDocsButton,
    positionPdgviewAssemblyMenu,
  } = config;
  resetPdgviewAssemblyMenu();
  appendMenuTitle(menu, "Scene", currentName);
  const commitSceneIdentityDraft = () => {
    applyPdgviewSceneIdentityDraft(
      String(sceneIdInput?.value ?? "").trim() || currentId,
      String(sceneNameInput?.value ?? "").trim() || currentName
    );
  };
  const sceneBlock = appendPdgviewMenuBlock(menu, "Identity", {
    text: "Apply",
    onClick: () => {
      commitSceneIdentityDraft();
      closePdgviewAssemblyMenu();
    },
  });
  const sceneForm = document.createElement("div");
  sceneForm.className = "pdgview-form";
  const sceneIdInput = appendPdgviewMenuField(sceneForm, {
    label: "Scene ID",
    value: "",
    placeholder: currentId,
  });
  const sceneNameInput = appendPdgviewMenuField(sceneForm, {
    label: "Scene Name",
    value: "",
    placeholder: currentName,
  });
  sceneBlock?.block?.appendChild(sceneForm);
  appendPdgviewMenuNote(
    sceneBlock?.block,
    "Assembly editing stays on the canvas. Timeline duration and loop live in the top-right time readout."
  );
  appendPdgviewMenuButtonRow(menu, [
    {
      text: "Library",
      onClick: () => {
        commitSceneIdentityDraft();
        openPdgviewLibraryMenuAt(clientX, clientY);
      },
    },
    {
      text: "pdgview docs",
      onClick: () => {
        closePdgviewAssemblyMenu();
        pdgviewDocsButton?.click();
      },
    },
  ]);
  positionPdgviewAssemblyMenu(clientX, clientY, 312, 252);
}

export function buildPdgviewJsonPreviewMenu(config) {
  const {
    menu,
    clientX,
    clientY,
    draftState,
    json,
    pdgviewJsonPreview,
    resetPdgviewAssemblyMenu,
    appendPdgviewMenuButtonRow,
    openPdgviewLibraryMenuAt,
    closePdgviewAssemblyMenu,
    pdgviewExportButton,
    positionPdgviewAssemblyMenu,
  } = config;
  if (pdgviewJsonPreview) {
    pdgviewJsonPreview.textContent = json;
  }
  resetPdgviewAssemblyMenu();
  appendMenuTitle(
    menu,
    "JSON Preview",
    `${draftState.name || "pdgview scene"} • ${draftState.id || "pdgview_scene"}`
  );
  appendPdgviewMenuButtonRow(menu, [
    {
      text: "Back",
      onClick: () => {
        openPdgviewLibraryMenuAt(clientX, clientY);
      },
    },
    {
      text: "Export JSON",
      onClick: () => {
        closePdgviewAssemblyMenu();
        pdgviewExportButton?.click();
      },
    },
  ]);
  const preview = document.createElement("pre");
  preview.className = "pdgview-json-preview pdgview-assembly-menu-json-preview";
  preview.textContent = json;
  menu.appendChild(preview);
  positionPdgviewAssemblyMenu(clientX, clientY, 520, 520);
}

export function buildPdgviewLibraryMenu(config) {
  const {
    menu,
    clientX,
    clientY,
    entries,
    pdgviewLibrarySelect,
    pdgviewLibraryLoadButton,
    pdgviewLibraryDeleteButton,
    pdgviewLibraryStatus,
    pdgviewRepoSaveButton,
    pdgviewLibrarySaveButton,
    pdgviewExportButton,
    resetPdgviewAssemblyMenu,
    refreshPdgviewLibraryUi,
    appendPdgviewMenuBlock,
    appendPdgviewMenuButtonRow,
    appendPdgviewMenuNote,
    appendPdgviewMenuSelectField,
    closePdgviewAssemblyMenu,
    openPdgviewJsonPreviewMenuAt,
    positionPdgviewAssemblyMenu,
  } = config;
  resetPdgviewAssemblyMenu();
  refreshPdgviewLibraryUi();
  appendMenuTitle(
    menu,
    "Library",
    entries.length ? `${entries.length} browser draft${entries.length === 1 ? "" : "s"}` : "No browser drafts yet"
  );
  const saveBlock = appendPdgviewMenuBlock(menu, "Save");
  appendPdgviewMenuButtonRow(saveBlock?.block, [
    {
      text: "Save Repo",
      onClick: () => {
        closePdgviewAssemblyMenu();
        pdgviewRepoSaveButton?.click();
      },
    },
    {
      text: "Save Library",
      onClick: () => {
        closePdgviewAssemblyMenu();
        pdgviewLibrarySaveButton?.click();
      },
    },
  ]);
  appendPdgviewMenuButtonRow(saveBlock?.block, [
    {
      text: "Export JSON",
      onClick: () => {
        closePdgviewAssemblyMenu();
        pdgviewExportButton?.click();
      },
    },
    {
      text: "JSON Preview",
      onClick: () => {
        openPdgviewJsonPreviewMenuAt(clientX, clientY);
      },
    },
  ]);
  const libraryBlock = appendPdgviewMenuBlock(menu, "Browser Library");
  if (entries.length) {
    const libraryForm = document.createElement("div");
    libraryForm.className = "pdgview-form";
    const selectedEntryId = pdgviewLibrarySelect?.value || entries[0]?.id || "";
    const librarySelectInput = appendPdgviewMenuSelectField(libraryForm, {
      label: "Saved Scenes",
      value: selectedEntryId,
      entries: entries.map((entry) => ({
        value: entry.id,
        label: entry.name || entry.id,
      })),
    });
    libraryBlock?.block?.appendChild(libraryForm);
    appendPdgviewMenuButtonRow(libraryBlock?.block, [
      {
        text: "Load",
        onClick: () => {
          const selectedId = librarySelectInput?.value ?? "";
          if (!selectedId) {
            return;
          }
          if (pdgviewLibrarySelect) {
            pdgviewLibrarySelect.value = selectedId;
          }
          closePdgviewAssemblyMenu();
          pdgviewLibraryLoadButton?.click();
        },
      },
      {
        text: "Delete",
        className: "pdgview-assembly-menu-danger",
        onClick: () => {
          const selectedId = librarySelectInput?.value ?? "";
          if (!selectedId) {
            return;
          }
          if (pdgviewLibrarySelect) {
            pdgviewLibrarySelect.value = selectedId;
          }
          closePdgviewAssemblyMenu();
          pdgviewLibraryDeleteButton?.click();
        },
      },
    ]);
  } else {
    appendPdgviewMenuNote(
      libraryBlock?.block,
      "Save Library keeps a draft in this browser. Save Repo or Export JSON creates a file you can place in the repo."
    );
  }
  appendPdgviewMenuNote(
    libraryBlock?.block,
    pdgviewLibraryStatus?.textContent ||
      "Library storage is browser-local for now. Save keeps drafts in this browser only."
  );
  positionPdgviewAssemblyMenu(clientX, clientY, 320, entries.length ? 376 : 288);
}
