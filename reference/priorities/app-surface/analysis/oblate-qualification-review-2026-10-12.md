# Independent oblate-spheroid qualification review

## Scope and independence

The operator selected SURFACE-003's oblate interacting subcase, retaining the sphere as a control. This independent assignment owns only the new [oblate reference instrument](../../../../scripts/eom/fixtures/surface-oblate-reference.py) and this review. The stable agent ID `/root/design_review` remains attached to the display assignment `surface-003 independent reference`. Root owns the [scenario and production receipt](oblate-qualification-2026-10-12.md), requests, EOM execution and integration. The production EOM, frozen spherical reference and interaction oracle are read-only to this reviewer. This task selects no ring-torus run, UI expansion, free release, stability investigation or physical energy interpretation.

The new instrument reuses the immutable independently authored spherical reference's delayed root solve, interaction kernel interface, rational Bernstein conversion, cubic evaluator, ledger indexing/coverage and common-time comparison helpers. A separate `LatitudeHistory` subclass supplies the exact constant-height circular preparation; its future evaluation delegates to the unchanged cubic owner. The oblate projection, parameterized geometry controls, weighted dense bounds, case admission and shape-contrast readout are independently authored here, without production imports. Reusing independent helpers does not make comparison against the production subject self-reproduction. No reference helper or oracle is modified to accommodate a result.

## Selected geometry and constrained equation

**Derived:** let the equatorial radius be $a>0$, polar radius $c=qa$ with $0<q\le1$, and $D=\operatorname{diag}(a^{-2},a^{-2},c^{-2})$. The surface is $\mathbf X^{\mathsf T}D\mathbf X=1$. For tangent velocity $\mathbf V$, differentiation gives $\mathbf X^{\mathsf T}D\mathbf V=0$ and $\mathbf X^{\mathsf T}D\ddot{\mathbf X}+\mathbf V^{\mathsf T}D\mathbf V=0$. Writing $\mathbf u=D\mathbf X$, the normal projection of the receiver-total interaction $\mathbf A$ and the required curvature are

$$
\mathbf A_{\rm normal}=\frac{\mathbf u\cdot\mathbf A}{\mathbf u\cdot\mathbf u}\mathbf u,
\qquad
\mathbf A_{\rm curvature}=-\frac{\mathbf V^{\mathsf T}D\mathbf V}{\mathbf u\cdot\mathbf u}\mathbf u.
$$

Thus $\ddot{\mathbf X}=\mathbf A-\mathbf A_{\rm normal}+\mathbf A_{\rm curvature}$ and artificial support is $\mathbf A_{\rm curvature}-\mathbf A_{\rm normal}$. These are the selected normal-only kinematic support equations; they are not a physical confinement mechanism. At $q=1$, the common factor in $D=a^{-2}I$ cancels and the equations recover the spherical projector/curvature, including their off-surface nominal evaluation.

The selected oblate past has $a=0.1$, $c=0.06$, cylindrical radius $\rho=0.06$, constant height $z=0.048$, angular speed $0.1$ and speed $0.006$. It lies exactly on the surface because $(\rho/a,z/c)=(3/5,4/5)$. The spherical controls use the same reduced latitude with height $0.08$. All numerical instances have $c_f=1$, canonical coupling $10^{-6}$, alternating 3:3 phases, prescribed memory $[-0.5,0]$ and computed future $[0,0.15]$.

An independent parameterization is $\mathbf Y(\theta,\lambda)=(a\cos\lambda\cos\theta,a\cos\lambda\sin\theta,c\sin\lambda)$. The cross product of its two tangent derivatives gives the outward normal. At $\sin\lambda=4/5$, $\cos\lambda=3/5$, $\theta=0$, projecting the known latitude-circle second derivative $(-\rho\omega^2,0,0)$ onto that normal gives the normal curvature. Its tangential remainder is the circle's geodesic curvature. The circle is prescribed preparation; this decomposition does not claim that a free normal-only supported future remains at constant height.

