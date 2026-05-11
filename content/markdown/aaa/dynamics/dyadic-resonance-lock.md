# Dyadic Resonance Lock

This document studies resonance lock for the nested Outer, Middle, and Inner binaries. The goal is to identify the relationship between frequency, tangential speed, and radius under a regime where the middle binary is pinned at the field speed and the three rings form an exact integer phase-locked cycle.

It should be read together with [Binary Dynamics](binary-dynamics.md), [Tri-Binary Dynamics](tri-binary-dynamics.md), [Mapping the Planck Scale](../theory-bridges/planck-scale-tri-binary-alignment.md), and [Noether Core](../assemblies/noether-core.md), which provide the assembly geometry and scale-setting context for the lock relations derived here.

We work with branch labels $k\in\{O,M,I\}$.

## Status and Assumptions

The logic of this note is organized around one exact identity and four explicit assumptions.

### Exact Kinematic Identity

For each ring,
$$
v_k = 2\pi f_k r_k = \beta_k c_f,
\qquad
0<\beta_k,
\qquad
c_f>0.
$$

Equivalently,
$$
f_k=\frac{v_k}{2\pi r_k},
\qquad
r_k=\frac{v_k}{2\pi f_k},
\qquad
v_k=2\pi f_k r_k.
$$

Plain language: for any one ring, if we know any two of frequency, tangential speed, and radius, then the third is fixed.

This identity is exact. It is not an assumption.

### Assumption 1 (Middle-Pinned Closure)

Outside the black-hole event horizon, and in the horizon-transition regime itself, the middle binary is pinned at the field speed:
$$
v_M=c_f,
\qquad
\beta_M=1.
$$

This is the main regime assumption of the document.

### Assumption 2 (Exact Integer Phase Closure)

Let the outer period be $T_O=\frac{1}{f_O}$. Assume that when the outer ring completes one full cycle, the middle and inner rings also land exactly at the beginning of their own cycles. Equivalently, there exist integers
$$
m,n\in\mathbb{N},
\qquad
1<m<n,
$$
such that
$$
\theta_O(t+T_O)=\theta_O(t)+2\pi,
$$
$$
\theta_M(t+T_O)=\theta_M(t)+2\pi m,
$$
$$
\theta_I(t+T_O)=\theta_I(t)+2\pi n.
$$

Therefore $f_O:f_M:f_I = 1:m:n$, with $f_M=m f_O$ and $f_I=n f_O$.

Plain language: after one outer revolution, the middle and inner rings have completed whole numbers of revolutions as well, so the three-ring pattern closes exactly.

### Assumption 3 (Fixed Relative Phase Lock)

The lock is not just commensurate in frequency. It also carries fixed relative phase offsets over time. One convenient formulation is
$$
\phi_{MO}(t)\equiv \theta_M(t)-m\theta_O(t)=\phi_{MO}^\ast,
$$
$$
\phi_{IO}(t)\equiv \theta_I(t)-n\theta_O(t)=\phi_{IO}^\ast,
$$
with constants $\phi_{MO}^\ast,\phi_{IO}^\ast$.

Plain language: the rings keep the same timing relationship cycle after cycle rather than drifting through one another.

### Assumption 4 (Cancellation Selection Principle)

Among the admissible integer locks $(1:m:n)$, the physically selected lock is assumed to be the one that yields the strongest cycle-averaged cancellation of the relevant low-order far-field or effective potential signal.

This is a selection principle, not yet a theorem. Its role is to explain why one exact integer lock might be preferred over nearby commensurate alternatives.

### Non-Assumptions

This document does **not** assume:

- common-speed closure $v_O=v_M=v_I$,
- self-similar radii $r_M=r_O/s$, $r_I=r_O/s^2$,
- or the specific frequency lock $1:2:4$ at the outset.

Those are possible special cases or later outcomes, not starting axioms here.

## Immediate Consequences

From Assumptions 1-2 and the exact identity, the middle radius is fixed by the outer frequency:
$$
r_M=\frac{c_f}{2\pi f_M}
=
\frac{c_f}{2\pi m f_O}.
$$

For the outer ring,
$$
r_O=\frac{v_O}{2\pi f_O}
=
\frac{\beta_O c_f}{2\pi f_O}.
$$
Hence
$$
\frac{r_M}{r_O}
=
\frac{1}{m\beta_O},
\qquad
r_M=\frac{r_O}{m\beta_O}.
$$

