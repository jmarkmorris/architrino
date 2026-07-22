# Braid Terminology Audit — 2026-07-22

Status: source migration and enforcement complete; generated rebuild awaiting explicit operator authorization under the repository's generated-artifact rule.

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

The strict gate now scans all 198 reader-facing corpus Markdown files rather than a hand-selected migrated subset. The command also checks 15 Borg configuration/reader-facing control surfaces and 7 A1 public-display source surfaces, for 220 controlled files in its current combined output.

## Inventory Totals

Post-correction report-mode inventory:

| Class | Occurrence hits | Interpretation |
| --- | ---: | --- |
| Taxonomy member identifiers (`A1`, `A1.x`, `A2`, `B1`, `C1`, `C2`) | 590 | Audit candidates. This count includes canonical definitions, justified geometry references, links, and symbol collisions; it is not a defect count. The increase from the pre-decision count records the approved A1 display name and its explicit prescribed-geometry ownership. |
| Taxonomy family identifiers (`Family-A`, `Family-B`, `Family-C`) | 230 | Audit candidates. Retain only where the defining geometry is local or explicitly delegated. |
| Noncanonical `ideal braid` display phrases | 0 | Strictly enforced after the public-name decision. One exact dated research-notebook heading is exempt as a concrete historical title. |
| Standalone retired-name tokens (`spindle`, `drum`, `shell`, `nested`, `cap`, `uniaxial`, `triaxial`) | 141 | Audit candidates dominated by ordinary non-taxonomy meanings such as causal shell, nested calculation, or cap/boundary language. Contextual braid-name forms remain strict failures. |
| Positional support/layer phrases | 1 | Historical source-era use in `aaa-journey.md`; the same sentence states that the current taxonomy retires those identities. |
| Strict terminology defects remaining | 0 | Whole-corpus gate passes. |

The literal report contains overlapping hits when one sentence carries both a family and member label. Therefore the four audit rows must not be summed as unique prose assertions.

### Outside-Directory Identifier Totals

Outside `content/markdown/aaa/noether-braid/`, the report contains 361 raw family/member hits in 49 Markdown files. The exact token totals are:

| Token | Raw hits |
| --- | ---: |
| `A1` | 170 |
| `A1.1` | 0 |
| `A1.2` | 0 |
| `A1.3` | 6 |
| `A1.4` | 0 |
| `A2` | 6 |
| `B1` | 58 |
| `C1` | 2 |
| `C2` | 3 |
| `Family-A` / `Family A` | 110 genuine-or-audit hits plus one unrelated lowercase phrase |
| `Family-B` / `Family B` | 3 |
| `Family-C` | 2 |

The raw-token count is not a claim count. Long chapters repeat one locally owned chart many times, and a single sentence can contain the same family label twice. Verdict totals are therefore reported as **semantic file contexts**: 40 files contain genuine taxonomy use and 9 files contain only exempt navigation, documentary, historical, or symbol collisions. After correction, all 40 genuine contexts are justified; none remain under-specified or unjustified. The migration changed 48 reader-facing Markdown files outside the taxonomy directory; the current strict gate reports zero files still requiring correction.

### Complete Outside-Directory Justification Ledger

The line lists below enumerate all 361 raw hits. Exact source phrases and complete line excerpts are emitted by `node scripts/check-braid-taxonomy-terminology.mjs --scope corpus --report`; the `Terms` column records the exact matched identifiers. Repeated hits on one line are retained in the raw count and grouped here because they share one intended meaning and verdict.

Verdict codes:

