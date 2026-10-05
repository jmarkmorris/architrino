# OPS-031 — coincident-midpoint three-binary dynamics review, 2026-10-05

## Scope and disposition

✓ Done — report-only review of [Zero-Axial-Offset Three-Binary Dynamics and Interpretation](../../../../content/markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md), the core-theory reservation formerly described as Nested Shell Braid Dynamics. Whole-file coverage is lines 1–535, measured by `wc -l` and read in contiguous `sed` ranges 1–135, 136–270, 271–405, and 406–535. No chapter section is left as an unread cursor. This is coverage of one chapter, not completion of a core-theory cycle or scientific acceptance.

The frozen source SHA-256 is `c6eb72681617d1b17432d5a46b9dec1dfb94443b9fd41c3b7d9a3aeb054bed5a`, measured by `shasum -a 256` before the substantive review and again on `.tmp/ops031-oct05-nested/source.md`. The assigned source and this report showed no existing local changes in the scoped `git --no-optional-locks status --short` inspection at intake. That observation says nothing about other paths.

The substantive disposition is one proposed correction to an undefined branch-transition criterion, with one optional clarification. Retention, fixed-action quantization, shielding, generation assignment, strong-field realization, and Lorentz recovery remain explicitly open in the chapter; their incompleteness is not counted as a newly demonstrated defect. No substantive corpus edits, shared control-record edits, generated writes, tests, simulations, or publication were performed by this worker. The parent coordinator owns shared scheduling and prior-correction controls.

Reviewer: current Codex worker, same model lineage as the coordinator's October 4 evaluation. No model comparison, independent-reviewer agreement, or superiority claim is made. The mathematical reference below is an explicit closed-form counterexample and the regular-root theorem, not another agent's agreement. Wall time and operator review burden were not measured.

## Live sources and review limits

The procedure was selected through `AGENTS.md`, the generated startup router, the architrino-review skill owner, the corpus-reviewer prompt, and [Periodic corpus and priority review](../../../op/periodic-document-review.md). The report follows the live operator explanation and academic claim-grading requirements. Task-relevant notation and terminology were checked in the mathematics style guide, mathematics terminology, terminology usage, and the theory orientation guide; About Architrino's reference and disclosure policy was read. Preparation used the geometry/dynamics role packet as a lens, not as scientific authority.

The directly relevant scientific references are:

- [Spatial (3D) Braid Assemblies](../../../../content/markdown/aaa/noether-braid/3d-braid-assemblies.md), lines 1–140: persistent binary identities, zero axial offset, and the prescribed orthogonal-to-coincident-axis response. This resolves the apparent objection that terminal coincidence necessarily contradicts the configuration: the live taxonomy expressly includes that response endpoint, without establishing an evolved branch.
- [Braid Recovery Requirements](../../../../content/markdown/aaa/noether-braid/braid-recovery-requirements.md), lines 1–100: retention is a conjunction of same-record obligations; downstream success cannot close missing dynamics or stability conditions.
- [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), lines 970–1036: regular simple roots move continuously without a root-count event; a generic fold changes unsigned count by two while preserving signed degree.
- [Candidate Braid Analysis Methodology](../../../../content/markdown/aaa/noether-braid/braid-analysis-methodology.md), lines 60–125 and targeted root-ledger passages: emitted geometry, delays, and weights depend on the paths; continuous changes require recomputation without themselves certifying a topology change.
- [Mathematical Terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), causal-set and root-ledger entries: a root ledger is integer bookkeeping of active branches. That canonical intended reading is respected in the qualification below.
- The Braid Program's [charter](../../master-equation-closure/braid-program/README.md), [live state](../../master-equation-closure/braid-program/priorities.md), [queue](../../master-equation-closure/braid-program/work-queue.md), and [method](../../master-equation-closure/braid-program/contracts/method.md): task-relevant ownership, screening/evolution distinction, and retuning/action status. Targeted reads and `rg` excerpts establish only these dependencies; they are not complete reviews of those owners.

The target appears in `content/graph/textbook_toc.json` by exact-path `rg`; the parent selected this single reserved chapter. No custom extractor or checker was built or run on the target. No external factual claim was acquired, and no external source was treated as inspected. Numerical instantiation of the causal-root witness uses $c_f=1$.

## Proposed correction: separate constraint increments from branch identity

○ Not done — proposed, awaiting owner adjudication. Classification: moderate mathematical-definition defect in an unqualified criterion, not a demonstrated physical branch or a rejection of the retuning hypothesis. Location: chapter lines 133–164, especially line 164.

