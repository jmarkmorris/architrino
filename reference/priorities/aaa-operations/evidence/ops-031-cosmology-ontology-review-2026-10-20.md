# OPS-031 Cosmology Ontology review — October 20, 2026

## Scope and disposition

The due supporting-class review covers the whole [Cosmology Ontology chapter](../../../../content/markdown/aaa/cosmology/cosmology-ontology.md), read in contiguous source ranges 1–180, 181–360, 361–540 and 541–682, with the pair-shape, rotation, mass-source and final source passages reread. **No actionable substantive defect or necessary editorial correction was established.** This is a bounded no-change disposition, not cosmological theory closure or certification of every historical/source assertion.

The frozen source is retained in `.tmp/ops-031-oct20/ontology/source.md`. Native `shasum -a 256` on the frozen and live chapter returned the same identity before closeout: `0dc4d1ad5ab8657e954feb90513183cf8683c416f4cfa3403c53c2e4f4b41d2b`. This also equals the final 682-line identity recorded by the [September 12 review and repair receipt](../../aaa-corpus-rewrite/evidence/crw-005-cosmology-ontology-review-2026-09-12.md). These byte comparisons support reuse of its historical passage mapping; they do not independently validate its sources or proofs. No chapter or shared control record was edited by this worker. The coordinator owns coverage credit, referrals and due dates. CRW-005 remains closed.

## Review basis and independent checks

The live AGENTS instructions, generated startup router, review skill owner, corpus-reviewer procedure, periodic-review procedure and theory orientation supplied the authority and evidence boundaries. Relevant academic/math guidance, mathematical terminology, source/disclosure policy and geometry/dynamics lens were consulted. Nearby context was inspected in the opening substrate/effective distinctions of [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Expansion Mechanism](../../../../content/markdown/aaa/cosmology/expansion-mechanism.md), and [Cosmology Reconstruction](../../../../content/markdown/aaa/cosmology/cosmology-reconstruction.md). These are dependency reads, not additional whole-path coverage.

The chapter explicitly distinguishes the fixed spatial postulate from proposed recycling, medium response, thermalization and observational recovery. Its effective FRW equations define a length-valued scale factor and inverse-time-squared cosmological-constant convention, keeping energy density and mass-equivalent density separate. Expansion Mechanism uses a separately declared dimensionless normalization; that difference alone is not an inconsistent equation. The source chapter states the curvature, time and density conventions needed locally.

The review checked the scalar mass-source product rule, frequency mixing, bounded entropy versus full-state recurrence, radial-template identifiability, normalized pair information loss, fixed-record versus full-family prediction, finite measure domains, and nonempty/global truth conditions. The independent references for those checks are the product rule, linear superposition, vector cross-product orthogonality, probability normalization and elementary set logic. No EOM solver execution, physical simulation or empirical data reanalysis was performed. External literature was not reopened in this pass; the September receipt identifies its inspected external scope, which is not upgraded to fresh verification here.

For example, normalized pair-shape agreement remains correctly narrower than homogeneity: scaling all positions scales the RMS separation by the same factor, leaving every normalized separation unchanged; rotating all positions leaves distances unchanged. Neither operation preserves all counts-per-volume or directional information. The local passage explicitly names those missing tests. Likewise, a vanishing global-claim disagreement indicator need not mean the claim is true: it also vanishes on a family on which the claim is uniformly false. The chapter explicitly requires nonempty observationally admissible families and truth throughout them before supporting a global claim.

## Two previous accepted repairs rechecked

The accepted before/after repair record is the September 12 receipt linked above. Both checks below remain within today's due supporting class and add claim-level checks, without additional whole-chapter credit.

**CO-04, duplicate dilution removed; current lines 203–216.** The preserved pre-repair formula subtracted a dilution integral after comparison volume had already been included. Current text defines the effective comoving mass as density times scale factor cubed and integrates only the effective source times that volume. Independently, the product rule gives

$$
\frac{d(\rho_m a^3)}{dt_{\mathrm{eff}}}
=a^3\left(\frac{d\rho_m}{dt_{\mathrm{eff}}}+3H\rho_m\right)
=a^3\mathcal S_m.
$$

