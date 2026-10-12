# Independent bounded spherical 3:3 review

## Scope and independent instrument

The operator selected Stage D after the Stage C engineering delivery. This separately authored review owns [surface-stage-d-reference.py](../../../../scripts/eom/fixtures/surface-stage-d-reference.py), a comparison instrument importing only the unchanged [interaction oracle](../../../../scripts/eom/oracle/reference_kernel.py) and general Python/mpmath libraries. Root owns the production run, protocol and status integration. No production EOM or existing oracle source is edited by this reviewer. The reference consumes raw request/response records and reconstructs point states independently from decimal coefficients and analytical circular preparation; it does not import production code or treat uploaded success flags as an independent proof.

The fixed comparison is the centered sphere $R=0.1$, alternating unit polarity 3:3, angular speed $0.1$, speed $0.01$, coupling $10^{-6}$ and $c_f=1$, with preparation $[-0.5,0]$ and a finite future ending at $0.25$. The production protocol owns base/step/tight refinements; reference precision is 70/100 decimal digits. The predeclared maximum midpoint delayed-ODE residual is $2\times10^{-5}$, two percent of the prepared curvature magnitude $0.001$. This is an explicit diagnostic threshold, not a consequence inferred from the reconstruction radii. Root/factor and acceleration precision changes must remain below $10^{-45}$.

## Derived checks

For a centered sphere, differentiating $\mathbf X\cdot\mathbf X=R^2$ twice gives $\mathbf X\cdot\mathbf V=0$ and $\mathbf X\cdot\ddot{\mathbf X}=-\mathbf V\cdot\mathbf V$. With receiver-superposed interaction acceleration $\mathbf A$, the independently implemented projection and support are

$$
\mathbf A_\perp=\mathbf X\frac{\mathbf X\cdot\mathbf A}{|\mathbf X|^2},\qquad
\mathbf A_\parallel=\mathbf A-\mathbf A_\perp,\qquad
\mathbf C=-\mathbf X\frac{|\mathbf V|^2}{|\mathbf X|^2},\qquad
\mathbf S=\mathbf C-\mathbf A_\perp,\qquad
\ddot{\mathbf X}=\mathbf A_\parallel+\mathbf C.
$$

These formulas follow from the selected artificial constraint and contain no mass or imported bulk law. They extend algebraically to off-surface nominal points with nonzero norm, permitting a direct comparison with production tube diagnostics. The discarded normal is calculated only after receiver superposition.

For the immutable oracle's residual $g(S)=|\mathbf X(T)-\mathbf X_j(S)|-(T-S)$, $g'(S)=1-\mathbf n\cdot\mathbf V_j(S)\ge1-v_{\max}>0$ on a coherent subwake source. Negative old-memory and positive near-reception signs therefore locate exactly one partner root in that covered past. For a coherent self history with speed bounded by $v_{\max}<1$, $|\mathbf X(T)-\mathbf X(S)|\le v_{\max}(T-S)<T-S$ excludes every positive-delay self root. These are conditional mathematical statements: nominal/error-tube speed and compatible joins supply checks of their premises but do not independently establish true coherent solution existence. Production's already reviewed integral-map gate retains that obligation.

**Derived finite-window root margin.** The recorded phase tokens and $3.14<\pi<22/7$ give every initial principal phase separation at least $1.04$. Hence the initial partner chord is bounded below by $0.2\sin(0.52)\ge0.2(0.52-0.52^3/6)=0.099313066\ldots>0.099$. If each true coherent path has speed at most $0.02$ on $[0,0.25]$, each moves at most $0.005$ from its initial point, so simultaneous partner separation remains greater than $0.089$. The reverse triangle inequality yields $g(S_2)-g(S_1)\ge0.98(S_2-S_1)$ on the covered preparation/future, including points at which the distance derivative would be undefined. With true radial upper bound $0.1001$, the old-memory sign obeys $g(-0.5)\le0.2002-(T+0.5)\le-0.2998$, while $g(T)>0.089$. Continuity and strict monotonicity therefore establish exactly one partner root for every reception time throughout $[0,0.25]$ and every ordered partner pair, with transmitter factor at least $0.98$ at that root. The same coherent speed bound excludes all positive-delay self roots throughout that finite window. These margins supplement the point reference without modifying its frozen source. Their full-window conclusion is conditional on the validated coherent solutions lying in the independently screened declared tubes. It establishes completeness in the declared retained memory $[-0.5,T]$; it does not independently exclude arbitrary unprovided pre-$-0.5$ histories.

