export function createMarkdownRuntime(deps) {
  const {
    markdownPanel,
    markdownTitle,
    markdownBody,
    markdownLayoutToggle,
    markdownRenderer,
    markdownCache,
    markdownSectionCache,
    extractMarkdownSection,
    appendCacheBust,
    navigateToTarget,
  } = deps;

  let activeMarkdownPath = null;
  let activeMarkdownSourcePath = null;
  let markdownColumnCount = 2;
  let markdownPreferredColumnCount = 2;
  const textbookTocMarkdownPath = "content/generated/markdown/textbook/toc.md";
  const supportResearchMarkdownPath = "content/markdown/aaa/archie/support-architrino-research.md";
  const liberapayWidgetScriptSrc = "https://liberapay.com/Architrino/widgets/button.js";
  // These IDs are runtime-only helper scene identities, not authored scene IDs.
  const runtimeMarkdownPrefix = "runtime:markdown:";
  const runtimeMarkdownDocPrefix = `${runtimeMarkdownPrefix}doc:`;
  const runtimeMarkdownReaderPrefix = `${runtimeMarkdownPrefix}reader:`;
  const runtimeMarkdownIndexPrefix = `${runtimeMarkdownPrefix}index:`;

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
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
        resolvedPath.startsWith("content/generated/markdown/"));
    if (isMarkdownDocument) {
      const section = resolved.searchParams.get("section");
      if (typeof section === "string" && section.trim()) {
        return buildMarkdownReaderTarget(resolvedPath, section.trim());
      }
      return resolvedPath;
    }
    return null;
  }

  function protectMathSegments(markdown) {
    const protectedSegments = [];
    let protectedIndex = 0;
    const makeToken = () => `MATHSEGMENTTOKEN${protectedIndex++}X`;
    const stash = (raw) => {
      const token = makeToken();
      protectedSegments.push({ token, raw });
      return token;
    };

    let output = markdown;
    output = output.replace(/\$\$[\s\S]*?\$\$/g, (match) => stash(match));
    output = output.replace(/\\\[[\s\S]*?\\\]/g, (match) => stash(match));
    output = output.replace(/\\\([\s\S]*?\\\)/g, (match) => stash(match));
    output = output.replace(
      /(^|[^\\$])\$(?!\$)([^$\n]|\\\$)+?\$(?!\$)/g,
      (match, prefix) => {
        const math = match.slice(prefix.length);
        return `${prefix}${stash(math)}`;
      }
    );

    return { markdown: output, protectedSegments };
  }

  function restoreMathSegments(html, protectedSegments) {
    if (!protectedSegments?.length) {
      return html;
    }
    let restored = html;
    protectedSegments.forEach(({ token, raw }) => {
      restored = restored.split(token).join(raw);
    });
    return restored;
  }

  function isTextbookTocPath(markdownPath) {
    return normalizeRepoPath(markdownPath) === textbookTocMarkdownPath;
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

    const level1Items = [...topLevelList.children].filter(
      (child) => child.tagName === "LI"
    );
    const level2Items = [];

    level1Items.forEach((level1Item) => {
      level1Item.dataset.tocLevel = "1";
      const level2List = findDirectChildList(level1Item);
      if (!level2List) {
        return;
      }
      level2List.dataset.tocLevel = "2";
      [...level2List.children].forEach((level2Item) => {
        if (level2Item.tagName !== "LI") {
          return;
        }
        level2Item.dataset.tocLevel = "2";
        const level3List = findDirectChildList(level2Item);
        if (!level3List) {
          return;
        }
        level3List.hidden = true;
        level3List.dataset.tocLevel = "3";
        level2Item.classList.add("toc-collapsible", "is-collapsed");
        level2Item.dataset.tocExpanded = "false";
        const primaryLink = [...level2Item.children].find(
          (child) => child.tagName === "A"
        );
        if (!primaryLink) {
          return;
        }
        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "toc-branch-toggle";
        toggle.setAttribute("aria-label", `Expand ${primaryLink.textContent.trim()}`);
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "+";
        primaryLink.insertAdjacentElement("beforebegin", toggle);
        level2Items.push(level2Item);
      });
    });

    const setExpandedState = (listItem, expanded) => {
      const branchList = findDirectChildList(listItem);
      const toggle = listItem.querySelector(":scope > .toc-branch-toggle");
      if (!branchList || !toggle) {
        return;
      }
      listItem.classList.toggle("is-expanded", expanded);
      listItem.classList.toggle("is-collapsed", !expanded);
      listItem.dataset.tocExpanded = expanded ? "true" : "false";
      branchList.hidden = !expanded;
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      toggle.textContent = expanded ? "−" : "+";
      const primaryLink = listItem.querySelector(":scope > a");
      if (primaryLink) {
        toggle.setAttribute(
          "aria-label",
          `${expanded ? "Collapse" : "Expand"} ${primaryLink.textContent.trim()}`
        );
      }
    };

    level2Items.forEach((item) => setExpandedState(item, false));
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

  function typesetMarkdown() {
    if (!markdownBody) {
      return;
    }
    const katexRender = window.renderMathInElement;
    if (typeof katexRender !== "function") {
      return;
    }
    try {
      katexRender(markdownBody, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
        ],
        throwOnError: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function hideMarkdownPanel() {
    if (!markdownPanel) {
      return;
    }
    markdownPanel.classList.remove("is-open");
    markdownPanel.setAttribute("aria-hidden", "true");
    markdownPanel.inert = true;
    if (markdownTitle) {
      markdownTitle.textContent = "";
    }
    if (markdownBody) {
      markdownBody.innerHTML = "";
    }
    activeMarkdownPath = null;
    activeMarkdownSourcePath = null;
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
          const { markdown: protectedMarkdown, protectedSegments } =
            protectMathSegments(markdownSource);
          html = restoreMathSegments(markdownRenderer.render(protectedMarkdown), protectedSegments);
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
      markdownBody.innerHTML = html;
    }
    markdownPanel.classList.add("is-open");
    markdownPanel.setAttribute("aria-hidden", "false");
    markdownPanel.inert = false;
    activeMarkdownPath = cacheKey;
    activeMarkdownSourcePath = markdownPath;
    setMarkdownKind(markdownPath);
    applyMarkdownLayout();
    typesetMarkdown();
    decorateTextbookToc();
    decorateSupportResearch();
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
    });
  }

  return {
    hideMarkdownPanel,
    isMarkdownPanelOpen,
    isActiveLevelMarkdown,
    applyMarkdownLayout,
    toggleMarkdownLayout,
    printMarkdownPanel,
    showMarkdownPanel,
  };
}