- `J-C`: justified coordinate-owned use. The local passage states the defining relations or is itself a controlled terminology definition. Falsifier: one required coordinate relation is absent or contradicted by the referenced record.
- `J-R`: justified reference use. The passage names the canonical class, member, chapter, or theorem target without assigning a new object to it. Falsifier: the sentence is used to classify a new physical record whose defining coordinates are not supplied.
- `J-H`: justified taxonomy label inside an explicitly conjectural physical mapping. The geometry is owned, but the particle, cosmology, stability, or retention claim is not supplied by the label. Falsifier: the prose treats the physical mapping as a consequence of family membership, or the same-record EOM-solver evidence fails the declared coordinates.
- `E`: exempt. The token is a link/title, local theorem/table/axiom label, ordinary phrase, or historical occurrence rather than a taxonomy assignment. Falsifier: surrounding prose actually uses the token to classify a braid geometry.
- `M`: a file mixes justified use with one or more explicitly identified exemptions; the line-level excerpt resolves the individual hit.

| File | Terms | Lines | Intended meaning, coordinate ownership, and verdict |
| --- | --- | --- | --- |
| `archie/aaa-journey.md` | `Family-A` | 31, 84 | Historical/current-status account of indexed Family-A support; no new record assignment. `E` historical context. |
| `archie/comparative-glossary.md` | `A1`, `A2`, `B1`, `C1`, `C2`, `Family-A`, `Family-B` | 26, 54, 55, 76, 86, 103, 104, 109 | Controlled definitions and exact comparison rows, including B1 coordinates and the B1 equatorial boundary. `J-C`. |
| `archie/ideal-braid-guide.md` | `A1`, `Family-A` | 1, 3, 18, 168 | The app's prescribed A1 geometry and Family-A display scale; ownership is completed by the guide/runtime analysis below. `J-C`. |
| `archie/mathematics-terminology.md` | `Family-A` | 76 | Controlled definition of the Family-A terminal-alignment term, not a new branch assignment. `J-R`. |
| `archie/research-notebook.md` | `A1`, `Family-A` | 176, 194, 274, 316 | A navigation label plus status/app-candidate references. The app reference delegates to its guide; closure burdens remain explicit. `M: J-R/J-H`, with line 176 `E` navigation. |
| `archie/terminology-usage.md` | `A1`, `A1.3`, `A2`, `B1`, `Family-A` | 164, 270-272 | Controlled vocabulary examples that state the defining common-axis, symmetry, or indexed-frequency relations. `J-C`. |
| `assemblies/bosons/electroweak-bosons.md` | `B1`, `C2`, `Family-C`, `Family-A` | 21, 32 | C2 is a conditional nearest chart built from complete B1 components; photon and horizon mappings are explicitly extra hypotheses. `J-C/J-H`. |
| `assemblies/fermions/color-charge-su3.md` | `A1`, `Family-A` | 3, 13, 15, 36, 62, 68, 102, 213, 471, 562 | One locally defined A1 scaffold; color, particle, and generation mappings are explicitly candidate-level. `J-C/J-H`. |
| `assemblies/fermions/neutrinos.md` | `B1` | 230 | Exact B1 coordinates are stated as one possible realization and explicitly not privileged or retained. `J-C/J-H`. |
| `assemblies/particle-masses.md` | `A1`, `Family-A` | 802, 810 | A1 reference-attractor target with complete coordinates and same-record rejection condition. `J-C/J-H`. |
| `cosmology/CMB.md` | `Family-A` | 226 | Reference to the canonical Family-A flat endpoint inside an explicitly hypothetical release channel, not a newly classified record. `J-R/J-H`. |
| `cosmology/inflation-model.md` | `Family A`, `Family-A` | 3, 7, 262 | The family coordinates are stated locally; inflation is explicitly a candidate continuation beyond the taxonomy. `J-C/J-H`; line 3 is navigation. |
| `dynamics/binary-dynamics.md` | `A1`, `A1.3`, `Family-A` | 9, 229 | Two chapter links plus a candidate Family-A ladder whose attractor burden is explicitly open. `M: J-R/J-H`, with line 9 navigation. |
| `dynamics/effective-lagrangian.md` | `Family-A` | 185, 836 | Canonical Family-A chart reference and a stability theorem target, not a stability claim from membership. `J-R/J-H`. |
| `dynamics/energy.md` | `A1`, `Family-A` | 7, 607 | Navigation plus the statement that A1 is only the best-developed member, not the sea definition. `M: J-R`, with line 7 navigation. |
| `dynamics/entropy.md` | `Family-A` | 473, 750, 774 | Terminal-alignment class references inside an open entropy-recovery target. No individual record is classified. `J-R/J-H`. |
| `dynamics/master-equation.md` | `A1.3`, `Family-A` | 807, 813, 912 | A1.3 is tied to the indexed `4:2:1` target and explicitly not claimed closed; Family-A names a target phase space. `J-C/J-R`. |
| `foundations/architrino.md` | `A1` | 230 | `A1 Dynamics` navigation label only. `E`. |
| `foundations/emergence-of-structure.md` | `A1`, `A2`, `B1` | 179, 180, 238 | References to the three prescribed coordinate classes with explicit non-inference of shielding or persistence. `J-R`. |
| `nuclear-atomic/condensed-matter.md` | `A1` | 673 | `A1 Dynamics` navigation label only. `E`. |
| `philosophy-history/agency-and-internal-causation.md` | `A1` | 40 | `A1 Dynamics` navigation label; the surrounding sentence explicitly denies fixed-role and retained-mechanism inference. `E`. |
| `philosophy-history/cosmic-censorship-and-holography.md` | `Family-A` | 20, 36, 67 | Local Family-A axis response plus explicit non-assignment of retention, black-hole identity, or CFT ontology. `J-C/J-H`. |
| `philosophy-history/solving-the-crisis.md` | `A1`, `Family-A` | 186, 612, 806 | Candidate Family-A strong-field flow and two explicit statements that flavor/confinement do not follow from A1. `J-R/J-H`. |
| `philosophy-history/theory-bridges.md` | `Family-A` | 47 | Chapter navigation label only. `E`. |
| `philosophy-history/theory-bridges/angular-momentum-and-spin.md` | `A1`, `B1`, `Family B`, `Family-A` | 7, 19, 217, 219, 221, 233, 241, 245, 255, 273, 275-277, 279, 287, 293, 313, 315, 317, 365, 620, 699, 808, 848, 852, 1451, 1465, 1467, 1480, 1482, 1484, 1486, 1488, 1536, 1541, 1873, 1894, 1930, 1940, 1976, 1986, 2026, 2116, 2124, 2130, 2132, 2176, 2178, 2180, 2242, 2247, 2256, 2258, 2341, 2345, 2403, 3739, 3761, 3768, 3772, 3777, 3778, 3782 | Two locally separated charts: exact B1 common-axis/common-frequency geometry and the complete indexed A1 ordered frame. Spin, holonomy, retention, and action claims remain theorem targets. `J-C/J-H`. |
| `philosophy-history/theory-bridges/planck-scale-nested-shell-braid-alignment.md` | `A1`, `A2`, `Family-A` | 1, 3, 5, 9, 11, 17, 19, 24, 47, 70, 72, 125, 214, 257, 282, 290, 294, 327, 329, 333, 335, 360, 422, 432, 436, 458, 462, 479 | Complete A1 ownership is stated at line 9; Planck/fermion/black-hole mappings are conjectures with a same-record falsifier. Parenthetical `(A2)` and `(A1)` at lines 333 and 335 are local equation/assumption references, not taxonomy. `M: J-C/J-H`, with those two hits `E`. |
| `philosophy-history/theory-bridges/quantum-operator-mapping.md` | `A1` | 9 | Explicit statement that the candidate does not receive an A1 assignment. `J-R` negative boundary. |
| `philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md` | `Family-A` | 332 | Canonical branch-update label in a schematic chain; no new record assignment. `J-R`. |
| `philosophy-history/theory-bridges/special-relativity-noether-braid.md` | `Family-A` | 104, 303, 329, 447 | Family-A response references inside an explicitly open Lorentz-recovery program. `J-R/J-H`. |
| `philosophy-history/treasure-physics-overlooked.md` | `Family-A` | 121, 125, 1090 | Local axis-response coordinates at line 121 and downstream Planck/horizon theorem targets. `J-C/J-H`. |
| `quantum/fermi-dirac-and-bose-einstein-statistics.md` | `A1`, `B1`, `Family-A` | 23, 62, 186, 202 | Exact B1/Family-A distinction with envelope/statistics assignments explicitly beyond taxonomy; line 186 is navigation. `M: J-C/J-H`, with line 186 `E`. |
| `reactions/mode-taxonomy.md` | lowercase `family a` | 11 | Ordinary phrase “which channel family a reaction uses”; not `Family-A`. `E` false positive. |
| `reactions/radiation.md` | `Family-A` | 272 | Canonical symmetry-breaking-point reference in an explicitly conditional strong-field channel. `J-R/J-H`. |
| `spacetime/black-holes.md` | `A1`, `Family-A` | 29, 185, 478, 700, 1117, 1118 | Family-A strong-field mapping is repeatedly marked provisional or heuristic; closing lines include navigation labels. `M: J-R/J-H`, with link-title hits exempt. |
| `spacetime/emergent-metric.md` | `Family-A` | 619 | Terminal-alignment class reference inside an unproved local entropy calculation. `J-R/J-H`. |
| `spacetime/horizon-chirality.md` | `A1`, `Family-A` | 3, 5, 11, 21, 25, 30, 46, 92, 136, 141, 147, 151, 199, 229, 277, 308, 324, 372, 387, 388, 397, 398 | Canonical Family-A alignment/chirality study with source-record roles separated from taxonomy; lines 397-398 are navigation labels. `M: J-R/J-H`, with those closing hits `E`. |
| `spacetime/lorentz-kinematics.md` | `A1`, `Family-A` | 103, 105, 785, 804, 1053, 1055, 1073, 1330, 1359, 1365, 1409, 1451, 1493, 1546, 1569, 1601, 1619 | Complete A1 coordinates and claim boundary at line 105. `Theorem A1` at lines 1451 and 1569 is a local theorem label; line 1619 is navigation. `M: J-C/J-H`, with those three hits `E`. |
| `spacetime/noether-sea.md` | `B1`, `Family A`, `Family-A` | 75, 111, 129, 427, 486, 1028 | Family-A class-selection target and exact B1 chart; neither taxonomy label supplies medium composition or retention. `J-C/J-H`. |
| `spacetime/proper-time-and-time-dilation.md` | `A1`, `B1`, `Family-A` | 775, 788, 931, 933, 947, 1005 | Exact B1 coordinates plus complete concrete A1 clock coordinates and same-record falsifier. `J-C/J-H`. |
| `spacetime/singularity-resolution.md` | `A1`, `Family-A` | 3, 195, 197 | Line 3 is navigation; later uses are heuristic/declared Family-A alignment references with open branch obligations. `M: J-R/J-H`, with line 3 `E`. |
| `validation/architrino-si-base-units.md` | `A1`, `Family-A` | 85, 87, 93, 190, 201, 206, 210, 269, 352, 369 | Complete A1 coordinates and explicit separation of SI/constant claims from taxonomy. `J-C/J-H`. |
| `validation/closure-scorecard.md` | `Family-A`, `Family-B`, `Family-C` | 85, 129 | Canonical taxonomy and work-area labels; no new physical record is classified. `J-R`. |
| `validation/parameter-ledger.md` | `A1`, `C1`, `C2`, `Family-A` | 256, 258-261, 272, 273, 290, 291, 476, 515 | A1/Family-A target rows and navigation mixed with local constitutive row IDs `C1` and `C2` at lines 272-273. `M: J-R/J-H`; the two C-row hits are `E` symbol collisions. |
| `validation/simulations/README.md` | `A1` | 5 | Protocol navigation label only. `E`. |
| `validation/simulations/a0-branch-certificate-protocol.md` | `A1`, `Family-A` | 3 | Complete A1 coordinates and explicit no-retention-before-certificate rule. `J-C/J-H`. |
| `validation/simulations/a0-tier0-result-interpretation.md` | `A1` | 9 | `A1 Dynamics` navigation label only. `E`. |
| `validation/simulations/nested-shell-braid-action-increment-protocol.md` | `A1`, `A1.3`, `Family-A` | 1, 3, 5, 7, 17, 27, 143 | Complete A1 coordinates and `4:2:1` A1.3 constraint; stability and universal action increment remain open. `J-C/J-H`. |
| `validation/simulations/perspective.md` | `A1`, `A2` | 163, 164 | Local observability-axiom labels, unrelated to braid taxonomy. `E` symbol collisions. |
| `validation/simulations/retuning-map-toy-model.md` | `A1` | 3, 72 | Navigation plus an explicit statement that source-record roles do not assign A1. `M: J-R` negative boundary, with line 3 `E`. |

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