The chapter declares a closure residual $\mathcal C_q(\mathbf y,\mathcal G)=0$ that collects integer phase closure, causal-root, separator, inter-layer exchange, and stability conditions. Its first-order preservation equation is

$$
D\mathcal C_q[\Delta\mathbf y]+\Delta\mathcal C_{\mathcal G}=0.
$$

Here $\mathbf y$ contains the logarithmic cadence, radius, and envelope variables, while $\mathcal G$ supplies the root and exchange ledger. The symbol $\Delta\mathcal C_{\mathcal G}$ is introduced without defining which ledger components it varies, whether it is a differential or finite jump, or whether the map from ledger identity to this increment distinguishes every relevant change.

**Before, exact passage:** “If $\Delta\mathcal{C}_{\mathcal{G}}=0$, the retuning stays on the same causal-root ledger. If $\Delta\mathcal{C}_{\mathcal{G}}\neq0$, the event is a branch transition and must be treated as a separator crossing or causal-locus reconnection rather than as smooth single-braid drift.”

A change in one contribution to a constraint equation does not by itself establish a change in the discrete active-root identities. Conversely, a zero increment of a compressed constraint quantity does not establish that the complete ledger is unchanged. The first-order equation says that two contributions compensate; it does not establish the topology of their inputs.

### Closed-form regular-root witness

Consider a stationary transmitter at the origin, receiver event at $T_r=0$ and position $(1+\eta,0,0)$, and the retained emission interval $[-2,-1/2]$, with $|\eta|<1/4$ and $c_f=1$. The causal residual is

$$
g(T_t;\eta)=1+\eta+T_t.
$$

Its unique root is $T_t=-(1+\eta)$. It lies strictly inside the retained interval, the range is positive, and $\partial_{T_t}g=1$. The root count, transmitter identity, and root sign are unchanged as $\eta$ varies. There is no fold, endpoint crossing, or reconnection. This is a prescribed causal-geometry witness; no Master-Equation acceleration balance or physical retention is claimed for it.

Let $\ell=1+\eta$ denote that root's continuous delay and let $y=\ln(1+\eta)$ denote the logarithmic separation coordinate. Writing the root constraint in this chart as $C(y,\ell)=\ell-e^y=0$ gives, at $\eta=0$,

$$
D_yC[\Delta y]=-\Delta\eta,
\qquad
D_\ell C[\Delta\ell]=\Delta\eta,
\qquad
D_yC[\Delta y]+D_\ell C[\Delta\ell]=0.
$$

The delay contribution is nonzero while the discrete root ledger stays fixed. This disproves the line-164 implication under a reading in which $\Delta\mathcal C_{\mathcal G}$ includes continuously varying root/exchange data. It does not disprove the alternative intention that $\mathcal G$ contains only discrete identities. The distinction must be supplied by the chapter, rather than inferred from the symbol.

Even for discrete bookkeeping, a projected value must distinguish the relevant transitions before zero change can certify ledger identity. The canonical fold example $F(u;\eta)=u^2-\eta$ illustrates the problem: its signed degree is zero on both regular sides, although unsigned count changes from zero to two. A degree-only increment would be zero at a real root event. This example does not claim that the chapter's undefined $\Delta\mathcal C_{\mathcal G}$ is degree-only; it identifies the missing condition on any proposed compressed test.

> Claim grade: derived for both counterexamples under their displayed assumptions. The independent reference is direct substitution and differentiation, supplemented by the Master Equation's regular-root and fold statements. Falsifier of the source-specific concern: an existing definition or proof showing that $\Delta\mathcal C_{\mathcal G}$ excludes all continuous ledger changes and is zero exactly when the full relevant discrete branch identity is unchanged. Such a definition would defeat this interpretation of the concern. It has not been supplied in the reviewed passage.

**Smallest proposed after:** “On a regular branch chart, continuous root and wake-exchange data may vary while the discrete active-root identities remain fixed; their contributions must satisfy the first-order closure equation together. Branch preservation additionally requires unchanged discrete ledger identities and maintained root, separator, and stability margins. A change in the discrete ledger, or loss of one of those admissibility conditions, must be treated by the corresponding event or chart-boundary analysis.”

This correction preserves the retuning equation and the positive idea of one compatible closure record. If the owner instead intends $\Delta\mathcal C_{\mathcal G}$ exclusively as an injective encoding of discrete jumps, the smallest alternative is to define that restriction explicitly and keep continuous exchange variations in a separately defined differential term. No new validator, gate, or ledger is needed.

