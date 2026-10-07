# Coupled period conditions and the derived instantaneous limit

## Purpose and claim boundary

Claim grade: self-derived necessary conditions and a proposed numerical experiment. Three bounded full-vector searches have not produced an exact canonical spatial history. The [constant-radius axial obstruction](overnight2-b-constant-radius-axial-obstruction.md) indicates that coupled radial deformation matters in the slow limit. This document derives the additional averaged equation that any such deformation must satisfy, then formulates a lower-dimensional way to generate candidate shapes. The reduced instantaneous equation is derived as a limit of the unchanged canonical delayed equation; it is not a replacement substrate law or a production solver.

Keep $K=c_f=1$ and all ordinary roots. The complete histories have dimensionless radius $\rho>0$, phase correction $p$ and alternating height $\zeta$, all real $C^2$ periodic profiles. Put $\phi=\epsilon k t/R$, common angle $\epsilon b t/R+p(\phi)$, $\omega=b+kp'$, and
$$
u=k\rho',\qquad w=\rho\omega,\qquad v=k\zeta',\qquad h=\zeta/\rho.
$$
Thus $(u,w,v)$ is physical velocity divided by $\epsilon$ in the receiver frame. The prime denotes phase differentiation. This work concerns bounded smooth slow families with a common positive radius floor, where the complete root chart has five partners and no positive self roots.

## Two exact period identities

The exact equation is $A=RL$, where physical acceleration is $A/R^2$ and prescribed acceleration is $L/R$. The tangential demand gives the already checked identity
$$
\langle\rho A_t\rangle=0.
$$
A second identity follows by multiplying the three demand components by $(u,w,v)$. Direct differentiation in the rotating cylindrical frame gives
$$
uL_r+wL_t+vL_z
=\frac{\epsilon^2 k}{2}(u^2+w^2+v^2)'.
$$
Consequently every exact periodic shape satisfies
$$
\langle uA_r+wA_t+vA_z\rangle=0.
$$
This is an integral identity of the acceleration equation. No intrinsic mass, physical energy conservation, or standard-physics dynamics is assumed.

## The instantaneous term integrates to zero

The zeroth-order acceleration has no tangential component, while
$$
A_r^{(0)}=\frac{1}{\sqrt3\,\rho^2}
-\frac{\rho}{(\rho^2+4\zeta^2)^{3/2}}
-\frac{\rho}{4(\rho^2+\zeta^2)^{3/2}},
$$
$$
A_z^{(0)}=-\frac{4\zeta}{(\rho^2+4\zeta^2)^{3/2}}
-\frac{\zeta}{4(\rho^2+\zeta^2)^{3/2}}.
$$
These expressions follow by summing the simultaneous five-partner geometry. Define the mathematical primitive
$$
U(\rho,\zeta)=\frac{1}{\sqrt3\,\rho}
-\frac{1}{\sqrt{\rho^2+4\zeta^2}}
-\frac{1}{4\sqrt{\rho^2+\zeta^2}}.
$$
Direct differentiation verifies $(A_r^{(0)},A_z^{(0)})=-\nabla U$. Therefore
$$
\langle uA_r^{(0)}+vA_z^{(0)}\rangle=-k\langle U'\rangle=0
$$
for every periodic profile, whether or not it solves the instantaneous equation. The primitive is derived algebraically from the canonical limit; it is not an imported interaction premise.

## First-order coupled coefficient

For one source angle $\alpha=j\pi/3$, parity $\sigma=(-1)^j$ and simultaneous separation $Q_0$, its source velocity is
$$
V_1=(u\cos\alpha-w\sin\alpha,\ u\sin\alpha+w\cos\alpha,\ \sigma v),
$$
$$
Q_0\cdot V_1=-\rho(1-\cos\alpha)u-\rho\sin\alpha\,w-(1-\sigma)\zeta v.
$$
Substitute this into the independently checked row
$$
\frac{\sigma}{s^2}\{V_1-2\widehat Q_0(\widehat Q_0\cdot V_1)\}.
$$
Terms odd in $\sin\alpha$ cancel between sources $j$ and $6-j$. Collecting all five partners gives
$$
\begin{pmatrix}A_r^{(1)}\\A_t^{(1)}\\A_z^{(1)}\end{pmatrix}
=\frac1{\rho^2}
\begin{pmatrix}P(h)&0&Q(h)\\0&C(h)&0\\Q(h)&0&S(h)\end{pmatrix}
\begin{pmatrix}u\\w\\v\end{pmatrix},
$$
where
$$
P(h)=-\frac1{1+4h^2}-\frac1{(1+4h^2)^2}
+\frac23+\frac{h^2-1}{4(1+h^2)^2},
$$
$$
Q(h)=-\frac{4h}{(1+4h^2)^2}-\frac{h}{2(1+h^2)^2},
$$
$$
C(h)=\frac{2-4h^2}{(1+4h^2)^2}-\frac23+\frac1{4(1+h^2)},
\qquad
S(h)=\frac{2(1-4h^2)}{(1+4h^2)^2}+\frac23+\frac{1-h^2}{4(1+h^2)^2}.
$$
Here $A=A^{(0)}+\epsilon A^{(1)}+O(\epsilon^2)$ uniformly on a fixed bounded profile family. At zero height the four coefficients are respectively $-19/12$, $0$, $19/12$ and $35/12$. Their signs do not imply stability, because this is an expansion of prescribed history residuals.

