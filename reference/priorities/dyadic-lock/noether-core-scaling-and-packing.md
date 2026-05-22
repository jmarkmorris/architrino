# Noether-Core Scaling and Packing Scaffold

This priority packet captures the 2026-05-17 operator discussion on ideal Noether-core scaling, outer-binary radius/speed equations, and same-level pool packing. It is priority material, not reader-facing canon. Its purpose is to preserve the concrete equations and proof burdens until the branch constants can be extracted from the Master Equation, dyadic-lock reduction, or a finite-$\eta$ simulation.

## Claim Level

- **Status:** derivation scaffold.
- **Main claim:** for a group-velocity-zero Noether core at integer rest level $N$, the fixed $Nh$ action ledger determines the outer product $r_O v_O\propto Nh$. It does not by itself determine separate functions $r_O(N)$ and $v_O(N)$.
- **Open burden:** the actual curve is not determined until the outer action share, rotational bookkeeping coefficient, speed closure, exclusion-threshold map, and delayed root-ledger balance are fixed on a branch chart. The former $r_O\propto Nh$ law is only the fixed-speed branch subcase.
- **Promotion targets:** [dyadic-resonance-lock.md](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md), [binary-dynamics.md](../../../content/markdown/aaa/dynamics/binary-dynamics.md), [noether-swarm.md](../../../content/markdown/aaa/noether-swarm/noether-swarm.md), [nested-shell-swarm-geometry.md](../../../content/markdown/aaa/noether-swarm/nested-shell-swarm-geometry.md), and [noether-sea.md](../../../content/markdown/aaa/spacetime/noether-sea.md) after the constants and branch assumptions are certified.

## Notation Discipline

Use $h$ here only for the fixed closed-cycle action unit. The branch-scaling variable is $A_N=Nh$, where $N$ is the integer action-unit count. Do not confuse $h$ with the history horizon used in proof-program files. If both appear in the same calculation, write $h_{\mathrm{act}}$ for closed-cycle action and $h_{\mathrm{mem}}$ for memory depth. A pool at one rest level has all cores at the same $N$; a scaling curve compares admissible rest levels $N$ along a branch.

All kinematics below live in absolute time and Euclidean space. A Noether-core center is a point $X_a(t)\in\Sigma_t$ attached to a reduced closure label, not the position of any one architrino.

## Rest-Level Pool Scaling

Let every Noether core in the ideal pool have group velocity zero and the same integer rest level $N$. The pool is homogeneous at that level; the scaling curve compares admissible rest levels along one branch.

For the outer binary, the action allocation is

$$
I_O=p_O^{(q)}N\hbar
=
p_O^{(q)}N\frac{h}{2\pi}.
$$

With

$$
I_O=\mu_O^{\mathrm{rot}}r_O v_O,
$$

the branch action ledger fixes

$$
\boxed{
r_O(N)\,v_O(N)
=
\frac{p_O^{(q)}Nh}{2\pi\mu_O^{\mathrm{rot}}}.
}
$$

This product law is the invariant consequence of the $Nh$ ledger. It is not yet a radius law or a velocity law. The separate functions $r_O(N)$ and $v_O(N)$ require one more branch closure condition.

The exact kinematic identity is

$$
v_O=2\pi f_O r_O.
$$

Therefore, once either $r_O(N)$ or $v_O(N)$ is supplied by the branch closure,

$$
f_O(N)=\frac{v_O(N)}{2\pi r_O(N)}.
$$

If the branch pins the speed,

$$
v_O=\beta_Oc_f
$$

with fixed $\beta_O$, then

$$
\boxed{
r_O(N)=
\frac{p_O^{(q)}Nh}{2\pi\mu_O^{\mathrm{rot}}\beta_Oc_f},
\qquad
f_O(N)
=
\frac{\mu_O^{\mathrm{rot}}\beta_O^2c_f^2}{p_O^{(q)}Nh}.
}
$$

This special subcase gives

$$
r_O\propto N,
\qquad
v_O\propto N^0,
\qquad
f_O\propto N^{-1}.
$$

If the branch instead reduces to the bare inverse-square radial balance with approximately constant $\mathcal{B}_O$, the product law combines with the radial balance to give

$$
r_O\propto N^2,
\qquad
v_O\propto N^{-1},
\qquad
f_O\propto N^{-3}.
$$

Those two subcases are diagnostics of different closure assumptions, not competing definitions of the Noether core.

## Outer-Binary Action Equation

The sharper outer-binary route starts with the outer rotational-action ledger. Let the outer layer carry the action share $N_O=p_O^{(q)}N$:

