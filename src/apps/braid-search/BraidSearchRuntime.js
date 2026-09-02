import {
  ACTIVE_CANDIDATE_DISPOSITION,
  COMPACT_SWEEP_METRICS,
  DEPRECATED_CONTROL_DISPOSITION,
  HIGH_LEVEL_GATE_DEFINITIONS,
  SURFACE_GATE_DEFINITIONS,
  buildBraidEvidenceIndex,
  buildEvaluationFunnel,
  caseResidualDetail,
  filterCompactSweepCaseRows,
  filterCompactSweepRows,
  groupRows,
  median,
  metricValue,
  pearsonCorrelation,
  summarizeDistribution,
  summarizeGate,
  validateHistoricalCompactArchive,
  validateCompactSweepDashboardData,
} from "./BraidSearchData.js";
import { createStandaloneAppNavigationRuntime } from "../navigator/StandaloneAppNavigationRuntime.js";
import {
  BORG_SELECTION_SCHEMA,
  buildBorgLibraryHref,
  buildBorgWorkbenchHref,
  resolveBorgLibraryReturnHref,
} from "../shared/BorgSelectionNavigation.mjs";
import {
  persistBraidSearchRouteState,
  readBraidSearchRouteState,
} from "./BraidSearchRouteState.mjs";

const SVG_NS = "http://www.w3.org/2000/svg";
const DEFAULT_VIEW_ID = "evidence";
const CASE_PAGE_SIZE = 50;

const VIEW_DEFINITIONS = Object.freeze([
  ["evidence", "Evidence records"],
  ["funnel", "Evaluation funnel"],
  ["gates", "Gate heatmap"],
  ["metrics", "Metric distributions"],
  ["parameters", "Parameter explorer"],
  ["performance", "Performance"],
  ["cases", "Case detail"],
].map(([id, label]) => Object.freeze({ id, label })));

function element(tagName, className = "", textContent = null) {
  const node = document.createElement(tagName);
  if (className) node.className = className;
  if (textContent != null) node.textContent = String(textContent);
  return node;
}

function svgElement(tagName, attributes = {}) {
  const node = document.createElementNS(SVG_NS, tagName);
  Object.entries(attributes).forEach(([key, value]) => {
    node.setAttribute(key, String(value));
  });
  return node;
}

function append(parent, ...children) {
  children.flat().filter(Boolean).forEach((child) => parent.appendChild(child));
  return parent;
}

function formatInteger(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function formatNumber(value, digits = 4) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "—";
  if (number === 0) return "0";
  const magnitude = Math.abs(number);
  if (magnitude >= 10_000 || magnitude < 0.001) {
    return number.toExponential(Math.max(1, digits - 1));
  }
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(number);
}

function formatExactNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? String(number) : "—";
}

function formatPercent(value, digits = 1) {
  const number = Number(value);
  return Number.isFinite(number)
    ? `${(number * 100).toFixed(digits)}%`
    : "—";
}

function ratioText(count, denominator) {
  return `${formatInteger(count)}/${formatInteger(denominator)} ` +
    `(${denominator === 0 ? "—" : formatPercent(count / denominator)})`;
}

function metricDefinition(metricId) {
  return COMPACT_SWEEP_METRICS.find((metric) => metric.id === metricId) ??
    COMPACT_SWEEP_METRICS[0];
}

function panel({
  title,
  kicker = "",
  description = "",
  descriptionClassName = "",
  actions = null,
} = {}) {
  const wrapper = element("section", "compact-dashboard-panel");
  const header = element("header", "compact-dashboard-panel-header");
  const titleBlock = element("div");
  if (kicker) {
    titleBlock.appendChild(
      element("div", "compact-dashboard-panel-kicker", kicker),
    );
  }
  titleBlock.appendChild(element("h2", "", title));
  if (description) {
    titleBlock.appendChild(
      element("p", descriptionClassName, description),
    );
  }
  append(header, titleBlock, actions);
  const body = element("div", "compact-dashboard-panel-body");
  append(wrapper, header, body);
  return { wrapper, body, header };
}

function insight(label, value, detail) {
  const card = element("article", "compact-dashboard-insight");
  append(
    card,
    element("span", "compact-dashboard-label", label),
    element("strong", "", value),
    element("p", "", detail),
  );
  return card;
}

function selectControl({ id, label, options, value, onChange }) {
  const wrapper = element("div", "compact-dashboard-filter");
  const labelNode = element("label", "", label);
  labelNode.htmlFor = id;
  const select = element("select");
  select.id = id;
  options.forEach((option) => {
    const optionNode = element("option", "", option.label);
    optionNode.value = option.value;
    optionNode.selected = option.value === value;
    select.appendChild(optionNode);
  });
  select.addEventListener("change", () => onChange(select.value));
  append(wrapper, labelNode, select);
  return { wrapper, select };
}

function table(headings) {
  const tableNode = element("table", "compact-dashboard-table");
  const head = element("thead");
  const row = element("tr");
  headings.forEach((heading) => {
    const cell = element("th", "", heading);
    cell.scope = "col";
    row.appendChild(cell);
  });
  append(head, row);
  append(tableNode, head, element("tbody"));
  return tableNode;
}

function emptyState(message) {
  return element("div", "compact-dashboard-empty", message);
}

function filteredRows(state) {
  const rows = filterCompactSweepRows(state.data?.rows ?? [], state.filters);
  if (!state.filters.modelRevisionSha256) return rows;
  return rows.filter((row) =>
    row.modelRevisionSha256 === state.filters.modelRevisionSha256);
}

function assemblyOptions(data, selectedAssemblyId = "all") {
  const assemblyIds = [...new Set(data.rows.map((row) => row.assemblyId))]
    .sort();
  if (selectedAssemblyId !== "all" &&
      !assemblyIds.includes(selectedAssemblyId)) {
    assemblyIds.unshift(selectedAssemblyId);
  }
  return [
    { value: "all", label: "All assemblies" },
    ...assemblyIds.map((assemblyId) => ({
      value: assemblyId,
      label: assemblyId === selectedAssemblyId &&
        !data.rows.some((row) => row.assemblyId === assemblyId)
        ? `Assembly ${assemblyId} · no campaign rows`
        : `Assembly ${assemblyId}`,
    })),
  ];
}

function configurationOptions(
  data,
  assemblyId,
  modelRevisionSha256,
  candidateDisposition,
) {
  const configurations = [...new Set(data.rows
    .filter((row) =>
      (assemblyId === "all" || row.assemblyId === assemblyId) &&
      (!modelRevisionSha256 ||
        row.modelRevisionSha256 === modelRevisionSha256) &&
      (candidateDisposition === "all" ||
        row.candidateDisposition === candidateDisposition))
    .map((row) => row.sourceSlug))]
    .sort((left, right) =>
      left.localeCompare(right, undefined, { numeric: true }));
  return [
    { value: "all", label: "All configurations" },
    ...configurations.map((sourceSlug) => ({ value: sourceSlug, label: sourceSlug })),
  ];
}

function dispositionOptions() {
  return [
    {
      value: ACTIVE_CANDIDATE_DISPOSITION,
      label: "Active candidates",
    },
    {
      value: DEPRECATED_CONTROL_DISPOSITION,
      label: "Deprecated controls",
    },
    { value: "all", label: "All retained rows" },
  ];
}

function funnelStep(label, count, denominator, detail, className = "") {
  const card = element(
    "article",
    `compact-dashboard-funnel-step ${className}`.trim(),
  );
  append(
    card,
    element("span", "compact-dashboard-label", label),
    element("strong", "", formatInteger(count)),
    element(
      "span",
      "",
      denominator === 0 ? "—" : formatPercent(count / denominator),
    ),
    element("small", "", detail),
  );
  return card;
}

function renderFunnel(state) {
  const rows = filteredRows(state);
  const funnel = buildEvaluationFunnel(rows);
  const view = element("div", "compact-dashboard-view");
  const main = panel({
    kicker: "Exact denominators",
    title: "Evaluation funnel",
    description:
      "Drawn-not-evaluated rows never receive a compact score. Gate-failed and compact-passed counts use evaluated rows as their denominator.",
  });
  const flow = element("div", "compact-dashboard-funnel");
  append(
    flow,
    funnelStep(
      "Drawn",
      funnel.drawn,
      funnel.drawn,
      "Retained constraint-preserving samples.",
    ),
    funnelStep(
      "Evaluated",
      funnel.evaluated,
      funnel.drawn,
      "Reached a compact score.",
    ),
    funnelStep(
      "Drawn, not evaluated",
      funnel.drawnNotEvaluated,
      funnel.drawn,
      "Analytical rows not advanced because verification ended early.",
      "is-failure",
    ),
    funnelStep(
      "Gate failed",
      funnel.gateFailed,
      funnel.evaluated,
      "Evaluated rows whose compact gate set failed.",
      "is-failure",
    ),
    funnelStep(
      "Compact passed",
      funnel.compactPassed,
      funnel.evaluated,
      "Compact diagnostic outcome only.",
      "is-pass",
    ),
  );
  main.body.appendChild(flow);
  view.appendChild(main.wrapper);

  const reasons = panel({
    kicker: "Null-score classes",
    title: "Event convergence and minimum separation",
  });
  const reasonGrid = element("div", "compact-dashboard-reason-grid");
  append(
    reasonGrid,
    insight(
      "Event convergence",
      formatInteger(funnel.eventConvergenceFailures),
      (funnel.drawnNotEvaluated === 0
        ? "—"
        : formatPercent(
            funnel.eventConvergenceFailures / funnel.drawnNotEvaluated,
          )) + " of null-score rows.",
    ),
    insight(
      "Minimum separation",
      formatInteger(funnel.minimumSeparationFailures),
      (funnel.drawnNotEvaluated === 0
        ? "—"
        : formatPercent(
            funnel.minimumSeparationFailures / funnel.drawnNotEvaluated,
          )) + " of null-score rows.",
    ),
    insight(
      "Other",
      formatInteger(funnel.otherNotEvaluated),
      (funnel.drawnNotEvaluated === 0
        ? "—"
        : formatPercent(
            funnel.otherNotEvaluated / funnel.drawnNotEvaluated,
          )) + " of null-score rows.",
    ),
  );
  reasons.body.appendChild(reasonGrid);
  view.appendChild(reasons.wrapper);
  return view;
}

