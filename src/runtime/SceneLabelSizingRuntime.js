const defaultClamp = (value, min, max) => Math.min(max, Math.max(min, value));

function normalizeLabelText(text) {
  return String(text ?? "").replace(/\s+/g, " ").trim();
}

function resolveTextWidthFallback(text, fontSize, fontWeight = 600) {
  const normalized = normalizeLabelText(text);
  if (!normalized) {
    return 0;
  }
  const weightFactor = Number(fontWeight) >= 600 ? 0.58 : 0.55;
  return Math.max(fontSize * 0.55, normalized.length * fontSize * weightFactor);
}

function resolveMeasuredTextWidth(text, options = {}) {
  const normalized = normalizeLabelText(text);
  if (!normalized) {
    return 0;
  }
  const measured = options.measureTextWidth?.({
    text: normalized,
    fontSize: options.fontSize,
    fontWeight: options.fontWeight,
  });
  return Number.isFinite(measured) && measured > 0
    ? measured
    : resolveTextWidthFallback(normalized, options.fontSize, options.fontWeight);
}

export function estimateLabelLineCount(text, fontSize, maxWidth, options = {}) {
  const normalized = normalizeLabelText(text);
  if (!normalized) {
    return 0;
  }
  if (
    !Number.isFinite(fontSize) ||
    fontSize <= 0 ||
    !Number.isFinite(maxWidth) ||
    maxWidth <= 0
  ) {
    return 1;
  }

  const fontWeight = options.fontWeight ?? 600;
  const tokens = normalized.split(/\s+/);
  const spaceWidth = resolveMeasuredTextWidth(" ", {
    ...options,
    fontSize,
    fontWeight,
  }) || fontSize * 0.32;
  let lines = 1;
  let currentWidth = 0;

  tokens.forEach((token) => {
    const tokenWidth = resolveMeasuredTextWidth(token, {
      ...options,
      fontSize,
      fontWeight,
    });
    if (tokenWidth > maxWidth) {
      if (currentWidth > 0) {
        lines += 1;
        currentWidth = 0;
      }
      lines += Math.max(0, Math.ceil(tokenWidth / maxWidth) - 1);
      currentWidth = tokenWidth % maxWidth || maxWidth;
      return;
    }
    const candidateWidth =
      currentWidth > 0 ? currentWidth + spaceWidth + tokenWidth : tokenWidth;
    if (candidateWidth <= maxWidth || currentWidth <= 0) {
      currentWidth = candidateWidth;
      return;
    }
    lines += 1;
    currentWidth = tokenWidth;
  });
  return lines;
}

export function getLabelBadgeHeightMultiplier(nodeData = {}) {
  if (
    typeof nodeData.labelBadgeImage === "string" &&
    nodeData.labelBadgeImage.trim()
  ) {
    return 1;
  }
  const badgeToken =
    typeof nodeData.labelBadge === "string"
      ? nodeData.labelBadge.trim().toLowerCase()
      : "";
  if (!badgeToken) {
    return 0;
  }
  if (
    badgeToken === "doc" ||
    badgeToken === "doc-svg" ||
    badgeToken === "md" ||
    badgeToken === "markdown" ||
    badgeToken === "pdf"
  ) {
    return 2.2;
  }
  if (
    (badgeToken === "diagram" || badgeToken === "branch") &&
    typeof nodeData.childScene === "string" &&
    nodeData.childScene
  ) {
    return 1.9;
  }
  return 0;
}

export function resolveLabelTitleWeight(titleSize, titleLineCount) {
  if (titleSize <= 10.75 || titleLineCount >= 4) {
    return 400;
  }
  if (titleSize <= 12.5 || titleLineCount >= 3) {
    return 500;
  }
  return 600;
}

export function resolveNodeLabelText(nodeData = {}) {
  const labelName =
    typeof nodeData.labelTitle === "string" && nodeData.labelTitle.trim()
      ? nodeData.labelTitle.trim()
      : typeof nodeData.shortName === "string" && nodeData.shortName.trim()
        ? nodeData.shortName.trim()
        : typeof nodeData.name === "string"
          ? nodeData.name
          : "";
  const labelSubtitle =
    typeof nodeData.labelSubtitle === "string" && nodeData.labelSubtitle.trim()
      ? nodeData.labelSubtitle.trim()
      : "";
  const labelDates =
    typeof nodeData.labelDates === "string" && nodeData.labelDates.trim()
      ? nodeData.labelDates.trim()
      : "";
  return { labelName, labelSubtitle, labelDates };
}

function resolveChapterTitleSizeCap(diameter, clamp) {
  return clamp(diameter * 0.078, 12, 15.5);
}

