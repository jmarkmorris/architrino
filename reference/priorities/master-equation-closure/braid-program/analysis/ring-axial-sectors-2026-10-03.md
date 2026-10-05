# Axial sectors, screw translation and alternating-height rings

The unchanged Master Equation admits an axial first variation that separates from the planar perturbations of an exact ring. The T02, T04 and T06 references have certified oscillatory growing modes in two axial sectors. A common axial displacement is neutral, and a complete uniformly drifting past produces an acceleration opposite to the drift at first order; that signed coefficient alone does not prove that the common axial sector is stable. A ring prepared with only a present-time velocity nudge initially experiences zero axial acceleration, because its arriving wakes still come from its undisturbed planar past.

Two existence obstructions can be stated without a numerical geometry search. The accepted screw-path exclusion through T36 extends to every axial speed strictly below wake speed. At wake speed the phase-alignment roots have zero transmitter factor, and above wake speed there are no positive-delay roots. A regular alternating ring with heights $+h,-h$ cannot be an exact rotating balance for any $h\ne0$ on an ordinary-root chart: every opposite-polarity axial contribution points toward the other height plane, while same-polarity contributions have zero axial component. The growing axial mode therefore supplies a departure direction, not a nearby static puckered equilibrium.

These are **derived conditional** statements from the ordinary-root baseline law and the accepted exact-ring premises. Numerical root witnesses below are **computer-assisted derived** in their stated rectangles. Independent adjudication of this new derivation is required before calling it independently checked. This document changes no equation selection, qualification, score, rank, deferred evolution task or nonlinear fate conclusion.

## Scenario, exact references and complete census

The [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md) contributes $\sigma K\mathbf n/(\ell^2|D|)$ per ordinary hit in wake-speed units $c_f=1$. Here $\sigma=q_iq_j$, $\ell$ is the emission-to-reception separation, $\mathbf n$ points from source emission to receiver reception, and $D=1-\mathbf n\cdot\mathbf V_j$ is the signed transmitter factor. All ordinary positive-delay self hits are included; only the same-transmitter zero-delay endpoint is excluded. No cap, response multiplier, root exclusion or event prescription is used. Numerical references set $K=1$.

Let the six reference paths be $\mathbf X_j^0(T)=R(\cos(\Omega T+\alpha_j),\sin(\Omega T+\alpha_j),0)$, $\alpha_j=j\pi/3$, and $q_j=(-1)^j$. These are exact periodic solutions at the scalar balance zeros in the [accepted ladder](../evidence/2026-08-29-planar-three-binary-circular-balance-ladder.md). The [T02 first-variation evaluation](t02-symmetric-characteristic-independent-evaluation.md), [nonlinear construction](t02-admissible-nonlinear-history-connection.md) and [separate adjudication](t02-nonlinear-history-independent-adjudication-2026-10-03.md) supply distinct inherited premises; their results are consumed here without rerunning the prior planar spectral calculation.

For one receiver, every ordinary circular hit is represented by

$$
\beta\sin v-v=m\pi/6,\qquad 0<v<\pi,\qquad \beta=\Omega R.
$$

The source is $j=m\bmod6$, the delay is $\Delta_m=2R\sin v_m$, the polarity is $\sigma_m=(-1)^m$, and $D_m=1-\beta\cos v_m$. Strict concavity gives descending roots for $m=-5,\ldots,0$ and both rising and descending roots for $m=1,\ldots,t-1$ in T$t$. Endpoint inequalities exclude every other level. Thus T02 has eight hits per receiver, T04 twelve and T06 sixteen; multiplying by six gives 48, 72 and 96 ordered hits. Each has one positive-delay self hit, the descending $m=0$ root.

The new instrument consumes the frozen accepted speed brackets, independently reconstructs every root by monotone bisection, certifies outward-rounded residual endpoint signs and a fixed signed $D$, and encloses its continuation across the full speed bracket using $dv/d\beta=\sin v/D$. It checks the exact expected census, inward radial coefficient, and zero-containing tangential coefficient before evaluating a spectrum. Radial scale is enclosed as $R=-C_r/\beta^2$; all subsequent intervals retain this reference uncertainty. The exact zero is the inherited unique balance in the bracket, not its rounded midpoint.

