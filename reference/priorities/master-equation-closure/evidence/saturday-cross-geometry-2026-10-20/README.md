# Evidence: Saturday cross-geometry continuation, October 20, 2026

## What this directory holds

This directory is the evidence record for four analytical subjects and one tracking note written by the Saturday cross-geometry agent on 2026-10-20:

- [the fixed-past field theorem for the infinite alternating lattice](../../analysis/saturday-cross-geometry-continuation-2026-10-20.md) (chunk 1);
- [its sharpness companion](../../analysis/saturday-cross-geometry-continuation-2026-10-20-sharpness.md) (chunk 2);
- [persistence of a lattice arrival under weighted perturbations](../../analysis/saturday-cross-geometry-continuation-2026-10-20-persistence.md) (chunk 3);
- [passage through a transverse fold in a fixed-past window](../../analysis/saturday-cross-geometry-continuation-2026-10-20-fold-passage.md) (chunk 4);
- [the dependency tracking note](../../../aaa-work-threads/analysis/saturday-dependency-tracking-2026-10-20.md) (tracking chunk).

The mathematical claims are hand derivations. Their review record is the Codex reply files in `review/`, which are authored by the reviewer and are not edited. The file `derivative_constants_check.py` is a sampled sanity check of derivative constants; it does not prove any bound.

## Instrument

`derivative_constants_check.py` (frozen after its first run; any change would be a new file with the old copy kept under `history/`).

| Run | Mode | Purpose | Result |
| --- | --- | --- | --- |
| run1, 2026-10-20T21:07:49Z | `known` | K1: Frobenius norm of $D\mathbf K$ equals $\sqrt6/\lvert\mathbf y\rvert^3$; K2: fourth derivative of $y^{-3}$ at $1$ equals $360$ | pass (relative error $4.4\times10^{-41}$; $360.0$) |
| run2, 2026-10-20T21:08:05Z | `target` | sampled checks of $\lVert D^4\mathbf K\rVert\le2220$ (by Frobenius norm), $c_v(w)$, $1/(1-w)$, $1/(1-w)^2$ at $w=0.07,0.3,0.5$ | all samples within the claimed bounds (largest sampled Frobenius norm of $D^4\mathbf K$ on the unit sphere $336.75$) |

Both runs used the shared venv Python under `node scripts/dev/owned-compute-supervisor.mjs run --owner-task saturday-agent-crossgeom-2026-10-20`. Supervisor receipts and copied outputs are in the ignored runtime folder `.local-data/aaa-work-threads/saturday-agents-2026-10-20/crossgeom/` as `run1.*` and `run2.*`. Grade of the instrument's output: measured, sampled; it can expose an arithmetic error in a constant and cannot establish a supremum.

## Review rounds

Reviewer: Codex CLI, model `gpt-6.1-sol`, reasoning effort high, read-only sandbox, ephemeral session, invoked as

```
/Applications/ChatGPT.app/Contents/Resources/codex-cli/bin/codex exec -m gpt-6.1-sol -c model_reasoning_effort=high -s read-only --ephemeral -C /Users/markmorris/vibe/architrino -o <evidence>/review/chunkK-reply-roundR.md "$(cat <evidence>/review/chunkK-request-roundR.md)"
```

The table below is completed as rounds finish; request and reply identities are SHA-256 digests read with `shasum -a 256` at the time of recording.

