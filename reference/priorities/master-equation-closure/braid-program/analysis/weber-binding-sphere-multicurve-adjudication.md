# Weber binding sphere: adjudication of the multi-curve collocation, round 1 (great-circle closure lane, 2026-10-06)

Status: adjudication of the [multi-curve collocation document](weber-binding-sphere-multicurve-collocation.md) as frozen at 2026-10-06T23:22Z, written by the great-circle closure lane after the Principal Investigator announced exposure at 23:24Z. Every number below was produced by this lane's own curve evaluator with the frozen reference library as the independent full-solve evaluator; the collocation lane's library was read only to learn the layout of its stored coefficients and was not imported. Nothing below a marker "Round 2" in the subject document was read; no such marker existed when the document was read.

## 1. What was read and what was used

Read: the subject document (whole, no Round 2 marker present); the known-case receipt `weber-binding-sphere-mc-known-cases.json`; the index and curve-evaluation lines of `weber-binding-sphere-mc-lib.mjs` (coefficient layout only); the dumps `search-*.jsonl` under `.local-data/master-equation-closure/weber-binding-sphere/mc/` (repository root); and the two stored coefficient files of the known case KC3, which the collocation lane's script wrote to `.tmp/weber-binding-sphere/mc/kc3-phi2-coefficients.json` and `kc3-phi1.5-coefficients.json` (file times 22:22Z, before the freeze). Not opened: the search driver, the summarizer, the rigid-check script, the refinement script, the heartbeat logs.

Instrument: [weber-binding-sphere-reference-multicurve-adjudication.mjs](../evidence/weber-binding-sphere-reference-multicurve-adjudication.mjs), receipt [weber-binding-sphere-reference-multicurve-adjudication.json](../evidence/weber-binding-sphere-reference-multicurve-adjudication.json). It evaluates a stored coefficient set $\mathbf X_i(\tau)=\mathbf a_{i,0}+\sum_m[\mathbf a_{i,m}\cos m\tau+\mathbf b_{i,m}\sin m\tau]$ and its phase derivatives $\mathbf X_i'$, $\mathbf X_i''$ analytically with its own code, forms $\mathbf V_i=\omega\mathbf X_i'$, obtains the law's accelerations from the frozen `solveAccelerations` (the full $3N\times3N$ solve, any member count $N$), and reports the absolute residual $\max_{i,\tau}\lVert\omega^2\mathbf X_i''-\mathbf A_i^{\mathrm{law}}\rVert$ together with its two normalizations, $E=\text{residual}/(\omega^2R)$ (the subject's specified one) and $E^{(v)}=\text{residual}\cdot R/v^2$ (by the centripetal scale of the speed $v$), the sphere residual $S$, the speed residual $V$, the range of the determinant of the acceleration matrix, pair-distance variation, and each member's path extent. $K=c_f=1$, $R=1$, polarities in the subject's member order $(+,-,+,-,+,-)$.

**Known cases of this instrument, recorded first** (command in Section 9; the script stops if one fails). The alternating hexagon at $\Omega^2=5/4-1/\sqrt3$: $E=2.3\times10^{-15}$, $S=8.9\times10^{-16}$, $V=8.3\times10^{-16}$, determinant $-137.09615$ at every phase. The pair circle (two unlike members diametrically opposite on a circle of radius $0.7$ at $\omega^2=1/(4a^3)$, the frozen library used with $N=2$): $E=6.5\times10^{-16}$, and $3.8\times10^{-2}$ at $1.05\,\omega$; determinant $2.4285714$. Relation between residuals on a non-solution (a perturbed hexagon at one phase): the closed residual, with the curve's accelerations inserted in the law, equals the acceleration matrix times the full-solve residual to $1.6\times10^{-15}$ relative (closed $0.375$, frozen matrix-free value $0.468$ as a Euclidean maximum, solved $0.279$ as a component maximum); this file reports the full-solve residual, as the subject does. All pass.

## 2. Verdicts