Falsifier: an omitted root level, a failed root endpoint sign, a zero-containing transmitter factor, or a nonzero full-vector residual at the inherited exact balance defeats the affected first variation and spectral witness.

## Axial first variation from the causal equation

Perturb the exact paths by $z_j(T)\mathbf e_z$. At a planar reference hit, both the separation direction and source velocity lie in the plane. Holding emission time fixed, the first separation change is $(z_i(T)-z_j(T-\Delta_m))\mathbf e_z$. Its dot product with $\mathbf n$ is zero, so the first variation of emission time is zero. The first variations of separation length and $D$ also vanish. Only the axial direction varies, by the separation change divided by $\ell$. Consequently the exact first variation is

$$
z_i''(T)=\sum_m w_m\bigl[z_i(T)-z_{i+m}(T-\Delta_m)\bigr],
\qquad
w_m=\frac{(-1)^mK}{\Delta_m^3|D_m|}.
$$

The sum runs over individual roots, including two rows at a level with both branches and all positive-delay self rows. There is no delayed-velocity term at axial first order, and no extra root-shift term. Axial and planar variations separate because reflection through the reference plane changes the axial perturbation sign and leaves the planar reference unchanged. This statement is confined to first order; axial motion modifies planar geometry at second order.

For an even-member regular alternating ring the same formula holds with source phase $2\pi m/N$ and the complete census belonging to that exact ring. Only the six-member T02, T04 and T06 references are numerically evaluated here.

Grade: derived ordinary-chart first variation. Falsifier: independently differentiating a complete axial perturbed-path causal equation and finding a nonzero first-order delay or transmitter-factor change, or a different axial kernel, overturns it.

## Spatial Fourier sectors and neutral tilt controls

Writing $z_j(T)=a\exp(\lambda T+ik\alpha_j)$ separates the six spatial Fourier sectors $k=0,\ldots,5$. A Fourier sector is simply the displacement pattern around the ring; $k=0$ moves every member together, $k=3$ gives alternating positive and negative heights, and $k=1,5$ include a small rigid tilt. Its scalar characteristic function is

$$
H_k(\lambda)=\lambda^2-\sum_mw_m\left[1-e^{ikm\pi/3-\lambda\Delta_m}\right].
$$

A zero with positive real part gives an exponentially growing first-order perturbation; nonzero imaginary part makes that growth oscillate. The real physical system combines sector $k$ with sector $6-k$ by complex conjugation. Sector $3$ itself has real coefficients and therefore conjugate temporal roots.

Rigid vertical translation gives the exact identity $H_0(0)=0$. Tilting the whole exact circle by a fixed angle produces another exact circle by Euclidean rotation covariance. Its axial displacement contains $e^{i\Omega T+i\alpha_j}$, proving $H_1(i\Omega)=0$ and $H_5(-i\Omega)=0$. These are neutral symmetries; a fixed tilted plane is not a precessing plane. The new evaluator passed these analytical identities after passing the static-source control and before any target scan. Point tilt errors are below $4\times10^{-30}$ on the frozen reference midpoints, consistent with their nonzero speed-bracket widths; they are control diagnostics, not separate tilt-theorem certificates.

Grade: derived characteristic reduction and symmetry identities, with measured evaluator agreement. Falsifier: a rotated exact circle producing a nonzero complete axial residual, or a sector implementation disagreeing with this substitution, blocks target use.

## Certified growing axial modes

The new [axial instrument](../../../../../scripts/braid-program/ring_axial_sectors_20261003.py) found the following candidate zeros at 90 decimal digits and enclosed each in a complex rectangle with half-width $10^{-20}$ in both coordinates. A two-dimensional interval Krawczyk calculation includes the full balance-bracket, root, radius and delay uncertainty at 75 interval decimal digits. Its image lies strictly inside the rectangle and the interval contraction bound is less than one. Thus each displayed rectangle contains one unique zero of the characteristic function of the exact reference. Rounded values below are locating displays; the authoritative binary endpoints are in the local receipt.