The following totals are the **pre-migration ownership baseline** used to decide what could be renamed and what had to remain stable. They are retained as audit evidence rather than presented as current-tree counts.

Excluding this self-describing audit file, the live tracked-tree search finds `Ideal Noether Braid`, `Ideal Braid`, `ideal braid`, `ideal-braid`, or `ideal_braid` in 50 files and 481 matching source lines. One HTML app contains many repeated CSS, DOM, and JavaScript machine spellings, so matching-line count is not a count of independent meanings. The complete file inventory is reproducible with:

```bash
git grep -I -l -E '(Ideal Noether Braid|Ideal Braid|ideal braid|ideal-braid|ideal_braid)' -- . ':(exclude)reference/priorities/braid-program/terminology-audit-2026-07-22.md'
```

Ownership totals:

| Ownership bucket | Files | Matching lines | Interpretation |
| --- | ---: | ---: | --- |
| Reader corpus | 6 | 12 | Guide, app references, and the A1 Lorentz lesson. |
| Public UI/root documentation | 2 | 207 | `ideal-braid.html` and `README.md`; display text and protected DOM/CSS/JS strings are mixed in the HTML file. |
| iOS source | 1 | 2 | Reader-facing launch/display integration with a stable route. |
| Source and tooling | 8 | 78 | Runtime exports, launch registry, source index, scanner, and export tooling. |
| Tests | 5 | 23 | Runtime, launch, scanner, layout, and transport-control contracts. |
| Data and schema contracts | 2 | 8 | Scene/application metadata and solver-app bridge schema. |
| Generated copies and indexes | 13 | 123 | Derived reading copies, source indexes, and scene indexes; do not edit manually. |
| Priority/history material | 13 | 28 | Work logs, evidence packets, and design records. |