| Item | Subject's claim | Verdict | This lane's numbers |
| --- | --- | --- | --- |
| 1a | KC1: the hexagon is a zero of stage 2, $2.7\times10^{-15}$, determinant $-137.096$ | independently confirmed | $E=2.3\times10^{-15}$, $S=8.9\times10^{-16}$, $V=8.3\times10^{-16}$ on 256 phases; determinant $-137.09615$ |
| 1b | KC5: at $1.01\,\omega$ the motion residual is $1.55\times10^{-2}$ and, with $v$ kept, the speed residual $2.0\times10^{-2}$ | independently confirmed | $E=0.015540016$; $V=0.0201$ with $v$ kept |
| 2a | KC3 quadrature periods $5.311758491618$ ($\Phi=2\pi$) and $30.00228429978$ ($\Phi=3\pi/2$, two radial periods), $e=0.3$ | independently confirmed | own bisection and trapezoid quadrature of (7.4), (7.5) of the pair investigation: $A=0.72634076$ and $1.7471586$, periods equal to the subject's to the last printed digit, change on doubling the grid $1.2\times10^{-14}$ and $7.3\times10^{-14}$ |
| 2b | KC3 stored curves satisfy the law (fine-grid residual $1.5\times10^{-14}$ and $9.3\times10^{-14}$ in the subject's normalization) and have those periods | independently confirmed | 1024 phases, frozen $6\times6$ solve: absolute residual $1.0\times10^{-14}$ and $4.1\times10^{-15}$ ($2.1\times10^{-15}$ and $5.2\times10^{-15}$ of the largest law acceleration); period from the stored $\omega$ minus own quadrature $+1.5\times10^{-14}$ and $-3.2\times10^{-13}$; pericentres $0.50843853$ and $1.223011$ equal to $A(1-e)$; relative angular momentum constant and equal to $h=1.1497566$ and $1.7832074$; determinant ranges $3.118$–$4.934$ and $1.881$–$2.635$ |
| 3a | P1 is a rigid periodic orbit at $\omega=0.8134557857$ | independently confirmed | residual $E=5.0\times10^{-15}$; pair-distance variation $3.6\times10^{-15}$; velocities are $\mathbf W\times\mathbf X_i$ to $3.6\times10^{-16}$ with $\lVert\mathbf W\rVert-\omega=-7\times10^{-16}$; inverse-square balance to $9.5\times10^{-15}$ relative; determinant $99.943104$ |
| 3b | P2 is a rigid periodic orbit at $\omega=0.8988651532$ | independently confirmed | $E=6.6\times10^{-14}$; pair-distance variation $1.6\times10^{-12}$; rigid fit $3.2\times10^{-13}$, $\lVert\mathbf W\rVert-\omega=5\times10^{-15}$; balance $2.8\times10^{-13}$; determinant $-33.980974$ |
| 3c | P1 and P2 are not on a sphere and not at equal speed | independently confirmed | P1: axial distances $0.52197713$ (four members) and $1.4375591$ (two), speeds $0.42460532$ and $1.1693907$, distances from the centre $0.6831632$ and $1.4375591$. P2: axial distances $1.3687348$ (two) and $0.47685821$ (four), speeds $1.230308$ and $0.42863123$, distances from the centre $1.3687348$ and $0.7505215$ |
| 4a | micro-loop limit: the stage-2 residual has infimum zero on non-solutions | independently confirmed, with one correction to the displayed bound (Section 5) | stored state (unconstrained, start 26): $E=8.4281742\times10^{-6}$, $S=5.8\times10^{-6}$, $V=1.3\times10^{-7}$, loop extent $1.1\times10^{-5}$, while the curve's acceleration is $162$ times the law's and $E^{(v)}=5.4\times10^{5}$ |
| 4b | fast rigid limit $\mathbf E\to-M^{-1}\mathbf X_\perp/R$; hand estimate $8.2\times10^{-3}$ | independently confirmed | stored state (C3, start 32, $\omega=13718.3$): measured $8.2594588\times10^{-3}$; $\lVert M^{-1}\mathbf X_\perp\rVert/R=8.2594424\times10^{-3}$; exact form $\lVert M^{-1}\mathbf g\rVert/(\omega^2R)=8.2594588\times10^{-3}$, vector difference $3.9\times10^{-14}$ |
| 5 | floors and the character of the lowest states | independently confirmed (every stored fine-grid motion residual reproduced; Section 6) | ten lowest unconstrained results: seven micro-loops, two fast rigid states, one fast non-rigid state; no determinant sign change among them |
| 6 | no equal-speed sphere candidate other than the hexagon in 370 target starts and 740 stage-2 solves at $M=3$; weak bounded negative | independently confirmed as a count; coverage restated in Section 7 | all 740 stage-2 results of the 370 target starts re-evaluated: 16 meet the candidate tolerances and all 16 are the hexagon; none other |

## 3. Item 2 in detail: the rosettes

The period check uses this lane's own code for the two integrals of Section 7.5 of the [pair investigation](../../binary-research/analysis/weber-overnight-investigation.md): with $k=2$, $\kappa=2$, $r=A(1-e\cos\psi)$, $\varepsilon=-k/(2A)$ and $h^2=2\lvert\varepsilon\rvert A^2(1-e^2)$, $T_r=(2\lvert\varepsilon\rvert)^{-1/2}\int_0^{2\pi}\sqrt{r(r+\kappa)}\,d\psi$ and $\Phi=\tfrac h2(2\lvert\varepsilon\rvert)^{-1/2}\int_0^{2\pi}r^{-1}\sqrt{1+\kappa/r}\,d\psi$, by the periodic trapezoid rule on 8192 points and bisection on $A$ at $e=0.3$. Because the subject used the same rule and grid, agreement to the last digit shows the two codes implement the same formulas; the independent content of the check is that the formulas were coded separately and that the stored curves, which were obtained without the reduction, have these periods and satisfy the law under a different evaluator. The law check is the stronger one: the stored 40-harmonic and 72-harmonic two-member curves have absolute residuals of $10^{-14}$ under the frozen solve on 1024 phases while their separations vary by $0.436$ and $1.048$, so they are non-rigid periodic solutions to round-off.

Not adjudicated in item 2: the subject's third route (direct integration with the pair instrument, closure $3.8\times10^{-12}$ and $8.1\times10^{-12}$) was not rerun.

## 4. Item 3 in detail: P1 and P2, and their relation to the uniform-circle theorem

Both stored stage-1 results are rigid rotations to round-off and satisfy the rigid inverse-square balance $\sum_{j\ne i}\sigma_{ij}(\mathbf X_i-\mathbf X_j)/d_{ij}^3=-\Omega^2\mathbf X_{i,\perp}$ at their stated rates, evaluated here by a direct sum that uses no solve. By the first run's rigid reduction that balance is equivalent to the law on a rigid rotation, and the full-solve residual confirms it separately. In both, the members have two different distances from the rotation axis, hence two different speeds, and two different distances from the centre. They therefore lie outside the equal-speed sphere target, and outside the first run's rigid classes, which assume equal axial distance.

As the author of the uniform-circle statement (Theorem 18.3 of the [great-circle closure document](weber-binding-sphere-great-circle-closure.md), unreviewed at the time of writing): that statement concerns histories in which six members move uniformly on circles of one sphere at one common speed, and says such a history satisfying the law is a rigid rotation. P1 and P2 are rigid rotations, which is the kind of object the statement leaves, but their members are not on one sphere and do not share a speed, so they are not in the class the statement is about. It neither forbids them nor says anything about them. There is no tension in either direction.

What remains the subject's own open obligation, unchanged by this adjudication: a closed-form solution of the balance at the stated geometries, and the question whether P1 and P2 belong to one-parameter families in size.

## 5. Item 4 in detail: the two degenerate limits

**Micro-loops.** Let every member trace a closed loop of size $\epsilon$ about a fixed point at speed $v$, with harmonics up to $M$. Then $\omega\sim v/\epsilon$, and by Bernstein's inequality for trigonometric polynomials $\max\lVert\mathbf X''\rVert\le M\max\lVert\mathbf X'\rVert$, so the curve's acceleration is at most $M\omega v$, while the law's acceleration stays bounded for a non-singular, slowly moving configuration. Hence $\lVert\mathbf E\rVert\le(M\omega v+\lVert\mathbf A^{\mathrm{law}}\rVert)/(\omega^2R)=Mv/(\omega R)+O(\omega^{-2})\to0$ as $\omega\to\infty$ at fixed $v$, with $S=O(\epsilon)$ and $V$ free to vanish: the stage-2 residual has infimum zero along states that do not satisfy the law. Confirmed. One correction: the subject's display (5.1) has the constant $1$ in place of $M$, which holds only for a pure first harmonic. On the stored floor state $v/(\omega R)=3.96\times10^{-6}$ and the measured residual is $8.43\times10^{-6}$, above the subject's bound and below $3v/(\omega R)=1.19\times10^{-5}$; the measured curve acceleration, $278.6$, is $2.1$ times $\omega v=131.3$. The conclusion is unaffected.

**Fast rigid rotation.** For a rigid rotation, $\dot d_{ij}=0$ and the centripetal accelerations $\mathbf A^c$ give $\ddot d_{ij}=0$, so the law's linear system $M\mathbf A=\mathbf b$ evaluated at $\mathbf A^c$ leaves the defect $\mathbf g_i=\sum_{j\ne i}\sigma_{ij}\mathbf e_{ij}/d_{ij}^2+\omega^2\mathbf X_{i,\perp}$ (the velocity terms cancel, as in the first run's rigid reduction). Therefore $\mathbf A^{\mathrm{law}}=\mathbf A^c+M^{-1}\mathbf g$ and $\mathbf E=-M^{-1}\mathbf g/(\omega^2R)\to-M^{-1}\mathbf X_\perp/R$. Confirmed, and evaluated on the stored C3 floor state with the frozen assembly: the rotation fits the velocities to $1.5\times10^{-13}$, all six axial distances are $0.11546597$, and the three numbers in the verdict table agree to the digits shown. The subject's hand estimate $8.2\times10^{-3}$ is within $0.7\,\%$ of the computed limit $8.2594\times10^{-3}$. The same state reappears in the unconstrained stratum (start 4, score $8.2596\times10^{-3}$).

