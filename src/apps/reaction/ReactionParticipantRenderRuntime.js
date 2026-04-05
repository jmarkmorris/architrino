import { getBinaryPersonalityChoice } from "./ReactionBinarySelectionRuntime.js";
import { createReactionParticleTileElement } from "./ReactionParticleTileRuntime.js";
import {
  getReactionParticipantTrackHeaderInsetCss,
  getReactionParticipantTrackStartOffsetPx,
} from "./ReactionCanvasLayoutRuntime.js";
import {
  getReactionStructureTrackSlotCodes,
  isReactionStructureCompositeGridRenderMode,
  isReactionStructureInlineAnchorRenderMode,
  REACTION_STRUCTURE_RENDER_MODES,
} from "./ReactionStructureDescriptorRuntime.js";

export function getRenderedSlotCodesForSide(side) {
  return getReactionStructureTrackSlotCodes(side);
}

function getParticipantTrackHeaderOffset(participant = null) {
  const rootNode = Array.isArray(participant?.hierarchy) ? participant.hierarchy[0] : null;
  if (!rootNode) {
    return "0px";
  }
  return getReactionParticipantTrackHeaderInsetCss(rootNode.renderMode);
}

function getParticipantTrackCenterOffset(participant = null) {
  const rootNode = Array.isArray(participant?.hierarchy) ? participant.hierarchy[0] : null;
  if (!rootNode) {
    return "0px";
  }
  return `${getReactionParticipantTrackStartOffsetPx(rootNode.renderMode) / 2}px`;
}

export function getReactionSideSlotHeaderProfile(participants = [], side = "reactant") {
  const normalizedSide =
    side === "product"
      ? "product"
      : side === "center"
        ? "center"
        : "reactant";
  const inlineParticipants = (Array.isArray(participants) ? participants : []).filter((participant) =>
    isReactionStructureInlineAnchorRenderMode(participant?.hierarchy?.[0]?.renderMode ?? "")
  );
  const referenceParticipant =
    inlineParticipants.find((participant) =>
      isReactionStructureCompositeGridRenderMode(participant?.hierarchy?.[0]?.renderMode ?? "")
    ) ??
    inlineParticipants[0] ??
    null;
  return {
    side: normalizedSide,
    slotCodes: getRenderedSlotCodesForSide(normalizedSide),
    offset:
      normalizedSide === "center"
        ? getParticipantTrackCenterOffset(referenceParticipant)
        : getParticipantTrackHeaderOffset(referenceParticipant),
  };
}

export function getReactionParticipantCardSectionOrder({
  side = "reactant",
  isReactantComposite = false,
  isProductComposite = false,
} = {}) {
  if (side === "product") {
    return ["hierarchy", "visual"];
  }
  return ["visual", "hierarchy"];
}

