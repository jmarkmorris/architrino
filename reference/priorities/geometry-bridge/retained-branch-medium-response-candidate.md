# Retained Branch Medium-Response Candidate

Promotion status: `priority-only`.

This packet consumes [specific-branch-medium-response-row](specific-branch-medium-response-row.md), [axial-tensor-coefficient-extraction](axial-tensor-coefficient-extraction.md), and the medium-response admissibility standard in [Medium-Response Constitutive Closure Theorem](../swarm/shell-swarm/medium-response-constitutive-closure-theorem.md). It answers the next geometry-bridge question:

$$
\text{Is the required axial cancellation tensor forbidden by symmetry?}
$$

The answer is no. Symmetry does not close the row by itself, but it reduces the retained trace-free medium response to one scalar susceptibility. That scalar is then fixed by the axial ADM/Cartan residual.

## Input Tensor Line

Work in the trace-free symmetric tensor space

$$
\mathrm{Sym}^{2}_{0}(h)
=
\{X^{ab}=X^{ba}\mid h_{ab}X^{ab}=0\},
\qquad
\langle X,Y\rangle_h=X_{ab}Y^{ab}.
$$

For the certified rigid octahedral source row,

$$
A^{ab}
=
n^an^b-\frac13h^{ab},
\qquad
n=\frac{1}{\sqrt3}(1,1,1),
\qquad
A_{ab}A^{ab}=\frac23,
$$

and

$$
\delta\mathcal Z_{\mathrm{oct,tf}}^{ab}
=
\zeta_{\delta Z}\varepsilon A^{ab},
\qquad
\zeta_{\delta Z}\approx-0.000680152657812.
$$

The source-only decision row classified the current raw branch export as

$$
\texttt{medium-row-not-emitted}.
$$

This packet does not retroactively emit that missing row. It identifies the only linear trace-free tensor direction that a retained medium response may use if the response is sourced by the octahedral exposure tensor and does not introduce an independent preferred orientation.

## Equivariance Lemma

Let

$$
L:\mathrm{Sym}^{2}_{0}(h)\to\mathrm{Sym}^{2}_{0}(h)
$$

be a linear medium-response susceptibility. If the response is isotropic in the homogeneous Noether-Sea reference cell, then

$$
L(RXR^T)=RL(X)R^T
$$

for every spatial rotation $R$ admitted by the reference cell. On the full trace-free rank-two representation this forces

$$
L=\kappa_Z I
$$

for a scalar $\kappa_Z$.

For the single branch-axis source line, the same conclusion follows from the stabilizer of the octahedral axial tensor. The trace-free tensors invariant under the cyclic rotation that fixes $n=(1,1,1)/\sqrt3$ form

$$
\left(\mathrm{Sym}^{2}_{0}(h)\right)^{G_A}
=
\mathrm{span}\{A^{ab}\}.
$$

Therefore any retained linear trace-free medium response sourced only by $\delta\mathcal Z_{\mathrm{oct,tf}}^{ab}$ has the form

$$
\boxed{
\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}
=
\kappa_Z\,\delta\mathcal Z_{\mathrm{oct,tf}}^{ab}.
}
$$

This is a direction theorem, not a derivation of the scalar coefficient. It says that isotropy does not forbid the cancellation route; it also says that a response tensor pointing somewhere else would introduce extra branch data not supplied by the certified octahedral source row.

## Axial Closure Coefficient

Substituting the candidate response into the exported medium coefficient gives

$$
\mu_K
=
\frac{3}{2\varepsilon}
A_{ab}\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}
=
\kappa_Z\zeta_{\delta Z}.
$$

The axial ADM/Cartan residual is

$$
\mathcal R_{\mathrm{ax},B}^{ij}
=
\left(
\lambda_Z\zeta_{\delta Z}
+
\lambda_M\mu_K
\right)
\varepsilon A^{ij}.
$$

Hence the retained susceptibility gives

$$
\mathcal R_{\mathrm{ax},B}^{ij}
=
\left(
\lambda_Z+\lambda_M\kappa_Z
\right)
\zeta_{\delta Z}\varepsilon A^{ij}.
$$

