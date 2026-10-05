# Independent reference for component source errors after the E transformation

## Blind derivation boundary

**Grade: derived comparison reference, not an event or stability result.** This reference was derived from the admitted exact transformation, complete-history error and signed-current theorems, the existing source-components-v3 implementation, and their complete geometry rules. The new neutral-component-source theorem and its implementation were not read before this reference was frozen. The Ramon E. Moore role is a checking lens, not mathematical authority.

The selected equation and physical preparation are unchanged, with $K=c_f=1$ and the original complete conditional root census. Write $p=u+q$, $p'=H$, where $u$ is physical receiving velocity and

$$
q=\frac{\sigma(v-n)}{RD},\quad
D=1-n\cdot v,\quad \sigma=-1,\qquad
H=G+L_0+(n\cdot u)Ba.
$$

Here $v,a$ are the signed physical transmitter velocity and acceleration at the completed source root. In particular

$$
q_v=-DB,\qquad H_a=(n\cdot u)B
$$

are fixed-root source derivatives, not replacements of the original physical acceleration row $E=G+Ba$. The original comparison residual remains the transformed residual under the exact same complete curve/root binding.

All old full Cartesian source balls, receiving cylinders, physical norm bounds, source-time guards, $R,D$ floors and root inventories remain in force. Component bounds below add information inside those established domains. They do not shrink the families over which any derivative is certified.

## Exact source decomposition and angular transport

Fix a receiving time and rotate the actual entire field tuple by the single constant rotation aligning its receiving radial ray with the nominal receiving radial ray. Let $e,f$ be the nominal source radial and counterclockwise tangential basis at the actual completed source time; let $\widetilde e,\widetilde f$ be the aligned actual source basis. The complete source-to-receiver angular inventory gives

$$
\|\mathcal R-I\|\le\psi,\qquad
\widetilde e=\mathcal Re,\quad\widetilde f=\mathcal Rf,\qquad
\psi=\min\{2,\Psi\},
\tag{1}
$$

where $\Psi$ bounds the absolute angular difference. Using $\Psi$ directly is also safe. Every closed intervening bin, seam side, finite supplied-past segment and prescribed current receiving trial needed for this angular bound must be included.

Suppose the physical intrinsic source component differences obey

$$
|\Delta v_r|\le s_{v,r},\quad|\Delta v_t|\le s_{v,t},\qquad
|\Delta a_r|\le s_{a,r},\quad|\Delta a_t|\le s_{a,t}.
$$

The exact physical vector decomposition is

$$
v_a-v_c=\widetilde e\,\Delta v_r+\widetilde f\,\Delta v_t
+(\mathcal R-I)v_c,
\tag{2}
$$

and likewise for $a$. The last term uses the nominal physical source vector expressed in the nominal basis. Thus component errors alone do not bound the Cartesian vector error when $\Psi\ne0$. Physical acceleration components are projections of physical acceleration; they are not derivatives of intrinsic velocity components and contain no omitted basis-rate correction.

For the mirrored negative label, the tuple and source basis must be transformed consistently. Absolute coefficient bounds may be unchanged under simultaneous sign reversal, but the E, q and H derivatives must still use the actual negative-label physical V/A and selected polarity.

Let $L$ be any source derivative matrix, enclosed over its complete mean-value family. Let $N\ge\|L\|$, $c_r\ge|Le|$, $c_t\ge|Lf|$ be valid simultaneous family bounds. Then

$$
|L\widetilde e|\le\widehat c_r
:=\min\{N,c_r+N\psi\},\qquad
|L\widetilde f|\le\widehat c_t
:=\min\{N,c_t+N\psi\}.
\tag{3}
$$

The first bound in each minimum uses unit length; the second uses (1). Consequently

$$
|L(v_a-v_c)|
\le\widehat c_r s_{v,r}+\widehat c_t s_{v,t}
+NV_s\psi,
\tag{4}
$$

with $V_s\ge|v_c|$. Replace V by A for acceleration. If an independently valid full intrinsic norm $s_v$ is retained, the older bound $N(s_v+V_s\psi)$ is also valid. The minimum of that old bound and (4) is safe. The component rectangle need not be contained in the old norm ball; the actual error lies in their intersection, and taking the smaller of independently proved upper bounds uses that fact without assuming a nonexistent rectangle inclusion.

