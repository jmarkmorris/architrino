export function getBinaryGlyphPoleCharges(chargeTypes, polarity = "pro", normalizePolarity = null) {
  const normalize =
    typeof normalizePolarity === "function"
      ? normalizePolarity
      : (value) => (String(value ?? "").trim().toLowerCase() === "anti" ? "anti" : "pro");
  const resolvedPolarity = normalize(polarity);
  return resolvedPolarity === "anti"
    ? {
        leftCharge: chargeTypes.POSITRINO,
        rightCharge: chargeTypes.ELECTRINO,
      }
    : {
        leftCharge: chargeTypes.ELECTRINO,
        rightCharge: chargeTypes.POSITRINO,
      };
}

export function createComposerReactionBinaryGlyphRuntime(options = {}) {
  const createSvgElement =
    typeof options.createSvgElement === "function"
      ? options.createSvgElement
      : (name) => document.createElementNS("http://www.w3.org/2000/svg", name);
  const normalizeParticipantPolarity =
    typeof options.normalizeParticipantPolarity === "function"
      ? options.normalizeParticipantPolarity
      : (value) => (String(value ?? "").trim().toLowerCase() === "anti" ? "anti" : "pro");
  const structureChargeTypes =
    options.structureChargeTypes ?? { ELECTRINO: "electrino", POSITRINO: "positrino" };

  function createBinaryGlyph(choice = null, options = {}) {
    const { showPersonality = true, showBinary = true, polarity = "pro" } = options;
    const { leftCharge, rightCharge } = getBinaryGlyphPoleCharges(
      structureChargeTypes,
      polarity,
      normalizeParticipantPolarity
    );
    const glyph = createSvgElement("svg");
    glyph.classList.add("composer-reaction-solver-binary-glyph");
    glyph.setAttribute("viewBox", "0 0 120 120");
    glyph.setAttribute("aria-hidden", "true");

    if (showBinary) {
      const orbit = createSvgElement("ellipse");
      orbit.classList.add("composer-reaction-solver-binary-glyph-orbit");
      orbit.setAttribute("cx", "60");
      orbit.setAttribute("cy", "60");
      orbit.setAttribute("rx", "38");
      orbit.setAttribute("ry", "13");
      glyph.appendChild(orbit);

      const axis = createSvgElement("line");
      axis.classList.add("composer-reaction-solver-binary-glyph-axis");
      axis.setAttribute("x1", "60");
      axis.setAttribute("y1", "18");
      axis.setAttribute("x2", "60");
      axis.setAttribute("y2", "102");
      glyph.appendChild(axis);

      const leftPole = createSvgElement("circle");
      leftPole.classList.add("composer-reaction-solver-binary-dot", "is-left", `is-${leftCharge}`);
      leftPole.setAttribute("cx", "22");
      leftPole.setAttribute("cy", "60");
      leftPole.setAttribute("r", "8.5");
      glyph.appendChild(leftPole);

      const rightPole = createSvgElement("circle");
      rightPole.classList.add("composer-reaction-solver-binary-dot", "is-right", `is-${rightCharge}`);
      rightPole.setAttribute("cx", "98");
      rightPole.setAttribute("cy", "60");
      rightPole.setAttribute("r", "8.5");
      glyph.appendChild(rightPole);
    }

    if (showPersonality && choice) {
      const topDot = createSvgElement("circle");
      topDot.classList.add("composer-reaction-solver-binary-dot", "is-top", `is-${choice.top}`);
      topDot.setAttribute("cx", "60");
      topDot.setAttribute("cy", "18");
      topDot.setAttribute("r", "7.8");
      glyph.appendChild(topDot);

      const bottomDot = createSvgElement("circle");
      bottomDot.classList.add("composer-reaction-solver-binary-dot", "is-bottom", `is-${choice.bottom}`);
      bottomDot.setAttribute("cx", "60");
      bottomDot.setAttribute("cy", "102");
      bottomDot.setAttribute("r", "7.8");
      glyph.appendChild(bottomDot);
    }

    return glyph;
  }

  return {
    createBinaryGlyph,
  };
}
