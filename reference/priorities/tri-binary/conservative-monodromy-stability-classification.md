# Conservative Monodromy Stability Classification

Promotion status: `priority-only`. This packet refines [root-ledger-floquet-stability-certificate.md](root-ledger-floquet-stability-certificate.md), [root-dependent-variational-equation.md](root-dependent-variational-equation.md), [second-variation-action-stability-theorem.md](second-variation-action-stability-theorem.md), [noether-action-conservation-closure-theorem.md](noether-action-conservation-closure-theorem.md), [noether-neutral-mode-reduction-theorem.md](noether-neutral-mode-reduction-theorem.md), [krein-elliptic-stability-theorem.md](krein-elliptic-stability-theorem.md), [energy-momentum-orbital-stability-theorem.md](energy-momentum-orbital-stability-theorem.md), and [medium-response-constitutive-closure-theorem.md](medium-response-constitutive-closure-theorem.md). It separates conservative branch stability from dissipative attraction.

The central warning is:

$$
\text{action/Noether closure}
\ne
\text{attracting limit cycle}.
$$

If the retained ledger is conservative, the return map should preserve a boundary two-form on the reduced history chart. In that case transverse multipliers are constrained by reciprocal pairing. True contraction requires a declared dissipative, storage, medium-response, or boundary-exchange row.

---

## 1. Boundary Two-Form

Let $B$ be a support-complete dynamics/action branch with total action

$$
\mathcal{S}_{\mathrm{tot}}
=
\mathcal{S}_{\mathrm{car}}
+
\mathcal{S}_{\mathrm{hist}}
+
\mathcal{S}_{\mathrm{constraints}}
+
\mathcal{S}_{\mathrm{sea/event}}.
$$

On a root-regular history chart, the first variation has the form

$$
\delta\mathcal{S}_{\mathrm{tot}}
=
\int_{t_-}^{t_+}
\langle \mathrm{EL}_B,\delta Z\rangle dt
+
\Theta_{t_+}(\delta Z_{t_+})
-
\Theta_{t_-}(\delta Z_{t_-})
+
\mathcal{R}_{\mathrm{bdry}}.
$$

Here $\Theta_t$ is the boundary one-form induced by the carrier, history, constraint, and event terms on the declared history variables. Define the boundary two-form

$$
\Omega_B
=
d\Theta_B.
$$

For delayed-root dynamics, $\Omega_B$ is not valid unless the root sensitivities, endpoint convention, and action ledger are the same as the force row. A frozen-root boundary form has status

$$
\texttt{presymplectic-frozen-root-invalid}.
$$

---

## 2. Presymplectic Monodromy Identity

Let $\xi$ and $\zeta$ solve the root-dependent variational equation on the fixed ledger. The second variation identity is

$$
\delta^2\mathcal{S}_{[t_-,t_+]}[\xi,\zeta]
-
\delta^2\mathcal{S}_{[t_-,t_+]}[\zeta,\xi]
=
\Omega_{t_+}(\xi_{t_+},\zeta_{t_+})
-
\Omega_{t_-}(\xi_{t_-},\zeta_{t_-})
+
\mathcal{E}_{\mathrm{curl/tail/disc/end}}.
$$

When the Euler-Lagrange, curl, tail, discretization, and endpoint errors vanish, the period-$L$ monodromy satisfies

$$
\Omega_B(\Phi_B(L)\xi,\Phi_B(L)\zeta)
=
\Omega_B(\xi,\zeta).
$$

After imposing the return section and quotienting declared gauge and branch-neutral directions, the reduced monodromy obeys the presymplectic audit

$$
M_B^T\Omega_{\perp}M_B
=
\Omega_{\perp}
+
E_{\Omega},
$$

where $E_{\Omega}=0$ in the exact conservative limit. The packet must emit

$$
\frac{\|E_{\Omega}\|}
{1+\|\Omega_{\perp}\|}
\le
\epsilon_{\Omega}
$$

before using conservative multiplier pairing as a certificate.

---

## 3. Reciprocal Multiplier Constraint

If $\Omega_{\perp}$ is nondegenerate and

$$
M_B^T\Omega_{\perp}M_B=\Omega_{\perp},
$$

then $M_B$ is symplectic on the reduced transverse quotient. Consequently:

$$
\det M_B=1,
$$

and if $\mu$ is a transverse multiplier, then

$$
\mu^{-1}
$$

is also a multiplier. For real matrices, the conjugates also appear:

$$
\mu,\quad
\overline{\mu},\quad
\mu^{-1},\quad
\overline{\mu}^{-1}.
$$

Therefore a strict attracting limit-cycle condition

$$
\max_{\mu\in\operatorname{spec}_{\perp}(M_B)}
|\mu|
\le
1-\epsilon_{\mathrm{stab}}
$$

is incompatible with a nondegenerate conservative quotient unless the transverse space is trivial or the packet has omitted a dissipative/exchange channel. The correct conservative stability targets are instead spectral boundedness, elliptic stability, KAM/NHIM-style persistence where applicable, or explicit hyperbolic saddle classification.

---

## 4. Conservative Stability Classes

For a conservative retained branch, use these classes:

| Class | Spectral condition | Meaning |
| --- | --- | --- |
| `conservative-elliptic-candidate` | all non-gauge transverse multipliers satisfy $||\mu|-1|\le\epsilon_{\mathrm{ell}}$ and have nonzero Krein signature where defined | linear boundedness candidate, not attraction |
| `conservative-nhim-candidate` | declared neutral tangent bundle plus reciprocal hyperbolic transverse pairs with a domination gap | persistent invariant-manifold candidate, not attracting unless exchange is added |
| `conservative-hyperbolic-saddle` | some reciprocal pair has $|\mu|>1+\epsilon_{\mathrm{hyp}}$ | dynamically unstable in at least one transverse direction |
| `conservative-parabolic-open` | extra unit multipliers or Jordan growth remain after gauge quotient | stability unresolved; likely missing neutral-family or event row |
| `action-saddle-branch` | the quotient Hessian has negative directions | action instability even before nonlinear return tests |

