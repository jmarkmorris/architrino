import {
  BORG_ASSEMBLY_VIEW_CONTRACT_BLOCKERS,
  createBorgAssemblyViewPresentation,
  resolveBorgAssemblyViewLoopPeriod,
} from "./BorgAssemblyViewSession.js";

const FILTER_LABELS = Object.freeze({
  claimGrade: "Claim grade",
  evidenceStatus: "Evidence status",
  campaignRunId: "Campaign / run id",
  speedRegime: "Speed regime",
  eigenBraidStatus: "Eigen-braid status",
  axisAlignmentStatus: "Axis-alignment status",
  assemblyTopologicalCharge: "Topological charge",
  accessoryCaptureStatus: "Capture status",
});

export function createBorgAssemblyViewControls({
  documentLike,
  session,
  dom,
  onRecordChange,
  onDisplayModeChange,
  onCameraModeChange,
  onStrobeChange,
  onLoopChange,
  onExport,
}) {
  let strobeEnabled = false;
  let loopEnabled = false;
  const listeners = [];

  function listen(element, type, handler) {
    element.addEventListener(type, handler);
    listeners.push(() => element.removeEventListener?.(type, handler));
  }

  function render() {
    const entry = session.selected;
    const presentation = createBorgAssemblyViewPresentation(entry);
    dom.controls.hidden = false;
    dom.modeBoundary.dataset.mode = "assembly-view-replay";
    dom.modeLabel.textContent = "Assembly-view replay";
    dom.modeDetail.textContent =
      "Sealed record only. Workspace initial conditions and the EOM solver are disabled.";
    dom.authorityNotice.textContent = presentation.authorityNotice;
    renderFieldRows(documentLike, dom.provenance, [
      ["Record type", presentation.claimLabel],
      ["Engine", `${presentation.provenance.engineId} ${presentation.provenance.engineVersion}`],
      ["Run id", presentation.provenance.runId],
      ["Claim grade", presentation.provenance.claimGrade],
      ["Evidence status", presentation.provenance.evidenceStatus],
      ["Generating specification", presentation.provenance.generatingSpec],
      ["Date", presentation.provenance.date],
      ["Coverage", `${presentation.coverage.start} to ${presentation.coverage.end}`],
      ["Delay horizon h", presentation.delayHorizon],
    ]);
    renderRecordOptions();
    renderFilterOptions();
    renderComparisonOptions();
    renderOverlayRows(presentation);

    dom.displayMode.value = presentation.staticChartPose ? "chart-pose" : "animated";
    dom.displayMode.querySelector?.('option[value="animated"]')?.toggleAttribute?.(
      "disabled",
      presentation.staticChartPose,
    );
    dom.cameraMode.value = "free";
    const loop = resolveBorgAssemblyViewLoopPeriod(entry);
    dom.loopButton.disabled = !loop.available;
    dom.loopButton.title = loop.available
      ? `Loop ${loop.period} recorded time units from source binary frequency ${loop.frequency}.`
      : loop.message;
    if (!loop.available) {
      loopEnabled = false;
      syncToggle(dom.loopButton, false, "Loop one period");
    }
    const frequency = loop.frequency ?? null;
    dom.strobeFrequency.value = frequency == null ? "" : String(frequency);
    dom.strobeButton.disabled = frequency == null;
    dom.cameraMode.querySelector?.('option[value="co-rotating"]')?.toggleAttribute?.(
      "disabled",
      frequency == null || !hasPlaneNormal(entry),
    );
    setFeedback(
      session.records.length > 1
        ? BORG_ASSEMBLY_VIEW_CONTRACT_BLOCKERS.comparisonTransforms
        : BORG_ASSEMBLY_VIEW_CONTRACT_BLOCKERS.collectionCarrier,
      "bad",
    );
    onDisplayModeChange?.(dom.displayMode.value);
  }

  function renderRecordOptions() {
    dom.recordSelect.textContent = "";
    session.navigationRows().forEach((row) => {
      const option = documentLike.createElement("option");
      option.value = row.selectedRawRecordId;
      option.textContent = row.groupedSourceIds.length > 1
        ? `${row.sourceIndex + 1}. ${row.sourceId} (${row.groupedSourceIds.length} source rows)`
        : `${row.sourceIndex + 1}. ${row.sourceId}`;
      dom.recordSelect.append(option);
    });
    dom.recordSelect.value = session.selectedSourceId;
  }

  function renderFilterOptions() {
    const previousField = dom.filterField.value;
    dom.filterField.textContent = "";
    const allOption = documentLike.createElement("option");
    allOption.value = "";
    allOption.textContent = "No filter";
    dom.filterField.append(allOption);
    Object.keys(FILTER_LABELS).forEach((field) => {
      const values = sourceValues(field);
      const option = documentLike.createElement("option");
      option.value = field;
      option.textContent = values.length > 0
        ? FILTER_LABELS[field]
        : `${FILTER_LABELS[field]} — unavailable`;
      option.disabled = values.length === 0;
      dom.filterField.append(option);
    });
    dom.filterField.value = [...dom.filterField.options ?? []].some(
      (option) => option.value === previousField && !option.disabled,
    ) ? previousField : "";
    renderFilterValues();
  }

  function renderFilterValues() {
    const field = dom.filterField.value;
    dom.filterValue.textContent = "";
    const allOption = documentLike.createElement("option");
    allOption.value = "";
    allOption.textContent = field ? "All source values" : "Unavailable";
    dom.filterValue.append(allOption);
    sourceValues(field).forEach((value) => {
      const option = documentLike.createElement("option");
      option.value = value;
      option.textContent = value;
      dom.filterValue.append(option);
    });
    dom.filterValue.disabled = !field;
  }

  function renderComparisonOptions() {
    dom.comparison.textContent = "";
    const none = documentLike.createElement("option");
    none.value = "";
    none.textContent = "No comparison";
    dom.comparison.append(none);
    session.records
      .filter((entry) => entry.sourceId !== session.selectedSourceId)
      .forEach((entry) => {
        const option = documentLike.createElement("option");
        option.value = entry.sourceId;
        option.textContent = entry.sourceId;
        dom.comparison.append(option);
      });
    dom.comparison.disabled = session.records.length < 2;
  }

  function renderOverlayRows(presentation) {
    const binaries = presentation.binaryRows.length === 0
      ? "unavailable"
      : presentation.binaryRows.map((binary) =>
        `${binary.sourceId}: f=${format(binary.frequency)}, separation=${format(binary.planarOffset)}`,
      ).join(" | ");
    const events = presentation.eventRows.length === 0
      ? "unavailable"
      : presentation.eventRows.map((event) =>
        `${event.kind}@${format(event.time)}${event.worldlineId == null ? "" : `:${event.worldlineId}`}`,
      ).join(" | ");
    renderFieldRows(documentLike, dom.overlayFields, [
      ["Polarity", "source-carried per worldline"],
      ["Speed relative to c_f", presentation.fieldSpeedStatus],
      ["Binaries", binaries],
      ["Events", events],
      ["Branch status", presentation.sourceStatuses.branch ?? "unavailable"],
      ["Eigen-braid status", presentation.sourceStatuses.eigenBraid ?? "unavailable"],
      ["Axis-alignment status", presentation.sourceStatuses.axisAlignment ?? "unavailable"],
      ["Topological charge", presentation.sourceStatuses.topologicalCharge ?? "unavailable"],
      ["Capture status", presentation.sourceStatuses.capture ?? "unavailable"],
      ["Spin / polarity dipole", presentation.spinDipoleStatus],
      ["Ansatz curves", presentation.ansatz.length || "unavailable"],
    ]);
  }

  function sourceValues(field) {
    if (!field) {
      return [];
    }
    return [...new Set(session.records.map((entry) => entry.filterValues[field])
      .filter((value) => value != null)
      .map((value) => String(value)))];
  }

  function setFeedback(message, tone = "warn") {
    dom.feedback.value = message;
    dom.feedback.textContent = message;
    dom.feedback.dataset.tone = tone;
  }

  listen(dom.recordSelect, "change", () => {
    strobeEnabled = false;
    loopEnabled = false;
    syncToggle(dom.strobeButton, false, "Strobe");
    syncToggle(dom.loopButton, false, "Loop one period");
    const entry = session.selectSource(dom.recordSelect.value);
    onRecordChange?.(entry);
    render();
  });
  listen(dom.displayMode, "change", () => {
    onDisplayModeChange?.(dom.displayMode.value);
  });
  listen(dom.cameraMode, "change", () => {
    try {
      onCameraModeChange?.(dom.cameraMode.value);
      setFeedback(`Camera mode: ${dom.cameraMode.value}.`, "warn");
    } catch (error) {
      dom.cameraMode.value = "free";
      setFeedback(error?.message ?? String(error), "bad");
    }
  });
  listen(dom.strobeButton, "click", () => {
    const frequency = Number(dom.strobeFrequency.value);
    if (!Number.isFinite(frequency) || frequency <= 0) {
      setFeedback("Strobe requires a positive frequency.", "bad");
      return;
    }
    strobeEnabled = !strobeEnabled;
    syncToggle(dom.strobeButton, strobeEnabled, "Strobe");
    onStrobeChange?.(strobeEnabled, frequency);
  });
  listen(dom.loopButton, "click", () => {
    const loop = resolveBorgAssemblyViewLoopPeriod(session.selected);
    if (!loop.available) {
      setFeedback(loop.message, "bad");
      return;
    }
    loopEnabled = !loopEnabled;
    syncToggle(dom.loopButton, loopEnabled, "Loop one period");
    onLoopChange?.(loopEnabled, loop.period);
  });
  listen(dom.exportButton, "click", () => onExport?.());
  listen(dom.grouping, "change", () => {
    try {
      session.setGroupingEnabled(dom.grouping.value === "s3");
      renderRecordOptions();
      setFeedback(
        dom.grouping.value === "s3"
          ? "Navigation grouped by source-carried S3 key; the selected raw record remains unchanged."
          : "Raw source order restored.",
      );
    } catch (error) {
      dom.grouping.value = "raw";
      setFeedback(error?.message ?? String(error), "bad");
    }
  });
  listen(dom.filterField, "change", () => {
    renderFilterValues();
    session.setFilters({});
    renderRecordOptions();
  });
  listen(dom.filterValue, "change", () => {
    const field = dom.filterField.value;
    session.setFilters(field && dom.filterValue.value
      ? { [field]: dom.filterValue.value }
      : {});
    renderRecordOptions();
  });
  listen(dom.comparison, "change", () => {
    if (!dom.comparison.value) {
      setFeedback("Comparison off.");
      return;
    }
    const compatibility = session.assessComparison(dom.comparison.value);
    setFeedback(compatibility.message, compatibility.compatible ? "warn" : "bad");
    dom.comparison.value = compatibility.compatible ? dom.comparison.value : "";
  });

  render();

  return Object.freeze({
    render,
    setFeedback,
    dispose() {
      listeners.splice(0).forEach((remove) => remove());
    },
  });
}

