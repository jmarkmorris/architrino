# Independent ring-torus qualification review

## Assignment and evidence boundary

The operator selected the ring-torus scientific subcase of SURFACE-003 on 2026-10-14. Display assignment: `surface-003 torus independent review`; the existing immutable worker identity is retained. Root owns the [scenario and acceptance packet](torus-qualification-2026-10-14.md), production driver, numerical execution, retention and queue/manuscript integration. This reviewer owns only the new [independent reference](../../../../scripts/eom/fixtures/surface-torus-reference.py), this review and explicit-use scratch under `.tmp/surface-torus-qualification/`. Production EOM, app code and the original oblate/Stage D/kernel references remain read-only. The [review skill](../../../op/skills/skill-architrino-review.md) selects the mathematical review procedure; the operator's explicit new-reference/review ownership permits these captures despite that procedure's default read-only mode.

The selected torus is centered and unrotated with major radius $L=0.1$ and minor radius $r=0.05$. The outer and inner supplied circles have cylindrical radii $\rho=0.13$ and $0.07$, respectively, at $z=0.04$. Six alternating polarities retain the exact selected phase tokens, angular speed $0.1$, coupling $10^{-6}$ and $c_f=1$. Supplied memory is $[-0.5,0]$ and future is $[0,0.15]$. Each shoulder has base, half-step and tighter-tolerance calculations. Changing shoulder is a changed preparation, not a refinement or isolated constitutive-law comparison. No app expansion, recurrence/stability/energy claim, free release, regular testing enrollment or publication is selected.

## Independently derived geometry and support

**Derived:** parameterize the torus by

$$
X(\theta,\varphi)=((L+r\cos\theta)\cos\varphi,(L+r\cos\theta)\sin\varphi,r\sin\theta).
$$

Here $\theta$ locates a point around the circular tube and $\varphi$ locates it around the symmetry axis; $\rho=L+r\cos\theta>0$. With unit radial and azimuthal directions $e_\rho,e_\varphi$, the coordinate derivatives are $X_\theta=r(-\sin\theta\,e_\rho+\cos\theta\,e_z)$ and $X_\varphi=\rho e_\varphi$. The cross product $X_\varphi\times X_\theta$ equals $\rho rN$, where $N=\cos\theta\,e_\rho+\sin\theta\,e_z$ is the outward unit normal. Differentiating $N\cdot\dot X=0$, or taking normal components of the second coordinate derivatives, gives

$$
N\cdot\ddot X=-r\dot\theta^2-\rho\cos\theta\dot\varphi^2.
$$

The mixed second derivative has zero normal component. Thus the normal curvature acceleration is $A_{\mathrm{curv}}=-(r\dot\theta^2+\rho\cos\theta\dot\varphi^2)N$. At the selected circles, $(\cos\theta,\sin\theta)=(0.6,0.8)$ or $(-0.6,0.8)$. For the azimuthal initial velocity, outer curvature is $(-0.000468,0,-0.000624)$ at phase zero, whereas inner curvature is $(-0.000252,0,0.000336)$. The positive inner vertical normal curvature is a sign-sensitive control; it is not a prediction of the complete delayed evolution.

For net superposed interaction $A$, its normal component is $A_\perp=(N\cdot A)N$, its tangent component is $A_\parallel=A-A_\perp$, and the imposed support is $A_{\mathrm{curv}}-A_\perp$. These give total acceleration $A_\parallel+A_{\mathrm{curv}}$. The reference recomputes each delayed kernel contribution independently, sums at the receiver and compares these receiver-total quantities. It does not infer a per-source discarded-normal observable or claim direct inclusion in per-hit acceleration boxes where only roots/factors and total vectors are emitted.

Retained nominal cubics need not lie exactly on the surface. The independently differentiated off-surface extension uses the quartic

$$
\Phi(X)=(X\cdot X+L^2-r^2)^2-4L^2(X_x^2+X_y^2).
$$