$$
I_O=N_O\hbar
=
p_O^{(q)}N\frac{h}{2\pi},
$$

where $p_O^{(q)}$ is the outer action-share fraction of the branch. Introduce the effective rotational bookkeeping coefficient $\mu_O^{\mathrm{rot}}$ by

$$
I_O=\mu_O^{\mathrm{rot}}r_O v_O.
$$

Then

$$
\boxed{
r_O
=
\frac{p_O^{(q)}Nh}{2\pi\mu_O^{\mathrm{rot}}v_O}
}
$$

and, with $v_O=\beta_Oc_f$,

$$
\boxed{
r_O(N)
=
\frac{p_O^{(q)}Nh}
{2\pi\mu_O^{\mathrm{rot}}\beta_Oc_f}.
}
$$

If the outer action-energy convention is

$$
E_O=\omega_O I_O,
\qquad
\omega_O=\frac{v_O}{r_O},
$$

then the simplified convention gives

$$
E_O=\mu_O^{\mathrm{rot}}v_O^2.
$$

More generally, keep an explicit branch coefficient $\zeta_O^{(q)}$:

$$
E_O=\zeta_O^{(q)}\mu_O^{\mathrm{rot}}v_O^2.
$$

Hence

$$
v_O
=
\sqrt{\frac{E_O}{\zeta_O^{(q)}\mu_O^{\mathrm{rot}}}},
$$

and

$$
\boxed{
r_O(N;E_O)
=
\frac{p_O^{(q)}Nh\sqrt{\zeta_O^{(q)}}}
{2\pi\sqrt{\mu_O^{\mathrm{rot}}E_O}}.
}
$$

The earlier compact version is recovered by setting $\zeta_O^{(q)}=1$.

## Delayed Root-Ledger Speed Equation

The speed factor $\beta_O$ should not be assigned by hand. It should be solved from the delayed root ledger. Compress the outer radial root-ledger balance into

$$
\frac{\beta_O^2c_f^2}{r_O}
=
\frac{K_O}{4r_O^2}
\mathcal{B}_O(\beta_O;\Lambda_O),
$$

where

$$
K_O\equiv\frac{\kappa Q_O^2}{\mu_O^{\mathrm{acc}}},
$$

$Q_O^2$ is the effective polarity-pair or branch-charge factor for the outer channel, $\mu_O^{\mathrm{acc}}$ is the acceleration-side bookkeeping coefficient, and $\mathcal{B}_O(\beta_O;\Lambda_O)$ is the dimensionless signed root-ledger radial balance factor. The branch label $\Lambda_O$ must include active partner roots, self roots if any, signed sheets, Jacobian floors, and the regularization convention.

Solving the radial equation for the radius gives

$$
r_O
=
\frac{K_O}{4\beta_O^2c_f^2}
\mathcal{B}_O(\beta_O;\Lambda_O).
$$

Combining this with the outer action equation gives the implicit speed equation

$$
\boxed{
Nh
=
\frac{\pi\mu_O^{\mathrm{rot}}K_O}
{2p_O^{(q)}c_f}
\frac{\mathcal{B}_O(\beta_O;\Lambda_O)}{\beta_O}.
}
$$

Once $\beta_O$ is solved, the outer binary is fixed by

$$
v_O=\beta_Oc_f,
$$

$$
r_O=\frac{p_O^{(q)}Nh}{2\pi\mu_O^{\mathrm{rot}}\beta_Oc_f},
$$

and

$$
f_O=\frac{v_O}{2\pi r_O}
=
\frac{\mu_O^{\mathrm{rot}}\beta_O^2c_f^2}{p_O^{(q)}Nh}.
$$

The simplified operator-discussion equation

$$
Nh
=
\frac{\pi\kappa Q_O^2}{2p_Oc_f}
\frac{\mathcal{B}_O(\beta_O;\Lambda_O)}{\beta_O}
$$

is the special-unit case $\mu_O^{\mathrm{rot}}/\mu_O^{\mathrm{acc}}=1$.

## Minimal Circular-Ledger Balance Factor

The next study step is to expand $\mathcal{B}_O$ rather than leave it as a black box. In a circular binary reduction with speed factor

$$
\beta\equiv\frac{v}{c_f},
$$

use signed root labels

$$
\rho=(\mathrm{type},m,\sigma),
\qquad
\mathrm{type}\in\{p,s\},
\qquad
m\in\mathbb{N}_0,
\qquad
\sigma\in\{+1,-1\},
$$

