# Independent source-radius transfer for both transformed E fields

## Frozen scope and conclusion

**Grade: derived independent mathematical reference, 2026-10-05, frozen before reading the new worker transformed-source theorem or implementation.** The case remains the original Section 7 E opposite-polarity mirror-planar binary, $K=c_f=1$, speed $3/10$, radius $25/9$, frequency $27/250$, complete old circle and its original compatible patch. All actual root, stopping, positive range/denominator and continuation hypotheses remain those of the existing case. No actual history, comparison curve, residual, source inventory or event rule is changed.

The antecedent [signed source-radius theorem](maxwell-e-first-event-signed-source-radius-theorem.md) transfers a same-history source radius into a signed current-radius coefficient plus an integral of physical radial-velocity error. This reference extends that exact geometry simultaneously to q and H in the [velocity transformation](maxwell-e-first-event-neutral-velocity-transform-theorem.md), then derives the full signed receiving matrix and forcing. The [independent current reference](maxwell-e-first-event-neutral-signed-independent-reference.md) and [reconciliation](maxwell-e-first-event-neutral-signed-independent-reconciliation.md) supply the previously frozen derivative/frame conventions.

**Derived result:** the source-radius identity may be used for both fields, including every occurrence of q's current radial column in the receiving conversion and angular-rate terms. The same physical radial-history integral enters both, so its combined transformed forcing coefficient may be formed before taking a norm. This proves a possible signed improvement, not its numerical efficacy. The physical radial-velocity density, complete source-angle integral and original physical acceleration inventory cannot be replaced by p error.

## Exact geometry at the actual source root

At one reception T use a single constant rotation to align the actual positive-label receiving ray with the comparison ray. All vectors below are in this fixed physical receiving frame. Write $e_R=n_c(T)$, $e_T=Je_R$, where

$$
J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}.
$$

This J is counterclockwise; the intrinsic p equation is $p'=H-\omega Jp$. The source ray n in the response formula is distinct from the member radial directions $n_c$ and $e_R$.

Let $S_a<T$ be the complete actual partner root. For the negative transmitter, freeze its physical position offset

$$
c=Y_a(S_a)-Y_c(S_a)=-\widetilde x_a(S_a)+x_c(S_a),
$$

where the tilde denotes the constant receiving alignment. Translating the complete nominal transmitter by c gives the actual root at the actual receiver. The net input to the nominal-clock spatial comparison is

$$
L=\rho(T)e_R-c,\qquad \rho=r_a-r_c.
$$

Put

$$
e_s=n_c(S_a),\quad
\eta_s=\widetilde n_a(S_a)-n_c(S_a),\quad
I_r=\int_{S_a}^{T}\delta u_R(t)\,dt,
\quad \delta u_R=u_{R,a}-u_{R,c}.
$$

The negative-transmitter sign and the exact identity $\rho'=\delta u_R$ give

$$
-c=\rho(S_a)e_s+r_a(S_a)\eta_s,
\qquad \rho(S_a)=\rho(T)-I_r,
$$

and hence

$$
\boxed{L=(e_R+e_s)\rho(T)-e_sI_r+r_a(S_a)\eta_s.}
\tag{1}
$$

The source time in (1) is always the actual completed root $S_a$. It is not replaced by an intermediate nominal-clock root or a root-bracket endpoint. The identity is substituted pointwise into field differences, not differentiated in T; no moving-lower-limit derivative is silently omitted. No derivative of the actual source acceleration occurs.

## Simultaneous q/H comparison and its full jet families

Let $q_0,H_0$ denote the fields of the complete nominal source curve, with its correct negative-label physical jets. At fixed actual root, range and causal ray define

$$
\Delta v=v_a(S_a)-v_c(S_a),\qquad
\Delta a=a_a(S_a)-a_c(S_a).
$$

One concrete exact fixed-root decomposition first replaces the actual source acceleration by the nominal acceleration while keeping actual source velocity fixed, then varies source velocity along $v_\lambda=v_c+\lambda\Delta v$ at nominal acceleration. Thus

$$
d_q=N_q\Delta v,\qquad d_H=N_H\Delta v+L_A\Delta a,
$$

