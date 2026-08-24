# A1.1 Narrow Retained-History Policy Extension Diagnostic

Date: `2026-07-28`

Status: `evaluated-diagnostic`, `complete-36-channel-accounting`, `continuous-projection-monotonicity-certified`, `null-score`, `prescribed-path-only`, `diagnostic-only`, and `priority-only`.

Claim grade: `derived-with-independent-direct-coordinate-controls`.

## Authorization and preserved boundary

This receipt records a separately authorized retained-history policy extension for only the previously unadjudicated outer-radius slice

$$
\frac{9}{8\sin(9/8)}<\alpha_3\le\frac54.
$$

The earlier [history-edge boundary receipt](2026-07-28-a1-1-outer-radius-second-band-boundary.md) remains unchanged and retains its `counterexample-diagnostic` classification under $\chi=9/4$. Its protocol, result, and summary reproduced exactly with hashes `79c93f59eb113fbeb7ad05aa9f6067b06ccc129bd4df9d2ca3a7f5e3ce9a1cfd`, `ae2596b32d046c4657de805777732e4695d455e2ad247546f7f5d1fbb9900e95`, and `284bf4e33f82a996d31ce04547f52fa49f1e4f144e10753a18602232c26be37c`. The old boundary owns the shared left endpoint.

Plainly: the old result was replayed, not rewritten. This new run starts just above its stopping radius and uses a separately declared history policy.

The $\alpha_1$ interval, $\alpha_2=1$ field-speed pin, relative phases $(0,2\pi/3,4\pi/3)$, all tolerance and precision floors, subdivision rules, resource ceilings, null score, and verification/advancement dispositions remain unchanged. No EOM evolution, energy, action, GR, Campaign 1, or candidate disposition was authorized.

## Exact retained-history declaration

The old reach and exact new reach are

$$
\chi_{\mathrm{old}}=\frac94,
\qquad
\chi_{\mathrm{new}}=\frac{145}{64}.
$$

The exact policy step is $1/64$. The smaller half-step $289/128$ is insufficient at $\alpha_3=5/4$: the outer-self causal residual there is `0.002049973344485867`. At $145/64$ the residual is `-0.001603521279709863`.

Plainly: the half-step still ends before the last outer self root, while the declared $1/64$ step ends after it. This is a retained-history policy choice, not a numerical-tolerance change.

At $\alpha_3=5/4$, the unique outer same-endpoint self root is

$$
\delta_\star=2.2622051713025657,
$$

which lies strictly between $9/4$ and $145/64$. Its delay derivative is `-0.46792205389343355`, so it is simple rather than a fold. Independent direct-coordinate recomputation on both affected ordered channels gives normalized residual `1.9630810480128044e-16`.

The next outer-self history-edge boundary under the new reach would be

$$
\alpha_3
=
\frac{145/64}{2\sin(145/128)}
=
1.2508853279964334
>
\frac54.
$$

Plainly: the extended window contains the root at the requested $5/4$ endpoint, and the next crossing lies beyond the authorized radius slice.

The sufficiency claim is falsified if the retained-edge residual becomes nonnegative, the root is not simple and interior, the next topology boundary is at or below $5/4$, or either independent residual exceeds the frozen `1e-9` floor. All four checks passed.

## Root topology and phase projection

All $36$ ordered channels received continuous diagnostic dispositions on the new slice:

| Channel class | Ordered channels | Continuous disposition |
| --- | ---: | --- |
| Same-transmitter self | $6$ | Four no-root rows; two one-root outer rows |
| Same-binary opposite endpoint | $6$ | One root on every row |
| Inter-binary representatives | $12$ | One root on every representative |
| Exact endpoint-inversion reuse | $12$ | One root on every paired row |
| Unresolved | $0$ | None |

The inter-binary treatment evaluated $5{,}316$ fold boxes and $384$ anchor boxes, reached maximum depth $12$, and left no unresolved box under the unchanged ceilings. The refined extended-history endpoint control had maximum squared-residual upper bound `-0.14735939705628265`; its independent direct-coordinate witness was `-0.15248266385723674`. The synthetic-fold control retained its unresolved classification, and the resource-exhaustion control returned Verification incomplete with a Not advanced disposition.

Plainly: extending history did not introduce a second root, a fold, or an unresolved inter-binary row within the newly authorized radius slice.

All six receiver-phase projection sheets remain strictly increasing. Endpoint inversion had zero enclosure difference. The maximum phase-seam difference was `2.1316282072803006e-14` against the unchanged `1e-12` tolerance. Twelve independent boundary witnesses had maximum normalized residual `6.139621386711707e-16`; their largest reception-fixed and emission-fixed finite-difference derivative differences were `5.677698311501445e-10` and `1.92539761911803e-10`, below the unchanged `1e-6` tolerance.

Plainly: phase order stays continuous through the formerly unadjudicated slice. Root topology and phase projection both close at $5/4$ under the new history declaration.

## Evidence identity and replay

The owner is the [history-extension protocol](../../../../src/prescribed-path-analysis/protocols/a1-1-outer-radius-history-policy-extension-protocol.v1.json). Its protocol hash is `b09b1b5a07db3904acfc387e8da90a2e282f93946b1f2c294fcbc3a4618f6f4f`. The result hash is `edae3d88d1347656519f7efba4d0f9f530aec4eab7fce78bf687f4c28125145c`. The [durable summary](a1-1-outer-radius-history-policy-extension-summary.v1.json) hash is `ddf8e622f0556b64c6cf348b6d9ee9cb109f7c28fc19dac508e356c9d540f57e`. The complete ignored ledger is `.local-data/braid-program/a1-1/a1-1-outer-radius-history-policy-extension.v1.json.gz` with raw-ledger hash `94c14eb0ac8956186a6325b93babf933dae26297f34dbbd3190110b6f6692f92`. The deterministic replay command is:

```bash
node scripts/prescribed-path-analysis/run-a1-1-outer-radius-history-policy-extension.mjs --check
```

Plainly: the new result is a separate hash-bound evidence family. Its replay also proves that the earlier boundary evidence still reproduces unchanged.

## Claim boundary

This result certifies prescribed-path root bookkeeping and receiver-phase projection only on the newly authorized slice through $\alpha_3=5/4$, under the separately declared reach $\chi=145/64$. The first unadjudicated radius is $\alpha_3>5/4$ under this history policy. The result does not establish retention, stability, binding, physical superluminal transport, physical realization, energy, action, angular-momentum dynamics, radiation, pressure, GR recovery, or any physical candidate.

Plainly: the extended chart now closes at the requested endpoint. It remains a null-score geometry diagnostic and does not advance Campaign 1 or a physics claim.
