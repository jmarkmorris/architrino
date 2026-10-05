# Independent adjudication: validated circle evidence and disposition

The [first frozen assessment](alternatives-screen-2026-10-05-adjudication-first.md) contains the independent derivations and falsifiers for every assigned analytical claim. This companion closes its two remaining implementation checks. Both passed. The first assessment was written before any replies about its conclusions; no other worker's reply was needed to complete this adjudication. The comparison laws remain separately selected mathematical cases and receive no canonical promotion here.

## Independent finite variation of the circle paths

The new [path-variation instrument](../binary-research/evidence/alternatives-screen-2026-10-05-adjudication-path-variation.py) imports neither a subject instrument nor the coordinator's reference. It evaluates the radial $p=3/2$ acceleration directly from displaced Cartesian source/receiver paths, solves their changed causal-root equations, reconstructs the source velocities at those changed emission times, and retains the absolute denominator in every row. This tests the entire source-clock derivative, including the negative-denominator partner branch, by a route different from evaluating the previously derived tensors.

Let $R$ and $\omega$ be the radius and angular rate of the base circle, and let $Q$ be planar rotation. In each Cartesian coordinate direction $e_k$, the exchange-even variation of both paths is

$$
\eta_i(t)=\epsilon R e^{\mu\omega t}Q(\omega t)e_k.
$$

Here $\epsilon$ is dimensionless displacement amplitude and $\mu=\lambda/\omega$ is dimensionless growth rate. For each sign of $\epsilon$, the instrument solves all four continued ordinary roots before computing the acceleration. Subtracting the two responses and dividing by $2\epsilon$ yields a numerical derivative of the dimensionless coefficient $C$. Multiplication by $R^{1-p}/b^2$, with $b=R\omega$, converts it to the dimensionless Cartesian characteristic matrix. The factor follows directly by dividing the acceleration variation by $R\omega^2$; it provides a separate check on the radius normalization.

The stationary-source derivative is the independent known case. For an opposite-polarity source at $(-1,0)$ and receiver at $(1,0)$, the derivative of $-r/|r|^{p+1}$ is diagonal with entries $p/2^{p+1}$ and $-1/2^{p+1}$. The known run re-solves the stationary root before each response. At relative step $10^{-12}$, its measured derivative errors were below $9.7\times10^{-26}$. That run completed at 2026-10-05 13:31:19 UTC before the target.

The target completed at 13:31:33 UTC using 80 decimal digits. It found the circle candidate $b=3.691480382840129581\ldots$, $R=0.000942584180952353258\ldots$, inside the coordinator's existence enclosure. Its signed transmitter factors were approximately $3.78332$, $4.48023$, $-1.95385401$ and $2.22883$. The determinant results were:

| Dimensionless rate $\mu$ | Relative displacement step | Direct-path determinant |
| --- | --- | --- |
| $0.24$ | $10^{-8}$ | $-0.0348759650480000565467$ |
| $0.24$ | $10^{-12}$ | $-0.0348759650479997861786$ |
| $0.24$ | $10^{-16}$ | $-0.0348759650479997861786$ |
| $0.26$ | $10^{-8}$ | $0.0288782881240158741039$ |
| $0.26$ | $10^{-12}$ | $0.0288782881240161511347$ |
| $0.26$ | $10^{-16}$ | $0.0288782881240161511347$ |

Every measured value lies within the corresponding coordinator interval, $[-0.044056,-0.025701]$ at $0.24$ and $[0.020316,0.037436]$ at $0.26$. The direct-path instrument has finite-difference and floating root errors without rigorous enclosures; its purpose is independent numerical derivative verification. The existence theorem still rests on the independently audited outward interval signs and the analytical complete census, not on these decimal approximations. Fixed branch brackets in the diagnostic follow the four simple roots locally; they are not an independent global census of arbitrary perturbed histories.

> Claim grade: measured. Instrument: the linked direct-path finite-variation program at 80 decimal digits and the three displayed displacement steps. Boundary: derivative and determinant consistency at the selected superfield circle candidate; no nonlinear evolution, full spectrum, root uniqueness or subfield accessibility. Falsifier: a converged direct-path determinant outside the corresponding valid interval enclosure, or a lost continued root/sign at a listed displacement.

## Frozen interval source and receipt audit

