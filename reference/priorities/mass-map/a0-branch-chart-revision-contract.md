# $A_0$ Branch-Chart Revision Contract

## Packet Metadata

- Workstream: [Noether-Core Stability and First Mass Map](mass-map.md)
- Source packet: [$A_0$ Reduced Branch Certificate Packet](a0-reduced-branch-certificate.md)
- Claim level: priority-side branch-chart contract
- Promotion decision: priority-only until an accepted corrected branch row exists
- Current verdict: no further corrected one-period rerun is admissible until a revised branch coordinate is declared before fitting.

## Source Verdict

The compact $A_0$ fixture has failed the scalar, quotient-class, raw-root-key, and first two-bin `I` observation-phase residual-balance tests. The source artifact is

```text
/tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-v4.json
```

The residual-balance ladder is:

| Ledger | Basis groups | Relative residual | Verdict |
| --- | ---: | ---: | --- |
| scalar relation weights | `3` | `0.9925655644010825` | no-go |
| quotient-equivalent refined basis | `30` | `0.4262791208762879` | no-go |
| raw-root-key refined basis | `60` | `0.4262791397038621` | no-go |
| raw-root-key plus two-bin `I` observation phase | `80` | `0.3500173344435869` | no-go |

The residual remains concentrated in the inner receiver layer. Root-key resolution leaves approximate layer residuals `I: 0.4305`, `M: 0.0802`, and `O: 0.00338`; the two-bin `I` observation-phase split improves only the `I` residual, to about `0.3534`.

## No-Go Baseline To Preserve

The next branch-chart revision must preserve this no-go baseline:

$$
\frac{\left\|\mathbf{a}_{\mathrm{carrier}}-\sum_{\rho,\ell,\sigma,\mu,\nu}\beta_{\rho,\ell,\sigma,\mu,\nu}B_{\rho,\ell,\sigma,\mu,\nu}\right\|_2}
{\|\mathbf{a}_{\mathrm{carrier}}\|_2}
\approx0.3500173344
>0.02.
$$

A future packet may improve this number only by declaring a branch coordinate before fitting. Merely adding columns to the residual-balance basis is not a branch-chart revision.

## Contract Scope

This packet controls the next admissible move after the compact finite-coordinate no-go. It does not authorize another corrected one-period rerun by itself. Its job is to define which new coordinate can enter

$$
z_\Lambda^\star
$$

and which evidence must be present before the runner is allowed to consume that coordinate.

## Admissible Revision Types

There are two admissible revision families.

### Type A: Finer finite root-branch coordinate $\mu^\star$

A Type A revision replaces the current raw root key

```text
receiver|source|relation|status
```

with a strictly finer finite coordinate $\mu^\star$. It is admissible only if $\mu^\star$ is extracted from branch geometry, causal-root data, or corrected carrier state before residual fitting. It is not admissible if it is only a residual-sign bin, a duplicate phase bin, or a relabeling of the existing raw key.

Required declaration:

$$
\mu^\star
=
\mu^\star(r;t,z_\Lambda,\Gamma_\Lambda)
$$

with its source fields, equivalence relation, and quotient behavior stated before the fit.

### Type B: Non-root-key branch-chart mode in $z_\Lambda^\star$

A Type B revision extends $z_\Lambda$ by a branch-coordinate mode that is not a root-key split. The current residual signal supports this family more strongly than Type A.

The recommended first Type B candidate is an inner-layer harmonic deformation coordinate:

$$
z_\Lambda^\star
=
\left(z_\Lambda,\mathcal{H}_I\right),
$$

with primary modes

$$
\mathcal{K}_I
=
\{4,5,7\},
$$

and guard mode

$$
\mathcal{G}_I
=
\{6\}.
$$

Equivalently, the audited candidate set is

$$
\mathcal{M}_I^{\mathrm{cand}}
=
\mathcal{K}_I\cup\mathcal{G}_I
=
\{4,5,6,7\}.
$$

