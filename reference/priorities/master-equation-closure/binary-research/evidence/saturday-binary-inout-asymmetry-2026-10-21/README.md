# Evidence for the balance-function note (2026-10-21)

This folder holds the instrument and the review record for [A balance-function obstruction to repeating two-member histories at small speed bounds](../../analysis/saturday-binary-inout-asymmetry-2026-10-21.md), written by the Saturday binary agent in the round of 2026-10-21 (owner task `saturday-agent-binary-2026-10-21`).

The note's lemmas and theorem are hand derivations from accepted inputs. The instrument checks two pieces of algebra in floating point on prescribed paths and evaluates the closed-form certificate $\Gamma(w)$ in exact rational arithmetic. It integrates no history of the Master Equation and evaluates no solution, so its agreement with the derivations is arithmetic verification by the author, not independent evidence.

## The instrument

[`balance_function_check.py`](balance_function_check.py) takes one argument, the JSON file it writes, and uses only the Python standard library (`math`, `random` with a fixed seed, `fractions`, `json`). It imports no earlier instrument.

**Part A (floating point).** It defines $\mathcal L=\tfrac12\dot r^2+\tfrac12d^2-(S_1+S_2+\dot r)/r$ and the derivative formula of Lemma Y.1, with $A_r=-\hat{\mathbf r}\cdot(\ddot{\mathbf x}_1-\ddot{\mathbf x}_2)$ and $q_i=\hat{\boldsymbol\theta}\cdot\ddot{\mathbf x}_i$ taken from the paths' own accelerations. Straight comparison rows are computed by bisection of the tangent-history delay equation $T=|\boldsymbol\rho+\mathbf vT|$, not from the closed forms.

| Stage | What is compared | Kind of reference | Result |
| --- | --- | --- | --- |
| A-K1 | straight-row strengths $1/4$, $2/5$, $1$, $8/5$ and delays $2$, $5/2$, $5/4$, $5/8$ | hand values of the accepted curved-window note (Lemma S.1) | pass, errors below $10^{-12}$ |
| A-K2 | Lemma Y.1's formula on a rigid rotation about a fixed centre, three radius pairs and three times | exact value $\dot{\mathcal L}=0$ (all terms of $\mathcal L$ constant) | pass, largest $|\dot{\mathcal L}|=6.9\times10^{-18}$ |
| A-K3 | Lemma Y.1's formula on free radial motion $\mathbf x_1=-\mathbf x_2=(r_0/2+vt,0)$ | exact value $(4v+4v^2)/r^2$ | pass, error $0$ |
| T1 | Lemma Y.1's formula against the central difference of $\mathcal L$ (step $10^{-4}$) on 400 prescribed smooth paths with speeds below $0.9$ | kinematic identity | largest scaled difference $2.92\times10^{-8}$ |
| T2 | Lemma Y.1's formula evaluated on root-solved straight rows against $(1-t_1t_2)(S_1+S_2+\dot r)/r^3$, 2000 random states with $w\in[0.01,0.33]$ and $r\in[1,10^4]$ | Lemma Y.2 | largest relative difference $1.31\times10^{-12}$ |

T1's scale is $|\text{formula}|+10^{-6}/r^2$; the reported value is a finite-difference discrepancy that includes floating-point rounding as well as truncation at step $10^{-4}$ (the chunk-1 review's separate 70-digit evaluation of the same samples puts the truncation part near $6.4\times10^{-10}$). These are floating-point comparisons without a rounding enclosure; prescribed paths do not obey the equation, so T1 checks only the kinematic identity, and T2 checks only the algebra that turns straight rows into the closed value.

**Part B (exact rational).** It evaluates

$$
\Gamma(w)=2S_w-2\hat t^{\,2}(1+w)-2w\sqrt{C_A^2+2e^2}-\frac{4w^2(C_A+\hat te)}{c_-},
$$

