# Octahedral Fold-Aware Cross-Binary I1 Bracket-Local Derivative Peak-Budget Reduction

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate](octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate.md). The predecessor packet proved that the existing bracket-local derivative mesh allowance dominates observed $5\times5$ mixed theta/speed stencil variation. This packet turns the remaining directed-rounding burden into finite peak-overshoot budgets on the $4\times4$ stencil subcells inside every predecessor bracket mesh cell, adds sampled root-tube regularity budgets on the same refined replay, and emits finite interval-root-tube certificate targets.

It is a finite peak-budget reduction for the bracket-local directed-rounding derivative-variation row with sampled bilinear curvature feasibility, sampled root-tube feasibility, and emitted finite interval-root-tube targets. It is not a bracket-local directed-rounding derivative-variation enclosure, not an interval root-tube isolation proof, not an interval root-sheet continuation proof, not a full directed-rounding interval derivative enclosure, not full `I1.f1` interval zero isolation, not interval critical exhaustion, not interval quadrature, and not a retained branch.

## Peak-Budget Theorem

The direct theorem-grade successor remains

$$
\texttt{I1.f1.bracket-local-directed-rounding-derivative-variation-enclosure-required}.
$$

Let $C$ be one predecessor `I1.f1` bracket mesh cell. Let

$$
d_C=f'_\times(\theta_C,v_C)
$$

be the predecessor center derivative, let $\Delta_C^{\mathrm{mesh}}$ be the predecessor local variation allowance, and let $m_C$ be the maximum sampled derivative on the parent $5\times5$ mixed stencil. Define the remaining parent peak budget

$$
\mu_C
=
\Delta_C^{\mathrm{mesh}}
-
\max(0,m_C-d_C).
$$

For a stencil subcell $Q\subset C$, let $m_Q$ be the maximum of the sampled derivative values on the vertices of $Q$. A directed-rounded interval or Taylor backend is sufficient on $Q$ if it proves

$$
\sup_Q f'_\times
\le
m_Q+\epsilon_Q
$$

with

$$
\epsilon_Q
<
\min(\mu_C,-m_Q).
$$

The first term protects the predecessor allowance; the second term protects derivative negativity. In the present packet the allowance term is the bottleneck. Negativity has a much larger margin.

## Finite Reduction

The default packet uses the $16\times8$ predecessor bracket mesh. Each mesh cell has a $5\times5$ parent stencil, hence $4\times4$ stencil subcells. The finite directed-rounding burden is therefore

$$
128\times16=2048
$$

subcell peak inequalities.

The packet also replays a refined $3\times3$ tensor check inside each stencil subcell. Equivalently, each predecessor mesh cell is checked on a $9\times9$ local grid, for

$$
128\times81=10368
$$

refined derivative samples. The refined replay finds no interior sampled peak above the parent stencil vertices:

$$
\max_Q
\bigl(
m_{Q,\mathrm{refined}}-m_Q
\bigr)_+
=0,
$$

and no parent refined excess over the coarse parent stencil:

$$
\max_C
\bigl(
m_{C,\mathrm{refined}}-m_C
\bigr)_+
=0.
$$

The weakest peak budget is

$$
\min_Q \epsilon_Q^{\max}
=
3.78761869309\times10^{-6}.
$$

The refined derivative maximum remains

$$
\max f'_\times
=
-0.060388174983,
$$

so the refined sampled derivative clearance is

$$
0.060388174983.
$$

The sampled source-root witness remains

$$
\min |F_\delta|
=
0.686789509138,
$$

and every refined sample preserves six source roots with term root-count signature $(1,3,1,1)$.

The same refined rows now preserve root tubes explicitly. Across all $2048$ subcells the sampled root-tube budget has

$$
\min_{\mathrm{tube}} |F_\delta|
=
0.686789509138,
\qquad
\min_{\mathrm{tube}}\delta
=
1.28454542829,
$$

and the smallest sampled adjacent-tube separation is

$$
1.28117968261.
$$

The largest sampled drift of one branch across a subcell is

$$
7.75623934\times10^{-4}.
$$

Every sampled tube preserves its $F_\delta$ sign, and the term root-count signature remains $(1,3,1,1)$.

