# Ramon E. Moore Review: Field-Speed-Ceiling Mathematics Packet, Sections 1–11

**Review identifier:** FSC-001-REM1-2026-08-02 **Reviewer lens:** [Ramon E. Moore — Certified Interval and All-Root Enumeration Analyst](../../research-office/specialists/roles-geometry-dynamics/ramon-e-moore.md) **Review date:** 2026-08-02 **Review target:** [mathematics-geometry-dynamical-system.md](mathematics-geometry-dynamical-system.md), read from the top through the end of Section 11; Sections 12 and later are out of scope for this review. **Claim level:** review findings only — nothing in this file adopts, promotes, or advances any target-document claim; certified enclosures below certify declared mathematical contracts only. **Instruments:** analytic re-derivation by hand; `mpmath 1.3.0` interval arithmetic (`mpmath.iv`, outward-rounded endpoints, working precision 60 decimal digits) for enclosures; `mpmath.mp` 60-digit point arithmetic and IEEE-754 binary64 (`math`) runs used only as provenance diagnostics. The shared repo venv was not reachable from the sandbox used for this review; the system `python3` with `mpmath 1.3.0` was used instead and is named at each numerical claim.

---

## 1. Verdict summary

Sections 1–11 are, by the standards of this lens, unusually certifiable: every root equation displayed in scope is a scalar equation with an explicit Jacobian floor, and I was able to certify every one of them. The analytic content I checked — the projection algebra of Sections 7–8, the fold and transfer arithmetic of Section 5, the monotonicity/rigidity theorems of Section 9, the collinear chart derivatives of Section 10.7 and 10.9, and the complete circular and helical binary charts of Section 11 — is correct as stated, with the gaps noted below. The four displayed decimals in scope are all uncertified floating-point evaluations; two of them are wrong in their final digit(s) (REM-1, REM-2), and both defects are reproducible binary64 artifacts. Certified replacements with stated method and rounding control are supplied in Section 4.

Plainly: the mathematics in these sections holds up under independent re-derivation, and the numbers are almost right — but two of the four printed decimals carry wrong final digits inherited from ordinary double-precision arithmetic. This review replaces all four with rigorous interval enclosures and shows how the whole binary chart can be certified end to end.

---

## 2. Verification census

The Moore lens requires an explicit inventory: what was checked, by what instrument, and what remains unresolved. Everything below was re-derived by hand unless a numerical instrument is named.

| Target-document unit | Check performed | Result |
| --- | --- | --- |
| §4 root function $g$, $D_t$ definition, coarea collapse weight $1/\lvert D_t\rvert$ | dimensional and algebraic consistency | verified |
| §5 modified half-delay equation $\xi=\lambda\cos\xi$, one positive root | re-derived from the §11.1 chord geometry; uniqueness from Jacobian floor | verified |
| §5 lower-regime floor $D_t\ge c_f-c_a>0$ | reverse triangle + speed bound | verified |
| §5 simple-branch transfer identity $dS/dT=D_r/D_t$ and mirror density $\propto(T_{\mathrm c}-s)^{-2}$, far-part finiteness, $\rho^{-1}$ divergence | direct computation | verified |
| §5 fold negative control: $s_\pm=s_0\pm\sqrt{\varepsilon/a}$, $\lvert g'(s_\pm)\rvert=2\sqrt{a\varepsilon}$, weight sum $1/\sqrt{a\varepsilon}$ | direct computation | verified |
| §6 $\pi_1(\mathcal B_{c_a})=\pi_1(S^2)=0$ | standard | verified |
| §7 minimal-selection argument, $\lambda=(\hat{\mathbf v}\cdot\mathbf A_{\mathrm{ord}})_+$ a.e., catching-up scheme bounds | re-derived (a.e. vanishing of $d\lVert\mathbf V\rVert^2/dT$ on level sets of an $AC$ function; projection nonexpansiveness) | verified |
| §8 projection formula, $1$-Lipschitz bound, three boundary cases, two-wake example, $\kappa_{\mathrm{path}}=\lVert\mathbf A_\perp\rVert/c_a^2$ | direct computation | verified |
| §9 root monotonicity, zero-set trichotomy, characteristic-interval rigidity, $g''=0$ at interior degenerate roots, root-stability constant $2/d_{\min}$ | re-derived | verified |
| §10.7 $ds/dT=2/(1-u(s))$, coincidence time $T_\ast+q_\ast$, causal equality on the ceiling interval | re-derived | verified |
| §10.9 frozen-root factors $g=2s$, $D_t=2$, $D_r=0$, $dS/dT=0$; regular-chart equivalence $dS/D_r=dT/D_t$ | re-derived, $c_f=1$ | verified |
| §11.1 chord $r_{12}=2R\lvert\cos\xi\rvert$, root equation, $D_t=D_r=c_f(1+\lambda\sin\xi_\lambda)$, ledger row, $R_{\ast,\lambda}$, $\lvert\omega_{\ast,\lambda}\rvert$, monotonicity rewrite, chart minimum | re-derived; identity also checked to interval residual $\le1.5\times10^{-58}$ (`mpmath.iv`) | verified |
| §11.1.1 Dottie root uniqueness, no same-transmitter root (chord $<$ arc), tangential/radial split, unique compatible radius | re-derived | verified |
| §11.1.1 four displayed decimals | certified enclosures, interval Newton (`mpmath.iv`) | two wrong final digits: REM-1, REM-2; two correct: see REM-3 |
| §11.1.2 helical causal equation reduction to $\xi=\cos\xi$, $D_t=D_r=(v^2/c_f)(1+\sin D)$, $\hat{\mathbf r}$ decomposition, raw parallel scalar, negative axial effective component | re-derived, all displayed formulas confirmed | verified |
| §11.1.3 endpoint relation $R^-\lvert\omega^-\rvert=R^+\lvert\omega^+\rvert=c_f$ | trivial | verified |
| §11.2 loss of monotone channel structure for $c_a>c_f$ | structural check against §9 proof | verified (see REM-14) |