Set $u=X\cdot X+L^2-r^2$. Product rules give $g=\nabla\Phi=4uX-8L^2(X_x,X_y,0)$ and $V^{\mathsf T}HV=8(X\cdot V)^2+4u\lVert V\rVert^2-8L^2(V_x^2+V_y^2)$. The reference uses $A_\perp=(g\cdot A)g/\lVert g\rVert^2$ and $A_{\mathrm{curv}}=-(V^{\mathsf T}HV)g/\lVert g\rVert^2$ at nominal points. On the exact torus, $g=8L\rho rN$; the known controls compare the quartic formula to the independently parameterized normal and second fundamental form, including meridional and mixed velocities. Reading production geometry establishes which extension is being compared, but the formulas and expected controls are separately derived rather than imported from its evaluator.

## Whole-segment nominal and emitted-tube screens

**Derived:** for $\rho=\sqrt{X_x^2+X_y^2}>0$, put $s=\sqrt{(\rho-L)^2+z^2}$, $\psi=s^2-r^2$ and $B=(\rho+L)^2+z^2-r^2$. Then $\Phi=\psi B$. Minimizing distance over azimuth and tube angle gives exact geometric distance $|s-r|$ to the ring torus. Where $B>0$, it also equals $|\Phi|/[B(s+r)]$. This factorization keeps the cancellation inside an exact polynomial, rather than independently interval-bounding large cancelling square-root terms.

For each retained cubic and its derivative, the frozen rational Bernstein helper encloses the full closed segment's polynomials $X\cdot X$, $\rho^2$, $z^2$, $V\cdot V$, $\Phi(X)$ and $g(X)\cdot V$. Let $\rho_{\min},\rho_{\max},z^2_{\min},z^2_{\max}$ denote their compatible bounds, with the lower squared-height bound restricted to zero when necessary. They supply positive lower bounds $s_{\min}$ and $B_{\min}$, and

$$
\psi_{\max}=\frac{\max|\Phi|}{B_{\min}},\qquad
G_{\min}=2B_{\min}s_{\min}-2\psi_{\max}\sqrt{(\rho_{\max}+L)^2+z^2_{\max}}.
$$

The second inequality follows from $g=B\nabla\psi+\psi\nabla B$, the triangle inequality and $\lVert\nabla\psi\rVert=2s$. It bounds the nominal quartic normal away from zero. If emitted Euclidean position/velocity radii are $e_x,e_v$, nominal speed upper bound is $v_{\max}$ and nominal ambient-radius bound is $R_{\max}$, then the Hessian norm on the whole position tube is bounded by $M=12(R_{\max}+e_x)^2+12L^2+4r^2$. This follows directly from $H=8XX^{\mathsf T}+4uI-8L^2\operatorname{diag}(1,1,0)$ and the matrix norm triangle inequality.

The instrument requires $\rho_{\min}>e_x$ and $G_{\min}-Me_x>0$, excluding the axis and a vanishing quartic gradient throughout the position tube. The distance bound is $\psi_{\max}/(s_{\min}+r)+e_x$. The unit-normal derivative has norm at most $M/(G_{\min}-Me_x)$, so the tangent-velocity bound is

$$
\frac{\max|g\cdot V|}{G_{\min}}+e_v+
\frac{v_{\max}Me_x}{G_{\min}-Me_x}.
$$

The last two terms account for velocity error and normal rotation across the position tube. Speed is bounded by $v_{\max}+e_v$ and ambient radius by $R_{\max}+e_x$. All polynomial range calculations use exact rational arithmetic; radicals and subsequent arithmetic are independently evaluated at 70 and 100 digits. These are derived full-segment inequalities and measured high-precision screens, not a separately implemented directed-interval solution-existence solver. Position/velocity tubes depend on the reviewed production publication gate's coherent-solution inclusion premise; endpoint checks or point residuals alone would not supply it.

## Causal domain and memory boundary

