function appendMenuTitle(menu, titleText, subtitleText = "") {
  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = titleText;
  menu.appendChild(title);
  if (subtitleText) {
    const subtitle = document.createElement("div");
    subtitle.className = "composer-assembly-menu-subtitle";
    subtitle.textContent = subtitleText;
    menu.appendChild(subtitle);
  }
}

export function buildComposerTimelineSummaryMenu(config) {
  const {
    menu,
    clientX,
    clientY,
    currentDuration,
    isLooping,
    resetComposerAssemblyMenu,
    appendComposerMenuBlock,
    appendComposerMenuField,
    formatComposerTimeInputValue,
    setComposerSceneDurationValue,
    setComposerSceneLoopValue,
    renderComposerJsonPreview,
    positionComposerAssemblyMenu,
  } = config;
  resetComposerAssemblyMenu("timeline");
  appendMenuTitle(menu, "Scene Timing");
  const commitTimingDraft = () => {
    const duration = Number(durationInput?.value);
    if (!Number.isFinite(duration) || duration <= 0) {
      durationInput.value = formatComposerTimeInputValue(currentDuration);
      return;
    }
    setComposerSceneDurationValue(duration);
    setComposerSceneLoopValue(!!loopInput?.checked);
    renderComposerJsonPreview();
  };
  const timingBlock = appendComposerMenuBlock(menu, "Timing");
  const form = document.createElement("div");
  form.className = "composer-form";
  const durationInput = appendComposerMenuField(form, {
    label: "Total Duration (s)",
    type: "number",
    value: formatComposerTimeInputValue(currentDuration),
    step: 0.1,
    min: 1,
    selectOnFocus: true,
  });
  const loopInput = appendComposerMenuField(form, {
    label: "Loop",
    type: "checkbox",
    value: isLooping,
  });
  loopInput?.closest?.(".composer-field")?.classList?.add("is-toggle-field");
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
  positionComposerAssemblyMenu(clientX, clientY, 224, 176);
}

export function buildComposerSceneMenu(config) {
  const {
    menu,
    clientX,
    clientY,
    currentId,
    currentName,
    resetComposerAssemblyMenu,
    appendComposerMenuBlock,
    appendComposerMenuButtonRow,
    appendComposerMenuField,
    appendComposerMenuNote,
    applyComposerSceneIdentityDraft,
    closeComposerAssemblyMenu,
    openComposerLibraryMenuAt,
    composerDocsButton,
    positionComposerAssemblyMenu,
  } = config;
  resetComposerAssemblyMenu();
  appendMenuTitle(menu, "Scene", currentName);
  const commitSceneIdentityDraft = () => {
    applyComposerSceneIdentityDraft(
      String(sceneIdInput?.value ?? "").trim() || currentId,
      String(sceneNameInput?.value ?? "").trim() || currentName
    );
  };
  const sceneBlock = appendComposerMenuBlock(menu, "Identity", {
    text: "Apply",
    onClick: () => {
      commitSceneIdentityDraft();
      closeComposerAssemblyMenu();
    },
  });
  const sceneForm = document.createElement("div");
  sceneForm.className = "composer-form";
  const sceneIdInput = appendComposerMenuField(sceneForm, {
    label: "Scene ID",
    value: "",
    placeholder: currentId,
  });
  const sceneNameInput = appendComposerMenuField(sceneForm, {
    label: "Scene Name",
    value: "",
    placeholder: currentName,
  });
  sceneBlock?.block?.appendChild(sceneForm);
  appendComposerMenuNote(
    sceneBlock?.block,
    "Assembly editing stays on the canvas. Timeline duration and loop live in the top-right time readout."
  );
  appendComposerMenuButtonRow(menu, [
    {
      text: "Library",
      onClick: () => {
        commitSceneIdentityDraft();
        openComposerLibraryMenuAt(clientX, clientY);
      },
    },
    {
      text: "Composer Docs",
      onClick: () => {
        closeComposerAssemblyMenu();
        composerDocsButton?.click();
      },
    },
  ]);
  positionComposerAssemblyMenu(clientX, clientY, 312, 252);
}

