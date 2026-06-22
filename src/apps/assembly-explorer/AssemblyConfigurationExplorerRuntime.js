const DATASET_SCHEMA = "assembly-configuration-explorer.dataset.v1";
const DEFAULT_FIELD_SPEED = 1;
const SPEED_TOLERANCE = 1e-9;
const NUMBER_DIGITS = 12;

function finiteNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function canonicalNumber(value, digits = NUMBER_DIGITS) {
  const number = finiteNumber(value, 0);
  if (Object.is(number, -0) || Math.abs(number) < 10 ** -digits) {
    return 0;
  }
  return Number(number.toPrecision(digits));
}

function sortObjectForFingerprint(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => sortObjectForFingerprint(entry));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, sortObjectForFingerprint(value[key])])
    );
  }
  return value;
}

function normalizeVector3(vector = {}) {
  return {
    x: finiteNumber(vector.x),
    y: finiteNumber(vector.y),
    z: finiteNumber(vector.z),
  };
}

function vectorLength(vector) {
  return Math.hypot(vector.x, vector.y, vector.z);
}

function normalizeUnitVector(vector = {}) {
  const normalized = normalizeVector3(vector);
  const length = vectorLength(normalized);
  if (length <= 0) {
    return { x: 0, y: 0, z: 1 };
  }
  return {
    x: normalized.x / length,
    y: normalized.y / length,
    z: normalized.z / length,
  };
}

function determinant3(columns) {
  const [a, b, c] = columns;
  return (
    a.x * (b.y * c.z - b.z * c.y) -
    b.x * (a.y * c.z - a.z * c.y) +
    c.x * (a.y * b.z - a.z * b.y)
  );
}

function formatNumber(value, digits = 4) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return "--";
  }
  if (number === 0) {
    return "0";
  }
  const magnitude = Math.abs(number);
  if (magnitude < 0.001 || magnitude >= 10000) {
    return number.toExponential(2);
  }
  return number.toFixed(digits).replace(/0+$/u, "").replace(/\.$/u, "");
}

function formatRatio(values) {
  return values.map((value) => formatNumber(value, 3)).join(":");
}

export function classifySpeedRegime(speed, fieldSpeed = DEFAULT_FIELD_SPEED, tolerance = SPEED_TOLERANCE) {
  const normalizedSpeed = finiteNumber(speed);
  const normalizedFieldSpeed = Math.max(finiteNumber(fieldSpeed, DEFAULT_FIELD_SPEED), SPEED_TOLERANCE);
  const ratio = normalizedSpeed / normalizedFieldSpeed;
  if (Math.abs(ratio - 1) <= tolerance) {
    return "at-field-speed";
  }
  return ratio > 1 ? "super-field-speed" : "sub-field-speed";
}

export function normalizeLayerRecord(layer = {}, index = 0, fieldSpeed = DEFAULT_FIELD_SPEED) {
  const frequency = finiteNumber(layer.frequency);
  const radius = finiteNumber(layer.radius);
  const speed = Number.isFinite(Number(layer.speed))
    ? finiteNumber(layer.speed)
    : 2 * Math.PI * frequency * radius;
  const normal = normalizeUnitVector(layer.normal);
  return {
    inputIndex: index,
    layerId: String(layer.layerId ?? layer.id ?? `binary-${index + 1}`),
    frequency,
    radius,
    energy: finiteNumber(layer.energy),
    speed,
    phase: finiteNumber(layer.phase),
    normal,
    ledger: layer.ledger && typeof layer.ledger === "object" ? { ...layer.ledger } : {},
    speedRatio: speed / Math.max(fieldSpeed, SPEED_TOLERANCE),
    speedRegime: classifySpeedRegime(speed, fieldSpeed),
  };
}

export function createLayerPermutationFingerprint(layer) {
  return JSON.stringify({
    frequency: canonicalNumber(layer.frequency),
    radius: canonicalNumber(layer.radius),
    energy: canonicalNumber(layer.energy),
    speed: canonicalNumber(layer.speed),
    phase: canonicalNumber(layer.phase),
    normal: [
      canonicalNumber(layer.normal.x),
      canonicalNumber(layer.normal.y),
      canonicalNumber(layer.normal.z),
    ],
    ledger: sortObjectForFingerprint(layer.ledger),
  });
}

export function createPermutationCanonicalKey(layers = []) {
  return `tri-binary:S3:v1:${layers.map(createLayerPermutationFingerprint).sort().join("|")}`;
}

