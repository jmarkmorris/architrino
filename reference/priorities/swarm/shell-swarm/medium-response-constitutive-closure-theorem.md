# Medium-Response Constitutive Closure Theorem

Promotion status: `priority-only`. This packet states the theorem target required before a Noether-Sea medium-response term may enter the same-level tri-binary dynamics ledger. It is the analogue of [fold-layer-regularization-action-theorem.md](fold-layer-regularization-action-theorem.md) for nonlocal medium response: a response term must be derived from a constitutive law with action, conservation, and event accounting, not fitted as an extra residual-canceling force.

This packet does not add a medium-response force to the current $M=3$ rows.

If a future stability packet claims attracting contraction rather than conservative elliptic or NHIM stability, [conservative-monodromy-stability-classification.md](conservative-monodromy-stability-classification.md) requires this medium-response or another event-exchange row to supply the dissipative/storage mechanism.

---

## 1. Constitutive Response Object

Let $\mathcal{N}_B$ denote the Noether-Sea state variables attached to a candidate branch/event window. A medium-response contribution is a map

$$
\mathcal{M}_{\mathrm{resp}}
:
(Y,\mathcal{A}_B,\mathcal{N}_B)
\mapsto
\widetilde{\mathbf{F}}_{\mathrm{sea}}.
$$

It may enter the dynamics only through a declared response action or virtual-work row:

$$
\delta\mathcal{S}_{\mathrm{sea}}^\perp
=
\int_0^L
\sum_i
\widetilde{\mathbf{F}}_{i,\mathrm{sea}}
\cdot
\delta\mathbf{Y}_i^\perp
d\lambda
+
\mathcal{B}_{\mathrm{sea}}.
$$

The force ledger becomes

$$
\widetilde{\mathbf{F}}_i
=
\widetilde{\mathbf{F}}_{i,\mathrm{partner}}
+
\widetilde{\mathbf{F}}_{i,\mathrm{cross}}
+
\widetilde{\mathbf{F}}_{i,\mathrm{fold}}
+
\widetilde{\mathbf{F}}_{i,\mathrm{sea}},
$$

only after the response object and its ledger are emitted.

---

## 2. Causality And Locality Bounds

The response must use the same event interval and memory convention as the branch. A minimal response certificate supplies:

$$
\operatorname{supp}
\mathcal{M}_{\mathrm{resp}}(Y)(\lambda)
\subseteq
\{\xi:\lambda-\eta_{\mathrm{sea}}\le\xi\le\lambda\},
$$

with

$$
\eta_{\mathrm{sea}}\le\eta_{\mathrm{mem}}
$$

or a separate support-complete response memory proof. It also supplies a Lipschitz bound

$$
\|D\widetilde{\mathbf{F}}_{\mathrm{sea}}\|
\le
L_{\mathrm{sea}}
$$

on the same root-regular branch chart used by the delayed-force ledger.

If response memory exceeds the declared branch memory, the status is

$$
\texttt{medium-response-memory-mismatch}.
$$

---

## 3. Passivity And Energy Exchange

A medium response may exchange energy and momentum with the branch, but the exchange must be ledgered. Let

$$
\mathcal{P}_{\mathrm{sea}}(\lambda)
=
\sum_i
\widetilde{\mathbf{F}}_{i,\mathrm{sea}}(\lambda)
\cdot
\mathbf{T}_i(\lambda).
$$

For a purely conservative response on a closed branch,

$$
\int_0^L
\mathcal{P}_{\mathrm{sea}}(\lambda)d\lambda
=
0.
$$

For a dissipative or storage response, the packet must emit a storage functional $\mathcal{E}_{\mathrm{sea}}$ and dissipation density $\mathcal{D}_{\mathrm{sea}}\ge0$ such that

$$
\frac{d}{d\lambda}
\mathcal{E}_{\mathrm{sea}}
=
\mathcal{P}_{\mathrm{sea}}
-
\mathcal{D}_{\mathrm{sea}}
+
\mathcal{R}_{\mathrm{sea},E}.
$$

The energy ledger passes only if

$$
\|\mathcal{R}_{\mathrm{sea},E}\|
\le
\tau_{\mathrm{sea},E}.
$$

Analogous momentum and angular-momentum response rows must be emitted if the response carries force or torque:

$$
\mathcal{R}_{\mathrm{sea},\mathbf{p}},
\qquad
\mathcal{R}_{\mathrm{sea},\mathbf{J}}.
$$

---

## 4. Symmetry And Isotropy Row

A medium-response term must not silently introduce a preferred orientation unless the branch claim explicitly includes it. For rotations $R\in SO(3)$, the isotropy row is

