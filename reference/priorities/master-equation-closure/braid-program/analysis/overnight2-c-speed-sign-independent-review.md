# Independent speed-sign pilot and conditional equal-radius reduction

## Completed result

**Measured interval certificate:** all 448 closed speed cells passed both strict signs, with zero unresolved cells, using the separately authored compact-output interval instrument. The exact contiguous partition covers every speed in $[9/16,1]$, including both endpoints. Outward global lower bounds are

$$
Q_v'(\pi/2)\ge0.058906929447920082>0,\qquad
S(v)\ge0.466441426429203602>0.
$$

Every one of the seven angle channels in every cell has an ordinary root enclosure; its transmitter factor has global lower bound $D\ge0.693458369079151227>0$. Full cellwise emission-angle and factor enclosures and both signed result intervals are retained in the local full receipt.

**Derived conclusion using this certificate:** the independently reconstructed finite-orbit argument below, together with the previously checked radial polarity and lower-speed restrictions, excludes every exact distinct-member equal-radius three-neutral-antipodal-pair circular configuration for $0\le v\le1$. The logarithmic equation remains $K_{\log}=c_f=1$, with unchanged transmitter weighting and every ordinary positive-delay root. This is a full-phase equal-radius exclusion, not a numerical phase sample. It supplies no general unequal-radius exclusion, superfield result, actual-time trajectory claim, or stability result.

## Known-first execution record

Before any target run, the separately authored [speed-sign interval instrument](../evidence/overnight2-c-speed-sign-independent-check.py) passed exact endpoint decoding, outward decimal rounding of both signs of one third, the static identities $Q_0'(\pi/2)=0$ and $S(0)=0$, and a manufactured moving root at $v=1/2$, $\alpha=\pi/2$, $\beta=\pi/2-\sqrt2/2$. Its manufactured values are $B=1/(1-\sqrt2/4)$ and $B'=-(1-\sqrt2/8)/(1-\sqrt2/4)^3$. The shared venv supplied `mpmath 1.3.0`, with its interval context set to 80 decimal digits.

The known receipt `.local-data/master-equation-closure/overnight2-c/review-speed-sign-known.json` reports success, 0.03449333272874355 seconds by `time.perf_counter`, and 23,134,208 bytes peak resident memory by `resource.getrusage`. This pass is recorded before running the four-cell target pilot. No parent symbolic or probe code and no previous checker is imported. The geometric interval approach is independently authored in the new file; the earlier source remains frozen.

The declared pilot indices are 0, 149, 298 and 447 in the 448-cell partition of $[9/16,1]$ with width $1/1024$. Limits remain 120 instrument seconds, 150 supervisor seconds, 400 MB resident memory, 1 MB output, and one thread. The full 448-cell target is not authorized for execution until this pilot's measured signs and cost are reported and continuation is explicitly selected. The existing allocation clocks remain unchanged.

## Pilot result recorded before full-target selection

The four-cell pilot passed both strict signs on each whole closed cell. The smallest certified lower bounds among its cells were $0.058906929447920082$ for $Q_v'(\pi/2)$, $0.466441426429203602$ for $S(v)$, and $0.693458369079151227$ for the seven transmitter factors. Its local receipt `.local-data/master-equation-closure/overnight2-c/review-speed-sign-pilot.json` reports 0.25868850015103817 seconds and 23,314,432 bytes peak resident memory; its output-size assertion passed below 1 MB. These are pilot measurements only, with no assertion about the untested cells or their runtime.

The independent instrument SHA-256 is `581d83ad89525470b97261a17eedd60093ea4dd0661616174e9f65edf11f0416`. The pilot was reported to the parent before the full target. The parent then explicitly selected the unchanged-source full 448-cell target under the same 120-second instrument, 150-second supervisor, 400 MB, 1 MB and one-thread limits, with no extra refinement if unresolved. The full target is pending at this recorded stage.

Before launch, the parent identified that pretty-printed full JSON could exceed the unchanged 1 MB cap. No full target had started. The original source was preserved, and the explicitly authorized separately versioned [compact-output instrument](../evidence/overnight2-c-speed-sign-independent-check-compact.py) changes only `json.dumps` separators, as verified by `diff -u` between the two sources; no mathematical operation, field, limit, or selected cell changed. Its SHA-256 is `7a2b5d9fb802cdf0903577b645206fe5e1cc5ecefac6aeb6abc2041d51ec06fa`.

