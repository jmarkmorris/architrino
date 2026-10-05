# Complete antipodal-circle exclusion for the four fixed finite-width laws

Status: complete synthesis subject, frozen 2026-10-05, pending the coordinator's independent union adjudication. The new radius and speed bounds have been independently reconstructed by the coordinator; the first interval cover has a written independent assessment, and the second target and final assembly are undergoing final coordinating assessment. This source combines their explicitly stated domains and restates the earlier low-speed theorem's proof. It does not alter any component source, instrument, receipt or shared owner.

## Theorem and exact configuration class

Claim grade: computer-assisted derived theorem, conditional on the explicit interval-arithmetic assumptions below. For each of the four fixed equations

$$
(h,\rho)\in\{1/16,1/32\}\times\{1/32,1/64\},\qquad K_{ij}=c_f=1,
$$

there is no complete all-time fixed-center antipodal uniform circle of any positive radius and positive speed.

Precisely, no trajectory pair of the form

$$
\mathbf X_1(t)=\mathbf C+R\big[\mathbf e_1\cos(\omega t+\phi)+\mathbf e_2\sin(\omega t+\phi)\big],
\qquad
\mathbf X_2(t)=2\mathbf C-\mathbf X_1(t)
$$

satisfies the selected equation for all real times when $R>0$, $\omega\ne0$, and $\mathbf e_1,\mathbf e_2$ are fixed orthonormal vectors. The center $\mathbf C$ is fixed in the Euclidean void. The speed is $\beta=R|\omega|>0$. Spatial reflection exchanges the two rotation orientations, so choosing $\omega>0$ in the proof loses no case. Fixed translations, rotations and time phase are symmetries of this class; a translating center is a different ansatz.

The reception window is $\delta_h(z)=h^{-1}(1-|z|/h)_+$, and the core denominator is $(r^2+\rho^2)^{3/2}$. Self input has sign $+1$ and the opposite-polarity partner input sign $-1$. No additional response factor, age exclusion, coefficient fit or root-selection rule is used. The theorem concerns exactly these four equations and this trajectory class.

## Complete balance problem

Choose reception time zero and receiver $(R,0)$ in the circle plane. For age $\tau\ge0$, write $\theta=\beta\tau/R$. The historical displacement vectors are

$$
\mathbf d_s=R(1-\cos\theta,\sin\theta),\qquad
\mathbf d_p=R(1+\cos\theta,-\sin\theta),
$$

with ranges $r_s=2R|\sin(\theta/2)|$ and $r_p=2R|\cos(\theta/2)|$. The full acceleration is

$$
\mathbf A=\int_0^{2R+h}\left[
\frac{\mathbf d_s\,\delta_h(r_s-\tau)}{(r_s^2+\rho^2)^{3/2}}
-\frac{\mathbf d_p\,\delta_h(r_p-\tau)}{(r_p^2+\rho^2)^{3/2}}
\right]d\tau.
$$

Every older age is exactly inactive because both ranges are at most $2R$. A circle requires zero tangential acceleration and inward radial acceleration $A_r=-\beta^2/R$. Define the radial residual $F_2=RA_r+\beta^2$. Each component below proves either $A_t>0$ or $F_2>0$ on its stated domain. Either condition contradicts circle balance.

## Analytical components

### Every radius at low speed

