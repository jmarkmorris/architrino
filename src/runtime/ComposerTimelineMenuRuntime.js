export function buildComposerTimelineMenu(config) {
  const {
    menu,
    clientX,
    clientY,
    documentData,
    graphic,
    imageOverlay,
    videoOverlay,
    pause,
    warp,
    reaction,
    timeSeconds,
    duration,
    editKind,
    addType,
    timelineMenuWidth,
    composerTimelineAddTypeEntries,
    composerTimelineMinDurationSeconds,
    composerPauseListInput,
    composerWarpListInput,
    resetComposerAssemblyMenu,
    positionComposerAssemblyMenu,
    appendComposerMenuBlock,
    appendComposerMenuButtonRow,
    appendComposerMenuField,
    appendComposerMenuNote,
    appendComposerMenuSelectField,
    normalizeComposerTimelineAddType,
    getComposerTimelineEditKindTitle,
    formatComposerTimeLabel,
    formatComposerTimeInputValue,
    clampComposerTimelineSpan,
    getComposerGraphicOverlayLabel,
    getComposerMediaOverlayLabel,
    normalizeComposerGraphicOverlayDraft,
    getNextComposerGraphicOverlayId,
    getComposerGraphicDefaultTarget,
    getComposerGraphicOverlayDraftIndexById,
    findComposerTimelineOverlap,
    showComposerStatus,
    composerGraphicOverlayDrafts,
    closeComposerAssemblyMenu,
    renderComposerJsonPreview,
    encodeComposerGraphicTargetValue,
    getComposerGraphicTargetEntries,
    decodeComposerGraphicTargetValue,
    composerMediaAssetDirectories,
    sanitizeComposerMediaSource,
    getComposerMediaDefaultRect,
    replaceComposerAuthoringLineById,
    appendComposerAuthoringLine,
    getComposerReactionListRaw,
    setComposerReactionListRaw,
    buildComposerReactionActionString,
    ensureComposerAssemblyDraftsForReactionUi,
    getComposerReactionStageDrafts,
    getComposerReactionActionOptions,
  } = config;

  resetComposerAssemblyMenu("timeline");
  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = getComposerTimelineEditKindTitle(editKind);
  menu.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = "composer-assembly-menu-subtitle";
  subtitle.textContent =
    editKind === "reaction"
      ? `${reaction.label ?? reaction.id ?? "Reaction"} @ ${formatComposerTimeLabel(reaction.start)}-${formatComposerTimeLabel(reaction.end)}`
      : editKind === "warp"
        ? `Warp ${Number(warp.rate ?? 1).toFixed(2)}x @ ${formatComposerTimeLabel(warp.start)}-${formatComposerTimeLabel(warp.end)}`
        : editKind === "pause"
          ? `Pause ${formatComposerTimeLabel(pause.duration)} @ ${formatComposerTimeLabel(pause.start)}`
          : editKind === "graphic" && graphic
            ? `${getComposerGraphicOverlayLabel(graphic)} @ ${formatComposerTimeLabel(graphic.start)}-${formatComposerTimeLabel(graphic.end)}`
            : editKind === "image" && imageOverlay
              ? `${getComposerMediaOverlayLabel(imageOverlay)} @ ${formatComposerTimeLabel(imageOverlay.start)}-${formatComposerTimeLabel(imageOverlay.end)}`
              : editKind === "video" && videoOverlay
                ? `${getComposerMediaOverlayLabel(videoOverlay)} @ ${formatComposerTimeLabel(videoOverlay.start)}-${formatComposerTimeLabel(videoOverlay.end)}`
                : `At ${formatComposerTimeLabel(timeSeconds)}`;
  menu.appendChild(subtitle);

  const validationNote = document.createElement("div");
  validationNote.className = "composer-field-note is-error";
  validationNote.hidden = true;
  menu.appendChild(validationNote);

  const showTimelineMenuError = (message) => {
    if (!message) {
      validationNote.hidden = true;
      validationNote.textContent = "";
      return;
    }
    validationNote.hidden = false;
    validationNote.textContent = message;
    showComposerStatus(message);
  };

  const showTimelineOverlapError = (conflict) => {
    if (!conflict) {
      return;
    }
    showTimelineMenuError(
      `Timeline items may not overlap. ${conflict.label} already occupies ${formatComposerTimeLabel(conflict.start)}-${formatComposerTimeLabel(conflict.end)}.`
    );
  };

  const appendGraphicBlock = () => {
    const initialGraphicSpan = clampComposerTimelineSpan(
      graphic?.start ?? timeSeconds,
      graphic?.end ?? Number(timeSeconds) + composerTimelineMinDurationSeconds,
      duration
    );
    const initialGraphicDraft = normalizeComposerGraphicOverlayDraft(
      graphic ?? {
        id: getNextComposerGraphicOverlayId(),
        start: initialGraphicSpan.start,
        end: initialGraphicSpan.end,
        text: "Text",
        size: 0.42,
        target: getComposerGraphicDefaultTarget(),
      },
      Math.max(0, getComposerGraphicOverlayDraftIndexById(graphic?.id)),
      duration
    );
    const graphicBlock = appendComposerMenuBlock(menu, "Graphic", {
      text: graphic ? "Save" : "Add",
      onClick: () => {
        const graphicStart = Number(graphicStartInput?.value);
        const graphicEnd = Number(graphicEndInput?.value);
        const text = String(graphicTextInput?.value ?? "").trim();
        const size = Number(graphicSizeInput?.value);
        const target = decodeComposerGraphicTargetValue(graphicTargetInput?.value);
        if (!Number.isFinite(graphicStart) || !Number.isFinite(graphicEnd) || !text || !target || !Number.isFinite(size)) {
          return;
        }
        const span = clampComposerTimelineSpan(graphicStart, graphicEnd, duration);
        const overlap = findComposerTimelineOverlap(
          {
            id: graphic?.id ?? initialGraphicDraft.id,
            kind: "graphic",
            start: span.start,
            end: span.end,
          },
          {
            excludeId: graphic?.id ?? initialGraphicDraft.id,
            documentData,
          }
        );
        if (overlap) {
          showTimelineOverlapError(overlap);
          return;
        }
        const nextOverlay = normalizeComposerGraphicOverlayDraft(
          {
            ...(graphic ?? initialGraphicDraft),
            id: graphic?.id ?? initialGraphicDraft.id,
            start: span.start,
            end: span.end,
            text,
            label: text,
            size,
            target,
            offset: graphic?.offset ?? initialGraphicDraft.offset,
          },
          Math.max(0, getComposerGraphicOverlayDraftIndexById(graphic?.id)),
          duration
        );
        const existingIndex = getComposerGraphicOverlayDraftIndexById(nextOverlay.id);
        if (existingIndex >= 0) {
          composerGraphicOverlayDrafts[existingIndex] = nextOverlay;
        } else {
          composerGraphicOverlayDrafts.push(nextOverlay);
        }
        closeComposerAssemblyMenu();
        renderComposerJsonPreview();
      },
    });
    const graphicForm = document.createElement("div");
    graphicForm.className = "composer-form composer-assembly-menu-grid-2";
    const graphicStartInput = appendComposerMenuField(graphicForm, {
      label: "Start (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialGraphicSpan.start),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const graphicEndInput = appendComposerMenuField(graphicForm, {
      label: "End (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialGraphicSpan.end),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const graphicTargetInput = appendComposerMenuSelectField(graphicForm, {
      label: "Target",
      value: encodeComposerGraphicTargetValue(initialGraphicDraft.target),
      entries: getComposerGraphicTargetEntries(),
      placeholder: "Select target",
    });
    graphicTargetInput?.closest?.(".composer-field")?.classList?.add("composer-assembly-menu-grid-span-2");
    const graphicTextInput = appendComposerMenuField(graphicForm, {
      label: "Text",
      value: initialGraphicDraft.text,
      placeholder: "Graphic text",
    });
    graphicTextInput?.closest?.(".composer-field")?.classList?.add("composer-assembly-menu-grid-span-2");
    const graphicSizeInput = appendComposerMenuField(graphicForm, {
      label: "Size",
      type: "number",
      value: initialGraphicDraft.size,
      step: 0.05,
      min: 0.18,
    });
    graphicBlock?.block?.appendChild(graphicForm);
    appendComposerMenuNote(graphicBlock?.block, "Drag the text to place it. Edit size here when needed.");
    if (graphic?.id) {
      appendComposerMenuButtonRow(graphicBlock?.block, [
        {
          text: "Remove Graphic",
          className: "composer-assembly-menu-danger",
          onClick: () => {
            const overlayIndex = getComposerGraphicOverlayDraftIndexById(graphic.id);
            if (overlayIndex >= 0) {
              composerGraphicOverlayDrafts.splice(overlayIndex, 1);
            }
            closeComposerAssemblyMenu();
            renderComposerJsonPreview();
          },
        },
      ]);
    }
  };

  const appendMediaBlock = (kind) => {
    const currentOverlay = kind === "image" ? imageOverlay : videoOverlay;
    const initialSpan = clampComposerTimelineSpan(
      currentOverlay?.start ?? timeSeconds,
      currentOverlay?.end ?? Number(timeSeconds) + composerTimelineMinDurationSeconds,
      duration
    );
    const initialDraft = normalizeComposerGraphicOverlayDraft(
      currentOverlay ?? {
        id: getNextComposerGraphicOverlayId(),
        kind,
        start: initialSpan.start,
        end: initialSpan.end,
        source: "",
        rect: getComposerMediaDefaultRect(kind),
      },
      Math.max(0, getComposerGraphicOverlayDraftIndexById(currentOverlay?.id)),
      duration
    );
    const mediaBlock = appendComposerMenuBlock(menu, kind === "image" ? "Image" : "Video", {
      text: currentOverlay ? "Save" : "Add",
      onClick: () => {
        const start = Number(mediaStartInput?.value);
        const end = Number(mediaEndInput?.value);
        const source = sanitizeComposerMediaSource(mediaSourceInput?.value, kind);
        if (!Number.isFinite(start) || !Number.isFinite(end) || !source) {
          return;
        }
        const span = clampComposerTimelineSpan(start, end, duration);
        const overlap = findComposerTimelineOverlap(
          {
            id: currentOverlay?.id ?? initialDraft.id,
            kind,
            start: span.start,
            end: span.end,
          },
          {
            excludeId: currentOverlay?.id ?? initialDraft.id,
            documentData,
          }
        );
        if (overlap) {
          showTimelineOverlapError(overlap);
          return;
        }
        const nextOverlay = normalizeComposerGraphicOverlayDraft(
          {
            ...(currentOverlay ?? initialDraft),
            id: currentOverlay?.id ?? initialDraft.id,
            kind,
            start: span.start,
            end: span.end,
            source,
            label: source.split("/").pop() ?? (kind === "image" ? "Image" : "Video"),
            rect: currentOverlay?.rect ?? initialDraft.rect,
          },
          Math.max(0, getComposerGraphicOverlayDraftIndexById(currentOverlay?.id)),
          duration
        );
        const existingIndex = getComposerGraphicOverlayDraftIndexById(nextOverlay.id);
        if (existingIndex >= 0) {
          composerGraphicOverlayDrafts[existingIndex] = nextOverlay;
        } else {
          composerGraphicOverlayDrafts.push(nextOverlay);
        }
        closeComposerAssemblyMenu();
        renderComposerJsonPreview();
      },
    });
    const mediaForm = document.createElement("div");
    mediaForm.className = "composer-form composer-assembly-menu-grid-2";
    const mediaStartInput = appendComposerMenuField(mediaForm, {
      label: "Start (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialSpan.start),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const mediaEndInput = appendComposerMenuField(mediaForm, {
      label: "End (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialSpan.end),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const mediaSourceInput = appendComposerMenuField(mediaForm, {
      label: "Asset Path",
      value: initialDraft.source,
      placeholder: composerMediaAssetDirectories[kind],
    });
    mediaSourceInput?.closest?.(".composer-field")?.classList?.add("composer-assembly-menu-grid-span-2");
    mediaBlock?.block?.appendChild(mediaForm);
    appendComposerMenuNote(
      mediaBlock?.block,
      `Use ${composerMediaAssetDirectories[kind]}. Drag the rectangle to place it, and drag the corner to resize it.`
    );
    if (currentOverlay?.id) {
      appendComposerMenuButtonRow(mediaBlock?.block, [
        {
          text: `Remove ${kind === "image" ? "Image" : "Video"}`,
          className: "composer-assembly-menu-danger",
          onClick: () => {
            const overlayIndex = getComposerGraphicOverlayDraftIndexById(currentOverlay.id);
            if (overlayIndex >= 0) {
              composerGraphicOverlayDrafts.splice(overlayIndex, 1);
            }
            closeComposerAssemblyMenu();
            renderComposerJsonPreview();
          },
        },
      ]);
    }
  };

  const appendPauseBlock = () => {
    const initialPauseSpan = clampComposerTimelineSpan(
      pause?.start ?? timeSeconds,
      Number(pause?.start ?? timeSeconds) + Number(pause?.duration ?? composerTimelineMinDurationSeconds),
      duration
    );
    const pauseBlock = appendComposerMenuBlock(menu, "Pause", {
      text: pause ? "Save" : "Add",
      onClick: () => {
        const start = Number(pauseStartInput?.value);
        const pauseDuration = Number(pauseDurationInput?.value);
        if (!Number.isFinite(start) || !Number.isFinite(pauseDuration) || pauseDuration <= 0) {
          return;
        }
        const span = clampComposerTimelineSpan(start, start + pauseDuration, duration);
        const pauseIdForSave = pause?.id ?? "";
        const overlap = findComposerTimelineOverlap(
          {
            id: pauseIdForSave,
            kind: "pause",
            start: span.start,
            end: span.end,
          },
          {
            excludeId: pauseIdForSave,
            documentData,
          }
        );
        if (overlap) {
          showTimelineOverlapError(overlap);
          return;
        }
        const nextLine = `${span.start}, ${span.span}`;
        const current = composerPauseListInput?.value ?? "";
        if (composerPauseListInput) {
          composerPauseListInput.value = pause?.id
            ? replaceComposerAuthoringLineById(current, pause.id, nextLine)
            : appendComposerAuthoringLine(current, nextLine);
        }
        closeComposerAssemblyMenu();
        renderComposerJsonPreview();
      },
    });
    const pauseForm = document.createElement("div");
    pauseForm.className = "composer-form composer-assembly-menu-grid-2";
    const pauseStartInput = appendComposerMenuField(pauseForm, {
      label: "Start (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialPauseSpan.start),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const pauseDurationInput = appendComposerMenuField(pauseForm, {
      label: "Duration (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialPauseSpan.span),
      step: 0.1,
      min: composerTimelineMinDurationSeconds,
      selectOnFocus: true,
    });
    pauseBlock?.block?.appendChild(pauseForm);
    if (pause?.id) {
      appendComposerMenuButtonRow(pauseBlock?.block, [
        {
          text: "Remove Pause",
          className: "composer-assembly-menu-danger",
          onClick: () => {
            if (composerPauseListInput) {
              composerPauseListInput.value = replaceComposerAuthoringLineById(
                composerPauseListInput.value,
                pause.id,
                null
              );
            }
            closeComposerAssemblyMenu();
            renderComposerJsonPreview();
          },
        },
      ]);
    }
  };

  const appendWarpBlock = () => {
    const initialWarpSpan = clampComposerTimelineSpan(
      warp?.start ?? timeSeconds,
      warp?.end ?? Number(timeSeconds) + composerTimelineMinDurationSeconds,
      duration
    );
    const warpBlock = appendComposerMenuBlock(menu, "Warp", {
      text: warp ? "Save" : "Add",
      onClick: () => {
        const start = Number(warpStartInput?.value);
        const end = Number(warpEndInput?.value);
        const rate = Number(warpRateInput?.value);
        if (!Number.isFinite(start) || !Number.isFinite(end) || !Number.isFinite(rate) || rate <= 0) {
          return;
        }
        const span = clampComposerTimelineSpan(start, end, duration);
        const warpIdForSave = warp?.id ?? "";
        const overlap = findComposerTimelineOverlap(
          {
            id: warpIdForSave,
            kind: "warp",
            start: span.start,
            end: span.end,
          },
          {
            excludeId: warpIdForSave,
            documentData,
          }
        );
        if (overlap) {
          showTimelineOverlapError(overlap);
          return;
        }
        const nextLine = `${span.start}, ${span.end}, ${Number(rate.toFixed(3))}`;
        const current = composerWarpListInput?.value ?? "";
        if (composerWarpListInput) {
          composerWarpListInput.value = warp?.id
            ? replaceComposerAuthoringLineById(current, warp.id, nextLine)
            : appendComposerAuthoringLine(current, nextLine);
        }
        closeComposerAssemblyMenu();
        renderComposerJsonPreview();
      },
    });
    const warpForm = document.createElement("div");
    warpForm.className = "composer-form composer-assembly-menu-grid-2";
    const warpStartInput = appendComposerMenuField(warpForm, {
      label: "Start (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialWarpSpan.start),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const warpEndInput = appendComposerMenuField(warpForm, {
      label: "End (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialWarpSpan.end),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const warpRateInput = appendComposerMenuField(warpForm, {
      label: "Rate",
      type: "number",
      value: Number((warp?.rate ?? 0.5).toFixed(3)),
      step: 0.1,
      min: 0.001,
    });
    warpRateInput?.closest?.(".composer-field")?.classList?.add("composer-assembly-menu-grid-span-2");
    warpBlock?.block?.appendChild(warpForm);
    if (warp?.id) {
      appendComposerMenuButtonRow(warpBlock?.block, [
        {
          text: "Remove Warp",
          className: "composer-assembly-menu-danger",
          onClick: () => {
            if (composerWarpListInput) {
              composerWarpListInput.value = replaceComposerAuthoringLineById(
                composerWarpListInput.value,
                warp.id,
                null
              );
            }
            closeComposerAssemblyMenu();
            renderComposerJsonPreview();
          },
        },
      ]);
    }
  };

  const appendReactionBlock = () => {
    const initialReactionSpan = clampComposerTimelineSpan(
      reaction?.start ?? timeSeconds,
      reaction?.end ?? Number(timeSeconds) + composerTimelineMinDurationSeconds,
      duration
    );
    const reactionAssemblies = ensureComposerAssemblyDraftsForReactionUi();
    const reactionStageDrafts = getComposerReactionStageDrafts(reaction);
    const reactionBlock = appendComposerMenuBlock(menu, "Reaction", {
      text: reaction ? "Save" : "Add",
      onClick: () => {
        const label = String(reactionLabelInput?.value ?? "").trim();
        const start = Number(reactionStartInput?.value);
        const end = Number(reactionEndInput?.value);
        const actions = buildComposerReactionActionString(reactionStageDrafts);
        if (!label || !Number.isFinite(start) || !Number.isFinite(end)) {
          showTimelineMenuError("Reaction needs a label and a valid span.");
          return;
        }
        if (!actions) {
          showTimelineMenuError("Add at least one valid reaction stage before saving.");
          return;
        }
        const span = clampComposerTimelineSpan(start, end, duration);
        const reactionIdForSave = reaction?.id ?? "";
        const overlap = findComposerTimelineOverlap(
          {
            id: reactionIdForSave,
            kind: "reaction",
            start: span.start,
            end: span.end,
          },
          {
            excludeId: reactionIdForSave,
            documentData,
          }
        );
        if (overlap) {
          showTimelineOverlapError(overlap);
          return;
        }
        const nextLine = `${label} @ ${span.start}-${span.end}${actions ? ` | ${actions}` : ""}`;
        setComposerReactionListRaw(
          reaction?.id
            ? replaceComposerAuthoringLineById(getComposerReactionListRaw(), reaction.id, nextLine)
            : appendComposerAuthoringLine(getComposerReactionListRaw(), nextLine)
        );
        closeComposerAssemblyMenu();
        renderComposerJsonPreview();
      },
    });
    const reactionForm = document.createElement("div");
    reactionForm.className = "composer-form composer-assembly-menu-grid-2";
    const reactionLabelInput = appendComposerMenuField(reactionForm, {
      label: "Label",
      value: reaction?.label ?? "reaction",
    });
    const reactionStartInput = appendComposerMenuField(reactionForm, {
      label: "Start (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialReactionSpan.start),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const reactionEndInput = appendComposerMenuField(reactionForm, {
      label: "End (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialReactionSpan.end),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    reactionBlock?.block?.appendChild(reactionForm);
    if (reactionAssemblies.reactants.length || reactionAssemblies.products.length) {
      appendComposerMenuNote(
        reactionBlock?.block,
        `Canvas participants: ${reactionAssemblies.reactants.length ? `Reactants ${reactionAssemblies.reactants.join(", ")}` : "No reactants"} · ${
          reactionAssemblies.products.length ? `Products ${reactionAssemblies.products.join(", ")}` : "No products"
        }`
      );
    } else {
      appendComposerMenuNote(
        reactionBlock?.block,
        "No canvas participants are tagged yet. Add reactants and products on the canvas to prepare for visual reaction mapping."
      );
    }
    appendComposerMenuNote(
      reactionBlock?.block,
      "Stage timing is divided evenly across the reaction span for now. Visual source-to-destination mapping still needs to replace typed transfer authoring."
    );
    const stageList = document.createElement("div");
    stageList.className = "composer-reaction-stage-list";
    const reactionActionOptions = getComposerReactionActionOptions();
    const renderReactionStageRows = () => {
      stageList.innerHTML = "";
      reactionStageDrafts.forEach((stageDraft, index) => {
        const stageRow = document.createElement("div");
        stageRow.className = "composer-reaction-stage-row";
        const stageHeader = document.createElement("div");
        stageHeader.className = "composer-reaction-stage-header";
        stageHeader.textContent = `Stage ${index + 1}`;
        stageRow.appendChild(stageHeader);
        const stageForm = document.createElement("div");
        stageForm.className = "composer-form composer-assembly-menu-grid-2";
        const actionInput = appendComposerMenuSelectField(stageForm, {
          label: "Action",
          value: stageDraft.action,
          entries: reactionActionOptions,
        });
        stageRow.appendChild(stageForm);
        appendComposerMenuButtonRow(stageRow, [
          {
            text: "Remove",
            className: "composer-assembly-menu-danger",
            disabled: reactionStageDrafts.length <= 1,
            onClick: () => {
              if (reactionStageDrafts.length <= 1) {
                return;
              }
              reactionStageDrafts.splice(index, 1);
              renderReactionStageRows();
            },
          },
          null,
        ]);
        actionInput?.addEventListener("change", () => {
          stageDraft.action = actionInput.value;
        });
        stageList.appendChild(stageRow);
      });
    };
    const stageActionsBlock = appendComposerMenuBlock(reactionBlock?.block, "Stages", {
      text: "Add Stage",
      onClick: () => {
        reactionStageDrafts.push({
          action: "mapping",
          transferRefs: "",
        });
        renderReactionStageRows();
      },
    });
    stageActionsBlock?.block?.appendChild(stageList);
    renderReactionStageRows();
    if (reaction?.id) {
      appendComposerMenuButtonRow(reactionBlock?.block, [
        {
          text: "Remove Reaction",
          className: "composer-assembly-menu-danger",
          onClick: () => {
            setComposerReactionListRaw(
              replaceComposerAuthoringLineById(getComposerReactionListRaw(), reaction.id, null)
            );
            closeComposerAssemblyMenu();
            renderComposerJsonPreview();
          },
        },
      ]);
    }
  };

  const appendPlaceholderBlock = (blockTitle, notes = []) => {
    const block = appendComposerMenuBlock(menu, blockTitle, null);
    notes.forEach((entry) => appendComposerMenuNote(block?.block, entry));
  };

  if (editKind === "add") {
    const orbGrid = document.createElement("div");
    orbGrid.className = "composer-assembly-menu-orb-grid";
    composerTimelineAddTypeEntries.forEach((item) => {
      const orb = document.createElement("button");
      orb.type = "button";
      orb.className = "composer-assembly-menu-orb";
      orb.dataset.timelineType = item.id;
      if (item.id === addType) {
        orb.classList.add("is-active");
      }
      orb.textContent = item.label;
      orb.addEventListener("click", () => {
        buildComposerTimelineMenu({
          ...config,
          addType: normalizeComposerTimelineAddType(item.id),
        });
      });
      orbGrid.appendChild(orb);
    });
    menu.appendChild(orbGrid);
    if (addType === "graphic") {
      appendGraphicBlock();
    } else if (addType === "image") {
      appendMediaBlock("image");
    } else if (addType === "video") {
      appendMediaBlock("video");
    } else if (addType === "pause") {
      appendPauseBlock();
    } else if (addType === "warp") {
      appendWarpBlock();
    } else if (addType === "reaction") {
      appendReactionBlock();
    } else if (addType === "audio") {
      appendPlaceholderBlock("Audio", [
        "Planned for narration, accent sounds, and level automation on the shared scene timeline.",
      ]);
    } else if (addType === "camera") {
      appendPlaceholderBlock("Observer", [
        "Observer intervals need to coordinate the design viewport, observer framing, and the authored observer path.",
        "The first pass for that shared viewport design is being captured in viewports.md.",
      ]);
    }
  } else if (editKind === "graphic") {
    appendGraphicBlock();
  } else if (editKind === "image") {
    appendMediaBlock("image");
  } else if (editKind === "video") {
    appendMediaBlock("video");
  } else if (editKind === "pause") {
    appendPauseBlock();
  } else if (editKind === "warp") {
    appendWarpBlock();
  } else {
    appendReactionBlock();
  }

  positionComposerAssemblyMenu(
    clientX,
    clientY,
    timelineMenuWidth,
    editKind === "reaction" || (editKind === "add" && addType === "reaction")
      ? 432
      : (
          editKind === "graphic" ||
          editKind === "image" ||
          editKind === "video" ||
          (editKind === "add" && (addType === "graphic" || addType === "image" || addType === "video"))
        )
        ? 392
        : editKind === "add"
          ? 332
          : 268
  );
}
