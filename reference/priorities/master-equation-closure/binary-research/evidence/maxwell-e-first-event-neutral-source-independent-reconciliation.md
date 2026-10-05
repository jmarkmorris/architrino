# Independent reconciliation of transformed source-radius transport

## Freeze and mathematical verdict

**Grade: derived mathematical reconciliation, 2026-10-05.** The [independent reference](maxwell-e-first-event-neutral-source-independent-reference.md) was frozen at SHA-256 `7b600695e1f5c2b95672dba69edcd1740ffab3122c521845c92570268ab18285` before the [worker source theorem](maxwell-e-first-event-neutral-signed-source-theorem.md), SHA-256 `1c825cf5f835964d5b101d0607c65a962d4c17bb42fba9cbed1dff854a85a8e2`, was read. The identities were measured with `shasum -a 256`. Neither source is modified here. No implementation or target receipt was inspected.

The worker's same-history geometry, simultaneous q/H transfer, actual source-radius angular factor, full physical radial-error integral and signed receiving substitutions agree with the independent derivation. Its use of a prescribed physical velocity trial in the current part of the integral is valid. The phrase retaining the prior physical velocity conversion needs the precise qualification below: the new transferred q column, or the complete original untransferred q bound, must enter reconstruction. A transformed-p norm alone never supplies the physical radial density.

## Exact correspondence

Use the counterclockwise J convention of the independent source; the worker's clockwise J is its negative. Let $e_R=n_c(T)$, $e_s=n_c(S_a)$, $\rho=r_a-r_c$ and $I_r=\int_{S_a}^T\delta u_R$. Both sources derive exactly

$$
L=(e_R+e_s)\rho-e_sI_r+r_a(S_a)\eta_s.
$$

The worker's $A_q,A_H$ are the independent source's $M_q,M_H$, so its transferred columns are

$$
Q_*=M_q(e_R+e_s),\qquad C_*=M_H(e_R+e_s).
$$

Its scalar forcing terms bound the norms of

$$
f_q^{\mathrm{vec}}=-M_qe_sI_r+M_qr_a(S_a)\eta_s+d_q,
$$

$$
f_H^{\mathrm{vec}}=-M_He_sI_r+M_Hr_a(S_a)\eta_s+d_H-\delta_E,
$$

where $d_q,d_H$ retain all fixed-root physical V/A offsets. The worker's factors $R_s+s_r$ correctly bound the actual source radius in the angle term. Its source-direction column bounds may use $\|M_qe_s\|,\|M_He_s\|$ when separately enclosed, or the complete spatial operator norms otherwise. The actual direction at $S_a$ must remain covered independently of intermediate nominal-clock directions. Agreement between directions at one nominal point is insufficient.

Substituting these Q and C columns everywhere in the prior signed matrix gives exactly the independent reference's current matrix. In particular the radial row, $-UQ_*$ term and $Q_{*,T}$ angular-rate contribution all change. The receiving U term, current skew cancellation, rank-one angular-rate term and physical comparison residual keep their prior meanings. There is no new actual-jerk premise.

The worker takes norms of the q and H forcing separately, then uses the older full receiving forcing estimate. This is valid. The independent reference also records the optional combined coefficient $M_H-PM_q$, where $P=U-(Jp_c)e_T^{\mathsf T}/r_a$: the same scalar $I_r$ enters lower forcing through $-(M_H-PM_q)e_sI_r$. That extra algebraic cancellation is not required for the worker theorem. It may be used only with a complete joint coefficient enclosure. Combining matrices averaged along a shared path before taking norms is justified by that shared path; unrelated nominal evaluations do not provide such an enclosure.

## Required physical velocity reconstruction

After transfer the exact identity is

$$
\delta u=z-Q_*\rho-f_q^{\mathrm{vec}}.
$$

For $W=|(\nu\rho,z_R,z_T)|$, the transferred reconstruction is therefore

$$
\boxed{e_u\le W+\|Q_*\|W/\nu+f_q.}
\tag{1}
$$

Since $|e_R+e_s|\le2$, a sufficient full-family estimate is $\|Q_*\|\le2C_q$, giving

$$
e_u\le W+2C_qW/\nu+f_q.
\tag{2}
$$

