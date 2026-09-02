# Planar Co-Rotating $N{:}N$ Circular Acceleration-Balance Evidence

Date: 2026-08-29
Compatibility identifier: `aaa-corpus-advancement`
Current compact receipt: [`2026-08-29-planar-co-rotating-n-n-circular-balance.receipt.v1.json`](2026-08-29-planar-co-rotating-n-n-circular-balance.receipt.v1.json)
Instrument: [`PlanarCoRotatingRingBalance.mjs`](../../../../src/prescribed-path-analysis/PlanarCoRotatingRingBalance.mjs) and [`PlanarCoRotatingRingSearch.mjs`](../../../../src/prescribed-path-analysis/PlanarCoRotatingRingSearch.mjs), driven by [`analyze-planar-co-rotating-rings.mjs`](../../../../scripts/equation-mapping/analyze-planar-co-rotating-rings.mjs)

Focused extension: the independently checked [regular alternating $12{:}12$ packet](2026-08-29-planar-co-rotating-12-12-alternating.md) records a separate 24-member balanced candidate and its derived exclusion from both the planar three-binary common-center configuration and the coaxial-separated two-planar-braid configurations. It does not extend this campaign's complete regular-polarity census beyond $N=6$.

## Decision

The regular alternating $2N$-gon contains a prescribed acceleration-balanced candidate for every tested $N\in\{2,3,4,5,6\}$ under the default uncapped Master Equation with $c_f=1$. Exactly one of those five representative loci is planar common-center three-binary constraint: the $N=3$ regular alternating hexagon. The other regular polarity classes are bounded negatives on $0.05\leq\beta_f\leq20$. The nonuniform fixed-phase searches establish no additional nonregular solution and do not close their multidimensional domains; they remain unresolved. The dedicated equal-radius antipodal-neutral planar common-center three-binary constraint phase search contains the verified regular candidate but does not establish the broader unequal-phase chart.

Plainly: five rigid regular rings pass the acceleration equation, one for each tested inventory size. Only the six-member ring has the exact three-neutral-binary inventory needed for planar common-center three-binary constraint. The wider phase searches are evidence of where this run looked, not proofs that no other arrangements exist.

## Model And Search Contract

For a receiver at phase $\phi_r$ and transmitter at phase $\phi_t$, rigid co-rotation reduces the causal-root equation to $2\beta_f\lvert\sin((\phi_r-\phi_t+s\chi)/2)\rvert-\chi=0$ on the finite domain $0<\chi\leq2\beta_f$, with circulation sense $s\in\{-1,+1\}$. The evaluator partitions this domain at every zero and stationary point of the absolute-sine lobes. Each partition is concave, so endpoint signs plus the one possible interior maximum enumerate all simple roots and identify unresolved tangencies. The coincident self root is excluded; every nontrivial same-transmitter root is included.

Plainly: because two points on one circle are never more than two radii apart, the emission-delay search is finite. Splitting the root equation into single-hump pieces prevents a coarse time grid from silently stepping over a root.

The regular search enumerated every balanced polarity word modulo global label rotation and global polarity conjugation. Reflection was used only after the implementation and independent checks established its covariance when circulation reverses. The declared speed interval was $[0.05,20]$, with base step $0.025$, explicit probes below, at, and above $\beta_f=1$, the binary seed $3.070356625390253$, topology-boundary bisection, logarithmic probes on both sides of root births, tangential-zero bisection, and local-minimum refinement. The nonuniform stage removed global phase, parameterized positive cyclic gaps with minimum gap $0.01$, and used deterministic multistart Nelder-Mead optimization with 900 evaluations per seed. The planar common-center three-binary constraint antipodal-neutral chart used 2,400 stratified Halton samples, retained 18 seeds, and locally refined binary phases and $\beta_f$ while preserving the exact antipodal map.

Plainly: the one-dimensional regular search is dense and adaptively follows root changes. The higher-dimensional phase searches are substantial deterministic searches, but they are not covering proofs and therefore cannot license a negative theorem.

## Regular-Ring Taxonomy And Results

