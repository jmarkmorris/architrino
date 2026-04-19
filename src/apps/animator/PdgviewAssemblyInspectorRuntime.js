export function createPdgviewAssemblyInspectorRuntime(options = {}) {
  const documentLike = options.documentLike ?? globalThis.document;
  const getAssemblyListElement =
    typeof options.getAssemblyListElement === "function"
      ? options.getAssemblyListElement
      : () => null;
  const getAssemblyDetailElement =
    typeof options.getAssemblyDetailElement === "function"
      ? options.getAssemblyDetailElement
      : () => null;
  const validateSelectedAssemblyId =
    typeof options.validateSelectedAssemblyId === "function"
      ? options.validateSelectedAssemblyId
      : () => null;
  const ensureAssemblyDrafts =
    typeof options.ensureAssemblyDrafts === "function" ? options.ensureAssemblyDrafts : () => [];
  const getAssemblyDraftsState =
    typeof options.getAssemblyDraftsState === "function"
      ? options.getAssemblyDraftsState
      : () => [];
  const getSelectedAssemblyIdState =
    typeof options.getSelectedAssemblyIdState === "function"
      ? options.getSelectedAssemblyIdState
      : () => null;
  const getSelectedAssembly =
    typeof options.getSelectedAssembly === "function" ? options.getSelectedAssembly : () => null;
  const setSelectedAssembly =
    typeof options.setSelectedAssembly === "function" ? options.setSelectedAssembly : () => null;
  const renderJsonPreview =
    typeof options.renderJsonPreview === "function" ? options.renderJsonPreview : () => {};
  const openAssemblyPropertiesMenuAt =
    typeof options.openAssemblyPropertiesMenuAt === "function"
      ? options.openAssemblyPropertiesMenuAt
      : () => {};
  const mutatePathStateState =
    typeof options.mutatePathStateState === "function"
      ? options.mutatePathStateState
      : () => {};
  const setSelectedPointIndexState =
    typeof options.setSelectedPointIndexState === "function"
      ? options.setSelectedPointIndexState
      : () => {};
  const rebuildControlPoints =
    typeof options.rebuildControlPoints === "function"
      ? options.rebuildControlPoints
      : () => {};
  const updatePathGeometry =
    typeof options.updatePathGeometry === "function" ? options.updatePathGeometry : () => {};
  const loadPathStateFromSelectedAssembly =
    typeof options.loadPathStateFromSelectedAssembly === "function"
      ? options.loadPathStateFromSelectedAssembly
      : () => {};
  const buildAssemblyStructure =
    typeof options.buildAssemblyStructure === "function"
      ? options.buildAssemblyStructure
      : () => null;
  const summarizeAssemblyStructure =
    typeof options.summarizeAssemblyStructure === "function"
      ? options.summarizeAssemblyStructure
      : () => null;
  const formatAssemblyStructureSummary =
    typeof options.formatAssemblyStructureSummary === "function"
      ? options.formatAssemblyStructureSummary
      : () => "";
  const getAssemblyDraftById =
    typeof options.getAssemblyDraftById === "function"
      ? options.getAssemblyDraftById
      : () => null;
  const showHoverTooltip =
    typeof options.showHoverTooltip === "function" ? options.showHoverTooltip : () => {};
  const hideHoverTooltip =
    typeof options.hideHoverTooltip === "function" ? options.hideHoverTooltip : () => {};

  let hoveredStructureTooltipAssemblyId = "";
  let hoveredStructureTooltipContent = null;

  function getPdgviewAssemblyCanonicalBridgeSummary(assembly = null) {
    if (!assembly?.id) {
      return null;
    }
    try {
      const canonicalStructure = buildAssemblyStructure(assembly);
      return summarizeAssemblyStructure(canonicalStructure.root, canonicalStructure.validation);
    } catch (_error) {
      return null;
    }
  }

  function createPdgviewAssemblyStructureTooltipContent(assembly = null) {
    if (!assembly?.id) {
      return null;
    }
    const canonicalSummary = getPdgviewAssemblyCanonicalBridgeSummary(assembly);
    if (!canonicalSummary) {
      return null;
    }
    const content = documentLike.createElement("div");
    const title = documentLike.createElement("div");
    title.textContent = assembly.name?.trim() || assembly.id;
    content.appendChild(title);

    const summary = documentLike.createElement("div");
    summary.textContent = formatAssemblyStructureSummary(canonicalSummary);
    content.appendChild(summary);

    const validation = documentLike.createElement("div");
    validation.textContent = canonicalSummary.valid
      ? "Canonical bridge valid"
      : `${canonicalSummary.errorCount} validation issue${
          canonicalSummary.errorCount === 1 ? "" : "s"
        }`;
    content.appendChild(validation);
    return content;
  }

  function clearPdgviewAssemblyHoverTooltipState() {
    hoveredStructureTooltipAssemblyId = "";
    hoveredStructureTooltipContent = null;
  }

  function updatePdgviewAssemblyHoverTooltip(assemblyId, event) {
    if (!assemblyId || !event) {
      clearPdgviewAssemblyHoverTooltipState();
      hideHoverTooltip();
      return;
    }
    if (hoveredStructureTooltipAssemblyId !== assemblyId || !hoveredStructureTooltipContent) {
      const assembly = getAssemblyDraftById(assemblyId);
      hoveredStructureTooltipContent = createPdgviewAssemblyStructureTooltipContent(assembly);
      hoveredStructureTooltipAssemblyId = hoveredStructureTooltipContent ? assemblyId : "";
    }
    if (!hoveredStructureTooltipContent) {
      hideHoverTooltip();
      return;
    }
    showHoverTooltip(hoveredStructureTooltipContent, event.clientX, event.clientY);
  }

  function renderPdgviewAssemblyEditor() {
    validateSelectedAssemblyId();
    const pdgviewAssemblyList = getAssemblyListElement();
    const pdgviewAssemblyDetail = getAssemblyDetailElement();
    if (!pdgviewAssemblyList || !pdgviewAssemblyDetail) {
      return;
    }
    ensureAssemblyDrafts();
    const assemblyDrafts = getAssemblyDraftsState();
    const selectedAssemblyId = getSelectedAssemblyIdState();
    pdgviewAssemblyList.innerHTML = "";
    pdgviewAssemblyDetail.innerHTML = "";

    assemblyDrafts.forEach((assembly, index) => {
      const chip = documentLike.createElement("button");
      chip.type = "button";
      chip.className = "pdgview-assembly-chip";
      if (assembly.id === selectedAssemblyId) {
        chip.classList.add("is-active");
      }

      const number = documentLike.createElement("span");
      number.className = "pdgview-assembly-chip-number";
      number.textContent = String(index + 1);

      const name = documentLike.createElement("span");
      name.className = "pdgview-assembly-chip-name";
      name.textContent = assembly.name.trim() || assembly.id || `Assembly ${index + 1}`;

      chip.appendChild(number);
      chip.appendChild(name);

      chip.addEventListener("click", () => {
        setSelectedAssembly(assembly.id);
        renderPdgviewAssemblyEditor();
        renderJsonPreview();
      });
      chip.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        setSelectedAssembly(assembly.id);
        renderPdgviewAssemblyEditor();
        renderJsonPreview();
        openAssemblyPropertiesMenuAt(event.clientX, event.clientY, assembly.id);
      });
      pdgviewAssemblyList.appendChild(chip);
    });

    if (!assemblyDrafts.length) {
      const detailCard = documentLike.createElement("div");
      detailCard.className = "pdgview-assembly-advanced";
      const body = documentLike.createElement("div");
      body.className = "pdgview-assembly-advanced-body";
      const title = documentLike.createElement("div");
      title.className = "pdgview-assembly-advanced-meta";
      title.textContent = "Blank Scene";
      body.appendChild(title);
      const hint = documentLike.createElement("div");
      hint.className = "pdgview-field-note";
      hint.textContent = "Use right-click on the canvas to add assemblies.";
      body.appendChild(hint);
      const panelHint = documentLike.createElement("div");
      panelHint.className = "pdgview-field-note";
      panelHint.textContent =
        "The scene starts empty. Add assemblies from the canvas instead of relying on a starter object.";
      body.appendChild(panelHint);
      detailCard.appendChild(body);
      pdgviewAssemblyDetail.appendChild(detailCard);
      mutatePathStateState((pathState) => {
        pathState.ownerAssemblyId = null;
        pathState.points = [];
      });
      setSelectedPointIndexState(null);
      rebuildControlPoints();
      updatePathGeometry();
      return;
    }

    const selectedAssembly = getSelectedAssembly();
    if (!selectedAssembly) {
      return;
    }
    loadPathStateFromSelectedAssembly();
    const detailCard = documentLike.createElement("div");
    detailCard.className = "pdgview-assembly-advanced";

    const body = documentLike.createElement("div");
    body.className = "pdgview-assembly-advanced-body";

    const meta = documentLike.createElement("div");
    meta.className = "pdgview-assembly-advanced-meta";
    meta.textContent = `${selectedAssembly.name.trim() || selectedAssembly.id} - ${selectedAssembly.id}`;
    body.appendChild(meta);

    const memberCount = Array.isArray(selectedAssembly?.members) ? selectedAssembly.members.length : 0;
    const structureSummary = documentLike.createElement("div");
    structureSummary.className = "pdgview-assembly-summary";
    const subassemblyCount = Array.isArray(selectedAssembly.subassemblies)
      ? selectedAssembly.subassemblies.length
      : 0;
    structureSummary.textContent = `${memberCount} member${
      memberCount === 1 ? "" : "s"
    } • ${subassemblyCount} subassembl${subassemblyCount === 1 ? "y" : "ies"}`;
    body.appendChild(structureSummary);

    try {
      const canonicalStructure = buildAssemblyStructure(selectedAssembly);
      const canonicalSummary = summarizeAssemblyStructure(
        canonicalStructure.root,
        canonicalStructure.validation
      );

      const canonicalSummaryLabel = documentLike.createElement("div");
      canonicalSummaryLabel.className = "pdgview-assembly-summary";
      canonicalSummaryLabel.textContent = `Canonical bridge: ${formatAssemblyStructureSummary(canonicalSummary)}`;
      body.appendChild(canonicalSummaryLabel);

      const canonicalValidationNote = documentLike.createElement("div");
      canonicalValidationNote.className = "pdgview-field-note";
      canonicalValidationNote.textContent = canonicalSummary.valid
        ? "Canonical structure bridge is valid for this assembly."
        : `Canonical structure bridge has ${canonicalSummary.errorCount} validation issue${
            canonicalSummary.errorCount === 1 ? "" : "s"
          }. This is read-only for now and does not affect canvas editing.`;
      body.appendChild(canonicalValidationNote);
    } catch (_error) {
      const canonicalValidationNote = documentLike.createElement("div");
      canonicalValidationNote.className = "pdgview-field-note";
      canonicalValidationNote.textContent =
        "Canonical structure bridge is temporarily unavailable for this assembly. Canvas editing is unaffected.";
      body.appendChild(canonicalValidationNote);
    }

    const hint = documentLike.createElement("div");
    hint.className = "pdgview-field-note";
    hint.textContent =
      "Use right-click on the canvas to add assemblies. Once one exists, drag the center to move it, drag member dots to place members, drag subassembly halos to place groups, and right-click handles for actions.";
    body.appendChild(hint);

    const panelHint = documentLike.createElement("div");
    panelHint.className = "pdgview-field-note";
    panelHint.textContent =
      "This panel stays scene-level and lightweight. Assembly structure now lives on the canvas and the assembly center-handle menu.";
    body.appendChild(panelHint);

    detailCard.appendChild(body);
    pdgviewAssemblyDetail.appendChild(detailCard);
  }

  return {
    renderPdgviewAssemblyEditor,
    updatePdgviewAssemblyHoverTooltip,
    clearPdgviewAssemblyHoverTooltipState,
  };
}