**Known exact values:** the oblate normal curvature at this point is $(-0.1944/1924,0,-0.432/1924)$, while the remaining tangential circle acceleration is nonzero. The reference additionally projects a supplied nonzero geometry-harness interaction using the parameterized unit normal and compares tangent, discarded normal and support with the quadratic implementation. A reversed curvature sign violates the twice-differentiated constraint, and omitting flattening changes the independently parameterized normal/curvature. These controls exercise the polar geometry rather than an equatorial invariant plane.

## Whole-segment weighted polynomial bounds

**Derived:** for a nominal cubic $\mathbf x(t)$, all quadratic products below are polynomials with exact rational coefficients. Conversion to Bernstein form over 64 closed subcells bounds each complete segment by the convex hull of its coefficients. It does not sample only endpoints or midpoints. Set $s=\mathbf x^{\mathsf T}D\mathbf x>0$. The radial map $\mathbf x/\sqrt{s}$ lies on the ellipsoid, and $\|\mathbf x\|\le a\sqrt{s}$, so

$$
\operatorname{dist}(\mathbf x,\Sigma)\le\left\|\mathbf x-\frac{\mathbf x}{\sqrt{s}}\right\|\le a|\sqrt{s}-1|.
$$

Consequently a componentwise emitted position tube with Euclidean radius $e_x$ has surface-distance bound $a\max|\sqrt{s}-1|+e_x$. This is a proved global radial upper bound, not a bare local residual/gradient approximation or the exact nearest-point distance.

For tangency let $p=\mathbf x^{\mathsf T}D\mathbf v$, $\mathbf u=D\mathbf x$, $L=\|D\|=c^{-2}$, and let $e_v$ be the Euclidean velocity radius. Rational polynomial bounds independently enclose $p$, $\|\mathbf u\|^2$, $\|D\mathbf v\|^2$, $\|\mathbf x\|^2$ and $\|\mathbf v\|^2$. Writing their positive lower/upper normal bounds as $u_{\min},u_{\max}$ and the upper weighted-velocity bound as $v_{D,\max}$, the complete actual tube satisfies

$$
\frac{|(D\mathbf X)\cdot\mathbf V|}{\|D\mathbf X\|}
\le
\frac{\max|p|+u_{\max}e_v+v_{D,\max}e_x+Le_xe_v}{u_{\min}-Le_x},
\qquad u_{\min}-Le_x>0.
$$

This follows by expanding $(D(\mathbf x+\delta\mathbf x))\cdot(\mathbf v+\delta\mathbf v)$ and applying Cauchy–Schwarz to each uncertainty term. The denominator uses the reverse triangle inequality. The script refuses a nonpositive denominator. Speed is bounded by the nominal polynomial velocity maximum plus $e_v$; ambient radius is bounded by the nominal position maximum plus $e_x$. These bounds concern retained polynomial centers and their declared tubes. They do not independently prove that those tubes include a coherent constrained solution; reviewed production inclusion remains that premise.

## Root completeness and finite memory

**Derived, conditional on coherent paths in the validated tubes:** for reception $T$ define $F(S)=\|\mathbf X_i(T)-\mathbf X_j(S)\|-(T-S)$. If source speed is at most $u<1$, the reverse triangle inequality gives $F(S_2)-F(S_1)\ge(1-u)(S_2-S_1)$ for $S_2>S_1$, including points where the distance vanishes. Thus the causal residual is strictly increasing without assuming a differentiable distance at contact.

The exact initial principal phase separation exceeds 1.04. Initial adjacent chord separation is at least $2\rho\sin(1.04/2)>0.059$. With each whole retained velocity tube below 0.02 over $[0,0.15]$, the two-member displacement budget is at most 0.006, leaving simultaneous separation above 0.053. The independent instrument uses its measured tighter velocity maximum in that margin. The prescribed past speed is exactly 0.006. All nominal/tube ambient radii must stay below 0.1001, so $F(-0.5)\le0.2002-(T+0.5)\le-0.2998$ and $F(T)>0$. Exactly one strictly past partner root follows over the entire declared future window and retained memory. For a self path, $\|\mathbf X_i(T)-\mathbf X_i(S)\|\le u(T-S)<T-S$ excludes every positive-delay self root; the coincident endpoint follows the selected exclusion rule.

