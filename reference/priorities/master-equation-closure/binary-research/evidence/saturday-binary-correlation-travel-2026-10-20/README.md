# Evidence for the binary correlation and excursion notes (2026-10-20)

This folder holds the two instruments and the review record for two notes of the Saturday binary agent's round of 2026-10-20:

- [The radial–anisotropy correlation bounded by the relative radial excursion](../../analysis/saturday-binary-correlation-travel-2026-10-20.md) (chunk 1);
- [An inverse-separation-weighted angular balance without the common-motion correlation](../../analysis/saturday-binary-correlation-travel-2026-10-20-inverse-weight.md) (chunk 2);
- [The inverse-weighted angular balance at higher speed bounds, and a sharper amplitude requirement](../../analysis/saturday-binary-correlation-travel-2026-10-20-speed-range.md) (chunk 3).

All three notes are hand derivations. The instruments evaluate only their closed-form constants, in exact rational arithmetic. It integrates nothing, evaluates no history and checks no theorem, so their agreement with the derivations is arithmetic verification by the author, not independent evidence.

## The instrument

[`correlation_travel_constants.py`](correlation_travel_constants.py) takes one argument, the JSON file it writes, and uses only the Python standard library (`fractions`, `math.isqrt`). It imports no earlier instrument. Every square root of a rational is enclosed by an integer-square-root bracket at scale $10^{40}$, proved by squaring.

Each constant uses the enclosure end that is conservative for its use:

- upper bounds for $c(w)$, $z_0$, $e$, $k$, $k_1$, $k_A'$, $\mathcal M$, $m$, $wz_0$, $w^2+wz_0$, $\min\{2w,\sqrt{c_+/\rho}\}$ and $\sqrt{c_+}$;
- lower bounds for $c_-$, $D$, $D-m$, the floor $c_-/(4w^2)$, $G(w,\rho)$, the excursion requirements of both notes, $\kappa_a$, $\kappa_b$ and the separation cutoffs.

The chunk-1 excursion requirement $[(D-m)\sqrt{c_-\rho}-wz_0\rho]/(w^2+wz_0)$ decreases in $wz_0$ and increases in $D-m$ and $c_-$, so the bracket ends above give a lower bound. $G(w,\rho)$ is evaluated as a lower bound of $\alpha c_-$ minus upper bounds of each subtracted term.

## Order of work

A failed known case writes the partial record and stops with exit code 2 before any target. The single run passed every known case.

| Stage | What is compared | Kind of reference | Result |
| --- | --- | --- | --- |
| K0 | $\sqrt{9/4}=3/2$ exactly; the bracket of $\sqrt2$ squares to either side of 2 with width $10^{-40}$ | hand values, exact | pass |
| K1 | zero-speed limits $c=4$, $c_-=2$, $z_0=k_1=k_A'=0$, $e=1$, $G_\infty=2$ | hand values, exact | pass |
| K2 | $\alpha=81/110$, $c_1=121/90$, $c_2=301/990$, $c_3=1331/490$ at $w=1/10$ | hand values, exact | pass |
| K3 | $c(1/10)\le12.725$, $e\le3.989$, $k_1\le0.001483$, $k_A'/4\le0.7721$, $c_-/(2w)\ge7.32$ | accepted curved-window, signed-breathing and manuscript values | pass |
| K4 | $D(1/10)\ge0.19194$, $k(1/10)\le0.052624$ | accepted low-J values | pass ($0.191944300464$, $0.0526233718883$) |
| K5 | $D-m\ge0.16737$, $b'\le3.6238\times10^{-7}$, $c_-/b'\ge4043686$ at $w=1/10$ | accepted correlation-note values | pass ($0.167375153647$, $3.62378555079\times10^{-7}$, $4043686.12356$) |
| targets | chunk-1 excursion requirements and cutoffs; chunk-2 $G$, $\kappa_a$, $\kappa_b$, $2G/w$ at $w=1/10,1/20,1/100$ | exact rational | as tabulated in the notes |

K0–K2 are independent of earlier work. K3–K5 are regression checks against previously accepted values; they do not validate the new theorems.

## Run

One run, on 2026-10-20 (UTC), in the foreground through the owned-compute supervisor with owner task `saturday-agent-binary-2026-10-20`, using the shared environment's Python (`/Users/markmorris/vibe/.venv/bin/python`):

- supervisor run `42e8bec1-d3be-434f-9423-943d335b2f06`, requested 21:09:49.087Z, finished 21:09:49.302Z;
- exit code 0, nothing on standard error, process group closed by the supervisor.

