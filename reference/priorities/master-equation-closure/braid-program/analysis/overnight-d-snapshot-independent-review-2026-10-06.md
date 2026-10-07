# Independent endpoint and external-background review

## Verdict and scope

An independent floating snapshot reconstruction confirms that both balance-1 endpoints have positive instantaneous separation rates for all 28 present pairs, while their earliest received emissions are still from substantially earlier release history. At each balance-0 endpoint, the closest pair's six external row norms sum to about one per receiver, compared with mutual-row norms near 171,000. These are endpoint statements about the supplied binary64 histories. They neither independently validate the evolved trajectories nor establish escape, coincidence, or persistence of the numerical ratios.

The conditional short-time external-row bound in [the background instrument](overnight-d-background-bound.py) is mathematically valid under exact source-history bounds and a capped receiver segment. The numerical estimates do not certify those exact-history premises. Moreover, the retained cubic-Hermite interpolants exceed unit speed between stored nodes. This prevents using sampled capped node velocities as a proof of the all-past speed hypothesis. The particular old-source brackets used for the external-background estimates remain below unit speed in the separate floating interpolation check; the global overshoot finding must not be misreported as an observed violation inside those brackets.

Claim grade: measured for the snapshot results, by [the independent checker](overnight-d-snapshot-independent-check.py) over the four frozen endpoint NPZ files; derived for the conditional background estimate below. Falsifiers include an independently evaluated pair-rate sign disagreement on the same encoded endpoint, a missed ordinary partner root, a violated row bound under its exact premises, or a source-history error enclosure showing that a claimed numerical margin does not survive for the actual solution.

## Independent instrument and known-first controls

The checker reads the literal `0186.json` balance data and the arrays `T`, `X`, `V`, and `kick` from each NPZ. It does not import or copy `overnight-d-release-diagnostics.py` or `release_cap.py`, and it performs no evolution. Before zero, it evaluates the literal rigid paths $\mathbf X_j(S)=(r_j\cos(\phi_j+\omega S),r_j\sin(\phi_j+\omega S),z_j)$ and their derivatives. After zero, it independently constructs the cubic Hermite polynomial from each pair of endpoint positions and velocities. It retains the original source history across the velocity kick, with the right trace at zero; none of the checked endpoint roots occurs at zero.

For a segment of duration $h$, normalized coordinate $q$, and displacement $\Delta\mathbf X$, its polynomial is $\mathbf X(q)=\mathbf X_0+\mathbf c q+\mathbf b q^2+\mathbf a q^3$, where $\mathbf c=h\mathbf V_0$, $\mathbf b=3\Delta\mathbf X-h(2\mathbf V_0+\mathbf V_1)$, and $\mathbf a=-2\Delta\mathbf X+h(\mathbf V_0+\mathbf V_1)$. Using displacement rather than separately scaled absolute coordinates reduces cancellation on very short segments. Velocity is the exact derivative of this declared interpolation, evaluated in floating arithmetic.

The ordinary law is unchanged: $K=c_f=c_a=1$, original partner row $\sigma_{ij}\mathbf n/(r^2|D_t|)$ with $D_t=1-\mathbf n\cdot\mathbf V_j(S)$, and zero self acceleration. All tabulated external and mutual norms are ordinary rows before the selected post-summation projection. No receiver factor is inserted into their weights.

The following controls passed before the first target was loaded, and the checker reruns them before every target:

- Static source: receiver at $(3,0,0)$ at time 5 gives emission time 2, delay 3, transmitter factor 1, and row $(1/9,0,0)$.
- Analytic capped circle: using $D=\cos D$, $R=[4\cos D(1+\sin D)]^{-1}$, and $\omega=1/R$, the independently evaluated opposite-source row agrees with $(-1/R,\sin D/[4R^2\cos^2D(1+\sin D)],0)$ to maximum absolute discrepancy $1.7763568394002505\times10^{-15}$.
- Hermite polynomial: positions 0 and 1 with zero endpoint velocities give midpoint position $1/2$ and maximum speed $3/2$ at $q=1/2$. Restricting to $q\in[0.1,0.2]$ gives maximum speed $0.96$; restricting acceleration to $[0.25,0.75]$ gives maximum norm 3. These controls cover the source-bracket speed and acceleration functions before their target use.
- Pair geometry: displacement $(3,4,0)$ and relative velocity $(0,1,0)$ give distance 5 and radial rate $0.8$.
- Squared causal polynomial: the static-source control gives the single admissible normalized root $q=0.4$.
- A 60-digit decimal evaluation of the Hermite speed control returns exactly $1.5$ before the same point-evaluation method is applied to target cap-overshoot witnesses.