An unprovided older tail is excluded only under the additional scenario assumption that those older paths also stay on the same fixed ellipsoid or within the same ambient-radius tube. Then $S<-0.5$ gives distance at most 0.2002 and wake delay at least 0.5. This is an explicit sufficient tail assumption, not measured reconstruction of unknown past. Without it, the qualification remains restricted to the declared retained memory.

The reference checks all 30 full-slab ordered partner identities, six diagnostic identities, contiguous reception coverage, all 36 ordered point-snapshot pairs and their self/partner multiplicities, all future path joins and endpoint coverage, and one solution row per published segment. At each retained midpoint it independently solves roots, evaluates the unchanged kernel, sums at each receiver and checks all six constrained acceleration parts plus the solution acceleration box. Full-slab ledgers and production solution certificates do not become independent proofs merely because their flags exist; the independently derived root theorem and polynomial screens supply their stated additional checks.

## Predeclared acceptance and comparisons

The midpoint ODE residual limit is $2\times10^{-5}$, inherited as a fixed bounded criterion rather than derived from position/velocity error radii. Root/factor and acceleration disagreement between 70 and 100 decimal digits must be below $10^{-45}$. Complete accepted endpoint, computed-source feedback, nonzero interaction/tangent signals and meridional position/velocity motion are required. Full polynomial/tube distance and tangency must fit their declared geometry tolerances. Root uniqueness requires the whole-time speed/radius/separation margins above.

Use explicit common-time comparison edges `oblate-base:oblate-step`, `oblate-step:oblate-tight`, and `q1-control:sphere-control`. Their nominal histories must agree within summed emitted position/velocity radii; neither agreement nor smaller steps proves asymptotic convergence. The script rejects treating changed flattening as a refinement. If both `oblate-base` and `q1-control` are supplied, a separate shape-contrast readout compares endpoint vertical displacement relative to each case's exact initial height. Its magnitude must exceed the summed emitted vertical radii plus $10^{-12}$ for each member. This exhibits a resolved difference in this matched reduced-latitude scenario; changed initial height is explicit, so no universal isolated constitutive dependence or energy law follows.

## Known-case receipt and frozen instrument

**Measured before any target read:** shared-venv execution of `surface-oblate-reference.py --known-only` returned exit 0 in 0.041508375 seconds after the final instrument edit. The inherited static root was $-0.15$ with residual 0 and known acceleration $(-0.000025,0,0)$. New parameterized oblate normal/geodesic curvature, nonzero-interaction projector/support, exact $q=1$ recovery, wrong-sign/omitted-flattening negatives, constant-height analytic past and full-interior bow controls passed. The output reports `targetReads: 0` and curvature `[-0.00010103950103950103950104, 0, -0.000224532224532224532224532]`. A preliminary known-only pass also occurred before the final projector/contrast strengthening; only the final source below is offered for target qualification.

- New independent source SHA-256: `12f3e2e9e150040e7cb78ead946cbd04191ee21739d798cfc8d29315556f371c`.
- Frozen spherical helper SHA-256: `20f1534998299e4c6202b51b93b42938043e6ab3c3d8ab9ecbb14e72af80c976`.
- Frozen interaction oracle SHA-256: `a3b94301b2994c29e1107de44d627db9566abe9cda60ec8e00b89d9351a275f6`.

These identities are measured by `shasum -a 256` for the existing helpers and by the final known-only instrument's SHA-256 output for the newly authored file. The script also rejects changed helper/oracle hashes before controls or target reads. Root will launch the five-case target reference under the live supervised compute owner; this reviewer has launched no target worker and has read no raw target result to tune the reference.

## Final receipt adjudication

