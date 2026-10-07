# Exact angular-history formulation of the remaining return problem

## Scope and variables

Claim grade: derived candidate pending independent assessment. On the actual admitted mirror-planar logarithmic continuation, positive angular momentum makes the continuously increasing polar angle a valid time coordinate. Once its full angular source window is generated, the later shape dynamics can be written as an autonomous equation for two scalar history functions over less than $\pi/2$ of angle. This is a change of coordinates in the unchanged equation, not a new response or a new history.

Retain physical radius $r$, radial velocity $p=r'$, tangential velocity $z=h/r>0$, and let

$$
y(\theta)=\frac pz=\frac{d\log r}{d\theta},
\qquad \chi(\theta)=\frac1z>0.
\tag{1}
$$

Thus

$$
\frac{dT}{d\theta}=r\chi,
\qquad |v|^2=\frac{1+y^2}{\chi^2},
\qquad \chi^2>1+y^2
\tag{2}
$$

on the strict domain. A prime on physical $r$ in the definition of $p$ denotes physical time; derivatives in the equations below are explicitly with respect to $\theta$.

The fixed law and actual complete family are those of the [method admission](authorized-cases-ten-hour-c-spiral-method-admission.md). The [compact infinite-regime theorem](authorized-cases-ten-hour-c-spiral-compact-infinite-regime.md) provides the positive radius, source denominator and tangential-speed bounds for an infinite branch. No new perturbation amplitude or initial history is selected. The held tail is not inverted in angle: this chart is used only after its full source window belongs to the generated positive-angular-momentum path.

## The exact angular source clock

For a candidate angular lag $\delta\in(0,\pi/2)$ define

$$
\kappa(\xi)=\exp\!\left[-\int_{\theta-\xi}^{\theta}y(\varphi)\,d\varphi\right],
\qquad \kappa=\kappa(\delta)=\frac{r_s}{r},
$$

$$
d=\sqrt{1+\kappa^2+2\kappa\cos\delta}=\frac Rr.
\tag{3}
$$

The actual physical delay is the integral of $dT/d\theta$ along the complete source arc. Hence its normalized clock is exactly

$$
G(\delta;y,\chi):=
\int_0^\delta\kappa(\xi)\chi(\theta-\xi)\,d\xi-d=0.
\tag{4}
$$

The actual source velocity resolved against the chord gives

$$
D=1+\frac{(\kappa+\cos\delta)y_s+\sin\delta}{d\chi_s},
\qquad y_s=y(\theta-\delta),\quad
\chi_s=\chi(\theta-\delta).
\tag{5}
$$

Differentiate (4) with respect to the lag while holding the two history functions fixed. Since $\partial_\delta\kappa=-\kappa y_s$,

$$
\partial_\delta G
=\kappa\left[\chi_s+
\frac{(\kappa+\cos\delta)y_s+\sin\delta}{d}\right]
=\kappa\chi_sD>0.
\tag{6}
$$

Thus the angular clock is the same ordinary source root expressed in the monotone angle coordinate. Its implicit derivative keeps the full transmitter factor. The positive lower denominator and the compact later regime make it a regular local functional on the actual late history chart. Uniqueness of the selected clock also follows directly from the already established physical root uniqueness.

## The exact two-history equation

Introduce only the abbreviation

$$
F=\frac{\chi^2}{d^2D}.
$$

Then the unchanged logarithmic equation becomes

$$
\frac{dy}{d\theta}
=1+y^2-F\,[1+\kappa\cos\delta+y\kappa\sin\delta],
\tag{7}
$$

$$
\frac{d\chi}{d\theta}
=y\chi-\frac{\chi^3\kappa\sin\delta}{d^2D}.
\tag{8}
$$

To check the transformation directly, the physical polar equations are

$$
\frac{dp}{dT}=\frac{z^2}{r}
-\frac{r+r_s\cos\delta}{R^2D},
\qquad
\frac{dz}{dT}=\frac{r_s\sin\delta}{R^2D}-\frac{pz}{r}.
$$

Use $d/d\theta=(r/z)d/dT$, $y=p/z$, $\chi=1/z$, and $R=rd$. These substitutions give (7)–(8) term by term. The factors $\chi^2$ and $\chi^3$ are coordinate factors from this time change; they are not receiver multipliers in the physical response.

Given an actually attained history solving (4), (7), and (8), radius and physical time are recovered by

$$
r(\theta)=r(\theta_0)
\exp\!\left(\int_{\theta_0}^{\theta}y(\varphi)\,d\varphi\right),
\qquad
T(\theta)-T(\theta_0)=\int_{\theta_0}^{\theta}r(\varphi)\chi(\varphi)\,d\varphi.
\tag{9}
$$

These formulas preserve the current scale and time origin. They do not authorize an arbitrary angular history as the original complete preparation.

For comparison with the normalized physical-time regime, retain the passive variable $q=r/(1+T)$. It obeys