$$
N_q=\int_0^1q_v(v_\lambda)\,d\lambda,\quad
N_H=\int_0^1H_v(v_\lambda,a_c;u_a)\,d\lambda,
\quad L_A=(n_a\cdot u_a)B(n_a,R_a,v_a).
\tag{2}
$$

All derivatives in (2) hold root, range and causal ray fixed, and the physical receiving velocity is $u_a$. The source-A coefficient is exact, but any bound on it must cover the full actual-root/receiving family. The V family and every positive D floor must also be covered. A different replacement order is permissible only with its corresponding complete families.

At fixed receiving velocity $u_a$, use the nominal-clock spatial segment

$$
\gamma_\lambda=x_c(T)+\lambda L,
\qquad
M_q=\int_0^1 q_{0,x}(\gamma_\lambda)\,d\lambda,
\qquad
M_H=\int_0^1 H_{0,x}(\gamma_\lambda,u_a)\,d\lambda.
\tag{3}
$$

The endpoint $x_c(T)+L=x_a(T)-c$ is the receiver for the unshifted nominal curve equivalent to the translated curve at $x_a$. All roots along (3), which may be off the receiving radial ray, belong to the full retained nominal-clock family. The fixed projection direction remains $e_R$, not $\gamma_\lambda/|\gamma_\lambda|$. These are physical-vector spatial derivative matrices; changing the output basis during differentiation without its derivative is not equivalent.

Nominal-clock $q_x$ includes comparison source acceleration; nominal-clock $H_x$ includes comparison source jerk almost everywhere. Piecewise $C^{2,1}$ comparison history suffices with every closed seam and both derivative sides retained. The actual source acceleration enters only through $\Delta a$ and the physical root data. No actual jerk is assumed.

The original E row is receiving-velocity independent. The independently differentiated identity $H_u=q_x$ therefore makes H exactly affine in u on each fixed nominal-clock field. Choose

$$
U=H_{0,u}(x_c(T))=q_{0,x}(x_c(T)),\qquad z=p_a-p_c.
$$

This U does not require intermediate receiving-velocity bounds. The spatial H family (3), however, must retain the actual receiving velocity trial throughout; a nominal u value alone is insufficient.

Set $d=e_R+e_s$ and define

$$
Q=M_qd,\qquad C=M_Hd,\qquad
f_q=-M_qe_sI_r+M_qr_a(S_a)\eta_s+N_q\Delta v,
$$

$$
f_H=-M_He_sI_r+M_Hr_a(S_a)\eta_s
+N_H\Delta v+L_A\Delta a-\delta_E.
\tag{4}
$$

Here $\delta_E$ is the unchanged full comparison residual in the aligned frame. The exact error identities are

$$
\delta q=Q\rho+f_q,\qquad
\delta u=z-Q\rho-f_q,
\qquad
\delta H-\delta_E=C\rho+U\delta u+f_H.
\tag{5}
$$

In the last identity, $\delta H$ means the actual-minus-comparison transformed field difference before residual subtraction. The residual is included only once, through the definition of $f_H$ in (4); equivalently one may define $f_H^0=f_H+\delta_E$ and write $\delta H=C\rho+U\delta u+f_H^0$. These identities retain the exact same source geometry for q and H before taking magnitudes.

## The modified signed receiving matrix

The exact angular-rate difference is

$$
\delta\omega=\frac{z_T-Q_T\rho-f_{q,T}}{r_a}
-\frac{u_{c,T}\rho}{r_ar_c}.
$$

Define

$$
P=U-\frac{(Jp_c)e_T^{\mathsf T}}{r_a}.
$$

Subtracting the intrinsic p equations, including $-\omega_aJz$ and $-\delta\omega Jp_c$, gives the signed three-component system

$$
\boxed{
\begin{pmatrix}\rho\\z\end{pmatrix}'
=K\begin{pmatrix}\rho\\z\end{pmatrix}+g,\qquad
K=\begin{pmatrix}
-Q_R&e_R^{\mathsf T}\\
C-PQ+Jp_c\,u_{c,T}/(r_ar_c)&P-\omega_aJ
\end{pmatrix},\qquad
g=\begin{pmatrix}-f_{q,R}\\f_H-Pf_q\end{pmatrix}.
}
\tag{6}
$$

