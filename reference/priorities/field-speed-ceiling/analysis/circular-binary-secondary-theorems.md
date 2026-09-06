# Circular-Binary Secondary Theorems

**Packet identifier:** `fsc_circular_binary_secondary_theorems/v1` **Priority object:** FSC-015 **Status:** completed conditional theorem bundle **Claim level:** derived statements inside the proposed closed path-speed-domain model **Source chart:** [Field-Speed Ceiling: Mathematics, Geometry, and Dynamical System](../mathematics-geometry-dynamical-system.md) **Primary certificate:** [Circular Binary All-Root Certificate](circular-binary-all-root-certificate.md)

This packet proves or disposes five secondary questions about the prescribed two-label circular family. Every native numerical illustration uses $c_f=1$. The theorems are conditional on the proposed constrained-response law and the declared all-past prescribed histories. They establish no coupled delayed-history solution, capture, retention, perturbation stability, conservation law, action unit, physical binary, or adoption of a path-speed ceiling.

## Common chart

Let two persistent opposite-polarity labels follow the all-past antipodal circular paths

$$
\mathbf X_1(T)=R\mathbf e_r(T),
\qquad
\mathbf X_2(T)=-R\mathbf e_r(T),
$$

with $R>0$, angular speed $|\omega|>0$, path speed $w=R|\omega|$, and $0<w\le c_f$. Put

$$
\mu=\frac{w}{c_f}\in(0,1],
\qquad
\xi_\mu=\frac{|\omega|\Delta}{2}.
$$

The unique positive partner root obeys

$$
F_\mu(\xi_\mu)=0,
\qquad
F_\mu(\xi)=\xi-\mu\cos\xi,
\qquad
0<\xi_\mu<\mu\le1<\frac\pi2.
$$

The complete two-label ordinary ledger has one partner row per receiver and no positive-delay self row. Its velocity-parallel component has the strictly positive sign

$$
a_\theta
=
\frac{K\sin\xi_\mu}
{4R^2\cos^2\xi_\mu(1+\mu\sin\xi_\mu)}
>0,
\qquad
K=\kappa|q_1q_2|>0.
$$

Plainly: causal delay leans the attractive partner contribution forward along the motion. That sign is the key to both the interior-circle exclusion and the unique boundary radius.

## Theorem 1 — Uniform two-label circles are boundary-only

Let the proposed path-speed ceiling be $c_a\le c_f$. No prescribed all-past antipodal two-label uniform circle with $0<w<c_a$ satisfies the proposed constrained equation.

### Proof

Strictly inside the velocity ball, the proposed response is the identity. The prescribed circular path acceleration is purely inward and has zero velocity-parallel component. The complete raw partner ledger instead has $a_\theta>0$ because $0<\xi_{w/c_f}<\pi/2$. No other ordinary row exists in the two-label chart. Therefore the raw acceleration cannot equal the prescribed circular acceleration. This contradiction excludes every interior-speed uniform circle in the declared class. $\square$

At $w=c_a$, the proposed boundary response removes the completed positive parallel component. Radial matching then selects the unique compatible radius already proved in the primary certificate. Thus “boundary-only” is a conditional theorem, not a chosen restriction of the circular search.

**Falsifier:** an all-past antipodal two-label uniform circle with $0<w<c_a\le c_f$, the declared complete root census, and zero pointwise residual under the unprojected regular Master Equation.

Plainly: below the proposed ceiling, nothing removes the forward slant caused by delay, so a perfectly steady circle cannot close. On the boundary the proposed response can remove that slant, after which the inward magnitude selects one radius.

## Theorem 2 — The rigid uniformly translating boundary-circle exclusion is class-complete

Consider a rigidly rotating antipodal pair whose midpoint translates uniformly with constant vector $\mathbf u$. Write the two velocities as

$$
\mathbf V_\pm(T)
=
\mathbf u\pm v\mathbf e_\theta(T),
\qquad
v=R|\omega|>0,
$$

where $\mathbf e_\theta(T)$ runs around the rotation plane. Both labels have constant path speed for every $T$ if and only if $\mathbf u$ is orthogonal to that plane.

### Proof of exhaustiveness

For either label,

$$
\|\mathbf V_\pm(T)\|^2
=
\|\mathbf u\|^2+v^2
\pm2v\,\mathbf u\mathbin{\cdot}\mathbf e_\theta(T).
$$

The last scalar is constant through a full revolution only when the in-plane component of $\mathbf u$ vanishes. Conversely, an orthogonal $\mathbf u$ makes both squared speeds equal to $\|\mathbf u\|^2+v^2$. $\square$

Choose the translation-axis orientation so that $u=\|\mathbf u\|>0$. On the constant-boundary-speed chart,

$$
u^2+v^2=c_f^2.
$$

The complete helical root census has the unique Dottie partner root and no self root. Its proposed-response axial component is strictly negative for every $u>0$:

$$
\left(\mathbf A_{12}^{\mathrm{eff}}\right)_z
=
-\frac{Cu}{c_f}
-
\frac{u}{c_f^2}
\max\!\left\{
\frac{C}{c_f}(v^2\sin D-u^2),0
\right\}
<0,
$$

