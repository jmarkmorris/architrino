# First Quantitative Deliverable: Reference Attractor Family $A_0$

Extracted from `braid-mass-response-map/priorities.md` during the braid priority sort (Phase 3, OP-3, 2026-07-08). Priority-only deliverable spec for the mass-map reference attractor family (output contract, acceptance gates, state vector, closure equations, residuals, schema, work packet). Claim levels unchanged; complements the [A_0 Reduced Branch Certificate](a0-reduced-branch-certificate.md).

The first mass-side calculation should not begin with a particle label. It should begin with the simplest stable Noether braid attractor family that can emit the data needed for a mass calculation.

Define $A_0$ as a neutral, rest-branch Noether braid in a weak homogeneous Noether sea cell. The family contains three nested pro/anti binaries:

| Layer | Role | Baseline branch |
| --- | --- | --- |
| Inner binary $I$ | active path-history memory carrier | self-hit/history-supported, typically near or above the primitive field-speed separator |
| Middle binary $M$ | commensurability buffer and phase-lock hinge | near-separator transition branch |
| Outer binary $O$ | shielding and boundary-coupling interface | sub-field-speed observer-facing branch |

This reference family should be solved first in the local rest frame of the Noether sea cell with $G_{\text{grad}}=0$ and $u^i_{\text{sea}}=0$. Primitive wake geometry may use $c_f$, but all observer-facing mass outputs must declare the dressing map to $c_{\text{eff}}$ or mark it as unresolved. The family must not be calibrated to the electron mass or to any charged-lepton hierarchy value; those comparisons are downstream tests.

### Required Output Contract

| Quantity class | Required outputs | Why mass needs it |
| --- | --- | --- |
| Geometry | $R_I,R_M,R_O$; radius ratios; binary-plane normals $\mathbf{n}_I,\mathbf{n}_M,\mathbf{n}_O$; inter-plane angles; handedness; center-of-closure frame | Fixes the spiral-helical Noether braid shape and the lever arms that determine stored energy, shielding, and external response. |
| Phase and winding | $\omega_I,\omega_M,\omega_O$; $T_I,T_M,T_O$; closed-cycle period $T_{\mathbf{k}}$; phase offsets; layer windings $(k_I,k_M,k_O)$; inter-layer closure integers $q_{ij}$ | Turns the causal knot into an integer-labeled attractor rather than a loose configuration sketch. |
| Root ledger | partner-hit counts; self-hit counts; inter-layer hit channels; signed parity/degree data; any separator events $\Delta N\in 2\mathbb{Z}$ | Supplies the causal-history inventory whose trapped energy is proposed to appear externally as mass response. |
| Stability | closure residuals; return-map residuals; leading Floquet multipliers; basin gap $\Delta_{\mathbf{k}}$; sensitivity to small perturbations | Distinguishes accepted attractors from integer-closed but dynamically unstable rungs. |
| Internal energy ledger | layer energies $E_I,E_M,E_O$; interaction/wake terms; total $E_{\text{internal}}(A_0)$ in dimensionless units; action per closed cycle | Provides the unshielded energy reservoir that the exposed-energy partition projects into probe and sea-coupled channels. |
| Shielding extraction | far-field multipole coefficients; exposed leading amplitude; naive constituent sum; preliminary raw $\zeta(A_0)$; angular anisotropy/leakage tensor | Converts stored internal motion into the externally visible response coefficient before the exposed ledger is partitioned. |
| Medium response | local lapse precursor $N$; spatial compliance response $\gamma_{ij}^{\mathrm{eff}}$ or homogeneous baseline; response tensor for acceleration and gradient probes; equivalence residual placeholder | Connects inertial response, gravitational response, and the later Cartan/ADM reconstruction. |
| Mass-facing summary | dimensionless probe-channel coefficient $E_{\text{probe}}(A_0)/E_0=\zeta_{\text{probe}}(A_0)E_{\text{internal}}(A_0)/E_0$; sea-coupled and unresolved exposed-energy channels; unresolved constants list; calibration-free comparison handles | Gives the first object that can later be compared with a particle mass after constants and dressing are fixed. |

