# Platonic Moving-History Reduction

- **Status:** priority-stage exact reduction packet; no retained-branch, binding, stability, particle-identity, or formation claim is made.
- **Scope:** vertex-only Platonic assemblies, with complete treatment of the balanced regular-octahedral stationary chart and exact symmetry/root reduction for rigid sub-field-speed octahedral histories.
- **Claim level:** derived finite-group classification, exact stationary exclusions, and conditional complete-root reduction; the remaining scalar moving-balance equations are closure targets.
- **Assumptions:** equal-magnitude polarities, normalized $c_f=1$, the canonical regular-domain Master Equation, positive circumradius, rigid co-rotation where stated, and no external or Noether-sea acceleration contribution.
- **Primary owner:** [Spatial (3D) Braid Assemblies](../../../content/markdown/aaa/noether-braid/3d-braid-assemblies.md).

## Exact Calculation Object

A Platonic drawing becomes a calculation only after its point selection, polarity, relationships, motion, scale, and history are separated. Use the specification

$$
\mathcal C=(P,\Lambda,\chi,E,\hat{\mathbf n},R,\mathcal H),
$$

where $P$ is the finite member set, $\Lambda$ is an optional containing lattice or periodic point set, $\chi:P\to\{-1,+1\}$ is the polarity word, $E$ is an optional declared relationship graph, $\hat{\mathbf n}$ is the motion axis when one exists, $R$ is the geometric scale, and $\mathcal H$ is the complete member path history. The Master Equation reads $P$, $\chi$, and $\mathcal H$; it does not infer an interaction cutoff from $E$ or promote unused sites of $\Lambda$ into members.

Plainly: a lattice, a selected solid, the lines drawn between its vertices, and the moving assembly are four different objects. A calculation must say which dots are members and how every member moved throughout the required past interval.

The *vertex-only* program sets $P$ equal to the Platonic vertex set. The *shell-complete* program instead declares every occupied site in the chosen shell family as a member. For a finite union of shells, its receiver row may be grouped as

$$
\mathbf A_i^{(\leq M)}(T)
=
\sum_{m=0}^{M}\mathbf A_i^{(m)}(T),
$$

but each term must still include the polarity and complete causal-root contribution of every transmitter on shell $m$. The vertex-only residual is not the $m=M$ term of a shell-complete residual unless all nonvertex contributions have been explicitly removed from the latter specification.

Plainly: unused lattice sites are excluded members in one program and active transmitters in the other. They cannot be treated as harmless background while their acceleration contributions are silently omitted.

## Coloured-History Equivariance

Let $V\subset S^2$ be a Platonic vertex set and let $G_V\subset O(3)$ be its full point group. A global polarity conjugation leaves every pair product $\chi(u)\chi(v)$ unchanged. The equation-symmetry group of a polarity word is therefore

$$
G_\chi
=
\left\{
g\in G_V:
\chi(gu)=\varepsilon_g\chi(u)
\text{ for every }u\in V,
\ \varepsilon_g\in\{-1,+1\}
\right\}.
$$

The sign $\varepsilon_g=-1$ records a combined spatial transformation and global polarity conjugation. It is an equation symmetry, not an assertion that the two polarities are physically identical.

For a rigid history with angular-velocity vector $\boldsymbol\Omega=\omega\hat{\mathbf n}$,

$$
\mathbf X_u(T)=\mathbf X_0+R\exp\!\left(T[\boldsymbol\Omega]_\times\right)u,
$$

an orthogonal map acts on $\boldsymbol\Omega$ as an axial vector. The complete coloured-history stabilizer is

$$
G_{\chi,\boldsymbol\Omega}
=
\left\{
g\in G_\chi:
\det(g)g\boldsymbol\Omega=\boldsymbol\Omega
\right\}.
$$

This determinant factor is necessary. Treating the rotation axis as an ordinary polar vector gives the wrong stabilizer whenever an improper point-group operation participates.

