export const EQUATION_MAP_SCHEMA = "equation-map-document.v1";
export const DEFAULT_EQUATION_MAP_DOCUMENT_ID = "eq-01-causal-wake-master-equation";
export const DEFAULT_BACKGROUND_ID = "architrinoPurple";
export const DEFAULT_SECTION_LINE_PLACEMENT = "below";
export const DEFAULT_EQUATION_SCALE = "medium";
export const DEFAULT_COMMENT_FONT_SIZE = "medium";

export const CANVAS_COLORS = Object.freeze([
  { id: "architrinoPurple", label: "Purple", color: "#4b0082" },
  { id: "light", label: "Light", color: "#fdfdfd" },
  { id: "warm", label: "Warm", color: "#f4ecd8" },
  { id: "dark", label: "Dark", color: "#0f172a" },
]);

export const SUBJECT_GROUPS = Object.freeze([
  "Classical mechanics",
  "Relativity and effective metric",
  "Quantum and QFT",
  "Statistical mechanics and thermodynamics",
  "Cosmology and astrophysics",
  "AAA native rows",
]);

export const CLAIM_LEVELS = Object.freeze([
  "candidate-commentary",
  "accepted-source-reference",
  "accepted-aaa-derivation",
]);

const EQUATION_SCALE_VALUES = new Set(["small", "medium", "large"]);
const COMMENT_FONT_SIZE_VALUES = new Set(["small", "medium", "large"]);
const SECTION_LINE_PLACEMENTS = new Set(["above", "below"]);

function normalizeText(value, fallback = "") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function normalizeOptionalText(value) {
  return String(value ?? "").trim();
}

function normalizePercent(value, fallback = 0) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(100, Math.max(0, number));
}

function normalizeWidthPercent(value, fallback = 24) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(44, Math.max(16, number));
}

export function getCanvasColorById(id) {
  return CANVAS_COLORS.find((entry) => entry.id === id) ?? CANVAS_COLORS[0];
}

export function normalizeBackgroundId(id, fallback = DEFAULT_BACKGROUND_ID) {
  return getCanvasColorById(id ?? fallback).id;
}

export function normalizeSectionLinePlacement(value, fallback = DEFAULT_SECTION_LINE_PLACEMENT) {
  return SECTION_LINE_PLACEMENTS.has(value) ? value : fallback;
}

export function normalizeEquationScale(value, fallback = DEFAULT_EQUATION_SCALE) {
  return EQUATION_SCALE_VALUES.has(value) ? value : fallback;
}

export function normalizeCommentFontSize(value, fallback = DEFAULT_COMMENT_FONT_SIZE) {
  return COMMENT_FONT_SIZE_VALUES.has(value) ? value : fallback;
}

function normalizeClaimLevel(value) {
  return CLAIM_LEVELS.includes(value) ? value : CLAIM_LEVELS[0];
}

function normalizeAnchor(anchor = {}, index = 0) {
  const id = normalizeText(anchor.id, `anchor-${index + 1}`);
  return {
    id,
    label: normalizeText(anchor.label, id),
    searchText: normalizeOptionalText(anchor.searchText),
  };
}

function normalizeFormulaPart(part = {}, index = 0) {
  const kind = part.kind === "text" ? "text" : "math";
  const text = kind === "text" ? String(part.text ?? "") : "";
  const tex = kind === "math" ? normalizeText(part.tex, "?") : "";
  return {
    id: normalizeText(part.id, `part-${index + 1}`),
    kind,
    text,
    tex,
    anchorId: normalizeOptionalText(part.anchorId),
  };
}

function normalizeCommentBlock(block = {}, index = 0) {
  const type = block.type === "math" ? "math" : "text";
  return {
    type,
    text: type === "text" ? normalizeText(block.text, "") : "",
    tex: type === "math" ? normalizeText(block.tex, "?") : "",
    displayMode: type === "math" ? Boolean(block.displayMode) : false,
    id: normalizeText(block.id, `block-${index + 1}`),
  };
}

