# Independent review of the seed-2 tail and seed-1 reconstructed root region

## Disposition and independence boundary

**Derived and receipt-audited disposition:** both completed applications are mathematically consistent with their declared interval constructions and frozen inputs. The seed-2 adaptation supplies a passing conditional tail neighborhood. The Bernstein correction transfer supplies a complete conditional early root region for the reconstructed seed-1 reference. No invalid coefficient bound, omitted ordered channel, unsound center projection, or mismatched recorded input identity was found in this review.

These are distinct preparations. The seed-1 early root region cannot be used as finite-history admission for seed 2 merely because their time ranges overlap. Neither application establishes that its original exact trajectory belongs to the proposed neighborhood, and neither establishes actual separation or escape.

The review independently derived the relevant input-adaptation and transfer arguments, checked the source code and retained JSONs, verified their recorded dependencies, and used exact rational inequalities to audit the seed-2 centers. It ran only lightweight known controls and receipt/array audits. It did not replay either numerical target or supply a third implementation of the entire interval calculation. The seed-2 wrapper reuses the frozen interval oracle, which is independent of the original evolution and floating tail subject; this review does not describe shared-oracle replay as new independent target evidence.

## 1. Frozen subjects and retained inputs

The inspected subjects are [the seed-2 tail wrapper](overnight2-d-seed2-tail-check.py), SHA-256 `ed21317640312dddd94afb0c11338124f93cbb21a320c2febf87765984eb7578`, and [the reconstruction-region checker](overnight2-d-reconstruction-region.py), SHA-256 `a34a6d3e5657336c1657d3415944f98e2d70ea9117d0e782b9dea1fc25ce4c78`. Both import the unchanged [interval primitive and tail oracle](overnight-d-tail-interval-independent-check.py), SHA-256 `bcd12aefb4c1daa1fe7faec368c3aeb0ecc5c640f82fb8d7e93e99e382b3ffff`.

A SHA-256 and JSON receipt audit, after an `abc` hash control and a known two-label ordered-channel census with duplicate rejection, verified every listed dependency against its current file bytes: five dependencies in the seed-2 receipt, six in the quintic-region receipt, and four in the prior cubic-region receipt. The retained receipt identities are:

| Local receipt | SHA-256 |
| --- | --- |
| `.local-data/master-equation-closure/overnight2-d/seed2-tail-interval.json` | `88f3d88fa3ece2e07bfede3b0696b18330f9a94a3a78db3bb732eabbe6dcbf49` |
| `.local-data/master-equation-closure/overnight2-d/quintic-region-t67.json` | `eaec9a6c16de6bcf8fb5a2c25ad7761c1b8d9a635adefcadd01963462068ef7e` |
| `.local-data/master-equation-closure/overnight2-d/root-region-t67.json` | `ce032577b2db3167f52d4f036fbccfb03ea11d36e490c10abc8358f22bdf8ca4` |

These are retained local evidence, not promised fresh-CI inputs. Reading and verifying their identities is not a re-execution of the calculations that produced their numerical bounds.

## 2. Seed-2 adaptation and complete channel coverage

The wrapper explicitly chooses balance 1, seed 2 and loads its own history, metadata, and radius vectors. It checks increasing finite times beginning at zero, compatible finite eight-member position and velocity arrays, positive finite radii, final-time agreement, and final-velocity agreement with the metadata. The reviewer array audit found 18,725 seed-2 nodes with the declared shapes. The selected error allowances are enclosed as exact decimals $\epsilon_x=0.1$ and $\epsilon_v=\epsilon_i^0=0.001$; stored history nodes and radius values are interpreted as their exact parsed binary64 encodings.

The wrapper requires exactly 56 metadata rows whose ordered labels are precisely all $i\ne j$ in an eight-member set. The independent receipt census verified the same complete set with no duplicates. This is a complete channel inventory, not by itself a proof that 56 approximate metadata source times are exact physical roots. Each metadata source time is used only to select a cutoff. The mathematical cutoff and continuous-source inequalities perform the actual root exclusion and tail admission work.

