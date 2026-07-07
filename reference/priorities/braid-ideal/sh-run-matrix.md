# Shell-Braid Run Matrix

Status: priority run matrix, 2026-07-04.

Scope: consolidated diagnostic/candidate run matrix for shell-braid Proof IDs in the braid-ideal lane. This file tracks controlled run variations under Proof IDs such as `SH-0`, `SH-0-sea`, and `SH-L`; it does not create accepted retained evidence, change proof status, or promote any branch.

## Matrix Granularity Decision

Use one consolidated shell-braid run matrix while the rows share the same source-object and retained-evidence blockers.

Use per-ID sections inside this file:

- `SH-0` for isolated one-band/common-shell rest target runs;
- `SH-0-sea` for the same central target embedded in surrounding like-braid Noether sea rows;
- `SH-L` for moving observer-export rows after a retained shell branch exists.

Split a section into its own matrix only when it gets a distinct runner, accepted-source object, validator, or evidence package large enough that the consolidated matrix stops being readable.

## ID Rule

Proof IDs name branch targets. Run handles name controlled variations.

Do not mint a new Proof ID for every surface-speed, prehistory, or release variation. A run handle should travel with the runner output, source artifact hash, retained record, source row, and evidence status. For example, `SH-0` remains the Proof ID, while `sh0-g0-vt080-moving-prehistory` is a diagnostic run handle under that Proof ID.

All rows below are priority-level diagnostic/candidate targets unless they later bind to accepted source rows, same-record receiver-normal root-detail rows, action/wake/event/support rows, and any required Noether sea response rows.

## Shared Conventions

| Field | Meaning |
| --- | --- |
| Proof ID | Branch target or downstream consumer being exercised. |
| Run handle | Stable local run/evidence handle, not a Proof ID. |
| Group velocity | Target-center group velocity for the diagnostic run. Existing candidate source rows may carry raw replay drift; record that separately in the runner output. |
| Surface speed | Tangential speed magnitude on the common shell, reported as a fraction of field speed `$c_f$`. |
| Prehistory mode | How the retained-history window is primed before the release or measurement. |
| Evidence status | Current allowed claim level for the row. |

The held-release rows are history-primed: the source history is generated during a hold interval, then the release or diagnostic perturbation is measured. A `kick-at-release` row intentionally changes velocity after the held history has been primed, so it tests the velocity factor as a diagnostic mismatch. A `moving-prehistory` row primes the path history with the same transverse surface motion it uses at release, so it is the history-consistent version if transverse motion survives the first screen.

## SH-0 Isolated Rest Target

`SH-0` is the isolated one-band/common-shell rest target: six architrinos on the shell, diametrically opposed binaries, and the axis-neutral angular-momentum frame. These rows test whether group-zero surface motion changes the isolated diagnostic behavior. They do not claim retained closure.

Capped axis-neutral sweep executed 2026-07-07 with [held-release-causal-wake-toy.mjs](../../../scripts/braid-ideal/held-release-causal-wake-toy.mjs) at toy defaults (duration 3, dt 0.002, hold 4, $c_f=1$, coupling 1, spin axis $(1,1,1)/\sqrt{3}$). Outcome across all ten declared nonzero rows: no second turn, no bounded window, causal-root coverage clean (zero missing roots), $\operatorname{Fix}(G)$-drift residual bounded at $\le 5\times10^{-15}$, and every row fail-closed. The compression-first versus outward-only boundary sits between `vt050` and `vt080`: at release the geometric outward rate $v_t^2/R$ passes the net inward radial release acceleration ($\approx 0.25$ on the unit fixture, so marginal at $f_v\approx0.5$). Post-first-turn inward reduced-radius acceleration rows appear at `vt025`/`vt050` but also appear in the `vt000` zero-angular-momentum control and occur after the field-speed crossing, so they do not name a candidate row under the capped-witness discipline. `moving-prehistory` released with zero position/velocity discontinuity in every row.

