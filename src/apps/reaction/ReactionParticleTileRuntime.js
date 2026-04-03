function appendTileLabelLines(labelElement, lines = []) {
  (Array.isArray(lines) ? lines : []).forEach((line) => {
    const lineElement = document.createElement("span");
    lineElement.className = "composer-reaction-solver-particle-label-line";
    lineElement.textContent = String(line ?? "");
    labelElement.appendChild(lineElement);
  });
}

export function getReactionParticleTileLabelLines(
  label = "",
  participant = null,
  options = {}
) {
  const supportsParticipantPolarity = options.supportsParticipantPolarity ?? (() => false);
  const words = String(label || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const normalizedTemplateId = String(participant?.templateId ?? "").trim().toLowerCase();
  if (normalizedTemplateId === "pi_minus") {
    return ["Negative", "Pion", "d !u"];
  }
  if (normalizedTemplateId === "pi_plus") {
    return ["Positive", "Pion", "!d u"];
  }
  if (normalizedTemplateId === "dpi0") {
    return ["Neutral", "Pion", "d !d"];
  }
  if (normalizedTemplateId === "upi0") {
    return ["Neutral", "Pion", "u !u"];
  }
  if (normalizedTemplateId === "k_minus") {
    return ["Negative", "Kaon", "s !u"];
  }
  if (normalizedTemplateId === "k_plus") {
    return ["Positive", "Kaon", "u !s"];
  }
  if (normalizedTemplateId === "anti_k0") {
    return ["Neutral", "Kaon", "s !d"];
  }
  if (normalizedTemplateId === "k0") {
    return ["Neutral", "Kaon", "d !s"];
  }
  if (normalizedTemplateId === "proton" && options.includeCompositePreviewLines === true) {
    return ["Pro", "Proton", "u d u"];
  }
  if (normalizedTemplateId === "neutron" && options.includeCompositePreviewLines === true) {
    return ["Pro", "Neutron", "d u d"];
  }
  if (normalizedTemplateId === "noether_core" && words.length >= 3) {
    const [polarityWord = "", secondWord = "", thirdWord = ""] = words;
    return [
      polarityWord ? polarityWord[0].toUpperCase() + polarityWord.slice(1).toLowerCase() : "?",
      secondWord ? secondWord[0].toUpperCase() + secondWord.slice(1).toLowerCase() : "",
      thirdWord ? thirdWord[0].toUpperCase() + thirdWord.slice(1).toLowerCase() : "",
    ].filter(Boolean);
  }
  if (supportsParticipantPolarity(normalizedTemplateId) && words.length >= 2) {
    const [polarityWord = "", ...restWords] = words;
    return [
      polarityWord ? polarityWord[0].toUpperCase() + polarityWord.slice(1).toLowerCase() : "?",
      ...restWords.map((word) => word[0]?.toUpperCase?.() + word.slice(1).toLowerCase()),
    ].filter(Boolean);
  }
  if (words.length <= 1) {
    return [String(label || "").trim() || "?"];
  }
  if (words.length === 2) {
    return words;
  }
  return [words.slice(0, -1).join(" "), words.at(-1) ?? ""];
}

export function createReactionParticleTileElement(participant = null, options = {}) {
  const classNames = Array.isArray(options.classNames) ? options.classNames : [];
  const getParticipantCardMeta = options.getParticipantCardMeta ?? (() => ({ accent: "#b889ff" }));
  const getParticipantCardLabelLines =
    options.getParticipantCardLabelLines ?? ((tileLabel) => [String(tileLabel ?? "").trim() || "?"]);
  const tile = document.createElement("div");
  tile.className = "composer-reaction-solver-particle";
  classNames.filter(Boolean).forEach((className) => tile.classList.add(className));
  if (participant?.templateId === "free_architrinos") {
    tile.classList.add("is-free-architrinos");
  }
  if (participant?.polarity === "anti") {
    tile.classList.add("is-anti-polarity");
  }
  const meta = getParticipantCardMeta(participant);
  tile.style.setProperty("--solver-accent", meta.accent);
  const visualLabel = document.createElement("div");
  visualLabel.className = "composer-reaction-solver-particle-label";
  appendTileLabelLines(
    visualLabel,
    getParticipantCardLabelLines(participant?.label, participant)
  );
  tile.appendChild(visualLabel);
  return tile;
}