### Acceptance Gates

The $A_0$ deliverable is not accepted until all of the following are true:

1. The closure residuals are below a declared tolerance over at least one full closed cycle.
2. The non-symmetry Floquet gap satisfies $\Delta_{\mathbf{k}}>0$ for the reported branch.
3. The reported branch has no secular drift in the local rest frame after symmetry modes are removed.
4. The shielding estimate is stable under increasing far-field extraction radius and angular resolution.
5. No observed particle mass, electron radius, charged-lepton ratio, or measured $\alpha$ value is used as a fitting input.
6. The output is sufficient to evaluate the roadmap expression $m_0(A)c_{\text{eff}}^2\sim E_{\text{probe}}(A)=\zeta_{\text{probe}}(A)E_{\text{internal}}(A)$ as a prediction once the dressing constants are supplied.

### State Vector

The $A_0$ calculation should start from a six-worldline state, not from a particle label. Let
$$
\ell\in\{I,M,O\},
\qquad
\sigma\in\{+,-\},
\qquad
a=(\ell,\sigma),
$$
where $I$, $M$, and $O$ denote the inner, middle, and outer binary layers, and $\sigma$ denotes the pro/anti polarity member of that layer with
$$
q_{\ell,+}=+\epsilon,
\qquad
q_{\ell,-}=-\epsilon.
$$

The minimal state vector is
$$
X_{A_0}(t)
=
\left(
\{\mathbf{s}_a(t),\mathbf{v}_a(t),q_a\}_{a\in A_0},
\mathcal{H}_{A_0}(t),
\mathcal{S}_{\text{sea}}
\right),
$$
where $\mathcal{H}_{A_0}(t)$ is the path-history segment long enough to resolve every active causal root over one closed cycle, and $\mathcal{S}_{\text{sea}}$ is the homogeneous Noether sea cell data:
$$
u^i_{\text{sea}}=0,
\qquad
G_{\text{grad}}=0,
\qquad
n=1,
\qquad
\chi_{\text{sea}}=1,
\qquad
c_\star=c_f.
$$
The scan may keep $\eta>0$ while locating smooth branches, but any accepted output must report how the result behaves as $\eta$ is reduced.

For each layer, define the layer center, relative separation, and relative velocity by
$$
\mathbf{C}_\ell(t)
=
\frac{\mathbf{s}_{\ell,+}(t)+\mathbf{s}_{\ell,-}(t)}{2},
\qquad
\mathbf{r}_\ell(t)
=
\mathbf{s}_{\ell,+}(t)-\mathbf{s}_{\ell,-}(t),
$$
$$
\mathbf{V}_\ell(t)
=
\frac{\mathbf{v}_{\ell,+}(t)+\mathbf{v}_{\ell,-}(t)}{2},
\qquad
\mathbf{u}_\ell(t)
=
\mathbf{v}_{\ell,+}(t)-\mathbf{v}_{\ell,-}(t).
$$
The reported geometry should extract $R_\ell$, $\omega_\ell$, the binary-plane normal $\mathbf{n}_\ell$, handedness, and phase $\theta_\ell$ from these variables over a symmetry-reduced closed cycle. The assembly center
$$
\mathbf{C}_{A_0}(t)
=
\frac{1}{6}\sum_{a\in A_0}\mathbf{s}_a(t)
$$
is the rest-frame gauge anchor; after symmetry modes are removed, an accepted rest branch must have no secular drift in $\mathbf{C}_{A_0}$.

### Multi-Scale Branch Search

The reduced $A_0$ scan should not treat the attractor as three independent copies of the same circular two-body solution. Circular or elliptic carriers can be useful coordinate charts for extracting $R_\ell$, $\omega_\ell$, $\mathbf{n}_\ell$, handedness, and phase, but the accepted object is a coupled multi-scale Noether braid lock.

Let $s_\ell$ denote the characteristic member speed of layer $\ell$ relative to $\mathbf{C}_\ell$; for a symmetric binary $s_\ell = \|\mathbf{u}_\ell\|/2$. The speed ordering to test is:

| Layer | Speed ordering | Closure consequence |
| --- | --- | --- |
| Inner binary $I$ | $s_I > c_f$ on active portions of the branch | Self-hit roots and path-history feedback are leading closure data, not small corrections to discard. |
| Middle binary $M$ | $s_M \approx c_f$ | Separator proximity, root Jacobians, and even-pair branch events make this layer the phase-matching hinge. |
| Outer binary $O$ | $s_O < c_f$ | Partner-hit and inter-layer channels set the shielding interface and the observer-facing leakage pattern. |

The first branch search should therefore allow $R_I:R_M:R_O$ and $T_I:T_M:T_O$ to differ by orders of magnitude. A solver failure caused by insufficient scale separation, time resolution, or history-window depth is not by itself a branch rejection.

Higher-order internal structure should be classified before it is averaged away:

| Class | Treatment in the $A_0$ scan | Mass-map relevance |
| --- | --- | --- |
| Averaging terms | Nonresonant fast oscillations whose signed contribution cancels over the closed cycle $T_{\mathbf{k}}$ | May be summarized in the far-field fit after closure, but should not decide branch existence. |
| Locking terms | Corrections that change root multiplicity, separator proximity, inter-layer closure integers, or Floquet multipliers | Must remain in the closure equations and stability diagnostics. |
| Leakage terms | Small internal asymmetries whose leading far-field multipole or anisotropy survives averaging | Must enter the shielding extraction and $\zeta(A_0)$ report. |

A separable circular or elliptic layer ansatz is therefore a diagnostic ansatz. If it produces tangential residuals, record those residuals as evidence for a needed inter-layer phase correction, non-circular carrier, or multi-scale averaging term. Do not treat that diagnostic failure alone as proof that $A_0$ does not exist.

### Closure Equations

For every source-receiver pair $b\to a$ and every active branch $m$, the causal root condition is
$$
F_{ab}^{(m)}(t;t_0)
\equiv
\|\mathbf{s}_a(t)-\mathbf{s}_b(t_0)\|
-c_f(t-t_0)
=0,
\qquad
t_0<t.
$$
The corresponding branch Jacobian is
$$
J_{ab}^{(m)}(t;t_0)
=
1-\frac{\mathbf{v}_b(t_0)\cdot\hat{\mathbf{r}}_{ab}(t;t_0)}{c_f},
$$
with
$$
\hat{\mathbf{r}}_{ab}(t;t_0)
=
\frac{\mathbf{s}_a(t)-\mathbf{s}_b(t_0)}
{\|\mathbf{s}_a(t)-\mathbf{s}_b(t_0)\|}.
$$

The branch ledger must classify each active root by source relation:

| Channel | Condition | Required ledger data |
| --- | --- | --- |
| Partner hit | $a$ and $b$ are opposite members of the same binary layer | branch count, delay, sign, $J_{ab}^{(m)}$, parity events |
| Self hit | $a=b$ with $t_0<t$ | self-root count, separator proximity, parity events, local stability effect |
| Inter-layer hit | $a$ and $b$ belong to different layers | source layer, receiver layer, delay, phase relation, closure integer |

The closed-cycle condition is not merely periodic position matching. The reported branch must close the state, phase, and causal-root ledgers over a common period $T_{\mathbf{k}}$:
$$
\mathbf{s}_a(t+T_{\mathbf{k}})\approx\mathbf{s}_a(t),
\qquad
\mathbf{v}_a(t+T_{\mathbf{k}})\approx\mathbf{v}_a(t),
$$
$$
\theta_\ell(t+T_{\mathbf{k}})-\theta_\ell(t)=2\pi k_\ell,
\qquad
\Theta_{\ell m}(t+T_{\mathbf{k}})-\Theta_{\ell m}(t)=2\pi q_{\ell m},
$$
after fixing the center-of-closure frame. Here $k_\ell$ are layer winding integers and $q_{\ell m}$ are inter-layer closure integers. If the branch crosses a separator, the ledger must record whether the raw root jump obeys the expected even fold-pair rule $\Delta N\in2\mathbb{Z}$.

