# EQ-11 And EQ-20 Gravity / Dark-Energy Constitutive-Response Packet

## Workstream Metadata

- Kind: `priority-packet`
- Status: `draft`
- Worker mode: `priority packet`
- Owned IDs: `EQ-11`, `EQ-20`
- Owned output file: `reference/priorities/mapping-equations/eq-11-20-gravity-dark-energy-packet.md`
- Source priority files: [Equation Mapping Internal Priority](priorities.md), [Equation Mapping Detail](equation.md)
- Related packets: [EQ-07 Through EQ-10 And EQ-17 Through EQ-19 Effective Metric / Cosmology Packet](eq-07-10-17-19-effective-metric-cosmology-packet.md), [EQ-06, EQ-24, And EQ-25 Continuum, Medium, And Thermodynamic Closure Packet](eq-06-24-25-continuum-medium-thermo-packet.md)
- Scope: priority-only; no reader-facing corpus edits in this packet
- Claim level: internal/candidate

## Closure Thesis

`EQ-11` and `EQ-20` should be closed as one Noether sea constitutive-response problem. The weak-gravity limit and the dark-energy pressure row are not separate fitted sectors. They are two projections of one retained Noether sea record:

$$
\Theta_{11\text{-}20}^{(W)}
\longmapsto
\left(
\Phi_{\mathrm{eff}},
G_{\mathrm{eff}},
T_{\mu\nu}^{\mathrm{eff}},
g_{\mu\nu}^{\mathrm{eff}},
\rho_{\mathrm{DE,eff}},
p_{\mathrm{DE,eff}},
w_{\mathrm{eff}},
\Lambda_{\mathrm{eff}}
\right).
$$

The substrate remains absolute time plus Euclidean void. Poisson, Einstein, $\Lambda$, and dark-energy equation-of-state equations are observer-level recovery targets. The native object is the Noether sea stress, density, pressure, relaxation, and effective-coupling record that produces those observer variables without hidden retuning.

The same record must support:

- local Newtonian acceleration and the Poisson benchmark;
- spatial-compliance and curvature readouts used by the effective metric and PPN rows;
- cosmological effective pressure and $\Lambda_{\mathrm{eff}}$ readouts;
- shared $G_{\mathrm{eff}}$ use in weak gravity, Friedmann-style bookkeeping, structure growth, and low-acceleration benchmarks.

If weak gravity requires one Noether sea state while dark energy requires another, the packet fails by `equation_map.hidden_retune`.

## Packet Attack Card

- Dated score snapshot: the `6/23` ledger records `EQ-11` and `EQ-20` at `3`. This packet preserves the assessment rationale but does not update [equation.md](equation.md), the sole current score authority.
- Closure driver: one retained $\Theta_{11\text{-}20}^{(\ell,W)}$ record must produce the weak-gravity Poisson/curvature readout and the dark-energy pressure/$\Lambda_{\mathrm{eff}}$ readout through the same Noether sea constitutive-response component.
- Exact first blockers: the provider-backed `EQ-20` pressure slice, accepted `EQ-11` weak-gravity `theta_11_20` slice, shared `EQ-11`/`EQ-20` constitutive residual, accepted `theta_W` slice, and accepted downstream output-projection slice all report populated status with `nextBlocker=null`. This is still score-neutral: growth, CMB, and broader low-acceleration consumers remain open downstream.
- First implementation target for this packet: carry the accepted shared record into growth, CMB, and broader low-acceleration consumers without changing the accepted density provider, pressure projection, `theta_cos` handoff, `theta_11_20` weak-gravity evidence, `theta_W` evidence, or output-projection evidence. No score change follows until those downstream families survive without hidden retuning.
- Smallest accepted evidence objects now present for `EQ-20`: [eq20-delta-p-eff-pressure-projection-report.v1.json](../../../scripts/equation-mapping/eq20-delta-p-eff-pressure-projection-report.v1.json), which consumes the accepted density provider and adds outer-binary strain, release-channel, stress/tension, pressure-law, effective-density, effective-pressure, effective-coupling, effective-$\Lambda$, provenance, and no-hidden-retune rows on the same retained window; plus [effective-frw-theta-cos-handoff.v1.json](../../../scripts/equation-mapping/effective-frw-theta-cos-handoff.v1.json), which binds the effective-FRW, Friedmann, continuity, fixed-void, pressure-handoff, and no-hidden-retune rows to `theta_cos_FRW_handoff_0001`.
- Smallest accepted evidence object now present for `EQ-11`: [eq11-theta-11-20-weak-gravity-evidence.v1.json](../../../scripts/equation-mapping/eq11-theta-11-20-weak-gravity-evidence.v1.json), consumed by [eq11-weak-gravity-constitutive-theta-11-20-accepted.v1.json](../../../scripts/equation-mapping/eq11-weak-gravity-constitutive-theta-11-20-accepted.v1.json). The shared residual object is [eq11-20-shared-constitutive-residual.v1.json](../../../scripts/equation-mapping/eq11-20-shared-constitutive-residual.v1.json).
- Smallest accepted evidence object now present for `theta_W`: [effective-metric-theta-w-evidence.v1.json](../../../scripts/equation-mapping/effective-metric-theta-w-evidence.v1.json), consumed by [effective-metric-weak-field-theta-w-accepted.v1.json](../../../scripts/equation-mapping/effective-metric-weak-field-theta-w-accepted.v1.json).
- Smallest accepted downstream output-projection object now present: [noether-sea-density-compression-provider-output-projection.v1.json](../../../scripts/spacetime/noether-sea-density-compression-provider-output-projection.v1.json), consumed by [noether-sea-density-compression-provider-surface-slice-output-projection.v1.json](../../../scripts/spacetime/noether-sea-density-compression-provider-surface-slice-output-projection.v1.json) for `delta_N`, `delta_gamma_ij`, `delta_G_eff`, and `delta_a_star`.
- Smallest next artifact: a growth, CMB, and low-acceleration no-retune consumer sweep that consumes the accepted shared record and fails on any private $G_{\mathrm{eff}}$, pressure, relaxation, `theta_W`, or `delta_a_star` retune.

## Standard Equations And Regimes

| ID | Standard equation / regime | Comparison status |
| --- | --- | --- |
| `EQ-11` | Poisson benchmark: $\nabla^2\Phi_N=4\pi G\rho$. Einstein benchmark: $G_{\mu\nu}+\Lambda g_{\mu\nu}=8\pi GT_{\mu\nu}/c_0^4$. | Observer-level weak-gravity and curvature recovery from Noether sea constitutive response; not substrate curvature. |
| `EQ-20` | Dark-energy benchmark: $p=w\rho c_0^2$, with acceleration when $w < -1/3$ in the effective cosmology comparison. | Observer-level pressure and $\Lambda_{\mathrm{eff}}$ recovery from Noether sea tension, pressure, and relaxation; not fitted vacuum energy by itself. |

