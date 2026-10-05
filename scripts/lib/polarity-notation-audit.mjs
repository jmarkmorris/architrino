import { mathSpans } from "./markdown-math-spans.mjs";

// Mask only the repeated-variable ratio in a fractional-change expression.
// Other notation in the same span/line must still reach the polarity checker.
export function maskFractionalChangeRatios(text) {
  let result = text;
  for (const span of mathSpans(text)) {
    if (/\\(?:text|textrm|textbf|mathrm|operatorname)\b/.test(span.body)) continue;
    const body = span.body.replace(/\\Delta\s+([EP])\s*\/\s*\1\b/g,
      value => value.replace(/[^\n\r]/g, " "));
    result = result.slice(0, span.bodyStart) + body + result.slice(span.bodyEnd);
  }
  return result;
}
