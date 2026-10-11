# Evaluator coverage of the staggered first-event residual (serial task 3, 2026-10-10)

This report asks one question about the [first event on the staggered lattice branch](staggered-lattice-first-event.md): did anything other than the original instrument compute the residual bounds that the event proof consumes? The scenario is the unchanged canonical Master Equation on the infinite alternating cubic lattice with its original stationary block prescription, the exact coherent axial ancient branch with amplitude $a=2^{-40}$, coupling $g=16$ and numerical $c_f=1$. No trajectory was evolved and no law, event rule or summation was changed.

Both parts of the task were carried out, and both were corrected after review; Section 10 records the review and governs where it differs from earlier sections. The first part is a provenance trace and a search for an existing second evaluator. No second evaluator of a full reception cell was found, but a separately authored high-precision evaluation of the same acceleration at nine reception times does exist in a neighbouring owner, which the first search had not examined. The second part is an independently authored enclosure of the defect on one reception cell in the possible first-event band: **with the corrected evaluator the independent bound on that cell is $0.0015550587367998904$, inside the frozen bound $0.023476976833088595$.** That result holds for one cell out of 658 and does not re-certify the event.

## 1. Result of the coverage search

**No independent evaluator of a full residual cell was found in the retained evidence.** A separately authored evaluation of the acceleration at single reception times was found in the neighbouring decomposition owner; Section 10.1 describes it. Every reference that the [independent assessment](staggered-lattice-first-event-independent-adjudication.md) relies on checks an ingredient or a consequence of the residual: the row formulas at chosen points, the polynomial reconstruction of the comparison curve, the census of sources, the assembly of cells, and the propagation of the bounds to the event. None of them evaluates the equation defect over a reception cell. The residual bounds in `residual-grid64-complete.json` and `residual-refined-complete.json` are computed only by the subject's own evaluator.

**Grade of the coverage finding: measured**, by listing every Python source under the retained owner and its scratch origin, reading each one's stated purpose, and, for the six references, reading what each imports and consumes and what its own target receipt declares as its scope. Section 3 gives the scope of that search and what it cannot rule out. This is a finding about coverage. It is not a finding that the residual is wrong.

## 2. How the residual is built, and what checks each part

The residual is a bound on the equation defect $\rho(t)=Q''(t)-\mathcal F[Q](t)$ of a comparison curve $Q$, cell by cell in reception time, where $\mathcal F$ is the full cross-source acceleration. The accepted receipt has 658 cells: 576 of width $1/64$ through time nine and 82 of width $1/256$ from nine to $1193/128$.

| Component | Subject instrument (SHA-256) | Separate check, and what it actually recomputes | Standing |
| --- | --- | --- | --- |
| Binary endpoint archive: 4,773 nodes at spacing $1/512$, position, velocity, acceleration; 3,073 source groups; saved growth exponent and amplitude | `evolution.py` (`3914dea8`); archive `83f0f474…851b` | None recomputes the numerical evolution. The archive is a comparison curve and needs no correctness of its own; its use is what must be bounded | Fixed input by definition |
| Quintic reconstruction of $Q$ between nodes | `archive_enclosure.py` (`f911295a`) | `archive_reference.py` (`6b795e1c`): exact rational and Bernstein reconstruction of every cell, joins, coefficient enclosures, positivity of velocity and acceleration. It imports the subject's classes in order to test their output | Independently checked, for the reconstruction only |
| Row arithmetic and its reception derivative | `interval_rows.py` (`14c68104`) | `row-reference.py` (`d6beec51`): exact rational values at 36 moving-source configurations and four exponential enclosures, each required to lie inside the subject's returned intervals. It loads the subject module to obtain those intervals | Independently checked at points, not over cells |
| Receiver sensitivity and tail constants | Formulas in the subject's derivation | Section 7 of the assessment derives the scalar sensitivity and the constants 624, 520 and 208 by hand from the vector row | Independently derived mathematics, not a recomputation |
| Stationary infinite sum | Coefficient receipts from the earlier next-event references: cubic `4abbda91`, higher coefficients `12b9c9d7`, tail source `c4494199`; the remainder is evaluated inside `continuous_residual.py` | The coefficient receipts are themselves separately authored exact-integer references. The subject's inline remainder evaluation has no separate check in this owner | Shared named references; remainder evaluation subject-only |
| Finite source census | Group table in the archive | `census-reference.py` (`308472f1`): literal enumeration of 24,388 labels in 3,073 groups and 346 shells, with exact cancellation identities | Independently checked |
| Defect evaluation over each cell: midpoint defect plus derivative transfer, summed over all groups | `continuous_residual.py` (`47cf01a6`), functions `evaluate` and `target` | No cell evaluator. At nine single reception times, the neighbouring owner's 65-digit reference checks the same primitives' point values of the full acceleration (Section 10.1) | **Cell enclosure subject-only**; point values independently checked at nine times |
| Tail of changing sources beyond the cube of radius fourteen | `continuous_residual.py`, function `tail` | The assessment derives the bounds by hand; no instrument re-evaluates them | Derivation reviewed; evaluation subject-only |
| Zero-time acceleration-jump allowance | `complete_residual.py` (`ce02e6ca`) | `census-reference.py` verifies every rational jump addition over the 597 coarse cells; `suffix-reference.py` (`9cfb7a75`) verifies the refined assembly, the unchanged 576-cell prefix and the junction allowance | Independently checked, for the additions and assembly |
| Refinement of the last segment | `refine_residual.py` (`cd63a453`), which calls the same evaluator | `suffix-reference.py`, whose own receipt says "evaluated finite-row math accepted separately" | Assembly checked; cell values subject-only |
| Propagation to the event | `comparison3.py` (`04de5be6`) | `majorant-reference.py` (`fcd76af2`): exact rational replay of all 658 updates, reading the residual as input; its receipt says "mathematical coefficients accepted separately" | Independent arithmetic on a shared input |
| Characteristic growth root | Saved exponent in the archive | `lambda-reference.py` (`2b186518`): integer interval enclosure of the root | Independently enclosed |

