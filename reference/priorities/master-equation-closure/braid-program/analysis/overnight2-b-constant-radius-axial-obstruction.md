# Axial period obstruction for slow spatial histories at constant radius

## Question and result

Claim grade: derived, pending independent adjudication. The [tangential mean condition](overnight2-b-independent-slow-mean.md) leaves one leading-order compatibility height near $0.818438$ for a pure sinusoidal height oscillation. Does that height permit a slow exact history when the planar radius stays constant? The axial equation supplies another necessary identity which excludes this possibility. More generally it excludes every fixed nonconstant periodic height profile at constant radius in the sufficiently slow limit.

Use the unchanged canonical equation with $K=c_f=1$ and all ordinary positive-delay partner and self roots. For $r_0>0$, $R>0$, $\tau=t/R$, $\phi=\epsilon k\tau$, fixed $b,k>0$, and real $C^2$, $2\pi$-periodic functions $p,\zeta$, prescribe

$$
X_j(t)=R\big(r_0\cos[\epsilon b\tau+j\pi/3+p(\phi)],
r_0\sin[\epsilon b\tau+j\pi/3+p(\phi)],(-1)^j\zeta(\phi)\big).
$$

Assume $\zeta$ is nonconstant. Then there exists $\epsilon_0>0$ such that no such prescribed history with $0<\epsilon<\epsilon_0$, at any $R>0$, is an exact canonical solution. Arbitrary finite height amplitude and arbitrary fixed periodic phase modulation are allowed. For bounded families with a common positive radius floor, bounded profiles/rates and two derivatives, $k$ bounded away from zero, and $\langle(\zeta')^2\rangle$ bounded away from zero, the exclusion has a common positive threshold. No numerical threshold is asserted here. The paths are not assumed to be equilibria, and no stability spectrum is used.

## Exact axial identity and instantaneous term

Let $A_z$ denote dimensionless canonical axial acceleration, so the physical acceleration is $A_z/R^2$. Exact balance requires $A_z=R\epsilon^2k^2\zeta''$. Multiplication by $\zeta'$ and phase averaging yields

$$
\langle\zeta'A_z\rangle
=R\epsilon^2k^2\langle\zeta'\zeta''\rangle=0.
$$

The last integral is the period integral of $((\zeta')^2)'/2$. This is a direct consequence of the acceleration equation, not an imported energy-conservation premise.

For sufficiently small $\epsilon$, the complete source speed is below one. The all-past monotonic-gap theorem gives one root in each of the five partner channels, no positive self roots and a positive divisor floor. Thus the independently checked first-order canonical row applies uniformly:

$$
A_{i\leftarrow j}
=\sigma\frac{Q_0}{s^3}
+\frac{\epsilon\sigma}{s^2}
\{V_1-2n(n\cdot V_1)\}+O(\epsilon^2),
\quad \sigma=(-1)^j,\quad n=Q_0/s.
$$

Here $Q_0$ is the simultaneous dimensionless separation, $s=|Q_0|>0$, and $\epsilon V_1$ is simultaneous source velocity. The uniform remainder needs only $C^2$ profiles, using the separate position and delayed-velocity estimates in the independent proof.

At zero order, same-polarity sources have no axial separation and opposite-polarity sources have axial separation $2\zeta$. Direct summation gives

$$
A_z^{(0)}=F(\zeta)
=-\frac{4\zeta}{(r_0^2+4\zeta^2)^{3/2}}
-\frac{\zeta}{4(r_0^2+\zeta^2)^{3/2}}.
$$

This is a smooth single-variable function because $r_0>0$. Hence $\langle\zeta'F(\zeta)\rangle=0$ for every periodic height profile, by taking a primitive of $F$ and integrating its total phase derivative. No assumption that the instantaneous prescribed path solves an equation is needed.

## First-order axial coefficient

For $\alpha=j\pi/3$ and $h=\zeta/r_0$,

$$
Q_0=(r_0(1-\cos\alpha),-r_0\sin\alpha,(1-\sigma)\zeta),
\quad s^2=2r_0^2(1-\cos\alpha)+(1-\sigma)^2\zeta^2.
$$

Write $\omega=b+kp'$. Source velocity is

$$
V_1=(-r_0\omega\sin\alpha,r_0\omega\cos\alpha,\sigma k\zeta').
$$

The angular contribution to the axial row is odd in $\sin\alpha$, so channels $j$ and $6-j$ cancel it exactly. The diametric channel has zero such term. The surviving vertical part gives

$$
\frac{A_z^{(1)}}{k\zeta'}
=\sum_{j=1}^5\left[\frac{1}{s_j^2}
+\frac{2\sigma_j(1-\sigma_j)^2\zeta^2}{s_j^4}\right]
=\frac{S(h)}{r_0^2},
$$

$$
S(h)=\frac{2(1-4h^2)}{(1+4h^2)^2}
+\frac23+\frac{1-h^2}{4(1+h^2)^2}.
$$

The equality is interpreted coefficientwise when $\zeta'=0$. The neighboring opposite-polarity pair gives the first term; the same-polarity pair gives $2/3$; the diametric opposite-polarity source gives the last term. Every partner is retained. In particular, phase modulation cannot change this first-order axial coefficient through the angular velocity.

## Uniform positivity and contradiction

For every $x\ge0$,

$$
\frac{1-x}{(1+x)^2}\ge-\frac18,
$$

because adding $1/8$ gives $(x-3)^2/[8(1+x)^2]$. Apply this once with $x=4h^2$ and once with $x=h^2$. The complete coefficient therefore has the global floor

$$
S(h)\ge-\frac14+\frac23-\frac1{32}=\frac{37}{96}>0
\qquad(h\in\mathbb R).
$$

Combining the expansion with the two period identities gives

$$
\langle\zeta'A_z\rangle
=\epsilon\frac{k}{r_0^2}\langle S(\zeta/r_0)(\zeta')^2\rangle+O(\epsilon^2)
\ge\epsilon\frac{37k}{96r_0^2}\langle(\zeta')^2\rangle-O(\epsilon^2).
$$

A nonconstant $C^2$ periodic function has strictly positive $\langle(\zeta')^2\rangle$. Consequently the first-order term is positive and dominates the uniform quadratic error for sufficiently small positive $\epsilon$, contradicting exact axial balance. The argument is independent of $R$, so a fitted scale diverging as speed decreases cannot evade it.

For $\zeta=H\cos\phi$ with $H>0$, the first-order axial period average is at least $37kH^2/(192r_0^2)$. This holds at the tangential compatibility height too. The tangential zero is therefore not a surviving slow exact reference in the constant-radius class. The exclusion is preparation-scoped: radial modulation, profiles changing without uniform derivative control, shrinking height amplitude, rates approaching zero relative to the chosen scaling, or finite speeds outside a justified threshold require separate analysis.

## Verification and next deciding question

This is a new analytical subject, not yet independently reviewed. Its key claims can be overturned by an incorrect canonical first-order row, a surviving angular contribution to the axial pair sum, a wrong coefficient in $F$ or $S$, failure of the rational positivity identity, or an exact slow family satisfying all stated hypotheses. A numerical residual or finite observation window alone does not resolve the theorem.

The next deciding question is whether coupled radial motion can satisfy both the full-vector equation and the period identities. The higher-harmonic search permits that coupling. This theorem narrows the shape mechanism a solution would need; it does not exclude the whole radius/phase/height class. The receiving owner is the second-allocation report, and the shared corpus and ledgers remain read-only.