function gateCell(summary, definition) {
  const passRate = summary.passRate;
  const className = summary.denominator === 0
    ? ""
    : summary.passCount === summary.denominator
      ? "is-pass"
      : summary.passCount === 0
        ? "is-fail"
        : "is-mixed";
  const cell = element(
    "td",
    `compact-dashboard-heatmap-cell ${className}`.trim(),
  );
  const symbol = summary.denominator === 0
    ? "—"
    : summary.passCount === summary.denominator
      ? "✓"
      : summary.passCount === 0
        ? "✕"
        : "◐";
  const ratio = summary.medianThresholdRatio;
  append(
    cell,
    element(
      "strong",
      "",
      summary.denominator === 0
        ? "— not evaluated"
        : `${symbol} ${ratioText(summary.passCount, summary.denominator)}`,
    ),
    element(
      "small",
      "",
      summary.denominator === 0
        ? "0 pass · 0 fail"
        : ratio == null
        ? `${summary.failureCount} failed`
        : `${summary.failureCount} failed · median ratio ${formatNumber(ratio, 3)}`,
    ),
  );
  cell.title = `${definition.label}: ${definition.definition} ` +
    `Exact denominator ${summary.denominator}; pass count ` +
    `${summary.passCount}; failure count ${summary.failureCount}; pass rate ` +
    `${formatPercent(passRate)}; median threshold ratio ` +
    `${ratio == null ? "not applicable" : formatNumber(ratio, 6)}.`;
  cell.setAttribute("aria-label", cell.title);
  return cell;
}

function renderGates(state) {
  const rows = filteredRows(state);
  const view = element("div", "compact-dashboard-view");
  const heatmap = panel({
    kicker: "Color plus text",
    title: "Configuration-by-gate heatmap",
    description:
      "Every cell includes a symbol, pass/denominator, pass rate, failure count, and—where a positive numerical threshold exists—the median observed-to-threshold ratio. Hover or focus context is repeated in the cell's accessible label.",
  });
  if (rows.length === 0) {
    heatmap.body.appendChild(emptyState("No rows match the current filter."));
    view.appendChild(heatmap.wrapper);
    return view;
  }
  const definitions = [
    ...HIGH_LEVEL_GATE_DEFINITIONS.map((definition) => ({
      ...definition,
      kind: "highLevel",
    })),
    ...SURFACE_GATE_DEFINITIONS.map((definition) => ({
      ...definition,
      kind: "surfaceQuadrature",
    })),
  ];
  const tableNode = table([
    "Configuration",
    ...definitions.map((definition) => definition.label),
  ]);
  tableNode.classList.add("compact-dashboard-heatmap-table");
  const body = tableNode.tBodies[0];
  groupRows(rows, "sourceSlug").forEach(([sourceSlug, configurationRows]) => {
    const row = element("tr");
    const heading = element("th", "", sourceSlug);
    heading.scope = "row";
    row.appendChild(heading);
    definitions.forEach((definition) => {
      row.appendChild(gateCell(
        summarizeGate(configurationRows, definition.kind, definition.id),
        definition,
      ));
    });
    body.appendChild(row);
  });
  const wrap = element("div", "compact-dashboard-table-wrap");
  wrap.tabIndex = 0;
  wrap.setAttribute(
    "aria-label",
    "Scrollable configuration-by-gate heatmap table",
  );
  wrap.appendChild(tableNode);
  heatmap.body.appendChild(wrap);
  view.appendChild(heatmap.wrapper);

  const totals = panel({
    kicker: "Filtered totals",
    title: "Gate summary",
    description:
      "Surface subgate pass status requires the numerical threshold and, where declared, identity matching.",
  });
  const summaryTable = table([
    "Gate",
    "Pass",
    "Failure",
    "Denominator",
    "Pass rate",
    "Median threshold ratio",
  ]);
  definitions.forEach((definition) => {
    const summary = summarizeGate(
      rows,
      definition.kind,
      definition.id,
    );
    const row = element("tr");
    [
      definition.label,
      formatInteger(summary.passCount),
      formatInteger(summary.failureCount),
      formatInteger(summary.denominator),
      formatPercent(summary.passRate),
      formatNumber(summary.medianThresholdRatio, 4),
    ].forEach((value) => row.appendChild(element("td", "", value)));
    row.cells[0].title = definition.definition;
    summaryTable.tBodies[0].appendChild(row);
  });
  const summaryWrap = element("div", "compact-dashboard-table-wrap");
  append(summaryWrap, summaryTable);
  append(totals.body, summaryWrap);
  view.appendChild(totals.wrapper);
  return view;
}

function logDomain(values) {
  const positive = values.filter((value) =>
    Number.isFinite(value) && value > 0);
  if (positive.length === 0) return null;
  const minimumPositive = Math.min(...positive);
  const maximum = Math.max(...positive);
  const floor = minimumPositive / 10;
  return {
    floor,
    minimum: floor,
    maximum: maximum === floor ? floor * 10 : maximum,
  };
}

function logScale(value, domain, left, width) {
  const effective = Number(value) > 0 ? Number(value) : domain.floor;
  const minimum = Math.log10(domain.minimum);
  const maximum = Math.log10(domain.maximum);
  return left + ((Math.log10(effective) - minimum) /
    Math.max(maximum - minimum, 1e-12)) * width;
}

function createBoxPlot(groups, metricId) {
  const summaries = groups.map(([label, rows]) => ({
    label,
    summary: summarizeDistribution(rows.map((row) =>
      metricValue(row, metricId))),
  })).filter((entry) => entry.summary.count > 0);
  const values = summaries.flatMap((entry) => [
    entry.summary.minimum,
    entry.summary.q1,
    entry.summary.median,
    entry.summary.q3,
    entry.summary.maximum,
  ]);
  const domain = logDomain(values);
  if (!domain) return null;
  const width = 980;
  const left = 155;
  const right = 30;
  const plotWidth = width - left - right;
  const rowHeight = 42;
  const top = 38;
  const height = top + summaries.length * rowHeight + 32;
  const svg = svgElement("svg", {
    class: "compact-dashboard-chart",
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-label":
      `${metricDefinition(metricId).label} log-scale box and quantile plot`,
  });
  const ticks = 6;
  for (let index = 0; index < ticks; index += 1) {
    const proportion = index / (ticks - 1);
    const x = left + proportion * plotWidth;
    const value = 10 ** (
      Math.log10(domain.minimum) +
      proportion * (Math.log10(domain.maximum) - Math.log10(domain.minimum))
    );
    append(
      svg,
      svgElement("line", {
        x1: x,
        x2: x,
        y1: top - 12,
        y2: height - 24,
        class: "chart-grid",
      }),
    );
    const label = svgElement("text", {
      x,
      y: 16,
      "text-anchor": "middle",
    });
    label.textContent = formatNumber(value, 2);
    svg.appendChild(label);
  }
  summaries.forEach((entry, index) => {
    const y = top + index * rowHeight + rowHeight / 2;
    const positions = Object.fromEntries(
      ["minimum", "q1", "median", "q3", "maximum"].map((key) => [
        key,
        logScale(entry.summary[key], domain, left, plotWidth),
      ]),
    );
    const label = svgElement("text", {
      x: left - 12,
      y: y + 4,
      "text-anchor": "end",
    });
    label.textContent = `${entry.label} · n=${entry.summary.count}`;
    svg.appendChild(label);
    append(
      svg,
      svgElement("line", {
        x1: positions.minimum,
        x2: positions.maximum,
        y1: y,
        y2: y,
        class: "chart-whisker",
      }),
      svgElement("line", {
        x1: positions.minimum,
        x2: positions.minimum,
        y1: y - 6,
        y2: y + 6,
        class: "chart-whisker",
      }),
      svgElement("line", {
        x1: positions.maximum,
        x2: positions.maximum,
        y1: y - 6,
        y2: y + 6,
        class: "chart-whisker",
      }),
      svgElement("rect", {
        x: positions.q1,
        y: y - 10,
        width: Math.max(1, positions.q3 - positions.q1),
        height: 20,
        rx: 3,
        class: "chart-box",
      }),
      svgElement("line", {
        x1: positions.median,
        x2: positions.median,
        y1: y - 10,
        y2: y + 10,
        class: "chart-median",
      }),
    );
  });
  return { svg, summaries, domain };
}

function distributionTable(plot) {
  const tableNode = table([
    "Group",
    "n",
    "Minimum",
    "Q1",
    "Median",
    "Q3",
    "Maximum",
  ]);
  plot.summaries.forEach((entry) => {
    const row = element("tr");
    [
      entry.label,
      entry.summary.count,
      entry.summary.minimum,
      entry.summary.q1,
      entry.summary.median,
      entry.summary.q3,
      entry.summary.maximum,
    ].forEach((value, index) => {
      row.appendChild(element(
        "td",
        "",
        index < 2 ? String(value) : formatNumber(value, 5),
      ));
    });
    tableNode.tBodies[0].appendChild(row);
  });
  return tableNode;
}