The pattern is the same as in the two earlier lattice certificates examined this series. The algebra, the census, the assembly and the propagation each have a separately authored check. The interval evaluation of the defect over a cell does not.

## 3. The search for an existing second evaluator

**What was searched.** `find` listed every `*.py` file under `.local-data/master-equation-closure/staggered-first-event/` and under its scratch origin `.tmp/mec-008-staggered-first-event/`, excluding bytecode caches: 33 files with 17 distinct contents by SHA-256. Each distinct file's opening description was read. For the six references, the imports, input paths and target receipts were read. The owner's only non-Python instrument is a presentation checker. The lattice lane's `analysis/` and `evidence/` directories were listed for files named for this branch: seven documents and no source file. A search of `reference/priorities`, `scripts` and `tests` for the three residual file names in source files found nothing.

**What was found.** The 17 distinct sources are the subject chain (five files), three versions of the propagation subject, an event summary, the numerical evolution, six references, and one tail source inherited from the earlier certificate. Section 2 accounts for every one. None is a second cell evaluator.

**What this first search did not cover.** It did not examine the neighbouring `sublattice-decomposition` owner, and it read only Sections 7 to 13 of the assessment and the residual statement. Both gaps were closed in the continuation, and closing the first changed the finding: Section 10.1 gives the completed scope and what remains unknown.

All four retained manifests verify when checked from the repository root: 13, 6, 16 and 51 entries.

## 4. The cell selected for independent reconstruction

The selection was fixed and recorded before any independent target computation, in `cell-selection.json` in this task's retained owner (SHA-256 `50e95bc516dd5a2dff67951a0b02bd39c3a873c85ba6bc83a1f0d376b4f5f064`). The rule: among the refined cells inside the possible first-event band $(1191/128,1193/128]$, take the one with the largest recorded completed residual.

| Cell | Recorded residual | Midpoint defect | Derivative bound |
| --- | ---: | ---: | ---: |
| $[1191/128,\,2383/256]$ | 0.020016661724636536 | 0.000138 | 10.18 |
| $[2383/256,\,149/16]$ | 0.021650898291581407 | 0.000146 | 11.01 |
| **$[149/16,\,2385/256]$** | **0.023476976833088595** | 0.000153 | 11.94 |
| $[2385/256,\,1193/128]$ | 0.020616824494967014 | 0.000162 | 10.47 |

The selected cell is $[149/16,\,2385/256]=[9.3125,\,9.31640625]$. It is also the cell that sets the largest suffix defect the residual statement quotes. On it the comparison displacement lies in $[0.2326,0.2367]$ and the comparison speed in $[1.0035,1.0312]$: the comparison has already passed unit speed there, which is why the curve is an auxiliary and not the actual motion on that cell.

