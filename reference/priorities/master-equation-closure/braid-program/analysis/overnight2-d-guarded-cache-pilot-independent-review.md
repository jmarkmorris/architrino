# Guarded cache original-cell pilot: independent output review

**Disposition — accepted one-cell application.** The completed guarded-cache pilot extends the exact accepted original 423-cell input through cell 423, ending at 15.384844494560298. Its velocity error upper is 2.63683760330056e-10 and position error upper is 1.3184188016502804e-9. This validates actual use of the guarded cache on that original cell. It does not extend the separately accepted 663-cell endpoint, certify a future continuation, or admit the tail.

The original balance 1, seed 1, literal preparation/kick, unit weights, self clause, negative history and $\alpha=1/5$ are unchanged. The [cache mathematics review](overnight2-d-cached-source-independent-review.md), [startup repair review](overnight2-d-guarded-cache-independent-review.md) and [global Taylor pilot review](overnight2-d-global-taylor-pilot-independent-review.md) remain separate dependencies of this application. The genuine-control startup defect of the earlier cache entry was preserved and repaired before this run.

## Independent actual source-box verification

The separately authored `boxes.py` first verifies exact stationary, cubic $x(t)=t^3$ on a width-two cell and factored quartic-correction cases. It then reconstructs exact rational initial-plus-increment nodes and componentwise bounds for every source piece actually queried by the 56 new channels. For exact cell width $h$, increment $d$ and velocities $v_0,v_1$, the independent formulas are

$$
x_m=d/2+h(v_0-v_1)/8,\qquad v_m=3d/(2h)-(v_0+v_1)/4,
$$

$$
a_0=6d/h^2-(4v_0+2v_1)/h,\qquad a_1=-6d/h^2+(2v_0+4v_1)/h.
$$

With $A=\max(|a_0|,|a_1|)$, the velocity radius is $Ah/2$ and the position radius is $(|v_m|+Ah/2)h/2$. If $R_0,R_1,R_2$ are the exact coefficient-L1 bounds for the factored correction and its first two polynomial derivatives, the additional radii are $R_0/16$, $(R_0/2+R_1/16)/h$ and $(2R_0+R_1+R_2/16)/h^2$. Exact node offsets are added only to position.

The independently computed rational bounds are enclosed by the actual cache arrays on all 134 distinct queried source/member pieces, covering 1,206 component bounds for position, velocity and acceleration. Every recorded channel uses `whole-positive-piece-cache`. The full source inventory is independently reconstructed, including both closed-piece acceleration traces at knots. This is a complete-piece enclosure check, not a sample comparison with the producer's trajectories. The cache query hull and scoped matrix dispatch are the frozen implementation independently exercised in the component review.

A first invocation of the new auditor supplied the wrong argument shape to `exact_nodes`; it stopped with a TypeError before inspecting target boxes. The private auditor call was corrected to the actual two-argument interface, its known controls were rerun, and the full target-box check passed. No subject or oracle was changed.

## Geometry and admission obligations

All 56 candidate-source ranges, Taylor centers, complete-domain acceleration values, remainders, selection screens and translation enclosures pass the independent rational metadata audit. The maximum remainder is 0.00010083563879518445 and maximum reference displacement is 0.00159096452597701. Every $M_j$ equals the complete certified Euclidean acceleration value; the domain proof is unchanged from the independently checked global pilot.

Separately reconstructed whole-cell squared-gap bounds pass for the two largest displacements and the previously obstructed channel: $3\leftarrow7$ gives 0.0015909507333006167 below recorded 0.00159096452597701; $1\leftarrow7$ gives 0.0015905714316629396 below 0.0015905853740759382; $4\leftarrow3$ gives 0.0008348832127791707 below 0.0008348901598042957. Their source pieces are respectively 68–69, 68–69 and 199–203. Numerical samples only recover candidate coefficients; exact polynomial/Bernstein arithmetic supplies the independent inequality.

