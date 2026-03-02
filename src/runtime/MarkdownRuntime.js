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
    if (!markdownPanel || !level?.markdownPath) {
      hideMarkdownPanel();
      return;
    }
    const markdownPath = level.markdownPath;
    const sectionKey = level.markdownSection ?? null;
    const cacheKey = sectionKey ? `${markdownPath}::${sectionKey}` : markdownPath;
    if (activeMarkdownPath === cacheKey && markdownPanel.classList.contains("is-open")) {
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
      markdownTitle.textContent = level.name ?? "Notes";
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
    applyMarkdownLayout,
    toggleMarkdownLayout,
    showMarkdownPanel,
  };
}
