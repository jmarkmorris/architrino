# SH-0-Sea Diagnostic Candidate Model

Status: diagnostic/candidate model packet, 2026-07-04. Updated with the computed dipole wake-sum run and removal of the fitted response amplitude, 2026-07-07.

Proof ID: `SH-0-sea`.

Claim level: model construction only. This packet does not claim accepted retained evidence, retained-branch closure, force/action closure, Noether sea response closure, stability, branch-chart output, moving certificate, observer export, score movement, or corpus promotion.

Executable diagnostic artifact: [sh-0-sea-diagnostic-candidate-model.mjs](../../../scripts/braid-ideal/sh-0-sea-diagnostic-candidate-model.mjs), with focused tests in [braid-ideal-sh-0-sea-diagnostic-candidate-model.test.js](../../../tests/braid-ideal-sh-0-sea-diagnostic-candidate-model.test.js).

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

Because the held histories are static, this run tests amplitude-only retention: the computed environment response is a monotone spacing threshold. It supports the environment-theorem hypothesis (H1) with a computed inward projection that reverses the post-turn escape floor at sub-$5.35$ spacings, and it partially tests the delayed-echo hypothesis (H5): the delayed sum is computed through real causal delays, but the predicted density- and phase-dependent structure requires moving neighbor histories, which this run does not declare.

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

The computed sum crosses the floor for $a_{\mathrm{FCC}}\le5.3469$ with zero free amplitude, naming `sh0sea-aa-fcc-dipole-wake-sum:a-fcc-4.25` as the sea-spacing candidate, but it remains diagnostic. The next executable proof targets are, in order: run the delayed-echo variant with declared moving neighbor histories to test the phase-dependence prediction (H5); consume the named spacing candidate in the downstream same-record chain; and replace the computed diagnostic source row with an accepted same-target source row carrying accepted geometry, event, support, and action provenance while preserving the accepted-evidence blocker.

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
