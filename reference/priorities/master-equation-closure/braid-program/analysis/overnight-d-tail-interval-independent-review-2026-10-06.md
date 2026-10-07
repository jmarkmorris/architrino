# Independent interval review of the seed-1 split-history tail candidate

## Disposition and boundary

**Measured by the separately authored [outward-rounded checker](overnight-d-tail-interval-independent-check.py): the stored seed-1 Hermite history passes the continuous-source tail-neighborhood inequalities, conditional on the stated binary64 arithmetic model.** With exact decimal allowances $\epsilon_x=0.1$, $\epsilon_v=\epsilon_i^0=0.001$, the largest enclosed budget/radius upper bound is $0.9390466349354595<1$. This checks the tail majorants over every covered source segment, including endpoints. It does not enclose the selected preparation's exact finite evolution and therefore does not establish actual escape.

The frozen subjects are [the binary64 whole-segment instrument](overnight-d-tail-segment-bounds.py) and [the split-history theorem](overnight-d-split-history-tail.md). Neither was imported or edited. This review independently reconstructs the bounds and evaluates them using an independently authored interval implementation. Agreement with the subject's reported $0.9390466349354354$ is a consistency observation; the support lemma, polynomial calculus, interval arithmetic, and known cases are the checking references. The fixed equation remains $K=c_f=c_a=1$, the inclusive unit ball, original partner weights, zero self acceleration, and projection after the ordinary sum.

## Continuous-source segment derivation

Consider one closed Hermite source segment, clipped at the channel cutoff when necessary. Write its retained endpoints as $L,H$, midpoint $m=(L+H)/2$, and half-width $h=(H-L)/2$. On the underlying original segment, cubic Hermite position has affine acceleration. Convexity of the Euclidean norm therefore gives the whole-segment bound

$$
A=\max\{|\overline{\mathbf X}_j''(L)|,|\overline{\mathbf X}_j''(H)|\},\qquad
|\overline{\mathbf V}_j(S)-\overline{\mathbf V}_j(m)|\le Ah=:r_v.
$$

Integration yields

$$
|\overline{\mathbf X}_j(S)-\overline{\mathbf X}_j(m)|
\le (|\overline{\mathbf V}_j(m)|+r_v)h=:r_x.
$$

The position bound is conservative: a second-order integration would also give $|\overline{\mathbf V}_j(m)|h+Ah^2/2$. The subject's larger radius is valid. No source-speed ceiling is assumed for this approximate interpolant.

Put $\mathbf a_m=\overline{\mathbf X}_i(T_0)-\overline{\mathbf X}_j(m)$, $r=|\mathbf a_m|$, $\mathbf w_m=\overline{\mathbf V}_j(m)$, and $\ell_{\min}=T_0-H$. For an exact history within the stipulated uniform errors and a possible old reception, the receiver's cap gives $\mathbf n\cdot\mathbf a_{\mathrm{exact}}(S)\ge T_0-S$. The position errors and segment radius imply

$$
\mathbf n\cdot\mathbf a_m\ge\ell_{\min}-2\epsilon_x-r_x,
\qquad
\beta=\frac{\ell_{\min}-2\epsilon_x-r_x}{r}.
$$

A segment with $\beta>1$ has no possible reception. Otherwise every admissible normal belongs to the spherical cap with parameter $\max(-1,\beta)$. Using the support $M$ derived in the theorem, every source time in the segment obeys

$$
D_t\ge1-M\left(\frac{\mathbf a_m}{r},\max(-1,\beta),\mathbf w_m\right)-r_v-\epsilon_v,
\qquad
\tau\ge\frac{r-r_x-2\epsilon_x+\ell_{\min}}2.
$$

These bounds account for the exact unknown source time without a separate root-time perturbation estimate. The velocity perturbation is evaluated at that same source time. Positive infima of these segment floors provide $\delta^{\mathrm{old}}$ and $R$, hence the already derived old impulse $2/(\delta^{\mathrm{old}}R)$. Taking the minima on different segments is conservative and legitimate. Excluding a segment requires a strict lower bound $\beta>1$; equality is retained.

The independent implementation evaluates the Hermite polynomial through its secant slope $D=(X_1-X_0)/(t_1-t_0)$:

$$
X(q)=X_0+(t_1-t_0)q\{V_0+q[3D-2V_0-V_1+q(V_0+V_1-2D)]\}.
$$

It differentiates this polynomial for velocity and affine acceleration. This is a direct reconstruction from endpoint positions and derivatives, with no imported subject helper.

## Future part, cutoffs, and integration with the theorem

For each direction $\mathbf e=(\mathbf U_i-\mathbf U_j)/|\mathbf U_i-\mathbf U_j|$, the checker encloses

$$
\underline d=\mathbf e\cdot(\overline{\mathbf X}_i(T_0)-\overline{\mathbf X}_j(T_0))-2\epsilon_x,
\quad c=\mathbf e\cdot(\mathbf U_i-\mathbf U_j)-\eta_i-\eta_j,
\quad z=1-\mathbf e\cdot\mathbf U_j-\eta_j.
$$

