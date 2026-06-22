# Octahedral Fold-Aware Cross-Binary I1 Bracket-Local Derivative Peak-Budget Reduction

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate](octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate.md). The predecessor packet proved that the existing bracket-local derivative mesh allowance dominates observed $5\times5$ mixed theta/speed stencil variation. This packet turns the remaining directed-rounding burden into finite peak-overshoot budgets on the $4\times4$ stencil subcells inside every predecessor bracket mesh cell, adds sampled root-tube regularity budgets on the same refined replay, emits finite interval-root-tube certificate targets, evaluates sampled endpoint-sign, fixed-$F_\delta$, and complement-sign margins on those emitted intervals, proves the source-root tube geometry first at a machine-padded analytic interval level and then by a directed-rounded source-root interval certificate with no artificial padding, contracts every emitted root sheet by fixed-sign $F_\delta$ monotone bisection, re-contracts each root sheet on localized parameter tiles, directly evaluates the outward-rounded source-derivative formula over those localized contracted certified root sheets, emits an interval-jet target, certifies sampled analytic-jet and Taylor-transport witnesses, and now closes the finite directed-rounded theta-localized Taylor intervalization row on every emitted subcell.

It is a bracket-local directed-rounded Taylor derivative-variation closure for the `I1.f1` finite peak-budget packet: directed-rounded source-root interval isolation, directed-rounded vertex derivative anchors, interval root-sheet pure-curvature jets, and theta-localized Taylor upper envelopes prove all finite subcell overshoot budgets. It is not a full directed-rounding interval derivative enclosure, not full `I1.f1` interval zero isolation, not interval critical exhaustion, not interval quadrature, and not a retained branch.

## Peak-Budget Theorem

The previous theorem-grade successor was

$$
\texttt{I1.f1.bracket-local-directed-rounding-derivative-variation-enclosure-required}.
$$

This packet now closes that successor for the finite peak-budget covering. The next theorem-grade successor is

$$
\texttt{I1.f1.full-interval-zero-isolation-critical-exhaustion-quadrature-required}.
$$

Let $C$ be one predecessor `I1.f1` bracket mesh cell. Let

$$
d_C=f'_\times(\theta_C,v_C)
$$

be the predecessor center derivative, let $\Delta_C^{\mathrm{mesh}}$ be the predecessor local variation allowance, and let $m_C$ be the maximum sampled derivative on the parent $5\times5$ mixed stencil. Define the remaining parent peak budget

$$
\mu_C
=
\Delta_C^{\mathrm{mesh}}
-
\max(0,m_C-d_C).
$$

For a stencil subcell $Q\subset C$, let $m_Q$ be the maximum of the sampled derivative values on the vertices of $Q$. A directed-rounded interval or Taylor backend is sufficient on $Q$ if it proves

$$
\sup_Q f'_\times
\le
m_Q+\epsilon_Q
$$

with

$$
\epsilon_Q
<
\min(\mu_C,-m_Q).
$$

The first term protects the predecessor allowance; the second term protects derivative negativity. In the present packet the allowance term is the bottleneck. Negativity has a much larger margin.

## Finite Reduction

The default packet uses the $16\times8$ predecessor bracket mesh. Each mesh cell has a $5\times5$ parent stencil, hence $4\times4$ stencil subcells. The finite directed-rounding burden is therefore

$$
128\times16=2048
$$

subcell peak inequalities.

The packet also replays a refined $3\times3$ tensor check inside each stencil subcell. Equivalently, each predecessor mesh cell is checked on a $9\times9$ local grid, for

$$
128\times81=10368
$$

refined derivative samples. The refined replay finds no interior sampled peak above the parent stencil vertices:

$$
\max_Q
\bigl(
m_{Q,\mathrm{refined}}-m_Q
\bigr)_+
=0,
$$

and no parent refined excess over the coarse parent stencil:

$$
\max_C
\bigl(
m_{C,\mathrm{refined}}-m_C
\bigr)_+
=0.
$$

The weakest peak budget is

$$
\min_Q \epsilon_Q^{\max}
=
3.78761869309\times10^{-6}.
$$

The refined derivative maximum remains

$$
\max f'_\times
=
-0.060388174983,
$$

so the refined sampled derivative clearance is

$$
0.060388174983.
$$

The sampled source-root witness remains

$$
\min |F_\delta|
=
0.686789509138,
$$

and every refined sample preserves six source roots with term root-count signature $(1,3,1,1)$.

The same refined rows now preserve root tubes explicitly. Across all $2048$ subcells the sampled root-tube budget has

$$
\min_{\mathrm{tube}} |F_\delta|
=
0.686789509138,
\qquad
\min_{\mathrm{tube}}\delta
=
1.28454542829,
$$

and the smallest sampled adjacent-tube separation is

$$
1.28117968261.
$$

The largest sampled drift of one branch across a subcell is

$$
7.75623934\times10^{-4}.
$$

Every sampled tube preserves its $F_\delta$ sign, and the term root-count signature remains $(1,3,1,1)$.

The packet then turns the sampled tubes into protected finite interval targets. On each subcell, every sampled tube $[\delta_{\min},\delta_{\max}]$ is expanded by one quarter of its smaller adjacent sampled gap to form a protected interval tube. The complement of those protected tubes in the source-root search domain is emitted as complement slabs. Across the whole packet this produces

$$
2048\times6=12288
$$

retained tube targets and

$$
2048\times10=20480
$$

complement-slab exclusion targets. The weakest protected-tube padding radius is

$$
0.108489314201,
$$

and the weakest complement-slab width is

$$
0.325467942606.
$$

Both bottlenecks occur at

$$
\texttt{I1.f1.bracket-derivative-mesh.15.0.peak-budget.3.0}.
$$

The packet now samples the emitted protected tubes and complement slabs directly on a $3\times3$ theta/speed parameter grid. For each protected tube it evaluates both tube endpoints and samples $F_\delta$ at the left endpoint, midpoint, and right endpoint. For each complement slab it evaluates $F$ at nine $\delta$ samples for every parameter sample. This adds

$$
110592
$$

sampled endpoint sign-pair checks,

$$
331776
$$

sampled tube $F_\delta$ checks, and

$$
1658880
$$

sampled complement $F$ checks. All sampled tube endpoints have opposite signs, all sampled tube $F_\delta$ signs match the target sheet sign, and all sampled complement slabs keep a stable nonzero sign. The weakest sampled endpoint magnitude and complement magnitude coincide:

