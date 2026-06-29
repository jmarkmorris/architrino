# Gamma Fit/Action Identifiability Lemma

Promotion status: `priority-only`. This packet sharpens the scale row in [gamma-scale-action-row.md](gamma-scale-action-row.md) and the one-form condition in [history-force-variationality-condition.md](history-force-variationality-condition.md). It states exactly what a fitted $\Gamma_K$ can and cannot prove about an action-derived branch scale.

The fitted scalar is a projection statistic. The action-derived scalar is a physical ledger value. They coincide only after the force one-form, memory ledger, and branch inertia rows close on the same branch.

For a bounded speed factor branch, this lemma must be read on the speed-weighted ledger. The projected curvature vector becomes

$$
K_{\nu}=\nu^2K,
$$

and the fit must use the same bounded-speed force $A^{\nu}=P^\perp\widetilde{\mathbf{F}}^{\nu}$, causal-time weighting, source-normal root chart, receiver-normal branch weights, and speed-factor action row used by the candidate branch. A fixed-speed fitted $\Gamma_K$ can initialize the bounded-speed solve, but it cannot identify $\Gamma_B^{\nu}$.

The corresponding diagnostic scalar is

$$
\Gamma_{\nu}^{\mathrm{fit}}
=
\frac{\langle K_{\nu},A^{\nu}\rangle_{\nu}}
{\langle A^{\nu},A^{\nu}\rangle_{\nu}},
$$

with residual

$$
R_{\mathrm{fit}}^{\nu}
=
K_{\nu}
-
\Gamma_{\nu}^{\mathrm{fit}}A^{\nu}.
$$

The fixed-speed identifiability bound carries over only after replacing $K$, $A$, $\Gamma_K^{\mathrm{fit}}$, and the residual norm by these bounded-speed objects.

---

## 1. Projection Geometry

On one root ledger, define the projected force vector and curvature vector in the weighted residual space:

$$
A=P^\perp\widetilde{\mathbf{F}},
\qquad
K=\mathbf{K}.
$$

Assume

$$
\|A\|>0.
$$

The diagnostic fitted curvature scale is

$$
\Gamma_K^{\mathrm{fit}}
=
\frac{\langle K,A\rangle}{\langle A,A\rangle}.
$$

Its residual is

$$
R_{\mathrm{fit}}
=
K-\Gamma_K^{\mathrm{fit}}A,
$$

and satisfies the projection identity

$$
\langle R_{\mathrm{fit}},A\rangle=0.
$$

If the action row supplies a branch scalar

$$
\Gamma_B
=
\frac{E_\epsilon(R_*)}
{m_{\mathrm{car}}(B)c_f^2},
$$

then the action-scale residual is

$$
R_B=K-\Gamma_BA.
$$

The exact identity is

$$
R_B
=
R_{\mathrm{fit}}
+
\left(\Gamma_K^{\mathrm{fit}}-\Gamma_B\right)A,
$$

and therefore

$$
\|R_B\|^2
=
\|R_{\mathrm{fit}}\|^2
+
\left(\Gamma_K^{\mathrm{fit}}-\Gamma_B\right)^2\|A\|^2.
$$

Thus the fitted residual is the best possible scalar residual on that fixed force ledger. Any action-derived scalar different from the fit pays a quadratic residual penalty.

---

## 2. Identifiability Bound

Suppose a retained dynamics tolerance requires

$$
\|R_B\|\le\tau_K,
$$

and the projected force norm has a lower bound

$$
\|A\|\ge A_0>0.
$$

Then any action-derived scalar must obey

$$
\left|
\Gamma_B-\Gamma_K^{\mathrm{fit}}
\right|
\le
\frac{
\sqrt{\tau_K^2-\|R_{\mathrm{fit}}\|^2}
}{A_0},
$$

provided $\|R_{\mathrm{fit}}\|\le\tau_K$. In particular, the simpler necessary bound is

$$
\left|
\Gamma_B-\Gamma_K^{\mathrm{fit}}
\right|
\le
\frac{\tau_K}{A_0}.
$$

If

$$
\|R_{\mathrm{fit}}\|>\tau_K,
$$

then no scalar $\Gamma_B$ can close the curvature row on that force ledger within tolerance. The solver must change the curve, root ledger, force law, or inertia model.

If

$$
\left|
\Gamma_B-\Gamma_K^{\mathrm{fit}}
\right|A_0
>
\tau_K,
$$

then the action-derived scalar is incompatible with the fitted dynamics row even if the fit itself looked numerically attractive.

---

## 3. Tail And Discretization Perturbations

If the force ledger has unresolved tail error

$$
\|\Delta A^{\mathrm{tail}}\|\le\epsilon_A^{\mathrm{tail}},
$$

then the fitted scale is stable only when

$$
\epsilon_A^{\mathrm{tail}}<\frac{1}{2}\|A\|.
$$

Under that condition, the perturbation estimate from [unresolved-tail-force-error-bound.md](unresolved-tail-force-error-bound.md) gives

