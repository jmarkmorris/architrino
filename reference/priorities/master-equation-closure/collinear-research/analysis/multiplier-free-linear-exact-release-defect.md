# A polynomial-defect route for the exact held release

The selected multiplier-free signed linear-numerator law uses the exact decimal rational $k=2862286103053385/10^{16}$, $c_f=1$, and held $x=1/2$, $v=0$ for $T\leq0$. The [exact enclosure treatment](multiplier-free-linear-exact-release-enclosure.md) supplies the release, census, root-sensitivity and contact lemmas. The new `scripts/collinear-research/linear-exact-release-defect.py` investigates an independent a posteriori route that avoids transporting a growing state box through every historical cell. No approximate profile is treated as an exact initial history.

## Reference curve and independent defect

The frozen numerical input `.local-data/collinear-research/linear-self-birth-to-fold/resolved-h8192-q1e-06.npz` defines a reference center only. Its time, position and velocity fields are interpreted as their exact binary64 rational values. The initial reference state is exactly the held-release state. Cubic Hermite clocks are independently inverted by rational bisection to choose acceleration data at the reference endpoints. These values then define a piecewise quintic Hermite position $\widehat x$; throughout each cell $\widehat v=\widehat x\prime$ identically. Choosing the endpoint acceleration does not certify that value: the complete acceleration is recomputed against the resulting quintic history when bounding the defect.

Write $P=T+x$ and $Q=T-x$. Strict subcritical derivative bounds make both clocks increasing, exclude every nontrivial positive-delay self source, and leave one partner source with the sign of receiver position. At contact that partner contribution has its zero limit. The independent instrument inverts the complete monotone reference clock, including the held tail, and encloses its source interval with rational arithmetic. Polynomial coefficient arithmetic is exact; interval operations project outward to dyadic endpoints with 96 fractional bits.

The position defect is zero. The acceleration defect is

$$
r(T)=\widehat x\prime\prime(T)-A[\widehat x](T).
$$

For partner direction $\sigma=\operatorname{sign}(\widehat x)$, the source satisfies $s+\sigma\widehat x(s)=T-\sigma\widehat x(T)$. Put $D=1+\sigma\widehat v(s)$ and $\Delta=T-s$. Then $A=-\sigma k\Delta/D$, and on a regular source sector

$$
s\prime=\frac{1-\sigma\widehat v(T)}D,\qquad s\prime\prime=\frac{-\sigma\widehat a(T)-\sigma\widehat a(s)(s\prime)^2}D.
$$

With $D\prime=\sigma\widehat a(s)s\prime$ and $D\prime\prime=\sigma[\widehat j(s)(s\prime)^2+\widehat a(s)s\prime\prime]$, differentiation gives

$$
A\prime=-\sigma k\left[\frac{1-s\prime}D-\frac{\Delta D\prime}{D^2}\right],
$$

$$
A\prime\prime=-\sigma k\left[-\frac{s\prime\prime}D-\frac{2(1-s\prime)D\prime}{D^2}-\frac{\Delta D\prime\prime}{D^2}+\frac{2\Delta(D\prime)^2}{D^3}\right].
$$

At a receiver midpoint $c$, interval bounds on the complete cell give $|r(T)|\leq |r(c)|+|T-c||r\prime(c)|+(T-c)^2\sup|r\prime\prime|/2$. These are whole-polynomial and whole-source-sector bounds, not residual samples. At source emission $s=0$, reference velocity is continuous but reference acceleration jumps from zero to its emitted value. The first derivative of the row can therefore jump. A straddling source-join cell uses the Lipschitz bound $|r(T)|\leq|r(c)|+|T-c|\sup|r\prime|$ instead. Reference source joins and reference position contacts are isolated rationally and split off into narrow bracket cells. A reference polynomial knot with continuous acceleration permits the second-order bound using the union of its bounded one-sided third derivatives.

## Error bounds, census and existence