Outputs are kept outside Git in `.local-data/aaa-work-threads/saturday-agents-2026-10-20/binary/`.

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `correlation_travel_constants.py` | 7,747 | `41c77071af40839f63f5cccfdeb2c1b283a93a80d1852cb8899da77f64dde1a0` |
| `run1.json` | 10,238 | `ae9049cc5cf94fb708e571bd75e0ffa5653aedacd2bdb6cd4520711fd7949fcd` |
| `run1.out` | 7,884 | `8c71d12d9d11c915df67407dc48e1d90d3d6258fce11772c37e37d1e981cb36c` |
| `run1.supervisor.json` | 2,341 | `f342621bf977cb7f5e244e49ab027a2fdf26b80e1710cc1261ec32c0847b1adf` |

`run1.stderr.log` and `run1.wrapper.err` are empty. `run1.out` is a copy of the supervisor's standard-output log. The instrument has not changed since its execution, so there is no `history/` folder. The notes round each tabulated decimal from `run1.out` in the conservative direction.

**Authority of the serialized numbers.** Inside the instrument every bound is an exact rational with the conservative bracket end. The decimal strings written to `run1.json` and `run1.out` are produced by a helper that converts each rational to floating point and formats it to the nearest twelve significant digits. They are display approximations, not directed bounds: a field named `_lo` can exceed the true lower bound in its last digit (for example `G_lo = 0.243772293255` at the floor for $w=1/10$ lies about $3.7\times10^{-13}$ above the enclosed value, and `Dm_lo` and `wz0_up` round in the wrong direction in their last digits). These fields must not themselves be consumed as certified bounds. The tabulated decimals in the notes are rounded far more coarsely and have been confirmed conservative by both independent reviews' separately authored interval arithmetic. The instrument and its outputs are preserved unchanged; a future machine-readable certificate should keep exact fractions or use directed rounding.

## The second instrument (chunk 3)

[`correlation_travel_speed_range.py`](correlation_travel_speed_range.py) is a separate file, written after the first instrument had run and after the chunk-2 round-1 review supported Theorem R; the first instrument was not modified. It uses the same square-root enclosures and the same formula for $G(w,\rho)$, with a lower enclosure (conservative ends as above) and an upper enclosure (opposite ends) of $G_\infty$. For each tabulated speed bound it doubles $\rho$ from the floor until the lower bound of $G$ is positive and then bisects over integers, keeping $G>0$ at the returned value; positivity is decided in exact arithmetic. It also evaluates the coefficients $\beta$, $\kappa_a'$, $\kappa_b'$ of Proposition S.3 with conservative ends.

| Stage | What is compared | Kind of reference | Result |
| --- | --- | --- | --- |
| K0–K2 | square-root enclosures; zero-speed limit $G_\infty=2$ for both enclosures; $\alpha$, $c_1$ at $w=1/10$ | hand values, exact | pass |
| K3 | lower enclosure of $G_\infty$ at most the upper enclosure, at $w=1/10,1/5,3/10$ | internal consistency | pass |
| K4–K5 | $G(1/10,\text{floor})\ge0.24377$, $G_\infty(1/10)\ge1.0626$, $\kappa_a\ge4.5359$, $\kappa_b\ge141.34$, $k\le0.052624$ | regression against the first instrument and the accepted low-J value | pass |
| K6 | $G(0.105,\text{floor})\approx0.096862325442$ and $G(0.11,\text{floor})\approx-0.062972214241$ to $10^{-6}$ | values computed by the chunk-2 reviewer's separately authored arithmetic | pass ($0.0968623254423$, $-0.0629722142409$) |
| targets | certified thresholds $\rho_w$ at eight speed bounds; $G_\infty$ signs; $\beta$, $\kappa_a'$, $\kappa_b'$ at $w=1/10,1/20,1/100$ | exact rational | as tabulated in the chunk-3 note |

K0–K2 rest on independent analytic hand values; K6 is the only comparison with a separately authored numerical evaluator. The `G at floor` values the chunk-3 note displays are coarse approximations, not directed bounds. The run planned to certify $G_\infty<0$ at $w=7/25$; its upper enclosure there is positive ($0.022$), so that target did not certify a sign. The negative sign at $w=3/10$ used in the chunk-3 note is the upper enclosure printed by K3 ($-0.09701757793$).

One run, 2026-10-20, supervisor run `255d4d0c-f7f6-4d89-b924-b1d28fb13164`, requested 21:29:05.763Z, finished 21:29:05.969Z, exit code 0, empty standard error, process group closed. The instrument's SHA-256 was printed by `shasum` in the same command immediately before the run.

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `correlation_travel_speed_range.py` | 7,892 | `c0e4923f2e33751eab2d29126b131398e54ff7699e76f3c6d913d1e3be7ec978` |
| `run2.json` | 3,968 | `6a089e6d3fe5ee7b6b91ec2ed78b361eaa3cb0c480db0cf692a79c0a9b307105` |
| `run2.out` | 3,088 | `fae61fa090ae77b7522b4156b80613cfce011a357b124972c514bd1976f42613` |
| `run2.supervisor.json` | 2,339 | `ba1196610bced0d50a21980943e407927309a349bd992ee4b032f2f36f556ef0` |