No analytic error was found in scope other than the two decimal defects. No unresolved boxes remain for the scalar root equations in scope; unresolved items in the target document (event strata, history-to-ledger theorem) are formulation obligations, not root-census failures, and are outside what interval certification can decide.

Plainly: I re-derived every formula in Sections 1–11 that can be checked by computation and certified every number. The only outright mistakes found are two final-digit decimal errors. Everything else on my checklist passed, and the genuinely open items are missing definitions, not wrong calculations.

---

## 3. Findings

### REM-1 — ERROR: the displayed Dottie decimal has a wrong final digit

Quoted statement (Section 11.1.1):

> $$\xi_0 \approx 0.7390851332151607.$$

The unique real root of $\cos x=x$ satisfies the certified enclosure

$$
\xi_0
\in
[\,0.739085133215160641655312087673873404013411,\;
0.739085133215160641655312087673873404013412\,],
$$

so the correctly rounded 16-decimal value is $\xi_0\approx0.7390851332151606$, not $\ldots607$. The displayed string is exactly the shortest binary64 representation produced by iterating `cos` in double precision (reproduced: 200 binary64 iterations from $0.5$ yield the repr `0.7390851332151607`); as a decimal approximation it is off by one unit in the last place, since $\xi_0-0.7390851332151606\in[4.16,4.18]\times10^{-17}<5\times10^{-17}$.

Correct replacement:

$$
\xi_0 \approx 0.7390851332151606
\qquad\text{or, better,}\qquad
\xi_0 = 0.73908513321516064165531208767387340401341\ldots
$$

Certification method: interval Newton on $f(x)=\cos x-x$ over $X_0=[0.7390,0.7391]$ with outward-rounded interval arithmetic (`mpmath.iv`, 60 digits). The Newton image satisfied $N(X)\subset\operatorname{int}X$ (existence and uniqueness in $X_0$), and iterated intersection contracted the enclosure to width $\le7.8\times10^{-62}$. Global uniqueness on $\mathbb R$ is analytic: $f'(x)=-\sin x-1\le0$ with $f'\le-1$ near the root, plus the document's own range argument. Sign certificates at the two decimal endpoints were computed with outward rounding: $f(0.7390851332151606)>0$, $f(0.7390851332151607)<0$.

Claim grade: `derived (certified enclosure, conditional on the correctness of mpmath.iv outward rounding)`. Falsifier: any independent interval package (for example INTLAB, Arb, or kv) producing an enclosure of the root of $\cos x=x$ disjoint from the interval above, or a verified sign evaluation showing $f(0.7390851332151606)\le0$.

Plainly: the famous constant's sixteenth decimal is a 6, not a 7. The 7 is what a computer's standard 16-digit arithmetic prints, because the nearest representable machine number happens to sit just above the true value. The fix is one digit, but the lesson is bigger: printed decimals should come from certified intervals, not from whatever the hardware rounds to.

