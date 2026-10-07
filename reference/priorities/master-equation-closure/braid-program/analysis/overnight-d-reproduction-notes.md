# Reproducing assignment D's bounded research

## Scope and prerequisites

This record reproduces floating research instruments and conditional-tail diagnostics. It does not certify the exact finite evolution, establish actual escape or coincidence, or provide EOM qualification. The [main report](overnight-d-ceiling-eight-member-2026-10-06.md) owns the mathematical conclusions, numerical values, preparation and limitations. The [split-history theorem](overnight-d-split-history-tail.md) owns the current sufficient criterion.

All commands run from the existing repository checkout with its executable shared macOS venv. Original inputs and retained histories are ignored local provenance under `.local-data/master-equation-closure/`; they are not fresh-CI dependencies. The main report records the four original input hashes. The inherited implementation dependencies, measured by `shasum -a 256`, are `geometry-session-20261005/release.py` with hash `ed8c886643c344e2f4b26f138d39051263f95c0fdcab533195895d4785849cca` and `geometry-session-20261005/release2.py` with hash `0d841a2ae2bc73e538ca0c9e394ebb8bbb31db7f07654529c3c2d49b104fcf5c`. These files were inspected after the initial runs; these hashes establish their current bytes, not an independently timestamped pre-run freeze.

Use one scientific process at a time and the owned supervisor for long runs. The following shell variables are abbreviations only:

```bash
analysis_dir=reference/priorities/master-equation-closure/braid-program/analysis
evidence_dir=.local-data/master-equation-closure/overnight-d
export OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 VECLIB_MAXIMUM_THREADS=1
```

## Original subject and initial endpoints

The exact initial control command was:

```bash
"${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-release-diagnostics.py" controls
```

The four original endpoint reconstructions used `target --balance <0|1> --seed <1|2> --hdiv 2400 --periods 10 --tag original-endpoint`, with target wall limits 540 seconds for balance 1 and 300 seconds for balance 0. Each was wrapped in the supervisor, for example:

```bash
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --owner-thread "$CODEX_THREAD_ID" --deadline-seconds 600 --heartbeat-seconds 15 -- env OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 VECLIB_MAXIMUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-release-diagnostics.py" target --balance 1 --seed 1 --hdiv 2400 --periods 10 --wall 540 --tag original-endpoint
```

The seed-1 original-subject refinement used `--hdiv 4800 --periods 5 --wall 800 --tag refinement-endpoint`, under a 900-second supervisor deadline. The subject's original far/contact guards determine the endpoint before these horizon limits.

## Independent discretization

The exact input exporter reconstructs the original NumPy kicks and verifies them against each saved preparation before writing round-trip decimal input:

```bash
"${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-prepare-independent-inputs.py"
clang++ -O3 -std=c++17 "$analysis_dir/overnight-d-independent-release.cpp" -o .tmp/overnight-d/independent-release
.tmp/overnight-d/independent-release controls
```

After the controls, each target invocation has the form below. Run it through the supervisor when reproducing the refinements, and use a new output tag to preserve retained evidence.

```bash
/usr/bin/time -l .tmp/overnight-d/independent-release "$evidence_dir/b1-s1-input.txt" 76800 60 "$evidence_dir/independent-q-b1-s1-h76800-recheck.json"
```

Balance 1 seed 1 used divisors 9600, 19200, 38400 and 76800 with 60-second limits. Seed 2 used 38400 and 76800 with 90-second limits. Balance 0 seeds 1 and 2 used 19200 and 38400 with 60-second limits. These refinements compare independent approximations; they are not error enclosures. Historical linear-history outputs and the failed pre-target projection control remain explicitly distinguished in the main report.

## Tail diagnostics and candidate search

Current read-only diagnostics can be recomputed from retained histories:

```bash
"${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-tail-entry.py" b1-s1-h2400-original-endpoint
"${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-split-tail.py" b1-s1-h4800-refinement-endpoint
"${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-tail-search.py" controls
```

The seed-1 continuation restored `b1-s1-h4800-refinement-endpoint`, first ran a pilot to 3.52 periods, then restored that complete pilot history for the 40-period search. Its old screening formula and source hash are recorded in the main report. The current formula is stronger, so rerunning current default screening can stop earlier. To reproduce the same continued trajectory through the original 40-period budget without a candidate stop, use `--margin 0`; this changes only the numerical stopping predicate. It does not reproduce the historical weaker screen values.

Seed 2's pilot restored `b1-s2-h2400-original-endpoint` and ran to 3.50 periods. Its supervised search was:

```bash
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --owner-thread "$CODEX_THREAD_ID" --deadline-seconds 900 --heartbeat-seconds 15 -- env OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 VECLIB_MAXIMUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-tail-search.py" target --input b1-s2-tail-pilot-h600 --output b1-s2-tail-search-h600-recheck --periods 40 --wall 800
```

