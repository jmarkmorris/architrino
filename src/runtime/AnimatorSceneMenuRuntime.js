function appendMenuTitle(menu, titleText, subtitleText = "") {
  const title = document.createElement("div");
  title.className = "animator-assembly-menu-title";
  title.textContent = titleText;
  menu.appendChild(title);
  if (subtitleText) {
    const subtitle = document.createElement("div");
    subtitle.className = "animator-assembly-menu-subtitle";
    subtitle.textContent = subtitleText;
    menu.appendChild(subtitle);
  }
}

export function buildAnimatorTimelineSummaryMenu(config) {
  const {
    menu,
    clientX,
    clientY,
    currentDuration,
    isLooping,
    resetAnimatorAssemblyMenu,
    appendAnimatorMenuBlock,
    appendAnimatorMenuField,
    formatAnimatorTimeInputValue,
    setAnimatorSceneDurationValue,
    setAnimatorSceneLoopValue,
    renderAnimatorJsonPreview,
    positionAnimatorAssemblyMenu,
  } = config;
  resetAnimatorAssemblyMenu("timeline");
  appendMenuTitle(menu, "Scene Timing");
  const commitTimingDraft = () => {
    const duration = Number(durationInput?.value);
    if (!Number.isFinite(duration) || duration <= 0) {
      durationInput.value = formatAnimatorTimeInputValue(currentDuration);
      return;
    }
    setAnimatorSceneDurationValue(duration);
    setAnimatorSceneLoopValue(!!loopInput?.checked);
    renderAnimatorJsonPreview();
  };
  const timingBlock = appendAnimatorMenuBlock(menu, "Timing");
  const form = document.createElement("div");
  form.className = "animator-form";
  const durationInput = appendAnimatorMenuField(form, {
    label: "Total Duration (s)",
    type: "number",
    value: formatAnimatorTimeInputValue(currentDuration),
    step: 0.1,
    min: 1,
    selectOnFocus: true,
  });
  const loopInput = appendAnimatorMenuField(form, {
    label: "Loop",
    type: "checkbox",
    value: isLooping,
  });
  loopInput?.closest?.(".animator-field")?.classList?.add("is-toggle-field");
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
  positionAnimatorAssemblyMenu(clientX, clientY, 224, 176);
}

export function buildAnimatorSceneMenu(config) {
  const {
    menu,
    clientX,
    clientY,
    currentId,
    currentName,
    resetAnimatorAssemblyMenu,
    appendAnimatorMenuBlock,
    appendAnimatorMenuButtonRow,
    appendAnimatorMenuField,
    appendAnimatorMenuNote,
    applyAnimatorSceneIdentityDraft,
    closeAnimatorAssemblyMenu,
    openAnimatorLibraryMenuAt,
    animatorDocsButton,
    positionAnimatorAssemblyMenu,
  } = config;
  resetAnimatorAssemblyMenu();
  appendMenuTitle(menu, "Scene", currentName);
  const commitSceneIdentityDraft = () => {
    applyAnimatorSceneIdentityDraft(
      String(sceneIdInput?.value ?? "").trim() || currentId,
      String(sceneNameInput?.value ?? "").trim() || currentName
    );
  };
  const sceneBlock = appendAnimatorMenuBlock(menu, "Identity", {
    text: "Apply",
    onClick: () => {
      commitSceneIdentityDraft();
      closeAnimatorAssemblyMenu();
    },
  });
  const sceneForm = document.createElement("div");
  sceneForm.className = "animator-form";
  const sceneIdInput = appendAnimatorMenuField(sceneForm, {
    label: "Scene ID",
    value: "",
    placeholder: currentId,
  });
  const sceneNameInput = appendAnimatorMenuField(sceneForm, {
    label: "Scene Name",
    value: "",
    placeholder: currentName,
  });
  sceneBlock?.block?.appendChild(sceneForm);
  appendAnimatorMenuNote(
    sceneBlock?.block,
    "Assembly editing stays on the canvas. Timeline duration and loop live in the top-right time readout."
  );
  appendAnimatorMenuButtonRow(menu, [
    {
      text: "Library",
      onClick: () => {
        commitSceneIdentityDraft();
        openAnimatorLibraryMenuAt(clientX, clientY);
      },
    },
    {
      text: "animator docs",
      onClick: () => {
        closeAnimatorAssemblyMenu();
        animatorDocsButton?.click();
      },
    },
  ]);
  positionAnimatorAssemblyMenu(clientX, clientY, 312, 252);
}