$$
\min |F|_{\mathrm{tube\ endpoint}}
=
\min |F|_{\mathrm{complement}}
=
0.243939101042.
$$

The weakest sampled endpoint sign-product margin is

$$
\min(-F_LF_R)=0.0781604324357,
$$

and the weakest sampled tube denominator on the protected intervals is

$$
\min |F_\delta|_{\mathrm{protected\ tube}}=0.530629746881.
$$

The endpoint-magnitude, complement-magnitude, and protected-tube $F_\delta$ bottlenecks occur at

$$
\texttt{I1.f1.bracket-derivative-mesh.0.7.peak-budget.0.3},
$$

while the endpoint sign-product bottleneck occurs at

$$
\texttt{I1.f1.bracket-derivative-mesh.15.0.peak-budget.3.0}.
$$

The same protected-tube partition now has a machine-padded analytic interval certificate for the elementary source-root equation. For a parameter rectangle $P=\Theta\times N$, a shifted source phase interval $\tilde\Theta$, and a positive $\delta$ interval $J=[d_-,d_+]$, the packet encloses

$$
\Phi(P,J)
=
[2\tilde\theta_- - d_+,\;2\tilde\theta_+ - d_-],
$$

$$
F^\#(P,J)
=
\left[\frac{d_-^2}{\nu_+^2},\frac{d_+^2}{\nu_-^2}\right]
-2+\sin^\#\Phi(P,J)+\kappa\sin^\#J,
$$

and

$$
F_\delta^\#(P,J)
=
\left[\frac{2d_-}{\nu_+^2},\frac{2d_+}{\nu_-^2}\right]
-\cos^\#\Phi(P,J)+\kappa\cos^\#J,
$$

with a machine padding of $10^{-9}$ added to each enclosure. Tube endpoint signs are checked on the two protected endpoints, protected-tube $F_\delta$ is checked on $16$ subdivisions per tube, and complement exclusion is checked on $32$ subdivisions per complement slab. Across the default packet this gives

$$
12288
$$

machine-padded endpoint sign-pair interval checks,

$$
24576
$$

machine-padded endpoint $F$ interval enclosures,

$$
196608
$$

machine-padded protected-tube $F_\delta$ interval checks, and

$$
655360
$$

machine-padded complement $F$ interval checks. Every protected tube has opposite endpoint signs, every protected-tube $F_\delta$ subdivision keeps the target sign, and every complement subdivision excludes zero with stable sign. The global machine-padded floors are

$$
\min |F^\#|_{\mathrm{tube\ endpoint}}=0.243939100042,
$$