### Residuals And Stability Diagnostics

Every $A_0$ packet should report dimensionless residuals before interpreting the branch physically:

| Residual | Definition target | Acceptance role |
| --- | --- | --- |
| $\mathcal{R}_{\text{state}}$ | maximum normalized mismatch in $\mathbf{s}_a$ and $\mathbf{v}_a$ after $T_{\mathbf{k}}$ | verifies closed-cycle return |
| $\mathcal{R}_{\text{root}}$ | maximum normalized causal-root defect $\lvert F_{ab}^{(m)}\rvert$ on active branches | verifies branch consistency |
| $\mathcal{R}_{\text{phase}}$ | maximum mismatch from integer winding closure | verifies the layer and inter-layer ledger |
| $\mathcal{R}_{E}$ | drift in the chosen regularized energy/history functional over one cycle | detects bookkeeping or integration failure |
| $\mathcal{R}_{\text{drift}}$ | residual center-of-closure translation after symmetry removal | rejects non-rest branches |
| $\mathcal{R}_{\text{speed}}$ | sign-aware violation of $s_I > c_f$, $s_M \approx c_f$, and $s_O < c_f$ | verifies the intended multi-scale branch regime |
| $\mathcal{R}_{\text{avg}}$ | normalized size of terms claimed to average out | prevents unresolved internal terms from being hidden |
| $\mathcal{R}_{\text{lock}}$ | normalized size or consistency defect of retained separator and resonance terms | keeps branch-changing terms in the closure equations |
| $\mathcal{R}_{\text{leak}}$ | leading surviving far-field leakage channel and magnitude | controls whether shielding extraction is meaningful |
| $\mathcal{R}_{\text{Floquet}}$ | non-symmetry return-map defect after quotienting gauge modes | verifies stability reporting alongside $\Delta_{\mathbf{k}}$ |

Stability must be reported through the linearized return map around the candidate cycle. Let $\mathcal{M}_{\mathbf{k}}$ be the monodromy operator and let $G_{\text{sym}}$ denote the symmetry subspace generated by time shift, translation, and rotation gauges. The mass-map gate uses
$$
\Delta_{\mathbf{k}}
=
1-\max_{\mu_i\notin G_{\text{sym}}}\lvert\mu_i\rvert.
$$
The branch is only an accepted attractor candidate when $\Delta_{\mathbf{k}}>0$ after numerical tolerance and convergence checks.

### Breather Certificate Inheritance

The $A_0$ branch search should inherit the collinear-breather certificate order without inheriting any particle-stability claim from it. The breather can validate the finite-certificate discipline: candidate history, null-coordinate pre-ledger, active branch chart, coupled corridor, monodromy diagnostic, returned-history preservation, and topology row. It does not by itself prove Noether braid stability, shielding, or mass.

For $A_0$, the inherited promotion rule is:

$$
\text{finite root ledger}
\to
\text{closed branch chart}
\to
\eta>0\ \text{continuation}
\to
\Delta_{\mathbf{k}}>0
\to
\text{energy and shielding extraction}.
$$

If the breather seed chart fails because no finite active branch chart with positive Jacobian floors and inactive-root gaps exists, the $A_0$ Tier 0 scanner must strengthen its no-proliferation and branch-gap gates before any mass-side promotion. If the breather closes an integer ledger but fails monodromy, the mass-map lesson is direct: integer closure is not an attractor certificate unless the non-symmetry Floquet gap is positive. If the breather fails only at returned-sample or topology rows, the $A_0$ packet should keep root-ledger data as diagnostic but should not promote energy, shielding, or $\zeta(A_0)$ until the corresponding continuation and topology checks pass.

### Output Schema

The first simulation or derivation report for $A_0$ should use the following top-level output packet. A later machine-readable schema may choose JSON or another format, but the fields below should remain stable enough for audit and comparison.