## 5. Specification of the independent enclosure

This section is the mathematical plan for the reconstruction, derived from the law and not from the subject's code. It was written before the evaluator, and Section 6 records how the evaluator as run differs from it.

**The defect.** Take a receiver on one sublattice at vertical displacement $Q(t)$. A source at integer offset $d$ with vertical component $m$ and transverse squared distance $p$ has parity $\sigma=(-1)^{m+p}$, vertical position $m+\sigma Q(s)$ and vertical velocity $\sigma Q'(s)$. Its causal root and row follow from the canonical equation with $c_f=1$:

$$
r=\sqrt{p+\left[Q(t)-m-\sigma Q(s)\right]^2},\qquad s=t-r,\qquad
n=\frac{Q(t)-m-\sigma Q(s)}{r},\qquad D=1-\sigma n\,Q'(s).
$$

The vertical acceleration contribution is $\sigma n/(r^2D)$: equal polarities contribute away from the emission site. Subtracting the same source held at its lattice site, seen from the same displaced receiver, gives the changed row

$$
\frac{\sigma n}{r^2D}-\frac{\sigma\,[Q(t)-m]}{\left(p+[Q(t)-m]^2\right)^{3/2}} .
$$

With $S(q)$ the stationary block-summed field at a receiver displaced by $q$, the functional is $\mathcal F=16\,[S(Q(t))+\sum_{d}\text{changed row}]$, and the sum of changed rows converges absolutely because remote sources emitted when the displacement was exponentially small.

**The comparison curve.** For $s\le0$, $Q(s)=a\,e^{\lambda_c s}$ with the saved binary exponent. For $s>0$, $Q$ is the quintic matching the saved position, velocity and acceleration at both ends of each archive cell, each saved binary number treated as exact.

**The enclosure method, chosen to differ from the subject's.** Divide the selected cell into $K$ subintervals. On each, evaluate $\rho$ directly with outward-rounded interval arithmetic over the whole subinterval, and take the largest magnitude over the $K$ results. Each root is enclosed by interval contraction starting from the complete geometric box that $|Q|<1/4$ allows, and is unique there because source speeds stay below one. This uses no midpoint value and no reception derivative, so it shares neither the subject's mean-value transfer nor its derivative formulas. It also needs no zero-time jump allowance: that allowance repairs the subject's integration of jerk across $t=0$, and a direct evaluation uses only $Q$ and $Q'$ at sources, which are continuous there, and $Q''$ at a reception time far from zero. A direct evaluation loses the cancellation the subject's method preserves, so before running it the independent bound was expected to be looser than $0.0235$. That expectation was wrong, as Section 6 shows: with fine subdivision the direct bound is tighter.

**Components and their independence.**

| Component | Plan | Independence |
| --- | --- | --- |
| Interval arithmetic | Newly written outward rounding, one unit in the last place after every correctly rounded operation | Independent of `interval_rows.py`, which was not read for this purpose |
| Quintic reconstruction | Newly written from the Hermite endpoint conditions | Independent of `archive_enclosure.py` |
| Roots and rows | From the displayed formulas | Independent |
| Source census | The archive's group table | Shared input; separately checked by the census reference |
| Tail beyond radius fourteen | Newly derived bound from the static displacement and transmitter terms with the shell count $24M^2+2$ | Independent derivation; a deliberately crude exponential bound gives $5.2\times10^{-13}$ |
| Stationary field $S$ | The cubic and higher coefficient receipts, and the tabulated tail at radius $1/4$, which exceeds the cell's largest displacement | Shared named references, separately authored for the earlier certificate |
| Endpoint data | The archive, `83f0f474…851b` | Shared by definition of the comparison |

**Known cases to pass, and to retain, before the target.**

1. Interval primitives against exact rational values, including a square root and a quotient with known enclosures.
2. The quintic reconstruction on a polynomial of degree five, where it must be exact, and on the archive's own nodes, where it must return the saved jets.
3. A static lattice, $Q\equiv0$: every changed row and the stationary field vanish.
4. **The growth root.** On the purely exponential history at very small amplitude, $\mathcal F[Q](t)$ must enclose $\lambda^2Q(t)$ to the expected relative accuracy, with $\lambda$ taken from the separately certified characteristic-root reference. This tests the sign, the polarity convention, the multiplicities and the coupling together against a number this evaluator did not produce.
5. A single moving source in a nonaxial Pythagorean geometry with rational range, against the exact row.

