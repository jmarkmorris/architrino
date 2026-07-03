export function buildAnimatorTimelineMenu(config) {
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
    animatorTimelineAddTypeEntries,
    animatorTimelineMinDurationSeconds,
    animatorPauseListInput,
    animatorWarpListInput,
    resetAnimatorAssemblyMenu,
    positionAnimatorAssemblyMenu,
    appendAnimatorMenuBlock,
    appendAnimatorMenuButtonRow,
    appendAnimatorMenuField,
    appendAnimatorMenuNote,
    appendAnimatorMenuSelectField,
    appendAnimatorAuthoringLine,
    replaceAnimatorAuthoringLineById,
    normalizeAnimatorTimelineAddType,
    getAnimatorTimelineEditKindTitle,
    formatAnimatorTimeLabel,
    formatAnimatorTimeInputValue,
    clampAnimatorTimelineSpan,
    getAnimatorGraphicOverlayLabel,
    getAnimatorMediaOverlayLabel,
    normalizeAnimatorGraphicOverlayDraft,
    getNextAnimatorGraphicOverlayId,
    getAnimatorGraphicDefaultTarget,
    getAnimatorGraphicOverlayDraftIndexById,
    findAnimatorTimelineOverlap,
    showAnimatorStatus,
    upsertAnimatorGraphicOverlayDraft,
    removeAnimatorGraphicOverlayDraftById,
    closeAnimatorAssemblyMenu,
    renderAnimatorJsonPreview,
    encodeAnimatorGraphicTargetValue,
    getAnimatorGraphicTargetEntries,
    decodeAnimatorGraphicTargetValue,
    animatorMediaAssetDirectories,
    sanitizeAnimatorMediaSource,
    getAnimatorMediaDefaultRect,
  } = config;

  resetAnimatorAssemblyMenu("timeline");
  const title = document.createElement("div");
  title.className = "animator-assembly-menu-title";
  title.textContent = getAnimatorTimelineEditKindTitle(editKind);
  menu.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = "animator-assembly-menu-subtitle";
  subtitle.textContent =
    editKind === "warp"
      ? `Warp ${Number(warp.rate ?? 1).toFixed(2)}x @ ${formatAnimatorTimeLabel(warp.start)}-${formatAnimatorTimeLabel(warp.end)}`
      : editKind === "pause"
        ? `Pause ${formatAnimatorTimeLabel(pause.duration)} @ ${formatAnimatorTimeLabel(pause.start)}`
        : editKind === "graphic" && graphic
          ? `${getAnimatorGraphicOverlayLabel(graphic)} @ ${formatAnimatorTimeLabel(graphic.start)}-${formatAnimatorTimeLabel(graphic.end)}`
          : editKind === "image" && imageOverlay
            ? `${getAnimatorMediaOverlayLabel(imageOverlay)} @ ${formatAnimatorTimeLabel(imageOverlay.start)}-${formatAnimatorTimeLabel(imageOverlay.end)}`
            : editKind === "video" && videoOverlay
              ? `${getAnimatorMediaOverlayLabel(videoOverlay)} @ ${formatAnimatorTimeLabel(videoOverlay.start)}-${formatAnimatorTimeLabel(videoOverlay.end)}`
              : `At ${formatAnimatorTimeLabel(timeSeconds)}`;
  menu.appendChild(subtitle);

  const validationNote = document.createElement("div");
  validationNote.className = "animator-field-note is-error";
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
    showAnimatorStatus(message);
  };

  const showTimelineOverlapError = (conflict) => {
    if (!conflict) {
      return;
    }
    showTimelineMenuError(
      `Timeline items may not overlap. ${conflict.label} already occupies ${formatAnimatorTimeLabel(conflict.start)}-${formatAnimatorTimeLabel(conflict.end)}.`
    );
  };

  const appendGraphicBlock = () => {
    const initialGraphicSpan = clampAnimatorTimelineSpan(
      graphic?.start ?? timeSeconds,
      graphic?.end ?? Number(timeSeconds) + animatorTimelineMinDurationSeconds,
      duration
    );
    const initialGraphicDraft = normalizeAnimatorGraphicOverlayDraft(
      graphic ?? {
        id: getNextAnimatorGraphicOverlayId(),
        start: initialGraphicSpan.start,
        end: initialGraphicSpan.end,
        text: "Text",
        size: 0.42,
        target: getAnimatorGraphicDefaultTarget(),
      },
      Math.max(0, getAnimatorGraphicOverlayDraftIndexById(graphic?.id)),
      duration
    );
    const graphicBlock = appendAnimatorMenuBlock(menu, "Graphic", {
      text: graphic ? "Save" : "Add",
      onClick: () => {
        const graphicStart = Number(graphicStartInput?.value);
        const graphicEnd = Number(graphicEndInput?.value);
        const text =
          String(graphicTextInput?.value ?? "").trim() ||
          String(initialGraphicDraft.text ?? "").trim();
        const size = Number(graphicSizeInput?.value);
        const target = decodeAnimatorGraphicTargetValue(graphicTargetInput?.value);
        if (!Number.isFinite(graphicStart) || !Number.isFinite(graphicEnd) || !text || !target || !Number.isFinite(size)) {
          return;
        }
        const span = clampAnimatorTimelineSpan(graphicStart, graphicEnd, duration);
        const overlap = findAnimatorTimelineOverlap(
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
        const nextOverlay = normalizeAnimatorGraphicOverlayDraft(
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
          Math.max(0, getAnimatorGraphicOverlayDraftIndexById(graphic?.id)),
          duration
        );
        upsertAnimatorGraphicOverlayDraft(nextOverlay);
        closeAnimatorAssemblyMenu();
        renderAnimatorJsonPreview();
      },
    });
    const graphicForm = document.createElement("div");
    graphicForm.className = "animator-form animator-assembly-menu-grid-2";
    const graphicStartInput = appendAnimatorMenuField(graphicForm, {
      label: "Start (s)",
      type: "number",
      value: formatAnimatorTimeInputValue(initialGraphicSpan.start),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const graphicEndInput = appendAnimatorMenuField(graphicForm, {
      label: "End (s)",
      type: "number",
      value: formatAnimatorTimeInputValue(initialGraphicSpan.end),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const graphicTargetInput = appendAnimatorMenuSelectField(graphicForm, {
      label: "Target",
      value: encodeAnimatorGraphicTargetValue(initialGraphicDraft.target),
      entries: getAnimatorGraphicTargetEntries(),
      placeholder: "Select target",
    });
    graphicTargetInput?.closest?.(".animator-field")?.classList?.add("animator-assembly-menu-grid-span-2");
    const graphicTextInput = appendAnimatorMenuField(graphicForm, {
      label: "Text",
      value: "",
      placeholder: initialGraphicDraft.text || "Graphic text",
    });
    graphicTextInput?.closest?.(".animator-field")?.classList?.add("animator-assembly-menu-grid-span-2");
    const graphicSizeInput = appendAnimatorMenuField(graphicForm, {
      label: "Size",
      type: "number",
      value: initialGraphicDraft.size,
      step: 0.05,
      min: 0.18,
    });
    graphicBlock?.block?.appendChild(graphicForm);
    appendAnimatorMenuNote(graphicBlock?.block, "Drag the text to place it. Edit size here when needed.");
    if (graphic?.id) {
      appendAnimatorMenuButtonRow(graphicBlock?.block, [
        {
          text: "Remove Graphic",
          className: "animator-assembly-menu-danger",
          onClick: () => {
            removeAnimatorGraphicOverlayDraftById(graphic.id);
            closeAnimatorAssemblyMenu();
            renderAnimatorJsonPreview();
          },
        },
      ]);
    }
  };

  const appendMediaBlock = (kind) => {
    const currentOverlay = kind === "image" ? imageOverlay : videoOverlay;
    const initialSpan = clampAnimatorTimelineSpan(
      currentOverlay?.start ?? timeSeconds,
      currentOverlay?.end ?? Number(timeSeconds) + animatorTimelineMinDurationSeconds,
      duration
    );
    const initialDraft = normalizeAnimatorGraphicOverlayDraft(
      currentOverlay ?? {
        id: getNextAnimatorGraphicOverlayId(),
        kind,
        start: initialSpan.start,
        end: initialSpan.end,
        source: "",
        rect: getAnimatorMediaDefaultRect(kind),
      },
      Math.max(0, getAnimatorGraphicOverlayDraftIndexById(currentOverlay?.id)),
      duration
    );
    const mediaBlock = appendAnimatorMenuBlock(menu, kind === "image" ? "Image" : "Video", {
      text: currentOverlay ? "Save" : "Add",
      onClick: () => {
        const start = Number(mediaStartInput?.value);
        const end = Number(mediaEndInput?.value);
        const source = sanitizeAnimatorMediaSource(
          String(mediaSourceInput?.value ?? "").trim() || initialDraft.source,
          kind
        );
        if (!Number.isFinite(start) || !Number.isFinite(end) || !source) {
          return;
        }
        const span = clampAnimatorTimelineSpan(start, end, duration);
        const overlap = findAnimatorTimelineOverlap(
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
        const nextOverlay = normalizeAnimatorGraphicOverlayDraft(
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
          Math.max(0, getAnimatorGraphicOverlayDraftIndexById(currentOverlay?.id)),
          duration
        );
        upsertAnimatorGraphicOverlayDraft(nextOverlay);
        closeAnimatorAssemblyMenu();
        renderAnimatorJsonPreview();
      },
    });
    const mediaForm = document.createElement("div");
    mediaForm.className = "animator-form animator-assembly-menu-grid-2";
    const mediaStartInput = appendAnimatorMenuField(mediaForm, {
      label: "Start (s)",
      type: "number",
      value: formatAnimatorTimeInputValue(initialSpan.start),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const mediaEndInput = appendAnimatorMenuField(mediaForm, {
      label: "End (s)",
      type: "number",
      value: formatAnimatorTimeInputValue(initialSpan.end),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const mediaSourceInput = appendAnimatorMenuField(mediaForm, {
      label: "Asset Path",
      value: "",
      placeholder: initialDraft.source || animatorMediaAssetDirectories[kind],
    });
    mediaSourceInput?.closest?.(".animator-field")?.classList?.add("animator-assembly-menu-grid-span-2");
    mediaBlock?.block?.appendChild(mediaForm);
    appendAnimatorMenuNote(
      mediaBlock?.block,
      `Use ${animatorMediaAssetDirectories[kind]}. Drag the rectangle to place it, and drag the corner to resize it.`
    );
    if (currentOverlay?.id) {
      appendAnimatorMenuButtonRow(mediaBlock?.block, [
        {
          text: `Remove ${kind === "image" ? "Image" : "Video"}`,
          className: "animator-assembly-menu-danger",
          onClick: () => {
            removeAnimatorGraphicOverlayDraftById(currentOverlay.id);
            closeAnimatorAssemblyMenu();
            renderAnimatorJsonPreview();
          },
        },
      ]);
    }
  };

  const appendPauseBlock = () => {
    const initialPauseSpan = clampAnimatorTimelineSpan(
      pause?.start ?? timeSeconds,
      Number(pause?.start ?? timeSeconds) + Number(pause?.duration ?? animatorTimelineMinDurationSeconds),
      duration
    );
    const pauseBlock = appendAnimatorMenuBlock(menu, "Pause", {
      text: pause ? "Save" : "Add",
      onClick: () => {
        const start = Number(pauseStartInput?.value);
        const pauseDuration = Number(pauseDurationInput?.value);
        if (!Number.isFinite(start) || !Number.isFinite(pauseDuration) || pauseDuration <= 0) {
          return;
        }
        const span = clampAnimatorTimelineSpan(start, start + pauseDuration, duration);
        const pauseIdForSave = pause?.id ?? "";
        const overlap = findAnimatorTimelineOverlap(
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
        const current = animatorPauseListInput?.value ?? "";
        if (animatorPauseListInput) {
          animatorPauseListInput.value = pause?.id
            ? replaceAnimatorAuthoringLineById(current, pause.id, nextLine)
            : appendAnimatorAuthoringLine(current, nextLine);
        }
        closeAnimatorAssemblyMenu();
        renderAnimatorJsonPreview();
      },
    });
    const pauseForm = document.createElement("div");
    pauseForm.className = "animator-form animator-assembly-menu-grid-2";
    const pauseStartInput = appendAnimatorMenuField(pauseForm, {
      label: "Start (s)",
      type: "number",
      value: formatAnimatorTimeInputValue(initialPauseSpan.start),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const pauseDurationInput = appendAnimatorMenuField(pauseForm, {
      label: "Duration (s)",
      type: "number",
      value: formatAnimatorTimeInputValue(initialPauseSpan.span),
      step: 0.1,
      min: animatorTimelineMinDurationSeconds,
      selectOnFocus: true,
    });
    pauseBlock?.block?.appendChild(pauseForm);
    if (pause?.id) {
      appendAnimatorMenuButtonRow(pauseBlock?.block, [
        {
          text: "Remove Pause",
          className: "animator-assembly-menu-danger",
          onClick: () => {
            if (animatorPauseListInput) {
              animatorPauseListInput.value = replaceAnimatorAuthoringLineById(
                animatorPauseListInput.value,
                pause.id,
                null
              );
            }
            closeAnimatorAssemblyMenu();
            renderAnimatorJsonPreview();
          },
        },
      ]);
    }
  };

  const appendWarpBlock = () => {
    const initialWarpSpan = clampAnimatorTimelineSpan(
      warp?.start ?? timeSeconds,
      warp?.end ?? Number(timeSeconds) + animatorTimelineMinDurationSeconds,
      duration
    );
    const warpBlock = appendAnimatorMenuBlock(menu, "Warp", {
      text: warp ? "Save" : "Add",
      onClick: () => {
        const start = Number(warpStartInput?.value);
        const end = Number(warpEndInput?.value);
        const rate = Number(warpRateInput?.value);
        if (!Number.isFinite(start) || !Number.isFinite(end) || !Number.isFinite(rate) || rate <= 0) {
          return;
        }
        const span = clampAnimatorTimelineSpan(start, end, duration);
        const warpIdForSave = warp?.id ?? "";
        const overlap = findAnimatorTimelineOverlap(
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
        const current = animatorWarpListInput?.value ?? "";
        if (animatorWarpListInput) {
          animatorWarpListInput.value = warp?.id
            ? replaceAnimatorAuthoringLineById(current, warp.id, nextLine)
            : appendAnimatorAuthoringLine(current, nextLine);
        }
        closeAnimatorAssemblyMenu();
        renderAnimatorJsonPreview();
      },
    });
    const warpForm = document.createElement("div");
    warpForm.className = "animator-form animator-assembly-menu-grid-2";
    const warpStartInput = appendAnimatorMenuField(warpForm, {
      label: "Start (s)",
      type: "number",
      value: formatAnimatorTimeInputValue(initialWarpSpan.start),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const warpEndInput = appendAnimatorMenuField(warpForm, {
      label: "End (s)",
      type: "number",
      value: formatAnimatorTimeInputValue(initialWarpSpan.end),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const warpRateInput = appendAnimatorMenuField(warpForm, {
      label: "Rate",
      type: "number",
      value: Number((warp?.rate ?? 0.5).toFixed(3)),
      step: 0.1,
      min: 0.001,
    });
    warpRateInput?.closest?.(".animator-field")?.classList?.add("animator-assembly-menu-grid-span-2");
    warpBlock?.block?.appendChild(warpForm);
    if (warp?.id) {
      appendAnimatorMenuButtonRow(warpBlock?.block, [
        {
          text: "Remove Warp",
          className: "animator-assembly-menu-danger",
          onClick: () => {
            if (animatorWarpListInput) {
              animatorWarpListInput.value = replaceAnimatorAuthoringLineById(
                animatorWarpListInput.value,
                warp.id,
                null
              );
            }
            closeAnimatorAssemblyMenu();
            renderAnimatorJsonPreview();
          },
        },
      ]);
    }
  };

  const appendPlaceholderBlock = (blockTitle, notes = []) => {
    const block = appendAnimatorMenuBlock(menu, blockTitle, null);
    notes.forEach((entry) => appendAnimatorMenuNote(block?.block, entry));
  };

  if (editKind === "add") {
    const orbGrid = document.createElement("div");
    orbGrid.className = "animator-assembly-menu-orb-grid";
    animatorTimelineAddTypeEntries.forEach((item) => {
      const orb = document.createElement("button");
      orb.type = "button";
      orb.className = "animator-assembly-menu-orb";
      orb.dataset.timelineType = item.id;
      if (item.id === addType) {
        orb.classList.add("is-active");
      }
      orb.textContent = item.label;
      orb.addEventListener("click", () => {
        buildAnimatorTimelineMenu({
          ...config,
          addType: normalizeAnimatorTimelineAddType(item.id),
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
        "The first pass for that shared viewport design is being captured in reference/priorities/app-animator/priorities.md.",
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

  positionAnimatorAssemblyMenu(
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