$$
\frac{dq}{d\theta}=q y-q^2\chi.
\tag{10}
$$

It does not feed back into (4), (7), or (8), but its positive bounds retain the actual linear-dispersal condition. Dropping it when discussing generic bounded angular histories would permit histories that do not represent the established infinite regime.

## The exact spiral is a known equilibrium check

Use the exact admitted balance triple, bound to its certified rectangle, and set

$$
y_*\equiv\frac1\omega,
\qquad \chi_*\equiv\frac1{a\omega},
\qquad \delta=\delta_*,\qquad \kappa=\lambda.
$$

The clock integral is $\chi_*(1-\lambda)/y_*=(1-\lambda)/a=d$, and the admitted source factor is $D=1/\lambda$. The exact balances give

$$
F(1+\lambda\cos\delta_*)=1,
\qquad F\lambda\sin\delta_*=\frac1\omega=y_*.
$$

Both right sides of (7)–(8) therefore vanish. Equation (10) also vanishes at $q=a$. This verifies the transformed law on the already admitted exact solution without substituting printed parameter decimals or continuing that physical preparation through its singular formal time.

The later compact regime gives bounded $y$ and $\chi$, with $\chi\ge1$, $\chi\le1/z_0$, and $|y|\le1/z_0$. Its clock remains ordinary. Thus the remaining return problem is a bounded history problem in (4), (7), and (8), with the actual attained histories and the speed-domain condition retained. It is not a two-dimensional ordinary differential equation: the integral clock and source traces still depend on the complete finite angular window.

## The angular clock is not monotone in radial-growth history

There is a precise obstruction to treating the clock as an order-preserving scalar history map. Fix a regular admitted angular history and hold $\chi$ fixed. Perturb $y$ by a test function $\psi$. At fixed lag, differentiating (4) and interchanging the elementary finite integrals gives

$$
D_yG[\psi]=\int_0^\delta K(a)\psi(\theta-a)\,da,
$$

$$
K(a)=\frac{\kappa(\kappa+\cos\delta)}d
-\int_a^\delta\kappa(\xi)\chi(\theta-\xi)\,d\xi.
\tag{11}
$$

At the two ends, using the exact clock equality,

$$
K(0)=-\frac{1+\kappa\cos\delta}{d}<0,
\qquad
K(\delta)=\frac{\kappa(\kappa+\cos\delta)}d>0.
\tag{12}
$$

Continuity therefore gives intervals of opposite sign inside the current and source ends of the sampled window. The implicit lag derivative is

$$
D_y\delta[\psi]=-
\frac{D_yG[\psi]}{\kappa\chi_sD}.
\tag{13}
$$

A nonnegative smooth perturbation supported near the receiving end increases the lag, whereas one supported near the source end decreases it. The supports can avoid the exact endpoints. Thus the clock functional is neither increasing nor decreasing under the ordinary pointwise order on $y$ histories, even at the exact spiral. Both signs include the moving source clock; neither comes from freezing the delay.

This is a statement about the exact geometric clock functional on its regular history chart. It is not a claim that these test variations are the selected perturbation family, nor a proof that every possible order structure for the complete evolution fails. It does show that a simple comparison argument assuming pointwise monotonicity of this clock would be invalid. Any monotone-system or global return theorem would need its actual hypotheses checked for the full functional, including (11)–(13).

## The remaining return or event decision

An attained trajectory that stays in the compact infinite regime has a positive bounded angle rate in logarithmic physical time. A return analysis can therefore use fixed angle advances and the finite window in (4). However, the current proofs identify neither the attained return map's invariant set nor a function that decreases along every nonconstant history. The exact spiral is one equilibrium of this angular equation; uniqueness of the spiral balance does not exclude nonconstant recurrent angular histories.

For example, a periodic angular history, if one were ever proved to be attained, would have to satisfy (10) with a bounded positive $q$. Integrating $d\log q/d\theta=y-q\chi$ over a period would require positive mean $y$. This is a necessary reconstruction condition, not a constructed periodic solution. The current investigation selects no such history and makes no existence claim for it.

The actual branch question remains whether the attained nonlinear exit histories enter a proved inward finite-event region or approach a surviving invariant history of this exact equation. The angular formulation makes that target smaller and explicit while preserving its full history dependence.

## Falsifiers and ownership

Falsifiers are an incorrect time-change factor in (7)–(8), a missing source-velocity term in (5)–(6), failure of the exact spiral equilibrium check, an incorrect integration order or endpoint sign in (11)–(12), or treating a freely prescribed angular history as the admitted complete physical family. All formulas retain numerical $c_f=1$, coefficient one and the sole authorized inverse-distance logarithmic response.

No target computation, new exponent, extra history, receiver response or production solver is introduced. Only this new subject is written. Earlier frozen subjects, independent references and shared owners remain unchanged; no owned computation is active. Independent assessment is required before this formulation is used for a new return-map target.
