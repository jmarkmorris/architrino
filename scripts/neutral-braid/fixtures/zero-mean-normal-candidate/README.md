# Zero-Mean Normal-Candidate Fixture

This fixture supplies the optional packet chain consumed by
`scripts/neutral-braid/octahedral-zero-mean-correction-intake.mjs` to exercise a
bounded-speed normal-reconstruction candidate path plus the fail-closed
after-normal action/stability intake boundary.

It is a schema and plumbing fixture only. It uses supplied same-ledger rows with
ideal residuals to prove that the intake can carry a
`bounded-speed-normal-reconstruction-candidate` packet without retaining a
branch. The after-normal packet also declares a fail-closed
`bounded_speed_live_ledger` target whose required same-ledger rows are all
`blocked:bounded-speed-live-ledger-open`. Every packet keeps
`certifies_bounded_speed_live_ledger=false` and `retained_branch=false`.

Rebuild and validate the fixture artifact with:

```sh
node scripts/neutral-braid/octahedral-zero-mean-correction-intake.mjs \
  --samples 120 \
  --subdivisions 240 \
  --live-derivative-matrix scripts/neutral-braid/fixtures/zero-mean-normal-candidate/live-derivative-matrix.json \
  --live-correction-direction scripts/neutral-braid/fixtures/zero-mean-normal-candidate/live-correction-direction.json \
  --speed-primitive-feasibility scripts/neutral-braid/fixtures/zero-mean-normal-candidate/speed-primitive-feasibility.json \
  --speed-clock-length scripts/neutral-braid/fixtures/zero-mean-normal-candidate/speed-clock-length.json \
  --normal-reconstruction-handoff scripts/neutral-braid/fixtures/zero-mean-normal-candidate/normal-reconstruction-handoff.json \
  --bounded-speed-normal-reconstruction-candidate scripts/neutral-braid/fixtures/zero-mean-normal-candidate/bounded-speed-normal-reconstruction-candidate.json \
  --action-stability-after-normal-candidate scripts/neutral-braid/fixtures/zero-mean-normal-candidate/action-stability-after-normal-candidate.json \
  --out .tmp/zero-mean-normal-candidate-artifact.json \
  --pretty
node scripts/neutral-braid/octahedral-zero-mean-correction-intake.mjs \
  --validate .tmp/zero-mean-normal-candidate-artifact.json
```