| Field | Required content |
| --- | --- |
| `metadata` | run identifier, code or derivation version, source commit, $\Delta t$, integrator, tolerances, $\eta$, history-window rule |
| `sea_cell` | $u^i_{\text{sea}}$, $G_{\text{grad}}$, $n$, $\chi_{\text{sea}}$, $c_\star$, boundary conditions |
| `state_vector` | six architrino labels, polarities, initial $\mathbf{s}_a,\mathbf{v}_a$, history segment, center-of-closure gauge |
| `closure_labels` | $T_{\mathbf{k}}$, $(k_I,k_M,k_O)$, $q_{\ell m}$, active branch identifiers |
| `geometry` | $R_I,R_M,R_O$, radius ratios, $\mathbf{n}_I,\mathbf{n}_M,\mathbf{n}_O$, handedness, inter-plane angles |
| `root_ledger` | partner-hit, self-hit, and inter-layer branch counts with delays, Jacobians, separator events, and same-row $D_s$, $D_T$, and $W^{\mathrm{rec}}$ receiver-normal rows for any branch contribution consumed by energy, shielding, or medium response |
| `residuals` | $\mathcal{R}_{\text{state}}$, $\mathcal{R}_{\text{root}}$, $\mathcal{R}_{\text{phase}}$, $\mathcal{R}_{E}$, $\mathcal{R}_{\text{drift}}$, $\mathcal{R}_{\text{speed}}$, $\mathcal{R}_{\text{avg}}$, $\mathcal{R}_{\text{lock}}$, $\mathcal{R}_{\text{leak}}$, $\mathcal{R}_{\text{Floquet}}$ |
| `stability` | monodromy construction, excluded symmetry modes, leading non-symmetry Floquet multipliers, $\Delta_{\mathbf{k}}$ |
| `energy_ledger` | sign-resolved $E_k$, interaction terms, wake/history terms, layer totals $E_I,E_M,E_O$, total $E_{\text{internal}}(A_0)$ |
| `shielding` | far-field sampling radii, angular grid, leading wake coefficients, naive constituent sum, $\zeta(A_0)$, anisotropy/leakage summary |
| `medium_response` | acceleration probes, gradient probes, extracted homogeneous $\mathcal{M}_{\text{sea}}^{ab}$ baseline, residual anisotropy |
| `mass_summary` | $\zeta(A_0)E_{\text{internal}}(A_0)/E_0$, unresolved constants, explicitly excluded particle benchmarks |
| `failure_notes` | failed gates, unresolved convergence issues, or reasons the candidate branch cannot be promoted |

This schema deliberately keeps particle labels out of the accepted packet. Electron, proton, charged-lepton, and quark comparisons can only enter after the packet supplies a stable attractor, an energy ledger, a shielding extraction, and a response map.

### Immediate Work Packet