function renderMetrics(state) {
  const rows = filteredRows(state);
  const view = element("div", "compact-dashboard-view");
  const controls = element("div", "compact-dashboard-toolbar");
  const metricControl = selectControl({
    id: "compact-dashboard-metric",
    label: "Metric",
    value: state.metricId,
    options: COMPACT_SWEEP_METRICS.map((metric) => ({
      value: metric.id,
      label: `${metric.label} · ${metric.symbol}`,
    })),
    onChange(value) {
      state.metricId = value;
      renderView(state);
    },
  });
  const groupControl = selectControl({
    id: "compact-dashboard-metric-group",
    label: "Group distributions by",
    value: state.metricGroup,
    options: [
      { value: "sourceSlug", label: "Configuration" },
      { value: "assemblyId", label: "Assembly" },
    ],
    onChange(value) {
      state.metricGroup = value;
      renderView(state);
    },
  });
  append(controls, metricControl.wrapper, groupControl.wrapper);
  const metric = metricDefinition(state.metricId);
  const distributions = panel({
    kicker: "Distribution",
    title: metric.label,
    description:
      `${metric.definition} ${metric.direction}. The line in each box is the ` +
      "median, and the box covers the middle half of the values. The scale is " +
      "logarithmic because the values span a wide range. Zero appears one " +
      "step below the smallest positive value so it remains visible.",
    actions: controls,
  });
  const plot = createBoxPlot(
    groupRows(rows, state.metricGroup),
    state.metricId,
  );
  if (!plot) {
    distributions.body.appendChild(
      emptyState("No finite metric values match the current filter."),
    );
  } else {
    const chartWrap = element("div", "compact-dashboard-chart-wrap");
    chartWrap.appendChild(plot.svg);
    const tableWrap = element("div", "compact-dashboard-table-wrap");
    tableWrap.appendChild(distributionTable(plot));
    append(
      distributions.body,
      element(
        "div",
        "compact-dashboard-chart-summary",
        `${formatInteger(plot.summaries.reduce(
          (sum, entry) => sum + entry.summary.count,
          0,
        ))} evaluated metric values · log scale`,
      ),
      chartWrap,
      tableWrap,
    );
  }
  view.appendChild(distributions.wrapper);

  const correlation = panel({
    kicker: "Pairwise descriptive statistic",
    title: "eta_ext and eta_W_flux",
    description:
      "Pearson r is computed only for filtered evaluated rows that retain both compact diagnostic values. Correlation is descriptive and does not establish a common physical mechanism.",
    descriptionClassName: "compact-dashboard-nowrap",
  });
  const pairs = rows.map((row) => [
    row.metrics.externalExposureFraction,
    row.metrics.wakeFluxFraction,
  ]);
  const r = pearsonCorrelation(pairs);
  correlation.body.appendChild(insight(
    "Filtered correlation",
    `r = ${formatNumber(r, 4)}`,
    `${pairs.filter(([left, right]) =>
      Number.isFinite(left) && Number.isFinite(right)).length} paired rows.`,
  ));
  view.appendChild(correlation.wrapper);
  return view;
}

function parameterDefinitions(rows) {
  const definitions = [
    {
      id: "geometryScale",
      label: "Geometry scale",
      disposition: "continuously valued, intentionally stratified coordinate",
      value: (row) => row.sampledCoordinates.geometryScale,
    },
    {
      id: "translationSpeed",
      label: "Group speed",
      disposition: "continuously valued, intentionally stratified coordinate",
      value: (row) => row.sampledCoordinates.translationSpeed,
    },
    {
      id: "threeAxisFrameFlattening",
      label: "Assembly-A flattening",
      disposition: "Assembly-A-only continuous stratified coordinate",
      value: (row) => row.sampledCoordinates.threeAxisFrameFlattening,
    },
    {
      id: "coaxialComponentSpacingScale",
      label: "Assembly-C spacing scale",
      disposition: "Assembly-C-only continuous stratified coordinate",
      value: (row) => row.sampledCoordinates.coaxialComponentSpacingScale,
    },
  ];
  const vectorAxes = [
    ["frequencies", "Frequency", 6,
      "discrete harmonic choice inside a stratified draw"],
    ["radii", "Radius", 6,
      "continuously valued, intentionally stratified coordinate"],
    ["axialFractions", "Axial fraction", 6,
      "continuously valued, intentionally stratified coordinate"],
    ["coincidentCenterAxialSpacings", "General-C axial gap", 11,
      "general Assembly-C-only continuous stratified coordinate"],
  ];
  vectorAxes.forEach(([key, label, maximum, disposition]) => {
    for (let index = 0; index < maximum; index += 1) {
      const hasValue = rows.some((row) => {
        const entry = row.sampledCoordinates[key]?.[index];
        return Number.isFinite(entry?.value ?? entry);
      });
      if (!hasValue) continue;
      definitions.push({
        id: `${key}.${index}`,
        label: `${label} ${index + 1}`,
        disposition,
        value(row) {
          const entry = row.sampledCoordinates[key]?.[index];
          const value = entry?.value ?? entry;
          return Number.isFinite(value) ? value : null;
        },
      });
    }
  });
  definitions.push(
    {
      id: "circulationSenses",
      label: "Circulation signature",
      disposition: "intentionally discrete categorical coordinate",
      categorical: true,
      value: (row) => row.sampledCoordinates.circulationSenses.join(" / "),
    },
    {
      id: "polarityAssignments",
      label: "Polarity signature",
      disposition: "intentionally discrete categorical coordinate",
      categorical: true,
      value: (row) => row.sampledCoordinates.polarityAssignments
        .map((entry) => entry.value).join(" / "),
    },
    {
      id: "orbitOrder",
      label: "Orbit order",
      disposition: "intentionally discrete categorical coordinate",
      categorical: true,
      value: (row) => row.sampledCoordinates.orbitOrder.join(" → "),
    },
  );
  return definitions;
}

function openCase(state, row, { preserveQuery = false } = {}) {
  if (!preserveQuery) {
    state.caseConfigurationId = row.sourceSlug;
    state.caseQuery = "";
    state.caseSampleOrdinal = String(row.sampleOrdinal);
    state.casePage = 0;
  }
  state.selectedCaseKey = row.rowKey;
  state.viewId = "cases";
  syncTabs(state);
  renderView(state);
  state.viewContainer
    .querySelector(".compact-dashboard-case-detail h3")
    ?.focus();
}

function createScatterPlot(points, parameter, metric) {
  if (points.length === 0) return null;
  const width = 980;
  const height = 520;
  const left = 90;
  const right = 30;
  const top = 35;
  const bottom = 70;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const categories = parameter.categorical
    ? [...new Set(points.map((point) => point.rawX))].sort()
    : [];
  const numericX = parameter.categorical
    ? points.map((point) => categories.indexOf(point.rawX))
    : points.map((point) => point.rawX);
  const xMinimum = Math.min(...numericX);
  const xMaximum = Math.max(...numericX);
  const metricDomain = logDomain(points.map((point) => point.y));
  if (!metricDomain) return null;
  const xScale = (value) => {
    const numeric = parameter.categorical
      ? categories.indexOf(value)
      : Number(value);
    return left + (
      xMaximum === xMinimum
        ? 0.5
        : (numeric - xMinimum) / (xMaximum - xMinimum)
    ) * plotWidth;
  };
  const yScale = (value) =>
    top + plotHeight -
    (logScale(value, metricDomain, 0, plotHeight));
  const svg = svgElement("svg", {
    class: "compact-dashboard-chart",
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-label":
      `${parameter.label} scatterplot against ${metric.label}`,
  });
  for (let index = 0; index < 6; index += 1) {
    const proportion = index / 5;
    const y = top + plotHeight - proportion * plotHeight;
    const value = 10 ** (
      Math.log10(metricDomain.minimum) +
      proportion * (
        Math.log10(metricDomain.maximum) -
        Math.log10(metricDomain.minimum)
      )
    );
    append(svg, svgElement("line", {
      x1: left,
      x2: width - right,
      y1: y,
      y2: y,
      class: "chart-grid",
    }));
    const label = svgElement("text", {
      x: left - 10,
      y: y + 4,
      "text-anchor": "end",
    });
    label.textContent = formatNumber(value, 2);
    svg.appendChild(label);
  }
  const xTickValues = parameter.categorical
    ? categories
    : Array.from({ length: 6 }, (_, index) =>
        xMinimum + (index / 5) * (xMaximum - xMinimum));
  xTickValues.forEach((value) => {
    const x = xScale(value);
    append(svg, svgElement("line", {
      x1: x,
      x2: x,
      y1: top,
      y2: top + plotHeight,
      class: "chart-grid",
    }));
    const label = svgElement("text", {
      x,
      y: top + plotHeight + 18,
      "text-anchor": "middle",
    });
    const rawLabel = parameter.categorical
      ? String(value)
      : formatNumber(value, 3);
    label.textContent = rawLabel.length > 18
      ? `${rawLabel.slice(0, 16)}…`
      : rawLabel;
    const title = svgElement("title");
    title.textContent = rawLabel;
    label.appendChild(title);
    svg.appendChild(label);
  });
  append(
    svg,
    svgElement("line", {
      x1: left,
      x2: left,
      y1: top,
      y2: top + plotHeight,
      class: "chart-axis",
    }),
    svgElement("line", {
      x1: left,
      x2: width - right,
      y1: top + plotHeight,
      y2: top + plotHeight,
      class: "chart-axis",
    }),
  );
  points.forEach((point) => {
    const circle = svgElement("circle", {
      cx: xScale(point.rawX),
      cy: yScale(point.y),
      r: 4.5,
      class: `chart-point assembly-${point.row.assemblyId}`,
      tabindex: 0,
      role: "button",
      "aria-label":
        `${point.row.sourceSlug}, ${parameter.label} ` +
        `${String(point.rawX)}, ${metric.label} ${formatNumber(point.y, 7)}; ` +
        `open case ${point.row.caseId}`,
    });
    const title = svgElement("title");
    title.textContent =
      `${point.row.sourceSlug} · ${point.row.caseId}\n` +
      `${parameter.label}: ${String(point.rawX)}\n` +
      `${metric.label}: ${formatNumber(point.y, 7)}`;
    circle.appendChild(title);
    const inspect = () => point.onOpen(point.row);
    circle.addEventListener("click", inspect);
    circle.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        inspect();
      }
    });
    svg.appendChild(circle);
  });
  return { svg, categories, metricDomain };
}

