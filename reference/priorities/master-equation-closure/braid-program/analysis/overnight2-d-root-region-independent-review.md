# Independent review of the complete ordinary-root region

## Verdict and review boundary

**Derived disposition:** the [frozen root-region theorem](overnight2-d-root-region.md) correctly establishes one positive-delay causal root, its delay floor, positive one-sided source factors, and a translation displacement bound under a complete globally $L$-Lipschitz reference with $L<1$. Its exact-tube consequence is also correct when the complete exact history is compatible and has the stated speed bounds. A direct two-time argument strengthens its source-clock conclusion to a global pair of Lipschitz bounds, including crossings of velocity jumps and interpolation knots.

At a prescribed velocity jump, the unique causal root has two ordinary one-sided traces; there need not be a classical transmitter derivative at the exact corner itself. The theorem must not be read as counting two separate root contributions there or as supplying a new event response. Away from the corner, the ordinary-root conclusion holds in its usual differentiable sense. The chosen regular law is an almost-everywhere acceleration law, and the isolated corner can retain its declared one-sided convention.

The accompanying [interval instrument](overnight2-d-root-region.py) has a valid whole-segment enclosure construction conditional on its arithmetic and input contract, but the inspected version lacks explicit time-coverage and array-validation guards and writes $r\omega$ where the general speed formula is $r|\omega|$. These are required instrument corrections before accepting a target receipt. This review ran no target or numerical controls and asserts no numerical speed, separation, or trajectory enclosure. Only this new review companion was written.

## 1. Complete root existence and quantitative separation from the diagonal

Work in the selected normalized equation, $K=c_f=c_a=1$, with original partner weights, zero self acceleration, and inclusive projection after the complete sum. Fix a reception time $t$, source $j$, and receiver point $\mathbf y=\mathbf x_i(t)+\mathbf p$, with $|\mathbf p|\le P<d$. Suppose the reference source is continuous and globally $L$-Lipschitz on its complete past, where $0\le L<1$. Its present distance from the translated receiver is

$$
d_0=|\mathbf y-\mathbf x_j(t)|\ge d-P>0.
$$

For a proposed delay $\tau\ge0$, put $F(\tau)=\tau-|\mathbf y-\mathbf x_j(t-\tau)|$. If $\tau_2>\tau_1$, the source Lipschitz bound and the reverse triangle inequality give

$$
F(\tau_2)-F(\tau_1)\ge(1-L)(\tau_2-\tau_1).
$$

This argument uses positions only and remains valid across every source derivative discontinuity. It gives strict monotonicity. Also $F(0)=-d_0$ and $F(\tau)\ge(1-L)\tau-d_0\to+\infty$. The complete past supplies every argument $t-\tau$ needed in this limit. Continuity therefore gives exactly one zero.

At that zero, the displacement of the source since emission is at most $L\tau$, so

$$
d_0-L\tau\le\tau\le d_0+L\tau,
\qquad
\frac{d_0}{1+L}\le\tau\le\frac{d_0}{1-L}.
$$

Thus $\tau\ge(d-P)/(1+L)>0$. The causal root is uniformly separated from zero range because normalized causal range equals delay. No sampled root census or finite-history cutoff enters this proof.

**Exact controls:** at reception zero, take a static receiver at $d_0>0$ and source $x_j(s)=Ls$ along the same axis. The delayed distance is $d_0+L\tau$, yielding $\tau=d_0/(1-L)$. With $x_j(s)=-Ls$, the root is $\tau=d_0/(1+L)$; the distance remains positive at that root. Both displayed endpoints are therefore attained by complete strict-subunit-speed histories. These are prescribed geometric controls, not dynamical solutions of the selected coupled equation.

## 2. Factor floors and translation dependence

Where the reference source derivative exists, global Lipschitz continuity implies $|\dot{\mathbf x}_j|\le L$. The same bound holds for an existing one-sided derivative at a piece boundary. For a unit causal normal $\mathbf n$ and independent velocity addition $|\mathbf z|\le Z<1-L$,

