# Noether-Core Scaling and Packing Scaffold

This priority packet captures the 2026-05-17 operator discussion on ideal Noether-core scaling, outer-binary radius/speed equations, and same-energy pool packing. It is priority material, not reader-facing canon. Its purpose is to preserve the concrete equations and proof burdens until the branch constants can be extracted from the Master Equation, dyadic-lock reduction, or a finite-$\eta$ simulation.

## Claim Level

- **Status:** derivation scaffold.
- **Main claim:** for a same-energy pool of Noether cores on one fixed branch, $h$ is fixed and the scaling variable is the total branch action level $A_N=Nh$. The first ideal scaling gives $r_O\propto Nh$ and therefore close-packed center density $n_{\max}\propto (Nh)^{-3}$.
- **Open burden:** the actual curve is not determined until the outer action share, rotational bookkeeping coefficient, speed factor, exclusion-threshold map, and delayed root-ledger balance are fixed on a branch chart.
- **Promotion targets:** [dyadic-resonance-lock.md](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md), [binary-dynamics.md](../../../content/markdown/aaa/dynamics/binary-dynamics.md), [noether-core.md](../../../content/markdown/aaa/spacetime/noether-core.md), [noether-core-geometry.md](../../../content/markdown/aaa/spacetime/noether-core-geometry.md), and [noether-sea.md](../../../content/markdown/aaa/spacetime/noether-sea.md) after the constants and branch assumptions are certified.

## Notation Discipline

Use $h$ here only for the fixed closed-cycle action unit. The branch-scaling variable is $A_N=Nh$, where $N$ is the integer action-unit count. Do not confuse $h$ with the history horizon used in proof-program files. If both appear in the same calculation, write $h_{\mathrm{act}}$ for closed-cycle action and $h_{\mathrm{mem}}$ for memory depth.

All kinematics below live in absolute time and Euclidean space. A Noether-core center is a point $X_a(t)\in\Sigma_t$ attached to a reduced closure label, not the position of any one architrino.

## Same-Energy Pool Scaling

Let every Noether core in the ideal pool have the same core energy scale

$$
E_*=E_N.
$$

Use the current cadence bookkeeping relation

$$
E_N=Nh\nu_N.
$$

Then the representative cadence is

$$
\nu_N(N)=\frac{E_*}{Nh}.
$$

On a fixed branch $q$, let the outer binary frequency be tied to the representative cadence by

$$
f_O=m_O^{(q)}\nu_N,
$$

where $m_O^{(q)}$ is a branch extraction coefficient. The exact kinematic identity is

$$
v_O=2\pi f_O r_O=\beta_O c_f.
$$

Therefore

$$
r_{O,q}(N)
=
\frac{\beta_O^{(q)}(N)c_f}{2\pi m_O^{(q)}(N)}\frac{Nh}{E_*}.
$$

The log-slope is

$$
\frac{d\ln r_O}{d\ln (Nh)}
=
1
+\frac{d\ln\beta_O}{d\ln (Nh)}
-\frac{d\ln m_O}{d\ln (Nh)}.
$$

Thus the first ideal branch result is

$$
\boxed{
r_O\propto Nh
}
$$

only when $\beta_O$ and $m_O$ remain fixed across the compared branch segment. If the root ledger changes, the curve can have a cusp, jump, or branch switch rather than a smooth slope.

For all three layers, if

$$
f_\ell=m_\ell^{(q)}\nu_N,
\qquad
v_\ell=\beta_\ell^{(q)}c_f,
\qquad
\ell\in\{I,M,O\},
$$

then

$$
r_{\ell,q}(N)
=
\frac{\beta_\ell^{(q)}(N)c_f}{2\pi m_\ell^{(q)}(N)}\frac{Nh}{E_*}.
$$

This is the same linear-in-$Nh$ estimate for every layer, with deviations entirely assigned to branch-dependent speed factors and frequency-ratio extraction.

## Outer-Binary Action Equation

The sharper outer-binary route starts with the outer rotational-action ledger. Let the outer layer carry the action share $N_O=p_O^{(q)}N$:

$$
I_O=N_O\hbar
=
p_O^{(q)}N\frac{h}{2\pi},
$$

where $p_O^{(q)}$ is the outer action-share fraction of the branch. Introduce the effective rotational bookkeeping coefficient $\mu_O^{\mathrm{rot}}$ by

$$
I_O=\mu_O^{\mathrm{rot}}r_Ov_O.
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

This $r_O\propto (Nh)^2$ result is not the same as the fixed-speed same-energy-pool estimate. It is the leading bare radial-balance result when the only speed-determining term is the partner-root inverse-square channel. The tension is useful: it says the observed scaling exponent depends on whether $\beta_O$ is branch-fixed, energy-fixed, or solved from the bare radial force law.

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

Using $R_{\mathrm{excl}}=\alpha_O r_O$ and the fixed-branch outer action equation gives

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

This is the correct place to study how shape ratio $\xi$ changes packing, anisotropy, and Noether-Sea delay. For an isotropic same-energy pool, orientation averaging may make the coarse medium nearly scalar even when each individual core is oblate.

## Energy-Scaling Ambiguity to Resolve

Two useful energy readings currently coexist:

1. **Core-cadence reading**
   $$
   E_N=Nh\nu_N,
   \qquad
   f_O=m_O\nu_N.
   $$
   At fixed $h$ and fixed branch speed, this gives
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

This is not necessarily a contradiction. $E_N$ is a representative whole-core cadence energy, while $E_O$ is an outer-channel action-energy projection. The closure burden is to supply the branch map

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
7. Compute same-energy-pool packing:
   $$
   n_{\max}=\frac{1}{4\sqrt{2}R_{\mathrm{excl}}^3}
   $$
   for equal near-spherical envelopes, or use the spheroid support-function condition for oblate aligned or mixed-orientation pools.

## Failure Modes

- If $\beta_O(N)$ changes substantially, the curve is not linear in $Nh$.
- If $p_O^{(q)}$ changes, the action share has crossed a branch boundary or the chosen projection is not invariant.
- If $\mathcal{B}_O$ changes discontinuously, the active causal-root ledger has changed.
- If $\alpha_O$ depends strongly on energy or environment, the packing curve can differ from the outer-radius curve.
- If the Noether-core pool is oblate and orientation-correlated, equal-sphere close packing is the wrong center-density model.
- If the energy variable is not specified as $E_N$, $E_O$, or a layer projection, the energy scaling exponent cannot be trusted.

## Immediate Study Targets

1. Evaluate the minimal $\mathcal{B}_O(\beta_O;\Lambda_O)$ and $\mathcal{T}_O(\beta_O;\Lambda_O)$ formulas above for the principal partner branch, the principal self branch, and the first negative signed sheet.
2. Decide whether the same-energy pool should use the core-cadence energy $E_N$, the outer-channel energy $E_O$, or a declared projection $E_O=\chi_O^{(q)}E_N$.
3. Compute the first toy curves for $r_O(N)$, $v_O(N)$, and $n_{\max}(N)$ under three branch choices:
   - fixed $\beta_O$,
   - middle-pinned dyadic branch with $\beta_O\to1$,
   - root-ledger implicit branch with $\mathcal{B}_O(\beta)/\beta$.
4. Replace the spherical packing estimate with a support-function spheroid packing diagnostic once $\xi(N)$ or $\xi(E)$ is supplied by the Noether-core geometry projection.