**Derived, conditional:** the minimum selected phase separation exceeds 1.04. Initial partner separation is $2\rho\sin(\Delta\varphi_{\min}/2)$; over the finite future, each path moves at most its verified speed bound times 0.15. Subtracting twice that displacement gives a positive whole-time separation margin for each shoulder. Strictly subwake coherent source histories make $F(S)=|X_i(T)-X_j(S)|-(T-S)$ monotone, since $F(S_2)-F(S_1)\ge(1-v_{\max})(S_2-S_1)$. A positive simultaneous partner separation and negative old-memory residual therefore give exactly one strictly past partner root throughout the declared interval. The same subwake Lipschitz inequality excludes a positive-delay self root. The reference requires complete 36 ordered point pairs, all 30 partner slab identities, receiver diagnostic coverage and one solution certificate per published segment.

The exact supplied torus history has ambient radius at most $L+r=0.15$. The future screen allows radius at most 0.1501. A conservative combined distance is therefore at most 0.3002, and $F(-0.5)\le0.3002-0.5=-0.1998$ for every $T\ge0$. Unprovided earlier emissions are excluded only under the additional same-radius/tube hypothesis; otherwise completeness is limited to supplied memory. The torus' surface arc lengths do not replace Euclidean wake distances. Generated-source feedback must actually appear in the retained root comparisons; the nominal delay bound or a short calculation alone does not prove that it occurred.

## Known-first instrument preparation and freeze

**Measured:** shared-venv `surface-torus-reference.py --known-only` returned exit 0 in 0.365 seconds before any target reads. The receipt is `.tmp/surface-torus-qualification/reference-known.stdout.json`, with zero target reads and known controls passed. Stderr records the frozen root/kernel controls first, then the new torus controls. They include exact outer/inner parameterized normals, both signed azimuthal curvatures, meridional and mixed second fundamental form, projector/net support, static torus antipodal delay $-0.21$ and acceleration, wrong-sign and sphere-substitution negatives, between-endpoint drift and position/velocity tube inflation.

An initial known-only attempt failed an equality comparison between independently rounded forms of $\sqrt3\,e$. Its stderr/stdout are preserved as `reference-known-preparation-failure.*`. Before freezing or any target read, the tube control was corrected to the strict derived margin $\sqrt3>1.7$; omitted inflation would return zero and still fails that control. No production or frozen helper was altered.

The new reference is frozen at SHA-256 `c609611f1581982f5baf6bf4f1018ebaa6409d0a9d1e3f6ae68e964113f8182c`. Frozen latitude helper: `12f3e2e9e150040e7cb78ead946cbd04191ee21739d798cfc8d29315556f371c`; Stage D helper: `20f1534998299e4c6202b51b93b42938043e6ab3c3d8ab9ecbb14e72af80c976`; interaction kernel: `a3b94301b2994c29e1107de44d627db9566abe9cda60ec8e00b89d9351a275f6`. The CLI accepts repeated `--case NAME REQUEST RESPONSE` and explicit `--compare FIRST SECOND` edges; edges must preserve both torus dimensions and shoulder preparation. Root supervises the six-case target comparison. The instrument predeclares midpoint residual limit $2\times10^{-5}$ and 70/100-digit disagreement limit $10^{-45}$, inherited from the earlier bounded protocol; point precision agreement is not whole-slab existence certification.

## Acceptance falsifiers

A wrong initial curvature sign, missing/extra root or slab identity, point acceleration outside a receiver/solution enclosure, geometry or tangency screen above declared tolerance, missing computed feedback, excess residual, unresolved meridional change, refinement disagreement outside summed radii or altered frozen source reopens its corresponding gate. Numerical acceptance remains bound to the retained request, executable, source preimages and assumptions. No future app or physical acceptance is inferred from preparing this instrument.

## Independent resolved endpoint readout

**Measured:** the separately authored `.tmp/surface-torus-qualification/independent-endpoints.py` evaluates the retained final cubic's $z$ coordinate by exact rational Horner evaluation at its endpoint and subtracts the exact preparation height 0.04. Before any target, it passes a known positive cubic displacement of 0.00075, a negative counterpart and an unresolved-radius control. Its six-case execution then returns exit 0, requiring each of the 36 member displacements to exceed its emitted endpoint $z$ radius. Root preserves this source/stdout/stderr under `.local-data/eom/surface-torus-2026-10-14/review/`; the frozen main reference is unchanged.

