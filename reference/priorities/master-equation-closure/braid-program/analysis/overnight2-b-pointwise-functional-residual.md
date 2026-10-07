# A pointwise full-equation residual in the smooth excluded neighborhood

## Derived subject statement

This analytical subject is pending independent review. A radial equation at one reception bounds the proposed common scale directly, so the accepted tangential margin can give a pointwise residual obstruction without integrating over a cycle or assuming exactness on any interval.

Keep the canonical coefficient-one equation with wake speed one, all ordinary positive-delay partner and self roots, and absolute source divisors. Fix

$$
H\in[1/20,1/9],\qquad
\beta\in[73/40,457/250],\qquad
\kappa\in[1/2,3],\qquad R>0.
$$

Let $\tau=t/R$ and define complete $C^2$ normalized paths

$$
x_j(\tau)=\bigl(\rho(\tau)\cos[\beta\tau+p(\tau)+j\pi/3],
\rho(\tau)\sin[\beta\tau+p(\tau)+j\pi/3],
(-1)^jz(\tau)\bigr),\qquad X_j(t)=Rx_j(t/R).
$$

Here $p$ is a globally chosen real phase correction. The actual profiles may be aperiodic. The reference functions are

$$
\rho_0=1,\qquad p_0=0,\qquad
z_0(\tau)=H[\cos(\kappa\tau)-\tfrac18\sin(3\kappa\tau)].
$$

For each fixed reference parameter triple, the independently accepted [torque-cover audit](overnight2-b-independent-superwake-torque-cover.md) supplies a deciding reference phase

$$
\phi_*\in\{0,\pi/2,\pi/4,3\pi/4\}
$$

with $|A_t^0|\ge m>1/200$. The phase can depend on the parameter triple; it is not one common phase chosen for the whole domain. Choose any reception $\tau_*$ satisfying $\kappa\tau_*=\phi_*$ modulo $2\pi$.

Assume the nine scalar bounds

$$
|\rho-1|,\ |\dot\rho|,\ |\ddot\rho|,\ |p|,\ |\dot p|,\ |\ddot p|,
\ |z-z_0|,\ |\dot z-\dot z_0|,\ |\ddot z-\ddot z_0|\le\eta,
\qquad
0\le\eta\le\frac1{30000000000}
$$

hold throughout the complete past $\tau\le\tau_*$. No norm or exactness requirement is imposed after that reception. Dots denote normalized-time derivatives.

Let $A_0(\tau_*)$ be the complete dimensionless canonical acceleration and let

$$
E_0(\tau_*)=R\ddot x_0(\tau_*)-A_0(\tau_*)
$$

be the normalized residual. Then the proposed pointwise bound is

$$
\boxed{
|E_0(\tau_*)|
\ge\frac{m-73003000\eta}{1+5\eta/3}
>\frac1{400}.
}
$$

Thus the prescribed history cannot satisfy the complete canonical equation even at that deciding reception, for any positive proposed scale. The physical acceleration residual is $E_0/R^2$; no scale-independent physical error is claimed.

## Accepted causal estimates

The [independent functional chart](overnight2-b-independent-superwake-norm-chart.md) and [independent functional-transfer proof](overnight2-b-independent-superwake-functional-transfer.md) give eight complete ordinary roots, with source counts $(1,3,1,1,1,1)$ and uniform bounds

$$
7/20<d<2,\qquad |D|>1/20.
$$

They also give

$$
|A_0|\le M:=\frac{64000}{49},\qquad
|A_t-A_t^0|\le73000000\eta,\qquad
|L_t|\le5\eta,
$$

where $L_t$ is the actual normalized prescribed tangential acceleration. The two acceleration components use their respective actual and reference tangent directions. At $\eta=0$ the difference vanishes exactly. The strict estimates in the accepted proof imply these weak bounds.

The transfer follows each root through a straight Cartesian interpolation of the two complete prescribed histories. Its geometric admission, source-time shift, velocity and acceleration estimates refer only to the reception and its past. All source times are earlier than $\tau_*$. Therefore the complete-past restriction in this statement supplies every bound used by that proof; no future continuation within the neighborhood is required. The [accepted finite-duration review](overnight2-b-independent-superwake-finite-duration.md) separately verifies this causal restriction.

