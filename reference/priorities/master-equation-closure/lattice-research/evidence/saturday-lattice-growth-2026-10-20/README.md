# Evidence for the band envelope and the later barrier of the localized lattice family (2026-10-20)

This folder holds the six instruments written for the note [The localized lattice family measured by its actual growth band](../../analysis/saturday-lattice-growth-2026-10-20.md) (chunk 1) and its companions on the signed receiver cubic (chunk 2), the chart radius (chunk 3), tube constants (chunk 4), the tube estimate on a larger chart (chunk 5) and row constants for slow sources (chunk 6), the lattice task of the Saturday research agents of 2026-10-20 (owner task `saturday-agent-lattice-2026-10-20`). The notes' lemmas are hand derivations. The instruments evaluate their closed-form bounds, the barrier conditions and the obstruction certificates in exact rational arithmetic from declared constants, and the second encloses two lattice sums. It integrates nothing, evaluates no history and proves no lemma, so its agreement with the derivation is not independent evidence. The `review/` folder holds the Codex review rounds.

## The instrument

[`band_barrier.py`](band_barrier.py) takes one argument, the JSON file it writes. Its imports, all by file path and none modified:

- the frozen instrument [`signed_barrier.py`](../saturday-summed-signed-lattice-remainder-2026-10-18/signed_barrier.py) of the accepted October 18 note (SHA-256 `267a234e5e68c84d764e95ad0479465f1e6c3e32c871a42f792f5defb9699c82`), for its exact polynomial $F_{\rm sgn}$, chart parameters, per-offset polynomials, lattice-sum routine and declared constants;
- through it, the frozen evolved-history instrument (SHA-256 `b50b95f3…38d2`) and extension instrument (SHA-256 `8c111d04…6a85`), for row constants, exact rounding helpers and the interval exponential and logarithm (`mpmath.iv`, 50 digits).

Importing the extension instrument runs its lattice census; no lattice sum is enclosed in these runs. The only change made to an imported parameter dictionary is the value of the source factor $\mu$, replaced by the band factor $\tilde\mu$ of the note's Corollary B.3.

**Declared inputs from accepted notes:** $2.7952<\lambda_g<2.7953$, $h'(\lambda_g)\ge4.2797$, the perturbation coefficient $31.854$, the slope $(\lambda h)'\ge10.021$, $\lVert P(k)-P(Q)\rVert\le0.00725$, $p_0=0.0763$ (quantification note); $K_1=31.9$ (extension note); $\varepsilon\le0.00646$; and, for the accepted endpoint, $0.0277$, $0.1144$, $2.8953$, $22.5$. **Declared values of the note, checked against their exact sources:** $\underline\lambda=2.7872$, $\overline\lambda=2.8033$, $\bar P=0.09085$, $\tilde\Lambda=0.0983$, $\tilde\mu(1/16)=0.92274$ (upper decimal of an interval exponential), the triple $(1/16,0.0305,15.5)$ and the ladder pairs $(0.020,6)$, $(0.025,8.5)$.

**What it computes:**

- T1: the band $\lambda_g\pm31.854/(400\times10.021)$, the bounds $\bar P$ and $\tilde\Lambda$, the third-derivative ratio $\overline\lambda/a$ and $\tilde\mu$;
- T2: nonnegativity of every coefficient of $F^{\tilde\mu}_{\rm sgn}$ on the chart $1/16$; conditions (a), (b), (c) of Theorem B.5 for the main triple and the ladder; the three parts of $C_LF$ at each point;
- T3: the concave-maximum certificate of Proposition B.8 on the chart $1/16$, for seed sizes from $0.0305$ upward in steps of $0.0001$, stopping at the first certified size;
- T3b (version 2): the same certificate for the radius-zero envelope over all $y\ge0$;
- T3d (version 2): the certificate with one part of $F$ deleted (orientation only; not a valid estimate);
- T3c (version 3): the two chart ranges of Proposition B.8, with lower-rounded constants at $\rho=1/16$ for $\rho\ge1/16$, and the radius-zero envelope on $y\le(1/16-d)/2$ for $\rho\le1/16$;
- T4: lower bounds of $\tilde T(\varepsilon)$, upper bounds of $T_N(\varepsilon)$ and their difference;
- T5: central lower bounds at $\tilde T$, at the ladder points and at the accepted $T_N$, time-zero upper bounds, growth factors and the positivity check at $\varepsilon=10^{-37}$;
- T6: all-label bounds at the main endpoint.

