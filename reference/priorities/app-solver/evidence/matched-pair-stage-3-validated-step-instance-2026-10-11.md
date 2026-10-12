# Validated Far Step, One Instance Check — 2026-10-11

[Addendum 1 of the generated-history inclusion record](../analysis/matched-pair-stage-3-addendum-1.md), section 5, states a theorem that would give proved position and velocity tubes for a step in which all paths are mutually far. The addendum gave its tube width for the aliasing control without an instrument. This note records an exact evaluation of the theorem's hypotheses and conclusion on that control. It is one instance of a statement, not an implementation of a validated step and not a check of the theorem's proof. Every instance uses $c_f=1$.

## Instrument

[matched-pair-stage-3-validated-step-instance.py](matched-pair-stage-3-validated-step-instance.py) works in exact rational arithmetic, imports no solver code, and takes the true-state bracket from the frozen [bracket instrument](matched-pair-stage-3-aliasing-control-bound.py). Run with `"${AAA_VENV:-../.venv}/bin/python" reference/priorities/app-solver/evidence/matched-pair-stage-3-validated-step-instance.py`; output retained as [matched-pair-stage-3-validated-step-instance-output.txt](matched-pair-stage-3-validated-step-instance-output.txt). It evaluates the static case first and exits with status 2 if that fails.

The control has the receiver at rest at the origin and the source past $10+A\,p(S)$ on $[-20,0]$, with $\kappa=10^{-3}$ and $h=2$. The step position boxes are the trial intervals of radius $\rho=10^{-3}$ about the positions at $T=0$. Two acceleration enclosures are used for the receiver. The first is the zero-centred individual far-field bound $\kappa/((r^-)^2\nu)$, which is general. The second is the two-sided range $[-\kappa/((r^-)^2D_{\min}),\,-\kappa/((r^+)^2D_{\max})]$, valid for this on-axis instance because the source stays above the receiver, the distance lies in $[r^-,r^+]$ and the transmitter factor lies in $[1-3A,\,1+3A]$.

## Result

| Case | H1 to H3, H5 | Enclosure | Velocity tube at $T+h$ | Contains true bracket |
| --- | --- | --- | --- | --- |
| Static, $A=0$ | all hold | far-field | $[-2.0004,\,2.0004]\times10^{-5}$ | yes |
| Static, $A=0$ | all hold | range | $[-2.0004,\,-1.9996]\times10^{-5}$ | yes |
| Target, $A=0.2$ | all hold | far-field | $[-5.0010,\,5.0010]\times10^{-5}$ | yes; true value in $[-1.9634,\,-1.9583]\times10^{-5}$ |
| Target, $A=0.2$ | all hold | range | $[-5.0010,\,-1.2012]\times10^{-5}$ | yes |

The position tubes contain the position brackets in all four rows. All 20 checks pass, exit status 0. For comparison, the step-doubling carrier published a velocity half-width of $2.3\times10^{-10}$ for the same step and missed the true value by $3.66\times10^{-7}$.

## What this establishes and what it does not

**Claim grade: measured**, by the instrument above on two instances. For the control, the theorem's hypotheses H1, H2, H3 and H5 hold with the stated boxes, and its tube contains the exactly bracketed true state under both enclosures. H4 is not checked by computation: the far-field box is the contract's individual bound taken as given, and the range box rests on the on-axis argument stated above. H0 holds because the past is exact prescribed data.

The tubes are honest and wide: the validated half-width is five orders of magnitude larger than the discrepancy the carrier published, and about fifty to a hundred and thirty times the actual error of the aliased step, which is $3.9\times10^{-7}$ in velocity. A validated step of this first-order kind would force much smaller steps to reach the same nominal tolerance; that cost is not measured here. The instrument and the theorem have one author, so this is a consistency check of the statement on one case. Falsifier: an exact evaluation in which a hypothesis holds and the tube misses the bracket.
