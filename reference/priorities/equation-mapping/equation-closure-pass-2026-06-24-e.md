# Equation Closure Pass 2026-06-24 E

## Scope

This pass integrates the constant-delay action-period review response. It does not raise any equation scores.

The main correction is sharp: the scalar constant-delay Hopf orbit is not a plausible source of a physical action unit by itself. It remains useful, but its role changes from candidate source to falsifier and scaffold.

## Corrected Claim Level

The scalar Hopf branch has a relatively rigid period and a soft action. Near a Hopf birth,

$$
T
=
\frac{2\pi}{\Omega_c}
+O(|\eta-\eta_c|),
\qquad
A^2
\propto
\frac{\eta-\eta_c}{-\ell_1},
$$

so the phase-area proxy scales as

$$
h_\Phi
=
\oint p\,dq
\sim
\pi \Omega_c A^2.
$$

Unless another row pins amplitude to frequency, $h_\Phi$ varies continuously along the Hopf branch. A continuously tunable action area is not a quantum unit. Therefore the constant-delay retained-orbit certificate is retained as a fail-closed structural checker and scalar counterexample harness, not as sufficient evidence for $h$.

## Revised Positive Target

The positive `EQ-12A` route is now a locked three-binary action-unit theorem target. The strongest current candidate is the iso-frequency row set:

$$
(f_1,f_2,f_3)=(f,f,f),
\qquad
\omega_1=\omega_2=\omega_3=\omega_f,
$$

with retained phase offsets, a middle-binary speed-pinning row

$$
s_M=\rho_M\omega_f=c_f,
$$

and an angular-momentum momentum-map row

$$
J=\sum_a m_a\rho_a^2\omega_f.
$$

The integer carrier is the winding or rotation number on a mode-locking plateau. The target is:

$$
h_E
=
h_\Phi
=
h_p
=
h_J
=
h_\vartheta
$$

inside a stable locked branch, with visible splitting at the tongue or resonance boundary.

## Solver Target

The next solver output should be one same-parameter sweep over a candidate coupling or branch parameter $K$:

1. winding or rotation number $n(K)$, showing a flat integer plateau;
2. the four readouts $h_E$, $h_\Phi$, $h_p$, and $h_J$, coincident on the plateau and splitting at its edge;
3. Floquet stability margin

$$
1-\max_{z\ne1}|z|
$$

remaining positive on the plateau.

The scalar continuation remains the first falsifier:

$$
\frac{d}{d\eta}
\left(\oint p\,dq\right)
\ne0
\quad
\text{while}
\quad
\frac{d\Omega}{d\eta}
\approx0
$$

disqualifies the scalar Hopf orbit as a unit source and justifies the move to three-binary symmetry/locking.

## Score Disposition

No score changes follow from this pass. `EQ-12A` remains at `2`.

The first blocker remains accepted retained evidence, but the interpretation changes:

- the constant-delay checker is a scaffold and falsifier;
- the positive route is a symmetry-stabilized iso-frequency Noether braid branch;
- score movement requires solver-generated plateau evidence, four-readout coincidence, and positive Floquet margin on the same retained branch.

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: promotion waits for either the scalar counterexample result or a retained locked Noether braid branch whose winding, action readouts, and Floquet margin are produced from one same branch record.
