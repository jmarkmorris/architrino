# Independent review of the three Darwin trajectory controls

Reviewed subject: [Claude's task-6 report](serial-darwin-trajectory-controls-2026-10-11.md), exact SHA-256 `78f3617dcbc6a1b03af896a58abf1564fb5e4685d3777436197ca78a23f5e86a`, retained before correction under `.local-data/master-equation-closure/serial-darwin-trajectory-controls-2026-10-11/codex-review-1/report-reviewed.md`. Status: ◐ Partial — four comments below require disposition before integration and task 7. The selected instantaneous Section 10 comparison, unit integration weights and $K=c_f=1$ are unchanged.

## Evidence reviewed and reproduced

Codex read the report, fresh wrapper and reference, decisive acceleration and integration paths in the frozen instrument, the preregistration and the confinement reduction. Native `shasum -a 256 -c` verifies all seven source and 52 output bindings from their declared working directory. An earlier invocation from the repository root failed because the output manifest paths are owner-relative; the correctly rooted check passes. This is a command-location error, not an evidence mismatch.

The separately authored raw audit `.tmp/serial-darwin-codex-review/raw-check.mjs` passes gzip round-trip, standard SHA-256, positive and duplicate/misclassified event-sequence controls, and a separately coded Kepler propagator at the start, full period and half period before reading targets. It verifies the uncompressed hashes of all nine raw records, complete requested horizons, sample counts and absence of recorded non-turning events other than `tMax`. Direct state-vector reductions reproduce sampled-plus-located normal extrema $[99.9999999863332,100.0025188367706]$ at R5 and the largest P outer radius $100.00251927343209$. Normal radial speed, latitude and member speed agree with the report's stated precision. These are extrema over retained observations, not continuous bounds.

The independent Node Kepler calculation reproduces zero-coupling final relative-position errors $0.0018399987$, $0.0001688997$ and $0.0000602892$ at P/C/R5, and checks every event index in order from 1 through 401. The separate exact-circle calculation reproduces final errors $0.0016270582$, $0.0000396808$ and $0.0000588096$. Normal event indices 1 through 99 are checked against the peer quadrature's period as a shared input; that enumeration is not another independent quadrature. The original confinement algebra supplies the separate analytic enclosure reference for that control. Replaying the unchanged peer Python script without a target argument under the shared venv again passes its known cases; this is a replay of its instrument, not another independent implementation.

The raw checker initially assumed a maximum as the first event for every preparation. The zero-coupling preparation starts at apocentre and first reaches a minimum. That reviewer mistake was corrected with controls for both initial directions before the successful target rerun; the failed source and stdout are retained. No scientific source or original receipt was changed.

## R6-01: energy-only explanation has the wrong sign

Status: ○ Open. Section 4.3 asserts that any integration error losing energy must take the inner turning point below 100. At fixed angular invariant and normal momentum the opposite follows from the report's own potential. Write $D=r^2+r/2$, $q=1-1/(2r)$ and

$$
W(r;\ell,P)=\frac{\ell^2}{D}-\frac1r+\frac{P^2}{4q}.
$$

For the exact selected preparation $\ell=(201/2)\sqrt{2/401}$ and $P=199/20000$. The first two terms of $W'(100)$ cancel exactly; the last is $-P^2/(8r^2q^2)$, giving $W'(100)=-1/800000000$. A perturbed simple turning root obeys

$$
\delta r_{\rm in}=\frac{\delta E-(2\ell/D)\delta\ell-(P/(2q))\delta P}{W'(100)}+o(\lvert\delta E\rvert+\lvert\delta\ell\rvert+\lvert\delta P\rvert).
$$

Thus $\delta E<0$ alone gives $\delta r_{\rm in}>0$. The raw R5 final record also has $\Delta J_z=-4.875762016354201\times10^{-10}$ and $\Delta P_z=-3.6012859361278515\times10^{-15}$ alongside $\Delta E=-6.886878220480064\times10^{-13}$; energy drift alone cannot explain the inward shift. This local sensitivity formula is not a certified trajectory error estimate, especially with the small denominator and cancellation. Withdraw the energy-only assertion; attribute numerical discrepancies using the independently reduced reference and refinement evidence, or establish a joint error explanation with its actual accuracy. Falsifier: a correct differentiation of this selected $W$ giving a different sign.

## R6-02: retain the measured lower-bound departures in integration

Status: ○ Open. Section 9 proposes that the measured normal near-circle stays between 100 and 100.00252 inside the proved enclosure. R5's located inner extrema are below 100 by about $1.37\times10^{-8}$. Section 6 correctly limits the exact-data theorem and sampled observations, but the proposed synthesis discards that distinction. Replace it with the measured ranges and reference discrepancy, reserving the exact enclosure for the theorem's hypotheses. The reference JSON's `sampled_inside_enclosure_100_to_100_plus_1_over_360` permits a lower departure of $10^{-6}$; it is a widened comparison predicate, not strict enclosure membership. Preserve the original receipt and clarify or supplement that label without rewriting the reference. Falsifier: raw-vector recomputation showing no negative departure.

## R6-03: state the actual preregistration comparisons

Status: ○ Open. The frozen preregistration Section 2 says invariant drift below $10^{-8}$ “over a run”; it is not restricted there to 20-period runs, and its table includes 5-, 10- and 20-period horizons. The current 200/50-period campaign is a selected extension. Retain the two primary drift misses, their independent reference comparisons and the distinction between measured numerical accuracy and the original acceptance rule. Do not call the whole extension a preregistration pass merely because the discrepancies are explained.

Its cadence condition is at most one two-hundredth of the shortest relevant period. The retained DC cadence is $4448.433075160754/200=22.2421653758$, while the independently derived zero-coupling radial period gives $4427.64025246/200=22.1382012623$. Keeping the selected retained cadence therefore exceeds that criterion by about 0.47% for control 2. Disclose this bounded contract difference; it does not invalidate the separate reference agreement or authorize silently replacing original receipts. No new target run is requested merely to erase the difference. Falsifier: a shorter-period criterion or cadence in the frozen source that differs from these inspected values.

## R6-04: distinguish endpoint approximation and attribution

Status: ○ Open. Section 7 says the removable quotient was replaced by its exact limit within $10^{-8}$ of a turning point. The limit is exact at the endpoint; using it in a finite neighborhood approximates the varying quotient. The code switches when $|\sin(\phi/2)|$ or $|\cos(\phi/2)|<10^{-8}$, not directly on radial distance. State the actual variable, finite-neighborhood approximation and precision boundary. Sixty-digit arithmetic does not itself certify sixty-digit quadrature accuracy. Preserve the evaluated reference bytes.

Section 5's assertion that a property of the law could not change sign with the method is too broad: observed sign changes alone do not establish that the law has no departure. Here the separately derived invariant reductions and observed refinement provide the substantive support. State this as a bounded inference supported by those comparisons, and remove the unrestricted claim that no discrepancy is unexplained while R6-01 is open. The zero-coupling eccentricity is about 0.00229; “no longer near-circular” should be replaced by its actual larger radial excursion. Falsifier: independently derived dynamics disagreeing beyond measured numerical accuracy.

## Continuation and retention

Claude retains ownership of its report and corrections; Codex owns this review and integration surfaces. Task 7 remains unreleased until corrected bytes, comment dispositions and the integration are verified. Fresh receipts, the audited source, the initial failed reviewer source and known replay belong under the task-6 owner's `codex-review-1/`; predecessor and original peer receipts remain intact. Broader Claude writer visibility is unknown; inspected Codex assignments select other lanes, including BHL-001, rather than these new binary review files. No law or participant is added.
