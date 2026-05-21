# Binary-Specific Plane-Normal Search Results

Promotion status: `priority-only`. This packet records a bounded follow-up to [plane-normal-precession-search-results.md](plane-normal-precession-search-results.md). The prior common nonplanar mode improved force-versus-curvature alignment but increased tangential leakage. This screen gave each binary its own plane-normal waveform while keeping exact antipodality.

The result is negative. The extra normal freedom did not survive refinement: period compatibility degraded, the Jacobian floor moved toward failure, and the refined residuals were worse than the common nonplanar row.

---

## 1. Screened Class

The carrier was

$$
\mathbf{X}_{a,\sigma}(q)
=
\sigma
\left[
\rho(u)\mathbf{p}_a(u)
+z_a(u)\mathbf{n}_a
\right],
\qquad
u=q+\phi_a,
$$

with common radial breathing

$$
\rho(u)=1+A\cos2u+B\sin2u,
$$

and binary-specific normal modes

$$
z_a(u)=C_a\cos2u+D_a\sin2u.
$$

The row kept exact antipodality:

$$
\mathbf{X}_{a,-}(q)=-\mathbf{X}_{a,+}(q),
$$

so this was not an antipodal-relaxation screen.

The free variables were

$$
(A,B,C_1,C_2,C_3,D_1,D_2,D_3,\phi_2,\phi_3).
$$

The arclength clock, active-root convention, force normalization, and fitted diagnostic $\Gamma_*$ matched [plane-normal-precession-search-results.md](plane-normal-precession-search-results.md).

---

## 2. Best Screened Row

A bounded differential-evolution search followed by local refinement found the coarse candidate

$$
A\approx0.19933757,
\qquad
B\approx0.32017633,
$$

$$
(C_1,C_2,C_3)
\approx
(-0.16060606,-0.10273070,0.02839406),
$$

$$
(D_1,D_2,D_3)
\approx
(-0.16690786,-0.20490924,0.09021295),
$$

$$
\phi_2\approx2.92900515,
\qquad
\phi_3\approx2.76949855.
$$

On the coarse sample the row appeared plausible:

| Diagnostic | Coarse result |
| --- | ---: |
| Tangential residual RMS | $0.6206658905$ |
| Tangential residual max | $1.5116761497$ |
| Force-versus-curvature RMS | $1.1841994107$ |
| Force-versus-curvature max | $2.2308827756$ |
| Best scalar $\Gamma_*$ | $0.1654927895$ |
| Euclidean noncollision floor | $d_{\min}\approx0.6316340049R$ |
| Jacobian floor | $J_{\min}\approx0.4053624397$ |
| Root count | $5$-$5$ |
| Length spread | $0.2352281866R$ |

The length spread already showed that the equal-period arclength row was not closed.

---

## 3. Refined Diagnostics

On the refined $16$-sample rescore, the row failed more clearly:

| Diagnostic | Refined result |
| --- | ---: |
| Tangential residual RMS | $1.0589324195$ |
| Tangential residual max | $5.1550888535$ |
| Force-versus-curvature RMS | $2.1268451540$ |
| Force-versus-curvature max | $9.6697046988$ |
| Best scalar $\Gamma_*$ | $0.0540005592$ |
| Euclidean noncollision floor | $d_{\min}\approx0.5598927741R$ |
| Jacobian floor | $J_{\min}\approx0.2063773025$ |
| Root count | $5$-$5$ |
| Length spread | $0.2352281866R$ |

The failure is not root-count loss; the $5$-$5$ root convention persisted. The failure is that binary-specific normal freedom found a coarse-grid residual valley that does not refine and does not satisfy common-period arclength closure.

---

## 4. Comparison With Common Nonplanar Row

The common plane-normal row had:

$$
\operatorname{rms}(\mathcal{R}_{\mathrm{tan}})
\approx0.7023,
\qquad
\operatorname{rms}(\mathcal{R}_{\mathrm{curv}})
\approx1.2176,
\qquad
J_{\min}\approx0.2878.
$$

The binary-specific row refined to:

$$
\operatorname{rms}(\mathcal{R}_{\mathrm{tan}})
\approx1.0589,
\qquad
\operatorname{rms}(\mathcal{R}_{\mathrm{curv}})
\approx2.1268,
\qquad
J_{\min}\approx0.2064.
$$

Thus simply assigning independent normal modes per binary does not improve the retained-branch route unless the solver also enforces common arclength period, refinement stability, and stronger Jacobian barriers during optimization.

---

## 5. Dynamics Inference

This screen does not invalidate plane-normal precession. It invalidates a weak implementation of it:

1. binary-specific normal modes need explicit period-length constraints in the objective, not post-hoc measurement;
2. Jacobian and noncollision barriers must be harder, because normal modes can create near-grazing delayed hits without changing root count;
3. common nonplanar modes remain the better pure-geometry direction so far;
4. the next serious run should use the full collocation protocol in [intrinsic-curve-solver-protocol.md](intrinsic-curve-solver-protocol.md), not another loose low-mode screen.

Failure codes:

$$
\texttt{period-length-mismatch},
\qquad
\texttt{tangential-residual-open},
\qquad
\texttt{curvature-force-mismatch},
\qquad
\texttt{jacobian-floor-violation}\ \text{risk under refinement},
\qquad
\texttt{not-retained}.
$$

