# A polynomial proposal for the next upward maximum

The [constructor](smooth-two-particle-next-maximum-approximant.py) extends the accepted fixed-history polynomial beyond $9/4$ to locate the next common vertical maximum. It keeps $g=16$, $c_f=1$, the same infinite checkerboard lattice, the supplied old pulse and the transmitter-side acceleration factor. Its output is a numerical proposal for independent full-law residual and continuation checks. It supplies no actual turning time or excursion comparison by itself.

## Retained histories and new sources

The previous source table contains 100 environmental identities and the partner target, with the partner at index 76. Its prefixes through $41/32$ are retained exactly. Newly required environmental labels append after index 100. The right-target prefix through $9/4$ is also retained exactly. The partner's needed forward history is the exact reflection of the already accepted right-target polynomial; no separately integrated partner or independently prescribed future is introduced.

The initial scout uses source cut $57/32$ and target horizon $11/4$. At that intermediate source cut, the old-excited shells have first squared radius $2,3,4,5,6,8,9$, containing 150 environmental identities. The table therefore contains 151 transmitting histories, and the final right target is separate. This scout found no next maximum by its horizon. Its numerical archive and receipt are retained unchanged under the local names `bridge-h11-4.npz` and `bridge-h11-4.json`; the separate actual-continuation and residual argument has now passed independent adjudication.

For the first extension, the intermediate environmental acceleration includes the two original supplied-pulse rows and a conservative list of generated rows at squared ranges one, two and three. Those generated rows sample only the original 76 environmental prefixes through $33/32$. This source stage remains earlier than the return of target-generated motion to the environment. The final target includes the partner's generated forward history and all environmental source candidates through squared range six.

The next numerical scout proceeds to $13/4$, with source cut $73/32$. Its incoming source table contains the entire 151-history table of the preceding scout together with its right-target prefix. Both original targets are therefore represented as generated transmitters. The new environmental paths include generated rows through squared range five; the final target's conservative list extends through squared range ten. New environmental identities with first squared exciting radii 10 through 13 append after the preceding table. All preceding source nodes through $57/32$ and target nodes through $11/4$ are preserved exactly. Completeness and removal of identically zero candidate rows are mathematical obligations of the independent causal census, not consequences of the stored row counts. Identity counts here describe the histories constructed for the calculation, not the full nonconstant population at its final horizon.

Every path uses shared position, velocity and acceleration nodes on the exact grid $1/1024$. Each binary64 value denotes its exact dyadic rational, and the frozen quintic Hermite formula reconstructs the path between nodes. The shared endpoint conditions make every append join exactly $C^2$. Positive-time history queries are rejected outside the retained source interval. Source hashes record provenance; archived numerical data hashes are verified before use.

## Controls and evidence boundary

Before the scout, known cases passed for the six lattice unit neighbors, selected exact two-center shell identities, rational quintic endpoint conditions, a known degree-five source history, the zero generated past, rejection of future extrapolation, and plane reflection with its involution. The construction additionally asserts bit-for-bit preservation of earlier prefixes and exact reflection of the partner. These are implementation controls. Independent residual and propagated-error bounds remain necessary to relate the polynomial to actual Master Equation motion.

The numerical center omits the infinite stationary block term. The full-law certificate must enclose that unchanged term and every generated response; the omission is not a modification of the physical equation. Numerical roots and candidate extrema are locators for an interval proof. No monotone decrease of excursion size is assumed.

The retained local artifacts use literal paths under `.local-data/master-equation-closure/next-maximum/approximant/`: `candidate.npz` for arrays, `candidate.json` for domains, labels, cuts, measured extrema and hashes, and `known.json` for the prior control pass. Failed source coverage, a missing active row, a defective polynomial join, or a residual exceeding its sufficient bound invalidates use of the corresponding candidate. Later growth does not invalidate the already accepted earlier finite excursions.

## Numerical bridge result

