# Ring-torus interacting qualification

## Selected scenario

The operator selected “qualify the ring-torus case next” with “do 1” on 2026-10-14. SURFACE-003 owns this bounded scientific comparison. EOM is the sole forward engine; the selected composition is `canonical-surface/v1`, numerical evolution with unrestricted speed and no boundary response. This does not select app expansion, free release, a new interaction law, recurring testing or publication.

The ring torus has major radius $L=0.1$ and minor radius $r=0.05$, centered at the origin with the identity frame. Its outer shoulder preparation has cylindrical radius $\rho=0.13$ and height $z=0.04$; its inner shoulder has $\rho=0.07$ at the same height. Both lie exactly on the surface because $(\rho-L)^2+z^2=0.03^2+0.04^2=r^2$. Six alternating electrinos/positrinos use the six preserved decimal phase tokens from the oblate case. Each supplied circular past covers $[-0.5,0]$, with angular speed $0.1$, respectively speed $0.013$ or $0.007$, coupling $10^{-6}$ and normalized wake speed $c_f=1$. The future interval is $[0,0.15]$; the prescribed circle is not imposed on that future.

## Geometric reference and causal scope

**Derived:** write the parameterized surface as $X=((L+r\cos\theta)\cos\varphi,(L+r\cos\theta)\sin\varphi,r\sin\theta)$. Its outward unit normal is $N=(\cos\theta\cos\varphi,\cos\theta\sin\varphi,\sin\theta)$. Differentiating $N\cdot\dot X=0$ gives the normal curvature acceleration $A_{\mathrm{curv}}=-(r\dot\theta^2+\rho\cos\theta\dot\varphi^2)N$. At the selected initial outer and inner circles, $\cos\theta=0.6$ and $-0.6$, respectively; their azimuthal curvature contributions therefore have opposite signs. This geometric identity does not predict the sign of the complete delayed interaction or guarantee a stable path.

The independently recomputed net interaction $A$ splits into $A_\perp=(N\cdot A)N$ and $A_\parallel=A-A_\perp$. The embedded equation is $\ddot X=A_\parallel+A_{\mathrm{curv}}$; artificial support is $A_{\mathrm{curv}}-A_\perp$. Only the receiver-superposed discarded normal acceleration is recorded. Production uses a polynomial implicit surface; the separately authored parameterized reference checks its geometric acceleration rule without modifying that production implementation.

Retained nominal cubics can be slightly off the exact torus. At those reference points the independent instrument differentiates the quartic defining function by product rules and uses its gradient/Hessian for comparison to the production extension. On exact surface controls it checks that result against the parameterized normal and second fundamental form above. Whole-segment distance is independently screened with the geometric expression $|\sqrt{(\rho-L)^2+z^2}-r|$, exact rational polynomial ranges, axis exclusion and emitted component-error inflation. Point agreement alone does not establish the whole segment's geometric bound.

**Derived, conditional:** points on the shape have ambient norm at most $L+r=0.15$, giving partner delay at most $0.3$ at $c_f=1$. Coherent strictly subwake paths make the ordinary partner causal residual monotone in emission time and exclude positive-delay self hits. Production ledgers and dense retained-tube screens must verify the finite premises. Exclusion of emissions before supplied memory additionally assumes the unprovided older paths remain within this ambient radius; otherwise all conclusions are limited to declared memory. The reviewed production integral-map inclusion remains the coherent-solution existence premise, rather than an independent full-slab existence theorem supplied by point comparisons.

## Predeclared acceptance

For each shoulder, run base step $0.01$ with root tolerance $10^{-5}$ and state/geometry tolerances $10^{-4}$, half-step $0.005$ with the same tolerances, and tight step $0.005$ with root tolerance $10^{-7}$ and other tolerances $10^{-5}$. Preparation mesh is $0.02$ except tight $0.01$. Each invocation has a two-GiB admission allowance and a 120-second cooperative worker deadline, distinct from measured memory or performance. An invalid height $0.041$ must be refused before future publication.

