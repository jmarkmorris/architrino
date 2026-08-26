const DEFAULT_COLUMN_PAGE_GAP = 24;
const MIN_COLUMN_PAGE_HEIGHT = 280;
const WIDE_BLOCK_SELECTOR = [
  "h1",
  "table",
  ".markdown-image-block",
  "pre",
  "blockquote",
  ".math-block",
  ".markdown-math-block",
  ".katex-display",
  "mjx-container",
].join(", ");

function parseCssPixels(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function hasRenderableContent(node) {
  if (!node) {
    return false;
  }
  if (node.nodeType === 1) {
    return true;
  }
  return node.nodeType === 3 && String(node.textContent ?? "").trim().length > 0;
}

function isWideBlock(node) {
  return (
    node?.nodeType === 1 &&
    typeof node.matches === "function" &&
    node.matches(WIDE_BLOCK_SELECTOR)
  );
}

export function createMarkdownColumnPaginationRuntime({
  markdownBody,
  markdownContent,
  documentLike = typeof document !== "undefined" ? document : null,
  windowLike = typeof window !== "undefined" ? window : null,
  eventSignal,
} = {}) {
  let activeColumnCount = 1;
  let sourceNodes = null;
  let resizeFrame = null;

  function restoreSourceNodes() {
    if (!markdownBody || !sourceNodes) {
      return;
    }
    markdownBody.replaceChildren(...sourceNodes);
    markdownBody.classList.remove("markdown-column-pages");
    markdownBody.style?.removeProperty?.("--markdown-column-page-height");
    sourceNodes = null;
  }

  function resolvePageHeight() {
    const contentHeight = Number(markdownContent?.clientHeight) || 0;
    const computedStyle =
      markdownContent && typeof windowLike?.getComputedStyle === "function"
        ? windowLike.getComputedStyle(markdownContent)
        : null;
    const verticalPadding =
      parseCssPixels(computedStyle?.paddingTop) + parseCssPixels(computedStyle?.paddingBottom);
    return Math.max(MIN_COLUMN_PAGE_HEIGHT, Math.floor(contentHeight - verticalPadding));
  }

  function createColumnPage(columnCount, pageHeight) {
    const page = documentLike.createElement("section");
    page.className = "markdown-column-page";
    page.style.setProperty("--markdown-column-page-height", `${pageHeight}px`);

    const columns = [];
    for (let index = 0; index < columnCount; index += 1) {
      const column = documentLike.createElement("div");
      column.className = "markdown-column-page-column";
      column.style.height = `${pageHeight}px`;
      page.appendChild(column);
      columns.push(column);
    }
    markdownBody.appendChild(page);
    return {
      capacity: pageHeight,
      columns,
      page,
    };
  }

  function expandPage(pageState, height) {
    const expandedHeight = Math.ceil(height);
    if (expandedHeight <= pageState.capacity) {
      return;
    }
    pageState.capacity = expandedHeight;
    pageState.page.style.setProperty("--markdown-column-page-height", `${expandedHeight}px`);
    pageState.columns.forEach((column) => {
      column.style.height = `${expandedHeight}px`;
    });
  }

  function appendWideBlock(node) {
    const wrapper = documentLike.createElement("div");
    wrapper.className = "markdown-column-wide-block";
    wrapper.appendChild(node);
    markdownBody.appendChild(wrapper);
  }

  function paginate(columnCount) {
    if (!markdownBody || !markdownContent || !documentLike?.createElement) {
      return false;
    }

    restoreSourceNodes();
    sourceNodes = [...markdownBody.childNodes];
    if (!sourceNodes.length) {
      sourceNodes = null;
      return false;
    }

    const pageHeight = resolvePageHeight();
    markdownBody.replaceChildren();
    markdownBody.classList.add("markdown-column-pages");
    markdownBody.style?.setProperty?.("--markdown-column-page-gap", `${DEFAULT_COLUMN_PAGE_GAP}px`);

    let pageState = null;
    let columnIndex = 0;

    const startPage = () => {
      pageState = createColumnPage(columnCount, pageHeight);
      columnIndex = 0;
    };

    const advanceColumn = () => {
      columnIndex += 1;
      if (!pageState || columnIndex >= columnCount) {
        startPage();
      }
    };

    sourceNodes.forEach((node) => {
      if (isWideBlock(node)) {
        pageState = null;
        columnIndex = 0;
        appendWideBlock(node);
        return;
      }

      if (!pageState && !hasRenderableContent(node)) {
        markdownBody.appendChild(node);
        return;
      }

      if (!pageState) {
        startPage();
      }

      let column = pageState.columns[columnIndex];
      const hadRenderableContent = [...column.childNodes].some(hasRenderableContent);
      column.appendChild(node);
      if (column.scrollHeight <= pageState.capacity + 1) {
        return;
      }

      if (!hadRenderableContent) {
        expandPage(pageState, column.scrollHeight);
        return;
      }

      column.removeChild(node);
      advanceColumn();
      column = pageState.columns[columnIndex];
      column.appendChild(node);
      if (column.scrollHeight > pageState.capacity + 1) {
        expandPage(pageState, column.scrollHeight);
      }
    });

    return true;
  }

  function shouldUseVerticalPages(columnCount) {
    if (columnCount <= 1 || !markdownContent || !markdownBody) {
      return false;
    }
    const viewportIsSingleColumn =
      typeof windowLike?.matchMedia === "function" &&
      windowLike.matchMedia("(max-width: 980px)").matches;
    return !viewportIsSingleColumn;
  }

  function apply(columnCount = activeColumnCount) {
    activeColumnCount = Math.max(1, Math.min(3, Number(columnCount) || 1));
    if (!shouldUseVerticalPages(activeColumnCount)) {
      restoreSourceNodes();
      return false;
    }
    return paginate(activeColumnCount);
  }

  function refresh() {
    return apply(activeColumnCount);
  }

  function scheduleRefresh() {
    if (activeColumnCount <= 1) {
      return;
    }
    if (resizeFrame !== null && typeof windowLike?.cancelAnimationFrame === "function") {
      windowLike.cancelAnimationFrame(resizeFrame);
    }
    if (typeof windowLike?.requestAnimationFrame === "function") {
      resizeFrame = windowLike.requestAnimationFrame(() => {
        resizeFrame = null;
        refresh();
      });
      return;
    }
    refresh();
  }

  function clear() {
    if (resizeFrame !== null && typeof windowLike?.cancelAnimationFrame === "function") {
      windowLike.cancelAnimationFrame(resizeFrame);
    }
    resizeFrame = null;
    restoreSourceNodes();
    activeColumnCount = 1;
  }

  if (typeof windowLike?.addEventListener === "function") {
    windowLike.addEventListener(
      "resize",
      scheduleRefresh,
      eventSignal ? { signal: eventSignal } : undefined
    );
  }
  if (typeof markdownBody?.addEventListener === "function") {
    markdownBody.addEventListener(
      "load",
      scheduleRefresh,
      eventSignal ? { capture: true, signal: eventSignal } : { capture: true }
    );
  }

  return {
    apply,
    clear,
    refresh,
    scheduleRefresh,
  };
}
