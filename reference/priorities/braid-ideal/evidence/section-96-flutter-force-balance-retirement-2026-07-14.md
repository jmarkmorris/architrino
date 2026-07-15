# Section 96 Flutter — Force-Balance Precondition Retirement

**Date:** 2026-07-14
**Disposition:** `t2_flutter_void_non_equilibrium`; `retired_not_rerunnable`;
`t1_force_balance_rows_survive`; `priority-only`.

## Verdict

The Section 96 flutter row is **void by construction**. The selected moving
stacked-rings configuration fails its own force-balance gate, so the reported
zero-tilt pencil does not linearize about an equilibrium or about an evolved
trajectory. It must not be re-run as a stability claim.

The surviving result is T1: the declared stacked-rings family realizes its
Mach phase match, but the complete delayed-force record does not close and is
not pump-free.

## Mathematical precondition

Let the candidate's force-balance residual be

$$
\mathbf r_0
=
\kappa_\star\mathbf f^{\rm raw}(\mathbf q_0)
-
\mathbf a^{\rm req}(\mathbf q_0).
$$

Writing $\mathbf q=\mathbf q_0+\delta\mathbf q$ gives, to first order,

$$
M\,\delta\ddot{\mathbf q}
=
\mathbf r_0
+
K\,\delta\mathbf q
+
D\,\delta\dot{\mathbf q}
+
O(\lVert\delta\mathbf q\rVert^2).
$$

The homogeneous pencil drops $\mathbf r_0$. Its eigenvalues characterize
perturbations about the candidate only when $\mathbf r_0=\mathbf0$, or when the
linearization is instead taken along the actual non-equilibrium trajectory.
Section 96 did neither.

## Evidence

**Measured:** the selected row reports

$$
\epsilon_{\rm bind}=0.0492298548241>0.03,
$$

with residual vector

$$
\mathbf R=(0.06849450,-0.02235171,-0.02879827)
$$

and pump $\tau_z=+13.37621958$. The live owner suite
`tests/braid-ideal-moving-phase-matched-stacked-rings-braid.test.js` passes and
reproduces the declared diagnostic.

**Derived:** because the bind gate fails, the candidate is not a solution of
the required circular-motion equation. The recorded
$\lambda_{\rm flutter}=0.73541518+0.99659531i$ therefore has no stability
referent, regardless of its numerical anchoring or sign.

**Inferred:** retiring this T2 row costs no accepted corpus result. The Section
96 packet was priority-only and explicitly authorized no retained-history
release or score movement.

## Recovery effect

- Preserve the Mach phase-match geometry, force-balance residual, pump, and
  non-bind verdict as T1 diagnostic facts.
- Retire the flutter magnitude and every stable/unstable reading of the same
  non-equilibrium target.
- Remove Section 96 from the validated-integrator re-run list. A future search
  may define a new force-balanced stacked-rings candidate, but that would be a
  new row rather than a rehabilitation of this pencil.