Qualification requires full declared completion, durable checkpoint, complete point and whole-slab self/partner accounting, generated-source feedback, certified regular surface tubes and strictly subwake chart bounds. Independent comparisons at 70 and 100 digits must place delayed roots, per-hit kernel and receiver-total acceleration/support inside production enclosures, screen full nominal polynomials plus emitted tubes for geometry/tangency, bound midpoint equation residual by $2\times10^{-5}$, and bound precision disagreement by $10^{-45}$. Within each preparation, common-time base/half-step/tight differences must fit summed emitted component radii. Generated vertical motion must be resolved for both shoulders. Inner versus outer is a changed-preparation geometric study, not a refinement or isolated universal shape law.

| Explicit-use verification decision | Scope and consequence |
| --- | --- |
| Objective and consumer | Detect wrong curvature/support, missing delayed feedback or numerical inconsistency before Surface can offer torus calculations. |
| Effort and independent answer | Fresh EOM build, existing known geometry/circular fixture, invalid preparation, six finite interacting calculations and separately authored torus/root/kernel reference. Frozen helpers and exact geometric controls supply independent expectations; production inclusion remains the solution-existence premise. |
| Timing and cost | Selected once by the operator's October 14 instruction; build deadline 240 seconds, production campaign deadline 900 seconds, each worker 120 seconds, independent comparison deadline at most 1200 seconds. Actual elapsed time is recorded separately; memory admission allowances are not measured use. |
| Owner, failure and continued need | Surface owns this scientific subcase; EOM owns evolution; the separate reviewer adjudicates. A failed declared condition limits qualification and blocks its corresponding app-availability claim. No enrollment in regular tests or CI is selected; rerun only for an explicitly selected case or changed numerical capability. |

Falsifiers are a missed declared-memory root, independent value outside its emitted enclosure, insufficient dense geometry/tangency/normal regularity, absent generated feedback, excess residual, unresolved vertical evolution or refinement discrepancy beyond summed radii. Complete requests/responses, checkpoints, frozen source/build identities and independently authored reports will be retained under `.local-data/eom/surface-torus-2026-10-14/`. No settling, stability, energy–size relation or physical confinement follows from this finite supported calculation.

## Full-segment reference screens

**Derived:** let $\Phi=(X\cdot X+L^2-r^2)^2-4L^2\rho^2$, $\psi=(\rho-L)^2+z^2-r^2$ and $B=(\rho+L)^2+z^2-r^2$. Then $\Phi=\psi B$. Exact rational Bernstein ranges of the retained cubic's polynomial combinations bound $\Phi$, $\rho^2$, $z^2$, position/speed norms and $\nabla\Phi\cdot\dot X$ over each complete nominal segment. Where $B\ge B_{\min}>0$, these give $|\psi|\le\max|\Phi|/B_{\min}$. With $s=\sqrt{(\rho-L)^2+z^2}$ and $s\ge s_{\min}>0$, the nominal surface-distance screen is $|s-r|=|\psi|/(s+r)\le\max|\psi|/(s_{\min}+r)$. Distance to a fixed closed surface is 1-Lipschitz, so adding the Euclidean position-error radius $e_X$ covers the emitted position tube.

The product-rule gradient $\nabla\Phi=B\nabla\psi+\psi\nabla B$ has lower norm at least $2B_{\min}s_{\min}-\max|\psi|\max\|\nabla B\|$. For every point in the full position tube of ambient radius $R$, the quartic Hessian has operator norm at most $12R^2+12L^2+4r^2$, denoted $H_{\max}$. Subtracting $H_{\max}e_X$ from the nominal gradient lower bound screens regularity of the entire tube. Differentiating the unit normal shows its variation across the tube is at most $H_{\max}e_X/g_{\mathrm{tube,min}}$. Consequently the tangency screen is the nominal $|\nabla\Phi\cdot\dot X|/g_{\min}$ plus velocity-error radius $e_V$ and $\max\|\dot X\|H_{\max}e_X/g_{\mathrm{tube,min}}$. Each denominator must stay positive; axis separation is also checked. These are conservative geometric screens, not a substitute for coherent-solution inclusion.

The finite reference additionally checks ambient radius below $0.1501$ and speed below $0.02$. With the same older-tail radius assumption, a memory-edge emission has causal residual at most $2(0.1501)-0.5=-0.1998$; increasing reception time only strengthens this exclusion. A positive simultaneous partner separation and strictly subwake motion give the other sign and uniqueness. A missing bound, zero gradient or failed separation makes that causal conclusion unavailable. The independently computed reference values and production certificates must establish the premises for the stated finite window.

