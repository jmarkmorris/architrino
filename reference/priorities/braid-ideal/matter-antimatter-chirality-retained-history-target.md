# Matter/Antimatter Chirality Retained-History Target

Status. Priority-only retained-history simulation target under [Braid Ideal](braid-ideal.md). This is not a matter/antimatter discovery claim, not a particle-sector promotion, and not a retained branch certificate.

Claim level. Executable closure target. The target tests whether the matter/antimatter chirality bridge can be represented as pro/anti ordered-braid orientation reversal on a retained branch family. It must not be reduced to a static six-site support table, a Positrino/Electrino relabel, or a polarity-inventory shortcut.

## Source Signal

The held-release spherical toy found a sharp support asymmetry:

- `face-opposite` preserves center-zero, common-sphere, common-speed, and antipodal-pair residuals to roundoff scale in the tested Euclidean-void toy rows.
- `axial-paired` uses the same six axial sites and the same $3\epsilon_+ + 3\epsilon_-$ inventory, but loses the common-sphere and antipodal-pair support window at ordinary scale.
- The fermion mapping assigns matter/antimatter status to pro/anti Noether braid orientation carried by the whole retained branch record. Positrino/Electrino polarity remains charge and interaction bookkeeping, not the matter/antimatter label.

Therefore the next target is not "which color sits on which octahedral site." The next target is whether an ordered-braid orientation reversal survives as one conjugate retained-history record across planar, oblate, and spherical projections.

## Paired Branch Rows

The simulation target is a paired row:

$$
\Theta_+
=
\left(\mathcal S_+,\chi_c=+1,\mathcal H_+\right),
\qquad
\Theta_-
=
\left(\mathcal S_-,\chi_c=-1,\mathcal H_-\right),
$$

where $\chi_c$ is the pro/anti ordered-braid chirality record and $\mathcal H$ is the retained history record. The conjugation map

$$
\mathfrak C_\chi:\Theta_+\longrightarrow\Theta_-
$$

must be solved as a branch-record operation. It may report the same spherical support class, a polarity-inverted charged-sector support ledger, `axial-paired`, or another projection, but the reported support section is an output diagnostic. It is not accepted as matter/antimatter evidence by itself.

## Required State Variables

Each paired run must retain these variables on the same branch record:

- Planar phase or ordered-orbit variable $\theta_{\mathrm{orb}}(t)$, with orientation reversal tested by $\theta_{\mathrm{orb}}\mapsto-\theta_{\mathrm{orb}}$ and $\dot\theta_{\mathrm{orb}}\mapsto-\dot\theta_{\mathrm{orb}}$.
- Internal angular-momentum component $\mathbf L_{\mathrm{int}}$ or its declared branch-frame component, with signed reversal and magnitude preservation reported separately.
- Oblate support variables: center $\mathbf C(t)$, body frame $B(t)$, radii $R_\perp(t)$ and $R_\parallel(t)$, branch phase $\psi(t)$, and the relevant body-rotation component $\Omega_\chi(t)$.
- Spherical projection variables: support class $C_{\mathrm{oct}}\in\{\texttt{face-opposite},\texttt{axial-paired},\texttt{other}\}$, center residual, common-radius residual, common-speed residual, and antipodal-pair residual.
- Causal-root ledger rows, including same-source self-hit rows when the self-hit target is enabled.
- Wake-history rows, path-history provenance, action/energy ledger rows, momentum rows, angular-momentum rows, return or stability margin rows, and any Noether sea response rows used by the run.
- Charged-sector polarity ledger rows only when the projection exposes an electric-charge row. These rows may conjugate charge, but they do not relabel matter into antimatter by themselves.

## Residual Vector

The retained-history chirality residual is reported as

$$
\mathcal R_\chi
=
\left(
R_{\mathrm{phase}},
R_{\mathrm{root}},
R_{\mathrm{self}},
R_{\mathrm{wake}},
R_{\mathrm{action}},
R_{\mathrm{J}},
R_{\mathrm{support}},
R_{\mathrm{return}},
R_{\mathrm{charge}}
\right).
$$