Neither limit is a solution of the law. The subject's guard, a second test in the speed normalization, removes both: on the micro-loop state $E^{(v)}=5.4\times10^{5}$, and on the fast rigid state $E^{(v)}=0.62$.

## 6. Item 5 in detail: the floors

**Reproduction of the stored residuals.** For all 856 stored stage-2 results with $M=3$ (740 from target starts, 116 from reach starts), this lane's $E$ was compared with the subject's stored fine-grid value. On the 724 results that are not the hexagon the two agree to $5.4\times10^{-10}$ relative at worst (median $1.8\times10^{-14}$), and the sphere residuals to $3.4\times10^{-9}$; on the 132 hexagon results both are at round-off, $10^{-15}$ to $10^{-12}$. The per-run counts quoted in the subject's Section 6.1 are reproduced: non-hexagon stage-2 finals with $\omega>100$ are 63 of 72 (unconstrained), 62 of 73 (C2), 48 of 55 (C3) and 60 of 60 (D3); in the first speed-normalized unconstrained run the determinant changes sign along 56 of 62.

**The ten lowest-scoring non-hexagon stage-2 results of the unconstrained stratum**, pooled over its three residual modes and ordered by the subject's score; $E^{(v)}$ is this lane's fine-grid residual divided by $v^2/R$ with $v$ the stored stage-2 speed unknown.