The consequence is operationally specific: the current wording can classify a compensating smooth geometric change as a root event, or treat an unchanged compressed quantity as evidence of branch preservation. The proposed wording bases those decisions on the actual root/event domain. No claim is made that such a misclassification has occurred in the EOM solver or in a scientific receipt.

## Optional clarification: state what is held fixed in scaling

○ Not done — optional explanatory improvement, not a demonstrated algebraic error. Locations: lines 249, 267–296, and 308–322.

The chapter's formulas contain the factor $p_a^{(q)}/\mu_a^{\mathrm{rot}}$, where $p_a^{(q)}$ is the action share in binary $a$ and $\mu_a^{\mathrm{rot}}$ is its effective rotational response coefficient. Reading these as fixed coefficients on the comparison chart makes the stated exponents correct. The chapter later allows environmental dependence, so naming the fixed quantities at the point of the exponent calculation would help prevent extrapolation across environments or branch changes.

**Before:** “This special branch gives” the fixed-speed exponents $R_a\propto N$, $v_a\propto N^0$, and $f_a\propto N^{-1}$.

**Proposed after:** “Holding $p_a^{(q)}/\mu_a^{\mathrm{rot}}$ and $\beta_a$ fixed across the compared rest levels gives” the same exponents. For the bare inverse-square estimate, also state that $K_a\mathcal B_a$ is held approximately constant.

The algebra can be checked without a solver. Define the positive action product $L(N)=p_a^{(q)}Nh_{\mathrm{act}}/(2\pi\mu_a^{\mathrm{rot}})$ and the positive radial coefficient $Q=K_a\mathcal B_a/4$. The two declared equations are $Rv=L$ and $Rv^2=Q$, whence

$$
v=\frac QL,
\qquad
R=\frac{L^2}Q,
\qquad
f=\frac{Q^2}{2\pi L^3}.
$$

Thus $L\propto N$ and constant $Q$ give $R\propto N^2$, $v\propto N^{-1}$, and $f\propto N^{-3}$ as printed. Variation of the coefficients alters those exponents. The fixed-$q$ notation already permits the intended constant-coefficient reading, so this is classified as optional clarification, not an additional hard finding.

> Claim grade: derived for the displayed algebra; inferred for the usefulness of the added sentence. Falsifier of the editorial need: a clear local declaration that all these coefficients are fixed along the compared segment. Falsifier of the algebra: substitution of the displayed $R,v,f$ failing either product or radial-balance equation for positive $L,Q$.

## Preserved conclusions and open obligations

✓ Done — the following claim distinctions survived the whole-file review at their stated scope; these observations are measured by the contiguous source reads and the named nearby-canon checks, not by evolution or particle measurements.

- The fixed action unit is explicitly an independent hypothesis rather than a consequence of winding or root count (lines 77–93 and 200–202). The chapter correctly separates interior fold pair creation from a physical action amount. The mathematical regular-root/fold reference supplies the independent distinction; action-scale closure remains open.
- The circular action and energy projections are explicitly reduced branch bookkeeping rather than primitive architrino mass (lines 216–243 and 329–350). The displayed energy substitution gives the printed radius and speed expressions algebraically, conditional on positive projection coefficients. It does not establish an energy law for the substrate.
- The equal-sphere packing coefficient is compatible with the elementary face-centered-cubic construction: cubic cell edge $2\sqrt2R_{\mathrm{excl}}$, four centers per cell, and number density $4/(2\sqrt2R_{\mathrm{excl}})^3=1/(4\sqrt2R_{\mathrm{excl}}^3)$. This checks an achievable construction, not the global maximality theorem. No independent proof or external verification of global densest packing was performed here; that upper-bound wording remains a review limitation. The chapter makes the transfer from channel radius to full envelope conditional on a boundary-leading certificate.
- Generation, horizon, Planck-scale, and dipole-quiet assignments retain explicit unsupported or theorem-target status (lines 486–514). The phase-compensated equal-geometry dipole result is expressly withheld from the general coincident-midpoint record. This prevents a member-specific theorem from being promoted by analogy.
- The terminal axis-alignment condition agrees with the prescribed taxonomy response in Spatial (3D) Braid Assemblies. No conflict is raised solely because the axes begin orthogonal and end coincident. Retention and a physical endpoint interpretation remain separate obligations.
- The final dynamics section explicitly says the mechanism program is open (lines 529–535). This whole-file review does not close that program, validate an evolved branch, or extend narrow ring findings to this configuration family.

The reserved chapter's review cursor is complete. Remaining action is owner adjudication of the criterion clarification; the optional scaling sentence does not block that decision. Prior accepted-correction controls, broader inventory counts, historical CRW dispositions, and capacity planning remain with the coordinating OPS-031 pass.