Every comparison is exact; logarithms and exponentials are interval operations whose endpoints are converted exactly to rationals. The final flag `all_targets_pass` aggregates T1, T2 (including coefficient nonnegativity and the start conditions) and the positivity check of T5 only. It does not aggregate the certificates of T3, T3b, T3c and T3d or the domination checks of T3b and T3c; those results are recorded individually in the JSON output (`certified_no_barrier`, `d_star`, `envelope_below_chart_1_16_coefficientwise`, `lower_rounded_1_16_below_declared`) and were read from it. The same holds for `receiver_cubic.py`, whose flag does not aggregate its obstruction certificate R3. Printed and JSON decimals are floats for display; the note's decimals are rounded in the conservative direction from them.

## Order of work

A failed known case writes the partial record and stops with exit code 2 before any target. All three versions passed every known case at their first execution.

| Stage | What is compared | Kind of reference | Result |
| --- | --- | --- | --- |
| KC1 | frozen $\mu(1/16)\le0.83946$ and $C_LF_{\rm sgn}(0.0277,22.5\times0.0277^2)\in(0.0130738,0.0130739]$ | accepted regression value (same author; its exact value was reproduced by the independent October 18 review) | pass ($0.0130738465\ldots$) |
| KC2 | the univariate expansion in $y$ equals the frozen $F_{\rm sgn}$ exactly at three points for two values of $\mu$ | frozen code, separate code path | pass |
| KC3 | rational Taylor bounds $1-x+x^2/2-x^3/6\le e^{-x}\le1-x+x^2/2$ bracket the interval $e^{-0.0804125}$ | exact, independent | pass |
| KC4 | certificate on $y-y^2-1/8$ (maximum $1/8$, must not certify) and $y-y^2-1/2$ (maximum $-1/4$, must certify with bound $\ge-1/4$) | hand values | pass |
| KC5 | accepted growth emptiness at $T_N$: linear part below $0.014770$ and lower bound negative at $\varepsilon=0.00646$ | accepted value (October 18 note) | pass |
| KC6 | $\tilde\mu(1/2)=1$ and $\tilde\mu(1/16)<1$ | exact | pass |

KC2 and KC3 and KC4 are independent of earlier numbers; KC1 and KC5 are regression checks against accepted same-author values. None validates Lemmas B.1–B.2, Corollary B.3 or Theorem L.4 with $\tilde\mu$, which are hand derivations.

**Versions.** Version 1 (`history/band_barrier.v1.py`) ran T1, T2, T3, T4, T5 and T6. Version 2 (`history/band_barrier.v2.py`) added T3b and T3d after the version-1 targets. Version 3 (`band_barrier.py`) added T3c. No earlier function or target was changed; the docstring gained one sentence per version. The version-2 docstring sentence was inserted by a short text-replacement script run with the shared environment's Python outside the supervisor; it was a file edit, not a computation, and later edits used an editor.

## Runs

All runs took place on 2026-10-20 (UTC), in the foreground through the owned-compute supervisor with the shared environment's Python (`/Users/markmorris/vibe/.venv/bin/python`), each with exit code 0, closed process group and empty standard error and wrapper files. Outputs are kept outside Git in `.local-data/aaa-work-threads/saturday-agents-2026-10-20/lattice/`, with a copy of the exact source of each run (`band_barrier.runN-source.py`).