Thus the transferred Q replaces the old current q column everywhere: the radial row, the $-UQ$ term and the $Q_T$ angular-rate term. Updating only C would not reproduce the actual physical velocity conversion. With the opposite clockwise J convention, every explicit J changes sign; there is no change to the content of (6).

The current source direction $e_s$ in Q and C must be enclosed at the actual root independently of the intermediate nominal-clock directions used inside $M_q,M_H$. Their relationship cannot be replaced by evaluation at a single nominal root. A whole-family over-enclosure may allow every independent combination; favorable correlations need proof.

## The common radial integral may be combined before bounding

Both transformed fields contain the same $I_r$ and the same $r_a(S_a)\eta_s$. Their algebraic correlation is known, unlike the signs of arbitrary source errors. Define the exact $3\times2$ matrices

$$
T_X=\begin{pmatrix}-e_R^{\mathsf T}M_q\\M_H-PM_q\end{pmatrix},\qquad
T_V=\begin{pmatrix}-e_R^{\mathsf T}N_q\\N_H-PN_q\end{pmatrix},\qquad
T_A=\begin{pmatrix}0_{1\times2}\\L_A\end{pmatrix}.
$$

The first row of $T_A$ is the zero $1\times2$ row. Substitution of (4) into (6) gives the complete forcing in a particularly useful form:

$$
\boxed{g=-T_Xe_sI_r+T_Xr_a(S_a)\eta_s
+T_V\Delta v+T_A\Delta a-\begin{pmatrix}0\\\delta_E\end{pmatrix}.}
\tag{7}
$$

For example, the lower radial-memory coefficient is exactly $-(M_H-PM_q)e_s$. Bounding $M_H$ and $PM_q$ separately is valid but may discard this cancellation. Because P is constant along the mean-value parameter for the fixed receiving state, $M_H-PM_q$ can also be enclosed as the average of $H_x-Pq_x$ over the same spatial path. Likewise $N_H-PN_q$ can be averaged over the common fixed-root V path in (2). This requires full joint enclosures, not subtraction of unrelated nominal-point numbers.

Choose a cell-constant metric $S_\nu=\operatorname{diag}(\nu,1,1)$, $\nu>0$, and put $W=|S_\nu(\rho,z)|$. Let $J_r\ge\int_{S_a}^T|\delta u_R|$, $R_{a,s}\ge r_a(S_a)$, $\Psi\ge|\eta_s|$, and let complete physical source bounds be

$$
S_V=s_v+V_{c,s}\Psi,\qquad S_A=s_a+A_{c,s}\Psi.
$$

Here $s_v,s_a$ are intrinsic physical velocity/acceleration errors, and the nominal-vector angular terms are mandatory. With $|\delta_E|\le\delta$, a valid whole-family forcing bound is

$$
F\ge
\sup\|S_\nu T_Xe_s\|\,J_r
+\sup\|S_\nu T_X\|\,R_{a,s}\Psi
+\sup\|S_\nu T_V\|\,S_V
+\sup\|S_\nu T_A\|\,S_A+\delta.
\tag{8}
$$

Every supremum covers the corresponding complete trial, actual-root, offset and nominal-clock families. A componentwise forcing bound followed by a Euclidean bound is another valid option. No sign of $I_r$, $\Delta v$, $\Delta a$ or $\eta_s$ is assumed. The use of a shared scalar $I_r$ in (7) is exact same-history algebra, not a presumed cancellation between independent errors.

For a separately enclosed logarithmic norm $\mu$ of $S_\nu K S_\nu^{-1}$, the squared-norm argument gives $D^+W\le\mu W+F$, with the same endpoint, whole-cell and metric-reset formulas as the earlier signed theorem. The entire current $-\omega_aJ$ cancels only because the p weights agree; the rank-one term in P remains. All bounds are frozen on a prescribed closed trial and must strictly improve it before acceptance.