### REM-2 — ERROR: the displayed compatible-radius decimal has wrong final digits

Quoted statement (Section 11.1.1, in normalized wake-speed units $c_f=1$):

> $$R_\ast \approx 0.20211137351526115\,K.$$

With $R_\ast=K/\bigl(4\xi_0(1+\sin\xi_0)\bigr)$ and the certified $\xi_0$ enclosure of REM-1 propagated by outward-rounded interval arithmetic,

$$
R_\ast/K
\in
[\,0.202111373515261134942347508350806076694,\;
0.202111373515261134942347508350806076695\,].
$$

The correctly rounded 17-significant-digit value is $R_\ast\approx0.20211137351526113\,K$ (the next digits are $494\ldots$, which round down). The displayed value $0.20211137351526115$ is off by two units in the seventeenth significant digit and is exactly what binary64 evaluation of $1/(4x(1+\sin x))$ at the binary64 Dottie approximation returns (reproduced with `math` in `python3`).

Correct replacement:

$$
R_\ast \approx 0.20211137351526113\,K
\qquad\text{or, rounded shorter,}\qquad
R_\ast \approx 0.2021113735152611\,K.
$$

Claim grade: `derived (certified enclosure, same instrument and conditionality as REM-1)`. Falsifier: an independent verified evaluation of $1/(4\xi_0(1+\sin\xi_0))$ producing an enclosure disjoint from the interval above. Scope note: the same defective decimal string recurs at least once in Section 12 material (out of scope here); the Section 12 reviewer should carry this correction forward.

Plainly: the selected binary radius inherits the same double-precision smudge as the angle it is built from, and here the error is two units in the last printed digit. Since this number is the headline output of the whole binary chart, it deserves a certified value more than any other number in the document.

### REM-3 — GAP: no displayed decimal carries a method, precision, or rounding statement

All four in-scope decimals (Section 11.1.1) are bare floating-point evaluations: no method, working precision, rounding mode, or error bound is stated for any of them, and the two defects above show the provenance is binary64. For completeness, the other two decimals are correct as printed:

- $\theta\approx1.4781702664303213$ radians is the correctly rounded 17-significant-digit value of $2\xi_0=1.478170266430321283310624175\ldots$ (certified enclosure in Section 4);
- $\theta\approx84.6929176682^\circ$ is the correctly rounded 12-significant-digit value of $84.6929176681858380987\ldots^\circ$. Note this one is *rounded*, not truncated — the true digit string continues $\ldots6818\ldots$ — so a reader hand-checking digits against a longer table will see an apparent mismatch in the final digit unless the display convention is stated.

Recommended repair: adopt one display convention for the packet — every numerical constant is either (a) an enclosure $[\underline x,\overline x]$ with named instrument and rounding control, or (b) a correctly rounded decimal explicitly tagged `diagnostic, binary64` (or `diagnostic, N-digit`). The document already says "the decimal is only a numerical evaluation" for $\xi_0$; that sentence should be promoted into a uniform convention with stated precision.

Claim grade for the two confirmations: `derived (certified enclosure)`; grade for the recommendation: `proposed convention`. Falsifier for the confirmations: independent verified enclosures disjoint from those in Section 4.

Plainly: two of the four printed numbers are right and two are wrong, and nothing in the text lets a reader tell which is which. A one-line label on each number — how it was computed and to how many trustworthy digits — would make every decimal in the packet checkable at a glance.

### REM-4 — GAP: the general-$\lambda$ root factors are displayed without derivation

Section 11.1 displays

$$
D_t=D_r=c_f(1+\lambda\sin\xi_\lambda)>0
$$

for the at-or-below-wake-speed circular chart, but derives the corresponding factors only in the equality specialization (11.1.1, and independently for the helix in 11.1.2). The general-$\lambda$ statement is correct; I verified it directly. With receiver $\mathbf X_1=R\mathbf e_r(T)$, transmitter $\mathbf X_2=-R\mathbf e_r(S)$, $S=T-\Delta$, $\xi=\lvert\omega\rvert\Delta/2$, one gets $\hat{\mathbf r}=\bigl(\mathbf e_r(T)+\mathbf e_r(S)\bigr)/(2\cos\xi)$ and the two dot products

$$
\hat{\mathbf r}\cdot\mathbf V_t(S)
=-c_a\sin\xi,
\qquad
\hat{\mathbf r}\cdot\mathbf V_r(T)
=-c_a\sin\xi,
$$

