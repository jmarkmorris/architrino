# Spiral A1 Finite-Memory Transport Sampled Report

Status. Sampled diagnostic for the finite-collar A1 retained-memory transport
evaluator. This consumes
[spiral-a1-retained-memory-transport-lemma](spiral-a1-retained-memory-transport-lemma.md)
and the executable diagnostic
[spiral_a1_finite_memory_transport.py](spiral_a1_finite_memory_transport.py).
It is not an interval certificate and does not certify a nonconstant A1 orbit.

Compact $C^2$ baseline command:

```bash
/Users/markmorris/vibe/.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-lo -0.02 --theta-hi 0.02 --theta-samples 9 --delta-steps 1024 --integration-panels 128 --profile-mode compact_c2
```

Tangential-transport future-collar command:

```bash
/Users/markmorris/vibe/.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-lo 0 --theta-hi 0.02 --theta-samples 9 --delta-steps 1024 --integration-panels 128 --profile-mode tangential_transport --transport-steps 160
```

## Profiles Tested

The compact baseline uses the retained past-lag polynomial witness for
$Q(\theta)=\omega_\ast/\dot\theta(\theta)$ on the past side and a compact $C^2$
future log-rate extension returning to constant rate at the same memory scale
$\Delta_R=\Delta_{P_3}$. Both modes evaluate the transported root equation
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

The tangential-transport mode instead solves the one-sided future equation
$$
Q'(\theta)
=
2s(\theta)Q(\theta)
-
\frac{Q(\theta)^3}{\Gamma_\ast\sigma(\theta)^3}T_Q(\theta),
\qquad
s(\theta)=a\sin\theta,
$$
by a sampled method of steps from $Q(0)=1$. The retained roots and $T_Q$ are
recomputed against the current transported $Q$ history at every step.

## Sampled Results

### Compact $C^2$ Baseline

On the sampled collar $[-0.02,0.02]$, the compact baseline retained the expected
active count at every sampled $\theta$,
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

### Tangential-Transport Future Collar

On the sampled future collar $[0,0.02]$, the tangential-transport profile also
retained the expected $3+1$ active root count at every sampled $\theta$, with
$$
\min |J_{\alpha,Q}|\approx1.5990327127652662.
$$
The imposed tangential row closed at sampled precision:
$$
\max |\mathcal R_T|\approx8.673617379884035\times10^{-18}.
$$
The radial row did not close off center. The derivative-based and
tangential-substituted radial diagnostics agree at the sampled scale:
$$
\max |\mathcal R_R|\approx0.0012313880360096448,
\qquad
\max |\mathcal R_R^{\mathrm{tr}}|\approx0.0012313880360096457,
$$
where
$$
\mathcal R_R^{\mathrm{tr}}(\theta)
=
B_Q(\theta)
-
\Gamma(\theta)\left(s'(\theta)-s(\theta)^2-1\right)
-
s(\theta)T_Q(\theta).
$$
At $\theta=0.02$, the sampled retained chart gives
$$
B_Q\approx-0.004583410103563973,\qquad
T_Q\approx-0.0049833367381497615,
$$
and
$$
\mathcal R_R^{\mathrm{tr}}\approx0.0012313880360096457.
$$

### Radial-Jet Follow-Up

[spiral-a1-radial-transport-jet-report](spiral-a1-radial-transport-jet-report.md)
sharpens the transported radial obstruction near the turn center. The
`radial_jet` diagnostic samples
$$
D_h
=
\frac{\mathcal R_R^{\mathrm{tr}}(h)-\mathcal R_R^{\mathrm{tr}}(0)}{h}
$$
on the same one-sided future transported chart. With
`integration-panels=512`, `transport-steps=320`, and `delta-steps=2048`, the
dyadic slopes approach
$$
D_{0.0003125}\approx0.0685726853845603,
$$
while the retained chart keeps the expected $3+1$ root count and
$$
\min |J_{\alpha,Q}|\approx1.5990335857619464.
$$
The convergence wrapper comparing a doubled refinement gives adjacent-level
changes
$$
\Delta_{\mathrm{level}}\mathcal R_R^{\mathrm{tr}}
\lesssim3.19\times10^{-7},
\qquad
\Delta_{\mathrm{level}}D_h\lesssim6.52\times10^{-5}.
$$
Thus the transported radial mismatch is visible as a near-turn first-order
radial-jet obstruction candidate, not only as an endpoint residual. The same
follow-up also shows that this sampled coefficient is profile-specific: the
retained value and moment constraints do not determine all source-side endpoint
slopes entering $B'_+(0)$ in
$$
\left(\mathcal R_R^{\mathrm{tr}}\right)'_+(0)
=
B'_+(0)-(3a-2)T_0.
$$

## Interpretation

These runs separate three issues that were previously bundled together. The
retained-memory witness is not immediately destroyed by sampled off-center root
transport: the same $3+1$ root ledger persists on a small collar and the active
Jacobian floor remains far from zero. The compact baseline fails because its
chosen future extension does not satisfy the tangential row. The transported
profile removes that tangential defect on the future side, leaving the radial
row as the first sampled obstruction for this one-sided retained chart. The
radial-jet follow-up localizes that obstruction to the leading future-side
behavior of $\mathcal R_R^{\mathrm{tr}}(\theta)$ near $\theta=0$.

The next mathematical target is no longer to choose another arbitrary future
profile. It is to declare the endpoint-slope class for the retained positive
$C^2$ inverse-rate profiles and then decide whether the radial residual can be
driven to zero in that class. A rejection is meaningful only if it proves that
no such continuation can satisfy the tangential transport while preserving the
retained root ledger and radial row.

## Promotion Decision

- Ontology: none added.
- Derivation/closure target: sampled finite-collar transport now reports
  retained $3+1$ roots, a positive Jacobian floor, sampled tangential closure,
  and a nonzero radial residual for the one-sided transported profile. The
  follow-up radial-jet diagnostic makes the leading radial coefficient and its
  endpoint-slope dependence the next proof target.
- Effective summary: the compact baseline obstruction is tangential mismatch;
  after tangential transport, the surviving sampled obstruction is radial and
  appears already in the one-sided leading radial jet for the chosen witness.
- Speculation: no interval branch certificate, stability claim, or isolated
  orbit closure is promoted.

Promotion decision. Keep this report priority-only as diagnostic evidence.
The theorem-target formulas and first-order transport lemma are already promoted
in [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md);
the new future-collar numbers should remain priority-only until an interval or
declared-function-class certificate exists.
