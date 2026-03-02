export function normalizeMarkdownKey(text) {
  return String(text)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function normalizeMarkdownPath(path) {
  return String(path)
    .replace(/\\/g, "/")
    .replace(/^\.?\//, "")
    .toLowerCase();
}

export function deriveMarkdownConfig(markdownPolicy) {
  if (!markdownPolicy) {
    return null;
  }
  const derived = {};
  const source = markdownPolicy.source ?? {};
  const sourcePath = typeof source.path === "string" ? source.path : null;
  const sourceType =
    source.type ??
    (sourcePath && sourcePath.toLowerCase().endsWith(".md") ? "file" : "directory");
  if (sourceType === "file" && sourcePath) {
    derived.autoMarkdownPath = sourcePath;
  } else if (sourceType === "directory" && sourcePath) {
    derived.autoMarkdownDirectory = sourcePath;
    derived.autoMarkdownSubdirectories = source.subdirectories === true;
  }

  const layout = markdownPolicy.layout ?? {};
  if (layout.includeExisting !== undefined) {
    derived.autoMarkdownIncludeExistingInLayout = layout.includeExisting === true;
  }
  if (typeof layout.nodeRadius === "number") {
    derived.autoMarkdownNodeRadius = layout.nodeRadius;
  }
  if (typeof layout.ringRadius === "number") {
    derived.autoMarkdownRingRadius = layout.ringRadius;
  }
  if (typeof layout.maxRingCount === "number") {
    derived.autoMarkdownMaxRingCount = layout.maxRingCount;
  }
  if (typeof layout.gridSpacing === "number") {
    derived.autoMarkdownGridSpacing = layout.gridSpacing;
  }
  if (Array.isArray(layout.palette)) {
    derived.autoMarkdownPalette = layout.palette;
  }
  if (typeof layout.paletteName === "string") {
    derived.autoMarkdownPaletteName = layout.paletteName;
  }
  if (typeof layout.color === "string") {
    derived.autoMarkdownColor = layout.color;
  }

  const render = markdownPolicy.render ?? {};
  if (render.defaultMode === "index") {
    derived.autoMarkdownDefaultIndex = true;
  } else if (render.defaultMode === "doc") {
    derived.autoMarkdownDefaultIndex = false;
  }
  if (typeof render.headingLevel === "number") {
    derived.autoMarkdownHeadingLevel = render.headingLevel;
  }
  if (typeof render.sectionDepth === "number") {
    derived.autoMarkdownSectionDepth = render.sectionDepth;
  }
  if (render.columns === 1 || render.columns === 2) {
    derived.autoMarkdownColumns = render.columns;
  }

  if (Array.isArray(markdownPolicy.exclude)) {
    derived.autoMarkdownExcludePaths = markdownPolicy.exclude;
  }

  const overrides = Array.isArray(markdownPolicy.overrides) ? markdownPolicy.overrides : [];
  const indexPaths = [];
  const plainPaths = [];
  const plainSectionPaths = [];
  const perPath = {};
  overrides.forEach((override) => {
    if (!override || typeof override.path !== "string") {
      return;
    }
    const normalized = normalizeMarkdownPath(override.path);
    const record = perPath[normalized] ?? {};
    if (override.mode === "index") {
      indexPaths.push(override.path);
      record.mode = "index";
    } else if (override.mode === "doc") {
      plainPaths.push(override.path);
      record.mode = "doc";
    }
    if (typeof override.headingLevel === "number") {
      record.headingLevel = override.headingLevel;
    }
    if (typeof override.sectionDepth === "number") {
      record.sectionDepth = override.sectionDepth;
      if (override.sectionDepth < 2) {
        plainSectionPaths.push(override.path);
      }
    }
    if (override.columns === 1 || override.columns === 2) {
      record.columns = override.columns;
    }
    perPath[normalized] = record;
  });
  if (indexPaths.length) {
    derived.autoMarkdownIndexPaths = indexPaths;
  }
  if (plainPaths.length) {
    derived.autoMarkdownPlainPaths = plainPaths;
  }
  if (plainSectionPaths.length) {
    derived.autoMarkdownPlainSectionPaths = plainSectionPaths;
  }
  if (Object.keys(perPath).length) {
    derived.autoMarkdownOverrides = perPath;
  }

  return derived;
}

export function parseMarkdownHeading(line) {
  const match = line.match(/^(#{2,3})\s+(.*)$/);
  if (!match) {
    const numbered = line.match(/^\*\*(\d+)\.\s+(.+?)\*\*/);
    if (!numbered) {
      return null;
    }
    return { level: 3, title: numbered[2].trim() };
  }
  const level = match[1].length;
  let title = match[2].trim();
  const boldMatch = title.match(/^\*\*(.+?)\*\*/);
  if (boldMatch) {
    title = boldMatch[1].trim();
  }
  return { level, title };
}

export function extractMarkdownSection(markdown, sectionKey) {
  const target = normalizeMarkdownKey(sectionKey);
  if (!target) {
    return null;
  }
  const lines = markdown.split(/\r?\n/);
  let sectionTitle = null;
  let start = -1;
  let end = lines.length;
  let startLevel = null;
  for (let i = 0; i < lines.length; i += 1) {
    const heading = parseMarkdownHeading(lines[i]);
    if (!heading) {
      continue;
    }
    const headingKey = normalizeMarkdownKey(heading.title);
    if (start === -1) {
      if (headingKey === target) {
        sectionTitle = heading.title;
        start = i + 1;
        startLevel = heading.level;
      }
      continue;
    }
    if (heading.level <= (startLevel ?? heading.level)) {
      end = i;
      break;
    }
  }
  if (start === -1) {
    return null;
  }
  const body = lines.slice(start, end).join("\n").trim();
  return { title: sectionTitle, body };
}