Its printed decimals are nearest-rounded displays, exactly as described for the first instrument above.

## Review record

Every chunk is reviewed by Codex (`gpt-6.1-sol`, reasoning effort high), run read-only and ephemeral from Bash:

```
/Applications/ChatGPT.app/Contents/Resources/codex-cli/bin/codex exec -m gpt-6.1-sol -c model_reasoning_effort=high -s read-only --ephemeral -C /Users/markmorris/vibe/architrino -o <evidence>/review/chunkK-reply-roundR.md "$(cat <evidence>/review/chunkK-request-roundR.md)" </dev/null
```

Requests, replies and responses are kept in [`review/`](review/). The reply files are the Codex-authored record and are never edited. The rounds, with their start and finish times and file identities, are listed below as they occur.

| Chunk | Round | Request SHA-256 | Started (UTC) | Finished (UTC) | Reply SHA-256 | Disposition |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | `d0384421528b5871ca1774242288b45bc75584710e2c5956a8741c0d1360ff67` | 2026-10-20T21:17:45Z | 2026-10-20T21:22:57Z | `e01f3f0da4a8f22f19263296f1d548469dee508fd69f3f80f7c9869249fdf8a1` | ACCEPT AFTER CORRECTIONS (E-RC, E-SC, E-CT, E-AR, E-FL) |
| 2 | 1 | `71974226b313446c4d665227a7b15ede16fa743efeabe9c8642ca197fcf5f9a4` | 2026-10-20T21:17:45Z | 2026-10-20T21:26:30Z | `3a7a3bc5ec2c62ce468cf235767ce2b8344670451472cd5cbcef207e50ca95ce` | ACCEPT AFTER CORRECTIONS (IW1, IW2, IW3) |
| 1 | 2 | `97f732e448e1c1fb19186144a7505deba015311263da27a2ffb9bbeae736aebb` | 2026-10-20T21:28:41Z | 2026-10-20T21:32:20Z | `8f25722faa69d687c120df4dfd847cf9b58b1363d92c39ee5bd03dec37a9f952` | ACCEPT AFTER CORRECTIONS (E-SC-LEAD, E-SC-OSC) |
| 2 | 2 | `ce6b566b12a5e0bbb721df1d05c61928d7316bddc11ab7d033276dbcac5fcbde` | 2026-10-20T21:28:41Z | 2026-10-20T21:33:25Z | `6f6cf30b1123a648333d08a7a4366f27a4a43ecd7272ece59f25af7610cbf1db` | ACCEPT AFTER CORRECTIONS (IW4) |
| 1 | 3 | `0274248d1231c8b056630dc87d79b916abbe3781807e63d5794659bdcc908388` | 2026-10-20T21:36:10Z | 2026-10-20T21:39:12Z | `5ec9c1ecdaa4cee09310638126458f09a727a86ccf98f2de47623377c2fee978` | **ACCEPT** |
| 2 | 3 | `40e31c46670a8955b325438fba3168d4a8ba047976e7741db1050094cf07f161` | 2026-10-20T21:36:10Z | 2026-10-20T21:39:49Z | `d21abf722e6af1420e61e8eab6692cd90f038a19cc89af9e6fa0e37d6438ad1e` | **ACCEPT** |
| 3 | 1 | `4470ca2d5963408e22817d2c855e29cd9b5079f3188ce2cf6c5090fa35110f1e` | 2026-10-20T21:36:10Z | 2026-10-20T21:41:52Z | `8d4f570eec126d9953881e7515455b9b1170c891c56ec2a7ea19abc2c156de0a` | ACCEPT AFTER CORRECTIONS (SR1–SR5) |
| 3 | 2 | `3c3f745f87fdd32c3d84d2ab17bfef7ec7f5e0f451e4e5ee80952500f92c474a` | 2026-10-20T21:44:03Z | 2026-10-20T21:48:10Z | `8d1e2234da2304d22714f6d5ece4840e28cd3e5e23162a37bf2c8cb781b457d4` | ACCEPT AFTER CORRECTIONS (SR5 completion, SR6) |
| 3 | 3 | `27def48e5174942c83cf5509152c138693c99af822de947df967b76f8c9b03a9` | 2026-10-20T21:49:10Z | 2026-10-20T21:52:21Z | `45dbaf76d69a1284d5a7ddf75425bad7a8162a6e5dba59e774b1757b4440f7d1` | **ACCEPT** |