export function buildComposerJsonPreviewMenu(config) {
  const {
    menu,
    clientX,
    clientY,
    draftState,
    json,
    composerJsonPreview,
    resetComposerAssemblyMenu,
    appendComposerMenuButtonRow,
    openComposerLibraryMenuAt,
    closeComposerAssemblyMenu,
    composerExportButton,
    positionComposerAssemblyMenu,
  } = config;
  if (composerJsonPreview) {
    composerJsonPreview.textContent = json;
  }
  resetComposerAssemblyMenu();
  appendMenuTitle(
    menu,
    "JSON Preview",
    `${draftState.name || "Composer Scene"} • ${draftState.id || "composer_scene"}`
  );
  appendComposerMenuButtonRow(menu, [
    {
      text: "Back",
      onClick: () => {
        openComposerLibraryMenuAt(clientX, clientY);
      },
    },
    {
      text: "Export JSON",
      onClick: () => {
        closeComposerAssemblyMenu();
        composerExportButton?.click();
      },
    },
  ]);
  const preview = document.createElement("pre");
  preview.className = "composer-json-preview composer-assembly-menu-json-preview";
  preview.textContent = json;
  menu.appendChild(preview);
  positionComposerAssemblyMenu(clientX, clientY, 520, 520);
}

export function buildComposerLibraryMenu(config) {
  const {
    menu,
    clientX,
    clientY,
    entries,
    composerLibrarySelect,
    composerLibraryLoadButton,
    composerLibraryDeleteButton,
    composerLibraryStatus,
    composerRepoSaveButton,
    composerLibrarySaveButton,
    composerExportButton,
    importReactionFlow,
    resetComposerAssemblyMenu,
    refreshComposerLibraryUi,
    appendComposerMenuBlock,
    appendComposerMenuButtonRow,
    appendComposerMenuNote,
    appendComposerMenuSelectField,
    closeComposerAssemblyMenu,
    openComposerJsonPreviewMenuAt,
    positionComposerAssemblyMenu,
  } = config;
  resetComposerAssemblyMenu();
  refreshComposerLibraryUi();
  appendMenuTitle(
    menu,
    "Library",
    entries.length ? `${entries.length} browser draft${entries.length === 1 ? "" : "s"}` : "No browser drafts yet"
  );
  const saveBlock = appendComposerMenuBlock(menu, "Save");
  appendComposerMenuButtonRow(saveBlock?.block, [
    {
      text: "Save Repo",
      onClick: () => {
        closeComposerAssemblyMenu();
        composerRepoSaveButton?.click();
      },
    },
    {
      text: "Save Library",
      onClick: () => {
        closeComposerAssemblyMenu();
        composerLibrarySaveButton?.click();
      },
    },
  ]);
  appendComposerMenuButtonRow(saveBlock?.block, [
    {
      text: "Export JSON",
      onClick: () => {
        closeComposerAssemblyMenu();
        composerExportButton?.click();
      },
    },
    {
      text: "JSON Preview",
      onClick: () => {
        openComposerJsonPreviewMenuAt(clientX, clientY);
      },
    },
  ]);
  appendComposerMenuButtonRow(saveBlock?.block, [
    {
      text: "Import Reaction",
      onClick: () => {
        closeComposerAssemblyMenu();
        importReactionFlow?.();
      },
    },
  ]);
  const libraryBlock = appendComposerMenuBlock(menu, "Browser Library");
  if (entries.length) {
    const libraryForm = document.createElement("div");
    libraryForm.className = "composer-form";
    const selectedEntryId = composerLibrarySelect?.value || entries[0]?.id || "";
    const librarySelectInput = appendComposerMenuSelectField(libraryForm, {
      label: "Saved Scenes",
      value: selectedEntryId,
      entries: entries.map((entry) => ({
        value: entry.id,
        label: entry.name || entry.id,
      })),
    });
    libraryBlock?.block?.appendChild(libraryForm);
    appendComposerMenuButtonRow(libraryBlock?.block, [
      {
        text: "Load",
        onClick: () => {
          const selectedId = librarySelectInput?.value ?? "";
          if (!selectedId) {
            return;
          }
          if (composerLibrarySelect) {
            composerLibrarySelect.value = selectedId;
          }
          closeComposerAssemblyMenu();
          composerLibraryLoadButton?.click();
        },
      },
      {
        text: "Delete",
        className: "composer-assembly-menu-danger",
        onClick: () => {
          const selectedId = librarySelectInput?.value ?? "";
          if (!selectedId) {
            return;
          }
          if (composerLibrarySelect) {
            composerLibrarySelect.value = selectedId;
          }
          closeComposerAssemblyMenu();
          composerLibraryDeleteButton?.click();
        },
      },
    ]);
  } else {
    appendComposerMenuNote(
      libraryBlock?.block,
      "Save Library keeps a draft in this browser. Save Repo or Export JSON creates a file you can place in the repo."
    );
  }
  appendComposerMenuNote(
    libraryBlock?.block,
    composerLibraryStatus?.textContent ||
      "Library storage is browser-local for now. Save keeps drafts in this browser only."
  );
  positionComposerAssemblyMenu(clientX, clientY, 320, entries.length ? 376 : 288);
}