The packet then turns the sampled tubes into protected finite interval targets. On each subcell, every sampled tube $[\delta_{\min},\delta_{\max}]$ is expanded by one quarter of its smaller adjacent sampled gap to form a protected interval tube. The complement of those protected tubes in the source-root search domain is emitted as complement slabs. Across the whole packet this produces

$$
2048\times6=12288
$$

retained tube targets and

$$
2048\times10=20480
$$

complement-slab exclusion targets. The weakest protected-tube padding radius is

$$
0.108489314201,
$$

and the weakest complement-slab width is

$$
0.325467942606.
$$

Both bottlenecks occur at

$$
\texttt{I1.f1.bracket-derivative-mesh.15.0.peak-budget.3.0}.
$$

The bottleneck finite subcell is

$$
\texttt{I1.f1.bracket-derivative-mesh.0.7.peak-budget.0.0}.
$$

Its parent mesh cell is

$$
\texttt{I1.f1.bracket-derivative-mesh.0.7}.
$$

The same refined grid now supplies a sampled bilinear pure-curvature feasibility probe. For every stencil subcell, the packet estimates the pure second differences of $g=f'_\times$ along the refined $\theta$ and speed-ratio axes and evaluates the bilinear remainder target. All $2048$ subcells pass this sampled curvature check:

$$
\max_Q
\frac{
\frac{h_\theta^2}{8}M^{\mathrm{samp}}_{\theta\theta,Q}
+
\frac{h_\nu^2}{8}M^{\mathrm{samp}}_{\nu\nu,Q}
}{
\epsilon_Q^{\max}
}
\approx
0.0632306995182.
$$

The largest sampled bilinear curvature remainder is

$$
3.58713895559\times10^{-7},
$$

and the weakest balanced pure-curvature target is

$$
287.476602603.
$$

The curvature-ratio bottleneck is

$$
\texttt{I1.f1.bracket-derivative-mesh.0.4.peak-budget.3.0}.
$$

The root-tube denominator bottleneck is

$$
\texttt{I1.f1.bracket-derivative-mesh.15.7.peak-budget.3.3},
$$

and the sampled adjacent-tube-separation bottleneck is

$$
\texttt{I1.f1.bracket-derivative-mesh.0.7.peak-budget.0.3}.
$$

## What This Adds

The predecessor mixed-stencil certificate made the derivative-variation row empirical at finite stencil points. This packet changes the remaining theorem-grade burden from a vague "exclude unsampled peaks" statement into explicit finite inequalities:

$$
\epsilon_Q<\epsilon_Q^{\max}
\quad
\text{for all }2048\text{ subcells}.
$$

That is a sharper mathematical object than another gate. A future interval backend now has a concrete row-by-row target: prove endpoint signs and fixed-sign $F_\delta$ on each emitted protected tube, prove complement exclusion on the emitted slabs, and prove that interval/Taylor interpolation error for $f'_\times$ is below the displayed peak budget on each subcell.

The packet also shows where the difficulty actually lives. The negative derivative clearance is about $0.060388174983$, while the tightest allowance budget is only about $3.7876\times10^{-6}$. The hard part is therefore not the sign of the derivative; it is proving that continuous mixed-cell variation cannot exceed the sampled peak by a few parts in $10^{-6}$.

The emitted rows are backend-ready: each subcell carries its own $\theta$ rectangle, speed-ratio rectangle, vertex derivative maximum, refined sampled maximum, and required strict overshoot bound. The formula sheet is the source-atlas derivative formula:

$$
\phi=2\tilde\theta-\delta,
$$

$$
F_{\kappa,\nu}(\tilde\theta,\delta)
=
\frac{\delta^2}{\nu^2}-2+\sin\phi+\kappa\sin\delta,
\qquad
F_\delta
=
\frac{2\delta}{\nu^2}-\cos\phi+\kappa\cos\delta,
$$

$$
B=-\frac12(\cos\phi+\kappa\cos\delta),
\qquad
\delta'=-\frac{2\cos\phi}{F_\delta}.
$$

With

$$
I=(\delta^2|F_\delta|)^{-1},
$$

