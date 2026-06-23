# EQ-11 And EQ-20 Gravity / Dark-Energy Constitutive-Response Packet

## Workstream Metadata

- Kind: `priority-packet`
- Status: `draft`
- Worker mode: `second-round priority packet`
- Owned IDs: `EQ-11`, `EQ-20`
- Owned output file: `reference/priorities/equation-mapping/eq-11-20-gravity-dark-energy-packet.md`
- Source priority files: [Equation Mapping Internal Priority](equation-mapping.md), [Equation Mapping Detail](equation.md)
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

## Standard Equations And Regimes

| ID | Standard equation / regime | Comparison status |
| --- | --- | --- |
| `EQ-11` | Poisson benchmark: $\nabla^2\Phi_N=4\pi G\rho$. Einstein benchmark: $G_{\mu\nu}+\Lambda g_{\mu\nu}=8\pi GT_{\mu\nu}/c_0^4$. | Observer-level weak-gravity and curvature recovery from Noether sea constitutive response; not substrate curvature. |
| `EQ-20` | Dark-energy benchmark: $p=w\rho c_0^2$, with acceleration when $w < -1/3$ in the effective cosmology comparison. | Observer-level pressure and $\Lambda_{\mathrm{eff}}$ recovery from Noether sea tension, pressure, and relaxation; not fitted vacuum energy by itself. |

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

## Current Mapped Form

The useful second-round mathematical object is a shared constitutive-response row:

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

## First Mathematical Object To Add Next

Add the shared residual

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

The shared-coupling residual should start as

$$
R_G^{\mathrm{shared}}
=
\left(
G_{\mathrm{eff}}^{\mathrm{local}}
-
G_{\mathrm{eff}}^{\mathrm{cos}}
\right)
+
\left(
G_{\mathrm{eff}}^{\mathrm{growth}}
-
G_{\mathrm{eff}}^{\mathrm{cos}}
\right),
$$

with the understanding that each term must later be normalized by its declared observational or proof-window tolerance.

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

## `6/23 b` Score Recommendation

Do not update [equation.md](equation.md) from this packet. Recommended next score column entries:

| ID | `6/23 a` | Recommended `6/23 b` | Reason |
| --- | --- | --- | --- |
| `EQ-11` | `2` | `3` | This packet gives the right shared Noether sea variables, a Poisson handoff, curvature-readout residual, effective-coupling continuity row, and hidden-retune check. It should not rise to `4` until one weak-field window derives or populates $G_{\mathrm{eff}}$, $R_\Phi^{11}$, and $R_{\mu\nu}^{11}$ from the same constitutive coefficients used by the metric/PPN rows. |
| `EQ-20` | `2` | `3` | The dark-energy row now has a pressure/tension/relaxation residual and explicit coupling to the same $G_{\mathrm{eff}}$ record as weak gravity. It should not rise to `4` until a concrete $p_{\mathrm{sea}}$ law or relaxation calculation produces $w_{\mathrm{eff}}$ and $\Lambda_{\mathrm{eff}}$ without fitted $\Lambda$ or split cosmology records. |

## Promotion Classification

- Claim bucket: derivation/closure target with observer-level effective summaries.
- Corpus promotion status: priority-only.
- Promote now: no.
- Defer with blocker: no populated weak-field window, no derived $G_{\mathrm{eff}}$ coefficient row, no native pressure law, no relaxation calculation, and no shared local/cosmology hidden-retune evaluation.
- Next safe action: instantiate $\mathcal R_{11\text{-}20}$ on a weak solar-system window and one homogeneous effective-cosmology window, then report which coefficient rows split before attempting any score above `3`.