The first controls invocation failed the polynomial-root check: NumPy's trimmed polynomial products were being added through array broadcasting, incorrectly spreading a constant coefficient. Explicit coefficient-index accumulation repaired it; all controls then passed before any target run. Later, the Hermite coefficients were rewritten through $\Delta\mathbf X$ to reduce cancellation, and all controls and all four targets were rerun. The preliminary interpolation maxima were explicitly corrected in the working communication; only the final displacement-based values appear below. The separate decimal witnesses confirm that those final excesses are properties of the encoded Hermite paths, not merely roundoff in a binary64 maximum evaluation.

## Endpoint pair geometry and retained emissions

Pair distances and rates are independently computed as $d_{ij}=|\mathbf X_i-\mathbf X_j|$ and $\dot d_{ij}=(\mathbf X_i-\mathbf X_j)\cdot(\mathbf V_i-\mathbf V_j)/d_{ij}$. The resulting distances and rates match the supplied JSON pair tables exactly in binary64 arithmetic; shared input data and the elementary formula limit the significance of that agreement.

| Preparation | Endpoint time | Positive pair rates | Closest pair | Closest distance | Its radial rate | Minimum rate over all pairs |
| --- | ---: | ---: | --- | ---: | ---: | ---: |
| balance 0, seed 1 | 8.28428534135345 | 17 of 28 | 3,4 | 0.0019901226754228726 | -0.976455198638581 | -1.1338547093244609 (2,3) |
| balance 0, seed 2 | 8.420937994247105 | 18 of 28 | 2,5 | 0.001990936473342663 | -0.9765796644851851 | -1.1655391554633665 (1,2) |
| balance 1, seed 1 | 236.17424208263077 | 28 of 28 | 1,5 | 74.72822602758093 | 0.44119555512571584 | 0.44119555512571584 (1,5) |
| balance 1, seed 2 | 234.62285322508606 | 28 of 28 | 5,6 | 100.76221582334448 | 0.7576101233935182 | 0.6079542397849277 (1,6) |

Both balance-1 endpoints therefore have every present pair opening at that instant. Positive instantaneous rates do not supply future acceleration control or a tail-entry certificate.

| Preparation | Earliest channel, source to receiver | Emission time | Delay | Transmitter factor | Receiver factor |
| --- | --- | ---: | ---: | ---: | ---: |
| balance 1, seed 1 | 6 to 2 | 68.72506636685907 | 167.4491757157717 | 1.3604990175207257 | 0.0049542575723448 |
| balance 1, seed 2 | 6 to 2 | 63.903994226903066 | 170.718858998183 | 1.2285316449651669 | 0.000372988099918925 |

These independently recomputed emissions precede the JSON-reported first ceiling episodes at 72.26642719815021 and 71.95890068607203, respectively. The episode times are source metadata, not independently reconstructed event times. “Pre-tail” has no admitted dynamical boundary here; the defensible statement is that these endpoints continue to sample emissions from before the reported first ceiling episodes. The small receiver factors explain slow playback in these numerical rows, without changing their original acceleration weights.

## Balance-0 external and mutual rows

For each closest-pair receiver, six external rows are evaluated independently. The sum of their norms bounds the norm of their vector sum; both are recorded to distinguish a conservative magnitude bound from cancellation in one numerical snapshot.