Plainly: a mirror changes the handedness of an ordinary rotation. The determinant factor keeps track of that change, while the polarity-conjugation flag keeps track of whether all plus and minus labels exchange together.

**Equivariant residual-reduction theorem.** Let $\boldsymbol{\mathcal R}_u(T)$ be the difference between the complete Master-Equation acceleration of member $u$ and the acceleration required by its prescribed rigid history. On a regular causal-root chart preserved by $G_{\chi,\boldsymbol\Omega}$,

$$
\boldsymbol{\mathcal R}_{gu}(T)=g\boldsymbol{\mathcal R}_u(T)
\qquad
(g\in G_{\chi,\boldsymbol\Omega}).
$$

Choose one representative $u_a$ from each orbit of $G_{\chi,\boldsymbol\Omega}$ on $V$, and let $G_{u_a}$ be its site stabilizer. The entire $3|V|$ residual vanishes if and only if the representative residuals vanish in

$$
\bigoplus_a \operatorname{Fix}(G_{u_a}),
\qquad
\operatorname{Fix}(G_{u_a})
=
\{\mathbf y\in\mathbb R^3:g\mathbf y=\mathbf y\text{ for every }g\in G_{u_a}\}.
$$

Consequently the exact number of independent scalar residual channels is

$$
N_{\mathrm{ch}}
=
\sum_a \dim\operatorname{Fix}(G_{u_a}).
$$

*Proof.* Orthogonal covariance carries every receiver, transmitter, causal root, separation direction, transmitter velocity, and required path acceleration into the corresponding transformed row. The common factor $\varepsilon_g$ cancels from each polarity product. Residuals on one site orbit are therefore determined by one representative, while an operation fixing that representative constrains its residual to the operation's fixed vector subspace. The direct sum contains exactly the free representative components. $\square$

Plainly: symmetry does not set the remaining numbers to zero. It proves exactly how many numbers must be calculated and prevents equivalent receiver rows from being counted as independent evidence.

> **Claim grade: derived.** The theorem follows from orthogonal covariance of the regular-domain Master Equation and the displayed group action. A transformed causal root that fails the same root equation, a polarity product that changes under the admitted combined action, or a residual row outside the stated fixed subspace would falsify it. A fold, collision, incomplete history, or added asymmetric provider exits its assumptions rather than refuting it.

## Exact Octahedral Word and Axis Census

Order the regular-octahedral vertices as

$$
(+\mathbf e_x,-\mathbf e_x,+\mathbf e_y,-\mathbf e_y,+\mathbf e_z,-\mathbf e_z).
$$

The unchanged balanced-word enumerator proves that the twenty $3{:}3$ words form two classes under the full octahedral point group and global polarity conjugation. Representatives are `+++---` and `+-+-+-`. In coordinates, the positive sites of `+++---` are $+\mathbf e_x,-\mathbf e_x,+\mathbf e_y$. The second word is antipodal-alternating: its positive sites are $+\mathbf e_x,+\mathbf e_y,+\mathbf e_z$ and form one face, while its negative sites form the opposite face.

Plainly: one class contains a same-polarity antipodal pair for each polarity. The other assigns opposite polarity to every antipodal pair and separates the two polarities onto opposite triangular faces.

The full exact stabilizer-stratum census is as follows. An axis is *generic* in this table when it lies outside every nontrivial fixed-axis line of the displayed word's equation-symmetry group; geometric vertex, edge, or face axes not listed in a special row belong to that generic stabilizer stratum.