A global complete-history floor $m_g>0$ protects the initial source shift. If the receiver position error is $e_x$ and the relevant past position error is $e_{x,s}$, then $|s-\widehat s|\leq(e_x+e_{x,s})/m_g$. The source uncertainty interval is enlarged before retrieving the already certified past errors. Once that same interval contains both exact and reference roots, the mean-value estimate can use its source-local floor: $|s-\widehat s|\leq(e_x+e_{x,s})/m_l$. This second estimate sharpens sensitivity while the global floor still protects the complete subcritical census. A source-local floor $m_l>0$ is then computed on that enlarged interval for both exact and reference derivatives. If $M_s$ bounds reference acceleration there and $\Delta$ bounds the reference delay enlarged by its source shift, the row error obeys

$$
|A-\widehat A|\leq L_x(e_x+e_{x,s})+L_v e_{v,s},\qquad L_x=k\left[\frac1{m_l^2}+\frac{\Delta M_s}{m_l^3}\right],\quad L_v=\frac{k\Delta}{m_l^2}.
$$

For a cell of length $h$, defect bound $R$, fixed historical contribution $H$, and incoming errors $e_x,e_v$, the cooperative radius inequalities close with

$$
\rho_x=\frac{e_x+h e_v+h^2(R+H)/2}{1-h^2L_x/2},\qquad \rho_v=e_v+h(R+H+L_x\rho_x).
$$

The denominator must be positive. If the source uncertainty interval can enter the current cell, its position and velocity errors are bounded by the same current radii, rather than by an additive fixed error allowance. With the completed errors dominated by nondecreasing current radii, the instrument solves the two-component inequalities $\rho_x\geq e_x+h e_v+h^2[R+2L_x\rho_x+L_v\rho_v]/2$ and $\rho_v\geq e_v+h[R+2L_x\rho_x+L_v\rho_v]$ as a positive rational $2\times2$ system. A positive inverse and strict image inclusion are required. Outward endpoint radii must strictly contain the corresponding position and velocity images. If the reference position interval enlarged by the entire declared error tube includes zero, the exact and reference partner directions may differ. That cell uses the contact cancellation bound and a scalar max-norm bootstrap that includes current position, current velocity and completed history. Merely testing the reference position sign is insufficient.

Existence is separately checked on a closed domain of $C^1$ position curves, with velocity their derivative and a bound on its Lipschitz constant. The centered second-order Volterra map uses the fixed completed exact past and the unchanged complete partner law. The receipt requires strict centered self-inclusion, invariance of the acceleration bound defining this curve domain, and $h(1+L_A)<1/2$ for a recorded acceleration Lipschitz bound. An ordinary wholly earlier source uses the local source floor; a current-source or contact chart uses a conservative hereditary bound. These guards give a contraction before an error estimate is promoted to a certificate. The derived statement is conditional on the listed guards and their implementation; an independent review of the instrument remains necessary.

## Controls and current evidence

The executable records known cases before opening its target: an exact constant-row quintic, its cooperative majorant, an analytic held oscillator, a piecewise held/quadratic source-release join, opposite contact directions, and a simple rational polynomial root. For the oscillator, adjacent alternating cosine and scaled-sine partial sums enclose the true analytic value; both endpoints fit the propagated error radii. The known position and velocity radii at $T=1/2$ are approximately $1.009\times10^{-17}$ and $4.060\times10^{-17}$. The source-release join control returns its exact midpoint defect $k$ inside the first-order bound and identifies the straddling chart.

Early exploratory receipts are preserved. They are unaccepted because the initial second-order formula crossed the source-release derivative jump, the early analytic control compared only one partial sum, or the contact test omitted the exact error tube. Later exploration showed that source-local floors materially reduce error amplification. Invalid exploratory endpoints do not certify a prefix and are not physical obstructions. The independently accepted receipt `20261003T210816.461108Z/certificate.json` reaches $1747/256$ with position and velocity radii approximately $0.000583770$ and $0.000997326$. Its frozen subject hash begins `3d8467be`; an independently authored supplemental contraction check replaces its original reference-acceleration existence bound by the stronger exact-past bound on all 3489 fixed-source cells. All 3498 cells pass, with worst corrected contraction product 0.0159798. This supplemental check closes the earlier existence-field gap without modifying that frozen target or claiming it used the stronger field originally.