The compact version's known stage was rerun and passed all the same controls before any full target. Its local receipt `.local-data/master-equation-closure/overnight2-c/review-speed-sign-compact-known.json` has SHA-256 `39d148c15c6d77fbe9e513054bc5fe4fef3d1e5b226a9b399f65c52c5858efb2`, and reports 0.034511417150497437 seconds and 23,298,048 bytes peak resident memory. This pass is recorded before the compact full target. The four-cell numerical pilot is not rerun because the source diff establishes that only JSON whitespace changes.

## Independent finite-orbit reconstruction

The [frozen conditional reduction](overnight2-c-equal-radius-sign-reduction.md), whose measured SHA-256 is `a23c9c75bc51687daba95f06305fd699bf3e8a9d4c4aeb5794830309a70b7678`, is mathematically correct. Its sign premises remain distinct from the finite-orbit proof. The independently reconstructed strict convexity and endpoint divergences give $Q_v$ a unique interior minimum $m_v$. If $Q_v'(\pi/2)>0$, strict increase of $Q_v'$ puts that minimum strictly below $\pi/2$.

For positive speed, $B_v(\pi)<0$. The complete tangential equations at the three positive receivers are

$$
Q_v(\pi-x_{i-1})-Q_v(x_i)=B_v(\pi),\qquad
x_i>0,\qquad \sum_i x_i=\pi.
$$

Because $\pi-x_{i-1}=x_i+x_{i+1}>x_i$, a gap $x_i\ge m_v$ would give a positive left-hand difference on the increasing side of $Q_v$, contrary to its negative required value. Thus every $x_i<m_v<\pi/2$. Each complementary argument $\pi-x_i$ is strictly above $\pi/2$ and therefore above $m_v$.

On the finite set of attained gap values, define the successor by

$$
f_v(t)=\left(Q_v\big|_{(0,m_v)}\right)^{-1}
\left(Q_v(\pi-t)-B_v(\pi)\right).
$$

The inverse exists and is single-valued at those right-hand sides because a putative solution supplies its preimages on the strictly decreasing branch. For $t<t'$ among attained values, $\pi-t>\pi-t'>m_v$, so $Q_v(\pi-t)>Q_v(\pi-t')$ on the increasing branch. The inverse on the decreasing branch reverses this last comparison, giving $f_v(t)<f_v(t')$. The successor is therefore strictly order-preserving on its orbit; no global inverse range is presumed.

If $x_1<x_2=f_v(x_1)$, applying order preservation yields $x_2<x_3$ and then $x_3<x_1$, a contradiction. The opposite initial inequality yields the reverse contradiction, while equality propagates. Hence all gaps equal $\pi/3$ and the arrangement is the regular alternating hexagon. At one positive receiver its complete five signed rows have present angles $k\pi/3$ and polarity products $(-1)^k$, so

$$
S(v)=\sum_{k=1}^{5}(-1)^kB_v(k\pi/3)=2aA_t.
$$

If $S(v)>0$, that regular configuration cannot have the required zero tangential acceleration. The previously checked radial polarity theorem excludes nonalternating arrangements, and the radial speed theorem requires every possible exact configuration to have $v>9/16$. Consequently, once the two strict signs are certified for every $v\in[9/16,1]$, the argument excludes every distinct equal-radius configuration at $0<v\le1$. The static case is excluded separately by its radial sum. This logical implication is independently supported; it does not replace the obligation to cover the whole speed interval.

## Why the interval evaluation encloses a continuum

For any fixed present angle $\beta\in(0,2\pi)$ the complete chart root satisfies $H_v(\alpha)=\alpha-2v\sin(\alpha/2)=\beta$, with $D=1-v\cos(\alpha/2)>0$. Implicit differentiation at fixed $\beta$ gives

$$
\frac{\partial\alpha}{\partial v}=\frac{2\sin(\alpha/2)}{D}>0.
$$