The 50 files do not all mean the same thing. Their ownership divides semantically as follows:

| Ownership class | Representative paths | Verdict |
| --- | --- | --- |
| Prescribed geometry | `content/markdown/aaa/archie/ideal-braid-guide.md`, `ideal-braid.html`, `src/apps/ideal-braid/IdealBraidRuntime.js` | The runtime uses three mutually orthogonal default binary normals, unequal radii, unequal frequencies, and convergence toward the common translation direction. This is prescribed A1 geometry, not a generic ideal braid and not A2. |
| Reader-facing app proper name | `README.md`, app title and aria labels in `ideal-braid.html`, reader links in Lorentz and return-cycle chapters, scene/application titles | Renamed to `A1 Lorentz Geometry`. |
| Stable route and filenames | `ideal-braid.html`, `src/apps/ideal-braid/`, `content/scenes/archie/ideal_braid.json`, `ideal-braid-guide.md` | Preserve initially as compatibility aliases. A display-name change does not require route breakage. |
| Stable machine identifiers | app ID `ideal-braid`, scene ID `archie__ideal_braid`, model/config hashes, CSS/DOM selectors, exported runtime names | Preserve. Renaming these has no theory value and creates launch, saved-link, test, and provenance risk. |
| Tests and launch contracts | `tests/ideal-braid-runtime.test.js`, `standalone-app-launch.test.js`, `transport-control-icons.test.js` | Update only reader-facing test descriptions if desired; retain contract assertions. |
| Generated copies and indexes | generated textbook/search/scene outputs and the iOS generated package | Do not edit manually. Regenerate only in an authorized generator-write or final PR workflow. |
| Historical/scratch material | priority work logs, brainstorming fragments, old source packets | Retain when needed as history; current operational prose should adopt the chosen display name. |
| Corrected generic ideality claim | `reference/entourage/roles-geometry-dynamics/system-prompt.md` formerly used an `ideal braid subset` independently of the app | Replaced with the exact prescribed A2 reference-fixture coordinates plus an explicitly unclassified comparison geometry. The app name no longer authorizes a generic ideal class. |