The same derivation applies to a scalar output row $\ell$ of $L$: use $N_\ell\ge|\ell|$, $c_{\ell,r}\ge|\ell e|$, $c_{\ell,t}\ge|\ell f|$. This produces separate receiving radial and tangential output bounds. Each can also be capped by any valid full output norm bound for the same error.

## q and H source forcing over the unchanged complete families

The sequential comparison must remain literal: freeze the actual source-position offset at its actual completed root; translate the nominal source path by that constant; replace actual V/A at that fixed root using full offset families; compare receiving position minus the frozen offset along the whole nominal-clock family; finally compare receiving velocity for H. Every intermediate nominal clock must remain inside the complete retained guard. Nominal-clock q differentiation uses nominal source A; nominal-clock H and original E differentiation may use nominal source J. No actual source jerk is assumed.

For $\Phi=q,H$, denote the old full spatial derivative norm by $C_\Phi$, the fixed-root source-V norm by $V_\Phi$, and the fixed-root source-A norm by $A_\Phi$ where present. In particular $A_q=0$ and $A_H$ bounds $(n\cdot u)B$ over the entire prescribed receiving/source family, not at a nominal projection.

Let $\mathcal X_\Phi$ be the independently valid source-position forcing already supplied by the chosen comparison. There are two distinct admissible versions:

- For the ordinary source-offset triangle, $\delta Y=\widetilde e\,\Delta r+(\mathcal R-I)Y_c$ gives $\mathcal X_\Phi=\min(C_\Phi,c_{\Phi,S}+C_\Phi\psi)s_r+C_\Phi R_s\psi$, where $c_{\Phi,S}$ bounds the spatial source-ray column over the full nominal-clock family.
- If the separately admitted signed same-history radius transport is used, retain its expression $\mathcal X_\Phi=C_{\Phi,S}I+C_\Phi(R_s+s_r)\psi$, with the complete physical radial-velocity error integral $I$. That integral multiplies the nominal source ray, so no extra angular inflation of $C_{\Phi,S}$ is required. Its angular term uses the actual radius bound $R_s+s_r$. Do not mix the two position identities or delete either one's history terms.

Using (3) for the V and A matrices, a component-based vector-norm source forcing is

$$
f_q^{\rm comp}=\mathcal X_q
+\widehat V_{q,r}s_{v,r}+\widehat V_{q,t}s_{v,t}
+V_qV_s\psi,
\tag{5}
$$

$$
f_H^{\rm comp}=\delta+\mathcal X_H
+\widehat V_{H,r}s_{v,r}+\widehat V_{H,t}s_{v,t}
+V_HV_s\psi
+\widehat A_{H,r}s_{a,r}+\widehat A_{H,t}s_{a,t}
+A_HA_s\psi.
\tag{6}
$$

Here $\delta$ is the unchanged independently bounded original E residual. These are upper bounds on vector errors, not signed cancellations. Set $f_\Phi=\min(f_\Phi^{\rm old},f_\Phi^{\rm comp})$ when the old norm forcing is valid for the same physical error and domain. All delayed physical A remains in (6), even if one projected acceleration column happens to vanish in a known control.

Applying the output-row form of (4) and the corresponding spatial row gives source bounds $f_{q,r},f_{q,t},f_{H,r},f_{H,t}$. Include the residual's projected bounds, or its full norm if components are unavailable. Cap each by its valid full source-vector norm $f_\Phi$. Source directions in these column products are the nominal directions at the actual source time, independently enclosed; directions available only at intermediate nominal clocks cannot silently replace them.

## Signed-current forcing and physical receiving records

Keep the admitted signed-current matrix, its independent coefficient combinations, the equal metric on the two p coordinates, and its certified logarithmic-norm bound unchanged. Let $y=(\nu\rho,z_r,z_t)$, with fixed cell metric $\nu>0$ and whole-cell bound $|y|\le W$. The exact source vectors $b_q,b_H$ obey the component bounds just derived, and the forcing remains

