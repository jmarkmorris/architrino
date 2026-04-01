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

export function createReactionBinaryGlyphRuntime(options = {}) {
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

  function rotatePoint(x, y, centerX, centerY, angleDegrees = 0) {
    const radians = (Number(angleDegrees) || 0) * (Math.PI / 180);
    const translatedX = x - centerX;
    const translatedY = y - centerY;
    const rotatedX = translatedX * Math.cos(radians) - translatedY * Math.sin(radians);
    const rotatedY = translatedX * Math.sin(radians) + translatedY * Math.cos(radians);
    return {
      x: centerX + rotatedX,
      y: centerY + rotatedY,
    };
  }

  function createBinaryGlyph(choice = null, options = {}) {
    const {
      showPersonality = true,
      showBinary = true,
      showOrbitEllipse = showBinary,
      polarity = "pro",
      binaryRotationDegrees = 0,
    } = options;
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
      if (showOrbitEllipse) {
        const orbit = createSvgElement("ellipse");
        orbit.classList.add("composer-reaction-solver-binary-glyph-orbit");
        orbit.setAttribute("cx", "60");
        orbit.setAttribute("cy", "60");
        orbit.setAttribute("rx", "38");
        orbit.setAttribute("ry", "13");
        glyph.appendChild(orbit);
      }

      const axis = createSvgElement("line");
      axis.classList.add("composer-reaction-solver-binary-glyph-axis");
      axis.setAttribute("x1", "60");
      axis.setAttribute("y1", "18");
      axis.setAttribute("x2", "60");
      axis.setAttribute("y2", "102");
      glyph.appendChild(axis);

      const leftPolePoint = rotatePoint(22, 60, 60, 60, binaryRotationDegrees);
      const rightPolePoint = rotatePoint(98, 60, 60, 60, binaryRotationDegrees);

      const leftPole = createSvgElement("circle");
      leftPole.classList.add("composer-reaction-solver-binary-dot", "is-left", `is-${leftCharge}`);
      leftPole.setAttribute("cx", String(leftPolePoint.x));
      leftPole.setAttribute("cy", String(leftPolePoint.y));
      leftPole.setAttribute("r", "8.5");
      glyph.appendChild(leftPole);

      const rightPole = createSvgElement("circle");
      rightPole.classList.add("composer-reaction-solver-binary-dot", "is-right", `is-${rightCharge}`);
      rightPole.setAttribute("cx", String(rightPolePoint.x));
      rightPole.setAttribute("cy", String(rightPolePoint.y));
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
