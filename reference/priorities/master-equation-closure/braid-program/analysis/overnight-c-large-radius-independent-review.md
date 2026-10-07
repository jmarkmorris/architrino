# Independent review of the large-radius-ratio exclusion

## Verdict and claim boundary

Claim grade: derived. The frozen [large-radius-ratio theorem](overnight-c-large-radius-ratio-exclusion.md) is valid. In the isolated six-member common-center circular geometry under the unchanged logarithmic equation, no exact balance exists when $r_1=1$, $11\le r_2<r_3$, $|\omega|r_3<1$, and both relative phases are arbitrary. The independently reconstructed upper bound for the inner radial residual is exactly $-35161/738100<0$.

No mathematical defect was found. The proof retains the actual inner partner's transmitter factor and all four outer source contributions. It does not substitute a central acceleration model or use cancellation between distant polarities. The obstruction is that the common angular rate is necessarily small, the inner partner's inward contribution remains close to one-half, and the four outer contributions cannot make up the radial difference.

This is a continuous exclusion of a noncompact radius domain, not a numerical search result or an interval-cover completion. It does not exclude smaller middle radii, superfield or wake-speed histories, unequal angular rates, noncircular paths, or configurations with additional external sources. It establishes no stability or evolution result and confers no scientific acceptance. The pair labels remain persistent; ordering their radii describes this chart rather than relabelling members during motion.

Falsifiers are a missing ordinary root under the stated complete histories, a wrong inner antipodal radial row, failure of the circle-height source-factor bound, an omitted outer source, an incorrect bound direction, an arithmetic error, or an exact circular solution within the specified domain.

## Equation, histories, and source identity

The [logarithmic equation owner](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) supplies the law. With $K_{\log}=c_f=1$, all six complete paths are

$$
X_{a,s}(t)=s r_a e^{i(\omega t+\phi_a)},\qquad q_{a,s}=s,
\qquad a=1,2,3,\quad s=\pm1,
$$

for every real time. At reception time zero, the acceleration is the sum of

$$
q_iq_j\frac{z_{ij}}{|z_{ij}|^2|D_{ij}|},
\qquad z_{ij}=X_i(0)-X_j(-\tau),\qquad |z_{ij}|=\tau>0,
$$

$$
D_{ij}=1-\frac{z_{ij}}{|z_{ij}|}\cdot\dot X_j(-\tau)
$$

over every ordinary positive-delay root. The same-time endpoint is excluded, as specified by the law. There is no speed ceiling, receiver response, modified weight, contact rule, or source truncation. The logarithmic scaling symmetry makes eleven a ratio to the inner radius; it is not a selected physical length.

Complex coordinates only identify the common plane with two real coordinates. Reflection in that plane maps every path to its complex conjugate, changes $(\omega,\phi_a)$ to $(-\omega,-\phi_a)$, preserves distances and source-factor scalar products, and reflects the acceleration in the same way. Since all phases are allowed, this is a symmetry of the class. It therefore suffices to prove the radial exclusion for $\omega\ge0$. Equivalently, all final rate bounds may be written with $u=|\omega|$.

`shasum -a 256` measured the frozen subject as `374beae4f163ff8af1718661964e53dd39985788f7b71ae7e23b50bc5f1c1be3`, matching the assignment. The reviewer reconstructed the claims from the equation and Euclidean geometry without reading or importing any author-side arithmetic implementation. The live Specialist role directory was re-listed and the assigned `ramon-e-moore` lens reread before this review; role selection supplies no evidentiary authority.

## Complete root census without a compact radius bound

Claim grade: derived. Fix any finite choice of the allowed radii, phases, and angular rate. Each source has speed $v_j=\omega r_j<1$. For a fixed receiver define $h_{ij}(\tau)=|X_i(0)-X_j(-\tau)|-\tau$. The bounded source velocity implies

$$
h_{ij}(\tau_2)-h_{ij}(\tau_1)
\le-(1-v_j)(\tau_2-\tau_1)
\quad\text{for }\tau_2>\tau_1\ge0.
$$

