#!/usr/bin/env node
// append-entry.mjs — append one Claude entry to a shared conversation file.
// Helper of the claude-codex-collaborate skill. It writes one file and sends nothing.
//
// Usage:
//   node append-entry.mjs --chat <conversation.md> --body <body-file> --expect-last "<last entry heading>"
//
// The entry is a blank line, the heading "## Claude — <UTC timestamp>", a blank line, and then the bytes of
// the body file unchanged, with a final newline added only if the body does not end with one.
//
// An entry heading is a line outside a code fence of the form "## Codex — …", "## Claude — …" or "## Op — …".
// Other level-two headings and anything inside a code fence are ordinary text and are not entries.
// The append is refused unless the conversation's last entry heading equals --expect-last exactly, so an
// entry is never added after one the caller has not read. This check is optimistic: it relies on the two
// coordinators taking turns. It is not a lock, and it cannot stop another writer that appends between this
// program's read and its write.
// A body is refused if it is empty, if it contains a line outside a code fence that has the form of an entry
// heading, or if it leaves a code fence open, since either would mislead the next reader of the file.
// The append is also refused if the conversation itself ends inside an open code fence.
// Exit codes: 0 appended; 2 usage, unreadable input or refused body; 3 last entry heading differs;
// 4 write not verified; 5 conversation ends inside an open code fence.
import fs from "node:fs";

const SPEAKER = "Claude";
const ENTRY = /^## (Codex|Claude|Op) — \S/;
const FENCE = /^ {0,3}(`{3,}|~{3,})(.*)$/;

const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 && i + 1 < args.length ? args[i + 1] : undefined; };
const chat = opt("--chat"), bodyFile = opt("--body"), expected = opt("--expect-last");
if (!chat || !bodyFile || expected === undefined) {
  console.error('usage: node append-entry.mjs --chat <conversation.md> --body <body-file> --expect-last "<last entry heading>"');
  process.exit(2);
}

// Returns the entry headings found outside code fences, and whether the text ends inside an open fence.
// A fence opens on a line of up to three spaces followed by three or more backticks or three or more tildes
// (a backtick fence's info string may not itself contain a backtick). It closes only on a line of up to three
// spaces, the same character, at least as many of them, and nothing after but white space. Lines inside a
// fence are content, whatever they look like. This follows the usual Markdown rule and is not a full parser.
function scan(text) {
  const entries = []; let open = null;
  for (const line of text.split("\n")) {
    const m = FENCE.exec(line);
    if (open) {
      if (m && m[1][0] === open.ch && m[1].length >= open.len && m[2].trim() === "") open = null;
      continue;
    }
    if (m && !(m[1][0] === "`" && m[2].includes("`"))) { open = { ch: m[1][0], len: m[1].length }; continue; }
    if (ENTRY.test(line)) entries.push(line);
  }
  return { entries, openFence: open !== null };
}

let current, body;
try { current = fs.readFileSync(chat); body = fs.readFileSync(bodyFile); }
catch (e) { console.error(`cannot read input: ${e.message}`); process.exit(2); }

const bodyText = body.toString("utf8");
if (bodyText.trim() === "") { console.error("the body file is empty"); process.exit(2); }
const bodyScan = scan(bodyText);
if (bodyScan.entries.length) { console.error(`the body contains a line with the form of an entry heading: ${bodyScan.entries[0].slice(0, 60)}`); process.exit(2); }
if (bodyScan.openFence) { console.error("the body leaves a code fence open"); process.exit(2); }

const chatText = current.toString("utf8");
const chatScan = scan(chatText);
if (chatScan.openFence) {
  console.error("the conversation ends inside an open code fence; an appended entry would be read as code. Nothing was written");
  process.exit(5);
}
const last = chatScan.entries.length ? chatScan.entries[chatScan.entries.length - 1] : "";
if (last !== expected) {
  console.error("last entry heading differs from --expect-last; nothing was written");
  console.error(`  found:    ${last || "(no entry heading)"}`);
  console.error(`  expected: ${expected}`);
  process.exit(3);
}

const stamp = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const heading = `## ${SPEAKER} — ${stamp}`;
const lead = current.length === 0 || current[current.length - 1] === 0x0a ? "\n" : "\n\n";
const tail = body[body.length - 1] === 0x0a ? "" : "\n";
const entry = Buffer.concat([Buffer.from(`${lead}${heading}\n\n`, "utf8"), body, Buffer.from(tail, "utf8")]);

const before = fs.statSync(chat).size;
const fd = fs.openSync(chat, "a");
let written;
try { written = fs.writeSync(fd, entry, 0, entry.length); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
const after = fs.statSync(chat).size;
if (written !== entry.length || after - before !== entry.length) {
  console.error(`write not verified: entry ${entry.length} bytes, written ${written}, size change ${after - before}`);
  process.exit(4);
}
console.log(`appended ${entry.length} bytes`);
console.log(`heading: ${heading}`);
