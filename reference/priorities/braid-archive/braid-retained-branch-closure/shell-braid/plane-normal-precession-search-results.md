# Plane-Normal Precession Search Results

Promotion status: `priority-only`. This packet records the first intrinsic-curve screen that adds a nonplanar plane-normal deformation to the common radial-breathing row. It follows the arclength-clock dynamics in [intrinsic-curve-dynamics-equation.md](intrinsic-curve-dynamics-equation.md) and tests the next direction identified in [current-dynamics-synthesis.md](current-dynamics-synthesis.md): rotate delayed line-of-action geometry before introducing any self/fold-layer or Noether sea medium-response channel.

No branch is retained.

---

## 1. Screened Nonplanar Class

Use the same three carrier circles

$$
\begin{aligned}
\mathbf{p}_1(u)&=(\cos u,\sin u,0),\\
\mathbf{p}_2(u)&=(0,\cos u,\sin u),\\
\mathbf{p}_3(u)&=(\sin u,0,\cos u),
\end{aligned}
$$

with plane normals

$$
\mathbf{n}_1=(0,0,1),
\qquad
\mathbf{n}_2=(1,0,0),
\qquad
\mathbf{n}_3=(0,1,0).
$$

For site $i=(a,\sigma)$, the screened curve was

$$
\mathbf{X}_{a,\sigma}(q)
=
\sigma
\left[
\rho(u)\mathbf{p}_a(u)
+z(u)\mathbf{n}_a
\right],
\qquad
u=q+\phi_a,
$$

with

$$
\rho(u)=1+A\cos2u+B\sin2u,
$$

and

$$
z(u)=C\cos2u+D\sin2u.
$$

The phase row used

$$
\phi_1=0,
\qquad
\phi_2,\phi_3\in[0,2\pi).
$$

This is still an exact-antipodal row:

$$
\mathbf{X}_{a,-}(q)=-\mathbf{X}_{a,+}(q).
$$

Therefore the center gauge remains closed pairwise, and the screen does not test antipodal relaxation.

---

## 2. Arclength Clock And Residuals

For each curve, the physical phase was computed from arclength:

$$
\int_0^{q_i(t)}
\left\|
\mathbf{X}_i'(\zeta)
\right\|d\zeta
=
c_ft
\pmod {L_i}.
$$

The common ansatz has equal lengths across all six sites up to quadrature error. The active-root convention retained the same-binary partner and the four cross-binary sources for each receiver, excluding same-source roots unless a separate self/fold-layer row is declared.

The receiver-normal restart force is

$$
\widetilde{\mathbf{F}}_i
=
\sum_{j\in\mathcal{A}_i}
\sigma_i\sigma_j
\frac{W_{ij}^{\mathrm{rec}}}
{y_{ij}^2}
\hat{\mathbf{r}}_{ij}.
$$

The measured residuals were

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},i}
=
\mathbf{T}_i\cdot
\widetilde{\mathbf{F}}_i,
$$

and

$$
\widetilde{\mathcal{R}}_{\mathrm{curv},i}
=
\widetilde{\mathbf{F}}_i
-\Gamma_*\mathbf{K}_i,
$$

where

$$
\Gamma_*
=
\frac{
\sum_{i,n}\widetilde{\mathbf{F}}_{i,n}\cdot\mathbf{K}_{i,n}
}{
\sum_{i,n}\|\mathbf{K}_{i,n}\|^2
}
$$

is the best scalar diagnostic fit. A retained branch must derive the corresponding scale row from the action and branch-inertia ledger; this fitted $\Gamma_*$ is only a search diagnostic.

---

## 3. Best Screened Row

A bounded differential-evolution search followed by local refinement over

$$
(A,B,C,D,\phi_2,\phi_3)
$$

found the coarse candidate

$$
A\approx-0.35346601,
\qquad
B\approx0.16632878,
$$

$$
C\approx0.07616684,
\qquad
D\approx0.03420821,
$$

$$
\phi_2\approx6.29032702,
\qquad
\phi_3\approx0.12208002.
$$

The $16$-sample arclength rescore gave:

| Diagnostic | Result |
| --- | ---: |
| Common curve length $L_*$ | $7.2218387727R$ |
| Tangential residual RMS | $0.7023103913$ |
| Tangential residual max | $1.4873437595$ |
| Force-versus-curvature RMS after best $\Gamma_*$ | $1.2176220675$ |
| Force-versus-curvature max after best $\Gamma_*$ | $2.6514901550$ |
| Best scalar $\Gamma_*$ | $-0.3790118667$ |
| Euclidean noncollision floor | $d_{\min}\approx0.6890270904R$ |
| Jacobian floor | $J_{\min}\approx0.2877782508$ |
| Root count per receiver and sampled phase | $5$-$5$ |
| Length spread | below $3\times10^{-14}R$ |

On the coarser optimization sample, the same row scored tangential RMS about $0.5404$ and force-versus-curvature RMS about $0.9504$. The refined sample shows that the direction is useful but not stable enough to count as near-closure.

---

## 4. Comparison With Arclength Breathing

The best common-breathing arclength row in [arclength-deformation-search-results.md](arclength-deformation-search-results.md) had:

$$
\operatorname{rms}(\mathcal{R}_{\mathrm{tan}})
\approx0.4659,
\qquad
\operatorname{rms}(\mathcal{R}_{\mathrm{curv}})
\approx1.4628.
$$

The plane-normal row has:

$$
\operatorname{rms}(\mathcal{R}_{\mathrm{tan}})
\approx0.7023,
\qquad
\operatorname{rms}(\mathcal{R}_{\mathrm{curv}})
\approx1.2176.
$$

Thus nonplanar deformation improves curvature alignment but gives back tangential closure. This is the expected tradeoff if plane-normal motion rotates the delayed line-of-action geometry but the common two-harmonic ansatz lacks enough degrees of freedom to keep the force tangent-free.

---

## 5. Dynamics Interpretation

The screen changes the current dynamics picture in a narrow way:

1. Plane-normal freedom is not a distraction; it can reduce the vector force-versus-curvature mismatch.
2. A common plane-normal waveform is still too rigid. It improves normal alignment only by accepting larger tangential work leakage.
3. The next nonplanar search should make $z_{a,\sigma}$ site-specific or combine plane-normal precession with antipodal relaxation.
4. The branch remains pure-geometry at this stage; no self/fold-layer or medium-response term is justified by this result alone.

The main failure codes are:

$$
\texttt{tangential-residual-open},
\qquad
\texttt{curvature-force-mismatch},
\qquad
\texttt{jacobian-floor-violation}\ \text{risk under refinement},
\qquad
\texttt{not-retained}.
$$

---

## 6. Next Search Target

The next finite-mode row should replace the common $z(u)$ by site-specific normal modes:

$$
z_{a,\sigma}(u)
=
C_{a,\sigma}\cos2u+D_{a,\sigma}\sin2u,
$$

while either preserving antipodality,

$$
\mathbf{X}_{a,-}=-\mathbf{X}_{a,+},
$$

or adding a controlled antipodal-relaxation row with a separate residual. The objective should keep force-versus-curvature and tangential closure at comparable weight:

$$
\mathcal{J}
=
\|\mathcal{R}_{\mathrm{tan}}\|^2
+\|\mathcal{R}_{\mathrm{curv}}\|^2
+\mathcal{P}_x
+\mathcal{P}_J
+\mathcal{P}_{\mathrm{support}}
+\mathcal{P}_{L}.
$$

This is the first search result suggesting that a higher-dimensional intrinsic curve solve is mathematically worthwhile.