## Current execution

✓ Qualified — all six declared calculations, four matched refinements, resolved endpoint readouts and separate adjudication are complete. Root owns the explicit-use driver, retained build/runs and synthesis. The continuing independently authored Codex review owns a new torus reference and review; original oblate, Stage D and kernel references remain frozen. Known-case reference controls precede target reads, and the [separate review](torus-qualification-review-2026-10-14.md) accepts this finite scientific subcase. The selected execution is complete; torus app delivery remains a separate later step.

## Production execution receipts

**Measured by the fresh EOM CLI and `surface-torus-run.mjs`:** all six valid cases complete the declared [0,0.15] interval with durable checkpoints, complete point-root accounting and generated-source feedback; the invalid height is refused by both inspection and evolution without publication. The known-case-first run-receipt extractor verifies raw bytes/hashes and retains `production-summary.json`. The existing geometry/circular fixture passes before these targets. The separate reference and adjudication below qualify these retained production observations within the declared finite scope.

| Case | Accepted steps | Rejected steps | Evolution wall seconds | Raw response bytes |
| --- | ---: | ---: | ---: | ---: |
| base | 15 | 0 | 12.242 | 32,144,630 |
| step | 30 | 0 | 26.492 | 64,332,708 |
| tight | 30 | 0 | 31.556 | 64,407,341 |
| inner | 15 | 0 | 13.578 | 32,153,421 |
| innerStep | 30 | 0 | 28.619 | 64,349,824 |
| innerTight | 30 | 0 | 34.619 | 64,425,104 |

Evolution wall times come from each driver receipt, including response parsing/retention; they are not solver-only performance measurements or memory-use observations. The managed build lease `0f1ee448-2057-4c48-be79-6b81bec29697` completes exit 0 with group closed in 32.933 seconds. The serial production campaign lease `39f7fbb4-72c5-4b5b-91a0-aa4016e51d2e` completes exit 0 with group closed in 154.473 seconds. Known SHA and source-row controls precede preservation of all 95 compiled source preimages, exact source/configuration inputs and executable. The compiled source digest is `40816eb93c7d42e30e3a028d1f3cd80292980704a50717e9208baf3355ec4771`; executable SHA-256 is `f417c26738cf0e6b5528ffe0e4ab5e9bdfa7c3c68d7900d6e8bc83b4296adf6a`. Every numerical conclusion binds that retained build rather than a later live tree.

## Independent numerical outcome

**Measured by the frozen separately authored `surface-torus-reference.py` six-case report:** all declared reference comparisons pass at 70 and 100 decimal digits, including delayed roots/factors and independently recomputed kernel sums, receiver-superposed tangent/normal/curvature/support, solution acceleration enclosures and midpoint equation residual. Full nominal-polynomial plus emitted-tube geometry/tangency/speed screens pass. The report uses 180 midpoint samples and 900 partner-root evaluations per base case per precision, and 360/1800 for each half-step or tight case. Generated-source root counts per precision are 48, 96 and 96 for the outer cases, and 276, 546 and 546 for the inner cases. These sample counts do not replace the complete production slab ledgers or the conditional whole-time causal argument. Direct per-hit acceleration-box inclusion is not claimed where those boxes are not emitted.

| Case | Full nominal-plus-tube distance screen | Tangency screen | Midpoint equation residual |
| --- | ---: | ---: | ---: |
| base | 2.88727e-9 | 4.19495e-8 | 1.76886e-10 |
| step | 3.40765e-9 | 5.55825e-8 | 4.50053e-11 |
| tight | 3.40760e-9 | 5.55818e-8 | 4.50053e-11 |
| inner | 1.16993e-9 | 1.64526e-8 | 4.75742e-11 |
| innerStep | 1.37826e-9 | 2.17959e-8 | 1.48348e-11 |
| innerTight | 1.37819e-9 | 2.17948e-8 | 1.48347e-11 |

These displayed decimals are rounded report summaries, not newly directed-rounded upper bounds. Full precision comparisons and conservative geometry values remain in `independent-report.json`. Every computed speed screen is below 0.02, every ambient-radius screen below 0.1501, and each positive-gradient/axis/separation condition passes. The reviewed production solution-inclusion premise remains explicit; this instrument independently checks retained geometry and point acceleration rather than proving coherent full-slab existence anew.