This choice comes from the v4 residual spectrum. In the root-key-resolved ledger, the largest `I` residual Fourier components are approximately

$$
m=5:0.1898,\quad
m=4:0.1300,\quad
m=7:0.0593,\quad
m=3:0.0441,\quad
m=6:0.0340.
$$

After the two-bin `I` split, the largest non-Nyquist `I` components remain spread across

$$
m=6:0.1034,\quad
m=7:0.1018,\quad
m=4:0.0988,\quad
m=5:0.0736.
$$

The `16`-bucket artifact also shows a visible Nyquist component `m=8`. That component is not admissible as a branch coordinate until a higher sample-count residual surface confirms it.

The candidate coordinate is

$$
\mathcal{H}_I
=
\left\{
a_{I,m}^{r},b_{I,m}^{r},
a_{I,m}^{\theta},b_{I,m}^{\theta}
\right\}_{m\in\mathcal{K}_I},
$$

defined by the inner radial and tangential carrier-frame expansion

$$
\mathbf{r}_I^\star(t)
=
\mathbf{r}_I^0(t)
+
\sum_{m\in\mathcal{K}_I}
\left[
a_{I,m}^{r}\cos\left(\frac{2\pi mt}{T_{\mathbf{k}}}\right)
+b_{I,m}^{r}\sin\left(\frac{2\pi mt}{T_{\mathbf{k}}}\right)
\right]\mathbf{e}_{I,r}(t)
+
\sum_{m\in\mathcal{K}_I}
\left[
a_{I,m}^{\theta}\cos\left(\frac{2\pi mt}{T_{\mathbf{k}}}\right)
+b_{I,m}^{\theta}\sin\left(\frac{2\pi mt}{T_{\mathbf{k}}}\right)
\right]\mathbf{e}_{I,\theta}(t).
$$

This is a branch-chart coordinate only if it is declared in $z_\Lambda^\star$ before fitting. It may not be added afterward as a residual-canceling waveform.

Mode `6` is retained as an audit guard. A pre-rerun checker may promote it from $\mathcal{G}_I$ into $\mathcal{K}_I$ only if it survives the held-out residual and phase-origin tests. This prevents the contract from treating every strong in-sample harmonic as a branch coordinate.

## Equality-Constraint Contract

Any revision must preserve:

1. locked fold-layer keys in $\mathcal{R}_{\text{lock}}$, not promoted as active self branches;
2. benchmark exclusion, including particle masses, charged-lepton ratios, electron radius, measured $\alpha$, and CKM-derived inputs;
3. quotient-row identity, now comparing $z_\Lambda^\star$ rather than the compact $z_\Lambda$;
4. root-key diagnostics for `receiver|source|relation|status`, even when the accepted revision is Type B;
5. phase-origin discipline, so $\mathcal{H}_I$ transforms coherently under the common $S^1_{\mathbf{k}}$ phase gauge rather than selecting a hidden absolute time origin.

## Residual And Invariant Contract

Before a corrected rerun, the revision packet must emit a machine-readable pre-rerun ledger with the anti-overfit residual

$$
\mathcal{R}_{\mathrm{rev}}(\mu^\star,z_\Lambda^\star)
=
\left(
R_{\mathrm{src}},
D_{\mathrm{new}},
R_{\mathrm{sym}},
R_{\mathrm{eq}},
R_{\mathrm{lock}},
R_{\mathrm{transport}},
R_{\mathrm{df}},
R_{\mathrm{xval}},
R_{\mathrm{1p}},
R_{\mathrm{bench}}
\right).
$$

The entries are:

- $R_{\mathrm{src}}=0$ only when $\mu^\star$ or $z_\Lambda^\star$ is computed from pre-fit branch-chart data: active roots, root times, Jacobian floors, inactive gaps, memory depth, phase / transport rows, and retained history. It fails if the coordinate uses $\mathbf{a}_{\mathrm{carrier}}$, residual forcing, fitted $\beta^\star$, post-fit residual localization, or particle benchmarks.
- $D_{\mathrm{new}}$ rejects any coordinate that factors through the already-tested `receiver|source|relation|status` key plus the two-bin `I` observation-phase split.
- $R_{\mathrm{sym}}=0$ only when the new coordinate is invariant or covariant under surviving branch symmetries and the phase-origin gauge.
- $R_{\mathrm{eq}}=0$ only when the declared equality map preserves each surviving shared class or names the geometric invariant that breaks it.
- $R_{\mathrm{lock}}=0$ only when locked fold-layer keys remain excluded from active fit columns.
- $R_{\mathrm{transport}}=0$ only when the induced partition persists under root-ledger refinement, memory-depth extension, controlled $\eta$ refinement, and root transport, except at declared separator or fold events.
- $R_{\mathrm{df}}=0$ only when the design matrix avoids exact-interpolation behavior: $\operatorname{tr}H/N_{\mathrm{eq}}\le1/2$, $\max_iH_{ii}\le1/2$, and each retained basis group has at least two independent observation buckets.
- $R_{\mathrm{xval}}\le0.02$ only when a predeclared fit/holdout split of the `16` observation buckets passes in both directions. A split that passes only on the same buckets used to solve the normal equation is hidden fitting.
- $R_{\mathrm{1p}}=0$ only after a later corrected one-period rerun passes state, root, phase, energy-like, drift, speed, lock, and correction residuals at their declared tolerances.
- $R_{\mathrm{bench}}=0$ only when observed particle masses, charged-lepton ratios, electron radius, measured $\alpha$, CKM-derived inputs, and residual targets remain excluded.

The pre-rerun ledger fields are:

| Field | Required content |
| --- | --- |
| `source_artifact` | v4 corrected artifact path |
| `revision_type` | `finer_root_branch_coordinate` or `non_root_key_z_lambda_mode` |
| `coordinate_source_fields` | state, root-ledger, or carrier fields used to define the coordinate |
| `equality_group_key` | declared grouping before fitting |
| `equation_count` | number of residual equations available |
| `coefficient_count` | number of new coefficients |
| `overdetermined` | whether equation count exceeds coefficient count |
| `held_out_residual_rule` | sample or phase-origin rows not used to define the coordinate |
| `anti_overfit_residual` | $\mathcal{R}_{\mathrm{rev}}(\mu^\star,z_\Lambda^\star)$ |
| `locked_fold_layer_keys_excluded` | must be true |
| `benchmark_inputs_excluded` | must be true |
| `accepted_history_boundary` | must be false |

## Acceptance Conditions

The contract accepts a revision only if:

1. the new coordinate is declared before fitting and is not reducible to `receiver|source|relation|status` plus the two-bin `I` observation-phase split;
2. the coordinate or $z_\Lambda^\star$ mode is extracted from branch geometry, causal-root data, or corrected carrier state, not from observed masses, measured $\alpha$, or residual-sign binning;
3. locked fold-layer keys remain excluded from the active fit basis;
4. benchmark exclusion, quotient-row identity, and accepted-history blocking remain explicit;
5. the next executable ledger reports equation count, coefficient count, equality key, source fields, the anti-overfit residual, and whether the fit is overdetermined;
6. a corrected rerun is allowed only if the declared basis emits `revision_candidate_only` with $R_{\mathrm{xval}}\le0.02$, not another no-go ledger;
7. accepted branch promotion still requires state return, root closure, phase closure, speed ordering, energy-like speed closure, center-drift closure, $\mathcal{R}_{\text{lock}}$, quotient-row identity, positive $\Delta_{\mathbf{k}}$, and $\eta$-ladder persistence.

## Falsification Conditions

The revision fails closed if:

1. $\mu^\star$ is a relabeling of the existing raw root key or coarse phase bin;
2. the proposed $z_\Lambda^\star$ mode is a gauge, symmetry, or retained correction mode rather than a branch-chart coordinate;
3. any benchmark mass, charged-lepton ratio, measured $\alpha$, or particle-facing target enters the fit;
4. locked fold-layer keys become fitted degrees of freedom;
5. the residual remains above `0.02`;
6. residual improvement comes only from added columns without a source-declared branch coordinate;
7. $\mathcal{R}_{\mathrm{rev}}$ reports `rejected_hidden_fit_split`, `df_guard_fail`, or `overfit_holdout_fail`;
8. a corrected rerun still fails the one-period residual gates.

## Overfitting Exclusions

The contract rejects revisions that only increase coefficient count. In particular:

- mode `8` on the `16`-bucket artifact is a Nyquist warning, not a coordinate;
- a phase-bin split must be stable under a phase-origin scan;
- a harmonic coordinate must be supported by branch-state or root-ledger geometry, not only by least-squares improvement;
- the pre-rerun ledger must keep at least one held-out residual or phase-origin check outside the coordinate-definition step;
- `rejected_already_covered_coordinate` applies when $\mu^\star$ factors through the failed raw root key and two-bin `I` phase coordinate;
- `df_guard_fail` applies when $\operatorname{tr}H/N_{\mathrm{eq}}>1/2$, $\max_iH_{ii}>1/2$, or any retained basis group has fewer than two independent observation buckets;
- `overfit_holdout_fail` applies when the full-bucket residual improves but the held-out residual exceeds `0.02`.

## Required Machine-Readable Ledger Fields

The pre-rerun checker should emit:

```text
branch_chart_revision.schema = "a0-branch-chart-revision-contract/v1"
branch_chart_revision.source_artifact = "/tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-v4.json"
branch_chart_revision.revision_type = "non_root_key_z_lambda_mode"
branch_chart_revision.mode = "i_layer_harmonic_deformation_coordinate"
branch_chart_revision.z_lambda_extension.primary_inner_harmonic_modes = [4, 5, 7]
branch_chart_revision.z_lambda_extension.guard_inner_harmonic_modes = [6]
branch_chart_revision.nyquist_guard.mode_8_requires_higher_sample_count = true
branch_chart_revision.anti_overfit_residual.required = true
branch_chart_revision.locked_fold_layer_keys_excluded = true
branch_chart_revision.benchmark_inputs_excluded = true
branch_chart_revision.accepted_history_boundary = false
```

## Next Coordinate Design Target

The next coordinate cannot be another source label for the same $\mathcal{H}_I$ harmonic fit. It must be computed from a branch-source packet that is independent of the residual surface. The smallest acceptable packet is a root-transport source record
$$
\mathcal{Q}_{\mathrm{root}}^\star
=
\left\{
\left(
k_r,
\vartheta_r,
D_\tau r,
D_J r,
G_r,
\mathsf{transport}_r
\right)
\right\}_{r\in\mathcal{L}_{\mathrm{active}}},
$$
where $k_r$ is the current root key `receiver|source|relation|status`,
$$
\vartheta_r(t)=2\pi\,\frac{t-\tau_r(t)}{T_{\mathbf{k}}}\pmod{2\pi},
$$
$D_\tau r=d\log \tau_r/d\phi$ is the dimensionless delay transport, $D_J r=d\log |J_r|/d\phi$ is the dimensionless Jacobian transport, $G_r$ is the nearest inactive or neighboring-root gap normalized by $\max(\Delta t,\eta/c_f,\varepsilon_0)$, and $\mathsf{transport}_r$ is the matched root identity under temporal, history-window, and regulator refinement. A candidate coordinate $\mu^\star$ may bin or quotient this record only after the bin thresholds, phase origin, equality map, and locked-key exclusions are declared.