function renderFieldRows(documentLike, container, rows) {
  container.textContent = "";
  rows.forEach(([label, value]) => {
    const row = documentLike.createElement("div");
    row.className = "borg-field-row";
    const labelElement = documentLike.createElement("span");
    labelElement.className = "borg-field-label";
    labelElement.textContent = label;
    const valueElement = documentLike.createElement("span");
    valueElement.className = "borg-field-value";
    valueElement.textContent = format(value);
    row.append(labelElement, valueElement);
    container.append(row);
  });
}

function syncToggle(button, active, label) {
  button.classList.toggle("is-active", active);
  button.setAttribute("aria-pressed", active ? "true" : "false");
  button.textContent = `${label} ${active ? "on" : "off"}`;
}

function hasPlaneNormal(entry) {
  return entry.dataset.binaries.some((binary) => {
    const normal = binary?.planeOrientation?.normal ?? binary?.planeNormal;
    return [normal?.x, normal?.y, normal?.z].every((value) => Number.isFinite(Number(value))) &&
      Math.hypot(Number(normal.x), Number(normal.y), Number(normal.z)) > 0;
  });
}

function format(value) {
  if (value == null) {
    return "unavailable";
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? Number(value.toPrecision(8)).toString() : "unavailable";
  }
  return String(value);
}