$$
\min(-F_L^\#F_R^\#)=0.0780705608725,
$$

$$
\min |F_\delta^\#|_{\mathrm{protected\ tube}}=0.521855012428,
$$

and

$$
\min |F^\#|_{\mathrm{complement}}=0.23413485329.
$$

The endpoint-magnitude, complement-magnitude, and protected-tube $F_\delta$ interval bottlenecks occur at

$$
\texttt{I1.f1.bracket-derivative-mesh.0.7.peak-budget.0.3},
$$

while the machine-padded endpoint sign-product bottleneck remains

$$
\texttt{I1.f1.bracket-derivative-mesh.15.0.peak-budget.3.0}.
$$

The same interval arithmetic has now been replayed with IEEE-754 nextafter outward rounding and zero artificial padding. The directed-rounded replay uses the same protected tubes, the same complement slabs, the same $16$ protected-tube subdivisions for $F_\delta$, and the same $32$ complement subdivisions for $F$. It certifies the source-root partition itself:

$$
\texttt{certifies\_directed\_rounded\_source\_root\_interval\_certificate=true}.
$$

For every retained protected tube, the left and right endpoint $F$ intervals have opposite signs, every protected-tube $F_\delta$ subdivision keeps the sampled target sign with positive lower bound, and every complement subdivision excludes zero with stable sign. The interval implication is now theorem-grade for the emitted source-root partition: each protected tube contains exactly one $C^1$ implicit source-root sheet over its parameter rectangle, those sheets continue across the rectangle, and the complement slabs contain no source roots. This does not certify derivative variation, curvature, full `I1.f1` zero isolation, quadrature, or branch retention.

## Monotone Root-Sheet Contraction

The directed-rounded source-root certificate supplies more than existence of the six source-root sheets. On every retained tube it also proves that $F_\delta$ has a fixed sign. Therefore each tube can be contracted before the derivative interval formula is evaluated.

For one parameter rectangle $P=\Theta\times N$, one protected tube $D=[a,b]$, and one term sign $\kappa$, set

$$
F_{\kappa,\nu}(\tilde\theta,\delta)
=
\frac{\delta^2}{\nu^2}-2+\sin(2\tilde\theta-\delta)+\kappa\sin\delta.
$$

Let $\zeta=+1$ if $F_\delta>0$ on the tube and $\zeta=-1$ if $F_\delta<0$, and define the oriented function

$$
G=\zeta F.
$$

Then $G_\delta>0$ on the protected tube. The executable checks the oriented endpoints $G(P,a)\le0$ and $G(P,b)\ge0$, then bisects two endpoint predicates:

$$
\sup_P G(m)\le0
\quad\Longrightarrow\quad
\delta_r(P)\ge m,
$$

and

$$
\inf_P G(m)\ge0
\quad\Longrightarrow\quad
\delta_r(P)\le m.
$$

The result is a contracted all-parameter root range

$$
D_r^{\mathrm{contracted}}(P)
\subseteq
D_r^{\mathrm{protected}}(P)
$$

that still contains every root sheet over $P$. This is a theorem-grade consequence of the already certified fixed-sign $F_\delta$ tube: no sampling point or root center is used for the contraction decision.

Across the default packet, the executable performs this contraction on

$$
2048\times6=12288
$$

retained root sheets. Each contraction uses $48$ lower-endpoint and $48$ upper-endpoint bisection iterations. The packet records the protected interval, contracted interval, width ratio, orientation sign, endpoint $F$ intervals, oriented endpoint signs, and contraction status on every root row.

This is the new mathematical advance in the direct-envelope branch. It removes the largest avoidable interval width in $\delta$ before evaluating $g=f'_\times$, while preserving the all-parameter root-sheet proof.

## Parameter-Localized Direct Interval Derivative Attempt

The packet now consumes the contracted directed-rounded source-root partition in the most literal possible way before asking for higher-order Taylor control. It first forms the all-parameter contracted root sheet on each subcell, then subdivides the parameter rectangle and repeats the same fixed-sign $F_\delta$ monotone contraction on each localized parameter tile. This is a valid refinement of the same root-sheet certificate: the directed-rounded endpoint signs, fixed-sign $F_\delta$ tube, and complement exclusion hold on the parent rectangle, so each subrectangle inherits existence, uniqueness, and no-extra-root exclusion.

For each localized contracted source-root interval subdivision, the executable evaluates the source contribution derivative formula by outward-rounded interval arithmetic. With

$$
\phi=2\tilde\theta-\delta,
\qquad
B=-\frac12(\cos\phi+\kappa\cos\delta),
\qquad
I=(\delta^2|F_\delta|)^{-1},
$$

the interval evaluator uses

$$
\delta_\theta=-\frac{2\cos\phi}{F_\delta},
$$

$$
B_\theta
=
\sin\phi+\frac12(\kappa\sin\delta-\sin\phi)\delta_\theta,
$$

$$
\frac{dF_\delta}{d\theta}
=
2\sin\phi
+
\left(
\frac{2}{\nu^2}-\sin\phi-\kappa\sin\delta
\right)\delta_\theta,
$$

and

$$
I_\theta
=
-\frac{2\delta_\theta}{\delta^3|F_\delta|}
-\frac{\operatorname{sign}(F_\delta)}{\delta^2|F_\delta|^2}
\frac{dF_\delta}{d\theta}.
$$

The enclosed source derivative is

$$
s'_{\kappa,\sigma}
=
\frac{2\sigma}{\nu}
\left(
B_\theta I+B I_\theta
\right).
$$

For each finite subcell the executable hulls this interval across $16$ subdivisions of each localized contracted retained root sheet, sums the retained source-root sheets, then applies the cross-binary coefficients

$$
s'_{+,+}(\theta)
-s'_{+,+}(\theta+Q)
+s'_{-,+}(\theta)
-s'_{-,+}(\theta+Q).
$$

The default localization uses two theta tiles and one speed-ratio tile per finite subcell. Thus every retained root row has one all-parameter contraction plus two localized contractions. Across the default packet this adds

$$
2048\times6\times2=24576
$$

parameter-localized root-sheet contractions. All localized contractions pass. The direct derivative evaluator then performs

$$
2048\times6\times2\times16=393216
$$

localized contracted-sheet source-derivative interval evaluations. The corresponding all-parameter contracted-sheet count before localization is $2048\times6\times16=196608$. Every localized evaluation inherits a fixed-sign $F_\delta$ denominator from the directed-rounded source-root certificate. Therefore this is not a new requirement card; it is a first executable interval backend for $g=f'_\times$ itself with an internal convergence knob.

The result is a sharper negative theorem-route result than the earlier protected-tube hull. The monotone contractor passes on every emitted root sheet and greatly narrows the $\delta$ range, but the direct interval derivative envelope is still too wide on every subcell:

$$
\texttt{direct\_interval\_derivative\_envelope\_passed\_subcell\_count=0},
\qquad
\texttt{direct\_interval\_derivative\_envelope\_open\_subcell\_count=2048}.
$$

The packet records, row by row, the all-parameter contracted root intervals, localized contracted root intervals, width reduction factors, outward-rounded derivative enclosure, derivative upper bound, vertex maximum $m_Q$, allowed upper bound $m_Q+\epsilon_Q^{\max}$, signed headroom, positive overrun, ratio to the required overshoot bound, and the remaining root-sheet interval-width bottleneck. This narrows the mathematical problem: root isolation, $F_\delta$ regularity, complement exclusion, and avoidable protected-tube width are no longer the live obstruction. A reduced-mesh sweep shows the expected localization law: theta-localization factors $1,2,4,8$ reduce the worst direct-envelope ratio from about $91.7$ to $46.2$, $23.4$, and $12.0$, respectively, while speed-ratio localization factors through $4$ change the worst ratio only at the third decimal place. The direct formula still has too much theta-direction interval dependency to certify the $10^{-6}$-scale peak budgets at feasible uniform localization. The next backend must therefore use Taylor-model localization on the contracted sheets, not just more root isolation.

The bottleneck finite subcell is

$$
\texttt{I1.f1.bracket-derivative-mesh.0.7.peak-budget.0.0}.
$$

Its parent mesh cell is

$$
\texttt{I1.f1.bracket-derivative-mesh.0.7}.
$$

The same refined grid now supplies a sampled bilinear pure-curvature feasibility probe. For every stencil subcell, the packet estimates the pure second differences of $g=f'_\times$ along the refined $\theta$ and speed-ratio axes and evaluates the bilinear remainder target. All $2048$ subcells pass this sampled curvature check:

$$
\max_Q
\frac{
\frac{h_\theta^2}{8}M^{\mathrm{samp}}_{\theta\theta,Q}
+
\frac{h_\nu^2}{8}M^{\mathrm{samp}}_{\nu\nu,Q}
}{
\epsilon_Q^{\max}
}
\approx
0.0632306995182.
$$

The largest sampled bilinear curvature remainder is

$$
3.58713895559\times10^{-7},
$$

and the weakest balanced pure-curvature target is

$$
287.476602603.
$$

The curvature-ratio bottleneck is

$$
\texttt{I1.f1.bracket-derivative-mesh.0.4.peak-budget.3.0}.
$$

The same row now carries a finite sampled-curvature inflation headroom certificate. Define

$$
R_Q^{\mathrm{samp}}
=
\frac{h_\theta^2}{8}M^{\mathrm{samp}}_{\theta\theta,Q}
+
\frac{h_\nu^2}{8}M^{\mathrm{samp}}_{\nu\nu,Q}.
$$

If a later interval backend proves pure second-partial bounds no larger than $\alpha_Q$ times the sampled pure second-difference maxima, then the bilinear row closes whenever

$$
\alpha_Q R_Q^{\mathrm{samp}}<\epsilon_Q^{\max}.
$$

The emitted admissible multiplier is therefore

$$
\alpha_Q^{\max}
=
\frac{\epsilon_Q^{\max}}{R_Q^{\mathrm{samp}}}.
$$

Across all $2048$ subcells,

$$
\min_Q \alpha_Q^{\max}
\approx
15.8151025945.
$$

Thus a uniform factor-$10$ inflation of the sampled pure-curvature remainder still leaves positive margin everywhere:

$$
\min_Q
\left(
\epsilon_Q^{\max}
-
10R_Q^{\mathrm{samp}}
\right)
\approx
1.39268513329\times10^{-6}.
$$

The inflation-factor bottleneck occurs at

$$
\texttt{I1.f1.bracket-derivative-mesh.0.4.peak-budget.3.0}.
$$

The factor-$10$ margin bottleneck occurs at

$$
\texttt{I1.f1.bracket-derivative-mesh.0.7.peak-budget.3.0}.
$$

The executable now converts that headroom into a finite interval-jet target on every subcell. On each protected source-root sheet the root equation is

$$
F_{\kappa,\nu}(\tilde\theta,\delta)
=
\frac{\delta^2}{\nu^2}
-2+\sin(2\tilde\theta-\delta)+\kappa\sin\delta
=0.
$$

For either parameter $x\in\{\theta,\nu\}$, implicit differentiation gives the first and pure second root-sheet jets

$$
\delta_x
=
-\frac{F_x}{F_\delta},
$$

$$
\delta_{xx}
=
-
\frac{
F_{xx}+2F_{x\delta}\delta_x+F_{\delta\delta}\delta_x^2
}{
F_\delta
}.
$$

The same row records the needed elementary partials,

$$
F_\theta=2\cos\phi,
\qquad
F_{\theta\theta}=-4\sin\phi,
\qquad
F_{\theta\delta}=2\sin\phi,
$$

$$
F_\nu=-\frac{2\delta^2}{\nu^3},
\qquad
F_{\nu\nu}=\frac{6\delta^2}{\nu^4},
\qquad
F_{\nu\delta}=-\frac{4\delta}{\nu^3},
$$

and

$$
F_{\delta\delta}
=
\frac{2}{\nu^2}
-\sin\phi-\kappa\sin\delta.
$$

The theorem-grade target is therefore not just "bound curvature." It is: use the protected root tubes and fixed-sign $F_\delta$ floor to generate interval/Taylor jets for $\delta(\theta,\nu)$, evaluate the cross-binary derivative $g=f'_\times$ on those jets, and prove

$$
\frac{h_\theta^2}{8}M_{\theta\theta,Q}
+
\frac{h_\nu^2}{8}M_{\nu\nu,Q}
<
\epsilon_Q^{\max}
$$

for all $2048$ emitted rows. This is a conditional finite interval-jet sufficiency theorem: if the directed-rounded root-tube proof and the interval-jet curvature inequality both hold on a row, then that row has no unsampled derivative peak large enough to break the bracket-local derivative-variation allowance.

The derivative-order census is finite. Since $g=f'_\times$ is the $\theta$ derivative of the cross-binary source contribution, the $\theta$ curvature row requires $\partial_\theta^2 g=\partial_\theta^3 f_\times$ and hence root-sheet jets through $\delta_{\theta\theta\theta}$. The speed-ratio curvature row requires $\partial_\nu^2 g=\partial_\theta\partial_\nu^2 f_\times$ and hence root-sheet jets through $\delta_{\theta\nu\nu}$. The emitted jet target therefore names exactly the root-sheet derivatives

$$
\delta_\theta,\quad
\delta_{\theta\theta},\quad
\delta_{\theta\theta\theta},\quad
\delta_\nu,\quad
\delta_{\nu\nu},\quad
\delta_{\theta\nu},\quad
\delta_{\theta\nu\nu}.
$$

This prevents the curvature proof from becoming an open-ended automatic-differentiation request; the target is a finite jet census tied to the two pure-curvature inequalities and consumed by the directed-rounded intervalization below.

The sampled transport refinement extends that census by one derivative order. The gradients of the two pure-curvature components are

$$
\nabla_{\theta,\nu}(\partial_{\theta\theta}g)
=
\left(
\partial_\theta^3g,\,
\partial_\theta^2\partial_\nu g
\right)
=
\left(
\partial_\theta^4 f_\times,\,
\partial_\theta^3\partial_\nu f_\times
\right),
$$

and

$$
\nabla_{\theta,\nu}(\partial_{\nu\nu}g)
=
\left(
\partial_\theta\partial_\nu^2g,\,
\partial_\nu^3g
\right)
=
\left(
\partial_\theta^2\partial_\nu^2 f_\times,\,
\partial_\theta\partial_\nu^3 f_\times
\right).
$$

Thus the sampled fourth-jet route adds

$$
\delta_{\theta\theta\theta\theta},\quad
\delta_{\theta\theta\theta\nu},\quad
\delta_{\theta\theta\nu\nu},\quad
\delta_{\theta\nu\nu\nu}
$$

to the executable jet data. This is a literal total-order-four sampled Taylor witness, not merely a relabeling of the previous third-order curvature recurrence.

The fifth-jet refinement extends the same idea to the curvature-gradient components themselves. It samples the Hessian of $\partial_{\theta\theta}g$ and $\partial_{\nu\nu}g$:

$$
\nabla^2_{\theta,\nu}(\partial_{\theta\theta}g)
=
\left(
\partial_\theta^4g,\,
\partial_\theta^3\partial_\nu g,\,
\partial_\theta^2\partial_\nu^2 g
\right)
=
\left(
\partial_\theta^5 f_\times,\,
\partial_\theta^4\partial_\nu f_\times,\,
\partial_\theta^3\partial_\nu^2 f_\times
\right),
$$

and

$$
\nabla^2_{\theta,\nu}(\partial_{\nu\nu}g)
=
\left(
\partial_\theta^2\partial_\nu^2g,\,
\partial_\theta\partial_\nu^3 g,\,
\partial_\nu^4 g
\right)
=
\left(
\partial_\theta^3\partial_\nu^2 f_\times,\,
\partial_\theta^2\partial_\nu^3 f_\times,\,
\partial_\theta\partial_\nu^4 f_\times
\right).
$$

Thus the sampled fifth-jet route adds

$$
\delta_{\theta\theta\theta\theta\theta},\quad
\delta_{\theta\theta\theta\theta\nu},\quad
\delta_{\theta\theta\theta\nu\nu},\quad
\delta_{\theta\theta\nu\nu\nu},\quad
\delta_{\theta\nu\nu\nu\nu}
$$

to the executable jet data. By itself this is a sampled Taylor transport witness, not an interval enclosure: the fifth derivatives transport sampled gradient maxima across the nearest-sample covering radii. The directed-rounded theta-localized intervalization below is the theorem-grade interval bound over the emitted tiles.

The packet now also executes this finite jet target at the refined sample points. For each sampled protected root sheet, the executable constructs the bivariate Taylor jet of $F_{\kappa,\nu}(\tilde\theta,\delta)$ in the local variables $(\theta,\nu)$ and solves the implicit equation coefficient-by-coefficient. At total order one, the jet equation recovers

$$
F_\delta\,\delta_x+F_x=0,
$$

and at higher orders it uses the same coefficient identity

$$
[z^\alpha]\,
F_{\kappa,\nu}(\tilde\theta+z_\theta,\delta(z),\nu+z_\nu)
=0
$$

to determine each nonconstant coefficient of $\delta(z)$ from the already known lower-order coefficients and the nonzero sampled value of $F_\delta$. The witness then evaluates the cross-binary derivative jet $g=f'_\times$ and reads off the sampled analytic values of

$$
\partial_{\theta\theta}g
\quad\text{and}\quad
\partial_{\nu\nu}g.
$$

Those sampled analytic pure-curvature values are inserted into the same bilinear remainder inequality,

$$
\frac{h_\theta^2}{8}
\max|\partial_{\theta\theta}g|_{\mathrm{jet,samp}}
+
\frac{h_\nu^2}{8}
\max|\partial_{\nu\nu}g|_{\mathrm{jet,samp}}
<
\epsilon_Q^{\max},
$$

on every emitted row. The witness also records two residual checks: the reconstructed root jet still satisfies the source-root equation at the sampled base point, and the first derivative coefficient agrees with the explicit implicit derivative formula. This is stronger than a finite target and weaker than interval closure: it proves that the analytic recurrence itself is executable on the protected sampled sheets and that its sampled pure-curvature remainder stays below the row budget. The directed-rounded theta-localized intervalization below supplies the interval second-partial enclosure.

The packet now compares the sampled analytic-jet curvature estimator against the sampled pure second-difference estimator. For each row define

$$
A_{\theta,Q}^{\mathrm{env}}
=
\max\left(
A_{\theta,Q}^{\mathrm{diff}},
A_{\theta,Q}^{\mathrm{jet}}
\right),
\qquad
A_{\nu,Q}^{\mathrm{env}}
=
\max\left(
A_{\nu,Q}^{\mathrm{diff}},
A_{\nu,Q}^{\mathrm{jet}}
\right).
$$

The sampled estimator-envelope remainder is

$$
R_Q^{\mathrm{env}}
=
\frac{h_\theta^2}{8}A_{\theta,Q}^{\mathrm{env}}
+
\frac{h_\nu^2}{8}A_{\nu,Q}^{\mathrm{env}}.
$$

All emitted rows satisfy

$$
R_Q^{\mathrm{env}}<\epsilon_Q^{\max}.
$$

Equivalently, the remaining envelope headroom

$$
\sigma_Q^{\mathrm{env}}
=
\epsilon_Q^{\max}-R_Q^{\mathrm{env}}
$$

is positive on every row. This gives the interval/Taylor backend a sharper mathematical target than "match the samples": prove pure-curvature enclosures relative to either the analytic-jet baseline $R_Q^{\mathrm{jet}}$ or the componentwise sampled estimator envelope $R_Q^{\mathrm{env}}$, and keep the remaining unobserved curvature radius inside the displayed positive headroom. The packet still does not assert that $A_{\theta,Q}^{\mathrm{env}}$ or $A_{\nu,Q}^{\mathrm{env}}$ enclose the full subcell; the intervalized successor instead computes directed-rounded curvature enclosures over each theta-localized tile.

The new fourth-jet transport witness turns that remaining unobserved-curvature phrase into a sampled Taylor quantity. Let the nearest-sample covering radii on $Q$ be

$$
r_{\theta,Q}
=
\frac{h_\theta}{2(n_{\mathrm{ref}}-1)},
\qquad
r_{\nu,Q}
=
\frac{h_\nu}{2(n_{\mathrm{ref}}-1)}.
$$

At the default $3\times3$ refinement inside each stencil subcell, these are one quarter of the corresponding subcell widths. The packet reads sampled order-4 gradients from the same analytic root-sheet jets and forms

$$
T_{\theta,Q}
=
r_{\theta,Q}
\max|\partial_\theta(\partial_{\theta\theta}g)|_{\mathrm{samp}}
+
r_{\nu,Q}
\max|\partial_\nu(\partial_{\theta\theta}g)|_{\mathrm{samp}},
$$

$$
T_{\nu,Q}
=
r_{\theta,Q}
\max|\partial_\theta(\partial_{\nu\nu}g)|_{\mathrm{samp}}
+
r_{\nu,Q}
\max|\partial_\nu(\partial_{\nu\nu}g)|_{\mathrm{samp}}.
$$

It then tests the transported sampled envelope

$$
R_Q^{(4)}
=
\frac{h_\theta^2}{8}
\left(A_{\theta,Q}^{\mathrm{env}}+T_{\theta,Q}\right)
+
\frac{h_\nu^2}{8}
\left(A_{\nu,Q}^{\mathrm{env}}+T_{\nu,Q}\right)
<
\epsilon_Q^{\max}.
$$

All emitted rows pass this sampled fourth-jet transport inequality. The claim remains sampled: $T_{\theta,Q}$ and $T_{\nu,Q}$ are not directed-rounded Lipschitz constants over the whole subcell. They are the concrete fourth-order Taylor transport quantities that identified the successful interval/Taylor route.

The fifth-jet witness then tests whether the same sampled headroom can survive one more Taylor transport step. Let $H_{\theta,Q}$ and $H_{\nu,Q}$ be the sampled Hessian maxima of the two curvature-gradient rows. The executable first transports the sampled gradient maxima:

$$
\widetilde G_{\theta\theta,Q}
=
G_{\theta\theta,Q}
+
r_{\theta,Q}H_{\theta\theta\theta,Q}
+
r_{\nu,Q}H_{\theta\theta\nu,Q},
$$

$$
\widetilde G_{\theta\nu,Q}
=
G_{\theta\nu,Q}
+
r_{\theta,Q}H_{\theta\theta\nu,Q}
+
r_{\nu,Q}H_{\theta\nu\nu,Q},
$$

and similarly for the two gradient components of $\partial_{\nu\nu}g$. It then forms a fifth-jet transported pure-curvature envelope

$$
R_Q^{(5)}
=
\frac{h_\theta^2}{8}
\left(
A_{\theta,Q}^{\mathrm{env}}
+r_{\theta,Q}\widetilde G_{\theta\theta,Q}
+r_{\nu,Q}\widetilde G_{\theta\nu,Q}
\right)
+
\frac{h_\nu^2}{8}
\left(
A_{\nu,Q}^{\mathrm{env}}
+r_{\theta,Q}\widetilde G_{\nu\theta,Q}
+r_{\nu,Q}\widetilde G_{\nu\nu,Q}
\right).
$$

All emitted rows pass

$$
R_Q^{(5)}<\epsilon_Q^{\max}.
$$

The latest executable witness localizes that sampled Taylor statement in the direction that actually reduces the peak-budget pressure. For each theta tile $T\subset Q$, let $m_T$ be the maximum sampled derivative on the four tile vertices. The emitted row forms

$$
U_T
=
m_T
+
\frac{h_{\theta,T}^2}{8}
\widehat M_{\theta\theta,Q}^{(5)}
+
\frac{h_{\nu,Q}^2}{8}
\widehat M_{\nu\nu,Q}^{(5)},
$$

where $\widehat M_{\theta\theta,Q}^{(5)}$ and $\widehat M_{\nu\nu,Q}^{(5)}$ are the sampled fifth-jet transported pure-curvature bounds above. The row passes when

$$
U_T
<
m_Q+\epsilon_Q^{\max}
$$

for every theta tile. At the default refinement, each stencil subcell is split into two theta tiles and all $2048$ subcells pass this sampled theta-localized Taylor upper-envelope witness.

The directed-rounded successor now replaces the sampled Taylor anchors by interval objects on the certified source-root tubes. For each theta tile $T$, the executable row computes directed-rounded derivative intervals at the four tile vertices and uses their upper hull $m_T^\#$ as the anchor. It then evaluates interval root-sheet jets over the tile to enclose the two pure-curvature terms

$$
M_{\theta\theta,T}^\#\ge \sup_T|\partial_{\theta\theta}g|,
\qquad
M_{\nu\nu,T}^\#\ge \sup_T|\partial_{\nu\nu}g|.
$$

The theorem-grade tile envelope is therefore

$$
U_T^\#
=
m_T^\#
+
\frac{h_{\theta,T}^2}{8}M_{\theta\theta,T}^\#
+
\frac{h_{\nu,Q}^2}{8}M_{\nu\nu,T}^\#.
$$

Every emitted tile proves

$$
U_T^\#
<
m_Q+\epsilon_Q^{\max}.
$$

Thus the finite directed-rounding burden in this packet is no longer open: all $2048$ subcells and all emitted theta tiles pass the directed-rounded theta-localized Taylor intervalization attempt. The worst directed-rounded interval/Taylor ratio is

$$
0.0164397437213,
$$

with minimum headroom

$$
3.72535118309\times10^{-6}.
$$

The bottleneck row is

$$
\texttt{I1.f1.bracket-derivative-mesh.0.7.peak-budget.3.1}.
$$

The parameter-localized direct interval derivative attempt remains useful as a diagnostic: using the certified source-root tubes immediately, with root-sheet localization but without Taylor cancellation, still gives a finite denominator-safe direct hull that is too wide. The closure route is the Taylor one, not the direct derivative hull. The remaining work has moved downstream to full `I1.f1` interval zero isolation, interval critical exhaustion, interval quadrature, and the retained-branch decision.

The root-tube denominator bottleneck is

$$
\texttt{I1.f1.bracket-derivative-mesh.15.7.peak-budget.3.3},
$$

and the sampled adjacent-tube-separation bottleneck is

$$
\texttt{I1.f1.bracket-derivative-mesh.0.7.peak-budget.0.3}.
$$

## What This Adds

The predecessor mixed-stencil certificate made the derivative-variation row empirical at finite stencil points. This packet changes the remaining theorem-grade burden from a vague "exclude unsampled peaks" statement into explicit finite inequalities:

$$
\epsilon_Q<\epsilon_Q^{\max}
\quad
\text{for all }2048\text{ subcells}.
$$

That is a sharper mathematical object than another gate. The packet now has both a failed baseline and a successful proof route: the direct protected-tube hull does not fit the peak budgets, but the directed-rounded theta-localized Taylor intervalization does. The successful route consumes the same certified source-root partition, adds directed-rounded vertex derivative anchors, encloses the needed pure-curvature terms by interval root-sheet jets, and proves that the Taylor interpolation error for $f'_\times$ stays below the displayed peak budget on every subcell.

The packet also shows where the difficulty actually lived. The negative derivative clearance is about $0.060388174983$, while the tightest allowance budget is only about $3.7876\times10^{-6}$. The protected-tube sign margins are order $10^{-1}$ even after directed-rounded source-root interval enclosure, so the root-tube geometry was not a near-collision or near-zero complement problem. The closing mechanism is Taylor cancellation on theta-localized tiles: the direct interval hull remains too wide, but interval pure-curvature jets and directed-rounded vertex anchors keep continuous mixed-cell variation below the finite budget.

The emitted rows are backend-ready: each subcell carries its own $\theta$ rectangle, speed-ratio rectangle, vertex derivative maximum, refined sampled maximum, and required strict overshoot bound. The formula sheet is the source-atlas derivative formula:

$$
\phi=2\tilde\theta-\delta,
$$

$$
F_{\kappa,\nu}(\tilde\theta,\delta)
=
\frac{\delta^2}{\nu^2}-2+\sin\phi+\kappa\sin\delta,
\qquad
F_\delta
=
\frac{2\delta}{\nu^2}-\cos\phi+\kappa\cos\delta,
$$

$$
B=-\frac12(\cos\phi+\kappa\cos\delta),
\qquad
\delta'=-\frac{2\cos\phi}{F_\delta}.
$$

With

$$
I=(\delta^2|F_\delta|)^{-1},
$$

the source contribution derivative is represented in the executable as

$$
s'_{\kappa,\sigma}
=
\frac{2\sigma}{\nu}\left(B'I+BI'\right),
$$

and the cross-binary derivative combines the four source rows by

$$
f'_\times(\theta)
=
s'_{+,+}(\theta)
-s'_{+,+}(\theta+Q)
+s'_{-,+}(\theta)
-s'_{-,+}(\theta+Q).
$$

The root-tube certificate has a precise interval form. For a parameter rectangle $P$ and a retained source-root tube

$$
D_r=[\delta_r^-,\delta_r^+],
$$

an interval backend proves one regular sheet in $D_r$ if it shows:

$$
F(P,\delta_r^-)
\text{ and }
F(P,\delta_r^+)
\text{ have opposite interval signs},
$$

$$
F_\delta(P,D_r)
\subset
[\lambda_r,\infty)
\quad\text{or}\quad
F_\delta(P,D_r)
\subset
(-\infty,-\lambda_r]
\quad
\text{for some }\lambda_r>0,
$$

and, for every complement slab $K_\ell$ between retained tubes and source-domain endpoints,

$$
0\notin F(P,K_\ell).
$$

The first condition gives existence, the fixed-sign $F_\delta$ condition gives uniqueness and implicit-sheet regularity inside $D_r$, and the complement exclusion proves that no extra source roots appear outside the retained tubes. Once those three interval statements are available, the derivative formulas above may be differentiated as root-sheet identities rather than sampled formulas.

The executable target fixes the formerly implicit choice of $D_r$ and $K_\ell$. For each subcell it emits six protected tubes and ten complement slabs. This means the root-sheet part of the next proof is no longer "find the right isolation geometry"; it is a finite list of interval endpoint-sign, fixed-$F_\delta$, and complement-exclusion statements on already specified intervals.

Thus the analytic target is explicit. The closing intervalization proves, on each emitted rectangle $Q$,

$$
\sup_Q f'_\times
\le
m_Q+\epsilon_Q,
\qquad
\epsilon_Q<\epsilon_Q^{\max}.
$$

The packet also adds a bilinear vertex-envelope reduction. For $g=f'_\times$ on a subcell with widths $h_\theta$ and $h_\nu$, the bilinear interpolant through the four vertex values is bounded above by $m_Q$. If

$$
M_{\theta\theta}
\ge
\sup_Q |\partial_{\theta\theta}g|,
\qquad
M_{\nu\nu}
\ge
\sup_Q |\partial_{\nu\nu}g|,
$$

then the tensor interpolation remainder gives the sufficient condition

$$
\sup_Q g
\le
m_Q
+
\frac{h_\theta^2}{8}M_{\theta\theta}
+
\frac{h_\nu^2}{8}M_{\nu\nu}.
$$

Therefore each subcell row now also emits the strict curvature target

$$
\frac{h_\theta^2}{8}M_{\theta\theta}
+
\frac{h_\nu^2}{8}M_{\nu\nu}
<
\epsilon_Q^{\max}.
$$

This is the practical theorem route that now closes the packet: consume the certified source-root partition, bound the two pure second partials of $f'_\times$ by interval root-sheet jets, and compare the resulting Taylor remainder against the emitted overshoot budget. The sampled-curvature inflation certificate explained why this was plausible; the directed-rounded theta-localized Taylor intervalization supplies the proof object.

The sampled root-tube probe, finite target emission, sampled sign-margin certificate, machine-padded source-root interval certificate, and directed-rounded source-root interval certificate remove a major ambiguity from the geometry. The sampled sheets do not approach $\delta=0$, do not collide with each other, and do not pass through $F_\delta=0$ on the replay grid; the analytic source-root enclosures then show that the emitted protected tubes and complement slabs have order-$10^{-1}$ directed-rounded sign margins. At this claim level the geometry is therefore a bundle of separated implicit-root tubes rather than a near-fold or branch-collision problem.

The sampled curvature probe was not a proof of the interval bounds, but it correctly identified the route. The observed bilinear remainder consumed only about $6.4\%$ of the worst required overshoot budget, the minimum admissible sampled-curvature inflation factor was about $15.8$, and a uniform factor-$10$ inflation had positive global margin. The emitted protected root-tube target has minimum padding radius $\approx0.108489314201$, minimum complement width $\approx0.325467942606$, and the directed-rounded complement sign floor remains order $10^{-1}$. The parameter-localized direct interval derivative attempt shows that this good root geometry is not enough by itself: even after localized monotone root-sheet contraction, the direct hull for $g=f'_\times$ is finite but too wide on all $2048$ subcells. The interval/Taylor route now adds the missing structure: directed-rounded vertex derivative anchors plus interval root-sheet pure-curvature jets on theta-localized tiles prove the envelope $U_T^\#$ below $m_Q+\epsilon_Q^{\max}$ on every row. That closes the bracket-local directed-rounding derivative-variation row for the finite peak-budget packet.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction.mjs) emits:

- predecessor validation for the mixed-stencil derivative-variation certificate;
- the parent peak budget $\mu_C$ for each predecessor mesh cell;
- one peak-budget row for each of the $2048$ stencil subcells;
- the $\theta$ and speed-ratio rectangle, vertex maximum $m_Q$, refined local maximum, refined excess over vertices, effective overshoot ceiling, derivative clearance, source-root count, term root-count signature, and sampled $\min |F_\delta|$ for each subcell;
- the backend formula sheet, per-subcell strict overshoot inequality, bilinear pure-curvature sufficient condition, sampled pure-curvature feasibility probe, sampled-curvature inflation headroom certificate, sampled analytic-jet curvature witness, sampled analytic-jet envelope budget, sampled fourth-jet curvature-transport witness, sampled fifth-jet curvature-gradient transport witness, sampled theta-localized Taylor upper-envelope witness, directed-rounded theta-localized Taylor intervalization attempt, sampled root-tube regularity probe, finite interval-root-tube certificate target, sampled finite root-tube sign-margin certificate, machine-padded source-root interval certificate, directed-rounded source-root interval certificate, fixed-sign $F_\delta$ monotone root-sheet contraction, parameter-localized direct interval derivative-envelope attempt, and curvature interval-jet target;
- explicit zero-isolation, derivative-interval, critical-exhaustion, quadrature, and non-retention boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction.test.js) verifies schema validation, predecessor composition, speed-window removal, default $2048$ subcell budgets, backend-ready subcell rectangles, formulas, bilinear curvature conditions, sampled pure-curvature feasibility margins, sampled-curvature inflation headroom, sampled analytic-jet curvature witnesses, sampled analytic-jet envelope budgets, sampled fourth-jet curvature-transport witnesses, sampled fifth-jet curvature-gradient transport witnesses, sampled theta-localized Taylor upper-envelope witnesses, directed-rounded theta-localized Taylor intervalization, fixed-sign $F_\delta$ root-sheet contractions, parameter-localized direct interval derivative-envelope attempts, curvature interval-jet targets and root-sheet recurrences, sampled root-tube floors and separations, finite root-tube target counts and margins, sampled finite root-tube sign margins, machine-padded and directed-rounded source-root interval margins, the $10368$-sample refined replay, row-level positivity and root-signature preservation, claim boundaries, invalid controls, overclaim rejection, and CLI emission.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_I1\_f1\_bracket\_local\_derivative\_peak\_budget\_reduction=true},
$$

