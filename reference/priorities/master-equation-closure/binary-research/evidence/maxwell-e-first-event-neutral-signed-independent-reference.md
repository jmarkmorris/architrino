# Independent signed intrinsic comparison after the E velocity transformation

## Scope, frozen premises and result

**Grade: derived independent mathematical reference, 2026-10-05, before reading the new signed transformed-velocity subject or implementation.** This reference concerns the unchanged original Section 7 E mirror-planar binary: opposite polarities, $K=c_f=1$, launch speed $3/10$, member radius $25/9$, frequency $27/250$, and the original complete circle-tail/compatible patch. The complete patch remains the minimum-width construction in [the original equation/domain source](../analysis/maxwell-shaped-overnight-equation-domain.md#3-compatible-near-circular-release-with-explicit-bounds); it is not replaced by an endpoint launch or a new wake. The [conditional first-unit theorem](maxwell-e-first-event-conditional-first-unit-theorem.md) supplies the actual complete partner/no-positive-self census only under its explicit stopping and regularity hypotheses. This reference proves a sharper error-transport option, not those hypotheses, a new actual interval or an event.

The [exact velocity transformation](maxwell-e-first-event-neutral-velocity-transform-theorem.md) and [nonnegative two-component error theorem](maxwell-e-first-event-neutral-velocity-error-theorem.md) are frozen antecedents. Their equations are independently differentiated below. The result is an exact signed three-component receiving equation, with every delayed source X/V/A error retained as forcing and all receiving rotation terms included. It admits a whole-family scaled logarithmic-norm estimate that preserves restoring off-diagonal cancellation. A precise limitation is proved too: **positive diagonal scaling cannot give a strictly negative Euclidean logarithmic norm for the direct three-component Jacobian**, because two diagonal entries are exact opposites. No numerical efficacy is inferred.

## Physical transformation and a structural derivative identity

At one complete ordinary partner root, let the receiver be $x$, its physical velocity $u$, and the source be $Y(S)$ with physical $v=Y'(S)$ and $a=Y''(S)$. Put

$$
R=T-S=|x-Y(S)|>0,\quad n=\frac{x-Y(S)}R,\quad
D=1-n\cdot v>0,\quad \sigma=-1.
$$

The selected E response is $F_E=G+Ba$, where

$$
G=\frac{\sigma(1-|v|^2)(n-v)}{R^2D^3},\qquad
B=\frac{\sigma[(n-v)n^{\mathsf T}-DI]}{RD^3}.
$$

Define $q=\sigma(v-n)/(RD)$ and $p=u+q$. The root and $q$ are independent of receiving velocity. All source vectors include the negative-label mirror signs; $v$ and $a$ are not the positive-label intrinsic jets with their signs removed.

At fixed $R,n$,

$$
q_v=\frac{\sigma}{RD}\left[I+\frac{(v-n)n^{\mathsf T}}D\right]=-DB.
\tag{1}
$$

At fixed receiving time, let $Q=\partial_x q$ denote the **full nominal-source-clock spatial derivative**, with the complete source curve held fixed. Write $\Pi=I-nn^{\mathsf T}$ and $W=I+vn^{\mathsf T}/D$. Implicit differentiation gives

$$
S_x=-\frac{n^{\mathsf T}}D,\quad R_x=\frac{n^{\mathsf T}}D,
\quad n_x=\frac{\Pi W}{R},\quad v_x=-\frac{a n^{\mathsf T}}D.
$$

Substitution into $q$ yields the signed matrix

$$
Q=-\frac{q n^{\mathsf T}}{RD}
+\frac{\sigma}{R^2D}
\left[-I+\frac{(v-n)v^{\mathsf T}}D\right]\Pi W
+(Ba)n^{\mathsf T}.
\tag{2}
$$

The last term is a source-acceleration contribution to the spatial derivative; omitting it would invalidate the signed equation.

Along the receiver, $S'=(1-n\cdot u)/D$, $w=u-vS'$, $R'=n\cdot w$ and $n'=\Pi w/R$. Therefore

$$
p'=H:=G+L_0+(n\cdot u)Ba,
$$

$$
L_0=-q\frac{R'}R+
\frac{\sigma}{RD}\left[-n'+\frac{(v-n)(v\cdot n')}D\right].
$$

