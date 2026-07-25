# Pressure-Dependent Noether Sea Constitutive Response

This focused priority packet is owned by [Master-Equation Closure](priorities.md). It defines the shared constitutive object required by the Lorentz/GR bridge, mass response, condensed-matter response, equation mapping, and cosmology consumers. It is a derivation target, not a promoted constitutive law.

## Claim Level

- Status: `defer-with-blocker`.
- Claim grade: candidate constitutive response.
- First blocker: no accepted EOM-evolved retained branch currently binds the pressure perturbation, transmitter-side acceleration records, causal wake accounts, Noether sea response, and downstream projections to one retained state.
- Barred substitution: toy pressure records, transmitter-side diagnostics without the causal wake accounts, archived braid quotients, empirical material fits, or observable-local coefficients cannot replace the same-state retained-branch input.

## Shared Constitutive Object

Let the retained Noether sea state at coarse-graining scale $\ell$ be

$$
\theta_{\mathrm{sea}}^{(\ell)}
=
\left(
\rho_{\text{NS}},
n,
\chi_{\text{sea}},
\Gamma_N,
\lambda,
\xi,
S_{ij},
\mathcal{M}_{\text{sea}}^{ab}
\right),
$$

where $n=\rho_{\text{NS}}/\rho_{\text{NS},0}$ is normalized Noether braid density and $\chi_{\text{sea}}=c_f/c_{\text{eff}}$ is the Noether sea delay factor. For one accepted retained branch record $\mathcal B_{\mathrm{ret}}$ and one declared pressure perturbation $\Delta P_\ell$, the target map is

$$
\mathcal C_{\mathrm{sea}}^{(\ell)}:
\left(
\mathcal B_{\mathrm{ret}},
\Delta P_\ell,
\theta_{\mathrm{sea}}^{(\ell)}
\right)
\longmapsto
\left(
\Delta\ln n,
\Delta\ln\chi_{\text{sea}},
\Delta\ln\Gamma_N,
\Delta S_{ij},
\Delta\mathcal M_{\text{sea}}^{ab}
\right).
$$

The same $\mathcal C_{\mathrm{sea}}^{(\ell)}$ record must feed every consumer. A separate fitted response for clocks, signal delay, inertia, effective metric, pressure, or cosmology is a failure, not closure.

## Transmitter-Side Intake

The constitutive record is admissible only when the unperturbed and perturbed states share:

$$
D_t=c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t),
\qquad
D_r=c_f-\hat{\mathbf r}_t\cdot\mathbf V_r(T_r),
\qquad
W^{\mathrm{acc}}=\frac{c_f}{|D_t|},
\qquad
\frac{dT_t}{dT_r}=\frac{D_r}{D_t}.
$$

The minimum intake is:

| Field | Same-record requirement |
| --- | --- |
| Retained identity | EOM run id, branch id, transmitter/receiver ids, retained history window, root ids, regulator state, and artifact hash. |
| Pressure row | $\Delta P_\ell$, scale $\ell$, analysis window, strain direction, and branch-preserving or branch-transition status. |
| Causal-hit records | $D_t$, $D_r$, $W^{\mathrm{acc}}$, $D_r/D_t$, retained-contribution list, sign margins, and negative controls on both pressure states. |
| Causal wake accounts | Accepted wake-state variables, transition status, and energy, momentum, angular-momentum, and boundary-flux accounts from the same causal update. |
| Noether sea state | $\rho_{\text{NS}}$, $n$, $\chi_{\text{sea}}$, $\Gamma_N$, $\lambda$, $\xi$, $S_{ij}$, and $\mathcal M_{\text{sea}}^{ab}$ before and after perturbation. |
| Reversibility | Explicit residual showing whether the row remains below the declared transport or branch-transition threshold. |
| Consumer projections | Clock, signal, inertia, effective-metric, or material readouts derived from the same constitutive row without private retuning. |

## First Executable Packet

The first target is `pressure_dependent_noether_sea_constitutive_response/v0`:

1. consume one accepted EOM-evolved retained branch with transmitter-side acceleration, separate signed root playback, and accepted causal wake accounts;
2. apply one signed subthreshold pressure pair $\{0,+\Delta P_\ell\}$ and one wrong-sign or record-mismatch negative control;
3. recompute the same retained root identities, $D_t$, $D_r$, $W^{\mathrm{acc}}$, $D_r/D_t$, causal wake state, and $\theta_{\mathrm{sea}}^{(\ell)}$ fields at both pressure states;
4. report the finite-difference response vector

   $$
   \mathbf R_P^{(\ell)}
   =
   \frac{1}{\Delta P_\ell}
   \left(
   \Delta\ln n,
   \Delta\ln\chi_{\text{sea}},
   \Delta\ln\Gamma_N,
   \Delta S_{ij},
   \Delta\mathcal M_{\text{sea}}^{ab}
   \right);
   $$

5. repeat at one smaller pressure step and one tighter numerical refinement;
6. do not advance if the branch identity changes without a declared transition, the finite difference does not settle, or any consumer requires a private coefficient row.

This packet protects one live derivation route and does not create a separate validation gate.

## Consumer Routing

| Consumer | Allowed use |
| --- | --- |
| Lorentz/GR bridge | Derive moving-clock, ruler, signal, and weak-field metric response from one shared medium record. |
| Mass response | Consume $\mathcal M_{\text{sea}}^{ab}$ only after transmitter-side exposure, causal wake accounts, and internal-energy records share the retained identity. |
| Condensed matter | Test reversible pressure/strain response separately from dissipative transport or branch transition. |
| Equation mapping | Project the shared state into observer-level rows without upgrading coefficients before acceptance. |
| Cosmology | Use the same constitutive state for effective metric, pressure, growth, and low-acceleration projections; no sector-local retuning. |

## Falsifiers

- The pressure perturbation changes the retained root or branch identity without a declared transition row.
- $D_t$, $D_r$, $W^{\mathrm{acc}}$, $D_r/D_t$, or a required causal wake account is missing or record-mismatched, or playback is reused as acceleration strength.
- The response vector fails to settle under smaller $\Delta P_\ell$ or tighter EOM refinement.
- Clock, signal, inertia, effective-metric, or material projections require mutually incompatible coefficient rows for the same state.
- A supposedly reversible row carries unlogged dissipation, excitation, radiation, or branch change.
- The derived response violates existing clock/signal, birefringence, dispersion, preferred-frame, or weak-field bounds.

## Promotion Boundary

Promotion targets are the Noether sea, Lorentz kinematics, emergent metric, proper-time, energy/mass-response, atomic, condensed-matter, and cosmology corpus documents. Promotion remains blocked until `v0` is populated from accepted EOM-evolved retained evidence and its shared-row and negative-control tests pass.