| $N$ | Symmetry-inequivalent balanced classes | Alternating antipodes | Exact configuration relation of balanced representative | $\beta_f$ | $R/R_*$ | Directed roots | Max radial residual | Max tangential residual | Max axial residual | Max full residual | Tightened max full residual | Minimum Jacobian floor | Verdict |
| ---: | ---: | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 2 | 2 | Like polarity | $2{:}2$ circular-path assembly | 2.1472456589006224 | 0.4161828083090951 | 24 | $4.440892098500626\times10^{-16}$ | $5.36654054528185\times10^{-13}$ | 0 | $5.366541004644862\times10^{-13}$ | $4.8905324234738146\times10^{-14}$ | 0.3171169078837861 | Balanced candidate |
| 3 | 3 | Neutral | planar common-center three-binary constraint equal-radius planar locus | 2.974307176117306 | 0.5617317000713459 | 72 | $3.2862601528904634\times10^{-14}$ | $6.88338275267597\times10^{-14}$ | 0 | $7.62510728881475\times10^{-14}$ | $4.500069559058899\times10^{-12}$ | 0.11680602873827528 | Balanced candidate |
| 4 | 7 | Like polarity | $4{:}4$ circular-path assembly | 1.6595117714602787 | 1.7441728749235372 | 80 | $7.993605777301127\times10^{-15}$ | $2.8634872251132037\times10^{-12}$ | 0 | $2.8634872251132037\times10^{-12}$ | $5.389468480375884\times10^{-12}$ | 0.1379452644538317 | Balanced candidate |
| 5 | 13 | Neutral | $5{:}5$ circular-path assembly | 1.5556550244378213 | 2.7040642782802484 | 120 | $1.1546319456101628\times10^{-14}$ | $7.644551658358978\times10^{-12}$ | 0 | $7.644554186576438\times10^{-12}$ | $3.45619090729925\times10^{-11}$ | 0.1049072417723822 | Balanced candidate |
| 6 | 35 | Like polarity | $6{:}6$ circular-path assembly | 1.484095961562689 | 3.842971035530748 | 168 | $1.2434497875801753\times10^{-14}$ | $1.8199219908865416\times10^{-11}$ | 0 | $1.8199219995557143\times10^{-11}$ | $7.628744473244363\times10^{-11}$ | 0.08372241039222517 | Balanced candidate |

Plainly: every positive result belongs to the alternating regular ring. Odd $N$ has neutral antipodal pairs; even $N$ has like-polarity antipodes. Neutral antipodes alone do not make a record planar common-center three-binary constraint: $N=5$ has ten members, while planar common-center three-binary constraint has exactly six. The twelve-member $N=6$ ring has one center and therefore does not satisfy the positive component-center separation required by C5 or C6.

The remaining regular polarity classes are bounded negatives on the declared interval: 1 class for $N=2$, 2 for $N=3$, 6 for $N=4$, 12 for $N=5$, and 34 for $N=6$. Across those classifications the raw packet records respectively 50, 111, 336, 780, and 2,520 root-topology intervals. The ignored local raw artifact retains, for every class, the phase word, orbit metadata, antipodal status, exact configuration relation, scan interval, topology intervals, candidate values, compatible scale, residual components, refinement behavior, independent-reference declaration, claim grade, falsifier, and verdict. The tracked receipt retains the raw SHA-256, correction history, declared domain, decision, and compact independently consumed candidate rows.

Plainly: the negative rows reject only their exact regular polarity pattern below speed 20. They do not reject faster rings or variable-speed, breathing, eccentric, nonplanar, or freely evolving paths.

## planar common-center three-binary constraint Coordinate Gate

The $N=3$ alternating record maps to planar common-center three-binary constraint label by label: six architrinos form three opposite-polarity antipodal pairs; every pair has midpoint at the common center; all paths lie in the same plane normal to one axis; all have the same radius, frequency, and circulation; and each binary has $h_a=0$ and $\rho_a=R_a$. Written by binary, the positive endpoints have phases $0$, $2\pi/3$, and $4\pi/3$, and their negative partners are shifted by $\pi$. This is the equal-radius phase-symmetric point inside the live planar common-center three-binary constraint chart.

Plainly: the configuration relation follows from the live coordinates, not from the ring looking hexagonal. The $N=2$, $4$, $5$, and $6$ records fail the planar three-binary common-center inventory gate before any dynamical result is considered.

The dedicated equal-radius antipodal-neutral chart reproduces the same planar common-center three-binary constraint point at $\beta_f=2.974307176117306$ and $R/R_*=0.561731700071346$, with 72 directed roots, maximum full residual $8.133005053399885\times10^{-14}$, tightened maximum full residual $4.513593857146302\times10^{-12}$, and minimum Jacobian floor $0.11680602873827572$. Its broader unequal-phase verdict is `unresolved`. Unequal radii were outside this campaign.

Plainly: the chart search confirms that the regular solution is present when the three binary phases are allowed to vary. It does not prove that this is the only phase choice, and it says nothing about unequal binary radii.

## Independent Checks And Claim Grade