The [replay audit](../binary-research/evidence/alternatives-screen-2026-10-05-adjudication-replay.py) loads the frozen reference sources without editing them, runs their known controls first, and then reproduces each full target value. It records SHA-256 bindings for the source bytes and retained receipts in its own ignored records. Its target compares structured JSON exactly, including rational interval endpoints, rather than comparing only decimal summaries. Both target values equaled the retained reference receipts exactly. This is measured source-bound reproducibility. It is not counted as a third independently authored interval instrument.

The mathematical audit in the first assessment independently establishes why the arithmetic encloses, why every root branch is included, why the complement contains none, why the signed denominator enters the derivative even under absolute acceleration weighting, and why the radius exponent is correct. Source inspection and exact replay together admit the coordinator's existing computer-assisted derived existence and positive-mode conclusions at their stated boundaries. The $p=2$ control also reproduces; no $p=1$ or vector-linear superfield exclusion follows from their sample grids.

For completeness, the transverse fixed-period kernel needs no numerical truncation. In the common sector its nonzero real Fourier argument would satisfy $y^2=b^2\sin^2 y$, impossible for $0<b\le1$. In the opposite sector $m^2\cos^2x=\cos^2(mx)$ admits $m=\pm1$ only: $x<\pi/3$ makes the left side exceed one for $|m|\ge2$, while $m=0$ fails. These give one vertical translation and two tilts. The audited finite planar blocks and Fourier tail give two planar translations and one phase rotation, totaling the six Euclidean symmetry directions. A fixed-period six-dimensional kernel is boundary nondegeneracy; it is not dynamical stability or nonlinear uniqueness.

> Claim grade: measured for source-bound replay; derived, with computer assistance, for circle existence and determinant sign when combined with the first assessment's proofs. Falsifiers: a source hash change, a replay mismatch, an invalid interval operation, or failure of a root-complement or characteristic-derivative argument. The replay records are under the ignored owner and are local provenance, not fresh-checkout CI inputs.

## Commands, outputs and scope

Run from the repository root using the shared venv. The scripts intentionally refuse to overwrite their receipt names, preserving the first known-before-target ordering. Reproduction in another checkout requires the named prerequisite receipts for the frozen reference. In this checkout the runs below all completed with exit code zero; no owned job remains running.

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-adjudication-path-variation.py --known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-adjudication-path-variation.py --target
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-adjudication-replay.py --known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-adjudication-replay.py --target
```

Local provenance consists of `path-known.json`, `path-target.json`, `replay-known.json` and `replay-target.json` under `.local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05/adjudication/`. The two new instruments, these two adjudication documents and the [escape supplement](alternatives-screen-2026-10-05-adjudication-escape-supplement.md) are the complete authored scope. Subject, coordinator reference, equation, ledger, manuscript, queue and source receipts were not edited by this adjudicator. No Git publication or regeneration was performed.

## Adjudicated disposition

The assigned analytical claims pass independent reconstruction within their exact domains. The $p=3/2$ superfield circle and its full Cartesian growing linear mode additionally pass the interval-source audit and independent direct-path numerical derivative check. The finite-width stationary coincidence has exactly two right-half-plane characteristic roots per Cartesian relative component; contact/passage and first-unit events concern the separately specified approaching preparation. Distant outgoing scattering remains separate from near-circular release dynamics. Collinear amplitude-gradient finite endpoints must be unit speed at positive separation, while terminal velocities require the additional all-future fixed speed margin.

No defect requiring a change to an assigned subject or reference was identified by these scoped derivations and checks. Remaining limitations are scientific boundaries already stated, not failed calculations: nonlinear fate near the superfield circle, release accessibility, a complete circle spectrum, nonlinear isolation of the time-symmetric periodic family, and arbitrary-history amplitude-gradient global existence. The active Maxwell and coupled finite-width targets were not assessed here. Binary Section 16 remains deferred. Shared integration belongs to the coordinator.

The final scoped text check, `git diff --no-index --check /dev/null` applied separately to the three new adjudication Markdown sources and two new Python sources, emitted no whitespace diagnostics. Python's standard `ast.parse` parsed both new instruments successfully. The foreground path target and reference replay target each returned exit code zero through their recorded command sessions; no detached computation was created. These are scoped validation statements, not a repository-wide cleanliness or test-suite claim.