**Measured independent comparison:** direct reads of the actual five-case report, full reference stderr and supervisor lease establish that the frozen reference completed with exit 0 and its process group closed. The known controls precede all per-case progress in stderr; every case reaches all six paths at both 70 and 100 decimal digits. Lease `160699e0-83bd-47b2-b8d7-c59b9339e648` reports 274.181 seconds elapsed; the instrument itself reports 274.0566576249985 seconds. These are actual elapsed measurements for different boundaries, not a comparative cost claim. No duplicate target reference, browser action or source modification was performed by this reviewer.

A short independent Node audit first passed the known SHA-256 of `abc`, positive/negative source-row parsing and a known JSON extraction, then checked the retained targets. It confirms the retained `independent-report.json` is byte-identical to the supervised stdout and has SHA-256 `9aace25c9b5360d1330f6104de247392b59b231e43b9a2f138a6aa1f7cdf8148`. All five request/response hashes match the frozen report. The report's source/helper/oracle identities match current bytes and the pre-target freeze above. All 82 authored compiled-source entries independently match both the retained source snapshot and live `src/eom` files, and the source-preimage hash is `73fca86f9e0a2ec032ba015d83aed447e0f99a40aee8d7f7b22d6e4acaa88fcb`. The retained engine hash is `d0ba308fcf04240444bbed16d8dc2c5ecae16f127225feabc7bc17ba17c6b63c`; every accepted response binds that compiled source identity. This establishes the measured source/artifact binding for these observations, not a proof of every possible compiled execution or a full external-toolchain inventory.

The same audit reads the complete raw responses and confirms completed coverage through 0.15, durable checkpoints and published-segment/certificate population consistency. A separate known maximum/sum control precedes aggregate metric extraction. At **each** reference precision, the instrument evaluates 1260 retained midpoints and 6300 ordered partner roots, including 2532 emissions in solver-generated future history. These are independent midpoint comparison counts, distinct from the producer's point snapshots and full-slab records.

| Case | Retained midpoints / published segments | Partner midpoint roots | Computed-source midpoint roots | Independent distance upper screen | Independent tangency upper screen | Maximum midpoint ODE residual |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Oblate base | 180 | 900 | 360 | $5.78633\times10^{-10}$ | $7.83374\times10^{-9}$ | $2.00668\times10^{-11}$ |
| Oblate half-step | 360 | 1800 | 726 | $6.81646\times10^{-10}$ | $1.04165\times10^{-8}$ | $1.76072\times10^{-11}$ |
| Oblate tight | 360 | 1800 | 726 | $6.81510\times10^{-10}$ | $1.04155\times10^{-8}$ | $1.76072\times10^{-11}$ |
| Oblate $q=1$ control | 180 | 900 | 360 | $7.22503\times10^{-10}$ | $9.81138\times10^{-9}$ | $2.04436\times10^{-11}$ |
| Matched sphere control | 180 | 900 | 360 | $7.22503\times10^{-10}$ | $9.81138\times10^{-9}$ | $2.04436\times10^{-11}$ |

The tabulated bounds are conservatively rounded upward from the report; the raw report retains the instrument's full values. All geometry screens fit the selected tolerances, all midpoint residuals fit the fixed $2\times10^{-5}$ criterion, and independent point roots/factors, six receiver-total acceleration parts and solution acceleration boxes pass inclusion. The largest reference root/factor discrepancy is approximately $4.916\times10^{-59}$ and acceleration discrepancy approximately $2.484\times10^{-63}$, below the fixed $10^{-45}$ precision criterion. This is external 70/100-digit refinement; no separate sweep of the production solver's precision profile is implied.

