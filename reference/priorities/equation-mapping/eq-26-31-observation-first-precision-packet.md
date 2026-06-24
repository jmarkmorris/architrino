# EQ-26 Through EQ-31 Observation-First Precision Packet

## Packet Metadata

- Kind: `priority`
- Status: `draft`
- Scope: `EQ-26`, `EQ-27`, `EQ-28`, `EQ-29`, `EQ-30`, `EQ-31`
- Source priority files: [equation-mapping.md](equation-mapping.md), [equation.md](equation.md)
- Promotion decision: priority-only. Do not promote to reader-facing corpus until at least one row below supplies a derived variable map, residual, simulation target, or branch certificate rather than a comparison scaffold.

This packet groups the observation-first precision rows that discipline atomic spectra, magnetic moments, photon-event recoil, radiation source mechanisms, scattering statistics, and resonance lifetimes. The shared rule is that every comparison equation must be routed through a retained Noether braid branch, local Noether sea state, event ledger, detector/readout row when applicable, and explicit residual. Standard equations remain benchmark surfaces; they are not substrate ontology.

## Score Recommendations

| ID | Current `6/23 a` | Recommended `6/23 b` | Reason |
| --- | --- | --- | --- |
| `EQ-26` | `3` | `3` | The Rydberg coefficient-row residual and hydrogen spectral scaffold are explicit, but the native envelope-gap derivation and spin-sensitive residuals are still open. |
| `EQ-27` | `2` | `2` | The angular-momentum and measurement-response ledgers name the right consumers, but no retained branch yet derives $g_\ell$, $a_\ell$, or precession frequencies. |
| `EQ-28` | `3` | `3` | The event-ledger grammar is strong; the Compton shift, photoelectric threshold, and pair-threshold cases still need one compact replayable event derivation. |
| `EQ-29` | `3` | `3` | Radiation, bremsstrahlung, and synchrotron documents define the residual/event rows, but emitted power, spectrum, and polarization recovery are not yet derived from one source ledger. |
| `EQ-30` | `2` | `2` | Cross sections and form factors have a plausible branch-statistics carrier, but specific amplitudes, detector kernels, and exposure distributions are not yet connected to Noether braid dynamics. |
| `EQ-31` | `2` | `2` | Resonance widths and branching fractions have the right metastability language, but no branch-stability calculation currently produces $\Gamma$, $\tau$, or $B_k$. |

## Shared Ledger Contract

For the six rows, the common closure object is a finite event or observation record

$$
\mathsf e
=
\left(
\Gamma_{\mathrm{src}},
\mathcal H,
\theta_{\mathrm{sea}},
I_{\mathsf e},
Y_{\mathsf e},
K_{\mathrm{det}}
\right),
$$

where $\Gamma_{\mathrm{src}}$ is the retained source or prepared-branch state, $\mathcal H$ is the path-history and causal-root record, $\theta_{\mathrm{sea}}$ is only local shorthand for the declared Noether sea variable tuple consumed by the row, $I_{\mathsf e}$ is the selected finite channel set, $Y_{\mathsf e}$ lists outgoing assemblies, recoil, medium, photon, remnant, or exit rows, and $K_{\mathrm{det}}$ is the detector or readout kernel when the observable is statistical.

This $\mathsf e$ is the compact carrier for the packet. Each precision row must declare a projection $\Pi_i\mathsf e$ and a shared-variable agreement check before its benchmark residual is interpreted. For statistical rows, $\mathsf e$ must be paired with the finite-window measure carrier $(\Phi_T,\mu_a,K_{\mathrm{det}})$, and the no-hidden-retune witness must show that source, detector, exposure, and Noether sea rows are not changed between the rate, form-factor, width, lifetime, and branching readouts.

The event balance row should reduce to

$$
\mathcal L_{E\mathbf p\mathbf J}(\mathsf e)
=
\left(
\Delta_E,
\Delta_{\mathbf p},
\Delta_{\mathbf J},
\Delta_{\mathrm{pol}},
\Delta_{\mathrm{arch}},
\Delta_{\mathrm{path}},
\Delta_{\mathrm{med}},
\Delta_{\mathrm{rem}}
\right)(\mathsf e)
=\mathbf 0
$$

before any precision equation is treated as more than a comparison target.

## EQ-26: Atomic Spectral Constants, Fine/Hyperfine Structure, And Lamb-Shift Class

### Standard Equation / Regime

The gross hydrogenic benchmark is

$$
\frac{1}{\lambda}
=
R_\infty
\left(
\frac{1}{n_b^2}
-
\frac{1}{n_a^2}
\right),
\qquad
\Delta E=h\nu.
$$

The precision regime decomposes the observed level energy as

$$
E_{n\ell jm_F}
=
E_{\mathrm{Ryd}}(n)
+
\Delta E_{\mathrm{fine}}
+
\Delta E_{\mathrm{hfs}}
+
\Delta E_{\mathrm{Lamb}}
+
\Delta E_{\mathrm{field}}
+\cdots.
$$

### Mapped Form

For a weak homogeneous hydrogen line set $\mathcal L_{\mathrm H}^{0}$, the mapped coefficient row should be

$$
\widehat R_{\mathrm H}^{(\ell)}(a,b)
=
\frac{
\left(\Gamma_N^{(\ell)}\right)^{-1}
\left[
E_{\text{env}}^{(\ell)}(a)-E_{\text{env}}^{(\ell)}(b)
\right]/h
}{
c_{\gamma,0}^{(\ell)}
\left(
n_b^{-2}-n_a^{-2}
\right)
}.
$$

The closure residual is the vector

$$
\mathbf R_{26}
=
\left(
\Delta_R,
\mathcal E_{\mathrm{gap}},
\mathcal E_{\mathrm{evt}},
\Delta_{\mathrm{recoil}},
\Delta_{\mathrm{spin}},
\Delta_{\mathrm{Lamb}}
\right),
$$

where $\Delta_R$ tests transition-independent $\widehat R_{\mathrm H}$, $\mathcal E_{\mathrm{gap}}$ tests envelope gaps, $\mathcal E_{\mathrm{evt}}$ tests the emission/absorption event ledger, $\Delta_{\mathrm{recoil}}$ keeps reduced-mass and recoil rows explicit, $\Delta_{\mathrm{spin}}$ collects fine/hyperfine/Zeeman/Stark rows, and $\Delta_{\mathrm{Lamb}}$ collects radiation/wake-dressing residuals.

### Noether Braid Variables

