# Same-Action Wake Noether Pullback — Local Storage/Current Decision

Date: 2026-07-12
Decision: **NON-UNIQUE WITH NAMED MISSING INPUT**
Claim level: priority-only structural derivation. No retained balanced Noether sea state is claimed, no global drain is exhibited or barred, no layer receives a derived share of $\hbar$, no corpus promotion is authorized, and no score movement follows.

Parent packets:

- [Retained-Sea Angular-Momentum Ward Identity and Transport Kernel](retained-sea-angular-momentum-ward-identity-and-transport-kernel.md)
- [Sub-Luminal Balanced-Cell Same-Record Ward Decider — Analytical Result](sub-luminal-balanced-cell-same-record-ward-decider-analytic-2026-07-11.md)

## Result in One Line

The symmetry-preserving nonlocal action candidate fixes a **global history charge across an absolute-time cut** for energy, momentum, and angular momentum, provided its Euler residual and endpoint leakage close on the same receiver-normal retained record. It does **not** uniquely pull those charges back to a spatial wake density and cell-face current. The missing physical input is a local wake-carrier localization and coupling rule, including its boundary and periodic-winding convention. Therefore the same action does not yet decide bounded wake storage versus boundary transport, and it does not decide which braid layer absorbs a share of $\hbar$.

## 1. Action Under Test and Its Prior Obligation

Write the symmetry-preserving regularized interaction action schematically as

$$
S_\eta[\{\mathbf X_i\}]
=
\int dT\sum_i\frac12\mu_{\mathrm{arch}}\|\mathbf V_i(T)\|^2
-\frac12\sum_{i,j}^{\mathrm{adm}}
\int dT_1\,dT_0\,
\mathcal K_{ij,\eta}(T_1,T_0),
$$

where the normalized characteristic-tail candidate uses

$$
\mathcal K_{ij,\mathrm{eff}}^{(\eta)}(T_1,T_0)
=
\frac{\kappa\sigma_{ij}|q_iq_j|}{c_f}
\Theta(T_1-T_0)
K_{\mathrm{eff}}^{(\eta)}
\!\left(r_{ij}(T_1,T_0),\tilde g_{ij}(T_1,T_0)\right).
$$

The endpoint-clear characteristic normalization removes the free characteristic term that would alter the time-cut wake charge while leaving the receiver Euler derivative unchanged. This is necessary, but it is not the spatial localization rule sought here.

Two prior obligations remain load-bearing:

1. the same action must reproduce the canonical receiver-normal branch force on the same retained roots, with $\epsilon_{\mathrm{var}}^{(\eta)}\to0$; and
2. history-window, period-cut, self-coincidence, and characteristic-endpoint leakage must vanish or be retained explicitly.

The present action is therefore still a conditional action candidate rather than a universal proved action for the Master Equation. The derivation below first grants those two conditions in order to test the stronger uniqueness question. The uniqueness result is negative even under that grant.

## 2. What Noether Symmetry Does Fix

For a time cut $T_\ast$, define the crossing domain

$$
X_{ij}(T_\ast)
=
\{(T_1,T_0):T_0\le T_\ast<T_1,\ T_1>T_0\},
$$

with the trivial coincidence branch excluded for $i=j$. Time translation and rotation give the candidate wake boundary charges

$$
E_{\mathrm w}^{(\eta)}(T_\ast)
=
\frac12\sum_{i,j}
\int_{X_{ij}(T_\ast)}
\partial_{T_1}\mathcal K_{ij,\mathrm{eff}}^{(\eta)}
\,dT_0\,dT_1,
$$

and

$$
\mathbf J_{\mathrm w}^{(\eta)}(T_\ast)
=
-\frac12\sum_{i,j}
\int_{X_{ij}(T_\ast)}
\mathbf X_i(T_1)\times
\nabla_{\mathbf X_i(T_1)}
\mathcal K_{ij,\mathrm{eff}}^{(\eta)}
\,dT_0\,dT_1.
$$

The corresponding momentum charge is obtained by deleting the factor $\mathbf X_i\times$. These are action-derived path-history charges: they count interaction links crossing the time cut, not a separately postulated continuous field.

On a retained branch chart $\mathfrak B$, restrict $X_{ij}$ to the active retained rows. The same-action ledgers then have the residual form

$$
\frac{d}{dT}
\left(K_\mu+E_{\mathrm w}^{(\eta)}\right)
=
\sum_i\mathbf V_i\cdot\mathbf R_i^{(\eta)}
+\mathcal B_E^{(\eta)}
+P_{\mathrm{ext}},
$$

$$
\frac{d}{dT}
\left(\mathbf J_{\mathrm{mech}}+\mathbf J_{\mathrm w}^{(\eta)}\right)
=
\sum_i\mathbf X_i\times\mathbf R_i^{(\eta)}
+\boldsymbol{\mathcal B}_J^{(\eta)}
+\boldsymbol\tau_{\mathrm{ext}}.
$$

