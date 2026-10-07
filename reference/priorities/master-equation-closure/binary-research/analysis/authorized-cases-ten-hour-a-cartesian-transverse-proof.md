# Full Cartesian error in the transverse coordinate

**Status: derived subject alternative, pending independent method admission and controls.** This keeps the original Section 7 E complete history and prescribed comparison in their shared Cartesian frame. It uses the same independently assessed transverse coordinate, source clock and physical-u telescoping as the [physical-u proof](authorized-cases-ten-hour-a-transverse-physical-u-proof.md), but retains both Cartesian position-error components. No receiving radial alignment, angular-source inflation or old phase primitive is required. This is an error representation, not a new dynamical history.

## Exact four-component error equation

Set $\xi=x_a-x_c$, $\delta u=u_a-u_c$ and $z=p_a-p_c$, where $p=u+q$ is the exact transverse coordinate and both evaluations use the same fixed physical Cartesian frame. At each receiving time telescope source first at fixed $(x_a,u_a)$, then position along $x_c+\lambda\xi$ at fixed $u_a$ with the prescribed source, then velocity along $u_c+\lambda\delta u$ at fixed nominal receiving position and prescribed source. The source family is exactly the [explicit-clock construction](authorized-cases-ten-hour-a-transverse-source-families.md).

The position averages are now full two-by-two matrices:

$$
\delta q=B_q\xi+A\delta u+f_q,\qquad
\delta H=B_H\xi+U\delta u+f_H.
$$

Only the last velocity bracket defines $A,U$. Its nominal source root and ray are fixed across the bracket, so

$$
A=\alpha t_0n_0^{\mathsf T},\quad
\alpha=\frac{v_{0,t}}{R_0D_0w_aw_c},\quad A^2=0,\quad E=I-A.
$$

Thus $z=(I+A)\delta u+B_q\xi+f_q$ has the exact inverse

$$
\delta u=-EB_q\xi+Ez-Ef_q.
$$

With the original comparison residual included in $f_H$, differentiation gives

$$
\begin{pmatrix}\xi\\z\end{pmatrix}'=
\underbrace{\begin{pmatrix}
-EB_q&E\\
B_H-UEB_q&UE
\end{pmatrix}}_{M}
\begin{pmatrix}\xi\\z\end{pmatrix}
+\begin{pmatrix}-Ef_q\\f_H-UEf_q\end{pmatrix}.
$$

All products are ordered as written. In particular, U and E generally do not commute. The B matrices and the U velocity derivative may be averages over different parameter paths; only their full enclosures may be combined. No matrix is replaced by a derivative at the midpoint. The exact transformed original-E residual is still $(I+q_{u,c})d$, with its proper signed placement in $f_H$.

The common nominal rotating frame can be used for both two-component vectors. If its orthogonal coordinate map has $O'O^{\mathsf T}=\omega_cJ$ with $J^{\mathsf T}=-J$, the rotated equation has an additional diagonal block $\operatorname{diag}(\omega_cJ,\omega_cJ)$. Each original block must be conjugated by the same O; this is not an independent radial alignment of the actual path.

For $\nu>0$ constant on a receiving cell, use

$$
W^2=\nu^2|\xi|^2+|z|^2,\qquad
M_\nu=\begin{pmatrix}
-EB_q&\nu E\\
(B_H-UEB_q)/\nu&UE
\end{pmatrix}.
$$

Weights within each two-vector are equal. Therefore both nominal frame-rotation blocks remain skew after this similarity and disappear exactly from $(M_\nu+M_\nu^{\mathsf T})/2$. There is no $Jp_c\delta\omega$ term: both errors use the same nominal frame, whose angular speed is identical for the two compared fields. The physical angular-rate error is neither set to zero nor used to modify the law.

If the largest eigenvalue of every complete symmetric block is bounded by mu, then a sufficient forcing bound is

$$
f\le\left[(\nu\|E\|f_q)^2+(f_H+\|U\|\|E\|f_q)^2\right]^{1/2}.
$$

