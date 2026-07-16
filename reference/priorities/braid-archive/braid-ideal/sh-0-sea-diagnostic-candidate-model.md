# SH-0-Sea Diagnostic Candidate Model

Status: diagnostic/candidate model packet, 2026-07-04. Updated with the computed dipole wake-sum run and removal of the fitted response amplitude, the delayed-echo motion variant and candidate same-record request, and the orientational-order and stochastic-retention analysis, 2026-07-07.

Proof ID: `SH-0-sea`.

Claim level: model construction only. This packet does not claim accepted retained evidence, retained-branch closure, force/action closure, Noether sea response closure, stability, branch-chart output, moving certificate, observer export, score movement, or corpus promotion.

Executable diagnostic artifact: [sh-0-sea-diagnostic-candidate-model.mjs](../../../../scripts/braid-ideal/sh-0-sea-diagnostic-candidate-model.mjs), with focused tests in [braid-ideal-sh-0-sea-diagnostic-candidate-model.test.js](../../../../tests/braid-ideal-sh-0-sea-diagnostic-candidate-model.test.js).

Accepted-evidence blocker preserved:

- object: `held_release_seed_path_rows_acceptance_certificate.v0`;
- field: `held_release_seed_path_rows.acceptance_certificate_ref`;
- candidate artifact: `held_release_seed_path_rows:5833f18e53586201`;
- next non-repo package after a matching certificate: `held_release_seed_path_rows_external_accepted_authority_package.v0`;
- later requirements: repo authorization through `repo_authorization_for_accepted_held_release_seed_path_rows.v0`, retained-source adapter package, and same-record receiver-normal root-detail rows carrying `branchWeight`, `sourceNormalDenominator`, and `receiverNormalFactor`.

## Modeling Target

The model tests one central `SH-0` target identity embedded in a surrounding Noether sea of like Noether braid assemblies. Isolated `SH-0` retained closure is not assumed and is not required to start this diagnostic model.

The central target identity is the provider-backed candidate source object:

| Field | Value |
| --- | --- |
| Candidate artifact | `held_release_seed_path_rows:5833f18e53586201` |
| Artifact hash | `5833f18e53586201775fdcd490efcc1e649841e5268a15eea022cad9ff706063` |
| Seed id | `braid-ideal:held-release:face-opposite:six-point:v0` |
| Retained record id | `retained-record:held-release-six-point:adapter-acceptance-certificate` |
| Source row id | `two-speed-preferred-row:u0.8:v0.2` |
| Provider object | `candidate:central_solver_retained_history_provider_object:7d4a8fe0a9792327` |
| Provider hash | `7d4a8fe0a97923270179f2ca0b49b4bc0d6b6ba3251b26e82569bdb4bd1f91df` |

The six candidate target path rows are non-authorizing source rows:

| Index | Architrino id | Polarity | Path key | Row id |
| --- | --- | --- | ---: | --- |
| 0 | `P:+x:+y:+z` | `P` | `2562852524` | `held_release_seed_path_rows:5833f18e53586201:path-row:0:98c206ac` |
| 1 | `P:+x:-y:-z` | `P` | `1537910968` | `held_release_seed_path_rows:5833f18e53586201:path-row:1:5baaa8b8` |
| 2 | `P:-x:+y:-z` | `P` | `1141411660` | `held_release_seed_path_rows:5833f18e53586201:path-row:2:44088f4c` |
| 3 | `E:-x:-y:-z` | `E` | `3504346925` | `held_release_seed_path_rows:5833f18e53586201:path-row:3:d0e0172d` |
| 4 | `E:-x:+y:+z` | `E` | `815090368` | `held_release_seed_path_rows:5833f18e53586201:path-row:4:30954ac0` |
| 5 | `E:+x:-y:+z` | `E` | `1571222052` | `held_release_seed_path_rows:5833f18e53586201:path-row:5:5da6f224` |

The candidate row's dynamic replay metadata uses field speed `c_f=1`, coupling `1/36`, duration `18`, time step `0.024`, hold time `4`, and declared group velocity `(1/60,1/60,1/60)`. The `SH-0-sea` model therefore defines all support and response equations in the target-center frame so the central support can be tested as a rest shell even when the candidate source rows carry a center drift.

## Row Set

| Row | Diagnostic/candidate content | Accepted-evidence status |
| --- | --- | --- |
| Target source row | Candidate `SH-0` source identity above, treated as the central target around which the sea is built. | Candidate only; blocked at `held_release_seed_path_rows_acceptance_certificate.v0`. |
| Sea population row | A finite local population of like Noether braid assemblies around the central target, paired across the target center to keep the first diagnostic environment center-neutral and torque-neutral. | Candidate only; no accepted `SH-0-sea` population row exists. |
| FCC nearest-neighbor shell row | Attempt `aa` specializes the diagnostic population to `N_sea=12` like Noether braid assemblies in the FCC nearest-neighbor shell around the central target, using face-diagonal directions $(\pm1,\pm1,0)$, $(\pm1,0,\pm1)$, and $(0,\pm1,\pm1)$ scaled by $a_{\mathrm{FCC}}/2$. | Candidate only; this is a diagnostic geometry specialization, not an accepted Noether sea selection rule or same-target wake/source row. |
| Local target-sea frame row | Target-center frame with target center `C(t)`, relative positions `y_a(t)=x_a(t)-C(t)`, and local sea velocity `u_sea(C,t)`. The first diagnostic rest condition is `\dot C(t)-u_sea(C,t)=0` after frame normalization. | Candidate only; the accepted density provider has `u_sea=(0,0,0)` for its own window, not for this target record. |
| Boundary-condition row | Local region `\Omega_C` around the target and boundary history `\mathcal H_{\partial\Omega}` carrying incoming sea wake/event data. No hard wall is allowed; the boundary must represent nearby Noether braid population response. | Candidate only. |
| Sea-response row | Candidate acceleration `\mathbf a_a^{\mathrm{sea}}=\mathcal A_a^{\mathrm{sea}}(B,\Theta_{\mathrm{sea}},\Theta_{\mathrm{asm}},\mathcal H_{\partial\Omega})`, projected onto the target reduced-radius direction. | Candidate only; not an accepted Noether sea response row. |
| Computed dipole wake-sum source row | Diagnostic `dipole_wake_sum` source row bound to the same target identity: the master-equation-kernel delayed sum over the 12 held FCC neighbor braids, zero free amplitude, using attempt `aa` FCC nearest-neighbor shell as the geometry carrier and event, support, and action provenance refs from this model. | Diagnostic only; computed, not fitted; not accepted wake, support, action, response, or retained evidence. |
| Accepted provenance replacement requirement | Fail-closed requirement and package verifier for the future `sh_0_sea_same_target_accepted_provenance_package.v0`, which must replace the diagnostic FCC geometry, event, support, and action refs after the seed-path certificate, external authority package, and repo authorization exist. | Requirement only; current status is blocked first at `held_release_seed_path_rows_acceptance_certificate`. |
| Support/envelope row | Common-sphere or spheroid support variables, reduced radius `R(t)`, radial velocity `\dot R(t)`, and radial acceleration `\ddot R(t)`. | Candidate only. |
| Action/exchange row | Diagnostic action/energy exchange variables for target, sea, and boundary. No physical architrino mass is introduced. | Candidate only; no same-record action closure. |
| Receiver-normal requirement row | Required fields for future same-record root-detail evidence: `branchWeight`, `sourceNormalDenominator`, `receiverNormalFactor`, and where available `receiverNormalNumerator` and `unsignedReceiverNormalFactor`. | Requirement only; no accepted receiver-normal branch strength. |

## Sea Population Variables

Let the central target be

