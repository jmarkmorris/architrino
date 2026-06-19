(function () {
  if (typeof window === "undefined") {
    return;
  }

  const markdownParser = window.markdownit({
    html: true,
    breaks: true,
    linkify: false,
    typographer: true,
  });

  const snippetThemes = {
    architrinoPurple: {
      text: "#ede9fe",
      heading: "#ffffff",
      muted: "#ddd6fe",
      link: "#bfdbfe",
      codeBackground: "rgba(15, 23, 42, 0.88)",
      codeText: "#f8fafc",
    },
    light: {
      text: "#475569",
      heading: "#101828",
      muted: "#64748b",
      link: "#1d4ed8",
      codeBackground: "#0f172a",
      codeText: "#e2e8f0",
    },
    warm: {
      text: "#4f3f2f",
      heading: "#24180f",
      muted: "#6b5b45",
      link: "#6d28d9",
      codeBackground: "#2b2118",
      codeText: "#fff7ed",
    },
    dark: {
      text: "#cbd5e1",
      heading: "#f8fafc",
      muted: "#94a3b8",
      link: "#93c5fd",
      codeBackground: "#020617",
      codeText: "#e2e8f0",
    },
  };

  function parseRenderPayload(rawPayload) {
    if (typeof rawPayload === "string") {
      try {
        return JSON.parse(rawPayload);
      } catch {
        return null;
      }
    }
    return rawPayload;
  }

  function hydrateTheme(themeName) {
    const theme = snippetThemes[themeName] || snippetThemes.architrinoPurple;
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty("--snippet-text", theme.text);
    rootStyle.setProperty("--snippet-heading", theme.heading);
    rootStyle.setProperty("--snippet-muted", theme.muted);
    rootStyle.setProperty("--snippet-link", theme.link);
    rootStyle.setProperty("--snippet-code-background", theme.codeBackground);
    rootStyle.setProperty("--snippet-code-text", theme.codeText);
  }

  function renderSnippet(rawPayload) {
    const payload = parseRenderPayload(rawPayload);
    const root = document.getElementById("snippet-root");
    if (!payload || !root) {
      return;
    }

    hydrateTheme(payload.theme);
    const markdownText = payload.markdownText || "";
    if (window.ReaderMath && typeof window.ReaderMath.renderMarkdownFragment === "function") {
      root.replaceChildren(window.ReaderMath.renderMarkdownFragment(markdownParser, markdownText));
      return;
    }

    root.innerHTML = markdownParser.render(markdownText);
  }

  window.SearchSnippetBridge = {
    renderSnippet,
  };
})();