where $p$ means partner root and $s$ means self root. The signed minimal angles solve

$$
2\pi m+\sigma\alpha_p
=
2\beta\cos(\alpha_p/2),
$$

for partner roots and

$$
2\pi m+\sigma\alpha_s
=
2\beta\sin(\alpha_s/2),
$$

for self roots, with $\alpha_p,\alpha_s\in(0,\pi]$ and with the usual existence windows for each signed branch. The branch Jacobians are, on this signed circular chart,

$$
J_p(\rho)
=
1+\sigma\beta\sin(\alpha_p/2),
$$

and

$$
J_s(\rho)
=
1-\sigma\beta\cos(\alpha_s/2).
$$

Let $\mathcal{P}_O(\beta;\Lambda_O)$ and $\mathcal{S}_O(\beta;\Lambda_O)$ be the active partner-root and self-root sets retained by the outer branch ledger, and let $w_\rho\ge0$ be the regularization or cycle-average weight for root $\rho$. Then the dimensionless inward radial balance factor is

$$
\boxed{
\mathcal{B}_O(\beta;\Lambda_O)
=
\sum_{\rho\in\mathcal{P}_O}
w_\rho
\frac{1}
{\cos(\alpha_{p,\rho}/2)\,|J_{p,\rho}|}
-
\sum_{\rho\in\mathcal{S}_O}
w_\rho
\frac{1}
{\sin(\alpha_{s,\rho}/2)\,|J_{s,\rho}|}.
}
$$

The outer radial radius formula is meaningful only when

$$
\mathcal{B}_O(\beta;\Lambda_O)>0,
$$

because the positive sign means net inward radial acceleration. If the self-root term dominates, the branch supplies outward radial response and cannot support the same centripetal balance without additional coupling terms.

The tangential closure must be tracked separately. A constant-speed circular branch also requires

$$
\mathcal{T}_O(\beta;\Lambda_O)
+\mathcal{T}_{\mathrm{ext}}^{(q)}
=0,
$$

where $\mathcal{T}_{\mathrm{ext}}^{(q)}$ records tri-binary, wake, or medium terms not present in the bare same-sheet two-body kernel, and

$$
\mathcal{T}_O(\beta;\Lambda_O)
=
\sum_{\rho\in\mathcal{P}_O}
w_\rho
\frac{\sigma_\rho\sin(\alpha_{p,\rho}/2)}
{\cos^2(\alpha_{p,\rho}/2)\,|J_{p,\rho}|}
+
\sum_{\rho\in\mathcal{S}_O}
w_\rho
\frac{\sigma_\rho\cos(\alpha_{s,\rho}/2)}
{\sin^2(\alpha_{s,\rho}/2)\,|J_{s,\rho}|}.
$$

This equation is the reason the radial scaling curve is not yet a proof of a stable outer binary. In the same-sheet bare kernel all retained roots have positive tangential drive. A true steady branch needs signed-root cancellation or a declared tri-binary / Noether-Sea return term that closes the angular-momentum ledger.

### Sub-Field-Speed Outer Estimate

If the outer binary is in a simple sub-field-speed branch, no self roots are active and the principal partner root satisfies

$$
\alpha_p
=
2\beta\cos(\alpha_p/2),
\qquad
0<\beta<1.
$$

Then

$$
\mathcal{B}_O^{(p0)}(\beta)
=
\frac{1}
{\cos(\alpha_p/2)\left(1+\beta\sin(\alpha_p/2)\right)}.
$$

At small $\beta$,

$$
\alpha_p=2\beta+O(\beta^3),
$$

so

$$
\mathcal{B}_O^{(p0)}(\beta)
=
1+O(\beta^2).
$$

The radial balance then gives the Coulomb-like estimate

$$
r_O
\approx
\frac{K_O}{4\beta_O^2c_f^2}.
$$

Combining this with the action equation yields, to leading order,

$$
\beta_O
\approx
\frac{\pi\mu_O^{\mathrm{rot}}K_O}{2p_O^{(q)}Nc_fh},
$$

and therefore

$$
r_O
\approx
\frac{p_O^{(q)}Nh}{2\pi\mu_O^{\mathrm{rot}}c_f}
\left(
\frac{2p_O^{(q)}Nc_fh}
{\pi\mu_O^{\mathrm{rot}}K_O}
\right)
=
\frac{(p_O^{(q)})^2N^2h^2}
{\pi^2(\mu_O^{\mathrm{rot}})^2K_O}
.
$$

