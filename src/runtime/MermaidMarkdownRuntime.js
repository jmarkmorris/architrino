const MERMAID_SOURCE_SELECTOR = "pre > code.language-mermaid";
const MERMAID_MAX_TEXT_SIZE = 50_000;

export const mermaidSecurityConfig = Object.freeze({
  startOnLoad: false,
  securityLevel: "strict",
  secure: [
    "secure",
    "securityLevel",
    "startOnLoad",
    "maxTextSize",
    "htmlLabels",
    "flowchart",
  ],
  maxTextSize: MERMAID_MAX_TEXT_SIZE,
  htmlLabels: false,
  flowchart: {
    htmlLabels: false,
  },
  suppressErrorRendering: true,
  theme: "dark",
});

let nextMermaidDiagramId = 0;

function normalizeCssUrlTarget(value) {
  return String(value).trim().replace(/^(['"])(.*)\1$/u, "$2").trim();
}

export function isMermaidSvgSafe(svg) {
  if (
    typeof svg !== "string" ||
    !/^\s*<svg(?:\s|>)/iu.test(svg) ||
    !/<\/svg>\s*$/iu.test(svg)
  ) {
    return false;
  }
  if (
    /<(?:script|foreignObject|iframe|object|embed|link|meta|audio|video)(?:\s|>)/iu.test(svg) ||
    /\son[a-z][a-z0-9:_-]*\s*=/iu.test(svg) ||
    /(?:javascript:|data\s*:\s*text\/html|expression\s*\(|@import)/iu.test(svg)
  ) {
    return false;
  }

  const resourceAttributePattern =
    /\s(?:href|xlink:href|src)\s*=\s*(?:(["'])(.*?)\1|([^\s>]+))/giu;
  for (const match of svg.matchAll(resourceAttributePattern)) {
    const target = String(match[2] ?? match[3] ?? "").trim();
    if (!target.startsWith("#")) {
      return false;
    }
  }

  const cssUrlPattern = /url\((.*?)\)/giu;
  for (const match of svg.matchAll(cssUrlPattern)) {
    if (!normalizeCssUrlTarget(match[1]).startsWith("#")) {
      return false;
    }
  }
  return true;
}

function appendChild(parent, child) {
  if (typeof parent?.appendChild === "function") {
    parent.appendChild(child);
  }
}

function createDiagramSurface(code, documentLike) {
  const sourceBlock = code?.parentElement;
  const doc = documentLike ?? code?.ownerDocument ?? sourceBlock?.ownerDocument ?? null;
  if (!sourceBlock || sourceBlock.tagName !== "PRE" || typeof doc?.createElement !== "function") {
    return null;
  }

  const figure = doc.createElement("figure");
  figure.className = "markdown-mermaid is-pending";
  figure.dataset.mermaidState = "pending";
  figure.setAttribute("aria-label", "Mermaid diagram");

  const diagram = doc.createElement("div");
  diagram.className = "markdown-mermaid-diagram";
  diagram.hidden = true;
  diagram.setAttribute("role", "img");
  diagram.setAttribute("aria-label", "Rendered Mermaid diagram");

  const status = doc.createElement("p");
  status.className = "markdown-mermaid-status";
  status.textContent = "Rendering diagram...";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");

  const sourceDetails = doc.createElement("details");
  sourceDetails.className = "markdown-mermaid-source";
  sourceDetails.open = true;

  const sourceSummary = doc.createElement("summary");
  sourceSummary.textContent = "Mermaid diagram source";
  sourceBlock.classList?.add?.("markdown-mermaid-source-block");

  sourceBlock.replaceWith(figure);
  appendChild(sourceDetails, sourceSummary);
  appendChild(sourceDetails, sourceBlock);
  appendChild(figure, diagram);
  appendChild(figure, status);
  appendChild(figure, sourceDetails);

  return {
    source: String(code.textContent ?? ""),
    figure,
    diagram,
    status,
    sourceDetails,
  };
}

function showDiagramError(surface, message) {
  surface.figure.classList?.remove?.("is-pending", "is-rendered");
  surface.figure.classList?.add?.("has-render-error");
  surface.figure.dataset.mermaidState = "error";
  surface.diagram.hidden = true;
  surface.diagram.innerHTML = "";
  surface.status.hidden = false;
  surface.status.textContent = message;
  surface.sourceDetails.open = true;
}

function showRenderedDiagram(surface, svg) {
  surface.diagram.innerHTML = svg;
  surface.diagram.hidden = false;
  surface.status.hidden = true;
  surface.status.textContent = "Diagram rendered.";
  surface.sourceDetails.open = false;
  surface.figure.classList?.remove?.("is-pending", "has-render-error");
  surface.figure.classList?.add?.("is-rendered");
  surface.figure.dataset.mermaidState = "rendered";
}

export function createMermaidMarkdownRuntime({
  markdownBody,
  mermaidRenderer,
  documentLike,
  logger = console,
} = {}) {
  let configuredRenderer = null;

  function resolveRenderer() {
    return mermaidRenderer ?? globalThis.window?.mermaid ?? null;
  }

  function configureRenderer(renderer) {
    if (configuredRenderer === renderer) {
      return true;
    }
    if (typeof renderer?.initialize !== "function" || typeof renderer?.render !== "function") {
      return false;
    }
    renderer.initialize(mermaidSecurityConfig);
    configuredRenderer = renderer;
    return true;
  }

  async function renderDiagrams() {
    if (!markdownBody || typeof markdownBody.querySelectorAll !== "function") {
      return [];
    }
    const surfaces = [...markdownBody.querySelectorAll(MERMAID_SOURCE_SELECTOR)]
      .map((code) => createDiagramSurface(code, documentLike))
      .filter(Boolean);
    if (!surfaces.length) {
      return [];
    }

    const renderer = resolveRenderer();
    try {
      if (!configureRenderer(renderer)) {
        surfaces.forEach((surface) =>
          showDiagramError(surface, "Diagram renderer unavailable. Source is shown below.")
        );
        return surfaces.map(() => "unavailable");
      }
    } catch (error) {
      logger?.warn?.("Unable to initialize Mermaid diagram rendering.", error);
      surfaces.forEach((surface) =>
        showDiagramError(surface, "Diagram renderer unavailable. Source is shown below.")
      );
      return surfaces.map(() => "unavailable");
    }

    const results = [];
    for (const surface of surfaces) {
      if (surface.source.length > MERMAID_MAX_TEXT_SIZE) {
        showDiagramError(
          surface,
          "Diagram source is too large to render safely. Source is shown below."
        );
        results.push("too-large");
        continue;
      }
      try {
        nextMermaidDiagramId += 1;
        const rendered = await renderer.render(
          `architrino-mermaid-${nextMermaidDiagramId}`,
          surface.source
        );
        const svg = typeof rendered === "string" ? rendered : rendered?.svg;
        if (!isMermaidSvgSafe(svg)) {
          throw new Error("Mermaid returned SVG outside the accepted safety boundary.");
        }
        showRenderedDiagram(surface, svg);
        results.push("rendered");
      } catch (error) {
        logger?.warn?.("Unable to render a Mermaid diagram.", error);
        showDiagramError(surface, "Diagram could not be rendered. Source is shown below.");
        results.push("error");
      }
    }
    return results;
  }

  return {
    renderDiagrams,
  };
}