The known-controlled arithmetic auditor checks exact preservation of all 423 incoming records and initialization/front/jump data, all six residual receipts, eight new member steps and 56 channels. First-pass and refined source containment, complete source coverage, earlier-history lookup, nonnegative source allowance, jump support, scalar series/tails, strict trial and simultaneous update all pass. All sources are positive and earlier than their reception cell; minimum source-before-cell margin is 4.2506028137784355, minimum delay 4.350602823671957, history indices range 25–217, maximum trial 1.0337590146979527e-9 and maximum endpoint/trial ratio 0.25657291984069863. The retained outward zero-overlap jump allowance is at most 7e-323. All records report one attempt.

The signed matrix construction and spectral/logarithmic norms rely on the independently reviewed frozen consumer; this review does not claim a separate exact regeneration of every matrix coefficient. Its added independent target check establishes the validity of every actually queried complete-piece cache box, which is the changed mathematical input to that consumer.

## Provenance and measured cost

Receipt `guarded-cache-admission-mesh-first424-pilot.json` has SHA `a00e685e09ce294cee1c8c67ddb787aaf3c8c3e18a1d315013d7208272fa0e54`; its complete partial SHA is `8e5a2cb01c039535fee0cbb12ca5086c35908661409b75d61e975804f7699a90`. All 424 raw records equal the final records. The header and final receipt bind exactly one domain SHA `dd2e452fb1e145a95090ce17849cbd41555ca4c611a85fb125e1ef85bc5c2825`. All 58 unique dependencies hash-match. Guarded entry SHA is `cee06185b4b3f16a64c117aa71530ea535d71a205f0a4fa96670c401e7f67c8e`; cache helper SHA is `d5fde114e7e8abe958d77fc21c5017679383115690e89af1a8b7323f9de927ba`.

The exact owned run `1591b4f7-fce3-49e1-89be-bdaf8c814ab5` completed exit zero with its process group closed, from 13:18:05.501 to 13:18:18.269 UTC. The auditor checks its cwd, shared-venv command, guarded entry, original 423-cell resume, six residual names, 424-cell target, 180-second cap and output name. The terminal stdout record matches the final receipt's arguments, initialization, jumps, endpoint, errors and resources. This short run has no periodic progress record; no missing heartbeat or per-cell progress is invented. Successful terminal output, exact raw/final agreement, existing-output refusal and frozen write/flush control flow establish its association.

Lease SHA is `0cb1a1bd4e85078c7c8d2bbd761e6ed471914cd48c77f3d12bb85e758a8d8d29`, stdout SHA `472ef7e7030c553118a9f328f39f70294bb54d70476687cddec75fc52aa04108`, and stderr is empty. Measured target wall is 11.150331625249237 seconds, supervisor wall 12.782 seconds and peak RSS 278593536 bytes. The prior same-cell global pilot measured 19.775500874966383 target seconds. This is a single-cell empirical comparison, not a general speed guarantee; the failed earlier cache startup is not a science cost benchmark.

## Preservation and falsifiers

New private scripts are copied byte-for-byte into runtime `independent-review-instruments/overnight2-d-review-guarded-cache-pilot/`. Arithmetic SHA is `45278f39fc83acb568f8ce147413abb5bd36fc42f7fa801ee6d84fec97073271`, box audit SHA `8b5900eecfa887fae1cbf75a91aec69351cbcafe2afe532fb59a3310aa6f05e9`, and provenance SHA `73fdbb38f7274253a50f5178015a789b0f37b4e5f4d559d3f5e70de12f227905`. Exact copies are bound by `manifest-guarded-cache-and-seventh-prefix.json`, SHA `c6b97a75eaf9c96fb861dba14913582364a7b714e8a16a1f62345da2c8ce543a`; the earlier positive-geometry instrument is already retained separately.

No scientific target was rerun. A missing queried piece/trace, exact component bound outside the cache, changed dependency/domain identity, insufficient root remainder, future-history lookup, failed strict scalar trial or mismatched prior/creator evidence would overturn acceptance. All assigned checks passed; no subject repair is required.