export function computeEnergyDifferentials(layers = []) {
  const rows = [];
  for (let i = 0; i < layers.length; i += 1) {
    for (let j = i + 1; j < layers.length; j += 1) {
      rows.push({
        from: layers[i].layerId,
        to: layers[j].layerId,
        delta: layers[i].energy - layers[j].energy,
        absoluteDelta: Math.abs(layers[i].energy - layers[j].energy),
      });
    }
  }
  return rows;
}

function optionalFiniteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizeEigenSwarmRecord(record = {}) {
  const normalized = record && typeof record === "object" ? record : {};
  return {
    status: String(normalized.status ?? "not-evaluated"),
    period: optionalFiniteNumber(normalized.period),
    returnResidual: optionalFiniteNumber(normalized.returnResidual),
    floquetGap: optionalFiniteNumber(normalized.floquetGap),
    allowedSymmetries: Array.isArray(normalized.allowedSymmetries)
      ? normalized.allowedSymmetries.map((entry) => String(entry))
      : [],
    lorentzExportStatus: String(normalized.lorentzExportStatus ?? "not-evaluated"),
    notes: String(normalized.notes ?? ""),
  };
}

function normalizeAxisAlignmentRecord(record = {}) {
  const normalized = record && typeof record === "object" ? record : {};
  return {
    status: String(normalized.status ?? "not-evaluated"),
    angularMomentumResidual: optionalFiniteNumber(normalized.angularMomentumResidual),
    weights: String(normalized.weights ?? ""),
    envelopeAxisStatus: String(normalized.envelopeAxisStatus ?? "not-evaluated"),
    notes: String(normalized.notes ?? ""),
  };
}

export function normalizeBranchRecord(branch = {}, fieldSpeed = DEFAULT_FIELD_SPEED) {
  const layers = Array.isArray(branch.layers)
    ? branch.layers.map((layer, index) => normalizeLayerRecord(layer, index, fieldSpeed))
    : [];
  if (layers.length !== 3) {
    throw new Error(`Assembly Explorer branch ${branch.branchId ?? ""} requires exactly three binary layers.`);
  }
  const planeDeterminant = determinant3(layers.map((layer) => layer.normal));
  const responseCenter = normalizeVector3(branch.responseCenter);
  const groupVelocity = normalizeVector3(branch.groupVelocity);
  const totalMomentum = normalizeVector3(branch.totalMomentum);
  const totalAngularMomentum = normalizeVector3(branch.totalAngularMomentum);
  return {
    branchId: String(branch.branchId ?? branch.id ?? "branch"),
    family: String(branch.family ?? "unclassified"),
    claimLevel: String(branch.claimLevel ?? "candidate"),
    layers,
    responseCenter,
    groupVelocity,
    groupSpeed: vectorLength(groupVelocity),
    totalMomentum,
    totalMomentumMagnitude: vectorLength(totalMomentum),
    totalAngularMomentum,
    totalAngularMomentumMagnitude: vectorLength(totalAngularMomentum),
    stability: branch.stability && typeof branch.stability === "object" ? { ...branch.stability } : {},
    seaRecord: branch.seaRecord && typeof branch.seaRecord === "object" ? { ...branch.seaRecord } : {},
    eigenSwarm: normalizeEigenSwarmRecord(branch.eigenSwarm),
    axisAlignment: normalizeAxisAlignmentRecord(branch.axisAlignment),
    assemblyTopologicalCharge:
      branch.assemblyTopologicalCharge && typeof branch.assemblyTopologicalCharge === "object"
        ? { ...branch.assemblyTopologicalCharge }
        : {},
    capture: branch.capture && typeof branch.capture === "object" ? { ...branch.capture } : {},
    solverRefs: Array.isArray(branch.solverRefs) ? branch.solverRefs.slice() : [],
    planeDeterminant,
    permutationCanonicalKey: createPermutationCanonicalKey(layers),
    ratios: {
      frequency: layers.map((layer) => layer.frequency),
      radius: layers.map((layer) => layer.radius),
      energy: layers.map((layer) => layer.energy),
      speed: layers.map((layer) => layer.speed),
    },
    energyDifferentials: computeEnergyDifferentials(layers),
  };
}

