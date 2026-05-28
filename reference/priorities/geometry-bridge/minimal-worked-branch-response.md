# Minimal Worked Branch Response

Promotion status: `priority-only`.

This packet supplies the first worked geometry-bridge calculation. It does not retain a specific shell swarm branch. It computes a symbolic response row that any root-regular branch chart must satisfy under an isotropic affine environment deformation. The point is to turn the new geometry bridge from a residual definition into a calculable derivative.

## Worked Probe

Fix a branch chart $B$ with active root labels $\rho\in\mathcal{A}_B$, positive root delays $\eta_\rho>0$, and fixed Jacobian signs with $|J_\rho|\ge J_{\min}>0$. Work on the same root ledger and ignore branch-label changes.

Use the environment deformation

$$
\mathsf{D}_\varepsilon
=
(1+\varepsilon)I,
\qquad
|\varepsilon|\ll1,
$$

with no change to branch labels, source identities, channel projectors, lock weights, or ambient Noether sea rows unless stated. For a root row $\rho=(i,j,n,\alpha,\ell_\rho)$, write

$$
\mathbf{R}_\rho
=
\mathbf{Y}_i(\lambda_n)
-
\mathbf{Y}_j(\lambda_n-\eta_\rho),
\qquad
\left\|\mathbf{R}_\rho\right\|=\eta_\rho,
$$

and

$$
J_\rho
=
1-\mathbf{T}_{j,\rho}^{-}\cdot\widehat{\mathbf{R}}_\rho
$$

in the fixed-speed subchart. The bounded-speed version replaces $\mathbf{T}_{j,\rho}^{-}$ by $\nu_j^-\mathbf{T}_{j,\rho}^{-}$ in $J_\rho^\nu$.

The deformed root equation is

$$
G_\rho(\varepsilon,\eta)
=
\left\|
(1+\varepsilon)
\left(
\mathbf{Y}_i(\lambda_n)
-
\mathbf{Y}_j(\lambda_n-\eta)
\right)
\right\|
-\eta
=0.
$$

At $\varepsilon=0$ the root is simple, so

$$
\partial_\varepsilon G_\rho=\eta_\rho,
\qquad
\partial_\eta G_\rho=-J_\rho.
$$

Therefore the root-delay response is

$$
\boxed{
\delta\eta_\rho
=
\frac{\eta_\rho}{J_\rho}\,\varepsilon .
}
$$

For a bounded-speed root, the same row is

$$
\boxed{
\delta\eta_\rho^\nu
=
\frac{\eta_\rho}{J_\rho^\nu}\,\varepsilon .
}
$$

This is the first concrete derivative produced by the geometry bridge. It is not a fitted coefficient and it is not an observer metric statement. It is the direct response of a simple causal-root row to an isotropic support deformation.

## Period Response

If the branch period is represented by an ordered hit decomposition

$$
T_B
=
\frac{R_*}{c_f}
\left(
\sum_{\rho\in\mathcal{H}_B}\eta_\rho
+
\mathcal{R}_{\mathrm{phase},B}
\right),
$$

and the phase correction is fixed to first order under this probe, then

$$
\delta T_B
=
\frac{R_*}{c_f}
\sum_{\rho\in\mathcal{H}_B}
\frac{\eta_\rho}{J_\rho}\,\varepsilon,
$$

so

$$
\boxed{
\delta\ln T_B
=
\varepsilon
\frac{
\sum_{\rho\in\mathcal{H}_B}\eta_\rho/J_\rho
}{
\sum_{\rho\in\mathcal{H}_B}\eta_\rho+\mathcal{R}_{\mathrm{phase},B}
}.
}
$$

If $\delta\mathcal{R}_{\mathrm{phase},B}\ne0$, add

$$
\frac{\delta\mathcal{R}_{\mathrm{phase},B}}
{\sum_{\rho\in\mathcal{H}_B}\eta_\rho+\mathcal{R}_{\mathrm{phase},B}}
$$

to the displayed row. A branch that changes the ordered hit multiset $\mathcal{H}_B$ is not in this same-branch calculation.

## Shape Response

For the branch shape tensor

$$
Q_{ab}
=
\frac{1}{M_B}
\left\langle
\sum_i\mu_i\rho_{i,a}\rho_{i,b}
\right\rangle_B,
$$

assume this probe holds the weights $\mu_i$, cycle measure, and center gauge fixed while applying $\rho_i\mapsto(1+\varepsilon)\rho_i$. Then

$$
\boxed{
\delta Q_{ab}
=
2\varepsilon Q_{ab}.
}
$$

The trace and trace-free parts obey

$$
\delta Q^{c}{}_{c}
=
2\varepsilon Q^{c}{}_{c},
\qquad
\delta Q_{\mathrm{tf}}^{ab}
=
2\varepsilon Q_{\mathrm{tf}}^{ab}.
$$