This $r_O\propto (Nh)^2$ result is not the same as the fixed-speed rest-level subcase. It is the leading bare radial-balance result when the only speed-determining term is the partner-root inverse-square channel. The tension is useful: it says the observed scaling exponent depends on whether $\beta_O$ is branch-fixed, energy-projected, or solved from the bare radial force law.

## Relation to Dyadic Layer Ratios

The live dyadic-lock note supplies the exact kinematic layer identities under a middle-pinned integer lock:

$$
f_O:f_M:f_I=1:m:n,
\qquad
v_M=c_f.
$$

Then

$$
r_M=\frac{r_O}{m\beta_O},
\qquad
r_I=\frac{\beta_I}{n\beta_O}r_O.
$$

For the dyadic candidate $m=2$, $n=4$,

$$
r_O:r_M:r_I
=
1:\frac{1}{2\beta_O}:\frac{\beta_I}{4\beta_O}.
$$

Thus a $1{:}2{:}4$ frequency lock does not by itself imply self-similar radii. Self-similar radii require additional speed-factor assumptions.

## Exclusion Envelope and Centers

The packing centers are the Noether-core centers

$$
X_a(t)\in\Sigma_t,
$$

not the instantaneous architrino positions. For a nearly spherical exclusion-volume approximation, define the thresholded exclusion radius by

$$
R_{\mathrm{excl}}^{(q)}
=
\alpha_O^{(q)}r_O,
$$

where $\alpha_O^{(q)}$ converts outer-binary radius into the selected interface threshold $D_*$. This threshold can differ for penetration, packing, clock-coupling, or reaction-corridor calculations.

The hard non-overlap condition for equal nearly spherical cores is

$$
\|X_a-X_b\|
\ge
2R_{\mathrm{excl}}.
$$

For unequal cores it becomes

$$
\|X_a-X_b\|
\ge
R_{\mathrm{excl},a}+R_{\mathrm{excl},b}.
$$

If a wake-clearance margin is needed, add a branch-dependent buffer $\delta_{\mathrm{wake}}$:

$$
\|X_a-X_b\|
\ge
R_{\mathrm{excl},a}
+R_{\mathrm{excl},b}
+\delta_{\mathrm{wake}}.
$$

## Equal-Sphere Packing Estimate

For identical near-spherical cores, the densest ordinary Euclidean sphere packings are FCC/HCP with packing fraction

$$
\phi_{\max}=\frac{\pi}{3\sqrt{2}}.
$$

Since each exclusion volume has

$$
V_{\mathrm{excl}}=\frac{4\pi}{3}R_{\mathrm{excl}}^3,
$$

the maximum center density is

$$
\boxed{
n_{\max}
=
\frac{1}{4\sqrt{2}R_{\mathrm{excl}}^3}.
}
$$

Using $R_{\mathrm{excl}}=\alpha_O r_O$ and the fixed-speed outer action subcase gives

$$
n_{\max}(N)
=
\frac{1}{4\sqrt{2}}
\left(
\frac{2\pi\mu_O^{\mathrm{rot}}\beta_Oc_f}
{\alpha_O^{(q)}p_O^{(q)}Nh}
\right)^3.
$$

Therefore, on a fixed branch with fixed $\alpha_O$, $p_O^{(q)}$, $\mu_O^{\mathrm{rot}}$, and $\beta_O$,

$$
\boxed{
n_{\max}(N)\propto (Nh)^{-3}.
}
$$

The nearest-neighbor center spacing in the close-packed idealization is

$$
d_{\mathrm{nn}}=2R_{\mathrm{excl}},
$$

while the volume-per-core length scale is

$$
n_{\max}^{-1/3}
=(4\sqrt{2})^{1/3}R_{\mathrm{excl}}.
$$

## Oblate Spheroid Packing Generalization

For an oblate Noether-core envelope with transverse radius $R_\perp$ and parallel radius $R_\parallel=\xi R_\perp$, the envelope volume is

$$
V_{\mathrm{env}}
=
\frac{4\pi}{3}R_\perp^2R_\parallel
=
\frac{4\pi}{3}\xi R_\perp^3.
$$

A crude aligned-orientation density estimate is

$$
n_{\max}^{\mathrm{obl}}
\approx
\frac{\phi_{\mathrm{obl}}(\xi,\mathcal{O})}
{V_{\mathrm{env}}},
$$

where $\mathcal{O}$ records the orientation distribution and $\phi_{\mathrm{obl}}$ is a packing fraction to be derived or bounded. This quantity is not the same as the equal-sphere $\phi_{\max}$ unless $\xi\to1$ or the calculation deliberately replaces each core by a bounding sphere.

