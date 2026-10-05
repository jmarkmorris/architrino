# Independent fixed k=10 resonance recipe

Status: frozen before target evaluation and before reading any coordinator resonance interval implementation. The selected equal-past/future canonical radial circle law has $K=c_f=1$. Fix $k=10$, $m=9/10$, and the search interval $x\in[1/4,2/3]$. The physical parameter is $\beta=x/\cos x<1$. The only mathematical input is the complete opposite Hermitian symbol in the [all-speed analytic reference](../analysis/alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-independent-analytic-reference.md), SHA-256 85a17a66c5c9c8e6812b90b21881a1600e2dd0274106784dce3b6cd7b39757da.

## Direct determinant and independent derivative

Define $c=\cos x$, $s=\sin x$, $\beta=x/c$, $D=1+\beta s$ and

$$
\alpha=(c^2D)^{-1}+\frac{\beta^2}{2D^2},\quad
\zeta=-\frac1{2c^2},\quad \kappa=\frac{\beta}{cD},
$$

$$
A=\alpha c^2+\kappa cs+\zeta s^2,\quad
B=\alpha s^2-\kappa cs+\zeta c^2,
$$

$$
U=\alpha c^2-\zeta s^2+\kappa cs,\quad
V=-\alpha s^2+\zeta c^2+\kappa cs,\quad
W=(\alpha+\zeta)cs-\frac{\kappa}{2}\cos(2x).
$$

For the fixed opposite sector, use the unregularized Hermitian entries directly:

$$
\begin{aligned}
a&=-m^2-1-A-U\cos(2mx)-m\kappa c^2\sin(2mx),\\
d&=-m^2-1-B-V\cos(2mx)+m\kappa s^2\sin(2mx),\\
f&=-2m+W\sin(2mx)-m\kappa cs\cos(2mx),\\
F&=ad-f^2,\qquad F_x=a_xd+ad_x-2ff_x.
\end{aligned}
$$

The evaluator differentiates these expressions using independently authored first-order interval jets in $x$. It does not evaluate or differentiate the regularized G expression used by the coordinator's intended subject. Jet rules are the product, quotient and trigonometric chain rules, with every operation outward-enclosed. The independently useful parameter identity is $\beta'=D/c>0$.

## Known controls before target

1. Exact rational conversion must enclose $1/3$. The reciprocal jet at $x=2$ is $(1/2,-1/4)$, and the square jet on $[1/4,2/3]$ encloses derivative $[1/2,4/3]$.
2. At the analytic endpoint $x=0$, the full entries are $a=-m^2-3$, $d=-m^2$, $f=-2m$. For $m=9/10$, $F=-1539/10000$ and $F_x=0$.
3. At $m=0$, the exact phase identity gives $F=F_x=0$ for every physical $x$, including the rational control $x=1/3$.
4. The jet derivative of $\sin^2x+\cos^2x$ encloses zero and its value encloses one at $x=1/3$. The computed derivative of $\beta$ encloses the separately evaluated $D/c$ identity.

These controls must pass and be retained before any fixed-$m$ search. A failure is an instrument failure, not a resonance conclusion.

## Finite target and what it can certify

First evaluate the two prescribed endpoints with interval arithmetic. If their determinant intervals have opposite strict signs, continuity gives at least one root. Otherwise retain the result as unresolved and do not silently change the case. Bisect with exact rational midpoints, replacing an endpoint only after its determinant interval has a strict sign; retain every sign evaluation. The predetermined stopping width is at most $2^{-30}$. An undecidable midpoint is retained rather than assigned a floating sign.

Evaluate $F_x$ and $d$ across the entire resulting closed bracket, and outward-enclose $\beta$ there. A strict derivative sign proves a unique simple fixed-$m$ root in that bracket. It does not prove uniqueness over the original search interval unless a separate complete derivative cover is supplied. The separately admitted all-speed theorem already says that each physical $\beta$ has only one positive opposite frequency.

If $d<0$ on the bracket, the Hermitian null vector $(d,if)$ has a nonzero radial coefficient at its determinant zero. Since $\beta'=D/c>0$, a nonzero $F_x$ is exactly the required nonzero fixed-frequency parameter derivative $F_\beta$. The selected $k=10$ kernel then satisfies the finite-block transversality and nonzero radial coefficient needed by the independently assessed C1 multiple-period existence argument. This can instantiate that local theorem without claiming an explicit nonlinear amplitude radius.

No target outcome is asserted in this recipe. Falsifiers are an incorrect full symbol or jet rule, inward rounding, a sign assigned to an interval containing zero, an uncovered final bracket, loss of the physical speed margin, or failure of the independently admitted frequency/functional-analytic premises. No stability, minimal period, branch uniqueness or nonlinear amplitude bound is claimed.
