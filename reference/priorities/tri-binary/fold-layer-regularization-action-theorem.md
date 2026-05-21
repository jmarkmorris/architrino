# Fold-Layer Regularization Action Theorem

Promotion status: `priority-only`. This packet states the theorem target required before a self/fold-layer contribution may enter the same-level tri-binary force ledger. It follows from [same-source-self-root-exclusion-lemma.md](same-source-self-root-exclusion-lemma.md): an ordinary same-curve self root cannot be retained with a positive Jacobian floor in the fixed-speed arclength chart, so any fixed-speed self/fold contribution must be a regulated action object with energy and event accounting. A bounded variable-speed ordinary self-hit is a separate admissibility route only under [variable-speed-factor-extension.md](variable-speed-factor-extension.md).

This packet does not introduce a fold-layer into the current $M=3$ rows. It defines the conditions under which one would be mathematically admissible.

---

## 1. Regulated Fold Object

Let $\varepsilon>0$ be a fold-layer regulator. A regulated fold contribution is a family of action terms

$$
\mathcal{S}_{\mathrm{fold}}^{\varepsilon}[Y]
$$

whose normal first variation has the form

$$
\delta\mathcal{S}_{\mathrm{fold}}^{\varepsilon}
=
\int_0^L
\sum_i
\mathbf{F}_{i,\mathrm{fold}}^{\varepsilon}(\lambda)
\cdot
\delta\mathbf{Y}_i^\perp(\lambda)
d\lambda
+
\mathcal{B}_{\mathrm{fold}}^{\varepsilon}.
$$

The boundary/event term $\mathcal{B}_{\mathrm{fold}}^{\varepsilon}$ must be ledgered. It cannot be discarded if it carries energy, momentum, angular momentum, charge, source provenance, or Noether-Sea exchange.

For a bounded variable-speed branch, the fold action must use the causal-time measure

$$
du_i
=
\frac{d\lambda_i}{\nu_i(\lambda_i)}.
$$

The corresponding first variation is

$$
\delta\mathcal{S}_{\mathrm{fold}}^\varepsilon
=
\sum_i
\int_0^{H_*}
\mathbf{F}_{i,\mathrm{fold}}^\varepsilon(u)
\cdot
\delta\mathbf{Y}_i^\perp(u)\,du
+
\mathcal{B}_{\mathrm{fold}}^\varepsilon,
$$

or equivalently

$$
\delta\mathcal{S}_{\mathrm{fold}}^\varepsilon
=
\sum_i
\int_0^{L_i}
\mathbf{F}_{i,\mathrm{fold}}^\varepsilon(\lambda)
\cdot
\delta\mathbf{Y}_i^\perp(\lambda)
\frac{d\lambda}{\nu_i(\lambda)}
+
\mathcal{B}_{\mathrm{fold}}^\varepsilon.
$$

The event trigger for a singular fold remains a root/Jacobian degeneracy,

$$
G_{ii}=0,
\qquad
J_{ii}=0,
\qquad
\partial_\eta^2G_{ii}\ne0,
$$

but the variable-speed self-hit route in [variable-speed-factor-extension.md](variable-speed-factor-extension.md) is different: it requires $G_{ii}=0$ with a positive Jacobian floor and a short, ledgered speed-factor excursion. The energy ledger for that route must include the variable kinetic term

$$
K_i=\frac12c_f^2\nu_i^2
$$

in the branch normalization used by the action row.

The total force becomes

$$
\widetilde{\mathbf{F}}_i^{\varepsilon}
=
\widetilde{\mathbf{F}}_{i,\mathrm{partner}}
+
\widetilde{\mathbf{F}}_{i,\mathrm{cross}}
+
\widetilde{\mathbf{F}}_{i,\mathrm{fold}}^{\varepsilon},
$$

only after $\mathcal{S}_{\mathrm{fold}}^{\varepsilon}$ is declared.

---

## 2. Uniform Admissibility

A fold regulator is admissible on a branch chart only if there exist constants independent of $\varepsilon$ such that

$$
\|\mathbf{F}_{\mathrm{fold}}^{\varepsilon}\|
\le
C_F,
$$

$$
\|D\mathbf{F}_{\mathrm{fold}}^{\varepsilon}\|
\le
C_{DF},
$$

and

$$
|\mathcal{B}_{\mathrm{fold}}^{\varepsilon}|
\le
C_B
$$

on the retained support, memory, and noncollision chart. These bounds must be compatible with:

1. the delayed-force Lipschitz envelope;
2. the Newton/Krawczyk closure constants;
3. the collocation-refinement envelope;
4. the work one-form curl test;
5. the Noether action conservation theorem.

If any bound diverges as $\varepsilon\to0$, the fold-layer status is

$$
\texttt{fold-layer-singular-limit}.
$$

---

## 3. Weak-Limit Condition

The fold force has a retained weak limit if, for every admissible normal test variation $\psi$,

$$
\lim_{\varepsilon\to0}
\int_0^L
\sum_i
\mathbf{F}_{i,\mathrm{fold}}^{\varepsilon}
\cdot
\psi_i^\perp
d\lambda
=
\int_0^L
\sum_i
\mathbf{F}_{i,\mathrm{fold}}^{0}
\cdot
\psi_i^\perp
d\lambda
$$