## Direct Geometry Layer

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Negative control required for advancement | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Poisson weak-gravity benchmark | $\Phi_{\mathrm{eff}}$, $\rho_{\mathrm{src}}^{\mathrm{eff}}$, $G_{\mathrm{eff}}$, $\mathcal S_{\mathrm{sea}}^\Phi$, and $R_\Phi^{11}$ projected from one Noether sea and source-loading record. | Accepted `theta_11_20` with source-backed Noether sea, source loading, constitutive-response, effective-coupling, and Poisson rows. | $\Theta_{\mathrm{sea}}^{(\ell,W)}$, $\Theta_{\mathrm{src}}^{(W)}$, $\mathcal C_{\mathrm{NS}}$, and $\mathcal L_{E\mathbf p\mathbf J}^{(W)}$ must share one window and carrier identity. | `equation_map.no_sea_constitutive_record`, `accepted_without_evidence_source`, and unledgered matter loading. | [eq11-theta-11-20-weak-gravity-evidence.v1.json](../../../scripts/equation-mapping/eq11-theta-11-20-weak-gravity-evidence.v1.json). |
| Effective Einstein/curvature readout | $g_{\mu\nu}^{\mathrm{eff}}$, $T_{\mu\nu}^{\mathrm{eff}}$, $\Lambda_{\mathrm{eff}}$, $G_{\mathrm{eff}}$, and $R_{\mu\nu}^{11}$ as observer-level metric residuals. | Accepted `theta_11_20` plus accepted `theta_W` effective-metric/PPN handoff rows. | Curvature, PPN, spatial-compliance, Shapiro/lensing, source-loading, and weak-gravity acceleration rows must consume the same constitutive coefficients. | `gravity.scalar_only_half_test`, local-gravity spoilage, and scalar-only acceleration closure. | Accepted weak-gravity evidence plus the shared [eq11-20-shared-constitutive-residual.v1.json](../../../scripts/equation-mapping/eq11-20-shared-constitutive-residual.v1.json) and accepted [effective-metric-theta-w-evidence.v1.json](../../../scripts/equation-mapping/effective-metric-theta-w-evidence.v1.json). |
| Dark-energy pressure and equation-of-state row | $p_{\mathrm{sea}}$, $\mathcal T_{\mathrm{sea}}^{ab}$, $\tau_{\mathrm{rel}}$, $p_{\mathrm{DE,eff}}$, $\rho_{\mathrm{DE,eff}}$, $w_{\mathrm{eff}}$, $R_p^{20}$, and $R_w^{20}$. | Accepted `theta_sea_rho_NS` and accepted pressure/tension/relaxation rows feeding the `EQ-20` residual. | Density compression, pressure, tension, relaxation, effective density, effective pressure, coupling, source provenance, and FRW handoff ids must remain on one retained window. | `dark_energy.fitted_lambda_only`, `pressure.source_without_provenance`, and `frw_handoff_split`. | Retained Noether sea density/pressure source packet plus accepted `theta_cos` handoff accepted by the pressure/$\Lambda_{\mathrm{eff}}$ checker before any score review. |
| Effective-coupling continuity across local/cosmology/structure/low-acceleration rows | $G_{\mathrm{eff}}^{\mathrm{local}}$, $G_{\mathrm{eff}}^{\mathrm{cos}}$, $G_{\mathrm{eff}}(a,k,\omega)$, and $\mathcal M_{\mathrm{sea}}^{ab}$ projected from one constitutive-response component. | Accepted effective-coupling continuity row under `theta_11_20` or the shared Noether sea coefficient bundle. | Local gravity, Friedmann bookkeeping, growth, CMB lensing, RAR/BTFR, and BBN consumers must cite the same $G_{\mathrm{eff}}$ provenance or a declared transformation row. | `effective_coupling.split`, `equation_map.hidden_retune`, and private coefficient handles per observable. | Same-window accepted coupling-continuity witness tying weak gravity, pressure/$\Lambda_{\mathrm{eff}}$, growth, CMB, and low-acceleration consumers to one source-backed response tensor. |

## Shared Retained Record

For a window $W(t)\subset\Sigma_t$, smoothing scale $\ell$, and projection family $\Pi_X$, use the packet-local record

$$
\Theta_{11\text{-}20}^{(\ell,W)}
=
\left(
\Theta_{\mathrm{sea}}^{(\ell,W)},
\Theta_{\mathrm{src}}^{(W)},
\mathcal C_{\mathrm{NS}},
\mathcal L_{E\mathbf p\mathbf J}^{(W)},
\mathcal H_{\partial W}
\right),
$$

where

$$
\Theta_{\mathrm{sea}}^{(\ell,W)}
=
\left(
\rho_{\text{NS}},
n,
\mathbf u_{\mathrm{sea}},
e_{\mathrm{sea}},
\Sigma_{\mathrm{sea}}^{ab},
p_{\mathrm{sea}},
\Pi_{\mathrm{sea}}^{ab},
\chi_{\text{sea}},
\Gamma_N,
\boldsymbol\theta_{\mathrm{sea}},
\mathcal M_{\mathrm{sea}}^{ab},
\tau_{\mathrm{rel}},
\mathcal T_{\mathrm{sea}}^{ab}
\right).
$$

Here $\Sigma_{\mathrm{sea}}^{ab}$ is the retained stress row, $p_{\mathrm{sea}}$ is the scalar pressure row, $\Pi_{\mathrm{sea}}^{ab}$ is the trace-free pressure or anisotropic-stress row, $\tau_{\mathrm{rel}}$ is the relaxation time or memory row for Hubble-time-scale response, $\mathcal T_{\mathrm{sea}}^{ab}$ is the tension row, and $\mathcal M_{\mathrm{sea}}^{ab}$ is the effective response tensor already used by mass, metric, growth, and medium-response packets.

The source record

$$
\Theta_{\mathrm{src}}^{(W)}
=
\left(
\rho_{\mathrm{src}}^{\mathrm{eff}},
T_{\mu\nu,\mathrm{src}}^{\mathrm{eff}},
\zeta(A),
E_{\mathrm{internal}}(A),
\mathcal L_{\mathrm{root}},
\mathcal L_{\mathrm{wake}}
\right)
$$

prevents the gravity row from importing matter density as an unledgered external input. The same source loading must remain compatible with mass-map, conservation-law, structure-growth, CMB, BBN, and low-acceleration packets.

The packet-level compact carrier is therefore

$$
\mathcal C_{11\text{-}20}^{(\ell,W)}
=
\left(
\Theta_{\mathrm{sea}}^{(\ell,W)},
\Theta_{\mathrm{src}}^{(W)},
\mathcal L_{E\mathbf p\mathbf J}^{(W)},
\mathcal H_{\partial W}
\right).
$$