The strongest replacement map by meaning is:

| Meaning | Ranked replacement | Compatibility treatment |
| --- | --- | --- |
| Current app/runtime geometry | `A1 Lorentz Geometry` | Preferred public display name; preserve the existing route, IDs, exports, selectors, hashes, and filenames. |
| A braid record whose exact member is known | Exact member ID, such as `A1 prescribed braid geometry` | State or delegate the defining coordinates; do not infer stability or retention. |
| A prescribed record whose member is not yet proved | `prescribed braid geometry` or `candidate braid` | Keep the source-record ID; do not invent an `ideal` taxonomy class. |
| Broad neutral assembly class | `Noether braid` | Use only when no narrower chart is claimed. |
| Mathematical optimum or limit | Name the optimized functional, boundary, or limit directly | `ideal` is permitted only as ordinary mathematics with the quantity and criterion stated. |
| Historical app name | Quote or mark as historical only where history is the document's purpose | Current public prose follows the selected display name. |

### Compatibility risk

Renaming routes, filenames, app IDs, scene IDs, DOM selectors, hashes, or runtime exports in the same pass would risk broken bookmarks, iOS handoff, scene launch, tests, saved provenance, and generated indexes. The safe architecture is a display-name correction with old machine strings retained as compatibility contracts.

## Decision Implemented