Hence for a closed speed cell $[v_-,v_+]$, a lower bracket endpoint for $\alpha(v_-)$ and an upper bracket endpoint for $\alpha(v_+)$ enclose every intermediate root. At the seven distinct present-angle channels $\beta/\pi\in\{1/3,1/2,2/3,1,4/3,3/2,5/3\}$, the instrument brackets each endpoint root using exact rational bisection and an outward interval value of $\pi$. It updates a bracket only when the entire gap interval has a strict sign, checks both endpoint signs afterward, and contracts each point-speed bracket below $10^{-26}$. An ambiguous sign or nonpositive factor raises an error, rather than selecting a root or silently dropping a cell.

The interval hull of the two root brackets is then evaluated jointly with the whole speed interval in

$$
B_v=\frac{\cos(\alpha/2)}{\sin(\alpha/2)D},\qquad
B_v'=-\frac{1-v\cos^3(\alpha/2)}{2\sin^2(\alpha/2)D^3}.
$$

The loss of dependence between $v$ and $\alpha$ enlarges the enclosure; it does not omit a configuration. Taking $B_v'(\pi/2)-B_v'(3\pi/2)$ encloses $Q_v'(\pi/2)$, and the signed sum of the five hexagon channels encloses $S(v)$. Every factor and sine interval is checked positive. At $v=1$ these nonzero present angles retain ordinary positive roots, so the upper speed endpoint is admissible. The complete chart has thirty partner and zero positive self roots; the regular receiver's five rows and antipodal/rotational symmetry represent that entire history, not a selected nearest-source sum.

All transcendental arithmetic uses `mpmath.iv` at 80 decimal digits. Exact rational bracket endpoints and decoded dyadic interval endpoints are converted to reported decimals using integer floor and ceiling, so displayed intervals are rounded outward. This certificate depends on that interval library's directed arithmetic and elementary-function implementation; it is not a formal verification of the library. Analytic chart reconstruction and known controls establish the intended contract independently of the parent's numerical and symbolic proposals.

The full partition is the exactly defined list $[9/16+j/1024,9/16+(j+1)/1024]$ for $j=0,\ldots,447$. Its first lower endpoint is $9/16$, its last upper endpoint is $9/16+448/1024=1$, and consecutive cells share exactly one endpoint. Thus positive lower bounds on all cells establish continuum signs without any interpolation between sampled speeds. Until all requested cells complete, the four-cell pilot alone supplies no full-domain exclusion.

Before reading the full target with the compact receipt-summary `jq` query, that query was checked on the already inspected four-cell pilot. It returned exactly four selected and four positive cells, the known first and last endpoint pairs, and the previously recorded pilot lower bounds and resource values. This known output was recorded before applying the same summary query to the full receipt.

A separate exact receipt-coverage `jq` predicate was checked before its full-receipt use on three manufactured two-cell inventories: a contiguous inventory, one with a skipped index, and one with a gap between endpoint strings. It returned the required `[true,false,false]`. The predicate checks the full consecutive index list and equality of each cell's upper endpoint with the next cell's lower endpoint; endpoints in these receipts are canonical rational strings from `Fraction`.

## Full-target evidence and process completion

After the authorized pilot-to-full selection and the separately recorded compact-source known pass, exactly one full target was launched. The foreground repository supervisor used the actual `$CODEX_SESSION_ID` and `$CODEX_THREAD_ID`, a 150-second hard deadline, and a five-second operational heartbeat. The worker retained its 120-second instrument alarm, 400 MB measured resident-memory assertion, 1 MB output assertion, and one-thread environment. The supervisor's run ID was `f1855009-d91e-400f-a6df-57e354601eaa`.

The full receipt `.local-data/master-equation-closure/overnight2-c/review-speed-sign-full.json` reports 448 selected cells and 448 cells with both lower bounds strictly positive. The known-checked summary query confirmed those counts and the displayed global lower bounds. The separately controlled coverage predicate returned true for consecutive indices and matching rational endpoints, confirmed exactly 448 cells, first endpoint $9/16$, final endpoint $1$, and seven channels per cell. There are therefore zero unresolved cells in this declared partition. No extra subdivision or second full target was run.

The instrument measured 29.85318958386779 seconds and 26,083,328 bytes peak resident memory. The supervisor measured 29.931 wall seconds, 556,127 stdout bytes, zero stderr bytes, exit code zero, terminal status `completed`, and `processGroupClosed: true`. It started at 2026-10-07 07:40:30.587 UTC and finished at 07:41:00.504 UTC, before its 07:43:00.488 UTC deadline. Its scientific stdout was copied byte-for-byte to the review-prefixed full receipt; the original supervisor log was retained. These measurements establish actual completion and the reported resource use, not a prediction from the pilot.