$\mathcal C_{\mathrm{NS}}$ is the constitutive-response component that maps this carrier into $\mathcal K_{\mathrm{eff}}$, $\mathcal G_{\mathrm{eff}}$, $\mathcal P_{\mathrm{sea}}$, and $\mathcal R_{\mathrm{relax}}$. It is not the whole retained record and must not become a private coefficient handle for weak gravity or dark-energy pressure.

## Current Mapped Form

The useful refined mathematical object is a shared constitutive-response row:

$$
\mathcal C_{\mathrm{NS}}:
\Theta_{11\text{-}20}^{(\ell,W)}
\mapsto
\left(
\mathcal K_{\mathrm{eff}},
\mathcal G_{\mathrm{eff}},
\mathcal P_{\mathrm{sea}},
\mathcal R_{\mathrm{relax}}
\right).
$$

The weak-gravity projection is a Poisson-limit handoff:

$$
R_{\Phi}^{11}(\Theta)
=
\nabla^2\Phi_{\mathrm{eff}}[\Theta]
-
4\pi G_{\mathrm{eff}}[\Theta]\rho_{\mathrm{src}}^{\mathrm{eff}}[\Theta]
-
\mathcal S_{\mathrm{sea}}^{\Phi}[\Theta],
$$

where $\mathcal S_{\mathrm{sea}}^{\Phi}$ is allowed only when it is a declared projection of Noether sea stress, pressure, anisotropic pressure, tension, or relaxation in the same record.

The curvature readout is the effective Einstein-equation residual:

$$
R_{\mu\nu}^{11}(\Theta)
=
G_{\mu\nu}[g^{\mathrm{eff}}(\Theta)]
+
\Lambda_{\mathrm{eff}}[\Theta]g_{\mu\nu}^{\mathrm{eff}}(\Theta)
-
\frac{8\pi G_{\mathrm{eff}}[\Theta]}{c_0^4}
T_{\mu\nu}^{\mathrm{eff}}[\Theta].
$$

This is a readout residual, not a claim that substrate space has curvature. It checks whether the effective metric, source loading, coupling, and pressure rows jointly recover the observer-level curvature equation.

The dark-energy pressure row is

$$
p_{\mathrm{sea}}[\Theta]
=
\mathcal P_{\mathrm{sea}}
\left(
\rho_{\text{NS}},
\dot\rho_{\text{NS}},
n,
\chi_{\text{sea}},
\Gamma_N,
e_{\mathrm{sea}},
\Sigma_{\mathrm{sea}}^{ab},
\Pi_{\mathrm{sea}}^{ab},
\mathcal T_{\mathrm{sea}}^{ab},
\tau_{\mathrm{rel}},
\langle R_{\mathrm{outer}}\rangle
\right),
$$

with projections

$$
w_{\mathrm{eff}}(\Theta)
=
\frac{p_{\mathrm{DE,eff}}[\Theta]}
{\rho_{\mathrm{DE,eff}}[\Theta]c_0^2},
\qquad
\Lambda_{\mathrm{eff}}(\Theta)
=
\frac{8\pi G_{\mathrm{eff}}[\Theta]}
{c_0^2}
\rho_{\mathrm{DE,eff}}[\Theta].
$$

The pressure residual is

$$
R_p^{20}(\Theta)
=
p_{\mathrm{DE,eff}}[\Theta]
-
\Pi_{\mathrm{DE}}
p_{\mathrm{sea}}[\Theta],
$$

and the equation-of-state residual is

$$
R_w^{20}(\Theta)
=
w_{\mathrm{eff}}[\Theta]
-
w_{\mathrm{bench}}.
$$

Here $w_{\mathrm{bench}}$ is a declared observer-level benchmark for the window being tested, not a fitted substrate parameter. For a pure $\Lambda$ comparison it is near $-1$; for a time-varying effective pressure comparison it must be supplied as a data-product target before the residual is evaluated.

The acceleration comparison is admissible only after $R_p^{20}$, $R_w^{20}$, and the Friedmann/continuity residuals from the effective-metric/cosmology packet use the same $\Theta_{11\text{-}20}$ projection family.

## Outer-Binary Equilibrium And Relaxation Wireframe

This section captures a candidate mechanism-level wireframe. It is priority-only and does not promote a completed dark-energy derivation. The useful insight is that an outer binary can be away from its local lower-energy branch without immediately releasing energy if the surrounding Noether sea offers no accepting channel. In that case the relevant state is a collective no-current balance, not an isolated single-braid minimum.

The ontological ladder is:

1. A Noether sea window contains a retained inventory of Noether braids, not a smooth fluid as a primitive object.
2. Each retained braid has internal rows, including outer-binary radius, cadence, phase, retained energy, and path history.
3. A coarse-grained density row $\rho_{\text{NS}}$ counts that retained braid inventory through a smoothing kernel.
4. A local energy row records how much outer-binary strain energy is stored in that inventory.
5. A current row records whether neighbouring braids, boundaries, or lower-energy channels can accept that energy.
6. A stress or tension row is the response of the stored energy to a declared deformation of the retained window.
7. Pressure is the isotropic projection of that stress or tension row.
8. Dark-energy pressure is an observer-level projection of the native Noether sea pressure, tension, density, coupling, and relaxation rows.

This is the precise replacement for the earlier reservoir wording. The slowly varying outer-binary tension sector is not a new substance. It is a same-window retained energy inventory plus a closed or slow release-channel row and a stress/tension response row.

For a representative Noether braid $b$ in a coarse-graining window $W$, write the outer-binary row as

$$
O_b(t)
=
\left(
R_{O,b},
\nu_{O,b},
\phi_{O,b},
E_{O,b},
\mathcal H_{O,b}
\right),
$$

where $R_{O,b}$ is the outer-binary radius, $\nu_{O,b}$ its cadence, $\phi_{O,b}$ its phase, $E_{O,b}$ its retained energy, and $\mathcal H_{O,b}$ its retained path-history row. The surrounding Noether sea state selects a local reference branch

$$
R_{O,\mathrm{eq},b}
=
R_{O,\mathrm{eq}}
\left[
\theta_{\mathrm{sea}}^{(\ell,W)};
\mathcal H_{\partial W}
\right]
$$

only after the density, delay, cadence, boundary, source-loading, and retained-history rows are declared. The scalar outer-binary strain candidate is

$$
\epsilon_{O,b}
=
\frac{
R_{O,b}-R_{O,\mathrm{eq},b}
}{
R_{O,\mathrm{eq},b}
}.
$$

The branch energy row should be written before any pressure claim:

