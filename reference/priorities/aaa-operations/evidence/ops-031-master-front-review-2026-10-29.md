# OPS-031 — Master Equation front review, October 29, 2026

## Scope and source

This report-only review covers source lines 1–2095 of [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), ending immediately before Exact Fixed Point-Cloud Residual. This is a partial-chapter receipt; the parent owns the remaining reading, adjudication, owner referral and any whole-chapter credit. One bounded explanatory correction group is proposed, not implemented. CRW-005 remains closed.

Native `shasum -a 256` before and after review returns `a3fa7047b1347c8743d385a12e38c9994dc1d25dcf63037a53a727670db95267`; native `cmp` matches the frozen `.tmp/ops-031-master-oct29/master-equation.md`. Complete source reads covered 1–330, 331–653, 654–980, 981–1362, 1363–1750 and 1751–2095. The aggregate output for 981–1362 was clipped at its beginning, so 981–1156 was reread separately; all assigned lines were inspected. No source, shared control, independent reference instrument, generated asset or scientific output was changed.

The live AGENTS.md, startup router, corpus-reviewer, review skill owner and periodic-review procedure govern this pass. Nearby Architrino acceleration/normalization definitions, relevant Archie style/terminology passages and the geometry/dynamics role lens were consulted at bounded scope. Continuing Codex lineage is unchanged; no materially different model is adopted and no model-superiority claim is made. Review time and operator burden are unmeasured.

## MFR29-01 — Limit the forward-density monotonicity claim to its actual domain

**Severity: low; classification: demonstrated explanatory error, one group with two fragments.** Target lines 1793 and 1908. The formulas correctly retain the absolute transmitter denominator, but two explanatory sentences assert a monotonic direction rule without its sub-field-speed restriction. In normalized wake-speed units, at fixed local line direction and transmitter projection $v_\parallel=\hat{\mathbf r}\cdot\mathbf V_j$, the per-root weight is $W=1/|1-v_\parallel|$. It increases with $v_\parallel$ only on the side $v_\parallel<1$. On the side $v_\parallel>1$, it decreases as that projection increases. Forward motion therefore need not imply greater per-root density than the stationary normalization.

Exact first before sentence, within line 1793:

> Motion of the transmitter toward the active branch increases that density; motion away from the branch decreases it.

Proposed first after:

> At fixed local line direction, increasing the transmitter velocity projection toward the receiver increases this density while the projection remains below $c_f$; a negative projection lowers it relative to a stationary transmitter. Above $c_f$, increasing that projection instead increases $|D_t|$ and decreases the per-root density. The simple-root expression does not apply at $D_t=0$.

Exact second before paragraph, line 1908:

> so transmitter motion compresses the emitted surface density in forward directions and dilates it in trailing directions. This is a transmitter-history effect, not a receiver-cadence multiplier and not an imported observer-level field law.

Proposed second after paragraph:

> so, for $0\le\beta_f<1$, transmitter motion compresses the emitted surface density in forward directions and dilates it in trailing directions. For super-field-speed motion, the absolute denominator governs each retained branch, and a forward direction need not have greater weight than the stationary normalization. This is a transmitter-history effect, not a receiver-cadence multiplier and not an imported observer-level field law.

**Independent reference, derived at prescribed-history grade.** Set $c_f=1$, reception time zero, receiver position zero and transmitter path $X_j(s)=3s+2$ on a line. At emission $s=-1$, the transmitter is at $-1$, the delayed separation is one, and the causal equation is satisfied. The line direction is positive, the transmitter projection is three, $D_t=1-3=-2$ and the legal simple-root weight is $1/2$, below the stationary value one. No speed cap, modified acceleration law or assumption that this prescribed path is an evolved solution is introduced. This path also has another causal root at $s=-1/2$; the counterexample concerns the stated contribution of the first individual root, not a comparison of total acceleration sums. Every admitted root must still be included in the full law.

The in-session Node arithmetic first passed known static $W(0)=1$, receding $W(-1)=1/2$ and sub-field-speed approaching $W(1/2)=2$ controls. Only then it evaluated the prescribed target and returned causal distance one, direction positive, $D_t=-2$ and weight $1/2$. The elementary derivative of the two branches of the absolute-value reciprocal is the independent mathematical reference; the arithmetic is not a scientific evolution or root-completeness test.

**Consequence:** the current prose gives the wrong qualitative direction for lawful super-field-speed individual branches even though the printed formula is correct. The smallest repair qualifies only these two explanations. Preserve the emission postulate, all equations, the absolute denominator, all-root sum, receiver-playback distinction and singular-root exclusions.

**Falsifier:** a domain restriction to $\hat{\mathbf r}\cdot\mathbf V_j<c_f$ applying to both explanations would remove this missing qualifier. The chapter expressly permits super-field-speed branches and defines the uniform-transmitter example without a sub-field-speed bound. A different propagation/emission law would change the formula and require a separately authorized scenario, not justify the current unrestricted statement. No causal attribution to an editor or historical repair is established.

## No-change dispositions at the inspected scope