$$
\texttt{converts\_directed\_rounding\_derivative\_variation\_to\_finite\_subcell\_peak\_bounds=true},
$$

$$
\texttt{certifies\_refined\_sampled\_peak\_audit=true}.
$$

$$
\texttt{certifies\_sampled\_bilinear\_curvature\_feasibility=true}.
$$

$$
\texttt{certifies\_sampled\_curvature\_inflation\_headroom=true}.
$$

$$
\texttt{certifies\_curvature\_interval\_jet\_target=true}.
$$

$$
\texttt{certifies\_sampled\_analytic\_jet\_curvature\_witness=true}.
$$

$$
\texttt{certifies\_sampled\_analytic\_jet\_envelope\_budget=true}.
$$

$$
\texttt{certifies\_sampled\_fourth\_jet\_curvature\_transport\_witness=true}.
$$

$$
\texttt{certifies\_sampled\_fifth\_jet\_curvature\_gradient\_transport\_witness=true}.
$$

$$
\texttt{certifies\_sampled\_theta\_localized\_taylor\_upper\_envelope\_witness=true}.
$$

$$
\texttt{certifies\_sampled\_root\_tube\_regularity\_feasibility=true}.
$$

$$
\texttt{certifies\_finite\_interval\_root\_tube\_certificate\_target=true}.
$$