| Balanced word | Angular-velocity-axis stratum, up to coloured equation symmetry | $|G_\chi|$ | $|G_{\chi,\boldsymbol\Omega}|$ | Site orbits | Independent scalar channels |
|---|---:|---:|---:|---:|---:|
| `+++---` | generic | $8$ | $1$ | $6$ | $18$ |
| `+++---` | same-polarity vertex axes $\mathbf e_x$ or $\mathbf e_z$ | $8$ | $2$ | $5$ | $11$ |
| `+++---` | mixed-polarity vertex axis $\mathbf e_y$ | $8$ | $4$ | $2$ | $4$ |
| `+++---` | edge axes $\mathbf e_x\pm\mathbf e_z$ | $8$ | $2$ | $3$ | $9$ |
| `+-+-+-` | generic | $12$ | $2$ | $3$ | $9$ |
| `+-+-+-` | mixed-ring edge axes $\mathbf e_x-\mathbf e_y$, $\mathbf e_x-\mathbf e_z$, or $\mathbf e_y-\mathbf e_z$ | $12$ | $4$ | $2$ | $5$ |
| `+-+-+-` | monochromatic-face axis $\mathbf e_x+\mathbf e_y+\mathbf e_z$ | $12$ | $6$ | $1$ | $3$ |

The generic antipodal-alternating row retains a two-element history symmetry because inversion combined with global polarity conjugation fixes every axial vector and pairs antipodal receiver rows. The monochromatic-face row is the segregated two-triangle history already excluded by the axial sign theorem. Its three channels are the axial, radial, and tangential components of one representative row; symmetry makes every other receiver row equivalent but does not remove any of those three components.

Plainly: there is no finite list of all rotation axes. There is a finite list of axes with extra symmetry, plus a continuous generic stratum. The table completely closes that symmetry stratification for both balanced octahedral words.

The octahedron's conventional high-symmetry axes form a finite subset of those strata. Quotienting the three vertex axes, six edge axes, and four face axes by each coloured equation-symmetry group gives the following complete list. “Generic channels” means that the geometrically distinguished axis acquires no additional symmetry from the polarity word.

| Balanced word | Geometric axis family | Inequivalent coloured-axis orbits | Channel counts |
|---|---|---:|---:|
| `+++---` | vertex | same-polarity axes $\{\mathbf e_x,\mathbf e_z\}$; mixed-polarity axis $\{\mathbf e_y\}$ | $11$; $4$ |
| `+++---` | edge | $\{\mathbf e_y\pm\mathbf e_z,\mathbf e_x\pm\mathbf e_y\}$; $\{\mathbf e_x\pm\mathbf e_z\}$ | $18$ generic; $9$ |
| `+++---` | face | all four face-axis lines | $18$ generic |
| `+-+-+-` | vertex | all three vertex-axis lines | $9$ generic |
| `+-+-+-` | edge | three difference-axis lines; three sum-axis lines | $5$; $9$ generic |
| `+-+-+-` | face | three mixed-face-axis lines; monochromatic-face axis $\{\mathbf e_x+\mathbf e_y+\mathbf e_z\}$ | $9$ generic; $3$ |

Plainly: “rotate about an octahedral axis” is still not one case. The polarity word splits geometrically similar axes into inequivalent histories, and some visually special axes have no extra symmetry once their colors are included.

The executable audit `scripts/prescribed-path-analysis/oracle/octahedral_word_axis_reduction.py` enumerates the $48$ signed-permutation matrices, applies the axial-vector action, constructs every special-axis orbit, and computes the site-orbit fixed spaces. It is an implementation audit of the displayed algebra, not independent authority for the theorem.

> **Claim grade: derived, with exact executable audit.** The two word classes are independently supplied by the unchanged balanced-word enumerator. The group orders, axis orbits, and channel counts follow from the finite signed-permutation calculation and the theorem above. A missing signed-permutation matrix, another balanced-word orbit, another nontrivial fixed-axis orbit, or a direct fixed-space calculation with a different channel count would falsify the corresponding row.

## Complete Stationary Octahedral Exclusion

At unit circumradius and with the common positive coupling factor suppressed, the antipodal-alternating word gives, at $+\mathbf e_x$,

$$
\mathbf A_{+x}
=
-\frac14\mathbf e_x
-\frac1{\sqrt2}(\mathbf e_y+\mathbf e_z),
\qquad
\|\mathbf A_{+x}\|=\frac{\sqrt{17}}4.
$$

