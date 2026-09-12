# CRW-005 Electron Review — 2026-09-12

## Scope and disposition

Status: ✓ Done — bounded chapter review, direct repairs, complete final reread and check-only validation completed; generated registry drift is recorded and deferred. This assignment owns only [Electron](../../../../content/markdown/aaa/assemblies/fermions/electron.md) and this report. Shared review boards, priorities, queues, other chapters, generated artifacts, and source fixtures are outside the write scope.

The disposition is bounded: it does not establish theory closure, a demonstrated electron branch, EOM solver acceptance, or downstream corpus closure. The reviewed construction remains an assembly hypothesis and a set of observer-response targets.

## Baseline and final source identity

The following hashes were measured with shasum -a 256 on the canonical chapter:

| Record | SHA-256 |
| --- | --- |
| Baseline | 1595435923ff17a9c610c7705845d4b84c9d5a4516cdd4bd7af66c99265502cf |
| Final chapter | 1d19dc7a972aa0b0678aa7f4eaaf2734b1b8cf90c2c4c5de68b5fe5b2dd2d93d |

The initial scoped Git status command below returned no entries, and test ! -e confirmed that this report did not exist before creation. The baseline chapter was read completely with nl -ba and retained in memory for exact equation comparison. The pre-repair reread returned the same baseline hash. Every subsequent edit followed a reread of the exact target; those rereads showed no unexpected chapter or report content change. These observations do not guarantee that later concurrent work preserves those bytes.

```bash
git --no-optional-locks status --short -- content/markdown/aaa/assemblies/fermions/electron.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-electron-review-2026-09-12.md
shasum -a 256 content/markdown/aaa/assemblies/fermions/electron.md
```

Baseline line numbers below refer to the 112-line source at the baseline hash. Final references refer to the 134-line source at the final hash, measured by the complete line-numbered read. A different source hash or command result overturns the corresponding source-state observation and requires a new scoped check.

## Authorities and sources inspected

Startup used the complete AGENTS.md, generated router, corpus-review owner, review and coordination skill owners, PI and research-assignment owners, parallel-work procedure, theory orientation, operator explanation standard, and geometry/dynamics review lens. The explicit review-and-repair brief controls the two-file write scope.

Task-relevant portions of the academic and mathematical style guides, mathematical terminology, terminology usage, comparative glossary, and About Architrino supplied the local authoring rules. Particularly material were polarity versus charge, independent pro/anti orientation and polarity conjugation, candidate versus certified braids, receiver-local acceleration, and observer-level recovery. Controlled canon was not edited.

| Scientific owner | Inspected anchors and purpose |
| --- | --- |
| [Ontology](../../../../content/markdown/aaa/foundations/ontology.md) | Primitive entity, two-assembly exchange loop, medium and observer boundary; especially lines 166–225. |
| [Architrino](../../../../content/markdown/aaa/foundations/architrino.md) | Opening primitive definition, absence of mass, causal histories, polarity bookkeeping and factor-of-six input; especially lines 135–184. |
| [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md) | Non-dynamical container versus material contents; opening and lines 486–498. |
| [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md) | Opening/core concept: universal ordering parameter versus physical clock readout. |
| [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md) | Complete history-bearing state and mass-response isotropy; lines 84–116 and 328–368. |
| [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md) and [Constructing the Absolute Frame](../../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md) | Tagged complete-state access versus operational readout; detecting opening and constructing lines 191–227. |
| [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) | Path-history law, branch-chart requirements, canonical acceleration and singular-domain boundary; lines 1–164, 478–600, and 1363–1533. The symmetry reviewer also inspected the fundamental-symmetry section. |
| [Noether Braid](../../../../content/markdown/aaa/noether-braid/noether-braid.md) | Neutral base and prescribed geometry versus retained-branch existence. |
| [Braid Program method](../../braid-program/contracts/method.md) | Screening/evolution distinction, history dependence, independent reference, and burden order; README, live-state and queue orientation were also inspected. |
| [Particle Masses](../../../../content/markdown/aaa/assemblies/particle-masses.md) | Energy normalization, rest-response domain, trace and conjugation; lines 1–128 and 273–306. |
| [Quantum Number Mapping](../../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md) and [Muon and Tau](../../../../content/markdown/aaa/assemblies/fermions/muon-tau.md) | Candidate axial inventory, signed charge arithmetic, shielding tuple, generation, spin and magnetic interfaces. The adjacent muon/tau chapter was read as context only. |
| [Angular Momentum and Spin](../../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md) and [Statistics](../../../../content/markdown/aaa/quantum/fermi-dirac-and-bose-einstein-statistics.md) | Ordered-frame target, downstream open-proof boundary and distinct exchange sign; spin lines 1682–1699 and 2765–2785, statistics lines 1–58. |
| [Wavefunction Ontology](../../../../content/markdown/aaa/quantum/wavefunction-ontology.md) | Effective-state and basin-measure contracts; lines 1–90 and 570–641. |
| [Gauge Structure Emergence](../../../../content/markdown/aaa/assemblies/gauge-structure-emergence.md) | Current precision interface, radius, expansion domain, and illustrative versus measured bounds; lines 568–608. |