$$
\gamma=1-\mathbf n\cdot\dot{\mathbf x}_j\ge1-L,
\qquad
D=1-\mathbf n\cdot(\dot{\mathbf x}_j+\mathbf z)\ge1-L-Z>0.
$$

The velocity addition changes the auxiliary row denominator; it does not change the source path or its root. No compatibility between $\mathbf z$ and a path derivative is needed for this comparison construction. Conversely, a bound on $D$ alone would not establish root admission without the source-position hypotheses.

Let $F_{\mathbf p}$ be the root function for receiver translation $\mathbf p$. At every delay, $|F_{\mathbf p}-F_0|\le|\mathbf p|$. Each function has lower slope $1-L$, so comparing their zeros gives

$$
|s(\mathbf p)-s(0)|=|\tau(\mathbf p)-\tau(0)|\le\frac{|\mathbf p|}{1-L}.
$$

More generally the same proof gives $|s(\mathbf p_2)-s(\mathbf p_1)|\le|\mathbf p_2-\mathbf p_1|/(1-L)$. This direct monotonicity argument avoids differentiating through a source velocity jump. It proves complete admission for every fixed translation in the full ball, including all intermediate translations of the row homotopy. It does not give a positive reception-time source-clock slope for an arbitrary time-dependent translation $\mathbf p(t)$: that requires a separate receiver-speed bound. The frozen theorem correctly asserts the clock conclusion for compatible exact histories, not arbitrary translated receivers.

## 3. Exact-tube consequence and a two-time clock bound

Suppose the exact position and velocity errors on $[0,T]$ are bounded by $\epsilon_x$ and $\epsilon_v$, the compatible exact past is continuous at zero, and its prescribed negative-time speed is at most $L$. The positive-time exact speed is then at most $L_*=L+\epsilon_v<1$. Integrating the speed bound on each side of zero and using position continuity makes every exact path globally $L_*$-Lipschitz over the full required past. Exact present pair separations are at least $d-2\epsilon_x>0$.

Applying the root theorem directly to those exact sources gives

$$
\tau_{\mathrm{exact}}\ge\frac{d-2\epsilon_x}{1+L_*},
\qquad D_r,D_t\ge1-L_*>0
$$

on smooth pieces and in existing one-sided traces. Here $D_r$ uses exact receiver velocity and $D_t$ uses exact source velocity. The reference speed estimate and velocity tube also establish strict interior of the unit velocity ball, so the selected ceiling reaction is zero throughout this proposed prefix. None of these conditional implications establishes the tube itself.

There is a stronger derivative-free clock statement. Let $t_2>t_1$ be two reception times on one exact partner channel and let $S_1,S_2$ be their unique source times. At fixed source time $S_1$, the receiver speed bound gives

$$
|\mathbf X_i(t_2)-\mathbf X_j(S_1)|-(t_2-S_1)
\le-(1-L_*)(t_2-t_1)<0.
$$

For fixed $t_2$, the causal gap is strictly increasing in source time with lower slope $1-L_*$. Its zero must therefore occur at $S_2>S_1$. Now put $\Delta t=t_2-t_1$ and $\Delta S=S_2-S_1>0$. The two causal equalities and the reverse triangle inequality give

$$
|\Delta t-\Delta S|
=\left||\mathbf X_i(t_2)-\mathbf X_j(S_2)|-|\mathbf X_i(t_1)-\mathbf X_j(S_1)|\right|
\le L_*(\Delta t+\Delta S).
$$

Rearranging both sides yields

$$
\boxed{\displaystyle
\frac{1-L_*}{1+L_*}\Delta t
\le\Delta S
\le\frac{1+L_*}{1-L_*}\Delta t.}
$$

