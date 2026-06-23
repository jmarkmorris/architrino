# $A_0$ Root-Loop Branch Coordinate Checker

## Status

- Kind: `priority`
- Status: `priority-only`
- Claim level: root-loop branch-coordinate no-go, not accepted history
- Date: May 22, 2026

## Checker Contract

The checker [a0-root-loop-branch-coordinate-checker.mjs](../../../scripts/mass-map/a0-root-loop-branch-coordinate-checker.mjs) tests a finite root-branch coordinate that is not another linear quotient over the emitted `root_transport_source_record` and not another projection of the reciprocal `M<-I` source scalars.

The source fields are only the pre-fit active-root ledger and corrected carrier state:

```text
active_causal_root_ledger.receiver
active_causal_root_ledger.source
active_causal_root_ledger.relation
active_causal_root_ledger.t
active_causal_root_ledger.delay
active_causal_root_ledger.J
corrected carrier state samples for e_I,r/e_I,theta
```

For each layer $X\in\{M,O\}$ and polarity pair $(p,q)$, the checker pairs the two active roots

$$
I_p \leftarrow X_q,
\qquad
X_q \leftarrow I_p.
$$

It then forms the two-edge loop scalars

$$
\Delta\ell_{X,pq}
=
\log |J_{X_q\leftarrow I_p}|
-
\log |J_{I_p\leftarrow X_q}|,
\qquad
\Sigma\ell_{X,pq}
=
\log |J_{X_q\leftarrow I_p}|
+
\log |J_{I_p\leftarrow X_q}|,
$$

$$
\Delta\tau_{X,pq}
=
\tau_{X_q\leftarrow I_p}
-
\tau_{I_p\leftarrow X_q},
\qquad
\Sigma\tau_{X,pq}
=
\tau_{X_q\leftarrow I_p}
+
\tau_{I_p\leftarrow X_q},
$$

and the area-like loop scalar

$$
\Omega_{X,pq}
=
\Delta\ell_{X,pq}\Sigma\tau_{X,pq}
-
\Delta\tau_{X,pq}\Sigma\ell_{X,pq}.
$$

The tested coordinate is the polarity-pair average of these loop scalars, projected into the corrected `I` carrier frame:

$$
\mathbf S_I^{\mathrm{loop}}(t)
=
\sum_a c_a q_a^{\mathrm{loop}}(t)\widehat{\mathbf e}_{I,r}(t)
+
\sum_a d_a q_a^{\mathrm{loop}}(t)\widehat{\mathbf e}_{I,\theta}(t).
$$

The target remains:

```text
refined_i_receiver_phase_bin_residual_balance.sampled_forcing.samples[].layers.I.residual_forcing
```

Residual forcing is not used as a feature. The artifact remains:

```text
artifact_schema = a0-root-loop-branch-coordinate-checker/v1
accepted_history_boundary = false
rerun_authority = diagnostic_only_not_corrected_rerun_authority
```

## May 22, 2026 Execution

The production checks used the current corrected root-transport identity artifact:

```text
node scripts/mass-map/a0-root-loop-branch-coordinate-checker.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --family all --projection radial_tangential --pretty --out /tmp/a0-root-loop-branch-coordinate-checker.json
node scripts/mass-map/a0-root-loop-branch-coordinate-checker.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --family all --projection radial --pretty --out /tmp/a0-root-loop-branch-coordinate-checker-radial.json
node scripts/mass-map/a0-root-loop-branch-coordinate-checker.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --family all --projection tangential --pretty --out /tmp/a0-root-loop-branch-coordinate-checker-tangential.json
```

All checked families pass the source-field, rank, and leverage controls but fail held-out residual:

| Projection | Family | Coefficients | Full relative residual | Max held-out relative residual | Max leverage | Feature rank |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| `radial` | `im_loop_curl` | `3` | `0.9397653245749847` | `16.17549307401586` | `0.2909068951793522` | `3` |
| `radial` | `io_loop_curl` | `3` | `0.9585453818237828` | `4.18977160432265` | `0.4242942550118549` | `3` |
| `radial` | `imo_loop_curl` | `6` | `0.8360892015508575` | `79.57589732123552` | `0.46118604870128266` | `6` |
| `radial` | `im_loop_full` | `5` | `0.9054623849971825` | `3.9918539280779215` | `0.4323685540181059` | `5` |
| `tangential` | `im_loop_curl` | `3` | `0.9542743026202198` | `1.705996205813595` | `0.29041581661801075` | `3` |
| `tangential` | `io_loop_curl` | `3` | `0.9777545295397188` | `2.741450363978499` | `0.4075393903218192` | `3` |
| `tangential` | `imo_loop_curl` | `6` | `0.9512333536735914` | `2.865032549887983` | `0.44633983654411846` | `6` |
| `tangential` | `im_loop_full` | `5` | `0.9524626099736928` | `1.727604148347121` | `0.4304798012680906` | `5` |
| `radial_tangential` | `im_loop_curl` | `6` | `0.8909535958257497` | `16.184166693026267` | `0.30705433902361784` | `6` |
| `radial_tangential` | `io_loop_curl` | `6` | `0.9353144760192368` | `4.906091743388655` | `0.4312982991601348` | `6` |
| `radial_tangential` | `imo_loop_curl` | `12` | `0.7771036263530462` | `79.62117712015772` | `0.49022224152689214` | `12` |
| `radial_tangential` | `im_loop_full` | `10` | `0.8526706011366199` | `3.9780786907590966` | `0.4728029089742091` | `10` |

The best held-out row is `tangential/im_loop_curl`, with maximum held-out relative residual `1.705996205813595`, about `85.3` times the `0.02` tolerance.

## Interpretation

This packet rules out the immediate finite root-loop coordinate suggested by the prior no-gos. The active-root ledger does contain reciprocal two-edge loops by construction, and the loop scalars are branch-geometric source fields rather than residual features. However, their fit does not transfer across held-out buckets.

The no-go is stronger than the previous reciprocal projection no-go in one respect: it tests the closed-loop mismatch between `I<-X` and `X<-I`, rather than using only one directed reciprocal source. The failure says that the missing coordinate is not simply the two-edge delay/J holonomy of the current active-root ledger.

## Boundary

This packet is priority-only. It does not create a new acceptance gate and does not permit a corrected one-period rerun. The next branch-chart move should avoid:

- another projection of the same reciprocal source scalars;
- another linear span over the emitted `root_transport_source_record`;
- the two-edge active-root loop scalars defined here.

The remaining high-value path is a branch coordinate that changes the source object itself: a higher sample-count root-ledger refinement, a memory-depth extension, a separator/fold-event coordinate, or a corrected-carrier state coordinate that is declared in $z_\Lambda^\star$ before fitting and survives held-out residual.

Promotion decision: priority-only. Do not promote this packet into `content/markdown/aaa` until a source-declared branch coordinate passes held-out residual, root-transport certification, raw-row root-ledger stability, and one-period closure.
