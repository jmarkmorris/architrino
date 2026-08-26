import { createMermaidMarkdownRuntime } from "./MermaidMarkdownRuntime.js";
import { createMarkdownColumnPaginationRuntime } from "./MarkdownColumnPaginationRuntime.js";

export function createMarkdownRuntime(deps) {
  const {
    markdownPanel,
    markdownTitle,
    markdownContent: providedMarkdownContent,
    markdownBody,
    markdownLayoutToggle,
    markdownRenderer,
    mermaidRenderer,
    markdownCache,
    markdownSectionCache,
    extractMarkdownSection,
    appendCacheBust,
    navigateToTarget,
    documentLike = typeof document !== "undefined" ? document : null,
    eventSignal,
  } = deps;
  const markdownContent = providedMarkdownContent ?? markdownBody?.parentElement ?? null;
  const mermaidRuntime = createMermaidMarkdownRuntime({
    markdownBody,
    mermaidRenderer,
    documentLike,
  });
  const columnPaginationRuntime = createMarkdownColumnPaginationRuntime({
    markdownBody,
    markdownContent,
    documentLike,
    eventSignal,
  });

  let activeMarkdownPath = null;
  let activeMarkdownSourcePath = null;
  let markdownColumnCount = 2;
  let markdownPreferredColumnCount = 2;
  let previousDocumentTitle = null;
  const textbookTocMarkdownPath = "content/generated/markdown/textbook/toc.md";
  const archieComicsMarkdownPath = "content/markdown/aaa/archie/comics.md";
  const supportResearchMarkdownPath = "content/markdown/aaa/archie/support-architrino-research.md";
  const liberapayWidgetScriptSrc = "https://liberapay.com/Architrino/widgets/button.js";
  const mathTypesetRetryDelayMs = 120;
  const mathTypesetRetryLimit = 20;
  const markdownMathDelimiters = [
    { left: "$$", right: "$$", display: true },
    { left: "\\[", right: "\\]", display: true },
    { left: "$", right: "$", display: false },
    { left: "\\(", right: "\\)", display: false },
  ];
  // These IDs are runtime-only helper scene identities, not authored scene IDs.
  const runtimeMarkdownPrefix = "runtime:markdown:";
  const runtimeMarkdownDocPrefix = `${runtimeMarkdownPrefix}doc:`;
  const runtimeMarkdownReaderPrefix = `${runtimeMarkdownPrefix}reader:`;
  const runtimeMarkdownIndexPrefix = `${runtimeMarkdownPrefix}index:`;
  let mathTypesetRetryTimer = null;
  let mathTypesetRetryVersion = 0;

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeHtmlAttribute(text) {
    return escapeHtml(text).replace(/"/g, "&quot;");
  }

  function normalizeRepoPath(value) {
    return String(value)
      .replace(/\\/g, "/")
      .replace(/^\.?\//, "")
      .replace(/\/+$/, "");
  }

  function buildMarkdownReaderTarget(markdownPath, markdownSection) {
    return `${runtimeMarkdownReaderPrefix}${markdownPath}::${encodeURIComponent(markdownSection)}`;
  }

  function resolveLocalMarkdownHref(rawHref) {
    if (typeof rawHref !== "string" || !rawHref.trim()) {
      return null;
    }
    const href = rawHref.trim();
    const basePath = activeMarkdownSourcePath
      ? `https://architrino.local/${normalizeRepoPath(activeMarkdownSourcePath)}`
      : "https://architrino.local/";
    let parsed;
    try {
      parsed = new URL(href, basePath);
    } catch (error) {
      return null;
    }

    if (parsed.protocol !== "https:" || parsed.hostname !== "architrino.local") {
      return null;
    }

    const resolvedPath = normalizeRepoPath(parsed.pathname);
    if (!resolvedPath) {
      return null;
    }
    return {
      path: resolvedPath,
      searchParams: parsed.searchParams,
    };
  }

  function resolveMarkdownLinkTarget(rawHref) {
    if (typeof rawHref !== "string" || !rawHref.trim()) {
      return null;
    }
    const href = rawHref.trim();
    if (href.startsWith(runtimeMarkdownPrefix)) {
      return href;
    }

    const resolved = resolveLocalMarkdownHref(href);
    if (!resolved) {
      return null;
    }
    const resolvedPath = resolved.path;
    if (resolvedPath.endsWith(".json") && resolvedPath.startsWith("content/scenes/")) {
      return resolvedPath;
    }
    const isMarkdownDocument =
      resolvedPath.endsWith(".md") &&
      (resolvedPath.startsWith("content/markdown/") ||
        resolvedPath.startsWith("content/generated/markdown/") ||
        resolvedPath.startsWith("reference/priorities/"));
    if (isMarkdownDocument) {
      const section = resolved.searchParams.get("section");
      if (typeof section === "string" && section.trim()) {
        return buildMarkdownReaderTarget(resolvedPath, section.trim());
      }
      return resolvedPath;
    }
    return null;
  }

  function resolveMarkdownImageSource(rawSrc) {
    if (typeof rawSrc !== "string" || !rawSrc.trim()) {
      return null;
    }
    const src = rawSrc.trim();
    if (/^(?:[a-z][a-z0-9+.-]*:|#)/iu.test(src)) {
      return null;
    }

    const resolved = resolveLocalMarkdownHref(src);
    if (!resolved) {
      return null;
    }
    return resolved.path;
  }

  function decorateMarkdownImages() {
    if (!markdownBody || typeof markdownBody.querySelectorAll !== "function") {
      return;
    }
    markdownBody.querySelectorAll("img[src]").forEach((image) => {
      const resolvedSrc = resolveMarkdownImageSource(image.getAttribute?.("src"));
      if (!resolvedSrc) {
        return;
      }
      image.setAttribute(
        "src",
        typeof appendCacheBust === "function" ? appendCacheBust(resolvedSrc) : resolvedSrc
      );
      image.setAttribute("loading", "lazy");
      image.setAttribute("decoding", "async");
      image.classList?.add?.("markdown-image");

      const parent = image.parentElement;
      const blockParent = parent?.tagName === "A" ? parent.parentElement : parent;
      if (blockParent?.tagName === "P") {
        blockParent.classList?.add?.("markdown-image-block");
      }
    });
  }

  function decorateLocalAssetLinks() {
    if (!markdownBody || typeof markdownBody.querySelectorAll !== "function") {
      return;
    }
    markdownBody.querySelectorAll("a[href]").forEach((link) => {
      const rawHref = link.getAttribute?.("href");
      if (resolveMarkdownLinkTarget(rawHref)) {
        return;
      }
      const resolved = resolveLocalMarkdownHref(rawHref);
      const resolvedPath = resolved?.path ?? "";
      if (!resolvedPath.startsWith("content/assets/")) {
        return;
      }
      link.setAttribute(
        "href",
        typeof appendCacheBust === "function" ? appendCacheBust(resolvedPath) : resolvedPath
      );
      link.removeAttribute("target");
      link.removeAttribute("rel");
    });
  }

  function protectMathSegments(markdown) {
    const protectedSegments = [];
    let protectedIndex = 0;
    const makeToken = () => `MATHSEGMENTTOKEN${protectedIndex++}X`;
    const stash = (raw, math, display) => {
      const token = makeToken();
      protectedSegments.push({ token, raw, math, display });
      return token;
    };

    let output = markdown;
    output = output.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => `\n\n${stash(match, math, true)}\n\n`);
    output = output.replace(/\\\[([\s\S]*?)\\\]/g, (match, math) => `\n\n${stash(match, math, true)}\n\n`);
    output = output.replace(/\\\(([\s\S]*?)\\\)/g, (match, math) =>
      stash(match, math, false)
    );
    output = output.replace(
      /(^|[^\\$])\$(?!\$)([^$\n]|\\\$)+?\$(?!\$)/g,
      (match, prefix) => {
        const math = match.slice(prefix.length);
        return `${prefix}${stash(math, math.slice(1, -1), false)}`;
      }
    );

    return { markdown: output, protectedSegments };
  }

  function protectCodeSegments(markdown) {
    const protectedCodeSegments = [];
    let protectedIndex = 0;
    let output = "";
    let cursor = 0;

    const makeToken = () => `CODESEGMENTTOKEN${protectedIndex++}X`;

    while (cursor < markdown.length) {
      if (markdown[cursor] !== "`") {
        output += markdown[cursor];
        cursor += 1;
        continue;
      }

      let runEnd = cursor;
      while (runEnd < markdown.length && markdown[runEnd] === "`") {
        runEnd += 1;
      }
      const fence = markdown.slice(cursor, runEnd);
      const closeIndex = markdown.indexOf(fence, runEnd);
      if (closeIndex === -1) {
        output += markdown[cursor];
        cursor += 1;
        continue;
      }

      const raw = markdown.slice(cursor, closeIndex + fence.length);
      const token = makeToken();
      protectedCodeSegments.push({ token, raw });
      output += token;
      cursor = closeIndex + fence.length;
    }

    return { markdown: output, protectedCodeSegments };
  }

  function restoreCodeSegments(markdown, protectedCodeSegments) {
    if (!protectedCodeSegments?.length) {
      return markdown;
    }
    let restored = markdown;
    protectedCodeSegments.forEach(({ token, raw }) => {
      restored = restored.split(token).join(raw);
    });
    return restored;
  }

  function renderMathSegmentFallback(segment) {
    return escapeHtml(segment.math || segment.raw || "");
  }

  function renderMathSegmentHtml(segment) {
    const tagName = segment.display ? "div" : "span";
    const className = segment.display
      ? "markdown-math-segment markdown-math-block"
      : "markdown-math-segment markdown-math-inline";
    return `<${tagName} class="${className}" data-math-display="${segment.display ? "true" : "false"}" data-math-tex="${escapeHtmlAttribute(segment.math || "")}">${renderMathSegmentFallback(segment)}</${tagName}>`;
  }

  function restoreMathSegments(html, protectedSegments) {
    if (!protectedSegments?.length) {
      return html;
    }
    let restored = html;
    protectedSegments.forEach((segment) => {
      const { token } = segment;
      const segmentHtml = renderMathSegmentHtml(segment);
      const paragraphPattern = new RegExp(`<p>\\s*${token}\\s*</p>`, "g");
      restored = restored.replace(paragraphPattern, segmentHtml);
      restored = restored.split(token).join(segmentHtml);
    });
    return restored;
  }

  function isTextbookTocPath(markdownPath) {
    return normalizeRepoPath(markdownPath) === textbookTocMarkdownPath;
  }

  function isArchieComicsPath(markdownPath) {
    return normalizeRepoPath(markdownPath) === archieComicsMarkdownPath;
  }

  function isSupportResearchPath(markdownPath) {
    return normalizeRepoPath(markdownPath) === supportResearchMarkdownPath;
  }

  function setMarkdownKind(markdownPath) {
    if (!markdownPanel) {
      return;
    }
    const isTextbookToc = isTextbookTocPath(markdownPath);
    markdownPanel.classList.toggle("is-textbook-toc", isTextbookToc);
    if (isTextbookToc) {
      markdownPanel.dataset.markdownKind = "textbook-toc";
    } else if (isArchieComicsPath(markdownPath)) {
      markdownPanel.dataset.markdownKind = "archie-comics";
    } else {
      delete markdownPanel.dataset.markdownKind;
    }
  }

  function decorateTextbookToc() {
    if (!markdownBody || !isTextbookTocPath(activeMarkdownSourcePath)) {
      return;
    }

    const topLevelList = markdownBody.querySelector("ul");
    if (!topLevelList) {
      return;
    }

    const findDirectChildList = (listItem) =>
      [...listItem.children].find(
        (child) => child.tagName === "UL" || child.tagName === "OL"
      ) ?? null;

    const markListLevel = (list, level) => {
      list.dataset.tocLevel = String(level);
      [...list.children].forEach((item) => {
        if (item.tagName !== "LI") {
          return;
        }
        item.dataset.tocLevel = String(level);
        item.classList.remove("toc-collapsible", "is-collapsed", "is-expanded");
        delete item.dataset.tocExpanded;
        const branchList = findDirectChildList(item);
        if (branchList) {
          branchList.hidden = false;
          markListLevel(branchList, level + 1);
        }
      });
    };

    markListLevel(topLevelList, 1);
  }

  function decorateSupportResearch() {
    if (!markdownBody || !isSupportResearchPath(activeMarkdownSourcePath)) {
      return;
    }

    const monthlyHeading = [...markdownBody.querySelectorAll("h3")].find(
      (heading) => heading.textContent.trim().toLowerCase() === "monthly support"
    );
    if (!monthlyHeading) {
      return;
    }

    const existingWidget = markdownBody.querySelector(".liberapay-donation-widget");
    if (existingWidget) {
      return;
    }

    const insertionTarget =
      monthlyHeading.nextElementSibling?.tagName === "P"
        ? monthlyHeading.nextElementSibling
        : monthlyHeading;

    const widget = document.createElement("div");
    widget.className = "liberapay-donation-widget";
    widget.setAttribute("aria-label", "Liberapay donation button");

    const script = document.createElement("script");
    script.src = liberapayWidgetScriptSrc;
    widget.appendChild(script);

    insertionTarget.insertAdjacentElement("afterend", widget);
  }

  function getBrowserWindow() {
    return typeof window !== "undefined" ? window : null;
  }

  function clearTypesetRetryTimer() {
    const browserWindow = getBrowserWindow();
    if (
      mathTypesetRetryTimer !== null &&
      typeof browserWindow?.clearTimeout === "function"
    ) {
      browserWindow.clearTimeout(mathTypesetRetryTimer);
    }
    mathTypesetRetryTimer = null;
  }

  function startTypesetRetryCycle() {
    clearTypesetRetryTimer();
    mathTypesetRetryVersion += 1;
    return mathTypesetRetryVersion;
  }

  function cancelTypesetRetryCycle() {
    clearTypesetRetryTimer();
    mathTypesetRetryVersion += 1;
  }

  function markdownBodyNeedsMathTypesetting() {
    if (!markdownBody) {
      return false;
    }
    if (
      typeof markdownBody.querySelectorAll === "function" &&
      markdownBody.querySelectorAll(".markdown-math-segment:not(.is-rendered)").length > 0
    ) {
      return true;
    }
    const text = `${markdownBody.textContent ?? ""}\n${markdownBody.innerHTML ?? ""}`;
    return (
      text.includes("$") ||
      text.includes("\\[") ||
      text.includes("\\(") ||
      (text.includes("markdown-math-segment") && !text.includes("is-rendered"))
    );
  }

  function renderProtectedMathSegments() {
    if (!markdownBody || typeof markdownBody.querySelectorAll !== "function") {
      return true;
    }
    const pendingSegments = [
      ...markdownBody.querySelectorAll(".markdown-math-segment:not(.is-rendered)"),
    ];
    if (!pendingSegments.length) {
      return true;
    }
    const katexRenderer = getBrowserWindow()?.katex;
    if (!katexRenderer || typeof katexRenderer.renderToString !== "function") {
      return false;
    }
    pendingSegments.forEach((segment) => {
      const math = segment.dataset.mathTex || "";
      const displayMode = segment.dataset.mathDisplay === "true";
      try {
        segment.innerHTML = katexRenderer.renderToString(math, {
          displayMode,
          throwOnError: false,
          strict: "ignore",
        });
        segment.classList.add("is-rendered");
      } catch (error) {
        segment.textContent = math;
        segment.classList.add("is-rendered", "has-render-error");
      }
    });
    return true;
  }

  function typesetMarkdown() {
    if (!markdownBody) {
      return true;
    }
    if (!markdownBodyNeedsMathTypesetting()) {
      return true;
    }
    const protectedMathRendered = renderProtectedMathSegments();
    if (!protectedMathRendered) {
      return false;
    }
    const katexRender = getBrowserWindow()?.renderMathInElement;
    if (typeof katexRender !== "function") {
      return !markdownBodyNeedsMathTypesetting();
    }
    try {
      katexRender(markdownBody, {
        delimiters: markdownMathDelimiters,
        throwOnError: false,
      });
    } catch (error) {
      console.error(error);
    }
    return true;
  }

  function typesetMarkdownWithRetry(version, retriesRemaining = mathTypesetRetryLimit) {
    if (version !== mathTypesetRetryVersion) {
      return;
    }
    if (typesetMarkdown()) {
      columnPaginationRuntime.scheduleRefresh();
      return;
    }
    if (retriesRemaining <= 0) {
      return;
    }
    const browserWindow = getBrowserWindow();
    if (typeof browserWindow?.setTimeout !== "function") {
      return;
    }
    mathTypesetRetryTimer = browserWindow.setTimeout(() => {
      mathTypesetRetryTimer = null;
      typesetMarkdownWithRetry(version, retriesRemaining - 1);
    }, mathTypesetRetryDelayMs);
  }

  function hideMarkdownPanel() {
    if (!markdownPanel) {
      return;
    }
    markdownPanel.classList.remove("is-open");
    markdownPanel.setAttribute("aria-hidden", "true");
    markdownPanel.inert = true;
    markdownPanel.removeAttribute("aria-label");
    if (markdownTitle) {
      markdownTitle.textContent = "";
    }
    if (markdownContent) {
      markdownContent.removeAttribute("aria-label");
    }
    if (markdownBody) {
      columnPaginationRuntime.clear();
      markdownBody.innerHTML = "";
    }
    if (documentLike && previousDocumentTitle !== null) {
      documentLike.title = previousDocumentTitle;
      previousDocumentTitle = null;
    }
    activeMarkdownPath = null;
    activeMarkdownSourcePath = null;
    cancelTypesetRetryCycle();
    setMarkdownKind(null);
  }

  function isMarkdownPanelOpen() {
    return !!markdownPanel?.classList.contains("is-open");
  }

  function isActiveLevelMarkdown(level) {
    const target = resolveMarkdownTarget(level);
    if (!target.markdownPath) {
      return false;
    }
    const sectionKey = target.markdownSection ?? null;
    const cacheKey = sectionKey
      ? `${target.markdownPath}::${sectionKey}`
      : target.markdownPath;
    return isMarkdownPanelOpen() && activeMarkdownPath === cacheKey;
  }

  function resolveMarkdownTarget(level) {
    let markdownPath =
      typeof level?.markdownPath === "string" && level.markdownPath.trim().length > 0
        ? level.markdownPath
        : null;
    let markdownSection =
      typeof level?.markdownSection === "string" && level.markdownSection.trim().length > 0
        ? level.markdownSection
        : null;
    const levelId = typeof level?.id === "string" ? level.id : "";

    if (levelId.startsWith(runtimeMarkdownDocPrefix)) {
      markdownPath = levelId.slice(runtimeMarkdownDocPrefix.length);
      markdownSection = null;
    } else if (levelId.startsWith(runtimeMarkdownReaderPrefix)) {
      const raw = levelId.slice(runtimeMarkdownReaderPrefix.length);
      const sectionSep = raw.indexOf("::");
      const parsedPath = sectionSep === -1 ? raw : raw.slice(0, sectionSep);
      const encodedSection = sectionSep === -1 ? null : raw.slice(sectionSep + 2);
      markdownPath = parsedPath || markdownPath;
      markdownSection = encodedSection ? decodeURIComponent(encodedSection) : null;
    } else if (levelId.startsWith(runtimeMarkdownIndexPrefix)) {
      const raw = levelId.slice(runtimeMarkdownIndexPrefix.length);
      const depthTokenIndex = raw.lastIndexOf("::d");
      const headingTokenIndex =
        depthTokenIndex > -1 ? raw.lastIndexOf("::h", depthTokenIndex) : raw.lastIndexOf("::h");
      const sectionTokenIndex = raw.lastIndexOf("::s");
      const pathEnd =
        sectionTokenIndex > -1 && (headingTokenIndex === -1 || sectionTokenIndex < headingTokenIndex)
          ? sectionTokenIndex
          : headingTokenIndex > -1
            ? headingTokenIndex
            : depthTokenIndex > -1
              ? depthTokenIndex
              : raw.length;
      markdownPath = raw.slice(0, pathEnd) || markdownPath;
      if (sectionTokenIndex > -1) {
        const sectionStart = sectionTokenIndex + 3;
        const sectionEnd =
          headingTokenIndex > -1 ? headingTokenIndex : depthTokenIndex > -1 ? depthTokenIndex : raw.length;
        const encodedSection = raw.slice(sectionStart, sectionEnd);
        markdownSection = encodedSection ? decodeURIComponent(encodedSection) : null;
      } else {
        markdownSection = null;
      }
    }

    return {
      markdownPath,
      markdownSection,
    };
  }

  function applyMarkdownLayout() {
    if (!markdownPanel || !markdownLayoutToggle) {
      return;
    }
    const resolvedCount = Math.max(1, Math.min(3, Number(markdownColumnCount) || 1));
    markdownPanel.classList.toggle("multi-columns", resolvedCount > 1);
    markdownPanel.style.setProperty("--markdown-column-count", String(resolvedCount));
    markdownLayoutToggle.setAttribute(
      "aria-label",
      resolvedCount > 1
        ? "Switch to single column"
        : `Switch to ${markdownPreferredColumnCount}-column layout`
    );
    columnPaginationRuntime.apply(resolvedCount);
  }

  function resetMarkdownScroll() {
    if (!markdownContent) {
      return;
    }
    markdownContent.scrollTop = 0;
    markdownContent.scrollLeft = 0;
  }

  function resolveAuthoredMarkdownColumns(level) {
    const columns = level?.markdownColumns;
    return columns === 1 || columns === 2 || columns === 3 ? columns : null;
  }

  function toggleMarkdownLayout() {
    markdownColumnCount = markdownColumnCount > 1 ? 1 : markdownPreferredColumnCount;
    applyMarkdownLayout();
  }

  function printMarkdownPanel() {
    if (
      !isMarkdownPanelOpen() ||
      typeof window === "undefined" ||
      typeof window.print !== "function"
    ) {
      return false;
    }
    window.print();
    return true;
  }

  function markdownFilenameFromPath(markdownPath) {
    const leaf = String(markdownPath ?? "").split("/").filter(Boolean).pop();
    return leaf && leaf.endsWith(".md") ? leaf : "reading-copy.md";
  }

  function downloadMarkdownSource(level) {
    const target = resolveMarkdownTarget(level);
    if (!target.markdownPath) {
      return false;
    }
    const doc =
      documentLike && typeof documentLike.createElement === "function"
        ? documentLike
        : null;
    if (!doc) {
      return false;
    }
    const link = doc.createElement("a");
    const downloadName =
      typeof level?.markdownDownloadName === "string" && level.markdownDownloadName.trim()
        ? level.markdownDownloadName.trim()
        : markdownFilenameFromPath(target.markdownPath);
    link.href =
      typeof appendCacheBust === "function"
        ? appendCacheBust(target.markdownPath)
        : target.markdownPath;
    link.download = downloadName;
    if (typeof link.setAttribute === "function") {
      link.setAttribute("download", downloadName);
    }
    if ("rel" in link) {
      link.rel = "noopener";
    }
    const parent = doc.body ?? doc.documentElement ?? markdownPanel ?? null;
    if (parent && typeof parent.appendChild === "function") {
      parent.appendChild(link);
    }
    if (typeof link.click !== "function") {
      link.remove?.();
      return false;
    }
    link.click();
    link.remove?.();
    return true;
  }

  async function showMarkdownPanel(level) {
    const target = resolveMarkdownTarget(level);
    if (!markdownPanel || !target.markdownPath) {
      hideMarkdownPanel();
      return;
    }
    const markdownPath = target.markdownPath;
    const sectionKey = target.markdownSection ?? null;
    const cacheKey = sectionKey ? `${markdownPath}::${sectionKey}` : markdownPath;
    if (activeMarkdownPath === cacheKey && markdownPanel.classList.contains("is-open")) {
      hideMarkdownPanel();
      return;
    }
    const authoredColumnCount = resolveAuthoredMarkdownColumns(level);
    markdownPreferredColumnCount =
      authoredColumnCount && authoredColumnCount > 1 ? authoredColumnCount : 2;
    markdownColumnCount =
      sectionKey || authoredColumnCount === 1 ? 1 : markdownPreferredColumnCount;
    const sectionCache = sectionKey ? markdownSectionCache : markdownCache;
    let html = sectionCache.get(cacheKey);
    if (!html) {
      try {
        const fetchPath =
          typeof appendCacheBust === "function" ? appendCacheBust(markdownPath) : markdownPath;
        const response = await fetch(fetchPath);
        if (!response.ok) {
          throw new Error(`Failed to load markdown: ${markdownPath}`);
        }
        const text = await response.text();
        let markdownSource = text;
        if (sectionKey) {
          const section = extractMarkdownSection(text, sectionKey);
          if (section) {
            const heading = section.title ?? level.name ?? "Notes";
            markdownSource = `## ${heading}\n\n${section.body}`;
          }
        }
        if (markdownRenderer) {
          const { markdown: codeProtectedMarkdown, protectedCodeSegments } =
            protectCodeSegments(markdownSource);
          const { markdown: protectedMarkdown, protectedSegments } =
            protectMathSegments(codeProtectedMarkdown);
          const rendererMarkdown = restoreCodeSegments(protectedMarkdown, protectedCodeSegments);
          html = restoreMathSegments(markdownRenderer.render(rendererMarkdown), protectedSegments);
        } else {
          html = `<pre>${escapeHtml(markdownSource)}</pre>`;
        }
        sectionCache.set(cacheKey, html);
      } catch (error) {
        console.error(error);
        html = `<p>Unable to load markdown.</p>`;
      }
    }
    if (markdownTitle) {
      markdownTitle.textContent = level.markdownShowTitle === false ? "" : (level.name ?? "Notes");
    }
    if (markdownBody) {
      columnPaginationRuntime.clear();
      markdownBody.innerHTML = html;
    }
    markdownPanel.classList.add("is-open");
    markdownPanel.setAttribute("aria-hidden", "false");
    markdownPanel.inert = false;
    const readableTitle = level.name ?? "Notes";
    markdownPanel.setAttribute("aria-label", readableTitle);
    if (markdownContent) {
      markdownContent.setAttribute("aria-label", readableTitle);
      markdownContent.setAttribute("tabindex", "-1");
    }
    if (documentLike && typeof documentLike.title === "string") {
      if (previousDocumentTitle === null) {
        previousDocumentTitle = documentLike.title;
      }
      documentLike.title = `${readableTitle} - architrino`;
    }
    activeMarkdownPath = cacheKey;
    activeMarkdownSourcePath = markdownPath;
    setMarkdownKind(markdownPath);
    decorateMarkdownImages();
    decorateLocalAssetLinks();
    decorateTextbookToc();
    decorateSupportResearch();
    applyMarkdownLayout();
    typesetMarkdownWithRetry(startTypesetRetryCycle());
    void mermaidRuntime.renderDiagrams().then(() => {
      columnPaginationRuntime.scheduleRefresh();
    });
    resetMarkdownScroll();
    if (markdownContent && typeof markdownContent.focus === "function") {
      try {
        markdownContent.focus({ preventScroll: true });
      } catch (_error) {
        markdownContent.focus();
      }
    }
  }

  if (markdownBody && typeof navigateToTarget === "function") {
    markdownBody.addEventListener("click", async (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const toggle = event.target?.closest?.(".toc-branch-toggle");
      if (toggle && isTextbookTocPath(activeMarkdownSourcePath)) {
        event.preventDefault();
        const owningItem = toggle.closest("li[data-toc-level=\"2\"]");
        if (!owningItem) {
          return;
        }
        const level2Items = [
          ...markdownBody.querySelectorAll("li[data-toc-level=\"2\"].toc-collapsible"),
        ];
        const shouldExpand = owningItem.dataset.tocExpanded !== "true";
        level2Items.forEach((item) => {
          const branchList = [...item.children].find(
            (child) => child.tagName === "UL" || child.tagName === "OL"
          );
          const branchToggle = item.querySelector(":scope > .toc-branch-toggle");
          if (!branchList || !branchToggle) {
            return;
          }
          const expanded = shouldExpand && item === owningItem;
          item.classList.toggle("is-expanded", expanded);
          item.classList.toggle("is-collapsed", !expanded);
          item.dataset.tocExpanded = expanded ? "true" : "false";
          branchList.hidden = !expanded;
          branchToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
          branchToggle.textContent = expanded ? "−" : "+";
          const primaryLink = item.querySelector(":scope > a");
          if (primaryLink) {
            branchToggle.setAttribute(
              "aria-label",
              `${expanded ? "Collapse" : "Expand"} ${primaryLink.textContent.trim()}`
            );
          }
        });
        return;
      }
      const link = event.target?.closest?.("a[href]");
      if (!link) {
        return;
      }
      const rawHref = link.getAttribute("href");
      const target = resolveMarkdownLinkTarget(rawHref);
      if (!target) {
        return;
      }
      event.preventDefault();
      await navigateToTarget(target);
    }, eventSignal ? { signal: eventSignal } : undefined);
  }

  return {
    hideMarkdownPanel,
    isMarkdownPanelOpen,
    isActiveLevelMarkdown,
    applyMarkdownLayout,
    toggleMarkdownLayout,
    printMarkdownPanel,
    downloadMarkdownSource,
    showMarkdownPanel,
  };
}