**Scenario-assumed domain and derived older-tail exclusion.** If every unprovided older path also remains on this fixed sphere, or inside the same radial upper bound $0.1001$, then for any $S<-0.5$ and $T\ge0$, separation is at most $0.2002$ while $T-S>0.5$. No older partner or self emission can satisfy the causal equation. This sufficient spatial-domain condition requires no older speed bound. It is consistent with an all-past artificially constrained Surface experiment, but the raw records do not reconstruct or measure that older past. A globally complete past-root statement must carry this extra scenario assumption; the measured qualification below remains bounded to the declared retained history.

The full retained nominal polynomial screen uses exact rational power-to-Bernstein conversion on 64 closed subcells per segment. Convex-hull bounds enclose $|\mathbf X|^2$, $\mathbf X\cdot\mathbf V$ and $|\mathbf V|^2$ throughout each segment. For Euclidean error radii $e_x,e_v$, the radial screen adds $e_x$, the speed screen adds $e_v$, and the normal-velocity screen uses

$$
\frac{\sup|\mathbf X\cdot\mathbf V|+X_{\max}e_v+V_{\max}e_x+e_xe_v}{X_{\min}-e_x}.
$$

The polynomial bounds are exact rational enclosures; square-root conversion and reported comparisons use 100-digit numerical arithmetic, not a separately directed-rounding interval library. They independently screen complete nominal segments with the declared reconstruction allowances; they are not a second full-slab delayed solution-inclusion proof. Midpoint roots and projected acceleration must lie inside the corresponding production slab boxes, with only a $10^{-60}$ arithmetic comparison allowance. Analytical preparation lies inside its declared Hermite tube by the separately reviewed reconstruction lemma; no tolerance is silently added to conceal an interaction disagreement. The point reference checks all 30 ordered partner pairs, complete reception coverage in the exported partner/diagnostic ledgers, all 36 pairs in point snapshots and zero/one self/partner multiplicities. It explicitly requires positive-time emitted roots to exercise computed history.

## Known cases before target reads

**Measured instrument qualification:** `"${AAA_VENV:-../.venv}/bin/python" scripts/eom/fixtures/surface-stage-d-reference.py --known-only` passes with `targetReads: 0`. The exact stationary antipodal case has root $S=T-0.2$, inward opposite-polarity acceleration $25\times10^{-6}$, and zero tangent interaction. A tangent speed $0.01$ gives curvature $(-0.001,0,0)$ at $(0.1,0,0)$. The wrong-curvature-sign control violates the differentiated spherical identity and is rejected. Constant polynomial bounds, a safe speed and an interior velocity peak whose endpoints are safe qualify the rational between-endpoint instrument; independently constructed analytical/cubic histories qualify local coefficient evaluation.

The first known-case attempt caught this instrument's reversed residual-sign assumption: the immutable oracle uses separation minus delay, while production's slab search uses delay minus separation. The reference corrected its sign checks and Newton derivative before any target reads. The corrected known controls then passed, as did the final instrument revision's controls. This is preserved instrument-development evidence, not a production finding.

The reference is frozen before target comparison at SHA-256 `20f1534998299e4c6202b51b93b42938043e6ab3c3d8ab9ecbb14e72af80c976`; the unchanged interaction oracle is `a3b94301b2994c29e1107de44d627db9566abe9cda60ec8e00b89d9351a275f6`, measured by `shasum -a 256` on those two files after the final known-only pass. The separately reviewed production definition/runtime remains frozen during the comparison. Any instrument correction after target execution must be disclosed, controls rerun and all affected target results recomputed; earlier receipts remain historical.

**Measured operational correction:** this reviewer initiated a redundant base-only comparison after root had already launched the final all-three reference. Supervisor `list --active` authenticated the exact redundant lease `01259e49-236a-4c1b-af54-1a3d0589cdc3`; supervisor `stop --run-id` closed only that lease, reporting `stopped`, `SIGTERM` and `processGroupClosed: true` after 18.805 seconds. Its known-case and partial path heartbeats are retained without a final result. Root's all-three lease `d0c8bd89-2888-4486-a048-5ab75a8a69c9` remains the qualification receipt. The initial sandbox launch failed to bind the supervisor loopback endpoint before target spawn; the permitted supervised retry created the named redundant lease. No instrument or production source changed during these launches.

