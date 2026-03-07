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
  } = deps;

  let activeMarkdownPath = null;
  let markdownTwoColumns = true;
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
      const headingTokenIndex = raw.lastIndexOf("::h");
      markdownPath = headingTokenIndex > -1 ? raw.slice(0, headingTokenIndex) : raw;
      markdownSection = null;
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
    markdownPanel.classList.toggle("two-columns", markdownTwoColumns);
    markdownLayoutToggle.setAttribute(
      "aria-label",
      markdownTwoColumns ? "Switch to single column" : "Switch to two columns"
    );
  }

  function toggleMarkdownLayout() {
    markdownTwoColumns = !markdownTwoColumns;
    applyMarkdownLayout();
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
    if (sectionKey) {
      markdownTwoColumns = false;
    } else if (level.markdownColumns === 1) {
      markdownTwoColumns = false;
    } else if (level.markdownColumns === 2) {
      markdownTwoColumns = true;
    } else {
      markdownTwoColumns = true;
    }
    const sectionCache = sectionKey ? markdownSectionCache : markdownCache;
    let html = sectionCache.get(cacheKey);
    if (!html) {
      try {
        const response = await fetch(markdownPath);
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
    applyMarkdownLayout();
    typesetMarkdown();
  }

  return {
    hideMarkdownPanel,
    isMarkdownPanelOpen,
    isActiveLevelMarkdown,
    applyMarkdownLayout,
    toggleMarkdownLayout,
    showMarkdownPanel,
  };
}