The initial scout completed in 26.224 wall seconds. Its sampled vertical velocity has no sign-changing root between $9/4$ and $11/4$; this observation is not a continuous actual-solution sign proof. Its endpoint height is $6.909684681480597\times10^{-5}\ell$ and its dimensionless vertical velocity is $2.2445815256100734\times10^{-4}$. The largest sampled emission time in the source stage was $0.7812576715591011$, below $33/32$, and in the target stage it was $1.750071164681224$, below $57/32$. The numerical root residual was at most $4.440892098500626\times10^{-16}$.

The intermediate environmental polynomial coefficient-sum diagnostic bounds are $7.621778\times10^{-6}$ in position, $2.772407\times10^{-5}$ in velocity and $0.000692052$ in acceleration. Including the reflected target prefix raises the last two diagnostic bounds to $4.698808\times10^{-5}$ and $0.000888505$. These conservative floating-point diagnostics guide the full-law enclosure; they are not independently outward-rounded certificates. No smaller completed upward excursion is inferred: the next maximum remains the target of the later continuation.

## Numerical result through $13/4$

The second scout also found no sign-changing vertical-velocity root through its endpoint. Its candidate endpoint height is $0.00026816913378320783\ell$, with dimensionless vertical velocity $0.0008798356935690889$. This is a substantially larger unfinished rise than the preceding completed descent in the numerical center. The completed upward-excursion comparison remains unavailable because the next maximum has not been located. The numerical observation alone establishes neither an actual no-turn interval nor eventual growth.

The final archive contains 247 source paths through $73/32$: 246 environmental histories and the reflected partner. The incoming table for their newly appended portions contains the prior 151 source paths and the right target at incoming index 151, all retained through $57/32$. Thus both original targets act as generated sources in this new intermediate layer. The final target is retained through $13/4$. The 6474 stored intermediate generated rows and 146 target rows are conservative candidate lists, including inactive rows. They are not counts of all entered physical channels.

The second scout completed in 82.811 wall seconds with progress heartbeats every five seconds. Its largest queried emission times were $1.2812687092152555$ in the source stage and $2.2502780290939985$ in the target stage, both strictly inside their retained domains. The numerical causal-root residual stayed below $4.440892098500626\times10^{-16}$. Diagnostic source polynomial bounds are $1.851147\times10^{-5}$ in position, $0.000100453$ in velocity and $0.000888505$ in acceleration. The target position bound is $0.000268170$. These values determine appropriate independent residual and continuation tubes; they do not certify such tubes themselves. Every preserved-prefix and exact-partner-reflection assertion passed.

The initial scout remains immutable under the bridge names. The second scout is likewise preserved as `bridge-h13-4.npz` and `bridge-h13-4.json`, with the original numerical bytes and an archive path naming that immutable copy. No earlier accepted family has been edited. Each receipt includes the full source-label order, exact early-zero cuts, incoming table and domain, dependency hashes, and current producer hash. A later stage is usable for a finite-horizon actual-motion check only after the required preceding continuation and residual bounds are accepted.