$$
g=
\begin{pmatrix}
-\nu b_{q,r}\\
b_H-Ub_q-(Jp_c)b_{q,t}/r_a
\end{pmatrix}.
\tag{7}
$$

This identity retains the clockwise $J$, the $Q_t$ angular term in the current matrix and the nominal-p rank-one term. One safe refinement of the scalar forcing is

$$
F_{\rm comp}=
\left\{(\nu f_{q,r})^2+
\sum_{j=r,t}\left[
f_{H,j}+|U_{jr}|f_{q,r}
+\left|U_{jt}+(Jp_c)_j/r_a\right|f_{q,t}
\right]^2\right\}^{1/2},
\tag{8}
$$

with every absolute coefficient bounded over all admitted combinations. The addition inside the last absolute value is legitimate because those two terms multiply the same source component in (7); it is not a cancellation between independently unknown source errors. The previous full-norm forcing is also valid, so take $\min(F_{\rm old},F_{\rm comp})$. A more expensive exact corner bound is possible by maximizing the norm of (7) over the component rectangle and all coefficient families; it is not required for (8).

For physical receiving velocity, the exact intrinsic relation is

$$
\delta u_j=z_j-Q_j\rho-b_{q,j}.
$$

If $\overline Q_j$ bounds $|Q_j|$ over the complete current family, Cauchy-Schwarz in the retained metric gives the valid whole-cell component bound

$$
e_{u,j}\le
\min\left\{
e_u^{\rm old},\
W\sqrt{1+\overline Q_j^{\,2}/\nu^2}+f_{q,j}
\right\}.
\tag{9}
$$

The weaker $W+\overline Q_jW/\nu+f_{q,j}$ is also valid. These are physical velocity components, not p components. The full old physical norm/cylinder guard is retained; a smaller component record does not authorize reducing it mid-proof.

Physical acceleration must be reconstructed from the original E field. That field has no direct receiving-velocity dependence. Let $C_{E,j}$ bound its appropriate current spatial column projected onto receiving component $j$, and let $f_{E,j}$ be its source forcing built exactly as in (6), now with the full physical $E_a=B$, its source V matrix, and the original residual. Then

$$
e_{A,j}\le
\min\left\{
e_A^{\rm old},\
C_{E,j}W/\nu+f_{E,j}
\right\}.
\tag{10}
$$

If same-history radius transport has not been separately derived for E, retain the original conservative E source-position term and current column. A transformed H bound is not an acceleration record. In particular its factor $n\cdot u$ cannot be placed in the physical E source-A coefficient.

Receiving alignment is essential in (9)–(10). The constant rotation chosen at this reception makes projections of the aligned actual V/A onto the nominal receiving basis exactly their own intrinsic physical components. No additional receiving phase error is needed for this algebraic reconstruction. A projection of unaligned Cartesian differences would require such an error. Differentiating the moving intrinsic frame is a separate operation, already accounted for by the admitted skew and angular-rate terms; instantaneous alignment does not erase those terms.

Store the new components from the whole-cell W and all whole-cell source inventories. Endpoint W seeds the next receiving cell only. Rebuild later source and angular histories from completed whole cells and all seam sides. The current receiving angular inventory must use its prescribed trial until the cell is accepted; it cannot be made smaller using the improved endpoint to certify itself. Strict trial improvement, complete roots and all old norm guards remain required.

## Exact known controls to precede any implementation target

These controls were derived algebraically here. They are coefficient and error-transport controls, not asserted trajectories.

