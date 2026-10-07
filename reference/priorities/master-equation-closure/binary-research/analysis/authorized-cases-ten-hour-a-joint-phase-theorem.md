# Joint transformed-state bounds for the unchanged Maxwell E phase error

## Scope and case freeze

**Status: ◐ Derived candidate; independent assessment and target application pending.** This Package A method uses the original Section 7 Maxwell E opposite-polarity mirror planar pair, with $K=c_f=1$, speed $3/10$, radius $25/9$ and angular rate $27/250$. The [ten-hour assignment](../../brainstorming.md#package-a--maxwell-e-move-from-repaired-bounds-toward-physical-fate) supplies authority. No physical equation, preparation, source acceleration, root census or continuation rule changes. The method sharpens an error functional already present in the [signed-current theorem](../evidence/maxwell-e-first-event-neutral-signed-current-theorem.md).

Write $x_-(t)=-x_+(t)$ and let $c(t)=(25/9)(\cos(27t/250),\sin(27t/250))$. The literal complete past is $x_+(t)=c(t)$ for $t\le-\delta$ and

$$
x_+(t)=c(t)+\frac12\Delta a\,t^2(1+t/\delta)^3,\qquad -\delta\le t\le0.
$$

Here $\Delta a$ is the original E acceleration at release computed from the unchanged circle source, minus $c''(0)$, and $\delta=\min(\tau/8,(1-\beta)/(12|\Delta a|),\sqrt{r/(8|\Delta a|)})$ with the original circle partner delay $\tau$, $\beta=3/10$ and $r=25/9$. These are the same exact preparation definitions used by the [frozen preparation source](../evidence/maxwell-shaped-overnight-preparation.mjs); decimal comparison parameters remain comparison data and retain their separately bounded preparation mismatch. The polynomial and its first two derivatives vanish at $-\delta$, its position and velocity vanish at zero, and its second derivative at zero equals $\Delta a$. Thus the supplied past has the stated $C^{2,1}$ seams and acceleration compatibility. The old tail is prescribed preparation, not a coupled solution. Its retained complete speed bound is $19/40<1$.

On the separated strictly subfield incoming domain, the complete partner-root census is exactly one and the positive-delay self census is empty by the complete-history chord argument. All physical source accelerations remain in the original E response and its reconstruction. The conditional no-prior-unit-speed assumption, complete source support and positive radius/range/transmitter denominator are inherited, never inferred from the new angular estimate. The strongest old actual prefix through approximately $56.72222$, its contraction on $[20,55]$, and the repaired method prefix through approximately $54.64670$ remain distinct.

The fixed receiving trial for the first application is the literal old failed cell

$$
[L,U]=[7674713329844545,7675202001679113]/140737488355328.
$$

Its trial radius, transformed norm, physical velocity and metric are taken without enlargement from `failure.candidate` in the immutable `fine-E-neutral-Cartesian54-T59p57-v1.json`. The primary comparison is `fine-E-conditional-extension-v1.history.json`; the old continuum-defect inventory is `fine-E-conditional-group4-defect-v1.json.jsonl`. Their exact identities and admissions are required before any target. The existing [same-coordinate endpoint proof](../evidence/maxwell-e-onehour-subject-proof-endpoint-continuation.md) governs reuse of the old endpoint. No endpoint or phase reset occurs.

## Exact angular functional

At a receiving time, let $r_a,r_c>0$ be actual and comparison radii, $\rho=r_a-r_c$, and $z=(z_r,z_t)$ the difference of their intrinsic transformed velocities $p=u+q$. The intrinsic radial axes are aligned as in the signed-current theorem; the corresponding tangential axes are counterclockwise. The source/root mean-value family provides

$$
\delta u_t=z_t-Q_t\rho-f_t.
$$

The scalar $Q_t$ is the tangential component of the current radial derivative of $q$, and $f_t$ is the remaining tangential source error. The whole-cell bounds on these quantities include the physical delayed source X/V/A inventories, the complete angular window and every nominal mean-value root. They are not nominal-point derivatives. Let $v_{c,t}$ be comparison tangential velocity. Direct polar differentiation gives

$$
\delta\omega=\frac{z_t-k\rho-f_t}{r_c+\rho},\qquad k=Q_t+v_{c,t}/r_c.
$$

This identity preserves the shared radial variable in numerator and denominator. Bounding its three numerator terms separately discards information supplied by the already admitted transformed norm.

## Support of the admitted joint set

On a complete closed cell, suppose the retained bounds are

$$
\nu^2\rho^2+z_r^2+z_t^2\le W^2,\qquad |\rho|\le R,\qquad |f_t|\le F,
$$

where $\nu>0$, $W,R,F\ge0$, and $r_c\ge m>R$. The $W$ here is the whole-cell bound, never the smaller endpoint-only `Wend`. Define $a=\min(R,W/\nu)$ and, for $b\ge0$,

$$
H(b)=\max_{0\le s\le a}\left[\sqrt{W^2-\nu^2s^2}+bs\right].
$$

The function $H$ is the support of the admitted ellipse intersected with the radial slab: for any real $d$, $z_t-d\rho\le H(|d|)$. Indeed $|z_t|\le\sqrt{W^2-\nu^2\rho^2}$, and maximizing first over the sign of $\rho$ produces the displayed one-variable maximum. The discarded $z_r^2\ge0$ only enlarges this valid projection. It does not create a separate bound $|z_t|=W$ simultaneously with $|\rho|=W/\nu$.

The maximum has an explicit form. Set $s_*=bW/(\nu\sqrt{\nu^2+b^2})$. If $a\ge s_*$, then $H(b)=W\sqrt{1+(b/\nu)^2}$. Otherwise $H(b)=\sqrt{W^2-\nu^2a^2}+ba$. To see this, the derivative of the objective on $0<s<W/\nu$ is $b-\nu^2s/\sqrt{W^2-\nu^2s^2}$, strictly decreasing from $b$ to negative infinity. Its unique zero is $s_*$; the objective increases before this point and decreases after it. The zero cases $W=0$, $a=0$ and $b=0$ follow directly. An implementation may avoid uncertain comparisons by taking any independently verified upper bound on $H$; the simple ellipse and rectangle supports are both upper bounds, and their minimum remains valid.

## Linear-fractional bound without a phase reset

Let the whole-cell coefficient enclosure be $k\in[k_-,k_+]$. A nonnegative rational $\lambda$ certifies $|\delta\omega|\le\lambda$ if

$$
\max\left\{
H\!\left(\max(|k_-+\lambda|,|k_++\lambda|)\right),
H\!\left(\max(|k_--\lambda|,|k_+-\lambda|)\right)
\right\}+F\le\lambda m.
$$

For the upper inequality, positivity of $r_c+\rho$ makes $\delta\omega\le\lambda$ equivalent to $z_t-(k+\lambda)\rho-f_t\le\lambda r_c$. Its left side is bounded by the first support term plus $F$. For the lower inequality, negate the numerator to obtain $-z_t+(k-\lambda)\rho+f_t\le\lambda r_c$. Symmetry of the ellipse gives the second support term. Replacing $r_c$ by its lower bound $m$ weakens the right side, so the two displayed support tests suffice for all admitted tuples. A numerical search supplies a candidate $\lambda$ only; the exact final inequality supplies the certificate. No assumed correlation of $f_t$ with the current state is used.

For the symmetric absolute coefficient bound $B=\max(|k_-|,|k_+|)$, both support arguments are bounded by $B+\lambda$. Consequently the simpler test $H(B+\lambda)+F\le\lambda m$ is sufficient. This simplicity loses any one-sided coefficient advantage but retains the ellipse and denominator dependence. A guaranteed finite trial is $\lambda_0=(W+Ba+F)/(m-a)$, because the rectangle support $H(b)\le W+ba$ proves its inequality. Outward rounding or positive rational padding handles a nonexact square-root enclosure. Searching below this trial cannot invalidate a previous certified upper.

The lemma is an alternative same-history error representation. It is not a proof of cancellation of the actual signed angular error, and its validity does not depend on observing cancellation. In particular it cannot reconstruct signed errors from `omega` or `angularPrefix` alone.

## Complete source-to-receiver coverage

For each already admitted closed physical cell, keep the old nonnegative angular density if the joint inputs are absent. Where all joint inputs are present and admitted, replace it by the smaller of the old density and the new certified $\lambda$. Recompute the nonnegative cumulative integral from the identical initial face, preserving every original time face and the supplied negative-time density. Both choices bound the same actual angular-rate error, so their minimum is valid. At a common face either adjacent complete cell is valid; no source seam is omitted.

For any possible physical emission $S\in P=[P_-,P_+]$ and receiving $T\in[L,U]$, integrate the completed piecewise constant upper densities over $[P_-,L]$ and retain the original prescribed receiving-trial density over $[L,U]$. The result bounds $|\delta\theta(T)-\delta\theta(S)|$ by the fundamental theorem for the continuous polar lifts. It includes both partial endpoint cells exactly. Choosing the earlier source face and later receiving face is valid because every integrand bound is nonnegative. A zero-length interval contributes zero. The old negative-time data remain mandatory if the window reaches them.

No new receiving-density estimate is needed to close the fixed current trial. Thus the first application uses only previously admitted cells for the gain and retains the full old current trial, avoiding a circular use of an as-yet-unproved current $W$. All source/root/coefficient families must then be rebuilt from this completed angular integral. Existing source-support refinement may be applied only with each stage's complete recomputation and root-inclusion proof. Physical source errors themselves remain unchanged. A valid improvement is a strict decrease of the whole angular-window bound together with strict closure of the unchanged trial's transformed-state, radius and physical-velocity inequalities.

## Known analytical controls and falsifiers

The support calculation must first reproduce the unconstrained ellipse $W=\nu=1$, $b=3/4$, $a=1$, for which $H=5/4$ at $s=3/5$. A clipped control has $a=3/5$, $b=2$ and gives $H=2$ at the slab face, since the square-root term is $4/5$. A linear-fractional control has $W=3/5$, $\nu=1$, $R=3/5$, $m=1$, $k=F=0$ and exact angular supremum $3/4$; the old separated denominator estimate gives $3/2$. Its extremizer is $\rho=-9/25$, $z_t=12/25$. These are kinematic controls of the method, not substitute E preparations. The corresponding sign reversal attains the negative extremum. Exact zero data must give zero, and nonpositive radius, negative magnitudes or an endpoint-only norm must be rejected by the admission interface.

The integral control must cover two partial endpoint cells, a same-cell interval, a closed zero-length seam, a negative-time contribution and the unmodified current trial. An attempted lookup past completed physical history must reject. The same-history binding and coefficient-input admission are separate from these arithmetic controls.

The theorem fails if the norm is not jointly valid, if a `Wend` endpoint estimate replaces a whole-cell bound, if $Q_t$ or $f_t$ belongs to a different source/root family, if comparison tangential velocity lacks whole-cell support, if a radius denominator is nonpositive, or if any completed/partial cell is omitted. The target gain is falsified by no strict angular improvement or by any failed rebuilt strict receiving inequality. Neither outcome decides physical fate.