For different members the present distance is positive. Within a pair it is $2r_a$; across pairs it is at least the strictly positive radius difference. Thus $h_{ij}(0)>0$. Bounded circular positions imply $h_{ij}(\tau)<0$ for $\tau>r_i+r_j$, so each partner channel has exactly one positive root. At that root the distance is positive and $D_{ij}\ge1-v_j>0$, proving that the root is ordinary. For self, $h_{ii}(0)=0$ and strict decrease excludes every positive delay. The zero-delay endpoint remains outside the sum.

Hence all six receivers have five partner roots each, giving thirty directed partner roots and no positive-delay self roots. The complete histories and the entire half-line are covered; an old emission cannot evade the radius-sum bound. Rotation covariance gives the same count at every reception time.

No uniform upper delay bound or global transmitter-factor floor over the entire unbounded parameter domain is required. Each fixed configuration has finite radii and strictly subfield sources, so the argument applies to it. The outer radii may approach one another, and the largest source speed may approach one from below; those limits can weaken bounds in some channels without introducing a missing root in any allowed configuration. The particular inner-receiver channels used below have a stronger uniform source-factor floor.

## Actual inner partner contribution

Claim grade: derived. Place the positive inner receiver at $(1,0)$. Its negative partner has delayed relative angle $\theta_0=\pi-\omega\tau_0$. The common-rate condition gives $\omega<1/r_3<1/11$; using the non-strict upper bound $1/11$ is conservative. The geometric range bound gives $0<\tau_0\le2$. Therefore $x=\omega\tau_0/2$ satisfies $0\le x\le1/11<\pi/2$, and the antipodal causal equation is exactly

$$
\tau_0=2\cos x.
$$

The source factor evaluated at emission is

$$
D_0=1+\frac{\omega\sin(\pi-2x)}{\tau_0}
=1+\omega\sin x.
$$

The radial logarithmic row, including the opposite-polarity sign, is

$$
A_{r,0}=-\frac{1-\cos(\pi-2x)}{\tau_0^2D_0}
=-\frac{2\cos^2x}{4\cos^2xD_0}
=-\frac1{2D_0}.
$$

This derives the actual delayed partner contribution; it assumes neither an instantaneous law nor an imposed central acceleration. Since $\sin x\le x$, the range bound yields

$$
1\le D_0\le1+\omega x
=1+\frac{\omega^2\tau_0}{2}
\le1+\omega^2.
$$

Taking the reciprocal with the negative numerator gives the upper bound in the needed direction:

$$
A_{r,0}\le-\frac1{2(1+\omega^2)}
\le-\frac{121}{244}.
$$

The final inequality uses $\omega^2\le1/121$ and the fact that $-1/[2(1+s)]$ increases with $s\ge0$. It makes the inward contribution as small in magnitude as the proof permits, which is conservative when seeking an upper bound on the radial residual. At $\omega=0$, the same formulas give $\tau_0=2$, $D_0=1$, and $A_{r,0}=-1/2$ exactly.

## Circle-height bound for the outer sources

Claim grade: derived. Let a source lie on either outer circle of radius $b>1$, and let $\theta$ be its actual delayed relative angle to the inner receiver. Its chord distance is

$$
d^2=1+b^2-2b\cos\theta,
\qquad d\ge b-1>0.
$$

The identity

$$
d^2-b^2\sin^2\theta=(1-b\cos\theta)^2\ge0
$$

implies $b|\sin\theta|/d\le1$. This controls the projection of source velocity along the received chord more sharply than its full speed. The actual source factor at the root is

$$
D=1+\frac{\omega b\sin\theta}{d}
\ge1-\omega\ge\frac{10}{11}>0.
$$

The floor depends on the inner receiver radius and common angular rate. It therefore remains useful even if an outer source's full speed $\omega b$ is arbitrarily close to one. The equation's absolute denominator equals $D$ on these channels.

Unit polarity gives the vector magnitude of each logarithmic row as $1/(dD)$. Its radial component, whatever its polarity and phase, is bounded above by that norm:

$$
A_{r,j}\le\frac1{(1-\omega)(b-1)}.
$$

At one inner receiver there are exactly four outer sources: two endpoints at $r_2$ and two at $r_3$, each supplying its unique positive-delay root. Hence

$$
A_{r,\mathrm{outer}}\le\frac2{1-\omega}
\left(\frac1{r_2-1}+\frac1{r_3-1}\right).
$$