| Run | Version | Run id | Requested | Finished |
| --- | --- | --- | --- | --- |
| 1 | v1 | `0059c8ac-549d-4c09-a0ee-13cdee665956` | 21:04:13.307Z | 21:04:13.551Z |
| 2 | v2 | `7354bacf-d313-4e0f-9a18-5d6bd392fe7d` | 21:05:44.973Z | 21:05:45.768Z |
| 3 | v3 | `2f0329ae-e161-4627-be1c-38d2c0951599` | 21:06:46.599Z | 21:06:47.513Z |

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `band_barrier.py` (v3) | 21,004 | `1a581dca4db57e1358356a75d0cb7c8704402414fd9e1f9ea5d1cf8f7533bdd6` |
| `history/band_barrier.v1.py` | 15,209 | `836493d065a180f941701c43043f2652230b30094080753d3036af6627ec2f9d` |
| `history/band_barrier.v2.py` | 17,892 | `faa042772421b2b98a2dcab6c8b29b36cd48140677c1114b145e3224e667f4ba` |
| `run1.json` | 12,568 | `fcf929b28d6775467c5e6fe59a29848769963aa08f9ca7f22ffce5e7b83693ff` |
| `run1.out` | 7,275 | `29d3c537d80e9813a2cad1c07d5a61583cc52f36800a805e589f0646429f3bc5` |
| `run1.supervisor.json` | 2,292 | `63f90ee3d4d34d0f702a5a5b47f878e3b4f50166edb8caa298873ea76e27ab14` |
| `run2.json` | 41,008 | `577de7999cb8fe58d4aae92512d4fda80d1b51689f4c3bd066fa4a57f441c7f0` |
| `run2.out` | 7,578 | `a116ffa54ae785a079b3f024601b54520e5efb3420f906dc929f8dedf0193014` |
| `run2.supervisor.json` | 2,292 | `e5bbea96d8cf03d0f70e102ad3a733fdf5e36af801e473f2650c7922bdc2e771` |
| `run3.json` | 41,344 | `4c48b194396b028dc79bbccc2289cfedaed577483b6fde287f232615b62bf17c` |
| `run3.out` | 7,810 | `94f12910dc775552d2db99e4910535077ebcd016a175c24bee2332429429e3ed` |
| `run3.supervisor.json` | 2,292 | `13f56c88d49a3cf709d53fe5e11a9c0f94c00e33d08e09627cb985b58c1e3929` |

Each `.out` file is a copy of the supervisor's standard-output log. The target records of run 3 are byte-identical, as JSON, to those of runs 1 and 2 for every target the earlier versions had; that shows determinism of the code, not independent evidence.

**Exploration, not evidence.** Before the instrument, the scratch script `.tmp/saturday-agents-2026-10-20/lattice/scratch_explore.py` (SHA-256 `f5d914e3…6c34`) ran once through the supervisor (21:00:43.702Z to 21:00:44.075Z; output `scratch1.out`, SHA-256 `6de868d6…86d9`). For seed sizes $0.0200$ to $0.0395$ in steps of $0.0005$ it reported the first $K$ on a half-grid below $100$ passing the barrier with $\tilde\mu$ on the chart $1/16$, and whether the chart condition then held. It was used to choose the declared triple and ladder. The note quotes nothing from it; its grid supports no optimum.

## What this can and cannot establish

It establishes that the displayed inequalities and certificates hold exactly for the declared constants, given the interval library's outward rounding for the exponentials and logarithms. It does not establish the lemmas, the residue representation or the accepted inputs (lattice sums, contour constants, linear-inverse norm), which rest on the accepted notes and their interval enclosures. The hypothetical deletions of T3d are orientation numbers for an invalid estimate and support no barrier claim. Nothing is computed on a history.

## The receiver-cubic instrument (chunk 2)

