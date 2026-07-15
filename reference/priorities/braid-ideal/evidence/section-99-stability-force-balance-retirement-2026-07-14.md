# Section 99 Stability And Locking — Force-Balance Precondition Retirement

**Date:** 2026-07-14  
**Disposition:** `t2_stability_locking_void_non_equilibrium`;
`retired_not_rerunnable`; `t1_force_balance_and_charge_rows_survive`;
`priority-only`.

## Verdict

The Section 99 stability and local-locking row is **void by construction** for
every selected photon and electron target. The full-assembly pencil has an
excellent hand-checkable implementation anchor, but none of the target
assemblies passes force balance. An anchor proves that the pencil code returns
the expected answer on its independent equilibrium case; it does not make the
screened Section 99 targets equilibria.

The surviving T1 result is the declared-coverage negative: the tested planar
photon and electron assemblies do not close, while their explicit charge and
pump ledgers remain valid instantaneous facts.

## Mathematical precondition

For each target, define

$$
\mathbf r_0
=
\kappa_\star\mathbf f^{\rm raw}(\mathbf q_0)
-
\mathbf a^{\rm req}(\mathbf q_0).
$$

The local equation contains the inhomogeneous term

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

When $\mathbf r_0\ne\mathbf0$, the homogeneous eigenproblem omits the term that
drives departure from the target. A tangent map along the actual evolved path
would be well-defined; Section 99 instead evaluated a frozen candidate.

## Evidence

**Measured:** the best photon sampling ladder ends at
$\epsilon_{\rm bind}=0.9922225625$. The electron rest target reports
$\epsilon_{\rm bind}=0.9999927135$, and its replay stays within
$3.1\times10^{-7}$ of one. Both are far outside the declared $0.03$ gate.

**Measured:** the independent symmetric-pair anchor reproduces its analytic
frequency to $1.11\times10^{-16}$. This validates the pencil implementation on
that anchor; it does not satisfy the force-balance precondition for the photon
or electron targets.

**Derived:** the recorded phase/pocket saddles and
$\operatorname{Re}\lambda_{\rm lead}$ values do not carry a stability or
locking verdict for the failed targets. The statement that no force-balanced
rest-photon candidate appears in the declared coverage survives; a broader
stable-rest-photon claim does not follow.

**Inferred:** no reader-facing claim is lost. The Section 99 packet classified
its result as priority-only, authorized no retained-history release, and made
no score movement.

## Recovery effect

- Preserve the declared-coverage non-bind, charge, pump-cancellation, causal-root,
  and planarity rows at T1 diagnostic scope.
- Retire the target stability magnitudes and local-locking readings.
- Remove Section 99 from the validated-integrator re-run list. A newly found
  force-balanced planar assembly would create a new well-posed stability row;
  it would not rehabilitate the retired pencil results.