For each channel the selected cutoff is the exact binary64 value of the subtraction `root['s']-2`. It lies strictly inside the stored time domain. The wrapper begins with the cell containing that cutoff, clips its left endpoint to the cutoff, and then includes every cell through the entry time. No source segment is omitted merely because a root search did not find a sample there. A segment is excluded from possible reception only when its outward lower cap parameter is strictly greater than one; equality remains admitted.

The receipt audit counted 686,421 covered channel-segment uses and 680,835 potentially admitted uses. These counts include the same source cell separately for different receiver channels. They are not counts of distinct physical roots.

## 3. Center projection is justified, including the two active projections

The selected future velocity centers must lie in the exact closed unit ball. A floating norm printing as one is insufficient. The wrapper computes each encoded endpoint squared norm as an exact rational sum. If that sum is at most one, it uses the encoded vector unchanged. Otherwise it encloses its radial projection $\mathbf U=\mathbf v/|\mathbf v|$ with the frozen interval norm and division.

The reviewer checked all eight rational decisions against the NPZ endpoint vectors and the recorded rational strings. Only labels 2 and 3 require projection. Their recorded coordinate enclosures were separately verified without invoking the interval norm: for each exact encoded coordinate $v$ and exact squared norm $n_2$, the inequality $a\le v/\sqrt{n_2}$ was reduced to rational square comparisons with the appropriate sign case. The upper endpoint was checked by applying the same inequality to $-a,-v$. Known positive, negative, and zero cases were checked before the recorded centers. All eight center decisions and enclosures passed this audit.

The same initial velocity allowance remains valid after projection. If an exact capped velocity $\mathbf V$ is within $\epsilon_v$ of the unprojected encoded endpoint, nonexpansiveness of the unit-ball projection and $\Pi\mathbf V=\mathbf V$ give

$$
|\mathbf V-\mathbf U|=|\Pi\mathbf V-\Pi\mathbf v|\le|\mathbf V-\mathbf v|\le\epsilon_v.
$$

Thus adding $0.001$ once per receiver is correct; no extra arbitrary center-displacement allowance is needed. This is conditional on the exact endpoint error and cap. It does not prove that endpoint error.

## 4. Old-source exclusion and future impulse bounds

The wrapper uses the same whole-Hermite-segment construction independently explained in the [original interval review](overnight-d-tail-interval-independent-review-2026-10-06.md). Affine acceleration bounds the velocity excursion from the segment midpoint, and integration bounds position excursion. For a channel midpoint displacement $\mathbf a_m$, midpoint source velocity $\mathbf w_m$, position excursion $r_x$, velocity excursion $r_v$, and minimum old age $\ell$, any possible later reception under the exact-history error assumptions satisfies

$$
\mathbf n\cdot\mathbf a_m\ge\ell-2\epsilon_x-r_x.
$$

The enlarged spherical cap therefore contains every possible exact normal. Its support bound gives a lower transmitter factor $1-M-r_v-\epsilon_v$, and the receiver speed cap gives range floor $(|\mathbf a_m|-2\epsilon_x-r_x+\ell)/2$. Taking their minima over every potentially admitted segment, even on different limiting segments, is conservative. Positive floors $\delta,R$ supply the old-source impulse bound $2/(\delta R)$.

At each cutoff the wrapper independently encloses

$$
|\overline{\mathbf X}_i(T_0)-\overline{\mathbf X}_j(S_*)|+2\epsilon_x-(T_0-S_*)<0.
$$

Combined with the complete exact past and its unit speed cap, this excludes earlier emissions from all later receptions. The approximate metadata root is not trusted for that exclusion. A frozen source clock at the entry time is assigned to the old-source part, as required by the [split-history theorem](overnight-d-split-history-tail.md); it is not removed as a negligible-time event.

For future emissions, the direction is the normalized difference of the fixed projected centers. The oracle encloses the initial projected separation $d$, future separation rate $c$, and factors $z$ and $z-c$, then takes the maximum of the three derived transmitter-factor lower bounds. All required lower bounds are positive in every retained channel. The future impulse is bounded by