| Matched refinement | Maximum position difference | Maximum velocity difference |
| --- | ---: | ---: | ---: |
| base:step | 1.09263e-12 | 1.46110e-11 |
| step:tight | 2.80100e-17 | 1.31830e-17 |
| inner:innerStep | 1.76413e-13 | 2.40328e-12 |
| innerStep:innerTight | 7.02707e-18 | 1.73092e-17 |

All four comparisons fit the summed emitted component-error radii at their declared common times. The largest position/velocity budget ratios are approximately 0.01310 and 0.01737 (outer base versus half-step), well below one. This is measured finite implementation/refinement agreement against the separate reference, not an analytical six-member solution. Inner/outer comparisons are not labeled refinements.

The separately authored exact-rational endpoint readout resolves all 36 member endpoints: outer vertical displacement is approximately −6.805723e−6 and inner displacement +3.038547e−6 at time 0.15 relative to exact initial height 0.04. Each magnitude exceeds its own emitted vertical error radius; the smallest magnitude/radius ratio among all cases is approximately 2942.53. The reference and endpoint readout therefore exercise generated meridional motion on both shoulders. Different initial radius and speed prevent treating this sign contrast as an isolated universal curvature or topology law.

The independent reference lease `a37f2dee-fa9c-490b-946b-5030e168ab4c` completes exit 0 with group closed in 940.614 supervised seconds; its instrument timer records 940.4661478329799 seconds. Known-final-line report extraction passes before target admission and verifies all six input/output hashes, frozen reference identity and four comparison edges. The original known-only failure involved an instrument rounding-equality assertion; its corrected strict-margin control passed before any target read, and both observations remain preserved. Frozen reference SHA-256 is `c609611f1581982f5baf6bf4f1018ebaa6409d0a9d1e3f6ae68e964113f8182c`; original oblate/Stage D/kernel helpers remain unchanged. Separate [scientific adjudication](torus-qualification-review-2026-10-14.md) determines the final bounded disposition.

## Preservation, integration and closeout

✓ **The separate review accepts the selected finite scientific subcase.** Its known-first production/report audit verifies all declared cases, immutable run/model/inspection/v8 checkpoint bindings, complete accepted coverage, exact report identity, precision criteria, dense screens, feedback, four matched edges and resolved endpoints. The retained report SHA-256 is `d6bd404abea214d32337b21278b0055faacb2612f5cec85b67e7e2e0afaaf013`. No selected scientific condition remains open within this preparation/window and the stated solution-existence/history premises. The manuscript, tracker, README and EOM dependency now carry this bounded result. The completed scientific execution is removed from the active queue; the parent comparison remains partial only for separately deferred torus consumer delivery.

**Measured by `.tmp/surface-torus-qualification/closeout.mjs`:** known SHA and one-file inventory controls pass before targets. All 95 authored source preimages in the compiled identity, exact executable, new/frozen references and production driver match their retained identities; the scoped live-source comparison reports no changed preimages at closeout. Complete inspection/request/raw/checkpoint payloads, reference and endpoint reports, known-control failure/success receipts, independent adjudication sources/receipts, definition preimages and source/configuration bindings are preserved in the dated local owner. `retention-inventory.json` records 186 payloads totaling 331,260,583 bytes, excluding itself and `closeout.log`. Local retention is not an independent backup, and payload bytes are not peak-memory measurements. Missing payloads or mismatched hashes would overturn the corresponding preservation claim.

Sanitized leases and canonical log copies under `operations/` show all three selected jobs completed exit 0 with closed process groups. `owned-closeout.json` records a clear owner disposition across 2,325 inspected leases. These process observations establish operational closure, not scientific acceptance. No numerical or reference job remains assigned to this task.

**Measured by focused validation:** the known-case-first Markdown instrument checks nine owning documents, resolves 285 relative links without historical issues, verifies paired display delimiters and emits no whitespace diagnostics. `node --check scripts/eom/fixtures/surface-torus-run.mjs`, scoped `git diff --check` and new-source no-index whitespace checks also pass. `node scripts/validate-priority-ranking.mjs` passes current queue/ranking consistency. No generator write, regular test enrollment, application or production EOM source change, or Git publication was performed. Scientific qualification of these retained calculations does not activate a torus selector or viewer in the current app.