For the other word `+++---`, the $+\mathbf e_y$ receiver row is simply

$$
\mathbf A_{+y}=-\frac14\mathbf e_y.
$$

Both are nonzero. Because the two representatives exhaust all balanced $3{:}3$ words up to octahedral symmetry and global polarity conjugation, no balanced polarity assignment on a stationary regular octahedron has zero acceleration at every member under the declared unsoftened partner row.

Plainly: the earlier stationary calculation excluded one of the two color patterns. The second exact row closes the other pattern, so stationary balance is now completely excluded for a regular octahedron with three members of each polarity.

> **Claim grade: derived, complete within the stationary regular-octahedron chart.** Direct substitution into the signed inverse-square row gives the two displayed vectors. A third balanced-word orbit or a zero recomputation of either representative receiver row would falsify completeness. The result does not exclude deformed six-point geometries, moving histories, external constraints, or Noether-sea contributions.

## Complete Partner-Root Reduction for Rigid Sub-Field Histories

Let every octahedral member follow the rigid history above and suppose

$$
v_{\max}
=
\max_{u\in V}\|\boldsymbol\Omega\times Ru\|
<1.
$$

For distinct receiver $u$ and transmitter $v$, write the positive delay as $\Delta=T_r-T_t$ and define

$$
f_{uv}(\Delta)
=
\|\mathbf X_u(T_r)-\mathbf X_v(T_r-\Delta)\|-\Delta.
$$

At $\Delta=0$, rigid-body separation gives $f_{uv}(0)>0$. The separation is at most $2R$, so $f_{uv}(\Delta)<0$ for $\Delta>2R$. Moreover,

$$
f_{uv}'(\Delta)
=
\hat{\mathbf r}_{uv}\mathbin{\cdot}\mathbf V_v(T_r-\Delta)-1
\leq v_{\max}-1<0.
$$

Thus every ordered partner pair has exactly one causal root in $(0,2R]$, and its transmitter-side Jacobian satisfies

$$
D_{t,uv}
=
1-\hat{\mathbf r}_{uv}\mathbin{\cdot}\mathbf V_v
\geq1-v_{\max}>0.
$$

For a same-transmitter row and any $\Delta>0$, the chord traversed by a path with speed bounded by $v_{\max}<1$ is shorter than $\Delta$; hence there is no nontrivial self-hit root. The complete ledger therefore contains exactly $6\times5=30$ partner roots and no nontrivial self roots at every reception event. A prehistory of depth $2R$ is sufficient; an eternal periodic continuation is one exact way to supply it.

Plainly: below field speed, each of the other five members contributes once to each receiver, no member contributes a delayed hit to itself, and no relevant partner root can lie more than $2R$ into the past.

Rigid rotation also gives the time-uniform simultaneous clearance

$$
d_{\min}=\sqrt2R,
$$

the octahedron's edge length. This excludes coordinate collision without appealing to a sampled trajectory.

> **Claim grade: derived.** Strict monotonicity of $f_{uv}$ proves root existence, uniqueness, and the Jacobian floor; the Lipschitz chord bound excludes self hits; rigid isometry gives clearance. A second positive-delay partner root, a nontrivial self root, a Jacobian below $1-v_{\max}$, or a simultaneous pair distance below $\sqrt2R$ under the stated speed and rigid-history assumptions would falsify the corresponding result. The theorem does not cover a member reaching field speed, a fold, non-rigid motion, incomplete prehistory, or a history with an added provider.

## Exact Vertex-Axis Exclusions

Rigid rotation about an octahedral vertex axis leaves the two axial members stationary. Every equatorial transmitter remains at constant distance $\sqrt2R$ from either axial receiver, so its causal delay is exactly $\sqrt2R$ and its transmitter-side weight is one, at every angular rate. The antipodal axial transmitter is fixed at distance $2R$ and also has weight one. These facts make the axial projection independent of the rotation rate and do not require the sub-field-speed assumption.