Equivalently $H=F_E+q_T+Q u$, where $q_T$ is the partial time derivative at fixed receiving position and fixed complete source curve. The original E response is receiving-velocity independent. Hence

$$
\boxed{H_u=Q,\qquad H(x,u)=H(x,0)+Q(x)u.}
\tag{3}
$$

One can also check (3) directly in the displayed $L_0$: its $u$ coefficient is the first two terms of (2), and $(n\cdot u)Ba$ supplies the last. Thus this identity does not assume a conserved quantity or any standard-physics premise. It is specific to E; a receiving-dependent response would add its own $F_u$.

The direct source-acceleration coefficient in $H$ remains $(n\cdot u)B$. Its smallness must be enclosed on the full relevant family. Identity (3) does not remove source acceleration from $Q$, from the physical acceleration inventory, or from later source rows.

For a complete comparison curve with physical residual $\delta_E=u_c'-F_{E,c}$, differentiating the same $q_c$ gives $p_c'-H_c=\delta_E$. This is the exact unchanged-residual control. It requires the literal same comparison curve and completed partner branch; it cannot transfer a residual to a different curve or root inventory.

## Receiving frame and the exact three-component Jacobian

Use the outward radial ray of the member position, $e_R$, and its positive planar quarter-turn $e_T$. This receiving ray is generally **not** the causal source ray $n$. Set

$$
J=\begin{pmatrix}0&-1\\1&0\end{pmatrix},\qquad
r=|X|>0,\qquad \omega=u_T/r.
$$

Components below are in $(e_R,e_T)$. Their exact intrinsic equations are

$$
r'=u_R,\qquad p'=H-\omega Jp.
\tag{4}
$$

Indeed differentiation of the rotating basis gives $p_R'=H_R+\omega p_T$ and $p_T'=H_T-\omega p_R$. These signs fix the convention; calling the whole frame difference skew would be incorrect.

At each reception $T$, align the comparison receiving ray to the actual receiving ray by one constant rotation of its entire X/V/A tuple while evaluating fields. Freeze that rotation during every root and state interpolation. This does not differentiate a time-dependent rotated source curve. The separate intrinsic equations (4) already account for the actual and comparison frame derivatives.

Fix this complete rotated nominal source history. For arbitrary positive $r$ and intrinsic $p\in\mathbb R^2$ in an admitted trial family define

$$
u(r,p)=p-q(r),\qquad
\mathcal F(T;r,p)=
\begin{pmatrix}
u_R\\ H(r,u)-[u_T/r]Jp
\end{pmatrix}.
\tag{5}
$$

Every $q,H$ in (5) uses that nominal history's own completed root at receiver position $r e_R$. Write

$$
q_r=\partial_rq=Qe_R,\qquad U=H_u=Q,\qquad
h=\partial_rH\big|_u,
$$

where $h$ holds the **physical** receiving velocity fixed and differentiates the nominal source clock. Then the signed Jacobian of (5) is

$$
\boxed{
\mathcal K=
\begin{pmatrix}
-q_{r,R}&e_R^{\mathsf T}\\
c&D_p
\end{pmatrix},\quad
c=h-Uq_r+\left(\frac{q_{r,T}}r+\frac{u_T}{r^2}\right)Jp,
\quad
D_p=U-\omega J-\frac{(Jp)e_T^{\mathsf T}}r.
}
\tag{6}
$$

The lower-left symbol $c$ is a two-component column and $D_p$ a $2\times2$ block. Formula (6) is derived by differentiating $u=p-q(r)$ and $\omega=u_T/r$. In particular $\omega_r=-q_{r,T}/r-u_T/r^2$ and $\omega_p=e_T^{\mathsf T}/r$. The term $-Uq_r$ and both rate derivatives are mandatory.

In components the lower block is

$$
D_p=
\begin{pmatrix}
U_{RR}&U_{RT}+\omega+p_T/r\\
U_{TR}-\omega&U_{TT}-p_R/r
\end{pmatrix}.
\tag{7}
$$

The current $-\omega J$ is skew, but the term $-(Jp)e_T^{\mathsf T}/r$ is not. It records the change of angular rate caused by the error itself.

For signed errors $\rho=r_a-r_c$ and $\eta=p_a-p_c$, put $y=(\rho,\eta_R,\eta_T)$. Along the nominal current-state segment

