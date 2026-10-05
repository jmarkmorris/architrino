# Finite-width circle search beyond the low-speed exclusion

## Outcome and mathematical boundary

Claim grade: derived for the small-radius exclusion below; measured for the bounded numerical search. For each of the four fixed triangular reception/core laws, a complete antipodal circle with $\beta\ge\pi/2$ must have radius $R>1/512$. On the remaining assigned rectangle, the frozen diagnostic grid and bounded searches found no simultaneously balanced circle. This numerical non-finding does not exclude circles between sampled points, elsewhere in the rectangle or beyond it. No candidate was available for an independent existence enclosure, and the unrestricted existence question remains unresolved.

The selected equation is [Section 11's finite-width reception law](../../equation-variants/manuscript.md#11-finite-width-wake-reception), with $K_{ij}=c_f=1$, $h\in\{1/16,1/32\}$ and $\rho\in\{1/32,1/64\}$. The self sign is positive and the opposite-polarity partner sign negative. These are four fixed equations, not fitted coefficients. The complete all-time circle is posed as a boundary history; no subfield incoming history, causal capture, stability or later fate is claimed. The [protocol](alternatives-screen-2026-10-05-width-circle-protocol.md) was frozen before targets, and the [new numerical instrument](../evidence/alternatives-screen-2026-10-05-width-circle-search.py) passed known controls before evaluating the grid.

## Full source-age integral and necessary radial inequality

At a receiver $(R,0)$ on the positive member, write $\omega=\beta/R$, $\theta=\omega\tau$, and use the actual delayed displacements

$$
d_s=R(1-\cos\theta,\sin\theta),\qquad
d_p=R(1+\cos\theta,-\sin\theta).
$$

Their ranges are $r_s=2R|\sin(\theta/2)|$ and $r_p=2R|\cos(\theta/2)|$. Including polarity, the complete acceleration is

$$
(A_r,A_\theta)=\int_0^{2R+h}\left[
\frac{d_s\,\delta_h(r_s-\tau)}{(r_s^2+\rho^2)^{3/2}}
-\frac{d_p\,\delta_h(r_p-\tau)}{(r_p^2+\rho^2)^{3/2}}
\right]d\tau,
\qquad \delta_h(z)=\frac1h\left(1-\frac{|z|}h\right)_+.
$$

The integral is the full past input: for every older age, $r_j\le2R$ gives $\tau-r_j>h$, so its window is exactly zero. The required circular acceleration is $(-\beta^2/R,0)$. Thus a solution requires both $A_\theta=0$ and $RA_r+\beta^2=0$; inward radial input alone or a tangent zero alone is insufficient.

Every self radial contribution is nonnegative because $1-\cos\theta\ge0$. The partner radial numerator is at most $2R$, its core denominator at least $\rho^3$, and the triangular window at most $1/h$. Its entire source-age support has length $2R+h$. Consequently every balanced circle must satisfy

$$
\frac{\beta^2}{R}=-A_r
\le\frac{2R(2R+h)}{h\rho^3},
\qquad
\beta^2\le\frac{2R^2}{\rho^3}\left(1+\frac{2R}{h}\right).
$$

For $R\le1/512$, the largest right side among all four laws occurs at $R=1/512$, $h=1/32$, $\rho=1/64$, where it equals $9/4$. Since $\beta\ge\pi/2$ implies $\beta^2\ge\pi^2/4>9/4$, the complete small-radius region is excluded analytically. This proof holds for every speed above the lower threshold, including speeds beyond the diagnostic upper bound eight. It uses a deliberately conservative partner upper bound and retains the nonnegative self channel.

The previous [complete circle exclusion](alternatives-screen-2026-10-05-binary.md#15-finite-width-circle-exclusion-without-a-small-width-assumption) covers $0<\beta\le\pi/2$ by positive tangent. The new radial inequality adds a different excluded region. Neither result alone closes the remaining higher-speed, larger-radius problem.

## Complete integration partition and known controls

For each point, the integrator splits the full phase interval $[0,2\beta+\beta h/R]$ at every chord cusp, every stationary point of $g_j(\theta)=r_j(\theta)-R\theta/\beta$, and every crossing of $g_j=-h,0,h$. Self lobes begin at $a=2\pi k$ and partner lobes at $a=(2k-1)\pi$. On a lobe, $r_j=2R\sin((\theta-a)/2)$, so $g_j''=-r_j/4<0$; for $\beta>1$ its unique stationary point is $a+2\arccos(1/\beta)$. These analytic splits produce monotone intervals and thereby enumerate all possible window support and central corners. The two channel partitions are combined before integration. Chord cusps, touching stationary endpoints and the whole age support remain part of the inventory.

The numerical level roots use bracketed floating arithmetic. Adaptive Gauss–Kronrod quadrature evaluates the four signed components—self radial/tangent and partner radial/tangent—together on the complete partition. This is a reproducible floating diagnostic with estimated error; it is not outward-rounded interval integration. Analytical completeness of the partition design does not certify floating root locations or quadrature estimates.

The known-control receipt passed at 17:30:20 UTC on 2026-10-05, before targets. For each law it checks the stationary softened radial response at separation $1/4$, the zero-speed circle's exact zero self and tangent contributions, and affine self motion at speeds $1/2$ and $2$ against the independently integrated closed form in [the frozen binary source](alternatives-screen-2026-10-05-binary.md#64-exact-affine-self-response). It also checks the monotone $\beta=1,R=1$ circle's analytically known one nonendpoint self support crossing, three partner levels and positive tangent. The retained errors are below $2.3\times10^{-13}$ for the affine closed-form comparisons and below $1.8\times10^{-15}$ for the stationary and zero-speed comparisons. These controls test normalization, polarity and self inclusion without asserting target correctness from a replay of target output.

## Bounded measurements

The grid uses 33 linearly spaced speeds in $[\pi/2,8]$ and 33 geometrically spaced radii in $[2^{-9},2]$, with 1,089 points per fixed law. The assigned interval $[2^{-16},2^{-9}]$ was already excluded by the preceding inequality. Requested quadrature tolerance is $2\times10^{-9}$. The complete grid receipt finished at 17:31:02 UTC after 26.133 seconds and reports no quadrature failure. The following values are measurements from that receipt, extracted with `jq`; they are pointwise extrema over the stated nodes, not bounds on parameter cells.

| Width $h$ | Core $\rho$ | Smallest sampled $RA_r+\beta^2$ | Sampled tangent range |
| --- | --- | ---: | ---: |
| $1/16$ | $1/32$ | $2.4676065504$ | $[0.4741102552,252.3237171]$ |
| $1/16$ | $1/64$ | $2.4689419763$ | $[3.6672626055,608.1841127]$ |
| $1/32$ | $1/32$ | $2.4682229008$ | $[-5.0236246502,359.0566521]$ |
| $1/32$ | $1/64$ | $2.4735646044$ | $[7.0257845959,1010.2936843]$ |

All sampled radial balance residuals are positive. The third law has negative tangent at some sampled points, so extrapolating the earlier positive-tangent proof into a general higher-speed positivity claim would conflict with this diagnostic evidence. At its most negative sampled tangent, $\beta\simeq3.3790098599$ and $R\simeq0.03263355570$, the radial residual is still about $7.94656$; this point is far from simultaneous balance. The sign remains a measured value, without an independently certified enclosure.

The prescribed root search found no grid cell whose corners straddled zero in both residual components, because every radial residual was positive. It therefore used the 24 smallest-residual grid nodes per law as seeds for bounded least-squares searches in $(\beta,\log R)$. The final evaluations used requested quadrature tolerance $2\times10^{-12}$. The search receipt finished at 17:31:40 UTC after 19.769 seconds, with no point satisfying the candidate threshold $\max(|R^2A_\theta|,|RA_r+\beta^2|)<10^{-7}$. Final quadratures report no failure. Three optimizer attempts for $h=1/16,\rho=1/64$ did not report successful convergence; they are retained as failures, not converted into exclusion evidence. The other attempts also failed to produce a balance, despite meeting their optimizer stopping conditions.

The seed rule favors the smallest-residual portion of the grid and is not a coverage theorem for nonlinear root basins. In particular the searches mostly approach the lower-speed, small-radius boundary. Optimizer convergence to a nonzero residual proves neither absence of other roots nor optimality over the rectangle. The positive grid radial residual suggests that a complete radial exclusion might be worth attempting, but such an exclusion remains an inference requiring a continuous parameter-box proof.

## Reproduction, limits and falsifiers

The successful known controls and all point/attempt records are retained as local provenance under `.local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05-width-circle-`, ending in `known.json`, `grid.json` and `search.json`. The tracked source is the durable reproducer. In a fresh disjoint receipt destination, run these commands in order:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-width-circle-search.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-width-circle-search.py grid
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-width-circle-search.py search
```

The source refuses to overwrite receipts and checks the frozen protocol hash. A rerun must therefore supply disjoint output names without changing the mathematical subject and reference together. The source and protocol identities were measured by `shasum -a 256`:

| Source | SHA-256 |
| --- | --- |
| Frozen protocol | `43cba14d8afcc39033e21b45fc4ecfb852d4191867273ba6d005fd0703c2b03e` |
| Diagnostic instrument | `4b8a3231a6f55054db30aa6c4d3801c3b955df2d7a3319b2865dce5e7554d8b1` |

The remaining blocker to a stronger result is exact: there is neither a simultaneous near-zero candidate to enclose nor an outward-rounded integral enclosure over the continuum of remaining parameter boxes. No separately authored existence reference was launched in the absence of a candidate. A certified simultaneous zero would settle existence; a complete interval lower bound for $RA_r+\beta^2$ over the remaining rectangle would settle bounded nonexistence. Neither has been supplied here.

The analytic exclusion is falsified by a balanced circle with $\beta\ge\pi/2$, $R\le1/512$, or by a violation of its support or sign inequalities. The diagnostic results are falsified by an independent complete integral evaluation contradicting the retained values beyond their reported numerical uncertainty; a zero between nodes would not falsify the reported point measurements, but would refute any unsupported extension of them into an exclusion. Missing source lobes or window corners invalidate the numerical evaluation. All complete-source formulas, coefficients and claim boundaries are explicit above.

Only the new protocol, diagnostic source and this analysis were written for the assignment. Earlier references, the nonlinear time-symmetric subject, shared owners and all law coefficients were preserved. Every launched foreground computation exited; no owned process remains. No perturbation or stability calculation was performed.