$$
B_T(t)=\{x_a(t),\dot x_a(t),q_a,\sigma_a\}_{a=1}^{6},
$$

with target center

$$
C(t)=\frac{1}{6}\sum_{a=1}^{6}x_a(t),
\qquad
y_a(t)=x_a(t)-C(t).
$$

The surrounding like-braid population is

$$
\Theta_{\mathrm{asm}}(t)
=
\{X_k(t),U_k(t),O_k(t),\varphi_k(t),B_k(t)\}_{k=1}^{N_{\mathrm{sea}}},
$$

where each `B_k` is a like Noether braid assembly in the same support family as the target. For the first diagnostic population row, require paired centers and orientations:

$$
X_{k'}(t)-C(t)=-(X_k(t)-C(t)),
\qquad
U_{k'}(t)-\dot C(t)=-(U_k(t)-\dot C(t)),
$$

with orientation and phase choices recorded rather than assumed. This paired condition is only a diagnostic symmetry control. It is not an accepted Noether sea selection rule.

Attempt `aa` specializes the first diagnostic population to an FCC nearest-neighbor shell:

$$
N_{\mathrm{sea}}=12,
\qquad
X_k(t)=C(t)+\frac{a_{\mathrm{FCC}}}{2}d_k,
$$

with

$$
d_k\in
\{(\pm1,\pm1,0),(\pm1,0,\pm1),(0,\pm1,\pm1)\}.
$$

This places twelve like Noether braid assemblies on the face-diagonal nearest-neighbor shell around the central target. The specialization preserves the paired-center condition because each direction `d_k` has the opposite direction `-d_k` in the shell. In the first static diagnostic shell, `U_k(t)=\dot C(t)` unless future accepted boundary-wake rows supply motion.

The local Noether sea state is

$$
\Theta_{\mathrm{sea}}(t)
=
\{\rho_{\text{NS}}(\mathbf x,t),n(\mathbf x,t),u_{\mathrm{sea}}(\mathbf x,t),
e_{\mathrm{sea}}(\mathbf x,t),\theta_{\mathrm{sea}},f_N,\chi_{\mathrm{sea}}\}.
$$

The current reusable provider object supplies accepted rows for its own density-compression window:

- `rho_NS=1`;
- `n=1`;
- `u_sea=(0,0,0)`;
- `e_sea=0.008`;
- `thetaSeaId=theta-sea-density-compression-provider-0001`;
- acoustic channel row `X_density_compression_acoustic_provider_0001`;
- `c_X_disp_squared=2.5`;
- stress/strain row with `C1111_X=2.49`.

Those rows may seed this diagnostic model, but they do not bind to the `SH-0` target/source record.

## Boundary Row

Let `\Omega_C(t)` be the local region enclosing the central target and excluding the resolved sea assembly centers. The boundary-history row is

$$
\mathcal H_{\partial\Omega}(t)
=
\{W_{\partial\Omega}(t),E_{\partial\Omega}(t),J_{\partial\Omega}(t),A_{\partial\Omega}(t)\},
$$

where:

- `W_{\partial\Omega}` records incoming retained-wake or candidate wake data from nearby sea assemblies;
- `E_{\partial\Omega}` records local event rows crossing the boundary;
- `J_{\partial\Omega}` records diagnostic exchange flux through the boundary;
- `A_{\partial\Omega}` records the boundary action/exchange accumulator.

No element of `\mathcal H_{\partial\Omega}` is accepted evidence in this model. The row exists to prevent the Noether sea term from being a free wall around the central braid.

## Candidate Sea-Response Equation

The general candidate response is

$$
\mathbf a_a^{\mathrm{sea}}(t)
=
\mathcal A_a^{\mathrm{sea}}
\left(
B_T(t),\Theta_{\mathrm{sea}}(t),\Theta_{\mathrm{asm}}(t),\mathcal H_{\partial\Omega}(t)
\right).
$$

For the first diagnostic row, split this into radial support, damping/relaxation, and boundary-wake pieces:

$$
\mathcal A_a^{\mathrm{sea}}
=
-K_{\mathrm{NS}}[\Theta_{\mathrm{sea}},\Theta_{\mathrm{asm}},\mathcal H_{\partial\Omega}]
\Phi_a\,\hat y_a
-\Gamma_{\mathrm{NS}}[\Theta_{\mathrm{sea}},\Theta_{\mathrm{asm}},\mathcal H_{\partial\Omega}]
\dot\Phi_a\,\hat y_a
+\mathbf W_a^{\partial\Omega}.
$$

Here

$$
\hat y_a=\frac{y_a}{|y_a|},
\qquad
R(t)=\frac{1}{6}\sum_{a=1}^{6}|y_a(t)|,
\qquad
\Phi_a(t)=|y_a(t)|-R_\ast(t).
$$

`K_{\mathrm{NS}}` and `\Gamma_{\mathrm{NS}}` are not free fit constants in an evidence claim. In this diagnostic packet they are placeholders for response functionals that must later be derived from local Noether sea state, nearby like-braid population rows, boundary wake/event rows, and action/exchange provenance.

The reduced radial projection is

$$
\Pi_R\mathcal A^{\mathrm{sea}}(t)
=
\frac{1}{6}\sum_{a=1}^{6}
\hat y_a(t)\cdot
\mathcal A_a^{\mathrm{sea}}(t).
$$

## Support And Return Tests

The reduced-radius diagnostic uses

$$
R(t)=\frac{1}{6}\sum_a |y_a(t)|,
\qquad
\dot R(t)=\frac{1}{6}\sum_a
\frac{\langle y_a(t),\dot y_a(t)\rangle}{|y_a(t)|},
\qquad
\ddot R(t)\approx\frac{\Delta \dot R}{\Delta t}.
$$

Let `t_*` be the first compression-to-expansion turn in the isolated diagnostic. A candidate `SH-0-sea` return row must satisfy at least one of these diagnostic conditions:

$$
\ddot R_{\mathrm{toy}}(t_i)
+
\Pi_R\mathcal A^{\mathrm{sea}}(t_i)
<0,
\qquad t_i>t_\ast,
$$

or a candidate stable-radius condition:

$$
\dot R(t_i)=0,
\qquad
\ddot R_{\mathrm{toy}}(t_i)+\Pi_R\mathcal A^{\mathrm{sea}}(t_i)=0,
\qquad
\partial_R
\left(\ddot R_{\mathrm{toy}}+\Pi_R\mathcal A^{\mathrm{sea}}\right)_{t_i}<0.
$$

The current high-field toy diagnostic gives the weakest outward post-turn row as

$$
\ddot R_{\mathrm{toy}}\approx0.0934863484737535.
$$

Therefore the first diagnostic Noether sea response target is

$$
\Pi_R\mathcal A^{\mathrm{sea}}(t_i)
<
-0.0934863484737535-\epsilon_R
$$

for at least one post-turn row, with `\epsilon_R>0` chosen as the diagnostic deadband. This is a model target only; it is not retained evidence.

## Computed Dipole Wake-Sum Result

The executable wake-sum mode is:

```bash
node scripts/braid-ideal/sh-0-sea-diagnostic-candidate-model.mjs --wake-sum-run --pretty
```

The fitted response amplitude is removed from the script. There is no `Phi_probe`, no produced amplitude row, and no free response parameter anywhere in the output path; the run emits `free_amplitude_parameter_count=0` and `fitted_response_amplitude_present=false` at the run, source-row, and spacing-row levels, and legacy fitted-amplitude CLI options have no effect on the output.

The sea response is computed from the master-equation kernel over the 12 FCC nearest-neighbor braids with declared held histories:

- kernel: the same delayed-force kernel and constants as the escape-floor toy row — coupling $1$, softening $0.05$, $c_f=1$, with branch weight $1$ because held static sources give source Jacobian $1$ and release-time static receivers give receiver-normal factor $1$;
- held histories: each neighbor braid holds the six-site face-opposite decoration (signed-polarity dipole $p=2(1,1,1)$, $|p|=2\sqrt3$) at $X_k=C+(a_{\mathrm{FCC}}/2)d_k$ with declared aligned orientation, static over $[-W,0]$ with declared window $W=24$; there are no undeclared environment degrees of freedom;
- delayed sum: every directed receiver-source root ($6\times72=432$ per spacing) enters through its causal delay $d/c_f$ against the declared window, and the run reports root coverage and field-speed status per spacing;
- projection: $\Pi_R\mathcal A^{\mathrm{sea}}=(1/6)\sum_a\hat y_a\cdot\sum_{k,b}\mathrm{kernel}(y_a,X_k+u_b)$.

It binds to the same target/source identity as before: target artifact `held_release_seed_path_rows:5833f18e53586201`, source row `two-speed-preferred-row:u0.8:v0.2`, retained record `retained-record:held-release-six-point:adapter-acceptance-certificate`, provider object `candidate:central_solver_retained_history_provider_object:7d4a8fe0a9792327`, and the six target path-row refs.

With the diagnostic deadband $\epsilon_R=10^{-9}$, the required inward projected-response floor is $-0.0934863484737535-10^{-9}=-0.0934863494737535$.

Result over the declared spacing range $a_{\mathrm{FCC}}\in[3,12]$ (step $0.25$; all roots covered; field speed clean; every spacing above the shell-overlap constraint $2\sqrt2$):

| $a_{\mathrm{FCC}}$ | $\Pi_R\mathcal A^{\mathrm{sea}}$ | Crosses floor |
| ---: | ---: | --- |
| `3.00` | `-1.0813766127282922` | `true` |
| `4.00` | `-0.3712418671549982` | `true` |
| `4.25` | `-0.2833417889031177` | `true` |
| `5.25` | `-0.1024854319405312` | `true` |
| `5.50` | `-0.0810539856349695` | `false` |
| `6.00` | `-0.0519410281723061` | `false` |
| `12.00` | `-0.0014065476498006` | `false` |

A computed retention window in $a_{\mathrm{FCC}}$ exists with zero free amplitude:

- `retention_window_exists`: `true`;
- window: $a_{\mathrm{FCC}}\in[3,\,5.34690143]$, lower edge `bounded_by_declared_range_min` (above the shell-overlap constraint $2\sqrt2\approx2.8284$), upper edge `computed_floor_crossing` (bisected against the required floor);
- ten eligible crossing rows; the far-field decay of the computed sum is approximately $a_{\mathrm{FCC}}^{-5}$ (observed);
- named sea-spacing candidate: `sh0sea-aa-fcc-dipole-wake-sum:a-fcc-4.25` with $\Pi_R=-0.2833417889031177$ and inward margin $0.1899$ below the required floor, selected as the eligible crossing row nearest the window midpoint;
- fail-closed coverage discipline: shrinking the declared held-history window truncates the retention window at the last covered spacing with boundary status `truncated_by_root_coverage`.

The static-held run tests amplitude-only retention: the computed environment response is a monotone spacing threshold supporting the environment-theorem hypothesis (H1) with a computed inward projection that reverses the post-turn escape floor at sub-$5.35$ spacings. The delayed-echo variant below supplies the moving-history phase structure.

## Delayed-Echo Motion Result

The executable delayed-echo mode is:

```bash
node scripts/braid-ideal/sh-0-sea-diagnostic-candidate-model.mjs --wake-sum-run --neighbor-motion=breathing --pretty
node scripts/braid-ideal/sh-0-sea-diagnostic-candidate-model.mjs --wake-sum-run --neighbor-motion=orbiting --pretty
```

The 12 neighbor braids carry declared moving held histories over $[-W,0]$ with common phase: breathing scales each braid's sites by $1+\delta\cos(\Omega t+\varphi)$ (declared $\delta=0.2$, $\Omega\in\{1,2,4\}$), and orbiting rigidly rotates each braid about a declared axis (default $\hat z$, $\omega\in\{0.25,0.5,0.75\}$). Causal roots are solved per directed pair by bisection of the strictly increasing causal residual against the declared window; the branch weight is $|1/\max(J,0.05)|$ with source Jacobian $J=(c_f-\mathbf v_s\cdot\hat{\mathbf n})/c_f$ per the toy kernel, and receiver-normal factor $1$ at release. Motion parameters are declared history parameters, not response amplitudes; `free_amplitude_parameter_count=0` is preserved, and super-field-speed motion rows are excluded fail-closed. The run reports a per-spacing phase envelope ($\Pi_R$ min/max/mean over the declared phase grid) and two retention windows: guaranteed (all phases cross the floor) and phase-conditional (some phase crosses).

Result: the H5 phase-dependence prediction holds at the declared level. The static boundary $5.3469$ splits:

| Motion | Guaranteed window max | Phase-conditional window max | Spread at $a_{\mathrm{FCC}}=4.25$ |
| --- | ---: | ---: | ---: |
| breathing $\Omega=1$ | `5.022` | `5.908` | `0.070` |
| breathing $\Omega=2$ | `4.948` | `6.253` | `0.125` |
| breathing $\Omega=4$ | `3.512` | beyond declared range max | `1.333` (sign-reversing) |
| orbiting $\omega=0.25$ | none | `5.946` | `0.345` |
| orbiting $\omega=0.5$ | none | `6.869` | `0.614` |
| orbiting $\omega=0.75$ | none | `8.223` | `0.837` |

At the named candidate spacing $4.25$, breathing $\Omega=4$ fails the all-phase crossing while the some-phase crossing holds; orbiting collapses the phase-mean to $-0.0944$ (the rotating braid dipole averages away) at every tested $\omega$ while widening the phase-conditional reach. Reading (diagnostic-only): the sea's retention supply is phase- and orientation-dependent — dipole-aligned neighbor order (static or breathing) gives a guaranteed window, while freely reorienting neighbors give only phase-conditional retention. Sea orientational order is therefore a named condition on the environment-theorem route, and the $\delta\to0$ limit reproduces the static sum exactly (verified by test).

Both wake-sum runs also emit `sh_0_sea_candidate_same_record_request.v0`: the named $a_{\mathrm{FCC}}=4.25$ candidate with its kernel, held-history and motion declarations, target binding, required same-record objects (seed-path certificate chain, retained-source adapter package, receiver-normal root-detail rows, action closure, accepted sea-response row at the candidate spacing), and downstream consumers (`self_hit_held_release_solver_row`, `native_retained_history_promotion`, SH-0-sea same-record rows). The request is fail-closed at the seed-path certificate and authorizes nothing.

## Orientational-Order Condition And Stochastic Retention

The executable analysis is [sh-0-sea-orientation-order-diagnostic.mjs](../../../../scripts/braid-ideal/sh-0-sea-orientation-order-diagnostic.mjs) (`sh_0_sea_orientation_order_diagnostic.v0`), with tests in [braid-ideal-sh-0-sea-orientation-order-diagnostic.test.js](../../../../tests/braid-ideal-sh-0-sea-orientation-order-diagnostic.test.js). It compares the three named neighbor-orientation ensembles — aligned, paired-antiphase (opposite-shell neighbors dipole-conjugated), and isotropically disordered (declared seeded uniform $SO(3)$ sampler, seed $20260707$; a conjugate-aligned control is included) — under pairwise potential superposition of declared held braids at the same kernel constants, zero free amplitude.

Derived structure, in order of strength:

1. Dipole-shell cancellation lemma (exact). For aligned braid dipoles $p=2(1,1,1)$ on the FCC nearest-neighbor shell, the point-dipole interaction sum cancels exactly: the 12 face-diagonal bond directions split into 6 with $\cos^2\theta=2/3$ (dipolar factor $1-3\cos^2\theta=-1$) and 6 with $\cos\theta=0$ (factor $+1$), so $\sum_k(1-3\cos^2\theta_k)=0$. Orientation selection is decided at higher multipole and near-field order, consistent with the observed $\approx a_{\mathrm{FCC}}^{-5}$ far-field decay of the aligned wake sum.
2. Frustration (computed). At $a_{\mathrm{FCC}}=4.25$ the attractive bond class prefers aligned ($U=-0.4328$) and the transverse class prefers dipole-flipped ($U=+0.5768$ aligned, exactly negated when flipped), with comparable magnitudes: no uniform orientation assignment minimizes all FCC nearest-neighbor bonds. Sampled non-uniform configurations reach total cluster energies ($\min\approx-4.4$) below every uniform ensemble (aligned $2.59$, conjugate-aligned $0.86$, paired-antiphase $4.61$), so the pair-potential ground state is a non-uniform pattern.
3. Paired-antiphase null lemma (exact). The paired-antiphase ensemble yields $\Pi_R\mathcal A^{\mathrm{sea}}=0$ exactly, by inversion-plus-conjugation symmetry of the central braid against the shell (observed $\le3\times10^{-16}$). This ensemble can never supply retention.
4. Conjugation sign rule (exact) and the energy-retention tension. Conjugating all 12 neighbors flips $\Pi_R$ exactly: aligned gives inward $-0.2833$ at $4.25$ (retention), conjugate-aligned gives outward $+0.2833$ (expulsion). But the center-shell interaction energy prefers the conjugate orientation ($-0.8639$ versus $+0.8639$): the retention-favorable relative orientation is the energetically disfavored one at the pair-potential level.
5. Stochastic retention verdict (computed). Isotropic disorder gives a zero-mean response (uniform $SO(3)$ averaging of each neighbor braid produces a net-zero charge shell; sampled $|\bar\Pi_R|\le0.03$, consistent with sampling error at $\sigma\approx0.22$, $N=200$), so the annealed reading (fast sea re-randomization) supplies no retention window at any spacing. The quenched crossing probability peaks at $p\approx0.43$ (near $a_{\mathrm{FCC}}=3.75$) and decays with spacing — always below one half — so no majority-retention window exists, and repeated re-randomization supplies no net inward bias. The stochastic retention argument fails at the fixed-source diagnostic level.

Orientational-order condition (diagnostic claim level): guaranteed sea retention requires central-aligned neighbor dipole order; static pair energetics does not select that order (frustrated, with the aligned relative orientation energetically disfavored), the paired-antiphase alternative is exactly null, and isotropic disorder fails both stochastic readings. Any aligned order must therefore be maintained dynamically, topologically, or by formation history — or induced: the named remaining environment mechanism is induced sea orientational polarization, a response of neighbor orientations to the central braid's own held wake, which the fixed-source diagnostic cannot compute. The responsive-orientation relaxation in the next subsection computes the radial (retention) response and finds it drives the sea anti-retentive; the following subsection computes the dynamic tangential (absorber) response and finds it absorptive but insufficient at cluster stiffness. This is not an accepted Noether sea selection rule; every output stays fail-closed at the seed-path certificate.

### Induced Sea Orientational Polarization - 2026-07-07

The executable analysis is [sh-0-sea-induced-polarization-diagnostic.mjs](../../../../scripts/braid-ideal/sh-0-sea-induced-polarization-diagnostic.mjs) (`sh_0_sea_induced_polarization_diagnostic.v0`), with tests in [braid-ideal-sh-0-sea-induced-polarization-diagnostic.test.js](../../../../tests/braid-ideal-sh-0-sea-induced-polarization-diagnostic.test.js). It answers the orientational-order caveat directly: does the aligned order that guaranteed retention needs arise on its own when the neighbor orientations are allowed to relax under the central braid's held wake?

Declared model. Each of the 12 FCC nearest-neighbor braids carries one $SO(3)$ rotation acting on the held six-site face-opposite decoration (signed-polarity dipole $p=2(1,1,1)$, $|p|=2\sqrt3$); dipole reversal is reachable within $SO(3)$, so no separate conjugation variable is declared. The central braid is held fixed as the `SH-0` target identity. The orientations evolve by overdamped gradient relaxation (declared torque descent) on the total potential-superposition energy of the 13-braid cluster — every center-shell bond plus every shell-shell bond, same kernel constants as the wake-sum runs (coupling $1$, softening $0.05$, $c_f=1$; held static braids, so the delayed potential equals the static potential). The torque on neighbor $k$ about its own center is $\tau_k=\sum_{i\in k}(x_i-X_k)\times F_i$ with $F_i=-\nabla_i U$; the relaxation step, iteration cap, and convergence tolerance ($\max_k|\tau_k|<\mathrm{tol}$) are declared integration parameters, not response amplitudes. There is no fitted or free response parameter anywhere in the output path: `free_amplitude_parameter_count=0` at every level. The orientation order parameter is the mean per-neighbor dipole projection $O=\tfrac1{12}\sum_k(R_kp\cdot\hat p)/|p|$ (aligned $+1$, dipole-reversed $-1$), and $\Pi_R\mathcal A^{\mathrm{sea}}$ of the relaxed shell is computed against the escape floor $-0.0934863484737535$ with the standard deadband.

Exact controls verified (test-pinned). Conjugation antisymmetry: conjugating all 12 neighbors flips $\Pi_R$ exactly (aligned-plus-conjugate sum $\le3\times10^{-16}$). Paired-antiphase null: the opposite-shell-conjugated ensemble yields $\Pi_R=0$ exactly in both the charge-conjugation and the $SO(3)$ $180^\circ$-rotation representations. Fixed-point structure: the paired-antiphase configuration is an exact response null but not an energy fixed point — its mechanical torque is nonzero ($\max_k|\tau_k|\approx1.47$ at $a_{\mathrm{FCC}}=4.25$), as is the aligned configuration's ($\approx0.58$) — so overdamped relaxation escapes both toward the frustrated basin.

Result (recorded run: `--samples=6 --iteration-cap=2000 --convergence-tolerance=1e-7`). At every declared spacing the relaxed radial response is outward ($\Pi_R>0$) from the aligned start, the paired-antiphase start, and every disordered seed, reversing the sign of the assumed-aligned inward reference response and clustering near the anti-retentive conjugate limit $-\Pi_R^{\mathrm{aligned}}$. No start crosses the inward floor at any spacing; the disordered mean response is outward everywhere.

| $a_{\mathrm{FCC}}$ | aligned-input ref $\Pi_R$ | relaxed aligned $\Pi_R$ | relaxed disordered $\bar\Pi_R$ (min/max) | disordered crossings | classification |
| ---: | ---: | ---: | ---: | ---: | --- |
| `3.00` | `-1.0814` | `+1.1480` | `+0.5869` (`-0.5466`/`+1.4982`) | `1/6` | `basin_dependent` |
| `3.50` | `-0.6406` | `+0.4627` | `+0.3826` (`+0.1504`/`+0.7881`) | `0/6` | `induced_anti_aligned` |
| `4.00` | `-0.3712` | `+0.3081` | `+0.3283` (`+0.2852`/`+0.3646`) | `0/6` | `induced_anti_aligned` |
| `4.25` | `-0.2833` | `+0.2837` | `+0.2934` (`+0.2511`/`+0.3365`) | `0/6` | `induced_anti_aligned` |
| `4.50` | `-0.2174` | `+0.2505` | `+0.2736` (`+0.2334`/`+0.2947`) | `0/6` | `induced_anti_aligned` |
| `5.00` | `-0.1306` | `+0.1754` | `+0.2045` (`+0.1918`/`+0.2140`) | `0/6` | `induced_anti_aligned` |
| `5.25` | `-0.1025` | `+0.1516` | `+0.1767` (`+0.1646`/`+0.1960`) | `0/6` | `induced_anti_aligned` |

The signed outcome resolves the tension the run was built to test, rather than assuming it away. The center-shell energy prefers dipole-reversed (conjugate) neighbors ($+0.864$ aligned versus $-0.864$ conjugate at $a_{\mathrm{FCC}}=4.25$), and overdamped relaxation realizes that preference in response space: the relaxed shell expels rather than retains. Neighbor-neighbor frustration keeps the literal dipole order parameter small and mildly positive ($O\approx0.12$-$0.23$) — the FCC dipole-shell sum cancels exactly, so the retention-relevant response is a higher-multipole effect that the dipole order parameter only weakly tracks — but the response is robustly outward at the anti-retentive conjugate scale. The lone inward crossing at $a_{\mathrm{FCC}}=3.00$ is one of six near-overlap seeds against an outward mean of $+0.587$; it is a minority basin, not a window.

Disposition: `induced_polarization_relaxes_anti_retentive_no_bounded_window`. The static induced-polarization retention route is falsified at the diagnostic level: left to relax under its own potential-superposition energetics, the fixed-geometry sea polarizes to expel the central braid. Combined with the frustration, paired-antiphase null, and stochastic-disorder results above, no static or quasi-static mechanism in the fixed-geometry sea supplies the central-aligned order that guaranteed retention requires. The aligned-order caveat on every sea-screened held-release row therefore hardens from "conditional on an alignment mechanism" to an open formation-history / dynamic-alignment burden, and the mechanism hunt sharpens toward the hinge-click absorber route (`self_hit_held_release_solver_row`). Claim level: diagnostic rows only; not an accepted Noether sea selection rule; `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, every output fail-closed at the central seed-path certificate.

That relaxation answers the radial retention question with the central braid held static. The distinct tangential absorber question — whether the *dynamic* induced polarization can drain the certified pump when the central braid rotates — is decided in the next subsection.

### Dynamic Induced Polarization - Tangential Absorber Test - 2026-07-07

The executable analysis is [sh-0-sea-dynamic-polarization-drive-diagnostic.mjs](../../../../scripts/braid-ideal/sh-0-sea-dynamic-polarization-drive-diagnostic.mjs) (`sh_0_sea_dynamic_polarization_drive_diagnostic.v0`), with tests in [braid-ideal-sh-0-sea-dynamic-polarization-drive-diagnostic.test.js](../../../../tests/braid-ideal-sh-0-sea-dynamic-polarization-drive-diagnostic.test.js). It answers the absorber half that the static relaxation above cannot reach: [Corollary S](delayed-escape-certificate-lemma-proof-packet.md#corollary-s---sea-screened-clock-the-aligned-fcc-sea-is-a-non-absorber) certified the *static* aligned sea as a non-absorber (its orientation torque $c_0$ does exactly zero cyclic work); the remaining named channel is the *dynamic* linear response — neighbor orientations responding with a phase lag to the central braid's own rotating wake, which does nonzero cyclic work.

**Threefold-drive lemma (derivation, witnessed).** Let the central braid rotate about $\hat{\mathbf n}=(1,1,1)/\sqrt3$ at $\omega=\beta c_f/r_\perp$ ($r_\perp=\sqrt{2/3}$ the rim radius of a unit octahedral site). The braid is $C_3$-invariant about $\hat{\mathbf n}$, so the wake it presents at any fixed neighbor is $2\pi/3$-periodic in the rotation phase: the orientational drive torque $\boldsymbol\tau_k(\varphi)=\mathbf p_k\times\mathbf E(X_k,\varphi)$ has **only threefold harmonics** $m=3,6,9,\dots$ (owner-script witness: $|\tau^{(m)}|/|\tau^{(3)}|\le3\times10^{-15}$ for $m=1,2,4,5$). The axial dipole $\mathbf p=2(1,1,1)\parallel\hat{\mathbf n}$ is rotation-invariant and supplies no AC drive; the lowest drive is the $m=3$ harmonic of the higher multipole content, with $\sum_k|\tau_k^{(3)}|^2$ rising from $0.109$ at $\beta=0.1$ to $0.529$ at $\beta=0.9$ (causal delay enhances the high-$\beta$ drive; $m=6,9$ are $\le10^{-4}$ of $m=3$).

**Sign-definite absorption and damping coefficient (derivation).** Unlike the static $c_0$, a phase-lagged orientational response does nonzero cyclic work. For a neighbor with orientational AC susceptibility $\chi(\omega)=\chi'(\omega)-i\chi''(\omega)$ ($\chi''\ge0$), the cycle-averaged dissipated power is

$$
\langle P\rangle=\tfrac12\sum_{m\ge3}(m\omega)\,\chi''(m\omega)\sum_k\lvert\tau_k^{(m)}\rvert^2\;\ge\;0,
$$

drained from the central rotation: the dynamic induced polarization is the **first sea tangential channel with a sign-definite absorptive cyclic effect**. Mapping the power to an effective per-site tangential damping coefficient, $\Phi_{\mathrm{tan}}^{\mathrm{ind}}=\langle P\rangle/(6\,v_t)$ with $v_t=\beta c_f$, gives (dominant $m=3$ term)

$$
\Phi_{\mathrm{tan}}^{\mathrm{ind}}(\beta)\;\approx\;\Bigl[\tfrac{1}{12}\,\tfrac{3}{r_\perp}\textstyle\sum_k\lvert\tau_k^{(3)}\rvert^2\Bigr]\,\chi''(3\omega)\;=\;(0.03\text{–}0.17)\,\chi''(3\omega),
$$

a computed, $\chi''$-linear prefactor rising with $\beta$ (the $\beta$ from $\omega$ cancels the $1/\beta$ from power-to-coefficient; the residual growth is the delay enhancement of the drive).

**Threshold and verdict (computation + assessment).** Absorbing the certified pump $\Phi_{\mathrm{tan}}\ge c_1\beta=2.881\beta$ requires

$$
\chi''(3\omega)\;\ge\;\frac{c_1\beta}{\Phi_{\mathrm{tan}}^{\mathrm{ind}}/\chi''}\;=\;8.6\text{–}19.2
\qquad\Longleftrightarrow\qquad
\text{orientational stiffness }K\lesssim0.026\text{–}0.058,
$$

since an overdamped mode has $\chi''_{\max}=1/(2K)$ at resonance $3\omega\gamma=K$. The cluster orientational stiffness the static relaxation above exhibits (aligned/antiphase torques $0.58$–$1.47$ over $O(1)$ radians, so $K\sim0.3$–$0.5$, $\chi''_{\max}\sim1$–$1.7$) falls short of the threshold by a factor $5$–$15$: at plausible $\chi''\sim1$ the induced damping is $\Phi_{\mathrm{tan}}^{\mathrm{ind}}\lesssim0.03$–$0.17$, the same order as the static sea ($\le0.28$) and breathing ($\approx0.73\times$) channels, i.e. $\le10\%$ of the pump. Disposition `dynamic_induced_polarization_absorptive_but_insufficient_at_cluster_stiffness`.

The channel is therefore genuinely dissipative but insufficient under the cluster-derived stiffness. Sufficiency requires two coincident conditions on the neighbor braid: a **near-Goldstone-soft orientation mode** ($K\lesssim0.05$, an order softer than the cluster bonds supply) *and* **resonance tuning** ($\gamma\approx K/(3\omega)$). Both reduce to one internal quantity — the neighbor braid orientational AC susceptibility $\chi''(3\omega)$ — which this fixed-source diagnostic cannot fix and which only a retained-history dynamic-braid computation can supply. Claim level: derivation for the threefold-drive lemma, the absorptive sign, and the damping functional form; computation for the drive harmonics and the $\chi''$ threshold; assessment (hypothesis) for the cluster-stiffness estimate that yields the shortfall. `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, every output fail-closed at the central seed-path certificate; the reported $\chi''$ is a threshold, never a fitted amplitude (`free_amplitude_parameter_count=0`).

The computed wake-sum source row is `sh_0_sea_dipole_wake_sum_source:2f3aad5e6cced01f` (`response_kind=dipole_wake_sum`), carrying the attempt `aa` FCC shell geometry carrier and the same event, support, and action provenance refs as the model rows. These results are computed same-target diagnostic rows, not accepted proof evidence. They do not authorize a Noether sea response closure, stability claim, retained branch, score movement, or corpus promotion, because the accepted target/source certificate, external authority package, retained-source adapter package, same-record receiver-normal rows, same-record action closure, accepted wake/event/support rows, and accepted `SH-0-sea` sea-response row are still absent.

The wake-sum run also emits the exact future replacement requirement:

- schema: `sh_0_sea_same_target_accepted_provenance_replacement_requirement.v0`;
- required package: `sh_0_sea_same_target_accepted_provenance_package.v0`;
- package verifier schema: `sh_0_sea_same_target_accepted_provenance_package_verification.v0`;
- current status: `seed_path_acceptance_certificate_missing`;
- first missing object: `held_release_seed_path_rows_acceptance_certificate`;
- first missing field: `held_release_seed_path_rows.acceptance_certificate_ref`;
- required accepted provenance refs: `accepted_geometry_provenance_ref`, `accepted_event_provenance_ref`, `accepted_support_provenance_ref`, and `accepted_action_provenance_ref`;
- accepted geometry ref prefix: `accepted:sh-0-sea:geometry:aa-fcc-nearest-neighbor-shell:`;
- accepted dipole wake-sum event ref prefix: `accepted:sh-0-sea:event:dipole_wake_sum:aa-fcc-shell:`.

This requirement is the executable bridge for the closure target. It propagates staged seed-path verifier states without changing claim level: with a matching certificate only, the first missing object becomes `held_release_seed_path_rows_external_accepted_authority_package`; with a matching certificate plus authority package, the first missing object becomes `repo_authorization_for_accepted_held_release_seed_path_rows`; with all three supplied and matching, the seed-path requirement passes and the next first missing object becomes `sh_0_sea_same_target_accepted_provenance_package`. The package verifier can check that a supplied future package matches the current FCC-carried diagnostic source row, geometry carrier, target binding, seed-path certificate ref, external authority package ref, exact repo authorization ref, and accepted geometry/event/support/action provenance ref prefixes. Even a shape-valid package cannot advance the top-level blocker past `held_release_seed_path_rows_acceptance_certificate` while the seed-path authority chain is absent. It still leaves `accepted=false`, `requirement_passed=false`, and `scoreMovement="no_score_increase"` until the seed-path authority chain is accepted. Once the seed-path certificate, matching external authority package, and repo authorization exist, the next package must replace the current FCC-carried diagnostic geometry/event/support/action refs with accepted same-target provenance.

## Sea-Screened Held-Release Rows - 2026-07-07

The dynamical consumption of the computed wake sum. Executable mode:

```bash
node scripts/braid-ideal/held-release-causal-wake-toy.mjs --fcc-sea-spacing 4.25 [--prehistory-mode ... --surface-speed-fraction ...]
node scripts/braid-ideal/delayed-escape-certificate-check.mjs --result <out>/result.json
```

[held-release-causal-wake-toy.mjs](../../../../scripts/braid-ideal/held-release-causal-wake-toy.mjs) gains `--fcc-sea-spacing` (rejected fail-closed below the shell-overlap floor $2\sqrt2$) and `--fcc-sea-held-window` (default $24$). When active, the released seed evolves inside the attempt `aa` FCC shell: $72$ held static sea sources (12 neighbors, face-opposite decoration, aligned orientation — the dipole-aligned order case where the delayed-echo guaranteed window holds) contribute delayed inverse-square forces with exact static causal roots ($J=1$), receiver-normal branch weights, and a declared one-way environment (held histories; no back-reaction). The default toy run is unchanged byte-for-byte when the flag is absent. Release-instant consistency: the toy's release sea radial projection reproduces the wake-sum row $\Pi_R=-0.283341788903118$ to $13$ digits; sea root coverage is complete in every executed row.

**Result (return turns, no bounded window).** Eight rows executed at the named spacing $a_{\mathrm{FCC}}=4.25$ (toy defaults; `vt000` control, `vt025`/`vt050` kick-at-release, `vt025`-`vt099` moving-prehistory; per-row numbers in the [run matrix](sh-run-matrix.md)). The three rows that were outward-only in the isolated sweep (`vt080`/`vt095`/`vt099` moving-prehistory) now show an expansion-to-compression **return turn** at $t=0.176/0.346/0.390$, at $R\approx1.001$-$1.013$, strictly before the first recorded field-speed crossing ($t=0.466/0.430/0.422$): the first sub-field return turns in this program, removing the prior discount that every inward post-turn row sat after the crossing. The return is short-lived: each row then compresses or hovers near $R\approx1$ while the internal tangential channel accelerates the sites through $c_f$ (the radius barely moves as the speed crosses — radial support without a tangential absorber), and the subsequent bounce escapes through the shell with close sea passes; `vt095` extended to duration $6$ confirms escape. Compression-first rows turn earlier than isolated but show no second turn.

**Checker consumption.** [delayed-escape-certificate-check.mjs](../../../../scripts/braid-ideal/delayed-escape-certificate-check.mjs) evaluated all eight rows: fail-closed everywhere (`windowCertificateGranted=false`); the three return-turn rows carry $8$-$19$ signed admissible certificate times with escape margins failing at $-468$ to $-489$ under unit coupling; the ordering witness is consistent in every row. Caveat carried in the row output: the certificate envelope bounds partner sources only, so sea-screened margins are diagnostic, not lemma-backed; a sea-aware envelope extension is an open obligation of the escape-lemma packet if certificate work moves to embedded rows.

**Disposition.** `sea_screened_return_turns_without_bounded_window` — the computed sea term converts the outward-only family into a return-turn family inside the sub-field window at the named spacing (the environment-theorem route survives its first dynamical test), but no bounded window exists in the toy because the pumped tangential action has no absorber: the branch dies at the field-speed hinge while the radius is held. This is the same missing-absorber conclusion as the breathing-hunt rejection, now witnessed dynamically in the embedded environment. Claim level: diagnostic rows only; no retained branch, no stability claim, no accepted evidence, no score movement; everything remains blocked at the central seed-path certificate.

The static-screen certification of this missing-absorber reading is [Corollary S](delayed-escape-certificate-lemma-proof-packet.md#corollary-s---sea-screened-clock-the-aligned-fcc-sea-is-a-non-absorber): the sea along-velocity contribution decomposes exactly as $\Pi_{\mathrm{tan}}^{\mathrm{sea}}=c_0(\varphi)-\beta Q(\varphi)$ with $c_0$ a zero-cyclic-average orientation torque and the velocity-linear coefficient certified $\sup_\varphi\lvert Q\rvert\le0.275<c_1=2.881$, so the aligned FCC sea removes at most $\approx10\%$ of the certified tangential pump and cannot cancel it at any phase or orientation order. The dynamical return turns here are the certified inward radial projection $\Pi_R=-0.283$ holding the radius while the uncancelled pump crosses the sites through $c_f$ — exactly the recorded "radial support without a tangential absorber."

### Self-Hit Probe Inside the Sea Shell - 2026-07-07

The sharpened form of `self_hit_held_release_solver_row` at toy level: the same rows rerun with `--include-self-hits`, testing whether same-source rows (hinge clicks) absorb the pumped tangential action while the sea holds the radius. New toy event `firstSelfHitRoot` records when same-source roots first populate.

**Result 1 - exact hinge timing (positive witness).** In every executed row (`vt000` control, `vt080`/`vt095`/`vt099` moving-prehistory, sea and no-sea variants), the first same-source root opens at exactly the first recorded field-speed crossing (`firstSelfHitRoot.time == firstFieldSpeedCrossing.time`), and the sub-field trajectory is unchanged to the step (identical to the sea-only rows through $t=0.42$ on `vt095`). Consequence carried as a small lemma: sub-field motion admits no same-source roots, so the sea-screened return-turn result is self-hit-robust by construction, and same-source roots are an exact hinge phenomenon — executable support for the click hypothesis's location on the fold set.

**Result 2 - the naive self-hit kernel ejects, chart-dependently (negative with mechanism).** With the partner kernel applied unchanged to same-source rows (same-polarity repulsion from the site's own past, branch weights up to $163$ at the $0.05$ Jacobian floor, $24$ small-Jacobian roots), the first click is a violent outward ejection: site speeds jump from $0.98$ to $\approx12\,c_f$ within $\approx0.04$ time units of the crossing, the braid blows through the shell (final $R\approx32$ versus $\approx4$ without self-hits), and partner causal-root coverage collapses ($\approx33{,}000$ missing directed roots), voiding (WP) on the post-hinge record. The ejection magnitude is regularization-dependent — final $v_{\max}$ moves from $12.4$ to $9.8$ to $10.6\,c_f$ under Jacobian floor $0.05\to0.2$ and self-hit minimum delay $0.002\to0.05$ — so the blow-up is a resolution-limited caustic artifact: the toy witnesses the uncontrolled Whitney-fold crossing, not the controlled click. Under every tested regularization the self-hit kernel is uniformly ejective, never absorptive.

**Disposition.** `naive_self_hit_kernel_ejects_at_hinge_no_absorption_in_toy` — the toy cannot decide the click-absorber question; it decides what the deciding object must contain. The producer boundary for `self_hit_held_release_solver_row` sharpens from "self-hit rows enabled" to a regularization-independent fold-crossing treatment: the central-solver retained-history row must carry the canonical fold-set chart ($\Sigma_{ij}$ with fold-resolution coordinates), a finite click impulse defined by the chart rather than by softening/floor parameters, and same-record action-ledger rows that book the transacted $h_{\mathrm{act}}$ — otherwise any post-hinge trajectory is chart noise. Checker consumption: all five rows fail closed with pre-crossing margins identical to the sea-only rows (sub-field window unchanged), ordering witness consistent, and (WP) correctly reported lost post-hinge. No retained branch, no stability claim, no score movement.

## Action And Exchange Variables

The diagnostic action/exchange row records how the candidate sea response would appear in a same-record action ledger later:

$$
\dot A_{\mathrm{diag}}^{\mathrm{sea}\to T}(t)
=
\sum_{a=1}^{6}
\dot y_a(t)\cdot\mathcal A_a^{\mathrm{sea}}(t),
$$

and

$$
\mathcal R_A^{\mathrm{diag}}(t_0,t_1)
=
\Delta A_T
+
\Delta A_{\mathrm{sea}}
+
\Delta A_{\partial\Omega}.
$$

For this diagnostic packet, `\mathcal R_A^{\mathrm{diag}}` is only a bookkeeping residual. A later accepted row must replace it with same-record action closure, retained wake history, provider provenance, and event/support rows.

## Receiver-Normal Evidence Requirements

Any later accepted `SH-0-sea` branch-weight row must include current receiver-normal accounting on the same record as the target/source, sea response, event, support, action, and wake rows.

Minimum required root-detail fields:

- `retained_record_id`;
- `source_row_id`;
- receiver and source path identities;
- causal-root identity and residual;
- `jacobian` as a transversality diagnostic;
- `sourceNormalDenominator`;
- `receiverNormalFactor`;
- `branchWeight`;
- when available in the current equivalent row family, `receiverNormalNumerator` and `unsignedReceiverNormalFactor`;
- provider provenance;
- action/wake/event/support row refs.

Coverage requirement:

- six same-source self-hit rows for the target;
- thirty directed partner causal-root replay rows for the target;
- boundary wake/event rows for sea assemblies entering `\Omega_C`;
- any additional sea-response causal roots needed by `\mathcal A_a^{\mathrm{sea}}`.

Source-normal-only, Jacobian-only, and `eta^-2 |J|^-1` weights remain diagnostic only.

## Model Output Classification

| Output | Current classification |
| --- | --- |
| Central target identity | Diagnostic/candidate, not accepted |
| Like-braid Noether sea population | Diagnostic/candidate |
| Attempt `aa` FCC nearest-neighbor shell | Diagnostic/candidate; `N_sea=12` geometry specialization only |
| Local target-sea frame | Diagnostic/candidate |
| Boundary-condition row | Diagnostic/candidate |
| Candidate sea-response equation | Diagnostic/candidate |
| Computed dipole wake-sum source row | Diagnostic/candidate; computed from the master-equation kernel with zero free amplitude; same-target provenance refs plus attempt `aa` FCC geometry carrier only |
| Computed retention window in $a_{\mathrm{FCC}}$ | Diagnostic/candidate; $[3,\,5.34690143]$ at the declared kernel and held-history declaration; not retained evidence |
| Delayed-echo motion windows | Diagnostic/candidate; guaranteed and phase-conditional windows at declared motion parameters; phase- and orientation-dependent; not retained evidence |
| Candidate same-record request | Request only; feeds the named $a_{\mathrm{FCC}}=4.25$ candidate into the same-record chain; fail-closed at the seed-path certificate |
| Orientational-order condition | Diagnostic/candidate; exact cancellation, null, and sign lemmas plus computed frustration and stochastic-retention rejection; not an accepted Noether sea selection rule |
| Induced sea orientational polarization (static) | Diagnostic/candidate; overdamped $SO(3)$ relaxation drives generic starts anti-retentive (outward $\Pi_R$) at every declared spacing with zero free amplitude; static induced-polarization retention route falsified at diagnostic level; not an accepted Noether sea selection rule |
| Induced sea orientational polarization (dynamic tangential) | Diagnostic/candidate; phase-lagged response to the rotating wake is the first sign-definite absorptive sea tangential channel (drive is the $m=3$ threefold harmonic; $\Phi_{\mathrm{tan}}^{\mathrm{ind}}\approx(0.03$–$0.17)\chi''(3\omega)$), but insufficient at cluster stiffness ($\le10\%$ of the pump; needs $K\lesssim0.05$); reduces to the neighbor orientational AC susceptibility, a retained-history quantity; zero free amplitude |
| Accepted provenance replacement requirement | Requirement only; blocked first at the seed-path acceptance certificate |
| Support/envelope variables | Diagnostic/candidate |
| Action/exchange variables | Diagnostic/candidate |
| Receiver-normal row requirements | Requirement only |
| Accepted retained evidence | Not authorized |
| Force/action closure | Not authorized |
| Noether sea response closure | Not authorized |
| Stability or retained branch | Not authorized |
| Score movement | Not authorized |
| Corpus promotion | Defer with blocker |

## Next Executable Diagnostic Target

The wake-sum run instantiates this model with:

1. the central target row from `held_release_seed_path_rows:5833f18e53586201`;
2. a paired local population of like Noether braid assemblies around the target;
3. the accepted `theta_sea_rho_NS` provider rows as reusable local-state inputs, explicitly unbound to the target record;
4. a boundary row `\mathcal H_{\partial\Omega}` carrying candidate wake/event input from the surrounding population;
5. the attempt `aa` FCC nearest-neighbor shell row as the diagnostic geometry carrier for the computed `dipole_wake_sum` source row;
6. the computed master-equation-kernel delayed sum, which reports `\Pi_R\mathcal A^{\mathrm{sea}}` per declared spacing, checks the diagnostic inward floor, and reports the retention window in $a_{\mathrm{FCC}}$;
7. a fail-closed accepted-provenance replacement requirement for the future same-target geometry, event, support, and action package.

The computed sum crosses the floor for $a_{\mathrm{FCC}}\le5.3469$ with zero free amplitude, naming `sh0sea-aa-fcc-dipole-wake-sum:a-fcc-4.25` as the sea-spacing candidate; the delayed-echo variant confirms phase- and orientation-dependent window structure; the orientational-order analysis shows the required aligned order is not selected by static pair energetics while stochastic (disordered) retention fails both readings; and the induced-polarization relaxation now closes that route negatively — overdamped $SO(3)$ orientation descent drives generic starts anti-retentive (outward $\Pi_R$) at every declared spacing, so the fixed-geometry sea supplies no static induced-alignment mechanism. The next executable proof targets are, in order: pursue the hinge-click absorber route (`self_hit_held_release_solver_row`) as the remaining retention mechanism now that all static/quasi-static sea-alignment routes are closed; bind the emitted `sh_0_sea_candidate_same_record_request.v0` in the retained-source acquisition path so the accepted chain carries the candidate spacing; and replace the computed diagnostic source row with an accepted same-target source row carrying accepted geometry, event, support, and action provenance while preserving the accepted-evidence blocker.

This computed pass justifies a sharper retained-source request. It still does not authorize retained evidence until the seed-path certificate, external authority package, repo authorization, retained-source adapter package, same-record receiver-normal rows, same-record action closure, accepted wake/event/support rows, and accepted `SH-0-sea` sea-response row exist.

## Replacement Audit 2026-07-05

No accepted same-target `boundary_wake` or `pressure_tension` source row was found to replace the current attempt `aa` FCC-carried diagnostic source rows:

- `sh_0_sea_produced_response_source:pressure_tension:a8c1a969eb0ccb5e`;
- `sh_0_sea_produced_response_source:boundary_wake:0bd98a2e2ea4a94f`.

The diagnostic rows remain useful because they are same-target, use the attempt `aa` FCC shell as a geometry carrier, and cross the diagnostic floor, but their geometry, event, support, and action refs are local diagnostic refs only. Live output keeps `accepted=false`, `retained_evidence_authorized=false`, `receiver_normal_branch_strength=false`, and `scoreMovement="no_score_increase"`.

The first missing accepted object remains:

- object: `held_release_seed_path_rows_acceptance_certificate.v0`;
- field: `held_release_seed_path_rows.acceptance_certificate_ref`;
- provider-backed artifact: `held_release_seed_path_rows:5833f18e53586201`;
- retained record: `retained-record:held-release-six-point:adapter-acceptance-certificate`;
- source row: `two-speed-preferred-row:u0.8:v0.2`;
- required accepted-ref prefix: `accepted:held-release-seed-path-rows:retained-record:held-release-six-point:adapter-acceptance-certificate:two-speed-preferred-row:u0.8:v0.2:`.

No current executable producer emits that accepted certificate. The current executable boundary is the verifier/intake path in `scripts/braid-ideal/held-release-seed-path-rows.mjs`; it verifies `--acceptance-certificate-json`, `--external-authority-package-json`, and `--repo-authorization-json` without minting accepted evidence. The missing producer remains a non-circular `held_release_seed_path_rows_acceptance_certificate.v0` issuer.

Adjacent outputs directly help, but do not replace the diagnostic row:

- the held-release seed-path requirement emits the exact expected certificate, external authority package, and repo authorization payloads and still reports `requirement_passed=false` in the current tree because none are supplied as accepted objects;
- the SH-0-sea response run verifies the expected future `sh_0_sea_same_target_accepted_provenance_package.v0` payload shape for the FCC-carried diagnostic row and can move to an accepted same-target provenance replacement only after the seed-path authority chain is supplied;
- the central retained-history provider object `central_solver_retained_history_provider_object:7d4a8fe0a9792327` and provider/source carrier `central_solver_retained_history_provider_source_carrier:ba5a407d8e85bfc5` bind the same retained record, source row, seed-path artifact, and provider hash, but they remain candidate-only at their own acceptance-certificate boundaries;
- the retained-source adapter contract observes ten source fields and accepts zero package fields, with `held_release_seed_path_rows_acceptance_certificate_ref` as the first package field;
- the accepted Noether sea density-compression provider supplies reusable `theta_sea_rho_NS` and stress/strain rows for its own retained-window domain, but it is not bound to the `SH-0-sea` target/source record;
- EQ-20 pressure rows, pressure-row branch-intake fixtures, event/wake pullback diagnostics, torque-wake diagnostics, and chirality residual measurements are not same-target `SH-0-sea` replacement evidence;
- receiver-normal field carriers and tests demonstrate the current `branchWeight`, `sourceNormalDenominator`, `receiverNormalFactor`, `receiverNormalNumerator`, and `unsignedReceiverNormalFactor` contract, but no accepted same-record `SH-0-sea` row carries those fields.

The next executable proof target is to produce or acquire the non-circular `held_release_seed_path_rows_acceptance_certificate.v0` for `held_release_seed_path_rows:5833f18e53586201`, then the matching `held_release_seed_path_rows_external_accepted_authority_package.v0`, then `repo_authorization_for_accepted_held_release_seed_path_rows.v0` at `held_release_seed_path_rows.acceptance_certificate_ref`. Only after that target/source record is accepted should the `sh_0_sea_same_target_accepted_provenance_package.v0`, retained-source adapter package, and a real accepted same-target `boundary_wake` or `pressure_tension` source row be attempted.

---

## Addendum (2026-07-09, braid-ideal evaluator thread): Exact-Delay Refinement of the Named Spacing Candidate

The named candidate `sh0sea-aa-fcc-dipole-wake-sum:a-fcc-4.25` was selected above as the eligible crossing row nearest the retention-window midpoint — a convention, applied to an amplitude-only (phase-free) response computed for the two-speed source row. The 2026-07-09 dressed-budget program (fold-crossing-chart-spec, sections "Exact-Delay Correction..." and "The 4.25 Provenance Audit...", cite by title per the numbering notice) refined this with exact per-pair causal delays and the spindle support-candidate v1 braid: the phase-aware supply=deficit fixed point sits at R* ≈ 3.4 — INSIDE this packet's retention window [3, 5.35] but away from its midpoint — and no sea orientation-dynamics parameter moves the band (test-pinned). A Candidate Row 3 native release at a=4.25 was REJECTED with first blocker `sea_anti_confines_at_exact_causal_delays`. Recommendation standing before the operator: re-declare the named spacing candidate at R* ≈ 3.4 for v1-cadence homogeneous seas (re-derive per assembly family). This addendum records the refinement only; the named constant changes only on operator direction.