1. Consume the corrected `a0-tier1-fold-layer-locked-one-period-attempt/v1` diagnostic emitted by `scripts/mass-map/a0-tier1-fold-layer-locked-one-period-attempt.mjs --correction-packet`.
2. Treat the corrected one-period residual failure as a branch-equation falsification for the scalar no-omitted-mode carrier correction, not as accepted history and not as a particle-facing result.
3. Use the corrected and refined residual-balance ledgers as the next proof target: the scalar correction improves center drift, speed, and energy-like speed residuals, but still leaves maximum root residual about `40.12`, state-return residual about `0.942`, and scalar residual-balance relative residual about `0.993`.
4. Treat the current finite-coordinate $B_{\rho,\ell,\sigma,\mu,\nu}(t)$ fits as controlled no-go witnesses unless a branch-chart revision is declared: the quotient-class refined basis reduces residual balance to about `0.426`, the root-key-resolved $\mu=\texttt{receiver|source|relation|status}$ test still reports about `0.426`, and the two-bin `I` observation-phase test reports about `0.350`, all failing the `0.02` tolerance while preserving locked-key exclusion and benchmark exclusion.
5. Rerun the corrected fold-layer-locked one-period map only after [the branch-chart revision contract](a0-branch-chart-revision-contract.md) emits `revision_candidate_only` with the anti-overfit residual passed, rather than `rejected_hidden_fit_split`, `overfit_holdout_fail`, a no-go, or a rejected split. The current pre-rerun checker rejects the residual-surface source, rejects the branch-state-facing declarations on held-out residual, rejects the source-declared root-transport source record with $R_{\mathrm{xval}}\approx1.712369148202459$, and keeps diagnostic signed-polarity and mixed M-Jacobian root-transport quotients fail-closed because they are not source-declared and still fail held-out residual. The [root-transport feature-span scanner](a0-root-transport-feature-span-scanner.md) strengthens this no-go: among eight fixed branch-geometric feature families over the same source record, the best source-declared family remains `source_layer_shear` at `1.712369148202459`, while the best diagnostic-only family still fails with held-out residual `1.2474273873652615`. The [root-transport residual spectrum](a0-root-transport-residual-spectrum.md) localizes the remaining residual instead of adding a fit: the `I`-layer residual forcing has norm `313.09723758998507`, modes `4..7` carry about `0.7552232385377363` of its one-sided cyclic energy, and the dominant total mode is `6` at `0.20679763310995922`. The [mode-band source eligibility packet](a0-mode-band-source-eligibility.md) finds lawful pre-fit source-direction evidence in reciprocal inter-layer transport rather than the current `I`-receiver quotient: `transport:M:inter_layer:I:mean_D_J` has mode-band fraction `0.9944893706413693`, and corrected-carrier `body:I:rel_vel:x` has `0.9353099187288153`. The [reciprocal inter-layer branch-equation checker](a0-reciprocal-interlayer-branch-equation-checker.md) tests the smallest lawful version of that lead and fails closed: its three-feature vector equation passes degrees-of-freedom controls but has maximum held-out residual `1.4057625588588099`. The [carrier-frame residual spectrum](a0-carrier-frame-residual-spectrum.md) then shows that the same `I` forcing is mostly radial in the corrected carrier frame under declared linear time alignment, with radial energy fraction `0.5823726218116948` and radial mode-band fraction `0.7984257865887138`. The [carrier-frame branch-coordinate checker](a0-carrier-frame-branch-coordinate-checker.md) closes the immediate source-side deformation lead as another no-go: `delta_radius * e_I,r` has full residual `0.9987071165861717` and maximum held-out residual `1.0492394121933206`; adding radial rate or tangential projection lowers full fit only to `0.9290546746127268` or `0.9079340640118748` while worsening held-out residual to `1.5341171039338615` or `1.6498611276202226`. The [reciprocal carrier-frame projection checker](a0-reciprocal-carrier-frame-projection-checker.md) closes the remaining same-source reciprocal projection lead: radial, tangential, and radial/tangential projections all pass degrees-of-freedom controls but fail held-out residual, with the best held-out row `tangential` at `1.0546122909019986` and the six-feature radial/tangential row at `1.2113507567372126`. The [root-loop branch-coordinate checker](a0-root-loop-branch-coordinate-checker.md) closes the immediate two-edge active-root loop lead: all tested `I<-X<-I` delay/J holonomy families pass rank and leverage controls but fail held-out residual, with best row `tangential/im_loop_curl` at `1.705996205813595`. The [delayed source-direction branch-coordinate checker](a0-delayed-source-direction-branch-coordinate-checker.md) closes the root-specific line-of-action lead: after receiver-polarity signing for the relative-`I` target, the best held-out row `im_delayed_direction` is still `1.0408163198841647`, and no weighted or pair split reaches tolerance. The root-transport sidecar now verifies one declared source-record phase-origin covariance pair without using `transport_id`; the checker can consume that certificate, but $R_{\mathrm{transport}}$ remains pending because raw-row root-ledger stability is still false. The root-ledger stability discriminator rejects the same phase-origin sidecar as `phase-origin-variant-not-root-ledger-refinement`, and a carrier-replay continuation source now passes as certificate-only non-phase-origin root-ledger evidence under explicit tolerance `1e-6`. That evidence is still non-rerun-authorizing while the source row remains false, so no corrected rerun is authorized; if a future checker passes, require state return, root closure, phase closure, speed ordering, energy-like speed closure, center-drift closure, and $\mathcal{R}_{\text{lock}}$ to pass before monodromy.
6. Only after corrected one-period residuals pass, construct the quotient monodromy operator, remove symmetry modes, report $\Delta_{\mathbf{k}}$, and run the declared $\eta$ ladder.
7. If the same finite branch passes, emit the quotient-normal envelope-Hessian entries $k_R$, $k_\xi$, $k_{R\xi}$ and support-function derivatives $c_R$, $c_\xi$ as finite-branch evidence for the compensated-family scanner.
8. Keep accepted-history output blocked until one-period residual closure, no secular center drift, positive $\Delta_{\mathbf{k}}$, quotient-row identity, and branch persistence across the declared $\eta$ ladder are all present.

