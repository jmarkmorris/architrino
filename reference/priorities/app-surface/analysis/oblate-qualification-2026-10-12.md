# Oblate-spheroid interacting qualification

## Selected scenario and acceptance

The operator selected the recommended next step, “Qualify the oblate-spheroid case next … retaining the sphere as a control,” with “do 1” on 2026-10-12. This selects a bounded interacting qualification under the existing canonical surface equation and unrestricted speed. It does not select ring-torus work, an additional response law, free release, app expansion or Git publication. SURFACE-003 remains the comparison owner; this step completes only its oblate scientific subcase.

The EOM solver is the sole forward engine. The shape has equatorial semiaxis $a=0.1$, polar semiaxis $b=qa=0.06$, and flattening $q=0.6$. Six alternating electrinos/positrinos are prepared on the latitude circle of cylindrical radius $\rho=0.06$ and height $h=0.048$. Their angular speed is $0.1$ and speed $0.006$, with canonical coupling $10^{-6}$ and wake speed $c_f=1$. The past is $[-0.5,0]$ and the requested future is $[0,0.15]$. Phases retain the Stage D six exact decimal tokens; the preparation circle is prescribed only in the past.

The preparation is exactly on the shape because $\rho/a=3/5$ and $h/b=4/5$, so their squared sum is one. Constant height makes the prepared velocity tangent. The matched sphere-limit cases use $q=1$, $a=b=0.1$, the same $\rho$, speed, phases and coupling, and height $0.08$: the same reduced latitude. One uses the oblate provider geometry at $q=1$ and the other explicitly selects sphere geometry. These two calculations test recovery of the sphere with identical histories. Comparing $q=0.6$ to that pair compares mapped preparations on different shapes; it is not a numerical refinement or an energy experiment.

**Derived:** an equatorial preparation would leave an invariant plane in this symmetric family and conceal flattening. This off-equator preparation tests the polar gradient and curvature, including generated vertical motion. For the implicit shape

$$
\phi(\mathbf X)=\frac{X^2+Y^2}{a^2}+\frac{Z^2}{b^2}-1,
$$

write $D=\operatorname{diag}(a^{-2},a^{-2},b^{-2})$ and $\mathbf w=D\mathbf X$. Normal-only support gives

$$
\ddot{\mathbf X}=\mathbf A-\frac{\mathbf w\cdot\mathbf A+\mathbf V^{\mathsf T}D\mathbf V}{\mathbf w\cdot\mathbf w}\mathbf w.
$$

This follows by twice differentiating $\phi=0$ and requiring support parallel to $\mathbf w$; it introduces no tangent controller. At the prepared circle the curvature has nonzero vertical component. That statement is geometric; the full delayed interaction still determines whether the evolved vertical motion is nonzero. The independently authored [review/reference](oblate-qualification-review-2026-10-12.md) supplies parameterized-geometry controls and the acceptance disposition.

The predeclared finite matrix is: oblate base (step 0.01, root tolerance $10^{-5}$, geometry/state tolerance $10^{-4}$, preparation mesh 0.02); half-step (0.005 with the same tolerances); tight (0.005, root $10^{-7}$, tolerance $10^{-5}$, preparation mesh 0.01); sphere-limit oblate and explicit sphere at base controls. Every member's complete supplied past is retained. Each run has the existing two-GiB EOM admission allowance and a 120-second cooperative worker deadline; those are allowances, not measured memory use. Records go to a fresh local evidence owner, and original observations are preserved.

Qualification requires accepted completion, durable checkpoint, complete self/partner accounting, computed-source feedback, ordinary subwake chart certificates, independent root/kernel and receiver-total projection/support comparisons at 70 and 100 decimal digits, full nominal polynomial-plus-emitted-tube geometry/tangency screens, and common-time refinement consistency within summed emitted radii. The independently evaluated midpoint equation residual limit is $2\times10^{-5}$; reference precision disagreement must be below $10^{-45}$. The matched $q=1$ calculations must agree within their emitted radii. Nonzero generated vertical motion and changed polar geometry are required to make this a meaningful flattening case. No failed run becomes a successful result by truncating the declared future or dropping roots.

## Causal scope

**Derived:** paths on this oblate shape remain within the ambient radius $a$. Therefore a partner wake delay is at most $2a=0.2$ at $c_f=1$. Under coherent subwake motion, the partner causal residual has strictly positive emission-time derivative, giving a unique ordinary root when the declared signs hold. A self chord is strictly shorter than its positive-delay wake radius, so there is no positive-delay self hit; the coincident endpoint is excluded by the selected equation. The supplied memory extends beyond the largest relevant delay for this finite future. Excluding unprovided older emissions additionally assumes those older paths also remain within this ambient radius bound. Without that assumption, the result is restricted to declared retained memory. Dense polynomial/tube checks and complete production ledger coverage must verify the premises; an animation does not supply them.

## Claim boundaries and falsifiers