At $\tau_*$, the reference scalar geometry is the one certified by its deciding phase. The possible nonperiodicity of the actual profiles does not change the reference margin or the causal transfer estimate.

## The radial demand bounds scale at the same reception

In the actual radial and tangential frame,

$$
L_r=\ddot\rho-\rho(\beta+\dot p)^2,\qquad
L_t=2\dot\rho(\beta+\dot p)+\rho\ddot p.
$$

The second expression gives the accepted $5\eta$ bound. For the first, use the weaker admissible bound $\eta\le1/2000$. Since $\rho\ge1999/2000$ and $\beta+\dot p\ge3649/2000>0$,

$$
-L_r\ge
\frac{1999}{2000}\left(\frac{3649}{2000}\right)^2-\frac1{2000}
=\frac{26613086799}{8000000000}>3.
$$

This bound is local at the deciding reception. It does not require an integral identity, a periodic actual profile, exactness at another time or a uniform future bound.

Set $\epsilon=|E_0(\tau_*)|$. Its actual radial component is $E_r=R L_r-A_r$. The radial equation with residual gives

$$
3R\le R|L_r|
=|A_r+E_r|
\le M+\epsilon,
\qquad
R\le\frac{M+\epsilon}{3}.
$$

This estimate applies to any prescribed $R>0$ and its actual residual, without first assuming that residual is small or zero. It is the full equation's radial component that prevents a large scale from compensating an arbitrarily small tangential kinematic demand.

## The tangential margin then forces a residual

Projecting onto the actual tangent gives

$$
\epsilon\ge|R L_t-A_t|
\ge m-73000000\eta-5R\eta.
$$

Use the radial scale bound at the same reception:

$$
\epsilon\ge
m-\left(73000000+\frac{5M}{3}\right)\eta
-\frac53\eta\epsilon.
$$

The coefficient is strictly less than $73003000$, because $M=64000/49<1307$ and $5(1307)/3<3000$. Rearranging yields

$$
\epsilon\ge\frac{m-73003000\eta}{1+5\eta/3}.
$$

The numerator decreases and the positive denominator increases with $\eta$ on the allowed range, where the numerator remains positive. The endpoint arithmetic using $m>1/200$ is

$$
\frac1{200}-\frac{73003000}{30000000000}
>
\frac1{400}\left(1+\frac5{90000000000}\right),
$$

equivalently

$$
90000000000>87603600005.
$$

Hence the residual is strictly greater than $1/400$. When $\eta=0$, the reference tangential demand is zero and the direct bound is $\epsilon\ge m>1/200$.

The proof uses one reception throughout. In particular, its scale estimate does not borrow small residuals from other times.

## Consequences and verification boundary

If the complete-past norms hold through the end of any interval of reference-cycle length $2\pi/\kappa$, that interval contains a deciding reception. The one-cycle supremum result follows as a corollary, but the present conclusion locates the obstruction at each recurrence of a certified reference phase. It does not claim that the residual is bounded below at every phase.

The accepted eight-root geometry and torque margin remain the numerical premises, including their shared interval-library assumptions. The new result is an analytical use of the radial demand; it requires no numerical target. Independent review must verify the exact radial lower bound, causal use of the earlier sensitivity estimates, residual scaling, both component projections, the algebraic rearrangement and the final rational comparison.

A missing root, false accepted torque margin or sensitivity bound, a radial demand of magnitude at most three within the displayed scalar bounds, a sign or scale error in the component equations, or a complete admissible history with residual at most $1/400$ at its certified deciding phase would refute the relevant conclusion. A history violating the complete-past norms or evaluated at another phase does not test this statement.

No existence, later-fate, stability or singular-continuation claim is added. The tiny neighborhood size is a sufficient mathematical tolerance, not a measured physical boundary. Frozen previous subjects and reports remain unchanged; disposition belongs in the [current research account](overnight2-b-followup-and-research-2026-10-07.md), with shared integration owned by the coordinator.
