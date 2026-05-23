# $A_0$ Delayed Source-Direction Branch Coordinate Checker

## Status

- Kind: `priority`
- Status: `priority-only`
- Claim level: delayed source-direction branch-coordinate no-go, not accepted history
- Date: May 22, 2026

## Checker Contract

The checker [a0-delayed-source-direction-branch-coordinate-checker.mjs](../../../scripts/mass-map/a0-delayed-source-direction-branch-coordinate-checker.mjs) tests a finite root-branch coordinate that changes the source object after the reciprocal projection and root-loop no-gos. It does not read `branch_chart_source_records.root_transport_source_record`, does not use fitted coefficients as features, and does not use residual forcing as a feature.

The source fields are only:

```text
active_causal_root_ledger.receiver
active_causal_root_ledger.source
active_causal_root_ledger.relation
active_causal_root_ledger.status
active_causal_root_ledger.t
active_causal_root_ledger.delay
active_causal_root_ledger.J
corrected carrier state samples for source and receiver positions
corrected carrier state samples for e_I,r/e_I,theta/e_I,n
```

For each active inter-layer root

$$
I_p \leftarrow X_q,\qquad X\in\{M,O\},
$$

the checker evaluates the receiver at root time $t_r$ and the source at delayed time $t_r-\tau_r$ using declared linear corrected-state interpolation. It then forms the delayed line-of-action

$$
\widehat{\mathbf u}_r
=
\frac{
\mathbf s_{X_q}(t_r-\tau_r)-\mathbf s_{I_p}(t_r)
}{
\left\|\mathbf s_{X_q}(t_r-\tau_r)-\mathbf s_{I_p}(t_r)\right\|
}.
$$

Because the target residual is the `I` relative forcing, the checker orients the direction by receiver polarity,

$$
\sigma(I_+)=+1,\qquad \sigma(I_-)=-1,
\qquad
\widehat{\mathbf u}^{\,\mathrm{rel}}_r=\sigma(I_p)\widehat{\mathbf u}_r.
$$

The direction is resolved in the corrected `I` carrier frame

$$
\widehat{\mathbf u}^{\,\mathrm{rel}}_r
=
u_{r,r}\widehat{\mathbf e}_{I,r}
+u_{r,\theta}\widehat{\mathbf e}_{I,\theta}
+u_{r,n}\widehat{\mathbf e}_{I,n}.
$$

The tested finite coordinates average the resulting vectors by source layer and, in the pair variants, by same/opposite receiver-source polarity group. The weighted families also include $\tau_r\widehat{\mathbf u}^{\,\mathrm{rel}}_r$ and $\log|J_r|\widehat{\mathbf u}^{\,\mathrm{rel}}_r$.

The target remains:

```text
refined_i_receiver_phase_bin_residual_balance.sampled_forcing.samples[].layers.I.residual_forcing
```

The artifact remains:

```text
artifact_schema = a0-delayed-source-direction-branch-coordinate-checker/v1
accepted_history_boundary = false
rerun_authority = diagnostic_only_not_corrected_rerun_authority
```

## May 22, 2026 Execution

The production check used the current corrected root-transport identity artifact:

```text
node scripts/mass-map/a0-delayed-source-direction-branch-coordinate-checker.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --family all --pretty --out /tmp/a0-delayed-source-direction-branch-coordinate-checker.json
```

All checked families fail. Ten families pass the rank/leverage guard and then fail held-out residual; the two largest pair-weighted families also fail the leverage guard. The source-time range consumed by the checker is `[-0.5086658085024354, 3.5685372027970654]`, inside the corrected sample window.

| Family | Coefficients | Full relative residual | Max held-out relative residual | DF guard | Max leverage | Feature rank | Min roots per feature |
| --- | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| `im_delayed_direction` | `1` | `0.9982759248015499` | `1.0408163198841647` | `passed` | `0.06306058279127923` | `1` | `4` |
| `io_delayed_direction` | `1` | `0.9973754224215403` | `1.0638831942189604` | `passed` | `0.0569992478782825` | `1` | `4` |
| `imo_delayed_direction` | `2` | `0.9947500394428789` | `1.8341087796856788` | `passed` | `0.35528181111812057` | `2` | `4` |
| `im_delayed_direction_weighted` | `3` | `0.9970161821575864` | `1.0518157653019153` | `passed` | `0.2886099436023774` | `3` | `4` |
| `io_delayed_direction_weighted` | `3` | `0.9906550419103222` | `1.0684366219130321` | `passed` | `0.4472683603166546` | `3` | `4` |
| `imo_delayed_direction_weighted` | `6` | `0.982757517541794` | `3.0064905691822825` | `passed` | `0.46974919370363055` | `6` | `4` |
| `im_delayed_direction_pair` | `2` | `0.9961594713620169` | `1.0500065264351002` | `passed` | `0.07541756533954524` | `2` | `2` |
| `io_delayed_direction_pair` | `2` | `0.9913174791658006` | `1.0728604084140145` | `passed` | `0.15667629637798258` | `2` | `2` |
| `imo_delayed_direction_pair` | `4` | `0.9903423598185054` | `2.535489499808345` | `passed` | `0.452014483676576` | `4` | `2` |
| `im_delayed_direction_pair_weighted` | `6` | `0.9511493050703635` | `1.337192126857076` | `passed` | `0.38278004447995584` | `6` | `2` |
| `io_delayed_direction_pair_weighted` | `6` | `0.9789595055198019` | `1.1793125658008548` | `failed` | `0.5638519832953808` | `6` | `2` |
| `imo_delayed_direction_pair_weighted` | `12` | `0.9286312071715362` | `7.247603480761195` | `failed` | `0.6132787735948715` | `12` | `2` |

The best held-out row is `im_delayed_direction`, with maximum held-out relative residual `1.0408163198841647`, about `52.0` times the `0.02` tolerance.

## Interpretation

This packet rules out the immediate finite coordinate built from root-specific delayed line-of-action vectors in the corrected `I` carrier frame. The no-go is distinct from the reciprocal carrier-frame projection and root-loop no-gos: it uses source and receiver positions at $t_r$ and $t_r-\tau_r$ rather than reciprocal transport scalars or two-edge delay/J holonomies.

The first raw implementation averaged unsigned `I+` and `I-` source directions and collapsed to rank zero by binary symmetry. The retained checker uses the receiver-polarity sign because the target is an `I` relative residual. Even after that correction, the coordinate does not transfer across held-out buckets.

## Boundary

This packet is priority-only. It does not create a new acceptance gate and does not permit a corrected one-period rerun. The next branch-chart move should avoid:

- another projection of the same reciprocal source scalars;
- another linear span over the emitted `root_transport_source_record`;
- the two-edge active-root loop scalars;
- the root-specific delayed source-direction vector families defined here.

The remaining high-value path is now narrower: either increase the root-ledger sample count enough to test a genuine finite delay-sector coordinate, or change the branch object to a separator/fold-event coordinate that is declared in $z_\Lambda^\star$ before fitting and survives held-out residual.

Promotion decision: priority-only. Do not promote this packet into `content/markdown/aaa` until a source-declared branch coordinate passes held-out residual, root-transport certification, raw-row root-ledger stability, and one-period closure.
