# Stella-Octangula Short EOM Release

## Result

The exact stationary stella-octangula history was released into the EOM solver at $T=0$ and evolved to $T=0.01$. The primary fixed-step run used four steps of $0.0025$; independent comparison runs used two steps of $0.005$ and one step of $0.01$. All three runs completed without a rejected step or an incomplete ordered-pair root certificate. The [predeclaration](2026-09-01-stella-octangula-short-eom-release.predeclaration.v1.json) froze the source, executable, history, strength, horizon, numerical ladder, stopping rules, and claim boundary before execution. The [machine packet](2026-09-01-stella-octangula-short-eom-release.packet.v1.json) records the result and binds the ignored raw evidence by path, byte count, and SHA-256.

Plainly: this is the first evolved release, not another prescribed future. The solver generated the accepted motion from the stationary past.

## Motion through the bounded horizon

At $T=0.01$, every member had the same radius and radial velocity:

$$
R(0.01)=0.49987390781532354,
\qquad
\dot R(0.01)=-0.02521769834861235.
$$

Starting from $R(0)=0.5$, the inward radius change was

$$
0.5-R(0.01)=0.00012609218467646288.
$$

The center residual was zero, the eight member radii had zero spread, and the maximum tangential speed was $3.0046291974743185\times10^{-18}$. The minimum pair separation decreased from $1/\sqrt{3}$ to $0.5772046704760945$, remaining above the predeclared $0.55$ stop threshold.

Plainly: the members did not turn. They moved directly inward together. They also did not reach the origin; this run covers only the first $0.01$ time units.

## Root and numerical checks

The fine run accepted four coupled steps and certified all $64$ ordered pairs at each step, including explicit self-pair rows with no nontrivial self-root. Its $256$ root-certificate rows were all `certified_complete`. The medium and coarse runs likewise certified $128$ and $64$ ordered-pair rows. No rung had a rejected step or unresolved traversal row.

The fine-to-medium maximum endpoint state difference was $5.0032924799742196\times10^{-9}$, below the frozen $5\times10^{-6}$ threshold. The fine radius differed from the constant-initial-acceleration Taylor estimate by $3.7057501511839064\times10^{-9}$.

Plainly: smaller steps reproduced the same short inward motion. The release behaves as the measured initial acceleration predicts over this narrow interval.

## Preserved audit repair

The first independent checker returned `accepted:false` because it counted every row in the native response field named `stepFailures` as a failure. Completed responses use that field as a ledger for both accepted and rejected steps; all observed rows had `status=accepted` and an empty `failureCode`. The failed first audit remains preserved. The [audit-repair predeclaration](2026-09-01-stella-octangula-short-eom-release-audit-repair.predeclaration.v1.json) froze the immutable responses and limited the correction to that field interpretation. The corrected audit then required every accepted step to have exactly $64$ `certified_complete` ordered-pair rows, zero unresolved traversal pairs, and no rejected ledger row; it passed without changing any trajectory value or scientific threshold.

Plainly: the solver result did not change. Only the checker learned that an unfortunately named array also contains successful step records.

## Claim boundary

Claim grade: **measured EOM-solver executable-architecture evidence**. The result establishes direct inward contraction, with no turning, only on $0\leq T\leq0.01$ for the exact stationary prehistory, isolated eight-member inventory, $c_f=1$, and unit strength. It does not establish arrival at the origin, collision outcome, later turning, binding, retention, stability, energy, physical realization, or a braid classification. No animation was produced.

The result is overturned by a changed binding, incomplete ordered-pair root row, rejected step, non-inward member, radial reversal, excessive tangential motion or center drift, threshold-crossing pair separation, or failed refinement comparison.

Plainly: the next scientific question is how long the symmetry-protected contraction remains certified and whether it turns, halts, or reaches a close-approach event. That requires a new bounded continuation packet.
