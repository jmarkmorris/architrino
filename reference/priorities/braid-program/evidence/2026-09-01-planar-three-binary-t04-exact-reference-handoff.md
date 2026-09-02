# T04 Exact-Reference-to-EOM-Solver Handoff

Date: 2026-09-01
Compatibility identifier: `aaa-corpus-advancement`
Status: accepted representation handoff; no one-cycle evolution result
Mathematical owner: [Planar Three-Binary Circular Balance-Ladder Evidence](2026-08-29-planar-three-binary-circular-balance-ladder.md)
Queue owner: [Planar Common-Center Three-Binary Investigation Work Queue](../planar-three-binary-work-queue.md)

## Decision

The deterministic T04 prehistory produced by `scripts/eom/prepare-planar-three-binary-circular-release.mjs` is accepted as a controlled numerical representation of the already accepted exact equal-radius regular-phase T04 circular balance. The checked handoff has SHA-256 `11bdeb13a74149c5faff6383a49f2a829db23896202753cc28ad7402448aba67`, contains six members and 24,576 cubic segments, uses $c_f=1$, covers one complete period before release, and preserves the expected 72 directed ordinary roots.

This decision closes the identity-and-error bridge only. The EOM solver has not reproduced a full cycle from this handoff. The earlier accepted prefix, its later root-completeness halt, and every open retention or stability question remain unchanged.

Plainly: the stored past is now a checked approximation of the known exact circle. That does not show that numerical evolution follows the circle for one turn or that a disturbed assembly persists.

## Frozen Reference And Decimal Reconciliation

The current exact source record fixes

$$
\beta_f=2.97430717611729356802738019962440591468622254100547814230994808945528764751913088497728898,
$$

$$
\frac{R}{R_*}=0.561731700071290220741714705079519765721794402692901195293114115906645078352028088997751738.
$$

The preparation declaration carries the same values truncated beyond 69 decimal places and freezes the following accepted computation intervals:

| Quantity | Outward interval used by the handoff review |
| --- | --- |
| $\beta_f$ | $[2.974307176117283568027380199624405914686222541005478142309948089455288,\ 2.974307176117303568027380199624405914686222541005478142309948089455288]$ |
| $R/R_*$, current-source serialization | $[0.5617317000712901,\ 0.5617317000712904]$ |
| $\Omega$ | $[5.294889314133098,\ 5.294889314133100]$ |
| $P=2\pi/\Omega$ | $[1.186650925904820,\ 1.186650925904823]$ |

The earlier binary64 evidence printed $\beta_f=2.974307176117306$ and $R/R_*=0.5617317000713459$. Its separate compatibility enclosures $[2.97430717611728,2.97430717611732]$ and $[0.56173170007128,0.56173170007136]$ both contain the current exact source value. These wider intervals reconcile the two recorded decimal forms; they do not replace the tighter exact-source handoff values or promote the older binary64 point into an exact root.

Converting the current source values to binary64 introduces absolute carrier errors no larger than $1.32\times10^{-16}$ in $\beta_f$, $7.93\times10^{-17}$ in $R/R_*$, $2.23\times10^{-17}$ in $\Omega$, and $1.41\times10^{-16}$ in $P$. The independently checked six-receiver acceleration comparison admits the frozen radius within a $2\times10^{-10}$ receiver-compatibility enclosure and bounds the maximum full-vector residual by $2\times10^{-8}$.

Plainly: the older and newer printed numbers differ only in digits far beyond the precision needed to identify this T04 row. The solver input uses the newer source value, while the wider compatibility boxes explain why the older display still named the same balance.

## Root And Acceleration Receipt

The focused test constructs a fresh generic prescribed-history record rather than calling the handoff constructor for its root ledger. The unchanged `AnalyticalBraidEvaluator` recomputes every cross-transmitter channel for all six receivers. The unchanged circular self-hit instrument separately recomputes the nontrivial same-transmitter roots. Together they cover all 36 ordered receiver-transmitter channels, reproduce the handoff's per-channel root-count matrix, sum to 72 directed roots, and check every receiver's radial, tangential, and axial acceleration components.