[`receiver_cubic.py`](receiver_cubic.py) serves the note [The signed receiver cubic of the localized lattice family and a further barrier](../../analysis/saturday-lattice-growth-2026-10-20-receiver-cubic.md). It imports `band_barrier.py` (version 3, frozen after its run 3) unchanged by file path, and through it the frozen accepted instruments. It encloses, with `mpmath.iv` at 50 digits over the cube of half-width $40$ grouped by $(d_1^2,r^2)$, the signed cubic-harmonic constant $H_{1111}=\sum_d\sigma_d\,\partial_1^4(1/r)$ (tail at most $312/40^2$) and $Z_7$ (tail $\sum_{m>40}(24m^2+2)m^{-7}$ bounded by its integral), and as known cases $Z_4$ and $Z_5$. It then replaces only the receiver coefficient $c_{E3}$ of the band parameter dictionary by $c_3+c_5\rho^2$ and evaluates the barrier, ladder, start, obstruction certificate, times, growth and all-label bounds of that note.

| Stage | What is compared | Kind of reference | Result |
| --- | --- | --- | --- |
| KC1 | census against $r_3(n)$, $n=1,\dots,12$, and the total count $81^3-1$ | classical counts, independent | pass |
| KC2 | $Z_4$ enclosure contains $16.5323$ | literature value | pass ($[16.2744,16.8745]$) |
| KC3 | $Z_5$ upper endpoint at most the accepted $10.3824$ | accepted declared value | pass ($10.38235\ldots$) |
| KC4 | nearest-shell part of $H_{1111}$ equals $-84$ | hand value | pass |
| KC5 | on a symmetric cube of half-width $10$, the direct sum $\frac16\sum\sigma_d\partial^3G(d)[\alpha^3]$ equals $\frac H{12}(3\alpha-5\alpha^{\circ3})$ for five random unit $\alpha$ | floating check of the symmetry reduction | pass (relative $6.1\times10^{-15}$) |
| KC6 | $\lvert3\alpha-5\alpha^{\circ3}\rvert\le2$ on $20000$ random unit vectors | floating sample | pass (largest $1.99983$) |

KC6's printed label also mentions the value $2$ on an axis; the code does not evaluate that case, which is the hand value $\lvert3-5\rvert=2$. KC5 and KC6 are samples and prove nothing between their samples; Lemma R.1 is the hand proof.

| Run | Version | Run id | Requested | Finished |
| --- | --- | --- | --- | --- |
| rc1 | v1 | `2363dc53-dc39-42b6-b94a-d3320955b654` | 21:19:28.288Z | 21:19:29.720Z |

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `receiver_cubic.py` (v1) | 10,898 | `ee37eb8f4414e70e9d2771b840945dbda9d086c1c0709b6f4e6936190becd3ca` |
| `rc_run1.json` | 8,679 | `d50df29f18375c76520aed922e6b4eaddc91a6844924fbd7d3f07f4c1d8685bf` |
| `rc_run1.out` | 5,157 | `9d2d693fab5a83b68f9b9100b0a7b0c3a00b0821db8fe0b444bea740ade3d84a` |
| `rc_run1.supervisor.json` | 2,289 | `9f36b2973aa178c32252aa323860abda646884921a04fb834b4c688f18c18192` |

The run exited with code 0, closed its process group and wrote nothing on standard error. Two scratch scripts preceded it, both run once through the supervisor and both exploration rather than evidence: `scratch_explore2.py` (21:17:43.944Z; first half-grid $K$ on the chart $1/16$ for receiver constants $14.8$, $15.5$ and $57.346$ at seed sizes $0.030$ to $0.0395$) and `scratch_explore3.py` (21:19:16.000Z; the same at $0.015$ to $0.033$ for $14.8$). They chose the declared pair $(0.033,12.5)$ and the ladder; the ladder values in the instrument were set from scratch 3 before its first and only run.

## The chart-route instrument (chunk 3)

[`chart_route.py`](chart_route.py) serves the note [The chart radius does not carry the localized-family estimate further](../../analysis/saturday-lattice-growth-2026-10-20-chart.md). It imports `band_barrier.py` unchanged and takes the signed receiver constant $c_3\le14.3469$ and $Z_7\le7.46706$ as declared inputs from chunk 2. It builds lower-rounded polynomials from the frozen per-offset routines (every chart constant from lower interval endpoints, receiver coefficient lowered to $c_3$), runs an adaptive partition of chart radii $[d_T,1/\bar a)$ with bounded concave-maximum certificates, and checks the pair $(0.0334,13)$ on the chart $1/16$.

