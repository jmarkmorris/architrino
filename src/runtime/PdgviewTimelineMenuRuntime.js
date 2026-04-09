export function buildPdgviewTimelineMenu(config) {
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
    timeSeconds,
    duration,
    editKind,
    addType,
    timelineMenuWidth,
    pdgviewTimelineAddTypeEntries,
    pdgviewTimelineMinDurationSeconds,
    pdgviewPauseListInput,
    pdgviewWarpListInput,
    resetPdgviewAssemblyMenu,
    positionPdgviewAssemblyMenu,
    appendPdgviewMenuBlock,
    appendPdgviewMenuButtonRow,
    appendPdgviewMenuField,
    appendPdgviewMenuNote,
    appendPdgviewMenuSelectField,
    appendPdgviewAuthoringLine,
    replacePdgviewAuthoringLineById,
    normalizePdgviewTimelineAddType,
    getPdgviewTimelineEditKindTitle,
    formatPdgviewTimeLabel,
    formatPdgviewTimeInputValue,
    clampPdgviewTimelineSpan,
    getPdgviewGraphicOverlayLabel,
    getPdgviewMediaOverlayLabel,
    normalizePdgviewGraphicOverlayDraft,
    getNextPdgviewGraphicOverlayId,
    getPdgviewGraphicDefaultTarget,
    getPdgviewGraphicOverlayDraftIndexById,
    findPdgviewTimelineOverlap,
    showPdgviewStatus,
    upsertPdgviewGraphicOverlayDraft,
    removePdgviewGraphicOverlayDraftById,
    closePdgviewAssemblyMenu,
    renderPdgviewJsonPreview,
    encodePdgviewGraphicTargetValue,
    getPdgviewGraphicTargetEntries,
    decodePdgviewGraphicTargetValue,
    pdgviewMediaAssetDirectories,
    sanitizePdgviewMediaSource,
    getPdgviewMediaDefaultRect,
  } = config;

  resetPdgviewAssemblyMenu("timeline");
  const title = document.createElement("div");
  title.className = "pdgview-assembly-menu-title";
  title.textContent = getPdgviewTimelineEditKindTitle(editKind);
  menu.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = "pdgview-assembly-menu-subtitle";
  subtitle.textContent =
    editKind === "warp"
      ? `Warp ${Number(warp.rate ?? 1).toFixed(2)}x @ ${formatPdgviewTimeLabel(warp.start)}-${formatPdgviewTimeLabel(warp.end)}`
      : editKind === "pause"
        ? `Pause ${formatPdgviewTimeLabel(pause.duration)} @ ${formatPdgviewTimeLabel(pause.start)}`
        : editKind === "graphic" && graphic
          ? `${getPdgviewGraphicOverlayLabel(graphic)} @ ${formatPdgviewTimeLabel(graphic.start)}-${formatPdgviewTimeLabel(graphic.end)}`
          : editKind === "image" && imageOverlay
            ? `${getPdgviewMediaOverlayLabel(imageOverlay)} @ ${formatPdgviewTimeLabel(imageOverlay.start)}-${formatPdgviewTimeLabel(imageOverlay.end)}`
            : editKind === "video" && videoOverlay
              ? `${getPdgviewMediaOverlayLabel(videoOverlay)} @ ${formatPdgviewTimeLabel(videoOverlay.start)}-${formatPdgviewTimeLabel(videoOverlay.end)}`
              : `At ${formatPdgviewTimeLabel(timeSeconds)}`;
  menu.appendChild(subtitle);

  const validationNote = document.createElement("div");
  validationNote.className = "pdgview-field-note is-error";
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
    showPdgviewStatus(message);
  };

  const showTimelineOverlapError = (conflict) => {
    if (!conflict) {
      return;
    }
    showTimelineMenuError(
      `Timeline items may not overlap. ${conflict.label} already occupies ${formatPdgviewTimeLabel(conflict.start)}-${formatPdgviewTimeLabel(conflict.end)}.`
    );
  };

  const appendGraphicBlock = () => {
    const initialGraphicSpan = clampPdgviewTimelineSpan(
      graphic?.start ?? timeSeconds,
      graphic?.end ?? Number(timeSeconds) + pdgviewTimelineMinDurationSeconds,
      duration
    );
    const initialGraphicDraft = normalizePdgviewGraphicOverlayDraft(
      graphic ?? {
        id: getNextPdgviewGraphicOverlayId(),
        start: initialGraphicSpan.start,
        end: initialGraphicSpan.end,
        text: "Text",
        size: 0.42,
        target: getPdgviewGraphicDefaultTarget(),
      },
      Math.max(0, getPdgviewGraphicOverlayDraftIndexById(graphic?.id)),
      duration
    );
    const graphicBlock = appendPdgviewMenuBlock(menu, "Graphic", {
      text: graphic ? "Save" : "Add",
      onClick: () => {
        const graphicStart = Number(graphicStartInput?.value);
        const graphicEnd = Number(graphicEndInput?.value);
        const text =
          String(graphicTextInput?.value ?? "").trim() ||
          String(initialGraphicDraft.text ?? "").trim();
        const size = Number(graphicSizeInput?.value);
        const target = decodePdgviewGraphicTargetValue(graphicTargetInput?.value);
        if (!Number.isFinite(graphicStart) || !Number.isFinite(graphicEnd) || !text || !target || !Number.isFinite(size)) {
          return;
        }
        const span = clampPdgviewTimelineSpan(graphicStart, graphicEnd, duration);
        const overlap = findPdgviewTimelineOverlap(
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
        const nextOverlay = normalizePdgviewGraphicOverlayDraft(
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
          Math.max(0, getPdgviewGraphicOverlayDraftIndexById(graphic?.id)),
          duration
        );
        upsertPdgviewGraphicOverlayDraft(nextOverlay);
        closePdgviewAssemblyMenu();
        renderPdgviewJsonPreview();
      },
    });
    const graphicForm = document.createElement("div");
    graphicForm.className = "pdgview-form pdgview-assembly-menu-grid-2";
    const graphicStartInput = appendPdgviewMenuField(graphicForm, {
      label: "Start (s)",
      type: "number",
      value: formatPdgviewTimeInputValue(initialGraphicSpan.start),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const graphicEndInput = appendPdgviewMenuField(graphicForm, {
      label: "End (s)",
      type: "number",
      value: formatPdgviewTimeInputValue(initialGraphicSpan.end),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const graphicTargetInput = appendPdgviewMenuSelectField(graphicForm, {
      label: "Target",
      value: encodePdgviewGraphicTargetValue(initialGraphicDraft.target),
      entries: getPdgviewGraphicTargetEntries(),
      placeholder: "Select target",
    });
    graphicTargetInput?.closest?.(".pdgview-field")?.classList?.add("pdgview-assembly-menu-grid-span-2");
    const graphicTextInput = appendPdgviewMenuField(graphicForm, {
      label: "Text",
      value: "",
      placeholder: initialGraphicDraft.text || "Graphic text",
    });
    graphicTextInput?.closest?.(".pdgview-field")?.classList?.add("pdgview-assembly-menu-grid-span-2");
    const graphicSizeInput = appendPdgviewMenuField(graphicForm, {
      label: "Size",
      type: "number",
      value: initialGraphicDraft.size,
      step: 0.05,
      min: 0.18,
    });
    graphicBlock?.block?.appendChild(graphicForm);
    appendPdgviewMenuNote(graphicBlock?.block, "Drag the text to place it. Edit size here when needed.");
    if (graphic?.id) {
      appendPdgviewMenuButtonRow(graphicBlock?.block, [
        {
          text: "Remove Graphic",
          className: "pdgview-assembly-menu-danger",
          onClick: () => {
            removePdgviewGraphicOverlayDraftById(graphic.id);
            closePdgviewAssemblyMenu();
            renderPdgviewJsonPreview();
          },
        },
      ]);
    }
  };

  const appendMediaBlock = (kind) => {
    const currentOverlay = kind === "image" ? imageOverlay : videoOverlay;
    const initialSpan = clampPdgviewTimelineSpan(
      currentOverlay?.start ?? timeSeconds,
      currentOverlay?.end ?? Number(timeSeconds) + pdgviewTimelineMinDurationSeconds,
      duration
    );
    const initialDraft = normalizePdgviewGraphicOverlayDraft(
      currentOverlay ?? {
        id: getNextPdgviewGraphicOverlayId(),
        kind,
        start: initialSpan.start,
        end: initialSpan.end,
        source: "",
        rect: getPdgviewMediaDefaultRect(kind),
      },
      Math.max(0, getPdgviewGraphicOverlayDraftIndexById(currentOverlay?.id)),
      duration
    );
    const mediaBlock = appendPdgviewMenuBlock(menu, kind === "image" ? "Image" : "Video", {
      text: currentOverlay ? "Save" : "Add",
      onClick: () => {
        const start = Number(mediaStartInput?.value);
        const end = Number(mediaEndInput?.value);
        const source = sanitizePdgviewMediaSource(
          String(mediaSourceInput?.value ?? "").trim() || initialDraft.source,
          kind
        );
        if (!Number.isFinite(start) || !Number.isFinite(end) || !source) {
          return;
        }
        const span = clampPdgviewTimelineSpan(start, end, duration);
        const overlap = findPdgviewTimelineOverlap(
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
        const nextOverlay = normalizePdgviewGraphicOverlayDraft(
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
          Math.max(0, getPdgviewGraphicOverlayDraftIndexById(currentOverlay?.id)),
          duration
        );
        upsertPdgviewGraphicOverlayDraft(nextOverlay);
        closePdgviewAssemblyMenu();
        renderPdgviewJsonPreview();
      },
    });
    const mediaForm = document.createElement("div");
    mediaForm.className = "pdgview-form pdgview-assembly-menu-grid-2";
    const mediaStartInput = appendPdgviewMenuField(mediaForm, {
      label: "Start (s)",
      type: "number",
      value: formatPdgviewTimeInputValue(initialSpan.start),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const mediaEndInput = appendPdgviewMenuField(mediaForm, {
      label: "End (s)",
      type: "number",
      value: formatPdgviewTimeInputValue(initialSpan.end),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const mediaSourceInput = appendPdgviewMenuField(mediaForm, {
      label: "Asset Path",
      value: "",
      placeholder: initialDraft.source || pdgviewMediaAssetDirectories[kind],
    });
    mediaSourceInput?.closest?.(".pdgview-field")?.classList?.add("pdgview-assembly-menu-grid-span-2");
    mediaBlock?.block?.appendChild(mediaForm);
    appendPdgviewMenuNote(
      mediaBlock?.block,
      `Use ${pdgviewMediaAssetDirectories[kind]}. Drag the rectangle to place it, and drag the corner to resize it.`
    );
    if (currentOverlay?.id) {
      appendPdgviewMenuButtonRow(mediaBlock?.block, [
        {
          text: `Remove ${kind === "image" ? "Image" : "Video"}`,
          className: "pdgview-assembly-menu-danger",
          onClick: () => {
            removePdgviewGraphicOverlayDraftById(currentOverlay.id);
            closePdgviewAssemblyMenu();
            renderPdgviewJsonPreview();
          },
        },
      ]);
    }
  };

  const appendPauseBlock = () => {
    const initialPauseSpan = clampPdgviewTimelineSpan(
      pause?.start ?? timeSeconds,
      Number(pause?.start ?? timeSeconds) + Number(pause?.duration ?? pdgviewTimelineMinDurationSeconds),
      duration
    );
    const pauseBlock = appendPdgviewMenuBlock(menu, "Pause", {
      text: pause ? "Save" : "Add",
      onClick: () => {
        const start = Number(pauseStartInput?.value);
        const pauseDuration = Number(pauseDurationInput?.value);
        if (!Number.isFinite(start) || !Number.isFinite(pauseDuration) || pauseDuration <= 0) {
          return;
        }
        const span = clampPdgviewTimelineSpan(start, start + pauseDuration, duration);
        const pauseIdForSave = pause?.id ?? "";
        const overlap = findPdgviewTimelineOverlap(
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
        const current = pdgviewPauseListInput?.value ?? "";
        if (pdgviewPauseListInput) {
          pdgviewPauseListInput.value = pause?.id
            ? replacePdgviewAuthoringLineById(current, pause.id, nextLine)
            : appendPdgviewAuthoringLine(current, nextLine);
        }
        closePdgviewAssemblyMenu();
        renderPdgviewJsonPreview();
      },
    });
    const pauseForm = document.createElement("div");
    pauseForm.className = "pdgview-form pdgview-assembly-menu-grid-2";
    const pauseStartInput = appendPdgviewMenuField(pauseForm, {
      label: "Start (s)",
      type: "number",
      value: formatPdgviewTimeInputValue(initialPauseSpan.start),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const pauseDurationInput = appendPdgviewMenuField(pauseForm, {
      label: "Duration (s)",
      type: "number",
      value: formatPdgviewTimeInputValue(initialPauseSpan.span),
      step: 0.1,
      min: pdgviewTimelineMinDurationSeconds,
      selectOnFocus: true,
    });
    pauseBlock?.block?.appendChild(pauseForm);
    if (pause?.id) {
      appendPdgviewMenuButtonRow(pauseBlock?.block, [
        {
          text: "Remove Pause",
          className: "pdgview-assembly-menu-danger",
          onClick: () => {
            if (pdgviewPauseListInput) {
              pdgviewPauseListInput.value = replacePdgviewAuthoringLineById(
                pdgviewPauseListInput.value,
                pause.id,
                null
              );
            }
            closePdgviewAssemblyMenu();
            renderPdgviewJsonPreview();
          },
        },
      ]);
    }
  };

  const appendWarpBlock = () => {
    const initialWarpSpan = clampPdgviewTimelineSpan(
      warp?.start ?? timeSeconds,
      warp?.end ?? Number(timeSeconds) + pdgviewTimelineMinDurationSeconds,
      duration
    );
    const warpBlock = appendPdgviewMenuBlock(menu, "Warp", {
      text: warp ? "Save" : "Add",
      onClick: () => {
        const start = Number(warpStartInput?.value);
        const end = Number(warpEndInput?.value);
        const rate = Number(warpRateInput?.value);
        if (!Number.isFinite(start) || !Number.isFinite(end) || !Number.isFinite(rate) || rate <= 0) {
          return;
        }
        const span = clampPdgviewTimelineSpan(start, end, duration);
        const warpIdForSave = warp?.id ?? "";
        const overlap = findPdgviewTimelineOverlap(
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
        const current = pdgviewWarpListInput?.value ?? "";
        if (pdgviewWarpListInput) {
          pdgviewWarpListInput.value = warp?.id
            ? replacePdgviewAuthoringLineById(current, warp.id, nextLine)
            : appendPdgviewAuthoringLine(current, nextLine);
        }
        closePdgviewAssemblyMenu();
        renderPdgviewJsonPreview();
      },
    });
    const warpForm = document.createElement("div");
    warpForm.className = "pdgview-form pdgview-assembly-menu-grid-2";
    const warpStartInput = appendPdgviewMenuField(warpForm, {
      label: "Start (s)",
      type: "number",
      value: formatPdgviewTimeInputValue(initialWarpSpan.start),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const warpEndInput = appendPdgviewMenuField(warpForm, {
      label: "End (s)",
      type: "number",
      value: formatPdgviewTimeInputValue(initialWarpSpan.end),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const warpRateInput = appendPdgviewMenuField(warpForm, {
      label: "Rate",
      type: "number",
      value: Number((warp?.rate ?? 0.5).toFixed(3)),
      step: 0.1,
      min: 0.001,
    });
    warpRateInput?.closest?.(".pdgview-field")?.classList?.add("pdgview-assembly-menu-grid-span-2");
    warpBlock?.block?.appendChild(warpForm);
    if (warp?.id) {
      appendPdgviewMenuButtonRow(warpBlock?.block, [
        {
          text: "Remove Warp",
          className: "pdgview-assembly-menu-danger",
          onClick: () => {
            if (pdgviewWarpListInput) {
              pdgviewWarpListInput.value = replacePdgviewAuthoringLineById(
                pdgviewWarpListInput.value,
                warp.id,
                null
              );
            }
            closePdgviewAssemblyMenu();
            renderPdgviewJsonPreview();
          },
        },
      ]);
    }
  };

  const appendPlaceholderBlock = (blockTitle, notes = []) => {
    const block = appendPdgviewMenuBlock(menu, blockTitle, null);
    notes.forEach((entry) => appendPdgviewMenuNote(block?.block, entry));
  };

  if (editKind === "add") {
    const orbGrid = document.createElement("div");
    orbGrid.className = "pdgview-assembly-menu-orb-grid";
    pdgviewTimelineAddTypeEntries.forEach((item) => {
      const orb = document.createElement("button");
      orb.type = "button";
      orb.className = "pdgview-assembly-menu-orb";
      orb.dataset.timelineType = item.id;
      if (item.id === addType) {
        orb.classList.add("is-active");
      }
      orb.textContent = item.label;
      orb.addEventListener("click", () => {
        buildPdgviewTimelineMenu({
          ...config,
          addType: normalizePdgviewTimelineAddType(item.id),
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
  }

  positionPdgviewAssemblyMenu(
    clientX,
    clientY,
    timelineMenuWidth,
    (
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