$$
E_{O,b}
=
E_{O,\mathrm{eq},b}
+
\frac{1}{2}
K_{O,b}
R_{O,\mathrm{eq},b}^2
\epsilon_{O,b}^2
+
O(\epsilon_{O,b}^3),
$$

where $K_{O,b}$ is accepted only if it is derived from the retained branch response, not fitted from a dark-energy target. The local energy-cadence potential is then

$$
\mu_{O,b}
=
\frac{\partial E_{O,b}}{\partial N_b}
+
\Omega_{O,b}
+
\frac{\partial E_{O,b}}{\partial \nu_{O,b}},
$$

with $N_b$ standing for the retained occupation or inventory weight of the braid row and $\Omega_{O,b}$ collecting declared cadence, phase, and path-history terms. This is the object whose gradients can drive neighbour-to-neighbour exchange.

A first stored-energy row is

$$
u_{O,\mathrm{str}}^{(W)}
=
\rho_{\text{NS}}^{(W)}
\left\langle
\frac{1}{2}
K_O[\theta_{\mathrm{sea}}]
R_{O,\mathrm{eq}}^2
\epsilon_O^2
\right\rangle_W,
$$

where $K_O[\theta_{\mathrm{sea}}]$ is the branch-derived outer-binary stiffness and $\langle\cdot\rangle_W$ averages over the retained Noether braid population in the window. This row is not yet pressure. It is the candidate energy inventory from which pressure, tension, or relaxation may be projected.

The missing equilibrium distinction is the release-channel row. Let $\mathcal A_{\downarrow,b}$ measure whether lower-energy or accepting channels are available to braid $b$ through neighbours, boundary transport, compact-source recycling, or other declared Noether sea routes. Let $\mu_{O,b}$ be the packet-local energy-cadence potential extracted from $E_{O,b}$ and the retained cadence distribution. Then a useful relaxation-current template is

$$
J_{E,O}^{ab}
=
\Gamma_{ab}
\mathcal A_{\downarrow}^{ab}
\left[
\mu_{O,a}-\mu_{O,b}
\right],
$$

with sign convention chosen so positive $J_{E,O}^{ab}$ transports outer-binary energy from $a$ to $b$. The quasi-equilibrium condition is therefore not $\epsilon_O=0$. It is the no-current condition

$$
\sum_{b\sim a}J_{E,O}^{ab}
+J_{E,O}^{a\partial W}
\approx 0,
$$

with possible nonzero $\epsilon_{O,a}$. This is the controlled mathematical form of a floating balance point: the outer-binary sector can retain strain energy because neighbouring states are similarly diffused or because the boundary and lower-energy channels are effectively closed.

The corresponding site-level energy balance is

$$
\dot E_{O,a}
=
\sum_{b\sim a}
\left(
J_{E,O}^{ba}-J_{E,O}^{ab}
\right)
-
\mathcal R_{O,\downarrow,a}
+
\mathcal S_{O,\mathrm{load},a}.
$$

This equation captures both directions of exchange. If neighbouring braids have higher $\mu_O$ and an available channel, braid $a$ can gain outer-binary energy. If a lower-energy channel opens for $a$, $\mathcal R_{O,\downarrow,a}$ increases and the stored energy can release into a cascade. A cascade is therefore not a separate law; it is a sharp change in the availability row $\mathcal A_{\downarrow}$, release row $\mathcal R_{O,\downarrow}$, or boundary current.

The local relaxation equation can be written as

$$
\dot u_{O,\mathrm{str}}^{(W)}
=
-\nabla\cdot J_{E,O}^{(W)}
-\mathcal R_{O,\downarrow}
\left(
\epsilon_O,
\theta_{\mathrm{sea}},
\mathcal A_{\downarrow}
\right)
+\mathcal S_{O,\mathrm{load}},
$$

where $\mathcal R_{O,\downarrow}$ is the retained lower-channel release row and $\mathcal S_{O,\mathrm{load}}$ is incoming source, neighbour, or recycling loading. If $\mathcal A_{\downarrow}$ rises sharply in one region, the same equation can seed a relaxation cascade. A cascade is promotable only if the packet supplies the event ledger for the released energy and shows that CMB, redshift, weak-gravity, lensing, growth, and BBN consumers still use the same $\theta_{\mathrm{sea}}$ record.

The scalar pressure readout should be derived from the retained stress or tension tensor, not assigned by analogy. Start from the retained energy response:

$$
\Sigma_{\mathrm{sea}}^{ab,(W)}
=
\frac{1}{V_W}
\frac{\partial E_{\mathrm{NS}}^{(W)}}{\partial \epsilon_{ab}},
\qquad
p_{\mathrm{sea}}^{(W)}
=
-
\frac{\partial E_{\mathrm{NS}}^{(W)}}{\partial V_W}
\bigg|_{\mathcal I_W,\mathcal H_W,\mathcal A_{\downarrow}},
$$

where $E_{\mathrm{NS}}^{(W)}$ is the retained Noether sea energy in the window, $\epsilon_{ab}$ is a declared coarse deformation, and the derivative holds fixed the retained inventory, path-history, and release-channel declaration. In isotropic comparison windows the candidate sign convention is

$$
p_{\mathrm{sea}}^{(W)}
=
-\frac{1}{3}
h_{ab}\mathcal T_{\mathrm{sea}}^{ab,(W)}
+p_{\mathrm{kin}}^{(W)}
+p_{\mathrm{src}}^{(W)},
$$

where $\mathcal T_{\mathrm{sea}}^{ab}$ is the tensile stress row, $p_{\mathrm{kin}}$ records kinetic or cadence-distribution pressure, and $p_{\mathrm{src}}$ records declared source or boundary loading. The effective dark-energy row is then allowed only as a projection,

$$
p_{\mathrm{DE,eff}}
=
\Pi_{\mathrm{DE}}p_{\mathrm{sea}},
\qquad
w_{\mathrm{eff}}
=
\frac{
p_{\mathrm{DE,eff}}
}{
\rho_{\mathrm{DE,eff}}c_0^2
}.
$$

The effective-GR bridge is the standard acceleration comparison,

$$
\frac{\ddot a_{\mathrm{eff}}}{a_{\mathrm{eff}}}
=
-\frac{4\pi G_{\mathrm{eff}}}{3}
\left(
\rho_{\mathrm{eff}}
+\frac{3p_{\mathrm{eff}}}{c_0^2}
\right),
$$

but in this packet $a_{\mathrm{eff}}$ is only an observer-level scale variable. The native work is to derive $p_{\mathrm{sea}}$, $\rho_{\mathrm{DE,eff}}$, and $G_{\mathrm{eff}}$ from one Noether sea record. Acceleration follows in the effective comparison only if the projected pressure is negative enough:

$$
\rho_{\mathrm{eff}}
+\frac{3p_{\mathrm{eff}}}{c_0^2}
<0.
$$

### Stepwise Closure Ladder

1. Consume the accepted `theta_sea_rho_NS` density-compression provider as the upstream $\rho_{\text{NS}}$, $n$, $\mathbf u_{\mathrm{sea}}$, $e_{\mathrm{sea}}$, $\boldsymbol\theta_{\mathrm{sea}}$, and event-ledger carrier.
2. Add the missing cadence, delay, boundary, source-loading, and retained-history rows needed for the `EQ-20` pressure window.
3. Extract $R_{O,\mathrm{eq}}[\theta_{\mathrm{sea}}]$ and $\epsilon_O$ for the retained outer-binary population.
4. Derive $u_{O,\mathrm{str}}$ from an accepted branch stiffness $K_O$ rather than fitting it as a dark-energy density.
5. Declare $\mathcal A_{\downarrow}$ and the energy-current row $J_{E,O}$ so that no-current quasi-equilibrium and open-channel relaxation are distinguishable.
6. Derive $\Sigma_{\mathrm{sea}}^{ab}$ and $p_{\mathrm{sea}}$ from the retained energy response under a declared deformation, with separate kinetic/source pressure rows.
7. Compute $p_{\mathrm{DE,eff}}$, $\rho_{\mathrm{DE,eff}}$, $w_{\mathrm{eff}}$, and $\Lambda_{\mathrm{eff}}$ through one projection family $\Pi_{\mathrm{DE}}$.
8. Reuse the same $\theta_{\mathrm{sea}}$ record for weak gravity, effective Friedmann bookkeeping, growth, CMB, BBN, lensing, and low-acceleration rows.
9. Fail the packet if the pressure sign, release rate, or effective coupling is changed independently between observer families.

### Candidate Lemma

For one retained Noether sea window $W$, if the outer-binary strain row $\epsilon_O$, stiffness row $K_O$, release-channel row $\mathcal A_{\downarrow}$, energy-current row $J_{E,O}$, and tensile-stress row $\mathcal T_{\mathrm{sea}}^{ab}$ are all populated from the same $\Theta_{\mathrm{sea}}^{(\ell,W)}$, then a nonzero stored outer-binary strain can produce an effective negative-pressure readout only when the isotropic projection of $\mathcal T_{\mathrm{sea}}^{ab}$ dominates kinetic and source pressure rows. The same packet must also show that opening a lower-energy channel changes $\mathcal R_{O,\downarrow}$ or $J_{E,O}$ rather than silently changing $\rho_{\mathrm{DE,eff}}$ by fit.

### Failure Modes Specific To This Wireframe

| Failure mode | Meaning |
| --- | --- |
| `outer_binary_strain_without_branch` | $\epsilon_O$ is named without an accepted $R_{O,\mathrm{eq}}[\theta_{\mathrm{sea}}]$ branch. |
| `pressure_from_energy_inventory_only` | $u_{O,\mathrm{str}}$ is treated as pressure before a stress/tension projection exists. |
| `closed_channel_named_equilibrium` | A no-current state is called equilibrium without reporting whether lower-energy channels are unavailable or merely unmodeled. |
| `cascade_without_event_ledger` | A release cascade is claimed without energy, momentum, source, boundary, and Noether sea transfer rows. |
| `effective_gr_import` | The Friedmann acceleration equation is used as if it were substrate dynamics rather than an observer-level comparison consuming $p_{\mathrm{sea}}$. |

## Required Noether Braid And Assembly Variables

| Variable / row | Required content | Consumed by |
| --- | --- | --- |
| Source branch ledger $\mathcal L_{\mathrm{root}}$ | Active roots, causal emission times, Jacobian floors, and branch labels for source assemblies. | Keeps $\rho_{\mathrm{src}}^{\mathrm{eff}}$ and $T_{\mu\nu,\mathrm{src}}^{\mathrm{eff}}$ tied to causal roots. |
| Wake ledger $\mathcal L_{\mathrm{wake}}$ | Wake energy, momentum, boundary flux, unresolved memory, and source depletion. | Prevents $G_{\mathrm{eff}}$ or pressure loading from bypassing event provenance. |
| Mass-map rows | $E_{\mathrm{internal}}(A)$, $\zeta(A)$, $M_0(A)$, and $\mathcal M_{\mathrm{sea}}^{ab}$. | Supplies gravitational loading and checks against `EQ-04`. |
| Outer-binary or envelope response | $\langle R_{\mathrm{outer}}\rangle$, envelope strain, cadence change, and relaxation state where retained. | Supplies candidate pressure and tension response for `EQ-20`. |
| Assembly transport/source rows | Association, dissociation, recycling, neutral-assembly loading, and boundary exchange. | Supplies effective cosmology source terms without unledgered matter creation. |

## Required Noether Sea Variables

| Variable / row | Use in packet |
| --- | --- |
| $\rho_{\text{NS}}(\mathbf{x},t)$ and $n(\mathbf{x},t)$ | Physical and normalized Noether braid density rows for source loading, potential response, pressure, and cosmology projections. |
| $\mathbf u_{\mathrm{sea}}$ | Drift/flow row for ADM shift, transport, source provenance, and preferred-frame checks. |
| $e_{\mathrm{sea}}$ | Medium energy density entering stress-energy readout and pressure partition. |
| $\Sigma_{\mathrm{sea}}^{ab}$ | Stress row feeding weak gravity, spatial compliance, growth response, and pressure anisotropy. |
| $p_{\mathrm{sea}}$ and $\Pi_{\mathrm{sea}}^{ab}$ | Scalar and trace-free pressure rows; required before negative effective pressure can be claimed. |
| $\mathcal T_{\mathrm{sea}}^{ab}$ | Tension row for native dark-energy candidates and medium-response comparisons. |
| $\chi_{\text{sea}}$ and $\Gamma_N$ | Delay and cadence rows that prevent clock, signal, redshift, and pressure projections from splitting. |
| $\mathcal M_{\mathrm{sea}}^{ab}$ | Effective coupling and response tensor shared by mass, weak gravity, metric, growth, and low-acceleration rows. |
| $G_{\mathrm{eff}}$ | Observer-level coupling projection; must be derived from $\mathcal M_{\mathrm{sea}}^{ab}$ and stress/pressure rows rather than fit per observable. |
| $\tau_{\mathrm{rel}}$ and relaxation memory | Hubble-time-scale response row for dark-energy behavior and slow pressure equilibration. |

## Rows Needed