For the word `+++---`, the mixed-polarity vertex axis $\hat{\mathbf n}=\mathbf e_y$ gives

$$
\hat{\mathbf n}\mathbin{\cdot}\mathbf A_{+y}
=
-\frac{\kappa}{4R^2}.
$$

The equatorial same-polarity pair and opposite-polarity pair cancel in this projection, leaving the fixed antipodal attraction. For either same-polarity vertex-axis class, represented by $\hat{\mathbf n}=\mathbf e_z$, the corresponding axial projection is

$$
\hat{\mathbf n}\mathbin{\cdot}\mathbf A_{+z}
=
\frac{\kappa}{R^2}
\left(\frac14-\frac1{\sqrt2}\right)
<0.
$$

For the antipodal-alternating word `+-+-+-`, all three vertex axes are equivalent and a representative gives

$$
\hat{\mathbf n}\mathbin{\cdot}\mathbf A_{+x}
=
-\frac{\kappa}{4R^2}.
$$

The prescribed acceleration of an axial member is zero. Each displayed nonzero axial component therefore excludes its entire coloured vertex-axis orbit for every rigid angular rate with a complete periodic history.

Plainly: the two members lying on the rotation axis do not move. Their delayed axial acceleration nevertheless remains nonzero, so no choice of spin rate or radius can make a rigid vertex-axis octahedron follow its prescribed path.

> **Claim grade: derived.** Constant source-receiver distances fix the delays and weights, and direct polarity sums give the three projections. A different causal delay for an equatorial-to-axial row, a transmitter-side weight other than one, or a zero recomputation of any displayed projection would falsify the corresponding exclusion. The result does not cover an axis missing every vertex, non-rigid motion, an external constraint, or an added Noether-sea contribution.

## Exact Difference-Edge-Axis Exclusion

Consider the antipodal-alternating word `+-+-+-` and the representative difference-edge axis

$$
\hat{\mathbf n}=\frac{\mathbf e_y-\mathbf e_z}{\sqrt2},
\qquad
\hat{\mathbf t}=\hat{\mathbf n}\times\mathbf e_x
=
-\frac{\mathbf e_y+\mathbf e_z}{\sqrt2}.
$$

At the $+\mathbf e_x$ receiver, rigid rotation requires acceleration only along $-\mathbf e_x$, so its $\hat{\mathbf t}$ component must vanish. Put $\rho=1/\sqrt2$ and $\beta=|\omega|R<1$. The five sources split into the antipode $-\mathbf e_x$, the same-polarity pair $+\mathbf e_y,+\mathbf e_z$, and the opposite-polarity pair $-\mathbf e_y,-\mathbf e_z$. Members within either pair have a common dimensionless delay. Write those delays as $s_B,s_C$ and their phase lags as $z_B=\beta s_B$, $z_C=\beta s_C$. Their root equations and transmitter-side factors are

$$
\begin{aligned}
s_B^2&=2+\sqrt2\sin z_B,
&D_B&=1-\frac{\beta\rho\cos z_B}{s_B},\\
s_C^2&=2-\sqrt2\sin z_C,
&D_C&=1+\frac{\beta\rho\cos z_C}{s_C}.
\end{aligned}
$$

Each member of the two pairs contributes respectively

$$
b_B=\frac{\rho\cos z_B}{s_B^3D_B},
\qquad
b_C=\frac{\rho\cos z_C}{s_C^3D_C}
$$

to the dimensionless $\hat{\mathbf t}$ channel. The antipodal source contributes a nonnegative amount because its phase lag is less than $2<\pi$.

Plainly: four sources come in two delay-matched pairs. One pair can turn slightly against the desired inequality near field speed, so the proof must bound that adverse part rather than assume every term has the same sign.

Let