The candidate-specific test freezes the new evaluator as the subject and uses two unchanged instruments as references. `AnalyticalBraidEvaluator` independently solves the generic prescribed-history cross-transmitter causal roots and recomputes their emission-site acceleration contributions. `CircularSelfHitBinaryAnalysis` independently supplies the circular same-transmitter root ledger. The test matches root counts, root locations, and acceleration vectors for every directed pair at all five promoted regular candidates. Separate tests check circular kinematics, full-cycle rotational covariance, reflection with circulation reversal, polarity-orbit counts, antipodal pairing, and the live planar common-center three-binary constraint source's coordinate mapping.

Plainly: the positive regular-ring result is independently verified at the prescribed Master-Equation acceleration level. The independent instruments do not test free evolution or stability, and the multidimensional search coverage remains diagnostic rather than exhaustive.

Claim grades are mixed and explicit. Taxonomy, antipodal parity, finite root domain, and lobe completeness are derived. Candidate residuals and bounded regular-class negatives are measured by the declared instrument. Cross-root and same-transmitter agreement at the five promoted points is independently measured. The absence of an additional nonregular candidate is only a search observation; the broader phase charts remain unresolved.

Falsifiers are direct: a missing causal root, a root residual or chord residual that fails refinement, a nonzero receiver tangential or axial component, receiver-incompatible radial scales, a failed independent-evaluator match, or a valid balanced point in a row marked bounded-negative overturns the corresponding claim. A valid unequal-phase point would not overturn the regular result; it would overturn only the unresolved search's present absence-of-additional-candidate observation.

Plainly: every claim can be challenged by a named calculation. Discovering another solution would extend the landscape, while finding a missed root in a promoted ledger would invalidate that promoted balance result.

## Evidence History And Reproduction

The write-once `v1` record completed in 491.156 seconds with 11 heartbeats but missed narrow post-root-birth tangential zeros because its topology intervals lacked boundary-local probing. The corrected `v2` record added logarithmic boundary probes and bisection, completed the full regular and phase searches in 1,873.927 seconds with 131 heartbeats, and recovered all five regular representatives. The `v3` record preserved the closed `v2` regular ledgers and retained the regular planar common-center three-binary constraint point in the dedicated antipodal chart, completing in 158.622 seconds with 71 heartbeats. The current `v4` record additionally retains every exact regular phase point inside the general nonuniform charts while keeping each genuinely nonregular extension unresolved; it completed in 158.017 seconds with 71 heartbeats. The compact receipt preserves the SHA-256, size, correction reason, and elapsed time for all four raw versions; the full packets are retained locally under ignored analytical storage rather than as tracked branch-tip files.

Plainly: the first run's negative omissions were an instrument defect, not physics evidence. The later records preserve the correction trail and make the current claim boundary machine-readable.

Reproduce the full campaign without overwriting the evidence owner by running `node scripts/equation-mapping/analyze-planar-co-rotating-rings.mjs --out=.local-data/braid-analysis/retained-evidence/planar-co-rotating-rings/reproduction.json`. To recheck only the corrected phase-search semantics against the locally retained regular ledgers, add `--reuse-regular=.local-data/braid-analysis/retained-evidence/planar-co-rotating-rings/2026-08-29-planar-co-rotating-n-n-circular-balance.v3.json`; the CLI rejects a reused packet whose model or regular scan domain differs. Refresh the compact receipt with `node scripts/build-machine-artifact-receipts.mjs --target=ring --write`. Run the independent checks with `node --test tests/planar-co-rotating-ring-balance.test.js tests/circular-self-hit-binary-analysis.test.js`.

Plainly: reproduction and full ledgers stay in ignored local storage. The tracked receipt makes the result, correction trail, raw identity, and test-consumed candidate rows durable without adding millions of review lines.

## Claim Boundary And Next Blocker

The campaign establishes prescribed acceleration balance for five exact regular alternating rings and a bounded negative for every other regular polarity orbit on $0.05\leq\beta_f\leq20$. It establishes one independently checked planar common-center three-binary constraint locus: the equal-radius phase-symmetric alternating hexagon. It does not establish retention, binding, stability, release survival, physical identity, score increase, or scientific acceptance. No stability linearization was performed.

Plainly: an exact acceleration-balanced prescribed circle is a legitimate starting state for evolution, not evidence that the EOM solver will keep it there.

The next genuine planar common-center three-binary constraint blocker is a separately predeclared ordinary EOM-solver evolution from this balanced locus with complete retained prehistory, identical coupling, guarded root continuity, and a retained-branch decision. A claim about more than the regular locus separately requires controlled coverage of unequal phases and unequal radii.