The residual components have the following meaning:

- $R_{\mathrm{phase}}$: verifies ordered-orbit reversal, for example $\dot\psi_-+\dot\psi_+$ or $\Omega_{\chi,-}+\Omega_{\chi,+}$ in the declared branch frame.
- $R_{\mathrm{root}}$: verifies that causal-root ledgers are conjugate without asymmetric pruning, missing root windows, or changed branch provenance.
- $R_{\mathrm{self}}$: verifies same-source self-hit row parity or records the first missing self-hit row.
- $R_{\mathrm{wake}}$: verifies retained wake-history conjugacy under the same history window.
- $R_{\mathrm{action}}$: verifies action/energy equality or declared charge-conjugate mass-facing equality, without using polarity inventory as a substitute for branch identity.
- $R_{\mathrm{J}}$: verifies signed internal angular-momentum reversal while preserving the relevant magnitude row.
- $R_{\mathrm{support}}$: reports the observed planar, oblate, and spherical support sections and their residuals.
- $R_{\mathrm{return}}$: reports whether both branches share the same return, boundedness, breather, or failure status.
- $R_{\mathrm{charge}}$: verifies sector-visible charged projection conjugacy only when a charged-sector ledger is present.

## Acceptance Conditions

The chirality bridge survives this target only if all of these conditions hold:

1. Both rows are central-solver retained-history rows, not partner-wake toy rows or static support diagrams.
2. The paired rows share one declared branch family and one conjugation map $\mathfrak C_\chi$.
3. Ordered-braid chirality is tied to phase/order reversal, signed angular-momentum reversal, and retained path-history provenance.
4. Causal-root, same-source self-hit, wake-history, action/energy, momentum, angular-momentum, and stability or return rows are present for both branches.
5. The support projection is reported after the retained run. A `face-opposite`, `axial-paired`, or polarity-inverted support display is not accepted as the deciding evidence before retained-history rows exist.
6. If `axial-paired` appears, the solver classifies it as a stable anti-branch support section, a transient projection, or a failed/lost-support projection using the same-record residual vector.
7. If a charged-sector projection is exposed, the polarity ledger maps to the conjugate charge row while preserving the identity-bearing branch history.

## Failure Modes

The target fails closed under any of these outcomes:

- The result is only a static support table or six-site color reassignment.
- Positrino/Electrino polarity is used as the matter/antimatter operation.
- The `face-opposite` support channel does not survive the retained-root, wake, action, and stability rows.
- `axial-paired` loses same-record support, return, or stability before it can be classified as an anti-branch support section.
- The paired causal-root or wake-history ledgers differ by asymmetric pruning or missing windows.
- The chirality record cannot be tied to the same branch identity as the support geometry.
- Charge-conjugate mass-facing or charged-sector rows fail when the projection requires them.

## Output Packet

The first producer artifact is [matter-antimatter-chirality-retained-history-target.mjs](../../../scripts/braid-ideal/matter-antimatter-chirality-retained-history-target.mjs), checked by [braid-ideal-matter-antimatter-chirality-retained-history-target.test.js](../../../tests/braid-ideal-matter-antimatter-chirality-retained-history-target.test.js). It emits the schema packet `braid_ideal_chirality_retained_history_target.v0`. This packet is a fail-closed central-solver retained-history row schema, not accepted chirality evidence.

Provider-backed population status. The producer now supports a candidate provider-backed mode:

```bash
node scripts/braid-ideal/matter-antimatter-chirality-retained-history-target.mjs --provider-backed --pretty
```