| Read scope | Retained result and independent reasoning | Reopening condition |
| --- | --- | --- |
| 1–164: receiver-local law and delta collapse | Differentiating distance gives $g_{T_t}=D_t$ and $g_{T_r}=-D_r$. Implicit differentiation gives playback $D_r/D_t$; fixed-reception delta collapse gives $c_f/|D_t|$, with no receiver factor in acceleration. | A changed causal support or a residual under the same regular-root definitions. |
| 165–331: autonomous surface geometry | Fixed center and radius $c_f(T-T_e)$ give speed $c_f$ for each surface point. Differentiating the alternative extrapolated center with respect to emission time gives the stated acceleration-times-age term; the alternative changes causal geometry. | A fixed-speed emitted sphere with the alternative normal under the same rules. Instrument-specific historical measurements were not rerun. |
| 332–548: caustic and action-residual boundaries | An ordinary transverse fold gives inverse-square-root strength and a two-branch integral bounded by $4C\sqrt\varepsilon$. The action residual is only a necessary receiver-side test. Finite impulse is not unique continuation. | A claimed nontransverse/simultaneous-collision transit accepted by this ordinary-fold estimate, or a promotion of the receiver residual to a full action proof. |
| 549–653: chart, history compatibility and gluing | Positive root derivative and positive separation support the stated implicit-function calculation. Section stability, controlled inverse and overlap consistency remain separate conditions. The set-valued construction does not assert a sheaf or homology theorem. | An inverse or global gluing claim based solely on root labels and no stated bounds. |
| 654–912: auxiliary regulator and energy | Distinct width/core limits preserve canonical positive-separation recovery as a conditional target. Coordinate coincidence is distinguished from zero causal delay. Energy/statistical rows remain diagnostics without a proved action/boundary account. | Treating the auxiliary diagonal value or a diagnostic as a canonical continuation/conserved charge. |
| 913–1269: root degree, starvation and self hits | Ordinary $u^2-\lambda$ has opposite-sign root pair and degree zero; $u^3-\lambda u$ keeps signed degree one while count changes at higher degeneracy. Projection yields forward-delay lower bound; memory exits can change degree singly. Triangle inequality yields necessary interval speed, not sufficient root existence. | Confusing boundary exit with a fold, monotonicity with root existence, or super-field-speed history with guaranteed self hits. |
| 1270–1362: two-leg delay checkpoint | Positive sub-field-speed return delays yield the printed length/period relation upon imposing equality. Two directional values do not specify an angular mean; full angular and accelerated response remain explicit targets. | A claim that this loop alone derives a full three-dimensional clock/observer response. |
| 1363–1533: canonical acceleration | Polarity, historical-to-current direction, transmitter-only weight and endpoint exclusion agree with nearby Architrino definitions. Fixed-hit absence of acceleration input does not settle radiation transport. | A changed root kernel, receiver multiplier, admitted zero-delay kick or radiation conclusion inferred solely from inverse-square acceleration. |
| 1534–1750: local scalar representative | At fixed history, $\nabla s=-\mathbf n/D$ and $\nabla r=c_f\mathbf n/D$; constant branch sign makes $-\nabla(C\,\mathrm{sgn}D/r)$ equal the canonical row. Finite sum linearity is distinct from adding a dynamically evolved architrino. Global extension and infinite-sea differentiation need separate conditions. | Mixing histories/sign charts or inferring action, conservation or physical realization from the local gradient identity. |
| 1751–2095: kinematics, power and translating pair | The instantaneous along-line component and kinetic-proxy power are scoped to one hit. Successive-hit distance includes root motion. Direct substitution of $y=1/p$ gives $D_t=c_f\alpha p$, the general orientation vector and perpendicular projection. Opposite transverse separations retain equal longitudinal components; the nonzero pair sum blocks a fixed-point-cloud translating solution. | Erasing the longitudinal residual, claiming orientation-independent transverse scaling, or promoting a prescribed geometry to an evolved assembly. MFR29-01 repairs only the overgeneralized density explanation. |

These dispositions do not certify external source currency, numerical-instrument measurements, evolved solutions, global well-posedness, self-inclusive coincidence continuation, action conservation, radiative energy current or observer-level physical recovery. Existing open proof targets remain open. No cleaner-sounding rewrite is proposed for valid passages.

## Validation and handoff

The unchanged `.tmp/ops-031-effective-proposal-oct12/validate.mjs` passed its known math/code/blockquote/fenced-link and valid/invalid TeX controls before checking the source. It accepted 1696 math spans, 415 displays/viewer links and 431 local-file occurrences across the whole file. Those are syntax/file-existence results, not whole-file mathematical-review credit, arbitrary fragment validation or browser rendering. Native final `cmp` and `shasum -a 256` confirm source preservation.

The coordinator must combine this partial receipt with the remaining ranges before claiming whole-chapter completion, apply the required actual previous-repair/no-change samples and route any accepted proposal to the existing corpus owner. No shared cursor, publication, generator or scientific run was changed by this review.