$$
\texttt{certifies\_sampled\_finite\_root\_tube\_sign\_margin\_certificate=true}.
$$

$$
\texttt{certifies\_machine\_padded\_source\_root\_interval\_certificate=true}.
$$

$$
\texttt{certifies\_machine\_padded\_interval\_source\_root\_tube\_isolation=true}.
$$

$$
\texttt{certifies\_machine\_padded\_interval\_source\_root\_sheet\_continuation=true}.
$$

$$
\texttt{certifies\_machine\_padded\_interval\_F\_delta\_lower\_bound=true}.
$$

$$
\texttt{certifies\_machine\_padded\_interval\_complement\_exclusion=true}.
$$

$$
\texttt{certifies\_directed\_rounded\_source\_root\_interval\_certificate=true}.
$$

$$
\texttt{certifies\_directed\_rounded\_interval\_source\_root\_tube\_isolation=true}.
$$

$$
\texttt{certifies\_directed\_rounded\_interval\_source\_root\_sheet\_continuation=true}.
$$

$$
\texttt{certifies\_directed\_rounded\_interval\_F\_delta\_lower\_bound=true}.
$$

$$
\texttt{certifies\_directed\_rounded\_interval\_complement\_exclusion=true}.
$$

It also claims that the direct derivative-envelope attempt is executable but not closing:

$$
\texttt{emits\_direct\_interval\_derivative\_envelope\_attempt=true},
\qquad
\texttt{certifies\_monotone\_root\_sheet\_range\_contraction=true},
\qquad
\texttt{certifies\_direct\_interval\_derivative\_upper\_envelope=false}.
$$

The interval/Taylor route does close:

$$
\texttt{emits\_directed\_rounded\_theta\_localized\_taylor\_intervalization\_attempt=true},
$$

$$
\texttt{certifies\_directed\_rounded\_taylor\_upper\_envelope=true},
$$

$$
\texttt{certifies\_interval\_second\_partial\_curvature\_enclosure=true},
$$

$$
\texttt{certifies\_I1\_f1\_bracket\_local\_directed\_rounding\_derivative\_variation\_enclosure=true}.
$$

For the emitted source-root partition only, this also supports

$$
\texttt{certifies\_interval\_root\_tube\_isolation=true},
\qquad
\texttt{certifies\_interval\_root\_sheet\_continuation=true},
$$

$$
\texttt{certifies\_interval\_F\_delta\_lower\_bound=true},
\qquad
\texttt{certifies\_interval\_complement\_exclusion=true}.
$$

It does not claim:

$$
\texttt{certifies\_I1\_derivative\_negative\_full\_cell\_interval\_enclosure=false},
$$

