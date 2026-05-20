# Spiral A1 Retained Memory Profile

Status. Priority proof packet for the A1 finite-memory inverse-rate continuation.
This packet consumes
[spiral-a1-nonconstant-time-law-chart](spiral-a1-nonconstant-time-law-chart.md)
and gives a constructive turn-center witness. It is not a nonconstant A1 orbit
certificate.

Claim level. The finite-memory A1 obstruction is real for simple monotone
one-parameter time laws, but it is not an algebraic no-go at the turn center.
A smooth positive inverse-rate memory profile can retain the old A1 delayed
offsets, keep the old active source-speed Jacobians at those offsets, and
supply the local angular-rate slope required by tangential balance.

## Past-Lag Reduction

At $\theta=0$, use the past-lag coordinate $x=-\phi\ge0$ and define
$$
q(x)
\equiv
\frac{\omega_\ast}{\dot\theta(-x)}.
$$
Then
$$
H(\Delta)=\int_0^\Delta q(x)\,dx,
\qquad
H'(\Delta)=q(\Delta).
$$
The local slope target becomes
$$
q'(0)
=
\frac{\ddot\theta(0)}{\dot\theta(0)^2}
=
\frac{T_0(C_{\mathrm{A1}})}{\Gamma_\ast}
\equiv k_\ast,
$$
with
$$
k_\ast\approx -1.0072663738.
$$
Equivalently, the inverse-rate function in angle coordinates has positive
slope to the future and $q$ has negative slope into the past-lag coordinate.

Let the constant-rate retained offsets at $\theta=0$ be
$$
\Delta_{P_1}=2.6459754451039146,
\quad
\Delta_{P_2}=4.145702924735412,
\quad
\Delta_{S_1}=4.898122163957139,
\quad
\Delta_{P_3}=6.837402747117865.
$$
Because the constant-rate chart satisfies
$b_\ast\Lambda_\alpha(0,\Delta_\alpha)=\Delta_\alpha$, retaining those same
offsets requires
$$
\int_0^{\Delta_\alpha}\bigl(q(x)-1\bigr)\,dx=0
$$
for each retained branch. Keeping the active source-speed factor unchanged at
the retained offsets requires
$$
q(\Delta_\alpha)=1.
$$
These are moment and endpoint constraints on the inverse-rate memory profile,
not new branch gates.

## Compensation Lemma

Because $k_\ast<0$, the past-lag profile satisfies
$$
q(x)=1+k_\ast x+O(x^2)<1
$$
for sufficiently small positive $x$. Retaining even the first old delayed root
requires
$$
\int_0^{\Delta_{P_1}}\bigl(q(x)-1\bigr)\,dx=0.
$$
Therefore any retained-root profile must have $q(x)>1$ somewhere inside
$(0,\Delta_{P_1})$. In particular, no past-lag profile that is nonincreasing
from $q(0)=1$ through the first retained delay can retain the old A1 chart.

This is the finite-memory obstruction in its sharp local form: the local slope
forces an inverse-rate dip near the turn, but root retention forces a
compensating inverse-rate crest before the first delayed source.

## Polynomial Witness

Let $g(x)=q(x)-1$ on
$0\le x\le \Delta_R$, where $\Delta_R=\Delta_{P_3}$. The following degree-$11$
polynomial is the unique solution of
$$
g'(0)=k_\ast,
\qquad
g(\Delta_\alpha)=0,
\qquad
\int_0^{\Delta_\alpha}g(x)\,dx=0
$$
for $\alpha\in\{P_1,P_2,S_1,P_3\}$, together with the splice conditions
$$
g'(\Delta_R)=0,
\qquad
g''(\Delta_R)=0.
$$
Write
$$
g(x)=\sum_{n=1}^{11} c_n x^n.
$$

| $n$ | $c_n$ |
| ---: | ---: |
| 1 | $-1.007266373801958$ |
| 2 | $3.371767821347317$ |
| 3 | $-4.441250817346274$ |
| 4 | $3.199130159188313$ |
| 5 | $-1.430045898670482$ |
| 6 | $0.4200756219285191$ |
| 7 | $-0.08279980151329855$ |
| 8 | $0.01087316291856083$ |
| 9 | $-0.0009139989415534736$ |
| 10 | $0.00004454236798558835$ |
| 11 | $-0.0000009578637689499348$ |

Set
$$
q(x)=1+g(x)
\quad\text{for }0\le x\le\Delta_R,
$$
and splice to
$$
q(x)=1
\quad\text{for }x\ge\Delta_R.
$$
The splice is $C^2$ at $\Delta_R$. Numerically,
$$
\min_{[0,\Delta_R]} q(x)\approx0.9006255762,
\qquad
\max_{[0,\Delta_R]} q(x)\approx1.0474342353,
$$
so the witness is positive and defines a monotone angular time law over the
retained memory interval.

## Turn-Center Branch Rows

For this witness, the retained offsets satisfy
$$
H(\Delta_\alpha)-\Delta_\alpha\approx0,
\qquad
q(\Delta_\alpha)-1\approx0.
$$
Therefore the active turn-center Jacobians and force contributions agree with
the constant-rate retained chart at the four active offsets. The recomputed
turn-center root scan on $[1/2,4\pi]$ found the same active count,
$$
3\ \text{partner roots} + 1\ \text{self root},
$$
with no sampled extra roots after the $C^2$ splice. The active sums are
$$
B_r=-0.005994753659205029,
$$
$$
T_0=-0.007585821333186402,
$$
and hence
$$
\Gamma=\frac{B_r}{a_{\mathrm{A1}}-1}
=0.007531097561815363,
$$
$$
\frac{T_0}{\Gamma}
=-1.0072663739809324.
$$
This lands on the A1 local slope target. The sampled active Jacobian floor is
$$
\min |J|\approx1.59903358919.
$$

## Meaning

The A1 finite-memory problem has sharpened again. The previous
one-parameter laws failed because they tied the local slope to a global memory
shape too rigidly. The polynomial witness shows that the retained A1
turn-center equations are algebraically compatible with a positive nonconstant
time law once the inverse-rate memory is allowed to dip near the turn and
compensate farther back.

This does not certify a nonconstant A1 orbit. A real branch certificate would
still have to extend the time law away from $\theta=0$ and recompute active
roots, inactive gaps, source-speed Jacobians, finite-memory depth, and
root-transport rows on an interval. The advancement is narrower but important:
the next question is no longer whether the finite-memory equations can be
satisfied at the turn center. They can. The remaining burden is interval
transport of this retained-memory witness into a genuine branch chart.

## Promotion Decision

- Ontology: none added.
- Derivation/closure target: a constructive retained-root inverse-rate memory
  witness exists at the A1 turn center.
- Effective summary: simple one-parameter time laws fail, but a flexible
  finite-memory profile removes the pointwise algebraic obstruction.
- Speculation: no orbit stability or full isolated-binary closure is claimed.

Promotion decision. Promote only the scoped fact that a retained-root
turn-center witness exists and remains a branch-chart search target. Keep the
polynomial coefficients priority-only until an interval packet certifies the
profile family or its transported chart.