The operator selected the preferred display-only correction (`a`) on 2026-07-22:

1. The public app, guide, scene, link, and operator-facing impact labels now use `A1 Lorentz Geometry`.
2. The app identifies its geometry as prescribed A1 geometry; the display name does not assert a retained branch, stability, or Lorentz recovery.
3. Visible binary labels use persistent `Binary 1`, `Binary 2`, and `Binary 3`; `Reference orbit` replaces the reader-facing positional `Outer orbit` label.
4. Existing `ideal-braid` and `ideal_braid` routes, filenames, app and scene IDs, model/config hashes, DOM/CSS selectors, and runtime exports remain unchanged compatibility contracts.
5. One dated heading, `2026-06-10: Ideal Noether Braid Lorentz Geometry App`, remains in the research notebook as an exact historical title. The scanner exempts only that full line in that one file; the same phrase anywhere else fails the strict gate.

The public-name rule is therefore fail-closed: a new use of `Ideal Noether Braid`, `Ideal Braid`, or `ideal braid` fails unless it is a protected machine string, unrelated mathematical ideality, quoted text, or the one exact historical heading above.

## Scanner Coverage and Expansion

The scanner now has four layers of coverage:

| Enforcement | Terminology classes |
| --- | --- |
| Audit-only corpus inventory | family/member IDs; standalone retired tokens `spindle`, `drum`, `shell`, `nested`, `cap`, `uniaxial`, `triaxial`; positional support/layer/orbit/channel phrases. |
| Strict corpus failures | noncanonical `ideal braid` display names; contextual retired braid names; fixed inner/middle/outer binary identity; positional radius triplets; `I:M:O`; shielding codes `IMO`, `IM-`, `I--`; `HML/HLM` and separated H/M/L triplets; positional coordinate symbols; fixed self-hit/hinge/exterior roles; retired axis-neutral/axis-polarized labels; retired Thomson dressing terminology. |
| Required-definition gate | Persistent indices are not radius/frequency/role sorting, labels do not change under evolution, and Accessory Configuration geometry remains defined in the taxonomy and terminology canon. |
| Borg reader/config gate | Retired shape labels and `extreme tilt` are rejected in source-defined display labels, provenance descriptions, taxonomy labels, illustrative-coordinate descriptions, catalog labels, and visible Borg UI strings. |
| A1 public-display gate | The root README, standalone HTML, scene/application titles, runtime display strings, path-analysis diagnostics, and foundational-impact labels reject the old space-separated display name while leaving hyphenated and underscored machine contracts untouched. |