$$
r_\lambda=r_c+\lambda\rho,\quad p_\lambda=p_c+\lambda\eta,
\quad u_\lambda=p_\lambda-q(r_\lambda),\qquad 0\le\lambda\le1,
$$

the mean-value identity is

$$
\mathcal F(T;r_a,p_a)-\mathcal F(T;r_c,p_c)
=\overline{\mathcal K}(T)y,\qquad
\overline{\mathcal K}=\int_0^1\mathcal K(T;r_\lambda,p_\lambda)\,d\lambda.
\tag{8}
$$

This is a signed linear representation of the difference; its coefficients depend on the full trial family and are not a linearization at a nominal orbit. Every intermediate root, source jet and reconstructed $u_\lambda$ must be enclosed. One cannot clip $u_\lambda$ to an actual-speed stopping hypothesis: it is an auxiliary field state and may lie outside the actual physical velocity tube.

On piecewise $C^{2,1}$ comparison histories, $q$ is continuously differentiable and $H$ is locally Lipschitz on the ordinary domain. The nominal-clock $h$ uses the comparison source jerk almost everywhere. Equation (8) is the absolutely continuous segment integral, with every crossed seam and its one-sided derivative bounds retained. It requires no actual source jerk. At a segment lying along a source seam, the source-time directional derivative vanishes; including both closed-side derivative families remains a valid enclosure.

## Full source forcing, including the q conversion

At the actual receiving position let $q_a,H_a$ use actual source data, and let $q_0,H_0$ use the fixed rotated nominal complete history. In this section $H_0$ is the nominal field, not the value $H(x,0)$ used in (3). Define the exact source discrepancies at the actual physical receiving velocity $u_a$ by

$$
\xi_q=q_a-q_0(r_a),\qquad
\xi_H=H_a(r_a,u_a)-H_0(r_a,u_a).
$$

The nominal receiving velocity associated with the same transformed state is $\widehat u=p_a-q_0(r_a)=u_a+\xi_q$. By the exact affine identity (3), and by the angular-rate difference $\widehat u_T/r_a-u_{a,T}/r_a=\xi_{q,T}/r_a$, the actual signed error equation is

$$
\boxed{y'=\overline{\mathcal K}y+g,\qquad
g=\begin{pmatrix}
-\xi_{q,R}\\
\xi_H-\left[U_0(r_a)-\frac{(Jp_a)e_T^{\mathsf T}}{r_a}\right]\xi_q-\delta_E
\end{pmatrix}.}
\tag{9}
$$

The residual in (9) is projected into the comparison's intrinsic frame, equivalently the fixed aligned receiving frame. Its sign is negative because the error is actual minus comparison. Both the velocity shift $-U_0\xi_q$ and the angular-rate correction $+(Jp_a)\xi_{q,T}/r_a$ are necessary. Omitting either falsely treats p error as physical velocity error.

Here is the complete sequential enclosure of $\xi_q,\xi_H$. Let $S_a$ be the actual completed root and freeze

$$
\Delta Y=Y_a(S_a)-Y_c(S_a)
$$

in the aligned physical frame. Translating the entire nominal source curve by this fixed vector makes its root at the actual receiver equal $S_a$. At that fixed root first replace actual source V/A by nominal V/A through the full offset families. Then remove the frozen translation, equivalently vary receiver position along the nominal clock from $x_a-\Delta Y$ to $x_a$. Keep $u_a$ fixed for the H comparison. Direct fixed-root V/A derivatives and full nominal-clock X derivatives then give

$$
|\xi_q|\le \epsilon_q=C_q^{s}S_X+V_qS_V,
$$

$$
|\xi_H|\le \epsilon_H=C_H^{s}S_X+V_HS_V+A_HS_A.
\tag{10}
$$

All coefficients in (10) bound their entire ordered families. The direct H acceleration matrix is exactly $(n\cdot u_a)B$ on its source-offset family, not its nominal-point value. Removing the translation samples comparison source acceleration for $q$ and comparison source jerk for $H$. The actual source acceleration remains a separate offset in $S_A$; no actual jerk is introduced.

Let complete earlier source inventories supply radius error $s_r$, intrinsic physical velocity-norm error $s_v$, intrinsic physical acceleration-norm error $s_a$, and nominal source norms $R_s,V_s,A_s$. With the whole source-to-reception angle-increment bound $\Psi$,

