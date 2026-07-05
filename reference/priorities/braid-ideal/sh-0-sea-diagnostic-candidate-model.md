# SH-0-Sea Diagnostic Candidate Model

Status: diagnostic/candidate model packet, 2026-07-04. Updated with diagnostic response-run result, 2026-07-05.

Proof ID: `SH-0-sea`.

Claim level: model construction only. This packet does not claim accepted retained evidence, retained-branch closure, force/action closure, Noether sea response closure, stability, branch-chart output, moving certificate, observer export, score movement, or corpus promotion.

Executable diagnostic artifact: [sh-0-sea-diagnostic-candidate-model.mjs](../../../scripts/braid-ideal/sh-0-sea-diagnostic-candidate-model.mjs), with focused tests in [braid-ideal-sh-0-sea-diagnostic-candidate-model.test.js](../../../tests/braid-ideal-sh-0-sea-diagnostic-candidate-model.test.js).

Accepted-evidence blocker preserved:

- object: `held_release_seed_path_rows_acceptance_certificate.v0`;
- field: `held_release_seed_path_rows.acceptance_certificate_ref`;
- candidate artifact: `held_release_seed_path_rows:5833f18e53586201`;
- next non-repo package after a matching certificate: `held_release_seed_path_rows_external_accepted_authority_package.v0`;
- later requirements: repo authorization, retained-source adapter package, and same-record receiver-normal root-detail rows carrying `branchWeight`, `sourceNormalDenominator`, and `receiverNormalFactor`.

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
| Local target-sea frame row | Target-center frame with target center `C(t)`, relative positions `y_a(t)=x_a(t)-C(t)`, and local sea velocity `u_sea(C,t)`. The first diagnostic rest condition is `\dot C(t)-u_sea(C,t)=0` after frame normalization. | Candidate only; the accepted density provider has `u_sea=(0,0,0)` for its own window, not for this target record. |
| Boundary-condition row | Local region `\Omega_C` around the target and boundary history `\mathcal H_{\partial\Omega}` carrying incoming sea wake/event data. No hard wall is allowed; the boundary must represent nearby Noether braid population response. | Candidate only. |
| Sea-response row | Candidate acceleration `\mathbf a_a^{\mathrm{sea}}=\mathcal A_a^{\mathrm{sea}}(B,\Theta_{\mathrm{sea}},\Theta_{\mathrm{asm}},\mathcal H_{\partial\Omega})`, projected onto the target reduced-radius direction. | Candidate only; not an accepted Noether sea response row. |
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

## Diagnostic Response Run Result

The executable response-run mode is:

```bash
node scripts/braid-ideal/sh-0-sea-diagnostic-candidate-model.mjs --response-run --pretty
```

This instantiates the first provider-seeded diagnostic response probe:

$$
K_{\mathrm{NS}}^{\mathrm{diag}}
=C1111_X\,\rho_{\text{NS}}\,n
=2.49,
\qquad
\Phi_{\mathrm{probe}}=e_{\mathrm{sea}}=0.008,
\qquad
\Gamma_{\mathrm{NS}}^{\mathrm{diag}}=0,
\qquad
W_{\partial\Omega}^{R}=0.
$$

The projected sea response is

$$
\Pi_R\mathcal A^{\mathrm{sea}}
=
-K_{\mathrm{NS}}^{\mathrm{diag}}\Phi_{\mathrm{probe}}
-\Gamma_{\mathrm{NS}}^{\mathrm{diag}}\dot\Phi_{\mathrm{probe}}
+W_{\partial\Omega}^{R}
=-0.019920000000000004.
$$

With the diagnostic deadband `\epsilon_R=10^{-9}`, the required inward projected-response floor is

$$
-0.0934863484737535-10^{-9}
=-0.0934863494737535.
$$

Therefore the provider-seeded response run does not cross the floor:

| Quantity | Value |
| --- | ---: |
| `Pi_R_A_sea` | `-0.019920000000000004` |
| Required projected-response floor | `-0.0934863494737535` |
| Total post-turn radial acceleration | `0.0735663484737535` |
| Crosses inward response floor | `false` |
| Post-turn return condition passed | `false` |
| Additional inward projection needed | `0.0735663494737535` |
| Required `Phi_probe` at current coefficients | `0.03754471866415803` |
| Required multiplier over current `Phi_probe` | `4.693089833019754` |

A non-authorizing parameter probe with `--response-amplitude=0.04` crosses the same diagnostic floor:

$$
\Pi_R\mathcal A^{\mathrm{sea}}=-0.09960000000000001,
\qquad
\ddot R_{\mathrm{toy}}+\Pi_R\mathcal A^{\mathrm{sea}}
=-0.006113651526246502.
$$

That crossing is only a parameter sensitivity result. It does not authorize a Noether sea response closure, stability claim, retained branch, score movement, or corpus promotion, because the accepted target/source certificate, external authority package, retained-source adapter package, same-record receiver-normal rows, same-record action closure, wake/event/support rows, and accepted `SH-0-sea` sea-response row are still absent.

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
| Local target-sea frame | Diagnostic/candidate |
| Boundary-condition row | Diagnostic/candidate |
| Candidate sea-response equation | Diagnostic/candidate |
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

The response run now instantiates this model with:

1. the central target row from `held_release_seed_path_rows:5833f18e53586201`;
2. a paired local population of like Noether braid assemblies around the target;
3. the accepted `theta_sea_rho_NS` provider rows as reusable local-state inputs, explicitly unbound to the target record;
4. a boundary row `\mathcal H_{\partial\Omega}` carrying candidate wake/event input from the surrounding population;
5. a response functional that reports `\Pi_R\mathcal A^{\mathrm{sea}}(t)` and checks whether it crosses the diagnostic inward floor.

The first provider-seeded result does not cross the floor. The next executable proof target is a same-record response producer, not another free parameter probe: bind a candidate boundary-wake or pressure/tension response row to the same target/source identity and rerun the floor test while preserving the accepted-evidence blocker.

Passing a later diagnostic would justify a sharper retained-source request. It would still not authorize retained evidence until the seed-path certificate, external authority package, repo authorization, retained-source adapter package, same-record receiver-normal rows, same-record action closure, wake/event/support rows, and accepted `SH-0-sea` sea-response row exist.
