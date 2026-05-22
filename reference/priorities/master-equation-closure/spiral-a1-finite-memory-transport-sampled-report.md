# Spiral A1 Finite-Memory Transport Sampled Report

Status. Sampled diagnostic for the first finite-collar A1 retained-memory
transport evaluator. This consumes
[spiral-a1-retained-memory-transport-lemma](spiral-a1-retained-memory-transport-lemma.md)
and the new executable diagnostic
[spiral_a1_finite_memory_transport.py](spiral_a1_finite_memory_transport.py).
It is not an interval certificate and does not certify a nonconstant A1 orbit.

Command:

```bash
/Users/markmorris/vibe/.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-lo -0.02 --theta-hi 0.02 --theta-samples 9 --delta-steps 1024 --integration-panels 128
```

## Profile Tested

The diagnostic uses the retained past-lag polynomial witness for
$Q(\theta)=\omega_\ast/\dot\theta(\theta)$ on the past side and a compact $C^2$
future log-rate extension returning to constant rate at the same memory scale
$\Delta_R=\Delta_{P_3}$. It evaluates the transported root equation
$$
F_{\alpha,Q}(\theta,\Delta)
=
\Lambda_\alpha(\theta,\Delta)
-
\frac{K_Q(\theta,\Delta)}{b_\ast\sigma(\theta)}=0,
$$
with
$$
K_Q(\theta,\Delta)=\int_{\theta-\Delta}^{\theta}Q(\phi)\,d\phi,
\qquad
\sigma(\theta)=\exp(a(1-\cos\theta)).
$$

## Sampled Result

On the sampled collar $[-0.02,0.02]$, the global root scan retained the expected
active count at every sampled $\theta$:
$$
3\ \text{partner roots} + 1\ \text{self root}.
$$
The retained active Jacobian floor stayed positive:
$$
\min |J_{\alpha,Q}|\approx1.5928176272253922.
$$

The force-balance residuals did not remain small off the turn center. The
sampled maximum absolute residuals were
$$
\max |\mathcal R_T|\approx0.0030460301085433322,
\qquad
\max |\mathcal R_R|\approx0.0015619859607697833.
$$
At $\theta=0$, the residuals are near zero at the numerical integration
tolerance:
$$
\mathcal R_T(0)\approx-3.3076796163156175\times10^{-9},
\qquad
\mathcal R_R(0)\approx-1.2009944778956783\times10^{-7}.
$$

## Interpretation

This run separates two issues that were previously bundled together. The
retained-memory witness is not immediately destroyed by sampled off-center root
transport: the same $3+1$ root ledger persists on a small collar and the active
Jacobian floor remains far from zero. The failure is instead force-balance
closure for the particular future extension of $Q$ used by the diagnostic.

The next mathematical target is therefore sharper than "try another profile."
The tangential balance should be treated as a transport equation,
$$
Q'(\theta)
=
2s(\theta)Q(\theta)
-
\frac{Q(\theta)^3}{\Gamma_\ast\sigma(\theta)^3}
T_Q(\theta),
$$
where $s(\theta)=a\sin\theta$. Once this equation determines the local slope of
$Q$ on the transported branch, the radial row becomes the controlled failure
check
$$
\mathcal R_R(\theta)
=
B_Q(\theta)
-
\Gamma(\theta)
\left(s'(\theta)+s(\theta)^2-1-s(\theta)\frac{Q'(\theta)}{Q(\theta)}\right).
$$
A successful A1 continuation needs both residuals to contain zero on one
retained chart. A rejection is meaningful only if it proves that no positive
$C^2$ continuation in a declared function class can satisfy the tangential
transport while preserving the root ledger and radial row.

## Promotion Decision

- Ontology: none added.
- Derivation/closure target: sampled finite-collar transport now reports
  retained $3+1$ roots and a positive Jacobian floor for one nonconstant profile.
- Effective summary: the first sampled obstruction is not root-ledger loss but
  off-turn force-balance residual for the chosen compact $C^2$ extension.
- Speculation: no interval branch certificate, stability claim, or isolated
  orbit closure is promoted.

Promotion decision. Keep this report priority-only as diagnostic evidence.
Promote only the theorem-target formulas and first-order transport lemma into
[master-equation](../../../content/markdown/aaa/dynamics/master-equation.md).