Known cases before targets: KC1 lower-rounded chart-$1/16$ constants below the declared ones and within $0.1$ percent (pass); KC2 the chunk-1 certificate value $-8.2514\times10^{-5}$ at $d=0.0317$ reproduced (pass); KC3 the bounded certificate on two hand polynomials, values $1/16$ and $-7/200$ (pass); KC4 constants and summed coefficients nondecreasing from $\rho=0.07$ to $0.08$ (pass, a sample of Lemma C.1). Results: the pair $(0.0334,13)$ passes with $C_LF=0.0143449\ldots<0.01450228$; the partition at $d_T=0.034$ is fully certified with $81$ intervals, largest bound $-8.97\times10^{-6}$. The flag aggregates the pair checks and whether a $d_T$ was certified.

Run cr1, v1, run id `d9334c97-cecf-46fb-b258-85964d515f66`, requested 21:29:02.132Z, finished 21:29:02.594Z, exit 0, empty standard error. `chart_route.py` 8,526 bytes, SHA-256 `09eb16a1ede5d16d8ccf5f659068f32527bbdda6c0d76735fdd5151b6634a5cf`; `cr_run1.json` 11,113 bytes, `a825300f22bf62f1ce825df16a684f80a8a0e1930b438b3d14fa257abe4c8a63`; `cr_run1.out` 1,170 bytes, `908513973dac0f337925ded079db33a0b38d7ef31655e55c6b6b52fc85f2bf8a`. One no-op `sed` substitution (a pattern replaced by itself) was applied to the source before its copy and run.

Exploration before it, not evidence: `scratch_explore4.py` (21:27:06.633Z), which recorded the largest passing half-grid seed size on seven chart radii (quoted in the note as exploration). After it, `arith_c4.py` (21:29:31.385Z) evaluated by exact fractions, without importing any instrument, the all-label products of the pair $(0.0334,13)$ quoted in Corollary C.3; output `arith1.out` (SHA-256 `0d14ce6a…a4ae0`).

## The tube-constant instrument (chunk 4)

[`tube_barrier.py`](tube_barrier.py) serves the note [Tube constants](../../analysis/saturday-lattice-growth-2026-10-20-tube.md). It imports `band_barrier.py` unchanged and builds the parameter dictionary from the tube sizes of Lemma T.1 through the frozen per-offset and summation routines, with every derived constant rounded outward; the lower envelope of Proposition T.5 uses lower interval endpoints and no upward rounding.

| Stage | What is compared | Kind of reference | Result |
| --- | --- | --- | --- |
| KC1 | the builder fed the chart-$1/16$ inputs reproduces the frozen band parameters exactly and the chunk-1 value $C_LF(0.0305,15.5\cdot0.0305^2)=0.0143654990\ldots$ | frozen code; accepted chunk-1 value | pass |
| KC2 | $\eta_0=1.40062\ge e^{2\bar a/16}$ and $s_{1,0}=0.09459\ge\eta_0e^{-a}$ | accepted declared values | pass |
| KC3 | tube constants and summed coefficients nondecreasing from sizes $(0.030,0.0027)$ to $(0.043,0.0120185)$ | sample of the monotonicity | pass |
| KC4 | lower envelope at $d=0.044$ below the declared tube constants at sizes $(0.044,0)$ | sample of the envelope ordering | pass |

Targets: the ladder $(0.030,3)$, $(0.035,4)$, $(0.040,5)$, $(0.043,6.5)$ with chart caps, barrier, start conditions and coefficient signs; times, growth and all-label bounds; and the certificate of Proposition T.5 on a grid from $0.0430$ upward in steps of $0.0001$, first certified at $0.0449$. The flag aggregates the ladder conditions and the positivity at $\varepsilon=10^{-37}$, not the certificate.