| Exact reference | Sector | Real part of $\lambda$ | Imaginary part of $\lambda$ | Consequence |
| --- | ---: | ---: | ---: | --- |
| T02 | 2 | 0.758358582216400 | 2.723385490862011 | oscillatory growing axial mode |
| T02 | 3 | 0.754194613643956 | 3.409705209957524 | oscillatory growing alternating-height mode |
| T04 | 2 | 2.271620262341717 | 7.980364565702232 | oscillatory growing axial mode |
| T04 | 3 | 2.647510986186285 | 10.008516407194701 | oscillatory growing alternating-height mode |
| T06 | 2 | 4.359566024518878 | 16.091873664367533 | oscillatory growing axial mode |
| T06 | 3 | 5.616702907852257 | 20.362310184620763 | oscillatory growing alternating-height mode |

The witnessed sector-2 root and its sector-4 conjugate supply two real unstable directions; the sector-3 conjugate pair supplies two more. Thus each reference has at least four real growing directions within the axial first variation. This is a lower bound, not a count of all unstable characteristic roots. The seed search found no positive witness in sectors 0 or 1, but its finite sampling establishes no absence result. T02 already has independently adjudicated nonlinear instability in a different, common planar sector. The new T04 and T06 rows establish linear axial instability; a nonlinear-history theorem in those sectors is an additional obligation.

The rates increase over these three references. Their growth relative to $\Omega$ and their large-rung limit are not established by three rows. Every quoted inverse-time rate rescales by $c_f^3/K$ when symbolic units are restored.

Grade: computer-assisted derived existence and uniqueness of the six witnessed zeros, conditional on the derived axial variation and inherited exact balance. Falsifier: a failed strict rectangle inclusion, a contraction bound reaching one, non-outward interval arithmetic, or failure of any exact-reference premise defeats its row.

## A common axial nudge and its memory dependence

For $z_j=z$, the common equation is

$$
z''(T)=\sum_mw_m[z(T)-z(T-\Delta_m)].
$$

Applying this to a prescribed complete drift $z(T)=UT$ gives $z''=U B$, where

$$
B=\sum_mw_m\Delta_m=\frac{K}{R^2}S(\beta),
\qquad
S(\beta)=\sum_m\frac{(-1)^m}{4\sin^2v_m|1-\beta\cos v_m|}.
$$

The negative $B$ values mean that a past which has already been drifting induces acceleration opposite to that drift at first order. Uniform drift is not an exact solution. The accepted translation chart certifies $S<0$ through T36, and the new instrument separately encloses $B$ for the first three references.

| Exact reference | Outward-widened enclosure of $B$ | One certified common-sector decaying root |
| --- | --- | --- |
| T02 | $[-6.043945,-6.043944]$ | $-0.448649230986820+2.600619852547363i$ |
| T04 | $[-28.660657,-28.660656]$ | $-1.403163960576115+4.446531134458806i$ |
| T06 | $[-76.265357,-76.265356]$ | $-2.031518546159013+6.054694200802055i$ |

The decaying zeros pass the same rectangle certification as the growing witnesses. They demonstrate available damped oscillatory modes in the common sector, not that these are its slowest modes or that every common nudge decays. In particular $B$ is not a decay exponent. The exact neutral translation zero remains present; $H_0'(0)=-B>0$ makes it simple on these references.

A present-time impulse is a different preparation. If the axial past is flat, $z(T)=0$ for $T\leq0$, and the present axial velocity is changed to $U$, then every first-step source remains in the flat past until the shortest delay $\Delta_{\min}$. Over $0<T<\Delta_{\min}$ the linear equation is exactly $z''=Wz$, with $W=\sum_mw_m$. At the impulse event itself $z=0$, so the arriving acceleration is zero. Where $W<0$, the first step is $z(T)=U\sin(\sqrt{-W}T)/\sqrt{-W}$ and $z'(T)=U\cos(\sqrt{-W}T)$; the acceleration begins as $WU T$. The target receipt encloses $W$ for each reference. Later steps involve its evolving delayed history and must use the full equation. Neither a memoryless drag law nor a common-sector stability verdict follows from the negative drift coefficient.