each from $\mathbf e_r(T)\cdot\mathbf e_\theta(S)=\sin2\xi=2\sin\xi\cos\xi$ and $\mathbf e_r(S)\cdot\mathbf e_\theta(T)=-\sin2\xi$, giving $D_t=D_r=c_f+c_a\sin\xi=c_f(1+\lambda\sin\xi)$.

Recommended repair: add these two lines (or a pointer to the equality-chart derivation with the $\lambda$ substitution called out) where the display first appears, so the general-$\lambda$ chart does not silently borrow the equality proof.

Claim grade: `derived (verifying the target display)`. Falsifier: a correct computation of either dot product on the declared chart giving a value other than $-c_a\sin\xi$.

Plainly: the formula for how steeply the causal condition cuts the two paths is stated for all speed ratios but only proved for the special equal-speed case. The two-line general proof is included above; pasting it in closes the gap.

### REM-5 — GAP: the compatible-radius monotonicity argument leaves its factor facts unstated

Section 11.1 proves that $R_{\ast,\lambda}$ decreases via the rewrite

$$
c_a^2\cos\xi_\lambda(1+\lambda\sin\xi_\lambda)
=
c_f^2\,\frac{\xi_\lambda^2}{\cos\xi_\lambda}\bigl(1+\xi_\lambda\tan\xi_\lambda\bigr),
$$

then asserts that "the right-hand denominator factor" increases strictly on $(0,D]$. Two supporting facts are used silently: (i) the rewrite is an exact algebraic identity given $\xi_\lambda=\lambda\cos\xi_\lambda$ and $c_a=\lambda c_f$ (substitute $\lambda=\xi/\cos\xi$; I confirmed it symbolically, and the interval residual at $\lambda\in\{1/4,1/2,3/4,1\}$ is bounded by $1.5\times10^{-58}$, consistent with exactness at working precision); (ii) on $(0,\pi/2)\supset(0,D]$ each of $\xi^2$, $1/\cos\xi$, and $1+\xi\tan\xi$ is positive and strictly increasing, so their product is, and $\lambda(\xi)=\xi/\cos\xi$ is strictly increasing, so the map $\lambda\mapsto\xi_\lambda$ is a strictly increasing bijection onto $(0,D]$. Both facts are elementary but load-bearing; stating them makes the proof self-contained.

Claim grade: `derived (verifying the target argument)`. Falsifier: exhibition of $\xi\in(0,D]$ at which the identity fails or one of the named factors is non-increasing.

Plainly: the shrinking-radius claim is right, but the proof rests on two small facts the text never says out loud — that the rewrite is exact and that each piece of the rewritten denominator grows. One sentence naming them makes the argument airtight.

### REM-6 — GAP: no conditioning statement accompanies any root equation or stratum boundary

Nowhere in Sections 1–11 is the conditioning of a displayed root equation quantified, although this lens regards a conditioning report as part of any root claim. The facts are strikingly favorable and deserve display:

1. **Root equations.** For $F_\lambda(\xi)=\xi-\lambda\cos\xi$, the Jacobian is $F_\lambda'(\xi)=1+\lambda\sin\xi\ge1$ uniformly in $\lambda\in(0,1]$ — a hard floor of $1$ with certified enclosure values $1.0600\ldots$ at $\lambda=1/4$ up to $1.6736\ldots$ at $\lambda=1$ (Section 4). The sensitivity of the root to the parameter is $d\xi_\lambda/d\lambda=\cos\xi_\lambda/(1+\lambda\sin\xi_\lambda)\in(0,1)$: the family is uniformly perfectly conditioned.
2. **Chart factors.** On the circular family the transmitter factor $D_t=c_f(1+\lambda\sin\xi_\lambda)\in[c_f,\,c_f(1+\sin D)]$ never approaches zero — the chart itself has no small-denominator hazard at any $\lambda$, including equality.
3. **Strata boundaries.** All genuine ill-conditioning is confined to the stratum boundaries of Section 9's catalogue: the uniform floors $D_t,D_r\ge c_f-c_a$ used for stratum exclusion are vacuous at $\lambda=1$; the frozen stratum $D_r=0$ is reachable only at equality; and the mirror endpoint is an inverse-square divergence, not a conditioning loss. A validated continuation of any chart toward $\lambda=1$ must therefore treat equality as a boundary case rather than relying on gap-dependent floors.

Recommended repair: attach a one-line conditioning note (Jacobian floor, factor bounds, and which floors die at $\lambda=1$) to Sections 5, 9, and 11.1.