Thus an exactly isotropic branch with $Q_{\mathrm{tf}}^{ab}=0$ does not create new trace-free preferred-frame leakage under this probe; an anisotropic branch amplifies its existing trace-free shape by the same factor.

## Root-Weight And Exposure Response

For the per-root geometry-facing weight

$$
w_\rho
=
\frac{1}{\eta_\rho^2|J_\rho|},
$$

the isotropic deformation does not change $\widehat{\mathbf{R}}_\rho$ and does not change $J_\rho$ at first order in the fixed-speed chart. Hence

$$
\boxed{
\delta\ln w_\rho
=
-2\frac{\delta\eta_\rho}{\eta_\rho}
=
-\frac{2\varepsilon}{J_\rho}.
}
$$

If the exposure tensor is

$$
\mathcal{Z}^{ab}
=
\left\langle
\sum_{\rho\in\mathcal{A}_{B}^{\mathrm{ext}}}
\mathsf{W}_{\mathrm{ext},\rho}
w_\rho
\widehat R_\rho^a\widehat R_\rho^b
\right\rangle_B,
$$

and $\mathsf{W}_{\mathrm{ext},\rho}$ is held fixed, then

$$
\boxed{
\delta\mathcal{Z}^{ab}
=
\left\langle
\sum_{\rho\in\mathcal{A}_{B}^{\mathrm{ext}}}
\mathsf{W}_{\mathrm{ext},\rho}
w_\rho
\widehat R_\rho^a\widehat R_\rho^b
\left(
-\frac{2\varepsilon}{J_\rho}
\right)
\right\rangle_B.
}
$$

This formula is already discriminating. If the active roots have different $J_\rho$ values by orientation, an isotropic support deformation produces anisotropic exposed response even though the imposed deformation was isotropic. That is a concrete delayed-root mechanism for preferred-frame or spatial-compliance residue:

$$
\delta\mathcal{Z}_{\mathrm{tf}}^{ab}
=
-2\varepsilon
\left\langle
\sum_{\rho}
\mathsf{W}_{\mathrm{ext},\rho}
\frac{w_\rho}{J_\rho}
\left(
\widehat R_\rho^a\widehat R_\rho^b
-
\frac13h^{ab}
\right)
\right\rangle_B.
$$

Therefore spatial-compliance anisotropy can arise from the distribution of causal-root Jacobians, not only from an anisotropic imposed environment.

## Interface Displacement Row

For the assembly-interface diagnostic

$$
D_{a,X}
=
\frac{L_X}{L_X+A_X},
$$

hold the ambient contribution $A_X$ fixed and let the locked branch contribution be a weighted sum of the same root weights. Then

$$
\delta\ln L_X
=
\left\langle
-\frac{2\varepsilon}{J_\rho}
\right\rangle_{L_X},
\qquad
\delta\ln A_X=0,
$$

where the locked weighted average is

$$
\left\langle f_\rho\right\rangle_{L_X}
=
\frac{\sum_{\rho\in L_X}\omega_{\rho,X}f_\rho}
{\sum_{\rho\in L_X}\omega_{\rho,X}}.
$$

Thus

$$
\delta D_{a,X}
=
D_{a,X}(1-D_{a,X})
\left\langle
-\frac{2\varepsilon}{J_\rho}
\right\rangle_{L_X}.
$$

At a regular interface point,

$$
\boxed{
\delta s_X
=
\frac{
2\varepsilon\,D_{a,X}(1-D_{a,X})
}{
\left\|\nabla D_{a,X}\right\|
}
\left\langle
\frac{1}{J_\rho}
\right\rangle_{L_X}.
}
$$

This is the first explicit assembly-interface motion law in the geometry bridge. The sign is in the $\mathbf{n}_X=\nabla D_{a,X}/\|\nabla D_{a,X}\|$ convention used by [geometry-export-and-interface-variation](geometry-export-and-interface-variation.md). If the outward normal is defined with the opposite sign, the displacement sign reverses.

## Consequence

The worked probe gives a concrete delayed-root mechanism:

$$
\mathsf{D}_\varepsilon=(1+\varepsilon)I
\quad\Longrightarrow\quad
\delta\eta_\rho=\eta_\rho\varepsilon/J_\rho
\quad\Longrightarrow\quad
\delta\mathcal{Z}_{\mathrm{tf}}^{ab}
\ \text{when the }J_\rho\text{ distribution is anisotropic}.
$$

The theory advance is that an apparently isotropic assembly deformation can export anisotropic geometry because the received causal-root flux is weighted by $1/|J_\rho|$ and responds with an additional $1/J_\rho$ sensitivity. This supplies a direct mathematical route from Master EOM root geometry to spatial-compliance residue before any metric is assumed.

## Status

This packet gives a symbolic `response-passed` row for the isotropic affine probe on any branch chart satisfying the simple-root and fixed-ledger hypotheses. A specific shell swarm or nested shell swarm branch remains `response-open` until its actual root list, Jacobian signs, exposure weights, and interface gradient are inserted.
