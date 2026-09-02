const STATUS_TONE = Object.freeze({
  "authoritative-solver-output": "good",
  "app-facing-projection": "projection",
  "display-only-visualization": "display",
  "missing-error-budget": "warn",
  "exceeded-error-budget": "bad",
  "fail-closed-value": "bad",
});

export function queryRequiredBorgElement(documentLike, selector) {
  const element = documentLike?.querySelector?.(selector);
  if (!element) {
    throw new Error(`Borg app missing required element ${selector}`);
  }
  return element;
}

export function formatBorgFieldValue(value, formatNumber) {
  if (typeof value === "number") {
    return formatNumber(value);
  }
  if (value == null) {
    return "null";
  }
  return String(value);
}

export function formatBorgDiagnosticPercent(value) {
  return Number.isFinite(value)
    ? `${(Number(value) * 100).toFixed(2)}%`
    : "not-measured";
}

export function formatBorgDiagnosticPercentagePoints(value) {
  return Number.isFinite(value)
    ? `${(Number(value) * 100).toFixed(2)} percentage points`
    : "not-measured";
}

export function isBorgEditableTarget(target) {
  const tagName = target?.tagName;
  if (target?.isContentEditable || tagName === "TEXTAREA" || tagName === "SELECT") {
    return true;
  }
  if (tagName !== "INPUT") {
    return false;
  }
  return ["email", "number", "password", "search", "tel", "text", "url"].includes(target.type);
}

export function setBorgStatusTone(element, status) {
  element.dataset.tone = STATUS_TONE[status] ?? "display";
}

export function appendBorgRadioChoice(documentLike, container, {
  name,
  value,
  label,
}) {
  const choice = documentLike.createElement("label");
  choice.className = "borg-radio-choice";
  const input = documentLike.createElement("input");
  input.type = "radio";
  input.name = name;
  input.value = value;
  const text = documentLike.createElement("span");
  text.textContent = label;
  choice.append(input, text);
  container.append(choice);
  return input;
}

export function getBorgRadioGroupValue(group) {
  return [...group.querySelectorAll('input[type="radio"]')]
    .find((input) => input.checked)?.value ?? "";
}

export function setBorgRadioGroupValue(group, value) {
  const requestedValue = String(value ?? "");
  group.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.checked = input.value === requestedValue;
  });
}