All six members move downward in every outer refinement and upward in every inner refinement. Outer displacement is approximately $-6.805723\times10^{-6}$; inner displacement is approximately $+3.038547\times10^{-6}$. Minimum displacement-magnitude/error-radius ratios are 3476.36 (base), 2942.53 (step), 2942.57 (tight), 4883.81 (inner), 4144.34 (innerStep) and 4144.49 (innerTight), measured by known-final-line-extraction-first Node readout of the exact endpoint report. The machine receipt retains every path's exact rational displacement, rounded decimal value, bound and source request/response hashes.

This readout resolves the protocol's generated vertical-motion condition given the coherent solution-tube premise. It does not isolate topology or curvature as a universal law: changing shoulder changes both initial cylindrical radius and speed at fixed angular speed. It supplements the full delayed-root/acceleration comparison adjudicated below without changing the frozen reference.

## Final independent report adjudication

**Measured:** supervised reference lease `a37f2dee-fa9c-490b-946b-5030e168ab4c` is recorded completed, exit 0 and process group closed in 940.614 seconds; the instrument reports 940.466 seconds. Independent known-SHA/maxima-extraction-first reads compare its exact stdout to `.local-data/eom/surface-torus-2026-10-14/independent-report.json`. Both have SHA-256 `d6bd404abea214d32337b21278b0055faacb2612f5cec85b67e7e2e0afaaf013`. Stderr retains the known controls before target progress, then all 72 case/precision/path reports. This is a completed measured comparison, not an interpretation of silent output or a computational performance claim beyond the recorded run.

The separately authored `.tmp/surface-torus-qualification/adjudicate.mjs` passes known SHA-256, positive/negative source-row parsing and case extraction before target records. Its final exit-0 stdout/stderr are `final-adjudication.*`; Root retains the earlier production audit and source under the local `review/` owner. It compares all 95 retained compiled source inputs to their recorded hashes and source digest `40816eb93c7d42e30e3a028d1f3cd80292980704a50717e9208baf3355ec4771`, and the retained executable to `f417c26738cf0e6b5528ffe0e4ab5e9bdfa7c3c68d7900d6e8bc83b4296adf6a`. Every request/response hash in the reference agrees with its retained raw file. Every response matches its request/run identity and inspection model, completes $[0,0.15]$ without rejected steps and has a durable v8 checkpoint with matching resolved model and accepted end. Each published path covers its complete future contiguously. The invalid height 0.041 is refused by both inspection and evolution with `surface_preparation_not_certified`, without future publication.

A separate shared-venv exact-fraction matrix read first checks leading-dot decimal equality and a nearby unequal token. It then verifies all six requests' initial/maximum step, root tolerance, six state/geometry tolerance fields, preparation mesh, shoulder radius/speed and two-GiB resource admission allowance against the predeclared protocol. An initial disposable Node reader did not admit its own leading-dot expected tokens; the fraction read resolves that checking limitation without changing a target or the frozen reference. The resource allowance is not measured memory use.

The frozen reference enforces complete 36 ordered point-pair accounting (zero positive self roots, one partner root per pair), all 30 partner slab identities with reception coverage, all six receiver diagnostic identities, no duplicate slab identity, one solution certificate for every future retained segment and compatible adjacent/preparation endpoint tubes. Independently solved midpoint emissions/factors lie inside partner boxes, and independently summed interaction/projected/curvature/support/total acceleration values lie inside receiver diagnostics and solution acceleration bounds. These conclusions concern the actual executable/reference run and the explicit code obligations, rather than merely trusting the report's `passed` string.