Run tb1, v1, run id `b7017135-e78f-4314-814c-dd447a33ce93`, requested 21:36:55.843Z, finished 21:36:56.154Z, exit 0, empty standard error. `tube_barrier.py` 12,523 bytes, SHA-256 `4d365ceaab577d9378cc80d507da7627ac9d75f0c0a3804405d6bbf80aecc924`; `tb_run1.json` 14,545 bytes, `1fd72f42e201b8c06b99fc1ddd9638874da58117452798098d89388a4f724578`; `tb_run1.out` 7,707 bytes, `d8fe2561f09bec56e558923e715ec904825e5b5129b59ee8c7a4527218cdb185`.

Exploration before it, not evidence: `scratch_explore5.py` (21:33:11.034Z) with tube constants and the accepted chart caps, and `scratch_explore6.py` (21:34:48.226Z) with the caps relaxed to displacement $1/8$ and speed $1/2$; their first passing half-grid coefficients guided the declared ladder, and the relaxed-cap reach of about $0.047$ is quoted in the note only as exploration. After it, `scratch_breakdown.py` (21:48:24.967Z, output `scratch8.out`) split the half odd sum at the endpoint into the term groups of Lemma L.2, as orientation for the final report only.

**Label of one output field (review finding TC4).** The fields `T_C_upper` and `gain_over_T_C` of `tb_run1.json` compare with the endpoint of the chart-route note, $T_C(\varepsilon)=\ln(0.0334/(0.0983\varepsilon))/2.8033$, not with the receiver-cubic endpoint $\hat T$ (seed size $0.033$). The tube note does not quote these fields; its comparison $T_U-\hat T\ge0.0944$ is a hand logarithm, independently confirmed by the review. The frozen source and output are unchanged.

## The chart-aware tube instrument (chunk 5)

[`tube_chart.py`](tube_chart.py) serves the note [Route (a) for the tube estimate](../../analysis/saturday-lattice-growth-2026-10-20-tube-chart.md). It imports `tube_barrier.py` unchanged (frozen after run tb1) and computes the tube sizes of Lemma G.2 with the a priori delay $A_*+\rho_c$ for the chart caps $(1/12,\,0.3)$, the ladder $(0.040,5)$, $(0.043,6.5)$, $(0.0465,9.5)$, times, growth and all-label bounds, and the all-chart certificate of Proposition G.4 from $0.0460$ upward in steps of $0.0001$ (first certified at $0.0526$). Known cases ran before the instrument's formal target loop (see the chronology note below): KC1 the chunk-4 endpoint value reproduced through the frozen code (pass); KC2 the chart-aware a priori sizes for $\rho_c=1/16$ no larger than chunk 4's (pass); KC3 the lower envelope below the chart-aware constants at sizes $(0.046,0)$ (pass). The flag aggregates the ladder conditions and positivity at $10^{-37}$, not the certificate.

Run tc1, v1, run id `76f06658-d971-4a83-9d6d-e56078da5f3c`, requested 21:46:14.608Z, finished 21:46:15.453Z, exit 0, empty standard error. `tube_chart.py` 9,596 bytes, SHA-256 `74be72c60840b8edaa5284a81166f29bfba337297b02b5fffce5e784fb2d1ceb`; `tc_run1.json` 7,745 bytes, `ec8169b05aab023279571e42ea7fb6f91d868e5c09871773d2d4bc5c4f76a63c`; `tc_run1.out` 4,911 bytes, `d0df8824d6aff567bdc25edf96ea9f67a1ac97322269e0db57f1be0d6f2bb1f3`. **Chronology (review finding GC3).** The exploration `scratch_explore7.py` (21:45:18.912Z, output `scratch7.out`) imported this instrument's functions (`tube_params_chart` with the frozen `F_sgn`) and evaluated the barrier at every chart configuration later declared, including $(0.0465,9.5)$; it did not call the instrument's `main()` and so ran none of its known cases. The known cases therefore preceded the instrument's formal target loop, not every evaluation of those configurations. After the exploration, the declared main pair in the source was changed from $(0.046,8.5)$ to $(0.0465,9.5)$ before the first and only formal run; no pre-change snapshot of the source was retained, so that earlier value is the author's record only.

