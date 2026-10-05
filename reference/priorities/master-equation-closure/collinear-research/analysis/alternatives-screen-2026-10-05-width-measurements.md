# Finite-width collinear comparison measurements

These measurements use the four fixed laws and complete compatible preparations in the [preregistration](alternatives-screen-2026-10-05-width-fate-preregistration.md). The v2 comparison source is frozen. The coordinator reviewed its corrected complete-support construction and admitted target use before launch. Finite targets do not prove exact all-future fate.

## Initial comparison receipt

At step $2^{-13}$ and quadrature tolerance $10^{-8}$, all four runs reached $T=2$ without a detected postcontact velocity turn. Their reported first-contact brackets were respectively $[0.1195068359375,0.11962890625]$, $[0.0693359375,0.0694580078125]$, $[0.119384765625,0.1195068359375]$, and $[0.066650390625,0.0667724609375]$ for $(h,\rho)=(1/16,1/32),(1/16,1/64),(1/32,1/32),(1/32,1/64)$. These are measured step brackets, not rigorous event enclosures. Their final outward speeds were approximately $25.43,45.55,24.12,49.45$. Complete source histories and per-channel accelerations are retained in the local evidence directories `width-h16-r32-dt8192`, `width-h16-r64-dt8192`, `width-h32-r32-dt8192`, `width-h32-r64-dt8192` under `.local-data/master-equation-closure/collinear-research/alternatives-screen-2026-10-05/`.

The target receipts measured wall times $8.80,14.76,8.65,11.94$ seconds and RSS between 110 and 112 MB. The owned-compute supervisor separately reported each process group closed. No producer from this initial four-run tranche remains active by those completion receipts. Step $2^{-14}$ refinements subsequently completed; step $2^{-15}$ with tighter $10^{-9}$ quadrature tolerance was launched with separate output directories and watched deadlines.

## Independent original-integral audit: controls before targets

The [direct integral audit](../evidence/alternatives-screen-2026-10-05-width-direct-audit.mjs) is separately authored and uses a different numerical route: composite four-node Gauss quadrature over every source-history segment, without source-clock sectors, inverse roots, support unions or support pruning. It reconstructs the same declared interpolated position history using the Hermite basis functions, and integrates the complete stationary tail by triangular areas. Thus it can check the original integral functional on a supplied history independently of the comparison instrument's band assembly and adaptive Simpson quadrature. It does not independently evolve the coupled equation or certify interpolation error.

Before any target audit, this source passed constant and degree-seven polynomial integration, an independently evaluated cubic Hermite identity, stationary complete/partial reception, and positive/negative affine-self controls at subfield, unit and superfield speeds for all four laws. The source SHA-256 is `bc9b4bc14eceabd9e4f175de3f328b55c667522a79dd6d34e3bef07eb24f6b15`. Its controls receipt, written at 2026-10-05 13:35:54 UTC, is `.local-data/master-equation-closure/collinear-research/alternatives-screen-2026-10-05/width-direct-audit-controls/receipt.json`. It reports all controls passed, measured wall time $0.04460$ seconds, and RSS 60,686,336 bytes. The stationary direct-quadrature tolerance is $2\times10^{-4}$ because unsplit triangular corners converge algebraically; the affine-self tolerance is $2\times10^{-8}$. The analytical closed forms are the references, not saved target output.

The frozen target audit samples release, both endpoint rows of each measured unit/contact bracket, and $T=1/2,1,2$. It refines each retained source segment into $1,2,4,8$ quadrature panels, visiting the entire finite source interval plus its analytic infinite tail. Disagreement or slow refinement must be reported rather than removed by tuning the comparison instrument. Quadrature refinement here measures convergence of a functional on a fixed interpolated history, not convergence of the exact dynamics.

## Completed refinements and retained failure

All four cases completed at steps $2^{-13},2^{-14},2^{-15}$ through $T=2$, with no detected postcontact turn. The finest successful contact brackets and endpoint values are:

| Fixed law $(h,\rho)$ | Finest measured contact bracket | $-x(2)$ | $-v(2)$ | Finest quadrature tolerance |
| --- | --- | --- | --- | --- |
| $(1/16,1/32)$ | $[0.11956787109375,0.119598388671875]$ | $34.9606116373$ | $25.4337611614$ | $10^{-9}$ |
| $(1/16,1/64)$ | $[0.06939697265625,0.069427490234375]$ | $62.1648671365$ | $45.5514298883$ | $10^{-9}$ |
| $(1/32,1/32)$ | $[0.119415283203125,0.11944580078125]$ | $33.5643218958$ | $24.1169174550$ | $10^{-9}$ |
| $(1/32,1/64)$ | $[0.066680908203125,0.06671142578125]$ | $67.4994873653$ | $49.4486289021$ | $10^{-8}$ |

These are measured values from the frozen comparison source, not mathematical enclosures or certified digits. The original $10^{-9}$ run of the fourth case stopped with adaptive-depth exhaustion on the source interval $[1.2011450231038907,1.2011450231075287]$, with a reported Simpson difference about $5.25\times10^{-20}$. Its failure receipt remains in `width-h32-r64-dt32768/receipt.json`; the successful original-tolerance refinement is separately retained in `width-h32-r64-dt32768-tol8/`. This is an instrument limitation, not a dynamical endpoint. No failed output was substituted for a complete history.

The finest successful runs measured wall times $96.99,120.07,75.58,54.13$ seconds and RSS between 182 and 194 MB. The failed run measured $58.71$ seconds. All thirteen evolution invocations in these tranches have supervisor completion records with closed process groups (twelve successful, one failed). The source was not modified between targets.

## Original-integral audit results

The independent direct audit sampled eight times per case: release, each side of the unit/contact brackets, and $T=1/2,1,2$. With eight Gauss panels per retained source interval, the largest sampled discrepancy in either channel against the comparison instrument was approximately $8.52\times10^{-8}$, $1.84\times10^{-7}$, $3.33\times10^{-7}$ and $9.70\times10^{-7}$ in the table's case order. The corner-bearing quadrature refinement is not monotone: for example the fourth case's final self integral changed about $8.25\times10^{-6}$ between four and eight panels, with final discrepancy about $1.45\times10^{-7}$. This comparison supports the complete integral evaluation on those fixed interpolated histories; it does not supply an interval error bound, formal convergence order or independently evolved trajectory.

The audit receipts are retained in `width-audit-h16-r32-dt32768`, `width-audit-h16-r64-dt32768`, `width-audit-h32-r32-dt32768`, and `width-audit-h32-r64-dt32768-tol8` under the same local evidence owner. Each names the frozen audit source hash, comparison source hash and complete supplied-history digest. The exact reference controls were passed before any of these target applications. Each target audit measured less than $0.28$ seconds wall time and about 114–115 MB RSS.

The principal unresolved issue is exact entry of the original approaching preparations into the [derived escape sector](alternatives-screen-2026-10-05-width-escape-criterion.md). The large measured final separation and outward speed make them useful candidate entries; neither their magnitudes nor cross-step agreement replace a rigorous continuous-history error bound. A [different compatible preparation](alternatives-screen-2026-10-05-width-compatible-escape.md) has an analytical entry proof and is separately labeled so that its theorem is not attributed to these numerical releases.