The second-variation row supplies Morse information; [krein-elliptic-stability-theorem.md](krein-elliptic-stability-theorem.md) supplies the unit-circle signature and collision audit. The Floquet row supplies multiplier locations. All three must use the same root ledger after [noether-neutral-mode-reduction-theorem.md](noether-neutral-mode-reduction-theorem.md) removes expected neutral directions.

---

## 5. Dissipative Or Exchange Stability

An attracting retained branch requires a declared nonconservative exchange mechanism. The admissible channels are:

1. a medium-response storage/dissipation row from [medium-response-constitutive-closure-theorem.md](medium-response-constitutive-closure-theorem.md);
2. a boundary/event exchange row in the total action;
3. an explicitly open subsystem where the omitted variables carry away action or energy with provenance.

For a medium response, the packet should emit

$$
\frac{d}{d\lambda}\mathcal{E}_{\mathrm{sea}}
=
\mathcal{P}_{\mathrm{sea}}
-
\mathcal{D}_{\mathrm{sea}}
+
\mathcal{R}_{\mathrm{sea},E},
\qquad
\mathcal{D}_{\mathrm{sea}}\ge0.
$$

The linear dissipative quadratic form is

$$
D_B[\xi,\xi]
=
\delta^2
\int_0^L
\mathcal{D}_{\mathrm{sea}}\,d\lambda
[\xi,\xi].
$$

If

$$
D_B[\xi,\xi]
\ge
d_B\|\xi\|_{\mathscr{H}}^2
$$

on the transverse quotient and the storage/action Hessian is positive, then an action-energy contraction row may be stated:

$$
\mathcal{E}_{\mathrm{lin}}(M_B\xi)
\le
(1-\alpha_B)\mathcal{E}_{\mathrm{lin}}(\xi)
+
\epsilon_{\mathrm{exch}}\|\xi\|^2.
$$

Only then may a strict transverse contraction status be emitted:

$$
\texttt{dissipative-attractor-candidate}.
$$

Without such a row, a packet that reports all transverse multipliers strictly inside the unit disk while also claiming conservative Noether closure must exit with

$$
\texttt{floquet-conservative-contraction-incompatible}.
$$

---

## 6. Theorem Target

**Theorem target: conservative monodromy classification.** Suppose a same-level branch passes support-complete dynamics closure, root-dependent variational differentiability, action exactness, action-derived scale, Noether conservation closure, and the boundary two-form audit. If the reduced boundary two-form is nondegenerate on the transverse quotient and the monodromy preserves it to tolerance, then the transverse multiplier spectrum has reciprocal pairing to the same tolerance. The branch cannot be classified as an attracting limit cycle on that conservative ledger.

If a medium-response or boundary-exchange row supplies positive transverse dissipation and passes the matching Noether/event provenance checks, then an attracting classification may be tested by the dissipative action-energy contraction inequality instead of by conservative reciprocal pairing.

Proof route:

1. the root-regular action gives a boundary one-form $\Theta_B$ on the history chart;
2. the skew part of the second variation is the boundary two-form difference plus certified errors;
3. solutions of the variational equation make the interior skew term vanish;
4. the period map therefore preserves $\Omega_B$ on the quotient;
5. nondegenerate preservation gives reciprocal multiplier pairing;
6. strict contraction requires a nonconservative exchange term with a positive dissipation quadratic form.

---

## 7. Output Schema And Current Reading

Future stability packets should emit:

| Field | Required content |
| --- | --- |
| `boundary_one_form` | $\Theta_B$ or finite-dimensional boundary-gradient row from the same action ledger |
| `boundary_two_form` | $\Omega_B=d\Theta_B$ after gauge and branch-neutral quotient |
| `presymplectic_audit` | $\|M_B^T\Omega_{\perp}M_B-\Omega_{\perp}\|/(1+\|\Omega_{\perp}\|)$ |
| `omega_rank` | rank and nullity of $\Omega_{\perp}$ after quotient |
| `reciprocal_multiplier_audit` | paired multiplier residuals $\mu\mu'-1$ |
| `conservative_stability_class` | elliptic, NHIM, hyperbolic-saddle, parabolic-open, or not applicable |
| `dissipation_quadratic_form` | $D_B$ and storage/action-energy contraction row if attraction is claimed |
| `stability_classification_decision` | first passing or failing status |

Failure/status codes:

$$
\texttt{presymplectic-form-open},
\qquad
\texttt{presymplectic-frozen-root-invalid},
\qquad
\texttt{omega-rank-nullity-unresolved},
$$

$$
\texttt{reciprocal-multiplier-pairing-fail},
\qquad
\texttt{floquet-conservative-contraction-incompatible},
\qquad
\texttt{medium-damping-required},
$$

$$
\texttt{dissipative-attractor-candidate},
\qquad
\texttt{conservative-elliptic-candidate},
\qquad
\texttt{conservative-hyperbolic-saddle}.
$$

Current $M=3$ rows have no support-complete dynamics/action branch, no boundary two-form, and no monodromy. Their stability status remains

$$
\texttt{root-ledger-floquet-stability-open},
\qquad
\texttt{presymplectic-form-open},
\qquad
\texttt{not-retained}.
$$