No neutral-pair cancellation has been assumed. Outer accelerations that happen to point inward only strengthen the final obstruction.

More generally, if both outer radii are at least $R>1$, then $\omega\le1/R$ and each reciprocal separation is at most $1/(R-1)$. These inequalities give

$$
A_{r,\mathrm{outer}}\le
2\frac{R}{R-1}\frac2{R-1}
=\frac{4R}{(R-1)^2}.
$$

For $R=11$ this is $11/25$. A uniform lower bound on $r_3-r_2$ is unnecessary for this step: the proof evaluates their contributions to the inner receiver, whose separation from either outer circle is at least ten. Large or poorly conditioned mutual outer-pair contributions cannot restore the inner equation that already fails.

## Exact radial contradiction

Claim grade: derived. Circular kinematics at radius one requires total radial acceleration $-\omega^2$. The necessary residual is therefore

$$
F_{1,r}=A_{r,0}+A_{r,\mathrm{outer}}+\omega^2.
$$

The three independent upper bounds give

$$
F_{1,r}\le-\frac{121}{244}+\frac{11}{25}+\frac1{121}
=-\frac{35161}{738100}<0.
$$

Every replacement makes this residual larger, so its strictly negative upper bound excludes zero for every allowed phase and arbitrarily large outer radii. Failure of this one necessary component excludes a full-vector circular solution; no conclusion about tangential balance or stability is needed. Reflection transfers the result to negative angular rates, and the zero-rate case is included directly.

The bound is uniform as $|\omega|r_3$ tends to one from below. That does not include the boundary itself: the complete-root argument for the entire six-member system assumes strict subfield speed. No change to the ordinary-root convention or continuation across that boundary is inferred.

## Known-first exact checks and receipts

The [independent exact checker](../evidence/overnight-c-review-large-radius-exact.py) uses Python's rational arithmetic and imports no subject code or saved result. Before target arithmetic, its [controls](../evidence/overnight-c-review-large-radius-controls.json) checked elementary fractions, the exact circle-height equality at $b=5/3$, $\cos\theta=3/5$, $\sin\theta=4/5$, and $d=4/3$, the resulting source-factor lower value $9/10$ at rate $1/10$, and the static inner antipodal radial row $-1/2$. The tangency control is a geometric identity check, not an assertion that this smaller-radius example belongs to the exclusion domain.

Only after the successful controls receipt was recorded did the [target calculation](../evidence/overnight-c-review-large-radius-target.json) evaluate the radius-eleven constants. It returned $D_0\le122/121$, the inner-receiver outer-source floor $10/11$, circular term $1/121$, partner radial upper bound $-121/244$, outer radial upper bound $11/25$, and residual upper bound $-35161/738100$. Finite label enumeration returned thirty directed partner channels and four outer source labels per inner receiver; the analytical census proves that each partner label supplies exactly one root.

Both commands exited zero under the executable shared venv:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-large-radius-exact.py controls > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-large-radius-controls.json
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-large-radius-exact.py target --controls reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-large-radius-controls.json > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-large-radius-target.json
```

The review instrument SHA-256 is `a0e55e0c0a0d511f0f57e817c3e5f4bc05250f78050cbb8457bc1827f682fde2`. Target execution requires a passed controls receipt matching that hash. These receipts corroborate the exact arithmetic and finite counts; the derivation, rather than a root search or numerical sampling, establishes the continuous exclusion.

Scoped validation parsed the new Python source with `ast.parse` under the shared venv and checked all five relative file-link targets with `test -f`; both exited zero. `git diff --no-index --check /dev/null` on the new Markdown returned 1 against the empty source and emitted no whitespace diagnostics. Final `shasum -a 256` measurements retained the assigned subject hash and review-instrument hash. `git --no-optional-locks status --short` restricted to the four new review paths listed those four as untracked; that inspection establishes no broader checkout condition.

Files created are this review, `evidence/overnight-c-review-large-radius-exact.py`, `evidence/overnight-c-review-large-radius-controls.json`, and `evidence/overnight-c-review-large-radius-target.json`, all under the Braid Program owner. No subject, shared owner, earlier review, production file, or publication state was changed by this review. No sustained computation or cover replay was performed. The review is complete with no mathematical blocker found; the parent owns integration and any acceptance decision.
