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
  "AAA native rows",
  "Classical mechanics",
  "Relativity and effective metric",
  "Conservation and Noether structure",
  "Cosmology and astrophysics",
  "Statistical mechanics and thermodynamics",
  "Quantum and QFT",
]);

export const CLAIM_LEVELS = Object.freeze([
  "candidate-commentary",
  "accepted-source-reference",
  "accepted-aaa-derivation",
]);

const EQUATION_SCALE_VALUES = new Set(["small", "medium", "large"]);
const COMMENT_FONT_SIZE_VALUES = new Set(["small", "medium", "large"]);
const SECTION_LINE_PLACEMENTS = new Set(["above", "below"]);
const OVERLAY_TONES = new Set(["standard", "geometry"]);

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

function normalizeOverlayTone(value) {
  return OVERLAY_TONES.has(value) ? value : "standard";
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
  const kind = part.kind === "break" ? "break" : part.kind === "text" ? "text" : "math";
  const text = kind === "text" ? String(part.text ?? "") : "";
  const tex = kind === "math" ? normalizeText(part.tex, "?") : "";
  const markerLeft = Number(part.sectionMarker?.left);
  const markerWidth = Number(part.sectionMarker?.width);
  const normalizedMarkerLeft = Math.min(94, Math.max(0, markerLeft));
  const sectionMarker =
    Number.isFinite(markerLeft) && Number.isFinite(markerWidth)
      ? {
          left: normalizedMarkerLeft,
          width: Math.min(100 - normalizedMarkerLeft, Math.max(6, markerWidth)),
        }
      : null;
  return {
    id: normalizeText(part.id, `part-${index + 1}`),
    kind,
    text,
    tex,
    anchorId: normalizeOptionalText(part.anchorId),
    ...(sectionMarker ? { sectionMarker } : {}),
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
    tone: normalizeOverlayTone(overlay.tone),
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
    title: normalizeEquationTitle(document.title),
    subject: normalizeText(document.subject, SUBJECT_GROUPS[0]),
    formulaTeX: normalizeText(document.formulaTeX, formulaParts.map((part) => part.tex || part.text).join("")),
    formulaParts,
    anchors,
    overlays,
    backgroundId: normalizeBackgroundId(document.backgroundId),
    claimLevel: normalizeClaimLevel(document.claimLevel),
  };
}