The more exact center condition uses support functions. For an axisymmetric spheroid with unit axis $\hat{\mathbf{u}}_a$, the support radius along a contact direction $\hat{\mathbf{n}}$ is

$$
s_a(\hat{\mathbf{n}})
=
\sqrt{
R_{\perp,a}^2
+\left(R_{\parallel,a}^2-R_{\perp,a}^2\right)
(\hat{\mathbf{n}}\cdot\hat{\mathbf{u}}_a)^2
}.
$$

For two spheroids with center direction

$$
\hat{\mathbf{n}}_{ab}
=
\frac{X_b-X_a}{\|X_b-X_a\|},
$$

a first contact-exclusion condition is

$$
\|X_b-X_a\|
\ge
s_a(\hat{\mathbf{n}}_{ab})
+s_b(-\hat{\mathbf{n}}_{ab})
+\delta_{\mathrm{wake}}.
$$

This is the correct place to study how shape ratio $\xi$ changes packing, anisotropy, and Noether-Sea delay. For an isotropic same-level pool, orientation averaging may make the coarse medium nearly scalar even when each individual core is oblate.

### Support-Function Lattice-Cell Bound

The support-function condition gives an executable upper bound for a local packing ceiling before a full dense spheroid-packing theorem is available. For a material or branch cell $X$, let the oblate envelope be

$$
R_{\parallel,X}=\xi_XR_{\perp,X},
\qquad
V_{\mathrm{env},X}
=
\frac{4\pi}{3}\xi_XR_{\perp,X}^3.
$$

Let the orientation record be a weighted set

$$
\mathcal{O}_X
=
\{(\hat{\mathbf{u}}_{X,j},w_{X,j})\}_{j=1}^{J_X},
\qquad
\sum_jw_{X,j}=1.
$$

The orientation-averaged support radius in a trial contact direction is

$$
\bar{s}_X(\hat{\mathbf{n}})
=
\sum_jw_{X,j}
\sqrt{
R_{\perp,X}^2
+
\left(R_{\parallel,X}^2-R_{\perp,X}^2\right)
(\hat{\mathbf{n}}\cdot\hat{\mathbf{u}}_{X,j})^2
}.
$$

For a lattice-cell basis $\mathcal{L}_X=(\hat{\mathbf{b}}_{X,1},\hat{\mathbf{b}}_{X,2},\hat{\mathbf{b}}_{X,3})$ with primitive-cell factor $c_{\mathrm{cell},X}$, define the support-function center spacings

$$
D_{X,i}
=
2\bar{s}_X(\hat{\mathbf{b}}_{X,i})
+
\delta_{\mathrm{wake},X}
+
\delta_{\mathrm{lat},X,i}.
$$

Then every center density in that declared lattice cell obeys

$$
V_{\mathrm{cell},X}^{\mathrm{sf}}
=
c_{\mathrm{cell},X}
\left|
\det(
\hat{\mathbf{b}}_{X,1},
\hat{\mathbf{b}}_{X,2},
\hat{\mathbf{b}}_{X,3}
)
\right|
\prod_{i=1}^3D_{X,i},
$$

and therefore

$$
\boxed{
n_{\max,X}^{\mathrm{obl}}
\le
\frac{\nu_{\mathrm{pack},0}}
{V_{\mathrm{cell},X}^{\mathrm{sf}}}.
}
$$

Here $\nu_{\mathrm{pack},0}$ is the chosen conversion from the branch cell units to normalized Noether-core density. Equality is a lattice-cell replay assumption; the inequality is the support-function exclusion bound.

The reference constants are not independent material knobs when the cell volume has already been nondimensionalized against the reference Noether-core density. In that branch-normalized convention,

$$
\widetilde V_{\mathrm{cell},X}^{\mathrm{sf}}
=
\rho_{\text{core},0}V_{\mathrm{cell},X}^{\mathrm{sf}},
\qquad
\nu_{\mathrm{pack},0}=1,
$$

so

$$
n_{\max,X}^{\mathrm{obl}}
\le
\frac{1}
{\widetilde V_{\mathrm{cell},X}^{\mathrm{sf}}}.
$$

The coordination and packing benchmarks are likewise fixed by the same-level Euclidean contact scaffold:

$$
z_*=12,
\qquad
\phi_*=\frac{\pi}{3\sqrt{2}},
\qquad
V_*=1
$$

in branch-normalized volume units. The value $z_*=12$ is the three-dimensional kissing-number bound for equal support-contact neighbors, while $\phi_*$ is the FCC/HCP equal-sphere reference fraction. For oblate envelopes $\phi_*$ is a benchmark headroom scale, not a proof that all oblate arrangements are sphere packings.