| Preparation and receiver | Six external row norms summed | Norm of external vector sum | Mutual-row norm | External norm-sum / mutual norm |
| --- | ---: | ---: | ---: | ---: |
| balance 0, seed 1, receiver 3 | 0.9967010996725493 | 0.33446016685562935 | 170770.0328431463 | $5.836510557962049\times10^{-6}$ |
| balance 0, seed 1, receiver 4 | 0.9971183444528454 | 0.33474553594217765 | 172165.6569589043 | $5.791621639679603\times10^{-6}$ |
| balance 0, seed 2, receiver 2 | 0.9899008310385973 | 0.3265028755968199 | 170596.52056629155 | $5.802585115761109\times10^{-6}$ |
| balance 0, seed 2, receiver 5 | 0.9903426712842021 | 0.3268054011895821 | 172028.89829494667 | $5.756839002632229\times10^{-6}$ |

The independent endpoint row norms differ from the supplied JSON by at most $3.607041435316205\times10^{-6}$ and $4.434376023709774\times10^{-6}$ for the two balance-0 preparations. These absolute differences are small relative to the close mutual rows; they are not an error bound for the evolved solution. A small external-to-mutual ratio at one endpoint does not prove that the mutual geometry continues inward or that its delayed range tracks present separation.

## Numerical root coverage and interpolation limits

Each of the 56 ordered partner channels is bisected independently using the declared rigid-plus-Hermite source. The search includes the complete rigid negative-time past: its speed is strictly below one for each literal balance, and a sufficiently early bracket is obtained from the bounded rigid position. All checked channels have negative gap at zero, excluding negative-time roots under that rigid-source monotonicity.

For the nonnegative history, each Hermite segment is assessed separately. Its quadratic velocity has Bernstein control vectors $\mathbf V_0$, $3\Delta\mathbf X/h-\mathbf V_0-\mathbf V_1$, and $\mathbf V_1$. The largest control-vector norm bounds the interpolated speed by convexity. Thus the causal gap has segment Lipschitz bound $1+B$ even when $B>1$. Endpoint gap values with that bound numerically exclude the segment when zero is outside the resulting range. Remaining candidate segments are checked by solving the degree-at-most-six squared causal polynomial and testing positive delay and the original unsquared residual.

| Preparation | Numerically excluded segment-channel combinations | Candidate combinations | Numerical single-root channels | Maximum bisection residual | Minimum sampled root transmitter factor |
| --- | ---: | ---: | ---: | ---: | ---: |
| balance 0, seed 1 | 270783 | 145 | 56 of 56 | $1.7763568394002505\times10^{-15}$ | 0.1879960235941055 |
| balance 0, seed 2 | 271937 | 167 | 56 of 56 | $1.7763568394002505\times10^{-15}$ | 0.09412727398776655 |
| balance 1, seed 1 | 517612 | 108 | 56 of 56 | $5.684341886080802\times10^{-14}$ | 0.45501158977513334 |
| balance 1, seed 2 | 558647 | 121 | 56 of 56 | $5.684341886080802\times10^{-14}$ | 0.5297064849757354 |

No candidate failed the instrument's acceptance filter, and no negative-time root was reported. This is numerical coverage, not an exact all-root certificate. The exclusions are not outward rounded; polynomial root extraction is floating; roots are accepted using imaginary-part tolerance $10^{-8}$ and residual tolerance $10^{-7}\max(1,\tau)$, and near-duplicate source times are merged within $10^{-8}\max(1,|S|)$. Unresolved closely spaced or ill-conditioned roots are therefore not excluded by proof. The positive root factors in the table and agreement with bisection support the floating snapshot result only.

The maximal stored-node speed is $1.0000000000000002$ in all four histories. Searching real stationary points of the squared quadratic segment velocity exposes larger interior excesses. The listed witness is then reevaluated with 60-digit decimal arithmetic directly from the exact binary64 encodings of the segment's endpoint data.

| Preparation | Largest floating interpolant speed found | Witness member | Witness segment duration | Rounded decimal point witness |
| --- | ---: | ---: | ---: | ---: |
| balance 0, seed 1 | 1.000000341100984 | 4 | $7.591927086991745\times10^{-10}$ | 1.000000341100983960 |
| balance 0, seed 2 | 1.0000000632437087 | 4 | $1.976062335984352\times10^{-8}$ | 1.000000063243708667 |
| balance 1, seed 1 | 1.0000020623247245 | 0 | $4.096563088751282\times10^{-9}$ | 1.000002062324724349 |
| balance 1, seed 2 | 1.0000003077844668 | 2 | $6.830839538451983\times10^{-8}$ | 1.000000307784466449 |