$$
S_X=s_r+R_s\Psi,\qquad
S_V=s_v+V_s\Psi,\qquad
S_A=s_a+A_s\Psi.
\tag{11}
$$

This follows by adding intrinsic-vector error and the rotation error, using $\|\operatorname{Rot}(\alpha)-I\|\le|\alpha|$. For the mirror source, rotate and negate the full source X/V/A tuple consistently. The relevant angle increment is

$$
\theta_a(S)-\theta_c(S)-\theta_a(T)+\theta_c(T)
=-\int_S^T(\omega_a-\omega_c)\,dt.
$$

With positive receiver radii and physical velocity error $e_u$,

$$
|\omega_a-\omega_c|
\le\frac{e_u}{r_a}+
\frac{|u_{T,c}|\,|\rho|}{r_ar_c}.
\tag{12}
$$

The primitive in (12) includes the finite negative-time support, every completed nonmonotone source bin, both sides of closed seams, and the entire current receiving trial cell. No endpoint-only source maximum, monotone-error assumption, ancient-history deletion or absolute-phase cancellation beyond this finite increment is permitted. All actual, translated-nominal and current-segment source roots must lie in retained complete guards strictly before the receiving left face. A valid actual stopping census does not independently certify an auxiliary nominal-clock family.

## Scaled logarithmic norm and what it can preserve

Choose one positive cell-constant scale $\nu$ and $S_\nu=\operatorname{diag}(\nu,1,1)$. Let $Z=|S_\nu y|$. For every point in the full current-segment/root family independently enclose

$$
\mu\ge\lambda_{\max}\!\left(
\frac{S_\nu\mathcal K S_\nu^{-1}
+S_\nu^{-\mathsf T}\mathcal K^{\mathsf T}S_\nu^{\mathsf T}}2
\right).
\tag{13}
$$

The same bound holds for the average in (8): apply the quadratic-form inequality to each family member and integrate. This preserves correlations and restoring signs if they are retained before the symmetric-part bound; it does not require the individual matrices to commute. One common metric must be used for the entire mean-value family and time cell.

For (6), the symmetric matrix in (13) is explicitly

$$
\begin{pmatrix}
-q_{r,R}&(\nu+c_R/\nu)/2&c_T/(2\nu)\\
(\nu+c_R/\nu)/2&U_{RR}&(U_{RT}+U_{TR}+p_T/r)/2\\
c_T/(2\nu)&(U_{RT}+U_{TR}+p_T/r)/2&U_{TT}-p_R/r
\end{pmatrix}.
\tag{14}
$$

Thus a negative $c_R$ can cancel the positive kinematic term $\nu$ before any norm is taken. The current $\omega$ cancels exactly, whereas the rate-difference terms $p_T/r$ and $-p_R/r$ remain. A bound obtained by taking absolute values of all entries before (14) discards the intended signed improvement.

There is an exact restriction on this strategy. By (3), $q_{r,R}=U_{RR}$. The first two diagonal entries of (14) are therefore $-U_{RR}$ and $+U_{RR}$. Since a largest symmetric eigenvalue is at least each diagonal entry,

$$
\boxed{\mu_2(S\mathcal KS^{-1})\ge |U_{RR}|\ge0
\quad\text{for every positive diagonal }S.}
\tag{15}
$$

Positive diagonal scaling leaves those two diagonal entries unchanged, so (15) also covers unequal weights on the two p components. The transformed signed method can lower a large positive sufficient exponent; it cannot certify strict full-state contraction by a negative logarithmic norm using this diagonal metric. This is an algebraic obstruction, not a physical instability claim. A non-diagonal metric could be studied separately, but its complete transformed symmetric part, including frame rotation, would need an independent bound.

Even for a diagonal metric, unequal p weights prevent the current rotation from being dropped. If they are $\alpha,\beta$, the symmetric off-diagonal contribution from $-\omega J$ is $\omega(\alpha/\beta-\beta/\alpha)/2$. Formula (14) uses equal p weights and is not valid after an unequal rescaling without that correction.

Let $L_s$ bound $\|U_0(r_a)-(Jp_a)e_T^{\mathsf T}/r_a\|$ on the complete actual receiving trial. If $|\delta_E|\le\delta$, (9) gives the sufficient forcing bound

$$
|S_\nu g|\le b_\nu
:=\sqrt{\nu^2\epsilon_q^2+
(\epsilon_H+L_s\epsilon_q+\delta)^2}.
\tag{16}
$$

