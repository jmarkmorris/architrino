# Braid Terminology Audit — 2026-07-22

Status: active; corpus and scanner corrections completed, public `ideal braid` rename awaiting one operator decision.

## Scope and Evidence

This fail-closed audit covers reader-facing Markdown outside `content/markdown/aaa/noether-braid/`, the canonical taxonomy sources, the terminology scanner and tests, and repository ownership of `ideal braid` / `ideal-braid` / `ideal_braid`. The audit distinguishes prose taxonomy claims from theorem labels, local variables, links, filenames, routes, machine identifiers, app proper names, generated artifacts, and historical priority records.

The occurrence-level inventory is executable and line-addressed:

```bash
node scripts/check-braid-taxonomy-terminology.mjs --scope corpus --report
```

That command prints the file, line, rule, replacement guidance, and full source-line excerpt for every scanner hit. The strict gate is:

```bash
node scripts/check-braid-taxonomy-terminology.mjs
```

The strict gate now scans all 198 reader-facing corpus Markdown files rather than a hand-selected migrated subset. The command also checks 15 Borg configuration/reader-facing control surfaces, for 213 controlled files in its current combined output.

## Inventory Totals

Post-correction report-mode inventory:

| Class | Occurrence hits | Interpretation |
| --- | ---: | --- |
| Taxonomy member identifiers (`A1`, `A1.x`, `A2`, `B1`, `C1`, `C2`) | 575 | Audit candidates. This count includes canonical definitions, justified geometry references, links, and symbol collisions; it is not a defect count. |
| Taxonomy family identifiers (`Family-A`, `Family-B`, `Family-C`) | 230 | Audit candidates. Retain only where the defining geometry is local or explicitly delegated. |
| `ideal braid` display phrases | 12 | Audit-only pending the public-name decision below. |
| Standalone retired-name tokens (`spindle`, `drum`, `shell`, `nested`, `cap`, `uniaxial`, `triaxial`) | 141 | Audit candidates dominated by ordinary non-taxonomy meanings such as causal shell, nested calculation, or cap/boundary language. Contextual braid-name forms remain strict failures. |
| Positional support/layer phrases | 1 | Historical source-era use in `aaa-journey.md`; the same sentence states that the current taxonomy retires those identities. |
| Strict terminology defects remaining | 0 | Whole-corpus gate passes. |

The literal report contains overlapping hits when one sentence carries both a family and member label. Therefore the four audit rows must not be summed as unique prose assertions.

## Adjudication Rules

| Verdict | Required evidence | Replacement or retention rule | Operator-checkable falsifier |
| --- | --- | --- | --- |
| Justified | The passage states the defining coordinates or explicitly delegates them to the canonical member definition. | Retain the exact family/member ID. | The cited member definition lacks one of the relations used by the passage. |
| Under-specified | The passage supplies only three binaries, three axes, a particle name, a visual envelope, or a source-record role. | Use `Noether braid`, `candidate braid`, or `prescribed braid geometry`; if an exact ID is needed, add its coordinates and separate the physical hypothesis. | The local passage can point to all defining coordinate relations without importing a particle or stability claim. |
| Obsolete | The phrase uses retired shape names, radius-sorted identity, fixed inner/middle/outer roles, or H/M/L identity. | Replace with persistent binary indices and separately grade any branch-derived role. | The current taxonomy explicitly defines the retired role as a persistent identity. |
| Exempt | The token is a theorem/appendix label, local mathematical symbol, stable machine contract, filename/route, quoted history, or unrelated ordinary word. | Retain and record the ownership class; do not infer taxonomy meaning. | The surrounding passage actually uses the token to name a braid geometry. |

## Corrections Made

### Positional identity

The widened strict gate exposed 12 H/M/L defects across `gluons.md`, `muon-tau.md`, `weak-mixing-angle.md`, `gauge-symmetries.md`, `nucleon-structure.md`, and `lorentz-kinematics.md`. All were replaced by persistent indices $1,2,3$. Additional variants missed by the prior expression were corrected:

- `outer precessing binary` became a provisional binary-3 source-record role;
- `$f_H,f_2,f_L$`, `$R_H,R_2,R_L$`, and corresponding axis symbols became indexed $1,2,3$ coordinates;
- malformed `Inner, Middle, and binaries 3` and `middle and binaries 3` phrases became binaries 1, 2, and 3;
- `outer circumference` and `outer orbit` in the Planck bridge became the declared alignment circumference and reference orbit.

The scanner now catches comma-separated `H,M,L` and positional binary phrases with intervening adjectives. Literal compatibility diagnostics such as `middle-hinge-violation` and orientation tokens in inline code remain exempt machine contracts.

### Unsupported particle and cosmology assignments

Unsupported A1-as-particle, generation, qubit, and cosmology assertions were removed or downgraded in:

- `assemblies/fermions/quantum-number-mapping.md`;
- `assemblies/fermions/electron.md`;
- `assemblies/fermions/muon-tau.md`;
- `assemblies/fermions/quarks.md`;
- `assemblies/mesons/mesons.md`;
- `nuclear-atomic/hyde-periodic-table.md`;
- `assemblies/fermions/color-charge-su3.md`;
- `cosmology/dark-energy.md`;
- `spacetime/black-holes.md`;
- `validation/architrino-si-base-units.md`;
- `philosophy-history/theory-bridges/quantum-operator-mapping.md`;
- `philosophy-history/theory-bridges/weak-mixing-ckm.md`;
- `philosophy-history/solving-the-crisis.md`;
- `philosophy-history/theory-mapping.md`;
- `cosmology/inflation-model.md`;
- dynamics, energy, radiation, mass, and validation protocols that had used source-record roles as member identity.