| Case | Accepted steps | Midpoint receiver points per precision | Partner roots per precision | Computed-source roots per precision | Maximum midpoint equation residual |
| --- | ---: | ---: | ---: | ---: | ---: |
| Outer base | 15 | 180 | 900 | 48 | $1.769\times10^{-10}$ |
| Outer half-step | 30 | 360 | 1800 | 96 | $4.501\times10^{-11}$ |
| Outer tight | 30 | 360 | 1800 | 96 | $4.501\times10^{-11}$ |
| Inner base | 15 | 180 | 900 | 276 | $4.758\times10^{-11}$ |
| Inner half-step | 30 | 360 | 1800 | 546 | $1.484\times10^{-11}$ |
| Inner tight | 30 | 360 | 1800 | 546 | $1.484\times10^{-11}$ |

Totals are 1800 midpoint receiver points, 9000 partner roots and 1608 generated-source roots at each reference precision. Thus feedback is exercised in both shoulders; it is not inferred solely from elapsed future duration. The known frozen references retain their recorded SHA-256 values, and the new reference remains `c609611f1581982f5baf6bf4f1018ebaa6409d0a9d1e3f6ae68e964113f8182c` after target execution.

Independent report-threshold reads check each case's whole-segment distance/tangent screens against its actual request tolerances, speed below 0.02, ambient radius below 0.1501, nonzero generated meridional displacement/speed, positive separation/monotonicity and negative old-memory residual. Across the cases, screened distance is at most approximately $3.408\times10^{-9}$, tangent velocity at most $5.559\times10^{-8}$ and speed at most 0.013000208. The instrument's axis/gradient-tube conditions remain strictly positive on every evaluated segment; those are mandatory guards in the frozen dense-screen implementation. The worst midpoint equation residual is approximately $1.769\times10^{-10}$, below the declared $2\times10^{-5}$. All 70/100-digit root/factor and acceleration differences are below $10^{-45}$. These finite precision comparisons supplement the separately derived inequalities; they are not an independent directed-interval proof of solution existence.

All four predeclared same-shoulder comparisons fit summed emitted component radii at their common retained endpoints/midpoints. Outer base versus half-step has maximum central-history position difference approximately $1.093\times10^{-12}$ and velocity difference $1.462\times10^{-11}$, with maximum budget ratios 0.01310 and 0.01737. Inner base versus half-step has differences approximately $1.765\times10^{-13}$ and $2.404\times10^{-12}$, with ratios 0.001038 and 0.001783. Half-step versus tight ratios are below $1.1\times10^{-6}$ in position and $1.7\times10^{-7}$ in velocity. The emitted-tube maxima need not decrease monotonically under refinement; these measurements establish compatibility within declared radii, not a convergence-order law or full-time equality theorem.

The conditional whole-time causal proof has minimum partner-separation bounds above 0.12609 for outer cases and 0.06789 for inner cases, with monotonicity lower bounds above 0.98699 and 0.99299, respectively. The old-memory residual upper bound is -0.1998. Together with the coherent constrained-solution premise, these derived margins support one strictly past partner root and no positive-delay self roots throughout the finite declared window. Global older-history exclusion remains conditional on the stated ambient-radius restriction, rather than a measured reconstruction of unknown past.

## Final bounded disposition

✓ **Qualified: the selected finite interacting outer and inner ring-torus 3:3 cases, including their declared refinements.** Every scientific acceptance condition selected in the packet is met by the known-first frozen reference, exact endpoint readout, retained binding audit and the reviewed production coherent-solution inclusion premise. No selected condition remains pending within this scenario. Root owns queue/manuscript integration and final retention/compute closeout; this review does not change those shared owners or rerun the calculation.

This acceptance is bound to the retained executable/source, six exact preparations, supplied memory, ordinary subwake chart and future through 0.15. The reference supplies independent point dynamics, rational full-segment nominal/tube screens and conditional causal completeness; it does not supply a second full-slab solution-existence implementation. Earlier-tail completeness requires the fixed-shape/ambient-radius assumption. The opposed resolved vertical displacements belong to changed shoulder/speed preparations and establish no universal isolated curvature or topology law. Torus app availability, stability/settling, recurrence, energy–size relations, free release and physical confinement remain outside this result. This review writes neither original scientific artifacts nor app owners.