the source contribution derivative is represented in the executable as

$$
s'_{\kappa,\sigma}
=
\frac{2\sigma}{\nu}\left(B'I+BI'\right),
$$

and the cross-binary derivative combines the four source rows by

$$
f'_\times(\theta)
=
s'_{+,+}(\theta)
-s'_{+,+}(\theta+Q)
+s'_{-,+}(\theta)
-s'_{-,+}(\theta+Q).
$$

The root-tube certificate has a precise interval form. For a parameter rectangle $P$ and a retained source-root tube

$$
D_r=[\delta_r^-,\delta_r^+],
$$

an interval backend proves one regular sheet in $D_r$ if it shows:

$$
F(P,\delta_r^-)
\text{ and }
F(P,\delta_r^+)
\text{ have opposite interval signs},
$$

$$
F_\delta(P,D_r)
\subset
[\lambda_r,\infty)
\quad\text{or}\quad
F_\delta(P,D_r)
\subset
(-\infty,-\lambda_r]
\quad
\text{for some }\lambda_r>0,
$$

and, for every complement slab $K_\ell$ between retained tubes and source-domain endpoints,

$$
0\notin F(P,K_\ell).
$$

The first condition gives existence, the fixed-sign $F_\delta$ condition gives uniqueness and implicit-sheet regularity inside $D_r$, and the complement exclusion proves that no extra source roots appear outside the retained tubes. Once those three interval statements are available, the derivative formulas above may be differentiated as root-sheet identities rather than sampled formulas.

The executable target fixes the formerly implicit choice of $D_r$ and $K_\ell$. For each subcell it emits six protected tubes and ten complement slabs. This means the root-sheet part of the next proof is no longer "find the right isolation geometry"; it is a finite list of interval endpoint-sign, fixed-$F_\delta$, and complement-exclusion statements on already specified intervals.

Thus the next prover does not need to infer the analytic target. It must prove, on each emitted rectangle $Q$,

$$
\sup_Q f'_\times
\le
m_Q+\epsilon_Q,
\qquad
\epsilon_Q<\epsilon_Q^{\max}.
$$

The packet also adds a bilinear vertex-envelope reduction. For $g=f'_\times$ on a subcell with widths $h_\theta$ and $h_\nu$, the bilinear interpolant through the four vertex values is bounded above by $m_Q$. If

$$
M_{\theta\theta}
\ge
\sup_Q |\partial_{\theta\theta}g|,
\qquad
M_{\nu\nu}
\ge
\sup_Q |\partial_{\nu\nu}g|,
$$

then the tensor interpolation remainder gives the sufficient condition

$$
\sup_Q g
\le
m_Q
+
\frac{h_\theta^2}{8}M_{\theta\theta}
+
\frac{h_\nu^2}{8}M_{\nu\nu}.
$$

Therefore each subcell row now also emits the strict curvature target

$$
\frac{h_\theta^2}{8}M_{\theta\theta}
+
\frac{h_\nu^2}{8}M_{\nu\nu}
<
\epsilon_Q^{\max}.
$$

This is the practical theorem route for the next interval pass: prove interval root-tube regularity, bound the two pure second partials of $f'_\times$, and compare the resulting bilinear remainder against the emitted overshoot budget.

The sampled root-tube probe and finite target emission are likewise not interval proofs, but they remove a major ambiguity from the geometry. The sampled sheets do not approach $\delta=0$, do not collide with each other, and do not pass through $F_\delta=0$ on the replay grid. The protected-tube target then gives the interval backend explicit tube and complement intervals with order-one padding. At the target level the geometry is therefore a bundle of separated implicit-root tubes rather than a near-fold or branch-collision problem.

The sampled curvature probe is not a proof of those interval bounds, but it changes the strategic picture. The observed bilinear remainder consumes only about $6.4\%$ of the worst required overshoot budget, while the emitted protected root-tube target has minimum padding radius $\approx0.108489314201$ and minimum complement width $\approx0.325467942606$. The directed-rounded successor no longer looks like a marginal peak-exclusion problem or an ambiguous root-isolation problem. It looks like an interval-jet problem over a finite protected-tube partition: prove enough implicit-root control to turn the emitted tube and curvature targets into outward-rounded root-isolation, $|F_\delta|$, and pure-curvature enclosures.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction.mjs) emits:

- predecessor validation for the mixed-stencil derivative-variation certificate;
- the parent peak budget $\mu_C$ for each predecessor mesh cell;
- one peak-budget row for each of the $2048$ stencil subcells;
- the $\theta$ and speed-ratio rectangle, vertex maximum $m_Q$, refined local maximum, refined excess over vertices, effective overshoot ceiling, derivative clearance, source-root count, term root-count signature, and sampled $\min |F_\delta|$ for each subcell;
- the backend formula sheet, per-subcell strict overshoot inequality, bilinear pure-curvature sufficient condition, sampled pure-curvature feasibility probe, sampled root-tube regularity probe, and finite interval-root-tube certificate target;
- explicit non-directed-rounding, non-interval, non-critical-exhaustion, non-quadrature, and non-retention boundaries.

The companion test [neutral-swarm-octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction.test.js) verifies schema validation, predecessor composition, speed-window removal, default $2048$ subcell budgets, backend-ready subcell rectangles, formulas, bilinear curvature conditions, sampled pure-curvature feasibility margins, sampled root-tube floors and separations, finite root-tube target counts and margins, the $10368$-sample refined replay, row-level positivity and root-signature preservation, claim boundaries, invalid controls, overclaim rejection, and CLI emission.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_I1\_f1\_bracket\_local\_derivative\_peak\_budget\_reduction=true},
$$

$$
\texttt{converts\_directed\_rounding\_derivative\_variation\_to\_finite\_subcell\_peak\_bounds=true},
$$

$$
\texttt{certifies\_refined\_sampled\_peak\_audit=true}.
$$

$$
\texttt{certifies\_sampled\_bilinear\_curvature\_feasibility=true}.
$$

$$
\texttt{certifies\_sampled\_root\_tube\_regularity\_feasibility=true}.
$$

$$
\texttt{certifies\_finite\_interval\_root\_tube\_certificate\_target=true}.
$$

It does not claim:

$$
\texttt{certifies\_I1\_f1\_bracket\_local\_directed\_rounding\_derivative\_variation\_enclosure=false},
$$

$$
\texttt{certifies\_I1\_derivative\_negative\_full\_cell\_interval\_enclosure=false},
$$

$$
\texttt{certifies\_I1\_f1\_full\_interval\_zero\_isolation=false},
\qquad
\texttt{certifies\_I1\_zero\_isolation=false},
$$

$$
\texttt{certifies\_outward\_rounded\_interval\_enclosure=false},
\qquad
\texttt{certifies\_interval\_derivative\_enclosure=false},
$$

$$
\texttt{certifies\_interval\_second\_partial\_curvature\_enclosure=false},
$$

$$
\texttt{certifies\_interval\_root\_tube\_isolation=false},
\qquad
\texttt{certifies\_interval\_root\_sheet\_continuation=false},
$$

$$
\texttt{certifies\_interval\_F\_delta\_lower\_bound=false},
$$

$$
\texttt{certifies\_interval\_critical\_exhaustion=false},
\qquad
\texttt{certifies\_interval\_quadrature\_enclosure=false},
\qquad
\texttt{retained\_branch=false}.
$$

The resulting status is

$$
\boxed{
\texttt{source-atlas-aware-i1-f1-bracket-local-finite-root-tube-target-and-sampled-bilinear-curvature-feasibility-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only` and classified as `defer with blocker`. It is mathematically substantive because it converts the bracket-local directed-rounding derivative-variation burden into finite subcell peak budgets with explicit bottlenecks, shows on the refined sample grid that both the bilinear curvature route and the root-tube regularity route have positive sampled margins, and fixes the finite protected-tube/complement partition that an interval backend must prove. It should not be promoted into reader-facing AAA prose until an interval/Taylor backend proves the $2048$ subcell overshoot inequalities together with the emitted interval root-tube endpoint signs, fixed-sign $F_\delta$ lower bounds, complement exclusions, and pure-curvature bounds, or until a retained branch certificate consumes this finite reduction with the remaining interval-row obligations clearly stated.