It independently computes the maximum of the three reviewed future transmitter floors and the integral $z(z-c)/(\delta^{\mathrm{new}}c\underline d)$. The identity $z-c=1-\mathbf e\cdot\mathbf U_i+\eta_i$ is evaluated directly, avoiding an unnecessary subtraction of two interval quantities. Every required lower bound is positive in the retained result.

The chosen cutoff is the exact binary64 number produced by subtracting $2$ from the metadata's approximate source time. Its provenance as an approximate root is not trusted as proof. The checker evaluates the Hermite position at the cutoff and encloses the actual certificate

$$
|\overline{\mathbf X}_i(T_0)-\overline{\mathbf X}_j(S_{*,ij})|+2\epsilon_x-(T_0-S_{*,ij})<0.
$$

Different channels may use different cutoffs: the root monotonicity argument applies channel by channel. The required true history regularity can be imposed on the interval from the smallest cutoff through $T_0$; the tail row for each channel then uses its own certified later cutoff. No root before that channel's cutoff can contribute at a later reception when the true all-past cap holds.

The initial error $0.001$ is added once per receiver, followed by seven old and seven future impulse bounds. Strict budget/radius bounds below one close the first-exit argument. The earlier reviewed continuation argument still requires the true all-past cap, compatible $C^{1,1}$ accessible history, complete retained remote past, and the exact fixed equation. These hypotheses are not supplied by this calculation.

## Arithmetic contract and independent controls

All NPZ numbers and the parsed JSON radii are treated as exact binary64 encodings. In particular, the JSON radii are interpreted as the binary64 numbers obtained by ordinary JSON float parsing, rather than their infinitely precise decimal spellings. The discrepancy between these two conventions has not been silently absorbed into another error allowance. The two error allowances $0.1$ and $0.001$ are enclosed as exact decimal rationals. Cutoffs and $T_0$ are exact selected binary64 values.

The interval primitives assume finite IEEE 754 binary64 addition, subtraction, multiplication, and division rounded to nearest, and correct adjacent-float `nextafter`. Each elementary result is expanded outward by one adjacent float; no aggregate norm or BLAS reduction is trusted. Dot products are explicit three-term interval sums. Nonfinite values, inverted intervals, division across zero, failed square-root checks, nonpositive required margins, and uncovered input conditions abort the checker.

Square-root correctness does not depend on NumPy's seed being correctly rounded. For each nonnegative endpoint $x$, the candidate lower endpoint $l$ is accepted only when an outward upper bound on $l^2$ is at most $x$; the upper endpoint $u$ is accepted only when an outward lower bound on $u^2$ is at least $x$. Endpoints are moved outward until these inequalities hold, or the calculation aborts after a bounded number of attempts. Zero is handled exactly. Thus the elementary arithmetic model implies $l\le\sqrt x\le u$.

For spherical-cap support, the interval lower bound on $\beta$ is used to enlarge the cap monotonically. The rim expression is used only if the branch inequality is established by interval separation; otherwise the full-sphere support $|\mathbf w|$ is retained. An interval containing zero is intersected with the nonnegative axis before a square root only where the exact expression is already known to be nonnegative. This does not discard a possible negative physical quantity.

The checker does not assume that an endpoint whose floating norm prints as one lies inside the exact ball. It compares the sum of squares of each endpoint vector using exact rational arithmetic. **Measured by those comparisons: all eight supplied centers are inside the unit ball.** The closest squared norm is $1-4.7651177858270873\times10^{-17}$ to displayed precision. No center was changed. The implemented fallback, unused for this target, is exact radial projection onto the closed ball, enclosed by intervals. Nonexpansiveness would preserve the same initial allowance for every truly capped velocity within $0.001$ of the encoded endpoint; arbitrary inward scaling would require a separate displacement allowance.

Known cases were run and recorded before the target. They check exact-rational elementary arithmetic with both signs and zero, square-root brackets by rational squaring, a constant-speed linear Hermite path on a clipped interval, the cubic $X(S)=S^3$ with its analytic midpoint and acceleration bound, orthogonal and negative-parameter spherical-cap supports, and a symmetric future case with $\underline d=2$, $c=0.8$, $z=1.4$, $z-c=0.6$, $\delta=0.68$, and impulse $105/136$. An initially incorrect expected value for that final control caused an assertion failure before target execution; the analytic expected value was corrected and all controls then passed. The frozen subjects were not changed.

This is a conditional arithmetic enclosure produced by a short Python/NumPy instrument, not a machine-checked proof of the interpreter, platform, or interval implementation. The explicit arithmetic assumptions are narrower than trusting an unqualified floating-point minimum, and the square-root seed is separately verified. They are not an exact-evolution enclosure.

## Measured result

The target run at $T_0=2732.383882001036$ examined all $56$ ordered partner channels. Its exact pair-set check rejects missing or duplicate channels. There are $1{,}088{,}168$ covered full or clipped source segments, of which $1{,}085{,}710$ remain potentially admissible after conservative cap exclusion. This count includes a segment separately for each receiving channel that uses it.