Claim grade: `derived` for the three numbered facts; `proposed convention` for the repair. Falsifier: a point of the declared family where $1+\lambda\sin\xi_\lambda<1$, or a circular-chart root with $D_t<c_f$.

Plainly: these root problems are about as well-behaved as scalar equations get — their sensitivity never exceeds one — while every dangerous cancellation lives exactly on the exceptional-event boundaries the document already catalogues. Saying so in the text tells future numerical work where care is and is not needed.

### REM-7 — IMPROVE: reduce every Section 11 constant to one certified constant

Every number displayed in Sections 5 and 11 is an explicit algebraic function of the single constant $D$ (or, in the family, of $\xi_\lambda$). Using $\cos D=D$:

$$
\sin D=\sqrt{1-D^2},
\qquad
R_\ast=\frac{K}{4D\bigl(1+\sqrt{1-D^2}\bigr)},
\qquad
\lvert\omega_\ast\rvert=\frac{4D\bigl(1+\sqrt{1-D^2}\bigr)}{K},
$$

in $c_f=1$ units, with $r_{12}=2R_\ast D$ and $\Delta=2R_\ast D$. (I verified $\sin D$ by both routes; the trigonometric and algebraic enclosures agree to all 40 displayed digits — see Section 4.) Storing one certified enclosure for $D$ and evaluating these algebraic forms in interval arithmetic certifies every displayed number in the section simultaneously, and removes all dependence on verified trigonometric function evaluation beyond the single root certificate.

Claim grade: `derived` for the identities; `proposed presentation change` for the repair. Falsifier: any displayed Section 11 constant not expressible in the certified-$D$ algebra (none exists in scope).

Plainly: one number generates all the others by square roots and arithmetic. Certify that one number once, to any precision desired, and every decimal in the section comes along for free.

### REM-8 — IMPROVE: parameterize the binary family by $\xi$, not $\lambda$

The family map $\lambda\mapsto\xi_\lambda$ requires solving a transcendental equation for each $\lambda$. Its inverse is explicit: $\lambda(\xi)=\xi/\cos\xi$ is a strictly increasing analytic bijection $(0,D]\to(0,1]$, and along it

$$
c_a(\xi)=c_f\,\frac{\xi}{\cos\xi},
\qquad
R_\ast(\xi)
=
\frac{K\cos\xi}{4c_f^2\,\xi^2\bigl(1+\xi\tan\xi\bigr)},
$$

both closed-form. Reparameterizing the family by $\xi\in(0,D]$ turns every family-wide statement (monotonicity, endpoint minimum, floors) into direct interval evaluation with no root solving at all: validated continuation of the whole at-or-below-wake-speed chart becomes a one-pass interval sweep. This also makes the equality endpoint manifestly interior to the formulas (only the *stratum* structure changes there, per REM-6).