## Acceptance boundary and falsifiers

Independent point-root/kernel/projection agreement, midpoint delayed residuals, polynomial/tube screens and finite refinement can qualify this bounded constrained run. Refinement histories must agree at the union of retained segment endpoints and midpoints within summed emitted coordinatewise position/velocity radii; measured differences and budget ratios are retained. Such interval overlap is a consistency check, not proof of convergence to a unique global trajectory or an empirical order estimate.

Missing root/population/reception coverage, a root or receiver-superposed diagnostic outside its slab box, residual above the fixed threshold, full polynomial/tube geometry or speed rejection, incompatible initial/dense joins, absent computed-source feedback or failed declared refinement falsifies its corresponding gate. Inspect the frozen reference and raw records to reproduce the observation. Stage E UI, long-term recurrence/stability, physical confinement, an energy–radius law and physical acceptance are outside this review. Final target results and independent disposition are pending their supervised receipts.

## Final measured comparison

**Measured:** direct reads of the final supervised stdout/stderr and terminal lease `d0c8bd89-2888-4486-a048-5ab75a8a69c9` establish a passing frozen-reference report, exit 0, advancing per-path/precision progress, and `processGroupClosed: true` after 428.976 supervised wall seconds. The numerical instrument reports 428.732 seconds internally. Logs are under `.local-data/owned-compute/logs/`; the complete 4718-byte stdout JSON is the independent numerical receipt. No reference change occurred between known-only qualification and this target execution.

| Run | Accepted steps | Independently checked midpoints | Partner roots at each precision | Positive-time source roots | Maximum nominal delayed-ODE residual |
| --- | ---: | ---: | ---: | ---: | ---: |
| base | 25 | 300 | 1500 | 606 | $9.3778\times10^{-11}$ |
| step | 50 | 600 | 3000 | 1206 | $2.3562\times10^{-11}$ |
| tight | 62 | 744 | 3720 | 1926 | $2.3477\times10^{-11}$ |

The accepted-step counts and endpoint $0.25$ are measured by direct reads of the retained production run receipts; the independent reference recomputes the roots, factors, receiver-superposed interaction and spherical diagnostics from the raw request/histories, checking all 8220 partner roots at each reference precision. Every selected point lies inside its corresponding exported full-slab emission, factor and receiver-total diagnostic boxes. All 36 ordered pairs are present with zero/one self/partner multiplicities in each exported point snapshot, and full-slab reception records cover the retained interval for every ordered partner pair. All declared geometry, join, residual, feedback and refinement gates pass. The measured maximum interaction magnitude is approximately $6.7283\times10^{-5}$ and the tangent interaction approximately $1.5834\times10^{-6}$, establishing a nonzero independently evaluated interaction signal in this selected run.

The maximum 70-to-100-digit root/factor difference is $3.1588\times10^{-59}$ and the acceleration difference $5.6313\times10^{-64}$, both below the predeclared $10^{-45}$ criterion. Maximum 100-digit point causal residual is $5.0270\times10^{-89}$. These are independent point-reference precision measurements, not a production precision sweep. A separately executed metadata counter passed a known 53/128-bit case before reading the raw target records and measured 750 base and 1500 step point hits reporting `binary64_outward:53`; tight reports 1852 such hits and eight `mpfr_directed_interval:128` hits. That declaration measures selected production precision routes; it does not independently validate the backend from its labels.

| Run | Maximum full nominal polynomial plus tube distance screen | Maximum normal-velocity screen | Maximum speed screen |
| --- | ---: | ---: | ---: |
| base | $4.2984\times10^{-9}$ | $3.8383\times10^{-8}$ | $0.010000434$ |
| step | $1.0299\times10^{-8}$ | $1.1920\times10^{-7}$ | $0.010000515$ |
| tight | $1.9761\times10^{-8}$ | $3.8150\times10^{-7}$ | $0.010000776$ |