Only if all five pass is the selected cell evaluated. Agreement or disagreement with the frozen value $0.0235$ is the result and is not a known case.

## 6. The independent enclosure of the selected cell

**This section is a historical record of the first evaluator and its two runs. Its figures are not claimed as rigorous enclosures.** Review found three places where that evaluator used ordinary floating arithmetic in a step that needed outward rounding, and one unsupported class of subdivisions; Section 10.2 lists them. The corrected evaluator's result in Section 10.2 is the one this report asserts. The first [evaluator](../evidence/serial-staggered-cell-enclosure-2026-10-10.py) (SHA-256 `c712ee423f811b45a7c587ce993c47aa0e5d3a69f8d024df41fa02ecca95147a`) was written for this task from the formulas of Section 5. It imports nothing from the subject and reads no subject-produced bound. Its only use of the frozen residual receipt is the selection record, read to learn which cell to evaluate and to print the frozen value beside the result.

### 6.1 Known cases, passed before the target

All ten passed in one run, and each target run re-executes them and stores their record before evaluating the cell.

| Known case | Outcome |
| --- | --- |
| Interval quotient strictly encloses $1/3$; square root encloses $\sqrt2$; mixed-sign product | Pass, checked with exact rationals |
| Quintic reconstruction on a polynomial of degree five: value and two derivatives at an interior point | Pass; exact values inside the enclosures |
| Archive node jets returned at both ends of three cells | Pass |
| Static lattice, $Q\equiv0$: every one of the 3,073 changed rows encloses zero, with magnitude below $10^{-12}$ | Pass |
| One stationary source in a 3-4-5 geometry: zero change, and static row equal to $4/125$ | Pass, exact rational comparison |
| **Growth root.** On a purely exponential history of amplitude $2^{-20}$, sixteen times the summed changed rows against $\lambda^2Q$, with $\lambda$ from the separately certified root reference | Pass. The ratio is enclosed in $[0.99999915,\,1.00000085]$ |
| Stationary field: $16\,S(1/10)$ from the shared coefficient receipts against a direct sum of static rows over the cube of radius fourteen | Pass. Enclosure $[0.2300053,\,0.2300288]$; direct sum $0.2300170$ |

The growth-root case is the decisive one. It exercises the root solver, the row formula, the polarity sign, the multiplicities and the coupling together, and the number it must reproduce comes from an integer-arithmetic reference this evaluator did not produce. The stationary case fixes the sign and normalization with which the shared coefficient receipts enter.

One known case was first written incorrectly: the single-source case displaced the receiver by $1/2$ while telling the root solver that displacements were zero, and the solver correctly refused with an empty root box. The case was corrected to declare the displacement, before any target was run. The specification's moving-source Pythagorean case was not implemented; the single-source case run is stationary only, and moving sources are tested through the growth-root case.

### 6.2 Target

| Run | Subintervals | Independent defect bound | Enclosure of $\rho$ over the cell | Wall seconds | Supervised run |
| --- | ---: | ---: | --- | ---: | --- |
| `c1-pieces512-2026-10-10` | 512 | 0.011327307940262986 | $[-0.0109957,\,0.0113273]$ | 6.611 | `2e0fad89-9929-4557-a04b-20d086dcc788`, exit 0, group closed |
| `c2-pieces4096-2026-10-10` | 4096 | **0.0015550587367990033** | $[-0.0015129,\,0.0015551]$ | 52.086 | `8c751b8e-dfda-4ac4-aee6-edf15f85ebd3`, exit 0, group closed |

Both runs used the first evaluator and the same method; the second only subdivides more finely. Because of the arithmetic gaps named above, neither figure is asserted as a rigorous upper bound; the corrected evaluator's bound, which is asserted, differs from the second figure in the thirteenth significant digit. The first was run to measure cost. The second was launched after the first result had been seen, and that result was already inside the frozen bound, so the finer run tightens the figure and does not change the comparison's outcome. Each bound includes the remote-source tail, $5.19\times10^{-13}$.