| Run, start, route | Subject's score | $E^{(v)}$ | $S$ | $V$ | Kind | Determinant sign change |
| --- | --- | --- | --- | --- | --- | --- |
| specified, 26, stage 1 then 2 | $8.43\times10^{-6}$ | $5.4\times10^{5}$ | $5.8\times10^{-6}$ | $1.3\times10^{-7}$ | micro-loop | no |
| specified, 18, direct | $2.68\times10^{-5}$ | $3.9\times10^{4}$ | $5.7\times10^{-6}$ | $2.1\times10^{-6}$ | micro-loop | no |
| specified, 30, stage 1 then 2 | $6.83\times10^{-5}$ | $6.1\times10^{4}$ | $9.1\times10^{-6}$ | $8.7\times10^{-6}$ | micro-loop | no |
| specified, 20, direct | $1.00\times10^{-4}$ | $1.3\times10^{4}$ | $1.3\times10^{-5}$ | $3.9\times10^{-6}$ | micro-loop | no |
| specified, 14, direct | $1.42\times10^{-4}$ | $3.7\times10^{4}$ | $1.4\times10^{-4}$ | $9.6\times10^{-6}$ | micro-loop | no |
| specified with speed box, 14, direct | $1.62\times10^{-4}$ | $2.5\times10^{5}$ | $1.4\times10^{-4}$ | $2.0\times10^{-6}$ | micro-loop | no |
| specified, 14, stage 1 then 2 | $3.13\times10^{-4}$ | $1.4\times10^{4}$ | $2.1\times10^{-4}$ | $7.8\times10^{-5}$ | micro-loop | no |
| specified, 4, stage 1 then 2 | $8.26\times10^{-3}$ | $0.62$ | $1.3\times10^{-7}$ | $6.4\times10^{-11}$ | fast rigid | no |
| specified, 12, stage 1 then 2 | $1.22\times10^{-2}$ | $0.91$ | $8.5\times10^{-5}$ | $4.2\times10^{-5}$ | fast rigid | no |
| specified, 13, direct | $1.28\times10^{-1}$ | $12.9$ | $1.3\times10^{-2}$ | $8.2\times10^{-3}$ | fast, not rigid | no |