The executable material record should therefore be reduced to branch-geometric ingredients rather than direct declarations of $e_X$ or $n_{\max,X}^{\mathrm{obl}}$. A compact packing record is

$$
\mathfrak{P}_X
=
\left(
F_X,\mathcal{O}_X,\mathcal{L}_X,\mathcal{K}_X,
\phi_X^{\mathrm{target}}
\right),
$$

with each entry either derived or explicitly bounded. If the local branch supplies an oblate-envelope deformation map $F_X$ with singular values

$$
\lambda_{\perp,1,X},
\qquad
\lambda_{\perp,2,X},
\qquad
\lambda_{\parallel,X},
$$

then the axisymmetric envelope reduction uses

$$
\lambda_{\perp,X}
=
\sqrt{\lambda_{\perp,1,X}\lambda_{\perp,2,X}},
\qquad
\boxed{
\xi_X
=
\frac{\lambda_{\parallel,X}}{\lambda_{\perp,X}}
},
\qquad
0<\xi_X\le1.
$$

The inequality is the oblate-branch constraint. If a replay cannot derive the singular values from $F_X$, it may only use them as a mock branch-geometry record and must report that burden.

A finite-$\eta$ branch chart gives a stronger constraint when the deformation is the closed-return projection of a branch speed. Let $v_X$ be the retained branch speed along the declared contraction axis and define

$$
\beta_X\equiv\frac{v_X}{c_{\text{eff},X}},
\qquad
0\le\beta_X<1.
$$

For normalized transverse scale, let $Q_X$ be the orthogonal frame map with $Q_X\hat{\mathbf{e}}_3=\hat{\mathbf{a}}_X$. The closed-return deformation candidate is

$$
\boxed{
F_X^{(0)}
=
Q_X
\operatorname{diag}\!\left(
1,1,\sqrt{1-\beta_X^2}
\right)
Q_X^T.
}
$$

Equivalently,

$$
\lambda_{\perp,1,X}
=
\lambda_{\perp,2,X}
=1,
\qquad
\lambda_{\parallel,X}
=
\sqrt{1-\beta_X^2},
\qquad
\xi_X
=
\sqrt{1-\beta_X^2}.
$$

Finite regularization and preferred-frame leakage should enter as a residual bound rather than as a new free singular value:

$$
\boxed{
\left|
\xi_X-\sqrt{1-\beta_X^2}
\right|
\le
\epsilon_{\eta,X}
+
\epsilon_{\mathrm{LV},X}.
}
$$

If the branch calculation supplies only a speed interval

$$
\beta_X^{-}\le\beta_X\le\beta_X^{+},
$$

then monotonicity gives the deformation interval

$$
\boxed{
\sqrt{1-(\beta_X^{+})^2}
-
\epsilon_X
\le
\xi_X
\le
\sqrt{1-(\beta_X^{-})^2}
+
\epsilon_X,
\qquad
\epsilon_X\equiv\epsilon_{\eta,X}+\epsilon_{\mathrm{LV},X}.
}
$$

This is the clean replacement for raw singular-value mocks: a replay may declare $F_X$ through a certified $\beta_X$, through a certified interval for $\beta_X$, or through an explicitly labeled finite-$\eta$ branch assumption whose residual remains visible.

Two orientation records are currently executable:

$$
\mathcal{O}_X^{\mathrm{axis}}
=
\{(\hat{\mathbf{a}}_X,1)\},
$$

and

$$
\mathcal{O}^{\mathrm{orth}}
=
\left\{
(\hat{\mathbf{e}}_1,1/3),
(\hat{\mathbf{e}}_2,1/3),
(\hat{\mathbf{e}}_3,1/3)
\right\}.
$$

The first represents a coherent single-axis branch; the second represents an orthogonal isotropic coarse cell. The minimal lattice-cell family used in the replay is

$$
\mathcal{L}^{\mathrm{orth}}
=
(\hat{\mathbf{e}}_1,\hat{\mathbf{e}}_2,\hat{\mathbf{e}}_3).
$$

The retained contact-network families are the twelve-contact FCC/HCP cuboctahedral family

$$
\mathcal{K}_{12}^{\mathrm{fcc}}
=
\left\{
\frac{\pm\hat{\mathbf{e}}_i\pm\hat{\mathbf{e}}_j}{\sqrt2}
:\,1\le i<j\le3
\right\},
$$

and the four-contact tetrahedral family