The calculation can qualify one finite artificially supported oblate scenario. A root missed within declared memory, a reference point outside the production enclosure, geometry/tangency error beyond its stated tolerance, a refinement discrepancy beyond summed radii, or a failed sphere-limit recovery falsifies the corresponding qualification. A claimed flattening observation fails if generated vertical motion is absent or the polar terms are never exercised. Refer to retained complete requests/responses, independent reports and raw certificates. No asymptotic settling, stability, physical confinement or energy–size–frequency relation follows.

## Current execution

✓ Qualified — all five declared numerical cases, the independent comparison and separate receipt adjudication completed. The selected oblate scientific subcase is finished; torus qualification and oblate browser delivery remain deferred. Root owns production requests, retained observations and this synthesis; the separately authored Codex reviewer owns only its new reference and review. Original Stage D sphere reference and interaction oracle remain frozen. Writer visibility outside this scoped work is unknown; normal shared-checkout state is preserved. No new recurring test enrollment is selected.

## Execution receipts

**Measured by the rebuilt EOM CLI and explicit-use `scripts/eom/fixtures/surface-oblate-run.mjs`:** the base, half-step, tight, q=1 oblate and explicit sphere cases completed the full declared $[0,0.15]$ interval, each with durable checkpoint and no rejected steps. Base and both shape-limit controls used 15 accepted steps; half-step and tight used 30. Every response preserves complete ordered self/partner point accounting, whole-slab partner roots, certified solution/geometry records and computed-source feedback. The invalid height 0.049 control was rejected by both inspection and evolution with `surface_preparation_not_certified`, without a published extension. The separately measured independent qualification follows below.

| Case | Owned lease | Evolution wall seconds | Complete raw response bytes |
| --- | --- | ---: | ---: |
| Oblate base | `d0bf216b-685d-4f16-9ef7-3c3861958566` | 11.685 | 32,202,217 |
| Oblate half-step | `4aab5d6e-6710-43c2-b644-f0a41516dd4a` | 24.280 | 64,447,759 |
| Oblate tight | `7d140a2d-24f7-4d3f-acb4-d0ef4b64d484` | 27.493 | 64,523,749 |
| Oblate q=1 | `6c804904-8a1f-4a6b-9d3e-ea82385fb122` | 12.309 | 32,201,898 |
| Sphere with matched latitude | `47e91317-5dc8-432d-8d40-538576478920` | 11.199 | 32,202,486 |

The table's evolution times come from each run receipt and include process response parsing/retention; they are distinct from total supervisor elapsed time and imply no cost comparison with other studies. Complete requests, raw outputs, accounting and checkpoints are retained under `.local-data/eom/surface-oblate-2026-10-12/` as `{base,step,tight,limit,sphere,invalid}.*`. Source/configuration preimages, 82 matched authored EOM inputs and the exact executable are retained there too. The fresh build lease `911ac9e7-7a4e-4e06-a15f-52ef7bde7ae9` completed exit 0 in 23.012 seconds with its owned group closed. The known-hash/source-row parser check preceded comparison of the actual source preimage; all recorded source hashes matched live files before the target observations were adjudicated. The compiled source digest is `73fca86f9e0a2ec032ba015d83aed447e0f99a40aee8d7f7b22d6e4acaa88fcb`; executable hash is `d0ba308fcf04240444bbed16d8dc2c5ecae16f127225feabc7bc17ba17c6b63c`.

The separately authored reference's final `--known-only` receipt passed before any target read, including parameterized oblate normal/curvature, nonzero interaction projection/support, exact q=1 recovery and wrong-sign/omitted-flattening/interior-bow controls. Its frozen source digest is `12f3e2e9e150040e7cb78ead946cbd04191ee21739d798cfc8d29315556f371c`; imported spherical helper `20f1534998299e4c6202b51b93b42938043e6ab3c3d8ab9ecbb14e72af80c976` and kernel `a3b94301b2994c29e1107de44d627db9566abe9cda60ec8e00b89d9351a275f6` remain unchanged. Root launched the five-case independent comparison as owned lease `160699e0-83bd-47b2-b8d7-c59b9339e648`, deadline 1200 seconds with fifteen-second supervisor heartbeat, using the executable shared Python venv. Comparison edges are oblate-base:oblate-step, oblate-step:oblate-tight and q1-control:sphere-control; changing q is separately labeled shape contrast. A supervised heartbeat is liveness evidence, not scientific acceptance.

## Independent calculation outcome

**Measured by the frozen separately authored `surface-oblate-reference.py` five-case report:** all declared calculations pass at 70 and 100 decimal digits. The reference independently recomputes delayed partner roots/kernel values, receiver-superposed tangent/normal/curvature/support acceleration and midpoint equation residuals, checking them against production enclosures. Exact rational Bernstein ranges over each full nominal polynomial, inflated with emitted position/velocity tubes, screen surface distance, tangency, speed and normal regularity. The production validated integral-map inclusion remains the coherent-solution existence premise; this reference does not independently prove full-slab solution existence.