The replacements use existing canonical terms: `candidate Noether braid`, `candidate braid`, or `candidate braid scaffold`. Where an A1 label remains useful, the local passage now states the defining Family-A axis response, persistent indices, independently assignable radii and frequencies, remaining binary coordinates, lack of stability/retention implication, and a same-record EOM-solver falsifier. The Planck bridge, angular-momentum bridge, color-charge chapter, and concrete proper-time clock state now carry that ownership explicitly.

Measured from the current working diff, 132 removed lines contained a family/member token and 69 added lines retain one; the retained additions supply coordinate ownership, links, explicit claim boundaries, or deliberate statements that a candidate does not receive an exact member assignment. Fifty removed lines contained positional or mixed-identity language; the remaining additions are historical explanations, explicit statements rejecting radius-role identity, or unrelated boundary wording. These are line counts, not counts of independent physical claims.

## Exemptions and Compatibility Classes

Confirmed non-taxonomy collisions include theorem or appendix labels such as `Theorem A1`, `(A1)`, `(A2)`, and validation row identifiers `C1` and `C2`. They remain because their local ownership is mathematical or documentary, not braid geometry. Link text such as `A1 Dynamics` is also exempt when it names the canonical destination rather than assigning the source passage a member identity.

Stable identifiers and compatibility surfaces are not reader-facing terminology authority. They may retain strings such as `nested-shell-braid`, `ideal-braid`, or `ideal_braid` until a separate compatibility migration supplies aliases and tests.

## `Ideal Braid` Ownership Inventory

The live non-priority search finds the label or its machine spellings in 34 files. Their ownership divides as follows:

| Ownership class | Representative paths | Verdict |
| --- | --- | --- |
| Prescribed geometry | `content/markdown/aaa/archie/ideal-braid-guide.md`, `ideal-braid.html`, `src/apps/ideal-braid/IdealBraidRuntime.js` | The runtime uses three mutually orthogonal default binary normals, unequal radii, unequal frequencies, and convergence toward the common translation direction. This is prescribed A1 geometry, not a generic ideal braid and not A2. |
| Reader-facing app proper name | `README.md`, app title and aria labels in `ideal-braid.html`, reader links in Lorentz and return-cycle chapters, scene/application titles | Rename after operator choice. Preferred display name: `A1 Lorentz Geometry`. |
| Stable route and filenames | `ideal-braid.html`, `src/apps/ideal-braid/`, `content/scenes/archie/ideal_braid.json`, `ideal-braid-guide.md` | Preserve initially as compatibility aliases. A display-name change does not require route breakage. |
| Stable machine identifiers | app ID `ideal-braid`, scene ID `archie__ideal_braid`, model/config hashes, CSS/DOM selectors, exported runtime names | Preserve. Renaming these has no theory value and creates launch, saved-link, test, and provenance risk. |
| Tests and launch contracts | `tests/ideal-braid-runtime.test.js`, `standalone-app-launch.test.js`, `transport-control-icons.test.js` | Update only reader-facing test descriptions if desired; retain contract assertions. |
| Generated copies and indexes | generated textbook/search/scene outputs and the iOS generated package | Do not edit manually. Regenerate only in an authorized generator-write or final PR workflow. |
| Historical/scratch material | priority work logs, brainstorming fragments, old source packets | Retain when needed as history; current operational prose should adopt the chosen display name. |
| Unsupported generic ideality claim | `reference/entourage/roles-geometry-dynamics/system-prompt.md` uses an `ideal braid subset` independently of the app | Replace with `prescribed braid geometry` or the exact member once its coordinates are stated; do not let the app name authorize a generic ideal class. |

### Compatibility risk

Renaming routes, filenames, app IDs, scene IDs, DOM selectors, hashes, or runtime exports in the same pass would risk broken bookmarks, iOS handoff, scene launch, tests, saved provenance, and generated indexes. The safe architecture is a display-name correction with old machine strings retained as compatibility contracts.

## Decision Required

Ranked choices:

1. **Preferred — display-only correction:** rename the public app/guide/scene/link label to `A1 Lorentz Geometry`; keep `ideal-braid` and `ideal_braid` routes, filenames, IDs, hashes, selectors, and runtime exports as compatibility contracts.
2. **Broader compatibility migration:** use `A1 Lorentz Geometry` publicly and introduce new route/file/identifier aliases while retaining the old contracts. This adds work and risk without improving taxonomy correctness.
3. **Keep the display name:** retain `Ideal Noether Braid` as an app proper-name exception, while the guide states that it displays prescribed A1 geometry. This leaves `ideal` as a misleading reader-facing geometry label.

No public `ideal braid` rename has been made before this decision.

## Validation State

- Strict combined terminology scan: passes, 213 controlled files, zero findings; the corpus component is 198 Markdown files.
- Scanner unit tests: 13/13 pass.
- `git diff --check`: passes.
- Audit-only member/family/ideal findings remain reportable by design; they are not hidden behind the strict gate.