The decimal calculation is a high-precision point witness, not a rigorous interval enclosure. It confirms the excess well beyond binary64 evaluation noise. These very short segments make reconstruction sensitive to rounded endpoint displacements. The result concerns the saved interpolation, not a demonstrated violation of the exact constrained equation. Sampled speeds cannot license an exact global monotonicity argument for these interpolants. The independent candidate-segment search above deliberately uses a speed upper bound that can exceed one rather than assuming monotonicity on every numerical segment.

## Independent derivation of the external-row bound

Fix one exact ordinary row at reception $T_0$ and emission $S_0$, with range $r_0=T_0-S_0>0$ and transmitter factor $D_0>0$. Let a future receiver segment satisfy $|\mathbf V_i|\le1$ for at most time $h$. Assume the entire old-source bracket $[S_0-\epsilon,S_0+\epsilon]$ lies strictly before $T_0$, has source speed at most one, and has velocity Lipschitz constant $M$. The source velocity is then continuous, and its change over an emission displacement is at most $M\epsilon$.

Take $\epsilon=8h/D_0$ and $r_{\min}=r_0-h-\epsilon>0$. On the whole reception/source rectangle, the received displacement vector differs from its reference value by at most $h+\epsilon$, so its range is at least $r_{\min}$. Normalizing two nonzero displacement vectors gives

$$
|\mathbf n(T,S)-\mathbf n(T_0,S_0)|\le\frac{2(h+\epsilon)}{r_{\min}}.
$$

The source-speed bound and its Lipschitz constant therefore give

$$
|D_t(T,S)-D_0|\le\frac{2(h+\epsilon)}{r_{\min}}+M\epsilon=:\Lambda.
$$

If $\Lambda<D_0/2$, the source derivative of the causal gap is positive throughout that rectangle. At the initial reception time, integrating this derivative from the exact root gives opposite endpoint gaps of magnitudes at least $D_0\epsilon/2=4h$. Changing reception time by at most $h$ changes the gap by at most $2h$, since receiver displacement is at most $h$. Hence the bracket endpoints retain opposite strict signs throughout the future segment. There is one root within that bracket, its factor is at least $D_0/2$, and its original row norm satisfies

$$
|\mathbf a_{i\leftarrow j}(T)|=\frac1{r(T,S)^2D_t(T,S)}\le\frac2{D_0r_{\min}^2}.
$$

Complete-source speed control, or a separate complement certificate, is additionally required to exclude roots outside this local bracket. The receiver-segment statement applies while an ordinary continuation exists; it does not establish that the near-contact mutual channel permits continuation for the full interval $h$.

The reviewed code's source-acceleration maximum is mathematically appropriate for a Hermite source: acceleration is affine on each segment, and its norm is convex, so its maximum on a restricted segment is attained at one of that interval's endpoints. Taking the largest endpoint norm over the bracket bounds the interpolant velocity's Lipschitz constant. The independent checker reconstructs this quantity from its own displacement-based coefficients.

At $h=0.001$, the independent floating estimates satisfy the algebraic inequality for all twelve external channels in each balance-0 case. The resulting six-row upper sums are 2.0119059400885915 and 2.0127561516211574 for seed 1 receivers 3 and 4, and 1.998278582281232 and 1.9991780689792567 for seed 2 receivers 2 and 5. Maximum interpolated source speeds on these particular old brackets are 0.9307432367678887 and 0.9480339595614417, respectively. All smaller tested horizons, $0.0005$, $0.0001$, $0.00005$, and $0.00001$, also pass the algebraic test. These are floating estimates on the retained interpolation, not theorem admission for the exact source history.

To apply the bound to the actual solution requires enclosures for the initial root and its $r_0,D_0$, source positions and velocities on every bracket, a justified $M$, the source speed condition, and exclusion of other roots. Numerical root residuals and finite interpolation acceleration estimates do not supply those enclosures. The unchanged code's comment says “exact unit speed”; the derivation requires only speed at most one. That stricter comment does not affect the numerical formula, but its successful boolean test should not be interpreted as checking an actual source-history hypothesis.

