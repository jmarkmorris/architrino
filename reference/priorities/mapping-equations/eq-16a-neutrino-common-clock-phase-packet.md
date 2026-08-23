# EQ-16A Neutrino Common-Clock Phase Packet

## Workstream Metadata

- Kind: `priority`
- Scope: `EQ-16A`
- Status: `draft`
- Promotion status: `priority-only`
- Related packet: [eq-12-16a-photon-quantum-gauge-neutrino-packet.md](eq-12-16a-photon-quantum-gauge-neutrino-packet.md)

## Purpose

This packet sharpens the neutrino oscillation row as a common-clock residual phase-operator target. The immediate goal is not to claim that the iso-frequency Noether braid candidate already explains PMNS data. The goal is to state the smallest mathematical object that would let the equation map test that claim without mistaking hidden common frequency for three observed absolute clocks.

The target belongs inside the equation-map architecture because it reuses three patterns that also appear outside neutrinos:

- a common clock or identity-operator term that cancels from observer probabilities;
- a residual operator whose eigenvalue differences carry the measured beat structure;
- a sector readout projection that maps hidden branch rows into visible weak-channel labels.

## Source Signals

The active source signals are:

- [equation.md](equation.md): `EQ-16A` is scored as a partial map whose closure driver is to factor a common hidden clock while deriving two independent observed phase gaps from one retained neutral-lepton branch.
- [Neutrinos](../../../content/markdown/aaa/assemblies/fermions/neutrinos.md): the reader-facing chapter already states the geometric phase-operator target $H_{\mathrm{geo}}=U_{\mathrm{PMNS}}\Lambda U_{\mathrm{PMNS}}^\dagger$ and keeps flavor-basis preparation/detection separate from propagation-basis evolution.
- iso-frequency-energy-radius-candidate.md: the iso-frequency candidate supplies current-proxy evidence for `(f,f,f)` with phase offsets and different effective lever-arm / speed relations, but retained row-set acceptance is still missing.
- [neutrino-oscillations.md](../mapping-benchmarks/neutrino-oscillations.md): the cross-theory packet names the phase, weak projection, PMNS import, and matter-effect failure modes.
- [weak-sector-gauge-closure.md](../standard-model-closure/weak-sector-gauge-closure.md): PMNS recovery must use the same weak-exposure domain as `V-A`, CKM overlap, and weak-reaction provenance.
- J Mark Morris, [Implementation of the Weak Nuclear Force](https://architrino.wordpress.com/2022/06/20/implementation-of-the-weak-nuclear-force/): legacy NPQG source suggesting that neutrino handedness may be a survival/stability discriminator near the photon-boundary geometry; this packet keeps that signal priority-only and translates it into a branch-stability test, not a neutrino doctrine.

## Common-Clock Decomposition

The working operator should be written as an identity contribution plus a residual phase-rate operator:

$$
H_{\nu}^{\mathrm{eff}}
=
\omega_f C_0\mathbf 1
+
H_{\nu}^{\mathrm{res}}.
$$

Here $\omega_f C_0\mathbf 1$ is the common-clock term inherited from the iso-frequency branch row, and $H_{\nu}^{\mathrm{res}}$ is the part that can affect oscillation probabilities. The residual term may include geometric, weak-exposure, and Noether sea contributions, but they must share one declared branch and weak-domain record:

$$
H_{\nu}^{\mathrm{res}}
=
\delta H_{3B}^{(\nu)}
\left(
S_{\mathrm{eq}},
\rho_a,\phi_a,W_a,
L_{\mathrm{wake}},
L_{\mathrm{coupling}},
\mathcal L_{\mathrm{root}}
\right)
+
V_{\mathrm{sea}}(n(\mathbf{x},t),\Pi_{\mathrm{weak}}).
$$

The matter correction $V_{\mathrm{sea}}$ must be normalized to the same mass-squared-response units as $\delta H_{3B}^{(\nu)}$ before the oscillation phase formula is used. It is not a separate ontology for matter effects.

Since the identity term commutes with the residual,

$$
\exp(-iH_{\nu}^{\mathrm{eff}}T)
=
\exp(-i\omega_f C_0T)
\exp(-iH_{\nu}^{\mathrm{res}}T).
$$

The first factor is a common phase. It cancels from transition probabilities. Therefore the observed phase gaps are not evidence for three freely observed absolute clocks. They are evidence for eigenvalue differences of the residual operator after the common clock has been factored out.

## f:f:f Candidate Reading

The iso-frequency candidate should be read first in unordered row labels:

$$
(f_1,f_2,f_3)=(f,f,f).
$$

An `I:M:O` reading is a role map that can be attached only after a retained branch supplies the nested roles. Under that role map, the candidate has

$$
\omega_I=\omega_M=\omega_O=\omega_f.
$$

That equality belongs in $\omega_f C_0\mathbf 1$, not in the observed residual gaps. The current solver proxy also keeps different phase offsets and different effective lever-arm / speed rows. In the sampled `triadic-120` priority profile,

$$
(\phi_I,\phi_M,\phi_O)=(0,1/3,2/3),
$$

while the current role-assigned effective lever-arm rows have the proportional structure

$$
\rho_I:\rho_M:\rho_O=5:4:3,
\qquad
s_a=\rho_a\omega_f.
$$

This does not prove a physical shell-radius order. It says the common-frequency branch can still carry different speed and exposure rows if the retained branch supplies the effective lever-arm projection, branch return or locked-harmonic frequency certificate, phase row-set identity, and same-event ledger.

## Cluster-Partition Residual Candidate

The legacy coupled-oscillator intuition becomes useful only after it is reduced to a testable residual basis. A priority-only candidate is to let the residual operator act on internal partition classes of the three retained binary rows:
$$
\mathcal P_{\nu}
=
\left\{
ABC,\,
AB|C,\,
AC|B,\,
A|BC,\,
A|B|C
\right\}.
$$
The labels $A,B,C$ are raw retained-row labels, not generation labels and not an `I:M:O` role map. The partition basis says which binary rows are dynamically locked together over the neutrino propagation window after the common clock has been factored out. A reduced residual operator
$$
H_{\nu,\mathcal P}^{\mathrm{res}}
=
\Pi_{\mathcal P}
H_{\nu}^{\mathrm{res}}
\Pi_{\mathcal P}^{\dagger}
$$
is admissible only if $\Pi_{\mathcal P}$ is derived from one retained neutral-lepton branch record. The packet fails if this projection erases the two observed phase-rate gaps, if it imports PMNS as a fitted matrix, or if the partition classes require a different weak-exposure domain from the source and detector rows.

## Residual Spectrum Target

Oscillation data depend on the spectrum modulo an arbitrary identity shift. The invariant object is the traceless residual

$$
\bar H_{\nu}^{\mathrm{res}}
=
H_{\nu}^{\mathrm{res}}
-
\frac{1}{3}\operatorname{tr}(H_{\nu}^{\mathrm{res}})\mathbf 1.
$$

Diagonalization gives

$$
\bar H_{\nu}^{\mathrm{res}}
=
U_{\mathrm{PMNS}}\bar\Lambda U_{\mathrm{PMNS}}^\dagger,
\qquad
\Delta\lambda_{ij}
=
\bar\lambda_i-\bar\lambda_j.
$$

The standard benchmark supplies two independent gaps:

$$
\Delta\lambda_{31}
=
\Delta\lambda_{32}
+
\Delta\lambda_{21}.
$$

For normal ordering, the current useful schematic target is a doublet-plus-singlet residual spectrum rather than equal residual spacing. If $\delta_\nu$ denotes the solar-scale gap,

$$
(\bar\lambda_1,\bar\lambda_2,\bar\lambda_3)
\sim
(-11.5,-10.5,22)\delta_\nu,
$$

with

$$
\bar\lambda_2-\bar\lambda_1=\delta_\nu,
\qquad
\bar\lambda_3-\bar\lambda_2\approx32.5\delta_\nu,
\qquad
\bar\lambda_3-\bar\lambda_1\approx33.5\delta_\nu.
$$

The solver-facing check should use an identity-shift-invariant normalized spectrum, not raw eigenvalues. Define

$$
\widehat{\boldsymbol\lambda}_{\nu}
=
\frac{1}{\Delta\lambda_{21}}
\left(\bar\lambda_1,\bar\lambda_2,\bar\lambda_3\right),
$$

after the ordering convention has been declared. For normal ordering, let

$$
r_{32/21}
\equiv
\frac{\Delta\lambda_{32}}{\Delta\lambda_{21}}.
$$

Then the normalized traceless target is

$$
\widehat{\boldsymbol\lambda}_{\nu}^{\mathrm{NO}}
=
\left(
-\frac{r_{32/21}+2}{3},
\frac{1-r_{32/21}}{3},
\frac{2r_{32/21}+1}{3}
\right).
$$

This check is invariant under $H_{\nu}^{\mathrm{eff}}\mapsto H_{\nu}^{\mathrm{eff}}+\alpha\mathbf 1$. It must be populated from phase-rate gaps, not from static offsets $\phi_i^{(0)}$.

Static phase offsets can shift an interference origin or enter a mixing convention, but they do not by themselves recover the observed $L/E$ oscillation frequency. In propagation form,

$$
\Phi_i(T)
=
\omega_f C_0T+\epsilon_iT+\phi_i^{(0)},
$$

so

$$
\Delta\Phi_{ij}(T)
=
(\epsilon_i-\epsilon_j)T
+
(\phi_i^{(0)}-\phi_j^{(0)}).
$$

The $T$-linear coefficient is the phase-rate gap. The constant offset is not a replacement for $\epsilon_i-\epsilon_j$.

## Mixing And Readout Projection

The packet needs a propagation/readout split. The propagation eigenbasis is the eigenbasis of $\bar H_{\nu}^{\mathrm{res}}$. The weak source and detector labels are read through the weak-exposure domain:

$$
|\nu_\alpha\rangle
=
\sum_i U_{\alpha i}|\nu_i\rangle.
$$

The matrix $U_{\mathrm{PMNS}}$ should therefore be a readout projection from the weak-coupling domain, not an imported fit matrix or a set of flavor-specific terms:

$$
U_{\mathrm{PMNS}}
=
U_{\mathrm{read}}
\left(
Q_{\mathrm{weak}},
\Pi_{\mathrm{weak}},
\mathcal L_{\nu},
\mathcal E_{\mathrm{weak}}
\right).
$$

Here $\mathcal L_{\nu}$ is the neutral-lepton branch ledger and $\mathcal E_{\mathrm{weak}}=Q_{\mathrm{weak}}[\Pi_{\mathrm{weak}}\mathcal L_{\nu}]$ is the weak-visible exposure record. This ties `EQ-16A` to `EQ-16`: gauge and weak-sector rows fail if `V-A`, CKM/PMNS overlap, weak-corridor provenance, and source/detector readout require separate exposure domains.

The same split also ties `EQ-16A` to `EQ-14`: the oscillation probability is an observer-level transition surface generated by propagation plus detector projection, not a primitive probability rule.

## Cancellation Without Erasure

The near-photon neutral-lepton branch should suppress exterior exposure while preserving a nonzero residual phase operator. The useful cancellation residual is

$$
R_{\nu,\mathrm{cancel}}
=
\left|
\sum_{a\in\{1,2,3\}}
W_a^{(\nu)}e^{i\phi_a}
\right|.
$$

The labels $\{1,2,3\}$ are raw retained-row labels. They may be replaced by $\{I,M,O\}$ only after the solver supplies a declared `I:M:O` role map for the retained neutral-lepton branch.

Small $R_{\nu,\mathrm{cancel}}$ is necessary for weak exterior exposure, but it is not sufficient for neutrino oscillation. The packet fails if the same cancellation forces

$$
\bar H_{\nu}^{\mathrm{res}}=0.
$$

Thus the iso-frequency row must pass two conditions at once:

- common-clock cancellation: $\omega_f C_0\mathbf 1$ drops out of probabilities;
- residual survival: $\bar H_{\nu}^{\mathrm{res}}$ has one small solar-scale gap and one atmospheric-scale gap.

## Near-Photon Handedness Stability Discriminator

The legacy weak-force source suggests a useful but speculative discriminator: near the photon boundary, the observed left-handed neutrino and right-handed antineutrino channels may survive because their near-planar polarity-conjugate braid-pair branches remain dynamically stable, while the mirror channels are unstable, sterile, or too weakly exposed to appear as ordinary weak products. In current terminology this is not a claim that neutrinos are photon precursors or photon remnants. It is a priority-only stability test on the near-photon neutral-lepton branch.

Let $B_{\nu}^{L}$ and $B_{\bar\nu}^{R}$ denote the weak-visible survivor candidates, and let $B_{\nu}^{R}$ and $B_{\bar\nu}^{L}$ denote the mirror candidates under the same near-photon branch family. For any candidate branch $B$, define a local stability readout
$$
\rho_{\nu}(B)
=
\max_{j\ne 1}|\mu_j(B)|
$$
from the nontrivial Floquet multipliers of the retained branch return map, together with an effective free-energy or action cost $\mathcal F_{\nu}(B)$ when the solver supplies one. The first discriminator can be stated as
$$
\mathcal R_{\nu,\mathrm{hand}}
=
\max(0,\rho_{\nu}(B_{\nu}^{L})-1)
+
\max(0,\rho_{\nu}(B_{\bar\nu}^{R})-1)
+
\max(0,1-\rho_{\nu}(B_{\nu}^{R}))
+
\max(0,1-\rho_{\nu}(B_{\bar\nu}^{L})).
$$

This hard version requires the survivor candidates to be stable and the mirror candidates to be unstable over the declared branch window. A softened version may replace the mirror-instability terms with a free-energy or exposure gap such as
$$
\Delta\mathcal F_{\nu,\mathrm{mirror}}
=
\min
\left[
\mathcal F_{\nu}(B_{\nu}^{R})-\mathcal F_{\nu}(B_{\nu}^{L}),
\mathcal F_{\nu}(B_{\bar\nu}^{L})-\mathcal F_{\nu}(B_{\bar\nu}^{R})
\right],
$$
with the branch accepted only when the mirror channels are sufficiently suppressed relative to the survivor channels. This row is downstream of the common-clock and residual-operator rows: it cannot substitute for $H_{\nu}^{\mathrm{res}}$, phase-gap recovery, PMNS readout, or source/detector event provenance.

## Minimal Residual

The first executable closure object should be

$$
\Theta_{\nu,16A}
=
\left(
S_{\mathrm{eq}},
B_{3B}^{(\nu)},
\omega_f C_0\mathbf 1,
\bar H_{\nu}^{\mathrm{res}},
U_{\mathrm{read}},
\bar\Lambda,
\widehat{\boldsymbol\lambda}_{\nu},
R_{\nu,\mathrm{cancel}},
\mathcal R_{\nu,16A}
\right).
$$

The closure residual can be kept compact:

$$
\mathcal R_{\nu,16A}
=
w_{\mathrm{gap}}
\left|
\frac{|\Delta\lambda_{3\ell}|/\Delta\lambda_{21}-r_{\mathrm{atm/sol}}}
{r_{\mathrm{atm/sol}}}
\right|
+
w_{\mathrm{add}}
\left|
\Delta\lambda_{31}
-
\Delta\lambda_{32}
-
\Delta\lambda_{21}
\right|
+
w_{\mathrm{zero}}\mathcal Z(\bar H_{\nu}^{\mathrm{res}})
+
w_{\mathrm{shape}}\mathcal S_{\mathrm{dbl+sgl}}
+
w_{\mathrm{norm}}\mathcal S_{\widehat\lambda}
+
w_{\mathrm{PMNS}}\mathcal R_{\mathrm{PMNS}}
+
w_{\mathrm{domain}}\mathcal R_{\mathrm{weak,domain}}
+
w_{\mathrm{hand}}\mathcal R_{\nu,\mathrm{hand}}.
$$

Here $r_{\mathrm{atm/sol}}$ is the updateable atmospheric-to-solar gap benchmark, $\mathcal Z$ penalizes an all-zero residual, $\mathcal S_{\mathrm{dbl+sgl}}$ penalizes equal residual spacing when the target is doublet-plus-singlet, $\mathcal S_{\widehat\lambda}$ checks the identity-shift-invariant normalized spectrum, $\mathcal R_{\mathrm{PMNS}}$ measures readout mismatch, $\mathcal R_{\mathrm{weak,domain}}$ reports any split weak-exposure domain, and $\mathcal R_{\nu,\mathrm{hand}}$ is the priority-only near-photon handedness stability discriminator.

## Equation Attack Card

| Field | Current result |
| --- | --- |
| Current equation-inventory score | `3` |
| Closure driver | Factor the common hidden clock while deriving two independent observed phase-rate gaps from one retained neutral-lepton branch and one weak-exposure readout domain. |
| Primary carrier | $\Theta_{\nu,16A}$ with retained branch $B_{3B}^{(\nu)}$, iso-frequency row set $S_{\mathrm{eq}}$, residual operator, weak-domain readout, matter correction, cancellation row, and event ledger. |
| Smallest accepted evidence object | Accepted retained `neutral_lepton_retained_branch` plus accepted `s_eq`, common-clock, residual-operator, phase-gap, spectrum-shape, PMNS-readout, weak-domain, matter-correction, cancellation, and event-ledger rows bound to one branch/domain record. |
| Exact first blocker | `missing_accepted_neutral_lepton_retained_branch`; inherited `S_eq` blocker: `missing_accepted_raw_labeled_rows_preserved_on_retained_history`. |
| Smallest next artifact | Replace the neutral-lepton source-attempt shell with one durable retained-branch source that binds $S_{\mathrm{eq}}$, common clock, residual operator, weak-domain readout, matter correction, cancellation, and event ledger to one branch/domain record. The `EQ-16` muon ledger artifact is a useful weak-domain consumer clue, but it does not satisfy this neutral-lepton retained-branch object. |
| Existing scripts/fixtures/packets | [neutrino-common-clock-phase-operator.mjs](../../../scripts/equation-mapping/neutrino-common-clock-phase-operator.mjs), [neutrino-common-clock-phase-attempt.v1.json](../../../scripts/equation-mapping/neutrino-common-clock-phase-attempt.v1.json), [neutrino-common-clock-phase-neutral-lepton-source-attempt.v1.json](../../../scripts/equation-mapping/neutrino-common-clock-phase-neutral-lepton-source-attempt.v1.json), [neutrino-common-clock-phase-priority-source-negative-control.v1.json](../../../scripts/equation-mapping/neutrino-common-clock-phase-priority-source-negative-control.v1.json), [neutrino-common-clock-phase-domain-split-negative-control.v1.json](../../../scripts/equation-mapping/neutrino-common-clock-phase-domain-split-negative-control.v1.json) |
| Control required for advancement | `weak_hidden_domain_split` remains a diagnostic split-domain control, but source evidence guards now fire first when accepted-looking rows point at attempts or priority prose; the current domain-split fixture reports `missing_accepted_neutral_lepton_retained_branch` while `weakDomainIdentityPass: false` records the split. |
| Safe implementation target | Priority-packet refinement now; accepted-source semantics already reject priority prose, authored AAA prose, generated files, attempts, mocks, toys, probes, negative controls, and temporary paths before any source-attempt row can be treated as retained evidence. |

## Direct Geometry Layer

This layer keeps the common-clock and residual-phase equations tied to one retained neutral-lepton branch. It does not let a numeric phase-gap shape, an imported PMNS matrix, or a weak-domain fit substitute for retained branch evidence.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Negative control required for advancement | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| $H_{\nu}^{\mathrm{eff}}=\omega_fC_0\mathbf 1+H_{\nu}^{\mathrm{res}}$ | Common-clock identity term plus residual phase operator on one neutral-lepton retained branch. | `neutral_lepton_retained_branch`, `s_eq`, `common_clock`, `residual_operator` | One branch carrier id binds $S_{\mathrm{eq}}$, $\omega_fC_0\mathbf 1$, and $H_{\nu}^{\mathrm{res}}$. | `common_clock_not_factored` and `neutrino.common_clock_overread` reject treating the common clock as three observed absolute clocks. | Accepted retained neutral-lepton branch plus accepted $S_{\mathrm{eq}}$, common-clock, and residual-operator rows. |
| $\bar H_{\nu}^{\mathrm{res}}=H_{\nu}^{\mathrm{res}}-\operatorname{tr}(H_{\nu}^{\mathrm{res}})\mathbf 1/3$ | Identity-shift-invariant residual spectrum readout. | `residual_operator`, `phase_gaps`, `spectrum_shape` | Traceless residual eigenvalues and phase gaps share the same branch carrier and phase-rate origin. | `residual_operator_not_traceless`, `residual_operator_erased`, and `phase_rate_origin_not_residual` reject static offsets or erased residuals. | Accepted residual-operator row with accepted phase-rate gap and spectrum-shape rows. |
| $\Delta\lambda_{31}=\Delta\lambda_{32}+\Delta\lambda_{21}$ and $r_{\mathrm{atm/sol}}$ | Two-gap phase-rate ledger for solar and atmospheric scales. | `phase_gaps`, `spectrum_shape` | $\Delta\lambda_{21}$, $\Delta\lambda_{32}$, $\Delta\lambda_{31}$, ordering, and normalized spectrum share one residual operator. | `phase_gap_additivity`, `phase_gap_ratio`, `neutrino.static_phase_substitution`, and `neutrino.equal_spacing_false_target` reject fitted or wrong-shape spectra. | Accepted phase-gap and doublet-plus-singlet spectrum rows on the retained branch. |
| $\lvert\nu_\alpha\rangle=\sum_iU_{\alpha i}\lvert\nu_i\rangle$ | Weak readout projection from propagation basis to weak source/detector labels. | `pmns_readout`, `weak_domain`, `event_ledger` | PMNS readout, source reaction, propagation, detector reaction, weak corridor, and event ledger use one `weakDomainId`. | `weak_hidden_domain_split` and `pmns_readout_domain` reject imported PMNS matrices or split weak-exposure domains. | Accepted PMNS-readout and weak-domain rows bound to the same event ledger. |
| $V_{\mathrm{sea}}(n,\Pi_{\mathrm{weak}})$ | Matter correction in the same mass-squared-response units and weak domain as the vacuum residual operator. | `matter_correction`, `weak_domain`, `event_ledger` | Matter correction, Noether sea row, weak exposure domain, and propagation ledger share one domain id and unit convention. | `matter_correction_domain` and `neutrino.matter_split` reject a matter row sourced from another domain or unit system. | Accepted matter-correction row on the same weak-domain/event-ledger record. |
| $R_{\nu,\mathrm{cancel}}$ plus nonzero residual survival | Exterior exposure cancellation without erasing the residual operator. | `cancellation`, `residual_operator`, `event_ledger` | Cancellation row and residual operator share the retained branch and event ledger. | `cancellation_residual` and `residual_operator_erased_by_cancellation` reject cancellation that destroys the observed phase gaps. | Accepted cancellation row plus nonzero residual-operator witness on the same branch. |
| Near-photon handedness survival | Stable weak-visible survivor branches for $\nu_L$ and $\bar\nu_R$ with mirror branches suppressed or unstable. | `handedness_stability`, `weak_domain`, `event_ledger` | Survivor and mirror branches share the same near-photon branch family, weak-domain convention, and source/detector event ledger. | `neutrino.handedness_by_label` and `neutrino.mirror_branch_unchecked` reject handedness assigned after the branch evidence has been selected. | Accepted branch-stability or suppression row for $B_{\nu}^{L}$, $B_{\bar\nu}^{R}$, $B_{\nu}^{R}$, and $B_{\bar\nu}^{L}$ on one branch family. |
| Source provenance and retained-row identity | Checker-consumable retained evidence for every required row. | All required rows | Every row has concrete row identity, source reference, branch carrier id, weak-domain id where required, and event-ledger id where required. | The checker rejects missing row ids, missing sources, attempts, probes, mocks, toys, priority prose, authored AAA prose, generated files, negative controls, temporary paths, and other non-durable sources as accepted evidence. | A retained $\Theta_{\nu,16A}$ packet whose required rows are accepted, source-backed, same-record bound, and still exposes split-domain diagnostics under the domain-split control. |

The smallest accepted evidence object is therefore not the `(f,f,f)` numeric phase shape alone. It is a retained neutral-lepton branch packet where the common clock, residual operator, phase gaps, PMNS readout, matter correction, cancellation row, and event ledger all cite the same branch/domain record and survive the existing checker gates.

## Executable Phase-Operator Checker Status

[neutrino-common-clock-phase-operator.mjs](../../../scripts/equation-mapping/neutrino-common-clock-phase-operator.mjs) now implements the score-neutral checker for $\Theta_{\nu,16A}$. It consumes the retained neutral-lepton branch, $S_{\mathrm{eq}}$, common clock, residual operator, phase gaps, spectrum shape, PMNS readout, weak domain, matter correction, cancellation, and event-ledger rows.

Run the attempt, source-attempt, priority-source control, and domain-split control as the current score-neutral route:

```sh
node scripts/equation-mapping/neutrino-common-clock-phase-operator.mjs --input scripts/equation-mapping/neutrino-common-clock-phase-attempt.v1.json --summary --pretty
node scripts/equation-mapping/neutrino-common-clock-phase-operator.mjs --input scripts/equation-mapping/neutrino-common-clock-phase-neutral-lepton-source-attempt.v1.json --summary --pretty
node scripts/equation-mapping/neutrino-common-clock-phase-operator.mjs --input scripts/equation-mapping/neutrino-common-clock-phase-priority-source-negative-control.v1.json --summary --pretty
node scripts/equation-mapping/neutrino-common-clock-phase-operator.mjs --input scripts/equation-mapping/neutrino-common-clock-phase-domain-split-negative-control.v1.json --summary --pretty
```

The current attempt fixture [neutrino-common-clock-phase-attempt.v1.json](../../../scripts/equation-mapping/neutrino-common-clock-phase-attempt.v1.json) has the intended `(f,f,f)` common-clock and residual-gap numeric shape: the equal clock factors out, $\bar H_{\nu}^{\mathrm{res}}$ is traceless and nonzero, $\Delta\lambda_{31}=\Delta\lambda_{32}+\Delta\lambda_{21}$, the atmospheric-to-solar schematic ratio is $32.5$, the spectrum is doublet-plus-singlet, and cancellation does not erase the residual operator.

The source-attempt fixture [neutrino-common-clock-phase-neutral-lepton-source-attempt.v1.json](../../../scripts/equation-mapping/neutrino-common-clock-phase-neutral-lepton-source-attempt.v1.json) gives the checker a concrete neutral-lepton retained-branch source shape without accepting evidence. It binds the retained branch, $S_{\mathrm{eq}}$, common clock, residual operator, phase gaps, spectrum shape, PMNS readout, weak domain, matter correction, cancellation, and event ledger to `B_3B_nu_source_attempt_0001`, one weak-domain id, and one event-ledger id. Every row remains `attempt`.

Those numeric passes are not score evidence because every source-bearing row is still `attempt`. The run is:

```text
status: blocked_missing_rows
scoreDecision: no_score_increase
nextBlocker: missing_accepted_neutral_lepton_retained_branch
inheritedSEqBlocker: missing_accepted_raw_labeled_rows_preserved_on_retained_history
```

This is the intended disposition. The checker is a common-clock/residual-phase guardrail, not a PMNS fit and not proof that `(f,f,f)` has been retained.

The `EQ-16` muon weak-visible projection evidence lane now accepts `weak_visible_branch_ledger`, same-domain `weak_projection`, same-domain `weak_quotient`, and same-domain `weak_exposure_record`, and blocks next at `missing_accepted_va_chirality_gate`. Those rows do not change `EQ-16A`: they contain inferred neutral-lepton bookkeeping for muon decay, but they do not provide a retained neutral-lepton branch, common-clock residual operator, PMNS readout, matter correction, cancellation row, or source/detector event ledger.

The existing domain-split negative control remains a diagnostic required before advancement: with the hardened source guard, its accepted-looking rows block first at `missing_accepted_neutral_lepton_retained_branch` because their source paths point at an attempt fixture, and the same run still records `weakDomainIdentityPass: false` with split weak-domain ids. This keeps the source-evidence boundary first while preserving the weak-domain falsifier.

## Common Equation Candidates

| Candidate | Equation pattern | Reuse outside neutrinos |
| --- | --- | --- |
| `common_clock_residual_operator` | $H=\Omega_c\mathbf 1+H_{\mathrm{res}}$ and $\bar H_{\mathrm{res}}=H_{\mathrm{res}}-\operatorname{tr}(H_{\mathrm{res}})\mathbf 1/3$ | Photon, quantum phase, redshift, and clock-comparison rows where a carrier phase or cadence must be separated from an observable residual. |
| `mixing_readout_projection` | $U_{\mathrm{read}}=U(Q_S,\Pi_S,\mathcal L_A,\mathcal E_S)$ | CKM/PMNS, detector projection, basin readout, analyzer projection, and sector-visible exposure quotient rows. |
| `hidden_frequency_check` | observables must be invariant under $H\mapsto H+\alpha\mathbf 1$ while $\bar H_{\mathrm{res}}\ne0$ | Any equation-map row that proposes hidden carrier frequencies, hidden branch cadence, or common Noether sea clocking. |
| `cancellation_without_erasure` | $R_{\mathrm{cancel}}\ll1$ plus $\|\bar H_{\mathrm{res}}\|>0$ | Photon/neutrino boundary, weak exterior suppression, gauge-visible residue, and far-field shielding packets. |
| `same_domain_matter_correction` | $H_{\mathrm{eff}}=H_{\mathrm{vac}}+V_{\mathrm{sea}}(n,\Pi_S)$ in the same units and domain | Neutrino matter effects, effective metric matter response, weak-sector medium response, and detector-environment corrections. |

## Closure Burden

The retained branch must provide:

1. a retained iso-frequency row set $S_{\mathrm{eq}}$ or a replacement row set whose verification is required for advancement;
2. a branch return-period or locked-harmonic certificate for $\omega_f$ rather than inferring frequency only from $s_a/\rho_a$;
3. effective lever-arm, speed, phase, bivector Gram sector, braid-closure linking, and binary-to-binary phase-history rows on the same branch record;
4. a nonzero traceless residual operator with exactly two independent phase-rate gaps;
5. a doublet-plus-singlet residual spectrum, not all-zero or equal residual spacing;
6. a weak readout projection that produces $U_{\mathrm{PMNS}}$ from the same weak-exposure domain used by weak chirality and reaction provenance;
7. Noether sea matter correction in the same mass-squared-response units as the vacuum residual operator;
8. cancellation without erasing the residual operator;
9. near-photon handedness stability or suppression rows for the weak-visible survivor channels and mirror channels;
10. source reaction, propagation, detector reaction, energy, momentum, angular momentum, wake/coupling transfer, and Noether sea state in one event or positive-width domain.

## Failure Modes

- `neutrino.common_clock_overread`: the three observed phase gaps are treated as three directly measured absolute clocks rather than residual eigenvalue differences.
- `neutrino.equal_frequency_erases_gap`: exact `(f,f,f)` cancellation forces $\bar H_{\nu}^{\mathrm{res}}=0$.
- `neutrino.static_phase_substitution`: static phase offsets are used in place of phase-rate gaps.
- `neutrino.equal_spacing_false_target`: the retained row naturally produces equal residual spacing when the benchmark requires a doublet-plus-singlet residual.
- `neutrino.matrix_import`: $U_{\mathrm{PMNS}}$ is imported as a fitted matrix rather than derived from weak readout projection.
- `weak.hidden_domain_split`: source flavor, propagation eigenstate, detector readout, `V-A`, CKM/PMNS overlap, and weak-corridor provenance require different weak-exposure domains.
- `neutrino.matter_split`: $V_{\mathrm{sea}}$ uses a different Noether sea or weak-domain record from the vacuum residual operator.
- `neutrino.handedness_by_label`: left-handed neutrino and right-handed antineutrino survival is assigned by observer labels rather than by branch stability, suppression, and weak-domain evidence.
- `neutrino.mirror_branch_unchecked`: mirror branches are ignored rather than shown unstable, suppressed, sterile, or outside the admitted near-photon branch family.
- `equation_map.imported_formula`: the standard oscillation equation is copied as explanation without the retained branch, exposure, and residual rows above.

## Promotion Posture

Classification: `priority-only`.

Later promotion targets are [Neutrinos](../../../content/markdown/aaa/assemblies/fermions/neutrinos.md), [Weak-Mixing CKM](../../../content/markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md), [Weak Mixing Angle](../../../content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md), [Quantum Operator Mapping](../../../content/markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md), and [Constraint Ledger](../../../content/markdown/aaa/validation/constraint-ledger.md).

Promotion should wait until $\Theta_{\nu,16A}$ is populated with a retained branch or with a certificate required for advancement that explains which sub-equation failed. The likely first promotion nucleus would be the common-clock residual operator plus the weak-basis / propagation-basis readout split, not the full PMNS claim.
