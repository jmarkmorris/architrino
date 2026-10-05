# Assessment of exact fixed-memory Cartesian scattering tails

**Disposition: derived asymptotic theorem admitted, 2026-10-05.** The [independent subject](alternatives-screen-2026-10-05-memory-cartesian-tail-independent.md) and the [coordinator reference](alternatives-screen-2026-10-05-memory-cartesian-tail-coordinator-reference.md), frozen before receipt of the subject, independently derive the exact terminal delay coefficient, the memory response factor, logarithmic positional departure from straight motion and finite spherical variation. The coordinator subsequently reconstructed the subject's stronger weighted remainder and continuity of logarithm-renormalized offsets. The [complete-history scattering assessment](alternatives-screen-2026-10-05-memory-scattering-robustness-adjudication.md) supplies all global existence, strict speed and positive separation premises.

The equation remains $A_i+k*A_i=F_i$, $k(\theta)=1-\theta$ on $[0,1]$, and $F_i=-n_i/(R_i^2D_i)$, with $K=c_f=\lambda=\tau=1$. For the distinct terminal velocities $U_i$, the actual source clock advances and the unique terminal delay ratio obeys

$$
\rho_i=|U_i-U_j+\rho_iU_j|,\qquad 0<\rho_i<1.
$$

The scalar residual is strictly increasing and changes sign between zero and one. Put $n_i^*=(U_i-U_j+\rho_iU_j)/\rho_i$ and

$$
f_i=-\frac{n_i^*}{\rho_i^2(1-n_i^*\cdot U_j)}\ne0.
$$

Then $T^2F_i\to f_i$. Finite iteration of the exact convolution gives alternating kernel powers of masses $2^{-j}$. Each fixed convolution has the same scaled late input limit times its mass. The admitted $A_i=O(T^{-2})$ bound controls the final unexpanded term and the remaining geometric tail. Taking the finite cutoff and late-time limits in this controlled order yields $T^2A_i\to a_i=2f_i/3$. The worker's equivalent diagonal choice $N=\lfloor T/2\rfloor$ keeps every sampled time above $T/2$ and has the same uniform geometric bound. No local $2/3$ law is inserted as a premise, and no old acceleration transient is deleted.

The stronger remainder is checked directly. The prior global tails $X_i=U_iT+O(\log T)$ and $V_i=U_i+O(T^{-1})$ give a root residual of $O(\log T)$ at trial source $(1-\rho_i)T$. Root monotonicity then gives $R_i=\rho_iT+O(\log T)$, followed by

$$
F_i=\frac{f_i}{T^2}+O(\log T/T^3).
$$

Subtract $a_i/T^2$ from the actual acceleration in the exact convolution. Its new input is $O(\log T/T^3)$ because $(1+\int k)a_i=f_i$. On sufficiently late windows, the weight $w=T^3/\log T$ has convolution norm at most $\tfrac12(8/7)^3=256/343<1$. The finite initial weighted error is retained. A running-supremum bound proves

$$
A_i=\frac{a_i}{T^2}+O(\log T/T^3),\qquad
V_i=U_i-\frac{a_i}{T}+O(\log T/T^2).
$$

The remaining velocity error is integrable after adding $a_i/T$, so

$$
X_i=U_iT-a_i\log T+b_i+O(\log T/T).
$$

The finite vectors $b_i$ are logarithm-renormalized offsets in the selected unit time. Their continuity follows from finite-prefix continuity, continuous terminal velocity and delay-ratio maps, and locally uniform remainder bounds. The latter use common outgoing speed/separation margins, positive bounds on $\rho_i$ and $1-\rho_i$, and bounded finite initial weighted data. Splitting the offset integral at a fixed large time proves continuity. This is stronger than the coordinator reference's original leading-limit claim and is admitted only after this separate reconstruction.

Because $a_i\ne0$, each unrenormalized individual affine offset fails to exist. A relative logarithmic coefficient may cancel, so no universal failure of a relative affine offset is asserted. The actual identity $(Q\times Q')'=Q\times(A_1-A_2)$ for $Q=X_1-X_2$ gives $Q\times Q'=O(\log T)$ and an integrable spherical direction derivative $O(\log T/T^2)$. It includes the memory acceleration and assumes no conserved angular momentum or plane. Individual position directions have only a late-tail claim unless their finite prefix avoids the chosen origin.

The result applies to the admitted outgoing neighborhoods, including those of every positive-speed member of the original fixed-memory preparation. It says nothing about the zero-speed branch, arbitrary incoming histories, unit-speed continuation or binding. Falsifiers are a wrong terminal root ratio, failure of the geometric convolution bound, an incomplete delayed-input remainder, loss of the strict weighted contraction, or nonuniform tail constants invalidating offset continuity.

Frozen source identities are worker `51379cf55ac35536653e7434af6c808dcf99552858859f709a60f6be7ca6ef35` and prior coordinator reference `e14d53e0e215bcbd2cd8039e4c10ba89ff6c284a5098cc3b2bf8eaa4f3f80a70`. No numerical simulation or fitted response is evidence for these coefficients. Frozen sources remain unchanged; this assessment records the stronger admitted scope and the order of independent checking.