export function createReactionParticipantRenderRuntime(options = {}) {
  const buildNodeKey = options.buildNodeKey;
  const countDescendants = options.countDescendants ?? (() => 0);
  const createAnchorButton = options.createAnchorButton;
  const createBinaryGlyph = options.createBinaryGlyph;
  const createInlineAnchorSlot = options.createInlineAnchorSlot;
  const cycleQuarkBinaryPreset = options.cycleQuarkBinaryPreset ?? (() => {});
  const cycleFreeArchitrinoPreset = options.cycleFreeArchitrinoPreset ?? (() => {});
  const findMappingByNodeKey = options.findMappingByNodeKey ?? (() => null);
  const findMappingsByNodeKey = options.findMappingsByNodeKey ?? (() => []);
  const getMappings = options.getMappings ?? (() => []);
  const formatLedger = options.formatLedger ?? (() => "");
  const formatParticipantLabel = options.formatParticipantLabel ?? ((label) => label);
  const getAllowedBinaryChoiceIds = options.getAllowedBinaryChoiceIds ?? (() => []);
  const getAnchorAvailability = options.getAnchorAvailability ?? (() => ({ disabled: false, reason: "" }));
  const getBinaryPersonalitySelection = options.getBinaryPersonalitySelection ?? (() => null);
  const getDefaultParticipantBaseLabel = options.getDefaultParticipantBaseLabel ?? ((_, label) => label || "?");
  const getIsDraggingParticipant = options.getIsDraggingParticipant ?? (() => false);
  const getParticipantCardLabelLines = options.getParticipantCardLabelLines ?? ((label) => [label]);
  const getParticipantCardMeta = options.getParticipantCardMeta ?? (() => ({ accent: "#b889ff" }));
  const getParticipantRootNode = options.getParticipantRootNode ?? (() => null);
  const getPendingSourceKey = options.getPendingSourceKey ?? (() => "");
  const getOperatorCardLeft = options.getOperatorCardLeft ?? (() => "50%");
  const getOperatorCardTop = options.getOperatorCardTop ?? (() => "50%");
  const getOperatorLedgerSummary = options.getOperatorLedgerSummary ?? (() => ({
    incomingLedger: { electrino: 0, positrino: 0 },
    outputLedger: { electrino: 0, positrino: 0 },
    outgoingLedger: { electrino: 0, positrino: 0 },
    undischargedLedger: { electrino: 0, positrino: 0 },
    isOpen: false,
    isInvalid: false,
    isBalanced: false,
  }));
  const getOperatorNode = options.getOperatorNode ?? (() => null);
  const isCompositeParticipant = options.isCompositeParticipant ?? (() => false);
  const isCenterAssemblyParticipant = options.isCenterAssemblyParticipant ?? (() => false);
  const isProductCompositeParticipant = options.isProductCompositeParticipant ?? (() => false);
  const isQuarkTemplateId = options.isQuarkTemplateId ?? (() => false);
  const isReactantCompositeParticipant = options.isReactantCompositeParticipant ?? (() => false);
  const openParticipantMenuAt = options.openParticipantMenuAt ?? (() => {});
  const handleParticipantVisualClick = options.handleParticipantVisualClick ?? (() => false);
  const reducedBinaryPersonalityChoiceIds = options.reducedBinaryPersonalityChoiceIds ?? [];
  const resolveBinaryGlyphPolarity = options.resolveBinaryGlyphPolarity ?? (() => "pro");
  const resolveBinaryChoiceInventory = options.resolveBinaryChoiceInventory ?? (() => ({
    electrino: 0,
    positrino: 0,
  }));
  const setBinaryPersonalitySelection = options.setBinaryPersonalitySelection ?? (() => {});
  const shouldRenderChildNodes = options.shouldRenderChildNodes ?? (() => true);
  const startOperatorDrag = options.startOperatorDrag ?? (() => {});
  const startSideParticipantDrag = options.startSideParticipantDrag ?? (() => {});
  const supportsParticipantPolarity = options.supportsParticipantPolarity ?? (() => false);
  const topLevelHierarchyHasRenderMode = options.topLevelHierarchyHasRenderMode ?? (() => false);

  function getParticipantLayoutSide(participant = null) {
    return participant?.side === "product" ? "product" : "reactant";
  }

  function getParticipantConnectorRole(participant = null) {
    return isCenterAssemblyParticipant(participant) ? "center" : participant?.side;
  }

  function getParticipantRootOutputAnchorInstanceIndices(participant = null, node = null, nodeKey = "") {
    if (!isCenterAssemblyParticipant(participant)) {
      return [null];
    }
    const rootNode = getParticipantRootNode(participant);
    if (String(node?.id ?? "") !== String(rootNode?.id ?? "")) {
      return [null];
    }
    if (participant?.templateId === "free_architrinos") {
      const connectorRole = getParticipantConnectorRole(participant);
      const mappedIndices = [...new Set(
        getMappings()
          .filter(
            (mapping) =>
              mapping?.sourceKey === nodeKey &&
              String(mapping?.sourceRole ?? "") === connectorRole
          )
          .map((mapping) => Number(mapping?.sourceAnchorInstanceIndex))
          .filter((anchorInstanceIndex) => Number.isInteger(anchorInstanceIndex) && anchorInstanceIndex >= 1)
      )].sort((left, right) => left - right);
      return mappedIndices.length ? mappedIndices : [1];
    }
    return [1];
  }

  function createEmptyLedger() {
    return {
      electrino: 0,
      positrino: 0,
    };
  }

  function addLedgerEntry(totalLedger = null, entryLedger = null) {
    return {
      electrino: Number(totalLedger?.electrino ?? 0) + Number(entryLedger?.electrino ?? 0),
      positrino: Number(totalLedger?.positrino ?? 0) + Number(entryLedger?.positrino ?? 0),
    };
  }

  function getAggregateLedgerTileAccent(ledger = null) {
    const electrinoCount = Number(ledger?.electrino ?? 0);
    const positrinoCount = Number(ledger?.positrino ?? 0);
    if (electrinoCount > positrinoCount) {
      return "#2f6fff";
    }
    if (positrinoCount > electrinoCount) {
      return "#ff4a1f";
    }
    return "#9a47d1";
  }

  function createBranchAnchorFrame({
    participant,
    rootNode = null,
    rootNodeKey = "",
    visual,
  } = {}) {
    const frame = document.createElement("div");
    frame.className =
      "composer-reaction-canvas-branch-anchor-frame composer-reaction-canvas-associate-anchor-frame";
    const isDissociate = participant?.templateId === "dissociate";
    if (isDissociate) {
      frame.classList.add("is-dissociate");
    }
    frame.appendChild(visual);
    if (!rootNode || !rootNodeKey) {
      return frame;
    }

    if (isDissociate) {
      const inputAnchor = createAnchorButton(participant, rootNode, rootNodeKey, {
        anchorRole: "operator-input",
        anchorInstanceIndex: 0,
        extraClassNames: [
          "composer-reaction-canvas-operator-anchor",
          "is-input",
          "is-branch-left-attachment",
          "is-dissociate-input",
        ],
      });
      const outputAnchor = createAnchorButton(participant, rootNode, rootNodeKey, {
        anchorRole: "operator-output",
        anchorInstanceIndex: 0,
        extraClassNames: [
          "composer-reaction-canvas-operator-anchor",
          "is-output",
          "is-branch-right-attachment",
          "is-dissociate-output",
        ],
      });
      frame.append(inputAnchor, outputAnchor);
      return frame;
    }

    const inputAnchor = createAnchorButton(participant, rootNode, rootNodeKey, {
      anchorRole: "operator-input",
      anchorInstanceIndex: 0,
      extraClassNames: [
        "composer-reaction-canvas-operator-anchor",
        "is-input",
        "is-branch-left-attachment",
        "is-associate-input",
      ],
    });
    const outputAnchor = createAnchorButton(participant, rootNode, rootNodeKey, {
      anchorRole: "operator-output",
      anchorInstanceIndex: 0,
      extraClassNames: [
        "composer-reaction-canvas-operator-anchor",
        "is-output",
        "is-branch-right-attachment",
        "is-associate-output",
      ],
    });

    frame.append(inputAnchor, outputAnchor);
    return frame;
  }

  function createCenterAssemblyInputFrame({
    participant,
    rootNode = null,
    rootNodeKey = "",
    content,
  } = {}) {
    const frame = document.createElement("div");
    frame.className = "composer-reaction-canvas-center-assembly-frame";
    if (content) {
      frame.appendChild(content);
    }
    if (!rootNode || !rootNodeKey) {
      return frame;
    }
    const inputAnchor = createAnchorButton(participant, rootNode, rootNodeKey, {
      anchorRole: getParticipantConnectorRole(participant),
      anchorInstanceIndex: 0,
      extraClassNames: [
        "composer-reaction-canvas-operator-anchor",
        "is-center-assembly-input",
      ],
    });
    frame.appendChild(inputAnchor);
    return frame;
  }

  function getCoreBinaryNodes(node) {
    const slotRankByCode = { I: 0, M: 1, O: 2 };
    return (Array.isArray(node?.children) ? node.children : [])
      .filter((child) => child?.slotCode)
      .sort((left, right) => {
        const leftRank = slotRankByCode[left?.slotCode] ?? Number.MAX_SAFE_INTEGER;
        const rightRank = slotRankByCode[right?.slotCode] ?? Number.MAX_SAFE_INTEGER;
        if (leftRank !== rightRank) {
          return leftRank - rightRank;
        }
        return String(left?.id ?? "").localeCompare(String(right?.id ?? ""));
      });
  }

  function getRenderedCoreBinarySlots(participant, node) {
    const nodesBySlotCode = new Map(
      getCoreBinaryNodes(node).map((childNode) => [
        String(childNode?.slotCode ?? "").trim().toUpperCase(),
        childNode,
      ])
    );
    return getRenderedSlotCodesForSide(participant?.side).map(
      (slotCode) => nodesBySlotCode.get(slotCode) ?? null
    );
  }

  function createBinaryChoicePlaceholder() {
    const placeholder = document.createElement("div");
    placeholder.className = "composer-reaction-canvas-binary-choice is-static is-placeholder";
    placeholder.setAttribute("aria-hidden", "true");
    return placeholder;
  }

  function getAggregateLedgerForNode(participant, node) {
    return (Array.isArray(node?.children) ? node.children : []).reduce(
      (ledger, childNode) =>
        addLedgerEntry(ledger, resolveBinaryChoiceInventory(participant, childNode, node)),
      createEmptyLedger()
    );
  }

  function createSideSlotHeader(participants, side) {
    const profile = getReactionSideSlotHeaderProfile(participants, side);
    const header = document.createElement("div");
    header.className = `composer-reaction-canvas-side-slot-header is-${profile.side}`;
    header.style.setProperty("--reaction-canvas-slot-header-offset", profile.offset);
    profile.slotCodes.forEach((slotCode) => {
      const slot = document.createElement("span");
      slot.className = "composer-reaction-canvas-side-slot-header-slot";
      slot.textContent = slotCode;
      header.appendChild(slot);
    });
    return header;
  }

  function createParticipantVisual(participant, extraClassNames = []) {
    const visual = createReactionParticleTileElement(participant, {
      classNames: extraClassNames,
      getParticipantCardMeta,
      getParticipantCardLabelLines,
    });
    visual.addEventListener("click", (event) => {
      if (handleParticipantVisualClick(participant, event)) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
    visual.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openParticipantMenuAt(participant.id, event.clientX, event.clientY);
    });
    return visual;
  }

  function createBareBinaryContent(participant, node) {
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-canvas-binary-selector is-${participant.side}`;
    const slot = document.createElement("span");
    slot.className = "composer-reaction-canvas-binary-slot";
    slot.textContent = node.slotCode || "?";
    const choices = document.createElement("div");
    choices.className = "composer-reaction-canvas-binary-choices is-single";
    choices.style.setProperty("--binary-choice-columns", "1");

    const chip = document.createElement("div");
    chip.className = "composer-reaction-canvas-binary-choice is-static";
    chip.style.setProperty("--binary-choice-accent", "#b889ff");
    chip.appendChild(
      createBinaryGlyph(null, {
        showPersonality: false,
        polarity: resolveBinaryGlyphPolarity(participant, node),
      })
    );
    choices.appendChild(chip);

    if (participant.side === "product") {
      wrapper.append(choices, slot);
    } else {
      wrapper.append(slot, choices);
    }
    return wrapper;
  }

  function createTreeRowAnchor(participant, node, nodeKey) {
    const layoutSide = getParticipantLayoutSide(participant);
    const connectorRole = getParticipantConnectorRole(participant);
    const outputAnchorInstanceIndices = getParticipantRootOutputAnchorInstanceIndices(
      participant,
      node,
      nodeKey
    );
    if (outputAnchorInstanceIndices.length > 1) {
      const anchorSet = document.createElement("div");
      anchorSet.className = `composer-reaction-canvas-anchor-set is-${layoutSide} is-free-architrinos-root`;
      outputAnchorInstanceIndices.forEach((anchorInstanceIndex) => {
        anchorSet.appendChild(
          createAnchorButton(participant, node, nodeKey, {
            anchorRole: connectorRole,
            anchorInstanceIndex,
          })
        );
      });
      return anchorSet;
    }
    return createAnchorButton(participant, node, nodeKey, {
      anchorRole: connectorRole,
      anchorInstanceIndex: outputAnchorInstanceIndices[0] ?? null,
    });
  }

  function createNoetherCoreGridSections(participant, node, options = {}) {
    const { interactiveBinaryAnchors = true } = options;
    const tiles = document.createElement("div");
    tiles.className = "composer-reaction-canvas-noether-core-grid-track";
    const glyphPolarity = resolveBinaryGlyphPolarity(participant, node);
    getRenderedCoreBinarySlots(participant, node).forEach((childNode) => {
      if (!childNode) {
        tiles.appendChild(createBinaryChoicePlaceholder());
        return;
      }
      const nodeKey = buildNodeKey(participant.id, childNode.id);
      const choice =
        childNode.renderMode === REACTION_STRUCTURE_RENDER_MODES.BINARY_BARE
          ? null
          : getBinaryPersonalitySelection(participant, childNode);
      const tile = interactiveBinaryAnchors
        ? createAnchorButton(participant, childNode, nodeKey, {
            extraClassNames: [
              "composer-reaction-canvas-binary-choice",
              "composer-reaction-canvas-binary-choice-is-anchor",
              "composer-reaction-canvas-noether-core-grid-tile",
              "is-static",
            ],
          })
        : Object.assign(document.createElement("div"), {
            className:
              "composer-reaction-canvas-binary-choice composer-reaction-canvas-noether-core-grid-tile is-static",
          });
      tile.style.setProperty("--binary-choice-accent", choice?.accent ?? "#b889ff");
      tile.appendChild(
        createBinaryGlyph(choice, {
          showPersonality: childNode.renderMode !== REACTION_STRUCTURE_RENDER_MODES.BINARY_BARE,
          showBinary: childNode.hasBinary !== false,
          polarity: glyphPolarity,
        })
      );
      tiles.appendChild(tile);
    });
    return { tiles };
  }

  function createNoetherCoreGridContent(participant, node) {
    const nodeKey = buildNodeKey(participant.id, node.id);
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-canvas-noether-core-grid is-${participant.side}`;
    const { tiles } = createNoetherCoreGridSections(participant, node);
    const body = createInlineTrackBody(participant, node, nodeKey, tiles, {
      className: "composer-reaction-canvas-noether-core-grid-body",
    });
    wrapper.appendChild(body);
    return wrapper;
  }

  function createInlineTrackBody(participant, node, nodeKey, track, options = {}) {
    const layoutSide = getParticipantLayoutSide(participant);
    const body = document.createElement("div");
    body.className = `composer-reaction-canvas-inline-track-body is-${layoutSide}`;
    if (options.className) {
      body.classList.add(options.className);
    }
    const selectorSlot = document.createElement("div");
    selectorSlot.className = `composer-reaction-canvas-inline-anchor-slot is-${layoutSide}`;
    selectorSlot.appendChild(createTreeRowAnchor(participant, node, nodeKey));
    if (options.selectorLaneClassName) {
      selectorSlot.classList.add(options.selectorLaneClassName);
    }
    if (layoutSide === "product") {
      body.append(selectorSlot, track);
    } else {
      body.append(track, selectorSlot);
    }
    return body;
  }

  function createBinarySelectorGridTrack(participant, node) {
    const track = document.createElement("div");
    track.className = "composer-reaction-canvas-binary-selector-grid-track";
    const glyphPolarity = resolveBinaryGlyphPolarity(participant, node);
    getRenderedCoreBinarySlots(participant, node).forEach((childNode) => {
      const column = document.createElement("div");
      column.className = "composer-reaction-canvas-binary-selector-column";
      if (!childNode) {
        column.classList.add("is-placeholder");
        track.appendChild(column);
        return;
      }
      const choices = document.createElement("div");
      choices.className = "composer-reaction-canvas-binary-selector-grid-options";
      const selectedChoice = getBinaryPersonalitySelection(participant, childNode, node);
      const allowedChoiceIds = getAllowedBinaryChoiceIds(participant, childNode, node);

      allowedChoiceIds.forEach((choiceId) => {
        const choice = getBinaryPersonalityChoice(choiceId);
        const button = document.createElement("button");
        button.type = "button";
        button.className = "composer-reaction-canvas-binary-choice";
        button.dataset.choiceId = choice.id;
        button.style.setProperty("--binary-choice-accent", choice.accent);
        button.setAttribute("aria-label", `${childNode.label}: ${choice.label}`);
        button.title = choice.label;
        if (selectedChoice.id === choice.id) {
          button.classList.add("is-selected");
        }
        button.appendChild(
          createBinaryGlyph(choice, {
            showBinary: childNode.hasBinary !== false,
            polarity: glyphPolarity,
          })
        );
        button.addEventListener("click", () =>
          setBinaryPersonalitySelection(participant.id, childNode.id, choice.id)
        );
        choices.appendChild(button);
      });

      column.appendChild(choices);
      track.appendChild(column);
    });
    return track;
  }

  function createQuarkPresetRowTrack(participant, node) {
    const track = document.createElement("div");
    track.className = "composer-reaction-canvas-binary-selector-grid-track";
    const glyphPolarity = resolveBinaryGlyphPolarity(participant, node);
    getRenderedCoreBinarySlots(participant, node).forEach((childNode) => {
      if (!childNode) {
        track.appendChild(createBinaryChoicePlaceholder());
        return;
      }
      const selectedChoice = getBinaryPersonalitySelection(participant, childNode, node);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "composer-reaction-canvas-binary-choice is-selected";
      button.dataset.choiceId = selectedChoice.id;
      button.style.setProperty("--binary-choice-accent", selectedChoice.accent);
      button.setAttribute("aria-label", `${childNode.label}: ${selectedChoice.label}`);
      button.title = `${childNode.label}: ${selectedChoice.label}`;
      button.appendChild(
        createBinaryGlyph(selectedChoice, {
          showBinary: childNode.hasBinary !== false,
          polarity: glyphPolarity,
        })
      );
      button.addEventListener("click", () => cycleQuarkBinaryPreset(participant.id, childNode.id));
      track.appendChild(button);
    });
    return track;
  }

  function createQuarkPresetRowContent(participant, node) {
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-canvas-binary-selector-grid is-${participant.side}`;
    const nodeKey = buildNodeKey(participant.id, node.id);
    const track = createQuarkPresetRowTrack(participant, node);
    const body = createInlineTrackBody(participant, node, nodeKey, track, {
      className: "composer-reaction-canvas-binary-selector-grid-body",
    });
    wrapper.appendChild(body);
    return wrapper;
  }

  function createAggregateLedgerTileContent(participant, node) {
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-canvas-aggregate-ledger-track is-${participant.side}`;
    const nodeKey = buildNodeKey(participant.id, node.id);
    const ledger = getAggregateLedgerForNode(participant, node);
    const electrinoCount = Number(ledger.electrino ?? 0);
    const positrinoCount = Number(ledger.positrino ?? 0);
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className =
      "composer-reaction-canvas-binary-choice composer-reaction-canvas-aggregate-ledger-tile is-selected";
    tile.style.setProperty("--binary-choice-accent", getAggregateLedgerTileAccent(ledger));
    tile.setAttribute(
      "aria-label",
      `${node.label}: ${electrinoCount} electrino and ${positrinoCount} positrino`
    );
    tile.title = `${node.label}: ${formatLedger(ledger)}. Click to cycle the aggregate ledger.`;

    const title = document.createElement("span");
    title.className = "composer-reaction-canvas-aggregate-ledger-title";
    title.textContent = "Ledger";
    tile.appendChild(title);

    [
      {
        className: "is-top-right is-positrino",
        count: positrinoCount,
        label: "e+",
        title: "Aggregate positrino count",
      },
      {
        className: "is-bottom-left is-electrino",
        count: electrinoCount,
        label: "e-",
        title: "Aggregate electrino count",
      },
    ].forEach((entry) => {
      const badge = document.createElement("span");
      badge.className = `composer-reaction-canvas-operator-ledger composer-reaction-canvas-aggregate-ledger-count ${entry.className}`;
      badge.textContent = `${entry.count} ${entry.label}`;
      badge.title = entry.title;
      tile.appendChild(badge);
    });

    tile.addEventListener("click", () => cycleFreeArchitrinoPreset(participant.id, node.id));

    const body = createInlineTrackBody(participant, node, nodeKey, tile, {
      className: "composer-reaction-canvas-binary-selector-grid-body",
    });
    wrapper.appendChild(body);
    return wrapper;
  }

  function createBinarySelectorGridContent(participant, node) {
    if (isQuarkTemplateId(node.templateId ?? participant.templateId)) {
      return createQuarkPresetRowContent(participant, node);
    }
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-canvas-binary-selector-grid is-${participant.side}`;
    const nodeKey = buildNodeKey(participant.id, node.id);
    const track = createBinarySelectorGridTrack(participant, node);
    const body = createInlineTrackBody(participant, node, nodeKey, track, {
      className: "composer-reaction-canvas-binary-selector-grid-body",
    });
    wrapper.appendChild(body);
    return wrapper;
  }

  function createCompositeAssemblyRowTrack(participant, rowNode) {
    if (rowNode?.renderMode === REACTION_STRUCTURE_RENDER_MODES.NOETHER_CORE_GRID) {
      return createNoetherCoreGridSections(participant, rowNode, {
        interactiveBinaryAnchors: false,
      }).tiles;
    }
    if (rowNode?.renderMode === REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR_GRID) {
      return isQuarkTemplateId(rowNode.templateId ?? participant.templateId)
        ? createQuarkPresetRowTrack(participant, rowNode)
        : createBinarySelectorGridTrack(participant, rowNode);
    }
    return document.createElement("div");
  }

  function createCompositeAssemblyRowCard(participant, rowNode) {
    const templateId =
      String(rowNode?.templateId ?? "").trim().toLowerCase() ||
      (rowNode?.renderMode === REACTION_STRUCTURE_RENDER_MODES.NOETHER_CORE_GRID ? "noether_core" : "");
    const polarity = String(rowNode?.polarity ?? "").trim().toLowerCase();
    const explicitRowLabel = String(rowNode?.label ?? "").trim();
    const baseLabel = explicitRowLabel || getDefaultParticipantBaseLabel(templateId, rowNode?.label);
    const cardParticipant = {
      templateId,
      polarity:
        templateId === "noether_core" || supportsParticipantPolarity(templateId)
          ? (polarity || "pro")
          : "",
      label:
        templateId === "noether_core"
          ? String(rowNode?.label ?? baseLabel).trim() || baseLabel
          : supportsParticipantPolarity(templateId)
            ? formatParticipantLabel(baseLabel, templateId, polarity || "pro")
            : baseLabel,
    };
    return createReactionParticleTileElement(cardParticipant, {
      classNames: ["composer-reaction-canvas-composite-row-card"],
      getParticipantCardMeta,
      getParticipantCardLabelLines,
    });
  }

  function createCompositeAssemblyRowBody(participant, rowNode) {
    const rowNodeKey = buildNodeKey(participant.id, rowNode.id);
    const body = document.createElement("div");
    body.className = `composer-reaction-canvas-composite-row-body is-${participant.side}`;
    const card = createCompositeAssemblyRowCard(participant, rowNode);
    const track = createCompositeAssemblyRowTrack(participant, rowNode);
    const trackBody = createInlineTrackBody(participant, rowNode, rowNodeKey, track, {
      className: "composer-reaction-canvas-composite-row-track-body",
      selectorLaneClassName: "composer-reaction-canvas-composite-row-selector-slot",
    });
    if (participant.side === "product") {
      body.append(trackBody, card);
    } else {
      body.append(card, trackBody);
    }
    return body;
  }

  function createCompositeSpanRail(participant, rowNodes = []) {
    const rail = document.createElement("div");
    rail.className = `composer-reaction-canvas-composite-span-rail is-${participant.side}`;
    const stem = document.createElement("span");
    stem.className = "composer-reaction-canvas-composite-span-stem";
    stem.dataset.compositeSpanParticipantId = participant.id;
    rail.appendChild(stem);
    rowNodes.forEach(() => {
      const slot = document.createElement("div");
      slot.className = "composer-reaction-canvas-composite-span-slot";
      const node = document.createElement("span");
      node.className =
        "composer-reaction-canvas-composite-span-node composer-reaction-canvas-composite-connector-dot";
      node.setAttribute("aria-hidden", "true");
      slot.appendChild(node);
      rail.appendChild(slot);
    });
    return rail;
  }

  function createCompositeAssemblyGridContent(participant, node) {
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-canvas-higgs-cluster-grid is-${participant.side}`;
    const coreNodes = Array.isArray(node?.children) ? node.children : [];
    const rows = document.createElement("div");
    rows.className = "composer-reaction-canvas-higgs-cluster-grid-rows";
    coreNodes.forEach((coreNode) => {
      const row = document.createElement("div");
      row.className = `composer-reaction-canvas-higgs-cluster-grid-row is-${participant.side}`;
      const rowBody = createCompositeAssemblyRowBody(participant, coreNode);
      row.appendChild(rowBody);
      rows.appendChild(row);
    });
    const spanRail = createCompositeSpanRail(participant, coreNodes);
    if (participant.side === "product") {
      wrapper.append(rows, spanRail);
    } else {
      wrapper.append(spanRail, rows);
    }
    return wrapper;
  }

  function createCompositeVisualRail(participant) {
    const rail = document.createElement("div");
    rail.className = `composer-reaction-canvas-composite-visual-rail is-${participant.side}`;

    const rootNode = getParticipantRootNode(participant);
    const rootNodeKey = rootNode ? buildNodeKey(participant.id, rootNode.id) : "";
    const collector =
      rootNode && rootNodeKey
        ? createAnchorButton(participant, rootNode, rootNodeKey, {
            anchorRole: getParticipantConnectorRole(participant),
            anchorInstanceIndex:
              getParticipantRootOutputAnchorInstanceIndices(participant, rootNode, rootNodeKey)[0] ?? null,
            extraClassNames: [
              "composer-reaction-canvas-composite-collector",
              "composer-reaction-canvas-composite-connector-dot",
            ],
          })
        : document.createElement("span");
    if (!collector.className) {
      collector.className =
        "composer-reaction-canvas-composite-collector composer-reaction-canvas-composite-connector-dot";
      collector.setAttribute("aria-hidden", "true");
    }
    collector.dataset.compositeCollectorId = participant.id;

    const visual = createParticipantVisual(participant);
    if (participant.side === "product") {
      rail.append(collector, visual);
    } else {
      rail.append(visual, collector);
    }
    return rail;
  }

  function createBinarySelectorContent(participant, node) {
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-canvas-binary-selector is-${participant.side}`;
    const slot = document.createElement("span");
    slot.className = "composer-reaction-canvas-binary-slot";
    slot.textContent = node.slotCode || "?";
    const choices = document.createElement("div");
    choices.className = "composer-reaction-canvas-binary-choices";
    choices.style.setProperty("--binary-choice-columns", String(reducedBinaryPersonalityChoiceIds.length));
    const selectedChoice = getBinaryPersonalitySelection(participant, node);
    const allowedChoiceIds = getAllowedBinaryChoiceIds(participant, node);
    const glyphPolarity = resolveBinaryGlyphPolarity(participant, node);

    allowedChoiceIds.forEach((choiceId) => {
      const choice = getBinaryPersonalityChoice(choiceId);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "composer-reaction-canvas-binary-choice";
      button.dataset.choiceId = choice.id;
      button.style.setProperty("--binary-choice-accent", choice.accent);
      button.setAttribute("aria-label", `${node.label}: ${choice.label}`);
      button.title = choice.label;
      if (selectedChoice.id === choice.id) {
        button.classList.add("is-selected");
      }
      button.appendChild(
        createBinaryGlyph(choice, {
          showBinary: node.hasBinary !== false,
          polarity: glyphPolarity,
        })
      );
      button.addEventListener("click", () =>
        setBinaryPersonalitySelection(participant.id, node.id, choice.id)
      );
      choices.appendChild(button);
    });

    if (participant.side === "product") {
      wrapper.append(choices, slot);
    } else {
      wrapper.append(slot, choices);
    }
    return wrapper;
  }

  function renderParticipantTreeRows(parent, participant, nodes, depth = 0) {
    if (!parent || !Array.isArray(nodes) || !nodes.length) {
      return;
    }
    nodes.forEach((node) => {
      const nodeKey = buildNodeKey(participant.id, node.id);
      const hasChildren = Array.isArray(node.children) && node.children.length > 0;
      const canRenderChildren = hasChildren && shouldRenderChildNodes(node);
      const rendersChildrenInline =
        node.renderMode === REACTION_STRUCTURE_RENDER_MODES.NOETHER_CORE_GRID;
      const mapping = findMappingByNodeKey(nodeKey);
      const isCollapsed = !!mapping && canRenderChildren && !rendersChildrenInline;
      const hiddenDescendantCount = isCollapsed ? countDescendants(node) : 0;
      const layoutSide = getParticipantLayoutSide(participant);
      const connectorRole = getParticipantConnectorRole(participant);
      const outputAnchorInstanceIndex =
        getParticipantRootOutputAnchorInstanceIndices(participant, node, nodeKey)[0] ?? null;
      const anchorAvailability = getAnchorAvailability(
        connectorRole,
        nodeKey,
        outputAnchorInstanceIndex
      );
      const row = document.createElement("div");
      row.className = "composer-reaction-canvas-tree-row";
      row.style.setProperty("--reaction-canvas-depth", String(depth));
      row.classList.add(`is-${layoutSide}`);
      if (anchorAvailability.disabled) {
        row.classList.add("is-disabled");
        if (anchorAvailability.reason) {
          row.title = anchorAvailability.reason;
        }
      }
      if (isCollapsed) {
        row.classList.add("is-collapsed");
      }
      const label = document.createElement("span");
      label.className = "composer-reaction-canvas-tree-label";
      label.textContent = node.label;
      const content = document.createElement("div");
      content.className = "composer-reaction-canvas-tree-content";
      content.style.setProperty("--reaction-canvas-depth", String(depth));
      const usesInlineAnchor = isReactionStructureInlineAnchorRenderMode(node.renderMode);
      if (usesInlineAnchor) {
        row.classList.add("is-inline-anchor");
      }
      const anchor = usesInlineAnchor ? null : createTreeRowAnchor(participant, node, nodeKey);
      const collapsedNote =
        hiddenDescendantCount > 0
          ? Object.assign(document.createElement("span"), {
              className: "composer-reaction-canvas-tree-note",
              textContent: `${hiddenDescendantCount} hidden`,
            })
          : null;
      if (node.renderMode === REACTION_STRUCTURE_RENDER_MODES.NOETHER_CORE_GRID) {
        row.classList.add("is-noether-core-grid");
        content.classList.add("is-noether-core-grid");
        content.appendChild(createNoetherCoreGridContent(participant, node));
      } else if (node.renderMode === REACTION_STRUCTURE_RENDER_MODES.AGGREGATE_LEDGER_TILE) {
        row.classList.add("is-aggregate-ledger-tile");
        content.classList.add("is-aggregate-ledger-tile");
        content.appendChild(createAggregateLedgerTileContent(participant, node));
      } else if (isReactionStructureCompositeGridRenderMode(node.renderMode)) {
        row.classList.add("is-higgs-cluster-grid");
        content.classList.add("is-higgs-cluster-grid");
        content.appendChild(createCompositeAssemblyGridContent(participant, node));
      } else if (node.renderMode === REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR_GRID) {
        row.classList.add("is-binary-selector-grid");
        content.classList.add("is-binary-selector-grid");
        content.appendChild(createBinarySelectorGridContent(participant, node));
      } else if (node.renderMode === REACTION_STRUCTURE_RENDER_MODES.BINARY_SELECTOR) {
        row.classList.add("is-binary-selector");
        content.appendChild(createBinarySelectorContent(participant, node));
      } else if (node.renderMode === REACTION_STRUCTURE_RENDER_MODES.BINARY_BARE) {
        row.classList.add("is-binary-selector");
        content.appendChild(createBareBinaryContent(participant, node));
      } else {
        content.appendChild(label);
        if (collapsedNote) {
          content.appendChild(collapsedNote);
        }
      }
      if (usesInlineAnchor) {
        row.appendChild(content);
      } else if (layoutSide === "product") {
        row.append(anchor, content);
      } else {
        row.append(content, anchor);
      }
      parent.appendChild(row);
      if (canRenderChildren && !isCollapsed && !rendersChildrenInline) {
        renderParticipantTreeRows(parent, participant, node.children, depth + 1);
      }
    });
  }

  function renderParticipantCard(participant) {
    const card = document.createElement("article");
    card.className = `composer-reaction-canvas-participant is-${participant.side}`;
    card.dataset.participantId = participant.id;
    const rootNode = getParticipantRootNode(participant);
    const rootNodeKey = rootNode ? buildNodeKey(participant.id, rootNode.id) : "";
    const topLevelRenderMode = participant?.hierarchy?.[0]?.renderMode ?? "";
    const isComposite = isCompositeParticipant(participant);
    const isReactantComposite = isReactantCompositeParticipant(participant);
    const isProductComposite = isProductCompositeParticipant(participant);
    const rootAnchorAvailability =
      participant.side === "product" && rootNodeKey
        ? getAnchorAvailability(participant.side, rootNodeKey)
        : null;
    if (
      topLevelHierarchyHasRenderMode(
        participant.hierarchy,
        REACTION_STRUCTURE_RENDER_MODES.NOETHER_CORE_GRID
      )
    ) {
      card.classList.add("has-noether-core-grid");
    }
    if (isReactionStructureInlineAnchorRenderMode(topLevelRenderMode)) {
      card.classList.add("has-inline-field-header");
    }
    if (isComposite) {
      card.classList.add("is-composite-participant");
    }
    if (participant?.isDissociatedComposite || participant?.isAutoDissociatedComposite) {
      card.classList.add("is-dissociated-composite");
    }
    if (participant.side === "product" && rootAnchorAvailability?.reason) {
      card.title = rootAnchorAvailability.reason;
    }
    const visual = isComposite
      ? createCompositeVisualRail(participant)
      : createParticipantVisual(participant);

    const hierarchy = document.createElement("div");
    hierarchy.className = `composer-reaction-canvas-tree is-${participant.side}`;
    renderParticipantTreeRows(hierarchy, participant, participant.hierarchy, 0);

    const content = document.createElement("div");
    content.className = "composer-reaction-canvas-participant-content";
    getReactionParticipantCardSectionOrder({
      side: participant.side,
      isReactantComposite,
      isProductComposite,
    }).forEach((section) => {
      content.appendChild(section === "visual" ? visual : hierarchy);
    });
    card.appendChild(
      isCenterAssemblyParticipant(participant)
        ? createCenterAssemblyInputFrame({
            participant,
            rootNode,
            rootNodeKey,
            content,
          })
        : content
    );
    if (getIsDraggingParticipant(participant.id)) {
      card.classList.add("is-dragging");
    }
    card.addEventListener("pointerdown", (event) =>
      startSideParticipantDrag(event, participant.id)
    );
    return card;
  }

  function createOperatorParticipantCard(participant) {
    const card = document.createElement("article");
    card.className = "composer-reaction-canvas-participant is-operator is-operator-participant";
    card.dataset.participantId = participant.id;
    card.style.left = getOperatorCardLeft(participant.operatorLaneIndex);
    card.style.top = getOperatorCardTop(participant.operatorSlotIndex);
    if (participant.templateId === "associate") {
      card.classList.add("is-associate-operator");
    } else if (participant.templateId === "dissociate") {
      card.classList.add("is-dissociate-operator");
    }

    const rootNode = getOperatorNode(participant);
    const rootNodeKey = rootNode ? buildNodeKey(participant.id, rootNode.id) : "";
    const ledgerSummary = getOperatorLedgerSummary(participant.id);
    const visual = createParticipantVisual(participant, [
      "composer-reaction-canvas-operator-tile",
    ]);
    if (ledgerSummary.isInvalid) {
      card.classList.add("is-ledger-invalid");
      visual.classList.add("is-ledger-invalid");
    } else if (ledgerSummary.isOpen) {
      card.classList.add("is-ledger-open");
      visual.classList.add("is-ledger-open");
    }
    if (ledgerSummary.isInvalid) {
      visual.title = `${participant.label} exceeds its available emitted ledger. Available: ${formatLedger(
        ledgerSummary.outputLedger ?? ledgerSummary.incomingLedger
      )}. Routed: ${formatLedger(
        ledgerSummary.routedOutgoingLedger ?? ledgerSummary.outgoingLedger
      )}.`;
    } else if (ledgerSummary.isOpen) {
      visual.title = `${participant.label} ledger remains open. Emitted: ${formatLedger(
        ledgerSummary.outputLedger ?? ledgerSummary.outgoingLedger
      )}. Still undischarged: ${formatLedger(ledgerSummary.undischargedLedger)}.`;
    }
    [
      {
        className: "is-top-left is-positrino",
        count: ledgerSummary.incomingLedger.positrino,
        label: "e+",
        title: "Incoming positrino count",
      },
      {
        className: "is-top-right is-positrino",
        count: (ledgerSummary.outputLedger ?? ledgerSummary.outgoingLedger).positrino,
        label: "e+",
        title: "Outgoing positrino count",
      },
      {
        className: "is-bottom-left is-electrino",
        count: ledgerSummary.incomingLedger.electrino,
        label: "e-",
        title: "Incoming electrino count",
      },
      {
        className: "is-bottom-right is-electrino",
        count: (ledgerSummary.outputLedger ?? ledgerSummary.outgoingLedger).electrino,
        label: "e-",
        title: "Outgoing electrino count",
      },
    ].forEach((entry) => {
      const badge = document.createElement("span");
      badge.className = `composer-reaction-canvas-operator-ledger ${entry.className}`;
      badge.textContent = `${Number(entry.count ?? 0)} ${entry.label}`;
      badge.title = entry.title;
      visual.appendChild(badge);
    });
    if (getIsDraggingParticipant(participant.id)) {
      card.classList.add("is-dragging");
    }
    if (participant.templateId === "associate" || participant.templateId === "dissociate") {
      card.append(
        createBranchAnchorFrame({
          participant,
          rootNode,
          rootNodeKey,
          visual,
        })
      );
    } else {
      const inputAnchor = rootNode
        ? createAnchorButton(participant, rootNode, rootNodeKey, {
            anchorRole: "operator-input",
            extraClassNames: ["composer-reaction-canvas-operator-anchor", "is-input"],
          })
        : null;
      const outputAnchor = rootNode
        ? createAnchorButton(participant, rootNode, rootNodeKey, {
            anchorRole: "operator-output",
            extraClassNames: ["composer-reaction-canvas-operator-anchor", "is-output"],
          })
        : null;
      card.append(inputAnchor, visual, outputAnchor);
    }
    card.addEventListener("pointerdown", (event) => startOperatorDrag(event, participant.id));
    return card;
  }

  return {
    createSideSlotHeader,
    createOperatorParticipantCard,
    renderParticipantCard,
  };
}