$$
B^{\mathrm{new}}\le\frac{z(z-c)}{\delta^{\mathrm{new}}cd}.
$$

This follows by integrating the delayed-onset inverse-square majorant, not by sampling a future trajectory. Interval dependency can widen the center and direction calculations but does not make them optimistic. For each receiver, the wrapper adds the initial allowance once and seven old plus seven future bounds. Its final test is the strict inequality of that budget to the encoded radius.

The receipt audit read all ratio and channel-margin fields and confirmed that the eight upper ratios are below one, all cutoff-gap upper endpoints are negative, and all old and future required floors are positive. The retained seed-2 result is:

| Quantity | Recorded interval conclusion |
| --- | ---: |
| Candidate entry time | $1230.3317169023526$ |
| Maximum budget/radius upper endpoint | $0.9520953090081342$ |
| Maximum cutoff-gap upper endpoint | $-0.6384634953271869$ |
| Required cutoff range | $61.9480232189851$ to $607.6418322724695$ |
| Minimum old transmitter floor | $0.11826963241698503$ |
| Minimum old range floor | $348.07524403933394$ |
| Minimum future transmitter floor | $0.10102380556447017$ |

These numerical conclusions were read and structurally checked from the frozen receipt, not recomputed by a target replay. Their application still requires the exact selected history to lie in the stipulated position/velocity neighborhood over every required old-source interval and at entry, with the complete cap and continuation regularity from the theorem. The time-zero kick lies before the earliest retained cutoff, but its earlier effect on the unproved finite history has not disappeared.

## 5. Bernstein transfer for the reconstructed seed-1 reference

Let the stored endpoint acceleration corrections on a refined cell be $\mathbf a,\mathbf b$ and its width be $h$. The reviewed bubble is

$$
\mathbf B(q)=\frac{h^2}{2}q^2(1-q)^2[(1-q)\mathbf a+q\mathbf b].
$$

Its position bound is $h^2\max(|\mathbf a|,|\mathbf b|)/32$. Differentiating its degree-five Bernstein control vectors gives velocity control vectors

$$
\frac h4(0,\mathbf a,\mathbf b-\mathbf a,-\mathbf b,0)
$$

and acceleration control vectors

$$
(\mathbf a,\mathbf b-2\mathbf a,\mathbf a-2\mathbf b,\mathbf b).
$$

Because Bernstein basis functions are nonnegative and sum to one, the maximum control-vector norm bounds the whole derivative curve. These independent formulas from the [reconstruction review](overnight2-d-reconstruction-independent-review.md) are precisely those used by the region checker.

The new `upper_norm` takes an interval upper bound on each coordinate's absolute value and adds the three coordinates outward. The Euclidean norm is at most this sum. It therefore safely avoids an unnecessary square root, including zero or underflow-scale differences; it does not narrow the frozen norm primitive or discard failed boxes. Cell widths and coefficient differences are evaluated using outward interval arithmetic. Selecting a largest upper endpoint as a singleton bound remains conservative.

The known constant-discrepancy control has $h=4$ and $\mathbf a=\mathbf b=(2,0,0)$. At the midpoint the position correction is exactly one, attaining its bound. The derived conservative velocity bound is two, and the acceleration bound is two. The checker controls returned those enclosing values before this reviewer performed any target-data audit. The velocity bound is not claimed sharp.

The reviewer confirmed that the correction grid is finite and increasing from zero through 67, that both coefficient arrays have shape $(4765,8,3)$ with finite entries, and that every old interpolation knot within the prefix is present in the refined grid. Thus no refined cell straddles an unrepresented old cubic boundary. The retained old reference covers the endpoint. The corrected target metadata and original root-region receipt both identify the same verified old NPZ hash, `99c0555f4eb52236bcb0a3c615fb96a32a4d3a1bc488bd89081d411c62619b84`. The reconstruction coefficient file matches its region receipt. These checks bind the transfer to the declared old reference for this application.