Thus the source clock is globally bi-Lipschitz on the admitted reception interval: it is continuous, strictly increasing, and cannot freeze. This proof survives source-zero velocity jumps and ordinary interpolation knots without assigning a classical derivative at those points. Where derivatives exist, it implies the frozen theorem's lower slope bound; implicit differentiation gives the sharper pointwise identity $S'=D_r/D_t$.

A source boundary $S=s_0$ has at most one reception in this interval. If the source clock passes from below to above $s_0$, the bound makes that passage transverse in the two-time sense. The theorem does not require the interval to contain every prescribed source boundary, so passage is conditional on the boundary lying in the attained source-time range. It also does not order crossings belonging to different channels.

## 4. Conditions that cannot be omitted

**Uniform strictness is necessary for this theorem.** At $L=1$, the complete source $x_j(s)=s-d_0$ for $s\le0$, observed by a receiver at zero at time zero, has positive present separation $d_0$ but causal distance $d_0+\tau>\tau$ for every positive delay. There is no root. Even pointwise speed below one does not suffice without a uniform gap: $x_j(s)=s-e^s$ has speed $1-e^s<1$ for every finite $s\le0$, but its causal distance at the same receiver is $\tau+e^{-\tau}>\tau$. These are geometric counterexamples, not asserted solutions of the coupled law.

**Positive translated present separation is necessary.** For a static source and a translation that puts the receiver at its present position, the only zero is $\tau=0$; there is no positive-delay root. Hence $P<d$ is doing essential work. Complete source history is also essential: a root outside a retained history interval is not admitted merely because the full-past theorem would locate it there.

**Root admission does not bound row derivatives.** The factors and range can remain positive while reference acceleration has a jump at an interpolation knot. The [signed-transport review](overnight2-d-signed-independent-review.md) gives an explicit resulting kink in the row derivative. The present theorem supplies transverse traversal and denominator floors, but still leaves coefficient variation, source-time remainder, and finite event/knot contributions to the error comparison.

**The exact-root theorem and the auxiliary-homotopy endpoint identification have different input requirements.** The exact-tube consequence uses a positive-time position tube and complete exact negative past with a speed bound; this suffices for existence and factors of the exact roots. To place the exact row inside the auxiliary translation ball one additionally needs $|\mathbf e_i^x(t)-\mathbf e_j^x(S)|\le P$ at every accessible exact source time, including negative times. Positive-time tube membership alone does not bound that negative-history position discrepancy. For the intended joined reference, the earlier initialization certificate supplies a small constant negative-history position error; it must remain an explicit input. Similarly the source-velocity addition bound must cover its negative and initial traces. The root theorem does not silently supply these representation-error bounds.

## 5. Mathematical audit of the interval construction

This is a source-code read-through, not an execution receipt. The inspected instrument calls the frozen `segment_boxes` helper. On each full or endpoint-clipped cubic-Hermite segment, the acceleration is affine, so convexity of the Euclidean norm bounds its norm by the larger endpoint norm $A$. If $m$ is the interval midpoint and $h$ its half-width, integration gives

$$
|\dot{\mathbf x}(s)-\dot{\mathbf x}(m)|\le Ah,
\qquad
|\mathbf x(s)-\mathbf x(m)|\le (|\dot{\mathbf x}(m)|+Ah)h.
$$

The helper encloses midpoint values by interval arithmetic and uses these radii for the whole segment. For two members, subtracting both position excursion bounds from the lower midpoint-distance enclosure is a valid present-separation lower bound. Taking the maximum of the resulting upper speed bounds gives a valid positive-prefix speed bound. For the complete rigid past, the speed is $r_j|\omega|$. A constant position translation used to join the reference at zero leaves that speed unchanged. Together these inputs give the global reference bound, conditional on continuous joining and complete prefix coverage.

The theorem's derived interval formulas for auxiliary delay, exact delay, factor floors, and source-clock lower slope have the correct inequality direction. Turning an upper-bound endpoint or a lower-bound endpoint into a singleton interval is safe when the next formula treats it as that bound rather than as the unknown true value. The arithmetic still depends on the declared finite IEEE binary64 and outward-rounding contract; this review does not independently validate the imported primitive over all inputs.