The direct point-Jacobian opposite-diagonal obstruction of the earlier reference does not automatically apply to (6): Q now includes a transferred delayed-source contribution and is not $Ue_R$. That change does not establish a negative logarithmic norm or physical contraction. Any apparent improvement of the current matrix must be paid for by the complete radial-history and angular forcing (7)–(8).

## The radial primitive must use physical velocity error

For a receiving cell $[T_0,T_1]$ and complete actual source guard $S_a\in[S_-,S_+]$ with $S_+<T_0$, let $d_R(t)$ be an admitted whole-bin bound for the **physical** intrinsic error $|\delta u_R(t)|$ on the earlier history. Retain the original supplied-history density on every needed negative-time interval. Then

$$
J_r(T)\le J_{\mathrm{past}}+(T_1-T_0)E_R,
\qquad
J_{\mathrm{past}}=\int_{S_-}^{T_0}d_R(t)\,dt,
\tag{9}
$$

where $E_R$ is the proposed physical radial-velocity error trial on the entire receiving cell. Exact partial-bin lengths or narrower certified root support can improve (9). Every intervening bin and both closed seam faces remain represented, with no monotonicity assumption. An older numerical guard such as $S_->-6$ can be reused only if its complete reach is still certified for the new application.

The old source-radius theorem's current metric bounded physical radial velocity. Here W bounds radius and transformed p. The inference $|\delta u_R|\le W$ is generally false. Equation (5) instead gives

$$
|\delta u_R|\le W+|Q_R|W/\nu+|f_{q,R}|.
\tag{10}
$$

With $b_q\ge|(M_qe_s)_R|$ and

$$
c_q\ge \|e_R^{\mathsf T}M_q\|R_{a,s}\Psi
+\|e_R^{\mathsf T}N_q\|S_V,
$$

the whole-cell reconstruction must check

$$
(1+|Q_R|/\nu)W_{\sup}
+b_q[J_{\mathrm{past}}+hE_R]+c_q<E_R,
\qquad h=T_1-T_0.
\tag{11}
$$

The constants in (11) are complete trial-family upper bounds, and the other current physical trials and angular primitive must close too. This is a self-consistency obligation, not a substitution of a future endpoint p error for an unknown physical density. A sufficient algebraic elimination, when $hb_q<1$, is

$$
\sup|\delta u_R|
\le\frac{(1+|Q_R|/\nu)W_{\sup}+b_qJ_{\mathrm{past}}+c_q}{1-hb_q},
\tag{12}
$$

provided all coefficients and angular/source bounds were already fixed on the prescribed trial cylinder. This eliminates only the radial-velocity reconstruction inequality; it does not itself solve the coupled W, radial-primitive and angular-primitive trial problem. If $hb_q\ge1$, this elimination proves nothing; it is not a physical obstruction.

Alternatively, retain the earlier independently valid untransferred q reconstruction to bound physical velocity on the current cell:

$$
e_u\le W+C_qW/\nu+C_q(s_r+r_{c,s}\Psi)+V_q(s_v+V_{c,s}\Psi).
\tag{13}
$$

That norm also bounds physical radial velocity and can furnish the density in (9), even while the signed receiving recurrence uses (6). Taking the minimum of independently valid physical bounds is legitimate. Neither option permits dropping the original physical radial-velocity record.

The angle primitive still integrates the actual physical angular-rate error over the entire source-to-reception interval, including the current trial:

$$
|\delta\omega|\le e_u/r_a+|u_{c,T}|\,|\rho|/(r_ar_c).
$$

A p-norm angular surrogate would make both $J_r$ and $\Psi$ invalid. Physical acceleration errors are reconstructed through the original E response with its full unsuppressed source-A input and comparison residual, then stored on every completed source bin. The reduced source-A coefficient in H does not replace that physical A inventory.

## Root domains and information that is not removed

The original complete Cartesian receiver/source error balls remain in the coefficient and root proof. In particular source radius error $s_r$ still bounds the actual source radius by $r_{c,s}+s_r$, enters the original Cartesian position-offset ball, and is retained in physical history and optional reconstruction (13). Moving its recurrence contribution into a current signed term does not authorize shrinking or deleting its root enclosure.