$$
\left|
\Delta\Gamma_K^{\mathrm{fit}}
\right|
\lesssim
\frac{
\|K\|\epsilon_A^{\mathrm{tail}}
}{\|A\|^2}
+
\frac{
2|\Gamma_K^{\mathrm{fit}}|\epsilon_A^{\mathrm{tail}}
}{\|A\|}.
$$

Therefore the action-scale compatibility row must use an enlarged uncertainty interval

$$
\Gamma_K^{\mathrm{fit}}
\pm
\epsilon_\Gamma,
$$

where $\epsilon_\Gamma$ includes tail, discretization, and root-solver projection error. If the tail error is unbounded, the fit/action comparison has status

$$
\texttt{gamma-fit-tail-unstable}.
$$

---

## 4. Scalar Inertia Reduction

The action row may produce a normal inertia operator rather than a scalar:

$$
\mathsf{M}_{B,\perp}.
$$

A scalar branch inertia is justified only if there is an $m_{\mathrm{car}}(B)>0$ such that

$$
\left\|
\mathsf{M}_{B,\perp}K
-
m_{\mathrm{car}}(B)K
\right\|
\le
\tau_M
$$

on the retained normal modes after quotienting gauge and tangential constraints. If this fails, then the correct retained equation is operator-valued:

$$
\mathsf{M}_{B,\perp}K
=
\frac{E_\epsilon(R_*)}{c_f^2}A,
$$

not the scalar equation $K=\Gamma_KA$.

Thus a good scalar fit can still be physically misleading if the branch inertia is anisotropic or mode-coupled on the retained dynamics subspace.

---

## 5. Lemma Target

**Lemma target: fitted scale identifiability.** On a support-complete, variational-force ledger with $\|A\|\ge A_0>0$, suppose:

1. the one-form curl test in [history-force-variationality-condition.md](history-force-variationality-condition.md) passes;
2. the scalar inertia reduction above passes with tolerance $\tau_M$;
3. tail and discretization errors produce finite $\epsilon_\Gamma$;
4. the action ledger emits $\Gamma_B=E_\epsilon/(m_{\mathrm{car}}c_f^2)$.

Then the fitted scalar is compatible with the action-derived scalar only if

$$
\operatorname{dist}
\left(
\Gamma_B,\,
\left[
\Gamma_K^{\mathrm{fit}}-\epsilon_\Gamma,\,
\Gamma_K^{\mathrm{fit}}+\epsilon_\Gamma
\right]
\right)
\le
\frac{\tau_K+\tau_M}{A_0}.
$$

If this inequality fails, the branch has an action-scale mismatch even if the least-squares residual decreases.

If the inequality passes and the Newton closure certificate also passes, the fitted scale may be promoted from

$$
\texttt{gamma-fit-only}
$$

to

$$
\texttt{gamma-action-compatible}.
$$

It becomes

$$
\texttt{scale-action-candidate}
$$

only after the energy, event, and inventory ledgers close on the same history convention.

---

## 6. Current $M=3$ Reading

The current $M=3$ arclength-inverse rows do not yet identify $\Gamma_K$ as an action-derived scale. They report fitted diagnostics and residual descent, but they do not yet emit:

1. a support-complete force ledger;
2. a passed one-form curl test;
3. a scalar branch inertia reduction;
4. an action-derived $\Gamma_B$;
5. a finite tail/discretization uncertainty interval for $\Gamma_K^{\mathrm{fit}}$.

Therefore their correct status is

$$
\texttt{gamma-fit-only},
\qquad
\texttt{gamma-fit-action-identifiability-open},
\qquad
\texttt{not-retained}.
$$

---

## 7. Required Output Fields

The next scale/action packet should emit:

| Field | Required payload |
| --- | --- |
| `force_norm_floor` | $A_0$ and the weighted norm convention for $A=P^\perp\widetilde{\mathbf{F}}$ |
| `gamma_fit` | $\Gamma_K^{\mathrm{fit}}$, $\|R_{\mathrm{fit}}\|$, and fit convention |
| `gamma_fit_uncertainty` | $\epsilon_\Gamma$ from tail, root, and discretization errors |
| `one_form_curl_status` | passed/failed status from the variationality row |
| `scalar_inertia_reduction` | $m_{\mathrm{car}}$, $\tau_M$, and operator residual |
| `gamma_action` | $\Gamma_B=E_\epsilon/(m_{\mathrm{car}}c_f^2)$ |
| `fit_action_distance` | distance from $\Gamma_B$ to the fitted uncertainty interval |
| `scale_decision` | `gamma-fit-only`, `gamma-action-compatible`, `scale-action-candidate`, or `gamma-fit-action-mismatch` |

Failure/status codes:

$$
\texttt{gamma-fit-action-identifiability-open},
\qquad
\texttt{gamma-fit-tail-unstable},
\qquad
\texttt{scalar-inertia-reduction-failed},
$$

$$
\texttt{gamma-fit-action-mismatch},
\qquad
\texttt{gamma-action-compatible},
\qquad
\texttt{not-retained}.
$$