For $\lambda_M\ne0$, first-order axial observer-geometry closure is equivalent to

$$
\boxed{
\kappa_Z
=
-\frac{\lambda_Z}{\lambda_M}
=
-r_{ZM}.
}
$$

The required exported coefficient is therefore

$$
\boxed{
\mu_K^{\mathrm{req}}
=
\kappa_Z\zeta_{\delta Z}
=
0.000680152657812\,r_{ZM}.
}
$$

Equivalently,

$$
\boxed{
\frac1\varepsilon
A_{ab}\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}
=
\frac23\mu_K^{\mathrm{req}}
=
0.000453435105208\,r_{ZM}.
}
$$

Under the same spatial-compliance source-unit specialization $r_{ZM}=1$,

$$
\boxed{
\kappa_Z=-1,
\qquad
\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}
=
-\delta\mathcal Z_{\mathrm{oct,tf}}^{ab}.
}
$$

This same-units row should not be read as a derived Noether-Sea law. It is the exact susceptibility that a retained medium-response row must derive if the ADM/Cartan projection consumes $\delta\mathcal Z_{\mathrm{oct,tf}}^{ab}$ with $\lambda_Z=\lambda_M$.

## Candidate Storage Density

A compact priority-side way to realize the susceptibility is a trace-free storage density on a root-regular branch chart. Let

$$
M^{ab}
=
\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab},
\qquad
Z^{ab}
=
\delta\mathcal Z_{\mathrm{tf}}^{ab}.
$$

For constants $\alpha_M>0$ and $\beta_{MZ}$ with declared units, define

$$
\mathcal F_{\mathrm{sea,tf}}(M,Z)
=
\frac{\alpha_M}{2}\langle M,M\rangle_h
+
\beta_{MZ}\langle M,Z\rangle_h.
$$

Variation with respect to the retained medium tensor gives

$$
D_M\mathcal F_{\mathrm{sea,tf}}[\delta M]
=
\langle
\alpha_M M+\beta_{MZ}Z,
\delta M
\rangle_h.
$$

The stationary response is

$$
M_*^{ab}
=
-\frac{\beta_{MZ}}{\alpha_M}Z^{ab},
\qquad
\kappa_Z
=
-\frac{\beta_{MZ}}{\alpha_M}.
$$

Therefore the axial metric-cancellation target becomes the coefficient ratio

$$
\boxed{
\frac{\beta_{MZ}}{\alpha_M}
=
r_{ZM}.
}
$$

A passivity-safer equivalent for the retained trace-free block is the completed-square storage density

$$
\mathcal F_{\mathrm{sea,tf}}^{\square}(M,Z)
=
\frac{\alpha_M}{2}
\langle
M+r_{ZM}Z,\,
M+r_{ZM}Z
\rangle_h,
\qquad
\alpha_M>0.
$$

Its $M$-stationary response is again

$$
M_*^{ab}=-r_{ZM}Z^{ab},
$$

and its storage density is nonnegative before the medium tensor is eliminated. If $Z$ is varied rather than treated as a prescribed exposure source, the exposure-conjugate term from $D_Z\mathcal F_{\mathrm{sea,tf}}^\square$ must be ledgered in the same branch-local virtual-work row as the delayed-force and Noether-Sea pairings.

## Pressure-Scaffold Link

The pressure-side tensor scaffold decomposes the same medium coefficient as

$$
\mu_K
=
2q_{\chi A}+m_Ss_A+\rho_A.
$$

The retained susceptibility candidate therefore imposes

$$
\boxed{
2q_{\chi A}+m_Ss_A+\rho_A
=
\kappa_Z\zeta_{\delta Z}.
}
$$

At closure,

$$
\boxed{
2q_{\chi A}+m_Ss_A+\rho_A
=
0.000680152657812\,r_{ZM}.
}
$$

This is not an independent pressure fit. It is the mechanism decomposition of the same branch-exported tensor coefficient $\mu_K$.