The [complete positive-tangent theorem](alternatives-screen-2026-10-05-binary.md#15-finite-width-circle-exclusion-without-a-small-width-assumption) covers every $R>0$ when $0<\beta\le\pi/2$. Its argument includes all revolutions and all self and partner ages. Both signed tangential channels have numerator $R\sin\theta$. For $0<\varphi<\pi$, pair phases $\theta_+=\varphi+2\pi n$ and $\theta_-=2\pi(n+1)-\varphi$. Their ranges and denominators agree, and their mean age is

$$
\frac{\theta_++\theta_-}{2\omega}=\frac{(2n+1)\pi}{\omega}\ge\frac\pi\omega\ge2R\ge r_j(\varphi).
$$

The earlier positive-sine age is therefore at least as close to the window center as the later negative-sine age. The triangular window makes every paired contribution nonnegative. In the self channel with $n=0$, near $\varphi=0$, the earlier weight tends to $1/h$ and the later one to $\delta_h(2\pi/\omega)<1/h$, giving strict positivity on a nonzero interval. Complete circular support is compact in age, so the pairing is justified. Thus $A_t>0$ at every positive radius in this speed range.

### Every higher speed at tiny radius

The self radial contribution is nonnegative. Bounding the inward partner numerator by $2R$, its denominator below by $\rho^3$, its window above by $1/h$ and its complete age interval by $2R+h$ gives the necessary condition

$$
\beta^2\le\frac{2R^2}{\rho^3}\left(1+\frac{2R}{h}\right)
$$

for radial balance. If $R\le1/512$, the largest right side among the four laws is $9/4$, attained by the smallest selected core and window at the endpoint radius. Since $\pi^2/4>9/4$, every $\beta\ge\pi/2$ is excluded there. The [independent assessment](alternatives-screen-2026-10-05-width-circle-exclusion-adjudication.md) reconstructs this complete-age inequality separately from the numerical cover.

### Large radii and their compact remainder

The [large-radius analytical theorem](alternatives-screen-2026-10-05-width-large-bounds.md) proves that any possible circle with $R\ge2$, $\beta\ge\pi/2$ must satisfy

$$
2\le R<4,\qquad\frac{11}{4}<\beta<\frac72.
$$

Its source-age argument first bounds the earliest partner reception using the chord's Lipschitz and quadratic-cosine bounds. Exact maxima of the concave chord-lobe gaps exclude all but the first and at most one later partner lobe below speed six. The first lobe's gap derivative is at most $-1$, and the later lobe's active-age measure is bounded by its curvature. Complete reciprocal-age and core bounds handle the unbounded high-speed tail. These inequalities exclude all $R\ge2$ with $\beta\le11/4$ or $\beta\ge7/2$, and all $R\ge4$ with $\beta\ge\pi/2$. Their complement is compact and is excluded by the second interval certificate below.

### Every speed at least eight at radii at most two

The [finite-speed reduction](alternatives-screen-2026-10-05-width-high-protocol.md#derived-finite-speed-cutoff-for-radii-at-most-two) starts from the complete triangular-window bound. For $0<R\le2$, its four inward-input upper bounds are $208/5$, $1861/40$, $416/5$ and $472/5$, respectively. All are below 100, excluding $\beta\ge10$.

The [separate analytical closure](alternatives-screen-2026-10-05-width-high-analytic-closure.md) excludes $8\le\beta\le10$ on the whole same radius range. The wide-window laws already have upper input below $49<64$. For narrow windows at $R\le1/4$, the triangular bounds are below $248/5$ and $304/5$, both below 64. At $1/4\le R\le2$, the first possible partner age obeys

$$
\tau_0=\frac{2R-h}{\beta+1}\ge\frac{15}{352}>h\qquad(h=1/32,\ 8\le\beta\le10).
$$

The reciprocal-age inequality then gives

$$
-RA_r\le16\log\frac{(2R+h)(\beta+1)}{2R-h}
\le16\log\frac{187}{15}<16\log16<\frac{224}{5}<64\le\beta^2.
$$

The radius regimes overlap at one quarter and include both speed endpoints. Thus the entire high-speed tail at radii at most two is excluded analytically. The coordinator independently reconstructed these inequalities and instructed that the prepared high-speed numerical target remain unrun.

## The two complete interval certificates

The exact radial formula used by both numerical certificates follows from $R d_{r,j}=r_j^2/2$ and $d\tau=R\,d\theta/\beta$. Let $q_s^2=2(1-\cos\theta)$, $q_p^2=2(1+\cos\theta)$, $u=\rho/R$, $v=R/h$, $G(z,u)=z/(z+u^2)^{3/2}$ and $W(x)=(1-|x|)_+$. Then

$$
F_2=\beta^2+\frac1{2\beta h}\int_0^\Theta\left[
G(q_s^2,u)W\!\left(v\left(q_s-\frac\theta\beta\right)\right)
-G(q_p^2,u)W\!\left(v\left(q_p-\frac\theta\beta\right)\right)
\right]d\theta.
$$

For each parameter box, the common outward endpoint $\Theta\ge\beta_+(2+h/R_-)$ covers every complete source history in that box. Interval ranges include all support corners, central corners and chord cusps without assuming differentiability. The full signed channel difference and common prefactor remain enclosed.

Both certificates use the unchanged [interval reference](../evidence/alternatives-screen-2026-10-05-width-circle-exclusion-interval.py). Its mathematical proof and machine assumptions are in the [frozen protocol](alternatives-screen-2026-10-05-width-circle-exclusion-protocol.md) and independently reconstructed in the [coordinator assessment](alternatives-screen-2026-10-05-width-circle-exclusion-adjudication.md). Basic operations and square root expand outward. Rational Machin bounds, a checked degree-40 Taylor polynomial and analytic remainder enclose cosine. Positive reductions use the complete $\gamma_{n-1}$ summation bound. The theorem assumes correctly rounded finite IEEE binary64 basic operations and square root, gradual underflow and the documented reduction model. These assumptions remain visible in the global conclusion.

The interval and cover instruments passed known exact-rational and closed-form controls before target use. Known coverage cases accepted a complete partition and rejected a missing child, an overlapping ancestor and an incorrect endpoint. Final audits reconstruct every leaf from exact dyadic roots and subdivision paths and require complete sibling pairs. Thus positive leaf bounds and complete domain coverage are checked as separate obligations.

Claim grade: measured execution facts supporting the computer-assisted derivation. The two completed targets are:

| Certificate | Covered radius and speed domain | Final excluded leaves | Unresolved leaves | Minimum certified lower $F_2$ |
| --- | --- | ---: | ---: | ---: |
| [Moderate rectangle](alternatives-screen-2026-10-05-width-circle-exclusion-result.md) | $1/512\le R\le2$, $201/128\le\beta\le8$ | 947 | 0 | 0.006288992633606937 |
| [Large compact remainder](alternatives-screen-2026-10-05-width-large-result.md) | $2\le R\le4$, $11/4\le\beta\le7/2$ | 256 | 0 | 5.772334163254443 |

The first slightly enlarges the needed lower speed because $201/128<\pi/2$. Its 640 initial roots subdivided into 947 final leaves; the target completed at 18:06:49.979768 UTC in 5.7247 seconds. The second certified all 256 initial roots directly and completed at 18:32:14.405172 UTC in 1.0475 seconds. Both complete rational audits passed, no processing limit was reached, and both processes exited. These counts and timings are recorded in the retained receipts, rather than inferred from geometry. Their minima are conservative box bounds, not sampled physical extrema.

No floating diagnostic grid or optimizer result is a premise of this classification. Repeating either computation establishes reproducibility; the independent evidence is the explicit mathematical reconstruction, the exact/closed-form controls and the separate coordinating assessments.

## Full positive-domain union

The six-region union specified before the high-speed target now has its sixth region replaced by the independent analytical proof. There is no pending numerical region:

| Region | Domain | Exclusion mechanism |
| --- | --- | --- |
| 1 | $R>0$, $0<\beta\le\pi/2$ | Strictly positive tangent |
| 2 | $0<R\le1/512$, $\beta\ge\pi/2$ | Complete small-radius inward-input bound |
| 3 | $1/512\le R\le2$, $\pi/2\le\beta\le8$ | Complete 947-leaf radial certificate |
| 4 | $R\ge2$, $\beta\ge\pi/2$ | Analytical large-radius/speed tails plus complete 256-box certificate |
| 5 | $0<R\le2$, $\beta\ge10$ | Complete triangular-window speed-tail bound |
| 6 | $0<R\le2$, $8\le\beta\le10$ | New analytical radius split and reciprocal-age bound |

Take any $R>0$, $\beta>0$. If $\beta\le\pi/2$, region 1 applies. Otherwise, radii at most $1/512$ fall in region 2 and radii at least two fall in region 4. For the remaining radii, speeds at most eight fall in region 3, speeds at least ten in region 5, and speeds between eight and ten in region 6. Every equality boundary is covered by overlapping closed domains. Each region contradicts one necessary component of circular acceleration. This proves the stated empty classification for the selected positive-radius, positive-speed circle class, subject to the component arithmetic assumptions and final independent union assessment.

The [high-speed protocol](alternatives-screen-2026-10-05-width-high-protocol.md) and [prepared cover driver](../evidence/alternatives-screen-2026-10-05-width-high-cover.py) remain immutable, with a passed known-control receipt. Their target was deliberately not run after the analytical closure was accepted. They are preserved as unexecuted preparation, not counted as a third numerical certificate. No unresolved box is concealed by that disposition: region 6 has a separate complete analytical proof.

## Frozen evidence identities and limitations

The following source and receipt identities were measured with `shasum -a 256`. Bulk receipts live under the ignored `.local-data/master-equation-closure/binary-research/` owner; they are local provenance, while the linked tracked source/protocol files provide the reproducer and proof. No frozen reference was rewritten for this synthesis.

| Evidence | SHA-256 |
| --- | --- |
| Unchanged interval reference | `fc6a985d0b1e9e71fb6b03fb932296ec6d2173ec962833630108e67f49186145` |
| Moderate cover driver | `a5dee699e74b863db8d5f262a1fe5e89167e150e2183339c7e1375315f967c78` |
| Moderate target receipt | `fe35060409cb6f099458715da019cebd9d5156a86a371eb556c0468dc41923de` |
| Large-radius analytical bounds | `f4db3fa3af575e5ab8ce76b8ab945eecb4229cce816ed42262c5e8b8ee8e4806` |
| Large compact cover driver | `c11c768092335bcf2b4d36540d1caa915623c50bcb995634933b6af735dc15ee` |
| Large compact target receipt | `21103ed938bf43dc4fd3e9b2bafe813f779bd5236c2edff972ab9080932ffcd9` |
| High-speed protocol and finite-speed proof | `757f0a768238fea90f869d29d897c263e8bf6c3d7c952deda66f696b10b9a434` |
| High-speed analytical closure | `dad82abdbc9c3758775d4224715462f5fa5c39e7fb04914f48d55e286e770d02` |
| Prepared but unrun high-speed cover driver | `a0abea97ac67f6a7a381469410c16f7e139b9aea6a9f070360e8bb21232d0184` |
| High-speed known-control receipt | `398f61ebb1edb84c152a4deb3e7657d879633464338f44504f99603598bc5440` |

The result does not exclude noncircular bound motion, non-antipodal configurations, translating centers, other widths or cores, or other equation variants. It supplies no fate for a compatible causal launch and no stability or spectral result. No spectrum was calculated about an excluded circle. Zero speed is outside the positive-speed theorem; it is not used to infer any limiting behavior.

An operator-checkable falsifier is a complete fixed-center antipodal circle satisfying the exact selected integral at some positive radius and speed. More local falsifiers are an incorrect source sign or radial prefactor, an active age outside the complete support or before a proved age floor, failure of a lobe or window inequality, an invalid outward arithmetic assumption, a missing phase corner, an incomplete rational cover, or a gap in the explicit domain union. Each would identify the component requiring reassessment rather than silently weaken or extend the theorem.
