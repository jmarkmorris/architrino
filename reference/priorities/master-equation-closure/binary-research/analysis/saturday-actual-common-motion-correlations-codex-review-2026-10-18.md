# Independent review of the sign-free common-motion correlation

## Review disposition — October 18

The [subject](saturday-actual-common-motion-correlations-2026-10-17.md), first bytes `1d9dea1e…ad9e` (20,393 bytes), has a correct exact identity, a valid multi-period treatment of a nonperiodic common velocity, and supported sufficient inequalities in Corollaries C.3–C.4. A separately authored rational reference confirms every conservative display in all three table rows. Final acceptance is pending CR1–CR3: correct the explanatory scope and the sufficient-comparison language; keep the mathematics, instruments and original outputs unchanged unless a further mathematical defect is found.

This is an independent hand reconstruction from the actual rotating-frame equations and accepted pointwise bounds, accompanied by independent arithmetic. It is neither an EOM trajectory nor a proof of general periodicity exclusion. The peer's instrument was read only after the independent reference was authored and run. No peer source or accepted input was edited.

## Reconstruction and assumptions

The class is the complete planar opposite-unit, unit-reduced-coupling, $c_f=1$ class with positive separation, whole-past speed at most $0<w<1/3$, ordinary partner rows and no positive-delay self rows. Let $P_\parallel,P_\perp$ be components of the actual velocity sum in the relative frame, $Q=P_\parallel^2-P_\perp^2$, $d=J/r$ and $H=A_\parallel P_\parallel-A_\perp P_\perp$. These are regular through zeros of J. From the actual common-velocity equations,

$$
\dot Q=2H+4\frac d rP_\parallel P_\perp,
\qquad
K_2=-\frac18[rQ]+\frac18\int\dot rQ\,dt+\frac14\int rH\,dt.
$$

This follows by multiplication and one integration by parts. The canonical acceleration row is unchanged; transmitter weighting at emission, the polarity sign and the ordinary root class remain those of the accepted non-mirror/S1 inputs. Inserting the signed-breathing note's pointwise algebra gives

$$
H=\frac{P_\parallel^2+r^2\mu P_\perp^2}{r^2}
+\frac{\zeta P_\parallel}{r^2}-\chi P_\parallel
+\delta dP_\perp-e_PP_\perp.
$$

The principal part is nonnegative and at most $4w^2c_1/r^2$. The four remainders are bounded by $4k_1/r^2+k_A'/r^3$. These local inequalities do not use a positive J; their use on the all-sign class is supported by the pointwise proof, despite the older integrated signed-breathing theorem's narrower positive-J domain. The curvature coefficient itself is first order in speed; third-order aggregate error requires the repeating-class separation floor. Thus the explicit $I_2$ allowance or its floor conversion must be retained.

Under relative-vector recurrence, common-velocity recurrence is not assumed. Over N relative periods, $|[rQ]|/8\le w^2r(0)$ since $|Q|\le4w^2$ and $r(NT)=r(0)$. The bound divided by N tends to zero. The primitive J balance over the same N periods has exactly N times the relative-period quantities; bounded common components and pointwise estimates suffice. No limiting value of $K_2^{(N)}/N$ is required: sandwich inequalities and the vanishing boundary allowance establish the stated relative-period result. A one-period $K_2$ estimate without its boundary allowance is reserved for rigid recurrence.

Write $Q_d=\int d^2dt$, $R_1=\int|\dot r|dt$, $R_2=\int\dot r^2dt$, $L_d=\int|d|dt$, $I_j=\int r^{-j}dt$. The exact radial identity is

$$
\int rA_rdt=R_2+Q_d,\qquad c_-I_1\le R_2+Q_d,
\qquad I_2\le\frac{4w^2}{c_-}I_1.
$$

It follows from the derivative of $r\dot r$, not an imported conservation law. Combining the primitive $DQ_d\le K_2+wz_0L_d$ with the new upper bound on $K_2$ gives