A separately enclosed signed vector set for $\xi_q,\xi_H,\delta_E$ may improve (16), but those source errors are not assumed correlated or restoring. Norm bounds alone license (16), not cancellation between them.

For nonzero $Z$, differentiate $Z^2$ using (9), (13) and (16); at zero use the upper right norm derivative. This proves

$$
D^+Z\le\mu Z+b_\nu,
\qquad
Z(T+h)\le e^{\mu h}Z(T)+b_\nu\int_0^h e^{\mu s}\,ds.
\tag{17}
$$

This also follows by multiplying the scalar inequality by $e^{-\mu t}$ and integrating. At $\mu=0$ the integral is $h$. The family bound (15) permits taking $\mu\ge0$, in which case the right side is monotone in $h$ and bounds the whole cell, not only its last face. Every coefficient and forcing bound must first be frozen on a prescribed closed cylinder; strict improvement over that cylinder and all physical source/root guards is still required for acceptance.

At a scale change, $Z_{\widetilde\nu}\le\max(1,\widetilde\nu/\nu)Z_\nu$. A differentiably varying metric instead contributes $S'S^{-1}$ and cannot use the cell-constant formula unchanged. Outward bounds for the eigenvalue, exponential and integral in (17) are implementation obligations; this mathematical reference supplies no numerical certificate.

## Physical reconstruction and recovery of the older two-component control

The complete nominal-clock q difference has the signed form

$$
q_a-q_c=\alpha\rho+\xi_q,\qquad
\alpha=\int_0^1q_r(r_c+\lambda\rho)\,d\lambda.
$$

Consequently

$$
u_a-u_c=\eta-\alpha\rho-\xi_q,\qquad
e_u\le Z+|\alpha|Z/\nu+\epsilon_q.
\tag{18}
$$

The coefficient $\alpha$ is an average along the nominal radius segment; it is generally not $U(r_c)e_R$. Replacing it by an endpoint derivative without an enclosure is unsafe. The physical acceleration error must be reconstructed from the original E row with all physical source X/V/A errors and the comparison residual. Neither intrinsic p derivatives nor the suppressed H acceleration coefficient can replace that acceleration inventory.

One can recover exactly the older nonnegative two-component theorem without assuming the sharper Jacobian is effective. Direct field comparison gives

$$
|q_a-q_c|\le C_q|\rho|+\epsilon_q,\quad
|H_a-H_c|\le C_H|\rho|+U_H e_u+\epsilon_H.
$$

Subtracting (4) gives

$$
\eta'=\delta H-\omega_aJ\eta
-(\omega_a-\omega_c)Jp_c-\delta_E.
$$

The current skew term has zero inner product with $\eta$. With $P_c\ge|p_c|$, $b_c\ge|u_c|$ and $L=U_H+P_c/r_a$, the resulting inequalities are

$$
D^+|\rho|\le C_q|\rho|+|\eta|+\epsilon_q,
$$

$$
D^+|\eta|\le
\left(C_H+LC_q+\frac{P_cb_c}{r_ar_c}\right)|\rho|
+L|\eta|+\epsilon_H+\delta+L\epsilon_q.
\tag{19}
$$

These match the frozen scalar theorem with $f_q=\epsilon_q$ and $f_H=\epsilon_H+\delta$. This is an analytical control of the forcing, residual sign, q conversion and frame-rate terms; it is not an independent numerical implementation check.

An admitted physical prefix initializes Z only after q errors are enclosed on its full actual/comparison root windows. For example a valid old radius cap $e_r$, intrinsic physical velocity cap $e_u$ and complete q-error cap $e_q$ imply $Z\le\sqrt{\nu^2e_r^2+(e_u+e_q)^2}$. Old physical source V/A bins are retained, the angular primitive is rebuilt with (12) and (18), and all seam mismatches stay present. A terminal physical speed lower bound uses $|u_c|-e_u$, never $|p_c|-Z$.

## Exact analytical controls and falsifiers

The following independently evaluable controls precede any numerical target built from this reference.