The first finite candidate inside this target is an `I`-receiver inter-layer $J$ / delay shear coordinate. For each active root key $r$ and cyclic observation phase
$$
\phi_i=2\pi\,\frac{t_i}{T_{\mathbf{k}}},
$$
define
$$
g_J(r,\phi_i)
=
\frac{\log |J_r(\phi_{i+1})|-\log |J_r(\phi_{i-1})|}
{\phi_{i+1}-\phi_{i-1}},
\qquad
g_\tau(r,\phi_i)
=
\frac{\log \tau_r(\phi_{i+1})-\log \tau_r(\phi_{i-1})}
{\phi_{i+1}-\phi_{i-1}}.
$$
The finite coordinate candidate is
$$
\mu^\star(r,\phi_i)
=
\left(
r,\operatorname{sgn}_\epsilon g_J(r,\phi_i),
\operatorname{sgn}_\epsilon g_\tau(r,\phi_i)
\right),
$$
first restricted to `receiver_layer:I` and `relation:inter_layer`, with locked self roots excluded. In the current artifact, the `I`-receiver inter-layer roots have visible source-side shear: the `M`-source keys reach maximum $|d\log J/d\phi|$ about `0.1089` and maximum $|d\log \tau/d\phi|$ about `0.0986`; the `O`-source keys reach about `0.0439` and `0.0554`.

The May 22, 2026 regenerated corrected artifact now instantiates the source-record part of this design target. It emits `branch_chart_source_records.root_transport_source_record` with `512` root rows, `16` observation buckets, finite $\vartheta_r$, finite $D_\tau r$, finite $D_J r$, finite neighboring-root gap entries $G_r$, and `128` retained `I`-receiver inter-layer transport slots for the first shear fit. The source record remains a single-artifact packet: `transport_id` is scoped as a non-semantic local slot, `transport_identity_refinement_stable=false`, and `phase_origin_covariance_certified=false`. Therefore it can be checked as a predeclared coordinate source, but it does not by itself authorize another corrected rerun.

## Executable Checker Status

The contract now has a fail-closed executable checker:

```text
node scripts/mass-map/a0-tier1-branch-chart-revision-checker.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-v4.json --pretty
```

The default source declaration is `residual_surface_audit`, so the current artifact rejects before rerun authorization:

| Source declaration / quotient | Row status | Deciding residual | Value |
| --- | --- | --- | ---: |
| `residual_surface_audit` | `rejected_hidden_fit_split` | $R_{\mathrm{src}}$ | not pre-fit |
| `prefit_branch_chart` | `overfit_holdout_fail` | $R_{\mathrm{xval}}$ | `2.4537879974811028 > 0.02` |
| `active_roots` | `overfit_holdout_fail` | $R_{\mathrm{xval}}$ | `2.4537879974811028 > 0.02` |
| `root_times` | `overfit_holdout_fail` | $R_{\mathrm{xval}}$ | `2.4537879974811028 > 0.02` |
| `corrected_carrier_state` | `overfit_holdout_fail` | $R_{\mathrm{xval}}$ | `2.4537879974811028 > 0.02` |
| `root_transport_source_record` / `source_layer_shear` | `overfit_holdout_fail` | $R_{\mathrm{xval}}$ | `1.712369148202459 > 0.02` |
| `root_transport_source_record` / `source_layer_signed_polarity_shear` | `root-transport-quotient-not-source-declared` | $R_{\mathrm{src}}$ | diagnostic $R_{\mathrm{xval}}$ `1.6156063295193552 > 0.02` |
| `root_transport_source_record` / `m_jacobian_signed_polarity_shear` | `root-transport-quotient-not-source-declared` | $R_{\mathrm{src}}$ | diagnostic $R_{\mathrm{xval}}$ `1.944813346261963 > 0.02` |

The branch-state-facing source declarations pass the source, novelty, symmetry, equality, locked-key, degrees-of-freedom, benchmark, and Nyquist guards, but they still fail the held-out residual test. With primary modes $\{4,5,7\}$ the full-bucket diagnostic residual is about `0.6719928530663271`; adding guard mode `6` gives about `0.49474919046145294`. The source label therefore does not change the no-go: the current $\mathcal{H}_I$ harmonic proposal is a diagnostic fit only. It does not authorize a corrected one-period rerun, accepted history, or a physical branch-coordinate claim.