The operational receipt is `.local-data/master-equation-closure/overnight2-c/review-speed-sign-supervisor.json`. The supervisor records operational ownership only; the certificate's mathematical meaning comes from the independent root and interval arguments above. No owned target remains running according to that run's terminal process-group-closure receipt. Unrelated historical leases were not altered.

Executed scientific commands, in order with the intervening known/pilot records described above:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-speed-sign-independent-check.py --stage known > .local-data/master-equation-closure/overnight2-c/review-speed-sign-known.json
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-speed-sign-independent-check.py --stage pilot > .local-data/master-equation-closure/overnight2-c/review-speed-sign-pilot.json
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-speed-sign-independent-check-compact.py --stage known > .local-data/master-equation-closure/overnight2-c/review-speed-sign-compact-known.json
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --owner-thread "$CODEX_THREAD_ID" --deadline-seconds 150 --heartbeat-seconds 5 -- "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-speed-sign-independent-check-compact.py --stage full > .local-data/master-equation-closure/overnight2-c/review-speed-sign-supervisor.json
```

The exact full-receipt coverage query, after its manufactured controls, was:

```bash
jq 'def covered: . as $d | (.selected_indices == [range(0;(.cells|length))]) and all(range(0;(.cells|length)-1); $d.cells[.].v[1] == $d.cells[.+1].v[0]); {exact_contiguous_coverage:covered, count:(.cells|length), endpoint_check:(.cells[0].v[0]=="9/16" and .cells[-1].v[1]=="1"), all_signs_positive:all(.cells[];.both_strictly_positive), seven_channels_each:all(.cells[];(.channels_beta_pi|length)==7)}' .local-data/master-equation-closure/overnight2-c/review-speed-sign-full.json
```

## Artifact identities and falsifiers

Measured SHA-256 identities from `shasum -a 256`:

- Frozen conditional proof: `a23c9c75bc51687daba95f06305fd699bf3e8a9d4c4aeb5794830309a70b7678`.
- Preserved original independent instrument: `581d83ad89525470b97261a17eedd60093ea4dd0661616174e9f65edf11f0416`.
- Compact-output instrument actually run for the full target: `7a2b5d9fb802cdf0903577b645206fe5e1cc5ecefac6aeb6abc2041d51ec06fa`.
- Original known receipt: `3af43b7118d60f7bc813b72314f197e0ac289f8fc7e72a9b949b59c9010eb807`.
- Four-cell pilot receipt: `119f6ac828df64e89f3940f655bfb633eb25944cae4cabc4240b0084b34ddb0d`.
- Compact-version known receipt: `39d148c15c6d77fbe9e513054bc5fe4fef3d1e5b226a9b399f65c52c5858efb2`.
- Full 448-cell receipt: `cdc6c3a32427fbd15f6f3e62d95e0c9e13866f3fdb6515086e790ef849caa48a`.
- Supervisor terminal receipt: `06ccc418e477009aaf9902558f1bdd8d81f15e78ade649994fe331df426fbc85`.

A failed root bracket, an inward interval arithmetic or decimal-rounding operation, an incorrectly signed row or derivative, a skipped speed cell, or a nonpositive exact value inside a purported positive enclosure would falsify the numerical certificate. A defect in strict paired convexity, the left/right branch placement, the finite order-preserving cycle argument, or the previously reconstructed radial restrictions would separately reopen the derived phase-wide exclusion. The proof does not infer equal gaps from convexity alone: it uses the certified derivative sign, the negative own-antipode term, and the linked complete equations.

Writes were confined to the authorized new independent reviews/instruments, review-prefixed runtime receipts, and the repository supervisor's automatic operational records. Parent subjects, symbolic code, prior probes, main report, shared owners and earlier evidence were preserved. No recursive delegation, other-chat message, Git mutation, new phase grid, or old-cover rerun occurred. The original launch 03:25:15 UTC, exploration stop 13:55:15 UTC, and hard deadline 15:25:15 UTC remain unchanged. The parent owns integration; only the separately assigned compact-neighborhood corollary remains for this reviewer.