function getContentSearchText(blocks = []) {
  return blocks.map((block) => (block.type === "math" ? block.tex : block.text)).join(" ");
}

function normalizeOverlay(overlay = {}, index = 0, anchorIds = new Set()) {
  const targetAnchorId = normalizeText(overlay.targetAnchorId, "");
  if (!anchorIds.has(targetAnchorId)) {
    throw new Error(`Equation overlay ${overlay.id ?? index + 1} targets missing formula section "${targetAnchorId}".`);
  }
  const content = Array.isArray(overlay.content)
    ? overlay.content.map((block, blockIndex) => normalizeCommentBlock(block, blockIndex))
    : [{ type: "text", text: normalizeText(overlay.text, "") }];
  return {
    id: normalizeText(overlay.id, `overlay-${index + 1}`),
    title: normalizeText(overlay.title, `Comment ${index + 1}`),
    status: normalizeOptionalText(overlay.status),
    targetAnchorId,
    sectionLinePlacement: normalizeSectionLinePlacement(overlay.sectionLinePlacement),
    position: {
      x: normalizePercent(overlay.position?.x, 12),
      y: normalizePercent(overlay.position?.y, 18),
      width: normalizeWidthPercent(overlay.position?.width, 24),
    },
    content,
    searchText: getContentSearchText(content),
  };
}

export function normalizeEquationMapDocument(document = {}, index = 0) {
  const id = normalizeText(document.id, `equation-map-${index + 1}`);
  const anchors = Array.isArray(document.anchors)
    ? document.anchors.map((anchor, anchorIndex) => normalizeAnchor(anchor, anchorIndex))
    : [];
  if (anchors.length === 0) {
    throw new Error(`Equation map ${id} requires at least one formula section anchor.`);
  }
  const anchorIds = new Set(anchors.map((anchor) => anchor.id));
  const formulaParts = Array.isArray(document.formulaParts)
    ? document.formulaParts.map((part, partIndex) => normalizeFormulaPart(part, partIndex))
    : [];
  if (formulaParts.length === 0) {
    throw new Error(`Equation map ${id} requires formulaParts for static section targeting.`);
  }
  formulaParts.forEach((part) => {
    if (part.anchorId && !anchorIds.has(part.anchorId)) {
      throw new Error(`Equation map ${id} formula part "${part.id}" uses missing anchor "${part.anchorId}".`);
    }
  });
  const overlays = Array.isArray(document.overlays)
    ? document.overlays.map((overlay, overlayIndex) => normalizeOverlay(overlay, overlayIndex, anchorIds))
    : [];
  return {
    schema: EQUATION_MAP_SCHEMA,
    id,
    title: normalizeText(document.title, "Equation"),
    subject: normalizeText(document.subject, SUBJECT_GROUPS[0]),
    formulaTeX: normalizeText(document.formulaTeX, formulaParts.map((part) => part.tex || part.text).join("")),
    formulaParts,
    anchors,
    overlays,
    backgroundId: normalizeBackgroundId(document.backgroundId),
    claimLevel: normalizeClaimLevel(document.claimLevel),
  };
}

export function normalizeEquationMapDocuments(documents = []) {
  const normalized = documents.map((document, index) => normalizeEquationMapDocument(document, index));
  if (normalized.length === 0) {
    throw new Error("Equation Mapping requires at least one equation-map document.");
  }
  return normalized;
}

function anchor(id, label, searchText = label) {
  return { id, label, searchText };
}

function mathPart(id, tex, anchorId = id) {
  return { id, kind: "math", tex, anchorId };
}

function textPart(id, text) {
  return { id, kind: "text", text };
}

function overlay(
  id,
  title,
  targetAnchorId,
  text,
  tex,
  { x = 10, y = 12, width = 24, line = "above" } = {}
) {
  const content = [{ type: "text", text }];
  if (tex) {
    content.push({ type: "math", tex, displayMode: false });
  }
  return {
    id,
    title,
    status: "candidate",
    targetAnchorId,
    sectionLinePlacement: line,
    position: { x, y, width },
    content,
  };
}