## Admissibility Burden

The susceptibility row is admissible only when it is emitted as a Noether-Sea response object, not when it is inserted as a residual-canceling fit. A retained packet must supply the same fields required by the medium-response closure theorem:

| Field | Required payload for this candidate |
| --- | --- |
| `medium_state` | branch-local Noether-Sea variables $\mathcal N_B$ and event interval |
| `response_map` | $\mathcal M_{\mathrm{resp}}$ whose trace-free export gives $M=\kappa_ZZ$ |
| `response_force` | $\widetilde{\mathbf F}_{\mathrm{sea}}$ and projection convention |
| `response_lipschitz` | local bound $L_{\mathrm{sea}}$ on the retained root chart |
| `energy_exchange` | storage density, dissipation if present, and $\mathcal R_{\mathrm{sea},E}$ |
| `momentum_exchange` | recoil/provenance row and $\mathcal R_{\mathrm{sea},\mathbf p}$ |
| `angular_momentum_exchange` | torque row and $\mathcal R_{\mathrm{sea},\mathbf J}$ |
| `isotropy_residual` | proof that no independent preferred orientation is inserted |
| `combined_curl` | total root-sensitive work one-form exactness status |
| `noether_response_status` | conservation rows after the medium term is included |
| `medium_decision` | `medium-response-admissible`, `medium-response-open`, or first failure code |

The new mathematical result is not this obligation list. The result is the one-scalar reduction

$$
\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}
=
\kappa_Z\delta\mathcal Z_{\mathrm{oct,tf}}^{ab}
$$

and the closure coefficient

$$
\kappa_Z=-r_{ZM}.
$$

The obligation list states what must be emitted before that candidate can be promoted from priority-side constitutive response to retained branch dynamics.

## Closure Classification

| Case | Classification |
| --- | --- |
| $\lambda_M\ne0$ and $\kappa_Z=-r_{ZM}$ with the response object emitted | `candidate-metric-cancelled` |
| $\lambda_M\ne0$ and $\kappa_Z\ne-r_{ZM}$ | axial residual $(\lambda_Z+\lambda_M\kappa_Z)\zeta_{\delta Z}\varepsilon A^{ij}$ remains |
| $\kappa_Z=0$ | source-only decision row; rejected for $\lambda_Z\ne0$ |
| $\lambda_M=0,\lambda_Z\ne0$ | `medium-cancellation-impossible` |
| $\lambda_Z=0$ and $\kappa_Z=0$ | nonmetric exposure route; no cancellation needed |
| no emitted response object | `metric-closure-not-emitted` |
| $\alpha_M\le0$ in the storage density | no convex retained medium block |

## What This Advances

The rigid octahedral source-only row was previously closed only as a decision:

$$
\mu_K=0
\quad\Longrightarrow\quad
\mathcal R_{\mathrm{ax,source}}^{ij}
=
\lambda_Z\zeta_{\delta Z}\varepsilon A^{ij}.
$$

This packet advances the metric-cancellation route. It proves that the required medium tensor is not forbidden by rotational symmetry, that the unique linear trace-free direction is the source exposure tensor itself, and that the exact susceptibility required for closure is

$$
\boxed{\kappa_Z=-r_{ZM}.}
$$

It also gives a local storage-density candidate whose stationarity produces that susceptibility. The remaining burden is not to invent another gate, but to derive or reject this response row from a retained Noether-Sea branch object with action, conservation, and root-sensitive curl accounting.

## Promotion Decision

This packet remains `priority-only`. It is too branch-diagnostic for direct corpus promotion because the rigid octahedral row is not yet a retained dynamics branch, the projection ratio $r_{ZM}$ is not calibrated independently, and the medium-response object has not emitted the required action and Noether rows.

The promotion-ready theorem target, once those burdens are met, is:

$$
\text{A retained isotropic trace-free Noether-Sea susceptibility closes the octahedral axial ADM/Cartan residual at first order iff }
\kappa_Z=-\lambda_Z/\lambda_M.
$$