Consequently $W(t)\le e^{\mu(t-L)}W(L)+\int_L^t e^{\mu(t-s)}f(s)\,ds$. This follows from differentiating the squared Euclidean norm of the scaled error and Cauchy-Schwarz, with the usual continuous limiting inequality at zero. A metric change at a later cell face costs at most $\max(1,\nu_{new}/\nu_{old})$ on the preceding endpoint W. A complete four-by-four symmetric eigenvalue certificate is required; a three-by-three certificate cannot be reused merely by changing matrix dimensions.

## Source history and physical reconstruction

Inherited whole-cell Cartesian X/V/A are direct source-error bounds at actual emission in this common frame. They require neither angular reconstruction nor a conversion to intrinsic source components. Complete closed source bins, literal negative past and source/root coverage are still required. Future accepted cells must store complete Cartesian errors in the same physical frame. Orthogonal nominal-frame components have the same vector norm, so their stored norm bounds can supply these errors directly without integrating an orientation discrepancy.

The physical receiving velocity satisfies

$$
|\delta u|\le\|EB_q\|X+\|E\|W+\|E\|f_q,
$$

where X is an independently propagated position-error bound. The separate bound $X\le W/\nu$ is always available. A sharper whole-cell position estimate follows from $\xi'=\delta u$: if $b_x\ge\|EB_q\|$, $b_w\ge\|E\|$, and $b_f\ge\|E\|f_q$, then for cell width h with $hb_x<1$,

$$
X_{whole}\le\frac{X(L)+h(b_wW_{whole}+b_f)}{1-hb_x}.
$$

The minimum with $W_{whole}/\nu$ is valid. Every receiving trial must strictly contain these computed whole-cell X/V bounds, retain positive actual radius/range and the complete source chart, and reconstruct physical acceleration from the original E coefficients and its unmodified source-A inventory. The transformed H equation's cancellation of delayed acceleration does not license omitting that reconstruction.

## Same-history initialization

At an old Cartesian checkpoint the same telescoping gives

$$
z=(I+A)\delta u+B_q\xi+f_q.
$$

Thus old independent Cartesian balls $|\xi|\le e_X$ and $|\delta u|\le e_V$ yield the sufficient initializer

$$
W_0\le\left[(\nu e_X)^2+
\left(\|I+A\|e_V+\|B_q\|e_X+f_q\right)^2\right]^{1/2}.
$$

Here $\|I+A\|=\sqrt{1+\alpha^2/4}+|\alpha|/2$ at the fixed nominal ray. A complete enclosure for alpha is required. No receiving alignment term multiplies old source radius, speed or acceleration. This avoids the main inflation in the first aligned checkpoint, but the full receiving Cartesian position ball can widen current root families relative to a radial segment. Whether the trade improves the final bound is unmeasured until a separately admitted checkpoint.

## Independent controls and falsifiers

An analytically known local derivative case uses stationary source at range2 on the first coordinate ray. Then q=0, A=0, E=I, U=0, Bq=0 and BH=diag(1/4,-1/8). For nu=1/2, the symmetric scaled four-by-four matrix has eigenvalues $1/2,-1/2,1/8,-1/8$, so its Euclidean logarithmic norm is exactly1/2. This is a local coefficient control, not a stability claim about a stationary configuration. A synthetic nonzero nilpotent A must also check noncommuting U/E products and the full forcing pair; source residual controls must reject the unchanged-residual shortcut.

Necessary independent admission comprises this error identity, complete Cartesian root/source families, a four-by-four eigenvalue instrument with exact known cases, initialization, scalar recurrence, strict physical trial and original E reconstruction. A missing matrix product, omitted source interval or acceleration, independent rotation of A's nominal ray, unequal weights within a two-vector, unbound residual multiplier or nonpositive whole-cell position inverse falsifies the corresponding claim. This note launches no target and changes neither old physical prefix.
