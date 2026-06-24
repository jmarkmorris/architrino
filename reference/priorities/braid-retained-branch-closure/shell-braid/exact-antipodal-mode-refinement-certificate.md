# Exact-Antipodal Mode-Refinement Certificate

Promotion status: `priority-only`. This packet separates a finite-mode $M=3$ proof failure from a genuine exact-antipodal obstruction. It applies after a support-complete $M=3$ corrector has closed the range equation as far as its coefficient space allows, but before antipodal relaxation is opened.

The certificate is local to one support-complete root ledger, one residual norm, one equal-period/gauge convention, and one exact-antipodal Fourier refinement sequence. It does not retain a branch.

---

## 1. Nested Exact-Antipodal Spaces

Let $X_M$ denote the exact-antipodal coefficient space at mode order $M$, after equal-period and gauge rows are eliminated. The refinement spaces are nested:

$$
X_3\subset X_4\subset X_5\subset\cdots\subset X_\infty.
$$

For a support-complete ledger $\mathcal{A}_{\eta}$, define the residual map

$$
F_M:X_M\to\mathcal{E}_{\eta},
$$

where $F_M$ contains the same weighted tangential, curvature, action-scale, and curl rows declared by [support-complete-m3-corrector-system.md](support-complete-m3-corrector-system.md). The residual row must be evaluated on the same support-complete root ledger when comparing $M$ and $M+1$.

Assume the $M$-row corrector has produced an enclosed point $x_M^*\in X_M$ and a residual

$$
r_M=F_M(x_M^*).
$$

Let

$$
A_M=DF_M(x_M^*):X_M\to\mathcal{E}_{\eta},
$$

and let $P_M$ be the weighted cokernel projector used by the $M$-row corrector:

$$
P_MA_M=0.
$$

The unresolved finite-mode defect is

$$
c_M=P_Mr_M.
$$

If $c_M$ is already below the dynamics tolerance after tail, discretization, and root errors are included, the row is not a mode-refinement problem; it is a support-complete candidate. This packet is used only when $c_M$ remains too large.

---

## 2. New Exact-Antipodal Columns

Let $H_{M+1}$ be a complement of $X_M$ inside $X_{M+1}$:

$$
X_{M+1}=X_M\oplus H_{M+1}.
$$

The new exact-antipodal columns are

$$
B_{M+1}
=
P_M
DF_{M+1}(x_M^*)\big|_{H_{M+1}}
:
H_{M+1}\to P_M\mathcal{E}_{\eta}.
$$

These are not midpoint-relaxation columns. They preserve exact antipodality and test whether the apparent obstruction is only a missing higher Fourier correction.

The first-order best new-mode correction is

$$
h_{M+1}^{\dagger}
=
-B_{M+1}^{\dagger}c_M,
$$

with first-order remaining cokernel residual

$$
c_{M+1}^{\mathrm{lin}}
=
\left(I-B_{M+1}B_{M+1}^{\dagger}\right)c_M.
$$

The new modes are linearly relevant when

$$
\|c_{M+1}^{\mathrm{lin}}\|
\le
\theta_{\mathrm{lift}}\|c_M\|,
\qquad
0\le\theta_{\mathrm{lift}}<1,
$$

and

$$
\|h_{M+1}^{\dagger}\|\le\rho_{M+1}^{\mathrm{chart}}.
$$

Here $\rho_{M+1}^{\mathrm{chart}}$ is the smallest mode-refinement trust radius that preserves root brackets, Jacobian floors, noncollision floors, support-tail status, and action/curl ledger convention.

---

## 3. Nonlinear Mode-Refinement Pass

The linear test is evidence, not closure. To certify an actual $M+1$ correction, run the Krawczyk row on the expanded exact-antipodal space. Define

$$
F_{R,M+1}(h)
=
U_{R,M+1}^T
F_{M+1}(x_M^*+h),
\qquad
h\in X_{M+1},
$$

where $U_{R,M+1}$ spans the range of the expanded derivative after row weighting. With approximate inverse $C_{M+1}$, compute

$$
Y_{M+1}=\|C_{M+1}F_{R,M+1}(0)\|,
$$