function renderParameters(state) {
  const rows = filteredRows(state);
  const definitions = parameterDefinitions(rows);
  if (!definitions.some((definition) =>
    definition.id === state.parameterId)) {
    state.parameterId = definitions[0]?.id ?? "geometryScale";
  }
  const parameter = definitions.find((definition) =>
    definition.id === state.parameterId);
  const metric = metricDefinition(state.parameterMetricId);
  const view = element("div", "compact-dashboard-view");
  const controls = element("div", "compact-dashboard-toolbar");
  const parameterControl = selectControl({
    id: "compact-dashboard-parameter",
    label: "Sampled coordinate",
    value: state.parameterId,
    options: definitions.map((definition) => ({
      value: definition.id,
      label: definition.label,
    })),
    onChange(value) {
      state.parameterId = value;
      renderView(state);
    },
  });
  const metricControl = selectControl({
    id: "compact-dashboard-parameter-metric",
    label: "Compact metric",
    value: state.parameterMetricId,
    options: COMPACT_SWEEP_METRICS.map((definition) => ({
      value: definition.id,
      label: definition.label,
    })),
    onChange(value) {
      state.parameterMetricId = value;
      renderView(state);
    },
  });
  append(controls, parameterControl.wrapper, metricControl.wrapper);
  const explorer = panel({
    kicker: "Sampled coordinates",
    title: `${parameter?.label ?? "Parameter"} vs. ${metric.label}`,
    description:
      `${parameter?.disposition ?? ""}. ${metric.definition} ` +
      "The metric axis is logarithmic. Points are rows, not inferred continuous assembly behavior.",
    actions: controls,
  });
  const points = rows.flatMap((row) => {
    const rawX = parameter?.value(row);
    const y = metricValue(row, state.parameterMetricId);
    const hasX = parameter?.categorical
      ? typeof rawX === "string" && rawX.length > 0
      : Number.isFinite(rawX);
    return hasX && Number.isFinite(y)
      ? [{
          rawX,
          y,
          row,
          onOpen(selectedRow) {
            openCase(state, selectedRow);
          },
        }]
      : [];
  });
  const plot = createScatterPlot(points, parameter, metric);
  if (!plot) {
    explorer.body.appendChild(
      emptyState("No evaluated rows retain both selected values."),
    );
  } else {
    const summary = element("div", "compact-dashboard-chart-summary");
    append(
      summary,
      element("span", "", `${formatInteger(points.length)} plotted rows`),
      element(
        "span",
        "compact-dashboard-badge is-warning",
        parameter.disposition,
      ),
      element("span", "", "Click or press Enter on a point for case drilldown."),
    );
    const chartWrap = element("div", "compact-dashboard-chart-wrap");
    chartWrap.appendChild(plot.svg);
    const valuesTable = table([
      "Configuration",
      "Case",
      parameter.label,
      metric.label,
      "Inspect",
    ]);
    points.slice(0, 100).forEach((point) => {
      const row = element("tr");
      [
        point.row.sourceSlug,
        point.row.caseId,
        String(point.rawX),
        formatNumber(point.y, 7),
      ].forEach((value) => row.appendChild(element("td", "", value)));
      const actionCell = element("td");
      const inspectButton = element(
        "button",
        "compact-dashboard-button",
        "Open case",
      );
      inspectButton.type = "button";
      inspectButton.setAttribute(
        "aria-label",
        `Open case detail for ${point.row.caseId}`,
      );
      inspectButton.addEventListener("click", () => {
        openCase(state, point.row);
      });
      actionCell.appendChild(inspectButton);
      row.appendChild(actionCell);
      valuesTable.tBodies[0].appendChild(row);
    });
    const tableWrap = element("div", "compact-dashboard-table-wrap");
    tableWrap.appendChild(valuesTable);
    append(
      explorer.body,
      summary,
      chartWrap,
      element(
        "p",
        "compact-dashboard-note",
        points.length > 100
          ? `Text table shows the first 100 of ${points.length} plotted rows in deterministic row order.`
          : "Text table accompanies every plotted row.",
      ),
      tableWrap,
    );
  }
  view.appendChild(explorer.wrapper);
  return view;
}

function createPerformanceStrip(rows, valueKey) {
  const retained = rows.filter((row) =>
    Number.isFinite(row.performance?.[valueKey]));
  if (retained.length === 0) return null;
  const width = 980;
  const height = 360;
  const left = 70;
  const right = 25;
  const top = 48;
  const bottom = 55;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const values = retained.map((row) => row.performance[valueKey]);
  const maximum = Math.max(...values, 1);
  const svg = svgElement("svg", {
    class: "compact-dashboard-chart",
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-label":
      "Per-row measured cost grouped into labeled Assembly A, B, and C ranges, with null early exits distinct",
  });
  const xForIndex = (index) => left + (retained.length === 1
    ? plotWidth / 2
    : (index / (retained.length - 1)) * plotWidth);
  const assemblyRanges = [];
  retained.forEach((row, index) => {
    const previous = assemblyRanges.at(-1);
    if (!previous || previous.assemblyId !== row.assemblyId) {
      assemblyRanges.push({
        end: index,
        assemblyId: row.assemblyId,
        start: index,
      });
    } else {
      previous.end = index;
    }
  });
  assemblyRanges.forEach((range, index) => {
    const startX = xForIndex(range.start);
    const endX = xForIndex(range.end);
    if (index > 0) {
      const priorEndX = xForIndex(range.start - 1);
      svg.appendChild(svgElement("line", {
        x1: (priorEndX + startX) / 2,
        x2: (priorEndX + startX) / 2,
        y1: top - 10,
        y2: height - bottom,
        class: "chart-assembly-divider",
      }));
    }
    const label = svgElement("text", {
      x: (startX + endX) / 2,
      y: 20,
      "text-anchor": "middle",
      class: "chart-assembly-label",
    });
    label.textContent =
      `Assembly ${range.assemblyId} · ${range.end - range.start + 1} rows`;
    svg.appendChild(label);
  });
  for (let index = 0; index <= 5; index += 1) {
    const y = top + plotHeight - (index / 5) * plotHeight;
    append(svg, svgElement("line", {
      x1: left,
      x2: width - right,
      y1: y,
      y2: y,
      class: "chart-grid",
    }));
    const label = svgElement("text", {
      x: left - 10,
      y: y + 4,
      "text-anchor": "end",
    });
    label.textContent = formatNumber((index / 5) * maximum, 3);
    svg.appendChild(label);
  }
  retained.forEach((row, index) => {
    const x = xForIndex(index);
    const y = top + plotHeight -
      (row.performance[valueKey] / maximum) * plotHeight;
    const point = svgElement(
      row.performance.earlyExit ? "rect" : "circle",
      row.performance.earlyExit
        ? {
            x: x - 3.5,
            y: y - 3.5,
            width: 7,
            height: 7,
            transform: `rotate(45 ${x} ${y})`,
            class: "chart-early-exit",
          }
        : {
            cx: x,
            cy: y,
            r: 3.2,
            class: `chart-point assembly-${row.assemblyId}`,
          },
    );
    const title = svgElement("title");
    title.textContent =
      `${row.sourceSlug} · ${row.caseId}\n` +
      `${valueKey}: ${formatNumber(row.performance[valueKey], 7)} s\n` +
      `${row.performance.earlyExit ? "null early exit" : "evaluated"}`;
    point.appendChild(title);
    svg.appendChild(point);
  });
  const xLabel = svgElement("text", {
    x: left + plotWidth / 2,
    y: height - 12,
    "text-anchor": "middle",
  });
  xLabel.textContent =
    "Deterministic assembly/configuration/sample row order · red diamonds are null early exits";
  svg.appendChild(xLabel);
  return svg;
}

function groupedPerformanceTable(rows, groupKey, valueKey) {
  const tableNode = table([
    groupKey === "assemblyId"
      ? "Assembly"
      : groupKey === "waveId"
        ? "Wave"
        : "Configuration",
    "Rows",
    "Evaluated",
    "Null early exit",
    "Q1 seconds",
    "Median seconds",
    "Q3 seconds",
  ]);
  groupRows(rows, groupKey).forEach(([label, group]) => {
    const summary = summarizeDistribution(group.map((row) =>
      row.performance[valueKey]));
    const row = element("tr");
    [
      label,
      group.length,
      group.filter((item) => item.evaluation.evaluated).length,
      group.filter((item) => !item.evaluation.evaluated).length,
      formatNumber(summary.q1, 5),
      formatNumber(summary.median, 5),
      formatNumber(summary.q3, 5),
    ].forEach((value) => row.appendChild(element("td", "", value)));
    tableNode.tBodies[0].appendChild(row);
  });
  return tableNode;
}

