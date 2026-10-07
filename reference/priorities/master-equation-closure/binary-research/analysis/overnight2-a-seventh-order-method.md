# A bounded seventh-order step toward the canonical entry phase

**Status: formal analytical-method proposal, with a quantitative stopping rationale.** The independently matched fifth-order coefficients and candidate sixth-order actual remainder improve the source response, but their broad complex-tail bound remains too large for the intended early-phase calculation. This note selects one bounded formal seventh-order comparison calculation. It changes no physical equation, preparation, geometry or source treatment, and it supplies no physical evolution.

The reason for the extra order can be stated quantitatively. Suppose a response polynomial of degree $m$ has radial error $C_r\alpha^{m+1}/r^2$ and transverse error $C_tQ\alpha^{m+1}/r^2$, where $\alpha=\epsilon/h$ and $Q=h^2/r$. Exact polar differentiation of $c=e/h$, with $|e|\le3$, gives a direct remainder contribution bounded by

$$
(C_r+14C_t)\frac{\epsilon^{m+1}}{h^{m+2}}.
$$

On a branch with $h_\theta\ge.99\epsilon$, its accumulated absolute integral from $h_0$ is at most

$$
\frac{C_r+14C_t}{.99(m+1)h_0^{m+1}}\epsilon^m.
\tag{1}
$$

This is only the accumulated local remainder in an exact identity. It is not a comparison theorem for two evolved trajectories, does not include the original release interval or nominal forcing, and does not replace the needed homogeneous/phase analysis. With the candidate fifth-order constants $C_r=3.51\times10^{10}$ and $C_t=8.31\times10^8$, the coefficient in (1) at $h_0=1$ is below $7.87\times10^9$. At the nominal small parameter the resulting allowance is of order $3.3\times10^{-8}$, too loose for a decisive phase determination. The sign of the actual accumulated residual is not inferred from this magnitude bound.

The next field is the accepted formal fifth-order response expressed pointwise. In the fixed receiving scaling, use $\rho=|y|$, $n=y/\rho$, $p=n\cdot w$, $v=w-pn$, and $q^2=v\cdot v$. Starting with $F_3$ from the [fifth-order method](overnight2-a-canonical-fifth-order-method.md), define

$$
F_5=F_3+\frac{Q\alpha^4}{\rho^2}(a_4n+b_4v)
+\frac{Q\alpha^5}{\rho^2}(a_5n+b_5v),
$$
$$
a_4=\frac{8Qp^2}{3\rho}+\frac{q^4}{8}
-\frac{8Qq^2}{3\rho}+\frac{Q^2}{\rho^2},
\qquad b_4=\frac{pq^2}{2}-\frac{19Qp}{3\rho},
$$
$$
a_5=\frac{44Qp^3}{15\rho}-\frac{196Qpq^2}{15\rho}
+\frac{19Q^2p}{5\rho^2},
\qquad b_5=-\frac{142Qp^2}{15\rho}+\frac{121Qq^2}{30\rho}
+\frac{3Q^2}{5\rho^2}.
\tag{2}
$$

These formulas come from eliminating the receiving $h$ from each polynomial monomial before evaluating at a source state. A list of receiving-frame coefficients alone would not define a consistent local field. At $y=(1,0)$, $w=(P,Q)$, (2) returns the independently derived fourth/fifth row multiplied by the scaling factor $Q$. Rotational covariance and the radial powers are part of the known checks, not assumed after a numerical output.

The new instrument reuses the frozen root series engine as implementation machinery, explicitly retaining its source identity. That reuse is not an independent reference. Known mode first checks the affine response through degree seven, the pointwise field's reception coefficients and a quarter-turn rotation, then the independently known generated fifth-order response in a degree-five-only invocation. Its generated degree-seven target follows only after the known pass is recorded. The complete implicit source clock and sampled source velocity remain in the calculation.

Use the shared venv, one numerical thread, the existing supervisor, a 90-second internal budget, a 120-second supervisor deadline, 512 MiB cooperative memory bound and 1 MiB output bound. Retain controls, target, failed attempts and dependency identities. A budget failure ends this formal attempt; it does not authorize a blind expansion of resources. Independent derivation and a new uniform remainder are required before target application.

After a usable local error is obtained, priority returns to the original release and accumulated phase. Further orders are justified only by a demonstrated remaining error budget and a reachable independently checked application; accumulating coefficient lists is not the scientific objective. The [main A report](overnight2-a-followup-and-research-2026-10-07.md) owns integration. No source, history, frozen reference, shared operator owner, production solver or generated artifact is changed by this proposed calculation.

**Known controls passed at 05:58:08 UTC, before the generated degree-seven target.** The [new instrument](../evidence/overnight2-a-canonical-seventh-order.py) passed affine degree-seven coefficients, exact pointwise reception coefficients of the fifth-order field, a quarter-turn covariance check, and the independently known degree-five generated row. Supervisor lease `6989181a-e73d-4131-b0e3-271fb7352e5a` closed successfully in 3.57 seconds. The original receipt is `.local-data/master-equation-closure/overnight2-a/canonical-seventh-known.json`. It records the frozen engine identity as well as its own producer identity. This is the recorded known-first pass; no generated degree-seven target preceded it.