| Receiver | Total budget upper bound, including initial error | Budget/radius upper bound |
| --- | ---: | ---: |
| 0 | 0.026096159424171667 | 0.9258655275656850 |
| 1 | 0.049069440457182400 | 0.9063575170323935 |
| 2 | 0.023669478290751333 | 0.9376634854393863 |
| 3 | 0.023419563685412998 | 0.9390466349354595 |
| 4 | 0.037899906804442204 | 0.8901993784688624 |
| 5 | 0.034897738647892130 | 0.9290375331789646 |
| 6 | 0.025204289571827514 | 0.9087826794593586 |
| 7 | 0.049300642262460930 | 0.8809236106630831 |

The same retained interval record gives a maximum cutoff-gap upper bound of $-0.8010801597283715$, minimum old transmitter floor $0.256282101702544$, minimum old range floor $547.5716526676952$, minimum future transmitter floor $0.1453713283052645$, minimum future projected-separation floor $1094.9447016022048$, and minimum future separation-rate floor $0.3110619541957346$. The cutoffs range from $66.97634712446597$ to $1891.5247675739688$, keeping the time-zero kick outside all future source-evaluation intervals.

These are bounds on the continuous Hermite neighborhood test, not sampled extrema and not independently evolved trajectories. Approximate interpolation need not itself obey the exact unit-speed cap; the theorem uses the cap of a putative exact history within the certified neighborhood. Whether the original release is such a history remains unresolved.

## Reproduction and provenance

Run the known cases alone:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight-d-tail-interval-independent-check.py
```

The actual target command used the repository supervisor with a $300$-second deadline, this reviewer's owner identity, and `OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 VECLIB_MAXIMUM_THREADS=1`, followed by the same shared-venv command with `--target`. The supervisor's run `ec8780a1-6d92-4c29-9176-8b7e558f79d9` completed with exit code zero and `processGroupClosed: true`; measured supervised elapsed wall time was $3.46$ seconds, with $3.3664$ seconds reported inside the checker. Channel progress was flushed on each completed channel. The first sandboxed supervisor attempt failed to bind its loopback control socket before target spawn; the authorized escalated retry produced the completed run. No target was left active.

The retained local result is `.local-data/master-equation-closure/overnight-d/tail-interval-independent/seed1.json`. It records all channel bounds, limiting segments, center decisions, exact input hashes, checker hash, and timing. Local supervisor logs and leases are operational receipts rather than scientific premises. The checker is the tracked reproducer; the ignored local output is not assumed available to fresh CI.

Input SHA-256 values measured by the checker:

| Input basename | SHA-256 |
| --- | --- |
| `b1-s1-tail-search-h600.npz` | `89d814a745afc689a54cf73ceb3dd6de8679c78e820f8c5d540b960b0e8e633c` |
| `b1-s1-tail-search-h600.json` | `84991ded6f12345c53bf4b080adf418396354f7dfb5fbaabf94849537b5a0951` |
| `b1-s1-tail-current-floor.json` | `8959292f2f26bb0d6ac5928677b67f282745b2b0ea2fa25489ea03d54851fac6` |

At report capture, `shasum -a 256` measured subject instrument `340c5d76cb878f67b2041dac95e9402a84f8e49daf99be4142ccfc7a04a2cee7`, theorem `f46ae04da03aecad35710b2c2bf3c2202895794c9948691a4397bc2d48ac4005`, and checker `bcd12aefb4c1daa1fe7faec368c3aeb0ecc5c640f82fb8d7e93e99e382b3ffff`.

## Falsifiers, remaining obligations, and files

The segment proof would be overturned by a Hermite value outside its proved midpoint balls or by an admissible exact normal outside the enlarged cap under the stipulated errors. The arithmetic result would be overturned by an elementary operation outside the stated outward interval, an omitted source segment or channel, an unsound branch exclusion, a nonnegative cutoff gap, or a recomputed budget/radius upper bound at least one for these same input encodings and arithmetic contract. Each channel's cutoff and limiting source segments are present in the local result to make those checks specific.

The outstanding scientific obligation is a validated enclosure of the selected preparation's finite exact evolution on the required source-history intervals and at $T_0$, meeting the stated position, velocity, and initial-center allowances while supplying compatible regularity and the true speed cap. An independent check of the original trajectory integration is not replaced by this continuous interpolation calculation. Failure to obtain that enclosure would prevent admission of this candidate; it would not prove nonescape.

Only the new checker and this new review companion were authored, plus their matching ignored local result and supervisor operational records. The subject instrument, theorem, earlier reviews, earlier instruments, and shared owner files were not edited. No Git mutation, regeneration, new agent, or second numerical candidate was used. This bounded candidate review is complete at the conditional tail-neighborhood grade.

Final validation: the shared-venv known-case command passed again after report capture. Because the deliverables are new files, `git diff --no-index --check /dev/null <file>` was run separately on each rather than treating an empty ordinary `git diff --check` as coverage; both emitted no whitespace diagnostics (the no-index comparison returned difference status 1). The owner-specific supervisor closeout returned `status: clear`. These receipts validate the bounded artifacts and process closeout, not the missing exact-history enclosure.
