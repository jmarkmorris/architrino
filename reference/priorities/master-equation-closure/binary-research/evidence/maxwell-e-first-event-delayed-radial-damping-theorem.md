# Delayed radial damping and a finite physical-acceleration moment

Status: derived prospective refinement of the independently assessed signed source-radius theorem. This source preserves the same Section 7 E equation, $K=c_f=1$, original complete mirror preparation and complete coefficient/root/source families. No target has used it. Independent parent assessment precedes implementation.

Use the fixed actual source $S_a$ and signed spatial transfer from the [signed source-radius theorem](maxwell-e-first-event-signed-source-radius-theorem.md). Put $\tau=T-S_a>0$, and use scalar intrinsic error $e_r=r_a-r_c$, $e_u=u_{r,a}-u_{r,c}$. Since the actual and comparison histories are $C^{2,1}$, $e_u$ is continuously differentiable. Exact integration gives

$$
\int_{S_a}^{T}e_u(q)dq=\tau e_u(T)-\int_{S_a}^{T}(q-S_a)e_u'(q)dq.
$$

Therefore the signed radial source contribution $-B_r\int e_u$ becomes $-B_r\tau e_u(T)+B_r\int(q-S_a)e_u'(q)dq$. The source-time delay is the actual delay, unchanged by the nominal translated-clock mean-value integration. Nominal comparison J remains the only jerk used in the spatial coefficient family; the new moment uses $e_u'$, which is a physical radial-acceleration difference plus centrifugal differences, not a derivative of physical A.

Write $\kappa$ for the existing effective signed radial/centrifugal coefficient, $d=B_r\tau$, and $C_h$ for the retained h-error coefficient. The radial error system has

$$
e_r'=e_u,\qquad e_u'=\kappa e_r-d e_u+C_h^{signed}e_h+f_r,
$$

with $|C_h^{signed}|\le C_h$. All direct source-V/source-A component and angular position contributions are retained in a nonnegative base remainder $F_0$. Its additional source moment is bounded by $|B_r|M$. The tangent h equation may retain the previously assessed full Ur-integral bound unchanged; this refinement does not assume cancellation in that equation.

For any positive cell-constant $\nu$, $Z^2=\nu^2 e_r^2+e_u^2$. The symmetric part of the scaled radial matrix is

$$
\begin{pmatrix}0&c\\c&-d\end{pmatrix},\qquad c=\frac{\nu+\kappa/\nu}{2}.
$$

Its largest eigenvalue is $(\sqrt{d^2+4c^2}-d)/2$. If $d\ge d_{min}$ and $|c|\le c_{max}$ throughout the full cell/coefficient family, monotonicity in $d$ and $|c|$ gives the rigorous logarithmic-norm bound

$$
\mu\le\frac{\sqrt{d_{min}^2+4c_{max}^2}-d_{min}}{2}.
$$

The formula remains valid when the signed $B_r$ enclosure includes negative values; no positive-damping premise is silently imposed. A positive lower delay and the complete signed source column enclose $d=B_r\tau$ by ordinary interval multiplication. Metric jumps retain the previously assessed $\max(1,\nu_{new}/\nu_{old})$ rule.

Let the receiving cell be $[L,U]$, with complete source bracket $S_{lo}\le S_a\le S_{hi}<L$. Suppose complete prior closed bins bound $|e_u'|$ by nonnegative densities $E_j$, and the retained physical past supplies $E_{past}$ on $[-6,0]$. Then

$$
M_{past}=\int_{S_{lo}}^{L}(q-S_{lo})E(q)dq
$$

encloses the completed part of every actual-source moment. It includes every partial endpoint interval and full interior interval. Neither errors nor source times need be monotone. The current-cell weight is exactly bounded by

$$
w=\int_L^U(q-S_{lo})dq=(U-L)(L-S_{lo})+\frac{(U-L)^2}{2}.
$$

If $W=\sup_{[L,U]}|e_u'|$ is finite, then $M\le M_{past}+wW$. Finiteness follows locally from the retained solution/root/physical-A domain and continuation hypothesis; it is not obtained by assuming the desired numerical bound. On a trial cylinder, set

$$
B=\sup|\kappa|R_{trial}+\sup|d|Z_{trial}+C_hH_{trial}+F_0+\sup|B_r|M_{past},\qquad \eta=\sup|B_r|w.
$$

The exact differential equation yields $W\le B+\eta W$. If $\eta<1$, the independently solved scalar inequality gives $W\le B/(1-\eta)$ and hence the valid radial forcing $F_r=F_0+\sup|B_r|(M_{past}+wB/(1-\eta))$. This uses the current receiving derivative through a finite positive inverse; source physical A remains exclusively in complete earlier bins. It does not introduce an actual jerk or change the equation.

With this $F_r$ and the new $\mu$, the existing nonnegative two-by-two Z/H whole-cell inverse applies. The tangent h row uses its existing effective signed position coefficient and full finite Ur-integral forcing. The final physical radial-A error must include the spatial damping input separately: it is bounded by $\sup|\Phi_r^{effective}|R+\sup|d|U_r+F_r$. The stored radial derivative error can be bounded more sharply from its own scalar equation by $\sup|\kappa|R+\sup|d|U_r+C_hH+F_r$. Stored bounds must enclose the independently reconstructed raw H-flow conversion before next-cell rounding, as in existing references.

For a retained older H row without this refinement, a valid completed density is $E_j=\sup|\kappa_j|R_j+C_{h,j}H_j+F_{r,j}$, using its own already assessed coefficient/forcing and complete whole-cell error bounds. These data are preserved in every old row. For the negative-time physical-past density, use its independently bounded physical radial-A difference and the exact centrifugal difference splitting: at fixed actual h, the radius coefficient is bounded by $3\sup|h_a|^2/r_{a,min}^4$; the h-difference coefficient is bounded by $(\sup|h_a|+\sup|h_c|)/r_{c,min}^3$. A complete past h-error follows from $r_{c,max}e_V+v_{c,max}e_X+e_Xe_V$. This reconstructs $E_{past}$ solely from complete physical past X/V/A and positive radius bounds.

Every coefficient family and its original Cartesian ball must still cover the fixed-offset nominal-clock interpolation. Every stored completed $E_j$ must bind its original row/state/source proof. The receiving moment cannot omit its current-cell term or use an endpoint derivative in place of a whole-cell bound. The scalar inverse denominator and Z/H inverse denominator must both be positive. These requirements, an incorrect mirrored source sign, a missing physical-past seam or invalid lognorm enclosure are explicit falsifiers. Failure of either sufficient inverse bound identifies a comparison-method obstruction only, not an actual incoming event.