where $C>0$ and $D=\cos D$. Uniform midpoint translation requires zero axial path acceleration, so no $u>0$ member closes. Since the exhaustiveness lemma proves that every rigid uniformly translating constant-speed circular chart must use this orthogonal-axis form, the nontranslating member $u=0$ is the only compatible chart in the entire declared class.

This conclusion does not cover nonuniform midpoint motion, time-varying radius or cadence, added labels, another event law, or another response law.

**Falsifier:** either a nonzero in-plane uniform translation that leaves both label speeds constant through a full turn, or an orthogonally translating $u>0$ member with zero axial residual under the same complete ledger and proposed response.

Plainly: sliding the spinning pair within its own plane makes each label alternately speed up and slow down. Axial sliding is the only constant-speed translation, and its delayed partner contribution always slows that translation. That exhausts the rigid uniform-translation class.

## Theorem 3 — Small-$\lambda$ expansion of the compatible-radius family

For the boundary-speed family, put

$$
\lambda=\frac{c_a}{c_f}\in(0,1],
\qquad
\xi_\lambda=\lambda\cos\xi_\lambda.
$$

The implicit-function theorem applies at $(\lambda,\xi)=(0,0)$ because

$$
\partial_\xi(\xi-\lambda\cos\xi)\big|_{(0,0)}=1.
$$

The root is therefore analytic near zero. Coefficient matching gives

$$
\xi_\lambda
=
\lambda
-\frac12\lambda^3
+\frac{13}{24}\lambda^5
+O(\lambda^7).
$$

Consequently,

$$
\cos\xi_\lambda
\left(1+\lambda\sin\xi_\lambda\right)
=
1+\frac12\lambda^2-\frac58\lambda^4+O(\lambda^6),
$$

and the exact compatible-radius formula yields

$$
\boxed{
R_{\ast,\lambda}
=
\frac{K}{4c_a^2}
\left(
1-\frac12\lambda^2+\frac78\lambda^4+O(\lambda^6)
\right).
}
$$

The leading term is the zero-delay inverse-square circular balance for this prescribed low-speed limit. It is a limit of the conditional chart, not an import of a force law and not a claim that any architrino has mass.

A direct normalized diagnostic of the dimensionless factor $4c_a^2R_{\ast,\lambda}/K$ gave errors divided by $\lambda^6$ of approximately $-1.67$, $-1.67$, $-1.64$, and $-1.55$ at $\lambda=0.025,0.05,0.1,0.2$, consistent with the proved $O(\lambda^6)$ remainder. The series proof, not that diagnostic, establishes the order.

**Falsifier:** a Taylor expansion of the same implicit root and exact radius formula with a different coefficient through $\lambda^4$, or a normalized remainder that fails to be $O(\lambda^6)$ as $\lambda\downarrow0$.

Plainly: when path speed is small compared with wake speed, delay changes the compatible radius only at second order. The fourth-order term is also fixed; neither coefficient is fitted.

## Theorem 4 — Chord-exchange symmetry forces $D_t=D_r$

At a regular root from transmitter event $(j,S)$ to receiver event $(i,T)$, let

$$
D_t=c_f-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_j(S),
\qquad
D_r=c_f-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_i(T).
$$

Suppose the declared history has an isometry-and-time-reversal involution whose orthogonal spatial part $Q$ exchanges the two endpoint germs and reverses the chord:

$$
Q\hat{\mathbf r}=-\hat{\mathbf r},
\qquad
Q\mathbf V_j(S)=-\mathbf V_i(T).
$$

Orthogonality of $Q$ then gives

$$
\hat{\mathbf r}\mathbin{\cdot}\mathbf V_j(S)
=
(Q\hat{\mathbf r})\mathbin{\cdot}(Q\mathbf V_j(S))
=
\hat{\mathbf r}\mathbin{\cdot}\mathbf V_i(T),
$$

and hence $D_t=D_r$.

The planar circular family satisfies this identity directly:

$$
D_t=D_r=c_f(1+\lambda\sin\xi_\lambda).
$$

The orthogonally translating helical family also satisfies it:

$$
D_t=D_r=\frac{v^2}{c_f}(1+\sin D).
$$

Equality is therefore a necessary diagnostic for a chart that claims this exact chord-exchange symmetry. It is not sufficient to prove the symmetry: two factors can agree accidentally. Unequal radii, unequal speeds, or a history lacking the endpoint-exchange involution need not satisfy the diagnostic.

**Falsifier:** a correctly transformed regular root on a chart satisfying the two displayed involution identities but having $D_t\ne D_r$.

Plainly: if exchanging emission and reception leaves the prescribed history unchanged after reversing the chord and time direction, the two root-slope factors must match. A mismatch immediately disproves that claimed symmetry or exposes an upstream calculation error.

## Theorem 5 — Conditioning and interval-Newton-ready form