| Row family | Required rows | Immediate closure use |
| --- | --- | --- |
| Constitutive response | $\mathcal C_{\mathrm{NS}}[\Theta]$, $\mathcal M_{\mathrm{sea}}^{ab}$, stress, pressure, tension, delay, cadence, and relaxation coefficients | One source of $G_{\mathrm{eff}}$, pressure, and metric response. |
| Poisson handoff | $\Phi_{\mathrm{eff}}$, $\rho_{\mathrm{src}}^{\mathrm{eff}}$, $G_{\mathrm{eff}}$, $\mathcal S_{\mathrm{sea}}^\Phi$, and $R_\Phi^{11}$ | First weak-gravity recovery target. |
| Curvature readout | $g_{\mu\nu}^{\mathrm{eff}}$, $T_{\mu\nu}^{\mathrm{eff}}$, $\Lambda_{\mathrm{eff}}$, $G_{\mathrm{eff}}$, and $R_{\mu\nu}^{11}$ | Einstein-equation comparison without substrate curvature. |
| Pressure residual | $p_{\mathrm{sea}}$, $p_{\mathrm{DE,eff}}$, $\rho_{\mathrm{DE,eff}}$, $w_{\mathrm{eff}}$, and $R_p^{20}$ | Blocks fitted $\Lambda$ from masquerading as native pressure. |
| Relaxation memory | $\tau_{\mathrm{rel}}$, $\dot\rho_{\text{NS}}$, $\dot p_{\mathrm{sea}}$, source/recycling rows, and boundary flux | Distinguishes native slow response from a static integration constant. |
| Effective-coupling continuity | $G_{\mathrm{eff}}^{\mathrm{local}}$, $G_{\mathrm{eff}}^{\mathrm{cos}}$, $G_{\mathrm{eff}}(a,k,\omega)$, and residuals across local, growth, and cosmology windows | Prevents gravity and cosmology from using incompatible coupling records. |
| Hidden-retune check | $\mathcal S_{\mathrm{retune}}^{11\text{-}20}$ | Fails the packet when weak-gravity and dark-energy rows pass only with split records. |

## Candidate Common Sub-Equations

These names are packet-local candidates, not canonized terminology. Each could become a useful equation in its own right if later packets populate it on declared windows.

| Candidate sub-equation | Packet-local name | Mathematical role |
| --- | --- | --- |
| Noether sea constitutive-response equation | `noether_sea_constitutive_response` | Maps $\Theta_{11\text{-}20}$ into $G_{\mathrm{eff}}$, stress-energy, pressure, metric response, and relaxation rows. |
| Poisson handoff equation | `poisson_constitutive_handoff` | Tests whether $\nabla^2\Phi_{\mathrm{eff}}$ descends from source loading plus Noether sea stress/pressure rows. |
| Curvature-readout residual | `curvature_readout_residual` | Tests $G_{\mu\nu}[g^{\mathrm{eff}}]+\Lambda_{\mathrm{eff}}g_{\mu\nu}^{\mathrm{eff}}-8\pi G_{\mathrm{eff}}T_{\mu\nu}^{\mathrm{eff}}/c_0^4$ as an observer-level readout. |
| Pressure-residual equation | `dark_energy_pressure_residual` | Tests whether $p_{\mathrm{DE,eff}}$ and $w_{\mathrm{eff}}$ are projections of $p_{\mathrm{sea}}$, tension, and relaxation. |
| Effective-coupling continuity check | `effective_coupling_continuity` | Checks that $G_{\mathrm{eff}}$ used by local gravity, Friedmann bookkeeping, growth, CMB lensing, and RAR/BTFR projections remains one record. |
| Hidden-retune check | `gravity_dark_energy_hidden_retune_check` | Reports any split in $\Theta$, $\mathcal C_{\mathrm{NS}}$, $\mathcal M_{\mathrm{sea}}^{ab}$, pressure, delay, cadence, or relaxation between weak-gravity and dark-energy fits. |

The hidden-retune check can be written as a split-record witness:

$$
\mathcal S_{\mathrm{retune}}^{11\text{-}20}
=
d_{\Theta}
\left(
\Theta_{\mathrm{weak}},
\Theta_{\Lambda}
\right)
+
\left\|
\mathcal C_{\mathrm{NS}}^{\mathrm{weak}}
-
\mathcal C_{\mathrm{NS}}^{\Lambda}
\right\|^2
+
\left\|
\mathcal M_{\mathrm{sea}}^{ab,\mathrm{weak}}
-
\mathcal M_{\mathrm{sea}}^{ab,\Lambda}
\right\|^2.
$$

It should be zero only when the weak-gravity and dark-energy projections use the same declared record up to the explicitly permitted coarse-graining map.

## Current Executable Objects And Next Residual

The `EQ-20` pressure/$\Lambda_{\mathrm{eff}}$ slice is now executable in [eq20-pressure-effective-lambda-residual.mjs](../../../scripts/equation-mapping/eq20-pressure-effective-lambda-residual.mjs). Its first outer-binary source-attempt fixture is [eq20-theta-sea-rho-ns-outer-binary-pressure-source-attempt.v1.json](../../../scripts/equation-mapping/eq20-theta-sea-rho-ns-outer-binary-pressure-source-attempt.v1.json). That fixture still blocks first at `missing_accepted_theta_sea_rho_NS` because it is an attempt route. The provider-backed slice [eq20-provider-backed-pressure-effective-lambda-slice.v1.json](../../../scripts/equation-mapping/eq20-provider-backed-pressure-effective-lambda-slice.v1.json) consumes the accepted density-compression provider in [noether-sea-density-compression-provider.v1.json](../../../scripts/spacetime/noether-sea-density-compression-provider.v1.json), the retained pressure report in [eq20-delta-p-eff-pressure-projection-report.v1.json](../../../scripts/equation-mapping/eq20-delta-p-eff-pressure-projection-report.v1.json), and the accepted `theta_cos` handoff in [effective-frw-theta-cos-handoff.v1.json](../../../scripts/equation-mapping/effective-frw-theta-cos-handoff.v1.json). The checker verifies the `theta_sea_rho_NS` provider object, verifies the retained `delta_P_eff` pressure report for the pressure/tension/relaxation/effective rows, verifies the accepted `theta_cos` handoff, and reports `status=populated`, `missingRows=[]`, `missingSharedKeys=[]`, `frwHandoffAccepted=true`, and `nextBlocker=null`. The route remains an executable pressure projection plus cosmology handoff, not a completed dark-energy derivation or score increase.

```bash
node scripts/equation-mapping/eq20-pressure-effective-lambda-residual.mjs \
  --input scripts/equation-mapping/eq20-theta-sea-rho-ns-outer-binary-pressure-source-attempt.v1.json \
  --summary --pretty
node scripts/equation-mapping/eq20-pressure-effective-lambda-residual.mjs \
  --input scripts/equation-mapping/eq20-provider-backed-pressure-effective-lambda-slice.v1.json \
  --summary --pretty --require-populated
node scripts/equation-mapping/effective-frw-handoff-residual.mjs \
  --input scripts/equation-mapping/effective-frw-handoff-theta-cos-accepted.v1.json \
  --summary --pretty --require-populated
```