export function buildAnimatorJsonPreviewMenu(config) {
  const {
    menu,
    clientX,
    clientY,
    draftState,
    json,
    animatorJsonPreview,
    resetAnimatorAssemblyMenu,
    appendAnimatorMenuButtonRow,
    openAnimatorLibraryMenuAt,
    closeAnimatorAssemblyMenu,
    animatorExportButton,
    positionAnimatorAssemblyMenu,
  } = config;
  if (animatorJsonPreview) {
    animatorJsonPreview.textContent = json;
  }
  resetAnimatorAssemblyMenu();
  appendMenuTitle(
    menu,
    "JSON Preview",
    `${draftState.name || "animator scene"} • ${draftState.id || "animator_scene"}`
  );
  appendAnimatorMenuButtonRow(menu, [
    {
      text: "Back",
      onClick: () => {
        openAnimatorLibraryMenuAt(clientX, clientY);
      },
    },
    {
      text: "Export JSON",
      onClick: () => {
        closeAnimatorAssemblyMenu();
        animatorExportButton?.click();
      },
    },
  ]);
  const preview = document.createElement("pre");
  preview.className = "animator-json-preview animator-assembly-menu-json-preview";
  preview.textContent = json;
  menu.appendChild(preview);
  positionAnimatorAssemblyMenu(clientX, clientY, 520, 520);
}

export function buildAnimatorLibraryMenu(config) {
  const {
    menu,
    clientX,
    clientY,
    entries,
    animatorLibrarySelect,
    animatorLibraryLoadButton,
    animatorLibraryDeleteButton,
    animatorLibraryStatus,
    animatorRepoSaveButton,
    animatorLibrarySaveButton,
    animatorExportButton,
    resetAnimatorAssemblyMenu,
    refreshAnimatorLibraryUi,
    appendAnimatorMenuBlock,
    appendAnimatorMenuButtonRow,
    appendAnimatorMenuNote,
    appendAnimatorMenuSelectField,
    closeAnimatorAssemblyMenu,
    openAnimatorJsonPreviewMenuAt,
    positionAnimatorAssemblyMenu,
  } = config;
  resetAnimatorAssemblyMenu();
  refreshAnimatorLibraryUi();
  appendMenuTitle(
    menu,
    "Library",
    entries.length ? `${entries.length} browser draft${entries.length === 1 ? "" : "s"}` : "No browser drafts yet"
  );
  const saveBlock = appendAnimatorMenuBlock(menu, "Save");
  appendAnimatorMenuButtonRow(saveBlock?.block, [
    {
      text: "Save Repo",
      onClick: () => {
        closeAnimatorAssemblyMenu();
        animatorRepoSaveButton?.click();
      },
    },
    {
      text: "Save Library",
      onClick: () => {
        closeAnimatorAssemblyMenu();
        animatorLibrarySaveButton?.click();
      },
    },
  ]);
  appendAnimatorMenuButtonRow(saveBlock?.block, [
    {
      text: "Export JSON",
      onClick: () => {
        closeAnimatorAssemblyMenu();
        animatorExportButton?.click();
      },
    },
    {
      text: "JSON Preview",
      onClick: () => {
        openAnimatorJsonPreviewMenuAt(clientX, clientY);
      },
    },
  ]);
  const libraryBlock = appendAnimatorMenuBlock(menu, "Browser Library");
  if (entries.length) {
    const libraryForm = document.createElement("div");
    libraryForm.className = "animator-form";
    const selectedEntryId = animatorLibrarySelect?.value || entries[0]?.id || "";
    const librarySelectInput = appendAnimatorMenuSelectField(libraryForm, {
      label: "Saved Scenes",
      value: selectedEntryId,
      entries: entries.map((entry) => ({
        value: entry.id,
        label: entry.name || entry.id,
      })),
    });
    libraryBlock?.block?.appendChild(libraryForm);
    appendAnimatorMenuButtonRow(libraryBlock?.block, [
      {
        text: "Load",
        onClick: () => {
          const selectedId = librarySelectInput?.value ?? "";
          if (!selectedId) {
            return;
          }
          if (animatorLibrarySelect) {
            animatorLibrarySelect.value = selectedId;
          }
          closeAnimatorAssemblyMenu();
          animatorLibraryLoadButton?.click();
        },
      },
      {
        text: "Delete",
        className: "animator-assembly-menu-danger",
        onClick: () => {
          const selectedId = librarySelectInput?.value ?? "";
          if (!selectedId) {
            return;
          }
          if (animatorLibrarySelect) {
            animatorLibrarySelect.value = selectedId;
          }
          closeAnimatorAssemblyMenu();
          animatorLibraryDeleteButton?.click();
        },
      },
    ]);
  } else {
    appendAnimatorMenuNote(
      libraryBlock?.block,
      "Save Library keeps a draft in this browser. Save Repo or Export JSON creates a file you can place in the repo."
    );
  }
  appendAnimatorMenuNote(
    libraryBlock?.block,
    animatorLibraryStatus?.textContent ||
      "Library storage is browser-local for now. Save keeps drafts in this browser only."
  );
  positionAnimatorAssemblyMenu(clientX, clientY, 320, entries.length ? 376 : 288);
}