For every $\lambda\in(0,1]$, take the initial interval $X_\lambda=[0,\lambda]$ and midpoint $m=\lambda/2$. The scalar root function satisfies

$$
F_\lambda(0)=-\lambda<0,
\qquad
F_\lambda(\lambda)=\lambda(1-\cos\lambda)>0,
$$

and

$$
F_\lambda'(\xi)=1+\lambda\sin\xi
\in
[1,1+\lambda\sin\lambda]
\subset[1,1+\sin1].
$$

Thus the root is unique, the Jacobian has the uniform hard floor one, and the exact interval-Newton operator

$$
N_\lambda(X_\lambda)
=
m-
\frac{F_\lambda(m)}{F_\lambda'(X_\lambda)}
$$

is directly evaluable with outward-rounded interval arithmetic. Put $q=-F_\lambda(m)>0$. The derivative interval has the form $[1,b]$ with $b\ge1$, so

$$
N_\lambda(X_\lambda)
=
\left[m+\frac qb,m+q\right]
\subset
\left(0,\lambda\right),
$$

because $m+q=\lambda\cos(\lambda/2)<\lambda$. Hence the exact first interval-Newton image lies strictly inside $X_\lambda$ and certifies existence and uniqueness. A directed-rounding implementation must verify the same strict inclusion at its declared precision; subsequent outward-rounded iterations can contract the enclosure to the requested width.

Implicit differentiation gives the parameter sensitivity

$$
0<
\frac{d\xi_\lambda}{d\lambda}
=
\frac{\cos\xi_\lambda}
{1+\lambda\sin\xi_\lambda}
<1.
$$

The circular-chart root factors obey the uniform bounds

$$
c_f
<
D_t=D_r
\le
c_f(1+\sin D),
\qquad
D=\cos D.
$$

Therefore the scalar circular-root family has neither a small Jacobian nor a small $D_t$ or $D_r$ denominator. The equality endpoint $\lambda=1$ remains an event-stratum boundary for other histories, so these chart-specific floors must not be generalized to the mirror or frozen-root chart.

For whole-family validated evaluation, the inverse parameterization

$$
\lambda(\xi)=\frac{\xi}{\cos\xi},
\qquad
0<\xi\le D,
$$

is a strictly increasing analytic bijection, and

$$
c_a(\xi)=c_f\frac{\xi}{\cos\xi},
\qquad
R_\ast(\xi)
=
\frac{K\cos\xi}
{4c_f^2\xi^2(1+\xi\tan\xi)}.
$$

These forms require no repeated transcendental root solve and are ready for directed-rounding interval sweeps on any compact subinterval of $(0,D]$.

**Falsifier:** a $\lambda\in(0,1]$ for which the declared interval-Newton image is not strictly contained in $(0,\lambda)$, the root derivative is zero or negative, the sensitivity reaches one, or the circular-chart $D_t$ or $D_r$ falls outside the stated bounds.

Plainly: the scalar circular-root problem is uniformly well behaved. Its derivative never becomes small, one certified interval step already isolates the unique root, and the whole family can alternatively be parameterized by the root angle so no repeated solving is needed.

## Helix degeneration diagnostic

Although not needed for class-completeness, the helical family supplies a useful boundary check. At fixed $R$ and normalized $c_f=1$, let $v=\sqrt{1-u^2}$. Then

$$
r=\frac{2DR}{v},
\qquad
D_t=D_r=v^2(1+\sin D),
$$

so

$$
r^2D_t=4D^2R^2(1+\sin D)
$$

is independent of $u$. Direct evaluation at $u=0.25,0.6,0.9,0.99$ reproduced one common value to binary64 display precision for $R=0.7$. As $u\uparrow1$, the root factors vanish quadratically while the partner-row magnitude stays finite. This is a diagnostic bridge to the frozen stratum, not an event measure or continuation result.

Plainly: the helix becomes poorly transverse as its axial speed approaches wake speed, but its partner contribution does not fade away. That is why the negative axial residual has no near-boundary escape within this family.

## Completion and claim boundary

FSC-015 is complete because every named subclaim has an explicit theorem or bounded diagnostic, proof, claim grade, and falsifier:

1. uniform circles are boundary-only in the two-label class;
2. the orthogonal-axis helix exclusion exhausts rigid uniformly translating constant-boundary-speed circular pairs;
3. the compatible radius has the displayed small-$\lambda$ expansion;
4. $D_t=D_r$ is a necessary chord-exchange-symmetry diagnostic on the declared symmetric charts; and
5. the general-$\lambda$ root family has a uniform conditioning statement, an exact strict interval-Newton enclosure with a directed-rounding verification obligation, a sensitivity bound, and an explicit root-angle parameterization.

Nothing here establishes the coupled delayed evolution, perturbation stability, capture, conservation, an action ledger, a physical binary, or a field-speed ceiling. The source manuscript remains the proposed-model owner; this packet supplies focused conditional theorems only.

Closure goal: use these closed circular-chart results only after a regular retained-history phase space and local coupled existence theorem make the prescribed binary a solution object rather than a residual-zero path.
