# Fixed-metric Cartesian transverse norm cannot reduce the inherited velocity bound

**Status: derived subject theorem, frozen for independent derivation and review before any application claim.** The theorem concerns the specific full-family logarithmic-norm and nonnegative forcing recurrence used by the admitted Cartesian one-cell certificate. It is not a theorem about physical error growth, stability, or phase volume of a delay system. It uses only current receiving variables with the completed nominal source history fixed.

## A time-dependent current-variable coordinate with determinant one

Fix a smooth piece of the prescribed completed positive-source mirror history y(s). On a positive range and source-clock domain, let s=s(t,x) be the unique nominal partner root, R=t−s=|x+y(s)|, n=(x+y(s))/R, v=y'(s), D=1+n·v and P=I−nnT. For the current physical velocity variable u, set w=1−n·u>0 and

$$
q(t,x,u)=\frac{Pv}{RDw},\qquad p=u+q(t,x,u).
$$

At fixed(t,x), n,R,D,v do not depend onu. Since n·q=0,

$$
A=q_u=\frac{q n^{\mathsf T}}{w},\qquad A^2=0,\qquad
\det(I+A)=1,\qquad E=(I+A)^{-1}=I-A.
$$

The transformation Phi_t(x,u)=(x,p) has block-triangular current-variable derivative

$$
D\Phi_t=\begin{pmatrix}I&0\\q_x&I+A\end{pmatrix},
\qquad \det D\Phi_t=1.
$$

It is explicitly invertible on the same w domain: n·p=n·u, so u=p−Pv/[RD(1−n·p)]. This is a finite-dimensional coordinate change at fixed source history. No independent source state is varied, and no phase-space measure for the full delayed equation is asserted.

The original E current vector field with that source history fixed is

$$
K(t,x,u)=(u,F(t,x)),
$$

where F includes the full nominal delayed source acceleration and is independent of current u. Therefore its divergence in(x,u) is zero. Under a time-dependent invertible coordinate change, the transformed divergence is

$$
\operatorname{div}_{(x,p)}\widetilde K
=\operatorname{div}_{(x,u)}K
 +(\partial_t+K\cdot\nabla_{(x,u)})\log|\det D\Phi_t|.
$$

For completeness, this identity follows by transporting a small current-variable volume element: its old logarithmic rate is divK, while its coordinate Jacobian contributes the material logarithmic rate of detDPhi. Equivalently, differentiate the transformed flow derivative DPhi_t Dflow DPhi_0^{-1} and apply Jacobi's determinant identity. Here detDPhi is identically1 for all(t,x,u) in the domain, so the extra term vanishes even though the coordinate depends explicitly ont. Thus the transformed current Jacobian has trace0. This argument applies on each smooth prescribed-history piece; the finite C2,1 seams do not erase the interior nominal points needed below, and the coefficient enclosure still covers every seam.

Let H(t,x,u)=p' be the exact transverse derivative derived from the original E equation. Its cancellation of explicit delayed acceleration does not alter the identity above: before cancellation it is q_t+q_xu+(I+A)F. Writing Bq=q_x, BH=H_x and U=H_u at a common nominal point, the exact transformed Jacobian in(x,p) is

$$
J=\begin{pmatrix}
-EB_q&E\\
B_H-UEB_q&UE
\end{pmatrix}.
$$

Its trace is therefore0. A fixed metric change diag(nu,nu,1,1) gives the similar matrix Jnu with upper-right nuE and lower-left(BH−UEBq)/nu, preserving trace. A common rotating frame adds skew diagonal blocks; those have trace0 and disappear from the symmetric part. The actual driver uses the fixed nu=1 Cartesian representation.

## The nominal Jacobian belongs to every admitted full coefficient family

This inclusion is essential; the trace identity alone would not constrain an unrelated interval matrix. Fix any interior receiving time t in the certified cell for which the prescribed pieces are smooth. Evaluate at the nominal receiver xc(t),uc(t) and the nominal source y(s(t,xc)). The driver's position family includes the full Cartesian receiver trial around xc, hence includes xc itself, and freezes u over the complete physical-u trial containinguc. Its nominal source position error is zero. Its Bq and BH therefore contain the exact nominal q_x and H_x at that point.

The velocity family uses nominal receiver position and the same prescribed source root; its u trial containsuc, so U contains exact nominal H_u. Its inverse coefficient alpha=vt/(R D wa wc) includes wa=wc and therefore the exact q_u atuc. The family uses one nominal ray for that q_u and conjugates all spatial and velocity matrices to the common Cartesian frame. Thus the independently enclosed Bq,BH,U,alpha,n admit this simultaneous nominal assignment. Independent interval products may enlarge the resulting set, but cannot remove that assignment. The distinct-clock rule is satisfied at this nominal point because fieldv equals prescribed clockV; the full families must still retain the distinction elsewhere.

