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

// A local event-gap explanation may use q_E as an angle. Require the
// immediately preceding event description and a trigonometric occurrence;
// recognize only that occurrence and its next-paragraph angular bound.
// This is not a file-wide declaration of q_E's meaning.
function maskEventPhase(text) {
  const contextText = text.replace(/^\s*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\1\s*$/gm, blank)
    .replace(/`[^`]*`/g, blank);
  const paragraphs = [...contextText.matchAll(/[^\n]+(?:\n(?![ \t]*\n)[^\n]+)*/g)];
  const charge = /\b(?:charge|charges|inventory|inventories|positrino|electrino)\b/i;
  let result = text;
  const hide = (paragraph, span, match) => {
    const start = paragraph.index + span.bodyStart + match.index;
    result = result.slice(0, start) + blank(match[0]) + result.slice(start + match[0].length);
  };
  for (let i = 1; i < paragraphs.length; i++) {
    const previous = paragraphs[i - 1][0];
    const paragraph = paragraphs[i];
    if (!/\b(?:at|after)\s+(?:the\s+)?(?:reached\s+)?event\b/i.test(previous) ||
        !/\b(?:distance\s+)?gap\b/i.test(previous) || charge.test(previous + paragraph[0])) continue;
    let angular = false;
    for (const span of mathSpans(paragraph[0])) {
      if (/\\(?:text|textrm|textbf|mathrm|operatorname)\b/.test(span.body)) continue;
      for (const trig of span.body.matchAll(/\\(?:sin|cos)\s*\([^()]*\)/g)) {
        for (const token of trig[0].matchAll(/\bq_(?:E\b|\{E\})/g)) {
          hide(paragraph, span, {0: token[0], index: trig.index + token.index});
          angular = true;
        }
      }
    }
    const next = paragraphs[i + 1];
    if (!angular || !next || charge.test(next[0]) ||
        !/\b(?:sine|cosine)\s+(?:argument|lower\s+bound)\b/i.test(next[0])) continue;
    for (const span of mathSpans(next[0])) {
      if (/\\(?:text|textrm|textbf|mathrm|operatorname)\b/.test(span.body)) continue;
      for (const token of span.body.matchAll(/\bq_(?:E\b|\{E\})(?=\s*(?:<|>|\\leq?\b|\\geq?\b)\s*\d)/g)) hide(next, span, token);
    }
  }
  return result;
}

// Classify only the matched notation, never exempt a file or an entire line.
// These are lexical contexts, not a claim to infer the meaning of arbitrary TeX.
export function maskNonPolarityNotation(text) {
  let result = maskEventPhase(maskFractionalChangeRatios(text));
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
    // H at a shifted history anchor uses P as a period, not a polarity.
    // Require local history/anchor context and mask only the numeric-period
    // token in that subscript; real inventories on the same line stay visible.
    if (/\b(?:history|histories|anchors?|recurrence)\b/i.test(context)) {
      for (const span of mathSpans(context)) {
        if (/\\(?:text|textrm|textbf|mathrm|operatorname)\b/.test(span.body)) continue;
        for (const match of span.body.matchAll(/H_\{[A-Za-z]\s*\+\s*(\d+P)\}/g)) {
          const start = paragraph.index + span.bodyStart + match.index + match[0].indexOf(match[1]);
          result = result.slice(0, start) + blank(match[1]) + result.slice(start + match[1].length);
        }
      }
    }
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