For the inner ring,
$$
r_I=\frac{v_I}{2\pi f_I}
=
\frac{\beta_I c_f}{2\pi n f_O},
$$
so
$$
\frac{r_I}{r_O}
=
\frac{\beta_I}{n\beta_O},
\qquad
r_I=\frac{\beta_I}{n\beta_O}\,r_O.
$$

These are the core radius relations of the note:
$$
r_M=\frac{r_O}{m\beta_O},
\qquad
r_I=\frac{\beta_I}{n\beta_O}\,r_O.
$$

They show that once the integer lock $(1:m:n)$ is fixed, the remaining geometry depends on the outer and inner speed factors $\beta_O$ and $\beta_I$.

## Proposition 1 (Exterior Integer Lock Formulas)

Under Assumptions 1-2,
$$
f_O:f_M:f_I = 1:m:n,
$$
and
$$
r_O:r_M:r_I
=
1:\frac{1}{m\beta_O}:\frac{\beta_I}{n\beta_O}.
$$

**Proof.** The frequency ratio is exactly Assumption 2. The radius ratios follow from
$$
r_k=\frac{\beta_k c_f}{2\pi f_k}
$$
together with $\beta_M=1$, $f_M=m f_O$, and $f_I=n f_O$. $\square$

The geometry is controlled by integer phase closure plus the middle-pinned condition.

## Could $1{:}2{:}4$ Be a Solution?

If one later chooses the dyadic integers
$$
m=2,
\qquad
n=4,
$$
then
$$
f_O:f_M:f_I = 1:2:4,
$$
but the radius ratios become
$$
r_O:r_M:r_I
=
1:\frac{1}{2\beta_O}:\frac{\beta_I}{4\beta_O}.
$$

So the dyadic frequency lock is a viable candidate pattern, but it does **not** by itself imply equal-speed geometry, and it does **not** by itself imply a self-similar radius law unless further assumptions are added.

## What Exact Periodicity Gives, and What It Does Not

Exact periodicity naturally supports rational or integer commensurability, but it does not by itself choose the integers $m,n$.

What exact lock gives:

- outer, middle, and inner frequencies lie on a commensurate lattice,
- the three-ring configuration repeats after one outer period,
- fixed relative phases become meaningful dynamical observables.

What exact lock does not give by itself:

- that the preferred lock is dyadic,
- that the branch speeds are equal,
- that the radii are self-similar,
- or that cancellation is actually maximal for one specific integer pair $(m,n)$.

The cancellation principle is the extra ingredient intended to select among the many admissible integer locks.

## Interpreting the Cancellation Principle

The motivation for Assumption 4 is that a cycle-closing integer lock can support persistent superposition over repeated outer periods. If the phase organization is favorable, the low-order far-field or potential contribution can cancel more effectively over one full return cycle.

In that sense, the selection principle is closer to a resonance-and-superposition argument than to a bare numerology of integer ratios. The intuition is that a physically preferred lock should make the assembly as stealthy or self-canceling as possible subject to the delayed dynamics.

This does not yet prove which pair $(m,n)$ wins. It states the criterion that the reduced model should test.

## Reduced-Theorem Target

The right theorem target is not "prove $1:2:4$ from kinematics alone." The stronger target is:

1. classify the admissible integer locks $(1:m:n)$ under exact delayed phase closure,
2. compute the corresponding radius relations under $\beta_M=1$,
3. define a cycle-averaged cancellation functional for the low-order field or effective potential,
4. and determine which integer lock minimizes that functional in the exterior/horizon regime.

If the minimizer turns out to be $(1,2,4)$, then the dyadic hierarchy would be a derived selection result rather than a starting assumption.

## Ancillary Symmetry Check

The older $\mathbb{Z}_3$ dipole-cancellation identity can still be kept as a separate symmetry test:
$$
1+e^{i2\pi/3}+e^{i4\pi/3}=0.
$$

That identity may help characterize a radiative-stealth phase arrangement of an already-formed lock, but it should not be confused with the frequency-selection assumptions above.

For neighboring closure problems, see [Planar Bridge Closure](../proof-programs/planar-bridge-closure.md) and [Horizon Chirality](../spacetime/horizon-chirality.md).