export function normalizeExplorerDataset(dataset = {}) {
  const fieldSpeed = Math.max(finiteNumber(dataset.fieldSpeed, DEFAULT_FIELD_SPEED), SPEED_TOLERANCE);
  const branches = Array.isArray(dataset.branches)
    ? dataset.branches.map((branch) => normalizeBranchRecord(branch, fieldSpeed))
    : [];
  if (branches.length === 0) {
    throw new Error("Assembly Explorer dataset requires at least one branch.");
  }
  return {
    schema: DATASET_SCHEMA,
    datasetId: String(dataset.datasetId ?? "assembly-explorer-demo"),
    fieldSpeed,
    searchSemantics: {
      ...(dataset.searchSemantics && typeof dataset.searchSemantics === "object" ? dataset.searchSemantics : {}),
      layerOrdering: "unquotiented-labeled",
      permutationPolicy:
        dataset.searchSemantics?.permutationPolicy === "analysis-collapse-only"
          ? "analysis-collapse-only"
          : "keep-repeated-solutions",
    },
    branches,
  };
}

export function createAssemblyExplorerDemoDataset() {
  return normalizeExplorerDataset({
    schema: DATASET_SCHEMA,
    datasetId: "demo-unquotiented-tri-binary-space",
    fieldSpeed: 1,
    searchSemantics: {
      layerOrdering: "unquotiented-labeled",
      permutationPolicy: "keep-repeated-solutions",
      notes: "Demo rows intentionally preserve repeated S3-related candidates.",
    },
    branches: [
      {
        branchId: "equal-frequency-offset-a",
        family: "equal-frequency",
        claimLevel: "candidate",
        responseCenter: { x: 0, y: 0, z: 0 },
        groupVelocity: { x: 0, y: 0, z: 0 },
        totalMomentum: { x: 0, y: 0, z: 0 },
        totalAngularMomentum: { x: 1, y: 1, z: 1 },
        seaRecord: { regime: "homogeneous-rest-comparison" },
        eigenSwarm: {
          status: "candidate",
          period: 1,
          allowedSymmetries: ["phase-shift", "rigid-rotation", "S3-layer-relabeling"],
          lorentzExportStatus: "downstream-target",
        },
        axisAlignment: {
          status: "candidate",
          angularMomentumResidual: 0,
          weights: "demo-equal",
          envelopeAxisStatus: "rest-branch",
        },
        layers: [
          { layerId: "B1", frequency: 1, radius: 0.18, energy: 0.82, phase: 0, normal: { x: 1, y: 0, z: 0 } },
          { layerId: "B2", frequency: 1, radius: 0.16, energy: 0.75, phase: 2.09439510239, normal: { x: 0, y: 1, z: 0 } },
          { layerId: "B3", frequency: 1, radius: 0.21, energy: 0.94, phase: 4.18879020479, normal: { x: 0, y: 0, z: 1 } },
        ],
        stability: { root: "open", phase: "candidate", energy: "diagnostic", return: "open", sea: "open" },
        assemblyTopologicalCharge: { status: "unreported" },
        capture: { status: "not-scanned" },
      },
      {
        branchId: "equal-frequency-offset-a-permutation",
        family: "equal-frequency",
        claimLevel: "candidate",
        responseCenter: { x: 0, y: 0, z: 0 },
        groupVelocity: { x: 0, y: 0, z: 0 },
        totalMomentum: { x: 0, y: 0, z: 0 },
        totalAngularMomentum: { x: 1, y: 1, z: 1 },
        seaRecord: { regime: "homogeneous-rest-comparison" },
        eigenSwarm: {
          status: "candidate",
          period: 1,
          allowedSymmetries: ["phase-shift", "rigid-rotation", "S3-layer-relabeling"],
          lorentzExportStatus: "downstream-target",
        },
        axisAlignment: {
          status: "candidate",
          angularMomentumResidual: 0,
          weights: "demo-equal",
          envelopeAxisStatus: "rest-branch",
        },
        layers: [
          { layerId: "B3", frequency: 1, radius: 0.21, energy: 0.94, phase: 4.18879020479, normal: { x: 0, y: 0, z: 1 } },
          { layerId: "B1", frequency: 1, radius: 0.18, energy: 0.82, phase: 0, normal: { x: 1, y: 0, z: 0 } },
          { layerId: "B2", frequency: 1, radius: 0.16, energy: 0.75, phase: 2.09439510239, normal: { x: 0, y: 1, z: 0 } },
        ],
        stability: { root: "open", phase: "candidate", energy: "diagnostic", return: "open", sea: "open" },
        assemblyTopologicalCharge: { status: "unreported" },
        capture: { status: "not-scanned" },
      },
      {
        branchId: "mixed-speed-hinge-probe",
        family: "mixed-speed",
        claimLevel: "diagnostic",
        responseCenter: { x: 0, y: 0, z: 0 },
        groupVelocity: { x: 0.08, y: 0, z: 0.02 },
        totalMomentum: { x: 0.08, y: 0, z: 0.02 },
        totalAngularMomentum: { x: 0.31, y: 0.81, z: 0.55 },
        seaRecord: { regime: "weak-drift-diagnostic" },
        eigenSwarm: {
          status: "not-evaluated",
          allowedSymmetries: ["phase-shift", "translation"],
          lorentzExportStatus: "not-evaluated",
        },
        axisAlignment: {
          status: "not-evaluated",
          weights: "unreported",
          envelopeAxisStatus: "moving-branch",
        },
        layers: [
          { layerId: "B1", frequency: 0.75, radius: 0.14, energy: 0.51, phase: 0.3, normal: { x: 1, y: 0, z: 0 } },
          { layerId: "B2", frequency: 1.12, radius: 0.1421, energy: 0.88, phase: 1.7, normal: { x: 0, y: 0.97, z: 0.24 } },
          { layerId: "B3", frequency: 1.35, radius: 0.135, energy: 1.02, phase: 3.1, normal: { x: 0.12, y: -0.16, z: 0.98 } },
        ],
        stability: { root: "diagnostic", phase: "open", energy: "open", return: "open", sea: "open" },
        assemblyTopologicalCharge: { status: "unreported" },
        capture: { status: "not-scanned" },
      },
    ],
  });
}

