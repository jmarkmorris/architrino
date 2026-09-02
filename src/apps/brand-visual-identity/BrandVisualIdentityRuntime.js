export const BRAND_TOKEN_ROLES = Object.freeze([
  { token: "--ui-brand-purple", role: "Primary purple" },
  { token: "--ui-brand-purple-deep", role: "Deep foundation" },
  { token: "--ui-brand-purple-accent", role: "Accent purple" },
  { token: "--ui-brand-purple-soft", role: "Soft accent" },
  { token: "--ui-brand-purple-halo", role: "Action halo" },
  { token: "--ui-brand-purple-electric", role: "Electric purple" },
  { token: "--ui-brand-red", role: "Polarity red" },
  { token: "--ui-brand-blue", role: "Polarity blue" },
  { token: "--ui-neutral-050", role: "Neutral white" },
  { token: "--ui-neutral-500", role: "Neutral gray" },
]);

export const SYMMETRIC_BLEND_LEVELS_PER_SIDE = 3;

function normalizeHex(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (/^#[0-9a-f]{6}$/u.test(normalized)) {
    return normalized;
  }
  if (/^#[0-9a-f]{3}$/u.test(normalized)) {
    return `#${[...normalized.slice(1)].map((digit) => `${digit}${digit}`).join("")}`;
  }
  return null;
}

function channelToLinear(channel) {
  const value = channel / 255;
  return value <= 0.04045
    ? value / 12.92
    : ((value + 0.055) / 1.055) ** 2.4;
}

function hexToRgb(color) {
  const hex = normalizeHex(color);
  if (!hex) {
    return null;
  }
  return hex
    .slice(1)
    .match(/.{2}/gu)
    .map((value) => Number.parseInt(value, 16));
}

function rgbToHex(channels) {
  return `#${channels
    .map((channel) => Math.round(channel).toString(16).padStart(2, "0"))
    .join("")}`;
}

function mixHex(center, endpoint, fraction) {
  const centerRgb = hexToRgb(center);
  const endpointRgb = hexToRgb(endpoint);
  if (!centerRgb || !endpointRgb) {
    return null;
  }
  return rgbToHex(centerRgb.map(
    (channel, index) => channel + (endpointRgb[index] - channel) * fraction
  ));
}

export function buildSymmetricBlendSet({
  center = "#6a0dad",
  red = "#dc2626",
  blue = "#2563eb",
  levelsPerSide = SYMMETRIC_BLEND_LEVELS_PER_SIDE,
} = {}) {
  if (!normalizeHex(center) || !normalizeHex(red) || !normalizeHex(blue)
    || !Number.isInteger(levelsPerSide) || levelsPerSide < 1) {
    return [];
  }
  return Array.from({ length: levelsPerSide }, (_, index) => {
    const level = index + 1;
    const fraction = level / levelsPerSide;
    return {
      level,
      fraction,
      redSide: mixHex(center, red, fraction),
      blueSide: mixHex(center, blue, fraction),
    };
  });
}