The May 18, 2026 compact-fixture run closes the previous attempt-budget and direct-run blockers: the fold-layer-locked runner executed `963815` planned retained steps with the two locked self-root keys in $\mathcal{R}_{\text{lock}}$ and no trajectory abort. The result is a controlled negative result: state return, root closure, phase closure, speed ordering, center drift, and energy-like speed closure all fail, while the lock ledger passes. The residual-balance projection then proves a sharper local no-go for the compact chart: scalar relation weights over $B_{\text{self}}$, $B_{\text{partner}}$, and $B_{\text{inter}}$ cannot reduce the carrier acceleration residual below tolerance. The May 20 sampled-forcing scanner turns that no-go into a chart-policy decision: omitting mode $m=1$ blocks on outer-layer chart-mode dominance, while retaining all modes gives a Fourier carrier-correction candidate, rerun-ready correction packet, and center-preserving body-update waveform replay. The corrected rerun consumes that no-omitted-mode packet and remains fail-closed: center drift passes and several residual magnitudes improve, but state return, direct root closure, speed ordering, and residual balance still fail, with accepted-history output blocked. The quotient-class refined basis improves residual balance from about `0.993` to about `0.426`; the root-key-resolved $\mu=\texttt{receiver|source|relation|status}$ test doubles the fitted columns to `60` but still reports about `0.426`; the two-bin `I` observation-phase test raises the fitted columns to `80` and improves the residual to about `0.350`, still `17.5` times the tolerance. The first root-transport shear source record gives a source-facing finite coordinate but still fails held-out residual at about `1.712`; the feature-span scanner then rules out the currently emitted small linear root-transport feature families, with the best diagnostic-only span still at about `1.247`. The residual-spectrum diagnostic localizes the remaining `I` forcing into modes `4..7`, which carry about `75.5%` of the one-sided cyclic energy. The source-eligibility diagnostic then finds the same mode band in reciprocal inter-layer transport and inner relative velocity; the reciprocal branch-equation checker tests the smallest lawful version of that lead and fails held-out residual at about `1.406`. Carrier-frame localization then shows a mostly radial residual component under declared linear time alignment, but the direct source-side corrected-carrier deformation ladder, the reciprocal carrier-frame projection ladder, the active-root two-edge loop coordinate, and the receiver-polarity-signed delayed source-direction vector coordinate all fail held-out residual too. The root-transport source-record phase-origin covariance now has a passing declared-shift certificate; the active-root ledger discriminator rejects that phase-origin sidecar as non-refinement evidence, while a separate carrier-replay continuation source passes only as certificate-only root-ledger evidence. The remaining `derive_first_attractor_family` blocker is now a branch-chart revision with either a stronger finite root-branch coordinate $\mu$ or a declared non-root-key mode in $z_\Lambda$, followed only if successful by a corrected one-period residual pass, raw-row root-ledger stability, quotient-row identity, monodromy / $\Delta_{\mathbf{k}}$, $\eta$-ladder branch persistence, and finite envelope-Hessian evidence for pressure-response and compensated-family work.

The reduced branch certificate is the executable handoff between this workstream and the simulations workstream. It is the place to record Tier 0 root-ledger enumeration, Tier 1 $\eta>0$ continuation, Tier 2 energy/shielding extraction, and the promotion rule from `derive_first_attractor_family` to `derive_zeta`.
