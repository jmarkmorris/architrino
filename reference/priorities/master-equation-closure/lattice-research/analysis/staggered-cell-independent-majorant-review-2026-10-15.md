# Independent scalar majorant reference

**Status: ◐ Partial — exact analytic reference prepared; peer majorant and physical propagation unreviewed.** This is preparation for the restarted [staggered-cell campaign](staggered-cell-independent-campaign-2026-10-14.md). No reception cell is evaluated here. It preserves the fixed ancient branch, $a=2^{-40}$, $c_f=1$, $g=16$, original infinite stationary grouping and pre-global-event law equivalence. The coefficients below are generic analytic control data, not a new physical scenario.

## Twice-integrated comparison

Suppose the new, independently validated assembly supplies nonnegative constants $L,R$ on a step of width $h$, and has established

$$
|e''(t)|\le L P(t)+R,
\qquad
P(t)=P_0+V_0t+\int_0^t(t-s)|e''(s)|\,ds,
$$

with $P_0,V_0\ge0$. The constant $R$ must include the comparison defect and every already bounded source-error and tail contribution. It cannot use an unproved current-step error lookup. Applying the nonnegative Volterra kernel repeatedly bounds $P$ by the solution $Y$ of $Y''=LY+R$, $Y(0)=P_0$, $Y'(0)=V_0$. This compares integrated upper functions; it does not assume that the norm of the actual position error has a second derivative obeying the same differential inequality.

Put $z=Lh^2$ and define nonnegative entire series

$$
C=\sum_{k\ge0}\frac{z^k}{(2k)!},\qquad
S=h\sum_{k\ge0}\frac{z^k}{(2k+1)!},\qquad
T=h^2\sum_{k\ge0}\frac{z^k}{(2k+2)!}.
$$

Direct differentiation gives the exact endpoint bounds

$$
Y(h)=CP_0+SV_0+TR,\qquad
Y'(h)=LS P_0+CV_0+SR.
$$

These series avoid cancellation and division by a small $L$. At $L=0$ they reduce exactly to $C=1$, $S=h$, $T=h^2/2$. All coefficients are nonnegative, so $Y,Y'$ are nondecreasing for the admitted data. Their endpoint values consequently bound the entire step; $LY(h)+R$ bounds acceleration. A geometric trial tube remains a separate obligation: the resulting whole-step position/velocity bounds must lie strictly inside the tube used to construct $L,R$ and all causal roots. A failed containment is an insufficient estimate, not a physical counterexample.

For a truncated series $\sum_{k=0}^{N}z^k/(2k+b)!$, $b\in\{0,1,2\}$, the first omitted term is $u=z^{N+1}/(2N+2+b)!$. Every subsequent term ratio is at most

$$
\eta=\frac z{(2N+3+b)(2N+4+b)}.
$$

When $\eta<1$, the tail lies in $[0,u/(1-\eta)]$. Exact rational arithmetic therefore supplies outward endpoint references without relying on the peer's arithmetic, stepper or old physical error arrays.

## Known cases before subject use

The separately authored exact-rational `majorant-reference.py` passes the following analytic controls before any peer stepper is imported:

| Control | Exact answer |
| --- | --- |
| $L=0$, $h=1/2$, $(P_0,V_0,R)=(1,2,3)$ | $Y=19/8$, $Y'=7/2$ |
| $L=4$, $h=1/2$, $(P_0,V_0,R)=(1,2,0)$ | $Y=e$, $Y'=2e$ |
| $L=4$, $h=1/2$, $(P_0,V_0,R)=(0,0,4)$ | $Y=\cosh(1)-1$, $Y'=2\sinh(1)$ |
| Zero-width step | Initial values unchanged |
| Negative coefficient, step width or initial upper data | Refused |

The exponential reference uses an independent positive Taylor enclosure of $e$ through degree80 with an explicit geometric remainder; reciprocal monotonicity encloses $e^{-1}$. The step kernels use the separate even-factorial series above with24 retained powers. Both are justified by the displayed elementary identities; their numerical overlap is a check of implementation, not an independent proof of those identities. Source and receipt are retained under `codex-majorant-reference/`.

This reference tests endpoint integration and the zero-coefficient limit. It does not establish the physical coefficient assembly, source-error tables, ancient correction, root census, stationary/remote tails, tube closure or event. The actual campaign still requires all of them. Falsifiers are an inward endpoint, failed analytic case, incorrect whole-step maximum, omitted source/tail term, dependence on unaccepted current-step errors or a trial tube that fails strict containment.

## October17 independent review: endpoint formulas accepted, table not admitted