**Comparison with the frozen receipt.** The frozen completed residual for this cell is $0.023476976833088595$. The first evaluator's figure is smaller by a factor of about fifteen. The confirmation that the frozen value is a valid upper bound on this cell rests on the corrected evaluator of Section 10.2, which gives the same comparison. The frozen midpoint defect, $0.000153$, lies inside the independent enclosure. The bound shrinks nearly in proportion to the subinterval width between the two runs, which indicates that the independent figure is still dominated by interval width and that the true defect on this cell is smaller again; that last statement is an inference from two data points, not a measured bound.

Three geometric quantities the two evaluators both report agree closely, which they should if both solve the same roots: latest emission $8.576571983422143$ against the frozen $8.57657198342214$; smallest range $0.7398342665778594$ against $0.7398342665778627$; smallest transmitter factor $0.93374$ against $0.93334$, the frozen figure being taken over its wider derivative cell.

**No zero-time jump allowance enters this bound, by construction.** Only $Q$ and $Q'$ at source times and $Q''$ at a reception time above nine are used, and the two sides of $t=0$ are enclosed separately, so no continuity across zero is assumed.

### 6.3 Independence of each component, as executed

The table describes both evaluators' design. In the first evaluator the stationary-tail addition, the starting root box and the remote tail were not outward as the table's wording implies; the corrected evaluator makes them so.

| Component | As executed | Standing |
| --- | --- | --- |
| Interval arithmetic | Written here: one unit in the last place outward after each correctly rounded operation; sums by exactly rounded accumulation | Independent |
| Quintic reconstruction | Written here from the Hermite endpoint conditions | Independent |
| Range of $Q$ and $Q'$ over wide source boxes | Per-cell enclosures combined by running minimum and maximum, with no monotonicity assumed | Independent |
| Roots | Interval contraction from the complete geometric box; uniqueness from source speeds below one on that box, asserted | Independent |
| Rows and their sum | The displayed formulas; 3,073 groups with integer multiplicities | Independent arithmetic on the shared group table |
| History before $t=0$ | The crude exact bounds $0<Q\le a$ and $0<Q'\le\lambda_ca$, with no exponential evaluated | Independent; looser than the subject's |
| Remote tail | Derived here; a series lower bound for the exponential | Independent |
| Source group table | From the archive | Shared input; checked by the census reference |
| Stationary field | Coefficient and tail receipts of the earlier certificate, with the tabulated tail at radius $1/4$ | Shared named references |
| Endpoint data | The archive | Shared by definition of the comparison |

When this section was first written the instrument was self-reviewed only. Both versions have since been read in full by the reviewer, who also replayed the corrected one.

### 6.4 What this does and does not establish

On the cell $[149/16,\,2385/256]$, the defect of the comparison curve is bounded by $0.0015550587367998904$ by the corrected evaluator of Section 10.2, authored separately from the subject. **Grade: measured, by that evaluator, on that cell.** The frozen bound for the cell is therefore not too small.

It does not establish the other 657 cells, and it does not re-derive the event. An evaluator that passes its known cases and agrees on one cell makes a systematic error in the subject's method less likely; it does not exclude an error specific to other cells, for instance where source roots cross $t=0$, which this cell's sources do only through the crude ancient bounds. Extending the same evaluator to all cells is possible in principle at roughly a minute per fine cell at this subdivision; that cost is an extrapolation from one cell and was not measured.

## 7. Preservation and retention

Nothing under the frozen owner was written: a SHA-256 listing of its 110 files, excluding bytecode caches, taken before any computation is identical afterwards, by `cmp`. The retained owner is `.local-data/master-equation-closure/serial-staggered-residual-coverage-2026-10-10/`: `cell-selection.json`, `preserved-listing.sha256`, `cell-runs/` with each run's `known.json` and `cell-enclosure.json`, `retention/` with redacted statuses for both supervised runs and the closeout, and a nine-entry `receipts.sha256`. A second request to create the first run's owner was refused and wrote nothing. The supervisor's closeout for the owner task reports `clear`.