| Run handle | Group velocity | Surface speed | Prehistory mode | Purpose | Evidence status |
| --- | --- | ---: | --- | --- | --- |
| `sh0-g0-vt000-held-release` | `0` | `0.00 c_f` | stationary held release | Baseline target identity and restart control for the provider-backed seed-path route. | diagnostic/candidate; retained evidence blocked at `held_release_seed_path_rows_acceptance_certificate.v0`. Toy control 2026-07-07: inward>outward, first turn `t=1.08`, no second turn, field-speed crossing `t=0.73`, drift `2.1e-15`. |
| `sh0-g0-vt025-kick-at-release` | `0` | `0.25 c_f` | stationary hold, transverse kick at release | Low transverse-speed diagnostic isolating velocity-factor sensitivity from history priming. | diagnostic only; executed 2026-07-07: inward>outward, first turn `t=1.028`, no second turn, roots clean, field-speed crossing `t=0.71`, drift `2.0e-15`. |
| `sh0-g0-vt050-kick-at-release` | `0` | `0.50 c_f` | stationary hold, transverse kick at release | Mid transverse-speed kick screen. | diagnostic only; executed 2026-07-07: marginal outward>inward>outward, first turn `t=0.904`, no second turn, roots clean, field-speed crossing `t=0.652`, drift `2.7e-15`. |
| `sh0-g0-vt080-kick-at-release` | `0` | `0.80 c_f` | stationary hold, transverse kick at release | High but sub-field transverse-speed kick screen. | diagnostic only; executed 2026-07-07: outward-only, never compresses (min radius `1.0`), roots clean, field-speed crossing `t=0.502`, drift `9.8e-16`. |
| `sh0-g0-vt095-kick-at-release` | `0` | `0.95 c_f` | stationary hold, transverse kick at release | Near-field-speed kick screen for root-margin and return-response sensitivity. | diagnostic only; executed 2026-07-07: outward-only, never compresses, roots clean, field-speed crossing `t=0.29`, drift `1.8e-15`. |
| `sh0-g0-vt099-kick-at-release` | `0` | `0.99 c_f` | stationary hold, transverse kick at release | Near-edge kick screen before the exact field-speed limit. | diagnostic only; executed 2026-07-07: outward-only, never compresses, roots clean, field-speed crossing `t=0.14`, drift `5.0e-15`. |
| `sh0-g0-vt100-kick-at-release` | `0` | `1.00 c_f` | stationary hold, transverse kick at release | Exact field-speed surface-motion edge diagnostic; expect causal-root margin risk. | diagnostic edge case only; outside the capped ten-row sweep. |
| `sh0-g0-vt025-moving-prehistory` | `0` | `0.25 c_f` | transverse moving prehistory | Low transverse-speed history-consistent release. | diagnostic/candidate only; executed 2026-07-07: inward>outward, first turn `t=1.048`, no second turn, roots clean, field-speed crossing `t=0.708`, drift `1.5e-15`, release continuity exact. |
| `sh0-g0-vt050-moving-prehistory` | `0` | `0.50 c_f` | transverse moving prehistory | Mid transverse-speed history-consistent release. | diagnostic/candidate only; executed 2026-07-07: outward>inward>outward, first turn `t=0.926`, no second turn, roots clean, field-speed crossing `t=0.642`, drift `1.7e-15`, release continuity exact. |
| `sh0-g0-vt080-moving-prehistory` | `0` | `0.80 c_f` | transverse moving prehistory | High sub-field history-consistent release and first likely comparison to the current `u0.8:v0.2` source-row route. | diagnostic/candidate only; executed 2026-07-07: outward-only, never compresses, roots clean, field-speed crossing `t=0.536`, drift `2.4e-15`, release continuity exact. |
| `sh0-g0-vt095-moving-prehistory` | `0` | `0.95 c_f` | transverse moving prehistory | Near-field-speed history-consistent release. | diagnostic/candidate only; executed 2026-07-07: outward-only, never compresses, roots clean, field-speed crossing `t=0.492`, drift `3.2e-15`, release continuity exact. |
| `sh0-g0-vt099-moving-prehistory` | `0` | `0.99 c_f` | transverse moving prehistory | Near-edge history-consistent release before the exact limit. | diagnostic/candidate only; executed 2026-07-07: outward-only, never compresses, roots clean, field-speed crossing `t=0.484`, drift `3.9e-15`, release continuity exact. |
| `sh0-g0-vt100-moving-prehistory` | `0` | `1.00 c_f` | transverse moving prehistory | Exact field-speed history-consistent surface-motion limit. | diagnostic edge case only; outside the capped ten-row sweep; do not treat as accepted retained evidence. |