function renderPerformance(state) {
  const rows = filteredRows(state);
  const view = element("div", "compact-dashboard-view");
  const controls = element("div", "compact-dashboard-toolbar");
  const valueControl = selectControl({
    id: "compact-dashboard-performance-value",
    label: "Measured per-row cost",
    value: state.performanceValue,
    options: [
      { value: "wallSeconds", label: "Wall time" },
      { value: "totalCpuSeconds", label: "Total CPU time" },
      { value: "userCpuSeconds", label: "User CPU time" },
      { value: "systemCpuSeconds", label: "System CPU time" },
    ],
    onChange(value) {
      state.performanceValue = value;
      renderView(state);
    },
  });
  append(controls, valueControl.wrapper);
  const rowCost = panel({
    kicker: "Measured cost",
    title: "Per-row performance",
    description:
      "Each point is one retained row. Red diamonds are null-score early exits; evaluated rows are colored by assembly. These timings are per-row measurements, not coordinator elapsed time.",
    actions: controls,
  });
  const strip = createPerformanceStrip(rows, state.performanceValue);
  if (strip) {
    const chartWrap = element("div", "compact-dashboard-chart-wrap");
    chartWrap.appendChild(strip);
    append(rowCost.body, chartWrap);
  } else {
    rowCost.body.appendChild(emptyState("No measured costs match the filter."));
  }
  view.appendChild(rowCost.wrapper);

  const assemblies = panel({
    kicker: "Distribution comparison",
    title: "Assembly and configuration cost distributions",
    description:
      "Assembly C has roughly twice the median row cost: about 1.8× Assembly A and 2.0× Assembly B in wall time for the sealed sweep.",
  });
  const assemblyWrap = element("div", "compact-dashboard-table-wrap");
  assemblyWrap.appendChild(
    groupedPerformanceTable(rows, "assemblyId", state.performanceValue),
  );
  const configurationWrap = element("div", "compact-dashboard-table-wrap");
  configurationWrap.appendChild(
    groupedPerformanceTable(rows, "sourceSlug", state.performanceValue),
  );
  append(
    assemblies.body,
    element("h3", "", "By assembly"),
    assemblyWrap,
    element("h3", "", "By configuration"),
    configurationWrap,
  );
  view.appendChild(assemblies.wrapper);

  const waves = panel({
    kicker: "Scheduling context",
    title: "Wave comparison",
    description:
      "Wave rows are compared by per-row timing. Static parallel scheduling can leave some workers idle after cheaper rows finish and can also increase contention while expensive Assembly-C rows overlap. Parallel shard wall times are not summed and relabeled as coordinator elapsed time.",
  });
  const waveWrap = element("div", "compact-dashboard-table-wrap");
  waveWrap.appendChild(
    groupedPerformanceTable(rows, "waveId", state.performanceValue),
  );
  append(
    waves.body,
    waveWrap,
    element(
      "p",
      "compact-dashboard-note",
      "The narrow 2,498/hour worker fixture is intentionally not reused as current full-exact-configuration throughput.",
    ),
  );
  view.appendChild(waves.wrapper);

  const early = rows.filter((row) => row.performance.earlyExit);
  const earlyPanel = panel({
    kicker: "Visually distinct exits",
    title: "Null early-exit timing rows",
    description:
      "These rows stopped before a compact score. Their shorter or longer cost does not share the same completed evaluation workload.",
  });
  if (early.length === 0) {
    earlyPanel.body.appendChild(emptyState("No null rows match the filter."));
  } else {
    const earlyTable = table([
      "Configuration",
      "Case",
      "Exit class",
      "Wall seconds",
      "CPU seconds",
    ]);
    early.forEach((item) => {
      const row = element("tr");
      [
        item.sourceSlug,
        item.caseId,
        item.evaluation.nullClass,
        formatNumber(item.performance.wallSeconds, 6),
        formatNumber(item.performance.totalCpuSeconds, 6),
      ].forEach((value) => row.appendChild(element("td", "", value)));
      earlyTable.tBodies[0].appendChild(row);
    });
    const wrap = element("div", "compact-dashboard-table-wrap");
    wrap.appendChild(earlyTable);
    earlyPanel.body.appendChild(wrap);
  }
  view.appendChild(earlyPanel.wrapper);
  return view;
}

function detailValue(list, label, value, { code = false } = {}) {
  list.appendChild(element("dt", "", label));
  const description = element("dd");
  const text = element(
    code ? "code" : "span",
    code ? "compact-dashboard-code" : "",
    value == null || value === "" ? "—" : value,
  );
  text.title = String(value ?? "");
  description.appendChild(text);
  list.appendChild(description);
}

function formatCoordinateValue(value) {
  if (value == null) return "—";
  if (!Array.isArray(value)) return formatExactNumber(value);
  if (value.length === 0) return "—";
  return value.map((entry) => {
    if (entry && typeof entry === "object") {
      return `${entry.id ?? "value"}: ${formatExactNumber(entry.value)}`;
    }
    return String(entry);
  }).join(" · ");
}

function renderCaseDetail(row, state) {
  const wrapper = element("div", "compact-dashboard-case-detail");
  if (!row) {
    wrapper.appendChild(
      emptyState("Choose a row from the table to inspect its exact case."),
    );
    return wrapper;
  }
  const residual = caseResidualDetail(row);
  const heading = element(
    "h3",
    "",
    `${row.sourceSlug} · sample ${row.sampleOrdinal}`,
  );
  heading.tabIndex = -1;
  append(
    wrapper,
    heading,
    element(
      "p",
      "compact-dashboard-selected-case",
      `Selected campaign row: ${row.waveId} · case hash ${
        row.caseHash.slice(0, 12)
      }…`,
    ),
    element(
      "span",
      `compact-dashboard-badge ${
        row.evaluation.evaluated ? "is-failure" : "is-warning"
      }`,
      row.evaluation.evaluated
        ? "evaluated diagnostic row"
        : "null early exit",
    ),
  );

  const returnTo = persistBraidSearchRouteState(
    state,
    state.locationLike,
    state.historyLike,
  );
  const borgActions = element("div", "compact-dashboard-borg-actions");
  const libraryLink = element(
    "a",
    "compact-dashboard-button",
    "Open related record in Borg",
  );
  libraryLink.href = buildBorgLibraryHref({
    selection: row.borgSelection,
    returnTo,
  });
  append(
    borgActions,
    libraryLink,
  );
  wrapper.appendChild(borgActions);

  const residualTable = table(["Field", "Exact value", "Meaning"]);
  [
    [
      "Signed-cycle residual",
      formatExactNumber(residual.signedCycleResidual),
      "Absolute net signed wake-flux integral after one complete cycle. Small means cancellation in the signed sum, not low total emission.",
    ],
    [
      "Signed-emission residual",
      formatExactNumber(residual.signedEmissionResidual),
      "Difference from the expected signed complete-cycle reference on its declared scale. This is not how much emission leaves.",
    ],
    [
      "Signed-emission threshold",
      formatExactNumber(residual.signedEmissionThreshold),
      "Declared numerical reference tolerance; residual at or below this value is within the diagnostic threshold.",
    ],
    [
      "Residual / threshold",
      formatExactNumber(residual.signedEmissionThresholdRatio),
      "The selected row's signed-emission residual divided by its threshold.",
    ],
    [
      "Subgate maximum",
      formatExactNumber(residual.signedEmissionGateMaximum),
      "Largest signed-emission reference residual across the case's retained surface rows.",
    ],
    [
      "Subgate maximum / threshold",
      formatExactNumber(residual.signedEmissionGateThresholdRatio),
      "The case-level signed-emission subgate ratio used by the gate summary.",
    ],
  ].forEach((values) => {
    const rowNode = element("tr");
    values.forEach((value) => rowNode.appendChild(element("td", "", value)));
    residualTable.tBodies[0].appendChild(rowNode);
  });
  const residualWrap = element("div", "compact-dashboard-table-wrap");
  residualWrap.appendChild(residualTable);
  append(
    wrapper,
    element("h4", "", "Complete-cycle residuals"),
    residualWrap,
    element(
      "p",
      "compact-dashboard-note",
      "The expected signed reference is the cycle period multiplied by the normalized signed source-polarity sum. Its scale also uses the expected raw reference: the cycle period multiplied by the normalized absolute source-polarity sum.",
    ),
    element(
      "p",
      "compact-dashboard-case-boundary",
      "A small signed-emission residual reports cancellation and agreement with the declared reference. It does not mean the candidate emits slowly or has low total emission, and it does not establish stability, retention, binding, energy closure, quantization, particle identity, catalog acceptance, or physical realization.",
    ),
  );

  const identities = element("dl", "compact-dashboard-detail-grid");
  [
    ["Case ID", row.caseId],
    ["Candidate ID", row.candidateId],
    ["Campaign ID", row.campaignId],
    ["Wave", row.waveId],
    ["Sampling seed", row.samplingSeed],
    ["Campaign hash", row.campaignHash],
    ["Case hash", row.caseHash],
    ["Sampled-spec hash", row.sampledSpecHash],
    ["Exact-source hash", row.exactSourceHash],
    ["Score hash", row.score.scoreHash],
    ["Protocol hash", row.protocolHash],
    ["Implementation hash", row.implementationHash],
  ].forEach(([label, value]) => detailValue(
    identities,
    label,
    value,
    { code: true },
  ));
  append(wrapper, element("h4", "", "Case provenance"), identities);

  const outcome = element("dl", "compact-dashboard-detail-grid");
  detailValue(outcome, "Evaluation status", row.evaluation.statusCode);
  detailValue(outcome, "Score status", row.score.statusCode);
  detailValue(
    outcome,
    "Failed compact gates",
    row.score.failedGates.join(", ") || "—",
  );
  detailValue(outcome, "Null class", row.evaluation.nullClass);
  detailValue(outcome, "Null reason", row.evaluation.reasonCode);
  detailValue(outcome, "Null message", row.evaluation.message);
  detailValue(
    outcome,
    "Wake-flux claim boundary",
    row.score.wakeFluxClaimBoundary,
  );
  detailValue(
    outcome,
    "Wall / total CPU",
    `${formatNumber(row.performance.wallSeconds, 7)} s / ` +
    `${formatNumber(row.performance.totalCpuSeconds, 7)} s`,
  );
  append(wrapper, element("h4", "", "Score and evaluation"), outcome);

  const gateTable = table([
    "Gate",
    "Outcome",
    "Observed",
    "Threshold",
    "Ratio",
  ]);
  SURFACE_GATE_DEFINITIONS.forEach((definition) => {
    const gate = row.gates.surfaceQuadrature[definition.id];
    const gateRow = element("tr");
    [
      definition.label,
      gate?.passed === true ? "pass" : gate?.passed === false ? "fail" : "—",
      formatExactNumber(gate?.maximumChange),
      formatExactNumber(gate?.threshold),
      formatExactNumber(gate?.thresholdRatio),
    ].forEach((value) => gateRow.appendChild(element("td", "", value)));
    gateRow.cells[0].title = definition.definition;
    gateTable.tBodies[0].appendChild(gateRow);
  });
  const gateWrap = element("div", "compact-dashboard-table-wrap");
  gateWrap.appendChild(gateTable);
  append(wrapper, element("h4", "", "Surface-quadrature details"), gateWrap);

  const coordinateTable = table(["Sampled coordinate", "Exact value"]);
  const coordinateLabels = {
    geometryScale: "Geometry scale",
    translationSpeed: "Group speed",
    threeAxisFrameFlattening: "Assembly-A flattening",
    coaxialComponentSpacingScale: "Assembly-C spacing scale",
    frequencies: "Frequencies",
    radii: "Radii",
    axialFractions: "Axial fractions",
    coincidentCenterAxialSpacings: "General-C axial gaps",
    circulationSenses: "Circulation",
    polarityAssignments: "Polarity",
    orbitOrder: "Orbit order",
  };
  Object.entries(coordinateLabels).forEach(([key, label]) => {
    const coordinateRow = element("tr");
    coordinateRow.appendChild(element("td", "", label));
    coordinateRow.appendChild(element(
      "td",
      "compact-dashboard-code",
      formatCoordinateValue(row.sampledCoordinates?.[key]),
    ));
    coordinateTable.tBodies[0].appendChild(coordinateRow);
  });
  const coordinateWrap = element("div", "compact-dashboard-table-wrap");
  coordinateWrap.appendChild(coordinateTable);
  append(wrapper, element("h4", "", "Sampled coordinates"), coordinateWrap);
  return wrapper;
}