A bounded web check inspected S. Navas et al. (Particle Data Group), Review of Particle Physics, Phys. Rev. D 110, 030001 (2024), 2025 update, [Electron listing](https://pdg.lbl.gov/2025/listings/rpp2025-list-electron.pdf), pp. 1–3. It supports the observer-level spin, mass, conjugation-test and magnetic-response references. This is a specified edition, not a claim to the newest numerical evaluation. No numerical mass, lifetime, anomaly or confidence limit was copied into the chapter. No external result was used as a substrate premise.

## Findings and repairs

The table enumerates seven bounded repair dispositions. Severity concerns the risk of misreading evidence or interfaces; it is not the probability that the assembly hypothesis is false.

| Finding | Severity; baseline lines | Demonstrated issue and why it matters | Implemented repair; final lines |
| --- | --- | --- | --- |
| ELC-1 | High; 5, 9, 44, 81–90, contrasted with 15 and 112 | Stable, retained electron wording exceeded the chapter's own derivation-target status. A shielding label also carried unsupported internal-energy ordering. Weak-event labels risked reading as realized mechanisms. | ✓ Done — retained the candidate geometry, separated observed constraints from architecture, added history-domain and stability requirements, and locally marked beta/antineutrino mappings as targets; 5–15, 52, 95–104. |
| ELC-2 | High; 31–40 | Neutrality was used to justify unchanged medium response under conjugation. The mass trace lacked its local rest-response and calibration domain. | ✓ Done — conditioned equality on matched conjugation-invariant ensemble/probe/boundary data, defined the trace and calibration boundary, and removed the unsupported partial-replacement instability verdict; 37–48. |
| ELC-3 | Medium; 15–29 | Signed units and shielding bits lacked load-bearing local definitions. Factor-of-six bookkeeping and an assigned tuple could read as derived charge or universality. | ✓ Done — supplied conditional charge arithmetic, persistent-index bit definitions, and the distinct charge-response and universality obligations; 19–35. |
| ELC-4 | High; 44 | Localized persistent identity was described as carrying spin-statistical behavior, while the linked owners retain distinct proof burdens. | ✓ Done — separated provenance, spinor response, apparatus angular response, antisymmetric exchange and complete-state Pauli exclusion; 52–54. |
| ELC-5 | Medium; 46–61, 71–77 | The schematic projection was described as statistical readout without an ensemble, measure, output type, normalization or no-record outcome. | ✓ Done — kept the display unchanged and defined the preparation/history domain, effective chart, density when it exists, other outcomes and positive-denominator conditioning; 56–75, 85–91. |
| ELC-6 | High; 65–67 | Non-viscous void ontology was followed by asserted reversible atomic retuning and threshold language without a material transport account. | ✓ Done — made near-lossless motion a window-specific hypothesis requiring energy and medium/outgoing-wake fluxes, and added a secular-leakage falsifier; 79–81. |
| ELC-7 | Medium; 94 | The precision owner uses $R_{\mathrm{comp}}$ and explicitly bounds phenomenological corrections; the electron chapter still named $R_L$ without those limits. | ✓ Done — used the current radius, defined anomaly/QED comparison, stated expansion domains, and separated calibration, joint tests and illustrative tolerances; 108–116. |

The discrepancies and omissions are measured by the complete chapter read and the named live-owner comparisons. Their consequences are derived only within the arguments below. The repairs do not assert that no relevant derivation exists anywhere else, or that the electron candidate has been experimentally excluded.

### ELC-2: conditional symmetry and an independent algebraic witness

Claim grade: derived on the regular admitted-hit domain. One acceleration contribution is $\mathbf A_{ij}=\kappa q_iq_j\mathbf K_{ij}$, with $\mathbf K_{ij}=W_{ij}^{\mathrm{acc}}\hat{\mathbf r}_{ij}/r_{ij}^2$ determined by fixed causal geometry. Global polarity reversal preserves every product and root geometry. Reversing the assembly alone changes its cross-products with unchanged environmental constituents. A signed-count condition on the environment is not a cancellation condition on its geometrically weighted vectors.

Use normalized wake-speed units $c_f=1$. At reception time $T_r=0$ place a positive receiver at the origin and prescribe stationary sources $+\epsilon$ at $(1,0,0)$ and $-\epsilon$ at $(2,0,0)$. Their inventory is neutral; their unique roots are $-1,-2$, and $D_t=W^{\mathrm{acc}}=1$. Their summed acceleration along the first coordinate axis is $-3\kappa\epsilon^2/4$. Receiver-only conjugation gives $+3\kappa\epsilon^2/4$; global conjugation gives the original negative value.

This is an instantaneous prescribed-history evaluation, not an equilibrium, populated sea, electron branch, stability calculation or evidence for unequal particle masses. It disproves neutrality alone implying identical local response. Conditional mass equality additionally requires a polarity-even mass extraction and matched conjugation-invariant ensemble/boundary data, as already stated in Particle Masses.

Falsifier of the missing-premise finding: a derivation that the chapter's stated neutrality assumptions force the requisite complete response invariance. Falsifier of a proposed physical equality: a reproducible splitting under its explicitly matched admitted conditions. An asymmetric environment lies outside that equality domain.

### Claim grades and falsifiers for the remaining repairs

- ELC-1: the assembly identification is guessed. A compatible history satisfying the same acceleration law, inventory retention, perturbation/refinement and independent-reference requirements would permit reconsidering the retained-branch claim. A converged failure rejects only its tested chart and domain. Weak-event interpretation reopens with constituent provenance and independently derived energy, momentum and medium accounts.
- ELC-3: the charge sum is derived under the normalization and assigned inventory; it does not select six protected sites or derive electric coupling. Inventory loss or measured charge leakage defeats that map. Pro/anti orientation is independent of conjugation by live convention. No explicit orientation-reversal error was present in the baseline; the added orientation sentence is clarification, not another defect verdict.
- ELC-4: erasing constituent labels can leave trivial transport around the exchange loop, so label erasure does not select the fermionic minus sign. A physical history state returning after $2\pi$, a trivial exchange sign, or incorrect apparatus response defeats the corresponding spin mapping. Spatial overlap with orthogonal spin states remains compatible with the observer target.
- ELC-5: normalization is a definition-level condition; the clarified domain does not derive its preparation measure or the Born rule. Negative probabilities, missing probability, or incompatible frequencies in the same predeclared preparation rejects the proposed statistical map.
- ELC-6: the void's lack of material response is ontology; reversible retuning of its contents is guessed. Secular energy leakage beyond a declared tolerance or loss of branch identity rejects near-lossless motion on that window. A stable shape maintained by energy throughput is not a lossless control.
- ELC-7: the corrections remain guessed phenomenological ansatzes. A fixed common map exceeding actual observation-specific limits fails; fitted agreement alone establishes neither the radius nor universality. An arbitrary magnetic coefficient cannot identify the radius. No anomaly significance or experimental exclusion was computed.

## Independent review and known-case-first controls

The primary reviewer owns edits and final self-review. Read-only subagent crw_005_electron_symmetry used the emmy-noether lens, read the baseline at the same hash, and returned EL-SYM-1 and EL-SYM-2. They were reconciled into ELC-2 and ELC-4 against live owners. The subagent changed no files. Agreement among agents is not an independent physical reference; the checkable algebraic witness is the reference, while its Node evaluation checks arithmetic only.

### Symmetry arithmetic

The subagent first ran a known stationary like-polarity case at distance two with $\kappa=\epsilon=c_f=1$. Expected root $-2$, acceleration $-1/4$, and unchanged global-conjugate acceleration all passed, exit 0. The pass was recorded in commentary before the two-source witness. The later command returned neutral inventory 0 and sums -0.75, +0.75, -0.75 for original, receiver-only conjugation and complete conjugation, exit 0.

This reproducer combines the original command bodies, defines the evaluator once, and preserves control-first order:

```bash
node - <<'NODE'
const cf = 1;
function staticHit(qr, qt, xt) {
  const dx = -xt;
  const r = Math.abs(dx);
  const emissionTime = -r / cf;
  const Dt = cf;
  return { emissionTime, acceleration: qr * qt * (cf / Math.abs(Dt)) * (dx / r) / (r * r) };
}
const like = staticHit(1, 1, 2);
const conjugate = staticHit(-1, -1, 2);
if (like.emissionTime !== -2 || like.acceleration !== -0.25 || conjugate.acceleration !== -0.25) throw new Error('Known-case failure');
console.log('KNOWN CASE PASS', {like, globalConjugate:conjugate});
const sea = [{q:1,x:1},{q:-1,x:2}];
function evaluate(qr, globalSign=1) {
  const hits=sea.map(s=>staticHit(qr,globalSign*s.q,s.x));
  return {hits,sum:hits.reduce((a,h)=>a+h.acceleration,0)};
}
const original=evaluate(1);
const receiverOnly=evaluate(-1);
const completeConjugation=evaluate(-1,-1);
if(original.sum !== -0.75 || receiverOnly.sum !== 0.75 || completeConjugation.sum !== -0.75) throw new Error('Counterexample arithmetic mismatch');
console.log({cf,neutralSourceInventory:sea.reduce((a,s)=>a+s.q,0),original,receiverOnly,completeConjugation});
NODE
```

No evolution or mass-response instrument was run. This evaluator handles only stationary collinear positive-distance sources and the specified receiver event; it does not test generic root completeness or caustics.

### Display and link inspection

An in-memory Node wrapper used the existing corpus display parser, marked lexer and KaTeX. Before target use, its known sample returned one display and one link, ignored a fenced fake display/link and rejected an invalid KaTeX command, exit 0. An initial orchestration submission had a JavaScript quoting syntax error and executed no command.

The first target link run exposed a limitation: generic Markdown parsing interpreted a bracket-and-parenthesis sequence in the detection equation as a link. That missing-path assertion was an instrument false positive; no chapter edit was made for it. The wrapper was changed to mask parsed display blocks before link extraction. An expanded known sample then passed before the target rerun: two displays, one real link, mathematical bracket syntax and fenced fake markup ignored, bad KaTeX rejected, and known existing/absent paths distinguished. Both control passes were recorded in this report before their respective target calls.

The corrected target run returned:

```json
{"displayEquations":3,"displayTeXUnchanged":true,"equationLinksUnchanged":true,"localLinks":30,"localPathFailures":0,"externalLinks":1,"scope":"display KaTeX and link paths only; fragment semantics inspected separately"}
```

Exact TeX/link comparison used retained baseline text rather than a moving Git HEAD. The preserved identifiers are corpus-equation-e92a1e95b71a8ce3, corpus-equation-bd7e8a8f67e81046 and corpus-equation-26f0ee43f6048d8e. Chapter fragment targets were checked by reading the named source headings. The wrapper did not test every inline TeX expression, browser layout, arbitrary Markdown syntax, or scientific link support. The PDG source was opened separately.

The core and expanded control are reproducible together from the repository root:

```bash
node --input-type=module <<'NODE'
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { marked } from 'marked';
import katex from 'katex';
import { parseCorpusDisplayEquations } from './scripts/build-equation-mapping-corpus.mjs';
function inspect(sourcePath, source) {
  const displays = parseCorpusDisplayEquations(sourcePath, source);
  let linkSource = source;
  for (const block of [...displays].reverse()) {
    linkSource = linkSource.slice(0, block.openStart)
      + ' '.repeat(block.closeEnd - block.openStart)
      + linkSource.slice(block.closeEnd);
  }
  const links = [];
  marked.walkTokens(marked.lexer(linkSource), token => {
    if (token.type === 'link' || token.type === 'image') links.push(token.href);
  });
  const formulas = displays.map(block => block.tex);
  for (const tex of formulas) katex.renderToString(tex, {displayMode:true, throwOnError:true});
  return {displays, formulas, links};
}
const fence = String.fromCharCode(96).repeat(3);
const sample = '# Known control\n\n$$\nx^2+1\n$$\n\n$$\n\\Pi[x](y)\n$$\n\n[known](README.md)\n\n'
  + fence + 'md\n$$\n\\badmacro\n$$\n[fake](missing.md)\n' + fence + '\n';
const got = inspect('control.md', sample);
assert.deepEqual(got.formulas, ['x^2+1', '\\Pi[x](y)']);
assert.deepEqual(got.links, ['README.md']);
assert.throws(() => katex.renderToString('\\definitelyUnknownMacro', {throwOnError:true}));
assert.equal(fs.existsSync(path.resolve('README.md')), true);
assert.equal(fs.existsSync(path.resolve('crw-005-control-absent-link-target.invalid')), false);
console.log('EXPANDED KNOWN CONTROL PASS');
const sourcePath = 'content/markdown/aaa/assemblies/fermions/electron.md';
const result = inspect(sourcePath, fs.readFileSync(sourcePath, 'utf8'));
const local = result.links.filter(h => !/^https?:/.test(h));
assert.deepEqual(local.filter(h => !fs.existsSync(path.resolve(path.dirname(sourcePath), h.split('#')[0]))), []);
console.log({displays:result.formulas.length, localLinks:local.length, localPathFailures:0});
NODE
```

This reproduces extraction/rendering and path checks; the original baseline-parity comparison additionally requires the exact retained baseline bytes.

## Validation and generated drift

| Command or instrument | Measured result and limits |
| --- | --- |
| node scripts/validate-content.mjs --check --strict, baseline | Exit 0; 0 errors, 0 warnings, 30 notes; 391 scene configs, 199 corpus Markdown files, 1661 repository Markdown files audited. Structural result only. |
| Corrected scoped display/link wrapper | Exit 0; three preserved displays and equation links, display KaTeX rendered, 30 local paths resolved, one separately checked external source. |
| git --no-optional-locks diff --check -- content/markdown/aaa/assemblies/fermions/electron.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-electron-review-2026-09-12.md | Exit 0 with no output on both chapter-repair and final-report states. |
| node scripts/build-equation-mapping-corpus.mjs --check | Exit 1; only reported failure was stale content/generated/equation-mapping/corpus-equations.json. Scan reported 199 Markdown files, 4685 displays, 23 promoted equations and 30423 symbol definitions. |
| Intermediate strict checks after chapter repair | Exit 1; the first reported one report-only missing-link false positive from inline mathematical bracket syntax. The next reported four example-only missing targets because extractMarkdownLinks ignores backtick fences but not tilde fences. The report now confines that syntax to supported backtick fences. No chapter link was changed for either instrument issue. |
| node scripts/validate-content.mjs --check --strict, final | Exit 0; 0 errors, 0 warnings, 30 notes; 391 scene configs, 199 corpus Markdown files, 1668 repository Markdown files audited. This structural pass does not establish scientific correctness or generated-registry freshness. |

Generated registry regeneration is deferred. The exact owner command is:

```bash
node scripts/build-equation-mapping-corpus.mjs --write
```

It was not run. Changed source context makes registry drift expected, but the global stale result is not attributed wholly to this chapter in the shared checkout. This is not a mathematical failure. No freshness claim is made about untested reading copies, source indexes, fixture pins or solver outputs. This assignment ran no generator write, Python command, EOM evolution, staging, commit, push, PR action or linked-worktree operation.

## Optional work and unresolved scientific obligations

The orientation sentence is clarification, not a demonstrated baseline reversal error. A new diagram, reorganization of related links, or expansion into a full electron derivation is optional and was not pursued. Broader prose in neighboring chapters was read as context only; this review neither repairs nor certifies it.

| Remaining obligation | Status, owner and reopening condition |
| --- | --- |
| Retained electron and protected six-site inventory | ○ Not done. [Braid Program](../../braid-program/priorities.md) and [Quantum Number Mapping](../../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md) need a compatible evolved history, root completeness, persistence/refinement and independent-reference evidence before particle assignment. |
| Energy, mass and charge response | ○ Not done. [Particle Masses](../../../../content/markdown/aaa/assemblies/particle-masses.md) requires independent energy/response extraction, unit/reference maps, isotropy, matched sea data and tests independent of calibration. Charge response must go beyond signed inventory arithmetic. |
| Spin, exchange and indistinguishability | ○ Not done. [Angular Momentum and Spin](../../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md) and [Statistics](../../../../content/markdown/aaa/quantum/fermi-dirac-and-bose-einstein-statistics.md) need a physical retained history lift, two-assembly exchange sign and apparatus response. |
| Detection and near-lossless atomic motion | ○ Not done. [Wavefunction Ontology](../../../../content/markdown/aaa/quantum/wavefunction-ontology.md), [Atomic Structure](../../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md), and medium-response owners must supply preparation measures, effective charts, records, spectra and energy/flux balance on a declared window. |
| Weak-reaction provenance | ○ Not done. [Reaction Ledger](../../../../content/markdown/aaa/validation/reaction-ledger.md) must supply incoming, outgoing, recruited-medium, recoil and wake accounts. |
| Precision magnetic and scattering matching | ○ Not done. [Gauge Structure Emergence](../../../../content/markdown/aaa/assemblies/gauge-structure-emergence.md) requires predicted coefficients, admitted expansion domains, reference inputs, actual data/uncertainties and joint tests without reusing calibration as independent evidence. |
| Shared CRW-005 integration | ○ Not done by this assignment. The coordinator may consume this receipt and update the shared board/queue, which this worker cannot edit. |

## Exact files changed

The assignment's edit calls changed exactly:

1. [Electron chapter](../../../../content/markdown/aaa/assemblies/fermions/electron.md) — bounded claim, domain and interface repairs.
2. [This dedicated report](crw-005-electron-review-2026-09-12.md) — created for the assigned review.

The edit-tool history and scoped status/diff checks support that assignment-specific statement; it is not a claim that these are the only changed files in the shared checkout. The report's digest is obtained externally with shasum; embedding its own full-file hash would change it. The chapter hash above identifies the reviewed artifact independently of shared Git activity.