$$
\mathcal{K}_{4}^{\mathrm{tet}}
=
\left\{
\frac{\sigma_1\hat{\mathbf{e}}_1+\sigma_2\hat{\mathbf{e}}_2+\sigma_3\hat{\mathbf{e}}_3}{\sqrt3}
:\,
\sigma_i\in\{-1,1\},
\quad
\sigma_1\sigma_2\sigma_3=1
\right\}.
$$

The lattice-cell factor may also be derived from a bounded target support-function packing fraction instead of declared directly. For

$$
0<\phi_X^{\mathrm{target}}\le\phi_*,
$$

set

$$
\boxed{
c_{\mathrm{cell},X}
=
\frac{
V_{\mathrm{env},X}
}{
\phi_X^{\mathrm{target}}
\left|
\det(
\hat{\mathbf{b}}_{X,1},
\hat{\mathbf{b}}_{X,2},
\hat{\mathbf{b}}_{X,3}
)
\right|
\prod_{i=1}^3D_{X,i}
}.
}
$$

Then

$$
V_{\mathrm{cell},X}^{\mathrm{sf}}
=
\frac{V_{\mathrm{env},X}}{\phi_X^{\mathrm{target}}},
\qquad
n_{\max,X}^{\mathrm{obl}}
\le
\frac{\nu_{\mathrm{pack},0}\phi_X^{\mathrm{target}}}
{V_{\mathrm{env},X}}.
$$

Thus the replay can move the free burden from $n_{\max,X}^{\mathrm{obl}}$ to the more structured question of which branch deformation, orientation family, contact family, and support-function packing fraction are admissible.

The same record also supplies a first packing-compliance diagnostic. Let $\mathcal{K}_X=\{(\hat{\mathbf{k}}_{X,a},\omega_{X,a})\}$ be the retained contact network, with effective coordination

$$
z_X^{\mathrm{eff}}=\sum_a\omega_{X,a}.
$$

Define

$$
D_X(\hat{\mathbf{k}})
=
2\bar{s}_X(\hat{\mathbf{k}})
+
\delta_{\mathrm{wake},X}
+
\delta_{\mathrm{lat},X},
$$

$$
\sigma_{\ln D,X}^2
=
\left\langle
\left(
\ln D_X-\langle\ln D_X\rangle_{\mathcal{K}_X}
\right)^2
\right\rangle_{\mathcal{K}_X},
$$

and

$$
\phi_X^{\mathrm{sf}}
=
\frac{V_{\mathrm{env},X}}
{V_{\mathrm{cell},X}^{\mathrm{sf}}},
\qquad
u_X
=
\left[
1-\frac{z_X^{\mathrm{eff}}}{z_*}
\right]_+,
\qquad
h_X
=
\left[
\frac{\phi_*-\phi_X^{\mathrm{sf}}}{\phi_*}
\right]_+.
$$

A replay may then use the bounded packing-compliance input

$$
\boxed{
e_X^{\mathrm{sf}}
=
\left(
\frac{V_{\mathrm{cell},X}^{\mathrm{sf}}}{V_*}
\right)^{1/3}
\left(
1+w_uu_X+w_{\phi}h_X+w_{\sigma}\sigma_{\ln D,X}^2
\right).
}
$$

The compliance weights are not free signs. Until the branch-response functional is derived, require the passive unit-bounded range

$$
0\le w_u,w_{\phi},w_{\sigma}\le1.
$$

Equivalently, the logarithmic packing penalty is allowed to respond at no more than unit first-order strength to undercoordination, void headroom, and contact-spacing anisotropy:

$$
\frac{\partial\ln e_X^{\mathrm{sf}}}{\partial u_X},
\quad
\frac{\partial\ln e_X^{\mathrm{sf}}}{\partial h_X},
\quad
\frac{\partial\ln e_X^{\mathrm{sf}}}{\partial \sigma_{\ln D,X}^2}
\in[0,1].
$$

This does not prove that the declared lattice is dynamically selected. It removes the direct scalar insertion of $e_X$ and $n_{\max,X}^{\mathrm{obl}}$ by tying both quantities to the oblate envelope, orientation record, contact network, and lattice-cell volume. The remaining proof burden is to derive $F_X$ or its certified $\beta_X$ interval, $\mathcal{O}_X$, $\mathcal{L}_X$, $\mathcal{K}_X$, and the exact shared compliance weights from the Noether-core branch rather than from a mock material record.

## Energy-Closure Ambiguity to Resolve

Two useful energy readings currently coexist:

1. **Core-cadence reading**
   $$
   E_N=Nh\nu_N,
   \qquad
   f_O=m_O\nu_N.
   $$
   At fixed branch speed, this gives
   $$
   r_O\propto NE_N^{-1}.
   $$

2. **Outer action-channel reading**
   $$
   E_O=\zeta_O\mu_O^{\mathrm{rot}}v_O^2,
   \qquad
   I_O=p_ONh/(2\pi).
   $$
   At fixed $N h$ and fixed branch coefficients, this gives
   $$
   r_O\propto E_O^{-1/2}.
   $$

This is not necessarily a contradiction. $E_N$ is a representative whole-core cadence energy, while $E_O$ is an outer-channel action-energy projection. Neither replaces the outer product law $r_O v_O\propto Nh$. The closure burden is to supply the branch map

$$
E_O=\chi_O^{(q)}E_N
$$

or an equivalent layer-energy projection before using one energy variable in both formulas.

## Calculation Recipe

For a branch-chart calculation:

1. Choose a reduced Noether-core branch label $\Lambda_{\mathrm{NC}}$ and outer sublabel $\Lambda_O$.
2. Declare whether $h$ means closed-cycle action $h_{\mathrm{act}}$ and reserve $h_{\mathrm{mem}}$ for memory depth.
3. Extract or choose provisional values for
   $$
   N,\quad
   p_O^{(q)},\quad
   \mu_O^{\mathrm{rot}},\quad
   \mu_O^{\mathrm{acc}},\quad
   Q_O^2,\quad
   \mathcal{B}_O(\beta_O;\Lambda_O),\quad
   \alpha_O^{(q)}.
   $$
4. Solve
   $$
   Nh
   =
   \frac{\pi\mu_O^{\mathrm{rot}}K_O}
   {2p_O^{(q)}c_f}
   \frac{\mathcal{B}_O(\beta_O;\Lambda_O)}{\beta_O}
   $$
   for $\beta_O$.
5. Compute
   $$
   v_O=\beta_Oc_f,
   \qquad
   r_O=\frac{p_O^{(q)}Nh}{2\pi\mu_O^{\mathrm{rot}}\beta_Oc_f},
   \qquad
   f_O=\frac{v_O}{2\pi r_O}.
   $$
6. Project to the exclusion envelope:
   $$
   R_{\mathrm{excl}}=\alpha_Or_O
   $$
   in the spherical estimate, or to $(R_\perp,R_\parallel,\xi)$ through the Noether-core geometry projection.
7. Compute same-level pool packing:
   $$
   n_{\max}=\frac{1}{4\sqrt{2}R_{\mathrm{excl}}^3}
   $$
   for equal near-spherical envelopes, or use $V_{\mathrm{cell},X}^{\mathrm{sf}}$ and $e_X^{\mathrm{sf}}$ from the support-function lattice-cell bound for oblate aligned or mixed-orientation pools.

## Failure Modes

- If $\beta_O(N)$ changes substantially, the curve is not linear in $Nh$.
- If $p_O^{(q)}$ changes, the action share has crossed a branch boundary or the chosen projection is not invariant.
- If $\mathcal{B}_O$ changes discontinuously, the active causal-root ledger has changed.
- If $\alpha_O$ depends strongly on energy or environment, the packing curve can differ from the outer-radius curve.
- If the Noether-core pool is oblate and orientation-correlated, equal-sphere close packing is the wrong center-density model.
- If $\xi_X>1$, $z_X^{\mathrm{eff}}>12$, $\phi_X^{\mathrm{sf}}>1$, or any compliance weight leaves $[0,1]$, the oblate support-function replay has left the bounded packing scaffold and needs a separate branch-response derivation.
- If the energy variable is not specified as $E_N$, $E_O$, or a layer projection, the energy scaling exponent cannot be trusted.

## Immediate Study Targets

1. Evaluate the minimal $\mathcal{B}_O(\beta_O;\Lambda_O)$ and $\mathcal{T}_O(\beta_O;\Lambda_O)$ formulas above for the principal partner branch, the principal self branch, and the first negative signed sheet.
2. Decide whether the rest-level closure should use the core-cadence energy $E_N$, the outer-channel energy $E_O$, or a declared projection $E_O=\chi_O^{(q)}E_N$.
3. Compute the first toy curves for $r_O(N)$, $v_O(N)$, and $n_{\max}(N)$ under three branch choices:
   - fixed $\beta_O$,
   - middle-pinned dyadic branch with $\beta_O\to1$,
   - root-ledger implicit branch with $\mathcal{B}_O(\beta)/\beta$.
