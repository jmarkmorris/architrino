# Complete-history comparison after the E velocity transformation

Derived prospective error theorem for the unchanged Section 7 E mirror binary on an incoming ordinary-root domain. It uses the [exact velocity transformation](maxwell-e-first-event-neutral-velocity-transform-theorem.md), $p=u+q$ and $p'=H:=G+L_0+(n\cdot u)Ba$. No actual history, residual, root or event rule changes. All physical source position, velocity and acceleration errors remain explicit. Numerical effectiveness is unresolved.

At each receiving time align the actual receiving radial ray to the comparison ray by a single constant rotation for the field comparison. Let $e_r$ bound radius difference and $e_p$ bound the Euclidean norm of the difference of intrinsic radial/tangential p components. Let comparison radius be at least $r_c>0$, actual radius at least $r_a>0$, comparison physical speed at most $b_c$, and comparison p norm at most $P_c$. Complete closed source inventories give radius, intrinsic physical velocity-norm and intrinsic physical acceleration-norm errors $s_r,s_v,s_a$, nominal source norms $R_s,V_s,A_s$, and a finite source-to-receiver angular difference bound $\Psi$. Both closed seam cells, all intervening nonmonotone cells and the finite negative-time support are included. Every source window is strictly earlier than the receiving left face.

The following coefficient bounds must be independently supplied over the entire mean-value/root families, not evaluated at a nominal point: $C_q$ for the spatial derivative of q along the nominal source clock, $V_q$ for its fixed-root source-velocity derivative, $C_H$ for H's nominal-clock spatial derivative, $U_H$ for its receiving-velocity derivative, and $V_H,A_H$ for fixed-root source V/A derivatives. All norms use the same physical frames. The transformed direct source-acceleration matrix is exactly $(n\cdot u)B$; $A_H$ must bound this matrix over the full relevant source-offset family. Suppression by a pointwise nominal projection cannot enter a tube coefficient. Nominal-clock q derivatives require comparison source A; nominal-clock H derivatives require comparison source J. Neither permits an actual-J premise.

To construct those families, first freeze the actual transmitter position offset at the completed actual root. Translate the nominal source path by that fixed offset; its root at the actual receiving position is the same actual source time. Replace actual source V/A by nominal V/A at that fixed root, using the corresponding full offset families. Vary the receiving position minus the frozen source-position offset along the nominal-clock family, then receiving velocity. Every intermediate source/root time must fit the retained complete guard; all R/D floors remain positive. This is the same sequential root comparison used by the independently assessed original E coefficients, applied to the new exact q/H fields. It does not assume source jerk of the actual solution.

The existing physical source-angle conversion and mean-value theorem give

$$
f_q=C_q(s_r+R_s\Psi)+V_q(s_v+V_s\Psi),\qquad |\delta q|\leq C_qe_r+f_q.
$$

Thus physical receiving velocity error satisfies

$$
e_u\leq e_p+C_qe_r+f_q.
$$

The unchanged comparison's independently admitted original E residual is also its transformed residual. With its norm bounded by $\delta$, set

$$
f_H=\delta+C_H(s_r+R_s\Psi)+V_H(s_v+V_s\Psi)+A_H(s_a+A_s\Psi).
$$

Then the full field comparison is

$$
|\delta H|\leq C_He_r+U_He_u+f_H.
$$

For the receiving angular rate, direct tangential projection and radius division give

$$
|\omega_a-\omega_c|\leq\frac{e_u}{r_a}+\frac{b_ce_r}{r_ar_c}.
$$

In the respective intrinsic frames the p equation includes a skew rotation term $\omega Jp$. Subtracting the two equations gives $\delta H+\omega_aJ\delta p+(\omega_a-\omega_c)Jp_c$. The inner product of $\delta p$ with $J\delta p$ is zero, so the current intrinsic rotation contributes no positive norm growth. Using upper Dini derivatives at zero error as well as ordinary norm derivatives elsewhere yields

$$
D^+ e_r\leq C_qe_r+e_p+f_q,
$$

$$
D^+e_p\leq\left(C_H+L C_q+\frac{P_cb_c}{r_ar_c}\right)e_r+L e_p+f_H+L f_q,\qquad L=U_H+\frac{P_c}{r_a}.
$$

This supplies a nonnegative two-component comparison matrix and forcing. On one prescribed closed trial cylinder, freeze whole-cell coefficient/forcing bounds and require the actual physical velocity error conversion to fit its prescribed receiver trial. The complete source/angle inventories depend on already completed whole cells plus the current trial; all must be retained. If $I-dt\,M$ has nonnegative inverse with positive determinant and diagonals, the complete-cell supremum inequalities imply $w\leq(I-dt\,M)^{-1}(w_0+dt\,f)$. Strict improvement over both prescribed trials, positive clearance and complete root/source guards are required before acceptance. The formula is a sufficient majorant, not an exact flow or a guaranteed sharp estimate.

Actual physical acceleration error is reconstructed separately through the original E response, including its full delayed source acceleration. Neither $e_p$ nor transformed residual alone can serve as a physical velocity or acceleration error. The physical velocity and acceleration components/norms are stored for every completed source bin, and their angular-rate bounds rebuild the finite angular primitive. A first-unit contradiction uses only the reconstructed physical speed lower bound and the independently assessed stopping/continuation theorem.

An already admitted finite physical prefix may initialize this comparison only by separately enclosing q on its complete actual/comparison source windows and adding the physical velocity error to the full q error. That operation changes the mathematical variable, not the physical wake or launch. All old source X/V/A inventories remain; the error theorem does not replace them with endpoint p values. A comparison residual can carry over only under literal same complete curve/root binding, by the independently assessed exact residual identity.

Falsifiers are a missing mean-value family or physical source input, source-offset cancellation used on an incomplete clock family, pointwise projection used as a coefficient bound, omitted receiving skew/rate difference, nonpositive radius/clock/inverse, omitted q conversion, an actual-J assumption, or a physical speed criterion applied directly to p. No target propagation or actual event is admitted by this theorem alone. Retaining signed current blocks before scalar norms is a possible future sharpening; it requires its own proof.
