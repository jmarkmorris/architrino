// Lists every field of NativeCoupledEvolutionRequest in a header and the
// bridge's disposition for it: translated, checked, or refused unless at its
// default. A field with no disposition fails. Known case first: a field
// name absent from the bridge must be reported. c_f = 1.
// Usage: node field-dispositions.mjs <CoupledEvolution.hpp> <ValidatedOrdinaryBridge.cpp>
import fs from "node:fs";
const [header, bridge] = process.argv.slice(2).map((p) => fs.readFileSync(p, "utf8"));
const body = header.slice(header.indexOf("struct NativeCoupledEvolutionRequest {"));
const struct = body.slice(0, body.indexOf("\n};"));
const fields = [];
let statement = "";
for (const raw of struct.split("\n").slice(1)) {
  const line = raw.replace(/\/\/.*$/, "").trim();
  if (!line) continue;
  statement += " " + line;
  if (!line.endsWith(";")) continue;
  const m = statement.match(/([A-Za-z_][A-Za-z0-9_]*)\s*(=[^;]*)?;\s*$/);
  if (m) fields.push(m[1]);
  statement = "";
}
const TRANSLATED = new Set(["run_id", "paths", "start_time", "end_time",
  "initial_step", "minimum_step", "field_speed", "coupling",
  "position_increment_budget", "velocity_increment_budget",
  "validated_population_evidence", "thread_count",
  "diagnostic_maximum_accepted_steps", "cancellation_requested",
  "accepted_step_callback", "integration_method", "validated",
  "memory_budget_bytes"]);
const CHECKED = new Set(["maximum_step", "initial_accepted_step_count",
  "initial_rejected_step_count", "equation_selection"]);
function disposition(field, text) {
  if (text.includes(`ARCHITRINO_ORDINARY_ONLY(${field})`)) return "refused unless default";
  if (TRANSLATED.has(field) && text.includes(`request.${field}`)) return "translated";
  if (CHECKED.has(field) && text.includes(`request.${field}`)) return "checked";
  if (new RegExp(`request\\.${field}\\b[^;]*(empty|has_value|!=)|if \\(request\\.${field}\\)`).test(text)
      && text.includes(`return "${field}"`)) return "refused unless default";
  return null;
}
// Known case: a field that is not in the bridge text has no disposition.
const knownOk = disposition("root_tolerance", bridge.replaceAll("root_tolerance", "x")) === null
  && disposition("root_tolerance", bridge) === "refused unless default";
console.log(`${knownOk ? "PASS" : "FAIL"}  known: a field absent from the bridge has no disposition`);
if (!knownOk) process.exit(2);
const table = fields.map((f) => [f, disposition(f, bridge)]);
for (const [f, d] of table) console.log(`| \`${f}\` | ${d ?? "MISSING"} |`);
const missing = table.filter(([, d]) => d === null).map(([f]) => f);
const count = (d) => table.filter(([, x]) => x === d).length;
console.log(`${missing.length ? "FAIL" : "PASS"}  ${fields.length} fields: ` +
  `${count("translated")} translated, ${count("checked")} checked, ` +
  `${count("refused unless default")} refused unless default; missing ${JSON.stringify(missing)}`);
process.exit(missing.length ? 1 : 0);
