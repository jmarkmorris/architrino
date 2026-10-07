# Physical companion bounds for the Cartesian transverse error

**Status: derived subject refinement; independent admission required before receiving-target use.** The [Cartesian transverse proof](authorized-cases-ten-hour-a-cartesian-transverse-proof.md) supplies a norm bound for the exact transformed coordinate on a complete physical X/V trial. This note retains the original E acceleration error as an additional bound on physical position and velocity. It does not change the equation or remove delayed source acceleration.

## Conditional physical acceleration bound

On a frozen receiving cell $[L,L+h]$, let $X_\star,V_\star$ be physical Cartesian error trials. Assume complete ordinary roots, strict earlier physical source support, positive radius/range and the required field/clock charts throughout those trials. Let $s_X,s_V,s_A$ bound the original physical Cartesian source errors on every closed intersecting source bin, including the literal past where applicable. The original E comparison coefficients give

$$
|\delta a(t)|\le C_x(|\xi(t)|+s_X)+H_v s_V+B s_A+\delta,
$$

where delta bounds the original comparison residual. The current receiving-velocity coefficient is exactly zero for E. The acceleration coefficient B and source allowance sA are retained. All constants are complete interval-family upper bounds and nonnegative.

Set $F_a=C_xs_X+H_vs_V+Bs_A+\delta$ and $A_\star=C_xX_\star+F_a$. If the old endpoint bounds are $X_0,V_0$, the fundamental theorem of calculus gives throughout the cell

$$
|\delta u(L+\tau)|\le V_0+\tau A_\star,
\qquad
|\xi(L+\tau)|\le X_0+\tau V_0+\frac{\tau^2}{2}A_\star,
\quad0\le\tau\le h.
$$

Thus the whole-cell bounds $V_I=V_0+hA_\star$ and $X_I=X_0+hV_0+h^2A_\star/2$ are valid while the trial is occupied. They do not require solving a scalar inverse. A failure to fit the trial is a sufficient-bound failure only.

## Intersection with the transformed norm

For the same full physical trial, let the independently proved four-dimensional logarithmic-norm coefficient be mu and forcing be f. The exact scalar majorant is $y(\tau)=e^{\mu\tau}W_0+\phi_\mu(\tau)f$, with $\phi_\mu(\tau)=\int_0^\tau e^{\mu s}\,ds$. Its derivative is $e^{\mu\tau}(\mu W_0+f)$, which has constant sign. Therefore the whole-cell transformed bound is the larger of its initial and endpoint values. With outward endpoint bounds this remains valid:

$$
W_{whole}=\max(W_0,E_hW_0+P_hf),\qquad
E_h\ge e^{\mu h},\quad P_h\ge\phi_\mu(h).
$$

The scalar factors are independently enclosed. Their endpoint upper bound is enough because monotonicity refers to the exact constant-coefficient scalar solution, not to a guessed monotonicity of the actual error norm.

Let $b_x\ge\|EB_q\|$, $b_w\ge\|E\|$, and $b_f\ge\|E\|f_q$ on the same trial. The transformed physical conversion gives

$$
X_N=W_{whole}/\nu,\qquad
V_N=b_xX_\star+b_wW_{whole}+b_f.
$$

Both comparisons describe the same actual solution and same physical frame, so $X_{new}=\min(X_I,X_N)$ and $V_{new}=\min(V_I,V_N)$ are valid whole-cell physical bounds. One may substitute the already established Xnew for Xstar in the acceleration and velocity reconstructions and repeat this monotone sharpening a fixed finite number of times. Every substitution uses a previously proved bound; no circular equality is assumed.

Alternatively the integrated transformed-position inverse from the prior proof may be added as a third X upper bound when its denominator is positive. A failed inverse cannot delete the other valid bounds.

## Bootstrap closure and stored state

The underlying physical equation is a local ordinary receiving problem on a strictly older source support, with the complete original history supplied. While a solution remains within the frozen X/V trial, the preceding estimates hold. If $X_{new}<X_\star$ and $V_{new}<V_\star$, continuity rules out its first contact with either trial boundary. The independently proved positive root/range/radius and subfield margins rule out the corresponding domain exit within this cell. This is the usual strict interval continuation argument; it requires the original local existence and complete root theorem as an explicit inherited premise.

The transverse coefficients here are constructed entirely over physical X/V and source trials. There is no transformed-p interpolation or W-dependent denominator domain. Accordingly no independent W trial is needed for this particular bootstrap: finite W, strict X/V improvement and all physical/source chart conditions suffice. An optional W trial may be retained as a computational stopping budget, but its failure alone cannot invalidate otherwise closed physical X/V conditions. If a future implementation introduces any W-dependent source support or coordinate box, the omitted W condition would have to be restored and proved.

A completed row must store both the endpoint transformed norm and its whole-cell norm, exact metric, Cartesian X/V/A whole-cell bounds, exact receiving faces, all source indices/past participation, original E defect/coefficients, root/chart certificates, four-dimensional symmetric matrix/PSD certificate, forcing, scalar factors and strict physical slacks. Original physical acceleration can be stored as $C_xX_{new}+F_a$ after Xnew is established. The next cell's endpoint X/V may conservatively reuse the completed whole-cell bounds; this is an upper-bound transfer, not a new physical release.

## Known controls and falsifiers

A direct integration control has X0=1, V0=2, Astar=3 and h=1/10, giving VI=23/10 and XI=243/200 exactly. A constant transformed scalar comparison with mu=−1,W0=2,f=1 decreases toward1; its whole bound is2 even though its endpoint is smaller. With mu=−1,W0=1,f=2 it increases, and the endpoint bounds the whole cell. These are mathematical controls, not physical configurations or stability verdicts.

Falsifiers are an omitted source-A term, residual multiplier omitted from the transverse forcing, coefficients evaluated on a smaller physical trial than the bootstrap uses, mixing distinct physical histories or frames in the minimum, substituting an unproved narrowed X, missing closed source bins, failure of either strict physical inequality, or a hidden W-dependent domain. The unchanged original preparation, strongest old prefix and every earlier failed bound remain preserved.