These complete-segment screens remain below each declared tolerance and the conservative $0.02$ theorem speed bound. The maximum radial screen also supplies the $0.1001$ radius margin used in the finite-window root argument. Tube allowances increase across these refinements despite smaller nominal geometry errors; they are not a monotonically shrinking-error result. The reported bounds combine exact rational polynomial screening with high-precision norm conversion and emitted reconstruction radii, under the existence/coherence limitation stated above.

| Refinement comparison | Common-time/path points | Maximum position difference | Maximum velocity difference | Maximum coordinatewise position/velocity budget ratios |
| --- | ---: | ---: | ---: | --- |
| base versus step | 1740 | $2.4190\times10^{-12}$ | $1.9537\times10^{-11}$ | $0.004535$ / $0.005300$ |
| step versus tight | 1542 | $8.6541\times10^{-15}$ | $6.3697\times10^{-13}$ | $1.2780\times10^{-6}$ / $6.9251\times10^{-6}$ |

All coordinatewise differences lie within summed emitted position/velocity radii at the union of retained endpoints and midpoints. This passes the declared finite refinement-consistency gate; it does not establish an asymptotic order or convergence for arbitrary geometries/parameters. The residual measurements are nominal retained-curve point checks, independent of the production whole-slab existence proof.

## Provenance and final disposition

**Measured:** a separately executed read-only Node SHA-256 check passed the known `abc` digest before target reads, then verified the six raw base/step/tight request/response hashes against the independent receipt, the frozen reference/oracle hashes, all 79 actual EOM source inputs against the compiled/generated receipt, and the source preimage digest. The final EOM source identity is `6c21ad55bce6904e906cc8e720a39092dd7f57a22e1012f480b18a497721fb13`, configuration identity `badb265eacef70bac7bb21550adde901fc7737c29d8d295bad82159be9f9414c`, and descriptive build identity `4d99312752f79ddf21d0dd185e0f9c6f8423ac5f2e61a2b68c9f0dd594a10aaa`, matching the Stage C compiled identity. Their dependency-inventory limitations remain those of the Stage C review.

| Retained response | SHA-256 |
| --- | --- |
| base.response.json | `7a62c923420a04c22926588399c0ae9d8dc1417b51c3e934327f3dc2109294e4` |
| step.response.json | `93f49894965f033996a82c8d9a58d274ccd220dbfccf4b4cfd09c6f8f7842acf` |
| tight.response.json | `a3a06cae65b1b082aad697a714154518669c203066bf723b1fd1775c577520b4` |

The remaining request hashes are in the complete independent receipt. Raw records remain under `.local-data/eom/surface-stage-d-2026-10-11/`; their preservation and compact inventory are root-owned, and no independently verified backup is implied by local retention. The production driver streamed large complete ledgers directly from the same EOM CLI because these scientific raw responses exceed the browser/process client's declared response buffer. This is a bounded qualification route, not evidence that Stage E's app consumer can currently ingest those full payloads.

The separately retained coincident-partner negative receipt `9a507db1-13db-4e01-a515-5ba0f4f169b2.stdout.log` reports `root_completeness_not_certified`, accepted time zero and a durable preparation prefix. Its direct read establishes the explicit unsupported-contact halt control; no unsupported future was published. The earlier memory-admission failure remains a separate failed record, as described by the production owner.

**Inferred scoped acceptance:** the independently derived spherical identities, analytical known controls, frozen arbitrary-precision point interaction reference, complete nominal polynomial/tube screens, finite-window root margin and retained refinement receipts qualify this one bounded interacting spherical 3:3 `canonical-surface/v1` calculation over $[0,0.25]$ in its declared retained-history domain. Positive-time emissions show that the future depends on solver-generated histories, rather than only prescribed preparation. The conclusion retains production's validated coherent-solution premise, the independent point-versus-full-slab distinction, and the separately stated conditional older-tail exclusion. No actionable Stage D comparison blocker remains in the reviewed records.

This disposition does not establish a stable pattern, recurrence, long-term retention, unrestricted event continuation, physical confinement or an energy/frequency/radius law. Stage E UI and broader scientific geometries/parameter studies remain open. The implementation owner retains final owner/queue integration and operational closeout; this separately authored record closes only the selected finite Stage D review.
