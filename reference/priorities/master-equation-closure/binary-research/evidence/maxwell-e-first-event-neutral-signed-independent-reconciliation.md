# Reconciliation of the two signed transformed-velocity comparisons

## Independence and verdict

**Grade: derived mathematical reconciliation, 2026-10-05.** The [independent reference](maxwell-e-first-event-neutral-signed-independent-reference.md), SHA-256 `4ed2dacb8165a0bd807405153effe7891a0026212ed57e4f9208f65623c4dc92`, was frozen and its identity sent to the coordinator before the [worker theorem](maxwell-e-first-event-neutral-signed-current-theorem.md), SHA-256 `3f10ceb380f6631b6f5a8c7f612ddd15603285c82c18166aa68a15ef5ca4da5d`, was read. Neither frozen source is changed by this note. No implementation or target output was read.

The worker's signed matrix and forcing are correct for its stated clockwise convention. They are an endpoint sequential decomposition, whereas the independent reference primarily uses a direct nominal $(r,p)$ state-segment Jacobian. These are different exact mean-value representations, with different sufficient coefficient families. The worker does not have to inherit the auxiliary receiving velocities of the direct state-segment method. Its source-offset and spatial-path obligations must instead be fulfilled literally. No mathematical sign objection remains; numerical coefficient coverage and efficacy are unassessed here.

## A concrete exact witness for the worker's coefficient families

Fix one reception and align the complete actual tuple to the comparison receiving frame by a constant rotation. Work in that fixed physical basis. Let $e_R=(1,0)$, $e_T=(0,1)$, $x_a=r_a e_R$, $x_c=r_c e_R$, $\rho=r_a-r_c$, and let $u_a,u_c,p_a,p_c$ be the aligned intrinsic components. Let $S_a$ be the completed actual root and freeze

$$
\Delta Y=Y_a(S_a)-Y_c(S_a).
$$

The translated nominal history $Y_c+\Delta Y$ has the actual root $S_a$ at receiver $x_a$. Let $q_0,H_0$ denote the complete nominal-clock fields of the unshifted nominal history. At fixed actual range, ray and root, replace the actual source velocity and acceleration by their nominal values. Define the resulting signed offsets $d_q,d_H$ by

$$
q_a=q_0(x_a-\Delta Y)+d_q,\qquad
H_a(x_a,u_a)=H_0(x_a-\Delta Y,u_a)+d_H.
\tag{1}
$$

All fixed-root V/A interpolation families in these offsets retain physical negative-label source signs. Their bounds are $|d_q|\le V_qS_V$ and $|d_H|\le V_HS_V+A_HS_A$, with $u_a$ held fixed in the H comparison and the source-A coefficient enclosed over the entire offset family.

Use the single nominal-clock spatial path

$$
\gamma_\lambda=x_c+\lambda(\rho e_R-\Delta Y),\qquad 0\le\lambda\le1.
\tag{2}
$$

Define the signed averaged physical matrices

$$
M_q=\int_0^1 q_{0,x}(\gamma_\lambda)\,d\lambda,\qquad
M_H=\int_0^1 H_{0,x}(\gamma_\lambda,u_a)\,d\lambda,
$$

and choose

$$
Q=M_qe_R,\qquad C=M_He_R,\qquad U=H_{0,u}(x_c)=q_{0,x}(x_c).
\tag{3}
$$

The last identity is independently proved in the frozen reference. In particular U does not depend on receiving velocity. The exact difference identities are

$$
\delta q=Q\rho+f_q^{\mathrm{vec}},\qquad
f_q^{\mathrm{vec}}=d_q-M_q\Delta Y,
$$

$$
\delta H-\delta_E=C\rho+U\delta u+f_H^{\mathrm{vec}},\qquad
f_H^{\mathrm{vec}}=d_H-M_H\Delta Y-\delta_E.
\tag{4}
$$

Here $\delta H=H_a-H_c$, and $\delta_E$ is the comparison's unchanged physical E residual projected into the aligned frame. Thus the worker's use of $f_H^{\mathrm{vec}}$ in the error equation already absorbs the negative comparison residual; its norm bound includes the positive residual norm. Formula (4) supplies an exact signed witness, not just norm estimates.

Because $|\Delta Y|\le S_X$, the full scalar forcing bounds in the older theorem follow directly:

$$
|f_q^{\mathrm{vec}}|\le C_qS_X+V_qS_V,\qquad
|f_H^{\mathrm{vec}}|\le C_HS_X+V_HS_V+A_HS_A+|\delta_E|.
$$

The particular averaged matrices in (3) need not agree. They also correlate with the source forcing, but dropping that correlation by retaining every independent combination is a valid over-enclosure. Introducing a favorable correlation absent from (1)–(4) would not be valid.

This witness requires all roots along (2), including off-ray intermediate positions, to fit the complete nominal source guard. The direction $e_R$ in (3) is the fixed comparison receiving ray. It is **not** $\gamma_\lambda/|\gamma_\lambda|$ when $\Delta Y$ has a transverse component. The response and q derivatives are physical-vector derivative matrices, not derivatives of components in a ray basis that is silently allowed to rotate with the perturbation. This is a concrete implementation obligation.

## Angular signs and the resulting matrix

The independent reference uses the counterclockwise matrix $J_+=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ and intrinsic equation $p'=H-\omega J_+p$. The worker uses $J_-=-J_+$ and $p'=H+\omega J_-p$. Put $z=p_a-p_c$. Equation (4) gives