Claim grade: `derived` for the closed forms (they restate the document's own identity from REM-5); `proposed restructuring` for the presentation. Falsifier: a $\xi\in(0,D]$ at which $R_\ast(\xi)$ above differs from the document's $K/\bigl(4c_a^2\cos\xi(1+\lambda\sin\xi)\bigr)$ under $\lambda=\xi/\cos\xi$.

Plainly: instead of picking a speed ratio and hunting for the angle, pick the angle and read off the speed ratio — the formulas then need no equation solving anywhere in the family, which makes rigorous computation trivial.

### REM-9 — IMPROVE: state the uniqueness proofs in interval-Newton-ready form

The document's uniqueness arguments ("$\xi-\lambda\cos\xi$ is strictly increasing on $[0,\lambda]$, negative at zero, positive at $\lambda$"; "$\cos x-x$ is strictly decreasing on $[0,1]$") are precisely the hypotheses of the interval Newton existence-and-uniqueness theorem with a unit Jacobian floor. One sentence per root — "on the bracket $[0,\lambda]$, $F_\lambda'\ge1$, so a single interval Newton step with any midpoint yields a verified enclosure, and $N(X)\subset\operatorname{int}X$ certifies existence and uniqueness" — would convert each uniqueness paragraph into a recipe any implementation can execute and any referee can replay. The same sentence documents the contraction rate: with $F'\in[1,2]$ on the bracket, the Newton image width is bounded by the bracket width times $\bigl(1-\inf F'/\sup F'\bigr)\le1/2$ before quadratic convergence sets in.

Claim grade: `proposed presentation change`; the underlying facts are the document's own. Falsifier: none needed (presentation item); the executable claim is falsified if an interval Newton step on the stated bracket fails to contract.

Plainly: the proofs already contain everything a verified computation needs; they just are not phrased as instructions. Phrasing them that way lets the document's own arguments double as machine-checkable certificates.

### REM-10 — ADVANCE: certified enclosures for the key constants (delivered)

The following enclosures were computed for this review with `mpmath.iv` (outward-rounded interval arithmetic, 60-digit working precision), each root certified by an interval Newton step with $N(X)\subset\operatorname{int}X$ and subsequent verified contraction to width below $10^{-59}$; derived quantities were propagated through interval arithmetic from the root enclosures. Decimal endpoints below are truncation brackets of the certified intervals (each true value lies strictly between the printed bounds). Units: $c_f=1$.

| Quantity | Certified enclosure |
| --- | --- |
| $\xi_0=D$ ($\cos D=D$) | $[0.739085133215160641655312087673873404013411,\ 0.739085133215160641655312087673873404013412]$ |
| $\theta=2\xi_0$ (rad) | $[1.478170266430321283310624175347746808026,\ 1.478170266430321283310624175347746808028]$ |
| $\theta$ (degrees) | $[84.692917668185838098706235596354,\ 84.692917668185838098706235596355]$ |
| $\sin\xi_0=\sqrt{1-\xi_0^2}$ | $[0.673612029183214815342745965698523109004,\ 0.673612029183214815342745965698523109005]$ |
| $R_\ast/K$ | $[0.202111373515261134942347508350806076694,\ 0.202111373515261134942347508350806076695]$ |
| $\lvert\omega_\ast\rvert K$ | $[4.94776707815748656498509296621403315086,\ 4.94776707815748656498509296621403315087]$ |
| $\xi_{1/4}$ | $[0.24267468064089020166843630197,\ 0.24267468064089020166843630198]$ |
| $\xi_{1/2}$ | $[0.45018361129487357303653869676,\ 0.45018361129487357303653869677]$ |
| $\xi_{3/4}$ | $[0.61331035270355230704001423017,\ 0.61331035270355230704001423018]$ |
| $R_{\ast,1/4}/K$ | $[3.8872185808452876600815344836,\ 3.8872185808452876600815344837]$ |
| $R_{\ast,1/2}/K$ | $[0.91219568810841381109013340337,\ 0.91219568810841381109013340338]$ |
| $R_{\ast,3/4}/K$ | $[0.37962212130811328928249128952,\ 0.37962212130811328928249128953]$ |

Certified Jacobian enclosures $1+\lambda\sin\xi_\lambda$ at $\lambda=1/4,\,1/2,\,3/4,\,1$: $1.0600\ldots$, $1.2175\ldots$, $1.4316\ldots$, $1.6736\ldots$ — all comfortably above the uniform floor $1$. The three lower-ceiling rows also confirm the strict decrease of $R_{\ast,\lambda}$ asserted in Section 11.1 at those parameter points (the analytic proof, per REM-5, covers the whole family).

Claim grade: `derived (certified enclosures, conditional on mpmath.iv outward-rounding correctness; single-library caveat)`. The high-precision point values agree with all displayed enclosure digits, but both computations share the `mpmath` codebase, so this agreement is a consistency check, not independent evidence. Falsifier: an enclosure from an independently authored verified-arithmetic package (Arb, INTLAB, kv) disjoint from any row above. Replay: interval Newton on $F_\lambda(\xi)=\xi-\lambda\cos\xi$ over $[0,\lambda]$, midpoint at bracket center, eight iterations, `iv.dps = 60`.

Plainly: here are the guaranteed values, with every digit shown lying between proven bounds. Anyone with an interval-arithmetic library can reproduce them from the two-line recipe; anyone without one can at least check the sign tests at the printed endpoints by hand at high precision.

### REM-11 — ADVANCE: the two-label binary chart is fully certifiable today — proof structure

The prescribed circular binary of Section 11.1 admits a complete computer-assisted certificate now, with no new mathematics. Structure:

1. **Complete per-channel census.** Section 9's monotonicity theorem says $s\mapsto g(T_r,s)$ is nondecreasing on each ordered channel, so the root set is empty, one point, or one interval. This is exactly the analytic ingredient that upgrades a local interval certificate to a *complete* census: a verified sign change plus monotonicity is an all-root certificate for the channel, with no unresolved boxes possible.
2. **Partner channel.** The census reduces to the scalar equation $\xi=\lambda\lvert\cos\xi\rvert$; the bracket $[0,\lambda]$, floor $F'\ge1$, and interval Newton give verified existence, uniqueness, and enclosure (delivered in REM-10). Simplicity is certified by the Jacobian enclosure $D_t\ge c_f$.
3. **Same-transmitter exclusion.** Analytic, no numerics needed: for the circular path, chord $2R\lvert\sin(\omega\delta/2)\rvert$ versus causal length $c_f\delta\ge R\lvert\omega\rvert\delta$ reduces to $\lvert\sin x\rvert<x$ for $x>0$ (equality case), and to the strict speed gap for $\lambda<1$. Prefer this theorem to any sampled exclusion sweep.
4. **Compatibility.** The radius identity is algebra in the certified root (REM-7); interval propagation certifies the zero pointwise residual of the prescribed chart at $R_\ast$ within the enclosure.

The resulting artifact would be an All-Root Certificate for the two-label chart: one isolated simple partner root per receiver (enclosed), all other strata excluded by theorem, and the compatible radius enclosed. What it would *not* certify — matching the document's own claim boundary — is existence in a retained-history solution class, capture, or stability.

Claim grade: `proposed certification plan` with `derived` ingredients (each step's ingredient is either proved in the target document or delivered in this review). Falsifier: a step of the plan whose hypothesis fails on the declared chart — e.g., a verified two-sign-change bracket in one ordered channel, which would contradict monotonicity.

Plainly: because the ceiling makes each channel's root problem a one-dimensional monotone equation, a computer-assisted proof of the binary chart is not a research project but an afternoon's work, and the pieces are all in this review. The honest limit is that it certifies the prescribed geometry, not the dynamics.

### REM-12 — ADVANCE: the helical exclusion is uniformly conditioned — no small denominators

Section 11.1.2's negative result can be certified with a robustness bonus the document does not notice. Writing the partner-row magnitude $C=Kc_f/(r^2D_t)$ on the helical chart and substituting $r=c_f\Delta$, $v\Delta=2R\cos D$, $D_t=(v^2/c_f)(1+\sin D)$ gives the exact identity

$$
C=\frac{K}{4R^2\cos^2D\,(1+\sin D)},
$$

independent of the translation split $(u,v)$ at fixed $R$ — the $v^2$ factors cancel — and equal to the non-translating equality-chart magnitude. I verified this identity symbolically and numerically to 25 digits at $u=0.3$ and $u=0.6$ ($c_f=1$, $R=1$: both give $C=0.2734615600181785421203616\ldots$). Consequently the retained axial residual satisfies

$$
\bigl(\mathbf A_{12}^{\mathrm{eff}}\bigr)_z
\le-\frac{Cu}{c_f}<0,
$$

with $C$ bounded away from zero uniformly on the whole family: the exclusion margin is *linear* in $u$ with a nonvanishing certified coefficient, even as $D_t\to0$ in the drift limit $v\to0$. A certified exclusion statement ("no zero-residual uniform helix for any $u\ge u_0>0$") therefore needs no small- denominator analysis; a single interval evaluation of $C$ suffices.

Claim grade: `derived (identity and bound); diagnostic (25-digit spot check)`. Falsifier: a value of $(u,v)$ with $u^2+v^2=c_f^2$, $u>0$, at which a correct evaluation of $Kc_f/(r^2D_t)$ on the declared chart differs from the displayed $R$-only expression.

Plainly: as the pair devotes more of its speed budget to drifting, two competing effects — a weaker geometric cut and a longer causal reach — cancel exactly, so the backward drag on the drift never fades. That makes the "no steady helix" result not just true but robust, and trivially certifiable.

### REM-13 — ADVANCE: validated-numerics structure for the eventual braid chart

Section 11 hands Section 12 a criterion (net parallel scalar $g_i\ge0$ plus a perpendicular vector equality) whose eventual computer-assisted treatment should be planned now, because sampling can only reject candidates. The structure this lens recommends:

1. **Unknowns.** Fourier coefficients of the six paths on the common return period, plus the per-channel delay roots $\tau_{i\leftarrow j}(T)$ as auxiliary unknowns satisfying the scalar causal equation — never eliminated numerically, so their Jacobian floors $D_t\ge d_0$ enter the certificate explicitly.
2. **Operator.** A Newton–Kantorovich / radii-polynomial argument in a Banach space of geometrically decaying Fourier coefficients: bound the residual $Y$, the approximate-inverse defect $Z_0$, the Lipschitz/second- derivative term $Z_2$, and find $r>0$ with the radii polynomial negative — this yields existence and local uniqueness of an exact periodic chart near the numerical candidate.
3. **Inequality constraint.** $\min_Tg_i(T)\ge0$ is a rigorous range-bounding problem, not a root problem: certify it with interval Taylor models or Fourier/Chebyshev range enclosures over the whole period. If the minimum is near zero (grazing), the certificate must either prove a strict margin or route the grazing time to the event-domain analysis — do not coerce it.
4. **Census discipline.** The per-channel monotonicity theorem again supplies completeness of the root census on each channel, provided the certified chart stays inside the ceiling-admissible class; that hypothesis ($\lVert\mathbf V_i\rVert\le c_f$ everywhere) must itself be a certified range bound, since the Fourier truncation error could otherwise breach the ceiling invisibly.

Claim grade: `proposed theorem plan`. Falsifier: a demonstration that the delay-root auxiliary system fails to be locally invertible on a candidate braid chart despite certified floors — which would route the candidate to the singular-analysis track rather than invalidating the plan's applicability where its hypotheses hold.

Plainly: when the braid search produces a promising candidate, the way to turn it into a theorem is a standard modern recipe — prove the equations have an exact solution near the computed one, with all delays carried as explicit unknowns and every "stays nonnegative" claim proved over the whole cycle rather than at sample times.

### REM-14 — INSIGHT: the certification frontier coincides with the event-domain frontier

A structural observation ties this review together. In the $c_a\le c_f$ regimes, every root problem in scope is scalar, monotone, and uniformly conditioned (REM-6, REM-11): interval methods deliver complete censuses, and nothing regular can hide. Every place where certification fails is precisely a declared stratum of Section 9's catalogue: the frozen root ($D_r=0$, only at equality), the characteristic interval (rigidity chord), the mirror zero-range endpoint, and cross-channel simultaneity. Conversely, Section 11.2's caution about $c_a>c_f$ has an exact interval-analytic reading: above wake speed the monotonicity theorem fails, per-channel root sets can be multi-point, and the complete-census structure — the very thing that made Sections 5–11 certifiable — is lost. The boundary of what validated numerics can certify is thus not an artifact of method: it is the same boundary the document draws between its regular partial model and its unresolved event domain. This is unusual and healthy; in most delay systems the numerics fail before the formulation does.

Claim grade: `structural observation (inferred from derived ingredients)`. Falsifier: a regular in-scope root problem (no stratum involvement, $c_a\le c_f$) that resists a complete interval census, or a certified complete census for a genuinely above-wake-speed channel obtained without new admission rules.

Plainly: everywhere the theory currently knows what it means, a computer can prove the numbers; everywhere a computer cannot prove the numbers, the theory has already admitted it does not yet know what it means. The two frontiers line up exactly, which tells us the missing work is conceptual, not computational.

---

## 4. Method and replay record

**Root certification.** Interval Newton with outward rounding: for $F(\xi)=\xi-\lambda\cos\xi$ (and $f(x)=\cos x-x$), operator $N(X)=m-F(m)/F'(X)$ with thin-interval midpoint $m$; the containment $N(X)\subset\operatorname{int}X$ observed at the first step certifies existence and uniqueness of a simple root in $X$; iterated intersection contracted all enclosures to width $\le10^{-59}$. Environment: `python3` with `mpmath 1.3.0`, `iv.dps = 60`, on the review sandbox. All derived constants were propagated from root enclosures through `mpmath.iv` arithmetic only; no point value entered any certified claim.

**Independence boundary.** All enclosures share one library (`mpmath`), so cross-checks within it (trig versus algebraic $\sin D$; point versus interval values) are consistency checks, not independent evidence. The two ERROR findings additionally rest on hand-checkable facts: certified signs of $\cos x-x$ at two printed rational endpoints, and exact reproduction of both defective strings by binary64 evaluation (`math.cos` iteration; binary64 evaluation of $1/(4x(1+\sin x))$), which is an independent code path from `mpmath`. An operator can replay the sign checks in any high-precision system in one line each.

**Falsification, globally.** Every certified interval in this review is overturned by a disjoint enclosure from an independently authored verified package; every analytic verification is overturned by a concrete counter- computation on the declared chart; the two ERROR findings are overturned if a correctly rounded high-precision evaluation reproduces the displayed final digits.

Plainly: the recipe, precision, and rounding discipline behind every number in this review are stated so that a stranger with a different tool can try to break them. That, and not agreement between two runs of the same code, is what makes an enclosure worth printing.