The `EQ-11` weak-gravity side is executable in [eq11-weak-gravity-constitutive-residual.mjs](../../../scripts/equation-mapping/eq11-weak-gravity-constitutive-residual.mjs). Its attempt fixture [eq11-weak-gravity-constitutive-attempt.v1.json](../../../scripts/equation-mapping/eq11-weak-gravity-constitutive-attempt.v1.json) still blocks first at `missing_accepted_theta_11_20` while the Poisson handoff, curvature readout, effective-coupling continuity, PPN handoff, source-provenance, no-hidden-retune, and negative-control diagnostics pass. The accepted input [eq11-weak-gravity-constitutive-theta-11-20-accepted.v1.json](../../../scripts/equation-mapping/eq11-weak-gravity-constitutive-theta-11-20-accepted.v1.json) consumes [eq11-theta-11-20-weak-gravity-evidence.v1.json](../../../scripts/equation-mapping/eq11-theta-11-20-weak-gravity-evidence.v1.json) and reports `status=populated`, `nextBlocker=null`, `missingRows=[]`, and `missingSharedKeys=[]`, with `scoreDecision=no_score_increase`. The coordination-source control [eq11-weak-gravity-constitutive-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/eq11-weak-gravity-constitutive-coordination-source-negative-control.v1.json) flips weak-gravity rows to accepted-looking statuses while sourcing them only to priority packets, authored prose, or attempt fixtures; it must still keep `nextBlocker=missing_accepted_theta_11_20` and report `accepted_without_evidence_source`.

The score-neutral source-contract boundary is [eq11-weak-gravity-constitutive-theta-11-20-source-contract.v1.json](../../../scripts/equation-mapping/eq11-weak-gravity-constitutive-theta-11-20-source-contract.v1.json), exercised by [eq11-weak-gravity-constitutive-theta-11-20-source-contract-negative-control.v1.json](../../../scripts/equation-mapping/eq11-weak-gravity-constitutive-theta-11-20-source-contract-negative-control.v1.json). It marks every required weak-gravity row accepted-looking while sourcing those rows only to contract metadata. The expected result remains `status: blocked_missing_rows`, `scoreDecision: no_score_increase`, `nextBlocker: missing_accepted_theta_11_20`, and `rowStatuses.theta_11_20.reason: accepted_without_evidence_source`; the same command with `--require-populated` exits nonzero. The contract names the evidence boundary but is not accepted retained evidence.

```bash
node scripts/equation-mapping/eq11-weak-gravity-constitutive-residual.mjs --summary --pretty
node scripts/equation-mapping/eq11-weak-gravity-constitutive-residual.mjs --input scripts/equation-mapping/eq11-weak-gravity-constitutive-theta-11-20-accepted.v1.json --summary --pretty --require-populated
node scripts/equation-mapping/eq11-weak-gravity-constitutive-residual.mjs --input scripts/equation-mapping/eq11-weak-gravity-constitutive-coordination-source-negative-control.v1.json --summary --pretty
node scripts/equation-mapping/eq11-weak-gravity-constitutive-residual.mjs --input scripts/equation-mapping/eq11-weak-gravity-constitutive-theta-11-20-source-contract-negative-control.v1.json --summary --pretty
node scripts/equation-mapping/eq11-20-shared-constitutive-residual.mjs --input scripts/equation-mapping/eq11-20-shared-constitutive-residual.v1.json --summary --pretty --require-populated
```

The `theta_W` effective-metric consumer is now executable through [effective-metric-theta-w-evidence.v1.json](../../../scripts/equation-mapping/effective-metric-theta-w-evidence.v1.json) and [effective-metric-weak-field-theta-w-accepted.v1.json](../../../scripts/equation-mapping/effective-metric-weak-field-theta-w-accepted.v1.json). The checker verifies accepted evidence before accepting weak-field rows and reports `status=populated`, `nextBlocker=null`, and `scoreDecision=no_score_increase`.

The downstream output-projection consumer is now executable through [noether-sea-density-compression-provider-output-projection.v1.json](../../../scripts/spacetime/noether-sea-density-compression-provider-output-projection.v1.json) and [noether-sea-density-compression-provider-surface-slice-output-projection.v1.json](../../../scripts/spacetime/noether-sea-density-compression-provider-surface-slice-output-projection.v1.json). The surface-slice checker reports `status=populated`, `nextBlocker=null`, accepted `delta_N`, `delta_gamma_ij`, `delta_G_eff`, and `delta_a_star` projections, and ready-for-consumer-review flags for `EQ11_weak_gravity` and `EQ32_low_acceleration`. `delta_P_eff` remains supplied by the separate accepted pressure report.

```bash
node scripts/equation-mapping/effective-metric-weak-field-residual.mjs \
  --input scripts/equation-mapping/effective-metric-weak-field-theta-w-accepted.v1.json \
  --summary --pretty --require-populated
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs \
  --input scripts/spacetime/noether-sea-density-compression-provider-surface-slice-output-projection.v1.json \
  --summary --pretty --require-populated
```

The shared residual is

$$
\mathcal R_{11\text{-}20}(\Theta;W_{\mathrm{weak}},W_{\Lambda})
=
\lambda_\Phi
\left\|R_\Phi^{11}\right\|^2
+
\lambda_{\mathrm{curv}}
\left\|R_{\mu\nu}^{11}\right\|^2
+
\lambda_p
\left\|R_p^{20}\right\|^2
+
\lambda_w
\left\|R_w^{20}\right\|^2
+
\lambda_G
\left\|R_G^{\mathrm{shared}}\right\|^2
+
\lambda_{\mathrm{retune}}
\mathcal S_{\mathrm{retune}}^{11\text{-}20}.
$$

The shared-coupling residual should start as a normalized split witness, not as a signed sum whose differences can cancel:

$$
R_G^{\mathrm{shared}}
=
\sum_{X\in\{\mathrm{local},\mathrm{cos},\mathrm{growth},\mathrm{CMBlens},\mathrm{RAR}\}}
w_X
\left[
\frac{
G_{\mathrm{eff}}^X
-
\Pi_XG_{\mathrm{eff}}[\mathcal C_{\mathrm{NS}}]
}{
\sigma_{G,X}+\varepsilon_G
}
\right]^2
+
\lambda_{\mathrm{prov}}
\mathcal P_{\mathrm{prov}}(G_{\mathrm{eff}}).
$$