The checker takes the maximum position correction $\beta$ and velocity correction $\eta$ over all members and cells. If the old region has speed bound $L_0$ and separation floor $d_0$, the new reference has

$$
L\le L_0+\eta,\qquad d\ge d_0-2\beta.
$$

The subtraction of twice the global correction is valid for any pair. The negative comparison path is unchanged, so the enlarged speed bound also covers the complete negative reference whenever the old bound did. Applying the root theorem with exact-decimal error allowances $0.1,0.001$ gives the following retained whole-prefix conclusions:

| Quantity | Recorded outward bound |
| --- | ---: |
| Position correction | at most $1.1188728622006148\times10^{-11}$ |
| Velocity correction | at most $1.0658609365981624\times10^{-8}$ |
| Acceleration correction | at most $5.316017588533205\times10^{-6}$ |
| New reference speed | at most $0.7214070361473184$ |
| New present separation | at least $3.5297124883461457$ |
| Exact-tube delay | at least $1.9331739934098546$ |
| Exact-tube causal factors | at least $0.2775929638526815$ |
| Exact source-clock lower slope | at least $0.16116571636493168$ |

The script's positivity checks correctly use outward lower endpoints. This establishes a conditional root domain for the mathematically defined old cubic plus stored bubble, not an error bound for floating evaluation of that reference and not a residual or trajectory enclosure. Approximate acceleration matching does not invalidate position/velocity bubble bounds; it does leave acceleration-trace and derivative-variation obligations for later propagation. Future reuse must maintain the same input-binding checks; the script records dependency identities but does not by itself compare every ancestor's recorded hash.

## 6. Arithmetic, independent evidence, and falsifiers

Both applications retain the frozen arithmetic contract: finite IEEE binary64 elementary operations with adjacent-float outward inflation, explicit coordinate arithmetic, and verified square-root brackets. The checks do not prove the interpreter, hardware, or primitive implementation. The primitive's rational arithmetic, square-root, clipped linear/cubic segment, spherical-cap, and analytic future-impulse controls passed in this reviewer session before the array audits. The new constant-discrepancy Bernstein control also passed. No subject or oracle code was altered to obtain those passes.

Additional receipt checks ran only after known controls: SHA-256 `abc`; complete and duplicated two-label channel sets; and exact projected-coordinate inequalities for positive, negative, and zero coordinates. The seed-2 center audit used exact rational arithmetic rather than the projection implementation under review. The Bernstein proof used explicit polynomial control vectors rather than agreement with the floating reconstruction evaluator. These are the independent references for the reviewed portions; full target numbers remain the recorded interval applications.

The tail application is falsified by an omitted required channel or source segment, a projected center outside its interval or the exact ball, a nonnegative cutoff gap, a nonpositive required floor, an outward arithmetic violation, or a same-input budget upper ratio at least one. The reconstructed-region application is falsified by a bubble exceeding its Bernstein bound, an omitted old knot, a mismatched old-reference identity, or a speed/separation transfer outside its outward bounds. Absence of actual history membership is an open premise, not a falsifier of these conditional computations.

Only this new review companion was authored. The parent owns the receiving [research account](overnight2-d-followup-and-research-2026-10-07.md), any shared integration, and the remaining finite-history admission work. No target replay, source edit, process control, new agent, or sidebar message was performed by this review.

Final validation receipt: the controls and array/center audits ran through `${AAA_VENV:-../.venv}/bin/python` with `OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 PYTHONDONTWRITEBYTECODE=1`, importing the frozen reconstruction-region module and calling `controls()` before the data audits; no `--target` path was invoked. Node's standard `crypto` and JSON parser performed the known-control-first identity and channel audits. Repeat `shasum -a 256` reads returned both frozen subject identities unchanged. File-scoped `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-interval-applications-independent-review.md` emitted no whitespace diagnostics (difference exit status 1). Explicit `test -f` checks passed for all seven local link destinations; there are no fragment targets. These checks support the bounded mathematical application review, not actual finite-history admission.