The following instrument corrections are required before interpreting a target receipt as a certificate of its requested interval:

1. Check that `T` is finite, one-dimensional, starts at the declared zero, is strictly increasing, and covers a finite requested endpoint with `0 < end <= T[-1]`; check compatible finite `X` and `V` arrays with eight members and three coordinates. In the inspected version, `end > T[-1]` silently scans only available segments while the output still labels the result with the requested endpoint. This is a coverage defect in the general entry point, not an observed target failure.
2. Compute the complete rigid speed using $r_j|\omega|$ and validate the expected nonnegative radii and member shape. The literal balance-1 angular rate is positive by a direct `sed` read of `0186.json` (`0.09198260773676213`), so the missing absolute value does not reverse that particular source speed. It remains an unstated input assumption in the inspected implementation and should be removed.
3. Check strict positivity of the resulting outward lower bounds used as theorem premises, including the delay and transmitter-factor floors. Report the scanned interval and the fixed reference identity. The exact constant translation joining the negative reference must be declared or checked as part of that identity; node equality with the unshifted analytic past must not be assumed.

The parent researcher has acknowledged the coverage and angular-rate corrections and owns their implementation and control reruns. This review leaves the instrument and frozen theorem unchanged. A revised script needs its own hash and validation receipt; acceptance here does not apply automatically to changed arithmetic.

## 6. Strongest accepted result, admission boundary, and falsifiers

The accepted result is complete conditional admission of all auxiliary roots in the stipulated translation/velocity-addition region and all exact roots in the stipulated strict-interior tube, with explicit range and factor floors. The exact source clocks also satisfy the global two-time bounds proved above. This removes root search and source-clock grazing as independent concerns within that simultaneously verified region. It does not establish that the original solution remains there, extend a time-67 prefix through the much later tail entry, or prove separation.

Actual admission still needs initialized complete history errors, a continuous specified reference, residual and nonlinear transport bounds, signed inverse amplification, derivative variation across all accessible source pieces, event and interpolation-knot corrections with valid timing, and continuation over the entire finite history required by the tail argument. No target numerical result or actual trajectory membership is asserted here.

The root theorem is falsified by a complete continuous source with the stipulated global strict Lipschitz constant and positive translated present separation that has no root, multiple roots, or a root outside the derived delay interval. The clock theorem is falsified by two admitted exact receptions violating the boxed inequality while both complete paths obey the speed bound. A failed speed/separation enclosure, truncated history, unbounded trace, or unproved tube membership invalidates an application instead. The explicit endpoint examples and excluded-domain counterexamples above provide operator-checkable analytic controls.

## Provenance and validation

The frozen subject SHA-256 measured by `shasum -a 256` is `221c6d17af58884b9e9267d044ae6c8d4347b08f5441075d14ece189986b2293`. The inspected, unmodified interval instrument has SHA-256 `e1e9525c0ce3636d02860a28edf2af257efbcfa9aac2fe97f51d87be0183c08b`. Mathematical evidence consists of the separate monotonicity proof, direct two-time causal comparison, sharp constant-speed controls, and excluded-domain counterexamples above. No subject calculation, target run, or imported numerical output was used to establish these results.

Only this review companion was authored. The parent owns the receiving [research report](overnight2-d-followup-and-research-2026-10-07.md), instrument correction, and target execution. No shared owner, prior source, process, or Git publication state was changed, and no child agent was launched.

Final editorial receipt: repeat `shasum -a 256` reads returned the same subject and inspected-instrument identities. File-scoped `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-root-region-independent-review.md` emitted no whitespace diagnostics (difference exit status 1). Explicit `test -f` checks passed for all four local link destinations; this review has no fragment targets. The mathematical controls were proved algebraically in the text; no numerical control or target execution is claimed.