| Chunk | Round | Request | Reply | Started (UTC) | Finished (UTC) | Disposition |
| --- | --- | --- | --- | --- | --- | --- |
| chunk1 | 1 | `08a803132ef6028c71f70db0de3fc91874930412130d3bf9e86a0916d7c0a36f` | `4408b2daac596873d83b4bbf89eca0e569402e17623a931f5901e5dbeaf34173` | 21:11:03Z | 21:17:08Z | ACCEPT AFTER CORRECTIONS |
| chunk1 | 2 | `58bff0fc5fee99a9d3f7d355beae5791b2cef984f5428d0f2271b64a364a0687` | `2dc617457b7133500b6e5ca219f886cdefc1fe32ded54f13ded6a3a10bac7d90` | 21:18:39Z | 21:22:09Z | ACCEPT |
| chunk2 | 1 | `590ab836662e9aa8954e10b935cd95866c434c15ccd4218d9f6d78d76cd4d72c` | `01aa65ac1f108677b7b44267bcf8846ca823e6ba5e51163521dde8bffee5db42` | 21:12:56Z | 21:15:25Z | ACCEPT AFTER CORRECTIONS |
| chunk2 | 2 | `284b9e82efe97abc18e008df67dde55b18ae8a7d54b78dccb8436e5097337138` | `d317fe9e64266a419767f77279d964f6a59304889681a94a437d4f2be6ebaa24` | 21:16:27Z | 21:19:23Z | ACCEPT |
| chunk3 | 1 | `f16e2e1f3a477243b20a3d84fa1240693fe2dd2ebb827a81a0a36d6b0718f8bf` | `8b1dc2554a747974662fe89527544c4b248ea3b506c85cd7723b9c31c0070518` | 21:29:54Z | 21:36:11Z | ACCEPT AFTER CORRECTIONS |
| chunk3 | 2 | `442ef79102c46365c604adde00f09cd69dfa3f9f1ddbba99172da81f3389fa04` | `90134a08e766a2d7ce39ab0a2e4d77d8ddb039ee0b280f05c252f90366a4b684` | 21:37:54Z | 21:42:34Z | ACCEPT AFTER CORRECTIONS |
| chunk3 | 3 | `56753c3b995cc7ec6d031c2cd2a6e55fedc3385c7725efea9794807674dc6b6c` | `d8c99c0e363fbde27e173c78d67b5796d4b33dab7effe5347aa616ee3e64ce26` | 21:43:22Z | 21:46:50Z | ACCEPT |
| chunk4 | 1 | `8e072c2adb51505e84b4091a7198a0e7b5300a4f1f8d3650d46694d44c0af04f` | `78d8e8c8ab72f25c7909acd67fc9acb31a7e5a317510d43da7a4b6b4a71a42e1` | 21:38:26Z | 21:43:55Z | ACCEPT AFTER CORRECTIONS |
| chunk4 | 2 | `c0261f1599d5b402bbf6905fd5bf72dfca6055a784d034edf95fe3d31e43f7d5` | `410d18b151fce3ec67bf415273b64206851cbdc96def80f7542c1942552b9e1c` | 21:46:21Z | 21:51:19Z | ACCEPT AFTER CORRECTIONS |
| chunk4 | 3 | `75d91f29f1d6fe89a3f2a4f5eea1c33727b3f6d409d4c335b5a6954906e4724d` | `6772cf846cfd5b469aff812d10586602142ba544f6286251084b51a295b565d2` | 21:52:00Z | 21:54:45Z | ACCEPT |
| tracking | 1 | `5314540abea56354b6144fbafabdf14945756e6623d9785da64af92e54969b87` | `6112a9d6c6b3ac1e779cb9fd36fbb0b75c65398b4ea84de91031858dcfb2189d` | 21:21:00Z | 21:24:46Z | ACCEPT AFTER CORRECTIONS |
| tracking | 2 | `8f9915680e368913651da6d459664ffedf63a60232c99c8da97f4b08d73c7381` | `1a7224e9884a5ca8c021e71f62fd3657f8fb9650886dbdb064917cbebf3b8f6d` | 21:29:54Z | 21:32:41Z | ACCEPT AFTER CORRECTIONS |
| tracking | 3 | `0e10fb9b5e970944f478a78548733b1c3cf0002a018250667fa9b064de8e7b41` | `c5a8df159a2e02e3632092a7a6233880d55741e4dc9509897d294f265f726b76` | 21:35:52Z | 21:37:03Z | ACCEPT |

Each round's author response (`review/chunkK-response-roundR.md`, `review/tracking-response-roundR.md`) lists what changed for each finding and the new file identity. Every round ran with model `gpt-6.1-sol` at reasoning effort high; the stdout and stderr of each call are retained in the runtime folder as `codex-<chunk>-round<R>.stdout` and `.stderr`, with `.started` and `.finished` clock records.

## Final accepted identities

| File | SHA-256 | Bytes | Final disposition |
| --- | --- | ---: | --- |
| `saturday-cross-geometry-continuation-2026-10-20.md` | `4ab0726d2dca9e4a62e2f0bb9e245b71bf40d252f84ec2a87fb09ddb4b167f1f` | 45360 | ACCEPT, chunk 1 round 2 |
| `saturday-cross-geometry-continuation-2026-10-20-sharpness.md` | `64ccaf2e0c3775cb726729514397bb925e08de69d9da08a775567d4a9c589710` | 16285 | ACCEPT, chunk 2 round 2 |
| `saturday-cross-geometry-continuation-2026-10-20-persistence.md` | `e49b522b5f347bac8b752d4d635db86232aa58f069fbf7a222999c665698a584` | 25627 | ACCEPT, chunk 3 round 3 |
| `saturday-cross-geometry-continuation-2026-10-20-fold-passage.md` | `e615656993f80953f7349ee623d207af41ffeeac7176c10fab781400545a0a78` | 26234 | ACCEPT, chunk 4 round 3 |
| `saturday-dependency-tracking-2026-10-20.md` | `821e5d69230ff0038e700a17afb82dabf0a283a9d1088624278ef839f9346714` | 16358 | ACCEPT, tracking round 3 |

## Discrepancy found in an accepted subject

The tracking review found, and a direct reading of `.local-data/master-equation-closure/saturday-cross-geometry/release_population_target.out` confirms, that the October 10 comparison's phrase "Twelve perturbed mirror releases" counts two unperturbed baseline runs: the retained output holds ten perturbed releases and two baselines. The accepted comparison is not edited here; the correction is for its owner. It changes no conclusion of the comparison, since those runs illustrate a theorem without testing its constants.