$$
\mathcal{M}_{\mathrm{resp}}[RY,R\mathcal{N}_B]
=
R\mathcal{M}_{\mathrm{resp}}[Y,\mathcal{N}_B]
$$

within tolerance

$$
\mathcal{R}_{\mathrm{sea},\mathrm{iso}}
\le
\tau_{\mathrm{iso}}.
$$

If this row fails, any later observer-export or Lorentz-facing claim must carry the preferred-orientation residual. The failure is not necessarily fatal for a dynamics screen, but it blocks isotropic-branch promotion.

---

## 5. Action And Noether Compatibility

The total work one-form becomes

$$
\omega_{\mathrm{tot}}
=
\omega_{\mathrm{delay}}
+
\omega_{\mathrm{fold}}
+
\omega_{\mathrm{sea}}.
$$

It must pass the combined curl test:

$$
\frac{
\|\mathcal{C}_{\mathrm{tot}}\|_{\mathrm{F}}
}{
1+\|W_{\mathrm{tot}}\|_{\mathrm{F}}
}
\le
\epsilon_{\mathrm{curl}}.
$$

The Noether conservation theorem must then be rerun with the medium boundary terms:

$$
|\mathcal{R}_{\xi}|
\le
C_\xi\|\mathrm{EL}_B\|
+
\epsilon_{\mathrm{curl}}
+
\epsilon_{\mathrm{tail}}
+
\epsilon_{\mathrm{disc}}
+
\epsilon_{\mathrm{endpoint}}
+
\epsilon_{\mathrm{sea}}.
$$

If the medium response changes the force but not the event ledger, the status is

$$
\texttt{medium-update-open}.
$$

---

## 6. Theorem Target

**Theorem target: medium-response admissibility.** A Noether-Sea response term may enter a retained shell swarm branch candidate only if:

1. it is generated by a declared constitutive response object or response action;
2. its memory is compatible with the branch memory convention;
3. its derivative is bounded on the root-regular chart;
4. its energy, momentum, angular momentum, and source-provenance exchanges are ledgered;
5. its isotropy or preferred-orientation residual is emitted;
6. the combined work one-form exactness and Noether conservation rows pass;
7. the dynamics closure, convergence, and stability certificates are recomputed with the response included.

Then the medium-response term is an admissible extension of the force/action ledger. It is not an empirical correction term and cannot be used to support observer-level claims unless its response and symmetry residuals are explicitly carried.

---

## 7. Current Dynamics Reading

The current $M=3$ exact-antipodal rows do not include a medium response. The correct status is:

$$
\texttt{medium-response-constitutive-closure-open},
\qquad
\texttt{medium-update-not-computed},
\qquad
\texttt{not-retained}.
$$

Pure partner/cross-binary exact-antipodal continuation remains the cleaner route until support-complete closure or obstruction is computed. A medium response should open only after the native geometry/action route shows a stable deficit that cannot be removed by exact-antipodal continuation, antipodal relaxation, or a certified fold-layer.

---

## 8. Required Output Fields

Future medium-response packets should emit:

| Field | Required payload |
| --- | --- |
| `medium_state` | $\mathcal{N}_B$ variables and event interval |
| `response_map` | $\mathcal{M}_{\mathrm{resp}}$ and memory support |
| `response_force` | $\widetilde{\mathbf{F}}_{\mathrm{sea}}$ and projection convention |
| `response_lipschitz` | $L_{\mathrm{sea}}$ on the retained chart |
| `energy_exchange` | $\mathcal{E}_{\mathrm{sea}}$, $\mathcal{D}_{\mathrm{sea}}$, and $\mathcal{R}_{\mathrm{sea},E}$ |
| `momentum_exchange` | $\mathcal{R}_{\mathrm{sea},\mathbf{p}}$ and recoil/provenance rows |
| `angular_momentum_exchange` | $\mathcal{R}_{\mathrm{sea},\mathbf{J}}$ and torque rows |
| `isotropy_residual` | $\mathcal{R}_{\mathrm{sea},\mathrm{iso}}$ |
| `combined_curl` | total work one-form exactness status |
| `noether_response_status` | conservation rows after medium terms are included |
| `medium_decision` | `medium-response-admissible`, `medium-response-open`, or first failure code |

Failure/status codes:

$$
\texttt{medium-response-constitutive-closure-open},
\qquad
\texttt{medium-response-memory-mismatch},
\qquad
\texttt{medium-update-open},
$$

$$
\texttt{medium-isotropy-residual-open},
\qquad
\texttt{medium-response-curl-fail},
\qquad
\texttt{not-retained}.
$$