Claim grade: derived for the conditional estimate; measured for the floating admission diagnostics. A counterexample satisfying the complete exact rectangle assumptions and violating either bracket retention or the row bound would falsify the theorem. A larger exact-history error than a numerical margin would defeat application without refuting the conditional theorem. No coincidence proof, future mutual-row lower bound, or bound after loss of the ordinary domain is provided.

## Reproduction, provenance, and disposition

All four input NPZ files and their original JSON companions are local evidence under `.local-data/master-equation-closure/overnight-d/`; they are not fresh-CI inputs. The complete independent pair tables, root rows, numerical coverage records, speed witnesses, and background trials are retained locally in `snapshot-independent/b0-s1.json`, `b0-s2.json`, `b1-s1.json`, and `b1-s2.json`. The checked-in script is the reproducer and explicitly requires these local inputs plus the literal rigid-history JSON.

The literal input SHA-256 is `d937eee01771c6a75b49b07ed1f6d1125ed1a91c82fbb4a9b76bf2f529c6d56d`. The checker records hashes of every NPZ and compared JSON in its result. The NPZ hashes are:

| Preparation | NPZ SHA-256 |
| --- | --- |
| balance 0, seed 1 | `79e2e7e8966e661bcaccedfa27a8197b01c4411811f903e9a98b20afd5c18973` |
| balance 0, seed 2 | `eac294e435f56b120b28ed1a6f21f306b8b67f0457a840fa00817cf5e6182e15` |
| balance 1, seed 1 | `4d645de3dfd0b42503523342e12269a6fcdef69dfb3ae9d342f0f5fce470e87c` |
| balance 1, seed 2 | `780a2743651fc44d6e0c217af3b6f60915a2e4f752a669ed3ae67820a7055267` |

The original NumPy kick construction reproduced every stored kick exactly; initial velocities agree with literal rigid velocities plus those kicks to maximum component differences between $3.47\times10^{-17}$ and $5.41\times10^{-17}$. This checks preparation encoding, not the subsequent integrator.

From the repository root, run controls first:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight-d-snapshot-independent-check.py --controls-only
```

Then run each target sequentially, replacing the explicit balance/seed/output tuple with `(0,1,b0-s1.json)`, `(0,2,b0-s2.json)`, `(1,1,b1-s1.json)`, or `(1,2,b1-s2.json)`:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight-d-snapshot-independent-check.py --balance 0 --seed 1 --out .local-data/master-equation-closure/overnight-d/snapshot-independent/b0-s1.json
```

The final target runs exited zero. Their internal `time.monotonic` durations were 1.3794045839458704, 1.4627395840361714, 0.22992858290672302, and 0.6755612906999886 seconds in that order. Each command used one process with BLAS/OMP limited to one thread and a 50-second process alarm. No long scientific process remains running. The background subject was read only, with SHA-256 `eea413d025a084c7b376abf8b57a4c38e059035db351f848b89cf8471d080cfb`; the final independent script hash measured by `shasum -a 256` is `ab9b60d40416883241e0290bb2543baa6daf82889a2f6d6ab9a1a70965b575bb`.

The reviewer created only this report and `overnight-d-snapshot-independent-check.py`, plus the four owned local result JSON files. No subject, source data, shared owner, production code, regular test, or generated artifact was edited. The numerical findings remain measured snapshot checks; the mathematical background bound remains conditional on true source-history bounds. Actual tail entry and the near-contact continuation question remain open.

Final validation: separate `git diff --no-index --check /dev/null` commands for the new script and report returned no whitespace diagnostics, with exit status 1 for each nonempty new-file difference. Path-scoped `git --no-optional-locks status --short` reported only these two specified paths as untracked within that inspection scope. Final `shasum -a 256` reads matched the recorded script, background subject, and all four NPZ hashes. Source-file links were checked against the files actually read. This review began its bounded snapshot work at 2026-10-06 23:45:20 UTC by `clock.curr_time`; the final validation time was 23:55:43 UTC. All four final target invocations completed, and no owned asynchronous command remained outstanding.