A low-degree harmonic scan over all one-, two-, and three-mode subsets of modes `1..7` also stays fail-closed. The best simple scan row is mode `6`, with $R_{\mathrm{xval}}\approx1.0938059103174171$, still far above `0.02`. The scan is diagnostic rather than admissible coordinate selection because it is post-artifact model search; its value is negative: it rules out another low-degree $\mathcal{H}_I$ harmonic tweak as the next safe branch-coordinate move.

The root-transport source record now passes $R_{\mathrm{src}}$, the coordinate-construction guard, and the degrees-of-freedom guard only for the source-declared default quotient. Its coordinate-specific design matrix uses the fixed source-layer entries `M:D_J`, `M:D_tau`, `O:D_J`, and `O:D_tau`, each assembled from $G_rD_J\cos\vartheta_r$ or $G_rD_\tau\sin\vartheta_r$ over the predeclared `I`-receiver inter-layer roots. The signed-polarity quotient uses `M:signed:D_J`, `M:signed:D_tau`, `O:signed:D_J`, and `O:signed:D_tau`, multiplying each contribution by `+1` when receiver/source polarities match and `-1` when they differ. It improves the diagnostic held-out residual from `1.712369148202459` to `1.6156063295193552`, but it was not declared by the source record and still fails by about `80.8` times the `0.02` tolerance. The mixed `m_jacobian_signed_polarity_shear` quotient adds only `M:signed:D_J` to the source-layer basis; it passes the strengthened degree/rank/leverage guard with five features, but worsens diagnostic holdout to `1.944813346261963`. The result is therefore a sharper executable no-go for the source-declared quotient and two failed diagnostic quotient probes, not a corrected-rerun authorization.

The checker now also records the root-transport certification blocker separately from the numerical holdout. Premetadata root-transport artifacts fail the source contract as `root-transport-source-record-missing-identity-metadata`; metadata-bearing artifacts that still use `transport_id = root_key|phase_bucket` fail as raw single-artifact identity leakage. The current identity-form record uses `single_artifact_root_transport:<n>` slots and carries `transport_identity_schema = a0-root-transport-identity/v1`, but $R_{\mathrm{transport}}$ remains pending as `root-transport-identity-not-refinement-stable`; phase-origin covariance is also metadata-only with `phase_origin_covariance_status = single-artifact-phase-origin-not-certified`. Thus even a future root-transport quotient that passed $R_{\mathrm{xval}}$ would still need an independent refinement and phase-origin covariance certificate before becoming rerun-admissible.

The first executable certificate for that blocker is now `scripts/mass-map/a0-root-transport-refinement-certificate.mjs`. It consumes two `a0-tier1-fold-layer-locked-one-period-attempt/v1` artifacts, extracts their `root_transport_source_record` rows, matches roots by `root_key` and cyclic order rather than by `transport_id`, and compares the declared quotient-feature bucket vectors after cyclic reindexing. A passing certificate requires a declared `--phase-shift-buckets` value; auto-detected shifts are diagnostic-only because they fit the alignment from the compared records. A passing certificate sets `transport_identity_refinement_stable=true` and `phase_origin_covariance_certified=true` only for the compared source records; it still emits `rerun_authority = certificate_only_not_corrected_rerun_authority`. Current production artifacts do not yet provide an independent paired refinement or phase-origin variant, so the certificate is executable infrastructure plus a blocker discriminator, not a passed branch certificate.

## Allowed Next Rerun

The next corrected one-period map is allowed only after the pre-rerun checker emits `revision_candidate_only`. The rerun must consume $z_\Lambda^\star$, not the compact $z_\Lambda$, and must keep accepted-history output blocked until all Tier 1 residual, quotient monodromy, and $\eta$-ladder gates pass.

## Promotion And Handoff

This packet is priority-only. It should not be promoted into `content/markdown/aaa` until a revised branch row passes one-period residual closure and supplies enough quotient identity, monodromy, and $\eta$-ladder evidence to state a reader-facing branch theorem target.
