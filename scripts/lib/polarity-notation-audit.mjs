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

const blank = value => value.replace(/[^\n\r]/g, " ");

// Classify only the matched notation, never exempt a file or an entire line.
// These are lexical contexts, not a claim to infer the meaning of arbitrary TeX.
export function maskNonPolarityNotation(text) {
  let result = maskFractionalChangeRatios(text);
  // E/E+M names the two response laws. A bare E/E or E/P stays ambiguous.
  result = result.replace(/\bE[ \t]*\/[ \t]*E[ \t]*\+[ \t]*M\b/g, blank);
  // Explicit scalar enclosure prose distinguishes this use from inventories.
  result = result.replace(/\bscalar[ \t]+(E[ \t]*\/[ \t]*P)(?=[ \t]+enclosures\b)/g,
    (value, ratio) => value.slice(0, -ratio.length) + blank(ratio));

  // q_E is also used for the E-law gain. Require a row-sum description and
  // the paired E+M coefficient in this paragraph, plus a numeric inequality.
  // Charge/inventory prose keeps the original finding even in mixed contexts.
  for (const paragraph of result.matchAll(/[^\n]+(?:\n(?![ \t]*\n)[^\n]+)*/g)) {
    const context = paragraph[0].replace(/`[^`]*`/g, blank);
    if (!/\brow[- ]sum\b/i.test(context) ||
        /\b(?:charge|charges|inventory|inventories|positrino|electrino)\b/i.test(context)) continue;
    const spans = mathSpans(context).filter(span =>
      !/\\(?:text|textrm|textbf|mathrm|operatorname)\b/.test(span.body));
    if (!spans.some(span => /\bq_\{E\s*\+\s*M\}/.test(span.body))) continue;
    for (const span of spans) {
      for (const match of span.body.matchAll(/\bq_(?:E\b|\{E\})(?=\s*(?:<|>|\\leq?\b|\\geq?\b)\s*\d)/g)) {
        const start = paragraph.index + span.bodyStart + match.index;
        result = result.slice(0, start) + blank(match[0]) + result.slice(start + match[0].length);
      }
    }
  }
  return result;
}
