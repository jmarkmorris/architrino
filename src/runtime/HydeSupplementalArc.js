const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

// Drawing coordinates share the Hyde artwork's viewBox, so text and bands scale together.
export function buildHydeSupplementalArcGeometry() {
  const originY = 370;
  const point = (radius, degrees) => {
    const angle = degrees * Math.PI / 180;
    return { x: radius * Math.sin(angle), y: originY - radius * Math.cos(angle) };
  };
  const position = ({ x, y }) => `${x.toFixed(3)},${y.toFixed(3)}`;
  // Reduce the radial thickness from 100 to 90 without distorting the labels or ring.
  const outerLeft = point(415, -24);
  const outerRight = point(415, 24);
  const innerRight = point(325, 24);
  const innerLeft = point(325, -24);
  return {
    bandPath: `M${position(outerLeft)} A415,415 0 0 1 ${position(outerRight)} L${position(innerRight)} A325,325 0 0 0 ${position(innerLeft)} Z`,
    namePath: `M${position(point(391, -21))} A391,391 0 0 1 ${position(point(391, 21))}`,
    symbol: { x: 66, y: 10, radius: 30 },
    number: { x: -76, y: 32 },
  };
}

export function buildHydeSupplementalArcPlacement(anchor, width, height) {
  if (!Number.isFinite(anchor?.x) || !Number.isFinite(anchor?.y)) {
    return null;
  }
  // Keep the detached band above the outer alkali-metal lane and inside the artwork.
  return {
    center: {
      x: Math.max(200, Math.min(width - 200, anchor.x + 100)),
      y: Math.max(170, Math.min(height - 170, anchor.y - 140)),
    },
    rotation: 45,
  };
}

export function createHydeSupplementalArc(document, element, placement) {
  const make = (tag, attributes = {}, text) => {
    const node = document.createElementNS(SVG_NAMESPACE, tag);
    for (const [key, value] of Object.entries(attributes)) {
      node.setAttribute(key, String(value));
    }
    if (text !== undefined) node.textContent = String(text);
    return node;
  };
  const geometry = buildHydeSupplementalArcGeometry();
  const group = make("g", {
    class: "hyde-periodic-extra-arc",
    role: "button",
    tabindex: "0",
    "aria-label": `${element.name} (${element.symbol})`,
    transform: `translate(${placement.center.x} ${placement.center.y}) rotate(${placement.rotation})`,
  });
  const namePathId = `hyde-supplemental-name-${element.number}`;
  const defs = make("defs");
  defs.appendChild(make("path", { id: namePathId, d: geometry.namePath }));
  group.appendChild(defs);
  group.appendChild(make("path", { class: "hyde-extra-band", d: geometry.bandPath }));
  group.appendChild(make("circle", {
    class: "hyde-extra-symbol-ring",
    cx: geometry.symbol.x,
    cy: geometry.symbol.y,
    r: geometry.symbol.radius,
  }));
  const name = make("text", { class: "hyde-extra-name", "aria-hidden": "true" });
  name.appendChild(make("textPath", { href: `#${namePathId}`, startOffset: "3%" }, element.name));
  group.appendChild(name);
  group.appendChild(make("text", {
    class: "hyde-extra-number",
    x: geometry.number.x,
    y: geometry.number.y,
    "text-anchor": "middle",
    "dominant-baseline": "middle",
    "aria-hidden": "true",
  }, element.number));
  group.appendChild(make("text", {
    class: "hyde-extra-symbol",
    x: geometry.symbol.x,
    y: geometry.symbol.y,
    "text-anchor": "middle",
    "dominant-baseline": "middle",
    "aria-hidden": "true",
  }, element.symbol));
  return group;
}