function renderCases(state) {
  const allRows = filteredRows(state);
  const sourceSlugs = [...new Set(allRows.map((row) => row.sourceSlug))]
    .sort((left, right) =>
      left.localeCompare(right, undefined, { numeric: true }));
  if (
    state.caseConfigurationId !== "all" &&
    !sourceSlugs.includes(state.caseConfigurationId)
  ) {
    state.caseConfigurationId = "all";
  }
  const configurationRows = filterCompactSweepCaseRows(allRows, "", {
    sourceSlug: state.caseConfigurationId,
  });
  const sampleOrdinals = [...new Set(
    configurationRows.map((row) => String(row.sampleOrdinal)),
  )].sort((left, right) => Number(left) - Number(right));
  if (
    state.caseSampleOrdinal !== "all" &&
    !sampleOrdinals.includes(state.caseSampleOrdinal)
  ) {
    state.caseSampleOrdinal = "all";
  }
  const rows = filterCompactSweepCaseRows(allRows, state.caseQuery, {
    sourceSlug: state.caseConfigurationId,
    sampleOrdinal: state.caseSampleOrdinal,
  });
  const pageCount = Math.max(1, Math.ceil(rows.length / CASE_PAGE_SIZE));
  state.casePage = Math.min(state.casePage, pageCount - 1);
  const pageStart = state.casePage * CASE_PAGE_SIZE;
  const pageRows = rows.slice(pageStart, pageStart + CASE_PAGE_SIZE);
  const selected = rows.find((row) =>
    row.rowKey === state.selectedCaseKey) ?? pageRows[0] ?? null;
  if (selected && selected.rowKey !== state.selectedCaseKey) {
    state.selectedCaseKey = selected.rowKey;
  }

  const view = element("div", "compact-dashboard-view");
  const layout = element("div", "compact-dashboard-case-layout");
  const listPanel = panel({
    kicker: "Keyboard-accessible case table",
    title: "Select an exact case",
    description:
      "Choose a configuration and sample, then use exact search only when you need a candidate, case, or hash. A sample number can identify rows from more than one campaign.",
  });
  const controls = element("div", "compact-dashboard-case-controls");
  const configurationControl = selectControl({
    id: "compact-dashboard-case-configuration",
    label: "Configuration",
    value: state.caseConfigurationId,
    options: [
      { value: "all", label: "All matching configurations" },
      ...sourceSlugs.map((sourceSlug) => ({
        value: sourceSlug,
        label: sourceSlug,
      })),
    ],
    onChange(value) {
      state.caseConfigurationId = value;
      state.caseSampleOrdinal = "all";
      state.casePage = 0;
      state.selectedCaseKey = null;
      renderView(state);
      state.viewContainer
        .querySelector("#compact-dashboard-case-configuration")
        ?.focus();
    },
  });
  const sampleControl = selectControl({
    id: "compact-dashboard-case-sample",
    label: "Sample",
    value: state.caseSampleOrdinal,
    options: [
      { value: "all", label: "All samples" },
      ...sampleOrdinals.map((sampleOrdinal) => ({
        value: sampleOrdinal,
        label: `Sample ${sampleOrdinal}`,
      })),
    ],
    onChange(value) {
      state.caseSampleOrdinal = value;
      state.casePage = 0;
      state.selectedCaseKey = null;
      renderView(state);
      state.viewContainer
        .querySelector("#compact-dashboard-case-sample")
        ?.focus();
    },
  });
  const searchControl = element("div", "compact-dashboard-filter");
  const searchLabel = element("label", "", "Candidate, case, or hash");
  searchLabel.htmlFor = "compact-dashboard-case-search";
  const input = element("input", "compact-dashboard-case-search");
  input.type = "search";
  input.id = "compact-dashboard-case-search";
  input.value = state.caseQuery;
  input.placeholder = "Exact search";
  input.addEventListener("input", () => {
    state.caseQuery = input.value;
    state.casePage = 0;
    state.selectedCaseKey = null;
    renderView(state);
    const nextInput = state.viewContainer.querySelector(
      ".compact-dashboard-case-search",
    );
    nextInput?.focus();
    nextInput?.setSelectionRange(
      state.caseQuery.length,
      state.caseQuery.length,
    );
  });
  append(searchControl, searchLabel, input);
  append(
    controls,
    configurationControl.wrapper,
    sampleControl.wrapper,
    searchControl,
    element(
      "span",
      "compact-dashboard-badge",
      `${formatInteger(rows.length)} cases`,
    ),
  );
  listPanel.body.appendChild(controls);

  if (pageRows.length === 0) {
    listPanel.body.appendChild(
      emptyState("No exact cases match the current search and filters."),
    );
  } else {
    const caseTable = table([
      "Configuration",
      "Sample",
      "Signed-cycle residual",
      "Signed-emission residual",
      "Case",
      "Inspect",
    ]);
    pageRows.forEach((item) => {
      const rowNode = element("tr");
      const isSelected = item.rowKey === selected?.rowKey;
      rowNode.className = "compact-dashboard-case-row";
      rowNode.setAttribute("aria-selected", String(isSelected));
      [
        item.sourceSlug,
        item.sampleOrdinal,
        formatExactNumber(item.metrics.signedCycleResidual),
        formatExactNumber(item.metrics.signedEmissionResidual),
        item.caseId,
      ].forEach((value) => rowNode.appendChild(element("td", "", value)));
      const actionCell = element("td");
      const inspectButton = element(
        "button",
        "compact-dashboard-button",
        isSelected ? "Selected" : "Open",
      );
      inspectButton.type = "button";
      inspectButton.setAttribute(
        "aria-label",
        `Open case detail for ${item.caseId}, case hash ${item.caseHash}`,
      );
      if (isSelected) {
        inspectButton.setAttribute("aria-current", "true");
        inspectButton.disabled = true;
      }
      inspectButton.addEventListener("click", () => {
        openCase(state, item, { preserveQuery: true });
      });
      actionCell.appendChild(inspectButton);
      rowNode.appendChild(actionCell);
      caseTable.tBodies[0].appendChild(rowNode);
    });
    const tableWrap = element("div", "compact-dashboard-table-wrap");
    tableWrap.appendChild(caseTable);
    listPanel.body.appendChild(tableWrap);

    const pagination = element("div", "compact-dashboard-pagination");
    const previous = element("button", "compact-dashboard-button", "Previous");
    previous.type = "button";
    previous.disabled = state.casePage === 0;
    previous.addEventListener("click", () => {
      state.casePage -= 1;
      state.selectedCaseKey = null;
      renderView(state);
    });
    const next = element("button", "compact-dashboard-button", "Next");
    next.type = "button";
    next.disabled = state.casePage >= pageCount - 1;
    next.addEventListener("click", () => {
      state.casePage += 1;
      state.selectedCaseKey = null;
      renderView(state);
    });
    append(
      pagination,
      previous,
      element(
        "span",
        "compact-dashboard-note",
        `Page ${state.casePage + 1} of ${pageCount} · ` +
        `${pageStart + 1}-${Math.min(pageStart + CASE_PAGE_SIZE, rows.length)}`,
      ),
      next,
    );
    listPanel.body.appendChild(pagination);
  }

  const detailPanel = panel({
    kicker: "Exact row provenance",
    title: "Case detail",
    description:
      "One retained row, its measured compact diagnostics, declared numerical thresholds, sampled coordinates, and source identities.",
  });
  detailPanel.body.appendChild(renderCaseDetail(selected, state));
  append(layout, listPanel.wrapper, detailPanel.wrapper);
  view.appendChild(layout);
  return view;
}

function evidenceSelection(record) {
  return {
    schema: BORG_SELECTION_SCHEMA,
    braidId: record.braidId,
    assemblyId: record.assemblyId,
    modelRevisionSha256: record.modelRevisionSha256,
  };
}

function evidenceStatusLabel(record) {
  if (record.scientificStatus.coverage === "invalid") {
    return "Evidence projection invalid";
  }
  if (record.scientificStatus.current) {
    return record.scientificStatus.verdict;
  }
  if (record.scientificStatus.context.length) {
    return "Context linked; no exact adjudication";
  }
  return "No exact adjudication linked";
}