These shortened symbols refer only to the chapter's effective dust comparison. For the declared analytical example with normalized wake speed $c_f=1$, set $a=t_{\mathrm{eff}}$, $\rho_m=1$, $H=1/t_{\mathrm{eff}}$, and $\mathcal S_m=3/t_{\mathrm{eff}}$ on $[1,2]$. Endpoint mass changes by $8-1=7$; the source integral has integrand $3t_{\mathrm{eff}}^2$ and also equals $7$. A second dilution subtraction would instead give zero. **Correctness:** survives. **Preserved meaning:** the quantity remains comparison mass in a declared comoving volume, not primitive mass creation. **Usefulness:** the explanation prevents the same volume change being counted twice. **Falsifier:** a different definition of the claimed mass or a sourced continuity equation inconsistent with the stated assumptions would require reassessment.

**CO-10, radial rotation blindness; current lines 369–414.** The historical repair replaced an overbroad rotation/quadrupole interpretation with the identifiable radial template. Substituting the tracer displacement $D_i\hat{\mathbf n}_i$ into the original expression gives an extra term proportional to $\hat{\mathbf n}_i\cdot(\boldsymbol\omega\times\hat{\mathbf n}_i)=0$. The remaining term is the declared profile difference times one fixed vector dotted with the sightline: it is a dipole at fixed distance. A constant profile therefore gives zero for any rigid rotation in this radial observable. In a normalized illustrative case with $c_f=1$, choose sightline $(0,1,0)$, angular-rate vector $(0,0,2)$, observer-minus-center vector $(3,0,0)$ and distance $4$. The original expression gives zero for equal profile values and $6$ for profile values $2$ and $1$, as does the analytical reduction. The scratch witness checked known basis cross/dot products before these target examples; the retained script and output are `.tmp/ops-031-oct20/ontology/rechecks.cjs` and `rechecks.txt`. **Correctness:** survives. **Preserved meaning:** a conditional effective radial diagnostic, not a primitive acceleration law or test of every rotational motion. **Usefulness:** the null-result and parameter-identifiability limits remain explicit. **Falsifier:** a nonzero constant-profile radial result under these exact displacement assumptions would contradict the algebra; adding a different observable changes the test's scope rather than overturning this one.

The coordinator retains responsibility for the batch's separate previous no-change recheck; today's new whole-path no-change disposition is not substituted for that retrospective requirement.

## Rejected concern and limits

An initial concern that the pair-distribution display used a frequency symbol instead of its declared separation variable was rejected after raw-source inspection. `nl -ba` shows line 433 ends the opening parenthesis and line 434 starts the literal separation variable `u`. A serialized newline escape had visually resembled a symbol. The source correctly uses $u$ throughout that display and its normalization. No correction is proposed, and no missed defect or introduced regression is inferred from this rejected concern.

The chapter's SMBH recycling/yield, shared physical history, finite-sky/entropy realization, effective metric/clock/transport and observer-measure obligations remain open at their stated grade. The present algebraic checks do not realize those mechanisms, supply a cosmological branch, or establish global chronology/topology. A derivation, independent data result or changed upstream contract contradicting a particular current passage would overturn this bounded no-change disposition at that scope.

## Validation and model record

The unchanged existing checker was run with:

```bash
node .tmp/ops-031-effective-proposal-oct12/validate.mjs content/markdown/aaa/cosmology/cosmology-ontology.md
```

It printed passing known math/code/blockquote/fenced-link and valid/invalid TeX controls before inspecting the target, then reported **216 math spans, 34 displays, 34 equation-viewer links and 52 local file targets**, with all checked TeX parsing and file-existence assertions passing. Its scope excludes remote source availability, fragment resolution, visual layout and scientific correctness. Output is retained at `.tmp/ops-031-oct20/ontology/syntax-check.txt`.

Reviewer lineage is the current Codex worker under the coordinator's inherited model/settings; the exact runtime model identifier is not exposed to this worker. No model adoption or superiority claim is made, and this pass is not the model-comparison pilot. Review time and operator burden were not instrumented; no cost or defect-prevalence estimate is reported. No substantive source changes, generated writes or publication actions were performed.