Here $\Pi_XG_{\mathrm{eff}}[\mathcal C_{\mathrm{NS}}]$ is the projection of the same constitutive-response component into window $X$, $\sigma_{G,X}$ is the declared proof-window or observational tolerance, and $\mathcal P_{\mathrm{prov}}(G_{\mathrm{eff}})$ fails when the effective coupling lacks provenance from $\mathcal M_{\mathrm{sea}}^{ab}$, stress, pressure, tension, relaxation, source loading, or boundary rows. This residual may report a physical scale dependence only when the transformation from $\mathcal C_{\mathrm{NS}}$ to $G_{\mathrm{eff}}^X$ is declared; otherwise nonzero terms are hidden retune.

The first proof route is a constitutive-response lemma:

> For one retained Noether sea window and one declared coarse-graining family, the same stress, pressure, tension, relaxation, and effective-coupling rows that produce the weak Poisson handoff also produce the effective pressure and $\Lambda_{\mathrm{eff}}$ rows, with all split-record terms reported in $\mathcal S_{\mathrm{retune}}^{11\text{-}20}$.

The first calculation should use a weak solar-system window $W_{\odot}$ for $R_\Phi^{11}$ and the already declared homogeneous effective-cosmology window for $R_p^{20}$, then test whether the coefficient row that preserves PPN/lensing also permits a negative effective pressure without changing $\mathcal C_{\mathrm{NS}}$.

## Relationships To Other Equation Packets

| Related IDs | Relationship |
| --- | --- |
| `EQ-06` | Supplies the Noether sea density, flow, cadence, energy, and moment-closure rows consumed by $\Theta_{11\text{-}20}$. |
| `EQ-07` through `EQ-10` | Consume the same effective metric and PPN projections; they falsify scalar-only gravity maps that match acceleration but fail lensing, Shapiro delay, or spatial compliance. |
| `EQ-17` through `EQ-19` | Consume $\Gamma_N$, $a_{\mathrm{eff}}$, $H_{\mathrm{eff}}$, $\rho_{\mathrm{eff}}$, $P_{\mathrm{eff}}$, $G_{\mathrm{eff}}$, $\Lambda_{\mathrm{eff}}$, and source rows from the same fixed-void record. |
| `EQ-21` through `EQ-23` | Use the same $G_{\mathrm{eff}}$ and pressure/source history for growth, CMB lensing, blackbody/acoustic rows, and BBN constraints. |
| `EQ-24` and `EQ-25` | Supply medium-response, delayed-support, relaxation, thermodynamic, and finite-window statistical discipline for pressure and response kernels. |
| `EQ-32` | Tests whether low-acceleration constitutive response can share $G_{\mathrm{eff}}$, $\mathcal M_{\mathrm{sea}}^{ab}$, and local-recovery rows with weak gravity and cosmology. |
| `EQ-04` and `EQ-05` | Supply mass loading, exposure, energy, momentum, wake, event, and finite-window conservation rows so gravity does not use unledgered matter. |

## Failure Modes And Falsifiers

| Failure mode | Falsifier |
| --- | --- |
| `equation_map.hidden_retune` | Weak-gravity, pressure, Friedmann, growth, or low-acceleration rows pass only after changing $\Theta$, $\mathcal C_{\mathrm{NS}}$, $G_{\mathrm{eff}}$, $\mathcal M_{\mathrm{sea}}^{ab}$, $\chi_{\text{sea}}$, $\Gamma_N$, or relaxation coefficients per observable. |
| `equation_map.no_sea_constitutive_record` | A claimed gravity or dark-energy map lacks density, stress, pressure, flow, delay, cadence, relaxation, or residual rows. |
| `gravity.scalar_only_half_test` | The map recovers Newtonian acceleration or Shapiro delay but fails light bending, spatial compliance, PPN, or preferred-frame constraints because curvature readout is absent. |
| `dark_energy.fitted_lambda_only` | $\Lambda_{\mathrm{eff}}$ is inserted as a fit, integration constant, or vacuum comparison without a pressure/tension/relaxation projection from the Noether sea record. |
| `pressure.source_without_provenance` | Negative effective pressure is produced by an unledgered source term rather than stress, tension, relaxation, source/recycling, or boundary rows. |
| `effective_coupling.split` | $G_{\mathrm{eff}}$ differs between local gravity, Friedmann bookkeeping, growth, CMB lensing, RAR/BTFR, or BBN without an explicit shared-state residual. |
| `cosmology.void_expansion_level_collapse` | $\Lambda_{\mathrm{eff}}$, $H_{\mathrm{eff}}$, or pressure rows are written as dynamics of expanding substrate space rather than observer-level Noether sea projections. |
| `local_gravity_spoilage` | A pressure or low-acceleration response that improves cosmology spoils solar-system, binary-pulsar, gravitational-wave, Shapiro, lensing, or PPN rows. |

## 2026-06-23 Maturity Assessment

This table preserves the dated assessment that informed the `6/23` ledger.
It is not retained evidence and does not update [equation.md](equation.md), the
sole current score authority.

| ID | 6/23 score | Reason |
| --- | --- | --- |
| `EQ-11` | `3` | This packet gives the right shared Noether sea variables, a populated score-neutral `theta_11_20` weak-gravity slice, a Poisson handoff, curvature-readout residual, effective-coupling continuity row, and hidden-retune check. It should not rise to `4` until `theta_W` metric-output rows and downstream weak-gravity observables consume the same record without retuning. |
| `EQ-20` | `3` | The dark-energy row now has a pressure/tension/relaxation residual, executable pressure/$\Lambda_{\mathrm{eff}}$ checker, accepted `theta_cos` handoff, and a populated shared `EQ-11`/`EQ-20` residual. It should not rise to `4` until a concrete $p_{\mathrm{sea}}$ law or relaxation calculation survives growth, CMB, and low-acceleration consumers without fitted $\Lambda$ or split cosmology records. |

## Promotion Classification

- Claim bucket: derivation/closure target with observer-level effective summaries.
- Corpus promotion status: priority-only.
- Promote now: no.
- Defer with blocker: no `theta_W` metric-output consumer, no `EQ-24` weak-gravity output rows for `delta_N`, `delta_gamma_ij`, or `delta_G_eff`, no `EQ-32` `delta_a_star` consumer, no native pressure law beyond the retained `delta_P_eff` slice, and no growth/CMB/low-acceleration consumer sweep. The upstream `theta_sea_rho_NS` density provider, same-window `delta_P_eff` pressure report, accepted score-neutral `theta_cos` handoff, accepted `theta_11_20` weak-gravity evidence, and populated shared `EQ-11`/`EQ-20` residual exist, but the downstream no-retune route is not closed.
- Next safe action: carry the populated $\mathcal R_{11\text{-}20}$ record into `theta_W`, `delta_a_star`, and the `EQ-24` weak-gravity output rows before attempting any score above `3`.