function evidenceLink(value) {
  const link = element("a", "compact-dashboard-button", value.label);
  link.href = `./${value.url}`;
  link.target = "_blank";
  link.rel = "noopener";
  return link;
}

function renderRequirementTable(status) {
  if (!status.current) {
    return emptyState(
      "The current projection has no exact H1–H5 adjudication for this " +
      "identity. This is unknown coverage, not a failed candidate.",
    );
  }
  const tableNode = table(["Requirement", "State", "Claim grade"]);
  const body = tableNode.tBodies[0];
  status.requirements.forEach((requirement) => {
    const row = element("tr");
    row.dataset.state = requirement.state;
    append(
      row,
      element("th", "", `${requirement.id} · ${requirement.label}`),
      element("td", "", requirement.state.replaceAll("-", " ")),
      element("td", "", requirement.claimGrade),
    );
    body.appendChild(row);
  });
  return tableNode;
}

function renderRelation(relation, title = relation.candidate) {
  const card = element("article", "compact-dashboard-evidence-relation");
  append(
    card,
    element("h3", "", title),
    element("p", "", relation.establishes),
  );
  const facts = element("dl", "compact-dashboard-detail-grid");
  [
    ["Scope", relation.scope],
    ["Instrument", relation.instrument],
    ["Tested domain", relation.parameterDomain],
    ["Does not establish", relation.doesNotEstablish],
    ["Current blocker", relation.currentBlocker],
    ["Falsifier", relation.falsifier],
  ].forEach(([label, value]) => {
    const field = element("div");
    append(field, element("dt", "", label), element("dd", "", value));
    facts.appendChild(field);
  });
  const links = element("div", "compact-dashboard-borg-actions");
  relation.evidenceLinks.forEach((value) => links.appendChild(evidenceLink(value)));
  append(card, facts, links);
  return card;
}

function selectEvidenceRecord(state, record) {
  state.filters.assemblyId = record.assemblyId;
  state.filters.modelRevisionSha256 = record.modelRevisionSha256;
  refreshFilters(state);
  renderView(state);
  globalThis.scrollTo?.({ top: 0, behavior: "instant" });
}

function renderEvidenceCollection(state) {
  const view = element("div", "compact-dashboard-view");
  const summary = panel({
    kicker: "Current exact Borg registry",
    title: `${formatInteger(state.evidence.summary.identityCount)} evidence records`,
    description:
      "Every current exact model is present. An unlinked record means no " +
      "identity-bound adjudication is available; it does not mean the model failed.",
  });
  const grid = element("div", "compact-dashboard-insight-grid");
  append(
    grid,
    insight(
      "Exact adjudications",
      formatInteger(state.evidence.summary.exactAdjudications),
      "Current H1–H5 rows bound to one exact identity.",
    ),
    insight(
      "Context linked",
      formatInteger(state.evidence.summary.contextLinked),
      "Broader-family or slice-only findings, kept separate from verdicts.",
    ),
    insight(
      "Compact targets",
      formatInteger(state.evidence.summary.compactTargets),
      "Current exact cohort members, whether or not an export exists.",
    ),
    insight(
      "Compact rows loaded",
      formatInteger(state.evidence.summary.compactRows),
      "Exact identity-bound campaign rows in the optional local export.",
    ),
  );
  summary.body.appendChild(grid);
  view.appendChild(summary.wrapper);

  const records = panel({
    kicker: "Choose a model",
    title: "Current identity coverage",
    description:
      "The label is context only; evidence is joined by the assembly ID and full model revision.",
  });
  const list = element("div", "compact-dashboard-evidence-list");
  state.evidence.records.forEach((record) => {
    const button = element("button", "compact-dashboard-evidence-card");
    button.type = "button";
    button.dataset.assemblyId = record.assemblyId;
    append(
      button,
      element("strong", "", record.label),
      element("span", "", evidenceStatusLabel(record)),
      element(
        "small",
        "",
        `${record.assemblyId} · ${record.compactCampaign.status.replaceAll("-", " ")}`,
      ),
    );
    button.addEventListener("click", () => selectEvidenceRecord(state, record));
    list.appendChild(button);
  });
  records.body.appendChild(list);
  view.appendChild(records.wrapper);

  if (state.evidence.historicalArchive) {
    const archive = state.evidence.historicalArchive;
    const historical = panel({
      kicker: "Preserved historical campaign",
      title: `${formatInteger(archive.drawn)} compact rows remain available`,
      description: archive.reason,
    });
    historical.body.appendChild(element(
      "p",
      "",
      `${formatInteger(archive.evaluated)} evaluated; ` +
      `${formatInteger(archive.drawnNotEvaluated)} not evaluated; ` +
      `${formatInteger(archive.compactPassed)} compact passes.`,
    ));
    view.appendChild(historical.wrapper);
  }
  return view;
}

function renderEvidenceRecord(state, record) {
  const view = element("div", "compact-dashboard-view");
  const selection = evidenceSelection(record);
  const actions = element("div", "compact-dashboard-borg-actions");
  const openBorg = element("a", "compact-dashboard-button", "Open in Borg");
  openBorg.href = buildBorgWorkbenchHref({
    selection,
    returnTo: `${state.locationLike.pathname}${state.locationLike.search}`,
  });
  const showAll = element("button", "compact-dashboard-button", "All evidence records");
  showAll.type = "button";
  showAll.addEventListener("click", () => {
    state.filters.assemblyId = "all";
    state.filters.modelRevisionSha256 = null;
    refreshFilters(state);
    renderView(state);
  });
  append(actions, showAll, openBorg);
  const identity = panel({
    kicker: "Current exact Borg identity",
    title: record.label,
    description: evidenceStatusLabel(record),
    actions,
  });
  const identityFacts = element("dl", "compact-dashboard-detail-grid");
  [
    ["Assembly ID", record.assemblyId],
    ["Model revision", record.modelRevisionSha256],
    ["Braid ID", record.braidId],
    ["Evidence items", formatInteger(record.evidenceItemCount)],
  ].forEach(([label, value]) => {
    const field = element("div");
    append(field, element("dt", "", label), element("dd", "", value));
    identityFacts.appendChild(field);
  });
  identity.body.appendChild(identityFacts);
  view.appendChild(identity.wrapper);

  const sources = panel({
    kicker: "Model source lane",
    title: "Prescribed record",
    description:
      "This lane establishes a reproducible display model only. Loading or replaying it creates no dynamical evidence.",
  });
  const sourceFacts = element("dl", "compact-dashboard-detail-grid");
  [
    ["Claim grade", record.claimGrade],
    ["Evidence status", record.evidenceStatus],
    ["Record SHA-256", record.recordSha256],
  ].forEach(([label, value]) => {
    const field = element("div");
    append(field, element("dt", "", label), element("dd", "", value));
    sourceFacts.appendChild(field);
  });
  const sourceActions = element("div", "compact-dashboard-borg-actions");
  append(
    sourceActions,
    evidenceLink({ label: "Source specification", url: record.sourceSpec }),
    evidenceLink({ label: "Sealed display record", url: record.recordUrl }),
  );
  append(sources.body, sourceFacts, sourceActions);
  view.appendChild(sources.wrapper);

  const status = record.scientificStatus;
  const adjudication = panel({
    kicker: "Current scientific-status projection",
    title: status.verdict,
    description: status.coverage === "invalid"
      ? `Fail-closed: ${status.causes.join("; ")}`
      : `Projection ${state.evidence.projectionRevision}`,
  });
  adjudication.body.appendChild(renderRequirementTable(status));
  if (status.current) {
    adjudication.body.appendChild(renderRelation(
      status.current,
      "Exact identity adjudication",
    ));
  }
  view.appendChild(adjudication.wrapper);

  if (status.context.length) {
    const context = panel({
      kicker: "Non-verdict context",
      title: "Broader-family and slice-only findings",
      description:
        "These findings are linked for context but do not become this exact model’s H1–H5 verdict.",
    });
    status.context.forEach((relation) =>
      context.body.appendChild(renderRelation(relation)));
    view.appendChild(context.wrapper);
  }

  const compact = record.compactCampaign;
  const campaign = panel({
    kicker: "Optional compact-diagnostic lane",
    title: compact.status.replaceAll("-", " "),
    description: compact.rowCount > 0
      ? `${formatInteger(compact.rowCount)} exact identity-bound rows are loaded.`
      : compact.targeted
        ? "This model is in the current exact cohort, but no terminal local export is loaded. Other evidence lanes remain available."
        : "This model is not in the current 20-model compact cohort. That is a coverage boundary, not a scientific verdict.",
  });
  if (state.evidence.compactCampaign.error) {
    campaign.body.appendChild(element(
      "p",
      "compact-dashboard-muted",
      `Local compact export: ${state.evidence.compactCampaign.error}`,
    ));
  }
  view.appendChild(campaign.wrapper);
  return view;
}

function renderEvidence(state) {
  if (state.filters.assemblyId === "all") {
    return renderEvidenceCollection(state);
  }
  const record = state.evidence.records.find((candidate) =>
    candidate.assemblyId === state.filters.assemblyId &&
    (!state.filters.modelRevisionSha256 ||
      candidate.modelRevisionSha256 === state.filters.modelRevisionSha256));
  return record
    ? renderEvidenceRecord(state, record)
    : emptyState("The selected exact Borg identity is not in the current registry.");
}

function renderBoundary(data) {
  const boundary = element("aside", "compact-dashboard-boundary");
  append(
    boundary,
    element("strong", "", "Diagnostic only"),
    element(
      "p",
      "",
      "This dashboard describes sampling, convergence, compact metrics, " +
      "numerical margins, computational cost, and rows for later adjudication. " +
      `It does not establish ${data.claimBoundary.doesNotEstablish.join(", ")}.`,
    ),
  );
  return boundary;
}