## SH-0-Sea Embedded Target

`SH-0-sea` inherits the central `SH-0` target identity, then adds surrounding like-braid Noether sea rows, a local target-sea frame, boundary-condition rows, candidate sea-response rows, support/envelope variables, action/exchange variables, and receiver-normal evidence requirements.

The sea rows should consume the `SH-0` run handle they embed. They remain diagnostic/candidate until the central target/source record is accepted and same-record receiver-normal accounting exists.

Computed dipole wake sum executed 2026-07-07 with [sh-0-sea-diagnostic-candidate-model.mjs](../../../scripts/braid-ideal/sh-0-sea-diagnostic-candidate-model.mjs) `--wake-sum-run`. The fitted response amplitude is removed from the script; the sea response is now the master-equation-kernel delayed sum over the 12 FCC nearest-neighbor braids with declared held histories (aligned orientation, static over the declared window, signed-polarity dipole $2(1,1,1)$ per braid, kernel constants identical to the escape-floor toy: coupling $1$, softening $0.05$, $c_f=1$, branch weight $1$ for held static sources), zero free amplitude anywhere in the output path. Across the declared range $a_{\mathrm{FCC}}\in[3,12]$ (step $0.25$, held-history window $24$, all $432$ directed roots covered, field speed clean at every spacing), the projected response $\Pi_R\mathcal A^{\mathrm{sea}}$ is inward at every spacing and crosses the same-record escape floor $-0.0934863484737535$ for $a_{\mathrm{FCC}}\le5.3469$: a computed retention window $a_{\mathrm{FCC}}\in[3,5.34690143]$ exists (lower edge set by the declared range minimum above the shell-overlap constraint $2\sqrt2$, upper edge a computed floor crossing). Sample rows: $\Pi_R=-1.0814$ at $a_{\mathrm{FCC}}=3$, $-0.3712$ at $4$, $-0.1025$ at $5.25$, $-0.0811$ at $5.5$, $-0.0519$ at $6$; far-field decay is approximately $a_{\mathrm{FCC}}^{-5}$ (observed). Named sea-spacing candidate for downstream same-record work: `sh0sea-aa-fcc-dipole-wake-sum:a-fcc-4.25` ($\Pi_R=-0.2833$, inward margin $0.1899$ below the required floor). Held histories are static, so this run tests amplitude-only retention; the delayed-echo phase structure needs moving neighbor histories. All outputs fail closed at the central seed-path certificate; no retained `SH-0-sea` branch is claimed.

| Run handle | Embedded central run | Group velocity | Surface speed | Prehistory mode | Purpose | Evidence status |
| --- | --- | --- | ---: | --- | --- | --- |
| `sh0sea-g0-vt000-held-release` | `sh0-g0-vt000-held-release` | `0` | `0.00 c_f` | stationary held release | First candidate Noether sea stabilization row around the central target. | diagnostic/candidate; accepted evidence blocked at the central seed-path certificate and later sea-response rows. |
| `sh0sea-g0-vt050-kick-at-release` | `sh0-g0-vt050-kick-at-release` | `0` | `0.50 c_f` | stationary hold, transverse kick at release | Medium-response check for a surface-kicked central target. | diagnostic only. |
| `sh0sea-g0-vt080-kick-at-release` | `sh0-g0-vt080-kick-at-release` | `0` | `0.80 c_f` | stationary hold, transverse kick at release | High sub-field response check for velocity-factor sensitivity in the sea environment. | diagnostic only. |
| `sh0sea-g0-vt080-moving-prehistory` | `sh0-g0-vt080-moving-prehistory` | `0` | `0.80 c_f` | transverse moving prehistory | First history-consistent moving-surface sea stabilization check if the isolated row remains numerically meaningful. | diagnostic/candidate only. |
| `sh0sea-g0-vt095-moving-prehistory` | `sh0-g0-vt095-moving-prehistory` | `0` | `0.95 c_f` | transverse moving prehistory | Near-field-speed sea stabilization check. | diagnostic/candidate only. |
| `sh0sea-g0-vt100-moving-prehistory` | `sh0-g0-vt100-moving-prehistory` | `0` | `1.00 c_f` | transverse moving prehistory | Exact field-speed embedded edge diagnostic. | diagnostic edge case only. |