export function relativeLuminance(color) {
  const hex = normalizeHex(color);
  if (!hex) {
    return null;
  }
  const channels = hex
    .slice(1)
    .match(/.{2}/gu)
    .map((value) => channelToLinear(Number.parseInt(value, 16)));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

export function contrastRatio(foreground, background) {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  if (foregroundLuminance === null || backgroundLuminance === null) {
    return null;
  }
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

export function classifyContrast(ratio) {
  if (!Number.isFinite(ratio)) {
    return "Not measured";
  }
  if (ratio >= 7) {
    return "AAA text";
  }
  if (ratio >= 4.5) {
    return "AA text";
  }
  if (ratio >= 3) {
    return "Large text only";
  }
  return "Decorative only";
}

function readToken(styles, token) {
  return String(styles?.getPropertyValue?.(token) ?? "").trim();
}

function initializeTokenCards(documentLike, windowLike) {
  const styles = windowLike.getComputedStyle(documentLike.documentElement);
  documentLike.querySelectorAll("[data-brand-token]").forEach((card) => {
    const token = card.dataset.brandToken;
    const value = readToken(styles, token);
    card.style.setProperty("--swatch-color", value);
    const output = card.querySelector("[data-token-value]");
    if (output) {
      output.textContent = value.toUpperCase();
    }
    const copy = card.querySelector("[data-copy-token]");
    if (copy) {
      copy.dataset.copyValue = value.toUpperCase();
    }
  });
}

function initializeContrastCards(documentLike, windowLike) {
  const styles = windowLike.getComputedStyle(documentLike.documentElement);
  documentLike.querySelectorAll("[data-contrast-foreground]").forEach((card) => {
    const foreground = readToken(styles, card.dataset.contrastForeground);
    const background = readToken(styles, card.dataset.contrastBackground);
    const ratio = contrastRatio(foreground, background);
    card.style.setProperty("--contrast-foreground", foreground);
    card.style.setProperty("--contrast-background", background);
    const ratioOutput = card.querySelector("[data-contrast-ratio]");
    const gradeOutput = card.querySelector("[data-contrast-grade]");
    if (ratioOutput) {
      ratioOutput.textContent = Number.isFinite(ratio) ? `${ratio.toFixed(2)}:1` : "Not measured";
    }
    if (gradeOutput) {
      gradeOutput.textContent = classifyContrast(ratio);
    }
  });
}

function createBlendSwatch(documentLike, { side, level, hex }) {
  const swatch = documentLike.createElement("div");
  swatch.className = "blend-swatch";
  swatch.style.setProperty("--blend-color", hex);
  swatch.setAttribute("title", `${side} pair ${level} of ${SYMMETRIC_BLEND_LEVELS_PER_SIDE} · ${hex.toUpperCase()}`);

  const color = documentLike.createElement("span");
  color.className = "blend-swatch-color";
  color.setAttribute("aria-hidden", "true");

  const copy = documentLike.createElement("span");
  copy.className = "blend-swatch-copy";
  const label = documentLike.createElement("span");
  label.textContent = `${side} pair ${level}`;
  const value = documentLike.createElement("code");
  value.textContent = hex.toUpperCase();
  copy.append(label, value);
  swatch.append(color, copy);
  return swatch;
}

function initializeSymmetricBlendSet(documentLike, windowLike) {
  const container = documentLike.querySelector("[data-symmetric-blends]");
  if (!container) {
    return;
  }
  const styles = windowLike.getComputedStyle(documentLike.documentElement);
  const pairs = buildSymmetricBlendSet({
    center: readToken(styles, "--ui-brand-purple"),
    red: readToken(styles, "--ui-brand-red"),
    blue: readToken(styles, "--ui-brand-blue"),
  });
  pairs.forEach(({ level, fraction, redSide, blueSide }) => {
    const pair = documentLike.createElement("div");
    pair.className = "blend-pair";

    const distance = documentLike.createElement("span");
    distance.className = "blend-pair-center";
    const pairLabel = documentLike.createElement("strong");
    pairLabel.textContent = `Pair ${level}`;
    const distanceLabel = documentLike.createElement("span");
    distanceLabel.textContent = `${level}/${SYMMETRIC_BLEND_LEVELS_PER_SIDE} distance`;
    distance.append(pairLabel, distanceLabel);

    pair.append(
      createBlendSwatch(documentLike, { side: "Red-side", level, hex: redSide }),
      distance,
      createBlendSwatch(documentLike, { side: "Blue-side", level, hex: blueSide })
    );
    pair.dataset.blendFraction = String(fraction);
    container.append(pair);
  });
}

function initializeCopyActions(documentLike, navigatorLike, windowLike) {
  documentLike.querySelectorAll("[data-copy-token]").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copyValue;
      if (!value || typeof navigatorLike?.clipboard?.writeText !== "function") {
        return;
      }
      await navigatorLike.clipboard.writeText(value);
      const original = button.textContent;
      button.textContent = "Copied";
      windowLike.setTimeout(() => {
        button.textContent = original;
      }, 1200);
    });
  });
}

export function initializeBrandVisualIdentity({
  documentLike = globalThis.document,
  windowLike = globalThis.window,
  navigatorLike = globalThis.navigator,
} = {}) {
  if (!documentLike?.documentElement || typeof windowLike?.getComputedStyle !== "function") {
    return false;
  }
  initializeTokenCards(documentLike, windowLike);
  initializeSymmetricBlendSet(documentLike, windowLike);
  initializeContrastCards(documentLike, windowLike);
  initializeCopyActions(documentLike, navigatorLike, windowLike);
  return true;
}

if (typeof document !== "undefined" && typeof window !== "undefined") {
  initializeBrandVisualIdentity();
}