export function resolveWrappedLabelFit(options = {}) {
  const clamp = options.clamp ?? defaultClamp;
  const nodeData = options.nodeData ?? {};
  const diameter = options.diameter;
  const maxWidth = options.maxWidth;
  const { labelName, labelSubtitle, labelDates } = resolveNodeLabelText(nodeData);
  const badgeHeightMultiplier = getLabelBadgeHeightMultiplier(nodeData);
  const hasLabelBadge = badgeHeightMultiplier > 0;
  const hasChapterMarker =
    typeof nodeData.textbookChapterLabel === "string" &&
    nodeData.textbookChapterLabel.trim().length > 0;
  const chapterSize = hasChapterMarker ? clamp(diameter * 0.055, 8.5, 12.5) : 0;
  const tokens = labelName
    .split(/[\s-]+/)
    .map((token) => token.replace(/[^A-Za-z0-9]/g, ""))
    .filter(Boolean);
  const longestToken = tokens.reduce((max, token) => {
    return Math.max(max, token.length);
  }, 1);
  const sizeByDiameter = diameter * (hasChapterMarker ? 0.12 : 0.15);
  const sizeByToken = maxWidth / (longestToken * 0.6);
  const maxTitleSize = hasChapterMarker
    ? resolveChapterTitleSizeCap(diameter, clamp)
    : 20;
  let titleSize = clamp(
    Math.min(sizeByDiameter, sizeByToken + 0.25, maxTitleSize),
    8.5,
    maxTitleSize
  );
  let titleLineCount = 1;
  let lineHeight = 1.14;
  let badgeSize = 14;

  for (let i = 0; i < 8; i += 1) {
    titleLineCount = Math.max(
      1,
      estimateLabelLineCount(labelName, titleSize, maxWidth, {
        fontWeight: resolveLabelTitleWeight(titleSize, titleLineCount),
        measureTextWidth: options.measureTextWidth,
      })
    );
    lineHeight = titleSize <= 10.5 ? 1.18 : titleSize <= 12.5 ? 1.15 : 1.12;
    const subtitleSizeEstimate =
      titleSize <= 11 ? titleSize * 0.92 : titleSize * 0.96;
    const datesSizeEstimate = titleSize <= 11 ? titleSize * 0.92 : titleSize * 0.96;
    badgeSize = clamp(titleSize * (titleLineCount >= 4 ? 0.82 : 0.94), 9.5, 17);
    const titleHeight = titleLineCount * titleSize * lineHeight;
    const subtitleLineCount = labelSubtitle
      ? Math.max(
          1,
          estimateLabelLineCount(labelSubtitle, subtitleSizeEstimate, maxWidth, {
            fontWeight: 500,
            measureTextWidth: options.measureTextWidth,
          })
        )
      : 0;
    const datesLineCount = labelDates
      ? Math.max(
          1,
          estimateLabelLineCount(labelDates, datesSizeEstimate, maxWidth, {
            fontWeight: 500,
            measureTextWidth: options.measureTextWidth,
          })
        )
      : 0;
    const detailHeight =
      subtitleLineCount * subtitleSizeEstimate * 1.08 +
      datesLineCount * datesSizeEstimate * 1.08 +
      (hasLabelBadge ? badgeSize * badgeHeightMultiplier + 2 : 0);
    const widthRatio = Math.min(0.98, Math.max(0, maxWidth / diameter));
    const circleHeightBudget =
      diameter * Math.sqrt(Math.max(0.01, 1 - widthRatio * widthRatio));
    const centeredBudget = Math.min(diameter * 0.52, circleHeightBudget * 0.92);
    const chapterBudget = hasChapterMarker
      ? Math.max(
          diameter * 0.28,
          diameter * 0.7 - chapterSize - clamp(diameter * 0.045, 6, 10)
        )
      : Infinity;
    const verticalBudget = Math.min(centeredBudget, chapterBudget);
    const totalHeight = titleHeight + detailHeight;
    if (!Number.isFinite(totalHeight) || totalHeight <= verticalBudget) {
      break;
    }
    titleSize = clamp(titleSize * (verticalBudget / totalHeight), 8.5, titleSize);
  }

  return {
    labelName,
    maxWidth,
    titleSize,
    titleLineCount,
    chapterSize,
  };
}

export function resolveSharedLabelTypography(labelFits, options = {}) {
  const clamp = options.clamp ?? defaultClamp;
  if (!Array.isArray(labelFits) || labelFits.length === 0) {
    return null;
  }

  const sharedTitleSize = Math.min(...labelFits.map((fit) => fit.titleSize));
  const sharedMaxLineCount = Math.max(
    1,
    ...labelFits.map((fit) =>
      estimateLabelLineCount(fit.labelName, sharedTitleSize, fit.maxWidth, {
        fontWeight: resolveLabelTitleWeight(sharedTitleSize, fit.titleLineCount),
        measureTextWidth: options.measureTextWidth,
      })
    )
  );
  const sharedTitleWeight = resolveLabelTitleWeight(
    sharedTitleSize,
    sharedMaxLineCount
  );
  const lineHeight =
    sharedTitleSize <= 10.5 ? 1.18 : sharedTitleSize <= 12.5 ? 1.15 : 1.12;
  const tagSize = clamp(sharedTitleSize * 0.58, 8, 9);
  const subtitleSize =
    sharedTitleSize <= 11 ? sharedTitleSize * 0.92 : sharedTitleSize * 0.96;
  const datesSize =
    sharedTitleSize <= 11 ? sharedTitleSize * 0.92 : sharedTitleSize * 0.96;
  const badgeSize = clamp(
    sharedTitleSize * (sharedMaxLineCount >= 4 ? 0.82 : 0.94),
    9.5,
    17
  );
  const letterSpacing = 0;

  return {
    titleSize: sharedTitleSize,
    titleWeight: sharedTitleWeight,
    lineHeight,
    letterSpacing,
    tagSize,
    subtitleSize,
    datesSize,
    badgeSize,
    key: [
      sharedTitleSize.toFixed(2),
      sharedTitleWeight,
      lineHeight.toFixed(2),
      letterSpacing.toFixed(2),
      tagSize.toFixed(2),
      subtitleSize.toFixed(2),
      datesSize.toFixed(2),
      badgeSize.toFixed(2),
    ].join("|"),
  };
}