function renderError(state, message) {
  state.viewContainer.replaceChildren();
  const wrapper = element("section", "compact-dashboard-error");
  append(
    wrapper,
    element("h1", "", "Dashboard data unavailable"),
    element("p", "", message),
    element(
      "p",
      "",
      "Run the read-only exporter and reload this page. Deeper inspection " +
      "remains in the Codex workspace.",
    ),
    element(
      "pre",
      "compact-dashboard-pre",
      "node scripts/eom/export-compact-sweep-dashboard.mjs",
    ),
  );
  state.viewContainer.appendChild(wrapper);
}

function syncTabs(state) {
  state.tabs.forEach((tab, id) => {
    const selected = id === state.viewId;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
}

function renderView(state) {
  if (!state.data) return;
  state.viewContainer.replaceChildren();
  const renderers = {
    funnel: renderFunnel,
    gates: renderGates,
    metrics: renderMetrics,
    parameters: renderParameters,
    performance: renderPerformance,
    cases: renderCases,
  };
  const renderer = renderers[state.viewId] ?? renderers[DEFAULT_VIEW_ID];
  state.viewContainer.appendChild(renderer(state));
  persistBraidSearchRouteState(
    state,
    state.locationLike,
    state.historyLike,
  );
}

function mountShell(root, state) {
  const shell = element("div", "compact-dashboard-shell");
  const header = element("header", "compact-dashboard-header");
  const headerMain = element("div", "compact-dashboard-header-main");
  const title = element("div", "compact-dashboard-title");
  append(
    title,
    element("div", "compact-dashboard-kicker", "Borg campaign analysis"),
    element("h1", "", "Braid Search"),
    element(
      "p",
      "",
      "Focused prescribed-path diagnostics · read-only evidence view",
    ),
  );
  const actions = element("div", "compact-dashboard-actions");
  const borgReturn = element(
    "a",
    "compact-dashboard-button",
    "Back to Borg Library",
  );
  borgReturn.id = "braid-search-return-to-borg";
  borgReturn.href = resolveBorgLibraryReturnHref(
    new URLSearchParams(state.locationLike?.search ?? "").get("returnTo"),
    state.locationLike,
  ) ?? "./borg-library.html";
  const navigationHost = element("div", "braid-search-navigation");
  navigationHost.id = "scene-hud-tools";
  append(actions, borgReturn, navigationHost);
  append(headerMain, title, actions);

  const filters = element("div", "compact-dashboard-filters");
  const assemblyControl = selectControl({
    id: "compact-dashboard-assembly-filter",
    label: "Assembly",
    value: state.filters.assemblyId,
    options: [{ value: "all", label: "All assemblies" }],
    onChange(value) {
      state.filters.assemblyId = value;
      state.filters.modelRevisionSha256 = value === "all"
        ? null
        : state.data.rows.find((row) => row.assemblyId === value)
          ?.modelRevisionSha256 ?? null;
      state.filters.sourceSlug = "all";
      refreshFilters(state);
      renderView(state);
    },
  });
  const dispositionControl = selectControl({
    id: "compact-dashboard-disposition-filter",
    label: "Candidate set",
    value: state.filters.candidateDisposition,
    options: dispositionOptions(),
    onChange(value) {
      state.filters.candidateDisposition = value;
      state.filters.sourceSlug = "all";
      refreshFilters(state);
      renderView(state);
    },
  });
  const configurationControl = selectControl({
    id: "compact-dashboard-configuration-filter",
    label: "Configuration",
    value: state.filters.sourceSlug,
    options: [{ value: "all", label: "All configurations" }],
    onChange(value) {
      state.filters.sourceSlug = value;
      renderView(state);
    },
  });
  append(
    filters,
    dispositionControl.wrapper,
    assemblyControl.wrapper,
    configurationControl.wrapper,
  );

  const tabs = element("nav", "compact-dashboard-tabs");
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", "Dashboard views");
  VIEW_DEFINITIONS.forEach((definition, index) => {
    const tab = element(
      "button",
      "compact-dashboard-tab",
      definition.label,
    );
    tab.type = "button";
    tab.id = `compact-dashboard-tab-${definition.id}`;
    tab.setAttribute("role", "tab");
    tab.setAttribute(
      "aria-selected",
      String(definition.id === state.viewId),
    );
    tab.tabIndex = definition.id === state.viewId ? 0 : -1;
    tab.addEventListener("click", () => {
      state.viewId = definition.id;
      syncTabs(state);
      renderView(state);
    });
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
        return;
      }
      event.preventDefault();
      const currentIndex = VIEW_DEFINITIONS.findIndex((view) =>
        view.id === state.viewId);
      const nextIndex = event.key === "Home"
        ? 0
        : event.key === "End"
          ? VIEW_DEFINITIONS.length - 1
          : (currentIndex + (event.key === "ArrowRight" ? 1 : -1) +
            VIEW_DEFINITIONS.length) % VIEW_DEFINITIONS.length;
      state.viewId = VIEW_DEFINITIONS[nextIndex].id;
      syncTabs(state);
      renderView(state);
      state.tabs.get(state.viewId)?.focus();
    });
    state.tabs.set(definition.id, tab);
    tabs.appendChild(tab);
  });
  append(header, headerMain, filters, tabs);

  const main = element("main", "compact-dashboard-main");
  const viewHost = element("div", "compact-dashboard-view-host");
  viewHost.appendChild(
    element(
      "div",
      "compact-dashboard-loading",
      "Loading dashboard data…",
    ),
  );
  main.appendChild(viewHost);
  const footer = element(
    "footer",
    "compact-dashboard-footer",
    "Prescribed-path compact diagnostics only · no campaign artifacts are modified by this browser app.",
  );
  append(shell, header, main, footer);
  root.replaceChildren(shell);
  Object.assign(state, {
    assemblySelect: assemblyControl.select,
    dispositionSelect: dispositionControl.select,
    main,
    configurationSelect: configurationControl.select,
    viewContainer: viewHost,
  });
}

function replaceOptions(select, options, selectedValue) {
  select.replaceChildren();
  options.forEach((option) => {
    const node = element("option", "", option.label);
    node.value = option.value;
    node.selected = option.value === selectedValue;
    select.appendChild(node);
  });
}

function refreshFilters(state) {
  if (!state.data) return;
  replaceOptions(
    state.dispositionSelect,
    dispositionOptions(),
    state.filters.candidateDisposition,
  );
  replaceOptions(
    state.assemblySelect,
    assemblyOptions(state.data, state.filters.assemblyId),
    state.filters.assemblyId,
  );
  const options = configurationOptions(
    state.data,
    state.filters.assemblyId,
    state.filters.modelRevisionSha256,
    state.filters.candidateDisposition,
  );
  if (!options.some((option) => option.value === state.filters.sourceSlug)) {
    state.filters.sourceSlug = "all";
  }
  replaceOptions(
    state.configurationSelect,
    options,
    state.filters.sourceSlug,
  );
}

function loadData(state, rawData) {
  const data = validateCompactSweepDashboardData(rawData);
  state.data = data;
  if (!["all", ACTIVE_CANDIDATE_DISPOSITION, DEPRECATED_CONTROL_DISPOSITION]
    .includes(state.filters.candidateDisposition)) {
    state.filters.candidateDisposition = "all";
  }
  if (state.filters.assemblyId === "all") {
    state.filters.modelRevisionSha256 = null;
  } else if (!state.filters.modelRevisionSha256) {
    state.filters.modelRevisionSha256 = data.rows.find((row) =>
      row.assemblyId === state.filters.assemblyId)?.modelRevisionSha256 ?? null;
  }
  if (state.selectedCaseKey !== null &&
      !data.rows.some((row) => row.rowKey === state.selectedCaseKey)) {
    state.selectedCaseKey = null;
  }
  refreshFilters(state);
  state.main.replaceChildren(state.viewContainer, renderBoundary(data));
  renderView(state);
}

export async function renderCompactSweepDashboardApp({
  root = document.getElementById("compact-sweep-dashboard-app"),
  defaultDataPath =
    "./.local-data/braid-analysis/compact-monte-carlo/configuration-sweep-v2/compact-sweep-dashboard.v3.json",
  fetchImpl = globalThis.fetch,
  documentLike = globalThis.document,
  windowLike = globalThis.window,
} = {}) {
  if (!root) throw new Error("compact sweep dashboard root is required.");
  const routeState = readBraidSearchRouteState(windowLike?.location?.search ?? "");
  const state = {
    casePage: routeState.casePage,
    caseConfigurationId: routeState.caseConfigurationId,
    caseQuery: routeState.caseQuery,
    caseSampleOrdinal: routeState.caseSampleOrdinal,
    data: null,
    defaultDataPath,
    filters: { ...routeState.filters },
    historyLike: windowLike?.history,
    locationLike: windowLike?.location,
    metricGroup: "sourceSlug",
    metricId: "externalExposureFraction",
    parameterId: "geometryScale",
    parameterMetricId: "externalExposureFraction",
    performanceValue: "wallSeconds",
    selectedCaseKey: routeState.selectedCaseKey,
    tabs: new Map(),
    viewId: VIEW_DEFINITIONS.some((view) => view.id === routeState.viewId)
      ? routeState.viewId
      : DEFAULT_VIEW_ID,
  };
  mountShell(root, state);
  const navigationRuntime = createStandaloneAppNavigationRuntime({
    host: documentLike.querySelector("#scene-hud-tools"),
    document: documentLike,
    window: windowLike,
    fetchImpl,
  }).init();
  try {
    const response = await fetchImpl(defaultDataPath, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`local export request returned HTTP ${response.status}`);
    }
    loadData(state, await response.json(), defaultDataPath);
  } catch (error) {
    renderError(
      state,
      `The default local export could not be loaded (${error.message}).`,
    );
  }
  return {
    get data() {
      return state.data;
    },
    get filteredRows() {
      return filteredRows(state);
    },
    loadData(data) {
      loadData(state, data);
    },
    destroy() {
      navigationRuntime.destroy();
    },
    navigationRuntime,
    state,
  };
}