- Effective nuclear causal-wake envelope $\mathcal W_{\text{nuc}}$.
- Electron-envelope branch $\mathcal B_e$ and recovered labels $(n,\ell,m)$.
- Envelope energy functional $E_{\text{env}}(a;\mathcal W_{\text{nuc}},\rho_{\text{NS}},n,\chi_{\text{sea}})$.
- Atomic transition event ledger with $E_\gamma$, recoil, remnant, and non-radiative alternatives.
- Internal angular-momentum ledger, ordered-frame spinor row, and nuclear spin row for fine/hyperfine/Zeeman-class residuals.
- Causal-root and branch-Jacobian provenance for replaying the line event.

### Noether Sea Variables

- $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, and $\chi_{\text{sea}}(\mathbf{x},t)$, kept as separate variables.
- Local cadence-stretch diagnostic $\Gamma_N^{(\ell)}$ and clock/rate conversion $\left(\Gamma_N^{(\ell)}\right)^{-1}$.
- Local photon-channel speed $c_{\gamma,0}^{(\ell)}$ for the same weak homogeneous reference line set.
- Material or gravitational environment rows only when the declared benchmark leaves the isolated-hydrogen regime.

### Rows Needed

- Gross envelope-gap row.
- Shared Rydberg coefficient row over $\mathcal L_{\mathrm H}^{0}$.
- Clock/rate conversion row.
- Reduced-mass and recoil row.
- Atomic transition Gate C event row.
- Spin-sensitive row for fine structure, spin-orbit, Zeeman, and hyperfine terms.
- Lamb-shift-class radiation/wake-dressing row tied to photon Gate B/C and causal-wake regularization.

### `6/23 b` Score Recommendation

Recommend `3`. The variable map and residual grammar are explicit, but the native electron-envelope calculation and spin/radiation corrections remain derivation targets.

### First Mathematical Object

Build the residual vector $\mathbf R_{26}$ for one chosen hydrogen line set $\mathcal L_{\mathrm H}^{0}$ and require all entries to use the same $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$, $\Gamma_N^{(\ell)}$, $\chi_{\text{sea}}^{(\ell)}$, and $c_{\gamma,0}^{(\ell)}$.

### Failure Mode

`eq26.per_line_fit`: $R_\infty$ or $\Gamma_N$ is retuned line by line, $(n,\ell,m)$ are used as inputs rather than recovered labels, $n$ and $\chi_{\text{sea}}$ collapse into one parameter, or reduced-mass/recoil/Lamb-shift terms are hidden inside the gross line fit.

### Promotion Targets

- `content/markdown/aaa/nuclear-atomic/atomic-spectra.md`
- `content/markdown/aaa/reactions/atomic-transition-radiation.md`
- `content/markdown/aaa/validation/architrino-si-base-units.md`
- `content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md`

Promotion condition: one hydrogen packet derives the envelope gaps, shared coefficient row, event ledger, and clock/rate conversion from the same branch record.

## EQ-27: Magnetic Moment, Larmor/Cyclotron Precession, And $g-2$

### Standard Equation / Regime

The benchmark equations are

$$
\boldsymbol\mu_\ell
=
g_\ell
\frac{q_\ell}{2m_\ell}
\mathbf S,
\qquad
a_\ell
=
\frac{g_\ell-2}{2},
$$

with

$$
\omega_c=\frac{\lvert q_\ell\rvert B}{m_\ell},
\qquad
\omega_L=
g_\ell
\frac{\lvert q_\ell\rvert B}{2m_\ell}.
$$

### Mapped Form

The mapped magnetic response should be a projection from the retained lepton branch:

$$
\boldsymbol\mu_\ell^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\mathcal P_{\mu}
\left[
\mathcal J_{\mathrm{core}},
q_\ell,
M_\ell^{\mathrm{exp}},
\mathcal V_{\mathrm{NS}},
\Theta_{\mathrm{app}}
\right],
$$

with anomaly decomposition

$$
a_\ell^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
a_{\ell,\mathrm{int}}
+
a_{\ell,\mathrm{dress}}
+
\mathcal R_{g-2}.
$$

Here $\mathcal J_{\mathrm{core}}$ is the retained angular-momentum/spinor ledger, $M_\ell^{\mathrm{exp}}$ is exposed mass response, $\mathcal V_{\mathrm{NS}}$ is the Noether sea anisotropy/effective magnetic-state row, and $\Theta_{\mathrm{app}}$ is the precession apparatus record.

The leading-$g$ theorem route should reuse the ordered-frame/exposure quotient from `EQ-15`, not assign a spin label. Let $\Phi:S^1\to SO(3)$ be the retained ordered-frame period loop and let $\mathcal E_S$ be the exposed-sector measure. The magnetic moment target is a moment-map row

$$
\boldsymbol\mu
=
\int_{\mathfrak D_R}
(\mathbf r\times\mathbf j_{\mathrm{exp}})\,d\mathcal E_S,
$$

with precession read as the connection holonomy around $\Phi$. The leading comparison $g=2$ becomes a covering-degree theorem target: prove that the relevant loop traverses the $SO(3)$ holonomy once while its lift to $\mathrm{Spin}(3)=SU(2)$ carries the spin transport as the double-cover generator. The anomaly $g-2$ is then reserved for nonuniform exposure, dressing, apparatus, and Noether sea response residuals.

### Noether Braid Variables

- Branch-resolved $\mathbf L_{\text{mech}}+\mathbf L_{\text{wake}}$ ledger.
- Ordered Noether braid frame and candidate spinor coordinate.
- Layer variables $(R_\ell,\omega_\ell,\hat{\mathbf n}_\ell)$ for $\ell\in\{I,M,O\}$ where the lepton branch is represented by a nested shell braid.
- Polarity and observer-level charge ledger.
- Exposed mass response $M_\ell^{\mathrm{exp}}$.
- Internal current geometry and measurement-response branch for precession.

### Noether Sea Variables

- Effective magnetic-state map $\mathcal V_{\mathrm{NS}}$ or successor constitutive row.
- $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, and $\chi_{\text{sea}}(\mathbf{x},t)$ for local medium response.
- Apparatus material and wake rows that produce the external-field comparison without treating $B$ as substrate ontology.

### Rows Needed

- Leading magnetic moment row.
- Cyclotron row tied to exposed mass and charge/polarity.
- Larmor precession row tied to the same branch spinor coordinate.
- Apparatus measurement-response row.
- Dressing rows for radiation, weak, hadronic, and wake-sensitive corrections.
- Lepton-family consistency row so electron, muon, and tau comparisons do not retune the leading spin ledger independently.

### `6/23 b` Score Recommendation