**Measured accounting/domain checks:** the raw base response's 180 published segments match its 180 solution rows; its producer accounting has 90 self-pair rows, 450 partner-pair rows, 36 ordered identities per point snapshot, 11,520 full-slab receiver diagnostic rows and 23,208 computed-source slab rows. Half-step/tight have 360 solution rows and 23,040 diagnostic rows; their raw outputs and independent midpoint census preserve the complete ordered populations. These producer counts are retained accounting evidence, while the separate instrument checks actual identity sets, multiplicities and continuous coverage. The maximum independent velocity-tube screen among all five cases is approximately 0.006000312954; ambient radii stay below 0.1001. Reported simultaneous partner separation remains above 0.0581999 and causal monotonicity above 0.9939996. The derived whole-time root/self theorem therefore applies conditional on the reviewed coherent-solution premise. The older-tail exclusion still needs the stated whole-past fixed-shape/tube assumption.

**Measured refinement and spherical recovery:** common-time position differences are approximately $8.76320\times10^{-14}$ for base:half-step, $7.00426\times10^{-18}$ for half-step:tight and $1.01473\times10^{-22}$ for $q=1$:sphere. Corresponding velocity differences are approximately $1.25102\times10^{-12}$, $1.39626\times10^{-17}$ and $2.13242\times10^{-20}$. Every sampled component lies within summed emitted radii; the largest position/velocity budget ratios for base:half-step are below 0.000786/0.000926. The comparison queries are finite common-time samples and do not independently prove a full-time refinement theorem. Total emitted-tube screens need not decrease with a smaller step: the half-step bound is larger than base here. No monotonic convergence-rate claim is made.

**Measured meaningful flattening case:** independently evaluated vertical midpoint changes and velocities are nonzero in every case. In the oblate base, maximum sampled vertical displacement from the exact initial height is approximately $1.68196\times10^{-6}$ and maximum vertical speed approximately $2.28067\times10^{-5}$. At the common endpoint, the oblate:$q=1$ difference in vertical displacement **relative to each exact initial height** is approximately $4.91663911\times10^{-7}$ for every member. Summed emitted vertical radii range from approximately $2.21709\times10^{-10}$ to $4.41328\times10^{-10}$, so all six differences are resolved beyond uncertainty and the predeclared $10^{-12}$ extra margin. This qualifies a finite matched reduced-latitude shape observation. The mapped initial heights differ, so it does not isolate an all-scenario constitutive law.

**Measured negative and operational controls:** independently reading the invalid height-0.049 inspection and evolution responses confirms `surface_preparation_not_certified`, with no published extension. The invalid run receipt reports rejected, zero accepted steps and null coverage. Filtered supervisor lease reads confirm the fresh build, five producer runs and reference run all completed with exit 0 and `processGroupClosed:true`; build lease `911ac9e7-7a4e-4e06-a15f-52ef7bde7ae9` reports 23.012 seconds with empty stderr. These are scoped closed-group receipts, not a claim about every unrelated job in this shared checkout. Root retains final preservation, queue integration and owner-closeout duties.

## Current disposition

✓ **Selected finite oblate interacting subcase and matched $q=1$/sphere controls qualified.** The frozen independently authored instrument, parameterized known controls, complete retained output, independent root/kernel/support comparisons, rational whole-segment nominal-plus-tube screens, finite refinement consistency and actual meridional shape contrast meet this predeclared bounded target. Reviewed production constrained-solution inclusion remains the solution-existence premise; the independent instrument supplies point acceleration/root checks and full polynomial/tube geometry screens, not a second full-slab existence solver. Causal completeness is bounded to declared memory unless the explicit older fixed-surface/tube assumption is adopted.

This result qualifies only the stated supported six-member oblate scenario over $[0,0.15]$ and its controls. It does not complete all of SURFACE-003: ring-torus comparison remains deferred. The Surface app still supports its existing spherical viewer; no oblate UI availability or native chooser retest follows from this calculation. No broader preparation, stronger coupling, later time, unsupported chart/event, settling, stability, free-release retention or physical energy–radius–frequency law is accepted.

A point outside the production root/acceleration enclosure, an excessive independent dense geometry budget, incomplete causal accounting, a residual/precision failure, a refinement discrepancy beyond summed radii, failed $q=1$ recovery or unresolved meridional shape contrast falsifies its respective acceptance obligation. Check the frozen report and exact retained request/response identities above; preserved local evidence is not an independently verified backup.