Thus the action can fix the **total time-cut ledger** once the Euler and boundary residuals close. This already rules out manufacturing an arbitrary total wake charge independently of the action.

## 3. Attempted Spatial Pullback

For each interaction link crossing $T_\ast$, define the charge weights

$$
e_{ij}(T_1,T_0)
=
\frac12\partial_{T_1}
\mathcal K_{ij,\mathrm{eff}}^{(\eta)}(T_1,T_0),
$$

$$
\lambda_{ij,z}(T_1,T_0)
=
-\frac12
\left[
\mathbf X_i(T_1)\times
\nabla_{\mathbf X_i(T_1)}
\mathcal K_{ij,\mathrm{eff}}^{(\eta)}(T_1,T_0)
\right]_z.
$$

A candidate spatial pullback must choose normalized spatial assignment distributions

$$
\rho_{ij}(\mathbf x\mid T_1,T_0;T_\ast),
\qquad
\int_V\rho_{ij}\,dV=1,
$$

and then set

$$
e_{\mathrm w}(\mathbf x,T_\ast)
=
\sum_{i,j}\int_{X_{ij}(T_\ast)}
e_{ij}\rho_{ij}\,dT_0\,dT_1,
$$

$$
\ell_{\mathrm w,z}(\mathbf x,T_\ast)
=
\sum_{i,j}\int_{X_{ij}(T_\ast)}
\lambda_{ij,z}\rho_{ij}\,dT_0\,dT_1.
$$

These densities integrate to the action-derived time-cut charges for every normalized choice of $\rho_{ij}$. The bilocal worldline action does not select whether $\rho_{ij}$ is concentrated at emission, at reception, on the straight chord, on the expanding causal-wake surface, throughout a causal interior tail, or on another path having the same endpoints.

After choosing a density, the continuity equations determine only the divergences of the spatial currents:

$$
\partial_T\ell_{\mathrm w,z}
+\partial_iJ_{L_z,\mathrm w}^i
=
-s_z^{\mathrm{braid}}-s_z^{\mathrm{pair}}
+s_z^{\mathrm{wake,ext}},
$$

$$
\partial_Te_{\mathrm w}
+\partial_iJ_{E,\mathrm w}^i
=
-p^{\mathrm{mech}}
+p^{\mathrm{wake,ext}}.
$$

The action supplies the integrated left-hand sides through its boundary charges. It does not supply the spatial assignment distributions or the unique inverse of the divergence operator.

## 4. Spatial Non-Uniqueness Theorem

**Theorem.** A globally rotation- and time-translation-invariant bilocal worldline action, without locally resolved wake degrees of freedom or a declared spatial coupling extension, does not uniquely determine wake angular-momentum and energy density/current pairs.

**Proof.** Suppose $(\ell,J^i)$ is one local angular-momentum completion. For any sufficiently regular periodic vector field $P^i$ and antisymmetric field $U^{ij}=-U^{ji}$,

$$
\ell'
=
\ell-\partial_iP^i,
$$

$$
J'^i
=
J^i+\partial_TP^i+\partial_jU^{ij}
$$

obey the same local Ward identity because

$$
\partial_T\ell'+\partial_iJ'^i
=
\partial_T\ell+\partial_iJ^i.
$$

The integrated charge is unchanged when the boundary term from $P^i$ vanishes. The energy pair admits an independent transformation of the same form.

This is the ordinary improvement freedom. The bilocal action has an additional, earlier ambiguity: distinct normalized assignments $\rho_{ij}$ localize the same interaction-link charge on different spatial supports. Changing $\rho_{ij}$ changes which cell stores the charge and which cell face the corresponding transfer crosses while leaving the time-cut charge and the global symmetry variation unchanged.

On a periodic cell, two spatial routings can also differ by a noncontractible winding around the torus. Their difference is a divergence-free harmonic current. It changes the signed current through a chosen periodic face without changing the cell Ward source or the global time-cut charge. A global rotation or time translation cannot select that winding because its parameter is spatially constant.

Therefore the action-derived global charge is unique only up to its already-declared action boundary convention, while the local density/current representative remains non-unique. $\square$

## 5. Why the Characteristic Normalization Does Not Cure This

The characteristic-tail construction fixes a specific action-kernel ambiguity:

$$
K_{\mathrm{eff}}^{(\eta)}
\mapsto
K_{\mathrm{eff}}^{(\eta)}+H^{(\eta)}(u),
\qquad
u=\tilde g+\frac{r}{c_f},
$$

where $H^{(\eta)}(u)$ leaves the receiver Euler derivative unchanged but shifts the Noether boundary charge. Endpoint-clear normalization sets this term. That is enough to define the candidate **time-cut** charge of the normalized kernel.

It does not define $\rho_{ij}$, a cell-face crossing, a spatial route between the emission and reception endpoints, or the harmonic winding sector of a periodic cell. Kernel normalization and spatial localization are distinct obligations.