$$
S=\sqrt{2+\sqrt2},
\qquad
\beta_0=\frac{\pi}{2S}.
$$

For $0\leq\beta\leq\beta_0$, $z_B\leq\beta S\leq\pi/2$, so $b_B\geq0$; also $z_C<1$, hence $b_C>0$. The tangential sum is therefore strictly positive.

For $\beta_0<\beta<1$, only $b_B$ can be negative. In that case $\pi/2<z_B<S$, $D_B>1$, and

$$
|b_B|
<
U_B
\equiv
\frac{\rho[-\cos S]}
{[2+\sqrt2\sin S]^{3/2}}
<\frac4{125}.
$$

For the opposite-polarity pair, $z_C<s_C\leq\sqrt2$. If $z_C\geq1$, then $s_C^2>1$ while $s_C^2=2-\sqrt2\sin z_C\leq2-\sqrt2\sin1<1$, a contradiction. Thus $z_C<1$. With

$$
s_0=\sqrt{2-\sqrt2\sin1},
$$

one has $s_0<s_C<\sqrt2$ and $D_C<1+\rho/s_0$, which gives

$$
b_C
>
L_C
\equiv
\frac{\rho\cos1}
{2\sqrt2(1+\rho/s_0)}
>
\frac3{40}.
$$

The elementary enclosures $U_B<4/125$ and $L_C>3/40$ follow, for example, from alternating Taylor bounds for sine and cosine on $[0,2]$ together with rational bounds on $\sqrt2$. There are two members in each pair, so even after discarding the nonnegative antipodal contribution,

$$
\mathbf F_{+x}(\beta)\mathbin{\cdot}\hat{\mathbf t}
>
2\left(\frac3{40}-\frac4{125}\right)
=
\frac{43}{500}
>0.
$$

The required rigid acceleration has zero $\hat{\mathbf t}$ component. The entire five-channel antipodal-alternating difference-edge-axis stratum is therefore excluded for $0\leq\beta<1$.

Plainly: the potentially adverse source pair is uniformly too weak to cancel the favorable pair. A tangential residual of at least $43/500$ remains in dimensionless units, so neither the radius nor the angular rate can repair this sub-field rigid history.

> **Claim grade: derived on the complete rigid sub-field chart.** The root uniqueness theorem supplies the five partner delays and positive Jacobians, the displayed pair equations give the channel decomposition, and the elementary bounds give a strictly positive residual. A root outside the declared pair equations, failure of either rational enclosure, or a complete-root evaluation with nonpositive tangential channel at any $0\leq\beta<1$ would falsify the exclusion. The result does not cover field-speed or super-field-speed motion, another edge-axis orbit, non-rigid motion, or an added provider.

## Dimensionless Complete-Root Residual

Let $\boldsymbol\Omega=\omega\hat{\mathbf n}$ and define $\beta=|\omega|R$. For each ordered pair $u\ne v$, the unique dimensionless delay $s_{uv}=\Delta_{uv}/R$ is the root of

$$
s_{uv}
=
\left\|
u-Q_{\hat{\mathbf n}}(-\beta s_{uv})v
\right\|,
\qquad
0<s_{uv}\leq2,
$$

where $Q_{\hat{\mathbf n}}(\theta)$ is rotation by $\theta$ about $\hat{\mathbf n}$. Define

$$
\begin{aligned}
\mathbf d_{uv}&=u-Q_{\hat{\mathbf n}}(-\beta s_{uv})v,\\
\widehat{\mathbf r}_{uv}&=\frac{\mathbf d_{uv}}{s_{uv}},\\
D_{uv}&=1-\widehat{\mathbf r}_{uv}\mathbin{\cdot}
\left[\beta\hat{\mathbf n}\times Q_{\hat{\mathbf n}}(-\beta s_{uv})v\right],\\
\mathbf F_u(\beta)&=
\sum_{v\ne u}
\chi(u)\chi(v)
\frac{\mathbf d_{uv}}{s_{uv}^3D_{uv}}.
\end{aligned}
$$