The selected radii are literal choices printed in the main report and retained in local `b1-s1-tail-current-floor.json` and `b1-s2-tail-radii.json`. Whole-segment diagnostics with hypothetical error allowances use:

```bash
"${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-tail-segment-bounds.py" b1-s1-tail-search-h600 --ex .1 --ev .001 --cutoff-pad 2 --output b1-s1-tail-error-budget-recheck.json
"${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-tail-segment-bounds.py" b1-s2-tail-search-h600 --radii-json b1-s2-tail-radii.json --ex .1 --ev .001 --cutoff-pad 2 --output b1-s2-tail-error-budget-recheck.json
```

The segment instrument evaluates analytical full-segment bounds in binary64. Its report must not be relabeled as a directed-rounding certificate or as evidence that the assumed exact-history errors hold.

## Approaching pairs

The independent snapshot review and checker own the all-channel endpoint reconstruction. The conditional external-six and fixed-state projection diagnostics run as:

```bash
"${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-background-bound.py" b0-s1-h2400-original-endpoint
"${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-background-bound.py" b0-s2-h2400-original-endpoint
"${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-projection-perturbation.py"
```

The first two commands retain floating source-bracket bounds. The third uses the independent snapshot row vectors and tests only the same-state response difference. No command continues a contact-threshold case through coincidence or supplies a close-pair delayed-range/present-distance theorem.

## Independent interval candidate and finite-error attempt

The independent interval checker owns its arithmetic contract and known controls; its [review](overnight-d-tail-interval-independent-review-2026-10-06.md) records the exact seed-1 input hashes and all process receipts. The target option runs controls first:

```bash
"${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-tail-interval-independent-check.py" --target
```

The bounded finite-history residual and sampled-comparison experiments are:

```bash
"${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-finite-defect-screen.py" target --samples 256
"${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-finite-defect-screen.py" compare
```

These last two commands produce diagnostics, not a validated finite-history envelope. The independent mathematical review did not use their output as a premise. The main report records the failed sampled-comparison budget and the additional source-kick, root-bracket and velocity-conversion obligations.

## Geometry-preserving finite-history successor

The [successor derivation](overnight-d-finite-geometry-enclosure.md) separates receiver-matrix cancellation from delayed source errors. Its diagnostic imports the unchanged finite-defect script for the retained history, root and residual evaluators; this shared dependency means the two screens are not independent trajectory checks. Independent analytic static-source, constant-velocity causal-quadratic, and oscillator controls precede target use. A circular-source chain-rule control was added afterward and passed without changing target arithmetic.

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-finite-geometry-screen.py" controls
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-finite-geometry-screen.py" target --end 2 --steps 16 --output b1-s1-finite-geometry-pilot-recheck
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-finite-geometry-screen.py" target --end 100 --steps 1024 --output b1-s1-finite-geometry-screen-recheck
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-finite-geometry-screen.py" target --end 100 --steps 2048 --output b1-s1-finite-geometry-screen-refined-recheck
```

These bounded short foreground diagnostics stop when their weighted allowance exceeds 0.01. They omit the complementarity and kick-mismatch contributions and use nominal midpoint coefficients, so they cannot admit an exact history even if their output is small. Both target grids fail the velocity allowance before the earliest tail source cutoff. Their initial representation allowances are diagnostic choices, not validated bounds.

The separately authored kick checker imports only the unchanged interval primitives, not the evolution or finite-defect screen. Its [review](overnight-d-kick-crossing-independent-review-2026-10-07.md) records controls, exact-front and enlarged comparison-front inventories, the continuous-reference construction, input hashes, and initialization bounds. Reproduce it with:

```bash
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --owner-thread "$CODEX_THREAD_ID" --deadline-seconds 180 --heartbeat-seconds 15 -- env OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 VECLIB_MAXIMUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" "$analysis_dir/overnight-d-kick-crossing-independent-check.py" --target
```

The script runs controls before its target and writes local `overnight-d/kick-crossings/seed1-h4800.json`. The source-zero event inventory is conditional on its stated tube and does not certify that the original evolution lies in it. The [independent geometry review](overnight-d-finite-geometry-independent-review-2026-10-07.md) verifies the error identities and the use of the kick correction without using the numerical screen as evidence.

An additional known-case-first exact-rational norm check confirmed all eight stored initial velocities lie inside the unit ball; their largest squared norm rounds to 0.5197432380348869. An unnecessary trial assertion that this squared norm was below one quarter failed and was removed from the one-off check; the required strict unit-ball assertion passed. No scientific reference was changed by that diagnostic correction.