## SH-L Downstream Moving Export

`SH-L` is not a surface-speed sweep of an unretained `SH-0` row. It is the downstream moving observer-export consumer after a retained `SH-0` or retained `SH-0-sea` branch exists.

| Run handle | Source branch requirement | Group velocity | Surface speed | Purpose | Evidence status |
| --- | --- | --- | ---: | --- | --- |
| `shl-from-retained-sh0` | retained `SH-0` branch | `>0` | inherited from retained branch | Test moving shell export only after isolated shell retention closes. | blocked; no retained `SH-0` branch exists. |
| `shl-from-retained-sh0sea` | retained `SH-0-sea` branch | `>0` | inherited from retained branch | Test moving shell export after sea-stabilized shell retention closes. | blocked; no retained `SH-0-sea` branch exists. |

## First Executable Gap

The current first accepted-evidence blocker is unchanged:

- object: `held_release_seed_path_rows_acceptance_certificate.v0`;
- field: `held_release_seed_path_rows.acceptance_certificate_ref`;
- candidate artifact: `held_release_seed_path_rows:5833f18e53586201`.

The diagnostic run-matrix metadata gap is now implemented in three runner surfaces:

- [held-release-seed-path-rows.mjs](../../../scripts/braid-ideal/held-release-seed-path-rows.mjs) accepts `--proof-id`, `--run-handle`, `--source-row-id`, `--target-center-group-velocity`, `--surface-speed-fraction`, and `--prehistory-mode`.
- [sh-0-sea-diagnostic-candidate-model.mjs](../../../scripts/braid-ideal/sh-0-sea-diagnostic-candidate-model.mjs) accepts `--run-handle`, `--embedded-central-run-handle`, `--source-row-id`, `--target-center-group-velocity`, `--surface-speed-fraction`, and `--prehistory-mode`.
- [held-release-causal-wake-toy.mjs](../../../scripts/braid-ideal/held-release-causal-wake-toy.mjs) accepts `--surface-speed-fraction`, `--spin-axis` (default `1,1,1`, normalized to $\hat{\mathbf n}$), and `--prehistory-mode`; it writes the rigidly rotating hold-window source path history for `moving-prehistory`, applies the rigid-rotation release velocity for `kick-at-release`, and emits surface-speed fraction, actual tangential speed, angular rate, normalized spin axis, prehistory mode, kinematic $\mathbf J_{\mathrm{kin}}$ (diagnostic bookkeeping only), release-continuity residuals, reduced-radius sign sequence, and $\operatorname{Fix}(G)$-drift residuals per run.

Both outputs carry source artifact id/hash, source row id, run handle, prehistory mode, target-center group velocity, surface speed, and fail-closed evidence status. `kick-at-release` and `moving-prehistory` remain separate because they answer different questions about history priming.

Example isolated diagnostic row:

```bash
node scripts/braid-ideal/held-release-seed-path-rows.mjs --proof-id=SH-0 --run-handle=sh0-g0-vt080-moving-prehistory --source-row-id=diagnostic-source-row:sh0-g0-vt080-moving-prehistory --target-center-group-velocity=0,0,0 --surface-speed-fraction=0.8 --prehistory-mode=moving-prehistory --retained-record-id=retained-record:held-release-six-point:adapter-acceptance-certificate --provider-object-ref=candidate:central_solver_retained_history_provider_object:7d4a8fe0a9792327 --provider-artifact-hash=7d4a8fe0a97923270179f2ca0b49b4bc0d6b6ba3251b26e82569bdb4bd1f91df --pretty
```

Example embedded Noether sea diagnostic row:

```bash
node scripts/braid-ideal/sh-0-sea-diagnostic-candidate-model.mjs --run-handle=sh0sea-g0-vt080-moving-prehistory --embedded-central-run-handle=sh0-g0-vt080-moving-prehistory --source-row-id=diagnostic-source-row:sh0-g0-vt080-moving-prehistory --target-center-group-velocity=0,0,0 --surface-speed-fraction=0.8 --prehistory-mode=moving-prehistory --pretty
```

Only after the accepted seed-path certificate, matching external accepted-authority package, repo authorization, retained-source adapter package, and same-record receiver-normal root-detail rows exist can any row in this matrix be used for retained force/action or stability closure.