The two exact period identities now give the necessary leading conditions
$$
M=\langle\omega C(h)\rangle=0,\qquad
W=\left\langle\frac{P(h)u^2+2Q(h)uv+S(h)v^2+C(h)w^2}{\rho^2}\right\rangle=0
$$
for a limiting shape of any exact slow sequence with the stated uniform bounds and convergence. For a fixed shape with either nonzero value, sufficiently slow members cannot be exact. The matrix is not globally positive definite; for example its radial entry is negative at $h=0$. Thus the formula does not itself prove a global exclusion for coupled radial motion. It identifies the terms by which coupling might satisfy or violate the required average.

## Deriving a shape-generation equation

Suppose an exact slow family has a nondegenerate scale limit $R\epsilon^2\to\lambda\in(0,\infty)$ and convergent profiles. Its zeroth-order equation is $\lambda$ times the base acceleration equals $A^{(0)}$. Rescaling the base time by $\chi=\epsilon t/(R\sqrt\lambda)$ makes this limiting equation
$$
\ddot r=\ell^2/r^3+A_r^{(0)}(r,z),\qquad
\ddot z=A_z^{(0)}(r,z),\qquad
\dot\theta=\ell/r^2.
$$
Dots denote derivatives with respect to $\chi$, and the constant $\ell=r^2\dot\theta$ follows from the zero tangential equation. This constant is a geometric first integral of the derived equation, not imported architrino angular momentum. The normalization covers only finite positive $\lambda$; degenerate scale limits require separate arguments.

Periodic solutions of these radial/axial equations are only candidate limiting shapes. The leading canonical delay conditions $M=0$ and $W=0$ must still hold, and finite-delay full-vector balance is a further obligation. Generating a periodic solution of the reduced equation does not admit an exact canonical solution.

## Predeclared bounded shooting experiment

Use scaling to set $r(0)=1$, and choose $z(0)=H>0$, $\dot r(0)=\dot z(0)=0$, $\theta(0)=0$. Integrate to the first descending $z=0$ crossing. A zero of $\dot r$ at that crossing yields a symmetric radial/axial periodic candidate by time reversal and $z\mapsto-z$. A floating shooting zero does not prove exact closure. The reconstructed full period is four such quarter intervals. Average the leading torque and quadratic-period integrands over that period; symmetry permits using the quarter average after verifying each integrand's reflection parity.

Use heights $H=0.1,0.25,0.5,0.75,1,1.25$ and initial $\ell$ values $0.05,0.15,\ldots,1.25$. Retain every failed or incomplete shot. Only brackets with two valid first-crossing endpoints and opposite radial-velocity signs proceed to scalar refinement. Stop a shot when $r$ reaches $0.15$ or $8$, when $|z|$ reaches $8$, or at $\chi=50$; these are experiment limits, not physical obstructions. Use DOP853 with relative tolerance $10^{-10}$, absolute tolerance $10^{-12}$ and maximum step $0.1$; reprobe retained roots at tighter tolerances before interpreting their diagnostics. Bound the full target by 900 internal seconds, 512 MiB resident memory, 8 MiB output, one numerical thread and a 960-second supervisor deadline. A small pilot precedes the target.

Known controls precede any shot: the exact planar circular solution at $r=1,z=0,\ell^2=5/4-1/\sqrt3$; the instantaneous axial coefficient at $r=1,z=0$; elementary zero-height first-order matrix values; and the first-order five-row sum evaluated independently from Cartesian simultaneous geometry. A same-code replay of a shot would establish only determinism. Any consequential exclusion or admission derived from the experiment requires separate analytical or interval evidence.

## Falsifiers and remaining scope

A wrong simultaneous partner sum, derivative of $U$, mixed coefficient, period identity, or slow-time normalization would defeat its respective derivation. The numerical experiment can fail through absent event crossings, invalid root brackets, unresolved residuals, tolerance sensitivity or exhausted limits; none is a global physical obstruction. The matrix and limiting equation remain self-derived pending independent review. The next useful outcome is a limiting periodic shape satisfying both means, or a bounded, separately verified obstruction that explains why the searched shapes cannot continue to exact delayed histories.


### Known-first experiment record

Before any shooting target, the shared-venv `overnight2-b-instantaneous-shoot.py --stage known` command exited zero. It checked the exact circular solution over a finite integration interval, the exact axial derivative $-17/4$ at unit radius and zero height, the four zero-height scalar coefficients, and their Cartesian five-source matrix sum. The known receipt SHA-256 is `24a087bb71cd14e8388e331f42fd06c7fee58f6298e0ddcb0fcfbc68f66876fc`, retained under `.local-data/master-equation-closure/overnight2-b/instantaneous-shoot/known.json`. This pass is recorded before the three-shot pilot and bounded target. The controls validate the declared numerical operations on known cases; the nonzero-height analytic matrix and subsequent candidate interpretation still require separate review.