const scoreFiveAndFourEquationMapDocuments = [
  {
    id: "eq-01-causal-wake-master-equation",
    title: "EQ-01 Causal Wake Master Equation",
    subject: "AAA native rows",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "accepted-aaa-derivation",
    formulaTeX:
      "\\mathbf a_{o'\\leftarrow o}=\\kappa\\sigma_{q_oq_{o'}}\\frac{|q_oq_{o'}|}{r^2}W_{o'\\leftarrow o}^{\\mathrm{rec}}\\hat{\\mathbf r}",
    anchors: [
      anchor("acceleration", "acceleration response", "per-hit acceleration active root"),
      anchor("polarity", "source polarity", "kappa sigma source receiver polarity"),
      anchor("inverseSquare", "wake dilution", "inverse-square causal wake dilution"),
      anchor("branchStrength", "branch strength", "receiver-normal source-normal denominator branch factor"),
      anchor("direction", "line of action", "line-of-action causal-root direction"),
    ],
    formulaParts: [
      mathPart("acceleration", "\\mathbf a_{o'\\leftarrow o}", "acceleration"),
      textPart("eq", " = "),
      mathPart("polarity", "\\kappa\\sigma_{q_oq_{o'}}", "polarity"),
      textPart("space-1", " "),
      mathPart("inverseSquare", "\\frac{|q_oq_{o'}|}{r^2}", "inverseSquare"),
      textPart("space-2", " "),
      mathPart("branchStrength", "W_{o'\\leftarrow o}^{\\mathrm{rec}}", "branchStrength"),
      textPart("space-3", " "),
      mathPart("direction", "\\hat{\\mathbf r}", "direction"),
    ],
    overlays: [
      overlay(
        "native-root",
        "Native root",
        "acceleration",
        "This left side is the per-hit acceleration response; downstream maps must still consume active roots and event ledgers.",
        "\\mathbf a_{o'\\leftarrow o}",
        { x: 7, y: 8, width: 25, line: "above" }
      ),
      overlay(
        "wake-dilution",
        "Wake dilution",
        "inverseSquare",
        "The familiar inverse-square section is read as causal wake spread, not as a standalone field postulate.",
        "r^{-2}",
        { x: 67, y: 22, width: 25, line: "above" }
      ),
      overlay(
        "receiver-normal",
        "History factor",
        "branchStrength",
        "This factor carries source-normal and receiver-normal history into the per-hit law.",
        "W^{\\mathrm{rec}}=\\left|D_t/D_s\\right|",
        { x: 7, y: 68, width: 25, line: "below" }
      ),
      overlay(
        "line-of-action",
        "Line of action",
        "direction",
        "The direction term keeps force geometry tied to the active causal root.",
        "\\hat{\\mathbf r}",
        { x: 67, y: 82, width: 25, line: "below" }
      ),
    ],
  },
  {
    id: "eq-02-lorentz-clock-rate",
    title: "EQ-02 Lorentz Factor And Clock Rate",
    subject: "Relativity and effective metric",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX: "\\gamma_\\star(\\mathbf w)=\\frac{1}{\\sqrt{1-\\lVert\\mathbf w\\rVert^2/c_\\star^2}},\\quad d\\tau/dt=1/\\gamma_\\star",
    anchors: [
      anchor("gammaFactor", "Lorentz factor", "gamma clock ruler factor"),
      anchor("driftSpeed", "drift speed", "motion through local Noether sea"),
      anchor("clockRate", "clock rate", "moving clock readout"),
    ],
    formulaParts: [
      mathPart("gammaFactor", "\\gamma_\\star(\\mathbf w)", "gammaFactor"),
      textPart("eq", " = "),
      mathPart("driftSpeed", "\\frac{1}{\\sqrt{1-\\lVert\\mathbf w\\rVert^2/c_\\star^2}}", "driftSpeed"),
      mathPart("comma", ",\\quad", ""),
      mathPart("clockRate", "d\\tau/dt=1/\\gamma_\\star", "clockRate"),
    ],
    overlays: [
      overlay(
        "drift-through-sea",
        "Drift through sea",
        "driftSpeed",
        "Read the speed term as drift through the local Noether sea, not as motion through substrate spacetime.",
        "\\mathbf w=\\mathbf V_{\\mathrm{cm}}-\\mathbf u_{\\mathrm{sea}}",
        { x: 7, y: 8, width: 26, line: "above" }
      ),
      overlay(
        "clock-consumer",
        "Clock consumer",
        "clockRate",
        "The clock row is a consumer of the same retained branch ledger that must also support ruler behavior.",
        "d\\tau/dt=1/\\gamma_\\star",
        { x: 67, y: 68, width: 25, line: "below" }
      ),
      overlay(
        "branch-blocker",
        "Shared branch row",
        "gammaFactor",
        "The gamma factor is only useful if one retained branch row binds clock, ruler, and envelope behavior together.",
        "\\gamma_\\star\\rightarrow S_{\\mathrm{eq}}",
        { x: 8, y: 82, width: 25, line: "below" }
      ),
    ],
  },
  {
    id: "eq-03-oblate-spheroidal-envelope",
    title: "EQ-03 Oblate Spheroidal Envelope",
    subject: "Relativity and effective metric",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX: "\\xi(v)\\equiv\\frac{R_{\\parallel}(v)}{R_{\\perp}(v)}\\to\\frac{1}{\\gamma_{\\mathrm{eff}}(v)}",
    anchors: [
      anchor("shapeRatio", "shape ratio", "Noether braid envelope xi"),
      anchor("parallelRadius", "parallel radius", "R parallel moving envelope"),
      anchor("perpendicularRadius", "perpendicular radius", "R perpendicular moving envelope"),
      anchor("gammaEff", "effective gamma", "weak homogeneous Lorentz target"),
    ],
    formulaParts: [
      mathPart("shapeRatio", "\\xi(v)", "shapeRatio"),
      mathPart("equiv", "\\equiv", ""),
      mathPart("parallelRadius", "R_{\\parallel}(v)", "parallelRadius"),
      textPart("slash", " / "),
      mathPart("perpendicularRadius", "R_{\\perp}(v)", "perpendicularRadius"),
      mathPart("arrow", "\\to", ""),
      mathPart("gammaEff", "\\frac{1}{\\gamma_{\\mathrm{eff}}(v)}", "gammaEff"),
    ],
    overlays: [
      overlay(
        "envelope-readout",
        "Envelope readout",
        "shapeRatio",
        "The shape ratio asks whether moving Noether braid geometry exposes the Lorentz contraction channel directly.",
        "\\xi=R_{\\parallel}/R_{\\perp}",
        { x: 7, y: 8, width: 25, line: "above" }
      ),
      overlay(
        "return-cycle",
        "Return cycle",
        "gammaEff",
        "The visual match is not enough; the return-cycle ledger has to produce the ratio without a private fit.",
        "\\xi\\to\\gamma_{\\mathrm{eff}}^{-1}",
        { x: 67, y: 68, width: 25, line: "below" }
      ),
      overlay(
        "scale-separation",
        "Shape, not scale",
        "parallelRadius",
        "Keep this separate from the independent scale channel; the envelope shape is the target here.",
        "\\lambda(v,E,n)\\neq\\xi(v)",
        { x: 8, y: 82, width: 25, line: "below" }
      ),
    ],
  },
  {
    id: "eq-04-energy-momentum-rest-energy",
    title: "EQ-04 Energy Momentum And Rest Energy",
    subject: "Relativity and effective metric",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX: "E^2=p^2c_{\\mathrm{eff}}^2+M_0^2c_{\\mathrm{eff}}^4",
    anchors: [
      anchor("energy", "energy", "observer exposed energy"),
      anchor("momentum", "momentum term", "momentum response"),
      anchor("effectiveSpeed", "effective speed", "Noether sea dressed speed"),
      anchor("restMass", "rest mass", "exposed mass response"),
    ],
    formulaParts: [
      mathPart("energy", "E^2", "energy"),
      textPart("eq", " = "),
      mathPart("momentum", "p^2", "momentum"),
      mathPart("effectiveSpeed", "c_{\\mathrm{eff}}^2", "effectiveSpeed"),
      textPart("plus", " + "),
      mathPart("restMass", "M_0^2c_{\\mathrm{eff}}^4", "restMass"),
    ],
    overlays: [
      overlay(
        "energy-readout",
        "Energy readout",
        "energy",
        "Energy is the exposed conserved readout of branch history, internal storage, and Noether sea response.",
        "E^2",
        { x: 7, y: 8, width: 24, line: "above" }
      ),
      overlay(
        "motion-response",
        "Motion response",
        "momentum",
        "The motion term must use the same branch ledger and effective speed channel as the rest side.",
        "p^2c_{\\mathrm{eff}}^2",
        { x: 67, y: 22, width: 25, line: "above" }
      ),
      overlay(
        "mass-response",
        "Mass response",
        "restMass",
        "Mass maps to trapped internal causal history, shielding, and Noether sea coupling.",
        "M_0^2c_{\\mathrm{eff}}^4",
        { x: 67, y: 68, width: 26, line: "below" }
      ),
      overlay(
        "speed-role",
        "Speed role",
        "effectiveSpeed",
        "This speed is a declared effective channel; changing it per observable would be hidden retuning.",
        "c_{\\mathrm{eff}}",
        { x: 7, y: 82, width: 24, line: "below" }
      ),
    ],
  },
  {
    id: "eq-05-noether-conservation",
    title: "EQ-05 Noether Conservation Rows",
    subject: "AAA native rows",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX: "\\frac{dE_{\\mathrm{tot}}}{dt}=0,\\quad \\mathbf P_{\\mathrm{tot}}=\\mathbf P_{\\mathrm{mech}}+\\mathbf P_{\\mathrm{wake}}",
    anchors: [
      anchor("energyConservation", "energy conservation", "finite-window total energy"),
      anchor("totalMomentum", "total momentum", "finite-window total momentum"),
      anchor("mechanicalMomentum", "mechanical momentum", "mechanical subsystem"),
      anchor("wakeMomentum", "wake momentum", "wake boundary flux history"),
    ],
    formulaParts: [
      mathPart("energyConservation", "\\frac{dE_{\\mathrm{tot}}}{dt}=0", "energyConservation"),
      mathPart("comma", ",\\quad", ""),
      mathPart("totalMomentum", "\\mathbf P_{\\mathrm{tot}}", "totalMomentum"),
      textPart("eq", " = "),
      mathPart("mechanicalMomentum", "\\mathbf P_{\\mathrm{mech}}", "mechanicalMomentum"),
      textPart("plus", " + "),
      mathPart("wakeMomentum", "\\mathbf P_{\\mathrm{wake}}", "wakeMomentum"),
    ],
    overlays: [
      overlay(
        "finite-window-total",
        "Finite-window total",
        "energyConservation",
        "The conserved total has to include local mechanics, delay history, wake storage, and boundary flux.",
        "dE_{\\mathrm{tot}}/dt=0",
        { x: 7, y: 8, width: 26, line: "above" }
      ),
      overlay(
        "mechanical-side",
        "Mechanical side",
        "mechanicalMomentum",
        "Mechanical momentum is only one row in the conserved finite-window ledger.",
        "\\mathbf P_{\\mathrm{mech}}",
        { x: 8, y: 68, width: 25, line: "below" }
      ),
      overlay(
        "wake-side",
        "Wake side",
        "wakeMomentum",
        "The wake term is momentum stored or carried by delayed causal response, not ordinary mechanical momentum.",
        "\\mathbf P_{\\mathrm{wake}}",
        { x: 67, y: 82, width: 25, line: "below" }
      ),
    ],
  },
  {
    id: "eq-06-noether-sea-continuity",
    title: "EQ-06 Noether Sea Continuity",
    subject: "Statistical mechanics and thermodynamics",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX: "\\partial_t\\rho_{\\mathrm{NS}}+\\nabla\\cdot(\\rho_{\\mathrm{NS}}\\mathbf u_{\\mathrm{sea}})=S_{\\rho}+r_{\\rho}",
    anchors: [
      anchor("densityChange", "density change", "Noether sea density time derivative"),
      anchor("flowDivergence", "flow divergence", "Noether sea transport flow"),
      anchor("sourceTerm", "source term", "source loading row"),
      anchor("residual", "residual", "moment closure residual"),
    ],
    formulaParts: [
      mathPart("densityChange", "\\partial_t\\rho_{\\mathrm{NS}}", "densityChange"),
      textPart("plus", " + "),
      mathPart("flowDivergence", "\\nabla\\cdot(\\rho_{\\mathrm{NS}}\\mathbf u_{\\mathrm{sea}})", "flowDivergence"),
      textPart("eq", " = "),
      mathPart("sourceTerm", "S_{\\rho}", "sourceTerm"),
      textPart("plus-2", " + "),
      mathPart("residual", "r_{\\rho}", "residual"),
    ],
    overlays: [
      overlay(
        "density-row",
        "Density row",
        "densityChange",
        "Use the physical Noether sea density row; this is not a generic fluid-density placeholder.",
        "\\rho_{\\mathrm{NS}}(\\mathbf x,t)",
        { x: 7, y: 8, width: 25, line: "above" }
      ),
      overlay(
        "transport-row",
        "Transport row",
        "flowDivergence",
        "The flow term should be a low-moment projection of retained Noether braid population dynamics.",
        "\\rho_{\\mathrm{NS}}\\mathbf u_{\\mathrm{sea}}",
        { x: 67, y: 22, width: 25, line: "above" }
      ),
      overlay(
        "source-residual",
        "Source and residual",
        "sourceTerm",
        "The source row must load declared events; the residual row shows unresolved moment closure instead of hiding it.",
        "S_{\\rho}+r_{\\rho}",
        { x: 7, y: 68, width: 26, line: "below" }
      ),
    ],
  },
  {
    id: "eq-07-effective-metric-adm-cartan",
    title: "EQ-07 Effective Metric ADM/Cartan Map",
    subject: "Relativity and effective metric",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX:
      "ds_{\\mathrm{eff}}^2=-N^2c_0^2dt^2+\\gamma_{ij}(dx^i-u^i_{\\mathrm{sea}}dt)(dx^j-u^j_{\\mathrm{sea}}dt)",
    anchors: [
      anchor("lineElement", "effective line element", "observer-level effective metric"),
      anchor("lapse", "lapse", "clock channel lapse"),
      anchor("spatialCompliance", "spatial compliance", "spatial metric compliance"),
      anchor("drift", "sea drift", "Noether sea drift"),
    ],
    formulaParts: [
      mathPart("lineElement", "ds_{\\mathrm{eff}}^2", "lineElement"),
      textPart("eq", " = "),
      mathPart("lapse", "-N^2c_0^2dt^2", "lapse"),
      textPart("plus", " + "),
      mathPart("spatialCompliance", "\\gamma_{ij}", "spatialCompliance"),
      mathPart("drift", "(dx^i-u^i_{\\mathrm{sea}}dt)(dx^j-u^j_{\\mathrm{sea}}dt)", "drift"),
    ],
    overlays: [
      overlay(
        "observer-level",
        "Observer-level metric",
        "lineElement",
        "This is an effective observer metric, not substrate geometry replacing the Euclidean void.",
        "ds_{\\mathrm{eff}}^2",
        { x: 4, y: 6, width: 30, line: "above" }
      ),
      overlay(
        "clock-channel",
        "Clock channel",
        "lapse",
        "The lapse term is the clock/cadence channel of the same Noether sea response used by ruler and signal rows.",
        "N",
        { x: 35, y: 7, width: 33, line: "above" }
      ),
      overlay(
        "spatial-channel",
        "Spatial channel",
        "spatialCompliance",
        "Spatial compliance multiplies the lower-row displacement product; scalar-delay-only maps tend to miss it.",
        "\\gamma_{ij}",
        { x: 72, y: 7, width: 25, line: "above" }
      ),
      overlay(
        "drift-channel",
        "Drift channel",
        "drift",
        "The drift term inserts local Noether sea flow into the displacement product for paths, clocks, and weak fields.",
        "u^i_{\\mathrm{sea}}",
        { x: 67, y: 82, width: 25, line: "below" }
      ),
    ],
  },
  {
    id: "eq-08-weak-field-clock-redshift",
    title: "EQ-08 Weak-Field Clock And Redshift",
    subject: "Relativity and effective metric",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX: "d\\tau/dt\\approx1+\\Phi_N/c_0^2-\\lVert\\mathbf w\\rVert^2/(2c_0^2)",
    anchors: [
      anchor("clockRate", "clock rate", "weak-field proper time readout"),
      anchor("potentialTerm", "potential term", "Newtonian potential cadence"),
      anchor("motionTerm", "motion term", "velocity clock correction"),
    ],
    formulaParts: [
      mathPart("clockRate", "d\\tau/dt", "clockRate"),
      mathPart("approx", "\\approx", ""),
      mathPart("one", "1", ""),
      textPart("plus", " + "),
      mathPart("potentialTerm", "\\Phi_N/c_0^2", "potentialTerm"),
      textPart("minus", " - "),
      mathPart("motionTerm", "\\lVert\\mathbf w\\rVert^2/(2c_0^2)", "motionTerm"),
    ],
    overlays: [
      overlay(
        "cadence-readout",
        "Cadence readout",
        "clockRate",
        "The clock rate should be extracted from Noether sea cadence, density, delay, and potential response.",
        "\\Gamma_N\\rightarrow d\\tau/dt",
        { x: 7, y: 8, width: 26, line: "above" }
      ),
      overlay(
        "potential-response",
        "Potential response",
        "potentialTerm",
        "The potential term is the weak-field cadence projection from the shared response record, not a private fit.",
        "\\Phi_N/c_0^2",
        { x: 8, y: 68, width: 25, line: "below" }
      ),
      overlay(
        "moving-clock",
        "Moving clock",
        "motionTerm",
        "The velocity correction must share the Lorentz branch row instead of becoming a private clock fit.",
        "\\lVert\\mathbf w\\rVert^2/(2c_0^2)",
        { x: 67, y: 82, width: 25, line: "below" }
      ),
    ],
  },
  {
    id: "eq-09-shapiro-lensing-ppn",
    title: "EQ-09 Shapiro Lensing And PPN Rows",
    subject: "Relativity and effective metric",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX: "\\Delta\\theta=2(1+\\gamma_{\\mathrm{PPN}})GM/(bc_0^2)",
    anchors: [
      anchor("deflection", "deflection angle", "lensing deflection observable"),
      anchor("ppn", "PPN coefficient", "gamma PPN coefficient"),
      anchor("sourceMass", "source loading", "source mass loading"),
      anchor("impact", "path geometry", "impact parameter and signal path"),
    ],
    formulaParts: [
      mathPart("deflection", "\\Delta\\theta", "deflection"),
      textPart("eq", " = "),
      mathPart("ppn", "2(1+\\gamma_{\\mathrm{PPN}})", "ppn"),
      mathPart("sourceMass", "GM", "sourceMass"),
      textPart("slash", "/"),
      mathPart("impact", "(bc_0^2)", "impact"),
    ],
    overlays: [
      overlay(
        "lensing-readout",
        "Lensing readout",
        "deflection",
        "The deflection readout tests the null-path projection of the effective metric.",
        "\\Delta\\theta",
        { x: 7, y: 8, width: 25, line: "above" }
      ),
      overlay(
        "ppn-handoff",
        "PPN handoff",
        "ppn",
        "The PPN coefficient must be read from the same response record as Shapiro, acceleration, and redshift.",
        "\\gamma_{\\mathrm{PPN}}",
        { x: 67, y: 22, width: 25, line: "above" }
      ),
      overlay(
        "path-geometry",
        "Path geometry",
        "impact",
        "The impact term keeps path geometry explicit; scalar-delay-only maps fail when spatial compliance is absent.",
        "b c_0^2",
        { x: 7, y: 68, width: 26, line: "below" }
      ),
    ],
  },
  {
    id: "eq-17-redshift-factorization",
    title: "EQ-17 Redshift Factorization",
    subject: "Cosmology and astrophysics",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX: "1+z_X\\approx\\Gamma_{N,E}\\mathcal P_{E\\to R}/(\\Gamma_{N,R}B_XD_v)",
    anchors: [
      anchor("redshift", "redshift factor", "observed redshift budget"),
      anchor("emitterCadence", "emitter cadence", "source endpoint Noether sea cadence"),
      anchor("pathTransfer", "path transfer", "path-history propagation"),
      anchor("receiverCadence", "receiver cadence", "receiver endpoint cadence"),
      anchor("sourceDoppler", "source and motion factors", "source branch and Doppler factors"),
    ],
    formulaParts: [
      mathPart("redshift", "1+z_X", "redshift"),
      mathPart("approx", "\\approx", ""),
      mathPart("emitterCadence", "\\Gamma_{N,E}", "emitterCadence"),
      mathPart("pathTransfer", "\\mathcal P_{E\\to R}", "pathTransfer"),
      textPart("slash", "/"),
      mathPart("receiverCadence", "\\Gamma_{N,R}", "receiverCadence"),
      mathPart("sourceDoppler", "B_XD_v", "sourceDoppler"),
    ],
    overlays: [
      overlay(
        "factor-budget",
        "Frequency budget",
        "redshift",
        "The left side is the observed frequency ratio; the right side must account for endpoint, source, motion, and path history.",
        "1+z_X",
        { x: 7, y: 8, width: 26, line: "above" }
      ),
      overlay(
        "endpoint-cadence",
        "Endpoint cadence",
        "emitterCadence",
        "Emitter and receiver clock rows must stay on one signed transfer ledger.",
        "\\Gamma_{N,E}/\\Gamma_{N,R}",
        { x: 67, y: 22, width: 25, line: "above" }
      ),
      overlay(
        "path-history",
        "Path history",
        "pathTransfer",
        "The path term carries propagation history through the Noether sea before any cosmology comparison.",
        "\\mathcal P_{E\\to R}",
        { x: 7, y: 68, width: 26, line: "below" }
      ),
      overlay(
        "source-motion",
        "Source and motion",
        "sourceDoppler",
        "Source-branch and velocity factors must not be retuned independently of the endpoint and path rows.",
        "B_XD_v",
        { x: 67, y: 82, width: 25, line: "below" }
      ),
    ],
  },
];

export function createSeedEquationMapDocuments() {
  return normalizeEquationMapDocuments(scoreFiveAndFourEquationMapDocuments);
}

export function getEquationSearchText(document = {}) {
  return [
    document.title,
    document.subject,
    document.formulaTeX,
    document.claimLevel,
    ...(document.anchors ?? []).map((anchor) => `${anchor.label} ${anchor.searchText}`),
    ...(document.overlays ?? []).map((overlay) => `${overlay.title} ${overlay.searchText}`),
  ]
    .join(" ")
    .toLowerCase();
}

export function filterEquationMapDocuments(documents = [], query = "") {
  const normalizedQuery = String(query ?? "").trim().toLowerCase();
  if (!normalizedQuery) {
    return documents;
  }
  return documents.filter((document) => getEquationSearchText(document).includes(normalizedQuery));
}

export function groupEquationMapDocumentsBySubject(documents = []) {
  const groups = new Map();
  SUBJECT_GROUPS.forEach((subject) => groups.set(subject, []));
  documents.forEach((document) => {
    if (!groups.has(document.subject)) {
      groups.set(document.subject, []);
    }
    groups.get(document.subject).push(document);
  });
  return [...groups.entries()].filter(([, entries]) => entries.length > 0);
}