The expansion made in this campaign is exact and test-backed:

- all 198 corpus Markdown files are strict-scan targets, not a hand-selected migration subset;
- member and family identifiers are audit-only because ordinary theorem/table symbols create unavoidable collisions;
- noncanonical `ideal braid` display names are strict after the operator decision, with one exact file-and-line-content exemption for the dated research-notebook heading;
- seven public-display source surfaces receive a separate space-separated-name scan so that `ideal-braid` and `ideal_braid` machine strings remain exempt without hiding reader-facing regressions;
- comma-separated H/M/L, positional binary phrases with up to three intervening adjectives, and shielding codes are strict;
- Borg prescribed-source and visible-reader strings receive their own semantic scan rather than scanning machine payload keys blindly;
- unit tests cover every new rule, the audit-only/strict split, false-positive-safe inline machine strings, and Borg values.

Remaining false-positive risks are controlled rather than hidden. `A1` through `C2` can be theorem, axiom, or ledger-row labels; `Family A` can be an ordinary grammatical phrase; `shell`, `nested`, and `cap` have many non-taxonomy meanings; and an `inner orbit` can be an independently defined display or boundary role. These classes remain audit-only unless braid context makes the retired meaning explicit. Inline code and fenced code are excluded from prose scanning because stable machine contracts are not terminology authority; dedicated semantic scanners cover reader-facing values inside code where needed.

No newly discovered reader-facing terminology class remains unenforced. Generated artifacts and stable machine IDs are outside automatic replacement by design, not missed scope.

## Validation State

- Strict combined terminology scan: passes, 220 controlled files, zero findings; the corpus component is 198 Markdown files.
- Scanner unit tests: 16/16 pass.
- Targeted scanner, A1 Lorentz Geometry runtime, standalone-launch, transport-control, and markdown-layout tests: 56/56 pass.
- Content-manifest validation: passes in strict check mode with zero errors and zero warnings across 383 scene configs, 198 corpus Markdown files, and 874 repository Markdown files.
- iOS package check: passes against the currently generated reading copies. It must be rerun after those upstream copies are rebuilt.
- `git diff --check`: passes.
- Audit-only member/family and ambiguous retired-token findings remain reportable by design; they are not hidden behind the strict gate.
- Generated scene graph/TOC check: drift in `content/graph/scene_graph.json`, `content/graph/textbook_toc.json`, and `content/generated/markdown/textbook/toc.md`.
- Generated reading-copy check: drift in all 12 textbook reading-copy Markdown files. This check covers the whole corpus, so the drift set is broader than the two source chapters edited by the display-name migration.
- Full-corpus source-index check: drift in `content/generated/source-index/local-full-corpus-snapshot.v1.json`.
- The scene and Markdown index validator checks membership rather than display-field equality; `content/scenes/scenes_index.json` therefore still needs an authorized rebuild to propagate the changed scene title even though validation passes.

Repository policy forbids implicit generator writes during an ordinary edit batch. The exact rebuild sequence, if authorized, is:

```bash
node scripts/validate-content.mjs --write --strict
node scripts/build-scene-graph.mjs --write --strict
node scripts/build-textbook-md-pdf.mjs --write
node scripts/archie-service/build-full-corpus-source-index.mjs --write
node scripts/export-ios-textbook-package.mjs --write --strict
```

After that sequence, rerun the corresponding `--check` commands, the strict terminology scan, the targeted tests, and `git diff --check` before closing the migration.