**Current reproduction uses the corrected evaluator, version 2, and a new run label each time.** It writes into `cell-runs-v2/<label>/` in the retained owner and refuses an occupied label or a subdivision that is not a power of two.

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/lattice-research/evidence/serial-staggered-cell-enclosure-v2-2026-10-10.py known
node scripts/dev/owned-compute-supervisor.mjs run --owner-task <task> --deadline-seconds 300 -- "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/lattice-research/evidence/serial-staggered-cell-enclosure-v2-2026-10-10.py target --run <new-label> --pieces 4096
```

The first evaluator, `serial-staggered-cell-enclosure-2026-10-10.py`, and its two run records under `cell-runs/` are kept unchanged as the historical record of the first packet. It is superseded and should not be used for a reproduction.

## 8. Falsifiers

- A source in the retained owner, or in an unsearched owner, that evaluates the defect over a reception cell without calling `continuous_residual.py`.
- A reference whose code recomputes a cell bound where Section 2 says it only reads one.
- An error in the independent evaluator that its known cases do not reach: for example an interval operation that is not outward, a source root outside its starting box, or a shared stationary receipt entered with the wrong sign at displacements other than the one tested.
- A finer subdivision of the same cell giving a bound that is not smaller, or an enclosure that excludes the frozen midpoint defect.

## 9. Proposed integration

Proposals for the plan owner; nothing was edited.

1. Record the coverage finding at its scope: by the completed search of Section 10.1, the staggered residual's cell bounds are computed only by the subject; its ingredients and consequences have separately authored checks, and the acceleration's point values have a separately authored 65-digit check at nine reception times in the decomposition owner.
2. Record the one-cell reconstruction at its scope: on $[149/16,2385/256]$ the corrected separately authored evaluator bounds the defect by $0.0015550587367998904$, inside the frozen $0.023476976833088595$. Keep all-cell independent evaluation and any event promotion as distinct, open items.
3. If a second evaluator is known to exist elsewhere, name its location; Section 3 lists what was not searched.

## 10. Continuation after review

Review raised three comments. All are accepted. The first evaluator, both of its target records and every frozen source and receipt are unchanged; the corrections are in a separately versioned evaluator and a new run owner.

### 10.1 R3-01: the completed reading and search

**Read in full, without truncation.** An earlier version of this paragraph claimed a full read while saying that paragraphs had been cut at 700 characters; that was not a full read. The cut portions have now been read. A script printed every part of each document that any earlier read had cut: three paragraphs of the continuation document, at its lines 181, 238 and 330, and nothing in the assessment or the residual statement, whose earlier reads had used limits no paragraph exceeded. The three passages concern the non-circular causal lookup with the signed receiver coefficient, the retention of the comparison prefix through time nine, and the uniform convergence of the remote changing-source sum near the event. None names an instrument or changes a conclusion here. The finished read scope is:

| Document | SHA-256 | Read |
| --- | --- | --- |
| `staggered-lattice-first-event-independent-adjudication.md`, 322 lines | `7e7a71232e7c5deedb12c38596cf1ed9e9b1cdbf7d94db0294a7c17c0732ca75` | All fourteen sections, complete |
| `staggered-lattice-first-event.md`, 338 lines | `029b0a36475893b3832a0d103102241f039dd288fdbf701dffff4da52187c788`, equal to the construction manifest's recorded subject hash | Complete |
| `staggered-lattice-first-event-residual.md`, 89 lines | `e5af27568fdfef7670ab7e337aa0cd805ab83a231f280ee24a574be0da54cce1` | Complete |

**The linked documents, opened for their instrument and retention dependencies only.** The continuation document links the incoming-history construction and the root-birth theorem besides the two documents above. Each was opened by listing its headings and searching it for source files, data files, retained-owner paths and the words residual, enclosure and evaluator; their proofs were not reviewed, which belongs to a later task.

| Document | Instrument and retention dependencies found |
| --- | --- |
| `smooth-two-particle-incoming-reachability.md` (446 lines, `6ab6b322…`) | Retained owner `incoming-reachability/construction/`; no source file named |
| `smooth-two-particle-incoming-reachability-domain.md` (316 lines, `9b4cfd22…`) | Retained owner `incoming-reachability/domain/`; no source file named |
| `smooth-two-particle-incoming-reachability-independent-adjudication.md` (399 lines, `fbb0f067…`) | Retained owner `incoming-reachability/independent/` and its `reference.py` |
| `smooth-two-particle-next-event-root-birth.md` (110 lines, live `950ce4ad…`, edited since the recorded `cc0dc439…`) | None; a theorem with no instrument |

The word residual in those documents means the causal-root residual of a single source, not the equation defect of the comparison curve. The `incoming-reachability` owner holds one Python instrument, `independent/reference.py` (`00e06655a4e1…`), described as exact algebra controls for the incoming-history proof, and two presentation checkers. A search of that owner for the first-event residual files, archive and evaluator names found no pointer. It contains no residual-cell evaluator.

**The neighbouring owner changes the finding.** `.local-data/master-equation-closure/sublattice-decomposition/` holds ten instruments. One is a candidate evaluator: `independent/reference.py` (SHA-256 `2b3fe9aab2fde0f9e513d20589824e1198f6b0552fcc8fb120b4a041144c7d69`). By its own description it is an "independent high-precision point reference; not an actual-path interval proof". It enumerates the 24,388 literal offsets itself, reconstructs the comparison curve by its own Bernstein evaluation, solves each root, and evaluates the stationary, same-parity, opposite-parity and total acceleration with 65-digit arithmetic, at nine reception times: 0, 4, 6, 7, 8, 8.5, 9, 9.25 and $1191/128$. Its companion `reconcile.py` then checks that the interval values produced at those times by that owner's subject, which imports the staggered subject's row, archive and stationary primitives, contain the independent centres. That owner's 36-entry manifest verifies.

So the accurate statement of coverage is: **the full cross acceleration of the comparison curve has a separately authored check at nine single times, the last of them the left edge of the event band; the enclosure of the defect over whole reception cells, including the derivative transfer, has none.** My first report's statement that the defect evaluation had no separate check was too strong for point values, and the cause was a search that stopped at the owner's boundary.

**The retention chain's document inputs.** The construction owner's list of six prior mathematical documents no longer verifies against the paths it records, by `shasum -c` (0 of 6). Comparing each recorded hash with the live files and the retained snapshots shows why. The three incoming-history documents were moved to the lattice lane with their bytes unchanged, and each also has an exact retained snapshot. The root-birth and event-measure documents are still at their recorded paths but have been edited since; each has an exact retained snapshot. The event-measure adjudication has been edited since and no snapshot of it was found in the owner's snapshot directory. All six concern the ancient branch or the obstruction after the event. None is consumed by the residual calculation, whose own six inputs all verify. This is recorded as a provenance observation; no file was changed.

**Remaining unknowns.** Three retained owners were examined: the first-event owner, the decomposition owner and the incoming-history owner. Others were not searched. Records outside this machine are unknown.

### 10.2 R3-02 and R3-03: the corrected evaluator

The corrected [evaluator](../evidence/serial-staggered-cell-enclosure-v2-2026-10-10.py) has SHA-256 `8f08b1cd0d5dcb69a3d07b4a2c010a3d330e181eb3ff9a035e4053e5d4c0e51e`. It was produced from the first by recorded substitutions; the exact difference, 148 changed lines, is retained as `v2/evaluator-v1-to-v2.diff`.

**Arithmetic corrections.** The review was right that three places in the first evaluator used ordinary floating arithmetic where an enclosure was claimed.

| Place | First evaluator | Corrected |
| --- | --- | --- |
| Adding the stationary tail to the field | Endpoint subtraction and addition after enlarging only the tail; an ordinary sum can round inward, as $1+2^{-54}=1$ shows | Outward interval addition |
| Starting root box | Ordinary arithmetic for $\lvert m\rvert\pm2q_{\sup}$ | Outward interval arithmetic |
| Remote-source tail | Ordinary arithmetic with an unproved inflation factor | Exact rational arithmetic throughout, converted upward once |
| Subdivision | Any count dividing the cell | Powers of two only, so every subinterval endpoint is an exact binary number; other counts are refused |

An audit of the remaining arithmetic on the target path found no other ordinary operation: reception and source intervals, the quintic coefficients and their evaluation, the rows, the sums by exactly rounded accumulation, and the final addition of the tail followed by one step upward. One class used only by the growth-root known case evaluates an exponential with a declared slack of $10^{-12}$; it is not on the target path.

**Controls added, all passing before the target.** The corrected evaluator runs sixteen control groups; the ten earlier ones are unchanged.

- **Exact moving source.** The review's example: offset with vertical component four and transverse squared distance nine, opposite parity, reception at zero, source history $Q(s)=(s+5)/8$. The exact root is $-5$, the range five, the transmitter factor $9/10$, the row $8/225$, the static row $4/125$ and the changed row $4/1125$. The evaluator encloses each, the changed row to within $10^{-12}$, starting from the declared bracket $[-5.5,-4.5]$; uniqueness in that bracket follows from the constant source speed $1/8$. The history is unbounded on its past, so the all-past displacement premise is not used for it.
- **Negative controls, each of which must be refused:** a bracket that excludes the root; a source at unit speed; an understated displacement bound for the geometric starting box; division by an interval containing zero. All four are refused.
- **Inward rounding:** the ordinary sum $1+2^{-54}$ equals one, while the outward sum encloses both exact endpoints.
- **Tail arithmetic:** upward conversion of $1/3$ and exactness on $1/4$; the rational bound for $e^{-1}$ equals $24/65$ and exceeds $0.36788$.
- **Subdivision:** 4096 and 2 accepted; 3, 1000 and 1 rejected. A target request with 1000 pieces was refused and wrote nothing.
- **The characteristic-root receipt** is bound by its literal SHA-256, `2747dddd…c558`, and appears in the input map.

The cell-selection record supplies the interval and the frozen values printed beside the result. No number from it enters the enclosure.

**Result.**

| Run | Subintervals | Independent defect bound | Enclosure of $\rho$ over the cell | Remote tail | Supervised run |
| --- | ---: | ---: | --- | ---: | --- |
| `v2c1-pieces4096-2026-10-10` | 4096 | **0.0015550587367998904** | $[-0.0015129306636412212,\,0.0015550587362804793]$ | $5.194108628084432\times10^{-13}$ | `881ba9b3-f79a-41fd-8b02-fffc76bd882f`, 82.777 s, exit 0, group closed |

The corrected bound differs from the first evaluator's in the thirteenth significant digit, as outward rounding of three small steps would. It is inside the frozen $0.023476976833088595$, and the frozen midpoint defect lies inside the enclosure. Latest emission, smallest range and smallest transmitter factor are unchanged from Section 6.2.

**An additional cross-check against the independent point reference.** At $t=1191/128$ the corrected evaluator encloses the full acceleration $\mathcal F[Q]$ in $[6.372015308934022,\,6.372288822002125]$. The decomposition owner's 65-digit value there is $6.37215220531064\ldots$, inside that enclosure. The enclosure's width, about $2.7\times10^{-4}$, comes almost entirely from the shared cubic coefficient interval. This compares two separately written evaluations of the same quantity on the same archive. Three limits apply. The interval as computed is sixteen times the enclosed stationary field plus the changed rows of the finite cube of radius fourteen; it does not add the remote changing-source tail. Including that tail conservatively, by widening both ends by the cell's tail bound $5.194108628084432\times10^{-13}$, which is larger than the tail at this earlier time, gives $[6.37201530893350,\,6.37228882200265]$, and the reference value is inside that as well. Second, the interval is wide and contains a point centre; that is a diagnostic of agreement at one time, not a test of the enclosure over a whole cell and not a gate for it. Third, it was computed inside the target run and not before it.

### 10.3 Dispositions

| Comment | Disposition | Where resolved |
| --- | --- | --- |
| R3-01: finish the reading and the cross-owner search | Accepted. Assessment, continuation document and residual statement read complete, with the previously cut passages printed and read; the two linked documents opened for instrument and retention dependencies; three owners examined; a separately authored point evaluator found and the coverage statement corrected. The earlier claim of a full read made while paragraphs were cut is withdrawn | Sections 1, 2 and 10.1 |
| R3-02: outward arithmetic, dyadic subdivisions, negative controls | Accepted. Three arithmetic places corrected, one restriction added, four negative controls and two arithmetic controls added, fresh target run | Section 10.2 |
| R3-03: exact moving-source control, failed-root and failed-denominator controls, literal binding, selection clarified | Accepted. All implemented and passing | Section 10.2 |
| R3-04: reproduction routed to the superseded evaluator; first-evaluator claims left apparently current; scope of the point diagnostic | Accepted. Section 7 now gives the version-2 commands and marks version 1 historical; Section 6 states in place that its figures are historical and not asserted as rigorous; the point diagnostic is described as excluding the remote tail, with the conservative tail-inclusive interval, and as a diagnostic only | Sections 6, 7 and 10.2 |

Retention for the continuation is in the same owner: `v2/` holds the evaluator difference, the redacted run status and the closeout, `cell-runs-v2/` holds the run's `known.json` and `cell-enclosure.json`, and `receipts-v2.sha256` lists five files. The first packet's nine-entry receipt list and the frozen owner's 110-file listing both still verify.