Kinds are assigned by this lane's own measures: micro-loop when no member's path extends over more than $0.02R$; fast when a member speed exceeds $10$; rigid when the pair-distance variation is below $10^{-3}R$. In the normalization by $v^2/R$ none of the ten is anywhere near a zero: the smallest $E^{(v)}$ among them is $0.62$.

Because all ten come from the specified-residual modes, the same was done for the speed-normalized mode alone, where neither degenerate limit occurs. Its ten lowest are: four copies of one rigid state on the speed box (starts 71, 179 and 22 by two routes; $E^{(v)}=0.305$ to $0.307$, $S=0.028$, $V=0.085$, pair-distance variation below $10^{-8}$, actual member speeds $3.00$ against a speed unknown of $3.14$, no sign change); three copies of a non-rigid state on the speed box (starts 127, 11, 75; $E^{(v)}=0.370$, $S=0.033$, $V=0.106$, no sign change); and three further states with $E^{(v)}$ between $0.52$ and $0.80$, one of them with a determinant sign change. All ten are box-limited or plain non-convergence; none is a micro-loop or a fast state. The subject's score for the rigid state, $0.335$, differs from $0.307$ only because it normalizes by the actual speed and this file by the speed unknown.

## 7. Item 6 in detail: what the receipts support, stratum by stratum

**Counts.** The dumps hold 443 lines: 15 are not start records, 58 are reach starts (49 in production runs and 9 in three development smoke runs) and 370 are target starts, with 740 stage-2 results from the targets. These are the subject's figures. All 116 stored stage-2 results of the reach starts are the hexagon under this lane's evaluation (worst residual $5.3\times10^{-12}$); the reach solves themselves were not rerun.

**The claim.** "No equal-speed sphere candidate other than the hexagon in 370 target starts at $M=3$" is supported: under an independent evaluator, exactly 16 of the 740 stage-2 results meet $E$, $E^{(v)}$, $S$, $V\le10^{-8}$, and all 16 are the alternating hexagon. "Weak bounded negative" is the right grade, and the subject's own three reasons for the weakness are confirmed by the numbers. The coverage is more accurately described as follows.

| Stratum | Target starts by mode (specified; specified with speed box; speed-normalized with speed box) | What the results show | Accurate description of coverage |
| --- | --- | --- | --- |
| unconstrained | 37; 17; 86 | specified: 63 of 72 non-hexagon finals at $\omega>100$, floor a micro-loop; speed-normalized: all finals at ordinary rates, most on the speed box, most with a determinant sign change, floor $0.31$ in $E^{(v)}$ | searched; reach shown; no zero other than the hexagon reached from 140 starts. The specified-residual runs test the normalization, not the law. The speed-normalized runs are a basin statement for speeds up to $3$ |
| C2 | 37; 0; 22 | specified: 62 of 73 at $\omega>100$; speed-normalized floor is the same rigid box state | searched; reach shown; same reading; the speed-normalized count is below the specified minimum of 30 |
| C3 | 30; 0; 27 | specified: 48 of 55 at $\omega>100$, floor the fast rigid state; hexagon returned by 5 and 2 target solves | searched; reach shown; same reading |
| D3 | 30; 0; 30 | specified: 60 of 60 at $\omega>100$; speed-normalized floor $0.81$ in $E^{(v)}$ | searched; reach shown; under the specified residual no final stayed at ordinary rates, so only the speed-normalized run bears on the law |
| winding $(1,1,1,1,1,1)$ | 0; 14; 0 | floor on both penalty boundaries | partial: one mode, 14 starts |
| winding $(1,1,1,1,2,2)$ | 0; 0; 11 | floor is the same rigid box state as the unconstrained one | not covered: no known member, so no reach case |
| winding $(1,1,2,2,3,3)$ | 0; 0; 10 | scores of order $10^2$, all with determinant sign change | not covered: no reach case |
| winding $(2,2,2,2,2,2)$ | 0; 0; 4 | scores of order $10^2$ | not covered in effect: four target starts |
| development runs | 15 starts, specified residual | one hexagon | not part of any coverage claim |