Grade: derived preparation-dependent first-step response and computer-assisted derived drift and decaying-root witnesses. Falsifier: a complete-history solution with the specified flat past violating this first-step reduction, a nonnegative certified $B$ in its stated bracket, or a failed decaying-root rectangle invalidates the corresponding claim. A stable common-sector claim would require a right-half-plane root exclusion or a separate history estimate, which is absent here.

## Extending the screw chart and its exact boundary

Consider the prescribed whole-past screw paths

$$
\mathbf X_j(T)=R(\cos(\Omega T+\alpha_j),\sin(\Omega T+\alpha_j),0)+uT\mathbf e_z.
$$

These histories are unbounded in absolute axial position. No bounded-past exclusion is imported from the stationary ring. Instead their exact causal equation is

$$
\Delta^2=4R^2\sin^2\left(\frac{\Omega\Delta-\alpha_j+\alpha_i}{2}\right)+u^2\Delta^2.
$$

For $|u|<1$, put $\gamma=\sqrt{1-u^2}$. The transverse chord equals $\gamma\Delta$, so $\Delta\leq2R/\gamma$ exactly. This supplies complete delay coverage for an unbounded screw history. Its reduced root chart is the stationary chart at effective transverse speed $b=\Omega R/\gamma$. The mapped direction is $(\gamma\mathbf n_0,u)$ and the transmitter factor is $\gamma^2D_0$.

Tangential and radial balance restrict a screw candidate associated with a stationary rung $(b,R_0,\Omega_0)$ to

$$
\beta_f(u)=\gamma b,\qquad R(u)=R_0/\gamma,
\qquad \Omega(u)=\gamma^2\Omega_0,
\qquad \Delta_m(u)=\Delta_{m,0}/\gamma^2.
$$

Its actual axial acceleration is

$$
A_z(u)=\frac{Ku}{R(u)^2}S(b)
=\frac{K(1-u^2)u}{R_0^2}S(b).
$$

The [accepted axial chart](../evidence/2026-09-01-planar-three-binary-axial-translation-speed-chart.md) writes the corresponding dimensionless coefficient as $uS$. Keeping the positive scale factor is necessary when reporting physical acceleration or comparing with the common first variation. It does not change its zeros or sign. Since its eighteen stationary signed weights are outward-certified negative, no nonzero screw balance on any of those T02–T36 branches exists anywhere in $|u|<1$. This extension is algebraic and uses no new speed samples. Higher stationary rungs require their own signed-weight enclosure or an all-rung sign theorem.

As $|u|\to1$ along the necessary balance scaling, the radius and delay depth diverge, frequency tends to zero, and the transmitter floor tends to zero. The axial residual tends to zero, but no finite-radius exact ring is obtained by taking that limit. At exactly $|u|=1$, every positive-delay causal solution requires zero transverse chord: only phase-alignment delays survive. At such a root $\mathbf n=\operatorname{sgn}(u)\mathbf e_z$ and $\mathbf V_j\cdot\mathbf n=1$, hence $D=0$. The ordinary branch sum is undefined there; these persistent alignments are not a transverse generic fold that an accepted transit prescription would automatically resolve. No event rule is added.

For $|u|>1$, range is at least $|u|\Delta>\Delta$ at every positive delay. Thus there are no positive-delay roots even though the absolute past is unbounded. The acceleration sum is zero and cannot supply the nonzero centripetal acceleration of a rotating ring. This excludes exact rotating screw rings above wake speed under the unchanged ordinary-root equation for any nonzero radius and angular frequency.

Grade: derived speed-domain extension conditional on the accepted finite signed-weight certificate, and derived exact singular/rootless boundary statements. Falsifier: a causal root violating the exact delay identity, a finite ordinary transmitter factor at wake-speed phase alignment, a positive-delay root above wake speed, or an accepted T02–T36 weight containing zero defeats its corresponding claim.