1. **Stationary tuple.** At $n=(1,0)$, $R=2$, $v=a=u=0$, $\sigma=-1$, direct differentiation gives $q_v=\operatorname{diag}(0,-1/2)$, $H_v=\operatorname{diag}(-1/4,0)$ and $E_a=\operatorname{diag}(0,1/2)$, while $H_a=0$. The $H_v$ result includes the source-V derivative of $L_0$: $G_v=\operatorname{diag}(-1/2,1/4)$ and $(L_0)_v=\operatorname{diag}(1/4,-1/4)$. With $\psi=0$, source-V component bounds $(100,3)$ give q forcing $3/2$ and H forcing $25$; source-A bounds $(1000,4)$ give physical E forcing $2$ and transformed H forcing zero. This tests retained delayed A and the distinction between E and H.
2. **Receiving projection.** Keep $n,R,v,a$ above and take $u=(1/3,0)$. Then $H_a=\operatorname{diag}(0,1/6)$; source-A tangential error $4$ gives transformed norm $2/3$, whereas physical E still gives $2$. A nominal zero projection is not a valid bound if the prescribed receiving family contains this tuple.
3. **Source rotation.** For $L=\operatorname{diag}(0,-1/2)$, rotate the actual source radial ray to $(3/5,4/5)$, retain nominal $e=(1,0)$ and use $\Psi=1$. A radial intrinsic error $3$ maps to norm $6/5$. The angularly inflated column cap is $1/2$, giving upper bound $3/2$; using the nominal zero radial column alone would give the false bound zero. A simultaneous quarter-turn of input/output bases preserves every correct scalar bound.
4. **Joint receiving reconstruction.** Let $\nu=4$, $W=4$, $Q_r=3$, and $f_{q,r}=1/2$. The uncapped bound (9) is $11/2$. It is attained by $y=(-12/5,16/5,0)$ and $b_{q,r}=-1/2$: then $\rho=-3/5$ and $z_r-Q_r\rho-b_{q,r}=11/2$. This tests the metric and physical conversion independently of any coefficient implementation.
5. **Signed forcing algebra.** For the synthetic current tuple $\nu=1$, $U=\operatorname{diag}(-1/4,1/4)$, $p_c=(0,2)$, $r_a=2$, and source component bounds $(f_{q,r},f_{q,t},f_{H,r},f_{H,t})=(2,3,5,7)$, formula (8) is $\sqrt{2181}/4$. The vertex $(b_{q,r},b_{q,t},b_{H,r},b_{H,t})=(2,-3,5,7)$ attains it in (7). This is a matrix-algebra control, not an admissible physical tuple or a field-family certificate.
6. **Norm cap and guards.** Whenever an old bound is smaller, the new reported bound must equal at most that old bound, while the old full source/receiving/root domains remain unchanged. Negative budgets, absent physical-A fields, missing source-direction coverage or incomplete closed source windows must be rejected or remain unresolved, not converted to zero.

An independently authored checker may evaluate these controls first and record their exact answers before testing a new implementation. No checker or target was run for this reference. Shared helpers or fixture replay would not independently validate the mathematical identities.

## Falsifiers and provenance

The component refinement fails if (2) omits nominal-vector angular transport, if nominal source columns are used without (3), if coefficient families fail to contain all actual-offset and nominal-clock paths, if physical A is replaced by H or actual J is presumed, or if stored output components are projected in an unaligned receiving frame. It also fails if endpoint rather than whole-cell W enters future history, or if a component gain silently changes a full norm/root guard. The minimum operation is valid only between two independently valid bounds for the identical quantity on the identical domain.

The old full-norm theorem remains a safe fallback. None of these inequalities establishes a first unit event, stability, completion of a numerical prefix, or practical numerical advantage.

Source identities measured with shasum -a 256 before this reference:

| Antecedent | SHA-256 |
| --- | --- |
| Exact neutral transformation | 9d743f67f2ac11cf1293ee557cb1313affb8d3cbdb96c31255946b6ad1181676 |
| Complete-history neutral error theorem | 8e0694c894911e1d2af379a9e56b53381246a93bdd9f54d5d09f8b58c4c54838 |
| Full signed-current theorem | 3f10ceb380f6631b6f5a8c7f612ddd15603285c82c18166aa68a15ef5ca4da5d |
| Existing source-components-v3 | 9015f95bf54dbe1da17b8b62c427454f7c0e85fe7205bed1fb4cd21139f3011b |
| Existing signed source-radius theorem | 1c825cf5f835964d5b101d0607c65a962d4c17bb42fba9cbed1dff854a85a8e2 |
| Existing nominal receiving derivative theorem | fe5ce84e63d3fbca0724b35d58f9c33a661bb215d530bb5005a3e0bd9aa80fd5 |

Only this new independent reference is authored. Freeze and report its identity before reading the new component-source subject; any later reconciliation must disclose that reading and preserve these bytes.