The independently accepted receipt `20261003T212059.227457Z/certificate.json` reaches $3033/256=11.84765625$ with position and velocity radii approximately $0.000870864$ and $0.000998284$. Its frozen subject hash begins `8382bbc8`. The independent reviewer checks all 6069 cells, including the nine noncontact current-source cells and their supplementary delay bounds. This is a substantially narrower state enclosure than the earlier growing box, but it stops when its declared $10^{-3}$ error tube fails to close. It does not enclose the first speed event. These two acceptances and their exact all-cell checks are recorded in the [independent exact-release check](multiplier-free-linear-exact-release-independent-check.md).

The route cannot certify a speed birth by a uniformly absolute position tube. Extending beyond the first speed event still requires the event-relative source and receiver charts, one-sided Taylor remainders, startup contraction, inherited-fold coupling and exact terminal-family definition described in the exact enclosure treatment. Neither a smaller polynomial defect nor agreement with the numerical trajectory proves that later connection.


## Independently accepted prefix through 12.4

The completed local-root refinement is independently accepted through $T=62/5=12.4$. Its receipt is `.local-data/collinear-research/linear-exact-release-defect/20261003T212800.961633Z/certificate.json`, with frozen generating subject hash `9b5e613a…` and frozen numerical reference hash `1b0b2700…`. The independently authored exact-Fraction receipt audit checks all 6352 cells, including local row coefficients, source interval and delay bounds, historical contributions, exact-past contraction, strict map margins and endpoint enclosures. It is recorded in the [independent exact-release check](multiplier-free-linear-exact-release-independent-check.md), in “Local source sensitivity and completed ordinary prefix.” The minimum global monotonicity floor is approximately 0.00611009 and the maximum contraction product approximately 0.08747, below $1/2$.

Outward decimal presentation of the endpoint enclosures gives

$$
0.873598339044\leq x(12.4)\leq0.873671699962,
$$

$$
-0.992910216726\leq v(12.4)\leq-0.992869612297.
$$

The underlying exact rational bounds, not these displayed decimals, carry the certificate. The position and velocity error radii are approximately $3.66805\times10^{-5}$ and $2.03022\times10^{-5}$. This is a rigorous ordinary prefix of the selected exact-decimal release with complete subcritical census; it does not certify a speed birth or the later fate. A failure of any recorded whole-cell defect, complete root sector, strict inclusion, contraction or acceptance hash would overturn the certified extent.

The unchanged accepted reference is serialized separately under `.local-data/collinear-research/linear-exact-release-defect/adapters/20261003T212800.961633Z`. `profile.json` records exact rational normalized quintic coefficients and knots, all accepted whole-cell position/velocity radii, true acceleration bounds from `map_acceleration_upper`, endpoint enclosures and source hashes. Its content hash is `479dadde…`. Reconstructing this arbitrary center from its frozen generating code verifies its endpoint equality with the accepted receipt; that replay establishes serialization fidelity, not an additional correctness claim for the selected law. Exact quadratic serialization and exact affine/held point, root, velocity and acceleration interface controls pass and are recorded before loading the target adapter.

The immutable `adapter-subject.py` supplies `DefectPastAdapter(profile_path, interval_factory)` to the separate geometry calculation. Its point and source-range methods return the consumer interval type and protect the accepted endpoint. The adapter exposes the complete monotone root inverse, whole-cell velocity range, true source acceleration upper bound and exact endpoint data. It does not interpolate a saved velocity independently from the position derivative or treat the reference curve as the exact history. The separated positive-position incoming auxiliary chart belongs to the geometry calculation; no auxiliary result is asserted here.