Every fixed-root V/A family, translated spatial input, actual source direction at $S_a$, intermediate nominal-clock root, full comparison jerk piece and old physical error bin remains in scope. The auxiliary paths are comparison devices and need not be mirror curves themselves. The actual partner/no-positive-self census comes from the unchanged complete subfield stopping hypothesis; auxiliary ordinary branches and their guards require their own full enclosures. No source beyond a currently convenient bin is discarded.

## Exact controls and falsifiers

1. **Static separated mirror field inputs.** At one reception compare complete constant mirror histories of positive radii $r_a,r_c$, with zero source/receiving velocities and accelerations. They are prescribed field controls, not E solutions. Here $I_r=0$, $\eta_s=0$ and $e_s=e_R$, so $L=2\rho e_R$. Direct evaluation gives $\delta q=-\rho e_R/(2r_ar_c)$ and $\delta H=\rho(r_a+r_c)e_R/(4r_a^2r_c^2)$. The nominal spatial segment has range $2(r_c+\lambda\rho)$; its averaged derivatives give $M_qe_R=-e_R/(4r_ar_c)$ and $M_He_R=(r_a+r_c)e_R/(8r_a^2r_c^2)$, reproducing both differences by multiplying by $2\rho$. This tests the negative-source sign and simultaneous current transfer.
2. **Nonzero radial-memory identity.** For a prescribed scalar difference $\rho(t)=a+bt$ on a positive-radius source window, $I_r=b(T-S_a)$ and $\rho(S_a)=\rho(T)-I_r$ exactly. Omitting the integral fails whenever $b\ne0$ and the delay is positive.
3. **Frame mismatch at equal radius.** If $\rho(S_a)=0$, then $-c=r_a(S_a)\eta_s$ exactly. Replacing that actual radius factor by the nominal radius without equality or an error allowance is not generally justified. The factor $r_{c,s}+s_r$ bounds both cases safely.
4. **Physical conversion.** Even at $z=0$, equation (5) gives $\delta u=-Q\rho-f_q$, which need not vanish or be bounded by the arbitrarily scaled radial component $\nu|\rho|$. Thus W alone is not a valid radial-velocity density. Equations (10)–(13) supply the required check.
5. **Recovery of the earlier signed theorem.** Before using (1), retain $L=\rho e_R-c$ in both fields. The same derivation reduces exactly to the frozen sequential current/source decomposition and its full source forcing. The extension changes the distribution of a known same-history spatial input, not the E equation or source jets.

Falsifiers are a wrong mirror-source sign; replacement of $S_a$ by a nominal intermediate source in (1); a missing physical radial-error bin; using transformed W as physical radial velocity; omission of current-cell contributions to either primitive; substitution of a nominal source radius for the actual one without a bound; source-root balls narrowed solely because a forcing term was transferred; omission of q's transferred $Q_T$ or $-UQ$ terms; an invalid correlation between different inputs; or removal of physical source A. A failed sufficient trial or loss of a logarithmic-norm advantage is a limitation of this comparison method, not a physical event.

## Frozen antecedent identities and disposition

The identities below were measured with `shasum -a 256` before this source was written:

| Antecedent | SHA-256 |
| --- | --- |
| [Old signed source-radius theorem](maxwell-e-first-event-signed-source-radius-theorem.md) | `d67903474126043ceee290b8c8e4f06399b0198479b35138eff7751547d01f6d` |
| [Independent signed current reference](maxwell-e-first-event-neutral-signed-independent-reference.md) | `4ed2dacb8165a0bd807405153effe7891a0026212ed57e4f9208f65623c4dc92` |
| [Independent current reconciliation](maxwell-e-first-event-neutral-signed-independent-reconciliation.md) | `b20035968671ec30a857c938514cce0213842bbd6bba368620074482600a9e39` |

Only this new assigned independent source is written. The worker's new transformed-source theorem and implementation were not read before freeze. No numerical instrument or target was used. The algebraic extension and its exact controls are derived; complete coefficient receipts, trial closure, numerical benefit and any new actual E interval remain to be established separately.