## The small-source-speed instrument (chunk 6)

[`sharp_barrier.py`](sharp_barrier.py) serves the note [Row constants for slow sources](../../analysis/saturday-lattice-growth-2026-10-20-sharp.md). It imports `tube_chart.py` unchanged (frozen after run tc1) and through it the tube-constant, band-envelope and accepted instruments, and replaces only the seven row constants of the parameter dictionary by those of Lemma H.1 at the tube source speed. Known cases ran before its targets: KC1 rest values $(6,2,2,24,6,6,6)$ (pass); KC2 the new constants at most the Q1/L.1 constants at speeds $0.01$, $0.1$, $0.1685$ (pass); KC3 a sampled finite-difference check at $400$ random arguments with source speed up to $0.03$, ratios to the bounds $0.975$ ($c_{20}$), $0.915$ ($c_{11}$), $0.961$ ($c_{30}$), $0.822$ ($c_{21}$), $0.617$ ($c_{12}$) (pass; a sample, not a proof); KC4 the builder with the Q1/L.1 constants reproduces the chunk-4 endpoint value (pass). Targets: the accepted-chart ladder $(0.044,4.5)$, $(0.047,5)$; the chart-$(1/12,0.3)$ ladder $(0.050,6.5)$, $(0.052,8)$; times, growth and all-label bounds; certificates inside the accepted chart (first certified at $0.0482$) and for all charts (first at $0.0592$). The flag aggregates the ladder conditions and growth positivity, not the certificates.

Run sh1, v1, run id `913f3b49-c4d6-41ef-8e2e-9bf95578cfa3`, requested 22:00:41.836Z, finished 22:00:43.171Z, exit 0, empty standard error. `sharp_barrier.py` 11,979 bytes, SHA-256 `ff44e809c2b201c8c6a59d9dc554d1ca7dc97ede5ada5291402c1a15911dc9cc`; `sh_run1.json` 11,313 bytes, `8457f9fe339f18a0fbfd6157801d066dde025fd5ee1b7e25696fba632e53398b`; `sh_run1.out` 7,239 bytes, `774c7e01ab43b2b96296c5f7f2a28d457d9dd1a5453846e6220141dc6f78e617`. Before the instrument was written, the exploration `scratch_explore9.py` (21:58:56.952Z, output `scratch9.out`), with its own implementation of the Lemma H.1 constants and importing `tube_chart.py`'s size routines, evaluated candidate pairs on both charts; it chose the declared ladders.

## Codex review

The review rounds are recorded in `review/`: each request, the Codex-authored reply (never edited) and the author's response. Command, for round $R$ of chunk $K$:

```text
/Applications/ChatGPT.app/Contents/Resources/codex-cli/bin/codex exec -m gpt-6.1-sol -c model_reasoning_effort=high -s read-only --ephemeral -C /Users/markmorris/vibe/architrino -o <evidence>/review/chunkK-reply-roundR.md "$(cat <evidence>/review/chunkK-request-roundR.md)" </dev/null
```