The earlier signed-current theorem instead used $e_u\le W+C_qW/\nu+f_q^{\mathrm{old}}$, with the source-radius contribution still inside its old source forcing. It is generally invalid to combine its old single-$C_q$ radial coefficient with the **new** transferred $f_q$. A separately certified sharper bound on $\|Q_*\|$ can of course replace $2C_q$.

The static mirror field control makes the coefficient distinction explicit. For nearby positive radii with $e_s=e_R$, $M_qe_R=-e_R/(4r_ar_c)$ but $Q_*=-e_R/(2r_ar_c)$. In the coincident-radius limit the transferred column is twice the current spatial radial column. This control is a field identity, not an asserted E equilibrium.

There is another fully valid option: retain the complete old untransferred reconstruction

$$
e_u\le W+C_qW/\nu
+C_q(s_r+R_s\Psi)+V_q(s_v+V_s\Psi).
\tag{3}
$$

Equation (3) may coexist with the new signed recurrence because it is a separate bound on the same physical velocity error, with its original source-radius term retained. Taking the minimum of two independently valid whole-cell bounds is safe. Mixing only favorable pieces of (1) and (3) is not.

The worker theorem explicitly retains the exact $\delta u$ identity, so (1) supplies the necessary precise reading of its physical conversion. This note identifies a mandatory implementation check, not a claim that a particular implementation has made the error. No driver was inspected here.

## Physical trial density versus transformed error density

Let a receiving cell be $[T_0,T_1]$ and let a prescribed whole-cell physical velocity error trial be $E_u$. Let the complete source guard satisfy $S_a\in[S_-,S_+]$ with $S_+<T_0$. From the definition of the norm,

$$
|\delta u_R|\le|\delta u|\le E_u
$$

on the trial cylinder. Hence the worker's current contribution

$$
I\le\int_{S_-}^{T_0}d_R(s)\,ds+(T_1-T_0)E_u
\tag{4}
$$

is valid, provided every earlier density $d_R$ is a retained physical radial-velocity error bound and all closed nonmonotone/source-past bins and exact lengths are included. A retained full physical velocity-norm error may conservatively serve as $d_R$.

The induction must then reconstruct physical velocity over the **whole receiving cell** using (1), (2) or (3), and strictly improve $E_u$ before acceptance. The integral and coefficient/angle bounds are first frozen using that prescribed trial. This is an ordinary simultaneous bootstrap; it does not infer the trial from an endpoint p estimate.

By contrast, substituting W itself for $E_u$ or $d_R$ is invalid, because W measures radius and p rather than physical velocity. Substituting an improved endpoint W to shrink (4) before proving its whole-cell physical conversion is also invalid. If a radial-component-specific trial is used, the independent reference's equations (10)–(12) give the corresponding q-aware reconstruction; its sufficient denominator $1-hb_q$ controls that reconstruction only and does not independently solve the coupled trial problem.

The same physical conversion is needed for the current contribution to the source-to-reception angular primitive. Every completed bin retains physical X/V/A and source-angle information. The full original E acceleration reconstruction, with all source radius and physical source acceleration errors, remains valid and may be kept unchanged. Reduced H source-A coefficients do not license reduced physical acceleration errors.

## Remaining implementation obligations and limits

The theorem is valid only with the original full Cartesian source/receiving balls and the complete fixed-offset nominal-clock families. The transfer changes how their already enclosed response is used in the recurrence; it does not shrink their root guards. All source jets retain mirror signs, comparison jerk pieces remain complete, and the positive radius premise covers every history bin used by the scalar fundamental-theorem identity. The actual source time in the radial integral is not replaced by an intermediate nominal root.

The independent direct-point opposite-diagonal restriction from the earlier current theorem is not automatically a restriction on every transferred matrix: the source contribution has moved into $Q_*$. Any benefit must still survive the physical radial-memory, angular and V/A forcing. No negative contraction, numerical budget improvement or first-unit event follows from the algebra alone.

A missing factor in (1), physical-U trial not strictly improved on the whole cell, transformed W used as a physical radial density, an endpoint-only primitive, discarded source A, an incomplete source direction or translated root family, or a current angular term left with the old Q column falsifies the corresponding application. Only this new reconciliation source was authored after the independent freeze; all earlier sources remain unchanged. No numerical target or instrument was run.