## Alternating-height pucker: full axial residual first

Let

$$
\mathbf X_j(T)=R(\cos(\Omega T+\alpha_j),\sin(\Omega T+\alpha_j),(-1)^jh/R),
\qquad q_j=(-1)^j.
$$

The third component is $(-1)^jh$. This is a rigid rotation of a regular hexagon with alternating heights; its prescribed axial acceleration is zero. For an even source difference, receiver and emission have the same height, so the axial separation and contribution vanish, including every self hit. For an odd difference, the axial separation at an upper receiver is $2h$, the polarity is negative, and each ordinary contribution is

$$
A_{z,m}=-\frac{2Kh}{\ell_m^3|D_m|}.
$$

Every nonzero row has the same axial sign. There is at least one causal root in each opposite-polarity channel: at zero delay its gap is positive, while bounded circular positions make the gap negative for sufficiently large delay. A candidate restricted to the ordinary-root domain must retain its complete finite simple census; a degenerate crossing leaves that domain and cannot be silently omitted. Therefore $A_z$ is strictly negative for an upper receiver when $h>0$ and strictly positive at a lower receiver. No radial or tangential cancellation can remove this axial mismatch. The configuration is not an exact balance for any $h\ne0$ on an ordinary-root chart, at any radius or circulation rate.

This proves a full-vector imbalance by one nonzero component; it does not claim to have measured the other two components. The same sign argument applies to any regular alternating even-member circle with each polarity assigned its own height plane. It does not cover unequal individual heights, mixed-polarity coaxial components, precession, or general three-dimensional paths.

At $h=0$ its first derivative agrees with sector $3$:

$$
A_z' (0)=-2\sum_{m\ \mathrm{odd}}\frac{K}{\Delta_m^3|D_m|}<0,
\qquad H_3(0)>0.
$$

The static restoring sign and the oscillatory growing characteristic pair are consistent. A delayed response can oppose a static displacement and still amplify an oscillation because it samples an earlier displacement. The certified growing pucker mode therefore does not point to a nearby rigid puckered balance; its later nonlinear fate remains open.

Grade: derived global obstruction within this explicit two-height ordinary-root ansatz. Falsifier: a same-height axial contribution, an opposite-polarity ordinary contribution with the wrong sign, or an exact nonzero-height full-vector balance with a complete finite simple census overturns it. General three-dimensional ring existence remains unresolved.

## Instrument record and remaining boundaries

The instrument imports no existing root oracle, planar first-variation evaluator or production solver. The analytical known case is a static transmitter at separation 2, whose axial derivative is $K/2^3=1/8$ at $K=1$; a separately evaluated nonlinear centered difference agrees before any ring target is evaluated. The `known`, `controls`, `target` receipts are source-identity gated and retain exact interval binary endpoints under `.local-data/ring-exploration/axial/`. The input speed-certificate identity is checked before use. Reproduction commands, using the shared venv only, are:

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_axial_sectors_20261003.py --stage known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_axial_sectors_20261003.py --stage controls
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_axial_sectors_20261003.py --stage target
```

Krawczyk inclusion is the following explicit existence argument. For the real and imaginary equations, take an invertible real approximate inverse $C$ of the center Jacobian. On rectangle $X$ around $x_0$, the map $x\mapsto x-CF(x)$ has image contained in $x_0-CF(x_0)+(I-CJF(X))(X-x_0)$. Strict inclusion places that map in the rectangle, and the interval row-sum contraction bound below one gives a unique fixed point. Since $C$ is invertible, that fixed point is exactly a zero. This checks each witnessed rectangle; it supplies no global count.

Still unresolved are right-half-plane root counts and exclusion for common and tilt sectors, nonlinear axial instability at T04/T06, all-rung asymptotics of axial growth, full disturbance response beyond the first memory step, general three-dimensional branches, precessing or in-plane-translating rings, and the higher-rung signed screw weights. No EOM evolution or persistence claim was attempted. Shared queues, manuscript, work log and cross-geometry indexes are owned by the coordinator.