Recommend `2`. The closure dependencies are clear, but current material still blocks proof on ordered-frame spinor closure and concrete magnetic-response apparatus dynamics.

### First Mathematical Object

Define the lepton magnetic residual vector

$$
\mathbf R_{27}
=
\left(
\Delta_{\mu},
\Delta_{\omega_c},
\Delta_{\omega_L},
\Delta_{a_\ell}
\right)
$$

for one branch and one apparatus configuration, with all four residuals consuming the same $\mathcal J_{\mathrm{core}}$, $M_\ell^{\mathrm{exp}}$, and $\mathcal V_{\mathrm{NS}}$.

The first decisive combined certificate should report

$$
\mathfrak C_{\mathrm{spin}\to\mu}
=
\left(
\Phi_\star,\widetilde\Phi_\star,\eta_{\mathrm{spin}},
\Delta_{\mathrm{gauge}},
\Delta_{\mathbf J},
\boldsymbol\mu_{\mathcal E},
g_{\mathrm{lead}},
\mathcal R_{\mathrm{fib}}
\right).
$$

The intended first pass is $\eta_{\mathrm{spin}}=1$, doubled-path restoration, $\Delta_{\mathrm{gauge}}=0$, $\Delta_{\mathbf J}\le\varepsilon_{\mathbf J}$, and $g_{\mathrm{lead}}=2$ as a covering-degree result. $\mathcal R_{\mathrm{fib}}$ then carries exposure-measure nonuniformity and becomes the first anomaly residual rather than a fitted spin-label correction.

Score-5 acceptance would require the same $\mathcal J_{\mathrm{core}}$, $M_\ell^{\mathrm{exp}}$, $\mathcal V_{\mathrm{NS}}$, and $\Theta_{\mathrm{app}}$ to feed $\Delta_{\mu}$, $\Delta_{\omega_c}$, $\Delta_{\omega_L}$, and $\Delta_{a_\ell}$ with no lepton-family retune of the leading ledger. Naming the vector does not raise the score; a retained branch or apparatus calculation must populate it.

The score-neutral executable checker is [spin-magnetic-moment-certificate.mjs](../../../scripts/equation-mapping/spin-magnetic-moment-certificate.mjs), with the attempt fixture [spin-magnetic-moment-certificate-attempt.v1.json](../../../scripts/equation-mapping/spin-magnetic-moment-certificate-attempt.v1.json). The current run reports:

```text
status: blocked_missing_rows
scoreDecision: no_score_increase
nextBlocker: missing_accepted_ordered_frame_loop
```

The fixture has the intended numeric shape, including $\eta_{\mathrm{spin}}=1$ and $g_{\mathrm{lead}}=2$, but all rows remain `attempt`. The checker therefore treats numeric leading-$g$ structure as non-score evidence until the ordered-frame loop, spin lift, gauge-control row, angular-momentum ledger, moment-map magnetic row, covering-degree row, and exposure-fiber residual are accepted and source-backed on the same record.

### Failure Mode

`eq27.assigned_spin_label`: $g_\ell$ or $a_\ell$ is assigned from observer-level spin notation, the magnetic-state map changes between cyclotron and Larmor rows, QED loop diagrams are treated as literal substrate paths, electron/muon/tau anomalies require independent leading ledgers, or the checker reports `missing_accepted_ordered_frame_loop`, `missing_accepted_moment_map_magnetic`, or `blocked_leading_g_not_two`.

### Promotion Targets

- `content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md`
- `content/markdown/aaa/nuclear-atomic/atomic-spectra.md`
- `content/markdown/aaa/validation/architrino-si-base-units.md`
- `content/markdown/aaa/philosophy-history/unknowns-paradoxes.md`

Promotion condition: a retained branch supplies the leading magnetic moment and precession residuals before any $g-2$ precision claim is promoted.

## EQ-28: Compton, Photoelectric, Pair-Threshold, And Recoil Equations

### Standard Equation / Regime

The event-level recoil benchmark is

$$
\Delta\lambda
=
\frac{h}{m_ec}
\left(
1-\cos\theta
\right).
$$

Photoelectric and pair-threshold comparisons add

$$
K_{\max}=h\nu-\Phi,
\qquad
E_\gamma\ge2m_ec^2,
$$

with pair production requiring a momentum-balancing environment or photon-photon invariant threshold.

### Mapped Form

The shared event packet is