function createElement(documentLike, tag, className, textContent) {
  const element = documentLike.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (textContent != null) {
    element.textContent = textContent;
  }
  return element;
}

function setJsonText(element, value) {
  element.textContent = JSON.stringify(value, null, 2);
}

export function mountAssemblyConfigurationExplorer(options = {}) {
  return new AssemblyConfigurationExplorerRuntime(options).init();
}

export class AssemblyConfigurationExplorerRuntime {
  constructor(options = {}) {
    this.document = options.document ?? globalThis.document;
    this.window = options.window ?? globalThis.window;
    this.dataset = options.dataset ? normalizeExplorerDataset(options.dataset) : createAssemblyExplorerDemoDataset();
    this.selectedBranchId = this.dataset.branches[0]?.branchId ?? null;
    this.collapseEquivalent = false;
  }

  init() {
    this.root = this.document.getElementById("assembly-explorer-app");
    if (!this.root) {
      throw new Error("Missing #assembly-explorer-app");
    }
    this.render();
    return this;
  }

  get selectedBranch() {
    return this.dataset.branches.find((branch) => branch.branchId === this.selectedBranchId) ?? this.dataset.branches[0];
  }

  get visibleBranches() {
    if (!this.collapseEquivalent) {
      return this.dataset.branches;
    }
    const seen = new Set();
    return this.dataset.branches.filter((branch) => {
      if (seen.has(branch.permutationCanonicalKey)) {
        return false;
      }
      seen.add(branch.permutationCanonicalKey);
      return true;
    });
  }

  render() {
    this.root.innerHTML = "";
    this.root.append(this.renderShell());
  }

  renderShell() {
    const shell = createElement(this.document, "div", "assembly-explorer-shell");
    shell.append(this.renderHeader(), this.renderMain());
    return shell;
  }

  renderHeader() {
    const header = createElement(this.document, "header", "assembly-explorer-header");
    const title = createElement(this.document, "div", "assembly-explorer-title");
    title.append(
      createElement(this.document, "h1", "", "Assembly Explorer"),
      createElement(this.document, "p", "", "Unquotiented tri-binary configuration-space packets")
    );
    const home = createElement(this.document, "button", "assembly-explorer-icon-button", "Home");
    home.type = "button";
    home.title = "Return to main app";
    home.addEventListener("click", () => {
      this.window?.location?.assign?.("./index.html");
    });
    header.append(title, home);
    return header;
  }

  renderMain() {
    const main = createElement(this.document, "main", "assembly-explorer-main");
    main.append(this.renderBranchList(), this.renderBranchDetail(), this.renderDatasetInspector());
    return main;
  }