$$
\delta u=z-Q\rho-f_q^{\mathrm{vec}},\qquad
\omega_a-\omega_c
=\frac{z_T-Q_T\rho-f_{q,T}^{\mathrm{vec}}}{r_a}
-\frac{u_{c,T}\rho}{r_ar_c}.
$$

In the worker convention, subtraction gives $z'=\delta H-\delta_E+\omega_aJ_-z+(\omega_a-\omega_c)J_-p_c$. Substituting the exact angular difference yields the worker lower-left column

$$
C-UQ-J_-p_c\left(\frac{Q_T}{r_a}+\frac{u_{c,T}}{r_ar_c}\right),
$$

lower-right block

$$
U+\frac{(J_-p_c)e_T^{\mathsf T}}{r_a}+\omega_aJ_-,
$$

and lower forcing

$$
f_H^{\mathrm{vec}}-Uf_q^{\mathrm{vec}}
-\frac{J_-p_c}{r_a}f_{q,T}^{\mathrm{vec}}.
$$

Every sign agrees. The current skew term cancels from the symmetric part when the p weights agree; the rank-one angular-rate term and $Q_T$ contribution do not cancel. The worker forcing bound by $U_H+P_c/r_a$ is the triangle inequality for the displayed lower forcing and is valid without a source-error correlation assumption.

## Receiving-velocity family distinction

The independent direct-state route differentiates $\mathcal F(r,p)$ on a segment $(r_\lambda,p_\lambda)$. It therefore must enclose $u_\lambda=p_\lambda-q_0(r_\lambda)$ and cannot clip that auxiliary velocity to an actual stopping bound. The current C family in the worker witness (2) instead holds **the actual physical $u_a$ fixed** while moving the nominal spatial point. Its source offsets also hold $u_a$ fixed. Thus a valid reconstructed actual receiving-velocity cylinder, possibly intersected with the explicit conditional actual speed bound, suffices for those families.

The remaining receiving-velocity difference in (4) uses U at $x_c$. Because H is exactly affine in u, that matrix is independent of every intermediate velocity between $u_a$ and $u_c$. A superunit comparison velocity therefore does not require a clipped intermediate velocity family for this U term. The comparison H value and residual are still evaluated literally on the same ordinary partner branch; no actual unit event or new comparison-root convention follows.

This distinction permits the worker sequential method to have narrower receiving-velocity boxes than the independent direct-state method. It does not permit narrower source/root/spatial boxes: the entire translated path (2), full fixed-root V/A offsets, positive R/D floors, all comparison jerk pieces, source angle mismatch and completed physical source acceleration bins remain mandatory. A worker implementation using a different decomposition must provide its own exact witness and cover its corresponding families.

## Metric and numerical-certificate checks

The two methods use the same valid squared-norm argument after their respective exact signed decompositions. The worker's safe whole-cell bound

$$
\max(1,e^{\mu h})W_0+F\int_0^h e^{\mu s}\,ds
$$

is valid for either sign of $\mu$: the first term bounds $e^{\mu t}W_0$ for all $0\le t\le h$, and the integral is increasing with t even when $\mu<0$. Its endpoint estimate, diagonal metric-reset factor and physical q reconstruction also match the independently derived obligations.

The opposite-diagonal obstruction in the independent reference applies directly to its point Jacobian: $q_r=H_u e_R$ at the same point forces diagonal entries $-U_{RR},+U_{RR}$. It must not be asserted for every individual worker endpoint matrix, because its averaged $Q_R$ and endpoint $U_{RR}$ can differ. If the worker's full coefficient family contains coincident nominal source/current configurations, it necessarily contains $Q_R=U_{RR}$ there; then any uniform logarithmic-norm bound over that entire family has the same nonnegative lower obstruction. Allowing a numerical scalar routine to handle negative $\mu$ is mathematically harmless. Claiming negative contraction on a family that includes such a coincident member would be unsound.

The worker's proposed symmetric midpoint-plus-radius estimate is valid: for an enclosed symmetric matrix $S=S_0+E$, the quadratic form gives $\lambda_{\max}(S)\le\lambda_{\max}(S_0)+\|E\|_2\le\alpha+\|E\|_F$ whenever $\alpha I-S_0$ is positive semidefinite. All seven principal minors characterize positive semidefiniteness of a real symmetric $3\times3$ matrix. To verify this directly, a positive diagonal pivot reduces the claim to the $2\times2$ Schur complement, whose diagonals and determinant are the corresponding principal minors divided by that pivot; if every diagonal vanishes, the $2\times2$ principal minors force every off-diagonal entry to vanish. The arithmetic must still enclose all midpoint/radius operations, and only the final checked rational certificate validates a searched $\alpha$.

## Remaining falsifiers and disposition

The mathematical reconciliation would fail if the implementation did not cover the frozen-offset path (2), used the radial direction of an intermediate shifted position in place of the fixed receiving ray, supplied moving-ray component derivatives as physical q/H derivative matrices, dropped either angular-rate term, changed the full source/root inventory, treated p as physical velocity, omitted physical source A, assumed actual source jerk, or used a nominal projection as a whole-family source-A bound. No such implementation claim is assessed by reading the theorem alone.

This note establishes structural consistency of the two frozen mathematical sources and identifies their different family requirements. It supplies no new coefficient receipt, accepted target run, actual solution interval or first event. Both original sources remain immutable; only this new assigned reconciliation note is authored after the independent freeze.