$$
\mathcal L_{\gamma T}^{\mathrm{in}}
\longrightarrow
\mathcal L_{\gamma'}^{\mathrm{out}}
+
\mathcal L_{T'}^{\mathrm{out}}
+
\mathcal L_{\mathrm{recoil}}
+
\mathcal L_{\mathrm{med}}
+
\mathcal R_{28}.
$$

For Compton-like scattering, the first comparison residual is

$$
\Delta_{\lambda}^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\left[
\lambda'-\lambda
\right]
-
\frac{h}{M_T^{\mathrm{exp}}c_\gamma}
\left(1-\cos\theta\right),
$$

where $M_T^{\mathrm{exp}}$ is the exposed target mass response and $c_\gamma$ is the local photon-channel speed used by the same Gate A record.

### Noether Braid Variables

- Incoming and outgoing photon-channel records, including $E_\gamma$, $\mathbf p_\gamma$, direction, phase frequency, and Gate A null-branch status.
- Target charged assembly branch and exposed mass response.
- Recoil branch, material branch, and remnant rows.
- Pair-production provenance row with identity-routed architrino / Noether braid recruitment.
- Angular-momentum and photon Gate B handoff rows.
- Path-history provenance for incoming and outgoing causal-wake records.

### Noether Sea Variables

- Local $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, and photon-channel speed $c_\gamma$.
- Material or nuclear environment rows that supply momentum balance for threshold events.
- Medium excitation and thermalization rows for non-radiative or partially absorbed energy.

### Rows Needed

- Photon Gate A input/output row.
- Photon Gate B transverse handoff row.
- Target assembly and recoil row.
- Material work-function or capture-basin row for photoelectric cases.
- Pair-threshold identity-routing row.
- Energy, momentum, angular-momentum, polarity, and path-history event ledger.
- Residual row for Compton shift, photoelectric threshold, and pair-threshold topology.

### `6/23 b` Score Recommendation

Recommend `3`. The row has a strong event-ledger carrier and local corpus support, but no closed calculation yet derives the standard $\Delta\lambda$ form from the retained photon and target records.

### First Mathematical Object

Build one Compton/recoil event residual

$$
\mathbf R_{28}
=
\left(
\Delta_E,
\Delta_{\mathbf p},
\Delta_{\mathbf J},
\Delta_{\lambda},
\Delta_{\mathrm{GateA}},
\Delta_{\mathrm{GateB}}
\right)
$$

for a weak homogeneous electron target and require the same $h$, $M_e^{\mathrm{exp}}$, $c_\gamma$, and recoil ledger used by `EQ-26`.

For the first replay, specialize the event to a weak homogeneous electron target,

$$
\mathsf e_{\gamma e}^{0}
=
\left(
X_{\gamma e}^{0},
I_{\mathsf e},
Y_{\mathsf e}
\right),
$$

where $X_{\gamma e}^{0}$ carries the incoming photon-channel record, the exposed electron target record, the local Noether sea variables, and the same $h$, $M_e^{\mathrm{exp}}$, $c_\gamma$, and recoil convention used by the weak homogeneous `EQ-26` line-set packet. Before interpreting $\Delta_{\lambda}$, require the shared-variable agreement check

$$
\Delta_{\mathrm{share}}^{26/28}
=
\left|
\frac{h_{28}-h_{26}}{h_{26}+\varepsilon_h}
\right|
+
\left|
\frac{M_{e,28}^{\mathrm{exp}}-M_{e,26}^{\mathrm{exp}}}{M_{e,26}^{\mathrm{exp}}+\varepsilon_M}
\right|
+
\left|
\frac{c_{\gamma,28}-c_{\gamma,26}}{c_{\gamma,26}+\varepsilon_c}
\right|
+
d_{\mathrm{recoil}}
\left(
\Pi_{\mathrm{recoil}}\mathsf e_{28},
\Pi_{\mathrm{recoil}}\mathsf e_{26}
\right).
$$

The Compton residual may be read only after $\Delta_{\mathrm{share}}^{26/28}$ is small on the declared weak homogeneous record. Otherwise the event has matched the wavelength-shift formula by retuning the photon-channel, exposed-mass, or recoil row rather than by replaying one event ledger.

The shared-variable check is only the anti-retune witness. The replayable Compton object is the weak homogeneous electron-target event balance. In the isolated elastic limit, declare

$$
\mathbf p_\gamma=\frac{E_\gamma}{c_\gamma}\hat{\mathbf e},
\qquad
\mathbf p_{\gamma'}=\frac{E_{\gamma'}}{c_\gamma}\hat{\mathbf e}',
\qquad
E_{e'}
=
\sqrt{
\left(M_e^{\mathrm{exp}}c_\gamma^2\right)^2
+c_\gamma^2\left\|\mathbf p_{e'}\right\|^2
}.
$$

The event rows are

$$
\Delta_E^{\gamma e,0}
=
E_\gamma
+
M_e^{\mathrm{exp}}c_\gamma^2
-
E_{\gamma'}
-
E_{e'}
-
\Delta E_{\mathrm{med}}
-
\Delta E_{\mathrm{rem}},
$$

$$
\Delta_{\mathbf p}^{\gamma e,0}
=
\mathbf p_\gamma
-
\mathbf p_{\gamma'}
-
\mathbf p_{e'}
-
\Delta\mathbf p_{\mathrm{med}}
-
\Delta\mathbf p_{\mathrm{rem}}.
$$

After Gate A supplies $E_\gamma=h\nu=hc_\gamma/\lambda$, the derived recoil residual is

$$
\widehat{\Delta}_{C}^{\gamma e,0}
=
\frac{
\left|
\frac{1}{E_{\gamma'}}
-
\frac{1}{E_\gamma}
-
\frac{1-\hat{\mathbf e}\cdot\hat{\mathbf e}'}{M_e^{\mathrm{exp}}c_\gamma^2}
\right|
}{
\frac{1}{E_{\gamma'}}
+
\frac{1}{E_\gamma}
+
\varepsilon_C
}.
$$

Equivalently,

$$
\widehat{\Delta}_{\lambda}^{\gamma e,0}
=
\frac{
\left|
\lambda'
-
\lambda
-
\frac{h}{M_e^{\mathrm{exp}}c_\gamma}
\left(
1-\hat{\mathbf e}\cdot\hat{\mathbf e}'
\right)
\right|
}{
|\lambda'|+|\lambda|+\varepsilon_\lambda
}.
$$

The event is a Compton replay only when $\Delta_{\mathrm{share}}^{26/28}$, $\Delta_E^{\gamma e,0}$, $\Delta_{\mathbf p}^{\gamma e,0}$, $\Delta_{\mathbf J}$, $\Delta_{\mathrm{GateA}}$, $\Delta_{\mathrm{GateB}}$, and $\widehat{\Delta}_{C}^{\gamma e,0}$ are all small on the same $\mathsf e_{\gamma e}^{0}$ record. Any nonzero medium, recoil, remnant, or thermal term must remain an explicit ledger row before the wavelength benchmark is interpreted.

### Cross-Row Precision Surface Use

The next score-neutral use of the Compton replay is the projection map from one populated event to the adjacent photon/event-ledger rows. For the weak homogeneous record, define the row projections

$$
\mathsf e_{\gamma e}^{0}
\longmapsto
\left(
\Pi_{12}\mathsf e_{\gamma e}^{0},
\Pi_{13}\mathsf e_{\gamma e}^{0},
\Pi_{26}\mathsf e_{\gamma e}^{0},
\Pi_{28}\mathsf e_{\gamma e}^{0},
\Pi_{29}^{m}\mathsf e_{\gamma e}^{0}
\right).
$$

Here $\Pi_{12}$ reads the photon Gate A/B packet, null/eikonal row, and receiver frequency row; $\Pi_{13}$ reads the effective charge/current, stress, and gauge residuals only as coarse-grained comparison rows; $\Pi_{26}$ reads the shared $h$, $M_e^{\mathrm{exp}}$, $c_\gamma$, recoil convention, and atomic transition event convention; $\Pi_{28}$ reads the Compton balance rows above; and $\Pi_{29}^{m}$ reads a declared radiation source mechanism $m$ only through source depletion, trigger geometry, source cooling, recoil, medium, and spectrum rows.

The composed precision residual is

$$
\mathbf R_{\gamma\text{-}\mathrm{evt}}^{0,m}
=
\left(
\mathcal R_{\gamma,\mathrm{packet}}[\Pi_{12}\mathsf e_{\gamma e}^{0}],
\mathcal G_{\mathrm{EM}}[\Pi_{13}\mathsf e_{\gamma e}^{0}],
\Delta_{\mathrm{share}}^{26/28},
\widehat{\Delta}_{C}^{\gamma e,0},
\mathbf R_{29}^{m}[\Pi_{29}^{m}\mathsf e_{\gamma e}^{0}]
\right).
$$

For the first replay, set $m=\text{Compton exchange}$ and require $\Pi_{29}^{m}$ to classify the event as a frequency-exchange or scattering-shift row, not as source emission. A later synchrotron or bremsstrahlung packet may change $\Pi_{29}^{m}$, but it must keep the photon carrier $(P_\gamma,E_\gamma,\mathbf p_\gamma,c_\gamma,\mathbf J_{\gamma}^{\mathrm{sub}})$ and the source-mechanism rows separate.

This block is a residual-composition target, not a derivation of $E=h\nu$, Maxwell's equations, the Rydberg coefficient, the Compton shift, or any radiation-power law. A score change is allowed only after $\mathbf R_{\gamma\text{-}\mathrm{evt}}^{0,m}$ is populated on a finite event ledger with the same $h$, $c_\gamma$, $M_e^{\mathrm{exp}}$, recoil convention, Noether sea state, and Gate A/B rows across the projections.

### Executable Compton Replay Check

The score-neutral executable reducer is [compton-recoil-event-replay.mjs](../../../scripts/equation-mapping/compton-recoil-event-replay.mjs). It consumes a weak homogeneous Compton/recoil event input and evaluates the shared $h$, $c_\gamma$, $M_e^{\mathrm{exp}}$, recoil convention, energy balance, momentum balance, inverse-energy Compton residual, and wavelength-shift residual.

Command:

```sh
node scripts/equation-mapping/compton-recoil-event-replay.mjs --summary --pretty
```

Default summary:

| Field | Result |
| --- | --- |
| Event | `e_gamma_e_0` |
| Status | `comparison_replay_closed_native_rows_missing` |
| Score decision | `no_score_increase` |
| Shared `EQ-26` rows | `shared_rows_match` |
| Energy residual | `3.70e-17` |
| Momentum residual | `0` |
| Compton inverse-energy residual | `7.40e-17` |
| Wavelength residual | `7.40e-17` |

The checker is deliberately fail-closed. The comparison replay closes because the weak homogeneous output photon energy is computed from the Compton relation and the recoil momentum is then balanced. It is not a native $\mathbb{A}\mathbb{A}\mathbb{A}$ event-ledger certificate until these rows are accepted on the same $\mathsf e_{\gamma e}^{0}$ record:

- `photon_gate_A_input_output`
- `photon_gate_B_transverse_handoff`
- `target_retained_branch`
- `recoil_branch`
- `angular_momentum_ledger_delta_J`
- `noether_sea_state_row`
- `energy_momentum_event_ledger`

Running the same checker with `--require-native-closed` exits nonzero while those rows are missing. That behavior is the intended guardrail: the script verifies the algebraic comparison surface and the shared-variable anti-retune witness, but it does not raise `EQ-28` or any adjacent row.

Native rows and event-ledger support rows must be structured retained row objects with concrete `rowId`, source reference, and `eventId` fields tied to the same event carrier. Accepted source references must resolve to durable source/evidence files; placeholder strings, missing files, temp files, and generated reading copies report `accepted_without_retained_reference` or `accepted_without_existing_source` rather than closing the row. Accepted `medium` and `remnant` support rows must also carry explicit `delta_E` and `delta_p` fields; omitted deltas report `accepted_without_explicit_delta`, and nonzero weak-homogeneous deltas report `accepted_nonzero_weak_homogeneous_delta`. A bare `accepted` string is reported as `accepted_without_retained_reference`, and a row whose `eventId` does not match the event carrier is reported as `accepted_event_id_mismatch`. None of those statuses closes the native event ledger.

The direct native-event attempt packet is [compton-recoil-native-event-attempt.v1.json](../../../scripts/equation-mapping/compton-recoil-native-event-attempt.v1.json):

```sh
node scripts/equation-mapping/compton-recoil-event-replay.mjs --input scripts/equation-mapping/compton-recoil-native-event-attempt.v1.json --summary --pretty
```

It returns `comparison_replay_closed_native_rows_missing`, `scoreDecision=no_score_increase`, `nativeLedgerStatus=native_rows_missing`, and `nextBlocker=missing_accepted_photon_gate_A_input_output`; the `nativeRowStatuses` map reports all seven required rows as `attempt`, and the `eventLedgerSupportStatuses` map reports `medium=attempt` and `remnant=attempt`. Running the same input with `--require-native-closed` exits nonzero. The packet therefore fixes the retained event-ledger shape while leaving the score-moving burden exactly where it belongs: accepted photon Gate A/B, target branch, recoil branch, angular-momentum delta, Noether sea state, energy-momentum ledger, and explicit medium/remnant support rows on the same $\mathsf e_{\gamma e}^{0}$ record.

### Failure Mode

`eq28.frequency_loss_without_recoil`: Compton-like exchange is treated as phenomenological photon frequency loss, pair production is described as creation from nothing, photoelectric capture drops material/recoil rows, or the event uses a different $h$ or exposed mass response than atomic spectra.

### Promotion Targets

- `content/markdown/aaa/reactions/radiation.md`
- `content/markdown/aaa/reactions/atomic-transition-radiation.md`
- `content/markdown/aaa/validation/reaction-ledger.md`
- `content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md`
- `content/markdown/aaa/assemblies/bosons/electroweak-bosons.md`

Promotion condition: a replayable photon-target event closes energy, momentum, angular momentum, recoil, medium, and photon Gate A/B residuals while reproducing the standard Compton shift in the weak homogeneous limit.

## EQ-29: Larmor/Lienard Radiation, Synchrotron, Bremsstrahlung, And Thermal Channels

### Standard Equation / Regime

The standard radiation-power benchmarks include

$$
P_L
=
\frac{q^2a^2}{6\pi\epsilon_0c^3}
$$

and the relativistic comparison

$$
P
=
\frac{q^2\gamma^6}{6\pi\epsilon_0c^3}
\left(
a^2
-
\frac{\lVert\mathbf v\times\mathbf a\rVert^2}{c^2}
\right).
$$

Synchrotron adds the characteristic scale

$$
\nu_c\propto\gamma^2B.
$$

Bremsstrahlung and thermal free-free comparisons add $d\sigma/dk$, screening/form-factor corrections, and emissivity scalings such as $\epsilon_{\nu}^{\mathrm{ff}}\propto Z^2 n_e n_i T^{-1/2}e^{-h\nu/(k_B T)}g_{\mathrm{ff}}$.

### Mapped Form

The source-mechanism map is

$$
\mathcal B_{\mathrm{source}}
\longrightarrow
\left(
\mathcal L_{\gamma},
\mathcal L_{\mathrm{recoil}},
\mathcal L_{\mathrm{med}},
\mathcal L_{\mathrm{wake}},
\mathcal L_{\mathrm{rem}},
\mathcal R_{\mathrm{rad}}
\right),
$$

with mechanism-local residual

$$
\mathcal R_{\Theta}^{m}
=
\mathcal R_{\Theta}
\left(
\Gamma_{\mathrm{src}}(t),
\mathcal C_{o'j}(t),
J_{o'j},
\rho_{\text{NS}}(\mathbf{x},t),
\chi_{\text{sea}}(\mathbf{x},t);
Z_m
\right),
$$

where $m$ is a declared source mechanism and $Z_m$ is its observer-level comparison data, such as deceleration geometry for bremsstrahlung or $\mathcal V_{\mathrm{NS}}$, $G_{\text{grad}}$, and curved transport for synchrotron.

### Noether Braid Variables

- Source assembly microstate $\Gamma_{\mathrm{src}}(t)$.
- Layer closure mismatches $\delta\Theta_a$ for $a\in\{I,M,O\}$.
- Excitation energy $E_{\text{exc}}$ above the nearest stable rung.
- Source-depletion row for $\mathcal Q\in\{E,\mathbf p,\mathbf J\}$.
- Planar-mode drive $\mathcal S_\gamma^{m}$ and photon output row.
- Recoil, remnant, pair-channel handoff, and non-radiative shedding rows.
- Gate B polarization handoff, not a local photon-spin proof.

### Noether Sea Variables

- $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, and $\chi_{\text{sea}}(\mathbf{x},t)$.
- Local causal-root and Jacobian data $J_{\text{loc}}$.
- Anisotropic Noether sea state $\mathcal V_{\mathrm{NS}}$ when mapping observer-level $B$.
- Gradient forcing $G_{\text{grad}}$.
- Thermalization depth, medium excitation, and blackbody/detailed-balance rows for ensemble limits.

### Rows Needed

- Carrier/channel-family declaration row: photon-channel output, frequency-exchange/scattering shift, reaction-product carrier, or gravitational-wave/effective-metric tensor disturbance.
- Source mechanism declaration row: atomic transition, bremsstrahlung, synchrotron, thermal/free-free, reaction-product source, or another declared source ledger.
- Closure residual and planar-mode threshold row.
- Power and spectrum benchmark row.
- Source cooling and recoil row.
- Medium / Noether sea update row.
- Gate B polarization and angular-momentum handoff row.
- Thermal detailed-balance row when blackbody or free-free ensemble behavior is claimed.

### `6/23 b` Score Recommendation

Recommend `3`. The event grammar is developed enough for a strong partial map, but standard $P_L$, Lienard, bremsstrahlung emissivity, synchrotron $\gamma^2B$, and blackbody limits still need derivation from one mechanism-declared ledger.

### First Mathematical Object

Use synchrotron as the first concrete source packet:

$$
\mathbf R_{29}^{\mathrm{syn}}
=
\left(
\Delta_P,
\Delta_{\nu_c},
\Delta_{\mathrm{cool}},
\Delta_{\mathrm{pol}},
\Delta_{\mathrm{pair}},
\Delta_{\mathrm{evt}}
\right),
$$

with all entries consuming one $\Gamma_{e^\pm}$, $\mathcal V_{\mathrm{NS}}$, $G_{\text{grad}}$, $\mathcal R_{\Theta}^{\mathrm{syn}}$, and photon event ledger.

### Failure Mode

`eq29.source_channel_collapse`: atomic transition radiation, bremsstrahlung, synchrotron, thermal radiation, Compton-like exchange, and reaction-product radiation are treated as one mechanism; power is appended as a radiation-reaction force law; thermal spectra are fit independently of event ledgers; or Gate B polarization is derived locally by source-channel prose.

### Promotion Targets

- `content/markdown/aaa/reactions/radiation.md`
- `content/markdown/aaa/reactions/bremsstrahlung.md`
- `content/markdown/aaa/reactions/synchrotron.md`
- `content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md`
- `content/markdown/aaa/validation/known-tensions.md`

Promotion condition: one mechanism packet recovers validated power, spectrum, source cooling, recoil, and event-balance behavior from one source ledger before Noether sea-dependent deviations are promoted.

## EQ-30: Scattering Cross Sections And Form Factors

### Standard Equation / Regime

The cross-section comparison is

$$
d\sigma_{a\to b}
=
\frac{1}{\mathcal F}
\lvert\mathcal M_{a\to b}\rvert^2
d\Pi_b,
$$

and finite-size or exposure distributions are summarized by

$$
F(\mathbf q)
=
\int d^3x\,
\rho_{\mathrm{exp}}(\mathbf x)
e^{i\mathbf q\cdot\mathbf x}.
$$

### Mapped Form

The branch-statistics comparison should be

$$
\sigma_{a\to b}^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\frac{1}{\Phi_{\mathrm{in}}T}
\int_{\Gamma_a}
\mathbf 1_{b}
\left(
\Phi_T(x)
\right)
K_{\mathrm{det}}(x)\,d\mu_a(x)
+
\mathcal R_{\sigma},
$$

with form-factor readout

$$
F_{\mathbb{A}\mathbb{A}\mathbb{A}}(\mathbf q)
=
\int_{\Sigma_t}
\rho_{\mathrm{exp}}^{\mathbb{A}\mathbb{A}\mathbb{A}}
\left(
\mathbf x;\theta_{\mathrm{branch}},\theta_{\mathrm{sea}},K_{\mathrm{det}}
\right)
e^{i\mathbf q\cdot\mathbf x}\,dV
+
\mathcal R_F.
$$

### Noether Braid Variables

- Prepared branch ensemble $\Gamma_a$.
- Return or transition map $\Phi_T$ over the observation window.
- Basin partition $\{B_b\}$ for final-state classes.
- Branch-outcome measure $\mu_a$.
- Detector kernel $K_{\mathrm{det}}$ and event-class selector $\mathbf 1_b$.
- Exposure distribution $\rho_{\mathrm{exp}}^{\mathbb{A}\mathbb{A}\mathbb{A}}$ from finite Noether braid, wake, axial-layer, or material-response structure.

### Noether Sea Variables

- Local $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, and $\chi_{\text{sea}}(\mathbf{x},t)$ in the target and detector region.
- Medium response, screening, anisotropy, and attenuation rows when the scattering environment is not vacuum-like.
- Photon or gauge-channel transport rows when the incoming or outgoing channel uses Gate A/B/C data.

### Rows Needed

- Prepared flux-to-branch-ensemble row.
- Event transition map row.
- Detector kernel and acceptance row.
- Final-state classification row.
- Form-factor exposure distribution row.
- Elastic / inelastic / deep-inelastic regime row.
- Cross-section residual row against the standard comparison formula.

### `6/23 b` Score Recommendation

Recommend `2`. The comparison object is plausible, but no current packet ties a specific scattering amplitude, detector kernel, flux calibration, and form factor to a computed branch ensemble.

### First Mathematical Object

Build an elastic electron-proton scattering packet with residual

$$
\mathbf R_{30}^{ep}
=
\left(
\Delta_{\Phi},
\Delta_{K},
\Delta_{\sigma},
\Delta_F,
\Delta_{\mathrm{regime}}
\right),
$$

where $\Delta_{\Phi}$ checks prepared flux mapping, $\Delta_K$ checks detector acceptance, $\Delta_{\sigma}$ checks rate normalization, $\Delta_F$ checks the finite exposure distribution, and $\Delta_{\mathrm{regime}}$ checks that elastic and inelastic event classes are not mixed.

This packet should instantiate the common finite-window statistical carrier

$$
\mathcal C_{\mathrm{stat}}^{W,T}
=
\left(
W,
T,
\Phi_T,
\mu_{*,T},
\mathcal Q,
K_{\mathrm{det}},
\mathcal B,
\mathcal C,
\mathcal S_{\mathrm{retune}}
\right),
$$

using $\Gamma_a\subset W$, $\mu_a$ as the prepared branch measure, $\mathcal B=\{B_b\}$ as the final-state partition, and an empty or inert $\mathcal C$ unless the elastic packet is coupled to a metastable exit-corridor row. Then $\Delta_{\sigma}$ and $\Delta_F$ are projections of the same carrier rather than separately normalized fits.

For form factors, the exposure quotient is comparison-grade only when the quotient action preserves the spatial measure. The test row is rotational covariance of

$$
F_{\mathbb{A}\mathbb{A}\mathbb{A}}(\mathbf q)
=
\int e^{i\mathbf q\cdot\mathbf x}\,d\mathcal E_S(\mathbf x).
$$

If the retained quotient acts by isometries and $\mathcal E_S$ is invariant under the residual stabilizer, then $\lvert F(\mathbf q)\rvert$ depends only on $\lvert\mathbf q\rvert$ or the declared residual point-group orbit. If a non-isometric relabeling is used as a quotient, the form factor is detector-tuned and cannot support `EQ-30`.

The elastic packet passes only if $\Delta_{\Phi}$, $\Delta_K$, $\Delta_{\sigma}$, $\Delta_F$, and $\Delta_{\mathrm{regime}}$ consume one prepared ensemble $\Gamma_a$, one transition map $\Phi_T$, one branch measure $\mu_a$, one detector kernel $K_{\mathrm{det}}$, and one exposure distribution $\rho_{\mathrm{exp}}^{\mathbb{A}\mathbb{A}\mathbb{A}}$. An imported amplitude or form factor may be used as a comparison surface, not as a substitute for the finite-window pushforward.

For the detector-kernel component of $\mathbf R_{30}^{ep}$, define the detected class measure at record resolution $\ell$:

$$
A_b^{K,\ell}(T)
=
\int_{\Gamma_a}
\mathbf 1_b(\Phi_T(x))
K_{\mathrm{det}}^\ell(x)\,d\mu_a(x).
$$

Then the detector-kernel residual is

$$
\Delta_K
=
\max_b
\frac{
\left|
A_b^{K,\ell/2}(T)-A_b^{K,\ell}(T)
\right|
}{
A_b^{K,\ell}(T)+\varepsilon_K
}
+
\lambda_{\mathrm{retune}}
\mathcal S_{\mathrm{retune}}
\left(
K_{\mathrm{det}}^\ell;
\Gamma_a,\Phi_T,\mu_a,
\rho_{\mathrm{exp}}^{\mathbb{A}\mathbb{A}\mathbb{A}},
\theta_{\mathrm{sea}}
\right).
$$

The same $K_{\mathrm{det}}^\ell$ must be reused when computing $\Delta_{\sigma}$, $\Delta_F$, and any `EQ-31` detector/classification residual. If $\Delta_K$ can be reduced only by changing $\mu_a$, $\rho_{\mathrm{exp}}^{\mathbb{A}\mathbb{A}\mathbb{A}}$, or $\theta_{\mathrm{sea}}$ per observable, the packet fails as hidden retuning.

### Executable Status

The shared carrier evaluator [finite-window-statistical-carrier.mjs](../../../scripts/equation-mapping/finite-window-statistical-carrier.mjs) now computes the `EQ-30` scattering and form-factor projection rows from $\mathcal C_{\mathrm{stat}}^{W,T}$. The toy input [finite-window-statistical-carrier-eq30-elastic-toy.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-toy.v1.json) reports `toy_structure_only`, `scoreDecision: no_score_increase`, `nextBlocker: missing_accepted_W`, and passing numeric diagnostics for prepared flux, detector refinement, cross-section normalization, form-factor covariance, and elastic-regime purity.

This is an executable shape check only. Score movement still requires accepted, source-backed parent carrier rows `W`, `Phi_T`, `mu_star_T`, `Q`, `K_det`, `B`, and `S_retune`, followed by accepted `EQ-30` rows for `Gamma_a`, `Phi_in`, detected class measures, cross-section comparisons, $\rho_{\mathrm{exp}}$, form-factor samples, and elastic-regime purity.

### Failure Mode

`eq30.amplitude_import`: $\mathcal M$ or $F(Q^2)$ is copied from standard theory as a black-box fit, detector response is external to the recorded state, form factors become arbitrary profiles, or deep-inelastic and elastic limits require different ontologies.

### Promotion Targets

- `content/markdown/aaa/quantum/measurement-ontology.md`
- `content/markdown/aaa/validation/reaction-ledger.md`
- `content/markdown/aaa/validation/failure-criteria.md`
- `content/markdown/aaa/nuclear-atomic/nucleon-structure.md`

Promotion condition: one scattering packet derives event rates and a finite exposure form factor from the same branch ensemble and detector kernel.

## EQ-31: Resonance Widths, Lifetimes, And Branching Fractions

### Standard Equation / Regime

Metastable states are commonly summarized by

$$
A(E)
\propto
\frac{1}{E-E_0+i\Gamma/2},
\qquad
\sigma(E)
\propto
\frac{\Gamma^2/4}
{(E-E_0)^2+\Gamma^2/4},
$$

with

$$
\tau=\frac{\hbar}{\Gamma},
\qquad
\sum_k B_k=1.
$$

### Mapped Form

For a metastable Noether braid branch $B_\star$ with admissible exit corridors $C_k$, define event-rate rows

$$
\gamma_k^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\frac{1}{T}
\mu_T
\left\{
x\in B_\star:
\Phi_T(x)\in C_k
\right\},
\qquad
\gamma_{\mathrm{tot}}=\sum_k\gamma_k.
$$

The additive version defines corridors intrinsically through the first-exit map:

$$
\tau(x)=\inf\{t:\Phi_t(x)\notin B_\star\},
\qquad
e(x)=\Phi_{\tau(x)}(x)\in\partial B_\star.
$$

Then $C_k$ are measurable components of $\operatorname{image}(e)$ in the boundary collar and

$$
\gamma_k^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\frac{1}{T}
\mu_T\{x\in B_\star:e(x)\in C_k\}.
$$

This separates intrinsic escape additivity from detector classification. The detector kernel $K_{\mathrm{det}}$ acts later on the already-additive corridor measures.

The comparison width and branching fractions are then

$$
\Gamma_{\mathrm{cmp}}
=
\hbar\,\gamma_{\mathrm{tot}},
\qquad
\tau_{\mathrm{cmp}}
=
\gamma_{\mathrm{tot}}^{-1},
\qquad
B_k^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\frac{\gamma_k}{\gamma_{\mathrm{tot}}}.
$$

The Breit-Wigner-like profile is a comparison-layer shape recovered only after the finite-window escape/dephasing measure produces the same $\Gamma_{\mathrm{cmp}}$.

### Noether Braid Variables

- Metastable branch label $B_\star$ and retained branch energy $E_0$.
- Return map $\Phi_T$ and basin measure $\mu_T$.
- Branch-stability residual and separatrix distance.
- Exit corridors $C_k$ with identity, energy, momentum, angular-momentum, polarity, and path-history ledgers.
- Branch interference or dephasing row when the resonance line shape is measured through scattering.
- Detector classification kernel for observed final states.
- Null-separatrix estimate $\mu_T(N_\epsilon(\partial\mathcal B))\to0$ so corridor measures are not detector-tuned.

### Noether Sea Variables

- Local $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, cadence, anisotropy, and medium-coupling rows that perturb branch stability.
- Noether sea participation in any exit corridor, recorded as recruited, returned, or medium-excitation content.
- Detector and material environment rows when the measured width is environment-sensitive.

### Rows Needed

- Retained branch-energy row.
- Stability / separatrix row.
- Exit-corridor admissibility row.
- Conservation and identity-routing row for each corridor.
- Width and lifetime row from the same escape/dephasing measure.
- Branching fraction row from relative corridor measures.
- Interference and detector-response residual row for observed line shapes.

### `6/23 b` Score Recommendation

Recommend `2`. The native branch-stability interpretation is clear, but no current row computes a width, lifetime, or branching fraction from a retained Noether braid branch.

### First Mathematical Object

Choose one narrow unstable assembly or resonance and build

$$
\mathbf R_{31}
=
\left(
\Delta_{E_0},
\Delta_{\Gamma},
\Delta_{\tau},
\Delta_{B},
\Delta_{\mathrm{shape}},
\Delta_{\mathrm{corridor}}
\right),
$$

with $\Delta_{\Gamma}$, $\Delta_{\tau}$, and $\Delta_B$ all derived from the same $\{\gamma_k\}$ rather than fitted independently.

This is the metastable specialization of the same finite-window statistical carrier $\mathcal C_{\mathrm{stat}}^{W,T}$. Here $W$ contains the retained metastable branch $B_\star$, $\mathcal B$ is the observed final-state classification, and $\mathcal C=\{C_k\}$ is the admissible exit-corridor family. The width, lifetime, branching, and detector-classification residuals must all consume this single carrier.

The line-shape residual $\Delta_{\mathrm{shape}}$ must use the same detector and interference rows as the escape/dephasing measure. Score-5 requires one retained branch producing $E_0$, $\Gamma$, $\tau$, and $B_k$ from one shared escape measure; the Breit-Wigner profile remains a downstream comparison until that measure is populated.

The score-neutral carrier evaluator [finite-window-statistical-carrier.mjs](../../../scripts/equation-mapping/finite-window-statistical-carrier.mjs) now computes the `EQ-31` projection rows from a supplied $\mathcal C_{\mathrm{stat}}^{W,T}$. The included toy input [finite-window-statistical-carrier-eq31-toy.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-toy.v1.json) reports `toy_structure_only`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_W`; it is an executable shape check, not retained evidence.

Accepted finite-window carrier rows must be structured row objects with `accepted`, `populated`, or `passed` status and a `sourcePath` or `source` reference that resolves to a durable source/evidence file. The label `retained` is not an accepted status. Toy, attempt, placeholder, missing-source, temp-file, generated-reading-copy, and nonzero-retune rows remain blockers.

### Failure Mode

`eq31.fitted_width`: $\Gamma$ is inserted as a line-shape parameter, $\tau$ is fitted separately from the width, branching fractions are assigned without corridor measures, outgoing products omit identity-routing or Noether sea participation, or detector effects are hidden inside the branch stability claim.

### Promotion Targets

- `content/markdown/aaa/quantum/reality-quantum-causality.md`
- `content/markdown/aaa/validation/reaction-ledger.md`
- `content/markdown/aaa/validation/failure-criteria.md`
- `content/markdown/aaa/assemblies/mesons/mesons.md`
- `content/markdown/aaa/assemblies/particle-masses.md`

Promotion condition: one metastable branch packet produces $E_0$, $\Gamma$, $\tau$, and $B_k$ from one retained branch-stability and exit-corridor measure.

## Packet-Level Promotion Triage

- `EQ-26`: defer with blocker. Needs native envelope-gap computation and same-ledger line-set residual.
- `EQ-27`: defer with blocker. Needs ordered-frame spinor and magnetic-response apparatus calculation.
- `EQ-28`: defer with blocker. Needs one replayable Compton/recoil event derivation.
- `EQ-29`: defer with blocker. Needs one source-mechanism derivation of power/spectrum/cooling from a single event ledger.
- `EQ-30`: defer with blocker. Needs one scattering branch-statistics packet with detector kernel and form factor.
- `EQ-31`: defer with blocker. Needs one metastable branch-stability packet producing width, lifetime, and branching fractions.

No row is ready for reader-facing promotion now. The packet is still useful because it turns the assigned precision surfaces into explicit residual vectors, score recommendations, first mathematical objects, and falsifiable failure modes.