  renderBranchList() {
    const panel = createElement(this.document, "section", "assembly-explorer-panel assembly-explorer-branch-panel");
    panel.append(createElement(this.document, "h2", "", "Branches"));

    const toggleLabel = createElement(this.document, "label", "assembly-explorer-toggle");
    const toggle = createElement(this.document, "input");
    toggle.type = "checkbox";
    toggle.checked = this.collapseEquivalent;
    toggle.addEventListener("change", () => {
      this.collapseEquivalent = toggle.checked;
      const visible = this.visibleBranches;
      if (!visible.some((branch) => branch.branchId === this.selectedBranchId)) {
        this.selectedBranchId = visible[0]?.branchId ?? this.selectedBranchId;
      }
      this.render();
    });
    toggleLabel.append(toggle, createElement(this.document, "span", "", "Collapse S3-equivalent rows"));
    panel.append(toggleLabel);

    const list = createElement(this.document, "div", "assembly-explorer-branch-list");
    this.visibleBranches.forEach((branch) => {
      const button = createElement(this.document, "button", "assembly-explorer-branch-button");
      button.type = "button";
      if (branch.branchId === this.selectedBranch?.branchId) {
        button.classList.add("is-active");
      }
      button.innerHTML = `<span>${branch.branchId}</span><small>${branch.family} / ${branch.claimLevel}</small>`;
      button.addEventListener("click", () => {
        this.selectedBranchId = branch.branchId;
        this.render();
      });
      list.append(button);
    });
    panel.append(list);
    return panel;
  }

  renderBranchDetail() {
    const branch = this.selectedBranch;
    const panel = createElement(this.document, "section", "assembly-explorer-panel assembly-explorer-detail-panel");
    panel.append(createElement(this.document, "h2", "", branch.branchId));
    const summary = createElement(this.document, "div", "assembly-explorer-summary-grid");
    const summaryRows = [
      ["Family", branch.family],
      ["Claim", branch.claimLevel],
      ["Frequency", formatRatio(branch.ratios.frequency)],
      ["Radius", formatRatio(branch.ratios.radius)],
      ["Energy", formatRatio(branch.ratios.energy)],
      ["Speed", formatRatio(branch.ratios.speed)],
      ["Group speed", formatNumber(branch.groupSpeed, 5)],
      ["Eigen-braid", branch.eigenSwarm.status],
      ["Axis", branch.axisAlignment.status],
      ["D_plane", formatNumber(branch.planeDeterminant, 5)],
      ["S3 key", branch.permutationCanonicalKey.slice(0, 44)],
    ];
    summaryRows.forEach(([label, value]) => {
      summary.append(createElement(this.document, "span", "assembly-explorer-summary-label", label));
      summary.append(createElement(this.document, "strong", "", value));
    });
    panel.append(summary, this.renderLayerTable(branch), this.renderDifferentials(branch));
    return panel;
  }

  renderLayerTable(branch) {
    const table = createElement(this.document, "table", "assembly-explorer-table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>Label</th>
          <th>f</th>
          <th>r</th>
          <th>E</th>
          <th>s</th>
          <th>s/c_f</th>
          <th>Regime</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    const body = table.querySelector("tbody");
    branch.layers.forEach((layer) => {
      const row = createElement(this.document, "tr");
      [
        layer.layerId,
        formatNumber(layer.frequency),
        formatNumber(layer.radius),
        formatNumber(layer.energy),
        formatNumber(layer.speed),
        formatNumber(layer.speedRatio),
        layer.speedRegime,
      ].forEach((value) => row.append(createElement(this.document, "td", "", value)));
      body.append(row);
    });
    return table;
  }

  renderDifferentials(branch) {
    const block = createElement(this.document, "div", "assembly-explorer-differentials");
    block.append(createElement(this.document, "h3", "", "Energy Differentials"));
    branch.energyDifferentials.forEach((row) => {
      block.append(
        createElement(
          this.document,
          "div",
          "assembly-explorer-differential-row",
          `${row.from} - ${row.to}: ${formatNumber(row.delta)}`
        )
      );
    });
    return block;
  }

  renderDatasetInspector() {
    const panel = createElement(this.document, "section", "assembly-explorer-panel assembly-explorer-inspector-panel");
    panel.append(createElement(this.document, "h2", "", "Dataset"));
    const facts = createElement(this.document, "div", "assembly-explorer-facts");
    facts.append(
      createElement(this.document, "span", "", `dataset: ${this.dataset.datasetId}`),
      createElement(this.document, "span", "", `field speed: ${formatNumber(this.dataset.fieldSpeed)}`),
      createElement(this.document, "span", "", `branches: ${this.dataset.branches.length}`),
      createElement(this.document, "span", "", `visible: ${this.visibleBranches.length}`),
      createElement(this.document, "span", "", `layer ordering: ${this.dataset.searchSemantics.layerOrdering}`)
    );
    const json = createElement(this.document, "pre", "assembly-explorer-json");
    setJsonText(json, {
      searchSemantics: this.dataset.searchSemantics,
      selectedBranch: this.selectedBranch,
    });
    panel.append(facts, json);
    return panel;
  }
}