The test also binds the exact v3 source record, checks the tight $\beta_f$ bracket, checks both legacy compatibility intervals, and confirms that the six independently reconstructed receiver-compatible radii agree within $2\times10^{-10}$. Its acceptance ceiling is a maximum full-vector acceleration residual of $2\times10^{-8}$.

This is measured numerical agreement between separately authored instruments and the frozen source identity. The already accepted interval certificate remains the authority for the exact T04 root; the test does not re-prove that theorem.

Plainly: a general root finder and a separate self-root calculation both recover the complete T04 ledger without reading the prepared cubic history. Their agreement checks that the handoff names the right mathematical member, not that future evolution succeeds.

## Prehistory Enclosure

The independently authored Decimal checker read the sealed handoff bytes and accepted all six member histories. It measured maximum endpoint defects of $8.784804576352315015711098254\times10^{-16}$ in position and $9.887080273258133706378689376\times10^{-15}$ in rate. Its cubic-Hermite remainder calculation bounded the complete-segment position error by $8.978962513926490263216188204\times10^{-15}$ and the rate error by $1.351123584532765773664848559\times10^{-9}$, within the declared respective budgets $2\times10^{-13}$ and $2\times10^{-9}$.

The retained past covers $[-P,0]$. Its depth is

$$
P=1.1866509259048213597786822809197254921825571223936242037859209975941094859055343,
$$

while the maximum circular chord delay is $1.1234634001425804414834294101590395314435888053858023905862282318132902$. The positive clearance is $0.0631875257622409182952528707606859607389683170078218131996927657808192859055343$.

Plainly: every causal root needed at release lies inside the supplied past, and the stored cubics stay inside their declared position and rate envelopes. No future segment was supplied or assumed.

## Reproduction Commands And Identities

The following commands produced the accepted receipt:

```sh
node --test tests/planar-three-binary-circular-release-preparation.test.js
node scripts/eom/prepare-planar-three-binary-circular-release.mjs --out <fresh-directory>
"${AAA_VENV:-../.venv}/bin/python" scripts/eom/check-planar-three-binary-circular-release.py --handoff <fresh-directory>/handoff.json --prehistory-only --out <receipt.json>
```

The focused test passes 3/3. The source configuration has SHA-256 `569902016197cdbea29082ffd1fcf3881d962f5c1cba26f3eeb56dcdcaa2e7a8`; the unchanged preparer has SHA-256 `031706b047589664eae160d6430cc89f8373a0278aeec7fb85931a993dbc5b44`; and the unchanged independent Decimal checker has SHA-256 `a605a0f8a1fe1d81b9309c6b14e1f2db710f48edd5bca0f9a34e2ad98059a320`.

## Claim Grade, Boundary, And Falsifiers

- **Derived:** one-period coverage exceeds the maximum circular chord delay by the stated positive clearance.
- **Measured:** the independent root and acceleration instruments pass the 72-root, six-receiver, decimal-compatibility, and $2\times10^{-8}$ residual checks.
- **Measured:** the independent Decimal checker accepts the sealed 24,576-segment prehistory inside its declared position and rate budgets.
- **Not established:** one-cycle EOM reproduction, nearby-history uniqueness, retention, stability, binding, a physical particle identity, a score change, or scientific acceptance.

Acceptance is falsified by a changed handoff hash without a new receipt; a source value outside the frozen intervals; a missed, duplicated, non-simple, or differently owned root; disagreement among the six receiver-compatible radii beyond $2\times10^{-10}$; a full-vector acceleration residual above $2\times10^{-8}$; an analytic circle value outside a stored cubic plus its declared enclosure; a discontinuous join; or insufficient past coverage.

Plainly: this packet says exactly which input is safe to use for the next T04 comparison and exactly what would invalidate it. All dynamical conclusions still require the blocked one-cycle calculation.