and the convergence is uniform over the finite-mode test basis used by the solver. The residual error is

$$
\epsilon_{\mathrm{fold}}(\varepsilon)
=
\sup_{\|\psi\|\le1}
\left|
\int
\sum_i
\left(
\mathbf{F}_{i,\mathrm{fold}}^{\varepsilon}
-
\mathbf{F}_{i,\mathrm{fold}}^{0}
\right)
\cdot
\psi_i^\perp
d\lambda
\right|.
$$

The retained fold row requires

$$
\epsilon_{\mathrm{fold}}(\varepsilon)
\le
\tau_{\mathrm{fold}}
$$

or an exact symbolic limit.

---

## 4. Action Exactness And Conservation

The regulated fold one-form must be included in the total work one-form:

$$
\omega_{\mathrm{tot}}^{\varepsilon}
=
\omega_{\mathrm{delay}}
+
\omega_{\mathrm{fold}}^{\varepsilon}.
$$

The exactness row becomes

$$
\frac{
\|\mathcal{C}_{\mathrm{tot}}^{\varepsilon}\|_{\mathrm{F}}
}{
1+\|W_{\mathrm{tot}}^{\varepsilon}\|_{\mathrm{F}}
}
\le
\epsilon_{\mathrm{curl}}.
$$

If the delayed-force one-form was non-exact, the fold contribution may close it only if the combined curl passes. A fold term that reduces the pointwise dynamics residual but worsens the curl is not an action-compatible branch row.

The Noether conservation error also acquires the fold boundary term:

$$
|\mathcal{R}_{\xi}|
\le
C_\xi\|\mathrm{EL}_B^\varepsilon\|
+
\epsilon_{\mathrm{curl}}
+
\epsilon_{\mathrm{tail}}
+
\epsilon_{\mathrm{disc}}
+
\epsilon_{\mathrm{endpoint}}
+
\epsilon_{\mathrm{fold}}.
$$

---

## 5. Theorem Target

**Theorem target: fold-layer admissibility.** A regularized fold-layer may enter a retained same-level tri-binary branch only if:

1. it is generated by an explicit regulated action $\mathcal{S}_{\mathrm{fold}}^{\varepsilon}$;
2. its force, derivative, and event-boundary terms are uniformly bounded on the retained chart;
3. it has a weak finite-mode limit or a declared finite-regulator interpretation;
4. the combined work one-form exactness row passes;
5. the scale/action, Noether conservation, and event ledgers include the fold terms;
6. the branch still passes root/Jacobian, support, memory, noncollision, closure, convergence, and stability rows.

Then the fold contribution is an admissible extension of the force/action ledger. It is not a hidden ordinary same-source root, and it does not bypass the conservation or event rows.

Proof route:

1. same-source exclusion removes ordinary arclength self roots as retained positive-delay roots;
2. a regulated action supplies a legitimate variational force contribution;
3. uniform bounds keep the closure and refinement certificates finite;
4. weak convergence or finite-regulator status gives a well-defined residual row;
5. combined curl and Noether identities protect action and conservation compatibility.

---

## 6. Current Dynamics Reading

The current exact-antipodal $M=3$ rows do not include a fold-layer. That is a deliberate and currently correct status: the pure partner/cross-binary ledger should continue until a support-complete closure or obstruction certificate decides whether an extra force channel is necessary.

If a future run opens the fold route, its initial status is

$$
\texttt{fold-layer-action-row-open},
\qquad
\texttt{fold-layer-regularization-unproven},
\qquad
\texttt{not-retained}.
$$

It can become `fold-layer-admissible` only after the theorem rows above pass.

---

## 7. Required Output Fields

Future fold-layer packets should emit:

| Field | Required payload |
| --- | --- |
| `fold_regulator` | $\varepsilon$, finite-regulator or weak-limit convention, and allowed range |
| `fold_action` | $\mathcal{S}_{\mathrm{fold}}^{\varepsilon}$ and boundary/event term |
| `fold_force` | $\mathbf{F}_{\mathrm{fold}}^{\varepsilon}$ and projection convention |
| `uniform_bounds` | $C_F$, $C_{DF}$, $C_B$, and chart on which they hold |
| `fold_weak_limit` | $\epsilon_{\mathrm{fold}}(\varepsilon)$ or symbolic weak-limit proof |
| `combined_curl` | $\mathcal{C}_{\mathrm{tot}}^{\varepsilon}$ and exactness status |
| `fold_event_ledger` | energy, momentum, angular momentum, charge, source-provenance, and Noether-Sea entries |
| `fold_closure_decision` | `fold-layer-admissible`, `fold-layer-open`, or first failure code |

Failure/status codes:

$$
\texttt{fold-layer-action-row-open},
\qquad
\texttt{fold-layer-regularization-unproven},
\qquad
\texttt{fold-layer-singular-limit},
$$

$$
\texttt{fold-layer-curl-fail},
\qquad
\texttt{fold-layer-event-ledger-open},
\qquad
\texttt{not-retained}.
$$