| Oblate case | Largest full nominal-plus-tube distance screen | Largest tangency screen | Largest midpoint equation residual |
| --- | ---: | ---: | ---: |
| Base | $5.7863\times10^{-10}$ | $7.8337\times10^{-9}$ | $2.0067\times10^{-11}$ |
| Half-step | $6.8165\times10^{-10}$ | $1.0416\times10^{-8}$ | $1.7607\times10^{-11}$ |
| Tight | $6.8151\times10^{-10}$ | $1.0415\times10^{-8}$ | $1.7607\times10^{-11}$ |

The displayed table values are rounded report summaries, not strict newly rounded upper bounds. Full reference values and both precision differences are in `independent-report.json`. The three oblate rows use respectively 180, 360 and 360 midpoint samples, with 900, 1800 and 1800 independent partner-root evaluations; 360, 726 and 726 use generated source history. The full retained-tube speed screen is about 0.006000286, well below the selected chart's wake-speed boundary. These counts describe this finite instrument's sample domain; the production whole-slab ledgers and derived conditional uniqueness argument supply the wider causal accounting.

Common-time comparisons place every position/velocity difference within the summed emitted component radii. Base versus half-step has maximum position difference $8.7632\times10^{-14}$ and velocity difference $1.2510\times10^{-12}$. Half-step versus tight has $7.0043\times10^{-18}$ and $1.3963\times10^{-17}$. Matched q=1 oblate versus sphere has $1.0147\times10^{-22}$ and $2.1324\times10^{-20}$. These are measured implementation/refinement agreements checked against the independent reference; the q=1 geometric equivalence itself follows from substituting q=1 into the differentiated constraint.

The independent changed-shape readout evaluates each member's vertical displacement at time 0.15 relative to its own exact initial height. The oblate and q=1 results differ by approximately $4.91664\times10^{-7}$ for all six members, exceeding their summed vertical position radii (approximately $2.2171\times10^{-10}$ to $4.4133\times10^{-10}$). Thus this matched reduced-latitude preparation resolves a flattening-dependent meridional response. This comparison includes the explicitly mapped initial heights; it is not a numerical refinement, a universal curvature-response law or an energy experiment. An unresolved contrast within those radii would overturn that observation.

The reference lease `160699e0-83bd-47b2-b8d7-c59b9339e648` completed with exit 0 and owned process group closed in 274.181 supervised seconds (274.056658 seconds by its instrument timer). The complete final stdout is preserved as `independent-report.json`; per-path advancing stderr and the final lease remain with the owned supervisor logs. Root's report extraction passed a known five-root synthetic record before reading actual output. The separate reviewer adjudicates the unchanged source and retained observations in [its review](oblate-qualification-review-2026-10-12.md).

## Preservation and closeout

**Measured by the known-case-first `.tmp/surface-oblate-qualification/closeout.mjs` hash, source-row and lease checks:** all 82 retained EOM source preimages match their compiled input identities; the exact executable, new independent reference, frozen spherical helper, frozen kernel and final report match the hashes recorded above. Eight selected owned leases (build, invalid control, five accepted cases and reference) have exit 0 and closed process groups. `operational-receipts.json` preserves their commands, elapsed times and canonical stdout/stderr paths, sizes and hashes. `owned-closeout.json` records the supervisor's clear disposition for this task; this is operational evidence and carries no scientific acceptance claim.

The same final source comparison finds six live preimages changed after this build: `CMakeLists.txt`, `CoupledEvolution.hpp`, `MatchedPairEnclosure.hpp`, `CertifiedAcceleration.cpp`, `CoupledEvolution.cpp` and `MatchedPairEnclosure.cpp`. Their observed hashes are retained in `preservation-receipt.json`; the [separate library-port receipt](../../app-solver/evidence/matched-pair-stage-3-live-library-port-receipt-2026-10-12.md) reports a subsequent operator-applied port. Qualification here binds the exact preserved build/source/output identities, rather than that newer live source tree. Rebuilding from later sources requires separately checking its resulting outputs before assigning them this qualification; no concurrent edits were reverted or adopted into the completed calculation.

**Measured by the known one-file control followed by recursive retention inventory:** the evidence collection contains 129 inventoried files totaling 231,523,561 bytes, excluding `retention-inventory.json` itself. It retains complete requests/responses/checkpoints, build/model/configuration preimages, executable, reference/driver sources and final report. Supervisor logs remain at their recorded canonical owner. These are local preservation records, not an independent backup or a memory-use measurement.

**Measured by `.tmp/surface-oblate-qualification/validate-docs.mjs`:** its link extraction, code/TeX exclusion, anchor and existing/missing path controls passed before checking the nine edited Surface/EOM documents; 236 relative links resolved, no historical link issue was reported, display delimiters were paired and whitespace checks emitted no diagnostics. `node --check scripts/eom/fixtures/surface-oblate-run.mjs` and scoped `git diff --check` pass; no-index whitespace checks over the two new fixture sources emit no diagnostics. `node scripts/validate-priority-ranking.mjs` passes. The selected scientific subcase is removed from active execution and recorded in the Surface work log; the broader SURFACE-003 object remains partial for torus and app delivery. No generator writes, regular test enrollment or publication were performed.