$$
\texttt{certifies\_I1\_f1\_full\_interval\_zero\_isolation=false},
\qquad
\texttt{certifies\_I1\_zero\_isolation=false},
$$

$$
\texttt{certifies\_outward\_rounded\_interval\_enclosure=false},
\qquad
\texttt{certifies\_interval\_derivative\_enclosure=false},
$$

$$
\texttt{certifies\_interval\_critical\_exhaustion=false},
\qquad
\texttt{certifies\_interval\_quadrature\_enclosure=false},
\qquad
\texttt{retained\_branch=false}.
$$

The resulting status is

$$
\boxed{
\texttt{source-atlas-aware-i1-f1-bracket-local-directed-rounded-taylor-derivative-variation-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only` and classified as `defer with blocker`. It is mathematically substantive because it converts the bracket-local directed-rounding derivative-variation burden into finite subcell peak budgets with explicit bottlenecks, fixes the finite protected-tube/complement partition, certifies that partition by directed-rounded source-root interval arithmetic, contracts every emitted all-parameter root sheet by fixed-sign $F_\delta$ monotone bisection, re-contracts those sheets on localized parameter tiles, executes the direct outward-rounded derivative formula on those localized contracted sheets, and shows that even the parameter-localized direct hull is still too wide. It then closes the row by the interval/Taylor route: directed-rounded vertex derivative anchors and interval root-sheet pure-curvature jets prove the theta-localized Taylor upper envelope below every finite row budget. It should not be promoted into reader-facing AAA prose until full `I1.f1` interval zero isolation, interval critical exhaustion, interval quadrature, or a retained branch certificate consumes this finite derivative-variation closure with the remaining interval-row obligations clearly stated.

Successor note: [octahedral-fold-aware-cross-binary-i1-f1-full-interval-zero-isolation-composition](octahedral-fold-aware-cross-binary-i1-f1-full-interval-zero-isolation-composition.md) now consumes this derivative-variation closure with the imported endpoint signs to prove the unique `I1.f1` bracket zero. The remaining blocker has narrowed to interval critical exhaustion, interval quadrature, global `I1` sign topology, and retained branch status.