If the common charge magnitude is absorbed into $\kappa$, rigid balance is equivalent to

$$
\mathbf F_u(\beta)
=
\lambda\,
\hat{\mathbf n}\times(\hat{\mathbf n}\times u),
\qquad
\lambda=\frac{\beta^2R}{\kappa}>0,
$$

for every vertex $u$, with the $\beta=0$ stationary case treated separately. The equivariant theorem reduces these vector equations to the scalar channel count in the axis table. Because the entire history advances by one common spatial rotation, one reception phase determines every other phase on this rigid periodic chart.

Plainly: for a chosen word and axis, the dynamics problem is now explicit. Solve one monotone delay equation for each ordered pair, add the five delayed contributions at each representative receiver, and test only the independent scalar channels in the table. A small total norm without the individual channel zeros is not balance.

This equation stack closes the residual definition and complete-root census for rigid sub-field-speed octahedral histories. It does not establish that any remaining channel system has a zero. The monochromatic-face axis is excluded for every ordinary simple-root rigid speed, every vertex-axis orbit is excluded by the fixed-receiver projections, and the five-channel difference-edge-axis stratum is excluded by the tangential lower bound. The remaining nine-channel and eighteen-channel edge-, face-, and continuous generic-axis residual systems remain to be solved or bounded.

> **Claim grade: derived residual reduction; existence remains a closure target.** Substitution of the rigid worldlines into the canonical per-hit acceleration gives the displayed dimensionless equations. A direct complete-root evaluation that disagrees with these equations inside the strict speed domain would falsify the reduction. One independently certified common zero would establish prescribed balance at its declared $(\chi,\hat{\mathbf n},\beta,\lambda)$ point but would not establish retention or stability.

## Lattice-Restriction Result and Next Calculation

For the axis-aligned simple-cubic octahedral ladder, neither current periodic polarity map reaches either balanced word class: alternating planes give $6{:}0$ for even scale index and $4{:}2$ for odd index, while the three-dimensional checkerboard is monochromatic at every scale. The balanced octahedral calculation is therefore vertex-only unless a different periodic decoration or the ideal-HCP local $3{:}3$ octahedron is specified explicitly.

The next exact dynamics task is now a nine-channel rigid stratum. The two natural representatives are the `+++---` edge axis $\mathbf e_x-\mathbf e_z$ and the antipodal-alternating sum-edge or mixed-face axes. A certified zero requires every scalar channel, the thirty-root ledger, the positive $D_{uv}$ floor, and the inferred positive scale $R=\kappa\lambda/\beta^2$ to agree. A positive lower bound over the complete open speed interval would exclude the selected stratum. The eighteen-channel axes, continuous generic-axis charts, and non-rigid histories remain separate programs rather than hidden members of this finite calculation.

Plainly: the two smallest special-axis systems are now excluded exactly. The next unresolved rigid calculation has nine independent channels; the lattice colorings currently in the app do not supply its balanced octahedral word automatically.

## Closure Boundary

This packet closes six items: the exact calculation object, the stationary balanced-octahedron chart, the coloured rigid-axis symmetry census, the complete partner-root criterion for every rigid sub-field-speed octahedral history, every rigid vertex-axis octahedral history, and the five-channel antipodal-alternating difference-edge-axis stratum below field speed. It does not close the remaining nine- and eighteen-channel edge-, face-, and generic-axis systems, non-rigid octahedral motion, shell-complete dynamics, retained EOM-solver evolution, or stability. Release under the EOM solver is admissible only after one prescribed residual actually vanishes with its root ledger certified. Linear stability is admissible only after that balance or a genuine periodic solution exists.

Plainly: the bookkeeping and reduction are complete, stationary and vertex-axis rigid octahedra are ruled out, and the smallest nonvertex special-axis system also fails. The next unresolved rigid question is whether a nine-channel axis stratum has a real zero.