That mode fills the paired `matter_row` and `antimatter_row` slots with a shared candidate `central_solver_retained_history_row` reference and retained record id. It now also binds the held-release seed path rows, path-history stream manifest rows, durable stream manifest refs, central retained-history row, provider object, and chirality residual status rows to one candidate provider object ref. It advances the target beyond empty row placeholders and beyond the earlier missing-provider-provenance blocker. It still does not authorize a matter/antimatter claim, because the provider object remains blocked at its acceptance certificate and the chirality residuals remain unmeasured. The current first blocker is `accepted_chirality_residual_measurements`, with first missing field `braid_ideal_chirality_retained_history_target.residual_vector.R_phase.accepted_measurement_ref`.

Accepted measurement-row status. The producer also supports an accepted measurement-row mode:

```bash
node scripts/braid-ideal/matter-antimatter-chirality-retained-history-target.mjs --accepted-measurements --pretty
```

That mode replaces the provider-backed residual status rows with accepted same-record chirality residual measurement rows using schema `braid_ideal_chirality_residual_measurement_row.v0`. The current packet emits nine accepted residual measurement rows, one for each component of $\mathcal R_\chi$, two accepted same-record phase/order measurement rows using schema `braid_ideal_chirality_phase_order_measurement_row.v0`, thirty accepted same-record partner causal-root residual rows using schema `braid_ideal_chirality_partner_causal_root_residual_row.v0`, six accepted same-source self-hit residual rows using schema `braid_ideal_chirality_same_source_self_hit_residual_row.v0`, and six accepted retained wake-history residual rows using schema `braid_ideal_chirality_retained_wake_history_residual_row.v0`. These are accepted measurements of the current provider-backed source state, not accepted chirality evidence. `R_phase` passes only because the paired phase/order rows bind to the same retained record, central retained-history row, provider object, and paired row roles while measuring opposite signs for $\theta_{\mathrm{orb}}$, $\psi$, and $\Omega_\chi$. `R_root` passes only because the thirty directed partner causal-root residual rows cover every current partner replay requirement with zero missing, extra, duplicate, same-record-binding, or asymmetric directed-pair residuals. `R_self` passes only because the six self-hit rows cover every current strict delayed same-source requirement with zero missing, extra, duplicate, same-record-binding, receiver/source mismatch, or strict-delay relation residuals. `R_wake` now passes only because the six retained wake-history rows cover the current central retained-history row's `retained_wake_history_rows` hook and seed rows with zero missing-hook, missing-seed-row, duplicate, same-record-binding, or ledger-mismatch residuals. The first measured residual now fails at `R_action`, with first blocker `braid_ideal_chirality_retained_history_target.residual_vector.R_action.value.measurement_passed`, because same-record action/energy residual rows are still absent. The remaining failing rows record the absent angular-momentum, support-projection, and stability or return rows; `R_charge` passes only because no charged-sector projection is exposed.

The first acceptable evidence producer must populate that schema with:

- `matter_row`: retained-history row with $\chi_c=+1$.
- `antimatter_row`: retained-history row with $\chi_c=-1$.
- `conjugation_map`: declared $\mathfrak C_\chi$ operation and branch identifiers.
- `residuals`: the full $\mathcal R_\chi$ vector.
- `support_projection`: planar, oblate, and spherical support classifications after solving.
- `first_blocker`: first missing retained-history row, first residual violation, or `none` if all acceptance conditions pass.

## Relation To Braid-Ideal Work

This target consumes [brainstorming.md](brainstorming.md#matterantimatter-chirality-bridge---2026-07-01) and should run only after the retained row work has enough machinery to supply same-record causal-root, self-hit, wake-history, action, angular-momentum, and stability rows. It depends most directly on `self_hit_held_release_solver_row`, `common_level_branch_definition`, and `oblate_spheroid_reduced_equations`.

The target can promote to corpus prose only after it yields retained branch evidence. Until then, the safe statement is that `face-opposite` is the first admissible static support candidate, while `axial-paired` remains open only as a braid-level orbit-reversal candidate and is excluded as a simple support-table polarity mirror.