**A limitation the subject states only in part (this lane's observation, graded inferred).** With three harmonics per member, the two sphere conditions are very restrictive by themselves. For one member, $\lVert\mathbf X\rVert^2\equiv R^2$ and $\lVert\mathbf X'\rVert^2\equiv v^2/\omega^2$ are identities between trigonometric polynomials of degree $2M$, which is $8M+2$ real conditions on $6M+3$ coefficients and the shared speed: 26 conditions on 21 coefficients at $M=3$. Circles traversed one, two or three times satisfy them; whether any other curve of degree three does was not determined here, but the count makes it unlikely outside special families. If none does, the exact zero set of stage 2 at $M=3$ is contained in the uniform-circle class, and a candidate at tolerance $10^{-8}$ in $S$ and $V$ must lie within that tolerance of it. The search at $M=3$ would then bear on essentially the same class that the great-circle closure document treats analytically, and would say little about equal-speed spherical histories on non-circular paths, which need many harmonics (the subject's own KC3 needed thirty to seventy for a two-member rosette). Stating the bounded negative as "no candidate among histories with at most three harmonics per member, which is close to the class of uniformly traversed circles" would be more accurate than "the unconstrained stratum at $R=1$ has been searched". Falsifier of the observation: an equal-speed spherical closed curve that is a trigonometric polynomial of degree at most three and is not a circle.

## 8. Not adjudicated

- The solver itself, its Jacobian check, the gauge handling and the kernel analysis of the subject's Section 4.
- KC2 (reach) and KC4 (the identity $\ddot G=T_{\mathrm{kin}}+H$): not rerun; for reach, only the stored results were re-evaluated.
- The direct-integration route of KC3.
- Stage-1 results other than P1 and P2, the twelve $M=5$ refinements, and the heartbeat logs.
- The machine-load account of the subject's Section 6.
- Whether P1 and P2 have closed forms or belong to families.
- Anything added to the subject document after 23:22Z.

## 9. Validation record, claims and falsifiers

Command, from the repository root: `node reference/priorities/master-equation-closure/braid-program/evidence/weber-binding-sphere-reference-multicurve-adjudication.mjs`. Runs (UTC, 2026-10-06): 23:25:31, first complete run, known cases first; 23:26:33, stopped on a syntax error in an added statistics block; 23:26:41, 23:26:54, 23:27:10 and 23:28:15, complete reruns after adding the agreement statistics, the per-run counts and the re-evaluation of the reach results; the last produced the receipt. No number changed between runs.

Every verdict in Section 2 is a measured claim by the instrument named, on the stored files named, with the frozen reference library as the solve; "independently confirmed" means that this lane's evaluation, sharing no code with the subject's, reproduces the subject's number or statement. The agreement is between two evaluators applied to the same stored coefficient sets; it is evidence about the stored results, not about how they were found. Falsifier of any row: a third evaluation of the same stored coefficients that disagrees with the number in the row beyond rounding.

## 10. Run record (append-only)

- 2026-10-06T23:22Z to 23:24Z: exposure announced by the Principal Investigator; subject document read (no Round 2 marker present), receipt and dump formats inspected.
- 2026-10-06T23:25:31Z to 23:28:15Z: adjudication script written and run as listed in Section 9.
- 2026-10-06T23:30:25Z: adjudication frozen. Evidence files, `shasum -a 256` in `braid-program/evidence/`:

```
a9e4012334655231e4377858ab1ea8b70046d420a0cff17350c68b8ebcc95863  weber-binding-sphere-reference-multicurve-adjudication.mjs
9b014c28b10e86c4ab288b148f1539b2cd4266e4463129dc03f855a2519a0239  weber-binding-sphere-reference-multicurve-adjudication.json
```

- 2026-10-06T23:30:25Z: document hash before this freeze entry was appended: 7cba3fa997eef1312c9628d59422877c5c8aaa1e9971fc2efaac600612c9c743. No process of this lane is running.