with $S_w=\sqrt{1-w^2}$, $\hat t=w/S_w$, $C_A=c+2(1+w)w\hat\epsilon/S_w$, $\hat\epsilon=(1+w)^2/(2(1-3w)^2)$, $e=c_3+wc$, $c$ the accepted curved-window constant, $c_3=(1+w)^3/(1-3w)^2$ and $c_-=2(1-w)^2S_w/(1+w)$. Every square root of a rational is enclosed by an integer-square-root bracket at scale $10^{40}$, proved by squaring. Lower bracket ends are used for $S_w$ and $c_-$ wherever they make $\Gamma$ smaller, upper ends for $\hat t$, $c$, $C_A$, $e$ and the square root of $C_A^2+2e^2$; the result is a lower enclosure of $\Gamma$.

| Stage | What is compared | Kind of reference | Result |
| --- | --- | --- | --- |
| B-K1 | zero-speed values $\Gamma=2$, $c=4$, $c_3=1$, $\hat\epsilon=1/2$, $C_A=4$, $e=1$ | hand values, exact | pass |
| B-K2 | $c_3=1331/490$, $\hat\epsilon=121/98$, $c\le12.725$ at $w=1/10$ | hand values and the accepted curved-window table | pass |
| B-K3 | $\sqrt{9/4}=3/2$ exactly; the bracket of $\sqrt2$ squares to either side of 2 | hand values, exact | pass |
| targets | $\Gamma$ at eight speed bounds; the largest $w=j/1000$ with $\Gamma>0$, scanning upward and stopping at the first failure | exact rational | as tabulated in the note; largest grid value $81/1000$ |

Positivity at each speed bound is decided in exact arithmetic. The decimal strings in `run1.json` and `run1.out` are produced by converting each rational to floating point and printing twelve significant digits; they are display approximations, not directed bounds, and must not themselves be consumed as certified endpoints. The note's tabulated decimals are rounded far more coarsely, in the conservative direction.

## Run

One run, on 2026-10-21 (UTC), in the foreground through the owned-compute supervisor with owner task `saturday-agent-binary-2026-10-21`, using `/Users/markmorris/vibe/.venv/bin/python`:

- supervisor run `52fdfacb-22d3-489d-8a58-29590b57db33`, requested 02:40:13.056Z, finished 02:40:13.488Z;
- exit code 0, nothing on standard error, process group closed by the supervisor.

The instrument's SHA-256 was printed by `shasum` in the same command immediately before the run. Outputs are kept outside Git in `.local-data/aaa-work-threads/saturday-agents-2026-10-21/binary/`.

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `balance_function_check.py` | 12,444 | `76dd51aff12bda5660a4b661cb3a99fc7e25509f248165576f7cb95d37925dd8` |
| `run1.json` | 5,099 | `08a8118a01a5592f4704ed72d14a4bb94a94a6f11a76c1eba97da6cb308037b9` |
| `run1.out` | 1,678 | `84616fe67fb378d47c8be63f44405f7c3837866807652bb0e52980df6090ec08` |
| `run1.supervisor.json` | 2,323 | `e4bc6b38af2a9117e7a8ff9b7d13c6e880c3e86fcc659499d437b2411f694c21` |

`run1.stderr.log` and `run1.wrapper.err` are empty. `run1.out` is a copy of the supervisor's standard-output log. The instrument has not changed since its execution, so there is no `history/` folder.

## The second instrument (chunk 3)

[`balance_function_sharpened.py`](balance_function_sharpened.py) is a separate file, written after the first instrument had run, for the note [Sharper curved-window allowances extend the balance-function obstruction to speed bound 59/500](../../analysis/saturday-binary-inout-asymmetry-2026-10-21-sharpened.md); the first instrument was not modified. It uses only the Python standard library.

