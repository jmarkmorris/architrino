import {
  createBorgAssemblyViewPresentation,
  resolveBorgAssemblyViewTrail,
} from "./BorgAssemblyViewSession.js";

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
  onExport,
}) {
  const listeners = [];

  function listen(element, type, handler) {
    element.addEventListener(type, handler);
    listeners.push(() => element.removeEventListener?.(type, handler));
  }

  function render() {
    const entry = session.selected;
    const presentation = createBorgAssemblyViewPresentation(entry);
    dom.controls.hidden = false;
    dom.dateChip.hidden = false;
    dom.dateChip.textContent = presentation.provenance.date;
    dom.dateChip.title = `Record date ${presentation.provenance.date}`;
    const prescribedGeometry = presentation.provenance.prescribedGeometry;
    const taxonomy = prescribedGeometry?.taxonomy;
    renderFieldRows(documentLike, dom.provenance, [
      [prescribedGeometry ? "Geometry source" : "Engine", `${presentation.provenance.engineId} ${presentation.provenance.engineVersion}`],
      ...(taxonomy ? [
        ["Braid family", taxonomy.familyLabel],
        ["Candidate", taxonomy.displayLabel],
        ["Member definition", `${taxonomy.memberId} — ${taxonomy.memberLabel}`],
        ...(taxonomy.instantiationLabel ? [["Instantiation", taxonomy.instantiationLabel]] : []),
        ["Canon source", taxonomy.canonSource],
      ] : []),
      ...prescribedCoordinateRows(prescribedGeometry),
      ["Physics invoked", prescribedGeometry ? "no — prescribed chart arithmetic only" : "see source engine provenance"],
      ["Run id", presentation.provenance.runId],
      ["Generating specification", presentation.provenance.generatingSpec],
      ["Coverage", `${presentation.coverage.start} to ${presentation.coverage.end}`],
      ["Delay horizon h", presentation.delayHorizon],
    ]);
    dom.recordControl.hidden = session.records.length < 2;
    dom.collectionTools.hidden = session.records.length < 2;
    renderRecordOptions();
    renderFilterOptions();
    renderComparisonOptions();
    renderBinaryGeometryTable(documentLike, dom.binaryGeometryTable, presentation.binaryRows);
    renderOverlayRows(presentation);

    dom.cameraMode.value = "free";
    const trail = resolveBorgAssemblyViewTrail(entry);
    dom.trailSummary.textContent = trail.periodCount == null
      ? `Trail depth: ${format(trail.duration)} recorded time units.`
      : `Trail: ${trail.periodCount} complete prescribed return cycle${trail.periodCount === 1 ? "" : "s"} (${format(trail.duration)} recorded time units).`;
    dom.cameraMode.querySelector?.('option[value="co-rotating"]')?.toggleAttribute?.(
      "disabled",
      trail.period == null || !hasPlaneNormal(entry),
    );
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
    const displayedValue = value && typeof value === "object" && !Array.isArray(value)
      ? value.text
      : value;
    valueElement.textContent = format(displayedValue);
    if (value && typeof value === "object" && value.title) {
      valueElement.title = value.title;
    }
    row.append(labelElement, valueElement);
    container.append(row);
  });
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