Consequently the driver's interval symmetric matrix S contains (Jnu+JnuT)/2 at this nominal point. The source-error forcing inventory is irrelevant to this inclusion and is not being set to zero in the physical recurrence. A family that excluded the nominal receiver/source assignment, mixed ray coordinates, or failed its complete clock domain would not satisfy the theorem.

A real symmetric4×4 matrix with trace0 has largest eigenvalue at least0, since the sum of its eigenvalues is0. Every valid whole-family logarithmic-norm upper bound mu therefore obeys

$$
\mu\ge\lambda_{\max}\left(\frac{J_\nu+J_\nu^{\mathsf T}}2\right)\ge0.
$$

The subject's midpoint PSD certificate plus outward Frobenius radius is one such upper-bound mechanism; the conclusion does not depend on its optimization precision. Its synthetic negative-diagonal control is still legitimate as a numerical control, but that synthetic matrix does not contain this trace-zero nominal E Jacobian and cannot be a counterexample to the present domain-specific conclusion.

## Consequence for every cap in the frozen recurrence

Let Wk be the stored endpoint norm and f≥0 its source/residual forcing upper bound. The scalar update uses outward factors Eexp≥exp(mu h) and Pexp≥integral_0^h exp(mu s)ds. Since mu≥0 and h>0,

$$
W_{k+1}=E_{\exp}W_k+P_{\exp}f\ge W_k,
\qquad W_{\mathrm{whole}}\ge W_k.
$$

Outward storage rounding preserves this nondecrease. The velocity reconstruction coefficient is the Euclidean norm bound for the inverse shear:

$$
b_w=\sqrt{1+\alpha_{\max}^2/4}+|\alpha_{\max}|/2\ge1.
$$

All other velocity reconstruction terms are nonnegative. Hence every transformed velocity cap in `combine` satisfies VN=bx X+bw Wwhole+bf≥Winitial. The physical cap VI=Vprevious+hA satisfies VI≥Vprevious because A≥0 includes full source-A and residual. At every refinement and final reconstruction, the selected velocity bound is a minimum of these two caps. By induction,

$$
V_{\mathrm{stored}}\ge\min\{V_{\mathrm{initial}},W_{\mathrm{initial}}\}.
$$

For the accepted strongest-prefix initializer, both fractions have denominator200000000000000000000000:

$$
W_{\mathrm{initial}}=\frac{40550679560268279107371}{200000000000000000000000}
>\frac{22771060530077803400771}{200000000000000000000000}
=V_{\mathrm{initial}}.
$$

Therefore the full frozen Cartesian method, including all of its min operations, cannot reduce stored V below the inherited original V. This is stronger than the earlier physical-only obstruction and does not depend on which cap happened to win the first cell.

For completeness, Xnorm=Wwhole/nu≥Winitial/nu. The original physical position integral is at leastXprevious; each successful trial initially containsXprevious. Thus Xstored≥min(Xinitial,Winitial/nu). With fixed nu=1 and the accepted Xinitial≈0.06792625<Winitial≈0.20275340, the frozen position bound cannot drop below its inherited value either. These lower bounds apply to the computed sufficient bounds, not to the actual trajectory's errors.

## Event-certificate implication and precise scope

If independently admitted, this theorem combines with the separately measured [terminal speed certificates](authorized-cases-ten-hour-a-terminal-speed-budget-result.md): the full original comparison and its existing residual-certified extension through59.57 have nominal speed upper bounds below1+Vinitial. Since this frozen method cannot reduceVinitial, no number of its valid receiving cells can establish terminal nominal speed minus storedV greater than1 anywhere in those intervals. The current unconditional driver also stops before its full physical receiving-speed trial reaches1; an incoming-only variant retaining this same scalar W and reconstruction would still have the stated error-budget obstruction wherever its coordinate chart is valid.

This is an exact obstruction to the declared fixed-metric scalar-norm method and terminal criterion. It is not an impossibility theorem for the physical event or for same-history analysis. A directional transported set retaining cancellation between velocity and position, an independently established smaller initial error set, a separately proved time-dependent anisotropic metric with its full metric derivative, or a different incoming event argument may evade the assumptions. Merely increasing the endpoint, improving root widths, or optimizing the same valid scalar logarithmic-norm upper bound cannot make it negative while it still contains the trace-zero nominal Jacobian.

Falsifiers are a nonzero current-u derivative in original E, an invalid determinant-one or time-dependent divergence identity, failure of simultaneous nominal inclusion, an upper bound mu that is not a true family bound, signed negative forcing admitted into the nonnegative scalar recurrence, an inverse reconstruction coefficient below1, a W reset or metric change not covered here, or a genuinely different event criterion. The decisive next step is independent reconstruction of the structural proof before using it to close the continuation allocation. No new physical target is needed to test this theorem's logical consequence.