| Chunk, round | Started | Finished | Request SHA-256 | Reply SHA-256 | Disposition |
| --- | --- | --- | --- | --- | --- |
| 1, 1 | 21:14:35Z | 21:22:20Z | `f4080407f98c430caf55c2be37062a1fa90fe88a38556f16a08d827bfe757274` | `d95f06ee641c061efefff0b37a5d149bbc2ede6af72cee54a182c8c15200f333` | ACCEPT AFTER CORRECTIONS (BG1, BG2) |
| 1, 2 | 21:26:04Z | 21:31:26Z | `e9e57e2f3af5e8b74928bcb52d8e1ad50faa67b1ed9781f3fcaddbb8920ee6b4` | `eefbb1e4c029597142c2bff0fce3efa3dba868c00b35e9393288cf200ef1d6dc` | ACCEPT |
| 2, 1 | 21:26:04Z | 21:32:38Z | `3d06fc5169501198be53ecd483c51ce0d9a07765f98ffe2133eb1721dc4c12f1` | `3690b774ede9cbd22f55cf31d17df5a9746e12d2d6c84d7ff09a4a0e017e0cde` | ACCEPT AFTER CORRECTIONS (RC1–RC3) |
| 2, 2 | 21:43:17Z | 21:47:08Z | `bdb49ed904c6b9a4af66375885c98f65ebd259487433c5e38a44a03c03831412` | `6f715b50ffbbd577c6b6cc55081926617f6ac222830f7eac55f57b76c99cd34f` | ACCEPT |
| 3, 1 | 21:43:17Z | 21:50:00Z | `47c8c2f609b0bddc90b24dd7bb90e6e942131003c7d14f1fccbacb54b93f903f` | `2a8b6322145c272543c55e70989ddbb35b6027bc405488ea21a970a774213b6d` | ACCEPT AFTER CORRECTIONS (CR1, CR2) |
| 4, 1 | 21:43:17Z | 21:50:47Z | `db6c674772774e8fa45389ffe477e265c90a73c4de5f18a1857cccfae7bb5a82` | `1f7532ca37e08347034442748bc13a52a09b0b9a0e4292f283a5bf33a8c08ef5` | ACCEPT AFTER CORRECTIONS (TC1–TC4) |
| 3, 2 | 21:57:09Z | 21:59:20Z | `e795abd0fb4e16dea811415c6103c68ee94386d3c854dc8210e7604b3b1c7066` | `b83d442bea0282e4518ce33b7444befb7ae25d79a49e145a9779ba4a601db9d2` | ACCEPT |
| 4, 2 | 21:57:09Z | 22:01:35Z | `204d9c78974c5dda6bf2b748e36705422ad076c755a4876f97a62413b7998324` | `9dc1705713039414da3231f13436f9cf9bf9132af905ef5ddf2900c28f34fe7e` | ACCEPT |
| 5, 1 | 21:57:09Z | 22:03:37Z | `0175c7854fb9dbab4b9fd86cda97a063472233ee83b94160040389ae6eafa0a4` | `28b243ce8b849028b01efc8633dbe77c58ed32b7763d75b88bf90bfc6d13a6ff` | ACCEPT AFTER CORRECTIONS (GC1–GC3) |
| 5, 2 | 22:07:00Z | 22:11:13Z | `1e49e93d241b29b850d4a860115e05bb111adeea981955aa57738ac095728549` | `f8ab677f9c5e243cdc871d8d14cf51ff0da477b5602a0079dbf2c89b2e0e7052` | ACCEPT |
| 6, 1 | 22:07:00Z | 22:13:36Z | `c65472a748ff8af604d19e8fddd4544ff1d77da2f81426f62a1f09a8593d4d00` | `eff93aa090cf676c74f07d0a1887927d352301deebf15a66cefd3073c36bb8d9` | ACCEPT AFTER CORRECTIONS (HS1) |
| 6, 2 | 22:15:18Z | 22:17:33Z | `507245c531bdee041e3d48cf0056e34e006ce0dd9ebdce3d6da37438cc863a3f` | `792ac408d80f91b1e3b395db340cb6a22fe063414ef00ed04d8f786cf5cffcae` | ACCEPT |

All six chunks are accepted at the identities recorded in the final round of each. The authors' responses (`chunkK-response-roundR.md`) list every change between rounds, and the bytes sent for each round are retained under `.local-data/aaa-work-threads/saturday-agents-2026-10-20/lattice/reviewed/` (copies made from round 2 of chunk 1 onward; the round-1 chunk-1 subject and README were not retained, and the reviewer reconstructed the round-1 chunk-1 subject from its transcript).

Exploration scripts and outputs not listed above: `scratch_breakdown2.py` (22:07:33.815Z, output `scratch10.out`) split the half odd sum at the chunk-6 accepted-chart endpoint into the term groups of Lemma L.2, as orientation for the final report only. Check runs `check1` to `check9` ran the KaTeX, link and whitespace checks through the supervisor.

Times are those of `date -u` immediately before the call and after it returned.
