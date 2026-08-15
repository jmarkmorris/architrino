export function parseInlineMathSegments(value) {
  const source = String(value ?? "");
  const segments = [];
  const pattern = /\$([^$\n]+)\$/gu;
  let cursor = 0;
  let match;

  while ((match = pattern.exec(source))) {
    if (match.index > cursor) {
      segments.push(Object.freeze({
        type: "text",
        value: source.slice(cursor, match.index),
      }));
    }
    segments.push(Object.freeze({
      type: "math",
      value: match[1],
    }));
    cursor = match.index + match[0].length;
  }

  if (cursor < source.length) {
    segments.push(Object.freeze({
      type: "text",
      value: source.slice(cursor),
    }));
  }

  return Object.freeze(segments);
}

export function renderInlineMathElement(element, tex, options = {}) {
  if (!element) {
    return element;
  }
  const windowLike = options.windowLike ?? element.ownerDocument?.defaultView ?? globalThis.window;
  const math = String(tex ?? "");
  const katex = windowLike?.katex;
  element.dataset.mathTex = math;
  if (katex && typeof katex.render === "function") {
    katex.render(math, element, {
      displayMode: false,
      throwOnError: false,
    });
    element.dataset.mathRendered = "true";
  } else {
    element.textContent = math;
    element.dataset.mathRendered = "false";
  }
  return element;
}

export function renderInlineMathText(element, value, options = {}) {
  if (!element) {
    return element;
  }
  const documentLike = options.documentLike ?? element.ownerDocument ?? globalThis.document;
  const windowLike = options.windowLike ?? documentLike?.defaultView ?? globalThis.window;
  const segments = parseInlineMathSegments(value);
  if (
    typeof documentLike?.createTextNode !== "function" ||
    typeof documentLike?.createElement !== "function"
  ) {
    element.textContent = segments.map((segment) => segment.value).join("");
    return element;
  }
  const children = segments.map((segment) => {
    if (segment.type === "text") {
      return documentLike.createTextNode(segment.value);
    }
    const mathElement = documentLike.createElement("span");
    mathElement.className = options.mathClassName ?? "inline-katex-math";
    return renderInlineMathElement(mathElement, segment.value, { windowLike });
  });

  if (typeof element.replaceChildren === "function") {
    element.replaceChildren(...children);
  } else {
    element.textContent = "";
    children.forEach((child) => element.append(child));
  }
  return element;
}

export function renderDeclaredInlineMath(root, options = {}) {
  const documentLike = options.documentLike ?? root?.ownerDocument ?? globalThis.document;
  const windowLike = options.windowLike ?? documentLike?.defaultView ?? globalThis.window;
  const elements = Array.from(root?.querySelectorAll?.("[data-inline-math]") ?? []);
  elements.forEach((element) => {
    renderInlineMathElement(element, element.dataset.inlineMath, { windowLike });
  });
  return elements.length;
}