1. **Instantaneously zero source velocity.** At $n=e_R$, $R=1$, $v=0$, $a=(a_R,a_T)$ and $\sigma=-1$, direct differentiation gives $q=e_R$, $q_v=-\operatorname{diag}(0,1)$, $B=\operatorname{diag}(0,1)$ and $Q=\begin{pmatrix}-1&0\\a_T&1\end{pmatrix}$. Thus $H$'s direct source-A contribution is $u_R(0,a_T)$, while $H_u$ retains the $a_T$ entry even when $u_R=0$. This tests both cancellation and the source-acceleration shift in the spatial derivative.
2. **Exact stationary-source intrinsic Jacobian.** For a source fixed at the origin, $\sigma=-1$, receiving state $r=1,u=0,p=(1,0)$, direct substitution into (5) and differentiation gives $\mathcal K=\begin{pmatrix}1&1&0\\1&-1&0\\0&0&0\end{pmatrix}$. It agrees with (6) and exhibits the opposite diagonal entries. This is a local field algebra control, not a binary equilibrium or an allowed replacement source.
3. **Nonaligned rational source.** At $R=2$, $n=(3/5,4/5)$, $v=(1/5,-1/10)$, $\sigma=-1$, one has $D=24/25$, $q=(5/24,15/32)$ and $q_v=\begin{pmatrix}-25/64&25/144\\75/256&-25/192\end{pmatrix}$. Direct differentiation verifies $B=-(25/24)q_v$. For $u=(-1/6,1/8)$ the direct source-A matrix vanishes because $n\cdot u=0$; changing the first receiving component to $1/6$ makes it $B/5$. Neither test identifies the receiving radial ray with n.
4. **Pure intrinsic kinematics.** With field terms formally set to zero only to test (4), the $(r,p_R,p_T)$ Jacobian is $\begin{pmatrix}0&1&0\\-p_T^2/r^2&0&2p_T/r\\p_Rp_T/r^2&-p_T/r&-p_R/r\end{pmatrix}$. This tests the non-skew rate correction and its signs independently of the E response.
5. **Signed norm cancellation.** For the analytical test matrix $\begin{pmatrix}0&1&0\\-\kappa&-\gamma&0\\0&0&-d\end{pmatrix}$, $\kappa>0$ and $\gamma,d\ge0$, choosing $\nu=\sqrt\kappa$ makes the scaled symmetric part $\operatorname{diag}(0,-\gamma,-d)$. Its largest eigenvalue is exactly zero. Entrywise absolute-value transport cannot reproduce this cancellation. This matrix is a norm-arithmetic control, not a claim about an actual E coefficient family.

An implementation must independently pass the exact identities, mean-value/root-family coverage, closed seam/nonmonotone source inventory, metric reset and scalar integration controls before running a target. Agreement with a reference that imports the subject's derivative code is not independent verification.

The theorem fails if the field uses a different E/source sign; the $Ba n^{\mathsf T}$ part of Q is absent; h is differentiated at fixed p and then $-Uq_r$ is subtracted again; a current-state or frozen-offset source family is missing; the nominal receiver velocity is clipped to an actual stopping bound; the source frame mismatch or current angular-rate correction is omitted; source-A error is replaced by a jerk assumption; a pointwise projection supplies a whole-family coefficient; diagonal scaling is claimed to give a negative logarithmic norm despite (15); or a p error is used directly as a physical speed/acceleration error. Failure of a sufficient cylinder is an instrument limitation, not an actual event or obstruction to the E solution.

## Source identity and disposition

The antecedent identities were measured with `shasum -a 256` before this derivation:

| Frozen source | SHA-256 |
| --- | --- |
| [Velocity transformation](maxwell-e-first-event-neutral-velocity-transform-theorem.md) | `9d743f67f2ac11cf1293ee557cb1313affb8d3cbdb96c31255946b6ad1181676` |
| [Two-component error theorem](maxwell-e-first-event-neutral-velocity-error-theorem.md) | `8e0694c894911e1d2af379a9e56b53381246a93bdd9f54d5d09f8b58c4c54838` |
| [Conditional actual domain theorem](maxwell-e-first-event-conditional-first-unit-theorem.md) | `a4f11446d728d34ce4a768e3447054bb8c603e08032f393045a1d841f2ff7654` |

Only this new assigned independent source was written. Earlier subjects and references remain unchanged. No worker signed transformed subject or implementation was read, no numerical reference code was needed, and no target was run. The formula family and exact controls are derived; coefficient enclosures, numerical effectiveness, any new actual prefix and the original E first event remain unestablished by this reference.