The [independent adjudication](smooth-two-particle-next-maximum-independent-adjudication.md#6-final-adjudication-through-134) now accepts actual complete-population continuation and absence of an additional vertical turn through $13/4$. This actual-solution statement is distinct from the stored polynomial state: the accepted archive represents 247 source histories through $73/32$, plus the right target through $13/4$, or 248 distinct identities. It does not store every environmental position at $13/4$. The complete infinite-population continuation is supplied by the separate theorem, while the source archive retains the earlier paths required by the target's causal roots. The subsequent stored candidate through $15/4$ remains numerical only.

## Third bounded search

The next authorized numerical search ends at $15/4$ and constructs source prefixes through $89/32$. Its incoming table contains the 247 source histories of the $13/4$ scout plus its right target, through $73/32$. New environmental first-old shells 14, 16 and 17 append; shell 15 has no integer lattice points. The candidate lists include intermediate generated ranges through squared radius six and target ranges through squared radius fourteen. The same known controls passed again before this search. It preserves both earlier bridge archives and checks every inherited node before writing its separate current candidate. A missing maximum at this endpoint calls for an explicit report; it does not trigger an unbounded automatic search.

This third search completed in 170.128 wall seconds without locating a next vertical-velocity sign change. No further search was launched. The candidate endpoint is

$$
z(15/4)=0.0015860317369886378,\qquad
z'(15/4)=0.004685373595767277.
$$

These are numerical-center values, not actual-solution enclosures. The unfinished rise continues to increase in this candidate. Its next completed excursion is unavailable because no upward maximum has been found, and the computation establishes no all-time behavior.

The source table now contains 360 environmental identities and the partner, or 361 paths in total. The appended first-old classes contain 48 identities at squared radius 14, ten at squared radius 16 and 56 at squared radius 17. There are 14958 conservative intermediate generated rows and 250 conservative target rows; inactive rows remain in those lists. Source-time maxima are $1.7813666165113948$ and $2.751659559425362$, respectively below $73/32$ and $89/32$. All prefix-preservation and exact-reflection assertions passed.

The source coefficient-sum diagnostic bounds are $0.000112559$ in position, $0.000355790$ in velocity and $0.000992662$ in acceleration. The target position bound is $0.001586032$. As the displacement increases, the omitted stationary center must be covered by a newly checked full-law residual allowance; no earlier small-error allowance is silently reused. Actual statements through this endpoint require a newly closed continuation and propagated-error argument. The earlier $11/4$ and $13/4$ numerical bridges remain unchanged, and the current `candidate.npz` and `candidate.json` describe this bounded $15/4$ search.

## What drives the later numerical rise

A separate endpoint diagnostic reads the existing archive without evolving any new trajectory. It passed a constant-velocity causal-root and transmitter-density row control against a separately written 65-digit formula before reading the target. It also checked the zero changed row and a known simultaneous neighbor gap. The actual endpoint decomposition reuses the constructor's kernel and is therefore an attribution of the numerical center, not an independent proof of that center's correctness. Its local source and receipt are `.local-data/master-equation-closure/next-maximum/approximant/diagnostics/endpoint_analysis.py` and `endpoint.json` in the same directory.

At $t=15/4$, the changed rows have these dimensionless vertical acceleration sums:

| Source group | Vertical acceleration contribution |
| --- | ---: |
| Six unit neighbors | $+0.0123602528$ |
| Twelve face diagonals | $-0.0052427831$ |
| Eight body diagonals | $+0.0003224395$ |
| All changed rows | $+0.0075073801$ |

The geometry part, $K(R_0-P)-K(R_0)$ at each received source position, sums to $+0.0082581362$. The remaining transmitter-density part sums to $-0.0007507561$. This is an algebraic decomposition of the canonical row, not a replacement equation. The leading transmitter factors remain near one. The upward numerical acceleration is therefore associated chiefly with the received displacement geometry, with a net opposing density correction; it is not caused by a nearly singular transmitter denominator in this endpoint calculation.

The largest contributions come from the sources at $(1,0,1)$ and $(1,0,-1)$. At their sampled emissions near $2.75$, both have negative vertical displacements, approximately $-7.35\times10^{-5}$ and $-7.32\times10^{-5}$, and both move downward at approximately $1.12\times10^{-4}$. Their changed rows nevertheless both add upward acceleration at the rising target, for a combined contribution about $0.00828224$. Moving the upper source downward strengthens its upward geometric contribution; moving the lower source downward weakens its downward geometric contribution, leaving an upward change relative to the stationary reference. Other source families oppose part of this change. The endpoint sum explains the observed positive acceleration locally; it does not bound future signed contributions.

The stationary-field cubic bound at this numerical endpoint is $8.936833\times10^{-5}$, approximately 1.2% of the positive changed-row sum. It is a bound evaluated at the candidate displacement. Transferring the sign to an actual solution still requires the full residual and history-error argument over the whole preceding interval.

### Direction and neighbor clearance

The two targets rise together in the candidate. The right target's horizontal velocity at $15/4$ is $-1.9390889\times10^{-6}$, directed toward its partner; reflection gives the opposite horizontal velocity for the left target. Their candidate separation is therefore decreasing at this endpoint even while their common height increases. This separates the common vertical motion from the pair's horizontal separation.

Simultaneous environmental positions are available only through $89/32$, since that is the retained source cut. At that common time the upward neighbor's candidate gap is $0.9998470893\ell$, decreasing at dimensionless rate $0.0003345281$; the downward neighbor's gap is $1.0001529372\ell$. These are near a full lattice spacing, not close encounters. The outward horizontal neighbor's gap is $0.9999999987\ell$. The endpoint causal range $0.9983404406\ell$ to the upper source at $15/4$ compares a receiving target position with an earlier emitting source position. It is not their simultaneous separation. Contemporaneous environmental gaps at $15/4$ are not supplied by this archive.

### A stopping condition for the search

The authorized numerical search stopped at its declared $15/4$ horizon without finding a maximum. A further finite interval can locate a turn or extend a no-turn certificate, but absence of a maximum on finitely many intervals does not imply that no maximum exists. The search must not assume a peak merely because the earlier motion changed direction several times.

A rigorous next maximum requires a positive-to-negative vertical-velocity crossing, with a nonzero negative acceleration enclosure on a suitable turning window and continuous sign control on the intervening interval. A rigorous decision that no future maximum exists would instead need a forward-invariant sign argument. For example, if the full-law acceleration satisfies

$$
\int_{t_0}^{\infty}\max\{-a_z(s),0\}\,ds<z'(t_0),
\qquad z'(t_0)>0,
$$

then integration gives $z'(t)>0$ for every later time, excluding a next maximum. This is a sufficient mathematical condition, not a bound established by the current data. The mixed-sign source contributions explain why an endpoint positive acceleration alone cannot provide it.

A search claiming actual motion must also end its current proof interval when a required source time is uncovered, a causal range or transmitter-factor margin is lost, the assumed continuation class is exited, or propagated errors no longer decide the intended sign. Failure of one such sufficient estimate limits the proof rather than demonstrating a failure of the Master Equation. The stored candidates satisfy their numerical history-domain checks, but the later actual-motion certificates remain separate work.

The local illustration `.local-data/master-equation-closure/next-maximum/approximant/diagnostics/height-through15-4.png` shows the earlier four turns in an inset with an enlarged vertical scale and the later rising tail on the main axes. The full-law height band uses the accepted position allowance $1.2\times10^{-7}$ through $11/4$ and $4.1\times10^{-5}$ thereafter through $13/4$. A vertical boundary at $13/4$ marks the independently accepted interval; the subsequent dashed curve is explicitly numerical. The local `diagnostics/plot-receipt.json` binds the image to its archive and both sign receipts, and `diagnostics/known.json` records the controls run before rendering. No trajectory was rerun to update this illustration.

## Reproduction

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-next-maximum-approximant.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-next-maximum-approximant.py target
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-next-maximum-approximant.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-next-maximum-approximant.py target --stage final --horizon 3.25 --source-end 73/32
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-next-maximum-approximant.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-next-maximum-approximant.py target --stage third --horizon 3.75 --source-end 89/32
```

The later commands consume their respective named bridge archives and receipts. They do not reconstruct or overwrite those inputs. The first command pair describes reproduction of the first bridge's numerical construction; preserve each resulting archive under its named bridge path before running a subsequent stage. A fresh target run replaces the local `candidate` output, so retain any previous candidate needed by an active review before reproducing it.