and

$$
Z_{M+1}
=
\sup_{\|h\|\le\rho}
\|I-C_{M+1}DF_{R,M+1}(h)\|.
$$

The mode-refinement row passes if

$$
Z_{M+1}<1,
\qquad
Y_{M+1}+Z_{M+1}\rho<\rho,
$$

and the expanded cokernel audit satisfies

$$
\epsilon_{C,M+1}
+
\epsilon_{\mathrm{disc},M+1}
+
\epsilon_{\mathrm{root},M+1}
\le
\tau_{\mathrm{dyn}}.
$$

If the expanded row passes, the correct status is

$$
\texttt{exact-antipodal-mode-refinement-succeeds}.
$$

The branch remains exact-antipodal. No midpoint relaxation has been used.

---

## 4. Mode-Refinement Failure Versus Obstruction

If the $M+1$ columns do not reduce the defect, this still does not prove an exact-antipodal obstruction. A local obstruction requires persistence across a declared refinement ladder:

$$
M=3,4,\ldots,M_{\max}.
$$

For each refinement level, emit:

1. support-complete tail status on the same source-pair policy;
2. root/Jacobian/noncollision floors;
3. cokernel projector $P_M$;
4. defect $c_M=P_Mr_M$;
5. new exact-antipodal column matrix $B_{M+1}$;
6. linear remaining ratio $\|c_{M+1}^{\mathrm{lin}}\|/\|c_M\|$;
7. nonlinear Krawczyk and cokernel status if the linear row is promising.

An exact-antipodal obstruction may be considered only if the defect persists with stable adjoint shape and the new exact-antipodal columns remain transverse to the obstructing block:

$$
\sup_{M\ge3}
\|B_{M+1}^{\dagger}c_M\|
>
\rho_{M+1}^{\mathrm{chart}}
$$

or

$$
\left\|
\left(I-B_{M+1}B_{M+1}^{\dagger}\right)c_M
\right\|
>
(1-\epsilon_{\mathrm{lift}})\|c_M\|
$$

for the certified refinement ladder, with tail, discretization, and nonlinear-remainder errors included.

Even then, the obstruction is local to the tested chart radius and refinement ladder. It does not rule out a deeper memory convention, a different source-pair policy, or a distant exact-antipodal branch.

---

## 5. Relation To Midpoint Relaxation

Let $C_{\mathrm{rel}}$ be the pair-midpoint relaxation derivative from [antipodal-relaxation-column-certificate.md](antipodal-relaxation-column-certificate.md). Midpoint relaxation is not opened merely because

$$
\|c_M\|>\tau_{\mathrm{dyn}}.
$$

The disciplined comparison is:

| Test | If it passes | Status |
| --- | --- | --- |
| $B_{M+1}$ spans the defect and Krawczyk closes | higher exact-antipodal modes solve the defect | `exact-antipodal-mode-refinement-succeeds` |
| $B_{M+1}$ is promising but nonlinear proof budget fails | continue exact-antipodal refinement | `continue-exact-antipodal-refine` |
| $B_{M+1}$ fails across the refinement ladder and adjoint obstruction passes | exact-antipodal local obstruction is plausible | `support-complete-exact-antipodal-obstruction` |
| $C_{\mathrm{rel}}$ spans the certified obstructing block | midpoint relaxation is mathematically relevant | `open-antipodal-relaxation` |

Thus the decision order is:

```text
support-complete M3 corrector
then exact-antipodal mode refinement
then support-complete obstruction certificate
then midpoint-relaxation column certificate
```

---

## 6. Current $M=3$ Reading

The current exact-antipodal $M=3$ evidence has full local rank and residual descent, but it has not produced a support-complete corrector or a mode-refinement defect matrix. Therefore the current state is not

$$
\texttt{exact-antipodal-mode-refinement-failed}.
$$

It is

$$
\texttt{mode-refinement-certificate-open},
\qquad
\texttt{continue-exact-antipodal}.
$$

The practical implication is sharp: if the support-complete $M=3$ corrector leaves a stable cokernel residual, the next exact-antipodal calculation should form $B_4$ before any pair-midpoint relaxation run is allowed.