| Stage | What is compared | Kind of reference | Result |
| --- | --- | --- | --- |
| A-K1 | both sides of Lemma Y.8 for a transmitter at rest now with constant acceleration toward the receiver, three cases | exact value $\tfrac14g^2\tau^4$ (the curved-window note's Sharpness example) | pass, largest relative error $3.8\times10^{-12}$ |
| A-K2 | both sides of Lemma Y.8 for straight transmitter paths | exact value $0$ | pass, $0$ |
| T3 | the two sides of Lemma Y.8 on 500 prescribed curved paths, delays root-solved by bisection; and $\boldsymbol\rho\cdot(2\mathbf e+\tau\boldsymbol\sigma)$ against Simpson quadrature of $\boldsymbol\rho\cdot\int m\,\ddot{\mathbf x}_j$ | kinematic identity | largest scaled differences $2.0\times10^{-11}$ and $4.2\times10^{-11}$ |
| B-K1 | zero-speed values $\kappa_1=0$, $\kappa_2=3/4$, $\hat\epsilon_{\rm new}=0$, $c_{\rm new}=0$, $\Gamma_{\rm new}=2$ | hand values, exact | pass |
| B-K2 | $\hat\tau=10/9$, $\hat a=1089/490$, $A_{\rm hi}=9801/4410$, $A_{\rm lo}=6561/13310$ at $w=1/10$ | hand values, exact | pass |
| B-K3 | the first instrument's lower enclosure of $\Gamma(1/10)$, re-implemented | regression against run 1 | pass ($-1.23183015728$) |
| B-K4 | square-root enclosure controls | hand values, exact | pass |
| targets | $\Gamma_{\rm new}$ and its constants at seven speed bounds; the largest $w=j/1000$ with $\Gamma_{\rm new}>0$, scanning upward and stopping at the first failure | exact rational | as tabulated in the chunk-3 note; largest grid value $59/500$, first failure $119/1000$ |

Part A is floating point without a rounding enclosure, on prescribed paths that do not obey the equation; it checks algebra only. Part B uses the conservative end of every square-root bracket, lower ends where they make $\Gamma_{\rm new}$ smaller and upper ends for every subtracted constant; the lower bound $\cos x\ge1-x^2/2$ and $\arcsin w\le w/\sqrt{1-w^2}$ enter the angle bound exactly as in Lemma Y.9. It computes lower enclosures only, so a non-positive value proves nothing about the sign of $\Gamma_{\rm new}$; the negative sign at $119/1000$ quoted in the chunk-3 note comes from the chunk-3 round-1 review's two-sided enclosure. Its printed decimals are nearest-rounded displays, as for the first instrument.

One run, 2026-10-21, supervisor run `d192a6b0-168c-4d7c-8591-3d987d3668ee`, requested 03:01:27.866Z, finished 03:01:28.567Z, exit code 0, empty standard error, process group closed. The instrument's SHA-256 was printed by `shasum` in the same command immediately before the run.

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `balance_function_sharpened.py` | 12,292 | `b37f04659ff964cec3122fb0959408df8ac1aedd6579d6f465d7ce4414a98b5e` |
| `run2.json` | 6,146 | `3e1644c39387c40a73416e5f69aced2e6dd5cf2564ca257f3be2992619d6ccb4` |
| `run2.out` | 2,218 | `dcb6c5eec8bd6f8c99fa7f1171a697749cf69c770a27025e18b52fe8da6d4261` |
| `run2.supervisor.json` | 2,331 | `c89aed512796aba9c0a7dd30ff9d5ce34ecb0bf8b110d9c117a50f058d8bf23d` |

`run2.stderr.log` and `run2.wrapper.err` are empty.

## The third instrument (chunk 4)

[`balance_function_regrouped.py`](balance_function_regrouped.py) is a third separate file, for the note [A regrouped strength allowance extends the balance-function obstruction to speed bound 129/1000](../../analysis/saturday-binary-inout-asymmetry-2026-10-21-regrouped.md); the two earlier instruments were not modified. It uses only the Python standard library.

| Stage | What is compared | Kind of reference | Result |
| --- | --- | --- | --- |
| A-K1 | $\mathbf e+\tau\boldsymbol\sigma$ and Simpson quadrature of $-\int(t-u)\ddot{\mathbf x}_j\,du$ for a constant acceleration $\mathbf g$, three delays | exact value $-\tfrac12\tau^2\mathbf g$ | pass, largest relative error $3.1\times10^{-15}$ |
| A-K2 | the same for a straight path | exact value $0$ | pass, $0$ |
| T4 | the same on 300 prescribed smooth paths | kinematic identity | largest scaled difference $2.8\times10^{-11}$ |
| B-K1 | zero-speed values $\kappa_1^{\rm reg}=0$, $\kappa_2^{\rm reg}=1/4$, $c_{\rm reg}=0$, $\Gamma_{\rm reg}=2$ | hand values, exact | pass |
| B-K2 | the chunk-3 lower enclosure of $\Gamma_{\rm new}(1/10)$, re-implemented | regression against run 2 | pass ($1.01553537382$) |
| B-K3 | the chunk-3 sign pattern $\Gamma_{\rm new}(59/500)>0$, $\Gamma_{\rm new}(119/1000)\le0$ | regression against run 2 | pass |
| B-K4 | square-root enclosure controls | hand values, exact | pass |
| targets | $\Gamma_{\rm reg}$ and its constants at seven speed bounds; the largest $w=j/1000$ with $\Gamma_{\rm reg}>0$, scanning upward and stopping at the first failure | exact rational | as tabulated in the chunk-4 note; largest grid value $129/1000$, first failure $13/100$ |

Part A is floating point without a rounding enclosure, on prescribed paths that do not obey the equation; it checks algebra only. Part B uses the same conservative bracket ends as the second instrument and likewise computes lower enclosures only; a non-positive value proves nothing about the sign of $\Gamma_{\rm reg}$. Its printed decimals are nearest-rounded displays.

One run, 2026-10-21, supervisor run `78fc0be1-bd53-4b41-8fd8-89b402251386`, requested 03:08:52.907Z, finished 03:08:53.394Z, exit code 0, empty standard error, process group closed. The instrument's SHA-256 was printed by `shasum` in the same command immediately before the run.

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `balance_function_regrouped.py` | 8,500 | `81dedb0d1d05f82556351effb4cd1cf0b2ffe6a2f6dc09582ac18a39c92f405b` |
| `run3.json` | 4,277 | `81ebe6c739357772e170992288df83bda7775e883544243abe71ac82b74e269c` |
| `run3.out` | 2,189 | `5e5abd5f036b862c7b919c4d556203925a65f36ac489e6ec2c79b1642f504d4e` |
| `run3.supervisor.json` | 2,331 | `664e19abe685e41c05db2aa3cc4a322dac007ef7cb131bf5d8701f3771f23874` |

`run3.stderr.log` and `run3.wrapper.err` are empty.

## Review record

Every chunk is reviewed by Codex (`gpt-6.1-sol`, reasoning effort high), run read-only and ephemeral from Bash:

```
/Applications/ChatGPT.app/Contents/Resources/codex-cli/bin/codex exec -m gpt-6.1-sol -c model_reasoning_effort=high -s read-only --ephemeral -C /Users/markmorris/vibe/architrino -o <evidence>/review/chunkK-reply-roundR.md "$(cat <evidence>/review/chunkK-request-roundR.md)" </dev/null
```

Requests, replies and responses are kept in [`review/`](review/). The reply files are the Codex-authored record and are never edited. The rounds are listed below as they occur.

| Chunk | Round | Request SHA-256 | Started (UTC) | Finished (UTC) | Reply SHA-256 | Disposition |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | `546e34567a719e12d3179b127be6e479ade6cecbf1259116747b77182e65c795` | 2026-10-21T02:48:46Z | 2026-10-21T02:55:34Z | `e82c1f86c2a5e3661986fcdfc8ac908b5b54436c82aa1ff45b05e57cefe9e58c` | ACCEPT AFTER CORRECTIONS (YR1–YR4) |
| 2 | 1 | `8fac9aeab733a36bca7c6ae13fdab21047f039301196cd355b25fbcea2e2d937` | 2026-10-21T02:52:59Z | 2026-10-21T02:59:11Z | `eba7f079d5693c785a8549c95af8d4b50d303a7c149f6b49b6303c1bb4ed12cb` | ACCEPT AFTER CORRECTIONS (C2-GROW; C1-RANGE on the companion) |
| 1 | 2 | `ac314b5311f5925814a455d62f821a545d5ca7d2da00dbdcd572646c9ecee5ab` | 2026-10-21T02:58:53Z | 2026-10-21T03:04:11Z | `dc6daed701fce4f7e68c67e5ee179e11fd6615f947adea81f82f854a48d9119d` | ACCEPT AFTER CORRECTIONS (YR2-REST) |
| 2 | 2 | `7f721f6178ef7a12c57d08d7fa30ad5bc8ae0e268ff8b735b53baacf37385110` | 2026-10-21T03:01:18Z | 2026-10-21T03:04:56Z | `d9a7cd10f2d870aca2e2cf205f970218073f047f56446001ae3137a069bf07a4` | **ACCEPT** (chunk-2 subject `b1ef208f…7cbf`) |
| 1 | 3 | `512b6ce575751fe77639545cd56d04800494f23656d8d28cd0e12470da562221` | 2026-10-21T03:06:15Z | 2026-10-21T03:10:40Z | `8b7c1b0991f71dc8523a1cfb3e7dc81499a75c4f5cd8a6c7ea2987717e505abf` | **ACCEPT** (chunk-1 subject `9d2b4064…64df`) |
| 3 | 1 | `0fa5b8b404217ed73e526a6770e34b57acbb6575cd6d7b661933998d0e07ec4a` | 2026-10-21T03:06:49Z | 2026-10-21T03:13:11Z | `2f6e5522c086b726791399b99c7f57a48c1befb7d44bacbb465e456cab685d32` | ACCEPT AFTER CORRECTIONS (SW-DOM, SW-SIGN, SW-LIMIT) |
| 3 | 2 | `153a2d9bec03def1371cee8172900dffbe83041da82c1077e5fd75c0173e505b` | 2026-10-21T03:15:42Z | 2026-10-21T03:21:02Z | `4b6b9d68599fa4a52ff9f269387518221f5dfaf7b8e4f8ac4799ef325e3c61cb` | **ACCEPT** (chunk-3 subject `05ed11ff…5e69`) |
| 4 | 1 | `40dcf9e42ddc860fe03af82d5d5cdfe7da0470e546633e2f00f12f20e015afe8` | 2026-10-21T03:16:01Z | 2026-10-21T03:21:58Z | `949fc8cd85807961e4f69be25d1eb7f05a6792606634b657905dcc237076589a` | ACCEPT AFTER CORRECTIONS (RG-FACTOR, RG-NEED) |
| 4 | 2 | `d4b7bd74edb20a3a8f7002268978e9cc89679ee90d50ff9664740fcda153fba3` | 2026-10-21T03:23:14Z | 2026-10-21T03:28:12Z | `8188e95b13c696fe2eb807f1b3e37bcd3746f43bc4ddeb044152d1d66bd35a5b` | **ACCEPT** (chunk-4 subject `18eb2116…df2f`) |

The Codex standard-error logs of all rounds, kept with the timing receipts in `.local-data/aaa-work-threads/saturday-agents-2026-10-21/binary/`, were not needed for any disposition; every round exited with code 0. The four subjects were accepted at these identities: chunk 1 `9d2b40644101b24dff4b42bfdfc770f80803b3629f4253a10e89147d3f0364df`, chunk 2 `b1ef208fa7263d85cd05fb3c9e46d85ca0f067366c464bfe86749e1d82217cbf`, chunk 3 `05ed11ffcf7375338abb3f68a697169c5eb042dc8363295e06cde515c9b95e69`, chunk 4 `18eb21167cd1b87231278e262b8c1caff851344d967d2b0dbe1d9986e0c1df2f`. Chunk 1's result and Section 5 describe speed bounds above about $0.081$ as open on its own constants; chunks 3 and 4 close that range up to $129/1000$ with sharper constants, and the accepted chunk-1 bytes are left unchanged.