function normalizeEquationTitle(title) {
  return normalizeText(title, "Equation").replace(/^EQ-\d+\s+/u, "");
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

function mathPart(id, tex, anchorId = id, sectionMarker = null) {
  return { id, kind: "math", tex, anchorId, ...(sectionMarker ? { sectionMarker } : {}) };
}

function textPart(id, text) {
  return { id, kind: "text", text };
}

function breakPart(id) {
  return { id, kind: "break" };
}

function overlay(
  id,
  title,
  targetAnchorId,
  text,
  tex,
  { x = 10, y = 12, width = 24, line = "above", tone = "standard" } = {}
) {
  const content = [{ type: "text", text }];
  if (tex) {
    content.push({ type: "math", tex, displayMode: false });
  }
  return {
    id,
    title,
    status: "candidate",
    tone,
    targetAnchorId,
    sectionLinePlacement: line,
    position: { x, y, width },
    content,
  };
}

const equationMapSeedDocuments = [
  {
    id: "eq-01-causal-wake-master-equation",
    title: "Causal Wake Master Equation",
    subject: "AAA native rows",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "accepted-aaa-derivation",
    formulaTeX:
      "\\mathbf A_{o'\\leftarrow o}=\\kappa\\sigma_{q_oq_{o'}}\\frac{|q_oq_{o'}|}{r^2}W_{o'\\leftarrow o}^{\\mathrm{rec}}\\hat{\\mathbf r}",
    anchors: [
      anchor("acceleration", "acceleration response", "per-hit acceleration active root"),
      anchor("polarity", "source polarity", "kappa sigma source receiver polarity"),
      anchor("inverseSquare", "wake dilution", "inverse-square causal wake dilution"),
      anchor("branchStrength", "branch strength", "receiver-normal source-normal denominator branch factor"),
      anchor("direction", "line of action", "line-of-action causal-root direction"),
    ],
    formulaParts: [
      mathPart("acceleration", "\\mathbf A_{o'\\leftarrow o}", "acceleration"),
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
        "Acceleration response",
        "acceleration",
        "Start with the left side: this is acceleration, the receiver's change in velocity. In AAA, one causal root reaches the receiver, and this symbol is the receiver's response to that hit.",
        "\\mathbf A_{o'\\leftarrow o}",
        { x: 5, y: 8, width: 30, line: "above" }
      ),
      overlay(
        "polarity-coupling",
        "Sign and coupling",
        "polarity",
        "A force law needs two things before distance matters: which way the effect points, and how strongly it couples. In AAA, this term stores the ordered source-receiver sign and coupling for the active root.",
        "\\kappa\\sigma_{q_oq_{o'}}",
        { x: 35, y: 8, width: 30, line: "above" }
      ),
      overlay(
        "wake-dilution",
        "Wake dilution",
        "inverseSquare",
        "This is the distance part. The same influence spreads over a larger sphere as r grows, so the strength falls like 1/r squared. In AAA, that spreading is the finite-speed wake from the source.",
        "r^{-2}",
        { x: 65, y: 22, width: 30, line: "above" }
      ),
      overlay(
        "receiver-normal",
        "History factor",
        "branchStrength",
        "A delayed signal can arrive after its timing has been stretched, compressed, or weighted by the path. In AAA, this factor tells the receiver how source history and receiver history change the hit.",
        "W^{\\mathrm{rec}}=\\left|D_T/D_s\\right|",
        { x: 6, y: 68, width: 34, line: "below" }
      ),
      overlay(
        "line-of-action",
        "Line of action",
        "direction",
        "The unit vector is the arrow part of the law. It says, 'the acceleration points along this line.' In AAA, the direction comes from the same source-to-receiver causal root as the strength.",
        "\\hat{\\mathbf r}",
        { x: 60, y: 82, width: 34, line: "below" }
      ),
    ],
  },
  {
    id: "eq-02-lorentz-clock-rate",
    title: "Lorentz Factor And Clock Rate",
    subject: "Relativity and effective metric",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX:
      "\\gamma_\\star(\\mathbf w_{\\mathrm{eff}})=\\frac{1}{\\rule{0pt}{1.06em}\\sqrt{1-\\lVert\\mathbf w_{\\mathrm{eff}}\\rVert^2/c_\\star^2}},\\quad d\\tau/dt_{\\mathrm{eff}}=1/\\gamma_\\star",
    anchors: [
      anchor("gammaFactor", "Lorentz factor", "gamma clock ruler factor"),
      anchor("driftSpeed", "drift speed", "motion through local Noether sea"),
      anchor("clockRate", "clock rate", "moving clock readout"),
    ],
    formulaParts: [
      mathPart("gammaFactor", "\\gamma_\\star(\\mathbf w_{\\mathrm{eff}})", "gammaFactor"),
      textPart("eq", " = "),
      mathPart(
        "driftSpeed",
        "\\frac{1}{\\rule{0pt}{1.06em}\\sqrt{1-\\lVert\\mathbf w_{\\mathrm{eff}}\\rVert^2/c_\\star^2}}",
        "driftSpeed",
        { left: 42, width: 24 }
      ),
      mathPart("comma", ",\\quad", ""),
      mathPart("clockRate", "d\\tau/dt_{\\mathrm{eff}}=1/\\gamma_\\star", "clockRate"),
    ],
    overlays: [
      overlay(
        "drift-through-sea",
        "Drift through sea",
        "driftSpeed",
        "This is the speed used inside γ. It is not speed through nothing; it is speed relative to the local Noether sea flow. If the sea itself is moving, AAA subtracts that flow first.",
        "\\mathbf w_{\\mathrm{eff}}=\\mathbf V_{\\mathrm{cm,eff}}-\\mathbf u_{\\mathrm{sea,eff}}",
        { x: 6, y: 8, width: 34, line: "above" }
      ),
      overlay(
        "clock-consumer",
        "Clock rate",
        "clockRate",
        "The right equation says the moving clock advances by 1/γ compared with the observer's time. In AAA, absolute time is steady and linear; the clock's tick rate is the local readout that changes.",
        "d\\tau/dt_{\\mathrm{eff}}=1/\\gamma_\\star",
        { x: 58, y: 68, width: 34, line: "below" }
      ),
      overlay(
        "branch-blocker",
        "One Lorentz factor",
        "gammaFactor",
        "γ is the Lorentz factor. Moving clocks use 1/γ, lengths along the motion use 1/γ, and momentum-energy uses γ. In AAA, one stored branch history produces all three readouts.",
        "\\gamma_\\star\\rightarrow S_{\\mathrm{eq}}",
        { x: 8, y: 82, width: 34, line: "below" }
      ),
    ],
  },
  {
    id: "eq-03-oblate-spheroidal-envelope",
    title: "Oblate Spheroidal Envelope",
    subject: "Relativity and effective metric",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX:
      "\\xi(v_{\\mathrm{eff}})\\equiv\\frac{R_{\\parallel}(v_{\\mathrm{eff}})}{R_{\\perp}(v_{\\mathrm{eff}})}\\to\\frac{1}{\\gamma_{\\mathrm{eff}}(v_{\\mathrm{eff}})}",
    anchors: [
      anchor("shapeRatio", "shape ratio", "Noether braid envelope xi"),
      anchor("parallelRadius", "parallel radius", "R parallel moving envelope"),
      anchor("perpendicularRadius", "perpendicular radius", "R perpendicular moving envelope"),
      anchor("gammaEff", "effective gamma", "weak homogeneous Lorentz target"),
    ],
    formulaParts: [
      mathPart("shapeRatio", "\\xi(v_{\\mathrm{eff}})", "shapeRatio"),
      mathPart("equiv", "\\equiv", ""),
      mathPart("parallelRadius", "R_{\\parallel}(v_{\\mathrm{eff}})", "parallelRadius"),
      textPart("slash", " / "),
      mathPart("perpendicularRadius", "R_{\\perp}(v_{\\mathrm{eff}})", "perpendicularRadius"),
      mathPart("arrow", "\\to", ""),
      mathPart("gammaEff", "\\frac{1}{\\gamma_{\\mathrm{eff}}(v_{\\mathrm{eff}})}", "gammaEff"),
    ],
    overlays: [
      overlay(
        "envelope-readout",
        "Envelope readout",
        "shapeRatio",
        "This ratio compares size along the motion with size across the motion. In ordinary relativity, the along-motion size is the one that shrinks. In AAA, the moving Noether braid envelope makes that shrinkage.",
        "\\xi=R_{\\parallel}/R_{\\perp}",
        { x: 6, y: 8, width: 34, line: "above" }
      ),
      overlay(
        "return-cycle",
        "Lorentz target",
        "gammaEff",
        "The target is 1 over effective γ. That means the along-motion radius is smaller by the Lorentz contraction factor. AAA gets this from return-cycle history, not from a new scale knob.",
        "\\xi\\to\\gamma_{\\mathrm{eff}}^{-1}",
        { x: 66, y: 68, width: 30, line: "below" }
      ),
      overlay(
        "transverse-radius",
        "Perpendicular radius",
        "perpendicularRadius",
        "This is the radius across the motion. Relativity leaves the crosswise direction as the reference radius. In AAA, R⊥ is the comparison radius while R∥ carries the contraction.",
        "R_{\\perp}(v_{\\mathrm{eff}})",
        { x: 35, y: 68, width: 30, line: "below" }
      ),
      overlay(
        "scale-separation",
        "Parallel radius",
        "parallelRadius",
        "This is the radius along the motion. It is the part expected to shrink. In AAA, that shape change stays separate from any overall growth or shrinkage of the whole envelope.",
        "R_{\\parallel}(v_{\\mathrm{eff}})",
        { x: 6, y: 68, width: 30, line: "below" }
      ),
    ],
  },
  {
    id: "eq-04-energy-momentum-rest-energy",
    title: "Energy Momentum And Rest Energy",
    subject: "Relativity and effective metric",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX:
      "E^2=p^2c_{\\mathrm{eff}}^2+M_0^2c_{\\mathrm{eff}}^4\\\\ M_0=\\frac{E}{\\gamma_{\\mathrm{eff}}c_{\\mathrm{eff}}^2}",
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
      breakPart("rest-mass-solve-break"),
      mathPart(
        "restMassSolve",
        "M_0=\\frac{E}{\\gamma_{\\mathrm{eff}}c_{\\mathrm{eff}}^2}",
        ""
      ),
    ],
    overlays: [
      overlay(
        "energy-readout",
        "Energy readout",
        "energy",
        "E squared is total energy squared. It combines motion energy and rest energy. In AAA, this is the conserved energy readout of the branch history.",
        "E^2",
        { x: 4, y: 8, width: 22, line: "above" }
      ),
      overlay(
        "motion-response",
        "Motion response",
        "momentum",
        "p includes M₀ through p = effective γ times M₀ times effective v. That is why the solve row uses effective γ, not a separate p. In AAA, motion, mass, and speed stay in one row.",
        "p^2c_{\\mathrm{eff}}^2=\\gamma_{\\mathrm{eff}}^2M_0^2v_{\\mathrm{eff}}^2c_{\\mathrm{eff}}^2",
        { x: 26, y: 8, width: 25, line: "above" }
      ),
      overlay(
        "mass-response",
        "Mass response",
        "restMass",
        "M0 is rest mass: energy carried even when the object is not moving in this frame. In AAA, rest mass reads as trapped internal causal history coupled to the Noether sea.",
        "M_0^2c_{\\mathrm{eff}}^4",
        { x: 73, y: 8, width: 22, line: "above" }
      ),
      overlay(
        "speed-role",
        "Speed role",
        "effectiveSpeed",
        "Effective c is the conversion speed. It lets momentum and mass be compared as energy. In AAA, this speed is declared once for the row.",
        "c_{\\mathrm{eff}}",
        { x: 51, y: 8, width: 22, line: "above" }
      ),
    ],
  },
  {
    id: "eq-05-noether-conservation",
    title: "Noether Conservation Rows",
    subject: "Conservation and Noether structure",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX: "\\frac{dE_{\\mathrm{tot}}}{dT}=0,\\quad \\mathbf P_{\\mathrm{tot}}=\\mathbf P_{\\mathrm{mech}}+\\mathbf P_{\\mathrm{wake}}",
    anchors: [
      anchor("energyConservation", "energy conservation", "finite-window total energy"),
      anchor("totalMomentum", "total momentum", "finite-window total momentum"),
      anchor("mechanicalMomentum", "mechanical momentum", "mechanical subsystem"),
      anchor("wakeMomentum", "wake momentum", "wake boundary flux history"),
    ],
    formulaParts: [
      mathPart("energyConservation", "\\frac{dE_{\\mathrm{tot}}}{dT}=0", "energyConservation"),
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
        "Energy conserved",
        "energyConservation",
        "This says total energy in the chosen window is not changing. If one part gains energy, another part or the wake must lose it. In AAA, the accounting window is finite and uses absolute time T.",
        "dE_{\\mathrm{tot}}/dT=0",
        { x: 6, y: 8, width: 34, line: "above" }
      ),
      overlay(
        "mechanical-side",
        "Mechanical side",
        "mechanicalMomentum",
        "Mechanical momentum is carried by the visible moving pieces. In ordinary physics this is the part you would compute from masses and velocities. In AAA, it is only one row of the total momentum ledger.",
        "\\mathbf P_{\\mathrm{mech}}",
        { x: 8, y: 68, width: 34, line: "below" }
      ),
      overlay(
        "wake-side",
        "Wake side",
        "wakeMomentum",
        "Wake momentum is the balance not carried by the visible pieces. Think field momentum or delayed-signal momentum. In AAA, the delayed causal wake carries that balance so total momentum can still close.",
        "\\mathbf P_{\\mathrm{wake}}",
        { x: 58, y: 82, width: 34, line: "below" }
      ),
    ],
  },
  {
    id: "eq-06-noether-sea-continuity",
    title: "Noether Sea Continuity",
    subject: "Conservation and Noether structure",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX: "\\partial_T\\rho_{\\mathrm{NS}}+\\nabla_{\\mathbf X}\\cdot(\\rho_{\\mathrm{NS}}\\mathbf u_{\\mathrm{sea}})=S_{\\rho}+r_{\\rho}",
    anchors: [
      anchor("densityChange", "density change", "Noether sea density time derivative"),
      anchor("flowDivergence", "flow divergence", "Noether sea transport flow"),
      anchor("sourceTerm", "source term", "source loading row"),
      anchor("residual", "residual", "moment closure residual"),
    ],
    formulaParts: [
      mathPart("densityChange", "\\partial_T\\rho_{\\mathrm{NS}}", "densityChange"),
      textPart("plus", " + "),
      mathPart("flowDivergence", "\\nabla_{\\mathbf X}\\cdot(\\rho_{\\mathrm{NS}}\\mathbf u_{\\mathrm{sea}})", "flowDivergence"),
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
        "ρₙₛ is the Noether sea density: how much sea is here. This term asks how that amount changes with time. The rest of the equation explains the change by flow, sources, and leftover.",
        "\\rho_{\\mathrm{NS}}(\\mathbf X,T)",
        { x: 6, y: 8, width: 34, line: "above" }
      ),
      overlay(
        "transport-row",
        "Transport row",
        "flowDivergence",
        "This is density carried by sea flow. The divergence operator compares flow in versus flow out. In AAA, uₛₑₐ is the Noether sea flow in native coordinates.",
        "\\rho_{\\mathrm{NS}}\\mathbf u_{\\mathrm{sea}}(\\mathbf X,T)",
        { x: 60, y: 22, width: 34, line: "above" }
      ),
      overlay(
        "source-residual",
        "Source loading",
        "sourceTerm",
        "Sᵨ is the known source term. It marks declared events that add or remove Noether sea density. In AAA, these sources are counted directly before the leftover term is read.",
        "S_{\\rho}",
        { x: 7, y: 68, width: 36, line: "below" }
      ),
      overlay(
        "density-residual",
        "Leftover term",
        "residual",
        "rᵨ is what remains after density change, flow, and known sources are counted. If it is not zero, AAA shows the missing carrier or response row instead of hiding it.",
        "r_{\\rho}",
        { x: 58, y: 82, width: 34, line: "below" }
      ),
    ],
  },
  {
    id: "eq-07-effective-metric-adm-cartan",
    title: "Effective Metric ADM/Cartan Map",
    subject: "Relativity and effective metric",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX:
      "ds_{\\mathrm{eff}}^2=\\gamma_{ij}^{\\mathrm{eff}}(dx_{\\mathrm{eff}}^i-u^i_{\\mathrm{sea,eff}}dt_{\\mathrm{eff}})(dx_{\\mathrm{eff}}^j-u^j_{\\mathrm{sea,eff}}dt_{\\mathrm{eff}})-N^2c_0^2dt_{\\mathrm{eff}}^2",
    anchors: [
      anchor("lineElement", "effective line element", "observer-level effective metric"),
      anchor("lapse", "lapse", "clock channel lapse"),
      anchor("spatialCompliance", "spatial compliance", "spatial metric compliance"),
      anchor("drift", "sea drift", "Noether sea drift"),
    ],
    formulaParts: [
      mathPart("lineElement", "ds_{\\mathrm{eff}}^2", "lineElement"),
      textPart("eq", " = "),
      mathPart("spatialCompliance", "\\gamma_{ij}^{\\mathrm{eff}}", "spatialCompliance"),
      mathPart(
        "drift",
        "(dx_{\\mathrm{eff}}^i-u^i_{\\mathrm{sea,eff}}dt_{\\mathrm{eff}})(dx_{\\mathrm{eff}}^j-u^j_{\\mathrm{sea,eff}}dt_{\\mathrm{eff}})",
        "drift"
      ),
      textPart("minus", " - "),
      mathPart("lapse", "N^2c_0^2dt_{\\mathrm{eff}}^2", "lapse"),
    ],
    overlays: [
      overlay(
        "observer-level",
        "Observer-level metric",
        "lineElement",
        "A line element tells an observer how to measure intervals between nearby events. This one is effective: it describes what clocks and rulers see. In AAA, it is built from response rows, not treated as the underlying substrate.",
        "ds_{\\mathrm{eff}}^2",
        { x: 3, y: 6, width: 30, line: "above" }
      ),
      overlay(
        "clock-channel",
        "Clock channel",
        "lapse",
        "The lapse term is the clock part of the metric. It tells how fast local clock time runs compared with the chosen time coordinate. In AAA, that cadence must come from the same Noether sea response as rulers and signals.",
        "N^2c_0^2dt_{\\mathrm{eff}}^2",
        { x: 68, y: 7, width: 30, line: "above" }
      ),
      overlay(
        "spatial-channel",
        "Spatial channel",
        "spatialCompliance",
        "γᵢⱼ is the ruler part of the metric. It tells how spatial distances are measured in different directions. In AAA, this is the spatial-compliance row; a scalar delay-only story would miss it.",
        "\\gamma_{ij}^{\\mathrm{eff}}",
        { x: 34, y: 7, width: 30, line: "above" }
      ),
      overlay(
        "drift-channel",
        "Drift channel",
        "drift",
        "The parentheses say: measure motion after subtracting the local sea flow. That is like using velocity relative to a moving current. In AAA, projected Noether sea drift affects paths, clocks, and weak-field readings.",
        "u^i_{\\mathrm{sea,eff}}",
        { x: 58, y: 82, width: 34, line: "below" }
      ),
    ],
  },
  {
    id: "eq-08-weak-field-clock-redshift",
    title: "Weak-Field Clock And Redshift",
    subject: "Relativity and effective metric",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX: "d\\tau/dt_{\\mathrm{eff}}\\approx1+\\Phi_N/c_0^2-\\lVert\\mathbf w_{\\mathrm{eff}}\\rVert^2/(2c_0^2)",
    anchors: [
      anchor("clockRate", "clock rate", "weak-field proper time readout"),
      anchor("potentialTerm", "potential term", "Newtonian potential cadence"),
      anchor("motionTerm", "motion term", "velocity clock correction"),
    ],
    formulaParts: [
      mathPart("clockRate", "d\\tau/dt_{\\mathrm{eff}}", "clockRate"),
      mathPart("approx", "\\approx", ""),
      mathPart("one", "1", ""),
      textPart("plus", " + "),
      mathPart("potentialTerm", "\\Phi_N/c_0^2", "potentialTerm"),
      textPart("minus", " - "),
      mathPart("motionTerm", "\\lVert\\mathbf w_{\\mathrm{eff}}\\rVert^2/(2c_0^2)", "motionTerm"),
    ],
    overlays: [
      overlay(
        "cadence-readout",
        "Cadence readout",
        "clockRate",
        "This left side is clock time per observer time. A value below 1 means the local clock is running slow relative to the observer coordinate. In AAA, that rate is read from Noether sea cadence, density, delay, and potential response.",
        "\\Gamma_N\\rightarrow d\\tau/dt_{\\mathrm{eff}}",
        { x: 6, y: 8, width: 34, line: "above" }
      ),
      overlay(
        "potential-response",
        "Potential response",
        "potentialTerm",
        "Φₙ over c₀ squared is the weak-gravity term. Near a gravitational potential, clock rates shift. In AAA, that shift comes from the same response record that also controls acceleration and path bending.",
        "\\Phi_N/c_0^2",
        { x: 8, y: 68, width: 34, line: "below" }
      ),
      overlay(
        "moving-clock",
        "Moving clock",
        "motionTerm",
        "This is the speed correction: a moving clock runs slower. It is the low-speed version of the γ effect. In AAA, it uses the same stored branch history as γ and ruler contraction.",
        "\\lVert\\mathbf w_{\\mathrm{eff}}\\rVert^2/(2c_0^2)",
        { x: 58, y: 82, width: 34, line: "below" }
      ),
    ],
  },
  {
    id: "eq-09-shapiro-lensing-ppn",
    title: "Shapiro Lensing And PPN Rows",
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
        "Delta theta is the bend angle of a light path. In standard gravity, mass changes the path that light follows. In AAA, this is the null-path projection of the effective metric.",
        "\\Delta\\theta",
        { x: 6, y: 8, width: 34, line: "above" }
      ),
      overlay(
        "ppn-handoff",
        "Curvature factor",
        "ppn",
        "γₚₚₙ is the standard weak-gravity factor for how much spatial curvature contributes to light bending. In AAA, the same response record also explains Shapiro delay, acceleration, and redshift.",
        "\\gamma_{\\mathrm{PPN}}",
        { x: 58, y: 22, width: 34, line: "above" }
      ),
      overlay(
        "path-geometry",
        "Path geometry",
        "impact",
        "b is the impact distance: how close the light ray passes to the mass. c0 squared sets the light-speed scale. In AAA, this denominator keeps spatial compliance in the path geometry, not only clock delay.",
        "b c_0^2",
        { x: 7, y: 68, width: 34, line: "below" }
      ),
    ],
  },
  {
    id: "eq-17-redshift-factorization",
    title: "Redshift Factorization",
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
        "1+zₓ is the redshift factor: received wavelength compared with emitted wavelength. If it is bigger than 1, the light arrives redder. In AAA, the full product must account for endpoint clocks, source behavior, motion, and path history.",
        "1+z_X",
        { x: 6, y: 8, width: 34, line: "above" }
      ),
      overlay(
        "endpoint-cadence",
        "Endpoint cadence",
        "emitterCadence",
        "The emitter clock and receiver clock both affect frequency. If either clock runs differently, the comparison changes. In AAA, both cadence terms live on one signed transfer ledger.",
        "\\Gamma_{N,E}/\\Gamma_{N,R}",
        { x: 58, y: 22, width: 34, line: "above" }
      ),
      overlay(
        "path-history",
        "Path history",
        "pathTransfer",
        "This factor is what happens during the trip from emitter to receiver. It is not an endpoint clock and not simple Doppler motion. In AAA, it records Noether sea path transfer before any cosmology comparison.",
        "\\mathcal P_{E\\to R}",
        { x: 7, y: 68, width: 34, line: "below" }
      ),
      overlay(
        "source-motion",
        "Source and motion",
        "sourceDoppler",
        "Bₓ is the source behavior factor, and Dᵥ is the Doppler motion factor. They are familiar places where redshift can enter. In AAA, they are tied to endpoint cadence and path history, not fitted alone.",
        "B_XD_v",
        { x: 58, y: 82, width: 34, line: "below" }
      ),
    ],
  },
  {
    id: "eq-11-geodesic-proper-time-action",
    title: "Geodesic Proper-Time Action",
    subject: "Relativity and effective metric",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX: "S_{\\mathrm{clk}}=-M_0c_0^2\\int d\\tau",
    anchors: [
      anchor("clockAction", "clock action", "proper time action"),
      anchor("restMass", "rest mass", "rest mass energy weight"),
      anchor("properTime", "proper time", "worldline clock time"),
    ],
    formulaParts: [
      mathPart("clockAction", "S_{\\mathrm{clk}}", "clockAction"),
      textPart("eq", " = "),
      mathPart("restMass", "-M_0c_0^2", "restMass"),
      textPart("space", " "),
      mathPart("properTime", "\\int d\\tau", "properTime"),
    ],
    overlays: [
      overlay(
        "least-clock-action",
        "Clock action",
        "clockAction",
        "This action scores the clock path. In relativity, the natural free path is the one that makes proper time stationary. In AAA, this is the observer-facing action readout of the same retained clock history.",
        "S_{\\mathrm{clk}}",
        { x: 6, y: 8, width: 30, line: "above" }
      ),
      overlay(
        "rest-energy-weight",
        "Rest-energy weight",
        "restMass",
        "M₀c₀ squared is the rest-energy scale multiplying the clock path. It tells the action how much internal energy is carried. In AAA, that weight comes from trapped internal causal history.",
        "M_0c_0^2",
        { x: 36, y: 8, width: 30, line: "above" }
      ),
      overlay(
        "proper-time-history",
        "Proper-time path",
        "properTime",
        "dτ is the clock time along the path. Current physics treats it as the time measured by the moving clock. In AAA, it is the local clock readout produced by steady absolute time filtered through the branch history.",
        "\\int d\\tau",
        { x: 66, y: 8, width: 30, line: "above", tone: "geometry" }
      ),
    ],
  },
  {
    id: "eq-12-poisson-einstein-weak-gravity",
    title: "Poisson And Einstein Source Map",
    subject: "Relativity and effective metric",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX:
      "\\nabla^2\\Phi_N=4\\pi G_{\\mathrm{eff}}\\rho_{\\mathrm{eff}},\\quad G_{\\mu\\nu}^{\\mathrm{eff}}=\\frac{8\\pi G_{\\mathrm{eff}}}{c_0^4}T_{\\mu\\nu}^{\\mathrm{eff}}",
    anchors: [
      anchor("potentialOperator", "potential operator", "Poisson response operator"),
      anchor("massDensity", "mass density", "effective source density"),
      anchor("einsteinTensor", "Einstein tensor", "effective curvature response"),
      anchor("stressEnergy", "stress energy", "effective stress energy source"),
    ],
    formulaParts: [
      mathPart("potentialOperator", "\\nabla^2\\Phi_N", "potentialOperator"),
      textPart("eq-1", " = "),
      mathPart("massDensity", "4\\pi G_{\\mathrm{eff}}\\rho_{\\mathrm{eff}}", "massDensity"),
      mathPart("comma", ",\\quad", ""),
      mathPart("einsteinTensor", "G_{\\mu\\nu}^{\\mathrm{eff}}", "einsteinTensor"),
      textPart("eq-2", " = "),
      mathPart("stressEnergy", "\\frac{8\\pi G_{\\mathrm{eff}}}{c_0^4}T_{\\mu\\nu}^{\\mathrm{eff}}", "stressEnergy"),
    ],
    overlays: [
      overlay(
        "poisson-response",
        "Potential response",
        "potentialOperator",
        "The Laplacian asks how the Newtonian potential curves through space. In standard weak gravity, this operator turns source density into a potential. In AAA, it is the weak-field response row of the Noether sea.",
        "\\nabla^2\\Phi_N",
        { x: 5, y: 8, width: 30, line: "above" }
      ),
      overlay(
        "density-source",
        "Source density",
        "massDensity",
        "ρ is the source density that loads the field. Ordinary gravity reads it as mass-energy density. In AAA, this points to the missing carrier question: which Noether sea row stores that source loading?",
        "\\rho_{\\mathrm{eff}}",
        { x: 36, y: 8, width: 30, line: "above", tone: "geometry" }
      ),
      overlay(
        "einstein-response",
        "Curvature response",
        "einsteinTensor",
        "G with two indices is the spacetime-curvature side of Einstein's equation. It packages clock and ruler effects together. In AAA, this is an effective metric response, not the substrate itself.",
        "G_{\\mu\\nu}^{\\mathrm{eff}}",
        { x: 6, y: 68, width: 34, line: "below" }
      ),
      overlay(
        "stress-source",
        "Stress-energy source",
        "stressEnergy",
        "T with two indices is the source side: energy density, pressure, and flow. In AAA, each part should trace to a stored carrier row instead of being only a fitted source table.",
        "T_{\\mu\\nu}^{\\mathrm{eff}}",
        { x: 58, y: 82, width: 34, line: "below" }
      ),
    ],
  },
  {
    id: "eq-13-photon-null-eikonal",
    title: "Photon Null And Eikonal Map",
    subject: "Quantum and QFT",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX: "E_\\gamma=h\\nu,\\quad g^{\\mathrm{eff}}_{\\mu\\nu}dx_{\\mathrm{eff}}^\\mu dx_{\\mathrm{eff}}^\\nu=0,\\quad k_\\mu k^\\mu_{\\mathrm{eff}}=0",
    anchors: [
      anchor("photonEnergy", "photon energy", "Planck photon energy"),
      anchor("nullPath", "null path", "effective metric light path"),
      anchor("eikonal", "eikonal condition", "wave vector null condition"),
    ],
    formulaParts: [
      mathPart("photonEnergy", "E_\\gamma=h\\nu", "photonEnergy"),
      mathPart("comma-1", ",\\quad", ""),
      mathPart("nullPath", "g^{\\mathrm{eff}}_{\\mu\\nu}dx_{\\mathrm{eff}}^\\mu dx_{\\mathrm{eff}}^\\nu=0", "nullPath"),
      mathPart("comma-2", ",\\quad", ""),
      mathPart("eikonal", "k_\\mu k^\\mu_{\\mathrm{eff}}=0", "eikonal"),
    ],
    overlays: [
      overlay(
        "photon-energy",
        "Photon energy",
        "photonEnergy",
        "Eγ equals h times frequency. That is the familiar photon energy rule. In AAA, the frequency is a clock-and-path readout, so photon energy must stay tied to the same carrier history.",
        "E_\\gamma=h\\nu",
        { x: 5, y: 8, width: 30, line: "above" }
      ),
      overlay(
        "null-light-path",
        "Null light path",
        "nullPath",
        "A null path has zero interval for light in the effective metric. This is how current relativity draws light cones. In AAA, the light cone is the geometry seen by signals moving through Noether sea response.",
        "ds_{\\mathrm{eff}}^2=0",
        { x: 36, y: 8, width: 30, line: "above", tone: "geometry" }
      ),
      overlay(
        "wave-vector-test",
        "Wave-vector test",
        "eikonal",
        "The eikonal condition is the wave version of a null path. It says the photon's wave vector is lightlike. In AAA, it is a sharp test that signal rows and metric rows are using one geometry.",
        "k_\\mu k^\\mu_{\\mathrm{eff}}=0",
        { x: 62, y: 76, width: 34, line: "below" }
      ),
    ],
  },
  {
    id: "eq-14-planck-debroglie-action",
    title: "Planck de Broglie Action Row",
    subject: "Quantum and QFT",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX: "E=h\\nu=\\hbar\\omega,\\quad \\mathbf p=\\hbar\\mathbf k,\\quad \\oint p\\,dq=nh",
    anchors: [
      anchor("frequencyEnergy", "frequency energy", "Planck energy frequency relation"),
      anchor("momentumWave", "momentum wave", "de Broglie wave vector"),
      anchor("closedAction", "closed action", "quantized action loop"),
    ],
    formulaParts: [
      mathPart("frequencyEnergy", "E=h\\nu=\\hbar\\omega", "frequencyEnergy"),
      mathPart("comma-1", ",\\quad", ""),
      mathPart("momentumWave", "\\mathbf p=\\hbar\\mathbf k", "momentumWave"),
      mathPart("comma-2", ",\\quad", ""),
      mathPart("closedAction", "\\oint p\\,dq=nh", "closedAction"),
    ],
    overlays: [
      overlay(
        "frequency-ledger",
        "Frequency energy",
        "frequencyEnergy",
        "This says energy is proportional to frequency. It is one of the first quantum rules students learn. In AAA, the frequency must be a real retained cadence, not only a label on a wave.",
        "E=h\\nu",
        { x: 5, y: 8, width: 30, line: "above" }
      ),
      overlay(
        "wave-vector-row",
        "Momentum wave",
        "momentumWave",
        "Momentum is tied to wave vector k. Larger k means shorter wavelength and larger momentum. In AAA, this points to a carrier row where phase advance and directed motion stay locked together.",
        "\\mathbf p=\\hbar\\mathbf k",
        { x: 36, y: 8, width: 30, line: "above" }
      ),
      overlay(
        "closed-action-row",
        "Closed action",
        "closedAction",
        "The loop integral says only whole action counts fit around a closed cycle. In AAA, this is a geometry clue: a stable branch record must close its return cycle without a leftover phase.",
        "\\oint p\\,dq=nh",
        { x: 62, y: 76, width: 34, line: "below", tone: "geometry" }
      ),
    ],
  },
  {
    id: "eq-15-maxwell-wave-current",
    title: "Maxwell Wave And Current Map",
    subject: "Quantum and QFT",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX: "\\partial_\\nu F^{\\mu\\nu}=\\mu_0J^\\mu,\\quad \\Box A_\\mu=\\mu_0J_\\mu",
    anchors: [
      anchor("fieldDivergence", "field divergence", "Maxwell field response"),
      anchor("fourCurrent", "four-current", "charge current source"),
      anchor("waveOperator", "wave operator", "field wave response"),
    ],
    formulaParts: [
      mathPart("fieldDivergence", "\\partial_\\nu F^{\\mu\\nu}", "fieldDivergence"),
      textPart("eq-1", " = "),
      mathPart("fourCurrent", "\\mu_0J^\\mu", "fourCurrent"),
      mathPart("comma", ",\\quad", ""),
      mathPart("waveOperator", "\\Box A_\\mu=\\mu_0J_\\mu", "waveOperator"),
    ],
    overlays: [
      overlay(
        "field-response",
        "Field response",
        "fieldDivergence",
        "This is the Maxwell operator side. It tells how the electromagnetic field changes in spacetime. In AAA, it is a current-to-signal response row that must still respect finite propagation.",
        "\\partial_\\nu F^{\\mu\\nu}",
        { x: 5, y: 8, width: 30, line: "above" }
      ),
      overlay(
        "current-source",
        "Current source",
        "fourCurrent",
        "J is charge and current in one four-vector. It is the source side of the field equation. In AAA, that source must be carried by signed branch history rather than being only a point label.",
        "J^\\mu",
        { x: 36, y: 8, width: 30, line: "above" }
      ),
      overlay(
        "wave-response",
        "Wave response",
        "waveOperator",
        "The box operator is the spacetime wave operator. It is the part that makes disturbances propagate as waves. In AAA, it is a direct clue for the carrier geometry of signal rows.",
        "\\Box A_\\mu",
        { x: 62, y: 76, width: 34, line: "below", tone: "geometry" }
      ),
    ],
  },
  {
    id: "eq-16-schrodinger-born-current",
    title: "Schrodinger Born Current Map",
    subject: "Quantum and QFT",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX: "i\\hbar\\partial_{t_{\\mathrm{eff}}}\\psi_{\\mathrm{eff}}=\\hat H_{\\mathrm{eff}}\\psi_{\\mathrm{eff}},\\quad \\partial_{t_{\\mathrm{eff}}}\\rho_{\\mathrm{rec}}+\\nabla_{\\mathrm{eff}}\\cdot\\mathbf J_{\\mathrm{rec}}=0",
    anchors: [
      anchor("waveEvolution", "wave evolution", "Schrodinger equation"),
      anchor("recordDensity", "record density", "Born density readout"),
      anchor("recordCurrent", "record current", "probability current conservation"),
    ],
    formulaParts: [
      mathPart("waveEvolution", "i\\hbar\\partial_{t_{\\mathrm{eff}}}\\psi_{\\mathrm{eff}}=\\hat H_{\\mathrm{eff}}\\psi_{\\mathrm{eff}}", "waveEvolution"),
      mathPart("comma", ",\\quad", ""),
      mathPart("recordDensity", "\\partial_{t_{\\mathrm{eff}}}\\rho_{\\mathrm{rec}}", "recordDensity"),
      textPart("plus", " + "),
      mathPart("recordCurrent", "\\nabla_{\\mathrm{eff}}\\cdot\\mathbf J_{\\mathrm{rec}}=0", "recordCurrent"),
    ],
    overlays: [
      overlay(
        "wave-law",
        "Wave evolution",
        "waveEvolution",
        "The Schrodinger equation tells how the quantum state changes with effective observer time. In current physics, the Hamiltonian sets the energy rule. In AAA, the question becomes which retained record evolves under that rule.",
        "i\\hbar\\partial_{t_{\\mathrm{eff}}}\\psi_{\\mathrm{eff}}=\\hat H_{\\mathrm{eff}}\\psi_{\\mathrm{eff}}",
        { x: 5, y: 8, width: 34, line: "above" }
      ),
      overlay(
        "density-readout",
        "Density readout",
        "recordDensity",
        "ρ is the density being conserved. In ordinary quantum mechanics it is the Born probability density. In AAA, this points to a real record-density readout rather than a floating probability cloud.",
        "\\rho_{\\mathrm{rec}}",
        { x: 10, y: 76, width: 34, line: "below" }
      ),
      overlay(
        "current-readout",
        "Current readout",
        "recordCurrent",
        "J is the current that moves the density around. The equation says density is not lost; it flows. In AAA, this is a carrier-flow map for retained branch records.",
        "\\mathbf J_{\\mathrm{rec}}",
        { x: 58, y: 82, width: 34, line: "below", tone: "geometry" }
      ),
    ],
  },
  {
    id: "eq-18-effective-frw-scale-factor",
    title: "Effective FRW Scale Factor",
    subject: "Cosmology and astrophysics",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX: "ds_{\\mathrm{FRW,eff}}^2=-c_0^2d\\tau_c^2+a_{\\mathrm{eff}}^2(t_{\\mathrm{eff}})d\\Sigma_k^2",
    anchors: [
      anchor("frwMetric", "FRW metric", "effective cosmology metric"),
      anchor("cosmicClock", "cosmic clock", "cosmic proper time"),
      anchor("scaleFactor", "scale factor", "effective cosmological scale factor"),
      anchor("spatialSlice", "spatial slice", "constant curvature spatial geometry"),
    ],
    formulaParts: [
      mathPart("frwMetric", "ds_{\\mathrm{FRW,eff}}^2", "frwMetric"),
      textPart("eq", " = "),
      mathPart("cosmicClock", "-c_0^2d\\tau_c^2", "cosmicClock"),
      textPart("plus", " + "),
      mathPart("scaleFactor", "a_{\\mathrm{eff}}^2(t_{\\mathrm{eff}})", "scaleFactor"),
      mathPart("spatialSlice", "d\\Sigma_k^2", "spatialSlice"),
    ],
    overlays: [
      overlay(
        "cosmic-line-element",
        "Cosmic line element",
        "frwMetric",
        "FRW is the standard large-scale metric used in cosmology. It separates clock time from the spatial size of the universe. In AAA, this is an effective observer map of the Noether sea at cosmic scale.",
        "ds_{\\mathrm{FRW,eff}}^2",
        { x: 3, y: 8, width: 22, line: "above" }
      ),
      overlay(
        "cosmic-clock-row",
        "Cosmic clock",
        "cosmicClock",
        "This is the time part of the metric. It marks the clock used by a smooth cosmic observer. In AAA, absolute time remains steady; this term is the cosmology clock readout.",
        "d\\tau_c",
        { x: 27, y: 8, width: 22, line: "above" }
      ),
      overlay(
        "scale-factor-row",
        "Scale factor",
        "scaleFactor",
        "The effective scale factor is the ruler that tells how cosmic distances compare over effective observer time. In AAA, the same behavior should be read as Noether sea expansion or response history, not empty space stretching by itself.",
        "a_{\\mathrm{eff}}(t_{\\mathrm{eff}})",
        { x: 51, y: 8, width: 22, line: "above", tone: "geometry" }
      ),
      overlay(
        "spatial-curvature-row",
        "Spatial slice",
        "spatialSlice",
        "This term is the spatial geometry at one cosmic time. k labels whether the idealized slice is flat, closed, or open. In AAA, it is an effective large-scale spatial-compliance row.",
        "d\\Sigma_k^2",
        { x: 75, y: 8, width: 22, line: "above" }
      ),
    ],
  },
  {
    id: "eq-19-friedmann-continuity-lcdm",
    title: "Friedmann LCDM Continuity",
    subject: "Cosmology and astrophysics",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX:
      "H_{\\mathrm{eff}}^2=\\frac{8\\pi G_{\\mathrm{eff}}}{3}\\rho_{\\mathrm{eff}}-\\frac{kc_0^2}{a_{\\mathrm{eff}}^2}+\\frac{\\Lambda_{\\mathrm{eff}}}{3},\\quad \\partial_{t_{\\mathrm{eff}}}\\rho_{\\mathrm{eff}}+3H_{\\mathrm{eff}}(\\rho_{\\mathrm{eff}}+p_{\\mathrm{eff}}/c_0^2)=0",
    anchors: [
      anchor("hubble", "Hubble rate", "effective cosmic expansion rate"),
      anchor("density", "density source", "effective cosmic density source"),
      anchor("curvature", "curvature term", "spatial curvature term"),
      anchor("lambda", "Lambda term", "dark energy or Noether sea pressure term"),
      anchor("continuity", "continuity law", "cosmic density conservation"),
    ],
    formulaParts: [
      mathPart("hubble", "H_{\\mathrm{eff}}^2", "hubble"),
      textPart("eq", " = "),
      mathPart("density", "\\frac{8\\pi G_{\\mathrm{eff}}}{3}\\rho_{\\mathrm{eff}}", "density"),
      textPart("minus", " - "),
      mathPart("curvature", "\\frac{kc_0^2}{a_{\\mathrm{eff}}^2}", "curvature"),
      textPart("plus", " + "),
      mathPart("lambda", "\\frac{\\Lambda_{\\mathrm{eff}}}{3}", "lambda"),
      mathPart("comma", ",\\quad", ""),
      mathPart("continuity", "\\partial_{t_{\\mathrm{eff}}}\\rho_{\\mathrm{eff}}+3H_{\\mathrm{eff}}(\\rho_{\\mathrm{eff}}+p_{\\mathrm{eff}}/c_0^2)=0", "continuity"),
    ],
    overlays: [
      overlay(
        "hubble-readout",
        "Hubble rate",
        "hubble",
        "H is the expansion rate of the large-scale universe. LCDM uses it as the main time-varying readout. In AAA, it should be a Noether sea response readout, not an independent dial.",
        "H_{\\mathrm{eff}}^2",
        { x: 3, y: 8, width: 21, line: "above" }
      ),
      overlay(
        "density-loading",
        "Density loading",
        "density",
        "ρ is the matter and energy density source. In LCDM it helps set the expansion rate. In AAA, this density must connect to source loading in the Noether sea.",
        "\\rho_{\\mathrm{eff}}",
        { x: 25, y: 8, width: 21, line: "above" }
      ),
      overlay(
        "curvature-budget",
        "Curvature budget",
        "curvature",
        "This term is the spatial curvature part. It changes the expansion budget if the large-scale slice is not flat. In AAA, it belongs to the effective spatial-compliance map.",
        "kc_0^2/a_{\\mathrm{eff}}^2",
        { x: 47, y: 8, width: 21, line: "above" }
      ),
      overlay(
        "lambda-pressure",
        "Lambda pressure",
        "lambda",
        "Λ is the LCDM dark-energy term. It behaves like a smooth pressure or energy of the background. In AAA, this is a prime place to test whether the Noether sea has a constitutive pressure row.",
        "\\Lambda_{\\mathrm{eff}}/3",
        { x: 69, y: 8, width: 24, line: "above", tone: "geometry" }
      ),
      overlay(
        "cosmic-continuity",
        "Cosmic continuity",
        "continuity",
        "This conservation law says cosmic density changes when expansion dilutes it and pressure does work. In AAA, it should match a finite-window Noether sea continuity ledger.",
        "\\partial_{t_{\\mathrm{eff}}}\\rho_{\\mathrm{eff}}+3H_{\\mathrm{eff}}(\\rho_{\\mathrm{eff}}+p_{\\mathrm{eff}}/c_0^2)=0",
        { x: 58, y: 82, width: 34, line: "below" }
      ),
    ],
  },
  {
    id: "eq-20-dark-energy-equation-of-state",
    title: "Dark Energy Equation Of State",
    subject: "Cosmology and astrophysics",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX:
      "p_{\\mathrm{DE,eff}}=w\\rho_{\\mathrm{DE,eff}}c_0^2,\\quad \\Lambda_{\\mathrm{eff}}=\\frac{8\\pi G_{\\mathrm{eff}}}{c_0^2}\\rho_{\\mathrm{DE,eff}}",
    anchors: [
      anchor("pressureLaw", "pressure law", "dark energy pressure equation of state"),
      anchor("equationState", "equation state", "w parameter"),
      anchor("lambdaDensity", "Lambda density", "Lambda density conversion"),
    ],
    formulaParts: [
      mathPart("pressureLaw", "p_{\\mathrm{DE,eff}}", "pressureLaw"),
      textPart("eq-1", " = "),
      mathPart("equationState", "w\\rho_{\\mathrm{DE,eff}}c_0^2", "equationState"),
      mathPart("comma", ",\\quad", ""),
      mathPart("lambdaDensity", "\\Lambda_{\\mathrm{eff}}=\\frac{8\\pi G_{\\mathrm{eff}}}{c_0^2}\\rho_{\\mathrm{DE,eff}}", "lambdaDensity"),
    ],
    overlays: [
      overlay(
        "dark-pressure",
        "Dark-energy pressure",
        "pressureLaw",
        "p is pressure. For dark energy, pressure is the part that makes the expansion behavior unusual. In AAA, pressure should be a Noether sea constitutive response, not only a name for acceleration.",
        "p_{\\mathrm{DE,eff}}",
        { x: 5, y: 8, width: 28, line: "above" }
      ),
      overlay(
        "w-parameter",
        "Equation state",
        "equationState",
        "w tells how pressure compares with energy density. LCDM uses w near negative one for a cosmological-constant-like term. In AAA, w should come from the medium response law.",
        "w",
        { x: 36, y: 8, width: 28, line: "above" }
      ),
      overlay(
        "lambda-density",
        "Lambda density",
        "lambdaDensity",
        "This converts a smooth dark-energy density into Λ. In AAA, the geometry reading is direct: find the Noether sea row whose density and pressure create this effective term.",
        "\\rho_{\\mathrm{DE,eff}}\\to\\Lambda_{\\mathrm{eff}}",
        { x: 66, y: 8, width: 30, line: "above", tone: "geometry" }
      ),
    ],
  },
  {
    id: "eq-21-rar-btfr-galaxy-response",
    title: "Galaxy Acceleration Response",
    subject: "Cosmology and astrophysics",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX: "g_{\\mathrm{obs}}\\approx\\sqrt{g_{\\mathrm{bar}}a_0},\\quad v_f^4=G M_b a_0",
    anchors: [
      anchor("observedAccel", "observed acceleration", "radial acceleration relation observed acceleration"),
      anchor("baryonAccel", "baryon acceleration", "baryonic Newtonian acceleration"),
      anchor("flatVelocity", "flat velocity", "baryonic Tully Fisher relation"),
    ],
    formulaParts: [
      mathPart("observedAccel", "g_{\\mathrm{obs}}", "observedAccel"),
      mathPart("approx", "\\approx", ""),
      mathPart("baryonAccel", "\\sqrt{g_{\\mathrm{bar}}a_0}", "baryonAccel"),
      mathPart("comma", ",\\quad", ""),
      mathPart("flatVelocity", "v_f^4=G M_b a_0", "flatVelocity"),
    ],
    overlays: [
      overlay(
        "observed-g",
        "Observed acceleration",
        "observedAccel",
        "g observed is the acceleration inferred from galaxy rotation. It is larger than the visible-baryon estimate in the low-acceleration regime. In AAA, this is a response readout of the Noether sea around galaxies.",
        "g_{\\mathrm{obs}}",
        { x: 5, y: 8, width: 28, line: "above", tone: "geometry" }
      ),
      overlay(
        "baryon-g",
        "Baryon acceleration",
        "baryonAccel",
        "g bar is the Newtonian acceleration expected from ordinary baryonic matter. It is the visible-source side of the relation. In AAA, this source side must be tied to the same mass-loading ledger.",
        "g_{\\mathrm{bar}}",
        { x: 36, y: 8, width: 28, line: "above" }
      ),
      overlay(
        "btfr-row",
        "Flat-velocity row",
        "flatVelocity",
        "The second equation is the baryonic Tully-Fisher relation: flat rotation speed to the fourth tracks baryonic mass. The a₀ term is the low-acceleration scale. In AAA, it is a compact galaxy-scale response target.",
        "v_f^4=G M_b a_0",
        { x: 58, y: 82, width: 34, line: "below" }
      ),
    ],
  },
  {
    id: "eq-22-planck-blackbody-occupancy",
    title: "Planck Blackbody Occupancy",
    subject: "Statistical mechanics and thermodynamics",
    backgroundId: DEFAULT_BACKGROUND_ID,
    claimLevel: "candidate-commentary",
    formulaTeX:
      "x_\\nu=\\frac{h\\nu}{k_BT},\\quad \\bar n_\\nu=\\frac{1}{e^{x_\\nu}-1},\\quad u_\\nu=\\frac{8\\pi h\\nu^3}{c_\\gamma^3(e^{x_\\nu}-1)}",
    anchors: [
      anchor("temperature", "temperature factor", "thermal clock energy scale"),
      anchor("occupancy", "mode occupancy", "Planck occupancy"),
      anchor("modeDensity", "mode density", "radiation mode density"),
    ],
    formulaParts: [
      mathPart("temperature", "x_\\nu=\\frac{h\\nu}{k_BT}", "temperature"),
      mathPart("comma-1", ",\\quad", ""),
      mathPart("occupancy", "\\bar n_\\nu=\\frac{1}{e^{x_\\nu}-1}", "occupancy"),
      mathPart("comma", ",\\quad", ""),
      mathPart("modeDensity", "u_\\nu=\\frac{8\\pi h\\nu^3}{c_\\gamma^3(e^{x_\\nu}-1)}", "modeDensity"),
    ],
    overlays: [
      overlay(
        "thermal-scale",
        "Temperature factor",
        "temperature",
        "x compares photon energy hν with thermal energy kBT. It tells when a mode is easy or hard to populate. In AAA, temperature is a statistical readout of stored branch activity.",
        "x_\\nu=h\\nu/k_BT",
        { x: 5, y: 8, width: 30, line: "above" }
      ),
      overlay(
        "thermal-occupancy",
        "Mode occupancy",
        "occupancy",
        "This gives the average number of photons in a frequency mode at temperature T. It is the blackbody rule behind the cosmic microwave background spectrum. In AAA, it maps thermal records to photon carrier counts.",
        "\\bar n_\\nu",
        { x: 36, y: 8, width: 30, line: "above" }
      ),
      overlay(
        "radiation-mode-density",
        "Radiation mode density",
        "modeDensity",
        "uν is energy density per frequency. The ν cubed factor counts how many wave modes fit. In AAA, that mode-counting is a geometry clue for photon carrier rows in the Noether sea.",
        "u_\\nu",
        { x: 62, y: 76, width: 34, line: "below", tone: "geometry" }
      ),
    ],
  },
];

function orderEquationMapSeedDocuments(documents = []) {
  const subjectOrder = new Map(SUBJECT_GROUPS.map((subject, index) => [subject, index]));
  return documents
    .map((document, index) => ({ document, index }))
    .sort((left, right) => {
      const leftSubjectOrder = subjectOrder.get(left.document.subject) ?? SUBJECT_GROUPS.length;
      const rightSubjectOrder = subjectOrder.get(right.document.subject) ?? SUBJECT_GROUPS.length;
      return leftSubjectOrder - rightSubjectOrder || left.index - right.index;
    })
    .map((entry) => entry.document);
}

export function createSeedEquationMapDocuments() {
  return normalizeEquationMapDocuments(orderEquationMapSeedDocuments(equationMapSeedDocuments));
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
