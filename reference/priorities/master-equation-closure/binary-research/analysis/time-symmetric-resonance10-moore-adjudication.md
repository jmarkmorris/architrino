# Independent concrete ten-period resonance certificate

**Derived computer-assisted result:** the selected equal-past/future canonical radial circle family with $K=c_f=1$ has a physical resonance with $k=10$ and opposite rotating frequency $m=9/10$. The complete fixed-frequency determinant has a simple zero in the exact bracket

$$
x_{10}\in I=
\left[\frac{1534190653}{3221225472},
\frac{3068381311}{6442450944}\right],
\qquad |I|=\frac5{6442450944}<2^{-30}.
$$

The corresponding speed parameter is enclosed by

$$
\frac{5359185451}{10^{10}}
\le\beta_{10}=\frac{x_{10}}{\cos x_{10}}
\le\frac{5359185463}{10^{10}}<1.
$$

The root is unique in this bracket. This assessment does not claim uniqueness of this fixed frequency over all speeds or over the whole initial search interval.

## Independence, known controls and exact signs

The [independent recipe](../evidence/time-symmetric-resonance10-moore-mathematical-reference.md) was frozen before target evaluation. The [separate evaluator](../evidence/time-symmetric-resonance10-moore-reference.py) evaluates the full unregularized Hermitian symbol $H_-=(a,if;-if,d)$ and differentiates $F=ad-f^2$ with independently authored interval dual jets in $x$. It imports neither the coordinator's resonance implementation nor its regularized G evaluator. No coordinator resonance result or implementation was read before this target was completed.

The fixed prospective case was $m=9/10$, $x\in[1/4,2/3]$. Known controls passed before target use: outward rational conversion; reciprocal and whole-box square jets; the exact zero-angle full symbol and $F=-1539/10000$, $F_x=0$; the nonzero-angle phase identity $F=F_x=0$ at $m=0$; the trigonometric identity jet; and the separate identity $\beta'=D/\cos x$.

The two prescribed search endpoints had opposite strict determinant signs. Exact rational midpoint bisection retained every determinant enclosure and sign decision and stopped only after the frozen width condition. A final interval evaluation covered all of $I$ simultaneously. The following coarse rational bounds were independently checked to contain the exact binary-rational certificate endpoints:

| Quantity | Enclosure |
| --- | --- |
| $F(9/10,I_{\rm left})$ | $[-3\cdot10^{-10},-2\cdot10^{-10}]$ |
| $F(9/10,I_{\rm right})$ | $[2\cdot10^{-10},3\cdot10^{-10}]$ |
| $F_x(9/10,I)$ | $[6551994/10^7,\ 6551998/10^7]$ |
| $d(9/10,I)$ | $[-925907/10^6,\ -925905/10^6]$ |
| $\beta_x(I)$ | $[14/10,\ 141/100]$ |

In particular, this is not merely an endpoint sign-change or floating root approximation: the derivative and nonzero radial-coordinate tests cover the complete root bracket.

## Transversality and nonlinear consequence

Since $\beta_x>0$ and $F_x>0$, the fixed-frequency parameter derivative satisfies $F_\beta=F_x/\beta_x>0$ at the enclosed root. The determinant zero is unique and simple in $I$. The independently admitted all-speed real-frequency theorem identifies it as the unique positive opposite frequency at its speed, so $m_*(\beta_{10})=9/10$ and there are no additional periodic opposite frequencies at this circle.

At $F=0$, the complex vector $(d,if)$ is a null vector of $H_-$. The complete interval $d<0$ proves that its radial coordinate is nonzero. In real reversible coordinates this gives a kernel vector $(d\cos(9\theta/10),-f\sin(9\theta/10))$. The other Hermitian eigenvalue is nonzero because the root has matrix nullity one.

Consequently this concrete resonance supplies exactly the finite-block transversality and nonzero radial coefficient required by the [independently assessed C1 multiple-period existence argument](alternatives-screen-2026-10-05-time-symmetric-multiple-period-hale-adjudication.md). The local functional-analytic proof applies at every positive, strictly subfield resonance with those properties; its sufficiently-large-k selection was one way to guarantee them, and is not otherwise used in its root-map, Fredholm or scalar intermediate-value argument.

Thus for every sufficiently small nonzero reversible kernel amplitude there is at least one nearby parameter and a complete noncircular mirror-planar solution with physical period $20\pi/\omega(\beta)$. The pair separation is positive and nonconstant, and the physical speeds stay uniformly below one. The nearby parameter selections tend to $\beta_{10}$ as amplitude tends to zero. The nonlinear amplitude radius remains existential. No unique or smooth branch selection, minimal period, stability, complex-spectrum classification or causal release is claimed.

## Reproducibility and scope

Runtime facts, measured by the retained evaluator receipt: shared repository-adjacent venv, Python 3.13.2, mpmath 1.3.0, libmp python backend, interval decimal precision 60. Arithmetic operations and trigonometric evaluations are directed intervals. The target retains exact rational endpoints for every point sign and complete-bracket quantity. Its physical speed margin and the denominator chart are explicit.

Local receipts reside in the ignored directory .local-data/master-equation-closure/time-symmetric-resonance10-moore/. They are local provenance; the tracked evaluator and recipe reproduce fresh receipts using fresh output names. Run the evaluator with --known first, then --target with that known receipt passed through --known-receipt. The source hash must match before target execution.

| Item | SHA-256 |
| --- | --- |
| Frozen mathematical recipe | 34a18a23e2227232318a67befbfbe7c8611071e0b2e716b86de4df0520a6e79b |
| Independent full-symbol evaluator | f6eb33117de86dc16a3a0373209a2918a11293586497d93eb6e9b1d5447f1c74 |
| known-v1.json | 6eea693daa76d8a015d90458fcbe3a19d29bcff6d3efe01d5f610827dd7bd648 |
| target-v1.json | 5e4b3b0595525e2f3aef4bff2698447d222292c00cbed043962405d13d037ee5 |
| Input full-symbol analytic reference | 85a17a66c5c9c8e6812b90b21881a1600e2dd0274106784dce3b6cd7b39757da |
| C1 existence assessment | de1ee5d29d9642ffddd68d2ad1daaecc04773af4fe94c7c9a7dc01cd8752a11e |

Falsifiers are a wrong selected full symbol or jet rule; inward interval arithmetic; a retained endpoint interval containing zero despite a claimed sign; failure of the whole-bracket derivative, d or speed bounds; or failure of the imported complete-frequency or C1 nonlinear premises. No frozen antecedent or coordinator source was edited. Scoped whitespace checks of the new recipe and evaluator produced no diagnostics. No ongoing computation remains.