The full d403a1a7 source and b47ceef9 assembly report are reviewed under Op's approved fresh six-hour window. Seven controls rerun PASS. The unchanged independently prepared exact-rational reference confirms polynomial, homogeneous exponential and forced-exponential endpoint bounds before synthetic table probes. The positive series and strict position-tube first-exit argument are sound at their stated scalar scope; they do not validate the unbuilt physical coefficients.

**RSC-08 — ○ Open:** ErrorTable.append accepts negative norm bounds and zero-width/reversed cells. Exact probes append (0,1,-1,-1,-1), (0,0,1,1,1) and (0,-1,1,1,1) without refusal. Require nonnegative finite admissible upper data, nonnegative starts, strictly positive width and exact joins before storing anything. Empty-table lookup(0,0,1), with incoming upper1 and jump1/2, returns (0,0,0), despite lacking an initial state. Require an explicitly bounded initial snapshot or refuse missing past coverage; do not invent zero error at the join. This is an interface admission gap, not a physical counterexample; no propagation target uses it yet.

**RSC-09 — ○ Open:** Add controls that make zero-seam acceleration allowance decisive rather than dominated by the positive table bound. The callback contract must explicitly bound the full negative interval it claims; the existing incoming_error(s,k) is a pointwise envelope and cannot simply be evaluated at the lower endpoint for an increasing ancient bound. Prove the callback composition or use the upper source endpoint. Test a nonconstant analytic negative-time envelope, zero singleton/either endpoint orientation, a crossing box with a large jump and a strictly one-sided query. Align the docstring's remainder-ratio denominator with the implemented/proved (2N+3+c)(2N+4+c); code is accepted here, the wording differs. Preserve old source/known receipts and return a new version/diff.

**RSC-10 — ○ Open:** Missing source manifests, retained current owner-wide closeout and integrated partial D report must be supplied before acceptance/advance. Source manifests must distinguish preserved as-run snapshots from current files and any drift; do not reconstruct unsupported historical bindings or rewrite old output manifests. A fresh supplement may bind and reconcile existing bytes, with historical uncertainty explicit. Original first-D/D2/majorant output manifests remain unchanged.

The independent partial audit passes every141 completed D identity432..572, exact frozen endpoints/subdivision, code/data/known binding, outward residual-plus-remote sum, strict source interval and positive range/transmitter checks. Both stopped/timed-out process groups are recorded closed;141 completed cells are not a completed144-cell packet. Maximum new upper0.005455343054137431, minimum transmitter0.9858667764837477 and range0.9257843701225839 are audit measurements. Wider-than-frozen uppers are carried, not replaced or treated as physical counterexamples. Acceptance remains pending retention/comment closure; D573..575 and E remain unreleased. Review source/receipts are retained in codex-d-partial-review-2026-10-17.

## October18 corrected-byte verification

**RSC-08–10 — ✓ Resolved at component and retention scope.** Complete v2 source ebed28e6 and the retained 156-line diff are reviewed. Eight peer controls rerun PASS under the shared venv. The unchanged exact-rational independent reference passes its analytic cases before subject import; polynomial, homogeneous and forced-exponential endpoint comparisons pass. Separate affine increasing incoming-history, explicit singleton initial-state, invalid-append/no-mutation and decisive zero-jump controls pass. The source callback remains obligated to bound its entire declared interval; the supplied upper-end wrapper is admitted only for its stated nondecreasing envelopes. No physical propagation was evaluated.

`shasum -a 256 -c` verifies the new majorant-v2's ten outputs/five sources, supplement-6's five outputs/three sources, and the three nested source manifests with eleven/thirteen/four entries. The preserved first-D/D2/v1 output manifests also verify ten/154/five entries respectively. The reconciliation binds preserved as-run copies to the same current source bytes without backdating authentication. Its terminal stopped/timed-out classifications agree with the prior independent partial audit; stale running summaries remain historical. The retained owner-wide closeout says clear. The corrected coverage and assembly reports preserve their reviewed predecessors and state the partial scope accurately.

The141 completed D cells432..572 are therefore accepted as comparison-defect enclosures, bringing accepted complementary identities to0..572. The forty wider-than-frozen bounds533..572 remain valid upper bounds and are carried without replacement. The remaining84 complementary identities573..655 and657 are not completed; only573..575 are released next, with review before E. This acceptance does not establish physical L/Q assembly, remote derivative error tails, strict trial tubes, propagation or an event. Falsifiers remain an altered binding, omitted root/source/tail, inward arithmetic, circular lookup or failed strict containment. Fresh verification sources and receipts are retained in `codex-majorant-v2-review-2026-10-18/`.
