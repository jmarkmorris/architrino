# OPS-031 consolidated repair proposal — September 26, 2026

## Decision and scope

**Current status: items 1–3 accepted and implemented; items 4–9 remain proposed.** The operator clarified that mathematical techniques for studying the Master Equation are permitted, then accepted the narrow [reassessment batch](ops-031-master-equation-deviation-audit-2026-09-26.md#implementation-record), including the three Analytic Baselines accounting repairs. The earlier withdrawal of those mathematical repairs was too broad. The separate Action Model observable/weight/editorial proposals and weak-clock velocity notation are not included in this implementation. CRW-005 remains closed.

The implemented Analytic Baselines repairs retain the distinction between exact-law results and finite-width calculations. Finite-width accounting can be internally correct for an auxiliary approximation without establishing motion under the unchanged Master Equation. These repairs neither introduce physical wake thickness nor authorize an unproved singular continuation. The reassessment's related local corrections and three research relocations are recorded in its implementation section. No solver behavior is inferred from this documentation review.

The most consequential correction makes finite-width accounting explicit: contributions between the selected root bands cannot disappear merely because every root was found. The Action Model repair then distinguishes a receiver's acceleration vector from its inferred axis and makes the single transmitter weight unambiguous. The clock row names the coordinate system of its velocity. The remaining changes finish workload qualifications and list structure.

The before/after blocks retain the prepared replacements: items 1–3 are now implementation provenance, while items 4–9 remain proposed instructions. Links inside them are relative to the target chapter. Existing displayed equations and their viewer anchors are preserved. Item 9 would change inline velocity notation while retaining the weak-clock coefficients. No new physical mechanism, solver change, benchmark campaign, general energy proof or corpus-wide rewrite is proposed.

Evidence: [Analytic Baselines review](../../aaa-operations/evidence/ops-031-analytic-baselines-review-2026-09-25.md), [Action Model review](../../aaa-operations/evidence/ops-031-action-model-review-2026-09-25.md), and [Braid Recovery Requirements review](../../aaa-operations/evidence/ops-031-braid-recovery-requirements-review-2026-09-25.md).

## Source comparison before implementation

Use ordinary `git diff` for the three target chapters and compare each current passage with its exact Before block below. Reconcile any intervening edits before applying the replacements.

## 1. Finite-width emission accounting

Target: [analytic-baselines.md](../../../../content/markdown/aaa/validation/simulations/action-energy/analytic-baselines.md). Disposition: **AB-20260925-01**.

Before:

```markdown
  Before the branch average is formed, retain the root-resolved virial rows
```

After:

```markdown
  At finite width $\eta>0$, use the emission-band accounting defined in [Delay-Dynamics Energy](delay-dynamics-energy.md#binary-branch-work-ledger). Each label $T_t$ denotes a band around a reference causal root, and $\mathbf A_{i\leftarrow j}^{(\eta)}(T;T_t)$ is the acceleration contribution integrated over that band. The bands must be disjoint within the modeled emission-history domain. Any contribution from the remaining domain must also be retained; a complete list of roots does not by itself cover a finite-width integral. Before the branch average is formed, retain the band-resolved virial rows
```

Accepted recommendation; medium mathematical scope clarification. For disjoint bands $B_k\subset I$ and complement $C=I\setminus\bigcup_k B_k$, additivity gives $\int_I F=\sum_k\int_{B_k}F+\int_C F$. On $I=[-1,1]$, $g(u)=u$ has one simple root, but the positive integrand $F(u)=\exp(-u^2/\eta^2)$ has a strictly positive integral outside $B=[-1/2,1/2]$ for every $\eta>0$. This proves the missing coverage requirement without asserting an EOM trajectory. The unchanged owner already specifies the partition. Folds and overlapping supports still require the owner's separate treatment. Falsifier: an incorporated exhaustive-band definition already governing these exact rows would make the insertion redundant.

## 2. State when the virial sum is exact

Target: [analytic-baselines.md](../../../../content/markdown/aaa/validation/simulations/action-energy/analytic-baselines.md). Disposition: **AB-20260925-01 continuation**.

Before:

```markdown
  for every retained source/root hit $T_t\in\mathcal C_{ij,b}^{(\eta)}(T)$. The net virial term is then the ledger-preserving sum
```

After:

```markdown
  for every retained source/root band $T_t\in\mathcal C_{ij,b}^{(\eta)}(T)$. When these bands exhaust the modeled emission-history integral for every contributing pair, the net virial term is the ledger-preserving sum
```

Apply together with item 1 and item 3. This qualifies the existing displayed equality without changing its equation-viewer identity or inventing a different regularized model.

## 3. Retain the complement after the displayed sum

Target: [analytic-baselines.md](../../../../content/markdown/aaa/validation/simulations/action-energy/analytic-baselines.md). Disposition: **AB-20260925-01 continuation**.

Before:

```markdown
  on the same active causal-root ledger used by the acceleration residual and energy crosswalk. Thus a small branch-virial residual is meaningful only after transmitter identity, polarity, emission time, Jacobian, transmitter-side acceleration weight, and receiver radial power have survived aggregation over the retained records. When the branch is differentiable after mollification and the same signed causal-root ledger is retained, direct differentiation gives the finite-window identity
```

After:

```markdown
  on the same declared emission-band partition used by the acceleration residual and energy crosswalk. If the root-labeled bands do not exhaust the integral, add the virial and power contributions from the complement explicitly. Thus a small branch-virial residual is meaningful only after transmitter identity, polarity, emission time or band, the applicable acceleration weighting, and delivered power have survived aggregation over the retained records and any complement. For a sufficiently regular modeled trajectory satisfying $d\mathbf V_i/dT=\mathbf A_i$ with the complete modeled acceleration retained, direct differentiation gives the finite-window identity
```

Preserve the following identity in terms of the complete acceleration. This proposal does not resolve the existing trajectory-residual, energy-conservation, or potential-virial obligations O1–O3. The mathematical justification and falsifier are those of item 1.

## 4. Define the receiver record and inferred axis

Target: [action-model.md](../../../../content/markdown/aaa/validation/simulations/action-energy/action-model.md). Disposition: **Action Model E1**.

Before:

```markdown
- Method 3: Directly aligned with hit histories $\{A(T_k),L(T_k)\}$ and therefore the most direct substrate representation among these three options.
```

After:

```markdown
- Method 3: Directly represents the receiver-local acceleration history $\{\mathbf A(T_k)\}$, where $\mathbf A(T_k)$ is the net acceleration vector of a specified receiver at the sampled absolute reception time $T_k$, and $k$ indexes the samples. As explained in [Simulation Perspective](../perspective.md#effective-observables-and-states-quantum-like-layer), a nonzero vector also defines an unoriented inference axis $L(T_k)=\operatorname{span}\{\mathbf A(T_k)\}$, the line through the origin parallel to that vector. The axis is derived from the acceleration record; it is not an independent measurement or a reconstruction of the transmitter ledger. For an isolated contribution, opposite transmitter-ray and polarity assignments can give the same vector; with superposed contributions, the net axis need not coincide with any individual transmitter ray. A zero vector defines no distinguished axis.
```

Accepted recommendation; medium definition repair. The live Perspective chapter, lines 152–169, distinguishes the receiver vector, the inference axis, and hidden emission provenance. The historical snapshot at commit 8d477f41a contains the same distinction; its Action Model diff only adds mathematical formatting to the older pair notation and supplies no competing definition. The recommendation therefore uses the existing observation map, not an invented meaning for $L$. Independently, the nonzero vector determines its span, while zero selects no one-dimensional direction. Vectors $(1,0,0)$ and $(0,1,0)$ sum to $(1,1,0)$, whose axis matches neither contributor: the new qualification prevents treating a net axis as a recovered source ray. These are vector identities, not certified physical histories. Falsifier: a governing observation contract assigning independent data to $L$ would require reassessment; the inspected owner assigns none.

## 5. Apply the transmitter weight once

Target: [action-model.md](../../../../content/markdown/aaa/validation/simulations/action-energy/action-model.md). Disposition: **Action Model E1**.

Before:

```markdown
  - Must retain the transmitter-side factor and transmitter-side acceleration weight from the Master EOM; a reduced test harness that omits either one is a noncanonical approximation rather than a calibration of $\kappa$.
```

After:

```markdown
  - Retain the transmitter-side denominator $D_t$ and its derived acceleration weight $W^{\mathrm{acc}}=c_f/|D_t|$ in the causal-root record. On a simple-root branch, the per-hit acceleration contains this weight once. Recording both quantities does not introduce a second multiplier; changing or omitting the prescribed weight changes the Master Equation and cannot be absorbed into a constant calibration of $\kappa$ over histories with varying $D_t$.
```

Accepted recommendation; medium ambiguity repair. The chapter's existing per-hit equation and the Master Equation distinguish the denominator from its derived weight and from receiver-dependent root playback. With $c_f=1$ and $D_t=1/2$, the weight is two; applying it twice gives four. This is an arithmetic check of the stated rule, not evidence of an implementation error. The varying-history qualification allows a single fixed-denominator benchmark to be rescaled while preventing that special case from becoming general calibration authority. Falsifier: a different governing canonical equation would require a different replacement.

## 6. Qualify grid-method cost

Target: [action-model.md](../../../../content/markdown/aaa/validation/simulations/action-energy/action-model.md). Disposition: **Action Model E2**.

Before:

```markdown
  - Computationally heavy for many-particle dynamics (3D grids, CFL constraints).
```

After:

```markdown
  - Work and storage depend on the three-dimensional grid, required spatial resolution, and CFL-limited time-step count; comparative cost requires measured wall time and memory at matched accuracy on the declared workload.
```

Accepted recommendation; low editorial completion. Grid size and CFL constraints identify workload factors, not measured cost. No benchmark or universal ranking is claimed. Falsifier: a matched-accuracy benchmark governing the original summary could support a specific measured comparison.

## 7. Qualify path-integral cost

Target: [action-model.md](../../../../content/markdown/aaa/validation/simulations/action-energy/action-model.md). Disposition: **Action Model E2**.

Before:

```markdown
  - Costly when many receivers and transmitters are present; bookkeeping grows quickly.
```

After:

```markdown
  - Work depends on the numbers of receivers, reception-time samples, transmitters and causal roots, together with the root-solving and history-reconstruction method; comparative cost requires measured wall time and memory at matched accuracy on the declared workload.
```

Accepted recommendation; low editorial completion. Retains the actual sources of work without claiming a measured ranking. Same evidence limit and falsifier as item 6; no profiling campaign is proposed.

## 8. Repair Method 1 list hierarchy

Target: [action-model.md](../../../../content/markdown/aaa/validation/simulations/action-energy/action-model.md). Disposition: **Action Model E3**.

Before:

```markdown
  - Pros
  - Propagation at fixed speed $c_f$ in the comparison surrogate; expanding causal wake surfaces emerge automatically.
  - Robust on grids; handles inhomogeneous media, damping, and boundaries.
  - Good for full-field visualization and energy bookkeeping in continuum form.
```

After:

```markdown
- Pros
  - Propagation at fixed speed $c_f$ in the comparison surrogate; expanding causal wake surfaces emerge automatically.
  - Robust on grids; handles inhomogeneous media, damping, and boundaries.
  - Good for full-field visualization and energy bookkeeping in continuum form.
```

Accepted recommendation; low structural repair. The parent Pros item is moved to the same level as Cons, with its three existing children indented beneath it. No wording or scientific claim changes. Falsifier: rendered Markdown that does not produce that parent/child structure would require adjusting the indentation.

## 9. Specify effective observer velocity in the clock row

Target: [braid-recovery-requirements.md](../../../../content/markdown/aaa/noether-braid/braid-recovery-requirements.md). Disposition: **BRR-01**.

Before:

```markdown
| Effective metric and weak-field gravity | The braid-bearing Noether sea must export an effective metric whose weak clock row reproduces $d\tau_{\mathcal A}/dt_{\mathrm{eff}}\approx1-U/c_0^2-\|\mathbf w\|^2/(2c_0^2)$, where $U\ge 0$ is the positive Newtonian-potential magnitude and $\mathbf w$ is the clock's group velocity through the local Noether sea. The Newtonian-potential match, effective coupling, and PPN coefficients must follow from one same-record constitutive response rather than be fitted separately. | [Emergent Metric](../spacetime/emergent-metric.md), [General Relativity](../spacetime/general-relativity.md), [PPN Parameters](../spacetime/ppn-parameters.md) |
```

After:

```markdown
| Effective metric and weak-field gravity | The braid-bearing Noether sea must export an effective metric whose leading weak-clock row reproduces $d\tau_{\mathcal A}/dt_{\mathrm{eff}}\approx1-U/c_0^2-\|\mathbf w_{\mathrm{eff}}\|^2/(2c_0^2)$, where $U\ge 0$ is the positive Newtonian-potential magnitude, $c_0$ is the calibrated weak-field observer speed, and $\mathbf w_{\mathrm{eff}}=d\mathbf x_{\mathrm{eff}}/dt_{\mathrm{eff}}-\mathbf u_{\mathrm{sea,eff}}$ is the clock velocity relative to local Noether sea flow in the declared effective observer chart. Here $\mathbf x_{\mathrm{eff}}$ is the clock position and $\mathbf u_{\mathrm{sea,eff}}$ is the sea-flow velocity in that chart. The comparison requires $U/c_0^2\ll1$ and $\|\mathbf w_{\mathrm{eff}}\|^2/c_0^2\ll1$, with the clock conversion defined in [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md). The Newtonian-potential match, effective coupling, and PPN coefficients must follow from one same-record constitutive response rather than be fitted separately. | [Emergent Metric](../spacetime/emergent-metric.md), [General Relativity](../spacetime/general-relativity.md), [PPN Parameters](../spacetime/ppn-parameters.md) |
```

Accepted recommendation; low notation/domain clarification. The clock owner defines $\mathbf w_{\mathrm{eff}}$ separately from native velocity and gives the small-potential/small-speed regime. Rescaling observer spatial units by $a>0$ scales both $\mathbf w_{\mathrm{eff}}$ and $c_0$ by $a$, preserving their squared ratio; inserting an unconverted native velocity would not. Taylor expansion of the declared observer comparison gives $\sqrt{1-2u-b}=1-u-b/2+O((2u+b)^2)$ with $u=U/c_0^2$ and $b=\|\mathbf w_{\mathrm{eff}}\|^2/c_0^2$. The coefficients and recovery-target status are retained. This is an effective comparison, not an imported substrate law. Falsifier: an existing local conversion establishing the intended velocity equality would make the notation change optional.

## Symbol trace and evidence boundaries

A literal `rg -n -F` search for `A(T_k)`, `L(T_k)` and `hit histories` across `content/markdown`, `reference`, `src`, `scripts` and `tests` (excluding JSON) found the paired notation in Action Model and its review records, and the receiver-vector observation map in [Simulation Perspective](../../../../content/markdown/aaa/validation/simulations/perspective.md#effective-observables-and-states-quantum-like-layer). Focused reads of that owner's lines 152–169 identify $L$ as the unoriented inference axis. Inspection of the actual Action Model diff at commit `8d477f41a` shows formatting of the pre-existing pair, not a new definition; the same commit's Perspective source already separates the vector from the axis. This is bounded provenance evidence, not a claim to have located the original author or searched every notation variant. The proposed vector/axis distinction is source-supported; the span, zero-vector and superposition arguments above independently establish its mathematical limits.

## Dependencies and application plan

Direct owners inspected are Delay-Dynamics Energy's Binary Branch Work Ledger, the Master Equation's distinction between transmitter weight and root playback, Simulation Perspective's observation map, and Proper Time and Time Dilation's native/effective chain rule and weak-clock comparison. They already supply the definitions needed by this batch; no edits to those owners are proposed.

A literal target-basename search of `scripts/`, `tests/`, `src/` and `.github/` returned no matches. That does not establish absence of generated consumers: `scripts/build-equation-mapping-corpus.mjs` scans the corpus and exports equations with surrounding context to `content/generated/equation-mapping/corpus-equations.json`. The proposal preserves the existing equation anchors, target filenames and headings. Recheck bindings and compare the current source passages using Git before implementation; preserve historical receipts. Generated writes retain their existing authorization procedure.

After implementation approval, apply these exact replacements, read each full edited chapter and its direct affected passages, and check source matching, Markdown structure, links and mathematical notation. Consequential scientific corrections require the periodic-review owner's separate review against the independent references above. No solver run is needed to establish the integral-additivity or coordinate-consistency statements, and no new regular test regime is proposed.

The simple-root wording preference and repeated-summary consolidation remain optional and outside this batch. Action Model and Analytic Baselines O1–O3 remain scientific obligations at their existing owners. No newly introduced mathematical regression is asserted, and source editing will not advance scheduled whole-chapter coverage.

## Preparation checks

The exact-occurrence helper first passed known repeated and absent strings before reading the targets. Its initial run caught an incorrect source-line selection for item 2 before any proposal was written; the selection was corrected to the actual sentence. All nine before excerpts then matched their current source exactly once. These checks establish proposal applicability, not mathematical correctness. Mathematical support consists of the explicit integration, vector, weight and coordinate arguments above. No corpus file has been written by preparation.

The task-local Node check passed known inline-math, fenced-block and nested-list cases before testing this proposal. It then verified all eighteen before/after blocks against the prepared replacements, unique current-source matches, strict KaTeX syntax for proposed inline mathematics and explanatory arguments, relative file-target existence, and a nested Pros list using the installed Marked renderer. Link-anchor existence was checked by direct heading inspection for the three inserted chapter links. Scoped Git whitespace checks emitted no diagnostics for this proposal and the two updated control documents. This is author self-review and bounded syntax/structure verification, not a separate mathematical review, browser visual audit or source implementation.