## 6. Consequences for the Two Blocked Decisions

### 6.1 Global drain

The same action can test whether the total mechanical-plus-wake ledger closes. It cannot, by global symmetry alone, decide whether a local braid torque is held as bounded nearby wake polarization, carried through a periodic face, or routed around a noncontractible periodic cycle. Therefore:

- a nonzero mechanical Ward defect is not yet a material drain;
- a bounded global time-cut charge is not proof of zero local transport;
- a chosen link-routing current is not physical until the theory fixes the routing or an operational boundary coupling measures it; and
- the global-drain verdict remains **UNDECIDED**, now at a more precise blocker than “derive the Noether charge.”

The blocker is the absent **local wake-carrier localization and coupling rule**.

### 6.2 Layer share of $\hbar$

The action can fix the total angular-momentum charge of a closed retained record after the action residual closes. It does not uniquely decompose that charge among the inner, middle, and outer braid layers and the in-flight wake. Changing the spatial assignment or improvement term transfers charge between adjacent layer windows and their boundary currents without changing the total Noether charge.

Consequently no layer is presently licensed to “absorb the $\hbar$.” A layer partition requires a declared layer-local coupling or layer-boundary ownership rule that is evaluated on the same retained history. The spinor-return program and the total-spin ledger remain separate until that rule and the retained $2\pi/4\pi$ history lift are both populated.

## 7. Named Missing Physical Input

The theory must supply one of the following equivalent physical completions, with the first preferred because it makes the operational meaning explicit.

### A. Locally coupled wake action

Extend the action so that rotations and time translations can be localized over the Euclidean spatial chart. For compactly supported local parameters $\theta_z(\mathbf x,T)$ and $\tau(\mathbf x,T)$, require the on-shell variation to take the form

$$
\delta S_{\mathrm{loc}}
=
\int dT\,dV
\left(
\ell_z\,\partial_T\theta_z
+J_{L_z}^i\,\partial_i\theta_z
+e\,\partial_T\tau
+J_E^i\,\partial_i\tau
\right)
+\delta S_{\mathrm{ext}}.
$$

The extension must declare:

1. the local wake state or spatial support carried by each emission-to-reception link;
2. how a local rotation or clock perturbation couples along that support;
3. which action boundary and improvement terms are physically identified;
4. the periodic unwrapping and noncontractible-winding convention; and
5. the layer-window or layer-boundary rule used for the inner/middle/outer partition.

Then $\ell_z$, $J_{L_z}^i$, $e$, and $J_E^i$ are response derivatives of the same locally coupled action rather than freely chosen completions.

### B. Resolved wake-event transport law

Alternatively, define a same-record event measure that assigns each emission, in-flight wake segment or surface element, reception, spatial-boundary crossing, and periodic image crossing to one storage/current row. This is physical input beyond the present force law even if it is encoded without a new substrate field. It must reduce to the same global time-cut charges above and must be invariant under resolution, regulator, memory-window, and periodic-image refinement.

Neither route is supplied by the current bilocal action alone. Adding only a constitutive coefficient after the force calculation would not close the gap because it would choose a current without fixing the charge localization that the current transports.

## 8. Exact Next Derivation Contract

The next proof-moving derivation is not another global Noether calculation. It is a **local-coupling extension test**:

1. start from the endpoint-clear normalized characteristic-tail action;
2. introduce compactly supported $\theta_z(\mathbf x,T)$ and $\tau(\mathbf x,T)$ on one sub-luminal retained periodic chart;
3. specify the spatial support and periodic winding of every bilocal interaction link;
4. differentiate the locally coupled action to obtain $(\ell_z,J_{L_z}^i,e,J_E^i)$;
5. prove that constant $\theta_z$ and constant $\tau$ reduce to the existing global time-cut charges;
6. prove that the receiver variation still yields the canonical receiver-normal force with vanishing Euler residual;
7. test whether the remaining improvement freedom changes the period-averaged face flux or layer-integrated shares; and
8. only if those observables are invariant, apply the result to the balanced-cell drain and layer partition.

If no local coupling can be specified without adding new wake state, the structural conclusion strengthens: the present architrino worldline ontology is insufficient to define local wake transport, and a locally resolved wake carrier becomes a required ontological addition rather than optional bookkeeping.

## Promotion Disposition

- Classification: **priority-only**.
- Decision: **non-unique with named missing input**.
- Promotion: **defer with blocker**.
- Durable finding: global Noether charges and local storage/current representatives are different mathematical objects; the present same action can supply the first conditionally but not the second uniquely.
- No script, solver, generator, or reader-facing corpus change follows from this memo.

Closure goal: construct and test a locally coupled wake action or resolved wake-event transport law whose response uniquely fixes the period-averaged face flux and layer-integrated angular-momentum shares while preserving the receiver-normal Master Equation on the same retained record.
