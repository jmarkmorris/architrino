import { getBinaryPersonalityChoice } from "./ComposerReactionBinarySelectionRuntime.js";
import {
  getReactionStructureTrackSlotCodes,
  isReactionStructureCompositeGridRenderMode,
  isReactionStructureInlineAnchorRenderMode,
  REACTION_STRUCTURE_RENDER_MODES,
} from "./ComposerReactionStructureDescriptorRuntime.js";

export function getRenderedSlotCodesForSide(side) {
  return getReactionStructureTrackSlotCodes(side);
}

function getParticipantTrackHeaderOffset(participant = null) {
  const rootNode = Array.isArray(participant?.hierarchy) ? participant.hierarchy[0] : null;
  if (!rootNode) {
    return "0px";
  }
  if (isReactionStructureCompositeGridRenderMode(rootNode.renderMode)) {
    return "calc((var(--binary-choice-size) * 2) + (var(--solver-anchor-size) * 2) + var(--solver-tile-gap) + (var(--solver-attachment-gap) * 3))";
  }
  if (isReactionStructureInlineAnchorRenderMode(rootNode.renderMode)) {
    return "calc(var(--binary-choice-size) + var(--solver-tile-gap))";
  }
  return "0px";
}

export function getReactionSideSlotHeaderProfile(participants = [], side = "reactant") {
  const normalizedSide = side === "product" ? "product" : "reactant";
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
    offset: getParticipantTrackHeaderOffset(referenceParticipant),
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

export function createComposerReactionParticipantRenderRuntime(options = {}) {
  const buildNodeKey = options.buildNodeKey;
  const countDescendants = options.countDescendants ?? (() => 0);
  const createAnchorButton = options.createAnchorButton;
  const createBinaryGlyph = options.createBinaryGlyph;
  const createInlineAnchorLane = options.createInlineAnchorLane;
  const cycleQuarkBinaryPreset = options.cycleQuarkBinaryPreset ?? (() => {});
  const findMappingByNodeKey = options.findMappingByNodeKey ?? (() => null);
  const formatLedger = options.formatLedger ?? (() => "");
  const formatParticipantLabel = options.formatParticipantLabel ?? ((label) => label);
  const getAllowedBinaryChoiceIds = options.getAllowedBinaryChoiceIds ?? (() => []);
  const getAnchorAvailability = options.getAnchorAvailability ?? (() => ({ disabled: false, reason: "" }));
  const getBinaryPersonalitySelection = options.getBinaryPersonalitySelection ?? (() => null);
  const getCenterTransformerGraphicOffsets =
    options.getCenterTransformerGraphicOffsets ?? (() => []);
  const getDefaultParticipantBaseLabel = options.getDefaultParticipantBaseLabel ?? ((_, label) => label || "?");
  const getIsDraggingParticipant = options.getIsDraggingParticipant ?? (() => false);
  const getParticipantCardLabelLines = options.getParticipantCardLabelLines ?? ((label) => [label]);
  const getParticipantCardMeta = options.getParticipantCardMeta ?? (() => ({ accent: "#b889ff" }));
  const getParticipantRootNode = options.getParticipantRootNode ?? (() => null);
  const getPendingSourceKey = options.getPendingSourceKey ?? (() => "");
  const getTransmuteCardLeft = options.getTransmuteCardLeft ?? (() => "50%");
  const getTransmuteCardTop = options.getTransmuteCardTop ?? (() => "50%");
  const getTransmuteLedgerSummary = options.getTransmuteLedgerSummary ?? (() => ({
    incomingLedger: { electrino: 0, positrino: 0 },
    outgoingLedger: { electrino: 0, positrino: 0 },
    isBalanced: false,
  }));
  const getTransmuteNode = options.getTransmuteNode ?? (() => null);
  const isCompositeParticipant = options.isCompositeParticipant ?? (() => false);
  const isProductCompositeParticipant = options.isProductCompositeParticipant ?? (() => false);
  const isQuarkTemplateId = options.isQuarkTemplateId ?? (() => false);
  const isReactantCompositeParticipant = options.isReactantCompositeParticipant ?? (() => false);
  const openParticipantMenuAt = options.openParticipantMenuAt ?? (() => {});
  const reducedBinaryPersonalityChoiceIds = options.reducedBinaryPersonalityChoiceIds ?? [];
  const resolveBinaryGlyphPolarity = options.resolveBinaryGlyphPolarity ?? (() => "pro");
  const setBinaryPersonalitySelection = options.setBinaryPersonalitySelection ?? (() => {});
  const shouldRenderChildNodes = options.shouldRenderChildNodes ?? (() => true);
  const startTransmuteDrag = options.startTransmuteDrag ?? (() => {});
  const supportsParticipantPolarity = options.supportsParticipantPolarity ?? (() => false);
  const topLevelHierarchyHasRenderMode = options.topLevelHierarchyHasRenderMode ?? (() => false);

  function createSvgElement(name) {
    return document.createElementNS("http://www.w3.org/2000/svg", name);
  }

  function syncCenterTransformerOperatorFan(card, participant) {
    if (!(card instanceof HTMLElement) || !participant) {
      return;
    }
    Array.from(card.querySelectorAll(".composer-reaction-solver-operator-fan")).forEach((fan) =>
      fan.remove()
    );
    if (participant.templateId !== "associate" && participant.templateId !== "dissociate") {
      return;
    }
    const graphicOffsets = getCenterTransformerGraphicOffsets(participant, 4)
      .filter((offset) => Number.isFinite(offset));
    if (graphicOffsets.length <= 1) {
      return;
    }
    const fan = document.createElement("div");
    fan.className = `composer-reaction-solver-operator-fan is-${participant.templateId}`;
    const fanSvg = createSvgElement("svg");
    fanSvg.classList.add("composer-reaction-solver-operator-fan-svg");
    const fanSpanPx = 42;
    const fanPaddingPx = 12;
    const fanNodeInsetPx = 8;
    const minOffset = Math.min(...graphicOffsets);
    const maxOffset = Math.max(...graphicOffsets);
    const fanHeightPx = Math.max(24, maxOffset - minOffset + fanPaddingPx * 2);
    const stemY = fanHeightPx / 2;
    fan.style.width = `${fanSpanPx}px`;
    fan.style.height = `${fanHeightPx}px`;
    fan.style.top = `calc(50% + ${minOffset - fanPaddingPx}px)`;
    if (participant.templateId === "associate") {
      fan.style.left = `calc(var(--solver-anchor-size) * -0.5 - ${fanSpanPx - 4}px)`;
      fan.style.right = "auto";
    } else {
      fan.style.right = `calc(var(--solver-anchor-size) * -0.5 - ${fanSpanPx - 4}px)`;
      fan.style.left = "auto";
    }
    fanSvg.setAttribute("viewBox", `0 0 ${fanSpanPx} ${fanHeightPx}`);
    fanSvg.setAttribute("aria-hidden", "true");
    const stemX = participant.templateId === "associate"
      ? fanSpanPx - fanNodeInsetPx
      : fanNodeInsetPx;
    const tipX = participant.templateId === "associate"
      ? fanNodeInsetPx
      : fanSpanPx - fanNodeInsetPx;
    graphicOffsets.forEach((offset) => {
      const tipY = offset - minOffset + fanPaddingPx;
      const path = createSvgElement("path");
      const controlPullPx = Math.max(8, fanSpanPx * 0.34);
      const controlStartX = participant.templateId === "associate"
        ? stemX - controlPullPx
        : stemX + controlPullPx;
      const controlEndX = participant.templateId === "associate"
        ? tipX + controlPullPx
        : tipX - controlPullPx;
      path.setAttribute(
        "d",
        `M ${stemX} ${stemY} C ${controlStartX} ${stemY}, ${controlEndX} ${tipY}, ${tipX} ${tipY}`
      );
      path.setAttribute("class", "composer-reaction-solver-operator-fan-path");
      fanSvg.appendChild(path);
      const dot = createSvgElement("circle");
      dot.setAttribute("cx", String(tipX));
      dot.setAttribute("cy", String(tipY));
      dot.setAttribute("r", "7");
      dot.setAttribute("class", "composer-reaction-solver-operator-fan-dot");
      fanSvg.appendChild(dot);
    });
    const stem = createSvgElement("circle");
    stem.setAttribute("cx", String(stemX));
    stem.setAttribute("cy", String(stemY));
    stem.setAttribute("r", "7");
    stem.setAttribute("class", "composer-reaction-solver-operator-fan-stem");
    fanSvg.appendChild(stem);
    fan.appendChild(fanSvg);
    card.appendChild(fan);
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
    placeholder.className = "composer-reaction-solver-binary-choice is-static is-placeholder";
    placeholder.setAttribute("aria-hidden", "true");
    return placeholder;
  }

  function createSideSlotHeader(participants, side) {
    const profile = getReactionSideSlotHeaderProfile(participants, side);
    const header = document.createElement("div");
    header.className = `composer-reaction-solver-side-slot-header is-${profile.side}`;
    header.style.setProperty("--solver-slot-header-offset", profile.offset);
    profile.slotCodes.forEach((slotCode) => {
      const slot = document.createElement("span");
      slot.className = "composer-reaction-solver-side-slot-header-slot";
      slot.textContent = slotCode;
      header.appendChild(slot);
    });
    return header;
  }

  function createParticipantVisual(participant, extraClassNames = []) {
    const visual = document.createElement("div");
    visual.className = "composer-reaction-solver-particle";
    extraClassNames.filter(Boolean).forEach((className) => visual.classList.add(className));
    if (participant.polarity === "anti") {
      visual.classList.add("is-anti-polarity");
    }
    const meta = getParticipantCardMeta(participant);
    visual.style.setProperty("--solver-accent", meta.accent);
    const visualLabel = document.createElement("div");
    visualLabel.className = "composer-reaction-solver-particle-label";
    getParticipantCardLabelLines(participant.label, participant).forEach((line) => {
      const lineElement = document.createElement("span");
      lineElement.className = "composer-reaction-solver-particle-label-line";
      lineElement.textContent = line;
      visualLabel.appendChild(lineElement);
    });
    visual.appendChild(visualLabel);
    visual.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openParticipantMenuAt(participant.id, event.clientX, event.clientY);
    });
    return visual;
  }

  function createBareBinaryContent(participant, node) {
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-solver-binary-selector is-${participant.side}`;
    const slot = document.createElement("span");
    slot.className = "composer-reaction-solver-binary-slot";
    slot.textContent = node.slotCode || "?";
    const choices = document.createElement("div");
    choices.className = "composer-reaction-solver-binary-choices is-single";
    choices.style.setProperty("--binary-choice-columns", "1");

    const chip = document.createElement("div");
    chip.className = "composer-reaction-solver-binary-choice is-static";
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

  function createNoetherCoreGridSections(participant, node, options = {}) {
    const { interactiveBinaryAnchors = true } = options;
    const tiles = document.createElement("div");
    tiles.className = "composer-reaction-solver-noether-core-grid-track";
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
              "composer-reaction-solver-binary-choice",
              "composer-reaction-solver-binary-choice-is-anchor",
              "composer-reaction-solver-noether-core-grid-tile",
              "is-static",
            ],
          })
        : Object.assign(document.createElement("div"), {
            className:
              "composer-reaction-solver-binary-choice composer-reaction-solver-noether-core-grid-tile is-static",
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
    wrapper.className = `composer-reaction-solver-noether-core-grid is-${participant.side}`;
    const { tiles } = createNoetherCoreGridSections(participant, node);
    const body = document.createElement("div");
    body.className = `composer-reaction-solver-noether-core-grid-body is-${participant.side}`;
    if (participant.side === "product") {
      body.append(createInlineAnchorLane(participant, node, nodeKey), tiles);
    } else {
      body.append(tiles, createInlineAnchorLane(participant, node, nodeKey));
    }
    wrapper.appendChild(body);
    return wrapper;
  }

  function createBinarySelectorGridTrack(participant, node) {
    const track = document.createElement("div");
    track.className = "composer-reaction-solver-binary-selector-grid-track";
    track.style.setProperty("--binary-choice-size", "72px");
    const glyphPolarity = resolveBinaryGlyphPolarity(participant, node);
    getRenderedCoreBinarySlots(participant, node).forEach((childNode) => {
      const column = document.createElement("div");
      column.className = "composer-reaction-solver-binary-selector-column";
      if (!childNode) {
        column.classList.add("is-placeholder");
        track.appendChild(column);
        return;
      }
      const choices = document.createElement("div");
      choices.className = "composer-reaction-solver-binary-selector-grid-options";
      const selectedChoice = getBinaryPersonalitySelection(participant, childNode, node);
      const allowedChoiceIds = getAllowedBinaryChoiceIds(participant, childNode, node);

      allowedChoiceIds.forEach((choiceId) => {
        const choice = getBinaryPersonalityChoice(choiceId);
        const button = document.createElement("button");
        button.type = "button";
        button.className = "composer-reaction-solver-binary-choice";
        button.dataset.choiceId = choice.id;
        button.style.setProperty("--binary-choice-accent", choice.accent);
        button.setAttribute("aria-label", `${childNode.label}: ${choice.label}`);
        button.title = choice.label;
        if (selectedChoice.id === choice.id) {
          button.classList.add("is-selected");
        } else {
          button.classList.add("is-dimmed");
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
    track.className = "composer-reaction-solver-binary-selector-grid-track";
    track.style.setProperty("--binary-choice-size", "72px");
    const glyphPolarity = resolveBinaryGlyphPolarity(participant, node);
    getRenderedCoreBinarySlots(participant, node).forEach((childNode) => {
      if (!childNode) {
        track.appendChild(createBinaryChoicePlaceholder());
        return;
      }
      const selectedChoice = getBinaryPersonalitySelection(participant, childNode, node);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "composer-reaction-solver-binary-choice is-selected";
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
    wrapper.className = `composer-reaction-solver-binary-selector-grid is-${participant.side}`;
    const nodeKey = buildNodeKey(participant.id, node.id);
    const track = createQuarkPresetRowTrack(participant, node);
    const body = document.createElement("div");
    body.className = `composer-reaction-solver-binary-selector-grid-body is-${participant.side}`;
    if (participant.side === "product") {
      body.append(createInlineAnchorLane(participant, node, nodeKey), track);
    } else {
      body.append(track, createInlineAnchorLane(participant, node, nodeKey));
    }
    wrapper.appendChild(body);
    return wrapper;
  }

  function createBinarySelectorGridContent(participant, node) {
    if (isQuarkTemplateId(node.templateId ?? participant.templateId)) {
      return createQuarkPresetRowContent(participant, node);
    }
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-solver-binary-selector-grid is-${participant.side}`;
    const nodeKey = buildNodeKey(participant.id, node.id);
    const track = createBinarySelectorGridTrack(participant, node);
    const body = document.createElement("div");
    body.className = `composer-reaction-solver-binary-selector-grid-body is-${participant.side}`;
    if (participant.side === "product") {
      body.append(createInlineAnchorLane(participant, node, nodeKey), track);
    } else {
      body.append(track, createInlineAnchorLane(participant, node, nodeKey));
    }
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
    const baseLabel = getDefaultParticipantBaseLabel(templateId, rowNode?.label);
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
    const card = document.createElement("div");
    card.className = "composer-reaction-solver-particle composer-reaction-solver-composite-row-card";
    if (cardParticipant.polarity === "anti") {
      card.classList.add("is-anti-polarity");
    }
    const meta = getParticipantCardMeta(cardParticipant);
    card.style.setProperty("--solver-accent", meta.accent);
    const label = document.createElement("div");
    label.className = "composer-reaction-solver-particle-label";
    getParticipantCardLabelLines(cardParticipant.label, cardParticipant).forEach((line) => {
      const lineElement = document.createElement("span");
      lineElement.className = "composer-reaction-solver-particle-label-line";
      lineElement.textContent = line;
      label.appendChild(lineElement);
    });
    card.appendChild(label);
    return card;
  }

  function createCompositeAssemblyRowBody(participant, rowNode) {
    const rowNodeKey = buildNodeKey(participant.id, rowNode.id);
    const body = document.createElement("div");
    body.className = `composer-reaction-solver-composite-row-body is-${participant.side}`;
    const card = createCompositeAssemblyRowCard(participant, rowNode);
    const track = createCompositeAssemblyRowTrack(participant, rowNode);
    const selectorLane = createInlineAnchorLane(participant, rowNode, rowNodeKey);
    selectorLane.classList.add("composer-reaction-solver-composite-row-selector-lane");
    if (participant.side === "product") {
      body.append(selectorLane, track, card);
    } else {
      body.append(card, track, selectorLane);
    }
    return body;
  }

  function createCompositeSpanRail(participant, rowNodes = []) {
    const rail = document.createElement("div");
    rail.className = `composer-reaction-solver-composite-span-rail is-${participant.side}`;
    const stem = document.createElement("span");
    stem.className = "composer-reaction-solver-composite-span-stem";
    stem.dataset.compositeSpanParticipantId = participant.id;
    rail.appendChild(stem);
    rowNodes.forEach(() => {
      const slot = document.createElement("div");
      slot.className = "composer-reaction-solver-composite-span-slot";
      const node = document.createElement("span");
      node.className = "composer-reaction-solver-composite-span-node";
      node.setAttribute("aria-hidden", "true");
      slot.appendChild(node);
      rail.appendChild(slot);
    });
    return rail;
  }

  function createCompositeAssemblyGridContent(participant, node) {
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-solver-higgs-cluster-grid is-${participant.side}`;
    const coreNodes = Array.isArray(node?.children) ? node.children : [];
    const rows = document.createElement("div");
    rows.className = "composer-reaction-solver-higgs-cluster-grid-rows";
    coreNodes.forEach((coreNode) => {
      const row = document.createElement("div");
      row.className = `composer-reaction-solver-higgs-cluster-grid-row is-${participant.side}`;
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
    rail.className = "composer-reaction-solver-composite-visual-rail";

    const collector = document.createElement("span");
    collector.className = "composer-reaction-solver-anchor composer-reaction-solver-composite-collector";
    collector.dataset.compositeCollectorId = participant.id;
    collector.setAttribute("aria-hidden", "true");

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
    wrapper.className = `composer-reaction-solver-binary-selector is-${participant.side}`;
    const slot = document.createElement("span");
    slot.className = "composer-reaction-solver-binary-slot";
    slot.textContent = node.slotCode || "?";
    const choices = document.createElement("div");
    choices.className = "composer-reaction-solver-binary-choices";
    choices.style.setProperty("--binary-choice-columns", String(reducedBinaryPersonalityChoiceIds.length));
    const selectedChoice = getBinaryPersonalitySelection(participant, node);
    const allowedChoiceIds = getAllowedBinaryChoiceIds(participant, node);
    const glyphPolarity = resolveBinaryGlyphPolarity(participant, node);

    allowedChoiceIds.forEach((choiceId) => {
      const choice = getBinaryPersonalityChoice(choiceId);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "composer-reaction-solver-binary-choice";
      button.dataset.choiceId = choice.id;
      button.style.setProperty("--binary-choice-accent", choice.accent);
      button.setAttribute("aria-label", `${node.label}: ${choice.label}`);
      button.title = choice.label;
      if (selectedChoice.id === choice.id) {
        button.classList.add("is-selected");
      } else {
        button.classList.add("is-dimmed");
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
      const anchorAvailability = getAnchorAvailability(participant.side, nodeKey);
      const row = document.createElement("div");
      row.className = "composer-reaction-solver-tree-row";
      row.style.setProperty("--solver-depth", String(depth));
      row.classList.add(`is-${participant.side}`);
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
      label.className = "composer-reaction-solver-tree-label";
      label.textContent = node.label;
      const content = document.createElement("div");
      content.className = "composer-reaction-solver-tree-content";
      content.style.setProperty("--solver-depth", String(depth));
      const usesInlineAnchor = isReactionStructureInlineAnchorRenderMode(node.renderMode);
      if (usesInlineAnchor) {
        row.classList.add("is-inline-anchor");
      }
      const anchor = usesInlineAnchor ? null : createAnchorButton(participant, node, nodeKey);
      const collapsedNote =
        hiddenDescendantCount > 0
          ? Object.assign(document.createElement("span"), {
              className: "composer-reaction-solver-tree-note",
              textContent: `${hiddenDescendantCount} hidden`,
            })
          : null;
      if (node.renderMode === REACTION_STRUCTURE_RENDER_MODES.NOETHER_CORE_GRID) {
        row.classList.add("is-noether-core-grid");
        content.classList.add("is-noether-core-grid");
        content.appendChild(createNoetherCoreGridContent(participant, node));
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
      } else if (participant.side === "product") {
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
    card.className = `composer-reaction-solver-participant is-${participant.side}`;
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
    if (participant.side === "product" && rootAnchorAvailability?.reason) {
      card.title = rootAnchorAvailability.reason;
    }
    const visual = isComposite
      ? createCompositeVisualRail(participant)
      : createParticipantVisual(participant);

    const hierarchy = document.createElement("div");
    hierarchy.className = `composer-reaction-solver-tree is-${participant.side}`;
    renderParticipantTreeRows(hierarchy, participant, participant.hierarchy, 0);

    getReactionParticipantCardSectionOrder({
      side: participant.side,
      isReactantComposite,
      isProductComposite,
    }).forEach((section) => {
      card.appendChild(section === "visual" ? visual : hierarchy);
    });
    return card;
  }

  function createTransmuteParticipantCard(participant) {
    const card = document.createElement("article");
    card.className = "composer-reaction-solver-participant is-center is-transmute-participant";
    card.dataset.participantId = participant.id;
    card.style.left = getTransmuteCardLeft(participant.centerColumnIndex);
    card.style.top = getTransmuteCardTop(participant.centerYRatio);
    if (participant.templateId === "associate") {
      card.classList.add("is-associate-operator");
    } else if (participant.templateId === "dissociate") {
      card.classList.add("is-dissociate-operator");
    }

    const rootNode = getTransmuteNode(participant);
    const rootNodeKey = rootNode ? buildNodeKey(participant.id, rootNode.id) : "";
    const inputAnchor = rootNode
      ? createAnchorButton(participant, rootNode, rootNodeKey, {
          anchorRole: "transmute-input",
          extraClassNames: ["composer-reaction-solver-transmute-anchor", "is-input"],
        })
      : null;
    const outputAnchor = rootNode
      ? createAnchorButton(participant, rootNode, rootNodeKey, {
          anchorRole: "transmute-output",
          extraClassNames: ["composer-reaction-solver-transmute-anchor", "is-output"],
        })
      : null;
    const visual = createParticipantVisual(participant, [
      "composer-reaction-solver-transmute-particle",
    ]);
    const ledgerSummary = getTransmuteLedgerSummary(participant.id);
    [
      {
        className: "is-top-left is-positrino",
        count: ledgerSummary.incomingLedger.positrino,
        label: "e+",
        title: "Incoming positrino count",
      },
      {
        className: "is-top-right is-positrino",
        count: ledgerSummary.outgoingLedger.positrino,
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
        count: ledgerSummary.outgoingLedger.electrino,
        label: "e-",
        title: "Outgoing electrino count",
      },
    ].forEach((entry) => {
      const badge = document.createElement("span");
      badge.className = `composer-reaction-solver-transmute-ledger ${entry.className}`;
      badge.textContent = `${Number(entry.count ?? 0)} ${entry.label}`;
      badge.title = entry.title;
      visual.appendChild(badge);
    });
    if (!ledgerSummary.isBalanced) {
      visual.title = `${participant.label} is unresolved until incoming and outgoing ledgers match. Incoming: ${formatLedger(
        ledgerSummary.incomingLedger
      )}. Outgoing: ${formatLedger(ledgerSummary.outgoingLedger)}.`;
    }
    if (getIsDraggingParticipant(participant.id)) {
      card.classList.add("is-dragging");
    }
    card.append(inputAnchor, visual, outputAnchor);
    syncCenterTransformerOperatorFan(card, participant);
    card.addEventListener("pointerdown", (event) => startTransmuteDrag(event, participant.id));
    return card;
  }

  return {
    createSideSlotHeader,
    createTransmuteParticipantCard,
    renderParticipantCard,
    syncCenterTransformerOperatorFan,
  };
}