$$
(D-m)Q_d\le\frac{w^2}{2}R_1+mR_2+wz_0L_d,
\qquad m=\frac{w^2c_1+k_1+w^2k_A'/c_-}{c_-}.
$$

The old mean bound $L_d/T\le k$ gives form A. Cauchy–Schwarz $L_d/T\le\sqrt{Q_d/T}$ and Young's inequality, with half the left coefficient, give form B. In particular the factor two in the Young upper bound is necessary: $q\le2A\rho_1+(wz_0/(D-m))^2$, with $A=(w^2/2+2wm)/(D-m)$. Adding $\rho_2\le2w\rho_1$ yields precisely the subject's two slopes and intercepts. The table's conditions $D>m>0$ hold at each of the three evaluated speeds; no new continuous speed interval is inferred.

The compatibility argument in C.5 also reconstructs: $\rho_1^2\le\rho_2\le c_+u$, whereas each forcing line is weaker than $c_-u/a_f$. At w=.1 the class floor gives $u<.0273$, below the baseline compatibility threshold greater than .0500. This compares necessary conditions only; their compatibility is not a construction or a statement that the dynamics realizes either bound.

## Independent arithmetic and retained evidence

The [separate reference](../evidence/saturday-correlations-codex-review-2026-10-18/correlation_reference.py) uses general rational interval operations and an integer-square-root enclosure at scale $10^{70}$. It imports no peer instrument. Before targets it passes interval controls, an exact square-root case, four hand rational row constants, and the exact kinematic integration case $r=1+t$, $\vartheta=t$, $P_\parallel=t$, $P_\perp=t^2$ on $[0,1]$, giving both sides $-9/40$. That prescribed case checks the algebra only and is not an EOM solution.

The independently reconstructed values include $D-m=0.1673751536\ldots$, $a=0.2592311890\ldots$, $a'=0.3184623780\ldots$, $b'=3.6237855507\ldots\times10^{-7}$ and $c_-/b'=4,043,686.1235\ldots$ at w=.1. Exact interval comparisons, rather than these floating displays, confirm all 27 table inequalities across w=.1, .05 and .01. The example at $r_{\max}=1000$ requires $\rho_1>0.00553045\ldots$ from form A. There is no arithmetic objection to the tabulated conservative values.

First peer source/README, instrument and all run1 payloads are frozen under `.local-data/aaa-work-threads/saturday-correlations-six-hour-2026-10-17/codex-correlations-review/first-packet-manifest.json`, with exact copies alongside it. All twenty-eight accepted binary/lattice dependency identities still match their launch pins by a known-first SHA-256 check. The peer supervisor record shows terminal exit zero and process-group closure; the peer reports stopped. A broader live process census was not performed.

Both reference passes are retained as `reference-run1.json` and `reference-run2.json`. Between passes only an unused explanatory comment was corrected to include the factor two in Young's bound; the first as-run reference source is retained as `correlation_reference.run1.py`. Both passes run controls before targets and agree in every target value. No peer instrument was rerun. Local evidence is retained; independent backup and practical regeneration cost are not established.

## Actionable corrections

### CR1 — distinguish positive radial travel from radial dominance

The lead, Result items 3–4, the C.4 Reading and proposed receiving-owner language must stop claiming that every history below the displayed threshold carries most of its relative squared-speed budget radially, or is thereby quantitatively non-circular. The supported inequality is

$$
\rho_1\ge\max_f\frac{c_-u-b_f}{a_f},
\qquad
\rho_1\ge\frac{c_-/r_{\max}-b_f}{a_f}
\quad\text{when the numerator is positive.}
$$

As $r_{\max}$ approaches $c_-/b_f$ from below, the latter lower bound tends to zero. The displayed threshold alone therefore supplies neither a uniform order-$u/w$ lower bound nor a proved dominance comparison between $\rho_2$ and q. If an order statement is retained, state an explicit margin: for example $c_-u\ge2b_f$ implies $\rho_1\ge c_-u/(2a_f)$. A radial-dominance or near-circular subclass assertion needs its own quantitative predicate and proof; it is not supplied merely by $\rho_1>0$. State plainly that 4.0436 million is a cutoff for a positive lower bound on mean radial speed, not a new necessary maximum separation. The one-period constant-separation comparison is correctly demoted relative to the accepted 20-million result.

### CR2 — give the sufficient radial-travel comparison, without equivalence

The Section5 claim that any upper bound of order $u/w$ would exclude is missing its coefficient and intercept conditions. Replace it by the actual sufficient predicate: a solution-derived upper bound $\rho_1\le U$ excludes if $a_f U+b_f<c_-u$, or if the correspondingly conservative bound using $r_{\max}$ is strict. An unspecified bound with the same asymptotic order need not suffice. Direct control of the signed integral $\int\dot rQ$ may succeed even if total radial travel is large; total-travel control is a sufficient alternative, not equivalent mathematical information. The loss is bounded, not exactly determined by the virial identity. Keep those distinctions in the Result, limitations, Section5 and proposed synthesis.

### CR3 — state the candidate turning estimate and its actual boundary

In the proposed centred-excursion lemma, I6 bounds H, not the turning term by itself. If the claim of control through $Q_d$ is retained, show the available estimate

$$
\int|\dot\vartheta P_\parallel P_\perp|dt
\le2w^2\int\frac{|d|}{r}dt
\le\frac{4w^3}{c_-}Q_d,
$$

using the earlier sign-free Cauchy–Schwarz/radial identity bound. Multiplication by an excursion supremum introduces that supremum explicitly. This is a valid candidate ingredient, not an established useful excursion bound or a new exclusion. Preserve rigid-recurrence cancellation versus the multi-period boundary treatment. Correct the wording only, or give this short supporting estimate; do not start the next lemma or new compute before corrected-byte verification.

## Continuation recommendation

After correction the checkpoint earns bounded acceptance: the new actual-equation reduction and quantitative mean-radial-speed constraints improve the previous size-only estimate. General periodicity, wide strongly breathing histories and the actual radial–anisotropy sign remain unresolved. The next release should select one genuinely new estimate, with an explicit useful comparison, rather than repeat integration by parts. The centred-excursion route is a candidate whose usefulness must be demonstrated, not an established prerequisite. Alternatively the already selected lattice summed remainder is a distinct target after this disposition. No successor is released by this review.

The receiving account remains the existing allocation synthesis. Corrected bytes and frozen evidence must be verified before integration or successor dispatch. A complete admitted solution violating the reconstructed inequalities, an invalid accepted pointwise input, or failure of a conservative exact interval comparison would reopen the affected finding.

## Final corrected-byte disposition — October 18

**The first correlation checkpoint is independently accepted at bounded derived scope.** Complete corrected-subject/README reading verifies CR1–CR3 resolved. Final subject80b307d9…2886 (23,563bytes) differs from the preceding corrected subject only by the two requested display-dollar additions; README1f6c1020…3c9f (5,044bytes) is unchanged in that repair. Every first-packet instrument/output identity and all28 accepted input hashes remain fixed. The independently checked core identity, N-period boundary argument, radial virial comparison and three sufficient mean-speed lines remain unchanged. The separate reference supports all27 conservative table comparisons; no peer rerun or evaluated history occurs.

Accepted: for each declared speed with D>m, relative-periodic solutions of any J sign satisfy the stated quantitative lower bound on mean absolute radial speed. At w=.1 the strongest positive-numerator cutoff is above4.0436million; at r_max1000 the A bound exceeds.00553. This is not a necessary maximum separation or a radial-dominance/non-circularity theorem. An order-u/w description needs the explicit margin, and a travel upper bound excludes only under the strict stated comparison. Direct signed correlation control is a different sufficient route. The candidate turning estimate is supported, while actual excursion/travel control and general periodicity remain unresolved.

The selected binary stage is complete at this bounded scope, with no remaining review finding. The next centred-excursion step would still require uncontrolled geometric input; it is not released automatically. The coordinator selects the distinct full signed lattice estimate next within the same operator-approved ceiling. First/corrected sources, both reference passes, original outputs and final validation remain under the established ignored review owner. This is local retention, with independent backup and practical regeneration unclaimed. The existing allocation account receives this disposition; current binary tracker/manuscript promotion is not performed in this round. Peer reports stopped/owned-compute clear; wider live census remains unknown.
