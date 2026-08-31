import {
  createBorgAssemblyViewPresentation,
  resolveBorgAssemblyViewTrail,
} from "./BorgAssemblyViewSession.js";
import { describeBorgOrbitTrails } from "./BorgOrbitTrails.mjs";
import {
  BORG_PRESCRIBED_DISPLAY_FRAME_FIXED,
  borgPrescribedDisplayFrameReadout,
  resolveBorgPrescribedTranslation,
} from "./BorgPrescribedTranslation.js";
import { renderInlineMathText } from "../../runtime/InlineMathRuntime.js";

const FILTER_LABELS = Object.freeze({
  claimGrade: "Claim grade",
  evidenceStatus: "Evidence status",
  campaignRunId: "Campaign / run id",
  speedRegime: "Speed regime",
  braidCertificationStatus: "Braid certification",
  axisAlignmentStatus: "Axis-alignment status",
  assemblyTopologicalCharge: "Topological charge",
  accessoryCaptureStatus: "Capture status",
});

export function createBorgAssemblyViewControls({
  documentLike,
  session,
  dom,
  onRecordChange,
  onCameraModeChange,
  hasCoRotatingCarrier,
  onExport,
  onTranslationFrameChange,
  onHistoryDepthChange,
  onTubeChange,
  onClearReceiver,
  onVirtualProbe,
  onAnalysisRootSelect,
  onContributionVisibleChange,
}) {
  const listeners = [];
  let declaredVirtualProbes = [];

  function listen(element, type, handler) {
    element.addEventListener(type, handler);
    listeners.push(() => element.removeEventListener?.(type, handler));
  }

  function render() {
    const entry = session.selected;
    const presentation = createBorgAssemblyViewPresentation(entry);
    const translation = resolveBorgPrescribedTranslation(entry);
    dom.controls.hidden = false;
    const prescribedGeometry = presentation.provenance.prescribedGeometry;
    const taxonomy = prescribedGeometry?.taxonomy;
    renderFieldRows(documentLike, dom.provenance, [
      [prescribedGeometry ? "Geometry source" : "Engine", `${presentation.provenance.engineId} ${presentation.provenance.engineVersion}`],
      ...(taxonomy ? [
        ["Candidate", presentation.catalogLabel ?? taxonomy.displayLabel],
        ["Geometry class", `${taxonomy.memberId} — ${taxonomy.memberLabel}`],
        ...(presentation.catalogLabel && presentation.catalogLabel !== taxonomy.displayLabel
          ? [["Recorded label", taxonomy.displayLabel]] : []),
        ...(taxonomy.instantiationLabel ? [["Instantiation", taxonomy.instantiationLabel]] : []),
        ["Canon source", taxonomy.canonSource],
      ] : []),
      ...prescribedCoordinateRows(prescribedGeometry),
      ["Physics invoked", prescribedGeometry ? "no — prescribed chart arithmetic only" : "see source engine provenance"],
      ["Run id", presentation.provenance.runId],
      ["Generating specification", presentation.provenance.generatingSpec],
      ["Record date", presentation.provenance.date],
      ["Coverage", `${presentation.coverage.start} to ${presentation.coverage.end}`],
      ["Delay horizon h", presentation.delayHorizon],
    ]);
    dom.recordControl.hidden = session.records.length < 2;
    dom.collectionTools.hidden = session.records.length < 2;
    renderRecordOptions();
    renderFilterOptions();
    renderComparisonOptions();
    renderPrescribedGeometryTable(documentLike, dom.binaryGeometryTable, presentation);
    renderOverlayRows(presentation);

    dom.cameraMode.value = "free";
    const trail = resolveBorgAssemblyViewTrail(entry);
    const missingTrails = [...describeBorgOrbitTrails(entry.dataset).values()].filter(row => row.mode === "unavailable").length;
    dom.trailSummary.textContent = `Red/blue trails: shared binary orbit = half-turn each; co-rotating ring = arc to preceding member; dedicated orbit = full turn or source cycle. Retained history limit: ${format(trail.duration)} T.${missingTrails ? ` ${missingTrails} trails unavailable: missing orbit ownership or phase information.` : ""}`;
    dom.cameraMode.querySelector?.('option[value="co-rotating"]')?.toggleAttribute?.(
      "disabled",
      !borgCoRotatingCameraAvailable(hasCoRotatingCarrier),
    );
    dom.translationFrame.value = BORG_PRESCRIBED_DISPLAY_FRAME_FIXED;
    dom.translationFrame.querySelector?.(
      'option[value="co-translating"]',
    )?.toggleAttribute?.("disabled", !translation.available);
    dom.translationFrame.disabled = !translation.available;
    dom.translationStatus.textContent = translation.message;
    const recordDuration = entry.dataset.window.end - entry.dataset.window.start;
    dom.historyDepth.min = String(entry.dataset.window.sampleInterval);
    dom.historyDepth.max = String(recordDuration);
    dom.historyDepth.step = String(entry.dataset.window.sampleInterval);
    dom.historyDepth.value = String(Math.min(trail.duration, recordDuration));
    dom.historyDepthOutput.value = `${format(Number(dom.historyDepth.value))} T`;
    dom.tubeToggle.checked = false;
    dom.tubeRadius.disabled = true;
    dom.tubeOpacity.disabled = true;
    updateDisplayReadout(
      entry.dataset.window.start,
      BORG_PRESCRIBED_DISPLAY_FRAME_FIXED,
    );
    updateReceiverSelection(null);
    renderAnalysisState({
      state: "unavailable",
      projection: null,
      event: null,
      message:
        "No receiver selected. Analytical roots are never computed in Borg.",
    });
    setFeedback("", "warn");
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
    const events = presentation.eventRows.length === 0
      ? "unavailable"
      : presentation.eventRows.map((event) =>
        `${event.kind}@${format(event.time)}${event.worldlineId == null ? "" : `:${event.worldlineId}`}`,
      ).join(" | ");
    const axes = presentation.binaryRows.filter((binary) =>
      binary.raw?.axisPoint && Number.isFinite(Number(binary.raw?.axisDisplayHalfLength))
    );
    renderFieldRows(documentLike, dom.overlayFields, [
      ["Polarity", "source-carried per worldline"],
      ["Speed relative to c_f", {
        text: "Unavailable in this record schema.",
        title: presentation.fieldSpeedStatus,
      }],
      ["Binary axes", axes.length === 0 ? "unavailable" : `${axes.length} source-carried axis rows`],
      ["Events", events],
      ["Branch status", presentation.sourceStatuses.branch ?? "unavailable"],
      ["Braid certification", presentation.sourceStatuses.braidCertification ?? "unavailable"],
      ["Axis-alignment status", presentation.sourceStatuses.axisAlignment ?? "unavailable"],
      ["Topological charge", presentation.sourceStatuses.topologicalCharge ?? "unavailable"],
      ["Capture status", presentation.sourceStatuses.capture ?? "unavailable"],
      ["Spin / polarity dipole", {
        text: "Unavailable in this record schema.",
        title: presentation.spinDipoleStatus,
      }],
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
    dom.feedback.hidden = !message;
  }

  listen(dom.recordSelect, "change", () => {
    const entry = session.selectSource(dom.recordSelect.value);
    onRecordChange?.(entry);
    render();
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
  listen(dom.exportButton, "click", () => onExport?.());
  listen(dom.translationFrame, "change", () => {
    try {
      onTranslationFrameChange?.(dom.translationFrame.value);
      updateDisplayReadout(
        Number(dom.displayReadout.dataset.time),
        dom.translationFrame.value,
      );
      setFeedback(`Display frame: ${dom.translationFrame.value}.`, "warn");
    } catch (error) {
      dom.translationFrame.value = BORG_PRESCRIBED_DISPLAY_FRAME_FIXED;
      setFeedback(error?.message ?? String(error), "bad");
    }
  });
  const updateHistoryDepth = () => {
    const depth = Number(dom.historyDepth.value);
    dom.historyDepthOutput.value = `${format(depth)} T`;
    onHistoryDepthChange?.(depth);
  };
  listen(dom.historyDepth, "input", updateHistoryDepth);
  listen(dom.historyDepth, "change", updateHistoryDepth);
  const updateTube = () => {
    dom.tubeRadius.disabled = !dom.tubeToggle.checked;
    dom.tubeOpacity.disabled = !dom.tubeToggle.checked;
    onTubeChange?.({
      visible: dom.tubeToggle.checked,
      radius: Number(dom.tubeRadius.value),
      opacity: Number(dom.tubeOpacity.value),
    });
  };
  listen(dom.tubeToggle, "change", updateTube);
  listen(dom.tubeRadius, "input", updateTube);
  listen(dom.tubeOpacity, "input", updateTube);
  listen(dom.clearReceiver, "click", () => onClearReceiver?.());
  listen(dom.virtualProbeBind, "click", () => onVirtualProbe?.({
    id: dom.virtualProbeId.value,
    position: {
      x: Number(dom.virtualProbeX.value),
      y: Number(dom.virtualProbeY.value),
      z: Number(dom.virtualProbeZ.value),
    },
    polarity: Number(dom.virtualProbePolarity.value),
  }));
  listen(dom.virtualProbeId, "change", () => {
    const selected = declaredVirtualProbes.find(
      (probe) => probe.id === dom.virtualProbeId.value,
    );
    if (!selected) return;
    dom.virtualProbeX.value = String(selected.position.x);
    dom.virtualProbeY.value = String(selected.position.y);
    dom.virtualProbeZ.value = String(selected.position.z);
  });
  listen(dom.contributionToggle, "change", () =>
    onContributionVisibleChange?.(dom.contributionToggle.checked));
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
    updateDisplayReadout,
    updateReceiverSelection,
    renderAnalysisState,
    setSelectedRoot(rootId) {
      const identity = rootId == null ? null : String(rootId);
      const selectable = [
        ...(dom.analysisTable.querySelectorAll?.("[data-root-id]") ?? []),
        ...(dom.branchPlot.querySelectorAll?.("[data-root-id]") ?? []),
      ];
      selectable.forEach((element) => {
        const selected = identity != null && element.dataset.rootId === identity;
        element.classList.toggle("is-selected", selected);
        element.setAttribute("aria-selected", selected ? "true" : "false");
      });
    },
    setProviderDescription(description) {
      dom.providerStatus.textContent = description?.message ??
        "Analysis provider unavailable.";
      renderVirtualProbeOptions(description?.virtualProbes ?? []);
      dom.virtualProbeBind.disabled = !description?.virtualProbe;
      dom.virtualProbeId.disabled = !description?.virtualProbe;
      dom.virtualProbeFields.toggleAttribute?.(
        "disabled",
        !description?.virtualProbe,
      );
    },
    dispose() {
      listeners.splice(0).forEach((remove) => remove());
    },
  });

  function updateDisplayReadout(time, frame = dom.translationFrame.value) {
    const entry = session.selected;
    const translation = resolveBorgPrescribedTranslation(entry);
    const safeTime = Number.isFinite(Number(time))
      ? Number(time)
      : entry.dataset.window.start;
    dom.displayReadout.dataset.time = String(safeTime);
    dom.displayReadout.value = borgPrescribedDisplayFrameReadout({
      frame,
      time: safeTime,
      translation,
    });
    dom.displayReadout.textContent = dom.displayReadout.value;
  }

  function updateReceiverSelection(receiver) {
    dom.clearReceiver.disabled = receiver == null;
    dom.receiverStatus.textContent = receiver == null
      ? "No receiver selected."
      : `${receiver.kind}: ${receiver.id} · polarity ${signed(receiver.polarity)} · ` +
        `T=${format(receiver.receptionTime)} · ` +
        `(${format(receiver.position.x)}, ${format(receiver.position.y)}, ${format(receiver.position.z)})`;
  }

  function renderAnalysisState(nextState) {
    dom.analysisStatus.dataset.state = nextState?.state ?? "unavailable";
    dom.analysisStatus.textContent = nextState?.message ??
      "Analysis provider unavailable.";
    renderAnalysisDiagnostics(
      documentLike,
      dom.analysisTable,
      nextState,
      onAnalysisRootSelect,
    );
    renderRootBranches(
      documentLike,
      dom.branchPlot,
      nextState?.projection,
      onAnalysisRootSelect,
    );
    dom.analysisProvenance.textContent = "";
    const provenance = nextState?.projection?.provenance;
    if (provenance) {
      renderFieldRows(documentLike, dom.analysisProvenance, [
        ["Source hash", provenance.sourceHash],
        ["Protocol hash", provenance.protocolHash],
        ["Implementation hash", provenance.implementationHash],
        ["Result hash", provenance.resultHash],
        ["Case hash", provenance.caseHash],
        ["Campaign hash", provenance.campaignHash],
      ]);
    }
  }

  function renderVirtualProbeOptions(probes) {
    declaredVirtualProbes = [...probes];
    dom.virtualProbeId.textContent = "";
    if (probes.length === 0) {
      const option = documentLike.createElement("option");
      option.value = "";
      option.textContent = "Unavailable";
      dom.virtualProbeId.append(option);
      return;
    }
    probes.forEach((probe) => {
      const option = documentLike.createElement("option");
      option.value = probe.id;
      option.textContent = probe.id;
      dom.virtualProbeId.append(option);
    });
    const selected = probes[0];
    dom.virtualProbeId.value = selected.id;
    dom.virtualProbeX.value = String(selected.position.x);
    dom.virtualProbeY.value = String(selected.position.y);
    dom.virtualProbeZ.value = String(selected.position.z);
  }
}

function renderAnalysisDiagnostics(
  documentLike,
  table,
  state,
  onAnalysisRootSelect,
) {
  table.textContent = "";
  const caption = documentLike.createElement("caption");
  caption.textContent = "Prescribed causal-root diagnostics";
  const head = documentLike.createElement("thead");
  const headRow = documentLike.createElement("tr");
  [
    "Status",
    "Source / root",
    "Emission / delay",
    "Geometry",
    "Certification",
    "Acceleration contribution",
  ].forEach((label) => {
    const cell = documentLike.createElement("th");
    cell.scope = "col";
    cell.textContent = label;
    headRow.append(cell);
  });
  head.append(headRow);
  const body = documentLike.createElement("tbody");
  const event = state?.event;
  if (!event) {
    appendAnalysisRow(documentLike, body, [
      state?.state ?? "unavailable",
      "—",
      "—",
      "—",
      state?.message ?? "No matching analytical result.",
      "—",
    ]);
  } else {
    event.roots.forEach((root) => {
      const row = appendAnalysisRow(documentLike, body, [
        event.status,
        `${root.transmitterId} / ${root.binaryId ?? "binary unavailable"} / ` +
          `root ${root.rootOrdinal} (${root.rootId})`,
        `$T_e=${format(root.emissionTime)}$ · $\\Delta T=${format(root.delay)}$`,
        `$r=${format(root.distance)}$ · $\\mathbf n=(${format(root.direction.x)}, ${format(root.direction.y)}, ${format(root.direction.z)})$`,
        `${root.rootCompletenessStatus} · $D_t=${format(root.transmitterSideFactorDt)}$ · [${root.finalBracket.map(format).join(", ")}]`,
        root.accelerationContribution
          ? `(${format(root.accelerationContribution.x)}, ${format(root.accelerationContribution.y)}, ${format(root.accelerationContribution.z)})`
          : "unavailable",
      ]);
      row.tabIndex = 0;
      row.dataset.rootId = root.rootId;
      row.addEventListener("click", () => onAnalysisRootSelect?.(root.rootId));
      row.addEventListener("keydown", (eventLike) => {
        if (eventLike.key === "Enter" || eventLike.key === " ") {
          eventLike.preventDefault?.();
          onAnalysisRootSelect?.(root.rootId);
        }
      });
    });
    event.noRootTransmitters.forEach((row) => {
      appendAnalysisRow(documentLike, body, [
        "root-free-certified",
        `${row.transmitterId} / —`,
        "—",
        "—",
        `${row.reason} · [${row.retainedInterval.map(format).join(", ")}]`,
        "—",
      ]);
    });
    event.unresolvedIntervals.forEach((row) => {
      appendAnalysisRow(documentLike, body, [
        "unresolved",
        `${row.transmitterId} / ${row.intervalId}`,
        `[${row.emissionInterval.map(format).join(", ")}]`,
        "bounded producer-carried history segment",
        row.reason,
        "—",
      ]);
    });
    if (event.status === "drawn-not-evaluated") {
      appendAnalysisRow(documentLike, body, [
        event.status,
        event.receiver?.identity ?? "selected event",
        "—",
        "—",
        event.drawnNotEvaluatedReason == null
          ? "unavailable"
          : `${event.drawnNotEvaluatedReason.code}: ${event.drawnNotEvaluatedReason.message}`,
        "—",
      ]);
    }
  }
  table.append(caption, head, body);
}

function appendAnalysisRow(documentLike, body, values) {
  const row = documentLike.createElement("tr");
  const windowLike = documentLike?.defaultView ?? globalThis.window;
  values.forEach((value) => {
    const cell = documentLike.createElement("td");
    renderInlineMathText(cell, String(value ?? "unavailable"), {
      documentLike,
      windowLike,
    });
    row.append(cell);
  });
  body.append(row);
  return row;
}

function renderRootBranches(
  documentLike,
  container,
  projection,
  onAnalysisRootSelect,
) {
  container.textContent = "";
  const branches = projection?.branches ?? [];
  if (branches.length === 0) {
    container.textContent =
      "No compatible multi-time root-branch carrier is available.";
    return;
  }
  const width = 320;
  const height = 150;
  const svg = documentLike.createElementNS?.("http://www.w3.org/2000/svg", "svg");
  if (!svg) {
    container.textContent = "Root-branch plot unavailable in this document runtime.";
    return;
  }
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("role", "img");
  svg.setAttribute(
    "aria-label",
    "Receiver time versus emission time; unevaluated intervals are not interpolated.",
  );
  const points = branches.flatMap((branch) => branch.points);
  const receiverTimes = points.map((point) => point.receptionTime);
  const emissionTimes = points.map((point) => point.emissionTime);
  const xMin = Math.min(...receiverTimes);
  const xMax = Math.max(...receiverTimes);
  const yMin = Math.min(...emissionTimes);
  const yMax = Math.max(...emissionTimes);
  branches.forEach((branch, branchIndex) => {
    const color = `hsl(${(branchIndex * 97) % 360} 72% 66%)`;
    const mapped = branch.points.map((point) => ({
      x: 12 + normalized(point.receptionTime, xMin, xMax) * (width - 24),
      y: height - 12 - normalized(point.emissionTime, yMin, yMax) * (height - 24),
    }));
    if (branch.interpolationAuthorized && mapped.length > 1) {
      const polyline = documentLike.createElementNS(
        "http://www.w3.org/2000/svg",
        "polyline",
      );
      polyline.setAttribute(
        "points",
        mapped.map((point) => `${point.x},${point.y}`).join(" "),
      );
      polyline.setAttribute("fill", "none");
      polyline.setAttribute("stroke", color);
      polyline.setAttribute("stroke-width", "1.5");
      svg.append(polyline);
    }
    mapped.forEach((point, pointIndex) => {
      const sourcePoint = branch.points[pointIndex];
      const sourceEvent = projection.events.find(
        (event) => event.eventId === sourcePoint.eventId,
      );
      const sourceRoot = sourceEvent?.roots.find(
        (root) => root.transmitterId === branch.transmitterId &&
          root.rootOrdinal === branch.rootOrdinal,
      );
      const circle = documentLike.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      circle.setAttribute("cx", String(point.x));
      circle.setAttribute("cy", String(point.y));
      circle.setAttribute("r", "3");
      circle.setAttribute("fill", color);
      if (sourceRoot) {
        circle.setAttribute("role", "button");
        circle.setAttribute("tabindex", "0");
        circle.setAttribute("data-root-id", sourceRoot.rootId);
        circle.setAttribute(
          "aria-label",
          `${branch.transmitterId} root ${branch.rootOrdinal} at receiver time ${sourcePoint.receptionTime}`,
        );
        circle.addEventListener(
          "click",
          () => onAnalysisRootSelect?.(sourceRoot.rootId),
        );
        circle.addEventListener("keydown", (eventLike) => {
          if (eventLike.key === "Enter" || eventLike.key === " ") {
            eventLike.preventDefault?.();
            onAnalysisRootSelect?.(sourceRoot.rootId);
          }
        });
      }
      svg.append(circle);
    });
  });
  container.append(svg);
}

function normalized(value, minimum, maximum) {
  return maximum === minimum ? 0.5 : (value - minimum) / (maximum - minimum);
}

function renderFieldRows(documentLike, container, rows) {
  container.textContent = "";
  const windowLike = documentLike?.defaultView ?? globalThis.window;
  rows.forEach(([label, value]) => {
    const row = documentLike.createElement("div");
    row.className = "borg-field-row";
    const labelElement = documentLike.createElement("span");
    labelElement.className = "borg-field-label";
    renderInlineMathText(labelElement, label, { documentLike, windowLike });
    const valueElement = documentLike.createElement("span");
    valueElement.className = "borg-field-value";
    const displayedValue = value && typeof value === "object" && !Array.isArray(value)
      ? value.text
      : value;
    renderInlineMathText(valueElement, format(displayedValue), {
      documentLike,
      windowLike,
    });
    if (value && typeof value === "object" && value.title) {
      valueElement.title = value.title;
    }
    row.append(labelElement, valueElement);
    container.append(row);
  });
}

function renderPrescribedGeometryTable(documentLike, table, presentation) {
  if (presentation.binaryRows.length > 0) {
    renderBinaryGeometryTable(documentLike, table, presentation.binaryRows);
    return;
  }
  renderConstituentGeometryTable(documentLike, table, presentation.constituentRows);
}

function renderConstituentGeometryTable(documentLike, table, constituentRows) {
  table.textContent = "";
  const caption = documentLike.createElement("caption");
  caption.textContent = "Source-defined individual architrinos and worldlines";
  const head = documentLike.createElement("thead");
  const headRow = documentLike.createElement("tr");
  ["Field", ...constituentRows.map((_, index) => `Architrino ${index + 1}`)].forEach((label) => {
    const cell = documentLike.createElement("th");
    cell.scope = "col";
    cell.textContent = label;
    headRow.append(cell);
  });
  head.append(headRow);
  const body = documentLike.createElement("tbody");
  const rows = [
    ["Constituent id", (constituent) => constituent.constituentId],
    ["Worldline id", (constituent) => constituent.worldlineId],
    ["Polarity", (constituent) => signed(constituent.polarity)],
    ["Constituent role", (constituent) => constituent.role],
  ];
  rows.forEach(([label, read]) => {
    const row = documentLike.createElement("tr");
    const heading = documentLike.createElement("th");
    heading.scope = "row";
    heading.textContent = label;
    row.append(heading);
    constituentRows.forEach((constituent) => {
      const cell = documentLike.createElement("td");
      cell.textContent = format(read(constituent));
      row.append(cell);
    });
    body.append(row);
  });
  table.append(caption, head, body);
}

function renderBinaryGeometryTable(documentLike, table, binaryRows) {
  table.textContent = "";
  const caption = documentLike.createElement("caption");
  caption.textContent = "Source-defined prescribed-braid coordinates";
  const head = documentLike.createElement("thead");
  const headRow = documentLike.createElement("tr");
  ["Field", ...binaryRows.map((_, index) => `Binary ${index + 1}`)].forEach((label) => {
    const cell = documentLike.createElement("th");
    cell.scope = "col";
    cell.textContent = label;
    headRow.append(cell);
  });
  head.append(headRow);
  const body = documentLike.createElement("tbody");
  const rows = [
    ["Source id", (binary) => binary.sourceId],
    ["Component braid", (binary) => binary.raw.braidId],
    ["Persistent binary index", (binary) => binary.raw.binaryIndex],
    ["Radius", (binary) => binary.raw.radius],
    ["Frequency", (binary) => binary.frequency],
    ["Axial half-separation", (binary) => binary.raw.axialHalfSeparation],
    ["Transverse orbit radius", (binary) => binary.raw.transverseOrbitRadius],
    ["Phase", (binary) => formatDegrees(binary.phase)],
    ["Circulation sense", (binary) => signed(binary.raw.circulationSense)],
    ["Carrier speed", (binary) => binary.raw.carrierSpeed],
    ["Polarity assignment", (binary) => signed(binary.raw.polarityAssignment)],
  ];
  rows.forEach(([label, read]) => {
    const row = documentLike.createElement("tr");
    const heading = documentLike.createElement("th");
    heading.scope = "row";
    heading.textContent = label;
    row.append(heading);
    binaryRows.forEach((binary) => {
      const cell = documentLike.createElement("td");
      cell.textContent = format(read(binary));
      row.append(cell);
    });
    body.append(row);
  });
  table.append(caption, head, body);
}

function prescribedCoordinateRows(prescribedGeometry) {
  const coordinates = prescribedGeometry?.coordinates;
  if (!coordinates) return [];
  const braids = coordinates.braids ?? [];
  const flattening = braids[0]?.frameDefinition?.flattening;
  const centers = braids.map((braid) => `(${braid.centerOffset.join(", ")})`).join("; ");
  const phases = braids.map((braid) => formatDegrees(braid.phaseOffset)).join("; ");
  const circulations = braids.map((braid) => signed(braid.circulationSense)).join("; ");
  return [
    ["Braid count", braids.length],
    ["Prescribed return period", coordinates.prescribedReturnPeriod],
    ...(flattening == null ? [] : [["Family-A flattening coordinate", flattening]]),
    ["Braid-center offsets", centers],
    ["Braid phase offsets", phases],
    ["Braid circulation senses", circulations],
    ["Coordinate status", coordinates.illustrativeCoordinates?.status],
  ];
}

function formatDegrees(radians) {
  const number = Number(radians);
  return Number.isFinite(number) ? `${format(number * 180 / Math.PI)}°` : null;
}

function signed(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? `+${format(number)}` : value;
}

export function borgCoRotatingCameraAvailable(carrier) {
  return Boolean(typeof carrier === "function" ? carrier() : carrier);
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
